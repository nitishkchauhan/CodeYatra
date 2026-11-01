import { describe, expect, it } from '@jest/globals';

import { runPage } from '@/content/testing/page';
import type { NextApp } from '@/lib/web/page';

// The teaching copy of Next.js (scripts/next-runtime.js) behaves like Next.js 16 for what the lessons use.
const LAYOUT = `export const metadata = { title: { default: "Rosa’s Café", template: "%s · Rosa’s Café" } };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Rosa’s Café</header>
        {children}
      </body>
    </html>
  );
}`;

const open = async (app: NextApp, wait = 900) => {
  const page = await runPage({ html: '', next: app }, wait);
  const doc = page.window.document;
  const go = async (url: string, ms = 600) => {
    (doc.querySelector('#cy-url') as HTMLInputElement).value = url;
    doc.querySelector('#cy-go')!.dispatchEvent(new page.window.Event('submit', { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, ms));
  };
  const click = async (sel: string, ms = 600) => {
    doc.querySelector(sel)!.dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, ms));
  };
  const text = () => doc.querySelector('#root')!.textContent ?? '';
  const logs = () => page.logs.map((l) => (l.level === 'error' ? `ERROR ${l.text}` : l.text));
  return { ...page, doc, go, click, text, logs };
};

describe('Next.js lesson pages', () => {
  it('turns folders into URLs, wraps pages in layouts, and logs requests', async () => {
    const p = await open({
      files: {
        'app/layout.js': LAYOUT,
        'app/page.js': 'export default function Home() {\n  return <h1>Welcome</h1>;\n}',
        'app/menu/page.js': 'export const metadata = { title: "Menu" };\n\nexport default function Menu() {\n  return <h1>Our menu</h1>;\n}',
        'app/(shop)/cart/page.js': 'export default function Cart() {\n  return <h1>Your cart</h1>;\n}',
      },
    });
    expect(p.text()).toContain('Welcome');
    expect(p.text()).toContain('Rosa’s Café');
    expect(p.doc.title).toBe('Rosa’s Café');
    await p.go('/menu');
    expect(p.text()).toContain('Our menu');
    expect(p.doc.title).toBe('Menu · Rosa’s Café');
    await p.go('/cart');
    expect(p.text()).toContain('Your cart');
    await p.go('/nope');
    expect(p.text()).toContain('This page could not be found.');
    expect(p.logs()).toEqual(['GET / 200', 'GET /menu 200', 'GET /cart 200', 'GET /nope 404']);
    // The browser bar adds no lines of its own.
    expect(p.lines[0]).toBe('Rosa’s Café');
  });

  it('reads params, runs async Server Components with the practice database, and navigates with Link', async () => {
    const p = await open({
      files: {
        'app/page.js': `import Link from "next/link";
import { db } from "@/lib/db";

export default async function Home() {
  const dishes = await db.dish.findMany({ where: { category: "Drinks" } });
  return <ul>{dishes.map((d) => <li key={d.id}><Link id={"d" + d.id} href={"/menu/" + d.id}>{d.name}</Link></li>)}</ul>;
}`,
        'app/menu/[id]/page.js': `import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function Dish({ params }) {
  const { id } = await params;
  const dish = await db.dish.findUnique({ where: { id: Number(id) } });
  if (!dish) notFound();
  return <h1>{dish.name}: ₹{dish.price}</h1>;
}`,
      },
    });
    expect(p.text()).toContain('Lemon Tea');
    expect(p.text()).toContain('Cold Coffee');
    await p.click('#d2');
    expect(p.text()).toContain('Cold Coffee: ₹90');
    expect((p.doc.querySelector('#cy-url') as HTMLInputElement).value).toBe('/menu/2');
    await p.go('/menu/99');
    expect(p.text()).toContain('This page could not be found.');
    expect(p.logs()).toEqual(['GET / 200', 'GET /menu/2 200', 'GET /menu/99 404']);
  });

  it('draws "use client" components with state, and stops hooks and event handlers in Server Components', async () => {
    const counter = '"use client";\nimport { useState } from "react";\n\nexport default function Counter() {\n  const [n, setN] = useState(0);\n  return <button id="add" onClick={() => setN(n + 1)}>Cups: {n}</button>;\n}';
    const p = await open({ files: { 'app/page.js': 'import Counter from "./Counter";\n\nexport default function Home() {\n  return <Counter />;\n}', 'app/Counter.js': counter } });
    await p.click('#add', 100);
    await p.click('#add', 100);
    expect(p.text()).toContain('Cups: 2');

    const bad = await open({ files: { 'app/page.js': counter.replace('"use client";\n', '') } });
    expect(bad.logs()).toEqual(['ERROR useState only works in a Client Component. Add "use client" at the top of the file.']);
    const click = await open({ files: { 'app/page.js': 'export default function Home() {\n  return <button onClick={() => {}}>Hi</button>;\n}' } });
    expect(click.logs()[0]).toMatch(/^ERROR Event handlers like onClick can’t be used in a Server Component/);
  });

  it('answers Route Handlers from the address bar and from fetch', async () => {
    const p = await open({
      files: {
        'app/api/dishes/route.js': `import { db } from "@/lib/db";

export async function GET() {
  const dishes = await db.dish.findMany({ take: 2 });
  return Response.json(dishes.map((d) => d.name));
}

export async function POST(request) {
  const body = await request.json();
  if (!body.name) return Response.json({ error: "Name is needed" }, { status: 400 });
  const dish = await db.dish.create({ data: { name: body.name, price: 50 } });
  return Response.json(dish, { status: 201 });
}`,
        'app/page.js': `"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  async function add(name) {
    const res = await fetch("/api/dishes", { method: "POST", body: JSON.stringify({ name }) });
    const data = await res.json();
    setMsg(res.status + " " + (data.name || data.error));
  }
  return <div><button id="ok" onClick={() => add("Mint Tea")}>Add</button><button id="bad" onClick={() => add("")}>Bad</button><p>{msg}</p></div>;
}`,
      },
    });
    await p.click('#bad', 500);
    expect(p.text()).toContain('400 Name is needed');
    await p.click('#ok', 500);
    expect(p.text()).toContain('201 Mint Tea');
    await p.go('/api/dishes');
    expect(p.doc.querySelector('.cy-json')!.textContent).toBe('[\n  "Lemon Tea",\n  "Cold Coffee"\n]');
    await p.go('/api/dishes/1');
    expect(p.logs()).toEqual(['GET / 200', 'POST /api/dishes 400', 'POST /api/dishes 201', 'GET /api/dishes 200', 'GET /api/dishes/1 404']);
  });

  it('runs Server Actions from forms, and revalidatePath shows the new data', async () => {
    const p = await open({
      files: {
        'app/page.js': `import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export default async function Orders() {
  const orders = await db.order.findMany();
  async function place(formData) {
    "use server";
    await db.order.create({ data: { dish: formData.get("dish") } });
    revalidatePath("/");
  }
  return (
    <form action={place} id="f">
      <input name="dish" id="dish" defaultValue="Lemon Tea" />
      <button id="send">Order</button>
      <p>{orders.length} orders</p>
    </form>
  );
}`,
      },
    });
    expect(p.text()).toContain('0 orders');
    p.doc.querySelector('#f')!.dispatchEvent(new p.window.Event('submit', { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 1200));
    expect(p.text()).toContain('1 orders');
    expect(p.logs()).toEqual(['GET / 200', 'POST / 200', 'GET / 200']);
  });

  it('shows loading.js while a page loads, and error.js when it breaks', async () => {
    const p = await open(
      {
        files: {
          'app/page.js': 'export default async function Home() {\n  const res = await fetch("https://cafe.example.com/api/menu");\n  const menu = await res.json();\n  return <p>{menu.length} dishes</p>;\n}',
          'app/loading.js': 'export default function Loading() {\n  return <p>Loading the menu…</p>;\n}',
          'app/broken/page.js': 'export default function Broken() {\n  throw new Error("The kitchen is closed");\n}',
          'app/broken/error.js': '"use client";\n\nexport default function Oops({ error, reset }) {\n  return <p>Sorry: {error.message}</p>;\n}',
        },
      },
      200,
    );
    expect(p.text()).toContain('Loading the menu…');
    await new Promise((r) => setTimeout(r, 900));
    expect(p.text()).toContain('4 dishes');
    await p.go('/broken');
    expect(p.text()).toContain('Sorry: The kitchen is closed');
    expect(p.logs()).toContain('⨯ Error: The kitchen is closed');
  });

  it('keeps secrets on the server, runs proxy.js and remembers cookies', async () => {
    const p = await open({
      files: {
        '.env': 'SECRET_KEY=abc123\nNEXT_PUBLIC_CAFE=Rosa’s Café',
        'proxy.js': `import { NextResponse } from "next/server";

export function proxy(request) {
  if (!request.cookies.get("session")) return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/admin/:path*"] };`,
        'app/page.js': 'import Show from "./Show";\n\nexport default function Home() {\n  return <div><p>Server: {process.env.SECRET_KEY}</p><Show /></div>;\n}',
        'app/Show.js': '"use client";\n\nexport default function Show() {\n  return <p>Browser: {process.env.SECRET_KEY ?? "hidden"}, {process.env.NEXT_PUBLIC_CAFE}</p>;\n}',
        'app/login/page.js': `import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  async function signIn() {
    "use server";
    (await cookies()).set("session", "s1");
    redirect("/admin");
  }
  return <form action={signIn} id="f"><button>Sign in</button></form>;
}`,
        'app/admin/page.js': 'export default function Admin() {\n  return <h1>Owner area</h1>;\n}',
      },
    });
    expect(p.text()).toContain('Server: abc123');
    expect(p.text()).toContain('Browser: hidden, Rosa’s Café');
    await p.go('/admin');
    expect(p.text()).toContain('Sign in');
    p.doc.querySelector('#f')!.dispatchEvent(new p.window.Event('submit', { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 1200));
    expect(p.text()).toContain('Owner area');
    expect(p.logs()).toEqual(['GET / 200', 'GET /admin 307', 'GET /login 200', 'POST /login 200', 'GET /admin 200']);
  });

  it('shows an intercepted route in a slot on a soft move, and the full page on a hard one', async () => {
    const p = await open({
      files: {
        'app/layout.js': 'export default function Layout({ children, modal }) {\n  return <div>{children}{modal}</div>;\n}',
        'app/page.js': 'import Link from "next/link";\n\nexport default function Home() {\n  return <div><h1>Menu</h1><Link id="tea" href="/dish/1">Lemon Tea</Link></div>;\n}',
        'app/dish/[id]/page.js': 'export default async function Dish({ params }) {\n  const { id } = await params;\n  return <h1>Dish page {id}</h1>;\n}',
        'app/@modal/default.js': 'export default function None() {\n  return null;\n}',
        'app/@modal/(.)dish/[id]/page.js': 'export default async function Pop({ params }) {\n  const { id } = await params;\n  return <p className="pop">Pop-up for dish {id}</p>;\n}',
      },
    });
    await p.click('#tea');
    expect(p.text()).toContain('Menu');
    expect(p.text()).toContain('Pop-up for dish 1');
    await p.go('/dish/1');
    expect(p.text()).toContain('Dish page 1');
    expect(p.text()).not.toContain('Pop-up');
  });

  it('caches "use cache" results until their tag is refreshed', async () => {
    const p = await open({
      files: {
        'lib/visits.js': 'let n = 0;\n\nexport function visit() {\n  n += 1;\n  return n;\n}',
        'app/page.js': `import { cacheTag } from "next/cache";
import { visit } from "@/lib/visits";

async function getSpecial() {
  "use cache";
  cacheTag("special");
  return "Special #" + visit();
}

export default async function Home() {
  return <p>{await getSpecial()}</p>;
}`,
      },
    });
    expect(p.text()).toContain('Special #1');
    await p.click('#cy-reload');
    expect(p.text()).toContain('Special #1');
  });
});
