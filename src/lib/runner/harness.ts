import { sqlProgram } from '@/content/sqlFixture';

// Wraps learner code with tests and reads the results back out of the output.

export type RunLang = 'python' | 'javascript';
/** Exercise languages: SQL is turned into a Python program before running. */
export type ExerciseLang = RunLang | 'sql';

export const runtimeOf = (lang: ExerciseLang): RunLang => (lang === 'sql' ? 'python' : lang);
export type EditorTest = { call: string; expect: string } | { stdout: string };
export type TestResult = { label: string; ok: boolean; got?: string; error?: string };

const MARKER = '__CY_RESULTS__';

export function buildProgram(lang: ExerciseLang, code: string, tests: EditorTest[]): string {
  if (lang === 'sql') return sqlProgram(code);
  const calls = tests.filter((t): t is { call: string; expect: string } => 'call' in t).map((t) => [t.call, t.expect]);
  if (!calls.length) return code;
  if (lang === 'python') {
    return `${code}

import json as __cy_json
__cy_results = []
for __cy_call, __cy_expect in ${JSON.stringify(calls)}:
    try:
        __cy_got = eval(__cy_call)
        __cy_results.append([__cy_call, __cy_expect, repr(__cy_got), __cy_got == eval(__cy_expect), ""])
    except Exception as __cy_e:
        __cy_results.append([__cy_call, __cy_expect, "", False, type(__cy_e).__name__ + ": " + str(__cy_e)])
print("${MARKER}" + __cy_json.dumps(__cy_results))
`;
  }
  return `${code}
;(() => {
  const __r = [];
  for (const [c, e] of ${JSON.stringify(calls)}) {
    try {
      const g = eval(c);
      const w = eval(e);
      __r.push([c, e, JSON.stringify(g), JSON.stringify(g) === JSON.stringify(w), '']);
    } catch (err) {
      __r.push([c, e, '', false, err.name + ': ' + err.message]);
    }
  }
  console.log('${MARKER}' + JSON.stringify(__r));
})();
`;
}

export function readResults(tests: EditorTest[], output: string[]): { output: string[]; results: TestResult[] } {
  const visible = output.filter((l) => !l.startsWith(MARKER));
  const line = output.find((l) => l.startsWith(MARKER));
  const rows: [string, string, string, boolean, string][] = line ? JSON.parse(line.slice(MARKER.length)) : [];
  const results: TestResult[] = [];
  for (const t of tests) {
    if ('stdout' in t) {
      const got = visible.join('\n').trim();
      results.push({ label: 'Prints the expected output', ok: got === t.stdout.trim(), got: got || '(nothing)' });
    } else {
      const row = rows.find((r) => r[0] === t.call && r[1] === t.expect);
      results.push({
        label: `${t.call} == ${t.expect}`,
        ok: !!row?.[3],
        got: row?.[2] || undefined,
        error: row ? row[4] || undefined : 'Test did not run',
      });
    }
  }
  return { output: visible, results };
}
