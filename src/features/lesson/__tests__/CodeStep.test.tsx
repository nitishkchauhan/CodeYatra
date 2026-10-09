import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, within } from '@testing-library/react-native';

import { CodeStep } from '../CodeStep';
import type { CodeStep as Step } from '@/content';

// A two-gap HTML exercise: <h1>___</h1><p>___</p>.
const htmlStep: Step = {
  type: 'code',
  kicker: 'HTML',
  title: 'Make a page',
  instructions: 'Fill the heading and the paragraph.',
  lang: 'html',
  file: 'index.html',
  lines: [
    ['<h1>', { gap: 0 }, '</h1>'],
    ['<p>', { gap: 1 }, '</p>'],
  ],
  tokens: ['Namaste', 'Hello', 'World'],
  solution: ['Namaste', 'World'],
  run: (g) => ({
    pass: g[0] === 'Namaste' && g[1] === 'World',
    preview: {
      kind: 'html',
      nodes: [
        { tag: 'h1', text: g[0] },
        { tag: 'p', text: g[1] },
      ],
    },
    checks: [{ label: 'heading says Namaste', ok: g[0] === 'Namaste' }],
  }),
};

const token = (v: string) => screen.getByRole('button', { name: `Use ${v}` });

describe('CodeStep', () => {
  it('will not run until every gap is filled', async () => {
    const run = jest.fn(htmlStep.run);
    await render(<CodeStep step={{ ...htmlStep, run }} onDone={jest.fn()} onMistake={jest.fn()} />);
    const before = run.mock.calls.length; // live preview renders call run()
    expect(screen.getByRole('button', { name: 'Fill every gap first' })).toBeDisabled();
    await fireEvent.press(token('Namaste'));
    expect(screen.getByRole('button', { name: 'Fill every gap first' })).toBeDisabled();
    // Pressing a disabled button must not grade the exercise.
    await fireEvent.press(screen.getByRole('button', { name: 'Fill every gap first' }));
    expect(screen.queryByText(/passing/)).toBeNull();
    expect(run.mock.calls.length).toBeGreaterThan(before);
  });

  it('updates the live preview as each gap is filled, before Run is pressed', async () => {
    await render(<CodeStep step={htmlStep} onDone={jest.fn()} onMistake={jest.fn()} />);
    const preview = () => within(screen.getByLabelText('Live preview'));
    expect(preview().queryByText('Hello')).toBeNull();
    await fireEvent.press(token('Hello'));
    expect(preview().getByText('Hello')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Gap 1: Hello/ })).toBeTruthy();
    await fireEvent.press(token('World'));
    expect(preview().getByText('World')).toBeTruthy();
  });

  it('lets the learner clear a gap and pick again', async () => {
    await render(<CodeStep step={htmlStep} onDone={jest.fn()} onMistake={jest.fn()} />);
    await fireEvent.press(token('Hello'));
    await fireEvent.press(screen.getByRole('button', { name: /Gap 1: Hello/ }));
    expect(screen.getByRole('button', { name: /Gap 1: empty/ })).toBeTruthy();
    await fireEvent.press(token('Namaste'));
    expect(screen.getByRole('button', { name: /Gap 1: Namaste/ })).toBeTruthy();
  });

  it('counts a failed run as a mistake and only offers Finish when tests pass', async () => {
    const onMistake = jest.fn();
    const onDone = jest.fn();
    await render(<CodeStep step={htmlStep} onDone={onDone} onMistake={onMistake} />);
    await fireEvent.press(token('Hello'));
    await fireEvent.press(token('World'));
    await fireEvent.press(screen.getByRole('button', { name: 'Run code' }));
    expect(onMistake).toHaveBeenCalledTimes(1);
    expect(screen.getByText('0 of 1 passing')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Finish/ })).toBeNull();

    await fireEvent.press(screen.getByRole('button', { name: /Gap 1: Hello/ }));
    await fireEvent.press(token('Namaste'));
    await fireEvent.press(screen.getByRole('button', { name: 'Run code' }));
    expect(screen.getByText('1 of 1 passing')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: /Finish/ }));
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onMistake).toHaveBeenCalledTimes(1);
  });
});
