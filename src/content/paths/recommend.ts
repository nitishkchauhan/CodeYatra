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

/** The minutes choice that gives a daily goal (the reverse of `goalForMinutes`). */
export const minutesForGoal = (goal: number): Minutes =>
  MINUTES.reduce((best, m) => (Math.abs(goalForMinutes(m) - goal) < Math.abs(goalForMinutes(best) - goal) ? m : best), MINUTES[0]);

/** The tracks a career path teaches in the app, in the order the path reaches them. */
export function pathStageIds(pathId: string | null | undefined): string[] {
  const ids: string[] = [];
  for (const stop of findPath(pathId)?.sections.flatMap((s) => s.stops) ?? []) {
    for (const m of stop.modules ?? []) {
      const id = stageOf(m);
      if (id && !ids.includes(id)) ids.push(id);
    }
  }
  return ids;
}

export type Suggestion = { id: 'mock' | 'cbse' | 'projects' | 'path' | 'playground'; kicker: string; title: string; body: string; cta: string };

/** A "Made for you" suggestion on Home, from why the learner is learning (and their class). */
export function suggestionFor(about: About | null, pathId: string | null): Suggestion | null {
  if (!about) return null;
  switch (about.why) {
    case 'job':
      return {
        id: 'mock',
        kicker: 'FOR YOUR PLACEMENTS',
        title: 'Practise a timed placement round',
        body: 'Real campus-style questions against the clock, then see your weak topics.',
        cta: 'Start a mock test',
      };
    case 'exams':
      return about.who === 'senior' || about.who === 'school'
        ? {
            id: 'cbse',
            kicker: 'FOR YOUR EXAMS',
            title: 'CBSE Computer Science',
            body: 'Class 11 and 12 Python, SQL and theory, chapter by chapter.',
            cta: 'Open CBSE track',
          }
        : {
            id: 'mock',
            kicker: 'FOR YOUR EXAMS',
            title: 'Test yourself under time',
            body: 'Timed rounds on C, Java, Python, DSA, SQL and CS basics.',
            cta: 'Start a mock test',
          };
    case 'build':
      return {
        id: 'projects',
        kicker: 'FOR BUILDERS',
        title: 'Build a real project',
        body: 'Guided projects you can finish and show your friends.',
        cta: 'See projects',
      };
    case 'switch':
      return pathId
        ? {
            id: 'path',
            kicker: 'FOR YOUR CAREER SWITCH',
            title: 'See your full route',
            body: 'Every step to your new job, with what you already know ticked off.',
            cta: 'Open my path',
          }
        : { id: 'path', kicker: 'FOR YOUR CAREER SWITCH', title: 'Pick a job to aim for', body: 'Thirteen career paths with every step laid out.', cta: 'See paths' };
    case 'fun':
      return {
        id: 'playground',
        kicker: 'JUST FOR FUN',
        title: 'Play in the code playground',
        body: 'Write anything in Python or JavaScript and watch it run.',
        cta: 'Open playground',
      };
  }
}
