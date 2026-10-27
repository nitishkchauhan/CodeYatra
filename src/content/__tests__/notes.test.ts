import { describe, expect, it } from '@jest/globals';

import { getLesson, STAGES } from '..';
import { NOTES } from '../notes';
import { runPage } from '../testing/page';
import { python, runJs, runPyFull } from '../testing/run';

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** The visible text of a page, one line per block (headings, paragraphs, list items, cells). */
function pageText(html: string): string[] {
  return html
    .replace(/<head>[\s\S]*?<\/head>/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/(h[1-6]|p|li|td|th|div|section|header|footer|caption)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

describe('module notes', () => {
  it.each(Object.entries(NOTES))('%s: belongs to a real module and is a short, complete read', (id, n) => {
    expect(getLesson(id)).toBeDefined();
    expect(n.sections.length).toBeGreaterThanOrEqual(3);
    expect(n.sections.length).toBeLessThanOrEqual(4);
    for (const s of n.sections) expect(words(s.body)).toBeLessThanOrEqual(120);
    expect(words(n.industry)).toBeLessThanOrEqual(90);
    expect(n.interview.length).toBeGreaterThanOrEqual(3);
    expect(n.cheat.length).toBeGreaterThanOrEqual(4);
    for (const w of n.example.walk) {
      expect(w.line).toBeGreaterThanOrEqual(1);
      expect(w.line).toBeLessThanOrEqual(n.example.code.length);
    }
  });

  it.each(Object.entries(NOTES))('%s: the worked example prints (or shows) exactly what the notes say', async (_, n) => {
    if (n.lang === 'css') {
      // The styles are well formed (every brace closed, every declaration ended) and the page shows the listed text.
      const css = n.example.code.join('\n');
      expect(css.split('{').length).toBe(css.split('}').length);
      for (const decl of css.replace(/\/\*[\s\S]*?\*\//g, '').match(/[\w-]+\s*:[^;{}]+[;}]/g) ?? []) expect(decl.trim().endsWith(';')).toBe(true);
      expect(pageText(n.example.page ?? '')).toEqual(n.example.output);
      return;
    }
    if (n.lang === 'html') {
      expect(pageText(n.example.code.join('\n'))).toEqual(n.example.output);
      return;
    }
    if (n.lang === 'javascript') {
      // JavaScript examples run as they are; one with a page runs on it, and the page then shows `output`.
      if (n.example.page !== undefined) {
        const page = await runPage({ html: n.example.page, js: n.example.code.join('\n') }, 700);
        expect(page.logs.filter((l) => l.level === 'error')).toEqual([]);
        expect(page.lines).toEqual(n.example.output);
        return;
      }
      expect(runJs(n.example.code.join('\n'))).toEqual(n.example.output);
      return;
    }
    if (!python) return;
    const r = runPyFull(n.example.code.join('\n'));
    expect(r.error).toBe('');
    expect(r.output).toEqual(n.example.output);
  });

  it('every Python module has notes', () => {
    const modules = STAGES.find((s) => s.id === 'python')!.units.flatMap((u) => u.lessons.map((l) => getLesson(l.id)!)).filter((l) => l.kind === 'lesson');
    expect(modules.filter((l) => !NOTES[l.id]).map((l) => l.id)).toEqual([]);
  });
});

describe('see it build (web pages)', () => {
  const steps = STAGES.flatMap((s) => s.units.flatMap((u) => u.lessons.map((r) => getLesson(r.id)!)))
    .flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const))
    .filter(([, s]) => s.type === 'pagebuild');
  it.each(steps)('%s: steps go forward through real lines and end at the last one', (_, s) => {
    if (s.type !== 'pagebuild') return;
    const lines = s.steps.map((x) => x.line);
    expect(lines).toEqual([...lines].sort((a, b) => a - b));
    expect(lines[0]).toBeGreaterThanOrEqual(1);
    expect(lines.at(-1)).toBe((s.js ?? s.css ?? s.html).length);
  });
});
