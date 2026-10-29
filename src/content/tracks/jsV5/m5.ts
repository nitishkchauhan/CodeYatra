// JavaScript track · Module 5 · Loops. Lesson 5.1 keeps the old loops module id (w-js-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M5: Lesson[] = [
  lesson('w-js-1', 'for loops', 5, [
    chat(['Riya needs token numbers 1 to 5 for the morning queue.', 'Writing console.log five times is boring. A loop repeats code for you.']),
    run('Count the tokens', 'Pick how many tokens to print.', ['for (let i = 1; i <= {{v}}; i++) {', '  console.log("Token " + i);', '}'], ['3', '5', '1', '0'], { caption: 'With 0, the condition is false straight away, so the loop never runs.' }),
    reveal('The three parts of a for', [
      ['let i = 1', 'Start: make a counter. Runs once.'],
      ['i <= 5', 'Check: keep going while this is true.'],
      ['i++', 'Step: after each round, add 1.'],
    ], { code: ['for (let i = 1; i <= 5; i++) { … }'], mono: true }),
    predict('Watch the counter', ['let total = 0;', 'for (let i = 1; i <= 3; i++) {', '  total += i;', '}', 'console.log(total);'], [
      [3, 'First round: i is 1. What will total be?', ['1', '0', '3'], '0 + 1 = 1.', { var: 'total' }],
      [3, 'Second round: i is 2. And now?', ['3', '2', '4'], '1 + 2 = 3.', { var: 'total' }],
      [5, 'After i = 3, what does it print?', ['6', '3', '10'], '3 + 3 = 6.', { out: true }],
    ]),
    check('How many times does for (let i = 0; i < 4; i++) run?', ['4', '3', '5', 'Forever'], 'i is 0, 1, 2, 3: four rounds.', 'Start at 0, stop before 4.'),
    recap([
      ['🔁', 'for (start; check; step) { … }'],
      ['🔢', 'i++ moves the counter on'],
      ['🛑', 'It stops when the check is false'],
    ]),
  ]),

  lesson('js-5-2', 'while and do…while', 5, [
    run('Keep brewing', 'Cups to fill. The loop runs while there are cups left.', ['let cups = {{v}};', 'while (cups > 0) {', '  console.log("Filling, " + cups + " left");', '  cups--;', '}', 'console.log("All done");'], ['3', '1', '0'], { caption: 'while checks first. With 0 cups the body never runs.' }),
    toggleRun('while or do…while?', [
      ['while', ['let n = 0;', 'while (n > 0) {', '  console.log("Runs");', '}', 'console.log("Done");'], 'Checks first: the body never runs.', ['Done']],
      ['do…while', ['let n = 0;', 'do {', '  console.log("Runs once");', '} while (n > 0);', 'console.log("Done");'], 'Runs the body first, then checks, so it always runs at least once.', ['Runs once', 'Done']],
    ]),
    tapbug('The app freezes', ['let cups = 3;', 'while (cups > 0) {', '  console.log(cups);', '  cups++;', '}'], [[4, 'cups++', 'cups--']], 'cups goes up forever, so cups > 0 never becomes false: an endless loop. Count down instead.'),
    truth([
      ['A while loop can run zero times', true, 'It checks before the first round.'],
      ['do…while always runs at least once', true, 'It checks after the body.'],
      ['A loop must always use i', false, 'Any variable works; i is just a habit.'],
    ]),
    check('Which loop fits “keep asking until the customer types a number”?', ['while', 'for with a fixed count', 'switch'], 'You don’t know how many tries it will take, so loop while the answer isn’t a number.', 'How many rounds will it need?', { mono: false }),
    recap([
      ['🔁', 'while (condition) { … } checks first'],
      ['1️⃣', 'do { … } while (…) runs at least once'],
      ['♾', 'Something inside must change, or it never ends'],
    ]),
  ]),

  lesson('js-5-3', 'break and continue', 4, [
    toggleRun('Stop early, or skip one', [
      ['break', ['for (let t = 1; t <= 10; t++) {', '  if (t === 4) break;', '  console.log("Table " + t);', '}'], 'break leaves the loop completely: tables 1 to 3.', ['Table 1', 'Table 2', 'Table 3']],
      ['continue', ['for (let t = 1; t <= 5; t++) {', '  if (t === 4) continue;', '  console.log("Table " + t);', '}'], 'continue skips the rest of this round only. Table 4 is reserved.', ['Table 1', 'Table 2', 'Table 3', 'Table 5']],
    ]),
    predict('Find the first big order', ['const bills = [80, 120, 450, 90];', 'let found = 0;', 'for (const b of bills) {', '  if (b > 300) {', '    found = b;', '    break;', '  }', '}', 'console.log("First big bill:", found);'], [
      [5, 'b is 450. What will found become?', ['450', '120', '90'], '450 is the first bill over 300.', { var: 'found' }],
      [9, 'What will it print?', ['First big bill: 450', 'First big bill: 90', 'First big bill: 0'], 'break stopped the loop at 450, so 90 was never checked.', { out: true }],
    ]),
    check('What does continue do?', ['Skips to the next round', 'Stops the loop', 'Restarts from the beginning', 'Pauses for a second'], 'The loop carries on with the next round.', 'It doesn’t leave the loop.', { mono: false }),
    tapbug('Table 4 still prints', ['for (let t = 1; t <= 5; t++) {', '  console.log("Table " + t);', '  if (t === 4) continue;', '}'], [[3, 'if (t === 4) continue;', '(move above the console.log)']], 'continue only skips what comes after it. It must come before the console.log.'),
    run('Where to stop?', 'Pick the table where the loop breaks.', ['for (let t = 1; t <= 6; t++) {', '  if (t === {{v}}) break;', '  console.log("Table " + t);', '}'], ['4', '2', '6', '9'], { caption: 'With 9 the loop never meets break, so all six tables print.' }),
    recap([
      ['🛑', 'break leaves the loop'],
      ['⏭', 'continue skips to the next round'],
      ['📍', 'Where you put them matters'],
    ]),
  ]),

  lesson('js-5-4', 'for…of and for…in', 5, [
    run('Loop over a list', 'Pick a list to loop over.', ['for (const item of {{v}}) {', '  console.log(item);', '}'], ['["Tea", "Coffee", "Toast"]', '"TEA"', '[40, 60, 80]'], { caption: 'for…of gives you each item in turn. It works on arrays and on the letters of a string.' }),
    toggleRun('of or in?', [
      ['for…of', ['const menu = ["Tea", "Coffee"];', 'for (const dish of menu) {', '  console.log(dish);', '}'], 'of gives the values.', ['Tea', 'Coffee']],
      ['for…in', ['const prices = { Tea: 40, Coffee: 60 };', 'for (const dish in prices) {', '  console.log(dish, prices[dish]);', '}'], 'in gives the keys of an object (the names on the left).', ['Tea 40', 'Coffee 60']],
    ]),
    place('Add up the bill', 'Loop over the prices and add each one.', [['const prices = [40, 60, 80];'], ['let total = 0;'], ['for (const p ', { gap: 0 }, ' prices) {'], ['  total ', { gap: 1 }, ' p;'], ['}'], ['console.log("Total:", total);']], ['of', '+=', 'in', '=', 'from'], ['of', '+='], 'for…of gives each price, and += adds it on: 180.'),
    matchUp('Which loop?', [['for (let i = 0; …)', 'Counting'], ['while (…)', 'Until something changes'], ['for (const x of list)', 'Each item in a list'], ['for (const k in obj)', 'Each key of an object']], 'Pick the loop that reads most naturally.'),
    tapbug('It prints 0 and 1, not the dishes', ['for (const dish in ["Tea", "Coffee"]) {', '  console.log(dish);', '}'], [[1, 'in', 'of']], 'for…in on an array gives the positions (0, 1). for…of gives the values.'),
    recap([
      ['📋', 'for…of: each value of an array or string'],
      ['🔑', 'for…in: each key of an object'],
      ['🧮', 'Loops plus += make totals'],
    ]),
  ]),

  challenge('js-5-ch', 'Module 5 Challenge', { icon: '🔁', name: 'Loop Master' }, ['Repeat code with for and while', 'Stop or skip with break and continue', 'Loop over lists and objects'], [
    mcq(1, 'How many times does for (let i = 1; i <= 3; i++) run?', ['3', '2', '4', 'Forever'], 'i is 1, 2, 3.', { mono: true }),
    mcq(2, 'Which loop always runs at least once?', ['do…while', 'while', 'for', 'for…of'], 'It checks after the body.'),
    mcq(3, 'What makes a loop endless?', ['The condition never becomes false', 'Using let', 'Using console.log', 'Having a break'], 'Something must change so it can stop.'),
    mcq(4, 'Which gives each value of an array?', ['for…of', 'for…in', 'while', 'switch'], 'of = values.', { mono: true }),
    mcq(5, 'What does break do inside a loop?', ['Leaves the loop', 'Skips one round', 'Restarts it', 'Nothing'], 'It stops the loop completely.'),
    swipe([
      ['i++ adds 1 to i', true, 'Same as i = i + 1.'],
      ['for…in gives the values of an array', false, 'It gives keys; use for…of for values.'],
      ['continue skips the rest of one round', true, 'Then the loop carries on.'],
      ['A while loop always runs once', false, 'It can run zero times.'],
    ]),
    pairs([['break', 'Leave the loop'], ['continue', 'Skip this round'], ['for…of', 'Each value'], ['for…in', 'Each key']], 'Loop tools.'),
    pickCode('Which prints 1, 2 and 3?', ['for (let i = 1; i <= 3; i++) console.log(i);', 'for (let i = 1; i < 3; i++) console.log(i);', 'for (let i = 0; i <= 3; i++) console.log(i);', 'for (let i = 1; i <= 3; i--) console.log(i);'], 'Start at 1, keep going while i <= 3, count up.'),
    bugTask(['let left = 3;', 'while (left > 0) {', '  console.log(left);', '  left++;', '}', 'for (const k of { a: 1 }) {}'], [[4, 'left++', 'left--'], [6, 'of', 'in']], 'left must count down to stop, and objects are looped with for…in.'),
    predictTask(['let total = 0;', 'for (const p of [40, 60, 80]) {', '  if (p === 60) continue;', '  total += p;', '}', 'console.log(total);'], 'What does it print?', ['120', '180', '60', '40'], '60 is skipped: 40 + 80 = 120.'),
    arrange(['const menu = ["Tea", "Coffee", "Toast"];', 'let count = 0;', 'for (const dish of menu) count++;', 'console.log("Dishes:", count);'], 'make the menu, start a counter, count each dish, then print it', ['Dishes: 3']),
  ]),
];
