// Next.js · Module 7 · Authentication and Authorization: the ideas, sessions, protected routes, and role-based access.
// Lesson 7.1 keeps the old module id (nx-auth-1). The practice sign-in files are in auth.ts.
import type { Lesson, TapAction } from '../../types';
import { ACCOUNT, ADMIN, AUTH_APP, LOGIN_ACTIONS, PROXY, SESSION } from './auth';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const signIn = (email: string, password: string): TapAction[] => [...go('/login'), { type: ['#email', email] }, { type: ['#password', password] }, { submit: '#login' }];

const PRICE_ACTION = [
  '"use server";',
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  'import { getUser } from "@/lib/session";',
  '',
  'export async function changePrice(formData) {',
  '  const user = await getUser();',
  '  if (user?.role !== "owner") {',
  '    console.log("Refused: only the owner can change prices");',
  '    return;',
  '  }',
  '  const price = Number(formData.get("price"));',
  '  if (!(price > 0)) return;',
  '  await db.dish.update({ where: { id: 1 }, data: { price } });',
  '  console.log("Lemon Tea now costs " + price);',
  '  revalidatePath("/menu");',
  '}',
];
const PRICE_PAGE = ['import { changePrice } from "./actions";', '', 'export default function Prices() {', '  return (', '    <form id="price" action={changePrice}>', '      <label htmlFor="p">New price for Lemon Tea</label>', '      <input id="p" name="price" defaultValue="45" />', '      <button>Save</button>', '    </form>', '  );', '}'];
const ROLE_API = [
  'import { getUser } from "@/lib/session";',
  '',
  'export async function GET() {',
  '  const user = await getUser();',
  '  if (!user) return Response.json({ error: "Sign in first" }, { status: 401 });',
  '  if (user.role !== "owner") return Response.json({ error: "Owners only" }, { status: 403 });',
  '  return Response.json({ takings: 4200 });',
  '}',
];
const RBAC_APP = { ...AUTH_APP, 'app/prices/actions.js': PRICE_ACTION, 'app/prices/page.js': PRICE_PAGE, 'app/api/takings/route.js': ROLE_API };

