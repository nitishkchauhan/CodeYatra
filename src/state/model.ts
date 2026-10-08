// The learner's saved state, and the pure rules that change it.
import { addDays } from './streak';

export type LearnerLevel = 'school' | 'college' | 'curious';

export type Completion = { xp: number; accuracy: number; at: string };
/** verifyId is set once the certificate is registered online, so anyone can verify it. */
export type Certificate = { stageId: string; name: string; date: string; verifyId?: string };

export type Progress = {
  version: 1;
  onboarded: boolean;
  name: string;
  level: LearnerLevel;
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
  /** Photo on this device (file or data URI). Never synced: other devices use avatarUrl. */
  avatar: string | null;
  /** Public URL of the uploaded photo, when signed in. */
  avatarUrl: string | null;
  avatarColor: string;
  bio: string;
  /** Steps answered wrong, as "lessonId#stepIndex" → day. Cleared when reviewed correctly. */
  mistakes: Record<string, string>;
  /** Invite rewards already given for friends who joined with your code. */
  referralsCredited: number;
  /** Whether this learner has redeemed a friend's code (one per account). */
  referred: boolean;
  /** Anonymous crash reports and usage events. */
  telemetry: boolean;
  reminder: { enabled: boolean; hour: number; minute: number };
  /** Milliseconds; the newer side wins settings when merging phone and cloud copies. */
  updatedAt: number;
};

export const INITIAL: Progress = {
  version: 1,
  onboarded: false,
  name: '',
  level: 'school',
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
  avatar: null,
  avatarUrl: null,
  avatarColor: '#1F1B83',
  bio: '',
  mistakes: {},
  referralsCredited: 0,
  referred: false,
  telemetry: true,
  reminder: { enabled: false, hour: 19, minute: 0 },
  updatedAt: 0,
};

/** Fills fields added in newer app versions when loading older saves. */
export function normalize(raw: Partial<Progress> | null | undefined): Progress {
  const p: Progress = { ...INITIAL, ...(raw ?? {}), reminder: { ...INITIAL.reminder, ...(raw?.reminder ?? {}) } };
  // v1 had four broad stages; they became language tracks.
  return { ...p, stageId: LEGACY_STAGES[p.stageId] ?? p.stageId };
}

/** Lessons that count toward progress: daily challenges and reviews are extra practice. */
export const countsAsLesson = (id: string) => !id.startsWith('daily-') && id !== 'review';

const LEGACY_STAGES: Record<string, string> = { web: 'html', fullstack: 'react' };

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
    completed[id] = r ? { xp: Math.max(r.xp, c.xp), accuracy: Math.max(r.accuracy, c.accuracy), at: r.at < c.at ? r.at : c.at } : c;
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
    // Keep whichever copy of a certificate has its online verification id.
    certificates: Object.fromEntries(
      [...new Set([...Object.keys(remote.certificates), ...Object.keys(local.certificates)])].map((k) => {
        const l = local.certificates[k];
        const r = remote.certificates[k];
        return [k, l && r ? { ...r, ...l, verifyId: l.verifyId ?? r.verifyId } : (l ?? r)];
      }),
    ),
    inventory: [...new Set([...remote.inventory, ...local.inventory])],
    mistakes: { ...remote.mistakes, ...local.mistakes },
    referralsCredited: Math.max(local.referralsCredited, remote.referralsCredited),
    referred: local.referred || remote.referred,
    avatar: local.avatar,
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
