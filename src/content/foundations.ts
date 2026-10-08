import type { CodeStep, Lesson } from './types';

export const timesTable: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · PYTHON',
  title: 'Print the 5 times table',
  instructions: 'Fill the two gaps so the program prints 5 10 15 20 25.',
  lang: 'python',
  file: 'table.py',
  lines: [
    ['for i in range(1, ', { gap: 0 }, '):'],
    ['    print(5 * ', { gap: 1 }, ')'],
  ],
  tokens: ['6', '5', 'i', '1'],
  solution: ['6', 'i'],
  run: ([stop, factor]) => {
    if (stop === 'i') return { pass: false, error: "NameError: name 'i' is not defined" };
    const output: string[] = [];
    for (let i = 1; i < Number(stop); i++) output.push(String(5 * (factor === 'i' ? i : Number(factor))));
    return { pass: output.join(' ') === '5 10 15 20 25', output };
  },
};

export const FOUNDATIONS_LESSONS: Lesson[] = [
  {
    id: 'f-seq-1',
    title: 'First steps',
    kind: 'lesson',
    minutes: 4,
    skill: 'sequencing',
    learned: ['Programs run top to bottom', 'Each block is one instruction', 'Order changes the result'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · SEQUENCES',
        title: 'Code runs one step at a time',
        body: 'A program is a list of instructions. The computer runs them in order, top to bottom, like directions to a friend’s house.',
        visual: 'sequence',
        code: [
          { lang: 'python', label: 'Python', lines: ['move()', 'move()', 'move()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['move();', 'move();', 'move();'] },
        ],
        tip: 'Order matters: “turn, then move” goes somewhere different from “move, then turn”.',
      },
      {
        type: 'quiz',
        prompt: 'Yatri faces East. Which program moves Yatri exactly 2 tiles East?',
        options: ['move() → move()', 'turn_right() → move()', 'move()', 'turn_left() → move() → move()'],
        mono: true,
        answer: 0,
        right: 'Two moves in a row, with no turns, take Yatri two tiles forward.',
        wrong: 'Count the moves: Yatri needs exactly two, and no turns.',
      },
      { type: 'puzzle', levelId: 'first-steps', task: 'Walk Yatri to the flag' },
    ],
  },
  {
    id: 'f-seq-2',
    title: 'Turn the corner',
    kind: 'lesson',
    minutes: 5,
    skill: 'sequencing',
    learned: ['Turns change direction, not position', 'Right turns go clockwise', 'Pick up items on the way'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · DIRECTIONS',
        title: 'Turn changes where Move goes',
        body: 'Turning does not move Yatri. It changes which way Yatri faces, so the next Move goes in the new direction.',
        visual: 'sequence',
        code: [
          { lang: 'python', label: 'Python', lines: ['move()', 'turn_right()', 'move()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['move();', 'turnRight();', 'move();'] },
        ],
        tip: 'Think of a compass. Turning right goes clockwise: East → South → West → North.',
      },
      {
        type: 'quiz',
        prompt: 'Yatri faces East and runs turn_right(). Which way does Yatri face now?',
        options: ['South', 'North', 'West', 'Still East'],
        answer: 0,
        right: 'Right is clockwise, so East turns into South.',
        wrong: 'Picture a compass: a right turn moves clockwise, East → South.',
      },
      { type: 'puzzle', levelId: 'turn-corner', task: 'Pick up the gem, then reach the flag' },
    ],
  },
  {
    id: 'f-loop-1',
    title: 'Repeat with loops',
    kind: 'lesson',
    minutes: 6,
    skill: 'loops',
    learned: ['Wrap repeated steps in a loop', 'Read for i in range(n)', 'Debug by stepping through a program'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · LOOPS',
        title: 'A loop repeats code for you',
        body: 'Instead of writing the same instruction again and again, put it inside a loop and say how many times.',
        visual: 'loopCompare',
        code: [
          { lang: 'python', label: 'Python', lines: ['for i in range(3):', '    move()'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['for (let i = 0; i < 3; i++) {', '  move();', '}'] },
        ],
        demo: {
          values: [0, 1, 2],
          line: 1,
          caption: (v, r) => `Round ${r} of 3 · i is ${v}, Yatri moves`,
          done: 'Done! move() ran 3 times from one line of code',
        },
        tip: 'In real life: a chai-wala pouring 3 cups repeats the same action 3 times. That’s a loop.',
      },
      {
        type: 'quiz',
        prompt: 'What does this code print?',
        code: { lang: 'python', label: 'Python', lines: ['for i in range(3):', '    print(i * 2)'] },
        options: ['0 2 4', '2 4 6', '0 1 2', 'Error'],
        mono: true,
        answer: 0,
        right: 'range(3) gives 0, 1, 2. Each is doubled, so it prints 0, 2, 4.',
        wrong: 'range(3) starts at 0, not 1. So i is 0, 1, 2 and the output is 0, 2, 4.',
      },
      { type: 'puzzle', levelId: 'gem-row', task: 'Collect 3 gems, then reach the flag' },
      timesTable,
    ],
  },
];
