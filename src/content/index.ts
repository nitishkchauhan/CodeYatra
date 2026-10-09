import { FOUNDATIONS_LESSONS, timesTable } from './foundations';
import { FOUNDATIONS_MORE } from './foundations2';
import { apiHandler, FULLSTACK_MORE } from './fullstack2';
import { cheapestTrain, countVowels, PYTHON_MORE } from './python2';
import { countSeats, styleButton, WEB_MORE } from './web2';
import { FULLSTACK_LESSONS, trainCardProps } from './fullstack';
import { PYTHON_LESSONS, trainFare } from './python';
import { dailyLesson, reviewLesson } from './daily';
import type { Lesson, LessonRef, SkillKey, Stage, Step, Unit } from './types';
import { ticketHtml, WEB_LESSONS } from './web';
import { CSS_LESSONS, flexRow } from './styling';
import { HTML_LESSONS, searchForm } from './html';
import { cheapTickets, JS_LESSONS } from './js';
import { NEXT_LESSONS, dynamicRoute, routeHandler } from './next';
import { expressRoute, NODE_LESSONS } from './node';
import { canteenBill, PYTHON_EXTRA } from './python3';
import { REACT_LESSONS, trainList } from './react';
import { PROJECTS } from './projects';
import { C_LESSONS } from './tracks/c';
import { CBSE_LESSONS } from './tracks/cbse';
import { DSA2_LESSONS, islands, minCoins } from './tracks/dsa2';
import { CSS_MORE } from './tracks/cssMore';
import { balanced, binarySearch, DSA_LESSONS, firstRepeat } from './tracks/dsa';
import { GIT_LESSONS } from './tracks/git';
import { HTML_MORE } from './tracks/htmlMore';
import { JAVA_LESSONS } from './tracks/java';
import { JS_MORE } from './tracks/jsMore';
import { LOGIC_MORE } from './tracks/logicMore';
import { PLACEMENT_LESSONS } from './tracks/placement';
import { PYTHON_MORE_2 } from './tracks/pythonMore';
import { SQL_LESSONS } from './tracks/sql';
import { NEXT_MORE, NODE_MORE, REACT_MORE } from './tracks/stackMore';

export * from './types';
export { PROJECTS } from './projects';
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

/** A practice set made of every step of the given types from some lessons. */
function drill(id: string, title: string, skill: SkillKey, lessons: Lesson[], types: Step['type'][], learned: string[], max = 5): Lesson {
  const steps = lessons.flatMap((l) => l.steps.filter((s) => types.includes(s.type))).slice(0, max);
  return { id, title, kind: 'practice', minutes: steps.length * 2, skill, learned, steps };
}

const sqlJoin = SQL_LESSONS.find((l) => l.id === 'sql-join')!.steps.find((s) => s.type === 'editor')!;

