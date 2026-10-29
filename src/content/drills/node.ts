// Extra practice for each Node.js module. JavaScript predicts run in tests.
import { bug, order, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · NODE.JS';

export const NODE_DRILLS: Record<string, Step[]> = {
  'n-intro-1': [
    quiz({ prompt: 'Which version of Node.js should most projects use?', options: ['The current LTS version', 'The oldest version', 'Any odd-numbered version', 'Whatever came with a tutorial video'], right: 'Right. LTS versions get fixes for years.', wrong: 'Pick the long-term support (LTS) release.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const argv = ["node", "app.js", "--city", "Pune"];', 'const i = argv.indexOf("--city");', 'console.log(argv[i + 1]);'], answer: 'Pune', explain: 'The value comes right after the flag.' }),
    quiz({ prompt: 'How do you run app.js with Node?', options: ['node app.js', 'npm app.js', 'run app.js', 'open app.js'], right: 'Right.', wrong: 'node followed by the file name runs it.', mono: true }),
  ],
  'n-modules': [
    quiz({ prompt: 'Which line imports a default export?', options: ['import express from "express";', 'import { express } = "express";', 'require express;', 'import "express" as express;'], right: 'Right.', wrong: 'Default exports are imported without braces.', mono: true }),
    quiz({ prompt: 'What makes .js files ES modules in a project?', options: ['"type": "module" in package.json', 'Naming the folder modules', 'Using const', 'Nothing: they always are'], right: 'Right (or name files .mjs).', wrong: 'Set "type": "module", or use the .mjs extension.' }),
    quiz({ prompt: 'In an ES module, which import of fares.js works?', options: ['import { fare } from "./fares.js";', 'import { fare } from "./fares";', 'import { fare } from "fares";', 'import fare.js;'], right: 'Right. Relative imports need the file extension.', wrong: 'ES modules need the full relative path, including .js.', mono: true }),
  ],
  'n-npm-1': [
    quiz({ prompt: 'What does npm ci do?', options: ['Installs exactly what package-lock.json lists', 'Creates a new project', 'Publishes your package', 'Updates every package to the latest version'], right: 'Right. Great for servers and CI.', wrong: 'npm ci installs the locked versions exactly.' }),
    quiz({ prompt: 'Does "^5.1.0" allow version 5.9.2?', options: ['Yes', 'No', 'Only with --force', 'Only on Linux'], right: 'Right. Same major version, newer minor.', wrong: 'The caret allows newer minor and patch versions within major 5.', mono: true }),
    quiz({ prompt: 'Where should a linter like eslint go?', options: ['devDependencies (npm install -D)', 'dependencies', 'A global install only', 'Inside app.js'], right: 'Right. It is only needed while developing.', wrong: 'Tools you only use during development belong in devDependencies.' }),
  ],
  'n-async-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['console.log("a");', 'setTimeout(() => console.log("b"), 0);', 'Promise.resolve().then(() => console.log("c"));', 'console.log("d");'], answer: 'a\nd\nc\nb', explain: 'Sync lines, then the promise callback, then the timer.' }),
    quiz({ prompt: 'What does an async function return?', options: ['A promise', 'Always undefined', 'The value directly', 'A callback'], right: 'Right.', wrong: 'async functions always return a promise.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'A failed load crashes the server. Tap the line that needs protecting.', lang: 'javascript', lines: ['async function show() {', '  const trains = await loadTrains();', '  console.log(trains.length);', '}'], bug: 1, fix: '  const trains = await loadTrains().catch(() => []);', explain: 'Handle the rejection, with try/catch or .catch, so one failure doesn’t crash everything.' }),
  ],
  'n-fs-1': [
    quiz({ prompt: 'Which call adds a line to the end of log.txt?', options: ['appendFile("log.txt", "line\\n")', 'writeFile("log.txt", "line\\n")', 'readFile("log.txt", "line")', 'openFile("log.txt")'], right: 'Right. writeFile would replace the whole file.', wrong: 'appendFile adds; writeFile replaces.', mono: true }),
    quiz({ prompt: 'What does the error code ENOENT mean?', options: ['No such file or directory', 'Permission denied', 'Disk full', 'File is empty'], right: 'Right.', wrong: 'ENOENT: the path doesn’t exist.' }),
    quiz({ prompt: 'You run node scripts/report.js from the project folder. A relative "data.json" is looked up in…', options: ['The project folder you ran it from', 'The scripts folder', 'Your home folder', 'node_modules'], right: 'Right. Use import.meta.dirname for the script’s own folder.', wrong: 'Relative paths start from the current working directory.' }),
  ],
  'n-http': [
    quiz({ prompt: 'Which status code means the server crashed while handling the request?', options: ['500', '404', '201', '400'], right: 'Right.', wrong: '5xx codes mean a server-side problem.', mono: true }),
    quiz({ prompt: 'Which method should a request that only reads data use?', options: ['GET', 'POST', 'DELETE', 'PATCH'], right: 'Right.', wrong: 'GET reads; it must not change data.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const url = "/trains?from=Delhi";', 'const [path, query] = url.split("?");', 'console.log(path, query);'], answer: '/trains from=Delhi', explain: 'The part before ? is the path, the part after is the query.' }),
  ],
  'n-express-1': [
    quiz({ prompt: 'For GET /trains?from=Delhi, where is "Delhi"?', options: ['req.query.from', 'req.params.from', 'req.body.from', 'req.from'], right: 'Right.', wrong: 'The ?key=value part is in req.query.', mono: true }),
    quiz({ prompt: 'Which sends a 404 with a JSON error?', options: ['res.status(404).json({ error: "Not found" })', 'res.json(404)', 'res.send(404, "Not found")', 'return 404'], right: 'Right.', wrong: 'Set the status, then send the body.', mono: true }),
    order({ kicker: K, title: 'A minimal Express app', instructions: 'Arrange the lines.', lang: 'javascript', lines: ['import express from "express";', 'const app = express();', 'app.get("/", (req, res) => res.send("Hello"));', 'app.listen(3000);'], explain: 'Import, create the app, add routes, then listen.' }),
  ],
  'n-middleware-1': [
    quiz({ prompt: 'In which order does middleware run?', options: ['The order it was added with app.use', 'Alphabetical order', 'Random order', 'Error handlers first'], right: 'Right.', wrong: 'Express runs middleware in the order you registered it.' }),
    quiz({ prompt: 'Where should the error-handling middleware go?', options: ['After all routes', 'Before all routes', 'Inside each route', 'In package.json'], right: 'Right.', wrong: 'Errors flow forward, so the handler goes last.' }),
    quiz({ prompt: 'req.body is undefined in a POST route even though app.use(express.json()) is in the file. The likely cause?', options: ['It was added after the route, so it never runs for that route', 'JSON is not allowed in POST', 'Express 5 removed req.body', 'The port is wrong'], right: 'Right. Middleware only affects routes registered after it.', wrong: 'Middleware runs in order, so put express.json() before the routes.' }),
  ],
  'n-json-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const text = JSON.stringify([1, "two", null]);', 'console.log(text, typeof text);'], answer: '[1,"two",null] string', explain: 'stringify always gives a string.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const b = JSON.parse(\'{"seats":"3"}\');', 'console.log(b.seats + 1);'], answer: '31', explain: '"3" stayed a string in the JSON, so + joins.' }),
    quiz({ prompt: 'What should an API return when the request body is invalid?', options: ['400 with a list of what is wrong', '200 with no body', '500', '404'], right: 'Right.', wrong: '400 Bad Request, with details the client can fix.', mono: true }),
  ],
  'n-rest-1': [
    quiz({ prompt: 'Which URL best lists the bookings of train 12951?', options: ['/trains/12951/bookings', '/getBookings?train=12951', '/bookingsForTrain12951', '/trains/bookings/list/12951'], right: 'Right.', wrong: 'Nest the collection under the resource it belongs to.', mono: true }),
    quiz({ prompt: 'Two people try to book the last seat. The second should get…', options: ['409 Conflict', '200 OK', '201 Created', '301 Moved'], right: 'Right.', wrong: '409 says the request conflicts with the current state.', mono: true }),
    quiz({ prompt: 'What should DELETE /bookings/5 return on success?', options: ['204 No Content', '201 Created', '404 Not Found', '400 Bad Request'], right: 'Right.', wrong: '204 means done, with nothing to send back.', mono: true }),
  ],
  'n-api-1': [
    quiz({ prompt: 'What should a handler do first with req.body?', options: ['Validate it', 'Save it straight away', 'Send it back', 'Log the whole thing, including passwords'], right: 'Right.', wrong: 'Check input before using it.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const db = { nextId: 7, bookings: [] };', 'const a = { id: db.nextId++ };', 'const b = { id: db.nextId++ };', 'console.log(a.id, b.id, db.nextId);'], answer: '7 8 9', explain: 'nextId++ uses the value, then adds 1.' }),
    quiz({ prompt: 'Why keep API logic in plain functions instead of inside the route?', options: ['They can be tested without starting a server', 'Express requires it', 'It makes the server slower', 'Routes can’t call functions'], right: 'Right.', wrong: 'Plain functions are easy to test and reuse.' }),
  ],
  'n-env-1': [
    quiz({ prompt: 'Which runs app.js with the settings from .env (Node 20.6+)?', options: ['node --env-file=.env app.js', 'node app.js .env', 'npm env app.js', 'node --secrets app.js'], right: 'Right.', wrong: 'Use the --env-file flag.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'javascript', lines: ['const env = { WORKERS: "4" };', 'console.log(Number(env.WORKERS) * 2, env.WORKERS * 2, env.WORKERS + 2);'], answer: '8 8 42', explain: '* converts strings to numbers, but + joins them.' }),
    quiz({ prompt: 'A key was printed in your server logs. What now?', options: ['Revoke it and create a new one', 'Delete the log line', 'Nothing', 'Rename the variable'], right: 'Right.', wrong: 'Assume it was seen and replace it.' }),
  ],
  'n-test': [
    quiz({ prompt: 'Which assertion compares two arrays by their contents?', options: ['assert.deepEqual', 'assert.equal', 'assert.ok', 'assert.is'], right: 'Right.', wrong: 'deepEqual compares contents; equal compares identity.', mono: true }),
    quiz({ prompt: 'What makes a good test name?', options: ['“rejects seats above 6”', '“test1”', '“it works”', '“asdf”'], right: 'Right: it says the behaviour.', wrong: 'Name tests after what they check.', mono: true }),
    quiz({ prompt: 'Which checks that a function throws?', options: ['assert.throws(() => fn())', 'assert.equal(fn(), "error")', 'try { fn() } finally {}', 'assert.ok(fn)'], right: 'Right. Pass a function, not its result.', wrong: 'assert.throws takes a function and expects it to throw.', mono: true }),
  ],
};
