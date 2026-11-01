// Next.js in the Lesson v5 format, following the owner's 12-section flow: 12 modules of short lessons with live
// Next.js apps, each ending in a Module Challenge, then the final project. The old lesson ids are kept (some are no
// longer the first lesson of their module), so learners keep their progress.
import type { Lesson, Unit } from '../../types';
import { NX_M1 } from './m1';
import { NX_M2 } from './m2';
import { NX_M3 } from './m3';
import { NX_M4 } from './m4';
import { NX_M5 } from './m5';

const MODULES: [string, string, Lesson[]][] = [
  ['nx-u1', 'Fundamentals of Next.js', NX_M1],
  ['nx-u2', 'Routing and Navigation', NX_M2],
  ['nx-u3', 'Rendering Strategies', NX_M3],
  ['nx-u4', 'Data Fetching', NX_M4],
  ['nx-u5', 'API Development', NX_M5],
];

/** Every lesson and challenge in the Next.js track, in order. */
export const NEXT_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const NEXT_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
