import { fill } from './helpers';
import type { EditorStep } from './types';

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
    ['  res.', { gap: 1 }, '([{ name: "Royal" }]);'],
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
  output: ['Listening on http://localhost:3000', 'GET /trains → 200 [{"name":"Royal"}]'],
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
