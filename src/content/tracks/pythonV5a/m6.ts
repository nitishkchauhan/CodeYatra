// Python Advanced · Module 6 · Clean code and code review, and the final project: a tested booking service for City
// Travel Desk, in the Python code editor with hidden tests. Lesson 6.1 keeps the old module id (py-clean-code) and the
// project keeps py-a-project.
import type { Lesson } from '../../types';
import { atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, predictTask, project, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

// ── The final project ───────────────────────────────────────────────────────────────────────────
const MODEL = `from dataclasses import dataclass

class BookingError(ValueError):
    pass

class SoldOutError(BookingError):
    pass

@dataclass
class Booking:
    name: str
    seats: int
`;
const BOOKING = `${MODEL}
    def __post_init__(self):
        if not self.name.strip():
            raise BookingError("name is required")
        if not 1 <= self.seats <= 6:
            raise BookingError("seats must be 1 to 6")
`;
const TRAIN = `class Train:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.bookings: list[Booking] = []
`;
const SERVICE = `${TRAIN}
    def free(self) -> int:
        return self.capacity - sum(b.seats for b in self.bookings)

    def book(self, name: str, seats: int) -> Booking:
        booking = Booking(name, seats)
        if seats > self.free():
            raise SoldOutError(f"only {self.free()} seats left")
        self.bookings.append(booking)
        return booking
`;
const CANCEL = `
    def cancel(self, name: str) -> int:
        for b in self.bookings:
            if b.name == name:
                self.bookings.remove(b)
                return b.seats
        raise BookingError(f"no booking for {name}")
`;
const CHECKS = `
def run_checks() -> int:
    passed = 0
    t = Train(5)
    t.book("Ava", 2)
    if t.free() == 3:
        passed += 1
    try:
        t.book("Reed", 4)
    except SoldOutError:
        passed += 1
    try:
        t.book(" ", 1)
    except BookingError:
        passed += 1
    if t.cancel("Ava") == 2 and t.free() == 5:
        passed += 1
    try:
        t.cancel("Zoey")
    except BookingError:
        passed += 1
    return passed
`;

export const PY_A_M6: Lesson[] = [
  lesson('py-clean-code', 'Names and small functions', 5, [
    atWork('Megan', ['Your first code review! Felix left comments on a function called do(x, y, z).', 'Clear names and small functions make code easy to read, test and change.']),
    toggleRun('Before and after review', [
      ['Before', ['def do(x, y, z):', '    a = x * y', '    if z:', '        a = a - a * 0.25', '    return round(a)', 'print(do(2, 450, True))'], 'It works, but what is z? What is 0.25?', ['675']],
      ['After', ['STUDENT_DISCOUNT = 0.25', 'def booking_total(seats, fare, student=False):', '    total = seats * fare', '    if student:', '        total -= total * STUDENT_DISCOUNT', '    return round(total)', 'print(booking_total(2, 450, student=True))'], 'The same result, and now the code explains itself.', ['675']],
    ]),
    reveal('A review checklist', [
      ['Names say what, not how', 'booking_total, not do or calc2.', '🏷'],
      ['One job per function', 'If you need “and” to describe it, split it.', '🎯'],
      ['No magic numbers', 'STUDENT_DISCOUNT = 0.25 instead of a bare 0.25.', '🔢'],
      ['Early returns', 'Handle the odd cases first, then the main path, with less nesting.', '↩️'],
    ]),
    matchUp('Better names', [['do(x, y, z)', 'booking_total(seats, fare, student)'], ['lst', 'pending_bookings'], ['0.25', 'STUDENT_DISCOUNT'], ['flag', 'is_cancelled']], 'Names that explain themselves.'),
    run('Early returns', 'Pick a booking.', ['def check(booking):', '    if booking["seats"] < 1:', '        return "Rejected: no seats"', '    if booking["seats"] > 6:', '        return "Rejected: too many seats"', '    return "OK"', 'print(check({{v}}))'], ['{"seats": 2}', '{"seats": 0}', '{"seats": 9}'], { caption: 'Each rule is one flat if. No pyramid of else blocks.' }),
    check('Which name is best for a function that sends a refund email?', ['send_refund_email', 'email', 'do_stuff', 'f2'], 'A verb and what it acts on.', 'Say what it does.', { mono: true }),
    tapbug('Review comment: “What is 0.25?”', ['        total -= total * 0.25'], [[1, '0.25', 'STUDENT_DISCOUNT']], 'Give a magic number a name, once, at the top.'),
    recap([
      ['🏷', 'Names say what, not how'],
      ['🎯', 'One job per function'],
      ['🔢', 'Name your numbers; return early'],
    ]),
  ]),

  lesson('py-a-6-2', 'Errors that help', 5, [
    atWork('Felix', ['When a train is full, the service raises ValueError, the same as for a typo in a name. The app can’t tell them apart.', 'Make your own exception classes, so callers can catch exactly what they expect.']),
    run('Your own exceptions', 'Pick a booking. What does the app say when the train is full?', ['class BookingError(Exception):', '    pass', 'class SoldOutError(BookingError):', '    pass', 'def book(seats, free):', '    if seats < 1:', '        raise BookingError("seats must be 1 or more")', '    if seats > free:', '        raise SoldOutError(f"only {free} seats left")', '    return "Booked"', 'try:', '    print(book({{v}}, free=3))', 'except SoldOutError as e:', '    print("Offer the next train:", e)', 'except BookingError as e:', '    print("Fix the form:", e)'], ['2', '0', '5'], { goal: 'Offer the next train: only 3 seats left', caption: 'Each kind of problem gets its own answer.' }),
    reveal('Good exceptions', [
      ['A family of errors', 'BookingError for every booking problem; SoldOutError for one kind.'],
      ['Catch the narrowest', 'except SoldOutError before except BookingError.'],
      ['Clear messages', '“only 3 seats left”, not “error 7”.'],
      ['raise … from err', 'Keep the original cause when you turn one error into another.'],
    ], { mono: true }),
    toggleRun('Never hide errors', [
      ['except: pass', ['def parse_seats(text):', '    try:', '        return int(text)', '    except:', '        pass', 'print(parse_seats("two"))'], 'The mistake disappears: None, and nobody knows why.', ['None']],
      ['Specific', ['def parse_seats(text):', '    try:', '        return int(text)', '    except ValueError as err:', '        raise ValueError(f"seats must be a number, got {text!r}") from err', 'print(parse_seats("two"))'], 'A clear message, and the original cause is kept.', ["ValueError: seats must be a number, got 'two'"]],
    ]),
    check('Why catch SoldOutError before BookingError?', ['SoldOutError is a kind of BookingError, so the general one would catch it first', 'Alphabetical order', 'Python requires it', 'It is faster'], 'The first matching except wins.', 'Which one matches first?', { mono: false }),
    tapbug('A typo in the code is silently ignored', ['try:', '    book(seats, free)', 'except:', '    pass'], [[3, 'except:', 'except BookingError as e:'], [4, 'pass', 'show(e)']], 'A bare except hides every error, even bugs. Catch only what you expect, and tell the user.'),
    recap([
      ['👪', 'Your own exceptions, in a family'],
      ['🎯', 'Catch the narrowest first'],
      ['🙈', 'Never except: pass'],
    ]),
  ]),

  lesson('py-a-6-3', 'Context managers', 5, [
    atWork('Megan', ['The nightly script opens files and a database connection. When it crashes halfway, they are left open.', 'with makes sure the clean-up always happens, even after an error.']),
    toggleRun('with always cleans up', [
      ['Without with', ['class Conn:', '    def close(self):', '        print("Closed")', 'c = Conn()', 'try:', '    raise ValueError("bad row")', '    c.close()', 'except ValueError:', '    print("Crashed")'], 'The error skipped close(): the connection stays open.', ['Crashed']],
      ['With with', ['from contextlib import contextmanager', '@contextmanager', 'def connection():', '    print("Opened")', '    try:', '        yield "conn"', '    finally:', '        print("Closed")', 'try:', '    with connection() as c:', '        raise ValueError("bad row")', 'except ValueError:', '    print("Crashed")'], 'finally runs whatever happens, so the connection is always closed.', ['Opened', 'Closed', 'Crashed']],
    ]),
    explore('A class as a context manager', ['class Timer:', '    def __enter__(self):', '        self.start = time.perf_counter()', '        return self', '    def __exit__(self, *exc):', '        self.seconds = time.perf_counter() - self.start', 'with Timer() as t:', '    build_report()'], [
      [2, '__enter__ runs at the start of the with block.'],
      [4, 'What it returns becomes t.'],
      [5, '__exit__ runs at the end, even after an error.'],
      [7, 'Use it just like open().'],
    ], { minTaps: 3 }),
    run('with and files', 'Pick one.', ['import io', 'with io.StringIO("90101,2\\n90102,3\\n") as f:', '    rows = f.read().splitlines()', 'print({{v}})'], ['rows', 'len(rows)', 'f.closed', 'rows[1].split(",")'], { caption: 'After the with block, the file is closed for you: f.closed is True.' }),
    check('When does __exit__ run?', ['At the end of the with block, even after an error', 'Only if there was no error', 'Before __enter__', 'Never; you call it yourself'], 'That is the whole point of with.', 'Even after an error?'),
    tapbug('ValueError: I/O operation on closed file', ['with open("bookings.csv") as f:', '    header = f.readline()', 'rows = f.read()'], [[3, 'rows = f.read()', '    rows = f.read()']], 'The file closes when the with block ends. Read inside the block.'),
    recap([
      ['🚪', 'with always runs the clean-up'],
      ['🧰', '__enter__ and __exit__, or @contextmanager'],
      ['📂', 'Use it for files, connections and locks'],
    ]),
  ]),

  challenge('py-a-project', 'Final: a tested booking service', { icon: '🏆', name: 'Python Expert' }, ['Model data that rejects bad input with clear errors', 'Write a service that protects its rules', 'Prove it works with tests, the way a team ships code'], [
    mcq(1, 'What should a failing test tell you?', ['Clearly what broke', 'Nothing', 'Only that something is wrong somewhere', 'How to fix it automatically'], 'One behaviour per test, with a clear name.'),
    mcq(2, 'What should SoldOutError inherit from?', ['BookingError, the family of booking problems', 'object', 'print', 'int'], 'So it can be caught on its own or with the family.'),
    mcq(3, 'Why use with for files and connections?', ['The clean-up happens even after an error', 'It is shorter', 'It makes files faster', 'Python needs it to read'], 'finally, built in.'),
    mcq(4, 'What makes a name good?', ['It says what the thing is or does', 'It is short, like x', 'It has numbers in it', 'It is in capitals'], 'Code is read far more than it is written.'),
    mcq(5, 'Which uses the least memory for a huge file?', ['A generator', 'A list', 'A dictionary', 'A set'], 'One line at a time.'),
    swipe([
      ['except: pass is a good way to stop crashes', false, 'It hides bugs.'],
      ['A decorator can add logging without changing the function', true, 'It wraps it.'],
      ['Tests keep fixed bugs from coming back', true, 'They fail if the bug returns.'],
      ['Magic numbers make code clearer', false, 'Give them names.'],
    ]),
    pairs([['unittest', 'Tests'], ['logging', 'A record of events'], ['yield', 'One at a time'], ['with', 'Always clean up']], 'The Advanced toolbox.'),
    pickCode('Which is the best first line for a family of booking errors?', ['class BookingError(Exception):', 'class BookingError:', 'def BookingError(Exception):', 'BookingError = Exception()'], 'A class that inherits from Exception.'),
    bugTask(['class SoldOutError:', 'except:', 'if seats > 5:'], [[1, 'SoldOutError:', 'SoldOutError(BookingError):'], [2, 'except:', 'except SoldOutError:'], [3, 'seats > 5', 'seats >= 5']], 'Errors inherit from an exception class, catch only what you expect, and “5 or more” is >= 5.'),
    predictTask(['class BookingError(Exception):', '    pass', 'class SoldOutError(BookingError):', '    pass', 'try:', '    raise SoldOutError("full")', 'except BookingError as e:', '    print(type(e).__name__, e)'], 'What does it print?', ['SoldOutError full', 'BookingError full', 'full', 'SoldOutError'], 'The family catches it, but it is still a SoldOutError.'),
    project(1, {
      title: 'Step 1 · A validated model',
      instructions: 'Felix: “Bad data must never get in.” In Booking’s __post_init__, raise BookingError("name is required") for a blank name and BookingError("seats must be 1 to 6") when seats is outside 1–6.',
      starter: MODEL,
      tests: [
        { call: 'Booking("Ava", 2).seats', expect: '2' },
        { call: 'Booking("  ", 2)', raises: 'BookingError: name is required' },
        { call: 'Booking("Reed", 9)', raises: 'BookingError: seats must be 1 to 6' },
        { call: 'Booking("Reed", 0)', raises: 'BookingError: seats must be 1 to 6' },
      ],
      hint: 'def __post_init__(self):\n    if not self.name.strip():\n        raise BookingError("name is required")\n    if not 1 <= self.seats <= 6:\n        raise BookingError("seats must be 1 to 6")',
      solution: BOOKING,
    }),
    project(2, {
      title: 'Step 2 · Never overbook',
      instructions: 'Megan: “The service must never sell more seats than the train has.” Add free() (seats left) and book(name, seats): make the Booking first (so its checks run), raise SoldOutError(f"only {free} seats left") if there isn’t room, otherwise store and return it.',
      starter: `${BOOKING}\n${TRAIN}`,
      tests: [
        { call: '(lambda t: (t.book("Ava", 2), t.book("Reed", 3), t.free())[2])(Train(10))', expect: '5' },
        { call: '(lambda t: (t.book("Ava", 4), t.book("Reed", 3)))(Train(5))', raises: 'SoldOutError: only 1 seats left' },
        { call: 'Train(5).book("", 1)', raises: 'BookingError: name is required' },
      ],
      hint: 'free() is self.capacity - sum(b.seats for b in self.bookings). In book(), make the Booking, then compare seats with self.free().',
      solution: `${BOOKING}\n${SERVICE}`,
    }),
    project(3, {
      title: 'Step 3 · Cancel a booking',
      instructions: 'The desk: “People cancel.” Add cancel(name): remove that person’s booking and return the seats freed. If there is no booking for that name, raise BookingError(f"no booking for {name}").',
      starter: `${BOOKING}\n${SERVICE}`,
      tests: [
        { call: '(lambda t: (t.book("Ava", 2), t.cancel("Ava"), t.free())[1:])(Train(5))', expect: '(2, 5)' },
        { call: 'Train(5).cancel("Zoey")', raises: 'BookingError: no booking for Zoey' },
      ],
      hint: 'for b in self.bookings: if b.name == name: self.bookings.remove(b); return b.seats. After the loop, raise BookingError(…).',
      solution: `${BOOKING}\n${SERVICE}${CANCEL}`,
    }),
    project(4, {
      title: 'Step 4 · Prove it with tests',
      instructions: 'Write run_checks() that returns how many of these 5 checks pass: a booking leaves the right seats free; overbooking raises SoldOutError; a blank name raises BookingError; cancelling frees the seats; cancelling an unknown name raises BookingError.',
      starter: `${BOOKING}\n${SERVICE}${CANCEL}\ndef run_checks() -> int:\n    passed = 0\n    return passed\n`,
      tests: [{ call: 'run_checks()', expect: '5' }],
      hint: 'For each check, do the action; count 1 when the result (or the expected error, caught with except) is right.',
      solution: `${BOOKING}\n${SERVICE}${CANCEL}${CHECKS}`,
    }),
  ], 'project'),
];
