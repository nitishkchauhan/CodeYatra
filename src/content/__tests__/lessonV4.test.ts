import { describe, expect, it } from '@jest/globals';

import { allLessons, isTeaching, type BugStep, type CodeStep, type Lesson, type TraceStep, type TryStep } from '..';
import { applyTweaks, tweakables } from '../build';
import { NOTES } from '../notes';
import { parseTrace, traceProgram } from '../trace';
import { python, runPyFull } from '../testing/run';

// Lesson v4 (APP-PLAN Part 3): every screen asks for an action, and every answer is checked against real Python.
const v4: Lesson[] = allLessons().filter((l) => l.format === 'v4');
const rows = <T,>(r: T[]): T[] => (r.length ? r : ([['(none)', null]] as unknown as T[]));
const stepsOf = <T extends { type: string }>(type: T['type']) => v4.flatMap((l) => l.steps.filter((s) => s.type === type).map((s) => [`${l.id}: ${(s as { title?: string }).title ?? type}`, s as unknown as T] as const));

describe('Lesson v4 shape', () => {
  it('has the pilot modules', () => {
    expect(v4.map((l) => l.id)).toEqual(['p-var-1', 'p-num-1', 'p-str-1', 'p-if-1', 'p-loop-1', 'p-while-1', 'p-loop-2', 'p-dict-1', 'p-fn-1', 'p-err-1', 'p-file-1', 'p-class-1']);
  });

  it.each(v4.map((l) => [l.id, l] as const))('%s: guess first, 3 cards with checks, try with targets, predict, bug, sort, checks, build, recall', (_, l) => {
    const types = l.steps.map((s) => s.type);
    expect(types[0]).toBe('quiz');
    const cards = l.steps.filter((s) => s.type === 'concept');
    expect(cards).toHaveLength(3);
    for (const c of cards) {
      expect(c.check).toBeDefined();
      expect(c.body.split(/\s+/).length).toBeLessThanOrEqual(40);
    }
    expect(l.steps.some((s) => s.type === 'try' && (s.goals?.length ?? 0) >= 2)).toBe(true);
    expect(l.steps.some((s) => s.type === 'trace' && (s.stops?.length ?? 0) >= 2)).toBe(true);
    expect(l.steps.some((s) => s.type === 'bug' && !!s.error)).toBe(true);
    expect(types.includes('group') || types.includes('match')).toBe(true);
    expect(types).toContain('code');
    expect(types.at(-1)).toBe('recall');
    expect(l.learned).toHaveLength(3);
    expect(l.reading?.length).toBeGreaterThan(0);
    // Never two plain "read and tap Next" screens in a row.
    const plain = l.steps.map((s) => isTeaching(s) && !(s.type === 'concept' && s.check) && s.type !== 'try' && s.type !== 'recall');
    expect(plain.some((p, i) => p && plain[i + 1])).toBe(false);
  });

  it.each(v4.flatMap((l) => l.steps.flatMap((s, i) => (s.type === 'concept' && s.check ? [[`${l.id}#${i}`, s.check] as const] : []))))('%s: the card check has distinct options and a valid answer', (_, ask) => {
    expect(new Set(ask.options).size).toBe(ask.options.length);
    expect(ask.answer).toBeLessThan(ask.options.length);
    expect(ask.hint.length).toBeGreaterThan(10);
    expect(ask.why.length).toBeGreaterThan(10);
  });

  it('uses no Hindi words', () => {
    const text = JSON.stringify(v4);
    expect(text).not.toMatch(/\b(namaste|chai|chalo|arre|accha|thali|poha|samosa|roti|dal|bhai|didi|kya|haan|nahi)\b/i);
  });
});

describe('Lesson v4 against real Python', () => {
  it.each(rows(stepsOf<TraceStep>('trace').filter(([, s]) => s.stops)))('%s: each stop’s answer is what really happens', (_, step) => {
    if (!step || !python) return;
    const t = parseTrace(runPyFull(traceProgram(step.code)).output)!;
    expect(t.error).toBeUndefined();
    let from = -1;
    for (const stop of step.stops!) {
      const at = t.frames.findIndex((f, i) => f.line === stop.line && i > from);
      expect(at).toBeGreaterThanOrEqual(0);
      from = at;
      const after = t.frames[at + 1];
      const truth = 'var' in stop.check ? after.vars[stop.check.var] : after.out.replace(/\n$/, '').split('\n').at(-1);
      expect(stop.options[stop.answer]).toBe(truth);
      expect(new Set(stop.options).size).toBe(stop.options.length);
    }
  });

  it.each(rows(stepsOf<BugStep>('bug').filter(([, s]) => s.error)))('%s: the buggy program really prints the error, and the fix works', (_, step) => {
    if (!step || !python) return;
    const bad = runPyFull(step.lines.join('\n'));
    // A crash is compared by its last line; printed output is compared in full.
    const said = /Error\b/.test(step.error!) ? bad.error.trim().split('\n').at(-1) : bad.output.join('\n');
    expect(said).toBe(step.error);
    const fixed = runPyFull(step.lines.map((l, i) => (i === step.bug ? step.fix : l)).join('\n'));
    expect(fixed.error).toBe('');
  });

  it.each(rows(stepsOf<TryStep>('try').filter(([, s]) => s.goals)))('%s: every target can be reached by tapping values', (_, step) => {
    if (!step || !python) return;
    const tw = tweakables(step.starter, 'python', `${step.kicker}|${step.title}`);
    const combos = tw.reduce<number[][]>((acc, t) => acc.flatMap((c) => t.options.map((_o, i) => [...c, i])), [[]]);
    const outs = new Set(combos.map((c) => runPyFull(applyTweaks(step.starter, 'python', tw, c)).output.at(-1)));
    // The starting program doesn't already hit a target.
    expect(step.goals!.map((g) => g.output)).not.toContain(runPyFull(step.starter).output.at(-1));
    for (const g of step.goals!) expect(outs).toContain(g.output);
  });

  it.each(rows(stepsOf<CodeStep>('code')))('%s: the solution really prints what the step says', (_, step) => {
    if (!step || !python) return;
    const program = step.lines.map((line) => line.map((seg) => (typeof seg === 'string' ? seg : step.solution[seg.gap])).join('')).join('\n');
    expect(runPyFull(program).output).toEqual(step.run(step.solution).output);
  });
});

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
