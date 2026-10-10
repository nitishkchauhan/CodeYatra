import { describe, expect, it } from '@jest/globals';

import { allLessons, drillId, getLesson, hasDrill, STAGES } from '..';
import { isReplay, lessonReward } from '@/state/model';

const pythonModules = STAGES.find((s) => s.id === 'python')!.units.flatMap((u) => u.lessons.map((l) => l.id));

describe('module practice', () => {
  it('every Python module has at least 4 new exercises', () => {
    for (const id of pythonModules) {
      expect(hasDrill(id)).toBe(true);
      const base = allLessons().find((l) => l.id === drillId(id))!;
      expect(base.steps.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('adds one review exercise from an earlier module, saved against the original', () => {
    const round = getLesson(drillId('p-dict-1'))!;
    const review = round.sources!.at(-1)!;
    const [from] = review.split('#');
    expect(from.startsWith('drill-')).toBe(false);
    expect(pythonModules.indexOf(from)).toBeLessThan(pythonModules.indexOf('p-dict-1'));
    expect(round.steps).toHaveLength(round.sources!.length);
  });

  it('the first module has nothing earlier to review', () => {
    const round = getLesson(drillId(pythonModules[0]))!;
    expect(round.sources!.every((s) => s.startsWith('drill-'))).toBe(true);
  });

  it('mistakes in practice can be looked up again for the mistakes review', () => {
    const round = getLesson(drillId('p-fn-1'))!;
    const [id, index] = round.sources![0].split('#');
    expect(getLesson(id)!.steps[Number(index)]).toBe(round.steps[0]);
  });

  it('pays practice XP once, then replay XP', () => {
    const id = drillId('p-var-1');
    expect(isReplay({ completed: {} }, id)).toBe(false);
    expect(isReplay({ completed: { [id]: { xp: 20, accuracy: 100, at: '2026-10-10' } } }, id)).toBe(true);
    expect(lessonReward('practice', 0, false)).toEqual({ xp: 20, coins: 10 });
  });

  it('modules without practice yet have no Practice button', () => {
    expect(hasDrill('c-hello')).toBe(false);
    expect(getLesson(drillId('c-hello'))).toBeUndefined();
  });
});
