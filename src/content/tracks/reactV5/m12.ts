// React · Module 12 · Custom hooks and useRef. Lesson 12.1 keeps the old module id (r-hooks-1).
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const LIKES = `import { useState } from "react";

function Dish({ id, name }) {
  const [likes, setLikes] = useState(0);
  const [open, setOpen] = useState(false);
  function like() {
    setLikes(likes + 1);
    console.log(name + " likes: " + (likes + 1));
  }
  return (
    <div className="card">
      <h3>{name} · {likes} ♥</h3>
      <button id={id} onClick={like}>Like</button>
      <button onClick={() => setOpen(!open)}>{open ? "Less" : "More"}</button>
      {open && <p className="muted">Made fresh every morning</p>}
    </div>
  );
}

function App() {
  return <Dish id="like" name="Lemon Tea" />;
}`;

const HOOK = [
  'import { useState } from "react";',
  '',
  'function useCounter(start) {',
  '  const [count, setCount] = useState(start);',
  '  const add = () => setCount((c) => c + 1);',
  '  const remove = () => setCount((c) => Math.max(0, c - 1));',
  '  return { count, add, remove };',
  '}',
  '',
  'function DishRow({ id, name }) {',
  '  const { count, add, remove } = useCounter(0);',
  '  function plus() {',
  '    add();',
  '    console.log(name + ": " + (count + 1));',
  '  }',
  '  return (',
  '    <div className="card">',
  '      <h3>{name}: {count}</h3>',
  '      <button id={id + "-add"} onClick={plus}>+</button>',
  '      <button id={id + "-remove"} onClick={remove}>−</button>',
  '    </div>',
  '  );',
  '}',
  '',
  'function App() {',
  '  return (',
  '    <div>',
  '      <DishRow id="tea" name="Lemon Tea" />',
  '      <DishRow id="toast" name="Cheese Toast" />',
  '    </div>',
  '  );',
  '}',
];

const REF = `import { useRef } from "react";

function App() {
  const input = useRef(null);
  const taps = useRef(0);
  function focusName() {
    input.current.focus();
    taps.current = taps.current + 1;
    console.log("Focused: " + document.activeElement.id + " (tap " + taps.current + ")");
  }
  return (
    <div className="card">
      <label htmlFor="who">Name for the order</label>
      <input id="who" ref={input} />
      <button id="go" onClick={focusName}>Type your name</button>
    </div>
  );
}`;

