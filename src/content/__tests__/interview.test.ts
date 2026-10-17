import { describe, expect, it } from '@jest/globals';

import { getLesson } from '..';
import { INTERVIEW, interviewSession, weakTopics } from '../interview';
import { QUOTES, quoteOfDay } from '../quotes';
import { revisionModules } from '../revision';
import { outputOf } from '../testing/run';

describe('interview questions', () => {
  it('have unique ids, real answers and lessons that exist', () => {
    expect(new Set(INTERVIEW.map((q) => q.id)).size).toBe(INTERVIEW.length);
    for (const q of INTERVIEW) {
      expect(q.answer.length).toBeGreaterThan(60);
      expect(q.why.length).toBeGreaterThan(30);
      expect(q.followUps.length).toBeGreaterThanOrEqual(1);
      expect(q.lessons.length).toBeGreaterThan(0);
      for (const id of q.lessons) expect(getLesson(id)).toBeDefined();
    }
  });

  it.each(INTERVIEW.filter((q) => q.code?.output).map((q) => [q.id, q] as const))('%s: the code really prints the shown output', (_, q) => {
    const out = outputOf(q.code!.lang, q.code!.lines.join('\n'));
    if (out) expect(out).toEqual(q.code!.output);
  });

  it('puts unanswered questions first, then the shaky ones', () => {
    const [a, b, c] = INTERVIEW;
    const session = interviewSession([a, b, c], { [a.id]: { rating: 'knew' }, [b.id]: { rating: 'missed' } }, 3);
    expect(session.map((q) => q.id)).toEqual([c.id, b.id, a.id]);
  });

  it('finds weak topics from self-ratings only', () => {
    const py = INTERVIEW.filter((q) => q.topic === 'python').slice(0, 2);
    const sql = INTERVIEW.find((q) => q.topic === 'sql')!;
    const weak = weakTopics({ [py[0].id]: { rating: 'missed' }, [py[1].id]: { rating: 'knew' }, [sql.id]: { rating: 'knew' } });
    expect(weak).toEqual([{ topic: 'python', shaky: 1, answered: 2 }]);
  });
});

describe('quotes', () => {
  it('name a source for every quote, or are labelled as CodeYatra’s own tips', () => {
    for (const q of QUOTES) expect(q.by === 'CodeYatra tip' || !!q.source).toBe(true);
    expect(QUOTES).toContain(quoteOfDay('2026-10-17'));
    expect(quoteOfDay('2026-10-17')).toBe(quoteOfDay('2026-10-17'));
  });
});

describe('revision list', () => {
  it('comes from saved wrong answers and failed checkpoints only', () => {
    expect(revisionModules({}, {})).toEqual([]);
    const items = revisionModules(
      { 'drill-p-var-1#0': 'd', 'p-var-1#7': 'd', 'p-num-1#6': 'd', 'daily-2026-10-17-python#2': 'd' },
      { a: { pass: false, weak: ['p-if-1'] }, b: { pass: true, weak: ['p-str-1'] } },
    );
    expect(items.map((i) => i.lessonId)).toEqual(['p-var-1', 'p-if-1', 'p-num-1']);
    expect(items[0].reason).toBe('2 wrong answers saved');
    expect(items[1].reason).toBe('missed in a checkpoint');
  });
});
