// Python Basic, Modules 1–3 in the Lesson v4 format (APP-PLAN Part 3, draft in
// project-docs/content-drafts/python-basic-v4.md): guess first → three cards that each end in a one-tap
// check → try it with targets → predict, then run → spot the bug → sort → quick checks → build it → recall.
// Every output, error and answer here is checked by the content tests against real Python.
import { bug, group, lesson, order, quiz, read, recall, trace, tryIt } from '../dsl';
import type { CodeStep, Lesson, Reading } from '../types';

const REVIEWED = '2026-10-28';
export const doc = (title: string, page: string): Reading => ({ title, url: `https://docs.python.org/3/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'Python 3' });
export const LEARN = (n: number) => `LEARN · ${n} OF 3`;

export const v4 = (id: string, title: string, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[]): Lesson => ({
  ...lesson(id, title, 'python', learned, steps, 10),
  level: 'basic',
  format: 'v4',
  reading,
});

/** Build it for Module 1: cups = 50, total = price * cups, print(total). */
const buildTotal: CodeStep = {
  type: 'code',
  kicker: 'BUILD IT',
  title: 'The total for 50 cups',
  instructions: 'Tap a gap, then a piece. Make the program print 600.',
  lang: 'python',
  file: 'total.py',
  lines: [['price = 12'], ['cups = ', { gap: 0 }], ['total = price ', { gap: 1 }, ' cups'], [{ gap: 2 }, '(total)']],
  tokens: ['50', '"50"', '*', '+', 'print', 'Print'],
  solution: ['50', '*', 'print'],
  run: ([cups, op, fn]) => {
    const checks = [
      { label: 'cups holds a number', ok: cups === '50' },
      { label: 'total multiplies price by cups', ok: op === '*' },
      { label: 'it prints total', ok: fn === 'print' },
    ];
    if (!['50', '"50"'].includes(cups) || !['*', '+'].includes(op)) return { pass: false, error: 'SyntaxError: invalid syntax', checks };
    if (cups === '"50"' && op === '+') return { pass: false, error: 'TypeError: unsupported operand type(s) for +: \'int\' and \'str\'', checks };
    if (fn !== 'print') return { pass: false, error: fn === 'Print' ? "NameError: name 'Print' is not defined. Did you mean: 'print'?" : 'SyntaxError: invalid syntax', checks };
    const total = cups === '"50"' ? '50'.repeat(12) : String(op === '*' ? 12 * 50 : 12 + 50);
    return { pass: total === '600', output: [total], checks };
  },
};

/** Build it for Module 2: change in coins of 10. */
const buildChange: CodeStep = {
  type: 'code',
  kicker: 'BUILD IT',
  title: 'Change in tens and ones',
  instructions: 'Riya owes ₹64 in change. Make the program print 6 tens and 4 ones.',
  lang: 'python',
  file: 'change.py',
  lines: [['change = 64'], ['tens = change ', { gap: 0 }, ' 10'], ['ones = change ', { gap: 1 }, ' 10'], [{ gap: 2 }, '(tens, "tens and", ones, "ones")']],
  tokens: ['//', '%', '/', '*', 'print', 'Print'],
  solution: ['//', '%', 'print'],
  run: ([a, b, fn]) => {
    const ops: Record<string, (x: number) => number> = { '//': (x) => Math.floor(x / 10), '%': (x) => x % 10, '/': (x) => x / 10, '*': (x) => x * 10 };
    const checks = [
      { label: 'tens counts whole tens', ok: a === '//' },
      { label: 'ones is what is left over', ok: b === '%' },
      { label: 'it prints the result', ok: fn === 'print' },
    ];
    if (!ops[a] || !ops[b]) return { pass: false, error: 'SyntaxError: invalid syntax', checks };
    if (fn !== 'print') return { pass: false, error: fn === 'Print' ? "NameError: name 'Print' is not defined. Did you mean: 'print'?" : 'SyntaxError: invalid syntax', checks };
    // Python prints / results as decimals (6.4) and the others as whole numbers.
    const fmt = (op: string) => {
      const x = ops[op](64);
      return op === '/' ? (Number.isInteger(x) ? `${x}.0` : String(x)) : String(x);
    };
    const line = `${fmt(a)} tens and ${fmt(b)} ones`;
    return { pass: line === '6 tens and 4 ones', output: [line], checks };
  },
};

/** Build it for Module 3: a receipt line with an f-string. */
const buildReceipt: CodeStep = {
  type: 'code',
  kicker: 'BUILD IT',
  title: 'A neat receipt line',
  instructions: 'Make the program print 3 x Tea = ₹36.',
  lang: 'python',
  file: 'receipt.py',
  lines: [['qty = 3'], ['item = "tea"'], ['print(', { gap: 0 }, '"{qty} x {item.', { gap: 1 }, '()} = ₹{qty ', { gap: 2 }, ' 12}")']],
  tokens: ['f', 'r', 'title', 'upper', '*', '+'],
  solution: ['f', 'title', '*'],
  run: ([pre, method, op]) => {
    const checks = [
      { label: 'it is an f-string', ok: pre === 'f' },
      { label: 'Tea starts with a capital letter', ok: method === 'title' },
      { label: 'the price is worked out', ok: op === '*' },
    ];
    if (!['f', 'r'].includes(pre) || !['title', 'upper'].includes(method) || !['*', '+'].includes(op)) return { pass: false, error: 'SyntaxError: invalid syntax', checks };
    // A raw string (r"…") prints the braces as they are; only f"…" fills them in.
    const line = pre === 'r' ? `{qty} x {item.${method}()} = ₹{qty ${op} 12}` : `3 x ${method === 'title' ? 'Tea' : 'TEA'} = ₹${op === '*' ? 36 : 15}`;
    return { pass: line === '3 x Tea = ₹36', output: [line], checks };
  },
};

export const PYTHON_V4: Lesson[] = [
  // 1 ─────────────────────────────────────────────
  v4('p-var-1', 'Your first program', ['Show text and numbers with print()', 'Store a value in a variable', 'Replace it with a new value'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya sells tea. At night her phone adds up the day. What do you think this prints?',
      lang: 'python',
      code: ['price = 12', 'cups = 40', 'print(price * cups)'],
      options: ['480', 'price * cups', '52', 'An error'],
      right: '12 × 40 = 480. Python works out price * cups and prints the answer. By the end of this module you will write this yourself.',
      wrong: 'Just a guess is fine. Hint: the * sign means multiply.',
      mono: true,
    }),
    read({
      kicker: LEARN(1),
      title: 'print() shows things on the screen',
      body: 'Whatever you put inside print( ) appears on the screen. Text goes in quotes. Numbers and maths do not need quotes.',
      lang: 'python',
      code: ['print("Hello, Riya")', 'print(12 * 40)'],
      anim: 'print',
      check: { prompt: 'Which line prints the word Hello?', options: ['print("Hello")', 'print(Hello)', 'Print("Hello")'], answer: 0, hint: 'Text needs quotes, and Python cares about capital letters.', why: 'Quotes make Hello text. Without them Python looks for a variable called Hello, and Print with a capital P does not exist.', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'Variables are labelled boxes',
      body: 'price = 12 makes a box called price and puts 12 in it. Later you use the name, and Python uses what is inside.',
      lang: 'python',
      code: ['price = 12', 'cups = 40', 'print(price * cups)'],
      anim: 'variable',
      check: { prompt: 'Which line puts 12 in a box called price?', options: ['price = 12', '12 = price', 'price == 12', '"price" = 12'], answer: 0, hint: 'The name goes on the left of =, the value on the right.', why: 'name = value stores it. == is for comparing, not storing.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'Values can change',
      body: 'Give a box a new value and the old one is replaced. cups = cups + 5 means: take what is in cups, add 5, put the answer back.',
      lang: 'python',
      code: ['cups = 40', 'cups = cups + 5', 'print(cups)'],
      anim: 'variable',
      check: { prompt: 'cups is 45. Then Riya runs cups = cups - 10. What is cups now?', options: ['35', '30', '45', '-10'], answer: 0, hint: 'Start from what is in the box now: 45.', why: 'cups was 45, so cups - 10 is 35, and 35 replaces 45.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Hit the targets',
      instructions: 'Tap a highlighted number to change it, then run. Make the program print each target.',
      lang: 'python',
      file: 'stall.py',
      starter: 'price = 12\ncups = 40\nprint(price * cups)',
      ideas: ['Make it print 600', 'Make it print 960'],
      goals: [
        { label: 'Make it print 600', output: '600' },
        { label: 'Make it print 960', output: '960' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Watch the boxes fill',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['price = 12', 'cups = 40', 'total = price * cups', 'cups = cups + 5', 'print("Cups:", cups, "Total:", total)'],
      stops: [
        { line: 3, prompt: 'Line 3 runs next. What will total be?', options: ['480', '52', 'price * cups', '0'], answer: 0, hint: '* means multiply: 12 times 40.', why: 'total = 12 * 40 = 480.', mono: true, check: { var: 'total' } },
        { line: 5, prompt: 'cups is now 45. What will the last line print for total?', options: ['480', '540', '45', '525'], answer: 0, hint: 'When was total worked out?', why: 'total got its value on line 3, when cups was 40. Changing cups later does not change total.', mono: true, check: { var: 'total' } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'Riya’s receipt crashed',
      instructions: 'Read the error, then tap the line that caused it.',
      lang: 'python',
      lines: ['cups = 40', 'print("Cups sold: " + cups)'],
      error: 'TypeError: can only concatenate str (not "int") to str',
      bug: 1,
      fix: 'print("Cups sold:", cups)',
      explain: '+ cannot join text and a number. A comma lets print show both: Cups sold: 40.',
    }),
    group({
      kicker: 'SORT',
      title: 'Text or number?',
      instructions: 'Tap the group each value belongs in.',
      groups: ['Text', 'Number'],
      items: [
        { text: '"Riya"', group: 0 },
        { text: '12', group: 1 },
        { text: '"12"', group: 0 },
        { text: '3.5', group: 1 },
        { text: '"Hello"', group: 0 },
        { text: '40', group: 1 },
      ],
      mono: true,
      explain: 'Anything in quotes is text, even "12". Numbers have no quotes.',
    }),
    quiz({
      prompt: 'Fill the gap to show Hi on the screen:   ____("Hi")',
      options: ['print', 'Print', 'show', 'echo'],
      right: 'print is all small letters. Python treats Print as a different, unknown name.',
      wrong: 'It is the word you used all lesson, in small letters.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Python runs from the top. Make the program print 450.',
      lang: 'python',
      lines: ['price = 15', 'cups = 30', 'print(price * cups)'],
      output: ['450'],
      explain: 'Both values first, then print(price * cups). A name needs its value before it is used.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['x = 5', 'x = x * 2', 'print(x)'],
      options: ['10', '5', 'x * 2', '52'],
      right: 'x * 2 is 5 * 2 = 10, which replaces the 5.',
      wrong: 'Work out the right side first, using what x holds now.',
      mono: true,
    }),
    buildTotal,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What does print() do?', a: 'It shows a value on the screen: text in quotes, or numbers and maths.' },
        { q: 'What is a variable?', a: 'A name for a box that stores a value, like price = 12.' },
        { q: 'cups = 40, then cups = cups + 5. What is cups?', a: '45. The new value replaces the old one.' },
      ],
    }),
  ], [doc('An Informal Introduction to Python', 'tutorial/introduction.html')]),

  // 2 ─────────────────────────────────────────────
  v4('p-num-1', 'Numbers and maths', ['Do maths with + - * /', 'Split into groups and leftovers with // and %', 'Turn typed text into a number with int()'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya packs 45 cups into trays of 6. What do you think this prints?',
      lang: 'python',
      code: ['print(45 // 6, 45 % 6)'],
      options: ['7 3', '7.5', '7.5 0', '6 3'],
      right: '45 // 6 is 7 full trays and 45 % 6 is the 3 cups left over. You will use both today.',
      wrong: 'Just a guess is fine. Hint: think of full trays and cups left over.',
      mono: true,
    }),
    read({
      kicker: LEARN(1),
      title: '+ - * / work like school maths',
      body: 'Python adds, subtracts, multiplies and divides like a calculator. * and / happen before + and -, and brackets go first. / always gives a decimal answer.',
      lang: 'python',
      code: ['print(10 + 4, 10 - 4, 10 * 4, 10 / 4)'],
      anim: 'math',
      check: { prompt: 'What does print(9 / 3) show?', options: ['3.0', '3', '3.3', '27'], answer: 0, hint: '/ always gives a decimal answer, even when it divides exactly.', why: '9 / 3 is 3.0: / always gives a decimal (a float).', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: '// and % give groups and leftovers',
      body: '// divides and keeps only the whole part: how many full trays. % gives what is left over: the cups that do not fill a tray.',
      lang: 'python',
      code: ['cups = 45', 'print(cups // 6)', 'print(cups % 6)'],
      anim: 'math',
      check: { prompt: 'What are 20 // 6 and 20 % 6?', options: ['3 and 2', '3 and 0.33', '2 and 3', '3.33 and 2'], answer: 0, hint: 'How many full sixes fit in 20? What is left?', why: 'Three sixes make 18, so 20 // 6 is 3 and 2 are left over.' },
    }),
    read({
      kicker: LEARN(3),
      title: 'int() turns text into a number',
      body: 'What a person types arrives as text, like "40". Text times 3 repeats the text. int("40") turns it into the number 40, so maths works.',
      lang: 'python',
      code: ['print("2" * 3)', 'print(int("2") * 3)'],
      anim: 'types',
      check: { prompt: 'What does print(int("5") + 1) show?', options: ['6', '51', '"51"', 'An error'], answer: 0, hint: 'int("5") is the number 5, not the text "5".', why: 'int("5") is 5, and 5 + 1 is 6.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Pack the trays',
      instructions: 'Tap the number of cups to change it, then run.',
      lang: 'python',
      file: 'trays.py',
      starter: 'cups = 45\nprint(cups // 6, "trays,", cups % 6, "left")',
      ideas: ['No cups left over', 'Exactly 4 cups left'],
      goals: [
        { label: 'No cups left over', output: '15 trays, 0 left' },
        { label: 'Exactly 4 cups left over', output: '7 trays, 4 left' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Trays and leftovers',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['cups = 45', 'trays = cups // 6', 'left = cups % 6', 'print(trays, "trays,", left, "left")'],
      stops: [
        { line: 2, prompt: 'Line 2 runs next. What will trays be?', options: ['7', '7.5', '6', '8'], answer: 0, hint: '// keeps only the whole number of trays.', why: '45 // 6 is 7: seven full trays.', mono: true, check: { var: 'trays' } },
        { line: 4, prompt: 'What will the last line print?', options: ['7 trays, 3 left', '7 trays, 0 left', '7.5 trays, 3 left', '6 trays, 9 left'], answer: 0, hint: 'left was worked out on line 3: 45 % 6.', why: '7 full trays and 3 cups left over.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'A huge bill, and no error',
      instructions: 'Riya typed 40 into her app. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['typed = "40"', 'cups = typed', 'print(cups * 12)'],
      error: '404040404040404040404040',
      bug: 1,
      fix: 'cups = int(typed)',
      explain: 'Typed input is text. Text times 12 repeats it 12 times. int(typed) makes it the number 40, and 40 * 12 is 480.',
    }),
    group({
      kicker: 'SORT',
      title: 'Whole number or decimal?',
      instructions: 'Tap the group for each value. int is a whole number; float has a decimal point.',
      groups: ['int (whole)', 'float (decimal)'],
      items: [
        { text: '7', group: 0 },
        { text: '7.0', group: 1 },
        { text: '10 / 2', group: 1 },
        { text: '10 // 2', group: 0 },
        { text: '3.5', group: 1 },
        { text: '45 % 6', group: 0 },
      ],
      mono: true,
      explain: '/ always gives a float, even 10 / 2 = 5.0. // and % on whole numbers give whole numbers.',
    }),
    quiz({
      prompt: 'Fill the gap so it prints 2:   print(17 __ 5)',
      options: ['%', '//', '/', '*'],
      right: '17 % 5 is the leftover: 5 fits three times (15) and 2 is left.',
      wrong: 'You want what is left over, not how many fit.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Turn the typed text into a number before doing maths with it. It should print 480.',
      lang: 'python',
      lines: ['typed = "40"', 'cups = int(typed)', 'print(cups * 12)'],
      output: ['480'],
      explain: 'First the text, then int() to make it a number, then the maths.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['print(2 + 3 * 4)'],
      options: ['14', '20', '24', '9'],
      right: '* happens before +: 3 * 4 = 12, then 2 + 12 = 14.',
      wrong: 'Multiply before you add, like in school maths.',
      mono: true,
    }),
    buildChange,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What kind of answer does / always give?', a: 'A decimal (a float), like 9 / 3 = 3.0.' },
        { q: 'What are 45 // 6 and 45 % 6?', a: '7 and 3: seven full trays and three cups left over.' },
        { q: 'Why write int(input())?', a: 'Typed input is text. int() turns it into a number so maths works.' },
      ],
    }),
  ], [doc('Using Python as a Calculator', 'tutorial/introduction.html#numbers')]),

  // 3 ─────────────────────────────────────────────
  v4('p-str-1', 'Text and f-strings', ['Join and repeat text', 'Put values inside text with f-strings', 'Tidy text with methods like strip() and title()'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya’s app greets each customer. What do you think this prints?',
      lang: 'python',
      code: ['name = "Riya"', 'print("Hi " + name + "!")'],
      options: ['Hi Riya!', 'Hi name!', 'Hi + Riya + !', 'An error'],
      right: '+ joins pieces of text, and name holds "Riya". Joining text is today’s topic.',
      wrong: 'Just a guess is fine. Hint: name is a variable holding "Riya".',
      mono: true,
    }),
    read({
      kicker: LEARN(1),
      title: 'Strings are text in quotes',
      body: 'Text in quotes is called a string. + joins two strings into one. * repeats a string. len() counts its characters.',
      lang: 'python',
      code: ['print("tea" + " cup")', 'print("ha" * 3)', 'print(len("Pune"))'],
      anim: 'string',
      check: { prompt: 'What does print("tea" * 3) show?', options: ['teateatea', 'tea tea tea', 'tea3', 'An error'], answer: 0, hint: '* repeats the text with nothing in between.', why: '"tea" * 3 is "teateatea": the text three times, no spaces.', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'f-strings put values inside text',
      body: 'Put f before the quotes, then any variable or maths inside { }. Python swaps each { } for its value.',
      lang: 'python',
      code: ['qty = 3', 'print(f"{qty} cups cost ₹{qty * 12}")'],
      anim: 'string',
      check: { prompt: 'What does print(f"{2 + 3} cups") show?', options: ['5 cups', '2 + 3 cups', '{2 + 3} cups', '23 cups'], answer: 0, hint: 'Python works out what is inside { } first.', why: 'Inside { } Python works out 2 + 3, so it prints 5 cups.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'Methods tidy text',
      body: 'A method is written after a dot: name.upper(), name.strip(), name.title(). It gives back new text. The original string stays the same.',
      lang: 'python',
      code: ['name = "  riya  "', 'print(name.strip().title())', 'print(name.upper())'],
      anim: 'string',
      check: { prompt: 'name = "riya", then name.upper(), then print(name). What prints?', options: ['riya', 'RIYA', 'Riya', 'An error'], answer: 0, hint: 'Did anything store the new text back in name?', why: 'upper() gave back "RIYA", but nothing stored it. name is still "riya".', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Receipt lines',
      instructions: 'Tap the quantity to change it, then run.',
      lang: 'python',
      file: 'receipt.py',
      starter: 'qty = 2\nitem = "tea"\nprint(f"{qty} x {item} = ₹{qty * 12}")',
      ideas: ['Show 3 cups', 'Show 4 cups'],
      goals: [
        { label: 'Show 3 x tea = ₹36', output: '3 x tea = ₹36' },
        { label: 'Show 4 x tea = ₹48', output: '4 x tea = ₹48' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Tidy, then print',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['item = "  ginger tea  "', 'clean = item.strip().title()', 'print(f"{clean}: ₹{12 * 2}")'],
      stops: [
        { line: 2, prompt: 'Line 2 runs next. What will clean be?', options: ["'Ginger Tea'", "'  Ginger Tea  '", "'ginger tea'", "'GINGER TEA'"], answer: 0, hint: 'strip() removes the spaces at the ends; title() makes each word start with a capital.', why: 'strip() then title() gives \'Ginger Tea\'.', mono: true, check: { var: 'clean' } },
        { line: 3, prompt: 'What will the last line print?', options: ['Ginger Tea: ₹24', '{clean}: ₹{12 * 2}', 'Ginger Tea: ₹12 * 2', 'clean: ₹24'], answer: 0, hint: 'It is an f-string: every { } becomes its value.', why: 'The f-string swaps {clean} for Ginger Tea and {12 * 2} for 24.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The total is missing',
      instructions: 'Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['total = 24', 'print("Total: {total}")'],
      error: 'Total: {total}',
      bug: 1,
      fix: 'print(f"Total: {total}")',
      explain: 'Without the f, { } is just text. With f"…", Python puts the value inside: Total: 24.',
    }),
    group({
      kicker: 'SORT',
      title: 'Text or a number?',
      instructions: 'Tap what each one gives back.',
      groups: ['Text', 'A number'],
      items: [
        { text: 'len("tea")', group: 1 },
        { text: '"tea".upper()', group: 0 },
        { text: '"ab" + "c"', group: 0 },
        { text: '"3" * 2', group: 0 },
        { text: 'len("")', group: 1 },
        { text: 'f"{5}"', group: 0 },
      ],
      mono: true,
      explain: 'len() counts, so it gives a number. Everything else here builds text, even "3" * 2, which is "33".',
    }),
    quiz({
      prompt: 'Fill the gap so it says Hi Riya:   name = "Riya"   print(__"Hi {name}")',
      options: ['f', 'F(', 'str', '+'],
      right: 'An f before the quotes makes it an f-string, so {name} becomes Riya.',
      wrong: 'One letter goes before the quotes.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Tidy the name, then print it. It should print Riya.',
      lang: 'python',
      lines: ['name = "  riya "', 'name = name.strip()', 'print(name.title())'],
      output: ['Riya'],
      explain: 'Store the name, store the tidied version back in name, then print it with a capital letter.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['print(len("Pune"))'],
      options: ['4', '5', 'Pune', '"4"'],
      right: 'len() counts the characters: P, u, n, e. That is 4.',
      wrong: 'Count the letters inside the quotes.',
      mono: true,
    }),
    buildReceipt,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What does + do with two strings?', a: 'It joins them into one: "tea" + " cup" is "tea cup".' },
        { q: 'How do you put a value inside text?', a: 'Use an f-string: f"Total: {total}".' },
        { q: 'Does name.upper() change name?', a: 'No. It gives back new text. Write name = name.upper() to keep it.' },
      ],
    }),
  ], [doc('Text in the Python tutorial', 'tutorial/introduction.html#text'), doc('f-strings', 'tutorial/inputoutput.html#formatted-string-literals')]),
];
