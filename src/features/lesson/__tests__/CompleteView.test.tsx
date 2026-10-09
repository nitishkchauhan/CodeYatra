import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { CompleteView } from '../CompleteView';
import { sendFeedback } from '@/lib/feedback';

const mockToast = jest.fn();
jest.mock('@/components/ui/Toast', () => ({ useToast: () => mockToast }));
jest.mock('@/lib/feedback', () => ({ SUPPORT_EMAIL: 'codeyatra.support@gmail.com', sendFeedback: jest.fn(async () => true) }));

const props = {
  title: 'Lesson complete!',
  subtitle: 'Loops · Well done!',
  xp: 30,
  coins: 15,
  accuracy: 100,
  seconds: 95,
  learned: ['for loops repeat code'],
  streak: 3,
  streakNote: 'Keep it going tomorrow',
  onContinue: jest.fn(),
  onReplay: jest.fn(),
};

describe('CompleteView feedback link', () => {
  it('emails support about this lesson', async () => {
    await render(<CompleteView {...props} feedbackAbout="lesson p-loop-1" />);
    await fireEvent.press(screen.getByText('Something wrong in this lesson? Tell us'));
    expect(sendFeedback).toHaveBeenCalledWith('lesson p-loop-1');
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('shows the email address when the phone has no email app', async () => {
    jest.mocked(sendFeedback).mockResolvedValueOnce(false);
    await render(<CompleteView {...props} feedbackAbout="lesson p-loop-1" />);
    await fireEvent.press(screen.getByText('Something wrong in this lesson? Tell us'));
    expect(mockToast).toHaveBeenCalledWith('Email us at codeyatra.support@gmail.com');
  });

  it('is hidden when no topic is given', async () => {
    await render(<CompleteView {...props} />);
    expect(screen.queryByText(/Something wrong/)).toBeNull();
  });
});
