// Builders for the compiled tracks in Lesson v5 (C and Java). The app can’t compile C or Java on a phone, so code
// screens show the real output stored with the lesson: switch-between views, arrange (the output appears once the
// order is right) and X-ray of a terminal. Tests compile and run every program (gcc, Java) and compare.
// Topics follow W3Schools’ C and Java tutorials as a checklist, in our own words.
import type { ArrangeStep, Lesson, QuizStep, SkillKey, Step, ToggleStep, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';
import * as J from '../jsV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';

/** Builders for one compiled track (skill c or java). */
export const track = (skill: Extract<SkillKey, 'c' | 'java' | 'placement'>, lang: 'c' | 'java') => {
  const tag = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang } : q);
  return {
    lesson: (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill }),
    challenge: (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({ ...K.challenge(id, title, badge, learned, s, kind), skill }),
    /** A quick check (first option right), with code highlighting. */
    check: (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => tag(K.check(prompt, options, right, wrong, o)),
    pickCode: K.pickCode,
  };
};

/** Switch between versions of a program; each view shows its real output (`out`, checked by compiling it in tests). */
export const compare = (title: string, views: [label: string, code: string[], caption: string, out: string[]][], intro?: string): ToggleStep => J.toggleRun(title, views, intro);

/** Challenge task 6: put a program’s lines in order; when the order is right its output (`expect`) is shown. */
export const arrange = (blocks: string[], goal: string, expect: string[]): ArrangeStep => ({ ...J.arrange(blocks, goal, expect), instructions: 'Tap the lines in the right order. Its output appears when the program is complete.' });

/** Challenge task 5: X-ray a terminal and name the code behind each line. */
const TERM_CSS = 'body{margin:0;background:#0F1222}.t{font:13px/1.6 ui-monospace,monospace;color:#E6E8F2;padding:10px 12px;white-space:pre-wrap}.c{color:#7EE0B5}.e{color:#FF8A9B}';
export const xray = (html: string, parts: [string, string, string, string[]][]): XrayStep => ({
  ...K.xray({ html: `<div class="t">${html}</div>`, css: TERM_CSS }, parts),
  title: 'Which code printed that?',
  instructions: 'Tap a line of output, then pick the code behind it.',
});

/** Splits a list of lessons into modules: each module ends with its Challenge. */
export { modules, type Module } from '../dsaV5/kit';
