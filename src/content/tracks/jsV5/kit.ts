// Builders for the JavaScript track (Lesson v5): the HTML and CSS screens, plus the three JavaScript ones
// (run and tweak, predict then run, tap the page). Content: project-docs/content-drafts/js-track-v5.md.
// Every program here is run in tests (lessonV5.test.ts), so outputs and answers are always what really happens.
import type { Ask, Lesson, PagePreview, PlaceStep, QuizStep, RunStep, Seg, Step, TapAction, TapPageStep, ToggleStep, TraceStep } from '../../types';
import * as K from '../htmlV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'js' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'js',
});

const js = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'javascript' } : q);

/** A quick check (first option right), with JavaScript highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => js(K.check(prompt, options, right, wrong, o));

/** Challenge task 3 (first option right). */
export const pickCode = (prompt: string, options: [string, ...string[]], why: string): QuizStep => K.pickCode(prompt, options, why);

/** Switch between versions of a program; each view shows what it prints (`out`, checked by running it). */
export const toggleRun = (title: string, views: [label: string, code: string[], caption: string, out: string[]][], intro?: string, kicker = 'SWITCH AND SEE'): ToggleStep => ({
  type: 'toggle',
  kicker,
  title,
  intro,
  views: views.map(([label, code, caption, out]) => ({ label, code, caption, out })),
});

/** Run and tweak: `{{v}}` marks the value; with `goal`, Continue waits until the console prints that line. */
export const run = (title: string, instructions: string, code: string[], choices: string[], o: { goal?: string; caption?: string } = {}): RunStep => ({
  type: 'run',
  kicker: 'RUN AND TWEAK',
  title,
  instructions,
  code,
  choices,
  ...o,
});

/** A stop in "predict, then run": before `line` runs, ask; the answer is checked against the real run. */
export type Stop = [line: number, prompt: string, options: [string, ...string[]], why: string, check: { var: string } | { out: true }];

/** Predict, then run: plays line by line and pauses at each stop. Options are shuffled; the first is right. */
export const predict = (title: string, code: string[], stops: Stop[], instructions = 'Watch it run. It stops to ask what happens next.'): TraceStep => ({
  type: 'trace',
  kicker: 'PREDICT, THEN RUN',
  title,
  instructions,
  lang: 'javascript',
  code,
  stops: stops.map(([line, prompt, options, why, chk]) => ({ line, prompt, options, answer: 0, hint: 'Read the line carefully and look at the variables.', why, check: chk, mono: true }) as Ask & { line: number; check: { var: string } | { out: true } }),
});

/** Challenge task 5 for JavaScript: run the program, then say what it printed last (or a variable’s final value). */
export const predictTask = (code: string[], prompt: string, options: [string, ...string[]], explain: string, chk: { var: string } | { out: true } = { out: true }): TraceStep => ({
  type: 'trace',
  kicker: 'TASK 5 OF 6 · PREDICT THE OUTPUT',
  title: 'What will it print?',
  instructions: 'Read the code, watch it run, then answer.',
  lang: 'javascript',
  code,
  ask: { prompt, options, answer: 0, explain, check: chk },
});

/** Tap to place for a program: once every gap is full, it runs and the console shows the result. */
export const place = (title: string, instructions: string, lines: Seg[][], pieces: string[], answer: string[], revealText: string): PlaceStep => ({
  ...K.place(title, instructions, lines, pieces, answer, revealText),
  run: true,
  preview: false,
});

/** Tap the page: a live page with JavaScript; `demo` is the taps that reach `goal` (run in tests). */
export const tapPage = (title: string, instructions: string, page: PagePreview, goal: string, demo: TapAction[], caption?: string): TapPageStep => ({
  type: 'tappage',
  kicker: 'TAP THE PAGE',
  title,
  instructions,
  page,
  goal,
  demo,
  caption,
});

/** Challenge task 6 for JavaScript: put whole statements in order; the right order prints `expect`. */
export const arrange = (blocks: string[], goal: string, expect: string[]) => ({ ...K.arrange(blocks, goal), run: true, expect });

/** Challenge task 5 when the module is about pages: X-ray, naming the selector or property behind each part. */
export const xray = (page: PagePreview, parts: [string, string, string, string[]][]) => ({
  ...K.xray(page, parts),
  title: 'See the code behind the page',
  instructions: 'Tap a part of the page, then pick the code behind it.',
});
