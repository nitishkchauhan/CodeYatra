// Builders for JavaScript Intermediate (Lesson v5): the JavaScript Basic builders with lessons marked intermediate,
// plus “At work” messages from the Brightline Studio team. Draft: project-docs/content-drafts/web-intermediate-v5.md.
// Every program and live page is run in tests (lessonV5.test.ts, lessonV3.test.ts), so each answer is what really happens.
import type { Lesson, Step } from '../../types';
import * as K from '../jsV5/kit';

export { arrange, bugTask, chat, check, explore, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, tapPage, toggle, toggleRun, truth } from '../jsV5/kit';
export { atWork } from '../htmlV5i/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), level: 'intermediate' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  level: 'intermediate',
});

/** A clean look for City Travel Desk’s live pages, with a small “Practice data” tag. */
export const DESK = `body { font-family: system-ui, sans-serif; margin: 14px; color: #0F1E36; }
button { font: inherit; font-weight: bold; padding: 9px 14px; border: 0; border-radius: 10px; background: #1D4ED8; color: white; margin: 4px 4px 4px 0; }
input, select { font: inherit; padding: 8px; border: 2px solid #BFD3F5; border-radius: 8px; margin: 4px 0; }
label { display: block; font-weight: bold; margin-top: 6px; }
ul { padding-left: 18px; }
.tag { display: inline-block; font-size: 11px; background: #FEF3C7; color: #92400E; border-radius: 6px; padding: 2px 6px; }
.muted { color: #52627A; }
.err { color: #B91C1C; }
.ok { color: #15803D; font-weight: bold; }`;

/** The tag every page with practice trains shows, so nobody mistakes them for real ones. */
export const TAG = '<span class="tag">Practice data</span>';
