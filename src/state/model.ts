// The learner's saved state, and the pure rules that change it.
import { addDays } from './streak';

export type LearnerLevel = 'school' | 'college' | 'curious';
export type UiLang = 'en' | 'hi';

export type Completion = { xp: number; accuracy: number; at: string };
export type Certificate = { stageId: string; name: string; date: string };

export type Progress = {
  version: 1;
  onboarded: boolean;
  name: string;
  level: LearnerLevel;
  lang: UiLang;
  haptics: boolean;
  stageId: string;
  xp: number;
  coins: number;
  streak: number;
  lastActive: string | null;
  streakFreezes: number;
  dailyXp: Record<string, number>;
  completed: Record<string, Completion>;
  certificates: Record<string, Certificate>;
  inventory: string[];
  outfit: string | null;
  reminder: { enabled: boolean; hour: number; minute: number };
  /** Milliseconds; the newer side wins settings when merging phone and cloud copies. */
  updatedAt: number;
};

export const INITIAL: Progress = {
  version: 1,
  onboarded: false,
  name: '',
  level: 'school',
  lang: 'en',
  haptics: true,
  stageId: 'foundations',
  xp: 0,
  coins: 0,
  streak: 0,
  lastActive: null,
  streakFreezes: 0,
  dailyXp: {},
  completed: {},
  certificates: {},
  inventory: [],
  outfit: null,
  reminder: { enabled: false, hour: 19, minute: 0 },
  updatedAt: 0,
};

/** Fills fields added in newer app versions when loading older saves. */
export function normalize(raw: Partial<Progress> | null | undefined): Progress {
  return { ...INITIAL, ...(raw ?? {}), reminder: { ...INITIAL.reminder, ...(raw?.reminder ?? {}) } };
}

/**
 * Combines the phone's copy with the cloud copy without losing anything:
 * lessons and items are unioned, per-day XP takes the higher value, the more
 * recent streak wins, and the newer copy decides settings and spendables.
 */
export function mergeProgress(local: Progress, remote: Progress): Progress {
  const newer = remote.updatedAt > local.updatedAt ? remote : local;

  const completed: Record<string, Completion> = { ...remote.completed };
  for (const [id, c] of Object.entries(local.completed)) {
    const r = completed[id];
    completed[id] = r
      ? { xp: Math.max(r.xp, c.xp), accuracy: Math.max(r.accuracy, c.accuracy), at: r.at < c.at ? r.at : c.at }
      : c;
  }

  const dailyXp: Record<string, number> = { ...remote.dailyXp };
  for (const [day, xp] of Object.entries(local.dailyXp)) dailyXp[day] = Math.max(dailyXp[day] ?? 0, xp);

  const streakSide =
    (local.lastActive ?? '') > (remote.lastActive ?? '')
      ? local
      : (remote.lastActive ?? '') > (local.lastActive ?? '')
        ? remote
        : local.streak >= remote.streak
          ? local
          : remote;

  return {
    ...newer,
    onboarded: local.onboarded || remote.onboarded,
    name: newer.name || local.name || remote.name,
    xp: Math.max(local.xp, remote.xp),
    streak: streakSide.streak,
    lastActive: streakSide.lastActive,
    dailyXp,
    completed,
    certificates: { ...remote.certificates, ...local.certificates },
    inventory: [...new Set([...remote.inventory, ...local.inventory])],
    updatedAt: Math.max(local.updatedAt, remote.updatedAt),
  };
}

/**
 * Spends streak freezes to cover missed days, so a learner who was away one
 * or two days keeps their streak if they had freezes saved up.
 */
export function applyStreakFreezes(p: Progress, today: string): Progress {
  if (!p.lastActive || p.streak === 0) return p;
  let missed = 0;
  let day = addDays(p.lastActive, 1);
  while (day < today && missed <= p.streakFreezes) {
    missed++;
    day = addDays(day, 1);
  }
  if (missed === 0 || missed > p.streakFreezes) return p;
  return { ...p, lastActive: addDays(today, -1), streakFreezes: p.streakFreezes - missed };
}

/** Monday of the week containing `day`, as YYYY-MM-DD. */
export function weekStart(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  const weekday = (new Date(y, m - 1, d).getDay() + 6) % 7;
  return addDays(day, -weekday);
}

export function weekXp(p: Progress, today: string): number {
  const start = weekStart(today);
  return Object.entries(p.dailyXp).reduce((sum, [day, xp]) => (day >= start && day <= today ? sum + xp : sum), 0);
}
