// Python Intermediate · Module 2 · Grouped values. Lesson 2.1 keeps the old module id (py-tuples-sets).
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug } from './kit';

export const PY_I_M2: Lesson[] = [
  lesson('py-tuples-sets', 'Tuples and unpacking', 5, [
    atWork('Megan', ['City Travel Desk’s files store each booking as a pair, like ("90101", 2): the train and the seats.', 'Groups of values that never change are tuples, and Python can unpack them straight into names.']),
    reveal('Tuples', [
      ['("90101", 2)', 'A tuple: values in round brackets, in a fixed order.'],
      ['booking[0]', 'Read by position, like a list.'],
      ['booking[0] = "90102"', 'Not allowed: a tuple can’t change. That makes it safe to share.'],
      ['train, seats = booking', 'Unpacking: each value gets its own name.'],
    ], { mono: true }),
    predict('Unpack a booking', ['booking = ("90101", 2)', 'train, seats = booking', 'seats = seats + 1', 'print(train, seats, booking)'], [
      [2, 'What will train be?', ["'90101'", "('90101', 2)", '2'], 'The first name gets the first value.', { var: 'train' }],
      [3, 'What will seats be?', ['3', '2', '(2, 1)'], 'seats is a normal number now; the tuple itself doesn’t change.', { var: 'seats' }],
    ]),
    run('Swap and split', 'Pick one.', ['a, b = 450, 300', 'first, *rest = [90101, 90102, 90104]', 'print({{v}})'], ['(a, b)', '(b, a)', 'first', 'rest', 'divmod(450, 100)'], { caption: 'a, b = b, a swaps two values. *rest collects “all the others”. divmod gives two answers as a tuple.' }),
    check('Which line causes an error?', ['t = (1, 2); t[0] = 5', 'a, b = (1, 2)', 't = (1, 2); x = t[0]', 'a, b = 1, 2; a, b = b, a'], 'Tuples can’t be changed after they are made.', 'Which one changes a tuple?', { mono: true }),
    tapbug('ValueError: too many values to unpack', ['train, seats = ("90101", 2, "Window")'], [[1, 'train, seats', 'train, seats, seat']], 'Three values need three names.'),
    recap([
      ['🔒', 'A tuple is a fixed group of values'],
      ['📦', 'a, b = pair unpacks it into names'],
      ['🔄', 'a, b = b, a swaps; *rest collects the others'],
    ]),
  ]),

  lesson('py-i-2-2', 'Sets and set maths', 4, [
    atWork('Felix', ['Two lists of travellers: who booked on Monday, and who booked on Tuesday. The desk asks: who booked both days? Who only Monday?', 'Sets answer each question with one symbol.']),
    run('Set maths', 'Pick a question. Who booked only on Monday?', ['monday = {101, 102, 103}', 'tuesday = {103, 104, 101}', 'print(sorted({{v}}))'], ['monday & tuesday', 'monday | tuesday', 'monday - tuesday', 'tuesday - monday', 'monday ^ tuesday'], { goal: '[102]', caption: '& in both, | in either, - in the first only, ^ in one but not both. sorted() prints them in order.' }),
    predict('Each value once', ['seen = [101, 102, 101, 103, 102]', 'unique = set(seen)', 'count = len(unique)', 'has_104 = 104 in unique', 'print(count, has_104)'], [
      [3, 'What will count be?', ['3', '5', '4'], 'The repeats are dropped.', { var: 'count' }],
      [4, 'What will has_104 be?', ['False', 'True', 'None'], '104 was never seen.', { var: 'has_104' }],
    ]),
    reveal('When to use a set', [
      ['Remove repeats', 'set(items) keeps each value once (the order is not kept).'],
      ['Fast “is it there?”', 'x in a_set stays quick even with a million items.'],
      ['add, discard', 'Add one value, or remove it if it is there.'],
      ['No positions', 'a_set[0] doesn’t work: sets have no order.'],
    ], { mono: true }),
    check('Which gives the travellers in both {1, 2} and {2, 3}?', ['{1, 2} & {2, 3}', '{1, 2} | {2, 3}', '{1, 2} - {2, 3}', '{1, 2} + {2, 3}'], '& keeps what both have.', 'Think “and”.', { mono: true }),
    tapbug("TypeError: 'set' object is not subscriptable", ['first = unique[0]'], [[1, 'unique[0]', 'sorted(unique)[0]']], 'Sets have no positions. Sort them into a list first.'),
    recap([
      ['🎯', 'A set keeps each value once'],
      ['➗', '& both, | either, - first only'],
      ['⚡', 'in is fast on a set'],
    ]),
  ]),

  lesson('py-i-2-3', 'zip, enumerate and match', 5, [
    run('Walk lists together', 'Pick one.', ['trains = ["90101", "90102", "90104"]', 'delays = [0, 12, 5]', 'print(list({{v}}))'], ['zip(trains, delays)', 'enumerate(trains)', 'enumerate(trains, start=1)', 'zip(trains, delays, ["On time", "Late", "Late"])'], { caption: 'zip pairs up items from several lists; enumerate numbers them.' }),
    predict('Numbered lines', ['trains = ["90101", "90102"]', 'lines = [f"{i}. {t}" for i, t in enumerate(trains, start=1)]', 'delay_of = dict(zip(trains, [0, 12]))', 'print(lines, delay_of)'], [
      [2, 'What will lines be?', ["['1. 90101', '2. 90102']", "['0. 90101', '1. 90102']", "['90101. 1', '90102. 2']"], 'start=1 counts from 1.', { var: 'lines' }],
      [3, 'What will delay_of be?', ["{'90101': 0, '90102': 12}", "[('90101', 0), ('90102', 12)]", "{0: '90101', 12: '90102'}"], 'dict(zip(keys, values)) builds a dictionary.', { var: 'delay_of' }],
    ]),
    reveal('match: one value, many cases', [
      ['match state:', 'Compare one value with several cases, top to bottom.'],
      ['case "On time":', 'An exact value.'],
      ['case "Late" | "Delayed":', 'Either of these.'],
      ['case _:', 'Anything else, like else.'],
    ], { mono: true }),
    run('Match the state', 'Pick a state. What does a cancelled train need?', ['state = {{v}}', 'match state:', '    case "On time":', '        print("Board as normal")', '    case "Late" | "Delayed":', '        print("Tell travellers the new time")', '    case "Cancelled":', '        print("Offer a refund")', '    case _:', '        print("Check with the station")'], ['"On time"', '"Delayed"', '"Unknown"', '"Cancelled"'], { goal: 'Offer a refund', caption: 'match was added in Python 3.10. Only the first matching case runs.' }),
    check('What does list(enumerate(["a", "b"])) give?', ["[(0, 'a'), (1, 'b')]", "[(1, 'a'), (2, 'b')]", "['a', 'b']", '[0, 1]'], 'Pairs of (number, item), from 0.', 'Number first, then the item.', { mono: true }),
    tapbug('TypeError: can only concatenate str (not "int") to str', ['for i, t in enumerate(trains):', '    print(t + ". " + i)'], [[2, 't + ". " + i', 'f"{i}. {t}"']], 'i is a number. An f-string puts it in the text for you, in the right order.'),
    recap([
      ['🤝', 'zip walks lists together'],
      ['🔢', 'enumerate numbers the items'],
      ['🔀', 'match picks a case for a value'],
    ]),
  ]),

  challenge('py-i-2-ch', 'Module 2 Challenge', { icon: '🧩', name: 'Unpacker' }, ['Use tuples and unpack them into names', 'Answer questions with sets and set maths', 'Walk lists with zip and enumerate, and pick cases with match'], [
    mcq(1, 'Which is a tuple?', ['(90101, 2)', '[90101, 2]', '{90101, 2}', '{90101: 2}'], 'Round brackets.', { mono: true }),
    mcq(2, 'What does a, b = b, a do?', ['Swaps the two values', 'Makes a tuple of four', 'Copies a into b', 'Raises an error'], 'Python’s neat swap.', { mono: true }),
    mcq(3, 'Which gives the values in the first set only?', ['a - b', 'a & b', 'a | b', 'a ^ b'], 'Take away the second.', { mono: true }),
    mcq(4, 'What does zip(["x", "y"], [1, 2]) pair up?', ["('x', 1) and ('y', 2)", "('x', 'y') and (1, 2)", 'x1 and y2', "['x', 'y', 1, 2]"], 'Items in the same position.', { mono: true }),
    mcq(5, 'In match, what does case _: catch?', ['Anything not matched above', 'Only underscores', 'Errors', 'Empty values'], 'The catch-all.'),
    swipe([
      ['Tuples can be changed after they are made', false, 'They are fixed.'],
      ['A set keeps each value once', true, 'Repeats are dropped.'],
      ['enumerate starts at 0 unless you give start=', true, 'enumerate(items, start=1)'],
      ['A set keeps the order you added things in', false, 'Sets have no order.'],
    ]),
    pairs([['zip', 'Walk lists together'], ['enumerate', 'Number each item'], ['&', 'In both sets'], ['case _', 'Anything else']], 'Grouped-value tools.'),
    pickCode('Which prints “1. 90101”, then “2. 90102”?', ['for i, t in enumerate(trains, start=1): print(f"{i}. {t}")', 'for i in trains: print(i + ". " + t)', 'for t in enumerate(trains): print(t)', 'for i, t in zip(trains): print(i, t)'], 'enumerate with start=1, unpacked into i and t.'),
    bugTask(['train, seats = ("90101", 2, "Window")', 'first = unique[0]', 'both = monday + tuesday'], [[1, 'train, seats', 'train, seats, seat'], [2, 'unique[0]', 'sorted(unique)[0]'], [3, 'monday + tuesday', 'monday & tuesday']], 'One name per value, sets have no positions, and “in both” is &.'),
    predictTask(['monday = {101, 102, 103}', 'tuesday = {103, 104}', 'print(len(monday | tuesday), len(monday & tuesday))'], 'What does it print?', ['4 1', '5 1', '4 2', '3 1'], 'Four different travellers in all; only 103 on both days.'),
    arrange(['booking = ("90101", 2)', 'train, seats = booking', 'print(f"{train}: {seats} seats")'], 'make the tuple, unpack it, then print', ['90101: 2 seats']),
  ]),
];
