// Python Basic · Module 9 · Functions. Lesson 9.1 keeps the old module id (p-fn-1).
// “Predict” stops are on top-level lines, so each answer is the state once that line has finished.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_B_M9: Lesson[] = [
  lesson('p-fn-1', 'def and calling', 4, [
    chat(['A function is a named set of steps you can use again and again, like a recipe card.', 'You have used print(), len() and input(). Now you make your own.']),
    run('Make and use a function', 'Pick a line to run after the function.', ['def greet():', '    print("Welcome to Rosa’s Café!")', '    print("Today’s special: Cheese Toast")', '{{v}}'], ['greet()', 'print("Before"); greet()', 'greet; print("No brackets: not called")'], { caption: 'def only sets the recipe up. greet() with brackets runs it.' }),
    explore('A function, line by line', ['def greet():', '    print("Welcome!")', 'greet()', 'greet()'], [
      [1, 'def, a name, brackets and a colon.'],
      [2, 'The indented lines are the steps.'],
      [3, 'Nothing runs until you call it, with brackets.'],
      [4, 'Call it as often as you like.'],
    ], { minTaps: 3 }),
    truth([
      ['Defining a function runs it straight away', false, 'Only calling it does.'],
      ['A function can be called many times', true, 'That is the point.'],
      ['Function names follow the same rules as variable names', true, 'Letters, digits and _.'],
    ]),
    check('Which line calls a function named menu?', ['menu()', 'def menu():', 'menu', 'call menu'], 'A name and brackets.', 'Brackets make it run.', { mono: true }),
    tapbug('Nothing is printed', ['def greet():', '    print("Welcome!")', 'greet'], [[3, 'greet', 'greet()']], 'Without brackets, the function isn’t called.'),
    recap([
      ['📇', 'def makes a reusable recipe'],
      ['▶️', 'name() runs it'],
      ['🔁', 'Call it as often as you need'],
    ]),
  ]),

  lesson('p-b-9-2', 'Parameters and return', 5, [
    run('Give it values', 'Pick a call. Can you make it 160?', ['def bill(price, cups):', '    return price * cups', 'print({{v}})'], ['bill(40, 2)', 'bill(80, 3)', 'bill(40, 2) + bill(80, 1)', 'bill(cups=4, price=40)'], { goal: '160', caption: 'The values go into price and cups, in order (or by name).' }),
    toggleRun('print or return?', [
      ['print', ['def bill(price, cups):', '    print(price * cups)', 'total = bill(40, 2)', 'print("Total:", total)'], 'print only shows the answer. The function gives back None.', ['80', 'Total: None']],
      ['return', ['def bill(price, cups):', '    return price * cups', 'total = bill(40, 2)', 'print("Total:", total)'], 'return hands the answer back, so you can keep it.', ['Total: 80']],
    ]),
    predict('Answers you can use', ['def with_tax(amount):', '    return amount + amount * 5 // 100', 'a = with_tax(200)', 'b = with_tax(1000)', 'print(a + b)'], [
      [5, 'What will it print?', ['1260', '1200', '1250'], '200 + 10, and 1000 + 50.', { out: true }],
    ]),
    reveal('Parameters', [
      ['def bill(price, cups):', 'price and cups are parameters: names for the values passed in.'],
      ['bill(40, 2)', 'The values (arguments) go in, in the same order.'],
      ['return', 'Hands back an answer, and ends the function.'],
    ], { mono: true }),
    tapbug("TypeError: bill() missing 1 required positional argument: 'cups'", ['def bill(price, cups):', '    return price * cups', 'print(bill(40))'], [[3, 'bill(40)', 'bill(40, 2)']], 'Give a value for every parameter.'),
    recap([
      ['📥', 'Parameters take values in'],
      ['📤', 'return hands an answer back'],
      ['🖨', 'print shows; return gives'],
    ]),
  ]),

  lesson('p-b-9-3', 'Functions working together', 4, [
    run('Build from small parts', 'Pick a line.', ['def subtotal(price, qty):', '    return price * qty', 'def with_tax(amount):', '    return round(amount * 1.05)', 'def receipt(price, qty):', '    return f"Pay ₹{with_tax(subtotal(price, qty))}"', 'print({{v}})'], ['subtotal(80, 2)', 'with_tax(160)', 'receipt(80, 2)', 'receipt(40, 5)'], { caption: 'Each function does one small job; receipt uses the other two.' }),
    matchUp('Built-in functions', [['len()', 'How many'], ['round()', 'The nearest number'], ['max()', 'The biggest'], ['abs()', 'Without the minus sign']], 'Python comes with many ready-made functions.'),
    predict('Small functions', ['def double(n):', '    return n * 2', 'def add_one(n):', '    return n + 1', 'result = add_one(double(5))', 'print(result)'], [
      [6, 'What will it print?', ['11', '12', '10'], 'The inside first: double(5) is 10, then add one.', { out: true }],
    ]),
    check('Why split a program into small functions?', ['Each is easy to read, test and reuse', 'It runs faster', 'Python needs it', 'To use more lines'], 'Small parts are easier to understand.', 'Think about reading it later.'),
    tapbug("NameError: name 'subtotl' is not defined", ['def subtotal(price, qty):', '    return price * qty', 'print(subtotl(80, 2))'], [[3, 'subtotl', 'subtotal']], 'A typo in the name. It must match the def exactly.'),
    recap([
      ['🧩', 'Small functions, each with one job'],
      ['🔗', 'Functions can use other functions'],
      ['🧰', 'Python has many built in'],
    ]),
  ]),

  challenge('p-b-9-ch', 'Module 9 Challenge', { icon: '🧰', name: 'Function Builder' }, ['Make and call functions', 'Pass values in and return answers', 'Build programs from small functions'], [
    mcq(1, 'Which word makes a function?', ['def', 'function', 'make', 'func'], 'def.', { mono: true }),
    mcq(2, 'What do the brackets in greet() do?', ['Call the function', 'Make a list', 'Make a comment', 'Nothing'], 'They run it.'),
    mcq(3, 'What does return do?', ['Hands back an answer and ends the function', 'Prints the answer', 'Restarts the function', 'Makes a variable'], 'The caller gets the value.'),
    mcq(4, 'What does a function without return give back?', ['None', '0', 'An error', '""'], 'None.', { mono: true }),
    mcq(5, 'In def bill(price, cups):, what is price?', ['A parameter', 'A function', 'A list', 'A keyword'], 'A name for a value passed in.'),
    swipe([
      ['A function runs as soon as it is defined', false, 'Only when it is called.'],
      ['return ends the function', true, 'Lines after it don’t run.'],
      ['print and return do the same thing', false, 'print shows; return gives back.'],
      ['Functions can call other functions', true, 'Small parts, working together.'],
    ]),
    pairs([['def', 'Make a function'], ['greet()', 'Call it'], ['return', 'Hand back an answer'], ['price', 'A parameter']], 'Function words.'),
    pickCode('Which function gives back the bill?', ['def bill(p, q): return p * q', 'def bill(p, q): print(p * q)', 'def bill: return p * q', 'bill(p, q) = p * q'], 'def, brackets with parameters, and return.'),
    bugTask(['greet', 'def bill(price, cups)', 'print(subtotl(80, 2))'], [[1, 'greet', 'greet()'], [2, 'cups)', 'cups):'], [3, 'subtotl', 'subtotal']], 'Call with brackets, end def with a colon, and spell names the same.'),
    predictTask(['def area(w, h):', '    return w * h', 'print(area(3, 4) + area(2, 2))'], 'What does it print?', ['16', '12', '4', '11'], '12 + 4.'),
    arrange(['def bill(price, cups):', '    return price * cups', 'print(bill(40, 3))'], 'define the function, then call it', ['120']),
  ]),
];
