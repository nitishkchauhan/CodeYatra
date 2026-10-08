import { describe, expect, it } from '@jest/globals';

import { allLessons, isOrderCorrect, isPredictCorrect, runWebChecks, scrambledOrder, type BugStep, type OrderStep, type PredictStep, type Step, type TapStep, type WebStep } from '..';
import { outputOf } from '../testing/run';
import { tokenize } from '@/components/Code';

const all = allLessons().flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type) as unknown as [string, Extract<Step, { type: T }>][];
// `it.each` needs at least one row; content may not have every type yet.
const rows = <R>(r: R[]): R[] => (r.length ? r : ([['(none)', null]] as unknown as R[]));

describe('order the lines', () => {
  it.each(rows(of('order')))('%s starts scrambled and its solution works', (_, step: OrderStep | null) => {
    if (!step) return;
    expect(step.lines.length).toBeGreaterThanOrEqual(3);
    expect(isOrderCorrect(step.lines, scrambledOrder(step.title + step.lines.join('\n'), step.lines.length))).toBe(false);
    expect(isOrderCorrect(step.lines, step.lines.map((_, i) => i))).toBe(true);
    if (step.output) {
      const out = outputOf(step.lang, step.lines.join('\n'));
      if (out) expect(out).toEqual(step.output);
    }
  });
});

describe('find the bug', () => {
  it.each(rows(of('bug')))('%s points at a real line and fixes it', (_, step: BugStep | null) => {
    if (!step) return;
    expect(step.bug).toBeGreaterThanOrEqual(0);
    expect(step.bug).toBeLessThan(step.lines.length);
    expect(step.fix.trim()).not.toBe(step.lines[step.bug].trim());
    // The fixed program must run cleanly wherever we can run it.
    const fixed = step.lines.map((l, i) => (i === step.bug ? step.fix : l)).join('\n');
    expect(() => outputOf(step.lang, fixed)).not.toThrow();
  });
});

describe('predict the output', () => {
  it.each(rows(of('predict')))('%s has the output the code really prints', (_, step: PredictStep | null) => {
    if (!step) return;
    expect(step.answer.trim()).not.toBe('');
    const out = outputOf(step.lang, step.lines.join('\n'));
    if (out) expect(isPredictCorrect(out.join('\n'), step.answer)).toBe(true);
  });
});

describe('tap the token', () => {
  it.each(rows(of('tap')))('%s targets exactly one token on its line', (_, step: TapStep | null) => {
    if (!step) return;
    const line = step.lines[step.target.line];
    expect(line).toBeDefined();
    const hits = tokenize(line, step.lang).filter((t) => t.text === step.target.token);
    expect(hits).toHaveLength(1);
  });
});

describe('build a web page', () => {
  it.each(rows(of('web')))('%s: the solution passes and the starter does not', (_, step: WebStep | null) => {
    if (!step) return;
    expect(runWebChecks(step.solution, step.checks).filter((c) => !c.ok)).toEqual([]);
    expect(runWebChecks(step.starter, step.checks).every((c) => c.ok)).toBe(false);
  });
});

describe('answer checking', () => {
  it('ignores case and spacing in predictions', () => {
    expect(isPredictCorrect('  Hello   World\n', 'hello world')).toBe(true);
    expect(isPredictCorrect('3', '3.0')).toBe(false);
    expect(isPredictCorrect('3.0', '3', ['3.0'])).toBe(true);
  });

  it('accepts swapped duplicate lines in order exercises', () => {
    const lines = ['a()', '}', '}'];
    expect(isOrderCorrect(lines, [0, 2, 1])).toBe(true);
    expect(isOrderCorrect(lines, [1, 0, 2])).toBe(false);
  });
});

describe('syntax colouring', () => {
  const comment = (line: string, lang: Parameters<typeof tokenize>[1]) => tokenize(line, lang).some((t) => t.text.length > 2 && /^(\/\/|#|--)/.test(t.text));
  it('treats // as floor division in Python, and as a comment in JavaScript and C', () => {
    expect(comment('mid = (lo + hi) // 2', 'python')).toBe(false);
    expect(comment('x = 1 // half', 'javascript')).toBe(true);
    expect(comment('int a = 1; // one', 'c')).toBe(true);
  });
  it('keeps #include as code in C, and # as a comment in Python', () => {
    expect(comment('#include <stdio.h>', 'c')).toBe(false);
    expect(comment('# note', 'python')).toBe(true);
  });
});