export const NX_M7: Lesson[] = [
  lesson('nx-auth-1', 'Authentication and authorization', 7, [
    chat(['Two questions every app with accounts must answer.', 'Authentication: who are you? (signing in). Authorization: what may you do? (an owner can change prices; a customer can’t).']),
    reveal('The pieces of signing in', [
      ['Credentials', 'An email and password, a one-time code, or “Sign in with Google”.'],
      ['Password hashes', 'Never store passwords. Store a hash (bcrypt or argon2) and compare.'],
      ['A session', 'After signing in, the server remembers you, usually with a cookie.'],
      ['Libraries', 'Teams often use Auth.js, Better Auth, Clerk or Supabase Auth instead of writing it all.'],
    ]),
    tapPage('Sign in', 'Sign in as sam@example.com with the practice password sam-pass.', app(AUTH_APP), 'Session started for Sam', signIn('sam@example.com', 'sam-pass'), 'The server checked the password, started a session and sent you to /account.'),
    explore('The sign-in action', LOGIN_ACTIONS, [
      [10, 'Find the user by email.'],
      [11, 'Compare the password with the stored hash.'],
      [12, 'The same message for a wrong email or password: don’t tell attackers which.'],
      [14, 'Start a session (next lesson).'],
      [16, 'Go to the account page.'],
    ]),
    matchUp('Match the idea', [['Signing in with a password', 'Authentication'], ['Only owners may change prices', 'Authorization'], ['A random token in a cookie', 'Session'], ['bcrypt or argon2', 'Password hashing']], 'Who you are, what you may do, and how the server remembers you.'),
    check('Why is “Wrong email or password” better than “No such email”?', ['It doesn’t tell an attacker which emails have accounts', 'It is shorter', 'It is faster', 'It hides the password'], 'Give away as little as possible.', 'What could an attacker learn?'),
    recap([
      ['🪪', 'Authentication: who you are'],
      ['🔐', 'Authorization: what you may do'],
      ['#', 'Store password hashes, never passwords'],
    ]),
  ], 'intermediate'),

  lesson('nx-i-7-2', 'Sessions and cookies', 8, [
    chat(['HTTP forgets you after every request. A session fixes that: after signing in, the server gives the browser a cookie with a random token.', 'The browser sends the cookie with every request, and the server looks up who it belongs to.']),
    explore('lib/session.js', SESSION, [
      [1, 'server-only: this file can never end up in the browser.'],
      [6, 'A long random token, impossible to guess.'],
      [7, 'Remember which user it belongs to.'],
      [10, 'httpOnly: JavaScript in the page can’t read it.'],
      [11, 'secure: only sent over HTTPS.'],
      [12, 'sameSite: not sent from other sites’ forms.'],
      [18, 'getUser reads the cookie and finds the user.'],
      [27, 'Signing out deletes the session and the cookie.'],
    ]),
    tapPage('Signed in, then out', 'Sign in as Sam (sam-pass). On /account, tap Sign out.', app(AUTH_APP), 'Session ended', [...signIn('sam@example.com', 'sam-pass'), { submit: '#out' }], 'The account page read the cookie to find Sam. Signing out removed it and sent you back to /login.'),
    reveal('Cookie settings that matter', [
      ['httpOnly', 'Stops page scripts reading the token (protects against XSS).'],
      ['secure', 'HTTPS only.'],
      ['sameSite: "lax"', 'Not sent with forms posted from other sites (helps against CSRF).'],
      ['maxAge', 'How long the session lasts, in seconds.'],
    ], { mono: true }),
    tapbug('Any script on the page can steal the session', ['store.set("session", token, {', '  secure: true,', '  sameSite: "lax",', '});'], [[2, 'secure: true,', 'httpOnly: true, secure: true,']], 'Add httpOnly so page JavaScript can’t read the cookie.'),
    check('What should the session cookie hold?', ['A long random token the server looks up', 'The password', 'The user’s email and role', 'The whole user record'], 'Nothing useful to an attacker on its own.', 'If someone saw it, what should they learn?'),
    recap([
      ['🍪', 'A session cookie holds a random token'],
      ['🛡', 'httpOnly, secure, sameSite, maxAge'],
      ['🚪', 'Signing out deletes the session and the cookie'],
    ]),
  ]),

  lesson('nx-i-7-3', 'Protected routes', 8, [
    chat(['Some pages are for signed-in people only, like /account.', 'Check in two places: proxy.js can send visitors without a session cookie to /login early, and the page itself checks the real user.']),
    tapPage('Keep strangers out', 'Without signing in, open /account.', app({ ...AUTH_APP, 'proxy.js': PROXY }), 'GET /account 307', go('/account'), 'proxy.js saw no session cookie and redirected to /login before the page ran.'),
    explore('proxy.js', PROXY, [
      [3, 'Runs before matching requests.'],
      [4, 'A quick check: is there a session cookie at all?'],
      [5, 'If not, redirect to /login.'],
      [9, 'Only for these addresses.'],
    ]),
    explore('The page checks too', ACCOUNT, [
      [6, 'Look up the real user from the session.'],
      [7, 'No valid session? Redirect, even if a cookie was there.'],
    ]),
    truth([
      ['proxy.js alone is enough security', false, 'It only sees the cookie, not if the session is real. Check in the page and actions too.'],
      ['Check the user close to the data: in pages, actions and Route Handlers', true, 'That is where it counts.'],
      ['A layout check protects every Server Action', false, 'Actions can be called directly. Check inside each one.'],
    ]),
    check('Where must you check the user before changing data?', ['Inside the Server Action itself', 'Only in proxy.js', 'Only in the layout', 'Only in the browser'], 'Actions are public endpoints.', 'Who can call an action?'),
    recap([
      ['🚧', 'proxy.js: a quick, early redirect'],
      ['🔍', 'Pages, actions and APIs check the real user'],
      ['📍', 'Check close to the data, every time'],
    ]),
  ]),

  lesson('nx-i-7-4', 'Authorization and roles', 9, [
    chat(['Signed in isn’t the same as allowed. Each user has a role: Rosa is the owner, Sam is a customer.', 'Role-based access control (RBAC) means checking the role before showing or changing anything.']),
    tapPage('Customers can’t see the owner area', 'Sign in as Sam (sam-pass), then open /admin.', app(RBAC_APP), 'Blocked Sam: not an owner', [...signIn('sam@example.com', 'sam-pass'), ...go('/admin')], 'Sam is signed in, but his role is customer.'),
    tapPage('Actions check roles too', 'Sign in as Sam, open /prices and tap Save.', app(RBAC_APP), 'Refused: only the owner can change prices', [...signIn('sam@example.com', 'sam-pass'), ...go('/prices'), { submit: '#price' }], 'Even if Sam found the form, the action itself said no.'),
    explore('A role check in an action', PRICE_ACTION, [
      [7, 'Who is calling?'],
      [8, 'Not the owner? Stop, before touching any data.'],
      [12, 'Then check the input.'],
      [14, 'Only now change the data.'],
    ]),
    explore('Roles in an API', ROLE_API, [
      [5, '401: you need to sign in.'],
      [6, '403: signed in, but not allowed.'],
    ]),
    tapbug('Customers can open the owner area', ['const user = await getUser();', 'if (!user) redirect("/login");', 'return <h1>Owner area</h1>;'], [[2, 'if (!user) redirect("/login");', 'if (!user) redirect("/login"); if (user.role !== "owner") return <p>Owners only</p>;']], 'Signed in is not enough. Check the role.'),
    check('Sam is signed in but calls an owner-only API. Which status?', ['403 Forbidden', '401 Unauthorized', '404 Not Found', '200 OK'], '401 means not signed in.', 'Is he signed in?', { mono: false }),
    recap([
      ['👥', 'Each user has a role'],
      ['🔐', 'Check the role in pages, actions and APIs'],
      ['🚦', '401: sign in first; 403: not allowed'],
    ]),
  ]),

  challenge('nx-i-7-ch', 'Module 7 Challenge', { icon: '🔐', name: 'Gatekeeper' }, ['Sign people in with sessions', 'Protect pages, actions and APIs', 'Give each role the right access'], [
    mcq(1, 'Authentication answers…', ['Who are you?', 'What may you do?', 'Where are you?', 'How fast is it?'], 'Authorization is what you may do.'),
    mcq(2, 'How should passwords be stored?', ['As hashes, with bcrypt or argon2', 'As plain text', 'In a cookie', 'In localStorage'], 'Never the password itself.'),
    mcq(3, 'Which cookie setting stops page scripts reading it?', ['httpOnly', 'secure', 'maxAge', 'path'], 'Protects against XSS.', { mono: true }),
    mcq(4, 'What is proxy.js good for here?', ['A quick redirect when there is no session cookie', 'All of your security', 'Storing passwords', 'Making pages static'], 'Check again near the data.'),
    mcq(5, 'Signed in, but not allowed: which status?', ['403', '401', '404', '500'], 'Forbidden.', { mono: true }),
    swipe([
      ['Server Actions must check the user themselves', true, 'They can be called directly.'],
      ['A session cookie should hold the user’s password', false, 'A random token.'],
      ['Libraries like Auth.js handle many sign-in details', true, 'Teams often use one.'],
      ['Hiding a button is enough to protect an action', false, 'Check on the server.'],
    ]),
    pairs([['startSession', 'Sign in'], ['getUser', 'Who is this?'], ['endSession', 'Sign out'], ['user.role', 'What may they do?']], 'The session helpers.'),
    pickCode('Which checks the role before changing a price?', ['if (user?.role !== "owner") return;', 'if (user) return;', 'if (!price) return;', 'if (role = "owner") save();'], 'Stop anyone who isn’t the owner.'),
    bugTask(['store.set("session", user.email);', 'export async function deleteDish(id) {', '  "use server";', '  await db.dish.delete({ where: { id } });'], [[1, 'user.email', 'crypto.randomUUID()'], [4, 'await db.dish.delete', 'if ((await getUser())?.role !== "owner") return; await db.dish.delete']], 'Use a random token, and check the role inside the action.'),
    xray('<div><form><input id="email"><button>Sign in</button></form><p class="err">Only the owner can see this page.</p><p class="muted">Signed in as sam@example.com</p></div>', [
      ['form', 'The sign-in form', 'signIn', ['signIn', 'user.role !== "owner"', 'getUser()']],
      ['.err', 'The owner-only message', 'user.role !== "owner"', ['signIn', 'user.role !== "owner"', 'getUser()']],
      ['.muted', 'Who is signed in', 'getUser()', ['signIn', 'user.role !== "owner"', 'getUser()']],
    ]),
    arrange(['import { redirect } from "next/navigation";', 'import { getUser } from "@/lib/session";', 'export default async function Orders() {', '  const user = await getUser();', '  if (!user) redirect("/login");', '  return <h1>Orders for {user.name}</h1>;', '}'], 'imports, start the page, find the user, redirect strangers, show the page, close it', AUTH_APP, 'app/orders/page.js', '/orders'),
  ]),
];
