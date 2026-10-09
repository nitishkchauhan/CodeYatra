import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { QuizStep } from '../QuizStep';
import type { QuizStep as Step } from '@/content';

const step: Step = {
  type: 'quiz',
  prompt: 'Which tag makes a numbered list?',
  options: ['<ol>', '<ul>', '<li>', '<p>'],
  answer: 0,
  right: 'Ordered lists number their items.',
  wrong: '<ul> makes bullets.',
};

const option = (text: string) => screen.getByRole('radio', { name: new RegExp(`: ${text}`) });

describe('QuizStep', () => {
  it('keeps Check disabled until an answer is picked', async () => {
    await render(<QuizStep step={step} onDone={jest.fn()} onMistake={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Check answer' })).toBeDisabled();
    await fireEvent.press(option('<ul>'));
    expect(screen.getByRole('button', { name: 'Check answer' })).toBeEnabled();
  });

  it('lets the learner change their pick before checking', async () => {
    await render(<QuizStep step={step} onDone={jest.fn()} onMistake={jest.fn()} />);
    await fireEvent.press(option('<ul>'));
    await fireEvent.press(option('<ol>'));
    expect(option('<ol>')).toBeChecked();
    expect(option('<ul>')).not.toBeChecked();
  });

  it('does not give away the answer after one wrong try, and rules the wrong pick out', async () => {
    const onMistake = jest.fn();
    await render(<QuizStep step={step} onDone={jest.fn()} onMistake={onMistake} />);
    await fireEvent.press(option('<ul>'));
    await fireEvent.press(screen.getByRole('button', { name: 'Check answer' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Not quite/)).toBeTruthy();
    expect(screen.queryByRole('radio', { name: /correct answer/ })).toBeNull();

    await fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    expect(option('<ul>')).toBeDisabled();
    expect(option('<ol>')).toBeEnabled();
  });

  it('reveals the right answer after two wrong tries so nobody gets stuck', async () => {
    await render(<QuizStep step={step} onDone={jest.fn()} onMistake={jest.fn()} />);
    await fireEvent.press(option('<ul>'));
    await fireEvent.press(screen.getByRole('button', { name: 'Check answer' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Try again' }));
    await fireEvent.press(option('<li>'));
    await fireEvent.press(screen.getByRole('button', { name: 'Check answer' }));
    expect(screen.getByRole('radio', { name: /<ol>, correct answer/ })).toBeTruthy();
  });

  it('counts a double tap on Check as one mistake', async () => {
    const onMistake = jest.fn();
    await render(<QuizStep step={step} onDone={jest.fn()} onMistake={onMistake} />);
    await fireEvent.press(option('<p>'));
    const check = screen.getByRole('button', { name: 'Check answer' });
    await fireEvent.press(check);
    await fireEvent.press(check);
    expect(onMistake).toHaveBeenCalledTimes(1);
  });

  it('continues only after a correct answer', async () => {
    const onDone = jest.fn();
    await render(<QuizStep step={step} onDone={onDone} onMistake={jest.fn()} />);
    await fireEvent.press(option('<ol>'));
    await fireEvent.press(screen.getByRole('button', { name: 'Check answer' }));
    expect(screen.getByText('Correct!')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
