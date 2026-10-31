// React · Module 10 · Sharing state. Lesson 10.1 keeps the old module id (r-lift-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const LIFT = [
  'import { useState } from "react";',
  '',
  'function Menu({ onAdd }) {',
  '  return (',
  '    <div className="card">',
  '      <button id="tea" onClick={() => onAdd("Lemon Tea")}>Add Lemon Tea</button>',
  '      <button id="toast" onClick={() => onAdd("Cheese Toast")}>Add Cheese Toast</button>',
  '    </div>',
  '  );',
  '}',
  '',
  'function CartBadge({ count }) {',
  '  return <p className="ok">🛒 {count} in cart</p>;',
  '}',
  '',
  'function App() {',
  '  const [cart, setCart] = useState([]);',
  '  function add(dish) {',
  '    const next = [...cart, dish];',
  '    setCart(next);',
  '    console.log("Cart badge: " + next.length);',
  '  }',
  '  return (',
  '    <div>',
  '      <CartBadge count={cart.length} />',
  '      <Menu onAdd={add} />',
  '    </div>',
  '  );',
  '}',
];

const TOTAL = `import { useState } from "react";

const PRICES = { "Lemon Tea": 40, "Cheese Toast": 80 };

function App() {
  const [cart, setCart] = useState([]);
  const total = cart.reduce((sum, dish) => sum + PRICES[dish], 0);
  function add(dish) {
    setCart([...cart, dish]);
    console.log("Total: ₹" + (total + PRICES[dish]));
  }
  return (
    <div className="card">
      <button id="tea" onClick={() => add("Lemon Tea")}>Lemon Tea ₹40</button>
      <button id="toast" onClick={() => add("Cheese Toast")}>Cheese Toast ₹80</button>
      <p>{cart.length} items · Total ₹{total}</p>
    </div>
  );
}`;

const TABLES = `import { useState } from "react";

function TableOrder({ table }) {
  const [teas, setTeas] = useState(0);
  function add() {
    setTeas(teas + 1);
    console.log("Table " + table + " teas: " + (teas + 1));
  }
  return (
    <div className="card">
      <h3>Table {table}</h3>
      <p>{teas} teas</p>
      <button id={"add" + table} onClick={add}>Add tea</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <TableOrder table={1} />
      <TableOrder table={2} />
    </div>
  );
}`;

