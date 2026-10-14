# 09 · Rewards, streaks and the shop

## Rewards per lesson
| | XP | Coins |
|---|---|---|
| Lesson (first time) | 25 | 10 |
| Practice (first time) | 15 | 5 |
| Project (first time) | 60 | 30 |
| No mistakes bonus | +5 | +5 |
| Replaying something already finished | 5 | 0 |
| Mock test | score × 3 | score |

- A double tap on Continue pays only once (each attempt has a claim ID).
- The completion screen shows exactly what is paid.

## Streaks and goals
- **Daily goal:** 20 XP.
- **Streak:** days in a row with at least one lesson.
- **Streak freeze:** 50 coins, hold up to 2; used automatically on a missed day.

## Shop
4 outfits for Yatri: cricket cap (100), explorer hat (150), graduation cap (200), festive safa (300). Coins can’t be bought with money.

## Reminders
A daily reminder at 7 AM, 5 PM, 7 PM or 9 PM (Profile). Planned: any time, chosen during onboarding.

## Where it lives in the code
| Part | Files |
|---|---|
| Reward rules | `src/state/model.ts` (`lessonReward`, `isReplay`) |
| Awarding, claims | `src/state/progress.tsx` (`completeLesson`, `finishMock`) |
| Streak maths | `src/state/streak.ts` |
| Shop items | `src/content/shop.ts`, `src/app/shop.tsx` |
| Reminders | `src/lib/reminders.ts` |

## Tests
`src/state/__tests__/progress.test.tsx` (rewards, replays, double taps, saving), `streak.test.ts`.
