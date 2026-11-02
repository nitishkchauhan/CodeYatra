// Placement · Modules 7–12 (Intermediate): matrices, Python output questions, C output questions, OOP, SQL and
// complexity. Each module’s lesson keeps its old id; its Challenge ends with the old tested question. The C module
// shows real gcc output and the SQL module runs real queries (both checked in tests).
import type { Lesson } from '../../types';
import * as C from '../cV5/kit';
import { PLACEMENT_LESSONS as OLD } from '../placement';
import { bugTask, chat, check, kit, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, swipe, tapbug, task, toggleRun } from './kit';

const { lesson, challenge } = kit('placement');
const sql = kit('sql');
const c = C.track('c', 'c');
const cprog = (body: string[]): string[] => ['#include <stdio.h>', '', 'int main(void) {', ...body.map((l) => `    ${l}`), '    return 0;', '}'];

export const PL_M7: Lesson[] = [
  lesson('pl-matrix', 'Matrix questions', 8, [
    chat(['A matrix is a list of rows: m[r][c] is row r, column c. Placement questions love transposing, rotating and walking diagonals.']),
    toggleRun('Matrix moves', [
      ['Transpose', ['m = [[1, 2, 3], [4, 5, 6]]', 'print([list(r) for r in zip(*m)])'], 'zip(*m) pairs up the columns: rows become columns.', ['[[1, 4], [2, 5], [3, 6]]']],
      ['Rotate 90°', ['m = [[1, 2], [3, 4]]', 'print([list(r)[::-1] for r in zip(*m)])'], 'Transpose, then reverse each row: a clockwise turn.', ['[[3, 1], [4, 2]]']],
      ['Diagonals', ['m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]', 'n = len(m)', 'print(sum(m[i][i] for i in range(n)), sum(m[i][n - 1 - i] for i in range(n)))'], 'Main diagonal m[i][i]; the other m[i][n−1−i].', ['15 15']],
    ]),
    toggleRun('Walking a matrix', [
      ['Row sums', ['m = [[3, 1], [4, 1], [5, 9]]', 'print([sum(row) for row in m])'], 'One total per row.', ['[4, 5, 14]']],
      ['Column sums', ['m = [[3, 1], [4, 1], [5, 9]]', 'print([sum(col) for col in zip(*m)])'], 'Columns via zip.', ['[12, 11]']],
      ['Search a sorted matrix', ['m = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]', 'target, r, c = 6, 0, 2', 'while r < 3 and c >= 0:', '    if m[r][c] == target:', '        break', '    if m[r][c] > target:', '        c -= 1', '    else:', '        r += 1', 'print(r, c)'], 'Start top-right: too big → left, too small → down. O(rows + cols).', ['2 1']],
    ]),
    predict('Trace it', ['m = [[0] * 3 for _ in range(2)]', 'm[0][1] = 7', 'print(m)'], [
      [3, 'What is printed?', ['[[0, 7, 0], [0, 0, 0]]', '[[0, 7, 0], [0, 7, 0]]', '[[7, 0, 0], [0, 0, 0]]'], 'Each row is its own list here.', { out: true }],
    ]),
    tapbug('Changing one cell changes every row', ['grid = [[0] * 3] * 2', 'grid[0][0] = 1'], [[1, '[[0] * 3] * 2', '[[0] * 3 for _ in range(2)]']], '* 2 copies the same row list twice. Build each row separately.'),
    check('What does zip(*m) do to a matrix?', ['Groups the columns together (transpose)', 'Flattens it', 'Sorts it', 'Reverses it'], 'Columns become rows.', 'Think pairs.'),
    recap([
      ['🧊', 'm[r][c]; transpose with zip(*m)'],
      ['🔄', 'Rotate clockwise: transpose, reverse rows'],
      ['⚠', 'Build rows with a comprehension, not * n'],
    ]),
  ]),

  challenge('pl-i-7-ch', 'Module 7 Challenge', { icon: '🧊', name: 'Matrix Mover' }, ['Transpose and rotate matrices', 'Sum rows, columns and diagonals', 'Avoid shared-row bugs'], [
    mcq(1, 'm = [[1, 2], [3, 4]]; m[1][0] is…', ['3', '2', '1', '4'], 'Row 1, column 0.', { mono: true }),
    mcq(2, 'The transpose of a 2 × 3 matrix is…', ['3 × 2', '2 × 3', '3 × 3', '2 × 2'], 'Rows and columns swap.', { mono: true }),
    mcq(3, 'Main diagonal of an n × n matrix?', ['m[i][i]', 'm[i][n - i]', 'm[0][i]', 'm[i][0]'], 'Same row and column.', { mono: true }),
    mcq(4, 'Searching a row- and column-sorted matrix from the top-right is…', ['O(rows + cols)', 'O(rows × cols)', 'O(1)', 'O(log n)'], 'Each step drops a row or column.'),
    mcq(5, 'Why is [[0] * 3] * 2 a trap?', ['Both rows are the same list', 'It makes 3 rows', 'It is too slow', 'It has no zeros'], 'Shared row.'),
    swipe([
      ['zip(*m) transposes a matrix', true, 'Columns become rows.'],
      ['Rotating clockwise = transpose then reverse each row', true, 'Two easy steps.'],
      ['len(m) gives the number of columns', false, 'Rows. len(m[0]) is columns.'],
      ['A 3 × 3 matrix has 9 cells', true, '3 × 3.'],
    ]),
    pairs([['zip(*m)', 'Transpose'], ['m[i][i]', 'Main diagonal'], ['len(m[0])', 'Columns'], ['sum(row)', 'Row total']], 'Matrix tools.'),
    pickCode('Which makes a 3 × 3 matrix of zeros safely?', ['[[0] * 3 for _ in range(3)]', '[[0] * 3] * 3', '[0] * 9', '[[0, 0, 0]] * 3'], 'A new row each time.'),
    bugTask(['m = [[1, 2], [3, 4]]', 'cols = len(m)', 'rows = len(m[0])'], [[2, 'cols = len(m)', 'rows = len(m)'], [3, 'rows = len(m[0])', 'cols = len(m[0])']], 'len(m) counts rows; len(m[0]) counts columns.'),
    predictTask(['m = [[1, 2, 3], [4, 5, 6]]', 't = [list(r) for r in zip(*m)]', 'print(t[2])'], 'What does it print?', ['[3, 6]', '[2, 5]', '[4, 5, 6]', '[1, 4]'], 'The third column.'),
    task(OLD, 'pl-matrix'),
  ]),

  lesson('pl-output-py', 'Output questions: Python', 8, [
    chat(['Written tests love “what is the output?” questions. Each one hides a single rule: how names, lists and numbers really behave.']),
    toggleRun('Lists and names', [
      ['Aliasing', ['a = [1, 2]', 'b = a', 'b.append(3)', 'print(a)'], 'b = a doesn’t copy: both names point at one list.', ['[1, 2, 3]']],
      ['== vs is', ['a = [1, 2]', 'b = [1, 2]', 'print(a == b, a is b)'], '== compares values; is asks “the same object?”.', ['True False']],
      ['Default argument', ['def add(x, items=[]):', '    items.append(x)', '    return items', 'print(add(1))', 'print(add(2))'], 'The default list is made once and shared between calls.', ['[1]', '[1, 2]']],
    ]),
    toggleRun('Numbers and text', [
      ['Floor division', ['print(7 // 2, -7 // 2, -7 % 2)'], '// rounds down (towards minus infinity), so −7 // 2 is −4.', ['3 -4 1']],
      ['Floats', ['print(0.1 + 0.2 == 0.3, round(0.1 + 0.2, 2) == 0.3)'], 'Decimals are stored in binary, slightly off.', ['False True']],
      ['Truthiness', ['print(bool(""), bool("0"), bool([]), True + True)'], 'Empty things are False; "0" is a non-empty string. True counts as 1.', ['False True False 2']],
    ]),
    predict('Slices', ['s = "placement"', 'print(s[2:5], s[-3:], s[::3])'], [
      [2, 'What is printed?', ['ace ent pce', 'lac ent pce', 'ace men pct'], 'Up to (not including) 5; the last 3; every third.', { out: true }],
    ]),
    tapbug('Every call keeps the old items', ['def add(x, items=[]):', '    items.append(x)', '    return items'], [[1, 'items=[]', 'items=None'], [2, '    items.append(x)', '    items = items or []; items.append(x)']], 'Use None as the default and make a new list inside.'),
    check('a = [1]; b = a[:]; b.append(2). What is a?', ['[1]', '[1, 2]', '[2]', 'An error'], 'a[:] is a copy.', 'Copy, not alias.', { mono: true }),
    recap([
      ['🔗', 'b = a shares; a[:] or list(a) copies'],
      ['🧪', 'Never use a list as a default argument'],
      ['➗', '// rounds down; floats are approximate'],
    ]),
  ]),

  challenge('pl-i-8-ch', 'Module 8 Challenge', { icon: '🐍', name: 'Output Oracle' }, ['Predict list and name behaviour', 'Predict number results', 'Spot the default-argument trap'], [
    mcq(1, 'print(-9 // 4)?', ['-3', '-2', '-2.25', '2'], 'Rounds down.', { mono: true }),
    mcq(2, 'print([1, 2] * 2)?', ['[1, 2, 1, 2]', '[2, 4]', '[[1, 2], [1, 2]]', 'An error'], 'Repeats the list.', { mono: true }),
    mcq(3, 'print("5" + "3")?', ['53', '8', '"8"', 'An error'], 'Joins text.', { mono: true }),
    mcq(4, 'x = (5); type(x) is…', ['int', 'tuple', 'list', 'str'], 'A tuple needs a comma: (5,).', { mono: true }),
    mcq(5, 'print(len({1, 1, 2}))?', ['2', '3', '1', 'An error'], 'Sets drop duplicates.', { mono: true }),
    swipe([
      ['a is b is True when a and b are equal lists', false, 'Only for the same object.'],
      ['Strings can be multiplied by ints', true, '"ab" * 3.'],
      ['round(2.5) is 3 in Python', false, 'Banker’s rounding: 2.'],
      ['An empty list is falsy', true, 'bool([]) is False.'],
    ]),
    pairs([['a is b', 'Same object'], ['a == b', 'Same value'], ['a[:]', 'Copy'], ['-7 // 2', '-4']], 'Output rules.'),
    pickCode('Which makes a real copy of list a?', ['b = a.copy()', 'b = a', 'b == a', 'b = a.append()'], 'copy(), a[:] or list(a).'),
    bugTask(['scores = [70, 80]', 'backup = scores', 'scores.append(90)', 'print(backup)'], [[2, 'backup = scores', 'backup = scores[:]']], 'Copy if the backup must not change.'),
    predictTask(['nums = [1, 2, 3]', 'for x in nums:', '    x *= 10', 'print(nums)'], 'What does it print?', ['[1, 2, 3]', '[10, 20, 30]', '[10, 2, 3]', 'An error'], 'x is a name for each number; changing it doesn’t change the list.'),
    task(OLD, 'pl-output-py'),
  ]),

  c.lesson('pl-output-c', 'Output questions: C', 8, [
    chat(['C output questions are a favourite in written rounds of service companies. Each one tests a rule about operators, types or memory.']),
    C.compare('Operators', [
      ['i++ vs ++i', cprog(['int i = 5;', 'int a = i++;', 'int b = ++i;', 'printf("%d %d %d\\n", a, b, i);']), 'i++ gives the old value, then adds; ++i adds first.', ['5 7 7']],
      ['Integer maths', cprog(['printf("%d %.1f %d\\n", 7 / 2, 7 / 2.0, -7 / 2);']), 'int / int drops the decimals, rounding towards zero.', ['3 3.5 -3']],
      ['char is a number', cprog(["char c = 'A' + 2;", 'printf("%c %d\\n", c, c);']), 'Characters are small integers (ASCII).', ['C 67']],
    ]),
    C.compare('Classic traps', [
      ['Stray semicolon', cprog(['int i;', 'for (i = 0; i < 3; i++);', 'printf("%d\\n", i);']), 'The ; is the loop body: the printf runs once, after the loop.', ['3']],
      ['Unsigned wrap', cprog(['unsigned int u = 0;', 'u--;', 'printf("%u\\n", u);']), 'Unsigned numbers wrap to the largest value.', ['4294967295']],
      ['printf returns', cprog(['int n = printf("Hi ");', 'printf("%d\\n", n);']), 'printf returns how many characters it printed.', ['Hi 3']],
    ]),
    C.compare('static and switch', [
      ['static local', ['#include <stdio.h>', '', 'int next_ticket(void) {', '    static int n = 0;', '    return ++n;', '}', '', 'int main(void) {', '    next_ticket(); next_ticket();', '    printf("%d\\n", next_ticket());', '    return 0;', '}'], 'A static local keeps its value between calls.', ['3']],
      ['Fall-through', cprog(['int x = 1;', 'switch (x) {', '    case 1: printf("one ");', '    case 2: printf("two ");', '    default: printf("done\\n");', '}']), 'No break: it runs on into the later cases.', ['one two done']],
    ]),
    tapbug('It prints 3 once instead of 0, 1, 2', ['for (i = 0; i < 3; i++);', '    printf("%d\\n", i);'], [[1, 'i++);', 'i++)']], 'The stray ; ends the loop before the printf.'),
    c.check('int x = 10; printf("%d", x++ + 1); prints…', ['11', '12', '10', '21'], 'x++ gives 10, then x becomes 11.', 'Old value first.', { mono: true }),
    recap([
      ['➕', 'i++ old value; ++i new value'],
      ['➗', 'int / int drops decimals; char is a number'],
      ['🪤', 'Stray ;, missing break, unsigned wrap'],
    ]),
  ]),

  c.challenge('pl-i-9-ch', 'Module 9 Challenge', { icon: '🧾', name: 'C Output Expert' }, ['Predict increments and integer maths', 'Spot stray semicolons and fall-through', 'Know static and unsigned rules'], [
    C.mcq(1, 'int a = 5; int b = a++ * 2; b is…', ['10', '12', '11', '6'], 'Old value 5 × 2.', { mono: true }),
    C.mcq(2, 'printf("%d", 9 / 4);', ['2', '2.25', '3', '2.0'], 'Whole numbers.', { mono: true }),
    C.mcq(3, "printf(\"%d\", 'a' - 'A');", ['32', '0', '1', '-32'], 'ASCII 97 − 65.', { mono: true }),
    C.mcq(4, 'What does a static local variable keep?', ['Its value between calls', 'Nothing', 'Its address only', 'A copy'], 'Made once.'),
    C.mcq(5, 'sizeof(char) is…', ['1', '2', '4', '8'], 'Always 1.', { mono: true }),
    C.swipe([
      ['++i adds before the value is used', true, 'Pre-increment.'],
      ['-7 / 2 in C is -4', false, 'It is −3: towards zero.'],
      ['printf returns the number of characters printed', true, 'An int.'],
      ['A switch case without break falls through', true, 'Into the next.'],
    ]),
    C.pairs([['i++', 'Use, then add'], ['++i', 'Add, then use'], ['%u', 'Unsigned'], ['static', 'Kept between calls']], 'C rules.'),
    c.pickCode('Which prints 5 6?', ['int i = 5; printf("%d ", i++); printf("%d\\n", i);', 'int i = 5; printf("%d ", ++i); printf("%d\\n", i);', 'int i = 5; printf("%d %d\\n", i, i);', 'int i = 6; printf("%d %d\\n", i, i++);'], 'Old value first, then the new one.'),
    C.bugTask(['int total = 0;', 'for (int i = 1; i <= 3; i++);', '    total += i;'], [[2, 'i++);', 'i++)']], 'The stray semicolon ends the loop (and i is gone after it).'),
    C.xray('<div class="c">$ ./quiz</div><div class="a">5 7 7</div><div class="b">Hi 3</div>', [
      ['.a', 'Post and pre increment', 'int a = i++; int b = ++i;', ['int a = i++; int b = ++i;', 'int n = printf("Hi ");', 'unsigned int u = 0; u--;']],
      ['.b', 'A return value printed', 'int n = printf("Hi ");', ['int a = i++; int b = ++i;', 'int n = printf("Hi ");', 'unsigned int u = 0; u--;']],
    ]),
    task(OLD, 'pl-output-c'),
  ]),

  lesson('pl-oops', 'OOP interview questions', 8, [
    chat(['“Explain the four pillars of OOP” is asked in almost every technical interview. Answer each with a one-line meaning and a small example.']),
    toggleRun('The pillars in code', [
      ['Encapsulation', ['class Account:', '    def __init__(self):', '        self._balance = 0', '    def deposit(self, amount):', '        if amount > 0:', '            self._balance += amount', '    def balance(self):', '        return self._balance', 'a = Account()', 'a.deposit(500)', 'a.deposit(-90)', 'print(a.balance())'], 'Data changes only through methods that check it.', ['500']],
      ['Inheritance', ['class Coach:', '    def seats(self):', '        return 72', '    def describe(self):', '        return f"{self.seats()} seats"', 'class ACCoach(Coach):', '    def seats(self):', '        return 64', 'print(Coach().describe(), "/", ACCoach().describe())'], 'ACCoach reuses describe and overrides seats.', ['72 seats / 64 seats']],
      ['Polymorphism', ['class Card:', '    def fee(self, amount): return amount * 0.02', 'class Cash:', '    def fee(self, amount): return 0', 'for p in [Card(), Cash()]:', '    print(type(p).__name__, p.fee(500))'], 'One call, different behaviour per object.', ['Card 10.0', 'Cash 0']],
    ]),
    toggleRun('Often-asked details', [
      ['super()', ['class Train:', '    def __init__(self, name):', '        self.name = name', 'class Express(Train):', '    def __init__(self, name, stops):', '        super().__init__(name)', '        self.stops = stops', 'e = Express("Harbour", 3)', 'print(e.name, e.stops)'], 'super() runs the parent’s __init__.', ['Harbour 3']],
      ['Class vs instance', ['class Ticket:', '    made = 0', '    def __init__(self):', '        Ticket.made += 1', 'Ticket(); Ticket()', 'print(Ticket.made)'], 'A class attribute is shared by every object.', ['2']],
      ['__str__', ['class Seat:', '    def __init__(self, row, letter):', '        self.row, self.letter = row, letter', '    def __str__(self):', '        return f"Seat {self.row}{self.letter}"', 'print(Seat(14, "B"))'], 'print uses __str__.', ['Seat 14B']],
    ]),
    matchUp('Pillar to meaning', [['Encapsulation', 'Hide data behind methods'], ['Inheritance', 'Build on a parent class'], ['Polymorphism', 'Same call, different behaviour'], ['Abstraction', 'Show what, hide how']], 'The four pillars.'),
    tapbug('AttributeError: ’Express’ object has no attribute ’name’', ['class Express(Train):', '    def __init__(self, name, stops):', '        self.stops = stops'], [[3, '        self.stops = stops', '        super().__init__(name); self.stops = stops']], 'Call the parent’s __init__ so its fields are set too.'),
    check('Overloading vs overriding?', ['Overloading: same name, different parameters; overriding: a child replaces a parent method', 'They are the same', 'Overriding is for operators only', 'Overloading needs inheritance'], 'Python doesn’t really overload; Java does.', 'Same class or child class?'),
    recap([
      ['🏛', 'Encapsulation, inheritance, polymorphism, abstraction'],
      ['🧬', 'Override in a child; super() for the parent'],
      ['📦', 'Class attributes are shared; instance ones aren’t'],
    ]),
  ]),

  challenge('pl-i-10-ch', 'Module 10 Challenge', { icon: '🏛', name: 'OOP Interviewer' }, ['Explain the four pillars', 'Use inheritance and super()', 'Tell class from instance attributes'], [
    mcq(1, 'Which pillar hides data behind methods?', ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], 'A capsule.'),
    mcq(2, 'Which pillar lets a child reuse a parent’s code?', ['Inheritance', 'Encapsulation', 'Abstraction', 'Overloading'], 'extends / (Parent).'),
    mcq(3, 'What does super().__init__(name) do?', ['Runs the parent’s constructor', 'Makes a new parent', 'Deletes the child', 'Calls itself'], 'Parent setup.', { mono: true }),
    mcq(4, 'A class attribute is…', ['Shared by all objects', 'One per object', 'Private', 'Constant'], 'On the class.'),
    mcq(5, 'Which method does print(obj) use?', ['__str__', '__init__', '__print__', 'toString'], 'In Python.', { mono: true }),
    swipe([
      ['Polymorphism means one interface, many behaviours', true, 'Same call.'],
      ['An abstract class can be made directly', false, 'Only its children.'],
      ['Overriding needs a parent class', true, 'The child replaces a method.'],
      ['self is the current object', true, 'Passed automatically.'],
    ]),
    pairs([['__init__', 'Constructor'], ['self', 'This object'], ['super()', 'Parent'], ['__str__', 'Text form']], 'Python OOP.'),
    pickCode('Which makes Bus a child of Vehicle?', ['class Bus(Vehicle):', 'class Bus extends Vehicle:', 'class Bus: Vehicle', 'Bus = Vehicle()'], 'Parent in brackets.'),
    bugTask(['class Rider:', '    def __init__(name):', '        self.name = name'], [[2, '__init__(name)', '__init__(self, name)']], 'Methods take self first.'),
    predictTask(['class A:', '    def hi(self): return "A"', 'class B(A):', '    def hi(self): return "B" + super().hi()', 'print(B().hi())'], 'What does it print?', ['BA', 'B', 'A', 'AB'], 'B’s version, which calls A’s.'),
    task(OLD, 'pl-oops'),
  ]),

  sql.lesson('pl-sql', 'SQL interview questions', 8, [
    chat(['SQL rounds ask the same few questions: the second highest value, groups with HAVING, rows with no match, and NULLs. These use the trains, bookings and passengers tables.']),
    toggleRun('Second highest', [
      ['Subquery', ['SELECT MAX(fare) AS second', 'FROM trains', 'WHERE fare < (SELECT MAX(fare) FROM trains);'], 'The biggest fare below the biggest.', ['second', '2900']],
      ['LIMIT OFFSET', ['SELECT DISTINCT fare FROM trains', 'ORDER BY fare DESC', 'LIMIT 1 OFFSET 1;'], 'Skip one, take one. DISTINCT handles ties.', ['fare', '2900']],
      ['DENSE_RANK', ['SELECT name, fare, DENSE_RANK() OVER (ORDER BY fare DESC) AS rnk', 'FROM trains', 'ORDER BY rnk', 'LIMIT 3;'], 'A window function ranks every row: works for any Nth.', ['name | fare | rnk', 'Harbour Royal | 3100 | 1', 'Royal | 2900 | 2', 'Keystone Express | 2100 | 3']],
    ]),
    toggleRun('Groups, gaps and NULLs', [
      ['HAVING', ['SELECT passenger, SUM(seats) AS total', 'FROM bookings', 'GROUP BY passenger', 'HAVING COUNT(*) > 1;'], 'WHERE filters rows; HAVING filters groups.', ['passenger | total', 'Ava | 4']],
      ['No match', ['SELECT name FROM trains', 'WHERE id NOT IN (SELECT train_id FROM bookings)', 'ORDER BY name;'], 'Trains nobody booked.', ['name', 'Coastal Express', 'Harbour Royal', 'Silver Arrow']],
      ['COUNT and NULL', ['SELECT COUNT(*) AS everyone, COUNT(phone) AS with_phone', 'FROM passengers;'], 'COUNT(column) skips NULLs.', ['everyone | with_phone', '5 | 3']],
    ]),
    reveal('Short answers to common questions', [
      ['WHERE vs HAVING', 'WHERE before grouping, HAVING after.'],
      ['DELETE vs TRUNCATE vs DROP', 'Some rows; all rows; the whole table.'],
      ['Primary vs foreign key', 'Unique id of a row; a column pointing at another table’s key.'],
      ['INNER vs LEFT JOIN', 'Only matches; every left row, NULL where no match.'],
    ]),
    tapbug('Error: misuse of aggregate: COUNT()', ['SELECT passenger FROM bookings', 'WHERE COUNT(*) > 1', 'GROUP BY passenger;'], [[2, 'WHERE COUNT(*) > 1', 'HAVING COUNT(*) > 1']], 'Group conditions go in HAVING, after GROUP BY.'),
    check('Which finds rows where phone is missing?', ['WHERE phone IS NULL', 'WHERE phone = NULL', 'WHERE phone == ""', 'WHERE NOT phone'], 'NULL is never equal to anything.', 'A special test.', { mono: true }),
    recap([
      ['🥈', 'Second highest: MAX below MAX, OFFSET, or DENSE_RANK'],
      ['📊', 'GROUP BY + HAVING for group conditions'],
      ['🕳', 'IS NULL; COUNT(col) skips NULLs'],
    ]),
  ]),

  sql.challenge('pl-i-11-ch', 'Module 11 Challenge', { icon: '🗄', name: 'Query Cracker' }, ['Find the Nth highest value', 'Filter groups with HAVING', 'Handle NULLs and missing matches'], [
    mcq(1, 'Which keyword filters groups?', ['HAVING', 'WHERE', 'GROUP', 'FILTER'], 'After GROUP BY.', { mono: true }),
    mcq(2, 'COUNT(phone) counts…', ['Rows where phone is not NULL', 'Every row', 'Distinct phones only', 'NULL rows'], 'NULLs are skipped.', { mono: true }),
    mcq(3, 'LIMIT 1 OFFSET 2 after ORDER BY fare DESC gives…', ['The third highest fare', 'The second', 'The lowest', 'Two rows'], 'Skip two.'),
    mcq(4, 'Which removes the whole table, structure too?', ['DROP TABLE', 'DELETE FROM', 'TRUNCATE', 'REMOVE'], 'Gone.', { mono: true }),
    mcq(5, 'A LEFT JOIN keeps…', ['Every row of the left table', 'Only matches', 'Every row of both', 'Only NULLs'], 'NULL where no match.'),
    swipe([
      ['phone = NULL finds missing phones', false, 'Use IS NULL.'],
      ['DENSE_RANK gives ties the same rank', true, 'With no gaps.'],
      ['WHERE runs before GROUP BY', true, 'Rows, then groups.'],
      ['A foreign key points at another table’s key', true, 'It links tables.'],
    ]),
    pairs([['HAVING', 'Group filter'], ['IS NULL', 'Missing value'], ['DISTINCT', 'No repeats'], ['OFFSET', 'Skip rows']], 'SQL keywords.'),
    pickCode('Which lists passengers who booked more than once?', ['SELECT passenger FROM bookings GROUP BY passenger HAVING COUNT(*) > 1;', 'SELECT passenger FROM bookings WHERE COUNT(*) > 1;', 'SELECT DISTINCT passenger FROM bookings;', 'SELECT passenger, COUNT(*) FROM bookings;'], 'Group, then filter.'),
    bugTask(['SELECT name FROM passengers', 'WHERE city = NULL;'], [[2, 'city = NULL', 'city IS NULL']], 'NULL needs IS NULL.'),
    predictTask(['import sqlite3', 'db = sqlite3.connect(":memory:")', 'db.execute("CREATE TABLE t (fare INTEGER)")', 'db.executemany("INSERT INTO t VALUES (?)", [(500,), (900,), (900,), (300,)])', 'print(db.execute("SELECT MAX(fare) FROM t WHERE fare < (SELECT MAX(fare) FROM t)").fetchone()[0])'], 'What does it print?', ['500', '900', '300', 'None'], 'The highest below 900 (ties don’t count twice).'),
    task(OLD, 'pl-sql'),
  ]),

  lesson('pl-complexity', 'Complexity questions', 8, [
    chat(['“What is the time complexity of your solution?” follows almost every coding question. Count how the work grows as the input grows.']),
    toggleRun('Count the steps', [
      ['One after another', ['n, steps = 100, 0', 'for i in range(n): steps += 1', 'for j in range(n): steps += 1', 'print(steps)'], 'n + n = 2n: still O(n).', ['200']],
      ['One inside another', ['n, steps = 100, 0', 'for i in range(n):', '    for j in range(n):', '        steps += 1', 'print(steps)'], 'n × n: O(n²).', ['10000']],
      ['Halving', ['n, steps = 1024, 0', 'while n > 1:', '    n //= 2', '    steps += 1', 'print(steps)'], 'Halving each time: O(log n). 1024 → 10 steps.', ['10']],
    ]),
    toggleRun('Two sum, two ways', [
      ['O(n²)', ['nums, target = [3, 8, 1, 6], 7', 'pairs = 0', 'for i in range(len(nums)):', '    for j in range(i + 1, len(nums)):', '        pairs += 1', '        if nums[i] + nums[j] == target:', '            print("found", nums[i], nums[j], "after", pairs, "checks")'], 'Every pair.', ['found 1 6 after 6 checks']],
      ['O(n)', ['nums, target = [3, 8, 1, 6], 7', 'seen = set()', 'for k, x in enumerate(nums, 1):', '    if target - x in seen:', '        print("found", target - x, x, "after", k, "checks")', '    seen.add(x)'], 'A set turns the inner loop into one lookup, using O(n) space.', ['found 1 6 after 4 checks']],
    ]),
    predict('How many steps?', ['n, steps = 1000000, 0', 'while n > 1:', '    n //= 2', '    steps += 1', 'print(steps)'], [
      [5, 'What is printed?', ['19', '1000', '500000'], 'log₂(1,000,000) ≈ 20; halving with // gives 19.', { out: true }],
    ]),
    matchUp('Name the complexity', [['Binary search', 'O(log n)'], ['One loop over the list', 'O(n)'], ['Merge sort', 'O(n log n)'], ['Every pair of items', 'O(n²)']], 'Common answers.'),
    check('O(3n² + 5n + 2) simplifies to…', ['O(n²)', 'O(3n²)', 'O(n)', 'O(5n)'], 'Keep the biggest term, drop constants.', 'Biggest term wins.', { mono: true }),
    recap([
      ['📈', 'Sequential loops add; nested loops multiply'],
      ['✂', 'Halving is O(log n)'],
      ['⚖', 'Trade space for time: a set or dict'],
    ]),
  ]),

  challenge('pl-i-12-ch', 'Module 12 Challenge', { icon: '📈', name: 'Big-O Boss' }, ['Count steps as input grows', 'Simplify Big-O', 'Trade space for time'], [
    mcq(1, 'Two loops one after the other over n items?', ['O(n)', 'O(n²)', 'O(2)', 'O(log n)'], '2n → n.', { mono: true }),
    mcq(2, 'A loop that halves n each time?', ['O(log n)', 'O(n)', 'O(n/2)', 'O(1)'], 'Halving.', { mono: true }),
    mcq(3, 'Looking up a key in a dict, on average?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'Hashing.', { mono: true }),
    mcq(4, 'Python’s sorted() is…', ['O(n log n)', 'O(n)', 'O(n²)', 'O(1)'], 'Timsort.', { mono: true }),
    mcq(5, 'Two sum with a set uses how much extra space?', ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'], 'Up to n numbers stored.', { mono: true }),
    swipe([
      ['O(n log n) grows faster than O(n)', true, 'By the log factor.'],
      ['Constants matter in Big-O', false, 'They are dropped.'],
      ['Recursion uses stack space', true, 'One frame per call.'],
      ['O(1) means exactly one step', false, 'A fixed amount, whatever n is.'],
    ]),
    pairs([['O(1)', 'Dict lookup'], ['O(log n)', 'Binary search'], ['O(n)', 'One pass'], ['O(n²)', 'Nested loops']], 'Complexities.'),
    pickCode('Which checks for duplicates in O(n)?', ['len(set(nums)) != len(nums)', 'any(nums.count(x) > 1 for x in nums)', 'sorted(nums) == nums', 'for a in nums: for b in nums: …'], 'A set is O(n).'),
    bugTask(['seen = []', 'for x in nums:', '    if x in seen: return True', '    seen.append(x)'], [[1, 'seen = []', 'seen = set()'], [4, 'seen.append(x)', 'seen.add(x)']], 'x in a list is O(n), making the loop O(n²). A set keeps it O(n).'),
    predictTask(['steps = 0', 'for i in range(4):', '    for j in range(i):', '        steps += 1', 'print(steps)'], 'What does it print?', ['6', '16', '4', '10'], '0 + 1 + 2 + 3: still O(n²) as it grows.'),
    task(OLD, 'pl-complexity'),
  ]),
];
