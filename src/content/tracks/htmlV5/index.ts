// The HTML track in the Lesson v5 format: 9 modules, each a set of short lessons and a Module Challenge.
// Lessons that replace an older module keep its id, so learners keep their progress (see m1.ts…m9.ts).
import type { Lesson, Unit } from '../../types';
import { HTML_M1 } from './m1';
import { HTML_M2 } from './m2';
import { HTML_M3 } from './m3';
import { HTML_M4 } from './m4';
import { HTML_M5 } from './m5';
import { HTML_M6 } from './m6';
import { HTML_M7 } from './m7';
import { HTML_M8 } from './m8';
import { HTML_M9 } from './m9';

const MODULES: [string, string, Lesson[]][] = [
  ['h-u1', 'Getting Started', HTML_M1],
  ['h-u2', 'Working with Text', HTML_M2],
  ['h-u3', 'Style Basics', HTML_M3],
  ['h-u4', 'Links and Images', HTML_M4],
  ['h-u5', 'Organising Content', HTML_M5],
  ['h-u6', 'Page Building', HTML_M6],
  ['h-u7', 'Forms', HTML_M7],
  ['h-u8', 'Media and Graphics', HTML_M8],
  ['h-u9', 'Going Further', HTML_M9],
];

/** Every lesson and challenge in the track, in order. */
export const HTML_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** The track's units, one per module: its lessons, then its Challenge. */
export const HTML_UNITS: Unit[] = MODULES.map(([id, title, lessons], m) => ({
  id,
  title: `Module ${m + 1} · ${title}`,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
