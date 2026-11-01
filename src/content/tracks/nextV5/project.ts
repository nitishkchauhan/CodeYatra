// Next.js · Final project: Rosa’s Café online menu (keeps the old project id, nx-project). Six checked steps, each
// editing one file of a live app: the layout, a dish page, a Route Handler, a Server Action with checks, an
// owner-only page, and metadata. Every step’s starter and solution are drawn in tests (lessonV5.test.ts).
import type { Lesson, WebCheck } from '../../types';
import { finalProject } from '../htmlV5/kit';
import { CAFE_HOME, DB_MENU } from './apps';
import { AUTH_APP } from './auth';
import { bugTask, challenge, mcq, pairs, pickCode, swipe, UI, xray, type Files } from './kit';

const join = (lines: string[]) => lines.join('\n');

const LAYOUT_START = ['export default function RootLayout() {', '  return (', '    <html lang="en">', '      <body>', '        <h1>Rosa’s Café</h1>', '      </body>', '    </html>', '  );', '}'];
const LAYOUT = [
  'import Link from "next/link";',
  '',
  'export const metadata = {',
  '  title: { default: "Rosa’s Café", template: "%s · Rosa’s Café" },',
  '};',
  '',
  'export default function RootLayout({ children }) {',
  '  return (',
  '    <html lang="en">',
  '      <body>',
  '        <header>',
  '          <Link href="/">Home</Link>',
  '          <Link href="/menu">Menu</Link>',
  '          <Link href="/order">Order</Link>',
  '        </header>',
  '        {children}',
  '      </body>',
  '    </html>',
  '  );',
  '}',
];

const DISH_START = ['export default async function Dish() {', '  return <h1>A dish</h1>;', '}'];
const DISH = [
  'import { notFound } from "next/navigation";',
  'import { db } from "@/lib/db";',
  '',
  'export default async function Dish({ params }) {',
  '  const { id } = await params;',
  '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });',
  '  if (!dish) notFound();',
  '  return (',
  '    <div className="card">',
  '      <h1>{dish.name}</h1>',
  '      <p>₹{dish.price} · {dish.veg ? "Veg" : "Non-veg"}</p>',
  '    </div>',
  '  );',
  '}',
];
const DISH_META = [
  'import { notFound } from "next/navigation";',
  'import { db } from "@/lib/db";',
  '',
  'async function getDish(params) {',
  '  const { id } = await params;',
  '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });',
  '  if (!dish) notFound();',
  '  return dish;',
  '}',
  '',
  'export async function generateMetadata({ params }) {',
  '  const dish = await getDish(params);',
  '  return { title: dish.name, description: dish.name + " for ₹" + dish.price + " at Rosa’s Café." };',
  '}',
  '',
  'export default async function Dish({ params }) {',
  '  const dish = await getDish(params);',
  '  return (',
  '    <div className="card">',
  '      <h1>{dish.name}</h1>',
  '      <p>₹{dish.price} · {dish.veg ? "Veg" : "Non-veg"}</p>',
  '    </div>',
  '  );',
  '}',
];

const API_START = ['export async function GET() {', '  return Response.json([]);', '}'];
const API = [
  'import { db } from "@/lib/db";',
  '',
  'export async function GET() {',
  '  const dishes = await db.dish.findMany({ select: { id: true, name: true, price: true } });',
  '  return Response.json(dishes);',
  '}',
];

const ACTION_START = [
  '"use server";',
  'import { db } from "@/lib/db";',
  '',
  'export async function placeOrder(previous, formData) {',
  '  await db.order.create({ data: { dishId: formData.get("dish"), qty: formData.get("qty") } });',
  '  return "Order placed";',
  '}',
];
const ACTION = [
  '"use server";',
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  '',
  'export async function placeOrder(previous, formData) {',
  '  const dishId = Number(formData.get("dish"));',
  '  const qty = Number(formData.get("qty"));',
  '  const dish = await db.dish.findUnique({ where: { id: dishId } });',
  '  if (!dish) return "Please pick a dish from the menu.";',
  '  if (!(Number.isInteger(qty) && qty >= 1 && qty <= 10)) return "Order between 1 and 10.";',
  '  await db.order.create({ data: { dishId, dish: dish.name, qty } });',
  '  console.log("Order: " + qty + " × " + dish.name);',
  '  revalidatePath("/order");',
  '  return "Order placed: " + qty + " × " + dish.name;',
  '}',
];
const ORDER_FORM = [
  '"use client";',
  'import { useActionState } from "react";',
  'import { placeOrder } from "./actions";',
  '',
  'export default function OrderForm({ dishes }) {',
  '  const [message, formAction, pending] = useActionState(placeOrder, "");',
  '  return (',
  '    <form id="order" action={formAction} className="card">',
  '      <select name="dish">{dishes.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>',
  '      <input name="qty" defaultValue="1" inputMode="numeric" />',
  '      <button disabled={pending}>{pending ? "Placing…" : "Place order"}</button>',
  '      {message && <p className="muted">{message}</p>}',
  '    </form>',
  '  );',
  '}',
];
const ORDER_PAGE = ['import { db } from "@/lib/db";', 'import OrderForm from "./OrderForm";', '', 'export const metadata = { title: "Order" };', '', 'export default async function Order() {', '  const dishes = await db.dish.findMany();', '  return <OrderForm dishes={dishes} />;', '}'];

