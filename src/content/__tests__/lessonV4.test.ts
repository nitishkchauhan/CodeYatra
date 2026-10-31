import { describe, expect, it } from '@jest/globals';

import { NOTES } from '../notes';
import { python, runPyFull } from '../testing/run';

const rows = <T,>(r: T[]): T[] => (r.length ? r : ([['(none)', null]] as unknown as T[]));

// Python Basic moved from Lesson v4 to v5 (lessonV5.test.ts). The Notes v4 format is still used by its notes.

describe('Notes v4', () => {
  const notes = Object.entries(NOTES).filter(([, n]) => n.summary);
  it('the pilot modules have v4 notes', () => {
    expect(notes.map(([id]) => id)).toEqual(expect.arrayContaining(['p-var-1', 'p-num-1', 'p-str-1']));
  });
  it.each(rows(notes.map(([id, n]) => [id, n] as const)))('%s: summary, real mistakes, a self-check, and runnable code', (_, n) => {
    if (!n) return;
    expect(n.summary).toHaveLength(3);
    expect(n.mistakes!.length).toBeGreaterThanOrEqual(2);
    expect(n.check).toHaveLength(3);
    for (const c of n.check!) {
      expect(new Set(c.options).size).toBe(c.options.length);
      expect(c.answer).toBeLessThan(c.options.length);
    }
    expect(JSON.stringify(n)).not.toMatch(/\b(namaste|chai|chalo|arre|thali|poha|samosa|roti)\b/i);
    if (!python) return;
    for (const m of n.mistakes!) {
      const bad = runPyFull(m.bad.join('\n'));
      const said = /Error\b/.test(m.error) ? bad.error.trim().split('\n').at(-1) : bad.output.join('\n');
      expect(said).toBe(m.error);
      expect(runPyFull(m.fix.join('\n')).error).toBe('');
    }
    // Every block runs on its own. A block that shows an error on purpose names it in a comment.
    if (n.runnable)
      for (const sec of n.sections) {
        if (!sec.code) continue;
        const r = runPyFull(sec.code.join('\n'));
        const shown = sec.code.join('\n').match(/#\s*(\w+Error: .*)$/m)?.[1];
        if (shown) expect(r.error.trim().split('\n').at(-1)).toBe(shown);
        else expect(r.error).toBe('');
      }
  });
});
