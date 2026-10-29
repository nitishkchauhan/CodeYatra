import { lesson, predict, read } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'PYTHON';

const py = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: `PRACTICE · ${K}`, lang: 'python', ...o });

export const PYTHON_MORE_2: Lesson[] = [
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
        { call: 'long_names(["Ava", "Kaden", "Megan", "Reed"])', expect: '["KADEN", "MEGAN"]' },
        { call: 'long_names([])', expect: '[]' },
      ],
      hint: '[n.upper() for n in names if len(n) > 4]',
      solution: 'def long_names(names):\n    return [n.upper() for n in names if len(n) > 4]\n',
    }),
  ]),

];
