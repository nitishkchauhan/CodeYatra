// JavaScript track · Module 1 · Getting Started.
import type { Lesson } from '../../types';
import { UI } from './cafe';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, tapPage, toggle } from './kit';

const COUNTER_JS = `let teas = 0;
document.querySelector("#add").addEventListener("click", () => {
  teas = teas + 1;
  document.querySelector("#n").textContent = teas;
  console.log("Teas: " + teas);
});`;

export const JS_M1: Lesson[] = [
  lesson('js-1-1', 'What is JavaScript?', 4, [
    chat(['HTML builds Rosa’s order page. CSS makes it look good. But tap “Add tea” and… nothing happens.', 'JavaScript is the part that does things: it reacts, counts, checks and changes the page while you use it.']),
    tapPage('A button that works', 'Tap “Add tea” three times.', { html: '<p>Teas ordered: <b id="n">0</b></p>\n<button id="add">Add tea</button>', css: UI, js: COUNTER_JS }, 'Teas: 3', [{ click: '#add' }, { click: '#add' }, { click: '#add' }], 'Six lines of JavaScript: remember a number, listen for taps, add one, show it.'),
    reveal('Three languages, three jobs', [
      ['HTML', 'The content: a heading, a price, a button.', '🧱'],
      ['CSS', 'The look: colours, sizes, layout.', '🎨'],
      ['JavaScript', 'The behaviour: what happens when you tap, type or wait.', '⚙️'],
    ]),
    reveal('Where JavaScript runs', [
      ['In every browser', 'Almost every website you use runs JavaScript on your phone.', '🌐'],
      ['On servers', 'Node.js runs JavaScript on the computers that answer apps (the Node track).', '🖥'],
      ['In apps', 'Many phone apps, this one included, are written in JavaScript.', '📱'],
    ]),
    check('Which language makes a button do something when it is tapped?', ['JavaScript', 'HTML', 'CSS'], 'Behaviour is JavaScript’s job.', 'HTML is content and CSS is the look.', { mono: false }),
    recap([
      ['⚙️', 'JavaScript adds behaviour to a page'],
      ['🧱', 'HTML content, CSS look, JS behaviour'],
      ['🌐', 'It runs in browsers, on servers and in apps'],
    ]),
  ]),

  lesson('js-1-2', 'Where JavaScript goes', 5, [
    reveal('Three places for a script', [
      ['Inside the page', '<script> … </script>, usually at the end of <body>.', '📄'],
      ['In its own file', '<script src="app.js"></script>: one file shared by many pages.', '🗂'],
      ['defer', '<script src="app.js" defer> in the <head>: downloads early, runs once the page is built.', '⏱'],
    ]),
    explore('A page with a script', ['<body>', '  <h1 id="title">Rosa’s Café</h1>', '  <script>', '    document.querySelector("#title").textContent = "Rosa’s Café is open!";', '  </script>', '</body>'], [
      [2, 'The heading is written as “Rosa’s Café”.', 'h1'],
      [3, 'The browser reads top to bottom. When it reaches the script, it runs it.'],
      [4, 'The script finds the heading and changes its text. It works because the heading is above it, already built.', 'h1'],
    ], { page: { html: '<h1 id="title">Rosa’s Café</h1>', js: 'document.querySelector("#title").textContent = "Rosa’s Café is open!";' }, minTaps: 3 }),
    toggle('Script after or before?', [
      ['After the heading', ['<h1 id="title">Rosa’s Café</h1>', '<script> …textContent = "Open!" </script>'], 'The heading exists, so the script finds it and changes it.', { html: '<h1 id="title">Rosa’s Café</h1><script>document.querySelector("#title").textContent = "Open!";</script>' }],
      ['Before the heading', ['<script> …textContent = "Open!" </script>', '<h1 id="title">Rosa’s Café</h1>'], 'The script runs before the heading exists, finds nothing and stops with an error. The heading never changes. That’s why scripts go at the end, or use defer.', { html: '<script>document.querySelector("#title").textContent = "Open!";</script><h1 id="title">Rosa’s Café</h1>' }],
    ]),
    matchUp('Which is which?', [['<script> … </script>', 'Code inside the page'], ['<script src="app.js">', 'Code in its own file'], ['defer', 'Run once the page is built']], 'Inline scripts, external files, and defer to wait for the page.'),
    tapbug('The script never loads', ['<script href="app.js"></script>'], [[1, 'href', 'src']], 'Scripts load with src, like images. href is for links and stylesheets.'),
    recap([
      ['📄', '<script> can sit in the page'],
      ['🗂', 'Or in a .js file with src'],
      ['⏱', 'Put it at the end of body, or use defer'],
    ]),
  ]),

  lesson('js-1-3', 'Showing output', 5, [
    run('console.log', 'Pick what to log. The console shows the result.', ['console.log({{v}});'], ['"Hello from Rosa’s Café"', '2 + 3', '"2" + "3"', '40 * 3'], { caption: 'Text in quotes prints as it is. Maths without quotes is worked out first. "2" + "3" joins two pieces of text.' }),
    toggle('Three ways to show something', [
      ['console.log', ['console.log("Order ready");'], 'For developers: it shows in the console, not on the page. Your best friend for finding bugs.', { html: '<p>The page doesn’t change.</p>', js: 'console.log("Order ready");' }],
      ['textContent', ['document.querySelector("#msg")', '  .textContent = "Order ready";'], 'Changes the text on the page itself, for visitors to see.', { html: '<p id="msg">Waiting…</p>', js: 'document.querySelector("#msg").textContent = "Order ready";' }],
      ['alert', ['alert("Order ready");'], 'A pop-up box that blocks the page until it is closed. Annoying, so real sites rarely use it.', { html: '<p>(A pop-up box would appear here.)</p>' }],
    ]),
    run('Hit the target', 'Pick the line that prints “Total: ₹120”.', ['const tea = 40;', 'console.log({{v}});'], ['"Total: ₹" + tea', '"Total: ₹tea * 3"', '"Total: ₹" + tea * 3'], { goal: 'Total: ₹120' }),
    check('Who sees a console.log message?', ['Developers, in the console', 'Every visitor, on the page', 'Nobody, it is ignored'], 'console.log is for people building the page.', 'It isn’t on the page itself.', { mono: false }),
    tapbug('Nothing prints', ['console.log("Order ready";'], [[1, '";', '");']], 'Every ( needs its ). The closing bracket is missing, so the line is a syntax error.'),
    recap([
      ['🖥', 'console.log for developers'],
      ['📝', 'textContent changes the page'],
      ['🚫', 'alert exists, but blocks the page'],
    ]),
  ]),

  lesson('js-1-4', 'Statements and syntax', 5, [
    explore('A tiny program', ['// Rosa’s order counter', 'let teas = 2;', 'teas = teas + 1;', 'console.log("Teas:", teas);'], [
      [1, 'A comment: a note for people. The computer skips it.'],
      [2, 'A statement: one instruction. This one makes a box called teas holding 2. It ends with a semicolon.'],
      [3, 'Take what is in teas, add 1, and put it back.'],
      [4, 'console.log prints its values with a space between them: Teas: 3.', 'p'],
    ], { page: { html: '<p>Console: Teas: 3</p>' }, minTaps: 3 }),
    reveal('Rules of the language', [
      ['Case matters', 'console.log works; Console.log doesn’t.'],
      ['Semicolons', 'End each statement with ;. JavaScript often adds them for you, but write them.'],
      ['Names', 'Letters, digits, _ and $, not starting with a digit: teaCount, not 2teas.'],
      ['Comments', '// for one line, /* … */ for several lines.'],
    ], { mono: true }),
    predict('Run it line by line', ['let teas = 2;', 'teas = teas + 1;', 'console.log("Teas:", teas);'], [
      [2, 'What will teas be after this line?', ['3', '2', '"21"'], '2 + 1 is 3, stored back in teas.', { var: 'teas' }],
      [3, 'What will it print?', ['Teas: 3', 'Teas: teas', 'Teas:3'], 'console.log puts a space between its values and prints the value of teas.', { out: true }],
    ]),
    check('Which name is allowed?', ['teaCount', '2teas', 'tea count', 'tea-count'], 'Names can’t start with a digit or contain spaces or hyphens.', 'Look for spaces, hyphens and leading digits.'),
    tapbug('Nothing prints', ['Console.log("Hi");'], [[1, 'Console', 'console']], 'JavaScript is case-sensitive: it’s console, all lower case.'),
    recap([
      ['📜', 'A program is statements, run top to bottom'],
      ['🔠', 'Case matters; end statements with ;'],
      ['💬', '// and /* */ are comments'],
    ]),
  ]),

  challenge('js-1-ch', 'Module 1 Challenge', { icon: '🟨', name: 'First Script' }, ['Explain what JavaScript does on a page', 'Add a script in the right place', 'Show output and read simple statements'], [
    mcq(1, 'What is JavaScript’s job on a web page?', ['Behaviour: reacting and changing things', 'The content', 'The colours and fonts', 'Storing the page on the server'], 'HTML is content, CSS is look, JavaScript is behaviour.'),
    mcq(2, 'Which tag loads JavaScript from a file?', ['<script src="app.js"></script>', '<link href="app.js">', '<js src="app.js">', '<script href="app.js">'], 'Scripts use src.', { mono: true }),
    mcq(3, 'Why put a script at the end of the body?', ['So the elements it uses already exist', 'So it loads slower', 'Because the head is full', 'It must go there by law'], 'The browser builds the page top to bottom.'),
    mcq(4, 'What does console.log("2" + "3") print?', ['23', '5', '"5"', 'Error'], 'Two pieces of text joined.', { mono: true }),
    mcq(5, 'Which is a comment in JavaScript?', ['// order counter', '<!-- order counter -->', '# order counter', '** order counter'], '// for one line.', { mono: true }),
    swipe([
      ['JavaScript is case-sensitive', true, 'console and Console are different.'],
      ['alert is the best way to show messages', false, 'It blocks the page. Use the page itself, or the console.'],
      ['defer runs a script after the page is built', true, 'Even if it is in the head.'],
      ['A comment runs like normal code', false, 'The computer skips it.'],
    ]),
    pairs([['console.log', 'Message for developers'], ['textContent', 'Change text on the page'], ['<script>', 'Holds JavaScript'], ['//', 'A one-line comment']], 'The first tools of JavaScript.'),
    pickCode('Which line prints Ready in the console?', ['console.log("Ready");', 'console.log(Ready);', 'Console.Log("Ready");', 'print("Ready");'], 'console.log, lower case, with the text in quotes.'),
    bugTask(['<script href="menu.js"></script>', '<script>', '  console.log("Menu ready"', '</script>'], [[1, 'href', 'src'], [3, '"Menu ready"', '"Menu ready")']], 'Scripts load with src, and every ( needs its ).'),
    predictTask(['let cups = 3;', 'cups = cups + 2;', 'console.log("Cups:", cups);'], 'What does it print?', ['Cups: 5', 'Cups: 3', 'Cups: 32', 'Cups: cups'], 'cups becomes 3 + 2 = 5 before it is printed.'),
    arrange(['let teas = 0;', 'teas = teas + 2;', 'console.log("Teas:", teas);'], 'make a teas box, add 2, then print it', ['Teas: 2']),
  ]),
];
