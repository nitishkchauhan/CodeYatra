// Builders for the Next.js track (Lesson v5): live Next.js apps in lesson pages. Lesson code is real Next.js 16
// (App Router) code; pages run it with the teaching copy of Next.js (scripts/next-runtime.js) on the bundled React,
// offline. Topics follow the owner's Next.js flow, checked against the official Next.js docs, in our own words.
// Draft: project-docs/content-drafts/next-v5.md. Every live page is run in tests with its taps (lessonV5.test.ts).
import type { ArrangeStep, Lesson, Level, PagePreview, QuizStep, Step, TapAction, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[], level: Level = 'basic'): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'next', level });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], o: { kind?: Lesson['kind']; level?: Level } = {}): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, o.kind ?? 'lesson'),
  skill: 'next',
  level: o.level ?? 'basic',
});

const jsx = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'jsx' } : q);

/** A quick check (first option right), with JSX highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => jsx(K.check(prompt, options, right, wrong, o));

/** Challenge task 3 (first option right). */
export const pickCode = K.pickCode;

/** A clean look for the lesson apps (Rosa’s Café and Sutton Classes). */
export const UI = `.cy-body { color: #2B2118; }
h1 { font-size: 22px; margin: 6px 0; } h2 { font-size: 18px; margin: 6px 0; }
header, nav { display: flex; gap: 10px; align-items: center; padding: 6px 0 8px; border-bottom: 2px solid #CFE8EE; margin-bottom: 8px; font-weight: bold; }
a { color: #0E7490; font-weight: bold; }
button { font: inherit; font-weight: bold; padding: 8px 14px; border: 0; border-radius: 10px; background: #0E7490; color: white; margin: 4px 4px 4px 0; }
button:disabled { background: #94A3B8; }
input, select, textarea { font: inherit; padding: 8px; border: 2px solid #CFE8EE; border-radius: 8px; margin: 4px 0; }
label { display: block; font-weight: bold; margin-top: 6px; }
.card { border: 2px solid #CFE8EE; border-radius: 12px; padding: 10px 12px; margin: 6px 0; background: #F4FBFD; }
.muted { color: #5B6B70; }
.err { color: #B91C1C; }
.ok { color: #15803D; font-weight: bold; }
.pop { border: 2px solid #0E7490; border-radius: 12px; padding: 10px; background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,.15); }
ul { padding-left: 18px; }`;

/** A lesson app’s files, by path. Code is written as lines so lessons stay easy to read. */
export type Files = Record<string, string | string[]>;
const join = (files: Files) => Object.fromEntries(Object.entries(files).map(([k, v]) => [k, Array.isArray(v) ? v.join('\n') : v]));

/** A live Next.js app, opened at `url`. */
export const app = (files: Files, url = '/', css = UI): PagePreview => ({ html: '', css, next: { files: join(files), url } });

/** The taps that type an address in the app’s address bar and open it. */
export const go = (url: string): TapAction[] => [{ type: ['#cy-url', url] }, { submit: '#cy-go' }];

/** Challenge task 5: X-ray the drawn page and name the file or code behind each part. */
export const xray = (html: string, parts: [string, string, string, string[]][], css = UI): XrayStep => ({
  ...K.xray({ html, css }, parts),
  title: 'Which code draws it?',
  instructions: 'Tap a part of the page, then pick the Next.js code behind it.',
});

/** Challenge task 6: put the parts of one file of an app in order; the right order draws the page. */
export const arrange = (blocks: string[], goal: string, files: Files, edit: string, url = '/'): ArrangeStep => ({
  ...K.arrange(blocks, goal),
  css: UI,
  next: { files: join(files), url, edit },
  instructions: `Tap the blocks of ${edit} in the right order. The app updates as you go.`,
});
