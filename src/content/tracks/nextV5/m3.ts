// Next.js · Module 3 · Rendering Strategies: server-side rendering, static site generation, incremental static
// regeneration, client-side rendering, and choosing one. Lesson 3.1 keeps the old module id (nx-render-1).
// The practice apps behave like a built site: a page that uses nothing per-visit is made once and reused.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const VISITS = ['let count = 0;', '', 'export function nextVisit() {', '  count += 1;', '  return count;', '}'];

const SSR = [
  'import { cookies } from "next/headers";',
  'import { nextVisit } from "@/lib/visits";',
  '',
  'export default async function Today() {',
  '  const store = await cookies();',
  '  const name = store.get("name")?.value ?? "guest";',
  '  const visit = nextVisit();',
  '  console.log("Made the page for visit " + visit);',
  '  return <p>Hello {name}, this page was made for visit {visit}.</p>;',
  '}',
];
const SSG = [
  'import { nextVisit } from "@/lib/visits";',
  '',
  'export default function About() {',
  '  const visit = nextVisit();',
  '  console.log("Made the about page");',
  '  return <p>Rosa’s Café, since 2015. Made on visit {visit}.</p>;',
  '}',
];
const RENDER_APP = { ...CAFE, 'lib/visits.js': VISITS, 'app/today/page.js': SSR, 'app/about/page.js': SSG };

const PARAMS_PAGE = [
  'const DISHES = { 1: "Lemon Tea", 2: "Cold Coffee", 3: "Cheese Toast" };',
  '',
  'export function generateStaticParams() {',
  '  return [{ id: "1" }, { id: "2" }, { id: "3" }];',
  '}',
  '',
  'export const dynamicParams = false;',
  '',
  'export default async function Dish({ params }) {',
  '  const { id } = await params;',
  '  return <h1>{DISHES[id]}</h1>;',
  '}',
];

const ISR_MENU = [
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  '',
  'export const revalidate = 60;',
  '',
  'export default async function Menu() {',
  '  const dishes = await db.dish.findMany();',
  '  console.log("Menu page made with " + dishes.length + " dishes");',
  '  async function addDish() {',
  '    "use server";',
  '    await db.dish.create({ data: { name: "Mint Tea", price: 50 } });',
  '    revalidatePath("/menu");',
  '  }',
  '  return (',
  '    <form id="add" action={addDish}>',
  '      <p>{dishes.length} dishes on the menu</p>',
  '      <button>Add Mint Tea</button>',
  '    </form>',
  '  );',
  '}',
];

const CSR = [
  '"use client";',
  'import { useEffect, useState } from "react";',
  '',
  'export default function Live() {',
  '  const [dishes, setDishes] = useState(null);',
  '  useEffect(() => {',
  '    fetch("/api/menu")',
  '      .then((res) => res.json())',
  '      .then((data) => {',
  '        setDishes(data);',
  '        console.log("Drawn in the browser: " + data.length + " dishes");',
  '      });',
  '  }, []);',
  '  if (!dishes) return <p className="muted">Loading…</p>;',
  '  return <ul>{dishes.map((d) => <li key={d.name}>{d.name}</li>)}</ul>;',
  '}',
];

