// React · Module 3 · State. Lesson 3.1 keeps the old module id (r-state-1).
// Pages that need to show a change log from the component as it draws, so each tap’s result can be checked.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const COUNTER = ['import { useState } from "react";', '', 'function App() {', '  const [cups, setCups] = useState(0);', '  function add() {', '    setCups(cups + 1);', '    console.log("Teas: " + (cups + 1));', '  }', '  return (', '    <div className="card">', '      <h3>Teas: {cups}</h3>', '      <p>Bill: ₹{cups * 40}</p>', '      <button id="add" onClick={add}>Add tea</button>', '    </div>', '  );', '}'];

const SNAPSHOT = `import { useState } from "react";

function App() {
  const [cups, setCups] = useState(0);
  function wrong() {
    setCups(cups + 1);
    setCups(cups + 1);
    setCups(cups + 1);
    console.log("Wrong way: " + (cups + 1));
  }
  function right() {
    setCups((c) => c + 1);
    setCups((c) => c + 1);
    setCups((c) => c + 1);
    console.log("Right way: " + (cups + 3));
  }
  return (
    <div className="card">
      <h3>Teas: {cups}</h3>
      <button id="wrong" onClick={wrong}>+3 (wrong)</button>
      <button id="right" onClick={right}>+3 (right)</button>
      <button id="reset" onClick={() => setCups(0)}>Reset</button>
    </div>
  );
}`;

const ORDER = `import { useState } from "react";

function App() {
  const [size, setSize] = useState("Small");
  const [sugar, setSugar] = useState(true);
  const summary = size + " tea, " + (sugar ? "with sugar" : "no sugar");
  console.log(summary);
  return (
    <div className="card">
      <h3>{summary}</h3>
      <button id="small" onClick={() => setSize("Small")}>Small</button>
      <button id="large" onClick={() => setSize("Large")}>Large</button>
      <button id="sugar" onClick={() => setSugar(!sugar)}>Sugar on or off</button>
    </div>
  );
}`;

