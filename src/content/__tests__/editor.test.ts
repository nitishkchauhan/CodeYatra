import { describe, expect, it } from '@jest/globals';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { allLessons, type EditorStep } from '..';
import { buildProgram, readResults, runtimeOf } from '@/lib/runner/harness';

const steps = allLessons()
  .flatMap((l) => l.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => [`${l.id}: ${s.title}`, s] as const))
  // The same exercise can appear in a lesson and in practice; test it once.
  .filter(([, s], i, all) => all.findIndex(([, o]) => o === s) === i);

function runJs(code: string): string[] {
  const out: string[] = [];
  const log = (...a: unknown[]) => out.push(a.map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join(' '));
  new Function('console', code)({ log, info: log, warn: log, error: log });
  return out;
}

const python = (() => {
  for (const cmd of ['python3', 'python', 'py']) {
    try {
      execFileSync(cmd, ['--version'], { stdio: 'ignore' });
      return cmd;
    } catch {
      // try the next name
    }
  }
  return null;
})();

function runPy(code: string): string[] {
  const dir = mkdtempSync(join(tmpdir(), 'cy-'));
  const file = join(dir, 'main.py');
  writeFileSync(file, code);
  try {
    return execFileSync(python!, [file], { encoding: 'utf8' }).trimEnd().split(/\r?\n/);
  } catch (e) {
    return String((e as { stdout?: string }).stdout ?? '').trimEnd().split(/\r?\n/);
  }
}

const run = (step: EditorStep, code: string) => {
  const program = buildProgram(step.lang, code, step.tests);
  return readResults(step.tests, runtimeOf(step.lang) === 'python' ? runPy(program) : runJs(program)).results;
};

describe('code editor exercises', () => {
  it('has exercises in both languages', () => {
    expect(steps.some(([, s]) => s.lang === 'python')).toBe(true);
    expect(steps.some(([, s]) => s.lang === 'javascript')).toBe(true);
  });

  it.each(steps)('%s passes every test with its solution', (_, step) => {
    if (runtimeOf(step.lang) === 'python' && !python) return; // CI without Python: JS still runs
    const results = run(step, step.solution);
    expect(results.filter((r) => !r.ok)).toEqual([]);
  });

  it.each(steps)('%s does not pass with the starter code', (_, step) => {
    if (runtimeOf(step.lang) === 'python' && !python) return;
    let results;
    try {
      results = run(step, step.starter);
    } catch {
      return; // the starter throws: clearly not passing
    }
    expect(results.every((r) => r.ok)).toBe(false);
  });
});
