// Next.js · Module 11 · Advanced Next.js Features: parallel routes, intercepting routes, proxy, the Edge and Node.js
// runtimes, and internationalization.
import type { Lesson } from '../../types';
import { CAFE, CAFE_HOME, CAFE_MENU, DB_MENU, DISH_PAGE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const DASH_LAYOUT = [
  'export default function DashboardLayout({ children, orders, stats }) {',
  '  return (',
  '    <>',
  '      {children}',
  '      <section className="card">{orders}</section>',
  '      <section className="card">{stats}</section>',
  '    </>',
  '  );',
  '}',
];
const ORDERS_SLOT = ['import { db } from "@/lib/db";', '', 'export default async function Orders() {', '  const orders = await db.order.count();', '  console.log("Orders slot ready");', '  return <p>Open orders: {orders}</p>;', '}'];
const STATS_SLOT = [
  'export default async function Stats() {',
  '  const res = await fetch("https://cafe.example.com/api/menu");',
  '  const menu = await res.json();',
  '  console.log("Stats slot ready");',
  '  return <p>Dishes on the menu: {menu.length}</p>;',
  '}',
];
const STATS_LOADING = ['export default function Loading() {', '  return <p className="muted">Counting dishes…</p>;', '}'];
const DASH_APP = {
  ...CAFE,
  'app/dashboard/layout.js': DASH_LAYOUT,
  'app/dashboard/page.js': ['export default function Dashboard() {', '  return <h1>Kitchen dashboard</h1>;', '}'],
  'app/dashboard/@orders/page.js': ORDERS_SLOT,
  'app/dashboard/@stats/page.js': STATS_SLOT,
  'app/dashboard/@stats/loading.js': STATS_LOADING,
};

const MODAL_LAYOUT = [
  'export default function RootLayout({ children, modal }) {',
  '  return (',
  '    <html lang="en">',
  '      <body>',
  '        {children}',
  '        {modal}',
  '      </body>',
  '    </html>',
  '  );',
  '}',
];
const POPUP = [
  'import Link from "next/link";',
  'import { db } from "@/lib/db";',
  '',
  'export default async function DishPopup({ params }) {',
  '  const { id } = await params;',
  '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });',
  '  console.log("Opened " + dish.name + " in a pop-up");',
  '  return (',
  '    <div className="pop">',
  '      <h2>{dish.name}</h2>',
  '      <p>₹{dish.price}</p>',
  '      <Link href="/menu">Close</Link>',
  '    </div>',
  '  );',
  '}',
];
const MODAL_APP = {
  'app/layout.js': MODAL_LAYOUT,
  'app/page.js': CAFE_HOME,
  'app/menu/page.js': DB_MENU,
  'app/menu/[id]/page.js': DISH_PAGE,
  'app/@modal/default.js': ['export default function Default() {', '  return null;', '}'],
  'app/@modal/(.)menu/[id]/page.js': POPUP,
};

const PROXY = [
  'import { NextResponse } from "next/server";',
  '',
  'export function proxy(request) {',
  '  const { pathname } = request.nextUrl;',
  '  if (pathname === "/menu.html") {',
  '    return NextResponse.redirect(new URL("/menu", request.url));',
  '  }',
  '  if (pathname === "/today") {',
  '    return NextResponse.rewrite(new URL("/menu/3", request.url));',
  '  }',
  '  return NextResponse.next();',
  '}',
  '',
  'export const config = { matcher: ["/menu.html", "/today"] };',
];
const PROXY_APP = { ...CAFE, 'app/menu/[id]/page.js': DISH_PAGE, 'proxy.js': PROXY };

const DICTS = [
  'const dictionaries = {',
  '  en: { welcome: "Welcome to Rosa’s Café", menu: "See the menu" },',
  '  es: { welcome: "Bienvenidos al Café de Rosa", menu: "Ver el menú" },',
  '};',
  '',
  'export const LANGS = Object.keys(dictionaries);',
  '',
  'export function getDictionary(lang) {',
  '  return dictionaries[lang] ?? dictionaries.en;',
  '}',
];
const LANG_LAYOUT = [
  'import { LANGS } from "@/lib/dictionaries";',
  '',
  'export function generateStaticParams() {',
  '  return LANGS.map((lang) => ({ lang }));',
  '}',
  '',
  'export default async function RootLayout({ children, params }) {',
  '  const { lang } = await params;',
  '  return (',
  '    <html lang={lang}>',
  '      <body>{children}</body>',
  '    </html>',
  '  );',
  '}',
];
const LANG_PAGE = [
  'import Link from "next/link";',
  'import { getDictionary } from "@/lib/dictionaries";',
  '',
  'export default async function Home({ params }) {',
  '  const { lang } = await params;',
  '  const t = getDictionary(lang);',
  '  return (',
  '    <>',
  '      <nav><Link id="en" href="/en">English</Link> <Link id="es" href="/es">Español</Link></nav>',
  '      <h1>{t.welcome}</h1>',
  '      <p>{t.menu}</p>',
  '    </>',
  '  );',
  '}',
];
const LANG_PROXY = [
  'import { NextResponse } from "next/server";',
  'import { LANGS } from "@/lib/dictionaries";',
  '',
  'export function proxy(request) {',
  '  const wanted = request.headers.get("accept-language") ?? "";',
  '  const lang = LANGS.find((l) => wanted.startsWith(l)) ?? "en";',
  '  return NextResponse.redirect(new URL("/" + lang, request.url));',
  '}',
  '',
  'export const config = { matcher: ["/"] };',
];
const LANG_APP = { 'lib/dictionaries.js': DICTS, 'app/[lang]/layout.js': LANG_LAYOUT, 'app/[lang]/page.js': LANG_PAGE, 'proxy.js': LANG_PROXY };

export const NX_M11: Lesson[] = [
  lesson('nx-par-1', 'Parallel routes', 8, [
    chat(['Some pages show several independent parts at once, like a dashboard with orders and stats.', 'Parallel routes give each part its own folder, starting with @. The layout receives each one as a prop, and each can load and fail on its own.']),
    tapPage('A dashboard with two slots', 'Open /dashboard.', app(DASH_APP), 'Stats slot ready', go('/dashboard'), 'The orders slot was ready first; the stats slot had its own loading.js and arrived a moment later.'),
    explore('Slots in the layout', DASH_LAYOUT, [
      [1, '@orders and @stats become the orders and stats props.'],
      [4, 'children is the page itself.'],
      [5, 'Each slot goes where you put it.', 'section'],
    ], { page: app(DASH_APP, '/dashboard'), minTaps: 2 }),
    explore('The folders', ['app/dashboard/layout.js', 'app/dashboard/page.js', 'app/dashboard/@orders/page.js', 'app/dashboard/@stats/page.js', 'app/dashboard/@stats/loading.js', 'app/dashboard/@stats/default.js'], [
      [3, '@ makes a slot. Slots are not part of the URL.'],
      [5, 'Each slot can have its own loading.js and error.js.'],
      [6, 'default.js: what to show when a slot has no page for the current URL.'],
    ]),
    check('What does a folder named @stats make?', ['A slot passed to the layout as the stats prop', 'A page at /@stats', 'A private folder', 'A Route Handler'], 'Slots are not part of the URL.', 'Where does it appear?', { mono: false }),
    truth([
      ['Each slot can show its own loading state', true, 'With its own loading.js.'],
      ['@orders adds /orders to the URL', false, 'Slots don’t change the URL.'],
      ['A slot can be shown only to some users, from the layout', true, 'The layout decides what to render.'],
    ]),
    recap([
      ['🧩', '@folders are slots, passed to the layout as props'],
      ['⏳', 'Each slot loads and fails on its own'],
      ['🗂', 'default.js fills a slot with no matching page'],
    ]),
  ]),

  lesson('nx-a-11-2', 'Intercepting routes', 8, [
    chat(['Tap a dish on the menu and it opens in a pop-up, but the address still changes to /menu/2. Share that link, or reload, and you get the full dish page.', 'That is an intercepting route: when you move inside the site, a different file “intercepts” the address.']),
    tapPage('A pop-up with its own address', 'Open the menu, then tap Cold Coffee.', app(MODAL_APP, '/menu'), 'Opened Cold Coffee in a pop-up', [{ click: '#dish-2' }], 'The menu stayed behind; the pop-up came from app/@modal/(.)menu/[id]/page.js. Reload (↻) to see the full page instead.'),
    explore('The files behind it', ['app/layout.js                   ← shows {children} and {modal}', 'app/menu/[id]/page.js           ← the full page', 'app/@modal/default.js           ← nothing, most of the time', 'app/@modal/(.)menu/[id]/page.js ← the pop-up'], [
      [1, 'The layout has a modal slot.'],
      [2, 'Opening the address directly gives this full page.'],
      [4, '(.) means “intercept menu/[id] at this level” when moving inside the site.'],
    ]),
    reveal('Intercept markers', [
      ['(.)folder', 'The same level.'],
      ['(..)folder', 'One level up.'],
      ['(...)folder', 'From the app/ folder.'],
      ['Always pair it', 'With a parallel route slot, like @modal, and a default.js.'],
    ], { mono: true }),
    check('What does a visitor see if they open /menu/2 from a shared link?', ['The full dish page', 'The pop-up over a blank page', 'A 404', 'The menu'], 'Interception only happens when moving inside the site.', 'Did they come from the menu?'),
    recap([
      ['🪟', 'Intercepting routes show another file when moving inside the site'],
      ['🔗', 'The address still changes and can be shared'],
      ['🧩', 'Pair (.)folders with a @modal slot'],
    ]),
  ]),

  lesson('nx-a-11-3', 'Proxy', 8, [
    chat(['proxy.js (called middleware.js before Next.js 16) runs before a request reaches a page or a Route Handler.', 'It can redirect, rewrite to another page, or add headers. Keep it quick and light: it runs for every matching request.']),
    tapPage('Redirect and rewrite', 'Open /menu.html (an old address), then /today.', app(PROXY_APP), 'GET /today 200', [...go('/menu.html'), ...go('/today')], '/menu.html redirected: the address changed. /today was rewritten: it shows dish 3, but the address stayed /today.'),
    explore('proxy.js', PROXY, [
      [3, 'One function, called proxy, at the project root.'],
      [6, 'Redirect: the browser goes to a new address.'],
      [9, 'Rewrite: show another page, keep the address.'],
      [11, 'Otherwise, carry on as normal.'],
      [14, 'Only run for these paths.'],
    ]),
    matchUp('Redirect or rewrite?', [['An old address moved for good', 'Redirect'], ['/today always shows today’s dish page', 'Rewrite'], ['Send visitors without a cookie to /login', 'Redirect']], 'Does the address bar change?'),
    tapbug('proxy.js runs for every picture and script, and the site gets slow', ['export const config = { matcher: ["/:path*"] };'], [[1, '["/:path*"]', '["/menu.html", "/today"]']], 'Match only the paths that need it.'),
    check('What does NextResponse.rewrite do?', ['Shows another page while the address stays the same', 'Changes the address in the browser', 'Deletes the page', 'Adds a cookie'], 'The visitor never sees the real path.', 'Does the URL change?'),
    recap([
      ['🛂', 'proxy.js runs before pages and Route Handlers'],
      ['↪', 'redirect changes the address; rewrite doesn’t'],
      ['🎯', 'A matcher keeps it to the paths that need it'],
    ]),
  ]),

  lesson('nx-a-11-4', 'The Edge and Node.js runtimes', 7, [
    reveal('Two places your server code can run', [
      ['Node.js runtime', 'The default. Every Node.js feature and npm package, files, and long tasks.'],
      ['Edge runtime', 'A smaller runtime on servers close to visitors. Starts fast, but only Web APIs: no files, many packages won’t work.'],
      ['Choosing', 'Stay on Node.js unless you have a clear reason and the code fits the limits.'],
    ]),
    toggle('Setting a runtime', [
      ['Node.js (default)', ['export async function GET() {', '  const data = await readFile("menu.json", "utf8");', '  return new Response(data);', '}'], 'Nothing to set. Files and Node.js packages work.'],
      ['Edge', ['export const runtime = "edge";', '', 'export async function GET(request) {', '  const country = request.headers.get("x-country") ?? "unknown";', '  return Response.json({ country });', '}'], 'Only Web APIs like fetch, Request and Response.'],
    ]),
    matchUp('Which runtime?', [['Reading a file from disk', 'Node.js'], ['A tiny reply that must start instantly worldwide', 'Edge'], ['A database driver that needs Node.js', 'Node.js']], 'Node.js unless the code fits the Edge’s limits.'),
    chat(['In Next.js 16, proxy.js runs on the Node.js runtime by default too.', 'Many teams never change the runtime. It is good to know the Edge exists, and its limits.']),
    check('What is the default runtime for pages and Route Handlers?', ['Node.js', 'Edge', 'The browser', 'Deno'], 'Set runtime = "edge" to change it.', 'Which one supports every package?'),
    truth([
      ['The Edge runtime can read files with fs', false, 'Only Web APIs.'],
      ['export const runtime = "edge" changes one route', true, 'Per route.'],
      ['Most apps can stay on Node.js', true, 'It is the default for a reason.'],
    ]),
    recap([
      ['🟢', 'Node.js: the default, with everything'],
      ['⚡', 'Edge: fast to start, Web APIs only'],
      ['🎚', 'runtime = "edge" per route, when it fits'],
    ]),
  ]),

  lesson('nx-a-11-5', 'Internationalization', 8, [
    chat(['Internationalization (i18n) means one site in several languages.', 'A common Next.js pattern: put the language in the URL, /en and /es, with a [lang] folder, and keep the words in a dictionary per language.']),
    tapPage('Rosa’s Café in two languages', 'Open / (your phone asks for English), then tap Español.', app(LANG_APP, '/en'), 'GET /es 200', [...go('/'), { click: '#es' }], 'proxy.js read the accept-language header and sent you to /en. The link switched the whole page to Spanish.'),
    explore('A dictionary per language', DICTS, [
      [2, 'English words.'],
      [3, 'Spanish words, same keys.'],
      [9, 'Fall back to English for an unknown language.'],
    ]),
    explore('[lang] as the root layout', LANG_LAYOUT, [
      [3, 'Build a version of every page for each language.'],
      [8, 'Read the language from the URL.'],
      [10, 'Tell browsers and screen readers the page’s language.'],
    ]),
    explore('Picking a language for new visitors', LANG_PROXY, [
      [5, 'The browser says which languages the person prefers.'],
      [6, 'Pick the first one the site has.'],
      [7, 'Redirect / to /en or /es.'],
    ]),
    tapbug('Screen readers read the Spanish page with English sounds', ['<html lang="en">'], [[1, 'lang="en"', 'lang={lang}']], 'Set lang from the URL on every page.'),
    check('Where does the language live in this pattern?', ['In the URL, through a [lang] folder', 'In a cookie only', 'In each component’s state', 'In next.config.js'], 'So links can be shared in a language.', 'Look at the address bar.'),
    recap([
      ['🌍', '[lang] folder: /en, /es'],
      ['📖', 'A dictionary of words per language'],
      ['🧭', 'proxy.js picks a language for new visitors'],
    ]),
  ]),

  challenge('nx-a-11-ch', 'Module 11 Challenge', { icon: '🧪', name: 'Next Expert' }, ['Build pages from parallel and intercepting routes', 'Redirect and rewrite in proxy.js', 'Choose runtimes and build sites in several languages'], [
    mcq(1, 'What does @team make?', ['A slot passed to the layout', 'A URL segment', 'A private folder', 'A route group'], 'Parallel routes.', { mono: true }),
    mcq(2, 'Which marker intercepts a route at the same level?', ['(.)', '(..)', '(...)', '[.]'], '(..) is one level up.', { mono: true }),
    mcq(3, 'What was proxy.js called before Next.js 16?', ['middleware.js', 'server.js', 'edge.js', 'router.js'], 'Same job, new name.', { mono: true }),
    mcq(4, 'Which runtime is the default?', ['Node.js', 'Edge', 'Browser', 'Bun'], 'Edge is opt-in.'),
    mcq(5, 'Which header tells you the visitor’s preferred language?', ['accept-language', 'user-agent', 'content-type', 'host'], 'Read it in proxy.js.', { mono: true }),
    swipe([
      ['An intercepted page still has its own full page', true, 'Opened directly, or on reload.'],
      ['Rewrite changes the address bar', false, 'Redirect does.'],
      ['The Edge runtime supports every npm package', false, 'Only ones that use Web APIs.'],
      ['default.js fills a slot with no matching page', true, 'Often it returns null.'],
    ]),
    pairs([['@stats', 'A parallel slot'], ['(.)menu', 'Intercept'], ['NextResponse.rewrite', 'Same address, other page'], ['[lang]', 'Language in the URL']], 'Advanced routing pieces.'),
    pickCode('Which sends /old to /new and changes the address?', ['return NextResponse.redirect(new URL("/new", request.url));', 'return NextResponse.rewrite(new URL("/new", request.url));', 'return NextResponse.next();', 'redirect = "/new";'], 'A redirect changes it.'),
    bugTask(['export default function Layout({ children }) {', '  return <>{children}{modal}</>;', '}', '<html lang="en"> // in app/[lang]/layout.js'], [[1, '{ children }', '{ children, modal }'], [4, 'lang="en"', 'lang={lang}']], 'Take the modal slot as a prop, and set lang from the URL.'),
    xray('<div><h1>Kitchen dashboard</h1><section class="orders">Open orders: 0</section><div class="pop">Cold Coffee</div><nav><a>Español</a></nav></div>', [
      ['.orders', 'A dashboard part', '@orders', ['@orders', '(.)menu/[id]', '[lang]']],
      ['.pop', 'A pop-up with its own address', '(.)menu/[id]', ['@orders', '(.)menu/[id]', '[lang]']],
      ['nav', 'The language switch', '[lang]', ['@orders', '(.)menu/[id]', '[lang]']],
    ]),
    arrange(['import { NextResponse } from "next/server";', 'export function proxy(request) {', '  return NextResponse.redirect(new URL("/menu", request.url));', '}', 'export const config = { matcher: ["/food"] };'], 'import, start proxy, redirect, close it, then the matcher', { ...CAFE, 'app/menu/page.js': CAFE_MENU }, 'proxy.js', '/food'),
  ]),
];
