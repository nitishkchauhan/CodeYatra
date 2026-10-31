// JavaScript Intermediate · Module 6 · One source of truth, and the final project: “Is my train on time?” for
// City Travel Desk, against the practice server’s made-up 901xx trains (lib/web/page.ts).
import type { Lesson, WebStep } from '../../types';
import { atWork, bugTask, challenge, check, DESK, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, TAG, tapbug, tapPage, toggleRun, truth } from './kit';

const MINE_HTML = `<p><button id="all">All</button><button id="late">Late only</button> ${TAG}</p>
<p id="count" class="muted"></p>
<ul id="list"></ul>`;
const MINE_JS = `const state = {
  trains: [
    { no: 90101, name: "Harbour Express", delay: 0 },
    { no: 90102, name: "Hillview Local", delay: 12 },
    { no: 90104, name: "Airport Shuttle", delay: 5 },
  ],
  filter: "all",
};
function render() {
  const shown = state.filter === "late" ? state.trains.filter((t) => t.delay > 0) : state.trains;
  document.querySelector("#count").textContent = shown.length + " of " + state.trains.length + " saved trains";
  document.querySelector("#list").replaceChildren(...shown.map((t) => {
    const li = document.createElement("li");
    li.textContent = t.no + " " + t.name + (t.delay ? " (" + t.delay + " min late) " : " ");
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.dataset.no = t.no;
    li.append(btn);
    return li;
  }));
  console.log("Drew " + shown.length + " trains, filter: " + state.filter);
}
document.querySelector("#all").addEventListener("click", () => {
  state.filter = "all";
  render();
});
document.querySelector("#late").addEventListener("click", () => {
  state.filter = "late";
  render();
});
document.querySelector("#list").addEventListener("click", (e) => {
  const no = Number(e.target.dataset.no);
  if (!no) return;
  state.trains = state.trains.filter((t) => t.no !== no);
  render();
});
render();`;

const KEEP_HTML = `<button id="add">Save 90101</button>
<button id="add2">Save 90102</button>
<button id="reopen">Reopen the page</button>
<button id="clear">Clear</button>
<p id="out" class="muted"></p>`;
const KEEP_JS = `const KEY = "desk-state-v1";
function load() {
  try {
    return { saved: [], ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return { saved: [] };
  }
}
let state = load();
function render() {
  document.querySelector("#out").textContent = state.saved.length ? "Saved: " + state.saved.join(", ") : "No saved trains";
}
function add(no) {
  if (state.saved.includes(no)) return;
  state = { ...state, saved: [...state.saved, no] };
  localStorage.setItem(KEY, JSON.stringify(state));
  render();
}
document.querySelector("#add").addEventListener("click", () => add(90101));
document.querySelector("#add2").addEventListener("click", () => add(90102));
document.querySelector("#reopen").addEventListener("click", () => {
  state = load();
  render();
  console.log("Loaded from storage: " + state.saved.length + " trains");
});
document.querySelector("#clear").addEventListener("click", () => {
  localStorage.removeItem(KEY);
  state = load();
  render();
});
render();`;

