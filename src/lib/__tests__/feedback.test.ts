import { describe, expect, it } from '@jest/globals';

import { feedbackUrl, SUPPORT_EMAIL } from '../feedback';

describe('feedbackUrl', () => {
  it('opens an email to support with the lesson and app version filled in', () => {
    const url = feedbackUrl('lesson p-loop-1');
    expect(url.startsWith(`mailto:${SUPPORT_EMAIL}?subject=`)).toBe(true);
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('subject')).toBe('CodeYatra feedback: lesson p-loop-1');
    expect(params.get('body')).toMatch(/App \S+ · \w+ .* · lesson p-loop-1/);
  });

  it('works without a topic', () => {
    expect(new URLSearchParams(feedbackUrl().split('?')[1]).get('subject')).toBe('CodeYatra feedback');
  });
});
