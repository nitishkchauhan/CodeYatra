import { FOUNDATIONS_LESSONS, timesTable } from './foundations';
import { FOUNDATIONS_MORE } from './foundations2';
import { apiHandler, FULLSTACK_MORE } from './fullstack2';
import { cheapestTrain, countVowels, PYTHON_MORE } from './python2';
import { countSeats, styleButton, WEB_MORE } from './web2';
import { FULLSTACK_LESSONS, trainCardProps } from './fullstack';
import { PYTHON_LESSONS, trainFare } from './python';
import { dailyLesson, reviewLesson } from './daily';
import type { Lesson, LessonRef, Stage, Unit } from './types';
import { ticketHtml, WEB_LESSONS } from './web';
import { CSS_LESSONS, flexRow } from './styling';
import { HTML_LESSONS, searchForm } from './html';
import { cheapTickets, JS_LESSONS } from './js';
import { NEXT_LESSONS, dynamicRoute, routeHandler } from './next';
import { expressRoute, NODE_LESSONS } from './node';
import { canteenBill, PYTHON_EXTRA } from './python3';
import { REACT_LESSONS, trainList } from './react';

export * from './types';
export { dailyDone, dailyId, DAILY_SIZE } from './daily';
export { isOrderCorrect, isPredictCorrect, normalizeOutput, optionOrder, runWebChecks, scrambledOrder } from './helpers';

