// Small builders that keep lesson files short and readable.
// Each returns a plain step object; content tests check every one of them.
import type { BugStep, CodeLang, ConceptStep, Lesson, OrderStep, PredictStep, QuizStep, SkillKey, Step, TapStep } from './types';

const LABEL: Record<CodeLang, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  jsx: 'JSX',
  c: 'C',
  java: 'Java',
  sql: 'SQL',
  bash: 'Terminal',
};

/** A reading card. `code` is one sample in `lang`. */
export function read(o: { kicker: string; title: string; body: string; lang?: CodeLang; code?: string[]; tip?: string }): ConceptStep {
  return {
    type: 'concept',
    kicker: o.kicker,
    title: o.title,
    body: o.body,
    code: o.code && o.lang ? [{ lang: o.lang, label: LABEL[o.lang], lines: o.code }] : undefined,
    tip: o.tip,
  };
}

/** A multiple-choice check. The first option is the right one; the app shuffles them. */
export function quiz(o: { prompt: string; options: [string, ...string[]]; right: string; wrong: string; lang?: CodeLang; code?: string[]; mono?: boolean }): QuizStep {
  return {
    type: 'quiz',
    prompt: o.prompt,
    options: o.options,
    answer: 0,
    right: o.right,
    wrong: o.wrong,
    mono: o.mono,
    code: o.code && o.lang ? { lang: o.lang, label: LABEL[o.lang], lines: o.code } : undefined,
  };
}

export const order = (o: Omit<OrderStep, 'type'>): OrderStep => ({ type: 'order', ...o });
export const bug = (o: Omit<BugStep, 'type'>): BugStep => ({ type: 'bug', ...o });
export const predict = (o: Omit<PredictStep, 'type'>): PredictStep => ({ type: 'predict', ...o });
export const tap = (o: Omit<TapStep, 'type'>): TapStep => ({ type: 'tap', ...o });

/** A lesson: reading first, then practice. */
export function lesson(id: string, title: string, skill: SkillKey, learned: string[], steps: Step[], minutes = 6): Lesson {
  return { id, title, kind: 'lesson', minutes, skill, learned, steps };
}
