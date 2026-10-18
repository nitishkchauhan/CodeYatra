// Test-only helpers that really run lesson code, so every answer we teach is verified.
import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

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

// Each run gets its own folder (lessons write files) and UTF-8 output (lessons print ₹).
const PY_ENV = { ...process.env, PYTHONIOENCODING: 'utf-8' };

export function runPy(code: string): string[] {
  const file = join(tmp(), 'main.py');
  writeFileSync(file, code);
  try {
    return lines(execFileSync(python!, [file], { encoding: 'utf8', cwd: dirname(file), env: PY_ENV, timeout: 15000 }));
  } catch (e) {
    return lines(String((e as { stdout?: string }).stdout ?? ''));
  }
}

/** Runs Python and keeps everything: stdout lines, the last stderr line (the error) and the exit code. */
export function runPyFull(code: string): { output: string[]; error: string; code: number | null } {
  const file = join(tmp(), 'main.py');
  writeFileSync(file, code);
  const r = spawnSync(python!, [file], { encoding: 'utf8', cwd: dirname(file), env: PY_ENV, timeout: 10000 });
  const err = lines(r.stderr ?? '').filter(Boolean);
  return { output: lines(r.stdout ?? '').filter((l, i, a) => l || i < a.length - 1), error: err.at(-1) ?? '', code: r.status };
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

export const git = find(['git'], ['--version']);

// Git runs with no user or system config, a fixed identity and main as the first branch,
// so lessons see the same messages on every machine.
const GIT_ENV = {
  ...process.env,
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_CONFIG_GLOBAL: process.platform === 'win32' ? 'NUL' : '/dev/null',
  GIT_AUTHOR_NAME: 'Asha',
  GIT_AUTHOR_EMAIL: 'asha@example.com',
  GIT_COMMITTER_NAME: 'Asha',
  GIT_COMMITTER_EMAIL: 'asha@example.com',
  GIT_CONFIG_COUNT: '3',
  GIT_CONFIG_KEY_0: 'init.defaultBranch',
  GIT_CONFIG_VALUE_0: 'main',
  GIT_CONFIG_KEY_1: 'core.autocrlf',
  GIT_CONFIG_VALUE_1: 'false',
  GIT_CONFIG_KEY_2: 'advice.defaultBranchName',
  GIT_CONFIG_VALUE_2: 'false',
  LANG: 'C',
  LC_ALL: 'C',
};

/** Splits a command line on spaces, keeping "quoted text" together. */
function words(line: string): string[] {
  return [...line.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3]);
}

/**
 * Runs a lesson's shell lines in a fresh folder, beside an empty bare repository at ../origin.git.
 * `lastOk` says whether the final git command succeeded (a fix may follow a merge that stopped on a conflict).
 * Supports git, echo "text" > file (or >>), mkdir and cd. Returns everything printed and whether every command succeeded.
 */
export function runGit(script: string): { output: string; ok: boolean; lastOk: boolean } {
  const root = tmp();
  execFileSync(git!, ['init', '-q', '--bare', 'origin.git'], { cwd: root, env: GIT_ENV });
  let cwd = join(root, 'work');
  mkdirSync(cwd);
  const out: string[] = [];
  let ok = true;
  let lastOk = true;
  for (const raw of script.split('\n')) {
    const line = raw.replace(/\s+#.*$/, '').trim();
    if (!line || line.startsWith('#')) continue;
    const echo = line.match(/^echo\s+(?:"([^"]*)"|'([^']*)'|(\S+))\s*(>>?)\s*(\S+)$/);
    if (echo) {
      const text = `${echo[1] ?? echo[2] ?? echo[3]}\n`;
      const file = join(cwd, echo[5]);
      if (echo[4] === '>>') appendFileSync(file, text);
      else writeFileSync(file, text);
      continue;
    }
    const [cmd, ...args] = words(line);
    if (cmd === 'mkdir') {
      mkdirSync(join(cwd, args[0]), { recursive: true });
      continue;
    }
    if (cmd === 'cd') {
      cwd = join(cwd, args[0]);
      continue;
    }
    if (cmd !== 'git') throw new Error(`runGit can't run: ${line}`);
    const r = spawnSync(git!, args, { cwd, env: GIT_ENV, encoding: 'utf8', timeout: 15000 });
    out.push(`${r.stdout ?? ''}${r.stderr ?? ''}`.trimEnd());
    lastOk = r.status === 0;
    if (!lastOk) ok = false;
  }
  return { output: out.filter(Boolean).join('\n'), ok, lastOk };
}

/** Output of a snippet in a language we can run here, or null if we can't run it. */
export function outputOf(lang: string, code: string): string[] | null {
  if (lang === 'javascript') return runJs(code);
  if (lang === 'python') return python ? runPy(code) : null;
  if (lang === 'c') return gcc ? runC(code) : null;
  if (lang === 'sql') return python ? runSql(code) : null;
  return null;
}
