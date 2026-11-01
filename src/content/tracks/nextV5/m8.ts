// Next.js · Module 8 · Database Integration: connecting and environment variables, ORM basics, CRUD, and data
// validation. The practice database (@/lib/db) answers Prisma-style queries offline; the lessons show the real
// Prisma set-up next to it.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const ENV = ['DATABASE_URL=postgresql://cafe:practice@db.rosascafe.example:5432/cafe', 'NEXT_PUBLIC_SITE_NAME=Rosa’s Café'];
const SETTINGS = [
  'import Shown from "./Shown";',
  '',
  'export default function Settings() {',
  '  const url = new URL(process.env.DATABASE_URL);',
  '  console.log("Database host: " + url.hostname);',
  '  return (',
  '    <>',
  '      <h1>{process.env.NEXT_PUBLIC_SITE_NAME} settings</h1>',
  '      <p className="card">Server sees the database at {url.hostname}</p>',
  '      <Shown />',
  '    </>',
  '  );',
  '}',
];
const SHOWN = ['"use client";', '', 'export default function Shown() {', '  return (', '    <p className="card">', '      Browser sees: {process.env.DATABASE_URL ?? "nothing"} and {process.env.NEXT_PUBLIC_SITE_NAME}', '    </p>', '  );', '}'];
const ENV_APP = { ...CAFE, '.env.local': ENV, 'app/settings/page.js': SETTINGS, 'app/settings/Shown.js': SHOWN };

const PRISMA_DB = [
  'import { PrismaClient } from "@prisma/client";',
  '',
  '// One client for the whole app. In development, keep it between reloads.',
  'const globalForPrisma = globalThis;',
  'export const db = globalForPrisma.prisma ?? new PrismaClient();',
  'if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;',
];

const SCHEMA = [
  'model Dish {',
  '  id       Int     @id @default(autoincrement())',
  '  name     String',
  '  price    Int',
  '  veg      Boolean @default(true)',
  '  category String',
  '}',
];

const QUERY_PAGE = [
  'import Link from "next/link";',
  'import { db } from "@/lib/db";',
  '',
  'export default async function Menu({ searchParams }) {',
  '  const { sort } = await searchParams;',
  '  const dishes = await db.dish.findMany({',
  '    where: { veg: true },',
  '    orderBy: sort === "price" ? { price: "asc" } : { name: "asc" },',
  '    take: 3,',
  '  });',
  '  return (',
  '    <>',
  '      <Link id="by-name" href="/menu">By name</Link> · <Link id="by-price" href="/menu?sort=price">By price</Link>',
  '      <ol>{dishes.map((d) => <li key={d.id}>{d.name} · ₹{d.price}</li>)}</ol>',
  '    </>',
  '  );',
  '}',
];

const STUDENTS = [
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  '',
  'async function addStudent(formData) {',
  '  "use server";',
  '  await db.student.create({',
  '    data: { name: formData.get("name"), course: "Class 10 Maths", fee: 1200 },',
  '  });',
  '  revalidatePath("/students");',
  '}',
  '',
  'async function removeStudent(formData) {',
  '  "use server";',
  '  const id = Number(formData.get("id"));',
  '  await db.student.delete({ where: { id } });',
  '  console.log("Deleted student " + id);',
  '  revalidatePath("/students");',
  '}',
  '',
  'export default async function Students() {',
  '  const students = await db.student.findMany({ orderBy: { name: "asc" } });',
  '  return (',
  '    <>',
  '      <form id="add" action={addStudent}>',
  '        <input id="name" name="name" placeholder="Name" />',
  '        <button>Add</button>',
  '      </form>',
  '      {students.map((s) => (',
  '        <form key={s.id} id={"remove-" + s.id} action={removeStudent} className="card">',
  '          <input type="hidden" name="id" value={s.id} />',
  '          {s.name} · {s.course} <button>Remove</button>',
  '        </form>',
  '      ))}',
  '    </>',
  '  );',
  '}',
];

