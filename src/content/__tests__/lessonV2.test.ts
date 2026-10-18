import { describe, expect, it } from '@jest/globals';

import { allLessons, getLesson, STAGES, type MistakeStep, type Step, type TryStep } from '..';
import { python, runJs, runPyFull } from '../testing/run';
import { sqlProgram } from '../sqlFixture';

const steps: (readonly [string, Step])[] = allLessons().flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const));
const mistakes = steps.filter((r): r is readonly [string, MistakeStep] => r[1].type === 'mistake');
const tries = steps.filter((r): r is readonly [string, TryStep] => r[1].type === 'try');
const trackModules = (id: string) => STAGES.find((s) => s.id === id)!.units.flatMap((u) => u.lessons.map((l) => getLesson(l.id)!));
const pythonModules = trackModules('python');

describe('Python Foundations follows Lesson v2', () => {
  it('has 12 modules and a final project', () => {
    expect(pythonModules.filter((l) => l.kind === 'lesson')).toHaveLength(12);
    expect(pythonModules.at(-1)!.kind).toBe('project');
  });

  it.each(pythonModules.filter((l) => l.kind === 'lesson').map((l) => [l.id, l] as const))('%s: hook, 3 cards, try it, a mistake, checks, practice, 3-point recap', (_, lesson) => {
    const types = lesson.steps.map((s) => s.type);
    expect(types[0]).toBe('hook');
    expect(types.filter((t) => t === 'concept')).toHaveLength(3);
    expect(types).toContain('try');
    expect(types).toContain('mistake');
    // Two quick checks, then a coding exercise last.
    expect(types.filter((t) => ['quiz', 'predict', 'bug', 'tap', 'order'].includes(t)).length).toBeGreaterThanOrEqual(2);
    expect(types.at(-1)).toBe('editor');
    // Teaching comes before testing.
    expect(types.indexOf('try')).toBeLessThan(types.findIndex((t) => t === 'quiz' || t === 'predict' || t === 'bug'));
    expect(lesson.learned).toHaveLength(3);
  });

  it('keeps every reading card short (one idea, under 60 words)', () => {
    for (const lesson of pythonModules) {
      for (const s of lesson.steps) if (s.type === 'concept') expect(s.body.split(/\s+/).length).toBeLessThanOrEqual(60);
    }
  });
});

describe.each(['next', 'sql', 'dsa', 'js'])('%s follows Lesson v2', (track) => {
  const next = trackModules(track);
  it('has at least 10 modules and ends with a project', () => {
    expect(next.filter((l) => l.kind === 'lesson').length).toBeGreaterThanOrEqual(10);
    expect(next.at(-1)!.kind).toBe('project');
  });
  it.each(next.filter((l) => l.kind === 'lesson').map((l) => [l.id, l] as const))('%s: hook, 3 cards, try it, a mistake, checks, a coding exercise, official reading', (_, lesson) => {
    const types = lesson.steps.map((s) => s.type);
    expect(types[0]).toBe('hook');
    expect(types.filter((t) => t === 'concept')).toHaveLength(3);
    expect(types).toContain('try');
    expect(types).toContain('mistake');
    // A coding exercise last: in the code editor, or the live web page builder for DOM work.
    expect(['editor', 'web']).toContain(types.at(-1));
    expect(lesson.learned).toHaveLength(3);
    for (const s of lesson.steps) if (s.type === 'concept') expect(s.body.split(/\s+/).length).toBeLessThanOrEqual(60);
    expect(lesson.reading?.length).toBeGreaterThan(0);
  });
});

describe('further reading', () => {
  const all = allLessons().flatMap((l) => (l.reading ?? []).map((r) => [l.id, r] as const));
  it.each(all)('%s: %o is https, from an official source, with a review date', (_, r) => {
    expect(r.url).toMatch(/^https:\/\/(nextjs\.org|react\.dev|developer\.mozilla\.org|docs\.python\.org|www\.sqlite\.org|www\.postgresql\.org)\//);
    expect(r.reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('common mistakes', () => {
  it.each(mistakes)('%s: the wrong code really fails that way and the fix runs', (_, step) => {
    expect(step.wrong.join('\n')).not.toBe(step.right.join('\n'));
    if (step.lang === 'sql' && python) {
      // SQL mistakes run against the sample database; the shown error is SQLite's own message.
      const wrongRun = runPyFull(sqlProgram(step.wrong.join('\n')));
      if (wrongRun.error) expect(wrongRun.error).toContain(step.error);
      // A query that returns nothing is shown as "(no rows)".
      else expect(wrongRun.output.join('\n') || '(no rows)').toBe(step.error);
      expect(runPyFull(sqlProgram(step.right.join('\n'))).error).toBe('');
      return;
    }
    if (step.lang === 'javascript') {
      // JavaScript mistakes run too: either the exact error the engine throws, or what it wrongly prints.
      let error = '';
      let out: string[] = [];
      try {
        out = runJs(step.wrong.join('\n'));
      } catch (e) {
        error = `${(e as Error).name}: ${(e as Error).message}`;
      }
      if (/Error\b/.test(step.error)) expect(error).toBe(step.error);
      else expect(out.join('\n')).toBe(step.error);
      expect(() => runJs(step.right.join('\n'))).not.toThrow();
      return;
    }
    if (step.lang !== 'python' || !python) return;
    if (!step.hang) {
      const wrong = runPyFull(step.wrong.join('\n'));
      // Either the exact error Python gives, or (for mistakes that don't crash) what it wrongly prints.
      if (/Error\b/.test(step.error)) expect(wrong.error).toBe(step.error);
      else expect(wrong.output.join('\n')).toBe(step.error);
    }
    const right = runPyFull(step.right.join('\n'));
    expect(right.error).toBe('');
    expect(right.code).toBe(0);
  });
});

describe('try it', () => {
  it.each(tries)('%s: the starter code runs cleanly', (_, step) => {
    expect(step.ideas.length).toBeGreaterThanOrEqual(2);
    if (step.lang === 'javascript') {
      const out = runJs(step.starter);
      expect(out.length).toBeGreaterThan(0);
      return;
    }
    if (step.lang === 'sql' && python) {
      const r = runPyFull(sqlProgram(step.starter));
      expect(r.error).toBe('');
      expect(r.output.length).toBeGreaterThan(0);
      return;
    }
    if (step.lang !== 'python' || !python) return;
    const r = runPyFull(step.starter);
    expect(r.error).toBe('');
    expect(r.output.length).toBeGreaterThan(0);
  });
});
