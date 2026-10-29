import type { CodeStep } from './types';

export const trainCardProps: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · REACT',
  title: 'Pass the right props',
  instructions: 'Fill the gaps so the card reads “Dublin → Jersey · 12 seats left”.',
  lang: 'jsx',
  file: 'App.jsx',
  lines: [
    ['function TrainCard({ from, to, seats }) {'],
    ['  return <p>{from} → {to} · {seats} seats left</p>;'],
    ['}'],
    [''],
    ['<TrainCard from="Dublin"'],
    ['  ', { gap: 0 }, '="Jersey"'],
    ['  seats={', { gap: 1 }, '} />'],
  ],
  tokens: ['to', 'from', '12', 'seats'],
  solution: ['to', '12'],
  run: ([prop, seats]) => {
    if (seats !== '12') return { pass: false, error: `ReferenceError: ${seats} is not defined` };
    if (prop === '12') return { pass: false, error: 'SyntaxError: a prop name cannot start with a number' };
    // A repeated prop name overrides the earlier one, just like in real JSX.
    const from = prop === 'from' ? 'Jersey' : 'Dublin';
    const to = prop === 'to' ? 'Jersey' : undefined;
    const checks = [
      { label: 'Card starts from Dublin', ok: from === 'Dublin' },
      { label: 'Card shows the destination', ok: to === 'Jersey' },
      { label: 'seats is the number 12', ok: true },
    ];
    return { pass: checks.every((c) => c.ok), checks, preview: { kind: 'react', from, to, seats } };
  },
};
