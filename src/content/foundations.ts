import type { CodeStep } from './types';

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
