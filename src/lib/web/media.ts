// "Resize the screen" shows a page at a chosen width inside a phone-sized preview. The page is drawn at that width
// and scaled down to fit, but a scaled page still has the phone's real viewport, so width media queries are worked
// out here instead: a block that matches the chosen width is unwrapped, one that doesn't is removed. Other queries
// (dark mode, reduced motion…) are left for the browser.
import { buildPage, type WebFiles } from './page';

const PX = { px: 1, rem: 16, em: 16 } as const;

/** true/false for a query made only of width conditions; null when it tests anything else. */
export function widthQueryMatches(query: string, width: number): boolean | null {
  const parts = query
    .toLowerCase()
    .replace(/^\s*(only\s+)?(screen|all)\s*(and\s*)?/, '')
    .split(/\s+and\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parts.length) return true;
  for (const p of parts) {
    const m = /^\(\s*(min|max)-width\s*:\s*([\d.]+)\s*(px|rem|em)\s*\)$/.exec(p);
    if (!m) return null;
    const limit = Number(m[2]) * PX[m[3] as keyof typeof PX];
    if (m[1] === 'min' ? width < limit : width > limit) return false;
  }
  return true;
}

/** The CSS as the browser would apply it at `width`: matching width queries unwrapped, the others dropped. */
export function cssAtWidth(css: string, width: number): string {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf('@media', i);
    if (at < 0) break;
    const open = css.indexOf('{', at);
    if (open < 0) break;
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const verdict = widthQueryMatches(css.slice(at + 6, open), width);
    out += css.slice(i, at);
    if (verdict === null) out += css.slice(at, j);
    else if (verdict) out += cssAtWidth(css.slice(open + 1, j - 1), width);
    i = j;
  }
  return out + css.slice(i);
}

/** vw is a share of the screen width; in a scaled preview that is the chosen width, not the phone's. */
export const vwAt = (css: string, width: number) => css.replace(/(\d*\.?\d+)vw\b/g, (_, n: string) => `${+((Number(n) * width) / 100).toFixed(2)}px`);

/** The lesson's `body` rules, moved onto the pretend screen's inner box. */
export const bodyToScreen = (css: string) => css.replace(/(^|[\s,}>])body\b(?=[^{}]*\{)/g, '$1#cy-vp');

/**
 * A page drawn `width` pixels wide inside a white "screen", scaled down to fit the preview (never up, so a phone
 * width looks like a phone). The real body stays plain; the lesson's body styles apply to the screen.
 */
export function pageAtWidth(files: WebFiles, width: number): string {
  // A transform doesn't shrink the space a box takes, so an outer box clips it to the scaled height.
  const fit = `<script>(function(){var o=document.getElementById('cy-outer'),f=document.getElementById('cy-frame');function fit(){var s=Math.min(1,document.documentElement.clientWidth/${width});f.style.transform='scale('+s+')';o.style.height=Math.ceil(f.offsetHeight*s)+'px';}fit();window.addEventListener('load',fit);setTimeout(fit,300);})();</script>`;
  return buildPage({
    html: `<div id="cy-outer" style="overflow:hidden"><div id="cy-frame" style="width:${width}px;transform-origin:0 0;background:#fff;display:flow-root;box-shadow:inset 0 0 0 1px #C9C3FF"><div id="cy-vp">${files.html}</div></div></div>${fit}`,
    css: `html,body{margin:0 !important;padding:0 !important;overflow-x:hidden;background:#EEEBF8}\n${bodyToScreen(vwAt(cssAtWidth(files.css ?? '', width), width))}`,
    js: files.js,
  });
}
