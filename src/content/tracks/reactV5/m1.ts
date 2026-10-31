// React · Module 1 · Components and JSX. Lesson 1.1 keeps the old module id (r-comp-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const CARD = ['function MenuCard() {', '  return (', '    <div className="card">', '      <h3>Lemon Tea</h3>', '      <p>₹40 · Fresh lemon and mint</p>', '    </div>', '  );', '}', '', 'function App() {', '  return <MenuCard />;', '}'];
const card = (n: number) => [...CARD.slice(0, 9), 'function App() {', '  return (', '    <div>', ...Array.from({ length: n }, () => '      <MenuCard />'), '    </div>', '  );', '}'];

const PAGE = [
  'function Header() {',
  '  return <header className="card"><strong>Rosa’s Café</strong></header>;',
  '}',
  'function Menu() {',
  '  return (',
  '    <main>',
  '      <div className="card"><h3>Lemon Tea</h3><p>₹40</p></div>',
  '      <div className="card"><h3>Cheese Toast</h3><p>₹80</p></div>',
  '    </main>',
  '  );',
  '}',
  'function Footer() {',
  '  return <footer className="muted">Open 8 am to 10 pm</footer>;',
  '}',
  'function App() {',
  '  return (',
  '    <>',
  '      <Header />',
  '      <Menu />',
  '      <Footer />',
  '    </>',
  '  );',
  '}',
];

const jsxView = (label: string, body: string, caption: string): [string, string[], string, ReturnType<typeof app>] => {
  const code = ['function App() {', '  const price = 40;', '  const cups = 3;', `  return ${body};`, '}'];
  return [label, code, caption, app(code.join('\n'))];
};

