// Next.js · Module 4 · Data Fetching: Server and Client Components, server-side fetching with fetch and the database,
// client-side fetching and streaming, and caching and revalidation ("use cache", cacheTag, updateTag).
// Lesson 4.1 keeps the old module id (nx-data-1). Absolute https://cafe.example.com/api/… addresses are answered by
// the practice server, offline.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const FAV = [
  '"use client";',
  'import { useState } from "react";',
  '',
  'export default function Favourite({ dish }) {',
  '  const [on, setOn] = useState(false);',
  '  function toggle() {',
  '    setOn(!on);',
  '    console.log((on ? "Removed " : "Saved ") + dish);',
  '  }',
  '  return (',
  '    <button id={"fav-" + dish.length} onClick={toggle}>',
  '      {on ? "★" : "☆"} {dish}',
  '    </button>',
  '  );',
  '}',
];
const FAV_PAGE = [
  'import { db } from "@/lib/db";',
  'import Favourite from "./Favourite";',
  '',
  'export default async function Menu() {',
  '  const dishes = await db.dish.findMany({ where: { category: "Drinks" } });',
  '  return (',
  '    <div className="card">',
  '      <h2>Drinks</h2>',
  '      {dishes.map((d) => <Favourite key={d.id} dish={d.name} />)}',
  '    </div>',
  '  );',
  '}',
];
const FAV_APP = { ...CAFE, 'app/menu/page.js': FAV_PAGE, 'app/menu/Favourite.js': FAV };

const DASH = [
  'import { db } from "@/lib/db";',
  '',
  'async function getMenu() {',
  '  const res = await fetch("https://cafe.example.com/api/menu");',
  '  if (!res.ok) throw new Error("Could not load the menu");',
  '  return res.json();',
  '}',
  '',
  'export default async function Dashboard() {',
  '  const [menu, students] = await Promise.all([',
  '    getMenu(),',
  '    db.student.findMany(),',
  '  ]);',
  '  console.log("Loaded " + menu.length + " dishes and " + students.length + " students");',
  '  return (',
  '    <>',
  '      <h1>Dashboard</h1>',
  '      <p className="card">Dishes today: {menu.length}</p>',
  '      <p className="card">Students: {students.length}</p>',
  '    </>',
  '  );',
  '}',
];

const STREAM = [
  'import { Suspense } from "react";',
  '',
  'async function Reviews() {',
  '  const res = await fetch("https://cafe.example.com/api/menu");',
  '  const dishes = await res.json();',
  '  console.log("Reviews streamed in");',
  '  return <ul>{dishes.map((d) => <li key={d.name}>{d.name}: ★★★★☆</li>)}</ul>;',
  '}',
  '',
  'export default function Dish() {',
  '  return (',
  '    <>',
  '      <h1>Lemon Tea · ₹40</h1>',
  '      <Suspense fallback={<p className="muted">Loading reviews…</p>}>',
  '        <Reviews />',
  '      </Suspense>',
  '    </>',
  '  );',
  '}',
];

const SEARCH = [
  '"use client";',
  'import { useEffect, useState } from "react";',
  '',
  'export default function Batches() {',
  '  const [batches, setBatches] = useState([]);',
  '  const [error, setError] = useState("");',
  '  useEffect(() => {',
  '    fetch("/api/batches")',
  '      .then((res) => {',
  '        if (!res.ok) throw new Error("Could not load batches");',
  '        return res.json();',
  '      })',
  '      .then(setBatches)',
  '      .catch((e) => setError(e.message));',
  '  }, []);',
  '  if (error) return <p className="err">{error}</p>;',
  '  return <ul>{batches.map((b) => <li key={b.course}>{b.course}: {b.days}</li>)}</ul>;',
  '}',
];

