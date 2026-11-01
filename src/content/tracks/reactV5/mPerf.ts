// React · Faster React: memo, useMemo and useCallback (Intermediate, after Context and reducers). Each page counts
// how often a part was drawn or worked out, so the skipped work can be seen in the log.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, UI, xray } from './kit';

const MEMO = `import { useState, memo } from "react";

let menuDraws = 0;

const Menu = memo(function Menu({ dishes }) {
  menuDraws = menuDraws + 1;
  return <ul>{dishes.map((d) => <li key={d}>{d}</li>)}</ul>;
});

const DISHES = ["Lemon Tea", "Cheese Toast", "Veg Sandwich"];

function App() {
  const [likes, setLikes] = useState(0);
  function like() {
    setLikes(likes + 1);
    console.log("Likes: " + (likes + 1) + ", Menu drawn " + menuDraws + " time");
  }
  return (
    <div className="card">
      <button id="like" onClick={like}>♥ {likes}</button>
      <Menu dishes={DISHES} />
    </div>
  );
}`;

const DARK_CSS = `${UI}
.dark { background: #1F2A30; color: #F4FBFD; }`;

const USE_MEMO = `import { useState, useMemo } from "react";

const DISHES = ["Lemon Tea", "Iced Tea", "Cheese Toast", "Veg Sandwich", "Chicken Sandwich"];
let runs = 0;

function App() {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const shown = useMemo(() => {
    runs = runs + 1;
    return DISHES.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
  }, [query]);
  function flip() {
    setDark(!dark);
    console.log("Theme changed, filter has run " + runs + " time");
  }
  return (
    <div className={dark ? "card dark" : "card"}>
      <input id="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <button id="flip" onClick={flip}>Switch theme</button>
      <ul>{shown.map((d) => <li key={d}>{d}</li>)}</ul>
    </div>
  );
}`;

const USE_CALLBACK = `import { useState, useCallback, memo } from "react";

let buttonDraws = 0;

const OrderButton = memo(function OrderButton({ onOrder }) {
  buttonDraws = buttonDraws + 1;
  return <button id="order" onClick={onOrder}>Order a tea</button>;
});

function App() {
  const [likes, setLikes] = useState(0);
  const [cups, setCups] = useState(0);
  const order = useCallback(() => setCups((c) => c + 1), []);
  function like() {
    setLikes(likes + 1);
    console.log("Likes: " + (likes + 1) + ", button drawn " + buttonDraws + " time");
  }
  return (
    <div className="card">
      <p>{cups} teas ordered · ♥ {likes}</p>
      <button id="like" onClick={like}>Like</button>
      <OrderButton onOrder={order} />
    </div>
  );
}`;

