export type CodeLang = 'python' | 'javascript' | 'html' | 'css' | 'jsx' | 'c' | 'java' | 'sql' | 'bash';

export type CodeSample = { lang: CodeLang; label: string; lines: string[] };

/** A line segment in a fill-in-the-gap exercise: plain code or a gap. */
export type Seg = string | { gap: number };

export type HtmlNode = { tag: string; text: string };
export type Preview =
  | { kind: 'html'; nodes: HtmlNode[] }
  | { kind: 'react'; from: string; to: string | undefined; seats: string }
  | {
      kind: 'button';
      background: string;
      color: string;
      radius: number;
      padding: number;
      label: string;
    }
  | {
      kind: 'flex';
      row: boolean;
      justify: 'flex-start' | 'space-between';
      align: 'flex-start' | 'center';
      items: string[];
    };

export type RunOutput = {
  pass: boolean;
  /** Console output, one entry per line. */
  output?: string[];
  error?: string;
  /** Named checks shown as a test list. */
  checks?: { label: string; ok: boolean }[];
  preview?: Preview;
};

export type ConceptStep = {
  type: 'concept';
  kicker: string;
  title: string;
  body: string;
  /** An interactive diagram shown with the card. The Python ones step through code. */
  visual?: 'sequence' | 'loopCompare' | 'htmlAnatomy' | 'componentProps' | 'variables' | 'listIndex' | 'callFlow' | 'routeTree' | 'serverClient' | 'requestFlow' | 'sqlOrder' | 'joinMatch' | 'bigO' | 'binarySearch' | 'bubbleSort' | 'stackQueue' | 'linkedList' | 'slidingWindow';
  code?: CodeSample[];
  /** "Watch it run": highlights a line once per round and shows the loop variable. */
  demo?: {
    values: (number | string)[];
    line: number;
    caption: (value: number | string, round: number) => string;
    done: string;
  };
  tip?: string;
  /** Lesson v3: a small looping animation of the idea (see ANIMS in features/lesson/Anim.tsx). */
  anim?: AnimKey;
};

/** The animations a concept card can show. Each is a short, looping, built-in scene (no image files). */
export type AnimKey =
  | 'variable'
  | 'print'
  | 'types'
  | 'math'
  | 'string'
  | 'branch'
  | 'loop'
  | 'whileLoop'
  | 'list'
  | 'dict'
  | 'function'
  | 'error'
  | 'file'
  | 'classObject'
  | 'module'
  | 'json'
  | 'api'
  | 'test'
  | 'comprehension'
  | 'set'
  | 'tuple'
  | 'scope'
  | 'recursion'
  | 'generator'
  | 'decorator';

export type QuizStep = {
  type: 'quiz';
  prompt: string;
  code?: CodeSample;
  options: string[];
  mono?: boolean;
  answer: number;
  right: string;
  wrong: string;
};

export type PuzzleStep = { type: 'puzzle'; levelId: string; task: string };

export type CodeStep = {
  type: 'code';
  kicker: string;
  title: string;
  instructions: string;
  lang: CodeLang;
  file: string;
  lines: Seg[][];
  tokens: string[];
  /** The intended answer, verified by tests. */
  solution: string[];
  run: (gaps: string[]) => RunOutput;
};

/** Free typing in a real editor; code runs in the sandbox and is checked by tests. */
export type EditorStep = {
  type: 'editor';
  kicker: string;
  title: string;
  instructions: string;
  /** SQL runs through Python's sqlite3 against the sample railway database. */
  lang: 'python' | 'javascript' | 'sql';
  file: string;
  starter: string;
  /** `raises`: the call must fail with exactly this error, e.g. "ValueError: name is required". */
  tests: ({ call: string; expect: string } | { call: string; raises: string } | { stdout: string; unordered?: boolean })[];
  hint: string;
  /** A correct answer, verified by tests. */
  solution: string;
};

/** Put shuffled lines back in order (a Parsons problem). `lines` is the correct order. */
export type OrderStep = {
  type: 'order';
  kicker: string;
  title: string;
  instructions: string;
  lang: CodeLang;
  lines: string[];
  output?: string[];
  explain: string;
};

