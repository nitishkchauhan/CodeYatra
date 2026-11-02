// CBSE Computer Science (083) · Modules 7–12 (Intermediate): modules, exception handling, text files, binary and CSV
// files, the stack and SQL. Each module’s lesson keeps its old id; its Challenge ends with the old tested board-style
// program. Python runs for real in tests (in its own folder, so the file programs really write files); SQL runs on
// the sample tables.
import type { Lesson } from '../../types';
import { CBSE_LESSONS as OLD } from '../cbse';
import { bugTask, chat, check, kit, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, swipe, tapbug, task, toggleRun } from '../placementV5/kit';

const { lesson, challenge } = kit('python');
const sql = kit('sql');
const BOARD = 'TASK 6 OF 6 · BOARD PROGRAM';

export const CBSE_M7: Lesson[] = [
  lesson('cbse-modules', 'Modules: math, random and statistics', 7, [
    chat(['A module is a file of ready-made functions. import brings it in. The syllabus names three: math, random and statistics.']),
    toggleRun('Using modules', [
      ['math', ['import math', 'print(math.sqrt(49), math.ceil(4.2), math.floor(-4.2), math.factorial(5), math.pow(2, 3))'], 'sqrt and pow give floats; ceil rounds up, floor down.', ['7.0 5 -5 120 8.0']],
      ['statistics', ['import statistics as st', 'marks = [70, 85, 64, 91, 85]', 'print(st.mean(marks), st.median(marks), st.mode(marks))'], 'mean (average), median (middle when sorted), mode (most common).', ['79 85 85']],
      ['from … import', ['from math import pi, sqrt', 'print(round(pi, 2), sqrt(16))'], 'Import just the names you need; no math. in front.', ['3.14 4.0']],
    ]),
    reveal('random (different every run)', [
      ['random()', 'A float from 0 up to (not including) 1.'],
      ['randint(a, b)', 'A whole number from a to b, both included.'],
      ['randrange(a, b)', 'From a up to b − 1 (like range).'],
      ['choice(list)', 'One item picked at random.'],
    ], { mono: true }),
    predict('Find the output', ['import math', 'x = math.floor(7.9) + math.ceil(2.1)', 'print(x, math.fabs(-x))'], [
      [3, 'What is printed?', ['10 10.0', '10 10', '9 9.0'], '7 + 3; fabs gives a float.', { out: true }],
    ]),
    tapbug('NameError: name ’sqrt’ is not defined', ['import math', 'print(sqrt(25))'], [[2, 'sqrt(25)', 'math.sqrt(25)']], 'With import math, write math.sqrt (or use from math import sqrt).'),
    check('Which can random.randint(1, 6) return?', ['Any of 1 to 6', '1 to 5 only', '0 to 6', '2 to 5'], 'Both ends included.', 'Like a dice.', { mono: false }),
    recap([
      ['📚', 'import math; import statistics as st; from math import pi'],
      ['📐', 'sqrt, ceil, floor, pow, factorial'],
      ['🎲', 'random, randint, randrange; mean, median, mode'],
    ]),
  ]),

  challenge('cbse-i-7-ch', 'Module 7 Challenge', { icon: '📚', name: 'Module Master' }, ['Import modules three ways', 'Use math and statistics', 'Know random’s ranges'], [
    mcq(1, 'math.ceil(3.01) is…', ['4', '3', '3.0', '4.0'], 'Round up to an int.', { mono: true }),
    mcq(2, 'statistics.median([5, 1, 3]) is…', ['3', '1', '5', '9'], 'The middle when sorted.', { mono: true }),
    mcq(3, 'random.randrange(1, 5) can never return…', ['5', '1', '3', '4'], 'Stop is left out.', { mono: true }),
    mcq(4, 'After import math as m, sqrt is called as…', ['m.sqrt(9)', 'math.sqrt(9)', 'sqrt(9)', 'm::sqrt(9)'], 'The alias.', { mono: true }),
    mcq(5, 'math.floor(-2.5) is…', ['-3', '-2', '-2.5', '2'], 'Down, towards minus infinity.', { mono: true }),
    swipe([
      ['math.sqrt returns a float', true, '7.0.'],
      ['random.random() can return 1', false, 'Up to, not including, 1.'],
      ['mode is the most common value', true, 'In statistics.'],
      ['from math import * is the safest import', false, 'Names can clash.'],
    ]),
    pairs([['ceil', 'Up'], ['floor', 'Down'], ['mean', 'Average'], ['randint', 'Random whole number']], 'Module functions.'),
    pickCode('Which prints a random dice roll?', ['import random; print(random.randint(1, 6))', 'import random; print(random.randint(0, 6))', 'print(random(6))', 'import math; print(math.random(6))'], '1 to 6.'),
    bugTask(['import statistics', 'print(statistic.mean([2, 4]))'], [[2, 'statistic.mean', 'statistics.mean']], 'Use the module’s exact name.'),
    predictTask(['import math', 'print(math.gcd(24, 36), int(math.sqrt(50)))'], 'What does it print?', ['12 7', '6 7', '12 7.07', '12 8'], 'gcd 12; √50 ≈ 7.07, int drops the rest.'),
    task(OLD, 'cbse-modules', BOARD),
  ]),

  lesson('cbse-exceptions', 'Exception handling', 7, [
    chat(['An exception is an error while the program runs: dividing by zero, a missing key, bad input. Without handling, the program stops.', 'try runs risky code; except handles a problem; else runs if nothing went wrong; finally always runs.']),
    toggleRun('try and except', [
      ['ZeroDivisionError', ['try:', '    print(100 / 0)', 'except ZeroDivisionError:', '    print("Can’t divide by zero")'], 'The except block handles that one error.', ['Can’t divide by zero']],
      ['ValueError', ['try:', '    n = int("abc")', 'except ValueError as e:', '    print("Bad number:", e)'], 'as e gives the message.', ["Bad number: invalid literal for int() with base 10: 'abc'"]],
      ['else and finally', ['try:', '    n = int("42")', 'except ValueError:', '    print("bad")', 'else:', '    print("got", n)', 'finally:', '    print("done")'], 'else when no error; finally always.', ['got 42', 'done']],
    ]),
    toggleRun('More exceptions', [
      ['Several excepts', ['data = {"Ava": 82}', 'for key in ["Ava", "Reed"]:', '    try:', '        print(100 // data[key])', '    except KeyError:', '        print("No", key)', '    except ZeroDivisionError:', '        print("Zero marks")'], 'Each kind of problem gets its own handler.', ['1', 'No Reed']],
      ['raise', ['def set_marks(m):', '    if not 0 <= m <= 100:', '        raise ValueError("Marks must be 0 to 100")', '    return m', 'try:', '    set_marks(120)', 'except ValueError as e:', '    print(e)'], 'raise starts an exception on purpose.', ['Marks must be 0 to 100']],
    ]),
    matchUp('Which exception?', [['10 / 0', 'ZeroDivisionError'], ['int("ten")', 'ValueError'], ['[1, 2][5]', 'IndexError'], ['{}["a"]', 'KeyError'], ['"a" + 1', 'TypeError']], 'Built-in exceptions.'),
    tapbug('ValueError still stops the program', ['try:', '    n = int("ten")', 'except TypeError:', '    n = 0'], [[3, 'TypeError', 'ValueError']], 'int("ten") raises ValueError; catch that one.'),
    check('When does a finally block run?', ['Always', 'Only when there is an error', 'Only without an error', 'Never'], 'Clean-up code.', 'Either way.'),
    recap([
      ['🛟', 'try / except / else / finally'],
      ['🏷', 'ZeroDivisionError, ValueError, IndexError, KeyError, TypeError'],
      ['🚫', 'raise to signal a problem yourself'],
    ]),
  ]),

  challenge('cbse-i-8-ch', 'Module 8 Challenge', { icon: '🛟', name: 'Error Handler' }, ['Catch common exceptions', 'Use else and finally', 'Raise your own'], [
    mcq(1, 'int("12.5") raises…', ['ValueError', 'TypeError', 'ZeroDivisionError', 'Nothing'], 'Not a whole number.', { mono: true }),
    mcq(2, '[1, 2, 3][3] raises…', ['IndexError', 'KeyError', 'ValueError', 'Nothing'], 'Past the end.', { mono: true }),
    mcq(3, 'When does the else of a try run?', ['When no exception happened', 'Always', 'After an exception', 'Never'], 'Success path.', { mono: true }),
    mcq(4, 'Which starts an exception on purpose?', ['raise', 'throw', 'except', 'error'], 'Python’s keyword.', { mono: true }),
    mcq(5, '"5" + 5 raises…', ['TypeError', 'ValueError', 'SyntaxError', 'Nothing'], 'Mixing types.', { mono: true }),
    swipe([
      ['A SyntaxError can be caught at run time', false, 'The program doesn’t start.'],
      ['One try can have several except blocks', true, 'One per kind.'],
      ['finally runs even after return', true, 'Always.'],
      ['except: with no name catches everything', true, 'But name the error when you can.'],
    ]),
    pairs([['try', 'Risky code'], ['except', 'Handle'], ['else', 'No error'], ['finally', 'Always']], 'The blocks.'),
    pickCode('Which handler catches int("abc")?', ['except ValueError:', 'except TypeError:', 'except KeyError:', 'except ZeroDivisionError:'], 'A bad value for int.'),
    bugTask(['try:', '    x = 10 / 0', 'except ValueError:', '    print("oops")'], [[3, 'ValueError', 'ZeroDivisionError']], 'Catch the error that is really raised.'),
    predictTask(['def f():', '    try:', '        return "try"', '    finally:', '        print("finally")', 'print(f())'], 'What is the last line printed?', ['try', 'finally', 'None', 'An error'], 'finally prints first, then the returned value is printed.'),
    task(OLD, 'cbse-exceptions', BOARD),
  ]),

  lesson('cbse-files', 'Text files', 8, [
    chat(['Variables vanish when a program ends; files keep data. open(name, mode) gives a file object. Text files hold lines of characters.', 'with open(…) as f: closes the file for you, even after an error.']),
    toggleRun('Write, then read', [
      ['write and read', ['with open("menu.txt", "w") as f:', '    f.write("Tea\\nToast\\nSoup\\n")', 'with open("menu.txt") as f:', '    print(f.read().split())'], '"w" makes (or empties) the file; read gives everything as one string.', ["['Tea', 'Toast', 'Soup']"]],
      ['readline and readlines', ['with open("menu.txt", "w") as f:', '    f.writelines(["Tea\\n", "Toast\\n", "Soup\\n"])', 'with open("menu.txt") as f:', '    first = f.readline()', '    rest = f.readlines()', 'print(repr(first), rest)'], 'readline reads one line (with \\n); readlines the rest as a list.', ["'Tea\\n' ['Toast\\n', 'Soup\\n']"]],
      ['append', ['with open("log.txt", "w") as f:', '    f.write("open\\n")', 'with open("log.txt", "a") as f:', '    f.write("close\\n")', 'with open("log.txt") as f:', '    for line in f:', '        print(line.strip())'], '"a" adds to the end; a for loop reads line by line.', ['open', 'close']],
    ]),
    toggleRun('Board-style counting', [
      ['Lines starting with T', ['with open("menu.txt", "w") as f:', '    f.write("Tea\\nToast\\nSoup\\nTart\\n")', 'with open("menu.txt") as f:', '    print(sum(1 for line in f if line.startswith("T")))'], 'Go line by line and count.', ['3']],
      ['Words and characters', ['with open("note.txt", "w") as f:', '    f.write("the train is on time")', 'with open("note.txt") as f:', '    text = f.read()', 'print(len(text.split()), text.count("t"), len(text))'], 'split for words; count for a letter; len for characters.', ['5 3 20']],
    ]),
    reveal('Modes and pointer', [
      ['"r"', 'Read (the default). Error if the file is missing.'],
      ['"w" / "a"', 'Write fresh / add to the end. Both create the file.'],
      ['"r+" / "w+"', 'Read and write.'],
      ['tell() / seek(n)', 'Where the pointer is / move it to byte n.'],
    ], { mono: true }),
    tapbug('io.UnsupportedOperation: not writable', ['with open("log.txt") as f:', '    f.write("done")'], [[1, 'open("log.txt")', 'open("log.txt", "a")']], 'The default mode is "r". Open for writing or appending.'),
    check('What does "w" mode do to an existing file?', ['Empties it first', 'Adds to the end', 'Reads it', 'Fails'], 'Fresh start.', 'Careful!', { mono: false }),
    recap([
      ['📂', 'open(name, mode); with closes it for you'],
      ['📖', 'read, readline, readlines, or for line in f'],
      ['✍', 'write, writelines; "w" empties, "a" appends'],
    ]),
  ]),

  challenge('cbse-i-9-ch', 'Module 9 Challenge', { icon: '📂', name: 'File Reader' }, ['Open files in the right mode', 'Read lines, words and characters', 'Write and append text'], [
    mcq(1, 'What is the default mode of open()?', ['"r"', '"w"', '"a"', '"rb"'], 'Read text.', { mono: true }),
    mcq(2, 'f.readlines() returns…', ['A list of lines', 'One string', 'The first line', 'The number of lines'], 'Each with its \\n.', { mono: true }),
    mcq(3, 'Why use with open(…) as f?', ['It closes the file automatically', 'It is faster', 'It reads binary', 'It locks the file'], 'Even after errors.'),
    mcq(4, 'Which adds text to the end of a file?', ['open(name, "a")', 'open(name, "w")', 'open(name, "r")', 'open(name, "x")'], 'Append.', { mono: true }),
    mcq(5, 'f.tell() gives…', ['The pointer’s position', 'The file size', 'The number of lines', 'The file name'], 'Where you are.', { mono: true }),
    swipe([
      ['"r" fails if the file doesn’t exist', true, 'FileNotFoundError.'],
      ['write() adds a new line by itself', false, 'Add \\n yourself.'],
      ['readline() keeps the \\n', true, 'strip() removes it.'],
      ['for line in f reads one line at a time', true, 'Memory-friendly.'],
    ]),
    pairs([['read()', 'Whole file'], ['readline()', 'One line'], ['readlines()', 'List of lines'], ['seek(0)', 'Back to start']], 'Reading.'),
    pickCode('Which counts the lines in data.txt?', ['with open("data.txt") as f: print(len(f.readlines()))', 'print(len(open("data.txt")))', 'with open("data.txt") as f: print(f.count("\\n") + 1)', 'print(open("data.txt").lines)'], 'A list of lines, then len.'),
    bugTask(['f = open("notes.txt", "w")', 'f.write(42)', 'f.close'], [[2, 'f.write(42)', 'f.write("42")'], [3, 'f.close', 'f.close()']], 'write needs a string, and close needs brackets.'),
    predictTask(['with open("t.txt", "w") as f:', '    f.write("ab\\ncd\\n")', 'with open("t.txt") as f:', '    f.readline()', '    print(f.readline().strip())'], 'What does it print?', ['cd', 'ab', 'abcd', 'An empty line'], 'The first readline takes “ab”; the next gives “cd”.'),
    task(OLD, 'cbse-files', BOARD),
  ]),

  lesson('cbse-binary', 'Binary and CSV files', 8, [
    chat(['Binary files store Python objects as bytes using the pickle module: dump writes, load reads. CSV files store tables as comma-separated text, read with the csv module.']),
    toggleRun('Binary files with pickle', [
      ['dump and load', ['import pickle', 'rec = {"roll": 7, "name": "Mia", "marks": 88}', 'with open("stu.dat", "wb") as f:', '    pickle.dump(rec, f)', 'with open("stu.dat", "rb") as f:', '    print(pickle.load(f))'], '"wb" and "rb": binary modes.', ["{'roll': 7, 'name': 'Mia', 'marks': 88}"]],
      ['Many records', ['import pickle', 'with open("stu.dat", "wb") as f:', '    for r in [(1, "Ava", 82), (2, "Reed", 91), (3, "Zoey", 77)]:', '        pickle.dump(r, f)', 'with open("stu.dat", "rb") as f:', '    try:', '        while True:', '            roll, name, m = pickle.load(f)', '            if m > 80:', '                print(name)', '    except EOFError:', '        pass'], 'Load until EOFError: the board-exam pattern for searching records.', ['Ava', 'Reed']],
    ]),
    toggleRun('CSV files', [
      ['Write and read', ['import csv', 'with open("marks.csv", "w", newline="") as f:', '    w = csv.writer(f)', '    w.writerow(["name", "marks"])', '    w.writerows([["Ava", 82], ["Reed", 91]])', 'with open("marks.csv", newline="") as f:', '    for row in csv.reader(f):', '        print(row)'], 'Each row comes back as a list of strings.', ["['name', 'marks']", "['Ava', '82']", "['Reed', '91']"]],
      ['Skip the header', ['import csv', 'with open("marks.csv", "w", newline="") as f:', '    csv.writer(f).writerows([["name", "marks"], ["Ava", 82], ["Reed", 91]])', 'with open("marks.csv", newline="") as f:', '    r = csv.reader(f)', '    next(r)', '    print(sum(int(row[1]) for row in r))'], 'next(r) skips one row; convert numbers with int.', ['173']],
    ]),
    reveal('Text, binary or CSV?', [
      ['Text', 'Human-readable lines. open(name, "r"/"w").'],
      ['Binary', 'Python objects as bytes. pickle with "rb"/"wb".'],
      ['CSV', 'Tables as text, comma-separated. csv.reader/writer; newline="".'],
    ]),
    tapbug('TypeError: write() argument must be str, not bytes', ['import pickle', 'with open("stu.dat", "w") as f:', '    pickle.dump([1, 2], f)'], [[2, '"w"', '"wb"']], 'pickle needs a binary file: "wb".'),
    check('What does csv.reader give for each row?', ['A list of strings', 'A dictionary', 'A tuple of ints', 'One string'], 'Convert numbers yourself.', 'Strings!', { mono: false }),
    recap([
      ['🥒', 'pickle.dump / load with "wb" / "rb"'],
      ['⛔', 'Read records until EOFError'],
      ['🧾', 'csv.writer(f).writerow; csv.reader gives lists of strings'],
    ]),
  ]),

  challenge('cbse-i-10-ch', 'Module 10 Challenge', { icon: '🥒', name: 'Record Keeper' }, ['Store records with pickle', 'Read records until EOFError', 'Write and read CSV files'], [
    mcq(1, 'Which mode writes a binary file?', ['"wb"', '"w"', '"bw+"', '"b"'], 'Write binary.', { mono: true }),
    mcq(2, 'Which writes an object to a binary file?', ['pickle.dump(obj, f)', 'pickle.load(f)', 'f.write(obj)', 'csv.dump(obj)'], 'dump writes.', { mono: true }),
    mcq(3, 'What signals the end while loading records?', ['EOFError', 'None', 'StopIteration', 'An empty dict'], 'End of file.', { mono: true }),
    mcq(4, 'Why newline="" with csv files?', ['To stop blank lines between rows', 'For speed', 'To read binary', 'It is required for pickle'], 'csv handles line endings.'),
    mcq(5, 'csv.reader gives "82" for 82. To add it, use…', ['int(row[1])', 'row[1] + 0', 'float(row)', 'row[1].int()'], 'Convert.', { mono: true }),
    swipe([
      ['pickle files can be read in a text editor', false, 'They are bytes.'],
      ['writerows writes many rows at once', true, 'A list of rows.'],
      ['next(reader) skips the header row', true, 'One row.'],
      ['load reads the whole file at once', false, 'One object per call.'],
    ]),
    pairs([['dump', 'Write object'], ['load', 'Read object'], ['writerow', 'One CSV row'], ['reader', 'CSV rows']], 'File functions.'),
    pickCode('Which line reads one record from binary file f?', ['rec = pickle.load(f)', 'rec = f.readline()', 'rec = pickle.dump(f)', 'rec = csv.reader(f)'], 'load reads one object.'),
    bugTask(['import csv', 'with open("m.csv", "w") as f:', '    csv.writer(f).writerow("Ava", 82)'], [[2, '"w")', '"w", newline="")'], [3, 'writerow("Ava", 82)', 'writerow(["Ava", 82])']], 'newline="" for csv, and a row is one list.'),
    predictTask(['import pickle', 'with open("n.dat", "wb") as f:', '    for n in [4, 9, 2]:', '        pickle.dump(n, f)', 'total = 0', 'with open("n.dat", "rb") as f:', '    try:', '        while True:', '            total += pickle.load(f)', '    except EOFError:', '        pass', 'print(total)'], 'What does it print?', ['15', '4', '0', 'An error'], 'Three loads, then EOFError.'),
    task(OLD, 'cbse-binary', BOARD),
  ]),

  lesson('cbse-stack', 'Stack using a list', 7, [
    chat(['A stack is last in, first out (LIFO), like a pile of plates. Push puts on top; pop takes from the top.', 'In Python, a list is a stack: append pushes, pop() pops, L[-1] peeks.']),
    toggleRun('Stack operations', [
      ['push and pop', ['stack = []', 'stack.append(10)', 'stack.append(20)', 'stack.append(30)', 'print(stack.pop(), stack.pop(), stack)'], 'The last pushed comes out first.', ['30 20 [10]']],
      ['peek and empty', ['stack = [10, 20]', 'print(stack[-1], len(stack) == 0)', 'stack.clear()', 'print(stack[-1] if stack else "Underflow")'], 'Peek looks without removing; check empty before popping.', ['20 False', 'Underflow']],
    ]),
    toggleRun('Stack uses', [
      ['Reverse a word', ['stack = list("board")', 'out = ""', 'while stack:', '    out += stack.pop()', 'print(out)'], 'Pop everything: it comes out backwards.', ['draob']],
      ['Balanced brackets', ['def balanced(s):', '    stack = []', '    for ch in s:', '        if ch == "(":', '            stack.append(ch)', '        elif ch == ")":', '            if not stack:', '                return False', '            stack.pop()', '    return not stack', 'print(balanced("(a(b)c)"), balanced("(()"), balanced(")("))'], 'Every ) must match an open (.', ['True False False']],
    ]),
    predict('Find the output', ['s = []', 'for n in [3, 7, 1, 8]:', '    if n % 2:', '        s.append(n)', 'print(s.pop() + s.pop())'], [
      [5, 'What is printed?', ['8', '10', '4'], 'Odd numbers pushed: 3, 7, 1. Pop 1, then 7.', { out: true }],
    ]),
    tapbug('IndexError: pop from empty list', ['stack = []', 'print(stack.pop())'], [[2, 'print(stack.pop())', 'print(stack.pop() if stack else "Underflow")']], 'Check for an empty stack (underflow) first.'),
    check('Which order does a stack follow?', ['LIFO: last in, first out', 'FIFO: first in, first out', 'Sorted', 'Random'], 'Plates.', 'A queue is FIFO.'),
    recap([
      ['🥞', 'LIFO: push with append, pop with pop()'],
      ['👀', 'Peek: stack[-1]; empty: not stack'],
      ['⚠', 'Popping an empty stack is underflow'],
    ]),
  ]),

  challenge('cbse-i-11-ch', 'Module 11 Challenge', { icon: '🥞', name: 'Stack Builder' }, ['Push, pop and peek', 'Handle underflow', 'Use a stack to reverse and match'], [
    mcq(1, 'Push 1, 2, 3, then pop. What comes out?', ['3', '1', '2', '[1, 2]'], 'Last in.', { mono: true }),
    mcq(2, 'Which list method pushes?', ['append', 'insert(0)', 'push', 'add'], 'To the end.', { mono: true }),
    mcq(3, 'What is underflow?', ['Popping an empty stack', 'A full stack', 'A sorted stack', 'Pushing None'], 'Nothing to pop.'),
    mcq(4, 'How do you peek at the top of stack S?', ['S[-1]', 'S[0]', 'S.pop()', 'S.top'], 'The end of the list.', { mono: true }),
    mcq(5, 'Which uses a stack?', ['Undo in an editor', 'A queue at a ticket counter', 'Sorting by name', 'A phone book'], 'Last action first.'),
    swipe([
      ['A stack is FIFO', false, 'LIFO.'],
      ['pop() removes and returns the top', true, 'The last item.'],
      ['not S is True when S is empty', true, 'Empty lists are falsy.'],
      ['Function calls are tracked on a stack', true, 'The call stack.'],
    ]),
    pairs([['append', 'Push'], ['pop()', 'Pop'], ['S[-1]', 'Peek'], ['not S', 'Empty?']], 'Stack operations.'),
    pickCode('Which pops safely?', ['item = S.pop() if S else None', 'item = S.pop(0)', 'item = S[-1]; S.pop(-2)', 'item = S.remove()'], 'Check first.'),
    bugTask(['def push(S, x):', '    S.insert(0, x)', 'def pop(S):', '    return S.pop()'], [[2, 'S.insert(0, x)', 'S.append(x)']], 'Push and pop must use the same end of the list.'),
    predictTask(['S = []', 'for ch in "abc":', '    S.append(ch)', 'S.pop()', 'S.append("z")', 'print("".join(S))'], 'What does it print?', ['abz', 'zab', 'abcz', 'az'], 'c is popped, z pushed.'),
    task(OLD, 'cbse-stack', BOARD),
  ]),

  sql.lesson('cbse-sql', 'SQL for board exams', 8, [
    chat(['Board SQL questions use one or two tables and ask for SELECT queries with conditions, sorting, groups and joins. These use the trains, bookings and passengers tables.']),
    toggleRun('Conditions', [
      ['BETWEEN', ['SELECT name, fare FROM trains', 'WHERE fare BETWEEN 1000 AND 2000', 'ORDER BY fare;'], 'Both ends included.', ['name | fare', 'Silver Arrow | 1200', 'Valley Express | 1750']],
      ['LIKE', ['SELECT name FROM trains', "WHERE name LIKE '%Express'", 'ORDER BY name;'], '% matches any characters; _ matches one.', ['name', 'Coastal Express', 'Keystone Express', 'Valley Express']],
      ['IN and IS NULL', ['SELECT name, city FROM passengers', "WHERE city IN ('Paris', 'Madrid') OR phone IS NULL;"], 'IN checks a list; NULL needs IS NULL.', ['name | city', 'Ava | Paris', 'Reed | Dublin', 'Kaden | Madrid', 'Megan | Barcelona']],
    ]),
    toggleRun('Aggregates, groups and joins', [
      ['Aggregates', ['SELECT COUNT(*) AS trains, MIN(fare) AS cheapest, SUM(seats) AS seats', 'FROM trains;'], 'COUNT, MIN, MAX, SUM, AVG work on a column.', ['trains | cheapest | seats', '6 | 850 | 139']],
      ['GROUP BY', ['SELECT from_city, COUNT(*) AS n', 'FROM trains', 'GROUP BY from_city', 'ORDER BY n DESC, from_city;'], 'One row per group.', ['from_city | n', 'Dublin | 2', 'Madrid | 2', 'Barcelona | 1', 'Kyoto | 1']],
      ['Equi-join', ['SELECT b.passenger, t.name', 'FROM bookings b, trains t', 'WHERE b.train_id = t.id AND t.fare > 2000', 'ORDER BY b.id;'], 'Two tables, matched on a common column.', ['passenger | name', 'Ava | Royal', 'Kaden | Royal', 'Megan | Keystone Express']],
    ]),
    reveal('Commands you must know', [
      ['DDL', 'CREATE TABLE, ALTER TABLE, DROP TABLE: the structure.'],
      ['DML', 'INSERT, UPDATE, DELETE, SELECT: the data.'],
      ['Keys', 'Primary key: unique row id. Foreign key: points at another table’s key.'],
      ['Degree / cardinality', 'Columns / rows in a table.'],
    ]),
    tapbug('No rows: phone = NULL never matches', ['SELECT name FROM passengers', 'WHERE phone = NULL;'], [[2, 'phone = NULL', 'phone IS NULL']], 'NULL needs IS NULL.'),
    check('A table has 5 rows and 4 columns. Its degree is…', ['4', '5', '20', '9'], 'Degree = columns; cardinality = rows.', 'Columns or rows?', { mono: true }),
    recap([
      ['🔎', 'WHERE with BETWEEN, LIKE, IN, IS NULL'],
      ['📊', 'COUNT, SUM, MIN, MAX, AVG; GROUP BY, HAVING'],
      ['🔗', 'Equi-join: FROM a, b WHERE a.x = b.y'],
    ]),
  ]),

  sql.challenge('cbse-i-12-ch', 'Module 12 Challenge', { icon: '🔎', name: 'Query Writer' }, ['Filter rows with conditions', 'Group and count', 'Join two tables'], [
    mcq(1, "WHERE name LIKE 'S%' matches names that…", ['Start with S', 'End with S', 'Contain S', 'Are exactly S'], '% after S.', { mono: true }),
    mcq(2, 'Which is a DDL command?', ['ALTER TABLE', 'UPDATE', 'SELECT', 'INSERT'], 'Structure.', { mono: true }),
    mcq(3, 'Cardinality of a table is its number of…', ['Rows', 'Columns', 'Keys', 'Tables'], 'Degree is columns.'),
    mcq(4, 'Which removes rows but keeps the table?', ['DELETE FROM t', 'DROP TABLE t', 'ALTER TABLE t', 'REMOVE t'], 'DML.', { mono: true }),
    mcq(5, 'COUNT(phone) skips…', ['NULL values', 'Duplicates', 'Zero', 'Strings'], 'Only real values count.', { mono: true }),
    swipe([
      ['BETWEEN 1000 AND 2000 includes 2000', true, 'Both ends.'],
      ['ORDER BY sorts ascending by default', true, 'Add DESC to reverse.'],
      ['A primary key can be NULL', false, 'Unique and not NULL.'],
      ['HAVING filters groups', true, 'After GROUP BY.'],
    ]),
    pairs([['DISTINCT', 'No repeats'], ['LIKE', 'Pattern'], ['IN', 'In a list'], ['GROUP BY', 'Groups']], 'SQL keywords.'),
    pickCode('Which shows trains from Madrid, cheapest first?', ["SELECT name FROM trains WHERE from_city = 'Madrid' ORDER BY fare;", "SELECT name FROM trains ORDER BY fare WHERE from_city = 'Madrid';", "SELECT name WHERE from_city = 'Madrid' FROM trains;", "SELECT name FROM trains WHERE from_city == Madrid;"], 'WHERE before ORDER BY.'),
    bugTask(['SELECT city, COUNT(*)', 'FROM passengers', 'WHERE COUNT(*) > 1', 'GROUP BY city;'], [[3, 'WHERE COUNT(*) > 1', 'HAVING COUNT(*) > 1']], 'Conditions on groups use HAVING (after GROUP BY).'),
    predictTask(['import sqlite3', 'db = sqlite3.connect(":memory:")', 'db.execute("CREATE TABLE s (name TEXT, marks INTEGER)")', 'db.executemany("INSERT INTO s VALUES (?, ?)", [("Ava", 82), ("Reed", 91), ("Zoey", 77)])', 'print(db.execute("SELECT COUNT(*) FROM s WHERE marks BETWEEN 77 AND 82").fetchone()[0])'], 'What does it print?', ['2', '1', '3', '0'], 'Both ends included.'),
    task(OLD, 'cbse-sql', BOARD),
  ]),
];
