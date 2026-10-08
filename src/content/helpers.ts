import type { CodeLang, CodeStep, Preview, Seg } from './types';

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
