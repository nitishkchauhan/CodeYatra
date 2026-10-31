// Python Intermediate · Module 5 · Functions in depth. Lesson 5.1 keeps the old module id (py-functions-2).
// “Predict” stops are on top-level lines only (never inside a function), so each answer is the state after the line.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

export const PY_I_M5: Lesson[] = [
  lesson('py-functions-2', 'Default and keyword arguments', 5, [
    atWork('Felix', ['Ten scripts call fare(450). Now the desk wants an optional student discount.', 'Add the new parameter with a default, so all the old calls keep working.']),
    run('Call it different ways', 'Pick a call. Can you take ₹50 off?', ['def fare(base, fee=20, discount=0):', '    return base + fee - discount', 'print({{v}})'], ['fare(450)', 'fare(450, 30)', 'fare(450, discount=50)', 'fare(base=300, fee=0)', 'fare(fee=10)'], { goal: '420', caption: 'Defaults fill in what you leave out. Keyword arguments name what you pass, so the order doesn’t matter.' }),
    predict('Which value goes where?', ['def ticket(train, seats=1, seat="Any"):', '    return f"{train} x{seats} ({seat})"', 'a = ticket("90101")', 'b = ticket("90102", seat="Window")', 'print(a, b, sep=" | ")'], [
      [5, 'What will it print?', ['90101 x1 (Any) | 90102 x1 (Window)', '90101 x1 (Any) | 90102 xWindow (Any)', '90101 x0 () | 90102 x1 (Window)'], 'seat="Window" skips seats, which keeps its default of 1.', { out: true }],
    ]),
    toggleRun('The list default trap', [
      ['Default []', ['def add(train, saved=[]):', '    saved.append(train)', '    return saved', 'print(add("90101"))', 'print(add("90102"))'], 'The same list is reused on every call, so 90101 is still there!', ["['90101']", "['90101', '90102']"]],
      ['Default None', ['def add(train, saved=None):', '    if saved is None:', '        saved = []', '    saved.append(train)', '    return saved', 'print(add("90101"))', 'print(add("90102"))'], 'A fresh list on each call.', ["['90101']", "['90102']"]],
    ]),
    check('Which call is not allowed?', ['fare(fee=10, 450)', 'fare(450, fee=10)', 'fare(base=450)', 'fare(450)'], 'Keyword arguments must come after the positional ones.', 'Look at the order.', { mono: true }),
    tapbug("TypeError: fare() missing 1 required positional argument: 'base'", ['def fare(base, fee=20):', '    return base + fee', 'print(fare(fee=30))'], [[3, 'fare(fee=30)', 'fare(450, fee=30)']], 'base has no default, so every call must give it.'),
    recap([
      ['🧩', 'Defaults make parameters optional'],
      ['🏷', 'Keyword arguments name what you pass'],
      ['⚠️', 'Use None, not [], as a default for lists'],
    ]),
  ]),

  lesson('py-i-5-2', '*args and **kwargs', 5, [
    atWork('Megan', ['The desk wants total(450), total(450, 300) and total(450, 300, 120): any number of tickets.', 'And a log function that takes any extra details by name.']),
    run('Any number of values', 'Pick a call.', ['def total(*fares):', '    print(fares)', '    return sum(fares)', 'print({{v}})'], ['total(450)', 'total(450, 300, 120)', 'total()', 'total(*[200, 200])'], { caption: '*fares collects every value into a tuple. *list spreads a list back out into separate values.' }),
    run('Any details by name', 'Pick a call. Can you log a cancelled train?', ['def log(event, **details):', '    extra = ", ".join(f"{k}={v}" for k, v in details.items())', '    print(f"[{event}] {extra}")', '{{v}}'], ['log("booked", train="90101", seats=2)', 'log("refund")', 'log("booked", **{"train": "90104", "seats": 1})', 'log("cancelled", train="90103")'], { goal: '[cancelled] train=90103', caption: '**details collects named values into a dictionary.' }),
    matchUp('Stars', [['def f(*args)', 'Collect extra values (a tuple)'], ['def f(**kwargs)', 'Collect extra named values (a dict)'], ['f(*items)', 'Spread a list into values'], ['f(**opts)', 'Spread a dict into names']], 'One star for values, two for names.'),
    predict('Collect and count', ['def count(*items, **opts):', '    return len(items) + len(opts)', 'n = count("a", "b", sep="-")', 'print(n)'], [
      [4, 'What will it print?', ['3', '2', '1'], 'Two values in items, and one named value in opts.', { out: true }],
    ]),
    tapbug('TypeError: total() takes 1 positional argument but 3 were given', ['def total(fares):', '    return sum(fares)', 'print(total(450, 300, 120))'], [[1, '(fares)', '(*fares)']], 'A star lets the function take any number of values.'),
    recap([
      ['⭐', '*args collects values into a tuple'],
      ['🌟', '**kwargs collects named values into a dict'],
      ['📤', '* and ** in a call spread them back out'],
    ]),
  ]),

  lesson('py-i-5-3', 'Scope and type hints', 5, [
    toggleRun('Inside or outside?', [
      ['Read outside', ['fee = 20', 'def fare(base):', '    return base + fee', 'print(fare(450))'], 'A function can read a variable from outside.', ['470']],
      ['Set inside', ['fee = 20', 'def raise_fee():', '    fee = 30', '    return fee', 'raise_fee()', 'print(fee)'], 'fee = 30 makes a new, local fee. The outside one is still 20.', ['20']],
      ['global', ['fee = 20', 'def raise_fee():', '    global fee', '    fee = 30', 'raise_fee()', 'print(fee)'], 'global changes the outside one, but returning a value is usually clearer.', ['30']],
    ]),
    predict('Local or global?', ['total = 0', 'def add(x):', '    total = x * 2', '    return total', 'result = add(5)', 'print(total, result)'], [
      [6, 'What will it print?', ['0 10', '10 10', '0 5'], 'The total inside add is a different, local variable.', { out: true }],
    ]),
    reveal('Type hints', [
      ['def fare(base: int, fee: int = 20) -> int:', 'Hints say what goes in and what comes out.'],
      ['They don’t check anything', 'Python runs the code the same way; hints are for people and tools.'],
      ['Tools read them', 'Editors warn about mistakes, and checkers like mypy find bugs before you run.'],
      ['list[str], dict[str, int]', 'Hints for collections.'],
    ], { mono: true }),
    run('Hints don’t stop anything', 'Pick a call.', ['def fare(base: int, fee: int = 20) -> int:', '    return base + fee', 'print({{v}})'], ['fare(450)', 'fare(450.5)', 'fare("450", "20")'], { caption: 'Python ignores hints when it runs: "450" + "20" joins text. A checker would have warned you.' }),
    check('What does -> int in def fare(base) -> int: mean?', ['The function should give back an int', 'It converts the answer to int', 'It only accepts ints', 'It is required'], 'A hint for readers and tools.', 'It describes, it doesn’t convert.'),
    tapbug('UnboundLocalError: count is used before it is set', ['count = 0', 'def add():', '    count += 1'], [[2, 'add()', 'add(count)'], [3, 'count += 1', 'return count + 1']], 'Setting count inside makes it local, so += reads a local that doesn’t exist yet. Pass it in and return the new value.'),
    recap([
      ['🏠', 'Variables set inside a function are local'],
      ['🌐', 'global changes an outside one (use rarely)'],
      ['🏷', 'Type hints describe; tools check'],
    ]),
  ]),

  challenge('py-i-5-ch', 'Module 5 Challenge', { icon: '🛠', name: 'Function Pro' }, ['Add optional parameters with defaults', 'Take any number of values with * and **', 'Understand scope, and describe functions with type hints'], [
    mcq(1, 'Why add new parameters with defaults?', ['Old calls keep working', 'It is faster', 'Python requires it', 'To hide them'], 'Nobody else has to change their code.'),
    mcq(2, 'What does *args collect?', ['Extra values, as a tuple', 'Extra named values', 'Only the first value', 'Errors'], 'One star: values.'),
    mcq(3, 'What does **kwargs collect?', ['Extra named values, as a dict', 'A list', 'Keywords like if and for', 'Nothing'], 'Two stars: names.'),
    mcq(4, 'A variable set inside a function is…', ['Local to that function', 'Global', 'Shared by all functions', 'A constant'], 'It lives and dies with the call.'),
    mcq(5, 'Do type hints stop wrong values when the code runs?', ['No, they are for people and tools', 'Yes, always', 'Only for int', 'Only in classes'], 'Python ignores them at run time.'),
    swipe([
      ['A [] default is shared between calls', true, 'Use None instead.'],
      ['Keyword arguments can come before positional ones', false, 'Positional first.'],
      ['f(*items) spreads a list into values', true, 'The star in a call.'],
      ['Type hints change how Python runs code', false, 'They are only notes for tools.'],
    ]),
    pairs([['fee=20', 'A default'], ['*fares', 'Any number of values'], ['**details', 'Any named values'], ['-> int', 'What comes back']], 'Function tools.'),
    pickCode('Which adds an optional discount without breaking fare(450)?', ['def fare(base, discount=0):', 'def fare(base, discount):', 'def fare(discount, base):', 'def fare(*discount, base):'], 'New parameters go last, with a default.'),
    bugTask(['def add(train, saved=[]):', 'def total(fares): return sum(fares)', 'print(total(450, 300))', 'def fare(fee=20, base):'], [[1, 'saved=[]', 'saved=None'], [2, 'total(fares)', 'total(*fares)'], [4, 'fee=20, base', 'base, fee=20']], 'Lists make bad defaults, a star takes many values, and parameters with defaults come last.'),
    predictTask(['def fare(base, fee=20, discount=0):', '    return base + fee - discount', 'print(fare(300, discount=20))'], 'What does it print?', ['300', '280', '320', '260'], '300 + 20 (default fee) - 20.'),
    arrange(['def total(*fares):', '    return sum(fares)', 'print(total(450, 300))'], 'define the function, then call it', ['750']),
  ]),
];
