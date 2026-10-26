# Changelog

Newest first. Commit IDs refer to the Git history on GitHub (`nitishkchauhan/CodeYatra`).

## 24 Oct 2026 (branch `lesson-v3`, not merged yet)
- **Lesson v3 framework**, built once for every track:
  - **Watch it run** (`trace` step): runs a Python program under `sys.settrace` in the app’s Python and steps through it line by line, showing the line, the variables (changed ones highlighted), the function being called and the output. An optional question at the end is checked; tests run every trace with real Python and check the right option against the real final value.
  - **Match the pairs**, **sort into groups**, and **work scenarios** (a message from a teammate with a log, ticket, diff or data, then the task it sets).
  - **25 concept animations** (variables, print, types, loops, lists, dicts, functions, errors, files, classes, modules, JSON, APIs, tests, comprehensions, sets, tuples, scope, recursion, generators, decorators…), built from shared pieces in the app’s colours; they hold still with reduce motion.
  - **Levels** on lessons (Basic, Intermediate, Advanced), shown on the learning map.
  - Editor tests can now expect an exact error (`raises`).
- **Python pilot, all three levels:**
  - **Basic:** the 12 Foundations modules upgraded with an animation per card, watch-it-run after try-it and a match or sort after the common mistake.
  - **Intermediate (new):** comprehensions, tuples and sets, modules and the standard library, JSON, functions in depth, classes in depth, and a **train booking report** project.
  - **Advanced / industry (new):** testing, debugging and logging, APIs and HTTP, generators for big data, decorators and caching, clean code and code review, and a **tested booking service** project. Every module ends with a real work task (a red CI build, a production traceback, an API ticket, a 2 GB log, a review comment).
  - 48 new practice questions; Python docs reading on every module; 3948 tests passing.
- **Module notes (“Read more”)**: a 5-minute in-app article per module (sections with animations, a worked example you tap through line by line, “In industry”, interview questions with tap-to-reveal answers, a cheat sheet, official docs, and Listen). Opened from the lesson finish screen and a new “Module notes” list in Revise. All 24 Python modules have notes; every worked example runs in tests and must print exactly what the notes show.
- **Skill maps** for every track (Basic → Intermediate → Advanced, plus new Data Analysis, Aptitude and AI Basics tracks) in `project-docs/CURRICULUM.md`, for owner approval.
- Note: the Python certificate now needs all three levels. `supabase/track-lessons.sql` is regenerated and must be run again when this ships.

