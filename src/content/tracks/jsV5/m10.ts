// JavaScript track · Module 10 · Classes and Dates. Lesson 10.1 keeps the old classes module id (j-class-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, place, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const ORDER = ['class Order {', '  constructor(dish, price) {', '    this.dish = dish;', '    this.price = price;', '    this.cups = 1;', '  }', '  add() {', '    this.cups++;', '  }', '  total() {', '    return this.price * this.cups;', '  }', '}'];

export const JS_M10: Lesson[] = [
  lesson('j-class-1', 'Classes', 6, [
    chat(['Every order at Rosa’s Café has the same shape: a dish, a price, a number of cups, and a way to add one more and work out the total.', 'A class is a blueprint. Each order made from it is an object with its own values.']),
    explore('Reading a class', ORDER, [
      [1, 'class Order: the blueprint’s name, with a capital letter by habit.'],
      [2, 'constructor runs once for every new Order. dish and price come from new Order("Tea", 40).'],
      [3, 'this is the new object being built. this.dish = dish stores the dish on it.'],
      [7, 'A method: every order can add a cup to itself.'],
      [10, 'Another method that works out the order’s own total.'],
    ], { page: { html: '<p>An Order object: { dish: "Tea", price: 40, cups: 1 }</p>' }, minTaps: 3 }),
    run('Make some orders', 'Pick what to do with a new Order.', [...ORDER, 'const o = new Order("Coffee", 60);', '{{v}};', 'console.log(o.dish, o.cups, o.total());'], ['o.add()', 'o.add(); o.add()', 'o.price = 50', 'o.cups = 0'], { caption: 'Each new Order(…) is its own object. Changing o never changes the class.' }),
    predict('Two orders, one blueprint', [...ORDER, 'const a = new Order("Tea", 40);', 'const b = new Order("Toast", 80);', 'a.add();', 'const ta = a.total();', 'const tb = b.total();', 'const both = `${ta} ${tb}`;', 'console.log(both);'], [
      [19, 'a had a cup added; b didn’t. What will both be?', ['"80 80"', '"40 80"', '"80 160"'], 'a has 2 cups of ₹40 tea; b still has 1 toast at ₹80. Each object keeps its own cups.', { var: 'both' }],
    ]),
    place('Write the constructor', 'Fill the gaps so each Table remembers its number.', [['class Table {'], ['  ', { gap: 0 }, '(num) {'], ['    ', { gap: 1 }, '.num = num;'], ['  }'], ['}'], ['const t = ', { gap: 2 }, ' Table(4);'], ['console.log(t.num);']], ['constructor', 'this', 'new', 'function', 'self'], ['constructor', 'this', 'new'], 'constructor runs when you write new, and this is the new object.'),
    tapbug('TypeError: Class constructor Order cannot be invoked without \'new\'', ['const o = Order("Tea", 40);'], [[1, 'Order("Tea", 40)', 'new Order("Tea", 40)']], 'Make objects from a class with new.'),
    recap([
      ['📐', 'A class is a blueprint for objects'],
      ['🏗', 'constructor sets up each new object'],
      ['🆕', 'new Order(…) makes one'],
    ]),
  ]),

  lesson('js-10-2', 'Inheritance', 5, [
    reveal('Building on another class', [
      ['class Combo extends Order', 'A Combo is an Order, with extras.'],
      ['super(dish, price)', 'Run the parent’s constructor first.'],
      ['Override', 'Write total() again in Combo to change how it works.'],
    ], { mono: true }),
    toggleRun('Parent and child', [
      ['Order', [...ORDER, 'const o = new Order("Tea", 40);', 'console.log(o.total());'], 'The normal order.', ['40']],
      ['Combo', [...ORDER, 'class Combo extends Order {', '  total() {', '    return super.total() + 30;', '  }', '}', 'const c = new Combo("Tea", 40);', 'console.log(c.total(), c.cups);'], 'Combo adds a ₹30 snack. super.total() reuses the parent’s maths, and cups came from the parent constructor.', ['70 1']],
    ]),
    predict('Who answers?', ['class Drink {', '  label() { return "drink"; }', '}', 'class Tea extends Drink {', '  label() { return "tea, a " + super.label(); }', '}', 'const t = new Tea();', 'const words = t.label();', 'console.log(words);'], [
      [9, 'What will it print?', ['tea, a drink', 'drink', 'tea'], 'Tea’s own label runs and asks the parent for “drink”.', { out: true }],
    ]),
    check('What must a child constructor call before using this?', ['super(…)', 'this()', 'parent()', 'new()'], 'The parent sets up the object first.', 'The keyword for the parent.'),
    tapbug('ReferenceError: Must call super constructor', ['class Combo extends Order {', '  constructor(dish, price) {', '    this.snack = "Cookie";', '  }', '}'], [[3, 'this.snack = "Cookie";', 'super(dish, price); this.snack = "Cookie";']], 'In a child class, call super(…) before touching this.'),
    recap([
      ['👪', 'extends builds on a parent class'],
      ['⬆️', 'super(…) runs the parent constructor'],
      ['🔁', 'A child can override a method'],
    ]),
  ]),

  lesson('js-10-3', 'Static, get and set', 5, [
    reveal('Extra class tools', [
      ['static', 'Belongs to the class, not to each object: Order.gst.'],
      ['get total()', 'Read like a property, worked out like a method: o.total (no brackets).'],
      ['set cups(n)', 'Runs when you assign: o.cups = 3. Good for checking values.'],
      ['#secret', 'A private field: only code inside the class can touch it.'],
    ], { mono: true }),
    run('Try them', 'Pick a line.', ['class Order {', '  static gst = 0.05;', '  #cups = 1;', '  constructor(price) { this.price = price; }', '  get cups() { return this.#cups; }', '  set cups(n) { this.#cups = Math.max(1, n); }', '  get total() { return this.price * this.#cups * (1 + Order.gst); }', '}', 'const o = new Order(40);', '{{v}}', 'console.log(o.cups, o.total);'], ['o.cups = 3;', 'o.cups = -5;', 'o.cups = 0;', 'console.log(Order.gst);'], { caption: 'The setter refuses anything below 1. total has no brackets: it is a getter.' }),
    matchUp('Match the tool', [['static', 'Shared by the whole class'], ['get', 'Read like a property'], ['set', 'Runs on assignment'], ['#field', 'Private to the class']], 'Tools to keep classes tidy and safe.'),
    check('How do you read a getter called total?', ['o.total', 'o.total()', 'o.get(total)', 'Order.total'], 'Getters are read like properties.', 'No brackets.'),
    tapbug('SyntaxError: Private field', ['class Order { #cups = 1; }', 'const o = new Order();', 'console.log(o.#cups);'], [[3, 'o.#cups', 'o.cups (add a getter)']], 'Private fields can only be used inside the class.'),
    recap([
      ['🏛', 'static belongs to the class'],
      ['📖', 'get and set look like properties'],
      ['🔒', '#fields are private'],
    ]),
  ]),

  lesson('js-10-4', 'Prototypes in brief', 4, [
    chat(['Classes are newer, friendlier writing for something JavaScript always had: prototypes.', 'You will see the old style in older code, so it helps to recognise it.']),
    reveal('What a class makes underneath', [
      ['A constructor function', 'function Order(dish) { this.dish = dish; } is the old way to write a class.'],
      ['A prototype', 'Methods live once on Order.prototype, shared by every order.'],
      ['The lookup chain', 'o.total() looks on o first, then on its prototype, then further up.'],
    ], { mono: true }),
    toggleRun('Old style, same result', [
      ['class', ['class Order {', '  constructor(dish) { this.dish = dish; }', '  hello() { return "One " + this.dish; }', '}', 'console.log(new Order("Tea").hello());'], 'Modern.', ['One Tea']],
      ['prototype', ['function Order(dish) { this.dish = dish; }', 'Order.prototype.hello = function () {', '  return "One " + this.dish;', '};', 'console.log(new Order("Tea").hello());'], 'The older way. Same object, same method.', ['One Tea']],
    ]),
    check('Where do class methods actually live?', ['On the prototype, shared by all objects', 'Copied into every object', 'In a separate file', 'On the page'], 'One copy, shared through the prototype chain.', 'Shared, not copied.'),
    truth([
      ['Classes are built on prototypes', true, 'They are friendlier writing for the same thing.'],
      ['Every object gets its own copy of each method', false, 'Methods are shared on the prototype.'],
      ['You should write new code with classes', true, 'And recognise prototypes in old code.'],
    ]),
    recap([
      ['🧬', 'Classes sit on top of prototypes'],
      ['🔗', 'Methods are shared through the prototype chain'],
      ['🕰', 'Old code uses constructor functions'],
    ]),
  ]),

  lesson('js-10-5', 'Dates', 5, [
    run('Today, Indian style', 'Pick how to show a date.', ['const d = new Date(2026, 9, 29, 18, 30);', 'console.log({{v}});'], ['d.toLocaleDateString("en-IN")', 'd.getFullYear()', 'd.getMonth()', 'd.getDay()', 'd.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })', 'd.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })'], { caption: 'Careful: months count from 0 (9 is October), and getDay() gives 0 for Sunday.' }),
    reveal('Working with dates', [
      ['new Date()', 'Right now.'],
      ['new Date(2026, 9, 29)', 'A chosen day. Month 9 is October.'],
      ['getDate / getMonth / getFullYear', 'Read parts.'],
      ['setDate(d.getDate() + 7)', 'Change parts: a week later.'],
      ['Date.now()', 'Milliseconds since 1970: handy for timing.'],
    ], { mono: true }),
    predict('A week later', ['const d = new Date(2026, 9, 29);', 'd.setDate(d.getDate() + 7);', 'const day = d.getDate();', 'const month = d.getMonth() + 1;', 'console.log(`${day}/${month}`);'], [
      [5, '29 October plus 7 days. What will it print?', ['5/11', '36/10', '5/10'], 'Dates roll over into the next month by themselves.', { out: true }],
    ]),
    reveal('Temporal, the new date API', [
      ['Why', 'Date has quirks: months from 0, confusing time zones.'],
      ['Temporal.PlainDate', 'A calendar date with no time zone, months from 1.'],
      ['Status', 'New in modern browsers. You will meet both; Date still works everywhere.'],
    ], { mono: true }),
    tapbug('The sale shows December, not November', ['const sale = new Date(2026, 11, 8);', 'console.log(sale.toLocaleDateString("en-IN"));'], [[1, '11', '10']], 'Months count from 0, so November is 10 and December is 11.'),
    recap([
      ['📅', 'new Date(year, monthFrom0, day)'],
      ['🇮🇳', 'toLocaleDateString("en-IN") formats it'],
      ['🆕', 'Temporal is the cleaner, newer API'],
    ]),
  ]),

  challenge('js-10-ch', 'Module 10 Challenge', { icon: '🏛', name: 'Class Act' }, ['Write classes with constructors and methods', 'Extend classes and use static, get and set', 'Create and format dates'], [
    mcq(1, 'What does new do?', ['Makes an object from a class', 'Makes a class', 'Deletes an object', 'Starts a loop'], 'new Order(…) builds one order.'),
    mcq(2, 'What is this inside a constructor?', ['The new object being made', 'The class', 'The page', 'undefined'], 'You set its keys there.'),
    mcq(3, 'Which keyword builds on another class?', ['extends', 'super', 'inherits', 'static'], 'class Combo extends Order.', { mono: true }),
    mcq(4, 'What month is new Date(2026, 0, 1)?', ['January', 'February', 'December', 'No month'], 'Months count from 0.'),
    mcq(5, 'A static method belongs to…', ['The class itself', 'Each object', 'The page', 'Nothing'], 'Call it as Order.method().'),
    swipe([
      ['A class must be used with new', true, 'Calling it plainly is an error.'],
      ['super(…) can come after using this', false, 'Call super first.'],
      ['getDay() gives 0 for Sunday', true, 'Days count from Sunday.'],
      ['#fields can be read from outside the class', false, 'They are private.'],
    ]),
    pairs([['constructor', 'Sets up a new object'], ['extends', 'Child of another class'], ['get', 'Read like a property'], ['toLocaleDateString', 'Format a date']], 'Class and date tools.'),
    pickCode('Which makes a Tea class that builds on Drink?', ['class Tea extends Drink {}', 'class Tea super Drink {}', 'class Tea(Drink) {}', 'class Tea = new Drink {}'], 'extends links the child to the parent.'),
    bugTask(['class Order {', '  constuctor(price) { this.price = price; }', '}', 'const o = Order(40);'], [[2, 'constuctor', 'constructor'], [4, 'Order(40)', 'new Order(40)']], 'A misspelt constructor never runs, and classes need new.'),
    predictTask([...ORDER, 'const o = new Order("Coffee", 60);', 'o.add();', 'o.add();', 'console.log(o.cups, o.total());'], 'What does it print?', ['3 180', '2 120', '1 60', '3 60'], 'Starts at 1 cup, add() twice makes 3, and 3 × ₹60 is ₹180.'),
    arrange(['class Cup {\n  constructor(size) { this.size = size; }\n}', 'const c = new Cup("large");', 'const label = `A ${c.size} cup`;', 'console.log(label);'], 'write the class, make a cup, build the label, then print it', ['A large cup']),
  ]),
];

