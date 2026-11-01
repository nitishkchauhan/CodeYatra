// Node.js · Final project: a train booking API for City Travel Desk (keeps the old project id, n-project). Five
// checked steps, each adding to app.js, run live with ready-made requests. Starters and solutions run in tests.
import type { Lesson, WebCheck } from '../../types';
import { finalProject } from '../htmlV5/kit';
import { bugTask, challenge, join, mcq, pairs, pickCode, req, swipe, xray } from './kit';

const HEAD = [
  'import express from "express";',
  '',
  'const TRAINS = [',
  '  { id: 90101, name: "Harbour Express", from: "City Central", to: "Harbour Point", seats: 40 },',
  '  { id: 90102, name: "Hillview Local", from: "City Central", to: "Harbour Point", seats: 2 },',
  '  { id: 90103, name: "River Line", from: "Hillview", to: "Riverside", seats: 0 },',
  '];',
  'const bookings = [];',
  '',
  'const app = express();',
  'app.use(express.json());',
  '',
];
const LIST_START = ['app.get("/trains", (req, res) => {', '  res.json([]);', '});', ''];
const LIST = ['app.get("/trains", (req, res) => {', '  const { from } = req.query;', '  res.json(from ? TRAINS.filter((t) => t.from === from) : TRAINS);', '});', ''];
const ONE = ['app.get("/trains/:id", (req, res) => {', '  const train = TRAINS.find((t) => t.id === Number(req.params.id));', '  if (!train) return res.status(404).json({ error: "No such train" });', '  res.json(train);', '});', ''];
const BOOK = [
  'app.post("/bookings", (req, res) => {',
  '  const { trainId, name, seats } = req.body ?? {};',
  '  const train = TRAINS.find((t) => t.id === trainId);',
  '  if (!train) return res.status(404).json({ error: "No such train" });',
  '  if (typeof name !== "string" || name.trim().length < 2) return res.status(400).json({ error: "name: at least 2 letters" });',
  '  if (!Number.isInteger(seats) || seats < 1 || seats > 6) return res.status(400).json({ error: "seats: 1 to 6" });',
  '  if (seats > train.seats) return res.status(409).json({ error: "Only " + train.seats + " seats left" });',
  '  train.seats -= seats;',
  '  const booking = { id: bookings.length + 1, trainId, name: name.trim(), seats };',
  '  bookings.push(booking);',
  '  res.status(201).json(booking);',
  '});',
  '',
];
const CANCEL = [
  'app.delete("/bookings/:id", (req, res) => {',
  '  const i = bookings.findIndex((b) => b.id === Number(req.params.id));',
  '  if (i === -1) return res.status(404).json({ error: "No such booking" });',
  '  const [booking] = bookings.splice(i, 1);',
  '  TRAINS.find((t) => t.id === booking.trainId).seats += booking.seats;',
  '  res.sendStatus(204);',
  '});',
  '',
];
const ERRORS = [
  'app.use((req, res) => res.status(404).json({ error: "No route for " + req.method + " " + req.path }));',
  '',
  'app.use((err, req, res, next) => {',
  '  console.error("Error: " + err.message);',
  '  res.status(err.status ?? 500).json({ error: err.status === 400 ? "Send valid JSON" : "Something went wrong" });',
  '});',
  '',
];
const LISTEN = ['app.listen(3000, () => console.log("Train API on port 3000"));'];

const program = (...parts: string[][]) => join({ 'app.js': [...HEAD, ...parts.flat(), ...LISTEN] })['app.js'];
const S1 = program(LIST_START);
const S2 = program(LIST);
const S3 = program(LIST, ONE);
const S4 = program(LIST, ONE, BOOK);
const S5 = program(LIST, ONE, BOOK, CANCEL);
const S6 = program(LIST, ONE, BOOK, CANCEL, ERRORS);

const REQUESTS = [
  req('GET', '/trains', undefined, 'All trains'),
  req('GET', '/trains?from=Hillview', undefined, 'From Hillview'),
  req('GET', '/trains/90102', undefined, 'Train 90102'),
  req('GET', '/trains/1', undefined, 'Train 1'),
  req('POST', '/bookings', { trainId: 90101, name: 'Sam', seats: 2 }, 'Book 2 on 90101'),
  req('POST', '/bookings', { trainId: 90102, name: 'Mia', seats: 3 }, 'Book 3 on 90102'),
  req('DELETE', '/bookings/1', undefined, 'Cancel booking 1'),
  req('GET', '/stations', undefined, 'A missing route'),
];

const step = (n: number, title: string, instructions: string, starter: string, solution: string, checks: Omit<WebCheck, 'file'>[], hint: string) =>
  finalProject({
    title: `Step ${n} · ${title}`,
    instructions,
    starter: { html: '', js: starter },
    solution: { html: '', js: solution },
    checks: checks.map((c) => ({ ...c, file: 'js' as const })),
    hint,
    node: { files: {}, edit: 'app.js', requests: REQUESTS },
  });

