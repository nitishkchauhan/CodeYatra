// Test-only helpers that really run lesson code, so every answer we teach is verified.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { sqlProgram } from '../sqlFixture';

function find(cmds: string[], args: string[]): string | null {
  for (const cmd of cmds) {
    try {
      execFileSync(cmd, args, { stdio: 'ignore' });
      return cmd;
    } catch {
      // try the next name
    }
  }
  return null;
}

export const python = find(['python3', 'python', 'py'], ['--version']);
export const gcc = find(['gcc', 'cc', 'clang'], ['--version']);

const tmp = () => mkdtempSync(join(tmpdir(), 'cy-'));
const lines = (s: string) => s.replace(/\r/g, '').trimEnd().split('\n');

export function runJs(code: string): string[] {
  const out: string[] = [];
  const log = (...a: unknown[]) => out.push(a.map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join(' '));
  new Function('console', code)({ log, info: log, warn: log, error: log });
  return out;
}

export function runPy(code: string): string[] {
  const file = join(tmp(), 'main.py');
  writeFileSync(file, code);
  try {
    return lines(execFileSync(python!, [file], { encoding: 'utf8' }));
  } catch (e) {
    return lines(String((e as { stdout?: string }).stdout ?? ''));
  }
}

export function runC(code: string): string[] {
  const dir = tmp();
  const src = join(dir, 'main.c');
  const exe = join(dir, process.platform === 'win32' ? 'main.exe' : 'main');
  writeFileSync(src, code);
  execFileSync(gcc!, [src, '-o', exe, '-lm'], { stdio: 'pipe' });
  return lines(execFileSync(exe, { encoding: 'utf8' }));
}

export const runSql = (query: string) => runPy(sqlProgram(query));

/** Output of a snippet in a language we can run here, or null if we can't run it. */
export function outputOf(lang: string, code: string): string[] | null {
  if (lang === 'javascript') return runJs(code);
  if (lang === 'python') return python ? runPy(code) : null;
  if (lang === 'c') return gcc ? runC(code) : null;
  if (lang === 'sql') return python ? runSql(code) : null;
  return null;
}
