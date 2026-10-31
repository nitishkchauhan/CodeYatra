// React · Module 11 · Effects. Lesson 11.1 keeps the old module id (r-effect-1). Lesson 11.2 loads the menu from the
// practice server (/api/menu and /api/menu/broken in lib/web/page.ts), so it works offline.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, xray } from './kit';

const TITLE = `import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = count + " in cart · Rosa’s Café";
    console.log("Effect ran: title is " + document.title);
  }, [count]);
  return (
    <div className="card">
      <p>{count} in cart</p>
      <button id="add" onClick={() => setCount(count + 1)}>Add a dish</button>
    </div>
  );
}`;

const FETCH = [
  'import { useState, useEffect } from "react";',
  '',
  'function App() {',
  '  const [url, setUrl] = useState("/api/menu");',
  '  const [dishes, setDishes] = useState([]);',
  '  const [error, setError] = useState("");',
  '  const [loading, setLoading] = useState(true);',
  '  useEffect(() => {',
  '    let ignore = false;',
  '    async function load() {',
  '      setLoading(true);',
  '      try {',
  '        const res = await fetch(url);',
  '        if (!res.ok) throw new Error("Server said " + res.status);',
  '        const data = await res.json();',
  '        if (!ignore) {',
  '          setDishes(data);',
  '          setError("");',
  '          console.log("Loaded " + data.length + " dishes");',
  '        }',
  '      } catch (e) {',
  '        if (!ignore) {',
  '          setError(e.message);',
  '          console.log("Error: " + e.message);',
  '        }',
  '      } finally {',
  '        if (!ignore) setLoading(false);',
  '      }',
  '    }',
  '    load();',
  '    return () => { ignore = true; };',
  '  }, [url]);',
  '  return (',
  '    <div className="card">',
  '      <button id="good" onClick={() => setUrl("/api/menu")}>Today’s menu</button>',
  '      <button id="broken" onClick={() => setUrl("/api/menu/broken")}>Broken server</button>',
  '      {loading ? <p className="muted">Loading…</p> : error ? <p className="err">{error}</p> : (',
  '        <ul>{dishes.map((d) => <li key={d.name}>{d.name} · ₹{d.price}</li>)}</ul>',
  '      )}',
  '    </div>',
  '  );',
  '}',
];

const TIMER = `import { useState, useEffect } from "react";

function KitchenTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    console.log("Timer started");
    return () => {
      clearInterval(id);
      console.log("Timer stopped");
    };
  }, []);
  return <p className="ok">Cooking for {seconds} s</p>;
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="card">
      <button id="toggle" onClick={() => setShow(!show)}>{show ? "Hide timer" : "Show timer"}</button>
      {show && <KitchenTimer />}
    </div>
  );
}`;

