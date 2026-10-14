# CodeYatra: Software Requirements Specification (SRS)

| | |
|---|---|
| **Product** | CodeYatra, an Android app that teaches coding |
| **Version described** | 1.2.0 (store build 5) plus work in progress on branch `paths-feature` |
| **Last updated** | 14 Oct 2026 |
| **Owner** | Nitish Chauhan |

Status key: ✅ built and live in a store build · 🧪 built on a branch, not in a store build yet · 🚧 in progress · 📋 planned · ⏸ built but switched off

---

## 1. Introduction

### 1.1 Purpose
This document lists what CodeYatra must do (functional requirements) and how well it must do it (non-functional requirements), so anyone can check what is built, what is missing, and what each part is for.

### 1.2 Scope
CodeYatra teaches programming on a phone, from first logic puzzles to placement-ready DSA, with real code running inside the app. It is free to learn. Accounts are optional and only needed for sync, the weekly league, certificates and classes.

### 1.3 Users
| User | Needs |
|---|---|
| School students, Class 8–12 (age 13+) | Basics, CBSE board syllabus, fun practice |
| College students (B.Tech, BCA, BSc, Diploma) | Placement preparation, DSA, a career path |
| Self-learners and career switchers | A clear route to a job, short daily lessons |
| Teachers | A class code to follow students’ progress |

The app is **not for children under 13** (Play target audience 13–15, 16–17, 18+).

### 1.4 Definitions
- **Track**: a language or subject, e.g. Python. Each has 10 **modules**.
- **Module / lesson**: one short lesson made of **steps** (read, check, practise).
- **Path**: a career roadmap (e.g. Frontend Developer) made of **stops** grouped in **sections**.
- **XP**: experience points for learning. **Coins**: in-app points for the shop. Neither can be bought.

---

## 2. Functional requirements

### 2.1 Learning (see [modules/01](modules/01-lessons-and-tracks.md))
| ID | Requirement | Status |
|---|---|---|
| FR-L1 | 16 tracks × 10 modules (160 modules) across Start here, School, Web, Programming, Full-stack, CS core and Placement | ✅ |
| FR-L2 | Every module follows read → quick check → practice → complete | ✅ |
| FR-L3 | Exercise types: reading card, quiz, fill the gap, code editor, order the lines, find the bug, predict the output, tap the token, web page builder, block puzzle | ✅ |
| FR-L4 | Wrong answers explain why and allow a retry; the right answer is shown after 2 wrong tries | ✅ |
| FR-L5 | Leaving a lesson half-way asks for confirmation | ✅ |
| FR-L6 | Modules unlock in order within a track | ✅ |
| FR-L7 | Every answer the app teaches is checked by automated tests that run the real code | ✅ |

### 2.2 Practice (see [modules/02](modules/02-practice.md))
| ID | Requirement | Status |
|---|---|---|
| FR-P1 | Daily challenge: 3 exercises from the learner’s track, the same for everyone that day | ✅ |
| FR-P2 | Review my mistakes: replays wrong answers until answered correctly | ✅ |
| FR-P3 | Timed placement mock tests (7 kinds, 118-question bank) with a score report and weak topics | ✅ |
| FR-P4 | 4 guided projects (portfolio, to-do, quiz game, guessing game) | ✅ |
| FR-P5 | Module practice: new exercises for finished modules plus one spaced-review exercise (Python: 40 exercises) | 🧪 |
| FR-P6 | Module practice for C, DSA, CBSE, Java and the other tracks | 📋 |

### 2.3 Code runner (see [modules/03](modules/03-code-runner.md))
| ID | Requirement | Status |
|---|---|---|
| FR-C1 | Run Python, JavaScript and SQL on the phone and check results with tests | ✅ |
| FR-C2 | Live HTML/CSS/JS page builder with preview | ✅ |
| FR-C3 | Stop runaway code (infinite loops) with a time limit | ✅ |
| FR-C4 | Clear message when Python can’t download offline, and recovery when back online | ✅ |
| FR-C5 | Code playground outside lessons | ✅ |
| FR-C6 | File tabs, saved programs, input(), sharing code | 📋 |
| FR-C7 | Run C and Java (needs a paid code-running server) | 📋 |

### 2.4 Career paths (see [modules/04](modules/04-career-paths.md))
| ID | Requirement | Status |
|---|---|---|
| FR-R1 | 13 career paths, each made of sections and stops | 🧪 |
| FR-R2 | roadmap.sh-style map view and a list view | 🧪 |
| FR-R3 | Each stop shows why it matters, the CodeYatra lessons that teach it, and free outside links | 🧪 |
| FR-R4 | Progress comes from finished lessons plus stops ticked as “I already know this”; optional stops don’t count; a “pick one” choice counts once | 🧪 |
| FR-R5 | Follow one path; it shows on Home with job-ready % and the next stop | 🧪 |
| FR-R6 | Every outside link is checked to open (`scripts/check-path-links.js`) | 🧪 |
| FR-R7 | Sub-topic checklists, “recommended” option, time per stop | 📋 |

### 2.5 Onboarding (see [modules/05](modules/05-onboarding.md))
| ID | Requirement | Status |
|---|---|---|
| FR-O1 | Ask the learner’s name and level, and set a starting track | ✅ |
| FR-O2 | Welcome slides, then questions (who, why, interests, minutes a day) with a progress bar | 🧪 |
| FR-O3 | Recommend a career path from the answers, with “See all paths” | 🧪 |
| FR-O4 | Daily reminder with any time chosen in onboarding | 🧪 |
| FR-O5 | Personal daily goal from minutes a day (10–60 XP) | 🧪 |

