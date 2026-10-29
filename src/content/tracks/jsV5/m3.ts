// JavaScript track · Module 3 · Operators. Lesson 3.1 keeps the old operators module id (j-ops-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M3: Lesson[] = [
  lesson('j-ops-1', 'Arithmetic', 5, [
    chat(['Riya’s bill needs maths: price times cups, plus tax, split between friends.', 'JavaScript does maths with the symbols you know, plus a few new ones.']),
    reveal('The maths operators', [
      ['+ - * /', 'Add, subtract, multiply, divide. 40 * 3 is 120.'],
      ['%', 'Remainder: 7 % 2 is 1. Handy for “is this even?”'],
      ['**', 'Power: 2 ** 3 is 8.'],
      ['++ and --', 'Add or take away 1: cups++.'],
      ['( )', 'Brackets go first, then * and /, then + and -.'],
    ], { mono: true }),
    run('Split the bill', 'Pick a sum. The bill is 3 lemon teas and 1 cheese toast.', ['const bill = {{v}};', 'console.log("Bill: ₹" + bill);'], ['3 * 40 + 80', '3 * (40 + 80)', '(3 * 40 + 80) / 2', '200 % 3'], { caption: 'Without brackets, * happens before +. (3 * 40 + 80) / 2 splits the ₹200 bill between two friends.' }),
    predict('Order of operations', ['const total = 2 + 3 * 4;', 'const shared = (2 + 3) * 4;', 'console.log(total, shared);'], [
      [1, 'What will total be?', ['14', '20', '24'], '* comes first: 3 * 4 = 12, then 2 + 12 = 14.', { var: 'total' }],
      [2, 'And shared?', ['20', '14', '9'], 'Brackets first: 2 + 3 = 5, then 5 * 4 = 20.', { var: 'shared' }],
    ]),
    check('What is 10 % 3?', ['1', '3', '3.33', '0'], '3 goes into 10 three times, with 1 left over.', '% is the remainder.'),
    recap([
      ['➕', '+ - * / % ** do the maths'],
      ['🥇', 'Brackets, then * /, then + -'],
      ['🔁', '% gives the remainder'],
    ]),
  ]),

  lesson('js-3-2', 'Assignment', 4, [
    reveal('Short ways to update a box', [
      ['x = 5', 'Put 5 in x.'],
      ['x += 2', 'Same as x = x + 2.'],
      ['x -= 2', 'Same as x = x - 2.'],
      ['x *= 2', 'Same as x = x * 2.'],
      ['x++', 'Same as x = x + 1.'],
    ], { mono: true }),
    predict('Watch the total change', ['let total = 0;', 'total += 40;', 'total += 80;', 'total *= 2;', 'console.log(total);'], [
      [3, 'total is 40. What is it after this line?', ['120', '80', '40'], '40 + 80 = 120.', { var: 'total' }],
      [4, 'And after doubling?', ['240', '122', '120'], 'total *= 2 makes 120 into 240.', { var: 'total' }],
    ]),
    run('Try each one', 'cups starts at 2. Pick an update.', ['let cups = 2;', 'cups {{v}};', 'console.log("Cups:", cups);'], ['+= 3', '-= 1', '*= 4', '++'], { caption: 'Each short form reads cups, changes it and stores it back.' }),
    place('Add a coffee to the bill', 'Use the short way to add 60.', [['let bill = 120;'], ['bill ', { gap: 0 }, ' 60;'], ['console.log(bill);']], ['+=', '=+', '=', '++'], ['+='], 'bill += 60 adds 60 to what is already there: 180.'),
    tapbug('The bill is always 60', ['let bill = 120;', 'bill =+ 60;', 'console.log(bill);'], [[2, '=+', '+=']], '=+ 60 means “bill = +60”, which throws away the 120. The short form is +=.'),
    recap([
      ['🧮', 'x += 2 is x = x + 2'],
      ['✖️', '-=, *=, /= work the same way'],
      ['➕', 'x++ adds one'],
    ]),
  ]),

  lesson('js-3-3', 'Comparisons', 5, [
    toggleRun('== or ===?', [
      ['===', ['console.log(40 === "40");'], 'Strict: same value and same type. A number isn’t a string, so false.', ['false']],
      ['==', ['console.log(40 == "40");'], 'Loose: converts first, then compares. Surprising results, so avoid it.', ['true']],
      ['!==', ['console.log(40 !== 60);'], 'Strict “not equal”.', ['true']],
    ]),
    run('Compare', 'Pick a comparison.', ['const bill = 250;', 'console.log({{v}});'], ['bill > 200', 'bill >= 300', 'bill < 250', 'bill <= 250', 'bill === "250"'], { caption: 'Comparisons always give true or false.' }),
    truth([
      ['5 === 5 is true', true, 'Same value, same type.'],
      ['"5" === 5 is true', false, 'A string isn’t a number.'],
      ['10 >= 10 is true', true, 'Greater than or equal.'],
    ]),
    tapbug('Every order gets free delivery', ['let bill = 120;', 'if (bill = 300) {', '  console.log("Free delivery");', '}'], [[2, '=', '>=']], 'One = puts 300 into bill, which counts as true. Compare with >=, or === for equals.'),
    check('Which is the safe way to check equality?', ['===', '==', '=', '=>'], 'Always use === and !==.', 'Three equals signs.'),
    recap([
      ['🟰', '=== same value and type; avoid =='],
      ['↕️', '<, >, <=, >= compare sizes'],
      ['⚠️', 'One = stores; it doesn’t compare'],
    ]),
  ]),

  lesson('js-3-4', 'Logic', 5, [
    reveal('Combining true and false', [
      ['&&', 'AND: both must be true. isOpen && hasTea.'],
      ['||', 'OR: at least one true. paidCash || paidUPI.'],
      ['!', 'NOT: flips it. !isOpen.'],
      ['??', 'A fallback when something is null or undefined: table ?? "Takeaway".'],
      ['?.', 'Look inside only if it exists: order?.table.'],
    ], { mono: true }),
    run('Can we take the order?', 'Pick a rule.', ['const isOpen = true;', 'const hasMilk = false;', 'console.log({{v}});'], ['isOpen && hasMilk', 'isOpen || hasMilk', '!hasMilk', 'isOpen && !hasMilk'], { caption: '&& needs both, || needs one, ! flips.' }),
    run('Fallbacks', 'This order has no table. Pick an expression.', ['const order = { dish: "Coffee", table: null };', 'console.log({{v}});'], ['order.table ?? "Takeaway"', 'order.table', 'order.customer?.phone', 'order.customer?.phone ?? "No phone"'], { caption: '?. stops quietly at a missing part instead of crashing.' }),
    matchUp('Match the symbol', [['&&', 'Both true'], ['||', 'At least one true'], ['!', 'Flip it'], ['??', 'Fallback for null or undefined']], 'Logical operators combine true and false.'),
    check('isOpen is true and hasMilk is false. What is isOpen && hasMilk?', ['false', 'true', 'undefined'], '&& needs both to be true.', 'Is hasMilk true?'),
    recap([
      ['🤝', '&& both, || either, ! not'],
      ['🛟', '?? gives a fallback for null or undefined'],
      ['🔍', '?. reads safely through missing parts'],
    ]),
  ]),

  lesson('js-3-5', 'Booleans and truthiness', 4, [
    chat(['if doesn’t only accept true and false. Any value can be asked “are you true-ish?”', 'JavaScript has a short list of falsy values. Everything else is truthy.']),
    reveal('The falsy values', [
      ['false', 'Of course.'],
      ['0', 'The number zero.'],
      ['""', 'An empty string.'],
      ['null and undefined', 'Nothing.'],
      ['NaN', 'Not a number.'],
      ['Everything else', 'Is truthy, even "0", "false" and [].'],
    ], { mono: true }),
    run('Truthy or falsy?', 'Boolean() shows whether a value counts as true.', ['console.log(Boolean({{v}}));'], ['0', '"0"', '""', '"Tea"', '[]', 'null'], { caption: '"0" is a string with a character in it, so it is truthy.' }),
    truth([
      ['0 is falsy', true, 'Zero is on the falsy list.'],
      ['"false" is falsy', false, 'It is a non-empty string, so truthy.'],
      ['An empty array [] is truthy', true, 'Only the short falsy list is false-ish.'],
    ]),
    check('A customer leaves the name box empty: name is "". What does if (name) do?', ['Skips the block, because "" is falsy', 'Runs the block', 'Crashes'], 'An empty string is falsy, so the if is skipped. A neat way to check “did they type anything?”', 'Is "" on the falsy list?', { mono: false }),
    recap([
      ['❌', 'Falsy: false, 0, "", null, undefined, NaN'],
      ['✅', 'Everything else is truthy'],
      ['🔍', 'Boolean(x) shows which'],
    ]),
  ]),

  challenge('js-3-ch', 'Module 3 Challenge', { icon: '➕', name: 'Calculator' }, ['Do maths in the right order', 'Compare safely with === and friends', 'Combine conditions with && || ! and ??'], [
    mcq(1, 'What is 2 + 4 * 10?', ['42', '60', '24', '2410'], '* before +.', { mono: true }),
    mcq(2, 'What does x += 5 mean?', ['x = x + 5', 'x = 5', 'x is greater than 5', 'x = +5'], 'A short form for adding to x.'),
    mcq(3, 'What is 5 === "5"?', ['false', 'true', 'undefined', 'Error'], 'Different types.', { mono: true }),
    mcq(4, 'What is null ?? "Takeaway"?', ['"Takeaway"', 'null', 'false', 'undefined'], '?? falls back when the left side is null or undefined.', { mono: true }),
    mcq(5, 'Which value is falsy?', ['0', '"0"', '"no"', '[]'], 'Only the number 0 is on the falsy list here.', { mono: true }),
    swipe([
      ['% gives the remainder', true, '7 % 2 is 1.'],
      ['== is safer than ===', false, '=== doesn’t convert types.'],
      ['true || false is true', true, 'One true is enough.'],
      ['"" is truthy', false, 'An empty string is falsy.'],
    ]),
    pairs([['**', 'Power'], ['!==', 'Strictly not equal'], ['&&', 'Both true'], ['?.', 'Read safely if it exists']], 'Operators for maths, comparing and logic.'),
    pickCode('Which gives free delivery for bills of ₹300 or more?', ['if (bill >= 300)', 'if (bill = 300)', 'if (bill => 300)', 'if (bill > 300)'], '>= includes 300 itself. => is an arrow, not a comparison.'),
    bugTask(['let total = 0;', 'total =+ 40;', 'if (total == "40") {', '  console.log("ok");', '}'], [[2, '=+', '+='], [3, '==', '===']], '=+ throws away the old total, and == compares loosely.'),
    predictTask(['let bill = 3 * 40;', 'bill += 80;', 'const free = bill >= 200;', 'console.log(bill, free);'], 'What does it print?', ['200 true', '200 false', '120 false', '320 true'], '3 × 40 = 120, plus 80 is 200, and 200 >= 200 is true.'),
    arrange(['let bill = 120;', 'bill += 80;', 'const free = bill >= 200;', 'console.log(free ? "Free delivery" : "₹30 delivery");'], 'start the bill, add a toast, check it, then print the delivery', ['Free delivery']),
  ]),
];
