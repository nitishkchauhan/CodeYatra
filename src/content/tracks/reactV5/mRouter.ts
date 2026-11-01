// React · Setting up an app, and routing (Intermediate, before the final project): Vite, createRoot and StrictMode;
// React Router (bundled in lesson pages; BrowserRouter starts at "/" there, since a lesson page has no address bar);
// lazy loading with Suspense, and portals.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const MAIN = `import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [visits, setVisits] = useState(1);
  function hello() {
    setVisits(visits + 1);
    console.log("Hello again, visit " + (visits + 1));
  }
  return (
    <div className="card">
      <h3>Rosa’s Café</h3>
      <button id="hi" onClick={hello}>Say hello</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

const ROUTER = [
  'import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from "react-router";',
  '',
  'const DISHES = { tea: "Lemon Tea · ₹40", toast: "Cheese Toast · ₹80" };',
  '',
  'function Home() {',
  '  return <p>Welcome! Pick a dish from the menu.</p>;',
  '}',
  '',
  'function Menu() {',
  '  return (',
  '    <ul>',
  '      <li><Link id="tea" to="/menu/tea">Lemon Tea</Link></li>',
  '      <li><Link id="toast" to="/menu/toast">Cheese Toast</Link></li>',
  '    </ul>',
  '  );',
  '}',
  '',
  'function Dish() {',
  '  const { id } = useParams();',
  '  return <p className="ok">{DISHES[id] ?? "No such dish"}</p>;',
  '}',
  '',
  'function Address() {',
  '  const location = useLocation();',
  '  console.log("Address: " + location.pathname);',
  '  return <p className="muted">Address: {location.pathname}</p>;',
  '}',
  '',
  'function App() {',
  '  return (',
  '    <BrowserRouter>',
  '      <nav className="card">',
  '        <Link id="home" to="/">Home</Link> · <Link id="menu" to="/menu">Menu</Link>',
  '      </nav>',
  '      <Address />',
  '      <Routes>',
  '        <Route path="/" element={<Home />} />',
  '        <Route path="/menu" element={<Menu />} />',
  '        <Route path="/menu/:id" element={<Dish />} />',
  '        <Route path="*" element={<p>Page not found</p>} />',
  '      </Routes>',
  '    </BrowserRouter>',
  '  );',
  '}',
];

const LAZY = `import { lazy, Suspense, useState } from "react";

// In a real app: lazy(() => import("./Reviews.jsx")). Here a short wait stands in for loading that file.
const Reviews = lazy(() => new Promise((done) => setTimeout(() => done({ default: ReviewList }), 600)));

function ReviewList() {
  console.log("Reviews loaded");
  return (
    <ul>
      <li>“Best toast in town”</li>
      <li>“Lovely lemon tea”</li>
    </ul>
  );
}

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="card">
      <button id="show" onClick={() => setShow(true)}>Show reviews</button>
      {show && (
        <Suspense fallback={<p className="muted">Loading reviews…</p>}>
          <Reviews />
        </Suspense>
      )}
    </div>
  );
}`;

const PORTAL = `import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Popup({ onClose }) {
  return createPortal(
    <div id="popup" className="card" style={{ position: "fixed", top: 20, left: 20, right: 20, background: "white" }}>
      <h3>Order placed</h3>
      <button id="close" onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) console.log("Popup is inside: " + document.getElementById("popup").parentElement.tagName);
  }, [open]);
  return (
    <div className="card" style={{ overflow: "hidden", height: 80 }}>
      <button id="place" onClick={() => setOpen(true)}>Place order</button>
      {open && <Popup onClose={() => setOpen(false)} />}
    </div>
  );
}`;

export const R_ROUTER: Lesson[] = [
  lesson('r-router-1', 'Setting up a React app', 6, [
    chat(['So far each page here was ready made. On your own computer, a build tool sets up a React project for you.', 'Vite is a popular one: it makes the project, runs it while you work, and builds it for the web.']),
    reveal('Start a project with Vite', [
      ['npm create vite@latest cafe -- --template react', 'Make a new React project in a folder called cafe.'],
      ['npm install', 'Download React and the tools it needs.'],
      ['npm run dev', 'Run it at a local address. The page updates as you save.'],
      ['npm run build', 'Make small, fast files to put online.'],
    ], { mono: true }),
    reveal('What is inside', [
      ['index.html', 'The one page, with <div id="root">.'],
      ['src/main.jsx', 'Finds #root and draws <App /> in it.'],
      ['src/App.jsx', 'Your first component.'],
      ['package.json', 'The project’s name, its scripts and the packages it uses.'],
    ], { mono: true }),
    tapPage('main.jsx, live', 'Tap “Say hello”.', app(MAIN), 'Hello again, visit 2', [{ click: '#hi' }], 'createRoot finds #root, and render draws App inside it.'),
    check('What does createRoot(document.getElementById("root")).render(<App />) do?', ['Draws App inside the #root element', 'Creates a new HTML file', 'Starts the dev server', 'Installs React'], 'It is how every React web app starts.', 'Look at what it is given.', { mono: false }),
    truth([
      ['StrictMode runs extra checks while you develop', true, 'It draws twice and runs effects twice to find bugs, but not in the built app.'],
      ['StrictMode changes how the built app looks', false, 'It only adds checks while developing.'],
      ['npm run dev updates the page as you save', true, 'So you see changes at once.'],
    ]),
    recap([
      ['⚡', 'Vite makes and runs React projects'],
      ['🌱', 'createRoot(…).render(<App />) starts the app'],
      ['🛡', 'StrictMode finds bugs while you develop'],
    ]),
  ], 'intermediate'),

  lesson('r-i-r-2', 'Pages with React Router', 6, [
    chat(['Most apps have several screens: home, the menu, one dish. Each has its own address, like /menu/tea.', 'React Router (npm install react-router) picks the component for the address, and Link changes the address without reloading.']),
    tapPage('A café app with pages', 'Open the Menu, then Cheese Toast.', app(ROUTER.join('\n')), 'Address: /menu/toast', [{ click: '#menu' }, { click: '#toast' }], 'The page never reloads: React Router swaps the component for the new address.'),
    explore('The parts of a router', ROUTER, [
      [31, 'BrowserRouter wraps the whole app and watches the address.'],
      [33, 'Link changes the address without reloading.', '#menu'],
      [36, 'Routes shows the first Route whose path matches.'],
      [39, ':id matches any word, like tea or toast.'],
      [19, 'useParams reads it back.'],
    ], { page: app(ROUTER.join('\n')), minTaps: 3 }),
    matchUp('React Router pieces', [['<BrowserRouter>', 'Wraps the whole app'], ['<Route path element>', 'Which component for which address'], ['<Link to>', 'Go somewhere without reloading'], ['useParams()', 'Read :id from the address']], 'Four pieces make most apps.'),
    check('The address is /menu/tea and the route is /menu/:id. What does useParams() give?', ['{ id: "tea" }', '{ menu: "tea" }', '"tea"', '{ path: "/menu/tea" }'], 'An object, named after :id.', 'What is after the colon?', { mono: true }),
    tapbug('Tapping Menu reloads the whole page', ['<a href="/menu">Menu</a>'], [[1, '<a href="/menu">Menu</a>', '<Link to="/menu">Menu</Link>']], 'An <a> asks the server for a new page. Link changes the address inside the app.'),
    recap([
      ['🧭', 'Each screen has its own address'],
      ['🗺', 'Routes and Route pick the component'],
      ['🔗', 'Link moves without reloading'],
    ]),
  ], 'intermediate'),

  lesson('r-i-r-3', 'Loading later, and portals', 6, [
    reveal('Load parts only when needed', [
      ['lazy(() => import("./Reviews.jsx"))', 'Load a component’s file the first time it is shown.'],
      ['<Suspense fallback={…}>', 'What to show while it loads.'],
      ['Why?', 'The first screen loads faster; rarely used parts wait.'],
    ], { mono: true }),
    tapPage('Reviews, loaded when asked', 'Tap “Show reviews”.', app(LAZY), 'Reviews loaded', [{ click: '#show' }], 'Suspense showed the fallback until Reviews was ready.'),
    check('What does Suspense show while a lazy component loads?', ['Its fallback', 'Nothing at all', 'An error', 'The previous screen'], 'Like “Loading reviews…”.', 'Look at its prop.', { mono: false }),
    chat(['A pop-up must sit above everything, but the component that opens it may be inside a small card that hides anything outside it.', 'createPortal draws a component somewhere else on the page, like straight inside <body>, while it still belongs to its parent.']),
    tapPage('A pop-up in a portal', 'Place the order.', app(PORTAL), 'Popup is inside: BODY', [{ click: '#place' }], 'The pop-up is written in App but drawn in <body>, so the small card can’t clip it.'),
    truth([
      ['A portal changes where something is drawn, not who owns it', true, 'Its state and events still belong to its parent.'],
      ['lazy loads a component every time it is shown', false, 'Only the first time.'],
      ['A lazy component needs a Suspense above it', true, 'To show something while it loads.'],
    ]),
    recap([
      ['💤', 'lazy loads a part the first time it is needed'],
      ['⏳', 'Suspense shows a fallback meanwhile'],
      ['🪟', 'createPortal draws a pop-up in <body>'],
    ]),
  ], 'intermediate'),

  challenge('r-i-r-ch', 'App Setup Challenge', { icon: '🧭', name: 'App Builder' }, ['Set up and start a React app', 'Add pages with React Router', 'Load parts later, and use portals'], [
    mcq(1, 'Which command makes a new React project with Vite?', ['npm create vite@latest', 'npm start react', 'react new app', 'npm run build'], 'Then pick the React template.', { mono: true }),
    mcq(2, 'What does createRoot(…).render(<App />) do?', ['Draws App inside an element on the page', 'Builds the app for the web', 'Starts a server', 'Installs packages'], 'It starts the app in #root.'),
    mcq(3, 'Which changes the address without reloading?', ['<Link to="/menu">', '<a href="/menu">', '<Route to="/menu">', '<Go path="/menu">'], 'Link, from React Router.', { mono: true }),
    mcq(4, 'Route path="/menu/:id", address /menu/toast. What is id?', ['"toast"', '"menu"', '"/menu/toast"', 'undefined'], 'useParams() gives { id: "toast" }.', { mono: true }),
    mcq(5, 'What does Suspense need while a lazy part loads?', ['A fallback to show', 'A key', 'A timer', 'A portal'], 'fallback={…}.'),
    swipe([
      ['StrictMode adds extra checks only while developing', true, 'Not in the built app.'],
      ['<a href> is the best way to move between pages with React Router', false, 'It reloads. Use Link.'],
      ['A portal can draw a pop-up inside <body>', true, 'createPortal(…, document.body).'],
      ['lazy makes every component load sooner', false, 'It waits until the part is needed.'],
    ]),
    pairs([['npm run dev', 'Run while you work'], ['<Routes>', 'Pick a screen'], ['useParams()', 'Read the address'], ['createPortal', 'Draw somewhere else']], 'Setting up and routing.'),
    pickCode('Which shows Dish for addresses like /menu/tea?', ['<Route path="/menu/:id" element={<Dish />} />', '<Route path="/menu/id" element={Dish} />', '<Link path="/menu/:id"><Dish /></Link>', '<Route to="/menu/:id" component={Dish} />'], 'path with :id, and element as JSX.'),
    bugTask(['<a href="/menu">Menu</a>', '<Route path="/menu" element={Menu} />', '<Reviews /> {/* a lazy component */}'], [[1, '<a href="/menu">Menu</a>', '<Link to="/menu">Menu</Link>'], [2, 'element={Menu}', 'element={<Menu />}'], [3, '<Reviews />', '<Suspense fallback={<p>Loading…</p>}><Reviews /></Suspense>']], 'Use Link, give element JSX, and wrap lazy parts in Suspense.'),
    xray('<div><nav class="card"><a href="/">Home</a> · <a href="/menu">Menu</a></nav><p class="muted">Address: /menu/toast</p><p class="ok">Cheese Toast · ₹80</p></div>', [
      ['nav a', 'A link', '<Link to="/">', ['<Link to="/">', 'useLocation()', 'useParams()']],
      ['.muted', 'The address', 'useLocation()', ['<Link to="/">', 'useLocation()', 'useParams()']],
      ['.ok', 'The dish', 'useParams()', ['<Link to="/">', 'useLocation()', 'useParams()']],
    ]),
    arrange(['import { BrowserRouter, Routes, Route } from "react-router";', 'const App = () => (', '  <BrowserRouter>', '    <Routes>', '      <Route path="/" element={<p className="card">Welcome to Rosa’s Café</p>} />', '    </Routes>', '  </BrowserRouter>', ');'], 'import, start App, the router, the routes, one route, then close each'),
  ], { level: 'intermediate' }),
];
