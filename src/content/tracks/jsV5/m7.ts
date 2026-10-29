// JavaScript track · Module 7 · Functions. Lessons 7.1 and 7.3 keep the old functions and arrow-function module ids
// (j-fn-1, j-arrow-1).
import type { Lesson } from '../../types';
import { UI } from './cafe';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, tapPage, toggleRun, truth } from './kit';

export const JS_M7: Lesson[] = [
  lesson('j-fn-1', 'Functions', 5, [
    chat(['Riya works out a bill many times a day: price × cups, plus 5% GST.', 'Instead of writing that maths everywhere, wrap it in a function once and call it by name.']),
    reveal('The parts of a function', [
      ['function bill(price, cups)', 'A name, and parameters: the inputs it needs.'],
      ['{ … }', 'The body: the steps.'],
      ['return price * cups;', 'Sends a value back to whoever called it.'],
      ['bill(40, 3)', 'Calling it: the arguments 40 and 3 go into price and cups.'],
    ], { mono: true }),
    run('Call it', 'Pick a call.', ['function bill(price, cups) {', '  return price * cups * 1.05;', '}', 'console.log({{v}});'], ['bill(40, 3)', 'bill(60, 2)', 'bill(80, 1)', 'bill(40)'], { caption: 'bill(40) gives NaN: cups is undefined, and maths with undefined is NaN.' }),
    predict('Into the function and back', ['function total(price, cups) {', '  const sum = price * cups;', '  return sum;', '}', 'const tea = total(40, 3);', 'console.log("Tea:", tea);'], [
      [2, 'Inside the call total(40, 3): what will sum be?', ['120', '43', '40'], 'price is 40 and cups is 3.', { var: 'sum' }],
      [6, 'What will it print?', ['Tea: 120', 'Tea: sum', 'Tea: undefined'], 'return sent 120 back, and it was stored in tea.', { out: true }],
    ]),
    place('Write the function', 'Finish a function that adds GST.', [[{ gap: 0 }, ' withGst(amount) {'], ['  ', { gap: 1 }, ' amount * 1.05;'], ['}'], ['console.log(withGst(200));']], ['function', 'return', 'const', 'print', 'console.log'], ['function', 'return'], 'function starts it, and return sends the answer back: 210.'),
    tapbug('It prints undefined', ['function double(n) {', '  n * 2;', '}', 'console.log(double(4));'], [[2, 'n * 2;', 'return n * 2;']], 'Without return, a function gives back undefined.'),
    recap([
      ['🛠', 'function name(params) { … } packages steps'],
      ['📥', 'Arguments fill the parameters'],
      ['📤', 'return sends a value back'],
    ]),
  ]),

  lesson('js-7-2', 'Parameters and defaults', 4, [
    run('A default value', 'Pick a call. cups defaults to 1.', ['function order(dish, cups = 1) {', '  return `${cups} × ${dish}`;', '}', 'console.log({{v}});'], ['order("Tea")', 'order("Tea", 3)', 'order()', 'order("Coffee", 0)'], { caption: 'The default is used only when the argument is missing (undefined). 0 is passed on as 0.' }),
    toggleRun('Any number of inputs', [
      ['Fixed', ['function sum(a, b) {', '  return a + b;', '}', 'console.log(sum(40, 60, 80));'], 'Only two parameters, so the 80 is ignored.', ['100']],
      ['Rest ...', ['function sum(...prices) {', '  let t = 0;', '  for (const p of prices) t += p;', '  return t;', '}', 'console.log(sum(40, 60, 80));'], '...prices collects every argument into an array.', ['180']],
    ]),
    predict('Defaults step by step', ['function greet(who = "friend") {', '  const msg = `Hi, ${who}!`;', '  return msg;', '}', 'console.log(greet());', 'console.log(greet("Riya"));'], [
      [2, 'greet() was called with nothing. What will msg be?', ['"Hi, friend!"', '"Hi, undefined!"', '"Hi, !"'], 'who used its default, "friend".', { var: 'msg' }],
      [2, 'Now greet("Riya") runs. What will msg be this time?', ['"Hi, Riya!"', '"Hi, friend!"', '"Hi, who!"'], 'An argument was given, so the default isn’t used.', { var: 'msg' }],
    ]),
    check('What does function f(x = 5) { return x; } give for f(0)?', ['0', '5', 'undefined', 'NaN'], 'Defaults only replace undefined. 0 is a real value.', 'Is 0 missing?'),
    tapbug('cups is always 1', ['function order(dish, cups = 1) {', '  return cups;', '}', 'console.log(order(3, "Tea"));'], [[4, 'order(3, "Tea")', 'order("Tea", 3)']], 'Arguments fill parameters in order: the first goes to dish, the second to cups.'),
    recap([
      ['🎚', 'Defaults: (cups = 1)'],
      ['🧺', 'Rest: (...prices) collects them all'],
      ['🔢', 'Arguments fill parameters in order'],
    ]),
  ]),

  lesson('j-arrow-1', 'Function expressions and arrows', 5, [
    toggleRun('Three ways to write one function', [
      ['declaration', ['function gst(amount) {', '  return amount * 0.05;', '}', 'console.log(gst(200));'], 'The classic way.', ['10']],
      ['expression', ['const gst = function (amount) {', '  return amount * 0.05;', '};', 'console.log(gst(200));'], 'A function stored in a variable.', ['10']],
      ['arrow', ['const gst = (amount) => amount * 0.05;', 'console.log(gst(200));'], 'Short: (params) => value. With one line, the value is returned automatically.', ['10']],
    ]),
    reveal('Reading arrows', [
      ['(a, b) => a + b', 'Two inputs, returns their sum.'],
      ['x => x * 2', 'One input: brackets optional.'],
      ['() => "Hi"', 'No inputs.'],
      ['(x) => { … return y; }', 'With { }, you must write return yourself.'],
    ], { mono: true }),
    run('Arrow tryouts', 'Pick an arrow function.', ['const f = {{v}};', 'console.log(f(40));'], ['(p) => p * 3', '(p) => p > 50', '(p) => `₹${p}`', '(p) => { p * 2; }'], { caption: 'The last one has { } but no return, so it gives undefined.' }),
    place('Shorten it', 'Turn this into an arrow function.', [['const triple = ', { gap: 0 }, ' ', { gap: 1 }, ' n * 3;'], ['console.log(triple(5));']], ['(n)', '=>', 'function', '->', 'return'], ['(n)', '=>'], 'Parameters, an arrow, then the value: 15.'),
    tapbug('It prints undefined', ['const square = (n) => { n * n };', 'console.log(square(4));'], [[1, '{ n * n }', 'n * n']], 'With { }, an arrow needs return. Without them, the value is returned automatically.'),
    recap([
      ['🏹', '(params) => value'],
      ['📦', 'Functions can be stored in variables'],
      ['↩️', 'With { }, write return yourself'],
    ]),
  ]),

  lesson('js-7-4', 'Scope and hoisting', 5, [
    chat(['A variable made inside a function or a { } block lives only there. That’s scope.', 'It stops different parts of a big program accidentally sharing names.']),
    toggleRun('Where can a variable be seen?', [
      ['Inside', ['function brew() {', '  const water = "hot";', '  console.log(water);', '}', 'brew();'], 'Inside its own function: visible.', ['hot']],
      ['Outside', ['function brew() {', '  const water = "hot";', '}', 'brew();', 'console.log(water);'], 'Outside the function, water doesn’t exist.', ['ReferenceError: water is not defined']],
      ['Global', ['const shop = "Riya’s Café";', 'function sign() {', '  console.log(shop);', '}', 'sign();'], 'Variables made at the top level can be seen inside functions.', ['Riya’s Café']],
    ]),
    predict('Block scope', ['let msg = "outside";', 'if (true) {', '  let msg = "inside";', '  console.log(msg);', '}', 'console.log(msg);'], [
      [4, 'Inside the block, what will it print?', ['inside', 'outside', 'Error'], 'The block has its own msg.', { out: true }],
      [6, 'After the block, what will it print?', ['outside', 'inside', 'Error'], 'The inner msg is gone; the outer one was never changed.', { out: true }],
    ]),
    reveal('Hoisting and strict mode', [
      ['Function declarations are hoisted', 'You can call function brew() { … } above the line where it is written.'],
      ['let and const are not usable early', 'Using them before their line gives a ReferenceError.'],
      ['"use strict";', 'At the top of a file, it turns silent mistakes into errors. Modules and classes are strict already.'],
    ], { mono: true }),
    truth([
      ['A let inside { } can be used after the }', false, 'It only lives inside the block.'],
      ['Functions can read top-level variables', true, 'Outer variables are visible inside.'],
      ['You can call a function declaration before its line', true, 'Declarations are hoisted.'],
    ]),
    recap([
      ['📦', 'Variables live in their function or block'],
      ['🌍', 'Top-level variables are visible everywhere'],
      ['⬆️', 'Function declarations are hoisted'],
    ]),
  ]),

  lesson('js-7-5', 'Callbacks and closures', 6, [
    reveal('Passing functions around', [
      ['A callback', 'A function you hand to another function, for it to call later.'],
      ['Why', 'The same “do this to each item” code can do different jobs.'],
      ['Seen everywhere', 'Button taps, timers, array methods and loading data all use callbacks.'],
    ]),
    run('One loop, many jobs', 'Pick a callback to run on each price.', ['function each(prices, fn) {', '  for (const p of prices) console.log(fn(p));', '}', 'each([40, 60, 80], {{v}});'], ['(p) => p * 2', '(p) => `₹${p}`', '(p) => p >= 60 ? "big" : "small"'], { caption: 'each() never changes; the callback decides what happens.' }),
    chat(['A closure is a function that remembers the variables around it, even after the outer function has finished.', 'It’s how you make a counter that keeps its own private count.']),
    predict('A private counter', ['function makeCounter() {', '  let count = 0;', '  return () => {', '    count++;', '    return count;', '  };', '}', 'const nextToken = makeCounter();', 'const a = nextToken();', 'const b = nextToken();', 'console.log(a, b);'], [
      [4, 'First call: count starts at 0. What will it be after count++?', ['1', '0', '2'], 'count++ adds one.', { var: 'count' }],
      [4, 'Second call. makeCounter finished long ago, but the arrow still remembers count. What will it become?', ['2', '1', '0'], 'The arrow function closed over count, so it keeps going up: the program prints 1 2.', { var: 'count' }],
    ]),
    matchUp('Words to know', [['callback', 'A function passed in to be called later'], ['closure', 'A function that remembers its surroundings'], ['call, apply, bind', 'Ways to call a function with a chosen this'], ['IIFE', 'A function that runs as soon as it is made']], 'You will meet these words in real code.'),
    check('In fetchData(showMenu), what is showMenu?', ['A callback', 'A closure', 'A loop', 'A string'], 'It is passed in, to be called later.', 'It is a function handed over.'),
    recap([
      ['📨', 'A callback is a function you pass in'],
      ['🔒', 'A closure remembers its variables'],
      ['🧮', 'Closures make private counters'],
    ]),
  ]),

  lesson('js-7-6', 'Timers', 5, [
    reveal('Doing things later', [
      ['setTimeout(fn, 1000)', 'Run fn once, after 1000 ms (1 second).'],
      ['setInterval(fn, 1000)', 'Run fn every second until stopped.'],
      ['clearInterval(id)', 'Stop a repeating timer.'],
    ], { mono: true }),
    tapPage('Order countdown', 'Tap Start to count down to “Ready!”.', { html: '<p class="big" id="t">Tap Start</p>\n<button id="go">Start</button>', css: `${UI} .big { font-size: 32px; font-weight: bold; color: #C2410C; }`, js: 'document.querySelector("#go").addEventListener("click", () => {\n  let left = 3;\n  const t = document.querySelector("#t");\n  t.textContent = left;\n  const id = setInterval(() => {\n    left--;\n    if (left === 0) {\n      clearInterval(id);\n      t.textContent = "Ready!";\n      console.log("Ready!");\n    } else {\n      t.textContent = left;\n      console.log(left);\n    }\n  }, 300);\n});' }, 'Ready!', [{ click: '#go' }], 'setInterval runs every 300 ms here, and clearInterval stops it at zero.'),
    predict('Later means later', ['console.log("Order placed");', 'setTimeout(() => console.log("Tea ready"), 0);', 'console.log("Next customer");'], [
      [3, 'The timer has 0 ms. What does this line print?', ['Next customer', 'Tea ready', 'Nothing'], 'Even with 0 ms, a timer waits until the current code has finished.', { out: true }],
    ], 'Watch the order of the messages. (The timer’s message comes after the program ends.)'),
    check('How do you stop a setInterval?', ['clearInterval(id)', 'stopInterval()', 'setInterval(0)', 'break'], 'Keep the id that setInterval returns, and pass it to clearInterval.', 'clear…'),
    tapbug('The countdown never stops', ['const id = setInterval(tick, 1000);', 'function tick() {', '  left--;', '  if (left === 0) clearTimeout(tick);', '}'], [[4, 'clearTimeout(tick)', 'clearInterval(id)']], 'Stop an interval with clearInterval, and pass the id, not the function.'),
    recap([
      ['⏰', 'setTimeout: once, later'],
      ['🔁', 'setInterval: again and again'],
      ['🛑', 'clearInterval(id) stops it'],
    ]),
  ]),

  challenge('js-7-ch', 'Module 7 Challenge', { icon: '🛠', name: 'Function Builder' }, ['Write functions with parameters and return', 'Use arrow functions, defaults and callbacks', 'Understand scope, closures and timers'], [
    mcq(1, 'What does a function give back without return?', ['undefined', '0', 'null', 'An error'], 'No return means undefined.', { mono: true }),
    mcq(2, 'Which is an arrow function?', ['(a, b) => a + b', 'function => a + b', 'a + b =>', 'arrow(a, b)'], '(params) => value.', { mono: true }),
    mcq(3, 'What is a callback?', ['A function passed to another function', 'A phone call', 'A loop', 'A variable'], 'It is called back later.'),
    mcq(4, 'Where can a let made inside a function be used?', ['Only inside that function', 'Anywhere', 'Only before the function', 'In other files'], 'That’s scope.'),
    mcq(5, 'What does setTimeout(fn, 2000) do?', ['Runs fn once after 2 seconds', 'Runs fn every 2 seconds', 'Waits 2000 seconds', 'Runs fn twice'], '2000 ms is 2 seconds.'),
    swipe([
      ['Function declarations can be called before their line', true, 'They are hoisted.'],
      ['(x) => { x * 2 } returns x * 2', false, 'With { } you need return.'],
      ['A closure remembers variables from where it was made', true, 'That’s what makes counters work.'],
      ['setTimeout with 0 ms runs before the next line', false, 'It waits for the current code to finish.'],
    ]),
    pairs([['return', 'Send a value back'], ['(cups = 1)', 'A default'], ['...items', 'Collect the rest'], ['clearInterval', 'Stop a timer']], 'The building blocks of functions.'),
    pickCode('Which arrow adds GST of 5% to an amount?', ['const withGst = (amount) => amount * 1.05;', 'const withGst = amount => { amount * 1.05 };', 'const withGst = (amount) -> amount * 1.05;', 'function withGst => amount * 1.05;'], 'Parameters, =>, then the value.'),
    bugTask(['function bill(price, cups) {', '  price * cups;', '}', 'const twice = (n) => { n * 2 };'], [[2, 'price * cups;', 'return price * cups;'], [4, '{ n * 2 }', 'n * 2']], 'Both functions forget to return their value.'),
    predictTask(['function makeTokens(start) {', '  let next = start;', '  return () => next++;', '}', 'const token = makeTokens(10);', 'token();', 'token();', 'console.log("Next token:", token());'], 'What does it print?', ['Next token: 12', 'Next token: 10', 'Next token: 11', 'Next token: 13'], 'next++ gives the current value, then adds one: 10, 11, then 12.'),
    arrange(['const price = 40;', 'const bill = (cups) => price * cups;', 'const total = bill(3);', 'console.log(`Bill: ₹${total}`);'], 'a price, a bill function, call it for 3 cups, then print', ['Bill: ₹120']),
  ]),
];