const NEW_TRACK_PRACTICE: Lesson[] = [
  drill('x-c-output', 'Output drill', 'c', C_LESSONS, ['predict'], ['Traced C programs line by line']),
  drill('x-c-bugs', 'Bug hunt', 'c', C_LESSONS, ['bug'], ['Spotted classic C bugs']),
  drill('x-java-output', 'Output drill', 'java', JAVA_LESSONS, ['predict'], ['Traced Java programs line by line']),
  drill('x-java-fix', 'Fix the code', 'java', JAVA_LESSONS, ['bug', 'tap'], ['Spotted Java mistakes']),
  practice('x-dsa-binary', 'Binary search', 'dsa', 6, ['Halve the range each step'], binarySearch),
  practice('x-dsa-stack', 'Balanced brackets', 'dsa', 6, ['Use a stack to match pairs'], balanced),
  practice('x-dsa-hash', 'First repeated booking', 'dsa', 4, ['Use a set for O(1) lookups'], firstRepeat),
  drill('x-sql-drill', 'Query results drill', 'sql', SQL_LESSONS, ['predict'], ['Read queries like the database does']),
  practice('x-sql-join', "Asha's trains", 'sql', 5, ['Join two tables on a key'], sqlJoin),
  drill('x-git-drill', 'Command drill', 'git', GIT_LESSONS, ['order', 'tap'], ['Remembered everyday Git commands']),
  drill('x-pl-output', 'Output round', 'placement', PLACEMENT_LESSONS, ['predict'], ['Handled tricky output questions']),
  drill('x-pl-code', 'Coding round', 'placement', PLACEMENT_LESSONS, ['editor'], ['Solved classic coding questions'], 4),
  practice('x-dsa2-graph', 'Count the islands', 'dsa', 9, ['DFS marks a whole connected part'], islands),
  practice('x-dsa2-dp', 'Fewest coins', 'dsa', 9, ['Build answers from smaller amounts'], minCoins),
  drill('x-cbse-output', 'Find the output', 'python', CBSE_LESSONS, ['predict'], ['Traced programs like the board exam expects'], 6),
  drill('x-cbse-code', 'Board coding questions', 'python', CBSE_LESSONS, ['editor'], ['Wrote board-style programs'], 5),
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
  ...LOGIC_MORE,
  ...HTML_MORE,
  ...CSS_MORE,
  ...JS_MORE,
  ...PYTHON_MORE_2,
  ...REACT_MORE,
  ...NODE_MORE,
  ...NEXT_MORE,
  ...C_LESSONS,
  ...JAVA_LESSONS,
  ...DSA_LESSONS,
  ...SQL_LESSONS,
  ...GIT_LESSONS,
  ...PLACEMENT_LESSONS,
  ...DSA2_LESSONS,
  ...CBSE_LESSONS,
  ...PRACTICE_LESSONS,
  ...TRACK_PRACTICE,
  ...NEW_TRACK_PRACTICE,
  ...PROJECTS,
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

/** Language tracks, grouped into sections. Each track has ten modules of reading plus practice. */
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
      unit('f-u7', 'Variables', ref('f-var-1', 'Variables are labelled boxes', 'Read + predict · 5 min')),
      unit('f-u3', 'Loops', ref('f-loop-1', 'Repeat with loops', 'Read + puzzle · 6 min')),
      unit('f-u8', 'While loops', ref('f-while-1', 'Repeat until done', 'Read + order lines · 6 min')),
      unit('f-u4', 'Patterns', ref('f-loop-2', 'Spot the pattern', 'Read + puzzle · 6 min')),
      unit('f-u9', 'Nested loops', ref('f-nest-1', 'Loops inside loops', 'Read + predict · 6 min')),
      unit('f-u5', 'Functions', ref('f-fn-1', 'Make your own block', 'Read + code · 7 min')),
      unit('f-u6', 'Conditions', ref('f-if-1', 'If there is a gem…', 'Read + code · 7 min')),
      unit('f-u10', 'Debugging', ref('f-debug-1', 'Debug like a pro', 'Read + find the bug · 6 min')),
    ],
    practice: [
      { id: 'x-corner', title: 'Corner run', kind: 'Blocks puzzle', difficulty: 'Easy', xp: 15 },
      { id: 'x-bazaar', title: 'Gem Bazaar', kind: 'Blocks puzzle', difficulty: 'Medium', xp: 15 },
      { id: 'x-stairs', title: 'Staircase climb', kind: 'Blocks puzzle', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'cbse',
    section: 'School',
    badge: 'XII',
    badgeBg: '#0F766E',
    badgeInk: '#FFFFFF',
    name: 'CBSE Computer Science',
    short: 'CBSE CS',
    sub: 'Class 11–12 Python syllabus',
    audience: 'Class 11 · Class 12',
    blurb: 'Board-style Python: strings, lists, functions, files, stacks and SQL, with find-the-output practice.',
    color: '#0F766E',
    soft: '#DDF5F2',
    accent: '#5EEAD4',
    icon: 'M4 6l8-3 8 3-8 3z M8 8v5c2.5 2 5.5 2 8 0V8',
    units: [
      unit('cb1', 'Data types', ref('cbse-types', 'Data types and operators', 'Read + find the output · 6 min')),
      unit('cb2', 'Flow of control', ref('cbse-flow', 'Flow of control', 'Read + code editor · 7 min')),
      unit('cb3', 'Strings', ref('cbse-strings', 'Strings', 'Read + code editor · 7 min')),
      unit('cb4', 'Lists', ref('cbse-lists', 'Lists', 'Read + code editor · 7 min')),
      unit('cb5', 'Tuples and dictionaries', ref('cbse-dict', 'Tuples and dictionaries', 'Read + code editor · 7 min')),
      unit('cb6', 'Functions', ref('cbse-functions', 'Functions and scope', 'Read + find the error · 7 min')),
      unit('cb7', 'Exceptions', ref('cbse-exceptions', 'Exception handling', 'Read + code editor · 7 min')),
      unit('cb8', 'File handling', ref('cbse-files', 'Text file handling', 'Read + code editor · 7 min')),
      unit('cb9', 'Stack', ref('cbse-stack', 'Stack using a list', 'Read + code editor · 7 min')),
      unit('cb10', 'SQL', ref('cbse-sql', 'SQL for board exams', 'Read + run a query · 8 min')),
    ],
    practice: [
      { id: 'x-cbse-output', title: 'Find the output', kind: 'Board-style', difficulty: 'Medium', xp: 15 },
      { id: 'x-cbse-code', title: 'Board coding questions', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
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
    blurb: 'Tags, lists, tables, forms and accessible pages with a live preview.',
    color: '#C2410C',
    soft: '#FFEDE3',
    accent: '#FDBA8C',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    units: [
      unit('h-u1', 'Tags and headings', ref('w-html-1', 'Your first web page', 'Read + practice · 6 min')),
      unit('h-u2', 'Links and images', ref('w-html-2', 'Links and images', 'Read + practice · 6 min')),
      unit('h-u6', 'Attributes', ref('h-attr-1', 'Attributes, ids and classes', 'Read + build · 6 min')),
      unit('h-u3', 'Lists', ref('h-list-1', 'Lists', 'Read + live preview · 5 min')),
      unit('h-u7', 'Tables', ref('h-table-1', 'Tables', 'Read + build · 6 min')),
      unit('h-u4', 'Forms', ref('h-form-1', 'Forms and inputs', 'Read + live preview · 6 min')),
      unit('h-u8', 'More form controls', ref('h-inputs-1', 'More form controls', 'Read + build · 6 min')),
      unit('h-u5', 'Page layout', ref('h-sem-1', 'Page layout', 'Read + live preview · 6 min')),
      unit('h-u9', 'Accessibility', ref('h-a11y-1', 'Accessible pages', 'Read + build · 6 min')),
      unit('h-u10', 'Head and SEO', ref('h-head-1', 'The head and SEO', 'Read + practice · 5 min')),
    ],
    practice: [
      { id: 'x-ticket', title: 'Build a ticket card', kind: 'HTML', difficulty: 'Easy', xp: 15 },
      { id: 'x-form', title: 'Train search form', kind: 'HTML forms', difficulty: 'Medium', xp: 15 },
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
      unit('c-u6', 'Typography', ref('c-text-1', 'Typography', 'Read + build · 6 min')),
      unit('c-u3', 'Box model', ref('c-box-1', 'The box model', 'Read + live preview · 6 min')),
      unit('c-u4', 'Flexbox', ref('c-flex-1', 'Flexbox layout', 'Read + live preview · 7 min')),
      unit('c-u7', 'Grid', ref('c-grid-1', 'CSS Grid', 'Read + build · 7 min')),
      unit('c-u8', 'Positioning', ref('c-pos-1', 'Positioning', 'Read + build · 7 min')),
      unit('c-u5', 'Responsive', ref('c-resp-1', 'Responsive design', 'Read + live preview · 6 min')),
      unit('c-u9', 'Motion', ref('c-motion-1', 'Hover and transitions', 'Read + build · 6 min')),
      unit('c-u10', 'Variables', ref('c-vars-1', 'CSS variables', 'Read + build · 6 min')),
    ],
    practice: [
      { id: 'x-style', title: 'Style the ticket', kind: 'CSS', difficulty: 'Easy', xp: 15 },
      { id: 'x-flex', title: 'Line up the ticket', kind: 'Flexbox', difficulty: 'Medium', xp: 15 },
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
      unit('j-u6', 'Decisions', ref('j-cond-1', 'Decisions', 'Read + code editor · 6 min')),
      unit('j-u2', 'Loops', ref('w-js-1', 'Make the page think', 'Read + code editor · 8 min')),
      unit('j-u3', 'Arrays', ref('j-arr-1', 'Arrays and filter', 'Read + code editor · 7 min')),
      unit('j-u7', 'Arrow functions', ref('j-arrow-1', 'Arrow functions and callbacks', 'Read + code editor · 7 min')),
      unit('j-u4', 'Objects', ref('j-obj-1', 'Objects', 'Read + code editor · 7 min')),
      unit('j-u8', 'Classes', ref('j-class-1', 'Classes', 'Read + predict · 7 min')),
      unit('j-u9', 'Errors', ref('j-error-1', 'Handling errors', 'Read + code editor · 7 min')),
      unit('j-u5', 'The DOM', ref('j-dom-1', 'Events and the DOM', 'Read + practice · 6 min')),
      unit('j-u10', 'Async', ref('j-async-1', 'Promises and async', 'Read + find the bug · 7 min')),
    ],
    practice: [
      { id: 'x-seats', title: 'Count the seats', kind: 'Code editor', difficulty: 'Easy', xp: 15 },
      { id: 'x-budget', title: 'Tickets within budget', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
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
    blurb: 'Type real Python and pass tests, from variables to classes.',
    color: '#1D4ED8',
    soft: '#E7EFFE',
    accent: '#93C5FD',
    icon: 'M4 17l6-5-6-5 M12 19h8',
    units: [
      unit('p-u0', 'Variables', ref('p-var-1', 'Variables and f-strings', 'Read + code editor · 5 min')),
      unit('p-u6', 'Strings', ref('p-str-1', 'String methods', 'Read + code editor · 6 min')),
      unit('p-u1', 'Loops', ref('p-loop-1', 'Counting with range()', 'Read + practice · 6 min')),
      unit('p-u2', 'Lists', ref('p-loop-2', 'Loops with lists', 'Read + code editor · 7 min')),
      unit('p-u7', 'Comprehensions', ref('p-comp-1', 'List comprehensions', 'Read + code editor · 6 min')),
      unit('p-u3', 'Functions', ref('p-fn-1', 'def and return', 'Read + code editor · 7 min')),
      unit('p-u4', 'Dictionaries', ref('p-dict-1', 'Dictionaries', 'Read + code editor · 7 min')),
      unit('p-u8', 'Classes', ref('p-class-1', 'Classes and objects', 'Read + code editor · 8 min')),
      unit('p-u9', 'Errors', ref('p-err-1', 'Handling errors', 'Read + practice · 6 min')),
      unit('p-u5', 'Problem solving', ref('p-ps-1', 'Break a problem down', 'Read + code editor · 8 min')),
    ],
    practice: [
      { id: 'x-times', title: 'Print the 5 times table', kind: 'Python', difficulty: 'Easy', xp: 15 },
      { id: 'x-canteen', title: 'Canteen bill', kind: 'Code editor', difficulty: 'Easy', xp: 15 },
      { id: 'x-fare', title: 'Train fare calculator', kind: 'Python', difficulty: 'Medium', xp: 15 },
      { id: 'x-vowels', title: 'Count the vowels', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
      { id: 'x-route', title: 'Find the cheapest train', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'c',
    section: 'Programming',
    badge: 'C',
    badgeBg: '#283593',
    badgeInk: '#FFFFFF',
    name: 'C Programming',
    short: 'C',
    sub: 'How computers really work',
    audience: 'B.Tech · BCA · Diploma',
    blurb: 'The first-year favourite: types, loops, arrays, pointers and memory.',
    color: '#3949AB',
    soft: '#E8EAF6',
    accent: '#9FA8DA',
    icon: 'M17 7a6 6 0 1 0 0 10',
    units: [
      unit('c1', 'Hello, C', ref('c-hello', 'Hello, C', 'Read + order lines · 5 min')),
      unit('c2', 'Variables', ref('c-vars', 'Variables and types', 'Read + predict · 6 min')),
      unit('c3', 'Decisions', ref('c-if', 'Decisions with if', 'Read + find the bug · 6 min')),
      unit('c4', 'Loops', ref('c-loops', 'Loops', 'Read + order lines · 6 min')),
      unit('c5', 'Functions', ref('c-func', 'Functions', 'Read + predict · 6 min')),
      unit('c6', 'Arrays', ref('c-arrays', 'Arrays', 'Read + find the bug · 7 min')),
      unit('c7', 'Strings', ref('c-strings', 'Strings', 'Read + predict · 6 min')),
      unit('c8', 'Pointers', ref('c-pointers', 'Pointers', 'Read + predict · 8 min')),
      unit('c9', 'Structs', ref('c-struct', 'Structs', 'Read + predict · 7 min')),
      unit('c10', 'Memory', ref('c-memory', 'Dynamic memory', 'Read + predict · 7 min')),
    ],
    practice: [
      { id: 'x-c-output', title: 'Output drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-c-bugs', title: 'Bug hunt', kind: 'Find the bug', difficulty: 'Medium', xp: 15 },
    ],
  },
  {
    id: 'java',
    section: 'Programming',
    badge: 'Jv',
    badgeBg: '#E76F00',
    badgeInk: '#FFFFFF',
    name: 'Java',
    short: 'Java',
    sub: 'Object-oriented programming',
    audience: 'B.Tech · BCA',
    blurb: 'Classes, objects and collections: the language of placements and Android.',
    color: '#B45309',
    soft: '#FDF0E1',
    accent: '#FDBA74',
    icon: 'M7 17c3 1.5 7 1.5 10 0 M8 14c2.5 1 5.5 1 8 0 M12 3c-2 3 2 4 0 7',
    units: [
      unit('jv1', 'Hello, Java', ref('jv-hello', 'Hello, Java', 'Read + order lines · 5 min')),
      unit('jv2', 'Variables', ref('jv-vars', 'Variables and types', 'Read + predict · 6 min')),
      unit('jv3', 'Conditions', ref('jv-if', 'Conditions', 'Read + find the bug · 6 min')),
      unit('jv4', 'Loops', ref('jv-loops', 'Loops', 'Read + order lines · 6 min')),
      unit('jv5', 'Methods', ref('jv-methods', 'Methods', 'Read + predict · 6 min')),
      unit('jv6', 'Arrays', ref('jv-arrays', 'Arrays', 'Read + find the bug · 6 min')),
      unit('jv7', 'Strings', ref('jv-strings', 'Strings', 'Read + predict · 6 min')),
      unit('jv8', 'Classes', ref('jv-classes', 'Classes and objects', 'Read + predict · 7 min')),
      unit('jv9', 'Inheritance', ref('jv-oop', 'Inheritance', 'Read + predict · 7 min')),
      unit('jv10', 'Collections', ref('jv-collections', 'ArrayList and HashMap', 'Read + predict · 7 min')),
    ],
    practice: [
      { id: 'x-java-output', title: 'Output drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-java-fix', title: 'Fix the code', kind: 'Find the bug', difficulty: 'Medium', xp: 15 },
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
      unit('r-u6', 'Conditional UI', ref('r-cond-1', 'Conditional rendering', 'Read + practice · 6 min')),
      unit('r-u3', 'Lists', ref('r-list-1', 'Lists and keys', 'Read + practice · 6 min')),
      unit('r-u4', 'Events', ref('r-event-1', 'Events and forms', 'Read + practice · 7 min')),
      unit('r-u7', 'Composition', ref('r-children-1', 'Composition with children', 'Read + order lines · 6 min')),
      unit('r-u8', 'Shared state', ref('r-lift-1', 'Lifting state up', 'Read + find the bug · 7 min')),
      unit('r-u5', 'Effects', ref('r-effect-1', 'Fetching data with useEffect', 'Read + practice · 8 min')),
      unit('r-u9', 'Custom hooks', ref('r-hooks-1', 'Custom hooks', 'Read + find the bug · 7 min')),
      unit('r-u10', 'Context', ref('r-context-1', 'Context', 'Read + practice · 7 min')),
    ],
    practice: [
      { id: 'x-props', title: 'TrainCard props', kind: 'React', difficulty: 'Easy', xp: 15 },
      { id: 'x-list', title: 'Render every train', kind: 'React', difficulty: 'Medium', xp: 15 },
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
    blurb: 'Write the backend: modules, npm, Express, middleware and REST APIs.',
    color: '#15803D',
    soft: '#E3F5E8',
    accent: '#86EFAC',
    icon: 'M12 2l9 5v10l-9 5-9-5V7z',
    units: [
      unit('n-u1', 'Modules', ref('n-intro-1', 'Node.js and modules', 'Read + practice · 6 min')),
      unit('n-u6', 'npm', ref('n-npm-1', 'npm and packages', 'Read + order lines · 5 min')),
      unit('n-u2', 'Async', ref('n-async-1', 'async and await', 'Read + practice · 7 min')),
      unit('n-u7', 'Files', ref('n-fs-1', 'Reading and writing files', 'Read + predict · 6 min')),
      unit('n-u3', 'Express', ref('n-express-1', 'Servers with Express', 'Read + practice · 8 min')),
      unit('n-u8', 'Middleware', ref('n-middleware-1', 'Express middleware', 'Read + code editor · 7 min')),
      unit('n-u4', 'JSON', ref('n-json-1', 'Working with JSON', 'Read + code editor · 7 min')),
      unit('n-u5', 'API routes', ref('n-api-1', 'Your first API route', 'Read + code editor · 8 min')),
      unit('n-u9', 'REST design', ref('n-rest-1', 'REST API design', 'Read + code editor · 7 min')),
      unit('n-u10', 'Config', ref('n-env-1', 'Config and secrets', 'Read + predict · 5 min')),
    ],
    practice: [
      { id: 'x-express', title: 'A real web server', kind: 'Express', difficulty: 'Medium', xp: 15 },
      { id: 'x-api', title: 'Bookings API', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
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
    blurb: 'Routing, layouts, server components, actions and deployment.',
    color: '#16142B',
    soft: '#ECEBF3',
    accent: '#A3A1B8',
    icon: 'M12 3l10 18H2z',
    units: [
      unit('nx-u1', 'Pages', ref('nx-1', 'Pages and routing', 'Read + practice · 6 min')),
      unit('nx-u6', 'Links', ref('nx-link-1', 'Links and navigation', 'Read + practice · 5 min')),
      unit('nx-u2', 'Layouts', ref('nx-layout-1', 'Layouts', 'Read + practice · 6 min')),
      unit('nx-u3', 'Dynamic routes', ref('nx-dyn-1', 'Dynamic routes', 'Read + practice · 6 min')),
      unit('nx-u7', 'Metadata', ref('nx-meta-1', 'Metadata and SEO', 'Read + practice · 5 min')),
      unit('nx-u4', 'Server data', ref('nx-data-1', 'Server components', 'Read + practice · 7 min')),
      unit('nx-u8', 'Loading and errors', ref('nx-loading-1', 'Loading and error states', 'Read + order lines · 6 min')),
      unit('nx-u5', 'APIs', ref('nx-api-1', 'Route handlers', 'Read + practice · 6 min')),
      unit('nx-u9', 'Server actions', ref('nx-actions-1', 'Server actions', 'Read + practice · 7 min')),
      unit('nx-u10', 'Deploy', ref('nx-deploy-1', 'Deploying', 'Read + order lines · 5 min')),
    ],
    practice: [
      { id: 'x-dynamic', title: 'One page per train', kind: 'Next.js', difficulty: 'Medium', xp: 15 },
      { id: 'x-handler', title: 'An API in Next.js', kind: 'Next.js', difficulty: 'Medium', xp: 15 },
    ],
  },
  {
    id: 'dsa',
    section: 'CS core',
    badge: 'O(n)',
    badgeBg: '#7C3AED',
    badgeInk: '#FFFFFF',
    name: 'Data Structures & Algorithms',
    short: 'DSA',
    sub: 'Think in algorithms',
    audience: 'B.Tech · BCA · Placements',
    blurb: 'Big-O, searching, sorting, stacks, queues, hashing and recursion, in Python.',
    color: '#6D28D9',
    soft: '#F1EBFE',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M6 12h12 M6 12v4 M18 12v4 M12 8v4',
    units: [
      unit('dsa1', 'Big-O', ref('dsa-bigo', 'Big-O: how code scales', 'Read + predict · 6 min')),
      unit('dsa2', 'Linear search', ref('dsa-linear', 'Linear search', 'Read + code editor · 6 min')),
      unit('dsa3', 'Binary search', ref('dsa-binary', 'Binary search', 'Read + code editor · 8 min')),
      unit('dsa4', 'Sorting', ref('dsa-sort', 'Sorting', 'Read + find the bug · 7 min')),
      unit('dsa5', 'Stacks', ref('dsa-stack', 'Stacks', 'Read + code editor · 8 min')),
      unit('dsa6', 'Queues', ref('dsa-queue', 'Queues', 'Read + predict · 6 min')),
      unit('dsa7', 'Hashing', ref('dsa-hash', 'Hashing with sets and dicts', 'Read + code editor · 7 min')),
      unit('dsa8', 'Two pointers', ref('dsa-pointers', 'Two pointers', 'Read + code editor · 7 min')),
      unit('dsa9', 'Recursion', ref('dsa-recursion', 'Recursion', 'Read + find the bug · 7 min')),
      unit('dsa10', 'Linked lists', ref('dsa-linked', 'Linked lists', 'Read + predict · 7 min')),
    ],
    practice: [
      { id: 'x-dsa-binary', title: 'Binary search', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
      { id: 'x-dsa-stack', title: 'Balanced brackets', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
      { id: 'x-dsa-hash', title: 'First repeated booking', kind: 'Code editor', difficulty: 'Easy', xp: 15 },
    ],
  },
  {
    id: 'dsa2',
    section: 'CS core',
    badge: 'O(1)',
    badgeBg: '#4C1D95',
    badgeInk: '#FFFFFF',
    name: 'DSA Advanced',
    short: 'DSA+',
    sub: 'Trees, graphs and DP',
    audience: 'B.Tech · BCA · Placements',
    blurb: 'Trees, heaps, BFS, DFS, backtracking, dynamic programming and greedy: the coding-round core.',
    color: '#5B21B6',
    soft: '#EDE5FD',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M12 8l-5 5 M12 8l5 5 M7 13v4 M17 13v4',
    units: [
      unit('da1', 'Binary trees', ref('dsa2-tree', 'Binary trees', 'Read + code editor · 8 min')),
      unit('da2', 'BSTs', ref('dsa2-bst', 'Binary search trees', 'Read + code editor · 8 min')),
      unit('da3', 'Heaps', ref('dsa2-heap', 'Heaps and priority queues', 'Read + code editor · 7 min')),
      unit('da4', 'BFS', ref('dsa2-bfs', 'Graphs and BFS', 'Read + code editor · 8 min')),
      unit('da5', 'DFS', ref('dsa2-dfs', 'DFS and connected parts', 'Read + code editor · 9 min')),
      unit('da6', 'Backtracking', ref('dsa2-backtrack', 'Backtracking', 'Read + code editor · 9 min')),
      unit('da7', 'DP: memoization', ref('dsa2-dp1', 'Dynamic programming: memoization', 'Read + code editor · 8 min')),
      unit('da8', 'DP: tables', ref('dsa2-dp2', 'Dynamic programming: tables', 'Read + code editor · 9 min')),
      unit('da9', 'Greedy', ref('dsa2-greedy', 'Greedy algorithms', 'Read + code editor · 7 min')),
      unit('da10', 'Merge sort', ref('dsa2-merge', 'Merge sort', 'Read + order lines · 9 min')),
    ],
    practice: [
      { id: 'x-dsa2-graph', title: 'Count the islands', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
      { id: 'x-dsa2-dp', title: 'Fewest coins', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'sql',
    section: 'CS core',
    badge: 'SQL',
    badgeBg: '#0369A1',
    badgeInk: '#FFFFFF',
    name: 'SQL & Databases',
    short: 'SQL',
    sub: 'Ask questions of data',
    audience: 'Class 11+ · College',
    blurb: 'Run real queries on a railway database: filter, sort, group and join.',
    color: '#0369A1',
    soft: '#E0F2FE',
    accent: '#7DD3FC',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    units: [
      unit('sq1', 'SELECT', ref('sql-select', 'Tables and SELECT', 'Read + run a query · 6 min')),
      unit('sq2', 'WHERE', ref('sql-where', 'Filtering with WHERE', 'Read + run a query · 6 min')),
      unit('sq3', 'Sorting', ref('sql-order', 'ORDER BY and LIMIT', 'Read + run a query · 6 min')),
      unit('sq4', 'Aggregates', ref('sql-agg', 'COUNT, SUM and AVG', 'Read + run a query · 6 min')),
      unit('sq5', 'Grouping', ref('sql-group', 'GROUP BY', 'Read + run a query · 7 min')),
      unit('sq6', 'Joins', ref('sql-join', 'JOIN', 'Read + run a query · 8 min')),
      unit('sq7', 'Patterns', ref('sql-patterns', 'LIKE, IN and BETWEEN', 'Read + run a query · 6 min')),
      unit('sq8', 'Changing data', ref('sql-change', 'INSERT, UPDATE and DELETE', 'Read + find the bug · 6 min')),
      unit('sq9', 'Design', ref('sql-design', 'Keys and table design', 'Read + order lines · 6 min')),
      unit('sq10', 'Subqueries', ref('sql-sub', 'Subqueries', 'Read + run a query · 8 min')),
    ],
    practice: [
      { id: 'x-sql-drill', title: 'Query results drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-sql-join', title: "Asha's trains", kind: 'Run a query', difficulty: 'Hard', xp: 15 },
    ],
  },
  {
    id: 'git',
    section: 'CS core',
    badge: 'git',
    badgeBg: '#F05032',
    badgeInk: '#FFFFFF',
    name: 'Git & GitHub',
    short: 'Git',
    sub: 'Version control like a pro',
    audience: 'Everyone who codes',
    blurb: 'Commits, branches, merges, pull requests and undoing mistakes.',
    color: '#C2410C',
    soft: '#FFEDE5',
    accent: '#FDBA8C',
    icon: 'M6 3v12 M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
    units: [
      unit('g1', 'Why Git', ref('git-why', 'Why Git?', 'Read + quiz · 4 min')),
      unit('g2', 'Repositories', ref('git-init', 'Start a repository', 'Read + order lines · 5 min')),
      unit('g3', 'Commits', ref('git-commit', 'add and commit', 'Read + order lines · 5 min')),
      unit('g4', 'History', ref('git-history', 'log and diff', 'Read + practice · 5 min')),
      unit('g5', 'Branches', ref('git-branch', 'Branches', 'Read + order lines · 5 min')),
      unit('g6', 'Merging', ref('git-merge', 'Merging and conflicts', 'Read + find the bug · 6 min')),
      unit('g7', 'Remotes', ref('git-remote', 'push and pull', 'Read + order lines · 5 min')),
      unit('g8', 'Pull requests', ref('git-pr', 'Pull requests', 'Read + order lines · 5 min')),
      unit('g9', '.gitignore', ref('git-ignore', '.gitignore', 'Read + quiz · 4 min')),
      unit('g10', 'Undo', ref('git-undo', 'Undo safely', 'Read + practice · 5 min')),
    ],
    practice: [{ id: 'x-git-drill', title: 'Command drill', kind: 'Order + tap', difficulty: 'Easy', xp: 15 }],
  },
  {
    id: 'placement',
    section: 'Placement',
    badge: '★',
    badgeBg: '#FF9F1C',
    badgeInk: '#16142B',
    name: 'Placement Prep',
    short: 'Placement',
    sub: 'Crack the coding round',
    audience: 'Final year · Job seekers',
    blurb: 'The questions campus drives ask again and again, with real code tests.',
    color: '#B45309',
    soft: '#FFF4E3',
    accent: '#FDBA74',
    icon: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
    units: [
      unit('pl1', 'FizzBuzz', ref('pl-fizzbuzz', 'FizzBuzz', 'Coding round · 5 min')),
      unit('pl2', 'Strings', ref('pl-reverse', 'Reverse a string', 'Coding round · 6 min')),
      unit('pl3', 'Primes', ref('pl-prime', 'Prime check', 'Coding round · 7 min')),
      unit('pl4', 'Arrays', ref('pl-second', 'Second largest', 'Coding round · 7 min')),
      unit('pl5', 'Hashing', ref('pl-anagram', 'Anagrams', 'Coding round · 6 min')),
      unit('pl6', 'C output', ref('pl-output-c', 'Output questions: C', 'Written test · 6 min')),
      unit('pl7', 'Python output', ref('pl-output-py', 'Output questions: Python', 'Written test · 6 min')),
      unit('pl8', 'OOP', ref('pl-oops', 'OOP interview questions', 'Interview · 5 min')),
      unit('pl9', 'SQL', ref('pl-sql', 'SQL interview questions', 'Interview · 5 min')),
      unit('pl10', 'Complexity', ref('pl-complexity', 'Complexity questions', 'Interview · 5 min')),
    ],
    practice: [
      { id: 'x-pl-output', title: 'Output round', kind: 'Predict the output', difficulty: 'Hard', xp: 15 },
      { id: 'x-pl-code', title: 'Coding round', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
    ],
  },
];

export const SECTIONS = ['Start here', 'School', 'Web basics', 'Programming', 'Full-stack', 'CS core', 'Placement'] as const;

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