const ADMIN_START = ['import { db } from "@/lib/db";', '', 'export default async function Admin() {', '  const orders = await db.order.findMany();', '  return <h1>{orders.length} orders today</h1>;', '}'];
const ADMIN = [
  'import { redirect } from "next/navigation";',
  'import { db } from "@/lib/db";',
  'import { getUser } from "@/lib/session";',
  '',
  'export default async function Admin() {',
  '  const user = await getUser();',
  '  if (!user) redirect("/login");',
  '  if (user.role !== "owner") return <p className="err">Only the owner can see orders.</p>;',
  '  const orders = await db.order.findMany();',
  '  return <h1>{orders.length} orders today</h1>;',
  '}',
];

/** The café app as it is at one step; `edit` is the file the learner works on. */
const at = (files: Files, edit: string, url: string) => ({ files: Object.fromEntries(Object.entries(files).map(([k, v]) => [k, Array.isArray(v) ? join(v) : v])), edit, url });
const BASE: Files = { ...AUTH_APP, 'app/layout.js': LAYOUT, 'app/page.js': CAFE_HOME, 'app/menu/page.js': DB_MENU, 'app/menu/[id]/page.js': DISH, 'app/api/menu/route.js': API, 'app/order/actions.js': ACTION, 'app/order/OrderForm.js': ORDER_FORM, 'app/order/page.js': ORDER_PAGE, 'app/admin/page.js': ADMIN };

const step = (n: number, title: string, instructions: string, edit: string, url: string, starter: string[], solution: string[], checks: Omit<WebCheck, 'file'>[], hint: string) =>
  finalProject({
    title: `Step ${n} · ${title}`,
    instructions,
    starter: { html: '', css: UI, js: join(starter) },
    solution: { html: '', css: UI, js: join(solution) },
    checks: checks.map((c) => ({ ...c, file: 'js' as const })),
    hint,
    next: at(BASE, edit, url),
  });

