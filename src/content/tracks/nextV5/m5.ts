// Next.js · Module 5 · API Development: Route Handlers and REST, HTTP methods, dynamic Route Handlers, and request
// and response handling. Lesson 5.1 keeps the old module id (nx-api-1). A small “API tester” page sends the requests.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const LIST = [
  'import { db } from "@/lib/db";',
  '',
  'export async function GET() {',
  '  const dishes = await db.dish.findMany({ select: { id: true, name: true, price: true } });',
  '  return Response.json(dishes);',
  '}',
];

const LIST_POST = [
  ...LIST,
  '',
  'export async function POST(request) {',
  '  const body = await request.json();',
  '  if (!body.name || !(body.price > 0)) {',
  '    return Response.json({ error: "A name and a price are needed" }, { status: 400 });',
  '  }',
  '  const dish = await db.dish.create({ data: { name: body.name, price: body.price } });',
  '  return Response.json(dish, { status: 201 });',
  '}',
];

const ONE = [
  'import { db } from "@/lib/db";',
  '',
  'async function find(params) {',
  '  const { id } = await params;',
  '  return db.dish.findUnique({ where: { id: Number(id) } });',
  '}',
  '',
  'export async function GET(request, { params }) {',
  '  const dish = await find(params);',
  '  if (!dish) return Response.json({ error: "No such dish" }, { status: 404 });',
  '  return Response.json(dish);',
  '}',
  '',
  'export async function PATCH(request, { params }) {',
  '  const dish = await find(params);',
  '  if (!dish) return Response.json({ error: "No such dish" }, { status: 404 });',
  '  const changes = await request.json();',
  '  return Response.json(await db.dish.update({ where: { id: dish.id }, data: changes }));',
  '}',
  '',
  'export async function DELETE(request, { params }) {',
  '  const dish = await find(params);',
  '  if (!dish) return Response.json({ error: "No such dish" }, { status: 404 });',
  '  await db.dish.delete({ where: { id: dish.id } });',
  '  return new Response(null, { status: 204 });',
  '}',
];

const SEARCH = [
  'import { db } from "@/lib/db";',
  '',
  'export async function GET(request) {',
  '  const max = request.nextUrl.searchParams.get("max");',
  '  if (max !== null && isNaN(Number(max))) {',
  '    return Response.json({ error: "max must be a number" }, { status: 400 });',
  '  }',
  '  const where = max === null ? {} : { price: { lte: Number(max) } };',
  '  const dishes = await db.dish.findMany({ where });',
  '  return Response.json(dishes.map((d) => d.name), {',
  '    headers: { "Cache-Control": "no-store" },',
  '  });',
  '}',
];

/** A tiny API tester: each button sends one request and shows the status and the reply. */
const tester = (calls: [id: string, label: string, method: string, url: string, body?: unknown][]) => [
  '"use client";',
  'import { useState } from "react";',
  '',
  'export default function Tester() {',
  '  const [out, setOut] = useState("Tap a button to send a request");',
  '  async function send(method, url, body) {',
  '    const res = await fetch(url, { method, body: body && JSON.stringify(body) });',
  '    const text = await res.text();',
  '    setOut(method + " " + url + " → " + res.status + " " + text);',
  '  }',
  '  return (',
  '    <div>',
  ...calls.map(([id, label, method, url, body]) => `      <button id="${id}" onClick={() => send("${method}", "${url}"${body === undefined ? '' : `, ${JSON.stringify(body)}`})}>${label}</button>`),
  '      <pre className="card">{out}</pre>',
  '    </div>',
  '  );',
  '}',
];

const POST_APP = {
  ...CAFE,
  'app/api/dishes/route.js': LIST_POST,
  'app/page.js': tester([['list', 'GET all', 'GET', '/api/dishes'], ['add', 'POST Mint Tea', 'POST', '/api/dishes', { name: 'Mint Tea', price: 50 }], ['bad', 'POST no price', 'POST', '/api/dishes', { name: 'Mint Tea' }], ['put', 'PUT', 'PUT', '/api/dishes', {}]]),
};
const ONE_APP = {
  ...CAFE,
  'app/api/dishes/route.js': LIST,
  'app/api/dishes/[id]/route.js': ONE,
  'app/page.js': tester([['get2', 'GET 2', 'GET', '/api/dishes/2'], ['patch2', 'PATCH 2 price', 'PATCH', '/api/dishes/2', { price: 95 }], ['del2', 'DELETE 2', 'DELETE', '/api/dishes/2'], ['get9', 'GET 9', 'GET', '/api/dishes/9']]),
};

