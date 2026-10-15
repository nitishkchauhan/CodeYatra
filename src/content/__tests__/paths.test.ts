import { describe, expect, it } from '@jest/globals';

import { getLesson } from '..';
import { markKey, nextModule, PATHS, pathSummary, stopStatus, type CareerPath } from '../paths';
import { INITIAL, mergeProgress } from '@/state/model';

const at = '2026-10-13';
const done = (...ids: string[]) => Object.fromEntries(ids.map((id) => [id, { xp: 25, accuracy: 100, at }]));

describe('every career path', () => {
  it.each(PATHS.map((p) => [p.id, p] as const))('%s is well formed', (_, path) => {
    const stops = path.sections.flatMap((s) => s.stops);
    expect(stops.length).toBeGreaterThan(5);
    expect(new Set(stops.map((s) => s.id)).size).toBe(stops.length);
    expect(path.job.length).toBeGreaterThan(40);
    for (const s of stops) {
      expect(s.why.length).toBeGreaterThan(20);
      // Every stop gives the learner somewhere to go: a CodeYatra lesson or a free link.
      expect((s.modules?.length ?? 0) + (s.links?.length ?? 0)).toBeGreaterThan(0);
      for (const m of s.modules ?? []) expect(getLesson(m)).toBeDefined();
      for (const l of s.links ?? []) expect(l.url).toMatch(/^https:\/\//);
    }
    // A choice needs at least two options.
    const choices = stops.filter((s) => s.choice).map((s) => s.choice);
    for (const c of new Set(choices)) expect(choices.filter((x) => x === c).length).toBeGreaterThanOrEqual(2);
  });
});

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('path colours are readable', () => {
  it.each(PATHS.map((p) => [p.id, p] as const))('%s: white on ink and ink on soft meet WCAG AA', (_, path) => {
    expect(contrast('#FFFFFF', path.ink)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(path.ink, path.soft)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(path.ink, '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
  });
});

const sample: CareerPath = {
  id: 'demo',
  title: 'Demo',
  tagline: 'A demo path',
  job: 'Shows how path progress is counted for tests.',
  months: '1 month',
  icon: '',
  color: '#000000',
  ink: '#000000',
  soft: '#FFFFFF',
  sections: [
    {
      title: 'One',
      stops: [
        { id: 'a', title: 'A', why: 'First stop', modules: ['m1', 'm2'] },
        { id: 'opt', title: 'Optional', why: 'Nice to have', links: [{ label: 'x', url: 'https://x', kind: 'docs' }], optional: true },
        { id: 'r', title: 'React', why: 'A framework', modules: ['m3'], choice: 'Framework' },
        { id: 'v', title: 'Vue', why: 'A framework', links: [{ label: 'x', url: 'https://x', kind: 'docs' }], choice: 'Framework' },
        { id: 'z', title: 'Z', why: 'Last stop', links: [{ label: 'x', url: 'https://x', kind: 'docs' }] },
      ],
    },
  ],
};

describe('path progress', () => {
  it('a stop is in progress until all its lessons are done', () => {
    const stop = sample.sections[0].stops[0];
    expect(stopStatus('demo', stop, {}, {})).toBe('todo');
    expect(stopStatus('demo', stop, done('m1'), {})).toBe('progress');
    expect(stopStatus('demo', stop, done('m1', 'm2'), {})).toBe('done');
  });

  it('a stop the learner already knows counts as done', () => {
    expect(stopStatus('demo', sample.sections[0].stops[4], {}, { [markKey('demo', 'z')]: at })).toBe('done');
  });

  it('counts required stops only, and a choice once', () => {
    // Required: a, Framework (r or v), z = 3. The optional stop never counts.
    expect(pathSummary(sample, {}, {})).toMatchObject({ pct: 0, done: 0, total: 3 });
    expect(pathSummary(sample, done('m1', 'm2'), {})).toMatchObject({ done: 1, total: 3, pct: 33 });
    // Finishing either framework finishes the choice.
    expect(pathSummary(sample, done('m1', 'm2'), { [markKey('demo', 'v')]: at })).toMatchObject({ done: 2, pct: 67 });
  });

  it('the next stop skips optional stops and finished choices', () => {
    expect(pathSummary(sample, {}, {}).next?.id).toBe('a');
    expect(pathSummary(sample, done('m1', 'm2'), {}).next?.id).toBe('r');
    expect(pathSummary(sample, done('m1', 'm2', 'm3'), {}).next?.id).toBe('z');
    expect(pathSummary(sample, done('m1', 'm2', 'm3'), { [markKey('demo', 'z')]: at }).next).toBeNull();
  });

  it('opens the first unfinished lesson of a stop', () => {
    expect(nextModule(sample.sections[0].stops[0], done('m1'))).toBe('m2');
    expect(nextModule(sample.sections[0].stops[0], done('m1', 'm2'))).toBe('m1');
    expect(nextModule(sample.sections[0].stops[4], {})).toBeNull();
  });

  it('keeps ticks from both phones when progress syncs', () => {
    const phone = { ...INITIAL, pathId: 'frontend', pathMarks: { 'frontend/web': at }, updatedAt: 2 };
    const cloud = { ...INITIAL, pathId: 'backend', pathMarks: { 'frontend/git': at }, updatedAt: 1 };
    const merged = mergeProgress(phone, cloud);
    expect(merged.pathMarks).toEqual({ 'frontend/web': at, 'frontend/git': at });
    expect(merged.pathId).toBe('frontend');
  });
});
