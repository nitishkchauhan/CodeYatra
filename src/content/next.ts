import { fill } from './helpers';
import type { Lesson } from './types';

export const rootLayout = fill({
  kicker: 'PRACTICE · NEXT.JS LAYOUTS',
  title: 'Share a navbar on every page',
  instructions: 'The root layout wraps every page. Take children as a prop and render it under the navbar.',
  lang: 'jsx',
  file: 'app/layout.jsx',
  lines: [
    ['export default function RootLayout({ ', { gap: 0 }, ' }) {'],
    ['  return ('],
    ['    <html lang="en">'],
    ['      <body>'],
    ['        <nav>CodeYatra Rail</nav>'],
    ['        {', { gap: 1 }, '}'],
    ['      </body>'],
    ['    </html>'],
    ['  );'],
    ['}'],
  ],
  tokens: ['children', 'props', 'page', 'Page'],
  answers: [
    { value: 'children', check: 'The layout receives children' },
    { value: 'children', check: 'children renders the current page' },
  ],
  output: ['/        → navbar + Home', '/trains  → navbar + Trains'],
});

export const dynamicRoute = fill({
  kicker: 'PRACTICE · DYNAMIC ROUTES',
  title: 'One page for every train',
  instructions: 'Name the folder so /trains/12951 and /trains/22436 share one page, then read the number from params.',
  lang: 'jsx',
  file: 'app/trains/[id]/page.jsx',
  lines: [
    ['// folder: app/trains/', { gap: 0 }, '/page.jsx'],
    ['export default async function Train({ params }) {'],
    ['  const { ', { gap: 1 }, ' } = await params;'],
    ['  return <h1>Train {id}</h1>;'],
    ['}'],
  ],
  tokens: ['[id]', 'id', '{id}', ':id', 'params'],
  answers: [
    { value: '[id]', check: 'Square brackets make a dynamic segment' },
    { value: 'id', check: 'params.id holds the value from the URL' },
  ],
  output: ['/trains/12951 → Train 12951', '/trains/22436 → Train 22436'],
});

export const serverData = fill({
  kicker: 'PRACTICE · SERVER COMPONENTS',
  title: 'Load data on the server',
  instructions: 'Server components can be async. Await the data before rendering it.',
  lang: 'jsx',
  file: 'app/trains/page.jsx',
  lines: [
    ['export default ', { gap: 0 }, ' function Trains() {'],
    ['  const res = ', { gap: 1 }, ' fetch("https://api.example.com/trains");'],
    ['  const trains = await res.json();'],
    ['  return <p>{trains.length} trains today</p>;'],
    ['}'],
  ],
  tokens: ['async', 'await', 'useEffect', 'then', 'static'],
  answers: [
    { value: 'async', check: 'The component is async' },
    { value: 'await', check: 'It awaits fetch on the server' },
  ],
  output: ['Rendered on the server: 24 trains today', 'No loading spinner, no client JavaScript'],
});

export const routeHandler = fill({
  kicker: 'PRACTICE · ROUTE HANDLERS',
  title: 'An API inside Next.js',
  instructions: 'Export a GET function from route.js and return JSON with Response.json.',
  lang: 'javascript',
  file: 'app/api/trains/route.js',
  lines: [
    ['export async function ', { gap: 0 }, '(request) {'],
    ['  const trains = [{ id: 12951, name: "Rajdhani" }];'],
    ['  return Response.', { gap: 1 }, '(trains);'],
    ['}'],
  ],
  tokens: ['GET', 'json', 'get', 'send', 'POST'],
  answers: [
    { value: 'GET', check: 'The exported name is the HTTP method' },
    { value: 'json', check: 'Response.json sends JSON' },
  ],
  output: ['GET /api/trains → 200', '[{"id":12951,"name":"Rajdhani"}]'],
});