export const R_M12: Lesson[] = [
  lesson('r-hooks-1', 'The rules of hooks', 5, [
    reveal('What is a hook?', [
      ['useState, useEffect…', 'Functions whose names start with use. They let a component remember things and keep in step.'],
      ['Rule 1 · Top level only', 'Call hooks at the top of a component, never inside if, loops or nested functions.'],
      ['Rule 2 · Only in React functions', 'In components or your own hooks, not in plain helper functions.'],
      ['Why?', 'React matches each hook to its state by the order they are called, on every draw.'],
    ]),
    tapPage('Two hooks, always in the same order', 'Like the Lemon Tea twice.', app(LIKES), 'Lemon Tea likes: 2', [{ click: '#like' }, { click: '#like' }], 'Every draw calls useState for likes first, then for open, so React never mixes them up.'),
    toggle('Inside an if, or at the top?', [
      ['Breaks the rules', ['function Dish({ name }) {', '  if (!name) return null;', '  const [likes, setLikes] = useState(0);', '}'], 'When name is empty, the hook is skipped, and React’s list of hooks gets out of order.'],
      ['Follows the rules', ['function Dish({ name }) {', '  const [likes, setLikes] = useState(0);', '  if (!name) return null;', '}'], 'The hook runs on every draw. The early return comes after it.'],
    ]),
    check('Where may you call useState?', ['At the top level of a component or custom hook', 'Inside an if', 'Inside a loop', 'Inside a click handler'], 'Same hooks, same order, every draw.', 'Which place runs on every draw, in the same order?', { mono: false }),
    tapbug('React says the hooks changed order', ['function Dish({ name }) {', '  if (!name) return null;', '  const [likes, setLikes] = useState(0);', '  return <p>{name}: {likes} likes</p>;', '}'], [[2, 'if (!name) return null;', 'const [likes, setLikes] = useState(0);'], [3, 'const [likes, setLikes] = useState(0);', 'if (!name) return null;']], 'Swap them: the early return skips the hook on some draws. Call hooks first.'),
    truth([
      ['Hook names start with use', true, 'useState, useEffect, useCounter.'],
      ['You may call a hook inside a loop', false, 'Top level only.'],
      ['A plain helper function can call useState', false, 'Only components and hooks.'],
    ]),
    recap([
      ['🔝', 'Call hooks at the top level'],
      ['⚛️', 'Only in components and hooks'],
      ['🔢', 'Same hooks, same order, every draw'],
    ]),
  ], 'intermediate'),

  lesson('r-b-12-2', 'Writing a custom hook', 6, [
    chat(['Two components need the same logic: a count with + and − buttons.', 'Move the hooks into your own function whose name starts with use. That is a custom hook.']),
    tapPage('One hook, two counters', 'Add one tea and two toasts.', app(HOOK.join('\n')), 'Cheese Toast: 2', [{ click: '#tea-add' }, { click: '#toast-add' }, { click: '#toast-add' }], 'Each DishRow calls useCounter, so each gets its own count.'),
    explore('Inside the hook', HOOK, [
      [3, 'A custom hook is a function whose name starts with use.'],
      [4, 'It can call other hooks, like useState.'],
      [7, 'It gives back what components need.'],
      [11, 'A component calls it like any hook.', '#tea-add'],
    ], { page: app(HOOK.join('\n')), minTaps: 3 }),
    check('Two components call useCounter(0). Do they share one count?', ['No, each gets its own state', 'Yes, they share it', 'Only if they are siblings', 'Only the first one works'], 'A custom hook shares logic, not state.', 'Each call runs its own useState.', { mono: false }),
    tapbug('React doesn’t treat it as a hook', ['function counter(start) {', '  const [count, setCount] = useState(start);', '  return { count, setCount };', '}'], [[1, 'function counter(', 'function useCounter(']], 'Custom hook names must start with use, so React and its tools can check the rules.'),
    recap([
      ['🪝', 'A custom hook is a use… function'],
      ['♻️', 'It shares logic between components'],
      ['🔒', 'Each component still gets its own state'],
    ]),
  ], 'intermediate'),

  lesson('r-b-12-3', 'useRef', 5, [
    reveal('useRef', [
      ['const box = useRef(0)', 'A box that keeps a value between draws.'],
      ['box.current', 'Read or change what is inside.'],
      ['No redraw', 'Changing box.current doesn’t draw again. State does.'],
      ['ref={input}', 'Point it at an element, to focus or measure it.'],
    ], { mono: true }),
    tapPage('Jump to the name box', 'Tap “Type your name”.', app(REF), 'Focused: who', [{ click: '#go' }], 'ref={input} lets your code reach the real input element.'),
    toggle('State or ref?', [
      ['State', ['const [taps, setTaps] = useState(0);', 'setTaps(taps + 1); // draws again'], 'Use state for anything the screen shows.'],
      ['Ref', ['const taps = useRef(0);', 'taps.current += 1; // no redraw'], 'Use a ref for values the screen doesn’t show, like a timer id.'],
    ]),
    check('You change ref.current. What does React do?', ['Nothing: it doesn’t draw again', 'Draws the component again', 'Throws an error', 'Resets the ref'], 'Refs are for values the screen doesn’t show.', 'Is a ref state?', { mono: false }),
    matchUp('Which one?', [['A count on screen', 'useState'], ['A timer id to clear later', 'useRef'], ['Focus an input', 'ref={input}'], ['A total of the cart', 'Neither: work it out']], 'State for the screen, refs for the rest.'),
    recap([
      ['📦', 'useRef keeps a value without redrawing'],
      ['🎯', 'ref={…} reaches a real element'],
      ['🖥', 'Anything shown on screen is state'],
    ]),
  ], 'intermediate'),

  challenge('r-i-12-ch', 'Module 12 Challenge', { icon: '🪝', name: 'Hook Crafter' }, ['Follow the rules of hooks', 'Write custom hooks to share logic', 'Use refs for elements and hidden values'], [
    mcq(1, 'What must a custom hook’s name start with?', ['use', 'hook', 'get', 'my'], 'Like useCounter.'),
    mcq(2, 'Where can hooks be called?', ['At the top level of components and custom hooks', 'Inside if statements', 'Inside loops', 'In any JavaScript function'], 'Same order, every draw.'),
    mcq(3, 'Two components use the same custom hook. What do they share?', ['The logic, but each has its own state', 'The same state', 'Nothing at all', 'Only the props'], 'Each call has its own state.'),
    mcq(4, 'What does changing ref.current do?', ['Keeps the new value without drawing again', 'Draws the component again', 'Resets all state', 'Nothing is kept'], 'Refs don’t redraw.'),
    mcq(5, 'Which hook gives your code the real input element, to focus it?', ['useRef', 'useState', 'useEffect', 'useInput'], 'ref={input}, then input.current.focus().'),
    swipe([
      ['Hooks must run in the same order on every draw', true, 'That is how React matches them.'],
      ['A custom hook can call other hooks', true, 'Like useState inside useCounter.'],
      ['You can call useState inside a click handler', false, 'Top level only.'],
      ['Changing a ref redraws the screen', false, 'Only state does.'],
    ]),
    pairs([['useState', 'Remember and redraw'], ['useEffect', 'Keep in step with outside'], ['useRef', 'Remember, no redraw'], ['useCounter', 'Your own hook']], 'Hooks.'),
    pickCode('Which is a correct custom hook?', ['function useOpen() { const [open, setOpen] = useState(false); return [open, () => setOpen(!open)]; }', 'function open() { const [open, setOpen] = useState(false); return open; }', 'function useOpen(x) { if (x) { useState(false); } }', 'const useOpen = useState(false);'], 'Named use…, with hooks at the top level.'),
    bugTask(['function toggle(start) {', '  const [on, setOn] = useState(start);', '  return [on, () => setOn(!on)];', '}', 'function Dish({ name }) {', '  if (!name) return null;', '  const [open, flip] = toggle(false);', '}'], [[1, 'function toggle(', 'function useToggle('], [6, 'if (!name) return null;', 'const [open, flip] = useToggle(false);'], [7, 'const [open, flip] = toggle(false);', 'if (!name) return null;']], 'Name the hook use…, and call it before any early return.'),
    xray('<div class="card"><label>Name for the order</label><input id="who"><button>Type your name</button><h3>Lemon Tea: 2</h3></div>', [
      ['input', 'The name box', 'ref={input}', ['ref={input}', 'input.current.focus()', 'useCounter(0)']],
      ['button', 'The button', 'input.current.focus()', ['ref={input}', 'input.current.focus()', 'useCounter(0)']],
      ['h3', 'The count', 'useCounter(0)', ['ref={input}', 'input.current.focus()', 'useCounter(0)']],
    ]),
    arrange(['import { useState } from "react";', 'function useCounter(start) {', '  const [count, setCount] = useState(start);', '  return [count, setCount];', '}', 'const App = () => <p className="card">Teas: {useCounter(2)[0]}</p>;'], 'import, start the hook, keep the state, give it back, close it, then use it in App'),
  ], { level: 'intermediate' }),
];
