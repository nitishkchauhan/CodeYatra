// Extra practice for each JavaScript module. Every predicted output runs in the tests (arrays print as JSON).
import { bug, order, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · JAVASCRIPT';
const p = (title: string, lines: string[], answer: string, explain: string, accept?: string[]) => predict({ kicker: K, title, lang: 'javascript', lines, answer, explain, accept });

export const JS_DRILLS: Record<string, Step[]> = {
  'j-var-1': [
    p('typeof', ['console.log(typeof 3.5, typeof "3.5", typeof false);'], 'number string boolean', 'Decimals are numbers too; quotes make a string.'),
    p('Template literal', ['const seats = 3;', 'console.log(`${seats} seats, ${seats * 450} rupees`);'], '3 seats, 1350 rupees', 'Anything inside ${} is worked out first.'),
    quiz({ prompt: 'Which should you use for a value that never changes?', options: ['const', 'let', 'var', 'static'], right: 'Right. const by default, let only when it changes.', wrong: 'const declares a name that can’t be reassigned.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should print "Hello, Ava". Tap the buggy line.', lang: 'javascript', lines: ['const name = "Ava";', 'console.log("Hello, ${name}");'], bug: 1, fix: 'console.log(`Hello, ${name}`);', explain: '${…} only works inside backticks, not double quotes.' }),
  ],
  'j-ops-1': [
    p('Joining or adding?', ['console.log(1 + 2 + "3", "1" + 2 + 3);'], '33 123', 'Left to right: 1 + 2 is 3, then + "3" joins. Once a string appears, + joins.'),
    p('Remainder and power', ['console.log(20 % 6, 3 ** 3);'], '2 27', '20 ÷ 6 leaves 2; 3 × 3 × 3 = 27.'),
    p('Default values', ['const a = 0;', 'console.log(a || 5, a ?? 5);'], '5 0', '|| replaces any falsy value; ?? only replaces null or undefined.'),
    quiz({ prompt: 'Which comparison is false?', options: ['"5" === 5', '5 === 5', '"5" == 5', '5 !== 6'], right: 'Right. Strict equality needs the same type too.', wrong: '"5" is a string and 5 a number, so === says false (== would convert and say true).', mono: true }),
  ],
  'j-cond-1': [
    p('else if', ['const t = 25;', 'if (t > 30) console.log("hot");', 'else if (t > 20) console.log("warm");', 'else console.log("cool");'], 'warm', '25 is not over 30 but is over 20.'),
    p('Ternary', ['const seats = 0;', 'console.log(seats > 0 ? "Book now" : "Waitlist");'], 'Waitlist', 'seats > 0 is false, so the second value is chosen.'),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Marks of 60 should print "Pass". Tap the buggy line.', lang: 'javascript', lines: ['const marks = 60;', 'if (marks > 60) console.log("Pass");', 'else console.log("Fail");'], bug: 1, fix: 'if (marks >= 60) console.log("Pass");', explain: '> 60 leaves out exactly 60. Use >= to include it.' }),
    quiz({ prompt: 'What does switch use to compare the value with each case?', options: ['===', '==', '>', 'includes'], right: 'Right. "1" won’t match case 1.', wrong: 'switch compares with strict equality, ===.', mono: true }),
  ],
  'w-js-1': [
    p('Count down', ['let out = [];', 'for (let i = 3; i > 0; i--) out.push(i);', 'console.log(out);'], '[3,2,1]', 'i starts at 3 and goes down while it is above 0.', ['[3, 2, 1]']),
    p('for…of total', ['let total = 0;', 'for (const n of [5, 10, 15]) total += n;', 'console.log(total);'], '30', 'Each item is added once.'),
    p('while', ['let n = 1, steps = 0;', 'while (n < 100) {', '  n *= 3;', '  steps++;', '}', 'console.log(n, steps);'], '243 5', '1 → 3 → 9 → 27 → 81 → 243: five multiplications.'),
    order({ kicker: K, title: 'Arrange the loop', instructions: 'Arrange it to print the even numbers from 2 to 6.', lang: 'javascript', lines: ['for (let i = 1; i <= 6; i++) {', '  if (i % 2 === 0) {', '    console.log(i);', '  }', '}'], output: ['2', '4', '6'], explain: 'Count 1 to 6 and print only when the remainder after ÷ 2 is 0.' }),
  ],
  'j-fn-1': [
    p('Default parameter', ['function fare(km, rate = 2) {', '  return km * rate;', '}', 'console.log(fare(10), fare(10, 5));'], '20 50', 'The default 2 is used only when no rate is passed.'),
    p('Closure', ['function add(x) {', '  return (y) => x + y;', '}', 'const add5 = add(5);', 'console.log(add5(3), add(1)(1));'], '8 2', 'add5 remembers x = 5.'),
    quiz({ prompt: 'Where can a variable declared with let inside a function be used?', options: ['Only inside that function (its block)', 'Anywhere in the file', 'In every other function', 'Only on the next line'], right: 'Right. That is block scope.', wrong: 'let and const belong to the block they are declared in.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'double(4) should give 8, but it gives undefined. Tap the buggy line.', lang: 'javascript', lines: ['function double(n) {', '  n * 2;', '}', 'console.log(double(4));'], bug: 1, fix: '  return n * 2;', explain: 'Without return, the function gives back undefined.' }),
  ],
  'j-arr-1': [
    p('map', ['console.log([1, 2, 3].map((n) => n * 10));'], '[10,20,30]', 'map makes a new array from each item.', ['[10, 20, 30]']),
    p('filter and length', ['const seats = [0, 4, 0, 2];', 'console.log(seats.filter((s) => s > 0).length);'], '2', 'Two items are above 0.'),
    p('reduce', ['console.log([2, 3, 4].reduce((acc, n) => acc * n, 1));'], '24', 'Start at 1 and multiply: 2 × 3 × 4.'),
    quiz({ prompt: 'Does filter change the original array?', options: ['No, it returns a new one', 'Yes, it removes items', 'Only if you pass true', 'Only for numbers'], right: 'Right. map, filter, find and reduce all leave it alone.', wrong: 'filter returns a new array; the original is unchanged.' }),
  ],
  'j-arrow-1': [
    p('Short arrows', ['const sq = (n) => n * n;', 'const add = (a, b) => a + b;', 'console.log(add(sq(2), sq(3)));'], '13', '4 + 9 = 13.'),
    p('Sort numbers', ['console.log([10, 9, 100].sort((a, b) => b - a));'], '[100,10,9]', 'b - a sorts from high to low.', ['[100, 10, 9]']),
    p('Sort without a callback', ['console.log([10, 9, 100].sort());'], '[10,100,9]', 'Without a callback, items are compared as text: "10" < "100" < "9".', ['[10, 100, 9]']),
    quiz({ prompt: 'Which keyword makes a function available to other files?', options: ['export', 'import', 'public', 'return'], right: 'Right. The other file then imports it.', wrong: 'export shares it; import brings it into another file.', mono: true }),
  ],
  'j-obj-1': [
    p('Destructuring', ['const t = { name: "Delta Express", fare: 1800 };', 'const { name, coach = "AC" } = t;', 'console.log(name, coach);'], 'Delta Express AC', 'coach isn’t in the object, so the default "AC" is used.'),
    p('Spread override', ['const a = { seats: 2, coach: "S3" };', 'const b = { ...a, seats: 5 };', 'console.log(a.seats, b.seats, b.coach);'], '2 5 S3', 'b copies a, then replaces seats.'),
    p('Object keys', ['console.log(Object.keys({ a: 1, b: 2, c: 3 }).length);'], '3', 'Object.keys gives the list of keys.'),
    quiz({ prompt: 'What does booking.train?.name give if booking.train is undefined?', options: ['undefined, with no error', 'A TypeError', 'null', '"name"'], right: 'Right. ?. stops safely.', wrong: 'Optional chaining returns undefined instead of throwing.' }),
  ],
  'j-class-1': [
    p('A method', ['class Counter {', '  constructor() { this.n = 0; }', '  up() { this.n++; return this; }', '}', 'console.log(new Counter().up().up().n);'], '2', 'Returning this lets calls be chained.'),
    p('extends', ['class A { hi() { return "A"; } }', 'class B extends A { hi() { return "B" + super.hi(); } }', 'console.log(new B().hi());'], 'BA', 'B’s hi calls the parent’s hi with super.'),
    quiz({ prompt: 'What does the constructor do?', options: ['Sets up each new object when you call new', 'Deletes the object', 'Runs once for the whole class', 'Makes the class private'], right: 'Right. It runs every time new is used.', wrong: 'constructor runs for each new object and sets its starting data.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'p.name should be "Ava". Tap the buggy line.', lang: 'javascript', lines: ['class Player {', '  constructor(name) { name = name; }', '}', 'const p = new Player("Ava");', 'console.log(p.name);'], bug: 1, fix: '  constructor(name) { this.name = name; }', explain: 'Store it on the object with this.name; name = name does nothing.' }),
  ],
  'j-error-1': [
    p('Catch the name', ['try {', '  undefinedFunction();', '} catch (e) {', '  console.log(e.name);', '}'], 'ReferenceError', 'Calling a name that doesn’t exist is a ReferenceError.'),
    p('Your own error', ['try {', '  throw new Error("No seats");', '} catch (e) {', '  console.log(e.message);', '}'], 'No seats', 'The message you gave is in e.message.'),
    p('finally', ['function f() {', '  try { return "try"; } finally { console.log("finally"); }', '}', 'console.log(f());'], 'finally\ntry', 'finally runs before the function actually returns.', ['finally try']),
    quiz({ prompt: 'JSON.parse("{bad") throws which error?', options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'], right: 'Right. The text isn’t valid JSON syntax.', wrong: 'Invalid JSON is a SyntaxError.', mono: true }),
  ],
  'j-dom-1': [
    quiz({ prompt: 'Which property changes the text inside an element safely?', options: ['textContent', 'innerHTML', 'value', 'style'], right: 'Right. textContent treats the text as text, not HTML.', wrong: 'textContent sets plain text. innerHTML would run any HTML in it, which can be unsafe with user input.' }),
    quiz({ prompt: 'A form reloads the page when submitted. What stops that?', options: ['event.preventDefault()', 'return false from a variable', 'event.stop()', 'Removing the button'], right: 'Right. Call it at the start of the submit handler.', wrong: 'event.preventDefault() cancels the browser’s default reload.', mono: true }),
    p('Stringify', ['console.log(JSON.stringify({ seats: 2, ok: true }));'], '{"seats":2,"ok":true}', 'JSON uses double quotes around keys and strings.'),
    quiz({ prompt: 'What should never be stored in localStorage?', options: ['Passwords and secret tokens', 'A theme choice', 'A draft message', 'The last search'], right: 'Right. Any script on the page can read localStorage.', wrong: 'localStorage is readable by any script on the page, so keep secrets out of it.' }),
  ],
  'j-async-1': [
    quiz({ prompt: 'What does an async function always return?', options: ['A Promise', 'undefined', 'The value directly', 'An error'], right: 'Right. Use await or .then to get the value.', wrong: 'async functions wrap their result in a Promise.' }),
    quiz({ prompt: 'Order? setTimeout(() => log("T"), 0); queueMicrotask(() => log("M")); log("S");', options: ['S M T', 'T M S', 'S T M', 'M S T'], right: 'Right. Sync, then microtasks, then timers.', wrong: 'Synchronous code first (S), then microtasks (M), then timer callbacks (T).', mono: true }),
    quiz({ prompt: 'How do you run two independent requests at the same time and wait for both?', options: ['await Promise.all([a(), b()])', 'await a(); await b();', 'a() + b()', 'setTimeout(a, b)'], right: 'Right. Promise.all starts both and waits for both.', wrong: 'Awaiting one after the other waits twice. Promise.all runs them together.', mono: true }),
    p('then', ['const out = [];', 'Promise.resolve(1).then((v) => out.push(v));', 'out.push(2);', 'console.log(out);'], '[2]', 'The then callback runs after the current code finishes, so when logging only 2 is in the array.'),
  ],
};
