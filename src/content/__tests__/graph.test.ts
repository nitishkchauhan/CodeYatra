import { describe, expect, it } from '@jest/globals';

import { getLesson } from '..';
import { buildCheckpoint, checkpointId, hasCheckpoint, PASS_MARK, scoreCheckpoint } from '../checkpoints';
import { findPath, findPaths, PATHS, type CareerPath } from '../paths';
import { edges, findStop, needsRevision, nodeState, prerequisites, searchStops, stopLevel, suggestions, unlocks, type Evidence } from '../paths/graph';
import { INITIAL, isReplay, mergeProgress } from '@/state/model';

const at = '2026-10-17';
const done = (...ids: string[]) => Object.fromEntries(ids.map((id) => [id, { xp: 25, accuracy: 100, at }]));
const ev = (o: Partial<Evidence> = {}): Evidence => ({ completed: {}, marks: {}, mistakes: {}, ...o });

const demo: CareerPath = {
  id: 'demo',
  title: 'Demo',
  tagline: 't',
  job: 'A demo path for graph tests.',
  months: '1',
  icon: '',
  color: '#000000',
  ink: '#000000',
  soft: '#FFFFFF',
  level: 'Beginner',
  before: 'Nothing',
  sections: [
    { title: 'One', stops: [{ id: 'a', title: 'Alpha', why: 'first', modules: ['p-var-1'] }, { id: 'opt', title: 'Extra', why: 'optional', modules: ['p-num-1'], optional: true }] },
    {
      title: 'Two',
      stops: [
        { id: 'r', title: 'React', why: 'framework', modules: ['p-str-1'], choice: 'Framework' },
        { id: 'v', title: 'Vue', why: 'framework', modules: ['p-if-1'], choice: 'Framework' },
      ],
    },
    { title: 'Three', stops: [{ id: 'z', title: 'Zed', why: 'last', modules: ['p-loop-1'] }] },
  ],
};

describe('roadmap graph', () => {
  it('builds each section on the required stops of the one before, choices counting once', () => {
    const pre = prerequisites(demo);
    expect(pre.get('a')).toEqual([]);
    expect(pre.get('r')).toEqual([['a']]); // the optional stop is not a prerequisite
    expect(pre.get('z')).toEqual([['r', 'v']]); // either framework will do
    expect(edges(demo)).toContainEqual({ from: 'a', to: 'r' });
    expect(unlocks(demo, 'a').map((s) => s.id)).toEqual(['r', 'v']);
  });

  it('only suggests waiting; it never hides a stop', () => {
    expect(nodeState(demo, findStop(demo, 'a')!, ev())).toBe('available');
    expect(nodeState(demo, findStop(demo, 'r')!, ev())).toBe('early');
    expect(nodeState(demo, findStop(demo, 'r')!, ev({ completed: done('p-var-1') }))).toBe('available');
    expect(nodeState(demo, findStop(demo, 'z')!, ev({ completed: done('p-var-1', 'p-if-1') }))).toBe('available');
    expect(nodeState(demo, findStop(demo, 'a')!, ev({ completed: done('p-var-1') }))).toBe('done');
  });

  it('flags revision only from real evidence', () => {
    const a = findStop(demo, 'a')!;
    expect(needsRevision(a, ev())).toEqual([]);
    expect(needsRevision(a, ev({ mistakes: { 'drill-p-var-1#2': at } }))).toEqual(['p-var-1']);
    expect(needsRevision(a, ev({ checkpoints: { x: { pass: false, weak: ['p-var-1'] } } }))).toEqual(['p-var-1']);
    expect(needsRevision(a, ev({ checkpoints: { x: { pass: true, weak: ['p-var-1'] } } }))).toEqual([]);
  });

  it('finds stops by title, reason or lesson title', () => {
    expect(searchStops(demo, 'react').map((s) => s.id)).toEqual(['r']);
    expect(searchStops(demo, 'what is python').map((s) => s.id)).toEqual(['a']); // p-var-1 is "What is Python?"
    expect(searchStops(demo, '')).toEqual([]);
  });

  it('explains its suggestions, revision first', () => {
    const s = suggestions(demo, ev({ completed: done('p-var-1'), mistakes: { 'p-var-1#7': at } }));
    expect(s[0]).toMatchObject({ stopId: 'a', kind: 'revise' });
    expect(s[0].reason).toContain('What is Python?'); // stop Alpha, lesson What is Python?
    expect(s.some((x) => x.kind === 'next' && x.stopId === 'r')).toBe(true);
  });

  it.each(PATHS.map((p) => [p.id, p] as const))('%s: every prerequisite is a real stop and nothing depends on itself', (_, path) => {
    const ids = new Set(path.sections.flatMap((s) => s.stops.map((x) => x.id)));
    for (const [to, groups] of prerequisites(path)) for (const id of groups.flat()) expect(ids.has(id) && id !== to).toBe(true);
  });

  it('Python Foundations is a single chain from the first program to the project', () => {
    const py = findPath('python')!;
    expect(prerequisites(py).get('numbers')).toEqual([['first']]);
    expect(prerequisites(py).get('project')).toEqual([['classes']]);
  });
});

