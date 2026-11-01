// Builders for the Git track (Lesson v5): Git runs live in a terminal page, a teaching copy of Git
// (scripts/git-runtime.js) checked against real Git’s output. Learners tap ready-made commands or type their own.
// Topics follow W3Schools’ Git tutorial as a checklist, in our own words. Every terminal is run in tests.
import type { ArrangeStep, GitApp, Lesson, PagePreview, QuizStep, Step, TapAction, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'git' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'git',
});

const bash = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'bash' } : q);

/** A quick check (first option right), with shell highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => bash(K.check(prompt, options, right, wrong, o));

export const pickCode = K.pickCode;

/** A Git terminal: `commands` become buttons (#cy-c0, #cy-c1…); `before` already ran when it opens. */
export const term = (o: GitApp): PagePreview => ({ html: '', git: o });

/** The tap that runs ready-made command n. */
export const press = (n: number): TapAction => ({ click: `#cy-c${n}` });

/** A café folder with a first commit: menu.txt. */
export const CAFE_REPO: GitApp['repo'] = { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea\nCheese Toast\n' }]] };

/** Challenge task 5: X-ray a terminal and name the command behind each line. */
const TERM_CSS = 'body{margin:0;background:#0F1222}.t{font:13px/1.6 ui-monospace,monospace;color:#E6E8F2;padding:10px 12px;white-space:pre-wrap}.c{color:#7EE0B5}.e{color:#FF8A9B}.y{color:#FFD58A}';
export const xray = (html: string, parts: [string, string, string, string[]][]): XrayStep => ({
  ...K.xray({ html: `<div class="t">${html}</div>`, css: TERM_CSS }, parts),
  title: 'Which command did that?',
  instructions: 'Tap a line in the terminal, then pick the command behind it.',
});

/** Challenge task 6: put commands in order; they run in the terminal as you place them. */
export const arrange = (blocks: string[], goal: string, start: GitApp = {}): ArrangeStep => ({
  ...K.arrange(blocks, goal),
  git: start,
  instructions: 'Tap the commands in the right order. They run as you go.',
});
