// Module notes for Next.js ("Read more"), one per module, keyed by the module's first lesson. A step-by-step reference
// in our own words, following the owner's Next.js flow and the official Next.js 16 docs. Each worked example is one
// file of a small Next.js app: tests run it with the teaching copy of Next.js and the page must show `output`.
import type { ModuleNotes, NextApp } from '../types';
import { CAFE_LAYOUT } from '../tracks/nextV5/apps';
import { AUTH_APP } from '../tracks/nextV5/auth';

const lines = (files: Record<string, string | string[]>) => Object.fromEntries(Object.entries(files).map(([k, v]) => [k, Array.isArray(v) ? v.join('\n') : v]));
const nextApp = (edit: string, url: string, files: Record<string, string | string[]> = {}): NextApp => ({ files: lines(files), url, edit });
const LAYOUT = { 'app/layout.js': CAFE_LAYOUT };

export const NEXT_NOTES: Record<string, ModuleNotes> = {
  'nx-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'What Next.js is', body: 'Next.js is a framework built on React. React draws the parts of a screen; Next.js adds what a whole website needs: pages with their own addresses, code that runs on a server, ways to load data quickly, an API in the same project, and ready-made tools for images, fonts and search engines. Shops, dashboards, blogs and course sites are built with it.' },
      { heading: 'The App Router', body: 'Routes live in the app/ folder. Each folder is one part of the address, and a file called page.js makes it a page you can visit, so app/menu/page.js is /menu. Other special names do other jobs: layout.js wraps pages, loading.js and error.js handle waiting and failures, and route.js answers with data. Files in public/ are served as they are.', code: ['app/page.js          → /', 'app/menu/page.js     → /menu', 'public/logo.png      → /logo.png'] },
      { heading: 'The workflow', body: 'npx create-next-app@latest makes a project. npm run dev starts a development server at localhost:3000 that updates the page as you save (Fast Refresh) and prints each request, like GET /menu 200. npm run build checks everything and prepares the site, and npm run start runs the built site the way a host does.' },
      { heading: 'Styling', body: 'Import a global stylesheet once, in the root layout. For styles that belong to one component, use a CSS Module: page.module.css, imported as styles, with className={styles.price}; its class names are made unique so they never clash. Many teams use Tailwind CSS instead, which create-next-app can set up for you.' },
    ],
    example: {
      title: 'A first page inside a layout',
      code: ['export const metadata = { title: "Menu" };', '', 'export default function Menu() {', '  return (', '    <>', '      <h1>Our menu</h1>', '      <ul>', '        <li>Lemon Tea · ₹40</li>', '        <li>Cheese Toast · ₹80</li>', '      </ul>', '    </>', '  );', '}'],
      walk: [
        { line: 1, text: 'The page’s title; the layout adds “ · Rosa’s Café”.' },
        { line: 3, text: 'A page is a React component, exported as the default.' },
        { line: 6, text: 'What the page shows, inside the layout’s header.' },
      ],
      next: nextApp('app/menu/page.js', '/menu', LAYOUT),
      output: ['HomeMenu', 'Our menu', 'Lemon Tea · ₹40', 'Cheese Toast · ₹80'],
    },
    industry: 'Next.js is one of the most used ways to build React websites. Teams like that one project holds the pages, the server code and the API, and that pages can be made ahead of time or on demand. Hosts like Vercel and Netlify run it with almost no set-up, and it also runs on any Node.js server.',
    interview: [
      { q: 'What does Next.js add to React?', a: 'File-based routing, server rendering and static generation, Route Handlers for APIs, Server Actions, and built-in image, font and metadata tools.' },
      { q: 'How does the App Router map files to URLs?', a: 'Each folder in app/ is a URL part, and page.js makes it a page. Brackets make dynamic parts.' },
      { q: 'What is the difference between npm run dev and npm run build?', a: 'dev runs a development server that updates as you save; build checks and prepares the site for real visitors.' },
    ],
    cheat: [
      { code: 'app/menu/page.js', meaning: 'the page at /menu' },
      { code: 'app/layout.js', meaning: 'wraps every page' },
      { code: 'npm run dev', meaning: 'development server' },
      { code: 'npm run build', meaning: 'production build' },
      { code: 'className={styles.x}', meaning: 'a CSS Module class' },
    ],
  },

  'nx-route-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Nested and grouped routes', body: 'Folders inside folders make longer addresses: app/menu/drinks/page.js is /menu/drinks. A folder name in brackets, like (shop), is a route group: it organises files but never appears in the URL. A folder starting with an underscore, like _lib, is private: nothing in it becomes a page.' },
      { heading: 'Dynamic routes', body: 'A folder named [id] matches any value in that part of the address, so one page file serves every dish. The page gets params, a Promise in Next.js 16: await it, then read id, which is always text. [...slug] catches every part after it as an array, and [[...slug]] also matches nothing at all.', code: ['const { id } = await params;', 'const dish = await getDish(Number(id));'] },
      { heading: 'Layouts and navigation', body: 'layout.js wraps the pages in its folder through {children}. The root layout has <html> and <body>. Layouts stay on screen and keep their state as you move between pages. Link from next/link moves without reloading; usePathname tells a Client Component the current address; useRouter moves in code; redirect() sends visitors elsewhere from the server.' },
      { heading: 'Loading, errors and missing pages', body: 'loading.js shows at once while a page in its folder loads. error.js, which must be a Client Component, catches errors in its folder and gets error and reset. Calling notFound() in a page shows not-found.js with a 404, and so does an address that matches nothing.' },
    ],
    example: {
      title: 'One page for every dish',
      code: ['import { notFound } from "next/navigation";', 'import { db } from "@/lib/db";', '', 'export default async function Dish({ params }) {', '  const { id } = await params;', '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });', '  if (!dish) notFound();', '  return <h1>{dish.name} · ₹{dish.price}</h1>;', '}'],
      walk: [
        { line: 4, text: 'An async page; it gets params from the [id] folder.' },
        { line: 5, text: 'Await params, then read id ("2").' },
        { line: 6, text: 'Look the dish up, turning the id into a number.' },
        { line: 7, text: 'No such dish: a 404 page.' },
      ],
      next: nextApp('app/menu/[id]/page.js', '/menu/2', LAYOUT),
      output: ['HomeMenu', 'Cold Coffee · ₹90'],
    },
    industry: 'Every real site has nested sections, one page per product or article, shared headers, and friendly error pages. Teams use route groups to keep big apps tidy, layouts for headers and sidebars, and loading.js and error.js so a slow or broken part never blanks the whole site.',
    interview: [
      { q: 'How do you make one page for every product?', a: 'A dynamic folder like app/products/[id]/page.js, reading await params.' },
      { q: 'What does a (group) folder do?', a: 'Organises routes, and can give them their own layout, without changing the URL.' },
      { q: 'Why must error.js be a Client Component?', a: 'It handles the error in the browser and offers reset() to try again.' },
    ],
    cheat: [
      { code: '[id]', meaning: 'one dynamic part' },
      { code: '[...slug]', meaning: 'every part after it' },
      { code: '(group)', meaning: 'no URL change' },
      { code: '<Link href>', meaning: 'move without reloading' },
      { code: 'notFound()', meaning: 'show the 404 page' },
    ],
  },

  'nx-render-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Rendering', body: 'Rendering turns components into the HTML a browser shows. Next.js can do it at different times: once when the site is built, again on each request, or in the browser. Each page can choose. The rule of thumb: static when you can, dynamic when you must.' },
      { heading: 'SSG and ISR', body: 'Static site generation (SSG) makes a page once, at build time, and serves the same HTML to everyone. It is the default for pages that use nothing per-visit. generateStaticParams pre-builds dynamic pages. Incremental static regeneration (ISR) remakes a static page later: after a time with export const revalidate = 60, or on demand with revalidatePath after a change.' },
      { heading: 'SSR', body: 'Server-side rendering (SSR) makes the page on the server for every request. A page becomes dynamic when it reads something that differs per visit: cookies(), headers(), searchParams, connection(), or fetch with cache: "no-store". Use it for account pages and anything that must always be fresh.', code: ['const store = await cookies();', 'const name = store.get("name")?.value;'] },
      { heading: 'CSR', body: 'Client-side rendering (CSR) sends a nearly empty page; a Client Component then fetches data in the browser, with useEffect. It suits very interactive parts that change after taps, like a live tracker, but the first HTML has no content, which is weaker for search engines.' },
    ],
    example: {
      title: 'A page made once, at build time',
      code: ['export function generateStaticParams() {', '  return [{ id: "1" }, { id: "2" }];', '}', '', 'export const dynamicParams = false;', '', 'export default async function Dish({ params }) {', '  const { id } = await params;', '  return <h1>Dish {id}, made at build time</h1>;', '}'],
      walk: [
        { line: 1, text: 'List the pages to build ahead of time.' },
        { line: 5, text: 'Any other id is a 404.' },
        { line: 9, text: 'Nothing per-visit here, so the page is static.' },
      ],
      next: nextApp('app/menu/[id]/page.js', '/menu/2', LAYOUT),
      output: ['HomeMenu', 'Dish 2, made at build time'],
    },
    industry: 'Most sites mix strategies: marketing pages and docs are static, product lists use ISR, account pages are dynamic, and dashboards add client-side parts. The build output marks each route as static (○), pre-built (●) or dynamic (ƒ), which teams check to keep pages fast.',
    interview: [
      { q: 'What is the difference between SSG and SSR?', a: 'SSG makes the page once at build time; SSR makes it on the server for each request.' },
      { q: 'What is ISR?', a: 'A static page that is remade after a set time or on demand, without rebuilding the whole site.' },
      { q: 'What makes a Next.js page dynamic?', a: 'Using per-request data: cookies(), headers(), searchParams, connection() or uncached fetches.' },
    ],
    cheat: [
      { code: 'generateStaticParams', meaning: 'pre-build dynamic pages' },
      { code: 'export const revalidate = 60', meaning: 'remake after 60 s' },
      { code: 'revalidatePath("/menu")', meaning: 'remake now' },
      { code: 'await cookies()', meaning: 'makes the page dynamic' },
    ],
  },

  'nx-data-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Server and Client Components', body: 'Every component in app/ is a Server Component unless its file starts with "use client". Server Components run on the server, can be async, read the database and secrets, and send no JavaScript to the browser. Client Components add state, events and browser features. Pass them plain data, never functions (except Server Actions), and keep them small.' },
      { heading: 'Fetching on the server', body: 'An async Server Component awaits its data and then returns the page, so the HTML arrives filled in. Use fetch for other services, or the database directly. Check res.ok, because fetch does not throw on a 404 or 500. Start independent requests together with Promise.all.', code: ['const [menu, students] = await Promise.all([', '  getMenu(),', '  db.student.findMany(),', ']);'] },
      { heading: 'Streaming and client fetching', body: 'Wrap a slow part in <Suspense fallback={…}>: the rest of the page is sent at once and the slow part streams in when ready. loading.js does the same for a whole route. For data that changes after taps, a Client Component can fetch in the browser with useEffect.' },
      { heading: 'Caching', body: 'In Next.js 16 you cache on purpose. With cacheComponents: true in next.config.js, put "use cache" at the top of a function or component to keep its result. cacheLife sets how long it stays fresh and cacheTag names it. After a change, updateTag (in a Server Action) or revalidateTag refreshes it. Never cache per-visitor data for everyone.' },
    ],
    example: {
      title: 'Server data, one client island',
      code: ['import { db } from "@/lib/db";', 'import Star from "./Star";', '', 'export default async function Drinks() {', '  const drinks = await db.dish.findMany({ where: { category: "Drinks" } });', '  return (', '    <ul>', '      {drinks.map((d) => <li key={d.id}>{d.name} <Star /></li>)}', '    </ul>', '  );', '}'],
      walk: [
        { line: 1, text: 'A Server Component can use the database.' },
        { line: 5, text: 'Await the data before drawing.' },
        { line: 8, text: 'Star is the only Client Component.' },
      ],
      next: nextApp('app/drinks/page.js', '/drinks', { ...LAYOUT, 'app/drinks/Star.js': ['"use client";', 'import { useState } from "react";', '', 'export default function Star() {', '  const [on, setOn] = useState(false);', '  return <button onClick={() => setOn(!on)}>{on ? "★" : "☆"}</button>;', '}'] }),
      output: ['HomeMenu', 'Lemon Tea ☆', 'Cold Coffee ☆'],
    },
    industry: 'Teams fetch on the server by default, stream slow widgets with Suspense, and keep client code to small interactive parts. Caching is chosen per function, tagged, and refreshed from Server Actions, so pages stay fast without showing stale data after a change.',
    interview: [
      { q: 'When do you need "use client"?', a: 'For state, effects, event handlers or browser APIs. Everything else can stay a Server Component.' },
      { q: 'How do you avoid a request waterfall?', a: 'Start independent requests together with Promise.all, and stream slow parts with Suspense.' },
      { q: 'How do you refresh cached data after a change?', a: 'Tag it with cacheTag, then call updateTag or revalidateTag (or revalidatePath).' },
    ],
    cheat: [
      { code: '"use client"', meaning: 'a Client Component' },
      { code: 'async function Page()', meaning: 'fetch on the server' },
      { code: '<Suspense fallback>', meaning: 'stream a slow part' },
      { code: '"use cache"', meaning: 'cache a result' },
      { code: 'updateTag("x")', meaning: 'refresh tagged data' },
    ],
  },

  'nx-api-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Route Handlers', body: 'A file named route.js inside app/ answers requests with data instead of a page. Export a function named after each HTTP method it handles: GET, POST, PUT, PATCH or DELETE. A method with no function gets 405. A folder can have a page.js or a route.js, not both.' },
      { heading: 'REST', body: 'REST gives each kind of thing an address and uses methods for actions: GET /api/dishes reads the list, POST adds, GET, PATCH or DELETE /api/dishes/2 work on one dish. Data travels as JSON. Status codes say what happened: 200 OK, 201 created, 204 no content, 400 bad input, 401 sign in, 403 not allowed, 404 not found.' },
      { heading: 'Dynamic handlers', body: 'app/api/dishes/[id]/route.js serves every dish. The handler’s second argument holds params, a Promise: await it and turn the id into a number. Answer 404 with a clear message when the item doesn’t exist.', code: ['export async function GET(request, { params }) {', '  const { id } = await params;'] },
      { heading: 'Requests and responses', body: 'request.nextUrl.searchParams reads the query, await request.json() reads a JSON body (it throws on bad JSON, so catch it and answer 400), and request.headers and request.cookies are there too. Reply with Response.json(data, { status, headers }), or new Response(null, { status: 204 }) for no body.' },
    ],
    example: {
      title: 'A filtered list as JSON',
      code: ['import { db } from "@/lib/db";', '', 'export async function GET(request) {', '  const max = Number(request.nextUrl.searchParams.get("max") ?? 1000);', '  const dishes = await db.dish.findMany({ where: { price: { lte: max } } });', '  return Response.json(dishes.map((d) => d.name));', '}'],
      walk: [
        { line: 3, text: 'GET answers reads.' },
        { line: 4, text: 'The query ?max=80 arrives as text.' },
        { line: 5, text: 'Only dishes up to that price.' },
        { line: 6, text: 'Send the names as JSON.' },
      ],
      next: nextApp('app/api/dishes/route.js', '/api/dishes?max=80'),
      output: ['[', '"Lemon Tea",', '"Cheese Toast"', ']'],
    },
    industry: 'Route Handlers power mobile apps, webhooks from payment providers, and partners that need your data. Teams validate every input, use the right status codes, and keep handlers thin by calling shared feature code. For the site’s own forms, Server Actions are often simpler.',
    interview: [
      { q: 'How do you make a POST endpoint in the App Router?', a: 'Export async function POST(request) from a route.js file, read await request.json(), and return Response.json.' },
      { q: 'What is the difference between 401 and 403?', a: '401: not signed in. 403: signed in but not allowed.' },
      { q: 'What happens if route.js has no PUT export?', a: 'Next.js answers 405 Method Not Allowed.' },
    ],
    cheat: [
      { code: 'export async function GET()', meaning: 'answer reads' },
      { code: 'await request.json()', meaning: 'the JSON body' },
      { code: 'searchParams.get("q")', meaning: 'a query value' },
      { code: 'Response.json(d, { status: 201 })', meaning: 'JSON with a status' },
    ],
  },

  'nx-actions-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Server Actions', body: 'A Server Action is a function that runs on the server but can be called from the page. Mark it with "use server", either as its first line or at the top of a file of actions. Give it to a form’s action and the form’s FormData is sent to it; no API route needed. It can also be called from a button inside startTransition.' },
      { heading: 'Checking forms', body: 'useActionState gives the action’s answer back to the form, so it can show errors or a thank-you; the action then gets (previous, formData). useFormStatus lets a button show “Sending…”. Browser checks give quick hints, but always check again in the action: anyone can call it directly.', code: ['const [state, formAction] = useActionState(save, { error: "" });'] },
      { heading: 'Files', body: 'A file input sends a File: formData.get("photo") has name, type and size. Check the type and size on the server, then store the bytes in cloud storage, not public/, and keep only details in the database. Server Actions accept 1 MB by default; bodySizeLimit raises it.' },
      { heading: 'After a change', body: 'Call revalidatePath or updateTag so pages show the new data, or redirect to move on. useOptimistic shows the result at once, as if it worked, while the action runs, and the real data replaces it.' },
    ],
    example: {
      title: 'An order form with a Server Action',
      code: ['import { revalidatePath } from "next/cache";', 'import { db } from "@/lib/db";', '', 'export default async function Orders() {', '  const orders = await db.order.findMany();', '  async function place(formData) {', '    "use server";', '    await db.order.create({ data: { dish: formData.get("dish") } });', '    revalidatePath("/orders");', '  }', '  return (', '    <form action={place}>', '      <input name="dish" defaultValue="Lemon Tea" />', '      <button>Order</button>', '      <p>{orders.length} orders so far</p>', '    </form>', '  );', '}'],
      walk: [
        { line: 6, text: 'A function inside the page…' },
        { line: 7, text: '…that runs on the server.' },
        { line: 8, text: 'Read the form field and save it.' },
        { line: 9, text: 'Make the page again with the new order.' },
        { line: 12, text: 'The form calls the action.' },
      ],
      next: nextApp('app/orders/page.js', '/orders', LAYOUT),
      output: ['HomeMenu', 'Order', '0 orders so far'],
    },
    industry: 'Server Actions have become the usual way to handle forms in Next.js: sign-up, checkout, settings, admin edits. Teams keep them in actions.js files next to the feature, validate with a schema library like Zod, check the user in each one, and pair them with useActionState and useOptimistic for a smooth feel.',
    interview: [
      { q: 'What is a Server Action?', a: 'An async function marked "use server" that runs on the server and can be called from forms or client code.' },
      { q: 'Why validate inside Server Actions?', a: 'They are public endpoints; anyone can call them without the form.' },
      { q: 'How does a form show the action’s error message?', a: 'With useActionState: the action returns a state that the form renders.' },
    ],
    cheat: [
      { code: '"use server"', meaning: 'a Server Action' },
      { code: '<form action={fn}>', meaning: 'send the form to it' },
      { code: 'useActionState', meaning: 'the action’s answer' },
      { code: 'useFormStatus', meaning: 'sending or not' },
      { code: 'useOptimistic', meaning: 'show it now' },
    ],
  },

  'nx-auth-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Two questions', body: 'Authentication asks who you are: signing in with a password, a code or another account. Authorization asks what you may do: an owner can change prices, a customer can’t. Store password hashes made with bcrypt or argon2, never passwords, and answer “wrong email or password” without saying which.' },
      { heading: 'Sessions', body: 'After signing in, the server makes a long random token, remembers which user it belongs to, and sets it in a cookie with httpOnly (page scripts can’t read it), secure (HTTPS only), sameSite and maxAge. Each request sends the cookie; getUser() looks it up. Signing out deletes both. Libraries such as Auth.js, Better Auth or Clerk do much of this.' },
      { heading: 'Protected routes', body: 'proxy.js can redirect visitors without a session cookie to /login early, but it only sees the cookie. The real check belongs close to the data: in each page, Server Action and Route Handler, using the real user. A layout check does not protect actions.', code: ['const user = await getUser();', 'if (!user) redirect("/login");'] },
      { heading: 'Roles', body: 'Role-based access control gives each user a role and checks it before showing or changing anything. Pages show an “owners only” message; actions stop before touching data; APIs answer 401 when not signed in and 403 when not allowed.' },
    ],
    example: {
      title: 'An owner-only page',
      code: ['import { redirect } from "next/navigation";', 'import { getUser } from "@/lib/session";', '', 'export default async function Admin() {', '  const user = await getUser();', '  if (!user) redirect("/login");', '  if (user.role !== "owner") return <p>Only the owner can see this page.</p>;', '  return <h1>Owner area</h1>;', '}'],
      walk: [
        { line: 5, text: 'Find the signed-in user from the session cookie.' },
        { line: 6, text: 'Nobody signed in: go to /login.' },
        { line: 7, text: 'Signed in, but not the owner.' },
      ],
      next: nextApp('app/admin/page.js', '/admin', AUTH_APP),
      output: ['HomeMenu', 'Sign in', 'Email', 'Password', 'Sign in'],
    },
    industry: 'Almost every product has accounts and roles. Teams usually adopt an auth library or service, keep sessions in secure cookies, and write a small data access layer that checks the user and role in every query and action, so a forgotten check in one page can’t leak data.',
    interview: [
      { q: 'What is the difference between authentication and authorization?', a: 'Authentication confirms who someone is; authorization decides what they may do.' },
      { q: 'Why httpOnly cookies for sessions?', a: 'Page scripts can’t read them, so an XSS bug can’t steal the session.' },
      { q: 'Is proxy.js enough to protect a page?', a: 'No. It is a quick early redirect; pages, actions and APIs must check the real user.' },
    ],
    cheat: [
      { code: 'httpOnly, secure, sameSite', meaning: 'safe session cookie' },
      { code: 'redirect("/login")', meaning: 'not signed in' },
      { code: 'user.role !== "owner"', meaning: 'a role check' },
      { code: '401 / 403', meaning: 'sign in / not allowed' },
    ],
  },

  'nx-db-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Connecting', body: 'Real data lives in a database such as PostgreSQL or MySQL. The address and password go in an environment variable like DATABASE_URL, in .env.local on your computer and in the host’s settings in production. Only NEXT_PUBLIC_ variables reach the browser, so never give secrets that prefix. Create one database client for the whole app.' },
      { heading: 'ORMs', body: 'An ORM lets you describe tables as models and query them with code. Prisma and Drizzle are popular with Next.js. Queries read like findMany({ where, orderBy, take }), findUnique, count, create, update and delete, with autocomplete and fewer mistakes than hand-written SQL.', code: ['await db.dish.findMany({', '  where: { veg: true },', '  orderBy: { price: "asc" },', '});'] },
      { heading: 'CRUD in Next.js', body: 'Read in Server Components while drawing. Create, update and delete in Server Actions or Route Handlers, then call revalidatePath so pages show the change. Form values arrive as text, so turn ids and numbers into numbers first.' },
      { heading: 'Validation', body: 'A database only checks types. Check everything else before saving: length, allowed values, ranges. Return every problem at once, and save nothing until all pass. Libraries like Zod describe the rules once for the form and the action.' },
    ],
    example: {
      title: 'Reading with a query',
      code: ['import { db } from "@/lib/db";', '', 'export default async function Veg() {', '  const dishes = await db.dish.findMany({', '    where: { veg: true },', '    orderBy: { price: "desc" },', '    take: 2,', '  });', '  return <ol>{dishes.map((d) => <li key={d.id}>{d.name} · ₹{d.price}</li>)}</ol>;', '}'],
      walk: [
        { line: 4, text: 'Many rows…' },
        { line: 5, text: '…only veg dishes…' },
        { line: 6, text: '…most expensive first…' },
        { line: 7, text: '…at most two.' },
      ],
      next: nextApp('app/veg/page.js', '/veg', LAYOUT),
      output: ['HomeMenu', 'Cold Coffee · ₹90', 'Veg Sandwich · ₹90'],
    },
    industry: 'Teams pick an ORM, keep the schema in the repository, change it with migrations, and keep all queries in a data layer that checks permissions. Secrets stay in the host’s environment settings, and every write is validated on the server first.',
    interview: [
      { q: 'Why is NEXT_PUBLIC_DATABASE_URL a mistake?', a: 'NEXT_PUBLIC_ values are copied into the browser code, so every visitor could read the password.' },
      { q: 'What does an ORM give you?', a: 'Models for tables and queries as typed code, with autocomplete and migrations.' },
      { q: 'Where should data be validated?', a: 'On the server, in the Server Action or Route Handler, before it is saved.' },
    ],
    cheat: [
      { code: 'process.env.DATABASE_URL', meaning: 'server-only secret' },
      { code: 'findMany / findUnique', meaning: 'read rows' },
      { code: 'create / update / delete', meaning: 'change rows' },
      { code: 'Number(formData.get("id"))', meaning: 'text to number' },
    ],
  },

  'nx-meta-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'SEO and metadata', body: 'Search engines read each page’s title and description. Export a metadata object from a page or layout, or generateMetadata when it depends on data. A title template in the root layout, like "%s · Rosa’s Café", adds the site name to every page title. openGraph sets the picture and text shown when links are shared.' },
      { heading: 'Sitemaps and robots', body: 'app/sitemap.js returns a list of your pages, even ones from the database, served at /sitemap.xml. app/robots.js says what search engines may visit, served at /robots.txt. Real headings, server-rendered HTML and fast pages help too.' },
      { heading: 'Images and fonts', body: 'next/image resizes pictures for each screen, uses modern formats, loads them lazily and keeps space for them; it needs alt and width with height (or fill). next/font downloads fonts at build time and serves them from your own site, with no flash of the wrong font.', code: ['<Image src="/dish.svg" alt="Mango sago" width={400} height={260} />'] },
      { heading: 'Code splitting', body: 'Each route only downloads its own JavaScript. Server Components send none at all. next/dynamic loads a heavy Client Component, like a chart, only when it is first drawn, with a loading placeholder meanwhile.' },
    ],
    example: {
      title: 'A title from the data',
      code: ['import { db } from "@/lib/db";', '', 'export async function generateMetadata({ params }) {', '  const { id } = await params;', '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });', '  return { title: dish.name, description: "Fresh " + dish.name + " at Rosa’s Café." };', '}', '', 'export default async function Dish({ params }) {', '  const { id } = await params;', '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });', '  return <h1>{dish.name}</h1>;', '}'],
      walk: [
        { line: 3, text: 'generateMetadata gets params like the page.' },
        { line: 6, text: 'The tab shows “Cheese Toast · Rosa’s Café”.' },
        { line: 12, text: 'The page itself.' },
      ],
      next: nextApp('app/menu/[id]/page.js', '/menu/3', LAYOUT),
      output: ['HomeMenu', 'Cheese Toast'],
    },
    industry: 'Search traffic and shared links matter to almost every public site. Teams generate titles, descriptions and Open Graph images from data, publish sitemaps, and track Core Web Vitals, where next/image, next/font and lazy loading make a measurable difference.',
    interview: [
      { q: 'How do you give each product page its own title?', a: 'Export generateMetadata, which can read params and data and return { title, description }.' },
      { q: 'Why does next/image need width and height?', a: 'To reserve space so the layout doesn’t jump while the picture loads.' },
      { q: 'What does next/dynamic do?', a: 'Splits a component into its own file that downloads only when it is drawn.' },
    ],
    cheat: [
      { code: 'export const metadata', meaning: 'fixed title' },
      { code: 'generateMetadata', meaning: 'title from data' },
      { code: 'app/sitemap.js', meaning: '/sitemap.xml' },
      { code: '<Image alt width height>', meaning: 'optimised picture' },
      { code: 'dynamic(() => import(…))', meaning: 'load later' },
    ],
  },

  'nx-deploy-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'The production build', body: 'npm run build compiles the app, checks types and lint, and makes static pages ahead of time. If it fails, nothing is deployed. The route table marks each route ○ static, ● pre-built or ƒ dynamic, with the JavaScript each page downloads. npm run start then runs the built site.' },
      { heading: 'Environments', body: 'Development runs on your computer, preview deploys check each branch online, and production is the real site. .env files hold local values; production secrets live in the host’s settings. NEXT_PUBLIC_ values are fixed at build time, so changing one needs a new build. next.config.js holds options like cacheComponents and allowed image hosts.' },
      { heading: 'Where to deploy', body: 'A managed host like Vercel or Netlify builds and deploys every push. Your own Node.js server runs npm run start. output: "standalone" makes a small server for Docker. output: "export" makes plain files for any host, but with no server: no Server Actions, cookies or dynamic pages.' },
      { heading: 'Monitoring', body: 'error.js shows visitors a kind message and can report the error. instrumentation.js runs register when the server starts and onRequestError for every server error, to send details to a logging service. useReportWebVitals measures speed: LCP, INP and CLS.', code: ['export async function onRequestError(error, request) {', '  await sendToLogs(error.message, request.path);', '}'] },
    ],
    example: {
      title: 'An error page that reports',
      code: ['"use client";', 'import { useEffect } from "react";', '', 'export default function Error({ error }) {', '  useEffect(() => {', '    console.log("Reported: " + error.message);', '  }, [error]);', '  return <p>Sorry, something went wrong. We have been told.</p>;', '}'],
      walk: [
        { line: 1, text: 'error.js is a Client Component.' },
        { line: 6, text: 'Send the details to monitoring (here, the console).' },
        { line: 8, text: 'Visitors see a calm message, never a stack trace.' },
      ],
      next: nextApp('app/kitchen/error.js', '/kitchen', { ...LAYOUT, 'app/kitchen/page.js': ['export default function Kitchen() {', '  throw new Error("Oven offline");', '}'] }),
      output: ['HomeMenu', 'Sorry, something went wrong. We have been told.'],
    },
    industry: 'Teams deploy from Git with preview links for every pull request, keep secrets in the host, and wire up error tracking (often Sentry) and speed monitoring before launch, so problems are seen in minutes rather than reported by users days later.',
    interview: [
      { q: 'What does the ƒ symbol mean in the build output?', a: 'The route is dynamic: made on each request.' },
      { q: 'Why might a changed NEXT_PUBLIC_ variable not show?', a: 'It is copied into the code at build time; you must build again.' },
      { q: 'When can’t you use output: "export"?', a: 'When you need a server: Server Actions, cookies, dynamic rendering or Route Handlers with request data.' },
    ],
    cheat: [
      { code: 'npm run build && npm run start', meaning: 'run the built site' },
      { code: 'output: "standalone"', meaning: 'Docker-friendly' },
      { code: 'output: "export"', meaning: 'static files only' },
      { code: 'onRequestError', meaning: 'log server errors' },
    ],
  },

  'nx-par-1': {
    minutes: 7,
    lang: 'jsx',
    sections: [
      { heading: 'Parallel routes', body: 'A folder starting with @, like @orders, is a slot. The layout beside it receives each slot as a prop and places it. Slots don’t change the URL, and each can have its own loading.js and error.js, so a dashboard’s parts load and fail independently. default.js fills a slot with no matching page.' },
      { heading: 'Intercepting routes', body: 'An intercepting route shows a different file when you move to an address inside the site. Paired with a @modal slot, app/@modal/(.)menu/[id]/page.js opens a dish in a pop-up over the menu, while opening /menu/2 directly shows the full page. (.) is the same level, (..) one up, (...) from app/.' },
      { heading: 'Proxy and runtimes', body: 'proxy.js (middleware.js before Next.js 16) runs before matching requests: redirect changes the address, rewrite shows another page at the same address, next() carries on. Keep it light and limit it with a matcher. Code runs on the Node.js runtime by default; export const runtime = "edge" moves a route to the smaller, faster-starting Edge runtime, with Web APIs only.', code: ['return NextResponse.rewrite(new URL("/menu/3", request.url));'] },
      { heading: 'Internationalization', body: 'Put the language in the URL with a [lang] folder: /en, /es. Keep the words in a dictionary per language, set <html lang={lang}>, pre-build each language with generateStaticParams, and let proxy.js send new visitors to their preferred language from the accept-language header.' },
    ],
    example: {
      title: 'A layout with two slots',
      code: ['export default function DashboardLayout({ children, orders, stats }) {', '  return (', '    <>', '      {children}', '      <section>{orders}</section>', '      <section>{stats}</section>', '    </>', '  );', '}'],
      walk: [
        { line: 1, text: '@orders and @stats arrive as props.' },
        { line: 4, text: 'children is the page.' },
        { line: 5, text: 'Each slot goes where you place it.' },
      ],
      next: nextApp('app/dashboard/layout.js', '/dashboard', {
        ...LAYOUT,
        'app/dashboard/page.js': ['export default function Dashboard() {', '  return <h1>Kitchen dashboard</h1>;', '}'],
        'app/dashboard/@orders/page.js': ['export default function Orders() {', '  return <p>Open orders: 3</p>;', '}'],
        'app/dashboard/@stats/page.js': ['export default function Stats() {', '  return <p>Cups today: 42</p>;', '}'],
      }),
      output: ['HomeMenu', 'Kitchen dashboard', 'Open orders: 3', 'Cups today: 42'],
    },
    industry: 'Parallel and intercepting routes power dashboards, photo feeds and shopping sites where an item opens in a pop-up but still has its own shareable address. proxy.js handles redirects of old URLs, language selection and quick sign-in checks. Most apps stay on the Node.js runtime.',
    interview: [
      { q: 'How do you open a product in a pop-up that still has its own URL?', a: 'An intercepting route like @modal/(.)products/[id], with the full page at products/[id].' },
      { q: 'What is the difference between redirect and rewrite in proxy.js?', a: 'Redirect changes the address in the browser; rewrite shows another page at the same address.' },
      { q: 'When would you use the Edge runtime?', a: 'For small, fast-starting responses that only need Web APIs. Otherwise stay on Node.js.' },
    ],
    cheat: [
      { code: '@slot', meaning: 'a parallel route' },
      { code: '(.)folder', meaning: 'intercept at this level' },
      { code: 'NextResponse.rewrite', meaning: 'same address, other page' },
      { code: 'runtime = "edge"', meaning: 'Edge for one route' },
      { code: 'app/[lang]', meaning: 'language in the URL' },
    ],
  },

  'nx-arch-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Project architecture', body: 'Keep app/ for routes: pages, layouts and route.js files that stay thin. Put shared parts in components/, shared helpers like the database client in lib/, and everything for one feature (its actions, queries and checks) in features/. Colocate a file next to the only route that uses it, in a private _components folder, and move it when a second place needs it.' },
      { heading: 'Component organization', body: 'Most of a page should be Server Components, with small Client Components only where people tap or type. Push "use client" down to the leaves, pass server parts into client ones as children, keep each component to one job, and name it for what it is.' },
      { heading: 'Security', body: 'Keep secrets server-only and import "server-only" in files that use them. Treat every Server Action and Route Handler as public: check the user, the role and the input inside it. Show user text with { }, not dangerouslySetInnerHTML. Add security headers in next.config.js and keep Next.js updated.', code: ['import "server-only";'] },
      { heading: 'Testing', body: 'Unit tests (Vitest or Jest) check functions like price rules. Component tests (React Testing Library) check Client Components. End-to-end tests (Playwright or Cypress) click through the real site, and are the usual way to test async Server Components and whole flows like sign-in and checkout.' },
    ],
    example: {
      title: 'One rule, used everywhere',
      code: ['import { totalWithTax } from "@/features/orders/prices";', '', 'export default function Cart() {', '  return <p>Total with tax: ₹{totalWithTax([40, 80])}</p>;', '}'],
      walk: [
        { line: 1, text: 'The rule lives in one feature file.' },
        { line: 4, text: 'Pages only use it, so it is tested once.' },
      ],
      next: nextApp('app/cart/page.js', '/cart', { ...LAYOUT, 'features/orders/prices.js': ['export function totalWithTax(prices) {', '  const total = prices.reduce((sum, p) => sum + p, 0);', '  return Math.round(total * 1.05);', '}'] }),
      output: ['HomeMenu', 'Total with tax: ₹126'],
    },
    industry: 'On a team, a clear structure and a few firm rules (thin routes, small client islands, checks in every action, tests at the right level) matter as much as any single feature. Code reviews check for them, and they keep a growing app fast, safe and easy to change.',
    interview: [
      { q: 'Where would you put logic used by several pages?', a: 'In a shared feature or lib module, not inside the page files.' },
      { q: 'Why push "use client" down the tree?', a: 'Less JavaScript in the browser, and more of the page can read data on the server.' },
      { q: 'How do you test an async Server Component?', a: 'Usually with an end-to-end test that loads the real page.' },
    ],
    cheat: [
      { code: 'app/', meaning: 'routes only' },
      { code: 'features/orders/', meaning: 'one feature' },
      { code: 'import "server-only"', meaning: 'never in the browser' },
      { code: 'Vitest / Playwright', meaning: 'unit / end-to-end' },
    ],
  },
};