describe('checkpoints', () => {
  const py = findPath('python')!;

  it('every Python Foundations section with lessons has a checkpoint built from real questions', () => {
    for (const si of [0, 1, 2]) {
      expect(hasCheckpoint(py, si)).toBe(true);
      const c = buildCheckpoint(py, si)!;
      expect(c.steps.length).toBeGreaterThanOrEqual(6);
      expect(c.steps.length).toBeLessThanOrEqual(10);
      // Every question traces back to a real practice step, so mistakes can be reviewed later.
      c.sources!.forEach((key, i) => {
        const [id, n] = key.split('#');
        expect(getLesson(id)!.steps[Number(n)]).toBe(c.steps[i]);
      });
      expect(new Set(c.topics).size).toBeGreaterThanOrEqual(2);
      expect(getLesson(checkpointId('python', si))?.steps).toEqual(c.steps);
    }
    expect(hasCheckpoint(py, 3)).toBe(false); // the project section is the project itself
  });

  it('scores first-time answers only, per module, with a pass mark', () => {
    const r = scoreCheckpoint(['a', 'a', 'b', 'b'], [false, true, false, false], at);
    expect(r).toMatchObject({ score: 3, total: 4, byModule: { a: [1, 2], b: [2, 2] }, weak: ['a'] });
    expect(r.pass).toBe(3 / 4 >= PASS_MARK);
    expect(scoreCheckpoint(['a', 'b'], [true, true], at).pass).toBe(false);
  });

  it('pays once, then counts as a replay', () => {
    const id = checkpointId('python', 0);
    expect(isReplay({ completed: {} }, id)).toBe(false);
    expect(isReplay({ completed: done(id) }, id)).toBe(true);
  });

  it('keeps the newer attempt and the best score when phones merge', () => {
    const old = { score: 9, total: 10, pass: true, byModule: {}, weak: [], at: '2026-10-10', best: 9 };
    const recent = { score: 5, total: 10, pass: false, byModule: {}, weak: ['p-var-1'], at: '2026-10-16', best: 5 };
    const merged = mergeProgress({ ...INITIAL, checkpoints: { c: old } }, { ...INITIAL, checkpoints: { c: recent } });
    expect(merged.checkpoints.c).toMatchObject({ score: 5, best: 9, at: '2026-10-16' });
  });
});

describe('finding paths', () => {
  it('searches titles, keywords and stops, and filters by level or started', () => {
    expect(findPaths(PATHS, 'sql', 'all', {}, {}).map((p) => p.id)).toContain('data-analyst');
    expect(findPaths(PATHS, '', 'Intermediate', {}, {}).every((p) => p.level === 'Intermediate')).toBe(true);
    expect(findPaths(PATHS, '', 'started', {}, {})).toEqual([]);
    expect(findPaths(PATHS, '', 'started', done('p-var-1'), {}).map((p) => p.id)).toContain('python');
    expect(findPaths(PATHS, 'zzzz', 'all', {}, {})).toEqual([]);
  });
});

describe('stop levels', () => {
  const py = findPath('python')!;
  const first = findStop(py, 'first')!; // Your first program (p-var-1), section 0
  const drill = (accuracy: number) => ({ 'drill-p-var-1': { xp: 15, accuracy, at } });

  it('move up only with evidence', () => {
    expect(stopLevel(py, first, ev())).toBe('not-started');
    expect(stopLevel(py, first, ev({ completed: done('p-var-1') }))).toBe('completed');
    expect(stopLevel(py, first, ev({ completed: { ...done('p-var-1'), ...drill(64) } }))).toBe('completed'); // 3 mistakes: not passed
    expect(stopLevel(py, first, ev({ completed: { ...done('p-var-1'), ...drill(76) } }))).toBe('assessed');
    const passed = { [checkpointId('python', 0)]: { pass: true, weak: [] } };
    expect(stopLevel(py, first, ev({ completed: done('p-var-1'), checkpoints: passed }))).toBe('mastered');
    // A new wrong answer takes mastery away until it is revised.
    expect(stopLevel(py, first, ev({ completed: done('p-var-1'), checkpoints: passed, mistakes: { 'drill-p-var-1#1': at } }))).toBe('completed');
  });

  it('ticking "I already know this" completes a stop but proves nothing more', () => {
    expect(stopLevel(py, first, ev({ marks: { 'python/first': at } }))).toBe('completed');
  });
});

describe('no circular prerequisites', () => {
  it.each(PATHS.map((p) => [p.id, p] as const))('%s: following prerequisites never loops back', (_, path) => {
    const pre = prerequisites(path);
    const seen = new Set<string>();
    const visiting = new Set<string>();
    const visit = (id: string) => {
      if (visiting.has(id)) throw new Error(`cycle at ${id}`);
      if (seen.has(id)) return;
      visiting.add(id);
      for (const g of pre.get(id) ?? []) for (const x of g) visit(x);
      visiting.delete(id);
      seen.add(id);
    };
    for (const id of pre.keys()) expect(() => visit(id)).not.toThrow();
  });
});
