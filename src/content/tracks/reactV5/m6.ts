// React · Module 6 · Lists and keys. Lesson 6.1 keeps the old module id (r-list-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const MENU = 'const MENU = [\n  { id: 1, name: "Lemon Tea", price: 40, veg: true },\n  { id: 2, name: "Cheese Toast", price: 80, veg: true },\n  { id: 3, name: "Veg Sandwich", price: 90, veg: true },\n  { id: 4, name: "Chicken Sandwich", price: 150, veg: false },\n];';
const LIST = [...MENU.split('\n'), '', 'function App() {', '  return (', '    <ul className="card">', '      {MENU.map((dish) => (', '        <li key={dish.id}>{dish.name}: ₹{dish.price}</li>', '      ))}', '    </ul>', '  );', '}'];

const ITEM = ['function Dish({ name, price }) {', '  return <li>{name}: ₹{price}</li>;', '}'];
const withKey = (key: string) => [...MENU.split('\n'), ...ITEM, 'function App() {', `  return <ul className="card">{MENU.map((d) => <Dish key={${key}} name={d.name} price={d.price} />)}</ul>;`, '}'];

const FILTER = `import { useState } from "react";

${MENU}

function App() {
  const [vegOnly, setVegOnly] = useState(false);
  const [cheapFirst, setCheapFirst] = useState(false);
  let shown = vegOnly ? MENU.filter((d) => d.veg) : MENU;
  if (cheapFirst) shown = [...shown].sort((a, b) => a.price - b.price);
  console.log("Showing " + shown.length + " dishes" + (cheapFirst ? ", cheapest first" : ""));
  return (
    <div className="card">
      <button id="veg" onClick={() => setVegOnly(!vegOnly)}>Veg only</button>
      <button id="cheap" onClick={() => setCheapFirst(!cheapFirst)}>Cheapest first</button>
      <ul>
        {shown.map((d) => <li key={d.id}>{d.name}: ₹{d.price}</li>)}
      </ul>
    </div>
  );
}`;