### 2.6 Accounts and sync (see [modules/06](modules/06-accounts-and-sync.md))
| ID | Requirement | Status |
|---|---|---|
| FR-A1 | Every lesson works as a guest, offline, without an account | ✅ |
| FR-A2 | Sign in with an email code; progress syncs and merges across phones without losing anything | ✅ |
| FR-A3 | Google sign-in | ⏸ (needs a Google OAuth client in Supabase) |
| FR-A4 | Delete account in the app; all server data is removed | ✅ |
| FR-A5 | A web page explains how to delete an account without the app | ✅ |

### 2.7 League and safety (see [modules/07](modules/07-league-and-safety.md))
| ID | Requirement | Status |
|---|---|---|
| FR-S1 | Weekly league: top 50 by XP this week, resets on Monday | ✅ |
| FR-S2 | Server limits XP gains to 2,000 a day so the league can’t be faked quickly | ✅ |
| FR-S3 | Report a learner (4 reasons) and block a learner; unblock in Account | ✅ (needs schema v1.5) |
| FR-S4 | A profile reported by 3 different learners is hidden until reviewed | ✅ (needs schema v1.5) |
| FR-S5 | Offensive names and bios are refused (English and Hindi) | ✅ |

### 2.8 Certificates (see [modules/08](modules/08-certificates.md))
| ID | Requirement | Status |
|---|---|---|
| FR-T1 | Finishing all modules of a track earns a certificate | ✅ |
| FR-T2 | The server issues certificates only when synced progress shows the track finished | ✅ (needs schema v1.4) |
| FR-T3 | Anyone can verify a certificate on the website; Add to LinkedIn in one tap | ✅ |

### 2.9 Rewards, community, AI, feedback
| ID | Requirement | Status |
|---|---|---|
| FR-W1 | XP and coins per lesson; replays pay 5 XP and no coins; a double tap pays once | ✅ |
| FR-W2 | Streaks, streak freezes (50 coins, hold up to 2), daily goal (20 XP, or personal from onboarding 🧪) | ✅ |
| FR-W3 | Shop with 4 outfits for Yatri | ✅ |
| FR-W4 | Daily reminder at 7 AM, 5 PM, 7 PM or 9 PM | ✅ |
| FR-M1 | Invite codes: both learners get 50 coins | ✅ |
| FR-M2 | Classes: a teacher shares a code and sees students’ progress | ✅ |
| FR-M3 | Share a progress card on WhatsApp and Instagram | ✅ |
| FR-Y1 | Ask Yatri: AI hints (never the full answer), 20 a day per learner | ⏸ (switch on last) |
| FR-F1 | Send feedback from Profile and after each lesson (email with app version and lesson id) | ✅ |
| FR-F2 | Anonymous crash reports and usage events, switchable off | ✅ |
| FR-N1 | Tech news and opportunities section (our own summaries plus links) | 📋 |
| FR-D1 | Dark mode | 📋 |
| FR-AD1 | Rewarded ads (watch to earn coins, streak freezes or hints) after production launch | 📋 |

---

## 3. Non-functional requirements

| ID | Requirement | How it is checked |
|---|---|---|
| NFR-1 **Devices** | Works on Android phones from about ₹8,000; light screens, no heavy libraries | Manual testing on a real phone |
| NFR-2 **Offline** | Lessons, practice and JavaScript/SQL work offline; Python needs one ~10 MB download | Offline recovery test in a browser |
| NFR-3 **Accessibility** | Text contrast at least 4.5:1 (WCAG AA); screen-reader labels; touch targets; the code editor follows system font size up to 1.6× | Contrast tests in the test suite |
| NFR-4 **Privacy** | No ads or trackers today; no data sent for guests except anonymous events; account deletion removes everything | Privacy policy, data safety form |
| NFR-5 **Security** | Row-level security on every table; secrets never in the app; the server checks certificates, XP and reports | SQL tested in a local Postgres (PGlite) |
| NFR-6 **Safety for teens** | 13+ only; report, block and word filter; no personalised ads for under-18s when ads arrive | Play content rating and target audience |
| NFR-7 **Quality** | Every change passes typecheck, lint and the automated tests (815) | `npx tsc --noEmit`, `npx expo lint`, `npx jest` |
| NFR-8 **Content correctness** | Every predicted output, ordered program and solution is run with Node, Python, gcc and sqlite | Content tests |

---

## 4. External interfaces
| System | Used for |
|---|---|
| Supabase | Accounts, sync, league, certificates, reports, classes (database with row-level security) |
| Pyodide (jsDelivr CDN) | Running Python on the phone |
| Anthropic Claude API (via a Supabase Edge Function) | Ask Yatri, when switched on |
| GitHub Pages (`docs/`) | Privacy policy, account deletion page, certificate verification |
| Google Play | Distribution; closed test since 11 Oct 2026 |
| EAS (Expo Application Services) | Cloud builds |

## 5. Constraints and rules
- Ages 13+ only; content and future ads must suit teenagers.
- No salary or job guarantees anywhere in the app.
- Roadmaps are written by us; ideas from roadmap.sh, Mimo and Enki are used only as inspiration, never copied.
- Outside links point only to free, official or well-known resources, and are re-checked with the link script.
- Secrets (API keys, passwords, the service-role key) are entered by the owner in dashboards and never stored in the code.
