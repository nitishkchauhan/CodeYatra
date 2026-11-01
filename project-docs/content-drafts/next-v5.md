# Next.js in Lesson v5 · content draft

**Status:** draft for the owner’s OK (1 Nov 2026). Nothing is built yet. Second version: it **follows the owner’s Next.js flow** (12 sections, from “Fundamentals of Next.js” to “Industry Practices”), one module per section, in that order. Once approved it is built on `lesson-v3` in `src/content/tracks/nextV5/`, with tests, like the React track.

**What changes:** today Next.js is 12 long lessons (Lesson v2) and an API project, and learners only see code. In v5 it becomes:
- **12 modules**, one per section of the flow, each with 3–5 short lessons and a Module Challenge;
- a final project;
- **three final tests**: Basic after module 4, Intermediate after module 8 and Advanced at the end;
- **“Read more” notes for every module**;
- **live Next.js pages** in every lesson that can show one: a file list, an address bar and the page itself, which you can tap and change.

**Topic checklist:** the owner’s flow, checked against the official Next.js 16 docs (App Router). W3Schools has no Next.js tutorial. Everything is in our own words with our own examples; nothing is copied.

**For learners who finished React:** every module starts from “what is it?” and where it is used. Examples are **Rosa’s Café** (same café as React) and **Sutton Classes**. Neutral names only.

---

## The modules

**Basic**

| Module (section of the flow) | Lessons | Challenge badge |
|---|---|---|
| **1 · Fundamentals of Next.js** | 1.1 What is Next.js, and what it adds to React (keeps `nx-1`) · 1.2 Features at a glance: routing, server rendering, APIs, images, SEO · 1.3 Project structure and the App Router (`app/`, `public/`, special files) · 1.4 Development workflow: `create-next-app`, `next dev`, `next build`, `next start` | ▲ Next Starter |
| **2 · Routing and Navigation** | 2.1 File-based and nested routes (`page.js`, route groups, private `_folders`) · 2.2 Dynamic routes: `[id]`, catch-all `[...slug]`, `params` (keeps `nx-dyn-1`) · 2.3 Layouts and nested layouts (keeps `nx-layout-1`) · 2.4 Navigation: `<Link>`, `usePathname`, `useRouter`, `redirect` (keeps `nx-link-1`) · 2.5 Error and loading UI: `loading.js`, `error.js`, `not-found.js` (keeps `nx-loading-1`) | 🧭 Route Master |
| **3 · Rendering Strategies** | 3.1 Server-Side Rendering (SSR): a fresh page for each visit (keeps `nx-render-1`) · 3.2 Static Site Generation (SSG) and `generateStaticParams` · 3.3 Incremental Static Regeneration (ISR): static pages that refresh on a timer · 3.4 Client-side rendering, and choosing a strategy | 🏗 Render Planner |
| **4 · Data Fetching** | 4.1 Server Components and Client Components (keeps `nx-data-1`) · 4.2 Server-side fetching with the Fetch API, in `async` components (practice server) · 4.3 Client-side fetching, and streaming slow parts with `<Suspense>` · 4.4 Caching and revalidation: `"use cache"`, `cacheLife`, `revalidatePath`, `revalidateTag` | 📡 Data Fetcher |
| **Final test · Next.js Basics** | 20 quick questions on modules 1–4 | 🎓 Next.js Basics |

**Intermediate**

