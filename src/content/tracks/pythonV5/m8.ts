// Python Basic · Module 8 · Dictionaries. Lesson 8.1 keeps the old module id (p-dict-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_B_M8: Lesson[] = [
  lesson('p-dict-1', 'Keys and values', 4, [
    chat(['A dictionary is like the café’s price board: each dish (the key) has a price (the value).', 'Instead of a position, you look things up by name.']),
    run('Look it up', 'Pick a lookup.', ['prices = {"Lemon Tea": 40, "Cheese Toast": 80, "Veg Sandwich": 90}', 'print({{v}})'], ['prices["Lemon Tea"]', 'prices["Veg Sandwich"]', 'prices', 'len(prices)', '"Cake" in prices'], { caption: 'Curly brackets, key: value pairs, separated by commas.' }),
    predict('Build a bill', ['prices = {"Tea": 40, "Toast": 80}', 'tea = prices["Tea"]', 'bill = tea * 2 + prices["Toast"]', 'print(bill)'], [
      [2, 'What will tea be?', ['40', "'Tea'", '80'], 'Look up the key, get its value.', { var: 'tea' }],
      [3, 'What will bill be?', ['160', '120', '200'], '40 × 2 + 80.', { var: 'bill' }],
    ]),
    check('In {"Tea": 40}, what is "Tea"?', ['The key', 'The value', 'The position', 'The list'], 'The key is what you look up; 40 is its value.', 'Which one do you look up by?'),
    tapbug("KeyError: 'tea'", ['prices = {"Tea": 40}', 'print(prices["tea"])'], [[2, '"tea"', '"Tea"']], 'Keys must match exactly, capitals too.'),
    recap([
      ['📖', 'A dictionary maps keys to values'],
      ['🔎', 'd["key"] looks up a value'],
      ['🔠', 'Keys must match exactly'],
    ]),
  ]),

  lesson('p-b-8-2', 'Changing a dictionary, and get()', 4, [
    run('Update the price board', 'Pick a change.', ['prices = {"Tea": 40, "Toast": 80}', '{{v}}', 'print(prices)'], ['prices["Cake"] = 60', 'prices["Tea"] = 45', 'del prices["Toast"]', 'prices.update({"Tea": 50, "Juice": 70})'], { caption: 'A new key adds an item; an existing key changes its value.' }),
    toggleRun('[ ] or get()?', [
      ['Square brackets', ['prices = {"Tea": 40}', 'print(prices["Cake"])'], 'A missing key stops the program.', ["KeyError: 'Cake'"]],
      ['get()', ['prices = {"Tea": 40}', 'print(prices.get("Cake", "Not on the menu"))'], 'get gives a default instead.', ['Not on the menu']],
    ]),
    predict('Counting orders', ['counts = {}', 'counts["Tea"] = counts.get("Tea", 0) + 1', 'counts["Tea"] = counts.get("Tea", 0) + 1', 'counts["Toast"] = counts.get("Toast", 0) + 1', 'print(counts)'], [
      [3, 'What will counts be?', ["{'Tea': 2}", "{'Tea': 1}", "{'Tea': 0}"], 'The second Tea adds 1 to the first.', { var: 'counts' }],
      [4, 'What will counts be now?', ["{'Tea': 2, 'Toast': 1}", "{'Toast': 1}", "{'Tea': 2, 'Toast': 0}"], 'Toast starts from 0 and becomes 1.', { var: 'counts' }],
    ]),
    check('What does d.get("x", 0) give when "x" isn’t a key?', ['0', 'None', 'An error', '"x"'], 'The default you gave.', 'The second value.', { mono: true }),
    tapbug('The price didn’t change', ['prices = {"Tea": 40}', 'prices["tea"] = 45'], [[2, '"tea"', '"Tea"']], 'A different key adds a new item instead of changing Tea.'),
    recap([
      ['✏️', 'd[key] = value adds or changes'],
      ['🗑', 'del d[key] removes'],
      ['🛟', 'd.get(key, default) never crashes'],
    ]),
  ]),

  lesson('p-b-8-3', 'Looping over a dictionary', 4, [
    run('Walk the price board', 'Pick what to list.', ['prices = {"Tea": 40, "Toast": 80, "Sandwich": 90}', 'print(list({{v}}))'], ['prices', 'prices.keys()', 'prices.values()', 'prices.items()'], { caption: 'items() gives (key, value) pairs.' }),
    explore('Keys and values together', ['for dish, price in prices.items():', '    print(f"{dish}: ₹{price}")'], [
      [1, 'items() gives each (dish, price) pair; the loop gets both names.'],
      [2, 'Use both in the line.'],
    ], { minTaps: 2 }),
    predict('Total of the board', ['prices = {"Tea": 40, "Toast": 80}', 'total = 0', 'for dish in prices:', '    total += prices[dish]', 'print(total)'], [
      [5, 'What will it print?', ['120', '2', '40'], 'Looping over a dictionary gives its keys; each key looks up its price.', { out: true }],
    ]),
    check('What does looping over a dictionary give you?', ['The keys', 'The values', 'Pairs', 'Positions'], 'Use values() or items() for the others.', 'The default is the key.'),
    truth([
      ['items() gives keys and values together', true, 'As pairs.'],
      ['values() gives the keys', false, 'It gives the values.'],
      ['sum(prices.values()) adds up every price', true, 'A quick total.'],
    ]),
    recap([
      ['🔑', 'for key in d visits the keys'],
      ['💰', 'values() for the values'],
      ['🤝', 'items() for both'],
    ]),
  ]),

  challenge('p-b-8-ch', 'Module 8 Challenge', { icon: '📖', name: 'Dictionary Pro' }, ['Store values under keys', 'Change dictionaries and read them safely', 'Loop over keys, values and items'], [
    mcq(1, 'Which makes a dictionary?', ['{"Tea": 40}', '["Tea": 40]', '("Tea", 40)', '{"Tea", 40}'], 'Curly brackets and key: value.', { mono: true }),
    mcq(2, 'How do you read Tea’s price?', ['prices["Tea"]', 'prices.Tea', 'prices(Tea)', 'prices[0]'], 'Square brackets and the key.', { mono: true }),
    mcq(3, 'What does prices["Cake"] = 60 do when Cake isn’t there yet?', ['Adds Cake', 'Raises KeyError', 'Changes Tea', 'Nothing'], 'A new key is added.'),
    mcq(4, 'Which avoids a KeyError?', ['get()', 'del', 'keys()', 'pop()'], 'get with a default.', { mono: true }),
    mcq(5, 'What does prices.items() give?', ['Key and value pairs', 'Only keys', 'Only values', 'Positions'], 'Pairs.'),
    swipe([
      ['Dictionary keys are unique', true, 'Each key appears once.'],
      ['Keys care about capitals', true, '"Tea" isn’t "tea".'],
      ['Dictionaries are read by position', false, 'By key.'],
      ['get() raises KeyError', false, 'It gives a default.'],
    ]),
    pairs([['d["k"]', 'Read a value'], ['d.get("k", 0)', 'Read safely'], ['d.items()', 'Pairs'], ['del d["k"]', 'Remove']], 'Dictionary tools.'),
    pickCode('Which prints every dish with its price?', ['for dish, price in prices.items(): print(dish, price)', 'for dish in prices.values(): print(dish)', 'for price in prices: print(price, dish)', 'print(prices.keys(values))'], 'items() gives both.'),
    bugTask(['print(prices["tea"])  # the key is "Tea"', 'prices = ["Tea": 40]', 'total = sum(prices.keys())'], [[1, '"tea"', '"Tea"'], [2, '["Tea": 40]', '{"Tea": 40}'], [3, 'keys', 'values']], 'Match the key exactly, use curly brackets, and add up the values.'),
    predictTask(['stock = {"Tea": 5, "Toast": 2}', 'stock["Toast"] -= 1', 'stock["Cake"] = 4', 'print(sum(stock.values()))'], 'What does it print?', ['10', '11', '7', '3'], '5 + 1 + 4.'),
    arrange(['prices = {"Tea": 40}', 'prices["Toast"] = 80', 'print(sum(prices.values()))'], 'make the board, add a dish, then total it', ['120']),
  ]),
];
