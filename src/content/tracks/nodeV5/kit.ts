// Builders for the Node.js track (Lesson v5): programs run live in a terminal page by the teaching copy of Node.js
// (scripts/node-runtime.js), offline. Topics follow W3Schools’ Node.js tutorial and the official Node.js docs as a
// checklist, in our own words. Every terminal page is run in tests with its taps (lessonV5.test.ts).
import type { ArrangeStep, Lesson, Level, NodeApp, PagePreview, QuizStep, Step, TapAction, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'node' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'node',
});

const js = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'javascript' } : q);

/** A quick check (first option right), with JavaScript highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => js(K.check(prompt, options, right, wrong, o));

/** Challenge task 3 (first option right). */
export const pickCode = K.pickCode;

/** A program’s files, by path; code is written as lines. */
export type Files = Record<string, string | string[]>;
export const join = (files: Files) => Object.fromEntries(Object.entries(files).map(([k, v]) => [k, Array.isArray(v) ? v.join('\n') : v]));

/** A terminal that runs `node app.js` (or the options’ entry, arguments, env file, test run…). */
export const term = (files: Files, o: Omit<NodeApp, 'files'> = {}): PagePreview => ({ html: '', node: { ...o, files: join(files) } });

/** A one-file program in app.js. */
export const prog = (code: string[], o: Omit<NodeApp, 'files'> = {}, more: Files = {}): PagePreview => term({ 'app.js': code, ...more }, o);

/** A ready-made request button for a server (tap #cy-r0, #cy-r1…). */
export const req = (method: string, path: string, body?: unknown, label?: string) => ({ method, path, body: body === undefined ? undefined : JSON.stringify(body), label });

/** The tap that presses ready-made request n. */
export const press = (n: number): TapAction => ({ click: `#cy-r${n}` });

/** The tap that runs the program again. */
export const rerun: TapAction = { click: '#cy-run' };

/** Challenge task 5: X-ray a terminal and name the code behind each line. */
export const TERM_CSS = 'body{margin:0;background:#0F1222}.t{font:13px/1.6 ui-monospace,monospace;color:#E6E8F2;padding:10px 12px}.c{color:#7EE0B5}.e{color:#FF8A9B}.r{color:#FFD58A}';
export const xray = (html: string, parts: [string, string, string, string[]][]): XrayStep => ({
  ...K.xray({ html: `<div class="t">${html}</div>`, css: TERM_CSS }, parts),
  title: 'Which code did that?',
  instructions: 'Tap a line in the terminal, then pick the code behind it.',
});

/** Challenge task 6: put a program’s lines in order; the right order runs. */
export const arrange = (blocks: string[], goal: string, o: Omit<NodeApp, 'files' | 'edit'> & { files?: Files } = {}, edit = 'app.js'): ArrangeStep => ({
  ...K.arrange(blocks, goal),
  node: { ...o, files: join(o.files ?? {}), edit },
  instructions: `Tap the lines of ${edit} in the right order. It runs as you go.`,
});

/** Levels: Basic for modules 1–6, Intermediate after. */
export const at = (level: Level) => (l: Lesson): Lesson => ({ ...l, level });
