// Extra practice for the Python Intermediate and Advanced modules. Python predicts run in tests.
import { group, match, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · PYTHON';

export const PYTHON_V3_DRILLS: Record<string, Step[]> = {
  'py-comprehensions': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['prices = [10, 25, 40]', 'cheap = [p for p in prices if p < 30]', 'print(cheap, sum(cheap))'], answer: '[10, 25] 35', explain: 'Only the prices under 30 are kept, then added.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['names = ["ava", "reed"]', 'print({n: n.upper() for n in names})'], answer: "{'ava': 'AVA', 'reed': 'REED'}", explain: 'Each name becomes a key, with its upper-case version as the value.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['marks = [35, 72]', 'print(["pass" if m >= 40 else "fail" for m in marks])'], answer: "['fail', 'pass']", explain: 'if/else before for changes each value instead of filtering.' }),
    quiz({ prompt: 'When is a plain for loop better than a comprehension?', options: ['When each step does several things, like printing and saving', 'Never', 'When the list is short', 'When you need a list'], right: 'Right. Comprehensions are for building a collection simply.', wrong: 'Keep comprehensions for one clear transform or filter; use a loop for anything more.' }),
  ],
  'py-tuples-sets': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['a = {1, 2, 3}', 'b = {3, 4}', 'print(sorted(a - b), sorted(a | b))'], answer: '[1, 2] [1, 2, 3, 4]', explain: 'a - b keeps what is only in a; a | b combines both.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['trip = ("Dublin", "Athens", 233)', 'start, end, km = trip', 'print(end, km)'], answer: 'Athens 233', explain: 'Unpacking gives each value in the tuple a name, in order.' }),
    quiz({ prompt: 'Which is fastest for checking “has this user already voted?” among a million users?', options: ['A set', 'A list', 'A tuple', 'A string'], right: 'Right. Set membership is near-instant.', wrong: 'A list checks one by one; a set looks it up directly.' }),
    quiz({ prompt: 'What does set([3, 3, 1]) give?', options: ['{1, 3}', '[3, 1]', '{3, 3, 1}', '(1, 3)'], right: 'Right.', wrong: 'A set keeps each value once.', mono: true }),
  ],
  'py-modules': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import math', 'print(math.ceil(38 / 12), math.floor(38 / 12))'], answer: '4 3', explain: '38 / 12 is about 3.17: ceil rounds up, floor rounds down.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from collections import Counter', 'c = Counter("banana")', 'print(c["a"], c["z"])'], answer: '3 0', explain: 'Counter counts each letter; a missing key counts as 0, not an error.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from datetime import date', 'd = date(2026, 1, 31)', 'print(d.year, d.month, d.day)'], answer: '2026 1 31', explain: 'A date keeps the year, month and day as separate numbers.' }),
    quiz({ prompt: 'Which import lets you write sqrt(16) directly?', options: ['from math import sqrt', 'import math', 'import sqrt', 'from sqrt import math'], right: 'Right.', wrong: 'from module import name brings that name in on its own.', mono: true }),
  ],
  'py-json': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import json', 'data = json.loads(\'{"items": [1, 2, 3]}\')', 'print(len(data["items"]), type(data).__name__)'], answer: '3 dict', explain: 'loads turns the JSON object into a dict with a list inside.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import json', 'print(json.loads("[true, null]"))'], answer: '[True, None]', explain: 'JSON true and null become Python True and None.' }),
    quiz({ prompt: 'What type does json.dumps() return?', options: ['str', 'dict', 'list', 'bytes'], right: 'Right: JSON text.', wrong: 'dumps makes a string of JSON text.', mono: true }),
    match({ kicker: K, title: 'JSON to Python', instructions: 'Match each JSON value to what Python gives.', pairs: [['true', 'True'], ['null', 'None'], ['[1, 2]', 'a list'], ['{"a": 1}', 'a dict']], mono: true, explain: 'JSON objects become dictionaries and arrays become lists.' }),
  ],
  'py-functions-2': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def greet(name, msg="Hello"):', '    return f"{msg}, {name}"', '', 'print(greet("Ava"), "|", greet("Reed", msg="Hi"))'], answer: 'Hello, Ava | Hi, Reed', explain: 'The default is used unless you pass msg.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def info(**details):', '    return sorted(details)', '', 'print(info(city="Paris", age=19))'], answer: "['age', 'city']", explain: '**details collects the named values into a dictionary; sorted gives its keys.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['count = 0', 'def bump():', '    count = 5', '    return count', '', 'print(bump(), count)'], answer: '5 0', explain: 'count inside bump is a separate, local variable.' }),
    quiz({ prompt: 'Why is def add(item, basket=[]) a bug?', options: ['The same list is shared by every call', 'Lists can’t be parameters', 'It is too slow', 'basket must come first'], right: 'Right. Use basket=None and make a new list inside.', wrong: 'Defaults are made once, so a list default is shared by every call.' }),
  ],
  'py-oop-2': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['class A:', '    def hi(self):', '        return "A"', '', 'class B(A):', '    pass', '', 'print(B().hi())'], answer: 'A', explain: 'B inherits hi() from A without writing it.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['class Seat:', '    def __init__(self, n):', '        self.n = n', '    def __str__(self):', '        return f"Seat {self.n}"', '', 'print(f"Booked {Seat(12)}")'], answer: 'Booked Seat 12', explain: 'f-strings use __str__ too.' }),
    quiz({ prompt: 'What does super().fare() do inside ACTicket.fare()?', options: ['Calls the parent class’s fare()', 'Calls ACTicket.fare() again', 'Makes a new Ticket', 'Deletes the parent method'], right: 'Right.', wrong: 'super() reaches the parent’s version so you can build on it.' }),
    group({ kicker: K, title: 'Inherit or hold?', instructions: 'Is it “is a” or “has a”?', groups: ['Inherit', 'Hold'], items: [{ text: 'A Dog and an Animal', group: 0 }, { text: 'A Library and its Books', group: 1 }, { text: 'A Manager and an Employee', group: 0 }, { text: 'A Phone and its Battery', group: 1 }], explain: 'Inherit only for “is a”.' }),
  ],
  'py-testing': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['checks = [2 + 2 == 4, "a" * 2 == "aa", 10 // 3 == 3.33]', 'print(checks.count(True), "of", len(checks), "pass")'], answer: '2 of 3 pass', explain: '10 // 3 is 3, not 3.33, so one check fails.' }),
    quiz({ prompt: 'Which is the best name for a test?', options: ['test_student_gets_25_percent_off', 'test1', 'check', 'test_it_works'], right: 'Right: it says what behaviour is checked.', wrong: 'Name a test after the behaviour, so a failure explains itself.', mono: true }),
    quiz({ prompt: 'fare(-5) should be rejected. What should its test check?', options: ['That it raises ValueError', 'That it returns 0', 'That it prints a message', 'Nothing: negatives never happen'], right: 'Right. Wrong inputs need tests too.', wrong: 'Test that bad input is rejected with a clear error.' }),
    group({ kicker: K, title: 'Normal, edge or wrong input?', instructions: 'Sort each fare(km) test case.', groups: ['Normal', 'Edge', 'Wrong input'], items: [{ text: 'fare(10)', group: 0 }, { text: 'fare(0)', group: 1 }, { text: 'fare(-5)', group: 2 }, { text: 'fare(25)', group: 0 }, { text: 'fare(1000), the longest route', group: 1 }, { text: 'fare("ten")', group: 2 }], mono: true, explain: 'Good test sets cover all three kinds.' }),
  ],
  'py-debugging': [
    quiz({ prompt: 'In a traceback, which line do you read first?', options: ['The last line: the error and its message', 'The first line', 'The middle', 'Only the file name'], right: 'Right. Then work upwards.', wrong: 'The last line names the problem; the lines above show where.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['items = ["a", "b", "c"]', 'for i in range(len(items) - 1):', '    print(items[i], end=" ")', 'print()'], answer: 'a b', explain: 'range(2) is 0 and 1, so "c" is skipped: an off-by-one bug.' }),
    quiz({ prompt: 'Which logging level fits “only 2 seats left”?', options: ['WARNING', 'DEBUG', 'ERROR', 'CRITICAL'], right: 'Right: worth noticing, but nothing broke.', wrong: 'WARNING is for something unusual that didn’t fail.', mono: true }),
    quiz({ prompt: 'You fixed a bug. What should you add before closing the ticket?', options: ['A test that would have caught it', 'A comment saying “fixed”', 'More print statements', 'Nothing'], right: 'Right. Then it can never come back unnoticed.', wrong: 'A regression test proves the fix and guards it.' }),
  ],
  'py-apis': [
    group({ kicker: K, title: 'Retry or not?', instructions: 'Is it worth trying the request again?', groups: ['Retry later', 'Fix the request'], items: [{ text: '503 Service Unavailable', group: 0 }, { text: '400 Bad Request', group: 1 }, { text: 'A timeout', group: 0 }, { text: '404 Not Found', group: 1 }], explain: 'Server trouble may pass; a wrong request will fail every time.' }),
    quiz({ prompt: 'Which method adds a new booking on a server?', options: ['POST', 'GET', 'HEAD', 'OPTIONS'], right: 'Right.', wrong: 'GET reads; POST sends new data.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def ok(status):', '    return 200 <= status < 300', '', 'print(ok(201), ok(404), ok(500))'], answer: 'True False False', explain: 'Only 2xx codes count as success.' }),
    quiz({ prompt: 'Where should an API key go?', options: ['In an environment variable or secrets store, never in the code', 'In the code, at the top', 'In the app’s screen text', 'In a public GitHub file'], right: 'Right. Keys in code get leaked.', wrong: 'Keep secrets out of code and out of Git.' }),
  ],
  'py-generators': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def squares(n):', '    for i in range(n):', '        yield i * i', '', 'print(sum(squares(4)))'], answer: '14', explain: '0 + 1 + 4 + 9 = 14, made one value at a time.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['g = (c.upper() for c in "abc")', 'print(next(g), next(g))'], answer: 'A B', explain: 'Each next() takes one value from the generator.' }),
    quiz({ prompt: 'Why process a 2 GB file with a generator?', options: ['Only one line is in memory at a time', 'It makes the file smaller', 'Lists can’t hold strings', 'It sorts the file'], right: 'Right.', wrong: 'A generator never builds the whole list, so memory stays small.' }),
    quiz({ prompt: 'What happens when you call next() on a finished generator?', options: ['It raises StopIteration', 'It starts again', 'It returns 0', 'It returns None forever'], right: 'Right. for loops stop on it for you.', wrong: 'A finished generator raises StopIteration.', mono: true }),
  ],
  'py-decorators': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def twice(func):', '    def wrapper(x):', '        return func(func(x))', '    return wrapper', '', '@twice', 'def add3(x):', '    return x + 3', '', 'print(add3(1))'], answer: '7', explain: 'The wrapper calls add3 twice: 1 + 3 + 3.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['names = ["Zoey", "Alex", "Kaden"]', 'print(sorted(names, key=len))'], answer: "['Zoey', 'Alex', 'Kaden']", explain: 'key=len sorts by length; equal lengths keep their order.' }),
    quiz({ prompt: 'When is @cache a bad idea?', options: ['When the answer changes over time, like the current seat count', 'When the function is slow', 'When the inputs repeat', 'Never'], right: 'Right. A cache would show stale data.', wrong: 'Only cache functions that always give the same answer for the same input.' }),
    quiz({ prompt: '@logged above def pay(…) is the same as…', options: ['pay = logged(pay)', 'logged = pay(logged)', 'pay(logged)', 'logged.pay()'], right: 'Right.', wrong: 'The decorator receives the function and its result replaces it.', mono: true }),
  ],
  'py-clean-code': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from dataclasses import dataclass', '', '@dataclass', 'class Seat:', '    coach: str', '    number: int', '', 'print(Seat("B2", 14) == Seat("B2", 14))'], answer: 'True', explain: 'Dataclasses compare their fields.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def total(seats: int, fare: int) -> int:', '    return seats * fare', '', 'print(total("2", 3))'], answer: '222', explain: 'Type hints are not checked while running: "2" * 3 repeats the text. Tools like mypy would flag it.' }),
    quiz({ prompt: 'A reviewer asks you to split a 120-line function. Why?', options: ['Small functions are easier to name, test and change', 'Python can’t run long functions', 'It runs faster', 'It saves memory'], right: 'Right.', wrong: 'One job per function makes code easier to understand and test.' }),
    quiz({ prompt: 'Which comment is most useful in a code review?', options: ['“This fails for 0 seats; can we add a test?”', '“Bad code”', '“I would do it differently”', '“LGTM” without reading'], right: 'Right: specific, kind and actionable.', wrong: 'Good review comments point at a specific problem and suggest a fix.' }),
  ],
};
