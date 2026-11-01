// Builds a self-contained HTML page from the learner's HTML, CSS and JS, with
// console.log and errors forwarded to the app so they can be shown below the preview.
import { withAssets } from './assets';
import { NEXT_RUNTIME } from './nextRuntime';
import { NODE_RUNTIME } from './nodeRuntime';
import { REACT_RUNTIME } from './reactRuntime';

/**
 * `pages`: other pages of a small site (file name → body HTML), so links between them work in the preview.
 * `react`: js is a React program, run with the bundled React (see reactProgram).
 * `next`: a Next.js app, run with the teaching copy of Next.js (scripts/next-runtime.js); `js`, when given, is the
 * text of its `edit` file.
 */
export type WebFiles = { html: string; css?: string; js?: string; pages?: Record<string, string>; current?: string; react?: boolean; next?: NextApp; node?: NodeApp };

/**
 * A Next.js app for a lesson page: its files by path (app/page.js, app/menu/[id]/page.js, lib/data.js, .env…), the
 * address it opens at, and which file the learner edits (its text then comes from WebFiles.js).
 */
export type NextApp = { files: Record<string, string>; url?: string; edit?: string };

/**
 * A Node.js program for a lesson page, run in a terminal by the teaching copy of Node.js: its files by path, the file
 * `node` runs (app.js if not given), arguments, environment, an env file to load, ready-made requests for a server,
 * `test` to run every *.test.js file with node:test, a Run again button (or `manual`: nothing runs until ▶ Run),
 * and which file the learner edits.
 */
export type NodeApp = {
  files: Record<string, string>;
  entry?: string;
  args?: string[];
  env?: Record<string, string>;
  envFile?: string;
  requests?: { label?: string; method: string; path: string; body?: string }[];
  test?: boolean;
  command?: string;
  rerun?: boolean;
  manual?: boolean;
  edit?: string;
};
export type PageLog = { level: 'log' | 'error'; text: string };

const BRIDGE = `<script>
(function () {
  function send(level, args) {
    var text = Array.prototype.map.call(args, function (a) {
      try { return typeof a === 'string' ? a : JSON.stringify(a); } catch (e) { return String(a); }
    }).join(' ');
    var msg = JSON.stringify({ __cyweb: true, level: level, text: text });
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(msg);
    else if (window.parent !== window) window.parent.postMessage(msg, '*');
  }
  var log = console.log;
  console.log = function () { send('log', arguments); log.apply(console, arguments); };
  window.onerror = function (m, s, line) { send('error', [m + (line ? ' (line ' + line + ')' : '')]); };
})();
</script>`;

// City Travel Desk's practice trains (JavaScript Intermediate). Numbers 901xx are made up; times are UTC.
const train = (no: number, name: string, from: string, to: string, departs: string, delay: number, state: string) => ({ no, name, from, to, departs, delay, state });
const TRAINS = [
  train(90101, 'Harbour Express', 'City Central', 'Harbour Point', '2026-11-02T03:45:00Z', 0, 'On time'),
  train(90102, 'Hillview Local', 'City Central', 'Harbour Point', '2026-11-02T05:30:00Z', 12, 'Late'),
  train(90103, 'River Line', 'Hillview', 'Riverside', '2026-11-02T07:10:00Z', 0, 'Cancelled'),
  train(90104, 'Airport Shuttle', 'City Central', 'Airport', '2026-11-02T08:00:00Z', 5, 'Late'),
  train(90106, 'Coastal Mail', 'Harbour Point', 'Riverside', '2026-11-02T10:20:00Z', 0, 'On time'),
];
const trainRoute = (i: number) => ({ status: 200, delay: 300, body: TRAINS[i] });

/**
 * The practice server: fetch('/api/…') on a lesson page is answered here, inside the page, so lessons
 * work offline and give the same answer every time. Other addresses go to the real fetch. A route is looked up by
 * its full address first (with the query, for searches) and then by its path. `flaky` routes fail every other time,
 * starting with the first (503, busy), so a retry always works; a fetch with an abort signal stops when it is aborted.
 */
