// Extra practice for each React module.
import { bug, order, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · REACT';

export const REACT_DRILLS: Record<string, Step[]> = {
  'r-comp-1': [
    quiz({ prompt: 'Which is a valid component name?', options: ['CourseCard', 'courseCard', 'course-card', '_courseCard'], right: 'Right. Components start with a capital letter.', wrong: 'React treats lowercase names as HTML tags.', mono: true }),
    quiz({ prompt: 'How do you show the value of fee in JSX?', options: ['{fee}', '${fee}', '{{fee}}', '"fee"'], right: 'Right. Curly braces hold JavaScript.', wrong: 'In JSX, {fee} inserts the value.', mono: true }),
    quiz({ prompt: 'What is <>…</>?', options: ['A fragment: groups elements without adding a DOM element', 'An empty div', 'A comment', 'An error'], right: 'Right.', wrong: 'Fragments group children without an extra element.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This JSX doesn’t compile. Tap the buggy line.', lang: 'jsx', lines: ['return (', '  <div>', '    <img src="logo.png">', '  </div>', ');'], bug: 2, fix: '    <img src="logo.png" />', explain: 'JSX requires every tag to be closed, including <img />.' }),
  ],
  'r-props': [
    quiz({ prompt: 'What does function Card({ title }) do with the props object?', options: ['Destructures the title prop', 'Creates a title prop', 'Copies all props', 'Nothing'], right: 'Right.', wrong: 'The braces destructure title out of the props object.', mono: true }),
    quiz({ prompt: 'When is a default like { weeks = 12 } used?', options: ['When weeks is missing or undefined', 'When weeks is 0', 'When weeks is null', 'Always'], right: 'Right. 0 and null are real values, so they don’t trigger the default.', wrong: 'Defaults only replace undefined.' }),
    quiz({ prompt: 'Can props pass functions?', options: ['Yes, like onAdd={handleAdd}', 'No, only strings', 'Only with context', 'Only numbers and strings'], right: 'Right. That is how children tell parents about events.', wrong: 'Any JavaScript value can be a prop, including functions.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The fee shows twice as big after every render. Tap the buggy line.', lang: 'jsx', lines: ['function Fee(props) {', '  props.amount = props.amount * 2;', '  return <p>₹{props.amount}</p>;', '}'], bug: 1, fix: '  const doubled = props.amount * 2;', explain: 'Never change props. Compute a new value instead.' }),
  ],
  'r-state-1': [
    quiz({ prompt: 'Why doesn’t let count = 0; count++ update the screen?', options: ['Changing a normal variable doesn’t re-render, and it resets every render', 'let is not allowed in React', 'count++ is a syntax error', 'It needs a key'], right: 'Right. State does both: it remembers and re-renders.', wrong: 'Only state setters trigger a re-render and keep the value.' }),
    quiz({ prompt: 'seats is 1. setSeats(seats + 1) is called twice in one click. What is seats next render?', options: ['2', '3', '1', '4'], right: 'Right. Both calls used the snapshot 1.', wrong: 'seats is a snapshot, so both calls set it to 1 + 1 = 2.', mono: true }),
    quiz({ prompt: 'Where can you call useState?', options: ['At the top level of a component', 'Inside an if', 'Inside a loop', 'Inside an event handler'], right: 'Right.', wrong: 'Hooks go at the top level, the same order every render.' }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange a like button.', lang: 'jsx', lines: ['function Like() {', '  const [liked, setLiked] = useState(false);', '  return <button onClick={() => setLiked(l => !l)}>{liked ? "♥" : "♡"}</button>;', '}'], explain: 'State at the top, then the button flips it with an updater.' }),
  ],
  'r-event-1': [
    quiz({ prompt: 'Which is the React name for a click handler?', options: ['onClick', 'onclick', 'click', 'on-click'], right: 'Right. Events are camelCase.', wrong: 'React events are camelCase props, like onClick.', mono: true }),
    quiz({ prompt: 'A child button should tell the parent it was tapped. How?', options: ['The parent passes a function prop like onAdd and the child calls it', 'The child changes the parent’s state directly', 'Use document.querySelector', 'It can’t'], right: 'Right.', wrong: 'Pass a handler down as a prop; the child calls it.' }),
    quiz({ prompt: 'What does e.stopPropagation() do?', options: ['Stops the event reaching parent elements’ handlers', 'Stops the default browser action', 'Cancels the render', 'Removes the handler'], right: 'Right. preventDefault() is the one for default actions.', wrong: 'stopPropagation stops bubbling; preventDefault stops default actions.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The delete runs as soon as the page loads. Tap the buggy line.', lang: 'jsx', lines: ['<button onClick={remove(course.id)}>', '  Delete', '</button>'], bug: 0, fix: '<button onClick={() => remove(course.id)}>', explain: 'Wrap it in an arrow so it runs on tap, not during render.' }),
  ],
  'r-cond-1': [
    quiz({ prompt: 'Which shows <Badge /> only when isNew is true?', options: ['{isNew && <Badge />}', '{isNew ? <Badge />}', '{if (isNew) <Badge />}', '<Badge if={isNew} />'], right: 'Right.', wrong: 'Use && (or ? :). You can’t write if inside JSX.', mono: true }),
    quiz({ prompt: 'Which values render nothing in JSX?', options: ['null, undefined, true and false', '0 and ""', 'Only null', 'Every falsy value'], right: 'Right. 0 does render, which causes the 0 trap.', wrong: '0 renders as text; null, undefined and booleans render nothing.' }),
    quiz({ prompt: 'Where can you use a plain if statement?', options: ['In the component body before return', 'Directly inside JSX braces', 'Only in hooks', 'Nowhere in React'], right: 'Right. JSX braces take expressions, not statements.', wrong: 'if is a statement; use it above the return, or ? : inside JSX.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'An empty inbox shows a 0. Tap the buggy line.', lang: 'jsx', lines: ['<header>', '  {unread && <span className="dot">{unread}</span>}', '</header>'], bug: 1, fix: '  {unread > 0 && <span className="dot">{unread}</span>}', explain: 'Compare first so the left side is true or false, not 0.' }),
  ],
  'r-list-1': [
    quiz({ prompt: 'Why are array indexes risky as keys?', options: ['They shift when items are added, removed or sorted', 'They are too short', 'React doesn’t allow numbers', 'They are slow'], right: 'Right. Then state can attach to the wrong item.', wrong: 'Index keys move with position, not with the item.' }),
    quiz({ prompt: 'Where does the key go?', options: ['On the outermost element returned from map', 'On the <ul>', 'On every child inside the item', 'In the item’s props.key'], right: 'Right.', wrong: 'Put key on the element map returns. Components can’t read it as a prop.' }),
    quiz({ prompt: 'Why use toSorted() instead of sort() on state?', options: ['sort() changes the original array; toSorted() returns a copy', 'toSorted is faster', 'sort() doesn’t work on objects', 'No reason'], right: 'Right.', wrong: 'sort() mutates. toSorted() leaves the original alone.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'React warns about keys. Tap the buggy line.', lang: 'jsx', lines: ['{trains.map(t => (', '  <TrainRow key={Math.random()} train={t} />', '))}'], bug: 1, fix: '  <TrainRow key={t.id} train={t} />', explain: 'Random keys change every render, so React rebuilds every row. Use a stable id.' }),
  ],
  'r-form': [
    quiz({ prompt: 'What makes an input “controlled”?', options: ['Its value comes from state and onChange updates that state', 'It has a name attribute', 'It is inside a form', 'It uses a ref'], right: 'Right.', wrong: 'Controlled means React state is the source of truth for its value.' }),
    quiz({ prompt: 'For a checkbox, which property holds its state?', options: ['checked (read e.target.checked)', 'value', 'selected', 'on'], right: 'Right.', wrong: 'Checkboxes use checked, not value.', mono: true }),
    quiz({ prompt: 'Why handle onSubmit on the form instead of onClick on the button?', options: ['It also runs when someone presses Enter', 'Buttons can’t have onClick', 'It is faster', 'It validates automatically'], right: 'Right.', wrong: 'onSubmit covers both the button and the Enter key.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Typing in the box does nothing. Tap the buggy line.', lang: 'jsx', lines: ['const [phone, setPhone] = useState("");', '<input value={phone} onChange={e => setPhone(phone)} />'], bug: 1, fix: '<input value={phone} onChange={e => setPhone(e.target.value)} />', explain: 'Set the new text from e.target.value, not the old state.' }),
  ],
  'r-immut': [
    quiz({ prompt: 'Which adds a course to cart state correctly?', options: ['setCart([...cart, course])', 'cart.push(course)', 'setCart(cart.push(course))', 'cart[cart.length] = course'], right: 'Right.', wrong: 'Make a new array with spread. push changes the old one and returns a number.', mono: true }),
    quiz({ prompt: 'Which updates just the city in user.address?', options: ['setUser({ ...user, address: { ...user.address, city: "Pune" } })', 'user.address.city = "Pune"', 'setUser({ city: "Pune" })', 'setUser({ ...user, city: "Pune" })'], right: 'Right. Copy each level you change.', wrong: 'Copy user and address, then override city.', mono: true }),
    quiz({ prompt: 'How does React tell whether state changed?', options: ['Object.is(old, new): same reference means no change', 'It compares every field deeply', 'It always re-renders', 'It asks the component'], right: 'Right.', wrong: 'React compares by reference with Object.is.' }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange a rename that doesn’t mutate.', lang: 'jsx', lines: ['function rename(id, name) {', '  setCourses(courses.map(c =>', '    c.id === id ? { ...c, name } : c', '  ));', '}'], explain: 'map to a new array, copying only the matching course.' }),
  ],
  'r-children-1': [
    quiz({ prompt: 'What type of thing can children be?', options: ['Any JSX: text, elements or many elements', 'Only a string', 'Only one element', 'Only components'], right: 'Right.', wrong: 'children can be any renderable content.' }),
    quiz({ prompt: 'Layout takes header={<Logo />}. What is that pattern?', options: ['Passing JSX as a prop (a slot)', 'A hook', 'Context', 'An error'], right: 'Right. Any prop can hold JSX.', wrong: 'Props can carry JSX, which works like a named slot.' }),
    quiz({ prompt: 'In which direction does data flow through props?', options: ['Down, from parent to child', 'Up, from child to parent', 'Sideways between siblings', 'Any direction'], right: 'Right. Children report up by calling functions they were given.', wrong: 'Props flow down the tree.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The modal shows its frame but nothing inside. Tap the buggy line.', lang: 'jsx', lines: ['function Modal({ title, children }) {', '  return <div className="modal"><h2>{title}</h2>{title}</div>;', '}'], bug: 1, fix: '  return <div className="modal"><h2>{title}</h2>{children}</div>;', explain: 'Render {children} where the nested content should appear.' }),
  ],
  'r-lift-1': [
    quiz({ prompt: 'Two sibling components need the same selected tab. What do you do?', options: ['Keep it in their parent and pass it down', 'Give each its own state', 'Use a global variable', 'Store it in a key'], right: 'Right.', wrong: 'Lift shared state to the closest common parent.' }),
    quiz({ prompt: 'fullName can be built from first and last. Should it be state?', options: ['No, compute it during render', 'Yes, its own useState', 'Only with useEffect', 'Store it in a ref'], right: 'Right.', wrong: 'Values you can calculate should be calculated, not stored.' }),
    quiz({ prompt: 'A child receives value and onChange props and no state of its own. It is…', options: ['Controlled by its parent', 'Broken', 'Uncontrolled', 'A hook'], right: 'Right.', wrong: 'Its parent decides its value: it is controlled.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The total is sometimes out of date. Tap the buggy line.', lang: 'jsx', lines: ['const [cart, setCart] = useState([]);', 'const [total, setTotal] = useState(0);', 'const add = (c) => setCart([...cart, c]);'], bug: 1, fix: 'const total = cart.reduce((s, c) => s + c.fee, 0);', explain: 'Derive the total from the cart so it can never be stale.' }),
  ],
  'r-effect-1': [
    quiz({ prompt: 'When does an effect with no dependency array run?', options: ['After every render', 'Only once', 'Never', 'Only on clicks'], right: 'Right. Usually you want a dependency array.', wrong: 'Without the array, it runs after every render.' }),
    quiz({ prompt: 'Which is a good use of an effect?', options: ['Connecting to a chat server while the screen is open', 'Calculating a total from the cart', 'Handling a button tap', 'Formatting a date for display'], right: 'Right. That is syncing with an outside system.', wrong: 'Derive values during render and handle taps in event handlers.' }),
    quiz({ prompt: 'Why does React run effects twice in development?', options: ['Strict Mode checks that your cleanup really undoes the setup', 'It is a bug', 'To load data faster', 'Because of keys'], right: 'Right. It doesn’t happen in production.', wrong: 'Strict Mode mounts, unmounts and mounts again to expose missing cleanups.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Leaving the screen leaves the timer ticking. Tap the buggy line.', lang: 'jsx', lines: ['useEffect(() => {', '  const id = setInterval(tick, 1000);', '}, []);'], bug: 1, fix: '  const id = setInterval(tick, 1000); return () => clearInterval(id);', explain: 'Return a cleanup function that clears the interval.' }),
  ],
  'r-hooks-1': [
    quiz({ prompt: 'Which name tells React’s linter a function is a custom hook?', options: ['useCart', 'getCart', 'CartHook', 'hookCart'], right: 'Right. Hooks start with use.', wrong: 'Custom hooks must start with use.', mono: true }),
    quiz({ prompt: 'Can you call a hook after an early return?', options: ['No, it might be skipped on some renders', 'Yes, always', 'Only useState', 'Only in custom hooks'], right: 'Right. Put hooks before any return.', wrong: 'Hooks must run on every render, so they go before early returns.' }),
    quiz({ prompt: 'What should a custom hook return?', options: ['Whatever the component needs, e.g. a value and functions', 'JSX only', 'Nothing', 'A class'], right: 'Right.', wrong: 'Hooks return data and functions, not UI.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'React’s linter complains. Tap the buggy line.', lang: 'jsx', lines: ['function Price({ show }) {', '  if (!show) return null;', '  const [currency] = useState("₹");', '  return <p>{currency}2000</p>;', '}'], bug: 2, fix: 'Move useState above the early return.', explain: 'A hook after an early return is skipped on some renders.' }),
  ],
  'r-context-1': [
    quiz({ prompt: 'What does useContext return when there is no provider above?', options: ['The default value passed to createContext', 'undefined always', 'An error', 'The last provider used anywhere'], right: 'Right.', wrong: 'Without a provider, you get the default from createContext.' }),
    quiz({ prompt: 'Which is a good use of context?', options: ['The app’s language or theme', 'Every prop of every component', 'A button’s label', 'A loop counter'], right: 'Right. Values many distant components need.', wrong: 'Use context for truly shared values; pass ordinary props normally.' }),
    quiz({ prompt: 'What does dispatch({ type: "clear" }) do with useReducer?', options: ['Calls the reducer with the current state and that action, then re-renders with the result', 'Clears all state everywhere', 'Sends it to a server', 'Nothing until refresh'], right: 'Right.', wrong: 'dispatch passes the action to your reducer, and React uses what it returns.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The reducer sometimes doesn’t update the screen. Tap the buggy line.', lang: 'javascript', lines: ['function reducer(cart, action) {', '  if (action.type === "add") { cart.push(action.course); return cart; }', '  return cart;', '}'], bug: 1, fix: '  if (action.type === "add") return [...cart, action.course];', explain: 'Reducers must return new state, not change the old one.' }),
  ],
};
