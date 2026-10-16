# 01 · Lessons and tracks

## What it does
Teaches coding in short lessons. There are **16 tracks** of **10 modules** each (160 modules), grouped into sections:

| Section | Tracks |
|---|---|
| Start here | Logic & Blocks |
| School | CBSE Computer Science (Class 11–12) |
| Web basics | HTML, CSS, JavaScript |
| Programming | Python, C, Java |
| Full-stack | React, Node.js, Next.js |
| CS core | DSA, DSA Advanced, SQL, Git |
| Placement | Placement Prep |

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
