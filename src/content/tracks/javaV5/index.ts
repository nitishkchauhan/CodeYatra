// Java in the Lesson v5 format: 12 modules of short lessons, each ending in a Module Challenge, then the final
// project (a train reservation system). Modules 1–6 are Basic, 7–12 Intermediate (each level ends with a final
// test, added in content/index.ts). Each module’s first lesson keeps its old id. The phone can’t compile Java, so
// code screens show real output, checked in tests.
import type { Lesson, Unit } from '../../types';
import { modules, type Module } from '../cV5/kit';
import { JAVA_M1 } from './m1';
import { JAVA_M7 } from './m7';
import { JAVA_PROJECT_V5 } from './project';

const [m1, m2, m3, m4, m5, m6] = modules(JAVA_M1);
const [m7, m8, m9, m10, m11, m12] = modules(JAVA_M7);

const MODULES: Module[] = [
  ['jv1', 'Hello, Java', 'basic', m1],
  ['jv2', 'Variables and types', 'basic', m2],
  ['jv11', 'Operators and input', 'basic', m3],
  ['jv3', 'Decisions', 'basic', m4],
  ['jv4', 'Loops', 'basic', m5],
  ['jv5', 'Methods', 'basic', m6],
  ['jv6', 'Arrays', 'intermediate', m7],
  ['jv7', 'Strings', 'intermediate', m8],
  ['jv8', 'Classes and objects', 'intermediate', m9],
  ['jv9', 'Inheritance and interfaces', 'intermediate', m10],
  ['jv10', 'Collections', 'intermediate', m11],
  ['jv12', 'Exceptions', 'intermediate', m12],
  ['jv13', 'Final project', 'intermediate', [JAVA_PROJECT_V5]],
];

/** Every lesson and challenge in the Java track, in order, each with its module’s level. */
export const JAVA_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const JAVA_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
