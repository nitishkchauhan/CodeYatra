// CSS Intermediate in the Lesson v5 format: 6 modules of short lessons, each with a Module Challenge; the last one is
// the final project (your own portfolio). Shown in the CSS track after the Basic modules.
import type { Lesson, Unit } from '../../types';
import { CSS_I_M1 } from './m1';
import { CSS_I_M2 } from './m2';
import { CSS_I_M3 } from './m3';
import { CSS_I_M4 } from './m4';
import { CSS_I_M5 } from './m5';
import { CSS_I_M6 } from './m6';

const MODULES: [string, string, Lesson[]][] = [
  ['c-i-u1', 'Layout patterns', CSS_I_M1],
  ['c-i-u2', 'Components that fit anywhere', CSS_I_M2],
  ['c-i-u3', 'Motion with a purpose', CSS_I_M3],
  ['c-i-u4', 'Design tokens and themes', CSS_I_M4],
  ['c-i-u5', 'Forms that look good', CSS_I_M5],
  ['c-i-u6', 'Responsive navigation', CSS_I_M6],
];

/** Every lesson and challenge in CSS Intermediate, in order. */
export const CSS_I_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const CSS_I_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
