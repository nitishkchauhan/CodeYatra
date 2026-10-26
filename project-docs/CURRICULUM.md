# Curriculum: skill maps for every track

Draft for owner approval, 26 Oct 2026. Nothing marked 🆕 is written yet; edit this file (or tell me) to add, drop or move modules before they are built.

**Legend:** ✅ exists (Lesson v2) · ⭐ exists in Lesson v3 (animations, watch-it-run, scenarios) · 🆕 proposed · 📝 module notes (“Read more”) written
**Levels:** **Basic**: read and explain code, write small pieces. **Intermediate**: solve problems alone and combine ideas. **Advanced / industry**: do real job tasks the way teams do them (tests, debugging, reviews, security, deployment), ending in a portfolio project.
**Every level ends with a project and a level checkpoint.** Every module has three “I can…” goals, a practice set and official reading.
**Runs in the app?** Shows what learners can run on the phone today. Anything else is taught with tap-to-build models and checked in tests with the real tool.

## How a module is built (Lesson v3)
hook (a real situation) → three cards, each with an animation → try it (tap values to change them) → watch it run → common mistake → match or sort → a quick check → work scenario (Intermediate and Advanced) → the task, built by tapping pieces into gaps → recap → **module notes** (a 5-minute read: full explanation, worked example, “In industry”, interview questions, cheat sheet, official docs).

---

## Start here and school

### Logic & Blocks · Class 8+ · runs in the app (puzzles, Python)
- **Basic** (✅ 10): algorithms, turns and order, loops, patterns and decomposition, variables, conditions, while loops, nested loops, functions, debugging. Project: Yatri’s Gem Bazaar.
- No higher levels: learners continue to Python Basic.

### CBSE Computer Science (083) · Class 11–12 · runs in the app (Python, SQL)
- **Class 11 core** (✅): data types and operators, flow of control, strings, lists, tuples and dictionaries.
- **Class 12 core** (✅): functions and scope, modules, exceptions, text files, binary and CSV files, stack, SQL.
- 🆕 **Board alignment pass**: map every module to the current syllabus units, add the units still missing (Python–SQL connectivity, computer networks, Boolean logic and number systems for Class 11), and add sample-paper sets and practical-file programs.
- Project: ✅ board practical record program.

---

## Web basics (free funnel)

### HTML · Class 9+ · runs in the app (live preview)
- **Basic** (✅ 12): how the web works, text, links and images, attributes, lists, tables, forms, choices and validation, semantic layout, media and SVG, accessibility, head and SEO. Project: coaching centre landing page.
- **Intermediate** 🆕: accessible forms in depth (labels, errors, autocomplete), responsive images (`srcset`, `<picture>`), SEO and structured data, page speed basics, embedding maps and video. Project: a multi-page school or shop site.
- **Advanced** 🆕: an accessibility audit (WCAG checks), Lighthouse and Core Web Vitals, publishing (GitHub Pages, custom domain), a progressive web app basics overview. Project: audit and fix a real-looking site, then publish it.

### CSS · Class 9+ · runs in the app (live preview)
- **Basic** (✅ 12): how CSS works, selectors and specificity, colours and units, typography, box model, Flexbox, Grid, positioning, pseudo-classes, responsive design, transitions, custom properties. Project: style the landing page.
- **Intermediate** 🆕: layout patterns (cards, sidebars, holy grail), animation and keyframes, design tokens and themes, forms that look good, responsive navigation. Project: a responsive portfolio.
- **Advanced** 🆕: Tailwind CSS basics, CSS architecture (BEM, utility-first), dark mode and reduced motion, performance and critical CSS. Project: rebuild a design to spec, light and dark.

### JavaScript · Class 10+ · runs in the app (JS, live preview)
- **Basic** (✅ 12): values, operators, decisions, loops, functions and closures, arrays, callbacks and modules, objects, classes, errors, DOM and storage, async and fetch. Project: expense tracker.
- **Intermediate** 🆕: modules in depth, fetch and real APIs (loading, error and empty states), async patterns (`Promise.all`, retries), localStorage apps, form validation, array methods for data. Project: a weather or train-status app with a mock API.
- **Advanced** 🆕: testing (unit tests with a Vitest-style runner), TypeScript basics, security (XSS, safe HTML), performance (debounce, lazy loading), build tools and npm scripts. Project: a tested, typed to-do app.

