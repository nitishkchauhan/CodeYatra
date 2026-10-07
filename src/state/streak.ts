/** Local calendar day as YYYY-MM-DD. */
export function dayKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + delta));
}

/** Streak after learning on `today`. Same day keeps it, the next day extends it, a gap restarts it. */
export function nextStreak(streak: number, lastActive: string | null, today: string) {
  if (lastActive === today) return { streak, extended: false };
  if (lastActive === addDays(today, -1)) return { streak: streak + 1, extended: true };
  return { streak: 1, extended: true };
}

/** Streak to display: it is broken once a full day has been missed. */
export function visibleStreak(streak: number, lastActive: string | null, today: string) {
  if (lastActive === today || lastActive === addDays(today, -1)) return streak;
  return 0;
}
