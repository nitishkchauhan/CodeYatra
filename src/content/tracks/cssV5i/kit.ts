// Builders for CSS Intermediate (Lesson v5): the CSS Basic builders with lessons marked intermediate, plus “At work”
// messages from the Brightline Studio team. Draft: project-docs/content-drafts/web-intermediate-v5.md.
import type { Lesson, Step } from '../../types';
import * as K from '../cssV5/kit';

export { arrange, beforeAfter, bugTask, chat, check, copy, explore, finalProject, live, matchUp, mcq, pairs, pickCode, place, recap, resize, reveal, swipe, tapbug, toggle, truth, xray } from '../cssV5/kit';
export { atWork } from '../htmlV5i/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), level: 'intermediate' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  level: 'intermediate',
});

/** Cards for layout demos: n boxes with short labels. */
export const cards = (n: number, label = 'Project') => `<div class="grid">${Array.from({ length: n }, (_, i) => `<div class="c">${label} ${i + 1}</div>`).join('')}</div>`;
