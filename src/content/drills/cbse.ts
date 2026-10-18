// Extra practice for each CBSE CS module: board-style find-the-output questions, all run in tests.
import { bug, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · CBSE CS';
const out = (title: string, lines: string[], answer: string, explain: string) => predict({ kicker: K, title, lang: 'python', lines, answer, explain });

export const CBSE_DRILLS: Record<string, Step[]> = {
  'cbse-types': [
    out('Find the output', ['print(2 ** 2 ** 3, 15 // 4 * 2, 15 % 4 ** 2)'], '256 6 15', '2 ** 8 = 256; 15 // 4 = 3, × 2 = 6; 4 ** 2 = 16 first, and 15 % 16 = 15.'),
    out('Find the output', ['a, b = 5, 2', 'a, b = b, a + b', 'print(a, b)'], '2 7', 'The right side is worked out first: (2, 7).'),
    quiz({ prompt: 'Which is an invalid variable name?', options: ['2marks', 'marks2', '_marks', 'Marks'], right: 'Right. Names can’t start with a digit.', wrong: 'Names may contain digits but can’t start with one.', mono: true }),
    out('Find the output', ['print(10 > 5 and not 3 == 3 or 4 < 2)'], 'False', 'not 3 == 3 is False, so the and is False; 4 < 2 is False too.'),
  ],
  'cbse-flow': [
    out('Find the output', ['for i in range(5, 0, -2):', '    print(i * "*")'], '*****\n***\n*', 'i is 5, 3, 1.'),
    out('Find the output', ['n, s = 5, 0', 'while n:', '    s += n', '    n -= 2', '    if n < 0:', '        break', 'print(s)'], '9', 's adds 5, 3, 1; then n becomes −1 and the loop breaks.'),
    out('Find the output', ['for x in range(3):', '    pass', 'else:', '    print("done", x)'], 'done 2', 'The loop finished without break, so else runs; x is left at 2.'),
    bug({ kicker: K, title: 'Find the error', instructions: 'This should print the 5 times table. Tap the faulty line.', lang: 'python', lines: ['for i in range(1, 11)', '    print(5, "x", i, "=", 5 * i)'], bug: 0, fix: 'for i in range(1, 11):', explain: 'A for line must end with a colon.' }),
  ],
  'cbse-strings': [
    out('Find the output', ['s = "Board@2026"', 'print(s.isalnum(), s[:5].isalpha(), s[-4:].isdigit())'], 'False True True', '@ isn’t a letter or digit; "Board" is all letters; "2026" is all digits.'),
    out('Find the output', ['s = "computer"', 'print(s[1:6:2], s.upper()[::-2])'], 'opt RTPO', 'Indexes 1, 3 and 5 are o, p, t. Reversed, "COMPUTER" is "RETUPMOC", and every second letter gives R, T, P, O.'),
    out('Find the output', ['print("a-b-c".split("-"), "-".join("xyz"))'], "['a', 'b', 'c'] x-y-z", 'split breaks at each -, and join puts - between the characters.'),
    quiz({ prompt: 'What does "hello".replace("l", "L", 1) return?', options: ['"heLlo"', '"heLLo"', '"hello"', 'An error'], right: 'Right. The third argument limits how many are replaced.', wrong: 'Only the first l is replaced because of the count 1.', mono: true }),
  ],
  'cbse-lists': [
    out('Find the output', ['L = [10, 20, 30, 40, 50]', 'L[1:3] = [5]', 'print(L, len(L))'], '[10, 5, 40, 50] 4', 'The slice of two items is replaced by one item.'),
    out('Find the output', ['L = [3, 6, 9]', 'M = L', 'M[0] = 100', 'print(L[0], L is M)'], '100 True', 'M is another name for the same list.'),
    out('Find the output', ['L = [1, 2, 3, 2, 1]', 'L.remove(2)', 'print(L, L.index(1, 1))'], '[1, 3, 2, 1] 3', 'remove deletes the first 2; index(1, 1) searches from index 1.'),
    quiz({ prompt: 'Which removes and returns the last item of L?', options: ['L.pop()', 'L.remove()', 'del L', 'L.clear()'], right: 'Right.', wrong: 'pop() with no index removes and returns the last item.', mono: true }),
  ],
  'cbse-dict': [
    out('Find the output', ['d = {"a": 1, "b": 2}', 'd.update({"b": 20, "c": 3})', 'print(d)'], "{'a': 1, 'b': 20, 'c': 3}", 'update changes b and adds c.'),
    out('Find the output', ['t = (10, 20, 30, 40)', 'print(t[1:3], t[::-1][0], 20 in t)'], '(20, 30) 40 True', 'Slicing a tuple gives a tuple.'),
    out('Find the output', ['d = {}', 'for ch in "abca":', '    d[ch] = d.get(ch, 0) + 1', 'print(d)'], "{'a': 2, 'b': 1, 'c': 1}", 'Each character is counted; a appears twice.'),
    quiz({ prompt: 'Which can be a dictionary key?', options: ['A tuple like (1, 2)', 'A list like [1, 2]', 'A dictionary', 'A set'], right: 'Right. Keys must be immutable.', wrong: 'Keys must be immutable: numbers, strings or tuples.', mono: true }),
  ],
  'cbse-functions': [
    out('Find the output', ['def f(x):', '    x.append(4)', '    x = [0]', '    return x', 'L = [1]', 'print(f(L), L)'], '[0] [1, 4]', 'append changes the caller’s list; then x is rebound to a new list.'),
    out('Find the output', ['def show(a, *b):', '    print(a, b)', 'show(1, 2, 3)'], '1 (2, 3)', '*b collects the extra arguments into a tuple.'),
    out('Find the output', ['x = 1', 'def g():', '    global x', '    x = x * 5', 'g(); g()', 'print(x)'], '25', 'global lets g change x: 1 → 5 → 25.'),
    bug({ kicker: K, title: 'Find the error', instructions: 'This raises a SyntaxError. Tap the faulty line.', lang: 'python', lines: ['def interest(p, r=5, t):', '    return p * r * t / 100'], bug: 0, fix: 'def interest(p, t, r=5):', explain: 'Parameters with defaults must come after those without.' }),
  ],
  'cbse-modules': [
    out('Find the output', ['import math', 'print(math.fabs(-4), math.sqrt(64), math.pow(3, 2))'], '4.0 8.0 9.0', 'fabs, sqrt and pow all return floats.'),
    quiz({ prompt: 'Which can random.randrange(10, 50, 10) return?', options: ['10, 20, 30 or 40', '10 to 50', '20, 30, 40 or 50', 'Only 10'], right: 'Right. It steps by 10 and stops before 50.', wrong: 'randrange excludes its stop value: 10, 20, 30, 40.', mono: true }),
    out('Find the output', ['import statistics as s', 'print(s.median([7, 1, 5, 3]), s.mode("banana"))'], '4.0 a', 'Sorted: 1, 3, 5, 7, so the median is (3 + 5) / 2; a is the most common letter.'),
    quiz({ prompt: 'After from math import sqrt, how do you call it?', options: ['sqrt(25)', 'math.sqrt(25)', 'math(sqrt(25))', 'import sqrt(25)'], right: 'Right.', wrong: 'from … import brings the name in directly.', mono: true }),
  ],
  'cbse-exceptions': [
    out('Find the output', ['try:', '    L = [1, 2]', '    print(L[5])', 'except IndexError:', '    print("index")', 'except Exception:', '    print("other")'], 'index', 'The first matching except block runs.'),
    out('Find the output', ['def f():', '    try:', '        return "try"', '    finally:', '        print("finally")', 'print(f())'], 'finally\ntry', 'finally runs before the function actually returns.'),
    quiz({ prompt: 'Which error does d["x"] raise if d has no key "x"?', options: ['KeyError', 'IndexError', 'ValueError', 'NameError'], right: 'Right.', wrong: 'A missing dictionary key raises KeyError.', mono: true }),
    out('Find the output', ['try:', '    n = int("7")', 'except ValueError:', '    print("bad")', 'else:', '    print(n * 2)'], '14', 'No error, so else runs.'),
  ],
  'cbse-files': [
    quiz({ prompt: 'Which reads all lines of a file into a list?', options: ['f.readlines()', 'f.read()', 'f.readline()', 'f.lines()'], right: 'Right.', wrong: 'readlines() returns a list of lines; read() one string; readline() one line.', mono: true }),
    out('Find the output', ['with open("a.txt", "w") as f:', '    n = f.write("Hello\\n")', 'print(n)'], '6', 'write returns how many characters it wrote: 5 letters plus the newline.'),
    quiz({ prompt: 'What does f.seek(0) do?', options: ['Moves back to the start of the file', 'Deletes the file', 'Reads one character', 'Closes the file'], right: 'Right. tell() reports the current position.', wrong: 'seek moves the file position; seek(0) goes back to the start.' }),
    out('Find the output', ['with open("b.txt", "w") as f:', '    f.write("one two\\nthree\\n")', 'with open("b.txt") as f:', '    print(len(f.read().split()))'], '3', 'split() on the whole text gives one, two, three.'),
  ],
  'cbse-binary': [
    quiz({ prompt: 'Which statement saves an object to a binary file f?', options: ['pickle.dump(obj, f)', 'pickle.load(obj, f)', 'f.write(obj)', 'pickle.save(f, obj)'], right: 'Right. load(f) reads it back.', wrong: 'pickle.dump(obj, f) writes; pickle.load(f) reads.', mono: true }),
    out('Find the output', ['import pickle', 'with open("r.dat", "wb") as f:', '    pickle.dump(1, f)', '    pickle.dump(2, f)', 'total = 0', 'with open("r.dat", "rb") as f:', '    try:', '        while True:', '            total += pickle.load(f)', '    except EOFError:', '        pass', 'print(total)'], '3', 'Two objects were dumped; loading stops with EOFError after both.'),
    quiz({ prompt: 'Why use newline="" when opening a CSV file?', options: ['So the csv module controls line endings and no blank rows appear', 'It is required for reading only', 'It removes commas', 'It makes the file binary'], right: 'Right.', wrong: 'Without it, Windows can add an extra blank line after each row.' }),
    out('Find the output', ['import csv', 'with open("x.csv", "w", newline="") as f:', '    csv.writer(f).writerows([["a", 1], ["b", 2]])', 'with open("x.csv", newline="") as f:', '    print(sum(int(r[1]) for r in csv.reader(f)))'], '3', 'The numbers come back as strings, so int() converts them.'),
  ],
  'cbse-stack': [
    out('Find the output', ['s = [1, 2, 3]', 's.append(s.pop() * 10)', 'print(s)'], '[1, 2, 30]', '3 is popped, multiplied by 10 and pushed back.'),
    quiz({ prompt: 'A stack holds 4, 7, 9 (9 on top). After pop(), push(5), pop(), what is on top?', options: ['7', '5', '9', '4'], right: 'Right.', wrong: '9 goes, 5 comes and goes, leaving 7 on top.', mono: true }),
    quiz({ prompt: 'What is underflow?', options: ['Trying to pop or peek an empty stack', 'Pushing onto a full stack', 'A stack with one item', 'Sorting a stack'], right: 'Right. Overflow is pushing onto a full fixed-size stack.', wrong: 'Underflow means removing from an empty stack.' }),
    out('Find the output', ['words = ["sun", "planet", "moon", "galaxy"]', 'st = [w for w in words if len(w) > 4]', 'while st:', '    print(st.pop(), end=" ")'], 'galaxy planet', 'The long words are pushed in order and popped in reverse.'),
  ],
  'cbse-sql': [
    quiz({ prompt: 'Which query lists distinct starting cities?', options: ['SELECT DISTINCT from_city FROM trains;', 'SELECT UNIQUE from_city FROM trains;', 'SELECT from_city FROM trains GROUP;', 'SELECT ALL from_city FROM trains;'], right: 'Right.', wrong: 'DISTINCT removes repeated values.', mono: true }),
    quiz({ prompt: "What does LIKE '_a%' match?", options: ['Text whose second letter is a', 'Text starting with a', 'Text ending in a', 'Exactly two letters'], right: 'Right. _ is one character, % any number.', wrong: '_ stands for one character and % for any run of characters.', mono: true }),
    quiz({ prompt: 'Which removes the table itself, structure and all?', options: ['DROP TABLE', 'DELETE FROM', 'ALTER TABLE', 'UPDATE'], right: 'Right. DELETE only removes rows.', wrong: 'DELETE removes rows; DROP removes the table.', mono: true }),
    bug({ kicker: K, title: 'Find the error', instructions: 'This should list passengers with no phone number. Tap the faulty line.', lang: 'sql', lines: ['SELECT name FROM passengers', 'WHERE phone = NULL;'], bug: 1, fix: 'WHERE phone IS NULL;', explain: 'Nothing is equal to NULL. Test with IS NULL.' }),
  ],
};
