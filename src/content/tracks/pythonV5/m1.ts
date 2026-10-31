// Python Basic · Module 1 · Your first program. Lesson 1.1 keeps the old module id (p-var-1).
// input() can’t wait for typing on a lesson screen, so input lessons fill in what was typed (the learner picks it).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_B_M1: Lesson[] = [
  lesson('p-var-1', 'What is Python?', 4, [
    chat(['Python is a language for giving a computer instructions, written almost like English.', 'It is one of the most used programming languages in the world, and a great first one.']),
    reveal('Where Python is used', [
      ['Websites and apps', 'The servers behind many big apps and websites run Python.', '🌐'],
      ['Data and AI', 'Charts, predictions and AI models are mostly built with Python.', '🤖'],
      ['Science', 'Scientists use it to study weather, space and medicine.', '🔬'],
      ['Office work', 'Making bills, reports and emails automatically.', '🗂'],
    ]),
    run('Your first line', 'Pick what to print. Can you make it print 120?', ['print({{v}})'], ['"Hello"', '"Welcome to Rosa’s Café"', '"40" + "80"', '40 + 80'], { goal: '120', caption: 'Text in quotes is printed as it is. Numbers without quotes are worked out.' }),
    predict('Top to bottom', ['print("Good morning")', 'print("Lemon Tea: ₹40")', 'print(40 * 2)'], [
      [3, 'What will the last line print?', ['80', '40 * 2', '4040'], 'Without quotes, Python works it out.', { out: true }],
    ]),
    check('Which line prints Hello?', ['print("Hello")', 'Print("Hello")', 'print(Hello)', 'echo "Hello"'], 'print is in small letters, and text needs quotes.', 'Capitals matter in Python.', { mono: true }),
    recap([
      ['🐍', 'Python gives the computer instructions'],
      ['📜', 'It runs from top to bottom'],
      ['🖨', 'print() shows text and numbers'],
    ]),
  ]),

  lesson('p-b-1-2', 'Comments, and reading your first error', 4, [
    reveal('Comments', [
      ['# Prices in rupees', 'Python skips everything after #. It is a note for people.'],
      ['print("Hi")  # greet', 'A comment can sit at the end of a line too.'],
      ['Why?', 'To explain why the code does something, for you and your team.'],
    ], { mono: true }),
    toggleRun('Read the error', [
      ['A capital P', ['Print("Lemon Tea")'], 'Python knows print, not Print. The error even suggests the fix.', ["NameError: name 'Print' is not defined. Did you mean: 'print'?"]],
      ['No quotes', ['print(Lemon)'], 'Without quotes, Python looks for a variable called Lemon.', ["NameError: name 'Lemon' is not defined"]],
      ['Fixed', ['print("Lemon Tea")'], 'Small letters, text in quotes, brackets closed.', ['Lemon Tea']],
    ]),
    tapbug('SyntaxError: unterminated string literal', ['print("Cheese Toast)'], [[1, '"Cheese Toast)', '"Cheese Toast")']], 'The closing quote is missing, so Python can’t find where the text ends.'),
    truth([
      ['Python runs the words after #', false, 'It skips them: they are comments.'],
      ['An error message tells you the line number', true, 'Look there first.'],
      ['print and Print are the same', false, 'Capitals matter.'],
    ]),
    check('What does Python do with # Prices in rupees?', ['Skips it: it is a comment', 'Prints it', 'Shows an error', 'Saves it'], 'Comments are for people.', 'Look at the first character.'),
    recap([
      ['💬', '# starts a comment'],
      ['🧭', 'Errors name the problem and the line'],
      ['🔤', 'Capitals and quotes matter'],
    ]),
  ]),

  lesson('p-b-1-3', 'Variables', 5, [
    chat(['A variable is a labelled box that holds a value.', 'price = 40 puts 40 in a box called price. Later, price gives you 40 back.']),
    run('Use the boxes', 'Pick how many cups. Can you make the bill 200?', ['price = 40', 'cups = {{v}}', 'print("Bill:", price * cups)'], ['1', '2', '3', '5'], { goal: 'Bill: 200', caption: 'Change one value, and everything that uses it changes too.' }),
    predict('A box can change', ['cups = 2', 'cups = cups + 1', 'price = 40', 'bill = cups * price', 'print(bill)'], [
      [2, 'What will cups be?', ['3', '2', '21'], 'Take the old value, add 1, and put it back in the box.', { var: 'cups' }],
      [4, 'What will bill be?', ['120', '80', '160'], '3 cups at 40.', { var: 'bill' }],
    ]),
    matchUp('Good name or not?', [['total_bill', 'A good name'], ['2cups', 'Can’t start with a number'], ['my price', 'No spaces allowed'], ['Price and price', 'Two different names']], 'Names use letters, digits and _, and don’t start with a digit.'),
    tapbug("NameError: name 'Price' is not defined", ['price = 40', 'print(Price * 2)'], [[2, 'Price', 'price']], 'Names must match exactly, capitals too.'),
    recap([
      ['📦', 'A variable is a named box for a value'],
      ['🔁', 'name = new value replaces the old one'],
      ['🏷', 'Clear names: total_bill, not x'],
    ]),
  ]),

  lesson('p-b-1-4', 'Asking the user: input()', 5, [
    reveal('input()', [
      ['input("Your name? ")', 'Shows the question and waits for the user to type.'],
      ['name = input(…)', 'What they type goes into the variable.'],
      ['Always text', 'Even if they type 2, you get "2": text.'],
      ['int(input(…))', 'Turn it into a number when you need maths.'],
    ], { mono: true }),
    run('Say hello', 'Pick what the customer typed.', ['# input() would wait for typing. Pick what was typed:', 'name = {{v}}', 'print("Hello, " + name + "! Welcome to Rosa’s Café.")'], ['"Ava"', '"Reed"', '"Megan"'], { caption: 'In the code editor, input() really waits for you to type.' }),
    toggleRun('Text or number?', [
      ['Text', ['cups = "2"  # what input() gives', 'print(cups * 3)'], 'Text times 3 repeats the text!', ['222']],
      ['Number', ['cups = int("2")', 'print(cups * 3)'], 'int() turns the text into a number.', ['6']],
    ]),
    check('What type of value does input() give back?', ['Text (a string)', 'A number', 'True or False', 'It depends on what is typed'], 'Always text. Convert it if you need a number.', 'Even digits come back in quotes.'),
    tapbug('TypeError: can only concatenate str (not "int") to str', ['cups = input("How many cups? ")', 'print(cups + 1)'], [[1, 'input("How many cups? ")', 'int(input("How many cups? "))']], 'input() gives text. Turn it into a number first.'),
    recap([
      ['⌨️', 'input() asks the user and waits'],
      ['🔤', 'It always gives back text'],
      ['🔢', 'int() turns it into a number'],
    ]),
  ]),

  challenge('p-b-1-ch', 'Module 1 Challenge', { icon: '🐣', name: 'First Steps' }, ['Write and run your first Python', 'Store values in variables', 'Read errors and ask the user for input'], [
    mcq(1, 'What does print("Hi") do?', ['Shows Hi', 'Saves Hi', 'Deletes Hi', 'Asks for Hi'], 'print shows things.', { mono: true }),
    mcq(2, 'Which is a comment?', ['# total for today', '// total for today', '<!-- total -->', '"total"'], 'Python comments start with #.', { mono: true }),
    mcq(3, 'Which variable name is allowed?', ['total_bill', '2bill', 'total bill', 'total-bill'], 'Letters, digits and _, not starting with a digit.', { mono: true }),
    mcq(4, 'After x = 5 and then x = x + 2, what is x?', ['7', '5', '2', '52'], 'The old value plus 2.', { mono: true }),
    mcq(5, 'What does input() always give back?', ['Text', 'A number', 'A list', 'Nothing'], 'Convert it if you need a number.'),
    swipe([
      ['Python runs from top to bottom', true, 'Line by line.'],
      ['print and Print are the same', false, 'Capitals matter.'],
      ['A variable can change its value', true, 'That is why it is called a variable.'],
      ['input() gives a number if you type digits', false, 'It is still text.'],
    ]),
    pairs([['print()', 'Show something'], ['#', 'A comment'], ['=', 'Put a value in a variable'], ['input()', 'Ask the user']], 'Your first tools.'),
    pickCode('Which prints the bill for 3 teas at ₹40?', ['print(3 * 40)', 'print("3 * 40")', 'Print(3 * 40)', 'print 3 * 40'], 'No quotes around the sum, small p, brackets.'),
    bugTask(['Print("Welcome")', 'print("Lemon Tea)', 'cups = input("Cups? ") + 1'], [[1, 'Print', 'print'], [2, '"Lemon Tea)', '"Lemon Tea")'], [3, 'input("Cups? ")', 'int(input("Cups? "))']], 'print is in small letters, text needs both quotes, and input() gives text.'),
    predictTask(['price = 40', 'cups = 3', 'price = 45', 'print(price * cups)'], 'What does it print?', ['135', '120', '40', '45'], 'price was changed to 45 before the sum.'),
    arrange(['price = 80', 'toasts = 2', 'print("Bill:", price * toasts)'], 'set the price, set the count, then print', ['Bill: 160']),
  ]),
];
