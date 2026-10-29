// JavaScript track · Module 6 · Strings, Numbers and Maths.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M6: Lesson[] = [
  lesson('js-6-1', 'Strings and templates', 5, [
    chat(['Text in JavaScript is a string. Rosa’s receipts are full of them: dish names, prices, thank-you notes.', 'Gluing strings with + gets messy fast. Template strings fix that.']),
    toggleRun('Gluing text two ways', [
      ['With +', ['const dish = "Lemon Tea";', 'const cups = 2;', 'console.log(cups + " × " + dish + " = ₹" + cups * 40);'], 'Works, but the quotes and pluses are easy to get wrong.', ['2 × Lemon Tea = ₹80']],
      ['Template', ['const dish = "Lemon Tea";', 'const cups = 2;', 'console.log(`${cups} × ${dish} = ₹${cups * 40}`);'], 'Backticks ` ` with ${ } holes: the value (or any maths) drops straight in.', ['2 × Lemon Tea = ₹80']],
    ]),
    run('Fill the template', 'Pick what goes in the hole.', ['const dish = "Coffee";', 'const price = 60;', 'console.log(`Today: ${{{v}}}`);'], ['dish', 'price * 2', 'dish.toUpperCase()', 'price > 50 ? "pricey" : "cheap"'], { caption: 'Anything that gives a value can go inside ${ }.' }),
    reveal('Quotes and special characters', [
      ['"double" or \'single\'', 'Both work. Pick one and stay with it.'],
      ['`backticks`', 'For templates, and text over several lines.'],
      ['\\n', 'A new line inside a string.'],
      ['\\"', 'A quote inside a string of the same quotes.'],
    ], { mono: true }),
    tapbug('It prints ${dish} literally', ['const dish = "Tea";', 'console.log("Order: ${dish}");'], [[2, '"Order: ${dish}"', '`Order: ${dish}`']], '${ } only works inside backticks, not normal quotes.'),
    recap([
      ['🔤', 'Strings hold text'],
      ['🧩', '`Text ${value}` drops values in'],
      ['↩️', '\\n makes a new line'],
    ]),
  ]),

  lesson('js-6-2', 'String methods', 5, [
    run('Clean up the order', 'The customer typed "  lemon tea  ". Pick a method.', ['const typed = "  lemon tea  ";', 'console.log("[" + typed.{{v}} + "]");'], ['trim()', 'toUpperCase()', 'length', 'trim().toUpperCase()', 'slice(2, 7)', 'replace("lemon", "ginger")'], { caption: 'Methods give you a new string; the original never changes. You can chain them: trim().toUpperCase().' }),
    matchUp('What does each give for "Coffee"?', [['.length', '6'], ['.toUpperCase()', '"COFFEE"'], ['.slice(0, 3)', '"Cof"'], ['.split("f")', '["Co", "", "ee"]']], 'Strings come with dozens of handy methods.'),
    predict('Split and join', ['const order = "tea,toast,coffee";', 'const items = order.split(",");', 'const nice = items.join(" + ");', 'console.log(nice);'], [
      [2, 'What will items be?', ['["tea","toast","coffee"]', '"tea toast coffee"', '["tea,toast,coffee"]'], 'split cuts the text at every comma and gives an array.', { var: 'items' }],
      [4, 'What will it print?', ['tea + toast + coffee', 'tea,toast,coffee', 'tea toast coffee'], 'join glues the pieces back with " + " between them.', { out: true }],
    ]),
    check('What is "Paris".length?', ['4', '5', '3', '"Paris"'], 'Four letters.', 'Count the characters.'),
    tapbug('It still prints “tea”', ['const dish = "tea";', 'dish.toUpperCase();', 'console.log(dish);'], [[2, 'dish.toUpperCase();', 'const big = dish.toUpperCase();']], 'String methods never change the original. Keep the new string in a variable.'),
    recap([
      ['✂️', 'trim, slice, replace, split'],
      ['🔠', 'toUpperCase, toLowerCase'],
      ['📏', '.length counts characters'],
    ]),
  ]),

  lesson('js-6-3', 'Searching text', 4, [
    run('Search the menu', 'Pick a search.', ['const menu = "Lemon Tea, Coffee, Cheese Toast";', 'console.log({{v}});'], ['menu.includes("Coffee")', 'menu.includes("coffee")', 'menu.indexOf("Coffee")', 'menu.startsWith("Lemon")', 'menu.endsWith("Tea")'], { caption: 'Searches are case-sensitive. indexOf gives the position (counting from 0), or -1 if not found.' }),
    place('Match any case', 'Make the search work whatever case the customer types.', [['const menu = "Lemon Tea, Coffee";'], ['const typed = "COFFEE";'], ['console.log(menu.', { gap: 0 }, '().includes(typed.', { gap: 1 }, '()));']], ['toLowerCase', 'toLowerCase', 'trim', 'length'], ['toLowerCase', 'toLowerCase'], 'Make both sides lower case before comparing.'),
    truth([
      ['includes("tea") finds "Tea"', false, 'Searching is case-sensitive.'],
      ['indexOf gives -1 when nothing is found', true, 'A handy “not found” signal.'],
      ['startsWith checks the beginning', true, 'endsWith checks the end.'],
    ]),
    check('What is "Coffee".indexOf("f")?', ['2', '3', '1', '-1'], 'C is 0, o is 1, f is 2: positions count from 0.', 'Count from 0.'),
    tapbug('“We have tea” never prints', ['const menu = "Tea, Coffee";', 'if (menu.indexOf("Tea")) {', '  console.log("We have tea");', '}'], [[2, 'menu.indexOf("Tea")', 'menu.includes("Tea")']], 'Tea is at position 0, and 0 is falsy, so the if is skipped. Use includes() for yes-or-no questions.'),
    recap([
      ['🔍', 'includes, indexOf, startsWith, endsWith'],
      ['🔡', 'Lower-case both sides to ignore case'],
      ['➖', 'indexOf -1 means not found'],
    ]),
  ]),

  lesson('js-6-4', 'Numbers', 5, [
    run('Show money nicely', 'Pick a format for the monthly total.', ['const total = 120000.5;', 'console.log({{v}});'], ['total', 'total.toFixed(2)', 'Math.round(total)', 'total.toLocaleString("en-IN")', '"₹" + total.toLocaleString("en-IN", { maximumFractionDigits: 0 })'], { caption: 'toLocaleString("en-IN") groups digits the Indian way: 1,20,000.' }),
    predict('Decimals are tricky', ['const a = 0.1 + 0.2;', 'const b = Number(a.toFixed(2));', 'console.log(a, b);'], [
      [1, 'What will a be?', ['0.30000000000000004', '0.3', '0.31'], 'Computers store decimals in binary, so tiny errors appear.', { var: 'a' }],
      [2, 'And b, after rounding to 2 places?', ['0.3', '"0.30"', '0.30000000000000004'], 'toFixed rounds (as text); Number() turns it back into a number.', { var: 'b' }],
    ]),
    reveal('Number helpers', [
      ['Number.isInteger(5)', 'true: a whole number.'],
      ['parseFloat("2.5 kg")', '2.5: reads a decimal from the start.'],
      ['Number.MAX_SAFE_INTEGER', 'The biggest whole number stored exactly (about 9 million billion).'],
      ['BigInt: 12345678901234567890n', 'For whole numbers even bigger than that; note the n at the end.'],
    ], { mono: true }),
    check('What does (7.456).toFixed(1) give?', ['"7.5"', '7.4', '"7.4"', '7'], 'It rounds to 1 decimal place and gives text.', 'Rounding, and the result is a string.'),
    tapbug('The bill shows ₹19.990000000000002', ['const bill = 9.99 + 10;', 'console.log("₹" + bill);'], [[2, 'bill', 'bill.toFixed(2)']], 'Round money before showing it.'),
    recap([
      ['🔢', 'toFixed rounds for display'],
      ['🇮🇳', 'toLocaleString("en-IN") groups digits'],
      ['⚠️', 'Decimals can be slightly off: round them'],
    ]),
  ]),

  lesson('js-6-5', 'Math and random', 4, [
    run('Math tools', 'Pick one.', ['console.log({{v}});'], ['Math.round(4.5)', 'Math.floor(4.9)', 'Math.ceil(4.1)', 'Math.max(40, 60, 80)', 'Math.min(40, 60, 80)', 'Math.abs(-30)'], { caption: 'floor goes down, ceil goes up, round goes to the nearest.' }),
    reveal('Random numbers', [
      ['Math.random()', 'A decimal from 0 up to (not including) 1.'],
      ['* 6', 'Stretch it: 0 up to 6.'],
      ['Math.floor(…)', 'Cut the decimals: 0 to 5.'],
      ['+ 1', 'Shift it: a dice roll from 1 to 6.'],
    ], { code: ['const roll = Math.floor(Math.random() * 6) + 1;'], mono: true }),
    run('Lucky table', 'Pick how many tables. Each run picks a random winner.', ['const tables = {{v}};', 'const winner = Math.floor(Math.random() * tables) + 1;', 'console.log("Free coffee for table", winner);'], ['6', '12', '20'], { caption: 'Tap the same value again: random gives a different winner each run.' }),
    check('Which gives a whole number from 1 to 10?', ['Math.floor(Math.random() * 10) + 1', 'Math.random() * 10', 'Math.round(Math.random())', 'Math.random(10)'], 'Stretch, cut the decimals, then shift by 1.', 'Three steps: * , floor, + 1.'),
    tapbug('The dice shows 4.82', ['const roll = Math.random() * 6;', 'console.log(roll);'], [[1, 'Math.random() * 6', 'Math.floor(Math.random() * 6) + 1']], 'Math.random() * 6 is a decimal from 0 to 6. Floor it and add 1 for a dice roll.'),
    recap([
      ['⬇️', 'floor, ceil, round'],
      ['📈', 'max, min, abs'],
      ['🎲', 'Math.floor(Math.random() * n) + 1'],
    ]),
  ]),

  lesson('js-6-6', 'Patterns (RegExp)', 6, [
    chat(['Rosa’s order form asks for a phone number. People type all sorts: 98765 43210, 123, abc.', 'A pattern (regular expression) describes what valid text looks like, and test() checks it.']),
    explore('Reading a pattern', ['const mobile = /', '  ^[6-9]', '  \\d{9}$', '/;', 'console.log(mobile.test("9876543210"));'], [
      [2, '^ means “the start”. [6-9] is one digit from 6 to 9: Indian mobile numbers start with 6, 7, 8 or 9.'],
      [3, '\\d{9} is exactly nine more digits, and $ means “the end”, so nothing else may follow.'],
      [5, 'test() answers true or false: is this a 10-digit mobile number? (In real code the pattern is written on one line: /^[6-9]\\d{9}$/.)'],
    ], { page: { html: '<p>Console: true</p>' }, minTaps: 3 }),
    run('Test some numbers', 'Pick what the customer typed.', ['const mobile = /^[6-9]\\d{9}$/;', 'console.log(mobile.test("{{v}}"));'], ['9876543210', '98765 43210', '1234567890', '987654321', '7000000000'], { caption: 'Spaces, a start digit below 6, or a missing digit all fail.' }),
    reveal('Pattern pieces', [
      ['\\d  \\w  \\s', 'A digit, a word character, a space.'],
      ['[abc]  [a-z]', 'One of these characters.'],
      ['+  *  ?  {3}', 'One or more, any number, maybe, exactly 3.'],
      ['/…/i  /…/g', 'Flags: i ignores case, g finds every match.'],
      ['( )', 'A group, to pull out part of the match.'],
    ], { mono: true }),
    run('Find every price', 'replace and match use patterns too.', ['const text = "Tea ₹40, Coffee ₹60, Toast ₹80";', 'console.log({{v}});'], ['text.match(/\\d+/g)', 'text.replace(/₹/g, "Rs ")', '/coffee/i.test(text)', 'text.match(/\\d+/)[0]'], { caption: 'Without g, match finds only the first one.' }),
    tapbug('Every number passes', ['const mobile = /[6-9]\\d{9}/;', 'console.log(mobile.test("ab98765432100cd"));'], [[1, '/[6-9]\\d{9}/', '/^[6-9]\\d{9}$/']], 'Without ^ and $, the pattern only has to appear somewhere in the text. Anchor it to the start and the end.'),
    recap([
      ['🧩', '/pattern/ describes valid text'],
      ['✅', 'test() says true or false'],
      ['⚓', '^ and $ make the whole text match'],
    ]),
  ]),

  challenge('js-6-ch', 'Module 6 Challenge', { icon: '🔢', name: 'Number Cruncher' }, ['Build text with templates and string methods', 'Format numbers and money', 'Use Math and simple patterns'], [
    mcq(1, 'Which makes "Total: ₹80" from total = 80?', ['`Total: ₹${total}`', '"Total: ₹${total}"', '`Total: ₹{total}`', 'Total: ₹ + total'], 'Backticks with ${ }.', { mono: true }),
    mcq(2, 'What is "  tea ".trim()?', ['"tea"', '"  tea"', '"TEA"', '3'], 'trim removes spaces at both ends.', { mono: true }),
    mcq(3, 'What does (2.5).toFixed(2) give?', ['"2.50"', '2.5', '"2.5"', '2.50'], 'Two decimal places, as text.', { mono: true }),
    mcq(4, 'What is Math.floor(9.99)?', ['9', '10', '9.9', '9.99'], 'floor always goes down.', { mono: true }),
    mcq(5, 'What does /^\\d{6}$/ match?', ['Exactly six digits', 'Any text with a 6', 'Six letters', 'Up to six digits'], 'Start, six digits, end: like a PIN code.'),
    swipe([
      ['String methods change the original string', false, 'They give a new string.'],
      ['indexOf gives -1 when not found', true, 'A handy signal.'],
      ['0.1 + 0.2 is exactly 0.3', false, 'It is 0.30000000000000004.'],
      ['The i flag makes a pattern ignore case', true, '/tea/i matches Tea.'],
    ]),
    pairs([['toUpperCase()', 'CAPITALS'], ['split(",")', 'Text to array'], ['Math.ceil', 'Round up'], ['test()', 'Does it match?']], 'Tools for text and numbers.'),
    pickCode('Which shows 120000 as 1,20,000?', ['(120000).toLocaleString("en-IN")', '(120000).toFixed(2)', 'String(120000)', 'Math.round(120000)'], 'en-IN uses Indian digit grouping.'),
    bugTask(['const dish = "Tea";', 'console.log("Order: ${dish}");', 'console.log(dish.Length);'], [[2, '"Order: ${dish}"', '`Order: ${dish}`'], [3, 'Length', 'length']], 'Templates need backticks, and length is lower case.'),
    predictTask(['const order = " tea , toast ";', 'const items = order.split(",");', 'console.log(items[0].trim() + " + " + items[1].trim());'], 'What does it print?', ['tea + toast', ' tea  +  toast ', 'tea,toast', 'tea + toast + '], 'split at the comma, trim each piece, join with " + ".'),
    arrange(['const prices = "40,60,80";', 'const list = prices.split(",");', 'const total = Number(list[0]) + Number(list[1]) + Number(list[2]);', 'console.log(`Total: ₹${total}`);'], 'take the price text, split it, add the numbers, then print the total', ['Total: ₹180']),
  ]),
];
