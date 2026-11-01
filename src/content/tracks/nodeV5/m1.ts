// Node.js · Modules 1–3 (Basic): Node.js basics, modules, and npm. Each module’s first lesson keeps its old id.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, prog, recap, reveal, swipe, tapbug, term, toggle, truth, xray } from './kit';

const HELLO = ['const cafe = "Rosa’s Café";', 'const cups = [40, 90, 40];', 'const total = cups.reduce((sum, p) => sum + p, 0);', 'console.log("Welcome to " + cafe);', 'console.log("Today’s total: ₹" + total);'];
const CONSOLE = ['const orders = [', '  { dish: "Lemon Tea", qty: 2 },', '  { dish: "Cheese Toast", qty: 1 },', '];', 'console.log("Orders:", orders.length);', 'console.log(orders[0]);', 'console.table(orders);', 'console.error("Out of milk!");'];
const ARGS = ['const [name = "guest", cups = "1"] = process.argv.slice(2);', 'console.log("Order for " + name + ": " + cups + " cup(s)");', 'console.log("Running on Node " + process.version);', 'if (Number(cups) > 10) {', '  console.error("Too many cups");', '  process.exit(1);', '}'];

const PRICES_CJS = ['const TAX = 0.05;', '', 'function withTax(price) {', '  return Math.round(price * (1 + TAX));', '}', '', 'module.exports = { withTax, TAX };'];
const APP_CJS = ['const { withTax } = require("./prices");', '', 'console.log("Lemon Tea: ₹" + withTax(40));', 'console.log("Cheese Toast: ₹" + withTax(80));'];
const PRICES_ESM = ['export const TAX = 0.05;', '', 'export function withTax(price) {', '  return Math.round(price * (1 + TAX));', '}', '', 'export default function format(price) {', '  return "₹" + price;', '}'];
const APP_ESM = ['import format, { withTax } from "./prices.js";', '', 'console.log("Lemon Tea: " + format(withTax(40)));'];
const BUILTINS = ['import path from "node:path";', 'import os from "node:os";', '', 'const file = path.join("data", "menu", "drinks.json");', 'console.log(file);', 'console.log(path.extname(file));', 'console.log(path.basename(file, ".json"));', 'console.log("Line ending is", JSON.stringify(os.EOL));'];

const PKG = ['{', '  "name": "rosas-cafe",', '  "version": "1.0.0",', '  "type": "module",', '  "scripts": {', '    "start": "node app.js",', '    "dev": "node --watch app.js",', '    "test": "node --test"', '  },', '  "dependencies": {', '    "express": "^5.1.0"', '  },', '  "devDependencies": {', '    "eslint": "^9.20.0"', '  }', '}'];

