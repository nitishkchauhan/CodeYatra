// Module practice: new exercises for a module, opened with its "Practice" button.
import { optionOrder } from '../helpers';
import type { Lesson, LessonRef, Stage, Step } from '../types';
import { PYTHON_DRILLS } from './python';

/** Extra exercises per module, keyed by the module's lesson id. */
export const DRILLS: Record<string, Step[]> = { ...PYTHON_DRILLS };

export const DRILL_PREFIX = 'drill-';
export const drillId = (lessonId: string) => `${DRILL_PREFIX}${lessonId}`;
export const hasDrill = (lessonId: string) => (DRILLS[lessonId]?.length ?? 0) > 0;

/** The stored practice set for a module, without the review step (used to look up mistakes). */
export function drillBase(lessonId: string, title: string): Lesson | undefined {
  const steps = DRILLS[lessonId];
  if (!steps?.length) return undefined;
  return {
    id: drillId(lessonId),
    title: `Practice · ${title}`,
    kind: 'practice',
    minutes: steps.length + 1,
    skill: 'loops',
    learned: [`More practice on ${title.toLowerCase()}`, 'A quick look back at an earlier module'],
    steps,
  };
}

const REVIEW_TYPES: Step['type'][] = ['quiz', 'predict', 'bug', 'order', 'tap'];

/**
 * A module's practice round: its new exercises, then one exercise from an earlier
 * module in the same track (spaced review). Mistakes are saved against the original exercise.
 */
export function drillLesson(lessonId: string, stage: Stage | undefined, getLesson: (id: string) => Lesson | undefined): Lesson | undefined {
  const refs: LessonRef[] = stage?.units.flatMap((u) => u.lessons) ?? [];
  const ref = refs.find((r) => r.id === lessonId);
  const base = drillBase(lessonId, ref?.title ?? getLesson(lessonId)?.title ?? 'this module');
  if (!base) return undefined;
  const sources = base.steps.map((_, i) => `${base.id}#${i}`);

  const earlier = refs.slice(0, Math.max(0, refs.indexOf(ref as LessonRef)));
  const pool = earlier.flatMap((r) => (getLesson(r.id)?.steps ?? []).flatMap((step, i) => (REVIEW_TYPES.includes(step.type) ? [{ key: `${r.id}#${i}`, step }] : [])));
  if (!pool.length) return { ...base, sources };
  const pick = pool[optionOrder(lessonId, pool.length)[0]];
  return { ...base, steps: [...base.steps, pick.step], sources: [...sources, pick.key] };
}
