import { fill } from './helpers';
import type { EditorStep, Lesson } from './types';

export const fareModule = fill({
  kicker: 'PRACTICE · NODE MODULES',
  title: 'Share code between files',
  instructions: 'Export the fare function from fare.js, then import it in server.js.',
  lang: 'javascript',
  file: 'fare.js + server.js',
  lines: [
    ['// fare.js'],
    ['function fare(km) { return km * 2; }'],
    ['module.', { gap: 0 }, ' = { fare };'],
    [''],
    ['// server.js'],
    ['const { fare } = ', { gap: 1 }, '("./fare");'],
    ['console.log(fare(150));'],
  ],
  tokens: ['exports', 'require', 'import', 'export', 'include'],
  answers: [
    { value: 'exports', check: 'module.exports shares the function' },
    { value: 'require', check: 'require() loads the other file' },
  ],
  output: ['$ node server.js', '300'],
});

export const asyncSeats = fill({
  kicker: 'PRACTICE · ASYNC / AWAIT',
  title: 'Wait for the database',
  instructions: 'The database is slow, so seatsLeft must wait for it. Mark the function async and await the query.',
  lang: 'javascript',
  file: 'seats.js',
  lines: [[{ gap: 0 }, ' function seatsLeft(trainId) {'], ['  const train = ', { gap: 1 }, ' db.find(trainId);'], ['  return train.seats;'], ['}']],
  tokens: ['async', 'await', 'then', 'wait', 'sync'],
  answers: [
    { value: 'async', check: 'async lets the function wait' },
    { value: 'await', check: 'await pauses until the query finishes' },
  ],
  output: ['await db.find(12951) … 42 ms', 'seats left: 18'],
});

export const expressRoute = fill({
  kicker: 'PRACTICE · EXPRESS',
  title: 'A real web server',
  instructions: 'Answer GET /trains with JSON, then start the server on port 3000.',
  lang: 'javascript',
  file: 'server.js',
  lines: [
    ['const express = require("express");'],
    ['const app = express();'],
    [''],
    ['app.', { gap: 0 }, '("/trains", (req, res) => {'],
    ['  res.', { gap: 1 }, '([{ name: "Rajdhani" }]);'],
    ['});'],
    [''],
    ['app.', { gap: 2 }, '(3000);'],
  ],
  tokens: ['get', 'json', 'listen', 'post', 'send', 'start'],
  answers: [
    { value: 'get', check: 'app.get handles GET requests' },
    { value: 'json', check: 'res.json sends JSON back' },
    { value: 'listen', check: 'app.listen starts the server' },
  ],
  output: ['Listening on http://localhost:3000', 'GET /trains → 200 [{"name":"Rajdhani"}]'],
});

export const parseBooking: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · JSON',
  title: 'Read a booking request',
  instructions: 'seatsAfter(body) gets a JSON string like {"available": 10, "booked": 3}. Parse it and return the seats left. Never return less than 0.',
  lang: 'javascript',
  file: 'booking.js',
  starter: 'function seatsAfter(body) {\n  // JSON.parse turns text into an object\n  return body;\n}\n',
  tests: [
    { call: 'seatsAfter(\'{"available": 10, "booked": 3}\')', expect: '7' },
    { call: 'seatsAfter(\'{"available": 2, "booked": 5}\')', expect: '0' },
  ],
  hint: 'const { available, booked } = JSON.parse(body);\nreturn Math.max(0, available - booked);',
  solution: 'function seatsAfter(body) {\n  const { available, booked } = JSON.parse(body);\n  return Math.max(0, available - booked);\n}\n',
};

