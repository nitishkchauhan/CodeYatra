import AsyncStorage from '@react-native-async-storage/async-storage';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { dueToday, firstReview, INTERVALS, mergeReviews, nextDue, rateCard } from '@/content/review';
import { INITIAL, mergeProgress, type Progress } from '../model';
import { ProgressProvider, useProgress } from '../progress';

jest.mock('@/lib/telemetry', () => ({ setTelemetryEnabled: () => {}, track: () => {}, reportError: () => {} }));

const KEY = 'codeyatra/progress/v1';
const wrapper = ({ children }: { children: ReactNode }) => <ProgressProvider>{children}</ProgressProvider>;
const day = '2026-10-18';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('review schedule', () => {
  it('starts the day after a module is finished', () => {
    expect(firstReview(day)).toEqual({ box: 0, due: '2026-10-19' });
  });

  it('moves up a box when remembered and back to the start when forgotten', () => {
    let card = firstReview(day);
    card = rateCard(card, true, day);
    expect(card).toEqual({ box: 1, due: '2026-10-21' }); // 3 days
    card = rateCard(card, true, day);
    expect(card.due).toBe('2026-10-25'); // 7 days
    for (let i = 0; i < 5; i++) card = rateCard(card, true, day);
    expect(card.box).toBe(INTERVALS.length - 1); // stays at the longest gap
    expect(card.due).toBe('2026-11-17'); // 30 days
    expect(rateCard(card, false, day)).toEqual({ box: 0, due: '2026-10-19' });
  });

  it('lists what is due, counting finished modules with no schedule yet', () => {
    const cards = { a: { box: 1, due: '2026-10-17' }, b: { box: 2, due: '2026-10-25' } };
    expect(dueToday(['a', 'b', 'c'], cards, day)).toEqual(['c', 'a']);
    expect(nextDue(cards, day)).toBe('2026-10-25');
  });

  it('keeps the more recent schedule when two phones merge', () => {
    expect(mergeReviews({ a: { box: 2, due: '2026-10-25' } }, { a: { box: 0, due: '2026-10-19' }, b: { box: 0, due: '2026-10-20' } })).toEqual({
      a: { box: 2, due: '2026-10-25' },
      b: { box: 0, due: '2026-10-20' },
    });
    const merged = mergeProgress({ ...INITIAL, reviews: { a: { box: 1, due: '2026-10-21' } } }, { ...INITIAL, reviews: {} });
    expect(merged.reviews.a.box).toBe(1);
  });
});

describe('progress keeps the schedule', () => {
  it('schedules a module once when it is first finished, and saves review answers', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...INITIAL, onboarded: true, name: 'Asha' }));
    const hook = await renderHook(() => useProgress(), { wrapper });
    await waitFor(() => expect(hook.result.current.hydrated).toBe(true));
    await act(async () => {
      hook.result.current.completeLesson({ lessonId: 'p-var-1', kind: 'lesson', mistakes: 0, claimId: 'c1' });
    });
    const scheduled = hook.result.current.state.reviews['p-var-1'];
    expect(scheduled.box).toBe(0);
    // Practice and daily challenges don't join the schedule.
    await act(async () => {
      hook.result.current.completeLesson({ lessonId: 'drill-p-var-1', kind: 'practice', mistakes: 0, claimId: 'c2' });
    });
    expect(hook.result.current.state.reviews['drill-p-var-1']).toBeUndefined();
    await act(async () => {
      hook.result.current.rateReview('p-var-1', true);
    });
    expect(hook.result.current.state.reviews['p-var-1'].box).toBe(1);
    await waitFor(async () => expect((JSON.parse((await AsyncStorage.getItem(KEY)) ?? '{}') as Progress).reviews['p-var-1'].box).toBe(1));
  });
});
