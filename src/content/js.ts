import { fill } from './helpers';
import type { EditorStep, Lesson } from './types';

export const greetPassenger: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · JAVASCRIPT',
  title: 'Greet the passenger',
  instructions: 'greet(name, coach) should return a sentence like "Welcome Asha, coach B2". Use a template string with backticks.',
  lang: 'javascript',
  file: 'greet.js',
  starter: 'function greet(name, coach) {\n  // return `Welcome ...`\n}\n',
  tests: [
    { call: 'greet("Asha", "B2")', expect: '"Welcome Asha, coach B2"' },
    { call: 'greet("Ravi", "S7")', expect: '"Welcome Ravi, coach S7"' },
  ],
  hint: 'return `Welcome ${name}, coach ${coach}`;',
  solution: 'function greet(name, coach) {\n  return `Welcome ${name}, coach ${coach}`;\n}\n',
};

export const cheapTickets: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · ARRAYS',
  title: 'Tickets within budget',
  instructions: 'withinBudget(prices, budget) returns only the prices that are less than or equal to the budget. Try filter().',
  lang: 'javascript',
  file: 'budget.js',
  starter: 'function withinBudget(prices, budget) {\n  return prices;\n}\n',
  tests: [
    { call: 'withinBudget([450, 1200, 800], 900)', expect: '[450, 800]' },
    { call: 'withinBudget([2000], 500)', expect: '[]' },
    { call: 'withinBudget([], 100)', expect: '[]' },
  ],
  hint: 'return prices.filter((p) => p <= budget);',
  solution: 'function withinBudget(prices, budget) {\n  return prices.filter((p) => p <= budget);\n}\n',
};

export const describeTrain: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · OBJECTS',
  title: 'Read a train object',
  instructions: 'summary(train) gets { name, from, to, seats }. Return "Shatabdi: Delhi → Bhopal (12 seats)". If seats is 0, say "(full)" instead.',
  lang: 'javascript',
  file: 'train.js',
  starter: 'function summary(train) {\n  // use train.name, train.from, train.to, train.seats\n}\n',
  tests: [
    {
      call: 'summary({ name: "Shatabdi", from: "Delhi", to: "Bhopal", seats: 12 })',
      expect: '"Shatabdi: Delhi → Bhopal (12 seats)"',
    },
    {
      call: 'summary({ name: "Duronto", from: "Pune", to: "Howrah", seats: 0 })',
      expect: '"Duronto: Pune → Howrah (full)"',
    },
  ],
  hint: 'const left = train.seats === 0 ? "full" : `${train.seats} seats`;',
  solution:
    'function summary(train) {\n  const { name, from, to, seats } = train;\n  const left = seats === 0 ? "full" : `${seats} seats`;\n  return `${name}: ${from} → ${to} (${left})`;\n}\n',
};

export const bookButton = fill({
  kicker: 'PRACTICE · DOM EVENTS',
  title: 'Make the button work',
  instructions: 'Find the button, listen for a click, and change the message text.',
  lang: 'javascript',
  file: 'app.js',
  lines: [
    ['const btn = document.', { gap: 0 }, '("#book");'],
    ['const msg = document.querySelector("#msg");'],
    [''],
    ['btn.addEventListener("', { gap: 1 }, '", () => {'],
    ['  msg.', { gap: 2 }, ' = "Seat booked!";'],
    ['});'],
  ],
  tokens: ['querySelector', 'click', 'textContent', 'getElement', 'tap', 'value'],
  answers: [
    { value: 'querySelector', check: 'querySelector finds the button' },
    { value: 'click', check: 'Listens for the "click" event' },
    { value: 'textContent', check: 'textContent changes the message' },
  ],
  preview: ([, event, prop]) => ({
    kind: 'html',
    nodes: [
      { tag: 'button', text: 'Book seat' },
      {
        tag: 'p',
        text: event === 'click' && prop === 'textContent' ? '(tap) Seat booked!' : '…',
      },
    ],
  }),
});

