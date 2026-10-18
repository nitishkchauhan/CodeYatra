// The roadmap as a graph: which stops come before which, what state each node is in,
// search, and plain-rule recommendations for what to do next. Pure functions, so they are tested.
import { drillId, getLesson, hasDrill } from '..';
import { checkpointId, hasCheckpoint } from '../checkpoints';
import { stopStatus, type CareerPath, type PathStop } from '.';

type Done = Record<string, unknown>;
/** What the learner has done, as stored in their progress. */
export type Evidence = {
  completed: Done;
  marks: Done;
  /** Saved wrong answers, "lessonId#step" → day. */
  mistakes: Record<string, string>;
  /** Checkpoint results by id. */
  checkpoints?: Record<string, { pass: boolean; weak: string[] }>;
};

export type NodeState =
  /** Every lesson done (or ticked as already known). */
  | 'done'
  /** Some lessons done. */
  | 'progress'
  /** Ready to learn: everything it builds on is done. */
  | 'available'
  /** Can still be opened, but we suggest finishing what it builds on first. */
  | 'early';

export type Edge = { from: string; to: string };

const required = (stops: PathStop[]) => stops.filter((s) => !s.optional);

/**
 * What each stop builds on. A stop's own `needs` wins; otherwise it builds on the required
 * stops of the section before it (a "pick one" choice counts once: any option will do).
 * The first section builds on nothing.
 */
export function prerequisites(path: CareerPath): Map<string, string[][]> {
  const out = new Map<string, string[][]>();
  path.sections.forEach((section, si) => {
    const prev = si > 0 ? required(path.sections[si - 1].stops) : [];
    // Group a choice's options together: each group is satisfied by any one member.
    const groups = new Map<string, string[]>();
    for (const s of prev) {
      const key = s.choice ? `choice:${s.choice}` : s.id;
      groups.set(key, [...(groups.get(key) ?? []), s.id]);
    }
    for (const stop of section.stops) out.set(stop.id, stop.needs ? stop.needs.map((id) => [id]) : [...groups.values()]);
  });
  return out;
}

/** Edges for drawing: from each prerequisite to the stop that needs it. */
export function edges(path: CareerPath): Edge[] {
  return [...prerequisites(path)].flatMap(([to, groups]) => groups.flat().map((from) => ({ from, to })));
}

const allStops = (path: CareerPath) => path.sections.flatMap((s) => s.stops);
export const findStop = (path: CareerPath, id: string) => allStops(path).find((s) => s.id === id);

/** Stops that list this one as a prerequisite: what finishing it opens up. */
export function unlocks(path: CareerPath, stopId: string): PathStop[] {
  const pre = prerequisites(path);
  return allStops(path).filter((s) => pre.get(s.id)?.some((g) => g.includes(stopId)));
}

export function nodeState(path: CareerPath, stop: PathStop, ev: Evidence): NodeState {
  const status = stopStatus(path.id, stop, ev.completed, ev.marks);
  if (status === 'done') return 'done';
  if (status === 'progress') return 'progress';
  const groups = prerequisites(path).get(stop.id) ?? [];
  const ready = groups.every((g) => g.some((id) => stopStatus(path.id, findStop(path, id)!, ev.completed, ev.marks) === 'done'));
  return ready ? 'available' : 'early';
}

/**
 * A stop needs revision when there is real evidence: a saved wrong answer in one of its
 * lessons (or their practice sets), or a checkpoint that showed one of its lessons as weak.
 */
export function needsRevision(stop: PathStop, ev: Evidence): string[] {
  const mods = stop.modules ?? [];
  const missed = Object.keys(ev.mistakes).map((k) => k.split('#')[0].replace(/^drill-/, ''));
  const weak = Object.values(ev.checkpoints ?? {}).flatMap((c) => (c.pass ? [] : c.weak));
  return mods.filter((m) => missed.includes(m) || weak.includes(m));
}

export type StopLevel = 'not-started' | 'in-progress' | 'completed' | 'assessed' | 'mastered';

/** Practice accuracy needed for a lesson's practice set to count as passed (at most 2 mistakes). */
export const PRACTICE_PASS = 75;

