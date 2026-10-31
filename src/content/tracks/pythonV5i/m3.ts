// Python Intermediate · Module 3 · The standard library. Lesson 3.1 keeps the old module id (py-modules).
// Time zones use fixed offsets (timezone(timedelta(…))), which work everywhere; zoneinfo is mentioned, not run.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

export const PY_I_M3: Lesson[] = [
  lesson('py-modules', 'import and your own modules', 5, [
    atWork('Megan', ['Felix keeps copying the same fare function into every script. When the fee changed, he missed two copies.', 'Put it in one file and import it everywhere. Python also comes with hundreds of ready-made modules.']),
    reveal('Three ways to import', [
      ['import math', 'Use it as math.sqrt(16).'],
      ['from math import sqrt', 'Use sqrt(16) directly.'],
      ['import statistics as st', 'A shorter name: st.mean(…).'],
      ['Your own file', 'fares.py next to your script: import fares, then fares.with_fee(450).'],
    ], { mono: true }),
    run('The standard library', 'Pick a module to try.', ['import math, statistics', 'fares = [450, 300, 200, 120]', 'print({{v}})'], ['math.ceil(450 / 100)', 'statistics.mean(fares)', 'statistics.median(fares)', 'math.sqrt(144)', 'round(math.pi, 2)'], { caption: 'These come with Python: nothing to install.' }),
    explore('Your own module', ['# fares.py', 'FEE = 20', 'def with_fee(fare):', '    return fare + FEE', '# report.py', 'import fares', 'print(fares.with_fee(450))'], [
      [2, 'A setting, written once.'],
      [3, 'The function lives in one file.'],
      [6, 'Another file imports it by its file name, without .py.'],
      [7, 'And reaches inside with a dot. Change FEE once and every script gets it.'],
    ], { minTaps: 3 }),
    reveal('Packages from the internet', [
      ['pip install requests', 'pip downloads packages other people wrote, from PyPI.'],
      ['python -m venv .venv', 'A virtual environment: each project gets its own set of packages.'],
      ['requirements.txt', 'The list of packages a project needs, so others can install the same ones.'],
      ['In this app', 'Lessons use only the standard library, so they run on your phone.'],
    ], { mono: true }),
    check('After from math import sqrt, how do you call it?', ['sqrt(16)', 'math.sqrt(16)', 'math(sqrt, 16)', 'import sqrt(16)'], 'from … import brings the name itself in.', 'No module name needed.', { mono: true }),
    tapbug("NameError: name 'math' is not defined", ['from math import ceil', 'print(math.ceil(4.2))'], [[2, 'math.ceil', 'ceil']], 'from … import brought in only the name ceil, not math itself.'),
    recap([
      ['📥', 'import a module, or from a module import a name'],
      ['🗂', 'Your own .py files are modules too'],
      ['📦', 'pip installs packages from PyPI'],
    ]),
  ]),

  lesson('py-i-3-2', 'Dates, times and maths', 5, [
    atWork('Felix', ['The booking files have dates as text: "2026-11-02 09:15". The desk wants the weekday, and the new time when a train is late.', 'datetime turns text into real dates you can do maths with.']),
    run('Read a date', 'Pick what to print.', ['from datetime import datetime, timedelta', 'dep = datetime.strptime("2026-11-02 09:15", "%Y-%m-%d %H:%M")', 'print({{v}})'], ['dep', 'dep.strftime("%A %d %B")', 'dep.strftime("%H:%M")', 'dep + timedelta(minutes=12)', '(dep - datetime(2026, 10, 31)).days'], { caption: 'strptime: text → date. strftime: date → text. timedelta: an amount of time.' }),
    reveal('Format codes', [
      ['%Y-%m-%d', '2026-11-02'],
      ['%H:%M', '09:15, on a 24-hour clock'],
      ['%A %d %B', 'Monday 02 November'],
      ['%I:%M %p', '09:15 AM'],
    ], { mono: true }),
    predict('Late by how much?', ['from datetime import datetime, timedelta', 'due = datetime(2026, 11, 2, 9, 15)', 'late = due + timedelta(minutes=12)', 'shown = late.strftime("%H:%M")', 'print("Now arriving " + shown)'], [
      [4, 'What will shown be?', ["'09:27'", "'09:15'", "'21:27'"], '12 minutes after 09:15, on a 24-hour clock.', { var: 'shown' }],
    ]),
    toggleRun('From UTC to station time', [
      ['UTC', ['from datetime import datetime, timezone', 'dep = datetime(2026, 11, 2, 3, 45, tzinfo=timezone.utc)', 'print(dep.strftime("%H:%M %Z"))'], 'Servers keep times in UTC.', ['03:45 UTC']],
      ['India', ['from datetime import datetime, timedelta, timezone', 'india = timezone(timedelta(hours=5, minutes=30))', 'dep = datetime(2026, 11, 2, 3, 45, tzinfo=timezone.utc)', 'print(dep.astimezone(india).strftime("%H:%M"))'], 'The same moment, 5 hours 30 minutes ahead. (zoneinfo.ZoneInfo gives named zones that know about summer time.)', ['09:15']],
    ]),
    check('Which gives 5 for 4.2 (always rounding up)?', ['math.ceil(4.2)', 'math.floor(4.2)', 'round(4.2)', 'int(4.2)'], 'ceil rounds up, floor rounds down, round goes to the nearest.', 'A ceiling is up.', { mono: true }),
    tapbug('ValueError: time data does not match format', ['dep = datetime.strptime("02/11/2026", "%Y-%m-%d")'], [[1, '"%Y-%m-%d"', '"%d/%m/%Y"']], 'The format must describe the text exactly: day/month/year, with slashes.'),
    recap([
      ['📅', 'strptime reads dates, strftime writes them'],
      ['⏱', 'timedelta adds or takes away time'],
      ['🌍', 'astimezone shows a moment on another clock'],
    ]),
  ]),

  lesson('py-i-3-3', 'Counter and defaultdict', 4, [
    atWork('Megan', ['End of the day: which routes sold most? The booking file is just a long list of route names.', 'collections.Counter counts everything in one line.']),
    run('Count the routes', 'Pick a question. Which route sold most?', ['from collections import Counter', 'sold = ["Harbour", "Airport", "Harbour", "Hillview", "Harbour", "Airport"]', 'counts = Counter(sold)', 'print({{v}})'], ['counts', 'counts["Harbour"]', 'counts["Riverside"]', 'counts.most_common(2)', 'counts.most_common(1)'], { goal: "[('Harbour', 3)]", caption: 'A missing key counts as 0, not an error.' }),
    toggleRun('Grouping without KeyError', [
      ['Plain dict', ['by_route = {}', 'by_route["Harbour"].append("90101")', 'print(by_route)'], 'The key isn’t there yet, so append fails.', ["KeyError: 'Harbour'"]],
      ['defaultdict', ['from collections import defaultdict', 'by_route = defaultdict(list)', 'by_route["Harbour"].append("90101")', 'print(dict(by_route))'], 'A missing key starts as an empty list by itself.', ["{'Harbour': ['90101']}"]],
    ]),
    predict('Adding up seats', ['from collections import Counter', 'seats = Counter()', 'seats["Harbour"] += 2', 'seats["Airport"] += 1', 'seats["Harbour"] += 3', 'top = seats.most_common(1)[0]', 'print(top)'], [
      [5, 'What will seats be after this line?', ["Counter({'Harbour': 5, 'Airport': 1})", "Counter({'Harbour': 3, 'Airport': 1})", "Counter({'Airport': 1, 'Harbour': 2})"], '2 + 3 seats for Harbour.', { var: 'seats' }],
      [6, 'What will top be?', ["('Harbour', 5)", "'Harbour'", "('Airport', 1)"], 'most_common gives (item, count) pairs.', { var: 'top' }],
    ]),
    check('What does Counter("banana")["a"] give?', ['3', '2', '1', '0'], 'Counting letters: b, a, n, a, n, a.', 'Count the a’s.', { mono: true }),
    tapbug("KeyError: 'Riverside'", ['totals = {}', 'totals["Riverside"] += 2'], [[2, 'totals["Riverside"] += 2', 'totals["Riverside"] = totals.get("Riverside", 0) + 2']], 'The key doesn’t exist yet. Start from 0 with get, or use a Counter.'),
    recap([
      ['🔢', 'Counter counts things in one line'],
      ['🏆', 'most_common(n) ranks them'],
      ['🧺', 'defaultdict(list) starts missing keys empty'],
    ]),
  ]),

  challenge('py-i-3-ch', 'Module 3 Challenge', { icon: '📚', name: 'Library Card' }, ['Import modules, including your own', 'Read, write and change dates and times', 'Count and group with collections'], [
    mcq(1, 'Which imports only sqrt?', ['from math import sqrt', 'import sqrt from math', 'import math.sqrt only', 'using math.sqrt'], 'from … import name.', { mono: true }),
    mcq(2, 'What does strptime do?', ['Turns text into a datetime', 'Turns a datetime into text', 'Waits a while', 'Gets today’s date'], 'p for parse.'),
    mcq(3, 'Which adds 15 minutes to a datetime d?', ['d + timedelta(minutes=15)', 'd + 15', 'd.add(15)', 'd.minutes += 15'], 'timedelta is an amount of time.', { mono: true }),
    mcq(4, 'What does Counter(words).most_common(1) give?', ['A list with the top item and its count', 'The total number of words', 'The rarest word', 'A set of words'], '[(item, count)]'),
    mcq(5, 'What does defaultdict(list) do with a missing key?', ['Starts it as an empty list', 'Raises KeyError', 'Returns None', 'Deletes the dictionary'], 'No KeyError.'),
    swipe([
      ['pip installs packages from the internet', true, 'From PyPI.'],
      ['statistics needs pip install', false, 'It comes with Python.'],
      ['strftime turns a date into text', true, 'f for format.'],
      ['A plain dict creates missing keys by itself', false, 'That is defaultdict.'],
    ]),
    pairs([['math.ceil', 'Round up'], ['timedelta', 'An amount of time'], ['Counter', 'Count things'], ['defaultdict', 'Missing keys start empty']], 'Standard library tools.'),
    pickCode('Which prints the weekday of d?', ['print(d.strftime("%A"))', 'print(d.weekday_name)', 'print(strftime(d, "day"))', 'print(d.day.name)'], '%A is the weekday’s full name.'),
    bugTask(['from math import ceil', 'print(math.ceil(4.2))', 'dep = datetime.strptime("02/11/2026", "%Y-%m-%d")', 'by_route = {}', 'by_route["Harbour"].append("90101")'], [[2, 'math.ceil', 'ceil'], [3, '"%Y-%m-%d"', '"%d/%m/%Y"'], [4, '{}', 'defaultdict(list)']], 'Only ceil was imported, the format must match the text, and appending to a new key needs a defaultdict.'),
    predictTask(['from collections import Counter', 'counts = Counter(["tea", "toast", "tea", "tea"])', 'print(counts["tea"] - counts["cake"])'], 'What does it print?', ['3', 'KeyError', '4', '2'], 'cake was never counted, so it is 0, not an error.'),
    arrange(['from collections import Counter', 'counts = Counter(["Harbour", "Airport", "Harbour"])', 'print(counts.most_common(1)[0][0])'], 'import, count, then print the top route', ['Harbour']),
  ]),
];
