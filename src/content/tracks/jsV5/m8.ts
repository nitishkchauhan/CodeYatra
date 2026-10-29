// JavaScript track · Module 8 · Arrays. Lesson 8.1 keeps the old arrays module id (j-arr-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M8: Lesson[] = [
  lesson('j-arr-1', 'Arrays', 5, [
    chat(['Rosa’s menu isn’t one dish, it’s a list. Today’s orders are a list. Table numbers are a list.', 'An array keeps many values in order, in one variable.']),
    reveal('Making and reading arrays', [
      ['["Tea", "Coffee", "Toast"]', 'Square brackets, items separated by commas.'],
      ['menu[0]', 'The first item. Counting starts at 0.'],
      ['menu.length', 'How many items: 3.'],
      ['menu[menu.length - 1]', 'The last item. menu.at(-1) does the same.'],
    ], { mono: true }),
    run('Read the menu', 'Pick what to read.', ['const menu = ["Lemon Tea", "Coffee", "Cheese Toast"];', 'console.log({{v}});'], ['menu[0]', 'menu[2]', 'menu.length', 'menu.at(-1)', 'menu[3]'], { caption: 'menu[3] is undefined: there is no fourth item.' }),
    predict('Change an item', ['const menu = ["Tea", "Coffee"];', 'menu[1] = "Cold Coffee";', 'const count = menu.length;', 'console.log(menu, count);'], [
      [2, 'What will menu be after this line?', ['["Tea","Cold Coffee"]', '["Cold Coffee","Coffee"]', '["Tea","Coffee","Cold Coffee"]'], 'Position 1 is the second item, and it is replaced.', { var: 'menu' }],
      [3, 'What will count be?', ['2', '3', '1'], 'Replacing doesn’t add an item.', { var: 'count' }],
    ]),
    reveal('const arrays can still change', [
      ['const menu = […]', 'The box always holds the same array…'],
      ['menu.push("Toast")', '…but the array itself can gain, lose or change items.'],
      ['menu = []', 'This is what const forbids: putting a different array in the box.'],
    ], { mono: true }),
    tapbug('It prints undefined, not Tea', ['const menu = ["Tea", "Coffee"];', 'console.log(menu[1]);'], [[2, '1', '0']], 'Arrays count from 0, so the first item is menu[0].'),
    recap([
      ['📚', 'An array is an ordered list'],
      ['0️⃣', 'Positions start at 0'],
      ['📏', '.length counts the items'],
    ]),
  ]),

  lesson('js-8-2', 'Changing arrays', 5, [
    run('Change the order list', 'Pick a change. The program prints the list after it.', ['const orders = ["Tea", "Coffee", "Toast"];', '{{v}};', 'console.log(orders);'], ['orders.push("Cake")', 'orders.pop()', 'orders.unshift("Water")', 'orders.shift()', 'orders.splice(1, 1)', 'orders.splice(1, 0, "Juice")'], { caption: 'push/pop work at the end; unshift/shift at the start; splice removes or inserts in the middle.' }),
    matchUp('Which end?', [['push', 'Add to the end'], ['pop', 'Remove from the end'], ['unshift', 'Add to the start'], ['shift', 'Remove from the start']], 'Two pairs: end and start.'),
    toggleRun('Copy or change?', [
      ['slice', ['const menu = ["Tea", "Coffee", "Toast"];', 'const two = menu.slice(0, 2);', 'console.log(two, menu.length);'], 'slice copies part of the list. The original keeps all 3 items.', ['["Tea","Coffee"] 3']],
      ['splice', ['const menu = ["Tea", "Coffee", "Toast"];', 'const gone = menu.splice(0, 2);', 'console.log(gone, menu.length);'], 'splice cuts items out of the original. Only 1 is left.', ['["Tea","Coffee"] 1']],
      ['concat', ['const drinks = ["Tea"];', 'const food = ["Toast"];', 'console.log(drinks.concat(food));'], 'concat joins two arrays into a new one.', ['["Tea","Toast"]']],
    ]),
    predict('A queue at the counter', ['const queue = ["Ava", "Reed"];', 'queue.push("Megan");', 'const served = queue.shift();', 'console.log(served, queue);'], [
      [2, 'What will queue be?', ['["Ava","Reed","Megan"]', '["Megan","Ava","Reed"]', '["Ava","Reed"]'], 'push adds to the end.', { var: 'queue' }],
      [3, 'Who is served first?', ['"Ava"', '"Megan"', '"Reed"'], 'shift takes from the start: first come, first served.', { var: 'served' }],
    ]),
    check('Which removes the last item?', ['pop()', 'shift()', 'slice()', 'push()'], 'pop takes from the end.', 'Think of a stack of plates.'),
    recap([
      ['➕', 'push / unshift add'],
      ['➖', 'pop / shift remove'],
      ['✂️', 'slice copies, splice changes'],
    ]),
  ]),

  lesson('js-8-3', 'Finding things', 4, [
    run('Search the menu', 'Pick a search.', ['const menu = [', '  { dish: "Lemon Tea", price: 40 },', '  { dish: "Coffee", price: 60 },', '  { dish: "Cheese Toast", price: 80 },', '];', 'console.log({{v}});'], ['menu.find((m) => m.price > 50)', 'menu.findIndex((m) => m.dish === "Coffee")', 'menu.some((m) => m.price > 70)', 'menu.every((m) => m.price < 100)', 'menu.find((m) => m.price > 100)'], { caption: 'find gives the first match (or undefined), some asks “any?”, every asks “all?”.' }),
    matchUp('Pick the method', [['includes', 'Is this exact value there?'], ['indexOf', 'Where is it?'], ['find', 'First item that passes a test'], ['some', 'Does any item pass?']], 'Each answers a different question.'),
    place('Is Coffee on the menu?', 'Finish the check.', [['const menu = ["Tea", "Coffee"];'], ['console.log(menu.', { gap: 0 }, '("Coffee"));']], ['includes', 'find', 'push', 'has'], ['includes'], 'includes answers true or false for an exact value.'),
    tapbug('It always says not found', ['const prices = [40, 60, 80];', 'if (prices.indexOf(40)) {', '  console.log("Found");', '}'], [[2, 'prices.indexOf(40)', 'prices.includes(40)']], '40 is at position 0, and 0 is falsy. Use includes for a yes-or-no question.'),
    check('What does [40, 60].find((p) => p > 100) give?', ['undefined', 'null', '-1', '[]'], 'Nothing passed the test, so find gives undefined.', 'find gives an item, or nothing.'),
    recap([
      ['🔍', 'includes, indexOf for exact values'],
      ['🎯', 'find, findIndex with a test function'],
      ['❓', 'some (any?), every (all?)'],
    ]),
  ]),

  lesson('js-8-4', 'Sorting', 4, [
    toggleRun('Sorting numbers', [
      ['sort()', ['const prices = [80, 120, 40, 9];', 'console.log(prices.sort());'], 'Surprise! Without help, sort compares as text, so "120" comes before "40".', ['[120,40,80,9]']],
      ['sort((a, b) => a - b)', ['const prices = [80, 120, 40, 9];', 'console.log(prices.sort((a, b) => a - b));'], 'A compare function sorts numbers properly, smallest first.', ['[9,40,80,120]']],
      ['b - a', ['const prices = [80, 120, 40, 9];', 'console.log(prices.sort((a, b) => b - a));'], 'Swap them for biggest first.', ['[120,80,40,9]']],
    ]),
    run('Sort the menu', 'Pick a sort.', ['const menu = [', '  { dish: "Toast", price: 80 },', '  { dish: "Tea", price: 40 },', '  { dish: "Coffee", price: 60 },', '];', 'menu.sort({{v}});', 'console.log(menu.map((m) => m.dish).join(", "));'], ['(a, b) => a.price - b.price', '(a, b) => b.price - a.price', '(a, b) => a.dish.localeCompare(b.dish)'], { caption: 'localeCompare sorts text alphabetically. sort changes the array itself; reverse() flips it.' }),
    check('Which sorts numbers from smallest to largest?', ['nums.sort((a, b) => a - b)', 'nums.sort()', 'nums.sort((a, b) => b - a)', 'nums.reverse()'], 'a - b puts smaller first.', 'Plain sort() compares text.'),
    tapbug('The cheapest dish isn’t first', ['const prices = [100, 40, 60];', 'prices.sort();', 'console.log(prices[0]);'], [[2, 'sort()', 'sort((a, b) => a - b)']], 'Plain sort() compares as text, so 100 comes first. Give it a compare function.'),
    truth([
      ['sort() changes the original array', true, 'It sorts in place (and also returns it).'],
      ['reverse() makes a sorted copy', false, 'It flips the original, and doesn’t sort.'],
      ['localeCompare compares text', true, 'Good for sorting names.'],
    ]),
    recap([
      ['⚠️', 'sort() alone compares as text'],
      ['🔢', 'sort((a, b) => a - b) for numbers'],
      ['🔤', 'localeCompare for text'],
    ]),
  ]),

  lesson('js-8-5', 'map, filter, reduce', 6, [
    chat(['Three array methods do most of the everyday work: change every item, keep some items, and boil a list down to one value.', 'Rosa uses all three for every bill.']),
    run('One bill, three methods', 'Pick a method.', ['const cart = [', '  { dish: "Tea", price: 40, veg: true },', '  { dish: "Chicken Sandwich", price: 150, veg: false },', '  { dish: "Toast", price: 80, veg: true },', '];', 'console.log({{v}});'], ['cart.map((c) => c.dish)', 'cart.filter((c) => c.veg)', 'cart.reduce((sum, c) => sum + c.price, 0)', 'cart.filter((c) => c.veg).map((c) => c.price)'], { caption: 'They chain: filter, then map, then reduce.' }),
    reveal('What each one gives back', [
      ['map', 'A new array, the same length, every item changed.', '🔁'],
      ['filter', 'A new array with only the items that pass the test.', '🧹'],
      ['reduce', 'One value, built up item by item (a total, a count).', '🧮'],
      ['forEach', 'Nothing: just does something with each item.', '👣'],
    ]),
    predict('reduce step by step', ['const prices = [40, 60, 80];', 'let total = 0;', 'for (const p of prices) {', '  total = total + p;', '}', 'const same = prices.reduce((sum, p) => sum + p, 0);', 'console.log(total, same);'], [
      [4, 'First round, p is 40. What will total be?', ['40', '0', '180'], 'reduce does exactly this: carry a running total.', { var: 'total' }],
      [7, 'What will it print?', ['180 180', '180 0', '40 180'], 'The loop and reduce give the same answer.', { out: true }],
    ]),
    place('Veg dishes only', 'Keep the veg dishes, then take their names.', [['const cart = [{ dish: "Tea", veg: true }, { dish: "Chicken Sandwich", veg: false }];'], ['const names = cart.', { gap: 0 }, '((c) => c.veg).', { gap: 1 }, '((c) => c.dish);'], ['console.log(names);']], ['filter', 'map', 'reduce', 'find'], ['filter', 'map'], 'filter keeps, then map changes each item.'),
    tapbug('The total is “0[object Object]…”', ['const total = cart.reduce((sum, c) => sum + c, 0);'], [[1, 'sum + c', 'sum + c.price']], 'Each item is an object. Add its price, not the whole object.'),
    recap([
      ['🔁', 'map changes every item'],
      ['🧹', 'filter keeps some items'],
      ['🧮', 'reduce boils a list down to one value'],
    ]),
  ]),

  lesson('js-8-6', 'Destructuring and spread', 5, [
    toggleRun('Unpack a list', [
      ['The long way', ['const top = ["Tea", "Coffee", "Toast"];', 'const first = top[0];', 'const second = top[1];', 'console.log(first, second);'], 'One line per item.', ['Tea Coffee']],
      ['Destructuring', ['const top = ["Tea", "Coffee", "Toast"];', 'const [first, second] = top;', 'console.log(first, second);'], 'Unpack by position in one line.', ['Tea Coffee']],
      ['With ...rest', ['const top = ["Tea", "Coffee", "Toast"];', 'const [first, ...rest] = top;', 'console.log(first, rest);'], '...rest collects whatever is left.', ['Tea ["Coffee","Toast"]']],
    ]),
    run('Spread', 'Pick a use of ... (spread).', ['const drinks = ["Tea", "Coffee"];', 'const food = ["Toast"];', 'console.log({{v}});'], ['[...drinks, ...food]', '[...drinks, "Juice"]', 'Math.max(...[40, 60, 80])', '[...drinks].reverse()'], { caption: 'Spread lays the items out, as if you typed them one by one.' }),
    predict('Copies are separate', ['const menu = ["Tea"];', 'const copy = [...menu];', 'copy.push("Coffee");', 'console.log(menu.length, copy.length);'], [
      [3, 'After pushing to copy, what is copy?', ['["Tea","Coffee"]', '["Tea"]', '["Coffee"]'], 'copy is a new array with the same items.', { var: 'copy' }],
      [4, 'What will it print?', ['1 2', '2 2', '1 1'], 'menu wasn’t touched: spread made a real copy.', { out: true }],
    ]),
    check('What does const [a, b] = [5, 9] put in b?', ['9', '5', '[5, 9]', 'undefined'], 'By position: a gets 5, b gets 9.', 'Second place.'),
    tapbug('The menu grew too', ['const menu = ["Tea"];', 'const copy = menu;', 'copy.push("Coffee");', 'console.log(menu.length);'], [[2, 'menu', '[...menu]']], 'const copy = menu shares the same array. Spread makes a real copy.'),
    recap([
      ['📦', 'const [a, b] = list unpacks by position'],
      ['🧺', '...rest collects what’s left'],
      ['📋', '[...list] copies; [...a, ...b] joins'],
    ]),
  ]),

  challenge('js-8-ch', 'Module 8 Challenge', { icon: '📚', name: 'List Keeper' }, ['Read and change arrays', 'Find and sort items', 'Use map, filter, reduce, destructuring and spread'], [
    mcq(1, 'What is ["a", "b", "c"][1]?', ['"b"', '"a"', '"c"', 'undefined'], 'Counting from 0.', { mono: true }),
    mcq(2, 'Which adds an item to the end?', ['push', 'shift', 'pop', 'slice'], 'push adds to the end.', { mono: true }),
    mcq(3, 'What does [3, 10, 2].sort() give?', ['[10, 2, 3]', '[2, 3, 10]', '[10, 3, 2]', '[3, 10, 2]'], 'Without a compare function, it sorts as text.', { mono: true }),
    mcq(4, 'Which keeps only some items?', ['filter', 'map', 'reduce', 'push'], 'filter keeps items that pass a test.', { mono: true }),
    mcq(5, 'What does [...a, ...b] do?', ['Joins the two arrays into a new one', 'Removes items', 'Sorts them', 'Makes a string'], 'Spread lays the items out.'),
    swipe([
      ['slice changes the original array', false, 'slice copies; splice changes.'],
      ['map gives an array the same length', true, 'Every item is changed.'],
      ['find gives undefined when nothing matches', true, 'Check for it.'],
      ['A const array can never change', false, 'Its items can; only the box can’t be refilled.'],
    ]),
    pairs([['map', 'Change every item'], ['reduce', 'Boil down to one value'], ['some', 'Does any pass?'], ['splice', 'Cut from the middle']], 'Array methods.'),
    pickCode('Which totals the prices in cart?', ['cart.reduce((sum, c) => sum + c.price, 0)', 'cart.map((c) => c.price)', 'cart.filter((c) => c.price)', 'cart.reduce((sum, c) => sum + c, "")'], 'Start at 0, add each price.'),
    bugTask(['const prices = [100, 40];', 'prices.sort();', 'const first = prices[1];', 'const veg = cart.map((c) => c.veg);'], [[2, 'sort()', 'sort((a, b) => a - b)'], [4, 'map', 'filter']], 'Numbers need a compare function, and keeping some items is filter, not map.'),
    predictTask(['const cart = [40, 150, 80];', 'const cheap = cart.filter((p) => p < 100);', 'const total = cheap.reduce((s, p) => s + p, 0);', 'console.log(cheap.length, total);'], 'What does it print?', ['2 120', '3 270', '2 270', '1 40'], '40 and 80 are under 100: two items, ₹120.'),
    arrange(['const cart = [{ dish: "Tea", price: 40 }, { dish: "Toast", price: 80 }];', 'const prices = cart.map((c) => c.price);', 'const total = prices.reduce((s, p) => s + p, 0);', 'console.log(`Total: ₹${total}`);'], 'make the cart, take the prices, add them up, then print', ['Total: ₹120']),
  ]),
];
