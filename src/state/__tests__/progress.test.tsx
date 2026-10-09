import AsyncStorage from '@react-native-async-storage/async-storage';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { INITIAL, isReplay, lessonReward, type Progress } from '../model';
import { ProgressProvider, useProgress } from '../progress';

jest.mock('@/lib/telemetry', () => ({ setTelemetryEnabled: () => {}, track: () => {}, reportError: () => {} }));

const KEY = 'codeyatra/progress/v1';
const wrapper = ({ children }: { children: ReactNode }) => <ProgressProvider>{children}</ProgressProvider>;

async function mount(saved?: Partial<Progress>) {
  if (saved) await AsyncStorage.setItem(KEY, JSON.stringify({ ...INITIAL, onboarded: true, name: 'Asha', ...saved }));
  const hook = await renderHook(() => useProgress(), { wrapper });
  await waitFor(() => expect(hook.result.current.hydrated).toBe(true));
  return hook;
}

const stored = async () => JSON.parse((await AsyncStorage.getItem(KEY)) ?? 'null') as Progress;

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('lessonReward', () => {
  it('pays by lesson kind, with a bonus for no mistakes', () => {
    expect(lessonReward('lesson', 0, false)).toEqual({ xp: 30, coins: 15 });
    expect(lessonReward('lesson', 2, false)).toEqual({ xp: 25, coins: 10 });
    expect(lessonReward('practice', 1, false)).toEqual({ xp: 15, coins: 5 });
    expect(lessonReward('project', 0, false)).toEqual({ xp: 65, coins: 35 });
  });

  it('pays a small, coin-free reward for replays so rewards cannot be farmed', () => {
    expect(lessonReward('project', 0, true)).toEqual({ xp: 5, coins: 0 });
  });

  it('never treats daily challenges or mistake reviews as replays', () => {
    const done = { completed: { 'py-1': { xp: 25, accuracy: 100, at: '2026-10-01' }, 'daily-2026-10-01': { xp: 15, accuracy: 100, at: '2026-10-01' } } };
    expect(isReplay(done, 'py-1')).toBe(true);
    expect(isReplay(done, 'py-2')).toBe(false);
    expect(isReplay(done, 'daily-2026-10-01')).toBe(false);
    expect(isReplay(done, 'review')).toBe(false);
  });
});

describe('ProgressProvider', () => {
  it('restores saved progress on launch', async () => {
    const { result } = await mount({ xp: 340, coins: 55, name: 'Asha' });
    expect(result.current.state.xp).toBe(340);
    expect(result.current.state.coins).toBe(55);
    expect(result.current.state.name).toBe('Asha');
  });

  it('awards a lesson once even if Continue is tapped twice', async () => {
    const { result } = await mount({ xp: 100, coins: 20 });
    const completion = { lessonId: 'py-1', kind: 'lesson' as const, mistakes: 0, claimId: 'claim-a' };
    let first, second;
    await act(async () => {
      first = result.current.completeLesson(completion);
    });
    await act(async () => {
      second = result.current.completeLesson(completion);
    });
    expect(second).toBe(first);
    expect(result.current.state.xp).toBe(130);
    expect(result.current.state.coins).toBe(35);
    expect(result.current.state.completed['py-1']).toMatchObject({ xp: 30, accuracy: 100 });
  });

  it('gives only replay XP the second time through a lesson', async () => {
    const { result } = await mount({ xp: 100, coins: 20, completed: { 'py-1': { xp: 30, accuracy: 100, at: '2026-10-01' } } });
    let reward;
    await act(async () => {
      reward = result.current.completeLesson({ lessonId: 'py-1', kind: 'lesson', mistakes: 0, claimId: 'claim-b' });
    });
    expect(reward).toMatchObject({ xp: 5, coins: 0 });
    expect(result.current.state.xp).toBe(105);
    expect(result.current.state.coins).toBe(20);
  });

  it('saves progress after a lesson so it survives an app restart', async () => {
    const { result, unmount } = await mount({ xp: 0 });
    await act(async () => {
      result.current.completeLesson({ lessonId: 'py-1', kind: 'practice', mistakes: 1, claimId: 'claim-c' });
    });
    await waitFor(async () => expect((await stored()).xp).toBe(15));
    await unmount();

    const again = await mount();
    expect(again.result.current.state.xp).toBe(15);
    expect(again.result.current.state.completed['py-1']).toMatchObject({ xp: 15, accuracy: 88 });
  });

  it('records a mock test once per attempt', async () => {
    const { result } = await mount({ xp: 0, coins: 0 });
    const attempt = { kind: 'aptitude', score: 12, total: 20, seconds: 900, topics: { percent: [3, 4] as [number, number] } };
    await act(async () => {
      result.current.finishMock(attempt, 'mock-1');
      result.current.finishMock(attempt, 'mock-1');
    });
    expect(result.current.state.xp).toBe(36);
    expect(result.current.state.coins).toBe(12);
    expect(result.current.state.mockResults).toHaveLength(1);
  });
});
