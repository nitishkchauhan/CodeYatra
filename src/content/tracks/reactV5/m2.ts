// React · Module 2 · Props. Lesson 2.1 keeps the old module id (r-props).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const CARD = ['function MenuCard(props) {', '  return (', '    <div className="card">', '      <h3>{props.name}</h3>', '      <p>₹{props.price}</p>', '    </div>', '  );', '}'];
const PROPS = [...CARD, 'function App() {', '  return (', '    <div>', '      <MenuCard name="Lemon Tea" price={40} />', '      <MenuCard name="Cheese Toast" price={80} />', '    </div>', '  );', '}'];
const one = (name: string, price: number) => [...CARD, 'function App() {', `  return <MenuCard name="${name}" price={${price}} />;`, '}'];

const VEG = ['function MenuCard({ name, price, veg = false }) {', '  return (', '    <div className="card">', '      <h3>{name} {veg ? "🌱" : ""}</h3>', '      <p>₹{price}</p>', '    </div>', '  );', '}'];
const SPREAD = ['const dish = { name: "Veg Sandwich", price: 90 };', 'function MenuCard({ name, price }) {', '  return <div className="card"><h3>{name}</h3><p>₹{price}</p></div>;', '}', 'function App() {', '  return <MenuCard {...dish} />;', '}'];
const TAX = ['function MenuCard({ name, price }) {', '  const withTax = Math.round(price * 1.05);', '  return (', '    <div className="card">', '      <h3>{name}</h3>', '      <p>₹{withTax} with tax</p>', '    </div>', '  );', '}', 'function App() {', '  return <MenuCard name="Veg Sandwich" price={90} />;', '}'];

