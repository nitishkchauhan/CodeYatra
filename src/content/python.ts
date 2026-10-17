import type { CodeStep } from './types';

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
