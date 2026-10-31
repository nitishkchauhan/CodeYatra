// Python Intermediate · Module 4 · Real data files. Lesson 4.1 keeps the old module id (py-json).
// CSV lessons read text through io.StringIO, so they run the same on the phone as from a file.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

const CSV_TEXT = 'text = "train,seats,name\\n90101,2,Ava Reed\\n90102,3,\\"Reed, Megan\\"\\n"';

export const PY_I_M4: Lesson[] = [
  lesson('py-json', 'JSON', 5, [
    atWork('Felix', ['City Travel Desk’s booking system sends us JSON, the text format almost every app uses to swap data.', 'json.loads turns it into Python lists and dictionaries; json.dumps turns them back into text.']),
    run('Text to Python', 'Pick what to print.', ['import json', 'text = \'{"train": "90101", "seats": 2, "paid": true, "seat": null}\'', 'booking = json.loads(text)', 'print({{v}})'], ['booking', 'booking["seats"] + 1', 'booking["paid"]', 'booking["seat"]', 'json.dumps(booking)'], { caption: 'JSON true becomes True, and null becomes None. dumps goes back to JSON text.' }),
    toggleRun('Compact or pretty', [
      ['Compact', ['import json', 'booking = {"train": "90101", "seats": 2}', 'print(json.dumps(booking))'], 'One line: good for sending.', ['{"train": "90101", "seats": 2}']],
      ['Pretty', ['import json', 'booking = {"train": "90101", "seats": 2}', 'print(json.dumps(booking, indent=2))'], 'indent=2: easy for people to read.', ['{', '  "train": "90101",', '  "seats": 2', '}']],
    ]),
    predict('Read a reply', ['import json', 'reply = \'[{"train": "90101", "seats": 2}, {"train": "90102", "seats": 3}]\'', 'rows = json.loads(reply)', 'count = len(rows)', 'print(sum(r["seats"] for r in rows))'], [
      [4, 'What will count be?', ['2', '1', '4'], 'The JSON list has two bookings.', { var: 'count' }],
      [5, 'What will it print?', ['5', '23', '[2, 3]'], 'The seats are numbers, so they add up.', { out: true }],
    ]),
    check('What does json.loads("[1, 2]") give?', ['A Python list [1, 2]', 'The text "[1, 2]"', 'A tuple (1, 2)', 'An error'], 'JSON arrays become lists.', 'loads: load from a string.'),
    tapbug("KeyError: 'seat'", ['seat = booking["seat"]'], [[1, 'booking["seat"]', 'booking.get("seat", "Any")']], 'Not every booking has a seat. get gives a default instead of crashing.'),
    recap([
      ['📨', 'JSON is data as text'],
      ['🔁', 'json.loads: text → Python; json.dumps: Python → text'],
      ['🛟', 'Use get() for keys that may be missing'],
    ]),
  ]),

  lesson('py-i-4-2', 'CSV files', 5, [
    atWork('Megan', ['The desk exports bookings from a spreadsheet as CSV: one row per line, commas between values.', 'Splitting on commas breaks as soon as a name has a comma in it. The csv module gets it right.']),
    run('Read the rows', 'Pick what to print. Can you add up the seats?', ['import csv, io', CSV_TEXT, 'rows = list(csv.DictReader(io.StringIO(text)))', 'print({{v}})'], ['len(rows)', 'rows[0]', 'rows[1]["name"]', 'rows[1]["seats"] + "1"', 'sum(int(r["seats"]) for r in rows)'], { goal: '5', caption: 'Each row is a dictionary keyed by the header line. Every value is text.' }),
    toggleRun('Why not split on commas?', [
      ['split(",")', ['line = \'90102,3,"Reed, Megan"\'', 'print(line.split(","))'], 'The comma inside the name splits it in two.', ['[\'90102\', \'3\', \'"Reed\', \' Megan"\']']],
      ['csv', ['import csv', 'line = \'90102,3,"Reed, Megan"\'', 'print(next(csv.reader([line])))'], 'csv understands the quotes.', ["['90102', '3', 'Reed, Megan']"]],
    ]),
    reveal('CSV in real files', [
      ['with open("bookings.csv", newline="") as f:', 'Open the file; with closes it for you.'],
      ['csv.DictReader(f)', 'Each row becomes a dictionary, keyed by the header line.'],
      ['csv.writer(f).writerow([…])', 'Writes a row, adding quotes where needed.'],
      ['int(row["seats"])', 'Everything is text, so convert numbers yourself.'],
    ], { mono: true }),
    check('csv.DictReader gives each row as…', ['A dictionary keyed by the header', 'A list of numbers', 'One long string', 'A tuple'], 'Read values by column name.', 'Think of the header line.'),
    tapbug('TypeError: can only concatenate str (not "int") to str', ['extra = row["seats"] + 1'], [[1, 'row["seats"]', 'int(row["seats"])']], 'CSV values are text. Convert before doing maths.'),
    recap([
      ['📄', 'csv.DictReader reads rows as dictionaries'],
      ['🧷', 'csv handles quotes and commas in values'],
      ['🔢', 'Every value is text: convert numbers'],
    ]),
  ]),

  lesson('py-i-4-3', 'Finding patterns with regular expressions', 5, [
    atWork('Felix', ['Travellers write messages like “Is 90102 late? PNR 4521367890, call 98765 43210.” The desk wants the train numbers pulled out automatically.', 'A regular expression is a pattern for text, and Python’s re module finds it.']),
    run('Find the pattern', 'Pick a pattern. Can you find only the train number?', ['import re', 'msg = "Is 90102 late? PNR 4521367890, call 98765 43210"', 'print(re.findall(r"{{v}}", msg))'], ['\\d+', '\\d{10}', '\\b\\d{5}\\b', '\\b901\\d{2}\\b'], { goal: "['90102']", caption: 'Five digits on their own still match the phone number’s halves. Train numbers start with 901.' }),
    reveal('Pattern pieces', [
      ['\\d', 'One digit. \\d{5}: exactly five.'],
      ['\\b', 'A word edge, so the digits aren’t part of a longer number.'],
      ['+ and *', 'One or more; zero or more.'],
      ['r"…"', 'A raw string, so backslashes reach re unchanged.'],
    ], { mono: true }),
    predict('search, match and sub', ['import re', 'msg = "Train 90102 is late"', 'found = re.search(r"\\d{5}", msg).group()', 'starts = bool(re.match(r"\\d", msg))', 'hidden = re.sub(r"\\d", "#", "PNR 4521")', 'print(found, starts, hidden)'], [
      [3, 'What will found be?', ["'90102'", '90102', "'Train'"], 'search finds the first match anywhere, as text.', { var: 'found' }],
      [4, 'What will starts be?', ['False', 'True', 'None'], 'match only looks at the start, and the message starts with T.', { var: 'starts' }],
      [5, 'What will hidden be?', ["'PNR ####'", "'#### 4521'", "'PNR 4521'"], 'sub replaces every digit.', { var: 'hidden' }],
    ]),
    check('Which checks that a whole string is a 10-digit number?', ['re.fullmatch(r"\\d{10}", s)', 're.search(r"\\d", s)', 're.findall(r"\\d{10}", s)', 's.isdigit()'], 'fullmatch needs the whole string to fit the pattern.', 'The whole string, and exactly 10.', { mono: true }),
    tapbug('It also finds the halves of the phone number', ['trains = re.findall(r"\\d{5}", msg)'], [[1, 'r"\\d{5}"', 'r"\\b901\\d{2}\\b"']], 'Be as exact as the data allows: train numbers here are 901 and two more digits, on their own.'),
    recap([
      ['🔎', 're.findall finds every match'],
      ['🧩', '\\d, \\b, {n} and + build patterns'],
      ['✏️', 're.sub replaces; fullmatch checks the whole text'],
    ]),
  ]),

  challenge('py-i-4-ch', 'Module 4 Challenge', { icon: '📂', name: 'Data Wrangler' }, ['Read and write JSON', 'Read CSV files safely', 'Find patterns in text with re'], [
    mcq(1, 'What does json.loads do?', ['Turns JSON text into Python data', 'Saves a file', 'Turns Python into JSON text', 'Downloads JSON'], 'loads: from a string.'),
    mcq(2, 'JSON null becomes…', ['None', 'null', '0', '""'], 'Python’s “nothing”.', { mono: true }),
    mcq(3, 'What type is every value from csv.DictReader?', ['Text (str)', 'int', 'It depends on the column', 'float'], 'Convert numbers yourself.'),
    mcq(4, 'What does \\d{3} match?', ['Exactly three digits', 'Three letters', 'The letter d three times', 'Any three characters'], '\\d is a digit.', { mono: true }),
    mcq(5, 'Why write patterns as r"…"?', ['So backslashes reach re unchanged', 'To make them faster', 'Because re needs bytes', 'To ignore case'], 'Raw strings keep backslashes.'),
    swipe([
      ['json.dumps(data, indent=2) makes readable JSON', true, 'Pretty printing.'],
      ['Splitting CSV lines on commas is always safe', false, 'Quoted commas break it.'],
      ['re.findall gives a list of every match', true, 'An empty list if none.'],
      ['JSON true stays true in Python', false, 'It becomes True.'],
    ]),
    pairs([['json.loads', 'JSON text → Python'], ['csv.DictReader', 'Rows as dictionaries'], ['re.findall', 'Every match'], ['re.sub', 'Replace matches']], 'Data file tools.'),
    pickCode('Which reads the seats of every CSV row as numbers?', ['[int(r["seats"]) for r in csv.DictReader(f)]', '[r.seats for r in csv.read(f)]', 'f.split(",")["seats"]', 'json.loads(f)["seats"]'], 'DictReader, then int() on each value.'),
    bugTask(['data = json.load(text)', 'seat = booking["seat"]', 'extra = row["seats"] + 1'], [[1, 'json.load(', 'json.loads('], [2, 'booking["seat"]', 'booking.get("seat", "Any")'], [3, 'row["seats"]', 'int(row["seats"])']], 'load reads a file (loads reads text), missing keys need get, and CSV values are text.'),
    predictTask(['import json', 'data = json.loads(\'{"seats": [2, 3], "paid": false}\')', 'print(sum(data["seats"]), data["paid"])'], 'What does it print?', ['5 False', '5 false', '[2, 3] False', '23 False'], 'The list adds up to 5, and JSON false is Python False.'),
    arrange(['import re', 'msg = "Is 90102 late?"', 'print(re.findall(r"\\d{5}", msg))'], 'import re, take the message, then find the train', ["['90102']"]),
  ]),
];
