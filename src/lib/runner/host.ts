// The sandbox page that runs learner code. It is loaded in a hidden WebView on
// Android/iOS and a hidden iframe on web. Code runs in a module Web Worker so a
// runaway loop can be stopped by terminating the worker.

export const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';

const WORKER_SOURCE = String.raw`
const PY = '${PYODIDE_URL}';
let py = null;
// A failed download must not be cached, or Python stays broken until the app restarts.
const getPy = () =>
  (py ??= import(PY + 'pyodide.mjs')
    .then((m) => m.loadPyodide({ indexURL: PY }))
    .catch(() => {
      py = null;
      throw new Error('NO_PYTHON');
    }));

const fmt = (v) => {
  if (typeof v === 'string') return v;
  try { return JSON.stringify(v); } catch { return String(v); }
};

function pythonError(message) {
  const lines = String(message).trim().split('\n');
  const last = lines[lines.length - 1];
  const where = lines.filter((l) => l.includes('File "<exec>"')).pop();
  const line = where && where.match(/line (\d+)/);
  return line ? last + ' (line ' + line[1] + ')' : last;
}

self.onmessage = async (event) => {
  const { id, lang, code } = event.data;
  const out = [];
  try {
    if (lang === 'python') {
      const p = await getPy();
      p.setStdout({ batched: (s) => out.push(s) });
      p.setStderr({ batched: (s) => out.push(s) });
      await p.runPythonAsync(code);
      self.postMessage({ id, ok: true, output: out, pyReady: true });
    } else {
      const log = (...args) => out.push(args.map(fmt).join(' '));
      const run = new Function('console', code);
      const result = run({ log, info: log, warn: log, error: log });
      if (result && typeof result.then === 'function') await result;
      self.postMessage({ id, ok: true, output: out });
    }
  } catch (err) {
    const message =
      err && err.message === 'NO_PYTHON'
        ? 'NO_PYTHON'
        : lang === 'python'
          ? pythonError(err && err.message)
          : err && err.name
            ? err.name + ': ' + err.message
            : String(err);
    self.postMessage({ id, ok: false, output: out, error: message, pyReady: lang === 'python' && py !== null });
  }
};
`;

const HOST_SCRIPT = String.raw`
(function () {
  const source = ${JSON.stringify(WORKER_SOURCE)};
  let worker = null;
  let pyReady = false;
  const timers = new Map();

  const send = (msg) => {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    else window.parent.postMessage({ __codeyatra: true, ...msg }, '*');
  };

  function spawn() {
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    worker = new Worker(url, { type: 'module' });
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.pyReady) pyReady = true;
      clearTimeout(timers.get(m.id));
      timers.delete(m.id);
      // Browsers remember a failed module import for the worker's lifetime, so after a
      // failed Python download start a fresh worker; the next run downloads again.
      if (m.error === 'NO_PYTHON') {
        worker.terminate();
        worker = null;
        pyReady = false;
      }
      send(m);
    };
    worker.onerror = (e) => send({ id: '*', ok: false, output: [], error: 'Runner error: ' + (e.message || 'unknown') });
  }

  window.__run = (msg) => {
    if (!worker) spawn();
    // First Python run downloads the interpreter, so it gets much longer.
    const loading = msg.lang === 'python' && !pyReady;
    const limit = loading ? 120000 : 8000;
    timers.set(msg.id, setTimeout(() => {
      worker.terminate();
      worker = null;
      pyReady = false;
      // A first Python run that times out was still downloading, not stuck in a loop.
      for (const [id, t] of timers) { clearTimeout(t); send({ id, ok: false, output: [], error: id === msg.id && loading ? 'NO_PYTHON' : 'TIMEOUT' }); }
      timers.clear();
    }, limit));
    worker.postMessage(msg);
  };

  window.addEventListener('message', (e) => {
    if (e.data && e.data.__codeyatraRun) window.__run(e.data.msg);
  });

  send({ id: 'ready', ok: true, output: [] });
})();
`;

export const RUNNER_HTML = `<!doctype html><html><head><meta charset="utf-8"></head><body><script>${HOST_SCRIPT}</script></body></html>`;
