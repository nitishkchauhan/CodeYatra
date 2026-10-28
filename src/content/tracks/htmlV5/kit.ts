// Builders for the HTML track (Lesson v5): short phone screens, each with one thing to do.
// Content: project-docs/content-drafts/html-track-v5.md. The tests check every screen (lessonV5.test.ts).
import { match, order, quiz } from '../../dsl';
import type {
  ArrangeStep,
  ChatStep,
  ExploreStep,
  Lesson,
  LiveStep,
  MatchStep,
  OrderStep,
  PagePreview,
  PlaceStep,
  QuizStep,
  RecapStep,
  RevealStep,
  Seg,
  Step,
  SwipeStep,
  TapBugStep,
  ToggleStep,
  WebStep,
  XrayStep,
} from '../../types';

export const lesson = (id: string, title: string, minutes: number, steps: Step[]): Lesson => {
  const recap = steps.find((s): s is RecapStep => s.type === 'recap');
  return { id, title, kind: 'lesson', format: 'v5', level: 'basic', minutes, skill: 'html', learned: (recap?.points ?? []).slice(0, 3).map((p) => p.text), steps };
};

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], steps: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  id,
  title,
  kind,
  format: 'v5',
  level: 'basic',
  minutes: 8,
  skill: 'html',
  learned,
  badge,
  steps,
});

export const chat = (lines: string[], o: { button?: string; code?: string[]; page?: PagePreview } = {}): ChatStep => ({ type: 'chat', kicker: 'YATRI', lines, ...o });

export const reveal = (title: string, items: [string, string, string?][], o: { intro?: string; code?: string[]; mono?: boolean; kicker?: string } = {}): RevealStep => ({
  type: 'reveal',
  kicker: o.kicker ?? 'TAP TO REVEAL',
  title,
  intro: o.intro ?? 'Tap each card to flip it.',
  code: o.code,
  items: items.map(([front, back, icon]) => ({ front, back, icon, mono: o.mono })),
});

export const explore = (title: string, code: string[], notes: [number, string, string?][], o: { intro?: string; page?: PagePreview; minTaps?: number } = {}): ExploreStep => ({
  type: 'explore',
  kicker: 'EXPLORE',
  title,
  intro: o.intro,
  code,
  page: o.page,
  notes: notes.map(([line, text, select]) => ({ line, text, select })),
  minTaps: o.minTaps,
});

export const place = (title: string, instructions: string, lines: Seg[][], pieces: string[], answer: string[], revealText: string, o: { css?: string; preview?: boolean } = {}): PlaceStep => ({
  type: 'place',
  kicker: 'TRY IT',
  title,
  instructions,
  lines,
  pieces,
  answer,
  reveal: revealText,
  ...o,
});

export const toggle = (title: string, views: [string, string[], string, PagePreview?][], intro?: string, kicker = 'SWITCH AND SEE'): ToggleStep => ({
  type: 'toggle',
  kicker,
  title,
  intro,
  views: views.map(([label, code, caption, page]) => ({ label, code, caption, page })),
});

export const beforeAfter = (title: string, before: [string[], string, PagePreview?], after: [string[], string, PagePreview?], intro?: string, labels: [string, string] = ['Before', 'After']): ToggleStep =>
  toggle(title, [[labels[0], ...before], [labels[1], ...after]], intro, 'BEFORE / AFTER');

export const live = (title: string, instructions: string, code: string[], choices: string[], o: { css?: string; free?: boolean; caption?: string } = {}): LiveStep => ({
  type: 'live',
  kicker: 'LIVE EDIT',
  title,
  instructions,
  code,
  choices,
  ...o,
});

/** A quick check: the first option is the right one (the app shuffles them). */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => ({
  ...quiz({ prompt, options, right, wrong, mono: o.mono ?? true, lang: o.code ? 'html' : undefined, code: o.code }),
  kicker: o.kicker ?? 'QUICK CHECK',
});

export const tapbug = (title: string, code: string[], bugs: [number, string, string][], explain: string, instructions?: string): TapBugStep => ({
  type: 'tapbug',
  kicker: 'TAP THE BUG',
  title,
  instructions,
  code,
  bugs: bugs.map(([line, text, fix]) => ({ line, text, fix })),
  explain,
});

export const recap = (points: [string, string][]): RecapStep => ({ type: 'recap', points: points.map(([icon, text]) => ({ icon, text })) });

export const steps = (title: string, lines: string[], explain: string): OrderStep => order({ kicker: 'PUT IN ORDER', title, instructions: 'Tap the cards in the right order.', lang: 'html', lines, explain });

// ── Module Challenge pieces ──────────────────────────────────────────────────

export const mcq = (n: number, prompt: string, options: [string, ...string[]], why: string, o: { mono?: boolean } = {}): QuizStep => ({
  ...quiz({ prompt, options, right: why, wrong: `Not quite. ${why}`, mono: o.mono ?? false }),
  kicker: `PART A · QUESTION ${n} OF 5`,
});

export const swipe = (cards: [string, boolean, string][]): SwipeStep => ({ type: 'swipe', kicker: 'TASK 1 OF 6 · TRUE OR FALSE', title: 'True or false?', cards: cards.map(([text, answer, why]) => ({ text, answer, why })) });

export const pairs = (p: [string, string][], explain: string): MatchStep => match({ kicker: 'TASK 2 OF 6 · MATCH', title: 'Match the pairs', instructions: 'Tap an item on the left, then its partner on the right.', pairs: p, mono: true, explain });

export const pickCode = (prompt: string, options: [string, ...string[]], why: string): QuizStep => ({ ...quiz({ prompt, options, right: why, wrong: `Not quite. ${why}`, mono: true }), kicker: 'TASK 3 OF 6 · TAP THE CORRECT CODE' });

export const bugTask = (code: string[], bugs: [number, string, string][], explain: string): TapBugStep => ({ ...tapbug('Find every mistake', code, bugs, explain), kicker: 'TASK 4 OF 6 · TAP THE BUG' });

export const xray = (page: PagePreview, parts: [string, string, string, string[]][], need?: number): XrayStep => ({
  type: 'xray',
  kicker: 'TASK 5 OF 6 · X-RAY VISION',
  title: 'See the tags behind the page',
  instructions: 'Tap a part of the page, then pick the tag behind it.',
  page,
  parts: parts.map(([select, label, answer, options]) => ({ select, label, answer, options })),
  need,
});

export const arrange = (blocks: string[], goal: string, css?: string): ArrangeStep => ({ type: 'arrange', kicker: 'TASK 6 OF 6 · ARRANGE THE BLOCKS', title: 'Build it', instructions: 'Tap the blocks in the right order. The page updates as you go.', blocks, goal, css });

export const finalProject = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'FINAL PROJECT', ...o });

/** A placeholder picture from placehold.co (needs the internet, like any web image). */
export const pic = (w: number, h: number, text: string) => `https://placehold.co/${w}x${h}/png?text=${encodeURIComponent(text)}`;
