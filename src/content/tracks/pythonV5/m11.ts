// Python Basic · Module 11 · Files. Lesson 11.1 keeps the old module id (p-file-1).
// Each program writes the file before reading it, so it gives the same output every time it runs.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, truth } from './kit';

export const PY_B_M11: Lesson[] = [
  lesson('p-file-1', 'Writing and reading a file', 4, [
    chat(['Variables forget everything when the program ends. Files remember.', 'Bills, scores, settings and logs are all saved in files.']),
    run('Write, then read', 'Pick what to write.', ['with open("orders.txt", "w") as f:', '    f.write({{v}})', 'with open("orders.txt") as f:', '    print(f.read())'], ['"Tea x2"', '"Tea x2\\nToast x1"', '"Rosa’s Café orders"'], { caption: '\\n starts a new line inside the file.' }),
    reveal('open() modes', [
      ['"r"', 'Read (the default).'],
      ['"w"', 'Write: makes a new file, or empties the old one.'],
      ['"a"', 'Append: adds to the end.'],
      ['with open(…) as f:', 'Closes the file for you at the end.'],
    ], { mono: true }),
    predict('Overwritten!', ['with open("note.txt", "w") as f:', '    f.write("first")', 'with open("note.txt", "w") as f:', '    f.write("second")', 'with open("note.txt") as f:', '    text = f.read()', 'print(text)'], [
      [7, 'What will it print?', ['second', 'firstsecond', 'first'], '"w" empties the file before writing.', { out: true }],
    ]),
    check('What does "w" do to a file that already exists?', ['Empties it, then writes', 'Adds to the end', 'Reads it', 'Nothing'], 'Careful: the old content is gone.', 'w for a fresh write.'),
    tapbug("FileNotFoundError: No such file or directory: 'order.txt'", ['with open("orders.txt", "w") as f:', '    f.write("Tea")', 'with open("order.txt") as f:'], [[3, '"order.txt"', '"orders.txt"']], 'The names must match exactly.'),
    recap([
      ['💾', 'Files keep data after the program ends'],
      ['✍️', '"w" writes fresh, "a" adds, "r" reads'],
      ['🚪', 'with open(…) closes the file for you'],
    ]),
  ]),

  lesson('p-b-11-2', 'Line by line, and adding to a file', 4, [
    run('Add to the log', 'Pick the orders to add.', ['with open("log.txt", "w") as f:', '    f.write("Tea\\n")', 'for dish in {{v}}:', '    with open("log.txt", "a") as f:', '        f.write(dish + "\\n")', 'with open("log.txt") as f:', '    for line in f:', '        print("-", line.strip())'], ['[]', '["Toast"]', '["Toast", "Sandwich"]'], { caption: '"a" adds each order to the end, keeping the old ones.' }),
    predict('Count the lines', ['with open("menu.txt", "w") as f:', '    f.write("Tea\\nToast\\nSandwich\\n")', 'with open("menu.txt") as f:', '    lines = f.read().splitlines()', 'print(len(lines), lines[1])'], [
      [5, 'What will it print?', ['3 Toast', '3 Tea', '4 Toast'], 'Three lines; position 1 is the second.', { out: true }],
    ]),
    explore('Reading line by line', ['with open("log.txt") as f:', '    for line in f:', '        print(line.strip())'], [
      [1, 'Open the file for reading.'],
      [2, 'A file can be looped over, one line at a time.'],
      [3, 'Each line ends with a new-line character; strip() removes it.'],
    ], { minTaps: 3 }),
    check('Which mode adds to the end of a file?', ['"a"', '"w"', '"r"', '"e"'], 'a for append.', 'Add.', { mono: true }),
    tapbug('Each new order wipes the old ones', ['with open("log.txt", "w") as f:', '    f.write(order)'], [[1, '"w"', '"a"']], '"w" empties the file every time. "a" adds to the end.'),
    recap([
      ['➕', '"a" adds to the end'],
      ['📜', 'for line in f reads line by line'],
      ['🧽', 'strip() removes the new-line'],
    ]),
  ]),

  lesson('p-b-11-3', 'Simple data files', 5, [
    run('Save and load the prices', 'Pick what to print.', ['prices = {"Tea": 40, "Toast": 80}', 'with open("prices.txt", "w") as f:', '    for dish, price in prices.items():', '        f.write(f"{dish},{price}\\n")', 'loaded = {}', 'with open("prices.txt") as f:', '    for line in f:', '        dish, price = line.strip().split(",")', '        loaded[dish] = int(price)', 'print({{v}})'], ['loaded', 'loaded["Toast"] + 1', 'open("prices.txt").read()'], { caption: 'Each line is “dish,price”. split(",") cuts it in two, and int() makes the price a number again.' }),
    reveal('Why with?', [
      ['Closes the file', 'Even if an error happens inside.', '🚪'],
      ['Saves the data', 'Writing is only finished when the file is closed.', '💾'],
      ['Neat', 'Everything for that file sits in one indented block.', '🧹'],
    ]),
    predict('Total from a file', ['with open("sales.txt", "w") as f:', '    f.write("40\\n80\\n90\\n")', 'total = 0', 'with open("sales.txt") as f:', '    for line in f:', '        total += int(line)', 'print(total)'], [
      [7, 'What will it print?', ['210', '408090', '3'], 'Each line becomes a number and is added.', { out: true }],
    ]),
    check('Why use int() after reading?', ['Everything read from a file is text', 'Files are slow', 'int() closes the file', 'It isn’t needed'], 'Like input(), files give text.', 'What type comes back?'),
    truth([
      ['with closes the file for you', true, 'Even after an error.'],
      ['Numbers come back from a file as numbers', false, 'As text.'],
      ['f.write() adds a new line by itself', false, 'Add "\\n" yourself.'],
    ]),
    recap([
      ['🗂', 'One item per line: easy to save and load'],
      ['🔢', 'Turn text back into numbers with int()'],
      ['🚪', 'Always use with'],
    ]),
  ]),

  challenge('p-b-11-ch', 'Module 11 Challenge', { icon: '📁', name: 'File Keeper' }, ['Write and read files', 'Add to files and read them line by line', 'Save and load simple data'], [
    mcq(1, 'Which mode reads a file?', ['"r"', '"w"', '"a"', '"x"'], 'r for read.', { mono: true }),
    mcq(2, 'Which mode empties a file and writes?', ['"w"', '"a"', '"r"', '"e"'], 'w for write.', { mono: true }),
    mcq(3, 'Why use with open(…)?', ['It closes the file for you', 'It is faster', 'It reads numbers', 'It is the only way'], 'Even after an error.'),
    mcq(4, 'What does f.read() give?', ['Text', 'A list of numbers', 'A dictionary', 'Nothing'], 'All the text in the file.'),
    mcq(5, 'How do you go through a file line by line?', ['for line in f:', 'while f:', 'f.lines()', 'for f in line:'], 'A file can be looped over.', { mono: true }),
    swipe([
      ['"a" adds to the end', true, 'Append.'],
      ['"w" keeps the old content', false, 'It empties the file.'],
      ['Files remember after the program ends', true, 'That is what they are for.'],
      ['Values read from a file are numbers', false, 'Text.'],
    ]),
    pairs([['"r"', 'Read'], ['"w"', 'Write fresh'], ['"a"', 'Add to the end'], ['strip()', 'Remove the new-line']], 'File tools.'),
    pickCode('Which adds one order to the end of log.txt?', ['with open("log.txt", "a") as f: f.write("Tea\\n")', 'with open("log.txt", "w") as f: f.write("Tea\\n")', 'open("log.txt").add("Tea")', 'with open("log.txt") as f: f.write("Tea")'], 'Append mode.'),
    bugTask(['with open("log.txt", "w") as f:  # keep old orders', 'with open("order.txt") as f:  # file is orders.txt', 'total += line'], [[1, '"w"', '"a"'], [2, '"order.txt"', '"orders.txt"'], [3, '+= line', '+= int(line)']], 'Append to keep old orders, match the file name, and turn text into numbers.'),
    predictTask(['with open("t.txt", "w") as f:', '    f.write("a\\nb\\n")', 'with open("t.txt", "a") as f:', '    f.write("c\\n")', 'with open("t.txt") as f:', '    print(len(f.readlines()))'], 'What does it print?', ['3', '2', '1', '6'], 'Two lines, then one more added.'),
    arrange(['with open("x.txt", "w") as f:', '    f.write("Tea")', 'print(open("x.txt").read())'], 'open for writing, write, then read it back', ['Tea']),
  ]),
];
