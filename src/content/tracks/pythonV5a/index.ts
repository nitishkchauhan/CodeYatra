// Python Advanced in the Lesson v5 format: 6 modules of short lessons, each with a Module Challenge; the last one
// is the final project (a tested booking service). Shown in the Python track after Intermediate. The first lesson of
// each module and the project keep the old Advanced ids, so learners keep their progress (and the notes still match).
import type { Lesson, Unit } from '../../types';
import { PY_A_M1 } from './m1';
import { PY_A_M2 } from './m2';
import { PY_A_M3 } from './m3';
import { PY_A_M4 } from './m4';
import { PY_A_M5 } from './m5';
import { PY_A_M6 } from './m6';

const MODULES: [string, string, Lesson[]][] = [
  ['p-a1', 'Testing', PY_A_M1],
  ['p-a2', 'Debugging and logging', PY_A_M2],
  ['p-a3', 'APIs and HTTP', PY_A_M3],
  ['p-a4', 'Generators and big data', PY_A_M4],
  ['p-a5', 'Decorators and caching', PY_A_M5],
  ['p-a6', 'Clean code', PY_A_M6],
];

/** Every lesson and challenge in Python Advanced, in order. */
export const PY_A_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const PY_A_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
