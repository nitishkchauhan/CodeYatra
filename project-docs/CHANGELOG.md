# Changelog

Newest first. Commit IDs refer to the Git history on GitHub (`nitishkchauhan/CodeYatra`).

## 29 Oct 2026 (branch `lesson-v3`): no Hindi words in the module notes
- **HTML, more HTML, CSS and JavaScript notes** (`content/notes/html.ts`, `htmlMore.ts`, `css.ts`, `js.ts`) now use Riya’s Café (Lemon Tea, Coffee, Cheese Toast, Veg Sandwich, Chicken Sandwich, Cookies; `toast.jpg`) instead of tiffin and thali examples. Every worked-example output updated to match, including the sort example (now Iced Tea and Lemon Tea at ₹40 to show the tie-break by name). 5441 tests pass.

## 31 Oct 2026 (branch `lesson-v3`): Python Intermediate in Lesson v5
- **Python Intermediate rebuilt** (`tracks/pythonV5i/`, approved draft `content-drafts/python-intermediate-v5.md`): 6 modules, 18 short lessons and 6 challenges, replacing the 6 long v3 lessons (`tracks/pythonIntermediate.ts`, removed). Shaping data (comprehensions, sorting with key and lambda), grouped values (tuples, sets, zip, enumerate, match), the standard library (import, pip, datetime and time zones, Counter, defaultdict), real data files (JSON, CSV, regular expressions), functions in depth (defaults, *args and **kwargs, scope, type hints) and classes in depth (inheritance, special methods, dataclasses and properties).
- **Final project:** City Travel Desk’s booking report (`py-i-project`), 4 steps in the Python code editor with hidden tests: skip broken rows, a Booking dataclass, Counter and datetime, and a formatted report.
- Old ids kept for the first lesson of each module and the project, so progress, notes and practice sets still match.
- **Engine:** Run and tweak, Tap to place, Arrange and Switch and see run Python in Python lessons (the in-app Python runner) and show the code as Python (`V5CodeLang` in `features/lesson/V5.tsx`). Arrange’s hint for programs no longer talks about tags.
- **Tests:** Python v5 steps run with real Python (outputs, targets, arrange order, predict stops); older Lesson v2/v3 Python checks skip v5 lessons; notes and practice belong to each v5 module’s first lesson. 6195 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 31 Oct 2026 (branch `lesson-v3`): JavaScript Intermediate in Lesson v5
- **JavaScript Intermediate built** (`tracks/jsV5i/`): 6 modules, 18 lessons and 6 challenges, shown in the JavaScript track after the Basic modules (marked INTERMEDIATE). Working with data (filter → map → reduce, toSorted and compare functions, Object.groupBy, some and every), money, dates and text (Intl.NumberFormat with lakh grouping, Intl.DateTimeFormat with a time zone, cleaning and checking input), fetch in the real world (URLSearchParams, every outcome, AbortController time limits), waiting for many things (Promise.all, Promise.allSettled, retry with a growing wait), forms with JavaScript (FormData, setCustomValidity, errors screen readers announce), and one source of truth (state, render(), saving state safely).
- **Final project:** “Is my train on time?” for City Travel Desk (`j-i-project`), four checked steps: check the number, show the train, save my trains, refresh all. Felix (backend developer) joins Megan and Arden in the “At work” messages.
- **Practice server** (`lib/web/page.ts`): City Travel Desk’s made-up 901xx trains (on time, late, cancelled, slow, broken, and “flaky”: busy every other time), timetable searches by query (`from`, `to`), and fetch now stops when its abort signal fires. Pages with these trains show a “Practice data” tag.
- `language.test.ts` allows the standard time-zone id `Asia/Kolkata` (approved; it is a technical code, not an example name).
- 6063 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 31 Oct 2026 (branch `lesson-v3`): CSS Intermediate in Lesson v5
- **CSS Intermediate built** (`tracks/cssV5i/`): 6 modules, 18 lessons and 6 challenges, shown in the CSS track after the Basic modules (marked INTERMEDIATE). Layout patterns (auto-fit grids, grid areas, sticky footers), components that fit anywhere (clamp, container queries, aspect-ratio and object-fit), motion with a purpose (multi-step keyframes, staggers, skeletons, reduced motion), design tokens and themes (data-theme, @layer), forms that look good (accent-color, focus rings, :user-invalid with :has()), and responsive navigation (menu toggle with aria-expanded, sticky header, skip links).
- **Final project:** your own portfolio site (`c-i-project`), four checked CSS steps.
- Resize the screen also shows container queries (they work on the real box size in the scaled preview); the screen test accepts `@container` as a layout that changes.
- 5844 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 30 Oct 2026 (branch `lesson-v3`): HTML Intermediate in Lesson v5
- **HTML Intermediate built** (`tracks/htmlV5i/`, approved draft `content-drafts/web-intermediate-v5.md`): 6 modules, 18 lessons and 6 challenges, shown in the HTML track after the Basic modules (marked INTERMEDIATE). Forms everyone can fill (fieldset, linked errors, autocomplete, inputmode), responsive images (srcset, sizes, picture, no layout shift), sites with many pages (relative paths, shared nav, aria-current), search and share tags (titles, Open Graph, JSON-LD, canonical, robots, sitemaps), fast pages (Core Web Vitals, lazy loading, defer and async), and built-in widgets (details, popover, dialog, progress, meter).
- **Final project:** the Greenfield School website (`h-i-project`), four checked steps across Home, Admissions and Fees.
- Story: the learner works at Brightline Studio; Megan (team lead) sends “At work” messages. All names are neutral and made up.
- **Multi-page preview** (`lib/web/page.ts`): with `pages` (and `current`), links between a small site’s pages work in lesson previews and the web editor; a thin bar shows which file is open, and each page change is logged. Tested in `lib/__tests__/sitePreview.test.ts`.
- Also: `V5.tsx` formatting restored to the project’s style (a formatter run had rewritten it). 5642 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 30 Oct 2026 (branch `lesson-v3`): fix: the screen split in half on Android
- **Root cause:** the hidden code sandbox (`lib/runner/RunnerHost.tsx`) is a WebView mounted next to the whole app. On Android, react-native-webview wraps the page in its own container with `flex: 1`, and that container ignored the “hidden” style. As soon as a lesson ran code (Run and tweak, editors), the container took half the screen and stayed for the whole session, on every screen including Home. Fix: the WebView sits in an absolutely positioned 1×1 wrapper, and its container is 1×1 with `flex: 0`. A test (`lib/__tests__/runnerHost.test.tsx`) guards it.
- **Fixed bottom bar everywhere in Lesson v5:** the shared `Screen` in `features/lesson/V5.tsx` now has a `feedback` slot in the fixed bottom bar (above the safe area). Tap to place, Tap the bug, True or false, X-ray, Arrange and Copy the look show their feedback and Continue there, so they are never hidden below the fold. Checked at 375×812 and 320×568.
- Home no longer says “Module 1 · Module 1 · …”: the HTML, CSS and JavaScript unit titles no longer include the module number (the app adds it).