export const R_PERF: Lesson[] = [
  lesson('r-perf-1', 'Skipping redraws with memo', 5, [
    reveal('When does a component draw again?', [
      ['Its state changes', 'Like likes going up.'],
      ['Its parent draws again', 'By default, every child draws again too.'],
      ['memo(Component)', 'Skips drawing again when all its props are the same as last time.'],
      ['Measure first', 'Most drawing is fast. Use memo for parts that are really slow.'],
    ]),
    tapPage('Like it, without redrawing the menu', 'Like twice.', app(MEMO), 'Likes: 2, Menu drawn 1 time', [{ click: '#like' }, { click: '#like' }], 'App drew again twice, but memo skipped Menu: its dishes prop never changed.'),
    check('App draws again. When does a memo child skip drawing?', ['When all its props are the same as last time', 'Always', 'Never', 'When it has no state'], 'memo compares the old and new props.', 'What does memo compare?', { mono: false }),
    truth([
      ['By default, children draw again when their parent does', true, 'Even if their props didn’t change.'],
      ['memo makes everything faster, so use it everywhere', false, 'Comparing props is work too. Use it where drawing is slow.'],
      ['A memo component still draws when its own state changes', true, 'memo only skips draws caused by the parent.'],
    ]),
    tapbug('Menu still draws on every like', ['<Menu dishes={["Lemon Tea", "Cheese Toast"]} />'], [[1, '{["Lemon Tea", "Cheese Toast"]}', '{DISHES}']], 'A new array is made on every draw, so the prop is never the same. Keep it outside the component.'),
    recap([
      ['🔁', 'Children draw again with their parent'],
      ['⏭', 'memo skips them when props are the same'],
      ['📏', 'Measure first, then memo the slow parts'],
    ]),
  ], 'intermediate'),

  lesson('r-i-p-2', 'useMemo', 5, [
    chat(['Some values take work to calculate, like filtering a long list.', 'useMemo keeps the last answer and works it out again only when what it depends on changes.']),
    tapPage('Filter once, not on every draw', 'Switch the theme twice.', app(USE_MEMO, DARK_CSS), 'Theme changed, filter has run 1 time', [{ click: '#flip' }, { click: '#flip' }], 'The theme changed but the search didn’t, so useMemo kept the old list.'),
    reveal('useMemo', [
      ['useMemo(() => work(), [query])', 'Run the work and keep its answer.'],
      ['[query]', 'Work it out again only when query changes.'],
      ['Not for everything', 'Simple sums are fast. Use it for slow work, or to keep a prop the same for memo.'],
    ], { mono: true }),
    check('When does useMemo(() => filter(list, q), [q]) filter again?', ['When q changes', 'On every draw', 'Never again', 'When the list is long'], 'The list says when.', 'Look at the dependency list.', { mono: false }),
    matchUp('Which tool?', [['Skip drawing a child', 'memo'], ['Keep a worked-out value', 'useMemo'], ['Keep a value without drawing', 'useRef'], ['Change what is shown', 'useState']], 'Each hook has one job.'),
    recap([
      ['🧠', 'useMemo keeps a worked-out value'],
      ['📋', 'It works it out again when its list changes'],
      ['🐢', 'Use it for slow work only'],
    ]),
  ], 'intermediate'),

  lesson('r-i-p-3', 'useCallback', 5, [
    reveal('Functions are new on every draw', [
      ['const order = () => …', 'A new function each time App draws.'],
      ['memo sees a new prop', 'So a memo child draws again anyway.'],
      ['useCallback(fn, [])', 'Keeps the same function between draws.'],
      ['React Compiler', 'A build tool that can add this for you. Many new projects use it.'],
    ], { mono: true }),
    tapPage('A button that doesn’t redraw', 'Like twice.', app(USE_CALLBACK), 'Likes: 2, button drawn 1 time', [{ click: '#like' }, { click: '#like' }], 'order is the same function every time, so memo skips OrderButton.'),
    toggle('Without and with useCallback', [
      ['Without', ['const order = () => setCups((c) => c + 1);'], 'A new function on every draw, so OrderButton draws every time.'],
      ['With', ['const order = useCallback(', '  () => setCups((c) => c + 1),', '  []', ');'], 'The same function, so memo can skip OrderButton.'],
    ]),
    check('Why is useCallback useful with memo?', ['It keeps a function prop the same, so memo can skip drawing', 'It makes the function run faster', 'It runs the function only once', 'It replaces useState'], 'Same function, same prop.', 'What does memo compare?', { mono: false }),
    tapbug('OrderButton draws on every like', ['const order = useCallback(() => setCups((c) => c + 1));'], [[1, '(c) => c + 1));', '(c) => c + 1), []);']], 'Without a list, useCallback gives a new function every time.'),
    recap([
      ['🆕', 'Functions are new on every draw'],
      ['📌', 'useCallback keeps the same one'],
      ['🤝', 'It helps memo children skip drawing'],
    ]),
  ], 'intermediate'),

  challenge('r-i-p-ch', 'Faster React Challenge', { icon: '🚀', name: 'Speed Tuner' }, ['Skip redraws with memo', 'Keep worked-out values with useMemo', 'Keep functions the same with useCallback'], [
    mcq(1, 'By default, when a parent draws again, its children…', ['Draw again too', 'Never draw again', 'Draw only if they have state', 'Are removed'], 'Even with the same props.'),
    mcq(2, 'What does memo(Component) do?', ['Skips drawing again when its props are the same', 'Saves the component for later', 'Runs it only once', 'Lets it change its props'], 'It compares props.'),
    mcq(3, 'What does useMemo keep?', ['A worked-out value, until its list changes', 'A function', 'An element on the page', 'State that redraws'], 'Like a filtered list.'),
    mcq(4, 'What does useCallback keep?', ['The same function between draws', 'The answer a function gives', 'A timer', 'A list of props'], 'So memo sees the same prop.'),
    mcq(5, 'When should you add memo, useMemo and useCallback?', ['When something is really slow, after measuring', 'On every component', 'Never', 'Only in old React'], 'Most drawing is fast.'),
    swipe([
      ['A new array written in JSX is a new prop on every draw', true, 'Keep it outside, or in useMemo.'],
      ['useMemo runs its function on every draw', false, 'Only when its list changes.'],
      ['memo compares the old and new props', true, 'That is how it decides.'],
      ['useCallback makes a function run faster', false, 'It keeps the same function.'],
    ]),
    pairs([['memo', 'Skip a child'], ['useMemo', 'Keep a value'], ['useCallback', 'Keep a function'], ['[query]', 'When to work it out again']], 'Speed tools.'),
    pickCode('Which filters again only when query changes?', ['const shown = useMemo(() => filter(query), [query]);', 'const shown = useMemo(() => filter(query));', 'const shown = useCallback(filter(query), [query]);', 'const shown = memo(filter(query));'], 'useMemo with query in the list.'),
    bugTask(['const Menu = memo(function Menu({ dishes }) { … });', '<Menu dishes={["Lemon Tea"]} />', 'const order = useCallback(() => add());', 'const shown = useMemo(() => filter(query), []);'], [[2, '{["Lemon Tea"]}', '{DISHES}'], [3, 'add());', 'add(), []);'], [4, 'filter(query), []', 'filter(query), [query]']], 'Keep props the same, give useCallback a list, and list what useMemo reads.'),
    xray('<div class="card"><input placeholder="Search"><button>Switch theme</button><ul><li>Lemon Tea</li><li>Iced Tea</li></ul></div>', [
      ['input', 'The search box', 'value={query}', ['value={query}', 'setDark(!dark)', 'useMemo(…, [query])']],
      ['button', 'The theme button', 'setDark(!dark)', ['value={query}', 'setDark(!dark)', 'useMemo(…, [query])']],
      ['ul', 'The filtered list', 'useMemo(…, [query])', ['value={query}', 'setDark(!dark)', 'useMemo(…, [query])']],
    ]),
    arrange(['import { useMemo } from "react";', 'const DISHES = ["Lemon Tea", "Cheese Toast"];', 'function App() {', '  const count = useMemo(() => DISHES.length, []);', '  return <p className="card">{count} dishes</p>;', '}'], 'import, the list, start App, work out the count once, then show it'),
  ], { level: 'intermediate' }),
];
