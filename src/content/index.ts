import { FOUNDATIONS_LESSONS, timesTable } from './foundations';
import { FOUNDATIONS_MORE } from './foundations2';
import { apiHandler, FULLSTACK_MORE } from './fullstack2';
import { cheapestTrain, countVowels, PYTHON_MORE } from './python2';
import { countSeats, styleButton, WEB_MORE } from './web2';
import { FULLSTACK_LESSONS, trainCardProps } from './fullstack';
import { PYTHON_LESSONS, trainFare } from './python';
import type { Lesson, LessonRef, SkillKey, Stage } from './types';
import { ticketHtml, WEB_LESSONS } from './web';

export * from './types';

const PRACTICE_LESSONS: Lesson[] = [
  {
    id: 'x-bazaar',
    title: 'Gem Bazaar',
    kind: 'practice',
    minutes: 4,
    skill: 'loops',
    learned: ['Combine loops with turns', 'Plan a route before you build', 'Use fewer blocks with Repeat'],
    steps: [{ type: 'puzzle', levelId: 'bazaar', task: 'Collect all 5 gems, then reach the flag' }],
  },
  {
    id: 'x-corner',
    title: 'Corner run',
    kind: 'practice',
    minutes: 3,
    skill: 'sequencing',
    learned: ['Turn before you move', 'Pick items on the way'],
    steps: [{ type: 'puzzle', levelId: 'turn-corner', task: 'Pick up the gem, then reach the flag' }],
  },
  {
    id: 'x-ticket',
    title: 'Build a ticket card',
    kind: 'practice',
    minutes: 3,
    skill: 'web',
    learned: ['Choose the right tag for each job', 'Headings vs paragraphs vs buttons'],
    steps: [ticketHtml],
  },
  {
    id: 'x-times',
    title: 'Print the 5 times table',
    kind: 'practice',
    minutes: 3,
    skill: 'python',
    learned: ['Use range(start, stop)', 'Multiply inside a loop', 'Compare output with what you expect'],
    steps: [timesTable],
  },
  {
    id: 'x-fare',
    title: 'Train fare calculator',
    kind: 'practice',
    minutes: 5,
    skill: 'python',
    learned: ['Handle the edge case first', 'Test a function with several inputs'],
    steps: [trainFare],
  },
  {
    id: 'x-props',
    title: 'TrainCard props',
    kind: 'practice',
    minutes: 3,
    skill: 'react',
    learned: ['Pass props by name', 'Numbers go inside { }'],
    steps: [trainCardProps],
  },
  {
    id: 'x-stairs',
    title: 'Staircase climb',
    kind: 'practice',
    minutes: 4,
    skill: 'loops',
    learned: ['Repeat a whole routine', 'Turn, move, turn back'],
    steps: [{ type: 'puzzle', levelId: 'stairs', task: 'Climb the stairs and collect every gem' }],
  },
  {
    id: 'x-style',
    title: 'Style the ticket',
    kind: 'practice',
    minutes: 3,
    skill: 'web',
    learned: ['Set colours with CSS', 'Keep text readable with contrast'],
    steps: [styleButton],
  },
  {
    id: 'x-seats',
    title: 'Count the seats',
    kind: 'practice',
    minutes: 5,
    skill: 'web',
    learned: ['Loop over an array', 'Skip values with if'],
    steps: [countSeats],
  },
  {
    id: 'x-route',
    title: 'Find the cheapest train',
    kind: 'practice',
    minutes: 6,
    skill: 'python',
    learned: ['Track the best value so far', 'Handle empty input'],
    steps: [cheapestTrain],
  },
  {
    id: 'x-vowels',
    title: 'Count the vowels',
    kind: 'practice',
    minutes: 4,
    skill: 'python',
    learned: ['Loop over characters', 'Normalise input with lower()'],
    steps: [countVowels],
  },
  {
    id: 'x-api',
    title: 'Bookings API',
    kind: 'practice',
    minutes: 6,
    skill: 'react',
    learned: ['Validate a request', 'Return the right status code'],
    steps: [apiHandler],
  },
];

