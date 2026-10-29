// JavaScript track · Module 13 · Browser, Data and Async, and the final challenge. Lesson 13.4 keeps the old async
// module id (j-async-1); the final challenge keeps the project id (j-project): Sharma Classes, now working.
// Loading data uses the practice server inside the app (offline, the same answer every time; see lib/web/page.ts).
import type { Lesson, WebStep } from '../../types';
import { UI } from './cafe';
import { bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predictTask, recap, reveal, run, swipe, tapbug, tapPage, toggleRun, truth } from './kit';

const LOAD_MENU = 'async function loadMenu(url) {\n  const out = document.querySelector("#out");\n  out.textContent = "Loading…";\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error("Server said " + res.status);\n    const menu = await res.json();\n    if (!menu.length) {\n      out.textContent = "No dishes today";\n      console.log("Empty menu");\n      return;\n    }\n    out.textContent = menu.map((d) => d.name + " ₹" + d.price).join(" · ");\n    console.log("Loaded " + menu.length + " dishes");\n  } catch (err) {\n    out.textContent = "Couldn’t load the menu. " + err.message;\n    console.log("Error: " + err.message);\n  }\n}\ndocument.querySelector("#ok").addEventListener("click", () => loadMenu("/api/menu"));\ndocument.querySelector("#empty").addEventListener("click", () => loadMenu("/api/menu/empty"));\ndocument.querySelector("#broken").addEventListener("click", () => loadMenu("/api/menu/broken"));';

// ── The final project: Sharma Classes (built in HTML, styled in CSS), now made to work ─────────────
const SHARMA = `<header class="top">
  <strong>Sharma Classes</strong>
  <button id="theme">Dark mode</button>
</header>
<main class="page">
  <h2>Courses</h2>
  <div class="filters">
    <button data-cls="all">All</button>
    <button data-cls="10">Class 10</button>
    <button data-cls="12">Class 12</button>
  </div>
  <ul id="courses">
    <li data-cls="10">Maths, Class 10</li>
    <li data-cls="12">Physics, Class 12</li>
    <li data-cls="12">Chemistry, Class 12</li>
  </ul>
  <h2>Batches</h2>
  <button id="load">Show batches</button>
  <ul id="batches"></ul>
  <h2>Enquire</h2>
  <form id="enquiry">
    <input id="phone" placeholder="Mobile number">
    <button>Send</button>
  </form>
  <p id="msg"></p>
</main>`;
const SHARMA_CSS = `:root { --blue: #1E3A8A; --gold: #F59E0B; --text: #1F2937; --bg: #FFFFFF; }
body { margin: 0; font-family: system-ui, sans-serif; color: var(--text); background: var(--bg); }
body.dark { --text: #F9FAFB; --bg: #0F172A; }
.top { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--blue); color: white; }
.page { padding: 12px; }
h2 { color: var(--gold); margin-bottom: 6px; }
button { padding: 8px 12px; border: 0; border-radius: 8px; background: var(--gold); color: #1F2937; font-weight: bold; }
.hidden { display: none; }
.err { color: #DC2626; }
.ok { color: #16A34A; }`;
const J1 = `// 1. Filter the courses
for (const btn of document.querySelectorAll(".filters button")) {
  btn.addEventListener("click", () => {
    const cls = btn.dataset.cls;
    for (const li of document.querySelectorAll("#courses li")) {
      li.classList.toggle("hidden", cls !== "all" && li.dataset.cls !== cls);
    }
  });
}
`;
const J2 = `${J1}
// 2. Check the enquiry form
document.querySelector("#enquiry").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.querySelector("#phone").value.trim();
  const msg = document.querySelector("#msg");
  const ok = /^[6-9]\\d{9}$/.test(phone);
  msg.textContent = ok ? "Thanks! We will call you." : "Please enter a 10-digit mobile number";
  msg.className = ok ? "ok" : "err";
});
`;
const J3 = `${J2}
// 3. Load the batches from the server
document.querySelector("#load").addEventListener("click", async () => {
  const list = document.querySelector("#batches");
  try {
    const res = await fetch("/api/batches");
    if (!res.ok) throw new Error("Server said " + res.status);
    const batches = await res.json();
    for (const b of batches) {
      const li = document.createElement("li");
      li.textContent = b.course + ": " + b.days + ", " + b.time;
      list.append(li);
    }
  } catch (err) {
    list.textContent = "Couldn’t load the batches.";
  }
});
`;
const J4 = `${J3}
// 4. Dark mode, remembered on this phone
const themeBtn = document.querySelector("#theme");
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
themeBtn.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
});
`;

