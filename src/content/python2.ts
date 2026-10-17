import type { EditorStep, Lesson } from './types';

export const isEven: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PYTHON',
  title: 'Even or odd seats?',
  instructions: 'Write is_even(n) that returns True when n is even. Then window_seat(n) returns "window" for even seat numbers and "aisle" for odd ones.',
  lang: 'python',
  file: 'seats.py',
  starter: 'def is_even(n):\n    pass\n\ndef window_seat(n):\n    pass\n',
  tests: [
    { call: 'is_even(4)', expect: 'True' },
    { call: 'is_even(7)', expect: 'False' },
    { call: 'window_seat(12)', expect: '"window"' },
    { call: 'window_seat(13)', expect: '"aisle"' },
  ],
  hint: 'n % 2 gives the remainder after dividing by 2. Even numbers have remainder 0.',
  solution: 'def is_even(n):\n    return n % 2 == 0\n\ndef window_seat(n):\n    if is_even(n):\n        return "window"\n    return "aisle"\n',
};

export const countVowels: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PROBLEM SOLVING',
  title: 'Count the vowels',
  instructions: 'vowels(word) returns how many vowels (a, e, i, o, u) are in the word. Capital letters count too.',
  lang: 'python',
  file: 'vowels.py',
  starter: 'def vowels(word):\n    count = 0\n    return count\n',
  tests: [
    { call: 'vowels("Yatra")', expect: '2' },
    { call: 'vowels("PYTHON")', expect: '1' },
    { call: 'vowels("rhythm")', expect: '0' },
    { call: 'vowels("Aeiou")', expect: '5' },
  ],
  hint: 'Loop over word.lower(), and check: if ch in "aeiou": count += 1',
  solution: 'def vowels(word):\n    count = 0\n    for ch in word.lower():\n        if ch in "aeiou":\n            count += 1\n    return count\n',
};

export const cheapestTrain: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PROBLEM SOLVING',
  title: 'Find the cheapest train',
  instructions: 'cheapest(trains) gets a list of (name, price) pairs. Return the name of the cheapest train. If the list is empty, return None.',
  lang: 'python',
  file: 'cheapest.py',
  starter: 'def cheapest(trains):\n    pass\n',
  tests: [
    { call: 'cheapest([("Rajdhani", 2100), ("Garib Rath", 900), ("Shatabdi", 1400)])', expect: '"Garib Rath"' },
    { call: 'cheapest([("Duronto", 1800)])', expect: '"Duronto"' },
    { call: 'cheapest([])', expect: 'None' },
  ],
  hint: 'Keep the best pair so far. Start with best = None, then for name, price in trains: compare price with best[1].',
  solution:
    'def cheapest(trains):\n    best = None\n    for name, price in trains:\n        if best is None or price < best[1]:\n            best = (name, price)\n    return best[0] if best else None\n',
};

/** Bonus lesson, kept as Python practice after the Lesson v2 rewrite. */
export const PYTHON_MORE: Lesson[] = [
  {
    id: 'p-ps-1',
    title: 'Break a problem down',
    kind: 'lesson',
    minutes: 8,
    skill: 'python',
    learned: ['Split a problem into small steps', 'Combine loops and conditions', 'Test with tricky inputs'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · PROBLEM SOLVING',
        title: 'Big problems are small steps',
        body: 'Programmers break problems down: 1) what goes in, 2) what comes out, 3) what to do with each piece. Then they test the strange cases: empty, capitals, zero.',
        code: [{ lang: 'python', label: 'Python', lines: ['# 1. In: a word   2. Out: a number', '# 3. For each letter: is it a vowel?', 'count = 0', 'for ch in "Yatra".lower():', '    if ch in "aeiou":', '        count += 1'] }],
        tip: 'Before coding, write the steps as comments. Then turn each comment into a line of code.',
      },
      {
        type: 'quiz',
        prompt: 'Which test case is most likely to break a vowel counter?',
        options: ['"AEIOU" (capitals)', '"yatra"', '"code"', '"loop"'],
        answer: 0,
        right: 'Capitals are easy to forget. .lower() fixes them.',
        wrong: 'The lowercase words are the easy cases. Capitals catch a common bug.',
      },
      countVowels,
    ],
  },
];
