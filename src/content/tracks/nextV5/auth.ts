// The sign-in files shared by the Authentication module and the final project: sessions in a cookie, users in the
// practice database. Practice users: rosa@rosascafe.example (owner, password owner-pass) and sam@example.com
// (customer, password sam-pass). lib/password.js is a stand-in: real apps compare bcrypt or argon2 hashes.
import { CAFE } from './apps';
import type { Files } from './kit';

export const SESSION = [
  'import "server-only";',
  'import { cookies } from "next/headers";',
  'import { db } from "@/lib/db";',
  '',
  'export async function startSession(user) {',
  '  const token = crypto.randomUUID();',
  '  await db.session.create({ data: { token, userId: user.id } });',
  '  const store = await cookies();',
  '  store.set("session", token, {',
  '    httpOnly: true,',
  '    secure: true,',
  '    sameSite: "lax",',
  '    maxAge: 60 * 60 * 24 * 7,',
  '    path: "/",',
  '  });',
  '}',
  '',
  'export async function getUser() {',
  '  const store = await cookies();',
  '  const token = store.get("session")?.value;',
  '  if (!token) return null;',
  '  const session = await db.session.findFirst({ where: { token } });',
  '  if (!session) return null;',
  '  return db.user.findUnique({ where: { id: session.userId } });',
  '}',
  '',
  'export async function endSession() {',
  '  const store = await cookies();',
  '  const token = store.get("session")?.value;',
  '  if (token) await db.session.deleteMany({ where: { token } });',
  '  store.delete("session");',
  '}',
];

export const PASSWORD = [
  '// Practice only. A real app stores bcrypt or argon2 hashes and checks them with that library.',
  'export async function checkPassword(password, hash) {',
  '  return hash === "hash:" + password;',
  '}',
];

export const LOGIN_ACTIONS = [
  '"use server";',
  'import { redirect } from "next/navigation";',
  'import { db } from "@/lib/db";',
  'import { checkPassword } from "@/lib/password";',
  'import { endSession, startSession } from "@/lib/session";',
  '',
  'export async function signIn(previous, formData) {',
  '  const email = String(formData.get("email") ?? "").trim().toLowerCase();',
  '  const password = String(formData.get("password") ?? "");',
  '  const user = await db.user.findUnique({ where: { email } });',
  '  if (!user || !(await checkPassword(password, user.passwordHash))) {',
  '    return "Wrong email or password.";',
  '  }',
  '  await startSession(user);',
  '  console.log("Session started for " + user.name);',
  '  redirect("/account");',
  '}',
  '',
  'export async function signOut() {',
  '  await endSession();',
  '  console.log("Session ended");',
  '  redirect("/login");',
  '}',
];

export const LOGIN_FORM = [
  '"use client";',
  'import { useActionState } from "react";',
  'import { signIn } from "./actions";',
  '',
  'export default function LoginForm() {',
  '  const [message, formAction] = useActionState(signIn, "");',
  '  return (',
  '    <form id="login" action={formAction}>',
  '      <label htmlFor="email">Email</label>',
  '      <input id="email" name="email" type="email" />',
  '      <label htmlFor="password">Password</label>',
  '      <input id="password" name="password" type="password" />',
  '      <button>Sign in</button>',
  '      {message && <p className="err">{message}</p>}',
  '    </form>',
  '  );',
  '}',
];

export const LOGIN_PAGE = ['import LoginForm from "./LoginForm";', '', 'export default function Login() {', '  return (', '    <>', '      <h1>Sign in</h1>', '      <LoginForm />', '    </>', '  );', '}'];

export const ACCOUNT = [
  'import { redirect } from "next/navigation";',
  'import { getUser } from "@/lib/session";',
  'import { signOut } from "../login/actions";',
  '',
  'export default async function Account() {',
  '  const user = await getUser();',
  '  if (!user) redirect("/login");',
  '  return (',
  '    <form id="out" action={signOut}>',
  '      <h1>Hello {user.name}</h1>',
  '      <p className="muted">Signed in as {user.email}</p>',
  '      <button>Sign out</button>',
  '    </form>',
  '  );',
  '}',
];

export const ADMIN = [
  'import { redirect } from "next/navigation";',
  'import { getUser } from "@/lib/session";',
  '',
  'export default async function Admin() {',
  '  const user = await getUser();',
  '  if (!user) redirect("/login");',
  '  if (user.role !== "owner") {',
  '    console.log("Blocked " + user.name + ": not an owner");',
  '    return <p className="err">Only the owner can see this page.</p>;',
  '  }',
  '  return <h1>Owner area: today’s orders</h1>;',
  '}',
];

export const PROXY = [
  'import { NextResponse } from "next/server";',
  '',
  'export function proxy(request) {',
  '  if (!request.cookies.has("session")) {',
  '    return NextResponse.redirect(new URL("/login", request.url));',
  '  }',
  '}',
  '',
  'export const config = { matcher: ["/account/:path*", "/admin/:path*"] };',
];

/** The café with sign-in: /login, /account and the owner-only /admin. */
export const AUTH_APP: Files = {
  ...CAFE,
  'lib/session.js': SESSION,
  'lib/password.js': PASSWORD,
  'app/login/actions.js': LOGIN_ACTIONS,
  'app/login/LoginForm.js': LOGIN_FORM,
  'app/login/page.js': LOGIN_PAGE,
  'app/account/page.js': ACCOUNT,
  'app/admin/page.js': ADMIN,
};
