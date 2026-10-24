import { describe, expect, it } from '@jest/globals';

import { allLessons, type EditorStep, type PredictStep, type Step, type TryStep, type WebStep } from '..';
import { applyTweaks, assemble, buildPuzzle, lex, predictChoices, tweakables } from '../build';
import { playgroundPrograms, playSeed } from '../playground';
import { sqlProgram } from '../sqlFixture';
import { python, runJs, runNode, runPyFull } from '../testing/run';

const all = allLessons().flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type) as unknown as [string, Extract<Step, { type: T }>][];
const seed = (s: { kicker: string; title: string }) => `${s.kicker}|${s.title}`;
const trim = (s: string) => s.replace(/\n+$/, '');

describe('the lexer', () => {
  it('gives back every line of lesson code exactly', () => {
    for (const [, s] of of('editor')) for (const line of s.solution.split('\n')) expect(lex(line, s.lang).map((t) => t.text).join('')).toBe(line);
    for (const [, s] of of('web')) {
      for (const f of ['html', 'css', 'js'] as const) {
        const lang = f === 'js' ? 'javascript' : f;
        for (const line of (s.solution[f] ?? '').split('\n')) expect(lex(line, lang).map((t) => t.text).join('')).toBe(line);
      }
    }
  });
});

describe('build it (code exercises without a keyboard)', () => {
  it.each(of('editor'))('%s: the gaps filled with the answers give back the tested solution', (_, step: EditorStep) => {
    const p = buildPuzzle(step.solution, step.lang, seed(step), step.starter);
    expect(p.answers.length).toBeGreaterThanOrEqual(1);
    expect(p.answers.length).toBeLessThanOrEqual(6);
    expect(assemble(p.lines, p.answers)).toBe(trim(step.solution));
    for (const a of p.answers) expect(p.tokens).toContain(a);
    expect(new Set(p.tokens).size).toBe(p.tokens.length);
    // Some wrong pieces, so it's a real choice, but a bank that still fits on a phone screen.
    expect(p.tokens.length).toBeGreaterThan(new Set(p.answers).size);
    expect(p.tokens.length).toBeLessThanOrEqual(12);
  });

  it('most code exercises have at least two gaps', () => {
    const counts = of('editor').map(([, s]) => buildPuzzle(s.solution, s.lang, seed(s), s.starter).answers.length);
    expect(counts.filter((c) => c >= 2).length / counts.length).toBeGreaterThan(0.85);
  });

  it.each(of('web'))('%s: every page file filled with the answers gives back the solution', (_, step: WebStep) => {
    for (const f of ['html', 'css', 'js'] as const) {
      const code = step.solution[f];
      if (code === undefined) continue;
      const p = buildPuzzle(code, f === 'js' ? 'javascript' : f, `${seed(step)}:${f}`, step.starter[f] ?? '', 3);
      expect(assemble(p.lines, p.answers)).toBe(trim(code));
      for (const a of p.answers) expect(p.tokens).toContain(a);
    }
  });
});

describe('predict the output, as a choice', () => {
  it.each(of('predict'))('%s: one option is the real output and the others are different', (_, step: PredictStep) => {
    const c = predictChoices(step.answer, step.accept, seed(step), step.lines);
    expect(c.options.length).toBeGreaterThanOrEqual(3);
    expect(c.options[c.answer]).toBe(step.answer);
    const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const right = new Set([step.answer, ...(step.accept ?? [])].map(norm));
    expect(c.options.filter((o) => right.has(norm(o)))).toHaveLength(1);
    expect(new Set(c.options.map(norm)).size).toBe(c.options.length);
  });
});

describe('playground programs', () => {
  const progs = (['python', 'javascript'] as const).flatMap((lang) => playgroundPrograms()[lang].map((p) => [`${lang}:${p.id}`, lang, p] as const));
  it.each(progs)('%s: every tap-to-change value runs, and the build version gives back the program', (_, lang, p) => {
    const run = (code: string) => {
      if (lang === 'javascript') {
        try {
          runJs(code);
          return '';
        } catch (e) {
          return String(e);
        }
      }
      return python ? runPyFull(code).error : '';
    };
    expect(run(p.code)).toBe('');
    const tw = tweakables(p.code, lang, playSeed(p));
    tw.forEach((t, i) => {
      for (let o = 1; o < t.options.length; o++) expect(run(applyTweaks(p.code, lang, tw, tw.map((_, j) => (j === i ? o : 0))))).toBe('');
    });
    const b = buildPuzzle(p.code, lang, playSeed(p));
    expect(assemble(b.lines, b.answers)).toBe(trim(p.code));
  });
});

describe('try it: tap to change values', () => {
  const tries = of('try').filter(([, s]) => s.lang !== 'web');
  const runs = (step: TryStep, code: string): string => {
    if (step.lang === 'javascript') {
      if (/setTimeout|setInterval|Promise|await /.test(code)) return runNode(code).error.trim().split('\n').at(-1) ?? '';
      try {
        runJs(code);
        return '';
      } catch (e) {
        return String(e);
      }
    }
    if (!python) return '';
    return runPyFull(step.lang === 'sql' ? sqlProgram(code) : code).error;
  };
  it.each(tries)('%s: every value you can tap still runs cleanly', (_, step: TryStep) => {
    const tw = tweakables(step.starter, step.lang as 'python', seed(step));
    tw.forEach((t, i) => {
      for (let o = 1; o < t.options.length; o++) {
        const choice = tw.map((_, j) => (j === i ? o : 0));
        expect(runs(step, applyTweaks(step.starter, step.lang as 'python', tw, choice))).toBe('');
      }
    });
    // All changes together too.
    if (tw.length) expect(runs(step, applyTweaks(step.starter, step.lang as 'python', tw, tw.map((t) => t.options.length - 1)))).toBe('');
  });

  it('most try-its have something to tap', () => {
    const withTweaks = tries.filter(([, s]) => tweakables(s.starter, s.lang as 'python', seed(s)).length > 0);
    // The rest are run-and-watch: only values nothing else depends on are offered, so every change still runs.
    expect(withTweaks.length / tries.length).toBeGreaterThanOrEqual(0.5);
  });
});
