# 01 · Lessons and tracks

## What it does
Teaches coding in short lessons. There are **16 tracks** of **10 to 13 modules** each (193 modules), each ending in a project, grouped into sections:

| Section | Tracks |
|---|---|
| Start here | Logic & Blocks |
| School | CBSE Computer Science (Class 11–12) |
| Web basics | HTML, CSS, JavaScript |
| Programming | Python, C, Java |
| Full-stack | React, Node.js, Next.js |
| CS core | DSA, DSA Advanced, SQL, Git |
| Placement | Placement Prep |

## Lesson v2 (Python Foundations, 17 Oct 2026, branch `content-v2`)
Every Python Foundations module: **hook** (a real situation, the goal) → **3 short cards** (under 60 words each; some with an interactive visual) → **try it** (edit and run, nothing marked) → **common mistake** (wrong code, the real Python error, the fix) → **2 quick checks** → **coding exercise** with tests → finish screen with a **3-point recap** and a **Next lesson** button. Each module also has a **practice set**, and each roadmap section a **checkpoint**.
Tests run every mistake's wrong code to confirm the error message is the one Python really gives, and every "try it" program to confirm it runs (`lessonV2.test.ts`).
Step screens: `src/features/lesson/V2Steps.tsx`; visuals: `src/features/lesson/PyVisuals.tsx`, `NextVisuals.tsx`.

**Next.js 16** (18 Oct 2026) follows the same template: 12 modules and a project in `src/content/tracks/nextFoundations.ts`, practice in `src/content/drills/next.ts`. Next.js can't run on the phone, so components are read, tapped, ordered and debugged, while the logic behind each feature (routing, params, caching rules, API handlers, validation, permissions) is real JavaScript the learner writes and runs. Each lesson lists official reading with a review date. See `project-docs/CONTENT-REVIEW.md`.

## How a lesson works
Every module follows **read → quick check → practice → complete**:
1. A reading card explains one idea (sometimes with a “watch it run” demo).
2. A quick quiz checks it.
3. Practice exercises, then a completion screen with XP, coins, accuracy and streak.

**Exercise types:** quiz, fill the gap, real code editor with tests, order the lines, find the bug, predict the output, tap the token, live web page builder, block puzzle with Yatri.

## Yatri in lessons
- **Progress** at the top of a lesson is a row of footprints: saffron done, indigo current, faint ahead.
- **Right answer:** Yatri jumps with sparkles and a green tick; **wrong:** turns grey and droops with a red cross (`VerdictYatri` in `src/features/lesson/Shell.tsx`, used by every checked exercise).
- **Running code:** “Yatri is running your code…” with a thinking Yatri.
- **Concept tips** come from Yatri instead of a light bulb.

## Rules
- Modules unlock in order inside a track; tracks can be switched any time.
- A wrong answer explains why; the right answer is shown only after two wrong tries.
- Leaving a lesson half-way asks “Leave this lesson?”.
- Rewards: see [09 Rewards](09-rewards.md).

## Where it lives in the code
| Part | Files |
|---|---|
| Track list and module order | `src/content/index.ts` (`STAGES`) |
| Lesson content | `src/content/*.ts`, `src/content/tracks/*.ts` |
| Content helpers | `src/content/dsl.ts` (`lesson`, `quiz`, `predict`, `bug`, `order`, `tap`) |
| Lesson screen | `src/app/lesson/[id].tsx` |
| Exercise screens | `src/features/lesson/*.tsx` |
| Home (module path) | `src/app/(tabs)/index.tsx` |

## Tests
- `src/content/__tests__/content.test.ts`: every track and lesson is well formed.
- `src/content/__tests__/exercises.test.ts` and `editor.test.ts`: every predicted output, ordered program, bug fix and coding solution is **run for real** (Node, Python, gcc, sqlite).
- `src/features/lesson/__tests__/`: quiz, fill-the-gap, order-the-lines and completion screen.

## Next
- Friendlier concept screens with big Yatri illustrations (Plan, Phase 2).
- A zigzag module path on Home (Plan, Phase 2).