---

## Programming

### Python · Class 11+, college · runs in the app (Python)
- **Basic** (⭐📝 12): first program, numbers, text, decisions, for, while, lists, dictionaries, functions, errors, files, classes. Project: canteen billing.
- **Intermediate** (⭐📝 6): comprehensions, tuples and sets, modules and the standard library, JSON, functions in depth, classes in depth. Project: train booking report.
- **Advanced** (⭐📝 6): testing, debugging and logging, APIs and HTTP, generators, decorators and caching, clean code and review. Project: tested booking service.

### C · B.Tech, BCA, Diploma · C checked in tests (gcc); app uses Python models
- **Basic** (✅ 12): hello, variables, operators and I/O, decisions, loops, functions, arrays, strings, pointers, structs, dynamic memory, files. Project: marks manager.
- **Intermediate** 🆕: pointers in depth (pointer arithmetic, arrays of pointers), linked lists in C, modular programs (headers, multiple files), command-line arguments, 2-D arrays and matrices. Project: a student database in C.
- **Advanced** 🆕: bit manipulation, memory bugs and how to find them, makefiles and builds, data structures in C (stack, queue, hash table), C in embedded and systems work. Project: an inventory system with files and a hash table.

### Java · B.Tech, BCA · Java checked in tests (JDK); app uses JS models
- **Basic** (✅ 12): hello, variables, operators and Scanner, decisions, loops, methods, arrays, strings, classes, inheritance and interfaces, collections, exceptions. Project: train reservation.
- **Intermediate** 🆕: generics, collections in depth (Set, Map, sorting with Comparator), streams and lambdas, records and enums, file I/O. Project: a library management system.
- **Advanced** 🆕: SOLID and design patterns, JUnit testing, Maven and project structure, threads and concurrency basics, a Spring Boot REST API intro. Project: a tested booking REST API.

---

## Full-stack

### React · after JavaScript · checked in tests; app uses JS models
- **Basic + Intermediate** (✅ 13): components, props, state, events, conditional rendering, lists, forms, immutable updates, composition, sharing state, effects, custom hooks, context and reducers. Project: course enquiry app. 🆕 Split into Basic (first 7) and Intermediate (last 6).
- **Advanced** 🆕: data fetching and caching, forms and validation at scale, testing components, performance (memo, lazy loading), TypeScript with React, accessible components. Project: a tested dashboard.

### Node.js · after JavaScript · checked in tests (Node); app uses JS models
- **Basic + Intermediate** (✅ 13): what Node is, modules, npm, async and the event loop, files, HTTP, Express routes, middleware, JSON validation, REST design, CRUD API, config and secrets, testing. Project: train booking API. 🆕 Split into Basic (first 6) and Intermediate (last 7).
- **Advanced** 🆕: databases (SQL from Node, queries and migrations), authentication (sessions, JWT, password hashing), security (OWASP basics, rate limits), logging and monitoring, deployment. Project: a secure booking API with a database.

### Next.js · after React · checked in tests
- **Intermediate** (✅ 12): routing, layouts, navigation, dynamic routes, loading and error pages, server and client components, rendering and caching, route handlers, server actions, styling and metadata, auth and secrets, testing and deploying. Project: student management API.
- **Advanced** 🆕: databases with an ORM, auth providers, caching and revalidation in depth, monitoring and error tracking, performance budgets. Project: a full-stack app deployed end to end.

---

## CS core

### SQL & Databases · Class 11+, Data Analyst · runs in the app (SQLite)
- **Basic** (✅ 8): SELECT, WHERE, patterns and NULL, sorting, aggregates, GROUP BY, JOIN, LEFT JOIN.
- **Intermediate** (✅ 4 + 🆕 2): subqueries and CTEs, window functions, changing data, keys and indexes; 🆕 schema design and normalisation, multi-table reporting. Project: ✅ railway sales report.
- **Advanced** 🆕: indexes and `EXPLAIN` (why a query is slow), transactions and isolation, analytics patterns (cohorts, funnels, retention), PostgreSQL differences. Project: a business analytics report.

