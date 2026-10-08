// Builds a self-contained HTML page from the learner's HTML, CSS and JS, with
// console.log and errors forwarded to the app so they can be shown below the preview.

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

const BASE_CSS = 'body{font-family:system-ui,-apple-system,Roboto,sans-serif;margin:12px;line-height:1.45;color:#16142B;}';

/** A full document. `</script>` in learner JS is escaped so it can't break out of its tag. */
export function buildPage({ html, css = '', js = '' }: WebFiles): string {
  const safeJs = js.replace(/<\/script/gi, '<\/script');
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${BRIDGE}<style>${BASE_CSS}${css}</style></head><body>${html}<script>try{${safeJs}\n}catch(e){window.onerror && window.onerror(e.message)}</script></body></html>`;
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
