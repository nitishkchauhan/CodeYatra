// CBSE Computer Science (083) · Modules 1–6 (Basic): data types and operators, flow of control, strings, lists,
// tuples and dictionaries, and functions. Each module’s lesson keeps its old id; its Challenge ends with the old
// tested board-style program. Every program runs with real Python in tests.
import type { Lesson } from '../../types';
import { CBSE_LESSONS as OLD } from '../cbse';
import { bugTask, chat, check, kit, mcq, pairs, pickCode, predict, predictTask, recap, run, swipe, tapbug, task, toggleRun } from '../placementV5/kit';

const { lesson, challenge } = kit('python');
const BOARD = 'TASK 6 OF 6 · BOARD PROGRAM';

export const CBSE_M1: Lesson[] = [
  lesson('cbse-types', 'Data types and operators', 7, [
    chat(['Board papers open with data types and operators: “find the output” questions where one rule decides the answer.', 'Python’s main types: int, float, complex, bool, str, list, tuple and dict. Some can change (mutable), some can’t (immutable).']),
    toggleRun('Types and operators', [
      ['type()', ['print(type(7).__name__, type(7.0).__name__, type("7").__name__, type(True).__name__, type(2 + 3j).__name__)'], 'type() tells you what something is.', ['int float str bool complex']],
      ['Division', ['print(17 / 5, 17 // 5, 17 % 5, 2 ** 5)'], '/ always gives a float; // floor division; % remainder; ** power.', ['3.4 3 2 32']],
      ['Precedence', ['print(2 + 3 * 4 ** 2, (2 + 3) * 4, not 3 > 2 and 4 > 1)'], '** before * before +; not before and before or.', ['50 20 False']],
    ]),
    toggleRun('Mutable or immutable?', [
      ['List: mutable', ['marks = [70, 85]', 'marks[0] = 75', 'print(marks)'], 'A list can be changed in place.', ['[75, 85]']],
      ['String: immutable', ['name = "sutton"', 'name = name.capitalize()', 'print(name)'], 'Strings can’t change; methods give new ones.', ['Sutton']],
      ['id() shows it', ['a = 5', 'b = a', 'print(a is b, id(a) == id(b))'], 'Both names point at the same object.', ['True True']],
    ]),
    predict('Find the output', ['x = 10', 'x += 5', 'x //= 4', 'x **= 2', 'print(x)'], [
      [3, 'What is x after x //= 4?', ['3', '3.75', '4'], '15 // 4 is 3.', { var: 'x' }],
      [5, 'What is printed?', ['9', '6', '16'], '3 ** 2.', { out: true }],
    ]),
    tapbug('TypeError: can only concatenate str (not "int") to str', ['marks = 82', 'print("Marks: " + marks)'], [[2, '+ marks', '+ str(marks)']], 'Convert the number to text before joining.'),
    check('What is 7 // 2 * 2 + 7 % 2?', ['7', '8', '6', '3.5'], '3 * 2 + 1.', 'Left to right for * and //.', { mono: true }),
    recap([
      ['🏷', 'int, float, complex, bool, str, list, tuple, dict'],
      ['➗', '/ float, // floor, % remainder, ** power'],
      ['🔒', 'Mutable: list, dict. Immutable: int, str, tuple'],
    ]),
  ]),

  challenge('cbse-b-1-ch', 'Module 1 Challenge', { icon: '🏷', name: 'Type Spotter' }, ['Name Python’s data types', 'Use every arithmetic operator', 'Tell mutable from immutable'], [
    mcq(1, 'type(3.0) is…', ['float', 'int', 'str', 'complex'], 'A decimal point.', { mono: true }),
    mcq(2, '2 ** 3 ** 2 is…', ['512', '64', '36', '12'], '** works right to left: 2 ** 9.', { mono: true }),
    mcq(3, 'Which type is immutable?', ['tuple', 'list', 'dict', 'set'], 'Can’t be changed.', { mono: true }),
    mcq(4, '17 % 5 is…', ['2', '3', '3.4', '12'], 'The remainder.', { mono: true }),
    mcq(5, 'bool(0) is…', ['False', 'True', '0', 'None'], 'Zero is false.', { mono: true }),
    swipe([
      ['/ always gives a float', true, '4 / 2 is 2.0.'],
      ['Strings are mutable', false, 'Immutable.'],
      ['and is checked before or', true, 'Precedence.'],
      ['A variable’s type is fixed forever in Python', false, 'Python is dynamically typed.'],
    ]),
    pairs([['//', 'Floor division'], ['%', 'Remainder'], ['**', 'Power'], ['/', 'True division']], 'Operators.'),
    pickCode('Which prints the type of x by name?', ['print(type(x).__name__)', 'print(typeof(x))', 'print(x.type)', 'print(type x)'], 'type() then its name.'),
    bugTask(['age = input("Age: ")', 'print(age + 1)'], [[1, 'input("Age: ")', 'int(input("Age: "))']], 'input() gives a string; convert it.'),
    predictTask(['a, b = 15, 4', 'print(a // b + a % b * 2)'], 'What does it print?', ['9', '7', '11', '5.75'], '3 + 3 * 2.'),
    task(OLD, 'cbse-types', BOARD),
  ]),

  lesson('cbse-flow', 'Flow of control', 8, [
    toggleRun('Decisions', [
      ['if-elif-else', ['marks = 72', 'if marks >= 90:', '    print("A1")', 'elif marks >= 75:', '    print("A2")', 'elif marks >= 60:', '    print("B1")', 'else:', '    print("C")'], 'The first true branch runs.', ['B1']],
      ['Nested if', ['age, has_id = 19, False', 'if age >= 18:', '    if has_id:', '        print("Vote")', '    else:', '        print("Bring ID")'], 'An if inside an if.', ['Bring ID']],
    ]),
    toggleRun('Loops', [
      ['for and range', ['for i in range(2, 11, 3):', '    print(i)'], 'range(start, stop, step): stop is left out.', ['2', '5', '8']],
      ['while', ['n, digits = 4096, 0', 'while n > 0:', '    n //= 10', '    digits += 1', 'print(digits)'], 'Repeat while the condition holds.', ['4']],
      ['break, continue, else', ['for n in range(2, 10):', '    if n % 2 == 0:', '        continue', '    if n > 6:', '        break', '    print(n)', 'else:', '    print("no break")'], 'A loop’s else runs only if it didn’t break.', ['3', '5']],
    ]),
    run('Change the range', 'Change the step and see which numbers appear.', ['print(list(range(0, 13, {{v}})))'], ['3', '4', '6'], { goal: '[0, 6, 12]' }),
    predict('Find the output', ['total = 0', 'for i in range(1, 6):', '    if i == 4:', '        break', '    total += i', 'print(total)'], [
      [6, 'What is printed?', ['6', '10', '15'], '1 + 2 + 3, then break at 4.', { out: true }],
    ]),
    tapbug('The loop prints 1 to 4, not 1 to 5', ['for i in range(1, 5):', '    print(i)'], [[1, 'range(1, 5)', 'range(1, 6)']], 'range stops before its end value.'),
    check('How many times does for i in range(10, 0, -2) run?', ['5', '10', '4', '6'], '10, 8, 6, 4, 2.', 'Count down by 2.', { mono: true }),
    recap([
      ['🔀', 'if / elif / else, nested if'],
      ['🔁', 'for with range(start, stop, step); while'],
      ['⏭', 'break, continue; loop else runs if no break'],
    ]),
  ]),

  challenge('cbse-b-2-ch', 'Module 2 Challenge', { icon: '🔁', name: 'Flow Master' }, ['Write if-elif-else ladders', 'Use for, while and range', 'Predict break, continue and loop else'], [
    mcq(1, 'list(range(1, 10, 4)) is…', ['[1, 5, 9]', '[1, 4, 8]', '[1, 5]', '[4, 8]'], 'Step 4.', { mono: true }),
    mcq(2, 'When does a for loop’s else run?', ['When the loop ends without break', 'Always', 'After break', 'Never'], 'No break.'),
    mcq(3, 'What does continue do?', ['Skips to the next round', 'Leaves the loop', 'Restarts the loop', 'Ends the program'], 'break leaves.', { mono: true }),
    mcq(4, 'range(5) gives…', ['0, 1, 2, 3, 4', '1 to 5', '0 to 5', '5 numbers from 1'], 'Starts at 0.', { mono: true }),
    mcq(5, 'Which is an entry-controlled loop?', ['while', 'do-while', 'Neither', 'Both'], 'Python has no do-while.', { mono: true }),
    swipe([
      ['elif is short for else if', true, 'Python’s keyword.'],
      ['range(1, 5) includes 5', false, 'Stop is left out.'],
      ['A while loop can run zero times', true, 'If the test is false at once.'],
      ['Indentation marks the loop body', true, 'Four spaces.'],
    ]),
    pairs([['range(n)', '0 to n−1'], ['break', 'Leave'], ['continue', 'Skip'], ['elif', 'Next test']], 'Flow words.'),
    pickCode('Which prints even numbers from 2 to 10?', ['for i in range(2, 11, 2): print(i)', 'for i in range(2, 10, 2): print(i)', 'for i in range(10): print(i * 2)', 'while i < 10: print(i)'], 'Stop at 11.'),
    bugTask(['n = 5', 'while n > 0:', '    print(n)'], [[3, '    print(n)', '    print(n); n -= 1']], 'Change n, or the loop never ends.'),
    predictTask(['count = 0', 'for i in range(3):', '    for j in range(i, 3):', '        count += 1', 'print(count)'], 'What does it print?', ['6', '9', '3', '5'], '3 + 2 + 1.'),
    task(OLD, 'cbse-flow', BOARD),
  ]),

  lesson('cbse-strings', 'Strings', 8, [
    toggleRun('Slicing and indexing', [
      ['Index', ['s = "COMPUTER"', 'print(s[0], s[-1], s[3])'], 'From 0 at the front, −1 at the back.', ['C R P']],
      ['Slice', ['s = "COMPUTER"', 'print(s[2:5], s[:3], s[5:], s[::2], s[::-1])'], 's[start:stop:step]; stop is left out.', ['MPU COM TER CMUE RETUPMOC']],
      ['Operators', ['print("ab" * 3, "put" in "COMPUTER".lower(), len("Hi there"))'], '* repeats; in checks; len counts.', ['ababab True 8']],
    ]),
    toggleRun('Built-in methods', [
      ['Case', ['s = "board exam 2026"', 'print(s.upper(), "|", s.title(), "|", s.isalpha())'], 'upper, title, and is… checks.', ['BOARD EXAM 2026 | Board Exam 2026 | False']],
      ['Find and count', ['s = "banana bandana"', 'print(s.count("an"), s.find("nd"), s.index("b", 1))'], 'count, find (−1 if absent), index (error if absent).', ['4 9 7']],
      ['Split and join', ['line = "red,green,blue"', 'parts = line.split(",")', 'print(parts, "-".join(parts))'], 'split makes a list; join glues it back.', ["['red', 'green', 'blue'] red-green-blue"]],
    ]),
    predict('Find the output', ['s = "Python"', 'out = ""', 'for ch in s:', '    if ch in "aeiouAEIOU":', '        out += "*"', '    else:', '        out += ch', 'print(out)'], [
      [8, 'What is printed?', ['Pyth*n', 'Python', 'P*th*n'], 'Only o is a vowel.', { out: true }],
    ]),
    tapbug('TypeError: ’str’ object does not support item assignment', ['s = "board"', 's[0] = "B"'], [[2, 's[0] = "B"', 's = "B" + s[1:]']], 'Strings are immutable; make a new one.'),
    check('What is "EXAM"[1:3]?', ['"XA"', '"XAM"', '"EX"', '"EXA"'], 'Index 1 and 2.', 'Stop is left out.', { mono: true }),
    recap([
      ['✂', 's[start:stop:step]; negative indexes from the end'],
      ['🔤', 'upper, lower, title, count, find, split, join'],
      ['🧊', 'Strings are immutable'],
    ]),
  ]),

  challenge('cbse-b-3-ch', 'Module 3 Challenge', { icon: '✂', name: 'String Slicer' }, ['Index and slice strings', 'Use string methods', 'Predict string outputs'], [
    mcq(1, '"PYTHON"[-2] is…', ['"O"', '"N"', '"H"', '"Y"'], 'Second from the end.', { mono: true }),
    mcq(2, '"PYTHON"[1:4] is…', ['"YTH"', '"PYT"', '"YTHO"', '"THO"'], 'Index 1 to 3.', { mono: true }),
    mcq(3, '"hello".find("z") is…', ['-1', '0', 'An error', 'None'], 'Not found.', { mono: true }),
    mcq(4, '"a-b-c".split("-") is…', ["['a', 'b', 'c']", "'abc'", "['a-b-c']", "('a', 'b', 'c')"], 'A list.', { mono: true }),
    mcq(5, '"hi" * 3 is…', ['"hihihi"', '"hi3"', 'An error', '"hi hi hi"'], 'Repeats.', { mono: true }),
    swipe([
      ['s.upper() changes s', false, 'It returns a new string.'],
      ['"py" in "python" is True', true, 'Membership.'],
      ['index() raises an error if not found', true, 'find() gives −1.'],
      ['s[::-1] reverses s', true, 'Step −1.'],
    ]),
    pairs([['len(s)', 'Length'], ['s.title()', 'Each Word Capital'], ['s.isdigit()', 'Only digits?'], ['s.strip()', 'Trim spaces']], 'String methods.'),
    pickCode('Which counts the words in a sentence s?', ['len(s.split())', 's.count(" ")', 'len(s)', 's.words()'], 'Split, then count.'),
    bugTask(['s = "exam"', 'print(s.Upper())', 'print(s[4])'], [[2, 'Upper', 'upper'], [3, 's[4]', 's[3]']], 'Methods are lowercase, and the last index is len − 1.'),
    predictTask(['s = "CBSE2026"', 'd = sum(1 for c in s if c.isdigit())', 'print(d, s[:4].lower())'], 'What does it print?', ['4 cbse', '4 CBSE', '8 cbse', '2026 cbse'], 'Four digits; the first four letters, lowered.'),
    task(OLD, 'cbse-strings', BOARD),
  ]),

  lesson('cbse-lists', 'Lists', 8, [
    toggleRun('List operations', [
      ['Change', ['marks = [72, 85, 64]', 'marks.append(90)', 'marks.insert(1, 58)', 'marks.remove(64)', 'print(marks)'], 'append, insert at a place, remove a value.', ['[72, 58, 85, 90]']],
      ['pop and del', ['marks = [72, 85, 64, 90]', 'last = marks.pop()', 'del marks[0]', 'print(last, marks)'], 'pop removes and returns; del deletes by index.', ['90 [85, 64]']],
      ['Sorting', ['marks = [72, 85, 64]', 'print(sorted(marks), marks)', 'marks.sort(reverse=True)', 'print(marks)'], 'sorted makes a new list; sort changes this one.', ['[64, 72, 85] [72, 85, 64]', '[85, 72, 64]']],
    ]),
    toggleRun('Traps and tricks', [
      ['extend vs append', ['a = [1, 2]', 'b = [1, 2]', 'a.append([3, 4])', 'b.extend([3, 4])', 'print(a, b)'], 'append adds one item; extend adds each item.', ['[1, 2, [3, 4]] [1, 2, 3, 4]']],
      ['Aliasing', ['a = [1, 2, 3]', 'b = a', 'c = a.copy()', 'a[0] = 9', 'print(b, c)'], 'b is the same list; c is a copy.', ['[9, 2, 3] [1, 2, 3]']],
      ['min, max, sum', ['marks = [72, 85, 64]', 'print(min(marks), max(marks), sum(marks) / len(marks))'], 'Built-ins for lists of numbers.', ['64 85 73.66666666666667']],
    ]),
    predict('Find the output', ['L = [10, 20, 30, 40]', 'L[1:3] = [5]', 'print(L, len(L))'], [
      [3, 'What is printed?', ['[10, 5, 40] 3', '[10, 5, 30, 40] 4', '[5, 20, 30, 40] 4'], 'A slice can be replaced by a shorter list.', { out: true }],
    ]),
    tapbug('It prints None', ['marks = [72, 85, 64]', 'marks = marks.sort()', 'print(marks)'], [[2, 'marks = marks.sort()', 'marks.sort()']], 'sort() changes the list and returns None.'),
    check('Which adds every item of [3, 4] to L?', ['L.extend([3, 4])', 'L.append([3, 4])', 'L.insert([3, 4])', 'L.add([3, 4])'], 'One by one.', 'append adds one item.', { mono: true }),
    recap([
      ['📋', 'append, insert, extend, remove, pop, del'],
      ['🔢', 'sort() in place; sorted() new'],
      ['🔗', 'b = a shares; a.copy() copies'],
    ]),
  ]),

  challenge('cbse-b-4-ch', 'Module 4 Challenge', { icon: '📋', name: 'List Keeper' }, ['Change lists with methods', 'Sort and search lists', 'Avoid aliasing traps'], [
    mcq(1, 'L = [1, 2, 3]; L.pop(0) returns…', ['1', '3', '[2, 3]', 'None'], 'Index 0.', { mono: true }),
    mcq(2, 'Which returns None?', ['L.sort()', 'sorted(L)', 'L.pop()', 'len(L)'], 'It sorts in place.', { mono: true }),
    mcq(3, '[1, 2] + [3] is…', ['[1, 2, 3]', '[1, 2, [3]]', '[4, 2]', 'An error'], 'Joins lists.', { mono: true }),
    mcq(4, 'L.remove(5) removes…', ['The first 5 in L', 'Index 5', 'Every 5', 'The last item'], 'By value.', { mono: true }),
    mcq(5, 'L.index(20) for L = [10, 20, 30] is…', ['1', '2', '20', '0'], 'Its position.', { mono: true }),
    swipe([
      ['Lists can hold different types', true, '[1, "a", 2.5].'],
      ['b = a copies the list', false, 'It shares it.'],
      ['L[-1] is the last item', true, 'Negative index.'],
      ['del L[0] returns the item', false, 'pop does.'],
    ]),
    pairs([['append', 'Add one'], ['extend', 'Add many'], ['pop', 'Remove and return'], ['insert', 'Add at a place']], 'List methods.'),
    pickCode('Which prints the list in descending order without changing it?', ['print(sorted(L, reverse=True))', 'print(L.sort(reverse=True))', 'print(L.reverse())', 'print(L[::-1].sort())'], 'sorted makes a new list.'),
    bugTask(['L = [4, 7, 1]', 'L.add(9)', 'print(L.length)'], [[2, 'L.add(9)', 'L.append(9)'], [3, 'L.length', 'len(L)']], 'Lists use append, and len() for the size.'),
    predictTask(['L = [1, 2, 3]', 'M = L * 2', 'M[0] = 100', 'print(L[0], M.count(1), len(M))'], 'What does it print?', ['1 1 6', '100 1 6', '1 0 6', '1 2 6'], 'L * 2 is a new list; one 1 is left in M after M[0] changes.'),
    task(OLD, 'cbse-lists', BOARD),
  ]),

  lesson('cbse-dict', 'Tuples and dictionaries', 8, [
    toggleRun('Tuples', [
      ['Make and unpack', ['t = (10, 20, 30)', 'a, b, c = t', 'print(t[1], a + c, len(t))'], 'Like a list, but can’t be changed. Unpack into names.', ['20 40 3']],
      ['One item', ['x = (5)', 'y = (5,)', 'print(type(x).__name__, type(y).__name__)'], 'A one-item tuple needs a comma.', ['int tuple']],
      ['Methods', ['t = (2, 5, 2, 8, 2)', 'print(t.count(2), t.index(8), max(t))'], 'Only count and index (it can’t change).', ['3 3 8']],
    ]),
    toggleRun('Dictionaries', [
      ['Read and change', ['marks = {"Ava": 82, "Reed": 91}', 'marks["Zoey"] = 77', 'marks["Ava"] = 85', 'print(marks)'], 'Keys are unique: assigning again replaces.', ["{'Ava': 85, 'Reed': 91, 'Zoey': 77}"]],
      ['Methods', ['marks = {"Ava": 82, "Reed": 91}', 'print(list(marks.keys()), list(marks.values()), marks.get("Sam", 0))'], 'keys, values, get with a default.', ["['Ava', 'Reed'] [82, 91] 0"]],
      ['Looping', ['marks = {"Ava": 82, "Reed": 91}', 'for name, m in marks.items():', '    print(name, "pass" if m >= 85 else "try again")'], 'items gives key–value pairs.', ['Ava try again', 'Reed pass']],
    ]),
    predict('Find the output', ['d = {}', 'for ch in "level":', '    d[ch] = d.get(ch, 0) + 1', 'print(d)'], [
      [4, 'What is printed?', ["{'l': 2, 'e': 2, 'v': 1}", "{'l': 1, 'e': 1, 'v': 1}", "{'level': 1}"], 'Count each letter.', { out: true }],
    ]),
    tapbug('TypeError: ’tuple’ object does not support item assignment', ['t = (1, 2, 3)', 't[0] = 9'], [[2, 't[0] = 9', 't = (9,) + t[1:]']], 'Tuples are immutable; build a new one.'),
    check('d = {"a": 1}; d["b"] raises…', ['KeyError', 'IndexError', 'None', '0'], 'Use get() to avoid it.', 'The key is missing.', { mono: true }),
    recap([
      ['📦', 'Tuples: like lists, but immutable'],
      ['🗝', 'Dicts: key → value; keys unique'],
      ['🔁', 'keys, values, items, get'],
    ]),
  ]),

  challenge('cbse-b-5-ch', 'Module 5 Challenge', { icon: '🗝', name: 'Key Holder' }, ['Use tuples and unpack them', 'Read and change dictionaries', 'Count with get()'], [
    mcq(1, 'Which makes a one-item tuple?', ['(5,)', '(5)', '[5]', 'tuple 5'], 'The comma.', { mono: true }),
    mcq(2, 'Which loops over keys and values?', ['for k, v in d.items():', 'for k, v in d:', 'for k in d.values():', 'for d in k, v:'], 'items().', { mono: true }),
    mcq(3, 'd.get("x", 0) when "x" is missing gives…', ['0', 'KeyError', 'None', '"x"'], 'The default.', { mono: true }),
    mcq(4, 'Which can’t be a dictionary key?', ['A list', 'A string', 'A tuple', 'A number'], 'Keys must be immutable.', { mono: true }),
    mcq(5, 'len({"a": 1, "b": 2})?', ['2', '4', '1', '3'], 'Number of keys.', { mono: true }),
    swipe([
      ['Tuples are faster and safer for fixed data', true, 'They can’t change.'],
      ['Dict keys can repeat', false, 'Unique.'],
      ['del d["a"] removes that key', true, 'And its value.'],
      ['d.keys() gives the values', false, 'The keys.'],
    ]),
    pairs([['()', 'Tuple'], ['{}', 'Dictionary'], ['d.items()', 'Pairs'], ['d.get()', 'Safe read']], 'Collections.'),
    pickCode('Which adds Sam with 70 marks to d?', ['d["Sam"] = 70', 'd.add("Sam", 70)', 'd.append(("Sam", 70))', 'd + {"Sam": 70}'], 'Assign to a key.'),
    bugTask(['d = {"Ava": 82}', 'print(d["Reed"])', 'd.append("Reed", 91)'], [[2, 'd["Reed"]', 'd.get("Reed", 0)'], [3, 'd.append("Reed", 91)', 'd["Reed"] = 91']], 'Use get for missing keys, and assign to add.'),
    predictTask(['t = (1, [2, 3])', 't[1].append(4)', 'print(t)'], 'What does it print?', ['(1, [2, 3, 4])', 'An error', '(1, [2, 3])', '(1, 2, 3, 4)'], 'The tuple can’t change, but the list inside it can.'),
    task(OLD, 'cbse-dict', BOARD),
  ]),

  lesson('cbse-functions', 'Functions and scope', 8, [
    toggleRun('Parameters', [
      ['Default and keyword', ['def fee(amount, discount=10):', '    return amount - amount * discount // 100', 'print(fee(500), fee(500, 20), fee(discount=50, amount=200))'], 'Defaults fill in; keywords can come in any order.', ['450 400 100']],
      ['Return many', ['def stats(marks):', '    return min(marks), max(marks)', 'lo, hi = stats([72, 85, 64])', 'print(lo, hi)'], 'Return a tuple, unpack it.', ['64 85']],
      ['No return', ['def greet(name):', '    print("Hi", name)', 'r = greet("Mia")', 'print(r)'], 'A function without return gives None.', ['Hi Mia', 'None']],
    ]),
    toggleRun('Scope', [
      ['Local', ['x = 5', 'def f():', '    x = 10', '    print("inside", x)', 'f()', 'print("outside", x)'], 'x inside is a new local name.', ['inside 10', 'outside 5']],
      ['global', ['count = 0', 'def tap():', '    global count', '    count += 1', 'tap(); tap()', 'print(count)'], 'global lets a function change the outer name.', ['2']],
      ['Mutable argument', ['def add_mark(L):', '    L.append(99)', 'marks = [70]', 'add_mark(marks)', 'print(marks)'], 'A list passed in can be changed inside.', ['[70, 99]']],
    ]),
    predict('Find the output', ['def change(a, b=2):', '    a = a * b', '    return a', 'x = 3', 'y = change(x)', 'print(x, y)'], [
      [6, 'What is printed?', ['3 6', '6 6', '3 3'], 'x itself isn’t changed.', { out: true }],
    ]),
    tapbug('UnboundLocalError: cannot access local variable ’count’', ['count = 0', 'def tap():', '    count += 1'], [[3, '    count += 1', '    global count; count += 1']], 'Changing an outer name needs global.'),
    check('def f(a, b=5, c): is…', ['A SyntaxError: defaults must come last', 'Fine', 'Fine if c has a value', 'A runtime error'], 'Non-default after default isn’t allowed.', 'Order of parameters.'),
    recap([
      ['🧩', 'Positional, default and keyword arguments'],
      ['↩', 'return values (or None); return a tuple for many'],
      ['🌐', 'Local vs global; global to change an outer name'],
    ]),
  ]),

  challenge('cbse-b-6-ch', 'Module 6 Challenge', { icon: '🧩', name: 'Function Writer' }, ['Write functions with defaults', 'Return several values', 'Understand local and global scope'], [
    mcq(1, 'What does a function return without a return statement?', ['None', '0', 'An error', 'The last value'], 'Nothing.', { mono: true }),
    mcq(2, 'Which header is valid?', ['def f(a, b=2):', 'def f(a=1, b):', 'def f(a b):', 'function f(a):'], 'Defaults last.', { mono: true }),
    mcq(3, 'What does global x do inside a function?', ['Uses the outer x', 'Makes x constant', 'Deletes x', 'Copies x'], 'Outer name.', { mono: true }),
    mcq(4, 'f(b=1, a=2) uses…', ['Keyword arguments', 'Default arguments', 'Positional arguments', 'Global names'], 'Named.'),
    mcq(5, 'A variable made inside a function is…', ['Local to it', 'Global', 'Shared by all functions', 'Constant'], 'Scope.'),
    swipe([
      ['A function can return a tuple of values', true, 'return a, b.'],
      ['A list passed in can be changed inside', true, 'Mutable.'],
      ['Local names are visible outside the function', false, 'Only inside.'],
      ['Default values are optional to pass', true, 'They fill in.'],
    ]),
    pairs([['def', 'Define'], ['return', 'Give back'], ['global', 'Outer name'], ['None', 'No return']], 'Function words.'),
    pickCode('Which returns the area and perimeter of a rectangle?', ['def rect(l, w): return l * w, 2 * (l + w)', 'def rect(l, w): print(l * w)', 'def rect(l, w): return l * w; 2 * (l + w)', 'rect = l * w'], 'Return both.'),
    bugTask(['def square(n)', '    n * n'], [[1, 'square(n)', 'square(n):'], [2, '    n * n', '    return n * n']], 'A colon after the header, and return the value.'),
    predictTask(['def f(L=[]):', '    L.append(1)', '    return len(L)', 'f()', 'print(f())'], 'What does it print?', ['2', '1', '0', 'An error'], 'The default list is shared between calls.'),
    task(OLD, 'cbse-functions', BOARD),
  ]),
];
