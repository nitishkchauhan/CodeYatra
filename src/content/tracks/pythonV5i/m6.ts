// Python Intermediate · Module 6 · Classes in depth, and the final project: City Travel Desk’s booking report, in the
// Python code editor with hidden tests. Lesson 6.1 keeps the old module id (py-oop-2) and the project py-i-project.
import type { Lesson } from '../../types';
import { atWork, bugTask, challenge, check, explore, lesson, mcq, pairs, pickCode, predictTask, project, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const TICKETS = ['class Ticket:', '    def __init__(self, train, fare):', '        self.train = train', '        self.fare = fare', '    def total(self):', '        return self.fare + 20', 'class Sleeper(Ticket):', '    def __init__(self, train, fare, berth):', '        super().__init__(train, fare)', '        self.berth = berth', '    def total(self):', '        return super().total() + 150'];
const TICKET_EQ = ['class Ticket:', '    def __init__(self, train, fare):', '        self.train = train', '        self.fare = fare'];

// ── The final project ───────────────────────────────────────────────────────────────────────────
// Five rows from the booking system; two are broken (seats as text, no date) and must be skipped.
const DATA = `'[{"train": "90101", "seats": 2, "fare": 450, "date": "2026-11-02"}, {"train": "90102", "seats": 1, "fare": 300, "date": "2026-11-02"}, {"train": "90101", "seats": 4, "fare": 450, "date": "2026-11-03"}, {"train": "90104", "seats": "two", "fare": 200, "date": "2026-11-03"}, {"train": "90102", "seats": 2, "fare": 300}]'`;
const S1 = `import json

def load(text):
    rows = []
    for row in json.loads(text):
        if isinstance(row.get("seats"), int) and isinstance(row.get("fare"), int) and "train" in row and "date" in row:
            rows.append(row)
    return rows
`;
const S2 = `${S1.replace('import json\n', 'import json\nfrom dataclasses import dataclass\n')}
@dataclass
class Booking:
    train: str
    seats: int
    fare: int
    date: str

    @property
    def total(self):
        return self.seats * self.fare

def bookings(text):
    return [Booking(**row) for row in load(text)]
`;
const S3 = `${S2.replace('from dataclasses import dataclass\n', 'from collections import Counter\nfrom dataclasses import dataclass\nfrom datetime import datetime\n')}
def seats_by_train(bs):
    counts = Counter()
    for b in bs:
        counts[b.train] += b.seats
    return counts

def busiest_day(bs):
    days = Counter()
    for b in bs:
        days[b.date] += b.seats
    day = days.most_common(1)[0][0]
    return datetime.strptime(day, "%Y-%m-%d").strftime("%A %d %B")
`;
const S4 = `${S3}
def report(text):
    bs = bookings(text)
    if not bs:
        return "No bookings"
    lines = [f"{'Train':<8}{'Seats':>6}"]
    for train, seats in seats_by_train(bs).most_common():
        lines.append(f"{train:<8}{seats:>6}")
    lines.append(f"Takings: ₹{sum(b.total for b in bs):,}")
    lines.append(f"Busiest day: {busiest_day(bs)}")
    return "\\n".join(lines)
`;

export const PY_I_M6: Lesson[] = [
  lesson('py-oop-2', 'Inheritance and super()', 5, [
    atWork('Felix', ['City Travel Desk sells two kinds of ticket: normal ones, and sleeper ones with a ₹150 berth charge.', 'They share most of their code. A Sleeper can inherit everything from Ticket and change only what differs.']),
    explore('A child class', TICKETS, [
      [7, 'Sleeper(Ticket): a Sleeper is a Ticket, with everything a Ticket has.'],
      [9, 'super() runs the parent’s __init__, so train and fare are set the usual way.'],
      [11, 'Override: a new total() replaces the parent’s…'],
      [12, '…and reuses it through super().total().'],
    ], { minTaps: 3 }),
    run('Normal or sleeper?', 'Pick a ticket.', [...TICKETS, 't = {{v}}', 'print(type(t).__name__, t.total())'], ['Ticket("90101", 450)', 'Sleeper("90103", 450, "Lower")', 'Sleeper("90103", 300, "Upper")'], { caption: 'The same call, t.total(), does the right thing for each kind of ticket.' }),
    check('class Sleeper(Ticket): means…', ['A Sleeper is a kind of Ticket and gets its methods', 'A Ticket is a kind of Sleeper', 'Sleeper copies Ticket once and forgets it', 'Sleeper can’t have its own methods'], 'The child inherits from the parent in brackets.', 'Which one is in the brackets?'),
    truth([
      ['isinstance(Sleeper("90103", 450, "Lower"), Ticket) is True', true, 'A Sleeper is a Ticket.'],
      ['A child class must rewrite every parent method', false, 'Only the ones that differ.'],
      ['super() reaches the parent class', true, 'To reuse its code.'],
    ]),
    tapbug("AttributeError: 'Sleeper' object has no attribute 'fare'", ['class Sleeper(Ticket):', '    def __init__(self, train, fare, berth):', '        self.berth = berth'], [[3, 'self.berth = berth', 'super().__init__(train, fare); self.berth = berth']], 'The new __init__ replaced the parent’s, so fare was never set. Call super().__init__ first.'),
    recap([
      ['👪', 'class Child(Parent) inherits everything'],
      ['✏️', 'Override only what differs'],
      ['⬆️', 'super() reuses the parent’s code'],
    ]),
  ]),

  lesson('py-i-6-2', 'Special methods', 5, [
    atWork('Megan', ['print(ticket) shows something like <Ticket object at 0x7f…>. Travellers can’t read that, and two identical tickets aren’t ==.', 'Special methods, the ones with double underscores, teach your class how print, == and len should work.']),
    toggleRun('What does == mean?', [
      ['Without __eq__', [...TICKET_EQ, 'a = Ticket("90101", 450)', 'b = Ticket("90101", 450)', 'print(a == b)'], 'Two separate objects. Without __eq__, == asks “is it the very same object?”', ['False']],
      ['With __eq__', [...TICKET_EQ, '    def __eq__(self, other):', '        return (self.train, self.fare) == (other.train, other.fare)', 'a = Ticket("90101", 450)', 'b = Ticket("90101", 450)', 'print(a == b)'], 'Now == compares what matters.', ['True']],
    ]),
    run('Special methods at work', 'Pick a line.', ['class Trip:', '    def __init__(self, train, stops):', '        self.train = train', '        self.stops = stops', '    def __str__(self):', '        return f"Train {self.train}: " + " → ".join(self.stops)', '    def __len__(self):', '        return len(self.stops)', 'trip = Trip("90101", ["City Central", "Hillview", "Harbour Point"])', 'print({{v}})'], ['trip', 'len(trip)', 'str(trip).upper()', 'f"{trip} ({len(trip)} stops)"'], { caption: 'print and f-strings use __str__; len() uses __len__.' }),
    reveal('Common special methods', [
      ['__str__', 'What print() and str() show.'],
      ['__repr__', 'What developers see in the console and inside lists.'],
      ['__eq__', 'What == means.'],
      ['__len__', 'What len() gives.'],
      ['__lt__', 'What < means, so sorted() works.'],
    ], { mono: true }),
    check('print(trip) calls which method?', ['__str__', '__len__', '__eq__', '__init__'], 'print asks the object for its text.', 'str for string.', { mono: true }),
    truth([
      ['Different classes can share a method name, like total()', true, 'That is polymorphism: the same call works on each.'],
      ['print() calls __init__', false, 'It calls __str__.'],
      ['Without __eq__, == checks if it is the very same object', true, 'Identity, not contents.'],
    ]),
    tapbug('TypeError: __str__ returned non-string', ['    def __str__(self):', '        print(f"Train {self.train}")'], [[2, 'print(f"Train {self.train}")', 'return f"Train {self.train}"']], '__str__ must return the text, not print it.'),
    recap([
      ['✨', 'Special methods have double underscores'],
      ['🖨', '__str__ for print, __eq__ for =='],
      ['🔁', 'Same method name, many classes: polymorphism'],
    ]),
  ]),

  lesson('py-i-6-3', '@dataclass and @property', 5, [
    atWork('Felix', ['Our Booking class is 20 lines of __init__, __repr__ and __eq__, all saying the obvious.', '@dataclass writes them for you. And @property makes a value that is worked out, like the total fare.']),
    toggleRun('Write it, or let Python write it', [
      ['By hand', ['class Booking:', '    def __init__(self, train, seats, fare):', '        self.train = train', '        self.seats = seats', '        self.fare = fare', 'print(Booking("90101", 2, 450).seats)'], 'Every field written three times, and print(booking) is still unreadable.', ['2']],
      ['@dataclass', ['from dataclasses import dataclass', '@dataclass', 'class Booking:', '    train: str', '    seats: int', '    fare: int', 'print(Booking("90101", 2, 450))'], '__init__, a readable print and == come for free.', ["Booking(train='90101', seats=2, fare=450)"]],
    ]),
    run('A worked-out value', 'Pick a line.', ['from dataclasses import dataclass', '@dataclass', 'class Booking:', '    train: str', '    seats: int', '    fare: int = 450', '    @property', '    def total(self):', '        return self.seats * self.fare', 'b = Booking("90101", 2)', 'print({{v}})'], ['b.total', 'b', 'b == Booking("90101", 2)', 'Booking("90102", 3, 300).total'], { caption: '@property: read b.total like a field, but it is worked out each time, so it is never out of date.' }),
    check('What does @dataclass write for you?', ['__init__, __repr__ and __eq__', 'A database table', 'Type checks while the code runs', 'Faster loops'], 'The boring methods, from the fields you list.', 'Think of what Booking needed by hand.'),
    tapbug("TypeError: 'int' object is not callable", ['print(b.total())'], [[1, 'b.total()', 'b.total']], 'A property is read like a field, without brackets.'),
    truth([
      ['@property values are worked out each time they are read', true, 'So they are never out of date.'],
      ['Dataclass fields are listed with type hints', true, 'train: str declares a field.'],
      ['@dataclass makes the class slower to use', false, 'It only writes the boring code for you.'],
    ]),
    recap([
      ['🧾', '@dataclass writes __init__, __repr__ and __eq__'],
      ['🧮', '@property: a value worked out on demand'],
      ['📏', 'Fields are listed with type hints'],
    ]),
  ]),

  challenge('py-i-project', 'Final: City Travel Desk’s booking report', { icon: '🏆', name: 'Python Pro+' }, ['Read real data and skip the broken rows', 'Model bookings with a dataclass and a property', 'Count, date and format a report people can read'], [
    mcq(1, 'What does @dataclass write for you?', ['__init__, __repr__ and __eq__', 'Your tests', 'A JSON file', 'A main function'], 'From the fields you list.'),
    mcq(2, 'How is a @property read?', ['b.total, without brackets', 'b.total()', 'b["total"]', 'total(b)'], 'Like a field.', { mono: true }),
    mcq(3, 'Which makes a child class?', ['class Sleeper(Ticket):', 'class Sleeper extends Ticket:', 'class Sleeper: Ticket', 'Sleeper = Ticket()'], 'The parent goes in brackets.', { mono: true }),
    mcq(4, 'What does super().__init__(…) do?', ['Runs the parent’s __init__', 'Deletes the parent', 'Makes a new parent', 'Calls __str__'], 'Reuse the parent’s set-up.'),
    mcq(5, 'Which special method does len() use?', ['__len__', '__size__', '__count__', '__str__'], 'len → __len__.', { mono: true }),
    swipe([
      ['Special methods have double underscores', true, 'Like __str__ and __eq__.'],
      ['A child class must copy the parent’s code', false, 'It inherits it.'],
      ['print(obj) uses __str__', true, 'Or __repr__ if there is no __str__.'],
      ['A @property needs brackets to read', false, 'Read it like a field.'],
    ]),
    pairs([['@dataclass', 'Writes the boring methods'], ['@property', 'A worked-out field'], ['super()', 'Reach the parent'], ['__eq__', 'What == means']], 'Class tools.'),
    pickCode('Which compares two tickets by their train and fare?', ['def __eq__(self, other): return (self.train, self.fare) == (other.train, other.fare)', 'def __equal__(self, other): return True', 'def eq(self): return self.train', 'def __str__(self, other): return self == other'], 'The method must be called __eq__, and compare the fields.'),
    bugTask(['class Sleeper(Ticket)', '    def __str__(self): print(self.train)', 'print(b.total())'], [[1, '(Ticket)', '(Ticket):'], [2, 'print(self.train)', 'return self.train'], [3, 'b.total()', 'b.total']], 'A class line ends with a colon, __str__ returns text, and properties have no brackets.'),
    predictTask(['from dataclasses import dataclass', '@dataclass', 'class Seat:', '    row: int', '    letter: str', 'a = Seat(4, "A")', 'b = Seat(4, "A")', 'print(a == b, a is b)'], 'What does it print?', ['True False', 'False False', 'True True', 'False True'], 'The dataclass == compares the fields; is asks whether it is the very same object.'),
    project(1, {
      title: 'Step 1 · Read the bookings',
      instructions: 'Felix: “The booking system sends JSON, and some rows are broken.” Write load(text): parse the JSON list and keep only rows whose seats and fare are whole numbers and that have a train and a date.',
      starter: 'import json\n\ndef load(text):\n    return json.loads(text)\n',
      tests: [
        { call: `len(load(${DATA}))`, expect: '3' },
        { call: `[r["train"] for r in load(${DATA})]`, expect: "['90101', '90102', '90101']" },
        { call: "load('[]')", expect: '[]' },
      ],
      hint: 'if isinstance(row.get("seats"), int) and isinstance(row.get("fare"), int) and "train" in row and "date" in row: rows.append(row)',
      solution: S1,
    }),
    project(2, {
      title: 'Step 2 · A Booking dataclass',
      instructions: 'Megan: “Work with bookings, not raw dictionaries.” Make a Booking dataclass (train, seats, fare, date) with a total property (seats × fare), and bookings(text) that turns each good row into a Booking.',
      starter: `${S1}\ndef bookings(text):\n    return load(text)\n`,
      tests: [
        { call: `bookings(${DATA})[0].total`, expect: '900' },
        { call: `bookings(${DATA})[0] == Booking("90101", 2, 450, "2026-11-02")`, expect: 'True' },
        { call: `sum(b.total for b in bookings(${DATA}))`, expect: '3000' },
      ],
      hint: '@dataclass class Booking: train: str … and @property def total(self): return self.seats * self.fare. Then [Booking(**row) for row in load(text)]',
      solution: S2,
    }),
    project(3, {
      title: 'Step 3 · Seats per train, busiest day',
      instructions: 'The desk manager: “Which trains sold most, and which day was busiest?” Write seats_by_train(bs) returning a Counter of seats per train, and busiest_day(bs) returning the day with most seats, like "Tuesday 03 November".',
      starter: `${S2}\ndef seats_by_train(bs):\n    return {}\n\ndef busiest_day(bs):\n    return ""\n`,
      tests: [
        { call: `seats_by_train(bookings(${DATA}))`, expect: "{'90101': 6, '90102': 1}" },
        { call: 'seats_by_train([])', expect: '{}' },
        { call: `busiest_day(bookings(${DATA}))`, expect: "'Tuesday 03 November'" },
      ],
      hint: 'counts[b.train] += b.seats; for the day: days.most_common(1)[0][0], then datetime.strptime(day, "%Y-%m-%d").strftime("%A %d %B")',
      solution: S3,
    }),
    project(4, {
      title: 'Step 4 · The report',
      instructions: 'Write report(text): a header line, one line per train (name left in 8 characters, seats right in 6), then “Takings: ₹3,000” and “Busiest day: …”. With no bookings, return "No bookings".',
      starter: `${S3}\ndef report(text):\n    return ""\n`,
      tests: [
        { call: `report(${DATA}).splitlines()[1]`, expect: "'90101        6'" },
        { call: `report(${DATA}).splitlines()[-2]`, expect: "'Takings: ₹3,000'" },
        { call: `report(${DATA}).splitlines()[-1]`, expect: "'Busiest day: Tuesday 03 November'" },
        { call: "report('[]')", expect: "'No bookings'" },
      ],
      hint: 'lines.append(f"{train:<8}{seats:>6}") for each train in seats_by_train(bs).most_common(), then f"Takings: ₹{total:,}"',
      solution: S4,
    }),
  ], 'project'),
];
