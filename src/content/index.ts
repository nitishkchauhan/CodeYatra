import { timesTable } from './foundations';
import { LOGIC_FOUNDATIONS, LOGIC_PROJECT } from './tracks/logicFoundations';
import { apiHandler } from './fullstack2';
import { cheapestTrain, countVowels, PYTHON_MORE } from './python2';
import { countSeats, styleButton } from './web2';
import { trainCardProps } from './fullstack';
import { trainFare } from './python';
import { dailyLesson, reviewLesson } from './daily';
import { drillBase, drillLesson, DRILL_PREFIX } from './drills';
import type { Lesson, LessonRef, SkillKey, Stage, Step, Unit } from './types';
import { ticketHtml } from './web';
import { flexRow } from './styling';
import { CSS_UNITS, CSS_V5 } from './tracks/cssV5';
import { CSS_I_UNITS, CSS_I_V5 } from './tracks/cssV5i';
import { searchForm } from './html';
import { HTML_UNITS, HTML_V5 } from './tracks/htmlV5';
import { HTML_I_UNITS, HTML_I_V5 } from './tracks/htmlV5i';
import { cheapTickets } from './js';
import { JS_UNITS, JS_V5 } from './tracks/jsV5';
import { JS_I_UNITS, JS_I_V5 } from './tracks/jsV5i';
import { CSS_B_TEST, CSS_I_TEST, FINAL_TESTS, HTML_B_TEST, HTML_I_TEST, JS_B_TEST, JS_I_TEST, PY_A_TEST, PY_B_TEST, PY_I_TEST, REACT_B_TEST, REACT_I_TEST, NEXT_B_TEST, NEXT_I_TEST, NEXT_A_TEST, NODE_B_TEST, NODE_I_TEST, SQL_B_TEST, SQL_I_TEST, GIT_B_TEST, GIT_I_TEST, DSA_B_TEST, DSA_I_TEST, DSA2_I_TEST, DSA2_A_TEST, C_B_TEST, C_I_TEST, testUnit } from './tracks/finalTests';
import { dynamicRoute, routeHandler } from './next';
import { expressRoute } from './node';
import { NODE_UNITS, NODE_V5 } from './tracks/nodeV5';
import { canteenBill } from './python3';
import { trainList } from './react';
import { REACT_UNITS, REACT_V5 } from './tracks/reactV5';
import { PROJECTS } from './projects';
import { buildCheckpoint, CHECKPOINT_PREFIX } from './checkpoints';
import { findPath } from './paths';
import { C_LESSONS } from './tracks/c';
import { C_UNITS, C_V5 } from './tracks/cV5';
import { CBSE_LESSONS, CBSE_PROJECT } from './tracks/cbse';
import { islands, minCoins } from './tracks/dsa2';
import { DSA2_UNITS, DSA2_V5 } from './tracks/dsa2V5';
import { balanced, binarySearch, firstRepeat } from './tracks/dsa';
import { DSA_UNITS, DSA_V5 } from './tracks/dsaV5';
import { GIT_LESSONS } from './tracks/git';
import { GIT_UNITS, GIT_V5 } from './tracks/gitV5';
import { JAVA_LESSONS, JAVA_PROJECT } from './tracks/java';
import { PLACEMENT_LESSONS, PLACEMENT_PROJECT } from './tracks/placement';
import { PY_B_UNITS, PY_B_V5 } from './tracks/pythonV5';
import { PY_I_UNITS, PY_I_V5 } from './tracks/pythonV5i';
import { PY_A_UNITS, PY_A_V5 } from './tracks/pythonV5a';
import { PYTHON_MORE_2 } from './tracks/pythonMore';
import { SQL_LESSONS } from './tracks/sql';
import { SQL_UNITS, SQL_V5 } from './tracks/sqlV5';
import { NEXT_UNITS, NEXT_V5 } from './tracks/nextV5';

