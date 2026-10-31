// Python Basic · Module 12 · Classes and objects, and the final project: Rosa’s billing app, in the Python code
// editor with hidden tests. Lesson 12.1 keeps the old module id (p-class-1) and the project keeps p-project.
import type { Lesson } from '../../types';
import { bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, project, recap, reveal, run, swipe, tapbug, truth } from './kit';

const DISH = ['class Dish:', '    def __init__(self, name, price):', '        self.name = name', '        self.price = price'];

// ── The final project ───────────────────────────────────────────────────────────────────────────
const PRICES = 'PRICES = {"tea": 40, "toast": 80, "sandwich": 90}\n';
const S1 = `${PRICES}
def price_of(item):
    return PRICES.get(item.strip().lower(), 0)
`;
const S2 = `${S1}
def order_total(order):
    total = 0
    for item, qty in order.items():
        total += price_of(item) * qty
    return total
`;
const S3 = `${S2}
def final_amount(total):
    if total >= 500:
        total = total * 0.9
    return round(total * 1.05)
`;
const S4 = `${S3}
def receipt(order):
    lines = []
    for item, qty in order.items():
        lines.append(f"{item} x{qty} = {price_of(item) * qty}")
    lines.append(f"Total: {final_amount(order_total(order))}")
    return "\\n".join(lines)
`;

