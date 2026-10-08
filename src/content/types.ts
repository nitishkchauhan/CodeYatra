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
  visual?: 'sequence' | 'loopCompare' | 'htmlAnatomy' | 'componentProps';
  code?: CodeSample[];
  /** "Watch it run": highlights a line once per round and shows the loop variable. */
  demo?: {
    values: (number | string)[];
    line: number;
    caption: (value: number | string, round: number) => string;
    done: string;
  };
  tip?: string;
};

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
  tests: ({ call: string; expect: string } | { stdout: string; unordered?: boolean })[];
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

export type Step = ConceptStep | QuizStep | PuzzleStep | CodeStep | EditorStep | OrderStep | BugStep | PredictStep | TapStep | WebStep;

export type SkillKey = 'sequencing' | 'loops' | 'web' | 'python' | 'react' | 'html' | 'css' | 'js' | 'node' | 'next' | 'c' | 'java' | 'dsa' | 'sql' | 'git' | 'placement';

export type Lesson = {
  id: string;
  title: string;
  kind: 'lesson' | 'practice' | 'project';
  minutes: number;
  skill: SkillKey;
  steps: Step[];
  learned: string[];
  /** For built lessons (daily challenge, review): where each step came from, as "lessonId#stepIndex". */
  sources?: string[];
};

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
  section: 'Start here' | 'Web basics' | 'Programming' | 'Full-stack' | 'CS core' | 'Placement';
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