## 24 Oct 2026 (tap-to-build, merged into main after owner testing)
- **Coding without a keyboard (Phase 1).** The keyboard caused a blank area on some Android phones, and typing code on a phone is slow, so lessons no longer open it:
  - **Code exercises** (about 230) became **Build it**: the tested solution with up to 6 pieces missing and a bank of pieces to tap in, including likely mix-ups (`<` and `<=`, `=` and `==`, the starter's wrong value). The real tests still run on the result; wrong pieces turn red after a failed run, and "Show the answer" appears after two tries.
  - **Predict the output** became a choice between the real output and likely slips (an off-by-one, swapped lines, True/False flipped, the other value in the code).
  - **Try it** shows the code with values to tap and change (numbers, names, cities, true/false, colours), then Run. Only values nothing else depends on are offered, and tests run every option of every lesson.
  - **Web page builder** fills up to 3 gaps per file with a live preview, then checks the page.
  - **Playground**: Tinker (tap values) and Build (fill the gaps) for Python and JavaScript programs, and a web page whose values change by tapping.
  - The keyboard fix from `fix-keyboard-gap` is included. Typing remains only for names, search and profile fields.
  - 3635 tests passing (928 new checks of generated exercises).

## 24 Oct 2026
- **content-v2 merged into main** (fast-forward) and pushed. App version **1.4.0**. Every track is now Lesson v2 and none are paused.
- Local Play bundle `builds/CodeYatra-1.4.0.aab` (versionCode 11) built in WSL (`scripts/wsl/build-aab.sh`), no EAS quota used. Run it from PowerShell: Git Bash rewrites the /mnt/c path.
- `supabase/track-lessons.sql` run in Supabase by the owner (all 16 tracks, 209 lessons).
- Store screenshot 4 redone: "6 career paths, from Python basics to AI", captured from the current Paths tab (`scripts/frame-screenshots.py`).
- Owner uploaded build 11 (1.4.0) to the Play closed test on 24 Oct. New screenshot 4 uploaded to the Play listing the same day.

## 18 Oct 2026 (branch `content-v2`, merged 24 Oct)
- **DSA Advanced rewritten and un-paused** (Lesson v2, Python): 13 modules (binary trees, BSTs, heaps, graphs and BFS, DFS and connected parts, topological sort, Dijkstra, backtracking, DP with memoization, DP tables, 2-D DP, greedy, merge sort) plus a **metro route planner** project (BFS with path rebuilding, then Dijkstra). Every output, error message, mistake and solution runs in tests. 52 practice questions; Python docs reading on every lesson. **No tracks are paused any more.** 2704 tests passing.
- **Java track rewritten and un-paused** (Lesson v2, Java 17+): 12 modules (hello and running, variables and types, operators and Scanner, if and switch expressions, loops, methods and overloading, arrays, Strings and StringBuilder, classes and objects, inheritance and interfaces, ArrayList and HashMap, exceptions) plus a **train reservation system** project. Every Java output question and common mistake is compiled and run with a real JDK in tests (on Windows, the JDK 17 in WSL that the Android build uses; results are cached), so compile errors and exceptions are quoted exactly. Exercises are JavaScript models of the same logic (printf, int overflow, int division, classes, inheritance, word counts, validation). 48 practice questions; dev.java and Java SE API reading on every lesson. 2584 tests passing.
- **C track rewritten and un-paused** (Lesson v2, C17): 12 modules (hello and compiling, variables and types, operators and input, if/switch, loops, functions, arrays, strings, pointers, structs, dynamic memory, files) plus a **marks manager** project. Every C output question and common mistake is compiled and run with gcc in tests (the wrong program prints exactly what is shown). The app can’t compile C on a phone yet, so try-its and exercises are Python models of what C does (printf placeholders, fixed-size integers, permission bits, strcmp, pointer chains, doubling capacity). 49 practice questions; cppreference reading on every lesson. 2445 tests passing.
- **Node.js track rewritten and un-paused** (Lesson v2, Node.js 24 LTS and Express 5): 13 modules (what Node is, ES modules and CommonJS, npm and versions, async and the event loop, files and paths, HTTP with no packages, Express routes, middleware and errors, JSON and validation, REST design, a CRUD API, configuration and secrets, testing with node:test) plus a **train booking API** project. Common mistakes run with real Node in a throwaway folder (Express and server examples are shown as summaries). Exercises are plain JavaScript models of Node and Express (route matching, the middleware chain, path.join, semver ranges, the event loop), so they also run in the app. Timer and promise predicts now run in real Node in tests. 39 practice questions; nodejs.org, expressjs.com, npm and MDN reading on every lesson.
- **Git track rewritten and un-paused** (Lesson v2): 11 modules (why Git, setup and init, staging and commits, history, branches, merging and conflicts, remotes, pull requests, .gitignore and secrets, safe undo, stash) plus a **clean-history checker** project. Every common mistake runs with real git in a throwaway folder (the wrong commands print exactly the message shown, the fix succeeds), and command-order exercises run too. Each module ends with a Python exercise on how Git works inside (diffs, the staging area, history walking, fast-forwards, ignore patterns, revert). 34 practice questions; git-scm.com and GitHub docs reading on every lesson.
- **Logic & Blocks rewritten** to Lesson v2 for Class 8+: 10 modules (algorithms, turns and order, loops, patterns and decomposition with Yatri’s block puzzles; then variables, conditions, while loops, nested loops, functions and debugging in real Python) plus a **Gem Bazaar project** that ends with writing Yatri’s command runner in Python. Every Python output, error and solution runs in tests; puzzle solutions are checked by the game tests. 40 practice questions. Test runners now time out after 15 seconds so an endless loop fails instead of hanging the suite. 2106 tests passing.
- **CBSE Computer Science rewritten** to Lesson v2: 12 modules for the Class 11–12 (083) Python, file, stack and SQL topics (data types and operators, flow of control, strings, lists, tuples and dictionaries, functions and scope, math/random/statistics modules, exceptions, text files, binary and CSV files, stack, SQL) plus a **board practical record program** project. Every board-style find-the-output answer, error message and solution runs in tests, including file reading and writing. 48 practice questions. Python docs links moved to their new /3/builtins/ addresses.
- **Placement Prep rewritten** to Lesson v2: 12 modules (how a coding round works, strings, number problems, arrays, hashing, pattern printing, matrices, Python output traps, C output traps, OOP, SQL interview questions, complexity) plus a **mock placement round** project (string, array and SQL question). Every Python and SQL answer runs in tests, and C output questions and C mistakes are compiled and run with gcc when it is installed. 48 practice questions; Python, SQLite and cppreference reading on every lesson. 1889 tests passing.
- **React track rewritten** to Lesson v2 for React 19: 13 modules (components and JSX, props, state and the update queue, events, conditional rendering, lists and keys, controlled forms, immutable updates, composition, sharing state, effects, custom hooks and the rules of hooks, context and reducers) plus a **course enquiry app project**. React needs a build step, so there is no live React preview yet; each module ends with a JavaScript exercise on the logic React runs (createElement, the update queue, Object.is dependency checks, reducers), and every exercise and try-it runs in tests. React warning texts are quoted from React itself, shortened. 52 practice questions; react.dev reading on every lesson. 1755 tests passing.
- **CSS track rewritten** to Lesson v2: 12 modules (rules and the cascade, selectors and specificity, colours and units, typography, box model, flexbox, grid, positioning, pseudo-classes and pseudo-elements, responsive design, transitions and reduced motion, custom properties) plus a **project that styles the HTML landing page**. Every module ends in a live page whose checks are tested; 48 practice questions; MDN reading on every lesson. 1639 tests passing.
- **HTML track rewritten** to Lesson v2: 12 modules (how the web works, text, links and images, attributes, lists, tables, forms, choices and validation, semantic layout, media and SVG, accessibility, head and SEO) plus a **landing page project**. New live-preview "try it" for web pages; every module ends by building a page whose checks are tested. 48 practice questions; MDN reading on every lesson.
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

## 17 Oct 2026 (branch `content-v2`, merged 24 Oct)
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
