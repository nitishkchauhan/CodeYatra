import type { CodeStep, EditorStep, Lesson } from './types';

export const counterState: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · REACT',
  title: 'A seat counter with state',
  instructions: 'Fill the gaps so tapping the button adds one seat to the booking.',
  lang: 'jsx',
  file: 'Counter.jsx',
  lines: [
    ['const [seats, setSeats] = ', { gap: 0 }, '(1);'],
    [''],
    ['<button onClick={() => ', { gap: 1 }, '(seats + 1)}>'],
    ['  Seats: {seats}'],
    ['</button>'],
  ],
  tokens: ['useState', 'setSeats', 'seats', 'useEffect'],
  solution: ['useState', 'setSeats'],
  run: ([hook, setter]) => {
    const checks = [
      { label: 'State is created with useState', ok: hook === 'useState' },
      { label: 'The button updates state with setSeats', ok: setter === 'setSeats' },
    ];
    const output = checks.every((c) => c.ok) ? ['Seats: 1', '(tap) Seats: 2', '(tap) Seats: 3'] : undefined;
    const error = hook !== 'useState' && hook !== 'useEffect' ? `TypeError: ${hook} is not a function` : undefined;
    return { pass: checks.every((c) => c.ok), checks, output, error };
  },
};

export const apiHandler: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · NODE.JS',
  title: 'Your first API route',
  instructions: 'handler(req) receives { method, query }. For GET with query.city, return { status: 200, body: { city, trains: 3 } }. Without a city, return { status: 400, body: { error: "city required" } }.',
  lang: 'javascript',
  file: 'api/trains.js',
  starter: 'function handler(req) {\n  const city = req.query.city;\n  // return a response object\n}\n',
  tests: [
    { call: 'handler({ method: "GET", query: { city: "Pune" } })', expect: '({ status: 200, body: { city: "Pune", trains: 3 } })' },
    { call: 'handler({ method: "GET", query: {} })', expect: '({ status: 400, body: { error: "city required" } })' },
  ],
  hint: 'if (!city) return { status: 400, body: { error: "city required" } };',
  solution:
    'function handler(req) {\n  const city = req.query.city;\n  if (!city) {\n    return { status: 400, body: { error: "city required" } };\n  }\n  return { status: 200, body: { city, trains: 3 } };\n}\n',
};

export const FULLSTACK_MORE: Lesson[] = [
  {
    id: 'n-api-1',
    title: 'Your first API route',
    kind: 'lesson',
    minutes: 8,
    skill: 'react',
    learned: ['An API turns requests into responses', 'Status 200 means OK, 400 means bad request', 'Validate input before using it'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · NODE.JS',
        title: 'APIs answer requests',
        body: 'An app asks the server a question, like “trains to Pune?”. The server’s route handler reads the request and replies with a status code and data.',
        code: [{ lang: 'javascript', label: 'Node.js', lines: ['app.get("/trains", (req, res) => {', '  const city = req.query.city;', '  res.status(200).json({ city, trains: 3 });', '});'] }],
        tip: '200 = OK, 400 = you sent something wrong, 404 = not found, 500 = the server broke.',
      },
      {
        type: 'quiz',
        prompt: 'A request is missing a required city. Which status code fits?',
        options: ['400', '200', '404', '500'],
        mono: true,
        answer: 0,
        right: '400 Bad Request: the client forgot something it must send.',
        wrong: 'The server is fine and the route exists. The request is incomplete, so 400.',
      },
      apiHandler,
    ],
  },
];
