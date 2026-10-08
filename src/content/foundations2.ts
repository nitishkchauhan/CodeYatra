import type { EditorStep, Lesson } from './types';

export const makeAHop: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PYTHON',
  title: 'Make your own block',
  instructions: 'Write a function hop() that returns the text "move move". Then greet(name) should return "Namaste, " followed by the name.',
  lang: 'python',
  file: 'blocks.py',
  starter: 'def hop():\n    # return "move move"\n    pass\n\ndef greet(name):\n    pass\n',
  tests: [
    { call: 'hop()', expect: '"move move"' },
    { call: 'greet("Yatri")', expect: '"Namaste, Yatri"' },
    { call: 'greet("Priya")', expect: '"Namaste, Priya"' },
  ],
  hint: 'Use return, not print. For greet, join two strings with +: "Namaste, " + name',
  solution: 'def hop():\n    return "move move"\n\ndef greet(name):\n    return "Namaste, " + name\n',
};

export const gemCheck: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · PYTHON',
  title: 'Should Yatri pick it up?',
  instructions: 'Finish action(tile). Return "pick" if the tile is "gem", "turn" if it is "rock", otherwise "move".',
  lang: 'python',
  file: 'decide.py',
  starter: 'def action(tile):\n    if tile == "gem":\n        return "pick"\n    # add an elif for "rock"\n    return "move"\n',
  tests: [
    { call: 'action("gem")', expect: '"pick"' },
    { call: 'action("rock")', expect: '"turn"' },
    { call: 'action("grass")', expect: '"move"' },
  ],
  hint: 'Add:  elif tile == "rock":  then on the next line, indented:  return "turn"',
  solution: 'def action(tile):\n    if tile == "gem":\n        return "pick"\n    elif tile == "rock":\n        return "turn"\n    return "move"\n',
};

export const FOUNDATIONS_MORE: Lesson[] = [
  {
    id: 'f-loop-2',
    title: 'Spot the pattern',
    kind: 'lesson',
    minutes: 6,
    skill: 'loops',
    learned: ['Find the part that repeats', 'Put several blocks inside one loop', 'Fewer blocks, same journey'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · PATTERNS',
        title: 'Loops can repeat a whole routine',
        body: 'A staircase is “step forward, step down” again and again. Spot the routine once, put all of it inside a Repeat, and the loop does the rest.',
        visual: 'loopCompare',
        code: [
          { lang: 'python', label: 'Python', lines: ['for i in range(3):', '    move()', '    turn_right()', '    move()', '    turn_left()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['for (let i = 0; i < 3; i++) {', '  move();', '  turnRight();', '  move();', '  turnLeft();', '}'] },
        ],
        tip: 'Ask yourself: what is the smallest piece that, repeated, draws the whole path?',
      },
      {
        type: 'quiz',
        prompt: 'A path goes: move, pick, move, pick, move, pick. What is inside the loop?',
        options: ['move, pick', 'move', 'pick, pick, pick', 'move, move, move'],
        mono: true,
        answer: 0,
        right: 'The routine is “move, pick”. Repeat it 3 times.',
        wrong: 'Look for the smallest chunk that repeats: “move, pick”.',
      },
      { type: 'puzzle', levelId: 'stairs', task: 'Climb the stairs, collect 3 gems, reach the flag' },
    ],
  },
  {
    id: 'f-fn-1',
    title: 'Make your own block',
    kind: 'lesson',
    minutes: 7,
    skill: 'sequencing',
    learned: ['def creates a reusable function', 'return gives a value back', 'Call a function by its name'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · FUNCTIONS',
        title: 'A function is a block you invent',
        body: 'Give a group of steps a name with def. Now you can use that name anywhere, as many times as you like, instead of rewriting the steps.',
        code: [
          { lang: 'python', label: 'Python', lines: ['def hop():', '    move()', '    move()', '', 'hop()', 'hop()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['function hop() {', '  move();', '  move();', '}', '', 'hop();', 'hop();'] },
        ],
        tip: 'Like a chai recipe: write it once, then just say “make chai”.',
      },
      {
        type: 'quiz',
        prompt: 'How many times does move() run?',
        code: { lang: 'python', label: 'Python', lines: ['def hop():', '    move()', '    move()', '', 'hop()', 'hop()', 'hop()'] },
        options: ['6', '3', '2', '0'],
        mono: true,
        answer: 0,
        right: 'hop() runs 3 times and each run moves twice: 3 × 2 = 6.',
        wrong: 'Each call to hop() runs both moves. Three calls × two moves = 6.',
      },
      makeAHop,
    ],
  },
  {
    id: 'f-if-1',
    title: 'If there is a gem…',
    kind: 'lesson',
    minutes: 7,
    skill: 'sequencing',
    learned: ['if runs code only when something is true', 'elif checks another case', '== compares, = assigns'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · CONDITIONS',
        title: 'Programs can make decisions',
        body: 'An if checks a question. When the answer is True, the indented code runs. Add elif and else to handle the other cases.',
        code: [
          { lang: 'python', label: 'Python', lines: ['if tile == "gem":', '    pick_gem()', 'elif tile == "rock":', '    turn_right()', 'else:', '    move()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['if (tile === "gem") {', '  pickGem();', '} else if (tile === "rock") {', '  turnRight();', '} else {', '  move();', '}'] },
        ],
        tip: 'Use == to compare. A single = stores a value in a variable.',
      },
      {
        type: 'quiz',
        prompt: 'tile is "grass". What does Yatri do?',
        code: { lang: 'python', label: 'Python', lines: ['if tile == "gem":', '    pick_gem()', 'else:', '    move()'] },
        options: ['move()', 'pick_gem()', 'Both', 'Nothing'],
        mono: true,
        answer: 0,
        right: '"grass" is not "gem", so the else branch runs: move().',
        wrong: 'The if is False for "grass", so Python skips to else and moves.',
      },
      gemCheck,
    ],
  },
];
