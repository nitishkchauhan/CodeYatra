import { describe, expect, it } from '@jest/globals';

import { allLessons, isTeaching, getLesson, type GroupStep, type MatchStep, type Step, type TraceStep } from '..';
import { parseTrace, traceProgram } from '../trace';
import { declaredNames, traceProgramJs } from '../traceJs';
import { runPage } from '../testing/page';
import { python, runJs, runPyFull } from '../testing/run';

const all = allLessons().flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s, l.id, i] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type).map(([k, s]) => [k, s] as const) as unknown as [string, Extract<Step, { type: T }>][];
const rows = <R,>(r: R[]): R[] => (r.length ? r : ([['(none)', null]] as unknown as R[]));

describe('watch it run', () => {
  it.each(rows(of('trace')))('%s: the real run gives the trace, and the question’s answer matches it', (_, step: TraceStep | null) => {
    if (!step) return;
    if (step.lang === 'javascript') {
      // Names that browsers already define would show the browser's value where the lesson has none.
      expect(declaredNames(step.code).filter((n) => ['name', 'status', 'length', 'self', 'top', 'parent', 'origin', 'event', 'close', 'open', 'print', 'location', 'history', 'screen', 'frames'].includes(n))).toEqual([]);
      const t = parseTrace(runJs(traceProgramJs(step.code)))!;
      expect(t).not.toBeNull();
      expect(t.error).toBeUndefined();
      expect(t.cut).toBeUndefined();
      expect(t.frames.length).toBeGreaterThan(2);
      // Every line that runs is shown, and the trace prints exactly what the program prints when run normally.
      expect(t.frames.at(-1)!.out.replace(/\n$/, '')).toBe(runJs(step.code.join('\n')).join('\n'));
      if (step.ask) {
        const a = step.ask;
        expect(new Set(a.options).size).toBe(a.options.length);
        const final = t.frames.at(-1)!;
        const truth = 'var' in a.check ? final.vars[a.check.var] : final.out.replace(/\n$/, '').split('\n').at(-1);
        expect(a.options[a.answer]).toBe(truth);
      }
      return;
    }
    if (!python) return;
    const r = runPyFull(traceProgram(step.code));
    expect(r.error).toBe('');
    const t = parseTrace(r.output)!;
    expect(t).not.toBeNull();
    expect(t.error).toBeUndefined();
    expect(t.cut).toBeUndefined();
    expect(t.frames.length).toBeGreaterThan(2);
    // The trace prints exactly what the program prints when run normally.
    const plain = runPyFull(step.code.join('\n'));
    expect(t.frames.at(-1)!.out.replace(/\n$/, '')).toBe(plain.output.join('\n'));
    if (step.ask) {
      const a = step.ask;
      expect(new Set(a.options).size).toBe(a.options.length);
      expect(a.answer).toBeLessThan(a.options.length);
      const final = t.frames.at(-1)!;
      const truth = 'var' in a.check ? final.vars[a.check.var] : final.out.replace(/\n$/, '').split('\n').at(-1);
      expect(a.options[a.answer]).toBe(truth);
    }
  });
});

describe('match the pairs', () => {
  it.each(rows(of('match')))('%s: at least 3 pairs, each side unique', (_, step: MatchStep | null) => {
    if (!step) return;
    expect(step.pairs.length).toBeGreaterThanOrEqual(3);
    expect(step.pairs.length).toBeLessThanOrEqual(6);
    expect(new Set(step.pairs.map((p) => p[0])).size).toBe(step.pairs.length);
    expect(new Set(step.pairs.map((p) => p[1])).size).toBe(step.pairs.length);
  });
});

describe('sort into groups', () => {
  it.each(rows(of('group')))('%s: two or three groups, each used, items unique', (_, step: GroupStep | null) => {
    if (!step) return;
    expect(step.groups.length).toBeGreaterThanOrEqual(2);
    expect(step.groups.length).toBeLessThanOrEqual(3);
    for (let g = 0; g < step.groups.length; g++) expect(step.items.some((x) => x.group === g)).toBe(true);
    expect(new Set(step.items.map((x) => x.text)).size).toBe(step.items.length);
    expect(step.items.length).toBeGreaterThanOrEqual(4);
  });
});

describe('work scenarios', () => {
  const scenarios = all.filter(([, s]) => s.type === 'scenario');
  // Four values per row: with fewer, Jest would pass its done callback as lessonId.
  const scenarioRows = (scenarios.length ? scenarios : [['(none)', null, '', 0]]) as unknown as [string, Step | null, string, number][];
  it.each(scenarioRows)('%s: is followed by a task to do', (_, _s, lessonId, i) => {
    if (!lessonId) return;
    const next = getLesson(lessonId)!.steps[i + 1];
    expect(next).toBeDefined();
    expect(isTeaching(next)).toBe(false);
  });
});

// Every Python lesson now follows Lesson v5 (lessonV5.test.ts).

// JavaScript lessons now follow Lesson v5 (lessonV5.test.ts).

describe('JavaScript pages', () => {
  const pageBuilds = all.filter(([, s]) => s.type === 'pagebuild' && !!s.js).map(([k, s]) => [k, s] as const);
  it.each(pageBuilds.length ? pageBuilds : [['(none)', null] as unknown as (typeof pageBuilds)[number]])('%s: the script up to every step runs on the page without an error', async (_, s) => {
    if (s?.type !== 'pagebuild' || !s.js) return;
    for (const { line } of s.steps) {
      const page = await runPage({ html: s.html.join('\n'), css: s.css?.join('\n'), js: s.js.slice(0, line).join('\n') }, 700);
      expect(page.logs.filter((l) => l.level === 'error')).toEqual([]);
    }
  });
  const webs = all.filter(([, s]) => s.type === 'web' && !!s.solution.js).map(([k, s]) => [k, s] as const);
  it.each(webs)('%s: the solution page runs without an error', async (_, s) => {
    if (s.type !== 'web') return;
    const page = await runPage({ ...s.solution, react: s.react, next: s.next }, s.next ? 1200 : 700);
    expect(page.logs.filter((l) => l.level === 'error')).toEqual([]);
  });
});
