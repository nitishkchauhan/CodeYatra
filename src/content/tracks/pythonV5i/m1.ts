// Python Intermediate · Module 1 · Shaping data. Lesson 1.1 keeps the old module id (py-comprehensions).
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

const BOOKINGS = 'bookings = [{"name": "Reed", "fare": 450}, {"name": "Megan", "fare": 300}, {"name": "Ava", "fare": 300}, {"name": "Zoey", "fare": 120}]';

export const PY_I_M1: Lesson[] = [
  lesson('py-comprehensions', 'List comprehensions', 5, [
    atWork('Felix', ['Hi again! City Travel Desk’s back office runs on Python, and I look after it.', 'Their fares need a ₹20 booking fee added, and only fares over ₹250 kept. In Basic you’d write a loop. Python has a one-line way.']),
    toggleRun('Loop or comprehension?', [
      ['Loop', ['fares = [450, 120, 300]', 'with_fee = []', 'for f in fares:', '    with_fee.append(f + 20)', 'print(with_fee)'], 'Four lines to build one list.', ['[470, 140, 320]']],
      ['Comprehension', ['fares = [450, 120, 300]', 'with_fee = [f + 20 for f in fares]', 'print(with_fee)'], 'The same list in one line. Read it as “f + 20, for each f in fares”.', ['[470, 140, 320]']],
    ]),
    run('Shape the list', 'Pick a comprehension. Can you keep the big fares, with the fee added?', ['fares = [450, 120, 300, 90]', 'print({{v}})'], ['[f + 20 for f in fares]', '[f for f in fares if f > 250]', '[f + 20 for f in fares if f > 250]', '[f * 2 for f in range(3)]'], { goal: '[470, 320]', caption: '[what for each item in list if test]. The if at the end keeps only some items.' }),
    predict('Read it like a sentence', ['names = ["ava", "reed", "megan"]', 'caps = [n.title() for n in names]', 'short = [n for n in names if len(n) <= 4]', 'print(caps, short)'], [
      [2, 'What will caps be?', ["['Ava', 'Reed', 'Megan']", "['AVA', 'REED', 'MEGAN']", "['ava', 'reed', 'megan']"], 'title() gives each name a capital first letter.', { var: 'caps' }],
      [3, 'What will short be?', ["['ava', 'reed']", "['megan']", "['ava']"], 'Only names of 4 letters or fewer pass the test.', { var: 'short' }],
    ]),
    check('Which keeps only the fares under 200?', ['[f for f in fares if f < 200]', '[f < 200 for f in fares]', '[if f < 200 for f in fares]', 'fares.filter(f < 200)'], 'The test goes at the end, after if.', 'Where does the if go?', { mono: true }),
    tapbug('SyntaxError: invalid syntax', ['big = [f for f in fares if f > 250 else 0]'], [[1, 'if f > 250 else 0', 'if f > 250']], 'An if at the end filters, and can’t have else. To change values instead, put if and else at the front: [f if f > 250 else 0 for f in fares].'),
    recap([
      ['⚡', '[expression for item in list] builds a list in one line'],
      ['🧹', 'Add if at the end to keep only some items'],
      ['📖', 'Read it as a sentence: “this, for each that”'],
    ]),
  ]),

  lesson('py-i-1-2', 'Dictionary and set comprehensions', 4, [
    reveal('Three brackets, three results', [
      ['[x for x in items]', 'A list, in order.'],
      ['{x for x in items}', 'A set: each value once.'],
      ['{k: v for k, v in pairs}', 'A dictionary.'],
      ['fares.items()', 'Gives (key, value) pairs to loop over.'],
    ], { mono: true }),
    run('Build a dictionary', 'Pick one. Can you keep only the routes that cost ₹300 or more?', ['fares = {"Harbour": 450, "Airport": 300, "Hillview": 200}', 'print({{v}})'], ['{route: fare + 20 for route, fare in fares.items()}', '{route.upper(): fare for route, fare in fares.items()}', '{route: fare for route, fare in fares.items() if fare >= 300}', '{fare for fare in fares.values()}'], { goal: "{'Harbour': 450, 'Airport': 300}", caption: 'key: value at the front makes a dictionary. Values alone in curly brackets make a set.' }),
    predict('Each value once', ['stations = ["Harbour", "Airport", "Harbour", "Hillview"]', 'unique = {s for s in stations}', 'has_airport = "Airport" in unique', 'count = len(unique)', 'print(count, has_airport)'], [
      [3, 'What will has_airport be?', ['True', 'False', '1'], 'in checks a set very quickly.', { var: 'has_airport' }],
      [4, 'What will count be?', ['3', '4', '2'], 'Harbour is kept only once.', { var: 'count' }],
    ]),
    check('What does {x % 3 for x in range(6)} give?', ['{0, 1, 2}', '[0, 1, 2, 0, 1, 2]', '{0: 1, 2: 0}', '6'], 'The remainders repeat, and a set keeps each one once.', 'Curly brackets with no colon.', { mono: true }),
    tapbug('SyntaxError in a dictionary comprehension', ['fees = {route, fare + 20 for route, fare in fares.items()}'], [[1, 'route, fare + 20 for', 'route: fare + 20 for']], 'A dictionary needs key: value, with a colon.'),
    matchUp('Which bracket?', [['[x for …]', 'A list, in order'], ['{x for …}', 'A set, no repeats'], ['{k: v for …}', 'A dictionary'], ['(x for …)', 'A generator, one at a time (Advanced)']], 'The brackets decide what you get.'),
    recap([
      ['📘', '{k: v for k, v in d.items()} builds a dictionary'],
      ['🎯', '{x for x in items} builds a set'],
      ['🔁', 'The same if filter works in every kind'],
    ]),
  ]),

  lesson('py-i-1-3', 'Sorting with key and lambda', 5, [
    atWork('Felix', ['The desk wants bookings sorted by fare, cheapest first, and ties by name. sorted() on its own can’t compare two dictionaries.', 'Give it a key: a small function that says what to sort by.']),
    run('Sort the bookings', 'Pick a key. Can you sort by fare, then by name?', [BOOKINGS, 'order = sorted(bookings, key={{v}})', 'print([b["name"] for b in order])'], ['lambda b: b["name"]', 'lambda b: -b["fare"]', 'lambda b: b["fare"]', 'lambda b: (b["fare"], b["name"])'], { goal: "['Zoey', 'Ava', 'Megan', 'Reed']", caption: 'A tuple key sorts by the first value, then the second for ties.' }),
    reveal('Keys and lambda', [
      ['key=len', 'Any function works: here, sort words by length.'],
      ['lambda b: b["fare"]', 'A one-line function with no name: “given b, give back its fare”.'],
      ['reverse=True', 'Biggest first.'],
      ['min(…, key=…), max(…, key=…)', 'The cheapest or dearest, the same way.'],
    ], { mono: true }),
    predict('Cheapest and dearest', ['fares = {"Harbour": 450, "Airport": 300, "Hillview": 200}', 'cheapest = min(fares, key=fares.get)', 'by_price = sorted(fares, key=fares.get, reverse=True)', 'print(cheapest, by_price)'], [
      [2, 'What will cheapest be?', ["'Hillview'", '200', "'Airport'"], 'min looks at each route’s fare, and gives back the route.', { var: 'cheapest' }],
      [3, 'What will by_price be?', ["['Harbour', 'Airport', 'Hillview']", "['Hillview', 'Airport', 'Harbour']", '[450, 300, 200]'], 'Dearest first, because of reverse=True.', { var: 'by_price' }],
    ]),
    check('What does sorted(["tea", "a", "coffee"], key=len) give?', ["['a', 'tea', 'coffee']", "['a', 'coffee', 'tea']", "['coffee', 'tea', 'a']", '[1, 3, 6]'], 'Shortest first, and the words themselves come back.', 'key decides the order, not the result.', { mono: true }),
    tapbug("NameError: name 'b' is not defined", ['order = sorted(bookings, key=b["fare"])'], [[1, 'key=b["fare"]', 'key=lambda b: b["fare"]']], 'key needs a function. lambda b: … makes one.'),
    recap([
      ['🔑', 'key= says what to sort by'],
      ['λ', 'lambda makes a one-line function'],
      ['🏷', 'Tuple keys sort by one thing, then another'],
    ]),
  ]),

  challenge('py-i-1-ch', 'Module 1 Challenge', { icon: '🧮', name: 'Data Shaper' }, ['Build lists with comprehensions', 'Build dictionaries and sets the same way', 'Sort anything with key and lambda'], [
    mcq(1, 'What does [x * 2 for x in [1, 2, 3]] give?', ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', '12', '(2, 4, 6)'], 'Each item doubled.', { mono: true }),
    mcq(2, 'Where does a filtering if go in a comprehension?', ['At the end', 'At the start', 'Before for', 'In a separate line'], '[x for x in items if test]'),
    mcq(3, 'Which makes a dictionary?', ['{k: v for k, v in pairs}', '[k: v for k, v in pairs]', '{k, v for k, v in pairs}', '(k: v for k, v in pairs)'], 'Curly brackets and a colon.', { mono: true }),
    mcq(4, 'What is key= in sorted()?', ['A function that says what to sort by', 'The first item', 'A dictionary key to remove', 'The number of items'], 'It is called for each item.'),
    mcq(5, 'What does lambda x: x * 2 make?', ['A small function with no name', 'A list', 'A loop', 'A variable called lambda'], 'A one-line function.'),
    swipe([
      ['A set comprehension keeps repeats', false, 'Sets keep each value once.'],
      ['sorted() gives back a new list', true, 'The original is unchanged.'],
      ['min() can take a key too', true, 'min(fares, key=fares.get)'],
      ['Comprehensions can only make lists', false, 'Sets and dictionaries too.'],
    ]),
    pairs([['[x for x in xs]', 'A new list'], ['{x for x in xs}', 'A set'], ['key=len', 'Sort by length'], ['reverse=True', 'Biggest first']], 'Data-shaping tools.'),
    pickCode('Which gives the names of bookings over ₹300?', ['[b["name"] for b in bookings if b["fare"] > 300]', '[b["name"] if b["fare"] > 300 for b in bookings]', '[for b in bookings: b["name"]]', 'bookings.filter(fare > 300).name'], 'What you want first, then for, then the test.'),
    bugTask(['big = [f for f in fares if f > 250 else 0]', 'order = sorted(bookings, key=b["fare"])', 'fees = {r, f + 20 for r, f in fares.items()}'], [[1, 'if f > 250 else 0', 'if f > 250'], [2, 'key=b["fare"]', 'key=lambda b: b["fare"]'], [3, 'r, f + 20 for', 'r: f + 20 for']], 'A filter has no else, key needs a function, and a dictionary needs key: value.'),
    predictTask(['fares = [450, 120, 300]', 'total = sum(f + 20 for f in fares if f > 200)', 'print(total)'], 'What does it print?', ['790', '750', '890', '870'], '450 and 300 pass; with the fee they are 470 and 320.'),
    arrange(['fares = {"Harbour": 450, "Airport": 300}', 'cheap = min(fares, key=fares.get)', 'print("Cheapest: " + cheap)'], 'make the fares, find the cheapest, then print it', ['Cheapest: Airport']),
  ]),
];