export const PRACTICE_API: Record<string, { status: number; body: unknown; delay: number; flaky?: boolean }> = {
  '/api/menu': {
    status: 200,
    delay: 600,
    body: [
      { name: 'Lemon Tea', price: 40, veg: true },
      { name: 'Cheese Toast', price: 80, veg: true },
      { name: 'Veg Sandwich', price: 90, veg: true },
      { name: 'Chicken Sandwich', price: 150, veg: false },
    ],
  },
  '/api/menu/empty': { status: 200, delay: 600, body: [] },
  '/api/menu/slow': { status: 200, delay: 2500, body: [{ name: 'Lemon Tea', price: 40, veg: true }, { name: 'Cheese Toast', price: 80, veg: true }] },
  '/api/menu/broken': { status: 500, delay: 600, body: { error: 'The kitchen server is down' } },
  '/api/batches': {
    status: 200,
    delay: 600,
    body: [
      { course: 'Class 10 Maths', days: 'Mon, Wed, Fri', time: '4:00–5:30 pm' },
      { course: 'Class 12 Physics', days: 'Tue, Thu, Sat', time: '5:00–6:30 pm' },
      { course: 'Class 9 Science', days: 'Mon to Fri', time: '6:00–7:00 pm' },
    ],
  },
  '/api/batches/broken': { status: 500, delay: 600, body: { error: 'Server error' } },
  '/api/trains': { status: 200, delay: 300, body: TRAINS },
  '/api/trains?from=City+Central&to=Harbour+Point': { status: 200, delay: 300, body: TRAINS.slice(0, 2) },
  '/api/trains?from=City+Central&to=Airport': { status: 200, delay: 300, body: TRAINS.slice(3, 4) },
  '/api/trains?from=Hillview&to=Harbour+Point': { status: 200, delay: 300, body: [] },
  '/api/trains?from=Hillview&to=Airport': { status: 200, delay: 300, body: [] },
  '/api/trains/90101': trainRoute(0),
  '/api/trains/90102': trainRoute(1),
  '/api/trains/90103': trainRoute(2),
  '/api/trains/90104': { ...trainRoute(3), delay: 2500 },
  '/api/trains/90105': { status: 500, delay: 300, body: { error: 'The timetable server is down' } },
  '/api/trains/90106': { ...trainRoute(4), flaky: true },
};

const PRACTICE = `<script>
(function () {
  // Pages shown from memory may not be allowed real storage; then keep it in memory for this view.
  try {
    window.localStorage.setItem('__cy', '1');
    window.localStorage.removeItem('__cy');
  } catch (e) {
    var mem = {};
    Object.defineProperty(window, 'localStorage', { configurable: true, value: {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
      setItem: function (k, v) { mem[k] = String(v); },
      removeItem: function (k) { delete mem[k]; },
      clear: function () { mem = {}; }
    } });
  }
  var routes = ${JSON.stringify(PRACTICE_API)};
  var real = window.fetch;
  var tried = {};
  window.fetch = function (url, opts) {
    var full = String(url);
    var path = full.split('?')[0];
    if (path.indexOf('/api/') !== 0) return real ? real.apply(window, arguments) : Promise.reject(new TypeError('Failed to fetch'));
    var r = routes[full] || routes[path] || { status: 404, delay: 300, body: { error: 'Not found' } };
    tried[full] = (tried[full] || 0) + 1;
    var code = r.flaky && tried[full] % 2 === 1 ? 503 : r.status;
    var text = JSON.stringify(code === 503 ? { error: 'Busy, try again' } : r.body);
    var signal = opts && opts.signal;
    return new Promise(function (done, fail) {
      var stop = function () { fail(new DOMException('The request was stopped', 'AbortError')); };
      if (signal && signal.aborted) return stop();
      var t = setTimeout(function () {
        done({ ok: code >= 200 && code < 300, status: code, url: path, json: function () { return Promise.resolve(JSON.parse(text)); }, text: function () { return Promise.resolve(text); } });
      }, r.delay);
      if (signal) signal.addEventListener('abort', function () { clearTimeout(t); stop(); });
    });
  };
})();
</script>`;

const BASE_CSS = 'body{font-family:system-ui,-apple-system,Roboto,sans-serif;margin:12px;line-height:1.45;color:#16142B;}';

/** A full document. `</script>` in learner JS is escaped so it can't break out of its tag. */
export function buildPage({ html: rawHtml, css: rawCss = '', js = '', pages, current = 'index.html', react = false, next, node }: WebFiles): string {
  if (next) return nextPage(next, rawCss, js);
  if (node) return nodePage(node, rawCss, js);
  // Built-in pictures (cup.svg, banner.svg…) work offline.
  const html = withAssets(rawHtml);
  const css = withAssets(rawCss);
  const safeJs = js.replace(/<\/script/gi, '<\/script');
  // A React program is compiled from JSX inside the page (by the bundled runtime), then run.
  const script = react
    ? `<script>${REACT_RUNTIME.replace(/<\/script/gi, '<\\/script')}</script><script>try{(0,eval)(window.__cyJsx(${JSON.stringify(reactProgram(js)).replace(/<\/script/gi, '<\\/script')}))\n}catch(e){window.onerror && window.onerror(e.message)}</script>`
    : `<script>try{${safeJs}\n}catch(e){window.onerror && window.onerror(e.message)}</script>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}${PRACTICE}<style>${BASE_CSS}${css}</style></head><body>${html}${script}${pages ? siteScript(html, pages, current) : ''}</body></html>`;
}

