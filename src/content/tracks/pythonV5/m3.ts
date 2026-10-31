// Python Basic · Module 3 · Text (strings). Lesson 3.1 keeps the old module id (p-str-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

export const PY_B_M3: Lesson[] = [
  lesson('p-str-1', 'Strings, joining and len()', 4, [
    chat(['A string is text: letters, digits, spaces and symbols, inside quotes.', 'Names, messages, addresses and passwords are all strings.']),
    run('Join and measure', 'Pick one.', ['dish = "Cheese Toast"', 'print({{v}})'], ['dish', 'dish + "!"', '"Order: " + dish', 'len(dish)', 'dish * 2'], { caption: '+ joins strings; len() counts the characters, spaces included.' }),
    predict('Build a message', ['first = "Lemon"', 'second = "Tea"', 'dish = first + " " + second', 'size = len(dish)', 'print(dish, size)'], [
      [3, 'What will dish be?', ["'Lemon Tea'", "'LemonTea'", "'Lemon + Tea'"], 'The space in the middle is a string too.', { var: 'dish' }],
      [4, 'What will size be?', ['9', '8', '2'], '5 + 1 + 3 characters.', { var: 'size' }],
    ]),
    check('Which quotes make a string?', ['Both "Tea" and \'Tea\'', 'Only "Tea"', 'Only \'Tea\'', 'Neither'], 'Single or double quotes both work; use the same at both ends.', 'Python isn’t fussy about which.'),
    tapbug('TypeError: can only concatenate str (not "int") to str', ['print("Price: " + 40)'], [[1, '+ 40', '+ str(40)']], 'Text and numbers can’t be joined with +. Turn the number into text first.'),
    recap([
      ['🔤', 'Strings are text in quotes'],
      ['➕', '+ joins strings'],
      ['📏', 'len() counts characters'],
    ]),
  ]),

  lesson('p-b-3-2', 'Positions and slices', 4, [
    reveal('Every character has a position', [
      ['"TOAST"[0]', '"T": positions start at 0.'],
      ['"TOAST"[-1]', '"T": -1 is the last one.'],
      ['"TOAST"[1:3]', '"OA": from 1, up to (but not including) 3.'],
      ['"TOAST"[:2]', '"TO": from the start.'],
    ], { mono: true }),
    run('Cut the text', 'Pick a slice. Can you get just "Tea"?', ['dish = "Lemon Tea"', 'print({{v}})'], ['dish[0]', 'dish[-1]', 'dish[0:5]', 'dish[6:]', 'dish[::-1]'], { goal: 'Tea', caption: '[start:end] cuts out a piece. [::-1] reads it backwards.' }),
    predict('Codes from text', ['code = "RC-2026-117"', 'shop = code[:2]', 'year = code[3:7]', 'number = code[-3:]', 'print(shop, year, number)'], [
      [2, 'What will shop be?', ["'RC'", "'RC-'", "'R'"], 'From the start, up to position 2.', { var: 'shop' }],
      [3, 'What will year be?', ["'2026'", "'-202'", "'026-'"], 'Positions 3, 4, 5 and 6.', { var: 'year' }],
      [4, 'What will number be?', ["'117'", "'7'", "'-117'"], 'The last three characters.', { var: 'number' }],
    ]),
    check('What is "Python"[1]?', ['"y"', '"P"', '"t"', '"Py"'], 'Position 0 is P, so 1 is y.', 'Counting starts at 0.', { mono: true }),
    tapbug('IndexError: string index out of range', ['dish = "Tea"', 'print(dish[3])'], [[2, 'dish[3]', 'dish[2]']], 'Tea has positions 0, 1 and 2.'),
    recap([
      ['0️⃣', 'Positions start at 0'],
      ['🔚', '-1 is the last character'],
      ['✂️', '[start:end] stops before end'],
    ]),
  ]),

  lesson('p-b-3-3', 'String methods', 4, [
    run('Tidy the text', 'Pick a method. Can you make it “Cheese Toast”?', ['typed = "  cheese toast  "', 'print("[" + {{v}} + "]")'], ['typed', 'typed.strip()', 'typed.upper()', 'typed.replace("cheese", "veg")', 'typed.strip().title()'], { goal: '[Cheese Toast]', caption: 'The brackets show where the text starts and ends.' }),
    reveal('Useful methods', [
      ['.upper(), .lower()', 'All capitals, or all small letters.'],
      ['.strip()', 'Removes spaces at both ends.'],
      ['.replace(a, b)', 'Swaps every a for b.'],
      ['.split(",")', 'Cuts the text into a list.'],
      ['"Tea" in text', 'True if the text contains Tea.'],
    ], { mono: true }),
    predict('Split an order', ['order = "tea,toast,tea"', 'items = order.split(",")', 'count = order.count("tea")', 'print(items, count)'], [
      [2, 'What will items be?', ["['tea', 'toast', 'tea']", "['tea,toast,tea']", "['tea', 'toast']"], 'Cut at every comma.', { var: 'items' }],
      [3, 'What will count be?', ['2', '1', '3'], 'tea appears twice.', { var: 'count' }],
    ]),
    check('What does "Hi".lower() give?', ['"hi"', '"HI"', '"Hi"', '"h"'], 'All small letters.', 'lower case.', { mono: true }),
    tapbug('The name still has spaces', ['name = "  Ava  "', 'name.strip()', 'print(name)'], [[2, 'name.strip()', 'name = name.strip()']], 'Strings never change. strip() gives back a new string, so store it.'),
    recap([
      ['🧽', 'strip() tidies the ends'],
      ['🔠', 'upper(), lower(), title() change capitals'],
      ['✂️', 'split() cuts text into a list'],
    ]),
  ]),

  lesson('p-b-3-4', 'f-strings', 4, [
    toggleRun('Joining or an f-string?', [
      ['Joining', ['dish = "Tea"', 'price = 40', 'print("A " + dish + " costs ₹" + str(price))'], 'Lots of + and str().', ['A Tea costs ₹40']],
      ['f-string', ['dish = "Tea"', 'price = 40', 'print(f"A {dish} costs ₹{price}")'], 'f before the quote, values in {curly brackets}.', ['A Tea costs ₹40']],
    ]),
    run('Format the receipt', 'Pick a format. Can you show commas and two decimals?', ['price = 1234.5', 'print(f"Total: ₹{{{v}}}")'], ['price', 'price:.2f', 'price:,', 'price:,.2f'], { goal: 'Total: ₹1,234.50', caption: ':.2f shows two decimals; :, adds commas.' }),
    predict('Inside the braces', ['cups = 3', 'price = 40', 'line = f"{cups} x Tea = ₹{cups * price}"', 'print(line)'], [
      [3, 'What will line be?', ["'3 x Tea = ₹120'", "'{cups} x Tea = ₹{cups * price}'", "'3 x Tea = ₹40'"], 'Anything inside {} is worked out.', { var: 'line' }],
    ]),
    check('What does f"{2 + 3}" give?', ['"5"', '"2 + 3"', '"{2 + 3}"', '5'], 'The sum is worked out and put in the text.', 'It is still a string.', { mono: true }),
    tapbug('It prints {name} instead of the name', ['print("Hello, {name}")'], [[1, '"Hello, {name}"', 'f"Hello, {name}"']], 'Without the f, the curly brackets are just text.'),
    recap([
      ['🧾', 'f"…{value}…" puts values in text'],
      ['🧮', 'Sums work inside {}'],
      ['💰', ':.2f and :, format numbers'],
    ]),
  ]),

  challenge('p-b-3-ch', 'Module 3 Challenge', { icon: '🔤', name: 'Wordsmith' }, ['Join and measure strings', 'Read positions and slices', 'Tidy text and build it with f-strings'], [
    mcq(1, 'What does len("Tea") give?', ['3', '2', '4', '"Tea"'], 'Three characters.', { mono: true }),
    mcq(2, 'What is "Tea"[0]?', ['"T"', '"e"', '"a"', 'An error'], 'Positions start at 0.', { mono: true }),
    mcq(3, 'Which removes spaces at both ends?', ['strip()', 'trim()', 'clean()', 'cut()'], 'strip().', { mono: true }),
    mcq(4, 'What does "a,b".split(",") give?', ["['a', 'b']", '"ab"', "['a,b']", "('a', 'b')"], 'A list, cut at the comma.', { mono: true }),
    mcq(5, 'Which is an f-string?', ['f"Hi {name}"', '"Hi {name}"', 'f(Hi, name)', '"Hi " f name'], 'f before the quote.', { mono: true }),
    swipe([
      ['String positions start at 1', false, 'At 0.'],
      ['Strings can be joined with +', true, '"Lemon" + " Tea"'],
      ['strip() changes the string itself', false, 'It gives back a new one.'],
      ['f-strings put values inside {}', true, 'f"{price}"'],
    ]),
    pairs([['len()', 'Count characters'], ['.upper()', 'All capitals'], ['.split()', 'Cut into a list'], ['f"{x}"', 'Put a value in text']], 'String tools.'),
    pickCode('Which prints “Lemon Tea costs ₹40”?', ['print(f"{dish} costs ₹{price}")', 'print("{dish} costs ₹{price}")', 'print(dish + " costs ₹" + price)', 'print(f"dish costs ₹price")'], 'An f-string with both values in braces.'),
    bugTask(['print("Price: " + 40)', 'print(dish[3])  # dish = "Tea"', 'print("Hello, {name}")'], [[1, '+ 40', '+ str(40)'], [2, 'dish[3]', 'dish[2]'], [3, '"Hello, {name}"', 'f"Hello, {name}"']], 'Numbers become text before joining, Tea ends at position 2, and f-strings need the f.'),
    predictTask(['dish = "  veg sandwich "', 'clean = dish.strip().title()', 'print(clean, len(clean))'], 'What does it print?', ['Veg Sandwich 12', 'Veg Sandwich 15', 'veg sandwich 12', 'VEG SANDWICH 12'], 'strip removes the outer spaces; title gives capitals; 12 characters are left.'),
    arrange(['dish = "toast"', 'nice = dish.title()', 'print(f"One {nice}, please")'], 'take the dish, tidy it, then print the order', ['One Toast, please']),
  ]),
];