export const R_M3: Lesson[] = [
  lesson('r-state-1', 'useState', 5, [
    chat(['Props come from outside. State is a component’s own memory: a counter, a tick box, what someone typed.', 'When state changes, React draws the component again with the new value.']),
    tapPage('A cup counter', 'Tap Add tea a few times. The count and the bill change together.', app(COUNTER.join('\n')), 'Teas: 2', [{ click: '#add' }, { click: '#add' }], 'Each tap calls setCups, and React draws the card again.'),
    explore('Reading useState', COUNTER, [
      [1, 'Import the useState hook from React.'],
      [4, 'useState(0) makes state that starts at 0, and gives back the value and a function to change it.'],
      [6, 'Call the setter to change it. React then draws again.'],
      [11, 'Show the current value in the JSX.', 'h3'],
    ], { page: app(COUNTER.join('\n')), minTaps: 3 }),
    check('Why not just use let cups = 0 and cups++?', ['React wouldn’t draw again, and the value would reset each draw', 'It is too slow', 'let isn’t allowed in React', 'It works the same'], 'Only state remembers between draws and asks React to draw again.', 'What makes React draw again?'),
    tapbug('Tapping does nothing', ['const [cups, setCups] = useState(0);', 'function add() {', '  cups = cups + 1;', '}'], [[3, 'cups = cups + 1;', 'setCups(cups + 1);']], 'Change state with its setter, never by assigning.'),
    recap([
      ['🧠', 'State is a component’s own memory'],
      ['🔁', 'const [value, setValue] = useState(start)'],
      ['🖌', 'Setting state draws the component again'],
    ]),
  ]),

  lesson('r-b-3-2', 'State is a snapshot', 5, [
    tapPage('Three at once?', 'Tap “+3 (wrong)”, then Reset, then “+3 (right)”.', app(SNAPSHOT), 'Right way: 3', [{ click: '#right' }], 'The wrong way only adds 1: all three lines used the same old value.'),
    reveal('Why?', [
      ['A snapshot', 'During one draw, cups is a fixed number. setCups(cups + 1) three times means “make it 1” three times.'],
      ['An updater function', 'setCups((c) => c + 1) means “take the latest value and add 1”. Three of them add 3.'],
      ['The next draw', 'The new value appears after the event has finished.'],
    ], { mono: true }),
    check('cups is 5. What is it after setCups(cups + 1); setCups(cups + 1);?', ['6', '7', '5', '8'], 'Both lines use the same snapshot: 5 + 1.', 'cups doesn’t change during the event.', { mono: true }),
    tapbug('Two adds only add 1', ['setCount((c) => c + 1);', 'setCount(count + 1);'], [[2, 'setCount(count + 1);', 'setCount((c) => c + 1);']], 'Use the updater form whenever the new value depends on the old one.'),
    truth([
      ['State changes straight away, on the same line', false, 'The new value appears on the next draw.'],
      ['setCups((c) => c + 1) uses the latest value', true, 'Even in a row.'],
      ['Each draw sees its own fixed copy of the state', true, 'A snapshot.'],
    ]),
    recap([
      ['📸', 'State is a snapshot for each draw'],
      ['➕', 'Use (c) => c + 1 to build on the latest value'],
      ['⏭', 'New values show on the next draw'],
    ]),
  ]),

  lesson('r-b-3-3', 'Several pieces of state', 4, [
    chat(['A component can hold as many pieces of state as it needs: one useState for each value that changes on its own.', 'Anything you can work out from them doesn’t need its own state.']),
    tapPage('Order builder', 'Make it a large tea with no sugar.', app(ORDER), 'Large tea, no sugar', [{ click: '#large' }, { click: '#sugar' }], 'summary is worked out from size and sugar on every draw.'),
    reveal('State tips', [
      ['One useState per value', 'size and sugar change separately.'],
      ['Work out the rest', 'summary comes from state, so it is never out of date.'],
      ['Flip true and false', 'setSugar(!sugar) turns it on or off.'],
    ], { mono: true }),
    check('Should summary have its own useState?', ['No: work it out from size and sugar', 'Yes, always', 'Only if it is long', 'Only for numbers'], 'Stored copies can drift out of date.', 'Can you work it out?'),
    tapbug('Sugar never turns off', ['<button onClick={() => setSugar(true)}>Sugar</button>'], [[1, 'setSugar(true)', 'setSugar(!sugar)']], 'Flip the value instead of always setting true.'),
    recap([
      ['🧩', 'One useState for each changing value'],
      ['🧮', 'Work out everything else'],
      ['🔄', 'setX(!x) flips true and false'],
    ]),
  ]),

  challenge('r-b-3-ch', 'Module 3 Challenge', { icon: '🔄', name: 'State Keeper' }, ['Give components memory with useState', 'Update state from its latest value', 'Use several pieces of state, and work out the rest'], [
    mcq(1, 'What does useState(0) give back?', ['The value and a function to change it', 'Only the value', 'A number', 'Nothing'], 'A pair: [value, setValue].'),
    mcq(2, 'What happens after setCups(3)?', ['React draws the component again', 'Nothing', 'The page reloads', 'The app restarts'], 'With the new value.'),
    mcq(3, 'Which adds 1 using the latest value?', ['setCups((c) => c + 1)', 'setCups(cups++)', 'cups = cups + 1', 'setCups = cups + 1'], 'The updater form.', { mono: true }),
    mcq(4, 'Where does state live?', ['Inside the component that owns it', 'In the props', 'In the CSS', 'In the HTML file'], 'It is the component’s own memory.'),
    mcq(5, 'Which flips a true or false state?', ['setOpen(!open)', 'setOpen(open)', 'open = !open', 'setOpen(true)'], 'Not the old value.', { mono: true }),
    swipe([
      ['Changing a normal variable draws the page again', false, 'Only state does.'],
      ['State keeps its value between draws', true, 'It is memory.'],
      ['setCups(cups + 1) twice in a row adds 2', false, 'It adds 1: same snapshot.'],
      ['Values worked out from state don’t need their own state', true, 'Work them out.'],
    ]),
    pairs([['useState', 'Make state'], ['setCups', 'Change it'], ['(c) => c + 1', 'Use the latest value'], ['!sugar', 'Flip true and false']], 'State tools.'),
    pickCode('Which counter works?', ['const [n, setN] = useState(0); … onClick={() => setN(n + 1)}', 'let n = 0; … onClick={() => n++}', 'const n = useState(0); … onClick={() => n + 1}', 'useState(n = 0); … onClick={n}'], 'State, plus its setter in the handler.'),
    bugTask(['const [cups, setCups] = useState();', '  cups = cups + 1;', '<button onClick={add()}>Add</button>'], [[1, 'useState()', 'useState(0)'], [2, 'cups = cups + 1;', 'setCups(cups + 1);'], [3, '{add()}', '{add}']], 'Give state a starting value, change it with the setter, and pass the function (don’t call it).'),
    xray('<div class="card"><h3>Teas: 2</h3><p>Bill: ₹80</p><button>Add tea</button></div>', [
      ['h3', 'The count', 'Teas: {cups}', ['Teas: {cups}', '₹{cups * 40}', 'onClick={add}']],
      ['p', 'The bill', '₹{cups * 40}', ['₹{cups * 40}', 'Teas: {cups}', 'useState(0)']],
      ['button', 'The button', 'onClick={add}', ['onClick={add}', 'Teas: {cups}', '₹{cups * 40}']],
    ]),
    arrange(['import { useState } from "react";', 'function App() {', '  const [cups, setCups] = useState(2);', '  return <h3 className="card">Teas: {cups}</h3>;', '}'], 'import the hook, start the component, make the state, then show it'),
  ]),
];
