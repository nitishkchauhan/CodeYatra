// Next.js · Module 2 · Routing and Navigation: file-based and nested routes, dynamic routes, layouts, navigation, and
// error and loading UI. Lessons 2.2 to 2.5 keep the old module ids (nx-dyn-1, nx-layout-1, nx-link-1, nx-loading-1).
import type { Lesson } from '../../types';
import { CAFE, CAFE_LAYOUT, DB_MENU, DISH_PAGE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const page = (name: string, text: string) => [`export default function ${name}() {`, `  return <h1>${text}</h1>;`, '}'];

const NESTED = {
  ...CAFE,
  'app/menu/drinks/page.js': page('Drinks', 'Drinks'),
  'app/(shop)/cart/page.js': page('Cart', 'Your cart'),
  'app/_lib/prices.js': ['export const TAX = 0.05;'],
};

const DOCS_PAGE = [
  'export default async function Guide({ params }) {',
  '  const { slug } = await params;',
  '  return (',
  '    <>',
  '      <h1>Kitchen guide</h1>',
  '      <p>Path: {slug.join(" → ")}</p>',
  '    </>',
  '  );',
  '}',
];

const MENU_LAYOUT = [
  '"use client";',
  'import { useState } from "react";',
  '',
  'export default function MenuLayout({ children }) {',
  '  const [likes, setLikes] = useState(0);',
  '  return (',
  '    <section className="card">',
  '      <button id="like" onClick={() => setLikes(likes + 1)}>Like ({likes})</button>',
  '      {children}',
  '    </section>',
  '  );',
  '}',
];
const LAYOUT_APP = { ...CAFE, 'app/menu/layout.js': MENU_LAYOUT, 'app/menu/page.js': DB_MENU, 'app/menu/[id]/page.js': DISH_PAGE };

const NAV = [
  '"use client";',
  'import Link from "next/link";',
  'import { usePathname } from "next/navigation";',
  '',
  'const LINKS = [["/", "Home"], ["/menu", "Menu"], ["/contact", "Contact"]];',
  '',
  'export default function Nav() {',
  '  const path = usePathname();',
  '  return (',
  '    <nav>',
  '      {LINKS.map(([href, label]) => (',
  '        <Link key={href} href={href} className={path === href ? "active" : ""}>',
  '          {label}',
  '        </Link>',
  '      ))}',
  '    </nav>',
  '  );',
  '}',
];
const NAV_LAYOUT = ['import Nav from "./Nav";', '', 'export default function RootLayout({ children }) {', '  return (', '    <html lang="en">', '      <body>', '        <Nav />', '        {children}', '      </body>', '    </html>', '  );', '}'];
const GO_BUTTON = [
  '"use client";',
  'import { useRouter } from "next/navigation";',
  '',
  'export default function Order() {',
  '  const router = useRouter();',
  '  return <button id="order" onClick={() => router.push("/menu")}>Start an order</button>;',
  '}',
];
const NAV_APP = {
  'app/layout.js': NAV_LAYOUT,
  'app/Nav.js': NAV,
  'app/page.js': ['import Order from "./Order";', '', 'export default function Home() {', '  return (', '    <>', '      <h1>Welcome</h1>', '      <Order />', '    </>', '  );', '}'],
  'app/Order.js': GO_BUTTON,
  'app/menu/page.js': page('Menu', 'Our menu'),
  'app/contact/page.js': page('Contact', 'Call us: 0101 555 0199'),
  'app/old-menu/page.js': ['import { redirect } from "next/navigation";', '', 'export default function OldMenu() {', '  redirect("/menu");', '}'],
};
const ACTIVE = 'nav .active { color: #16142B; text-decoration: underline; }';

const SLOW_MENU = [
  'export default async function Menu() {',
  '  const res = await fetch("https://cafe.example.com/api/menu/slow");',
  '  const dishes = await res.json();',
  '  return <ul>{dishes.map((d) => <li key={d.name}>{d.name}</li>)}</ul>;',
  '}',
];
const LOADING = ['export default function Loading() {', '  return <p className="muted">Loading the menu…</p>;', '}'];
const BROKEN = ['export default async function Specials() {', '  const res = await fetch("https://cafe.example.com/api/menu/broken");', '  if (!res.ok) throw new Error("The kitchen server is down");', '  return <p>Specials</p>;', '}'];
const ERROR = [
  '"use client";',
  '',
  'export default function Error({ error, reset }) {',
  '  return (',
  '    <div className="card">',
  '      <p className="err">Sorry: {error.message}</p>',
  '      <button id="retry" onClick={() => reset()}>Try again</button>',
  '    </div>',
  '  );',
  '}',
];
const NOT_FOUND = ['import Link from "next/link";', '', 'export default function NotFound() {', '  return (', '    <>', '      <h1>That page isn’t on our menu</h1>', '      <Link href="/menu">Back to the menu</Link>', '    </>', '  );', '}'];
const STATES = { ...CAFE, 'app/menu/page.js': SLOW_MENU, 'app/menu/loading.js': LOADING, 'app/specials/page.js': BROKEN, 'app/specials/error.js': ERROR, 'app/not-found.js': NOT_FOUND };

export const NX_M2: Lesson[] = [
  lesson('nx-route-1', 'File-based and nested routes', 7, [
    chat(['In Next.js you don’t write a list of routes. You make folders.', 'app/menu/page.js is the page at /menu. Put a folder inside a folder and the URL grows: app/menu/drinks/page.js is /menu/drinks.']),
    tapPage('Folders become URLs', 'Open the nested page /menu/drinks.', app(NESTED), 'GET /menu/drinks 200', go('/menu/drinks'), 'Each folder is one part of the address.'),
    explore('Folders and the URLs they make', ['app/page.js                 → /', 'app/menu/page.js            → /menu', 'app/menu/drinks/page.js     → /menu/drinks', 'app/(shop)/cart/page.js     → /cart', 'app/_lib/prices.js          → no URL'], [
      [3, 'A folder inside a folder makes a nested route.'],
      [4, '(shop) is a route group: brackets keep it out of the URL. Use it to sort files.'],
      [5, 'A folder starting with _ is private: never a URL. Good for helpers.'],
    ]),
    tapPage('A route group', 'The cart lives in app/(shop)/cart. Open /cart.', app(NESTED), 'GET /cart 200', go('/cart'), 'The (shop) folder is not part of the address.'),
    check('Which file makes /menu/drinks?', ['app/menu/drinks/page.js', 'app/menu-drinks/page.js', 'app/menu/page.js', 'app/drinks.js'], 'One folder for each part of the URL.', 'Count the parts of the address.', { mono: true }),
    matchUp('What does each folder name do?', [['menu', 'Adds /menu to the URL'], ['(shop)', 'Groups files, no URL change'], ['_lib', 'Private, never a URL']], 'Brackets group; an underscore hides.'),
    recap([
      ['📁', 'Folders make URLs; page.js makes them visitable'],
      ['🪆', 'Folders inside folders make nested routes'],
      ['🗃', '(group) and _private folders never appear in the URL'],
    ]),
  ]),

  lesson('nx-dyn-1', 'Dynamic routes', 8, [
    chat(['The café has five dishes, and might have fifty. One page file can serve them all.', 'A folder name in square brackets, like [id], matches any value in that part of the URL.']),
    tapPage('One page, many dishes', 'Tap a dish to open its page, then try /menu/99 in the address bar.', app({ ...CAFE, 'app/menu/page.js': DB_MENU, 'app/menu/[id]/page.js': DISH_PAGE }, '/menu'), 'GET /menu/99 404', [{ click: '#dish-3' }, ...go('/menu/99')], 'There is no dish 99, so the page calls notFound() and the server answers 404.'),
    explore('Reading the id from the URL', DISH_PAGE, [
      [4, 'The page gets params: the values from the [id] part of the URL.'],
      [5, 'params is a Promise in Next.js 16, so await it first.'],
      [6, 'The id is always text. Number(id) turns "3" into 3.'],
      [7, 'No dish? notFound() shows the 404 page.'],
    ], { page: app({ ...CAFE, 'app/menu/[id]/page.js': DISH_PAGE }, '/menu/3'), minTaps: 3 }),
    reveal('Three kinds of dynamic folder', [
      ['[id]', 'One part: /menu/3 gives id = "3".'],
      ['[...slug]', 'Every part after it: /guide/tea/green gives slug = ["tea", "green"].'],
      ['[[...slug]]', 'The same, but /guide on its own matches too.'],
    ], { mono: true }),
    tapPage('A catch-all route', 'app/guide/[...slug]/page.js matches any depth. Open /guide/drinks/tea.', app({ ...CAFE, 'app/guide/[...slug]/page.js': DOCS_PAGE }, '/guide/start'), 'GET /guide/drinks/tea 200', go('/guide/drinks/tea'), 'slug is an array with one item per part.'),
    tapbug('The dish name is always missing', ['export default async function Dish({ params }) {', '  const dish = await getDish(params.id);'], [[2, 'params.id', '(await params).id']], 'params is a Promise. Await it before reading id.'),
    check('For app/shop/[...slug]/page.js, what is slug at /shop/a/b?', ['["a", "b"]', '"a/b"', '"b"', '{ a: "b" }'], 'A catch-all gives an array.', 'How many parts come after /shop?', { mono: true }),
    recap([
      ['🎯', '[id] matches one part of the URL'],
      ['⏳', 'await params, then read the values (always text)'],
      ['🧺', '[...slug] catches every part, as an array'],
    ]),
  ]),

  lesson('nx-layout-1', 'Layouts and nested layouts', 7, [
    reveal('Layouts', [
      ['A frame', 'layout.js wraps every page in its folder and below, through {children}.'],
      ['The root layout', 'app/layout.js wraps the whole site. It must have <html> and <body>.'],
      ['Nested', 'app/menu/layout.js wraps only the menu pages, inside the root layout.'],
      ['They stay', 'Moving between pages keeps the layout on screen, with its state.'],
    ]),
    explore('The root layout', CAFE_LAYOUT, [
      [9, 'The root layout has the <html> tag…'],
      [10, '…and the <body>.'],
      [11, 'The header is in the layout, so every page shows it.', 'header'],
      [15, '{children} is where the current page goes.', 'h1'],
    ], { page: app(CAFE), minTaps: 3 }),
    tapPage('A layout keeps its state', 'The menu has its own layout with a Like button. Like it twice, then tap a dish.', app(LAYOUT_APP, '/menu'), 'GET /menu/2 200', [{ click: '#like' }, { click: '#like' }, { click: '#dish-2' }], 'The count stays at 2: the layout was not drawn again from scratch, only the page inside it changed.'),
    explore('A nested layout', MENU_LAYOUT, [
      [4, 'It gets children: the menu page, or a dish page.'],
      [5, 'State in a layout lives as long as you stay in its folder.'],
      [9, 'The page goes here, inside the card.', 'section'],
    ], { page: app(LAYOUT_APP, '/menu'), minTaps: 2 }),
    tapbug('Every page is blank', ['export default function RootLayout({ children }) {', '  return (', '    <html lang="en">', '      <body><header>Rosa’s Café</header></body>', '    </html>', '  );', '}'], [[4, '</header></body>', '</header>{children}</body>']], 'A layout must show {children}, or the pages never appear.'),
    check('Which layouts wrap /menu/2?', ['app/layout.js, then app/menu/layout.js', 'Only app/menu/layout.js', 'Only app/layout.js', 'None'], 'Layouts nest from the root down.', 'Follow the folders from app/ to the page.'),
    recap([
      ['🖼', 'A layout wraps its pages through {children}'],
      ['🌳', 'The root layout has <html> and <body>; others nest inside'],
      ['💾', 'Layouts stay on screen and keep their state'],
    ]),
  ], 'basic'),

  lesson('nx-link-1', 'Navigation', 8, [
    chat(['Use <Link> from next/link for links inside your site. It swaps only the page, keeps the layouts, and loads pages early so moving feels instant.', 'A plain <a> would reload the whole site.']),
    tapPage('Links, and the active one', 'Tap Menu, then Contact. The active link is underlined.', { ...app(NAV_APP), css: `${app(NAV_APP).css}\n${ACTIVE}` }, 'GET /contact 200', [{ click: 'nav a[href="/menu"]' }, { click: 'nav a[href="/contact"]' }], 'usePathname tells the menu which page is open.'),
    explore('An active menu', NAV, [
      [1, 'usePathname is a hook, so Nav is a Client Component.'],
      [2, 'Link comes from next/link.'],
      [8, 'path is the current URL, like "/menu".'],
      [12, 'The link for this page gets the "active" class.', 'nav'],
    ], { page: { ...app(NAV_APP, '/menu'), css: `${app(NAV_APP).css}\n${ACTIVE}` }, minTaps: 3 }),
    reveal('Moving in code', [
      ['useRouter()', 'In a Client Component: router.push("/menu") after a tap, router.back(), router.refresh().'],
      ['redirect()', 'On the server: send the visitor elsewhere before the page is drawn.'],
      ['<Link replace>', 'Replaces the current page in history, so Back skips it.'],
    ], { mono: true }),
    tapPage('router.push and redirect', 'Tap “Start an order”, then open /old-menu, an old address the café moved.', app(NAV_APP), 'GET /old-menu 307', [{ click: '#order' }, ...go('/old-menu')], '307 means “moved for now”. redirect() sent you to /menu.'),
    tapbug('Error: usePathname only works in a Client Component', ['import { usePathname } from "next/navigation";', '', 'export default function Nav() {', '  const path = usePathname();'], [[1, 'import { usePathname }', '"use client"; import { usePathname }']], 'Hooks need a Client Component. Add "use client" at the top of the file.'),
    check('How should you link to /menu inside your site?', ['<Link href="/menu">Menu</Link>', '<a href="/menu">Menu</a>', '<Link to="/menu">', 'router("/menu")'], 'Link keeps the layouts and loads early.', 'Which one comes from next/link?', { mono: true }),
    recap([
      ['🔗', '<Link href> moves without reloading the site'],
      ['📍', 'usePathname for the current URL (Client Components)'],
      ['↪', 'router.push in the browser; redirect() on the server'],
    ]),
  ]),

  lesson('nx-loading-1', 'Error and loading UI', 8, [
    reveal('Three special files', [
      ['loading.js', 'Shown at once while the page in its folder is still loading.'],
      ['error.js', 'Shown if the page breaks. It gets error and reset, and must be a Client Component.'],
      ['not-found.js', 'Shown when notFound() is called, or the address doesn’t exist.'],
    ], { mono: true }),
    tapPage('Loading, then the menu', 'The menu takes a moment to load. Tap Menu and watch.', app(STATES), 'GET /menu 200', [{ click: 'header a[href="/menu"]' }], 'loading.js showed straight away, then the menu replaced it.'),
    tapPage('When something breaks', 'Open /specials. Its server is down.', app(STATES), 'Error: The kitchen server is down', go('/specials'), 'error.js caught it. The rest of the site, like the header, still works.'),
    explore('The error page', ERROR, [
      [1, 'error.js must be a Client Component.'],
      [3, 'It gets the error and a reset function.'],
      [7, 'reset() tries drawing the page again.', '#retry'],
    ], { page: app(STATES, '/specials'), minTaps: 2 }),
    tapPage('A page that doesn’t exist', 'Open /desserts. The café has no such page.', app(STATES), 'GET /desserts 404', go('/desserts'), 'Next.js showed app/not-found.js, with a link back. Calling notFound() in a page shows it too.'),
    tapbug('error.js crashes the whole app', ['export default function Error({ error, reset }) {', '  return <p>Sorry: {error.message}</p>;', '}'], [[1, 'export default function Error', '"use client"; export default function Error']], 'error.js must start with "use client".'),
    check('What does loading.js show?', ['A placeholder while the page in its folder loads', 'A page for slow phones only', 'The page’s errors', 'A spinner on every page of the site'], 'Only for its folder and below.', 'When is it on screen?'),
    recap([
      ['⏳', 'loading.js shows at once while a page loads'],
      ['🛟', 'error.js ("use client") catches errors, with reset()'],
      ['🔍', 'notFound() shows not-found.js with a 404'],
    ]),
  ]),

  challenge('nx-b-2-ch', 'Module 2 Challenge', { icon: '🧭', name: 'Route Master' }, ['Make nested, grouped and dynamic routes', 'Build layouts and link between pages', 'Handle loading, errors and missing pages'], [
    mcq(1, 'Which file makes /menu/drinks?', ['app/menu/drinks/page.js', 'app/menu/page.js', 'app/drinks/menu.js', 'app/menu-drinks.js'], 'One folder per URL part.', { mono: true }),
    mcq(2, 'What does a (group) folder do?', ['Groups files without changing the URL', 'Makes a dynamic route', 'Hides the page', 'Adds a layout'], 'Brackets stay out of the address.'),
    mcq(3, 'In Next.js 16, how do you read id in a page?', ['const { id } = await params;', 'const id = params.id;', 'const id = useParams();', 'const id = props.id;'], 'params is a Promise.', { mono: true }),
    mcq(4, 'What must the root layout include?', ['<html> and <body>', 'A <Link>', '"use client"', 'A loading.js'], 'It is the whole document.', { mono: true }),
    mcq(5, 'Which must be a Client Component?', ['error.js', 'loading.js', 'layout.js', 'not-found.js'], 'It handles reset in the browser.', { mono: true }),
    swipe([
      ['<Link> keeps the layout on screen when you move', true, 'Only the page changes.'],
      ['A folder named _lib becomes /_lib', false, 'Underscore folders are private.'],
      ['[...slug] gives an array', true, 'One item per part.'],
      ['notFound() shows error.js', false, 'It shows not-found.js.'],
    ]),
    pairs([['[id]', 'One dynamic part'], ['loading.js', 'While loading'], ['error.js', 'When it breaks'], ['usePathname', 'The current URL']], 'Routing pieces.'),
    pickCode('Which sends a visitor from /old-menu to /menu on the server?', ['redirect("/menu");', 'router.push("/menu");', '<Link href="/menu" />', 'window.location = "/menu";'], 'redirect() runs on the server.'),
    bugTask(['export default function Dish({ params }) {', '  return <h1>Dish {params.id}</h1>;', '}'], [[1, 'export default function Dish', 'export default async function Dish'], [2, '{params.id}', '{(await params).id}']], 'Make the page async and await params.'),
    xray('<div><header><a href="/">Home</a></header><section class="card"><button id="like">Like (2)</button><h1>Cold Coffee</h1></section></div>', [
      ['header', 'The header on every page', 'app/layout.js', ['app/layout.js', 'app/menu/layout.js', 'app/menu/[id]/page.js']],
      ['#like', 'The Like button that keeps its count', 'app/menu/layout.js', ['app/layout.js', 'app/menu/layout.js', 'app/menu/[id]/page.js']],
      ['h1', 'The dish name', 'app/menu/[id]/page.js', ['app/layout.js', 'app/menu/layout.js', 'app/menu/[id]/page.js']],
    ]),
    arrange(['export default async function Dish({ params }) {', '  const { id } = await params;', '  return <h1>Dish number {id}</h1>;', '}'], 'start the async page, await params, show the id, close it', CAFE, 'app/menu/[id]/page.js', '/menu/7'),
  ]),
];
