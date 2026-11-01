// Files shared by the Next.js lesson apps: Rosa’s Café (a small café site) and Sutton Classes (a coaching centre).
// The practice database (@/lib/db, in scripts/next-runtime.js) holds the café’s dishes, orders and users, and the
// coaching centre’s students.
import type { Files } from './kit';

/** The café’s root layout: a header with links on every page, and a title template. */
export const CAFE_LAYOUT = [
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
  '        </header>',
  '        {children}',
  '      </body>',
  '    </html>',
  '  );',
  '}',
];

export const CAFE_HOME = ['export default function Home() {', '  return <h1>Welcome to Rosa’s Café</h1>;', '}'];

export const CAFE_MENU = [
  'export const metadata = { title: "Menu" };',
  '',
  'export default function Menu() {',
  '  return (',
  '    <>',
  '      <h1>Our menu</h1>',
  '      <ul>',
  '        <li>Lemon Tea · ₹40</li>',
  '        <li>Cheese Toast · ₹80</li>',
  '      </ul>',
  '    </>',
  '  );',
  '}',
];

/** The smallest café site: a layout, a home page and a menu page. */
export const CAFE: Files = { 'app/layout.js': CAFE_LAYOUT, 'app/page.js': CAFE_HOME, 'app/menu/page.js': CAFE_MENU };

/** The menu from the practice database, each dish linking to its own page. */
export const DB_MENU = [
  'import Link from "next/link";',
  'import { db } from "@/lib/db";',
  '',
  'export const metadata = { title: "Menu" };',
  '',
  'export default async function Menu() {',
  '  const dishes = await db.dish.findMany();',
  '  return (',
  '    <ul>',
  '      {dishes.map((d) => (',
  '        <li key={d.id}>',
  '          <Link id={"dish-" + d.id} href={"/menu/" + d.id}>{d.name}</Link>',
  '        </li>',
  '      ))}',
  '    </ul>',
  '  );',
  '}',
];

/** One dish’s page, from its id in the address. */
export const DISH_PAGE = [
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
  '      <p>₹{dish.price} · {dish.category}</p>',
  '    </div>',
  '  );',
  '}',
];
