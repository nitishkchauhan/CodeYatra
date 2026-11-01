// Builders for the Python-based exam tracks in Lesson v5 (Placement, CBSE and Logic Foundations). Screens run real
// Python, as in the DSA track; each Module Challenge ends with the tested coding task from the older lesson.
import type { EditorStep, Lesson, SkillKey, Step } from '../../types';
import * as D from '../dsaV5/kit';

export { arrange, bugTask, chat, check, explore, matchUp, mcq, modules, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth, type Module } from '../dsaV5/kit';

/** Lesson and Challenge builders for one skill (it picks the code language: python, sql or c). */
export const kit = (skill: SkillKey) => ({
  lesson: (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...D.lesson(id, title, minutes, s), skill }),
  challenge: (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({ ...D.challenge(id, title, badge, learned, s, kind), skill }),
});

/** Challenge task 6: the coding task an older lesson ended with (its hidden tests still check every answer). */
export const task = (from: Lesson[], id: string, kicker = 'TASK 6 OF 6 · CODING ROUND'): EditorStep => {
  const s = from.find((l) => l.id === id)!.steps.findLast((x): x is EditorStep => x.type === 'editor')!;
  return { ...s, kicker };
};