// ── The final project: “Is my train on time?” for City Travel Desk ───────────────────────────────
const DESK_HTML = `<header class="top"><strong>City Travel Desk</strong> ${TAG}</header>
<main class="page">
  <form id="search" novalidate>
    <label for="no">Train number</label>
    <input id="no" name="no" inputmode="numeric" placeholder="e.g. 90101" aria-describedby="no-err">
    <p id="no-err" class="err" role="alert"></p>
    <button>Check</button>
  </form>
  <p id="status" class="muted">Type a train number. Try 90101, 90102, 90103 or 90104.</p>
  <button id="save">Save this train</button>
  <h2>My trains</h2>
  <button id="refresh">Refresh all</button>
  <ul id="saved"></ul>
</main>`;
const DESK_CSS = `${DESK}
body { margin: 0; }
.top { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #1D4ED8; color: white; }
.page { padding: 12px; }
h2 { font-size: 18px; margin: 16px 0 4px; }
#save { background: #0F766E; }
input[aria-invalid="true"] { border-color: #B91C1C; }`;
const P0 = `// City Travel Desk: is my train on time?
const form = document.querySelector("#search");
const input = document.querySelector("#no");
const error = document.querySelector("#no-err");
const statusLine = document.querySelector("#status");
`;
const P1 = `${P0}
// 1. Check the train number before asking the server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const no = String(new FormData(form).get("no")).trim();
  const ok = /^\\d{5}$/.test(no);
  input.setAttribute("aria-invalid", String(!ok));
  error.textContent = ok ? "" : "Enter a 5-digit train number";
  if (!ok) return input.focus();
  statusLine.textContent = "Checking " + no + "…";
});
`;
const P2 = `${P0}
// 1. Check the train number before asking the server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const no = String(new FormData(form).get("no")).trim();
  const ok = /^\\d{5}$/.test(no);
  input.setAttribute("aria-invalid", String(!ok));
  error.textContent = ok ? "" : "Enter a 5-digit train number";
  if (!ok) return input.focus();
  showTrain(no);
});

// 2. Ask the server, with a time limit, and show every outcome
const clock = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
let current = null;
function describe(t) {
  if (t.state === "Cancelled") return t.no + " " + t.name + " is cancelled";
  const time = clock.format(new Date(t.departs));
  return t.no + " " + t.name + ", " + time + ": " + (t.delay ? t.delay + " min late" : "on time");
}
async function showTrain(no) {
  statusLine.textContent = "Checking " + no + "…";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  try {
    const res = await fetch("/api/trains/" + no, { signal: controller.signal });
    if (res.status === 404) {
      statusLine.textContent = "No train " + no + ". Check the number.";
      return;
    }
    if (!res.ok) throw new Error("Server said " + res.status);
    current = await res.json();
    statusLine.textContent = describe(current);
  } catch (err) {
    statusLine.textContent = err.name === "AbortError" ? "The timetable is slow. Try again soon." : "Couldn’t check right now.";
  } finally {
    clearTimeout(timer);
  }
}
`;
const P3 = `${P2}
// 3. My trains: one state object, saved on this phone
const KEY = "desk-state-v1";
function load() {
  try {
    return { saved: [], ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return { saved: [] };
  }
}
let state = load();
function render() {
  document.querySelector("#saved").replaceChildren(...state.saved.map((no) => {
    const li = document.createElement("li");
    li.textContent = no;
    return li;
  }));
}
document.querySelector("#save").addEventListener("click", () => {
  if (!current || state.saved.includes(current.no)) return;
  state = { ...state, saved: [...state.saved, current.no] };
  localStorage.setItem(KEY, JSON.stringify(state));
  render();
});
render();
`;
const P4 = `${P3}
// 4. Refresh every saved train at once, keeping what worked
document.querySelector("#refresh").addEventListener("click", async () => {
  const results = await Promise.allSettled(state.saved.map(async (no) => {
    const res = await fetch("/api/trains/" + no);
    if (!res.ok) throw new Error(no + ": couldn’t check");
    return res.json();
  }));
  document.querySelector("#saved").replaceChildren(...results.map((r) => {
    const li = document.createElement("li");
    li.textContent = r.status === "fulfilled" ? describe(r.value) : "⚠️ " + r.reason.message;
    return li;
  }));
});
`;

const project = (n: number, title: string, instructions: string, starterJs: string, solutionJs: string, checks: WebStep['checks'], hint: string): WebStep => ({
  type: 'web',
  kicker: `FINAL PROJECT · STEP ${n} OF 4`,
  title,
  instructions,
  starter: { html: DESK_HTML, css: DESK_CSS, js: starterJs },
  solution: { html: DESK_HTML, css: DESK_CSS, js: solutionJs },
  checks,
  hint,
});