const safe = (s: string) => s.replace(/<\/script/gi, '<\\/script');
/** Built-in pictures in a Next.js app are written as "/dish.svg" (from the public folder). */
const appAssets = (text: string) => withAssets(text.replace(/(["'])\/((?:cup|leaf|banner|dish|portrait)\.svg)(?=["'])/g, '$1$2'));

/** A Next.js lesson page: React, then the teaching copy of Next.js, which draws the app at its address. */
function nextPage(app: NextApp, css: string, js: string): string {
  const files = Object.fromEntries(Object.entries({ ...app.files, ...(app.edit && js ? { [app.edit]: js } : {}) }).map(([k, v]) => [k, appAssets(v)]));
  const start = `try{window.__cyNext(${JSON.stringify(files)},${JSON.stringify(app.url ?? '/')},${JSON.stringify(css)})}catch(e){window.onerror && window.onerror(e.message)}`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}${PRACTICE}<style>${BASE_CSS}</style></head><body><div id="root"></div><script>${safe(REACT_RUNTIME)}</script><script>${safe(NEXT_RUNTIME)}</script><script>${safe(start)}</script></body></html>`;
}

/** A Node.js lesson page: a terminal where the teaching copy of Node.js runs the program. */
function nodePage(app: NodeApp, css: string, js: string): string {
  const files = { ...app.files, ...(app.edit && js ? { [app.edit]: js } : {}) };
  const opts = { ...app, files: undefined, edit: undefined, css };
  const start = `try{window.__cyNode(${JSON.stringify(files)},${JSON.stringify(opts)})}catch(e){window.onerror && window.onerror(e.message)}`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}${PRACTICE}</head><body><div id="root"></div><script>${safe(NODE_RUNTIME)}</script><script>${safe(start)}</script></body></html>`;
}

/**
 * A React lesson program, ready to run in a page: imports from "react", "react-dom", "react-dom/client" and
 * "react-router" become the bundled globals, export keywords go, and if the program doesn’t render anything itself,
 * its App is shown in #root.
 */
export function reactProgram(js: string): string {
  const code = js
    .replace(/^import\s+\{([^}]*)\}\s+from\s+["']react["'];?[ \t]*$/gm, (_, names: string) => `const {${names.replace(/\bas\b/g, ':')}} = React;`)
    .replace(/^import\s+\{([^}]*)\}\s+from\s+["']react-dom(\/client)?["'];?[ \t]*$/gm, (_, names: string) => `const {${names}} = ReactDOM;`)
    .replace(/^import\s+\{([^}]*)\}\s+from\s+["']react-router(-dom)?["'];?[ \t]*$/gm, (_, names: string) => `const {${names.replace(/\bas\b/g, ':')}} = ReactRouter;`)
    .replace(/^import\s+\w+\s+from\s+["']react(-dom\/client)?["'];?[ \t]*$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+/gm, '');
  // Errors while React draws are reported like any other page error.
  return /createRoot\s*\(/.test(code)
    ? code
    : `${code}\nReactDOM.createRoot(document.getElementById("root"), { onUncaughtError: (e) => window.onerror && window.onerror(e.message) }).render(React.createElement(App));`;
}

/** Puts a value in each `{{n}}` slot ("copy the look" lessons). */
export const fillSlots = (css: string, values: string[]) => values.reduce((c, v, i) => c.split(`{{${i}}}`).join(v), css);

/**
 * A small site in one preview: tapping a link to another page (or back to the first) swaps the page body and logs
 * "Page: name.html", and a thin bar shows which file is open. Links to sections (#top) and other sites work as usual.
 */
function siteScript(first: string, pages: Record<string, string>, current: string): string {
  const all = JSON.stringify({ ...Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, withAssets(v)])), [current]: first }).replace(/<\//g, '<\\/');
  return `<script>(function(){var pages=${all};var bar=document.createElement('div');bar.id='cy-site-bar';bar.setAttribute('style','position:sticky;top:0;z-index:99;font:12px monospace;padding:4px 8px;background:#EEEBF8;color:#4B3FD8;border-bottom:1px solid #C9C3FF');function show(name){var keep=bar;document.body.innerHTML=pages[name];document.body.prepend(keep);keep.textContent='📄 '+name;}bar.textContent='📄 ${current}';document.body.prepend(bar);document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var href=a.getAttribute('href').split('#')[0].replace(/^\\.\\//,'');if(pages[href]===undefined)return;e.preventDefault();show(href);console.log('Page: '+href);});})();</script>`;
}

/** Parses a bridge message; anything else is ignored. */
export function readPageMessage(data: unknown): PageLog | null {
  if (typeof data !== 'string') return null;
  try {
    const m = JSON.parse(data) as { __cyweb?: boolean; level?: string; text?: string };
    return m.__cyweb ? { level: m.level === 'error' ? 'error' : 'log', text: String(m.text ?? '') } : null;
  } catch {
    return null;
  }
}