export const R_M10: Lesson[] = [
  lesson('r-lift-1', 'Lifting state up', 5, [
    chat(['Two parts of the screen need the same data: the menu adds to the cart, and the badge shows how many.', 'If each keeps its own copy, they disagree. Move the state up to their closest shared parent.']),
    tapPage('Menu and badge in step', 'Add two dishes and watch the badge.', app(LIFT.join('\n')), 'Cart badge: 2', [{ click: '#tea' }, { click: '#toast' }], 'One cart, in App, passed down to both.'),
    explore('Who owns the cart?', LIFT, [
      [17, 'The cart lives in App, the closest parent of both.'],
      [18, 'Only App changes the cart.'],
      [25, 'CartBadge reads it as a prop.', '.ok'],
      [26, 'Menu changes it through onAdd.', '#tea'],
    ], { page: app(LIFT.join('\n')), minTaps: 3 }),
    reveal('Lifting state up, in 3 moves', [
      ['1 · Remove', 'Take the state out of the child.'],
      ['2 · Pass the value down', 'The parent passes it as a prop, like count={cart.length}.'],
      ['3 · Pass a handler down', 'And a function to change it, like onAdd={add}.'],
    ]),
    check('Menu and CartBadge both need the cart. Where should it live?', ['In App, their closest shared parent', 'In Menu', 'In CartBadge', 'In both, as copies'], 'Then both read the same data.', 'Which component is above both?', { mono: false }),
    recap([
      ['⬆️', 'Shared state moves up to the closest parent'],
      ['⬇️', 'The value goes down as a prop'],
      ['📞', 'Changes come back up through a handler'],
    ]),
  ], 'intermediate'),

  lesson('r-b-10-2', 'One source of truth', 5, [
    toggle('Store it, or work it out?', [
      ['Stored twice', ['const [cart, setCart] = useState([]);', 'const [total, setTotal] = useState(0);', '// every change must update both'], 'Two pieces of state that must always agree. Forget one, and the screen is wrong.'],
      ['Worked out', ['const [cart, setCart] = useState([]);', 'const total = cart.reduce(…);'], 'One piece of state. The total is worked out on every draw, so it is always right.'],
    ]),
    tapPage('A total that is always right', 'Add a tea and a toast.', app(TOTAL), 'Total: ₹120', [{ click: '#tea' }, { click: '#toast' }], 'total is not state. App works it out from cart every time it draws.'),
    check('Which should NOT be state?', ['How many items are in the cart, when you already have the cart', 'The list of dishes in the cart', 'What is typed in a search box', 'Whether a panel is open'], 'Work it out from the cart: cart.length.', 'Can you calculate it from other state?', { mono: false }),
    tapbug('The price changes, but the tag still shows the old one', ['function PriceTag({ price }) {', '  const [shown] = useState(price);', '  return <p>₹{shown}</p>;', '}'], [[3, '{shown}', '{price}']], 'useState only uses its first value. Copying a prop into state freezes it, so use the prop.'),
    truth([
      ['A value you can work out from state should be state too', false, 'Work it out while drawing.'],
      ['Copying a prop into state stops it updating', true, 'useState keeps the first value.'],
      ['Each piece of data should have one owner', true, 'One source of truth.'],
    ]),
    recap([
      ['1️⃣', 'Each piece of data has one owner'],
      ['🧮', 'Work out what you can, don’t store it'],
      ['🧊', 'Don’t copy props into state'],
    ]),
  ], 'intermediate'),

  lesson('r-b-10-3', 'Keeping state in the right place', 5, [
    reveal('Where should state live?', [
      ['As low as it can', 'In the component that uses it.'],
      ['Lift only when shared', 'Move it up when two parts need it.'],
      ['Each copy has its own', 'Two <TableOrder /> each keep their own count.'],
      ['Removed means reset', 'When a component leaves the page, its state goes with it.'],
    ]),
    tapPage('Two tables, two counts', 'Add two teas at table 1, then one at table 2.', app(TABLES), 'Table 2 teas: 1', [{ click: '#add1' }, { click: '#add1' }, { click: '#add2' }], 'The same component, with separate state for each copy.'),
    check('Only a SearchBox uses what is typed in it. Where should that text live?', ['In SearchBox', 'In App, just in case', 'In every component', 'In a global variable'], 'Keep state as low as it can go.', 'Who else needs it?', { mono: false }),
    matchUp('Where should it live?', [['Text only the search box uses', 'In the search box'], ['A cart the menu and badge use', 'In their shared parent'], ['The cart total', 'Not state: work it out'], ['Is this panel open?', 'In the panel']], 'Low, shared, or not state at all.'),
    check('What happens to a component’s state when it is removed from the page?', ['It is thrown away', 'It is kept for next time', 'It moves to the parent', 'It is saved in the browser'], 'Show it again and it starts fresh.', 'Where would React keep it?', { mono: false }),
    recap([
      ['⬇️', 'Keep state as low as you can'],
      ['⬆️', 'Lift it only when it is shared'],
      ['🔄', 'Each copy of a component has its own state'],
    ]),
  ], 'intermediate'),

  challenge('r-i-10-ch', 'Module 10 Challenge', { icon: '🤝', name: 'State Sharer' }, ['Lift state to the closest shared parent', 'Keep one source of truth', 'Choose where each piece of state lives'], [
    mcq(1, 'Two sibling components need the same state. Where should it go?', ['Their closest shared parent', 'The first sibling', 'Both siblings, as copies', 'A global variable'], 'Then both read one copy.'),
    mcq(2, 'How does a child change state that lives in its parent?', ['It calls a function the parent passed as a prop', 'It changes the prop directly', 'It calls the parent’s setter by name', 'It can’t'], 'Values go down, changes come up through handlers.'),
    mcq(3, 'The cart total can be worked out from the cart. What should it be?', ['A value worked out while drawing', 'Its own state', 'A prop of the cart', 'A global variable'], 'One source of truth.'),
    mcq(4, 'A component does useState(price). What happens when the price prop changes later?', ['Nothing: the state keeps the first value', 'The state updates to the new price', 'React throws an error', 'The component is removed'], 'useState only reads its first value.'),
    mcq(5, 'Two <TableOrder /> components each call useState(0). How many counts are there?', ['Two, one each', 'One, shared', 'None', 'It depends on the order'], 'Each copy has its own state.'),
    swipe([
      ['Props flow down, and changes flow up through handlers', true, 'That is how state is shared.'],
      ['Siblings can read each other’s state directly', false, 'Lift it to their parent.'],
      ['Keeping state low keeps components simple', true, 'Only the part that needs it has it.'],
      ['Storing a total next to the list is the safest way', false, 'The two can disagree.'],
    ]),
    pairs([['Lift state up', 'Share between siblings'], ['onAdd={add}', 'A way to change it'], ['cart.length', 'Worked out, not stored'], ['useState in the child', 'Used by one part only']], 'Sharing state.'),
    pickCode('Which App shares one cart with CartBadge and Menu?', ['<><CartBadge count={cart.length} /><Menu onAdd={add} /></>', '<><CartBadge /><Menu /></>', '<><CartBadge count={setCart} /><Menu onAdd={cart.length} /></>', '<><CartBadge onAdd={add} /><Menu count={cart.length} /></>'], 'The value to the badge, the handler to the menu.'),
    bugTask(['function Badge({ count }) {', '  const [shown] = useState(count);', '  return <p>{shown} in cart</p>;', '}', 'const [total, setTotal] = useState(0);'], [[3, '{shown}', '{count}'], [5, 'const [total, setTotal] = useState(0);', 'const total = cart.reduce((s, d) => s + d.price, 0);']], 'Use the prop itself, and work out the total instead of storing it.'),
    xray('<div><p class="ok">🛒 2 in cart</p><div class="card"><button>Add Lemon Tea</button><button>Add Cheese Toast</button></div><p class="muted">Total ₹120</p></div>', [
      ['.ok', 'The badge', '<CartBadge count={cart.length} />', ['<CartBadge count={cart.length} />', 'onAdd("Lemon Tea")', 'cart.reduce(…)']],
      ['button', 'A menu button', 'onAdd("Lemon Tea")', ['<CartBadge count={cart.length} />', 'onAdd("Lemon Tea")', 'cart.reduce(…)']],
      ['.muted', 'The total', 'cart.reduce(…)', ['<CartBadge count={cart.length} />', 'onAdd("Lemon Tea")', 'cart.reduce(…)']],
    ]),
    arrange(['import { useState } from "react";', 'const Badge = ({ count }) => <p className="ok">🛒 {count} in cart</p>;', 'function App() {', '  const [cart] = useState(["Lemon Tea", "Cheese Toast"]);', '  return <Badge count={cart.length} />;', '}'], 'import, make the badge, start App, keep the cart in App, then pass its length down'),
  ], { level: 'intermediate' }),
];
