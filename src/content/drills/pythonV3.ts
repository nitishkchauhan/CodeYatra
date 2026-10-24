// Extra practice for the Python Intermediate and Advanced modules. Python predicts run in tests.
import { group, match, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · PYTHON';

export const PYTHON_V3_DRILLS: Record<string, Step[]> = {
  'py-comprehensions': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['prices = [10, 25, 40]', 'cheap = [p for p in prices if p < 30]', 'print(cheap, sum(cheap))'], answer: '[10, 25] 35', explain: 'Only the prices under 30 are kept, then added.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['names = ["asha", "ravi"]', 'print({n: n.upper() for n in names})'], answer: "{'asha': 'ASHA', 'ravi': 'RAVI'}", explain: 'Each name becomes a key, with its upper-case version as the value.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['marks = [35, 72]', 'print(["pass" if m >= 40 else "fail" for m in marks])'], answer: "['fail', 'pass']", explain: 'if/else before for changes each value instead of filtering.' }),
    quiz({ prompt: 'When is a plain for loop better than a comprehension?', options: ['When each step does several things, like printing and saving', 'Never', 'When the list is short', 'When you need a list'], right: 'Right. Comprehensions are for building a collection simply.', wrong: 'Keep comprehensions for one clear transform or filter; use a loop for anything more.' }),
  ],
  'py-tuples-sets': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['a = {1, 2, 3}', 'b = {3, 4}', 'print(sorted(a - b), sorted(a | b))'], answer: '[1, 2] [1, 2, 3, 4]', explain: 'a - b keeps what is only in a; a | b combines both.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['trip = ("Delhi", "Agra", 233)', 'start, end, km = trip', 'print(end, km)'], answer: 'Agra 233', explain: 'Unpacking gives each value in the tuple a name, in order.' }),
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
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def greet(name, msg="Namaste"):', '    return f"{msg}, {name}"', '', 'print(greet("Asha"), "|", greet("Ravi", msg="Hi"))'], answer: 'Namaste, Asha | Hi, Ravi', explain: 'The default is used unless you pass msg.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def info(**details):', '    return sorted(details)', '', 'print(info(city="Pune", age=19))'], answer: "['age', 'city']", explain: '**details collects the named values into a dictionary; sorted gives its keys.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['count = 0', 'def bump():', '    count = 5', '    return count', '', 'print(bump(), count)'], answer: '5 0', explain: 'count inside bump is a separate, local variable.' }),
    quiz({ prompt: 'Why is def add(item, basket=[]) a bug?', options: ['The same list is shared by every call', 'Lists can’t be parameters', 'It is too slow', 'basket must come first'], right: 'Right. Use basket=None and make a new list inside.', wrong: 'Defaults are made once, so a list default is shared by every call.' }),
  ],
  'py-oop-2': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['class A:', '    def hi(self):', '        return "A"', '', 'class B(A):', '    pass', '', 'print(B().hi())'], answer: 'A', explain: 'B inherits hi() from A without writing it.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['class Seat:', '    def __init__(self, n):', '        self.n = n', '    def __str__(self):', '        return f"Seat {self.n}"', '', 'print(f"Booked {Seat(12)}")'], answer: 'Booked Seat 12', explain: 'f-strings use __str__ too.' }),
    quiz({ prompt: 'What does super().fare() do inside ACTicket.fare()?', options: ['Calls the parent class’s fare()', 'Calls ACTicket.fare() again', 'Makes a new Ticket', 'Deletes the parent method'], right: 'Right.', wrong: 'super() reaches the parent’s version so you can build on it.' }),
    group({ kicker: K, title: 'Inherit or hold?', instructions: 'Is it “is a” or “has a”?', groups: ['Inherit', 'Hold'], items: [{ text: 'A Dog and an Animal', group: 0 }, { text: 'A Library and its Books', group: 1 }, { text: 'A Manager and an Employee', group: 0 }, { text: 'A Phone and its Battery', group: 1 }], explain: 'Inherit only for “is a”.' }),
  ],
};
