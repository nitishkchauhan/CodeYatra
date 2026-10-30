# Web Intermediate (HTML, CSS, JavaScript) in Lesson v5 · content draft

**Status:** approved by the owner (“go”), 30 Oct 2026. HTML Intermediate is built (`src/content/tracks/htmlV5i/`); CSS and JavaScript next. It replaces the three 27 Oct drafts (`html-intermediate.md`, `css-intermediate.md`, `js-intermediate.md`): same topics, now in the Lesson v5 format you tested in Basic, with neutral names.

**What Intermediate adds:** Basic taught each tool. Intermediate is about using them **well, the way real teams do**: pages everyone can use, that load fast on a cheap phone, look good anywhere, and handle real data and real failures.

**Shape (same as Basic):** short lessons (3–5 min) and a Module Challenge per module (5 quick questions + 6 tasks, stars and a badge). **6 modules per track, 3 lessons each**; the last module’s challenge is the track’s **final project**. Total: **54 lessons, 18 challenges**, about 4–5 hours across the three tracks. All the Basic screens are reused (chat, tap to reveal, explore, tap to place, live edit, copy the look, resize the screen, X-ray, run and tweak, predict then run, tap the page, tap the bug, arrange…).

**Story thread (neutral, professional):** the learner joins **Brightline Studio**, a small web agency. **Megan** (team lead), **Arden** (designer) and **Felix** (backend developer) send the “At work” messages: a short chat with a ticket or design to match, then the task. Clients: **Greenfield School** (HTML), the learner’s **own portfolio** (CSS), and **City Travel Desk** (JavaScript). All names are made up.

**Checked like Basic:** every page runs in a test browser; every program’s output, every live-page goal and every project step’s checks are tested (starter fails, solution passes).

---

## HTML Intermediate

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Forms everyone can fill** | 1.1 Group fields: `fieldset`, `legend` · 1.2 Errors that are read out: `aria-describedby`, `aria-invalid` · 1.3 Help phones fill it: `autocomplete`, `inputmode`, `enterkeyhint` | 📝 Form Pro |
| **2 · Responsive images** | 2.1 Several sizes: `srcset` and `sizes` · 2.2 A different picture on phones: `<picture>` · 2.3 No jumping: `width`, `height`, `aspect-ratio` | 🖼 Image Smart |
| **3 · Sites with many pages** | 3.1 Relative paths and folders (`../`) · 3.2 One shared navigation, current page with `aria-current` · 3.3 Planning a real site’s files | 🗺 Site Planner |
| **4 · Telling search engines what the page is** | 4.1 Titles, descriptions and share previews (Open Graph) · 4.2 Structured data (JSON-LD) · 4.3 Canonical links, `robots.txt` and sitemaps | 🔎 Search Ready |
| **5 · Pages that load fast** | 5.1 The three Core Web Vitals, in plain words · 5.2 Lazy images and embeds (`loading="lazy"`, `fetchpriority`) · 5.3 Scripts that don’t block (`defer`, `async`) | ⚡ Speedster |
| **6 · Built-in interactive elements** | 6.1 FAQs with `details` and `summary` · 6.2 Menus and tips with `popover` and `<dialog>` · 6.3 `progress` and `meter` | 🏆 **Final project: the Greenfield School website** (Home, Admissions form, Fees; fast, accessible, search-ready; 4 checked steps) |

New screens used here: **Tap the page** for forms (screen-reader text shown on screen), **Resize the screen** for `srcset`/`<picture>`, and **multi-page preview** (see Decision 1).

