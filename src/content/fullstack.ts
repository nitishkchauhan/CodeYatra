import type { CodeStep, Lesson } from './types';

export const trainCardProps: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · REACT',
  title: 'Pass the right props',
  instructions: 'Fill the gaps so the card reads “Delhi → Jaipur · 12 seats left”.',
  lang: 'jsx',
  file: 'App.jsx',
  lines: [
    ['function TrainCard({ from, to, seats }) {'],
    ['  return <p>{from} → {to} · {seats} seats left</p>;'],
    ['}'],
    [''],
    ['<TrainCard from="Delhi"'],
    ['  ', { gap: 0 }, '="Jaipur"'],
    ['  seats={', { gap: 1 }, '} />'],
  ],
  tokens: ['to', 'from', '12', 'seats'],
  solution: ['to', '12'],
  run: ([prop, seats]) => {
    if (seats !== '12') return { pass: false, error: `ReferenceError: ${seats} is not defined` };
    if (prop === '12') return { pass: false, error: 'SyntaxError: a prop name cannot start with a number' };
    // A repeated prop name overrides the earlier one, just like in real JSX.
    const from = prop === 'from' ? 'Jaipur' : 'Delhi';
    const to = prop === 'to' ? 'Jaipur' : undefined;
    const checks = [
      { label: 'Card starts from Delhi', ok: from === 'Delhi' },
      { label: 'Card shows the destination', ok: to === 'Jaipur' },
      { label: 'seats is the number 12', ok: true },
    ];
    return { pass: checks.every((c) => c.ok), checks, preview: { kind: 'react', from, to, seats } };
  },
};

export const FULLSTACK_LESSONS: Lesson[] = [
  {
    id: 'r-comp-1',
    title: 'Components and props',
    kind: 'lesson',
    minutes: 7,
    skill: 'react',
    learned: ['A component is a function that returns UI', 'Props are a component’s inputs', 'One component, many cards'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · REACT',
        title: 'Components are reusable pieces of UI',
        body: 'A React component is a function that returns UI. Props are the inputs you pass in, so one component can show different data.',
        visual: 'componentProps',
        code: [
          {
            lang: 'jsx',
            label: 'React',
            lines: ['function TrainCard({ from, to }) {', '  return <h3>{from} → {to}</h3>;', '}', '', '<TrainCard from="Delhi" to="Agra" />'],
          },
        ],
        tip: 'Same component, different props, different cards. Like one ticket design printed for many trips.',
      },
      {
        type: 'quiz',
        prompt: 'In <TrainCard from="Pune" />, what is from?',
        options: ['A prop', 'A component', 'A CSS class', 'A file name'],
        answer: 0,
        right: 'from is a prop: an input passed into the TrainCard component.',
        wrong: 'TrainCard is the component; from="Pune" passes a prop into it.',
      },
      trainCardProps,
    ],
  },
];