const VALIDATE = [
  '"use server";',
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  '',
  'const COURSES = ["Class 10 Maths", "Class 12 Physics", "Class 9 Science"];',
  '',
  'function check(data) {',
  '  const errors = [];',
  '  if (data.name.length < 2) errors.push("Name: at least 2 letters");',
  '  if (!COURSES.includes(data.course)) errors.push("Course: pick one from the list");',
  '  if (!Number.isInteger(data.fee) || data.fee <= 0) errors.push("Fee: a whole number above 0");',
  '  return errors;',
  '}',
  '',
  'export async function saveStudent(previous, formData) {',
  '  const data = {',
  '    name: String(formData.get("name") ?? "").trim(),',
  '    course: String(formData.get("course") ?? ""),',
  '    fee: Number(formData.get("fee")),',
  '  };',
  '  const errors = check(data);',
  '  if (errors.length) return { errors };',
  '  await db.student.create({ data });',
  '  console.log("Saved " + data.name);',
  '  revalidatePath("/students");',
  '  return { errors: [], saved: data.name };',
  '}',
];
const VALIDATE_FORM = [
  '"use client";',
  'import { useActionState } from "react";',
  'import { saveStudent } from "./actions";',
  '',
  'export default function NewStudent() {',
  '  const [state, formAction] = useActionState(saveStudent, { errors: [] });',
  '  return (',
  '    <form id="student" action={formAction}>',
  '      <input id="name" name="name" placeholder="Name" />',
  '      <select id="course" name="course" defaultValue="Class 10 Maths">',
  '        <option>Class 10 Maths</option>',
  '        <option>Class 12 Physics</option>',
  '      </select>',
  '      <input id="fee" name="fee" placeholder="Fee" />',
  '      <button>Save</button>',
  '      <ul className="err">{state.errors.map((e) => <li key={e}>{e}</li>)}</ul>',
  '      {state.saved && <p className="ok">Saved {state.saved}</p>}',
  '    </form>',
  '  );',
  '}',
];
const VALIDATE_APP = { ...CAFE, 'app/students/actions.js': VALIDATE, 'app/students/NewStudent.js': VALIDATE_FORM, 'app/students/page.js': ['import NewStudent from "./NewStudent";', '', 'export default function Page() {', '  return (', '    <>', '      <h1>New student</h1>', '      <NewStudent />', '    </>', '  );', '}'] };

