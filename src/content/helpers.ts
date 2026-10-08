import type { CodeLang, CodeStep, Preview, Seg, WebCheck, WebFile } from './types';

/**
 * A fill-in-the-gap exercise where each gap has exactly one right answer.
 * Every gap gets a named check, so learners see precisely which part is wrong.
 */
export function fill(spec: {
  kicker: string;
  title: string;
  instructions: string;
  lang: CodeLang;
  file: string;
  lines: Seg[][];
  tokens: string[];
  answers: { value: string; check: string }[];
  output?: string[];
  preview?: (gaps: string[]) => Preview;
}): CodeStep {
  return {
    type: 'code',
    kicker: spec.kicker,
    title: spec.title,
    instructions: spec.instructions,
    lang: spec.lang,
    file: spec.file,
    lines: spec.lines,
    tokens: spec.tokens,
    solution: spec.answers.map((a) => a.value),
    run: (gaps) => {
      const checks = spec.answers.map((a, i) => ({
        label: a.check,
        ok: gaps[i] === a.value,
      }));
      const pass = checks.every((c) => c.ok);
      return {
        pass,
        checks,
        output: pass ? spec.output : undefined,
        preview: spec.preview?.(gaps),
      };
    },
  };
}

/** A fixed shuffle per question, so the right answer is not always in the same place. */
export function optionOrder(prompt: string, count: number): number[] {
  let seed = 0;
  for (const ch of prompt) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const j = (seed >>> 16) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Starting order for a Parsons exercise: shuffled, and never already solved. */
export function scrambledOrder(seed: string, count: number): number[] {
  const order = optionOrder(seed, count);
  return order.every((v, i) => v === i) ? [...order.slice(1), order[0]] : order;
}

/** Placed lines are right when their text matches the solution, so duplicate lines may swap. */
export function isOrderCorrect(lines: string[], placed: number[]): boolean {
  return placed.length === lines.length && placed.every((p, i) => lines[p].trim() === lines[i].trim());
}

/** Compares program output loosely: case, spacing and line breaks don't matter. */
export const normalizeOutput = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

export function isPredictCorrect(answer: string, expected: string, accept: string[] = []): boolean {
  const got = normalizeOutput(answer);
  return [expected, ...accept].some((e) => normalizeOutput(e) === got);
}

/** Runs a web exercise's checks against the learner's files. */
export function runWebChecks(files: Partial<Record<WebFile, string>>, checks: WebCheck[]) {
  return checks.map((c) => ({ label: c.label, ok: c.pattern.test(files[c.file] ?? '') }));
}
