# 05 · Onboarding

**Status:** 🧪 new version built on branch `paths-feature` (Plan, Phase 1), 14 Oct 2026. Not in a store build yet.

## The flow
Inspired by how Mimo and Enki personalise their first run; all text and drawings are our own.

| # | Screen | What happens |
|---|---|---|
| 1 | **Welcome slides** (3, swipe) | Learn to code on your phone · Practise with real code · Follow a path to a job. *Get started* / *I already have an account* |
| 2 | **Which describes you best?** | Class 8–10 · Class 11–12 · College · Working · Something else |
| 3 | **Why are you learning to code?** | Job or placements · Exams · Build apps and websites · Switch career · Just for fun |
| 4 | **What sounds most interesting?** | Websites · Mobile apps · Data · AI · Automating tasks · Not sure yet |
| 5 | **How much time a day?** | 5 / 10 / 20 / 30 minutes, which sets the daily goal (10 / 20 / 40 / 60 XP) |
| 6 | **Recommendation** | “*Frontend Developer* is a great fit for you!”, why, a path card (time, stops, % in app, what you’ll learn). *See all paths* lets them pick another, or *Decide later* |
| 7 | **Name** | Yatri asks “What should I call you?”. Optional; the word filter blocks offensive names |
| 8 | **Daily reminder** | Any time (−/+ 30 minutes, or Morning / Lunch / Evening / Night). *Yes, remind me* asks for notification permission; *Set later* skips |
| 9 | **Building your plan…** | Three lines tick: path, daily goal, first lesson. Then Home |

Questions 2–5 move on as soon as an answer is tapped. A progress bar and a Back button are on every question.

## How the recommendation works
`src/content/paths/recommend.ts`:
1. Class 11–12 preparing for exams → **CBSE Computer Science**.
2. Otherwise by interest: Websites → **Frontend** (or **Full-Stack** for career switchers) · Mobile → **Android** · Data → **Data Analyst** · AI → **AI Engineer** · Automation → **Python Developer**.
3. “Not sure yet” → by reason: job → **Software Engineer (Placements)**, exams → **Python**, build → **Frontend**, switch → **Full-Stack**, fun → **Python**.

**Starting track:** Class 8–10 start with Logic & Blocks; everyone else starts at the first part of their path taught in the app (e.g. Frontend → HTML, Data Analyst → SQL, Placements → C).

**Level** (used elsewhere in the app): Class 8–12 → school, College → college, others → curious.

## What is saved
`name`, `level`, `stageId` (starting track), `pathId`, `dailyGoal`, `about` (the three answers), `reminder`. All sync with the account. An anonymous `onboarding_done` event records the answers (no name).

## Rules
- Every question is one tap; only the name is typed, and it is optional.
- The recommendation is a suggestion; learners can choose any path or none.
- No fake numbers (learner counts, reviews).
- Respects “reduce motion”: the plan screen finishes faster.

## Where it lives in the code
| Part | Files |
|---|---|
| Screens | `src/app/onboarding.tsx` |
| Recommendation rules | `src/content/paths/recommend.ts` |
| Saving | `finishOnboarding` in `src/state/progress.tsx`; `dailyGoal`, `about` in `src/state/model.ts` |
| Personal daily goal on Home | `src/app/(tabs)/index.tsx` |
| Reminder time in Profile | `src/app/(tabs)/profile.tsx` |

## Tests
- `src/content/__tests__/recommend.test.ts`: all 150 answer combinations give a real path and starting track; the rules above.
- `src/state/__tests__/progress.test.tsx`: onboarding saves answers, path, goal and reminder; the old call still works.
- Walked through end to end in a browser at phone size (14 Oct 2026): every screen, saved values, Home.
