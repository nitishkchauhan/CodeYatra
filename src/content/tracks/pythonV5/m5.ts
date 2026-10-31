// Python Basic · Module 5 · for loops. Lesson 5.1 keeps the old module id (p-loop-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, truth } from './kit';

export const PY_B_M5: Lesson[] = [
  lesson('p-loop-1', 'Repeat with for and range()', 5, [
    chat(['Imagine printing 100 receipts by writing print 100 times. A loop repeats the work for you.', 'for runs the same lines once for each item.']),
    run('Count with range', 'Pick a range.', ['for n in {{v}}:', '    print(n)'], ['range(3)', 'range(1, 4)', 'range(0, 10, 3)', 'range(5, 0, -1)'], { caption: 'range(stop) starts at 0 and stops before stop.' }),
    predict('How many times?', ['total = 0', 'for n in range(1, 4):', '    total = total + n', 'print(total)'], [
      [4, 'What will it print?', ['6', '10', '3'], '1 + 2 + 3. The 4 is not included.', { out: true }],
    ]),
    reveal('range()', [
      ['range(5)', '0, 1, 2, 3, 4: five numbers, from 0.'],
      ['range(1, 6)', '1 to 5: the end is not included.'],
      ['range(0, 10, 2)', '0, 2, 4, 6, 8: a step of 2.'],
      ['for dish in menu:', 'Loops work over lists and strings too.'],
    ], { mono: true }),
    tapbug('It prints 0 to 4, not 1 to 5', ['for n in range(5):', '    print(n)'], [[1, 'range(5)', 'range(1, 6)']], 'Start at 1, and stop before 6.'),
    recap([
      ['🔁', 'for repeats for each item'],
      ['🔢', 'range(start, stop, step), stopping before stop'],
      ['↔️', 'The indented lines are repeated'],
    ]),
  ]),

  lesson('p-b-5-2', 'Loops that add up', 4, [
    run('Add up the orders', 'Pick what to add each time. Can you get the real total?', ['prices = [40, 80, 90, 150]', 'total = 0', 'for p in prices:', '    total = total + {{v}}', 'print("Total:", total)'], ['1', 'p * 2', 'p', 'p - 10'], { goal: 'Total: 360', caption: 'Adding 1 each time counts the items instead.' }),
    explore('The running total', ['total = 0', 'for p in prices:', '    total += p', 'print(total)'], [
      [1, 'Start with an empty total, before the loop.'],
      [2, 'Take each price in turn.'],
      [3, 'Add it on. += is short for total = total + p.'],
      [4, 'After the loop, print once.'],
    ], { minTaps: 3 }),
    predict('Watch the total grow', ['total = 0', 'for p in [40, 80, 90]:', '    total += p', 'print(total)'], [
      [4, 'What will it print?', ['210', '90', '40'], '40 + 80 + 90.', { out: true }],
    ]),
    check('Where should total = 0 go?', ['Before the loop', 'Inside the loop', 'After the loop', 'Anywhere'], 'Inside, it would be reset every time.', 'It should happen once.'),
    tapbug('The total is always the last price', ['total = 0', 'for p in prices:', '    total = p'], [[3, 'total = p', 'total += p']], 'Add to the total instead of replacing it.'),
    recap([
      ['0️⃣', 'Start the total before the loop'],
      ['➕', 'total += item inside the loop'],
      ['🖨', 'Print after the loop'],
    ]),
  ]),

  lesson('p-b-5-3', 'break, continue, and loops inside loops', 5, [
    run('Stop or skip', 'Pick a word.', ['for dish in ["Tea", "Toast", "Sold out", "Sandwich"]:', '    if dish == "Sold out":', '        {{v}}', '    print(dish)'], ['pass', 'continue', 'break'], { caption: 'pass does nothing; continue skips to the next item; break leaves the loop.' }),
    predict('Find the first big order', ['orders = [40, 80, 250, 90]', 'for o in orders:', '    if o > 200:', '        first_big = o', '        break', 'print(first_big)'], [
      [6, 'What will it print?', ['250', '90', '40'], 'The loop stops at the first order over 200.', { out: true }],
    ]),
    run('A loop inside a loop', 'Pick how many tables.', ['for table in range(1, {{v}}):', '    for seat in ["A", "B"]:', '        print(f"Table {table}{seat}")'], ['2', '3', '4'], { caption: 'For each table, the inner loop runs completely.' }),
    check('What does break do?', ['Leaves the loop straight away', 'Skips one item', 'Restarts the loop', 'Stops the whole program'], 'The code after the loop carries on.', 'It breaks out.'),
    truth([
      ['continue jumps to the next item', true, 'The rest of this pass is skipped.'],
      ['break only works in while loops', false, 'It works in for loops too.'],
      ['A loop can contain another loop', true, 'A nested loop.'],
    ]),
    recap([
      ['⏭', 'continue skips this item'],
      ['🛑', 'break leaves the loop'],
      ['🪆', 'Loops can sit inside loops'],
    ]),
  ]),

  challenge('p-b-5-ch', 'Module 5 Challenge', { icon: '🔁', name: 'Loop Learner' }, ['Repeat with for and range()', 'Add things up in a loop', 'Skip and stop with continue and break'], [
    mcq(1, 'How many numbers does range(5) give?', ['5', '4', '6', '0'], '0, 1, 2, 3, 4.', { mono: true }),
    mcq(2, 'What does range(2, 5) give?', ['2, 3, 4', '2, 3, 4, 5', '3, 4, 5', '2, 5'], 'It stops before 5.', { mono: true }),
    mcq(3, 'total += 5 means…', ['total = total + 5', 'total = 5', 'total == 5', 'total = 5 + 5'], 'Add on.', { mono: true }),
    mcq(4, 'Which skips to the next item?', ['continue', 'break', 'pass', 'skip'], 'continue.', { mono: true }),
    mcq(5, 'Which leaves the loop?', ['break', 'continue', 'pass', 'exit'], 'break.', { mono: true }),
    swipe([
      ['range(1, 5) includes 5', false, 'It stops before 5.'],
      ['A for loop can go over a list', true, 'for dish in menu:'],
      ['total = 0 belongs inside the loop', false, 'Before it.'],
      ['break leaves the loop', true, 'Straight away.'],
    ]),
    pairs([['range(3)', '0, 1, 2'], ['+=', 'Add on'], ['continue', 'Skip this one'], ['break', 'Stop the loop']], 'Loop tools.'),
    pickCode('Which prints 1 to 10?', ['for n in range(1, 11): print(n)', 'for n in range(10): print(n)', 'for n in range(1, 10): print(n)', 'for n in 10: print(n)'], 'Start at 1, stop before 11.'),
    bugTask(['for n in range(5):  # want 1 to 5', '    total = p', 'for dish in menu'], [[1, 'range(5)', 'range(1, 6)'], [2, 'total = p', 'total += p'], [3, 'menu', 'menu:']], 'Mind the start and stop, add instead of replacing, and end the for line with a colon.'),
    predictTask(['count = 0', 'for n in range(10):', '    if n % 3 == 0:', '        count += 1', 'print(count)'], 'What does it print?', ['4', '3', '10', '9'], '0, 3, 6 and 9 divide by 3.'),
    arrange(['total = 0', 'for p in [40, 80]:', '    total += p', 'print(total)'], 'start the total, loop and add, then print', ['120']),
  ]),
];