export * from './types';
export { PROJECTS } from './projects';
export { dailyDone, dailyId, DAILY_SIZE } from './daily';
export { drillId, hasDrill } from './drills';
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
  drill('x-c-bugs', 'Bug hunt', 'c', C_LESSONS, ['bug', 'quiz'], ['Spotted classic C bugs']),
  drill('x-java-output', 'Output drill', 'java', JAVA_LESSONS, ['predict'], ['Traced Java programs line by line']),
  drill('x-java-fix', 'Fix the code', 'java', JAVA_LESSONS, ['bug', 'quiz'], ['Spotted Java mistakes']),
  practice('x-dsa-binary', 'Binary search', 'dsa', 6, ['Halve the range each step'], binarySearch),
  practice('x-dsa-stack', 'Balanced brackets', 'dsa', 6, ['Use a stack to match pairs'], balanced),
  practice('x-dsa-hash', 'First repeated booking', 'dsa', 4, ['Use a set for O(1) lookups'], firstRepeat),
  drill('x-sql-drill', 'Query results drill', 'sql', SQL_LESSONS, ['predict'], ['Read queries like the database does']),
  practice('x-sql-join', "Ava's trains", 'sql', 5, ['Join two tables on a key'], sqlJoin),
  drill('x-git-drill', 'Command drill', 'git', GIT_LESSONS, ['order', 'quiz'], ['Remembered everyday Git commands']),
  drill('x-pl-output', 'Output round', 'placement', PLACEMENT_LESSONS, ['predict'], ['Handled tricky output questions']),
  drill('x-pl-code', 'Coding round', 'placement', PLACEMENT_LESSONS, ['editor'], ['Solved classic coding questions'], 4),
  practice('x-dsa2-graph', 'Count the islands', 'dsa', 9, ['DFS marks a whole connected part'], islands),
  practice('x-dsa2-dp', 'Fewest coins', 'dsa', 9, ['Build answers from smaller amounts'], minCoins),
  drill('x-cbse-output', 'Find the output', 'python', CBSE_LESSONS, ['predict'], ['Traced programs like the board exam expects'], 6),
  drill('x-cbse-code', 'Board coding questions', 'python', CBSE_LESSONS, ['editor'], ['Wrote board-style programs'], 5),
];

const ALL: Lesson[] = [
  ...LOGIC_FOUNDATIONS,
  LOGIC_PROJECT,
  ...PY_B_V5,
  ...PY_I_V5,
  ...PY_A_V5,
  ...PYTHON_MORE,
  ...HTML_V5,
  ...HTML_I_V5,
  ...CSS_V5,
  ...CSS_I_V5,
  ...JS_V5,
  ...JS_I_V5,
  ...FINAL_TESTS,
  ...REACT_V5,
  ...NODE_V5,
  ...NEXT_V5,
  ...PYTHON_MORE_2,
  ...C_V5,
  ...JAVA_LESSONS,
  JAVA_PROJECT,
  ...DSA_V5,
  ...SQL_V5,
  ...GIT_V5,
  ...PLACEMENT_LESSONS,
  PLACEMENT_PROJECT,
  ...DSA2_V5,
  ...CBSE_LESSONS,
  CBSE_PROJECT,
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
  if (id.startsWith(CHECKPOINT_PREFIX)) {
    const m = /^check-(.+)-(\d+)$/.exec(id);
    const path = m ? findPath(m[1]) : undefined;
    return path ? buildCheckpoint(path, Number(m![2])) : undefined;
  }
  if (id.startsWith(DRILL_PREFIX)) {
    const moduleId = id.slice(DRILL_PREFIX.length);
    const stage = STAGES.find((s) => s.units.some((u) => u.lessons.some((l) => l.id === moduleId)));
    return drillLesson(moduleId, stage, findLesson);
  }
  return findLesson(id);
}
export const buildReview = (mistakes: Record<string, string>) => reviewLesson(mistakes, findLesson);
export const hasContent = (id: string) => BY_ID.has(id);
export const allLessons = () => [...ALL, ...DRILL_LESSONS];

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

