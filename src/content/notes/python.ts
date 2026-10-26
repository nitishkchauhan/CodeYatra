// Module notes for the Python track. Every worked example is run in tests and must print `output`.
import type { ModuleNotes } from '../types';

export const PYTHON_NOTES: Record<string, ModuleNotes> = {
  // ── Basic ──────────────────────────────────────────────────────────────
  'p-var-1': {
    minutes: 5,
    sections: [
      { heading: 'A program runs top to bottom', body: 'Python reads your file one line at a time, from the first line to the last, and does what each line says. print() is how a program talks to you: whatever is inside the brackets is shown on the screen. Text must be inside quotes so Python knows it is text and not a name. Numbers are written without quotes. Separate several values with commas and print puts a space between them.', code: ['print("Namaste!")', 'print("Cups:", 40)'], anim: 'print' },
      { heading: 'Variables are named boxes', body: 'A variable stores a value so you can use it later. price = 12 creates a box called price and puts 12 in it. The = sign means “store”, not “is equal to”. Names can use letters, digits and underscores but can’t start with a digit, and Python cares about capitals: Price and price are different boxes. Choose names that say what the value means, like cups_sold.', code: ['price = 12', 'cups_sold = 40'], anim: 'variable' },
      { heading: 'A box keeps only its latest value', body: 'Storing a new value replaces the old one completely. You can use the old value to work out the new one: total = total + 25 reads total, adds 25 and stores the result back. Python works out the right side first, then stores it on the left. This pattern, updating a value from itself, is how counters and running totals work in every program.', code: ['total = 100', 'total = total + 25'], anim: 'variable' },
    ],
    example: {
      title: 'Riya’s daily takings',
      code: ['price = 12', 'cups = 40', 'takings = price * cups', 'price = 15', 'print("Today:", takings)', 'print("New price:", price)'],
      walk: [
        { line: 1, text: 'A box called price gets 12.' },
        { line: 3, text: 'price * cups is worked out now: 12 × 40 = 480, stored in takings.' },
        { line: 4, text: 'price changes to 15. takings does not change: it already holds 480.' },
        { line: 5, text: 'print shows the text and the value, with a space between.' },
      ],
      output: ['Today: 480', 'New price: 15'],
    },
    industry: 'Every program you will ever write is built from values stored in variables. In real code, clear names matter more than short ones: teams agree on a style (in Python, lowercase_with_underscores) so anyone can read anyone’s code. A confusing name is one of the most common things reviewers ask you to change.',
    interview: [
      { q: 'What does = mean in Python?', a: 'It stores the value on the right in the name on the left. Comparing two values uses ==.' },
      { q: 'After a = 5, b = a, a = 7, what is b?', a: '5. b got the value 5; changing a later does not change b.' },
      { q: 'Is 2price a valid variable name?', a: 'No. Names can’t start with a digit. price2 or price_2 are fine.' },
    ],
    cheat: [
      { code: 'print("Hi", 5)', meaning: 'show values, separated by spaces' },
      { code: 'x = 10', meaning: 'store 10 in x' },
      { code: 'x = x + 1', meaning: 'add 1 to x' },
      { code: '"text"', meaning: 'a string (text) value' },
      { code: '# note', meaning: 'a comment Python ignores' },
    ],
  },
  'p-num-1': {
    minutes: 5,
    sections: [
      { heading: 'Two kinds of number', body: 'Python has whole numbers (int), like 38, and decimals (float), like 3.5. Maths works as at school: + − * and /, with brackets first and then * and / before + and −. Division with / always gives a float, even 10 / 2 gives 5.0. ** is a power: 2 ** 10 is 1024. Python ints can be as large as you like, so you never run out of digits.', code: ['print(10 / 2, 2 ** 10)   # 5.0 1024'], anim: 'math' },
      { heading: 'Groups and leftovers', body: '// divides and drops the decimals, giving how many whole groups fit. % gives the remainder, what is left over. Together they answer everyday questions: 38 students in vans of 12 is 38 // 12 = 3 full vans and 38 % 12 = 2 students left. % 2 tells even from odd, and % 10 gives the last digit of a number.', code: ['print(38 // 12, 38 % 12)   # 3 2'], anim: 'math' },
      { heading: 'Text that looks like a number', body: 'input() and files give you text, even when it looks like a number: "38" is a string. "38" + 1 is an error, because Python won’t guess. int("38") turns text into a whole number and float("3.5") into a decimal. round(x, 2) rounds to 2 decimal places, which is how money is usually shown.', code: ['seats = int("38")', 'print(seats + 1)   # 39'], anim: 'types' },
    ],
    example: {
      title: 'Splitting a bill',
      code: ['total = 1250', 'people = 3', 'each = total / people', 'print(round(each, 2))', 'print(total // people, "each, and", total % people, "left over")'],
      walk: [
        { line: 3, text: '/ gives the exact share as a float: 416.666…' },
        { line: 4, text: 'round(…, 2) keeps two decimal places for money.' },
        { line: 5, text: '// gives whole rupees each and % the rupees left over.' },
      ],
      output: ['416.67', '416 each, and 2 left over'],
    },
    industry: 'Billing, payroll and booking systems all do this maths. Real payment systems usually store money as whole paise (an int) instead of rupees as a float, because floats can’t store some decimals exactly: 0.1 + 0.2 is 0.30000000000000004. That one fact prevents real money bugs.',
    interview: [
      { q: 'What is 7 // 2 and 7 % 2?', a: '3 and 1: three whole twos fit in 7, with 1 left over.' },
      { q: 'Why is 0.1 + 0.2 not exactly 0.3?', a: 'Floats are stored in binary and can’t hold 0.1 exactly, so tiny errors appear. Use round(), integers (paise) or the decimal module for money.' },
      { q: 'How do you check if n is even?', a: 'n % 2 == 0.' },
    ],
    cheat: [
      { code: '7 / 2', meaning: '3.5 (always a float)' },
      { code: '7 // 2', meaning: '3 (whole groups)' },
      { code: '7 % 2', meaning: '1 (remainder)' },
      { code: '2 ** 3', meaning: '8 (power)' },
      { code: 'int("42")', meaning: 'text to whole number' },
      { code: 'round(3.14159, 2)', meaning: '3.14' },
    ],
  },
  'p-str-1': {
    minutes: 5,
    sections: [
      { heading: 'Strings are text', body: 'A string is text inside quotes: "Pune" or \'Pune\'. + joins two strings and * repeats one: "ab" * 3 is "ababab". len(s) counts the characters. Each character has a position starting at 0, so city[0] is the first letter and city[-1] the last. Slices like city[0:3] take a piece, stopping before the second number.', code: ['city = "Pune"', 'print(city[0], city[-1], len(city))   # P e 4'], anim: 'string' },
      { heading: 'f-strings put values inside text', body: 'Write f before the quotes and put values in curly brackets: f"Hello {name}, you have {n} seats". Python fills them in. Inside the brackets you can do maths, call functions and format numbers, like {price:.2f} for two decimal places. f-strings are the clearest way to build messages, and they avoid mixing up + and commas.', code: ['name, n = "Asha", 2', 'print(f"Hello {name}, {n} seats")'], anim: 'print' },
      { heading: 'Methods give back new strings', body: 'Strings have methods: .upper(), .lower(), .title(), .strip() to remove spaces at the ends, .replace(a, b) and .split() to cut text into a list of words. Strings never change: every method returns a new string, so store the result, for example name = name.strip().', code: ['raw = "  asha patil "', 'print(raw.strip().title())   # Asha Patil'], anim: 'string' },
    ],
    example: {
      title: 'Tidy a booking name',
      code: ['raw = "  ravi KUMAR "', 'name = raw.strip().title()', 'first = name.split()[0]', 'print(f"Welcome, {first}!")', 'print(len(name), name.upper())'],
      walk: [
        { line: 2, text: 'strip() removes the outside spaces, then title() makes each word start with a capital.' },
        { line: 3, text: 'split() cuts "Ravi Kumar" into ["Ravi", "Kumar"]; [0] takes the first word.' },
        { line: 4, text: 'The f-string puts first inside the message.' },
        { line: 5, text: '"Ravi Kumar" has 10 characters, including the space.' },
      ],
      output: ['Welcome, Ravi!', '10 RAVI KUMAR'],
    },
    industry: 'Most real data arrives as messy text: names with extra spaces, emails in mixed case, phone numbers with dashes. Cleaning it with strip, lower and replace is a daily task for developers and data analysts, and f-strings are how logs, emails and receipts are written.',
    interview: [
      { q: 'Why does s.upper() not change s?', a: 'Strings are immutable. upper() returns a new string; assign it back with s = s.upper().' },
      { q: 'What is "Python"[1:4]?', a: '"yth": positions 1, 2 and 3; the slice stops before 4.' },
      { q: 'How do you count the words in a sentence?', a: 'len(sentence.split()).' },
    ],
    cheat: [
      { code: 's[0], s[-1]', meaning: 'first and last character' },
      { code: 's[1:4]', meaning: 'a slice, stopping before 4' },
      { code: 'f"{x:.2f}"', meaning: 'x with 2 decimal places' },
      { code: 's.strip()', meaning: 'remove spaces at the ends' },
      { code: 's.split()', meaning: 'list of words' },
      { code: '" ".join(words)', meaning: 'words back into one string' },
    ],
  },
  'p-if-1': {
    minutes: 5,
    sections: [
      { heading: 'Comparisons give True or False', body: '== asks “equal?”, != “not equal?”, and <, >, <=, >= compare sizes. Each comparison gives a boolean: True or False. Keep = (store) and == (compare) apart; mixing them is the most common beginner bug. Text comparisons care about capitals, so "a" == "A" is False; compare after .lower() when case shouldn’t matter.', code: ['print(5 > 3, "a" == "A")   # True False'], anim: 'types' },
      { heading: 'if, elif and else', body: 'if runs its indented block only when the condition is True. elif checks another condition if the earlier ones failed, and else catches everything left. Python checks from the top and runs exactly one block, then skips the rest, so put the most specific checks first. The indentation (four spaces) is how Python knows which lines belong to which branch.', code: ['if marks >= 90:', '    grade = "A"', 'elif marks >= 60:', '    grade = "B"', 'else:', '    grade = "C"'], anim: 'branch' },
      { heading: 'Combining conditions', body: 'and needs both sides True, or needs at least one, and not flips True and False. Python stops early: in a and b, if a is False it never looks at b. Brackets make mixed conditions clear. You can also chain comparisons: 18 <= age < 60 means age is at least 18 and under 60.', code: ['if age >= 60 or student:', '    discount = True'], anim: 'branch' },
    ],
    example: {
      title: 'Ticket concession',
      code: ['age = 64', 'student = False', 'if age < 5:', '    fare = 0', 'elif age >= 60 or student:', '    fare = 50', 'else:', '    fare = 100', 'print("Fare:", fare)'],
      walk: [
        { line: 3, text: '64 < 5 is False, so this block is skipped.' },
        { line: 5, text: 'age >= 60 is True, so or is already True; student isn’t even checked.' },
        { line: 6, text: 'fare becomes 50, and Python skips the else block.' },
      ],
      output: ['Fare: 50'],
    },
    industry: 'Business rules are mostly if/elif chains: who gets a discount, which users can see a page, when to send an alert. In teams these rules change often, so developers keep them in one clear place, test each branch, and order checks from most specific to least.',
    interview: [
      { q: 'What is the difference between = and ==?', a: '= stores a value; == compares two values and gives True or False.' },
      { q: 'In an if/elif chain, can two blocks run?', a: 'No. Python runs the first block whose condition is True and skips the rest.' },
      { q: 'What does 0 < x < 10 mean?', a: 'x is greater than 0 and less than 10: a chained comparison.' },
    ],
    cheat: [
      { code: '== !=', meaning: 'equal, not equal' },
      { code: '< > <= >=', meaning: 'compare sizes' },
      { code: 'a and b', meaning: 'both True' },
      { code: 'a or b', meaning: 'at least one True' },
      { code: 'not a', meaning: 'flip True/False' },
      { code: 'if / elif / else', meaning: 'run exactly one branch' },
    ],
  },
  'p-loop-1': {
    minutes: 5,
    sections: [
      { heading: 'for repeats for each value', body: 'for item in something: runs the indented lines once for every value, with item taking each value in turn. It works on lists, strings (letter by letter) and ranges. The loop variable is just a name you choose; pick one that says what it holds, like for price in prices.', code: ['for city in ["Delhi", "Pune"]:', '    print(city)'], anim: 'loop' },
      { heading: 'range() counts for you', body: 'range(5) gives 0, 1, 2, 3, 4. range(1, 6) gives 1 to 5: it starts at the first number and stops before the second. A third number is the step: range(0, 10, 2) gives 0, 2, 4, 6, 8, and range(5, 0, -1) counts down. Use range when you need to repeat a number of times or need the numbers themselves.', code: ['for i in range(1, 4):', '    print(i)   # 1 2 3'], anim: 'loop' },
      { heading: 'Totals and counts', body: 'To add things up, start a total at 0 before the loop and add to it inside. To count, start at 0 and add 1 when something matches. The print of the final answer goes after the loop, not inside it, or you will see a line for every round. This accumulator pattern is in almost every program.', code: ['total = 0', 'for p in [12, 15, 10]:', '    total += p', 'print(total)   # 37'], anim: 'loop' },
    ],
    example: {
      title: 'Count the passes',
      code: ['marks = [72, 35, 90, 48, 39]', 'passed = 0', 'total = 0', 'for m in marks:', '    total += m', '    if m >= 40:', '        passed += 1', 'print(passed, "passed")', 'print("Average:", total / len(marks))'],
      walk: [
        { line: 2, text: 'Both counters start at 0, before the loop.' },
        { line: 4, text: 'm takes each mark in turn: 72, 35, 90, 48, 39.' },
        { line: 6, text: 'Only 72, 90 and 48 are 40 or more, so passed reaches 3.' },
        { line: 9, text: 'After the loop: 284 / 5 = 56.8.' },
      ],
      output: ['3 passed', 'Average: 56.8'],
    },
    industry: 'Loops process every row of a report, every order of the day and every line of a log. In real code, developers often replace simple loops with built-ins like sum(), len() and comprehensions, which are shorter and harder to get wrong. Understanding the loop underneath is what lets you read and debug them.',
    interview: [
      { q: 'What does range(2, 10, 3) give?', a: '2, 5, 8: start at 2, step 3, stop before 10.' },
      { q: 'Why start a total at 0 before the loop, not inside?', a: 'Inside, it would reset to 0 every round and only the last value would count.' },
      { q: 'How do you loop over a list with positions?', a: 'for i, item in enumerate(items): gives each position and value.' },
    ],
    cheat: [
      { code: 'for x in items:', meaning: 'each item in turn' },
      { code: 'range(n)', meaning: '0 to n − 1' },
      { code: 'range(a, b, step)', meaning: 'from a, stop before b' },
      { code: 'total += x', meaning: 'add x to the total' },
      { code: 'enumerate(items)', meaning: 'position and value' },
    ],
  },
  'p-while-1': {
    minutes: 5,
    sections: [
      { heading: 'Repeat while something is true', body: 'while condition: repeats its block as long as the condition stays True, checking it before every round. Use it when you don’t know in advance how many rounds are needed: until the user types the right PIN, until a number is small enough, until the game ends.', code: ['n = 40', 'while n > 5:', '    n = n // 2'], anim: 'whileLoop' },
      { heading: 'Make sure it can stop', body: 'Something inside the loop must change the condition, or it runs forever and the program freezes. Before writing a while loop, ask what changes each round and when the condition becomes False. If the loop needs a safety limit, count rounds and stop at a maximum.', code: ['tries = 0', 'while tries < 3:', '    tries += 1'], anim: 'whileLoop' },
      { heading: 'break and continue', body: 'break leaves the loop at once, even in the middle; continue skips the rest of this round and goes back to the check. while True: with a break inside is a common pattern for “keep asking until it’s right”. Use them sparingly so the loop stays easy to follow.', code: ['while True:', '    pin = next_try()', '    if pin == "4321":', '        break'], anim: 'loop' },
    ],
    example: {
      title: 'Savings goal',
      code: ['saved = 0', 'months = 0', 'while saved < 5000:', '    saved += 1200', '    months += 1', 'print(months, "months, saved", saved)'],
      walk: [
        { line: 3, text: 'The check runs before each round: 0, 1200, 2400, 3600 and 4800 are all under 5000.' },
        { line: 4, text: 'Each round adds a month’s savings, so the condition can become False.' },
        { line: 6, text: 'After the fifth round saved is 6000, the check fails, and the loop ends.' },
      ],
      output: ['5 months, saved 6000'],
    },
    industry: 'Servers, games and apps run on loops that wait for the next request or event. Retry logic, polling a service until a job finishes, and reading data until it runs out are all while loops, always with a limit or a timeout so a failure can’t hang the system.',
    interview: [
      { q: 'When would you use while instead of for?', a: 'When the number of rounds isn’t known in advance and depends on a condition.' },
      { q: 'What causes an infinite loop?', a: 'Nothing inside the loop changes the condition, so it never becomes False.' },
      { q: 'What does break do inside nested loops?', a: 'It leaves only the innermost loop.' },
    ],
    cheat: [
      { code: 'while cond:', meaning: 'repeat while cond is True' },
      { code: 'break', meaning: 'leave the loop now' },
      { code: 'continue', meaning: 'skip to the next round' },
      { code: 'while True: … break', meaning: 'repeat until a break' },
    ],
  },
  'p-loop-2': {
    minutes: 5,
    sections: [
      { heading: 'Lists keep things in order', body: 'A list holds values in order inside square brackets: seats = [12, 0, 7]. Positions start at 0, and negative positions count from the end. len(list) gives how many items. Lists can hold any values, even other lists, and the same value can appear more than once.', code: ['seats = [12, 0, 7]', 'print(seats[0], seats[-1], len(seats))   # 12 7 3'], anim: 'list' },
      { heading: 'Changing a list', body: 'Unlike strings, lists can change in place. append(x) adds to the end, insert(i, x) adds at a position, list[i] = x replaces, remove(x) deletes the first match and pop() removes and returns the last item. sort() sorts the list itself; sorted(list) returns a new sorted list and leaves the original alone.', code: ['seats.append(3)', 'seats[1] = 5', 'seats.sort()'], anim: 'list' },
      { heading: 'Looping and checking', body: 'for item in list visits every item. x in list checks if a value is there. sum, min and max work on a list of numbers. Two names can point to the same list: after b = a, changing b also changes a. Use a.copy() when you need a separate list.', code: ['if 0 in seats:', '    print("A coach is full")'], anim: 'loop' },
    ],
    example: {
      title: 'Today’s orders',
      code: ['orders = ["chai", "samosa"]', 'orders.append("chai")', 'orders.insert(0, "vada")', 'print(orders)', 'print(orders.count("chai"), len(orders))', 'print(sorted(orders))'],
      walk: [
        { line: 2, text: 'append adds "chai" at the end.' },
        { line: 3, text: 'insert(0, …) puts "vada" at the front, shifting the rest along.' },
        { line: 5, text: 'count tells how many times a value appears.' },
        { line: 6, text: 'sorted gives a new list in alphabetical order; orders is unchanged.' },
      ],
      output: ["['vada', 'chai', 'samosa', 'chai']", '2 4', "['chai', 'chai', 'samosa', 'vada']"],
    },
    industry: 'Lists hold rows from a database, items in a cart and results from an API. A classic bug in real code is two variables sharing one list by accident; another is changing a list while looping over it. Knowing when a list is copied and when it is shared saves hours of debugging.',
    interview: [
      { q: 'What is the difference between sort() and sorted()?', a: 'sort() changes the list in place and returns None; sorted() returns a new sorted list.' },
      { q: 'After b = a and b.append(1), does a change?', a: 'Yes. Both names point to the same list. Use b = a.copy() for a separate one.' },
      { q: 'How do you get the last item?', a: 'items[-1].' },
    ],
    cheat: [
      { code: 'items[0], items[-1]', meaning: 'first, last' },
      { code: 'items.append(x)', meaning: 'add to the end' },
      { code: 'items.pop()', meaning: 'remove and return the last' },
      { code: 'x in items', meaning: 'is x there?' },
      { code: 'sorted(items)', meaning: 'new sorted list' },
      { code: 'items.copy()', meaning: 'a separate copy' },
    ],
  },
  'p-dict-1': {
    minutes: 5,
    sections: [
      { heading: 'Keys and values', body: 'A dictionary maps keys to values: marks = {"Asha": 91, "Ravi": 72}. You look up a value by its key, marks["Asha"], instead of by position. Keys are unique; storing under an existing key replaces its value. Keys are usually strings or numbers, and values can be anything, including lists and other dictionaries.', code: ['marks = {"Asha": 91, "Ravi": 72}', 'print(marks["Asha"])   # 91'], anim: 'dict' },
      { heading: 'Adding, changing, checking', body: 'd[key] = value adds a new entry or replaces an old one. key in d checks if a key exists, and d.get(key, default) returns the value or the default when the key is missing, instead of crashing with a KeyError. del d[key] removes an entry. len(d) counts the keys.', code: ['marks["Zoya"] = 85', 'print(marks.get("Kabir", 0))   # 0'], anim: 'dict' },
      { heading: 'Looping and counting', body: 'for key in d loops over the keys; d.items() gives key and value together: for name, m in marks.items(). A dictionary is the natural way to count things: counts[word] = counts.get(word, 0) + 1 adds one for each word. Dictionaries keep the order keys were added.', code: ['for name, m in marks.items():', '    print(name, m)'], anim: 'dict' },
    ],
    example: {
      title: 'Count the votes',
      code: ['votes = ["chai", "coffee", "chai", "lassi", "chai"]', 'counts = {}', 'for v in votes:', '    counts[v] = counts.get(v, 0) + 1', 'print(counts)', 'print(max(counts, key=counts.get))'],
      walk: [
        { line: 2, text: 'An empty dictionary to fill.' },
        { line: 4, text: 'get(v, 0) is 0 the first time a drink is seen, so each count starts at 1.' },
        { line: 5, text: 'Keys appear in the order they were first added.' },
        { line: 6, text: 'max with key=counts.get finds the key with the biggest count.' },
      ],
      output: ["{'chai': 3, 'coffee': 1, 'lassi': 1}", 'chai'],
    },
    industry: 'JSON from APIs, rows from databases and app settings all become dictionaries in Python. Developers use them for fast lookups (finding a user by ID) and for counting and grouping data. Using .get() for fields that might be missing is a habit that prevents many production crashes.',
    interview: [
      { q: 'Why is looking up a key in a dictionary fast?', a: 'Dictionaries use hashing, so a lookup takes about the same time however many keys there are.' },
      { q: 'What happens with d["x"] if "x" is missing?', a: 'A KeyError. Use d.get("x") or check "x" in d first.' },
      { q: 'Can a list be a dictionary key?', a: 'No. Keys must be immutable (like strings, numbers or tuples).' },
    ],
    cheat: [
      { code: 'd[key]', meaning: 'value for key (KeyError if missing)' },
      { code: 'd.get(key, 0)', meaning: 'value or a default' },
      { code: 'd[key] = v', meaning: 'add or replace' },
      { code: 'key in d', meaning: 'does the key exist?' },
      { code: 'd.items()', meaning: 'key and value pairs' },
    ],
  },
  'p-fn-1': {
    minutes: 5,
    sections: [
      { heading: 'Define once, use many times', body: 'def fare(km): creates a function named fare. The indented lines below are its body, and they run only when the function is called: fare(10). Functions give a name to a piece of work, so you can reuse it, test it on its own and read the main program like a list of steps.', code: ['def greet(name):', '    print("Namaste,", name)', '', 'greet("Asha")'], anim: 'function' },
      { heading: 'Parameters and arguments', body: 'In def fare(km), km is a parameter: a name for the input. In fare(10), 10 is the argument: the actual value. When the function runs, km holds 10. A function can take several parameters, separated by commas, and they are matched in order.', code: ['def fare(km, rate):', '    return km * rate', 'print(fare(10, 2))   # 20'], anim: 'function' },
      { heading: 'return sends the answer back', body: 'return value ends the function and hands the value back to whoever called it, so you can store it or use it in another calculation. print only shows a value; it does not give it back. A function without return gives back None. Prefer functions that return results and let the caller decide what to print.', code: ['total = fare(10, 2) + fare(5, 2)', 'print(total)   # 30'], anim: 'function' },
    ],
    example: {
      title: 'Fare with a minimum',
      code: ['def fare(km):', '    price = km * 3', '    if price < 20:', '        return 20', '    return price', '', 'print(fare(4), fare(10))', 'print(fare(4) + fare(10))'],
      walk: [
        { line: 2, text: 'price only exists while fare is running.' },
        { line: 4, text: 'For 4 km, price is 12, under the minimum, so return 20 ends the function here.' },
        { line: 5, text: 'For 10 km, price is 30 and is returned as it is.' },
        { line: 8, text: 'Returned values can be used in sums: 20 + 30.' },
      ],
      output: ['20 30', '50'],
    },
    industry: 'Real codebases are thousands of small functions, each doing one job. Good functions have clear names, take what they need as parameters and return a result instead of printing, which is exactly what makes them easy to test. “Can this be a function?” is a question reviewers ask often.',
    interview: [
      { q: 'What is the difference between a parameter and an argument?', a: 'A parameter is the name in the definition; an argument is the value passed in the call.' },
      { q: 'What does a function return if it has no return?', a: 'None.' },
      { q: 'Why return instead of print?', a: 'A returned value can be stored, tested and reused; printing only shows it.' },
    ],
    cheat: [
      { code: 'def f(x):', meaning: 'define a function' },
      { code: 'f(5)', meaning: 'call it with 5' },
      { code: 'return x * 2', meaning: 'send a value back' },
      { code: 'def f(a, b):', meaning: 'two parameters, in order' },
    ],
  },
  'p-err-1': {
    minutes: 5,
    sections: [
      { heading: 'Read the error from the bottom', body: 'When something goes wrong, Python stops and prints a traceback. The last line is the most useful: the error’s type (like ValueError) and a message. The line above shows where it happened. Errors are not failures; they are Python telling you exactly what to fix.', code: ["int(\"abc\")   # ValueError: invalid literal for int() with base 10: 'abc'"], anim: 'error' },
      { heading: 'try and except', body: 'Put code that might fail inside try:. If an error happens there, Python jumps to the matching except block instead of crashing, and the program carries on. Use it for things outside your control, like what a user types or whether a file exists. Code after the except runs either way.', code: ['try:', '    seats = int(text)', 'except ValueError:', '    seats = 0'], anim: 'error' },
      { heading: 'Catch only what you expect', body: 'Name the specific error: except ValueError. A bare except: hides every problem, including your own bugs, and makes them very hard to find. else: runs when no error happened, and finally: always runs, which is useful for cleaning up. You can raise your own errors with raise ValueError("message").', code: ['if seats < 1:', '    raise ValueError("seats must be at least 1")'], anim: 'error' },
    ],
    example: {
      title: 'Safe seat input',
      code: ['inputs = ["2", "two", "-1"]', 'for text in inputs:', '    try:', '        seats = int(text)', '        if seats < 1:', '            raise ValueError("too few")', '        print("Booked", seats)', '    except ValueError as e:', '        print("Skipped", repr(text), "-", e)'],
      walk: [
        { line: 4, text: '"2" becomes 2 and is booked.' },
        { line: 4, text: '"two" can’t become an int, so Python jumps straight to except.' },
        { line: 6, text: '-1 is a number, but we raise our own ValueError for it.' },
        { line: 8, text: 'as e gives the error, so its message can be shown.' },
      ],
      output: ['Booked 2', "Skipped 'two' - invalid literal for int() with base 10: 'two'", "Skipped '-1' - too few"],
    },
    industry: 'Production systems must never crash on bad input. Developers validate input at the edges (forms, APIs, files), catch specific errors, log them with enough detail to debug later, and show users a helpful message. Swallowing all errors silently is treated as a serious bug in code review.',
    interview: [
      { q: 'Why is a bare except: a bad idea?', a: 'It catches everything, including typos and bugs, so real problems are hidden.' },
      { q: 'What runs in finally?', a: 'Its block always runs, error or not; it’s used for clean-up like closing files.' },
      { q: 'How do you create your own error?', a: 'raise ValueError("message"), or define a class that inherits from Exception.' },
    ],
    cheat: [
      { code: 'try: … except X:', meaning: 'handle error X' },
      { code: 'except X as e:', meaning: 'e is the error' },
      { code: 'else:', meaning: 'runs if no error' },
      { code: 'finally:', meaning: 'always runs' },
      { code: 'raise ValueError("…")', meaning: 'report a problem yourself' },
    ],
  },
  'p-file-1': {
    minutes: 5,
    sections: [
      { heading: 'Opening a file', body: 'open(name, mode) opens a file. "r" reads (the default), "w" writes and empties the file first, and "a" appends to the end. Always use with open(…) as f:, which closes the file automatically when the block ends, even if an error happens.', code: ['with open("notes.txt", "w") as f:', '    f.write("Namaste\\n")'], anim: 'file' },
      { heading: 'Writing lines', body: 'f.write(text) writes exactly what you give it, with no new line added, so end each line with "\\n". print(…, file=f) is another way that adds the new line for you. Writing numbers needs str() or an f-string first, because write only accepts text.', code: ['with open("log.txt", "a") as f:', '    f.write(f"booked {3} seats\\n")'], anim: 'file' },
      { heading: 'Reading back', body: 'for line in f: reads one line at a time, which works even for huge files. Each line ends with "\\n", so call line.strip() before using it. f.read() gives the whole file as one string. A file that doesn’t exist raises FileNotFoundError, which you can catch.', code: ['with open("log.txt") as f:', '    for line in f:', '        print(line.strip())'], anim: 'file' },
    ],
    example: {
      title: 'A tiny marks file',
      code: ['with open("marks.txt", "w") as f:', '    f.write("Asha,91\\n")', '    f.write("Ravi,72\\n")', '', 'total = 0', 'with open("marks.txt") as f:', '    for line in f:', '        name, mark = line.strip().split(",")', '        total += int(mark)', 'print("Total:", total)'],
      walk: [
        { line: 1, text: '"w" creates the file (or empties an old one).' },
        { line: 2, text: 'Each line ends with \\n so the next one starts on a new line.' },
        { line: 8, text: 'strip removes the \\n; split(",") separates the name and the mark.' },
        { line: 9, text: 'The mark is text, so int() is needed before adding.' },
      ],
      output: ['Total: 163'],
    },
    industry: 'Programs read configuration files, CSV exports and logs every day. In real projects, the csv and json modules handle tricky cases (commas inside quotes, nested data), paths are built with pathlib, and files are always opened with with so nothing is left open or half-written.',
    interview: [
      { q: 'Why use with open(…)?', a: 'It closes the file automatically, even if an error happens inside the block.' },
      { q: 'What is the difference between "w" and "a"?', a: '"w" empties the file first; "a" adds to the end.' },
      { q: 'Why call strip() on lines read from a file?', a: 'Each line ends with a new-line character that you usually don’t want.' },
    ],
    cheat: [
      { code: 'open(p, "r"/"w"/"a")', meaning: 'read, write, append' },
      { code: 'with open(p) as f:', meaning: 'auto-close' },
      { code: 'f.write(s)', meaning: 'write text (add \\n)' },
      { code: 'for line in f:', meaning: 'read line by line' },
      { code: 'f.read()', meaning: 'whole file as a string' },
    ],
  },
  'p-class-1': {
    minutes: 6,
    sections: [
      { heading: 'A class describes a kind of object', body: 'class Ticket: describes what every ticket has and can do. Each ticket made from it is an object (an instance) with its own values. Classes keep related data and actions together, so a program about tickets reads like it is about tickets.', code: ['class Ticket:', '    pass', '', 't = Ticket()'], anim: 'classObject' },
      { heading: '__init__ and self', body: '__init__ runs automatically when an object is made, and sets up its starting values. self is the object itself: self.name = name stores name on that particular ticket. Every method takes self as its first parameter; Python passes it in for you when you call t.add(1).', code: ['class Ticket:', '    def __init__(self, name, seats):', '        self.name = name', '        self.seats = seats'], anim: 'classObject' },
      { heading: 'Methods change and use the object', body: 'A method is a function inside a class. It can read and change the object’s attributes through self, so the rules for changing a ticket live in one place. Two objects never share attributes: changing one ticket’s seats leaves the others alone.', code: ['    def add(self, n):', '        self.seats += n'], anim: 'classObject' },
    ],
    example: {
      title: 'Two tickets',
      code: ['class Ticket:', '    def __init__(self, name, seats):', '        self.name = name', '        self.seats = seats', '', '    def add(self, n):', '        self.seats += n', '', 'a = Ticket("Asha", 2)', 'b = Ticket("Ravi", 1)', 'a.add(3)', 'print(a.name, a.seats)', 'print(b.name, b.seats)'],
      walk: [
        { line: 9, text: 'Ticket("Asha", 2) runs __init__ with self as the new object.' },
        { line: 11, text: 'a.add(3) passes a as self, so only a’s seats change.' },
        { line: 13, text: 'b keeps its own value: objects don’t share attributes.' },
      ],
      output: ['Asha 5', 'Ravi 1'],
    },
    industry: 'Most large Python programs, and frameworks like Django, are organised around classes: a User, an Order, a Payment. In teams, a class gives one obvious home for each rule, which makes code easier to find, test and change. Data-only classes are usually written as dataclasses (covered in Advanced).',
    interview: [
      { q: 'What is self?', a: 'The object the method was called on; Python passes it in automatically.' },
      { q: 'When does __init__ run?', a: 'Each time a new object is created from the class.' },
      { q: 'What is the difference between a class and an object?', a: 'A class is the blueprint; an object is one thing made from it, with its own values.' },
    ],
    cheat: [
      { code: 'class Name:', meaning: 'define a class' },
      { code: 'def __init__(self, …):', meaning: 'set up a new object' },
      { code: 'self.x = x', meaning: 'store on this object' },
      { code: 'obj = Name(…)', meaning: 'make an object' },
      { code: 'obj.method()', meaning: 'call a method' },
    ],
  },
};
