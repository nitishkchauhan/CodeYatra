// HTML Intermediate in the Lesson v5 format: 6 modules of short lessons, each with a Module Challenge; the last one is
// the final project (the Greenfield School website). Shown in the HTML track after the Basic modules.
import type { Lesson, Unit } from '../../types';
import { HTML_I_M1 } from './m1';
import { HTML_I_M2 } from './m2';
import { HTML_I_M3 } from './m3';
import { HTML_I_M4 } from './m4';
import { HTML_I_M5 } from './m5';
import { HTML_I_M6 } from './m6';

const MODULES: [string, string, Lesson[]][] = [
  ['h-i-u1', 'Forms everyone can fill', HTML_I_M1],
  ['h-i-u2', 'Responsive images', HTML_I_M2],
  ['h-i-u3', 'Sites with many pages', HTML_I_M3],
  ['h-i-u4', 'Telling search engines what the page is', HTML_I_M4],
  ['h-i-u5', 'Pages that load fast', HTML_I_M5],
  ['h-i-u6', 'Built-in interactive elements', HTML_I_M6],
];

/** Every lesson and challenge in HTML Intermediate, in order. */
export const HTML_I_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const HTML_I_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
