// DSA Advanced in the Lesson v5 format: 8 modules of short lessons where every program runs in Python, each ending
// in a Module Challenge, then the final project (a metro route planner). Modules 1–4 are Intermediate and 5–8
// Advanced (each part ends with a final test, added in content/index.ts). Each module’s first lesson keeps its old id.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from '../dsaV5/kit';
import { DSA2_M1 } from './m1';
import { DSA2_M7 } from './m7';
import { DSA2_PROJECT } from './project';

const [m1, m2, m3, m4] = modules(DSA2_M1);
const [m5, m6, m7, m8] = modules(DSA2_M7);

const MODULES: Module[] = [
  ['da1', 'Binary trees', 'intermediate', m1],
  ['da2', 'Binary search trees', 'intermediate', m2],
  ['da3', 'Heaps', 'intermediate', m3],
  ['da4', 'Graphs: BFS, DFS and topological sort', 'intermediate', m4],
  ['da12', 'Shortest paths and spanning trees', 'advanced', m5],
  ['da6', 'Backtracking', 'advanced', m6],
  ['da7', 'Dynamic programming', 'advanced', m7],
  ['da9', 'Greedy and divide and conquer', 'advanced', m8],
  ['da14', 'Final project', 'advanced', [DSA2_PROJECT]],
];

/** Every lesson and challenge in the DSA Advanced track, in order, each with its module’s level. */
export const DSA2_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const DSA2_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
