import { timesTable } from './foundations';
import type { CodeStep, Lesson } from './types';

export const trainFare: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · PYTHON',
  title: 'Train fare calculator',
  instructions: 'Fare is ₹20 for the first 10 km, then ₹2 for every extra km. A 0 km trip is free. Fill the gaps so all tests pass.',
  lang: 'python',
  file: 'fare.py',
  lines: [
    ['def fare(km):'],
    ['    if km == 0:'],
    ['        return ', { gap: 0 }],
    ['    if km <= 10:'],
    ['        return 20'],
    ['    return 20 + (km - 10) * ', { gap: 1 }],
  ],
  tokens: ['0', '2', '10', '20'],
  solution: ['0', '2'],
  run: ([free, perKm]) => {
    const fare = (km: number) => (km === 0 ? Number(free) : km <= 10 ? 20 : 20 + (km - 10) * Number(perKm));
    const cases: [number, number][] = [[0, 0], [5, 20], [15, 30]];
    const checks = cases.map(([km, want]) => {
      const got = fare(km);
      return { label: `fare(${km}) == ${want}${got === want ? '' : `  (got ${got})`}`, ok: got === want };
    });
    return { pass: checks.every((c) => c.ok), checks };
  },
};

export const PYTHON_LESSONS: Lesson[] = [
  {
    id: 'p-loop-1',
    title: 'Counting with range()',
    kind: 'lesson',
    minutes: 6,
    skill: 'python',
    learned: ['range(start, stop) stops before stop', 'for runs the body once per number', 'Use the loop variable inside the body'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · PYTHON LOOPS',
        title: 'range() counts for you',
        body: 'range(1, 6) gives the numbers 1, 2, 3, 4, 5. It starts at the first number and stops just before the second.',
        code: [
          { lang: 'python', label: 'Python', lines: ['for i in range(1, 6):', '    print(i)'] },
          { lang: 'javascript', label: 'JavaScript', lines: ['for (let i = 1; i < 6; i++) {', '  console.log(i);', '}'] },
        ],
        demo: {
          values: [1, 2, 3, 4, 5],
          line: 1,
          caption: (v, r) => `Round ${r} of 5 · prints ${v}`,
          done: 'Printed 1 2 3 4 5. The stop value 6 is never reached',
        },
        tip: 'The stop value is never included. range(1, 6) ends at 5.',
      },
      {
        type: 'quiz',
        prompt: 'How many numbers does range(2, 7) produce?',
        code: { lang: 'python', label: 'Python', lines: ['nums = list(range(2, 7))', 'print(len(nums))'] },
        options: ['5', '6', '7', '2'],
        mono: true,
        answer: 0,
        right: '2, 3, 4, 5, 6: five numbers. 7 is the stop, so it is left out.',
        wrong: 'List them: 2, 3, 4, 5, 6. The stop value 7 is not included, so there are 5.',
      },
      timesTable,
    ],
  },
];
