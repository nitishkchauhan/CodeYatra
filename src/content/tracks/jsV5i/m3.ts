// JavaScript Intermediate · Module 3 · Fetch in the real world.
// Pages ask the practice server inside the app (lib/web/page.ts): City Travel Desk’s made-up 901xx trains, with
// replies that are slow, empty, missing or broken on purpose.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, DESK, explore, lesson, mcq, pairs, pickCode, predictTask, recap, reveal, run, swipe, TAG, tapbug, tapPage } from './kit';

const SEARCH_HTML = `<label for="from">From</label>
<select id="from"><option>City Central</option><option>Hillview</option></select>
<label for="to">To</label>
<select id="to"><option>Harbour Point</option><option>Airport</option></select>
<button id="go">Search</button> ${TAG}
<ul id="list"></ul>
<p id="msg" class="muted"></p>`;
const SEARCH_JS = `document.querySelector("#go").addEventListener("click", async () => {
  const params = new URLSearchParams({
    from: document.querySelector("#from").value,
    to: document.querySelector("#to").value,
  });
  const url = "/api/trains?" + params;
  console.log("Asking " + url);
  const res = await fetch(url);
  const trains = await res.json();
  document.querySelector("#list").replaceChildren(...trains.map((t) => {
    const li = document.createElement("li");
    li.textContent = t.no + " " + t.name;
    return li;
  }));
  document.querySelector("#msg").textContent = trains.length ? "" : "No trains between these stations";
  console.log("Found " + trains.length + " trains");
});`;

const CHECK_HTML = `<input id="no" value="90101" aria-label="Train number" inputmode="numeric">
<button id="go">Check</button> ${TAG}
<p id="out" class="muted">Type a train number</p>
<p class="muted">Try 90102 (late), 90103 (cancelled), 90999 (no such train) and 90105 (server down).</p>`;
const CHECK_JS = `const out = document.querySelector("#out");
document.querySelector("#go").addEventListener("click", async () => {
  const no = document.querySelector("#no").value.trim();
  out.textContent = "Checking " + no + "…";
  try {
    const res = await fetch("/api/trains/" + no);
    if (res.status === 404) {
      out.textContent = "No train " + no + ". Check the number.";
      console.log("Not found: " + no);
      return;
    }
    if (!res.ok) throw new Error("Server said " + res.status);
    const train = await res.json();
    out.textContent = train.name + ": " + train.state + (train.delay ? ", " + train.delay + " min late" : "");
    console.log(train.no + " " + train.state);
  } catch (err) {
    out.textContent = "Couldn’t check right now. Try again in a minute.";
    console.log("Error: " + err.message);
  }
});`;

const LIMIT_HTML = `<button id="fast">Check 90101</button>
<button id="slow">Check 90104 (slow)</button> ${TAG}
<p id="out" class="muted"></p>`;
const LIMIT_JS = `const out = document.querySelector("#out");
async function checkTrain(no) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1000);
  out.textContent = "Checking " + no + "…";
  try {
    const res = await fetch("/api/trains/" + no, { signal: controller.signal });
    const train = await res.json();
    out.textContent = train.name + ": " + train.state;
    console.log("Answer for " + no);
  } catch (err) {
    if (err.name === "AbortError") {
      out.textContent = "The timetable is slow right now. Try again soon.";
      console.log("Gave up after 1 second");
    } else {
      out.textContent = "Couldn’t check.";
    }
  } finally {
    clearTimeout(timer);
  }
}
document.querySelector("#fast").addEventListener("click", () => checkTrain(90101));
document.querySelector("#slow").addEventListener("click", () => checkTrain(90104));`;

