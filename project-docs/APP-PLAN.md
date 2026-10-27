# CodeYatra · the final app plan

Agreed with the owner one part at a time, starting 28 Oct 2026. This is the plan the app is built to; when a part changes, it changes here first.

| Part | What | Status |
|---|---|---|
| 1 | First open | ✅ agreed 28 Oct 2026 |
| 2 | Home | 📋 next |
| 3 | The lesson screen (interactivity) | 📋 |
| 4 | Reading material (notes) | 📋 |
| 5 | Module by module content | 📋 |
| 6 | Practice and revision | 📋 |
| 7 | Profile, rewards and Plus | 📋 |

**Kept as decided:** the name stays **CodeYatra** (Forge was considered and dropped on 28 Oct 2026: the name is crowded in tech, and CodeYatra fits Indian learners). The logo stays “cy, leaving footprints” (16 Oct 2026).

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
