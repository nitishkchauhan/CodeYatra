// Spaced review of finished modules: a simple Leitner schedule, saved with the learner's progress.
// Remembering a module moves it to a longer gap; forgetting brings it back tomorrow.
// It is a plain rule, not a personalised model, and the app says so.

export type ReviewCard = { box: number; due: string };

/** Days until the next review for each box (0 = just learned or forgotten). */
export const INTERVALS = [1, 3, 7, 14, 30] as const;

const addDays = (day: string, n: number) => {
  const [y, m, d] = day.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return t.toISOString().slice(0, 10);
};

/** The first review, the day after a module is finished. */
export const firstReview = (today: string): ReviewCard => ({ box: 0, due: addDays(today, INTERVALS[0]) });

/** Applies one answer: remembered moves up a box (max 4), forgot goes back to box 0. */
export function rateCard(card: ReviewCard | undefined, remembered: boolean, today: string): ReviewCard {
  const box = remembered ? Math.min((card?.box ?? -1) + 1, INTERVALS.length - 1) : 0;
  return { box, due: addDays(today, INTERVALS[box]) };
}

/**
 * Modules due today or earlier, most overdue first. Finished modules with no schedule yet
 * (finished before reviews existed) count as due, so nobody's history is skipped.
 */
export function dueToday(finished: string[], cards: Record<string, ReviewCard>, today: string): string[] {
  return finished
    .filter((id) => !cards[id] || cards[id].due <= today)
    .sort((a, b) => (cards[a]?.due ?? '') < (cards[b]?.due ?? '') ? -1 : 1);
}

/** The next day something is due, for "all caught up until …". */
export function nextDue(cards: Record<string, ReviewCard>, today: string): string | null {
  const later = Object.values(cards)
    .map((c) => c.due)
    .filter((d) => d > today)
    .sort();
  return later[0] ?? null;
}

/** Merging two phones: keep the more recent schedule (the later due day) for each module. */
export function mergeReviews(a: Record<string, ReviewCard>, b: Record<string, ReviewCard>): Record<string, ReviewCard> {
  const out = { ...b };
  for (const [id, card] of Object.entries(a)) if (!out[id] || card.due > out[id].due) out[id] = card;
  return out;
}