export const JS_I_M3: Lesson[] = [
  lesson('js-i-3-1', 'Building addresses with URLSearchParams', 5, [
    atWork('Felix', ['The search address is /api/trains?from=…&to=…. Someone glued it together with + and it breaks for stations with spaces, or an & in the name.', 'URLSearchParams builds the query part safely.']),
    run('Build the address', 'Pick how to build it.', ['const from = "City Central";', 'const to = "Harbour Point";', 'console.log({{v}});'], ['"/api/trains?from=" + from + "&to=" + to', '"/api/trains?" + new URLSearchParams({ from, to })', '"/api/trains?" + new URLSearchParams({ from, to, date: "2026-11-02" })'], { goal: '/api/trains?from=City+Central&to=Harbour+Point', caption: 'URLSearchParams turns spaces and symbols like & into safe codes. { from, to } is short for { from: from, to: to }.' }),
    tapPage('Search the timetable', 'Pick two stations and tap Search.', { html: SEARCH_HTML, css: DESK, js: SEARCH_JS }, 'Found 2 trains', [{ click: '#go' }], 'Try Hillview to Airport too: the server answers with an empty list, and the page says so.'),
    reveal('Reading and changing a query', [
      ['params.get("from")', 'Read one value.'],
      ['params.set("date", "2026-11-02")', 'Add one, or replace it.'],
      ['new URL(location.href).searchParams', 'Read the query of the page you are on, like a shared search link.'],
      ['encodeURIComponent(text)', 'The older way to make one value safe.'],
    ], { mono: true }),
    check('What does new URLSearchParams({ to: "Harbour Point" }).toString() give?', ['"to=Harbour+Point"', '"to=Harbour Point"', '"Harbour+Point"', '"?to=Harbour Point"'], 'The space becomes +, and there is no ? at the start.', 'Spaces aren’t allowed in addresses.'),
    tapbug('The search breaks for “Bay & Pier”', ['const url = "/api/trains?from=" + from + "&to=" + to;'], [[1, '"/api/trains?from=" + from + "&to=" + to', '"/api/trains?" + new URLSearchParams({ from, to })']], 'Glued text sends the & in the station’s name as a separator. URLSearchParams turns it into a safe code.'),
    recap([
      ['🔗', 'URLSearchParams builds the ?query part'],
      ['🛡', 'Spaces and & are made safe'],
      ['📖', 'get and set read and change values'],
    ]),
  ]),

  lesson('js-i-3-2', 'Every outcome', 6, [
    atWork('Megan', ['City Travel Desk’s old page shows a blank screen when something goes wrong. Travellers think the app has frozen.', 'A real screen plans for five outcomes. Let’s handle every one.']),
    reveal('Five outcomes', [
      ['Loading', 'Say something at once: “Checking 90101…”.', '⏳'],
      ['Success', 'Show the data.', '✅'],
      ['Empty', 'It worked, but there is nothing: “No trains today”.', '📭'],
      ['Not found (404)', 'It doesn’t exist: “No train 90999. Check the number.”', '🔍'],
      ['Server error (500)', 'Not the user’s fault: “Try again in a minute.”', '🧯'],
    ]),
    tapPage('Check a train', 'Type 90999 (no such train) and tap Check. Then try the others.', { html: CHECK_HTML, css: DESK, js: CHECK_JS }, 'Not found: 90999', [{ type: ['#no', '90999'] }, { click: '#go' }], 'Each answer gets its own message, and none of them is a blank screen.'),
    explore('Reading it', ['out.textContent = "Checking " + no + "…";', 'const res = await fetch("/api/trains/" + no);', 'if (res.status === 404) { … }', 'if (!res.ok) throw new Error("Server said " + res.status);', 'const train = await res.json();', '} catch (err) {'], [
      [1, 'Loading: answer the tap straight away.', '#out'],
      [3, 'Not found: the user can fix it, so say how.'],
      [4, 'Any other failure goes to catch.'],
      [6, 'No internet and server errors land here: a calm message.'],
    ], { page: { html: CHECK_HTML, css: DESK }, minTaps: 3 }),
    check('The server replies 404 for a train number. What should the page say?', ['How to fix it: “No train 90999. Check the number.”', '“Server error, try later”', 'Nothing', 'Only “Error 404”'], 'A 404 usually means a wrong number, which the user can fix.', 'Whose mistake is it, usually?', { mono: false }),
    tapbug('The traveller sees nothing when it fails', ['try {', '  const res = await fetch(url);', '  if (!res.ok) throw new Error(res.status);', '} catch (err) {', '  console.log(err);', '}'], [[5, 'console.log(err);', 'out.textContent = "Couldn’t check. Try again.";']], 'The console is for developers. Travellers need a message on the screen.'),
    recap([
      ['⏳', 'Show loading straight away'],
      ['📭', 'Plan for empty, not found and server errors'],
      ['💬', 'Every outcome gets a clear message'],
    ]),
  ]),

  lesson('js-i-3-3', 'Giving up on slow requests', 5, [
    atWork('Felix', ['Train 90104’s timetable server is very slow today. The page says “Checking…” for ages and people keep tapping.', 'Set a time limit: if there is no answer in one second, stop waiting and say so.']),
    tapPage('A time limit', 'Tap Check 90104 (slow). After one second the page stops waiting.', { html: LIMIT_HTML, css: DESK, js: LIMIT_JS }, 'Gave up after 1 second', [{ click: '#slow' }], 'Check 90101 answers in time, so its timer is cleared.'),
    explore('Reading the time limit', ['const controller = new AbortController();', 'const timer = setTimeout(() => controller.abort(), 1000);', 'const res = await fetch(url, { signal: controller.signal });', 'if (err.name === "AbortError") { … }', 'clearTimeout(timer);'], [
      [1, 'A controller is a remote with one button: stop.'],
      [2, 'After 1000 ms, press stop.'],
      [3, 'Give fetch the signal, so it listens for stop.'],
      [4, 'A stopped fetch throws an AbortError. Tell the user it was slow.', '#out'],
      [5, 'If the answer came in time, cancel the timer.'],
    ], { page: { html: LIMIT_HTML, css: DESK }, minTaps: 3 }),
    reveal('Shorter, in newer browsers', [
      ['AbortSignal.timeout(1000)', 'A signal that stops by itself: fetch(url, { signal: AbortSignal.timeout(1000) }).'],
      ['TimeoutError', 'That version throws a TimeoutError instead of an AbortError.'],
      ['Stop old searches', 'Abort the last request when the user starts a new search, so an old answer can’t overwrite a new one.'],
    ], { mono: true }),
    check('What does fetch do when its signal is aborted?', ['Throws an AbortError', 'Gives back an empty reply', 'Keeps waiting', 'Reloads the page'], 'Catch it and show a friendly message.', 'It stops, loudly.'),
    tapbug('It still waits for ages', ['const controller = new AbortController();', 'setTimeout(() => controller.abort(), 1000);', 'const res = await fetch(url);'], [[3, 'fetch(url)', 'fetch(url, { signal: controller.signal })']], 'The controller only stops fetches that were given its signal.'),
    recap([
      ['⏱', 'AbortController stops a slow fetch'],
      ['📡', 'Pass { signal } to fetch'],
      ['🧹', 'Clear the timer when the answer arrives'],
    ]),
  ]),

  challenge('js-i-3-ch', 'Module 3 Challenge', { icon: '📡', name: 'Network Pro' }, ['Build safe addresses with URLSearchParams', 'Handle every outcome of a request', 'Stop requests that take too long'], [
    mcq(1, 'What does URLSearchParams do with a space?', ['Turns it into +', 'Removes it', 'Throws an error', 'Leaves it'], 'Spaces aren’t allowed in addresses.'),
    mcq(2, 'Which status means “no such train”?', ['404', '200', '500', '301'], 'Not found.', { mono: true }),
    mcq(3, 'What should a 500 error tell the user?', ['Something like “Try again in a minute”', '“You typed it wrong”', 'Nothing at all', 'Only the code 500'], 'It is the server’s problem, not theirs.'),
    mcq(4, 'Which stops a fetch?', ['controller.abort()', 'fetch.stop()', 'res.cancel()', 'clearTimeout(fetch)'], 'The controller whose signal fetch was given.', { mono: true }),
    mcq(5, 'An empty list comes back with status 200. What is it?', ['Success, with nothing to show', 'A server error', 'Not found', 'A timeout'], 'Say “No trains” instead of a blank list.'),
    swipe([
      ['fetch throws on a 404', false, 'A 404 is still a reply. Check res.status.'],
      ['An aborted fetch throws an AbortError', true, 'Catch it and explain.'],
      ['Gluing text with + is safe for any station name', false, 'Spaces and & break it.'],
      ['Showing “Checking…” straight away helps', true, 'The user knows the tap worked.'],
    ]),
    pairs([['URLSearchParams', 'Safe query text'], ['res.status', 'The reply’s code'], ['AbortController', 'Stop a request'], ['finally', 'Runs either way']], 'Network tools.'),
    pickCode('Which gives up after 2 seconds?', ['const c = new AbortController(); setTimeout(() => c.abort(), 2000); await fetch(url, { signal: c.signal });', 'await fetch(url, { timeout: "2s" });', 'setTimeout(fetch(url), 2000);', 'await fetch(url).stop(2000);'], 'fetch has no timeout option; a controller stops it.'),
    bugTask(['const url = "/api/trains?" + URLSearchParams({ from, to });', 'if (res.status = 404) showNotFound();', 'const res = await fetch(url, { signal: controller });'], [[1, 'URLSearchParams(', 'new URLSearchParams('], [2, 'res.status = 404', 'res.status === 404'], [3, 'signal: controller', 'signal: controller.signal']], 'URLSearchParams needs new, = sets instead of comparing, and fetch wants the controller’s signal.'),
    predictTask(['const params = new URLSearchParams({ from: "Hillview", to: "Harbour Point" });', 'params.set("date", "2026-11-02");', 'console.log(params.get("to") + " on " + params.get("date"));'], 'What does it print?', ['Harbour Point on 2026-11-02', 'Harbour+Point on 2026-11-02', 'Hillview on 2026-11-02', 'undefined on 2026-11-02'], 'get gives back the plain value; the + only appears in the address text.'),
    arrange(['const params = new URLSearchParams();', 'params.set("from", "City Central");', 'console.log("/api/trains?" + params);'], 'make the params, add a value, then build the address', ['/api/trains?from=City+Central']),
  ]),
];
