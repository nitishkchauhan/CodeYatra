// Next.js · Module 12 · Industry Practices: project architecture, component organization, security best practices,
// and a testing overview.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, xray } from './kit';

const TREE = [
  'rosas-cafe/',
  '├─ src/',
  '│  ├─ app/                    ← routes only: pages, layouts, route.js',
  '│  │  ├─ (marketing)/about/page.js',
  '│  │  ├─ (shop)/menu/page.js',
  '│  │  ├─ (shop)/menu/_components/DishCard.js',
  '│  │  └─ api/orders/route.js',
  '│  ├─ components/ui/          ← shared buttons, cards, inputs',
  '│  ├─ features/orders/        ← one feature: its actions, queries, checks',
  '│  │  ├─ actions.js',
  '│  │  ├─ queries.js',
  '│  │  └─ schema.js',
  '│  └─ lib/                    ← db.js, session.js, helpers',
  '├─ tests/                     ← end-to-end tests',
  '└─ next.config.js',
];

const ADD_BUTTON = [
  '"use client";',
  'import { useState } from "react";',
  '',
  'export default function AddButton({ name }) {',
  '  const [added, setAdded] = useState(false);',
  '  function add() {',
  '    setAdded(true);',
  '    console.log("Added " + name + " to the cart");',
  '  }',
  '  return <button id={"add-" + name.length} onClick={add}>{added ? "Added ✓" : "Add"}</button>;',
  '}',
];
const CARD = ['export default function DishCard({ dish, children }) {', '  return (', '    <div className="card">', '      <h3>{dish.name} · ₹{dish.price}</h3>', '      {children}', '    </div>', '  );', '}'];
const ISLAND_PAGE = [
  'import { db } from "@/lib/db";',
  'import DishCard from "@/components/DishCard";',
  'import AddButton from "@/components/AddButton";',
  '',
  'export default async function Menu() {',
  '  const dishes = await db.dish.findMany({ take: 3 });',
  '  return dishes.map((d) => (',
  '    <DishCard key={d.id} dish={d}>',
  '      <AddButton name={d.name} />',
  '    </DishCard>',
  '  ));',
  '}',
];
const ISLAND_APP = { ...CAFE, 'components/AddButton.js': ADD_BUTTON, 'components/DishCard.js': CARD, 'app/menu/page.js': ISLAND_PAGE };

const SAFE_ACTION = [
  '"use server";',
  'import "server-only";',
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  'import { getUser } from "@/lib/session";',
  '',
  'export async function deleteDish(formData) {',
  '  const user = await getUser();',
  '  if (user?.role !== "owner") throw new Error("Not allowed");',
  '  const id = Number(formData.get("id"));',
  '  if (!Number.isInteger(id)) throw new Error("Bad id");',
  '  await db.dish.delete({ where: { id } });',
  '  revalidatePath("/menu");',
  '}',
];
const HEADERS = [
  'const nextConfig = {',
  '  async headers() {',
  '    return [{',
  '      source: "/(.*)",',
  '      headers: [',
  '        { key: "X-Content-Type-Options", value: "nosniff" },',
  '        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },',
  '        { key: "Content-Security-Policy", value: "default-src \'self\'" },',
  '      ],',
  '    }];',
  '  },',
  '};',
];

const UNIT = [
  'import { describe, expect, it } from "vitest";',
  'import { totalWithTax } from "@/features/orders/prices";',
  '',
  'describe("totalWithTax", () => {',
  '  it("adds 5% tax to the total", () => {',
  '    expect(totalWithTax([40, 80])).toBe(126);',
  '  });',
  '  it("is 0 for an empty order", () => {',
  '    expect(totalWithTax([])).toBe(0);',
  '  });',
  '});',
];
const COMPONENT = [
  'import { render, screen, fireEvent } from "@testing-library/react";',
  'import AddButton from "@/components/AddButton";',
  '',
  'it("shows Added after a tap", () => {',
  '  render(<AddButton name="Lemon Tea" />);',
  '  fireEvent.click(screen.getByRole("button", { name: "Add" }));',
  '  expect(screen.getByRole("button")).toHaveTextContent("Added ✓");',
  '});',
];
const E2E = [
  'import { test, expect } from "@playwright/test";',
  '',
  'test("a customer can place an order", async ({ page }) => {',
  '  await page.goto("http://localhost:3000/menu");',
  '  await page.getByRole("link", { name: "Cold Coffee" }).click();',
  '  await page.getByRole("button", { name: "Order" }).click();',
  '  await expect(page.getByText("Order placed")).toBeVisible();',
  '});',
];