export const NODE_LESSONS: Lesson[] = [
  {
    id: 'n-intro-1',
    title: 'Node.js and modules',
    kind: 'lesson',
    minutes: 6,
    skill: 'node',
    learned: ['Node runs JavaScript outside the browser', 'module.exports shares code', 'require() loads a module'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · NODE.JS',
        title: 'JavaScript on the server',
        body: 'Node.js runs JavaScript on a computer instead of in a browser, so you can build servers, scripts and tools. Big programs are split into modules: files that export and import code.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['// math.js', 'module.exports = { add: (a, b) => a + b };', '', '// app.js', 'const { add } = require("./math");'],
          },
        ],
        tip: 'Newer projects use import/export instead. Both ideas are the same.',
      },
      {
        type: 'quiz',
        prompt: 'Which command runs app.js with Node?',
        options: ['node app.js', 'run app.js', 'npm app.js', 'js app.js'],
        mono: true,
        answer: 0,
        right: 'node followed by the file name runs it.',
        wrong: 'npm installs packages. To run a file, use node app.js.',
      },
      fareModule,
    ],
  },
  {
    id: 'n-async-1',
    title: 'async and await',
    kind: 'lesson',
    minutes: 7,
    skill: 'node',
    learned: ['Slow work returns a Promise', 'await waits for it without freezing', 'Only async functions can await'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · ASYNC',
        title: 'Don’t block the queue',
        body: 'Reading a file or a database takes time. Node keeps serving other people while it waits. await pauses only your function until the Promise finishes.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['async function load() {', '  const res = await fetch(url);', '  const data = await res.json();', '  return data;', '}'],
          },
        ],
        tip: 'Wrap awaits in try/catch to handle network errors.',
      },
      {
        type: 'quiz',
        prompt: 'Where can you use await?',
        options: ['Inside an async function', 'Anywhere', 'Only in loops', 'Only in HTML'],
        answer: 0,
        right: 'await belongs inside async functions (and at the top level of modules).',
        wrong: 'A normal function cannot await. Mark it async first.',
      },
      asyncSeats,
    ],
  },
  {
    id: 'n-express-1',
    title: 'Servers with Express',
    kind: 'lesson',
    minutes: 8,
    skill: 'node',
    learned: ['Express maps URLs to handlers', 'res.json sends data back', 'listen starts the server on a port'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · EXPRESS',
        title: 'A route is a URL plus a handler',
        body: 'Express is the most popular Node web framework. app.get("/path", handler) runs your handler for each request; it gets req (what came in) and res (what you send back).',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['app.get("/hello", (req, res) => {', '  res.json({ msg: "Namaste" });', '});', 'app.listen(3000);'],
          },
        ],
        tip: 'Use app.post for creating things, like a new booking.',
      },
      {
        type: 'quiz',
        prompt: 'A form creates a new booking. Which method should its route use?',
        options: ['POST', 'GET', 'LISTEN', 'FETCH'],
        mono: true,
        answer: 0,
        right: 'POST creates data; GET only reads it.',
        wrong: 'GET reads. Creating something new is a POST.',
      },
      expressRoute,
    ],
  },
  {
    id: 'n-json-1',
    title: 'Working with JSON',
    kind: 'lesson',
    minutes: 7,
    skill: 'node',
    learned: ['APIs send data as JSON text', 'JSON.parse turns text into objects', 'Guard against bad values'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · JSON',
        title: 'JSON is how apps talk',
        body: 'Requests and responses travel as text. JSON looks like a JavaScript object. JSON.parse reads it into an object; JSON.stringify turns an object back into text.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['const text = \'{"seats": 4}\';', 'const obj = JSON.parse(text);', 'obj.seats; // 4', 'JSON.stringify(obj); // \'{"seats":4}\''],
          },
        ],
        tip: 'Never trust input. Check that values make sense before using them.',
      },
      {
        type: 'quiz',
        prompt: 'What does JSON.parse(\'{"a": 1}\').a give?',
        options: ['1', '"1"', '{"a": 1}', 'undefined'],
        mono: true,
        answer: 0,
        right: 'Parsing gives a real object, so .a is the number 1.',
        wrong: 'JSON.parse turns the text into an object, and its a is 1.',
      },
      parseBooking,
    ],
  },
];