export const JS_LESSONS: Lesson[] = [
  {
    id: 'j-var-1',
    title: 'Variables and strings',
    kind: 'lesson',
    minutes: 6,
    skill: 'js',
    learned: ['const for values that stay, let for ones that change', 'Template strings use backticks and ${ }', 'Functions return a value'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · JAVASCRIPT',
        title: 'Variables are labelled boxes',
        body: 'const name = "Asha" puts "Asha" in a box called name. Use let when the value will change. Backtick strings can drop values right into text with ${ }.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['const name = "Asha";', 'let seats = 2;', 'seats = seats + 1;', 'console.log(`${name} booked ${seats} seats`);'],
          },
        ],
        tip: 'Start with const. Switch to let only if you need to change it.',
      },
      {
        type: 'quiz',
        prompt: 'What does this print?',
        code: {
          lang: 'javascript',
          label: 'JavaScript',
          lines: ['const city = "Goa";', 'console.log(`Trip to ${city}`);'],
        },
        options: ['Trip to Goa', 'Trip to ${city}', 'Trip to city', 'Error'],
        mono: true,
        answer: 0,
        right: 'Inside backticks, ${city} is replaced by its value.',
        wrong: 'With backticks, ${ } inserts the value: Trip to Goa.',
      },
      greetPassenger,
    ],
  },
  {
    id: 'j-arr-1',
    title: 'Arrays and filter',
    kind: 'lesson',
    minutes: 7,
    skill: 'js',
    learned: ['Arrays hold lists of values', 'filter() keeps items that pass a test', 'map() transforms every item'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · ARRAYS',
        title: 'Arrays hold many values',
        body: 'An array is an ordered list. filter() builds a new array of items that pass a test, and map() builds one where every item is changed.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['const fares = [300, 900, 450];', 'fares.filter((f) => f < 500); // [300, 450]', 'fares.map((f) => f * 2);      // [600, 1800, 900]'],
          },
        ],
        tip: 'filter and map never change the original array.',
      },
      {
        type: 'quiz',
        prompt: 'What is [1, 2, 3].map((n) => n * 10)?',
        options: ['[10, 20, 30]', '[1, 2, 3]', '60', '[30]'],
        mono: true,
        answer: 0,
        right: 'map runs the function on each item and keeps every result.',
        wrong: 'map transforms every item: 1→10, 2→20, 3→30.',
      },
      cheapTickets,
    ],
  },
  {
    id: 'j-obj-1',
    title: 'Objects',
    kind: 'lesson',
    minutes: 7,
    skill: 'js',
    learned: ['Objects group related values by name', 'Read a value with dot notation', 'Destructure to unpack fields'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · OBJECTS',
        title: 'Objects describe one thing',
        body: 'An object stores named values together. train.name reads one field; const { name, seats } = train unpacks several at once.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['const train = { name: "Vande Bharat", seats: 40 };', 'console.log(train.name);', 'const { seats } = train;'],
          },
        ],
        tip: 'Data from APIs almost always arrives as objects and arrays.',
      },
      {
        type: 'quiz',
        prompt: 'How do you read the seats of const t = { seats: 5 }?',
        options: ['t.seats', 't[seats]', 'seats.t', 't->seats'],
        mono: true,
        answer: 0,
        right: 'Dot notation: object.field.',
        wrong: 't[seats] looks for a variable called seats. Use t.seats.',
      },
      describeTrain,
    ],
  },
  {
    id: 'j-dom-1',
    title: 'Events and the DOM',
    kind: 'lesson',
    minutes: 6,
    skill: 'js',
    learned: ['The DOM is the page as objects', 'querySelector finds an element', 'addEventListener reacts to taps'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · THE DOM',
        title: 'JavaScript can change the page',
        body: 'The browser turns your HTML into objects called the DOM. Find an element with querySelector, listen for events like click, and update its text or style.',
        code: [
          {
            lang: 'javascript',
            label: 'JavaScript',
            lines: ['const title = document.querySelector("h1");', 'title.addEventListener("click", () => {', '  title.textContent = "Namaste!";', '});'],
          },
        ],
        tip: 'querySelector uses CSS selectors: "#id", ".class" or "tag".',
      },
      {
        type: 'quiz',
        prompt: 'Which runs code when a button is tapped?',
        options: ['addEventListener("click", fn)', 'onTap(fn)', 'button.run(fn)', 'listen("tap")'],
        mono: true,
        answer: 0,
        right: 'Taps fire a “click” event on the web too.',
        wrong: 'The web uses addEventListener with the "click" event.',
      },
      bookButton,
    ],
  },
];
