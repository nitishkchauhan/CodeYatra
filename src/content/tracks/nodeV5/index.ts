// Node.js in the Lesson v5 format: 14 modules of short lessons with live terminal pages, each ending in a Module
// Challenge, then the final project. Modules 1–6 are Basic, 7–14 Intermediate (each level ends with a final test,
// added in content/index.ts). Each module’s first lesson keeps its old id, so learners keep their progress.
import type { Lesson, Level, Unit } from '../../types';
import { NODE_M1 } from './m1';
import { NODE_M4 } from './m4';

/** Splits a list of lessons into modules: each module ends with its Challenge. */
const modules = (lessons: Lesson[]): Lesson[][] =>
  lessons.reduce<Lesson[][]>((out, l) => {
    const last = out.at(-1);
    if (!last || last.at(-1)?.badge) out.push([l]);
    else last.push(l);
    return out;
  }, []);

const [m1, m2, m3] = modules(NODE_M1);
const [m4, m5, m6] = modules(NODE_M4);

const MODULES: [string, string, Level, Lesson[]][] = [
  ['n-u1', 'Node.js basics', 'basic', m1],
  ['n-u11', 'Modules', 'basic', m2],
  ['n-u6', 'npm and packages', 'basic', m3],
  ['n-u2', 'Asynchronous code', 'basic', m4],
  ['n-u7', 'Files and paths', 'basic', m5],
  ['n-u15', 'Events and streams', 'basic', m6],
];

/** Every lesson and challenge in the Node.js track, in order, each with its module’s level. */
export const NODE_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const NODE_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
