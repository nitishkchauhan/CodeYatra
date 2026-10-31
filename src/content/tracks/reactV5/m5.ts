// React · Module 5 · Showing things conditionally. Lesson 5.1 keeps the old module id (r-cond-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const VEG = `import { useState } from "react";

const MENU = [
  { name: "Lemon Tea", veg: true },
  { name: "Cheese Toast", veg: true },
  { name: "Chicken Sandwich", veg: false },
];

function App() {
  const [vegOnly, setVegOnly] = useState(false);
  console.log("Showing: " + (vegOnly ? "Veg only" : "Everything"));
  return (
    <div className="card">
      <button id="veg" onClick={() => setVegOnly(!vegOnly)}>Toggle veg</button>
      {vegOnly && <p className="ok">🌱 Veg only</p>}
      <p>{vegOnly ? "2 veg dishes" : "3 dishes"}</p>
    </div>
  );
}`;

const ways = (label: string, body: string[], caption: string): [string, string[], string, ReturnType<typeof app>] => {
  const code = ['function App() {', '  const open = true;', ...body, '}'];
  return [label, code, caption, app(code.join('\n'))];
};

const SCREENS = ['import { useState } from "react";', '', 'function App() {', '  const [status, setStatus] = useState("loading");', '  console.log("Screen: " + status);', '  let screen;', '  if (status === "loading") screen = <p className="muted">Loading the menu…</p>;', '  else if (status === "empty") screen = <p>No dishes today. Check back tomorrow!</p>;', '  else if (status === "error") screen = <p className="err">Couldn’t load the menu. Try again.</p>;', '  else screen = <p className="ok">Lemon Tea · Cheese Toast</p>;', '  return (', '    <div className="card">', '      {screen}', '      <button id="ready" onClick={() => setStatus("ready")}>Ready</button>', '      <button id="empty" onClick={() => setStatus("empty")}>Empty</button>', '      <button id="error" onClick={() => setStatus("error")}>Error</button>', '    </div>', '  );', '}'];

const BANNER = `import { useState } from "react";

