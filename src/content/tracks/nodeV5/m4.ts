// Node.js · Modules 4–6 (Basic): asynchronous code and the event loop, files and paths, events and streams.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, prog, recap, rerun, reveal, swipe, tapbug, tapPage, term, toggle, truth, xray } from './kit';

const ORDER = ['console.log("1. Take the order");', 'setTimeout(() => console.log("3. Tea is ready"), 1000);', 'console.log("2. Take the next order");'];
const CALLBACK = ['import { readFile } from "node:fs";', '', 'readFile("menu.txt", "utf8", (err, text) => {', '  if (err) {', '    console.error("Could not read: " + err.code);', '    return;', '  }', '  console.log("Menu: " + text);', '});', 'console.log("Reading the menu…");'];
const PROMISES = [
  'import { readFile } from "node:fs/promises";',
  '',
  'async function showMenu() {',
  '  try {',
  '    const text = await readFile("menu.txt", "utf8");',
  '    console.log("Menu: " + text);',
  '  } catch (err) {',
  '    console.error("Could not read: " + err.code);',
  '  }',
  '}',
  '',
  'await showMenu();',
  'console.log("Done");',
];
const PARALLEL = [
  'import { setTimeout as sleep } from "node:timers/promises";',
  '',
  'async function cook(dish, ms) {',
  '  await sleep(ms);',
  '  return dish + " ready";',
  '}',
  '',
  'const results = await Promise.all([cook("Tea", 300), cook("Toast", 500)]);',
  'console.log(results);',
];
const LOOP = ['console.log("A: start");', 'setTimeout(() => console.log("D: timer"), 0);', 'Promise.resolve().then(() => console.log("C: promise"));', 'console.log("B: end");'];

const FILES = [
  'import { readFile, writeFile, appendFile } from "node:fs/promises";',
  '',
  'const menu = JSON.parse(await readFile("menu.json", "utf8"));',
  'console.log(menu.length + " dishes");',
  '',
  'await appendFile("orders.log", "Lemon Tea\\n");',
  'const log = await readFile("orders.log", "utf8");',
  'console.log("Orders so far: " + log.trim().split("\\n").length);',
  '',
  'await writeFile("menu-names.txt", menu.map((d) => d.name).join(", "));',
  'console.log(await readFile("menu-names.txt", "utf8"));',
];
const MENU_JSON = '[{ "name": "Lemon Tea", "price": 40 }, { "name": "Cheese Toast", "price": 80 }]';
const PATHS = [
  'import path from "node:path";',
  'import { readFile } from "node:fs/promises";',
  '',
  'const file = path.join(import.meta.dirname, "data", "menu.json");',
  'console.log(file);',
  'const menu = JSON.parse(await readFile(file, "utf8"));',
  'console.log(menu[0].name);',
];
const FOLDERS = [
  'import { mkdir, readdir, writeFile, rm } from "node:fs/promises";',
  'import { existsSync } from "node:fs";',
  '',
  'await mkdir("reports", { recursive: true });',
  'await writeFile("reports/monday.txt", "12 cups");',
  'await writeFile("reports/tuesday.txt", "18 cups");',
  'console.log(await readdir("reports"));',
  'await rm("reports/monday.txt");',
  'console.log(await readdir("reports"));',
  'console.log(existsSync("reports/monday.txt"));',
];

const EVENTS = [
  'import { EventEmitter } from "node:events";',
  '',
  'const kitchen = new EventEmitter();',
  '',
  'kitchen.on("order", (dish) => console.log("Cooking " + dish));',
  'kitchen.on("order", (dish) => console.log("Logged " + dish));',
  'kitchen.once("closed", () => console.log("Kitchen closed"));',
  '',
  'kitchen.emit("order", "Lemon Tea");',
  'kitchen.emit("closed");',
  'kitchen.emit("closed");',
];
const CLASS_EVENTS = [
  'import { EventEmitter } from "node:events";',
  '',
  'class Oven extends EventEmitter {',
  '  bake(item) {',
  '    this.emit("start", item);',
  '    setTimeout(() => this.emit("done", item), 200);',
  '  }',
  '}',
  '',
  'const oven = new Oven();',
  'oven.on("start", (item) => console.log("Baking " + item));',
  'oven.on("done", (item) => console.log(item + " is ready"));',
  'oven.bake("Cheese Toast");',
];

