import { describe, expect, it } from '@jest/globals';
import { JSDOM } from 'jsdom';

import { allLessons, getLesson, isTeaching, STAGES, type Lesson, type Step } from '..';

// Lesson v5 (the HTML track): every screen gives the learner something to do, and every answer is checked here.
const v5: Lesson[] = allLessons().filter((l) => l.format === 'v5');
const all = v5.flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type) as unknown as [string, Extract<Step, { type: T }>][];
const rows = <R,>(r: R[]): R[] => (r.length ? r : ([['(none)', null]] as unknown as R[]));
const dom = (html: string) => new JSDOM(`<!doctype html><body>${html}</body>`).window.document;

describe('the HTML track (Lesson v5)', () => {
  const track = STAGES.find((s) => s.id === 'html')!;
  it('has 9 modules, each ending with its Challenge', () => {
    expect(track.units).toHaveLength(9);
    for (const u of track.units) {
      const last = getLesson(u.lessons.at(-1)!.id)!;
      expect(last.badge).toBeDefined();
      for (const r of u.lessons) expect(getLesson(r.id)?.format).toBe('v5');
    }
  });

  it.each(v5.filter((l) => !l.badge).map((l) => [l.id, l] as const))('%s: short screens, something to do, a recap at the end', (_, l) => {
    expect(l.steps.length).toBeGreaterThanOrEqual(6);
    expect(l.steps.length).toBeLessThanOrEqual(11);
    expect(l.steps.at(-1)!.type).toBe('recap');
    expect(l.steps.some((s) => !isTeaching(s))).toBe(true);
    expect(l.learned.length).toBeGreaterThanOrEqual(3);
    // Never more than two read-only screens in a row (chat is the only one that is just reading).
    const reading = l.steps.map((s) => s.type === 'chat');
    expect(reading.some((r, i) => r && reading[i + 1] && reading[i + 2])).toBe(false);
  });

  it.each(v5.filter((l) => l.badge).map((l) => [l.id, l] as const))('%s: 5 questions, then the 6 tasks in order', (_, l) => {
    const types = l.steps.map((s) => s.type);
    expect(types.slice(0, 5)).toEqual(['quiz', 'quiz', 'quiz', 'quiz', 'quiz']);
    expect(types.slice(5, 10)).toEqual(['swipe', 'match', 'quiz', 'tapbug', 'xray']);
    expect(['arrange', 'web']).toContain(types[10]);
  });

  it('uses no Hindi words', () => {
    expect(JSON.stringify(v5)).not.toMatch(/\b(namaste|chai|chalo|arre|accha|thali|poha|samosa|roti|sabzi|rajma|chawal|dal|bhai|didi)\b/i);
  });
});

describe('Lesson v5 screens', () => {
  it.each(rows(of('tapbug')))('%s: every bug is really on its line, once', (_, s) => {
    if (!s) return;
    for (const b of s.bugs) {
      const line = s.code[b.line - 1];
      expect(line).toBeDefined();
      expect(line.split(b.text).length - 1).toBe(1);
      expect(b.fix).not.toBe(b.text);
    }
  });

  it.each(rows(of('place')))('%s: one right piece per gap, all of them offered', (_, s) => {
    if (!s) return;
    const gaps = s.lines.flat().filter((g) => typeof g !== 'string').length;
    expect(s.answer).toHaveLength(gaps);
    // A piece may be needed twice (two <br>s), so it must be offered as many times as it is needed.
    const count = (xs: string[], x: string) => xs.filter((y) => y === x).length;
    for (const a of s.answer) expect(count(s.pieces, a)).toBeGreaterThanOrEqual(count(s.answer, a));
  });

  it.each(rows(of('explore')))('%s: notes point at real lines and real parts of the page', (_, s) => {
    if (!s) return;
    const doc = dom((s.page ?? { html: s.code.join('\n') }).html);
    for (const n of s.notes) {
      expect(n.line).toBeGreaterThanOrEqual(1);
      expect(n.line).toBeLessThanOrEqual(s.code.length);
      if (n.select) expect(doc.querySelector(n.select)).not.toBeNull();
    }
  });

  it.each(rows(of('xray')))('%s: every part is on the page and its answer is offered', (_, s) => {
    if (!s) return;
    const doc = dom(s.page.html);
    for (const p of s.parts) {
      expect(doc.querySelector(p.select)).not.toBeNull();
      expect(p.options).toContain(p.answer);
      expect(new Set(p.options).size).toBe(p.options.length);
    }
  });

  it.each(rows(of('live')))('%s: one value to change, at least two to try', (_, s) => {
    if (!s) return;
    expect(s.code.join('\n').split('{{v}}').length - 1).toBe(1);
    expect(new Set(s.choices).size).toBeGreaterThanOrEqual(2);
  });

  it.each(rows(of('toggle')))('%s: at least two versions to switch between', (_, s) => {
    if (!s) return;
    expect(s.views.length).toBeGreaterThanOrEqual(2);
    expect(new Set(s.views.map((v) => v.label)).size).toBe(s.views.length);
  });

  it.each(rows(of('arrange')))('%s: blocks are distinct, so only one order is right', (_, s) => {
    if (!s) return;
    expect(s.blocks.length).toBeGreaterThanOrEqual(3);
    expect(new Set(s.blocks).size).toBe(s.blocks.length);
  });

  it.each(rows(of('swipe')))('%s: a mix of true and false', (_, s) => {
    if (!s) return;
    expect(s.cards.some((c) => c.answer)).toBe(true);
    expect(s.cards.some((c) => !c.answer)).toBe(true);
  });

  it.each(rows(all.filter(([, s]) => s.type === 'quiz')))('%s: distinct options', (_, s) => {
    if (!s || s.type !== 'quiz') return;
    expect(new Set(s.options).size).toBe(s.options.length);
  });
});
