// JavaScript Intermediate · Module 1 · Working with data.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const BOOKINGS = [
  'const bookings = [',
  '  { id: 1, route: "Harbour", fare: 450, seats: 2 },',
  '  { id: 2, route: "Airport", fare: 300, seats: 1 },',
  '  { id: 3, route: "Harbour", fare: 450, seats: 3 },',
  '  { id: 4, route: "Hillview", fare: 200, seats: 4 },',
  '];',
];

const TRAINS = [
  'const trains = [',
  '  { no: 90101, line: "Harbour", late: false },',
  '  { no: 90102, line: "Harbour", late: true },',
  '  { no: 90104, line: "Airport", late: true },',
  '];',
];

export const JS_I_M1: Lesson[] = [
  lesson('js-i-1-1', 'Pipelines: filter, map, reduce', 5, [
    atWork('Megan', ['Welcome to Brightline Studio! Our new client is City Travel Desk, the ticket counter at City Central station.', 'They want a daily report from their bookings: only the Harbour trips, the money from each, and the total. Loops would work, but there is a neater way.']),
    reveal('Three tools, one job each', [
      ['filter', 'Keeps the items that pass a test. Same items, fewer of them.', '🧹'],
      ['map', 'Turns each item into something new. Same count, new shape.', '🔁'],
      ['reduce', 'Folds the whole list into one value, like a total.', '🧮'],
    ]),
    run('Build the pipeline', 'Pick a pipeline and run it. Can you get the money from Harbour trips only?', [...BOOKINGS, 'console.log({{v}});'], [
      'bookings.filter((b) => b.route === "Harbour").length',
      'bookings.map((b) => b.fare * b.seats)',
      'bookings.filter((b) => b.route === "Harbour").map((b) => b.fare * b.seats)',
      'bookings.map((b) => b.fare * b.seats).reduce((sum, x) => sum + x, 0)',
      'bookings.filter((b) => b.route === "Harbour").map((b) => b.fare * b.seats).reduce((sum, x) => sum + x, 0)',
    ], { goal: '2250', caption: 'Each step hands a new array to the next. Read it left to right: keep, change, add up.' }),
    predict('Step by step', ['const fares = [450, 300, 450, 200];', 'const big = fares.filter((f) => f > 250);', 'const withFee = big.map((f) => f + 20);', 'const total = withFee.reduce((sum, f) => sum + f, 0);', 'console.log(total);'], [
      [2, 'What will big be?', ['[450,300,450]', '[450,450]', '[200]'], 'Three fares are more than 250.', { var: 'big' }],
      [3, 'What will withFee be?', ['[470,320,470]', '[450,300,450]', '[470,470]'], 'map adds 20 to each one and keeps all three.', { var: 'withFee' }],
      [4, 'What will total be?', ['1260', '1200', '940'], '470 + 320 + 470, starting from 0.', { var: 'total' }],
    ]),
    check('Which keeps only the late trains?', ['trains.filter((t) => t.delay > 0)', 'trains.map((t) => t.delay > 0)', 'trains.reduce((t) => t.delay > 0)', 'trains.find((t) => t.delay > 0)'], 'filter keeps every item that passes the test. (find stops at the first one.)', 'Which one keeps some of the items?'),
    tapbug('The total shows [object Object]300…', ['const total = bookings.reduce((sum, b) => sum + b.fare);'], [[1, 'sum + b.fare)', 'sum + b.fare, 0)']], 'Without a starting value, reduce starts with the first booking object, so the “total” turns into text. Start at 0.'),
    recap([
      ['🧹', 'filter keeps the items that pass a test'],
      ['🔁', 'map changes each item'],
      ['🧮', 'reduce folds the list into one value, starting from 0'],
    ]),
  ]),

  lesson('js-i-1-2', 'Sorting without changing the original', 5, [
    atWork('Felix', ['Hi, I’m Felix, I look after the servers. A bug report: after someone sorts the trains by time, the “Recently viewed” list is in the wrong order too.', 'Both lists share one array, and sort() rearranged it for everyone.']),
    toggleRun('sort changes the original', [
      ['sort', ['const times = ["09:15", "07:40", "08:05"];', 'const sorted = times.sort();', 'console.log(times);'], 'sort() rearranges the array itself, so times changed too.', ['["07:40","08:05","09:15"]']],
      ['toSorted', ['const times = ["09:15", "07:40", "08:05"];', 'const sorted = times.toSorted();', 'console.log(times);'], 'toSorted() gives back a sorted copy and leaves times alone.', ['["09:15","07:40","08:05"]']],
      ['Copy, then sort', ['const times = ["09:15", "07:40", "08:05"];', 'const sorted = [...times].sort();', 'console.log(times);'], 'Copying into a new array first also protects the original. Older browsers need this way.', ['["09:15","07:40","08:05"]']],
    ]),
    run('Sort numbers properly', 'Pick a way to sort the fares from cheapest to dearest.', ['const fares = [450, 90, 1200, 300];', 'console.log({{v}});'], ['fares.toSorted()', 'fares.toSorted((a, b) => b - a)', 'fares.toSorted((a, b) => a - b)'], { goal: '[90,300,450,1200]', caption: 'Without a compare function, numbers are sorted as text, so "1200" comes before "300".' }),
    reveal('The compare function', [
      ['(a, b) => a - b', 'Negative: a goes first. Positive: b goes first. Small to big.'],
      ['(a, b) => b - a', 'Big to small.'],
      ['(a, b) => a.name.localeCompare(b.name)', 'Words in A to Z order, the right way for text.'],
      ['toReversed(), with(i, value)', 'More copy-making methods: a reversed copy, and a copy with one item changed.'],
    ], { mono: true }),
    predict('Sort by delay', ['const delays = [5, 0, 12];', 'const order = delays.toSorted((a, b) => b - a);', 'const first = delays[0];', 'console.log(order, first);'], [
      [2, 'What will order be?', ['[12,5,0]', '[0,5,12]', '[5,0,12]'], 'b - a sorts big to small.', { var: 'order' }],
      [3, 'What will first be?', ['5', '12', '0'], 'toSorted made a copy, so delays is still [5, 0, 12].', { var: 'first' }],
    ]),
    check('Which leaves the original array unchanged?', ['fares.toSorted()', 'fares.sort()', 'fares.reverse()', 'fares.splice(0, 1)'], 'toSorted makes a copy. The other three change fares itself.', 'Look for the “to” method.'),
    tapbug('1200 comes before 300', ['const cheapest = fares.toSorted();'], [[1, 'toSorted()', 'toSorted((a, b) => a - b)']], 'Numbers need a compare function, or they are sorted like words.'),
    recap([
      ['🛡', 'toSorted() sorts a copy; sort() changes the original'],
      ['🔢', 'Numbers need (a, b) => a - b'],
      ['🔤', 'Words sort best with localeCompare'],
    ]),
  ]),

  lesson('js-i-1-3', 'Grouping and checking', 5, [
    atWork('Megan', ['The desk manager asks two questions every morning: “How many trains on each line?” and “Is anything late?”', 'One line of JavaScript answers each.']),
    run('Group the trains', 'Pick what to group by.', [...TRAINS, 'const groups = Object.groupBy(trains, {{v}});', 'for (const [key, list] of Object.entries(groups)) {', '  console.log(key + ": " + list.map((t) => t.no).join(", "));', '}'], ['(t) => t.line', '(t) => (t.late ? "Late" : "On time")'], { caption: 'Object.groupBy(list, fn) puts each item in the group named by what fn gives back.' }),
    matchUp('Ask the list a question', [['some', 'Is any train late?'], ['every', 'Are all trains on time?'], ['find', 'Which is the first late train?'], ['Object.groupBy', 'Trains on each line']], 'Each answers a different question.'),
    predict('Any? All?', ['const delays = [0, 12, 0, 5];', 'const anyLate = delays.some((d) => d > 0);', 'const allOnTime = delays.every((d) => d === 0);', 'const none = [].every((d) => d === 0);', 'console.log(anyLate, allOnTime, none);'], [
      [2, 'What will anyLate be?', ['true', 'false', '12'], 'One train with a delay is enough for some.', { var: 'anyLate' }],
      [3, 'What will allOnTime be?', ['false', 'true', '0'], 'Two trains are late, so not every one is on time.', { var: 'allOnTime' }],
      [4, 'An empty list. What will none be?', ['true', 'false', 'undefined'], 'No item failed the test, so every says true. Check the length when that matters.', { var: 'none' }],
    ]),
    truth([
      ['Object.groupBy changes the original array', false, 'It builds a new object of groups.'],
      ['some stops looking at the first item that passes', true, 'It has its answer, so it stops.'],
      ['[].every(…) is true', true, 'Nothing failed. Check the length if “no trains” should mean “no”.'],
    ]),
    tapbug('It says every train is late', ['const allLate = trains.some((t) => t.late);'], [[1, 'some', 'every']], 'some is true when any one train is late. To ask about all of them, use every.'),
    recap([
      ['🗂', 'Object.groupBy(list, fn) makes groups'],
      ['❓', 'some: is any? every: are all?'],
      ['📭', 'Empty lists: every is true, some is false'],
    ]),
  ]),

  challenge('js-i-1-ch', 'Module 1 Challenge', { icon: '🧮', name: 'Data Shaper' }, ['Chain filter, map and reduce', 'Sort copies, with the right compare function', 'Group lists and ask them questions'], [
    mcq(1, 'What does map give back?', ['A new array, the same length', 'One value', 'Fewer items', 'Nothing'], 'One new item for each old one.'),
    mcq(2, 'Which turns a list into one total?', ['reduce', 'map', 'filter', 'some'], 'reduce folds the list into one value.', { mono: true }),
    mcq(3, 'With no compare function, how does sort put 300 and 1200 in order?', ['As text: 1200 first', 'Small to big: 300 first', 'Big to small', 'It throws an error'], '"1" comes before "3" in text order.'),
    mcq(4, 'Which makes a sorted copy?', ['toSorted()', 'sort()', 'reverse()', 'fill()'], 'The “to” methods make copies.', { mono: true }),
    mcq(5, 'What does [].every((x) => x > 0) give?', ['true', 'false', 'undefined', 'An error'], 'No item failed the test.', { mono: true }),
    swipe([
      ['filter can change how many items there are', true, 'It keeps only the ones that pass.'],
      ['map can change how many items there are', false, 'Always one out for each one in.'],
      ['sort() leaves the original alone', false, 'It changes it. Use toSorted.'],
      ['Object.groupBy gives an object of arrays', true, 'One array per group.'],
    ]),
    pairs([['filter', 'Keep some'], ['map', 'Change each'], ['reduce', 'Fold into one'], ['toSorted', 'A sorted copy']], 'The data tools.'),
    pickCode('Which gives the total fares from Harbour bookings?', ['bookings.filter((b) => b.route === "Harbour").reduce((s, b) => s + b.fare, 0)', 'bookings.map((b) => b.route === "Harbour").reduce((s, b) => s + b.fare)', 'bookings.reduce((b) => b.route === "Harbour")', 'bookings.filter("Harbour").sum()'], 'Filter first, then add up from 0.'),
    bugTask(['const sorted = fares.sort((a, b) => a - b);', 'const names = trains.map((t) => { t.name });', 'const anyLate = trains.every((t) => t.delay > 0);'], [[1, 'fares.sort', 'fares.toSorted'], [2, '{ t.name }', 't.name'], [3, 'every', 'some']], 'sort changes the original, curly braces need a return (or leave them out), and “any” is some.'),
    predictTask(['const fares = [450, 300, 200];', 'const total = fares.filter((f) => f >= 300).map((f) => f * 2).reduce((s, f) => s + f, 0);', 'console.log(total);'], 'What does it print?', ['1500', '1900', '950', '750'], '450 and 300 pass; doubled they are 900 and 600; together 1500.'),
    arrange(['const fares = [450, 90, 300];', 'const sorted = fares.toSorted((a, b) => a - b);', 'console.log(sorted.join(" < "));'], 'make the list, sort a copy, then print it', ['90 < 300 < 450']),
  ]),
];
