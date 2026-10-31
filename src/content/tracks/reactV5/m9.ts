// React · Module 9 · Composition. Lesson 9.1 keeps the old module id (r-children-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const PANEL = [
  'import { useState } from "react";',
  '',
  'function Panel({ id, title, children }) {',
  '  const [open, setOpen] = useState(false);',
  '  function flip() {',
  '    setOpen(!open);',
  '    console.log((open ? "Closed: " : "Opened: ") + title);',
  '  }',
  '  return (',
  '    <div className="card">',
  '      <button id={id} onClick={flip}>{open ? "Hide" : "Show"} {title}</button>',
  '      {open && children}',
  '    </div>',
  '  );',
  '}',
  '',
  'function App() {',
  '  return (',
  '    <div>',
  '      <Panel id="specials" title="Specials">',
  '        <p>Mango Smoothie: ₹70</p>',
  '        <p>Tomato Soup: ₹60</p>',
  '      </Panel>',
  '      <Panel id="hours" title="Opening hours">',
  '        <p>8 am to 10 pm, every day</p>',
  '      </Panel>',
  '    </div>',
  '  );',
  '}',
];

const LAYOUT = `import { useState } from "react";

function Layout({ title, children }) {
  return (
    <div>
      <header className="card"><h3>Rosa’s Café · {title}</h3></header>
      <main>{children}</main>
      <footer className="muted">Open 8 am to 10 pm</footer>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("Menu");
  function go(name) {
    setScreen(name);
    console.log("Screen: " + name);
  }
  return (
    <Layout title={screen}>
      <button id="menu" onClick={() => go("Menu")}>Menu</button>
      <button id="cart" onClick={() => go("Cart")}>Cart</button>
      {screen === "Menu" ? <p>Lemon Tea · Cheese Toast · Veg Sandwich</p> : <p>Your cart is empty</p>}
    </Layout>
  );
}`;

const SLOTS = `function Card({ title, badge, action, children }) {
  return (
    <div className="card">
      <h3>{title} {badge}</h3>
      {children}
      <div>{action}</div>
    </div>
  );
}

function App() {
  function order(dish) {
    console.log("Ordered: " + dish);
  }
  return (
    <div>
      <Card title="Lemon Tea" badge={<span className="ok">New</span>} action={<button id="tea" onClick={() => order("Lemon Tea")}>Order</button>}>
        <p className="muted">Fresh lemon, served hot</p>
      </Card>
      <Card title="Cheese Toast" action={<button id="toast" onClick={() => order("Cheese Toast")}>Order</button>}>
        <p className="muted">Two slices, with chilli flakes</p>
      </Card>
    </div>
  );
}`;

