// DSA in the Lesson v5 format: 9 modules of short lessons where every program runs in Python, each ending in a
// Module Challenge, then the final project (a mock coding round). Modules 1–5 are Basic, 6–9 Intermediate (each
// level ends with a final test, added in content/index.ts). Each module’s first lesson keeps its old id.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from './kit';
import { DSA_M1 } from './m1';
import { DSA_M7 } from './m7';
import { DSA_PROJECT } from './project';

const [m1, m2, m3, m4, m5] = modules(DSA_M1);
const [m6, m7, m8, m9] = modules(DSA_M7);

const MODULES: Module[] = [
  ['dsa1', 'Big-O', 'basic', m1],
  ['dsa11', 'Arrays and strings', 'basic', m2],
  ['dsa9', 'Recursion', 'basic', m3],
  ['dsa2', 'Searching', 'basic', m4],
  ['dsa4', 'Sorting', 'basic', m5],
  ['dsa7', 'Hashing', 'intermediate', m6],
  ['dsa8', 'Two pointers, windows and prefix sums', 'intermediate', m7],
  ['dsa5', 'Stacks and queues', 'intermediate', m8],
  ['dsa10', 'Linked lists', 'intermediate', m9],
  ['dsa14', 'Final project', 'intermediate', [DSA_PROJECT]],
];

/** Every lesson and challenge in the DSA track, in order, each with its module’s level. */
export const DSA_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const DSA_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
