// SQL in the Lesson v5 format: 13 modules of short lessons where every query runs on the sample railway database,
// each ending in a Module Challenge, then the final project. Modules 1–6 are Basic, 7–13 Intermediate (each level
// ends with a final test, added in content/index.ts). Each module’s first lesson keeps its old id.
import type { Lesson, Level, Unit } from '../../types';
import { SQL_M1 } from './m1';
import { SQL_M7 } from './m7';

/** Splits a list of lessons into modules: each module ends with its Challenge. */
const modules = (lessons: Lesson[]): Lesson[][] =>
  lessons.reduce<Lesson[][]>((out, l) => {
    const last = out.at(-1);
    if (!last || last.at(-1)?.badge) out.push([l]);
    else last.push(l);
    return out;
  }, []);

const [m1, m2, m3, m4, m5, m6] = modules(SQL_M1);
const [m7, m8, m9, m10, m11, m12, m13] = modules(SQL_M7);

const MODULES: [string, string, Level, Lesson[]][] = [
  ['sq1', 'SELECT', 'basic', m1],
  ['sq2', 'Filtering with WHERE', 'basic', m2],
  ['sq7', 'Patterns and NULL', 'basic', m3],
  ['sq3', 'Sorting and limits', 'basic', m4],
  ['sq4', 'Aggregates', 'basic', m5],
  ['sq5', 'Grouping', 'basic', m6],
  ['sq6', 'Joins', 'intermediate', m7],
  ['sq11', 'LEFT JOIN and UNION', 'intermediate', m8],
  ['sq10', 'Subqueries and CTEs', 'intermediate', m9],
  ['sq14', 'CASE and functions', 'intermediate', m10],
  ['sq12', 'Window functions', 'intermediate', m11],
  ['sq8', 'Changing data', 'intermediate', m12],
  ['sq9', 'Database design', 'intermediate', m13],
];

/** Every lesson and challenge in the SQL track, in order, each with its module’s level. */
export const SQL_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const SQL_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
