// The Python Basic project in the Lesson v4 style (draft: project-docs/content-drafts/python-project-v4.md):
// six typed steps with tests, and one-tap checks between them. Every solution is run by the editor tests.
import { bug, match, quiz, recall, scenario } from '../dsl';
import type { EditorStep, Lesson } from '../types';
import { doc } from './pythonV4';

const MENU = 'MENU = {"tea": 12, "coffee": 20, "toast": 20, "sandwich": 40}\n';
const PRICE = 'def price(item):\n    return MENU.get(item, 0)\n';
const SUBTOTAL = 'def subtotal(order):\n    total = 0\n    for item in order:\n        total += price(item)\n    return total\n';
const TOTAL = 'def total(order, regular):\n    amount = subtotal(order)\n    if regular:\n        amount = amount * 0.9\n    return round(amount * 1.05, 2)\n';
const RECEIPT_LINES = 'def receipt_lines(order):\n    counts = {}\n    for item in order:\n        counts[item] = counts.get(item, 0) + 1\n    lines = []\n    for item, n in counts.items():\n        lines.append(f"{item} x{n} = {price(item) * n}")\n    lines.append(f"Total: {subtotal(order)}")\n    return lines\n';
const QTY = 'def qty(text):\n    try:\n        n = int(text)\n    except ValueError:\n        return 0\n    if n < 0:\n        return 0\n    return n\n';

const step = (n: number, o: Omit<EditorStep, 'type' | 'kicker' | 'lang' | 'file'>): EditorStep => ({ type: 'editor', kicker: `STEP ${n} OF 6 · TYPE IT`, lang: 'python', file: 'billing.py', ...o });