export const NODE_M1: Lesson[] = [
  lesson('n-intro-1', 'What is Node.js?', 6, [
    chat(['JavaScript was made for web pages. Node.js lets it run anywhere else: on servers, on your laptop, in tools.', 'It is the same language you know, plus ways to read files, start servers and talk to databases.']),
    reveal('Where Node.js is used', [
      ['Web servers and APIs', 'The back end of sites and apps: logins, orders, payments.', '🖥'],
      ['Tools you already use', 'npm, Vite, ESLint and Prettier are Node.js programs.', '🧰'],
      ['Real-time apps', 'Chats, live scores and games, because it handles many connections at once.', '⚡'],
      ['Scripts', 'Small programs that rename files, clean data or send reports.', '📜'],
    ]),
    explore('Your first Node.js program', HELLO, [
      [1, 'Plain JavaScript: variables…'],
      [3, '…arrays and functions, the same as in the browser.'],
      [4, 'console.log prints to the terminal instead of the browser console.'],
    ], { page: prog(HELLO), intro: 'The terminal below ran node app.js.' }),
    check('What does Node.js do?', ['Runs JavaScript outside the browser', 'Styles web pages', 'Is a database', 'Replaces JavaScript'], 'Same language, new places.', 'Where did JavaScript run before?'),
    truth([
      ['Node.js programs can read and write files', true, 'Browsers can’t do that freely.'],
      ['Node.js has document and window', false, 'There is no page: no DOM.'],
      ['npm comes with Node.js', true, 'The package manager.'],
    ]),
    recap([
      ['🟢', 'Node.js runs JavaScript outside the browser'],
      ['▶', 'node app.js runs a file'],
      ['🖥', 'Servers, tools and scripts are built with it'],
    ]),
  ]),

  lesson('n-b-1-2', 'Running files and the console', 7, [
    chat(['Save your code in a file, like app.js, and run it in a terminal with node app.js.', 'Everything console.log prints appears in that terminal. There are a few more helpers for errors and tables.']),
    explore('The console', CONSOLE, [
      [5, 'Several values, separated by spaces.'],
      [6, 'Objects print in a readable form.'],
      [7, 'console.table shows a list as a table.'],
      [8, 'console.error writes to the error stream (shown in red here).'],
    ], { page: prog(CONSOLE), minTaps: 3 }),
    reveal('Running and stopping', [
      ['node app.js', 'Runs the file and stops when there is nothing left to do.'],
      ['node --watch app.js', 'Runs again every time you save.'],
      ['node', 'With no file: the REPL, to try one line at a time. Leave with .exit.'],
      ['Ctrl + C', 'Stops a program that keeps running, like a server.'],
    ], { mono: true }),
    tapbug('Error: Cannot find module ’/app/ap.js’', ['$ node ap.js'], [[1, 'ap.js', 'app.js']], 'Node runs exactly the file you name. Check the spelling.'),
    check('Which command reruns the file each time you save?', ['node --watch app.js', 'node app.js --again', 'npm watch', 'node -r app.js'], 'Built into Node.js.', 'Look for “watch”.', { mono: true }),
    recap([
      ['📄', 'Code lives in .js files; node file.js runs it'],
      ['🖨', 'console.log, console.table, console.error'],
      ['👀', 'node --watch reruns on save'],
    ]),
  ]),

  lesson('n-b-1-3', 'The process object', 7, [
    reveal('process: the running program', [
      ['process.argv', 'The command-line words: node, the file, then your arguments.'],
      ['process.env', 'Environment variables, like PORT or a database address.'],
      ['process.exit(code)', 'Stops now. 0 means OK; anything else means something failed.'],
      ['process.version', 'Which Node.js is running.'],
    ], { mono: true }),
    toggle('Arguments change what it does', [
      ['node app.js', ARGS, 'No arguments: the defaults.', prog(ARGS)],
      ['node app.js Sam 3', ARGS, 'Two arguments become name and cups.', prog(ARGS, { args: ['Sam', '3'] })],
      ['node app.js Sam 20', ARGS, 'Too many cups: an error, then exit code 1.', prog(ARGS, { args: ['Sam', '20'] })],
    ]),
    explore('Reading arguments', ARGS, [
      [1, 'argv[0] is node and argv[1] the file, so slice(2) keeps your words.'],
      [3, 'Arguments are always text: turn them into numbers.'],
      [6, 'A non-zero exit code tells scripts and servers it failed.'],
    ]),
    check('For node app.js Sam 3, what is process.argv[2]?', ['"Sam"', '"3"', '"app.js"', '"node"'], 'node, the file, then your words.', 'Count from 0.', { mono: true }),
    tapbug('A failed check still reports success', ['if (!file) {', '  console.error("No file given");', '  process.exit(0);', '}'], [[3, 'process.exit(0)', 'process.exit(1)']], 'Exit code 0 means success. Use 1 (or another non-zero code) for failure.'),
    recap([
      ['⌨', 'process.argv: the command-line words'],
      ['🌱', 'process.env: environment variables'],
      ['🚪', 'process.exit(1) for a failure'],
    ]),
  ]),

  challenge('n-b-1-ch', 'Module 1 Challenge', { icon: '🟢', name: 'Node Starter' }, ['Explain what Node.js is for', 'Run files and print to the terminal', 'Read arguments and exit codes'], [
    mcq(1, 'Which command runs app.js?', ['node app.js', 'run app.js', 'npm app.js', 'js app.js'], 'node and the file name.', { mono: true }),
    mcq(2, 'What doesn’t Node.js have?', ['document and window', 'console', 'setTimeout', 'Math'], 'There is no web page.'),
    mcq(3, 'Where do your own arguments start in process.argv?', ['At index 2', 'At index 0', 'At index 1', 'At the end'], 'After node and the file.'),
    mcq(4, 'What does exit code 0 mean?', ['Success', 'Failure', 'Still running', 'No output'], 'Non-zero means failure.'),
    mcq(5, 'Which shows an array of objects as a table?', ['console.table', 'console.log', 'console.grid', 'console.rows'], 'Rows and columns.', { mono: true }),
    swipe([
      ['npm and Vite are Node.js programs', true, 'Tools run on Node.js.'],
      ['Arguments arrive as numbers when you type digits', false, 'Always text.'],
      ['Ctrl + C stops a running server', true, 'In the terminal.'],
      ['console.log in Node.js prints in the browser', false, 'In the terminal.'],
    ]),
    pairs([['process.argv', 'Arguments'], ['process.env', 'Environment'], ['process.exit', 'Stop now'], ['node --watch', 'Rerun on save']], 'Running programs.'),
    pickCode('Which reads a name argument with a default?', ['const name = process.argv[2] ?? "guest";', 'const name = process.argv[0];', 'const name = argv.name;', 'const name = process.env[2];'], 'Index 2, with ?? for a default.'),
    bugTask(['const cups = process.argv[3];', 'console.log(cups * 40);', 'process.exit(0); // after an error'], [[1, 'process.argv[3]', 'Number(process.argv[3])'], [3, 'process.exit(0)', 'process.exit(1)']], 'Turn the text into a number, and exit with 1 after an error.'),
    xray('<div class="c">$ node app.js Sam 3</div><div>Order for Sam: 3 cup(s)</div><div class="e">Too many cups</div>', [
      ['.c', 'The command', 'process.argv', ['process.argv', 'console.log', 'console.error']],
      ['.c + div', 'The order line', 'console.log', ['process.argv', 'console.log', 'console.error']],
      ['.e', 'The red line', 'console.error', ['process.argv', 'console.log', 'console.error']],
    ]),
    arrange(['const name = process.argv[2] ?? "guest";', 'const cups = Number(process.argv[3] ?? 1);', 'console.log(name + " wants " + cups + " cups");'], 'read the name, read the cups as a number, then print', { args: ['Sam', '2'] }),
  ]),

  lesson('n-modules', 'Modules with require', 7, [
    chat(['Big programs are split into files called modules. Each file keeps its own variables, and shares only what it exports.', 'Node.js has two ways to do this. The older one, CommonJS, uses require and module.exports. You will see it in many projects.']),
    explore('Two files, one program', PRICES_CJS, [
      [1, 'Private to this file: nothing else sees TAX unless it is exported.'],
      [7, 'module.exports is what other files get.'],
    ], { page: term({ 'app.js': APP_CJS, 'prices.js': PRICES_CJS }), intro: 'prices.js, used by app.js.' }),
    explore('Using it', APP_CJS, [
      [1, 'require loads ./prices.js and gives back its exports. The ./ means “next to this file”.'],
      [3, 'Call it like any function.'],
    ], { page: term({ 'app.js': APP_CJS, 'prices.js': PRICES_CJS }), minTaps: 2 }),
    tapbug('TypeError: withTax is not a function', ['function withTax(price) {', '  return Math.round(price * 1.05);', '}', 'module.export = { withTax };'], [[4, 'module.export', 'module.exports']], 'It is module.exports, with an s.'),
    check('What does require("./prices") give you?', ['Whatever prices.js put in module.exports', 'Every variable in prices.js', 'The text of the file', 'Nothing until you call it'], 'Only what was exported.', 'What did prices.js share?'),
    recap([
      ['📦', 'Each file is a module with its own scope'],
      ['📤', 'module.exports shares values'],
      ['📥', 'require("./file") loads them'],
    ]),
  ]),

  lesson('n-b-2-2', 'ES modules: import and export', 7, [
    chat(['The modern way, the same as in the browser, is ES modules: import and export.', 'Turn them on with "type": "module" in package.json, or name files .mjs. New projects use them.']),
    explore('Named and default exports', PRICES_ESM, [
      [1, 'A named export.'],
      [3, 'Another one: functions can be exported too.'],
      [7, 'One default export per file.'],
    ]),
    explore('Importing', APP_ESM, [
      [1, 'The default first, then named ones in { }. Include the .js ending.'],
      [3, 'Use them together.'],
    ], { page: term({ 'app.js': APP_ESM, 'prices.js': PRICES_ESM }), minTaps: 2 }),
    toggle('CommonJS or ES modules?', [
      ['CommonJS', ['const { withTax } = require("./prices");', 'module.exports = { withTax };'], 'Older, still common. Loaded when the line runs.'],
      ['ES modules', ['import { withTax } from "./prices.js";', 'export function withTax(p) { … }'], 'Modern, like the browser. Allows top-level await.'],
    ]),
    matchUp('Which style?', [['require("./a")', 'CommonJS import'], ['import x from "./a.js"', 'ES module import'], ['module.exports', 'CommonJS export'], ['"type": "module"', 'Turns on ES modules']], 'Two module systems.'),
    recap([
      ['📤', 'export, and export default'],
      ['📥', 'import x, { y } from "./file.js"'],
      ['⚙', '"type": "module" or .mjs turns them on'],
    ]),
  ]),

  lesson('n-b-2-3', 'Built-in modules', 7, [
    reveal('Modules that come with Node.js', [
      ['node:fs', 'Read and write files.'],
      ['node:path', 'Join and split file paths safely.'],
      ['node:http', 'Start a web server.'],
      ['node:events', 'Emit and listen for events.'],
      ['node:os', 'Facts about the computer.'],
    ], { mono: true }),
    explore('path and os', BUILTINS, [
      [1, 'The node: prefix says “built in”, not from npm.'],
      [4, 'path.join adds the right slashes for the system.'],
      [6, 'The ending: .json.'],
      [7, 'The name without the ending.'],
    ], { page: prog(BUILTINS), minTaps: 3 }),
    tapbug('The path breaks on Windows', ['const file = "data" + "/" + "menu.json";'], [[1, '"data" + "/" + "menu.json"', 'path.join("data", "menu.json")']], 'path.join uses the right separator on every system.'),
    check('What does path.extname("menu/drinks.json") give?', ['".json"', '"json"', '"drinks"', '"menu"'], 'With the dot.', 'The ending of the file name.', { mono: true }),
    truth([
      ['Built-in modules need npm install', false, 'They come with Node.js.'],
      ['import fs from "node:fs" is a built-in', true, 'node: marks it.'],
      ['path.join can tidy ".." and "." parts', true, 'It normalises the path.'],
    ]),
    recap([
      ['🧰', 'Node.js has fs, path, http, events, os and more'],
      ['🏷', 'Import them with the node: prefix'],
      ['🧭', 'Build file paths with path.join'],
    ]),
  ]),

  challenge('n-b-2-ch', 'Module 2 Challenge', { icon: '📦', name: 'Module Maker' }, ['Split code into modules', 'Use require and import', 'Use built-in modules'], [
    mcq(1, 'Which shares values in CommonJS?', ['module.exports', 'export default', 'share()', 'window.exports'], 'With an s.', { mono: true }),
    mcq(2, 'Which turns on ES modules for .js files?', ['"type": "module" in package.json', '"modules": true', 'node --esm', 'A comment at the top'], 'Or name files .mjs.', { mono: true }),
    mcq(3, 'How many default exports can a file have?', ['One', 'Any number', 'None', 'Two'], 'Named exports can be many.'),
    mcq(4, 'What does the node: prefix mean?', ['A module built into Node.js', 'A module from npm', 'A local file', 'An old module'], 'node:fs, node:path…'),
    mcq(5, 'What does path.basename("a/menu.json", ".json") give?', ['"menu"', '"menu.json"', '"a"', '".json"'], 'The ending is removed.', { mono: true }),
    swipe([
      ['Variables in one module are private unless exported', true, 'Each file has its own scope.'],
      ['import paths in ES modules need the .js ending', true, 'For your own files.'],
      ['require works in every ES module file', false, 'Use import there.'],
      ['path.join adds the right separator', true, 'For every system.'],
    ]),
    pairs([['require', 'CommonJS import'], ['export', 'ES modules share'], ['node:path', 'File paths'], ['node:os', 'Computer facts']], 'Modules.'),
    pickCode('Which imports a default and a named export?', ['import format, { withTax } from "./prices.js";', 'import { format, default } from "./prices.js";', 'require format from "./prices";', 'import * format from "./prices.js";'], 'Default first, then { named }.'),
    bugTask(['import { withTax } from "./prices";', 'module.export = { total };'], [[1, '"./prices"', '"./prices.js"'], [2, 'module.export', 'module.exports']], 'Include .js in ES module paths, and spell module.exports in full.'),
    xray('<div class="c">$ node app.js</div><div class="j">data/menu/drinks.json</div><div class="x">.json</div>', [
      ['.j', 'A joined path', 'path.join', ['path.join', 'path.extname', 'require']],
      ['.x', 'The file ending', 'path.extname', ['path.join', 'path.extname', 'require']],
    ]),
    arrange(['import { withTax } from "./prices.js";', 'const total = withTax(40) + withTax(80);', 'console.log("Total: ₹" + total);'], 'import, work out the total, print it', { files: { 'prices.js': ['export const withTax = (p) => Math.round(p * 1.05);'] } }),
  ]),

  lesson('n-npm-1', 'npm and package.json', 7, [
    chat(['npm is Node’s package manager. It downloads code other people share, called packages, from the npm registry.', 'Each project has a package.json: its name, the packages it needs, and short commands called scripts.']),
    explore('package.json', PKG, [
      [2, 'The project’s name.'],
      [4, '"type": "module" turns on import and export.'],
      [5, 'Scripts: short names for commands.'],
      [10, 'Packages the app needs to run.'],
      [13, 'Packages only needed while building and testing.'],
    ]),
    reveal('Everyday npm commands', [
      ['npm init -y', 'Make a package.json.'],
      ['npm install express', 'Add a package to dependencies (and node_modules/).'],
      ['npm install -D eslint', 'Add a development-only package.'],
      ['npm install', 'Install everything package.json lists.'],
      ['npm uninstall express', 'Remove a package.'],
    ], { mono: true }),
    truth([
      ['node_modules/ should be committed to Git', false, 'It is rebuilt with npm install. Add it to .gitignore.'],
      ['package-lock.json should be committed', true, 'It records exact versions, so everyone gets the same.'],
      ['devDependencies are needed in production', false, 'Only while developing.'],
    ]),
    check('Which command adds a package only for development?', ['npm install -D eslint', 'npm install eslint', 'npm add dev eslint', 'npm dev eslint'], '-D means --save-dev.', 'Which flag?', { mono: true }),
    recap([
      ['📦', 'npm installs packages from the registry'],
      ['📝', 'package.json lists packages and scripts'],
      ['🔒', 'Commit package-lock.json, never node_modules/'],
    ]),
  ]),

  lesson('n-b-3-2', 'Versions and dependencies', 7, [
    reveal('Semantic versions: MAJOR.MINOR.PATCH', [
      ['5.1.0 → 5.1.1', 'Patch: a bug fix. Safe.'],
      ['5.1.0 → 5.2.0', 'Minor: new features, nothing broken.'],
      ['5.1.0 → 6.0.0', 'Major: may break your code.'],
    ], { mono: true }),
    matchUp('What can npm install?', [['"^5.1.0"', '5.x.x, at least 5.1.0'], ['"~5.1.0"', '5.1.x only'], ['"5.1.0"', 'Exactly 5.1.0'], ['"latest"', 'Whatever is newest']], '^ allows minor updates; ~ only patches.'),
    reveal('Keeping packages healthy', [
      ['npm outdated', 'Lists packages with newer versions.'],
      ['npm update', 'Updates within the allowed ranges.'],
      ['npm audit', 'Checks for known security problems.'],
      ['Fewer is better', 'Every package is code you trust. Check it is maintained.'],
    ], { mono: true }),
    tapbug('An update broke the app overnight', ['"dependencies": {', '  "express": "*"', '}'], [[2, '"*"', '"^5.1.0"']], '"*" allows any version, even a new major one. Use ^ with a known version.'),
    check('With "^5.1.0", can npm install 6.0.0?', ['No: ^ stays within major version 5', 'Yes, it is newer', 'Only with npm update', 'Only on Fridays'], 'Major changes may break code.', 'What does ^ allow?'),
    recap([
      ['🔢', 'MAJOR.MINOR.PATCH'],
      ['^', '^ allows minor and patch updates; ~ only patches'],
      ['🛡', 'npm audit, npm outdated, and few packages'],
    ]),
  ]),

  lesson('n-b-3-3', 'Scripts and npx', 7, [
    chat(['Scripts give long commands short names. npm run dev runs the "dev" script; start and test can skip the run.', 'npx runs a package’s command without installing it for good, like npx create-next-app.']),
    explore('The scripts in package.json', PKG.slice(4, 9), [
      [2, 'npm start runs node app.js.'],
      [3, 'npm run dev restarts on every save.'],
      [4, 'npm test runs the tests with node --test.'],
    ]),
    explore('npm start, in the terminal', HELLO, [
      [4, 'npm start ran the "start" script: node app.js.'],
    ], { page: prog(HELLO, { command: 'npm start' }) }),
    matchUp('Which command?', [['Run the "dev" script', 'npm run dev'], ['Run the "start" script', 'npm start'], ['Run a tool once without installing', 'npx'], ['Run the tests', 'npm test']], 'start and test don’t need run.'),
    check('How do you run a script named "seed"?', ['npm run seed', 'npm seed', 'node seed', 'npx seed.js'], 'Only start, test and a few others work without run.', 'Which word is needed?', { mono: true }),
    recap([
      ['📜', 'Scripts name commands in package.json'],
      ['▶', 'npm run name (start and test without run)'],
      ['🚀', 'npx runs a package’s command once'],
    ]),
  ]),

  challenge('n-b-3-ch', 'Module 3 Challenge', { icon: '📦', name: 'Package Pro' }, ['Set up package.json', 'Install packages and choose versions', 'Run scripts and npx'], [
    mcq(1, 'Which file lists a project’s packages and scripts?', ['package.json', 'node_modules', 'index.js', '.env'], 'The project’s description.', { mono: true }),
    mcq(2, 'What should .gitignore always include?', ['node_modules/', 'package.json', 'app.js', 'README.md'], 'It is rebuilt by npm install.', { mono: true }),
    mcq(3, 'In 5.1.0, which number changes for a breaking change?', ['5', '1', '0', 'None'], 'The major version.'),
    mcq(4, 'Which command checks for known security problems?', ['npm audit', 'npm check', 'npm secure', 'npm test'], 'Then update.', { mono: true }),
    mcq(5, 'How do you run the "dev" script?', ['npm run dev', 'npm dev', 'node dev', 'npx dev'], 'With run.', { mono: true }),
    swipe([
      ['package-lock.json should be committed', true, 'Same versions for everyone.'],
      ['~1.2.3 allows 1.3.0', false, 'Only 1.2.x.'],
      ['devDependencies are for tools like linters and tests', true, 'Not needed to run the app.'],
      ['npx installs a package for good', false, 'It runs it once.'],
    ]),
    pairs([['npm init -y', 'New package.json'], ['npm install -D', 'Development package'], ['npm outdated', 'Newer versions'], ['npx', 'Run once']], 'npm commands.'),
    pickCode('Which version range allows bug fixes only?', ['"~5.1.0"', '"^5.1.0"', '"*"', '"latest"'], '~ keeps the minor version.'),
    bugTask(['"express": "*"', '$ git add node_modules'], [[1, '"*"', '"^5.1.0"'], [2, 'git add node_modules', 'echo node_modules/ >> .gitignore']], 'Pin a range, and keep node_modules out of Git.'),
    xray('<div class="c">$ npm start</div><div class="o">Welcome to Rosa’s Café</div>', [
      ['.c', 'The command', '"start": "node app.js"', ['"start": "node app.js"', 'console.log', '"test": "node --test"']],
      ['.o', 'The welcome line', 'console.log', ['"start": "node app.js"', 'console.log', '"test": "node --test"']],
    ]),
    arrange(['const cafe = "Rosa’s Café";', 'const open = 8;', 'console.log(cafe + " opens at " + open + " am");'], 'the name, the hour, then print', { command: 'npm start' }),
  ]),
];
