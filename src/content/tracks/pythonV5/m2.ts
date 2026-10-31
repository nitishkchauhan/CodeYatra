// Python Basic · Module 2 · Numbers. Lesson 2.1 keeps the old module id (p-num-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug } from './kit';

export const PY_B_M2: Lesson[] = [
  lesson('p-num-1', 'Numbers and maths', 4, [
    chat(['Computers are brilliant at maths. Python has whole numbers (int), like 40, and decimals (float), like 2.5.', 'Bills, scores, distances and temperatures are all numbers in code.']),
    run('Maths with Python', 'Pick a sum.', ['print({{v}})'], ['40 + 80', '150 - 40', '40 * 3', '90 / 2', '7 / 2'], { caption: '* multiplies. / always gives a decimal: 90 / 2 is 45.0.' }),
    predict('Bill maths', ['tea = 40', 'toast = 80', 'total = tea * 2 + toast', 'half = total / 2', 'print(total, half)'], [
      [3, 'What will total be?', ['160', '240', '120'], 'Multiplying happens before adding: 80 + 80.', { var: 'total' }],
      [4, 'What will half be?', ['80.0', '80', '160.0'], '/ always gives a decimal.', { var: 'half' }],
    ]),
    check('What does 10 / 4 give?', ['2.5', '2', '3', '2.0'], '/ gives the exact answer, as a decimal.', 'It doesn’t round.', { mono: true }),
    tapbug('It prints 4080', ['print("40" + "80")'], [[1, '"40" + "80"', '40 + 80']], 'In quotes they are text, and + joins text.'),
    recap([
      ['🔢', 'int for whole numbers, float for decimals'],
      ['➕', '+ - * / do the maths'],
      ['➗', '/ always gives a decimal'],
    ]),
  ]),

  lesson('p-b-2-2', '//, % and **', 4, [
    reveal('More operators', [
      ['7 // 2', '3: whole-number division, rounding down.'],
      ['7 % 2', '1: the remainder.'],
      ['2 ** 3', '8: 2 to the power 3.'],
      ['The order', 'Brackets first, then **, then * / // %, then + and -.'],
    ], { mono: true }),
    run('Share the cookies', 'Pick a sum. 17 cookies, 5 children.', ['cookies = 17', 'children = 5', 'print({{v}})'], ['cookies / children', 'cookies // children', 'cookies % children', 'children ** 2'], { caption: '// says how many each child gets (3); % says how many are left over (2).' }),
    predict('Order matters', ['a = 2 + 3 * 4', 'b = (2 + 3) * 4', 'c = 10 - 2 ** 3', 'print(a, b, c)'], [
      [1, 'What will a be?', ['14', '20', '24'], '3 * 4 first, then + 2.', { var: 'a' }],
      [2, 'What will b be?', ['20', '14', '9'], 'Brackets first.', { var: 'b' }],
      [3, 'What will c be?', ['2', '512', '64'], '2 ** 3 is 8, then 10 - 8.', { var: 'c' }],
    ]),
    matchUp('Which operator?', [['//', 'Whole-number division'], ['%', 'The remainder'], ['**', 'Power'], ['/', 'Division with decimals']], 'Four ways to divide and multiply.'),
    check('Which checks that 14 is even?', ['14 % 2 == 0', '14 // 2 == 0', '14 / 2 == 0', '14 ** 2 == 0'], 'An even number leaves no remainder when divided by 2.', 'Think “remainder”.', { mono: true }),
    recap([
      ['✂️', '// divides into whole numbers'],
      ['🧩', '% gives the remainder'],
      ['🏗', 'Brackets first, then ** , then * /, then + -'],
    ]),
  ]),

  lesson('p-b-2-3', 'Changing types, and round()', 4, [
    run('Change the type', 'Pick a conversion.', ['print({{v}})'], ['int("40") + 1', 'float("2.5") * 2', 'str(40) + " rupees"', 'int(7.9)', 'round(7.9)'], { caption: 'int() cuts off the decimal part; round() goes to the nearest whole number.' }),
    reveal('Types', [
      ['int', 'Whole numbers: 40'],
      ['float', 'Decimals: 2.5'],
      ['str', 'Text: "40"'],
      ['type(x)', 'Tells you which one x is.'],
    ], { mono: true }),
    predict('Rounding money', ['bill = 199.456', 'shown = round(bill, 2)', 'whole = round(bill)', 'print(shown, whole)'], [
      [2, 'What will shown be?', ['199.46', '199.45', '199'], 'Two decimal places, rounded.', { var: 'shown' }],
      [3, 'What will whole be?', ['199', '200', '199.5'], 'The nearest whole number.', { var: 'whole' }],
    ]),
    check('What does int("12") + 3 give?', ['15', '123', '"15"', 'An error'], 'int() turns the text into a number first.', 'Text or number?', { mono: true }),
    tapbug("ValueError: invalid literal for int() with base 10: '2.5'", ['cups = int("2.5")'], [[1, 'int("2.5")', 'float("2.5")']], 'int() needs a whole number in the text. Use float() for decimals.'),
    recap([
      ['🔄', 'int(), float() and str() change the type'],
      ['✂️', 'int() cuts off decimals'],
      ['🎯', 'round(x, 2) rounds to 2 places'],
    ]),
  ]),

  challenge('p-b-2-ch', 'Module 2 Challenge', { icon: '🔢', name: 'Number Cruncher' }, ['Do maths with Python', 'Use //, % and ** and the order of operations', 'Change types and round'], [
    mcq(1, 'What does 7 // 2 give?', ['3', '3.5', '1', '4'], 'Whole-number division.', { mono: true }),
    mcq(2, 'What does 7 % 2 give?', ['1', '3', '3.5', '0'], 'The remainder.', { mono: true }),
    mcq(3, 'What does 2 ** 3 give?', ['8', '6', '5', '9'], '2 × 2 × 2.', { mono: true }),
    mcq(4, 'What does 9 / 3 give?', ['3.0', '3', '0.3', '33'], '/ always gives a decimal.', { mono: true }),
    mcq(5, 'Which turns "5" into a number?', ['int("5")', 'str(5)', 'number("5")', '"5" + 0'], 'int() for whole numbers.', { mono: true }),
    swipe([
      ['/ always gives a decimal', true, '10 / 2 is 5.0.'],
      ['% gives the remainder', true, '17 % 5 is 2.'],
      ['int(7.9) is 8', false, 'int cuts off: 7.'],
      ['Brackets are worked out last', false, 'First.'],
    ]),
    pairs([['int', 'Whole number'], ['float', 'Decimal'], ['str', 'Text'], ['round()', 'Nearest number']], 'Number tools.'),
    pickCode('Which gives the leftover cookies when 17 are shared by 5?', ['17 % 5', '17 // 5', '17 / 5', '17 ** 5'], 'The remainder.'),
    bugTask(['print("40" + "80")', 'cups = int("2.5")', 'total = 2 + 3 * 4  # should be 20'], [[1, '"40" + "80"', '40 + 80'], [2, 'int("2.5")', 'float("2.5")'], [3, '2 + 3 * 4', '(2 + 3) * 4']], 'Numbers without quotes, float() for decimals, and brackets to add first.'),
    predictTask(['cookies = 23', 'each = cookies // 4', 'left = cookies % 4', 'print(each, left)'], 'What does it print?', ['5 3', '5.75 0', '6 1', '5 4'], '4 children get 5 each (20), and 3 are left.'),
    arrange(['tea = 40', 'cups = int("3")', 'print(tea * cups)'], 'set the price, turn the text into a number, then multiply', ['120']),
  ]),
];