export const R_M1: Lesson[] = [
  lesson('r-comp-1', 'What is React? Your first component', 5, [
    chat(['React is a JavaScript library for building screens out of small, reusable pieces called components.', 'A menu card, a cart button and a price tag can each be a component. Build it once, use it everywhere.']),
    reveal('Where React is used', [
      ['Web apps', 'Shops, dashboards and social apps are built from React components.', '🌐'],
      ['Phone apps', 'React Native uses the same ideas for Android and iPhone apps, including this one.', '📱'],
      ['Teams', 'Each component can be built and tested on its own.', '🧩'],
      ['Older code', 'Old projects may use class components. Today, components are plain functions.', '🕰'],
    ]),
    explore('Your first component', CARD, [
      [1, 'A component is a function whose name starts with a capital letter.'],
      [3, 'It returns JSX: HTML-like code that describes what to show.', '.card'],
      [4, 'Text inside the tags appears on the page.', 'h3'],
      [11, 'Use it like a tag: <MenuCard />. React draws it in the page.'],
    ], { page: app(CARD.join('\n')), minTaps: 3 }),
    toggle('Write once, use many times', [
      ['Once', card(1), 'The App uses MenuCard once.', app(card(1).join('\n'))],
      ['Three times', card(3), 'The same component, three times. Change it in one place and all three change.', app(card(3).join('\n'))],
    ]),
    check('What does a React component return?', ['JSX: a description of what to show', 'A number', 'A CSS file', 'Nothing'], 'React turns the JSX into real elements on the page.', 'Look at the return line.'),
    tapbug('Nothing appears for <menuCard />', ['function menuCard() {', '  return <h3>Lemon Tea</h3>;', '}'], [[1, 'menuCard', 'MenuCard']], 'Component names start with a capital letter. Small letters mean a plain HTML tag.'),
    recap([
      ['🧩', 'A component is a function that returns JSX'],
      ['🔠', 'Its name starts with a capital letter'],
      ['♻️', 'Use it like a tag, as often as you like'],
    ]),
  ]),

  lesson('r-b-1-2', 'JSX rules', 5, [
    reveal('JSX rules', [
      ['One parent', 'Return one element. Wrap neighbours in a <div>, or a fragment <>…</>.'],
      ['className', 'class is a JavaScript word, so JSX uses className.'],
      ['{ }', 'Curly braces put JavaScript inside JSX: {price * cups}.'],
      ['Close every tag', '<img /> and <br /> need the slash.'],
      ['style={{ … }}', 'Inline styles are an object, with camelCase names like fontSize.'],
    ], { mono: true }),
    toggle('JavaScript inside JSX', [
      jsxView('Plain text', '<p>Price: price</p>', 'Without braces, it is just the word “price”.'),
      jsxView('{ } value', '<p>Price: ₹{price}</p>', 'Braces show the value of price.'),
      jsxView('{ } maths', '<p>3 teas: ₹{price * cups}</p>', 'Any JavaScript expression works inside braces.'),
      jsxView('style object', '<p style={{ color: "teal", fontSize: 24 }}>₹{price}</p>', 'The outer braces mean JavaScript; the inner ones are the object.'),
    ]),
    check('Which is correct JSX?', ['<div className="card">', '<div class="card">', '<div classname=card>', '<div style="card">'], 'className, with quotes around the text.', 'class is a JavaScript word.', { mono: true }),
    tapbug('Adjacent JSX elements must be wrapped', ['return <h3>Tea</h3><p>₹40</p>;'], [[1, '<h3>Tea</h3><p>₹40</p>', '<><h3>Tea</h3><p>₹40</p></>']], 'A component returns one element. A fragment groups them without adding a box.'),
    truth([
      ['JSX is exactly the same as HTML', false, 'It looks like HTML, but uses className, { } and closed tags.'],
      ['{ } runs a JavaScript expression', true, 'Like {price * 2}.'],
      ['A fragment <>…</> adds no extra element to the page', true, 'It only groups.'],
    ]),
    recap([
      ['1️⃣', 'Return one parent (or a fragment)'],
      ['🏷', 'className instead of class'],
      ['{ }', 'Braces put JavaScript in JSX'],
    ]),
  ]),

  lesson('r-b-1-3', 'A page from small components', 5, [
    chat(['Real pages are trees of components: App holds a Header, a Menu and a Footer, and the Menu holds the dishes.', 'Each piece stays small and easy to understand.']),
    explore('A page made of parts', PAGE, [
      [15, 'App is the top of the tree.'],
      [18, 'Header draws the top bar.', 'header'],
      [19, 'Menu draws the dishes.', 'main'],
      [20, 'Footer draws the opening hours.', 'footer'],
    ], { page: app(PAGE.join('\n')), minTaps: 3 }),
    matchUp('Who draws what?', [['App', 'The whole page'], ['Header', 'The top bar'], ['Menu', 'The list of dishes'], ['Footer', 'The opening hours']], 'Each component has one job.'),
    check('Why split a page into components?', ['Each part is small, reusable and easy to change', 'React needs exactly three', 'It makes the page slower', 'To avoid writing HTML'], 'Small parts are easier to read, test and reuse.', 'Think about changing one part.'),
    tapbug('MenuItem is not defined', ['function Menu() {', '  return <MenuItem />;', '}', 'function Menuitem() {'], [[4, 'Menuitem', 'MenuItem']], 'The name must match exactly, capitals included.'),
    recap([
      ['🌳', 'A page is a tree of components'],
      ['🎯', 'One job per component'],
      ['🔁', 'Small parts, used together'],
    ]),
  ]),

  challenge('r-b-1-ch', 'Module 1 Challenge', { icon: '🧩', name: 'Component Maker' }, ['Write components that return JSX', 'Follow the rules of JSX', 'Build a page from small components'], [
    mcq(1, 'What is a React component?', ['A function that returns what to show', 'A CSS rule', 'A database', 'An HTML file'], 'A function that returns JSX.'),
    mcq(2, 'Component names must start with…', ['A capital letter', 'A number', 'The word use', 'A small letter'], 'MenuCard, not menuCard.'),
    mcq(3, 'Which sets a CSS class in JSX?', ['className', 'class', 'cssClass', 'styleClass'], 'className.', { mono: true }),
    mcq(4, 'What do curly braces { } do in JSX?', ['Put JavaScript inside', 'Make a comment', 'Close a tag', 'Add CSS'], '{price * 2}.'),
    mcq(5, 'Which wraps two elements without adding a box?', ['<>…</>', '<wrap>…</wrap>', '[…]', '(…)'], 'A fragment.', { mono: true }),
    swipe([
      ['JSX is plain HTML', false, 'It is JavaScript that looks like HTML.'],
      ['A component can be used many times', true, 'That is the point.'],
      ['In JSX, <img> must be written <img />', true, 'Every tag closes.'],
      ['Components return CSS', false, 'They return JSX.'],
    ]),
    pairs([['function MenuCard()', 'Make a component'], ['<MenuCard />', 'Use it'], ['className', 'A CSS class'], ['{price}', 'A JavaScript value']], 'Component basics.'),
    pickCode('Which is a working component?', ['function Price() { return <p>₹40</p>; }', 'function Price() { <p>₹40</p> }', 'component Price = <p>₹40</p>', 'function Price() { return "<p>₹40</p>"; }'], 'A capitalised function that returns JSX (not a string).'),
    bugTask(['function menuCard() {', '  return <div class="card">Tea</div>;', '}'], [[1, 'menuCard', 'MenuCard'], [2, 'class=', 'className=']], 'Capital first letter, and className in JSX.'),
    xray('<header class="card"><strong>Rosa’s Café</strong></header><div class="card"><h3>Lemon Tea</h3><p>₹40</p></div><footer class="muted">Open 8 am to 10 pm</footer>', [
      ['header', 'The top bar', '<Header />', ['<Header />', '<MenuCard />', '<Footer />']],
      ['div.card', 'One dish', '<MenuCard />', ['<MenuCard />', '<Header />', '<Footer />']],
      ['footer', 'The opening hours', '<Footer />', ['<Footer />', '<Header />', '<MenuCard />']],
    ]),
    arrange(['function App() {', '  return (', '    <h3 className="card">Lemon Tea</h3>', '  );', '}'], 'start the function, return the JSX, then close everything'),
  ]),
];
