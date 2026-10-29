// Logic & Blocks, written to the Lesson v2 standard on 18 Oct 2026, for Class 8 and up.
// The first four modules end with a Yatri block puzzle (solutions are checked by the game tests);
// the rest move into real Python, where every output, error and solution runs in tests.
import { bug, hook, lesson, mistake, order, predict, quiz, read, tryIt } from '../dsl';
import type { EditorStep, Lesson, PuzzleStep, Reading, SkillKey } from '../types';

const LEARN = (n: number) => `LEARN · ${n} OF 3`;
const TRY = 'TRY IT';
const OOPS = 'COMMON MISTAKE';
const CHECK = 'QUICK CHECK';
const REVIEWED = '2026-10-18';

const puzzle = (levelId: string, task: string): PuzzleStep => ({ type: 'puzzle', levelId, task });
const py = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang' | 'file'> & { file?: string }): EditorStep => ({ type: 'editor', kicker: 'YOUR TURN · PYTHON', lang: 'python', file: o.file ?? 'main.py', ...o });
const pydoc = (title: string, page: string): Reading => ({ title, url: `https://docs.python.org/3/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'Python 3' });
const play = (title: string, instructions: string, starter: string, ideas: string[]) => tryIt({ kicker: TRY, title, instructions, lang: 'python', file: 'main.py', starter, ideas });
const v2 = (id: string, title: string, skill: SkillKey, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[], minutes = 6): Lesson => ({
  ...lesson(id, title, skill, learned, steps, minutes),
  reading,
});

// A pretend robot for the try-it steps: each command just prints what Yatri does.
const ROBOT = 'def move():\n    print("Yatri moves forward")\n\ndef turn_right():\n    print("Yatri turns right")\n\ndef pick():\n    print("Yatri picks up a gem")\n\n';

export const LOGIC_FOUNDATIONS: Lesson[] = [
  // 1 ─────────────────────────────────────────────
  v2('f-seq-1', 'Algorithms: step-by-step instructions', 'sequencing', ['An algorithm is a list of clear steps that solve a problem', 'A computer follows steps exactly, in order, one at a time', 'Programs are algorithms written in a language the computer understands'], [
    hook({
      kicker: 'MODULE 1 · LOGIC',
      title: 'Meet Yatri',
      story: 'Yatri the explorer wants to reach the flag, but Yatri only understands exact commands like “move” and “turn right”. Telling a computer what to do works the same way: clear steps, in the right order.',
      goal: 'Write your first algorithm and guide Yatri to the flag.',
    }),
    read({
      kicker: LEARN(1),
      title: 'What is an algorithm?',
      body: 'An algorithm is a set of steps that solves a problem. A recipe for tea is an algorithm: boil water, add tea leaves, add milk and sugar, boil, strain. Each step is clear, and the order matters.',
    }),
    read({
      kicker: LEARN(2),
      title: 'Computers follow exactly',
      body: 'A computer never guesses what you meant. It does each step exactly as written, from the first to the last. If a step is missing or in the wrong place, the result is wrong, even if it looked obvious to you.',
    }),
    read({
      kicker: LEARN(3),
      title: 'From blocks to code',
      body: 'In the puzzles you snap blocks together. Each block is one command. Real programs work the same way, just typed as words. Here is what three Move blocks look like in Python.',
      lang: 'python',
      code: ['move()', 'move()', 'move()'],
    }),
    play('Your first program', 'This is Yatri as a Python program. Press run, then add more steps.', `${ROBOT}move()\nmove()\npick()\n`, ['Add another move()', 'Add turn_right() between the moves', 'Put pick() first: does the story still make sense?']),
    mistake({
      kicker: OOPS,
      title: 'Steps in the wrong order',
      lang: 'python',
      wrong: ['print("Pour the tea")', 'print("Boil the water")', 'print("Add tea leaves")'],
      error: 'Pour the tea\nBoil the water\nAdd tea leaves',
      right: ['print("Boil the water")', 'print("Add tea leaves")', 'print("Pour the tea")'],
      explain: 'The computer did exactly what it was told, in that order. Pouring before boiling makes no sense, so the algorithm was wrong.',
    }),
    quiz({
      prompt: 'Which of these is an algorithm?',
      options: ['The steps to tie your shoelaces', 'A photo of a shoe', 'The colour blue', 'The word “shoe”'],
      right: 'Right. It is a set of steps that solves a problem.',
      wrong: 'An algorithm is a list of steps to get something done.',
    }),
    order({
      kicker: CHECK,
      title: 'Brush your teeth',
      instructions: 'Put the steps in the right order.',
      lang: 'python',
      lines: ['print("Wet the brush")', 'print("Add toothpaste")', 'print("Brush for two minutes")', 'print("Rinse your mouth")'],
      explain: 'Each step depends on the one before it.',
    }),
    puzzle('first-steps', 'Walk Yatri to the flag'),
  ], [pydoc('An informal introduction to Python', 'tutorial/introduction.html')], 5),

  // 2 ─────────────────────────────────────────────
  v2('f-seq-2', 'Turns, direction and order', 'sequencing', ['Turning changes the direction Yatri faces, not the square', 'Plan the route on the board before building it', 'One wrong step changes everything after it'], [
    hook({
      kicker: 'MODULE 2 · LOGIC',
      title: 'Around the corner',
      story: 'The flag isn’t straight ahead this time, and there’s a gem to pick up on the way. You’ll need to turn, and you’ll need to plan before you build.',
      goal: 'Use turns and plan a route with a gem on it.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Turning',
      body: 'Turn Right and Turn Left spin Yatri on the spot, a quarter turn each. They don’t move Yatri at all. Always ask “which way is Yatri facing now?” before the next Move.',
      lang: 'python',
      code: ['move()', 'turn_right()   # same square, new direction', 'move()'],
    }),
    read({
      kicker: LEARN(2),
      title: 'Plan first',
      body: 'Trace the route with your finger before you build: count the squares, note each turn and each gem. Programmers do the same thing by sketching on paper first. Planning saves many failed attempts.',
    }),
    read({
      kicker: LEARN(3),
      title: 'Order matters',
      body: 'Move then turn is not the same as turn then move. Picking up a gem only works when Yatri is standing on it. When something goes wrong, check the steps one at a time from the start.',
      lang: 'python',
      code: ['move()', 'move()', 'pick()        # standing on the gem', 'turn_right()', 'move()'],
    }),
    play('Turning in code', 'Run it, then change the order of the steps.', `${ROBOT}move()\nmove()\npick()\nturn_right()\nmove()\nmove()\n`, ['Swap turn_right() and the move() after it', 'Add a second pick()', 'Write your own route from home to school']),
    mistake({
      kicker: OOPS,
      title: 'Picking up too early',
      lang: 'python',
      wrong: ['gems = 0', 'position = 1', 'if position == 2:', '    gems = gems + 1', 'position = position + 1', 'print("Gems:", gems)'],
      error: 'Gems: 0',
      right: ['gems = 0', 'position = 1', 'position = position + 1', 'if position == 2:', '    gems = gems + 1', 'print("Gems:", gems)'],
      explain: 'Yatri tried to pick up the gem before reaching square 2. Move first, then pick.',
    }),
    quiz({
      prompt: 'Yatri faces East and turns right. Which way is Yatri facing now?',
      options: ['South', 'North', 'West', 'Still East'],
      right: 'Right. A right turn from East points South.',
      wrong: 'Picture it: facing East, a quarter turn to the right faces South.',
    }),
    quiz({
      prompt: 'What does a Turn block do to Yatri’s square?',
      options: ['Nothing: Yatri stays on the same square', 'Moves one square', 'Moves two squares', 'Sends Yatri back to the start'],
      right: 'Right. Turning only changes direction.',
      wrong: 'Turns change the direction, never the square.',
    }),
    puzzle('turn-corner', 'Pick up the gem, then reach the flag'),
  ], [pydoc('An informal introduction to Python', 'tutorial/introduction.html')], 5),

  // 3 ─────────────────────────────────────────────
  v2('f-loop-1', 'Loops: repeat without rewriting', 'loops', ['A loop repeats the blocks inside it', 'Repeat 3 × (move, pick) replaces six blocks', 'In Python: for i in range(3):'], [
    hook({
      kicker: 'MODULE 3 · LOGIC',
      title: 'Gems in a row',
      story: 'Three gems sit in a line. You could write move, pick, move, pick, move, pick, or tell Yatri “do this three times”. Loops are how programmers avoid writing the same thing again and again.',
      goal: 'Spot repetition and replace it with a loop.',
      lang: 'python',
      code: ['for i in range(3):', '    move()', '    pick()'],
    }),
    read({
      kicker: LEARN(1),
      title: 'Spot the repeat',
      body: 'Look for steps that happen again and again in the same order. Move, pick, move, pick, move, pick is the pair “move, pick” three times. Put that pair inside a Repeat block set to 3.',
    }),
    read({
      kicker: LEARN(2),
      title: 'Loops in Python',
      body: 'for i in range(3): repeats the indented lines underneath it three times. The indentation (four spaces) shows which lines are inside the loop. Lines that aren’t indented run once, after the loop.',
      lang: 'python',
      code: ['for i in range(3):', '    print("move")', '    print("pick")', 'print("done")'],
    }),
    read({
      kicker: LEARN(3),
      title: 'Why loops matter',
      body: 'A loop is shorter, easier to read, and easier to change: to collect ten gems instead of three, change one number. Apps loop all the time: over every message in a chat, or every student in a class.',
    }),
    play('Loop it', 'Run it, then change the number of rounds.', `${ROBOT}for i in range(3):\n    move()\n    pick()\nprint("All gems collected!")\n`, ['Make it repeat 5 times', 'Move print("All gems…") inside the loop: what changes?', 'Print the round number with print(i)']),
    mistake({
      kicker: OOPS,
      title: 'Forgetting to indent',
      lang: 'python',
      wrong: ['for i in range(3):', 'print("move")'],
      error: "IndentationError: expected an indented block after 'for' statement on line 1",
      right: ['for i in range(3):', '    print("move")'],
      explain: 'Python needs the lines inside a loop to be indented, so it knows what to repeat.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['for i in range(2):', '    print("hop")', 'print("stop")'],
      answer: 'hop\nhop\nstop',
      explain: 'The indented line runs twice; the last line runs once, after the loop.',
    }),
    quiz({
      prompt: 'Which is shorter for “move, pick” five times?',
      options: ['A Repeat 5 block with move and pick inside', 'Ten separate blocks', 'Five Move blocks', 'It can’t be done'],
      right: 'Right: three blocks instead of ten.',
      wrong: 'A loop holds the repeated pair once and runs it five times.',
    }),
    puzzle('gem-row', 'Collect 3 gems, then reach the flag'),
  ], [pydoc('for statements', 'tutorial/controlflow.html#for-statements')], 6),

  // 4 ─────────────────────────────────────────────
  v2('f-loop-2', 'Patterns and decomposition', 'loops', ['Break a big problem into small steps (decomposition)', 'Find the part that repeats: the pattern', 'Loop the pattern, then add what is left over'], [
    hook({
      kicker: 'MODULE 4 · LOGIC',
      title: 'The staircase',
      story: 'Yatri has to climb a staircase of gems: one step right, one step down, again and again. It looks complicated, but break it into one stair and you’ll see it’s just one small pattern repeated.',
      goal: 'Break a problem into parts and find the repeating pattern.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Decomposition',
      body: 'Decomposition means breaking a big problem into smaller ones you can solve one at a time. Planning a school trip becomes: choose a date, book a bus, collect permission slips. Each part is easier than the whole.',
    }),
    read({
      kicker: LEARN(2),
      title: 'Finding the pattern',
      body: 'Solve the first small piece, say one stair: move, pick, turn right, move, turn left. Then look at the board: does the same piece happen again? If so, that piece goes inside a loop.',
      lang: 'python',
      code: ['for step in range(3):', '    move()', '    pick()', '    turn_right()', '    move()', '    turn_left()'],
    }),
    read({
      kicker: LEARN(3),
      title: 'Leftovers',
      body: 'Real patterns often have a start or an end that doesn’t repeat. Write the loop for the repeating part, then add the extra blocks before or after it. Check the whole route once more at the end.',
    }),
    play('Patterns in text', 'Loops can draw patterns too. Run it and change it.', 'for row in range(1, 5):\n    print("*" * row)\n', ['Make it 6 rows tall', 'Use "#" instead of "*"', 'Make the triangle upside down with range(4, 0, -1)']),
    mistake({
      kicker: OOPS,
      title: 'Looping the wrong piece',
      lang: 'python',
      wrong: ['for i in range(3):', '    print("move")', 'print("pick")'],
      error: 'move\nmove\nmove\npick',
      right: ['for i in range(3):', '    print("move")', '    print("pick")'],
      explain: 'The pattern was “move, pick”, but only move was inside the loop. Everything that repeats must be indented inside it.',
    }),
    quiz({
      prompt: 'Making a sandwich: what is decomposition?',
      options: ['Splitting it into steps: bread, butter, filling, cut', 'Eating it quickly', 'Making ten at once', 'Buying one instead'],
      right: 'Right. Small steps, one at a time.',
      wrong: 'Decomposition breaks a task into smaller steps.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['for i in range(3):', '    print("ab" * 2)'],
      answer: 'abab\nabab\nabab',
      explain: '"ab" * 2 is "abab", printed once in each of three rounds.',
    }),
    puzzle('stairs', 'Climb the staircase: collect every gem and reach the flag'),
  ], [pydoc('for statements', 'tutorial/controlflow.html#for-statements')], 6),

  // 5 ─────────────────────────────────────────────
  v2('f-var-1', 'Variables: labelled boxes', 'sequencing', ['A variable stores a value under a name: gems = 3', 'Assigning again replaces the old value', 'Use variables to calculate: total = price * count'], [
    hook({
      kicker: 'MODULE 5 · LOGIC',
      title: 'Keeping score',
      story: 'Yatri needs to remember how many gems are in the bag. Programs remember things in variables, labelled boxes that hold a value you can read and change.',
      goal: 'Create, change and use variables in Python.',
      lang: 'python',
      code: ['gems = 0', 'gems = gems + 1', 'print(gems)'],
    }),
    read({
      kicker: LEARN(1),
      title: 'Making a variable',
      body: 'gems = 3 puts the value 3 into a box labelled gems. The = sign means “store”, not “equals”. Names can use letters, digits and _, but can’t start with a digit or contain spaces.',
      lang: 'python',
      code: ['gems = 3', 'name = "Yatri"', 'print(name, "has", gems, "gems")'],
    }),
    read({
      kicker: LEARN(2),
      title: 'Changing a variable',
      body: 'Storing a new value replaces the old one. gems = gems + 1 reads the current value, adds 1 and stores the result back. Python runs top to bottom, so the order of these lines matters.',
      lang: 'python',
      code: ['gems = 3', 'gems = gems + 1', 'gems = gems * 2', 'print(gems)   # 8'],
    }),
    read({
      kicker: LEARN(3),
      title: 'Numbers and text',
      body: 'Numbers like 3 and 2.5 can be added and multiplied. Text, called a string, goes in quotes: "Yatri". "3" in quotes is text, not a number. print() can show several values separated by commas.',
      lang: 'python',
      code: ['price = 20', 'count = 3', 'print("Total:", price * count)'],
    }),
    play('Boxes of values', 'Run it, then change the values.', 'gems = 0\nprint("Start:", gems)\ngems = gems + 5\nprint("After the bazaar:", gems)\ngems = gems - 2\nprint("After buying tea:", gems)\n', ['Start with 10 gems', 'Double the gems with gems * 2', 'Add a name variable and print it']),
    mistake({
      kicker: OOPS,
      title: 'Using a box before filling it',
      lang: 'python',
      wrong: ['print(score)', 'score = 10'],
      error: "NameError: name 'score' is not defined",
      right: ['score = 10', 'print(score)'],
      explain: 'Python runs top to bottom, so score didn’t exist yet on the first line. Create a variable before you use it.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['a = 4', 'b = a', 'a = 10', 'print(a, b)'],
      answer: '10 4',
      explain: 'b got a copy of the value 4. Changing a later doesn’t change b.',
    }),
    quiz({
      prompt: 'Which is a valid variable name?',
      options: ['gem_count', '2gems', 'gem count', 'gem-count'],
      right: 'Right.',
      wrong: 'No spaces or dashes, and no digit at the start. Use underscores.',
      mono: true,
    }),
    py({
      title: 'The bazaar bill',
      instructions: 'Write bill(price, count) that returns the total cost, price times count, with a ₹5 bag charge added.',
      starter: 'def bill(price, count):\n    total = price + count\n    return total\n',
      tests: [
        { call: 'bill(20, 3)', expect: '65' },
        { call: 'bill(10, 1)', expect: '15' },
        { call: 'bill(0, 4)', expect: '5' },
      ],
      hint: 'total = price * count + 5',
      solution: 'def bill(price, count):\n    total = price * count + 5\n    return total\n',
    }),
  ], [pydoc('Using Python as a calculator', 'tutorial/introduction.html#using-python-as-a-calculator')], 6),

  // 6 ─────────────────────────────────────────────
  v2('f-if-1', 'Conditions: making decisions', 'sequencing', ['if runs code only when a condition is True', 'else gives another path; elif adds more choices', 'Compare with ==, !=, <, >, <= and >='], [
    hook({
      kicker: 'MODULE 6 · LOGIC',
      title: 'If there is a gem…',
      story: 'Should Yatri pick up something? Only if it’s a gem. Can a student enter the ride? Only if they’re tall enough. Programs make decisions with if.',
      goal: 'Write programs that choose what to do.',
      lang: 'python',
      code: ['if height >= 120:', '    print("Enjoy the ride!")', 'else:', '    print("Sorry, not yet")'],
    }),
    read({
      kicker: LEARN(1),
      title: 'if',
      body: 'if is followed by a condition and a colon. The indented lines below it run only when the condition is True. A condition is a question with a yes or no answer, like gems > 0.',
      lang: 'python',
      code: ['gems = 3', 'if gems > 0:', '    print("Yatri has gems")'],
    }),
    read({
      kicker: LEARN(2),
      title: 'else and elif',
      body: 'else runs when the condition is False. elif (short for “else if”) checks another condition. Python checks from the top and runs only the first matching block, so put the most specific check first.',
      lang: 'python',
      code: ['if marks >= 90:', '    print("Excellent")', 'elif marks >= 50:', '    print("Good")', 'else:', '    print("Keep practising")'],
    }),
    read({
      kicker: LEARN(3),
      title: 'Comparing',
      body: '== asks “is equal to?”; a single = stores a value. != means “not equal”. <, >, <= and >= compare sizes. Combine conditions with and (both true) or or (at least one true).',
      lang: 'python',
      code: ['age = 14', 'print(age == 14, age != 14, age >= 13 and age < 18)'],
    }),
    play('Decisions', 'Run it, then change the height and the age.', 'height = 125\nage = 13\n\nif height >= 120:\n    print("Tall enough for the ride")\nelse:\n    print("Try the small ride")\n\nif age < 5:\n    print("Free entry")\nelif age < 18:\n    print("Student ticket")\nelse:\n    print("Adult ticket")\n', ['Set height to 110', 'Add a senior ticket for age 60 and over', 'Use and to need height and age together']),
    mistake({
      kicker: OOPS,
      title: 'Forgetting the colon',
      lang: 'python',
      wrong: ['gems = 3', 'if gems > 0', '    print("Yatri has gems")'],
      error: "SyntaxError: expected ':'",
      right: ['gems = 3', 'if gems > 0:', '    print("Yatri has gems")'],
      explain: 'Every if, elif and else line ends with a colon.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['x = 7', 'if x > 10:', '    print("big")', 'elif x > 5:', '    print("medium")', 'else:', '    print("small")'],
      answer: 'medium',
      explain: '7 isn’t above 10, but it is above 5.',
    }),
    quiz({
      prompt: 'Which checks whether gems is equal to 5?',
      options: ['gems == 5', 'gems = 5', 'gems === 5', 'gems equals 5'],
      right: 'Right. Two equals signs compare.',
      wrong: 'A single = stores a value. == compares.',
      mono: true,
    }),
    py({
      title: 'The fair ticket',
      instructions: 'Write ticket(age): under 5 pays 0, under 18 pays 50, 60 and over pays 30, everyone else pays 100.',
      starter: 'def ticket(age):\n    if age < 18:\n        return 50\n    else:\n        return 100\n',
      tests: [
        { call: 'ticket(3)', expect: '0' },
        { call: 'ticket(13)', expect: '50' },
        { call: 'ticket(35)', expect: '100' },
        { call: 'ticket(60)', expect: '30' },
        { call: 'ticket(5)', expect: '50' },
      ],
      hint: 'Check age < 5 first, then age < 18, then age >= 60, and return 100 otherwise.',
      solution: 'def ticket(age):\n    if age < 5:\n        return 0\n    elif age < 18:\n        return 50\n    elif age >= 60:\n        return 30\n    else:\n        return 100\n',
    }),
  ], [pydoc('if statements', 'tutorial/controlflow.html#if-statements')], 7),

  // 7 ─────────────────────────────────────────────
  v2('f-while-1', 'While loops: repeat until done', 'loops', ['while repeats as long as its condition is True', 'Something inside must change, or it never stops', 'Use for when you know the count, while when you don’t'], [
    hook({
      kicker: 'MODULE 7 · LOGIC',
      title: 'Keep going until…',
      story: 'Keep walking until you reach the flag. Keep saving until you have ₹500. Sometimes you don’t know how many times to repeat, only when to stop. That is a while loop.',
      goal: 'Write while loops that stop when they should.',
      lang: 'python',
      code: ['money = 0', 'while money < 500:', '    money = money + 100', 'print(money)'],
    }),
    read({
      kicker: LEARN(1),
      title: 'while',
      body: 'while checks a condition before each round. If it is True, the indented lines run and Python checks again. When it becomes False, the loop ends and the program continues below it.',
      lang: 'python',
      code: ['count = 3', 'while count > 0:', '    print(count)', '    count = count - 1', 'print("Go!")'],
    }),
    read({
      kicker: LEARN(2),
      title: 'Make it stop',
      body: 'Something inside the loop must move the condition towards False, like count = count - 1. If nothing changes, the condition stays True forever and the program never ends: an infinite loop.',
    }),
    read({
      kicker: LEARN(3),
      title: 'for or while?',
      body: 'Use for when you know how many times: “three gems”. Use while when you only know when to stop: “until the bag is full” or “until the player types quit”.',
      lang: 'python',
      code: ['for i in range(3):        # exactly 3 times', '    print("pick")', 'n = 100', 'while n > 1:              # until n reaches 1', '    n = n // 2'],
    }),
    play('Saving up', 'Run it, then change the goal and the weekly saving.', 'savings = 0\nweeks = 0\nwhile savings < 500:\n    savings = savings + 120\n    weeks = weeks + 1\nprint("Weeks needed:", weeks)\nprint("Saved:", savings)\n', ['Save ₹50 a week instead', 'Set the goal to ₹1000', 'Print the savings every week']),
    mistake({
      kicker: OOPS,
      title: 'A loop that never ends',
      lang: 'python',
      hang: true,
      note: 'What happens:',
      wrong: ['count = 3', 'while count > 0:', '    print(count)'],
      error: 'It prints 3 forever. count never changes, so count > 0 is always True.',
      right: ['count = 3', 'while count > 0:', '    print(count)', '    count = count - 1'],
      explain: 'Change the variable the condition checks, inside the loop.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['n = 1', 'while n < 20:', '    n = n * 3', 'print(n)'],
      answer: '27',
      explain: 'n goes 1, 3, 9, 27. 27 is not below 20, so the loop stops.',
    }),
    quiz({
      prompt: 'Which situation suits a while loop best?',
      options: ['Ask for a password until it is correct', 'Print the numbers 1 to 10', 'Greet 5 students', 'Draw 3 stars'],
      right: 'Right. You don’t know how many tries it will take.',
      wrong: 'When you know the count, use for. Unknown counts suit while.',
    }),
    py({
      title: 'Halve until one',
      instructions: 'Write halvings(n) that counts how many times you can halve n with // 2 until it reaches 1. halvings(8) is 3 (8 → 4 → 2 → 1).',
      starter: 'def halvings(n):\n    count = 0\n    while n > 1:\n        n = n - 2\n        count = count + 1\n    return count\n',
      tests: [
        { call: 'halvings(8)', expect: '3' },
        { call: 'halvings(1)', expect: '0' },
        { call: 'halvings(10)', expect: '3' },
        { call: 'halvings(1024)', expect: '10' },
      ],
      hint: 'Halving is n = n // 2, not n = n - 2.',
      solution: 'def halvings(n):\n    count = 0\n    while n > 1:\n        n = n // 2\n        count = count + 1\n    return count\n',
    }),
  ], [pydoc('First steps towards programming', 'tutorial/introduction.html#first-steps-towards-programming')], 6),

  // 8 ─────────────────────────────────────────────
  v2('f-nest-1', 'Loops inside loops', 'loops', ['An inner loop runs completely for every round of the outer loop', 'Nested loops make grids, tables and patterns', 'Total rounds = outer × inner'], [
    hook({
      kicker: 'MODULE 8 · LOGIC',
      title: 'Rows and columns',
      story: 'A classroom has rows of benches, and each row has seats. To visit every seat you go row by row, and seat by seat inside each row. That is a loop inside a loop.',
      goal: 'Use nested loops to build grids and tables.',
      lang: 'python',
      code: ['for row in range(3):', '    for seat in range(4):', '        print(row, seat)'],
    }),
    read({
      kicker: LEARN(1),
      title: 'How nesting works',
      body: 'For each round of the outer loop, the inner loop runs from start to finish. With 3 rows and 4 seats, the inner line runs 3 × 4 = 12 times. Indentation shows which loop each line belongs to.',
      lang: 'python',
      code: ['for row in range(1, 4):', '    for seat in range(1, 5):', '        print(f"Row {row} seat {seat}")'],
    }),
    read({
      kicker: LEARN(2),
      title: 'Building a line',
      body: 'To print a grid, build each row as text inside the outer loop, then print it once the inner loop has finished. Here line starts empty and grows with each seat.',
      lang: 'python',
      code: ['for row in range(3):', '    line = ""', '    for seat in range(4):', '        line = line + "# "', '    print(line)'],
    }),
    read({
      kicker: LEARN(3),
      title: 'Tables',
      body: 'Multiplication tables are a classic nested loop: the outer loop picks the number and the inner loop multiplies it by 1 to 10. The inner loop’s variable can use the outer one’s, like range(1, row + 1).',
      lang: 'python',
      code: ['for n in range(2, 4):', '    for i in range(1, 4):', '        print(n, "x", i, "=", n * i)'],
    }),
    play('Grid builder', 'Run it, then change the size.', 'for row in range(4):\n    line = ""\n    for col in range(6):\n        line = line + "*"\n    print(line)\n', ['Make it 2 rows by 10 columns', 'Use range(row + 1) for the inner loop', 'Print row * col instead of *']),
    mistake({
      kicker: OOPS,
      title: 'print in the wrong loop',
      lang: 'python',
      wrong: ['for row in range(2):', '    line = ""', '    for col in range(3):', '        line = line + "#"', '        print(line)'],
      error: '#\n##\n###\n#\n##\n###',
      right: ['for row in range(2):', '    line = ""', '    for col in range(3):', '        line = line + "#"', '    print(line)'],
      explain: 'Indented inside the inner loop, print runs after every #. Dedent it so it runs once per row.',
    }),
    predict({
      kicker: CHECK,
      title: 'How many times?',
      lang: 'python',
      lines: ['count = 0', 'for a in range(3):', '    for b in range(5):', '        count = count + 1', 'print(count)'],
      answer: '15',
      explain: 'The inner loop runs 5 times for each of the 3 outer rounds.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['for i in range(1, 4):', '    line = ""', '    for j in range(i):', '        line = line + str(i)', '    print(line)'],
      answer: '1\n22\n333',
      explain: 'Row i repeats the digit i, i times.',
    }),
    py({
      title: 'A chessboard',
      instructions: 'Write board(rows, cols) that returns a list of strings. Squares alternate "#" and ".", and the top-left square is "#". board(2, 3) is ["#.#", ".#."].',
      starter: 'def board(rows, cols):\n    lines = []\n    for r in range(rows):\n        lines.append("#" * cols)\n    return lines\n',
      tests: [
        { call: 'board(2, 3)', expect: '["#.#", ".#."]' },
        { call: 'board(1, 1)', expect: '["#"]' },
        { call: 'board(3, 4)', expect: '["#.#.", ".#.#", "#.#."]' },
        { call: 'board(0, 5)', expect: '[]' },
      ],
      hint: 'Inside a loop over c, add "#" when (r + c) % 2 == 0, otherwise ".".',
      solution: 'def board(rows, cols):\n    lines = []\n    for r in range(rows):\n        line = ""\n        for c in range(cols):\n            if (r + c) % 2 == 0:\n                line = line + "#"\n            else:\n                line = line + "."\n        lines.append(line)\n    return lines\n',
    }),
  ], [pydoc('for statements', 'tutorial/controlflow.html#for-statements'), pydoc('The range() function', 'tutorial/controlflow.html#the-range-function')], 7),

  // 9 ─────────────────────────────────────────────
  v2('f-fn-1', 'Functions: make your own block', 'sequencing', ['def name(): creates your own command', 'Parameters let a function work with different values', 'return sends an answer back'], [
    hook({
      kicker: 'MODULE 9 · LOGIC',
      title: 'Your own blocks',
      story: 'Yatri does “move, pick” so often that it deserves its own block. Functions let you name a group of steps and use it whenever you like, just like move() and pick() themselves.',
      goal: 'Define functions with parameters and return values.',
      lang: 'python',
      code: ['def greet(name):', '    print("Hello,", name)', '', 'greet("Ava")'],
    }),
    read({
      kicker: LEARN(1),
      title: 'Defining a function',
      body: 'def name(): starts a function, and the indented lines are its steps. Defining it doesn’t run it. Calling it, with name(), runs those steps, as many times as you call it.',
      lang: 'python',
      code: ['def cheer():', '    print("Hip hip")', '    print("Hooray!")', '', 'cheer()', 'cheer()'],
    }),
    read({
      kicker: LEARN(2),
      title: 'Parameters',
      body: 'Parameters are inputs, written in the brackets. greet(name) can greet anyone: greet("Ava"), greet("Reed"). A function can take several parameters, separated by commas.',
      lang: 'python',
      code: ['def greet(name, times):', '    for i in range(times):', '        print("Hello", name)', '', 'greet("Reed", 2)'],
    }),
    read({
      kicker: LEARN(3),
      title: 'return',
      body: 'return sends a value back to wherever the function was called, so you can store it or use it in a calculation. print only shows a value on the screen; return hands it back.',
      lang: 'python',
      code: ['def double(n):', '    return n * 2', '', 'x = double(4) + 1', 'print(x)   # 9'],
    }),
    play('Function lab', 'Run it, then make your own function.', 'def area(length, width):\n    return length * width\n\ndef describe(name, length, width):\n    print(name, "is", area(length, width), "square metres")\n\ndescribe("Classroom", 8, 6)\ndescribe("Playground", 30, 20)\n', ['Add a perimeter function', 'Describe your own room', 'Call area() inside print()']),
    mistake({
      kicker: OOPS,
      title: 'Calling before defining',
      lang: 'python',
      wrong: ['greet()', '', 'def greet():', '    print("Hello")'],
      error: "NameError: name 'greet' is not defined",
      right: ['def greet():', '    print("Hello")', '', 'greet()'],
      explain: 'Python reads from the top. Define a function before the line that calls it.',
    }),
    predict({
      kicker: CHECK,
      title: 'What does this print?',
      lang: 'python',
      lines: ['def add_gems(bag, found):', '    return bag + found', '', 'bag = add_gems(2, 3)', 'bag = add_gems(bag, 4)', 'print(bag)'],
      answer: '9',
      explain: '2 + 3 = 5, then 5 + 4 = 9.',
    }),
    quiz({
      prompt: 'What is the difference between print and return?',
      options: ['print shows a value; return hands it back to the caller', 'They are the same', 'return shows it in red', 'print is faster'],
      right: 'Right.',
      wrong: 'print displays; return gives the value back so it can be used.',
    }),
    py({
      title: 'Your own block',
      instructions: 'Write gems_after(start, trips, per_trip) that returns how many gems Yatri has after the trips, collecting per_trip gems each time.',
      starter: 'def gems_after(start, trips, per_trip):\n    print(start + trips * per_trip)\n',
      tests: [
        { call: 'gems_after(0, 3, 2)', expect: '6' },
        { call: 'gems_after(5, 0, 4)', expect: '5' },
        { call: 'gems_after(1, 2, 10)', expect: '21' },
      ],
      hint: 'Use return instead of print.',
      solution: 'def gems_after(start, trips, per_trip):\n    return start + trips * per_trip\n',
    }),
  ], [pydoc('Defining functions', 'tutorial/controlflow.html#defining-functions')], 7),

  // 10 ────────────────────────────────────────────
  v2('f-debug-1', 'Debugging like a pro', 'sequencing', ['Read the error message: it names the problem and the line', 'Check one line at a time and print values to see inside', 'Bugs are normal; fixing them is a skill'], [
    hook({
      kicker: 'MODULE 10 · LOGIC',
      title: 'Every programmer meets bugs',
      story: 'Even expert programmers write code that doesn’t work the first time. The difference is that they have a calm, step-by-step way to find the problem. That is debugging, and you can learn it too.',
      goal: 'Read error messages and track down bugs step by step.',
    }),
    read({
      kicker: LEARN(1),
      title: 'Read the message',
      body: 'Python’s error message tells you a lot: the line number, and a name like NameError (a misspelt or missing name), SyntaxError (Python can’t read the line) or TypeError (mixing things like text and numbers).',
      lang: 'python',
      code: ['prnt("hello")', "# NameError: name 'prnt' is not defined"],
    }),
    read({
      kicker: LEARN(2),
      title: 'Look inside',
      body: 'When there is no error but the answer is wrong, add print() lines to see what your variables hold at each step. Compare what you see with what you expected. The first difference is where the bug is.',
      lang: 'python',
      code: ['total = 0', 'for n in [3, 4, 5]:', '    total = n          # bug?', '    print("n:", n, "total:", total)'],
    }),
    read({
      kicker: LEARN(3),
      title: 'A calm method',
      body: 'Change one thing at a time, then run again. Explain your code out loud, line by line, to a friend or a rubber duck; you often hear the bug yourself. Once it works, remove the extra print lines.',
    }),
    play('Find the bug', 'This should add up the marks, but the total is wrong. Use the prints to find out why.', 'marks = [40, 35, 50]\ntotal = 0\nfor m in marks:\n    total = m\n    print("m:", m, "total so far:", total)\nprint("Total:", total)\n', ['Fix the line inside the loop', 'Work out the average too', 'Remove the debug print once it works']),
    mistake({
      kicker: OOPS,
      title: 'Mixing text and numbers',
      lang: 'python',
      wrong: ['gems = 5', 'print("Gems: " + gems)'],
      error: 'TypeError: can only concatenate str (not "int") to str',
      right: ['gems = 5', 'print("Gems:", gems)'],
      explain: '+ can’t join text and a number. Use a comma in print, or str(gems).',
    }),
    bug({
      kicker: CHECK,
      title: 'Find the bug',
      instructions: 'This should print 1 to 5. Tap the buggy line.',
      lang: 'python',
      lines: ['for i in range(1, 5):', '    print(i)'],
      bug: 0,
      fix: 'for i in range(1, 6):',
      explain: 'range stops before its end, so it needs 6 to include 5.',
    }),
    quiz({
      prompt: 'Python says NameError: name \'totl\' is not defined. What is the most likely bug?',
      options: ['A spelling mistake: it should be total', 'The computer is broken', 'You need a bigger number', 'Python doesn’t allow variables'],
      right: 'Right. Check the spelling against where you created it.',
      wrong: 'NameError usually means a misspelt or missing name.',
    }),
    py({
      title: 'Fix the average',
      instructions: 'average(marks) should return the average of a list of marks, but it has two bugs. Find and fix them. An empty list gives 0.',
      starter: 'def average(marks):\n    total = 0\n    for m in marks:\n        total = m\n    return total / 3\n',
      tests: [
        { call: 'average([40, 35, 50])', expect: '125 / 3' },
        { call: 'average([10, 20])', expect: '15.0' },
        { call: 'average([7])', expect: '7.0' },
        { call: 'average([])', expect: '0' },
      ],
      hint: 'Add each mark to the total (total = total + m), divide by len(marks), and return 0 when the list is empty.',
      solution: 'def average(marks):\n    if len(marks) == 0:\n        return 0\n    total = 0\n    for m in marks:\n        total = total + m\n    return total / len(marks)\n',
    }),
  ], [pydoc('Errors and exceptions', 'tutorial/errors.html')], 6),
];

/** The project: one last big puzzle, then Yatri’s commands written as a real program. */
export const LOGIC_PROJECT: Lesson = {
  id: 'f-project',
  title: 'Project: Yatri’s Gem Bazaar',
  kind: 'project',
  minutes: 15,
  skill: 'loops',
  learned: ['Planned and solved a big puzzle with loops', 'Wrote a program that runs Yatri’s commands', 'Used variables, loops, conditions and a function together'],
  reading: [pydoc('More control flow tools', 'tutorial/controlflow.html')],
  steps: [
    hook({
      kicker: 'PROJECT · LOGIC',
      title: 'The Gem Bazaar',
      story: 'Five gems, two rocks and a winding route. First solve it with blocks. Then do what the game itself does: write a Python program that follows Yatri’s commands and works out where Yatri ends up.',
      goal: 'Solve the bazaar, then build Yatri’s command runner in Python.',
    }),
    puzzle('bazaar', 'Collect all 5 gems, then reach the flag'),
    py({
      title: 'Yatri’s command runner',
      instructions: 'Write where(commands). commands is a string like "MMRM": M moves one square forward, R turns right, L turns left. Yatri starts at row 0, column 0, facing East (moving East adds 1 to the column, South adds 1 to the row). Return the final (row, column).',
      starter: 'def where(commands):\n    row, col = 0, 0\n    for c in commands:\n        if c == "M":\n            col = col + 1\n    return (row, col)\n',
      tests: [
        { call: 'where("MM")', expect: '(0, 2)' },
        { call: 'where("MRM")', expect: '(1, 1)' },
        { call: 'where("")', expect: '(0, 0)' },
        { call: 'where("LM")', expect: '(-1, 0)' },
        { call: 'where("RRMM")', expect: '(0, -2)' },
        { call: 'where("MRMLMRM")', expect: '(2, 2)' },
      ],
      hint: 'Keep a direction, e.g. 0 = East, 1 = South, 2 = West, 3 = North. R adds 1 and L subtracts 1 (use % 4). For M, change row or col depending on the direction.',
      solution: 'def where(commands):\n    row, col = 0, 0\n    direction = 0  # 0 East, 1 South, 2 West, 3 North\n    for c in commands:\n        if c == "R":\n            direction = (direction + 1) % 4\n        elif c == "L":\n            direction = (direction - 1) % 4\n        elif c == "M":\n            if direction == 0:\n                col = col + 1\n            elif direction == 1:\n                row = row + 1\n            elif direction == 2:\n                col = col - 1\n            else:\n                row = row - 1\n    return (row, col)\n',
    }),
  ],
};
