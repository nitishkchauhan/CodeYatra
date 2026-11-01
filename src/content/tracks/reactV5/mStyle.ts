// React · Styling (the last Basic module, after Forms): classes and CSS files, the style prop, and CSS modules.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, UI, xray } from './kit';

const SOLD_CSS = `${UI}
.sold-out { opacity: 0.5; border-style: dashed; }`;

const CLASSES = `import { useState } from "react";

function DishCard({ name, soldOut }) {
  return (
    <div className={soldOut ? "card sold-out" : "card"}>
      <h3>{name}</h3>
      {soldOut && <p className="muted">Sold out today</p>}
    </div>
  );
}

function App() {
  const [out, setOut] = useState(false);
  function toggle() {
    setOut(!out);
    console.log("Cheese Toast classes: " + (!out ? "card sold-out" : "card"));
  }
  return (
    <div>
      <DishCard name="Lemon Tea" soldOut={false} />
      <DishCard name="Cheese Toast" soldOut={out} />
      <button id="out" onClick={toggle}>Mark toast sold out</button>
    </div>
  );
}`;

const INLINE = `import { useState } from "react";

function App() {
  const [big, setBig] = useState(false);
  const badge = {
    backgroundColor: big ? "#0E7490" : "#CFE8EE",
    color: big ? "white" : "#2B2118",
    fontSize: big ? 22 : 16,
    padding: "6px 12px",
    borderRadius: 12,
  };
  function grow() {
    setBig(!big);
    console.log("Font size: " + (!big ? 22 : 16) + "px");
  }
  return (
    <div className="card">
      <span style={badge}>Today’s special: Mango Smoothie</span>
      <p><button id="grow" onClick={grow}>Make it stand out</button></p>
    </div>
  );
}`;

