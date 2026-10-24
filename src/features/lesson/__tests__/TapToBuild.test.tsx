import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { PredictOutputStep } from '../PracticeSteps';
import { TweakCode, useTweaks } from '@/components/TapToBuild';
import type { PredictStep } from '@/content';

const predict: PredictStep = {
  type: 'predict',
  kicker: 'QUICK CHECK',
  title: 'What does this print?',
  lang: 'python',
  lines: ['x = 3', 'print(x * 2)'],
  answer: '6',
  explain: '3 × 2 is 6.',
};

describe('predict the output, without a keyboard', () => {
  it('shows choices, not a text box, and accepts the real output', async () => {
    const onMistake = jest.fn();
    await render(<PredictOutputStep step={predict} onDone={jest.fn()} onMistake={onMistake} />);
    expect(screen.queryByLabelText('Your predicted output')).toBeNull();
    expect(screen.getAllByRole('radio').length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole('button', { name: 'Check prediction' })).toBeDisabled();
    await fireEvent.press(screen.getByRole('radio', { name: 'Output: 6' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Check prediction' }));
    expect(screen.getByText('3 × 2 is 6.')).toBeTruthy();
    expect(onMistake).not.toHaveBeenCalled();
  });

  it('counts a wrong pick as a mistake and rules it out on retry', async () => {
    const onMistake = jest.fn();
    await render(<PredictOutputStep step={predict} onDone={jest.fn()} onMistake={onMistake} />);
    const wrong = screen.getAllByRole('radio').find((r) => r.props.accessibilityLabel !== 'Output: 6')!;
    const label = wrong.props.accessibilityLabel as string;
    await fireEvent.press(wrong);
    await fireEvent.press(screen.getByRole('button', { name: 'Check prediction' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: /Try again/ }));
    expect(screen.getByRole('radio', { name: `${label}, ruled out` })).toBeDisabled();
  });
});

function Tinker({ code }: { code: string }) {
  const tweak = useTweaks(code, 'python', 'test');
  return (
    <>
      <TweakCode tweak={tweak} source={code} lang="python" file="main.py" />
      <Text testID="code">{tweak.code}</Text>
    </>
  );
}

describe('tap a value to change it', () => {
  it('swaps a highlighted value for one of its options', async () => {
    await render(<Tinker code={'name = "Asha"\nprint("Namaste,", name)'} />);
    await fireEvent.press(screen.getByRole('button', { name: '"Asha". Tap to change it' }));
    expect(screen.getByText(/Change "Asha" to/)).toBeTruthy();
    const other = screen.getAllByText(/^"(Ravi|Zoya|Kabir|Meera|Arjun)"$/)[0];
    await fireEvent.press(other);
    expect(screen.getByTestId('code').props.children).toMatch(/^name = "(Ravi|Zoya|Kabir|Meera|Arjun)"/);
  });
});