export const PY_B_M12: Lesson[] = [
  lesson('p-class-1', 'What is an object?', 4, [
    chat(['An object bundles data and actions together. A Dish object knows its name and price, and can work out its price with tax.', 'A class is the template, and objects are the things made from it: like a cookie cutter and its cookies.']),
    reveal('Objects everywhere', [
      ['"Tea".upper()', 'Strings are objects: upper() is one of their actions.'],
      ['[1, 2].append(3)', 'Lists are objects too.'],
      ['class Dish:', 'Your own kind of object.'],
      ['Dish("Tea", 40)', 'Making one: an object (also called an instance).'],
    ], { mono: true }),
    run('Your first class', 'Pick a line.', [...DISH, 'tea = Dish("Lemon Tea", 40)', 'toast = Dish("Cheese Toast", 80)', 'print({{v}})'], ['tea.name', 'toast.price', 'tea.price + toast.price', 'type(tea).__name__'], { caption: 'One class, two objects, each with its own values.' }),
    check('If Dish is the cookie cutter, what is Dish("Tea", 40)?', ['A cookie: one object', 'Another cutter', 'A function', 'A list'], 'Each call makes a new object.', 'Cutter makes cookies.'),
    truth([
      ['A class is a template for objects', true, 'It describes them.'],
      ['Each object has its own values', true, 'tea.price and toast.price are different.'],
      ['A class can make only one object', false, 'As many as you like.'],
    ]),
    recap([
      ['🍪', 'A class is the template; objects are made from it'],
      ['📦', 'Objects hold data (attributes)'],
      ['⚙️', 'Objects can do things (methods)'],
    ]),
  ]),

  lesson('p-b-12-2', '__init__ and attributes', 5, [
    explore('Inside __init__', [...DISH, 'tea = Dish("Lemon Tea", 40)'], [
      [2, '__init__ runs by itself every time an object is made.'],
      [3, 'self is the new object. self.name stores the name inside it.'],
      [5, '"Lemon Tea" and 40 go into name and price.'],
    ], { minTaps: 3 }),
    predict('Two objects, their own values', [...DISH, 'tea = Dish("Tea", 40)', 'cake = Dish("Cake", 60)', 'tea.price = 45', 'print(tea.price, cake.price)'], [
      [8, 'What will it print?', ['45 60', '45 45', '40 60'], 'Changing tea doesn’t touch cake.', { out: true }],
    ]),
    run('Change an attribute', 'Pick a change.', [...DISH, 'tea = Dish("Lemon Tea", 40)', '{{v}}', 'print(tea.name, tea.price)'], ['pass', 'tea.price = 45', 'tea.name = "Iced Tea"', 'tea.price = tea.price * 2'], { caption: 'Attributes are read and changed with a dot.' }),
    check('What is self?', ['The object being made or used', 'The class name', 'A keyword for loops', 'The first value you type'], 'Python passes the object in as self.', 'It means “this object”.'),
    tapbug("AttributeError: 'Dish' object has no attribute 'price'", ['    def __init__(self, name, price):', '        self.name = name', '        price = price'], [[3, 'price = price', 'self.price = price']], 'Without self., the value isn’t stored in the object.'),
    recap([
      ['🛠', '__init__ sets up each new object'],
      ['🪪', 'self.name = name stores a value inside it'],
      ['🔹', 'object.attribute reads or changes it'],
    ]),
  ]),

  lesson('p-b-12-3', 'Methods', 5, [
    run('Objects that do things', 'Pick a call.', [...DISH, '    def with_tax(self):', '        return round(self.price * 1.05)', '    def label(self):', '        return f"{self.name}: ₹{self.price}"', 'tea = Dish("Lemon Tea", 40)', 'print({{v}})'], ['tea.label()', 'tea.with_tax()', 'Dish("Veg Sandwich", 90).label()'], { caption: 'A method is a function inside a class. It uses self to reach the object’s values.' }),
    predict('A shopping cart', ['class Cart:', '    def __init__(self):', '        self.items = []', '    def add(self, price):', '        self.items.append(price)', '    def total(self):', '        return sum(self.items)', 'cart = Cart()', 'cart.add(40)', 'cart.add(80)', 'print(cart.total())'], [
      [11, 'What will it print?', ['120', '80', '2'], 'Two prices went into the cart’s list.', { out: true }],
    ]),
    matchUp('Words for classes', [['class', 'The template'], ['object', 'One thing made from it'], ['attribute', 'A value it stores'], ['method', 'An action it can do']], 'The four words you need.'),
    check('How do you call the method label on tea?', ['tea.label()', 'label(tea.)', 'tea.label', 'Dish.label'], 'Object, dot, method, brackets.', 'Like "Tea".upper().', { mono: true }),
    tapbug('TypeError: Dish.label() takes 0 positional arguments but 1 was given', ['    def label():', '        return self.name'], [[1, 'label()', 'label(self)']], 'Every method needs self as its first parameter.'),
    recap([
      ['⚙️', 'Methods are functions inside a class'],
      ['🪞', 'They take self first'],
      ['📞', 'Call them with object.method()'],
    ]),
  ]),

  challenge('p-project', 'Final: Rosa’s billing app', { icon: '🏆', name: 'Python Starter' }, ['Write a real program from small functions', 'Use dictionaries, loops and decisions together', 'Print a receipt people can read'], [
    mcq(1, 'Which shows text on the screen?', ['print()', 'input()', 'show()', 'len()'], 'print.', { mono: true }),
    mcq(2, 'Which stores a value?', ['cups = 2', 'cups == 2', 'cups(2)', '2 = cups'], 'One = stores.', { mono: true }),
    mcq(3, 'Which repeats for each item?', ['for', 'if', 'def', 'class'], 'A for loop.', { mono: true }),
    mcq(4, 'Which is best for looking up a price by dish name?', ['A dictionary', 'A list', 'A string', 'A number'], 'Keys and values.'),
    mcq(5, 'Which hands back an answer from a function?', ['return', 'print', 'break', 'input'], 'return.', { mono: true }),
    swipe([
      ['input() gives back text', true, 'Convert it for maths.'],
      ['List positions start at 1', false, 'At 0.'],
      ['with open(…) closes the file for you', true, 'Even after an error.'],
      ['A class is one single object', false, 'It is the template.'],
    ]),
    pairs([['if', 'Decide'], ['for', 'Repeat'], ['def', 'Make a function'], ['class', 'Make a template']], 'Your Python Basic toolkit.'),
    pickCode('Which gives the price of tea from prices?', ['prices["tea"]', 'prices[tea]', 'prices.tea', 'prices(0)'], 'A dictionary lookup with the key in quotes.'),
    bugTask(['print("Total: " + 168)', 'for item in order', 'def total(order)'], [[1, '+ 168', '+ str(168)'], [2, 'order', 'order:'], [3, '(order)', '(order):']], 'Numbers become text before joining, and for and def lines end with a colon.'),
    predictTask(['prices = {"tea": 40, "toast": 80}', 'order = {"tea": 3}', 'total = 0', 'for item in order:', '    total += prices[item] * order[item]', 'print(total)'], 'What does it print?', ['120', '40', '3', '240'], '3 teas at 40.'),
    project(1, {
      title: 'Step 1 · Look up a price',
      instructions: 'Rosa: “Customers type dishes any way: Tea, tea, or  TOAST .” Write price_of(item): clean the name (strip and lower), and give back its price from PRICES, or 0 if Rosa doesn’t sell it.',
      starter: `${PRICES}\ndef price_of(item):\n    return 0\n`,
      tests: [
        { call: 'price_of("tea")', expect: '40' },
        { call: 'price_of("  Toast ")', expect: '80' },
        { call: 'price_of("cake")', expect: '0' },
      ],
      hint: 'return PRICES.get(item.strip().lower(), 0)',
      solution: S1,
    }),
    project(2, {
      title: 'Step 2 · Add up an order',
      instructions: 'An order is a dictionary of dish → how many, like {"tea": 2, "toast": 1}. Write order_total(order) that adds up price × quantity for every dish.',
      starter: `${S1}\ndef order_total(order):\n    return 0\n`,
      tests: [
        { call: 'order_total({"tea": 2, "toast": 1})', expect: '160' },
        { call: 'order_total({"cake": 3, "tea": 1})', expect: '40' },
        { call: 'order_total({})', expect: '0' },
      ],
      hint: 'total = 0, then for item, qty in order.items(): total += price_of(item) * qty',
      solution: S2,
    }),
    project(3, {
      title: 'Step 3 · Discount and tax',
      instructions: 'Rosa’s rules: bills of ₹500 or more get 10% off, then 5% tax is added. Write final_amount(total) that gives back the amount to pay, rounded to whole rupees.',
      starter: `${S2}\ndef final_amount(total):\n    return total\n`,
      tests: [
        { call: 'final_amount(160)', expect: '168' },
        { call: 'final_amount(600)', expect: '567' },
        { call: 'final_amount(0)', expect: '0' },
      ],
      hint: 'if total >= 500: total = total * 0.9. Then return round(total * 1.05)',
      solution: S3,
    }),
    project(4, {
      title: 'Step 4 · Print the receipt',
      instructions: 'Write receipt(order) that gives back one line per dish, like “tea x2 = 80”, and a last line “Total: 168” (the final amount), joined with new lines.',
      starter: `${S3}\ndef receipt(order):\n    return ""\n`,
      tests: [
        { call: 'receipt({"tea": 2, "toast": 1})', expect: '"tea x2 = 80\\ntoast x1 = 80\\nTotal: 168"' },
        { call: 'receipt({})', expect: '"Total: 0"' },
      ],
      hint: 'lines.append(f"{item} x{qty} = {price_of(item) * qty}") in a loop, then the Total line, then return "\\n".join(lines)',
      solution: S4,
    }),
  ], 'project'),
];
