// Runs a lesson page the way the app does (buildPage, with the practice server) in a browser-like DOM,
// and collects the console lines and errors the page reports, and the text it shows.
import { JSDOM } from 'jsdom';

import { buildPage, readPageMessage, type PageLog, type WebFiles } from '@/lib/web/page';

const BLOCKS = 'h1, h2, h3, h4, h5, h6, p, li, div, section, header, footer, button, label';

export async function runPage(files: WebFiles, waitMs = 0): Promise<{ logs: PageLog[]; lines: string[]; window: JSDOM['window'] }> {
  const logs: PageLog[] = [];
  const dom = new JSDOM(buildPage(files), {
    runScripts: 'dangerously',
    beforeParse(window) {
      (window as unknown as { ReactNativeWebView: { postMessage: (m: string) => void } }).ReactNativeWebView = {
        postMessage: (m) => {
          const log = readPageMessage(m);
          if (log) logs.push(log);
        },
      };
    },
  });
  if (waitMs) await new Promise((r) => setTimeout(r, waitMs));
  // The visible text, one line per block (heading, paragraph, list item, button), without the scripts.
  const body = dom.window.document.body.cloneNode(true) as HTMLElement;
  for (const s of body.querySelectorAll('script')) s.remove();
  for (const el of body.querySelectorAll(BLOCKS)) el.append('\n');
  const lines = (body.textContent ?? '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return { logs, lines, window: dom.window };
}