## 29 Oct 2026 (branch `lesson-v3`): neutral, professional example names
- Owner request: no local Indian example names. People, places and trains in every lesson, drill, note, mock test and visual now use neutral names: Riya → Rosa (“Rosa’s Café”), Sharma Classes → Sutton Classes (Mr Sutton), Asha → Ava, Ravi → Reed, Kabir → Kaden, Meera → Megan, Zoya → Zoey and others; Pune → Paris, Delhi → Dublin, Mumbai → Madrid, Jaipur → Jersey, Bengaluru → Barcelona and others; trains Rajdhani → Royal, Howrah Rajdhani → Harbour Royal, Shatabdi → Silver Arrow, Vande Bharat → Valley Express.
- Each new name keeps the first letter and alphabetical order of the old one, so sorted results and LIKE patterns still teach the same thing. Answers that depended on a name’s length were updated (a few drills, a C report, a Python note, one SQL mock question); facts were rewritten so they stay true (the quiz project asks for the capital of Japan). The SQL sample tables were re-aligned.
- Kept: real resources (YouTube channels, Khan Academy), ₹, Indian mobile-number patterns and `en-IN` formatting, and Yatri (the app’s guide). The `language.test.ts` guard now also blocks the old local names.

## 29 Oct 2026 (branch `lesson-v3`): no Hindi words anywhere
- Every remaining Hindi word in lessons, practice drills, notes and animations is replaced with plain English, the same way everywhere so each program still prints what its lesson says (chai → tea, thali → combo, namaste → hello, samosa → muffin, vada pav → veg burger, dosa → wrap, idli → pancake, roti → bread, and so on). Devanagari examples are gone too: the React context lesson now switches between English and French.
- Answers that depended on word length were updated (two DSA drills, one Python caching example), and the Git merge lesson’s conflict now uses “Welcome” against “Hello”.
- Old unused track files (`htmlV3.ts`, `htmlV3More.ts`, `jsV3.ts`, `cssV3.ts`) are deleted; the Sharma Classes CSS steps moved to `cssV5/sharmaProject.ts`.
- New guard test (`language.test.ts`) scans every lesson, track, note, drill and mock-test question for Hindi words and Devanagari text. “Hindi” as the name of a language (for example on YouTube course links) is allowed.