export const R_STYLE: Lesson[] = [
  lesson('r-style-1', 'Classes and CSS files', 5, [
    chat(['React draws normal HTML elements, so normal CSS styles them.', 'Write the CSS in a .css file, import it once, and give elements classes with className.']),
    reveal('Styling with classes', [
      ['import "./App.css";', 'Bring a CSS file into the app. Its rules apply to the whole page.'],
      ['className="card"', 'class is a JavaScript word, so JSX uses className.'],
      ['className={soldOut ? "card sold-out" : "card"}', 'Choose the classes from props or state.'],
    ], { mono: true }),
    tapPage('A sold-out look', 'Mark the toast sold out.', app(CLASSES, SOLD_CSS), 'Cheese Toast classes: card sold-out', [{ click: '#out' }], 'The CSS never changes. React only changes which classes the card has.'),
    check('Which adds the class “card” in JSX?', ['className="card"', 'class="card"', 'style="card"', 'css="card"'], 'className, because class is a JavaScript word.', 'It is not quite the HTML name.', { mono: true }),
    tapbug('React warns about the class', ['<div class="card">Lemon Tea</div>'], [[1, 'class=', 'className=']], 'In JSX it is className.'),
    recap([
      ['📄', 'Import a .css file once'],
      ['🏷', 'Use className, not class'],
      ['🔀', 'Pick classes from props or state'],
    ]),
  ]),

  lesson('r-b-s-2', 'The style prop', 5, [
    reveal('Inline styles', [
      ['style={{ color: "teal" }}', 'The outer { } is for JavaScript, the inner { } is the object.'],
      ['backgroundColor', 'CSS names become camelCase: background-color is backgroundColor.'],
      ['fontSize: 22', 'A plain number means pixels for most sizes.'],
      ['When to use it', 'For values worked out in code. For everything else, classes are easier to reuse.'],
    ], { mono: true }),
    tapPage('Make the special stand out', 'Tap “Make it stand out”.', app(INLINE), 'Font size: 22px', [{ click: '#grow' }], 'The style object is worked out from state on every draw.'),
    toggle('CSS file or style prop?', [
      ['CSS file', ['.badge {', '  background-color: #0E7490;', '  font-size: 22px;', '}'], 'In a .css file: names with dashes, and units written out.'],
      ['style prop', ['<span style={{', '  backgroundColor: "#0E7490",', '  fontSize: 22,', '}}>'], 'In JSX: camelCase names in an object, and numbers for pixels.'],
    ]),
    check('Which is a correct style prop?', ['style={{ fontSize: 18 }}', 'style="font-size: 18px"', 'style={ fontSize: 18 }', 'style={{ font-size: 18 }}'], 'An object, with camelCase names.', 'Two pairs of braces, and no dashes.', { mono: true }),
    tapbug('React shows an error about style', ['<p style="color: red">Sold out</p>'], [[1, 'style="color: red"', 'style={{ color: "red" }}']], 'In JSX, style takes an object, not text.'),
    recap([
      ['🎨', 'style takes an object: {{ … }}'],
      ['🐫', 'CSS names become camelCase'],
      ['🔢', 'Numbers mean pixels'],
    ]),
  ]),

  lesson('r-b-s-3', 'CSS modules and tidy styles', 5, [
    chat(['In a big app, two people may both write a .title class, and one style spoils the other.', 'CSS modules fix this: each component gets its own .module.css file, and the build tool makes its class names unique.']),
    toggle('Plain CSS or a CSS module?', [
      ['Plain CSS', ['/* Menu.css */', '.title { color: teal; }', '', 'import "./Menu.css";', '<h3 className="title">Menu</h3>'], 'Every .title on the page gets this colour, in any component.'],
      ['CSS module', ['/* Menu.module.css */', '.title { color: teal; }', '', 'import styles from "./Menu.module.css";', '<h3 className={styles.title}>Menu</h3>'], 'The build tool renames it, like Menu_title_x7f2, so it only styles this component.'],
    ]),
    reveal('Ways to style React', [
      ['A .css file', 'Simple and page-wide. Good for small apps and shared rules.'],
      ['CSS modules', 'One .module.css file per component, with names made unique.'],
      ['The style prop', 'For values worked out in code.'],
      ['Libraries', 'Teams also use tools such as Tailwind CSS, which gives ready-made classes.'],
    ]),
    check('In a CSS module, what is styles.title?', ['A unique class name made from .title', 'The CSS text of .title', 'The colour teal', 'An error'], 'Use it as className={styles.title}.', 'The build tool renames the class.', { mono: false }),
    matchUp('Which way?', [['A colour worked out from a price', 'The style prop'], ['Rules for the whole page', 'A plain .css file'], ['Classes that must not clash', 'A CSS module'], ['Showing a card as sold out', 'A different className']], 'Pick the simplest way that works.'),
    truth([
      ['Plain CSS rules apply to the whole page', true, 'Even when imported by one component.'],
      ['A CSS module class can clash with another component’s class', false, 'Its names are made unique.'],
      ['You can mix CSS files, modules and the style prop in one app', true, 'Many apps do.'],
    ]),
    recap([
      ['🧩', 'CSS modules keep classes to one component'],
      ['🔑', 'Use them as className={styles.name}'],
      ['🧰', 'Mix files, modules and style as needed'],
    ]),
  ]),

  challenge('r-b-s-ch', 'Styling Challenge', { icon: '🎨', name: 'Style Maker' }, ['Style with CSS files and className', 'Use the style prop with camelCase', 'Keep classes apart with CSS modules'], [
    mcq(1, 'Which prop sets a class in JSX?', ['className', 'class', 'styleName', 'css'], 'class is a JavaScript word.', { mono: true }),
    mcq(2, 'How is background-color written in a style object?', ['backgroundColor', 'background-color', 'BackgroundColor', 'bgColor'], 'camelCase.', { mono: true }),
    mcq(3, 'What does style={{ fontSize: 20 }} mean?', ['20 pixels', '20 per cent', '20 em', 'Nothing: units are needed'], 'A number means pixels.'),
    mcq(4, 'Why use a CSS module?', ['So class names don’t clash between components', 'To make CSS run faster', 'To write CSS inside JavaScript', 'To use inline styles'], 'Names are made unique.'),
    mcq(5, 'How do you load a plain CSS file in a React app?', ['import "./App.css";', '<css src="App.css">', 'require.style("App.css")', 'useCss("App.css")'], 'Import it once.', { mono: true }),
    swipe([
      ['In JSX, style takes an object', true, 'style={{ … }}.'],
      ['class works just like className in JSX', false, 'React warns. Use className.'],
      ['Classes can be chosen from state', true, 'className={out ? "card sold-out" : "card"}.'],
      ['Inline styles are best for everything', false, 'Classes are easier to reuse.'],
    ]),
    pairs([['className', 'Add classes'], ['style={{…}}', 'Inline styles'], ['fontSize: 20', '20 pixels'], ['styles.title', 'A CSS module class']], 'Styling in React.'),
    pickCode('Which adds “sold-out” only when soldOut is true?', ['className={soldOut ? "card sold-out" : "card"}', 'class={soldOut && "sold-out"}', 'className="card {soldOut}"', 'style={soldOut ? "sold-out" : ""}'], 'Choose the class text with a condition.'),
    bugTask(['<div class="card">', '  <p style="color: grey">Sold out</p>', '  <span style={{ font-size: 18 }}>₹80</span>', '</div>'], [[1, 'class=', 'className='], [2, 'style="color: grey"', 'style={{ color: "grey" }}'], [3, 'font-size', 'fontSize']], 'className, an object for style, and camelCase names.'),
    xray('<div class="card sold-out"><h3>Cheese Toast</h3><span style="font-size:22px">Today’s special</span><button>Mark toast sold out</button></div>', [
      ['div.card', 'The card', 'className={soldOut ? "card sold-out" : "card"}', ['className={soldOut ? "card sold-out" : "card"}', 'style={badge}', 'onClick={toggle}']],
      ['span', 'The big badge', 'style={badge}', ['className={soldOut ? "card sold-out" : "card"}', 'style={badge}', 'onClick={toggle}']],
      ['button', 'The button', 'onClick={toggle}', ['className={soldOut ? "card sold-out" : "card"}', 'style={badge}', 'onClick={toggle}']],
    ]),
    arrange(['const badge = { backgroundColor: "#0E7490", color: "white", padding: 8 };', 'function App() {', '  return <p style={badge}>Mango Smoothie</p>;', '}'], 'make the style object, start App, then use it'),
  ]),
];