/** Tap the line that has the bug. */
export type BugStep = {
  type: 'bug';
  kicker: string;
  title: string;
  instructions: string;
  lang: CodeLang;
  lines: string[];
  /** Index of the buggy line. */
  bug: number;
  /** The corrected line, shown after answering. */
  fix: string;
  explain: string;
};

/** Read the code and type exactly what it prints. */
export type PredictStep = {
  type: 'predict';
  kicker: string;
  title: string;
  lang: CodeLang;
  lines: string[];
  answer: string;
  /** Other answers that also count (compared ignoring case and extra spaces). */
  accept?: string[];
  explain: string;
};

/** Tap one token in the code, e.g. "tap the loop variable". */
export type TapStep = {
  type: 'tap';
  kicker: string;
  title: string;
  instructions: string;
  lang: CodeLang;
  lines: string[];
  target: { line: number; token: string };
  explain: string;
};

export type WebFile = 'html' | 'css' | 'js';
export type WebCheck = { label: string; file: WebFile; pattern: RegExp };

/** Build a real web page in HTML/CSS/JS editors with a live preview; checks read the source. */
export type WebStep = {
  type: 'web';
  kicker: string;
  title: string;
  instructions: string;
  starter: Partial<Record<WebFile, string>> & { html: string };
  solution: Partial<Record<WebFile, string>> & { html: string };
  checks: WebCheck[];
  hint: string;
};

/** Lesson v2: opens a module with a real situation and what the learner will be able to do. */
export type HookStep = {
  type: 'hook';
  kicker: string;
  title: string;
  /** Two or three sentences: an everyday Indian situation the module solves. */
  story: string;
  /** "By the end you can …" */
  goal: string;
  /** Optional preview of the code they'll be able to write. */
  code?: CodeSample;
};

/** Lesson v2: edit and run code freely. Nothing is checked, so it never counts as a mistake. */
export type TryStep = {
  type: 'try';
  kicker: string;
  title: string;
  instructions: string;
  /** SQL runs against the sample railway database. 'web' edits a page with a live preview (use `files`). */
  lang: 'python' | 'javascript' | 'sql' | 'web';
  file: string;
  starter: string;
  /** For lang 'web': the page's starting files. */
  files?: { html: string; css?: string; js?: string };
  /** Small changes to try, e.g. "Change 72 to 100". */
  ideas: string[];
};

/** Lesson v2: Yatri shows a mistake beginners really make, the error it gives, and the fix. */
export type MistakeStep = {
  type: 'mistake';
  kicker: string;
  title: string;
  lang: CodeLang;
  wrong: string[];
  /** What Python (or the browser) says, shown like real console output. */
  error: string;
  /** The wrong code never finishes (an endless loop), so tests don't run it. */
  hang?: boolean;
  /** Shown above the error when it is a summary of what a tool prints (e.g. a Next.js build error), not exact output. */
  note?: string;
  right: string[];
  explain: string;
};

/**
 * Lesson v3: watch a program run one line at a time, with its variables and output.
 * The trace is made by really running the code (tests run the same tracer). An optional question
 * at the end makes it a checked step.
 */
export type TraceStep = {
  type: 'trace';
  kicker: string;
  title: string;
  instructions: string;
  lang: 'python';
  code: string[];
  /** Asked after the last line has run. */
  ask?: {
    prompt: string;
    options: string[];
    answer: number;
    explain: string;
    /** Where the right option comes from, so tests can check it: a variable's final value, or the last line printed. */
    check: { var: string } | { out: true };
  };
};

/** Lesson v3: tap a left item, then the right item it belongs with. `pairs` are in the right order. */
export type MatchStep = {
  type: 'match';
  kicker: string;
  title: string;
  instructions: string;
  pairs: [string, string][];
  /** Show the left side as code. */
  mono?: boolean;
  explain: string;
};

/** Lesson v3: sort each item into one of two or three groups, e.g. "changes in place" vs "makes a new value". */
export type GroupStep = {
  type: 'group';
  kicker: string;
  title: string;
  instructions: string;
  groups: string[];
  /** Each item with the index of its group. */
  items: { text: string; group: number }[];
  mono?: boolean;
  explain: string;
};

