// C in the Lesson v5 format: 12 modules of short lessons, each ending in a Module Challenge, then the final project
// (a marks manager). Modules 1–6 are Basic, 7–12 Intermediate (each level ends with a final test, added in
// content/index.ts). Each module’s first lesson keeps its old id. The phone can’t compile C, so code screens show
// real gcc output, checked in tests.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from './kit';
import { C_M1 } from './m1';
import { C_M7 } from './m7';
import { C_PROJECT_V5 } from './project';

const [m1, m2, m3, m4, m5, m6] = modules(C_M1);
const [m7, m8, m9, m10, m11, m12] = modules(C_M7);

const MODULES: Module[] = [
  ['c1', 'Hello, C', 'basic', m1],
  ['c2', 'Variables and types', 'basic', m2],
  ['c11', 'Operators and input', 'basic', m3],
  ['c3', 'Decisions', 'basic', m4],
  ['c4', 'Loops', 'basic', m5],
  ['c5', 'Functions', 'basic', m6],
  ['c6', 'Arrays', 'intermediate', m7],
  ['c7', 'Strings', 'intermediate', m8],
  ['c8', 'Pointers', 'intermediate', m9],
  ['c9', 'Structs', 'intermediate', m10],
  ['c10', 'Dynamic memory', 'intermediate', m11],
  ['c12', 'Files', 'intermediate', m12],
  ['c13', 'Final project', 'intermediate', [C_PROJECT_V5]],
];

/** Every lesson and challenge in the C track, in order, each with its module’s level. */
export const C_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const C_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
