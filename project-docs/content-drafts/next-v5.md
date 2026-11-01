# Next.js in Lesson v5 · content draft

**Status:** draft for the owner’s OK (1 Nov 2026). Nothing is built yet. Once approved it is built on `lesson-v3` in `src/content/tracks/nextV5/`, with tests, like the React track.

**What changes:** today Next.js is 12 long lessons (Lesson v2) and an API project, and learners only see code. In v5 it becomes **14 modules of 3 short lessons and a Module Challenge each**, a final project, **two final tests** (Next.js Basics after module 5, Next.js Intermediate at the end) and **“Read more” notes for every module**. Every lesson has **live Next.js pages**: a file list, an address bar and the page itself, which you can tap and change.

**Topic checklist:** W3Schools has no Next.js tutorial, so the checklist is the official Next.js 16 docs (App Router: every Getting Started chapter, plus the Forms, Authentication, Environment Variables and Testing guides). We write everything in our own words with our own examples. No copying.

**For learners who finished React:** every module starts from “what is it?” and where it is used. Examples are **Rosa’s Café** (same café as React) and **Sutton Classes**. Neutral names only.

---

## The modules

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · What Next.js is** | 1.1 What is Next.js? React plus pages, a server and a build (keeps `nx-1`) · 1.2 Folders become URLs: `page.js` · 1.3 Nested routes, route groups `(shop)` and private `_folders` | ▲ Next Starter |
| **2 · Layouts** | 2.1 A layout wraps its pages (keeps `nx-layout-1`) · 2.2 Nested layouts · 2.3 The root layout, and layouts keep their state | 🧱 Layout Builder |
| **3 · Linking and navigating** | 3.1 `<Link>` instead of `<a>` (keeps `nx-link-1`) · 3.2 Active links with `usePathname` · 3.3 `useRouter` and `redirect()` | 🧭 Navigator |
| **4 · Dynamic routes** | 4.1 `[id]` folders and `params` (keeps `nx-dyn-1`) · 4.2 Catch-all `[...slug]` routes · 4.3 Query strings with `searchParams`, and `generateStaticParams` | 🔗 Route Maker |
| **5 · Styling, images and fonts** | 5.1 Global CSS and CSS Modules (keeps `nx-meta-1`) · 5.2 Tailwind CSS in Next.js · 5.3 `next/image` and `next/font` | 🎨 Page Stylist |
| **Final test · Next.js Basics** | 20 quick questions on modules 1–5 | 🎓 Next.js Basics |
| **6 · Server and Client Components** | 6.1 Server Components by default (keeps `nx-data-1`) · 6.2 `"use client"` and where the line is · 6.3 Passing props across, and server parts inside client parts | 🖥 Boundary Keeper |
| **7 · Loading and errors** | 7.1 `loading.js` (keeps `nx-loading-1`) · 7.2 `error.js` and trying again · 7.3 `notFound()` and `not-found.js` | 🛟 Safety Net |
| **8 · Fetching data** | 8.1 `async` pages that fetch on the server (practice server) · 8.2 Fetching in parallel, not one after another · 8.3 Streaming slow parts with `<Suspense>` | 📡 Data Fetcher |
| **9 · Route Handlers** | 9.1 `route.js` and `GET` (keeps `nx-api-1`) · 9.2 `POST`, reading the body, status codes · 9.3 `[id]` handlers, 400 and 404 | 🔌 API Builder |
| **10 · Server Actions and forms** | 10.1 `"use server"` and a form’s `action` (keeps `nx-actions-1`) · 10.2 Checking input with `useActionState`, and `useFormStatus` · 10.3 Showing new data: `revalidatePath` and `redirect` | 📝 Form Pro |
| **11 · Caching and rendering** | 11.1 Static and dynamic pages (keeps `nx-render-1`) · 11.2 `"use cache"` and `cacheLife` · 11.3 Refreshing on demand: `revalidateTag` and `updateTag` | ⚡ Cache Tuner |
| **12 · Metadata and SEO** | 12.1 `metadata` and `generateMetadata` · 12.2 Title templates and Open Graph images · 12.3 `sitemap.js` and `robots.js` | 🔍 SEO Pro |
| **13 · Secrets, sign-in and proxy** | 13.1 Environment variables and `NEXT_PUBLIC_` (keeps `nx-auth-1`) · 13.2 Cookies, sessions and checking the user near the data · 13.3 `proxy.js`: redirect early (but it is not your security) | 🔐 Gatekeeper |
| **14 · Testing and deploying** | 14.1 `next build`: what it checks and prints (keeps `nx-deploy-1`) · 14.2 Unit tests and end-to-end tests · 14.3 Deploying: a host, a Node server or a static export; setting variables on the host | 🚀 Shipper |
| **Final project** | **Rosa’s Café online menu** (keeps `nx-project`): pages and a shared layout, `/menu/[id]` with not-found, a Route Handler for the menu, a Server Action to place an order with checks, and metadata. 5 checked steps | 🏆 Next.js Pro |
| **Final test · Next.js Intermediate** | 20+ questions on modules 6–14 | 🎓 Next.js |

