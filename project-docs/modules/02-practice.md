# 02 · Practice

## What it does
Extra practice outside the main lessons, mostly on the **Practice** tab.

| Feature | What the learner gets | Status |
|---|---|---|
| **Daily challenge** | 3 exercises from their track, the same for everyone that day | ✅ |
| **Review my mistakes** | Every wrong answer comes back until it’s answered right | ✅ |
| **Placement mock tests** | 7 timed tests (Full placement 20 Q / 30 min; DSA, C, Python, Java, SQL+DBMS, OS+networks 10 Q each) from a 118-question bank, with a score report and weak topics | ✅ |
| **Guided projects** | Portfolio page, to-do app, quiz game, number guessing game | ✅ |
| **Practice sets** | 36 extra practice lessons across tracks | ✅ |
| **Module practice** | A **Practice** button on finished modules: 4 new exercises plus 1 review exercise from an earlier module | 🧪 Python only (40 exercises), on `paths-feature`/`main` code but not yet in a store build |

## Rules
- Daily challenges and the mistakes review are never “replays”; they pay normal practice XP.
- A module practice set pays practice XP once; repeating it pays replay XP (5).
- Practice never counts as a lesson or toward certificates.
- Mistakes made in practice are saved against the original exercise, so they show up in the review.

## Where it lives in the code
| Part | Files |
|---|---|
| Daily challenge and review | `src/content/daily.ts` |
| Module practice | `src/content/drills/index.ts`, `src/content/drills/python.ts` |
| Mock tests | `src/content/mockBank.ts`, `src/app/mock/index.tsx`, `src/app/mock/[kind].tsx` |
| Projects | `src/content/projects.ts` |
| Practice tab | `src/app/(tabs)/practice.tsx` |

## Tests
`src/content/__tests__/drills.test.ts`, `mock.test.ts`, and the exercise tests that run every answer.

## Next
Module practice for C, DSA, CBSE and Java (~40 exercises each), then the other tracks.
