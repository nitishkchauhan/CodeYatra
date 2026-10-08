import type { EditorStep, Lesson } from './types';

export const namaste: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PYTHON',
  title: 'Say namaste',
  instructions: 'greet(name) should return "Namaste, Asha!" for name "Asha". Use an f-string.',
  lang: 'python',
  file: 'greet.py',
  starter: 'def greet(name):\n    return "Namaste"\n',
  tests: [
    { call: 'greet("Asha")', expect: '"Namaste, Asha!"' },
    { call: 'greet("Kabir")', expect: '"Namaste, Kabir!"' },
  ],
  hint: 'return f"Namaste, {name}!"',
  solution: 'def greet(name):\n    return f"Namaste, {name}!"\n',
};

export const canteenBill: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · DICTIONARIES',
  title: 'Canteen bill',
  instructions: 'bill(menu, order) gets a price dictionary and a list of items. Return the total. Skip items that are not on the menu.',
  lang: 'python',
  file: 'canteen.py',
  starter: 'def bill(menu, order):\n    total = 0\n    return total\n',
  tests: [
    {
      call: 'bill({"chai": 10, "samosa": 15}, ["chai", "samosa", "chai"])',
      expect: '35',
    },
    { call: 'bill({"chai": 10}, ["dosa"])', expect: '0' },
    { call: 'bill({"idli": 30}, [])', expect: '0' },
  ],
  hint: 'for item in order:\n    if item in menu:\n        total += menu[item]',
  solution: 'def bill(menu, order):\n    total = 0\n    for item in order:\n        if item in menu:\n            total += menu[item]\n    return total\n',
};

export const PYTHON_EXTRA: Lesson[] = [
  {
    id: 'p-var-1',
    title: 'Variables and f-strings',
    kind: 'lesson',
    minutes: 5,
    skill: 'python',
    learned: ['A variable names a value', 'print() shows output', 'f-strings put values inside text'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · PYTHON',
        title: 'Python reads like English',
        hindi: 'Python अंग्रेज़ी जैसा पढ़ा जाता है',
        body: 'name = "Asha" stores a value. No let or const needed. Put f before a string and anything in { } becomes its value.',
        code: [
          {
            lang: 'python',
            label: 'Python',
            lines: ['name = "Asha"', 'age = 15', 'print(f"{name} is {age}")', '# Asha is 15'],
          },
        ],
        tip: 'Variable names use snake_case in Python: train_name, not trainName.',
      },
      {
        type: 'quiz',
        prompt: 'What does this print?',
        code: {
          lang: 'python',
          label: 'Python',
          lines: ['city = "Kochi"', 'print(f"Hi {city}")'],
        },
        options: ['Hi Kochi', 'Hi {city}', 'f"Hi Kochi"', 'Hi city'],
        mono: true,
        answer: 0,
        right: 'The f makes Python fill in {city}.',
        wrong: 'With the f prefix, {city} becomes Kochi.',
      },
      namaste,
    ],
  },
  {
    id: 'p-dict-1',
    title: 'Dictionaries',
    kind: 'lesson',
    minutes: 7,
    skill: 'python',
    learned: ['A dictionary maps keys to values', 'menu["chai"] looks a value up', 'Check with in before you look'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · DICTIONARIES',
        title: 'Look things up by name',
        hindi: 'नाम से चीज़ें खोजें',
        body: 'A dictionary pairs keys with values, like a menu pairs dishes with prices. Look up a value with menu["chai"]. Asking for a missing key raises a KeyError, so check with in first.',
        code: [
          {
            lang: 'python',
            label: 'Python',
            lines: ['menu = {"chai": 10, "samosa": 15}', 'print(menu["chai"])      # 10', 'print("dosa" in menu)    # False'],
          },
        ],
        tip: 'menu.get("dosa", 0) returns 0 instead of an error.',
      },
      {
        type: 'quiz',
        prompt: 'menu = {"idli": 30}. What is menu["idli"] * 2?',
        options: ['60', '"idliidli"', '30', 'KeyError'],
        mono: true,
        answer: 0,
        right: 'menu["idli"] is 30, and 30 × 2 = 60.',
        wrong: 'The lookup gives the number 30, so the answer is 60.',
      },
      canteenBill,
    ],
  },
];