const CACHED = [
  'import { cacheLife, cacheTag, updateTag } from "next/cache";',
  'import { connection } from "next/server";',
  'import { nextVisit } from "@/lib/visits";',
  '',
  'let made = 0;',
  '',
  'async function getSpecial() {',
  '  "use cache";',
  '  cacheLife("hours");',
  '  cacheTag("special");',
  '  made += 1;',
  '  console.log("Cooked special #" + made);',
  '  return "Special #" + made + ": Mango Tea";',
  '}',
  '',
  'export default async function Home() {',
  '  await connection();',
  '  const special = await getSpecial();',
  '  async function newSpecial() {',
  '    "use server";',
  '    updateTag("special");',
  '  }',
  '  return (',
  '    <form id="new" action={newSpecial}>',
  '      <p className="card">{special}</p>',
  '      <p className="muted">Page made for visit {nextVisit()}</p>',
  '      <button>New special</button>',
  '    </form>',
  '  );',
  '}',
];
const CACHE_APP = { ...CAFE, 'lib/visits.js': ['let count = 0;', '', 'export function nextVisit() {', '  count += 1;', '  return count;', '}'], 'app/page.js': CACHED };

export const NX_M4: Lesson[] = [
  lesson('nx-data-1', 'Server and Client Components', 8, [
    chat(['In Next.js every component is a Server Component unless you say otherwise. It runs on the server, can read the database, and sends no JavaScript to the phone.', 'When a part needs taps, state or browser features, put "use client" at the top of its file. That file, and what it imports, runs in the browser too.']),
    tapPage('Server and client, side by side', 'The list comes from the database on the server. The stars are Client Components. Save Lemon Tea.', app(FAV_APP, '/menu'), 'Saved Lemon Tea', [{ click: '#fav-9' }], 'The page read the database on the server; the star needed state, so it is a Client Component.'),
    explore('Where the line is', FAV_PAGE, [
      [1, 'A Server Component can use the database directly.'],
      [5, 'It awaits data before drawing.'],
      [9, 'It passes plain data (a name) to the Client Component.', 'button'],
    ], { page: app(FAV_APP, '/menu'), minTaps: 2 }),
    reveal('Which one?', [
      ['Server Component', 'Fetch data, use secrets and the database, keep heavy code off the phone.'],
      ['Client Component', 'useState, useEffect, onClick, onChange, and browser things like localStorage.'],
      ['Props across the line', 'Only data that can be sent: text, numbers, arrays, plain objects. Not functions (except Server Actions).'],
      ['Server inside client', 'Pass Server Components to a Client Component as children.'],
    ]),
    tapbug('Error: Event handlers like onClick can’t be used in a Server Component', ['export default function Like() {', '  return <button onClick={() => alert("Liked")}>Like</button>;', '}'], [[1, 'export default function Like', '"use client"; export default function Like']], 'A button with onClick needs a Client Component.'),
    check('Which needs "use client"?', ['A search box that uses useState', 'A page that reads the database', 'A footer with plain text', 'A layout with a header'], 'State runs in the browser.', 'Which one needs the browser?'),
    truth([
      ['Components are Server Components by default', true, 'Add "use client" only where needed.'],
      ['A Server Component can read process.env secrets safely', true, 'Its code never reaches the browser.'],
      ['You can pass any function as a prop to a Client Component', false, 'Only Server Actions.'],
    ]),
    recap([
      ['🖥', 'Server Components by default: data, secrets, less JavaScript'],
      ['📱', '"use client" for state, events and browser features'],
      ['📦', 'Pass plain data across; keep the client parts small'],
    ]),
  ], 'basic'),

  lesson('nx-b-4-2', 'Fetching data on the server', 8, [
    chat(['A Server Component can be async. It awaits its data, then returns the page, so the HTML arrives already filled in.', 'Use fetch for other servers’ APIs, or call your database directly. No useEffect, no loading flicker.']),
    tapPage('A dashboard from two sources', 'Open /dashboard. It loads the menu from an API and the students from the database.', app({ ...CAFE, 'app/dashboard/page.js': DASH }), 'Loaded 4 dishes and 3 students', go('/dashboard'), 'The log line is printed on the server, before the page is sent.'),
    explore('Fetching on the server', DASH, [
      [3, 'A small helper that fetches from another server.'],
      [5, 'Check res.ok: fetch does not throw on a 404 or 500.'],
      [9, 'The page itself is async.'],
      [10, 'Promise.all starts both at once, so they load in parallel.'],
      [14, 'This runs on the server.'],
    ], { page: app({ ...CAFE, 'app/dashboard/page.js': DASH }, '/dashboard'), minTaps: 3 }),
    toggle('One after another, or together?', [
      ['Sequential', ['const menu = await getMenu();', 'const students = await db.student.findMany();'], 'The second waits for the first: about 0.6 + 0.1 seconds.'],
      ['Parallel', ['const [menu, students] = await Promise.all([', '  getMenu(),', '  db.student.findMany(),', ']);'], 'Both start at once: about 0.6 seconds.'],
    ]),
    tapbug('The page shows “Dishes today: undefined”', ['async function getMenu() {', '  const res = await fetch("https://cafe.example.com/api/menu");', '  return res;', '}'], [[3, 'return res;', 'return res.json();']], 'res is the response. res.json() reads the data from it.'),
    check('Why use Promise.all here?', ['The requests don’t depend on each other, so they can run at once', 'It caches the data', 'It makes the page dynamic', 'fetch needs it on the server'], 'Parallel is faster.', 'Does the second request need the first?'),
    recap([
      ['⏳', 'async Server Components await data before sending'],
      ['🌐', 'fetch other APIs, or use the database directly'],
      ['⚡', 'Promise.all for requests that don’t depend on each other'],
    ]),
  ]),

  lesson('nx-b-4-3', 'Client-side fetching and streaming', 8, [
    reveal('Two ways to avoid waiting', [
      ['Streaming', 'Send the fast parts at once and the slow part later, inside <Suspense fallback>.'],
      ['Client-side fetching', 'A Client Component fetches in the browser with useEffect, after the page shows.'],
      ['Which?', 'Streaming for data you know at request time; client fetching for data that changes after taps, or that only the browser can get.'],
    ]),
    tapPage('Stream the slow part', 'Open /dish. The name shows at once; the reviews stream in.', app({ ...CAFE, 'app/dish/page.js': STREAM }), 'Reviews streamed in', go('/dish'), 'The fallback showed first, then the reviews replaced it. No one waited for the whole page.'),
    explore('Streaming with Suspense', STREAM, [
      [3, 'A slow async Server Component.'],
      [13, 'This part is sent straight away.', 'h1'],
      [14, 'Suspense shows the fallback until Reviews is ready.'],
    ], { page: app({ ...CAFE, 'app/dish/page.js': STREAM }, '/dish'), minTaps: 2 }),
    explore('Fetching in the browser', SEARCH, [
      [1, 'A Client Component, so it can use useEffect.'],
      [8, 'fetch runs in the browser after the first draw.'],
      [10, 'Check res.ok and show an error if it failed.'],
    ], { page: app({ ...CAFE, 'app/batches/page.js': SEARCH }, '/batches'), minTaps: 2 }),
    matchUp('Pick the way', [['Reviews on a dish page', 'Streaming'], ['Live search results while typing', 'Client fetch'], ['The menu', 'Server fetch']], 'Server first; stream slow parts; fetch in the browser for what changes after taps.'),
    check('What does <Suspense fallback> do in a Server Component page?', ['Shows the fallback while that part loads, then streams it in', 'Fetches data in the browser', 'Makes the page static', 'Hides errors'], 'The rest of the page is not held up.', 'What shows first?'),
    recap([
      ['🌊', 'Suspense streams slow parts; the rest shows at once'],
      ['📱', 'Client Components can fetch in the browser with useEffect'],
      ['🖥', 'Fetch on the server when you can'],
    ]),
  ]),

  lesson('nx-b-4-4', 'Caching and revalidation', 8, [
    chat(['Fetching the same data again and again is slow and costs money. Caching keeps a result and reuses it.', 'In Next.js 16, you choose what to cache: put "use cache" at the top of a function or component (with cacheComponents: true in next.config.js).']),
    tapPage('A cached special', 'The page is made for every visit, but the special is cached. Reload (↻), then tap New special.', app(CACHE_APP), 'Cooked special #2', [{ click: '#cy-reload' }, { submit: '#new' }], 'Reloading made the page again but reused the special. updateTag threw it away, so it was cooked again.'),
    explore('Caching on purpose', CACHED, [
      [8, '"use cache" stores what this function returns.'],
      [9, 'cacheLife sets how long it stays fresh.'],
      [10, 'cacheTag names it, so you can refresh it later.'],
      [17, 'connection() makes the page itself dynamic.'],
      [21, 'updateTag throws away everything tagged "special".'],
    ]),
    reveal('Refreshing cached data', [
      ['updateTag("special")', 'In a Server Action: refresh now, so the person who made the change sees it.'],
      ['revalidateTag("special", "max")', 'Mark it stale; the next visit gets the old copy while a new one is made.'],
      ['revalidatePath("/menu")', 'Refresh everything on one page.'],
      ['cacheLife("hours")', 'Or "minutes", "days", "max": how long before it is stale.'],
    ], { mono: true }),
    tapbug('Every visitor sees one person’s cart', ['async function getCart() {', '  "use cache";', '  const store = await cookies();', '  return db.cart.findMany({ where: { user: store.get("user").value } });', '}'], [[2, '"use cache";', '// no cache: this is per-visitor data']], 'Never cache per-visitor data for everyone. Leave it out of "use cache".'),
    check('After saving a new special in a Server Action, which shows it at once?', ['updateTag("special")', 'cacheLife("max")', 'cacheTag("special")', '"use cache"'], 'updateTag refreshes now.', 'Which one throws the old copy away?', { mono: true }),
    recap([
      ['🧊', '"use cache" caches a function or component, on purpose'],
      ['🏷', 'cacheTag names it; cacheLife sets how long'],
      ['🔄', 'updateTag, revalidateTag, revalidatePath refresh it'],
    ]),
  ]),

  challenge('nx-b-4-ch', 'Module 4 Challenge', { icon: '📡', name: 'Data Fetcher' }, ['Split work between server and client', 'Fetch and stream data on the server', 'Cache data and refresh it'], [
    mcq(1, 'By default, a component in app/ is…', ['A Server Component', 'A Client Component', 'Static HTML only', 'Cached for a day'], 'Add "use client" to change it.'),
    mcq(2, 'Which can a Server Component do?', ['Read the database directly', 'Use useState', 'Handle onClick', 'Read localStorage'], 'Data and secrets on the server.'),
    mcq(3, 'Why check res.ok after fetch?', ['fetch doesn’t throw on a 404 or 500', 'fetch never fails', 'To cache the result', 'To make it parallel'], 'Check it yourself.'),
    mcq(4, 'What does Promise.all do with two requests?', ['Runs them at the same time', 'Runs them one after another', 'Caches both', 'Cancels the slower one'], 'Parallel fetching.'),
    mcq(5, 'Which marks a function’s result to be cached?', ['"use cache"', '"use client"', '"use server"', '"use strict"'], 'Caching is on purpose in Next.js 16.', { mono: true }),
    swipe([
      ['Suspense lets fast parts show before slow ones', true, 'Streaming.'],
      ['Client Components can use useEffect to fetch', true, 'In the browser.'],
      ['Per-visitor data should be cached for everyone', false, 'Others would see it.'],
      ['updateTag refreshes tagged cached data', true, 'Use it in a Server Action.'],
    ]),
    pairs([['"use client"', 'Runs in the browser too'], ['<Suspense>', 'Stream a slow part'], ['"use cache"', 'Keep a result'], ['updateTag', 'Throw it away']], 'Data fetching tools.'),
    pickCode('Which loads two things at once?', ['const [a, b] = await Promise.all([getA(), getB()]);', 'const a = await getA(); const b = await getB();', 'const a = getA(); const b = getB();', 'await getA(getB());'], 'Both start together.'),
    bugTask(['export default function Search() {', '  const [q, setQ] = useState("");', 'async function getMenu() { const res = await fetch(url); return res; }'], [[1, 'export default function Search', '"use client"; export default function Search'], [3, 'return res;', 'return res.json();']], 'useState needs a Client Component, and read the data with res.json().'),
    xray('<div><h1>Lemon Tea · ₹40</h1><p class="muted">Loading reviews…</p><button id="fav">☆ Lemon Tea</button><p class="card">Special #1: Mango Tea</p></div>', [
      ['.muted', 'Shown while reviews load', '<Suspense fallback>', ['<Suspense fallback>', '"use client"', '"use cache"']],
      ['#fav', 'A star you can tap', '"use client"', ['<Suspense fallback>', '"use client"', '"use cache"']],
      ['.card', 'A special kept for hours', '"use cache"', ['<Suspense fallback>', '"use client"', '"use cache"']],
    ]),
    arrange(['import { db } from "@/lib/db";', 'export default async function Students() {', '  const list = await db.student.findMany();', '  return <p>{list.length} students</p>;', '}'], 'import the database, start the async page, await the data, show it, close it', CAFE, 'app/students/page.js', '/students'),
  ]),
];
