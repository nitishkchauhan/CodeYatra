// Notes v4 additions for Python Basic Modules 4–12: the 30-second summary, real mistakes (tests run each `bad`
// program and compare its error or output) and a three-question self-check. Merged into the module notes in index.ts.
import type { ModuleNotes } from '../types';

type Extras = Required<Pick<ModuleNotes, 'summary' | 'mistakes' | 'check' | 'runnable'>>;

export const PYTHON_V4_NOTES: Record<string, Extras> = {
  'p-if-1': {
    runnable: true,
    summary: ['if runs its indented lines only when its test is True.', 'In if / elif / else, only the first True branch runs.', '== compares and = stores; and needs both sides True, or needs one.'],
    mistakes: [
      { title: 'One = inside an if', bad: ['bill = 500', 'if bill = 500:', '    print("Exactly 500")'], error: "SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?", fix: ['bill = 500', 'if bill == 500:', '    print("Exactly 500")'], why: '= stores a value. To compare, use ==.' },
      { title: 'The wider test first', bad: ['bill = 700', 'if bill > 200:', '    print("₹20 delivery")', 'elif bill > 500:', '    print("Free delivery")'], error: '₹20 delivery', fix: ['bill = 700', 'if bill > 500:', '    print("Free delivery")', 'elif bill > 200:', '    print("₹20 delivery")'], why: 'Only the first True branch runs, so put the narrower test (> 500) first.' },
      { title: 'Comparing text with a number', bad: ['age = "18"', 'print(age == 18)'], error: 'False', fix: ['age = int("18")', 'print(age == 18)'], why: '"18" is text and 18 is a number, so they are never equal. Turn the text into a number first.' },
    ],
    check: [
      { q: 'x = 10. What does x > 5 and x < 8 give?', options: ['False', 'True', '10', 'An error'], answer: 0, why: 'x < 8 is False, and and needs both sides True.' },
      { q: 'How many branches of one if / elif / else can run?', options: ['Exactly one', 'All the True ones', 'At least two', 'None'], answer: 0, why: 'Python runs the first True branch (or else) and skips the rest.' },
      { q: 'Which line compares x with 3?', options: ['x == 3', 'x = 3', 'x := 3', 'x === 3'], answer: 0, why: '== compares in Python; = stores.' },
    ],
  },
  'p-loop-1': {
    runnable: true,
    summary: ['for runs its indented lines once for every value it is given.', 'range(start, stop) counts from start and stops just before stop.', 'For a total: start at 0 before the loop, add inside, print after.'],
    mistakes: [
      { title: 'Stopping one too soon', bad: ['for day in range(1, 5):', '    print("Day", day)'], error: 'Day 1\nDay 2\nDay 3\nDay 4', fix: ['for day in range(1, 6):', '    print("Day", day)'], why: 'range stops before its second number. To reach 5, stop at 6.' },
      { title: 'Printing inside the loop', bad: ['total = 0', 'for n in range(1, 4):', '    total = total + n', '    print(total)'], error: '1\n3\n6', fix: ['total = 0', 'for n in range(1, 4):', '    total = total + n', 'print(total)'], why: 'An indented print runs every round. Un-indent it to print once, after the loop.' },
      { title: 'Starting the total inside the loop', bad: ['for n in range(1, 4):', '    total = 0', '    total = total + n', 'print(total)'], error: '3', fix: ['total = 0', 'for n in range(1, 4):', '    total = total + n', 'print(total)'], why: 'total = 0 inside the loop resets it every round. Set it once, before the loop.' },
    ],
    check: [
      { q: 'How many times does for i in range(5) run?', options: ['5', '4', '6', '0'], answer: 0, why: 'range(5) gives 0, 1, 2, 3, 4: five values.' },
      { q: 'What is the last number in range(3, 9, 3)?', options: ['6', '9', '3', '8'], answer: 0, why: 'It counts 3, 6 and stops before 9.' },
      { q: 'total = 0; for n in range(4): total = total + n. What is total?', options: ['6', '10', '4', '0'], answer: 0, why: '0 + 1 + 2 + 3 = 6.' },
    ],
  },
  'p-while-1': {
    runnable: true,
    summary: ['while repeats as long as its condition is True.', 'Change something inside the loop so the condition can become False.', 'break leaves a loop at once.'],
    mistakes: [
      { title: 'Stopping one round early', bad: ['n = 3', 'while n > 1:', '    print(n)', '    n = n - 1', 'print("Go!")'], error: '3\n2\nGo!', fix: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'], why: 'When n is 1, n > 1 is already False. Use n > 0 to include 1.' },
      { title: 'Changing it before printing', bad: ['n = 3', 'while n > 0:', '    n = n - 1', '    print(n)'], error: '2\n1\n0', fix: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1'], why: 'Order matters inside the loop: print first, then count down.' },
      { title: 'Never changing the value', bad: ['n = 3', 'while n > 0:', '    print(n)', '    break'], error: '3', fix: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1'], why: 'Here break hides the real problem: n never changes, so without break the loop would never end. Count down inside the loop.' },
    ],
    check: [
      { q: 'n = 0; while n < 3: n = n + 1. What is n after the loop?', options: ['3', '2', '4', '0'], answer: 0, why: 'n goes 1, 2, 3; then n < 3 is False.' },
      { q: 'Which loop never stops?', options: ['while True: print(1)', 'while False: print(1)', 'for i in range(3): print(i)', 'n = 2; while n > 0: n = n - 1'], answer: 0, why: 'while True is always True, and nothing breaks out.' },
      { q: 'What does break do?', options: ['Leaves the loop at once', 'Skips one round', 'Restarts the loop', 'Ends the program'], answer: 0, why: 'break ends the loop and carries on after it.' },
    ],
  },
  'p-loop-2': {
    runnable: true,
    summary: ['A list keeps values in order; positions start at 0 and -1 is the last.', 'append() adds at the end; list[i] = x replaces an item.', 'for item in list visits every item.'],
    mistakes: [
      { title: 'One position too far', bad: ['menu = ["tea", "coffee", "milk"]', 'print(menu[3])'], error: 'IndexError: list index out of range', fix: ['menu = ["tea", "coffee", "milk"]', 'print(menu[-1])'], why: 'Three items are at 0, 1 and 2. -1 always means the last one.' },
      { title: 'append with two items', bad: ['menu = ["tea"]', 'menu.append("milk", "coffee")'], error: 'TypeError: list.append() takes exactly one argument (2 given)', fix: ['menu = ["tea"]', 'menu.append("milk")', 'menu.append("coffee")'], why: 'append adds one item at a time.' },
      { title: 'Expecting append to give back the list', bad: ['menu = ["tea"]', 'menu = menu.append("milk")', 'print(menu)'], error: 'None', fix: ['menu = ["tea"]', 'menu.append("milk")', 'print(menu)'], why: 'append changes the list itself and returns None. Don’t store its result.' },
    ],
    check: [
      { q: 'nums = [4, 7, 9]. What is nums[1]?', options: ['7', '4', '9', 'An error'], answer: 0, why: 'Position 1 is the second item.' },
      { q: 'What is len(["a", "b", "c", "d"])?', options: ['4', '3', '5', '0'], answer: 0, why: 'len counts the items: four.' },
      { q: 'x = [1, 2]; x.append(3). What is x?', options: ['[1, 2, 3]', '[3, 1, 2]', '[1, 2]', '3'], answer: 0, why: 'append adds 3 at the end.' },
    ],
  },
  'p-dict-1': {
    runnable: true,
    summary: ['A dictionary maps keys to values: {"tea": 12}.', 'd[key] = value adds a key or changes its value.', 'Use key in d or d.get(key, default) when a key might be missing.'],
    mistakes: [
      { title: 'A key that isn’t there', bad: ['price = {"tea": 12}', 'print(price["milk"])'], error: "KeyError: 'milk'", fix: ['price = {"tea": 12}', 'print(price.get("milk", 0))'], why: 'A missing key crashes. get() gives a default instead.' },
      { title: 'Capital letters in keys', bad: ['price = {"tea": 12}', 'print(price["Tea"])'], error: "KeyError: 'Tea'", fix: ['price = {"tea": 12}', 'print(price["tea"])'], why: '"Tea" and "tea" are different keys.' },
      { title: 'Looking up by position', bad: ['price = {"tea": 12}', 'print(price[0])'], error: 'KeyError: 0', fix: ['price = {"tea": 12}', 'print(price["tea"])'], why: 'Dictionaries are looked up by key, not by position.' },
    ],
    check: [
      { q: 'd = {"x": 1}; d["y"] = 2. What is len(d)?', options: ['2', '1', '3', 'An error'], answer: 0, why: '"y" is a new key, so there are two.' },
      { q: 'd = {"x": 1}. What is d.get("z", 5)?', options: ['5', 'None', 'An error', '1'], answer: 0, why: '"z" is missing, so get gives the default 5.' },
      { q: 'd = {"x": 1}. What is "x" in d?', options: ['True', 'False', '1', '"x"'], answer: 0, why: 'in checks the keys, and "x" is a key.' },
    ],
  },
  'p-fn-1': {
    runnable: true,
    summary: ['def name(params): defines a function; its body runs only when called.', 'Values you pass in go into the parameters.', 'return gives an answer back; print only shows it.'],
    mistakes: [
      { title: 'No return', bad: ['def bill(cups):', '    total = cups * 12', 'print(bill(3))'], error: 'None', fix: ['def bill(cups):', '    return cups * 12', 'print(bill(3))'], why: 'Without return, a function gives back None.' },
      { title: 'Calling before defining', bad: ['print(bill(3))', 'def bill(cups):', '    return cups * 12'], error: "NameError: name 'bill' is not defined", fix: ['def bill(cups):', '    return cups * 12', 'print(bill(3))'], why: 'Python runs top to bottom: define the function before you call it.' },
      { title: 'Missing an argument', bad: ['def bill(cups, price):', '    return cups * price', 'print(bill(3))'], error: "TypeError: bill() missing 1 required positional argument: 'price'", fix: ['def bill(cups, price):', '    return cups * price', 'print(bill(3, 12))'], why: 'Pass a value for every parameter.' },
    ],
    check: [
      { q: 'def f(n): return n + 1. What is f(4)?', options: ['5', '4', 'None', 'n + 1'], answer: 0, why: 'n is 4, so it returns 5.' },
      { q: 'def g(): print("hi"). What is x after x = g()?', options: ['None', '"hi"', 'hi', 'An error'], answer: 0, why: 'g prints but returns nothing, so x is None.' },
      { q: 'Which word gives a value back from a function?', options: ['return', 'print', 'give', 'def'], answer: 0, why: 'return hands the value back to the caller.' },
    ],
  },
  'p-err-1': {
    runnable: true,
    summary: ['Read an error from its last line: the name and the reason.', 'try / except keeps the program running when a line fails.', 'Catch the specific error you expect, like except ValueError.'],
    mistakes: [
      { title: 'Catching the wrong error', bad: ['try:', '    print(10 / 0)', 'except ValueError:', '    print("Oops")'], error: 'ZeroDivisionError: division by zero', fix: ['try:', '    print(10 / 0)', 'except ZeroDivisionError:', '    print("Oops")'], why: 'except only catches the error it names.' },
      { title: 'Text that isn’t a number', bad: ['cups = int("12 cups")'], error: "ValueError: invalid literal for int() with base 10: '12 cups'", fix: ['cups = int("12")'], why: 'int() reads digits only. Remove the words first, or handle the ValueError.' },
      { title: 'Mixing text and numbers', bad: ['print("Total: " + 40)'], error: 'TypeError: can only concatenate str (not "int") to str', fix: ['print("Total:", 40)'], why: 'TypeError means two kinds of value were used together in a way Python can’t do.' },
    ],
    check: [
      { q: 'Which error does int("x") give?', options: ['ValueError', 'TypeError', 'KeyError', 'NameError'], answer: 0, why: 'The type is right (text), but the value can’t be read as a number.' },
      { q: 'If a try block works without an error, does except run?', options: ['No', 'Yes', 'Only once', 'It crashes'], answer: 0, why: 'except runs only when the try block fails with that error.' },
      { q: 'Which error does [1, 2][5] give?', options: ['IndexError', 'KeyError', 'ValueError', 'ZeroDivisionError'], answer: 0, why: 'There is no position 5 in a 2-item list.' },
    ],
  },
  'p-file-1': {
    runnable: true,
    summary: ['open(name, "w") writes from empty, "a" adds to the end, "r" (the default) reads.', 'with open(...) as f: closes the file when the block ends.', 'for line in f reads line by line; strip() removes the newline.'],
    mistakes: [
      { title: '"w" when you meant "a"', bad: ['with open("log.txt", "w") as f:', '    f.write("tea\\n")', 'with open("log.txt", "w") as f:', '    f.write("coffee\\n")', 'print(open("log.txt").read().strip())'], error: 'coffee', fix: ['with open("log.txt", "w") as f:', '    f.write("tea\\n")', 'with open("log.txt", "a") as f:', '    f.write("coffee\\n")', 'print(open("log.txt").read().strip())'], why: '"w" empties the file each time. "a" keeps what is there.' },
      { title: 'Reading a file that isn’t there', bad: ['print(open("notes.txt").read())'], error: "FileNotFoundError: [Errno 2] No such file or directory: 'notes.txt'", fix: ['with open("notes.txt", "w") as f:', '    f.write("hello")', 'print(open("notes.txt").read())'], why: 'Reading needs the file to exist. Write it first (or check the name).' },
      { title: 'Writing a number', bad: ['with open("sales.txt", "w") as f:', '    f.write(480)'], error: 'TypeError: write() argument must be str, not int', fix: ['with open("sales.txt", "w") as f:', '    f.write(str(480))'], why: 'write() takes text. Turn numbers into text with str().' },
    ],
    check: [
      { q: 'Which mode keeps the old text and adds to it?', options: ['"a"', '"w"', '"r"', '"x"'], answer: 0, why: '"a" means append.' },
      { q: 'What does open("a.txt") with no mode do?', options: ['Reads it', 'Writes it', 'Deletes it', 'Adds to it'], answer: 0, why: 'The default mode is "r", read.' },
      { q: 'What does f.write() need?', options: ['Text (a string)', 'A number', 'A list', 'Nothing'], answer: 0, why: 'write() takes a string; use str() for numbers.' },
    ],
  },
  'p-class-1': {
    runnable: true,
    summary: ['class describes a kind of thing; each object made from it has its own values.', '__init__ runs when an object is made and sets it up.', 'Methods take self, so they can read and change that object.'],
    mistakes: [
      { title: 'Forgetting self.', bad: ['class Tab:', '    def __init__(self):', '        total = 0', 't = Tab()', 'print(t.total)'], error: "AttributeError: 'Tab' object has no attribute 'total'", fix: ['class Tab:', '    def __init__(self):', '        self.total = 0', 't = Tab()', 'print(t.total)'], why: 'Only self.total is stored on the object.' },
      { title: 'Leaving out self in a method', bad: ['class Cup:', '    def label():', '        return "Cup"', 'print(Cup().label())'], error: 'TypeError: Cup.label() takes 0 positional arguments but 1 was given', fix: ['class Cup:', '    def label(self):', '        return "Cup"', 'print(Cup().label())'], why: 'Python passes the object in as self, so every method needs it first.' },
      { title: 'Forgetting a value for __init__', bad: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'c = Cup()'], error: "TypeError: Cup.__init__() missing 1 required positional argument: 'size'", fix: ['class Cup:', '    def __init__(self, size):', '        self.size = size', 'c = Cup("large")'], why: 'Pass every value __init__ asks for when you make the object.' },
    ],
    check: [
      { q: 'a = Cup("small"); b = Cup("large"). How many objects?', options: ['2', '1', '0', '3'], answer: 0, why: 'Each Cup(...) makes a new object.' },
      { q: 'When does __init__ run?', options: ['When an object is made', 'When the class is written', 'Never', 'When the program ends'], answer: 0, why: 'Cup(...) makes an object and runs __init__ to set it up.' },
      { q: 'In a method, what is self?', options: ['The object it was called on', 'The class name', 'A copy of the object', 'Nothing'], answer: 0, why: 'self is that object, so self.x is its x.' },
    ],
  },
};
