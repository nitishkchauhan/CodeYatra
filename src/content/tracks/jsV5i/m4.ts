// JavaScript Intermediate · Module 4 · Waiting for many things. Pages ask the practice server (lib/web/page.ts);
// train 90105’s server is always down, and 90106’s is busy every other time.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, DESK, explore, lesson, matchUp, mcq, pairs, pickCode, predictTask, recap, reveal, run, swipe, TAG, tapbug, tapPage, truth } from './kit';

const LIST = `const list = document.querySelector("#list");
function line(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);
}`;

const ALL_HTML = `<button id="one">One by one</button>
<button id="all">Together</button> ${TAG}
<ul id="list"></ul>`;
const ALL_JS = `const saved = [90101, 90102, 90103];
const getTrain = async (no) => (await fetch("/api/trains/" + no)).json();
const seconds = (start) => Math.round((performance.now() - start) / 100) / 10 + " s";
${LIST}
document.querySelector("#one").addEventListener("click", async () => {
  list.replaceChildren();
  const start = performance.now();
  for (const no of saved) {
    const t = await getTrain(no);
    line(t.no + " " + t.name + ": " + t.state);
  }
  console.log("One by one: about " + seconds(start));
});
document.querySelector("#all").addEventListener("click", async () => {
  list.replaceChildren();
  const start = performance.now();
  const trains = await Promise.all(saved.map(getTrain));
  for (const t of trains) line(t.no + " " + t.name + ": " + t.state);
  console.log("Together: about " + seconds(start));
});`;

const SETTLED_HTML = `<button id="all">Promise.all</button>
<button id="settled">Promise.allSettled</button> ${TAG}
<ul id="list"></ul>`;
const SETTLED_JS = `const saved = [90101, 90105, 90102];
async function getTrain(no) {
  const res = await fetch("/api/trains/" + no);
  if (!res.ok) throw new Error(no + " is unavailable");
  return res.json();
}
${LIST}
document.querySelector("#all").addEventListener("click", async () => {
  list.replaceChildren();
  try {
    const trains = await Promise.all(saved.map(getTrain));
    for (const t of trains) line(t.no + ": " + t.state);
  } catch (err) {
    line("Error: " + err.message);
    console.log("Promise.all showed no trains");
  }
});
document.querySelector("#settled").addEventListener("click", async () => {
  list.replaceChildren();
  const results = await Promise.allSettled(saved.map(getTrain));
  for (const r of results) {
    if (r.status === "fulfilled") line(r.value.no + ": " + r.value.state);
    else line("⚠️ " + r.reason.message);
  }
  console.log("allSettled showed " + results.filter((r) => r.status === "fulfilled").length + " of " + results.length);
});`;

const RETRY_HTML = `<button id="go">Check 90106</button> ${TAG}
<p id="out" class="muted"></p>`;
const RETRY_JS = `const wait = (ms) => new Promise((done) => setTimeout(done, ms));
async function getTrain(no) {
  const res = await fetch("/api/trains/" + no);
  if (!res.ok) throw new Error("Server said " + res.status);
  return res.json();
}
async function withRetry(job, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      return await job();
    } catch (err) {
      console.log("Try " + i + " failed: " + err.message);
      if (i === tries) throw err;
      await wait(200 * 2 ** (i - 1));
    }
  }
}
document.querySelector("#go").addEventListener("click", async () => {
  const out = document.querySelector("#out");
  out.textContent = "Checking 90106…";
  try {
    const train = await withRetry(() => getTrain(90106));
    out.textContent = train.name + ": " + train.state;
    console.log("Got " + train.name);
  } catch (err) {
    out.textContent = "Still failing. Try again later.";
  }
});`;

