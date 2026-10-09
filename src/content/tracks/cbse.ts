// CBSE Computer Science (Python): the topics of the Class 11–12 syllabus, with
// board-style "find the output" questions and coding practice checked by tests.
import { bug, lesson, predict, quiz, read, tap } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'CBSE CS';

const code = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: `PRACTICE · ${K}`, lang: 'python', ...o });
const sqlQuery = (o: { title: string; instructions: string; starter: string; expected: string[]; hint: string; solution: string }): EditorStep => ({
  type: 'editor',
  kicker: `PRACTICE · ${K}`,
  lang: 'sql',
  file: 'query.sql',
  title: o.title,
  instructions: o.instructions,
  starter: o.starter,
  tests: [{ stdout: o.expected.join('\n') }],
  hint: o.hint,
  solution: o.solution,
});

export const CBSE_LESSONS: Lesson[] = [
  lesson('cbse-types', 'Data types and operators', 'python', ['int, float, str, bool, list, tuple, dict', 'Mutable vs immutable types', 'Operator precedence: ** before * before +'], [
    read({
      kicker: `READ · ${K} · CLASS 11`,
      title: 'Every value has a type',
      body: 'Python has numbers (int, float, complex), text (str), truth values (bool) and collections (list, tuple, dict, set). Lists and dictionaries are mutable: they can change in place. Numbers, strings and tuples are immutable.',
      lang: 'python',
      code: ['print(type(5), type(5.0), type("5"))', 'print(2 + 3 * 4 ** 2)   # ** first, then *, then +'],
      tip: 'Board exams love precedence: ** binds tightest and groups right to left.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Board-style output',
      lang: 'python',
      lines: ['a = 15 // 4 + 15 % 4', 'b = 2 ** 3 * 2', 'print(a, b, a > b or not a)'],
      answer: '6 16 False',
      explain: '15 // 4 = 3 and 15 % 4 = 3, so a = 6. b = 8 × 2 = 16. 6 > 16 is False and not 6 is False.',
    }),
    quiz({
      prompt: 'Which of these is mutable?',
      options: ['list', 'tuple', 'str', 'int'],
      mono: true,
      right: 'Lists can be changed in place; the others cannot.',
      wrong: 'Tuples, strings and ints are immutable. Lists are mutable.',
    }),
  ], 6),

  lesson('cbse-flow', 'Flow of control', 'python', ['if / elif / else choose a branch', 'break leaves a loop, continue skips to the next round', 'range(start, stop, step)'], [
    read({
      kicker: `READ · ${K} · CLASS 11`,
      title: 'Decide and repeat',
      body: 'if, elif and else choose one branch. for loops over a sequence, while repeats until a condition is false. Inside a loop, break stops it completely and continue jumps to the next round.',
      lang: 'python',
      code: ['for n in range(1, 10):', '    if n % 2 == 0:', '        continue', '    if n > 7:', '        break', '    print(n, end=" ")'],
      tip: 'A loop\'s else block runs only if the loop was not stopped by break.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'continue and break',
      lang: 'python',
      lines: ['for n in range(1, 10):', '    if n % 2 == 0:', '        continue', '    if n > 7:', '        break', '    print(n, end=" ")'],
      answer: '1 3 5 7',
      explain: 'Even numbers are skipped; 9 is greater than 7, so the loop breaks.',
    }),
    code({
      title: 'Leap year',
      instructions: 'is_leap(year) returns True for leap years: divisible by 4, except century years, which must be divisible by 400.',
      file: 'leap.py',
      starter: 'def is_leap(year):\n    return year % 4 == 0\n',
      tests: [
        { call: 'is_leap(2024)', expect: 'True' },
        { call: 'is_leap(1900)', expect: 'False' },
        { call: 'is_leap(2000)', expect: 'True' },
        { call: 'is_leap(2023)', expect: 'False' },
      ],
      hint: 'return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)',
      solution: 'def is_leap(year):\n    return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)\n',
    }),
  ], 7),

  lesson('cbse-strings', 'Strings', 'python', ['Indexing and slicing, including negative indexes', 'Common methods: upper, find, count, split, join', 'Strings are immutable'], [
    read({
      kicker: `READ · ${K} · CLASS 11`,
      title: 'Text, one character at a time',
      body: 'A string is a sequence of characters. s[0] is the first, s[-1] the last, and s[a:b] slices from a up to (not including) b. Methods like upper(), count(), find() and split() return new values; the original string never changes.',
      lang: 'python',
      code: ['s = "COMPUTER"', 'print(s[1:4], s[-3:], s[::2])', '# OMP TER CMUE'],
      tip: 'find() returns -1 when not found; index() raises an error.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Slicing and methods',
      lang: 'python',
      lines: ['s = "Python Exam"', 'print(s[-4:], s.count("o"), s.lower().find("e"))'],
      answer: 'Exam 1 7',
      explain: 's[-4:] is "Exam". One lowercase "o". In "python exam", "e" first appears at index 7.',
    }),
    code({
      title: 'Reverse the words',
      instructions: 'reverse_words(s) returns the sentence with its words in reverse order, separated by single spaces.',
      file: 'words.py',
      starter: 'def reverse_words(s):\n    return s\n',
      tests: [
        { call: 'reverse_words("I love Python")', expect: '"Python love I"' },
        { call: 'reverse_words("  board   exam ")', expect: '"exam board"' },
      ],
      hint: 'return " ".join(s.split()[::-1])',
      solution: 'def reverse_words(s):\n    return " ".join(s.split()[::-1])\n',
    }),
  ], 7),

  lesson('cbse-lists', 'Lists', 'python', ['append adds one item, extend adds many', 'insert, remove, pop and sort change the list', 'Slicing makes a copy'], [
    read({
      kicker: `READ · ${K} · CLASS 11`,
      title: 'The most-used Python type',
      body: 'Lists hold any values in order and can change. append(x) adds one item; extend(list) adds every item from another list; pop() removes the last item and returns it; sort() sorts in place.',
      lang: 'python',
      code: ['L = [3, 1, 2]', 'L.append([4, 5])   # [3, 1, 2, [4, 5]]', 'L = [3, 1, 2]', 'L.extend([4, 5])   # [3, 1, 2, 4, 5]'],
      tip: 'sorted(L) returns a new list; L.sort() changes L and returns None.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'append vs extend',
      lang: 'python',
      lines: ['L = [10, 20]', 'L.append([30])', 'L.extend([40, 50])', 'print(len(L), L.pop(), L)'],
      answer: '5 50 [10, 20, [30], 40]',
      explain: 'append adds the whole list [30] as one item. extend adds 40 and 50. pop removes 50.',
    }),
    code({
      title: 'Remove duplicates',
      instructions: 'unique(L) returns a new list with duplicates removed, keeping the first occurrence of each value in order.',
      file: 'unique.py',
      starter: 'def unique(L):\n    return list(set(L))\n',
      tests: [
        { call: 'unique([3, 1, 3, 2, 1])', expect: '[3, 1, 2]' },
        { call: 'unique(["b", "a", "b"])', expect: '["b", "a"]' },
        { call: 'unique([])', expect: '[]' },
      ],
      hint: 'Loop and append each item only if it is not already in the result.',
      solution: 'def unique(L):\n    out = []\n    for x in L:\n        if x not in out:\n            out.append(x)\n    return out\n',
    }),
  ], 7),

  lesson('cbse-dict', 'Tuples and dictionaries', 'python', ['Tuples are fixed sequences', 'Dictionaries map keys to values', 'get(), keys(), values(), items()'], [
    read({
      kicker: `READ · ${K} · CLASS 11`,
      title: 'Fixed records and lookups',
      body: 'A tuple like (101, "Asha") cannot be changed, which makes it a safe record. A dictionary stores key: value pairs; d[key] reads a value, and d.get(key, default) avoids an error for missing keys.',
      lang: 'python',
      code: ['marks = {"Asha": 91, "Ravi": 78}', 'marks["Meera"] = 85', 'for name, m in marks.items():', '    print(name, m)'],
      tip: 'Dictionary keys must be immutable: numbers, strings or tuples.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Dictionary update',
      lang: 'python',
      lines: ['d = {"a": 1, "b": 2}', 'd["a"] += 10', 'd["c"] = d.get("c", 0) + 5', 'print(d)'],
      answer: "{'a': 11, 'b': 2, 'c': 5}",
      explain: 'a becomes 11; c was missing, so get returns 0 and c becomes 5.',
    }),
    code({
      title: 'Word frequency',
      instructions: 'word_freq(text) returns a dictionary of how many times each word appears, ignoring case.',
      file: 'freq.py',
      starter: 'def word_freq(text):\n    return {}\n',
      tests: [
        { call: 'word_freq("The cat and the hat")', expect: '{"the": 2, "cat": 1, "and": 1, "hat": 1}' },
        { call: 'word_freq("")', expect: '{}' },
      ],
      hint: 'for w in text.lower().split(): counts[w] = counts.get(w, 0) + 1',
      solution: 'def word_freq(text):\n    counts = {}\n    for w in text.lower().split():\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n',
    }),
  ], 7),

  lesson('cbse-functions', 'Functions and scope', 'python', ['Positional, default and keyword arguments', 'Local variables live inside the function', 'global lets a function change a global variable'], [
    read({
      kicker: `READ · ${K} · CLASS 12`,
      title: 'Parameters and scope',
      body: 'Default parameters must come after non-default ones. Variables created inside a function are local. To change a global variable inside a function, declare it global first.',
      lang: 'python',
      code: ['count = 0', 'def add():', '    global count', '    count += 1', 'add(); add()', 'print(count)  # 2'],
      tip: 'def f(a=1, b) is a SyntaxError: defaults go last.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Local or global?',
      lang: 'python',
      lines: ['x = 5', 'def change(x):', '    x = x * 2', '    return x', 'y = change(x)', 'print(x, y)'],
      answer: '5 10',
      explain: 'The parameter x is local; the global x stays 5.',
    }),
    bug({
      kicker: `FIND THE ERROR · ${K}`,
      title: 'Default argument order',
      instructions: 'This raises a SyntaxError. Which line is wrong?',
      lang: 'python',
      lines: ['def fare(km=10, rate):', '    return km * rate', 'print(fare(rate=2))'],
      bug: 0,
      fix: 'def fare(rate, km=10):',
      explain: 'Parameters with defaults must come after those without.',
    }),
  ], 7),

  lesson('cbse-exceptions', 'Exception handling', 'python', ['try runs risky code', 'except handles a specific error', 'else runs if no error, finally always runs'], [
    read({
      kicker: `READ · ${K} · CLASS 12`,
      title: 'Handle errors gracefully',
      body: 'Wrap risky code in try. Handle specific errors in except blocks. The else block runs only when no exception happened, and finally runs every time, which is useful for closing files.',
      lang: 'python',
      code: ['try:', '    n = int(input("Seats: "))', 'except ValueError:', '    print("Enter a number")', 'else:', '    print("Booked", n)', 'finally:', '    print("Thank you")'],
      tip: 'Common board questions: ZeroDivisionError, ValueError, IndexError, KeyError, NameError.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'try, except, else, finally',
      lang: 'python',
      lines: ['for v in ["4", "x"]:', '    try:', '        n = int(v)', '    except ValueError:', '        print("bad", end=" ")', '    else:', '        print(n * 2, end=" ")', '    finally:', '        print("|", end=" ")'],
      answer: '8 | bad |',
      explain: '"4" converts, so else prints 8; "x" fails, so except prints bad. finally runs both times.',
    }),
    code({
      title: 'Safe division',
      instructions: 'safe_divide(a, b) returns a / b, or the string "Cannot divide by zero" when b is 0.',
      file: 'divide.py',
      starter: 'def safe_divide(a, b):\n    return a / b\n',
      tests: [
        { call: 'safe_divide(10, 4)', expect: '2.5' },
        { call: 'safe_divide(5, 0)', expect: '"Cannot divide by zero"' },
      ],
      hint: 'try: return a / b\nexcept ZeroDivisionError: return "Cannot divide by zero"',
      solution: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n',
    }),
  ], 7),

  lesson('cbse-files', 'Text file handling', 'python', ['open() with modes r, w and a', 'read(), readline() and readlines()', 'with closes the file for you'], [
    read({
      kicker: `READ · ${K} · CLASS 12`,
      title: 'Read and write files',
      body: 'open(name, mode) opens a file: "r" reads, "w" overwrites, "a" appends. read() returns everything, readline() one line, readlines() a list of lines. A with block closes the file automatically.',
      lang: 'python',
      code: ['with open("notes.txt", "w") as f:', '    f.write("Python\\nThe board exam\\nTime table\\n")', '', 'with open("notes.txt") as f:', '    for line in f:', '        if line.startswith("T"):', '            print(line.strip())'],
      tip: 'A classic board question: count lines that start with a letter, or words in a file.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Add, don\u2019t overwrite',
      instructions: 'This should add a new line at the end of the file. Tap the mode that does that.',
      lang: 'python',
      lines: ['with open("log.txt", "a") as f:', '    f.write("Booked\\n")'],
      target: { line: 0, token: '"a"' },
      explain: '"a" appends; "w" would erase the file first.',
    }),
    code({
      title: 'Count lines starting with T',
      instructions: 'count_t(text) receives a file\u2019s contents as a string. Return how many lines start with "T" or "t", like the classic board question.',
      file: 'count_t.py',
      starter: 'def count_t(text):\n    return 0\n',
      tests: [
        { call: 'count_t("The exam\\nis\\ntomorrow\\nTake rest")', expect: '3' },
        { call: 'count_t("")', expect: '0' },
      ],
      hint: 'for line in text.split("\\n"): if line[:1] in ("T", "t"): count += 1',
      solution: 'def count_t(text):\n    count = 0\n    for line in text.split("\\n"):\n        if line[:1] in ("T", "t"):\n            count += 1\n    return count\n',
    }),
  ], 7),

  lesson('cbse-stack', 'Stack using a list', 'python', ['Stack: last in, first out', 'push = append, pop = pop()', 'Check for an empty stack before popping'], [
    read({
      kicker: `READ · ${K} · CLASS 12`,
      title: 'The board\u2019s favourite data structure',
      body: 'A stack adds and removes items from the same end. In Python a list works as a stack: append() pushes and pop() removes the top. Popping an empty stack is "underflow", so always check first.',
      lang: 'python',
      code: ['stack = []', 'def push(item):', '    stack.append(item)', 'def pop():', '    if not stack:', '        return "Underflow"', '    return stack.pop()'],
      tip: 'Board questions often push only items that meet a condition, then pop and display them.',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Push and pop',
      lang: 'python',
      lines: ['S = []', 'for n in [12, 7, 30, 5]:', '    if n % 2 == 0:', '        S.append(n)', 'print(S.pop(), S)'],
      answer: '30 [12]',
      explain: 'Only even numbers are pushed: [12, 30]. pop returns 30.',
    }),
    code({
      title: 'Push the toppers',
      instructions: 'marks is a dict of name: marks. push_toppers(marks) returns a stack (list) of names scoring 90 or more, in dict order. Then pop_all(stack) returns the names in the order they are popped.',
      file: 'stack.py',
      starter: 'def push_toppers(marks):\n    return []\n\ndef pop_all(stack):\n    return []\n',
      tests: [
        { call: 'push_toppers({"Asha": 95, "Ravi": 78, "Meera": 90})', expect: '["Asha", "Meera"]' },
        { call: 'pop_all(["Asha", "Meera"])', expect: '["Meera", "Asha"]' },
        { call: 'pop_all([])', expect: '[]' },
      ],
      hint: 'In pop_all: while stack: out.append(stack.pop())',
      solution:
        'def push_toppers(marks):\n    stack = []\n    for name, m in marks.items():\n        if m >= 90:\n            stack.append(name)\n    return stack\n\ndef pop_all(stack):\n    out = []\n    while stack:\n        out.append(stack.pop())\n    return out\n',
    }),
  ], 7),

  lesson('cbse-sql', 'SQL for board exams', 'sql', ['SELECT with WHERE, ORDER BY and GROUP BY', 'Aggregate functions: COUNT, SUM, AVG, MAX, MIN', 'Board syntax is MySQL; the queries here work the same'], [
    read({
      kicker: `READ · ${K} · CLASS 12`,
      title: 'Database questions in the board exam',
      body: 'Board questions give you a table and ask for queries or their output. Practise on our trains table: the same SELECT, WHERE, ORDER BY, GROUP BY and aggregate functions are used in MySQL.',
      lang: 'sql',
      code: ['SELECT to_city, COUNT(*), AVG(fare)', 'FROM trains', 'GROUP BY to_city', 'ORDER BY COUNT(*) DESC;'],
      tip: 'Learn the difference between WHERE (rows) and HAVING (groups).',
    }),
    predict({
      kicker: `FIND THE OUTPUT · ${K}`,
      title: 'Query output',
      lang: 'sql',
      lines: ['SELECT COUNT(*), MAX(seats) FROM trains', "WHERE from_city = 'Mumbai';"],
      answer: '2 | 60',
      explain: 'Two trains start in Mumbai: Rajdhani (12 seats) and Coimbatore Express (60).',
    }),
    sqlQuery({
      title: 'Busiest destinations',
      instructions: 'Show each to_city with the number of trains going there, only for cities with more than one train.',
      starter: 'SELECT to_city FROM trains;',
      expected: ['Delhi | 3'],
      hint: 'GROUP BY to_city HAVING COUNT(*) > 1',
      solution: 'SELECT to_city, COUNT(*) FROM trains GROUP BY to_city HAVING COUNT(*) > 1;',
    }),
  ], 8),
];
