// JavaScript track · Module 11 · Errors and Debugging. Lesson 11.1 keeps the old errors module id (j-error-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M11: Lesson[] = [
  lesson('j-error-1', 'Reading errors', 5, [
    chat(['Every programmer sees errors all day. The skill isn’t avoiding them, it’s reading them.', 'An error message tells you what went wrong and roughly where. Let’s read some.']),
    run('Break it on purpose', 'Pick a line. Each one fails differently.', ['const menu = ["Tea", "Coffee"];', 'try {', '  {{v}};', '} catch (err) {', '  console.log(err.name + ": " + err.message);', '}'], ['console.log(menuu)', 'menu.push("Toast").length', 'null.price', 'JSON.parse("{bad}")', 'console.log(menu[0])'], { caption: 'The last one works, so nothing is caught and Tea prints.' }),
    reveal('The common error types', [
      ['ReferenceError', 'A name that doesn’t exist: a typo, or used outside its scope.'],
      ['TypeError', 'The right name, the wrong kind of value: calling something that isn’t a function, reading from null.'],
      ['SyntaxError', 'The code itself is broken: a missing bracket or quote. Nothing runs at all.'],
      ['RangeError', 'A number out of range, like an array of length -1.'],
    ], { mono: true }),
    matchUp('Name the error', [['console.log(totl)', 'ReferenceError'], ['null.price', 'TypeError'], ['if (x {', 'SyntaxError'], ['new Array(-1)', 'RangeError']], 'The error name is the first clue.'),
    check('“TypeError: Cannot read properties of undefined (reading \'price\')”. What happened?', ['Something before .price was undefined', 'price was misspelt in a string', 'The file is missing', 'The maths was wrong'], 'You wrote x.price, and x was undefined.', 'Look at what is left of .price.', { mono: false }),
    tapbug('ReferenceError: totl is not defined', ['const total = 120;', 'console.log(totl);'], [[2, 'totl', 'total']], 'A typo makes a name that doesn’t exist.'),
    recap([
      ['🏷', 'The error name says what kind of mistake'],
      ['💬', 'The message says what exactly'],
      ['📍', 'The line number says where to look'],
    ]),
  ]),

  lesson('js-11-2', 'try, catch, finally', 5, [
    toggleRun('Without and with try', [
      ['Crash', ['const data = JSON.parse("{bad}");', 'console.log("Never printed");'], 'One bad line stops the whole program.', ['SyntaxError: Expected property name or \'}\' in JSON at position 1 (line 1 column 2)']],
      ['Handled', ['try {', '  JSON.parse("{bad}");', '} catch (err) {', '  console.log("Couldn’t read the order");', '} finally {', '  console.log("Next customer");', '}'], 'catch runs instead of crashing, and finally runs either way.', ['Couldn’t read the order', 'Next customer']],
    ]),
    predict('Which lines run?', ['let status2 = "start";', 'try {', '  status2 = "trying";', '  JSON.parse("oops");', '  status2 = "parsed";', '} catch (err) {', '  status2 = "caught";', '}', 'console.log(status2);'], [
      [7, 'JSON.parse failed, so the line after it was skipped. What will status2 be now?', ['"caught"', '"parsed"', '"trying"'], 'Execution jumps straight from the error to catch.', { var: 'status2' }],
    ]),
    place('Catch it', 'Finish the safety net.', [[{ gap: 0 }, ' {'], ['  JSON.parse("{bad}");'], ['} ', { gap: 1 }, ' (err) {'], ['  console.log("Bad data:", err.name);'], ['}']], ['try', 'catch', 'if', 'else', 'error'], ['try', 'catch'], 'try the risky part; catch handles the error.'),
    check('When does finally run?', ['Always, error or not', 'Only after an error', 'Only when there is no error', 'Never'], 'Good for clean-up, like hiding a loading spinner.', 'Its name is a clue.'),
    tapbug('ReferenceError: err is not defined', ['try {', '  JSON.parse(text);', '} catch {', '  console.log(err.message);', '}'], [[3, 'catch {', 'catch (err) {']], 'To use the error, name it: catch (err) { … }.'),
    recap([
      ['🥅', 'try { risky } catch (err) { handle }'],
      ['⏭', 'After an error, the rest of try is skipped'],
      ['🧹', 'finally always runs'],
    ]),
  ]),

  lesson('js-11-3', 'throw your own errors', 5, [
    run('Check the quantity', 'Pick how many cups the customer asked for.', ['function order(cups) {', '  if (!Number.isInteger(cups) || cups < 1) {', '    throw new Error("Cups must be a whole number, 1 or more");', '  }', '  return `Order: ${cups} cups`;', '}', 'try {', '  console.log(order({{v}}));', '} catch (err) {', '  console.log("⚠ " + err.message);', '}'], ['2', '0', '-3', '1.5', '"two"'], { caption: 'throw stops the function and sends the error to the nearest catch.' }),
    reveal('Why throw?', [
      ['Fail early', 'Stop bad data at the door instead of getting a wrong bill later.'],
      ['Clear messages', 'Your own message says exactly what was wrong.'],
      ['new Error("…")', 'Always throw an Error object; it carries a name, a message and where it happened.'],
    ]),
    predict('The error travels up', ['function check(cups) {', '  if (cups < 1) throw new Error("Too few");', '  return cups;', '}', 'let msg = "ok";', 'try {', '  check(0);', '} catch (err) {', '  msg = err.message;', '}', 'console.log(msg);'], [
      [9, 'check(0) threw. What will msg become?', ['"Too few"', '"ok"', '"0"'], 'The throw jumped out of check and into the catch.', { var: 'msg' }],
    ]),
    tapbug('The error has no message', ['if (cups < 1) {', '  throw "bad";', '}'], [[2, '"bad"', 'new Error("Cups must be 1 or more")']], 'Throw an Error object with a clear message, not a bare string.'),
    check('What happens to the lines after throw in the same function?', ['They are skipped', 'They run first', 'They run twice', 'They become comments'], 'throw leaves the function straight away.', 'Like return, but for errors.'),
    recap([
      ['🚨', 'throw new Error("…") stops and reports'],
      ['🥅', 'The nearest catch receives it'],
      ['✅', 'Check input early with clear messages'],
    ]),
  ]),

  lesson('js-11-4', 'Debugging', 5, [
    chat(['Debugging means finding out what your program really does, not what you hoped it does.', 'The console is your torch.']),
    run('Console tools', 'Pick one.', ['const cart = [{ dish: "Tea", price: 40 }, { dish: "Toast", price: 80 }];', '{{v}}'], ['console.log("cart:", cart)', 'console.log(cart.length, typeof cart)', 'console.error("Price missing!")', 'console.log(JSON.stringify(cart, null, 1))'], { caption: 'In a real browser, console.table(cart) draws a neat table, and console.error shows in red.' }),
    reveal('A debugging routine', [
      ['1. Read the error', 'Name, message, line.', '📖'],
      ['2. Log what you think is true', 'console.log the variables just before the problem.', '🔦'],
      ['3. Shrink it', 'Comment out half the code; does the bug stay?', '✂️'],
      ['4. Breakpoints', 'In a computer browser’s DevTools, click a line number to pause there and look at every variable. The debugger; statement does the same in code.', '⏸'],
    ]),
    predict('Find where it goes wrong', ['const prices = ["40", "60"];', 'let total = 0;', 'for (const p of prices) {', '  total = total + p;', '}', 'console.log(total);'], [
      [4, 'First round: p is "40", a string. What will total be?', ['"040"', '40', '0'], '0 + "40" joins text! The prices are strings: convert with Number(p).', { var: 'total' }],
    ]),
    tapbug('Total: 04060', ['const prices = ["40", "60"];', 'let total = 0;', 'for (const p of prices) total = total + p;'], [[3, 'total + p', 'total + Number(p)']], 'The prices are text. Convert them before adding.'),
    recap([
      ['🔦', 'console.log what you think is true'],
      ['⏸', 'Breakpoints pause and show every variable'],
      ['✂️', 'Shrink the problem until it is obvious'],
    ]),
  ]),

  lesson('js-11-5', 'Common mistakes', 5, [
    reveal('Five classic slips', [
      ['= instead of ===', 'if (x = 5) stores 5; it doesn’t compare.'],
      ['Adding strings', '"40" + 60 is "4060".'],
      ['Missing return', 'The function gives undefined.'],
      ['this in an arrow', 'Arrows don’t have their own this.'],
      ['Off by one', 'i <= list.length goes one past the end.'],
    ], { mono: true }),
    toggleRun('Off by one', [
      ['<=', ['const menu = ["Tea", "Coffee"];', 'for (let i = 0; i <= menu.length; i++) {', '  console.log(`${i}: ${menu[i]}`);', '}'], 'One round too many: menu[2] doesn’t exist.', ['0: Tea', '1: Coffee', '2: undefined']],
      ['<', ['const menu = ["Tea", "Coffee"];', 'for (let i = 0; i < menu.length; i++) {', '  console.log(`${i}: ${menu[i]}`);', '}'], 'Positions go from 0 to length - 1.', ['0: Tea', '1: Coffee']],
    ]),
    truth([
      ['if (x = 5) compares x with 5', false, 'It stores 5. Use ===.'],
      ['"40" + 60 gives 100', false, 'It gives "4060".'],
      ['A function without return gives undefined', true, 'Always return the answer.'],
      ['Arrays go from 0 to length - 1', true, 'So loop with i < length.'],
    ]),
    check('Which loop visits every item of list exactly once?', ['for (let i = 0; i < list.length; i++)', 'for (let i = 1; i <= list.length; i++)', 'for (let i = 0; i <= list.length; i++)', 'for (let i = 1; i < list.length; i++)'], 'From 0, while i < length.', 'Start at 0, stop before length.'),
    tapbug('Everyone gets free delivery', ['const bill = 100;', 'if (bill = 300) console.log("Free");'], [[2, '=', '>=']], 'One = stores 300, which is truthy.'),
    recap([
      ['🟰', 'Compare with ===, never ='],
      ['🔢', 'Convert text before maths'],
      ['📏', 'Loop with i < length'],
    ]),
  ]),

  lesson('js-11-6', 'Clean code', 5, [
    toggleRun('Messy or clean?', [
      ['Messy', ['var a = [40, 60, 80], b = 0;', 'for (var i = 0; i < a.length; i++) { b = b + a[i] }', 'console.log(b)'], 'It works, but what are a and b?', ['180']],
      ['Clean', ['const prices = [40, 60, 80];', 'const total = prices.reduce((sum, p) => sum + p, 0);', 'console.log(total);'], 'Clear names, const, and one obvious step.', ['180']],
    ]),
    reveal('Habits of clean code', [
      ['Names that explain', 'totalPrice, not tp.', '🏷'],
      ['const first', 'let only when it changes; never var.', '🔒'],
      ['Small functions', 'One job each, named after that job.', '🧩'],
      ['=== always', 'And semicolons, and consistent quotes.', '🟰'],
      ['A style guide', 'Teams agree on rules, and tools like Prettier and ESLint check them.', '📏'],
    ]),
    reveal('Fast code, simply', [
      ['Don’t repeat work in loops', 'Read list.length or query the page once, outside the loop.'],
      ['Change the page in one go', 'Build the whole list, then add it once.'],
      ['Load less', 'Fewer, smaller scripts load faster on mobile data.'],
    ]),
    matchUp('Better names', [['x', 'cupCount'], ['tp', 'totalPrice'], ['flag', 'isOpen'], ['fn1', 'addGst']], 'A good name makes a comment unnecessary.'),
    check('Which is the best variable name for whether the café is open?', ['isOpen', 'x', 'open1', 'flagVar'], 'Booleans read well as is…/has….', 'It should read like a question.'),
    recap([
      ['🏷', 'Names that explain'],
      ['🔒', 'const first, small functions'],
      ['📏', 'Agree a style; let tools check it'],
    ]),
  ]),

  challenge('js-11-ch', 'Module 11 Challenge', { icon: '🐞', name: 'Bug Hunter' }, ['Read error messages and find the line', 'Handle errors with try, catch, finally and throw', 'Debug with the console and avoid common mistakes'], [
    mcq(1, 'Which error means a name doesn’t exist?', ['ReferenceError', 'TypeError', 'SyntaxError', 'RangeError'], 'Usually a typo.', { mono: true }),
    mcq(2, 'What runs after an error inside try?', ['The catch block', 'The next line in try', 'Nothing at all', 'The whole try again'], 'The rest of try is skipped.'),
    mcq(3, 'What should you throw?', ['new Error("clear message")', 'A number', 'Nothing', 'console.log'], 'An Error object with a message.', { mono: true }),
    mcq(4, 'What does "40" + 60 give?', ['"4060"', '100', 'NaN', '"100"'], 'A string with + joins.', { mono: true }),
    mcq(5, 'Which loop condition goes one past the end?', ['i <= list.length', 'i < list.length', 'i < list.length - 1', 'i >= 0'], 'The last position is length - 1.', { mono: true }),
    swipe([
      ['SyntaxError means nothing in that script runs', true, 'The code can’t even be read.'],
      ['finally runs only when there is an error', false, 'It always runs.'],
      ['console.log is a good way to check values', true, 'Log what you think is true.'],
      ['Short names like x make code clearer', false, 'Names should explain.'],
    ]),
    pairs([['TypeError', 'Wrong kind of value'], ['try', 'Attempt something risky'], ['throw', 'Report your own error'], ['debugger;', 'Pause here in DevTools']], 'Error and debugging tools.'),
    pickCode('Which safely reads JSON that might be broken?', ['try { data = JSON.parse(text); } catch (err) { data = null; }', 'data = JSON.parse(text) || null;', 'if (JSON.parse(text)) data = text;', 'catch { data = JSON.parse(text); }'], 'Parsing can throw, so wrap it in try/catch.'),
    bugTask(['function bill(cups) {', '  if (cups < 1) throw "bad";', '  cups * 40;', '}', 'console.log(bil(2));'], [[2, '"bad"', 'new Error("Cups must be 1 or more")'], [3, 'cups * 40;', 'return cups * 40;'], [5, 'bil', 'bill']], 'Throw Error objects, return the answer, and spell names right.'),
    predictTask(['let log = "";', 'try {', '  log += "A";', '  JSON.parse("{");', '  log += "B";', '} catch (err) {', '  log += "C";', '} finally {', '  log += "D";', '}', 'console.log(log);'], 'What does it print?', ['ACD', 'ABD', 'ABCD', 'AD'], 'A runs, the parse fails so B is skipped, C catches, D always runs.'),
    arrange(['const typed = "abc";', 'const cups = Number(typed);', 'const ok = Number.isInteger(cups);', 'console.log(ok ? `${cups} cups` : "Please type a number");'], 'take the typed text, convert it, check it, then print a friendly message', ['Please type a number']),
  ]),
];
