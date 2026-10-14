import { describe, expect, it } from '@jest/globals';

import { STAGES } from '..';
import { findPath } from '../paths';
import { goalForMinutes, levelFor, reasonFor, recommendPathId, startingStage, type About, type Interest, type Who, type Why } from '../paths/recommend';

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
