import { describe, expect, it } from '@jest/globals';

import { allLessons, getLesson, hasContent, STAGES, stageLessonStatuses, type CodeStep } from '..';
import { LEVELS } from '@/game/levels';

const lessons = allLessons();

describe('lesson content', () => {
  it.each(lessons.map((l) => [l.id, l] as const))('%s is well formed', (_, lesson) => {
    expect(lesson.steps.length).toBeGreaterThan(0);
    expect(lesson.learned.length).toBeGreaterThan(0);
    for (const step of lesson.steps) {
      if (step.type === 'quiz') {
        expect(step.answer).toBeGreaterThanOrEqual(0);
        expect(step.answer).toBeLessThan(step.options.length);
        expect(new Set(step.options).size).toBe(step.options.length);
      }
      if (step.type === 'puzzle') expect(LEVELS[step.levelId]).toBeDefined();
    }
  });

  const codeSteps = lessons.flatMap((l) => l.steps.filter((s): s is CodeStep => s.type === 'code').map((s) => [`${l.id}: ${s.title}`, s] as const));

  it.each(codeSteps)('%s passes with its solution', (_, step) => {
    const gapCount = Math.max(...step.lines.flat().map((s) => (typeof s === 'string' ? -1 : s.gap))) + 1;
    expect(step.solution).toHaveLength(gapCount);
    for (const value of step.solution) expect(step.tokens).toContain(value);
    expect(step.run(step.solution).pass).toBe(true);
  });

  it.each(codeSteps)('%s rejects every other answer', (_, step) => {
    // Try all token combinations: only the intended solution should pass.
    const combos = step.solution.reduce<string[][]>((acc) => acc.flatMap((c) => step.tokens.map((t) => [...c, t])), [[]]);
    const passing = combos.filter((c) => step.run(c).pass);
    expect(passing).toEqual([step.solution]);
  });
});

describe('stages', () => {
  it('has four stages, each with at least one playable lesson', () => {
    expect(STAGES).toHaveLength(4);
    for (const stage of STAGES) {
      expect(stage.units.some((u) => u.lessons.some((l) => hasContent(l.id)))).toBe(true);
    }
  });

  it('lists every written lesson in a stage', () => {
    const listed = new Set(STAGES.flatMap((s) => [...s.units.flatMap((u) => u.lessons.map((l) => l.id)), ...s.practice.map((p) => p.id)]));
    for (const lesson of lessons) expect(listed).toContain(lesson.id);
  });

  it('starts each stage with its first playable lesson as current', () => {
    for (const stage of STAGES) {
      const statuses = stageLessonStatuses(stage, {});
      const first = stage.units.flatMap((u) => u.lessons).find((l) => hasContent(l.id));
      expect(statuses.get(first!.id)).toBe('current');
    }
  });

  it('unlocks the next lesson after one is completed', () => {
    const stage = STAGES[0];
    const statuses = stageLessonStatuses(stage, { 'f-seq-1': true });
    expect(statuses.get('f-seq-1')).toBe('done');
    expect(statuses.get('f-seq-2')).toBe('current');
    expect(statuses.get('f-loop-1')).toBe('locked');
    expect(statuses.get('f-loop-2')).toBe('locked');
  });

  it('finds lessons by id', () => {
    expect(getLesson('f-loop-1')?.steps.map((s) => s.type)).toEqual(['concept', 'quiz', 'puzzle', 'code']);
    expect(getLesson('missing')).toBeUndefined();
  });
});
