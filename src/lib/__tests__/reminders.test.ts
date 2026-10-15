import { describe, expect, it } from '@jest/globals';

import { reminderMessage } from '../reminders';

describe('daily reminder text', () => {
  it('speaks to the learner by name, minutes and path', () => {
    const ctx = { name: 'Ananya', minutes: 20, pathTitle: 'Data Analyst' };
    expect(reminderMessage(ctx, 0)).toEqual({ title: 'Ananya, Yatri is waiting for you', body: '20 minutes of code today keeps your streak alive.' });
    expect(reminderMessage(ctx, 1).body).toBe('One lesson closer to becoming a Data Analyst.');
    expect(reminderMessage(ctx, 2).title).toBe('Ananya, your lesson is ready');
  });

  it('still reads well without a name or path', () => {
    expect(reminderMessage({}, 0)).toEqual({ title: 'Yatri is waiting for you', body: 'Five minutes of code today keeps your streak alive.' });
    expect(reminderMessage({ name: '  ' }, 1).body).toBe('One short lesson keeps the yatra going.');
  });
});
