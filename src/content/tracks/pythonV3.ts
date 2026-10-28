// Python, Lesson v3, Basic level: the 12 Python Foundations modules with animated cards, a
// "watch it run" step after try-it and a match or sort check after the common mistake.
// The original lessons stay in pythonFoundations.ts; this file layers the v3 additions on top.
import { group, match, trace } from '../dsl';
import type { AnimKey, Lesson, Step } from '../types';
import { PYTHON_FOUNDATIONS } from './pythonFoundations';
import { PYTHON_V4 } from './pythonV4';

const RUN = 'WATCH IT RUN';
const CHECK = 'QUICK CHECK';

type Upgrade = {
  /** One per concept card, in order; null keeps a card that already has its own visual or demo. */
  anims: [AnimKey | null, AnimKey | null, AnimKey | null];
  watch: Step;
  check: Step;
};

const UPGRADES: Record<string, Upgrade> = {
  'p-var-1': {
    anims: ['print', null, 'variable'],
    watch: trace({
      kicker: RUN,
      title: 'Watch the boxes fill',
      instructions: 'Tap Next to run one line at a time. Watch each variable appear and change.',
      code: ['price = 12', 'cups = 40', 'total = price * cups', 'cups = cups + 5', 'print("Cups:", cups, "Total:", total)'],
      ask: { prompt: 'What is total at the end?', options: ['480', '540', '45', '12'], answer: 0, explain: 'total was worked out when cups was still 40. Changing cups later does not change total.', check: { var: 'total' } },
    }),
    check: group({
      kicker: CHECK,
      title: 'Text or number?',
      instructions: 'Tap the group each value belongs in.',
      groups: ['Text', 'Number'],
      items: [
        { text: '"Riya"', group: 0 },
        { text: '12', group: 1 },
        { text: '"12"', group: 0 },
        { text: '3.5', group: 1 },
        { text: '"Namaste!"', group: 0 },
        { text: '40', group: 1 },
      ],
      mono: true,
      explain: 'Anything in quotes is text, even "12". Numbers have no quotes.',
    }),
  },
  'p-num-1': {
    anims: ['math', 'math', 'types'],
    watch: trace({
      kicker: RUN,
      title: 'Vans for the school trip',
      instructions: 'Step through it and watch vans and left get their values.',
      code: ['students = 38', 'per_van = 12', 'vans = students // per_van', 'left = students % per_van', 'print(vans, "vans,", left, "left")'],
      ask: { prompt: 'How many students are left for the last van?', options: ['2', '3', '12', '38'], answer: 0, explain: '3 full vans carry 36, so 38 % 12 leaves 2.', check: { var: 'left' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match each sum to its answer',
      instructions: 'Tap a sum, then its answer.',
      pairs: [
        ['7 + 2', '9'],
        ['7 / 2', '3.5'],
        ['7 // 2', '3'],
        ['7 % 2', '1'],
        ['2 ** 3', '8'],
      ],
      mono: true,
      explain: '/ keeps the decimal, // keeps the whole part, % gives the remainder and ** is a power.',
    }),
  },
  'p-str-1': {
    anims: ['string', 'print', 'string'],
    watch: trace({
      kicker: RUN,
      title: 'Tidy up a name',
      instructions: 'Watch clean change as each method runs, then the f-string put it in a sentence.',
      code: ['name = "  asha "', 'clean = name.strip().title()', 'greeting = f"Hi {clean}!"', 'print(greeting, len(clean))'],
      ask: { prompt: 'What is clean?', options: ["'Asha'", "'  asha '", "'ASHA'", "'asha'"], answer: 0, explain: 'strip() removes the spaces and title() makes the first letter a capital.', check: { var: 'clean' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match the code to its result',
      instructions: 'Tap the code, then what it gives.',
      pairs: [
        ['"chai".upper()', "'CHAI'"],
        ['"  hi ".strip()', "'hi'"],
        ['len("Pune")', '4'],
        ['"ab" * 2', "'abab'"],
      ],
      mono: true,
      explain: 'String methods give back a new string; the original never changes.',
    }),
  },
  'p-if-1': {
    anims: ['types', 'branch', 'branch'],
    watch: trace({
      kicker: RUN,
      title: 'Which branch runs?',
      instructions: 'Step through and see which lines Python skips.',
      code: ['marks = 72', 'if marks >= 90:', '    grade = "A"', 'elif marks >= 60:', '    grade = "B"', 'else:', '    grade = "C"', 'print("Grade", grade)'],
      ask: { prompt: 'What is grade at the end?', options: ["'B'", "'A'", "'C'", 'Nothing: no branch ran'], answer: 0, explain: '72 fails the first test and passes the second, so only grade = "B" runs. else is skipped.', check: { var: 'grade' } },
    }),
    check: group({
      kicker: CHECK,
      title: 'True or False?',
      instructions: 'Tap the group for each comparison.',
      groups: ['True', 'False'],
      items: [
        { text: '5 > 3', group: 0 },
        { text: '"a" == "A"', group: 1 },
        { text: '10 == 10.0', group: 0 },
        { text: '3 >= 4', group: 1 },
        { text: '7 != 2', group: 0 },
        { text: 'True and False', group: 1 },
      ],
      mono: true,
      explain: 'Capitals matter in text, 10 and 10.0 are equal numbers, and "and" needs both sides True.',
    }),
  },
  'p-loop-1': {
    anims: [null, 'loop', 'loop'],
    watch: trace({
      kicker: RUN,
      title: 'Add up a bill',
      instructions: 'Watch price take each value in turn and total grow.',
      code: ['total = 0', 'for price in [12, 15, 10]:', '    total = total + price', 'print("Total:", total)'],
      ask: { prompt: 'What is total at the end?', options: ['37', '10', '12', '0'], answer: 0, explain: '0 + 12 + 15 + 10 = 37. The loop body ran once for each price.', check: { var: 'total' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match each range to its numbers',
      instructions: 'Tap a range, then the numbers it gives.',
      pairs: [
        ['range(3)', '0, 1, 2'],
        ['range(1, 4)', '1, 2, 3'],
        ['range(0, 10, 3)', '0, 3, 6, 9'],
        ['range(5, 0, -2)', '5, 3, 1'],
      ],
      mono: true,
      explain: 'range stops before the stop value, and the third number is the step.',
    }),
  },
  'p-while-1': {
    anims: ['whileLoop', 'whileLoop', 'loop'],
    watch: trace({
      kicker: RUN,
      title: 'Halve until small',
      instructions: 'Watch the condition get checked before every round.',
      code: ['n = 40', 'steps = 0', 'while n > 5:', '    n = n // 2', '    steps = steps + 1', 'print(n, steps)'],
      ask: { prompt: 'How many times did the loop body run?', options: ['3', '4', '2', '5'], answer: 0, explain: '40 → 20 → 10 → 5. When n is 5, n > 5 is False, so it stops after 3 rounds.', check: { var: 'steps' } },
    }),
    check: group({
      kicker: CHECK,
      title: 'for or while?',
      instructions: 'Which loop fits each job better?',
      groups: ['for', 'while'],
      items: [
        { text: 'Print each name in a list', group: 0 },
        { text: 'Ask for a PIN until it is right', group: 1 },
        { text: 'Count from 1 to 10', group: 0 },
        { text: 'Keep halving a number until it is below 1', group: 1 },
        { text: 'Add up every price in a bill', group: 0 },
        { text: 'Keep a game running until the player quits', group: 1 },
      ],
      explain: 'Use for when you know what to go through; use while when you repeat until something happens.',
    }),
  },
  'p-loop-2': {
    anims: ['list', 'list', 'loop'],
    watch: trace({
      kicker: RUN,
      title: 'Change a list',
      instructions: 'Watch the list grow and one seat change.',
      code: ['seats = [12, 0, 7]', 'seats.append(3)', 'seats[1] = 5', 'print(seats, len(seats))'],
      ask: { prompt: 'What is seats at the end?', options: ['[12, 5, 7, 3]', '[12, 0, 7, 3]', '[5, 12, 7, 3]', '[12, 5, 7]'], answer: 0, explain: 'append adds 3 at the end, then seats[1] (the second item) becomes 5.', check: { var: 'seats' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match the code to what it does',
      instructions: 'Tap the code, then its meaning.',
      pairs: [
        ['cities[0]', 'the first item'],
        ['cities[-1]', 'the last item'],
        ['len(cities)', 'how many items'],
        ['cities.append(x)', 'add x at the end'],
      ],
      mono: true,
      explain: 'Positions start at 0, and -1 counts from the end.',
    }),
  },
  'p-dict-1': {
    anims: ['dict', 'dict', 'dict'],
    watch: trace({
      kicker: RUN,
      title: 'Update the marks book',
      instructions: 'Watch a new key get added and an old value get replaced.',
      code: ['marks = {"Asha": 91}', 'marks["Ravi"] = 72', 'marks["Asha"] = 95', 'print(marks.get("Zoya", 0), len(marks))'],
      ask: {
        prompt: 'What is marks at the end?',
        options: ["{'Asha': 95, 'Ravi': 72}", "{'Asha': 91, 'Ravi': 72}", "{'Asha': 91, 'Asha': 95, 'Ravi': 72}", "{'Ravi': 72}"],
        answer: 0,
        explain: 'A key appears only once. Storing under "Asha" again replaces 91 with 95.',
        check: { var: 'marks' },
      },
    }),
    check: group({
      kicker: CHECK,
      title: 'List or dictionary?',
      instructions: 'Which fits each job better?',
      groups: ['List', 'Dictionary'],
      items: [
        { text: 'Marks looked up by student name', group: 1 },
        { text: 'Station names in route order', group: 0 },
        { text: 'The price of each menu item', group: 1 },
        { text: 'Today’s orders, in the order they came', group: 0 },
        { text: 'Country → capital', group: 1 },
        { text: 'The top 10 scores', group: 0 },
      ],
      explain: 'A list keeps things in order; a dictionary finds a value by its key.',
    }),
  },
  'p-fn-1': {
    anims: ['function', 'function', 'function'],
    watch: trace({
      kicker: RUN,
      title: 'Step into a function',
      instructions: 'Watch Python jump into fare(), work out the answer and come back.',
      code: ['def fare(km):', '    base = 20', '    return base + km * 2', '', 'a = fare(5)', 'b = fare(10)', 'print(a, b)'],
      ask: { prompt: 'What is b?', options: ['40', '30', '20', '10'], answer: 0, explain: 'fare(10) is 20 + 10 × 2 = 40. base only exists while fare is running.', check: { var: 'b' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match the words',
      instructions: 'Tap a word, then what it means.',
      pairs: [
        ['def', 'starts a function'],
        ['parameter', 'the name for an input'],
        ['argument', 'the value you pass in'],
        ['return', 'sends the answer back'],
      ],
      explain: 'In def fare(km), km is the parameter; in fare(10), 10 is the argument.',
    }),
  },
  'p-err-1': {
    anims: ['error', 'error', 'error'],
    watch: trace({
      kicker: RUN,
      title: 'Watch except take over',
      instructions: 'The first try fails. Step through and see where Python jumps.',
      code: ['seats = "3"', 'try:', '    total = seats * 2 + 1', 'except TypeError:', '    total = int(seats) * 2 + 1', 'print(total)'],
      ask: { prompt: 'What is total at the end?', options: ['7', "'331'", '6', 'An error'], answer: 0, explain: '"3" * 2 is "33", and "33" + 1 is a TypeError, so except runs: int("3") * 2 + 1 = 7.', check: { var: 'total' } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match the code to its error',
      instructions: 'Tap the code, then the error it raises.',
      pairs: [
        ["int('abc')", 'ValueError'],
        ['10 / 0', 'ZeroDivisionError'],
        ['[1, 2][5]', 'IndexError'],
        ["{'a': 1}['b']", 'KeyError'],
        ['print(nam)', 'NameError'],
      ],
      mono: true,
      explain: 'The error’s name tells you what kind of problem it is, which is why you read the last line first.',
    }),
  },
  'p-file-1': {
    anims: ['file', 'file', 'file'],
    watch: trace({
      kicker: RUN,
      title: 'Write, then read back',
      instructions: 'Watch the file get written, then counted line by line.',
      code: ['with open("orders.txt", "w") as f:', '    f.write("chai\\n")', '    f.write("samosa\\n")', 'count = 0', 'with open("orders.txt") as f:', '    for line in f:', '        count = count + 1', 'print(count, "orders")'],
      ask: { prompt: 'What is count at the end?', options: ['2', '1', '0', '3'], answer: 0, explain: 'Two lines were written, and the loop runs once per line.', check: { var: 'count' } },
    }),
    check: group({
      kicker: CHECK,
      title: 'Which mode?',
      instructions: 'Tap the open() mode each job needs.',
      groups: ['"w" write', '"a" add', '"r" read'],
      items: [
        { text: 'Start a fresh report each day', group: 0 },
        { text: 'Add today’s sale to the log', group: 1 },
        { text: 'Load the saved marks', group: 2 },
        { text: 'Keep every past entry and add one more', group: 1 },
        { text: 'Show the saved notes', group: 2 },
        { text: 'Replace the old settings file', group: 0 },
      ],
      explain: '"w" empties the file first, "a" adds to the end, and "r" only reads.',
    }),
  },
  'p-class-1': {
    anims: ['classObject', 'classObject', 'classObject'],
    watch: trace({
      kicker: RUN,
      title: 'Make an object',
      instructions: 'Watch __init__ run when the ticket is made, then the method change it.',
      code: ['class Ticket:', '    def __init__(self, name, seats):', '        self.name = name', '        self.seats = seats', '    def add(self, n):', '        self.seats = self.seats + n', '', 't = Ticket("Asha", 2)', 't.add(1)', 'print(t.name, t.seats)'],
      ask: { prompt: 'What does it print?', options: ['Asha 3', 'Asha 2', 'Ticket 3', 'An error'], answer: 0, explain: 'The object starts with 2 seats and add(1) changes self.seats to 3.', check: { out: true } },
    }),
    check: match({
      kicker: CHECK,
      title: 'Match the words',
      instructions: 'Tap a word, then what it means.',
      pairs: [
        ['class', 'a blueprint for objects'],
        ['__init__', 'runs when an object is made'],
        ['self', 'the object itself'],
        ['t.add(1)', 'calls a method on t'],
      ],
      mono: true,
      explain: 'A class describes; each object made from it has its own values, reached through self.',
    }),
  },
};

/** Adds the v3 pieces to a v2 lesson: animations on the cards, watch-it-run after try-it, a match or sort after the mistake. */
function upgrade(l: Lesson): Lesson {
  const u = UPGRADES[l.id];
  if (!u) return { ...l, level: 'basic' };
  let card = 0;
  const steps: Step[] = [];
  for (const s of l.steps) {
    if (s.type === 'concept') {
      const anim = u.anims[card++];
      steps.push(anim ? { ...s, anim } : s);
    } else steps.push(s);
    if (s.type === 'try') steps.push(u.watch);
    if (s.type === 'mistake') steps.push(u.check);
  }
  return { ...l, level: 'basic', steps, minutes: l.minutes + 2 };
}

// Modules already rebuilt in the Lesson v4 format replace their v3 versions (same ids, so progress is kept).
const V4 = new Map(PYTHON_V4.map((l) => [l.id, l]));
export const PYTHON_BASIC: Lesson[] = PYTHON_FOUNDATIONS.map((l) => V4.get(l.id) ?? upgrade(l));
export const PYTHON_UPGRADED = Object.keys(UPGRADES);