const ALL: Lesson[] = [
  ...FOUNDATIONS_LESSONS,
  ...FOUNDATIONS_MORE,
  ...WEB_LESSONS,
  ...WEB_MORE,
  ...PYTHON_LESSONS,
  ...PYTHON_MORE,
  ...FULLSTACK_LESSONS,
  ...FULLSTACK_MORE,
  ...PRACTICE_LESSONS,
];
const BY_ID = new Map(ALL.map((l) => [l.id, l]));

export const getLesson = (id: string) => BY_ID.get(id);
export const hasContent = (id: string) => BY_ID.has(id);
export const allLessons = () => ALL;

const ref = (id: string, title: string, meta: string): LessonRef => ({ id, title, meta });

export const STAGES: Stage[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    short: 'Foundations',
    sub: 'Logic with blocks',
    audience: 'Class 8+',
    blurb: 'Puzzles that build programmer thinking before any syntax.',
    color: '#4B3FD8',
    soft: '#EEECFD',
    accent: '#A9A2F0',
    icon: 'M4 5h10v4H4z M8 12h10v4H8z M4 19h7',
    units: [
      { id: 'f-u1', title: 'Sequences', lessons: [ref('f-seq-1', 'First steps', 'Lesson · 4 min'), ref('f-seq-2', 'Turn the corner', 'Lesson · 5 min')] },
      { id: 'f-u2', title: 'Loops', lessons: [ref('f-loop-1', 'Repeat with loops', 'Lesson · 4 steps · 6 min'), ref('f-loop-2', 'Spot the pattern', 'Lesson · 3 steps · 6 min')] },
      { id: 'f-u3', title: 'Functions', lessons: [ref('f-fn-1', 'Make your own block', 'Lesson · Python · 7 min')] },
      { id: 'f-u4', title: 'Conditions', lessons: [ref('f-if-1', 'If there is a gem…', 'Lesson · Python · 7 min')] },
    ],
    practice: [
      { id: 'x-corner', title: 'Corner run', kind: 'Blocks puzzle', difficulty: 'Easy', xp: 15 },
      { id: 'x-bazaar', title: 'Gem Bazaar', kind: 'Blocks puzzle', difficulty: 'Medium', xp: 15 },
      { id: 'x-stairs', title: 'Staircase climb', kind: 'Blocks puzzle', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'web',
    name: 'Web Development',
    short: 'Web',
    sub: 'HTML · CSS · JavaScript',
    audience: 'Class 10+',
    blurb: 'Build real pages with a live preview and automatic checks.',
    color: '#C2410C',
    soft: '#FFEDE3',
    accent: '#FDBA8C',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    units: [
      { id: 'w-u1', title: 'HTML structure', lessons: [ref('w-html-1', 'Your first web page', 'Lesson · 3 steps · 6 min'), ref('w-html-2', 'Links and images', 'Lesson · 3 steps · 6 min')] },
      { id: 'w-u2', title: 'Styling with CSS', lessons: [ref('w-css-1', 'Colours and spacing', 'Lesson · live preview · 7 min')] },
      { id: 'w-u3', title: 'JavaScript basics', lessons: [ref('w-js-1', 'Make the page think', 'Lesson · code editor · 8 min')] },
    ],
    practice: [
      { id: 'x-ticket', title: 'Build a ticket card', kind: 'HTML', difficulty: 'Easy', xp: 15 },
      { id: 'x-style', title: 'Style the ticket', kind: 'CSS', difficulty: 'Easy', xp: 15 },
      { id: 'x-seats', title: 'Count the seats', kind: 'Code editor · JS', difficulty: 'Medium', xp: 15 },
    ],
  },
  {
    id: 'python',
    name: 'Python Programming',
    short: 'Python',
    sub: 'Basics to problem solving',
    audience: 'Class 11+ · College',
    blurb: 'Type real Python and pass tests, from loops to algorithms.',
    color: '#1D4ED8',
    soft: '#E7EFFE',
    accent: '#93C5FD',
    icon: 'M4 17l6-5-6-5 M12 19h8',
    units: [
      { id: 'p-u1', title: 'Loops in Python', lessons: [ref('p-loop-1', 'Counting with range()', 'Lesson · 3 steps · 6 min'), ref('p-loop-2', 'Loops with lists', 'Lesson · code editor · 7 min')] },
      { id: 'p-u2', title: 'Functions', lessons: [ref('p-fn-1', 'def and return', 'Lesson · code editor · 7 min')] },
      { id: 'p-u3', title: 'Problem solving', lessons: [ref('p-ps-1', 'Break a problem down', 'Lesson · code editor · 8 min')] },
    ],
    practice: [
      { id: 'x-times', title: 'Print the 5 times table', kind: 'Python', difficulty: 'Easy', xp: 15 },
      { id: 'x-fare', title: 'Train fare calculator', kind: 'Python', difficulty: 'Medium', xp: 15 },
      { id: 'x-vowels', title: 'Count the vowels', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
      { id: 'x-route', title: 'Find the cheapest train', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Development',
    short: 'Full-stack',
    sub: 'React · Node.js · Next.js',
    audience: 'B.Tech · BCA',
    blurb: 'Components, APIs and deployment: ship a real project.',
    color: '#0F766E',
    soft: '#DDF5F2',
    accent: '#5EEAD4',
    icon: 'M3 5h18v11H3z M8 20h8 M12 16v4',
    units: [
      { id: 'r-u1', title: 'React components', lessons: [ref('r-comp-1', 'Components and props', 'Lesson · 3 steps · 7 min'), ref('r-state-1', 'State with useState', 'Lesson · 3 steps · 8 min')] },
      { id: 'r-u2', title: 'Node.js APIs', lessons: [ref('n-api-1', 'Your first API route', 'Lesson · code editor · 8 min')] },
      { id: 'r-u3', title: 'Next.js', lessons: [ref('nx-1', 'Pages and routing', 'Lesson · 6 min')] },
    ],
    practice: [
      { id: 'x-props', title: 'TrainCard props', kind: 'React', difficulty: 'Easy', xp: 15 },
      { id: 'x-api', title: 'Bookings API', kind: 'Code editor · Node.js', difficulty: 'Hard', xp: 15 },
    ],
  },
];

export type LessonStatus = 'done' | 'current' | 'open' | 'locked' | 'soon';

/**
 * Lessons in a stage unlock in order. Lessons without content yet are "soon" and are skipped.
 * The first playable, unfinished lesson is "current".
 */
export function stageLessonStatuses(stage: Stage, completed: Record<string, unknown>) {
  const statuses = new Map<string, LessonStatus>();
  let blocked = false;
  let currentAssigned = false;
  for (const unit of stage.units) {
    for (const lesson of unit.lessons) {
      if (!hasContent(lesson.id)) {
        // Not written yet: shown, but it never blocks the lessons after it.
        statuses.set(lesson.id, 'soon');
      } else if (completed[lesson.id]) {
        statuses.set(lesson.id, 'done');
      } else if (blocked) {
        statuses.set(lesson.id, 'locked');
      } else if (!currentAssigned) {
        statuses.set(lesson.id, 'current');
        currentAssigned = true;
        blocked = true;
      } else {
        statuses.set(lesson.id, 'locked');
      }
    }
  }
  return statuses;
}

export function stageProgress(stage: Stage, completed: Record<string, unknown>) {
  const ids = stage.units.flatMap((u) => u.lessons.map((l) => l.id));
  const done = ids.filter((id) => completed[id]).length;
  return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) };
}

export const SKILLS: { key: SkillKey; label: string; color: string }[] = [
  { key: 'sequencing', label: 'Sequencing', color: '#2563EB' },
  { key: 'loops', label: 'Loops', color: '#C2410C' },
  { key: 'web', label: 'HTML & CSS', color: '#EA580C' },
  { key: 'python', label: 'Python', color: '#1D4ED8' },
  { key: 'react', label: 'React', color: '#0F766E' },
];

export function skillProgress(key: SkillKey, completed: Record<string, unknown>) {
  const lessons = ALL.filter((l) => l.skill === key);
  if (!lessons.length) return 0;
  return Math.round((lessons.filter((l) => completed[l.id]).length / lessons.length) * 100);
}
