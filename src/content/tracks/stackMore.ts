// Extra modules for React, Node.js and Next.js.
import { fill } from '../helpers';
import { bug, lesson, order, predict, quiz, read, tap } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const js = (kicker: string, o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker, lang: 'javascript', ...o });

export const REACT_MORE: Lesson[] = [
  lesson('r-cond-1', 'Conditional rendering', 'react', ['Use && to show something only when true', 'Use ? : to choose between two things', 'Return null to render nothing'], [
    read({
      kicker: 'READ · REACT',
      title: 'Show the right thing',
      body: 'JSX is JavaScript, so ordinary conditions decide what renders. {isFull && <Badge />} shows the badge only when isFull is true; {seats > 0 ? <Book /> : <Waitlist />} picks one of two.',
      lang: 'jsx',
      code: ['function Seats({ seats }) {', '  return seats > 0', '    ? <p>{seats} seats left</p>', '    : <p>Waitlist only</p>;', '}'],
      tip: 'Careful: {0 && <X />} renders "0". Use {count > 0 && <X />}.',
    }),
    fill({
      kicker: 'PRACTICE · REACT',
      title: 'Full or not?',
      instructions: 'Show "Sold out" when seats is 0, otherwise the Book button.',
      lang: 'jsx',
      file: 'Status.jsx',
      lines: [['function Status({ seats }) {'], ['  return seats === 0 ', { gap: 0 }, ' <p>Sold out</p>'], ['    ', { gap: 1 }, ' <button>Book</button>;'], ['}']],
      tokens: ['?', ':', '&&', '||'],
      answers: [
        { value: '?', check: '? starts the condition' },
        { value: ':', check: ': gives the other option' },
      ],
      output: ['seats = 0 → Sold out', 'seats = 4 → [Book]'],
    }),
    quiz({
      prompt: 'What does {0 && <p>Hi</p>} render?',
      options: ['The number 0', 'Nothing', '<p>Hi</p>', 'An error'],
      right: '0 is falsy, so && returns 0, and React renders numbers.',
      wrong: '&& returns its left side when it is falsy, and React prints 0. Use count > 0 && …',
    }),
  ]),

  lesson('r-children-1', 'Composition with children', 'react', ['children is whatever you put between tags', 'Wrapper components add shared layout', 'Compose small pieces into bigger ones'], [
    read({
      kicker: 'READ · REACT',
      title: 'Components inside components',
      body: 'Whatever you put between <Card> and </Card> arrives as the children prop. That lets one Card component frame any content.',
      lang: 'jsx',
      code: ['function Card({ children }) {', '  return <div className="card">{children}</div>;', '}', '', '<Card>', '  <h2>Rajdhani</h2>', '</Card>'],
      tip: 'Prefer composition over long lists of props.',
    }),
    tap({
      kicker: 'PRACTICE · REACT',
      title: 'Where content goes',
      instructions: 'Tap the prop that holds what is placed between the tags.',
      lang: 'jsx',
      lines: ['function Panel({ title, children }) {', '  return <section><h2>{title}</h2>{children}</section>;', '}'],
      target: { line: 0, token: 'children' },
      explain: 'children is filled automatically from the content between <Panel> tags.',
    }),
    order({
      kicker: 'PRACTICE · REACT',
      title: 'Build a wrapper',
      instructions: 'Arrange a Card that wraps whatever it is given.',
      lang: 'jsx',
      lines: ['function Card({ children }) {', '  return (', '    <div className="card">', '      {children}', '    </div>', '  );', '}'],
      explain: 'Render {children} inside the wrapper element.',
    }),
  ]),

  lesson('r-lift-1', 'Lifting state up', 'react', ['Shared state lives in the closest common parent', 'Pass values down as props', 'Pass setters down so children can change it'], [
    read({
      kicker: 'READ · REACT',
      title: 'One source of truth',
      body: 'When two components need the same data, move the state to their parent. The parent passes the value to one child and a setter function to another.',
      lang: 'jsx',
      code: ['function Booking() {', '  const [seats, setSeats] = useState(1);', '  return (', '    <>', '      <SeatPicker value={seats} onChange={setSeats} />', '      <Price seats={seats} />', '    </>', '  );', '}'],
      tip: 'If two components disagree about data, it is usually in two places.',
    }),
    quiz({
      prompt: 'SeatPicker and Price both need the seat count. Where should the state live?',
      options: ['In their shared parent', 'In SeatPicker', 'In Price', 'In both'],
      right: 'The closest common parent owns it and passes it down.',
      wrong: 'Duplicating state lets the two drift apart. Put it in the shared parent.',
    }),
    bug({
      kicker: 'PRACTICE · REACT',
      title: 'Price never updates',
      instructions: 'Changing seats does not change the price. Which line is the bug?',
      lang: 'jsx',
      lines: ['function Booking() {', '  const [seats, setSeats] = useState(1);', '  return (', '    <>', '      <SeatPicker value={seats} onChange={setSeats} />', '      <Price seats={1} />', '    </>', '  );', '}'],
      bug: 5,
      fix: '      <Price seats={seats} />',
      explain: 'Price must receive the state value, not a fixed 1.',
    }),
  ]),

  lesson('r-hooks-1', 'Custom hooks', 'react', ['A custom hook is a function starting with use', 'It reuses stateful logic', 'Each component gets its own copy of the state'], [
    read({
      kicker: 'READ · REACT',
      title: 'Reuse logic, not markup',
      body: 'If two components repeat the same useState and useEffect code, move it into a function named useSomething. Components call it like any hook.',
      lang: 'jsx',
      code: ['function useCounter(start = 0) {', '  const [n, setN] = useState(start);', '  const add = () => setN((x) => x + 1);', '  return [n, add];', '}'],
      tip: 'Hooks must be called at the top level, never inside if or loops.',
    }),
    bug({
      kicker: 'PRACTICE · REACT',
      title: 'Hook in a condition',
      instructions: 'React warns that hooks are called in a different order. Which line breaks the rule?',
      lang: 'jsx',
      lines: ['function Profile({ loggedIn }) {', '  if (loggedIn) {', '    const [name, setName] = useState("");', '  }', '  return <p>Profile</p>;', '}'],
      bug: 2,
      fix: '  const [name, setName] = useState("");  // move above the if',
      explain: 'Hooks must run in the same order every render, so never put them inside if.',
    }),
    quiz({
      prompt: 'What must a custom hook\'s name start with?',
      options: ['use', 'hook', 'get', 'with'],
      mono: true,
      right: 'React and its lint rules recognise hooks by the use prefix.',
      wrong: 'Custom hooks are named useSomething, like useState.',
    }),
  ]),

  lesson('r-context-1', 'Context', 'react', ['Context shares data without passing props through every level', 'Provider supplies the value', 'useContext reads it anywhere below'], [
    read({
      kicker: 'READ · REACT',
      title: 'Skip the prop chain',
      body: 'Theme, language or the logged-in user are needed everywhere. Instead of passing them through ten components, put them in a Context. Any component inside the Provider can read them with useContext.',
      lang: 'jsx',
      code: ['const ThemeContext = createContext("light");', '', '<ThemeContext.Provider value="dark">', '  <App />', '</ThemeContext.Provider>', '', 'const theme = useContext(ThemeContext);'],
      tip: 'Use context for truly global data; props are clearer for the rest.',
    }),
    fill({
      kicker: 'PRACTICE · REACT',
      title: 'Read the user',
      instructions: 'Read the current user from UserContext inside Navbar.',
      lang: 'jsx',
      file: 'Navbar.jsx',
      lines: [['function Navbar() {'], ['  const user = ', { gap: 0 }, '(', { gap: 1 }, ');'], ['  return <p>Hi {user.name}</p>;'], ['}']],
      tokens: ['useContext', 'UserContext', 'useState', 'createContext'],
      answers: [
        { value: 'useContext', check: 'useContext reads a context' },
        { value: 'UserContext', check: 'Pass the context object itself' },
      ],
      output: ['Hi Asha'],
    }),
    quiz({
      prompt: 'Which component makes a context value available to its children?',
      options: ['The Provider', 'The Consumer', 'useState', 'The root div'],
      right: 'Everything inside <XContext.Provider value={…}> can read the value.',
      wrong: 'A Provider wraps the tree and supplies the value.',
    }),
  ]),
];

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
