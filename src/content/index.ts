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
import { CSS_BASIC, CSS_PROJECT_V3 as CSS_PROJECT } from './tracks/cssV3';
import { searchForm } from './html';
import { HTML_BASIC } from './tracks/htmlV3';
import { HTML_PROJECT_V3 as HTML_PROJECT } from './tracks/htmlV3More';
import { cheapTickets } from './js';
import { JS_BASIC, JS_PROJECT_V3 as JS_PROJECT } from './tracks/jsV3';
import { dynamicRoute, routeHandler } from './next';
import { expressRoute } from './node';
import { NODE_LESSONS, NODE_PROJECT } from './tracks/nodeFoundations';
import { canteenBill } from './python3';
import { trainList } from './react';
import { REACT_FOUNDATIONS, REACT_PROJECT } from './tracks/reactFoundations';
import { PROJECTS } from './projects';
import { buildCheckpoint, CHECKPOINT_PREFIX } from './checkpoints';
import { findPath } from './paths';
import { C_LESSONS, C_PROJECT } from './tracks/c';
import { CBSE_LESSONS, CBSE_PROJECT } from './tracks/cbse';
import { islands, minCoins } from './tracks/dsa2';
import { DSA_ADVANCED, DSA_ADVANCED_PROJECT } from './tracks/dsaAdvanced';
import { balanced, binarySearch, firstRepeat } from './tracks/dsa';
import { DSA_LESSONS, DSA_PROJECT } from './tracks/dsaFoundations';
import { GIT_LESSONS, GIT_PROJECT } from './tracks/git';
import { JAVA_LESSONS, JAVA_PROJECT } from './tracks/java';
import { PLACEMENT_LESSONS, PLACEMENT_PROJECT } from './tracks/placement';
import { PYTHON_PROJECT } from './tracks/pythonFoundations';
import { PYTHON_BASIC } from './tracks/pythonV3';
import { PYTHON_INTERMEDIATE, PYTHON_INTERMEDIATE_PROJECT } from './tracks/pythonIntermediate';
import { PYTHON_ADVANCED, PYTHON_ADVANCED_PROJECT } from './tracks/pythonAdvanced';
import { PYTHON_MORE_2 } from './tracks/pythonMore';
import { SQL_LESSONS, SQL_PROJECT } from './tracks/sql';
import { NEXT_FOUNDATIONS, NEXT_PROJECT } from './tracks/nextFoundations';

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
  practice('x-sql-join', "Asha's trains", 'sql', 5, ['Join two tables on a key'], sqlJoin),
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
  ...PYTHON_BASIC,
  ...PYTHON_INTERMEDIATE,
  PYTHON_INTERMEDIATE_PROJECT,
  ...PYTHON_ADVANCED,
  PYTHON_ADVANCED_PROJECT,
  PYTHON_PROJECT,
  ...PYTHON_MORE,
  ...HTML_BASIC,
  HTML_PROJECT,
  ...CSS_BASIC,
  CSS_PROJECT,
  ...JS_BASIC,
  JS_PROJECT,
  ...REACT_FOUNDATIONS,
  REACT_PROJECT,
  ...NODE_LESSONS,
  NODE_PROJECT,
  ...NEXT_FOUNDATIONS,
  NEXT_PROJECT,
  ...PYTHON_MORE_2,
  ...C_LESSONS,
  C_PROJECT,
  ...JAVA_LESSONS,
  JAVA_PROJECT,
  ...DSA_LESSONS,
  DSA_PROJECT,
  ...SQL_LESSONS,
  SQL_PROJECT,
  ...GIT_LESSONS,
  GIT_PROJECT,
  ...PLACEMENT_LESSONS,
  PLACEMENT_PROJECT,
  ...DSA_ADVANCED,
  DSA_ADVANCED_PROJECT,
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
    blurb: '12 modules and a project with a live preview: structure, links, lists, tables, forms and validation, semantics, media, accessibility and SEO.',
    color: '#C2410C',
    soft: '#FFEDE3',
    accent: '#FDBA8C',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    units: [
      unit('h-u1', 'First page', ref('w-html-1', 'How the web works and your first page', 'Lesson + live page · 7 min')),
      unit('h-u11', 'Text', ref('h-text', 'Headings, paragraphs and text', 'Lesson + live page · 7 min')),
      unit('h-u2', 'Links and images', ref('w-html-2', 'Links and images', 'Lesson + live page · 7 min')),
      unit('h-u6', 'Attributes', ref('h-attr-1', 'Attributes, ids and classes', 'Lesson + live page · 7 min')),
      unit('h-u3', 'Lists', ref('h-list-1', 'Lists', 'Lesson + live page · 6 min')),
      unit('h-u7', 'Tables', ref('h-table-1', 'Tables', 'Lesson + live page · 7 min')),
      unit('h-u4', 'Forms', ref('h-form-1', 'Forms and inputs', 'Lesson + live page · 8 min')),
      unit('h-u8', 'Validation', ref('h-inputs-1', 'Choices and validation', 'Lesson + live page · 8 min')),
      unit('h-u5', 'Page layout', ref('h-sem-1', 'Semantic page layout', 'Lesson + live page · 7 min')),
      unit('h-u12', 'Media', ref('h-media', 'Audio, video and SVG', 'Lesson + live page · 7 min')),
      unit('h-u9', 'Accessibility', ref('h-a11y-1', 'Accessible pages', 'Lesson + live page · 8 min')),
      unit('h-u10', 'Head and SEO', ref('h-head-1', 'The head, metadata and SEO', 'Lesson + live page · 7 min')),
      unit('h-u13', 'Project', ref('h-project', 'Project: a coaching centre landing page', 'Project · 3 steps · 25 min')),
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
    blurb: '12 modules and a project with a live preview: selectors, units, type, box model, flexbox, grid, positioning, states, responsive design, motion and variables.',
    color: '#1572B6',
    soft: '#E3EFF9',
    accent: '#93C5FD',
    icon: 'M4 4h16l-1.5 15L12 21l-6.5-2z M8 8h8l-.5 6-3.5 1-3.5-1',
    units: [
      unit('c-u1', 'First styles', ref('w-css-1', 'What CSS is and how it works', 'Lesson + live page · 7 min')),
      unit('c-u2', 'Selectors', ref('c-sel-1', 'Selectors and specificity', 'Lesson + live page · 7 min')),
      unit('c-u11', 'Units', ref('c-units', 'Colours, units and sizes', 'Lesson + live page · 7 min')),
      unit('c-u6', 'Typography', ref('c-text-1', 'Typography', 'Lesson + live page · 7 min')),
      unit('c-u3', 'Box model', ref('c-box-1', 'The box model', 'Lesson + live page · 7 min')),
      unit('c-u4', 'Flexbox', ref('c-flex-1', 'Flexbox', 'Lesson + live page · 7 min')),
      unit('c-u7', 'Grid', ref('c-grid-1', 'CSS Grid', 'Lesson + live page · 7 min')),
      unit('c-u8', 'Positioning', ref('c-pos-1', 'Positioning and stacking', 'Lesson + live page · 7 min')),
      unit('c-u12', 'States', ref('c-pseudo', 'Pseudo-classes and pseudo-elements', 'Lesson + live page · 7 min')),
      unit('c-u5', 'Responsive', ref('c-resp-1', 'Responsive design', 'Lesson + live page · 7 min')),
      unit('c-u9', 'Motion', ref('c-motion-1', 'Transitions and animations', 'Lesson + live page · 7 min')),
      unit('c-u10', 'Variables', ref('c-vars-1', 'CSS variables and maintainable CSS', 'Lesson + live page · 7 min')),
      unit('c-u13', 'Project', ref('c-project', 'Project: style the landing page', 'Project · 3 steps · 25 min')),
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
    blurb: '12 modules and a project: values, operators, functions and closures, array methods, objects, classes, errors, the DOM and async, all run and tested on your phone.',
    color: '#A16207',
    soft: '#FEF7D6',
    accent: '#FDE047',
    icon: 'M4 4h16v16H4z M10 9v6.5a1.5 1.5 0 01-3 0 M17 10a2 2 0 00-3.5 0c0 2.5 3.5 1.5 3.5 4a2 2 0 01-3.5 0',
    units: [
      unit('j-u1', 'Variables', ref('j-var-1', 'Variables, values and console.log', 'Lesson + code editor · 8 min')),
      unit('j-u11', 'Operators', ref('j-ops-1', 'Operators and comparisons', 'Lesson + code editor · 8 min')),
      unit('j-u6', 'Decisions', ref('j-cond-1', 'Decisions: if, else and switch', 'Lesson + code editor · 8 min')),
      unit('j-u2', 'Loops', ref('w-js-1', 'Loops: for, while and for…of', 'Lesson + code editor · 8 min')),
      unit('j-u12', 'Functions', ref('j-fn-1', 'Functions, scope and closures', 'Lesson + code editor · 9 min')),
      unit('j-u3', 'Arrays', ref('j-arr-1', 'Arrays and array methods', 'Lesson + code editor · 9 min')),
      unit('j-u7', 'Callbacks', ref('j-arrow-1', 'Arrow functions, callbacks and modules', 'Lesson + code editor · 8 min')),
      unit('j-u4', 'Objects', ref('j-obj-1', 'Objects, destructuring and spread', 'Lesson + code editor · 9 min')),
      unit('j-u8', 'Classes', ref('j-class-1', 'Classes', 'Lesson + code editor · 8 min')),
      unit('j-u9', 'Errors', ref('j-error-1', 'Handling errors', 'Lesson + code editor · 8 min')),
      unit('j-u5', 'The DOM', ref('j-dom-1', 'The DOM, events and storage', 'Lesson + live page · 10 min')),
      unit('j-u10', 'Async', ref('j-async-1', 'Promises, async/await and fetch', 'Lesson + code editor · 10 min')),
      unit('j-u13', 'Project', ref('j-project', 'Project: expense tracker', 'Project · 4 steps · 25 min')),
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
    blurb: '12 modules and a project: write and run real Python, from print() to classes.',
    color: '#1D4ED8',
    soft: '#E7EFFE',
    accent: '#93C5FD',
    icon: 'M4 17l6-5-6-5 M12 19h8',
    units: [
      unit('p-u0', 'First program', ref('p-var-1', 'Your first program', 'Lesson + code editor · 6 min')),
      unit('p-u11', 'Numbers', ref('p-num-1', 'Numbers and maths', 'Lesson + code editor · 6 min')),
      unit('p-u6', 'Strings', ref('p-str-1', 'Text and f-strings', 'Lesson + code editor · 7 min')),
      unit('p-u12', 'Decisions', ref('p-if-1', 'Making decisions', 'Lesson + code editor · 7 min')),
      unit('p-u1', 'for loops', ref('p-loop-1', 'Repeat with for and range()', 'Lesson + code editor · 7 min')),
      unit('p-u13', 'while loops', ref('p-while-1', 'while loops', 'Lesson + code editor · 7 min')),
      unit('p-u2', 'Lists', ref('p-loop-2', 'Lists', 'Lesson + code editor · 7 min')),
      unit('p-u4', 'Dictionaries', ref('p-dict-1', 'Dictionaries', 'Lesson + code editor · 7 min')),
      unit('p-u3', 'Functions', ref('p-fn-1', 'Functions', 'Lesson + code editor · 7 min')),
      unit('p-u9', 'Errors', ref('p-err-1', 'Handling errors', 'Lesson + code editor · 7 min')),
      unit('p-u14', 'Files', ref('p-file-1', 'Files', 'Lesson + code editor · 7 min')),
      unit('p-u8', 'Classes', ref('p-class-1', 'Classes and objects', 'Lesson + code editor · 8 min')),
      unit('p-u15', 'Project', ref('p-project', 'Project: canteen billing app', 'Project · 4 tested steps · 15 min')),
      unit('p-i1', 'Comprehensions', ref('py-comprehensions', 'Comprehensions', 'Lesson + build · 12 min')),
      unit('p-i2', 'Tuples and sets', ref('py-tuples-sets', 'Tuples and sets', 'Lesson + build · 12 min')),
      unit('p-i3', 'Modules', ref('py-modules', 'Modules and the standard library', 'Lesson + build · 12 min')),
      unit('p-i4', 'JSON', ref('py-json', 'JSON and real data', 'Lesson + build · 12 min')),
      unit('p-i5', 'Functions in depth', ref('py-functions-2', 'Functions in depth', 'Lesson + build · 12 min')),
      unit('p-i6', 'Classes in depth', ref('py-oop-2', 'Classes in depth', 'Lesson + build · 12 min')),
      unit('p-i7', 'Project', ref('py-i-project', 'Project: a train booking report', 'Project · 3 tested steps · 20 min')),
      unit('p-a1', 'Testing', ref('py-testing', 'Testing your code', 'Lesson + build · 14 min')),
      unit('p-a2', 'Debugging', ref('py-debugging', 'Debugging and logging', 'Lesson + build · 14 min')),
      unit('p-a3', 'APIs', ref('py-apis', 'APIs and HTTP', 'Lesson + build · 14 min')),
      unit('p-a4', 'Generators', ref('py-generators', 'Generators and big data', 'Lesson + build · 14 min')),
      unit('p-a5', 'Decorators', ref('py-decorators', 'Decorators and caching', 'Lesson + build · 14 min')),
      unit('p-a6', 'Clean code', ref('py-clean-code', 'Clean code and code review', 'Lesson + build · 14 min')),
      unit('p-a7', 'Project', ref('py-a-project', 'Project: a tested booking service', 'Project · 3 tested steps · 25 min')),
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
    blurb: 'The first-year favourite: types, operators, loops, arrays, strings, pointers, structs, memory and files.',
    color: '#3949AB',
    soft: '#E8EAF6',
    accent: '#9FA8DA',
    icon: 'M17 7a6 6 0 1 0 0 10',
    units: [
      unit('c1', 'Hello, C', ref('c-hello', 'Hello, C', 'Lesson + code · 7 min')),
      unit('c2', 'Variables', ref('c-vars', 'Variables and types', 'Lesson + code · 8 min')),
      unit('c11', 'Operators', ref('c-ops', 'Operators, input and output', 'Lesson + code · 8 min')),
      unit('c3', 'Decisions', ref('c-if', 'Decisions: if, else and switch', 'Lesson + code · 7 min')),
      unit('c4', 'Loops', ref('c-loops', 'Loops', 'Lesson + code · 8 min')),
      unit('c5', 'Functions', ref('c-func', 'Functions', 'Lesson + code · 8 min')),
      unit('c6', 'Arrays', ref('c-arrays', 'Arrays', 'Lesson + code · 8 min')),
      unit('c7', 'Strings', ref('c-strings', 'Strings', 'Lesson + code · 8 min')),
      unit('c8', 'Pointers', ref('c-pointers', 'Pointers', 'Lesson + code · 9 min')),
      unit('c9', 'Structs', ref('c-struct', 'Structs', 'Lesson + code · 8 min')),
      unit('c10', 'Memory', ref('c-memory', 'Dynamic memory', 'Lesson + code · 9 min')),
      unit('c12', 'Files', ref('c-files', 'Files', 'Lesson + code · 8 min')),
      unit('c13', 'Project', ref('c-marks-project', 'Project: a marks manager', 'Project · 3 parts · 25 min')),
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
    blurb: '13 modules and a project for React 19: components, props, state, events, lists, forms, immutable updates, composition, shared state, effects, custom hooks, context and reducers.',
    color: '#0E7490',
    soft: '#DDF4F9',
    accent: '#67E8F9',
    icon: 'M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4z M12 11v2',
    units: [
      unit('r-u1', 'Components', ref('r-comp-1', 'Components and JSX', 'Lesson + code · 8 min')),
      unit('r-u11', 'Props', ref('r-props', 'Props', 'Lesson + code · 8 min')),
      unit('r-u2', 'State', ref('r-state-1', 'State with useState', 'Lesson + code · 8 min')),
      unit('r-u4', 'Events', ref('r-event-1', 'Events', 'Lesson + code · 8 min')),
      unit('r-u6', 'Conditional UI', ref('r-cond-1', 'Conditional rendering', 'Lesson + code · 8 min')),
      unit('r-u3', 'Lists', ref('r-list-1', 'Lists and keys', 'Lesson + code · 8 min')),
      unit('r-u12', 'Forms', ref('r-form', 'Forms and controlled inputs', 'Lesson + code · 8 min')),
      unit('r-u13', 'Updating state', ref('r-immut', 'Updating objects and arrays in state', 'Lesson + code · 8 min')),
      unit('r-u7', 'Composition', ref('r-children-1', 'Composition with children', 'Lesson + code · 8 min')),
      unit('r-u8', 'Shared state', ref('r-lift-1', 'Sharing state between components', 'Lesson + code · 8 min')),
      unit('r-u5', 'Effects', ref('r-effect-1', 'Effects', 'Lesson + code · 8 min')),
      unit('r-u9', 'Custom hooks', ref('r-hooks-1', 'Custom hooks and the rules of hooks', 'Lesson + code · 8 min')),
      unit('r-u10', 'Context', ref('r-context-1', 'Context and reducers', 'Lesson + code · 8 min')),
      unit('r-u14', 'Project', ref('r-project', 'Project: a course enquiry app', 'Project · 3 steps · 25 min')),
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
      unit('n-u1', 'Node.js', ref('n-intro-1', 'What Node.js is', 'Lesson + code · 7 min')),
      unit('n-u11', 'Modules', ref('n-modules', 'Modules: import and export', 'Lesson + code · 8 min')),
      unit('n-u6', 'npm', ref('n-npm-1', 'npm and packages', 'Lesson + code · 8 min')),
      unit('n-u2', 'Async', ref('n-async-1', 'Asynchronous code and the event loop', 'Lesson + code · 9 min')),
      unit('n-u7', 'Files', ref('n-fs-1', 'Files and paths', 'Lesson + code · 8 min')),
      unit('n-u12', 'HTTP', ref('n-http', 'HTTP and a server with no packages', 'Lesson + code · 8 min')),
      unit('n-u3', 'Express', ref('n-express-1', 'Express: routes', 'Lesson + code · 8 min')),
      unit('n-u8', 'Middleware', ref('n-middleware-1', 'Express middleware and errors', 'Lesson + code · 8 min')),
      unit('n-u4', 'JSON', ref('n-json-1', 'JSON and validating input', 'Lesson + code · 8 min')),
      unit('n-u9', 'REST design', ref('n-rest-1', 'REST API design', 'Lesson + code · 8 min')),
      unit('n-u5', 'CRUD API', ref('n-api-1', 'Build a CRUD API', 'Lesson + code · 10 min')),
      unit('n-u10', 'Config', ref('n-env-1', 'Configuration and secrets', 'Lesson + code · 7 min')),
      unit('n-u13', 'Testing', ref('n-test', 'Testing with node:test', 'Lesson + code · 8 min')),
      unit('n-u14', 'Project', ref('n-project', 'Project: a train booking API', 'Project · 3 parts · 30 min')),
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
    blurb: '12 modules and a project: routing, Server Components, caching, APIs, Server Actions, security and deployment, checked against the Next.js 16 docs.',
    color: '#16142B',
    soft: '#ECEBF3',
    accent: '#A3A1B8',
    icon: 'M12 3l10 18H2z',
    units: [
      unit('nx-u1', 'Routing', ref('nx-1', 'What Next.js is, and file-based routing', 'Lesson + code editor · 8 min')),
      unit('nx-u2', 'Layouts', ref('nx-layout-1', 'Layouts and nested layouts', 'Lesson + code editor · 8 min')),
      unit('nx-u6', 'Navigation', ref('nx-link-1', 'Linking and navigating', 'Lesson + code editor · 8 min')),
      unit('nx-u3', 'Dynamic routes', ref('nx-dyn-1', 'Dynamic routes and params', 'Lesson + code editor · 8 min')),
      unit('nx-u8', 'Loading and errors', ref('nx-loading-1', 'Loading, error and not-found pages', 'Lesson + code editor · 8 min')),
      unit('nx-u4', 'Server and client', ref('nx-data-1', 'Server and Client Components', 'Lesson + code editor · 8 min')),
      unit('nx-u11', 'Rendering', ref('nx-render-1', 'Rendering, streaming and caching', 'Lesson + code editor · 8 min')),
      unit('nx-u5', 'APIs', ref('nx-api-1', 'Route Handlers: build a REST API', 'Lesson + code editor · 9 min')),
      unit('nx-u9', 'Forms', ref('nx-actions-1', 'Server Actions and forms', 'Lesson + code editor · 9 min')),
      unit('nx-u7', 'Styling and SEO', ref('nx-meta-1', 'Styling, images, fonts and metadata', 'Lesson + code editor · 8 min')),
      unit('nx-u12', 'Security', ref('nx-auth-1', 'Secrets, auth and proxy', 'Lesson + code editor · 9 min')),
      unit('nx-u10', 'Ship it', ref('nx-deploy-1', 'Testing and deploying', 'Lesson + code editor · 8 min')),
      unit('nx-u13', 'Project', ref('nx-project', 'Project: student management API', 'Project · 3 tested steps · 20 min')),
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
    blurb: '13 modules and a mock coding round in Python: Big-O, arrays, searching, sorting, hashing, two pointers, sliding window, prefix sums, stacks, queues, linked lists and recursion.',
    color: '#6D28D9',
    soft: '#F1EBFE',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M6 12h12 M6 12v4 M18 12v4 M12 8v4',
    units: [
      unit('dsa1', 'Big-O', ref('dsa-bigo', 'Big-O: how code scales', 'Lesson + code editor · 9 min')),
      unit('dsa11', 'Arrays and strings', ref('dsa-arrays', 'Arrays and strings', 'Lesson + code editor · 9 min')),
      unit('dsa2', 'Linear search', ref('dsa-linear', 'Linear search', 'Lesson + code editor · 8 min')),
      unit('dsa3', 'Binary search', ref('dsa-binary', 'Binary search', 'Lesson + code editor · 9 min')),
      unit('dsa4', 'Sorting', ref('dsa-sort', 'Sorting', 'Lesson + code editor · 9 min')),
      unit('dsa7', 'Hashing', ref('dsa-hash', 'Hashing with sets and dicts', 'Lesson + code editor · 9 min')),
      unit('dsa8', 'Two pointers', ref('dsa-pointers', 'Two pointers', 'Lesson + code editor · 9 min')),
      unit('dsa12', 'Sliding window', ref('dsa-window', 'Sliding window', 'Lesson + code editor · 9 min')),
      unit('dsa13', 'Prefix sums', ref('dsa-prefix', 'Prefix sums', 'Lesson + code editor · 8 min')),
      unit('dsa5', 'Stacks', ref('dsa-stack', 'Stacks', 'Lesson + code editor · 9 min')),
      unit('dsa6', 'Queues', ref('dsa-queue', 'Queues', 'Lesson + code editor · 9 min')),
      unit('dsa10', 'Linked lists', ref('dsa-linked', 'Linked lists', 'Lesson + code editor · 10 min')),
      unit('dsa9', 'Recursion', ref('dsa-recursion', 'Recursion', 'Lesson + code editor · 9 min')),
      unit('dsa14', 'Project', ref('dsa-project', 'Project: a mock coding round', 'Project · 3 problems · 25 min')),
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
    blurb: 'Trees, heaps, BFS, DFS, topological sort, Dijkstra, backtracking, dynamic programming and greedy: the coding-round core.',
    color: '#5B21B6',
    soft: '#EDE5FD',
    accent: '#C4B5FD',
    icon: 'M12 4v4 M12 8l-5 5 M12 8l5 5 M7 13v4 M17 13v4',
    units: [
      unit('da1', 'Binary trees', ref('dsa2-tree', 'Binary trees', 'Lesson + code editor · 9 min')),
      unit('da2', 'BSTs', ref('dsa2-bst', 'Binary search trees', 'Lesson + code editor · 9 min')),
      unit('da3', 'Heaps', ref('dsa2-heap', 'Heaps and priority queues', 'Lesson + code editor · 8 min')),
      unit('da4', 'BFS', ref('dsa2-bfs', 'Graphs and BFS', 'Lesson + code editor · 9 min')),
      unit('da5', 'DFS', ref('dsa2-dfs', 'DFS and connected parts', 'Lesson + code editor · 9 min')),
      unit('da11', 'Topological sort', ref('dsa2-topo', 'Topological sort', 'Lesson + code editor · 9 min')),
      unit('da12', 'Dijkstra', ref('dsa2-dijkstra', 'Shortest paths with weights', 'Lesson + code editor · 10 min')),
      unit('da6', 'Backtracking', ref('dsa2-backtrack', 'Backtracking', 'Lesson + code editor · 9 min')),
      unit('da7', 'DP: memoization', ref('dsa2-dp1', 'Dynamic programming: memoization', 'Lesson + code editor · 8 min')),
      unit('da8', 'DP: tables', ref('dsa2-dp2', 'Dynamic programming: tables', 'Lesson + code editor · 9 min')),
      unit('da13', 'DP: 2-D', ref('dsa2-dp3', 'Dynamic programming in two dimensions', 'Lesson + code editor · 10 min')),
      unit('da9', 'Greedy', ref('dsa2-greedy', 'Greedy algorithms', 'Lesson + code editor · 8 min')),
      unit('da10', 'Merge sort', ref('dsa2-merge', 'Merge sort and divide and conquer', 'Lesson + code editor · 9 min')),
      unit('da14', 'Project', ref('dsa2-project', 'Project: a metro route planner', 'Project · 3 parts · 30 min')),
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
    blurb: '12 modules and a project, all run on a real railway database: filter, group, join, CTEs, window functions, transactions and design.',
    color: '#0369A1',
    soft: '#E0F2FE',
    accent: '#7DD3FC',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    units: [
      unit('sq1', 'SELECT', ref('sql-select', 'Databases, tables and SELECT', 'Lesson + run queries · 8 min')),
      unit('sq2', 'WHERE', ref('sql-where', 'Filtering with WHERE', 'Lesson + run queries · 8 min')),
      unit('sq7', 'Patterns and NULL', ref('sql-patterns', 'LIKE, IN, BETWEEN and NULL', 'Lesson + run queries · 8 min')),
      unit('sq3', 'Sorting', ref('sql-order', 'Sorting: ORDER BY, LIMIT and DISTINCT', 'Lesson + run queries · 8 min')),
      unit('sq4', 'Aggregates', ref('sql-agg', 'Counting and totals: aggregates', 'Lesson + run queries · 8 min')),
      unit('sq5', 'Grouping', ref('sql-group', 'GROUP BY and HAVING', 'Lesson + run queries · 8 min')),
      unit('sq6', 'Joins', ref('sql-join', 'JOIN: combine tables', 'Lesson + run queries · 8 min')),
      unit('sq11', 'LEFT JOIN', ref('sql-left', 'LEFT JOIN: find what’s missing', 'Lesson + run queries · 8 min')),
      unit('sq10', 'Subqueries and CTEs', ref('sql-sub', 'Subqueries and CTEs', 'Lesson + run queries · 9 min')),
      unit('sq12', 'Window functions', ref('sql-window', 'Window functions: ranks and running totals', 'Lesson + run queries · 9 min')),
      unit('sq8', 'Changing data', ref('sql-change', 'Changing data safely', 'Lesson + run queries · 8 min')),
      unit('sq9', 'Design', ref('sql-design', 'Keys, constraints and indexes', 'Lesson + run queries · 8 min')),
      unit('sq13', 'Project', ref('sql-project', 'Project: railway sales report', 'Project · 4 tested queries · 20 min')),
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
      unit('g1', 'Why Git', ref('git-why', 'Why Git?', 'Lesson + Python · 6 min')),
      unit('g2', 'Setting up', ref('git-init', 'Setting up and starting a repository', 'Lesson + Python · 6 min')),
      unit('g3', 'Commits', ref('git-commit', 'Staging and committing', 'Lesson + Python · 7 min')),
      unit('g4', 'History', ref('git-history', 'Looking at history: log, diff and show', 'Lesson + Python · 7 min')),
      unit('g5', 'Branches', ref('git-branch', 'Branches', 'Lesson + Python · 7 min')),
      unit('g6', 'Merging', ref('git-merge', 'Merging and conflicts', 'Lesson + Python · 8 min')),
      unit('g7', 'Remotes', ref('git-remote', 'Remotes: clone, push and pull', 'Lesson + Python · 7 min')),
      unit('g8', 'Pull requests', ref('git-pr', 'Pull requests and teamwork', 'Lesson + Python · 7 min')),
      unit('g9', '.gitignore', ref('git-ignore', '.gitignore and secrets', 'Lesson + Python · 7 min')),
      unit('g10', 'Undo', ref('git-undo', 'Undoing things safely', 'Lesson + Python · 7 min')),
      unit('g11', 'Stash', ref('git-stash', 'Stash: set work aside', 'Lesson + Python · 6 min')),
      unit('g12', 'Project', ref('git-project', 'Project: a clean-history checker', 'Project · 3 parts · 20 min')),
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
