// JavaScript track · Module 9 · Objects, Sets and Maps. Lesson 9.1 keeps the old objects module id (j-obj-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const JS_M9: Lesson[] = [
  lesson('j-obj-1', 'Objects', 5, [
    chat(['One dish has a name, a price and whether it’s veg. Three separate variables get messy.', 'An object keeps related values together, each under its own label (a key).']),
    reveal('Making and reading objects', [
      ['{ dish: "Tea", price: 40 }', 'Curly braces, key: value pairs, separated by commas.'],
      ['tea.price', 'Dot: read a key you know by name.'],
      ['tea["price"]', 'Brackets: when the key is in a variable or has spaces.'],
      ['tea.size = "large"', 'Add or change a key.'],
      ['delete tea.size', 'Remove a key.'],
    ], { mono: true }),
    run('Read the dish', 'Pick what to read.', ['const tea = { dish: "Lemon Tea", price: 40, veg: true };', 'const key = "price";', 'console.log({{v}});'], ['tea.dish', 'tea.price', 'tea[key]', 'tea.veg ? "🟢" : "🔴"', 'tea.size'], { caption: 'A key that isn’t there gives undefined.' }),
    predict('Change it', ['const order = { dish: "Coffee", cups: 1 };', 'order.cups = 3;', 'order.table = 5;', 'console.log(order);'], [
      [2, 'What will order be now?', ['{"dish":"Coffee","cups":3}', '{"dish":"Coffee","cups":1}', '{"dish":"Coffee","cups":4}'], 'cups is replaced with 3.', { var: 'order' }],
      [3, 'And after adding a table?', ['{"dish":"Coffee","cups":3,"table":5}', '{"dish":"Coffee","cups":3}', '{"table":5}'], 'Setting a new key adds it.', { var: 'order' }],
    ]),
    place('Build a dish', 'Finish the object.', [['const toast = ', { gap: 0 }, ' dish', { gap: 1 }, ' "Cheese Toast", price: 80 ', { gap: 2 }, ';'], ['console.log(toast.dish);']], ['{', ':', '}', '=', '[', ']'], ['{', ':', '}'], 'Curly braces around key: value pairs.'),
    tapbug('It prints undefined', ['const tea = { dish: "Tea", price: 40 };', 'console.log(tea.Price);'], [[2, 'Price', 'price']], 'Keys are case-sensitive: price, not Price.'),
    recap([
      ['🗂', 'An object groups key: value pairs'],
      ['🔑', 'obj.key or obj["key"] to read'],
      ['✏️', 'Set a key to add or change it'],
    ]),
  ]),

  lesson('js-9-2', 'Methods and this', 5, [
    reveal('Objects that can do things', [
      ['A method', 'A function stored in an object: order.total().'],
      ['this', 'Inside a method, this means “the object this was called on”.'],
      ['Short form', 'total() { … } instead of total: function () { … }.'],
    ], { mono: true }),
    run('Call a method', 'Pick a method to call.', ['const order = {', '  dish: "Coffee",', '  price: 60,', '  cups: 2,', '  total() { return this.price * this.cups; },', '  label() { return `${this.cups} × ${this.dish}`; },', '};', 'console.log({{v}});'], ['order.total()', 'order.label()', 'order.total', 'order.price'], { caption: 'Without ( ), you get the function itself, not its answer.' }),
    predict('Following this', ['const cart = {', '  items: 0,', '  add() {', '    this.items++;', '  },', '};', 'cart.add();', 'cart.add();', 'console.log(cart.items);'], [
      [9, 'add() was called twice. What will it print?', ['2', '0', '1'], 'this is cart, so each call adds one to cart.items.', { out: true }],
    ]),
    toggleRun('Arrows and this', [
      ['Method', ['const shop = {', '  title: "Rosa’s Café",', '  sign() { return this.title; },', '};', 'console.log(`Sign: ${shop.sign()}`);'], 'A normal method: this is shop.', ['Sign: Rosa’s Café']],
      ['Arrow', ['const shop = {', '  title: "Rosa’s Café",', '  sign: () => this.title,', '};', 'console.log(`Sign: ${shop.sign()}`);'], 'An arrow function has no this of its own, so this isn’t the shop and the title is lost. Use normal methods in objects.', ['Sign: undefined']],
    ]),
    tapbug('NaN instead of the total', ['const order = {', '  price: 60, cups: 2,', '  total() { return price * cups; },', '};'], [[3, 'price * cups', 'this.price * this.cups']], 'Inside a method, reach the object’s own keys with this.'),
    recap([
      ['🛠', 'A method is a function in an object'],
      ['👉', 'this is the object the method was called on'],
      ['🏹', 'Arrow functions don’t get their own this'],
    ]),
  ]),

  lesson('js-9-3', 'Showing and copying objects', 5, [
    run('Look inside', 'Pick a helper.', ['const tea = { dish: "Lemon Tea", price: 40, veg: true };', 'console.log({{v}});'], ['JSON.stringify(tea)', 'Object.keys(tea)', 'Object.values(tea)', 'Object.entries(tea).length'], { caption: 'keys, values and entries turn an object into arrays you can loop over.' }),
    toggleRun('Unpack and copy', [
      ['Destructure', ['const tea = { dish: "Lemon Tea", price: 40 };', 'const { dish, price } = tea;', 'console.log(dish, price);'], 'Pull keys out into variables of the same name.', ['Lemon Tea 40']],
      ['Spread copy', ['const tea = { dish: "Lemon Tea", price: 40 };', 'const big = { ...tea, price: 60, size: "large" };', 'console.log(tea.price, big.price, big.size);'], '{ ...tea } copies the keys; later keys replace earlier ones.', ['40 60 large']],
      ['Shared, not copied', ['const tea = { price: 40 };', 'const same = tea;', 'same.price = 99;', 'console.log(tea.price);'], 'const same = tea doesn’t copy: both names point at one object.', ['99']],
    ]),
    matchUp('Match the tool', [['Object.keys', 'An array of the keys'], ['JSON.stringify', 'The object as text'], ['{ ...obj }', 'A copy'], ['const { a } = obj', 'Pull a key out']], 'Ways to look at, copy and unpack objects.'),
    check('After const b = a; b.x = 5; what is a.x?', ['5', 'undefined', 'The old value', 'An error'], 'b and a are the same object.', 'Was anything copied?'),
    tapbug('It prints undefined', ['const { Dish } = { dish: "Tea" };', 'console.log(Dish);'], [[1, '{ Dish }', '{ dish }']], 'Destructuring matches key names exactly, and keys are case-sensitive.'),
    recap([
      ['🔍', 'Object.keys / values / entries'],
      ['📋', '{ ...obj } copies; = only shares'],
      ['📦', 'const { a, b } = obj unpacks'],
    ]),
  ]),

  lesson('js-9-4', 'Sets', 4, [
    chat(['Rosa wants to know how many different tables ordered today, not how many orders.', 'A Set keeps each value only once.']),
    run('Unique tables', 'Pick what to print.', ['const tables = [4, 2, 4, 7, 2, 4];', 'const unique = new Set(tables);', 'console.log({{v}});'], ['unique.size', 'unique.has(7)', 'unique.has(9)', '[...unique]', 'tables.length'], { caption: 'Spread a Set into an array to see it: [...unique].' }),
    reveal('Set methods', [
      ['new Set([…])', 'Make one from a list; duplicates vanish.'],
      ['add(x) / delete(x)', 'Put in or take out a value.'],
      ['has(x)', 'Is it there? Much faster than searching an array.'],
      ['size', 'How many values.'],
      ['WeakSet', 'A special Set for objects only, cleaned up automatically. Rarely needed.'],
    ], { mono: true }),
    place('Remove duplicates', 'Turn the list into unique dishes.', [['const orders = ["Tea", "Toast", "Tea"];'], ['const dishes = [...new ', { gap: 0 }, '(orders)];'], ['console.log(dishes);']], ['Set', 'Map', 'Array', 'Object'], ['Set'], 'A Set drops repeats; spread turns it back into an array.'),
    truth([
      ['A Set can hold the same value twice', false, 'Each value only once.'],
      ['set.size counts the values', true, 'Like length for arrays.'],
      ['has() checks whether a value is in the Set', true, 'Fast lookups.'],
    ]),
    recap([
      ['🎯', 'A Set keeps unique values'],
      ['➕', 'add, delete, has, size'],
      ['🔁', '[...new Set(list)] removes duplicates'],
    ]),
  ]),

  lesson('js-9-5', 'Maps', 4, [
    run('A price map', 'Pick a Map action.', ['const prices = new Map([["Tea", 40], ["Coffee", 60]]);', 'prices.set("Toast", 80);', 'console.log({{v}});'], ['prices.get("Coffee")', 'prices.has("Juice")', 'prices.size', '[...prices.keys()]'], { caption: 'set adds, get reads, has checks, size counts.' }),
    toggleRun('Object or Map?', [
      ['Object', ['const stock = {};', 'stock["Tea"] = 20;', 'console.log(Object.keys(stock).length);'], 'Fine for fixed labels, like a dish’s details.', ['1']],
      ['Map', ['const stock = new Map();', 'stock.set("Tea", 20);', 'stock.set(42, "table 42");', 'console.log(stock.size, stock.get(42));'], 'Any kind of key (numbers, even objects), a size, and a reliable order. Good for lookups that grow.', ['2 table 42']],
    ]),
    reveal('Map methods', [
      ['set(key, value)', 'Add or change.'],
      ['get(key)', 'Read (undefined if missing).'],
      ['has / delete / size', 'Check, remove, count.'],
      ['for (const [k, v] of map)', 'Loop over every pair.'],
      ['WeakMap', 'Object keys only, cleaned up automatically.'],
    ], { mono: true }),
    check('Which reads the value for "Tea" from a Map called prices?', ['prices.get("Tea")', 'prices["Tea"]', 'prices.Tea', 'prices.find("Tea")'], 'Maps use get and set.', 'A Map method.'),
    tapbug('get gives undefined', ['const prices = new Map();', 'prices["Tea"] = 40;', 'console.log(prices.get("Tea"));'], [[2, 'prices["Tea"] = 40;', 'prices.set("Tea", 40);']], 'Square brackets stick a plain key on the Map object, not in the Map. Use set.'),
    recap([
      ['🗺', 'A Map stores key → value pairs'],
      ['🔑', 'Any type of key'],
      ['📏', 'get, set, has, delete, size'],
    ]),
  ]),

  lesson('js-9-6', 'Iterables and generators', 5, [
    reveal('What can for…of loop over?', [
      ['Iterable', 'Anything for…of can walk through: arrays, strings, Sets, Maps.'],
      ['Not iterable', 'Plain objects. Use Object.keys or Object.entries first.'],
      ['Iterator', 'The thing doing the walking: it hands out one value each time next() is called.'],
    ]),
    toggleRun('Looping over different things', [
      ['String', ['for (const ch of "Tea") console.log(ch);'], 'Each letter.', ['T', 'e', 'a']],
      ['Set', ['for (const t of new Set([4, 4, 7])) console.log(t);'], 'Each unique value.', ['4', '7']],
      ['Map', ['for (const [dish, price] of new Map([["Tea", 40]])) console.log(dish, price);'], 'Each pair, unpacked.', ['Tea 40']],
    ]),
    predict('A token generator', ['function* tokens() {', '  yield 1;', '  yield 2;', '}', 'const gen = tokens();', 'const a = gen.next().value;', 'const b = gen.next().value;', 'console.log(a, b);'], [
      [8, 'Each next() runs the generator up to the next yield. What will it print?', ['1 2', '1 1', '2 2'], 'The first next() pauses at yield 1, the second at yield 2.', { out: true }],
    ]),
    check('Which of these can for…of NOT loop over directly?', ['A plain object { a: 1 }', 'An array', 'A string', 'A Set'], 'Plain objects aren’t iterable. Use Object.entries(obj).', 'Which one has keys, not order?'),
    tapbug('TypeError: order is not iterable', ['const order = { dish: "Tea", cups: 2 };', 'for (const part of order) {', '  console.log(part);', '}'], [[2, 'order', 'Object.entries(order)']], 'A plain object isn’t iterable. Loop over Object.entries(order) instead.'),
    recap([
      ['🚶', 'Arrays, strings, Sets and Maps are iterable'],
      ['🗂', 'Plain objects need Object.entries'],
      ['⏸', 'function* and yield make a generator'],
    ]),
  ]),

  challenge('js-9-ch', 'Module 9 Challenge', { icon: '🗂', name: 'Object Pro' }, ['Build and change objects', 'Use methods, this, copies and destructuring', 'Pick Sets and Maps when they fit'], [
    mcq(1, 'How do you read the price key of tea?', ['tea.price', 'tea(price)', 'tea->price', 'price.tea'], 'Dot notation.', { mono: true }),
    mcq(2, 'Inside a method, what is this?', ['The object the method was called on', 'The page', 'The function', 'Always undefined'], 'this follows the object before the dot.'),
    mcq(3, 'What does Object.keys({ a: 1, b: 2 }) give?', ['["a", "b"]', '[1, 2]', '2', '"a,b"'], 'The keys, as an array.', { mono: true }),
    mcq(4, 'What is new Set([1, 1, 2]).size?', ['2', '3', '1', '0'], 'Duplicates are dropped.', { mono: true }),
    mcq(5, 'Which makes a real copy of an object?', ['{ ...obj }', 'const b = obj', 'obj.copy', 'new obj'], 'Spread copies the keys.', { mono: true }),
    swipe([
      ['Keys are case-sensitive', true, 'price and Price are different.'],
      ['const b = a copies an object', false, 'Both names share one object.'],
      ['A Map can use numbers as keys', true, 'Any type works.'],
      ['Plain objects work with for…of', false, 'Use Object.entries first.'],
    ]),
    pairs([['{ ...obj }', 'Copy'], ['new Set()', 'Unique values'], ['map.get(k)', 'Read from a Map'], ['function*', 'A generator']], 'Objects, Sets, Maps and generators.'),
    pickCode('Which pulls dish and price out of tea into variables?', ['const { dish, price } = tea;', 'const [dish, price] = tea;', 'const dish, price = tea;', 'const { tea } = dish, price;'], 'Curly braces destructure objects.'),
    bugTask(['const order = { price: 60, cups: 2,', '  total() { return price * cups; } };', 'console.log(order.Total());'], [[2, 'price * cups', 'this.price * this.cups'], [3, 'Total', 'total']], 'Use this inside methods, and names are case-sensitive.'),
    predictTask(['const tea = { dish: "Tea", price: 40 };', 'const big = { ...tea, price: 55 };', 'big.dish = "Big Tea";', 'console.log(tea.dish, big.price);'], 'What does it print?', ['Tea 55', 'Big Tea 55', 'Tea 40', 'Big Tea 40'], 'big is a copy, so changing it leaves tea alone.'),
    arrange(['const tables = [3, 5, 3, 8, 5];', 'const unique = new Set(tables);', 'const count = unique.size;', 'console.log(`Tables served: ${count}`);'], 'list the tables, make a Set, count it, then print', ['Tables served: 3']),
  ]),
];
