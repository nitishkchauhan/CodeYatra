// Next.js in the Lesson v5 format, following the owner's 12-section flow: 12 modules of short lessons with live
// Next.js apps, each ending in a Module Challenge, then the final project. Modules 1–4 are Basic, 5–8 Intermediate
// and 9–12 Advanced (each level ends with a final test, added in content/index.ts). The old lesson ids are kept
// (some are no longer the first lesson of their module), so learners keep their progress.
import type { Lesson, Level, Unit } from '../../types';
import { NX_M1 } from './m1';
import { NX_M2 } from './m2';
import { NX_M3 } from './m3';
import { NX_M4 } from './m4';
import { NX_M5 } from './m5';
import { NX_M6 } from './m6';
import { NX_M7 } from './m7';
import { NX_M8 } from './m8';
import { NX_M9 } from './m9';
import { NX_M10 } from './m10';
import { NX_M11 } from './m11';
import { NX_M12 } from './m12';

const MODULES: [string, string, Level, Lesson[]][] = [
  ['nx-u1', 'Fundamentals of Next.js', 'basic', NX_M1],
  ['nx-u2', 'Routing and Navigation', 'basic', NX_M2],
  ['nx-u3', 'Rendering Strategies', 'basic', NX_M3],
  ['nx-u4', 'Data Fetching', 'basic', NX_M4],
  ['nx-u5', 'API Development', 'intermediate', NX_M5],
  ['nx-u6', 'Forms and Server Actions', 'intermediate', NX_M6],
  ['nx-u7', 'Authentication and Authorization', 'intermediate', NX_M7],
  ['nx-u8', 'Database Integration', 'intermediate', NX_M8],
  ['nx-u9', 'Performance and SEO', 'advanced', NX_M9],
  ['nx-u10', 'Deployment', 'advanced', NX_M10],
  ['nx-u11', 'Advanced Next.js Features', 'advanced', NX_M11],
  ['nx-u12', 'Industry Practices', 'advanced', NX_M12],
];

/** Every lesson and challenge in the Next.js track, in order, each with its module’s level. */
export const NEXT_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const NEXT_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
