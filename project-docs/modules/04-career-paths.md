# 04 · Career paths (roadmaps)

**Status:** 🧪 built on branch `paths-feature` (commit `c30ec90`), not in a store build yet.

## What it does
Answers “What do I learn to become X?” with a roadmap for each job, connected to CodeYatra lessons.

## The 13 paths
| Path | Stops | Taught in CodeYatra |
|---|---|---|
| Software Engineer (Placements) | 17 | 76% |
| Frontend Developer | 29 | 76% |
| Backend Developer | 21 | 57% |
| Full-Stack Developer | 18 | 56% |
| Python Developer | 18 | 50% |
| Data Analyst | 12 | 42% |
| Data Scientist / ML | 14 | 36% |
| AI Engineer | 14 | 29% |
| Android Developer | 14 | 43% |
| DevOps / Cloud | 16 | 25% |
| Cybersecurity (Beginner) | 15 | 33% |
| QA / Test Engineer | 16 | 50% |
| CBSE Computer Science (11–12) | 14 | 86% |

Stops not taught in the app link to **free** outside material (official docs, freeCodeCamp, Kaggle Learn, Google courses, Hindi YouTube channels). 90 links in total.

## How it works for the learner
1. **Paths tab:** all paths with duration, stops and “% in app”. The path they follow is shown at the top.
2. **Path screen:** a **Roadmap** view (topics on a central line, sub-topics branching left and right, dashed for optional, “PICK ONE” for alternatives) and a **List** view.
3. **Tap a stop:** why it matters, the CodeYatra lessons (Start / Continue learning), free links, and **I already know this**.
4. **Make this my path:** shows on Home with job-ready % and the next stop.

## Rules
- A stop is **done** when all its lessons are finished, or the learner ticks “I already know this”.
- **Job-ready %** counts required stops only. Optional stops don’t count. Stops marked “pick one” count once: finishing any option is enough.
- The followed path and ticks are saved and sync across phones (ticks from both phones are kept).
- Colours for every path must pass WCAG AA contrast (tested).
- Every lesson a path links to must exist (tested).

## Where it lives in the code
| Part | Files |
|---|---|
| Data model and progress rules | `src/content/paths/types.ts`, `src/content/paths/index.ts` |
| The 13 paths | `src/content/paths/*.ts` (shared stops and link helpers in `shared.ts`) |
| Paths tab | `src/app/(tabs)/paths.tsx` |
| Path screen | `src/app/path/[id].tsx` |
| Roadmap map | `src/components/RoadmapMap.tsx` |
| Stop card | `src/components/PathStopSheet.tsx` |
| Home card | `src/components/MyPathCard.tsx` |
| Saved state | `pathId`, `pathMarks` in `src/state/model.ts`; `setPath`, `togglePathMark` in `src/state/progress.tsx` |

## How to add or change a path
1. Edit or add a file in `src/content/paths/`, then add it to `PATHS` in `index.ts`.
2. Give it `color`, a darker `ink` and a light `soft` colour; the contrast test will fail if they are hard to read.
3. Run `npx jest paths` (structure, lessons, colours) and `node scripts/check-path-links.js` (every link opens).

## Next
Sub-topic checklists, a “recommended” option in every “pick one”, time per stop, skill roadmaps (DSA, SQL, Git, React), GATE CSE and Service-vs-Product placement paths, a share card.