export const PYTHON_PROJECT_V4: Lesson = {
  id: 'p-project',
  title: 'Project: Riya’s billing app',
  kind: 'project',
  format: 'v4',
  level: 'basic',
  minutes: 20,
  skill: 'python',
  learned: ['Build a real program step by step, testing each step', 'Combine dictionaries, lists, loops, if, functions, files and errors', 'Move on to Python Intermediate or a career path'],
  reading: [doc('The Python Tutorial', 'tutorial/index.html')],
  steps: [
    scenario({
      kicker: 'PROJECT · PYTHON BASIC',
      title: 'Riya’s billing app',
      from: 'Riya · runs the tea stall',
      message: 'The evening queue is long because I add up every bill by hand. Can you make my phone do it? It should know my prices, give my regular customers 10% off, add 5% GST, print a neat receipt and keep a copy.',
      artifact: { kind: 'report', title: 'The receipt you will build', lines: ['tea x2 = 24', 'toast x1 = 20', 'Total: 44'] },
      task: 'Build it in 6 steps. Each step has tests, so you know it works before you move on.',
    }),
    match({
      kicker: 'PLAN IT',
      title: 'Which Python for which job?',
      instructions: 'Tap a job, then the Python you would use for it.',
      pairs: [
        ['the menu with prices', 'a dictionary'],
        ['one customer’s order', 'a list'],
        ['go through the order', 'a for loop'],
        ['10% off for regulars', 'if'],
        ['a bad number typed in', 'try / except'],
        ['keep a copy of the bill', 'a file'],
      ],
      explain: 'Every module you learned has a job in this app. Now you will put them together.',
    }),
    step(1, {
      title: 'Look up a price',
      instructions: 'The menu is a dictionary. Write price(item) so it gives back the item’s price, or 0 if the item isn’t on the menu.',
      starter: `${MENU}\ndef price(item):\n    return 0\n`,
      tests: [
        { call: 'price("tea")', expect: '12' },
        { call: 'price("sandwich")', expect: '40' },
        { call: 'price("pizza")', expect: '0' },
      ],
      hint: 'MENU.get(item, 0) gives the price, or 0 when the item is missing.',
      solution: `${MENU}\n${PRICE}`,
    }),
    step(2, {
      title: 'Add up an order',
      instructions: 'An order is a list of items. Write subtotal(order) so it adds up the price of every item, using your price() from step 1.',
      starter: `${MENU}\n${PRICE}\ndef subtotal(order):\n    total = 0\n    # add the price of each item\n    return total\n`,
      tests: [
        { call: 'subtotal(["tea", "toast", "tea"])', expect: '44' },
        { call: 'subtotal(["sandwich", "pizza"])', expect: '40' },
        { call: 'subtotal([])', expect: '0' },
      ],
      hint: 'for item in order:\n    total += price(item)',
      solution: `${MENU}\n${PRICE}\n${SUBTOTAL}`,
    }),
    quiz({
      kicker: 'QUICK CHECK',
      prompt: 'With your two functions, what is subtotal(["coffee", "coffee"])?',
      options: ['40', '20', '2', '0'],
      right: 'price("coffee") is 20, added twice: 40.',
      wrong: 'subtotal adds the price of every item in the list.',
      mono: true,
    }),
    step(3, {
      title: 'Discount and GST',
      instructions: 'Regular customers get 10% off (multiply by 0.9). Then everyone pays 5% GST (multiply by 1.05). Write total(order, regular) and round the answer to 2 decimal places.',
      starter: `${MENU}\n${PRICE}\n${SUBTOTAL}\ndef total(order, regular):\n    amount = subtotal(order)\n    # discount for regulars, then GST, then round\n    return amount\n`,
      tests: [
        { call: 'total(["sandwich"], False)', expect: '42.0' },
        { call: 'total(["sandwich", "sandwich"], True)', expect: '75.6' },
        { call: 'total([], True)', expect: '0.0' },
      ],
      hint: 'if regular:\n    amount = amount * 0.9\nreturn round(amount * 1.05, 2)',
      solution: `${MENU}\n${PRICE}\n${SUBTOTAL}\n${TOTAL}`,
    }),
    step(4, {
      title: 'Print the receipt',
      instructions: 'receipt(order) prints one line per item with how many and their cost, then the total:\ntea x2 = 24\ntoast x1 = 20\nTotal: 44\nCount the items with a dictionary first, in the order they appear.',
      starter: `${MENU}\n${PRICE}\n${SUBTOTAL}\ndef receipt(order):\n    counts = {}\n    # count each item, then print a line for each\n    print("Total:", subtotal(order))\n\nreceipt(["tea", "toast", "tea"])\n`,
      tests: [{ stdout: 'tea x2 = 24\ntoast x1 = 20\nTotal: 44' }],
      hint: 'for item in order:\n    counts[item] = counts.get(item, 0) + 1\nfor item, n in counts.items():\n    print(f"{item} x{n} = {price(item) * n}")',
      solution: `${MENU}\n${PRICE}\n${SUBTOTAL}\ndef receipt(order):\n    counts = {}\n    for item in order:\n        counts[item] = counts.get(item, 0) + 1\n    for item, n in counts.items():\n        print(f"{item} x{n} = {price(item) * n}")\n    print("Total:", subtotal(order))\n\nreceipt(["tea", "toast", "tea"])\n`,
    }),
    bug({
      kicker: 'SPOT THE BUG',
      title: 'One tea too many',
      instructions: 'A friend wrote the counting part. The order was tea, toast, tea. Read what it printed, then tap the line that caused it.',
      lang: 'python',
      lines: ['counts = {}', 'for item in ["tea", "toast", "tea"]:', '    counts[item] = counts.get(item, 1) + 1', 'print(counts)'],
      error: "{'tea': 3, 'toast': 2}",
      bug: 2,
      fix: '    counts[item] = counts.get(item, 0) + 1',
      explain: 'A new item should start from 0, so the first one makes it 1. Starting from 1 counts every item once too many.',
    }),
    step(5, {
      title: 'Safe quantities',
      instructions: 'Riya types how many cups. Write qty(text): give back the number, or 0 if the text isn’t a whole number, and 0 for negative numbers.',
      starter: 'def qty(text):\n    return int(text)\n',
      tests: [
        { call: 'qty("3")', expect: '3' },
        { call: 'qty("three")', expect: '0' },
        { call: 'qty("-2")', expect: '0' },
      ],
      hint: 'try:\n    n = int(text)\nexcept ValueError:\n    return 0\nif n < 0:\n    return 0\nreturn n',
      solution: QTY,
    }),
    step(6, {
      title: 'Keep a copy',
      instructions: 'receipt_lines(order) gives the receipt as a list of lines. Write save_receipt(order): open receipt.txt with "w" and write each line followed by "\\n".',
      starter: `${MENU}\n${PRICE}\n${SUBTOTAL}\n${RECEIPT_LINES}\ndef save_receipt(order):\n    # open receipt.txt and write each line\n    pass\n`,
      tests: [
        { call: '(save_receipt(["tea", "toast", "tea"]), open("receipt.txt").read().splitlines())[1]', expect: '["tea x2 = 24", "toast x1 = 20", "Total: 44"]' },
        { call: '(save_receipt(["coffee"]), open("receipt.txt").read().splitlines())[1]', expect: '["coffee x1 = 20", "Total: 20"]' },
      ],
      hint: 'with open("receipt.txt", "w") as f:\n    for line in receipt_lines(order):\n        f.write(line + "\\n")',
      solution: `${MENU}\n${PRICE}\n${SUBTOTAL}\n${RECEIPT_LINES}\ndef save_receipt(order):\n    with open("receipt.txt", "w") as f:\n        for line in receipt_lines(order):\n            f.write(line + "\\n")\n`,
    }),
    recall({
      kicker: 'RECALL',
      title: 'Can you remember?',
      cards: [
        { q: 'Why is the menu a dictionary, not a list?', a: 'You look prices up by name: MENU["tea"]. A dictionary maps names to values.' },
        { q: 'Why split the app into functions?', a: 'Each step can be tested on its own and reused: total() uses subtotal(), which uses price().' },
        { q: '"w" or "a" for a fresh receipt?', a: '"w": it starts the file empty, so the old receipt is replaced.' },
      ],
    }),
  ],
};