## 29 Oct 2026 (branch `lesson-v3`): the JavaScript track in Lesson v5
- **JavaScript rebuilt in full** (`tracks/jsV5/`, approved draft `content-drafts/js-track-v5.md`): 13 modules, 71 short lessons and 13 challenges with badges and stars, covering every topic on the W3Schools JavaScript list (checklist only; our own wording and Riya’s Café examples). The final challenge, **Make Sharma Classes work** (`j-project`), adds a course filter, form checks, batches from the server and a saved dark mode to the page from the HTML and CSS tracks.
- **Three new screens** (`features/lesson/V5.tsx`):
  - **Run and tweak** (`run` step): change one value and the code runs again in the app’s sandbox, with the console underneath; optional targets to reach.
  - **Predict, then run** for JavaScript: the existing trace with pauses, now with JavaScript lessons.
  - **Tap the page** (`tappage` step): a live page with JavaScript and an event log; Continue unlocks when the goal appears.
- Tap to place and arrange can now hold a **program** (`run`): it runs and the console shows the result. Toggle views can show **console output** (`out`) instead of a page.
- The end-of-trace question now shuffles its options, like every other question.
- **No Hindi words:** the practice server menu (`/api/menu`) is now Lemon Tea, Cheese Toast, Veg Sandwich and Chicken Sandwich; animations updated too. (The older HTML/CSS/JS notes still have some; a separate task is queued.)
- Old JavaScript ids kept (`j-var-1`, `j-ops-1`, `j-cond-1`, `w-js-1`, `j-fn-1`, `j-arrow-1`, `j-arr-1`, `j-obj-1`, `j-class-1`, `j-error-1`, `j-dom-1`, `j-async-1`, `j-project`), so progress, notes and practice carry over.
- Tests: every program, toggle output, trace pause, arrange order and live page (run with its demo taps in a test browser) is checked. 5441 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 29 Oct 2026 (branch `lesson-v3`): the CSS track in Lesson v5
- **CSS rebuilt in full** (`tracks/cssV5/`, approved draft `content-drafts/css-track-v5.md`): 12 modules, 68 short lessons and 12 Module Challenges with badges and stars, covering every topic on the W3Schools CSS list (used as a checklist only; all wording and examples are our own, set in Riya’s Café, Pune). The final challenge styles Sharma Classes with the old project’s four checked steps.
- **Two new screens** (`features/lesson/V5.tsx`): **Copy the look** (match a target picture by picking values) and **Resize the screen** (see the page at 360–1200px; width media queries and `vw` are worked out for the chosen width in `lib/web/media.ts`).
- Live edit, tap to place and arrange can now edit a **stylesheet for a fixed page** (`html` on the step). CSS arrange blocks are whole rules.
- **Built-in pictures** (`lib/web/assets.ts`): lessons write `url(cup.svg)` or `src="dish.svg"` and the page builder swaps in a drawing, so previews work offline.
- Old CSS ids kept (`w-css-1`, `c-sel-1`, `c-units`, `c-text-1`, `c-box-1`, `c-pos-1`, `c-flex-1`, `c-grid-1`, `c-pseudo`, `c-motion-1`, `c-resp-1`, `c-vars-1`, `c-project`), so progress, notes and practice carry over.
- **HTML gaps filled** (W3Schools check): computer-code tags in 2.3, image maps in 4.3, `<colgroup>` in the Tables lesson.
- Tests: the v5 tests now cover both tracks plus copy, resize and the helpers. 4934 tests pass. `supabase/track-lessons.sql` regenerated: run it when `lesson-v3` is merged.

