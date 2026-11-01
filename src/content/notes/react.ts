// Module notes for React ("Read more"), one per module, keyed by the module's first lesson. A step-by-step reference
// in our own words, following the topics of react.dev and W3Schools' React tutorial. Each worked example is a React
// program: tests draw it with the bundled React (on the practice server) and the page must show `output`.
import type { ModuleNotes } from '../types';

const ROOT = '<div id="root"></div>';

export const REACT_NOTES: Record<string, ModuleNotes> = {
  'r-comp-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'What React is', body: 'React is a JavaScript library for building screens out of small, reusable pieces called components. A menu card, a cart button and a price tag can each be a component, and bigger components are made from smaller ones. React works out what changed and updates only that part of the page. It is used for websites, dashboards and, with React Native, phone apps (this app is one).' },
      { heading: 'Components', body: 'A component is a JavaScript function whose name starts with a capital letter and which returns what to show. You use it like an HTML tag: <MenuCard />. A component can be used as many times as you like, and each use draws its own copy. Keep each component small and give it one job.', code: ['function MenuCard() {', '  return <h3>Lemon Tea</h3>;', '}'] },
      { heading: 'JSX rules', body: 'The HTML-like markup is called JSX. It has a few rules. Return one parent element, or wrap several in a fragment, <>…</>. Close every tag, even <img /> and <br />. Use className instead of class and htmlFor instead of for. Attribute names are camelCase, like onClick. Curly braces { } put any JavaScript value or sum inside the markup.', code: ['<>', '  <h2 className="title">Menu</h2>', '  <p>₹{20 * 2}</p>', '</>'] },
      { heading: 'Drawing the app', body: 'Every React web app starts by finding one element on the page and drawing the top component, usually App, inside it: createRoot(document.getElementById("root")).render(<App />). From then on, React keeps that part of the page in step with your components. In these lessons that line is added for you.' },
    ],
    example: {
      title: 'A menu from two components',
      code: ['function MenuCard() {', '  return (', '    <div className="card">', '      <h3>Lemon Tea</h3>', '      <p>₹{20 * 2}</p>', '    </div>', '  );', '}', '', 'function App() {', '  return (', '    <>', '      <h2>Rosa’s Café</h2>', '      <MenuCard />', '      <MenuCard />', '    </>', '  );', '}'],
      walk: [
        { line: 1, text: 'A component: a function with a capital-letter name.' },
        { line: 3, text: 'It returns JSX. className sets the CSS class.' },
        { line: 5, text: '{ } runs JavaScript: 20 * 2 shows 40.' },
        { line: 12, text: 'A fragment groups elements without adding a div.' },
        { line: 14, text: 'Use the component like a tag, as often as you like.' },
      ],
      page: ROOT,
      output: ['Rosa’s Café', 'Lemon Tea', '₹40', 'Lemon Tea', '₹40'],
    },
    industry: 'React is one of the most used tools for building web interfaces. Teams split every screen into components, keep them in their own files (MenuCard.jsx), and share common ones, like buttons and cards, across the whole product.',
    interview: [
      { q: 'What is a component?', a: 'A function that returns what to show (JSX). Its name starts with a capital letter, and it can be reused.' },
      { q: 'What is JSX?', a: 'HTML-like markup inside JavaScript. A build tool turns it into plain JavaScript calls.' },
      { q: 'Why className instead of class?', a: 'JSX is JavaScript, and class is already a JavaScript word.' },
    ],
    cheat: [
      { code: 'function Card() { return <p>Hi</p>; }', meaning: 'a component' },
      { code: '<Card />', meaning: 'use it' },
      { code: '<>…</>', meaning: 'a fragment' },
      { code: '{price * 2}', meaning: 'JavaScript inside JSX' },
      { code: 'className, htmlFor', meaning: 'class and for in JSX' },
    ],
  },

  'r-props': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'Passing props', body: 'Props are how a parent gives information to a child component, like attributes on an HTML tag. Text goes in quotes; anything else goes in braces: numbers, true or false, arrays, objects and even functions. The child receives them all in one object.', code: ['<Dish name="Lemon Tea" price={40} veg={true} />'] },
      { heading: 'Destructuring and defaults', body: 'Instead of writing props.name everywhere, take the props you need out of the object in the brackets: function Dish({ name, price }). You can give a default for a prop that might not be passed: { price = 40 }. Writing a prop with no value, like <Dish veg />, passes true.', code: ['function Dish({ name, price = 40 }) {', '  return <li>{name}: ₹{price}</li>;', '}'] },
      { heading: 'Props are read-only', body: 'A component must never change its own props. They belong to the parent, and React relies on them staying the same during a draw. When something needs to change over time, like a count, it belongs in state (the next module). When the parent passes new props, the child simply draws again with them.' },
    ],
    example: {
      title: 'One Dish component, three dishes',
      code: ['function Dish({ name, price = 40, veg }) {', '  return (', '    <li>', '      {name}: ₹{price} {veg ? "(veg)" : ""}', '    </li>', '  );', '}', '', 'function App() {', '  return (', '    <ul>', '      <Dish name="Lemon Tea" veg={true} />', '      <Dish name="Cheese Toast" price={80} veg />', '      <Dish name="Chicken Sandwich" price={150} veg={false} />', '    </ul>', '  );', '}'],
      walk: [
        { line: 1, text: 'Take name, price and veg out of the props. price is 40 if not passed.' },
        { line: 4, text: 'Use them in the JSX.' },
        { line: 12, text: 'No price passed, so the default 40 is used.' },
        { line: 13, text: 'veg on its own means veg={true}.' },
      ],
      page: ROOT,
      output: ['Lemon Tea: ₹40 (veg)', 'Cheese Toast: ₹80 (veg)', 'Chicken Sandwich: ₹150'],
    },
    industry: 'In real apps, components are designed around their props, like the controls on a machine. Teams often describe props with TypeScript types so mistakes, such as a missing price, are caught before the app runs.',
    interview: [
      { q: 'What are props?', a: 'Values a parent passes to a child component, read-only inside the child.' },
      { q: 'How do you give a prop a default value?', a: 'In the destructuring: function Dish({ price = 40 }).' },
      { q: 'What is the difference between props and state?', a: 'Props come from the parent and are read-only; state belongs to the component and can change.' },
    ],
    cheat: [
      { code: '<Dish name="Tea" price={40} />', meaning: 'pass props' },
      { code: 'function Dish({ name, price })', meaning: 'read them' },
      { code: '{ price = 40 }', meaning: 'a default' },
      { code: '<Dish veg />', meaning: 'veg={true}' },
    ],
  },

  'r-state-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'What state is', body: 'State is a component’s memory: values that change while the app is open, like how many cups are in the cart or what is typed in a box. A normal variable is reset on every draw and doesn’t make the screen update. State is kept by React between draws, and changing it makes React draw the component again.' },
      { heading: 'useState', body: 'Call useState with a starting value. It gives back a pair: the current value and a function to change it, usually named like count and setCount. Call the setter with the new value; React then draws again with it. Hooks such as useState must be called at the top of the component, not inside if or loops.', code: ['const [cups, setCups] = useState(0);', 'setCups(cups + 1);'] },
      { heading: 'State is a snapshot', body: 'During one draw, a state value never changes. So calling setCups(cups + 1) twice in the same tap adds only one, because both read the same cups. To build on the latest value, pass a function: setCups((c) => c + 1). React runs those in order.', code: ['setCups((c) => c + 1);', 'setCups((c) => c + 1); // adds 2'] },
      { heading: 'Each copy has its own', body: 'A component can have several pieces of state. Every copy of a component keeps its own state, so two counters count separately. Keep only what you need in state and work out everything else from it.' },
    ],
    example: {
      title: 'Two counters, two states',
      code: ['import { useState } from "react";', '', 'function Counter({ dish, start }) {', '  const [cups, setCups] = useState(start);', '  return (', '    <div className="card">', '      <p>{dish}: {cups} cups</p>', '      <button onClick={() => setCups(cups + 1)}>Add one</button>', '    </div>', '  );', '}', '', 'function App() {', '  return (', '    <>', '      <Counter dish="Lemon Tea" start={2} />', '      <Counter dish="Iced Tea" start={0} />', '    </>', '  );', '}'],
      walk: [
        { line: 1, text: 'useState comes from React.' },
        { line: 4, text: 'State starts at the value passed in.' },
        { line: 7, text: 'Show the current value.' },
        { line: 8, text: 'Tapping sets a new value, and React draws again.' },
        { line: 16, text: 'Two copies, each with its own count.' },
      ],
      page: ROOT,
      output: ['Lemon Tea: 2 cups', 'Add one', 'Iced Tea: 0 cups', 'Add one'],
    },
    industry: 'Deciding what goes in state is a big part of React work. Experienced developers keep state small, avoid storing the same thing twice, and work out the rest while drawing, which removes a whole family of bugs.',
    interview: [
      { q: 'What does useState return?', a: 'An array of two things: the current value and a setter function.' },
      { q: 'Why doesn’t a normal variable work for a counter?', a: 'It resets on every draw, and changing it doesn’t make React draw again.' },
      { q: 'When do you pass a function to a setter?', a: 'When the new value depends on the old one, especially for several updates in a row.' },
    ],
    cheat: [
      { code: 'const [x, setX] = useState(0)', meaning: 'make state' },
      { code: 'setX(5)', meaning: 'set a new value' },
      { code: 'setX((old) => old + 1)', meaning: 'build on the latest value' },
      { code: 'import { useState } from "react"', meaning: 'bring in the hook' },
    ],
  },

  'r-event-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'Handling events', body: 'Give an element a function to run when something happens, using props such as onClick, onChange and onSubmit (camelCase). Pass the function itself: onClick={order}. Writing onClick={order()} would call it straight away while drawing, not on the tap.', code: ['<button onClick={order}>Order</button>'] },
      { heading: 'Passing a value', body: 'To pass a value to the handler, wrap the call in an arrow function: onClick={() => order("Lemon Tea")}. The arrow function is what React calls on the tap, and it then calls order with the dish.' },
      { heading: 'Handlers as props', body: 'Often a small component draws the button, but its parent decides what the tap does. Pass the function down as a prop. By habit, such props are named onSomething, like onOrder, and the functions that handle them handleSomething or a plain verb like add.', code: ['<OrderButton dish="Tea" onOrder={add} />'] },
      { heading: 'The event object', body: 'React passes an event object, usually called e, to the handler. e.target is the element, and e.target.value is what an input holds. e.preventDefault() stops the browser’s own action, like a form reloading the page. e.stopPropagation() stops the event reaching parent elements.' },
    ],
    example: {
      title: 'One handler, many buttons',
      code: ['function OrderButton({ dish, onOrder }) {', '  return <button onClick={() => onOrder(dish)}>Order {dish}</button>;', '}', '', 'function App() {', '  function order(dish) {', '    console.log("Ordered: " + dish);', '  }', '  return (', '    <div className="card">', '      <p>Tap a dish to order it.</p>', '      <OrderButton dish="Lemon Tea" onOrder={order} />', '      <OrderButton dish="Cheese Toast" onOrder={order} />', '    </div>', '  );', '}'],
      walk: [
        { line: 2, text: 'On a tap, call onOrder with this button’s dish.' },
        { line: 6, text: 'App decides what ordering means.' },
        { line: 12, text: 'Pass the function down as a prop.' },
      ],
      page: ROOT,
      output: ['Tap a dish to order it.', 'Order Lemon Tea', 'Order Cheese Toast'],
    },
    industry: 'Real apps pass handlers through a few layers of components. Design systems ship buttons and inputs that accept onClick or onChange props, so the same button can save, delete or send, depending on the screen.',
    interview: [
      { q: 'What is the difference between onClick={fn} and onClick={fn()}?', a: 'The first passes the function to call later; the second calls it while drawing.' },
      { q: 'How do you pass a value to a click handler?', a: 'Wrap it: onClick={() => fn(value)}.' },
      { q: 'What does e.preventDefault() do?', a: 'Stops the browser’s default action, like a form submit reloading the page.' },
    ],
    cheat: [
      { code: 'onClick={fn}', meaning: 'run fn on a tap' },
      { code: 'onClick={() => fn(x)}', meaning: 'pass a value' },
      { code: 'e.target.value', meaning: 'an input’s text' },
      { code: 'e.preventDefault()', meaning: 'stop the default action' },
    ],
  },

  'r-cond-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'if and an early return', body: 'A component is a function, so a normal if works. For whole different screens, like an empty cart, check first and return early. The rest of the component then deals with the usual case.', code: ['if (items.length === 0) {', '  return <p>Your cart is empty</p>;', '}'] },
      { heading: 'The ternary inside JSX', body: 'Inside JSX you can’t write if, but you can write condition ? a : b. It is good for choosing between two small things, like a word or a class name.', code: ['<p>{n} {n === 1 ? "item" : "items"}</p>'] },
      { heading: '&& and the 0 trap', body: 'condition && <p>…</p> shows the JSX only when the condition is true; otherwise nothing is drawn. Be careful with numbers: if count is 0, {count && <p>…</p>} draws a 0 on the page. Write a real true or false: count > 0 && ….', code: ['{count > 0 && <p>Free delivery!</p>}'] },
      { heading: 'Drawing nothing', body: 'A component can return null to draw nothing. Loading, error and empty screens are usually three conditions in a row, checked before the main screen.' },
    ],
    example: {
      title: 'A cart that adapts',
      code: ['function Cart({ items }) {', '  if (items.length === 0) {', '    return <p>Your cart is empty</p>;', '  }', '  return (', '    <div>', '      <p>{items.length} {items.length === 1 ? "item" : "items"}</p>', '      {items.length > 2 && <p>Free delivery!</p>}', '    </div>', '  );', '}', '', 'function App() {', '  return (', '    <>', '      <Cart items={[]} />', '      <Cart items={["Lemon Tea"]} />', '      <Cart items={["Tea", "Toast", "Soup"]} />', '    </>', '  );', '}'],
      walk: [
        { line: 2, text: 'An empty cart gets its own screen.' },
        { line: 7, text: 'The ternary picks “item” or “items”.' },
        { line: 8, text: 'Free delivery only shows for more than 2 items.' },
      ],
      page: ROOT,
      output: ['Your cart is empty', '1 item', '3 items', 'Free delivery!'],
    },
    industry: 'Every real screen has loading, empty and error states, and testers check each of them. Teams often keep them as small separate components so every screen shows them the same way.',
    interview: [
      { q: 'How do you show something only when a condition is true?', a: 'condition && <JSX />, or a ternary for two choices, or an early return.' },
      { q: 'Why can {count && <p/>} show 0?', a: 'When count is 0, && gives 0, and React draws numbers.' },
      { q: 'How does a component draw nothing?', a: 'It returns null.' },
    ],
    cheat: [
      { code: 'if (x) return <A />;', meaning: 'early return' },
      { code: '{x ? <A /> : <B />}', meaning: 'one or the other' },
      { code: '{x && <A />}', meaning: 'only when true' },
      { code: 'return null;', meaning: 'draw nothing' },
    ],
  },

  'r-list-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'Lists with map', body: 'To show an array, turn each item into JSX with map. The result is an array of elements, which React draws in order. Put the map inside braces in the JSX.', code: ['<ul>{dishes.map((d) => <li key={d.id}>{d.name}</li>)}</ul>'] },
      { heading: 'Keys', body: 'Each item in a list needs a key prop: a value that is unique among its neighbours and stays the same for that item. React uses keys to match items between draws, so it can move, add or remove the right one. Use an id from the data. The index changes when items are added or removed, and Math.random() changes every draw, so neither is a good key.' },
      { heading: 'Filtering and sorting', body: 'Filter or sort before you map. filter keeps the items that pass a test. sort changes the array it is called on, so sort a copy, [...dishes].sort(…), or use toSorted, which gives a new array. Never change props or state in place.', code: ['const cheap = dishes.filter((d) => d.price < 85);'] },
    ],
    example: {
      title: 'The cheaper dishes',
      code: ['const DISHES = [', '  { id: 1, name: "Lemon Tea", price: 40 },', '  { id: 2, name: "Cheese Toast", price: 80 },', '  { id: 3, name: "Veg Sandwich", price: 90 },', '];', '', 'function App() {', '  const cheap = DISHES.filter((d) => d.price < 85);', '  return (', '    <ul>', '      {cheap.map((d) => (', '        <li key={d.id}>{d.name}: ₹{d.price}</li>', '      ))}', '    </ul>', '  );', '}'],
      walk: [
        { line: 1, text: 'The data, each item with an id.' },
        { line: 8, text: 'Keep dishes under ₹85.' },
        { line: 11, text: 'Turn each one into a list item.' },
        { line: 12, text: 'The id is the key.' },
      ],
      page: ROOT,
      output: ['Lemon Tea: ₹40', 'Cheese Toast: ₹80'],
    },
    industry: 'Lists come from servers with ids, which make natural keys. Long lists (thousands of rows) are drawn with “virtualised” lists that only draw what is on screen.',
    interview: [
      { q: 'Why does React need keys?', a: 'To match list items between draws, so it updates, moves or removes the right ones.' },
      { q: 'Why is the index a poor key?', a: 'It changes when items are added, removed or sorted, so React can mix items up.' },
      { q: 'How do you sort without changing state?', a: 'Sort a copy, [...list].sort(…), or use list.toSorted(…).' },
    ],
    cheat: [
      { code: 'list.map((x) => <li key={x.id}>…</li>)', meaning: 'draw a list' },
      { code: 'list.filter((x) => …)', meaning: 'keep some' },
      { code: 'list.toSorted((a, b) => a.price - b.price)', meaning: 'a sorted copy' },
      { code: 'key={x.id}', meaning: 'a stable key' },
    ],
  },

  'r-form': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Controlled inputs', body: 'In React, a form field usually shows a value from state and updates the state on every change: value={name} with onChange={(e) => setName(e.target.value)}. This is called a controlled input. React is then always in charge, so the rest of the page can use what is typed at once.' },
      { heading: 'Many fields, one object', body: 'Keep the whole form in one state object, and give each field a name that matches a key. One change function then works for every field: copy the object and replace the field that changed.', code: ['setForm({ ...form, [e.target.name]: e.target.value });'] },
      { heading: 'textarea, select, checkbox, radio', body: 'textarea and select use value, just like input. A checkbox is on or off: use checked={…} and read e.target.checked. Radio buttons share a name; set checked={size === "Large"} on each. Values from inputs are always text, even type="number", so convert with Number() for maths.' },
      { heading: 'Sending and checking', body: 'Handle onSubmit on the form and call e.preventDefault() first, so the page doesn’t reload. Check the fields, keep any error message in state so it is shown, and mark the field with aria-invalid so screen readers know.' },
    ],
    example: {
      title: 'An order form',
      code: ['import { useState } from "react";', '', 'function App() {', '  const [form, setForm] = useState({ name: "Ava", cups: "2", sugar: true });', '  function change(e) {', '    const { name, value, type, checked } = e.target;', '    setForm({ ...form, [name]: type === "checkbox" ? checked : value });', '  }', '  return (', '    <form className="card">', '      <label htmlFor="name">Name</label>', '      <input id="name" name="name" value={form.name} onChange={change} />', '      <label><input name="sugar" type="checkbox" checked={form.sugar} onChange={change} /> Sugar</label>', '      <p>{form.name} wants {form.cups} cups{form.sugar ? ", with sugar" : ""}</p>', '    </form>', '  );', '}'],
      walk: [
        { line: 4, text: 'One object holds every field.' },
        { line: 7, text: 'Copy it and change one field; a checkbox gives checked.' },
        { line: 12, text: 'A controlled text input.' },
        { line: 13, text: 'A controlled checkbox.' },
        { line: 14, text: 'The rest of the page uses the state at once.' },
      ],
      page: ROOT,
      output: ['Name', 'Sugar', 'Ava wants 2 cups, with sugar'],
    },
    industry: 'Big forms (sign-up, checkout) are where users give up, so teams check fields as people type, show clear messages, and often use a form library such as React Hook Form for many fields.',
    interview: [
      { q: 'What is a controlled input?', a: 'One whose value comes from state and whose onChange updates that state.' },
      { q: 'How do you handle many fields with one function?', a: 'Give each a name and use setForm({ ...form, [e.target.name]: e.target.value }).' },
      { q: 'How is a checkbox different?', a: 'It uses checked and e.target.checked instead of value.' },
    ],
    cheat: [
      { code: 'value={x} onChange={…}', meaning: 'a controlled input' },
      { code: 'checked={on}', meaning: 'a controlled checkbox' },
      { code: '[e.target.name]: e.target.value', meaning: 'update one field' },
      { code: 'e.preventDefault()', meaning: 'stop the reload on submit' },
    ],
  },

  'r-style-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'CSS files and className', body: 'React draws normal HTML, so normal CSS works. Write rules in a .css file and import it once, usually in main.jsx or App.jsx: import "./App.css";. Then give elements classes with className. Those rules apply to the whole page.' },
      { heading: 'Classes from state', body: 'Because className is just a value, you can choose it from props or state, for example to grey out a sold-out dish. Keep the look in CSS and let React switch the class.', code: ['<div className={soldOut ? "card sold-out" : "card"}>'] },
      { heading: 'The style prop', body: 'style takes a JavaScript object, so it has two pairs of braces: style={{ color: "teal" }}. CSS names become camelCase: background-color is backgroundColor. A plain number means pixels: fontSize: 20. Use it for values worked out in code; classes are easier to reuse for the rest.' },
      { heading: 'CSS modules and libraries', body: 'In big apps, class names can clash. A CSS module, Menu.module.css, is imported as an object: import styles from "./Menu.module.css"; then className={styles.title}. The build tool makes each name unique to that file. Many teams also use libraries such as Tailwind CSS.' },
    ],
    example: {
      title: 'A sold-out card with badges',
      code: ['function Badge({ text, hot }) {', '  const style = { fontSize: hot ? 20 : 14, color: hot ? "#B91C1C" : "#5B6B70" };', '  return <span style={style}>{text}</span>;', '}', '', 'function App() {', '  const soldOut = true;', '  return (', '    <div className={soldOut ? "card sold-out" : "card"}>', '      <h3>Cheese Toast</h3>', '      <p><Badge text="Best seller" hot /> <Badge text="Veg" /></p>', '    </div>', '  );', '}'],
      walk: [
        { line: 2, text: 'A style object, worked out from a prop.' },
        { line: 3, text: 'style takes the object.' },
        { line: 9, text: 'The class is chosen from a value.' },
      ],
      page: ROOT,
      output: ['Cheese Toast', 'Best seller Veg'],
    },
    industry: 'Most teams pick one main way to style, such as CSS modules or Tailwind CSS, and keep a shared set of colours and sizes (design tokens) so every screen looks consistent.',
    interview: [
      { q: 'How is inline style different in React?', a: 'It is an object with camelCase names, like style={{ fontSize: 20 }}.' },
      { q: 'What problem do CSS modules solve?', a: 'Class name clashes: names are made unique to each file.' },
      { q: 'How do you add a class only sometimes?', a: 'Choose className with a condition, like a ternary.' },
    ],
    cheat: [
      { code: 'import "./App.css";', meaning: 'load a CSS file' },
      { code: 'className="card"', meaning: 'add a class' },
      { code: 'style={{ fontSize: 20 }}', meaning: 'inline style' },
      { code: 'className={styles.title}', meaning: 'a CSS module class' },
    ],
  },

  'r-immut': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Replace, don’t change', body: 'React knows it should draw again when you set state to a new value. If you change an object or array in place and set the same one, React may see nothing new. So treat state as read-only: make a new object or array with the change.' },
      { heading: 'Objects', body: 'The spread syntax copies an object: { ...dish } has every field of dish. Add the fields to change after it: { ...dish, price: 45 }. Only that field is different.', code: ['setDish({ ...dish, price: 45 });'] },
      { heading: 'Arrays', body: 'Add with [...list, item]. Remove with list.filter(…). Change one item with list.map(…), giving back a changed copy of that item and every other item as it is. Avoid push, splice, sort and direct assignment on state; they change the old array.', code: ['setCart(cart.map((i) => (i.id === 1 ? { ...i, qty: 2 } : i)));'] },
      { heading: 'Nested objects', body: 'A spread copies one level only; inner objects are shared. To change something deep, copy every level from the top down to the change. Keeping state flat makes this easier. Libraries such as Immer let you write “changes” that are turned into copies.' },
    ],
    example: {
      title: 'A cart, step by step',
      code: ['import { useState } from "react";', '', 'function App() {', '  const start = [{ id: 1, name: "Lemon Tea", qty: 1 }];', '  const added = [...start, { id: 2, name: "Cheese Toast", qty: 1 }];', '  const changed = added.map((i) => (i.id === 1 ? { ...i, qty: 3 } : i));', '  const removed = changed.filter((i) => i.id !== 2);', '  const [cart] = useState(removed);', '  return (', '    <ul>', '      <li>Start: {start.length} item, tea x{start[0].qty}</li>', '      <li>Added: {added.length} items</li>', '      <li>Changed: tea x{changed[0].qty}</li>', '      <li>Now: {cart.map((i) => i.name + " x" + i.qty).join(", ")}</li>', '    </ul>', '  );', '}'],
      walk: [
        { line: 5, text: 'Add: a new array with one more item.' },
        { line: 6, text: 'Change one: a copy of the tea with qty 3.' },
        { line: 7, text: 'Remove: keep everything except id 2.' },
        { line: 11, text: 'start is untouched: still 1 item, tea x1.' },
      ],
      page: ROOT,
      output: ['Start: 1 item, tea x1', 'Added: 2 items', 'Changed: tea x3', 'Now: Lemon Tea x3'],
    },
    industry: 'Copying instead of changing makes features like undo, history and fast comparisons simple, which is why React, Redux and many other tools are built on it.',
    interview: [
      { q: 'Why must React state be updated immutably?', a: 'React compares old and new values; changing in place can hide the change and skip a redraw.' },
      { q: 'How do you remove an item from state?', a: 'setList(list.filter((x) => x.id !== id)).' },
      { q: 'How deep does a spread copy?', a: 'One level; nested objects must be copied too.' },
    ],
    cheat: [
      { code: '{ ...obj, key: value }', meaning: 'change a field' },
      { code: '[...list, item]', meaning: 'add' },
      { code: 'list.filter(…)', meaning: 'remove' },
      { code: 'list.map(…)', meaning: 'change one' },
    ],
  },

  'r-children-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'children', body: 'Whatever you put between a component’s opening and closing tags arrives as a prop called children. Draw it with {children}. This makes box components, like cards and panels, that don’t need to know what goes inside.', code: ['<Card><p>Hello</p></Card>'] },
      { heading: 'Layout components', body: 'A layout component draws the parts every screen shares, like a header and footer, and puts the screen in the middle with {children}. Change the header once and every screen gets it.' },
      { heading: 'JSX in other props', body: 'Any prop can hold JSX, not only children. This gives a component several “slots”, such as badge={<span>New</span>} or action={<button>Order</button>}. The parent fills the slots; the component decides where they go.' },
      { heading: 'Composition over long prop lists', body: 'Instead of one big component with many settings, build small pieces and put them together. It is also a way to avoid passing props through many layers: pass the finished JSX down instead.' },
    ],
    example: {
      title: 'A card with slots',
      code: ['function Card({ title, action, children }) {', '  return (', '    <div className="card">', '      <h3>{title}</h3>', '      {children}', '      {action}', '    </div>', '  );', '}', '', 'function App() {', '  return (', '    <Card title="Specials" action={<button>Order now</button>}>', '      <p>Mango Smoothie: ₹70</p>', '      <p>Tomato Soup: ₹60</p>', '    </Card>', '  );', '}'],
      walk: [
        { line: 1, text: 'Card takes a title, an action slot and its children.' },
        { line: 5, text: 'children: whatever was put inside.' },
        { line: 6, text: 'The action slot holds JSX too.' },
        { line: 13, text: 'App fills the slots.' },
      ],
      page: ROOT,
      output: ['Specials', 'Mango Smoothie: ₹70', 'Tomato Soup: ₹60', 'Order now'],
    },
    industry: 'Design systems are built this way: Card, Modal, Page and Tabs components take children and slots, so product teams can build many different screens from the same shared pieces.',
    interview: [
      { q: 'What is the children prop?', a: 'The JSX placed between a component’s tags.' },
      { q: 'What is composition?', a: 'Building components by putting smaller ones together, often through children and slots.' },
      { q: 'Can a prop other than children hold JSX?', a: 'Yes, any prop can, like icon={<Icon />}.' },
    ],
    cheat: [
      { code: '{children}', meaning: 'draw what was put inside' },
      { code: '<Layout>…</Layout>', meaning: 'a shared frame' },
      { code: 'action={<button />}', meaning: 'JSX in a prop' },
      { code: '({ title, children })', meaning: 'take children from props' },
    ],
  },

  'r-lift-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'Lifting state up', body: 'When two components need the same data, move the state to their closest shared parent. The parent passes the value down as a prop and passes a function to change it, like onAdd. Now both always agree.' },
      { heading: 'One source of truth', body: 'Each piece of data should have one owner. Don’t store something you can work out: the cart total comes from the cart, so calculate it while drawing instead of keeping it in state. Two pieces of state that must agree will one day disagree.', code: ['const total = cart.reduce((s, d) => s + d.price, 0);'] },
      { heading: 'Don’t copy props into state', body: 'useState(price) only uses its first value. If the parent later passes a new price, the copy doesn’t follow. Use the prop directly.' },
      { heading: 'Where state lives', body: 'Keep state as low as it can go: in the component that uses it, and lift it only when it is shared. Each copy of a component has its own state, and state is thrown away when the component is removed from the page.' },
    ],
    example: {
      title: 'A badge and a menu sharing one cart',
      code: ['import { useState } from "react";', '', 'function Badge({ count }) {', '  return <p>🛒 {count} in cart</p>;', '}', '', 'function Menu({ onAdd }) {', '  return <button onClick={() => onAdd("Lemon Tea")}>Add Lemon Tea</button>;', '}', '', 'function App() {', '  const [cart, setCart] = useState(["Cheese Toast"]);', '  const total = cart.length * 60;', '  return (', '    <div className="card">', '      <Badge count={cart.length} />', '      <Menu onAdd={(dish) => setCart([...cart, dish])} />', '      <p>Total about ₹{total}</p>', '    </div>', '  );', '}'],
      walk: [
        { line: 12, text: 'The cart lives in App, above both.' },
        { line: 13, text: 'The total is worked out, not stored.' },
        { line: 16, text: 'The badge gets the value.' },
        { line: 17, text: 'The menu gets a way to change it.' },
      ],
      page: ROOT,
      output: ['🛒 1 in cart', 'Add Lemon Tea', 'Total about ₹60'],
    },
    industry: 'Planning where each piece of state lives is the first step of “Thinking in React”, the method the React team recommends: draw the component tree, find the minimal state, then decide its owner.',
    interview: [
      { q: 'What does lifting state up mean?', a: 'Moving shared state to the closest common parent and passing it down as props.' },
      { q: 'What is derived state?', a: 'A value worked out from other state while drawing, instead of stored.' },
      { q: 'How does a child change its parent’s state?', a: 'By calling a function the parent passed as a prop.' },
    ],
    cheat: [
      { code: '<Badge count={cart.length} />', meaning: 'value down' },
      { code: '<Menu onAdd={add} />', meaning: 'changes up' },
      { code: 'const total = …', meaning: 'work it out, don’t store it' },
      { code: 'useState in the child', meaning: 'when only it uses it' },
    ],
  },

  'r-effect-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'What effects are for', body: 'A component should only work out what to show. Some code must talk to things outside React: setting the tab title, starting a timer, listening to the window, or loading data. useEffect runs such code after React has drawn the page.' },
      { heading: 'The dependency list', body: 'The second argument says when to run again. With no list, the effect runs after every draw. With [], it runs once, after the first draw. With [url], it runs after the first draw and whenever url changes. List every value from the component that the effect reads.', code: ['useEffect(() => { … }, [url]);'] },
      { heading: 'Clean-up', body: 'If an effect starts something that keeps going, return a function that stops it. React calls it before running the effect again and when the component is removed. When loading data, a flag set in the clean-up makes the effect ignore an answer that arrives too late.', code: ['return () => clearInterval(id);'] },
      { heading: 'You might not need an effect', body: 'Values worked out from props or state belong in the component body, not in an effect with setState. Responses to a tap belong in the event handler. Use effects only to keep in step with something outside React.' },
    ],
    example: {
      title: 'Loading the veg dishes',
      code: ['import { useState, useEffect } from "react";', '', 'function App() {', '  const [dishes, setDishes] = useState(null);', '  const [error, setError] = useState("");', '  useEffect(() => {', '    let ignore = false;', '    fetch("/api/menu")', '      .then((res) => {', '        if (!res.ok) throw new Error("Server said " + res.status);', '        return res.json();', '      })', '      .then((data) => { if (!ignore) setDishes(data.filter((d) => d.veg)); })', '      .catch((e) => { if (!ignore) setError(e.message); });', '    return () => { ignore = true; };', '  }, []);', '  if (error) return <p>{error}</p>;', '  if (!dishes) return <p>Loading…</p>;', '  return <ul>{dishes.map((d) => <li key={d.name}>{d.name} · ₹{d.price}</li>)}</ul>;', '}'],
      walk: [
        { line: 6, text: 'The effect runs after the first draw.' },
        { line: 8, text: 'Ask the practice server for the menu.' },
        { line: 10, text: 'fetch doesn’t throw for server errors, so check res.ok.' },
        { line: 15, text: 'Clean-up: ignore a late answer.' },
        { line: 16, text: '[]: run once.' },
        { line: 18, text: 'Loading first, then the list.' },
      ],
      page: ROOT,
      output: ['Lemon Tea · ₹40', 'Cheese Toast · ₹80', 'Veg Sandwich · ₹90'],
    },
    industry: 'In bigger apps, data loading is usually done with libraries such as TanStack Query or a framework like Next.js, which handle caching, retries and loading states; plain effects are still used for timers, listeners and small apps.',
    interview: [
      { q: 'When does useEffect run?', a: 'After React draws; when it runs again depends on the dependency list.' },
      { q: 'What is the clean-up function for?', a: 'Stopping what the effect started, before it runs again or when the component is removed.' },
      { q: 'Why can an effect loop forever?', a: 'It sets state with no dependency list, so each draw runs it again.' },
    ],
    cheat: [
      { code: 'useEffect(fn)', meaning: 'after every draw' },
      { code: 'useEffect(fn, [])', meaning: 'once' },
      { code: 'useEffect(fn, [x])', meaning: 'when x changes' },
      { code: 'return () => …', meaning: 'clean up' },
    ],
  },

  'r-hooks-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'The rules of hooks', body: 'Hooks are functions whose names start with use. Call them only at the top level of a component or a custom hook: never inside if, loops or nested functions, and never in plain helper functions. React matches each hook to its state by the order they are called, so the order must be the same on every draw.' },
      { heading: 'Custom hooks', body: 'When two components need the same logic, move the hooks into your own function named use…, like useCounter. It can call other hooks and give back whatever components need. Each component that calls it gets its own state: custom hooks share logic, not state.', code: ['function useCounter(start) {', '  const [count, setCount] = useState(start);', '  return { count, add: () => setCount((c) => c + 1) };', '}'] },
      { heading: 'useRef', body: 'useRef gives a box, ref.current, that keeps a value between draws without drawing again when it changes. Use it for values the screen doesn’t show, like a timer id, and to reach a real element: ref={input} and then input.current.focus().' },
      { heading: 'The built-in hooks', body: 'useState and useReducer keep state; useEffect keeps in step with the outside; useContext reads context; useRef keeps a value or an element; useMemo and useCallback keep work between draws; useId makes unique ids for labels.' },
    ],
    example: {
      title: 'A shared hook and a ref',
      code: ['import { useState, useRef, useEffect } from "react";', '', 'function useCounter(start) {', '  const [count, setCount] = useState(start);', '  return { count, add: () => setCount((c) => c + 1) };', '}', '', 'function Dish({ name, start }) {', '  const { count } = useCounter(start);', '  return <li>{name}: {count}</li>;', '}', '', 'function App() {', '  const search = useRef(null);', '  useEffect(() => {', '    search.current.focus();', '  }, []);', '  return (', '    <div className="card">', '      <input ref={search} placeholder="Search" />', '      <ul>', '        <Dish name="Lemon Tea" start={2} />', '        <Dish name="Cheese Toast" start={5} />', '      </ul>', '    </div>', '  );', '}'],
      walk: [
        { line: 3, text: 'A custom hook, named use….' },
        { line: 9, text: 'Each Dish gets its own count.' },
        { line: 14, text: 'A ref for the search box.' },
        { line: 16, text: 'After the first draw, focus it.' },
        { line: 20, text: 'ref connects the box to the real element.' },
      ],
      page: ROOT,
      output: ['Lemon Tea: 2', 'Cheese Toast: 5'],
    },
    industry: 'Teams collect custom hooks such as useAuth, useDebounce or useOnlineStatus in a shared folder. The official ESLint plugin for React checks the rules of hooks automatically.',
    interview: [
      { q: 'What are the rules of hooks?', a: 'Call them only at the top level, and only in components or custom hooks.' },
      { q: 'Do two components using one custom hook share state?', a: 'No, each call has its own state.' },
      { q: 'How is useRef different from useState?', a: 'Changing ref.current doesn’t draw again.' },
    ],
    cheat: [
      { code: 'function useX() { … }', meaning: 'a custom hook' },
      { code: 'const box = useRef(0)', meaning: 'a value kept between draws' },
      { code: '<input ref={box} />', meaning: 'reach an element' },
      { code: 'box.current', meaning: 'read or set it' },
    ],
  },

  'r-context-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Prop drilling and context', body: 'Passing a prop through many layers that don’t use it is called prop drilling. Context lets a parent share a value with every component below it, however deep. It suits values many parts need: a theme, the signed-in user, a language, a cart.' },
      { heading: 'Using context', body: 'Make a context with a default value: const ThemeContext = createContext("light"). Give it a value for everything inside: <ThemeContext value={theme}>…</ThemeContext> (older code writes ThemeContext.Provider). Read it in any component below with useContext(ThemeContext). When the value changes, those components draw again.' },
      { heading: 'useReducer', body: 'A reducer is a function (state, action) that gives back the next state. useReducer(reducer, start) gives the state and a dispatch function. Components dispatch actions that say what happened, like { type: "add", dish }, and the reducer decides the change. All the ways state can change sit in one place.', code: ['const [cart, dispatch] = useReducer(cartReducer, []);'] },
      { heading: 'Together', body: 'Put the reducer’s state and dispatch in context, and any component can read the cart or send an action, with no props passed down. Start with useState and props; reach for this as the app grows.' },
    ],
    example: {
      title: 'A cart shared through context',
      code: ['import { createContext, useContext, useReducer } from "react";', '', 'const CartContext = createContext(null);', '', 'function cartReducer(cart, action) {', '  switch (action.type) {', '    case "add":', '      return [...cart, action.dish];', '    default:', '      return cart;', '  }', '}', '', 'function Badge() {', '  const { cart } = useContext(CartContext);', '  return <p>🛒 {cart.length} in cart: {cart.join(", ")}</p>;', '}', '', 'function App() {', '  const [cart, dispatch] = useReducer(cartReducer, ["Lemon Tea", "Cheese Toast"]);', '  return (', '    <CartContext value={{ cart, dispatch }}>', '      <Badge />', '    </CartContext>', '  );', '}'],
      walk: [
        { line: 3, text: 'Make the context.' },
        { line: 5, text: 'The reducer: each action gives back a new cart.' },
        { line: 15, text: 'Badge reads the cart from context.' },
        { line: 20, text: 'App keeps the cart in a reducer.' },
        { line: 22, text: 'And shares it with everything inside.' },
      ],
      page: ROOT,
      output: ['🛒 2 in cart: Lemon Tea, Cheese Toast'],
    },
    industry: 'Context with a reducer covers the shared state of many apps. Larger apps may use libraries such as Redux Toolkit or Zustand, which follow the same ideas: one store, actions and pure updates.',
    interview: [
      { q: 'What problem does context solve?', a: 'Prop drilling: passing values through layers that don’t use them.' },
      { q: 'What is a reducer?', a: 'A pure function (state, action) that gives back the next state.' },
      { q: 'When would you choose useReducer over useState?', a: 'When state has many kinds of changes, or the next state depends on the previous one in complex ways.' },
    ],
    cheat: [
      { code: 'createContext(default)', meaning: 'make a context' },
      { code: '<Ctx value={v}>…</Ctx>', meaning: 'give it a value' },
      { code: 'useContext(Ctx)', meaning: 'read it' },
      { code: 'useReducer(reducer, start)', meaning: 'state and dispatch' },
    ],
  },

  'r-perf-1': {
    minutes: 5,
    lang: 'jsx',
    sections: [
      { heading: 'When components draw again', body: 'A component draws again when its state changes, when its parent draws again, or when a context it reads changes. Drawing is usually fast, and React only updates the page where something changed. Measure with the React Developer Tools Profiler before trying to speed anything up.' },
      { heading: 'memo', body: 'memo(Component) skips drawing a component again when all its props are the same as last time. It only helps if the props really stay the same, so arrays, objects and functions made inside the parent (which are new on every draw) defeat it.', code: ['const Menu = memo(function Menu({ dishes }) { … });'] },
      { heading: 'useMemo', body: 'useMemo(() => work(), [a, b]) runs the work and keeps the answer until a or b changes. Use it for slow calculations, like filtering a long list, or to keep an object the same for a memo child.' },
      { heading: 'useCallback and React Compiler', body: 'useCallback(fn, [a]) keeps the same function between draws, so a memo child receives the same prop. React Compiler, a build tool from the React team, can add this memoising automatically, so newer projects need these hooks less often.' },
    ],
    example: {
      title: 'A filtered list that only does the work it must',
      code: ['import { useState, useMemo, useCallback, memo } from "react";', '', 'const DISHES = ["Lemon Tea", "Iced Tea", "Cheese Toast"];', '', 'const List = memo(function List({ items, onPick }) {', '  return <ul>{items.map((d) => <li key={d} onClick={() => onPick(d)}>{d}</li>)}</ul>;', '});', '', 'function App() {', '  const [query] = useState("tea");', '  const [picked, setPicked] = useState("none");', '  const shown = useMemo(() => DISHES.filter((d) => d.toLowerCase().includes(query)), [query]);', '  const pick = useCallback((d) => setPicked(d), []);', '  return (', '    <div className="card">', '      <p>Picked: {picked}</p>', '      <List items={shown} onPick={pick} />', '    </div>', '  );', '}'],
      walk: [
        { line: 5, text: 'memo: List skips drawing when its props are the same.' },
        { line: 12, text: 'useMemo: filter again only when query changes.' },
        { line: 13, text: 'useCallback: the same function on every draw.' },
        { line: 17, text: 'So List’s props stay the same until something real changes.' },
      ],
      page: ROOT,
      output: ['Picked: none', 'Lemon Tea', 'Iced Tea'],
    },
    industry: 'Teams profile first, then fix the few slow screens: long lists, charts and big forms. Overusing memo everywhere adds code without speed, which reviewers often point out.',
    interview: [
      { q: 'What does React.memo do?', a: 'Skips drawing a component again when its props haven’t changed.' },
      { q: 'What is the difference between useMemo and useCallback?', a: 'useMemo keeps a value; useCallback keeps a function.' },
      { q: 'Why can memo fail to help?', a: 'A new object, array or function is passed as a prop on every draw.' },
    ],
    cheat: [
      { code: 'memo(Component)', meaning: 'skip when props are the same' },
      { code: 'useMemo(() => v, [a])', meaning: 'keep a value' },
      { code: 'useCallback(fn, [a])', meaning: 'keep a function' },
      { code: 'React DevTools Profiler', meaning: 'measure first' },
    ],
  },

  'r-router-1': {
    minutes: 6,
    lang: 'jsx',
    sections: [
      { heading: 'Setting up with Vite', body: 'On your own computer, start a project with Vite: npm create vite@latest cafe -- --template react, then npm install and npm run dev to work on it, and npm run build to make files to put online. index.html holds <div id="root">; src/main.jsx draws <App /> there with createRoot; src/App.jsx is your first component.' },
      { heading: 'StrictMode', body: 'main.jsx usually wraps App in <StrictMode>. While you develop, it draws components twice and runs effects twice to bring hidden bugs to light, like a missing clean-up. It does nothing in the built app.', code: ['createRoot(document.getElementById("root")).render(', '  <StrictMode><App /></StrictMode>', ');'] },
      { heading: 'React Router', body: 'Install with npm install react-router. Wrap the app in <BrowserRouter>. Inside <Routes>, each <Route path="/menu" element={<Menu />} /> says which component to show for an address. :id in a path matches any word, and useParams() reads it. <Link to="/menu"> changes the address without reloading; useNavigate() does it from code. path="*" catches unknown addresses.' },
      { heading: 'lazy, Suspense and portals', body: 'lazy(() => import("./Reviews.jsx")) loads a component’s file the first time it is shown, inside <Suspense fallback={…}> which shows something meanwhile. createPortal(jsx, document.body) draws a pop-up elsewhere on the page while it stays part of its parent.' },
    ],
    example: {
      title: 'Two pages and a dish page',
      code: ['import { BrowserRouter, Routes, Route, Link, useParams } from "react-router";', '', 'function Dish() {', '  const { id } = useParams();', '  return <p>Dish: {id}</p>;', '}', '', 'function App() {', '  return (', '    <BrowserRouter>', '      <nav className="card">', '        <p><Link to="/">Home</Link> · <Link to="/menu/tea">Lemon Tea</Link></p>', '      </nav>', '      <Routes>', '        <Route path="/" element={<p>Welcome to Rosa’s Café</p>} />', '        <Route path="/menu/:id" element={<Dish />} />', '      </Routes>', '    </BrowserRouter>', '  );', '}'],
      walk: [
        { line: 4, text: 'useParams reads :id from the address.' },
        { line: 10, text: 'BrowserRouter wraps the app.' },
        { line: 12, text: 'Links change the address without reloading.' },
        { line: 15, text: 'At / the welcome text shows.' },
        { line: 16, text: 'At /menu/tea, Dish shows “Dish: tea”.' },
      ],
      page: ROOT,
      output: ['Home · Lemon Tea', 'Welcome to Rosa’s Café'],
    },
    industry: 'Most React apps start from Vite or a framework such as Next.js (which has its own routing, covered in the Next.js track). React Router is the most used router for apps built with Vite.',
    interview: [
      { q: 'What does StrictMode do?', a: 'Adds extra checks in development, such as drawing twice, to find bugs. Nothing in production.' },
      { q: 'Why use Link instead of <a>?', a: 'Link changes the address inside the app without reloading the page.' },
      { q: 'What is code splitting?', a: 'Loading parts of the app only when needed, with lazy and Suspense.' },
    ],
    cheat: [
      { code: 'npm create vite@latest', meaning: 'start a project' },
      { code: '<Route path="/menu/:id" element={<Dish />} />', meaning: 'a page' },
      { code: '<Link to="/menu">', meaning: 'go there' },
      { code: 'lazy(() => import("./X.jsx"))', meaning: 'load later' },
      { code: 'createPortal(jsx, document.body)', meaning: 'draw elsewhere' },
    ],
  },
};
