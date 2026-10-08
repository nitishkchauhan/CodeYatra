import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { getLesson, STAGES } from '@/content';
import { coinsFor, STREAK_FREEZE, type OutfitId } from '@/content/shop';
import { setHapticsEnabled } from '@/lib/haptics';
import { applyStreakFreezes, INITIAL, normalize, type Certificate, type LearnerLevel, type Progress } from './model';
import { dayKey, nextStreak, visibleStreak } from './streak';

export type { LearnerLevel, Progress } from './model';

const STORAGE_KEY = 'codeyatra/progress/v1';
export const DAILY_GOAL = 20;
export const BIO_MAX = 80;

const RECOMMENDED_STAGE: Record<LearnerLevel, string> = {
  school: 'foundations',
  college: 'html',
  curious: 'foundations',
};

export type LessonResult = { streak: number; extended: boolean; coins: number; certificate: Certificate | null };

type ProgressApi = {
  state: Progress;
  hydrated: boolean;
  today: string;
  todayXp: number;
  streak: number;
  recommendedStageId: string;
  finishOnboarding: (input: { name: string; level: LearnerLevel }) => void;
  completeLesson: (lessonId: string, xp: number, accuracy: number, reviewed?: string[]) => LessonResult;
  recordMistake: (key: string) => void;
  setLevel: (level: LearnerLevel) => void;
  setHaptics: (on: boolean) => void;
  setStage: (stageId: string) => void;
  setName: (name: string) => void;
  setProfile: (profile: Partial<Pick<Progress, 'name' | 'bio' | 'avatar' | 'avatarUrl' | 'avatarColor'>>) => void;
  setReminder: (reminder: Progress['reminder']) => void;
  buyOutfit: (id: OutfitId, price: number) => boolean;
  equipOutfit: (id: OutfitId | null) => void;
  buyStreakFreeze: () => boolean;
  /** Replaces everything, e.g. after merging with the cloud copy. */
  replace: (next: Progress) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);

/** Stages whose written lessons are all complete. */
function finishedStageId(lessonId: string, completed: Progress['completed']): string | null {
  const stage = STAGES.find((s) => s.units.some((u) => u.lessons.some((l) => l.id === lessonId)));
  if (!stage) return null;
  const written = stage.units.flatMap((u) => u.lessons).filter((l) => getLesson(l.id));
  return written.every((l) => completed[l.id]) ? stage.id : null;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Progress>(INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const today = dayKey(new Date());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setState(applyStreakFreezes(normalize(JSON.parse(raw) as Partial<Progress>), dayKey(new Date())));
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, hydrated]);

  useEffect(() => {
    setHapticsEnabled(state.haptics);
  }, [state.haptics]);

  /** Applies a change and stamps it so the newest copy wins when syncing. */
  const update = (fn: (s: Progress) => Progress) => setState((s) => ({ ...fn(s), updatedAt: Date.now() }));

  const api: ProgressApi = {
    state,
    hydrated,
    today,
    todayXp: state.dailyXp[today] ?? 0,
    streak: visibleStreak(state.streak, state.lastActive, today),
    recommendedStageId: RECOMMENDED_STAGE[state.level],
    finishOnboarding: ({ name, level }) => update((s) => ({ ...s, onboarded: true, name: name.trim(), level, stageId: RECOMMENDED_STAGE[level] })),
    completeLesson: (lessonId, xp, accuracy, reviewed = []) => {
      const lesson = getLesson(lessonId);
      const streakResult = nextStreak(state.streak, state.lastActive, today);
      const coins = coinsFor(lesson?.kind ?? 'lesson', accuracy === 100);
      const prev = state.completed[lessonId];
      const completed = {
        ...state.completed,
        [lessonId]: { xp: (prev?.xp ?? 0) + xp, accuracy: Math.max(prev?.accuracy ?? 0, accuracy), at: prev?.at ?? today },
      };
      const stageId = finishedStageId(lessonId, completed);
      const certificate: Certificate | null = stageId && !state.certificates[stageId] ? { stageId, name: state.name || 'Explorer', date: today } : null;

      update((s) => ({
        ...s,
        xp: s.xp + xp,
        coins: s.coins + coins,
        streak: streakResult.streak,
        lastActive: today,
        dailyXp: { ...s.dailyXp, [today]: (s.dailyXp[today] ?? 0) + xp },
        // A review is extra practice: it isn't stored as a lesson, it clears the mistakes it fixed.
        completed: lessonId === 'review' ? s.completed : { ...s.completed, [lessonId]: completed[lessonId] },
        mistakes: reviewed.length ? Object.fromEntries(Object.entries(s.mistakes).filter(([k]) => !reviewed.includes(k))) : s.mistakes,
        certificates: certificate ? { ...s.certificates, [certificate.stageId]: certificate } : s.certificates,
      }));
      return { ...streakResult, coins, certificate };
    },
    recordMistake: (key) => update((s) => ({ ...s, mistakes: { ...s.mistakes, [key]: today } })),
    setLevel: (level) => update((s) => ({ ...s, level })),
    setHaptics: (on) => update((s) => ({ ...s, haptics: on })),
    setStage: (stageId) => update((s) => ({ ...s, stageId })),
    setName: (name) => update((s) => ({ ...s, name: name.trim().slice(0, 24) })),
    setProfile: (profile) =>
      update((s) => ({
        ...s,
        ...profile,
        name: profile.name !== undefined ? profile.name.trim().slice(0, 24) : s.name,
        bio: profile.bio !== undefined ? profile.bio.trim().slice(0, BIO_MAX) : s.bio,
      })),
    setReminder: (reminder) => update((s) => ({ ...s, reminder })),
    buyOutfit: (id, price) => {
      if (state.coins < price || state.inventory.includes(id)) return false;
      update((s) => ({ ...s, coins: s.coins - price, inventory: [...s.inventory, id], outfit: id }));
      return true;
    },
    equipOutfit: (id) => update((s) => ({ ...s, outfit: id })),
    buyStreakFreeze: () => {
      if (state.coins < STREAK_FREEZE.price || state.streakFreezes >= STREAK_FREEZE.max) return false;
      update((s) => ({ ...s, coins: s.coins - STREAK_FREEZE.price, streakFreezes: s.streakFreezes + 1 }));
      return true;
    },
    replace: (next) => setState(next),
    reset: () => setState({ ...INITIAL, updatedAt: Date.now() }),
  };

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
