import { describe, expect, it } from '@jest/globals';

import { addDays, dayKey, nextStreak, visibleStreak } from '../streak';

describe('streaks', () => {
  const today = '2026-10-07';

  it('formats local days and crosses month boundaries', () => {
    expect(dayKey(new Date(2026, 9, 7))).toBe('2026-10-07');
    expect(addDays('2026-10-01', -1)).toBe('2026-09-30');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('starts at 1 on the first lesson', () => {
    expect(nextStreak(0, null, today)).toEqual({ streak: 1, extended: true });
  });

  it('extends after learning yesterday and holds on the same day', () => {
    expect(nextStreak(12, '2026-10-06', today)).toEqual({ streak: 13, extended: true });
    expect(nextStreak(13, today, today)).toEqual({ streak: 13, extended: false });
  });

  it('restarts after a missed day', () => {
    expect(nextStreak(12, '2026-10-05', today)).toEqual({ streak: 1, extended: true });
    expect(visibleStreak(12, '2026-10-05', today)).toBe(0);
    expect(visibleStreak(12, '2026-10-06', today)).toBe(12);
  });
});