const PRACTICE_LESSONS: Lesson[] = [
  {
    id: 'x-bazaar',
    title: 'Gem Bazaar',
    kind: 'practice',
    minutes: 4,
    skill: 'loops',
    learned: ['Combine loops with turns', 'Plan a route before you build', 'Use fewer blocks with Repeat'],
    steps: [
      {
        type: 'puzzle',
        levelId: 'bazaar',
        task: 'Collect all 5 gems, then reach the flag',
      },
    ],
  },
  {
    id: 'x-corner',
    title: 'Corner run',
    kind: 'practice',
    minutes: 3,
    skill: 'sequencing',
    learned: ['Turn before you move', 'Pick items on the way'],
    steps: [
      {
        type: 'puzzle',
        levelId: 'turn-corner',
        task: 'Pick up the gem, then reach the flag',
      },
    ],
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
    steps: [
      {
        type: 'puzzle',
        levelId: 'stairs',
        task: 'Climb the stairs and collect every gem',
      },
    ],
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

const practice = (id: string, title: string, skill: Lesson['skill'], minutes: number, learned: string[], step: Lesson['steps'][number]): Lesson => ({
  id,
  title,
  kind: 'practice',
  minutes,
  skill,
  learned,
  steps: [step],
});

const TRACK_PRACTICE: Lesson[] = [
  practice('x-form', 'Train search form', 'html', 3, ['Pair every input with a label', 'Submit buttons send the form'], searchForm),
  practice('x-flex', 'Line up the ticket', 'css', 3, ['display: flex makes a row', 'Spread and centre items'], flexRow),
  practice('x-budget', 'Tickets within budget', 'js', 4, ['filter() keeps what passes a test'], cheapTickets),
  practice('x-canteen', 'Canteen bill', 'python', 4, ['Look up prices in a dictionary', 'Skip unknown keys'], canteenBill),
  practice('x-list', 'Render every train', 'react', 3, ['map() data to elements', 'Give each a key'], trainList),
  practice('x-express', 'A real web server', 'node', 4, ['Routes map URLs to handlers', 'Send JSON with res.json'], expressRoute),
  practice('x-dynamic', 'One page per train', 'next', 3, ['[id] folders match any value'], dynamicRoute),
  practice('x-handler', 'An API in Next.js', 'next', 3, ['Export GET from route.js'], routeHandler),
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
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JS_LESSONS,
  ...PYTHON_EXTRA,
  ...REACT_LESSONS,
  ...NODE_LESSONS,
  ...NEXT_LESSONS,
  ...PRACTICE_LESSONS,
  ...TRACK_PRACTICE,
];
const BY_ID = new Map(ALL.map((l) => [l.id, l]));

const DAILY_ID = /^daily-(\d{4}-\d{2}-\d{2})-(.+)$/;
const findLesson = (id: string) => BY_ID.get(id);

/** Finds a written lesson, or builds a daily challenge from its id ("daily-<day>-<track>"). */
export function getLesson(id: string): Lesson | undefined {
  const daily = DAILY_ID.exec(id);
  if (daily) {
    const stage = STAGES.find((s) => s.id === daily[2]);
    return stage ? dailyLesson(daily[1], stage, findLesson) : undefined;
  }
  return findLesson(id);
}
export const buildReview = (mistakes: Record<string, string>) => reviewLesson(mistakes, findLesson);
export const hasContent = (id: string) => BY_ID.has(id);
export const allLessons = () => ALL;

const ref = (id: string, title: string, meta: string): LessonRef => ({
  id,
  title,
  meta,
});
const unit = (id: string, title: string, lesson: LessonRef): Unit => ({
  id,
  title,
  lessons: [lesson],
});

/** Language tracks, grouped into sections. Each track has five or more modules of reading plus practice. */
export const STAGES: Stage[] = [
  {
    id: 'foundations',
    section: 'Start here',
    badge: '01',
    badgeBg: '#4B3FD8',
    badgeInk: '#FFFFFF',
    name: 'Logic & Blocks',
    short: 'Logic',
    sub: 'Think like a programmer',
    audience: 'Class 8+',
    blurb: 'Puzzles that build programmer thinking before any syntax.',
    color: '#4B3FD8',
    soft: '#EEECFD',
    accent: '#A9A2F0',
    icon: 'M4 5h10v4H4z M8 12h10v4H8z M4 19h7',
    units: [
      unit('f-u1', 'Sequences', ref('f-seq-1', 'First steps', 'Puzzle · 4 min')),
      unit('f-u2', 'Turns', ref('f-seq-2', 'Turn the corner', 'Puzzle · 5 min')),
      unit('f-u3', 'Loops', ref('f-loop-1', 'Repeat with loops', 'Read + puzzle · 6 min')),
      unit('f-u4', 'Patterns', ref('f-loop-2', 'Spot the pattern', 'Read + puzzle · 6 min')),
      unit('f-u5', 'Functions', ref('f-fn-1', 'Make your own block', 'Read + code · 7 min')),
      unit('f-u6', 'Conditions', ref('f-if-1', 'If there is a gem…', 'Read + code · 7 min')),
    ],
    practice: [
      {
        id: 'x-corner',
        title: 'Corner run',
        kind: 'Blocks puzzle',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-bazaar',
        title: 'Gem Bazaar',
        kind: 'Blocks puzzle',
        difficulty: 'Medium',
        xp: 15,
      },
      {
        id: 'x-stairs',
        title: 'Staircase climb',
        kind: 'Blocks puzzle',
        difficulty: 'Hard',
        xp: 15,
      },
    ],
  },
  {
    id: 'html',
    section: 'Web basics',
    badge: '</>',
    badgeBg: '#E34F26',
    badgeInk: '#FFFFFF',
    name: 'HTML',
    short: 'HTML',
    sub: 'Structure of every web page',
    audience: 'Class 9+',
    blurb: 'Tags, lists, links, forms and page layout with a live preview.',
    color: '#C2410C',
    soft: '#FFEDE3',
    accent: '#FDBA8C',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    units: [
      unit('h-u1', 'Tags and headings', ref('w-html-1', 'Your first web page', 'Read + practice · 6 min')),
      unit('h-u2', 'Links and images', ref('w-html-2', 'Links and images', 'Read + practice · 6 min')),
      unit('h-u3', 'Lists', ref('h-list-1', 'Lists', 'Read + live preview · 5 min')),
      unit('h-u4', 'Forms', ref('h-form-1', 'Forms and inputs', 'Read + live preview · 6 min')),
      unit('h-u5', 'Page layout', ref('h-sem-1', 'Page layout', 'Read + live preview · 6 min')),
    ],
    practice: [
      {
        id: 'x-ticket',
        title: 'Build a ticket card',
        kind: 'HTML',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-form',
        title: 'Train search form',
        kind: 'HTML forms',
        difficulty: 'Medium',
        xp: 15,
      },
    ],
  },
  {
    id: 'css',
    section: 'Web basics',
    badge: '{ }',
    badgeBg: '#1572B6',
    badgeInk: '#FFFFFF',
    name: 'CSS',
    short: 'CSS',
    sub: 'Colours, spacing and layout',
    audience: 'Class 9+',
    blurb: 'Make pages beautiful and responsive, watching every change live.',
    color: '#1572B6',
    soft: '#E3EFF9',
    accent: '#93C5FD',
    icon: 'M4 4h16l-1.5 15L12 21l-6.5-2z M8 8h8l-.5 6-3.5 1-3.5-1',
    units: [
      unit('c-u1', 'Colours', ref('w-css-1', 'Colours and spacing', 'Read + live preview · 7 min')),
      unit('c-u2', 'Selectors', ref('c-sel-1', 'Selectors', 'Read + practice · 5 min')),
      unit('c-u3', 'Box model', ref('c-box-1', 'The box model', 'Read + live preview · 6 min')),
      unit('c-u4', 'Flexbox', ref('c-flex-1', 'Flexbox layout', 'Read + live preview · 7 min')),
      unit('c-u5', 'Responsive', ref('c-resp-1', 'Responsive design', 'Read + live preview · 6 min')),
    ],
    practice: [
      {
        id: 'x-style',
        title: 'Style the ticket',
        kind: 'CSS',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-flex',
        title: 'Line up the ticket',
        kind: 'Flexbox',
        difficulty: 'Medium',
        xp: 15,
      },
    ],
  },
  {
    id: 'js',
    section: 'Web basics',
    badge: 'JS',
    badgeBg: '#F7DF1E',
    badgeInk: '#16142B',
    name: 'JavaScript',
    short: 'JavaScript',
    sub: 'The language of the web',
    audience: 'Class 10+',
    blurb: 'Type real JavaScript in a code editor and pass automatic tests.',
    color: '#A16207',
    soft: '#FEF7D6',
    accent: '#FDE047',
    icon: 'M4 4h16v16H4z M10 9v6.5a1.5 1.5 0 01-3 0 M17 10a2 2 0 00-3.5 0c0 2.5 3.5 1.5 3.5 4a2 2 0 01-3.5 0',
    units: [
      unit('j-u1', 'Variables', ref('j-var-1', 'Variables and strings', 'Read + code editor · 6 min')),
      unit('j-u2', 'Loops', ref('w-js-1', 'Make the page think', 'Read + code editor · 8 min')),
      unit('j-u3', 'Arrays', ref('j-arr-1', 'Arrays and filter', 'Read + code editor · 7 min')),
      unit('j-u4', 'Objects', ref('j-obj-1', 'Objects', 'Read + code editor · 7 min')),
      unit('j-u5', 'The DOM', ref('j-dom-1', 'Events and the DOM', 'Read + practice · 6 min')),
    ],
    practice: [
      {
        id: 'x-seats',
        title: 'Count the seats',
        kind: 'Code editor',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-budget',
        title: 'Tickets within budget',
        kind: 'Code editor',
        difficulty: 'Medium',
        xp: 15,
      },
    ],
  },
  {
    id: 'python',
    section: 'Programming',
    badge: 'Py',
    badgeBg: '#3776AB',
    badgeInk: '#FFD43B',
    name: 'Python',
    short: 'Python',
    sub: 'Basics to problem solving',
    audience: 'Class 11+ · College',
    blurb: 'Type real Python and pass tests, from variables to algorithms.',
    color: '#1D4ED8',
    soft: '#E7EFFE',
    accent: '#93C5FD',
    icon: 'M4 17l6-5-6-5 M12 19h8',
    units: [
      unit('p-u0', 'Variables', ref('p-var-1', 'Variables and f-strings', 'Read + code editor · 5 min')),
      unit('p-u1', 'Loops', ref('p-loop-1', 'Counting with range()', 'Read + practice · 6 min')),
      unit('p-u2', 'Lists', ref('p-loop-2', 'Loops with lists', 'Read + code editor · 7 min')),
      unit('p-u3', 'Functions', ref('p-fn-1', 'def and return', 'Read + code editor · 7 min')),
      unit('p-u4', 'Dictionaries', ref('p-dict-1', 'Dictionaries', 'Read + code editor · 7 min')),
      unit('p-u5', 'Problem solving', ref('p-ps-1', 'Break a problem down', 'Read + code editor · 8 min')),
    ],
    practice: [
      {
        id: 'x-times',
        title: 'Print the 5 times table',
        kind: 'Python',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-canteen',
        title: 'Canteen bill',
        kind: 'Code editor',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-fare',
        title: 'Train fare calculator',
        kind: 'Python',
        difficulty: 'Medium',
        xp: 15,
      },
      {
        id: 'x-vowels',
        title: 'Count the vowels',
        kind: 'Code editor',
        difficulty: 'Medium',
        xp: 15,
      },
      {
        id: 'x-route',
        title: 'Find the cheapest train',
        kind: 'Code editor',
        difficulty: 'Hard',
        xp: 15,
      },
    ],
  },
  {
    id: 'react',
    section: 'Full-stack',
    badge: 'atom',
    badgeBg: '#20232A',
    badgeInk: '#61DAFB',
    name: 'React',
    short: 'React',
    sub: 'Components, state and effects',
    audience: 'B.Tech · BCA',
    blurb: 'Build interactive UIs the way modern apps do.',
    color: '#0E7490',
    soft: '#DDF4F9',
    accent: '#67E8F9',
    icon: 'M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4z M12 11v2',
    units: [
      unit('r-u1', 'Components', ref('r-comp-1', 'Components and props', 'Read + live preview · 7 min')),
      unit('r-u2', 'State', ref('r-state-1', 'State with useState', 'Read + practice · 8 min')),
      unit('r-u3', 'Lists', ref('r-list-1', 'Lists and keys', 'Read + practice · 6 min')),
      unit('r-u4', 'Events', ref('r-event-1', 'Events and forms', 'Read + practice · 7 min')),
      unit('r-u5', 'Effects', ref('r-effect-1', 'Fetching data with useEffect', 'Read + practice · 8 min')),
    ],
    practice: [
      {
        id: 'x-props',
        title: 'TrainCard props',
        kind: 'React',
        difficulty: 'Easy',
        xp: 15,
      },
      {
        id: 'x-list',
        title: 'Render every train',
        kind: 'React',
        difficulty: 'Medium',
        xp: 15,
      },
    ],
  },
  {
    id: 'node',
    section: 'Full-stack',
    badge: 'N',
    badgeBg: '#5FA04E',
    badgeInk: '#FFFFFF',
    name: 'Node.js',
    short: 'Node.js',
    sub: 'Servers and APIs',
    audience: 'B.Tech · BCA',
    blurb: 'Write the backend: modules, async code, Express and JSON.',
    color: '#15803D',
    soft: '#E3F5E8',
    accent: '#86EFAC',
    icon: 'M12 2l9 5v10l-9 5-9-5V7z',
    units: [
      unit('n-u1', 'Modules', ref('n-intro-1', 'Node.js and modules', 'Read + practice · 6 min')),
      unit('n-u2', 'Async', ref('n-async-1', 'async and await', 'Read + practice · 7 min')),
      unit('n-u3', 'Express', ref('n-express-1', 'Servers with Express', 'Read + practice · 8 min')),
      unit('n-u4', 'JSON', ref('n-json-1', 'Working with JSON', 'Read + code editor · 7 min')),
      unit('n-u5', 'API routes', ref('n-api-1', 'Your first API route', 'Read + code editor · 8 min')),
    ],
    practice: [
      {
        id: 'x-express',
        title: 'A real web server',
        kind: 'Express',
        difficulty: 'Medium',
        xp: 15,
      },
      {
        id: 'x-api',
        title: 'Bookings API',
        kind: 'Code editor',
        difficulty: 'Hard',
        xp: 15,
      },
    ],
  },
  {
    id: 'next',
    section: 'Full-stack',
    badge: '▲',
    badgeBg: '#16142B',
    badgeInk: '#FFFFFF',
    name: 'Next.js',
    short: 'Next.js',
    sub: 'Full-stack React framework',
    audience: 'B.Tech · BCA',
    blurb: 'Routing, layouts, server components and APIs in one project.',
    color: '#16142B',
    soft: '#ECEBF3',
    accent: '#A3A1B8',
    icon: 'M12 3l10 18H2z',
    units: [
      unit('nx-u1', 'Pages', ref('nx-1', 'Pages and routing', 'Read + practice · 6 min')),
      unit('nx-u2', 'Layouts', ref('nx-layout-1', 'Layouts', 'Read + practice · 6 min')),
      unit('nx-u3', 'Dynamic routes', ref('nx-dyn-1', 'Dynamic routes', 'Read + practice · 6 min')),
      unit('nx-u4', 'Server data', ref('nx-data-1', 'Server components', 'Read + practice · 7 min')),
      unit('nx-u5', 'APIs', ref('nx-api-1', 'Route handlers', 'Read + practice · 6 min')),
    ],
    practice: [
      {
        id: 'x-dynamic',
        title: 'One page per train',
        kind: 'Next.js',
        difficulty: 'Medium',
        xp: 15,
      },
      {
        id: 'x-handler',
        title: 'An API in Next.js',
        kind: 'Next.js',
        difficulty: 'Medium',
        xp: 15,
      },
    ],
  },
];

export const SECTIONS = ['Start here', 'Web basics', 'Programming', 'Full-stack'] as const;

/** Saves from v1 used four broad stages; map them to the matching track. */
export const LEGACY_STAGE: Record<string, string> = {
  web: 'html',
  fullstack: 'react',
};

export const findStage = (id: string | undefined | null) => STAGES.find((s) => s.id === (id ? (LEGACY_STAGE[id] ?? id) : '')) ?? STAGES[0];

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
  return {
    done,
    total: ids.length,
    pct: Math.round((done / ids.length) * 100),
  };
}

export const SKILLS = STAGES.map((s) => ({
  key: s.id,
  label: s.short,
  color: s.color,
}));

export function skillProgress(stageId: string, completed: Record<string, unknown>) {
  return stageProgress(findStage(stageId), completed).pct;
}
