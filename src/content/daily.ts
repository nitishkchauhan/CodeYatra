// Built lessons: the daily challenge and the mistakes review reuse exercises from real lessons.
import { optionOrder } from './helpers';
import type { Lesson, Stage, Step } from './types';

const PRACTICE_TYPES: Step['type'][] = ['quiz', 'code', 'order', 'bug', 'predict', 'tap'];
export const DAILY_SIZE = 3;

type Lookup = (id: string) => Lesson | undefined;

/** Every practice step in a track, keyed "lessonId#stepIndex". */
export function practiceSteps(stage: Stage, getLesson: Lookup): { key: string; step: Step }[] {
  const ids = [...stage.units.flatMap((u) => u.lessons.map((l) => l.id)), ...stage.practice.map((p) => p.id)];
  return ids.flatMap((id) =>
    (getLesson(id)?.steps ?? []).flatMap((step, i) => (PRACTICE_TYPES.includes(step.type) ? [{ key: `${id}#${i}`, step }] : [])),
  );
}

export const dailyId = (day: string, stageId: string) => `daily-${day}-${stageId}`;
export const dailyDone = (completed: Record<string, unknown>, day: string) => Object.keys(completed).some((k) => k.startsWith(`daily-${day}`));

/** Three exercises from the learner's track, the same for everyone on the same day. */
export function dailyLesson(day: string, stage: Stage, getLesson: Lookup): Lesson | undefined {
  const pool = practiceSteps(stage, getLesson);
  if (!pool.length) return undefined;
  const picks = optionOrder(`${day}:${stage.id}`, pool.length)
    .slice(0, DAILY_SIZE)
    .map((i) => pool[i]);
  return {
    id: dailyId(day, stage.id),
    title: `Daily challenge · ${stage.short}`,
    kind: 'practice',
    minutes: 3,
    skill: 'loops',
    learned: ['Kept your skills fresh', 'One step closer to your streak goal'],
    steps: picks.map((p) => p.step),
    sources: picks.map((p) => p.key),
  };
}

/** The steps the learner got wrong, newest first, at most ten at a time. */
export function reviewLesson(mistakes: Record<string, string>, getLesson: Lookup): Lesson | undefined {
  const picks = Object.entries(mistakes)
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .flatMap(([key]) => {
      const [id, index] = key.split('#');
      const step: Step | undefined = getLesson(id)?.steps[Number(index)];
      return step && step.type !== 'concept' ? [{ key, step }] : [];
    })
    .slice(0, 10);
  if (!picks.length) return undefined;
  return {
    id: 'review',
    title: 'Review your mistakes',
    kind: 'practice',
    minutes: picks.length,
    skill: 'loops',
    learned: ['Turned mistakes into skills', 'Spaced practice makes it stick'],
    steps: picks.map((p) => p.step),
    sources: picks.map((p) => p.key),
  };
}
