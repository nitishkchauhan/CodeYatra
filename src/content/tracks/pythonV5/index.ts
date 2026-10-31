// Python Basic in the Lesson v5 format: 12 modules of short lessons, each with a Module Challenge; the last one is
// the final project (Rosa’s billing app). The units and the first lesson of each module keep their old ids, so
// learners keep their progress (and the notes and practice sets still match).
import type { Lesson, Unit } from '../../types';
import { PY_B_M1 } from './m1';
import { PY_B_M2 } from './m2';
import { PY_B_M3 } from './m3';
import { PY_B_M4 } from './m4';
import { PY_B_M5 } from './m5';
import { PY_B_M6 } from './m6';
import { PY_B_M7 } from './m7';
import { PY_B_M8 } from './m8';
import { PY_B_M9 } from './m9';
import { PY_B_M10 } from './m10';
import { PY_B_M11 } from './m11';
import { PY_B_M12 } from './m12';

const MODULES: [string, string, Lesson[]][] = [
  ['p-u0', 'Your first program', PY_B_M1],
  ['p-u11', 'Numbers', PY_B_M2],
  ['p-u6', 'Text (strings)', PY_B_M3],
  ['p-u12', 'Making decisions', PY_B_M4],
  ['p-u1', 'for loops', PY_B_M5],
  ['p-u13', 'while loops', PY_B_M6],
  ['p-u2', 'Lists', PY_B_M7],
  ['p-u4', 'Dictionaries', PY_B_M8],
  ['p-u3', 'Functions', PY_B_M9],
  ['p-u9', 'Handling errors', PY_B_M10],
  ['p-u14', 'Files', PY_B_M11],
  ['p-u8', 'Classes and objects', PY_B_M12],
];

/** Every lesson and challenge in Python Basic, in order. */
export const PY_B_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const PY_B_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
