# React in Lesson v5 · content draft

**Status:** approved by the owner (31 Oct 2026: “as per W3Schools or the official documentation, not copied; step by step; an assessment at the end of each module”). **All built** on 31 Oct 2026: 13 modules, the final project and two final tests (React Basics after module 7, React Intermediate at the end, like the other tracks’ levels). Once approved it is built on `lesson-v3` in `src/content/tracks/reactV5/`, with tests, like the HTML, CSS, JavaScript and Python tracks.

**What changes:** today React is 13 long lessons (Lesson v2) and a project, and learners only see code, never a running React page. In v5 it becomes **13 modules of 3 short lessons and a Module Challenge each**, a final project and a **20-question final test**, and every lesson has **live React pages** you can tap and change.

**For learners who know HTML, CSS and JavaScript Basic:** every module starts from “what is it?” and where it is used (most of the apps on your phone have screens built from components like these). Examples are a café ordering app for **Rosa’s Café** (same café as before) and the final project. Neutral names only. Topics are checked against the official React docs (react.dev, React 19) as a checklist, in our own words and examples.

**Checked like the other tracks:** every live page is run in tests with its taps, so each goal can really be reached; every “predict” answer and output is what really happens.

---

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Components and JSX** | 1.1 What is React? Your first component (keeps id `r-comp-1`) · 1.2 JSX rules (one parent, `className`, `{ }`) · 1.3 Building a page from small components | 🧩 Component Maker |
| **2 · Props** | 2.1 Passing props (keeps `r-props`) · 2.2 Default values and destructuring · 2.3 Props are read-only | 📨 Prop Passer |
| **3 · State** | 3.1 `useState` (keeps `r-state-1`) · 3.2 State is a snapshot · 3.3 Several pieces of state | 🔄 State Keeper |
| **4 · Events** | 4.1 Handling clicks (keeps `r-event-1`) · 4.2 Passing handlers as props · 4.3 Event objects and `preventDefault` | 👆 Event Handler |
| **5 · Showing things conditionally** | 5.1 `if`, `&&` and `? :` (keeps `r-cond-1`) · 5.2 Empty, loading and error screens · 5.3 Returning `null` | 🔀 Show and Hide |
| **6 · Lists and keys** | 6.1 `map` to a list (keeps `r-list-1`) · 6.2 Why keys matter · 6.3 Filtering and sorting lists | 📋 List Builder |
| **7 · Forms** | 7.1 Controlled inputs (keeps `r-form`) · 7.2 Several fields in one state · 7.3 Checking a form before sending | 📝 Form Builder |
| **8 · Updating objects and arrays** | 8.1 Copy, don’t change (keeps `r-immut`) · 8.2 Adding, removing and changing items · 8.3 Nested objects | 🧬 Immutable Pro |
| **9 · Composition** | 9.1 `children` (keeps `r-children-1`) · 9.2 Layout components · 9.3 Passing components as props | 🧱 Composer |
| **10 · Sharing state** | 10.1 Lifting state up (keeps `r-lift-1`) · 10.2 One source of truth · 10.3 Keeping state in the right place | 🤝 State Sharer |
| **11 · Effects** | 11.1 `useEffect` (keeps `r-effect-1`) · 11.2 Loading data (practice server) · 11.3 Clean-up, and when you don’t need an effect | ⚡ Effect Expert |
| **12 · Custom hooks** | 12.1 The rules of hooks (keeps `r-hooks-1`) · 12.2 Writing a custom hook · 12.3 `useRef` | 🪝 Hook Crafter |
| **13 · Context and reducers** | 13.1 Context (keeps `r-context-1`) · 13.2 `useReducer` · 13.3 Context + reducer together | 🏆 **Final project: a course enquiry app** (keeps `r-project`; 4 checked steps) |
| **Final test** | 20 quick questions across the track | 🎓 React |

## Sample: Module 1, lesson 1.1 · What is React? Your first component

1. **Yatri (chat):** “React is a JavaScript library for building screens out of small, reusable pieces called components. A menu card, a cart button and a price tag can each be a component.”
2. **Tap to reveal · Where React is used:** web apps · phone apps (React Native, like this app) · dashboards · shops.
3. **Explore (live page):** a `MenuCard` component; tap each line to see which part of the page it draws.
4. **Live edit:** change the dish name and price passed to `<MenuCard>`; the page updates as you tap.
5. **Quick check:** “A component is…” (a function that returns what to show).
6. **Recap:** components are functions · they return JSX · names start with a capital letter.

---

## Decisions for you

1. **Live React pages in lessons (new engineering, about a day).** React is bundled into the app so lesson pages run real React offline (about 200 KB added to the app; it came to 389 KB). The JSX in each lesson is turned into plain JavaScript when the app is built, so phones don’t need extra tools. *Or* keep code only, with no running pages (weaker). **I recommend building it.**
2. **13 modules of 3 lessons**, keeping today’s order and topics, plus the final project and a 20-question final test. **OK?**
3. **Final project:** the course enquiry app stays (4 checked steps), rebuilt in the new format with a live preview. **OK?**
4. **Old ids kept** for each module’s first lesson and the project, so progress and notes carry over. **OK?**
5. **Next.js after React**, the same way. **OK?**

---

## Added on 1 Nov 2026 (owner: “yes go ahead, add both”)

Checked against the W3Schools React tutorial’s topic list. Added, in the same format with live pages and an assessment per module:

| Where | What | Challenge badge |
|---|---|---|
| Module 7 · Forms | 7.4 Text areas, checkboxes and radio buttons | (in 📝 Form Builder) |
| **Styling React** (Basic, after Forms) | Classes and CSS files · The style prop · CSS modules and tidy styles | 🎨 Style Maker |
| Module 13 · Context and reducers | now ends with its own challenge | 🏗 State Architect |
| **Faster React** | memo · useMemo · useCallback (and React Compiler) | 🚀 Speed Tuner |
| **Setting up an app, and routing** | Vite, createRoot, StrictMode · React Router · lazy, Suspense and portals | 🧭 App Builder |
| Final project | its own step at the end | 🏆 React Pro |

Plus **React “Read more” notes**: one step-by-step reference page per module (16).

Left out on purpose (older or niche): class components, higher-order components, forwardRef (React 19 passes ref as a normal prop) and Sass.
