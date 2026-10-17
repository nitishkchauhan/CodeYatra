// Section checkpoints: a short scored test at the end of each roadmap section, built from the
// practice questions of the modules in that section. Passing one is the evidence for "mastered".
import { DRILLS } from './drills';
import { optionOrder } from './helpers';
import type { Lesson, Step } from './types';
import type { CareerPath } from './paths/types';

export const CHECKPOINT_PREFIX = 'check-';
/** Share of questions to get right first time to pass. */
export const PASS_MARK = 0.7;
const MAX_QUESTIONS = 10;
const CHECKED: Step['type'][] = ['quiz', 'predict', 'bug', 'order', 'tap'];

export const checkpointId = (pathId: string, sectionIndex: number) => `${CHECKPOINT_PREFIX}${pathId}-${sectionIndex}`;

/** The modules a section's checkpoint tests: required stops' lessons that have practice questions. */
export function checkpointModules(path: CareerPath, sectionIndex: number): string[] {
  const section = path.sections[sectionIndex];
  if (!section) return [];
  const mods = section.stops.filter((s) => !s.optional && !s.project).flatMap((s) => s.modules ?? []);
  return [...new Set(mods)].filter((m) => (DRILLS[m] ?? []).some((s) => CHECKED.includes(s.type)));
}

/** A checkpoint needs at least two modules, so it really mixes topics. */
export const hasCheckpoint = (path: CareerPath, sectionIndex: number) => checkpointModules(path, sectionIndex).length >= 2;

/**
 * Builds the checkpoint as a lesson. Questions are spread evenly across the modules (the same
 * questions every time, so a retake is a fair comparison); `topics` says which module each tests.
 */
export function buildCheckpoint(path: CareerPath, sectionIndex: number): (Lesson & { topics: string[] }) | undefined {
  const mods = checkpointModules(path, sectionIndex);
  if (mods.length < 2) return undefined;
  const perModule = Math.max(1, Math.floor(MAX_QUESTIONS / mods.length));
  const picks = mods.flatMap((m) => {
    const pool = (DRILLS[m] ?? []).map((step, i) => ({ step, key: `drill-${m}#${i}`, m })).filter((p) => CHECKED.includes(p.step.type));
    return optionOrder(`${path.id}:${m}`, pool.length)
      .slice(0, perModule)
      .map((i) => pool[i]);
  });
  const qs = picks.slice(0, MAX_QUESTIONS);
  const section = path.sections[sectionIndex];
  return {
    id: checkpointId(path.id, sectionIndex),
    title: `Checkpoint · ${section.title}`,
    kind: 'practice',
    minutes: qs.length,
    skill: 'python',
    learned: [`Tested ${mods.length} modules from ${section.title}`, 'See which modules to revise', `Pass with ${Math.round(PASS_MARK * 100)}% to mark the section mastered`],
    steps: qs.map((q) => q.step),
    sources: qs.map((q) => q.key),
    topics: qs.map((q) => q.m),
  };
}

export type CheckpointResult = {
  score: number;
  total: number;
  pass: boolean;
  /** Module id → [right first time, asked]. */
  byModule: Record<string, [number, number]>;
  /** Modules with at least one question wrong. */
  weak: string[];
  at: string;
};

/** Scores a checkpoint: a question counts as right only if it was answered right the first time. */
export function scoreCheckpoint(topics: string[], missed: boolean[], at: string): CheckpointResult {
  const byModule: Record<string, [number, number]> = {};
  topics.forEach((m, i) => {
    const row = (byModule[m] ??= [0, 0]);
    row[1]++;
    if (!missed[i]) row[0]++;
  });
  const score = missed.filter((x) => !x).length;
  const total = topics.length;
  return {
    score,
    total,
    pass: total > 0 && score / total >= PASS_MARK,
    byModule,
    weak: Object.entries(byModule)
      .filter(([, [r, n]]) => r < n)
      .map(([m]) => m),
    at,
  };
}