function Offer({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="card">
      <strong>Today only: 10% off sandwiches</strong>
      <button id="close" onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  const [show, setShow] = useState(true);
  console.log(show ? "Banner shown" : "Banner hidden");
  return (
    <div>
      <Offer show={show} onClose={() => setShow(false)} />
      <p>Menu: Lemon Tea, Cheese Toast</p>
    </div>
  );
}`;

export const R_M5: Lesson[] = [
  lesson('r-cond-1', 'if, && and ? :', 5, [
    reveal('Three ways to choose', [
      ['if (…) return …', 'Choose a whole different result, before the JSX.'],
      ['{cond && <X />}', 'Show X, or nothing.'],
      ['{cond ? <A /> : <B />}', 'Show A or B.'],
    ], { mono: true }),
    tapPage('A veg filter', 'Tap Toggle veg.', app(VEG), 'Showing: Veg only', [{ click: '#veg' }], '&& shows the badge only when vegOnly is true; ? : picks the text.'),
    toggle('Same idea, three ways', [
      ways('if', ['  if (open) return <p className="ok">We are open</p>;', '  return <p className="err">Closed</p>;'], 'if returns one result or the other.'),
      ways('&&', ['  return <div>{open && <p className="ok">We are open</p>}</div>;'], 'Shows the line only when open is true.'),
      ways('? :', ['  return <p>{open ? "We are open" : "Closed"}</p>;'], 'Picks one of two.'),
    ]),
    check('What does {count > 0 && <p>In cart</p>} show when count is 0?', ['Nothing', '0', 'false', 'An error'], '0 > 0 is false, and false draws nothing.', 'Work out the left side first.', { mono: true }),
    tapbug('A stray 0 appears on the page', ['{cart.length && <p>In your cart</p>}'], [[1, 'cart.length &&', 'cart.length > 0 &&']], 'With &&, a 0 on the left is drawn as 0. Compare, so the left side is true or false.'),
    recap([
      ['🔀', 'if, && and ? : choose what to show'],
      ['🫥', '&& shows something or nothing'],
      ['⚠️', 'Compare numbers before && to avoid a stray 0'],
    ]),
  ]),

  lesson('r-b-5-2', 'Empty, loading and error screens', 5, [
    chat(['Real screens don’t always have data. It may be loading, there may be nothing, or something may have failed.', 'Good apps plan a screen for each state, so users never see a blank page.']),
    tapPage('Every state', 'Tap each button and watch the message change.', app(SCREENS.join('\n')), 'Screen: error', [{ click: '#error' }], 'One piece of state, status, decides what to show.'),
    explore('Choosing a screen', SCREENS, [
      [4, 'status says which state the screen is in.'],
      [7, 'Loading: show something straight away.'],
      [8, 'Empty: it worked, but there is nothing. Be friendly.'],
      [9, 'Error: say what to do next.'],
    ], { page: app(SCREENS.join('\n')), minTaps: 3 }),
    check('The menu loaded fine but has no dishes. Which screen?', ['An empty message, like “No dishes today”', 'The loading message', 'An error', 'A blank page'], 'It worked; there is just nothing to show.', 'Did anything fail?'),
    truth([
      ['A blank screen is fine while data loads', false, 'Show a loading message.'],
      ['Empty and error are different states', true, 'One worked, one failed.'],
      ['One state value can choose between many screens', true, 'status.'],
    ]),
    recap([
      ['⏳', 'Loading: show something at once'],
      ['📭', 'Empty: a friendly message'],
      ['🧯', 'Error: say what to do next'],
    ]),
  ]),

  lesson('r-b-5-3', 'Returning null', 4, [
    reveal('null draws nothing', [
      ['return null;', 'A component can choose to draw nothing.'],
      ['if (!show) return null;', 'Hide a whole component when it isn’t needed.'],
      ['The parent decides', 'Pass show as a prop; the child hides itself.'],
    ], { mono: true }),
    tapPage('Close the offer', 'Tap Close on the offer.', app(BANNER), 'Banner hidden', [{ click: '#close' }], 'Offer returns null, so it disappears, and the menu stays.'),
    check('What does return null; do in a component?', ['Draws nothing', 'Shows the word null', 'Crashes the app', 'Deletes the component file'], 'Nothing appears on the page.', 'null means nothing.'),
    tapbug('The offer only shows after it is closed', ['function Offer({ show }) {', '  if (show) return null;'], [[2, 'if (show)', 'if (!show)']], 'Hide it when show is false.'),
    matchUp('Which tool?', [['if (…) return …', 'Choose a whole result'], ['cond && <X />', 'Show X or nothing'], ['cond ? <A /> : <B />', 'Choose between two'], ['return null', 'Draw nothing']], 'Four ways to show things conditionally.'),
    recap([
      ['🫥', 'return null draws nothing'],
      ['👪', 'The parent decides with a prop'],
      ['🧰', 'Pick the tool that reads most clearly'],
    ]),
  ]),

  challenge('r-b-5-ch', 'Module 5 Challenge', { icon: '🔀', name: 'Show and Hide' }, ['Choose what to show with if, && and ? :', 'Plan loading, empty and error screens', 'Hide components with return null'], [
    mcq(1, 'Which shows <Badge /> only when veg is true?', ['{veg && <Badge />}', '{veg || <Badge />}', '{if (veg) <Badge />}', '{veg : <Badge />}'], '&& shows it or nothing.', { mono: true }),
    mcq(2, 'Which picks between two texts?', ['{open ? "Open" : "Closed"}', '{open && "Open" : "Closed"}', '{open || "Closed"}', '{open ?? "Open"}'], 'The ternary ? :.', { mono: true }),
    mcq(3, 'What does a component draw when it returns null?', ['Nothing', 'null', 'An empty box', 'An error'], 'Nothing at all.'),
    mcq(4, 'Why might a 0 appear on the page?', ['{count && …} draws 0 when count is 0', 'React adds it', 'CSS shows it', 'A bug in the browser'], 'Compare first: count > 0 && ….'),
    mcq(5, 'Data is still on its way. What should the user see?', ['A loading message', 'A blank page', 'An error', 'Old data forever'], 'Show something straight away.'),
    swipe([
      ['false in JSX draws nothing', true, 'Like null.'],
      ['if can be used inside JSX braces', false, 'Use it before the return, or use ? :.'],
      ['Empty and error screens are the same thing', false, 'One worked, one failed.'],
      ['return null hides a component', true, 'It draws nothing.'],
    ]),
    pairs([['&&', 'Show or nothing'], ['? :', 'Choose between two'], ['return null', 'Draw nothing'], ['status', 'Which screen to show']], 'Conditional tools.'),
    pickCode('Which shows “Sold out” only when stock is 0?', ['{stock === 0 && <p>Sold out</p>}', '{stock && <p>Sold out</p>}', '{stock ? <p>Sold out</p> : null}', '{if (stock === 0) <p>Sold out</p>}'], 'Compare, then &&.'),
    bugTask(['{cart.length && <p>In cart</p>}', '  if (show) return null;  // hide when not shown', '{open && "Open" : "Closed"}'], [[1, 'cart.length &&', 'cart.length > 0 &&'], [2, 'if (show)', 'if (!show)'], [3, '&&', '?']], 'Compare before &&, hide when show is false, and use ? : to choose between two.'),
    xray('<div class="card"><p class="ok">🌱 Veg only</p><p>2 veg dishes</p><button>Toggle veg</button></div>', [
      ['.ok', 'The veg badge', '{vegOnly && <p>…</p>}', ['{vegOnly && <p>…</p>}', '{vegOnly ? "2 veg dishes" : "3 dishes"}', 'onClick={() => setVegOnly(!vegOnly)}']],
      ['p:not(.ok)', 'The dish count', '{vegOnly ? "2 veg dishes" : "3 dishes"}', ['{vegOnly ? "2 veg dishes" : "3 dishes"}', '{vegOnly && <p>…</p>}', 'onClick={() => setVegOnly(!vegOnly)}']],
      ['button', 'The toggle', 'onClick={() => setVegOnly(!vegOnly)}', ['onClick={() => setVegOnly(!vegOnly)}', '{vegOnly && <p>…</p>}', '{vegOnly ? "2 veg dishes" : "3 dishes"}']],
    ]),
    arrange(['function App() {', '  const open = true;', '  return <p className="card">{open ? "We are open" : "Closed"}</p>;', '}'], 'start the component, set open, then choose the text'),
  ]),
];
