// Python Basic · Module 7 · Lists. Lesson 7.1 keeps the old module id (p-loop-2).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, run, swipe, tapbug } from './kit';

export const PY_B_M7: Lesson[] = [
  lesson('p-loop-2', 'Making and reading lists', 4, [
    chat(['A list keeps many values in order, in one variable: the menu, today’s orders, a class’s marks.', 'Square brackets, with the items separated by commas.']),
    run('Read the menu', 'Pick what to read.', ['menu = ["Lemon Tea", "Cheese Toast", "Veg Sandwich"]', 'print({{v}})'], ['menu', 'menu[0]', 'menu[-1]', 'len(menu)', 'menu[1:]', '"Cheese Toast" in menu'], { caption: 'Positions start at 0, like in strings.' }),
    predict('Positions', ['menu = ["Tea", "Toast", "Sandwich"]', 'first = menu[0]', 'last = menu[len(menu) - 1]', 'print(first, last)'], [
      [2, 'What will first be?', ["'Tea'", "'Toast'", "'T'"], 'Position 0 is the first item.', { var: 'first' }],
      [3, 'What will last be?', ["'Sandwich'", "'Toast'", 'An error'], 'len is 3, so the last position is 2.', { var: 'last' }],
    ]),
    check('What is ["a", "b", "c"][1]?', ['"b"', '"a"', '"c"', '1'], 'Position 1 is the second item.', 'Count from 0.', { mono: true }),
    tapbug('IndexError: list index out of range', ['menu = ["Tea", "Toast", "Sandwich"]', 'print(menu[3])'], [[2, 'menu[3]', 'menu[2]']], 'Three items have positions 0, 1 and 2.'),
    recap([
      ['📋', 'A list holds many values in order'],
      ['0️⃣', 'Positions start at 0; -1 is the last'],
      ['📏', 'len() counts the items'],
    ]),
  ]),

  lesson('p-b-7-2', 'Changing lists', 5, [
    run('Change the order list', 'Pick a change.', ['orders = ["Tea", "Toast"]', '{{v}}', 'print(orders)'], ['orders.append("Sandwich")', 'orders.insert(0, "Water")', 'orders.remove("Tea")', 'orders.pop()', 'orders[1] = "Veg Toast"']),
    predict('A busy morning', ['orders = ["Tea"]', 'orders.append("Toast")', 'orders.append("Tea")', 'orders.remove("Tea")', 'print(orders)'], [
      [3, 'What will orders be?', ["['Tea', 'Toast', 'Tea']", "['Tea', 'Toast']", "['Tea', 'Tea', 'Toast']"], 'append adds to the end.', { var: 'orders' }],
      [4, 'What will orders be now?', ["['Toast', 'Tea']", "['Toast']", "['Tea', 'Toast']"], 'remove takes out the first Tea only.', { var: 'orders' }],
    ]),
    matchUp('List methods', [['append(x)', 'Add to the end'], ['insert(i, x)', 'Add at a position'], ['remove(x)', 'Take out the first x'], ['sort()', 'Put in order']], 'Methods that change the list.'),
    run('Sort it', 'Pick a sort.', ['prices = [90, 40, 150, 80]', '{{v}}', 'print(prices)'], ['prices.sort()', 'prices.sort(reverse=True)', 'prices.reverse()'], { caption: 'reverse() just flips the order; sort() puts it in order.' }),
    tapbug('It prints None', ['menu = ["Tea", "Toast"]', 'menu = menu.append("Cake")', 'print(menu)'], [[2, 'menu = menu.append("Cake")', 'menu.append("Cake")']], 'append changes the list and gives back None. Don’t store its result.'),
    recap([
      ['➕', 'append and insert add'],
      ['➖', 'remove and pop take out'],
      ['🔃', 'sort() puts the list in order'],
    ]),
  ]),

  lesson('p-b-7-3', 'Looping over lists', 4, [
    run('Ask the list', 'Pick a question.', ['prices = [40, 80, 90, 150]', 'print({{v}})'], ['sum(prices)', 'max(prices)', 'min(prices)', 'sum(prices) / len(prices)', 'sorted(prices, reverse=True)'], { caption: 'sum, max, min and len answer common questions in one go.' }),
    predict('Count the cheap dishes', ['prices = [40, 80, 90, 150]', 'cheap = 0', 'for p in prices:', '    if p < 90:', '        cheap += 1', 'print(cheap)'], [
      [6, 'What will it print?', ['2', '3', '1'], '40 and 80 are under 90.', { out: true }],
    ]),
    explore('Loop and pick', ['menu = ["Tea", "Toast", "Tea Cake"]', 'for dish in menu:', '    if "Tea" in dish:', '        print(dish)'], [
      [2, 'dish takes each item in turn.'],
      [3, 'Check each one.'],
      [4, 'Print only the matches: Tea and Tea Cake.'],
    ], { minTaps: 3 }),
    check('What does max([40, 150, 80]) give?', ['150', '40', '80', '3'], 'The biggest value.', 'max.', { mono: true }),
    tapbug("TypeError: unsupported operand type(s) for +: 'int' and 'str'", ['prices = [40, "80", 90]', 'print(sum(prices))'], [[1, '"80"', '80']], 'One price is text. Keep numbers as numbers.'),
    recap([
      ['🔁', 'for item in list visits each one'],
      ['🧮', 'sum, max, min, len'],
      ['🎯', 'Loop + if picks the matches'],
    ]),
  ]),

  challenge('p-b-7-ch', 'Module 7 Challenge', { icon: '📋', name: 'List Keeper' }, ['Make and read lists', 'Add, remove and sort items', 'Loop over lists and summarise them'], [
    mcq(1, 'Which makes a list?', ['["Tea", "Toast"]', '("Tea", "Toast")', '{"Tea", "Toast"}', '"Tea, Toast"'], 'Square brackets.', { mono: true }),
    mcq(2, 'What is the first position in a list?', ['0', '1', '-1', 'first'], 'Lists count from 0.', { mono: true }),
    mcq(3, 'Which adds an item to the end?', ['append()', 'add()', 'insert()', 'push()'], 'append.', { mono: true }),
    mcq(4, 'What does len(["a", "b"]) give?', ['2', '1', '3', '"ab"'], 'Two items.', { mono: true }),
    mcq(5, 'Which gives the biggest number?', ['max()', 'big()', 'top()', 'sum()'], 'max.', { mono: true }),
    swipe([
      ['Lists keep items in order', true, 'In the order you add them.'],
      ['menu[-1] is the last item', true, 'Negative positions count from the end.'],
      ['append() gives back the new list', false, 'It gives back None.'],
      ['A list can hold only numbers', false, 'Anything.'],
    ]),
    pairs([['append', 'Add to the end'], ['remove', 'Take out an item'], ['sum', 'Add them all up'], ['len', 'How many']], 'List tools.'),
    pickCode('Which gives the average price?', ['sum(prices) / len(prices)', 'max(prices) / 2', 'prices / len', 'avg(prices)'], 'The total divided by how many.'),
    bugTask(['print(menu[3])  # menu has 3 items', 'menu = menu.append("Cake")', 'prices = [40, "80", 90]'], [[1, 'menu[3]', 'menu[2]'], [2, 'menu = menu.append("Cake")', 'menu.append("Cake")'], [3, '"80"', '80']], 'The last of 3 is position 2, append returns None, and prices should be numbers.'),
    predictTask(['menu = ["Tea", "Toast"]', 'menu.append("Cake")', 'menu.insert(0, "Water")', 'print(menu[1], len(menu))'], 'What does it print?', ['Tea 4', 'Water 4', 'Toast 3', 'Tea 3'], 'Water went in at the start, so Tea moved to position 1.'),
    arrange(['prices = [90, 40, 80]', 'prices.sort()', 'print(prices)'], 'make the list, sort it, then print', ['[40, 80, 90]']),
  ]),
];
