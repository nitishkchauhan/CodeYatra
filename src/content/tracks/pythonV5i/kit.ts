// Builders for Python Intermediate (Lesson v5): the JavaScript screens (run and tweak, predict then run, tap to place,
// arrange…) with Python programs, plus “At work” messages from the Brightline Studio team.
// Draft: project-docs/content-drafts/python-intermediate-v5.md. Every program is run in tests with real Python
// (lessonV5.test.ts, lessonV3.test.ts), so each output and answer is what Python really prints.
import type { EditorStep, Lesson, PlaceStep, QuizStep, Reading, RunStep, Seg, Step, ToggleStep, TraceStep } from '../../types';
import * as K from '../jsV5/kit';

export { bugTask, chat, explore, matchUp, mcq, pairs, recap, reveal, swipe, tapbug, truth } from '../jsV5/kit';
export { atWork } from '../htmlV5i/kit';

const REVIEWED = '2026-10-31';
export const doc = (title: string, page: string): Reading => ({ title, url: `https://docs.python.org/3/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'Python 3' });

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'python', level: 'intermediate' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'python',
  level: 'intermediate',
});

const py = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'python' } : q);

/** A quick check (first option right), with Python highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => py(K.check(prompt, options, right, wrong, o));

/** Challenge task 3 (first option right). */
export const pickCode = K.pickCode;

/** Switch between versions of a program; each view shows what it prints (`out`, checked by running it). */
export const toggleRun = (title: string, views: [label: string, code: string[], caption: string, out: string[]][], intro?: string): ToggleStep => K.toggleRun(title, views, intro);

/** Run and tweak: `{{v}}` marks the value; with `goal`, Continue waits until the program prints that line. */
export const run = (title: string, instructions: string, code: string[], choices: string[], o: { goal?: string; caption?: string } = {}): RunStep => K.run(title, instructions, code, choices, o);

/** A stop in "predict, then run": before `line` runs, ask; the answer is checked against the real run. */
export type Stop = K.Stop;

/** Predict, then run: plays line by line and pauses at each stop. Options are shuffled; the first is right. */
export const predict = (title: string, code: string[], stops: Stop[], instructions?: string): TraceStep => ({ ...K.predict(title, code, stops, instructions), lang: 'python' });

/** Challenge task 5: run the program, then say what it printed last (or a variable’s final value). */
export const predictTask = (code: string[], prompt: string, options: [string, ...string[]], explain: string, chk: { var: string } | { out: true } = { out: true }): TraceStep => ({ ...K.predictTask(code, prompt, options, explain, chk), lang: 'python' });

/** Tap to place in a program: once every gap is full, it runs and the output is shown. */
export const place = (title: string, instructions: string, lines: Seg[][], pieces: string[], answer: string[], revealText: string): PlaceStep => K.place(title, instructions, lines, pieces, answer, revealText);

/** Challenge task 6: put whole statements in order; the right order prints `expect`. */
export const arrange = (blocks: string[], goal: string, expect: string[]) => K.arrange(blocks, goal, expect);

/** One step of the final project, in the Python code editor with hidden tests. */
export const project = (n: number, o: Omit<EditorStep, 'type' | 'kicker' | 'lang' | 'file'>): EditorStep => ({ type: 'editor', kicker: `FINAL PROJECT · STEP ${n} OF 4`, lang: 'python', file: 'report.py', ...o });
