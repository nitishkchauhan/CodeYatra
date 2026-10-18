import { fill } from './helpers';
import type { EditorStep } from './types';

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