/** Language tracks, grouped into sections. Each track has ten or more modules plus practice. */
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
    blurb: '10 modules and a project: algorithms, loops and patterns with Yatri’s block puzzles, then variables, conditions, functions and debugging in real Python.',
    color: '#4B3FD8',
    soft: '#EEECFD',
    accent: '#A9A2F0',
    icon: 'M4 5h10v4H4z M8 12h10v4H8z M4 19h7',
    units: [
      unit('f-u1', 'Algorithms', ref('f-seq-1', 'Algorithms: step-by-step instructions', 'Lesson + puzzle · 5 min')),
      unit('f-u2', 'Turns', ref('f-seq-2', 'Turns, direction and order', 'Lesson + puzzle · 5 min')),
      unit('f-u3', 'Loops', ref('f-loop-1', 'Loops: repeat without rewriting', 'Lesson + puzzle · 6 min')),
      unit('f-u4', 'Patterns', ref('f-loop-2', 'Patterns and decomposition', 'Lesson + puzzle · 6 min')),
      unit('f-u7', 'Variables', ref('f-var-1', 'Variables: labelled boxes', 'Lesson + Python · 6 min')),
      unit('f-u6', 'Conditions', ref('f-if-1', 'Conditions: making decisions', 'Lesson + Python · 7 min')),
      unit('f-u8', 'While loops', ref('f-while-1', 'While loops: repeat until done', 'Lesson + Python · 6 min')),
      unit('f-u9', 'Nested loops', ref('f-nest-1', 'Loops inside loops', 'Lesson + Python · 7 min')),
      unit('f-u5', 'Functions', ref('f-fn-1', 'Functions: make your own block', 'Lesson + Python · 7 min')),
      unit('f-u10', 'Debugging', ref('f-debug-1', 'Debugging like a pro', 'Lesson + Python · 6 min')),
      unit('f-u11', 'Project', ref('f-project', 'Project: Yatri’s Gem Bazaar', 'Project · puzzle + Python · 15 min')),
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
    blurb: '12 modules and a practical project for Computer Science (083): Python, modules, exceptions, text, binary and CSV files, stacks and SQL, with board-style find-the-output practice.',
    color: '#0F766E',
    soft: '#DDF5F2',
    accent: '#5EEAD4',
    icon: 'M4 6l8-3 8 3-8 3z M8 8v5c2.5 2 5.5 2 8 0V8',
    units: [
      unit('cb1', 'Data types', ref('cbse-types', 'Data types and operators', 'Lesson + board questions · 7 min')),
      unit('cb2', 'Flow of control', ref('cbse-flow', 'Flow of control', 'Lesson + board questions · 7 min')),
      unit('cb3', 'Strings', ref('cbse-strings', 'Strings', 'Lesson + board questions · 8 min')),
      unit('cb4', 'Lists', ref('cbse-lists', 'Lists', 'Lesson + board questions · 8 min')),
      unit('cb5', 'Tuples and dictionaries', ref('cbse-dict', 'Tuples and dictionaries', 'Lesson + board questions · 8 min')),
      unit('cb6', 'Functions', ref('cbse-functions', 'Functions and scope', 'Lesson + board questions · 8 min')),
      unit('cb11', 'Modules', ref('cbse-modules', 'Modules: math, random and statistics', 'Lesson + board questions · 7 min')),
      unit('cb7', 'Exceptions', ref('cbse-exceptions', 'Exception handling', 'Lesson + board questions · 7 min')),
      unit('cb8', 'Text files', ref('cbse-files', 'Text files', 'Lesson + board questions · 8 min')),
      unit('cb12', 'Binary and CSV', ref('cbse-binary', 'Binary and CSV files', 'Lesson + board questions · 8 min')),
      unit('cb9', 'Stack', ref('cbse-stack', 'Stack using a list', 'Lesson + board questions · 7 min')),
      unit('cb10', 'SQL', ref('cbse-sql', 'SQL for board exams', 'Lesson + run a query · 8 min')),
      unit('cb13', 'Project', ref('cbse-project', 'Project: a board practical record program', 'Project · 3 parts · 25 min')),
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
    blurb: '9 modules of short, hands-on lessons with a live preview, each ending in a Challenge: structure, text, style, links and images, lists and tables, page building, forms, media and a final portfolio.',
    color: '#C2410C',
    soft: '#FFEDE3',
    accent: '#FDBA8C',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    units: [
      ...HTML_UNITS,
      testUnit(HTML_B_TEST),
      ...HTML_I_UNITS,
      testUnit(HTML_I_TEST),
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
    blurb: '12 modules of short, hands-on lessons with a live preview, each ending in a Challenge: selectors, colours, fonts, the box model, position, flexbox, grid, page parts, states, motion and responsive design.',
    color: '#1572B6',
    soft: '#E3EFF9',
    accent: '#93C5FD',
    icon: 'M4 4h16l-1.5 15L12 21l-6.5-2z M8 8h8l-.5 6-3.5 1-3.5-1',
    units: [
      ...CSS_UNITS,
      testUnit(CSS_B_TEST),
      ...CSS_I_UNITS,
      testUnit(CSS_I_TEST),
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
    blurb: '13 modules of short, hands-on lessons that run real code on your phone, each ending in a Challenge: values, decisions, loops, functions, arrays, objects, classes, errors, the DOM, events, storage and fetch.',
    color: '#A16207',
    soft: '#FEF7D6',
    accent: '#FDE047',
    icon: 'M4 4h16v16H4z M10 9v6.5a1.5 1.5 0 01-3 0 M17 10a2 2 0 00-3.5 0c0 2.5 3.5 1.5 3.5 4a2 2 0 01-3.5 0',
    units: [
      ...JS_UNITS,
      testUnit(JS_B_TEST),
      ...JS_I_UNITS,
      testUnit(JS_I_TEST),
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
    name: 'Python Foundations',
    short: 'Python',
    sub: 'Your first program to classes, plus a project',
    audience: 'Class 11+ · College',
    blurb: '24 modules of short, hands-on lessons that run real Python on your phone, each ending in a Challenge: Basic (print() to classes), Intermediate (shaping data, files, the standard library) and Advanced (testing, APIs, generators, clean code).',
    color: '#1D4ED8',
    soft: '#E7EFFE',
    accent: '#93C5FD',
    icon: 'M4 17l6-5-6-5 M12 19h8',
    units: [
      ...PY_B_UNITS,
      testUnit(PY_B_TEST),
      ...PY_I_UNITS,
      testUnit(PY_I_TEST),
      ...PY_A_UNITS,
      testUnit(PY_A_TEST),
    ],
    practice: [
      { id: 'x-times', title: 'Print the 5 times table', kind: 'Python', difficulty: 'Easy', xp: 15 },
      { id: 'x-canteen', title: 'Canteen bill', kind: 'Code editor', difficulty: 'Easy', xp: 15 },
      { id: 'x-fare', title: 'Train fare calculator', kind: 'Python', difficulty: 'Medium', xp: 15 },
      { id: 'x-vowels', title: 'Count the vowels', kind: 'Code editor', difficulty: 'Medium', xp: 15 },
      { id: 'x-route', title: 'Find the cheapest train', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
      { id: 'p-comp-1', title: 'List comprehensions', kind: 'Bonus lesson', difficulty: 'Medium', xp: 15 },
      { id: 'p-ps-1', title: 'Break a problem down', kind: 'Bonus lesson', difficulty: 'Medium', xp: 15 },
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
    blurb: '12 modules of short lessons with real gcc output: types, operators, decisions, loops, functions, arrays, strings, pointers, structs, dynamic memory and files. A marks-manager project and two final tests.',
    color: '#3949AB',
    soft: '#E8EAF6',
    accent: '#9FA8DA',
    icon: 'M17 7a6 6 0 1 0 0 10',
    units: [
      ...C_UNITS.slice(0, 6),
      testUnit(C_B_TEST),
      ...C_UNITS.slice(6),
      testUnit(C_I_TEST),
    ],
    practice: [
      { id: 'x-c-output', title: 'Output drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-c-bugs', title: 'Bug hunt', kind: 'Bug + quiz', difficulty: 'Medium', xp: 15 },
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
    blurb: 'Types, loops, methods, strings, classes, inheritance, collections and exceptions: the language of placements.',
    color: '#B45309',
    soft: '#FDF0E1',
    accent: '#FDBA74',
    icon: 'M7 17c3 1.5 7 1.5 10 0 M8 14c2.5 1 5.5 1 8 0 M12 3c-2 3 2 4 0 7',
    units: [
      unit('jv1', 'Hello, Java', ref('jv-hello', 'Hello, Java', 'Lesson + code · 7 min')),
      unit('jv2', 'Variables', ref('jv-vars', 'Variables and types', 'Lesson + code · 8 min')),
      unit('jv11', 'Operators', ref('jv-ops', 'Operators and input', 'Lesson + code · 8 min')),
      unit('jv3', 'Decisions', ref('jv-if', 'Decisions: if and switch', 'Lesson + code · 7 min')),
      unit('jv4', 'Loops', ref('jv-loops', 'Loops', 'Lesson + code · 8 min')),
      unit('jv5', 'Methods', ref('jv-methods', 'Methods', 'Lesson + code · 8 min')),
      unit('jv6', 'Arrays', ref('jv-arrays', 'Arrays', 'Lesson + code · 8 min')),
      unit('jv7', 'Strings', ref('jv-strings', 'Strings', 'Lesson + code · 8 min')),
      unit('jv8', 'Classes', ref('jv-classes', 'Classes and objects', 'Lesson + code · 9 min')),
      unit('jv9', 'Inheritance', ref('jv-oop', 'Inheritance and interfaces', 'Lesson + code · 9 min')),
      unit('jv10', 'Collections', ref('jv-collections', 'ArrayList and HashMap', 'Lesson + code · 9 min')),
      unit('jv12', 'Exceptions', ref('jv-exceptions', 'Exceptions', 'Lesson + code · 8 min')),
      unit('jv13', 'Project', ref('jv-project', 'Project: a train reservation system', 'Project · 3 parts · 30 min')),
    ],
    practice: [
      { id: 'x-java-output', title: 'Output drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-java-fix', title: 'Fix the code', kind: 'Bug + quiz', difficulty: 'Medium', xp: 15 },
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
    blurb: '16 modules of short lessons with live React 19 pages: components, props, state, events, lists, forms, styling, immutable updates, composition, shared state, effects, custom hooks, context and reducers, memo, and routing with React Router. A final project and two final tests.',
    color: '#0E7490',
    soft: '#DDF4F9',
    accent: '#67E8F9',
    icon: 'M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4z M12 11v2',
    units: [
      ...REACT_UNITS.slice(0, 8),
      testUnit(REACT_B_TEST),
      ...REACT_UNITS.slice(8),
      testUnit(REACT_I_TEST),
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
    blurb: '14 modules of short lessons that run live in a terminal: modules, npm, async code, files, events, HTTP, Express, middleware, validation, REST and CRUD APIs, configuration, security and testing. A final project and two final tests.',
    color: '#15803D',
    soft: '#E3F5E8',
    accent: '#86EFAC',
    icon: 'M12 2l9 5v10l-9 5-9-5V7z',
    units: [
      ...NODE_UNITS.slice(0, 6),
      testUnit(NODE_B_TEST),
      ...NODE_UNITS.slice(6),
      testUnit(NODE_I_TEST),
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
    sub: 'Next.js 16 · App Router',
    audience: 'B.Tech · BCA · after React',
    blurb: '12 modules of short lessons with live Next.js 16 apps, from fundamentals, routing and rendering to APIs, Server Actions, sign-in, databases, SEO, deployment and advanced routing. A final project and three final tests.',
    color: '#16142B',
    soft: '#ECEBF3',
    accent: '#A3A1B8',
    icon: 'M12 3l10 18H2z',
    units: [
      ...NEXT_UNITS.slice(0, 4),
      testUnit(NEXT_B_TEST),
      ...NEXT_UNITS.slice(4, 8),
      testUnit(NEXT_I_TEST),
      ...NEXT_UNITS.slice(8),
      testUnit(NEXT_A_TEST),
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
    blurb: '9 modules of short lessons that run in Python: Big-O, arrays and strings, recursion, searching, sorting, hashing, two pointers, sliding windows, prefix sums, stacks, queues and linked lists. A mock coding round and two final tests.',
    color: '#6D28D9',
    soft: '#F1EBFE',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M6 12h12 M6 12v4 M18 12v4 M12 8v4',
    units: [
      ...DSA_UNITS.slice(0, 5),
      testUnit(DSA_B_TEST),
      ...DSA_UNITS.slice(5),
      testUnit(DSA_I_TEST),
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
    blurb: '8 modules of short lessons that run in Python: trees, BSTs, heaps, BFS, DFS, topological sort, Dijkstra, spanning trees, backtracking, dynamic programming, greedy and divide and conquer. A route-planner project and two final tests.',
    color: '#5B21B6',
    soft: '#EDE5FD',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M12 8l-5 5 M12 8l5 5 M7 13v4 M17 13v4',
    units: [
      ...DSA2_UNITS.slice(0, 4),
      testUnit(DSA2_I_TEST),
      ...DSA2_UNITS.slice(4),
      testUnit(DSA2_A_TEST),
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
    sub: 'From SELECT to window functions',
    audience: 'Class 11+ · College · Data Analyst',
    blurb: '13 modules of short lessons where every query runs on a sample railway database: SELECT, filters, patterns, sorting, aggregates, grouping, joins, unions, subqueries and CTEs, CASE, window functions, transactions and design. A final project and two final tests.',
    color: '#0369A1',
    soft: '#E0F2FE',
    accent: '#7DD3FC',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    units: [
      ...SQL_UNITS.slice(0, 6),
      testUnit(SQL_B_TEST),
      ...SQL_UNITS.slice(6),
      testUnit(SQL_I_TEST),
    ],
    practice: [
      { id: 'x-sql-drill', title: 'Query results drill', kind: 'Predict the output', difficulty: 'Medium', xp: 15 },
      { id: 'x-sql-join', title: "Ava's trains", kind: 'Run a query', difficulty: 'Hard', xp: 15 },
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
    blurb: '11 modules of short lessons with a live Git terminal: repositories, commits, history, branches, merges and conflicts, GitHub, pull requests, .gitignore, undoing and stash. A final project and two final tests.',
    color: '#C2410C',
    soft: '#FFEDE5',
    accent: '#FDBA8C',
    icon: 'M6 3v12 M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
    units: [
      ...GIT_UNITS.slice(0, 6),
      testUnit(GIT_B_TEST),
      ...GIT_UNITS.slice(6),
      testUnit(GIT_I_TEST),
    ],
    practice: [{ id: 'x-git-drill', title: 'Command drill', kind: 'Order + quiz', difficulty: 'Easy', xp: 15 }],
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
    blurb: '12 modules and a mock round: the coding, output, OOP, SQL and complexity questions campus drives ask again and again, every answer tested.',
    color: '#B45309',
    soft: '#FFF4E3',
    accent: '#FDBA74',
    icon: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
    units: [
      unit('pl1', 'Coding rounds', ref('pl-fizzbuzz', 'How a coding round works: FizzBuzz', 'Lesson + coding round · 7 min')),
      unit('pl2', 'Strings', ref('pl-reverse', 'String questions', 'Lesson + coding round · 7 min')),
      unit('pl3', 'Numbers', ref('pl-prime', 'Number questions: primes, GCD and digits', 'Lesson + coding round · 8 min')),
      unit('pl4', 'Arrays', ref('pl-second', 'Array questions', 'Lesson + coding round · 8 min')),
      unit('pl5', 'Hashing', ref('pl-anagram', 'Hashing questions: counting with dicts', 'Lesson + coding round · 8 min')),
      unit('pl11', 'Patterns', ref('pl-pattern', 'Pattern printing', 'Lesson + coding round · 7 min')),
      unit('pl12', 'Matrices', ref('pl-matrix', 'Matrix questions', 'Lesson + coding round · 8 min')),
      unit('pl7', 'Python output', ref('pl-output-py', 'Output questions: Python', 'Lesson + written test · 8 min')),
      unit('pl6', 'C output', ref('pl-output-c', 'Output questions: C', 'Lesson + written test · 8 min')),
      unit('pl8', 'OOP', ref('pl-oops', 'OOP interview questions', 'Lesson + interview · 8 min')),
      unit('pl9', 'SQL', ref('pl-sql', 'SQL interview questions', 'Lesson + interview · 8 min')),
      unit('pl10', 'Complexity', ref('pl-complexity', 'Complexity questions', 'Lesson + interview · 8 min')),
      unit('pl13', 'Mock round', ref('pl-project', 'Project: a mock placement round', 'Project · 3 questions · 30 min')),
    ],
    practice: [
      { id: 'x-pl-output', title: 'Output round', kind: 'Predict the output', difficulty: 'Hard', xp: 15 },
      { id: 'x-pl-code', title: 'Coding round', kind: 'Code editor', difficulty: 'Hard', xp: 15 },
    ],
  },
];

/**
 * Tracks paused until they are rewritten to the Lesson v2 standard (see project-docs/CONTENT-PLAN.md).
 * They are hidden from pickers, not deleted: lessons, progress and certificates in them are kept.
 */
export const PAUSED_STAGES: readonly string[] = [];
export const isPaused = (id: string) => PAUSED_STAGES.includes(id);

/** Tracks to list: every active track, plus any paused ones named in `keep` (e.g. the track the learner is in). */
export const visibleStages = (keep: (string | null | undefined)[] = []) => STAGES.filter((s) => !isPaused(s.id) || keep.includes(s.id));

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

/** The module after this one on its track (skipping ones not written yet), or null at the end. */
export function nextLessonAfter(lessonId: string): LessonRef | null {
  const stage = STAGES.find((s) => s.units.some((u) => u.lessons.some((l) => l.id === lessonId)));
  if (!stage) return null;
  const refs = stage.units.flatMap((u) => u.lessons);
  return refs.slice(refs.findIndex((r) => r.id === lessonId) + 1).find((r) => hasContent(r.id)) ?? null;
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

// Module practice sets are stored like lessons, so saved mistakes in them can be reviewed later.
const DRILL_LESSONS = STAGES.flatMap((s) => s.units.flatMap((u) => u.lessons)).flatMap((r) => drillBase(r.id, r.title) ?? []);
for (const l of DRILL_LESSONS) BY_ID.set(l.id, l);

export const SKILLS = STAGES.map((s) => ({
  key: s.id,
  label: s.short,
  color: s.color,
}));

export function skillProgress(stageId: string, completed: Record<string, unknown>) {
  return stageProgress(findStage(stageId), completed).pct;
}