/**
 * How far the learner has got with a stop, from evidence only (opening a stop never changes it):
 * - completed: every lesson finished (or ticked "I already know this");
 * - assessed: completed, and every lesson's practice set passed with PRACTICE_PASS% or more;
 * - mastered: completed, the section's checkpoint passed on the latest attempt, and nothing needs revision.
 */
export function stopLevel(path: CareerPath, stop: PathStop, ev: Evidence & { completed: Record<string, { accuracy?: number } | unknown> }): StopLevel {
  const status = stopStatus(path.id, stop, ev.completed, ev.marks);
  if (status === 'todo') return 'not-started';
  if (status === 'progress') return 'in-progress';
  const si = path.sections.findIndex((x) => x.stops.includes(stop));
  const check = si >= 0 && hasCheckpoint(path, si) ? ev.checkpoints?.[checkpointId(path.id, si)] : undefined;
  if (check?.pass && !stop.optional && needsRevision(stop, ev).length === 0) return 'mastered';
  const mods = (stop.modules ?? []).filter((m) => hasDrill(m));
  const practised = mods.length > 0 && mods.length === (stop.modules ?? []).length && mods.every((m) => ((ev.completed[drillId(m)] as { accuracy?: number } | undefined)?.accuracy ?? 0) >= PRACTICE_PASS);
  return practised ? 'assessed' : 'completed';
}

export const LEVEL_LABEL: Record<StopLevel, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
  assessed: 'Practice passed',
  mastered: 'Mastered',
};

/** Stops whose title, reason or lesson titles contain every word of the query. */
export function searchStops(path: CareerPath, query: string): PathStop[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return allStops(path).filter((s) => {
    const text = [s.title, s.why, s.choice ?? '', ...(s.modules ?? []).map((m) => getLesson(m)?.title ?? '')].join(' ').toLowerCase();
    return words.every((w) => text.includes(w));
  });
}

export type Suggestion = { stopId: string; kind: 'revise' | 'continue' | 'next' | 'checkpoint'; reason: string };

/**
 * Up to three next steps, each with a plain reason. Rules, in order: revise what the evidence
 * says is weak, finish a stop already started, take a checkpoint for a finished section,
 * then start the first stop that is ready.
 */
export function suggestions(path: CareerPath, ev: Evidence, checkpointFor?: (sectionIndex: number) => string | null): Suggestion[] {
  const out: Suggestion[] = [];
  const stops = allStops(path);
  for (const s of stops) {
    const weak = needsRevision(s, ev);
    if (!weak.length) continue;
    const titles = weak.map((m) => getLesson(m)?.title ?? m);
    const where = titles.length === 1 && titles[0] === s.title ? 'you got a question wrong there' : `you missed questions in ${titles.join(', ')}`;
    out.push({ stopId: s.id, kind: 'revise', reason: `Revise ${s.title}: ${where}.` });
  }
  const started = stops.find((s) => nodeState(path, s, ev) === 'progress');
  if (started) out.push({ stopId: started.id, kind: 'continue', reason: `Finish ${started.title}: you are part of the way through.` });
  if (checkpointFor) {
    path.sections.forEach((section, si) => {
      const id = checkpointFor(si);
      const req = required(section.stops);
      if (!id || !req.length || ev.checkpoints?.[id]?.pass) return;
      if (req.every((s) => nodeState(path, s, ev) === 'done')) out.push({ stopId: req[0].id, kind: 'checkpoint', reason: `Take the ${section.title} checkpoint to show you have mastered it.` });
    });
  }
  const ready = stops.find((s) => !s.optional && nodeState(path, s, ev) === 'available');
  if (ready && ready.id !== started?.id) {
    const before = (prerequisites(path).get(ready.id) ?? []).flat();
    out.push({
      stopId: ready.id,
      kind: 'next',
      reason: before.length ? `Start ${ready.title}: you have finished what it builds on.` : `Start ${ready.title}: it is where this path begins.`,
    });
  }
  // One suggestion per stop, most useful first.
  return out.filter((s, i) => out.findIndex((o) => o.stopId === s.stopId) === i).slice(0, 3);
}
