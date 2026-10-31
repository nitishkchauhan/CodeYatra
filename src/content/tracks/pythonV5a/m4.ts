// Python Advanced · Module 4 · Generators and big data. Lesson 4.1 keeps the old module id (py-generators).
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_A_M4: Lesson[] = [
  lesson('py-generators', 'yield: one value at a time', 5, [
    atWork('Felix', ['The station’s log file has 40 million lines. Reading it all into a list fills the server’s memory, and it crashes.', 'A generator hands out one line at a time and never holds them all.']),
    toggleRun('List or generator?', [
      ['List', ['def squares(n):', '    out = []', '    for i in range(n):', '        out.append(i * i)', '    return out', 'print(squares(5))'], 'Builds every value first, all in memory.', ['[0, 1, 4, 9, 16]']],
      ['Generator', ['def squares(n):', '    for i in range(n):', '        yield i * i', 'gen = squares(5)', 'print(next(gen), next(gen), list(gen))'], 'yield hands out one value and pauses until the next one is asked for.', ['0 1 [4, 9, 16]']],
    ]),
    predict('Pause and carry on', ['def countdown(n):', '    while n > 0:', '        yield n', '        n -= 1', 'c = countdown(3)', 'first = next(c)', 'rest = list(c)', 'again = list(c)', 'print(first, rest, again)'], [
      [9, 'What will it print?', ['3 [2, 1] []', '3 [2, 1] [2, 1]', '3 [3, 2, 1] []'], 'next takes the 3, list takes the rest, and then the generator is used up.', { out: true }],
    ]),
    run('A million lines, lazily', 'Pick what to do with the log.', ['def log_lines():', '    for i in range(1, 1_000_001):', '        yield f"line {i}: ERROR" if i % 3 == 0 else f"line {i}: booked"', 'lines = log_lines()', 'print({{v}})'], ['next(lines)', 'next(line for line in lines if "ERROR" in line)', 'sum(1 for line in lines if "ERROR" in line)'], { caption: 'A million lines go past, but only one is in memory at a time.' }),
    check('What does calling a function that contains yield give back?', ['A generator; nothing runs until you ask for a value', 'A list', 'The first value', 'None'], 'The body only runs when next() asks.', 'It is lazy.'),
    tapbug('ValueError: max() arg is an empty sequence', ['gen = (f for f in fares)', 'print(sum(gen))', 'print(max(gen))'], [[1, '(f for f in fares)', '[f for f in fares]']], 'A generator can be used up only once. Keep a list if you need the values twice.'),
    recap([
      ['🚰', 'yield hands out one value at a time'],
      ['💾', 'Generators don’t hold everything in memory'],
      ['1️⃣', 'A generator can be used only once'],
    ]),
  ]),

  lesson('py-a-4-2', 'Generator pipelines', 5, [
    run('A pipeline of generators', 'Pick a final step.', ['log = ["90101 ok 2", "90102 late 1", "90101 ok 3", "90104 late 4"]', 'rows = (line.split() for line in log)', 'late = (r for r in rows if r[1] == "late")', 'seats = (int(r[2]) for r in late)', 'print({{v}})'], ['sum(seats)', 'list(seats)', 'max(seats)', 'next(seats)'], { caption: 'Nothing runs until the last step asks. Then each line flows through all three steps, one at a time.' }),
    explore('How it flows', ['rows = (line.split() for line in log)', 'late = (r for r in rows if r[1] == "late")', 'seats = (int(r[2]) for r in late)', 'total = sum(seats)'], [
      [1, 'Split each line into words, one line at a time.'],
      [2, 'Keep only the late ones.'],
      [3, 'Turn the seat count into a number.'],
      [4, 'sum pulls values through the whole pipeline. Only now does anything run.'],
    ], { minTaps: 3 }),
    predict('Lazy until asked', ['log = ["a 1", "b 2", "c 3"]', 'nums = (int(x.split()[1]) for x in log)', 'first = next(nums)', 'left = sum(nums)', 'print(first, left)'], [
      [3, 'What will first be?', ['1', '6', '3'], 'next takes just the first value.', { var: 'first' }],
      [4, 'What will left be?', ['5', '6', '3'], 'Only 2 and 3 are left.', { var: 'left' }],
    ]),
    check('Why use (x for x in …) instead of [x for x in …] for a huge file?', ['It doesn’t hold every value in memory', 'It is easier to read', 'It sorts the values', 'It can be used many times'], 'Round brackets make a generator.', 'Think about memory.'),
    truth([
      ['A generator expression uses round brackets', true, '(x for x in items)'],
      ['sum(x for x in items) needs extra brackets', false, 'The call’s own brackets are enough.'],
      ['Each step in a pipeline waits until the next step asks', true, 'That is what lazy means.'],
    ]),
    recap([
      ['🔗', 'Chain generators into a pipeline'],
      ['😴', 'Nothing runs until the end asks'],
      ['💾', 'One item in memory at a time'],
    ]),
  ]),

  lesson('py-a-4-3', 'itertools', 5, [
    atWork('Megan', ['The desk wants the first few errors from the log, the bookings grouped by train, and Monday’s and Tuesday’s files read as one.', 'itertools has a tool for each.']),
    run('Tools for streams', 'Pick a tool.', ['from itertools import chain, groupby, islice', 'monday = ["90101", "90102", "90101"]', 'tuesday = ["90104"]', 'print({{v}})'], ['list(chain(monday, tuesday))', 'list(islice(chain(monday, tuesday), 2))', '[(k, len(list(g))) for k, g in groupby(sorted(monday))]', 'list(islice(range(10**12), 3))'], { caption: 'chain joins streams, islice takes the first few (even from a huge range), groupby groups neighbours: sort first!' }),
    matchUp('Which tool?', [['chain', 'Join streams end to end'], ['islice', 'Take the first n'], ['groupby', 'Group neighbours with the same key'], ['count', 'Count up for ever']], 'Small tools that work on any stream.'),
    predict('groupby needs sorting', ['from itertools import groupby', 'trains = ["90101", "90102", "90101"]', 'unsorted = [k for k, g in groupby(trains)]', 'tidy = [k for k, g in groupby(sorted(trains))]', 'print(unsorted, tidy)'], [
      [3, 'What will unsorted be?', ["['90101', '90102', '90101']", "['90101', '90102']", "['90101']"], 'groupby only joins neighbours, so 90101 appears twice.', { var: 'unsorted' }],
      [4, 'What will tidy be?', ["['90101', '90102']", "['90101', '90102', '90101']", "['90102', '90101']"], 'After sorting, equal values sit together.', { var: 'tidy' }],
    ]),
    check('What does list(islice(count(), 3)) give?', ['[0, 1, 2]', '[1, 2, 3]', '[3]', 'It never ends'], 'count() goes on for ever, but islice stops after 3.', 'islice takes the first few.', { mono: true }),
    tapbug('groupby splits 90101 into two groups', ['for train, rows in groupby(bookings, key=get_train):'], [[1, 'groupby(bookings,', 'groupby(sorted(bookings, key=get_train),']], 'groupby only joins neighbours. Sort by the same key first.'),
    recap([
      ['⛓', 'chain joins streams'],
      ['✂️', 'islice takes the first few'],
      ['🗂', 'groupby needs sorted input'],
    ]),
  ]),

  challenge('py-a-4-ch', 'Module 4 Challenge', { icon: '🚰', name: 'Stream Master' }, ['Write generators with yield', 'Build lazy pipelines', 'Use itertools on streams'], [
    mcq(1, 'What does yield do?', ['Hands out a value and pauses the function', 'Ends the function', 'Prints a value', 'Makes a list'], 'It carries on from there next time.'),
    mcq(2, 'How many times can a generator be looped over?', ['Once', 'Twice', 'For ever', 'Ten times'], 'Then it is used up.'),
    mcq(3, 'Which is a generator expression?', ['(x * 2 for x in xs)', '[x * 2 for x in xs]', '{x * 2 for x in xs}', 'x * 2 for x in xs'], 'Round brackets.', { mono: true }),
    mcq(4, 'What does islice(stream, 5) give?', ['The first 5 values', 'The 5th value', 'Every 5th value', '5 random values'], 'Like slicing, for streams.'),
    mcq(5, 'Before groupby, you usually…', ['Sort by the same key', 'Reverse the list', 'Make a set', 'Call next()'], 'So equal keys sit together.'),
    swipe([
      ['Generators keep every value in memory', false, 'One at a time.'],
      ['next(gen) gets the next value', true, 'And pauses again.'],
      ['chain joins several streams', true, 'End to end.'],
      ['groupby groups equal values anywhere in the list', false, 'Only neighbours.'],
    ]),
    pairs([['yield', 'Hand out one value'], ['next()', 'Ask for the next'], ['islice', 'The first few'], ['chain', 'Join streams']], 'Stream tools.'),
    pickCode('Which counts ERROR lines without loading the whole file?', ['sum(1 for line in open("log.txt") if "ERROR" in line)', 'len([l for l in open("log.txt").readlines()])', 'open("log.txt").count("ERROR")', 'list(open("log.txt")).index("ERROR")'], 'A file is read line by line, and a generator expression counts.'),
    bugTask(['def countdown(n): return n', 'gen = (f for f in fares)', 'groups = groupby(trains)'], [[1, 'return n', 'yield n'], [2, '(f for f in fares)', '[f for f in fares]'], [3, 'groupby(trains)', 'groupby(sorted(trains))']], 'A generator needs yield, values used twice need a list, and groupby needs sorted input.'),
    predictTask(['def evens(limit):', '    for n in range(0, limit, 2):', '        yield n', 'print(sum(evens(10)))'], 'What does it print?', ['20', '25', '30', '10'], '0 + 2 + 4 + 6 + 8.'),
    arrange(['def squares(n):', '    for i in range(n):', '        yield i * i', 'print(list(squares(4)))'], 'write the generator, then use it', ['[0, 1, 4, 9]']),
  ]),
];
