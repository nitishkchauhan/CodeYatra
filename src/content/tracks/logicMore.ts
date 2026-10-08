import { bug, lesson, order, predict, quiz, read, tap } from '../dsl';
import type { Lesson } from '../types';

const K = 'LOGIC';

export const LOGIC_MORE: Lesson[] = [
  lesson('f-var-1', 'Variables are labelled boxes', 'sequencing', ['A variable stores a value under a name', 'Assigning again replaces the value', 'Code runs top to bottom'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Give your data a name',
      body: 'A variable is a labelled box. score = 0 puts 0 in a box called score. Writing score = score + 10 reads the box, adds 10 and puts the result back.',
      lang: 'python',
      code: ['score = 0', 'score = score + 10', 'score = score + 5', 'print(score)  # 15'],
      tip: 'The = sign means "store", not "equals".',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Follow the box',
      lang: 'python',
      lines: ['gems = 3', 'gems = gems * 2', 'gems = gems - 1', 'print(gems)'],
      answer: '5',
      explain: '3 × 2 = 6, then 6 − 1 = 5.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Read, change, store',
      instructions: 'Line 2 reads coins, changes it, then stores it back. Tap the symbol that does the change.',
      lang: 'python',
      lines: ['coins = 10', 'coins = coins + 5'],
      target: { line: 1, token: '+' },
      explain: '+ adds 5 to the old value; = then stores the result back in coins.',
    }),
  ]),

  lesson('f-while-1', 'Repeat until done', 'loops', ['while repeats as long as a condition is true', 'Something must change, or it loops forever', 'Use for when you know the count, while when you do not'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Keep going while…',
      body: 'A while loop checks its condition before every round. Yatri keeps walking while the path is clear. Inside the loop, something must change so the condition can become false.',
      lang: 'python',
      code: ['fuel = 3', 'while fuel > 0:', '    print("Move")', '    fuel = fuel - 1', 'print("Out of fuel")'],
      tip: 'If nothing changes inside the loop, it never ends.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'How many moves?',
      lang: 'python',
      lines: ['steps = 0', 'distance = 10', 'while distance > 0:', '    distance = distance - 3', '    steps = steps + 1', 'print(steps)'],
      answer: '4',
      explain: '10 → 7 → 4 → 1 → −2: four rounds before distance is no longer above 0.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Countdown to launch',
      instructions: 'Arrange the lines to count down from 3 and then print Launch!',
      lang: 'python',
      lines: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Launch!")'],
      output: ['3', '2', '1', 'Launch!'],
      explain: 'Print, then shrink n, inside the loop; Launch! runs once after it.',
    }),
  ]),

  lesson('f-nest-1', 'Loops inside loops', 'loops', ['An inner loop runs fully for each outer round', 'Nested loops draw grids and patterns', 'Total rounds = outer × inner'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Rows and columns',
      body: 'Put a loop inside another and the inner loop runs completely for every round of the outer one. That is how you visit every cell of a grid, row by row.',
      lang: 'python',
      code: ['for row in range(3):', '    line = ""', '    for col in range(4):', '        line = line + "*"', '    print(line)'],
      tip: '3 rows × 4 columns = 12 stars in total.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Draw a triangle',
      lang: 'python',
      lines: ['for i in range(1, 4):', '    print("#" * i)'],
      answer: '#\n##\n###',
      explain: 'Row i prints i hashes: 1, 2, then 3.',
    }),
    quiz({
      prompt: 'An outer loop runs 5 times and its inner loop runs 4 times. How many times does the inner body run?',
      options: ['20', '9', '5', '4'],
      right: 'Every outer round runs the full inner loop: 5 × 4 = 20.',
      wrong: 'Nested loops multiply: 5 rounds × 4 inner steps = 20.',
    }),
  ]),

  lesson('f-debug-1', 'Debug like a pro', 'sequencing', ['Read the error message first', 'Check one line at a time', 'Print values to see what is happening'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Bugs are normal',
      body: 'Every programmer writes bugs. Good programmers find them fast: read the error, find the line, check what each variable holds, change one thing, and run again.',
      lang: 'python',
      code: ['total = 0', 'for price in [50, 20, 30]:', '    total = total + price', '    print("total so far:", total)  # a debug print'],
      tip: 'Explaining your code out loud, even to a toy, often reveals the bug.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'The total is wrong',
      instructions: 'This should print 100 but prints 30. Find the bug.',
      lang: 'python',
      lines: ['total = 0', 'for price in [50, 20, 30]:', '    total = price', 'print(total)'],
      bug: 2,
      fix: '    total = total + price',
      explain: 'total = price throws away the old total each round. Add to it instead.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Off by one',
      instructions: 'This should print the numbers 1 to 5, but stops at 4.',
      lang: 'python',
      lines: ['for i in range(1, 5):', '    print(i)'],
      bug: 0,
      fix: 'for i in range(1, 6):',
      explain: 'range stops before its end value, so range(1, 6) gives 1 to 5.',
    }),
  ]),
];