| Module (section of the flow) | Lessons | Challenge badge |
|---|---|---|
| **5 · API Development** | 5.1 Route Handlers, and what a REST API is (keeps `nx-api-1`) · 5.2 HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` · 5.3 Dynamic Route Handlers (`app/api/dishes/[id]/route.js`) · 5.4 Request and response handling: query strings, headers, the body, status codes | 🔌 API Builder |
| **6 · Forms and Server Actions** | 6.1 Server Actions: `"use server"` and a form’s `action` (keeps `nx-actions-1`) · 6.2 Form handling and validation with `useActionState` and `useFormStatus` · 6.3 File upload: reading a file from `FormData`, checking its size and type · 6.4 Data mutations and optimistic UI with `useOptimistic` | 📝 Form Pro |
| **7 · Authentication and Authorization** | 7.1 Authentication or authorization: who you are, and what you may do (keeps `nx-auth-1`) · 7.2 Session management: cookies and sessions · 7.3 Protected routes · 7.4 Authorization and role-based access control (a Sutton Classes teacher and student) | 🔐 Gatekeeper |
| **8 · Database Integration** | 8.1 Connecting to a database, and environment variables (`.env`, `NEXT_PUBLIC_`) · 8.2 ORM basics: tables as models, queries as code · 8.3 CRUD: create, read, update and delete from Server Components and Server Actions · 8.4 Data validation before anything is saved | 🗄 Data Keeper |
| **Final test · Next.js Intermediate** | 20 quick questions on modules 5–8 | 🎓 Next.js Intermediate |

**Advanced**

| Module (section of the flow) | Lessons | Challenge badge |
|---|---|---|
| **9 · Performance and SEO** | 9.1 SEO fundamentals and the Metadata API: `metadata`, `generateMetadata`, `sitemap.js`, `robots.js` (keeps `nx-meta-1`) · 9.2 Image optimization with `next/image` (and fonts with `next/font`) · 9.3 Code splitting and lazy loading with `next/dynamic` | 🔍 Speed and SEO |
| **10 · Deployment** | 10.1 The production build: what `next build` checks and prints (keeps `nx-deploy-1`) · 10.2 Environment configuration for development, preview and production · 10.3 Deployment platforms: a managed host, your own Node server, Docker, a static export · 10.4 Performance monitoring and error logging (`instrumentation.js`, Web Vitals) | 🚀 Shipper |
| **11 · Advanced Next.js Features** | 11.1 Parallel routes (`@slot` folders) · 11.2 Intercepting routes: open a dish in a pop-up, keep its own page · 11.3 Proxy (`proxy.js`): redirect and rewrite early · 11.4 The Edge and Node.js runtimes · 11.5 Internationalization: a `[lang]` folder and word lists per language | 🧪 Next Expert |
| **12 · Industry Practices** | 12.1 Project architecture: folders by feature, `src/`, keeping files close · 12.2 Component organization: server parts, client parts, shared UI · 12.3 Security best practices: secrets, checking every action, `server-only` · 12.4 Testing overview: unit tests (Vitest or Jest) and end-to-end tests (Playwright) | 🏢 Team Ready |
| **Final project** | **Rosa’s Café online menu** (keeps `nx-project`), 6 checked steps: pages and a shared layout · `/menu/[id]` with not-found · a Route Handler for the menu · a Server Action to place an order, with checks · an owner-only page protected by role · metadata | 🏆 Next.js Pro |
| **Final test · Next.js Advanced** | 20 quick questions across the track, mostly modules 9–12 | 🎓 Next.js |

Each module ends with its Module Challenge in the usual v5 order: 5 quick questions, swipe, pairs, pick the code, fix the bug, X-ray (or trace), then arrange. About 48 lessons in all.

## Sample: Module 2, lesson 2.1 · File-based and nested routes

1. **Yatri (chat):** “In Next.js you don’t write a list of routes. You make folders. `app/menu/page.js` is the page at `/menu`.”
2. **Live app:** the file list shows `app/page.js` and `app/menu/page.js`. Type `/menu` in the address bar and the menu page appears. Goal: open the menu page.
3. **Explore:** tap each file to see which URL it serves; the address bar follows.
4. **Live edit:** add `app/menu/drinks/page.js`; `/menu/drinks` now works. That is a nested route.
5. **Quick check:** “Which file makes `/contact`?” → `app/contact/page.js`.
6. **Fix the bug:** `app/menu/menu.js` gives a 404. Rename it to `page.js`.
7. **Recap:** folders are URL parts · `page.js` makes a folder visitable · `(group)` and `_private` folders don’t change the URL.

---

## Decisions for you

1. **Live Next.js pages (new engineering, about 2 days).** Real Next.js needs a server, so it can’t run on a phone. I would build a small **teaching copy of Next.js** on top of the React already in the app (about 35 KB). It would handle:
   - routing, layouts, dynamic, parallel and intercepting routes, and `params` and `searchParams`;
   - `<Link>`, navigation hooks, `redirect` and `notFound`;
   - `loading.js`, `error.js` and `not-found.js`;
   - Server Components that `await` data, and `"use client"` components with real hooks;
   - Route Handlers, which you call from the page or from a request panel;
   - Server Actions in forms, with `useActionState`, `useOptimistic` and file upload;
   - cookies and sessions, so sign-in and roles really work;
   - `metadata`, shown as the tab title;
   - `proxy.js`;
   - a `[lang]` site.

   For database lessons, a **small practice database** with a simple ORM-style API (for example `db.dish.findMany()`). The lessons say plainly that real apps use an ORM such as Prisma or Drizzle, and show its code.

   Rendering strategies (SSR, SSG, ISR), caching, the Edge runtime, building, deploying and monitoring can’t be shown truly on a phone. Those lessons use a timeline showing when each page is made, plus reveal, predict and code steps. There is no fake running page, and the lessons say what you will see on a computer. **I recommend building it, and the tests run every live page.**
2. **12 modules in your flow’s order**, three levels with a final test each, and notes for every module. **OK?**
3. **One small addition to your flow:** styling (global CSS, CSS Modules, Tailwind) isn’t in it. I’d add it as lesson 1.5 in Fundamentals. **OK?** *Or* leave it out, since the CSS track covers it.
4. **Final project** changes from the student management API (code only) to **Rosa’s Café online menu**, a live app using routes, an API, a Server Action, a database and roles. **OK?**
5. **Old ids kept** (`nx-1`, `nx-dyn-1`, `nx-layout-1` and so on, and `nx-project`), so learners’ progress carries over. Some are no longer the first lesson of their module. **OK?**