export const JS_I_M6: Lesson[] = [
  lesson('js-i-6-1', 'State in one object', 5, [
    atWork('Megan', ['The desk’s “My trains” page has bugs: the counter says 3 saved trains while the list shows 2, and a star stays lit after a train is removed.', 'The page keeps its facts in several places. Keep them in one object, the state, and read everything from there.']),
    reveal('What is state?', [
      ['State', 'Everything the screen depends on, in one object: { saved: [90101, 90102], filter: "all" }.', '🧠'],
      ['One place', 'The count, the list and the stars all come from state, so they can’t disagree.', '🎯'],
      ['Change state, not the page', 'A tap changes state. Then the page is drawn again from it (next lesson).', '🔁'],
    ]),
    predict('Change state step by step', ['const state = { saved: [90101], filter: "all" };', 'state.saved = [...state.saved, 90102];', 'state.filter = "late";', 'const count = state.saved.length;', 'console.log(count, state.filter);'], [
      [2, 'What will state be after this line?', ['{"saved":[90101,90102],"filter":"all"}', '{"saved":[90102],"filter":"all"}', '{"saved":[90101],"filter":"all"}'], 'A new list: the old trains, then 90102.', { var: 'state' }],
      [4, 'What will count be?', ['2', '1', '3'], 'Worked out from the list, so it always matches.', { var: 'count' }],
    ]),
    run('Update without changing the old state', 'Pick an update.', ['const before = { saved: [90101], filter: "all" };', 'const after = {{v}};', 'console.log(before, after);'], ['{ ...before, filter: "late" }', '{ ...before, saved: [...before.saved, 90102] }', '{ ...before, saved: before.saved.filter((no) => no !== 90101) }'], { caption: 'The spread copies the old state and you replace only what changed. before stays as it was, which makes bugs easier to find.' }),
    check('Why work out the count from state.saved.length instead of storing it?', ['So it can never disagree with the list', 'Because numbers can’t go in objects', 'It is faster to store', 'JavaScript requires it'], 'One fact, one place.', 'What if they drifted apart?', { mono: false }),
    tapbug('The counter says 3, the list shows 2', ['state.saved = state.saved.filter((no) => no !== removed);', 'savedCount = savedCount + 1;'], [[2, 'savedCount + 1', 'state.saved.length']], 'A second copy of the count drifts. Work it out from state.'),
    recap([
      ['🧠', 'State: everything the screen depends on, in one object'],
      ['🎯', 'Work things out from state instead of storing copies'],
      ['📋', 'Update with a copy: { ...state, filter: "late" }'],
    ]),
  ]),

  lesson('js-i-6-2', 'render(): the page redraws from state', 6, [
    atWork('Arden', ['Here’s the design for “My trains”: a filter (All or Late only), the saved trains with a Remove button each, and a count.', 'Felix suggests one function, render(), that draws all of it from state. Every tap: change state, then call render().']),
    tapPage('Change state, then render', 'Tap Late only, then remove a train. The count always matches the list.', { html: MINE_HTML, css: DESK, js: MINE_JS }, 'Drew 2 trains, filter: late', [{ click: '#late' }], 'No handler touches the list or the count. They change state and call render().'),
    explore('The pattern', ['function render() {', '  const shown = …from state…;', '  list.replaceChildren(…);', '}', 'button.addEventListener("click", () => {', '  state.filter = "late";', '  render();', '});'], [
      [1, 'One function draws everything from state.', '#list'],
      [3, 'Replace the whole list, so nothing old is left behind.'],
      [6, 'A tap only changes state…', '#late'],
      [7, '…then asks render() to redraw.', '#count'],
    ], { page: { html: MINE_HTML, css: DESK }, minTaps: 3 }),
    check('A tap removes a train. What should the handler do?', ['Change state, then call render()', 'Remove the <li> and fix the count by hand', 'Reload the page', 'Call render() only'], 'State first, then redraw.', 'Two steps.', { mono: false }),
    tapbug('The list doesn’t change after Remove', ['list.addEventListener("click", (e) => {', '  state.trains = state.trains.filter((t) => t.no !== no);', '});'], [[2, 'state.trains.filter((t) => t.no !== no);', 'state.trains.filter((t) => t.no !== no); render();']], 'State changed, but nobody asked the page to redraw.'),
    truth([
      ['Frameworks like React use this same idea', true, 'State in, page out. You will meet it in the React track.'],
      ['render() should change state', false, 'It only reads state and draws.'],
      ['One listener on the list can handle every Remove button', true, 'e.target says which one was tapped.'],
    ]),
    recap([
      ['🖌', 'render() draws the page from state'],
      ['🔁', 'Every tap: change state, then render()'],
      ['⚛️', 'The same idea powers React'],
    ]),
  ]),

  lesson('js-i-6-3', 'Saving state safely', 5, [
    atWork('Felix', ['Travellers want their saved trains to still be there tomorrow: localStorage, like in Basic.', 'But saved text can be old, broken or edited by hand. If JSON.parse throws, the whole page stops. Load it safely.']),
    toggleRun('Load safely', [
      ['Trusting', ['const saved = "{saved: [90101]}";', 'const state = JSON.parse(saved);', 'console.log(state.saved.length);'], 'Broken text makes JSON.parse throw, and nothing after it runs.', ['SyntaxError: Expected property name or \'}\' in JSON at position 1 (line 1 column 2)']],
      ['Safe', ['const saved = "{saved: [90101]}";', 'let state = { saved: [] };', 'try {', '  state = { ...state, ...JSON.parse(saved) };', '} catch {', '  console.log("Saved data was broken, starting fresh");', '}', 'console.log(state.saved.length);'], 'try/catch keeps the page alive and falls back to a fresh state.', ['Saved data was broken, starting fresh', '0']],
    ]),
    tapPage('My trains, remembered', 'Save both trains, then tap “Reopen the page” to load them from storage.', { html: KEEP_HTML, css: DESK, js: KEEP_JS }, 'Loaded from storage: 2 trains', [{ click: '#add' }, { click: '#add2' }, { click: '#reopen' }], 'On a real site they are still there after closing the browser. (This preview may forget, as it is a fresh page each time.)'),
    reveal('Saving state well', [
      ['One key, with a version', '"desk-state-v1". If the shape changes later, read v1 and convert it.'],
      ['Save after every change', 'In one place, right after state changes.'],
      ['Only what you need', 'Saved train numbers, not whole pages of server data.'],
      ['Never secrets', 'No passwords or tokens: any script on the page can read localStorage.'],
    ], { mono: true }),
    check('Why spread the loaded data over defaults, as in { saved: [], ...loaded }?', ['So fields missing from old saves still have a value', 'To make it faster', 'Because JSON.parse needs it', 'To hide the data'], 'Old saves may not have every field yet.', 'What if the save is from an older version?', { mono: false }),
    tapbug('First visit: “Cannot read properties of null”', ['let state = { saved: [] };', 'try {', '  state = JSON.parse(localStorage.getItem(KEY));', '} catch {}', 'render(state.saved);'], [[3, 'JSON.parse(localStorage.getItem(KEY))', '{ saved: [], ...JSON.parse(localStorage.getItem(KEY)) }']], 'Nothing is saved yet, so getItem gives null, and JSON.parse(null) is null. Spread it over the defaults.'),
    recap([
      ['💾', 'Save state as JSON under one versioned key'],
      ['🧯', 'Load with try/catch and defaults'],
      ['🔐', 'Never store secrets'],
    ]),
  ]),

  challenge('j-i-project', 'Final: Is my train on time?', { icon: '🏆', name: 'JavaScript Pro+' }, ['Build a real app screen from state', 'Talk to a server well: limits, outcomes and many requests', 'Check forms and save data safely'], [
    mcq(1, 'What is “state”?', ['Everything the screen depends on, in one place', 'The HTML of the page', 'The server’s data', 'A CSS class'], 'One source of truth.'),
    mcq(2, 'After changing state, what should a handler do?', ['Call render()', 'Reload the page', 'Edit the list by hand', 'Nothing'], 'render() redraws from state.'),
    mcq(3, 'What does JSON.parse(null) give?', ['null', 'An error', '{}', 'undefined'], 'So spread it over defaults.', { mono: true }),
    mcq(4, 'Which copies state with one change?', ['{ ...state, filter: "late" }', 'state.copy(filter)', 'Object.change(state)', '[...state, "late"]'], 'Spread, then the new value.', { mono: true }),
    mcq(5, 'What should never go in localStorage?', ['Passwords and tokens', 'Saved train numbers', 'A theme choice', 'A version number'], 'Any script on the page can read it.'),
    swipe([
      ['render() should only read state and draw', true, 'Changing state is the handler’s job.'],
      ['Storing the count next to the list keeps them in step', false, 'Work it out from the list.'],
      ['Saved data may be broken or old', true, 'Load it with try/catch and defaults.'],
      ['replaceChildren keeps the old list items', false, 'It swaps them all for the new ones.'],
    ]),
    pairs([['state', 'One source of truth'], ['render()', 'Draw from state'], ['JSON.stringify', 'Save state as text'], ['try/catch', 'Load safely']], 'The app pattern.'),
    pickCode('Which handler follows the pattern?', ['() => { state.filter = "late"; render(); }', '() => { list.innerHTML = ""; count.textContent = "2"; }', '() => { location.reload(); }', '() => { render(); state.filter = "late"; }'], 'Change state first, then redraw.'),
    bugTask(['state = { state, saved: [...state.saved, no] };', 'localStorage.setItem(KEY, state);', 'const results = await Promise.all(state.saved.map(getTrain));'], [[1, '{ state,', '{ ...state,'], [2, 'KEY, state)', 'KEY, JSON.stringify(state))'], [3, 'Promise.all', 'Promise.allSettled']], 'Spread the old state, save it as JSON, and keep what worked when one train fails.'),
    predictTask(['let state = { saved: [90101], filter: "all" };', 'const old = state;', 'state = { ...state, filter: "late" };', 'console.log(old.filter, state.filter, old === state);'], 'What does it print?', ['all late false', 'late late true', 'all late true', 'late late false'], 'The spread made a new object, so old still says all.'),
    project(1, 'Step 1 · Check the train number', 'Megan: “Before we ask the server, check the number.” Read the form with FormData, check for exactly 5 digits, set aria-invalid and the error text, and move focus to the field when it is wrong.', P0, P1, [
      { label: 'Listens for submit and stops the reload', file: 'js', pattern: /addEventListener\("submit"[\s\S]*preventDefault\(\)/ },
      { label: 'Reads the form with FormData', file: 'js', pattern: /new FormData\(form\)/ },
      { label: 'Checks for exactly 5 digits', file: 'js', pattern: /\^\\d\{5\}\$/ },
      { label: 'Sets aria-invalid', file: 'js', pattern: /setAttribute\("aria-invalid"/ },
    ], 'const ok = /^\\d{5}$/.test(no); input.setAttribute("aria-invalid", String(!ok)); error.textContent = ok ? "" : "…";'),
    project(2, 'Step 2 · Show the train', 'Felix: “Fetch /api/trains/ plus the number, give up after 2 seconds, handle 404 and server errors, and show the time on India’s clock.” Try 90101, 90102, 90103 and 90999.', P1, P2, [
      { label: 'Fetches the train', file: 'js', pattern: /fetch\("\/api\/trains\/" \+ no/ },
      { label: 'A time limit with AbortController', file: 'js', pattern: /new AbortController\(\)[\s\S]*signal: controller\.signal/ },
      { label: 'Handles not found', file: 'js', pattern: /res\.status === 404/ },
      { label: 'Shows the time in India', file: 'js', pattern: /timeZone: "Asia\/Kolkata"/ },
    ], 'async function showTrain(no) { … const res = await fetch("/api/trains/" + no, { signal: controller.signal }); if (res.status === 404) { … } … }'),
    project(3, 'Step 3 · Save my trains', 'Arden: “Save this train adds it to My trains, and they are still there next time.” Keep one state object, save it as JSON, load it safely and draw the list with render().', P2, P3, [
      { label: 'Loads safely, over defaults', file: 'js', pattern: /\{ saved: \[\], \.\.\.JSON\.parse\(localStorage\.getItem\(KEY\)\) \}/ },
      { label: 'Saves state as JSON', file: 'js', pattern: /localStorage\.setItem\(KEY, JSON\.stringify\(state\)\)/ },
      { label: 'A render() function draws the list', file: 'js', pattern: /function render\(\)[\s\S]*replaceChildren/ },
    ], 'function load() { try { return { saved: [], ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return { saved: [] }; } }'),
    project(4, 'Step 4 · Refresh all', 'Megan: “Refresh all checks every saved train at once. If one fails, still show the others.”', P3, P4, [
      { label: 'Refresh all has a click handler', file: 'js', pattern: /#refresh"\)\.addEventListener\("click", async/ },
      { label: 'Keeps what worked with allSettled', file: 'js', pattern: /Promise\.allSettled\(state\.saved\.map/ },
      { label: 'Shows each result', file: 'js', pattern: /r\.status === "fulfilled"/ },
    ], 'const results = await Promise.allSettled(state.saved.map(async (no) => { … })); then r.status === "fulfilled" ? describe(r.value) : r.reason.message'),
  ], 'project'),
];
