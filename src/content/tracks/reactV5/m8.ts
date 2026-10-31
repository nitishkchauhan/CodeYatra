// React · Module 8 · Updating objects and arrays. Lesson 8.1 keeps the old module id (r-immut). From here on the
// track is Intermediate.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const COPY = `import { useState } from "react";

function App() {
  const [dish, setDish] = useState({ name: "Lemon Tea", price: 40 });
  console.log("Shown price: " + dish.price);
  function changeIt() {
    dish.price = 45;
    setDish(dish);
  }
  function copyIt() {
    setDish({ ...dish, price: 45 });
  }
  return (
    <div className="card">
      <h3>{dish.name}: ₹{dish.price}</h3>
      <button id="change" onClick={changeIt}>Change it (wrong)</button>
      <button id="copy" onClick={copyIt}>Copy it (right)</button>
    </div>
  );
}`;

const CART = `import { useState } from "react";

function App() {
  const [cart, setCart] = useState([{ id: 1, name: "Lemon Tea", qty: 1 }]);
  console.log("Items: " + cart.map((i) => i.name + " x" + i.qty).join(", "));
  function addToast() {
    setCart([...cart, { id: 2, name: "Cheese Toast", qty: 1 }]);
  }
  function moreTea() {
    setCart(cart.map((i) => (i.id === 1 ? { ...i, qty: i.qty + 1 } : i)));
  }
  function removeTea() {
    setCart(cart.filter((i) => i.id !== 1));
  }
  return (
    <div className="card">
      <ul>{cart.map((i) => <li key={i.id}>{i.name} x{i.qty}</li>)}</ul>
      <button id="add" onClick={addToast}>Add toast</button>
      <button id="more" onClick={moreTea}>One more tea</button>
      <button id="remove" onClick={removeTea}>Remove tea</button>
    </div>
  );
}`;

const NESTED = `import { useState } from "react";

