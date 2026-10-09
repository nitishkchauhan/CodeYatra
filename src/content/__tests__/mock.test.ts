import { describe, expect, it } from '@jest/globals';

import { buildMock, MOCK_BANK, MOCK_TESTS, type MockQuestion } from '../mockBank';
import { normalizeOutput } from '../helpers';
import { outputOf } from '../testing/run';

/** C snippets without main() run inside one, with the usual headers. */
const program = (q: MockQuestion) => {
  const code = q.code!.join('\n');
  if (q.lang !== 'c' || code.includes('main(')) return code;
  return `#include <stdio.h>\n#include <string.h>\nint main() {\n${code}\nreturn 0;\n}\n`;
};

describe('mock test bank', () => {
  it('has unique ids and four distinct options per question', () => {
    expect(new Set(MOCK_BANK.map((q) => q.id)).size).toBe(MOCK_BANK.length);
    for (const q of MOCK_BANK) expect(new Set(q.options).size).toBe(4);
  });

  it('has enough questions for every test', () => {
    for (const t of MOCK_TESTS) {
      expect(MOCK_BANK.filter((q) => t.topics.includes(q.topic)).length).toBeGreaterThanOrEqual(t.count);
    }
  });

  const verified = MOCK_BANK.filter((q) => q.verify).map((q) => [q.id, q] as const);
  it.each(verified)('%s: the first option is the real output', (_, q) => {
    const out = outputOf(q.lang!, program(q));
    if (out) expect(normalizeOutput(out.join('\n'))).toBe(normalizeOutput(q.options[0]));
  });
});

describe('buildMock', () => {
  it('picks the right number of distinct questions from the right topics', () => {
    let seed = 1;
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const t of MOCK_TESTS) {
      const qs = buildMock(t.kind, random);
      expect(qs).toHaveLength(t.count);
      expect(new Set(qs.map((q) => q.id)).size).toBe(t.count);
      for (const q of qs) expect(t.topics).toContain(q.topic);
    }
  });

  it('spreads a full mock across topics', () => {
    const topics = new Set(buildMock('full').map((q) => q.topic));
    expect(topics.size).toBeGreaterThanOrEqual(8);
  });
});
