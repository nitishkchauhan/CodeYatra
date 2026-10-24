import { sqlProgram } from '@/content/sqlFixture';

// Wraps learner code with tests and reads the results back out of the output.

export type RunLang = 'python' | 'javascript';
/** Exercise languages: SQL is turned into a Python program before running. */
export type ExerciseLang = RunLang | 'sql';

export const runtimeOf = (lang: ExerciseLang): RunLang => (lang === 'sql' ? 'python' : lang);
/** `unordered` compares output lines as a set, for SQL results without ORDER BY. */
/** `raises` expects the call to fail with exactly that error, e.g. "ValueError: name is required". */
export type EditorTest = { call: string; expect: string } | { call: string; raises: string } | { stdout: string; unordered?: boolean };
export type TestResult = { label: string; ok: boolean; got?: string; error?: string };

const MARKER = '__CY_RESULTS__';

export function buildProgram(lang: ExerciseLang, code: string, tests: EditorTest[]): string {
  if (lang === 'sql') return sqlProgram(code);
  // Each call is [code, expected value, expected error]: one of the last two is empty.
  const calls = tests.flatMap((t) => ('expect' in t ? [[t.call, t.expect, '']] : 'raises' in t ? [[t.call, '', t.raises]] : []));
  if (!calls.length) return code;
  if (lang === 'python') {
    return `${code}

import json as __cy_json
__cy_results = []
for __cy_call, __cy_expect, __cy_raises in ${JSON.stringify(calls)}:
    try:
        __cy_got = eval(__cy_call)
        __cy_ok = (not __cy_raises) and __cy_got == eval(__cy_expect)
        __cy_results.append([__cy_call, __cy_expect or __cy_raises, repr(__cy_got), __cy_ok, ""])
    except Exception as __cy_e:
        __cy_err = type(__cy_e).__name__ + ": " + str(__cy_e)
        __cy_results.append([__cy_call, __cy_expect or __cy_raises, "", __cy_err == __cy_raises, "" if __cy_err == __cy_raises else __cy_err])
print("${MARKER}" + __cy_json.dumps(__cy_results))
`;
  }
  return `${code}
;(() => {
  const __r = [];
  for (const [c, e, x] of ${JSON.stringify(calls)}) {
    try {
      const g = eval(c);
      __r.push([c, e || x, JSON.stringify(g), !x && JSON.stringify(g) === JSON.stringify(eval(e)), '']);
    } catch (err) {
      const m = err.name + ': ' + err.message;
      __r.push([c, e || x, '', m === x, m === x ? '' : m]);
    }
  }
  console.log('${MARKER}' + JSON.stringify(__r));
})();
`;
}

const sortLines = (s: string) => s.split('\n').map((l) => l.trim()).sort().join('\n');

export function readResults(tests: EditorTest[], output: string[]): { output: string[]; results: TestResult[] } {
  const visible = output.filter((l) => !l.startsWith(MARKER));
  const line = output.find((l) => l.startsWith(MARKER));
  const rows: [string, string, string, boolean, string][] = line ? JSON.parse(line.slice(MARKER.length)) : [];
  const results: TestResult[] = [];
  for (const t of tests) {
    if ('stdout' in t) {
      const got = visible.join('\n').trim();
      const same = t.unordered ? sortLines(got) === sortLines(t.stdout.trim()) : got === t.stdout.trim();
      results.push({ label: t.unordered ? 'Returns the expected rows' : 'Prints the expected output', ok: same, got: got || '(nothing)' });
    } else {
      const want = 'expect' in t ? t.expect : t.raises;
      const row = rows.find((r) => r[0] === t.call && r[1] === want);
      results.push({
        label: 'expect' in t ? `${t.call} == ${t.expect}` : `${t.call} raises ${t.raises}`,
        ok: !!row?.[3],
        got: row?.[2] || undefined,
        error: row ? row[4] || undefined : 'Test did not run',
      });
    }
  }
  return { output: visible, results };
}