export const R_M11: Lesson[] = [
  lesson('r-effect-1', 'useEffect', 5, [
    chat(['Most of a component just works out what to show. Some things live outside React: the tab’s title, a timer, a server.', 'useEffect runs your code after React has drawn, to keep those things in step.']),
    tapPage('Keep the title in step', 'Add two dishes and watch the log.', app(TITLE), 'title is 2 in cart', [{ click: '#add' }, { click: '#add' }], 'The effect runs after the first draw, then again whenever count changes.'),
    reveal('The dependency list', [
      ['useEffect(fn)', 'Runs after every draw.'],
      ['useEffect(fn, [])', 'Runs once, after the first draw.'],
      ['useEffect(fn, [count])', 'Runs after the first draw, then whenever count changes.'],
    ], { mono: true }),
    check('When does useEffect(fn, [dish]) run?', ['After the first draw, and whenever dish changes', 'Before the component draws', 'Only once, ever', 'Every second'], 'List what the effect reads; it runs again when one of them changes.', 'What is in the list?', { mono: false }),
    tapbug('The title never changes after the first draw', ['useEffect(() => {', '  document.title = count + " in cart";', '}, []);'], [[3, '}, []);', '}, [count]);']], 'An empty list means “only once”. List what the effect reads.'),
    recap([
      ['⚡', 'Effects keep React in step with the outside'],
      ['🎨', 'They run after React has drawn'],
      ['📋', 'The list says when to run again'],
    ]),
  ], 'intermediate'),

  lesson('r-b-11-2', 'Loading data', 6, [
    reveal('Loading data, in 4 parts', [
      ['State', 'dishes, loading and error.'],
      ['useEffect', 'Starts the fetch after drawing.'],
      ['[url]', 'Fetches again when url changes.'],
      ['ignore', 'Skips an answer that arrives too late, after url has changed.'],
    ]),
    tapPage('The menu, from the server', 'Wait for the menu, then try the broken server.', app(FETCH.join('\n')), 'Error: Server said 500', [{ click: '#broken' }], 'Three screens from three pieces of state: loading, an error, or the list.'),
    explore('How the fetch works', FETCH, [
      [8, 'The effect starts after React has drawn.'],
      [9, 'ignore turns true if url changes before the answer comes back.'],
      [14, 'A server error isn’t thrown by fetch, so check res.ok yourself.'],
      [32, 'Fetch again whenever url changes.'],
      [37, 'Show loading, the error, or the dishes.', '.card'],
    ], { page: app(FETCH.join('\n')), minTaps: 3 }),
    check('Why is the fetch inside useEffect and not straight in the component?', ['The component body runs on every draw; the effect runs after drawing, when url changes', 'fetch only works inside effects', 'It is faster', 'React doesn’t allow fetch'], 'The body should only work out what to show.', 'How often does the body run?', { mono: false }),
    tapbug('It fetches again and again, forever', ['useEffect(() => {', '  fetch(url).then((r) => r.json()).then(setDishes);', '});'], [[3, '});', '}, [url]);']], 'With no list, the effect runs after every draw. setDishes draws again, which runs the effect again.'),
    recap([
      ['📡', 'Fetch inside useEffect'],
      ['⏳', 'Show loading, error and data'],
      ['🚫', 'Ignore answers that arrive too late'],
    ]),
  ], 'intermediate'),

  lesson('r-b-11-3', 'Clean-up, and when you don’t need an effect', 6, [
    chat(['Some effects start something that keeps going: a timer, a listener, a connection.', 'Return a clean-up function from the effect. React calls it before the effect runs again, and when the component goes away.']),
    tapPage('A kitchen timer', 'Hide the timer. Does it stop?', app(TIMER), 'Timer stopped', [{ click: '#toggle' }], 'Without the clean-up, the timer would keep counting for a component that is gone.'),
    toggle('Do you need an effect?', [
      ['With an effect', ['const [total, setTotal] = useState(0);', 'useEffect(() => {', '  setTotal(cart.length * 40);', '}, [cart]);'], 'React draws with the old total, then again with the new one. Extra code, extra work.'],
      ['Without', ['const total = cart.length * 40;'], 'Worked out while drawing. Always right, and no effect needed.'],
    ], 'Effects are for things outside React.'),
    matchUp('Effect or not?', [['Fetch the menu from a server', 'An effect'], ['Start a timer', 'An effect, with clean-up'], ['Work out a cart total', 'No effect: calculate it'], ['Respond to a button tap', 'No effect: an event handler']], 'Effects are only for keeping in step with the outside.'),
    check('When does React call an effect’s clean-up function?', ['Before the effect runs again, and when the component is removed', 'Only when the app closes', 'Before the first draw', 'Never: you call it yourself'], 'So nothing keeps running for a component that is gone.', 'When does the timer need to stop?', { mono: false }),
    recap([
      ['🧹', 'Return a clean-up to stop what you started'],
      ['🧮', 'Calculate values while drawing, not in effects'],
      ['👆', 'Taps belong in event handlers'],
    ]),
  ], 'intermediate'),

  challenge('r-i-11-ch', 'Module 11 Challenge', { icon: '⚡', name: 'Effect Expert' }, ['Run effects after drawing, with the right dependencies', 'Load data with loading and error screens', 'Clean up, and skip effects you don’t need'], [
    mcq(1, 'What is useEffect for?', ['Keeping a component in step with something outside React', 'Working out values to show', 'Handling button taps', 'Styling the page'], 'Titles, timers, servers.'),
    mcq(2, 'When does useEffect(fn, []) run?', ['Once, after the first draw', 'After every draw', 'Never', 'Before the first draw'], 'An empty list: nothing to watch.'),
    mcq(3, 'What should an effect return to stop a timer it started?', ['A clean-up function that clears it', 'null', 'The timer id', 'true'], 'return () => clearInterval(id).'),
    mcq(4, 'Why use an ignore flag when fetching in an effect?', ['To skip an answer that arrives after the url has changed', 'To make fetch faster', 'To hide errors', 'To stop React drawing'], 'The clean-up sets it when url changes.'),
    mcq(5, 'The cart total comes from the cart. How should you get it?', ['Work it out while drawing', 'useEffect and setTotal', 'Fetch it', 'Keep it in a timer'], 'You might not need an effect.'),
    swipe([
      ['Effects run after React has drawn', true, 'So the page is on screen first.'],
      ['An effect with no dependency list runs only once', false, 'It runs after every draw.'],
      ['A button tap belongs in an event handler, not an effect', true, 'Effects are not for taps.'],
      ['Clean-up runs only when the app closes', false, 'Before the next run, and when the component is removed.'],
    ]),
    pairs([['useEffect(fn)', 'After every draw'], ['useEffect(fn, [])', 'Once'], ['useEffect(fn, [url])', 'When url changes'], ['return () => …', 'Clean up']], 'Effects and their lists.'),
    pickCode('Which loads the menu again whenever url changes?', ['useEffect(() => { fetch(url).then(show); }, [url]);', 'useEffect(() => { fetch(url).then(show); });', 'useEffect(() => { fetch(url).then(show); }, []);', 'fetch(url).then(show); // in the component body'], 'Put url in the list.'),
    bugTask(['useEffect(() => {', '  const id = setInterval(tick, 1000);', '}, []);', 'useEffect(() => { setTotal(cart.length * 40); }, [cart]);'], [[2, 'setInterval(tick, 1000);', 'setInterval(tick, 1000); return () => clearInterval(id);'], [4, 'useEffect(() => { setTotal(cart.length * 40); }, [cart]);', 'const total = cart.length * 40;']], 'Clean up the timer, and work out the total without an effect.'),
    xray('<div class="card"><button>Broken server</button><p class="muted">Loading…</p><p class="err">Server said 500</p><ul><li>Lemon Tea · ₹40</li></ul></div>', [
      ['button', 'The button', 'setUrl("/api/menu/broken")', ['setUrl("/api/menu/broken")', 'loading', 'error', 'dishes.map(…)']],
      ['.muted', 'Loading…', 'loading', ['setUrl("/api/menu/broken")', 'loading', 'error', 'dishes.map(…)']],
      ['.err', 'The error', 'error', ['setUrl("/api/menu/broken")', 'loading', 'error', 'dishes.map(…)']],
      ['ul', 'The dishes', 'dishes.map(…)', ['setUrl("/api/menu/broken")', 'loading', 'error', 'dishes.map(…)']],
    ]),
    arrange(['import { useState, useEffect } from "react";', 'function App() {', '  const [count, setCount] = useState(0);', '  useEffect(() => { fetch("/api/menu").then((r) => r.json()).then((d) => setCount(d.length)); }, []);', '  return <p className="card">{count} dishes on the menu</p>;', '}'], 'import, start App, make the state, load once in an effect, then show the count'),
  ], { level: 'intermediate' }),
];
