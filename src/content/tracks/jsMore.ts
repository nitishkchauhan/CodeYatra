import { bug, lesson, order, predict, quiz, read, tap } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'JAVASCRIPT';

const js = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: `PRACTICE · ${K}`, lang: 'javascript', ...o });

export const JS_MORE: Lesson[] = [
  lesson('j-cond-1', 'Decisions', 'js', ['if / else if / else choose a path', '=== compares value and type', 'The ternary a ? b : c is a short if'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Choose what happens',
      body: 'if runs a block when a condition is true. Always compare with === (strict): "5" == 5 is true, but "5" === 5 is false. For short choices, condition ? a : b picks a value.',
      lang: 'javascript',
      code: ['const age = 64;', 'const fare = age >= 60 ? 250 : 500;', 'console.log(fare); // 250'],
      tip: '&& means and, || means or, ! means not.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Strict or loose?',
      lang: 'javascript',
      lines: ['console.log("5" == 5);', 'console.log("5" === 5);'],
      answer: 'true\nfalse',
      explain: '== converts types before comparing; === does not.',
    }),
    js({
      title: 'Ticket category',
      instructions: 'category(age) returns "child" under 12, "senior" at 60 or above, otherwise "adult".',
      file: 'category.js',
      starter: 'function category(age) {\n  return "adult";\n}\n',
      tests: [
        { call: 'category(8)', expect: '"child"' },
        { call: 'category(35)', expect: '"adult"' },
        { call: 'category(60)', expect: '"senior"' },
      ],
      hint: 'if (age < 12) return "child"; if (age >= 60) return "senior";',
      solution: 'function category(age) {\n  if (age < 12) return "child";\n  if (age >= 60) return "senior";\n  return "adult";\n}\n',
    }),
  ]),

  lesson('j-arrow-1', 'Arrow functions and callbacks', 'js', ['(a, b) => a + b is a short function', 'A callback is a function you pass in', 'map, filter and forEach take callbacks'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Functions as values',
      body: 'In JavaScript, functions are values: you can store them and pass them to other functions. Arrow functions make this short. A function you pass in to be called later is a callback.',
      lang: 'javascript',
      code: ['const double = (n) => n * 2;', '[1, 2, 3].map(double);        // [2, 4, 6]', '[1, 2, 3].map((n) => n + 10); // [11, 12, 13]'],
      tip: 'With one expression, the arrow returns it automatically.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Spot the callback',
      instructions: 'Tap the name of the function being passed as a callback.',
      lang: 'javascript',
      lines: ['const isCheap = (fare) => fare < 500;', 'const cheap = fares.filter(isCheap);'],
      target: { line: 1, token: 'isCheap' },
      explain: 'isCheap is passed to filter, which calls it for every fare.',
    }),
    js({
      title: 'Apply a discount',
      instructions: 'discounted(fares) returns a new array with every fare reduced by 10%. Use map with an arrow function.',
      file: 'discount.js',
      starter: 'function discounted(fares) {\n  return fares;\n}\n',
      tests: [
        { call: 'discounted([100, 450])', expect: '[90, 405]' },
        { call: 'discounted([])', expect: '[]' },
      ],
      hint: 'return fares.map((f) => f * 0.9);',
      solution: 'function discounted(fares) {\n  return fares.map((f) => f * 0.9);\n}\n',
    }),
  ]),

  lesson('j-class-1', 'Classes', 'js', ['class bundles data and methods', 'constructor sets up a new object', 'this refers to the current object'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Objects from a blueprint',
      body: 'A class is a blueprint for objects. constructor runs when you write new, and this is the object being built. Methods are functions that belong to the object.',
      lang: 'javascript',
      code: ['class Train {', '  constructor(name, seats) {', '    this.name = name;', '    this.seats = seats;', '  }', '  book(n) {', '    this.seats -= n;', '  }', '}', 'const t = new Train("Rajdhani", 10);', 't.book(3);'],
      tip: 'Class names start with a capital letter by convention.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Book some seats',
      lang: 'javascript',
      lines: [
        'class Train {',
        '  constructor(name, seats) {',
        '    this.name = name;',
        '    this.seats = seats;',
        '  }',
        '  book(n) {',
        '    this.seats -= n;',
        '    return this.seats;',
        '  }',
        '}',
        'const t = new Train("Duronto", 8);',
        't.book(3);',
        'console.log(t.name, t.book(2));',
      ],
      answer: 'Duronto 3',
      explain: '8 − 3 = 5, then 5 − 2 = 3.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Write a class',
      instructions: 'Arrange the class so it stores a name and greets with it.',
      lang: 'javascript',
      lines: ['class Passenger {', '  constructor(name) {', '    this.name = name;', '  }', '  greet() {', '    return `Hi ${this.name}`;', '  }', '}', 'console.log(new Passenger("Asha").greet());'],
      output: ['Hi Asha'],
      explain: 'constructor stores the name; greet reads it back with this.',
    }),
  ]),

  lesson('j-error-1', 'Handling errors', 'js', ['throw signals a problem', 'try / catch handles it', 'Good errors say what went wrong'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Fail gracefully',
      body: 'When something goes wrong, throw new Error("message"). Code that calls it can wrap the call in try / catch to handle the problem instead of crashing.',
      lang: 'javascript',
      code: ['function book(seats) {', '  if (seats <= 0) throw new Error("Seats must be positive");', '  return `Booked ${seats}`;', '}', 'try {', '  book(0);', '} catch (e) {', '  console.log(e.message);', '}'],
      tip: 'finally { } runs whether or not an error happened.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'What gets printed?',
      lang: 'javascript',
      lines: ['try {', '  console.log("A");', '  JSON.parse("not json");', '  console.log("B");', '} catch (e) {', '  console.log("C");', '}', 'console.log("D");'],
      answer: 'A\nC\nD',
      explain: 'The parse error jumps straight to catch, skipping B; D runs after.',
    }),
    js({
      title: 'Safe parse',
      instructions: 'safeParse(text) returns the parsed JSON, or null if the text is not valid JSON.',
      file: 'parse.js',
      starter: 'function safeParse(text) {\n  return JSON.parse(text);\n}\n',
      tests: [
        { call: 'safeParse(\'{"seats": 4}\')', expect: '({ seats: 4 })' },
        { call: 'safeParse("oops")', expect: 'null' },
      ],
      hint: 'try { return JSON.parse(text); } catch (e) { return null; }',
      solution: 'function safeParse(text) {\n  try {\n    return JSON.parse(text);\n  } catch (e) {\n    return null;\n  }\n}\n',
    }),
  ]),

  lesson('j-async-1', 'Promises and async', 'js', ['Slow work returns a Promise', 'await waits without freezing the page', 'Callbacks from timers run later'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Do not block the page',
      body: 'Network calls take time. JavaScript does not wait; it keeps running and handles the result later. A Promise represents that future result; await inside an async function pauses only that function.',
      lang: 'javascript',
      code: ['async function loadTrains() {', '  const res = await fetch("/api/trains");', '  return res.json();', '}'],
      tip: 'setTimeout(fn, 0) still runs fn after the current code finishes.',
    }),
    quiz({
      prompt: 'What order do these print?',
      lang: 'javascript',
      code: ['console.log("1");', 'setTimeout(() => console.log("2"), 0);', 'console.log("3");'],
      options: ['1, 3, 2', '1, 2, 3', '2, 1, 3', '3, 2, 1'],
      mono: true,
      right: 'The timer callback waits until the current code finishes, even with 0 ms.',
      wrong: 'setTimeout always queues its callback for later, so 3 prints before 2.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Forgot to wait',
      instructions: 'This prints [object Promise] instead of the data. Which line is wrong?',
      lang: 'javascript',
      lines: ['async function show() {', '  const data = fetchTrains();', '  console.log(data);', '}'],
      bug: 1,
      fix: '  const data = await fetchTrains();',
      explain: 'Without await, data is the Promise itself, not its result.',
    }),
  ]),
];
