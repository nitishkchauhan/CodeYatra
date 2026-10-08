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
    id: 'r-state-1',
    title: 'State with useState',
    kind: 'lesson',
    minutes: 8,
    skill: 'react',
    learned: ['State is data that can change', 'useState returns the value and a setter', 'Calling the setter re-renders the UI'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · REACT STATE',
        title: 'State remembers things for your UI',
        body: 'useState gives you a value and a function to change it. When you call the function, React redraws the component with the new value.',
        visual: 'componentProps',
        code: [{ lang: 'jsx', label: 'React', lines: ['const [count, setCount] = useState(0);', '', '<button onClick={() => setCount(count + 1)}>', '  Tapped {count} times', '</button>'] }],
        tip: 'Never change state directly (count = 5). Always use the setter.',
      },
      {
        type: 'quiz',
        prompt: 'In const [seats, setSeats] = useState(4), what is seats at first?',
        options: ['4', '0', 'undefined', 'A function'],
        mono: true,
        answer: 0,
        right: 'The value you pass to useState is the starting state: 4.',
        wrong: 'useState(4) starts seats at 4. setSeats is the function.',
      },
      counterState,
    ],
  },
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
  {
    id: 'nx-1',
    title: 'Pages and routing',
    kind: 'lesson',
    minutes: 6,
    skill: 'react',
    learned: ['Next.js turns files into pages', 'Folders become URL paths', '[id] makes a dynamic page'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · NEXT.JS',
        title: 'In Next.js, files are routes',
        body: 'Put a page.jsx file inside app/trains and it appears at /trains. A folder named [id] matches any value, so app/trains/[id]/page.jsx serves /trains/12951.',
        code: [{ lang: 'jsx', label: 'Next.js', lines: ['// app/trains/[id]/page.jsx', 'export default function Train({ params }) {', '  return <h1>Train {params.id}</h1>;', '}'] }],
        tip: 'CodeYatra itself works this way: every screen is a file.',
      },
      {
        type: 'quiz',
        prompt: 'Which file serves the URL /stations/pune?',
        options: ['app/stations/[name]/page.jsx', 'app/pune.jsx', 'pages/stations.html', 'app/page.jsx'],
        mono: true,
        answer: 0,
        right: 'stations is a folder, [name] matches "pune", and page.jsx renders it.',
        wrong: 'Folders map to URL parts. [name] is the dynamic part that matches "pune".',
      },
      {
        type: 'quiz',
        prompt: 'Where does Next.js put the value "pune" for you?',
        code: { lang: 'jsx', label: 'Next.js', lines: ['export default function Station({ params }) {', '  return <h1>{params.name}</h1>;', '}'] },
        options: ['params.name', 'props.url', 'window.pune', 'req.body'],
        mono: true,
        answer: 0,
        right: 'The folder was [name], so the value arrives as params.name.',
        wrong: 'Dynamic segments arrive in params, named after the folder: params.name.',
      },
    ],
  },
];
