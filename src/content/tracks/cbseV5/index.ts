// CBSE Computer Science (083) in the Lesson v5 format: 12 modules, each a lesson and a Module Challenge that ends
// with a tested board-style program, then the final project (a practical record program). Modules 1–6 are Basic,
// 7–12 Intermediate (each level ends with a final test, added in content/index.ts). Each lesson keeps its old id.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from '../placementV5/kit';
import { CBSE_M1 } from './m1';
import { CBSE_M7 } from './m7';
import { CBSE_PROJECT_V5 } from './project';

const [m1, m2, m3, m4, m5, m6] = modules(CBSE_M1);
const [m7, m8, m9, m10, m11, m12] = modules(CBSE_M7);

const MODULES: Module[] = [
  ['cb1', 'Data types', 'basic', m1],
  ['cb2', 'Flow of control', 'basic', m2],
  ['cb3', 'Strings', 'basic', m3],
  ['cb4', 'Lists', 'basic', m4],
  ['cb5', 'Tuples and dictionaries', 'basic', m5],
  ['cb6', 'Functions', 'basic', m6],
  ['cb11', 'Modules', 'intermediate', m7],
  ['cb7', 'Exceptions', 'intermediate', m8],
  ['cb8', 'Text files', 'intermediate', m9],
  ['cb12', 'Binary and CSV', 'intermediate', m10],
  ['cb9', 'Stack', 'intermediate', m11],
  ['cb10', 'SQL', 'intermediate', m12],
  ['cb13', 'Final project', 'intermediate', [CBSE_PROJECT_V5]],
];

/** Every lesson and challenge in the CBSE track, in order, each with its module’s level. */
export const CBSE_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lesson, then its Challenge. */
export const CBSE_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
