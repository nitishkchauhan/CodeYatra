// Builders for the React track (Lesson v5): the web screens with live React pages. Lesson code is real React 19
// (JSX, hooks, imports from "react"); pages run it with the bundled React (lib/web/reactRuntime.ts), offline.
// Topics follow the official React docs (react.dev) and W3Schools’ React tutorial as a checklist, in our own words.
// Draft: project-docs/content-drafts/react-v5.md. Every live page is run in tests with its taps (lessonV5.test.ts).
import type { ArrangeStep, Lesson, Level, PagePreview, QuizStep, Step, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[], level: Level = 'basic'): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'react', level });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], o: { kind?: Lesson['kind']; level?: Level } = {}): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, o.kind ?? 'lesson'),
  skill: 'react',
  level: o.level ?? 'basic',
});

const jsx = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'jsx' } : q);

/** A quick check (first option right), with JSX highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => jsx(K.check(prompt, options, right, wrong, o));

/** Challenge task 3 (first option right). */
export const pickCode = K.pickCode;

/** A clean look for Rosa’s Café React pages. */
export const UI = `body { font-family: system-ui, sans-serif; margin: 14px; color: #2B2118; }
button { font: inherit; font-weight: bold; padding: 8px 14px; border: 0; border-radius: 10px; background: #0E7490; color: white; margin: 4px 4px 4px 0; }
input, select { font: inherit; padding: 8px; border: 2px solid #CFE8EE; border-radius: 8px; margin: 4px 0; }
label { display: block; font-weight: bold; margin-top: 6px; }
.card { border: 2px solid #CFE8EE; border-radius: 12px; padding: 10px 12px; margin: 6px 0; background: #F4FBFD; }
.card h3 { margin: 0 0 4px; font-size: 17px; }
.muted { color: #5B6B70; }
.err { color: #B91C1C; }
.ok { color: #15803D; font-weight: bold; }
ul { padding-left: 18px; }`;

/** A live React page: `code` is the program (App is drawn in #root unless it renders itself). */
export const app = (code: string, css = UI): PagePreview => ({ html: '<div id="root"></div>', css, js: code, react: true });

/** Challenge task 5 for React: X-ray the drawn page and name the component, prop or state behind each part. */
export const xray = (html: string, parts: [string, string, string, string[]][], css = UI): XrayStep => ({
  ...K.xray({ html, css }, parts),
  title: 'Which code draws it?',
  instructions: 'Tap a part of the page, then pick the React code behind it.',
});

/** Challenge task 6 for React: put whole parts of a component in order; the right order draws the page. */
export const arrange = (blocks: string[], goal: string): ArrangeStep => ({ ...K.arrange(blocks, goal), react: true, instructions: 'Tap the blocks in the right order. The page draws itself as you go.' });
