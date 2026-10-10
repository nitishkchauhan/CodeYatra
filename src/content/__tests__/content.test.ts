import { describe, expect, it } from '@jest/globals';

import { allLessons, findStage, optionOrder, PROJECTS, getLesson, hasContent, STAGES, stageLessonStatuses, type CodeStep } from '..';
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
  it('has a track per language, each with 10 playable modules', () => {
    expect(STAGES.map((s) => s.id)).toEqual(['foundations', 'cbse', 'html', 'css', 'js', 'python', 'c', 'java', 'react', 'node', 'next', 'dsa', 'dsa2', 'sql', 'git', 'placement']);
    for (const stage of STAGES) {
      expect(stage.units.length).toBe(10);
      for (const u of stage.units) for (const l of u.lessons) expect(hasContent(l.id)).toBe(true);
      for (const p of stage.practice) expect(hasContent(p.id)).toBe(true);
    }
  });

  it('teaches before it tests: every module opens with reading', () => {
    for (const stage of STAGES.slice(1)) {
      for (const u of stage.units) expect(getLesson(u.lessons[0].id)?.steps[0].type).toBe('concept');
    }
  });

  it('maps v1 stage ids to tracks', () => {
    expect(findStage('web').id).toBe('html');
    expect(findStage('fullstack').id).toBe('react');
    expect(findStage('nope').id).toBe('foundations');
  });

  it('lists every written lesson in a stage or the projects', () => {
    const listed = new Set([...STAGES.flatMap((s) => [...s.units.flatMap((u) => u.lessons.map((l) => l.id)), ...s.practice.map((p) => p.id)]), ...PROJECTS.map((p) => p.id)]);
    // Module practice sets (drill-<module>) belong to a listed module.
    for (const lesson of lessons) expect(listed).toContain(lesson.id.replace(/^drill-/, ''));
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
    expect(statuses.get('f-var-1')).toBe('locked');
    expect(statuses.get('f-loop-1')).toBe('locked');
  });

  it('finds lessons by id', () => {
    expect(getLesson('f-loop-1')?.steps.map((s) => s.type)).toEqual(['concept', 'quiz', 'puzzle', 'code']);
    expect(getLesson('missing')).toBeUndefined();
  });
});

describe('quiz option order', () => {
  it('spreads right answers across positions', () => {
    const quizzes = allLessons().flatMap((l) => l.steps.filter((s) => s.type === 'quiz'));
    const positions = new Set(quizzes.map((q) => optionOrder(q.prompt, q.options.length).indexOf(q.answer)));
    expect(positions.size).toBeGreaterThanOrEqual(3);
    for (const q of quizzes) expect([...optionOrder(q.prompt, q.options.length)].sort()).toEqual(q.options.map((_, i) => i));
  });
});

describe('ids', () => {
  it('are unique across every lesson', () => {
    const ids = allLessons().map((l) => l.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('every track has practice that exists', () => {
    for (const stage of STAGES) {
      expect(stage.practice.length).toBeGreaterThan(0);
      for (const p of stage.practice) expect(getLesson(p.id)?.steps.length).toBeGreaterThan(0);
    }
  });
});
