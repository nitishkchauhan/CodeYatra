// Placement in the Lesson v5 format: 12 modules, each a lesson and a Module Challenge that ends with a tested coding
// question, then the final project (a mock placement round). Modules 1–6 are Basic, 7–12 Intermediate (each level
// ends with a final test, added in content/index.ts). Each module’s lesson keeps its old id.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from './kit';
import { PL_M1 } from './m1';
import { PL_M7 } from './m7';
import { PL_PROJECT_V5 } from './project';

const [m1, m2, m3, m4, m5, m6] = modules(PL_M1);
const [m7, m8, m9, m10, m11, m12] = modules(PL_M7);

const MODULES: Module[] = [
  ['pl1', 'Coding rounds', 'basic', m1],
  ['pl2', 'Strings', 'basic', m2],
  ['pl3', 'Numbers', 'basic', m3],
  ['pl4', 'Arrays', 'basic', m4],
  ['pl5', 'Hashing', 'basic', m5],
  ['pl11', 'Patterns', 'basic', m6],
  ['pl12', 'Matrices', 'intermediate', m7],
  ['pl7', 'Python output', 'intermediate', m8],
  ['pl6', 'C output', 'intermediate', m9],
  ['pl8', 'OOP', 'intermediate', m10],
  ['pl9', 'SQL', 'intermediate', m11],
  ['pl10', 'Complexity', 'intermediate', m12],
  ['pl13', 'Mock round', 'intermediate', [PL_PROJECT_V5]],
];

/** Every lesson and challenge in the Placement track, in order, each with its module’s level. */
export const PL_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lesson, then its Challenge. */
export const PL_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
