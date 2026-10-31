// React · Module 4 · Events. Lesson 4.1 keeps the old module id (r-event-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const BUTTONS = `function App() {
  function order(dish) {
    console.log("Ordered: " + dish);
  }
  return (
    <div className="card">
      <button id="tea" onClick={() => order("Lemon Tea")}>Lemon Tea</button>
      <button id="toast" onClick={() => order("Cheese Toast")}>Cheese Toast</button>
    </div>
  );
}`;

const PASS = ['import { useState } from "react";', '', 'function OrderButton({ id, dish, onOrder }) {', '  return <button id={id} onClick={() => onOrder(dish)}>Add {dish}</button>;', '}', '', 'function App() {', '  const [cart, setCart] = useState([]);', '  function add(dish) {', '    const next = [...cart, dish];', '    setCart(next);', '    console.log("Cart: " + next.length + " items");', '  }', '  return (', '    <div className="card">', '      <OrderButton id="b0" dish="Lemon Tea" onOrder={add} />', '      <OrderButton id="b1" dish="Cheese Toast" onOrder={add} />', '      <p>{cart.join(", ") || "Cart is empty"}</p>', '    </div>', '  );', '}'];

const FORM = `import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  function send(e) {
    e.preventDefault();
    console.log("Sent for " + name);
  }
  return (
    <form id="f" className="card" onSubmit={send}>
      <label htmlFor="who">Your name</label>
      <input id="who" value={name} onChange={(e) => setName(e.target.value)} />
      <button id="send">Send</button>
    </form>
  );
}`;

export const R_M4: Lesson[] = [
  lesson('r-event-1', 'Handling clicks', 5, [
    reveal('Events in React', [
      ['onClick={add}', 'Pass the function. React calls it on each tap.'],
      ['onClick={add()}', 'Wrong: this calls add while drawing, not on a tap.'],
      ['onClick={() => order("Tea")}', 'An arrow function lets you pass a value.'],
      ['onChange, onSubmit', 'Event names are camelCase.'],
    ], { mono: true }),
    tapPage('Order buttons', 'Tap a dish to order it.', app(BUTTONS), 'Ordered: Cheese Toast', [{ click: '#toast' }], 'Each button passes its own dish to the same function.'),
    check('Which runs order only when the button is tapped?', ['onClick={() => order("Tea")}', 'onClick={order("Tea")}', 'onclick="order()"', 'onClick=order'], 'Wrap the call in an arrow function.', 'Which waits for the tap?', { mono: true }),
    tapbug('It orders a tea as soon as the page opens', ['<button onClick={order("Tea")}>Tea</button>'], [[1, '{order("Tea")}', '{() => order("Tea")}']], 'order("Tea") runs straight away while drawing. Give React a function to call later.'),
    matchUp('Event names', [['onClick', 'A tap'], ['onChange', 'Typing or choosing'], ['onSubmit', 'Sending a form'], ['onMouseEnter', 'The pointer moves over']], 'camelCase names.'),
    recap([
      ['👆', 'onClick={handler} runs on each tap'],
      ['➡️', '() => fn(value) passes a value'],
      ['🐫', 'Event names are camelCase'],
    ]),
  ]),

  lesson('r-b-4-2', 'Passing handlers as props', 5, [
    chat(['Often the button lives in a small component, but the action belongs to its parent.', 'Pass the function down as a prop, like onOrder={add}.']),
    tapPage('A reusable button', 'Tap both buttons.', app(PASS.join('\n')), 'Cart: 2 items', [{ click: '#b0' }, { click: '#b1' }], 'OrderButton doesn’t know what “order” means. App decides.'),
    explore('Who does what', PASS, [
      [3, 'OrderButton takes the dish and a function, onOrder.'],
      [4, 'On a tap, it calls onOrder with its dish.', '#b0'],
      [9, 'App’s add function updates the cart.'],
      [16, 'App passes add down as onOrder.'],
    ], { page: app(PASS.join('\n')), minTaps: 3 }),
    check('Who decides what happens when OrderButton is tapped?', ['The parent, through the onOrder prop', 'OrderButton itself', 'The browser', 'Nobody'], 'Handlers flow down as props.', 'Where is add written?'),
    tapbug('onOrder is not a function', ['<OrderButton dish="Tea" onorder={add} />'], [[1, 'onorder', 'onOrder']], 'Prop names must match exactly, capitals included.'),
    recap([
      ['📬', 'Pass handlers down as props'],
      ['🏷', 'Name them onSomething'],
      ['🧩', 'Small parts stay reusable'],
    ]),
  ]),

  lesson('r-b-4-3', 'Event objects and preventDefault', 5, [
    reveal('The event object', [
      ['(e) => …', 'React passes an event object, often called e.'],
      ['e.target', 'The element that was tapped or typed in.'],
      ['e.target.value', 'What is in an input right now.'],
      ['e.preventDefault()', 'Stop the browser’s own action, like a form reloading the page.'],
    ], { mono: true }),
    tapPage('A form that doesn’t reload', 'Type a name and tap Send.', app(FORM), 'Sent for Ava', [{ type: ['#who', 'Ava'] }, { submit: '#f' }], 'preventDefault keeps the page (and your app) where it is.'),
    check('What does e.preventDefault() do in onSubmit?', ['Stops the page from reloading', 'Sends the form', 'Clears the form', 'Nothing'], 'Forms reload the page by default.', 'It prevents the default.'),
    tapbug('The page reloads when the form is sent', ['function send(e) {', '  console.log("Sent");', '}'], [[2, 'console.log("Sent");', 'e.preventDefault(); console.log("Sent");']], 'Stop the form’s default action first.'),
    truth([
      ['htmlFor is JSX’s name for a label’s for', true, 'for is a JavaScript word.'],
      ['e.target.value holds what was typed', true, 'Read it in onChange.'],
      ['React event names are all small letters', false, 'camelCase: onClick.'],
    ]),
    recap([
      ['🎯', 'e.target is what was tapped or typed in'],
      ['⌨️', 'e.target.value is what was typed'],
      ['✋', 'e.preventDefault() stops the reload'],
    ]),
  ]),

  challenge('r-b-4-ch', 'Module 4 Challenge', { icon: '👆', name: 'Event Handler' }, ['Respond to taps with onClick', 'Pass handlers down as props', 'Use the event object and stop form reloads'], [
    mcq(1, 'Which attaches a tap handler?', ['onClick={add}', 'onclick="add"', 'click={add}', 'onTap={add()}'], 'camelCase, with the function in braces.', { mono: true }),
    mcq(2, 'What does onClick={add()} do?', ['Runs add while drawing, not on a tap', 'Waits for a tap', 'Nothing', 'Runs add twice'], 'It calls it straight away.'),
    mcq(3, 'How do you pass a value to a handler?', ['onClick={() => order("Tea")}', 'onClick={order, "Tea"}', 'onClick="order(Tea)"', 'onClick={order}("Tea")'], 'Wrap it in an arrow function.', { mono: true }),
    mcq(4, 'What is e.target.value in an input’s onChange?', ['What is in the input now', 'The input’s id', 'The old value', 'The label'], 'What was typed.'),
    mcq(5, 'Which stops a form reloading the page?', ['e.preventDefault()', 'e.stop()', 'return false only', 'e.cancel()'], 'Call it first in onSubmit.', { mono: true }),
    swipe([
      ['React event names are camelCase', true, 'onClick, onChange.'],
      ['onClick={add()} waits for a tap', false, 'It runs straight away.'],
      ['A handler can be passed as a prop', true, 'onOrder={add}.'],
      ['Labels use for in JSX', false, 'htmlFor.'],
    ]),
    pairs([['onClick', 'A tap'], ['onChange', 'Typing'], ['onSubmit', 'Sending a form'], ['e.preventDefault()', 'Stop the default']], 'Event tools.'),
    pickCode('Which button orders a tea when tapped?', ['<button onClick={() => order("Tea")}>Tea</button>', '<button onClick={order("Tea")}>Tea</button>', '<button onclick="order()">Tea</button>', '<button click={order}>Tea</button>'], 'An arrow function that calls order.'),
    bugTask(['<button onClick={order("Tea")}>Tea</button>', '<label for="who">Name</label>', '<OrderButton onorder={add} />'], [[1, '{order("Tea")}', '{() => order("Tea")}'], [2, 'for=', 'htmlFor='], [3, 'onorder', 'onOrder']], 'Pass a function, use htmlFor, and match prop names exactly.'),
    xray('<form class="card"><label>Your name</label><input value="Ava"><button>Send</button></form>', [
      ['input', 'The name box', 'onChange={(e) => setName(e.target.value)}', ['onChange={(e) => setName(e.target.value)}', 'onSubmit={send}', 'htmlFor="who"']],
      ['form', 'The whole form', 'onSubmit={send}', ['onSubmit={send}', 'onChange={(e) => setName(e.target.value)}', 'htmlFor="who"']],
      ['label', 'The label', 'htmlFor="who"', ['htmlFor="who"', 'onSubmit={send}', 'onChange={(e) => setName(e.target.value)}']],
    ]),
    arrange(['function App() {', '  const greet = () => console.log("Hello");', '  return <button className="card" onClick={greet}>Say hello</button>;', '}'], 'start the component, write the handler, then attach it to the button'),
  ]),
];
