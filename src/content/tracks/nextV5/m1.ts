// Next.js · Module 1 · Fundamentals of Next.js: what it is, its features, the project structure and the App Router,
// the development workflow, and styling. Lesson 1.1 keeps the old module id (nx-1).
import type { Lesson } from '../../types';
import { CAFE, CAFE_LAYOUT } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const HOURS_ROUTE = ['export function GET() {', '  return Response.json({ open: "8 am", close: "9 pm" });', '}'];

const TREE = [
  'rosas-cafe/',
  '├─ app/',
  '│  ├─ layout.js       ← wraps every page',
  '│  ├─ page.js         ← the page at /',
  '│  ├─ globals.css',
  '│  └─ menu/',
  '│     └─ page.js      ← the page at /menu',
  '├─ public/',
  '│  └─ logo.png        ← served at /logo.png',
  '├─ next.config.js',
  '├─ package.json',
  '└─ .env.local         ← secrets, never committed',
];

const GLOBALS = ['body { background: #FFF8F0; }', 'h1 { color: #9A3412; }'];
const MODULE_CSS = ['.price { color: #15803D; font-weight: bold; }', '.note { color: #5B6B70; font-size: 14px; }'];
const STYLED_PAGE = [
  'import styles from "./page.module.css";',
  '',
  'export default function Menu() {',
  '  return (',
  '    <>',
  '      <h1>Our menu</h1>',
  '      <p className={styles.price}>Lemon Tea · ₹40</p>',
  '      <p className={styles.note}>Made fresh every morning</p>',
  '    </>',
  '  );',
  '}',
];
const STYLED = { ...CAFE, 'app/layout.js': ['import "./globals.css";', ...CAFE_LAYOUT], 'app/globals.css': GLOBALS, 'app/menu/page.module.css': MODULE_CSS, 'app/menu/page.js': STYLED_PAGE };