export const R_M9: Lesson[] = [
  lesson('r-children-1', 'children', 5, [
    chat(['Some components are boxes: a card, a panel, a pop-up. They don’t care what goes inside.', 'Whatever you put between <Panel> and </Panel> arrives as a prop called children.']),
    tapPage('A panel that opens', 'Open the Specials panel.', app(PANEL.join('\n')), 'Opened: Specials', [{ click: '#specials' }], 'Panel draws the button. App decides what goes inside.'),
    explore('Where children come from', PANEL, [
      [3, 'Panel takes children like any other prop.'],
      [11, 'The button is the same for every panel.', '#specials'],
      [12, 'children is drawn only when the panel is open.'],
      [20, 'Everything between <Panel> and </Panel> becomes its children.'],
    ], { page: app(PANEL.join('\n')), minTaps: 3 }),
    check('In <Card><p>Hi</p></Card>, what is children?', ['The <p>Hi</p> inside it', 'A list of every Card', 'The Card function', 'Nothing, unless you write children="…"'], 'children is what you put between the tags.', 'Look between <Card> and </Card>.', { mono: false }),
    tapbug('The panel opens, but it is empty', ['function Panel({ title }) {', '  return <div className="card">{title}</div>;', '}'], [[1, '{ title }', '{ title, children }'], [2, '{title}</div>', '{title}{children}</div>']], 'Take children from the props, then draw it.'),
    recap([
      ['📦', 'children is what goes between the tags'],
      ['🧩', 'Box components wrap any content'],
      ['✍️', 'Draw it with {children}'],
    ]),
  ], 'intermediate'),

  lesson('r-b-9-2', 'Layout components', 5, [
    reveal('Layout components', [
      ['Layout', 'Draws the parts every screen shares, like a header and a footer.'],
      ['children', 'The part that changes from screen to screen.'],
      ['Write it once', 'Change the header in one place and every screen gets it.'],
    ]),
    tapPage('One layout, two screens', 'Switch to the Cart screen.', app(LAYOUT), 'Screen: Cart', [{ click: '#cart' }], 'The header and footer stay. Only the title and the children change.'),
    check('Why wrap every screen in a Layout component?', ['The shared parts are written once', 'It makes the app faster', 'React requires it', 'To hide the footer'], 'One place for the header and footer.', 'What would you repeat without it?', { mono: false }),
    matchUp('Who does what?', [['Layout', 'The frame every screen shares'], ['children', 'What goes inside the frame'], ['title', 'A prop that changes one detail'], ['App', 'Chooses which screen to show']], 'Layout is the frame; App fills it.'),
    tapbug('The page shows the word “children”', ['function Layout({ title, children }) {', '  return <main><h3>{title}</h3>children</main>;', '}'], [[2, '</h3>children<', '</h3>{children}<']], 'Without { }, JSX shows the word as text.'),
    recap([
      ['🖼', 'A layout is a frame for every screen'],
      ['🔁', 'Shared parts are written once'],
      ['📥', 'Each screen goes in as children'],
    ]),
  ], 'intermediate'),

  lesson('r-b-9-3', 'Passing components as props', 5, [
    chat(['children is one slot. Sometimes a box needs more: a badge here, a button there.', 'A prop can hold JSX too, like badge={<span>New</span>}.']),
    tapPage('Cards with slots', 'Order a Cheese Toast.', app(SLOTS), 'Ordered: Cheese Toast', [{ click: '#toast' }], 'Card leaves gaps. App fills them with JSX.'),
    reveal('What a prop can carry', [
      ['title="Lemon Tea"', 'Text.'],
      ['price={40}', 'A number.'],
      ['onOrder={add}', 'A function.'],
      ['action={<button>Order</button>}', 'A piece of JSX.'],
    ], { mono: true }),
    check('Which puts a button in Card’s action slot?', ['<Card action={<button>Order</button>} />', '<Card action="<button>Order</button>" />', '<Card><action>Order</action></Card>', '<Card action=<button>Order</button> />'], 'JSX goes inside { }.', 'In quotes it is only text.', { mono: true }),
    truth([
      ['A prop can hold JSX', true, 'Like badge={<span>New</span>}.'],
      ['Only children can hold JSX', false, 'Any prop can.'],
      ['A badge prop that isn’t passed draws nothing', true, 'It is undefined, and undefined draws nothing.'],
    ]),
    recap([
      ['🧷', 'Any prop can hold JSX'],
      ['🕳', 'Leave slots like badge and action'],
      ['🧱', 'The parent fills them in'],
    ]),
  ], 'intermediate'),

  challenge('r-i-9-ch', 'Module 9 Challenge', { icon: '🧱', name: 'Composer' }, ['Wrap any content with children', 'Share a layout between screens', 'Pass JSX in props as slots'], [
    mcq(1, 'What is the children prop?', ['What you put between a component’s opening and closing tags', 'The components it draws', 'Its state', 'The elements below it on the page'], 'Whatever goes between the tags.'),
    mcq(2, 'Which draws children inside a card?', ['<div className="card">{children}</div>', '<div className="card">children</div>', '<div className="card">{props}</div>', '<children className="card" />'], 'In { }, so it is drawn, not shown as a word.', { mono: true }),
    mcq(3, 'Why use a Layout component?', ['To write the shared parts of every screen once', 'To keep state', 'To load data', 'To style text'], 'Header and footer in one place.'),
    mcq(4, 'What can a prop hold?', ['Text, numbers, functions and JSX', 'Only text', 'Only text and numbers', 'Only functions'], 'Any JavaScript value, JSX included.'),
    mcq(5, 'What does <Card badge={<b>New</b>} /> pass?', ['A piece of JSX in the badge prop', 'The text "<b>New</b>"', 'A new component called badge', 'Nothing: JSX can’t be a prop'], 'JSX in { } is a value like any other.', { mono: true }),
    swipe([
      ['children can be any JSX', true, 'Text, elements, other components.'],
      ['A component must use every prop it gets', false, 'Unused props are simply ignored.'],
      ['One Layout can hold many different screens', true, 'Each screen goes in as children.'],
      ['children only works with text', false, 'Any JSX works.'],
    ]),
    pairs([['{children}', 'Draw what was put inside'], ['<Layout>', 'The shared frame'], ['action={<button />}', 'JSX in a prop'], ['({ title, children })', 'Take children from props']], 'Composition.'),
    pickCode('Which Panel draws whatever is put inside it?', ['function Panel({ children }) { return <div>{children}</div>; }', 'function Panel() { return <div>{children}</div>; }', 'function Panel({ children }) { return <div>children</div>; }', 'function Panel(children) { return <div>{children.text}</div>; }'], 'Take children from the props and draw it in { }.'),
    bugTask(['function Card({ title }) {', '  return <div className="card"><h3>{title}</h3>children</div>;', '}', '<Card action="<button>Order</button>" />'], [[1, '{ title }', '{ title, children }'], [2, '</h3>children<', '</h3>{children}<'], [4, '"<button>Order</button>"', '{<button>Order</button>}']], 'Take children from the props, draw it in { }, and pass JSX in { }, not quotes.'),
    xray('<div class="card"><h3>Lemon Tea <span class="ok">New</span></h3><p class="muted">Fresh lemon, served hot</p><div><button>Order</button></div></div>', [
      ['h3', 'The title', '{title}', ['{title}', '{badge}', '{children}', '{action}']],
      ['span', 'The badge', '{badge}', ['{title}', '{badge}', '{children}', '{action}']],
      ['p', 'The text inside', '{children}', ['{title}', '{badge}', '{children}', '{action}']],
      ['button', 'The button', '{action}', ['{title}', '{badge}', '{children}', '{action}']],
    ]),
    arrange(['const Card = ({ children }) => <div className="card">{children}</div>;', 'const App = () => (', '  <Card>', '    <p>Welcome to Rosa’s Café</p>', '  </Card>', ');'], 'make the box, start App, open the Card, put a paragraph inside, then close it'),
  ], { level: 'intermediate' }),
];
