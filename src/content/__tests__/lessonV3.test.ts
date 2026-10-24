import { describe, expect, it } from '@jest/globals';

import { allLessons, isTeaching, STAGES, getLesson, type GroupStep, type MatchStep, type Step, type TraceStep } from '..';
import { parseTrace, traceProgram } from '../trace';
import { python, runPyFull } from '../testing/run';

const all = allLessons().flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s, l.id, i] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type).map(([k, s]) => [k, s] as const) as unknown as [string, Extract<Step, { type: T }>][];
const rows = <R,>(r: R[]): R[] => (r.length ? r : ([['(none)', null]] as unknown as R[]));

describe('watch it run', () => {
  it.each(rows(of('trace')))('%s: the real run gives the trace, and the question’s answer matches it', (_, step: TraceStep | null) => {
    if (!step || !python) return;
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

describe('Python, Lesson v3', () => {
  const python = STAGES.find((s) => s.id === 'python')!.units.flatMap((u) => u.lessons.map((r) => getLesson(r.id)!));
  const modules = python.filter((l) => l.kind === 'lesson');
  it.each(modules.map((l) => [l.id, l] as const))('%s: has a level, a moving or interactive card for every idea, watch-it-run and a match or sort', (_, l) => {
    expect(l.level).toBeDefined();
    for (const s of l.steps) if (s.type === 'concept') expect(!!(s.anim || s.visual || s.demo)).toBe(true);
    expect(l.steps.some((s) => s.type === 'trace')).toBe(true);
    expect(l.steps.some((s) => s.type === 'match' || s.type === 'group')).toBe(true);
  });
});
