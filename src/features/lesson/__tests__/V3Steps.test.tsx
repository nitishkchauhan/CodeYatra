import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { GroupStep, MatchStep, ScenarioStep, TraceStep } from '../V3Steps';
import { optionOrder } from '@/content';
import { group, match, scenario, trace } from '@/content/dsl';

jest.mock('@/lib/supabase', () => ({ supabase: null }));
// The live page preview is a native WebView; these tests don't need it.
jest.mock('@/components/WebPreview', () => ({ WebPreview: () => null }));
// The app runs Python in a WebView; here the same program runs with real Python.
jest.mock('@/lib/runner', () => {
  // jest.mock factories can't use imports from the file, so this one is required inline.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { runPyFull } = require('@/content/testing/run');
  const run = async (_lang: string, code: string) => {
    const r = runPyFull(code);
    return { ok: !r.error, output: r.output, error: r.error || undefined };
  };
  return { useCodeRunner: () => run };
});

describe('watch it run', () => {
  const step = trace({
    kicker: 'WATCH IT RUN',
    title: 'Boxes',
    instructions: 'Step through it.',
    code: ['a = 2', 'b = a * 3', 'print(b)'],
    ask: { prompt: 'What is b?', options: ['6', '5'], answer: 0, explain: '2 × 3 is 6.', check: { var: 'b' } },
  });

  it('steps line by line, then asks the question at the end', async () => {
    const onMistake = jest.fn();
    await render(<TraceStep step={step} onDone={jest.fn()} onMistake={onMistake} />);
    await waitFor(() => expect(screen.getByText(/Step 1 of 4/)).toBeTruthy(), { timeout: 15000 });
    expect(screen.getByRole('button', { name: 'Step to the end to continue' })).toBeDisabled();
    for (let i = 0; i < 3; i++) await fireEvent.press(screen.getByRole('button', { name: 'Next step' }));
    expect(screen.getByText('Finished')).toBeTruthy();
    expect(screen.getAllByText('6').length).toBeGreaterThan(0);
    await fireEvent.press(screen.getAllByRole('radio')[1]);
    await fireEvent.press(screen.getByRole('button', { name: 'Check' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    await fireEvent.press(screen.getAllByRole('radio')[0]);
    await fireEvent.press(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByText('2 × 3 is 6.')).toBeTruthy();
  }, 30000);
});

describe('match the pairs', () => {
  const step = match({ kicker: 'CHECK', title: 'Match', instructions: 'Tap pairs.', pairs: [['a', '1'], ['b', '2'], ['c', '3']], explain: 'All done.' });

  it('locks a right pair, counts a wrong one, and finishes when all are matched', async () => {
    const onMistake = jest.fn();
    await render(<MatchStep step={step} onDone={jest.fn()} onMistake={onMistake} />);
    await fireEvent.press(screen.getByRole('button', { name: 'a' }));
    await fireEvent.press(screen.getByRole('button', { name: '2' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    for (const [l, r] of step.pairs) {
      await fireEvent.press(screen.getByRole('button', { name: l }));
      await fireEvent.press(screen.getByRole('button', { name: r }));
    }
    expect(screen.getByText('All done.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });
});

describe('sort into groups', () => {
  const step = group({
    kicker: 'CHECK',
    title: 'Sort',
    instructions: 'Sort them.',
    groups: ['Even', 'Odd'],
    items: [
      { text: '2', group: 0 },
      { text: '3', group: 1 },
      { text: '4', group: 0 },
      { text: '7', group: 1 },
    ],
    explain: 'Sorted.',
  });

  it('accepts the right group, counts a wrong one, and finishes', async () => {
    const onMistake = jest.fn();
    await render(<GroupStep step={step} onDone={jest.fn()} onMistake={onMistake} />);
    // Items come one at a time, in the same shuffled order the step uses.
    const order = optionOrder(step.title + step.items.map((x) => x.text).join('|'), step.items.length);
    const first = step.items[order[0]];
    await fireEvent.press(screen.getByRole('button', { name: `Put it in ${step.groups[1 - first.group]}` }));
    for (const i of order) await fireEvent.press(screen.getByRole('button', { name: `Put it in ${step.groups[step.items[i].group]}` }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Sorted.')).toBeTruthy();
  });
});

describe('a work scenario', () => {
  it('shows who is asking, the artifact and the task', async () => {
    const onDone = jest.fn();
    await render(
      <ScenarioStep
        step={scenario({ kicker: 'AT WORK', title: 'A bug report', from: 'Priya · team lead', message: 'The totals are wrong.', artifact: { kind: 'log', title: 'server.log', lines: ['ERROR: total mismatch'] }, task: 'Fix the total.' })}
        onDone={onDone}
      />,
    );
    expect(screen.getByText('Priya · team lead')).toBeTruthy();
    expect(screen.getByText('ERROR: total mismatch')).toBeTruthy();
    expect(screen.getByText('Fix the total.')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: "Let's do it" }));
    expect(onDone).toHaveBeenCalled();
  });
});