/** Lesson v3: a short work situation (a message from a teammate, maybe a log or a report) that sets up the next task. */
export type ScenarioStep = {
  type: 'scenario';
  kicker: string;
  title: string;
  /** Who is asking, e.g. "Priya · team lead". */
  from: string;
  message: string;
  artifact?: { kind: 'log' | 'report' | 'data' | 'diff' | 'ticket'; title: string; lines: string[] };
  /** What the learner will do next, e.g. "Fix the function so the totals are right." */
  task: string;
};

/** Steps that only teach: they are never checked, reviewed or used in practice rounds. */
export const TEACHING_STEPS = ['concept', 'hook', 'try', 'mistake', 'scenario'] as const;
/** A step that only teaches. Watching a program run is teaching too, unless it ends with a question. */
export const isTeaching = (s: Step) => (TEACHING_STEPS as readonly string[]).includes(s.type) || (s.type === 'trace' && !s.ask);

export type Step =
  | ConceptStep
  | HookStep
  | TryStep
  | MistakeStep
  | QuizStep
  | PuzzleStep
  | CodeStep
  | EditorStep
  | OrderStep
  | BugStep
  | PredictStep
  | TapStep
  | WebStep
  | TraceStep
  | MatchStep
  | GroupStep
  | ScenarioStep;

/**
 * "Read more": a module's notes, a short article read after (or instead of) the lesson.
 * Plain sections, one worked example walked through line by line, how the idea is used at work,
 * interview questions, a cheat sheet, and the lesson's official reading. Worked examples run in tests.
 */
export type ModuleNotes = {
  /** About how long it takes to read. */
  minutes: number;
  /** Three or four sections, each one idea explained fully (up to about 120 words). */
  sections: { heading: string; body: string; code?: string[]; anim?: AnimKey }[];
  example: {
    title: string;
    code: string[];
    /** Line-by-line explanation; `line` is 1-based. */
    walk: { line: number; text: string }[];
    /** What it prints; tests run the code and compare. */
    output: string[];
  };
  /** How working developers use this. */
  industry: string;
  interview: { q: string; a: string }[];
  cheat: { code: string; meaning: string }[];
};

/** How far along a module is: Basic (read and explain), Intermediate (solve alone), Advanced (do real job tasks). */
export type Level = 'basic' | 'intermediate' | 'advanced';

export type SkillKey = 'sequencing' | 'loops' | 'web' | 'python' | 'react' | 'html' | 'css' | 'js' | 'node' | 'next' | 'c' | 'java' | 'dsa' | 'sql' | 'git' | 'placement';

export type Lesson = {
  id: string;
  title: string;
  kind: 'lesson' | 'practice' | 'project';
  /** Lesson v3: Basic, Intermediate or Advanced. */
  level?: Level;
  minutes: number;
  skill: SkillKey;
  steps: Step[];
  learned: string[];
  /** Official reading for going deeper, with the day someone last checked it is still right. */
  reading?: Reading[];
  /** For built lessons (daily challenge, review): where each step came from, as "lessonId#stepIndex". */
  sources?: string[];
};

/** A trusted outside resource. `reviewed` is YYYY-MM-DD; `version` names what it applies to, e.g. "Next.js 16". */
export type Reading = { title: string; url: string; kind: 'docs' | 'guide' | 'video'; reviewed: string; version?: string };

export type LessonRef = { id: string; title: string; meta: string };
export type Unit = { id: string; title: string; lessons: LessonRef[] };
export type PracticeRef = {
  id: string;
  title: string;
  kind: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
};

/** A language track (HTML, Python, …). Tracks are grouped into sections for navigation. */
export type Stage = {
  id: string;
  section: 'Start here' | 'School' | 'Web basics' | 'Programming' | 'Full-stack' | 'CS core' | 'Placement';
  /** Short label drawn in the track's badge, e.g. "JS" ("atom" draws the React logo). */
  badge: string;
  badgeBg: string;
  badgeInk: string;
  name: string;
  short: string;
  sub: string;
  audience: string;
  blurb: string;
  color: string;
  soft: string;
  accent: string;
  /** 24×24 stroke icon. */
  icon: string;
  units: Unit[];
  practice: PracticeRef[];
};
