import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { LearnerSheet, type LeagueLearner } from '../LearnerSheet';
import { blockLearner, reportLearner } from '@/lib/moderation';

const mockToast = jest.fn();
jest.mock('@/components/ui/Toast', () => ({ useToast: () => mockToast }));
jest.mock('@/lib/supabase', () => ({ supabase: null }));
jest.mock('@/lib/moderation', () => ({
  ...(jest.requireActual('@/lib/moderation') as object),
  reportLearner: jest.fn(async () => null),
  blockLearner: jest.fn(async () => null),
}));

const learner: LeagueLearner = { user_id: 'u-2', display_name: 'Ravi', week_xp: 240, streak: 5, outfit: null, avatar_url: null };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LearnerSheet', () => {
  it('shows the learner and both actions', async () => {
    await render(<LearnerSheet learner={learner} onClose={jest.fn()} onBlocked={jest.fn()} />);
    expect(screen.getByText('Ravi')).toBeTruthy();
    expect(screen.getByText('240 XP this week')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Report' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Block' })).toBeTruthy();
  });

  it('reports with the chosen reason, thanks the learner and closes', async () => {
    const onClose = jest.fn();
    await render(<LearnerSheet learner={learner} onClose={onClose} onBlocked={jest.fn()} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Report' }));
    expect(screen.getByText(/won’t know it was you/)).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Report: Inappropriate photo' }));
    expect(reportLearner).toHaveBeenCalledWith('u-2', 'photo');
    expect(mockToast).toHaveBeenCalledWith('Thanks. We will review this profile.');
    expect(onClose).toHaveBeenCalled();
  });

  it('asks before blocking, and Cancel blocks nobody', async () => {
    await render(<LearnerSheet learner={learner} onClose={jest.fn()} onBlocked={jest.fn()} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Block' }));
    expect(screen.getByText('Block Ravi?')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(blockLearner).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Report' })).toBeTruthy();
  });

  it('blocks after confirming and removes the learner from the league', async () => {
    const onBlocked = jest.fn();
    await render(<LearnerSheet learner={learner} onClose={jest.fn()} onBlocked={onBlocked} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Block' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Block' }));
    expect(blockLearner).toHaveBeenCalledWith('u-2');
    expect(onBlocked).toHaveBeenCalledWith('u-2');
  });

  it('keeps the sheet open and explains when the report fails', async () => {
    jest.mocked(reportLearner).mockResolvedValueOnce('Could not send the report. Check your connection and try again.');
    const onClose = jest.fn();
    await render(<LearnerSheet learner={learner} onClose={onClose} onBlocked={jest.fn()} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Report' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Report: Spam or fake account' }));
    expect(mockToast).toHaveBeenCalledWith('Could not send the report. Check your connection and try again.');
    expect(onClose).not.toHaveBeenCalled();
  });
});
