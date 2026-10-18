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
| **Section checkpoints** | Scored test per roadmap section from its modules' practice questions; 70% first-time right = mastered; per-module results | 🧪 `content-v2` |
| **Interview practice** | 26 questions with model answers, reasoning, follow-ups; reveal and self-rate; optional timer; weak topics | 🧪 `content-v2` |
| **Spaced review** | Finished modules return after 1, 3, 7, 14, 30 days; remembered moves up, forgotten restarts; Home card when due | 🧪 `content-v2` (`src/content/review.ts`) |
| **Revise** | Modules needing revision (from wrong answers and failed checkpoints), mistakes review, saved stops, quick-recall cards | 🧪 `content-v2` |
| **Module practice** | A **Practice** button on finished modules: 4 new exercises plus 1 review exercise from an earlier module | 🧪 Python only (40 exercises), on `paths-feature`/`main` code but not yet in a store build |

## Rules
- Daily challenges and the mistakes review are never “replays”; they pay normal practice XP.
- A module practice set pays practice XP once; repeating it pays replay XP (5).
- Practice never counts as a lesson or toward certificates.
- Mistakes made in practice are saved against the original exercise, so they show up in the review.
- Checkpoints pay practice XP once (then replay XP); only answers right the first time count toward the score.
- Interview self-ratings earn no XP: they are honest notes for the learner, not something to farm.

## Where it lives in the code
| Part | Files |
|---|---|
| Daily challenge and review | `src/content/daily.ts` |
| Module practice | `src/content/drills/index.ts`, `src/content/drills/python.ts` |
| Mock tests | `src/content/mockBank.ts`, `src/app/mock/index.tsx`, `src/app/mock/[kind].tsx` |
| Projects | `src/content/projects.ts` |
| Practice tab | `src/app/(tabs)/practice.tsx` |
| Checkpoints | `src/content/checkpoints.ts` |
| Interview practice | `src/content/interview.ts`, `src/app/interview.tsx` |
| Revise | `src/content/revision.ts`, `src/app/revise.tsx` |
| Daily line | `src/content/quotes.ts` (quotes only with a named source; otherwise labelled "CodeYatra tip") |

## Tests
`src/content/__tests__/drills.test.ts`, `mock.test.ts`, and the exercise tests that run every answer.

## Next
Module practice for C, DSA, CBSE and Java (~40 exercises each), then the other tracks.
