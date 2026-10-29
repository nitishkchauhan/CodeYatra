// The JavaScript track in the Lesson v5 format: 13 modules, each a set of short lessons and a Module Challenge.
// Lessons that replace an older module keep its id, so learners keep their progress (see m1.ts…m13.ts).
import type { Lesson, Unit } from '../../types';
import { JS_M1 } from './m1';
import { JS_M2 } from './m2';
import { JS_M3 } from './m3';
import { JS_M4 } from './m4';
import { JS_M5 } from './m5';
import { JS_M6 } from './m6';
import { JS_M7 } from './m7';
import { JS_M8 } from './m8';
import { JS_M9 } from './m9';
import { JS_M10 } from './m10';
import { JS_M11 } from './m11';
import { JS_M12 } from './m12';
import { JS_M13 } from './m13';

const MODULES: [string, string, Lesson[]][] = [
  ['j-u1', 'Getting Started', JS_M1],
  ['j-u2', 'Variables and Types', JS_M2],
  ['j-u3', 'Operators', JS_M3],
  ['j-u4', 'Decisions', JS_M4],
  ['j-u5', 'Loops', JS_M5],
  ['j-u6', 'Strings, Numbers and Maths', JS_M6],
  ['j-u7', 'Functions', JS_M7],
  ['j-u8', 'Arrays', JS_M8],
  ['j-u9', 'Objects, Sets and Maps', JS_M9],
  ['j-u10', 'Classes and Dates', JS_M10],
  ['j-u11', 'Errors and Debugging', JS_M11],
  ['j-u12', 'The DOM and Events', JS_M12],
  ['j-u13', 'Browser, Data and Async', JS_M13],
];

/** Every lesson and challenge in the track, in order. */
export const JS_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** The track's units, one per module: its lessons, then its Challenge. */
export const JS_UNITS: Unit[] = MODULES.map(([id, title, lessons], m) => ({
  id,
  title: `Module ${m + 1} · ${title}`,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
