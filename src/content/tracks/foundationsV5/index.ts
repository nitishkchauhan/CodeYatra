// Logic Foundations in the Lesson v5 format: 10 modules, each a lesson and a Module Challenge, then the final
// project (Yatri’s Gem Bazaar). Modules 1–5 are Basic (the first four end with block puzzles), 6–10 Intermediate
// (each level ends with a final test, added in content/index.ts). Each lesson keeps its old id.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from '../placementV5/kit';
import { F_M1 } from './m1';
import { F_M6 } from './m6';
import { F_PROJECT_V5 } from './project';

const [m1, m2, m3, m4, m5] = modules(F_M1);
const [m6, m7, m8, m9, m10] = modules(F_M6);

const MODULES: Module[] = [
  ['f-u1', 'Algorithms', 'basic', m1],
  ['f-u2', 'Turns', 'basic', m2],
  ['f-u3', 'Loops', 'basic', m3],
  ['f-u4', 'Patterns', 'basic', m4],
  ['f-u7', 'Variables', 'basic', m5],
  ['f-u6', 'Conditions', 'intermediate', m6],
  ['f-u8', 'While loops', 'intermediate', m7],
  ['f-u9', 'Nested loops', 'intermediate', m8],
  ['f-u5', 'Functions', 'intermediate', m9],
  ['f-u10', 'Debugging', 'intermediate', m10],
  ['f-u11', 'Final project', 'intermediate', [F_PROJECT_V5]],
];

/** Every lesson and challenge in the Logic Foundations track, in order, each with its module’s level. */
export const F_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lesson, then its Challenge. */
export const F_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
