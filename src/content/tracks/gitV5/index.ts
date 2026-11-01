// Git in the Lesson v5 format: 11 modules of short lessons with a live Git terminal,
// each ending in a Module Challenge, then the final project. Modules 1–6 are Basic, 7–11 Intermediate (each level
// ends with a final test, added in content/index.ts). Each module’s first lesson keeps its old id.
import type { Lesson, Level, Unit } from '../../types';
import { GIT_M1 } from './m1';
import { GIT_M7 } from './m7';
import { GIT_PROJECT } from './project';

/** Splits a list of lessons into modules: each module ends with its Challenge. */
const modules = (lessons: Lesson[]): Lesson[][] =>
  lessons.reduce<Lesson[][]>((out, l) => {
    const last = out.at(-1);
    if (!last || last.at(-1)?.badge) out.push([l]);
    else last.push(l);
    return out;
  }, []);

const [m1, m2, m3, m4, m5, m6] = modules(GIT_M1);
const [m7, m8, m9, m10, m11] = modules(GIT_M7);

const MODULES: [string, string, Level, Lesson[]][] = [
  ['g1', 'What Git is', 'basic', m1],
  ['g2', 'Starting a repository', 'basic', m2],
  ['g3', 'Staging and committing', 'basic', m3],
  ['g4', 'History and tags', 'basic', m4],
  ['g5', 'Branches', 'basic', m5],
  ['g6', 'Merging', 'basic', m6],
  ['g7', 'Remotes and GitHub', 'intermediate', m7],
  ['g8', 'Pull requests', 'intermediate', m8],
  ['g9', '.gitignore and secrets', 'intermediate', m9],
  ['g10', 'Undoing things', 'intermediate', m10],
  ['g11', 'Stash and team workflow', 'intermediate', m11],
  ['g12', 'Final project', 'intermediate', [GIT_PROJECT]],
];

/** Every lesson and challenge in the Git track, in order, each with its module’s level. */
export const GIT_V5: Lesson[] = MODULES.flatMap(([, , level, lessons]) => lessons.map((l) => ({ ...l, level })));

/** One unit per module: its lessons, then its Challenge. */
export const GIT_UNITS: Unit[] = MODULES.map(([id, title, , lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.kind === 'project' ? `Final project · ${l.badge!.icon} ${l.badge!.name}` : l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