function App() {
  const [order, setOrder] = useState({ dish: "Veg Sandwich", deliver: { area: "Harbour Point", floor: 2 } });
  console.log("Deliver to: " + order.deliver.area + ", floor " + order.deliver.floor);
  function moveUp() {
    setOrder({ ...order, deliver: { ...order.deliver, floor: order.deliver.floor + 1 } });
  }
  return (
    <div className="card">
      <h3>{order.dish}</h3>
      <p>{order.deliver.area}, floor {order.deliver.floor}</p>
      <button id="up" onClick={moveUp}>One floor up</button>
    </div>
  );
}`;

export const R_M8: Lesson[] = [
  lesson('r-immut', 'Copy, don’t change', 5, [
    chat(['React decides whether to draw again by checking if state is a new value.', 'If you change an object in place and set the same object, React thinks nothing changed.'], {}),
    tapPage('Change or copy?', 'Tap “Change it (wrong)”, then “Copy it (right)”.', app(COPY), 'Shown price: 45', [{ click: '#copy' }], 'Changing in place set the same object, so React didn’t draw again.'),
    reveal('Make a new value', [
      ['{ ...dish, price: 45 }', 'A new object: everything from dish, with a new price.'],
      ['[...cart, item]', 'A new array with one more item.'],
      ['dish.price = 45', 'Changes the old object: React may not notice.'],
    ], { mono: true }),
    check('Which updates the price so React notices?', ['setDish({ ...dish, price: 45 })', 'dish.price = 45; setDish(dish)', 'dish.price = 45', 'setDish(dish.price = 45)'], 'A new object.', 'Is it a new object?', { mono: true }),
    tapbug('The price changes, but the page doesn’t', ['dish.price = 45;', 'setDish(dish);'], [[2, 'setDish(dish);', 'setDish({ ...dish, price: 45 });']], 'Pass a new object, not the same one changed.'),
    recap([
      ['🆕', 'Give React a new object or array'],
      ['📋', '{ ...old, changed } copies and changes'],
      ['🚫', 'Don’t change state in place'],
    ], ),
  ], 'intermediate'),

  lesson('r-b-8-2', 'Adding, removing and changing items', 5, [
    tapPage('A cart', 'Add a toast, then add one more tea.', app(CART), 'Items: Lemon Tea x2, Cheese Toast x1', [{ click: '#add' }, { click: '#more' }], 'Each button makes a new array; none of them changes the old one.'),
    matchUp('Array updates', [['[...cart, item]', 'Add'], ['cart.filter((i) => i.id !== id)', 'Remove'], ['cart.map((i) => i.id === id ? { ...i, qty } : i)', 'Change one'], ['[...cart].sort(…)', 'Reorder']], 'Each gives back a new array.'),
    explore('Changing one item', ['setCart(cart.map((i) =>', '  i.id === 1', '    ? { ...i, qty: i.qty + 1 }', '    : i', '));'], [
      [1, 'map makes a new array.'],
      [2, 'Find the item to change.'],
      [3, 'Give back a changed copy of it.'],
      [4, 'Keep every other item as it is.'],
    ], { minTaps: 3 }),
    check('Which removes the tea (id 1)?', ['cart.filter((i) => i.id !== 1)', 'cart.splice(0, 1)', 'delete cart[0]', 'cart.pop()'], 'filter makes a new array; the others change the old one.', 'Which makes a new array?', { mono: true }),
    tapbug('The new item doesn’t appear', ['cart.push(toast);', 'setCart(cart);'], [[1, 'cart.push(toast);', 'const next = [...cart, toast];'], [2, 'setCart(cart);', 'setCart(next);']], 'push changes the old array. Make a new one.'),
    recap([
      ['➕', 'Add: [...list, item]'],
      ['➖', 'Remove: list.filter(…)'],
      ['✏️', 'Change: list.map(…) with a copy'],
    ]),
  ], 'intermediate'),

  lesson('r-b-8-3', 'Nested objects', 4, [
    tapPage('Deliver one floor up', 'Tap “One floor up”.', app(NESTED), 'Deliver to: Harbour Point, floor 3', [{ click: '#up' }], 'Copy each level you change: the order, then its deliver part.'),
    reveal('Copy every level you change', [
      ['{ ...order, deliver: … }', 'A new order…'],
      ['{ ...order.deliver, floor: 3 }', '…with a new deliver object inside.'],
      ['Keep it flat', 'Deeply nested state is hard to update. Keep it shallow where you can.'],
    ], { mono: true }),
    check('What does { ...order, deliver: { ...order.deliver, floor: 3 } } keep?', ['Everything else in order and in deliver', 'Only the floor', 'Only the dish', 'Nothing'], 'Only floor changes.', 'Two spreads.', { mono: true }),
    tapbug('The area disappears', ['setOrder({ ...order, deliver: { floor: 3 } });'], [[1, '{ floor: 3 }', '{ ...order.deliver, floor: 3 }']], 'Copy the inner object too, or its other fields are lost.'),
    truth([
      ['A spread copies only one level', true, 'Inner objects are shared.'],
      ['You must copy every level you change', true, 'From the top down to the change.'],
      ['A spread copies every level, however deep', false, 'Only the top level; copy deeper levels yourself.'],
    ]),
    recap([
      ['🪆', 'Copy every level you change'],
      ['🧺', 'Spread copies one level only'],
      ['📏', 'Keep state shallow'],
    ]),
  ], 'intermediate'),

  challenge('r-i-8-ch', 'Module 8 Challenge', { icon: '🧬', name: 'Immutable Pro' }, ['Update objects in state by copying', 'Add, remove and change array items', 'Update nested objects safely'], [
    mcq(1, 'Why must state be replaced, not changed in place?', ['React checks for a new value to know it should draw again', 'It is faster', 'JavaScript requires it', 'To save memory'], 'Same object, no redraw.'),
    mcq(2, 'Which adds an item to a cart in state?', ['setCart([...cart, item])', 'cart.push(item)', 'setCart(cart.push(item))', 'cart[cart.length] = item'], 'A new array.', { mono: true }),
    mcq(3, 'Which removes items with id 2?', ['cart.filter((i) => i.id !== 2)', 'cart.splice(1)', 'delete cart[2]', 'cart.remove(2)'], 'filter makes a new array.', { mono: true }),
    mcq(4, 'Which changes one item’s qty?', ['cart.map((i) => (i.id === 1 ? { ...i, qty: 2 } : i))', 'cart[0].qty = 2', 'cart.find((i) => i.id === 1).qty = 2', 'cart.qty = 2'], 'map, with a copy of the changed item.', { mono: true }),
    mcq(5, 'How many levels does { ...obj } copy?', ['One', 'All of them', 'None', 'Two'], 'Inner objects are shared.'),
    swipe([
      ['push changes the old array', true, 'Use [...list, item].'],
      ['setDish(dish) after dish.price = 45 always redraws', false, 'Same object: React may skip it.'],
      ['map can change one item and keep the rest', true, 'With a condition.'],
      ['A spread copies nested objects too', false, 'Only one level.'],
    ]),
    pairs([['[...a, x]', 'Add'], ['a.filter()', 'Remove'], ['a.map()', 'Change one'], ['{ ...o, k: v }', 'Change a field']], 'Immutable updates.'),
    pickCode('Which updates the floor inside deliver?', ['setOrder({ ...order, deliver: { ...order.deliver, floor: 3 } })', 'order.deliver.floor = 3', 'setOrder({ deliver: { floor: 3 } })', 'setOrder({ ...order, floor: 3 })'], 'Copy both levels.'),
    bugTask(['dish.price = 45; setDish(dish);', 'cart.push(toast);', 'setOrder({ ...order, deliver: { floor: 3 } });'], [[1, 'dish.price = 45; setDish(dish);', 'setDish({ ...dish, price: 45 });'], [2, 'cart.push(toast);', 'setCart([...cart, toast]);'], [3, '{ floor: 3 }', '{ ...order.deliver, floor: 3 }']], 'Make new objects and arrays, and copy every level you change.'),
    xray('<div class="card"><ul><li>Lemon Tea x2</li><li>Cheese Toast x1</li></ul><button>Add toast</button><button>Remove tea</button></div>', [
      ['ul', 'The cart', '{cart.map(…)}', ['{cart.map(…)}', 'setCart([...cart, toast])', 'setCart(cart.filter(…))']],
      ['button', 'Add toast', 'setCart([...cart, toast])', ['setCart([...cart, toast])', 'setCart(cart.filter(…))', '{cart.map(…)}']],
      ['button:last-child', 'Remove tea', 'setCart(cart.filter(…))', ['setCart(cart.filter(…))', 'setCart([...cart, toast])', '{cart.map(…)}']],
    ]),
    arrange(['import { useState } from "react";', 'function App() {', '  const [cart] = useState(["Lemon Tea"]);', '  const next = [...cart, "Cheese Toast"];', '  return <p className="card">{next.join(" and ")}</p>;', '}'], 'import, start, make the state, make a new array, then show it'),
  ], { level: 'intermediate' }),
];