export const R_M2: Lesson[] = [
  lesson('r-props', 'Passing props', 5, [
    chat(['Props are the values you pass into a component, like arguments to a function.', 'One MenuCard component can show any dish: <MenuCard name="Lemon Tea" price={40} />.']),
    explore('Props in, page out', PROPS, [
      [1, 'props is an object holding everything that was passed in.'],
      [4, 'props.name shows the name this card was given.', 'h3'],
      [12, 'Text props use quotes; numbers and other JavaScript use braces.'],
      [13, 'The same component, different props, a different card.', '.card'],
    ], { page: app(PROPS.join('\n')), minTaps: 3 }),
    toggle('Change the props', [
      ['Lemon Tea', one('Lemon Tea', 40), 'name="Lemon Tea" price={40}', app(one('Lemon Tea', 40).join('\n'))],
      ['Veg Sandwich', one('Veg Sandwich', 90), 'name="Veg Sandwich" price={90}', app(one('Veg Sandwich', 90).join('\n'))],
      ['Chicken Sandwich', one('Chicken Sandwich', 150), 'Same component, new values.', app(one('Chicken Sandwich', 150).join('\n'))],
    ]),
    check('How do you pass the number 40 as a prop?', ['price={40}', 'price="40"', 'price=40', '{price: 40}'], 'Braces for JavaScript values. Quotes would make it the text "40".', 'Numbers aren’t text.', { mono: true }),
    tapbug('The card has no name', ['function MenuCard(props) {', '  return <h3>{name}</h3>;', '}'], [[2, '{name}', '{props.name}']], 'The name lives inside the props object.'),
    recap([
      ['📨', 'Props pass values into a component'],
      ['🔤', 'Text in quotes, other values in braces'],
      ['♻️', 'One component, many different cards'],
    ]),
  ]),

  lesson('r-b-2-2', 'Destructuring and default props', 5, [
    reveal('Shorter props', [
      ['function MenuCard({ name, price })', 'Destructuring: take the props you need by name.'],
      ['{ veg = false }', 'A default, used when the prop isn’t passed.'],
      ['<MenuCard {...dish} />', 'Spread an object’s fields as props.'],
    ], { mono: true }),
    toggle('Defaults at work', [
      ['veg={true}', [...VEG, 'function App() {', '  return <MenuCard name="Lemon Tea" price={40} veg={true} />;', '}'], 'veg is passed: the leaf shows.', app([...VEG, 'function App() {', '  return <MenuCard name="Lemon Tea" price={40} veg={true} />;', '}'].join('\n'))],
      ['Not passed', [...VEG, 'function App() {', '  return <MenuCard name="Chicken Sandwich" price={150} />;', '}'], 'veg isn’t passed, so the default false is used.', app([...VEG, 'function App() {', '  return <MenuCard name="Chicken Sandwich" price={150} />;', '}'].join('\n'))],
    ]),
    explore('Spreading an object', SPREAD, [
      [1, 'One object holds the dish.'],
      [2, 'The component takes name and price straight out of its props.'],
      [6, '{...dish} passes every field as a prop.', '.card'],
    ], { page: app(SPREAD.join('\n')), minTaps: 2 }),
    check('What does { veg = false } in the props mean?', ['If veg isn’t passed, it is false', 'veg is always false', 'veg must be passed', 'It hides veg dishes'], 'A default value.', 'What happens when it is missing?'),
    tapbug('name and price are undefined', ['function MenuCard(name, price) {'], [[1, '(name, price)', '({ name, price })']], 'Props arrive as one object. Use braces to take fields out of it.'),
    recap([
      ['🎯', '{ name, price } takes props by name'],
      ['🧷', '{ veg = false } gives a default'],
      ['📦', '{...dish} spreads an object as props'],
    ]),
  ]),

  lesson('r-b-2-3', 'Props are read-only', 4, [
    chat(['A component must never change its own props. They belong to whoever passed them.', 'Think of props as an order slip: the kitchen reads it, but doesn’t rewrite it.']),
    reveal('Pure components', [
      ['Same props, same result', 'A component should always draw the same thing for the same props.', '🎯'],
      ['Work out, don’t change', 'const withTax = price * 1.05; instead of changing price.', '🧮'],
      ['Need something to change?', 'Use state (next module): the component’s own memory.', '🔄'],
    ]),
    explore('Working out a value', TAX, [
      [2, 'A new value is worked out from the prop; the prop itself is untouched.'],
      [6, 'Show the worked-out value.', 'p'],
      [11, 'The parent decides the price.'],
    ], { page: app(TAX.join('\n')), minTaps: 2 }),
    truth([
      ['A component may change its props', false, 'Props are read-only.'],
      ['The parent decides what props a child gets', true, 'Data flows down.'],
      ['A pure component draws the same thing for the same props', true, 'No surprises.'],
    ]),
    check('Which keeps the component pure?', ['const total = price * 2;', 'props.price = price * 2;', 'price++;', 'window.price = price;'], 'Work out a new value; don’t change the props.', 'Which one only reads?', { mono: true }),
    recap([
      ['🔒', 'Props are read-only'],
      ['⬇️', 'Data flows from parent to child'],
      ['🧮', 'Work out new values from props'],
    ]),
  ]),

  challenge('r-b-2-ch', 'Module 2 Challenge', { icon: '📨', name: 'Prop Passer' }, ['Pass values into components with props', 'Use destructuring, defaults and spread', 'Keep components pure'], [
    mcq(1, 'What are props?', ['Values passed into a component', 'Styles', 'A database', 'Only events'], 'Like arguments to a function.'),
    mcq(2, 'In function Card(props), how do you read the name?', ['props.name', 'this.name', 'name()', 'Card.name'], 'Inside the props object.', { mono: true }),
    mcq(3, 'Which passes text as a prop?', ['name="Tea"', 'name={Tea}', 'name=Tea', '{name: Tea}'], 'Text goes in quotes.', { mono: true }),
    mcq(4, 'What is price inside function Card({ price = 0 }) when no price is passed?', ['0', 'undefined', 'An error', 'null'], 'The default.', { mono: true }),
    mcq(5, 'Can a component change its own props?', ['No, they are read-only', 'Yes, any time', 'Only numbers', 'Only in the browser'], 'Use state for things that change.'),
    swipe([
      ['Props flow from parent to child', true, 'Down the tree.'],
      ['Numbers are passed in quotes', false, 'In braces: price={40}.'],
      ['{...dish} passes every field as a prop', true, 'Spread.'],
      ['A child can rewrite its props', false, 'They are read-only.'],
    ]),
    pairs([['props.name', 'Read a prop'], ['{ name, price }', 'Destructuring'], ['{ veg = false }', 'A default'], ['{...dish}', 'Spread an object']], 'Prop tools.'),
    pickCode('Which card shows its price prop?', ['function Card({ price }) { return <p>₹{price}</p>; }', 'function Card(price) { return <p>₹{price}</p>; }', 'function Card() { return <p>₹{props.price}</p>; }', 'function Card({ price }) { return <p>₹price</p>; }'], 'Destructure price, then use it in braces.'),
    bugTask(['function Card(name, price) {', '  return <h3>{props.name}</h3>;', '<Card name="Tea" price="40" />'], [[1, '(name, price)', '({ name, price })'], [2, 'props.name', 'name'], [3, '"40"', '{40}']], 'Destructure the one props object, use the names you took out, and pass numbers in braces.'),
    xray('<div class="card"><h3>Lemon Tea 🌱</h3><p>₹40</p></div>', [
      ['h3', 'The name and the leaf', '{name} {veg ? "🌱" : ""}', ['{name} {veg ? "🌱" : ""}', '₹{price}', '<MenuCard />']],
      ['p', 'The price', '₹{price}', ['₹{price}', '{name}', 'className="card"']],
      ['.card', 'The whole box', 'className="card"', ['className="card"', '₹{price}', '{name}']],
    ]),
    arrange(['function Card({ name, price }) {\n  return <p className="card">{name}: ₹{price}</p>;\n}', 'function App() {', '  return <Card name="Lemon Tea" price={40} />;', '}'], 'make the component, then use it with props in App'),
  ]),
];
