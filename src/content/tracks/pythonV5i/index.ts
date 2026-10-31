// Python Intermediate in the Lesson v5 format: 6 modules of short lessons, each with a Module Challenge; the last one
// is the final project (City Travel Desk’s booking report). Shown in the Python track after Basic. The first lesson of
// each module and the project keep the old Intermediate ids, so learners keep their progress (and the notes still match).
import type { Lesson, Unit } from '../../types';
import { PY_I_M1 } from './m1';
import { PY_I_M2 } from './m2';
import { PY_I_M3 } from './m3';
import { PY_I_M4 } from './m4';
import { PY_I_M5 } from './m5';
import { PY_I_M6 } from './m6';

const MODULES: [string, string, Lesson[]][] = [
  ['p-i1', 'Shaping data', PY_I_M1],
  ['p-i2', 'Grouped values', PY_I_M2],
  ['p-i3', 'The standard library', PY_I_M3],
  ['p-i4', 'Real data files', PY_I_M4],
  ['p-i5', 'Functions in depth', PY_I_M5],
  ['p-i6', 'Classes in depth', PY_I_M6],
];

/** Every lesson and challenge in Python Intermediate, in order. */
export const PY_I_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const PY_I_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