## 29 Oct 2026 (branch `lesson-v3`): the HTML track in Lesson v5
- **The owner's HTML track spec, built in full** (`tracks/htmlV5/`, `format: 'v5'`): 9 modules, 39 short lessons (the spec's 38 plus 9.3 "Pages for everyone" on accessibility) and a Module Challenge per module (5 quick questions and 6 tasks, a badge and 1–3 stars). The record of the spec and what changed is in `content-drafts/html-track-v5.md`.
- **New screen types** (`features/lesson/V5.tsx`): chat, tap to reveal, explore (tap a line, the live page highlights it), tap to place (instead of drag), toggle and before/after, live edit with a slider or choices, tap the bug, recap, swipe true/false, X-ray (tap the live page to name its parts) and arrange the blocks.
- Lessons that replace an older HTML module keep its id (`w-html-1`, `h-attr-1`, `h-text`, `w-html-2`, `h-list-1`, `h-table-1`, `h-head-1`, `h-sem-1`, `h-form-1`, `h-inputs-1`, `h-media`, `h-a11y-1`, `h-project`), so progress, notes and practice sets carry over. The final challenge is the portfolio project with 10 checks.
- Tests: `lessonV5.test.ts` (296 checks: every answer, placed piece, bug, arrange order and project solution run through jsdom). 4457 tests pass.
- When `lesson-v3` is merged, run the regenerated `supabase/track-lessons.sql` (the HTML lesson list changed).

## 28 Oct 2026 (branch `lesson-v3`): the Python project in Lesson v4
- `p-project` is now **Riya’s billing app** (`tracks/pythonProjectV4.ts`, same id): Riya’s brief, a “plan it” match, six typed steps with tests (price, subtotal, 10% off and 5% GST, receipt, safe quantities with try/except, saving to a file), a quick check, a bug to spot and recall cards. Uses all 12 modules; plain English menu (tea, coffee, toast, sandwich).
- When `lesson-v3` is merged, regenerate `supabase/track-lessons.sql`: the project title changed.

## 28 Oct 2026 (branch `lesson-v3`): Python Basic Modules 4–12 in Lesson v4
- All twelve Python Basic modules now use the v4 format (`tracks/pythonV4b.ts` for 4–12, same ids): guess first, cards with one-tap checks, try it with targets, predict-then-run pauses, spot the bug, sort or match, quick checks, build it and recall.
- Notes v4 for Modules 4–12 (`notes/pythonV4.ts`): In 30 seconds, real mistakes, Check yourself. Every code block in these notes now runs on its own (a block that shows an error on purpose names it in a comment), and the last Hindi words in the List and Dictionary examples were replaced (tea, sandwich, toast, juice).
- Tests: bug steps and notes mistakes compare full printed output; v4 lessons may use match instead of sort. 4219 tests pass.

## 28 Oct 2026 (branch `lesson-v3`): Lesson v4 pilot
- **The final app plan** (`APP-PLAN.md`): Parts 1–4 agreed with the owner (first open, Home and Yatri, the lesson screen, notes); Part 5 started. Rule added: no Hindi words anywhere in the app.
- **Lesson v4 engine** (`format: 'v4'` on a lesson):
  - Answers are a tap: a right answer shows why and moves on by itself; the first wrong answer gives a hint, the second shows the answer and why, then Continue. No lives, no Check button (`AskBlock` in `features/lesson/V4.tsx`).
  - Learn cards end in a one-tap check (`ConceptStep.check`), so no card is just “read and Next”.
  - Try it has targets that tick when a run prints them (`TryStep.goals`).
  - See it run becomes “Predict, then run”: it plays by itself and pauses before chosen lines to ask what happens (`TraceStep.stops`).
  - Spot the bug shows the real error or output first; tapping a line answers (`BugStep.error`, `BugStepV4`).
  - Recall cards at the end (`recall` step): think, flip, “I knew it” / “Not yet”.
  - Module complete shows “First try %”, “You can now” and footprints walking in.
  - A **Notes** button in the lesson’s top bar opens the module’s notes at any time.
