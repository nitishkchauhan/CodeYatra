// JavaScript track · Module 4 · Decisions. Lesson 4.1 keeps the old decisions module id (j-cond-1).
import type { Lesson } from '../../types';
import { UI } from './cafe';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, tapPage, toggleRun } from './kit';

export const JS_M4: Lesson[] = [
  lesson('j-cond-1', 'if and else', 5, [
    chat(['Rosa gives free delivery on bills of ₹300 or more. Smaller bills pay ₹30.', 'Programs make choices like this with if and else.']),
    run('Free delivery?', 'Pick a bill.', ['const bill = {{v}};', 'if (bill >= 300) {', '  console.log("Free delivery");', '} else {', '  console.log("Delivery ₹30");', '}'], ['120', '300', '450', '299'], { caption: 'The condition in ( ) is checked. True runs the first block; false runs the else block.' }),
    reveal('The parts of an if', [
      ['if (condition)', 'Ask a true-or-false question.'],
      ['{ … }', 'The block that runs when it is true.'],
      ['else { … }', 'Runs when it is false. Optional.'],
      ['else if (…)', 'Ask another question if the first was false.'],
    ], { mono: true }),
    predict('Which path?', ['const bill = 180;', 'let delivery = 30;', 'if (bill >= 300) {', '  delivery = 0;', '} else if (bill >= 150) {', '  delivery = 15;', '}', 'console.log("Delivery:", delivery);'], [
      [6, 'bill is 180: not 300 or more, but 150 or more. What will delivery become?', ['15', '0', '30'], 'The else if branch runs, so delivery becomes 15.', { var: 'delivery' }],
      [8, 'What will it print?', ['Delivery: 15', 'Delivery: 30', 'Delivery: 0'], 'The else if block ran.', { out: true }],
    ]),
    tapbug('Free delivery for everyone', ['const bill = 120;', 'if (bill > 300); {', '  console.log("Free delivery");', '}'], [[2, ';', '']], 'The ; ends the if straight away, so the block below always runs. No semicolon after if ( … ).'),
    recap([
      ['❓', 'if (condition) { … } runs when true'],
      ['↩️', 'else runs when false'],
      ['🪜', 'else if asks the next question'],
    ]),
  ]),

  lesson('js-4-2', 'The ternary', 4, [
    toggleRun('if/else or ternary?', [
      ['if / else', ['const bill = 350;', 'let msg;', 'if (bill >= 300) {', '  msg = "Free delivery";', '} else {', '  msg = "Delivery ₹30";', '}', 'console.log(msg);'], 'Six lines to choose between two values.', ['Free delivery']],
      ['ternary', ['const bill = 350;', 'const msg = bill >= 300 ? "Free delivery" : "Delivery ₹30";', 'console.log(msg);'], 'condition ? ifTrue : ifFalse. One line, for choosing a value.', ['Free delivery']],
    ]),
    run('Veg or not?', 'Pick a dish.', ['const veg = {{v}};', 'console.log(veg ? "🟢 Veg" : "🔴 Non-veg");'], ['true', 'false'], { caption: 'Read it as: is veg true? then this : otherwise that.' }),
    place('Pick the label', 'Show “Open” when isOpen is true, otherwise “Closed”.', [['const isOpen = true;'], ['console.log(isOpen ', { gap: 0 }, ' "Open" ', { gap: 1 }, ' "Closed");']], ['?', ':', '!', '&&'], ['?', ':'], 'condition ? whenTrue : whenFalse.'),
    check('What does 5 > 3 ? "yes" : "no" give?', ['"yes"', '"no"', 'true', '5'], '5 > 3 is true, so the first value.', 'Is 5 > 3 true?'),
    tapbug('SyntaxError: Unexpected string', ['const msg = isOpen ? "Open" "Closed";'], [[1, '"Open" "Closed"', '"Open" : "Closed"']], 'A ternary needs both parts: ? before the true value and : before the false one.'),
    recap([
      ['❓', 'cond ? a : b picks one of two values'],
      ['📏', 'Great for short choices'],
      ['🧱', 'Use if/else for longer blocks'],
    ]),
  ]),

  lesson('js-4-3', 'switch', 5, [
    run('Today’s special', 'Pick a day.', ['const day = "{{v}}";', 'switch (day) {', '  case "Sat":', '  case "Sun":', '    console.log("Pancakes");', '    break;', '  case "Wed":', '    console.log("Cold coffee");', '    break;', '  default:', '    console.log("Cheese toast");', '}'], ['Mon', 'Wed', 'Sat', 'Sun'], { caption: 'switch compares with ===. Two cases can share one block. default catches everything else.' }),
    reveal('Parts of a switch', [
      ['switch (value)', 'The value to compare.'],
      ['case "Wed":', 'Runs if the value === "Wed".'],
      ['break', 'Stop here. Without it, the next case runs too.'],
      ['default:', 'Runs when nothing matched.'],
    ], { mono: true }),
    toggleRun('Forgetting break', [
      ['With break', ['const size = "small";', 'switch (size) {', '  case "small":', '    console.log("₹40");', '    break;', '  case "large":', '    console.log("₹60");', '}'], 'Stops after the right case.', ['₹40']],
      ['Without break', ['const size = "small";', 'switch (size) {', '  case "small":', '    console.log("₹40");', '  case "large":', '    console.log("₹60");', '}'], 'It “falls through” and runs the next case as well.', ['₹40', '₹60']],
    ]),
    tapbug('Small coffees cost two prices', ['switch (size) {', '  case "small":', '    console.log("₹40");', '  case "large":', '    console.log("₹60");', '}'], [[3, 'console.log("₹40");', 'console.log("₹40"); break;']], 'Without break, the program falls through into the next case.'),
    check('When does default run?', ['When no case matched', 'Always, first', 'Only on Sundays', 'When there is an error'], 'default is the “anything else” branch.', 'It’s the fallback.'),
    recap([
      ['🔀', 'switch compares one value against many cases'],
      ['🛑', 'break stops the fall-through'],
      ['🧺', 'default catches the rest'],
    ]),
  ]),

  lesson('js-4-4', 'Control flow', 4, [
    chat(['Control flow is the path a program takes: top to bottom, but jumping past blocks that don’t apply.', 'Let’s follow a real order as it decides what to do.']),
    tapPage('Order checker', 'Change the bill and tap Check.', { html: '<label>Bill ₹ <input id="bill" type="number" value="120"></label>\n<button id="go">Check</button>\n<p id="msg" class="muted">…</p>', css: UI, js: 'document.querySelector("#go").addEventListener("click", () => {\n  const bill = Number(document.querySelector("#bill").value);\n  let msg;\n  if (bill <= 0) {\n    msg = "Please enter a bill";\n  } else if (bill >= 300) {\n    msg = "Free delivery";\n  } else {\n    msg = "Delivery ₹30";\n  }\n  document.querySelector("#msg").textContent = msg;\n  console.log(bill + " → " + msg);\n});' }, 'Free delivery', [{ type: ['#bill', '450'] }, { click: '#go' }], 'Try 0, 120 and 450. Each takes a different path through the same code.'),
    matchUp('Which branch runs?', [['bill = 0', 'Please enter a bill'], ['bill = 120', 'Delivery ₹30'], ['bill = 300', 'Free delivery']], 'The first condition that is true wins; the rest are skipped.'),
    check('In an if / else if / else chain, how many blocks run?', ['Exactly one', 'All the true ones', 'None', 'Always the else'], 'The first true condition runs, and the rest are skipped.', 'Think about the jumps.', { mono: false }),
    tapbug('SyntaxError: Unexpected token', ['if (bill >= 300) {', '  msg = "Free delivery";', '} else (bill >= 150) {', '  msg = "Delivery ₹15";', '}'], [[3, 'else (bill >= 150)', 'else if (bill >= 150)']], 'A second question needs else if. Plain else never takes a condition.'),
    recap([
      ['🧭', 'Programs run top to bottom, skipping blocks'],
      ['🥇', 'In an if chain, the first true branch wins'],
      ['🧪', 'Test every path with different values'],
    ]),
  ]),

  challenge('js-4-ch', 'Module 4 Challenge', { icon: '🔀', name: 'Decision Maker' }, ['Make choices with if, else if and else', 'Pick values with the ternary', 'Handle many cases with switch'], [
    mcq(1, 'When does an else block run?', ['When the if condition is false', 'Always', 'When the if condition is true', 'Never'], 'else is the false path.'),
    mcq(2, 'What does age >= 18 ? "Adult" : "Minor" give when age is 18?', ['"Adult"', '"Minor"', 'true', '18'], '18 >= 18 is true.', { mono: true }),
    mcq(3, 'What does break do in a switch?', ['Stops the switch', 'Skips one case', 'Restarts it', 'Causes an error'], 'Without it, the next case runs too.'),
    mcq(4, 'How does switch compare values?', ['With ===', 'With ==', 'With >', 'With typeof'], 'Strict equality.'),
    mcq(5, 'In an if / else if chain, which block runs?', ['The first one whose condition is true', 'The last true one', 'Every true one', 'The else, always'], 'The rest are skipped.'),
    swipe([
      ['default runs when no case matches', true, 'It’s the fallback.'],
      ['if (x = 5) checks whether x is 5', false, 'One = stores 5. Use ===.'],
      ['A ternary returns a value', true, 'That’s why it fits in one line.'],
      ['A semicolon right after if ( … ) is harmless', false, 'It ends the if, so the block always runs.'],
    ]),
    pairs([['if', 'Ask a question'], ['else', 'The false path'], ['? :', 'Choose a value'], ['default', 'No case matched']], 'The tools for making choices.'),
    pickCode('Which prints “Open” only before 9 pm (hour < 21)?', ['if (hour < 21) { console.log("Open"); }', 'if (hour < 21); { console.log("Open"); }', 'if hour < 21 { console.log("Open"); }', 'if (hour => 21) { console.log("Open"); }'], 'Brackets around the condition, and no semicolon before the block.'),
    bugTask(['const day = "Sun";', 'switch (day) {', '  case "Sun":', '    console.log("Pancakes")', '  case "Mon":', '    console.log("Toast");', '}', 'if (day = "Mon") {}'], [[4, 'console.log("Pancakes")', 'console.log("Pancakes"); break;'], [8, '=', '===']], 'A missing break falls through, and one = stores instead of comparing.'),
    predictTask(['const bill = 260;', 'let delivery = 30;', 'if (bill >= 300) {', '  delivery = 0;', '} else if (bill >= 250) {', '  delivery = 10;', '}', 'console.log("Delivery:", delivery);'], 'What does it print?', ['Delivery: 10', 'Delivery: 30', 'Delivery: 0', 'Delivery: 260'], '260 isn’t 300 or more, but it is 250 or more.'),
    arrange(['const hour = 22;', 'const isOpen = hour >= 7 && hour < 21;', 'const sign = isOpen ? "Open" : "Closed";', 'console.log(sign);'], 'set the hour, work out isOpen, choose the sign, then print it', ['Closed']),
  ]),
];
