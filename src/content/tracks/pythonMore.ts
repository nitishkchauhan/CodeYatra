import { bug, lesson, order, predict, read, tap } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'PYTHON';

const py = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: `PRACTICE · ${K}`, lang: 'python', ...o });

export const PYTHON_MORE_2: Lesson[] = [
  lesson('p-str-1', 'String methods', 'python', ['Strings have built-in methods', 'split breaks text into a list', 'Methods return new strings'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Clean up text',
      body: 'Text from users is messy. strip() removes outer spaces, lower() and upper() change case, replace() swaps parts, and split() breaks a sentence into words.',
      lang: 'python',
      code: ['city = "  New Delhi  "', 'print(city.strip().upper())   # NEW DELHI', 'print("a,b,c".split(","))      # [\'a\', \'b\', \'c\']'],
      tip: '" ".join(words) is the opposite of split().',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Chain the methods',
      lang: 'python',
      lines: ['code = " ndls-bct "', 'print(code.strip().upper().replace("-", " to "))'],
      answer: 'NDLS to BCT',
      explain: 'strip → "ndls-bct", upper → "NDLS-BCT", replace the dash → "NDLS to BCT".',
    }),
    py({
      title: 'Initials',
      instructions: 'initials(name) returns the first letter of each word, in capitals. "asha rani verma" → "ARV".',
      file: 'initials.py',
      starter: 'def initials(name):\n    return name\n',
      tests: [
        { call: 'initials("asha rani verma")', expect: '"ARV"' },
        { call: 'initials("Kabir")', expect: '"K"' },
      ],
      hint: '"".join(word[0] for word in name.split()).upper()',
      solution: 'def initials(name):\n    return "".join(word[0] for word in name.split()).upper()\n',
    }),
  ]),

  lesson('p-comp-1', 'List comprehensions', 'python', ['[expr for x in items] builds a list', 'Add if to filter', 'Shorter than a loop with append'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Build lists in one line',
      body: 'A list comprehension transforms and filters a list in one readable line. [f * 2 for f in fares if f < 1000] doubles only the cheap fares.',
      lang: 'python',
      code: ['fares = [450, 1200, 800]', 'cheap = [f for f in fares if f < 1000]', 'print(cheap)  # [450, 800]'],
      tip: 'If a comprehension gets hard to read, use a normal loop.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Squares of evens',
      lang: 'python',
      lines: ['nums = [1, 2, 3, 4, 5, 6]', 'print([n * n for n in nums if n % 2 == 0])'],
      answer: '[4, 16, 36]',
      explain: 'Only 2, 4 and 6 pass the filter; their squares are 4, 16 and 36.',
    }),
    py({
      title: 'Long names',
      instructions: 'long_names(names) returns the names with more than 4 letters, in upper case. Use a comprehension.',
      file: 'names.py',
      starter: 'def long_names(names):\n    return names\n',
      tests: [
        { call: 'long_names(["Asha", "Kabir", "Meera", "Ravi"])', expect: '["KABIR", "MEERA"]' },
        { call: 'long_names([])', expect: '[]' },
      ],
      hint: '[n.upper() for n in names if len(n) > 4]',
      solution: 'def long_names(names):\n    return [n.upper() for n in names if len(n) > 4]\n',
    }),
  ]),

  lesson('p-class-1', 'Classes and objects', 'python', ['class defines a new type', '__init__ sets up each object', 'self is the object itself'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Your own types',
      body: 'A class groups data and the functions that work on it. __init__ runs when you create an object; self is the object, so self.seats belongs to that train only.',
      lang: 'python',
      code: ['class Train:', '    def __init__(self, name, seats):', '        self.name = name', '        self.seats = seats', '', '    def book(self, n):', '        self.seats -= n', '', 't = Train("Rajdhani", 10)', 't.book(3)', 'print(t.seats)  # 7'],
      tip: 'Every method takes self as its first parameter.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Missing self',
      instructions: 'This crashes with a TypeError when booking. Which line is wrong?',
      lang: 'python',
      lines: ['class Train:', '    def __init__(self, seats):', '        self.seats = seats', '    def book(n):', '        self.seats -= n', '', 't = Train(5)', 't.book(2)', 'print(t.seats)'],
      bug: 3,
      fix: '    def book(self, n):',
      explain: 'Methods receive the object as their first argument, so book needs self.',
    }),
    py({
      title: 'A wallet class',
      instructions: 'Complete Wallet: add(amount) adds coins, spend(amount) subtracts if there is enough and returns True, else returns False.',
      file: 'wallet.py',
      starter: 'class Wallet:\n    def __init__(self):\n        self.coins = 0\n\n    def add(self, amount):\n        pass\n\n    def spend(self, amount):\n        return False\n\nw = Wallet()\n',
      tests: [
        { call: '(w.add(50), w.spend(20), w.coins)[1:]', expect: '(True, 30)' },
        { call: 'w.spend(100)', expect: 'False' },
      ],
      hint: 'In spend: if amount <= self.coins: self.coins -= amount; return True',
      solution:
        'class Wallet:\n    def __init__(self):\n        self.coins = 0\n\n    def add(self, amount):\n        self.coins += amount\n\n    def spend(self, amount):\n        if amount <= self.coins:\n            self.coins -= amount\n            return True\n        return False\n\nw = Wallet()\n',
    }),
  ]),

  lesson('p-err-1', 'Handling errors', 'python', ['try / except catches errors', 'Catch specific errors like ValueError', 'raise signals your own errors'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Expect the unexpected',
      body: 'int("abc") raises ValueError and would crash the program. Wrap risky code in try, and handle the specific error in except.',
      lang: 'python',
      code: ['try:', '    seats = int("two")', 'except ValueError:', '    seats = 0', 'print(seats)  # 0'],
      tip: 'Avoid a bare except: it hides bugs you did not expect.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'What runs?',
      lang: 'python',
      lines: ['try:', '    print("start")', '    x = 10 / 0', '    print("never")', 'except ZeroDivisionError:', '    print("cannot divide")', 'print("done")'],
      answer: 'start\ncannot divide\ndone',
      explain: 'The division fails, so control jumps to except, then continues after.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'The error type',
      instructions: 'Tap the name of the error this code handles.',
      lang: 'python',
      lines: ['try:', '    age = int(text)', 'except ValueError:', '    age = None'],
      target: { line: 2, token: 'ValueError' },
      explain: 'int() raises ValueError for text that is not a number.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Safe conversion',
      instructions: 'Arrange the code so a bad value prints "invalid" instead of crashing.',
      lang: 'python',
      lines: ['value = "12a"', 'try:', '    print(int(value))', 'except ValueError:', '    print("invalid")'],
      output: ['invalid'],
      explain: 'int("12a") raises ValueError, which except catches.',
    }),
  ]),
];