export const NX_M3: Lesson[] = [
  lesson('nx-render-1', 'Server-side rendering (SSR)', 7, [
    chat(['Rendering means turning your components into the HTML a browser shows.', 'With server-side rendering (SSR), the server makes the page fresh for each visit, so it can show things that differ per visitor, like their name or today’s orders.']),
    tapPage('A page made for every visit', 'This page reads a cookie, so it is made fresh each time. Tap reload (↻) in the address bar.', app(RENDER_APP, '/today'), 'Made the page for visit 2', [{ click: '#cy-reload' }], 'The server ran the component again: visit 2.'),
    explore('What makes it dynamic', SSR, [
      [5, 'cookies() differs per visitor, so Next.js must make the page on each request.'],
      [7, 'This runs again on every visit.'],
      [8, 'Server Components log in the server’s terminal, not the browser.'],
    ], { page: app(RENDER_APP, '/today'), minTaps: 2 }),
    reveal('Things that make a page dynamic', [
      ['cookies() and headers()', 'Each visitor sends their own.'],
      ['searchParams', 'Like ?q=tea: differs per address.'],
      ['connection()', 'Says “wait for a real request” on purpose.'],
      ['fetch(…, { cache: "no-store" })', 'Fresh data every time.'],
    ], { mono: true }),
    check('When is a server-side rendered page made?', ['On the server, for each request', 'Once, when the site is built', 'In the visitor’s browser', 'Only when the code changes'], 'Fresh for each visit.', 'SSR: the server makes it when asked.'),
    truth([
      ['SSR pages can show per-visitor data, like a name from a cookie', true, 'They are made on each request.'],
      ['SSR sends an empty page and fills it in the browser', false, 'The HTML arrives already filled in.'],
      ['A Server Component’s console.log shows in the server’s terminal', true, 'It runs on the server.'],
    ]),
    recap([
      ['🖥', 'SSR: the server makes the page on each request'],
      ['🍪', 'cookies(), headers(), searchParams make a page dynamic'],
      ['✅', 'Good for per-visitor or always-fresh pages'],
    ]),
  ], 'basic'),

  lesson('nx-b-3-2', 'Static site generation (SSG)', 7, [
    chat(['Most pages are the same for everyone: an About page, a blog post, the menu.', 'With static site generation (SSG), Next.js makes them once, at build time, and serves the same HTML to every visitor. It is the fastest way, and the default when a page uses nothing per-visit.']),
    toggle('Static or dynamic?', [
      ['/about (static)', SSG, 'Nothing per-visit: made once. Reload it as often as you like; it was made on visit 1.', app(RENDER_APP, '/about')],
      ['/today (dynamic)', SSR, 'It reads cookies: made again for every visit.', app(RENDER_APP, '/today')],
    ]),
    explore('Pre-building every dish page', PARAMS_PAGE, [
      [3, 'generateStaticParams lists the ids to build ahead of time.'],
      [4, 'Three dish pages are made at build time.'],
      [7, 'dynamicParams = false: any other id is a 404.'],
      [11, 'Each built page shows its dish.', 'h1'],
    ], { page: app({ ...CAFE, 'app/menu/[id]/page.js': PARAMS_PAGE }, '/menu/2'), minTaps: 3 }),
    tapPage('Only the built pages', 'Dishes 1 to 3 were built. Open /menu/3, then /menu/9.', app({ ...CAFE, 'app/menu/[id]/page.js': PARAMS_PAGE }), 'GET /menu/9 404', [...go('/menu/3'), ...go('/menu/9')], 'With dynamicParams = false, ids not in the list are 404.'),
    check('What does generateStaticParams do?', ['Lists the dynamic pages to build ahead of time', 'Reads the URL on each visit', 'Makes the page dynamic', 'Fetches data in the browser'], 'They are made at build time.', 'When are those pages made?'),
    matchUp('Made when?', [['An About page', 'Build time'], ['A page reading cookies()', 'Each request'], ['/menu/[id] with generateStaticParams', 'Build time']], 'Static unless something differs per visit.'),
    recap([
      ['📦', 'SSG: pages made once, at build time'],
      ['⚡', 'The fastest, and the default for pages with nothing per-visit'],
      ['🗂', 'generateStaticParams pre-builds dynamic pages'],
    ]),
  ]),

  lesson('nx-b-3-3', 'Incremental static regeneration (ISR)', 7, [
    chat(['A static menu is fast, but what happens when the café adds a dish? Rebuilding the whole site each time would be slow.', 'Incremental static regeneration (ISR) remakes one static page later: after a set time, or when you say so.']),
    reveal('Two ways to refresh a static page', [
      ['After a time', 'export const revalidate = 60; serves the page, and after 60 seconds the next visit makes a fresh copy in the background.'],
      ['On demand', 'revalidatePath("/menu") after a change says “make /menu again on the next visit”.'],
      ['Meanwhile', 'Visitors always get a ready page, never a wait.'],
    ]),
    tapPage('Remake the menu on demand', 'The menu is static. Add Mint Tea: the Server Action saves it and calls revalidatePath.', app({ ...CAFE, 'app/menu/page.js': ISR_MENU }, '/menu'), 'Menu page made with 6 dishes', [{ submit: '#add' }], 'revalidatePath threw away the old copy, so the page was made again with 6 dishes.'),
    explore('The ISR menu', ISR_MENU, [
      [4, 'Remake this page at most once a minute.'],
      [8, 'This only runs when the page is (re)made.'],
      [12, 'On-demand: remake /menu now that the data changed.'],
    ]),
    tapbug('The new dish never shows on the static menu', ['async function addDish() {', '  "use server";', '  await db.dish.create({ data: { name: "Mint Tea", price: 50 } });', '}'], [[3, 'price: 50 } });', 'price: 50 } }); revalidatePath("/menu");']], 'The saved data changed but the static page didn’t. Call revalidatePath("/menu").'),
    check('With revalidate = 60, what does a visitor get 2 minutes after a change?', ['The old page, while a fresh one is made for the next visit', 'An error', 'A blank page while it rebuilds', 'The whole site is rebuilt first'], 'Stale-while-revalidate: always fast.', 'Visitors never wait.'),
    recap([
      ['⏱', 'revalidate = 60: remake after a time'],
      ['🎯', 'revalidatePath / revalidateTag: remake on demand'],
      ['⚡', 'Static speed, data that stays fresh'],
    ]),
  ]),

  lesson('nx-b-3-4', 'Client-side rendering, and choosing a strategy', 7, [
    chat(['With client-side rendering (CSR), the browser gets a nearly empty page, then JavaScript loads the data and draws it.', 'In Next.js you do this inside a Client Component, with useEffect and fetch, like in React.']),
    tapPage('Drawn in the browser', 'This page loads the menu in the browser. Open it and wait for the list.', app({ ...CAFE, 'app/live/page.js': CSR }), 'Drawn in the browser: 4 dishes', go('/live'), 'First “Loading…”, then the browser fetched and drew the list.'),
    explore('Client-side rendering', CSR, [
      [1, 'A Client Component.'],
      [6, 'useEffect runs in the browser after the first draw.'],
      [14, 'The page shows “Loading…” until the data arrives.'],
    ]),
    reveal('Which one when?', [
      ['SSG', 'Same for everyone, changes rarely: About, blog posts, docs.'],
      ['ISR', 'Same for everyone, changes sometimes: a menu, a product list.'],
      ['SSR', 'Per visitor or always fresh: an account page, today’s orders.'],
      ['CSR', 'Very interactive parts after load: a live chart, a chat box.'],
    ]),
    matchUp('Pick the strategy', [['Terms and conditions', 'SSG'], ['A shop’s product list', 'ISR'], ['My orders', 'SSR'], ['A live order tracker', 'CSR']], 'Static when you can; dynamic when you must.'),
    check('Why is CSR weaker for search engines?', ['The first HTML has no content, only “Loading…”', 'It is always slower to code', 'Search engines block JavaScript sites', 'It cannot use APIs'], 'The content arrives later, in the browser.', 'What is in the first HTML?'),
    recap([
      ['🧭', 'CSR: the browser loads and draws the data'],
      ['🏗', 'Mix them: one site can use all four'],
      ['⚡', 'Prefer static; go dynamic only where needed'],
    ]),
  ]),

  challenge('nx-b-3-ch', 'Module 3 Challenge', { icon: '🏗', name: 'Render Planner' }, ['Tell SSR, SSG, ISR and CSR apart', 'Pre-build pages and refresh them', 'Choose a strategy for each page'], [
    mcq(1, 'Which strategy makes a page once, at build time?', ['SSG', 'SSR', 'CSR', 'None'], 'Static site generation.'),
    mcq(2, 'Which makes a page dynamic?', ['Calling cookies()', 'Using a <Link>', 'Importing CSS', 'Using metadata'], 'It differs per visitor.'),
    mcq(3, 'What does export const revalidate = 60 do?', ['Remakes the static page at most once a minute', 'Reloads the browser every minute', 'Makes the page dynamic', 'Deletes the page after a minute'], 'ISR on a timer.', { mono: true }),
    mcq(4, 'Where does client-side rendering fetch its data?', ['In the browser, after the page loads', 'On the server, before sending', 'At build time', 'In next.config.js'], 'In a Client Component.'),
    mcq(5, 'What does dynamicParams = false do?', ['Ids not from generateStaticParams give a 404', 'Turns off params', 'Makes every page dynamic', 'Hides the URL'], 'Only the pre-built pages exist.', { mono: true }),
    swipe([
      ['Static pages are the fastest to serve', true, 'The HTML is ready.'],
      ['SSR pages can show the visitor’s name from a cookie', true, 'Made per request.'],
      ['ISR rebuilds the whole site', false, 'Only the page that needs it.'],
      ['CSR is best for search engines', false, 'The first HTML is nearly empty.'],
    ]),
    pairs([['SSG', 'Build time'], ['SSR', 'Each request'], ['ISR', 'Static, refreshed later'], ['CSR', 'In the browser']], 'When each page is made.'),
    pickCode('Which refreshes the static menu after adding a dish?', ['revalidatePath("/menu");', 'router.push("/menu");', 'export const dynamic = "error";', 'location.reload();'], 'On-demand ISR.'),
    bugTask(['async function addDish() {', '  "use server";', '  await db.dish.create({ data });', '}', 'export default function Live() { useEffect(load, []); }'], [[3, 'await db.dish.create({ data });', 'await db.dish.create({ data }); revalidatePath("/menu");'], [5, 'export default function Live()', '"use client"; export default function Live()']], 'Refresh the static page after a change, and mark the page that uses useEffect as a Client Component.'),
    xray('<div><p class="muted">Loading…</p><p class="today">Hello Sam, this page was made for visit 3.</p><p class="about">Rosa’s Café, since 2015.</p></div>', [
      ['.muted', 'Loading, then drawn in the browser', 'CSR', ['CSR', 'SSR', 'SSG']],
      ['.today', 'A greeting made per visit', 'SSR', ['CSR', 'SSR', 'SSG']],
      ['.about', 'The same for everyone', 'SSG', ['CSR', 'SSR', 'SSG']],
    ]),
    arrange(['export const generateStaticParams = () => [{ id: "1" }, { id: "2" }];', 'export default async function Dish({ params }) {', '  const { id } = await params;', '  return <h1>Dish {id}</h1>;', '}'], 'list the ids to pre-build, then the page: start it, await params, show the id, close it', CAFE, 'app/menu/[id]/page.js', '/menu/1'),
  ]),
];
