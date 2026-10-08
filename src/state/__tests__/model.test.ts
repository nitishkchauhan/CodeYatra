import { describe, expect, it } from '@jest/globals';

import { applyStreakFreezes, INITIAL, mergeProgress, normalize, weekStart, weekXp, type Progress } from '../model';

const p = (over: Partial<Progress>): Progress => ({ ...INITIAL, ...over });

describe('mergeProgress', () => {
  it('keeps the photo on this phone, and takes profile text from the newer copy', () => {
    const phone = p({ avatar: 'file:///me.jpg', bio: 'old', updatedAt: 1 });
    const cloud = p({ avatar: null, avatarUrl: 'https://x/a.jpg', bio: 'Learning React', updatedAt: 2 });
    const merged = mergeProgress(phone, cloud);
    expect(merged.avatar).toBe('file:///me.jpg');
    expect(merged.avatarUrl).toBe('https://x/a.jpg');
    expect(merged.bio).toBe('Learning React');
  });

  it('keeps lessons and XP from both copies', () => {
    const phone = p({ xp: 120, completed: { a: { xp: 25, accuracy: 76, at: '2026-10-05' } }, dailyXp: { '2026-10-05': 25 }, updatedAt: 2 });
    const cloud = p({ xp: 90, completed: { a: { xp: 30, accuracy: 100, at: '2026-10-07' }, b: { xp: 15, accuracy: 88, at: '2026-10-06' } }, dailyXp: { '2026-10-05': 10, '2026-10-06': 15 }, updatedAt: 1 });
    const m = mergeProgress(phone, cloud);
    expect(Object.keys(m.completed).sort()).toEqual(['a', 'b']);
    expect(m.completed.a).toEqual({ xp: 30, accuracy: 100, at: '2026-10-05' });
    expect(m.dailyXp).toEqual({ '2026-10-05': 25, '2026-10-06': 15 });
    expect(m.xp).toBe(120);
  });

  it('takes the more recent streak and the newer settings', () => {
    const phone = p({ streak: 3, lastActive: '2026-10-07', lang: 'hi', coins: 40, updatedAt: 5 });
    const cloud = p({ streak: 9, lastActive: '2026-10-01', lang: 'en', coins: 90, inventory: ['safa'], updatedAt: 9 });
    const m = mergeProgress(phone, cloud);
    expect([m.streak, m.lastActive]).toEqual([3, '2026-10-07']);
    expect([m.lang, m.coins]).toEqual(['en', 90]);
    expect(m.inventory).toEqual(['safa']);
  });

  it('fills fields missing from older saves', () => {
    expect(normalize({ xp: 10 } as Partial<Progress>).reminder).toEqual(INITIAL.reminder);
  });
});

describe('streak freezes', () => {
  it('cover missed days when there are enough', () => {
    const r = applyStreakFreezes(p({ streak: 8, lastActive: '2026-10-04', streakFreezes: 2 }), '2026-10-07');
    expect([r.lastActive, r.streakFreezes, r.streak]).toEqual(['2026-10-06', 0, 8]);
  });

  it('do nothing when too many days were missed', () => {
    const before = p({ streak: 8, lastActive: '2026-10-01', streakFreezes: 1 });
    expect(applyStreakFreezes(before, '2026-10-07')).toBe(before);
  });
});

describe('weekly XP', () => {
  it('counts Monday to today', () => {
    expect(weekStart('2026-10-07')).toBe('2026-10-05');
    expect(weekXp(p({ dailyXp: { '2026-10-04': 50, '2026-10-05': 20, '2026-10-07': 10 } }), '2026-10-07')).toBe(30);
  });
});

describe('normalize v1 saves', () => {
  it('moves old stage ids to the matching track and fills new profile fields', () => {
    const n = normalize({ stageId: 'fullstack' });
    expect(n.stageId).toBe('react');
    expect(n.bio).toBe('');
    expect(n.avatar).toBeNull();
  });
});