## CSS Intermediate

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Layout patterns** | 1.1 Card grids with no media queries (`auto-fit` + `minmax`) · 1.2 Page layouts with grid areas · 1.3 A footer that stays at the bottom | 🧱 Layout Pro |
| **2 · Components that fit anywhere** | 2.1 Smooth sizes with `clamp()` · 2.2 Container queries: a card that changes with its box · 2.3 Media in shape: `aspect-ratio`, `object-fit` | 📦 Fit Anywhere |
| **3 · Motion with a purpose** | 3.1 Multi-step keyframes · 3.2 Staggered entrances with delays · 3.3 Loading skeletons, and respecting reduced motion | 🎬 Motion Designer |
| **4 · Design tokens and themes** | 4.1 Organising variables into tokens · 4.2 Light and dark themes with `data-theme` · 4.3 Who wins: `@layer` | 🎨 Theme Builder |
| **5 · Forms that look good** | 5.1 Consistent inputs, checkboxes and buttons (`accent-color`, `appearance`) · 5.2 Focus rings for keyboard users · 5.3 Show errors only after a mistake (`:user-invalid`, `:has()`) | ✍️ Form Stylist |
| **6 · Responsive navigation** | 6.1 A row on laptops, a toggle on phones · 6.2 A sticky header · 6.3 Skip links | 🏆 **Final project: your own portfolio site** (your name, your projects; layout, themes, motion, form and nav; 4 checked steps) |

New screens used here: **Copy the look** with Arden’s designs, **Resize the screen** for container queries and navigation.

## JavaScript Intermediate

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Working with data** | 1.1 Pipelines: `filter` → `map` → `reduce` · 1.2 Sorting without changing the original (`toSorted`, copies) · 1.3 Grouping (`Object.groupBy`) and checking (`some`, `every`) | 🧮 Data Shaper |
| **2 · Money, dates and text** | 2.1 Money with `Intl.NumberFormat` (₹1,20,000) · 2.2 Dates and times in a chosen time zone (`Intl.DateTimeFormat`) · 2.3 Cleaning and checking what users type | 🌐 Format Pro |
| **3 · Fetch in the real world** | 3.1 Building URLs with `URLSearchParams` · 3.2 Every outcome: loading, success, empty, not found, server error · 3.3 Giving up on slow requests (`AbortController`, timeouts) | 📡 Network Pro |
| **4 · Waiting for many things** | 4.1 Together: `Promise.all` · 4.2 Keep what worked: `Promise.allSettled` · 4.3 Retry with a growing wait | ⏳ Async Pro |
| **5 · Forms with JavaScript** | 5.1 Reading a whole form with `FormData` · 5.2 Your own rules with `setCustomValidity` · 5.3 Errors screen readers announce | ✅ Validator |
| **6 · One source of truth** | 6.1 State in one object · 6.2 `render()`: the page redraws from state · 6.3 Saving state safely in `localStorage` | 🏆 **Final project: “Is my train on time?”** for City Travel Desk (search, show, save, refresh all; 4 checked steps, against the practice server) |

New screens used here: **Run and tweak** and **Predict, then run** for modules 1–2, **Tap the page** with the practice server for modules 3–6 (slow, empty, broken and “flaky” replies).

---

## Decisions for you

1. **Multi-page preview (new engineering, about half a day).** HTML Module 3 and the HTML and CSS projects need the web editor and preview to hold several pages and follow links between them. *Or* keep one page and link to sections (`#admissions`), which is weaker. **I recommend building it.**
2. **Newer CSS features.** Container queries, `:has()`, `:user-invalid`, `@layer` and `popover` work in all current browsers (since 2023–24). Older phones may not show parts of CSS Modules 2, 5 and 6 in the preview, so I’d add a one-line note there. **OK to teach them?**
3. **Practice server for JavaScript.** Lessons use the in-app practice server, extended with train routes (lookup, not found, cancelled, slow, broken, and “flaky”: fails once then works), so they work offline and are always the same. Train numbers are clearly fake (901xx) with a small “Practice data” tag. Plus one optional, unchecked “Try a real API” step. **OK?**
4. **Time zone name.** Showing Indian time correctly needs the standard time-zone id `"Asia/Kolkata"`; it is a technical code, not an example name. **OK to allow just that id** (the names guard would otherwise block it)?
5. **3 lessons per module, 6 modules per track** (54 lessons in all), and the final project as the last module’s challenge. **OK?**
6. **Build order:** HTML, then CSS, then JavaScript, with a test APK after each track. **OK?**
