# CodeYatra · the final app plan

Agreed with the owner one part at a time, starting 28 Oct 2026. This is the plan the app is built to; when a part changes, it changes here first.

| Part | What | Status |
|---|---|---|
| 1 | First open | ✅ agreed 28 Oct 2026 |
| 2 | Home, roadmap, module complete and Yatri | ✅ agreed 28 Oct 2026 (designs on the canvas, page “v4 · Final plan”) |
| 3 | The lesson screen (interactivity) | ✅ agreed 28 Oct 2026 (playable on the canvas: “Lesson · Python Module 1”) |
| 4 | Reading material (notes) | ✅ agreed 28 Oct 2026 (canvas: “Notes · Python Module 1”) |
| 5 | Module by module content | 🚧 Python Basic 1–12 built in v4 (28 Oct 2026); project and other tracks next |
| 6 | Practice and revision | 📋 |
| 7 | Profile, rewards and Plus | 📋 |

**Kept as decided:** the name stays **CodeYatra** (Forge was considered and dropped on 28 Oct 2026: the name is crowded in tech, and CodeYatra fits Indian learners). The logo stays “cy, leaving footprints” (16 Oct 2026).

**Language rule (28 Oct 2026):** no Hindi words anywhere in the app: plain, simple English only. No Hindi greetings or phrases (“Namaste”, “chalo”, “arre”…), no Devanagari text, no Hindi language switch. Decided 29 Oct 2026: Indian dish names are out too, and example people, places and trains use neutral, professional names (Rosa’s Café, Sutton Classes, Paris, Dublin…). Kept: the brand names CodeYatra and Yatri, real resources (YouTube channels), ₹ and Indian phone and number formats.

---

## Part 1 · First open

**Rule:** five quick taps, then the learner is coding. Anything that only makes sense after trying it comes after the first lesson.

| # | Screen | What it shows |
|---|---|---|
| 1 | **Welcome** | Logo, “Your journey in code”, one line: “Learn to code by doing it, right on your phone.” Buttons: **Start** and **I have an account** (sign in, progress restored, straight to Home). |
| 2 | **Who are you?** | Class 9–10 · Class 11–12 · College · Working or other. Sets the starting level and examples, and tells us if the learner is under 18. |
| 3 | **What do you want?** | Do well in school (CBSE) · Placement and interview prep · Get a job or internship · Build apps or websites · Just curious. |
| 4 | **What do you want to learn?** | 2–3 tracks recommended for the goal at the top; **See all tracks** grouped (School · Programming · Web · Data and placement); **Not sure? Pick for me**; **I know the basics already** (starts at Intermediate where a track has it). Learners pick a **track**, not a module. |
| 5 | **How did you hear about CodeYatra?** | Friend or family · WhatsApp · YouTube · Instagram · LinkedIn · Telegram · Facebook · Teacher, school or college · Play Store search · Google search · An ad · Other (type it). One tap, with **Skip**. |
| 6 | **Module 1 of the chosen track** | Opens straight away. Its first screen has the learner running code (every track’s Module 1 must start with doing, not reading). |

**After the first lesson:**

| # | Screen | What it shows |
|---|---|---|
| 7 | **Daily goal and reminder** | 5 / 10 / 15 / 20 minutes a day; “Remind me at …” (Android asks for notification permission here, not earlier). |
| 8 | **Save your progress** | Sign in with an email code, or **Later**. Under 18: “Ask a parent before you sign in.” The name is asked here, not before. |
| 9 | **Free or Plus** | Only once Plus is built (the last phase). **Continue free** is as big as the Plus button. Under 18: no payment screen, only “Ask a parent to unlock Plus”. |

**Removed from the current onboarding:** the name question before sign-in, the separate “why” and “interest” questions (now one goal question), and the “building your plan” loading screen.

