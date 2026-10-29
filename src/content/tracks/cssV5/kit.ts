// Builders for the CSS track (Lesson v5). The HTML track's builders, plus the two CSS screens (copy the look,
// resize the screen). Content: project-docs/content-drafts/css-track-v5.md. Tests: lessonV5.test.ts.
import { match } from '../../dsl';
import type { CopyStep, Lesson, MatchStep, PagePreview, ResizeStep, Step, SwipeStep, XrayStep } from '../../types';
import * as K from '../htmlV5/kit';

export { arrange, beforeAfter, bugTask, chat, check, explore, finalProject, live, mcq, pairs, pickCode, place, recap, reveal, steps, swipe, tapbug, toggle } from '../htmlV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'css' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'css',
});

/** X-ray for CSS: tap a part of the page, then name the property (or selector) that styles it. */
export const xray = (page: PagePreview, parts: [string, string, string, string[]][], need?: number): XrayStep => ({
  ...K.xray(page, parts, need),
  title: 'See the CSS behind the page',
  instructions: 'Tap a part of the page, then pick the CSS that makes it look that way.',
});

/** Copy the look: `css` has `{{0}}`, `{{1}}`… and each control is [label, choices (first one shown at the start), answer]. */
export const copy = (title: string, instructions: string, html: string, css: string, controls: [string, string[], string][]): CopyStep => ({
  type: 'copy',
  kicker: 'COPY THE LOOK',
  title,
  instructions,
  html,
  css,
  controls: controls.map(([label, choices, answer]) => ({ label, choices, answer })),
});

/** Match the pairs inside a lesson (the challenge version is `pairs`). */
export const matchUp = (title: string, p: [string, string][], explain: string): MatchStep =>
  match({ kicker: 'MATCH', title, instructions: 'Tap an item on the left, then its partner on the right.', pairs: p, mono: true, explain });

/** True or false inside a lesson (the challenge version is `swipe`). */
export const truth = (cards: [string, boolean, string][]): SwipeStep => ({ ...K.swipe(cards), kicker: 'TRUE OR FALSE' });

/** Resize the screen: the same page at a few widths, so media queries and flexible layouts can be seen working. */
export const resize = (title: string, instructions: string, page: PagePreview, caption?: string, widths = [360, 600, 900, 1200]): ResizeStep => ({
  type: 'resize',
  kicker: 'RESIZE THE SCREEN',
  title,
  instructions,
  page,
  widths,
  caption,
});
