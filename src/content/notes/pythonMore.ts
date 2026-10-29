// Module notes for Python Intermediate and Advanced. Every worked example is run in tests and must print `output`.
import type { ModuleNotes } from '../types';

export const PYTHON_MORE_NOTES: Record<string, ModuleNotes> = {
  // ── Intermediate ───────────────────────────────────────────────────────
  'py-comprehensions': {
    minutes: 5,
    sections: [
      { heading: 'The shape of a comprehension', body: '[expression for item in items] builds a new list: for every item, work out the expression and collect it. Read it from the middle: “for every item in items, give me expression”. It replaces the three-line pattern of making an empty list, looping and appending.', code: ['squares = [n * n for n in range(5)]   # [0, 1, 4, 9, 16]'], anim: 'comprehension' },
      { heading: 'Filtering and choosing', body: 'An if at the end keeps only matching items: [m for m in marks if m >= 40]. To change every item instead, put the choice before for: [m if m >= 40 else 0 for m in marks]. The two forms answer different questions, which is why else can only appear in the second.', code: ['passed = [m for m in marks if m >= 40]', 'capped = [min(m, 100) for m in marks]'], anim: 'comprehension' },
      { heading: 'Dictionaries, sets and when to stop', body: '{k: v for …} builds a dictionary and {x for …} a set. Comprehensions are best for one simple transform or filter. When each step needs several lines, error handling or printing, a plain for loop is clearer, and reviewers will ask for it.', code: ['price_of = {item: p for item, p in rows}'], anim: 'dict' },
    ],
    example: {
      title: 'From raw rows to a report',
      code: ['rows = [("tea", 10, 5), ("muffin", 15, 0), ("cutlet", 20, 3)]', 'in_stock = [name for name, price, qty in rows if qty > 0]', 'value = {name: price * qty for name, price, qty in rows}', 'print(in_stock)', 'print(value)'],
      walk: [
        { line: 2, text: 'Each tuple is unpacked into name, price and qty; only items with stock are kept.' },
        { line: 3, text: 'A dictionary comprehension: each name maps to price × qty.' },
        { line: 5, text: 'Muffin is still in the dictionary, with a value of 0.' },
      ],
      output: ["['tea', 'cutlet']", "{'tea': 50, 'muffin': 0, 'cutlet': 60}"],
    },
    industry: 'Data cleaning, building lookup tables from database rows and preparing API responses are full of comprehensions. Teams like them for short transforms because they read like a sentence, and avoid them for anything with side effects, like saving or sending.',
    interview: [
      { q: 'Rewrite a loop that appends x * 2 for each x in nums.', a: '[x * 2 for x in nums].' },
      { q: 'Why can’t a filter comprehension have else?', a: 'A trailing if only decides whether to keep an item; to choose a value, use "a if cond else b" before for.' },
      { q: 'What does {x % 3 for x in range(10)} give?', a: '{0, 1, 2}: a set comprehension, so repeats disappear.' },
    ],
    cheat: [
      { code: '[f(x) for x in xs]', meaning: 'transform every item' },
      { code: '[x for x in xs if ok(x)]', meaning: 'keep matching items' },
      { code: '[a if c else b for x in xs]', meaning: 'choose per item' },
      { code: '{k: v for k, v in pairs}', meaning: 'build a dictionary' },
      { code: '{x for x in xs}', meaning: 'build a set' },
    ],
  },
  'py-tuples-sets': {
    minutes: 5,
    sections: [
      { heading: 'Tuples: values that belong together', body: 'A tuple is an ordered, unchangeable group: (lat, lon), (day, month, year), or several values returned from one function. Unpacking gives each part a name: x, y = point. Because tuples can’t change, they can be dictionary keys and are safe to pass around.', code: ['def min_max(nums):', '    return min(nums), max(nums)', 'low, high = min_max([4, 9, 2])'], anim: 'tuple' },
      { heading: 'Sets: unique values, instant checks', body: 'A set stores each value once and has no order. Making a set from a list removes duplicates. The real strength is membership: "x in my_set" is about as fast for a million items as for ten, while a list checks one by one. Use a set whenever you ask “have I seen this?”.', code: ['seen = set()', 'for user in log:', '    if user in seen:', '        print("repeat:", user)', '    seen.add(user)'], anim: 'set' },
      { heading: 'Set maths', body: 'a & b gives what is in both, a | b what is in either, a - b what is in a but not in b, and a ^ b what is in exactly one. They answer questions like “who attended both days?” or “which signed-up users never paid?” in one readable line.', code: ['paid = {101, 103}', 'signed_up = {101, 102, 103}', 'print(signed_up - paid)   # {102}'], anim: 'set' },
    ],
    example: {
      title: 'Find the duplicates',
      code: ['ids = [101, 102, 101, 103, 102, 104]', 'seen, repeats = set(), set()', 'for i in ids:', '    if i in seen:', '        repeats.add(i)', '    seen.add(i)', 'print(len(ids), len(seen), sorted(repeats))'],
      walk: [
        { line: 2, text: 'Two empty sets, made in one line with tuple unpacking.' },
        { line: 4, text: 'A fast check: has this ID appeared before?' },
        { line: 7, text: '6 IDs, 4 unique, and 101 and 102 appeared twice.' },
      ],
      output: ['6 4 [101, 102]'],
    },
    industry: 'Deduplicating records, checking permissions and comparing lists of users are everyday backend tasks, and sets make them fast. Interviewers often ask for the set-based solution to “find duplicates” because it turns an O(n²) double loop into O(n).',
    interview: [
      { q: 'Why can a tuple be a dictionary key but a list can’t?', a: 'Keys must be hashable; tuples are immutable, lists can change.' },
      { q: 'How do you remove duplicates while keeping order?', a: 'list(dict.fromkeys(items)), since dictionaries keep insertion order.' },
      { q: 'What is the time cost of x in a set?', a: 'O(1) on average, because sets use hashing.' },
    ],
    cheat: [
      { code: 'a, b = (1, 2)', meaning: 'unpack a tuple' },
      { code: 'set(items)', meaning: 'unique values' },
      { code: 'x in s', meaning: 'fast membership' },
      { code: 'a & b', meaning: 'in both' },
      { code: 'a | b', meaning: 'in either' },
      { code: 'a - b', meaning: 'in a, not b' },
    ],
  },
  'py-modules': {
    minutes: 5,
    sections: [
      { heading: 'Modules are files of code', body: 'Any .py file is a module. import name loads it, and you reach what is inside with a dot: math.sqrt. from math import sqrt imports one name directly, and import pandas as pd gives a short alias. Splitting a project into modules keeps each file focused and lets teams work on different parts.', code: ['import math', 'from datetime import date'], anim: 'module' },
      { heading: 'The standard library', body: 'Python comes with hundreds of tested modules: math, random, datetime for dates, collections for Counter and defaultdict, json, csv, pathlib for file paths, statistics and more. Before writing a helper yourself, check whether the standard library already has it.', code: ['from statistics import mean', 'print(mean([72, 90, 48]))   # 70'], anim: 'module' },
      { heading: 'Packages from outside', body: 'pip install installs packages from PyPI, like requests or pandas. Projects list them in a requirements.txt (or pyproject.toml) and install them into a virtual environment, so each project has its own versions and nothing clashes.', code: ['# in a terminal', 'python -m venv .venv', 'pip install requests'], anim: 'module' },
    ],
    example: {
      title: 'Days, counts and averages',
      code: ['from collections import Counter', 'from datetime import date', 'from statistics import mean', '', 'orders = ["tea", "cutlet", "tea", "tea", "muffin"]', 'print(Counter(orders).most_common(2))', 'print((date(2026, 11, 20) - date(2026, 10, 26)).days, "days to the exam")', 'print(mean([72, 90, 48]))'],
      walk: [
        { line: 6, text: 'Counter counts every item; most_common(2) gives the top two.' },
        { line: 7, text: 'Subtracting dates gives a timedelta; .days is the number of days.' },
        { line: 8, text: 'mean is in statistics, so there is no need to write sum / len.' },
      ],
      output: ["[('tea', 3), ('cutlet', 1)]", '25 days to the exam', '70'],
    },
    industry: 'Professional Python is mostly gluing together well-tested libraries. Knowing what exists, keeping dependencies listed and pinned, and using a virtual environment per project are basics every team expects. Fewer hand-written helpers means fewer bugs.',
    interview: [
      { q: 'import math vs from math import sqrt?', a: 'The first keeps names behind math.; the second brings sqrt in directly. The first avoids name clashes.' },
      { q: 'What is a virtual environment for?', a: 'It gives each project its own installed packages and versions.' },
      { q: 'Why does a file named random.py cause trouble?', a: 'It hides the standard random module, because Python finds your file first.' },
    ],
    cheat: [
      { code: 'import math', meaning: 'use as math.sqrt' },
      { code: 'from x import y', meaning: 'use y directly' },
      { code: 'import pandas as pd', meaning: 'short alias' },
      { code: 'Counter(xs).most_common(n)', meaning: 'top n counts' },
      { code: 'pip install pkg', meaning: 'add a package' },
    ],
  },
  'py-json': {
    minutes: 5,
    sections: [
      { heading: 'Why JSON is everywhere', body: 'JSON is a text format for data that every language understands. APIs reply in it, apps save settings in it and logs often use it. It has objects ({"key": value}), arrays ([...]), strings in double quotes, numbers, true, false and null.', code: ['{"train": "Rajdhani", "seats": [12, 14], "ac": true}'], anim: 'json' },
      { heading: 'Text ↔ Python', body: 'json.loads(text) turns JSON text into Python: objects become dicts, arrays lists, true True and null None. json.dumps(data) goes the other way; indent=2 makes it readable. The file versions json.load(f) and json.dump(data, f) do the same with open files.', code: ['import json', 'data = json.loads(\'{"ok": true}\')', 'print(data["ok"])   # True'], anim: 'json' },
      { heading: 'Data from outside can surprise you', body: 'Fields may be missing, named differently or the wrong type. Use .get() with a default, check types when it matters, and catch json.JSONDecodeError for text that isn’t valid JSON. Validating what comes in is what keeps an app from crashing on someone else’s mistake.', code: ['seats = data.get("seats", 0)'], anim: 'error' },
    ],
    example: {
      title: 'Parse an API reply',
      code: ['import json', 'reply = \'{"trains": [{"no": "12951", "late": 15}, {"no": "12002", "late": 0}]}\'', 'data = json.loads(reply)', 'for t in data["trains"]:', '    status = "on time" if t["late"] == 0 else f"{t[\'late\']} min late"', '    print(t["no"], status)', 'print(json.dumps({"count": len(data["trains"]), "ok": True}))'],
      walk: [
        { line: 3, text: 'loads turns the text into a dict holding a list of dicts.' },
        { line: 5, text: 'A conditional expression picks the message for each train.' },
        { line: 7, text: 'dumps writes JSON back: True becomes true.' },
      ],
      output: ['12951 15 min late', '12002 on time', '{"count": 2, "ok": true}'],
    },
    industry: 'Backend and mobile developers read and write JSON all day: API requests and responses, webhooks, config and message queues. Teams usually validate incoming JSON against a schema (with libraries like pydantic) so bad data is rejected at the door with a clear error.',
    interview: [
      { q: 'What is the difference between json.load and json.loads?', a: 'load reads from a file object; loads reads from a string.' },
      { q: 'What do JSON null and true become in Python?', a: 'None and True.' },
      { q: 'Can JSON store a Python set or a date?', a: 'Not directly; convert sets to lists and dates to strings first.' },
    ],
    cheat: [
      { code: 'json.loads(text)', meaning: 'text → Python' },
      { code: 'json.dumps(obj, indent=2)', meaning: 'Python → readable text' },
      { code: 'json.load(f) / json.dump(obj, f)', meaning: 'files' },
      { code: 'd.get("k", default)', meaning: 'safe field access' },
      { code: 'json.JSONDecodeError', meaning: 'invalid JSON' },
    ],
  },
  'py-functions-2': {
    minutes: 6,
    sections: [
      { heading: 'Defaults keep old calls working', body: 'A parameter with a default, like student=False, becomes optional. This is how teams add features to a function used in many places: existing calls keep the old behaviour, and new calls opt in. Parameters with defaults must come after those without.', code: ['def fare(km, student=False):', '    ...'], anim: 'function' },
      { heading: 'Keyword arguments and *args', body: 'Calling fare(10, student=True) names the argument, which is clearer than a bare True. *args collects any number of positional values into a tuple, and **kwargs collects name=value pairs into a dict. A * on its own in the parameters makes everything after it keyword-only.', code: ['def total(*prices, tax=0):', '    return sum(prices) + tax'], anim: 'function' },
      { heading: 'Scope and the mutable default trap', body: 'Names created inside a function are local and disappear when it returns. Avoid changing global variables from inside functions; pass values in and return results. Never use a list or dict as a default value: it is created once and shared by every call. Use None and create it inside.', code: ['def add(item, basket=None):', '    if basket is None:', '        basket = []'], anim: 'scope' },
    ],
    example: {
      title: 'A flexible bill',
      code: ['def bill(*items, discount=0, gst=0.05):', '    subtotal = sum(items)', '    after = subtotal * (1 - discount)', '    return round(after * (1 + gst), 2)', '', 'print(bill(100, 50))', 'print(bill(100, 50, discount=0.1))', 'print(bill(200, gst=0))'],
      walk: [
        { line: 1, text: '*items collects every price; discount and gst can only be given by name.' },
        { line: 6, text: '150 with 5% GST is 157.5.' },
        { line: 7, text: '10% off first gives 135, then GST makes 141.75.' },
        { line: 8, text: 'gst=0 turns the tax off for this call only.' },
      ],
      output: ['157.5', '141.75', '200'],
    },
    industry: 'Library and API design is mostly about function signatures: sensible defaults, keyword-only options for anything that could be confused, and no hidden shared state. The mutable default bug has reached real products, which is why linters warn about it.',
    interview: [
      { q: 'What is wrong with def f(x, items=[])?', a: 'The same list is shared across calls; use items=None and create a new list inside.' },
      { q: 'What is the type of args in def f(*args)?', a: 'A tuple.' },
      { q: 'How do you force an argument to be passed by name?', a: 'Put it after * in the signature: def f(a, *, flag=False).' },
    ],
    cheat: [
      { code: 'def f(a, b=2):', meaning: 'b is optional' },
      { code: 'f(a=1, b=3)', meaning: 'keyword arguments' },
      { code: 'def f(*args):', meaning: 'any number of values' },
      { code: 'def f(**kwargs):', meaning: 'any name=value pairs' },
      { code: 'def f(a, *, opt):', meaning: 'opt must be named' },
    ],
  },
  'py-oop-2': {
    minutes: 6,
    sections: [
      { heading: 'Objects that explain themselves', body: '__str__ returns the text print shows; __repr__ returns a developer view, used in the console and in lists. Defining them makes logs and debugging far easier. Other “dunder” methods let objects work with operators: __eq__ for ==, __lt__ for sorting, __len__ for len().', code: ['def __str__(self):', '    return f"{self.name} · {self.km} km"'], anim: 'classObject' },
      { heading: 'Inheritance and super()', body: 'class ACTicket(Ticket) inherits every attribute and method. Override a method by defining it again, and call super().method() to reuse the parent’s version. Inheritance means a child can be used anywhere the parent is expected, so methods must keep the same meaning.', code: ['class ACTicket(Ticket):', '    def fare(self):', '        return super().fare() * 2'], anim: 'classObject' },
      { heading: 'Prefer composition', body: 'Inheritance fits “is a” relationships. For “has a”, store the other object as an attribute: a Train has a list of Coach objects. Deep inheritance chains are hard to change, so teams usually keep them shallow and build behaviour by combining small classes.', code: ['class Train:', '    def __init__(self, coaches):', '        self.coaches = coaches'], anim: 'classObject' },
    ],
    example: {
      title: 'A train of coaches',
      code: ['class Coach:', '    def __init__(self, kind, seats):', '        self.kind, self.seats = kind, seats', '    def __repr__(self):', '        return f"Coach({self.kind}, {self.seats})"', '', 'class Train:', '    def __init__(self, number, coaches):', '        self.number, self.coaches = number, coaches', '    def capacity(self):', '        return sum(c.seats for c in self.coaches)', '', 't = Train("12951", [Coach("AC", 64), Coach("Sleeper", 72)])', 'print(t.coaches)', 'print(t.capacity())'],
      walk: [
        { line: 4, text: '__repr__ decides how a Coach looks inside a printed list.' },
        { line: 9, text: 'Train has coaches: composition, not inheritance.' },
        { line: 11, text: 'capacity asks each coach for its seats and adds them.' },
      ],
      output: ['[Coach(AC, 64), Coach(Sleeper, 72)]', '136'],
    },
    industry: 'Domain models (users, orders, payments) are classes in most backends. Reviewers check that inheritance is only used for true “is a” relationships, that objects have a readable repr for logs, and that each class has one clear responsibility.',
    interview: [
      { q: 'Difference between __str__ and __repr__?', a: '__str__ is for users (print); __repr__ is an unambiguous developer view, used in the console and inside containers.' },
      { q: 'What does super() do?', a: 'Calls the parent class’s version of a method.' },
      { q: 'Composition vs inheritance?', a: 'Inheritance for “is a”; composition (holding another object) for “has a”. Composition is usually more flexible.' },
    ],
    cheat: [
      { code: 'class B(A):', meaning: 'B inherits from A' },
      { code: 'super().f()', meaning: 'parent’s version' },
      { code: '__str__ / __repr__', meaning: 'how it prints' },
      { code: '__eq__', meaning: 'how == works' },
      { code: 'self.parts = [...]', meaning: 'composition' },
    ],
  },

  // ── Advanced ───────────────────────────────────────────────────────────
  'py-testing': {
    minutes: 6,
    sections: [
      { heading: 'Tests are code that checks code', body: 'A test calls your function with known inputs and asserts the result. assert x == y passes silently or fails loudly. unittest (built in) and pytest (most popular in industry) run many tests and report which failed and why. Tests run in seconds, every time code changes.', code: ['def test_fare():', '    assert fare(10) == 40'], anim: 'test' },
      { heading: 'Choosing what to test', body: 'Cover the normal case, the edges (0, empty, the maximum), and wrong inputs that should raise errors. Each test should check one behaviour and be named after it, so a failure tells you what broke. Tests must not depend on each other or on the order they run.', code: ['def test_zero_km_costs_base_fare():', '    assert fare(0) == 20'], anim: 'test' },
      { heading: 'Tests in a team', body: 'Continuous integration (CI) runs every test on every pull request; a red build blocks the merge. When a bug is found, first write a test that fails because of it, then fix the code. That test stays forever, so the bug can’t come back unnoticed.', code: ['# CI: pytest → 41 passed, 1 failed → merge blocked'], anim: 'error' },
    ],
    example: {
      title: 'A tiny test runner',
      code: ['def discount(total):', '    if total >= 2000:', '        return int(total * 0.8)', '    if total >= 500:', '        return int(total * 0.9)', '    return total', '', 'cases = [(400, 400), (500, 450), (2000, 1600), (1999, 1799)]', 'for given, want in cases:', '    got = discount(given)', '    print("ok  " if got == want else "FAIL", given, "->", got)'],
      walk: [
        { line: 2, text: 'The bigger threshold is checked first, so 2000 gets 20%, not 10%.' },
        { line: 8, text: 'Each case pairs an input with the expected answer, including the exact edges 500 and 2000.' },
        { line: 11, text: 'Real tools do this for you and also show the line that failed.' },
      ],
      output: ['ok   400 -> 400', 'ok   500 -> 450', 'ok   2000 -> 1600', 'ok   1999 -> 1799'],
    },
    industry: 'Most companies won’t merge code without tests, and many interviews include writing a few. pytest with plain asserts is the common choice; CI (for example GitHub Actions) runs the tests automatically. Test coverage is a team habit, not a one-off task.',
    interview: [
      { q: 'What makes a good unit test?', a: 'It checks one behaviour, is independent, runs fast and is named after what it checks.' },
      { q: 'How do you test that a function raises an error?', a: 'In pytest: with pytest.raises(ValueError): f(-1). In unittest: self.assertRaises.' },
      { q: 'What is a regression test?', a: 'A test written for a bug that was fixed, so it can’t silently return.' },
    ],
    cheat: [
      { code: 'assert a == b, "msg"', meaning: 'fail with msg if not equal' },
      { code: 'def test_…():', meaning: 'pytest finds it' },
      { code: 'pytest.raises(E)', meaning: 'expect an error' },
      { code: 'self.assertEqual(a, b)', meaning: 'unittest check' },
      { code: 'python -m pytest', meaning: 'run the tests' },
    ],
  },
  'py-debugging': {
    minutes: 6,
    sections: [
      { heading: 'Reading a traceback', body: 'Start at the bottom: the last line names the error and its message. Above it, each pair of lines shows a file, line number and function, from where the program started down to where it failed. Your own files are usually the ones to look at; library frames show the path the call took.', code: ['  File "import.py", line 7, in process', "KeyError: 'email'"], anim: 'error' },
      { heading: 'A method that always works', body: 'Reproduce the bug with the smallest input you can. Form a guess and check it by inspecting values just before the failing line (print, or a debugger such as breakpoint()). Halve the search area each time. Fix the cause, not the symptom, then add a test.', code: ['breakpoint()   # pause here and inspect variables'], anim: 'error' },
      { heading: 'Logging instead of print', body: 'The logging module writes messages with a level (DEBUG, INFO, WARNING, ERROR, CRITICAL) and can send them to files or monitoring services. Production keeps INFO and above; while debugging you turn on DEBUG. Log enough context to understand a problem later, but never passwords or personal data.', code: ['import logging', 'log = logging.getLogger(__name__)', 'log.warning("only %d seats left", seats)'], anim: 'file' },
    ],
    example: {
      title: 'Fix it, and keep a record',
      code: ['import logging, sys', 'logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s", stream=sys.stdout)', 'rows = [{"email": "A@x.com"}, {"name": "Ravi"}, {"email": "Z@x.com"}]', 'emails = []', 'for i, row in enumerate(rows):', '    email = row.get("email")', '    if not email:', '        logging.warning("row %d has no email, skipped", i)', '        continue', '    emails.append(email.lower())', 'logging.info("imported %d of %d rows", len(emails), len(rows))'],
      walk: [
        { line: 2, text: 'Log to the screen with the level shown, so the output is easy to read here.' },
        { line: 6, text: '.get avoids the KeyError that crashed the original import.' },
        { line: 8, text: 'The bad row is recorded with its position, then skipped.' },
        { line: 11, text: 'A summary line tells the team how the run went.' },
      ],
      output: ['WARNING row 1 has no email, skipped', 'INFO imported 2 of 3 rows'],
    },
    industry: 'Developers spend a large part of their time debugging, often in systems they didn’t write. Production errors arrive through logs and monitoring tools with tracebacks attached. Calm, methodical debugging and clear log messages are valued as much as writing new code.',
    interview: [
      { q: 'How do you debug a bug you can’t reproduce?', a: 'Gather the exact input and environment from logs, add logging around the suspect code, and try to recreate those conditions.' },
      { q: 'Why use logging instead of print?', a: 'Levels, timestamps and destinations can be configured, and messages can be kept or filtered in production.' },
      { q: 'What does breakpoint() do?', a: 'It pauses the program in the debugger so you can inspect variables and step through.' },
    ],
    cheat: [
      { code: 'last line of a traceback', meaning: 'the error and message' },
      { code: 'breakpoint()', meaning: 'pause in the debugger' },
      { code: 'logging.basicConfig(level=…)', meaning: 'set up logging' },
      { code: 'log.info / warning / error', meaning: 'levels' },
      { code: 'log.exception("…")', meaning: 'log an error with its traceback' },
    ],
  },
  'py-apis': {
    minutes: 6,
    sections: [
      { heading: 'Requests and responses', body: 'An API call is an HTTP request: a method (GET reads, POST creates, PUT/PATCH updates, DELETE removes), a URL, headers (like an API key) and sometimes a JSON body. The response has a status code, headers and a body. REST APIs organise URLs around things: /trains/12951/status.', code: ['GET /trains/12951/status', '→ 200 {"late_by": 15}'], anim: 'api' },
      { heading: 'Status codes tell you who acts', body: '2xx means success (200 OK, 201 Created). 4xx means the request was wrong: 400 bad input, 401 not signed in, 403 not allowed, 404 not found, 429 too many requests. 5xx means the server failed. Only some errors are worth retrying: 5xx, 429 and timeouts, with a pause in between.', code: ['if resp.status_code == 429:', '    time.sleep(2)   # then try again'], anim: 'api' },
      { heading: 'Calling APIs safely', body: 'With the requests library: requests.get(url, timeout=5). Always set a timeout, check the status (resp.raise_for_status()), then read resp.json(). Keep API keys in environment variables, never in code or Git. Respect rate limits, and cache answers that don’t change often.', code: ['resp = requests.get(url, headers={"Authorization": f"Bearer {key}"}, timeout=5)'], anim: 'json' },
    ],
    example: {
      title: 'Turn replies into messages',
      code: ['def show(status, body):', '    if 200 <= status < 300:', '        return f"{body[\'no\']}: {body[\'late\']} min late" if body["late"] else f"{body[\'no\']}: on time"', '    if status == 404:', '        return "No such train"', '    if status == 429 or status >= 500:', '        return "Busy, retrying soon"', '    return "Request problem"', '', 'for s, b in [(200, {"no": "12951", "late": 15}), (200, {"no": "12002", "late": 0}), (404, {}), (503, {}), (400, {})]:', '    print(s, show(s, b))'],
      walk: [
        { line: 2, text: 'Any 2xx is success; only then is the body read.' },
        { line: 6, text: 'Rate limits and server errors are the cases worth retrying.' },
        { line: 8, text: 'Everything else is a request the caller must fix.' },
      ],
      output: ['200 12951: 15 min late', '200 12002: on time', '404 No such train', '503 Busy, retrying soon', '400 Request problem'],
    },
    industry: 'Payments, maps, SMS, login and AI features are all third-party APIs. Production code wraps each API in one small client module with timeouts, retries with back-off, logging and tests that use fake responses, so the rest of the app never talks to the network directly.',
    interview: [
      { q: 'GET vs POST?', a: 'GET reads data and should not change anything; POST sends data to create something.' },
      { q: 'Which errors should you retry?', a: '5xx, 429 and timeouts, with increasing waits. Not 4xx like 400 or 404.' },
      { q: 'Where should API keys live?', a: 'In environment variables or a secrets manager, never in the code or the repository.' },
    ],
    cheat: [
      { code: 'requests.get(url, timeout=5)', meaning: 'read, with a timeout' },
      { code: 'requests.post(url, json=data)', meaning: 'send JSON' },
      { code: 'resp.status_code', meaning: '200, 404, 500…' },
      { code: 'resp.raise_for_status()', meaning: 'error for 4xx/5xx' },
      { code: 'resp.json()', meaning: 'body as Python' },
      { code: 'os.environ["API_KEY"]', meaning: 'read a secret' },
    ],
  },
  'py-generators': {
    minutes: 6,
    sections: [
      { heading: 'Iterators and generators', body: 'Anything you can loop over is iterable; looping asks it for one value at a time with next(). A generator function uses yield to produce values on demand: each next() runs the function up to the next yield and pauses there, keeping its local variables for the next time.', code: ['def countdown(n):', '    while n > 0:', '        yield n', '        n -= 1'], anim: 'generator' },
      { heading: 'Memory stays small', body: 'A list of ten million numbers holds all of them in memory at once. A generator holds one. Generator expressions use round brackets: sum(x * x for x in data). This is how Python processes files and streams far bigger than the computer’s memory.', code: ['total = sum(len(line) for line in open("huge.log"))'], anim: 'generator' },
      { heading: 'Pipelines and their catch', body: 'Generators chain into pipelines: read lines → keep errors → parse → take the first 100, each step passing one item along. The catch: a generator can be used up only once. After it is exhausted it gives nothing, so turn it into a list if you need the values twice.', code: ['errors = (l for l in lines if "ERROR" in l)', 'first = list(itertools.islice(errors, 100))'], anim: 'loop' },
    ],
    example: {
      title: 'A lazy log pipeline',
      code: ['def read(lines):', '    for line in lines:', '        yield line.strip()', '', 'def errors(lines):', '    for line in lines:', '        if line.startswith("ERROR"):', '            yield line.split(" ", 1)[1]', '', 'log = ["INFO ok", " ERROR card declined", "ERROR gateway timeout ", "INFO ok"]', 'pipeline = errors(read(log))', 'print(next(pipeline))', 'print(list(pipeline))', 'print(list(pipeline))'],
      walk: [
        { line: 11, text: 'Nothing runs yet: the pipeline is just set up.' },
        { line: 12, text: 'next() pulls lines through read and errors until the first ERROR.' },
        { line: 13, text: 'list() takes everything left.' },
        { line: 14, text: 'The generator is used up, so the second list is empty.' },
      ],
      output: ['card declined', "['gateway timeout']", '[]'],
    },
    industry: 'Data engineers stream large files, database results and event feeds through generator pipelines. Libraries rely on the same idea: file objects, csv.reader, database cursors and many APIs return iterators instead of full lists, so programs stay fast and light.',
    interview: [
      { q: 'What does yield do?', a: 'It hands a value to the caller and pauses the function, resuming from there on the next request.' },
      { q: 'List comprehension vs generator expression?', a: 'Square brackets build the whole list now; round brackets produce values one at a time.' },
      { q: 'What happens when a generator has no more values?', a: 'next() raises StopIteration; for loops stop on it automatically.' },
    ],
    cheat: [
      { code: 'yield x', meaning: 'produce x and pause' },
      { code: 'next(gen)', meaning: 'get the next value' },
      { code: '(f(x) for x in xs)', meaning: 'generator expression' },
      { code: 'itertools.islice(g, n)', meaning: 'first n values' },
      { code: 'list(gen)', meaning: 'all remaining values' },
    ],
  },
  'py-decorators': {
    minutes: 6,
    sections: [
      { heading: 'Functions are values', body: 'Python functions can be stored in variables, passed to other functions and returned from them. sorted(names, key=len) passes len in. A function defined inside another can remember the outer variables even after the outer one returns; this is called a closure, and decorators are built on it.', code: ['def multiplier(n):', '    def times(x):', '        return x * n', '    return times'], anim: 'function' },
      { heading: 'Writing a decorator', body: 'A decorator is a function that takes a function and returns a new one wrapping it. @logged above def pay is shorthand for pay = logged(pay). The wrapper takes *args and **kwargs so it works with any function, and functools.wraps keeps the original name and docstring.', code: ['def logged(func):', '    @functools.wraps(func)', '    def wrapper(*args, **kwargs):', '        print("calling", func.__name__)', '        return func(*args, **kwargs)', '    return wrapper'], anim: 'decorator' },
      { heading: 'Caching with functools', body: '@functools.cache (and lru_cache with a size limit) stores results by argument, so repeat calls return instantly. It is perfect for pure functions that always give the same output for the same input, and dangerous for data that changes, such as live seat counts.', code: ['@functools.cache', 'def route_cost(a, b):', '    ...'], anim: 'recursion' },
    ],
    example: {
      title: 'Timing and caching together',
      code: ['import functools', '', 'calls = []', '', 'def tracked(func):', '    @functools.wraps(func)', '    def wrapper(*args):', '        calls.append(func.__name__)', '        return func(*args)', '    return wrapper', '', '@functools.cache', '@tracked', 'def fare(km):', '    return 20 + km * 2', '', 'print(fare(10), fare(10), fare(5))', 'print(calls, fare.__name__)'],
      walk: [
        { line: 12, text: 'Decorators apply bottom-up: tracked wraps fare, then cache wraps that.' },
        { line: 17, text: 'The second fare(10) comes from the cache, so tracked never sees it.' },
        { line: 18, text: 'Only two real calls were made, and wraps kept the name fare.' },
      ],
      output: ['40 40 30', "['fare', 'fare'] fare"],
    },
    industry: 'Web frameworks use decorators for routes (@app.get("/trains")) and permissions (@login_required); test tools use them for fixtures; teams write them for logging, timing, retries and caching. Knowing how they work makes framework code readable instead of magic.',
    interview: [
      { q: 'What does @decorator above a function do?', a: 'It replaces the function with decorator(function).' },
      { q: 'Why use functools.wraps?', a: 'So the wrapper keeps the original function’s name, docstring and other metadata.' },
      { q: 'When is caching a bad idea?', a: 'When results depend on changing data or have side effects; the cache would return stale answers.' },
    ],
    cheat: [
      { code: '@dec', meaning: 'f = dec(f)' },
      { code: 'def wrapper(*a, **k):', meaning: 'accept any arguments' },
      { code: '@functools.wraps(func)', meaning: 'keep the name' },
      { code: '@functools.cache', meaning: 'remember results' },
      { code: '@lru_cache(maxsize=128)', meaning: 'cache with a limit' },
    ],
  },
  'py-clean-code': {
    minutes: 6,
    sections: [
      { heading: 'Names and small functions', body: 'Good code reads like a description of what it does: booking_total(seats, fare) instead of calc(a, b). Each function does one job, short enough to see at once. Follow PEP 8, Python’s style guide, and let a formatter (black or ruff) handle layout so reviews focus on logic.', code: ['def is_full(train):', '    return train.free() == 0'], anim: 'function' },
      { heading: 'Type hints', body: 'def total(seats: int, fare: int) -> int: documents what goes in and out. Python ignores hints while running, but editors autocomplete with them and type checkers like mypy catch mistakes such as passing text where a number is expected, before the code ever runs.', code: ['def total(seats: int, fare: int) -> int:', '    return seats * fare'], anim: 'types' },
      { heading: 'Dataclasses and reviews', body: '@dataclass writes __init__, __repr__ and __eq__ from typed fields, removing boilerplate. In code review, a teammate reads your change before it merges: they check correctness, tests, naming, edge cases and security. Good comments are specific and kind, and point to a fix.', code: ['@dataclass', 'class Booking:', '    name: str', '    seats: int = 1'], anim: 'classObject' },
    ],
    example: {
      title: 'Before and after a review',
      code: ['from dataclasses import dataclass', '', '@dataclass', 'class Booking:', '    name: str', '    seats: int', '    fare: int', '', 'def booking_total(b: Booking, student: bool = False) -> int:', '    total = b.seats * b.fare', '    return round(total * 0.75) if student else total', '', 'b = Booking("Asha", 2, 100)', 'print(b)', 'print(booking_total(b), booking_total(b, student=True))'],
      walk: [
        { line: 3, text: '@dataclass writes __init__ and a readable repr from the fields.' },
        { line: 9, text: 'Type hints and a clear name replace a comment explaining what calc(a, b, c) meant.' },
        { line: 14, text: 'The repr shows every field: great in logs.' },
      ],
      output: ["Booking(name='Asha', seats=2, fare=100)", '200 150'],
    },
    industry: 'Code is read many more times than it is written. Teams enforce style with formatters and linters in CI, require reviews before merging, and expect type hints in new code. Being easy to review is one of the most valued skills in a junior developer.',
    interview: [
      { q: 'Do type hints make Python check types at runtime?', a: 'No. They are used by editors and tools like mypy; Python itself ignores them when running.' },
      { q: 'What does @dataclass generate?', a: '__init__, __repr__ and __eq__ (and more options like ordering or frozen objects).' },
      { q: 'What do you look for in a code review?', a: 'Correctness, tests, clear names, edge cases, security issues and whether it is easy to change later.' },
    ],
    cheat: [
      { code: 'snake_case names', meaning: 'PEP 8 style' },
      { code: 'def f(x: int) -> str:', meaning: 'type hints' },
      { code: '@dataclass', meaning: 'records without boilerplate' },
      { code: 'field: int = 0', meaning: 'a default value' },
      { code: 'ruff / black / mypy', meaning: 'lint, format, type-check' },
    ],
  },
};
