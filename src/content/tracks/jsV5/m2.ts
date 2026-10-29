// JavaScript track · Module 2 · Variables and Types. Lesson 2.1 keeps the old variables module id (j-var-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M2: Lesson[] = [
  lesson('j-var-1', 'Variables', 5, [
    chat(['Rosa’s app has to remember things: how many teas, the price, the customer’s table.', 'A variable is a labelled box that holds one value. You can look inside it, and (sometimes) put something new in.']),
    run('A box called teas', 'Pick a starting number. The program adds 2 more.', ['let teas = {{v}};', 'teas = teas + 2;', 'console.log("Teas:", teas);'], ['1', '5', '10', '0'], { caption: 'let teas = 1 makes the box. teas = teas + 2 reads it, adds 2 and puts the result back.' }),
    reveal('Making variables', [
      ['let', 'A box whose value can change later: let teas = 0;'],
      ['const', 'A box that keeps its first value: const price = 40;'],
      ['=', 'Means “put this value in the box”, not “is equal to”.'],
      ['Good names', 'teaCount, totalPrice, tableNumber: say what is inside. Start small, then a capital for each new word.'],
    ], { mono: true }),
    place('The bill', 'Make a price box that never changes and a count that can.', [[{ gap: 0 }, ' price = 40;'], [{ gap: 1 }, ' cups = 3;'], ['console.log("Bill:", price * ', { gap: 2 }, ');']], ['const', 'let', 'cups', 'var', 'price'], ['const', 'let', 'cups'], 'The price stays the same, so const. The number of cups can change, so let.'),
    check('What does = mean in let tea = 40;?', ['Put 40 into the box tea', 'tea is equal to 40, check it', 'Compare tea with 40'], 'One = stores a value. Comparing uses === (Module 3).', 'It isn’t a question.', { mono: false }),
    recap([
      ['📦', 'A variable is a labelled box for one value'],
      ['🔁', 'let can change, const can’t'],
      ['🏷', 'Name boxes after what they hold'],
    ]),
  ]),

  lesson('js-2-2', 'let, const and var', 4, [
    toggleRun('Three ways to make a box', [
      ['let', ['let teas = 1;', 'teas = 2;', 'console.log(teas);'], 'let can be changed, so this prints 2.', ['2']],
      ['const', ['const price = 40;', 'price = 50;', 'console.log(price);'], 'const can’t be changed. Trying stops the program with an error.', ['TypeError: Assignment to constant variable.']],
      ['var', ['var total = 0;', 'total = total + 40;', 'console.log(total);'], 'The old way, from before 2015. It has odd rules about where it can be seen, so modern code uses let and const.', ['40']],
    ]),
    reveal('Which one to use?', [
      ['Start with const', 'Most values never change. const makes that clear and stops accidents.', '🔒'],
      ['Use let when it changes', 'Counters, totals, anything that is updated.', '🔁'],
      ['Avoid var', 'You will see it in old code. Read it, but don’t write it.', '🕰'],
    ]),
    truth([
      ['const values can never be changed', true, 'You can’t put a new value in a const box.'],
      ['var is the modern choice', false, 'Use let and const.'],
      ['A counter should usually be let', true, 'Its value changes.'],
    ]),
    place('Pick the right box', 'The shop name never changes; the order count goes up.', [[{ gap: 0 }, ' shop = "Rosa’s Café";'], [{ gap: 1 }, ' orders = 0;'], ['orders = orders + 1;'], ['console.log(shop, orders);']], ['const', 'let', 'var'], ['const', 'let'], 'Fixed values get const; values that change get let.'),
    tapbug('TypeError: Assignment to constant variable.', ['const teas = 0;', 'teas = teas + 1;'], [[1, 'const', 'let']], 'teas changes, so it must be let. const boxes can’t be refilled.'),
    recap([
      ['🔒', 'const by default'],
      ['🔁', 'let for values that change'],
      ['🕰', 'var is old; avoid it'],
    ]),
  ]),

  lesson('js-2-3', 'Data types', 5, [
    reveal('Kinds of value', [
      ['String', 'Text in quotes: "Lemon Tea", \'Paris\'.', '🔤'],
      ['Number', 'Whole or decimal: 40, 2.5, -3.', '🔢'],
      ['Boolean', 'true or false: isOpen = true.', '✅'],
      ['undefined', 'A box with nothing put in it yet.', '❔'],
      ['null', 'Empty on purpose: “no table chosen”.', '⭕'],
      ['Object and array', '{ dish: "Tea", price: 40 } and ["Tea", "Coffee"]: values that hold other values (Modules 8 and 9).', '🗂'],
    ]),
    run('typeof', 'typeof tells you the kind of value. Tap one.', ['console.log(typeof {{v}});'], ['"Lemon Tea"', '40', 'true', 'undefined', 'null', '["Tea", "Coffee"]'], { caption: 'typeof null says "object". That’s a famous old mistake in JavaScript that can’t be fixed now. Arrays also say "object".' }),
    matchUp('Match the type', [['"40"', 'string'], ['40', 'number'], ['false', 'boolean'], ['undefined', 'undefined']], 'Quotes make text, even if it looks like a number.'),
    check('What is typeof "40"?', ['"string"', '"number"', '"boolean"', '"text"'], 'It is in quotes, so it is text: a string.', 'Look at the quotes.'),
    tapbug('The total is wrong: 4040', ['const price = "40";', 'console.log(price + 40);'], [[1, '"40"', '40']], 'The price is text, so + joins: "40" + 40 is "4040". Store numbers without quotes.'),
    recap([
      ['🔤', 'string, number, boolean'],
      ['❔', 'undefined: nothing yet; null: empty on purpose'],
      ['🔍', 'typeof shows the type'],
    ]),
  ]),

  lesson('js-2-4', 'Converting types', 6, [
    chat(['A text box on a page always gives you a string, even when the customer types 3.', 'So you often need to turn text into a number before doing maths.']),
    run('Text to number', 'The customer typed this many cups. Pick a conversion.', ['const typed = "3";', 'console.log({{v}});'], ['typed + 1', 'Number(typed) + 1', 'parseInt(typed) + 1', 'Number("three") + 1'], { caption: 'Number("three") is NaN: “not a number”. Any maths with NaN gives NaN.' }),
    predict('JavaScript converts on its own', ['const a = "5" + 2;', 'const b = "5" - 2;', 'console.log(a, b);'], [
      [1, 'What will a be?', ['"52"', '7', '"7"'], 'With a string, + joins text: "5" + "2".', { var: 'a' }],
      [2, 'What will b be?', ['3', '"52"', 'NaN'], '- only works on numbers, so "5" becomes 5 first.', { var: 'b' }],
    ]),
    reveal('Converting on purpose', [
      ['Number("40")', '40. Text to number.'],
      ['parseInt("40 cups")', '40. Reads digits from the start and stops.'],
      ['String(40)', '"40". Number to text. 40.toString() does the same.'],
      ['Number.isNaN(x)', 'Check for NaN before you use a number.'],
    ], { mono: true }),
    check('What does Number("12") + 3 give?', ['15', '"123"', '123', 'NaN'], 'Number turns "12" into 12 first.', 'Convert first, then add.'),
    recap([
      ['🔄', 'Number(), parseInt(), String() convert on purpose'],
      ['➕', 'A string with + joins text'],
      ['🚫', 'NaN means “not a number”'],
    ]),
  ]),

  challenge('js-2-ch', 'Module 2 Challenge', { icon: '📦', name: 'Value Keeper' }, ['Store values in let and const variables', 'Tell strings, numbers, booleans and empty values apart', 'Convert between text and numbers safely'], [
    mcq(1, 'Which variable can’t be given a new value?', ['const', 'let', 'var', 'All of them can'], 'const keeps its first value.', { mono: true }),
    mcq(2, 'What is typeof true?', ['"boolean"', '"string"', '"true"', '"number"'], 'true and false are booleans.', { mono: true }),
    mcq(3, 'What does "7" + 1 give?', ['"71"', '8', '"8"', 'NaN'], 'With a string, + joins.', { mono: true }),
    mcq(4, 'Which means “empty on purpose”?', ['null', 'undefined', '0', '""'], 'undefined means nothing was ever put there.', { mono: true }),
    mcq(5, 'What does Number("ten") give?', ['NaN', '10', '0', '"ten"'], 'It can’t read words as numbers.', { mono: true }),
    swipe([
      ['let can be changed later', true, 'That’s what let is for.'],
      ['"40" and 40 are the same type', false, 'One is a string, one is a number.'],
      ['typeof null is "object"', true, 'An old quirk of the language.'],
      ['= checks whether two things are equal', false, '= stores. === compares.'],
    ]),
    pairs([['"Paris"', 'string'], ['2.5', 'number'], ['false', 'boolean'], ['null', 'empty on purpose']], 'Every value has a type.'),
    pickCode('Which turns the typed text "4" into a number?', ['Number("4")', 'String("4")', 'typeof "4"', '"4".number'], 'Number() converts text to a number.'),
    bugTask(['const total = 0;', 'total = total + 40;', 'let 2cups = 2;'], [[1, 'const', 'let'], [3, '2cups', 'cups']], 'A total that changes must be let, and names can’t start with a digit.'),
    predictTask(['const typed = "2";', 'const cups = Number(typed) + 3;', 'console.log("Cups:", cups);'], 'What does it print?', ['Cups: 5', 'Cups: 23', 'Cups: NaN', 'Cups: "5"'], 'Number("2") is 2, plus 3 is 5.'),
    arrange(['const price = 40;', 'let cups = 2;', 'cups = cups + 1;', 'console.log(price * cups);'], 'a fixed price, a count of 2, one more cup, then the bill', ['120']),
  ]),
];