export const NODE_PROJECT: Lesson = challenge('n-project', 'Final: a train booking API', { icon: '🏆', name: 'Node.js Pro' }, ['Build a REST API with Express', 'Validate input and answer with the right status', 'Handle missing routes and errors'], [
  mcq(1, 'Which route lists trains?', ['GET /trains', 'POST /trains', 'GET /getTrains', 'GET /train/list'], 'A plural noun and GET.', { mono: true }),
  mcq(2, 'How do you read ?from=Hillview?', ['req.query.from', 'req.params.from', 'req.body.from', 'req.from'], 'The query string.', { mono: true }),
  mcq(3, 'Which status when the train is full?', ['409', '404', '400', '500'], 'It clashes with what exists.', { mono: true }),
  mcq(4, 'Which status after cancelling a booking?', ['204', '200', '201', '404'], 'Done, nothing to send.', { mono: true }),
  mcq(5, 'Where does the 404 handler go?', ['After all the routes', 'Before all the routes', 'Inside each route', 'In package.json'], 'It catches what is left.'),
  swipe([
    ['express.json() is needed to read req.body', true, 'Or it is undefined.'],
    ['req.params.id is a number', false, 'Text.'],
    ['Seats should be checked before booking', true, 'Type and range.'],
    ['Error middleware has three arguments', false, 'Four.'],
  ]),
  pairs([['GET /trains/:id', 'One train'], ['POST /bookings', 'Book'], ['DELETE /bookings/:id', 'Cancel'], ['(err, req, res, next)', 'Errors']], 'The API’s parts.'),
  pickCode('Which checks seats from 1 to 6?', ['if (!Number.isInteger(seats) || seats < 1 || seats > 6) return res.status(400).json({ error: "seats: 1 to 6" });', 'if (seats) book();', 'if (seats > 6) seats = 6;', 'res.status(400);'], 'Type and range, then 400.'),
  bugTask(['const train = TRAINS.find((t) => t.id === req.params.id);', 'if (!train) res.status(404).json({ error: "No such train" });'], [[1, 't.id === req.params.id', 't.id === Number(req.params.id)'], [2, 'if (!train) res.status', 'if (!train) return res.status']], 'Compare numbers, and return after the 404.'),
  xray('<div class="c">$ curl -X POST localhost:3000/bookings</div><div class="r">POST /bookings 409</div><div class="b">{"error":"Only 2 seats left"}</div>', [
    ['.r', 'The status', 'res.status(409)', ['res.status(409)', 'train.seats', 'express.json()']],
    ['.b', 'How many are left', 'train.seats', ['res.status(409)', 'train.seats', 'express.json()']],
  ]),
  step(1, 'List the trains', 'City Travel Desk needs an API for its booking app. Start with GET /trains: send every train, or only those from the station in ?from=.', S1, S2, [
    { label: 'Reads the query string', pattern: /const \{ from \} = req\.query;/ },
    { label: 'Filters by station', pattern: /TRAINS\.filter\(\(t\) => t\.from === from\)/ },
  ], 'const { from } = req.query; then res.json(from ? TRAINS.filter(…) : TRAINS).'),
  step(2, 'One train', 'Add GET /trains/:id. Answer 404 with a message for an unknown id.', S2, S3, [
    { label: 'A route parameter', pattern: /app\.get\("\/trains\/:id"/ },
    { label: 'Compares numbers', pattern: /t\.id === Number\(req\.params\.id\)/ },
    { label: 'A 404 for unknown trains', pattern: /if \(!train\) return res\.status\(404\)/ },
  ], 'TRAINS.find with Number(req.params.id); return res.status(404).json(…) if missing.'),
  step(3, 'Book seats', 'Add POST /bookings with trainId, name and seats. Check every field, refuse a full train with 409, then save and answer 201.', S3, S4, [
    { label: 'Checks the name', pattern: /name\.trim\(\)\.length < 2/ },
    { label: 'Checks seats from 1 to 6', pattern: /!Number\.isInteger\(seats\) \|\| seats < 1 \|\| seats > 6/ },
    { label: 'Refuses a full train', pattern: /res\.status\(409\)/ },
    { label: 'Answers 201', pattern: /res\.status\(201\)\.json\(booking\)/ },
  ], 'Find the train, check name and seats (400), check seats left (409), then push and 201.'),
  step(4, 'Cancel a booking', 'Add DELETE /bookings/:id. Give the seats back to the train and answer 204, or 404 if there is no such booking.', S4, S5, [
    { label: 'Finds the booking', pattern: /bookings\.findIndex\(\(b\) => b\.id === Number\(req\.params\.id\)\)/ },
    { label: 'Gives the seats back', pattern: /\.seats \+= booking\.seats/ },
    { label: 'Answers 204', pattern: /res\.sendStatus\(204\)/ },
  ], 'findIndex, 404 if -1, splice it out, add the seats back, sendStatus(204).'),
  step(5, 'Missing routes and errors', 'Finish with a 404 handler for unknown routes and an error handler that logs the problem and sends a short message.', S5, S6, [
    { label: 'A 404 for unknown routes', pattern: /app\.use\(\(req, res\) => res\.status\(404\)/ },
    { label: 'An error handler with four arguments', pattern: /app\.use\(\(err, req, res, next\) =>/ },
    { label: 'Logs the error', pattern: /console\.error\("Error: " \+ err\.message\)/ },
  ], 'After the routes: app.use((req, res) => …404…), then app.use((err, req, res, next) => …).'),
], 'project');
