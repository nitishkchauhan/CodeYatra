// What to revise, from evidence only: saved wrong answers and checkpoints not yet passed.
import type { CheckpointResult } from './checkpoints';

export type RevisionItem = { lessonId: string; reason: string };

/** The module a saved mistake belongs to ("drill-p-var-1#2" and "p-var-1#7" both mean p-var-1). */
const moduleOf = (key: string) => key.split('#')[0].replace(/^drill-/, '');

/** Modules to revise, the ones with the most evidence first. Daily challenges and reviews point back to their source lessons. */
export function revisionModules(mistakes: Record<string, string>, checkpoints: Record<string, Pick<CheckpointResult, 'pass' | 'weak'>>): RevisionItem[] {
  const wrong = new Map<string, number>();
  for (const key of Object.keys(mistakes)) {
    const m = moduleOf(key);
    if (m.startsWith('daily-') || m.startsWith('check-') || m === 'review') continue;
    wrong.set(m, (wrong.get(m) ?? 0) + 1);
  }
  const failed = new Set(Object.values(checkpoints).flatMap((c) => (c.pass ? [] : c.weak)));
  const ids = [...new Set([...wrong.keys(), ...failed])];
  return ids
    .map((id) => {
      const n = wrong.get(id) ?? 0;
      const parts = [n ? `${n} wrong ${n === 1 ? 'answer' : 'answers'} saved` : '', failed.has(id) ? 'missed in a checkpoint' : ''].filter(Boolean);
      return { lessonId: id, reason: parts.join(' · '), weight: n + (failed.has(id) ? 2 : 0) };
    })
    .sort((a, b) => b.weight - a.weight)
    .map(({ lessonId, reason }) => ({ lessonId, reason }));
}