export const NX_M1: Lesson[] = [
  lesson('nx-1', 'What is Next.js?', 6, [
    chat(['Next.js is a framework built on React. React draws the parts of a screen; Next.js adds what a whole website needs.', 'Pages with their own addresses, code that runs on a server, ways to load data fast, and ready-made tools for images and search engines.']),
    reveal('What Next.js adds to React', [
      ['Pages and URLs', 'Make a folder with a page.js and it becomes an address, like /menu.', '🗂'],
      ['A server', 'Code can run on the server, close to the data, before the page reaches the phone.', '🖥'],
      ['APIs', 'The same project can answer requests, like a small back end.', '🔌'],
      ['Fast by default', 'Pages can be made ahead of time, and images and fonts are optimised.', '⚡'],
    ]),
    tapPage('A real Next.js site, on your phone', 'This is Rosa’s Café, built with Next.js. Type /menu in the address bar and go.', app(CAFE), 'GET /menu 200', go('/menu'), 'The line “GET /menu 200” is what the Next.js server prints: it got a request for /menu and answered 200 (OK).'),
    check('What is Next.js?', ['A React framework for building full websites', 'A replacement for JavaScript', 'A database', 'A phone app builder only'], 'It is React plus routing, a server, data loading and more.', 'Think of what it adds to React.'),
    truth([
      ['You still write React components in Next.js', true, 'Pages and layouts are React components.'],
      ['Next.js only works for tiny sites', false, 'Shops, dashboards and news sites use it.'],
      ['Next.js can run code on a server', true, 'Server Components and Route Handlers run there.'],
    ]),
    recap([
      ['▲', 'Next.js is a React framework for whole websites'],
      ['🗂', 'Folders become pages with their own URLs'],
      ['🖥', 'It runs code on the server as well as in the browser'],
    ]),
  ]),

  lesson('nx-b-1-2', 'Next.js features at a glance', 6, [
    reveal('Five features you will use', [
      ['Routing', 'Folders in app/ become URLs. No list of routes to keep up to date.', '🧭'],
      ['Rendering', 'Pages can be made on the server for each visit, or ahead of time and reused.', '🖥'],
      ['Route Handlers', 'A route.js file answers requests with data, like /api/hours.', '🔌'],
      ['Images and fonts', 'next/image and next/font make them small and quick to load.', '🖼'],
      ['SEO', 'Titles and descriptions for search engines, with metadata.', '🔍'],
    ]),
    tapPage('An API in the same project', 'The café’s app also answers /api/hours with data. Open /api/hours in the address bar.', app({ ...CAFE, 'app/api/hours/route.js': HOURS_ROUTE }), 'GET /api/hours 200', go('/api/hours'), 'A browser shows the JSON the route sends back. A phone app could use it too.'),
    explore('The route that answered', HOURS_ROUTE, [
      [1, 'route.js exports a function named after the HTTP method: GET.'],
      [2, 'It sends back JSON. Module 5 is all about this.'],
    ]),
    matchUp('Which feature does it?', [['app/menu/page.js', 'Routing'], ['app/api/hours/route.js', 'Route Handlers'], ['next/image', 'Images'], ['metadata', 'SEO']], 'Each feature has its own file or import.'),
    check('Which file answers requests with data instead of a page?', ['route.js', 'page.js', 'layout.js', 'data.html'], 'route.js is a Route Handler.', 'Pages are page.js. What answers with JSON?', { mono: true }),
    recap([
      ['🧭', 'Routing from folders'],
      ['🖥', 'Server rendering, and pages made ahead of time'],
      ['🔌', 'APIs, images, fonts and SEO built in'],
    ]),
  ]),

  lesson('nx-b-1-3', 'Project structure and the App Router', 7, [
    explore('A Next.js project', TREE, [
      [2, 'app/ holds your pages. This is the App Router.'],
      [3, 'layout.js wraps every page inside its folder.'],
      [4, 'page.js makes a folder a page you can visit.'],
      [8, 'public/ holds files served as they are, like pictures.'],
      [12, '.env.local keeps secrets. It is never committed to Git.'],
    ], { intro: 'Tap each line to see what it does.' }),
    reveal('Special file names in app/', [
      ['page.js', 'The page shown at that folder’s address.'],
      ['layout.js', 'A frame around the pages below it.'],
      ['loading.js', 'Shown while the page is still loading.'],
      ['error.js', 'Shown if something in that folder breaks.'],
      ['not-found.js', 'Shown when a page doesn’t exist.'],
      ['route.js', 'Answers requests with data, not a page.'],
    ], { mono: true }),
    tapPage('See the files behind the site', 'Tap ☰ in the address bar to list the pages, then tap app/menu/page.js to open it.', app(CAFE), 'GET /menu 200', [{ click: '#cy-files' }, { click: '#cy-filelist a[data-url="/menu"]' }], 'Each page.js is one address. The folder names make the URL.'),
    check('Which file makes the page at /about?', ['app/about/page.js', 'app/about.js', 'pages/about.html', 'app/page/about.js'], 'A folder named about, with a page.js inside.', 'Folder = URL part, page.js = the page.', { mono: true }),
    tapbug('/menu says “404”', ['app/', '  layout.js', '  page.js', '  menu/', '    Menu.js'], [[5, 'Menu.js', 'page.js']], 'Only a file named page.js makes a folder visitable. Other files in the folder stay private.'),
    chat(['There is also an older way, the Pages Router, with a pages/ folder. You will see it in older projects.', 'New projects use the App Router (app/), and so does this course.']),
    recap([
      ['📁', 'app/ is the App Router: folders become URLs'],
      ['📄', 'page.js, layout.js, loading.js, error.js, not-found.js, route.js'],
      ['🖼', 'public/ serves files as they are'],
    ]),
  ]),

  lesson('nx-b-1-4', 'The development workflow', 6, [
    reveal('From nothing to a live site', [
      ['npx create-next-app@latest', 'Makes a new project. It asks about TypeScript, ESLint, Tailwind and the App Router.', '1'],
      ['npm run dev', 'Starts the development server at http://localhost:3000. Pages update as you save.', '2'],
      ['npm run build', 'Checks and prepares the site for real visitors.', '3'],
      ['npm run start', 'Runs the built site, the way a host does.', '4'],
    ], { mono: true }),
    chat(['While “npm run dev” runs, every request is printed in the terminal, like “GET /menu 200”.', 'Save a file and the page in the browser updates straight away, keeping what you typed. This is called Fast Refresh.'], { code: ['$ npm run dev', '  ▲ Next.js 16', '  - Local: http://localhost:3000', ' ✓ Ready', ' GET / 200', ' GET /menu 200'] }),
    tapPage('Watch the server log', 'In this practice app, each request is printed below the page, like in the terminal. Tap Home in the header.', app(CAFE, '/menu'), 'GET / 200', [{ click: 'header a[href="/"]' }], 'The first line, GET /menu 200, was the page opening. The next is your tap on Home.'),
    check('Which command starts the development server?', ['npm run dev', 'npm run build', 'npm run start', 'npx create-next-app'], 'dev is for building the site on your computer.', 'Which one updates as you save?', { mono: true }),
    truth([
      ['npm run build must succeed before you put a site online', true, 'Build errors stop the deploy.'],
      ['localhost:3000 can be opened by anyone on the internet', false, 'It is only on your own computer.'],
      ['Fast Refresh updates the page when you save', true, 'Without a full reload.'],
    ]),
    recap([
      ['🧰', 'create-next-app makes a project'],
      ['🔁', 'npm run dev: a local server with Fast Refresh'],
      ['📦', 'npm run build, then npm run start, for real visitors'],
    ]),
  ]),

  lesson('nx-b-1-5', 'Styling: global CSS, CSS Modules and Tailwind', 7, [
    chat(['Next.js supports the usual ways to style a site.', 'Global CSS for the whole site, CSS Modules for one component, and Tailwind CSS, which many teams choose.']),
    toggle('Two kinds of CSS file', [
      ['globals.css', GLOBALS, 'Imported once, in the root layout. It styles every page.', app(STYLED, '/menu')],
      ['page.module.css', MODULE_CSS, 'Imported into one file. Its class names are made unique, so they never clash.', app(STYLED, '/menu')],
    ]),
    explore('Using a CSS Module', STYLED_PAGE, [
      [1, 'Import the module. styles holds its class names.'],
      [7, 'className={styles.price} uses the price class.', 'p'],
      [8, 'Each class is renamed to something unique, like page_note__cy.'],
    ], { page: app(STYLED, '/menu'), minTaps: 2 }),
    reveal('Tailwind CSS', [
      ['What it is', 'Small ready-made classes you put straight in className.'],
      ['Example', 'className="text-xl font-bold text-orange-800"'],
      ['Set-up', 'create-next-app can add it for you; the styles come from @import "tailwindcss" in globals.css.'],
      ['In this app', 'Tailwind needs a build step, so these practice pages use plain CSS.'],
    ]),
    check('Where should globals.css be imported?', ['In the root layout, app/layout.js', 'In every page', 'In next.config.js', 'In public/'], 'Once, so it applies everywhere.', 'Which file wraps every page?', { mono: false }),
    tapbug('The price class does nothing', ['import styles from "./page.module.css";', '<p className="price">Lemon Tea · ₹40</p>'], [[2, 'className="price"', 'className={styles.price}']], 'Module class names are renamed. Use them through the imported styles object.'),
    recap([
      ['🌍', 'globals.css in the root layout styles every page'],
      ['🧩', 'CSS Modules: styles.name, unique to one file'],
      ['💨', 'Tailwind: ready-made classes in className'],
    ]),
  ]),

  challenge('nx-b-1-ch', 'Module 1 Challenge', { icon: '▲', name: 'Next Starter' }, ['Explain what Next.js adds to React', 'Find your way around a project', 'Run, build and style a site'], [
    mcq(1, 'Next.js is…', ['A React framework for full websites', 'A CSS library', 'A database', 'A browser'], 'React plus routing, a server and more.'),
    mcq(2, 'Which folder holds the pages in the App Router?', ['app/', 'pages/', 'public/', 'src/routes/'], 'pages/ is the older Pages Router.', { mono: true }),
    mcq(3, 'Which file name makes a folder visitable?', ['page.js', 'index.html', 'route.js', 'layout.js'], 'route.js answers with data, not a page.', { mono: true }),
    mcq(4, 'Which command prepares the site for real visitors?', ['npm run build', 'npm run dev', 'npm test', 'npm install'], 'Then npm run start runs it.', { mono: true }),
    mcq(5, 'How do you use the price class from page.module.css?', ['className={styles.price}', 'className="price"', 'class={price}', 'style="price"'], 'Module classes are renamed.', { mono: true }),
    swipe([
      ['public/logo.png is served at /logo.png', true, 'public/ files keep their names.'],
      ['Every file in app/ becomes a page', false, 'Only page.js (and route.js for data).'],
      ['Next.js pages are React components', true, 'A page is a component.'],
      ['.env.local should be committed to Git', false, 'It holds secrets.'],
    ]),
    pairs([['page.js', 'A page'], ['layout.js', 'A frame around pages'], ['route.js', 'Data, not a page'], ['public/', 'Files as they are']], 'Special names in a Next.js project.'),
    pickCode('Which file makes the page at /contact?', ['app/contact/page.js', 'app/contact.js', 'app/page/contact.js', 'public/contact.html'], 'A folder for the URL part, and page.js inside.'),
    bugTask(['app/menu/Menu.js', 'import styles from "./page.module.css";', '<p className="price">Lemon Tea</p>'], [[1, 'Menu.js', 'page.js'], [3, 'className="price"', 'className={styles.price}']], 'Name the page file page.js, and use module classes through styles.'),
    xray('<div><header><a href="/">Home</a><a href="/menu">Menu</a></header><h1>Our menu</h1><p class="price">Lemon Tea · ₹40</p></div>', [
      ['header', 'The header on every page', 'app/layout.js', ['app/layout.js', 'app/menu/page.js', 'page.module.css']],
      ['h1', 'The menu heading', 'app/menu/page.js', ['app/layout.js', 'app/menu/page.js', 'page.module.css']],
      ['.price', 'The green price', 'page.module.css', ['app/layout.js', 'app/menu/page.js', 'page.module.css']],
    ]),
    arrange(['export default function About() {', '  return (', '    <h1>About Rosa’s Café</h1>', '  );', '}'], 'start the component, return, the heading, close the return, close the component', { ...CAFE, 'app/about/page.js': 'export default function About() {\n  return <h1>About</h1>;\n}' }, 'app/about/page.js', '/about'),
  ]),
];