export const NODE_M4: Lesson[] = [
  lesson('n-async-1', 'Asynchronous code', 8, [
    chat(['Reading a file or asking another server takes time. Node.js doesn’t wait: it starts the job, carries on, and comes back when the answer is ready.', 'That is asynchronous code. One Node.js process can serve thousands of people because it never sits idle waiting.']),
    explore('Not waiting', ORDER, [
      [1, 'Runs now.'],
      [2, 'Starts a timer and moves on at once.'],
      [3, 'Runs before the tea is ready.'],
    ], { page: prog(ORDER), intro: 'Read the output order.' }),
    toggle('Three ways to wait for a result', [
      ['Callback', CALLBACK, 'A function called later with (err, result). The older style.', prog(CALLBACK, {}, { 'menu.txt': 'Tea, Toast' })],
      ['async / await', PROMISES, 'await pauses this function until the promise is ready. The modern style.', prog(PROMISES, {}, { 'menu.txt': 'Tea, Toast' })],
    ]),
    explore('async and await', PROMISES, [
      [3, 'async marks a function that can await.'],
      [5, 'await waits for the file without blocking anything else.'],
      [7, 'A failed promise lands in catch.'],
      [12, 'In ES modules you can await at the top level.'],
    ]),
    tapbug('It prints Promise { <pending> } instead of the menu', ['const text = readFile("menu.txt", "utf8");', 'console.log(text);'], [[1, '= readFile(', '= await readFile(']], 'readFile from fs/promises gives a promise. await it to get the text.'),
    check('Why doesn’t Node.js wait for slow jobs?', ['So it can keep serving others while the job finishes', 'Because it can’t read files', 'To save memory', 'It always waits'], 'Non-blocking is the point.', 'What would a waiting server do to everyone else?'),
    recap([
      ['⏳', 'Slow jobs run in the background'],
      ['🔁', 'Callbacks, promises, async/await'],
      ['🛡', 'try/catch around await for errors'],
    ]),
  ]),

  lesson('n-b-4-2', 'Promises together', 7, [
    reveal('Working with several promises', [
      ['Promise.all([...])', 'Wait for all; fails if any fails.'],
      ['Promise.allSettled([...])', 'Wait for all; tells you which worked.'],
      ['Promise.race([...])', 'The first to finish wins.'],
      ['Promise.any([...])', 'The first to succeed wins.'],
    ], { mono: true }),
    explore('Cook two dishes at once', PARALLEL, [
      [1, 'A promise version of setTimeout.'],
      [3, 'An async function: it gives back a promise.'],
      [8, 'Both start now; await waits for both: about 0.5 seconds, not 0.8.'],
      [9, 'The results come back in the same order as the list.'],
    ], { page: prog(PARALLEL), minTaps: 3 }),
    toggle('One after another, or together?', [
      ['Sequential', ['const tea = await cook("Tea", 300);', 'const toast = await cook("Toast", 500);'], 'About 0.8 seconds: the second waits for the first.'],
      ['Parallel', ['const [tea, toast] = await Promise.all([', '  cook("Tea", 300),', '  cook("Toast", 500),', ']);'], 'About 0.5 seconds: they overlap.'],
    ]),
    check('When should you use Promise.all?', ['When the jobs don’t depend on each other', 'Always', 'When the second needs the first’s result', 'Never in Node.js'], 'Overlap independent work.', 'Does one job need the other?'),
    truth([
      ['Promise.all gives results in the same order as the list', true, 'Whatever finishes first.'],
      ['Promise.race waits for every promise', false, 'The first to settle wins.'],
      ['allSettled never rejects', true, 'It reports each result.'],
    ]),
    recap([
      ['⚡', 'Promise.all runs independent jobs together'],
      ['📋', 'allSettled when some may fail'],
      ['🏁', 'race and any for the first'],
    ]),
  ]),

  lesson('n-b-4-3', 'The event loop', 8, [
    chat(['Node.js runs your code on one thread. Finished jobs wait in queues, and the event loop runs them when the current code is done.', 'Promise callbacks (microtasks) run before timers. That is why the order can surprise you.']),
    explore('Guess the order', LOOP, [
      [1, 'Normal code runs first, top to bottom: A, then B.'],
      [3, 'A promise callback is a microtask: it runs as soon as the current code finishes.'],
      [2, 'A timer, even 0 ms, waits for the next turn of the loop: last.'],
    ], { page: prog(LOOP), intro: 'The output is A, B, C, D.' }),
    reveal('The loop, simply', [
      ['1 · Your code', 'Runs to the end, without stopping.'],
      ['2 · Microtasks', 'Promise callbacks (then, await) run next.'],
      ['3 · Timers', 'setTimeout callbacks whose time is up.'],
      ['4 · I/O', 'Finished file and network jobs.'],
    ]),
    tapbug('The whole server freezes for everyone while one person searches', ['app.get("/search", (req, res) => {', '  let found = 0;', '  for (let i = 0; i < 5e9; i++) found += i % 7;', '  res.json({ found });', '});'], [[3, 'for (let i = 0; i < 5e9; i++) found += i % 7;', 'const found = await searchIndex(req.query.q); // fast, async']], 'A long loop blocks the single thread. Use an index, a database, or a worker thread.'),
    check('What prints first: a setTimeout(…, 0) callback or a Promise.then callback?', ['The promise callback', 'The timer', 'They are random', 'Neither'], 'Microtasks before timers.', 'Which queue comes first?'),
    recap([
      ['🔄', 'One thread; the event loop runs queued work'],
      ['🧵', 'Promise callbacks before timers'],
      ['🧊', 'Never block the loop with long loops'],
    ]),
  ]),

  challenge('n-b-4-ch', 'Module 4 Challenge', { icon: '⏳', name: 'Async Ace' }, ['Write asynchronous code with async/await', 'Run jobs in parallel', 'Predict the event loop'], [
    mcq(1, 'What does await do?', ['Pauses this async function until the promise settles', 'Stops the whole program', 'Makes code synchronous everywhere', 'Retries on error'], 'Others keep running.'),
    mcq(2, 'In a callback (err, data), what comes first?', ['The error', 'The data', 'The file name', 'The time'], 'Error-first callbacks.'),
    mcq(3, 'Which waits for every job and reports each result, even failures?', ['Promise.allSettled', 'Promise.all', 'Promise.race', 'Promise.any'], 'all fails fast.', { mono: true }),
    mcq(4, 'Order: log A; setTimeout(log D, 0); Promise.resolve().then(log C); log B?', ['A B C D', 'A D C B', 'A C B D', 'D C B A'], 'Code, microtasks, timers.'),
    mcq(5, 'What blocks the event loop?', ['A long synchronous loop', 'await readFile', 'setTimeout', 'A promise'], 'One thread.'),
    swipe([
      ['Top-level await works in ES modules', true, 'In the entry file and others.'],
      ['Promise.all fails if any promise fails', true, 'Use allSettled to keep going.'],
      ['setTimeout(fn, 0) runs fn immediately', false, 'After the current code and microtasks.'],
      ['try/catch catches errors from await', true, 'Inside an async function.'],
    ]),
    pairs([['Callback', 'Called later'], ['Promise', 'A future value'], ['await', 'Wait here'], ['Event loop', 'Runs queued work']], 'Async ideas.'),
    pickCode('Which reads two files at the same time?', ['const [a, b] = await Promise.all([readFile("a.txt", "utf8"), readFile("b.txt", "utf8")]);', 'const a = await readFile("a.txt"); const b = await readFile("b.txt");', 'const a = readFile("a.txt"); const b = readFile("b.txt");', 'await readFile(["a.txt", "b.txt"]);'], 'Start both, await both.'),
    bugTask(['async function load() {', '  const text = readFile("menu.txt", "utf8");', '  return text.toUpperCase();', '}'], [[2, '= readFile(', '= await readFile(']], 'Await the promise first.'),
    xray('<div class="c">$ node app.js</div><div class="a">A: start</div><div class="b">B: end</div><div class="p">C: promise</div><div class="d">D: timer</div>', [
      ['.p', 'Third line', 'Promise.resolve().then(…)', ['console.log', 'Promise.resolve().then(…)', 'setTimeout(…, 0)']],
      ['.d', 'Last line', 'setTimeout(…, 0)', ['console.log', 'Promise.resolve().then(…)', 'setTimeout(…, 0)']],
      ['.a', 'First line', 'console.log', ['console.log', 'Promise.resolve().then(…)', 'setTimeout(…, 0)']],
    ]),
    arrange(['import { setTimeout as sleep } from "node:timers/promises";', 'console.log("Brewing…");', 'await sleep(200);', 'console.log("Tea is ready");'], 'import sleep, say it started, wait, say it is ready'),
  ]),

  lesson('n-fs-1', 'Reading and writing files', 8, [
    chat(['node:fs/promises reads and writes files with await. Give "utf8" to get text instead of raw bytes.', 'writeFile replaces a file; appendFile adds to the end. JSON files are text: parse them after reading.']),
    explore('Files with await', FILES, [
      [3, 'Read the text, then JSON.parse it into an array.'],
      [6, 'appendFile adds a line (and makes the file if it’s missing).'],
      [10, 'writeFile replaces the whole file.'],
    ], { page: term({ 'app.js': FILES, 'menu.json': MENU_JSON }, { rerun: true }), minTaps: 2 }),
    tapPage('Files stay on the disk', 'Tap Run again. The orders log keeps growing between runs.', term({ 'app.js': FILES, 'menu.json': MENU_JSON }, { rerun: true }), 'Orders so far: 2', [rerun], 'appendFile added a second line to the file saved by the first run.'),
    tapbug('Error: ENOENT: no such file or directory, open ’/app/menu.jsn’', ['const menu = JSON.parse(await readFile("menu.jsn", "utf8"));'], [[1, '"menu.jsn"', '"menu.json"']], 'ENOENT means the file isn’t there. Check the name and the folder.'),
    check('What does readFile("a.txt") give without "utf8"?', ['A Buffer of raw bytes', 'A string', 'An array of lines', 'An error'], 'Give an encoding for text.', 'What did you leave out?', { mono: false }),
    truth([
      ['writeFile adds to the end of a file', false, 'It replaces it. appendFile adds.'],
      ['JSON files must be parsed after reading', true, 'They are text.'],
      ['readFileSync blocks the event loop while it reads', true, 'Fine in small scripts, not in servers.'],
    ]),
    recap([
      ['📖', 'await readFile(path, "utf8")'],
      ['✍', 'writeFile replaces; appendFile adds'],
      ['🧾', 'JSON.parse after reading, JSON.stringify before writing'],
    ]),
  ]),

  lesson('n-b-5-2', 'Paths and folders', 7, [
    reveal('Where is the file?', [
      ['Relative paths', '"menu.json" means “in the folder Node was started from”, which may not be your file’s folder.'],
      ['import.meta.dirname', 'The folder of this file (ES modules). In CommonJS: __dirname.'],
      ['path.join', 'Joins parts with the right separator and tidies .. and .'],
    ]),
    explore('A path that always works', PATHS, [
      [4, 'Start from this file’s folder, then go into data/.'],
      [5, 'A full, absolute path.'],
      [6, 'Read it wherever node was started.'],
    ], { page: term({ 'app.js': PATHS, 'data/menu.json': MENU_JSON }), minTaps: 2 }),
    explore('Folders', FOLDERS, [
      [4, 'recursive: true makes parent folders too, and doesn’t fail if it exists.'],
      [7, 'readdir lists what is inside.'],
      [8, 'rm deletes a file.'],
      [10, 'existsSync checks without throwing.'],
    ], { page: prog(FOLDERS), minTaps: 3 }),
    tapbug('Works on your laptop, fails on the server', ['const file = "./data/menu.json";'], [[1, '"./data/menu.json"', 'path.join(import.meta.dirname, "data", "menu.json")']], 'Relative paths depend on where node was started. Build from the file’s own folder.'),
    check('In an ES module, which gives the folder of the current file?', ['import.meta.dirname', '__dirname', 'process.cwd()', 'path.here'], '__dirname is CommonJS.', 'ES modules use import.meta.', { mono: true }),
    recap([
      ['📍', 'import.meta.dirname (or __dirname) for this file’s folder'],
      ['🧭', 'path.join to build paths'],
      ['📂', 'mkdir, readdir, rm for folders and files'],
    ]),
  ]),

  challenge('n-b-5-ch', 'Module 5 Challenge', { icon: '📁', name: 'File Keeper' }, ['Read and write text and JSON files', 'Build paths that always work', 'Work with folders'], [
    mcq(1, 'Which module has await-able file functions?', ['node:fs/promises', 'node:path', 'node:http', 'node:os'], 'readFile, writeFile…', { mono: true }),
    mcq(2, 'Which adds to the end of a file?', ['appendFile', 'writeFile', 'addFile', 'readFile'], 'writeFile replaces.', { mono: true }),
    mcq(3, 'What does ENOENT mean?', ['The file or folder doesn’t exist', 'No permission', 'The file is empty', 'The disk is full'], 'Check the path.', { mono: true }),
    mcq(4, 'What does { recursive: true } do for mkdir?', ['Makes missing parent folders and doesn’t fail if it exists', 'Deletes the folder', 'Copies files', 'Lists the folder'], 'Safe to repeat.', { mono: true }),
    mcq(5, 'Why avoid relative paths like "./data.json" in servers?', ['They depend on where node was started', 'They are slower', 'They can’t read JSON', 'They are not allowed'], 'Build from the file’s folder.'),
    swipe([
      ['readFile with "utf8" gives a string', true, 'Text.'],
      ['JSON.stringify turns data into text for writing', true, 'Then writeFile.'],
      ['readdir deletes a folder', false, 'It lists it.'],
      ['__dirname works in ES modules', false, 'Use import.meta.dirname.'],
    ]),
    pairs([['readFile', 'Read'], ['writeFile', 'Replace'], ['appendFile', 'Add'], ['readdir', 'List']], 'File functions.'),
    pickCode('Which saves an array as JSON?', ['await writeFile("menu.json", JSON.stringify(menu, null, 2));', 'await writeFile("menu.json", menu);', 'await readFile("menu.json", menu);', 'JSON.save("menu.json", menu);'], 'Turn it into text first.'),
    bugTask(['const text = await readFile("menu.json");', 'const menu = text;'], [[1, 'readFile("menu.json")', 'readFile("menu.json", "utf8")'], [2, 'const menu = text;', 'const menu = JSON.parse(text);']], 'Read as text, then parse.'),
    xray('<div class="c">$ node app.js</div><div class="l">[ \'monday.txt\', \'tuesday.txt\' ]</div><div class="f">false</div>', [
      ['.l', 'A list of files', 'readdir', ['readdir', 'existsSync', 'mkdir']],
      ['.f', 'Is it still there?', 'existsSync', ['readdir', 'existsSync', 'mkdir']],
    ]),
    arrange(['import { writeFile, readFile } from "node:fs/promises";', 'await writeFile("note.txt", "Buy milk");', 'console.log(await readFile("note.txt", "utf8"));'], 'import, write the note, read it back'),
  ]),

  lesson('n-events', 'Events', 7, [
    chat(['Much of Node.js is built on events: something happens, and every function listening for it runs.', 'Servers emit "request", streams emit "data", and you can make your own with EventEmitter.']),
    explore('An event emitter', EVENTS, [
      [3, 'Make an emitter.'],
      [5, 'on: listen every time.'],
      [6, 'Several listeners run in the order they were added.'],
      [7, 'once: listen only the first time.'],
      [9, 'emit: fire the event, with data.'],
    ], { page: prog(EVENTS), minTaps: 3 }),
    explore('Your own emitting class', CLASS_EVENTS, [
      [3, 'extends EventEmitter gives on and emit.'],
      [5, 'Tell listeners something started…'],
      [6, '…and later that it finished.'],
    ], { page: prog(CLASS_EVENTS), minTaps: 2 }),
    check('After once("closed", f), how many times does f run if "closed" is emitted twice?', ['Once', 'Twice', 'Never', 'It throws'], 'once removes itself.', 'Read the name.', { mono: false }),
    tapbug('Nothing prints', ['kitchen.emit("order", "Tea");', 'kitchen.on("order", (d) => console.log(d));'], [[1, 'kitchen.emit("order", "Tea");', 'kitchen.on("order", (d) => console.log(d));'], [2, 'kitchen.on("order", (d) => console.log(d));', 'kitchen.emit("order", "Tea");']], 'Listen first, then emit. An event with no listener is simply lost.'),
    recap([
      ['📣', 'emit fires an event with data'],
      ['👂', 'on listens every time; once only the first'],
      ['🧱', 'Many Node.js objects are event emitters'],
    ]),
  ]),

  lesson('n-b-6-2', 'Streams', 7, [
    chat(['Reading a 2 GB log file in one go would fill the memory. A stream reads it a piece (a chunk) at a time.', 'Streams are event emitters: "data" for each chunk, "end" when done, "error" if it fails.']),
    reveal('Four kinds of stream', [
      ['Readable', 'Gives data: fs.createReadStream, an incoming request.'],
      ['Writable', 'Takes data: fs.createWriteStream, a response.'],
      ['Duplex', 'Both: a network socket.'],
      ['Transform', 'Changes data on the way through: zip compression.'],
    ]),
    toggle('All at once, or a piece at a time?', [
      ['readFile', ['const text = await readFile("big.log", "utf8");', 'console.log(text.length);'], 'The whole file in memory. Fine for small files.'],
      ['A stream', ['const stream = createReadStream("big.log", "utf8");', 'let size = 0;', 'stream.on("data", (chunk) => (size += chunk.length));', 'stream.on("end", () => console.log(size));'], 'Only one chunk in memory at a time.'],
      ['pipeline', ['await pipeline(', '  createReadStream("big.log"),', '  createGzip(),', '  createWriteStream("big.log.gz"),', ');'], 'Read, compress and write, piece by piece, with errors handled.'],
    ]),
    matchUp('Which stream?', [['fs.createReadStream', 'Readable'], ['res in an HTTP server', 'Writable'], ['zlib.createGzip()', 'Transform'], ['A network socket', 'Duplex']], 'Data flows from readable to writable.'),
    check('Why stream a huge file?', ['Only a small piece is in memory at a time', 'Streams are always faster to write', 'readFile can’t read text', 'Streams skip errors'], 'Memory stays low.', 'How much is held at once?'),
    recap([
      ['🌊', 'Streams move data in chunks'],
      ['📣', 'data, end and error events'],
      ['🔗', 'pipeline links streams and handles errors'],
    ]),
  ]),

  challenge('n-b-6-ch', 'Module 6 Challenge', { icon: '📣', name: 'Event Wrangler' }, ['Emit and listen for events', 'Build classes that emit events', 'Explain streams'], [
    mcq(1, 'Which method fires an event?', ['emit', 'on', 'once', 'fire'], 'on listens.', { mono: true }),
    mcq(2, 'What happens to an event nobody listens for?', ['Nothing: it is lost', 'It waits for a listener', 'It throws', 'It repeats'], 'Listen first.'),
    mcq(3, 'Which stream event gives each piece of data?', ['data', 'end', 'chunk', 'read'], 'end comes last.', { mono: true }),
    mcq(4, 'Which kind of stream changes data as it passes?', ['Transform', 'Readable', 'Writable', 'Static'], 'Like compression.'),
    mcq(5, 'Why are streams good for big files?', ['Low memory use', 'They need no code', 'They are always sync', 'They avoid errors'], 'A chunk at a time.'),
    swipe([
      ['Several listeners can listen for one event', true, 'They run in order.'],
      ['once listens forever', false, 'Only the first time.'],
      ['An HTTP request is a readable stream', true, 'The body arrives in chunks.'],
      ['pipeline handles stream errors for you', true, 'And cleans up.'],
    ]),
    pairs([['on', 'Listen'], ['emit', 'Fire'], ['once', 'Listen once'], ['pipeline', 'Link streams']], 'Events and streams.'),
    pickCode('Which listens for every "order" event?', ['kitchen.on("order", (dish) => cook(dish));', 'kitchen.emit("order", cook);', 'kitchen.once("order", cook);', 'kitchen.listen("order");'], 'on, every time.'),
    bugTask(['class Oven {', '  bake(item) { this.emit("done", item); }', '}'], [[1, 'class Oven {', 'class Oven extends EventEmitter {']], 'To emit, the class must extend EventEmitter.'),
    xray('<div class="c">$ node app.js</div><div class="s">Baking Cheese Toast</div><div class="d">Cheese Toast is ready</div>', [
      ['.s', 'Started', 'this.emit("start", item)', ['this.emit("start", item)', 'this.emit("done", item)', 'new Oven()']],
      ['.d', 'Finished later', 'this.emit("done", item)', ['this.emit("start", item)', 'this.emit("done", item)', 'new Oven()']],
    ]),
    arrange(['import { EventEmitter } from "node:events";', 'const bell = new EventEmitter();', 'bell.on("ring", () => console.log("Order up!"));', 'bell.emit("ring");'], 'import, make an emitter, listen, then emit'),
  ]),
];
