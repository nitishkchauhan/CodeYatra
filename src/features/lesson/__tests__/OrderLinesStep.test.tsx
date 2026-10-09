import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { OrderLinesStep } from '../PracticeSteps';
import type { OrderStep } from '@/content';

const step: OrderStep = {
  type: 'order',
  kicker: 'Python',
  title: 'Count to three',
  instructions: 'Put the lines in order.',
  lang: 'python',
  lines: ['for i in range(3):', '    print(i)', "print('done')"],
  output: ['0', '1', '2', 'done'],
  explain: 'The loop runs first, then the last line.',
};

const add = (line: string) => screen.getByRole('button', { name: `Add line: ${line}` });

describe('OrderLinesStep', () => {
  it('keeps Check disabled until every line is placed', async () => {
    await render(<OrderLinesStep step={step} onDone={jest.fn()} onMistake={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Place 3 more lines' })).toBeDisabled();
    await fireEvent.press(add('for i in range(3):'));
    expect(screen.getByRole('button', { name: 'Place 2 more lines' })).toBeDisabled();
    await fireEvent.press(add('print(i)'));
    expect(screen.getByRole('button', { name: 'Place 1 more line' })).toBeDisabled();
    await fireEvent.press(add("print('done')"));
    expect(screen.getByRole('button', { name: 'Check order' })).toBeEnabled();
  });

  it('flags a wrong order as a mistake, then accepts the fixed order', async () => {
    const onMistake = jest.fn();
    const onDone = jest.fn();
    await render(<OrderLinesStep step={step} onDone={onDone} onMistake={onMistake} />);
    await fireEvent.press(add("print('done')"));
    await fireEvent.press(add('for i in range(3):'));
    await fireEvent.press(add('print(i)'));
    await fireEvent.press(screen.getByRole('button', { name: 'Check order' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Red lines are in the wrong place/)).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    // Move the misplaced first line back to the pool, then add it at the end.
    await fireEvent.press(screen.getByRole('button', { name: "Line 1: print('done'). Tap to remove" }));
    await fireEvent.press(add("print('done')"));
    await fireEvent.press(screen.getByRole('button', { name: 'Check order' }));
    expect(screen.getByText(step.explain)).toBeTruthy();
    expect(screen.getByText('done')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onMistake).toHaveBeenCalledTimes(1);
  });
});
