// Python Basic, Modules 4–12 in the Lesson v4 format (draft: project-docs/content-drafts/python-basic-v4-2.md).
// Same shape as Modules 1–3 (pythonV4.ts). Every output, error and answer is checked by the tests against real Python.
import { bug, group, match, order, quiz, read, recall, trace, tryIt } from '../dsl';
import type { CodeStep, Lesson, RunOutput } from '../types';
import { doc, LEARN, v4 } from './pythonV4';

const SYNTAX: RunOutput = { pass: false, error: 'SyntaxError: invalid syntax' };
const printErr = (fn: string): RunOutput => ({ pass: false, error: fn === 'Print' ? "NameError: name 'Print' is not defined. Did you mean: 'print'?" : 'SyntaxError: invalid syntax' });
const build = (o: Omit<CodeStep, 'type' | 'kicker' | 'lang'>): CodeStep => ({ type: 'code', kicker: 'BUILD IT', lang: 'python', ...o });

// ── Build it steps: each `run` acts like Python for every combination of pieces; only the solution passes.

const buildFee = build({
  title: 'The delivery fee',
  instructions: 'Bills over ₹500 travel free, over ₹200 cost ₹20, the rest ₹40. Make it print Fee: 20.',
  file: 'fee.py',
  lines: [['bill = 250'], ['if bill ', { gap: 0 }, ' 500:'], ['    fee = 0'], [{ gap: 1 }, ' bill > 200:'], ['    fee = 20'], ['else:'], ['    fee = 40'], [{ gap: 2 }, '("Fee:", fee)']],
  tokens: ['>', '<', 'elif', 'else', 'print', 'Print'],
  solution: ['>', 'elif', 'print'],
  run: ([cmp, kw, fn]) => {
    const checks = [
      { label: 'free delivery only over ₹500', ok: cmp === '>' },
      { label: 'the second test uses elif', ok: kw === 'elif' },
      { label: 'it prints the fee', ok: fn === 'print' },
    ];
    if (!['>', '<'].includes(cmp) || kw !== 'elif') return { ...SYNTAX, checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    const fee = cmp === '>' ? 20 : 0;
    return { pass: fee === 20, output: [`Fee: ${fee}`], checks };
  },
});

const buildSum = build({
  title: 'Add up 1 to 5',
  instructions: 'Make the program print 15: the total of 1, 2, 3, 4 and 5.',
  file: 'sum.py',
  lines: [['total = ', { gap: 0 }], ['for n in range(1, ', { gap: 1 }, '):'], ['    total = total ', { gap: 2 }, ' n'], ['print(total)']],
  tokens: ['0', '1', '6', '7', '+', '*'],
  solution: ['0', '6', '+'],
  run: ([start, stop, op]) => {
    const num = (x: string) => /^\d+$/.test(x);
    const checks = [
      { label: 'the total starts at 0', ok: start === '0' },
      { label: 'range stops before 6, so it reaches 5', ok: stop === '6' },
      { label: 'each round adds n', ok: op === '+' },
    ];
    if (!num(start) || !num(stop) || !['+', '*'].includes(op)) return { ...SYNTAX, checks };
    let total = Number(start);
    for (let n = 1; n < Number(stop); n++) total = op === '+' ? total + n : total * n;
    return { pass: total === 15, output: [String(total)], checks };
  },
});

const buildCountdown = build({
  title: 'Countdown',
  instructions: 'Make the program print 3, 2 and 1.',
  file: 'countdown.py',
  lines: [['n = ', { gap: 0 }], ['while n ', { gap: 1 }, ' 0:'], ['    print(n)'], ['    n = n ', { gap: 2 }, ' 1']],
  tokens: ['3', '4', '>', '<', '-', '+'],
  solution: ['3', '>', '-'],
  run: ([start, cmp, op]) => {
    const checks = [
      { label: 'it starts at 3', ok: start === '3' },
      { label: 'it keeps going while n > 0', ok: cmp === '>' },
      { label: 'n goes down each round', ok: op === '-' },
    ];
    if (!/^\d+$/.test(start) || !['>', '<'].includes(cmp) || !['-', '+'].includes(op)) return { ...SYNTAX, checks };
    if (cmp === '<') return { pass: false, output: [], checks };
    if (op === '+') return { pass: false, error: 'This loop never stops: n keeps growing, so n > 0 is always True.', checks };
    const output: string[] = [];
    for (let n = Number(start); n > 0; n--) output.push(String(n));
    return { pass: output.join(' ') === '3 2 1', output, checks };
  },
});

const buildListTotal = build({
  title: 'Total the list',
  instructions: 'Add up every price in the list and print 47.',
  file: 'total.py',
  lines: [['prices = [12, 20, 15]'], ['total = 0'], ['for p in ', { gap: 0 }, ':'], ['    total = total ', { gap: 1 }, ' p'], [{ gap: 2 }, '(total)']],
  tokens: ['prices', 'p', '+', '-', 'print', 'Print'],
  solution: ['prices', '+', 'print'],
  run: ([list, op, fn]) => {
    const checks = [
      { label: 'it loops over prices', ok: list === 'prices' },
      { label: 'each price is added', ok: op === '+' },
      { label: 'it prints the total', ok: fn === 'print' },
    ];
    if (!['prices', 'p'].includes(list) || !['+', '-'].includes(op)) return { ...SYNTAX, checks };
    if (list === 'p') return { pass: false, error: "NameError: name 'p' is not defined", checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    const total = op === '+' ? 47 : -47;
    return { pass: total === 47, output: [String(total)], checks };
  },
});

const buildCounts = build({
  title: 'Count the orders',
  instructions: 'Count how many of each drink was ordered. It should print {\'tea\': 2, \'coffee\': 1}.',
  file: 'counts.py',
  lines: [['counts = {}'], ['for item in ["tea", "coffee", "tea"]:'], ['    counts[item] = counts.get(item, ', { gap: 0 }, ') ', { gap: 1 }, ' 1'], [{ gap: 2 }, '(counts)']],
  tokens: ['0', '1', '+', '-', 'print', 'Print'],
  solution: ['0', '+', 'print'],
  run: ([start, op, fn]) => {
    const checks = [
      { label: 'a new drink starts from 0', ok: start === '0' },
      { label: 'each order adds 1', ok: op === '+' },
      { label: 'it prints the counts', ok: fn === 'print' },
    ];
    if (!['0', '1'].includes(start) || !['+', '-'].includes(op)) return { ...SYNTAX, checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    const s = Number(start);
    const step = (x: number) => (op === '+' ? x + 1 : x - 1);
    const tea = step(step(s));
    const coffee = step(s);
    const line = `{'tea': ${tea}, 'coffee': ${coffee}}`;
    return { pass: line === "{'tea': 2, 'coffee': 1}", output: [line], checks };
  },
});

const buildDiscount = build({
  title: '₹50 off big bills',
  instructions: 'Bills over ₹500 get ₹50 off; others stay the same. Make it print 550 300.',
  file: 'discount.py',
  lines: [['def discount(bill):'], ['    if bill > 500:'], ['        return bill ', { gap: 0 }, ' 50'], ['    ', { gap: 1 }, ' bill'], [{ gap: 2 }, '(discount(600), discount(300))']],
  tokens: ['-', '+', 'return', 'print', 'Print', 'def'],
  solution: ['-', 'return', 'print'],
  run: ([op, kw, fn]) => {
    const checks = [
      { label: '₹50 comes off', ok: op === '-' },
      { label: 'other bills are given back with return', ok: kw === 'return' },
      { label: 'it prints both answers', ok: fn === 'print' },
    ];
    if (!['-', '+'].includes(op) || !['return', 'print'].includes(kw)) return { ...SYNTAX, checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    const big = op === '-' ? 550 : 650;
    // With print instead of return, discount(300) prints 300 and gives back None.
    const output = kw === 'return' ? [`${big} 300`] : ['300', `${big} None`];
    return { pass: kw === 'return' && big === 550, output, checks };
  },
});

const buildSafe = build({
  title: 'Never crash on bad input',
  instructions: 'Someone typed abc. Make the program print 0 instead of crashing.',
  file: 'safe.py',
  lines: [['text = "abc"'], [{ gap: 0 }, ':'], ['    cups = int(text)'], [{ gap: 1 }, ' ValueError:'], ['    cups = 0'], [{ gap: 2 }, '(cups)']],
  tokens: ['try', 'except', 'finally', 'catch', 'print', 'Print'],
  solution: ['try', 'except', 'print'],
  run: ([a, b, fn]) => {
    const checks = [
      { label: 'the risky line is inside try', ok: a === 'try' },
      { label: 'except catches the ValueError', ok: b === 'except' },
      { label: 'it prints cups', ok: fn === 'print' },
    ];
    if (a !== 'try' || b !== 'except') return { ...SYNTAX, checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    return { pass: true, output: ['0'], checks };
  },
});

const buildMenuFile = build({
  title: 'Save and read the menu',
  instructions: 'Write two drinks to menu.txt, then print them back one per line.',
  file: 'menu.py',
  lines: [['with open("menu.txt", ', { gap: 0 }, ') as f:'], ['    f.write("tea\\ncoffee\\n")'], ['with open("menu.txt") as f:'], ['    for line in f:'], ['        ', { gap: 1 }, '(line.', { gap: 2 }, '())']],
  tokens: ['"w"', '"r"', 'print', 'Print', 'strip', 'upper'],
  solution: ['"w"', 'print', 'strip'],
  run: ([mode, fn, method]) => {
    const checks = [
      { label: 'the file is opened for writing', ok: mode === '"w"' },
      { label: 'each line is printed', ok: fn === 'print' },
      { label: 'strip() removes the newline', ok: method === 'strip' },
    ];
    if (!['"w"', '"r"'].includes(mode) || !['strip', 'upper'].includes(method)) return { ...SYNTAX, checks };
    if (mode === '"r"') return { pass: false, error: "FileNotFoundError: [Errno 2] No such file or directory: 'menu.txt'", checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    const output = method === 'strip' ? ['tea', 'coffee'] : ['TEA', '', 'COFFEE', ''];
    return { pass: method === 'strip', output, checks };
  },
});

const buildCup = build({
  title: 'A cup that labels itself',
  instructions: 'Make the program print Cup: large.',
  file: 'cup.py',
  lines: [['class Cup:'], ['    def __init__(self, size):'], ['        ', { gap: 0 }, '.size = size'], ['    def label(self):'], ['        return "Cup: " + self.size'], ['c = Cup("large")'], [{ gap: 1 }, '(c.', { gap: 2 }, '())']],
  tokens: ['self', 'this', 'print', 'Print', 'label', 'size'],
  solution: ['self', 'print', 'label'],
  run: ([who, fn, method]) => {
    const checks = [
      { label: 'the size is stored on self', ok: who === 'self' },
      { label: 'it prints the result', ok: fn === 'print' },
      { label: 'it calls the label() method', ok: method === 'label' },
    ];
    if (!['self', 'this'].includes(who) || !['label', 'size'].includes(method)) return { ...SYNTAX, checks };
    if (who === 'this') return { pass: false, error: "NameError: name 'this' is not defined", checks };
    if (fn !== 'print') return { ...printErr(fn), checks };
    if (method === 'size') return { pass: false, error: "TypeError: 'str' object is not callable", checks };
    return { pass: true, output: ['Cup: large'], checks };
  },
});

export const PYTHON_V4_MORE: Lesson[] = [
  // 4 ─────────────────────────────────────────────
  v4('p-if-1', 'Making decisions', ['Compare with == (and store with =)', 'Run one branch with if, elif and else', 'Combine checks with and / or'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya sold 120 cups today. What do you think this prints?',
      lang: 'python',
      code: ['cups = 120', 'if cups > 100:', '    print("Busy day!")', 'else:', '    print("Quiet day")'],
      options: ['Busy day!', 'Quiet day', 'Busy day! and Quiet day', 'Nothing'],
      right: '120 > 100 is True, so the if branch runs and the else branch is skipped. Today you learn how programs choose.',
      wrong: 'Just a guess is fine. Hint: is 120 more than 100?',
    }),
    read({
      kicker: LEARN(1),
      title: 'if runs code only when it’s True',
      body: 'if checks a condition. When it is True, the indented lines under it run. When it is False, Python skips them.',
      lang: 'python',
      code: ['marks = 72', 'if marks >= 40:', '    print("Pass")'],
      anim: 'branch',
      check: { prompt: 'marks = 35. Then if marks >= 40: print("Pass"). What prints?', options: ['Nothing is printed', 'Pass', '35', 'An error'], answer: 0, hint: 'Is 35 at least 40?', why: '35 >= 40 is False, so the indented line is skipped and nothing prints.' },
    }),
    read({
      kicker: LEARN(2),
      title: 'elif and else: one branch runs',
      body: 'Python checks from the top. It runs the first branch whose test is True and skips the rest. else catches everything left.',
      lang: 'python',
      code: ['bill = 250', 'if bill > 500:', '    print("Free delivery")', 'elif bill > 200:', '    print("₹20 delivery")', 'else:', '    print("₹40 delivery")'],
      anim: 'branch',
      check: { prompt: 'In the code above, which line prints for bill = 250?', options: ['₹20 delivery', 'Free delivery', '₹40 delivery', 'All three'], answer: 0, hint: 'Check the tests from the top: is 250 > 500? Is 250 > 200?', why: '250 > 500 is False, 250 > 200 is True, so “₹20 delivery” runs and else is skipped.' },
    }),
    read({
      kicker: LEARN(3),
      title: 'and, or: combine tests',
      body: 'and is True only when both sides are True. or is True when at least one side is. == compares; = stores.',
      lang: 'python',
      code: ['age = 15', 'has_ticket = True', 'print(age >= 18 and has_ticket)'],
      anim: 'types',
      check: { prompt: 'What does the code above print?', options: ['False', 'True', '15', 'An error'], answer: 0, hint: 'and needs both sides to be True. Is 15 >= 18?', why: 'age >= 18 is False, so the whole and is False.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Free tea over ₹200',
      instructions: 'Tap a highlighted value to change it, then run. Make the program print each target.',
      lang: 'python',
      file: 'offer.py',
      starter: 'bill = 180\nif bill >= 200:\n    print("Free tea!")\nelse:\n    print("Add", 200 - bill, "more")',
      ideas: ['Make it print Free tea!', 'Make it print Add 10 more'],
      goals: [
        { label: 'Make it print Free tea!', output: 'Free tea!' },
        { label: 'Make it print Add 10 more', output: 'Add 10 more' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Hot or iced?',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['temp = 34', 'if temp > 30:', '    drink = "iced tea"', 'else:', '    drink = "hot tea"', 'print("Today:", drink)'],
      stops: [
        { line: 3, prompt: 'temp is 34, so line 3 runs next. What will drink be?', options: ["'iced tea'", "'hot tea'", 'nothing', "'34'"], answer: 0, hint: 'Is 34 more than 30?', why: '34 > 30 is True, so drink becomes \'iced tea\' and the else branch is skipped.', mono: true, check: { var: 'drink' } },
        { line: 6, prompt: 'What will the last line print?', options: ['Today: iced tea', 'Today: hot tea', 'Today: drink', 'Today: iced tea hot tea'], answer: 0, hint: 'Only one branch ran.', why: 'Only the if branch ran, so drink is iced tea.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'A ₹700 order paid for delivery',
      instructions: 'Bills over ₹500 should travel free. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['bill = 700', 'if bill > 200:', '    print("₹20 delivery")', 'elif bill > 500:', '    print("Free delivery")'],
      error: '₹20 delivery',
      bug: 1,
      fix: 'if bill > 200 and bill <= 500:',
      explain: '700 > 200 is True, so the first branch ran and the free-delivery test was never reached. Limit the first test to bills up to 500.',
    }),
    group({
      kicker: 'SORT',
      title: 'True or False?',
      instructions: 'Tap the group for each comparison.',
      groups: ['True', 'False'],
      items: [
        { text: '5 > 3', group: 0 },
        { text: '2 == "2"', group: 1 },
        { text: '10 <= 10', group: 0 },
        { text: '"a" == "A"', group: 1 },
        { text: '3 != 4', group: 0 },
        { text: '7 > 7', group: 1 },
      ],
      mono: true,
      explain: 'A number is never equal to text, capitals matter, and 7 is not more than 7 (but 10 <= 10 is True).',
    }),
    quiz({
      prompt: 'Fill the gap so it prints zero when x is 0:   if x __ 0:',
      options: ['==', '=', '=>', 'is equal'],
      right: '== compares. A single = stores a value and is a SyntaxError inside an if.',
      wrong: 'You want to compare, not store.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Make the program print Pass.',
      lang: 'python',
      lines: ['marks = 72', 'if marks >= 40:', '    print("Pass")', 'else:', '    print("Try again")'],
      output: ['Pass'],
      explain: 'The value first, then if with its indented line, then else with its own.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['x = 5', 'if x > 3 and x < 10:', '    print("in range")', 'else:', '    print("out")'],
      options: ['in range', 'out', 'in range out', 'Nothing'],
      right: '5 > 3 and 5 < 10 are both True, so the if branch runs.',
      wrong: 'Check both sides of and.',
      mono: true,
    }),
    buildFee,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What is the difference between = and ==?', a: '= stores a value. == compares two values and gives True or False.' },
        { q: 'In if / elif / else, how many branches run?', a: 'Only one: the first whose test is True (or else, if none are).' },
        { q: 'and or or: which needs both sides True?', a: 'and. or needs only one side to be True.' },
      ],
    }),
  ], [doc('if Statements', 'tutorial/controlflow.html#if-statements')]),

  // 5 ─────────────────────────────────────────────
  v4('p-loop-1', 'Repeat with for and range()', ['Repeat lines with for', 'Count with range()', 'Add up a running total'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'What do you think this prints?',
      lang: 'python',
      code: ['for i in range(3):', '    print("Tea!")'],
      options: ['Tea! three times', 'Tea! once', 'Tea! four times', 'An error'],
      right: 'range(3) gives 0, 1 and 2: three rounds, so Tea! prints three times. Today you learn loops.',
      wrong: 'Just a guess is fine. Hint: range(3) gives three values.',
    }),
    read({
      kicker: LEARN(1),
      title: 'range() counts for you',
      body: 'range(1, 4) gives 1, 2 and 3. It starts at the first number and stops just before the second.',
      lang: 'python',
      code: ['for i in range(1, 4):', '    print(i)'],
      anim: 'loop',
      check: { prompt: 'What numbers does range(2, 6) give?', options: ['2, 3, 4, 5', '2, 3, 4, 5, 6', '3, 4, 5', '2 and 6'], answer: 0, hint: 'It stops just before the second number.', why: 'It starts at 2 and stops before 6: 2, 3, 4, 5.' },
    }),
    read({
      kicker: LEARN(2),
      title: 'The loop variable changes each round',
      body: 'for takes the next value each round and runs the indented lines with it. It works on text too: one letter per round.',
      lang: 'python',
      code: ['for c in "tea":', '    print(c)'],
      anim: 'loop',
      check: { prompt: 'What does the code above print?', options: ['t, e and a, one per line', 'tea', 'c c c', 'tea three times'], answer: 0, hint: 'Each round, c is the next letter.', why: 'c is t, then e, then a: one letter per line.' },
    }),
    read({
      kicker: LEARN(3),
      title: 'A running total',
      body: 'Start a total at 0 before the loop, add to it inside the loop, and print it after the loop has finished.',
      lang: 'python',
      code: ['total = 0', 'for day in range(3):', '    total = total + 10', 'print(total)'],
      anim: 'loop',
      check: { prompt: 'total = 0, then add 5 four times with for i in range(4). What is total?', options: ['20', '5', '25', '0'], answer: 0, hint: 'range(4) runs four rounds.', why: 'Four rounds of + 5: 5, 10, 15, 20.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'A times table',
      instructions: 'Tap the highlighted number to change it, then run. The last line must match each target.',
      lang: 'python',
      file: 'table.py',
      starter: 'cups = 6\nfor n in range(1, 4):\n    print(n, "x", cups, "=", n * cups)',
      ideas: ['Make the last line 3 x 7 = 21', 'Make the last line 3 x 12 = 36'],
      goals: [
        { label: 'Last line: 3 x 7 = 21', output: '3 x 7 = 21' },
        { label: 'Last line: 3 x 12 = 36', output: '3 x 12 = 36' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Adding up the prices',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['total = 0', 'for price in range(10, 31, 10):', '    total = total + price', 'print(total)'],
      stops: [
        { line: 3, prompt: 'First round: price is 10. What will total be after line 3?', options: ['10', '0', '20', '60'], answer: 0, hint: 'total starts at 0 and price is 10.', why: '0 + 10 = 10.', mono: true, check: { var: 'total' } },
        { line: 4, prompt: 'The loop is done. What will it print?', options: ['60', '30', '40', '10'], answer: 0, hint: 'range(10, 31, 10) gives 10, 20 and 30.', why: '10 + 20 + 30 = 60.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'Day 5 is missing',
      instructions: 'Riya wants a line for each day, 1 to 5. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['for day in range(1, 5):', '    print("Day", day)'],
      error: 'Day 1\nDay 2\nDay 3\nDay 4',
      bug: 0,
      fix: 'for day in range(1, 6):',
      explain: 'range stops just before its second number, so range(1, 5) ends at 4. Use range(1, 6) to reach 5.',
    }),
    group({
      kicker: 'SORT',
      title: 'Does it include 5?',
      instructions: 'Tap the group for each range.',
      groups: ['Includes 5', 'No 5'],
      items: [
        { text: 'range(5)', group: 1 },
        { text: 'range(1, 5)', group: 1 },
        { text: 'range(1, 6)', group: 0 },
        { text: 'range(5, 10)', group: 0 },
        { text: 'range(0, 6, 5)', group: 0 },
        { text: 'range(4)', group: 1 },
      ],
      mono: true,
      explain: 'A range stops before its end: range(5) is 0 to 4. range(0, 6, 5) jumps by 5: 0 and 5.',
    }),
    quiz({
      prompt: 'Fill the gap to repeat 3 times:   for i in ____(3):',
      options: ['range', 'repeat', 'loop', 'times'],
      right: 'range(3) gives three values, so the loop runs three times.',
      wrong: 'It is the counting word from this lesson.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Add 1, 2 and 3 and print 6.',
      lang: 'python',
      lines: ['total = 0', 'for n in range(1, 4):', '    total = total + n', 'print(total)'],
      output: ['6'],
      explain: 'Start at 0, add inside the loop, print once after it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['for i in range(2, 8, 2):', '    print(i)'],
      options: ['2, 4 and 6', '2, 4, 6 and 8', '2 to 7', '8'],
      right: 'The third number is the step: 2, 4, 6, and it stops before 8.',
      wrong: 'The third number is how far each step jumps.',
    }),
    buildSum,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What does range(1, 4) give?', a: '1, 2 and 3. It stops just before 4.' },
        { q: 'Where does print(total) go for a running total?', a: 'After the loop, not indented, so it prints once at the end.' },
        { q: 'What is the loop variable?', a: 'The name after for. It takes the next value each round.' },
      ],
    }),
  ], [doc('for Statements', 'tutorial/controlflow.html#for-statements'), doc('The range() Function', 'tutorial/controlflow.html#the-range-function')]),

  // 6 ─────────────────────────────────────────────
  v4('p-while-1', 'while loops', ['Repeat while a condition is True', 'Change something inside so the loop can end', 'Leave a loop early with break'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya has 3 cups left. What do you think this prints?',
      lang: 'python',
      code: ['cups = 3', 'while cups > 0:', '    print(cups)', '    cups = cups - 1'],
      options: ['3, 2 and 1', '3', '3, 2, 1 and 0', 'It never stops'],
      right: 'It prints 3, takes one away, and repeats while cups > 0: 3, 2, 1. Today you learn while.',
      wrong: 'Just a guess is fine. Hint: it stops once cups is 0.',
    }),
    read({
      kicker: LEARN(1),
      title: 'while repeats while it’s True',
      body: 'while checks its condition before every round. As long as it is True, the indented lines run again.',
      lang: 'python',
      code: ['n = 1', 'while n < 4:', '    n = n + 1', 'print(n)'],
      anim: 'whileLoop',
      check: { prompt: 'What does the code above print?', options: ['4', '3', '1', 'It never stops'], answer: 0, hint: 'It stops when n < 4 is no longer True.', why: 'n goes 1, 2, 3, 4. At 4, n < 4 is False, so the loop ends and 4 prints.', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'Something must change',
      body: 'Inside the loop, change something the condition checks. If nothing changes, the condition stays True and the loop never ends.',
      lang: 'python',
      code: ['money = 30', 'while money >= 12:', '    money = money - 12', 'print(money)'],
      anim: 'whileLoop',
      check: { prompt: 'Which loop never stops?', options: ['x = 5, while x > 0: print(x)', 'x = 5, while x > 0: x = x - 1', 'x = 0, while x < 3: x = x + 1', 'x = 5, while x > 9: print(x)'], answer: 0, hint: 'Look for the loop where x never changes.', why: 'In the first one x stays 5, so x > 0 is always True.' },
    }),
    read({
      kicker: LEARN(3),
      title: 'break leaves early',
      body: 'break stops the loop at once, even if its condition is still True. It is handy for “stop when you find it”.',
      lang: 'python',
      code: ['for n in [3, 8, 5, 12]:', '    if n > 6:', '        print("First big one:", n)', '        break'],
      anim: 'whileLoop',
      check: { prompt: 'What does the code above print?', options: ['First big one: 8', 'First big one: 12', 'First big one: 8 and First big one: 12', 'Nothing'], answer: 0, hint: 'break stops at the first match.', why: '8 is the first number over 6; break stops the loop before 12.' },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'How many cups can you buy?',
      instructions: 'Tea is ₹12. Tap how much money there is, then run.',
      lang: 'python',
      file: 'cups.py',
      starter: 'money = 50\ncups = 0\nwhile money >= 12:\n    money = money - 12\n    cups = cups + 1\nprint(cups, "cups")',
      ideas: ['Make it print 8 cups', 'Make it print 5 cups'],
      goals: [
        { label: 'Make it print 8 cups', output: '8 cups' },
        { label: 'Make it print 5 cups', output: '5 cups' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Emptying the tank',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['tank = 10', 'while tank > 4:', '    tank = tank - 3', 'print(tank)'],
      stops: [
        { line: 3, prompt: 'First round. What will tank be after line 3?', options: ['7', '10', '3', '4'], answer: 0, hint: 'It takes 3 away from 10.', why: '10 - 3 = 7.', mono: true, check: { var: 'tank' } },
        { line: 4, prompt: 'The loop has ended. What will it print?', options: ['4', '1', '7', '-2'], answer: 0, hint: 'It stops as soon as tank > 4 is False.', why: '10 → 7 → 4. 4 > 4 is False, so the loop stops at 4.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The countdown skipped 1',
      instructions: 'It should print 3, 2, 1, then Go!. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['n = 3', 'while n > 1:', '    print(n)', '    n = n - 1', 'print("Go!")'],
      error: '3\n2\nGo!',
      bug: 1,
      fix: 'while n > 0:',
      explain: 'When n is 1, n > 1 is False, so the loop stops before printing 1. while n > 0 keeps going down to 1.',
    }),
    group({
      kicker: 'SORT',
      title: 'Does it stop?',
      instructions: 'Tap the group for each loop.',
      groups: ['Stops', 'Never stops'],
      items: [
        { text: 'n = 5; while n > 0: n = n - 1', group: 0 },
        { text: 'n = 5; while n > 0: n = n + 1', group: 1 },
        { text: 'while False: print(1)', group: 0 },
        { text: 'while True: print(1)', group: 1 },
        { text: 'for i in range(10): print(i)', group: 0 },
        { text: 'n = 0; while n < 3: print(n)', group: 1 },
      ],
      mono: true,
      explain: 'A while stops only if something inside changes its condition. A for over a range always ends.',
    }),
    quiz({
      prompt: 'Which word leaves a loop straight away?',
      options: ['break', 'stop', 'exit', 'end'],
      right: 'break ends the loop at once.',
      wrong: 'It is the word from the third card.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Make the countdown print 3, 2, 1 and Go!.',
      lang: 'python',
      lines: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'],
      output: ['3', '2', '1', 'Go!'],
      explain: 'Print, then count down inside the loop; Go! once after it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['n = 10', 'while n > 1:', '    n = n // 2', 'print(n)'],
      options: ['1', '0', '2', '5'],
      right: '10 → 5 → 2 → 1. Then n > 1 is False, so it prints 1.',
      wrong: '// halves and drops the decimal each round.',
      mono: true,
    }),
    buildCountdown,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'When does a while loop stop?', a: 'When its condition is False the next time it is checked.' },
        { q: 'Why must something change inside a while loop?', a: 'Otherwise the condition stays True and the loop never ends.' },
        { q: 'What does break do?', a: 'It leaves the loop at once.' },
      ],
    }),
  ], [doc('while loops', 'reference/compound_stmts.html#the-while-statement'), doc('break and continue', 'tutorial/controlflow.html#break-and-continue-statements')]),

  // 7 ─────────────────────────────────────────────
  v4('p-loop-2', 'Lists', ['Keep values in order; positions start at 0', 'Add with append() and replace with list[i] = x', 'Visit every item with for item in list'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya keeps her menu in a list. What do you think this prints?',
      lang: 'python',
      code: ['menu = ["tea", "coffee", "milk"]', 'print(menu[1])'],
      options: ['coffee', 'tea', 'milk', 'An error'],
      right: 'Positions start at 0, so menu[1] is the second item: coffee. Today you learn lists.',
      wrong: 'Just a guess is fine. Hint: counting starts at 0.',
    }),
    read({
      kicker: LEARN(1),
      title: 'A list keeps things in order',
      body: 'A list holds many values in square brackets. Each has a position, and the first position is 0.',
      lang: 'python',
      code: ['menu = ["tea", "coffee", "milk"]', 'print(menu[0])', 'print(len(menu))'],
      anim: 'list',
      check: { prompt: 'For the menu above, what is menu[0]?', options: ['"tea"', '"coffee"', '"milk"', 'An error'], answer: 0, hint: 'The first item is at position 0.', why: 'Position 0 is the first item: "tea".', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'Add and replace',
      body: 'append() adds an item at the end. list[i] = x replaces the item at position i. len() counts the items.',
      lang: 'python',
      code: ['menu = ["tea", "coffee"]', 'menu.append("milk")', 'menu[0] = "lemon tea"', 'print(menu)'],
      anim: 'list',
      check: { prompt: 'menu = ["tea", "coffee"], then menu.append("milk"). What is len(menu)?', options: ['3', '2', '4', '1'], answer: 0, hint: 'append adds one item.', why: 'Two items plus one appended makes 3.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'Visit every item',
      body: 'for item in list runs once for each item, in order. It works for any length of list.',
      lang: 'python',
      code: ['total = 0', 'for p in [12, 20, 15]:', '    total = total + p', 'print(total)'],
      anim: 'list',
      check: { prompt: 'What does the code above print?', options: ['47', '15', '12', '3'], answer: 0, hint: 'It adds every price.', why: '12 + 20 + 15 = 47.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Change a price',
      instructions: 'Tap the highlighted price to change it, then run.',
      lang: 'python',
      file: 'prices.py',
      starter: 'prices = [12, 15, 20]\nprint(sum(prices))',
      ideas: ['Make the total 62', 'Make the total 57'],
      goals: [
        { label: 'Make the total 62', output: '62' },
        { label: 'Make the total 57', output: '57' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Orders coming in',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['orders = ["tea"]', 'orders.append("coffee")', 'orders[0] = "milk"', 'print(orders)'],
      stops: [
        { line: 2, prompt: 'Line 2 runs next. What will orders be?', options: ["['tea', 'coffee']", "['coffee', 'tea']", "['coffee']", "['tea']"], answer: 0, hint: 'append adds to the end.', why: 'append puts "coffee" after "tea".', mono: true, check: { var: 'orders' } },
        { line: 4, prompt: 'What will it print?', options: ["['milk', 'coffee']", "['tea', 'coffee']", "['milk']", "['tea', 'milk']"], answer: 0, hint: 'orders[0] = "milk" replaced the first item.', why: 'Position 0 changed from tea to milk; coffee stayed.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The last item crashed',
      instructions: 'Riya wanted the last item on the menu. Read the error, then tap the line that caused it.',
      lang: 'python',
      lines: ['menu = ["tea", "coffee", "milk"]', 'print(menu[3])'],
      error: 'IndexError: list index out of range',
      bug: 1,
      fix: 'print(menu[2])',
      explain: 'Three items sit at positions 0, 1 and 2. There is no position 3. menu[2] (or menu[-1]) is the last one.',
    }),
    group({
      kicker: 'SORT',
      title: 'Works or crashes?',
      instructions: 'menu = ["tea", "coffee", "milk"]. Tap the group for each.',
      groups: ['Works', 'IndexError'],
      items: [
        { text: 'menu[0]', group: 0 },
        { text: 'menu[2]', group: 0 },
        { text: 'menu[3]', group: 1 },
        { text: 'menu[-1]', group: 0 },
        { text: 'menu[1]', group: 0 },
        { text: 'menu[5]', group: 1 },
      ],
      mono: true,
      explain: 'A 3-item list has positions 0, 1 and 2. -1 counts from the end, so it is the last item.',
    }),
    quiz({
      prompt: 'Fill the gap to add "juice" at the end:   menu.____("juice")',
      options: ['append', 'add', 'push', 'insert'],
      right: 'append adds one item at the end of a list.',
      wrong: 'It is the word from the second card.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Make the program print [\'tea\', \'milk\'].',
      lang: 'python',
      lines: ['menu = ["tea"]', 'menu.append("milk")', 'print(menu)'],
      output: ["['tea', 'milk']"],
      explain: 'Make the list, add to it, then print it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['cart = ["tea", "tea", "milk"]', 'print(len(cart), cart[-1])'],
      options: ['3 milk', '2 milk', '3 tea', '2 tea'],
      right: 'len counts 3 items, and [-1] is the last one: milk.',
      wrong: 'len counts every item, even repeats.',
      mono: true,
    }),
    buildListTotal,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'What position is the first item in a list?', a: '0. The second is 1, and -1 is the last.' },
        { q: 'append() or list[i] = x?', a: 'append adds at the end; list[i] = x replaces the item at position i.' },
        { q: 'How do you visit every item?', a: 'for item in my_list: then use item inside the loop.' },
      ],
    }),
  ], [doc('Lists', 'tutorial/introduction.html#lists'), doc('More on Lists', 'tutorial/datastructures.html#more-on-lists')]),

  // 8 ─────────────────────────────────────────────
  v4('p-dict-1', 'Dictionaries', ['Look up a value by its key', 'Add or change with d[key] = value', 'Use in or get() for keys that might be missing'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya keeps prices by name. What do you think this prints?',
      lang: 'python',
      code: ['price = {"tea": 12, "coffee": 20}', 'print(price["coffee"])'],
      options: ['20', '12', 'coffee', 'An error'],
      right: 'A dictionary looks up a value by its key: "coffee" gives 20. Today you learn dictionaries.',
      wrong: 'Just a guess is fine. Hint: look for "coffee" in the brackets.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Keys and values',
      body: 'A dictionary maps keys to values, inside curly brackets. You look a value up by its key, not by a position.',
      lang: 'python',
      code: ['price = {"tea": 12, "coffee": 20}', 'print(price["tea"])'],
      anim: 'dict',
      check: { prompt: 'For the dictionary above, what is price["tea"]?', options: ['12', '20', '"tea"', 'An error'], answer: 0, hint: 'Find the value next to the key "tea".', why: 'The key "tea" maps to 12.', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'Add or change an entry',
      body: 'd[key] = value adds the key if it is new, or changes its value if it is already there.',
      lang: 'python',
      code: ['price = {"tea": 12}', 'price["milk"] = 15', 'price["tea"] = 14', 'print(len(price), price["tea"])'],
      anim: 'dict',
      check: { prompt: 'What does the code above print?', options: ['2 14', '3 14', '2 12', '3 12'], answer: 0, hint: 'milk is new; tea was already there.', why: 'milk adds a second key; tea’s value changes to 14. Two keys, tea = 14.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'in and get() for missing keys',
      body: 'A missing key crashes with KeyError. Check first with in, or use get(key, default), which gives the default instead.',
      lang: 'python',
      code: ['price = {"tea": 12}', 'print("milk" in price)', 'print(price.get("milk", 0))'],
      anim: 'dict',
      check: { prompt: 'price = {"tea": 12}. What is price.get("milk", 0)?', options: ['0', 'An error', 'None', '12'], answer: 0, hint: 'get gives the default when the key is missing.', why: 'milk is not a key, so get gives the default: 0.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Three cups of tea',
      instructions: 'Tap a highlighted number to change it, then run.',
      lang: 'python',
      file: 'prices.py',
      starter: 'price = {"tea": 12, "coffee": 20}\nprint(price["tea"] * 3)',
      ideas: ['Make it print 72', 'Make it print 48'],
      goals: [
        { label: 'Make it print 72', output: '72' },
        { label: 'Make it print 48', output: '48' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Keeping stock',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['stock = {"tea": 5}', 'stock["tea"] = stock["tea"] - 2', 'stock["milk"] = 4', 'print(stock)'],
      stops: [
        { line: 2, prompt: 'Line 2 runs next. What will stock be?', options: ["{'tea': 3}", "{'tea': 5}", "{'tea': 2}", "{'tea': -2}"], answer: 0, hint: 'It takes 2 away from the 5 teas.', why: '5 - 2 = 3, stored back under "tea".', mono: true, check: { var: 'stock' } },
        { line: 4, prompt: 'What will it print?', options: ["{'tea': 3, 'milk': 4}", "{'milk': 4}", "{'tea': 3}", "{'tea': 5, 'milk': 4}"], answer: 0, hint: 'milk is a new key; tea keeps its value.', why: 'milk was added, and tea is still 3.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The price lookup crashed',
      instructions: 'Read the error, then tap the line that caused it.',
      lang: 'python',
      lines: ['price = {"tea": 12, "coffee": 20}', 'print(price["Tea"])'],
      error: "KeyError: 'Tea'",
      bug: 1,
      fix: 'print(price["tea"])',
      explain: 'Keys care about capital letters: "Tea" is not "tea". Use the key exactly as it was stored.',
    }),
    group({
      kicker: 'SORT',
      title: 'Key or value?',
      instructions: 'price = {"tea": 12, "coffee": 20}. Tap the group for each.',
      groups: ['Key', 'Value'],
      items: [
        { text: '"tea"', group: 0 },
        { text: '12', group: 1 },
        { text: '"coffee"', group: 0 },
        { text: '20', group: 1 },
      ],
      mono: true,
      explain: 'Keys come before the colon and are what you look up; values come after it.',
    }),
    quiz({
      prompt: 'Fill the gap to check for a key:   if "milk" __ price:',
      options: ['in', 'has', '==', 'of'],
      right: '"milk" in price is True when "milk" is one of the keys.',
      wrong: 'It is a two-letter word from the third card.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Sell one tea and print how many are left: 4.',
      lang: 'python',
      lines: ['stock = {"tea": 5}', 'stock["tea"] = stock["tea"] - 1', 'print(stock["tea"])'],
      output: ['4'],
      explain: 'Make the dictionary, change the value, then print it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['d = {"a": 1}', 'd["a"] = d["a"] + 5', 'print(d["a"])'],
      options: ['6', '1', '5', "{'a': 6}"],
      right: 'd["a"] + 5 is 1 + 5 = 6, stored back under "a".',
      wrong: 'Work out the right side first, using the value now in d["a"].',
      mono: true,
    }),
    buildCounts,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'How do you look up a value?', a: 'By its key in square brackets: price["tea"].' },
        { q: 'What does d[key] = value do?', a: 'Adds the key if it is new, or changes its value if it exists.' },
        { q: 'How do you avoid a KeyError?', a: 'Check with key in d, or use d.get(key, default).' },
      ],
    }),
  ], [doc('Dictionaries', 'tutorial/datastructures.html#dictionaries')]),

  // 9 ─────────────────────────────────────────────
  v4('p-fn-1', 'Functions', ['Define a function with def', 'Call it with your values', 'Give back an answer with return'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya’s app greets each customer with a function. What do you think this prints?',
      lang: 'python',
      code: ['def greet(name):', '    return "Hi " + name', 'print(greet("Riya"))'],
      options: ['Hi Riya', 'Hi name', 'greet', 'Nothing'],
      right: 'greet("Riya") runs the function with name = "Riya" and gives back "Hi Riya". Today you learn functions.',
      wrong: 'Just a guess is fine. Hint: name becomes "Riya" when greet is called.',
    }),
    read({
      kicker: LEARN(1),
      title: 'def names a piece of work',
      body: 'def makes a function. Its indented body runs only when you call it by name, and it can be called many times.',
      lang: 'python',
      code: ['def hello():', '    print("Hello!")', 'hello()', 'hello()'],
      anim: 'function',
      check: { prompt: 'In the code above, how many times does the body run?', options: ['2', '1', '3', '0'], answer: 0, hint: 'Count the calls: hello().', why: 'The function is called twice, so its body runs twice.' },
    }),
    read({
      kicker: LEARN(2),
      title: 'Parameters take your values',
      body: 'Names in the brackets are parameters. When you call the function, your values go into them.',
      lang: 'python',
      code: ['def bill(cups):', '    return cups * 12', 'print(bill(3))'],
      anim: 'function',
      check: { prompt: 'What does the code above print?', options: ['36', '12', '3', 'cups * 12'], answer: 0, hint: 'cups becomes 3 for this call.', why: 'cups is 3, so it returns 3 * 12 = 36.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'return gives an answer back',
      body: 'print only shows something. return hands a value back to the line that called the function, so it can be stored.',
      lang: 'python',
      code: ['def show():', '    print("tea")', 'x = show()', 'print(x)'],
      anim: 'function',
      check: { prompt: 'In the code above, what is x?', options: ['None', '"tea"', 'tea', 'An error'], answer: 0, hint: 'Does show() return anything?', why: 'show() prints but returns nothing, so x is None.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'A bill function',
      instructions: 'Tap a highlighted number to change it, then run.',
      lang: 'python',
      file: 'bill.py',
      starter: 'def bill(cups, price):\n    return cups * price\ncups = 3\nprice = 12\nprint(bill(cups, price))',
      ideas: ['Make it print 48', 'Make it print 72'],
      goals: [
        { label: 'Make it print 48', output: '48' },
        { label: 'Make it print 72', output: '72' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Inside the function',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['def bill(cups):', '    total = cups * 12', '    return total', 'amount = bill(3)', 'print(amount)'],
      stops: [
        { line: 2, prompt: 'We are inside bill(3). What will total be?', options: ['36', '12', '3', 'cups * 12'], answer: 0, hint: 'cups is 3 here.', why: '3 * 12 = 36.', mono: true, check: { var: 'total' } },
        { line: 5, prompt: 'What will it print?', options: ['36', 'None', 'total', '3'], answer: 0, hint: 'return gave total back to amount.', why: 'bill(3) returned 36, which was stored in amount.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The bill came back as None',
      instructions: 'Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['def bill(cups):', '    total = cups * 12', 'amount = bill(3)', 'print(amount)'],
      error: 'None',
      bug: 1,
      fix: '    return cups * 12',
      explain: 'The function worked out the total but never returned it, so the call gave back None. return hands the answer back.',
    }),
    group({
      kicker: 'SORT',
      title: 'Shows it or gives it back?',
      instructions: 'Tap the group for each line.',
      groups: ['Shows it (print)', 'Gives it back (return)'],
      items: [
        { text: 'print("Hi")', group: 0 },
        { text: 'return total', group: 1 },
        { text: 'print(bill(3))', group: 0 },
        { text: 'return a + b', group: 1 },
        { text: 'print(f"{x}")', group: 0 },
        { text: 'return "Hi " + name', group: 1 },
      ],
      mono: true,
      explain: 'print puts something on the screen. return hands a value back to the caller, who can store or print it.',
    }),
    quiz({
      prompt: 'Fill the gap to define a function:   ____ add(a, b):',
      options: ['def', 'function', 'fun', 'define'],
      right: 'def starts a function definition in Python.',
      wrong: 'It is a three-letter word from the first card.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Make the program print 16.',
      lang: 'python',
      lines: ['def square(n):', '    return n * n', 'print(square(4))'],
      output: ['16'],
      explain: 'Define the function first, with its body indented, then call it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['def double(n):', '    return n * 2', 'print(double(double(3)))'],
      options: ['12', '6', '9', '3'],
      right: 'double(3) is 6, and double(6) is 12.',
      wrong: 'Work from the inside out.',
      mono: true,
    }),
    buildDiscount,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'When does a function’s body run?', a: 'Only when the function is called, like bill(3).' },
        { q: 'What is a parameter?', a: 'A name in the brackets that takes the value you pass in.' },
        { q: 'return or print?', a: 'return gives the answer back to the caller; print only shows it.' },
      ],
    }),
  ], [doc('Defining Functions', 'tutorial/controlflow.html#defining-functions')]),

  // 10 ────────────────────────────────────────────
  v4('p-err-1', 'Handling errors', ['Read the last line of an error first', 'Keep running with try / except', 'Catch the specific error you expect'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'A customer typed abc where a number should go. What do you think happens?',
      lang: 'python',
      code: ['print(int("abc"))'],
      options: ['It crashes with a ValueError', 'It prints 0', 'It prints abc', 'Nothing happens'],
      right: 'int() can’t read abc, so Python stops with ValueError. Today you learn to read errors and stay running.',
      wrong: 'Just a guess is fine. Hint: abc is not a number.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Read the last line first',
      body: 'An error message ends with its name and the reason, like ValueError: invalid literal. Start reading from that last line.',
      lang: 'python',
      code: ['print(int("abc"))', "# ValueError: invalid literal for int() with base 10: 'abc'"],
      anim: 'error',
      check: { prompt: 'Which error does print(10 / 0) give?', options: ['ZeroDivisionError', 'ValueError', 'TypeError', 'No error: it prints 0'], answer: 0, hint: 'You can’t divide by zero.', why: 'Dividing by zero gives ZeroDivisionError: division by zero.', mono: true },
    }),
    read({
      kicker: LEARN(2),
      title: 'try / except keeps going',
      body: 'Put the risky line inside try. If it fails, Python jumps to except instead of crashing, and carries on after it.',
      lang: 'python',
      code: ['try:', '    n = int("x")', 'except ValueError:', '    print("Numbers only")'],
      anim: 'error',
      check: { prompt: 'What does the code above print?', options: ['Numbers only', 'x', 'ValueError', 'Nothing'], answer: 0, hint: 'int("x") fails inside try.', why: 'int("x") fails, so the except branch runs: Numbers only.', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'Catch the error you expect',
      body: 'Name the error in except. Then other, unexpected mistakes still show up, so they can be found and fixed.',
      lang: 'python',
      code: ['try:', '    cups = int("12a")', 'except ValueError:', '    cups = 0', 'print(cups)'],
      anim: 'error',
      check: { prompt: 'int("x") fails. Which line catches it?', options: ['except ValueError:', 'except ZeroDivisionError:', 'except KeyError:', 'except IndexError:'], answer: 0, hint: 'Which error does int() give for bad text?', why: 'int() of bad text raises ValueError, so except ValueError catches it.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Split the bill',
      instructions: 'Tap a highlighted number to change it, then run.',
      lang: 'python',
      file: 'split.py',
      starter: 'total = 1200\npeople = 3\ntry:\n    print(total // people)\nexcept ZeroDivisionError:\n    print("Add people first")',
      ideas: ['Make each share 300', 'Make each share 200'],
      goals: [
        { label: 'Make it print 300', output: '300' },
        { label: 'Make it print 200', output: '200' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'When int() fails',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['text = "abc"', 'try:', '    n = int(text)', '    print("Number", n)', 'except ValueError:', '    print("Not a number")', 'print("Done")'],
      stops: [
        { line: 6, prompt: 'Line 3 failed, so line 4 was skipped. What will line 6 print?', options: ['Not a number', 'Number abc', 'ValueError', 'Done'], answer: 0, hint: 'Which branch runs after a ValueError?', why: 'The ValueError jumps straight to except, which prints Not a number.', mono: true, check: { out: true } },
        { line: 7, prompt: 'Does the program carry on? What prints next?', options: ['Done', 'Nothing: it crashed', 'Not a number again', 'Number abc'], answer: 0, hint: 'except handled the error.', why: 'The error was handled, so the program carries on and prints Done.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'It still crashed',
      instructions: 'There is a try / except, but the program still stopped. Read the error, then tap the line that caused it.',
      lang: 'python',
      lines: ['try:', '    print(10 / 0)', 'except ValueError:', '    print("Oops")'],
      error: 'ZeroDivisionError: division by zero',
      bug: 2,
      fix: 'except ZeroDivisionError:',
      explain: 'except ValueError only catches ValueError. Dividing by zero raises ZeroDivisionError, so name that one.',
    }),
    match({
      kicker: 'MATCH',
      title: 'Which error?',
      instructions: 'Tap a line of code, then the error it gives.',
      pairs: [
        ['int("x")', 'ValueError'],
        ['5 / 0', 'ZeroDivisionError'],
        ['[1][5]', 'IndexError'],
        ['{"a": 1}["b"]', 'KeyError'],
        ['"a" + 1', 'TypeError'],
      ],
      mono: true,
      explain: 'The name says what went wrong: bad value, divide by zero, no such position, no such key, wrong types together.',
    }),
    quiz({
      prompt: 'Which word goes before the risky lines?',
      options: ['try', 'test', 'catch', 'attempt'],
      right: 'try: starts the block that might fail; except: handles the failure.',
      wrong: 'It is the first word of try / except.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Read 12 safely and print it.',
      lang: 'python',
      lines: ['try:', '    x = int("12")', 'except ValueError:', '    x = 0', 'print(x)'],
      output: ['12'],
      explain: 'try with the risky line, except with the backup, then carry on.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['try:', '    print("A")', '    x = 1 / 0', '    print("B")', 'except ZeroDivisionError:', '    print("C")'],
      options: ['A then C', 'A, B then C', 'C', 'A then B'],
      right: 'A prints, then 1 / 0 fails, so B is skipped and except prints C.',
      wrong: 'After the error, the rest of the try block is skipped.',
    }),
    buildSafe,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'Which line of an error do you read first?', a: 'The last one: the error’s name and the reason.' },
        { q: 'What does except do?', a: 'Runs when the try block fails with that error, instead of crashing.' },
        { q: 'Why name the error in except?', a: 'So only the expected error is handled; other bugs still show up.' },
      ],
    }),
  ], [doc('Errors and Exceptions', 'tutorial/errors.html')]),

  // 11 ────────────────────────────────────────────
  v4('p-file-1', 'Files', ['Write with "w", add with "a", read with "r"', 'Let with close the file for you', 'Read a file line by line'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya saves her menu to a file, then reads it back. What do you think it prints?',
      lang: 'python',
      code: ['with open("menu.txt", "w") as f:', '    f.write("tea\\n")', 'print(open("menu.txt").read().strip())'],
      options: ['tea', 'menu.txt', 'Nothing', 'An error'],
      right: 'The first part writes tea into menu.txt; the last line reads it back. Today you learn files.',
      wrong: 'Just a guess is fine. Hint: it writes, then reads the same file.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Open a file to write',
      body: 'open(name, "w") opens a file for writing. If the file exists, "w" empties it first. "a" adds to the end instead.',
      lang: 'python',
      code: ['with open("sales.txt", "w") as f:', '    f.write("40 cups\\n")'],
      anim: 'file',
      check: { prompt: 'sales.txt already has text. What does open("sales.txt", "w") do to it?', options: ['Empties it first', 'Adds to the end', 'Keeps it and reads it', 'Crashes'], answer: 0, hint: '"w" means write from empty.', why: '"w" starts the file empty. Use "a" to keep the old text and add to it.' },
    }),
    read({
      kicker: LEARN(2),
      title: 'with closes it for you',
      body: 'with open(...) as f: gives you the file as f and closes it when the block ends, even if an error happens.',
      lang: 'python',
      code: ['with open("sales.txt", "w") as f:', '    f.write("40 cups\\n")', 'with open("sales.txt") as f:', '    print(f.read().strip())'],
      anim: 'file',
      check: { prompt: 'When does with close the file?', options: ['When its indented block ends', 'Never: you must close it', 'When the program ends', 'After every line'], answer: 0, hint: 'Think of the indented block.', why: 'The file is closed as soon as the with block ends.' },
    }),
    read({
      kicker: LEARN(3),
      title: 'Read line by line',
      body: 'for line in f reads one line at a time. Each line ends with a newline, so strip() removes it before printing.',
      lang: 'python',
      code: ['with open("menu.txt", "w") as f:', '    f.write("tea\\ncoffee\\n")', 'with open("menu.txt") as f:', '    for line in f:', '        print(line.strip())'],
      anim: 'file',
      check: { prompt: 'Why use line.strip() when printing lines?', options: ['To remove the newline at the end', 'To make it upper case', 'To skip empty files', 'To close the file'], answer: 0, hint: 'Each line ends with \\n.', why: 'Without strip(), print adds its own newline after the file’s, leaving blank lines.' },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'Save the takings',
      instructions: 'Tap the highlighted number to change it, then run.',
      lang: 'python',
      file: 'takings.py',
      starter: 'cups = 40\nwith open("sales.txt", "w") as f:\n    f.write(str(cups * 12))\nprint(open("sales.txt").read())',
      ideas: ['Save 960', 'Save 600'],
      goals: [
        { label: 'Make it save and print 960', output: '960' },
        { label: 'Make it save and print 600', output: '600' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'Write, then read',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['with open("log.txt", "w") as f:', '    f.write("tea\\n")', '    f.write("coffee\\n")', 'with open("log.txt") as f:', '    lines = f.readlines()', 'print(len(lines))'],
      stops: [
        { line: 5, prompt: 'readlines() runs next. What will lines be?', options: ["['tea\\n', 'coffee\\n']", "['tea', 'coffee']", "'tea\\ncoffee\\n'", '[]'], answer: 0, hint: 'readlines keeps each line’s newline.', why: 'readlines gives a list of lines, each still ending in \\n.', mono: true, check: { var: 'lines' } },
        { line: 6, prompt: 'What will it print?', options: ['2', '1', '3', '0'], answer: 0, hint: 'How many lines were written?', why: 'Two lines were written, so the list has 2 items.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'Where did tea go?',
      instructions: 'Riya wanted both drinks in the log. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['with open("log.txt", "w") as f:', '    f.write("tea\\n")', 'with open("log.txt", "w") as f:', '    f.write("coffee\\n")', 'print(open("log.txt").read().strip())'],
      error: 'coffee',
      bug: 2,
      fix: 'with open("log.txt", "a") as f:',
      explain: 'Opening again with "w" emptied the file, so tea was lost. "a" adds coffee after tea.',
    }),
    group({
      kicker: 'SORT',
      title: 'What does each one do?',
      instructions: 'Tap the group for each open().',
      groups: ['Reads', 'Writes from empty', 'Adds to the end'],
      items: [
        { text: 'open("a.txt")', group: 0 },
        { text: 'open("a.txt", "r")', group: 0 },
        { text: 'open("a.txt", "w")', group: 1 },
        { text: 'open("log.txt", "w")', group: 1 },
        { text: 'open("log.txt", "a")', group: 2 },
        { text: 'open("a.txt", "a")', group: 2 },
      ],
      mono: true,
      explain: 'No mode means "r" (read). "w" starts empty. "a" keeps the old text and adds to the end.',
    }),
    quiz({
      prompt: 'Which mode adds to the end of a file?',
      options: ['"a"', '"w"', '"r"', '"e"'],
      right: '"a" is append: it keeps what is there and adds after it.',
      wrong: '"w" would empty the file first.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Write hello to a file, then print it back.',
      lang: 'python',
      lines: ['with open("notes.txt", "w") as f:', '    f.write("hello")', 'with open("notes.txt") as f:', '    print(f.read())'],
      output: ['hello'],
      explain: 'Write first, then open it again to read.',
    }),
    quiz({
      prompt: 'nothere.txt does not exist. What happens with open("nothere.txt")?',
      options: ['FileNotFoundError', 'It makes an empty file', 'It prints nothing', 'ValueError'],
      right: 'Reading a file that isn’t there raises FileNotFoundError. Writing with "w" would create it instead.',
      wrong: 'No mode means read, and there is nothing to read.',
      mono: true,
    }),
    buildMenuFile,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: '"w" or "a"?', a: '"w" empties the file and writes; "a" adds to the end.' },
        { q: 'Why use with open(...)?', a: 'It closes the file for you when the block ends.' },
        { q: 'Why strip() each line?', a: 'Lines end with a newline; strip() removes it so print doesn’t add blank lines.' },
      ],
    }),
  ], [doc('Reading and Writing Files', 'tutorial/inputoutput.html#reading-and-writing-files')]),

  // 12 ────────────────────────────────────────────
  v4('p-class-1', 'Classes and objects', ['Describe a new type of thing with class', 'Set up each object in __init__', 'Write methods that use self'], [
    quiz({
      kicker: 'GUESS FIRST',
      prompt: 'Riya describes a cup in code. What do you think this prints?',
      lang: 'python',
      code: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'c = Cup("large")', 'print(c.size)'],
      options: ['large', 'size', 'Cup', 'An error'],
      right: 'Cup("large") makes a cup whose size is "large", and c.size reads it back. Today you learn classes.',
      wrong: 'Just a guess is fine. Hint: "large" is passed in as size.',
    }),
    read({
      kicker: LEARN(1),
      title: 'A class is a blueprint',
      body: 'A class describes a kind of thing. Each object made from it is one real thing, with its own values.',
      lang: 'python',
      code: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'a = Cup("small")', 'b = Cup("large")'],
      anim: 'classObject',
      check: { prompt: 'In the code above, how many Cup objects are made?', options: ['2', '1', '0', '3'], answer: 0, hint: 'Count the Cup(...) calls.', why: 'Cup("small") and Cup("large") make two separate objects.' },
    }),
    read({
      kicker: LEARN(2),
      title: '__init__ sets each object up',
      body: '__init__ runs when an object is made. self is that new object, so self.size = size stores the size on it.',
      lang: 'python',
      code: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'a = Cup("small")', 'b = Cup("large")', 'print(a.size, b.size)'],
      anim: 'classObject',
      check: { prompt: 'What does the code above print?', options: ['small large', 'large large', 'small small', 'size size'], answer: 0, hint: 'Each object keeps its own size.', why: 'a was made with "small" and b with "large".', mono: true },
    }),
    read({
      kicker: LEARN(3),
      title: 'Methods use self',
      body: 'A method is a function inside a class. It gets self, so it can read and change that object’s values.',
      lang: 'python',
      code: ['class Tab:', '    def __init__(self):', '        self.total = 0', '    def add(self, amount):', '        self.total = self.total + amount', 't = Tab()', 't.add(12)', 't.add(5)', 'print(t.total)'],
      anim: 'classObject',
      check: { prompt: 'What does the code above print?', options: ['17', '5', '12', '0'], answer: 0, hint: 'The tab starts at 0 and adds 12, then 5.', why: '0 + 12 + 5 = 17.', mono: true },
    }),
    tryIt({
      kicker: 'TRY IT',
      title: 'An order object',
      instructions: 'Tap a highlighted number to change it, then run.',
      lang: 'python',
      file: 'order.py',
      starter: 'class Order:\n    def __init__(self, price, qty):\n        self.price = price\n        self.qty = qty\n    def total(self):\n        return self.price * self.qty\nprice = 12\nqty = 3\no = Order(price, qty)\nprint(o.total())',
      ideas: ['Make the total 48', 'Make the total 72'],
      goals: [
        { label: 'Make the total 48', output: '48' },
        { label: 'Make the total 72', output: '72' },
      ],
    }),
    trace({
      kicker: 'PREDICT, THEN RUN',
      title: 'A running tab',
      instructions: 'The program runs one line at a time and stops to ask you what happens next.',
      code: ['class Tab:', '    def __init__(self):', '        self.total = 0', '    def add(self, amount):', '        self.total = self.total + amount', 't = Tab()', 't.add(12)', 'print(t.total)', 't.add(20)', 'print(t.total)'],
      stops: [
        { line: 8, prompt: 'One add(12) has run. What will it print?', options: ['12', '0', '32', '20'], answer: 0, hint: 'The tab started at 0.', why: '0 + 12 = 12.', mono: true, check: { out: true } },
        { line: 10, prompt: 'After add(20), what will it print?', options: ['32', '20', '12', '1220'], answer: 0, hint: 'The same tab keeps its total.', why: 'The tab already had 12, so 12 + 20 = 32.', mono: true, check: { out: true } },
      ],
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'The tab has no total',
      instructions: 'Read the error, then tap the line that caused it.',
      lang: 'python',
      lines: ['class Tab:', '    def __init__(self):', '        total = 0', 't = Tab()', 'print(t.total)'],
      error: "AttributeError: 'Tab' object has no attribute 'total'",
      bug: 2,
      fix: '        self.total = 0',
      explain: 'Without self., total is just a name inside __init__ and is forgotten. self.total stores it on the object.',
    }),
    match({
      kicker: 'MATCH',
      title: 'Class words',
      instructions: 'Tap a word, then what it means.',
      pairs: [
        ['class', 'a blueprint for a kind of thing'],
        ['object', 'one thing made from a class'],
        ['__init__', 'sets up a new object'],
        ['self', 'the object itself'],
        ['method', 'a function inside a class'],
      ],
      mono: true,
      explain: 'A class describes; objects are made from it; __init__ sets each one up; methods use self to reach its values.',
    }),
    quiz({
      prompt: 'Fill the gap:   def __init__(____, size):',
      options: ['self', 'this', 'me', 'obj'],
      right: 'Every method’s first parameter is self: the object it was called on.',
      wrong: 'It is the word that means “this object” in Python.',
      mono: true,
    }),
    order({
      kicker: 'QUICK CHECK',
      title: 'Put the lines in order',
      instructions: 'Make the program print Tommy.',
      lang: 'python',
      lines: ['class Dog:', '    def __init__(self, name):', '        self.name = name', 'd = Dog("Tommy")', 'print(d.name)'],
      output: ['Tommy'],
      explain: 'The class and its __init__ first, then make an object, then use it.',
    }),
    quiz({
      prompt: 'What does this print?',
      lang: 'python',
      code: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'a = Cup("small")', 'a.size = "medium"', 'print(a.size)'],
      options: ['medium', 'small', 'size', 'An error'],
      right: 'a.size = "medium" changes that object’s size.',
      wrong: 'An object’s value can be changed after it is made.',
      mono: true,
    }),
    buildCup,
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'Class or object?', a: 'A class is the blueprint; an object is one thing made from it.' },
        { q: 'What does __init__ do?', a: 'It runs when an object is made and sets up its values.' },
        { q: 'What is self?', a: 'The object a method is working on. self.x reads or sets that object’s x.' },
      ],
    }),
  ], [doc('Classes', 'tutorial/classes.html')]),
];
