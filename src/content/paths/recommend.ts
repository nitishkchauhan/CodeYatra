// Turns the onboarding answers into a suggested career path, starting track and daily goal.
import { STAGES } from '..';
import { findPath } from '.';

export type Who = 'school' | 'senior' | 'college' | 'working' | 'other';
export type Why = 'job' | 'exams' | 'build' | 'switch' | 'fun';
export type Interest = 'web' | 'mobile' | 'data' | 'ai' | 'automation' | 'unsure';
export type About = { who: Who; why: Why; interest: Interest };

export const MINUTES = [5, 10, 20, 30] as const;
export type Minutes = (typeof MINUTES)[number];

/** XP a day that fits the minutes chosen: a lesson is about 25 XP in 5–8 minutes. */
export const goalForMinutes = (m: Minutes) => m * 2;

const BY_INTEREST: Record<Exclude<Interest, 'unsure'>, string> = {
  web: 'frontend',
  mobile: 'android',
  data: 'data-analyst',
  ai: 'ai',
  automation: 'python',
};

const WHEN_UNSURE: Record<Why, string> = {
  job: 'sde',
  exams: 'python',
  build: 'frontend',
  switch: 'fullstack',
  fun: 'python',
};

export function recommendPathId({ who, why, interest }: About): string {
  // Class 11–12 students preparing for board exams follow the CBSE syllabus.
  if (why === 'exams' && who === 'senior') return 'cbse';
  if (interest === 'unsure') return WHEN_UNSURE[why];
  // Career switchers who like the web usually want to build whole apps.
  if (interest === 'web' && why === 'switch') return 'fullstack';
  return BY_INTEREST[interest];
}

/** Which track holds a lesson. */
const stageOf = (lessonId: string) => STAGES.find((s) => s.units.some((u) => u.lessons.some((l) => l.id === lessonId)))?.id;

/** The track to start in: logic puzzles for younger students, else the path’s first lesson. */
export function startingStage(pathId: string, who: Who): string {
  if (who === 'school') return 'foundations';
  const first = findPath(pathId)
    ?.sections.flatMap((s) => s.stops)
    .find((s) => !s.optional && s.modules?.length);
  return (first?.modules && stageOf(first.modules[0])) ?? 'foundations';
}

export const levelFor = (who: Who) => (who === 'school' || who === 'senior' ? 'school' : who === 'college' ? 'college' : 'curious') as 'school' | 'college' | 'curious';

const WHY_TEXT: Record<Why, string> = {
  job: 'you want a job in tech',
  exams: 'you’re preparing for exams',
  build: 'you want to build things',
  switch: 'you’re switching careers',
  fun: 'you code for fun',
};
const INTEREST_TEXT: Record<Interest, string> = {
  web: 'websites',
  mobile: 'mobile apps',
  data: 'data',
  ai: 'AI',
  automation: 'automating tasks',
  unsure: '',
};

/** One line explaining the suggestion, e.g. "Because you want a job in tech and like websites." */
export function reasonFor({ why, interest }: About): string {
  return interest === 'unsure' ? `Because ${WHY_TEXT[why]}.` : `Because ${WHY_TEXT[why]} and like ${INTEREST_TEXT[interest]}.`;
}
