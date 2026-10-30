// Builders for HTML Intermediate (Lesson v5): the HTML Basic builders, with lessons marked intermediate, plus a
// short “At work” chat from the Brightline Studio team. Draft: project-docs/content-drafts/web-intermediate-v5.md.
import type { ChatStep, Lesson, Step } from '../../types';
import * as K from '../htmlV5/kit';

export { arrange, beforeAfter, bugTask, check, explore, finalProject, live, mcq, pairs, pickCode, place, recap, reveal, steps, swipe, tapbug, toggle, xray } from '../htmlV5/kit';
export { matchUp, resize, truth } from '../cssV5/kit';
export { tapPage } from '../jsV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), level: 'intermediate' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  level: 'intermediate',
});

export const chat = K.chat;

/** A message from a teammate at Brightline Studio, with the task it sets. */
export const atWork = (from: 'Megan' | 'Arden' | 'Felix', lines: string[]): ChatStep => ({
  ...K.chat(lines.map((l, i) => (i === 0 ? `${from}: ${l}` : l))),
  kicker: 'AT WORK',
});
