// Career paths and how far a learner is along one. Status comes from finished CodeYatra
// modules plus stops the learner ticked themselves ("I already know this").
import { AI_ENGINEER } from './ai';
import { ANDROID } from './android';
import { BACKEND } from './backend';
import { CBSE_PATH } from './cbse';
import { DATA_ANALYST, DATA_SCIENTIST } from './data';
import { DEVOPS } from './devops';
import { FRONTEND } from './frontend';
import { FULLSTACK } from './fullstack';
import { PYTHON_DEV } from './python';
import { QA } from './qa';
import { SDE } from './sde';
import { SECURITY } from './security';
import type { CareerPath, PathStop, StopStatus } from './types';
import { alpha, onDark } from '@/theme';

export * from './types';

/** Most-chosen first: placements and web, then data and AI, then specialist paths. */
/** Path colours lifted for the dark glass design: readable as text on navy and under navy text. */
export const PATHS: CareerPath[] = [
  SDE,
  FRONTEND,
  BACKEND,
  FULLSTACK,
  PYTHON_DEV,
  DATA_ANALYST,
  DATA_SCIENTIST,
  AI_ENGINEER,
  ANDROID,
  DEVOPS,
  SECURITY,
  QA,
  CBSE_PATH,
].map((p) => ({
  ...p,
  color: onDark(p.color),
  ink: onDark(p.ink),
  soft: alpha(onDark(p.color), 0.16),
}));

export const findPath = (id: string | null | undefined) => PATHS.find((p) => p.id === id);

/** Key for a stop the learner marked done themselves. */
export const markKey = (pathId: string, stopId: string) => `${pathId}/${stopId}`;

type Done = Record<string, unknown>;

export function stopStatus(pathId: string, stop: PathStop, completed: Done, marks: Done): StopStatus {
  if (marks[markKey(pathId, stop.id)]) return 'done';
  const mods = stop.modules ?? [];
  if (!mods.length) return 'todo';
  const finished = mods.filter((m) => completed[m]).length;
  return finished === mods.length ? 'done' : finished > 0 ? 'progress' : 'todo';
}

/** Share of a stop's modules finished, 0–1 (1 when marked done). */
export function stopProgress(pathId: string, stop: PathStop, completed: Done, marks: Done): number {
  if (marks[markKey(pathId, stop.id)]) return 1;
  const mods = stop.modules ?? [];
  return mods.length ? mods.filter((m) => completed[m]).length / mods.length : 0;
}

/**
 * Required "units" of a path: every non-optional stop, except that stops sharing a
 * choice label count once (any one of them finishes the choice).
 */
function requiredGroups(path: CareerPath): PathStop[][] {
  const groups = new Map<string, PathStop[]>();
  for (const s of path.sections.flatMap((x) => x.stops)) {
    if (s.optional) continue;
    const key = s.choice ? `choice:${s.choice}` : s.id;
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  return [...groups.values()];
}

export function pathSummary(path: CareerPath, completed: Done, marks: Done) {
  const groups = requiredGroups(path);
  const doneGroups = groups.filter((g) => g.some((s) => stopStatus(path.id, s, completed, marks) === 'done')).length;
  const all = path.sections.flatMap((x) => x.stops);
  // The next stop: the first required stop (or unfinished choice) that isn't done yet.
  const next = all.find((s) => {
    if (s.optional || stopStatus(path.id, s, completed, marks) === 'done') return false;
    return !s.choice || !all.some((o) => o.choice === s.choice && stopStatus(path.id, o, completed, marks) === 'done');
  });
  const inApp = all.filter((s) => s.modules?.length).length;
  return {
    /** Job-ready %: required stops (or choices) done. */
    pct: groups.length ? Math.round((doneGroups / groups.length) * 100) : 0,
    done: doneGroups,
    total: groups.length,
    next: next ?? null,
    stops: all.length,
    /** Share of stops CodeYatra teaches, for the "x% in app" badge. */
    inAppPct: all.length ? Math.round((inApp / all.length) * 100) : 0,
  };
}

/** The first lesson to open for a stop: the first unfinished module, else the first module. */
export function nextModule(stop: PathStop, completed: Done): string | null {
  const mods = stop.modules ?? [];
  return mods.find((m) => !completed[m]) ?? mods[0] ?? null;
}
