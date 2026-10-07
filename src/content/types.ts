export type CodeLang = 'python' | 'javascript' | 'html' | 'css' | 'jsx';

export type CodeSample = { lang: CodeLang; label: string; lines: string[] };

/** A line segment in a fill-in-the-gap exercise: plain code or a gap. */
export type Seg = string | { gap: number };

export type HtmlNode = { tag: string; text: string };
export type Preview =
  | { kind: 'html'; nodes: HtmlNode[] }
  | { kind: 'react'; from: string; to: string | undefined; seats: string }
  | { kind: 'button'; background: string; color: string; radius: number; padding: number; label: string };

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
  hindi?: string;
  body: string;
  visual?: 'sequence' | 'loopCompare' | 'htmlAnatomy' | 'componentProps';
  code?: CodeSample[];
  /** "Watch it run": highlights a line once per round and shows the loop variable. */
  demo?: { values: (number | string)[]; line: number; caption: (value: number | string, round: number) => string; done: string };
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
  lang: 'python' | 'javascript';
  file: string;
  starter: string;
  tests: ({ call: string; expect: string } | { stdout: string })[];
  hint: string;
  /** A correct answer, verified by tests. */
  solution: string;
};

export type Step = ConceptStep | QuizStep | PuzzleStep | CodeStep | EditorStep;

export type SkillKey = 'sequencing' | 'loops' | 'web' | 'python' | 'react';

export type Lesson = {
  id: string;
  title: string;
  kind: 'lesson' | 'practice';
  minutes: number;
  skill: SkillKey;
  steps: Step[];
  learned: string[];
};

export type LessonRef = { id: string; title: string; meta: string };
export type Unit = { id: string; title: string; lessons: LessonRef[] };
export type PracticeRef = { id: string; title: string; kind: string; difficulty: 'Easy' | 'Medium' | 'Hard'; xp: number };

export type Stage = {
  id: string;
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