const project = (n: number, title: string, instructions: string, starterJs: string, solutionJs: string, checks: WebStep['checks'], hint: string): WebStep => ({
  type: 'web',
  kicker: `FINAL PROJECT · STEP ${n} OF 4`,
  title,
  instructions,
  starter: { html: SHARMA, css: SHARMA_CSS, js: starterJs },
  solution: { html: SHARMA, css: SHARMA_CSS, js: solutionJs },
  checks,
  hint,
});

export const JS_M13: Lesson[] = [
  lesson('js-13-1', 'The browser window', 4, [
    reveal('What the browser tells you', [
      ['window', 'The browser tab itself. Everything else hangs off it.'],
      ['location', 'The address: location.href, location.pathname. Setting it moves to another page.'],
      ['history', 'history.back() goes back, like the back button.'],
      ['navigator', 'About the device: navigator.language, navigator.onLine.'],
      ['screen / innerWidth', 'Screen and window sizes.'],
      ['alert, confirm, prompt', 'Pop-up boxes. They block the page, so real apps use their own dialogs.'],
    ], { mono: true }),
    tapPage('Ask the browser', 'Tap the button to see what this preview knows.', { html: '<button id="ask">What do you know?</button>\n<pre id="out"></pre>', css: UI, js: 'document.querySelector("#ask").addEventListener("click", () => {\n  const facts = [\n    "Width: " + window.innerWidth + "px",\n    "Language: " + navigator.language,\n    "Online: " + navigator.onLine,\n  ];\n  document.querySelector("#out").textContent = facts.join("\\n");\n  for (const f of facts) console.log(f);\n});' }, 'Online:', [{ click: '#ask' }], 'A real site uses these to adapt: the right language, a “you are offline” banner, a layout for the width.'),
    matchUp('Which object?', [['location.href', 'The page address'], ['history.back()', 'Go back'], ['navigator.onLine', 'Is there internet?'], ['innerWidth', 'How wide the window is']], 'The browser objects.'),
    check('Which object holds the page’s address?', ['location', 'history', 'navigator', 'screen'], 'location.href is the full address.', 'Where are you?'),
    tapbug('The page never goes back', ['backButton.addEventListener("click", () => {', '  history.back;', '});'], [[2, 'history.back;', 'history.back();']], 'Without ( ) the method is only mentioned, never called.'),
    recap([
      ['🪟', 'window is the tab'],
      ['📍', 'location, history: where you are and were'],
      ['📱', 'navigator, screen: the device'],
    ]),
  ]),

  lesson('js-13-2', 'Saving on the phone', 5, [
    chat(['Riya’s customers build a cart, close the app, come back later… and the cart is gone.', 'localStorage keeps small bits of data on the phone, even after the page is closed.']),
    tapPage('A cart that remembers', 'Add a couple of teas. The count is saved each time.', { html: '<button id="add">Add tea</button>\n<button id="clear">Clear</button>\n<p id="cart"></p>', css: UI, js: 'let teas = Number(localStorage.getItem("teas") ?? 0);\nconst show = () => (document.querySelector("#cart").textContent = "Teas in cart: " + teas);\nshow();\ndocument.querySelector("#add").addEventListener("click", () => {\n  teas++;\n  localStorage.setItem("teas", String(teas));\n  show();\n  console.log("Saved: " + teas);\n});\ndocument.querySelector("#clear").addEventListener("click", () => {\n  teas = 0;\n  localStorage.removeItem("teas");\n  show();\n  console.log("Cleared");\n});' }, 'Saved: 2', [{ click: '#add' }, { click: '#add' }], 'On a real website the count is still there after a reload. (This lesson preview may forget it, as it is a fresh page each time.)'),
    reveal('Storage on the phone', [
      ['localStorage', 'Stays until it’s cleared. setItem, getItem, removeItem.'],
      ['sessionStorage', 'The same, but forgotten when the tab closes.'],
      ['Only text', 'Store objects with JSON.stringify and read them with JSON.parse (next lesson).'],
      ['Cookies', 'Small text the server can read too; mostly for logins. Never store passwords in any of these.'],
    ], { mono: true }),
    reveal('It only stores text', [
      ['setItem("teas", 3)', 'Comes back from getItem as "3", a string. Convert with Number().'],
      ['setItem("cart", JSON.stringify(cart))', 'Turn an object into text to save it…'],
      ['JSON.parse(getItem("cart"))', '…and back into an object to use it.'],
    ], { mono: true, kicker: 'TAP TO REVEAL' }),
    tapbug('The cart says [object Object]', ['localStorage.setItem("cart", cart);'], [[1, 'cart);', 'JSON.stringify(cart));']], 'Storage keeps text. Turn the object into JSON first.'),
    recap([
      ['💾', 'localStorage keeps data on the phone'],
      ['🔤', 'It stores text: use JSON for objects'],
      ['🔐', 'Never store passwords there'],
    ]),
  ]),

  lesson('js-13-3', 'JSON', 5, [
    reveal('JSON: data as text', [
      ['What', 'JavaScript Object Notation: objects and arrays written as text, so they can be saved or sent.'],
      ['Rules', 'Keys in double quotes, no trailing commas, no functions.'],
      ['Everywhere', 'Almost every app and server swaps data as JSON. Older systems used XML, which is wordier.'],
    ]),
    run('Text to object and back', 'Pick a line.', ['const text = \'{"dish":"Lemon Tea","price":40,"veg":true}\';', 'const dish = JSON.parse(text);', 'console.log({{v}});'], ['dish.price', 'typeof text', 'typeof dish', 'JSON.stringify(dish)', 'JSON.stringify({ ...dish, price: 45 })'], { caption: 'JSON.parse: text → object. JSON.stringify: object → text.' }),
    toggleRun('Valid or not?', [
      ['Valid', ['const ok = JSON.parse(\'{"cups": 2}\');', 'console.log(ok.cups);'], 'Double quotes around the key: valid JSON.', ['2']],
      ['Invalid', ['const bad = JSON.parse("{cups: 2}");', 'console.log(bad.cups);'], 'JavaScript allows keys without quotes, but JSON doesn’t, so parse throws.', ['SyntaxError: Expected property name or \'}\' in JSON at position 1 (line 1 column 2)']],
    ]),
    check('What does JSON.stringify({ a: 1 }) give?', ['\'{"a":1}\'', '{ a: 1 }', '"a=1"', '[a, 1]'], 'Text with the key in double quotes.', 'It becomes a string.'),
    tapbug('SyntaxError in JSON', ['{', '  "dish": "Tea",', '  "price": 40,', '}'], [[3, '40,', '40']], 'JSON doesn’t allow a comma after the last item.'),
    recap([
      ['📨', 'JSON is data as text'],
      ['🔁', 'parse: text → object; stringify: object → text'],
      ['⚠️', 'Double-quoted keys, no trailing commas'],
    ]),
  ]),

  lesson('j-async-1', 'Promises', 6, [
    chat(['Some things take time: loading the menu from the server, waiting for a timer.', 'JavaScript doesn’t freeze while it waits. It carries on, and comes back when the answer is ready. A Promise is the ticket for that answer.']),
    tapPage('Which message comes first?', 'Tap Order and watch the order of the messages.', { html: '<button id="go">Order a tea</button>', css: UI, js: 'document.querySelector("#go").addEventListener("click", () => {\n  console.log("1. Order placed");\n  const tea = new Promise((resolve) => setTimeout(() => resolve("Lemon Tea"), 500));\n  tea.then((t) => console.log("3. " + t + " ready"));\n  console.log("2. Next customer, please");\n});' }, 'ready', [{ click: '#go' }], 'The tea takes time, so line 2 runs before the tea is ready. That is asynchronous code.'),
    reveal('A Promise has three states', [
      ['pending', 'Still waiting.', '⏳'],
      ['fulfilled', 'Done, with a value: .then(value => …) runs.', '✅'],
      ['rejected', 'Failed, with an error: .catch(err => …) runs.', '❌'],
    ]),
    explore('Reading then and catch', ['fetch("/api/menu")', '  .then((res) => res.json())', '  .then((menu) => console.log(menu.length))', '  .catch((err) => console.log("Failed", err))', '  .finally(() => console.log("Done"));'], [
      [1, 'fetch gives back a Promise straight away, not the data.'],
      [2, 'When it arrives, turn the reply into data (another Promise).'],
      [3, 'Then use the data.'],
      [4, 'If anything above failed, catch runs.'],
      [5, 'finally runs either way.'],
    ], { page: { html: '<p>A chain: each step waits for the one before.</p>', css: UI }, minTaps: 3 }),
    check('Code: log A; a Promise that logs B when done; log C. What order?', ['A, C, B', 'A, B, C', 'B, A, C', 'C, B, A'], 'The Promise’s message waits until the current code has finished.', 'Waiting code comes last.', { mono: false }),
    tapbug('It prints undefined', ['const menu = fetch("/api/menu");', 'console.log(menu.length);'], [[1, 'fetch("/api/menu")', 'await (await fetch("/api/menu")).json()']], 'fetch gives a Promise, not the data. Wait for it (with await or .then) and read the JSON.'),
    recap([
      ['🎟', 'A Promise is a ticket for a later answer'],
      ['⏭', 'Code keeps running while it waits'],
      ['✅', '.then for success, .catch for failure'],
    ]),
  ]),

  lesson('js-13-5', 'async and await', 5, [
    explore('The same load, written with await', ['async function load() {', '  const res = await fetch("/api/menu");', '  const menu = await res.json();', '  show(menu);', '}'], [
      [1, 'async marks a function that will wait for things.'],
      [2, 'await pauses this function (not the page) until fetch has a reply. No .then needed.'],
      [3, 'Wait again for the data.'],
      [4, 'Then carry on, top to bottom, like normal code.'],
    ], { page: { html: '<p>Same result as the .then chain, easier to read.</p>', css: UI }, minTaps: 3 }),
    tapPage('Two requests at once', 'Tap a button: one after the other, or both together with Promise.all.', { html: '<button id="one">One by one</button>\n<button id="all">Together</button>\n<p id="out" class="muted"></p>', css: UI, js: 'const t0 = () => performance.now();\nasync function getJson(url) {\n  const res = await fetch(url);\n  return res.json();\n}\ndocument.querySelector("#one").addEventListener("click", async () => {\n  const start = t0();\n  await getJson("/api/menu");\n  await getJson("/api/batches");\n  console.log("One by one: about " + Math.round((t0() - start) / 100) / 10 + " s");\n});\ndocument.querySelector("#all").addEventListener("click", async () => {\n  const start = t0();\n  const [menu, batches] = await Promise.all([getJson("/api/menu"), getJson("/api/batches")]);\n  console.log("Together: " + menu.length + " dishes and " + batches.length + " batches in about " + Math.round((t0() - start) / 100) / 10 + " s");\n});' }, 'Together:', [{ click: '#all' }], 'Promise.all starts both at once and waits for both, so it takes about half the time.'),
    reveal('Rules for await', [
      ['Only inside async', 'await works inside an async function (and at the top of modules).'],
      ['async returns a Promise', 'Whoever calls it must await it too, or use .then.'],
      ['Errors', 'Wrap awaits in try/catch, like normal code.'],
    ], { mono: true }),
    check('Which runs two requests at the same time?', ['await Promise.all([a(), b()])', 'await a(); await b();', 'a().then(b())', 'async a, b'], 'Promise.all waits for all of them together.', 'Look for “all”.'),
    tapbug('SyntaxError: await is only valid in async functions', ['function load() {', '  const res = await fetch("/api/menu");', '}'], [[1, 'function load()', 'async function load()']], 'Mark the function async to use await inside it.'),
    recap([
      ['⏸', 'await pauses the function until the Promise is done'],
      ['🏷', 'Only inside async functions'],
      ['🤝', 'Promise.all runs things together'],
    ]),
  ]),

  lesson('js-13-6', 'fetch', 6, [
    chat(['Riya’s menu lives on her café’s server, so it can change without updating the app.', 'fetch asks a server for data. Real servers are slow sometimes, empty sometimes and broken sometimes, so good code handles all three.']),
    tapPage('Load today’s menu', 'Try all three: a working server, an empty menu and a broken server.', { html: '<button id="ok">Load menu</button>\n<button id="empty">Empty day</button>\n<button id="broken">Broken server</button>\n<p id="out" class="muted">Tap a button</p>', css: UI, js: LOAD_MENU }, 'Loaded 4 dishes', [{ click: '#ok' }], 'This is the practice server inside the app: it works offline and gives the same answers every time.'),
    explore('The fetch recipe', ['const res = await fetch(url);', 'if (!res.ok) throw new Error("Server said " + res.status);', 'const menu = await res.json();', '} catch (err) {', '  out.textContent = "Couldn’t load the menu.";'], [
      [1, 'Ask the server and wait for its reply.'],
      [2, 'A 404 or 500 is still a reply, so fetch doesn’t throw. Check res.ok yourself.'],
      [3, 'Turn the reply into data.'],
      [4, 'No internet, or the error you threw, lands here.'],
      [5, 'Always tell the user something friendly.'],
    ], { page: { html: '<p>Three states to show: loading, data, error.</p>', css: UI }, minTaps: 3 }),
    matchUp('Server replies', [['200', 'OK, here is your data'], ['404', 'Not found'], ['500', 'The server broke'], ['No reply', 'No internet: fetch throws']], 'Status codes say how it went.'),
    check('The server replies 500. What does fetch do?', ['Gives a reply with ok false; it does not throw', 'Throws an error', 'Waits forever', 'Returns the menu'], 'Check res.ok to catch server errors.', 'A reply is still a reply.', { mono: false }),
    tapbug('A broken server shows “undefined”', ['const res = await fetch(url);', 'const menu = await res.json();', 'show(menu.length);'], [[1, 'const res = await fetch(url);', 'const res = await fetch(url); if (!res.ok) throw new Error(res.status);']], 'Check res.ok before reading the data, so a server error is handled instead of shown as nonsense.'),
    recap([
      ['🌐', 'fetch(url) asks a server'],
      ['🚦', 'Check res.ok; then await res.json()'],
      ['🧯', 'Show loading, empty and error states'],
    ]),
  ]),

  lesson('js-13-7', 'Modules', 4, [
    reveal('Splitting code into files', [
      ['export', 'Share something from a file: export function bill(…) { … }'],
      ['import', 'Use it in another file: import { bill } from "./bill.js";'],
      ['export default', 'The file’s main thing: import bill from "./bill.js";'],
      ['<script type="module">', 'Tells the browser this script uses import and export.'],
    ], { mono: true }),
    explore('Two files', ['// bill.js', 'export const GST = 0.05;', 'export function bill(price, cups) {', '  return price * cups * (1 + GST);', '}', '// app.js', 'import { bill, GST } from "./bill.js";', 'console.log(bill(40, 3));'], [
      [2, 'export shares GST with other files.'],
      [3, 'And the bill function.'],
      [7, 'app.js imports exactly the two names it needs.'],
      [8, 'Then uses them like its own code.'],
    ], { page: { html: '<p>Console: 126</p>', css: UI }, minTaps: 3 }),
    matchUp('Match the word', [['export', 'Share from a file'], ['import', 'Use from another file'], ['default', 'The main export'], ['type="module"', 'Lets a script use import']], 'Modules keep big programs tidy.'),
    check('Which imports bill from bill.js?', ['import { bill } from "./bill.js";', 'require bill.js;', 'include "bill.js";', 'export { bill } from app;'], 'import { name } from "./file.js".', 'import … from …'),
    tapbug('SyntaxError: Cannot use import statement outside a module', ['<script src="app.js"></script>'], [[1, '<script src="app.js">', '<script type="module" src="app.js">']], 'A script that uses import must be loaded as a module.'),
    recap([
      ['📤', 'export shares'],
      ['📥', 'import uses'],
      ['🗂', 'Small files, each with one job'],
    ]),
  ]),

  lesson('js-13-8', 'Other web APIs', 4, [
    reveal('What else the browser can do', [
      ['Geolocation', 'navigator.geolocation finds where the phone is, after the user says yes. “Show cafés near me.”', '📍'],
      ['Canvas', 'Draw shapes, charts and games with JavaScript on a <canvas>.', '🎨'],
      ['Chart libraries', 'Ready-made tools draw bar and pie charts from your data.', '📊'],
      ['Web Workers', 'Run heavy work in the background so the page stays smooth.', '⚙️'],
      ['Old tools', 'You may see jQuery ($("#menu")) and AJAX (XMLHttpRequest) in older code. fetch and the DOM do the same today.', '🕰'],
    ]),
    tapPage('Draw on a canvas', 'Tap Draw to paint Riya’s sales chart.', { html: '<canvas id="c" width="260" height="120"></canvas>\n<button id="draw">Draw</button>', css: `${UI} canvas { border: 1px solid #E5D3B3; border-radius: 8px; display: block; margin-bottom: 8px; }`, js: 'document.querySelector("#draw").addEventListener("click", () => {\n  const ctx = document.querySelector("#c").getContext?.("2d");\n  const sales = [30, 55, 40, 80];\n  if (ctx) {\n    sales.forEach((s, i) => {\n      ctx.fillStyle = "#C2410C";\n      ctx.fillRect(20 + i * 60, 110 - s, 40, s);\n    });\n  }\n  console.log("Drew " + sales.length + " bars");\n});' }, 'Drew 4 bars', [{ click: '#draw' }], 'fillRect(x, y, width, height) paints a rectangle. Charts are rectangles worked out from data.'),
    truth([
      ['A site can get your location without asking', false, 'The browser always asks first.'],
      ['Canvas draws with JavaScript', true, 'Shapes, charts and games.'],
      ['jQuery is required for modern sites', false, 'Plain JavaScript does the same today.'],
    ]),
    check('Why use a Web Worker?', ['To run heavy work without freezing the page', 'To get the location', 'To store data', 'To draw shapes'], 'Workers run in the background.', 'Think “background”.'),
    tapbug('The location never appears', ['navigator.geolocation.getCurrentPosition();'], [[1, 'getCurrentPosition()', 'getCurrentPosition((pos) => show(pos.coords))']], 'The position arrives later, after the user says yes, so pass a callback to receive it.'),
    recap([
      ['📍', 'Geolocation asks before it shares'],
      ['🎨', 'Canvas draws with code'],
      ['🕰', 'jQuery and AJAX are older ways'],
    ]),
  ]),

  challenge('j-project', 'Final: Make Sharma Classes work', { icon: '🌐', name: 'Web Wizard' }, ['Make a real page respond with events and the DOM', 'Load data from a server with fetch, async and await', 'Save choices on the phone and check forms'], [
    mcq(1, 'What does localStorage keep?', ['Text, even after the page is closed', 'Only numbers', 'Data for one minute', 'Passwords, safely'], 'Text only, until cleared. Never passwords.'),
    mcq(2, 'What does JSON.parse do?', ['Turns JSON text into an object', 'Turns an object into text', 'Sends data to a server', 'Saves to the phone'], 'parse: text → object.'),
    mcq(3, 'The server replies 404. What should your code check?', ['res.ok', 'res.text', 'typeof res', 'Nothing; fetch throws'], 'fetch only throws when there is no reply at all.', { mono: true }),
    mcq(4, 'Where can await be used?', ['Inside an async function', 'Anywhere', 'Only in loops', 'Only in classes'], 'Mark the function async.'),
    mcq(5, 'Which keyword shares a function from a file?', ['export', 'import', 'share', 'public'], 'export from one file, import in another.', { mono: true }),
    swipe([
      ['Code keeps running while a Promise waits', true, 'That’s asynchronous code.'],
      ['fetch gives back the data straight away', false, 'It gives a Promise.'],
      ['Promise.all runs requests together', true, 'And waits for all of them.'],
      ['JSON allows a comma after the last item', false, 'Trailing commas are not allowed.'],
    ]),
    pairs([['setItem', 'Save on the phone'], ['JSON.stringify', 'Object to text'], ['await', 'Wait for a Promise'], ['res.ok', 'Did the server succeed?']], 'Data and async tools.'),
    pickCode('Which loads and reads the menu?', ['const menu = await (await fetch("/api/menu")).json();', 'const menu = fetch("/api/menu").json;', 'const menu = JSON.parse(fetch("/api/menu"));', 'const menu = await fetch.json("/api/menu");'], 'Await the reply, then await the JSON.'),
    bugTask(['function load() {', '  const res = await fetch("/api/menu");', '  const menu = res.json();', '  localStorage.setItem("menu", menu);', '}'], [[1, 'function load()', 'async function load()'], [3, 'res.json()', 'await res.json()'], [4, 'menu);', 'JSON.stringify(menu));']], 'await needs async, json() is a Promise too, and storage keeps text.'),
    predictTask(['const saved = JSON.stringify({ theme: "dark", visits: 2 });', 'const back = JSON.parse(saved);', 'back.visits++;', 'console.log(typeof saved, back.visits);'], 'What does it print?', ['string 3', 'object 3', 'string 2', 'object 2'], 'stringify makes text; parse makes a new object whose visits goes up to 3.'),
    project(1, 'Step 1 · Filter the courses', 'Mr Sharma (Jaipur): “Parents want to see only their child’s class.” Make each filter button show only the matching courses (All shows everything). Use the data-cls attribute and toggle the hidden class.', '// Sharma Classes, made to work\n', J1, [
      { label: 'A click listener on each filter button', file: 'js', pattern: /\.filters button[\s\S]*addEventListener\("click"/ },
      { label: 'Reads the class from data-cls', file: 'js', pattern: /dataset\.cls/ },
      { label: 'Hides courses with the hidden class', file: 'js', pattern: /classList\.toggle\("hidden"/ },
    ], 'for (const btn of document.querySelectorAll(".filters button")) { btn.addEventListener("click", () => { … li.classList.toggle("hidden", …) }) }'),
    project(2, 'Step 2 · Check the enquiry form', 'Stop the form reloading, check the mobile number (10 digits, starting 6 to 9) and show a friendly message.', J1, J2, [
      { label: 'Listens for submit', file: 'js', pattern: /addEventListener\("submit"/ },
      { label: 'Stops the reload', file: 'js', pattern: /preventDefault\(\)/ },
      { label: 'Checks the number with a pattern', file: 'js', pattern: /\^\[6-9\]\\d\{9\}\$/ },
    ], 'form.addEventListener("submit", (e) => { e.preventDefault(); … /^[6-9]\\d{9}$/.test(phone) … })'),
    project(3, 'Step 3 · Load the batches', 'When “Show batches” is tapped, fetch /api/batches from the practice server and add each batch to the list. Handle a broken server.', J2, J3, [
      { label: 'An async click handler', file: 'js', pattern: /addEventListener\("click", async/ },
      { label: 'Fetches the batches', file: 'js', pattern: /await fetch\("\/api\/batches"\)/ },
      { label: 'Checks res.ok', file: 'js', pattern: /if \(!res\.ok\)/ },
      { label: 'Adds list items', file: 'js', pattern: /createElement\("li"\)[\s\S]*append/ },
    ], 'document.querySelector("#load").addEventListener("click", async () => { const res = await fetch("/api/batches"); if (!res.ok) throw …; const batches = await res.json(); … })'),
    project(4, 'Step 4 · Dark mode, remembered', 'Make the Dark mode button switch the dark class on the body, and remember the choice with localStorage.', J3, J4, [
      { label: 'Toggles the dark class', file: 'js', pattern: /body\.classList\.toggle\("dark"\)/ },
      { label: 'Saves the choice', file: 'js', pattern: /localStorage\.setItem\("theme"/ },
      { label: 'Reads it when the page opens', file: 'js', pattern: /localStorage\.getItem\("theme"\)/ },
    ], 'const dark = document.body.classList.toggle("dark"); localStorage.setItem("theme", dark ? "dark" : "light"); and on load: if (localStorage.getItem("theme") === "dark") …'),
  ], 'project'),
];