### Data Structures & Algorithms · B.Tech, placements · runs in the app (Python)
🆕 Merge **DSA** and **DSA Advanced** into one track with three levels.
- **Basic** (✅ 9): Big-O, arrays and strings, linear and binary search, sorting, hashing, stacks, queues, linked lists, recursion.
- **Intermediate** (✅ 4 + ✅ 9 moved): two pointers, sliding window, prefix sums, trees, BSTs, heaps, BFS, DFS, merge sort. Project: ✅ mock coding round.
- **Advanced** (✅ 6 moved + 🆕 4): topological sort, Dijkstra, backtracking, DP (three modules), greedy; 🆕 union-find, minimum spanning trees, tries, DP patterns (knapsack, LIS). Project: ✅ metro route planner.

### Git & GitHub · everyone · checked in tests (git); app uses models
- **Basic** (✅ 6): why Git, setup, staging and commits, history, branches, merging.
- **Intermediate** (✅ 5 + 🆕 2): remotes, pull requests, .gitignore and secrets, undo, stash; 🆕 rebase, resolving hard conflicts. Project: ✅ clean-history checker.
- **Advanced** 🆕: branching strategies, code review on GitHub, CI with GitHub Actions, tags and releases. Project: a repository with CI and a release.

---

## New tracks the career paths need 🆕

### Data Analysis with Python · Data Analyst path · runs in the app (pandas and matplotlib in the app’s Python)
- **Basic**: spreadsheet thinking (rows, columns, formulas as code), pandas DataFrames, selecting and filtering, sorting, summary statistics, reading CSV.
- **Intermediate**: cleaning messy data (missing values, types, duplicates), groupby and pivot tables, joining tables, dates and times, charts that tell the truth.
- **Advanced**: statistics for decisions (averages, spread, correlation is not causation), A/B test basics, a dashboard case study, presenting findings to a manager. Project: an end-to-end sales analysis.

### Aptitude for Placements · final year · runs in the app (questions with worked solutions)
- **Quantitative**: percentages, profit and loss, ratio, time and work, time-speed-distance, averages, simple and compound interest, permutations and probability.
- **Logical**: series, coding-decoding, blood relations, directions, seating arrangement, syllogisms, data interpretation.
- **Verbal**: reading comprehension, sentence correction, para-jumbles, vocabulary in context.
- Timed sections and mock rounds, reusing the existing mock-test system.

### AI Basics · AI Engineer path · runs in the app (NumPy and scikit-learn in the app’s Python); LLM parts as models
- **Basic**: what AI and ML are, data and features, NumPy arrays, a first model (linear regression), training versus testing.
- **Intermediate**: classification, evaluation (accuracy, precision, recall), overfitting, scikit-learn pipelines, clustering.
- **Advanced**: how LLMs work at a high level, calling an LLM API, prompting, embeddings and search (RAG), evaluating AI output, responsible and safe AI. Project: a small question-answering helper over a document set.

### Placement Prep · final year · runs in the app
- ✅ 12 coding-round modules and a mock round. 🆕 Link it with Aptitude and DSA Advanced to make one placement path, and add company-style mixed mocks.

---

## Build order (agreed 24–26 Oct 2026)
1. Module notes (“Read more”), piloted on Python ✅ done (24 modules).
2. HTML, CSS and JavaScript to v3, then their Intermediate and Advanced levels (free funnel).
3. SQL, React, Node; DSA merged into three levels.
4. Data Analysis with Python, then Aptitude.
5. Java, C, Next.js, Git, AI Basics, CBSE board alignment.
6. Last: CodeYatra Pro and the under-18 privacy work (see the monetisation plan).

## Quality rules (all tracks)
- Every code sample, output, error, trace and solution is checked by tests with the real tool; every link is opened.
- Official docs with review dates; re-checked every quarter. Nothing copied from other learning apps.
- Indian everyday examples; no salary or job guarantees; no fake learner numbers.
- Modules with the most recorded mistakes are revised first.