export const NEXT_LESSONS: Lesson[] = [
  {
    id: 'nx-layout-1',
    title: 'Layouts',
    kind: 'lesson',
    minutes: 6,
    skill: 'next',
    learned: ['layout.jsx wraps pages in its folder', 'children is the current page', 'Layouts keep state between pages'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · NEXT.JS',
        title: 'Layouts frame your pages',
        hindi: 'Layout आपके पेजों का फ़्रेम है',
        body: 'A layout.jsx file wraps every page in its folder. Put the navbar and footer there once. Next.js passes the active page in as children.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: ['// app/layout.jsx', 'export default function RootLayout({ children }) {', '  return <body><nav />{children}</body>;', '}'],
          },
        ],
        tip: 'The root layout must render <html> and <body>.',
      },
      {
        type: 'quiz',
        prompt: 'Where does the navbar go so every page shows it?',
        options: ['app/layout.jsx', 'app/page.jsx', 'every page file', 'public/'],
        mono: true,
        answer: 0,
        right: 'The root layout wraps every route.',
        wrong: 'page.jsx is one page. The shared frame lives in layout.jsx.',
      },
      rootLayout,
    ],
  },
  {
    id: 'nx-dyn-1',
    title: 'Dynamic routes',
    kind: 'lesson',
    minutes: 6,
    skill: 'next',
    learned: ['[id] folders match any value', 'params holds the URL values', 'One file serves thousands of pages'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · DYNAMIC ROUTES',
        title: 'One file, many URLs',
        hindi: 'एक फ़ाइल, कई URL',
        body: 'There are thousands of trains, but you write one page. A folder named [id] matches any value, and that value arrives in params.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: [
              '// app/trains/[id]/page.jsx',
              'export default async function Page({ params }) {',
              '  const { id } = await params;',
              '  return <h1>Train {id}</h1>;',
              '}',
            ],
          },
        ],
        tip: '[...slug] matches several segments, like /docs/a/b/c.',
      },
      {
        type: 'quiz',
        prompt: 'Which folder makes /city/pune and /city/goa work?',
        options: ['app/city/[name]', 'app/city/name', 'app/[city]/name', 'app/city/:name'],
        mono: true,
        answer: 0,
        right: '[name] is the dynamic part after /city/.',
        wrong: 'Dynamic segments use square brackets: app/city/[name].',
      },
      dynamicRoute,
    ],
  },
  {
    id: 'nx-data-1',
    title: 'Server components',
    kind: 'lesson',
    minutes: 7,
    skill: 'next',
    learned: ['Components run on the server by default', 'They can await data directly', '"use client" opts into the browser'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · SERVER COMPONENTS',
        title: 'Fetch where the data lives',
        hindi: 'डेटा वहीं लाओ जहाँ वो है',
        body: 'In the app folder, components run on the server unless you write "use client". Server components can be async and await data, and the HTML arrives ready, which is fast on slow networks.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: ['export default async function Page() {', '  const data = await getTrains();', '  return <List items={data} />;', '}'],
          },
        ],
        tip: 'Need useState or onClick? Put "use client" at the top of that file.',
      },
      {
        type: 'quiz',
        prompt: 'A component uses useState. What does its file need?',
        options: ['"use client"', '"use server"', 'async', 'Nothing'],
        mono: true,
        answer: 0,
        right: 'Hooks and event handlers run in the browser, so mark it "use client".',
        wrong: 'State lives in the browser: add "use client".',
      },
      serverData,
    ],
  },
  {
    id: 'nx-api-1',
    title: 'Route handlers',
    kind: 'lesson',
    minutes: 6,
    skill: 'next',
    learned: ['route.js files become API endpoints', 'Export a function per HTTP method', 'Response.json returns data'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · ROUTE HANDLERS',
        title: 'Your backend lives in the same project',
        hindi: 'बैकएंड उसी प्रोजेक्ट में',
        body: 'A route.js file turns its folder into an API. Export functions named after HTTP methods, GET or POST, and return a Response.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['// app/api/hello/route.js', 'export async function GET() {', '  return Response.json({ msg: "Namaste" });', '}'],
          },
        ],
        tip: 'A folder can have a page.jsx or a route.js, not both.',
      },
      {
        type: 'quiz',
        prompt: 'Which export handles a form that creates a booking?',
        options: ['POST', 'GET', 'default', 'CREATE'],
        mono: true,
        answer: 0,
        right: 'POST creates. The function name is the method.',
        wrong: 'Route handlers are named after HTTP methods. Creating is POST.',
      },
      routeHandler,
    ],
  },
];
