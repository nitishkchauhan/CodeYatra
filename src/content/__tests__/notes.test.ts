import { describe, expect, it } from '@jest/globals';

import { getLesson, STAGES } from '..';
import { NOTES } from '../notes';
import { python, runPyFull } from '../testing/run';

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

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

  it.each(Object.entries(NOTES))('%s: the worked example prints exactly what the notes say', (_, n) => {
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