**Behind the scenes:**
- **Python is ready in time.** The Python runtime downloads on first use (from a CDN). Start that download in the background on screen 2, so the first Python lesson opens without a wait; show “Getting Python ready…” only if it isn’t finished. HTML, CSS and JavaScript need no download.
- **Every answer can be changed later** in Profile (level, goal, track, daily goal, reminder).
- **Back works on every screen**, and a progress bar shows screens 2–5.
- **Funnel counts without personal data:** how many people reach each screen and finish the first lesson, and the “how did you hear” answers as totals, so the owner can see where people drop off and which channels work. The Play data safety form is updated if anything new is collected.
- **No fake loaders, no fake counts** (“10,000 students joined today”).

---

## Part 2 · Home

Home answers one question: **what do I do now?** Designs: canvas page “v4 · Final plan” (Home roadmap and module complete; Yatri · moods and reactions).

| Part | What it shows |
|---|---|
| Header | Greeting; the **track name** (tap to switch track); streak; today’s ring (“2/3”). XP moves to Profile and the league. |
| Up next | One big card: next module, what you’ll make, time, progress, one **Continue** button. |
| Today | A checklist of 3: a 2-minute warm-up (revision due), finish a module, a 1-minute daily challenge. Doing one keeps the streak. |
| Your journey | The track’s roadmap: done ✓ with footprints between, **You are here** glowing, locked ahead. Tap a done module to redo it or read its notes. |
| Tabs | Home · Tracks (was Paths; career paths live inside) · Practice · Profile. |

**Removed from Home:** the track-switcher row, the four-card carousel (“For you” and “My path” move to Tracks; daily cards become the warm-up).

**Special cases:** back after a few days → “Welcome back. 2-minute warm-up?” (no guilt); track finished → certificate card and the next suggested track; offline → loaded lessons still work.

**Module complete screen (≈4 s, tap to skip, reduce motion = no movement):** footprints walk to the badge → tick → “<Module>: done” → minutes, % right first try, XP → **You can now** (the module’s 3 goals) → streak +1 → **Next: Module N**, Read notes, Home. Back on Home the footprints walk to the next module.

**Yatri (redesigned 28 Oct 2026):** helmet with a dark visor face, teal eyes, saffron scarf, the logo’s footprints on its chest, backpack, antenna light by mood. Appears **only at moments**, never bobbing on Home:

| Mood | When |
|---|---|
| Happy | a right answer, or a right fix after a mistake |
| Thinking | code taking more than a second to run |
| Celebrate | module, track or certificate finished |
| Encourage | after the second wrong try, with a pointer (never the answer) |
| Welcome back | returning after 3+ days (asleep; wakes when tapped) |
| Coding | small, in Playground and Practice; tap for a hint |

Tap Yatri: it waves and says a short line; eyes follow the finger; it blinks.

**Signature animation:** the logo’s footprints: the short opening animation, and footprints walking on the roadmap when a module is finished. Nowhere else.

---

## Part 3 · The lesson screen

**Rule:** every screen asks the learner to do something, and the answer moves them on (no Next button after an answer). Never more than one plain “read and tap Next” screen in a row. Playable design: canvas page “v4 · Final plan”, “Lesson · Python Module 1”.

| # | Screen | What the learner does |
|---|---|---|
| 1 | Guess first | A two-line story and code; tap a guess before any teaching |
| 2–4 | Learn cards | ≤40 words; the learner drives the animation (run a line, put a value in a box); a one-tap check ends each card |
| 5 | Try it with goals | Change values to hit 2 targets, ticked live |
| 6 | Predict, then run | The program runs itself and stops at key lines to ask what happens next |
| 7 | Spot the bug | Read the real error, tap the broken line, pick the fix, see it run |
| 8 | Match or sort | Pairs, or sort into groups, then Check |
| 9 | Quick check | 2–3 mixed questions: fill the gap, put lines in order, predict the output |
| 10 | Build it | Tap pieces into gaps; checks tick live; the program runs |
| 11 | Recall | 3 flip cards: think first, flip, “I knew it” / “Not yet” (“Not yet” goes to the warm-up) |
| 12 | Module complete | The Part 2 screen |