export const NX_M5: Lesson[] = [
  lesson('nx-api-1', 'Route Handlers and REST APIs', 7, [
    chat(['An API lets other programs use your data: a phone app, another website, or your own pages.', 'In Next.js, a file named route.js inside app/ is a Route Handler. It answers requests with data instead of a page.']),
    reveal('REST in four ideas', [
      ['Resources', 'Each kind of thing has an address: /api/dishes, /api/dishes/2.'],
      ['Methods', 'GET reads, POST adds, PATCH and PUT change, DELETE removes.'],
      ['JSON', 'Data goes back and forth as JSON text.'],
      ['Status codes', '200 OK, 201 made, 400 bad request, 404 not found, 500 server error.'],
    ]),
    tapPage('Your first API', 'Open /api/dishes in the address bar.', app({ ...CAFE, 'app/api/dishes/route.js': LIST }), 'GET /api/dishes 200', go('/api/dishes'), 'The browser shows the JSON. Any program could read it.'),
    explore('A Route Handler', LIST, [
      [1, 'Route Handlers run on the server, so they can use the database.'],
      [3, 'Export a function named after the HTTP method.'],
      [4, 'select picks only the fields to send.'],
      [5, 'Response.json sends the data as JSON, with status 200.'],
    ]),
    check('Where does the API at /api/dishes live?', ['app/api/dishes/route.js', 'app/api/dishes/page.js', 'api/dishes.js', 'app/dishes/api.js'], 'route.js, in the folder for that address.', 'Pages are page.js. APIs are…', { mono: true }),
    truth([
      ['A folder can’t have both page.js and route.js', true, 'One address: a page or an API.'],
      ['Route Handlers run in the browser', false, 'On the server.'],
      ['The function name says which HTTP method it answers', true, 'GET, POST, PATCH…'],
    ]),
    recap([
      ['🔌', 'route.js is a Route Handler: data, not a page'],
      ['🧭', 'REST: resources at addresses, methods for actions'],
      ['📨', 'Response.json(data) sends JSON'],
    ]),
  ], 'intermediate'),

  lesson('nx-i-5-2', 'HTTP methods', 8, [
    matchUp('Which method?', [['GET', 'Read'], ['POST', 'Add'], ['PATCH', 'Change part'], ['PUT', 'Replace all'], ['DELETE', 'Remove']], 'Each method has one job.'),
    tapPage('Send requests', 'Tap GET all, then POST Mint Tea, then POST no price, then PUT.', app(POST_APP), 'PUT /api/dishes 405', [{ click: '#list' }, { click: '#add' }, { click: '#bad' }, { click: '#put' }], 'POST made a dish (201). No price gave 400. There is no PUT function, so Next.js answered 405 (method not allowed).'),
    explore('GET and POST in one file', LIST_POST, [
      [8, 'POST gets the request.'],
      [9, 'request.json() reads the JSON body.'],
      [10, 'Check the input first.'],
      [11, 'Bad input: 400, with a clear error.'],
      [14, 'Made something new: 201.'],
    ]),
    tapbug('The new dish is saved, but the app says “OK” instead of “Created”', ['const dish = await db.dish.create({ data });', 'return Response.json(dish);'], [[2, 'Response.json(dish)', 'Response.json(dish, { status: 201 })']], 'After POST makes something, answer 201.'),
    check('What does Next.js answer if route.js has no DELETE function?', ['405 Method Not Allowed', '404 Not Found', '500 Server Error', '200 OK'], 'The address exists; the method doesn’t.', 'Is the address wrong, or the method?', { mono: false }),
    recap([
      ['🔤', 'GET, POST, PUT, PATCH, DELETE: one export each'],
      ['📥', 'await request.json() reads the body'],
      ['🚦', '201 made, 400 bad input, 405 no such method'],
    ]),
  ]),

  lesson('nx-i-5-3', 'Dynamic Route Handlers', 8, [
    chat(['/api/dishes is the list. Each dish needs its own address too: /api/dishes/2.', 'Same as pages: a folder named [id] with a route.js inside. The handler gets params as its second argument.']),
    tapPage('One dish at a time', 'GET 2, PATCH its price, DELETE it, then try GET 9.', app(ONE_APP), 'GET /api/dishes/9 404', [{ click: '#get2' }, { click: '#patch2' }, { click: '#del2' }, { click: '#get9' }], 'Each method works on the dish in the address. A missing dish is 404.'),
    explore('app/api/dishes/[id]/route.js', ONE, [
      [3, 'A helper both handlers share.'],
      [4, 'params is a Promise: await it, like in pages.'],
      [8, 'The second argument holds params.'],
      [10, 'No such dish: 404 with a message.'],
      [25, '204 means “done, nothing to send back”.'],
    ]),
    tapbug('Every dish is “No such dish”', ['export async function GET(request, { params }) {', '  const dish = await db.dish.findUnique({ where: { id: params.id } });'], [[2, 'id: params.id', 'id: Number((await params).id)']], 'Await params, and turn the text id into a number.'),
    check('Which file answers DELETE /api/dishes/7?', ['app/api/dishes/[id]/route.js', 'app/api/dishes/route.js', 'app/api/dishes/7.js', 'app/api/[id]/dishes/route.js'], 'The [id] folder matches 7.', 'Which folder matches any id?', { mono: true }),
    recap([
      ['🎯', '[id]/route.js for one item'],
      ['⏳', 'The second argument: { params }, a Promise'],
      ['🔍', 'Missing item: 404; deleted: 204'],
    ]),
  ]),

  lesson('nx-i-5-4', 'Requests and responses', 8, [
    reveal('What a request carries', [
      ['request.nextUrl.searchParams', 'The query: /api/dishes?max=60 gives get("max") = "60".'],
      ['await request.json()', 'The JSON body (POST, PATCH, PUT).'],
      ['request.headers.get("…")', 'Headers, like the browser type or an auth token.'],
      ['request.cookies.get("…")', 'Cookies the browser sent.'],
    ], { mono: true }),
    tapPage('Query strings', 'Open /api/dishes?max=60, then /api/dishes?max=cheap.', app({ ...CAFE, 'app/api/dishes/route.js': SEARCH }), 'GET /api/dishes?max=cheap 400', [...go('/api/dishes?max=60'), ...go('/api/dishes?max=cheap')], 'A number filters the list. Anything else is a clear 400, not a crash.'),
    explore('Reading the query, shaping the reply', SEARCH, [
      [4, 'searchParams.get gives text, or null if it’s missing.'],
      [5, 'Never trust input: check it first.'],
      [8, 'Only dishes up to the price.'],
      [11, 'Headers go in the second argument of Response.json.'],
    ]),
    reveal('Building a response', [
      ['Response.json(data)', '200 with JSON.'],
      ['Response.json(data, { status: 201 })', 'Another status code.'],
      ['{ headers: { … } }', 'Extra headers, like Cache-Control.'],
      ['new Response(null, { status: 204 })', 'No body at all.'],
    ], { mono: true }),
    tapbug('A bad body crashes the API with a 500', ['export async function POST(request) {', '  const body = await request.json();'], [[2, 'const body = await request.json();', 'const body = await request.json().catch(() => null); if (!body) return Response.json({ error: "Send JSON" }, { status: 400 });']], 'request.json() throws on bad JSON. Catch it and answer 400.'),
    check('How do you read ?q=tea in a Route Handler?', ['request.nextUrl.searchParams.get("q")', 'request.query.q', 'params.q', 'request.json().q'], 'searchParams holds the query.', 'Which part of the URL is it in?', { mono: true }),
    recap([
      ['🔎', 'searchParams, json(), headers, cookies: what came in'],
      ['🧱', 'Response.json(data, { status, headers }): what goes out'],
      ['🛡', 'Check every input; answer 400 with a clear message'],
    ]),
  ]),

  challenge('nx-i-5-ch', 'Module 5 Challenge', { icon: '🔌', name: 'API Builder' }, ['Build REST APIs with Route Handlers', 'Use every HTTP method and status code', 'Read requests and shape responses'], [
    mcq(1, 'Which file is a Route Handler?', ['route.js', 'page.js', 'api.js', 'handler.js'], 'route.js answers with data.', { mono: true }),
    mcq(2, 'Which method adds a new item?', ['POST', 'GET', 'PATCH', 'DELETE'], 'POST to the list.', { mono: true }),
    mcq(3, 'Which status means “made a new item”?', ['201', '200', '204', '400'], '201 Created.', { mono: true }),
    mcq(4, 'How does a dynamic handler get the id?', ['From its second argument: { params }', 'From request.id', 'From the first argument', 'From process.env'], 'Then await params.'),
    mcq(5, 'What does a missing method (like PUT) give?', ['405', '404', '500', '201'], 'Method not allowed.', { mono: true }),
    swipe([
      ['request.json() can throw on bad JSON', true, 'Catch it: 400.'],
      ['204 sends a body', false, 'No content.'],
      ['Query values are always text', true, 'Turn them into numbers.'],
      ['Route Handlers can use the database', true, 'They run on the server.'],
    ]),
    pairs([['GET /api/dishes', 'The list'], ['POST /api/dishes', 'Add one'], ['PATCH /api/dishes/2', 'Change dish 2'], ['DELETE /api/dishes/2', 'Remove dish 2']], 'REST addresses and methods.'),
    pickCode('Which answers a bad request?', ['return Response.json({ error: "Price needed" }, { status: 400 });', 'throw "Price needed";', 'return Response.json({ error: "Price needed" });', 'console.log("Price needed");'], 'A clear message and 400.'),
    bugTask(['export async function get() {', '  return Response.json(dishes, 201);', '}'], [[1, 'function get()', 'function GET()'], [2, 'Response.json(dishes, 201)', 'Response.json(dishes)']], 'Method names are in capitals, and a GET of a list is 200 (the default).'),
    xray('<div><pre class="card">GET /api/dishes/9 → 404 {"error":"No such dish"}</pre><button id="add">POST Mint Tea</button></div>', [
      ['.card', 'A 404 reply', 'Response.json({ error }, { status: 404 })', ['Response.json({ error }, { status: 404 })', 'fetch(url, { method: "POST" })', 'export async function GET']],
      ['#add', 'A button that adds', 'fetch(url, { method: "POST" })', ['Response.json({ error }, { status: 404 })', 'fetch(url, { method: "POST" })', 'export async function GET']],
    ]),
    arrange(['import { db } from "@/lib/db";', 'export async function GET() {', '  const students = await db.student.findMany();', '  return Response.json(students);', '}'], 'import the database, export GET, read the students, send JSON, close it', CAFE, 'app/api/students/route.js', '/api/students'),
  ]),
];
