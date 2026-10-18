# Changelog

Newest first. Commit IDs refer to the Git history on GitHub (`nitishkchauhan/CodeYatra`).

## 18 Oct 2026 (branch `content-v2`, not merged yet)
- **JavaScript track rewritten** to Lesson v2: 12 modules (values, operators, decisions, loops, functions and closures, array methods, callbacks and modules, objects/destructuring/spread, classes, errors, DOM/events/localStorage, promises/async/fetch/event loop) plus an **expense tracker project** that ends in a working web page. Every JavaScript output and error message is checked by running it; 48 practice questions; MDN reading on every lesson.
- **DSA track rewritten** to Lesson v2 in Python: 13 modules (Big-O, arrays and strings, linear and binary search, sorting, hashing, two pointers, sliding window, prefix sums, stacks, queues, linked lists, recursion) plus a **mock coding round** project. Six interactive visuals (Big-O growth, binary search, bubble sort, stack/queue, linked list, sliding window). Every output, error and solution runs in tests; 52 practice questions.
- **SQL track rewritten** to Lesson v2: 12 modules (SELECT, WHERE, patterns and NULL, sorting, aggregates, GROUP BY/HAVING, JOIN, LEFT JOIN, subqueries and CTEs, window functions, changing data and transactions, keys/constraints/indexes) plus a **railway sales report project**. Every query, result and SQLite error message is real (run in tests). Live "try it" for SQL, a step-through of query execution order and a tap-to-join diagram. Sample database gains a `passengers` table (with NULLs and a passenger who never booked). 48 practice questions; official SQLite and PostgreSQL docs on every lesson.
- **Audit** written: `project-docs/AUDIT-2026-10-18.md` (what works, verified defects, gaps, risks, priorities).
- **Next.js 16 track rewritten** to Lesson v2 and un-paused: 12 modules (routing, layouts, navigation, dynamic routes, loading/error/not-found, Server and Client Components, rendering and caching, Route Handlers, Server Actions, styling/images/metadata, secrets/auth/proxy, testing and deploying) plus a **student management API project**. Checked against the Next.js 16.4 docs; fixes the old lessons' `reset()` (now `retry()`), unawaited `params`, and a Server Action with no auth check. 48 practice questions, section checkpoints, three interactive visuals (file tree → URL, server vs browser components, request flow). Every JavaScript answer runs in tests; every docs link was opened.
- **Five stop levels** on roadmaps: not started, in progress, completed, practice passed (each lesson's practice set with at most 2 mistakes), mastered (section checkpoint passed, nothing to revise). Shown on the map and as a level bar in the stop sheet.
- **Spaced review:** finished modules come back for recall after 1, 3, 7, 14 and 30 days (remembered moves up, forgotten starts again). Saved and synced; the Revise screen has a "Due for review" deck, and Home shows a Revise card when something is due.
- **Official reading** with review dates on the finish screen of Next.js lessons.
- **Keyboard fix** for the black area in code editors (`react-native-keyboard-controller`); waiting for confirmation on a phone.
- `project-docs/CONTENT-REVIEW.md`: the lesson template and review checklist for future content.
- 1060 tests, all passing. `supabase/track-lessons.sql` regenerated again (Next.js modules).

## 17 Oct 2026 (branch `content-v2`, not merged yet)
- **Content plan phases A and B** (owner approved the 5 paths + CBSE, hiding the rest, and starting with A + B):
  - **Lesson v2** format: a hook (a real situation and what you'll be able to do), three short cards, **try it** (edit and run code, nothing marked), **common mistake** (the wrong code, the real error, then the fix), two quick checks, a coding exercise, and a 3-point recap on the finish screen.
  - **Python Foundations rewritten:** 12 modules (first program, numbers, text, decisions, for, while, lists, dictionaries, functions, errors, files, classes) plus a 4-step **canteen billing project**, each module with a 4–5 question practice set. Old "Comprehensions" and "Problem solving" lessons are now bonus practice. Finished modules stay finished.
  - **Paused, not deleted:** C, Java, Node.js, Next.js, Git and DSA Advanced tracks, and 7 career paths (Backend, Full-Stack, Data Scientist, Android, DevOps, Security, QA). The Paths tab shows Python Foundations, Data Analyst, AI Engineer, Frontend, Placements and CBSE.
- **Interactive roadmap:** stops know what they build on and what they open up; states done / in progress / ready / later / needs revision (from real wrong answers or a failed checkpoint); search that highlights stops; saved (bookmarked) stops; jump to my stop; "What to do next" with a plain reason for each suggestion. The stop sheet lists prerequisites, what it unlocks, each lesson (tap to open) and its practice set.
- **Section checkpoints:** a scored test at the end of each roadmap section, built from the modules' practice questions. Only first-time answers count; 70% passes and marks the section **mastered** (separate from just finishing lessons). The result shows each module's score and links to the weak ones. Pays practice XP once.
- **Next lesson** button on the finish screen.
- **Interview practice** (`/interview`): 26 questions (Python, DSA, SQL, OOP, Web) with model answers, reasoning, checked code and follow-ups; reveal, then rate yourself; optional 2-minute thinking timer; weak topics and lessons to revise.
- **Revise** (`/revise`): modules that need revision (with the reason), the mistakes review, saved stops, interview answers to revisit and quick-recall flip cards for finished modules.
- **Python visuals:** step-through variable boxes, a tap-the-index list, and a function call you follow line by line.
- **Paths tab:** search, Beginner / Intermediate / Started filters, level and "before you start" on every card.
- Practice tab: Revise and Interview tiles and a daily line (sourced quotes or labelled CodeYatra tips only).
- 927 tests, all passing. `supabase/track-lessons.sql` regenerated: run it in Supabase when this ships.

## 17 Oct 2026
- **New Play Store screenshots** (8, 1080 × 1920) in the light cy design: Home, journey, roadmap, career paths, Yatri cheering, Python output quiz, learning plan, certificate. `scripts/frame-screenshots.py` now uses a light lavender background with navy and indigo Lexend headings.
- Home header: the daily goal chip shows only the ring (numbers are in its tap message), so the learner's name fits on 360 px phones. Comes in the next build.
- **Build 10** (v1.3.0, Play bundle) built locally with `eas build --local`: final logo, footprint journey, tidier Home. Ready to upload to the closed test.
- EAS free Android builds used up for October; set up **local builds in WSL** (`scripts/wsl/`). Test APK v1.3.0 with the final logo and footprint UI built locally.

## 16 Oct 2026
- **Footprints across the app:** the journey trail is saffron footprints (faint ahead); after a lesson, Yatri walks to the next module, leaving footprints one by one. Lesson progress at the top is footprints too.
- **Tidier Home:** daily goal is a ring in the header; path, Made for you, daily challenge and review are one swipeable **Today** row; **Your journey** shows on the first screen.
- **Logo colours everywhere:** finished modules and progress rings in indigo, footprints and actions in saffron; leftover teal removed (green only for correct answers).
- **Final logo: “cy, leaving footprints”**, chosen by the owner after several rounds on the design canvas. New app icon, adaptive and themed icons, white splash with tagline “Your journey in code”, favicon, store icon, light feature graphic, brand logos.
- **Animated Yatri v2:** the footprints walk (happy), hop like typing dots (thinking), pop (celebrate) or sink (sad); tap Yatri on the welcome screens and Home to make it hop and celebrate.
- Welcome and “Building your plan” screens are now light, matching the white splash.

## In progress
Nothing half-done right now. Build 6 (v1.3.0, versionCode 6) is built and ready to upload.

## 15 Oct 2026: merged into `main`
- `paths-feature` merged (`303ea9b`); version 1.3.0 and release notes (`a30f912`); build 6 started.

## 15 Oct 2026 (branch `paths-feature`)
- **Onboarding answers now drive the app:** “Made for you” card on Home (placements → mock tests, exams → CBSE or mocks, build → projects, switch → your path, fun → playground); your path’s tracks first in the track rail (saffron dot); daily reminder uses your name, minutes and path. **Your learning plan** screen (from Profile) to change the answers any time.
- **Yatri in lessons:** cheers on right answers, droops on wrong ones (every checked exercise), thinks while code runs, gives the concept tips.
- **Light Glass on every screen:** one shared light aurora background, frosted glass cards across tabs, lessons, shop, league, mocks, account and sharing; Home, tab bar and the zigzag journey in light glass. (A dark version was tried and reverted at the owner’s request.)
- **Redesign phase 1, glassmorphism:** dark aurora background, glass cards, glass tab bar. Home rebuilt in glass with a **zigzag “Your journey” trail** of modules (teal trail for finished ones, pulsing next module with Yatri, Practise chips).
- **New logo:** `< Y >` with an upward arrow, as chosen by the owner. Vector master in `assets/brand/codeyatra-mark.svg`; new app icon, Android adaptive and themed icons, splash, favicon, store icon and feature graphic, all generated by `scripts/generate-brand.js`.
- **Yatri is now the animated logo** instead of the robot (moods: happy, focus, sad, celebrate; shop hats still fit). Logo shown on the welcome screens and in Profile.
- Design exploration of the redesign (logo concepts, Home, Lesson, Paths) on a private design canvas; the screen redesign is not built yet.

## 14 Oct 2026 (branch `paths-feature`)
- **Onboarding v2:** 3 welcome slides; questions (who, why, interest, minutes a day) with a progress bar and one-tap answers; a recommended career path with “See all paths”; optional name; daily reminder at any time; “Building your plan…”. Saves path, starting track, personal daily goal, answers and reminder.
- Home shows the personal daily goal (“About 2 lessons to reach it” when one lesson isn’t enough). Profile shows the exact reminder time.
- **Project docs** added in `project-docs/` (this folder). `118b457`

## 14 Oct 2026
- **Career paths:** 13 job roadmaps with a roadmap.sh-style map view, stop cards, Home card, sync of path and ticks. 90 outside links checked. `c30ec90` (branch `paths-feature`)

## 10 Oct 2026
- Android: stop requesting unused permissions (draw over apps, storage write, dump). `af8e7a4`
- **Module practice** with 40 new Python exercises. `3f3fe38`
- **Report and block** on the league, word filter for names and bios, **feedback links**, real version number in Profile; fixed long code lines wrapping in the editor. `5919f76`
- Store build 5 made (v1.2.0).

## 9 Oct 2026
- Play listing assets and an accurate description. `codeyatra.support@gmail.com` as the support email. Account deletion page for Google Play.
- **Server-issued certificates** (schema v1.4). **Leaderboard XP limits** (schema v1.3).
- **Production-readiness audit:** splash fix, one reward rule, double-tap protection, quiz hints, leave confirmation, Python offline recovery, contrast fixes; component and progress tests added.
- **DSA Advanced** and **CBSE Computer Science** tracks; **timed placement mock tests**.
- Website home page; store screenshots; launch checklist.
- Store build 4 made; closed test opened on 11 Oct with 12+ testers.

## 8 Oct 2026
- Ask Yatri AI hints (off), verifiable certificates, invites, classes, telemetry.
- Guided projects; C, Java, DSA, SQL, Git and Placement tracks; every track grown to 10 modules.
- New exercise types, daily challenge, mistakes review, live web editor.
- Accounts turned on (email code); branded login email; new logo; English-only UI.

## 7 Oct 2026
- **CodeYatra v1:** lessons, code runner, accounts and rewards. EAS workflow for Android builds.
