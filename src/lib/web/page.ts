// Builds a self-contained HTML page from the learner's HTML, CSS and JS, with
// console.log and errors forwarded to the app so they can be shown below the preview.
import { withAssets } from './assets';

export type WebFiles = { html: string; css?: string; js?: string };
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

/**
 * The practice server: fetch('/api/…') on a lesson page is answered here, inside the page, so lessons
 * work offline and give the same answer every time. Other addresses go to the real fetch.
 */
export const PRACTICE_API: Record<string, { status: number; body: unknown; delay: number }> = {
  '/api/menu': {
    status: 200,
    delay: 600,
    body: [
      { name: 'Dal rice', price: 80, veg: true },
      { name: 'Poha', price: 30, veg: true },
      { name: 'Rajma chawal', price: 90, veg: true },
      { name: 'Chicken thali', price: 150, veg: false },
    ],
  },
  '/api/menu/empty': { status: 200, delay: 600, body: [] },
  '/api/menu/slow': { status: 200, delay: 2500, body: [{ name: 'Dal rice', price: 80, veg: true }, { name: 'Poha', price: 30, veg: true }] },
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
  window.fetch = function (url, opts) {
    var path = String(url).split('?')[0];
    if (path.indexOf('/api/') !== 0) return real ? real.apply(window, arguments) : Promise.reject(new TypeError('Failed to fetch'));
    var r = routes[path] || { status: 404, delay: 300, body: { error: 'Not found' } };
    var text = JSON.stringify(r.body);
    return new Promise(function (done) {
      setTimeout(function () {
        done({ ok: r.status >= 200 && r.status < 300, status: r.status, url: path, json: function () { return Promise.resolve(JSON.parse(text)); }, text: function () { return Promise.resolve(text); } });
      }, r.delay);
    });
  };
})();
</script>`;

const BASE_CSS = 'body{font-family:system-ui,-apple-system,Roboto,sans-serif;margin:12px;line-height:1.45;color:#16142B;}';

/** A full document. `</script>` in learner JS is escaped so it can't break out of its tag. */
export function buildPage({ html: rawHtml, css: rawCss = '', js = '' }: WebFiles): string {
  // Built-in pictures (cup.svg, banner.svg…) work offline.
  const html = withAssets(rawHtml);
  const css = withAssets(rawCss);
  const safeJs = js.replace(/<\/script/gi, '<\/script');
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}${PRACTICE}<style>${BASE_CSS}${css}</style></head><body>${html}<script>try{${safeJs}\n}catch(e){window.onerror && window.onerror(e.message)}</script></body></html>`;
}

/** Puts a value in each `{{n}}` slot ("copy the look" lessons). */
export const fillSlots = (css: string, values: string[]) => values.reduce((c, v, i) => c.split(`{{${i}}}`).join(v), css);

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
