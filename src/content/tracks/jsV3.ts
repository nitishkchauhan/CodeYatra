// JavaScript, Lesson v3, Basic level, built from the owner-approved draft (project-docs/content-drafts/js-basic.md).
// Every module makes Riya’s Tiffins do something; the project makes the Sharma Classes page work.
// Modules 1–10 run plain JavaScript (traced line by line in "See it run"); 11–12 and the project build real
// pages in the web editor, with fetch answered by the app's practice server (src/lib/web/page.ts).
import { group, hook, lesson, match, mistake, pageBuild, quiz, read, scenario, traceJs, tryIt } from '../dsl';
import type { EditorStep, Lesson, Reading, TraceStep, WebStep } from '../types';

const LEARN = (n: number) => `LEARN · ${n} OF 3`;
const CHECK = 'QUICK CHECK';
const OOPS = 'COMMON MISTAKE';
const RUN = 'SEE IT RUN';
const BUILD = 'SEE IT BUILD';
const REVIEWED = '2026-10-27';

const js = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: 'BUILD IT · JAVASCRIPT', lang: 'javascript', ...o });
const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'BUILD IT · JAVASCRIPT', ...o });
const mdn = (title: string, page: string): Reading => ({ title, url: `https://developer.mozilla.org/en-US/docs/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'MDN' });
const play = (title: string, instructions: string, file: string, starter: string, ideas: string[]) => tryIt({ kicker: 'TRY IT', title, instructions, lang: 'javascript', file, starter, ideas });
const playPage = (title: string, instructions: string, files: { html: string; css?: string; js: string }, ideas: string[]) =>
  tryIt({ kicker: 'TRY IT', title, instructions, lang: 'web', file: 'app.js', starter: files.html, files, ideas });
const run = (o: Omit<TraceStep, 'type' | 'lang' | 'kicker'>) => traceJs({ kicker: RUN, ...o });
const mod = (id: string, title: string, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[], minutes = 8): Lesson => ({
  ...lesson(id, title, 'js', learned, steps, minutes),
  level: 'basic',
  reading,
});
const lines = (s: string) => s.replace(/\n$/, '').split('\n');

// 1 ─────────────────────────────────────────────
const M1 = mod('j-var-1', 'What is JavaScript? Variables and values', ['JavaScript makes pages do things: HTML is structure, CSS is looks', 'const for values that never change, let for ones that do', 'Template literals put values inside text: `₹${price}`'], [
  hook({ kicker: 'MODULE 1 · JAVASCRIPT', title: 'Make the button work', story: 'Riya’s menu page looks great now, but tap “Add to order” and nothing happens. HTML is the structure, CSS is the looks, and JavaScript is what makes a page do things. Today you write your first lines of it.', goal: 'Store values in variables and print a message.', lang: 'javascript', code: ['const shop = "Riya’s Tiffins";', 'let orders = 0;', 'orders = orders + 1;', 'console.log(`${shop}: ${orders} order`);'] }),
  read({ kicker: LEARN(1), title: 'What is JavaScript?', body: 'JavaScript is a programming language that runs inside every web browser. It reacts to taps, changes the page, does maths and talks to servers. It is the only programming language every browser understands, so every interactive website uses it.', lang: 'javascript', code: ['console.log("Hello from Riya’s Tiffins");'], anim: 'htmlTags' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Every button that does something: “Add to cart” on Flipkart, live cricket scores, the seat map on IRCTC, dragging Google Maps. JavaScript also runs servers (Node.js) and phone apps, including this one.', anim: 'domTree' }),
  read({ kicker: LEARN(3), title: 'Variables and values', body: 'A variable is a named box for a value. Use const for values that never change and let for ones that do. Values have types: number (80), string ("Poha"), boolean (true), null and undefined. Backticks make a template literal: ${…} puts a value inside text.', lang: 'javascript', code: ['const shop = "Riya’s Tiffins";', 'let orders = 0;', 'orders = orders + 1;', 'console.log(`${shop} has ${orders} order`);'], anim: 'variable' }),
  play('Riya’s first order', 'Tap a value to change it, then run it.', 'order.js', 'const dish = "Dal rice";\nconst price = 80;\nlet plates = 2;\nconsole.log(`${plates} × ${dish} = ₹${plates * price}`);\nconsole.log(typeof price, typeof dish);\n', ['Make price "80" (in quotes). What does typeof say now?', 'Change plates to 5. Which line changes?']),
  run({ title: 'Watch the boxes fill', instructions: 'Tap Next line. Watch each variable appear and change, and the message print.', code: ['const shop = "Riya’s Tiffins";', 'let orders = 0;', 'orders = orders + 1;', 'orders = orders + 1;', 'console.log(`${shop} has ${orders} orders`);'], ask: { prompt: 'What is orders at the end?', options: ['2', '1', '0', '"orders"'], answer: 0, explain: 'orders started at 0 and had 1 added twice.', check: { var: 'orders' } } }),
  mistake({ kicker: OOPS, title: 'Changing a const', lang: 'javascript', wrong: ['const orders = 0;', 'orders = 1;', 'console.log(orders);'], error: 'TypeError: Assignment to constant variable.', right: ['let orders = 0;', 'orders = 1;', 'console.log(orders);'], explain: 'A const can never be given a new value. If it will change, declare it with let.' }),
  match({ kicker: CHECK, title: 'Match each piece', instructions: 'Tap a piece of code, then what it is.', pairs: [['const', 'a name that is never reassigned'], ['let', 'a name whose value can change'], ['"80"', 'a string (text)'], ['80', 'a number'], ['`₹${price}`', 'a value inside text']], mono: true, explain: 'const by default, let when it changes; quotes make text.' }),
  quiz({ prompt: 'What does console.log(`Total: ${2 * 80}`) print?', options: ['Total: 160', 'Total: 2 * 80', 'Total: ${160}', 'An error'], right: 'Right. ${…} works out the sum and puts the answer in the text.', wrong: 'Inside backticks, ${…} is worked out first: 2 × 80 = 160.', mono: true }),
  js({
    title: 'A receipt line',
    instructions: 'receipt(dish, plates, price) returns text like "2 × Dal rice = ₹160". Work out the total, then use a template literal.',
    file: 'receipt.js',
    starter: 'function receipt(dish, plates, price) {\n  return dish;\n}\n',
    tests: [
      { call: 'receipt("Dal rice", 2, 80)', expect: '"2 × Dal rice = ₹160"' },
      { call: 'receipt("Poha", 3, 30)', expect: '"3 × Poha = ₹90"' },
    ],
    hint: 'const total = plates * price; then return `${plates} × ${dish} = ₹${total}`;',
    solution: 'function receipt(dish, plates, price) {\n  const total = plates * price;\n  return `${plates} × ${dish} = ₹${total}`;\n}\n',
  }),
], [mdn('let', 'Web/JavaScript/Reference/Statements/let'), mdn('JavaScript data types', 'Web/JavaScript/Guide/Data_structures'), mdn('Template literals', 'Web/JavaScript/Reference/Template_literals')]);

// 2 ─────────────────────────────────────────────
const M2 = mod('j-ops-1', 'Operators and comparisons', ['Maths with + - * / % and **; + joins text, so convert first', 'Compare with === and !==, which check the type too', 'Falsy values: 0, "", null, undefined, NaN and false'], [
  hook({ kicker: 'MODULE 2 · JAVASCRIPT', title: 'Why ₹280 for two plates?', story: 'A customer typed 2 plates into Riya’s form and the bill said ₹280, because "2" + 80 gives "280". Text from a form is always text. Today: how operators work, and how to stop that bug.', goal: 'Do sums, compare values safely, and know what counts as false.', lang: 'javascript', code: ['const plates = Number("2");', 'console.log(plates * 80);   // 160'] }),
  read({ kicker: LEARN(1), title: 'What are operators?', body: 'Operators are symbols that work on values. Maths: + - * / % (remainder) and ** (power). Comparison: === !== < > <= >=. Logic: && (and), || (or), ! (not). Careful: + also joins text, so "2" + 80 is "280".', lang: 'javascript', code: ['console.log(7 % 2);        // 1', 'console.log("2" + 80);     // 280'], anim: 'math' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Every bill and discount, every “Free delivery over ₹500” banner, every password-strength meter and “Only 3 left!” label is made of operators: a sum, then a comparison that decides what to show.', anim: 'branch' }),
  read({ kicker: LEARN(3), title: '=== and falsy values', body: '=== checks the value and the type, so 2 === "2" is false. == quietly converts first, which hides bugs, so always use ===. In an if, falsy values count as false: 0, "", null, undefined, NaN and false. Everything else is truthy.', lang: 'javascript', code: ['console.log(2 === "2");   // false', 'console.log(Number("2") === 2);   // true'], anim: 'strictEqual' }),
  play('Riya’s bill', 'Tap a number or an operator, then run it.', 'bill.js', 'const plates = Number("2");\nconst bill = plates * 80;\nconsole.log(bill);\nconsole.log(bill >= 150 && bill < 500);\nconsole.log(2 === "2", 7 % 2);\n', ['Remove Number( … ) around "2". What is the bill now?', 'What does 10 % 3 give? What could % tell you?']),
  run({ title: 'Text or number?', instructions: 'Tap Next line and watch wrong and bill get their values.', code: ['const typed = "2";', 'const wrong = typed + 80;', 'const plates = Number(typed);', 'const bill = plates * 80;', 'console.log(wrong, bill);'], ask: { prompt: 'What is wrong?', options: ['"280"', '82', '160', '"2 + 80"'], answer: 0, explain: 'typed is text, so + joins: "2" and 80 become "280".', check: { var: 'wrong' } } }),
  mistake({ kicker: OOPS, title: 'Adding text from a form', lang: 'javascript', wrong: ['const plates = "2";', 'console.log(plates + 80);'], error: '280', right: ['const plates = Number("2");', 'console.log(plates + 80);'], explain: 'Form inputs give text. Turn it into a number with Number(…) before doing sums.' }),
  group({ kicker: CHECK, title: 'Falsy or truthy?', instructions: 'Which values count as false in an if?', groups: ['Falsy (counts as false)', 'Truthy (counts as true)'], items: [
    { text: '0', group: 0 },
    { text: '"0"', group: 1 },
    { text: '""', group: 0 },
    { text: '" "', group: 1 },
    { text: 'null', group: 0 },
    { text: '[]', group: 1 },
  ], explain: 'Only 0, "", null, undefined, NaN and false are falsy. "0", " " and [] are truthy: a classic surprise.' }),
  quiz({ prompt: '5 === "5" is…', options: ['false', 'true', '"5"', 'An error'], right: 'Right. One is a number and one is text, so === says false.', wrong: '=== checks the type too: number 5 is not text "5".', mono: true }),
  js({
    title: 'A safe bill',
    instructions: 'bill(platesText, price) turns the typed text into a number and returns the bill. isFree(total) is true when the total is ₹500 or more.',
    file: 'bill.js',
    starter: 'function bill(platesText, price) {\n  return platesText + price;\n}\nfunction isFree(total) {\n  return false;\n}\n',
    tests: [
      { call: 'bill("2", 80)', expect: '160' },
      { call: 'bill("3", 30)', expect: '90' },
      { call: 'isFree(500)', expect: 'true' },
      { call: 'isFree(499)', expect: 'false' },
    ],
    hint: 'const plates = Number(platesText); return plates * price; and return total >= 500;',
    solution: 'function bill(platesText, price) {\n  const plates = Number(platesText);\n  return plates * price;\n}\nfunction isFree(total) {\n  return total >= 500;\n}\n',
  }),
], [mdn('Expressions and operators', 'Web/JavaScript/Guide/Expressions_and_operators'), mdn('Equality comparisons', 'Web/JavaScript/Guide/Equality_comparisons_and_sameness'), mdn('Truthy', 'Glossary/Truthy')]);

// 3 ─────────────────────────────────────────────
const FEE = 'const bill = 420;\nconst km = 5;\nlet fee;\nif (bill >= 500) {\n  fee = 0;\n} else if (km <= 3) {\n  fee = 30;\n} else {\n  fee = 60;\n}\nconst label = fee === 0 ? "Free delivery" : `Delivery ₹${fee}`;\nconsole.log(label);\n';
const M3 = mod('j-cond-1', 'Decisions: if, else and switch', ['if / else if / else runs exactly one branch', 'The ternary a ? b : c picks between two values', 'switch compares one value with many fixed cases; end each with break'], [
  hook({ kicker: 'MODULE 3 · JAVASCRIPT', title: 'Free, ₹30 or ₹60?', story: 'Riya’s delivery is free above ₹500, ₹30 within 3 km, and ₹60 further away. The code has to choose, every time someone orders.', goal: 'Make your code choose what to do.', lang: 'javascript', code: ['if (bill >= 500) fee = 0;', 'else if (km <= 3) fee = 30;', 'else fee = 60;'] }),
  read({ kicker: LEARN(1), title: 'What is a decision?', body: 'if runs a block only when its condition is true. else if tries another condition. else catches everything left. JavaScript checks them in order and runs only the first branch that matches.', lang: 'javascript', code: ['if (bill >= 500) {', '  fee = 0;', '} else {', '  fee = 60;', '}'], anim: 'branch' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: '“Out of stock” labels, age checks, showing “Log in” or your name, choosing which error a UPI app shows. Any time a page or app behaves differently for different people or situations, there is an if.', anim: 'branch' }),
  read({ kicker: LEARN(3), title: 'Ternary and switch', body: 'The ternary condition ? a : b picks one of two values in one line. switch compares one value with many fixed cases, like the day of the week; end each case with break, or it runs into the next one.', lang: 'javascript', code: ['const label = fee === 0 ? "Free" : `₹${fee}`;', 'switch (day) {', '  case "Sun": menu = "Thali"; break;', '  default: menu = "Dal rice";', '}'], anim: 'branch' }),
  play('Riya’s delivery fee', 'Tap the bill or the distance, then run it.', 'fee.js', FEE, ['Make the bill 650. Which branch runs?', 'Make km 2 with a bill of 420.']),
  run({ title: 'Which branch runs?', instructions: 'Tap Next line. Watch the checks skip the branches that don’t match.', code: lines(FEE), ask: { prompt: 'What is fee at the end?', options: ['60', '30', '0', 'undefined'], answer: 0, explain: '420 is under 500 and 5 km is over 3, so only else runs.', check: { var: 'fee' } } }),
  mistake({ kicker: OOPS, title: 'One = in a condition', lang: 'javascript', wrong: ['let bill = 420;', 'if (bill = 500) {', '  console.log("Free delivery");', '}', 'console.log(bill);'], error: 'Free delivery\n500', right: ['let bill = 420;', 'if (bill === 500) {', '  console.log("Free delivery");', '}', 'console.log(bill);'], explain: 'One = puts 500 into bill (and 500 is truthy). To compare, use ===.' }),
  match({ kicker: CHECK, title: 'Match each part', instructions: 'Tap a keyword, then its job.', pairs: [['if', 'the first test'], ['else if', 'another test'], ['else', 'everything else'], ['? :', 'pick one of two values'], ['switch', 'many fixed cases']], mono: true, explain: 'Only one branch of an if / else if / else chain runs.' }),
  quiz({ prompt: 'With bill = 500, what is bill > 500 ? "free" : "paid"?', options: ['"paid"', '"free"', 'undefined', '500'], right: 'Right. 500 is not greater than 500, so the ternary picks "paid".', wrong: '> means strictly greater; 500 > 500 is false, so it’s "paid".', mono: true }),
  js({
    title: 'The delivery fee',
    instructions: 'deliveryFee(bill, km) returns 0 when the bill is ₹500 or more, 30 when km is 3 or less, and 60 otherwise.',
    file: 'fee.js',
    starter: 'function deliveryFee(bill, km) {\n  return 60;\n}\n',
    tests: [
      { call: 'deliveryFee(650, 8)', expect: '0' },
      { call: 'deliveryFee(420, 2)', expect: '30' },
      { call: 'deliveryFee(420, 5)', expect: '60' },
    ],
    hint: 'if (bill >= 500) return 0; else if (km <= 3) return 30; else return 60;',
    solution: 'function deliveryFee(bill, km) {\n  if (bill >= 500) {\n    return 0;\n  } else if (km <= 3) {\n    return 30;\n  } else {\n    return 60;\n  }\n}\n',
  }),
], [mdn('if...else', 'Web/JavaScript/Reference/Statements/if...else'), mdn('switch', 'Web/JavaScript/Reference/Statements/switch')]);

// 4 ─────────────────────────────────────────────
const M4 = mod('w-js-1', 'Loops: for, for…of and while', ['for (let i = 0; i < n; i++) counts', 'for…of visits every item of a list', 'while repeats until something changes; break stops, continue skips'], [
  hook({ kicker: 'MODULE 4 · JAVASCRIPT', title: 'Twelve dishes, three lines', story: 'Riya’s menu has 12 dishes. Printing each by hand is 12 lines, and every new dish means editing code. A loop does it in three lines, for any number of dishes.', goal: 'Repeat code for every item, or a set number of times.', lang: 'javascript', code: ['for (const dish of dishes) {', '  console.log(dish);', '}'] }),
  read({ kicker: LEARN(1), title: 'What is a loop?', body: 'A loop is code that repeats. for counts a set number of times. for…of runs once for every item in a list. while keeps going until its condition becomes false.', lang: 'javascript', code: ['for (let i = 3; i > 0; i--) {', '  console.log(i);', '}'], anim: 'loop' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Showing every product in a shop, every message in a chat, a countdown timer, adding up a cart, retrying a failed payment three times. Whenever there is a list, there is a loop.', anim: 'list' }),
  read({ kicker: LEARN(3), title: 'for…of, while, break', body: 'for…of gives you each item in turn, with no counting. while repeats as long as its condition is true, so something inside must change it. break stops a loop early; continue skips to the next round.', lang: 'javascript', code: ['let tries = 0;', 'while (tries < 3) {', '  tries++;', '}'], anim: 'whileLoop' }),
  play('Riya’s menu', 'Tap a dish or a number, then run it.', 'menu.js', 'const dishes = ["Dal rice", "Poha", "Thali"];\nfor (const dish of dishes) {\n  console.log(dish);\n}\nfor (let i = 3; i > 0; i--) {\n  console.log(`Ready in ${i}`);\n}\n', ['Add "Rajma chawal" to the list.', 'Start the countdown at 5.']),
  run({ title: 'Adding up the cart', instructions: 'Tap Next line. Watch p take each price and total grow.', code: ['const prices = [80, 30, 120];', 'let total = 0;', 'for (const p of prices) {', '  total = total + p;', '}', 'console.log("Total:", total);'], ask: { prompt: 'What is total at the end?', options: ['230', '120', '80', '0'], answer: 0, explain: '0 + 80 + 30 + 120 = 230: one addition for each price.', check: { var: 'total' } } }),
  mistake({ kicker: OOPS, title: 'One round too many', lang: 'javascript', wrong: ['const dishes = ["Poha", "Thali"];', 'for (let i = 0; i <= dishes.length; i++) {', '  console.log(`Dish: ${dishes[i]}`);', '}'], error: 'Dish: Poha\nDish: Thali\nDish: undefined', right: ['const dishes = ["Poha", "Thali"];', 'for (let i = 0; i < dishes.length; i++) {', '  console.log(`Dish: ${dishes[i]}`);', '}'], explain: 'Lists count from 0, so the last item is at length − 1. Use <, or simply for…of.' }),
  match({ kicker: CHECK, title: 'Match each loop word', instructions: 'Tap a word, then its job.', pairs: [['for', 'count a set number of times'], ['for…of', 'once for every item'], ['while', 'until a condition changes'], ['break', 'stop the loop now'], ['continue', 'skip to the next round']], mono: true, explain: 'Pick the loop that says what you mean.' }),
  quiz({ prompt: 'How many times does for (let i = 0; i < 4; i++) run?', options: ['4', '3', '5', 'Forever'], right: 'Right. i is 0, 1, 2 and 3; at 4 the condition is false.', wrong: 'It runs for i = 0, 1, 2, 3: four times.', mono: true }),
  js({
    title: 'Cheap dishes',
    instructions: 'countUnder(prices, limit) returns how many prices are below limit. Use for…of and an if.',
    file: 'count.js',
    starter: 'function countUnder(prices, limit) {\n  return 0;\n}\n',
    tests: [
      { call: 'countUnder([80, 30, 120], 100)', expect: '2' },
      { call: 'countUnder([150, 200], 100)', expect: '0' },
      { call: 'countUnder([], 100)', expect: '0' },
    ],
    hint: 'let count = 0; for (const p of prices) { if (p < limit) count++; } return count;',
    solution: 'function countUnder(prices, limit) {\n  let count = 0;\n  for (const p of prices) {\n    if (p < limit) count++;\n  }\n  return count;\n}\n',
  }),
], [mdn('Loops and iteration', 'Web/JavaScript/Guide/Loops_and_iteration')]);

// 5 ─────────────────────────────────────────────
const M5 = mod('j-fn-1', 'Functions, scope and closures', ['function name(params) { return … } is written once, used everywhere', 'A variable made inside { } exists only there (scope)', 'A closure is a function that remembers the variables around it'], [
  hook({ kicker: 'MODULE 5 · JAVASCRIPT', title: 'Write it once', story: 'The bill maths is copied in four places on Riya’s site, and one copy has a bug. A function is written once and used everywhere: fix it once, and it’s fixed everywhere.', goal: 'Write functions that take inputs and give back answers.', lang: 'javascript', code: ['function billFor(plates, price) {', '  return plates * price;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is a function?', body: 'A function is a named, reusable block of code. It takes inputs, called parameters, and gives back an answer with return. You call it by name with brackets: billFor(2, 80). Default values fill in missing inputs.', lang: 'javascript', code: ['function billFor(plates, price = 80) {', '  return plates * price;', '}', 'console.log(billFor(2));   // 160'], anim: 'function' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Everywhere: calculateGST(), formatPrice(), sendOTP(). Big apps are thousands of small functions, each doing one job, each tested on its own. Every button you tap runs a function.', anim: 'function' }),
  read({ kicker: LEARN(3), title: 'Scope and closures', body: 'A variable made inside { } exists only inside it: that is its scope. A function made inside another function can still use the outer variables later. That is a closure, and it is how a counter can remember its count.', lang: 'javascript', code: ['function makeCounter() {', '  let count = 0;', '  return () => ++count;', '}'], anim: 'scope' }),
  play('Bills and counters', 'Tap the numbers, then run it.', 'bill.js', 'function billFor(plates, price = 80) {\n  return plates * price;\n}\nconsole.log(billFor(2));\nconsole.log(billFor(3, 30));\nfunction makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = makeCounter();\nconsole.log(next(), next(), next());\n', ['Call billFor(4) with no price. Where does 80 come from?', 'Make a second counter. Does it start from 1 again?']),
  run({ title: 'Into the function and back', instructions: 'Tap Next line. Watch plates and price appear inside the function, then the answer come back out.', code: ['function billFor(plates, price) {', '  const total = plates * price;', '  return total;', '}', 'const lunch = billFor(2, 80);', 'const snack = billFor(1, 30);', 'console.log(lunch + snack);'], ask: { prompt: 'What is lunch?', options: ['160', '30', '190', 'undefined'], answer: 0, explain: 'billFor(2, 80) returns 2 × 80 = 160, and that answer is stored in lunch.', check: { var: 'lunch' } } }),
  mistake({ kicker: OOPS, title: 'Forgetting return', lang: 'javascript', wrong: ['function billFor(plates, price) {', '  plates * price;', '}', 'console.log(`Bill: ${billFor(2, 80)}`);'], error: 'Bill: undefined', right: ['function billFor(plates, price) {', '  return plates * price;', '}', 'console.log(`Bill: ${billFor(2, 80)}`);'], explain: 'Without return, a function gives back undefined, even if it worked out the answer.' }),
  match({ kicker: CHECK, title: 'Match each word', instructions: 'Tap a word, then what it means.', pairs: [['parameter', 'the name in the definition'], ['argument', 'the value you pass in'], ['return', 'the answer it gives back'], ['scope', 'where a name exists'], ['closure', 'a function that remembers']], explain: 'Parameters receive arguments; return sends the answer back.' }),
  quiz({ prompt: 'function f(x) { x * 2 } then f(5) gives…', options: ['undefined', '10', '5', 'An error'], right: 'Right. There is no return, so the answer is thrown away.', wrong: 'No return means the function gives back undefined.', mono: true }),
  js({
    title: 'A discount maker',
    instructions: 'discount(percent) returns a function that takes a price and returns it with that percent taken off. So discount(10)(200) is 180.',
    file: 'discount.js',
    starter: 'function discount(percent) {\n  return percent;\n}\n',
    tests: [
      { call: 'discount(10)(200)', expect: '180' },
      { call: 'discount(20)(200)', expect: '160' },
      { call: 'discount(50)(90)', expect: '45' },
    ],
    hint: 'return (price) => price - (price * percent) / 100;',
    solution: 'function discount(percent) {\n  return (price) => price - (price * percent) / 100;\n}\n',
  }),
], [mdn('Functions', 'Web/JavaScript/Guide/Functions'), mdn('Closures', 'Web/JavaScript/Guide/Closures')], 9);

// 6 ─────────────────────────────────────────────
const M6 = mod('j-arr-1', 'Arrays and array methods', ['An array is an ordered list in [ ], counted from 0', 'map changes every item, filter keeps some, find gets the first match', 'reduce combines everything into one value; give it a start'], [
  hook({ kicker: 'MODULE 6 · JAVASCRIPT', title: 'The cart is a list', story: 'Riya’s cart is a list: dal rice, two rotis, a lassi. The bill needs only the prices; the “veg only” button needs only the veg dishes. Arrays have built-in tools for exactly this.', goal: 'Store lists and change, filter and total them.', lang: 'javascript', code: ['const prices = [80, 20, 40];', 'const total = prices.reduce((sum, p) => sum + p, 0);'] }),
  read({ kicker: LEARN(1), title: 'What is an array?', body: 'An array is an ordered list of values in square brackets, counted from 0: prices[0] is the first item. length tells you how many there are. push adds to the end, pop removes from the end, includes checks if something is there.', lang: 'javascript', code: ['const prices = [80, 20, 40];', 'prices.push(30);', 'console.log(prices[0], prices.length);   // 80 4'], anim: 'list' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Your chats, a playlist, search results, the items in a cart, the dishes on a menu. Most things you see as a list on a screen are an array of data underneath.', anim: 'list' }),
  read({ kicker: LEARN(3), title: 'map, filter, find, reduce', body: 'Each takes a function. map makes a new list with every item changed. filter keeps the items that pass a test. find returns the first item that passes. reduce combines all the items into one value, like a total.', lang: 'javascript', code: ['prices.map((p) => p * 2);', 'prices.filter((p) => p < 50);', 'prices.reduce((sum, p) => sum + p, 0);'], anim: 'list' }),
  play('Riya’s cart', 'Tap a number or a test, then run it.', 'cart.js', 'const prices = [80, 20, 40];\nprices.push(30);\nconsole.log(prices.map((p) => p * 2));\nconsole.log(prices.filter((p) => p < 50));\nconsole.log(prices.find((p) => p > 50));\nconsole.log(prices.reduce((sum, p) => sum + p, 0));\n', ['Change the filter to p >= 40.', 'What does find give if nothing passes? Try p > 500.']),
  run({ title: 'Filter, then total', instructions: 'Tap Next line and watch each new array or value appear.', code: ['const cart = [80, 20, 40];', 'cart.push(30);', 'const cheap = cart.filter((p) => p < 50);', 'const total = cart.reduce((sum, p) => sum + p, 0);', 'console.log(cheap, total);'], ask: { prompt: 'What is total?', options: ['170', '140', '4', '[80,20,40,30]'], answer: 0, explain: 'reduce adds every price, starting from 0: 80 + 20 + 40 + 30 = 170.', check: { var: 'total' } } }),
  mistake({ kicker: OOPS, title: 'Sorting numbers as text', lang: 'javascript', wrong: ['const prices = [100, 9, 30];', 'prices.sort();', 'console.log(prices);'], error: '[100,30,9]', right: ['const prices = [100, 9, 30];', 'prices.sort((a, b) => a - b);', 'console.log(prices);'], explain: 'sort() with nothing inside compares items as text, so "100" comes before "9". Give it a compare function for numbers.' }),
  match({ kicker: CHECK, title: 'Match each method', instructions: 'Tap a method, then what it does.', pairs: [['push', 'add to the end'], ['map', 'change every item'], ['filter', 'keep the ones that pass'], ['find', 'the first one that passes'], ['reduce', 'combine into one value']], mono: true, explain: 'map and filter make new lists; find and reduce give one value.' }),
  quiz({ prompt: 'What is [1, 2, 3].map((n) => n * 2)?', options: ['[2, 4, 6]', '[1, 2, 3]', '6', '[2]'], right: 'Right. map runs the function on every item and keeps every answer.', wrong: 'map changes each item: 1, 2, 3 become 2, 4, 6.', mono: true }),
  js({
    title: 'The veg total',
    instructions: 'vegTotal(cart) gets a list of dishes like { price: 80, veg: true } and returns the total of the veg ones. Use filter, then reduce.',
    file: 'veg.js',
    starter: 'function vegTotal(cart) {\n  return 0;\n}\n',
    tests: [
      { call: 'vegTotal([{ price: 80, veg: true }, { price: 150, veg: false }, { price: 30, veg: true }])', expect: '110' },
      { call: 'vegTotal([{ price: 150, veg: false }])', expect: '0' },
      { call: 'vegTotal([])', expect: '0' },
    ],
    hint: 'return cart.filter((d) => d.veg).reduce((sum, d) => sum + d.price, 0);',
    solution: 'function vegTotal(cart) {\n  const veg = cart.filter((d) => d.veg);\n  return veg.reduce((sum, d) => sum + d.price, 0);\n}\n',
  }),
], [mdn('Array', 'Web/JavaScript/Reference/Global_Objects/Array'), mdn('Array.prototype.reduce()', 'Web/JavaScript/Reference/Global_Objects/Array/reduce')], 9);

// 7 ─────────────────────────────────────────────
const MENU7 = 'const menu = [\n  { dish: "Thali", price: 120 },\n  { dish: "Poha", price: 30 },\n  { dish: "Dal rice", price: 80 },\n];\nconst byPrice = (a, b) => a.price - b.price;\nmenu.sort(byPrice);\nconsole.log(menu.map((d) => d.dish));\n';
const M7 = mod('j-arrow-1', 'Arrow functions, callbacks and modules', ['(a, b) => a + b is a short way to write a function', 'A callback is a function you pass in, to be called later', 'export and import share code between files'], [
  hook({ kicker: 'MODULE 7 · JAVASCRIPT', title: 'Handing over a function', story: 'In module 6 you wrote (p) => p < 50 and gave it to filter. You handed a function to another function. That one idea runs nearly all of JavaScript: sorting, timers, and every button on every page.', goal: 'Write arrow functions and pass them as callbacks.', lang: 'javascript', code: ['const byPrice = (a, b) => a.price - b.price;', 'menu.sort(byPrice);'] }),
  read({ kicker: LEARN(1), title: 'What are they?', body: 'An arrow function is a short way to write a function: (a, b) => a + b returns a + b. A callback is a function you pass to another function, which calls it for you, later or many times. You pass it without brackets.', lang: 'javascript', code: ['const add = (a, b) => a + b;', 'setTimeout(() => console.log("Ready!"), 1000);'], anim: 'callback' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: '“When this button is tapped, run this” is a callback. So is sorting search results by price, a timer, and code that runs when data arrives. Modules split big apps into hundreds of small files.', anim: 'callback' }),
  read({ kicker: LEARN(3), title: 'Modules: export and import', body: 'A module is a file that shares some of its code with export. Another file takes it with import. Each file keeps its own names, so two files can both have a total without clashing.', lang: 'javascript', code: ['// prices.js', 'export const withGst = (p) => p * 1.05;', '// app.js', 'import { withGst } from "./prices.js";'], anim: 'module' }),
  play('Sort the menu', 'Tap a value, then run it.', 'sort.js', MENU7, ['Swap a and b in byPrice. What order do you get?', 'Add a dish that costs 50.']),
  run({ title: 'A function goes in', instructions: 'Tap Next line. Watch fn become the add function inside twice.', code: ['const add = (a, b) => a + b;', 'const twice = (fn, x) => {', '  return fn(x, x);', '};', 'const result = twice(add, 40);', 'console.log(result);'], ask: { prompt: 'What is result?', options: ['80', '40', '"4040"', 'undefined'], answer: 0, explain: 'twice calls fn(40, 40), and fn is add, so the answer is 80.', check: { var: 'result' } } }),
  mistake({ kicker: OOPS, title: 'Calling it instead of passing it', lang: 'javascript', wrong: ['const byPrice = (a, b) => a - b;', 'const prices = [80, 30];', 'prices.sort(byPrice());', 'console.log(prices);'], error: 'TypeError: The comparison function must be either a function or undefined: NaN', right: ['const byPrice = (a, b) => a - b;', 'const prices = [80, 30];', 'prices.sort(byPrice);', 'console.log(prices);'], explain: 'byPrice() runs the function straight away and passes its answer. Pass byPrice, with no brackets, so sort can call it.' }),
  group({ kicker: CHECK, title: 'Passed or called?', instructions: 'Is the function handed over, or run right now?', groups: ['Handed over (called later)', 'Run right now'], items: [
    { text: 'menu.sort(byPrice)', group: 0 },
    { text: 'menu.sort(byPrice())', group: 1 },
    { text: 'setTimeout(ring, 1000)', group: 0 },
    { text: 'setTimeout(ring(), 1000)', group: 1 },
    { text: 'button.addEventListener("click", order)', group: 0 },
    { text: 'order()', group: 1 },
  ], explain: 'Brackets run a function now. Without them, you hand it over.' }),
  quiz({ prompt: 'In button.addEventListener("click", greet), who calls greet?', options: ['The browser, when the button is clicked', 'You, straight away', 'Nobody', 'console.log'], right: 'Right. You hand greet over; the browser calls it on every click.', wrong: 'greet is a callback: the browser calls it when the click happens.' }),
  js({
    title: 'Price, then name',
    instructions: 'sortMenu(menu) returns the dish names sorted by price, cheapest first. When two prices are equal, sort those by name (a.dish.localeCompare(b.dish)).',
    file: 'sort.js',
    starter: 'function sortMenu(menu) {\n  return menu.map((d) => d.dish);\n}\n',
    tests: [
      { call: 'sortMenu([{ dish: "Thali", price: 120 }, { dish: "Poha", price: 30 }, { dish: "Idli", price: 30 }])', expect: '["Idli", "Poha", "Thali"]' },
      { call: 'sortMenu([{ dish: "Dal rice", price: 80 }])', expect: '["Dal rice"]' },
    ],
    hint: 'const byPriceThenName = (a, b) => a.price - b.price || a.dish.localeCompare(b.dish); then sort a copy: [...menu].sort(byPriceThenName)',
    solution: 'function sortMenu(menu) {\n  const byPriceThenName = (a, b) => a.price - b.price || a.dish.localeCompare(b.dish);\n  return [...menu].sort(byPriceThenName).map((d) => d.dish);\n}\n',
  }),
], [mdn('Arrow function expressions', 'Web/JavaScript/Reference/Functions/Arrow_functions'), mdn('JavaScript modules', 'Web/JavaScript/Guide/Modules')]);

// 8 ─────────────────────────────────────────────
const M8 = mod('j-obj-1', 'Objects, destructuring and spread', ['Objects group named values: dish.price, dish["price"]', 'Destructuring pulls values out: const { price } = dish', 'Spread copies and changes: { ...dish, price: 35 }'], [
  hook({ kicker: 'MODULE 8 · JAVASCRIPT', title: 'Everything about one dish', story: 'One dish has a name, a price, whether it’s veg, and how spicy it is. Four separate variables for every dish gets messy fast. An object keeps them together, in one place.', goal: 'Group data in objects, read it, and copy it safely.', lang: 'javascript', code: ['const dish = { name: "Poha", price: 40, veg: true };', 'console.log(dish.price);   // 40'] }),
  read({ kicker: LEARN(1), title: 'What is an object?', body: 'An object groups named values, called properties, inside { }. Each is a key and a value: price: 40. Read one with a dot, dish.price, or with brackets, dish["price"]. Change one the same way: dish.price = 35.', lang: 'javascript', code: ['const dish = { name: "Poha", price: 40, veg: true };', 'dish.price = 35;', 'console.log(dish.name, dish["price"]);'], anim: 'dict' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'A user profile, an order, a train on IRCTC, a product on Amazon: each is an object. Data from servers arrives as JSON, which turns straight into objects and arrays of objects.', anim: 'json' }),
  read({ kicker: LEARN(3), title: 'Destructuring and spread', body: 'Destructuring pulls properties into variables in one line. Spread, written ..., copies every property into a new object, and you can change some as you copy. Careful: const b = a does not copy; both names point to the same object.', lang: 'javascript', code: ['const { price, veg } = dish;', 'const offer = { ...dish, price: 35 };'], anim: 'dict' }),
  play('One dish', 'Tap a value, then run it.', 'dish.js', 'const dish = { name: "Poha", price: 40, veg: true };\nconsole.log(dish.name, dish["price"]);\nconst { price, veg } = dish;\nconsole.log(price, veg);\nconst offer = { ...dish, price: 35 };\nconsole.log(offer, dish.price);\n', ['Add spice: "mild" to the dish.', 'Change offer.veg. Does dish.veg change too?']),
  run({ title: 'Copy or the same?', instructions: 'Tap Next line. Watch which objects change.', code: ['const order = { dish: "Poha", plates: 1 };', 'const copy = { ...order, plates: 3 };', 'const same = order;', 'same.plates = 2;', 'console.log(order.plates, copy.plates);'], ask: { prompt: 'What does it print?', options: ['2 3', '1 3', '3 3', '1 2'], answer: 0, explain: 'same is the same object as order, so changing same changes order. copy is a real copy.', check: { out: true } } }),
  mistake({ kicker: OOPS, title: 'Reading inside something missing', lang: 'javascript', wrong: ['const order = { dish: "Poha" };', 'console.log(order.address.city);'], error: "TypeError: Cannot read properties of undefined (reading 'city')", right: ['const order = { dish: "Poha" };', 'console.log(order.address?.city ?? "No address yet");'], explain: 'order.address is undefined, and you can’t look inside undefined. ?. stops safely, and ?? gives a fallback.' }),
  match({ kicker: CHECK, title: 'Match each piece', instructions: 'Tap the code, then what it does.', pairs: [['dish.price', 'read a value'], ['dish.price = 35', 'change a value'], ['const { price } = dish', 'pull a value out'], ['{ ...dish }', 'make a copy'], ['dish.address?.city', 'read safely']], mono: true, explain: 'Dots read and change; braces on the left pull out; ... copies.' }),
  quiz({ prompt: 'const b = a; b.price = 0; What is a.price now?', options: ['0', 'The old price', 'undefined', 'An error'], right: 'Right. b and a are two names for the same object.', wrong: '= doesn’t copy an object, so a changes too. Use { ...a } for a copy.', mono: true }),
  js({
    title: 'Change the plates',
    instructions: 'withPlates(order, plates) returns a copy of the order with the new number of plates. The original order must not change.',
    file: 'order.js',
    starter: 'function withPlates(order, plates) {\n  order.plates = plates;\n  return order;\n}\n',
    tests: [
      { call: 'withPlates({ dish: "Poha", plates: 1 }, 3)', expect: '({ dish: "Poha", plates: 3 })' },
      { call: '(() => { const o = { dish: "Poha", plates: 1 }; withPlates(o, 3); return o.plates; })()', expect: '1' },
    ],
    hint: 'return { ...order, plates: plates };',
    solution: 'function withPlates(order, plates) {\n  return { ...order, plates: plates };\n}\n',
  }),
], [mdn('Working with objects', 'Web/JavaScript/Guide/Working_with_objects'), mdn('Destructuring', 'Web/JavaScript/Reference/Operators/Destructuring'), mdn('Spread syntax', 'Web/JavaScript/Reference/Operators/Spread_syntax')]);

// 9 ─────────────────────────────────────────────
const CART = 'class Cart {\n  constructor(owner) {\n    this.owner = owner;\n    this.items = [];\n  }\n  add(dish) {\n    this.items.push(dish);\n  }\n  get count() {\n    return this.items.length;\n  }\n}\n';
const M9 = mod('j-class-1', 'Classes', ['A class is a blueprint: the data each object holds and what it can do', 'constructor sets up each new object; this means “this object”', 'new makes an object; extends builds one class on another'], [
  hook({ kicker: 'MODULE 9 · JAVASCRIPT', title: 'Same shape, different data', story: 'Riya now takes orders for lots of customers at once. Every cart works the same way, but each one holds different dishes. A class is the blueprint; each cart is made from it.', goal: 'Write a class and make objects from it.', lang: 'javascript', code: ['const aman = new Cart("Aman");', 'aman.add("Poha");'] }),
  read({ kicker: LEARN(1), title: 'What is a class?', body: 'A class is a blueprint for objects: the data each one holds and the actions it can do, called methods. new Cart("Aman") builds one object from the blueprint. Each object gets its own data.', lang: 'javascript', code: lines(CART).slice(0, 5).concat('}'), anim: 'classObject' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Game characters, bank accounts, shopping carts, and the building blocks of many libraries. Whenever you need many things that work the same way but hold different data, a class keeps them tidy.', anim: 'classObject' }),
  read({ kicker: LEARN(3), title: 'constructor, this, extends', body: 'The constructor runs once for each new object and sets up its data. Inside methods, this means “the object this method is working on”. class TiffinCart extends Cart builds on Cart, and super(…) runs the parent’s constructor.', lang: 'javascript', code: ['add(dish) {', '  this.items.push(dish);', '}'], anim: 'classObject' }),
  play('Two carts', 'Tap a name or a dish, then run it.', 'cart.js', `${CART}const aman = new Cart("Aman");\nconst priya = new Cart("Priya");\naman.add("Poha");\naman.add("Thali");\npriya.add("Dal rice");\nconsole.log(aman.owner, aman.count);\nconsole.log(priya.owner, priya.count);\n`, ['Add a third cart for yourself.', 'Add one more dish to Priya’s cart.']),
  run({ title: 'Building a cart', instructions: 'Tap Next line. Watch the constructor fill in the new cart, then add put dishes in.', code: lines(CART).slice(0, 8).concat('}', 'const c = new Cart("Aman");', 'c.add("Poha");', 'c.add("Thali");', 'console.log(c.items.length);'), ask: { prompt: 'What does it print?', options: ['2', '1', '0', '["Poha","Thali"]'], answer: 0, explain: 'add ran twice on the same cart, so it holds 2 items.', check: { out: true } } }),
  mistake({ kicker: OOPS, title: 'Forgetting new', lang: 'javascript', wrong: ['class Cart {', '  constructor(owner) {', '    this.owner = owner;', '  }', '}', 'const c = Cart("Aman");'], error: "TypeError: Class constructor Cart cannot be invoked without 'new'", right: ['class Cart {', '  constructor(owner) {', '    this.owner = owner;', '  }', '}', 'const c = new Cart("Aman");'], explain: 'A class makes objects only with new in front.' }),
  match({ kicker: CHECK, title: 'Match each word', instructions: 'Tap a word, then its job.', pairs: [['class', 'the blueprint'], ['constructor', 'sets up each new object'], ['method', 'an action the object can do'], ['this', 'the object being worked on'], ['extends', 'build on another class']], mono: true, explain: 'One class, many objects, each with its own data.' }),
  quiz({ prompt: 'Two carts are made from the same Cart class. Do they share their items?', options: ['No, each cart has its own items', 'Yes, always', 'Only the first cart has items', 'Only if they have the same owner'], right: 'Right. The constructor gives every new cart its own items list.', wrong: 'Each new Cart gets its own this.items from the constructor.' }),
  js({
    title: 'A wallet that can’t go below zero',
    instructions: 'Give Wallet a spend(amount) method. If amount is more than the balance, return false and change nothing. Otherwise take it off the balance and return true.',
    file: 'wallet.js',
    starter: 'class Wallet {\n  constructor(balance) {\n    this.balance = balance;\n  }\n}\n',
    tests: [
      { call: '(() => { const w = new Wallet(100); w.spend(30); return w.balance; })()', expect: '70' },
      { call: 'new Wallet(50).spend(80)', expect: 'false' },
      { call: '(() => { const w = new Wallet(50); w.spend(80); return w.balance; })()', expect: '50' },
    ],
    hint: 'spend(amount) { if (amount > this.balance) return false; this.balance -= amount; return true; }',
    solution: 'class Wallet {\n  constructor(balance) {\n    this.balance = balance;\n  }\n  spend(amount) {\n    if (amount > this.balance) return false;\n    this.balance -= amount;\n    return true;\n  }\n}\n',
  }),
], [mdn('Classes', 'Web/JavaScript/Reference/Classes')]);

// 10 ────────────────────────────────────────────
const M10 = mod('j-error-1', 'Handling errors', ['Read the error’s name and message first', 'try / catch handles an error; finally always runs', 'throw new Error("…") raises your own, with a clear message'], [
  hook({ kicker: 'MODULE 10 · JAVASCRIPT', title: '“two” plates', story: 'A customer types “two” as the number of plates. Should the whole page break? Good code expects bad input and handles it calmly, with a message that says what to fix.', goal: 'Catch errors, and throw clear ones of your own.', lang: 'javascript', code: ['try {', '  plates("two");', '} catch (err) {', '  console.log(err.message);', '}'] }),
  read({ kicker: LEARN(1), title: 'What is an error?', body: 'When JavaScript can’t do something, it throws an error with a name, like TypeError or ReferenceError, and a message. If nothing catches it, the code stops there. The name and message tell you what went wrong.', lang: 'javascript', code: ['null.length;', '// TypeError: Cannot read properties of null'], anim: 'error' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: '“Payment failed, please try again” in place of a blank screen. “Enter a valid phone number” under a form field. Apps that keep working when the network drops. All of them catch errors and show something helpful.', anim: 'error' }),
  read({ kicker: LEARN(3), title: 'try, catch, throw', body: 'Put risky code in try. If anything in it throws, JavaScript jumps straight to catch, with the error. finally runs either way. throw new Error("…") raises your own error, so bad input stops early with a clear message.', lang: 'javascript', code: ['try {', '  checkPlates("two");', '} catch (err) {', '  console.log(err.message);', '} finally {', '  console.log("Checked");', '}'], anim: 'error' }),
  play('Check the plates', 'Tap an input, then run it.', 'plates.js', 'function plates(text) {\n  const n = Number(text);\n  if (!Number.isInteger(n) || n < 1) {\n    throw new Error("Enter a whole number of plates");\n  }\n  return n;\n}\ntry {\n  console.log(plates("2"));\n  console.log(plates("two"));\n} catch (err) {\n  console.log("Sorry:", err.message);\n} finally {\n  console.log("Checked");\n}\n', ['Change "two" to "-1".', 'Swap the two plates( … ) lines. What prints now?']),
  run({ title: 'The jump to catch', instructions: 'Tap Next line. Watch the throw skip the rest of try and land in catch.', code: ['function plates(text) {', '  const n = Number(text);', '  if (!Number.isInteger(n)) {', '    throw new Error("Not a number");', '  }', '  return n;', '}', 'try {', '  const a = plates("two");', '  console.log(a);', '} catch (err) {', '  console.log("Sorry:", err.message);', '}'], ask: { prompt: 'What is the last line printed?', options: ['Sorry: Not a number', 'two', 'NaN', 'Not a number'], answer: 0, explain: 'plates threw, so console.log(a) never ran and catch printed the message.', check: { out: true } } }),
  mistake({ kicker: OOPS, title: 'Hiding the problem', lang: 'javascript', wrong: ['try {', '  JSON.parse("{plates: 2}");', '} catch (err) {', '}', 'console.log("Order placed");'], error: 'Order placed', right: ['try {', '  JSON.parse("{plates: 2}");', '  console.log("Order placed");', '} catch (err) {', '  console.log("Could not read the order:", err.name);', '}'], explain: 'An empty catch swallows the error, so the code carries on as if all is well. Say what went wrong.' }),
  match({ kicker: CHECK, title: 'Match each error word', instructions: 'Tap a word, then what it means.', pairs: [['TypeError', 'the wrong kind of value'], ['ReferenceError', 'a name that doesn’t exist'], ['SyntaxError', 'code written wrongly'], ['throw', 'raise your own error'], ['finally', 'always runs']], mono: true, explain: 'The error’s name is the first clue.' }),
  quiz({ prompt: 'After a throw inside try, does the next line in try run?', options: ['No, it jumps to catch', 'Yes, always', 'Only inside finally', 'Only once'], right: 'Right. A throw leaves try straight away.', wrong: 'Once something throws, the rest of try is skipped.' }),
  js({
    title: 'Check a phone number',
    instructions: 'checkPhone(text) returns the text if it is exactly 10 digits. Otherwise it throws new Error("Enter a 10-digit phone number").',
    file: 'phone.js',
    starter: 'function checkPhone(text) {\n  return text;\n}\n',
    tests: [
      { call: 'checkPhone("9876543210")', expect: '"9876543210"' },
      { call: 'checkPhone("98765")', raises: 'Error: Enter a 10-digit phone number' },
      { call: 'checkPhone("98765abcde")', raises: 'Error: Enter a 10-digit phone number' },
    ],
    hint: 'if (!/^\\d{10}$/.test(text)) throw new Error("Enter a 10-digit phone number"); then return text;',
    solution: 'function checkPhone(text) {\n  if (!/^\\d{10}$/.test(text)) {\n    throw new Error("Enter a 10-digit phone number");\n  }\n  return text;\n}\n',
  }),
], [mdn('Control flow and error handling', 'Web/JavaScript/Guide/Control_flow_and_error_handling'), mdn('Error', 'Web/JavaScript/Reference/Global_Objects/Error')]);

// 11 ────────────────────────────────────────────
const COUNTER = '<h1>Riya’s Tiffins</h1>\n<p>Tiffins in your order: <span id="count">0</span></p>\n<button id="add">Add a tiffin</button>\n<button id="reset">Clear</button>\n';
const BUTTONS = 'body {\n  font-family: system-ui, sans-serif;\n}\nbutton {\n  background: #E8590C;\n  color: white;\n  border: 0;\n  padding: 10px 14px;\n  border-radius: 8px;\n}\n';
const J11 = 'const add = document.querySelector("#add");\nconst count = document.querySelector("#count");\nlet items = Number(localStorage.getItem("items") ?? 0);\ncount.textContent = items;\nadd.addEventListener("click", () => {\n  items += 1;\n  count.textContent = items;\n  localStorage.setItem("items", items);\n});\n';
const J11_DONE = 'const add = document.querySelector("#add");\nconst reset = document.querySelector("#reset");\nconst count = document.querySelector("#count");\nlet items = Number(localStorage.getItem("items") ?? 0);\ncount.textContent = items;\nadd.addEventListener("click", () => {\n  items += 1;\n  count.textContent = items;\n  localStorage.setItem("items", items);\n});\nreset.addEventListener("click", () => {\n  items = 0;\n  count.textContent = items;\n  localStorage.removeItem("items");\n});\n';
const M11 = mod('j-dom-1', 'The DOM, events and storage', ['document.querySelector finds an element on the page', 'addEventListener runs a function when something happens', 'localStorage keeps small data in the browser, as text'], [
  hook({ kicker: 'MODULE 11 · JAVASCRIPT', title: 'The button finally works', story: 'Everything so far printed to a console. Now the real thing: tap “Add a tiffin” on Riya’s page and the count goes up, on the page, live. And it’s still there after a refresh.', goal: 'Find things on a page, react to taps, and save small data.', lang: 'javascript', code: ['add.addEventListener("click", () => {', '  items += 1;', '  count.textContent = items;', '});'] }),
  read({ kicker: LEARN(1), title: 'What is the DOM?', body: 'When a browser reads HTML, it builds a tree of objects called the DOM, the Document Object Model. JavaScript can find any element in that tree with document.querySelector and change its text, its classes or its style. The page updates straight away.', lang: 'javascript', code: ['const count = document.querySelector("#count");', 'count.textContent = 3;'], anim: 'domTree' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Every like button, every dark-mode switch, the “show password” eye, a live search box, a form that says “Enter your name”. Each one finds an element, listens for something, and changes the page.', anim: 'domTree' }),
  read({ kicker: LEARN(3), title: 'Events and storage', body: 'addEventListener("click", fn) runs fn every time the element is clicked; "input" fires as someone types. localStorage.setItem saves small data in the browser, as text, and getItem reads it back, even after a refresh. Use textContent to show text: it’s safe.', lang: 'javascript', code: ['localStorage.setItem("items", 3);', 'localStorage.getItem("items");   // "3"'], anim: 'domTree' }),
  playPage('Riya’s order counter', 'Tap a value in app.js, then tap the buttons on the page.', { html: COUNTER, css: BUTTONS, js: J11 }, ['Make each tap add 2.', 'Change the "click" event to "dblclick". How do you add now?']),
  pageBuild({ kicker: BUILD, title: 'Wiring up the button', instructions: 'Tap Next line. Each step runs the script up to that line; at the end, tap the button in the preview.', html: lines(COUNTER), css: lines(BUTTONS), js: lines(J11), steps: [
    { line: 2, note: 'Found the button and the count. Nothing changes on the page yet: finding isn’t changing.' },
    { line: 4, note: 'Read the saved count (or 0) and showed it with textContent.' },
    { line: 9, note: 'Now the button listens. Tap “Add a tiffin” in the preview: the count goes up and is saved.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A selector without its #', lang: 'javascript', page: COUNTER, wrong: ['const count = document.querySelector("count");', 'count.textContent = 1;'], error: "TypeError: Cannot set properties of null (setting 'textContent')", right: ['const count = document.querySelector("#count");', 'count.textContent = 1;'], explain: '"count" looks for a <count> tag, finds nothing and gives null. An id needs #. And for text people type, use textContent, never innerHTML.' }),
  match({ kicker: CHECK, title: 'Match each tool', instructions: 'Tap the code, then what it does.', pairs: [['querySelector', 'find one element'], ['addEventListener', 'run code when something happens'], ['textContent', 'set the text, safely'], ['classList.toggle', 'switch a class on or off'], ['localStorage', 'save small data in the browser']], mono: true, explain: 'Find it, listen to it, change it.' }),
  quiz({ prompt: 'localStorage.setItem("n", 5), then localStorage.getItem("n") gives…', options: ['"5" (text)', '5 (a number)', 'null', 'An error'], right: 'Right. localStorage keeps everything as text, so turn it back with Number(…).', wrong: 'localStorage stores text: you get "5" back, not 5.', mono: true }),
  web({
    title: 'A counter that remembers',
    instructions: 'Make “Add a tiffin” add 1 and save the count, show the saved count when the page opens, and make “Clear” set it back to 0 and remove it from storage.',
    starter: { html: COUNTER, css: BUTTONS, js: 'let items = 0;\n// find the buttons and the count, then listen for clicks\n' },
    solution: { html: COUNTER, css: BUTTONS, js: J11_DONE },
    checks: [
      { label: 'Finds the Add button with querySelector', file: 'js', pattern: /querySelector\(\s*["'`]#add["'`]\s*\)/ },
      { label: 'Listens for clicks', file: 'js', pattern: /addEventListener\(\s*["'`]click["'`]/ },
      { label: 'Shows the count with textContent', file: 'js', pattern: /\.textContent\s*=/ },
      { label: 'Saves to localStorage', file: 'js', pattern: /localStorage\.setItem\(/ },
      { label: 'Reads the saved count', file: 'js', pattern: /localStorage\.getItem\(/ },
      { label: 'Clear removes it', file: 'js', pattern: /localStorage\.removeItem\(/ },
    ],
    hint: 'reset.addEventListener("click", () => { items = 0; count.textContent = items; localStorage.removeItem("items"); });',
  }),
], [mdn('Introduction to the DOM', 'Web/API/Document_Object_Model/Introduction'), mdn('addEventListener', 'Web/API/EventTarget/addEventListener'), mdn('localStorage', 'Web/API/Window/localStorage')], 10);

// 12 ────────────────────────────────────────────
const MENU_PAGE = '<h1>Today’s menu</h1>\n<p id="info"></p>\n<ul id="dishes"></ul>\n';
const J12 = 'const info = document.querySelector("#info");\nconst list = document.querySelector("#dishes");\nasync function loadMenu(url) {\n  info.textContent = "Loading…";\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(`Server said ${res.status}`);\n    const menu = await res.json();\n    if (menu.length === 0) {\n      info.textContent = "No dishes today.";\n      return;\n    }\n    info.textContent = `${menu.length} dishes`;\n    for (const dish of menu) {\n      const li = document.createElement("li");\n      li.textContent = `${dish.name} ₹${dish.price}`;\n      list.append(li);\n    }\n  } catch (err) {\n    info.textContent = "Couldn’t load the menu. Try again.";\n  }\n}\nloadMenu("/api/menu");\n';
const M12 = mod('j-async-1', 'Promises, async/await and fetch', ['Slow work (network, timers) gives back a Promise: an answer later', 'await waits for it without freezing the page', 'Always show loading, error and empty states; check res.ok'], [
  hook({ kicker: 'MODULE 12 · JAVASCRIPT', title: 'The menu from a server', story: 'Riya’s menu now comes from a server, so she can change prices without editing the page. Loading takes a moment, and on mobile data it sometimes fails. The page must not freeze, and it must say something useful.', goal: 'Load data with fetch and handle every outcome.', lang: 'javascript', code: ['const res = await fetch("/api/menu");', 'const menu = await res.json();'] }),
  read({ kicker: LEARN(1), title: 'What is a Promise?', body: 'Slow work, like asking a server for data, gives back a Promise: “I’ll have the answer later.” Inside an async function, await waits for the answer without freezing the page. Taps and scrolling keep working while it waits.', lang: 'javascript', code: ['async function loadMenu() {', '  const res = await fetch("/api/menu");', '  return await res.json();', '}'], anim: 'eventLoop' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Every app that loads anything: restaurant lists, the weather, your feed, train status. And the “Loading…”, “No results” and “Something went wrong, try again” messages you see everywhere: those are the states you’ll build.', anim: 'api' }),
  read({ kicker: LEARN(3), title: 'fetch, res.ok, try/catch', body: 'fetch(url) asks a server and gives a response. fetch does not fail on a 404 or 500, so check res.ok yourself. res.json() reads the data. Wrap it in try/catch for a dropped network. In the app, /api/… is a practice server.', lang: 'javascript', code: ['const res = await fetch("/api/menu");', 'if (!res.ok) throw new Error(`Server said ${res.status}`);'], anim: 'api' }),
  playPage('Four kinds of reply', 'Tap the address in app.js to change what the practice server sends back.', { html: MENU_PAGE, js: J12 }, ['Try "/api/menu/empty". Which message shows?', 'Try "/api/menu/broken", then "/api/menu/slow".']),
  pageBuild({ kicker: BUILD, title: 'Loading the menu', instructions: 'Tap Next line. Each step runs the script up to that line.', html: lines(MENU_PAGE), js: lines(J12), steps: [
    { line: 2, note: 'Found the message line and the list. The page is still empty.' },
    { line: 22, note: 'loadMenu is written, but a function does nothing until it is called.' },
    { line: 23, note: 'Called: “Loading…” shows, the practice server answers, and the dishes appear.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Forgetting await', lang: 'javascript', wrong: ['async function loadMenu() {', '  return ["Poha", "Thali"];', '}', 'const menu = loadMenu();', 'console.log(`Dishes: ${menu.length}`);'], error: 'Dishes: undefined', right: ['async function loadMenu() {', '  return ["Poha", "Thali"];', '}', 'async function show() {', '  const menu = await loadMenu();', '  console.log(`Dishes: ${menu.length}`);', '}', 'show();'], explain: 'An async function gives back a Promise, not the data. await it (inside another async function) to get the data.' }),
  group({ kicker: CHECK, title: 'Before or after the data arrives?', instructions: 'Sort each moment: before the data comes back, or after.', groups: ['Before the data arrives', 'After it arrives'], items: [
    { text: '“Loading…” shows', group: 0 },
    { text: 'fetch is sent', group: 0 },
    { text: 'You can still scroll and tap', group: 0 },
    { text: 'res.json() reads it', group: 1 },
    { text: 'The dishes appear', group: 1 },
    { text: '“No dishes today.” if the list is empty', group: 1 },
  ], explain: 'The page keeps working while it waits; the function carries on when the data arrives.' }),
  quiz({ prompt: 'fetch gets a 404 reply. Does it jump to catch by itself?', options: ['No, you check res.ok', 'Yes, always', 'Only on mobile data', 'Only if you use await'], right: 'Right. fetch only fails when there is no reply at all; a 404 is still a reply.', wrong: 'A 404 is a reply, so fetch succeeds. Check res.ok and throw yourself.' }),
  web({
    title: 'Load the menu, every state',
    instructions: 'Make loadMenu async: show “Loading…”, await fetch, throw if res is not ok, show “No dishes today.” for an empty list, and catch errors with a friendly message.',
    starter: { html: MENU_PAGE, js: 'const info = document.querySelector("#info");\nconst list = document.querySelector("#dishes");\nfunction loadMenu(url) {\n  const menu = fetch(url);\n  info.textContent = `${menu.length} dishes`;\n}\nloadMenu("/api/menu");\n' },
    solution: { html: MENU_PAGE, js: J12 },
    checks: [
      { label: 'loadMenu is async', file: 'js', pattern: /async\s+function\s+loadMenu/ },
      { label: 'Waits for fetch with await', file: 'js', pattern: /await\s+fetch\(/ },
      { label: 'Checks res.ok', file: 'js', pattern: /res\.ok/ },
      { label: 'Shows a loading message', file: 'js', pattern: /Loading/ },
      { label: 'Handles an empty list', file: 'js', pattern: /\.length\s*===\s*0/ },
      { label: 'Catches errors', file: 'js', pattern: /try\s*\{[\s\S]*\}\s*catch\s*\(/ },
    ],
    hint: 'async function loadMenu(url) { info.textContent = "Loading…"; try { const res = await fetch(url); if (!res.ok) throw new Error(…); const menu = await res.json(); … } catch (err) { … } }',
  }),
], [mdn('Using promises', 'Web/JavaScript/Guide/Using_promises'), mdn('async function', 'Web/JavaScript/Reference/Statements/async_function'), mdn('Using the Fetch API', 'Web/API/Fetch_API/Using_Fetch')], 10);

const REWRITTEN: Record<string, Lesson> = { 'j-var-1': M1, 'j-ops-1': M2, 'j-cond-1': M3, 'w-js-1': M4, 'j-fn-1': M5, 'j-arr-1': M6, 'j-arrow-1': M7, 'j-obj-1': M8, 'j-class-1': M9, 'j-error-1': M10, 'j-dom-1': M11, 'j-async-1': M12 };
export const JS_BASIC: Lesson[] = Object.values(REWRITTEN);

// Project ───────────────────────────────────────
// The Sharma Classes page from the HTML and CSS projects, cut down to the parts the script works with.
const SHARMA = '<header><strong>Sharma Classes</strong></header>\n<main>\n  <h1>Fees and enquiries</h1>\n  <section>\n    <h2>Fee calculator</h2>\n    <label>Course\n      <select id="course">\n        <option value="maths10">Class 10 Maths</option>\n        <option value="physics12">Class 12 Physics</option>\n        <option value="science9">Class 9 Science</option>\n      </select>\n    </label>\n    <label>Months <input id="months" type="number" value="3" min="1" max="12"></label>\n    <label><input id="sibling" type="checkbox"> A brother or sister already studies here</label>\n    <p>Fee: <strong id="fee">₹0</strong></p>\n  </section>\n  <section>\n    <h2>Enquiry</h2>\n    <form id="enquiry">\n      <label>Student’s name <input id="student"></label>\n      <label>Parent’s phone <input id="phone" inputmode="numeric"></label>\n      <label>Class <input id="klass" type="number"></label>\n      <button>Send enquiry</button>\n    </form>\n    <p id="msg"></p>\n  </section>\n  <section>\n    <h2>Batch timings</h2>\n    <p id="info"></p>\n    <ul id="batches"></ul>\n  </section>\n</main>\n';
const SHARMA_CSS = ':root {\n  --blue: #1E3A8A;\n  --gold: #F59E0B;\n}\nbody {\n  font-family: system-ui, sans-serif;\n  line-height: 1.5;\n}\nheader {\n  background: var(--blue);\n  color: white;\n  padding: 0.75rem;\n}\nlabel {\n  display: block;\n  margin: 0.5rem 0;\n}\nbutton {\n  background: var(--gold);\n  border: 0;\n  padding: 0.6rem 1rem;\n  border-radius: 8px;\n}\n';
const P1 = 'const COURSES = [\n  { id: "maths10", title: "Class 10 Maths", monthly: 1500 },\n  { id: "physics12", title: "Class 12 Physics", monthly: 1800 },\n  { id: "science9", title: "Class 9 Science", monthly: 1200 },\n];\nfunction feeFor(courseId, months, sibling) {\n  const course = COURSES.find((c) => c.id === courseId);\n  if (!course) throw new Error("Unknown course");\n  const total = course.monthly * months;\n  return sibling ? total * 0.9 : total;\n}\nconsole.log(feeFor("maths10", 3, false));\nconsole.log(feeFor("maths10", 3, true));\n';
const P2_ADD = 'const fee = document.querySelector("#fee");\nconst course = document.querySelector("#course");\nconst months = document.querySelector("#months");\nconst sibling = document.querySelector("#sibling");\nfunction showFee() {\n  const amount = feeFor(course.value, Number(months.value), sibling.checked);\n  fee.textContent = "₹" + amount.toLocaleString("en-IN");\n}\ncourse.addEventListener("change", showFee);\nmonths.addEventListener("input", showFee);\nsibling.addEventListener("change", showFee);\nshowFee();\n';
const P2 = P1.replace(/console\.log\([^\n]*\n/g, '') + P2_ADD;
const P3_ADD = 'const form = document.querySelector("#enquiry");\nconst msg = document.querySelector("#msg");\nfunction checkEnquiry(student, phone, klass) {\n  if (student.trim() === "") throw new Error("Please enter the student’s name");\n  if (!/^\\d{10}$/.test(phone)) throw new Error("Enter a 10-digit phone number");\n  if (klass < 9 || klass > 12) throw new Error("We teach classes 9 to 12");\n}\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  try {\n    const student = document.querySelector("#student").value;\n    const phone = document.querySelector("#phone").value;\n    const klass = Number(document.querySelector("#klass").value);\n    checkEnquiry(student, phone, klass);\n    msg.textContent = "Thank you! We will call you today.";\n  } catch (err) {\n    msg.textContent = err.message;\n  }\n});\n';
const P3 = P2 + P3_ADD;
const P4 = P3.replace('    msg.textContent = "Thank you! We will call you today.";\n', '    msg.textContent = "Thank you! We will call you today.";\n    localStorage.setItem("enquiry", new Date().toLocaleDateString("en-IN"));\n') +
  'const saved = localStorage.getItem("enquiry");\nif (saved) msg.textContent = `We got your enquiry on ${saved}. We will call you soon.`;\nconst info = document.querySelector("#info");\nconst batches = document.querySelector("#batches");\nasync function loadBatches() {\n  info.textContent = "Loading timings…";\n  try {\n    const res = await fetch("/api/batches");\n    if (!res.ok) throw new Error(`Server said ${res.status}`);\n    const list = await res.json();\n    info.textContent = "";\n    for (const b of list) {\n      const li = document.createElement("li");\n      li.textContent = `${b.course}: ${b.days}, ${b.time}`;\n      batches.append(li);\n    }\n  } catch (err) {\n    info.textContent = "Couldn’t load the timings. Please call us.";\n  }\n}\nloadBatches();\n';
const step = (title: string, instructions: string, starter: string, solution: string, checks: WebStep['checks'], hint: string): WebStep =>
  web({ title, instructions, starter: { html: SHARMA, css: SHARMA_CSS, js: starter }, solution: { html: SHARMA, css: SHARMA_CSS, js: solution }, checks, hint });

export const JS_PROJECT_V3: Lesson = {
  id: 'j-project',
  title: 'Project: make Sharma Classes work',
  kind: 'project',
  level: 'basic',
  minutes: 30,
  skill: 'js',
  learned: ['Wrote the logic of a real feature, with data, functions and errors', 'Connected it to a page with the DOM and events', 'Checked a form, saved data and loaded from a server'],
  reading: [mdn('Using the Fetch API', 'Web/API/Fetch_API/Using_Fetch'), mdn('localStorage', 'Web/API/Window/localStorage')],
  steps: [
    hook({ kicker: 'PROJECT · JAVASCRIPT', title: 'Sharma Classes, working', story: 'You built the Sharma Classes page in HTML and styled it in CSS. Now it needs to do things: work out fees, check the enquiry form, and show batch timings. You’ll add JavaScript in four checked steps.', goal: 'A page that calculates, checks, remembers and loads.', lang: 'javascript', code: ['feeFor("maths10", 3, true);   // 4050'] }),
    scenario({ kicker: 'YOUR CLIENT', title: 'The brief', from: 'Mr Sharma · Sharma Classes, Jaipur', message: 'Parents keep calling to ask the fees and to check if we got their enquiry. Can the page work out the fee, and check the form before it’s sent? Brothers and sisters get 10% off.', artifact: { kind: 'ticket', title: 'What the page needs', lines: ['Fee = monthly fee × months, 10% off for siblings', 'The fee updates as parents choose', 'The form checks name, phone and class', 'It remembers an enquiry and shows batch timings'] }, task: 'Step 1: the course data and the fee rule, tested in the console.' }),
    step('Step 1 · Courses and fees', 'Store the courses as an array of objects with a monthly fee. Write feeFor(courseId, months, sibling): find the course, throw if it doesn’t exist, and take 10% off for a sibling.', '// courses, then feeFor(courseId, months, sibling)\n', P1, [
      { label: 'An array of course objects with a monthly fee', file: 'js', pattern: /const\s+COURSES\s*=\s*\[\s*\{[^}]*monthly:/ },
      { label: 'A feeFor function', file: 'js', pattern: /function\s+feeFor\(\s*courseId,\s*months,\s*sibling\s*\)/ },
      { label: 'Finds the course with find', file: 'js', pattern: /COURSES\.find\(/ },
      { label: 'Throws for an unknown course', file: 'js', pattern: /throw\s+new\s+Error\(/ },
      { label: '10% off for a sibling', file: 'js', pattern: /sibling\s*\?\s*total\s*\*\s*0\.9/ },
    ], 'const course = COURSES.find((c) => c.id === courseId); if (!course) throw new Error("Unknown course"); const total = course.monthly * months; return sibling ? total * 0.9 : total;'),
    step('Step 2 · A live fee calculator', 'Find the course, months and sibling inputs and the fee. Write showFee() to show the fee as ₹ with Indian commas (toLocaleString("en-IN")), call it when anything changes, and once at the start.', P1.replace(/console\.log\([^\n]*\n/g, '') + '// find the inputs, then show the fee whenever they change\n', P2, [
      { label: 'Finds the inputs with querySelector', file: 'js', pattern: /querySelector\(\s*["'`]#months["'`]\s*\)/ },
      { label: 'Listens for changes', file: 'js', pattern: /addEventListener\(\s*["'`](input|change)["'`]/ },
      { label: 'Shows the fee with textContent', file: 'js', pattern: /fee\.textContent\s*=/ },
      { label: 'Formats with Indian commas', file: 'js', pattern: /toLocaleString\(\s*["'`]en-IN["'`]\s*\)/ },
    ], 'function showFee() { const amount = feeFor(course.value, Number(months.value), sibling.checked); fee.textContent = "₹" + amount.toLocaleString("en-IN"); }'),
    step('Step 3 · An enquiry form that checks itself', 'On submit, stop the page reloading, then check the name isn’t empty, the phone is 10 digits and the class is 9 to 12. Show the first problem, or a thank-you, in #msg.', P2 + '// check the enquiry form when it is sent\n', P3, [
      { label: 'Listens for submit', file: 'js', pattern: /addEventListener\(\s*["'`]submit["'`]/ },
      { label: 'Stops the page reloading', file: 'js', pattern: /\.preventDefault\(\)/ },
      { label: 'Checks for 10 digits', file: 'js', pattern: /\\d\{10\}/ },
      { label: 'Uses try and catch', file: 'js', pattern: /try\s*\{[\s\S]*\}\s*catch\s*\(/ },
      { label: 'Shows the message with textContent', file: 'js', pattern: /msg\.textContent\s*=\s*err\.message/ },
    ], 'function checkEnquiry(student, phone, klass) { if (student.trim() === "") throw new Error("…"); … } then in the submit listener: try { checkEnquiry(…); msg.textContent = "Thank you!…"; } catch (err) { msg.textContent = err.message; }'),
    step('Step 4 · Remember, and load the timings', 'Save the date of a sent enquiry in localStorage and show it when the page opens. Then load the batch timings from "/api/batches", with a loading message and a friendly error.', P3 + '// remember the enquiry, then load the batch timings\n', P4, [
      { label: 'Saves the enquiry date', file: 'js', pattern: /localStorage\.setItem\(\s*["'`]enquiry["'`]/ },
      { label: 'Reads it when the page opens', file: 'js', pattern: /localStorage\.getItem\(\s*["'`]enquiry["'`]/ },
      { label: 'Waits for fetch with await', file: 'js', pattern: /await\s+fetch\(\s*["'`]\/api\/batches["'`]/ },
      { label: 'Checks res.ok', file: 'js', pattern: /res\.ok/ },
      { label: 'Shows a loading message', file: 'js', pattern: /Loading/ },
    ], 'async function loadBatches() { info.textContent = "Loading timings…"; try { const res = await fetch("/api/batches"); if (!res.ok) throw new Error(…); const list = await res.json(); … } catch (err) { … } }'),
  ],
};