export const NX_M8: Lesson[] = [
  lesson('nx-db-1', 'Connecting to a database', 8, [
    chat(['Real apps keep their data in a database, like PostgreSQL or MySQL, on a server of its own.', 'Your Next.js server connects to it with an address and a password, kept in an environment variable, never in your code.']),
    tapPage('Secrets stay on the server', 'Open /settings. The database address is in .env.local.', app(ENV_APP), 'Database host: db.rosascafe.example', go('/settings'), 'The Server Component read DATABASE_URL. The Client Component got nothing, because only NEXT_PUBLIC_ variables reach the browser.'),
    explore('Environment variables', ENV, [
      [1, 'Server-only: the database address and password.'],
      [2, 'NEXT_PUBLIC_ variables are copied into the browser code. Never put secrets there.'],
    ]),
    reveal('Env files', [
      ['.env.local', 'Your own secrets for your computer. Never committed to Git.'],
      ['.env', 'Safe defaults that can be shared.'],
      ['On the host', 'Set the real values in the host’s settings (module 10).'],
      ['process.env.NAME', 'How server code reads them.'],
    ], { mono: true }),
    explore('lib/db.js with Prisma', PRISMA_DB, [
      [1, 'Prisma is a popular ORM (next lesson). It reads DATABASE_URL itself.'],
      [5, 'One client for the whole app: each new one opens more connections.'],
      [6, 'In development, reuse it when files reload.'],
    ], { intro: 'In a real project. These lessons use a practice database with the same kind of queries.' }),
    tapbug('The database password shows up in the browser’s code', ['NEXT_PUBLIC_DATABASE_URL=postgresql://cafe:secret@db.example:5432/cafe'], [[1, 'NEXT_PUBLIC_DATABASE_URL', 'DATABASE_URL']], 'NEXT_PUBLIC_ sends the value to every visitor. Secrets must not have it.'),
    check('Which can a Client Component read?', ['process.env.NEXT_PUBLIC_SITE_NAME', 'process.env.DATABASE_URL', 'process.env.SECRET_KEY', 'Any variable in .env.local'], 'Only NEXT_PUBLIC_ ones.', 'Which ones are copied into the browser?', { mono: true }),
    recap([
      ['🗄', 'The database address and password live in env variables'],
      ['🔒', 'Only NEXT_PUBLIC_ variables reach the browser'],
      ['1️⃣', 'One database client for the whole app'],
    ]),
  ], 'intermediate'),

  lesson('nx-i-8-2', 'ORM basics', 8, [
    chat(['An ORM (object-relational mapper) lets you describe tables as models and query them with code instead of writing SQL by hand.', 'Prisma and Drizzle are the most used with Next.js. You get autocomplete and fewer mistakes, and you can still write SQL when you need it.']),
    explore('A model, in schema.prisma', SCHEMA, [
      [1, 'A model is a table.'],
      [2, 'An id that counts up by itself.'],
      [5, 'A default value.'],
    ]),
    toggle('SQL or ORM?', [
      ['SQL', ['SELECT * FROM "Dish"', 'WHERE veg = true', 'ORDER BY price ASC', 'LIMIT 3;'], 'The database’s own language.'],
      ['ORM', ['await db.dish.findMany({', '  where: { veg: true },', '  orderBy: { price: "asc" },', '  take: 3,', '});'], 'The same query as JavaScript.'],
    ]),
    tapPage('Queries from code', 'Sort the veg dishes by price.', app({ ...CAFE, 'app/menu/page.js': QUERY_PAGE }, '/menu'), 'GET /menu?sort=price 200', [{ click: '#by-price' }], 'The same query, with a different orderBy.'),
    explore('Reading the query', QUERY_PAGE, [
      [6, 'findMany: many rows.'],
      [7, 'where: only veg dishes.'],
      [8, 'orderBy: by price or name.'],
      [9, 'take: at most 3.'],
    ], { page: app({ ...CAFE, 'app/menu/page.js': QUERY_PAGE }, '/menu?sort=price'), minTaps: 2 }),
    matchUp('Which query?', [['findMany', 'Many rows'], ['findUnique', 'One row by id or a unique field'], ['count', 'How many'], ['create', 'Add a row']], 'Prisma-style queries.'),
    recap([
      ['🧱', 'Models describe tables'],
      ['🔤', 'Queries as code: where, orderBy, take'],
      ['🛠', 'Prisma and Drizzle are common choices'],
    ]),
  ]),

  lesson('nx-i-8-3', 'CRUD: create, read, update, delete', 8, [
    reveal('CRUD in Next.js', [
      ['Read', 'In a Server Component: await db.student.findMany().'],
      ['Create', 'In a Server Action: db.student.create({ data }).'],
      ['Update', 'db.student.update({ where: { id }, data }).'],
      ['Delete', 'db.student.delete({ where: { id } }).'],
      ['Then', 'revalidatePath so the page shows the change.'],
    ], { mono: true }),
    tapPage('Sutton Classes students', 'Add a student called Noah Kim, then remove Leo Martin.', app({ ...CAFE, 'app/students/page.js': STUDENTS }, '/students'), 'Deleted student 2', [{ type: ['#name', 'Noah Kim'] }, { submit: '#add' }, { submit: '#remove-2' }], 'Each button is a small form with its own Server Action.'),
    explore('A page that reads and changes data', STUDENTS, [
      [4, 'Create: a Server Action.'],
      [12, 'Delete: another one.'],
      [14, 'The id comes from a hidden input, as text.'],
      [21, 'Read: in the page itself.'],
      [30, 'Each row’s form sends its own id.'],
    ]),
    tapbug('Removing a student does nothing', ['const id = formData.get("id");', 'await db.student.delete({ where: { id } });'], [[1, 'formData.get("id")', 'Number(formData.get("id"))']], 'Form values are text. The id column is a number.'),
    check('Where should the page read the students?', ['In the Server Component, with await db.student.findMany()', 'In a useEffect', 'In the Server Action', 'In next.config.js'], 'Read on the server, while drawing.', 'Which part draws the list?'),
    recap([
      ['📖', 'Read in Server Components'],
      ['✏', 'Create, update and delete in Server Actions'],
      ['🔄', 'revalidatePath after every change'],
    ]),
  ]),

  lesson('nx-i-8-4', 'Data validation', 8, [
    chat(['A database only checks what it must: a number column refuses text. It won’t stop a one-letter name or a course that doesn’t exist.', 'So check every value before it is saved, on the server, and send back clear messages.']),
    tapPage('Check before saving', 'Save with fee “abc” first. Then type the name Leo Martin and fee 1500, and save again.', app(VALIDATE_APP, '/students'), 'Saved Leo Martin', [{ type: ['#fee', 'abc'] }, { submit: '#student' }, { type: ['#name', 'Leo Martin'] }, { type: ['#fee', '1500'] }, { submit: '#student' }], 'The first try listed every problem at once. The second passed every check.'),
    explore('Checking data', VALIDATE, [
      [7, 'One place for every rule.'],
      [9, 'Text: long enough.'],
      [10, 'Only values from the list.'],
      [11, 'Numbers: whole and positive.'],
      [16, 'Turn the form data into the right types first.'],
      [22, 'Any errors? Send them all back; save nothing.'],
    ]),
    reveal('Validating with a library', [
      ['Zod', 'Describe the rules once: z.object({ name: z.string().min(2), fee: z.number().int().positive() }).'],
      ['safeParse', 'Gives either the clean data or a list of problems.'],
      ['Share it', 'Use the same rules in the form and in the action.'],
    ]),
    tapbug('A fee of -500 gets saved', ['if (Number.isNaN(data.fee)) errors.push("Fee: a number");'], [[1, 'Number.isNaN(data.fee)', '!Number.isInteger(data.fee) || data.fee <= 0']], 'Check the range too, not only the type.'),
    check('Where must data be checked before it is saved?', ['On the server, in the Server Action or Route Handler', 'Only in the browser', 'Only in the database', 'Nowhere, the ORM does it'], 'The server is the last stop.', 'Which check can’t be skipped?'),
    recap([
      ['🧪', 'Check type, length, range and allowed values'],
      ['📋', 'Send back every problem, save nothing'],
      ['📐', 'Libraries like Zod keep the rules in one place'],
    ]),
  ]),

  challenge('nx-i-8-ch', 'Module 8 Challenge', { icon: '🗄', name: 'Data Keeper' }, ['Connect safely with environment variables', 'Query and change data with an ORM', 'Check data before saving it'], [
    mcq(1, 'Where should the database password go?', ['In an environment variable, like DATABASE_URL', 'In page.js', 'In a NEXT_PUBLIC_ variable', 'In public/'], 'Never in code.'),
    mcq(2, 'What is an ORM?', ['A tool to define tables as models and query them with code', 'A kind of database', 'A CSS library', 'A test tool'], 'Prisma and Drizzle are ORMs.'),
    mcq(3, 'Which query gets one row by id?', ['findUnique', 'findMany', 'count', 'create'], 'One unique row.', { mono: true }),
    mcq(4, 'Where do you create, update and delete?', ['In Server Actions or Route Handlers', 'In Client Components', 'In CSS', 'In public/'], 'On the server.'),
    mcq(5, 'Form values arrive as…', ['Text', 'Numbers', 'Booleans', 'Objects'], 'Turn them into the right type.'),
    swipe([
      ['NEXT_PUBLIC_ variables are visible to visitors', true, 'They go into the browser code.'],
      ['The database checks that names are long enough', false, 'You must.'],
      ['Read data in Server Components', true, 'While drawing.'],
      ['Each request should open a new database client', false, 'Share one.'],
    ]),
    pairs([['create', 'Add'], ['findMany', 'Read'], ['update', 'Change'], ['delete', 'Remove']], 'CRUD with an ORM.'),
    pickCode('Which reads veg dishes, cheapest first?', ['db.dish.findMany({ where: { veg: true }, orderBy: { price: "asc" } })', 'db.dish.findMany({ veg: true, sort: "price" })', 'db.dish.create({ where: { veg: true } })', 'SELECT dish WHERE veg'], 'where, then orderBy.'),
    bugTask(['NEXT_PUBLIC_DATABASE_URL=postgresql://cafe:secret@db/cafe', 'await db.student.delete({ where: { id: formData.get("id") } });'], [[1, 'NEXT_PUBLIC_DATABASE_URL', 'DATABASE_URL'], [2, 'id: formData.get("id")', 'id: Number(formData.get("id"))']], 'Keep the secret server-only, and turn the id into a number.'),
    xray('<div><p class="card">Server sees the database at db.rosascafe.example</p><ul class="err"><li>Fee: a whole number above 0</li></ul><form class="card"><button>Remove</button></form></div>', [
      ['p.card', 'The database host', 'process.env.DATABASE_URL', ['process.env.DATABASE_URL', 'check(data)', 'db.student.delete']],
      ['.err', 'A list of problems', 'check(data)', ['process.env.DATABASE_URL', 'check(data)', 'db.student.delete']],
      ['form', 'The Remove button', 'db.student.delete', ['process.env.DATABASE_URL', 'check(data)', 'db.student.delete']],
    ]),
    arrange(['import { db } from "@/lib/db";', 'export default async function Count() {', '  const total = await db.student.count();', '  return <p>{total} students</p>;', '}'], 'import, start the page, count the rows, show it, close it', CAFE, 'app/count/page.js', '/count'),
  ]),
];
