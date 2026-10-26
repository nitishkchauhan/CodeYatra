// Small builders that keep lesson files short and readable.
// Each returns a plain step object; content tests check every one of them.
import type { BugStep, CodeLang, ConceptStep, GroupStep, HookStep, PageBuildStep, Lesson, MatchStep, MistakeStep, OrderStep, PredictStep, QuizStep, ScenarioStep, SkillKey, Step, TapStep, TraceStep, TryStep } from './types';

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
export function read(o: { kicker: string; title: string; body: string; lang?: CodeLang; code?: string[]; tip?: string; visual?: ConceptStep['visual']; anim?: ConceptStep['anim'] }): ConceptStep {
  return {
    type: 'concept',
    kicker: o.kicker,
    title: o.title,
    body: o.body,
    code: o.code && o.lang ? [{ lang: o.lang, label: LABEL[o.lang], lines: o.code }] : undefined,
    tip: o.tip,
    visual: o.visual,
    anim: o.anim,
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

/** Lesson v2 opener: a real situation, what you'll be able to do, and an optional code preview. */
export function hook(o: { kicker: string; title: string; story: string; goal: string; lang?: CodeLang; code?: string[] }): HookStep {
  return {
    type: 'hook',
    kicker: o.kicker,
    title: o.title,
    story: o.story,
    goal: o.goal,
    code: o.code && o.lang ? { lang: o.lang, label: LABEL[o.lang], lines: o.code } : undefined,
  };
}

export const tryIt = (o: Omit<TryStep, 'type'>): TryStep => ({ type: 'try', ...o });
export const mistake = (o: Omit<MistakeStep, 'type'>): MistakeStep => ({ type: 'mistake', ...o });
export const order = (o: Omit<OrderStep, 'type'>): OrderStep => ({ type: 'order', ...o });
export const bug = (o: Omit<BugStep, 'type'>): BugStep => ({ type: 'bug', ...o });
export const predict = (o: Omit<PredictStep, 'type'>): PredictStep => ({ type: 'predict', ...o });
export const tap = (o: Omit<TapStep, 'type'>): TapStep => ({ type: 'tap', ...o });
// Lesson v3
export const trace = (o: Omit<TraceStep, 'type' | 'lang'>): TraceStep => ({ type: 'trace', lang: 'python', ...o });
export const match = (o: Omit<MatchStep, 'type'>): MatchStep => ({ type: 'match', ...o });
export const group = (o: Omit<GroupStep, 'type'>): GroupStep => ({ type: 'group', ...o });
export const scenario = (o: Omit<ScenarioStep, 'type'>): ScenarioStep => ({ type: 'scenario', ...o });
export const pageBuild = (o: Omit<PageBuildStep, 'type'>): PageBuildStep => ({ type: 'pagebuild', ...o });

/** A lesson: reading first, then practice. */
export function lesson(id: string, title: string, skill: SkillKey, learned: string[], steps: Step[], minutes = 6): Lesson {
  return { id, title, kind: 'lesson', minutes, skill, learned, steps };
}
