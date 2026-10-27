// "See it run" for JavaScript: the same frames as the Python trace (trace.ts), made by putting a
// snapshot call in front of every statement line. Lesson code is short, one statement per line and
// ends statements with semicolons, so a line-by-line pass is enough. The app runs the result in its
// JavaScript runner; tests run every traced lesson program and compare it with the plain run.
import { MARK } from './trace';

/** No lesson needs more; an endless loop stops here instead of hanging. */
const MAX_STEPS = 400;

const KEYWORDS = new Set(
  'await break case catch class const constructor continue default delete do else extends false finally for function get if import export in instanceof let new null of return set static super switch this throw true try typeof undefined var void while yield async'.split(' '),
);
const IDENT = /[A-Za-z_$][\w$]*/g;

/** The names a lesson program declares: variables, functions, classes, parameters and caught errors. */
export function declaredNames(code: string[]): string[] {
  const src = code.join('\n');
  const names = new Set<string>();
  const params = (list: string) => {
    for (const p of list.split(',')) for (const m of p.split('=')[0].matchAll(IDENT)) names.add(m[0]);
  };
  for (const m of src.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  for (const m of src.matchAll(/\b(?:const|let|var)\s*[{[]([^}\]]*)[}\]]\s*=/g)) for (const p of m[1].split(',')) params(p.split(':').at(-1)!);
  for (const m of src.matchAll(/\b(?:function|class)\s+([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  for (const m of src.matchAll(/\bfunction\b[^(]*\(([^)]*)\)/g)) params(m[1]);
  for (const m of src.matchAll(/\(([^()]*)\)\s*=>/g)) params(m[1]);
  for (const m of src.matchAll(/([A-Za-z_$][\w$]*)\s*=>/g)) names.add(m[1]);
  for (const m of src.matchAll(/\bcatch\s*\(\s*([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  // Class methods: `add(dish) {` (but not `if (x) {`).
  for (const m of src.matchAll(/^\s*(?:static\s+|async\s+|get\s+|set\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/gm)) if (!['if', 'for', 'while', 'switch', 'catch', 'function'].includes(m[1])) params(m[2]);
  // In the order they first appear, so the panel reads like the code.
  const first = (n: string) => src.search(new RegExp(`(^|[^\\w$])${n.replace(/\$/g, '\\$')}([^\\w$]|$)`));
  return [...names].filter((n) => !KEYWORDS.has(n) && !n.startsWith('__cy')).sort((a, b) => first(a) - first(b));
}

type Open = 'block' | 'class' | 'object' | 'paren' | 'tpl';

/** What a `{` opens, judged by the code just before it. */
function braceKind(before: string): Open {
  const b = before.trimEnd();
  if (/\bclass\s+[\w$]+(\s+extends\s+[\w$.]+)?$/.test(b)) return 'class';
  if (b === '' || /(\)|=>|\belse|\btry|\bfinally|\bdo)$/.test(b)) return 'block';
  return 'object';
}

/** Walks one line, updating the stack of open brackets, and returns the line's code without its comment. */
function scan(line: string, stack: Open[], state: { tpl: boolean }): string {
  let code = '';
  let i = 0;
  let last = '';
  while (i < line.length) {
    const c = line[i];
    if (state.tpl) {
      if (c === '\\') {
        code += line.slice(i, i + 2);
        i += 2;
        continue;
      }
      if (c === '`') state.tpl = false;
      else if (c === '$' && line[i + 1] === '{') {
        stack.push('tpl');
        state.tpl = false;
        code += '${';
        i += 2;
        last = '{';
        continue;
      }
      code += c;
      i++;
      continue;
    }
    if (c === '/' && line[i + 1] === '/') break;
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== c) j += line[j] === '\\' ? 2 : 1;
      code += line.slice(i, j + 1);
      i = j + 1;
      last = 'a';
      continue;
    }
    if (c === '`') {
      state.tpl = true;
      code += c;
      i++;
      continue;
    }
    // A regular expression literal, so braces like {10} inside it are not counted.
    if (c === '/' && (last === '' || '(,=:[!&|?{};'.includes(last))) {
      let j = i + 1;
      let cls = false;
      while (j < line.length && (cls || line[j] !== '/')) {
        if (line[j] === '\\') j++;
        else if (line[j] === '[') cls = true;
        else if (line[j] === ']') cls = false;
        j++;
      }
      code += line.slice(i, j + 1);
      i = j + 1;
      last = 'a';
      continue;
    }
    if (c === '{') stack.push(braceKind(code));
    else if (c === '(' || c === '[') stack.push('paren');
    else if (c === '}') {
      if (stack.pop() === 'tpl') state.tpl = true;
    } else if (c === ')' || c === ']') stack.pop();
    code += c;
    if (c.trim()) last = c;
    i++;
  }
  return code.trim();
}

const NOT_A_START = /^(\}|\)|\]|\.|\?|:|else\b|catch\b|finally\b|case\b|default\b|&&|\|\|)/;

/** The lesson code with a snapshot before every statement line. */
export function instrument(code: string[]): string {
  const names = declaredNames(code);
  const getters = `{${names.map((n) => `${n}:()=>${n}`).join(',')}}`;
  const stack: Open[] = [];
  const state = { tpl: false };
  let prev = '';
  const out = code.map((line, i) => {
    const top = stack.at(-1);
    const t = line.trim();
    const starts = !state.tpl && (top === undefined || top === 'block') && t !== '' && !t.startsWith('//') && !NOT_A_START.test(t) && (prev === '' || /[;{}]$/.test(prev));
    const codePart = scan(line, stack, state);
    if (codePart) prev = codePart;
    return starts ? `__cy_s(${i + 1}, ${getters}); ${line}` : line;
  });
  return [out.join('\n'), getters].join('\u0000');
}

/** The JavaScript program that runs `code` and prints its trace as one line (read it with parseTrace). */
export function traceProgramJs(code: string[]): string {
  const [body, getters] = instrument(code).split('\u0000');
  return `const __cy_frames = [];
const __cy_lines = [];
const __cy_stop = {};
let __cy_cut = false;
let __cy_error = null;
let __cy_final = null;
const __cy_console = console;
const __cy_fmt = (v) => { if (typeof v === 'string') return v; try { return JSON.stringify(v); } catch (e) { return String(v); } };
const __cy_log = (...a) => { __cy_lines.push(a.map(__cy_fmt).join(' ')); };
console = { log: __cy_log, info: __cy_log, warn: __cy_log, error: __cy_log };
const __cy_text = () => __cy_lines.map((l) => l + '\\n').join('');
function __cy_show(v) {
  if (typeof v === 'function') return /^class\\b/.test(Function.prototype.toString.call(v)) ? 'class ' + v.name : 'function ' + v.name;
  if (typeof v === 'string') return JSON.stringify(v);
  if (v === undefined || v === null || typeof v !== 'object') return String(v);
  if (typeof v.then === 'function') return 'Promise';
  if (v instanceof Error) return v.name + ': ' + v.message;
  let s;
  try { s = JSON.stringify(v); } catch (e) { s = '{…}'; }
  const ctor = v.constructor && v.constructor.name;
  if (ctor && ctor !== 'Object' && ctor !== 'Array') s = ctor + ' ' + s;
  return s.length <= 48 ? s : s.slice(0, 45) + '...';
}
function __cy_vars(g) {
  const o = {};
  for (const k in g) {
    try { o[k] = __cy_show(g[k]()); } catch (e) { if (e === __cy_stop) throw e; }
  }
  return o;
}
function __cy_s(line, g) {
  if (__cy_frames.length >= ${MAX_STEPS}) { __cy_cut = true; throw __cy_stop; }
  __cy_frames.push({ line, vars: __cy_vars(g), stack: [], out: __cy_text() });
}
try {
${body}
;__cy_final = __cy_vars(${getters});
} catch (e) {
  if (e !== __cy_stop) __cy_error = e && e.name ? e.name + ': ' + e.message : String(e);
}
const __cy_prev = __cy_frames[__cy_frames.length - 1];
__cy_frames.push({ line: 0, vars: __cy_final || (__cy_prev ? __cy_prev.vars : {}), stack: [], out: __cy_text() });
console = __cy_console;
console.log(${JSON.stringify(MARK)} + JSON.stringify({ frames: __cy_frames, error: __cy_error, cut: __cy_cut }));
`;
}
