// Extra modules for Node.js.
import { bug, lesson, order, predict, quiz, read } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const js = (kicker: string, o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker, lang: 'javascript', ...o });

export const NODE_MORE: Lesson[] = [
  lesson('n-npm-1', 'npm and packages', 'node', ['npm installs packages', 'package.json lists dependencies', 'Scripts run common commands'], [
    read({
      kicker: 'READ · NODE.JS',
      title: 'Stand on others\' shoulders',
      body: 'npm is Node\'s package manager. npm install express downloads Express into node_modules and records it in package.json, so anyone can reinstall the same versions.',
      lang: 'bash',
      code: ['npm init -y', 'npm install express', 'npm run dev'],
      tip: 'Never commit node_modules; package.json is enough to rebuild it.',
    }),
    order({
      kicker: 'PRACTICE · NODE.JS',
      title: 'Start a project',
      instructions: 'Order the commands to create a project, add Express and start it.',
      lang: 'bash',
      lines: ['npm init -y', 'npm install express', 'node server.js'],
      explain: 'Create package.json, install the dependency, then run your file.',
    }),
    quiz({
      prompt: 'Where does npm record the packages your project needs?',
      options: ['package.json', 'node_modules', 'index.js', '.gitignore'],
      mono: true,
      right: 'package.json lists dependencies and their versions.',
      wrong: 'node_modules holds the downloaded code; package.json is the list.',
    }),
  ]),

  lesson('n-fs-1', 'Reading and writing files', 'node', ['fs reads and writes files', 'Use the promise version with await', 'JSON files are a simple data store'], [
    read({
      kicker: 'READ · NODE.JS',
      title: 'Files on the server',
      body: 'The fs module reads and writes files. fs/promises works with await. Together with JSON.parse and JSON.stringify, a file becomes a tiny database.',
      lang: 'javascript',
      code: ['const fs = require("fs/promises");', '', 'async function addStop(stop) {', '  const stops = JSON.parse(await fs.readFile("stops.json", "utf8"));', '  stops.push(stop);', '  await fs.writeFile("stops.json", JSON.stringify(stops));', '}'],
      tip: 'Real apps use a database so many users can write at once.',
    }),
    bug({
      kicker: 'PRACTICE · NODE.JS',
      title: 'Wrote the wrong thing',
      instructions: 'stops.json ends up containing "[object Object]". Which line is wrong?',
      lang: 'javascript',
      lines: ['async function save(fs, data) {', '  await fs.writeFile("stops.json", data.toString());', '}'],
      bug: 1,
      fix: '  await fs.writeFile("stops.json", JSON.stringify(data));',
      explain: 'Objects must be turned into JSON text with JSON.stringify before writing.',
    }),
    predict({
      kicker: 'PRACTICE · NODE.JS',
      title: 'Round trip',
      lang: 'javascript',
      lines: ['const text = JSON.stringify({ stop: "Agra", km: 200 });', 'const back = JSON.parse(text);', 'console.log(typeof text, back.km + 1);'],
      answer: 'string 201',
      explain: 'stringify makes a string; parse turns it back into an object whose km is a number.',
    }),
  ]),

  lesson('n-middleware-1', 'Express middleware', 'node', ['Middleware runs before your route', 'next() passes control on', 'Use it for logging, auth and parsing'], [
    read({
      kicker: 'READ · NODE.JS',
      title: 'Code that runs on every request',
      body: 'Middleware is a function (req, res, next) that runs before routes. It can log, check a login, or parse JSON, then call next() to continue. If it never calls next(), the request hangs.',
      lang: 'javascript',
      code: ['app.use(express.json());', '', 'app.use((req, res, next) => {', '  console.log(req.method, req.url);', '  next();', '});'],
      tip: 'Middleware runs in the order you add it with app.use.',
    }),
    bug({
      kicker: 'PRACTICE · NODE.JS',
      title: 'Requests hang forever',
      instructions: 'After adding this logger, no request ever gets a response. Find the bug.',
      lang: 'javascript',
      lines: ['function logger(req, res, next) {', '  console.log(req.method, req.url);', '}'],
      bug: 1,
      fix: '  console.log(req.method, req.url); next();',
      explain: 'Middleware must call next() (or send a response), or the request stops there.',
    }),
    js('PRACTICE · NODE.JS', {
      title: 'An auth check',
      instructions: 'requireKey(req) returns { status: 401 } when req.headers["x-api-key"] is not "secret123", otherwise { status: 200 }.',
      file: 'auth.js',
      starter: 'function requireKey(req) {\n  return { status: 200 };\n}\n',
      tests: [
        { call: 'requireKey({ headers: { "x-api-key": "secret123" } })', expect: '({ status: 200 })' },
        { call: 'requireKey({ headers: {} })', expect: '({ status: 401 })' },
      ],
      hint: 'if (req.headers["x-api-key"] !== "secret123") return { status: 401 };',
      solution: 'function requireKey(req) {\n  if (req.headers["x-api-key"] !== "secret123") return { status: 401 };\n  return { status: 200 };\n}\n',
    }),
  ]),

  lesson('n-env-1', 'Config and secrets', 'node', ['process.env reads environment variables', 'Keep secrets out of code', 'Use defaults for local development'], [
    read({
      kicker: 'READ · NODE.JS',
      title: 'Never hard-code secrets',
      body: 'Passwords and API keys belong in environment variables, not in code you push to GitHub. process.env.PORT reads a variable; || gives a default when it is missing.',
      lang: 'javascript',
      code: ['const port = process.env.PORT || 3000;', 'const dbUrl = process.env.DATABASE_URL;', 'if (!dbUrl) throw new Error("DATABASE_URL is not set");'],
      tip: 'A .env file plus .gitignore keeps local secrets private.',
    }),
    predict({
      kicker: 'PRACTICE · NODE.JS',
      title: 'Fallback values',
      lang: 'javascript',
      lines: ['const env = { PORT: undefined, MODE: "prod" };', 'const port = env.PORT || 3000;', 'const mode = env.MODE || "dev";', 'console.log(port, mode);'],
      answer: '3000 prod',
      explain: 'PORT is missing so the default 3000 is used; MODE is set, so it stays "prod".',
    }),
    quiz({
      prompt: 'Where should a payment API key live?',
      options: ['In an environment variable on the server', 'In the React code', 'In README.md', 'In a public GitHub repo'],
      right: 'Secrets stay on the server, in environment variables.',
      wrong: 'Anything in client code or a public repo can be read by anyone.',
    }),
  ]),

  lesson('n-rest-1', 'REST API design', 'node', ['Resources are nouns in the URL', 'HTTP methods are the verbs', 'Status codes tell the client what happened'], [
    read({
      kicker: 'READ · NODE.JS',
      title: 'Predictable APIs',
      body: 'A REST API uses URLs for things (/trains, /trains/12951) and HTTP methods for actions: GET reads, POST creates, PUT/PATCH update, DELETE removes. Status codes: 200 OK, 201 Created, 400 bad input, 404 not found, 500 server error.',
      lang: 'javascript',
      code: ['app.get("/trains/:id", (req, res) => {', '  const train = findTrain(req.params.id);', '  if (!train) return res.status(404).json({ error: "Not found" });', '  res.json(train);', '});'],
      tip: 'Plural nouns for collections: /bookings, not /getBookings.',
    }),
    quiz({
      prompt: 'Which request cancels booking 42?',
      options: ['DELETE /bookings/42', 'GET /deleteBooking?id=42', 'POST /bookings', 'GET /bookings/42'],
      mono: true,
      right: 'The method says the action, the URL names the resource.',
      wrong: 'In REST the verb is the HTTP method: DELETE on /bookings/42.',
    }),
    js('PRACTICE · NODE.JS', {
      title: 'Status for each case',
      instructions: 'statusFor(train, method) returns 404 if train is null, 201 if method is "POST", otherwise 200.',
      file: 'status.js',
      starter: 'function statusFor(train, method) {\n  return 200;\n}\n',
      tests: [
        { call: 'statusFor(null, "GET")', expect: '404' },
        { call: 'statusFor({ id: 1 }, "POST")', expect: '201' },
        { call: 'statusFor({ id: 1 }, "GET")', expect: '200' },
      ],
      hint: 'if (!train) return 404; if (method === "POST") return 201;',
      solution: 'function statusFor(train, method) {\n  if (!train) return 404;\n  if (method === "POST") return 201;\n  return 200;\n}\n',
    }),
  ]),
];
