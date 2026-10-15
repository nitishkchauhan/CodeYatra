import { describe, expect, it } from '@jest/globals';

import { STAGES } from '..';
import { findPath, PATHS } from '../paths';
import {
  goalForMinutes,
  levelFor,
  MINUTES,
  minutesForGoal,
  pathStageIds,
  reasonFor,
  recommendPathId,
  startingStage,
  suggestionFor,
  type About,
  type Interest,
  type Who,
  type Why,
} from '../paths/recommend';

const WHO: Who[] = ['school', 'senior', 'college', 'working', 'other'];
const WHY: Why[] = ['job', 'exams', 'build', 'switch', 'fun'];
const INTEREST: Interest[] = ['web', 'mobile', 'data', 'ai', 'automation', 'unsure'];
const every: About[] = WHO.flatMap((who) => WHY.flatMap((why) => INTEREST.map((interest) => ({ who, why, interest }))));

describe('path recommendation', () => {
  it('always suggests a real path and a real starting track', () => {
    for (const a of every) {
      const id = recommendPathId(a);
      expect(findPath(id)).toBeDefined();
      expect(STAGES.some((s) => s.id === startingStage(id, a.who))).toBe(true);
    }
  });

  it('follows the learner’s interest', () => {
    expect(recommendPathId({ who: 'college', why: 'job', interest: 'web' })).toBe('frontend');
    expect(recommendPathId({ who: 'college', why: 'build', interest: 'mobile' })).toBe('android');
    expect(recommendPathId({ who: 'working', why: 'switch', interest: 'data' })).toBe('data-analyst');
    expect(recommendPathId({ who: 'college', why: 'fun', interest: 'ai' })).toBe('ai');
    expect(recommendPathId({ who: 'other', why: 'build', interest: 'automation' })).toBe('python');
  });

  it('sends Class 11–12 exam students to CBSE, and unsure job-seekers to placements', () => {
    expect(recommendPathId({ who: 'senior', why: 'exams', interest: 'web' })).toBe('cbse');
    expect(recommendPathId({ who: 'college', why: 'job', interest: 'unsure' })).toBe('sde');
    expect(recommendPathId({ who: 'working', why: 'switch', interest: 'web' })).toBe('fullstack');
  });

  it('starts younger students with logic puzzles and others at the path’s first lesson', () => {
    expect(startingStage('frontend', 'school')).toBe('foundations');
    expect(startingStage('frontend', 'college')).toBe('html');
    expect(startingStage('cbse', 'senior')).toBe('cbse');
    expect(startingStage('sde', 'college')).toBe('c');
  });

  it('maps answers to a level, a daily goal and a reason', () => {
    expect(levelFor('senior')).toBe('school');
    expect(levelFor('college')).toBe('college');
    expect(levelFor('working')).toBe('curious');
    expect(goalForMinutes(10)).toBe(20);
    expect(goalForMinutes(30)).toBe(60);
    expect(reasonFor({ who: 'college', why: 'job', interest: 'web' })).toBe('Because you want a job in tech and like websites.');
    expect(reasonFor({ who: 'college', why: 'fun', interest: 'unsure' })).toBe('Because you code for fun.');
  });
});

describe('answers personalise the app', () => {
  it('gives every combination of answers a suggestion that opens something real', () => {
    for (const a of every) {
      const s = suggestionFor(a, 'frontend');
      expect(s).not.toBeNull();
      expect(['mock', 'cbse', 'projects', 'path', 'playground']).toContain(s!.id);
    }
    expect(suggestionFor(null, null)).toBeNull();
  });

  it('matches the suggestion to why they learn', () => {
    expect(suggestionFor({ who: 'college', why: 'job', interest: 'web' }, null)!.id).toBe('mock');
    expect(suggestionFor({ who: 'senior', why: 'exams', interest: 'data' }, null)!.id).toBe('cbse');
    expect(suggestionFor({ who: 'college', why: 'exams', interest: 'data' }, null)!.id).toBe('mock');
    expect(suggestionFor({ who: 'working', why: 'build', interest: 'web' }, null)!.id).toBe('projects');
    expect(suggestionFor({ who: 'working', why: 'switch', interest: 'web' }, 'fullstack')!.cta).toBe('Open my path');
    expect(suggestionFor({ who: 'other', why: 'fun', interest: 'unsure' }, null)!.id).toBe('playground');
  });

  it('lists the tracks each path uses, in order, all real', () => {
    expect(pathStageIds('data-analyst')[0]).toBe('sql');
    const fe = pathStageIds('frontend');
    expect(fe.indexOf('html')).toBeGreaterThanOrEqual(0);
    expect(fe.indexOf('html')).toBeLessThan(fe.indexOf('css'));
    for (const p of PATHS) for (const id of pathStageIds(p.id)) expect(STAGES.some((s) => s.id === id)).toBe(true);
    expect(pathStageIds(null)).toEqual([]);
  });

  it('turns a daily goal back into minutes', () => {
    for (const m of MINUTES) expect(minutesForGoal(goalForMinutes(m))).toBe(m);
    expect(minutesForGoal(25)).toBe(10);
  });
});