**Feedback:** right → green tick, one-line reason, moves on by itself. First wrong → a hint, try again. Second wrong → Yatri (encourage), the answer and why, Continue; the item comes back in the warm-up. **No lives or hearts.** “Right first try %” is the score.

**Pilot:** Python Basic Modules 1–3 first, tested on the owner’s phone, then all tracks.

---

## Part 4 · Reading material (notes)

Each module’s notes are its **textbook page**: free, never forced, about a 6-minute read, going deeper than the lesson (the why and the edge cases). Design: canvas “Notes · Python Module 1”.

| # | Section |
|---|---|
| 1 | **In 30 seconds**: the 3 key points (for quick revision) |
| 2 | **Jump to** chips: Explain · Example · Mistakes · Interview · Check · Cheat sheet |
| 3 | **Explained**: 3–5 short sections, every new word defined on first use; **every code block runs, and key values can be changed** |
| 4 | **Worked example**: tap each step to light up its line, then the output |
| 5 | **Common mistakes**: 2–3 real mistakes with the real error message and the fix |
| 6 | **In industry**: where real products use it |
| 7 | **Interview questions**: tap to reveal |
| 8 | **Exam corner** (CBSE track only): a board-style question with the points that earn marks |
| 9 | **Check yourself**: 3 questions; misses go to the warm-up |
| 10 | **Cheat sheet**, with **Save as image** |
| 11 | **Official docs** with the date each link was checked |

Reading comfort: A− / A+ text size, Listen (read aloud), bookmarks per section, **Mark as read** (a tick on the roadmap). A **Notes library with search** lives in the Tracks tab. Writing rules: plain English a Class 9 student can read, short sentences, no Hindi words, every code example run by the tests. A later Plus extra could be downloading a whole track’s notes as a PDF; reading itself stays free.

---

## Part 5 · Module by module content

**How every module is made:** draft in `content-drafts/` (screens table + notes outline, every output run in real Python/JS) → owner OK → build → tests → owner tries it in a test APK.

**Order (one track at a time, best first):**
1. **Python Basic, Modules 1–3 (pilot)** → owner tests on the phone → fix the format if needed.
2. Python Basic 4–12 and the project.
3. HTML, CSS and JavaScript Basic moved to the v4 format (they are already v3, so this is mostly new screen types).
   - **Status (29 Oct 2026):** Python Basic 1–12 and the project are built in v4. **HTML is built in v5** from the owner's full spec: 9 modules of short lessons with Module Challenges, badges and stars, and new screen types (chat, explore, tap to place, live edit, X-ray, arrange…). **CSS is built in v5** too (12 modules, 68 lessons, every W3Schools CSS topic, plus Copy the look and Resize the screen). **JavaScript is built in v5** too (13 modules, 71 lessons, every W3Schools JS topic, with Run and tweak, Predict then run and Tap the page). HTML → CSS → JS now end on one site (Sutton Classes). **The Intermediate levels of HTML, CSS and JavaScript are built in v5** too (6 modules each, 30–31 Oct 2026). **All of Python (Basic, Intermediate, Advanced) is built in v5** too (31 Oct). Every level of HTML, CSS, JavaScript and Python ends with a 20-question final test. **React is built in v5** too (16 modules covering every W3Schools React topic, with live React pages, React notes, a final project and two final tests, 1 Nov). Next: Next.js and the other tracks in v5.
4. The Intermediate levels already drafted (HTML, CSS, JS) in v4 format, then Python Intermediate and Advanced.
5. SQL, then the other tracks by how many learners use them.

**Honest note:** 16 tracks × 12 modules is about 200 modules. At v4 quality that takes months, so every track stays live in its current form until its turn; nothing is hidden or removed.