export const R_M6: Lesson[] = [
  lesson('r-list-1', 'map to a list', 5, [
    chat(['Menus, orders, messages: most screens show a list made from an array of data.', 'In React, you turn each item into JSX with the array’s map method.']),
    explore('From array to list', LIST, [
      [1, 'The data: an array of dish objects.'],
      [10, 'map turns each dish into an <li>.', 'li'],
      [11, 'key gives each item a stable name, so React can track it.'],
      [9, 'The whole list sits inside a <ul>.', 'ul'],
    ], { page: app(LIST.join('\n')), minTaps: 3 }),
    reveal('Reading map in JSX', [
      ['{MENU.map((dish) => …)}', 'Braces, because map is JavaScript.'],
      ['(dish) => (<li>…</li>)', 'Round brackets give the JSX straight back.'],
      ['(dish) => { return <li>…</li>; }', 'With curly braces, you must write return.'],
    ], { mono: true }),
    check('What does MENU.map((d) => <li>{d.name}</li>) give?', ['An array of <li> elements, one per dish', 'One <li> with every name', 'A string of names', 'Nothing'], 'One new item for each old one.', 'map changes each item.', { mono: true }),
    tapbug('The list is empty', ['{MENU.map((d) => { <li>{d.name}</li> })}'], [[1, '{ <li>{d.name}</li> }', '<li>{d.name}</li>']], 'With curly braces an arrow function needs return. Leave them out to give the JSX back.'),
    recap([
      ['🗂', 'Keep list data in an array'],
      ['🔁', 'array.map turns each item into JSX'],
      ['🔑', 'Give each item a key'],
    ]),
  ]),

  lesson('r-b-6-2', 'Why keys matter', 4, [
    reveal('Keys', [
      ['key={dish.id}', 'A name for each item that never changes, usually an id from the data.', '🔑'],
      ['Why?', 'When the list changes, React matches items by key, so the right one is updated, moved or removed.', '🧭'],
      ['Not the position', 'key={index} breaks when items are added, removed or sorted: typed text can jump to the wrong row.', '⚠️'],
      ['Unique in the list', 'Two items in one list must not share a key.', '1️⃣'],
    ]),
    toggle('Keys on a component', [
      ['key={d.id}', withKey('d.id'), 'Stable ids: the best choice.', app(withKey('d.id').join('\n'))],
      ['key={d.name}', withKey('d.name'), 'Names work if they never repeat or change.', app(withKey('d.name').join('\n'))],
    ]),
    check('Which is the best key for a dish from the server?', ['Its id', 'Its position in the list', 'A random number each draw', 'The word "dish"'], 'Stable and unique.', 'It mustn’t change between draws.'),
    truth([
      ['A key must be unique within its list', true, 'So React can tell items apart.'],
      ['Random keys are fine', false, 'They change every draw, so React rebuilds every item.'],
      ['The key goes on the element returned by map', true, 'On <Dish key=…>, not inside Dish.'],
    ]),
    tapbug('Warning: each child in a list should have a unique key', ['{MENU.map((d) => <Dish name={d.name} />)}'], [[1, '<Dish name', '<Dish key={d.id} name']], 'Every item made by map needs a key.'),
    recap([
      ['🔑', 'Keys name each item in a list'],
      ['🧭', 'Use stable ids, not positions'],
      ['1️⃣', 'Unique within the list'],
    ]),
  ]),

  lesson('r-b-6-3', 'Filtering and sorting lists', 5, [
    tapPage('Filter and sort', 'Show only veg dishes, cheapest first.', app(FILTER), 'Showing 3 dishes, cheapest first', [{ click: '#veg' }, { click: '#cheap' }], 'shown is worked out from the data and the two buttons, on every draw.'),
    explore('Working out what to show', ['let shown = vegOnly ? MENU.filter((d) => d.veg) : MENU;', 'if (cheapFirst) shown = [...shown].sort((a, b) => a.price - b.price);', '{shown.map((d) => <li key={d.id}>…</li>)}'], [
      [1, 'filter keeps the veg dishes.'],
      [2, 'Copy before sorting: sort changes the array it is called on.'],
      [3, 'Show whatever is left.'],
    ], { minTaps: 3 }),
    check('Why [...shown].sort(…) instead of shown.sort(…)?', ['sort changes the array; the copy keeps the original menu safe', 'It is faster', 'sort needs a copy to work', 'It removes repeats'], 'Never change data you didn’t make.', 'What does sort do to its array?'),
    tapbug('Sorting changes the menu for every screen', ['const shown = MENU.sort((a, b) => a.price - b.price);'], [[1, 'MENU.sort(', '[...MENU].sort(']], 'Sort a copy, not the shared menu.'),
    chat(['Filters and sort orders are usually state; the shown list is worked out from them.', 'That way the list is never out of step with the buttons.']),
    recap([
      ['🧹', 'filter picks the items to show'],
      ['🔃', 'Sort a copy: [...list].sort(…)'],
      ['🧮', 'Work out the shown list on every draw'],
    ]),
  ]),

  challenge('r-b-6-ch', 'Module 6 Challenge', { icon: '📋', name: 'List Builder' }, ['Turn arrays into lists with map', 'Give every item a stable key', 'Filter and sort what is shown'], [
    mcq(1, 'Which turns an array into JSX items?', ['map', 'forEach', 'reduce', 'join'], 'map gives back a new array of JSX.', { mono: true }),
    mcq(2, 'What should a key be?', ['Stable and unique, like an id', 'The position in the list', 'A random number', 'The same for every item'], 'It names each item.'),
    mcq(3, 'Where does the key go?', ['On the element returned by map', 'Inside the child component', 'On the <ul>', 'In the CSS'], '<Dish key={d.id} … />.'),
    mcq(4, 'Which keeps only the veg dishes?', ['MENU.filter((d) => d.veg)', 'MENU.map((d) => d.veg)', 'MENU.find((d) => d.veg)', 'MENU.sort((d) => d.veg)'], 'filter keeps matches.', { mono: true }),
    mcq(5, 'Why copy before sort?', ['sort changes the original array', 'sort is slow', 'It removes keys', 'It is required by React'], 'Keep shared data safe.'),
    swipe([
      ['map needs a return when you use curly braces', true, 'Or leave the braces out.'],
      ['key={index} is always fine', false, 'It breaks when items move.'],
      ['Two items in one list may share a key', false, 'Keys must be unique.'],
      ['The shown list can be worked out from state', true, 'On every draw.'],
    ]),
    pairs([['map', 'Array to JSX'], ['key', 'Name each item'], ['filter', 'Keep some'], ['[...list].sort()', 'Sort a copy']], 'List tools.'),
    pickCode('Which draws the menu as a list?', ['{MENU.map((d) => <li key={d.id}>{d.name}</li>)}', '{MENU.forEach((d) => <li>{d.name}</li>)}', '{for (const d of MENU) <li>{d.name}</li>}', '{MENU.map((d) => { <li>{d.name}</li> })}'], 'map, with the JSX given back and a key.'),
    bugTask(['{MENU.map((d) => <Dish name={d.name} />)}', '{MENU.map((d) => { <li>{d.name}</li> })}', 'const shown = MENU.sort(byPrice);'], [[1, '<Dish name', '<Dish key={d.id} name'], [2, '{ <li>{d.name}</li> }', '<li>{d.name}</li>'], [3, 'MENU.sort(', '[...MENU].sort(']], 'Add a key, give the JSX back, and sort a copy.'),
    xray('<div class="card"><button>Veg only</button><ul><li>Lemon Tea: ₹40</li><li>Cheese Toast: ₹80</li></ul></div>', [
      ['ul', 'The whole list', '{shown.map(…)}', ['{shown.map(…)}', 'key={d.id}', 'MENU.filter((d) => d.veg)']],
      ['li', 'One dish', '<li key={d.id}>…</li>', ['<li key={d.id}>…</li>', '{shown.map(…)}', 'onClick={() => setVegOnly(!vegOnly)}']],
      ['button', 'The veg filter', 'onClick={() => setVegOnly(!vegOnly)}', ['onClick={() => setVegOnly(!vegOnly)}', '<li key={d.id}>…</li>', '{shown.map(…)}']],
    ]),
    arrange(['const DISHES = ["Lemon Tea", "Cheese Toast"];', 'function App() {', '  return <ul className="card">{DISHES.map((d) => <li key={d}>{d}</li>)}</ul>;', '}'], 'make the data, start the component, then map it to a list'),
  ]),
];
