// React in the Lesson v5 format: 13 modules of short lessons with live React pages, each ending in a Module
// Challenge; the last one is the final project. The units and each module's first lesson keep their old ids, so
// learners keep their progress (and the notes still match).
import type { Lesson, Unit } from '../../types';
import { R_M1 } from './m1';
import { R_M2 } from './m2';
import { R_M3 } from './m3';
import { R_M4 } from './m4';
import { R_M5 } from './m5';
import { R_M6 } from './m6';
import { R_M7 } from './m7';
import { R_M8 } from './m8';

const MODULES: [string, string, Lesson[]][] = [
  ['r-u1', 'Components and JSX', R_M1],
  ['r-u11', 'Props', R_M2],
  ['r-u2', 'State', R_M3],
  ['r-u4', 'Events', R_M4],
  ['r-u6', 'Showing things conditionally', R_M5],
  ['r-u3', 'Lists and keys', R_M6],
  ['r-u12', 'Forms', R_M7],
  ['r-u13', 'Updating objects and arrays', R_M8],
];

/** Every lesson and challenge in the React track, in order. */
export const REACT_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const REACT_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