- **Notes v4**: “In 30 seconds” summary, jump links, A−/A+ text size, a Run button on every code block, Common mistakes with the real error, and Check yourself.
- **Python Basic Modules 1–3 rebuilt** in v4 (`tracks/pythonV4.ts`, same ids so progress is kept), plus v4 notes. New tests (`lessonV4.test.ts`) run every stop answer, bug message, target, build-it solution and notes mistake through real Python.

## 27 Oct 2026 (drafts, branch `lesson-v3`)
- **Intermediate drafts for HTML, CSS and JavaScript** for owner review, in `content-drafts/html-intermediate.md`, `css-intermediate.md` and `js-intermediate.md`: 6 modules each plus a project, with At work scenarios (Saathi Web Studio, Indore). Projects: the Nayi Disha School website, your own portfolio, and “Is my train on time?” on the practice server. Open decisions are listed at the end of each draft. CURRICULUM lines updated.

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
- **Content drafts first** (owner rule, 26 Oct): every module starts from “what is it?”, real-life uses, code examples and interactive steps, and is drafted in `project-docs/content-drafts/` for owner approval before it is built. HTML Basic drafted in full (`html-basic.md`, `html-basic-2.md`).
- **HTML Basic, modules 1–3 rebuilt from the approved draft** (What is HTML?, Headings and text, Links and images), each with animated cards, a new **See it build** step (tap Next line: the line is highlighted and the live page builds up to it), a sort or match, a check and a tap-to-build page task, plus module notes. Five new web animations (tags, request journey, outline, link jump, image loading).
- **HTML Basic, modules 4–12 and the project rebuilt** from the approved draft (attributes, lists, tables, forms, choices and validation, semantic layout, media and SVG, accessibility, head and SEO), in the same shape, each with notes. New project: **Sharma Classes, Jaipur**, a coaching-centre landing page in 4 checked steps (skeleton and head; about, courses and fee table; tap-to-call and enquiry form; accessibility pass). The whole HTML Basic level is now v3.
- **CSS Basic, all 12 modules and the project rebuilt for Lesson v3** from the approved draft (`content-drafts/css-basic.md`): every module styles Riya’s Tiffins, and the new project styles the Sharma Classes page from the HTML project in 4 checked steps (design system, phone-first layout, bigger screens, polish with focus, sticky header, reduced motion and dark mode). **See it build for CSS:** the page stays the same and each tap adds the next style rule. Five new animations (cascade, specificity scoreboard, box-model layers, flex axis, grid tracks). Module notes for all 12, with the worked example shown as a live styled page.
- **JavaScript Basic, all 12 modules and the project rebuilt for Lesson v3** from the approved draft (`content-drafts/js-basic.md`): every module makes Riya’s Tiffins do something, and the project is now **Make Sharma Classes work** (fee calculator with sibling discount, an enquiry form that checks itself, a remembered enquiry, batch timings loaded from a server), replacing the expense tracker; the id stays `j-project`, so progress is kept.
  - **See it run for JavaScript:** the same step as Python’s watch-it-run, made by adding a snapshot before each statement line (`src/content/traceJs.ts`); it runs in the app’s JavaScript runner, and tests run every traced program and compare it with the plain run.
  - **See it build for JavaScript:** the page stays the same and each tap runs the script up to the next step (DOM and fetch modules), so learners can tap the button in the preview.
  - **Practice server:** `fetch("/api/…")` on lesson pages is answered inside the page (menu, empty, slow and broken replies; batch timings), so fetch lessons work offline and the same every time. Pages that can’t use real storage keep `localStorage` in memory.
  - Four new animations (`===` vs `==`, callback hand-off, the DOM tree, the event loop) and module notes for all 12, with page examples shown live.
  - Tests now run page code in a browser-like DOM (jsdom): every See it build step, every JavaScript page solution, page mistakes and page notes must run without errors. 4130 tests passing.
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
