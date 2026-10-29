// The CSS track in the Lesson v5 format: 12 modules, each a set of short lessons and a Module Challenge.
// Lessons that replace an older module keep its id, so learners keep their progress (see m1.ts…m12.ts).
import type { Lesson, Unit } from '../../types';
import { CSS_M1 } from './m1';
import { CSS_M10 } from './m10';
import { CSS_M11 } from './m11';
import { CSS_M12 } from './m12';
import { CSS_M2 } from './m2';
import { CSS_M3 } from './m3';
import { CSS_M4 } from './m4';
import { CSS_M5 } from './m5';
import { CSS_M6 } from './m6';
import { CSS_M7 } from './m7';
import { CSS_M8 } from './m8';
import { CSS_M9 } from './m9';

const MODULES: [string, string, Lesson[]][] = [
  ['c-u1', 'Getting Started', CSS_M1],
  ['c-u2', 'Selectors', CSS_M2],
  ['c-u3', 'Colours, Backgrounds and Units', CSS_M3],
  ['c-u4', 'Text and Fonts', CSS_M4],
  ['c-u5', 'The Box Model', CSS_M5],
  ['c-u6', 'Display and Position', CSS_M6],
  ['c-u7', 'Flexbox', CSS_M7],
  ['c-u8', 'Grid', CSS_M8],
  ['c-u9', 'Styling Page Parts', CSS_M9],
  ['c-u10', 'States and Extras', CSS_M10],
  ['c-u11', 'Images, Effects and Motion', CSS_M11],
  ['c-u12', 'Responsive and Modern CSS', CSS_M12],
];

/** Every lesson and challenge in the track, in order. */
export const CSS_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** The track's units, one per module: its lessons, then its Challenge. */
export const CSS_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