export const NX_M12: Lesson[] = [
  lesson('nx-arch-1', 'Project architecture', 8, [
    chat(['A small site fits in a few files. A real product has hundreds, and many people working on it.', 'A clear folder plan means anyone can find things, and changes in one place don’t break another.']),
    explore('A team-sized Next.js project', TREE, [
      [2, 'src/ keeps your code apart from config files.'],
      [3, 'app/ holds routes. Keep its files thin: they call code from elsewhere.'],
      [4, 'Route groups split the site into areas without changing URLs.'],
      [6, 'A private _components folder: parts used only by this route, kept close to it.'],
      [8, 'Shared parts used everywhere.'],
      [9, 'Everything for one feature in one place.'],
      [13, 'Shared helpers: the database client, sessions.'],
    ]),
    reveal('Rules of thumb', [
      ['Colocate', 'Keep a file next to the only place that uses it.'],
      ['Share on the second use', 'Move it to components/ or lib/ when a second place needs it.'],
      ['Thin routes', 'page.js reads data and arranges parts; logic lives in features/.'],
      ['One way', 'Pick a plan with the team and follow it everywhere.'],
    ]),
    matchUp('Where does it go?', [['A button used on every page', 'components/ui/'], ['The database client', 'lib/'], ['Order actions and checks', 'features/orders/'], ['A card only the menu uses', 'app/(shop)/menu/_components/']], 'Shared, feature or colocated.'),
    check('Why keep page.js files thin?', ['So logic can be found, reused and tested in one place', 'Next.js limits page size', 'Thin pages load slower', 'To avoid using layouts'], 'Pages arrange; features do the work.', 'Where would a teammate look for the order rules?'),
    tapbug('The order total is worked out in three different pages, slightly differently', ['// app/cart/page.js', 'const total = items.reduce((s, i) => s + i.price, 0) * 1.05;'], [[2, 'items.reduce((s, i) => s + i.price, 0) * 1.05', 'totalWithTax(items.map((i) => i.price))']], 'Put the rule in one function (features/orders/prices.js) and use it everywhere.'),
    recap([
      ['🗂', 'src/app for routes; components, features and lib for the rest'],
      ['📍', 'Colocate first; share on the second use'],
      ['🤝', 'One plan the whole team follows'],
    ]),
  ]),

  lesson('nx-a-12-2', 'Component organization', 8, [
    chat(['The best Next.js pages are mostly Server Components, with small Client Components only where people tap or type.', 'Push "use client" down to the leaves: a page full of data with one interactive button keeps that button as the only client part.']),
    tapPage('Small client islands', 'Add Cold Coffee to the cart.', app(ISLAND_APP, '/menu'), 'Added Cold Coffee to the cart', [{ click: '#add-11' }], 'The cards and the list are server-only. Only the small Add button ships JavaScript.'),
    explore('Server outside, client inside', ISLAND_PAGE, [
      [1, 'The page reads the database: a Server Component.'],
      [8, 'DishCard is a Server Component too, taking children.'],
      [9, 'Only AddButton is a Client Component.', 'button'],
    ], { page: app(ISLAND_APP, '/menu'), minTaps: 2 }),
    toggle('Where to put "use client"', [
      ['At the top of the page', ['"use client";', 'export default function Menu() {', '  // can’t use the database here', '  // the whole page ships as JavaScript', '}'], 'Everything becomes client code, and the page can’t read data on the server.'],
      ['On the leaf', ['// page.js: a Server Component', '<DishCard dish={d}>', '  <AddButton name={d.name} />', '</DishCard>'], 'Only the button is client code.'],
    ]),
    reveal('Organizing components', [
      ['Small and single-purpose', 'One job each: DishCard, AddButton, PriceTag.'],
      ['Props for data, children for layout', 'Cards and frames take children.'],
      ['Shared UI', 'Buttons and inputs in components/ui with one look.'],
      ['Name by what it is', 'DishCard, not Component3.'],
    ]),
    check('A page lists 50 dishes, each with a “Favourite” star. What should be a Client Component?', ['Only the star', 'The whole page', 'Every card', 'Nothing'], 'Keep client code small.', 'Which part needs a tap?'),
    recap([
      ['🏝', 'Small client islands in a server page'],
      ['⬇', 'Push "use client" down to the leaves'],
      ['🧩', 'Small components; children for layout'],
    ]),
  ]),

  lesson('nx-a-12-3', 'Security best practices', 9, [
    reveal('The essentials', [
      ['Secrets server-only', 'No NEXT_PUBLIC_ on secrets; import "server-only" in files that use them.'],
      ['Every action is public', 'Check the user, the role and the input inside each Server Action and Route Handler.'],
      ['Validate input', 'Type, length, range, allowed values. Never trust the browser.'],
      ['No raw HTML from users', 'Avoid dangerouslySetInnerHTML with user content.'],
      ['Security headers', 'Content-Security-Policy and friends, in next.config.js.'],
      ['Stay updated', 'Update Next.js and packages; security fixes come often.'],
    ]),
    explore('A safe Server Action', SAFE_ACTION, [
      [2, 'This file can never be imported into browser code.'],
      [8, 'Who is calling?'],
      [9, 'Only the owner.'],
      [10, 'The input is text: turn it into a number…'],
      [11, '…and check it.'],
    ]),
    tapbug('Anyone can delete any dish by calling the action', ['export async function deleteDish(formData) {', '  "use server";', '  await db.dish.delete({ where: { id: Number(formData.get("id")) } });'], [[3, '  await db.dish.delete', '  if ((await getUser())?.role !== "owner") throw new Error("Not allowed"); await db.dish.delete']], 'Check the user inside every action, even if the button is hidden.'),
    tapbug('A review can run scripts in other visitors’ browsers', ['<p dangerouslySetInnerHTML={{ __html: review.text }} />'], [[1, '<p dangerouslySetInnerHTML={{ __html: review.text }} />', '<p>{review.text}</p>']], 'React escapes text in { }. Raw HTML from users is a cross-site scripting (XSS) risk.'),
    explore('Security headers', HEADERS, [
      [4, 'For every page.'],
      [6, 'Don’t guess file types.'],
      [8, 'Only load scripts, styles and pictures from this site.'],
    ]),
    check('A button is hidden from customers. Is the Server Action behind it safe?', ['No, it must check the user itself', 'Yes, hidden buttons can’t be used', 'Yes, actions are private', 'Only if it is in a separate file'], 'Actions are public endpoints.', 'Can someone call it without the button?'),
    recap([
      ['🔒', 'Secrets server-only; "server-only" imports'],
      ['🛡', 'Check user, role and input in every action and API'],
      ['🧱', 'Escape output, add security headers, stay updated'],
    ]),
  ]),

  lesson('nx-a-12-4', 'Testing overview', 8, [
    reveal('Three kinds of test', [
      ['Unit', 'One function, quickly: does totalWithTax add 5%? With Vitest or Jest.'],
      ['Component', 'One Client Component: does the button say “Added ✓” after a tap? With React Testing Library.'],
      ['End-to-end', 'A real browser clicks through the real site: can a customer order? With Playwright or Cypress.'],
      ['Server Components', 'Async Server Components are best tested end-to-end.'],
    ]),
    explore('A unit test (Vitest)', UNIT, [
      [2, 'Import the function to test.'],
      [5, 'it describes one behaviour.'],
      [6, 'expect(…).toBe(…) checks the answer.'],
      [9, 'Test the edge case too.'],
    ]),
    explore('A component test', COMPONENT, [
      [5, 'Draw the component.'],
      [6, 'Tap the button, the way a person finds it: by its role and name.'],
      [7, 'Check what changed.'],
    ]),
    explore('An end-to-end test (Playwright)', E2E, [
      [4, 'Open the running site.'],
      [5, 'Click like a customer.'],
      [7, 'Check what they see.'],
    ]),
    matchUp('Which test?', [['A price function', 'Unit'], ['A button’s text after a tap', 'Component'], ['Sign in, order, see the receipt', 'End-to-end']], 'Many small tests, fewer big ones.'),
    check('How are async Server Components usually tested?', ['With end-to-end tests in a real browser', 'With unit tests only', 'They can’t be tested', 'By reading the code'], 'Test tools for components don’t run them yet.', 'Which test runs the real server?'),
    recap([
      ['🧪', 'Unit tests for logic'],
      ['🧩', 'Component tests for Client Components'],
      ['🌐', 'End-to-end tests for whole flows'],
    ]),
  ]),

  challenge('nx-a-12-ch', 'Module 12 Challenge', { icon: '🏢', name: 'Team Ready' }, ['Organise a project a team can grow', 'Keep client code small and the app secure', 'Choose the right kind of test'], [
    mcq(1, 'What belongs in app/?', ['Routes: pages, layouts and route.js files', 'Every helper function', 'Tests', 'Database files'], 'Keep it for routes.'),
    mcq(2, 'Where should "use client" usually go?', ['On the small interactive parts', 'At the top of every page', 'In the root layout', 'In next.config.js'], 'Push it to the leaves.'),
    mcq(3, 'What does import "server-only" do?', ['Stops the file being used in browser code', 'Makes the file faster', 'Hides it from Git', 'Turns it into an API'], 'The build fails if a Client Component imports it.', { mono: false }),
    mcq(4, 'Which test checks a whole sign-in and order flow?', ['End-to-end', 'Unit', 'Component', 'Snapshot'], 'A real browser.'),
    mcq(5, 'Why avoid dangerouslySetInnerHTML with user text?', ['It can run their scripts in other people’s browsers', 'It is slow', 'It breaks CSS', 'React doesn’t allow it'], 'XSS.'),
    swipe([
      ['Colocate files used by one route', true, 'Keep them close.'],
      ['Hidden buttons protect Server Actions', false, 'Check inside the action.'],
      ['React escapes text inside { }', true, 'So user text is safe there.'],
      ['Every component needs a unit test', false, 'Test what matters, at the right level.'],
    ]),
    pairs([['components/ui', 'Shared parts'], ['features/orders', 'One feature'], ['Vitest', 'Unit tests'], ['Playwright', 'End-to-end tests']], 'Team practices.'),
    pickCode('Which keeps only the star as client code?', ['<DishCard dish={d}><Star id={d.id} /></DishCard> with "use client" only in Star.js', '"use client" at the top of page.js', '"use client" in the root layout', 'Make every file "use client"'], 'A small island.'),
    bugTask(['NEXT_PUBLIC_PAYMENT_KEY=sk_live_123', '<div dangerouslySetInnerHTML={{ __html: comment }} />'], [[1, 'NEXT_PUBLIC_PAYMENT_KEY', 'PAYMENT_KEY'], [2, '<div dangerouslySetInnerHTML={{ __html: comment }} />', '<div>{comment}</div>']], 'Keep keys server-only, and show user text with { }.'),
    xray('<div><div class="card"><h3>Lemon Tea · ₹40</h3><button>Add</button></div><pre class="test">✓ adds 5% tax to the total</pre></div>', [
      ['h3', 'The dish name and price', 'Server Component', ['Server Component', 'Client Component', 'Unit test']],
      ['button', 'The Add button', 'Client Component', ['Server Component', 'Client Component', 'Unit test']],
      ['.test', 'A passing check of a function', 'Unit test', ['Server Component', 'Client Component', 'Unit test']],
    ]),
    arrange(['const TAX = 0.05;', 'export function totalWithTax(prices) {', '  const total = prices.reduce((sum, p) => sum + p, 0);', '  return Math.round(total * (1 + TAX));', '}', 'export default function Total() { return <p>Total: ₹{totalWithTax([40, 80])}</p>; }'], 'the tax rate, then the helper: start it, add up, add tax, close it; then the page that uses it', CAFE, 'app/total/page.js', '/total'),
  ]),
];