export const JS_I_M4: Lesson[] = [
  lesson('js-i-4-1', 'Together: Promise.all', 5, [
    atWork('Megan', ['The desk’s home screen shows the three trains a traveller saved: 90101, 90102 and 90103.', 'Asking one after another means three waits. Ask for all three at once.']),
    tapPage('One by one, or together', 'Tap both buttons and compare the times.', { html: ALL_HTML, css: DESK, js: ALL_JS }, 'Together:', [{ click: '#all' }], 'Together takes about as long as the slowest one, not all three added up.'),
    explore('Reading Promise.all', ['const trains = await Promise.all(', '  saved.map(getTrain)', ');', 'trains[0]'], [
      [2, 'map starts every fetch at once, and gives a list of Promises.'],
      [1, 'Promise.all waits until every one is done, then gives all the answers.', '#all'],
      [4, 'In the same order you asked, even if 90103 answered first.'],
    ], { page: { html: ALL_HTML, css: DESK }, minTaps: 3 }),
    check('Promise.all asks for 3 trains. One request fails. What happens?', ['The whole Promise.all fails; you get none of the answers', 'You get 2 answers and one undefined', 'It waits forever', 'It tries the failed one again'], 'All or nothing. The next lesson keeps what worked.', 'Think “all”.', { mono: false }),
    tapbug('Every train is undefined', ['const trains = await Promise.all(saved.map((no) => { getTrain(no) }));'], [[1, '{ getTrain(no) }', 'getTrain(no)']], 'With curly braces, an arrow function needs return. Without them, it gives back the Promise.'),
    truth([
      ['Promise.all keeps the answers in the order you asked', true, 'Even if a later one finishes first.'],
      ['Promise.all is slower than one by one', false, 'It waits once, for the slowest.'],
      ['Promise.all fails if any one request fails', true, 'All or nothing.'],
    ]),
    recap([
      ['🤝', 'Promise.all runs requests together'],
      ['📋', 'Answers come back in the order you asked'],
      ['💥', 'One failure fails them all'],
    ]),
  ]),

  lesson('js-i-4-2', 'Keep what worked: Promise.allSettled', 5, [
    atWork('Felix', ['The timetable server for train 90105 is down. Because of Promise.all, the whole home screen shows an error, even for the trains that worked.', 'Show the answers we got, and a small note for the one that failed.']),
    tapPage('Keep what worked', 'Tap both buttons. Train 90105’s server is broken.', { html: SETTLED_HTML, css: DESK, js: SETTLED_JS }, 'allSettled showed 2 of 3', [{ click: '#settled' }], 'allSettled waits for every request and tells you how each one went.'),
    reveal('What allSettled gives back', [
      ['{ status: "fulfilled", value }', 'This one worked. value is its answer.'],
      ['{ status: "rejected", reason }', 'This one failed. reason is the error.'],
      ['Never fails itself', 'It always waits for every request and reports each one.'],
      ['Promise.any, Promise.race', 'any: the first success. race: whatever finishes first, good or bad.'],
    ], { mono: true }),
    matchUp('Which one?', [['Promise.all', 'Need every answer, or nothing'], ['Promise.allSettled', 'Show what worked, note what failed'], ['Promise.any', 'The first server that answers'], ['Promise.race', 'Whichever finishes first']], 'Four ways to wait for many things.'),
    check('In allSettled results, where is a failed request’s error?', ['r.reason', 'r.value', 'r.error', 'r.catch'], 'Fulfilled results have value; rejected ones have reason.', 'It explains the reason.', { mono: true }),
    tapbug('Every line says undefined: undefined', ['for (const r of results) {', '  line(r.no + ": " + r.state);', '}'], [[2, 'r.no + ": " + r.state', 'r.value.no + ": " + r.value.state']], 'Each result is a wrapper. The train is inside r.value, when its status is "fulfilled".'),
    recap([
      ['🧺', 'allSettled keeps every result'],
      ['✅', 'fulfilled → value'],
      ['⚠️', 'rejected → reason'],
    ]),
  ]),

  lesson('js-i-4-3', 'Retry with a growing wait', 5, [
    atWork('Felix', ['Train 90106’s server is busy every other time: a request fails with 503, and the next one works.', 'Don’t give up at once, and don’t hammer the server either. Try again, waiting a little longer each time.']),
    tapPage('Try again', 'Tap Check 90106 and read the console.', { html: RETRY_HTML, css: DESK, js: RETRY_JS }, 'Got Coastal Mail', [{ click: '#go' }], 'The first try fails, the page waits 200 ms, and the second try works. The traveller only sees the answer.'),
    explore('Reading the retry', ['for (let i = 1; i <= tries; i++) {', '  try {', '    return await job();', '  } catch (err) {', '    if (i === tries) throw err;', '    await wait(200 * 2 ** (i - 1));'], [
      [1, 'Up to 3 tries.'],
      [3, 'It worked? Return the answer, which also ends the loop.'],
      [5, 'The last try failed too: give up and pass the error on.'],
      [6, 'Wait 200 ms, then 400, then 800: a growing wait gives a busy server room to recover.'],
    ], { page: { html: RETRY_HTML, css: DESK }, minTaps: 3 }),
    run('How long are the waits?', 'Pick a rule for the wait.', ['for (let n = 1; n <= 4; n++) {', '  console.log("Wait before try " + (n + 1) + ": " + ({{v}}) + " ms");', '}'], ['200 * 2 ** (n - 1)', '200', '200 * n'], { caption: 'Doubling each time is called exponential backoff. Real apps add a little randomness so thousands of phones don’t all retry at the same moment.' }),
    check('Which errors are worth retrying?', ['503 busy, or no internet', '404 not found', '400 bad request', 'A typo in the train number'], 'Trying again can outlast a busy server; it can’t fix a wrong request.', 'Would trying again change anything?', { mono: false }),
    tapbug('After 3 failures it shows “undefined”', ['for (let i = 1; i <= tries; i++) {', '  try { return await job(); }', '  catch (err) { await wait(200); }', '}'], [[3, 'catch (err) { await wait(200); }', 'catch (err) { if (i === tries) throw err; await wait(200); }']], 'The last error is swallowed, so the function ends with nothing. Throw it on the last try.'),
    recap([
      ['🔁', 'Retry failures that may pass'],
      ['📈', 'Wait longer each time: 200, 400, 800 ms'],
      ['🛑', 'Stop after a few tries and pass the error on'],
    ]),
  ]),

  challenge('js-i-4-ch', 'Module 4 Challenge', { icon: '⏳', name: 'Async Pro' }, ['Run requests together with Promise.all', 'Keep what worked with Promise.allSettled', 'Retry with a growing wait'], [
    mcq(1, 'Promise.all with 3 requests: about how long does it take?', ['As long as the slowest one', 'The three times added up', 'As long as the fastest one', 'Always 1 second'], 'They run at the same time.'),
    mcq(2, 'Which never fails, and reports each result?', ['Promise.allSettled', 'Promise.all', 'Promise.race', 'Promise.any'], 'Settled means done, either way.', { mono: true }),
    mcq(3, 'A result with status "fulfilled" keeps its answer in…', ['value', 'reason', 'result', 'data'], 'value for success, reason for failure.', { mono: true }),
    mcq(4, 'Why wait longer before each retry?', ['To give a busy server time to recover', 'To make the app feel slow', 'Because fetch needs it', 'To save memory'], 'Growing waits are kinder to the server.'),
    mcq(5, 'Which should not be retried?', ['404 Not found', '503 Busy', 'No internet', 'A timeout'], 'The train won’t appear by asking again.'),
    swipe([
      ['Promise.all gives answers in the order you asked', true, 'Whatever order they finish in.'],
      ['allSettled throws if one request fails', false, 'It reports it instead.'],
      ['Retrying a 404 can fix it', false, 'The thing still won’t exist.'],
      ['A retry loop needs a limit', true, 'Or it could go on and on.'],
    ]),
    pairs([['Promise.all', 'All or nothing'], ['Promise.allSettled', 'Every result, each marked'], ['2 ** n', 'A doubling wait'], ['503', 'Busy, try later']], 'Waiting tools.'),
    pickCode('Which starts three requests at the same time?', ['await Promise.all(saved.map(getTrain))', 'for (const no of saved) await getTrain(no);', 'await getTrain(saved)', 'saved.forEach(await getTrain)'], 'map starts them all; Promise.all waits for them all.'),
    bugTask(['const trains = Promise.all(saved.map(getTrain));', 'const ok = results.filter((r) => r.status === "done");', 'if (i = tries) throw err;'], [[1, '= Promise.all', '= await Promise.all'], [2, '"done"', '"fulfilled"'], [3, 'i = tries', 'i === tries']], 'Wait for Promise.all, the status is "fulfilled", and compare with ===.'),
    predictTask(['const waits = [];', 'for (let i = 1; i <= 3; i++) {', '  waits.push(100 * 2 ** (i - 1));', '}', 'const total = waits.reduce((a, b) => a + b, 0);', 'console.log(waits.join(" + ") + " = " + total);'], 'What does it print?', ['100 + 200 + 400 = 700', '100 + 100 + 100 = 300', '200 + 400 + 800 = 1400', '100 + 200 + 300 = 600'], 'The wait doubles: 2 ** 0, 2 ** 1, 2 ** 2 times 100.'),
    arrange(['const results = [{ status: "fulfilled", value: 90101 }, { status: "rejected", reason: "down" }];', 'const worked = results.filter((r) => r.status === "fulfilled");', 'console.log(worked.length + " of " + results.length + " worked");'], 'take the results, keep the ones that worked, then report', ['1 of 2 worked']),
  ]),
];