export const NX_PROJECT: Lesson = challenge('nx-project', 'Final: Rosa’s Café online menu', { icon: '🏆', name: 'Next.js Pro' }, ['Build a site from layouts, dynamic pages and an API', 'Take orders with a checked Server Action', 'Protect pages by role and add metadata'], [
  mcq(1, 'Where does the header shown on every page go?', ['app/layout.js', 'app/page.js', 'app/header/page.js', 'public/header.html'], 'The root layout wraps every page.', { mono: true }),
  mcq(2, 'How does /menu/2 know which dish to show?', ['It awaits params and reads id', 'It reads window.location', 'It uses useState', 'From a cookie'], 'params from the [id] folder.'),
  mcq(3, 'Which file gives other apps the menu as JSON?', ['app/api/menu/route.js', 'app/menu/page.js', 'app/menu/layout.js', 'next.config.js'], 'A Route Handler.', { mono: true }),
  mcq(4, 'Where must the order be checked?', ['In the Server Action, on the server', 'Only in the form', 'In the layout', 'In proxy.js'], 'Anyone can call an action.'),
  mcq(5, 'A signed-in customer opens /admin. What should happen?', ['They see “owners only”, not the orders', 'They see the orders', 'The site crashes', 'They are signed out'], 'Check the role.'),
  swipe([
    ['notFound() shows a 404 for a missing dish', true, 'And not-found.js if there is one.'],
    ['Server Actions should trust the quantity sent', false, 'Check it is 1 to 10.'],
    ['generateMetadata can read the dish for the title', true, 'It gets params too.'],
    ['The owner check belongs only in the browser', false, 'On the server.'],
  ]),
  pairs([['app/layout.js', 'Header on every page'], ['app/menu/[id]/page.js', 'One dish'], ['app/api/menu/route.js', 'Menu as JSON'], ['app/order/actions.js', 'Place an order']], 'The app’s files.'),
  pickCode('Which checks the quantity?', ['if (!(Number.isInteger(qty) && qty >= 1 && qty <= 10)) return "Order between 1 and 10.";', 'if (qty) save();', '<input max="10" />', 'qty = Math.min(qty, 10);'], 'On the server, with a clear message.'),
  bugTask(['const id = params.id;', 'export async function get() {', 'if (user) return <h1>Orders</h1>;'], [[1, 'const id = params.id;', 'const { id } = await params;'], [2, 'function get()', 'function GET()'], [3, 'if (user)', 'if (user?.role === "owner")']], 'Await params, name the method in capitals, and check the role.'),
  xray('<div><header><a href="/menu">Menu</a></header><div class="card"><h1>Cold Coffee</h1></div><form id="order"><button>Place order</button></form></div>', [
    ['header', 'The header', 'app/layout.js', ['app/layout.js', 'app/menu/[id]/page.js', 'app/order/actions.js']],
    ['.card', 'A dish page', 'app/menu/[id]/page.js', ['app/layout.js', 'app/menu/[id]/page.js', 'app/order/actions.js']],
    ['form', 'The order form’s action', 'app/order/actions.js', ['app/layout.js', 'app/menu/[id]/page.js', 'app/order/actions.js']],
  ]),
  step(1, 'A layout for every page', 'Rosa’s Café needs an online menu. Start with the root layout: a header with links to Home, Menu and Order, the current page through {children}, and a title template.', 'app/layout.js', '/', LAYOUT_START, LAYOUT, [
    { label: 'Shows the page through children', pattern: /RootLayout\(\{ children \}\)[\s\S]*\{children\}/ },
    { label: 'Links with next/link', pattern: /<Link href="\/menu">Menu<\/Link>/ },
    { label: 'A title template', pattern: /template: "%s · Rosa’s Café"/ },
  ], 'Take { children }, add <header> with three <Link>s, then {children}.'),
  step(2, 'A page for each dish', 'Make app/menu/[id]/page.js show one dish from the database. A missing dish must give a 404.', 'app/menu/[id]/page.js', '/menu/2', DISH_START, DISH, [
    { label: 'Awaits params', pattern: /const \{ id \} = await params;/ },
    { label: 'Finds the dish by its id', pattern: /findUnique\(\{ where: \{ id: Number\(id\) \} \}\)/ },
    { label: 'A missing dish is a 404', pattern: /if \(!dish\) notFound\(\);/ },
  ], 'const { id } = await params; then db.dish.findUnique({ where: { id: Number(id) } }) and notFound() if it is missing.'),
  step(3, 'The menu as an API', 'A delivery partner wants the menu as JSON at /api/menu. Send the id, name and price of every dish.', 'app/api/menu/route.js', '/api/menu', API_START, API, [
    { label: 'Answers GET', pattern: /export async function GET\(\)/ },
    { label: 'Reads only the fields needed', pattern: /select: \{ id: true, name: true, price: true \}/ },
    { label: 'Sends JSON', pattern: /return Response\.json\(dishes\);/ },
  ], 'await db.dish.findMany({ select: { … } }), then Response.json(dishes).'),
  step(4, 'Take orders safely', 'The order form calls placeOrder. Check the dish exists and the quantity is 1 to 10, then save it and refresh /order.', 'app/order/actions.js', '/order', ACTION_START, ACTION, [
    { label: 'Turns the form values into numbers', pattern: /const qty = Number\(formData\.get\("qty"\)\);/ },
    { label: 'Checks the dish exists', pattern: /if \(!dish\) return/ },
    { label: 'Checks the quantity', pattern: /Number\.isInteger\(qty\) && qty >= 1 && qty <= 10/ },
    { label: 'Refreshes the page', pattern: /revalidatePath\("\/order"\);/ },
  ], 'Number(…) both values, findUnique the dish, check qty, create, then revalidatePath("/order").'),
  step(5, 'Owners only', 'The /admin page lists today’s orders. Only Rosa, the owner, may see them: send strangers to /login and tell customers no.', 'app/admin/page.js', '/admin', ADMIN_START, ADMIN, [
    { label: 'Finds the user', pattern: /const user = await getUser\(\);/ },
    { label: 'Strangers go to /login', pattern: /if \(!user\) redirect\("\/login"\);/ },
    { label: 'Only the owner sees orders', pattern: /if \(user\.role !== "owner"\) return/ },
  ], 'getUser(), redirect("/login") if none, and stop unless user.role is "owner".'),
  step(6, 'Titles for search engines', 'Give every dish page its own title and description, so “Cold Coffee · Rosa’s Café” shows in search results.', 'app/menu/[id]/page.js', '/menu/2', DISH, DISH_META, [
    { label: 'A shared getDish helper', pattern: /async function getDish\(params\)/ },
    { label: 'generateMetadata', pattern: /export async function generateMetadata\(\{ params \}\)/ },
    { label: 'The dish name is the title', pattern: /title: dish\.name/ },
  ], 'Move the lookup into getDish(params), then export generateMetadata that returns { title: dish.name, description }.'),
], { kind: 'project', level: 'advanced' });
