// Extra practice for each Next.js 16 module, opened from the module's "Practise" button.
// JavaScript outputs are run by the tests; JSX is checked by reading, so answers stick to documented behaviour.
import { bug, order, predict, quiz, tap } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · NEXT.JS';

export const NEXT_DRILLS: Record<string, Step[]> = {
  // 1 · File-based routing
  'nx-1': [
    quiz({
      prompt: 'What does Next.js add on top of React?',
      options: ['Routing, server rendering, data fetching and build tools', 'A new programming language', 'A database', 'Nothing: they are the same thing'],
      right: 'Right. React draws the UI; Next.js is the framework around it.',
      wrong: 'React is a UI library. Next.js adds routing, rendering on the server, APIs and the build setup.',
    }),
    quiz({
      prompt: 'Which URL does app/contact/page.js serve?',
      options: ['/contact', '/app/contact', '/contact/page', '/page/contact'],
      right: 'Right. The app folder itself is not part of the URL.',
      wrong: 'Folders inside app make the URL, without "app" and without "page".',
      mono: true,
    }),
    quiz({
      prompt: 'You add app/courses/utils.js next to app/courses/page.js. What happens at /courses/utils?',
      options: ['A 404: only page.js files become pages', 'It shows utils.js as a page', 'The build fails', 'It downloads the file'],
      right: 'Right. Helper files can live in route folders safely; only page.js is public.',
      wrong: 'Only a file named page.js (or route.js) is reachable. Other files are private helpers.',
    }),
    predict({
      kicker: K,
      title: 'Count the pages',
      lang: 'javascript',
      lines: ['const files = ["app/page.js", "app/about/page.js", "app/about/team.js", "app/blog/page.js"];', 'console.log(files.filter((f) => f.endsWith("/page.js")).length);'],
      answer: '3',
      explain: 'team.js is not a page file, so only three files are pages.',
    }),
  ],

  // 2 · Layouts
  'nx-layout-1': [
    quiz({
      prompt: 'Which file must contain the <html> and <body> tags?',
      options: ['app/layout.js (the root layout)', 'Every page.js', 'app/courses/layout.js', 'next.config.js'],
      right: 'Right. Only the root layout has them, and every app needs one.',
      wrong: 'The root layout, app/layout.js, renders <html> and <body>. Nested layouts don’t.',
      mono: true,
    }),
    quiz({
      prompt: 'Moving from /courses/python to /courses/sql, what happens to app/courses/layout.js?',
      options: ['It stays on screen and keeps its state', 'It is rebuilt from scratch', 'It disappears', 'The whole site reloads'],
      right: 'Right. Only the page part is swapped.',
      wrong: 'Layouts are kept during navigation; only the page inside them changes.',
    }),
    bug({
      kicker: K,
      title: 'Find the bug',
      instructions: 'Every course page is blank. Tap the buggy line.',
      lang: 'jsx',
      lines: ['export default function CoursesLayout({ children }) {', '  return <aside>Chapters</aside>;', '}'],
      bug: 1,
      fix: '  return <><aside>Chapters</aside>{children}</>;',
      explain: 'The layout must render {children}, or the page inside it never appears.',
    }),
    predict({
      kicker: K,
      title: 'Nesting order',
      lang: 'javascript',
      lines: ['const layouts = ["Root", "Shop", "Cart"];', 'console.log(layouts.reduceRight((inside, l) => l + "(" + inside + ")", "Page"));'],
      answer: 'Root(Shop(Cart(Page)))',
      explain: 'Wrapping starts from the innermost layout, Cart, and ends with Root on the outside.',
    }),
  ],

  // 3 · Linking and navigating
  'nx-link-1': [
    quiz({
      prompt: 'Where do you import Link from?',
      options: ['next/link', 'next/navigation', 'react', 'react-router'],
      right: 'Right: import Link from "next/link".',
      wrong: 'Link comes from next/link. Hooks like usePathname come from next/navigation.',
      mono: true,
    }),
    quiz({
      prompt: 'A Server Component finds that nobody is signed in. Which call sends them to /login?',
      options: ['redirect("/login") from next/navigation', 'router.push("/login")', 'window.location = "/login"', '<Link href="/login" />'],
      right: 'Right. redirect works on the server and stops the rest of the code.',
      wrong: 'useRouter and window only exist in the browser. On the server, use redirect().',
      mono: true,
    }),
    tap({
      kicker: K,
      title: 'Tap the hook',
      instructions: 'Which name on this line is the hook that reads the current URL?',
      lang: 'jsx',
      lines: ['"use client";', 'const path = usePathname();'],
      target: { line: 1, token: 'usePathname' },
      explain: 'usePathname returns the current path, like "/courses/python". It needs "use client".',
    }),
    predict({
      kicker: K,
      title: 'Active or not?',
      lang: 'javascript',
      lines: ['const isActive = (path, href) => href === "/" ? path === "/" : path === href || path.startsWith(href + "/");', 'console.log(isActive("/", "/"), isActive("/fees", "/"), isActive("/fees/2026", "/fees"));'],
      answer: 'true false true',
      explain: '"/" only matches itself; "/fees" also matches pages below it.',
    }),
  ],

  // 4 · Dynamic routes
  'nx-dyn-1': [
    quiz({
      prompt: 'In Next.js 16, how should a page read params?',
      options: ['const { id } = await params', 'const { id } = params', 'const id = useParams()', 'const id = props.id'],
      right: 'Right. params is a Promise, so the page is async and awaits it.',
      wrong: 'Since Next.js 15, params is a Promise: make the page async and await params.',
      mono: true,
    }),
    quiz({
      prompt: 'app/shop/[[...slug]]/page.js receives /shop. What is slug?',
      options: ['undefined', '[]', '""', '"shop"'],
      right: 'Right. The optional catch-all matches the folder itself, with no slug.',
      wrong: 'Double brackets make the catch-all optional: on /shop, slug is undefined.',
      mono: true,
    }),
    quiz({
      prompt: 'What does generateStaticParams do?',
      options: ['Lists values to build as pages during next build', 'Validates URLs on every request', 'Creates folders for you', 'Stops unknown URLs from loading'],
      right: 'Right. Those pages are ready before anyone visits. Other values are still handled on first visit.',
      wrong: 'It returns the params to prerender at build time, like [{ slug: "python" }].',
    }),
    predict({
      kicker: K,
      title: 'Catch-all values',
      lang: 'javascript',
      lines: ['const url = "/shop/books/novels/hindi";', 'const slug = url.split("/").slice(2);', 'console.log(slug.join(" > "));'],
      answer: 'books > novels > hindi',
      explain: 'Everything after /shop/ becomes the slug array.',
    }),
  ],

  // 5 · Loading, error, not-found
  'nx-loading-1': [
    quiz({
      prompt: 'What must the first line of error.js be?',
      options: ['"use client";', '"use server";', 'import React from "react";', 'export const dynamic = "error";'],
      right: 'Right. Error boundaries are Client Components.',
      wrong: 'error.js needs "use client" as its first line.',
      mono: true,
    }),
    quiz({
      prompt: 'In Next.js 16, which prop of error.js tries the segment again?',
      options: ['retry', 'reset', 'reload', 'refresh'],
      right: 'Right. Next.js 16 passes retry (older versions called it reset).',
      wrong: 'In Next.js 16 the function is called retry. Tutorials for older versions say reset.',
      mono: true,
    }),
    bug({
      kicker: K,
      title: 'Find the bug',
      instructions: 'A wrong roll number crashes the page instead of showing a 404. Tap the line to change.',
      lang: 'jsx',
      lines: ['const result = await getResult(roll);', 'if (!result) throw new Error("missing");', 'return <p>{result.total}</p>;'],
      bug: 1,
      fix: 'if (!result) notFound();',
      explain: 'A missing record is expected, so call notFound() and let not-found.js show a 404.',
    }),
    quiz({
      prompt: 'What does loading.js do?',
      options: ['Shows instantly while the page in the same folder loads', 'Loads the page faster', 'Runs before every request', 'Shows only when there is an error'],
      right: 'Right. It wraps the page in a Suspense boundary with your loading UI as the fallback.',
      wrong: 'loading.js is the fallback shown while the page is still getting its data.',
    }),
  ],

  // 6 · Server and Client Components
  'nx-data-1': [
    quiz({
      prompt: 'A component imports nothing special and has no directive. Where does it run?',
      options: ['On the server (Server Component)', 'In the browser', 'Both, always', 'Nowhere until you add a directive'],
      right: 'Right. In the app folder, components are Server Components by default.',
      wrong: 'Without "use client", app components are Server Components.',
    }),
    quiz({
      prompt: 'Which prop can a Server Component pass to a Client Component?',
      options: ['{ name: "Ava", marks: [90, 85] }', 'A database connection', 'A normal function', 'A class instance with methods'],
      right: 'Right. Plain data is serializable and can cross to the browser.',
      wrong: 'Props are sent over the network, so only serializable data (and Server Functions) can be passed.',
      mono: true,
    }),
    quiz({
      prompt: 'Your page is mostly text, with one “Like” button. Where should "use client" go?',
      options: ['Only in the LikeButton component file', 'At the top of the page', 'In the root layout', 'In next.config.js'],
      right: 'Right. Keep the client part as small as possible.',
      wrong: 'Push "use client" down to the smallest interactive piece, so the rest stays on the server.',
    }),
    order({
      kicker: K,
      title: 'Build a client button',
      instructions: 'Arrange the lines into a working Client Component.',
      lang: 'jsx',
      lines: ['"use client";', 'import { useState } from "react";', 'export function Like() {', '  const [liked, setLiked] = useState(false);', '  return <button onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"}</button>;', '}'],
      explain: 'The directive comes first, then imports, then the component using state.',
    }),
  ],

  // 7 · Rendering and caching
  'nx-render-1': [
    quiz({
      prompt: 'In Next.js 16, is fetch() cached by default?',
      options: ['No. You cache on purpose, e.g. with "use cache"', 'Yes, forever', 'Yes, for one hour', 'Only in development'],
      right: 'Right. Since Next.js 15, fetch is not cached unless you choose to cache.',
      wrong: 'fetch isn’t cached by default anymore. Use "use cache" with cacheLife to cache.',
    }),
    quiz({
      prompt: 'A component reads cookies() to show the student’s name. How should the page include it?',
      options: ['Wrap it in <Suspense> so it streams in', 'Add "use cache" to it', 'Put it in generateStaticParams', 'Move it to next.config.js'],
      right: 'Right. Request data streams in behind a fallback while the rest of the page loads instantly.',
      wrong: 'Request-time data like cookies goes inside <Suspense>; it can’t be part of a shared cache.',
    }),
    quiz({
      prompt: 'Which data should NOT go in a shared cache?',
      options: ['One student’s fee receipt', 'The list of courses', 'The centre’s address', 'Holiday dates'],
      right: 'Right. Personal data must be fetched per request.',
      wrong: 'Shared caches are for data that is the same for everyone. A receipt is personal.',
    }),
    predict({
      kicker: K,
      title: 'Hours to seconds',
      lang: 'javascript',
      lines: ['const lifetime = 2 * 60 * 60;', 'console.log(lifetime, 3000 < lifetime ? "fresh" : "stale");'],
      answer: '7200 fresh',
      explain: 'Two hours is 7200 seconds, and 3000 seconds old is still inside that.',
    }),
  ],

  // 8 · Route Handlers
  'nx-api-1': [
    quiz({
      prompt: 'Which status code means “created”?',
      options: ['201', '200', '204', '400'],
      right: 'Right. Send 201 after a POST creates something.',
      wrong: '201 Created is the reply to a successful POST that made a new record.',
      mono: true,
    }),
    quiz({
      prompt: 'Your route.js exports only GET and POST. A client sends DELETE. What happens?',
      options: ['Next.js replies 405 Method Not Allowed', 'GET runs instead', 'The server crashes', 'It returns 404'],
      right: 'Right. Unsupported methods get 405 automatically.',
      wrong: 'Next.js answers methods you didn’t export with 405 Method Not Allowed.',
    }),
    bug({
      kicker: K,
      title: 'Find the bug',
      instructions: 'Bad input gets a 200 reply. Tap the buggy line.',
      lang: 'javascript',
      lines: ['const body = { name: "" };', 'const reply = body.name ? { status: 201 } : { status: 200, error: "name is required" };', 'console.log(reply.status);'],
      bug: 1,
      fix: 'const reply = body.name ? { status: 201 } : { status: 400, error: "name is required" };',
      explain: 'Invalid input should be answered with 400 Bad Request, not 200.',
    }),
    predict({
      kicker: K,
      title: 'Read the query',
      lang: 'javascript',
      lines: ['const url = new URL("https://site.in/api/students?grade=10&grade=11");', 'console.log(url.searchParams.getAll("grade").join(","), url.searchParams.has("page"));'],
      answer: '10,11 false',
      explain: 'getAll returns every value for a repeated key; has("page") is false because it isn’t there.',
    }),
  ],

  // 9 · Server Actions
  'nx-actions-1': [
    quiz({
      prompt: 'What does a form’s action receive when it calls a Server Action?',
      options: ['A FormData object with the fields', 'A JSON string', 'The React state', 'Nothing'],
      right: 'Right. Read fields with formData.get("name").',
      wrong: 'The action gets FormData. With useActionState it also gets the previous state first.',
    }),
    quiz({
      prompt: 'Why must every Server Action check who the user is?',
      options: ['Anyone can send a POST request to it, not just your form', 'Next.js forgets the user after each page', 'It runs in the browser', 'To make it faster'],
      right: 'Right. A Server Action is a public endpoint.',
      wrong: 'Server Actions can be called directly with a POST request, so the check must be inside.',
    }),
    quiz({
      prompt: 'useActionState(action, initial) returns three things. What is the third?',
      options: ['pending (true while it runs)', 'An error', 'The FormData', 'A redirect function'],
      right: 'Right: [state, formAction, pending].',
      wrong: 'It returns [state, formAction, pending]. pending is true while the action runs.',
      mono: true,
    }),
    predict({
      kicker: K,
      title: 'Trim the input',
      lang: 'javascript',
      lines: ['const form = new Map([["name", "  Ava "]]);', 'const name = String(form.get("name") ?? "").trim();', 'console.log(name.length, String(form.get("email") ?? "").length);'],
      answer: '3 0',
      explain: 'Trimming removes the spaces, leaving "Ava". A missing field becomes "".',
    }),
  ],

  // 10 · Styling, images, metadata
  'nx-meta-1': [
    quiz({
      prompt: 'What is a CSS Module file called?',
      options: ['card.module.css', 'card.css.module', 'module.card.css', 'card.scoped.css'],
      right: 'Right. The .module.css ending makes its class names local.',
      wrong: 'Name it something.module.css and import styles from it.',
      mono: true,
    }),
    quiz({
      prompt: 'Which <Image> is written correctly?',
      options: ['<Image src="/hall.jpg" alt="Exam hall" width={640} height={360} />', '<Image src="/hall.jpg" />', '<Image src="/hall.jpg" alt="" />', '<img src="/hall.jpg" width="640">'],
      right: 'Right. It has a size and alt text.',
      wrong: 'next/image needs width and height (or fill), and good alt text.',
      mono: true,
    }),
    quiz({
      prompt: 'A course page’s title depends on the course from the database. What do you export?',
      options: ['An async generateMetadata function', 'A metadata object', 'A <title> tag in the page', 'Nothing'],
      right: 'Right. generateMetadata can await data and return the title.',
      wrong: 'A fixed metadata object can’t know the course. generateMetadata can fetch it first.',
    }),
    predict({
      kicker: K,
      title: 'Title length',
      lang: 'javascript',
      lines: ['const title = "Python classes in Irvine | CodeYatra";', 'console.log(title.length <= 60 ? "good length" : "too long");'],
      answer: 'good length',
      explain: 'The title is 36 characters, short enough to show fully in search results.',
    }),
  ],

  // 11 · Secrets, auth and proxy
  'nx-auth-1': [
    quiz({
      prompt: 'Which file should never be committed to Git?',
      options: ['.env.local', 'next.config.js', 'package.json', 'proxy.js'],
      right: 'Right. It holds your secrets; set the real values in your host instead.',
      wrong: '.env.local holds secrets and must stay out of Git (it is in .gitignore).',
      mono: true,
    }),
    quiz({
      prompt: 'What was proxy.js called before Next.js 16?',
      options: ['middleware.js', 'server.js', 'guard.js', 'routes.js'],
      right: 'Right. Middleware was renamed Proxy in Next.js 16; it works the same way.',
      wrong: 'It used to be middleware.js.',
      mono: true,
    }),
    quiz({
      prompt: 'Is checking for a session cookie in proxy.js enough to protect the marks page?',
      options: ['No. Also verify the user where the marks are read or changed', 'Yes, proxy runs first', 'Yes, if the matcher is right', 'Only on Vercel'],
      right: 'Right. Proxy is for quick, optimistic checks; the real check belongs next to the data.',
      wrong: 'The docs say proxy should not be the full authorization solution. Check in the page, action or route too.',
    }),
    predict({
      kicker: K,
      title: 'Public or private?',
      lang: 'javascript',
      lines: ['const names = ["DATABASE_URL", "NEXT_PUBLIC_SITE_NAME", "PAYMENT_SECRET", "NEXT_PUBLIC_MAP_ID"];', 'console.log(names.filter((n) => n.startsWith("NEXT_PUBLIC_")).length);'],
      answer: '2',
      explain: 'Only the two NEXT_PUBLIC_ variables reach the browser.',
    }),
  ],

  // 12 · Testing and deploying
  'nx-deploy-1': [
    quiz({
      prompt: 'Which command creates the production build?',
      options: ['npm run build (next build)', 'npm run dev', 'npm start', 'npx create-next-app'],
      right: 'Right. next start then serves that build.',
      wrong: 'next build makes the production build; next dev is only for development.',
      mono: true,
    }),
    quiz({
      prompt: 'Which tool clicks through your site in a real browser for end-to-end tests?',
      options: ['Playwright', 'Vitest', 'ESLint', 'Prettier'],
      right: 'Right. Vitest and Jest are for unit tests; Playwright drives a browser.',
      wrong: 'End-to-end tests drive a browser with a tool like Playwright.',
    }),
    quiz({
      prompt: 'The live site says DATABASE_URL is undefined, but it works on your laptop. Why?',
      options: ['The variable isn’t set in the host’s environment settings', 'The database is too slow', 'next build deleted it', 'Phones can’t read it'],
      right: 'Right. .env.local stays on your laptop; each environment needs its own values.',
      wrong: '.env.local isn’t deployed. Add the variable in the host’s settings.',
    }),
    predict({
      kicker: K,
      title: 'Test results',
      lang: 'javascript',
      lines: ['const results = [true, false, true, true];', 'const passed = results.filter(Boolean).length;', 'console.log(`${passed} passed, ${results.length - passed} failed`);'],
      answer: '3 passed, 1 failed',
      explain: 'filter(Boolean) keeps the true values: three of four passed.',
    }),
  ],
};