Each module ends with its Module Challenge in the usual v5 order: 5 quick questions, swipe, pairs, pick the code, fix the bug, X-ray, then arrange.

## Sample: Module 1, lesson 1.2 · Folders become URLs

1. **Yatri (chat):** “In Next.js you don’t write a list of routes. You make folders. `app/menu/page.js` is the page at `/menu`.”
2. **Live app:** the files list shows `app/page.js` and `app/menu/page.js`. Type `/menu` in the address bar; the menu page appears. Goal: open the menu page.
3. **Explore:** tap each file to see which URL it serves; the address bar follows.
4. **Live edit:** add a folder `about` with a `page.js`; `/about` now works.
5. **Quick check:** “Which file makes `/contact`?” → `app/contact/page.js`.
6. **Fix the bug:** `app/menu/menu.js` gives a 404. Rename it to `page.js`.
7. **Recap:** folders are URL parts · `page.js` makes a folder visitable · other files in a folder stay private.

---

## Decisions for you

1. **Live Next.js pages (new engineering, about 1–2 days).** Real Next.js needs a server, so it can’t run on a phone. I would build a small **teaching copy of Next.js** on top of the React already in the app. It would handle:
   - routing, layouts, `[id]` and catch-all routes, and `params` and `searchParams`;
   - `<Link>`, `usePathname`, `useRouter`, `redirect` and `notFound`;
   - `loading.js`, `error.js` and `not-found.js`;
   - Server Components that `await` data from the practice server, and `"use client"` components with real hooks;
   - Route Handlers, which you call from the page or from a request panel;
   - Server Actions in forms, with `useActionState` and `revalidatePath`;
   - `metadata`, shown as the tab title;
   - `proxy.js` redirects.

   I estimate this adds about 30 KB. Caching, images, fonts, building and deploying can’t be shown truly on a phone. Those lessons use reveal, predict and code steps, with no fake “running” page, and the lessons say what you will see on a computer. *Or* keep code only, with no running pages (weaker). **I recommend building it, and the tests run every live page.**
2. **14 modules of 3 lessons** (today’s 12 topics, plus *Fetching data* and *Metadata and SEO* as their own modules), two final tests, and notes for every module. **OK?**
3. **Final project changes** from the student management API (code only) to **Rosa’s Café online menu**, a live Next.js app using pages, a Route Handler and a Server Action. **OK?** *Or* keep the student API.
4. **Old ids kept** for each module’s first lesson and the project, so progress and notes carry over. **OK?**
5. **Left out on purpose** (advanced or rarely used when starting): parallel and intercepting routes, the Pages Router, internationalisation, MDX, and `after()`. **OK?** Say if you want any of them.
