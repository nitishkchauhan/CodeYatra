import { fill } from './helpers';

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
    ['  const trains = [{ id: 12951, name: "Royal" }];'],
    ['  return Response.', { gap: 1 }, '(trains);'],
    ['}'],
  ],
  tokens: ['GET', 'json', 'get', 'send', 'POST'],
  answers: [
    { value: 'GET', check: 'The exported name is the HTTP method' },
    { value: 'json', check: 'Response.json sends JSON' },
  ],
  output: ['GET /api/trains → 200', '[{"id":12951,"name":"Royal"}]'],
});
