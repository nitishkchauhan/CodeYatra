// Keyboard-free coding. Typing on a phone keyboard is slow, and on some Android phones it leaves the
// screen squeezed, so every exercise is answered by tapping instead:
// - buildPuzzle turns a tested solution into code with gaps and a bank of pieces to tap in;
// - tweakables finds the values in a program that a learner can tap to change before running it;
// - predictChoices turns "what does it print?" into a choice between the real output and likely slips.
// Everything here is deterministic (seeded by the step), so tests can check every generated exercise.
import type { CodeLang, Seg } from './types';

export type Tok = { text: string; kind: 'space' | 'comment' | 'string' | 'number' | 'word' | 'op' | 'punct' | 'tag' | 'text' };

const OPS = ['**=', '//=', '>>=', '<<=', '===', '!==', '**', '//', '+=', '-=', '*=', '/=', '%=', '==', '!=', '<=', '>=', '=>', '&&', '||', '->', '<<', '>>', '++', '--', '+', '-', '*', '/', '%', '<', '>', '=', '!', '&', '|', '^', '~', '?'];
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const OP_RE = OPS.map(esc).join('|');

function codeRegex(lang: CodeLang): RegExp {
  const comment = lang === 'python' || lang === 'bash' ? '#.*$' : lang === 'sql' ? '--.*$' : '\\/\\/.*$|\\/\\*.*?\\*\\/';
  // Python's // is floor division, so it is only a comment marker in the C-like languages.
  const ops = lang === 'python' ? OP_RE : OP_RE.replace('\\/\\/=|', '').replace('|\\/\\/', '');
  return new RegExp(`(\\s+)|(${comment})|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`[^\`]*\`)|(\\d+(?:\\.\\d+)?)|([A-Za-z_$][\\w$]*)|(${ops})|(.)`, 'g');
}

const CSS_RE = /(\s+)|(\/\*.*?\*\/)|("[^"]*"|'[^']*')|(#[0-9a-fA-F]{3,8}\b|-?\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr|deg)?)|([A-Za-z_-][\w-]*)|(.)/g;
const HTML_RE = /(\s+)|(<!--.*?-->)|("[^"]*"|'[^']*')|(<\/?|\/?>)|([A-Za-z][\w-]*)|(.)/g;

/** Splits one line into tokens. Joining the texts always gives the line back exactly. */
export function lex(line: string, lang: CodeLang): Tok[] {
  const out: Tok[] = [];
  if (lang === 'css') {
    for (const m of line.matchAll(CSS_RE)) {
      const [t, sp, cm, str, num, word] = m;
      out.push({ text: t, kind: sp ? 'space' : cm ? 'comment' : str ? 'string' : num ? 'number' : word ? 'word' : 'punct' });
    }
    return out;
  }
  if (lang === 'html') {
    let inTag = false;
    for (const m of line.matchAll(HTML_RE)) {
      const [t, sp, cm, str, br, word] = m;
      if (br) inTag = br.startsWith('<');
      const prev = out.at(-1)?.text ?? '';
      out.push({ text: t, kind: sp ? 'space' : cm ? 'comment' : br ? 'punct' : str && inTag ? 'string' : word ? (inTag ? (prev === '<' || prev === '</' ? 'tag' : 'word') : 'text') : inTag ? 'punct' : 'text' });
    }
    return out;
  }
  for (const m of line.matchAll(codeRegex(lang))) {
    const [t, sp, cm, str, num, word, op] = m;
    out.push({ text: t, kind: sp ? 'space' : cm ? 'comment' : str ? 'string' : num ? 'number' : word ? 'word' : op ? 'op' : 'punct' });
  }
  return out;
}

// ── Seeded randomness, so the same exercise always looks the same ──────────────
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rng(seed: string) {
  let a = hash(seed) || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle<T>(items: T[], seed: string): T[] {
  const r = rng(seed);
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const unique = <T,>(items: T[]) => [...new Set(items)];

// ── What makes a good gap ──────────────────────────────────────────────────────
const KEYWORDS: Record<string, string[]> = {
  python: ['for', 'while', 'if', 'elif', 'else', 'return', 'in', 'not', 'and', 'or', 'break', 'continue', 'True', 'False', 'None', 'is', 'raise', 'try', 'except', 'with', 'yield', 'lambda', 'del'],
  javascript: ['for', 'while', 'if', 'else', 'return', 'of', 'in', 'break', 'continue', 'true', 'false', 'null', 'new', 'typeof', 'await', 'async', 'throw', 'const', 'let'],
  sql: ['SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'INNER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'LIKE', 'AS', 'DESC', 'ASC', 'LIMIT', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'UNION', 'BETWEEN', 'OVER', 'PARTITION', 'WITH', 'INSERT', 'UPDATE', 'DELETE', 'SET', 'VALUES', 'INTO', 'ROUND', 'COALESCE'],
  html: [],
  css: [],
};
const SIGNATURE = /^\s*(def |function |async function |class |export |import |from |#include|public |static |module\.exports|const \w+ = (async )?\()/;
const GOOD_OPS = new Set(['**', '//', '+=', '-=', '*=', '/=', '%=', '//=', '==', '!=', '<=', '>=', '===', '!==', '&&', '||', '+', '-', '*', '/', '%', '<', '>', '=>', '++', '--']);

// Pieces that are easy to mix up: the bank offers the others as wrong choices.
const FAMILIES: string[][] = [
  ['<', '<=', '>', '>='],
  ['==', '!=', '='],
  ['===', '!==', '=='],
  ['+=', '-=', '*=', '/='],
  ['//=', '/=', '%='],
  ['+', '-', '*', '/', '%'],
  ['//', '/', '%'],
  ['**', '*'],
  ['++', '--'],
  ['&&', '||'],
  ['and', 'or', 'not'],
  ['True', 'False', 'None'],
  ['true', 'false', 'null'],
  ['for', 'while', 'if'],
  ['if', 'elif', 'else', 'while'],
  ['return', 'break', 'continue', 'print'],
  ['break', 'continue', 'return', 'pass'],
  ['in', 'not', 'is'],
  ['of', 'in'],
  ['const', 'let'],
  ['len', 'sum', 'max', 'min', 'range', 'sorted'],
  ['append', 'extend', 'insert', 'pop'],
  ['push', 'pop', 'shift', 'unshift'],
  ['map', 'filter', 'reduce', 'forEach', 'find'],
  ['keys', 'values', 'items'],
  ['split', 'join', 'strip', 'replace'],
  ['upper', 'lower', 'title'],
  ['toUpperCase', 'toLowerCase', 'trim'],
  ['int', 'str', 'float', 'list'],
  ['Number', 'String', 'parseInt'],
  ['SUM', 'COUNT', 'AVG', 'MAX', 'MIN'],
  ['WHERE', 'HAVING', 'ON'],
  ['GROUP', 'ORDER'],
  ['ASC', 'DESC'],
  ['AND', 'OR'],
  ['LEFT', 'INNER'],
  ['IS', 'IN', 'LIKE', '='],
  ['=>', '->'],
  ['flex', 'grid', 'block', 'none', 'inline'],
  ['center', 'space-between', 'flex-start', 'flex-end'],
  ['bold', 'normal'],
  ['margin', 'padding', 'gap'],
  ['color', 'background', 'border'],
  ['width', 'height'],
  ['href', 'src', 'alt'],
  ['h1', 'h2', 'h3', 'p'],
  ['strong', 'em', 'b', 'i'],
  ['table', 'tr', 'td', 'th'],
  ['form', 'input', 'label', 'button'],
  ['a', 'img', 'link', 'script'],
  ['header', 'nav', 'footer', 'article'],
  ['ul', 'ol', 'li'],
  ['div', 'section', 'main', 'span'],
];

function score(t: Tok, lang: CodeLang, prev: string, next: string): number {
  if (t.kind === 'op') return GOOD_OPS.has(t.text) ? 3 : t.text === '=' ? 1 : 0;
  if (t.kind === 'number') return 2;
  if (t.kind === 'tag') return 3;
  if (t.kind === 'string') return t.text.length <= 12 && lang !== 'html' ? 1 : 0;
  if (t.kind !== 'word') return 0;
  if (lang === 'css') return next === ':' ? 2 : 3; // property names and values
  if (lang === 'html') return next === '=' ? 2 : 0; // attribute names
  if (KEYWORDS[lang]?.includes(t.text)) return 3;
  if (lang === 'sql' && KEYWORDS.sql.includes(t.text.toUpperCase())) return 3;
  if (next === '(' || prev === '.') return 2; // a function or method being called
  if (t.text === 'self' || t.text === 'this' || t.text === 'console' || t.text === 'log') return 0;
  return 1;
}

export type BuildPuzzle = {
  /** The code, line by line, with { gap } where a piece is missing. */
  lines: Seg[][];
  /** The piece that belongs in each gap (from the tested solution). */
  answers: string[];
  /** The bank to tap from: every answer plus believable wrong pieces, shuffled. */
  tokens: string[];
};

/** Puts the chosen pieces back into the code. With the answers it gives back exactly the solution. */
export function assemble(lines: Seg[][], gaps: (string | null)[]): string {
  return lines.map((segs) => segs.map((s) => (typeof s === 'string' ? s : (gaps[s.gap] ?? ''))).join('')).join('\n');
}

/**
 * Turns a tested solution into a tap-to-fill puzzle. Lines that differ from the starter code are where the
 * thinking happens, so gaps go there first; the opening line (the function's name and parameters) stays visible.
 */
export function buildPuzzle(code: string, lang: CodeLang, seed: string, starter = '', maxGaps?: number): BuildPuzzle {
  const src = code.replace(/\n+$/, '');
  const rows = src.split('\n').map((l) => lex(l, lang));
  const starterLines = new Set(starter.split('\n').map((l) => l.trim()));
  const codeRows = rows.map((r, i) => ({ r, i })).filter(({ r }) => r.some((t) => t.kind !== 'space' && t.kind !== 'comment'));
  const limit = maxGaps ?? Math.min(6, Math.max(2, Math.ceil(codeRows.length / 2)));

  type Cand = { line: number; col: number; text: string; kind: Tok['kind']; weight: number };
  const cands: Cand[] = [];
  rows.forEach((toks, line) => {
    const text = toks.map((t) => t.text).join('');
    if ((line === 0 && SIGNATURE.test(text) && rows.length > 1) || /^\s*(import |from \S+ import |#include|require\()/.test(text)) return;
    const changed = starter && !starterLines.has(text.trim()) ? 2 : 0;
    const solid = toks.map((t, col) => ({ t, col })).filter(({ t }) => t.kind !== 'space');
    solid.forEach(({ t, col }, k) => {
      const s = score(t, lang, solid[k - 1]?.t.text ?? '', solid[k + 1]?.t.text ?? '');
      if (s > 0) cands.push({ line, col, text: t.text, kind: t.kind, weight: s + changed + rng(`${seed}:${line}:${col}`)() });
    });
  });
  cands.sort((a, b) => b.weight - a.weight);

  const perLine = new Map<number, number[]>();
  const fewLines = codeRows.length < limit;
  const picked: Cand[] = [];
  for (const c of cands) {
    if (picked.length >= limit) break;
    const cols = perLine.get(c.line) ?? [];
    if (cols.length >= (fewLines ? 2 : 1) || cols.some((x) => Math.abs(x - c.col) <= 2)) continue;
    perLine.set(c.line, [...cols, c.col]);
    picked.push(c);
  }
  picked.sort((a, b) => a.line - b.line || a.col - b.col);

  const answers = picked.map((p) => p.text);
  const lines: Seg[][] = rows.map((toks, line) => {
    const segs: Seg[] = [];
    let buf = '';
    toks.forEach((t, col) => {
      const g = picked.findIndex((p) => p.line === line && p.col === col);
      if (g < 0) buf += t.text;
      else {
        if (buf) segs.push(buf);
        buf = '';
        segs.push({ gap: g });
      }
    });
    if (buf || !segs.length) segs.push(buf);
    return segs;
  });

  // Wrong pieces: mix-ups from the same family, nearby numbers, other names and values from the same code,
  // and whatever the starter code had in that place.
  const allToks = rows.flat();
  const starterRows = starter.split('\n').map((l) => lex(l, lang));
  const distract = (p: Cand): string[] => {
    const out: string[] = [];
    const fam = FAMILIES.filter((f) => f.includes(p.text)).flat();
    out.push(...fam);
    if (/^-?\d+$/.test(p.text)) {
      const n = Number(p.text);
      out.push(String(n + 1), String(Math.max(0, n - 1)), String(n * 2));
    }
    const sameKind = allToks.filter((t) => t.kind === p.kind && t.text !== p.text && t.text.trim());
    out.push(...sameKind.map((t) => t.text));
    const old = starterRows[p.line]?.filter((t) => t.kind !== 'space').map((t) => t.text) ?? [];
    out.push(...old.filter((t) => !src.includes(t)));
    return unique(out).filter((t) => t !== p.text && t.length <= 24 && !/^[()[\]{}:;,.]$/.test(t));
  };
  const pools = picked.map(distract);
  const bank = new Set(answers);
  const wrongTarget = Math.max(3, Math.min(5, 10 - bank.size));
  for (let round = 0, added = 0; added < wrongTarget && round < 6; round++) {
    for (const pool of pools) {
      const pick = shuffle(pool, `${seed}:${round}`).find((t) => !bank.has(t));
      if (pick && added < wrongTarget) {
        bank.add(pick);
        added++;
      }
    }
  }
  return { lines, answers, tokens: shuffle([...bank], `${seed}:bank`) };
}

// ── Tap to change: values a learner can swap in "try it" and the playground ────
export type Tweakable = { line: number; col: number; value: string; options: string[] };

const NAMES = ['Ava', 'Reed', 'Zoey', 'Kaden', 'Megan', 'Arden'];
const CITIES = ['Dublin', 'Paris', 'Jersey', 'Chicago', 'Madrid', 'Athens'];
const COLOURS = ['#4B3FD8', '#FF9F1C', '#0EA5E9', '#16A34A', '#DC2626', '#111827'];
const PRINTS = ['print', 'printf', 'log', 'format'];

/** The name of the function whose brackets token k sits inside, if any. */
function callerOf(texts: string[], k: number): string | null {
  let depth = 0;
  for (let i = k - 1; i >= 0; i--) {
    if (texts[i] === ')' || texts[i] === ']') depth++;
    else if (texts[i] === '(' || texts[i] === '[') {
      if (depth === 0) return texts[i] === '(' ? (texts[i - 1] ?? null) : null;
      depth--;
    }
  }
  return null;
}
const countLiteral = (rows: Tok[][], text: string) => rows.flat().filter((t) => t.text === text).length;

/**
 * Finds up to `max` values worth playing with (numbers, names, cities, true/false, comparisons) and
 * what each can become. Numbers only grow, and never inside a division or an index, so a change
 * can't turn a loop endless or divide by zero (tests run every option of every lesson to make sure).
 */
export function tweakables(code: string, lang: CodeLang, seed: string, max = 4): Tweakable[] {
  const rows = code.split('\n').map((l) => lex(l, lang));
  const found: (Tweakable & { weight: number })[] = [];
  rows.forEach((toks, line) => {
    const solid = toks.map((t, col) => ({ t, col })).filter(({ t }) => t.kind !== 'space' && t.kind !== 'comment');
    solid.forEach(({ t, col }, k) => {
      const prev = solid[k - 1]?.t.text ?? '';
      const next = solid[k + 1]?.t.text ?? '';
      let options: string[] = [];
      if (t.kind === 'number' && lang !== 'css' && /^\d+$/.test(t.text)) {
        const n = Number(t.text);
        // Only values that nothing else depends on: used once, not a step, divisor, index, key or loop bound,
        // and not passed to a function (other than print), where it may be a position or a count.
        const call = callerOf(solid.map((s) => s.t.text), k);
        const lineText = toks.map((x) => x.text).join('');
        const risky =
          ['/', '//', '%', '/=', '//=', '%=', '[', '-', '-=', '+=', '*='].includes(prev) ||
          next === ']' ||
          next === ':' ||
          n < 2 ||
          n > 100000 ||
          countLiteral(rows, t.text) > 1 ||
          (call !== null && !PRINTS.includes(call)) ||
          /^\s*\w+\s*,\s*\w+[^=]*=[^=]/.test(lineText) ||
          /\b(for|while)\b/.test(lineText);
        if (!risky) options = unique([t.text, String(n + 1), String(n * 2), String(n + 10)]);
      } else if (t.kind === 'number' && lang === 'css') {
        const m = t.text.match(/^(\d+)(px|rem|em|%)$/);
        if (m) options = unique([t.text, `${Number(m[1]) * 2}${m[2]}`, `${Math.max(1, Math.round(Number(m[1]) / 2))}${m[2]}`]);
        else if (t.text.startsWith('#')) options = unique([t.text, ...shuffle(COLOURS, `${seed}:${line}`).slice(0, 3)]);
      } else if (t.kind === 'string') {
        const q = t.text[0];
        const inner = t.text.slice(1, -1);
        const call = callerOf(solid.map((s) => s.t.text), k);
        const shown = prev === '=' || (call !== null && PRINTS.includes(call));
        // Cities stay cities; any other one-word name being stored or printed can become another name.
        const pool = CITIES.includes(inner) ? CITIES : NAMES.includes(inner) || (shown && /^[A-Z][a-z]{2,9}$/.test(inner)) ? NAMES : null;
        // A value used twice, or as a dictionary key or index, is looked up somewhere: changing it would break the program.
        const lookedUp = code.split(t.text).length > 2 || prev === '[' || next === ']' || next === ':';
        if (pool && q !== '`' && !lookedUp) options = unique([inner, ...shuffle(pool, `${seed}:${line}:${col}`).slice(0, 3)]).map((v) => `${q}${v}${q}`);
      } else if (t.kind === 'word' && ['True', 'False', 'true', 'false'].includes(t.text)) {
        const flip = { True: 'False', False: 'True', true: 'false', false: 'true' } as Record<string, string>;
        options = [t.text, flip[t.text]];
      } else if (t.kind === 'op' && ['<', '<=', '>', '>='].includes(t.text) && lang !== 'html' && !rows[line].some((x) => x.text === 'while' || x.text === 'for')) {
        const pair = t.text.startsWith('<') ? ['<', '<='] : ['>', '>='];
        options = [t.text, ...pair.filter((o) => o !== t.text)];
      }
      if (options.length > 1) found.push({ line, col, value: t.text, options, weight: (t.kind === 'string' ? 3 : t.kind === 'number' ? 2 : 1) + rng(`${seed}:${line}:${col}`)() });
    });
  });
  return found
    .sort((a, b) => b.weight - a.weight)
    .slice(0, max)
    .sort((a, b) => a.line - b.line || a.col - b.col)
    .map((t) => ({ line: t.line, col: t.col, value: t.value, options: t.options }));
}

/** The code with some values swapped: `choice[i]` is the index into tweakables[i].options. */
export function applyTweaks(code: string, lang: CodeLang, tweaks: Tweakable[], choice: number[]): string {
  const rows = code.split('\n').map((l) => lex(l, lang).map((t) => t.text));
  tweaks.forEach((t, i) => {
    if (choice[i]) rows[t.line][t.col] = t.options[choice[i]];
  });
  return rows.map((r) => r.join('')).join('\n');
}

// ── Predict the output, as a choice ────────────────────────────────────────────
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

/** The real output plus up to three likely slips: an off-by-one, swapped lines, a flipped True/False and so on. */
export function predictChoices(answer: string, accept: string[] = [], seed: string, code: string[] = []): { options: string[]; answer: number } {
  const lines = answer.split('\n');
  const slips: string[] = [];
  const nums = [...answer.matchAll(/-?\d+(?:\.\d+)?/g)];
  const r = rng(seed);
  if (nums.length) {
    const m = nums[Math.floor(r() * nums.length)];
    const at = m.index!;
    const n = Number(m[0]);
    const swap = (v: string) => answer.slice(0, at) + v + answer.slice(at + m[0].length);
    if (m[0].includes('.')) slips.push(swap(String(Math.trunc(n))), swap((n + 1).toFixed(m[0].split('.')[1].length)));
    else slips.push(swap(String(n + 1)), swap(String(n - 1)));
    if (nums.length > 1) {
      const other = nums.find((x) => x[0] !== m[0]);
      if (other) slips.push(swap(other[0]));
    }
  }
  if (lines.length > 1) {
    slips.push([...lines].reverse().join('\n'));
    slips.push(lines.slice(0, -1).join('\n'));
    slips.push(lines.join(' '));
  }
  const flips: [RegExp, string][] = [
    [/\bTrue\b/, 'False'],
    [/\bFalse\b/, 'True'],
    [/\btrue\b/, 'false'],
    [/\bfalse\b/, 'true'],
    [/\bNone\b/, '0'],
    [/\bundefined\b/, 'null'],
  ];
  for (const [re, to] of flips) if (re.test(answer)) slips.push(answer.replace(re, to));
  const list = answer.match(/^\[(.*)\]$/);
  if (list && list[1].includes(',')) slips.push(`[${list[1].split(', ').reverse().join(', ')}]`);
  if (/'/.test(answer)) slips.push(answer.replace(/'/g, ''));
  if (/Error/.test(answer)) {
    for (const e of ['TypeError', 'NameError', 'ValueError', 'IndexError', 'KeyError']) if (!answer.includes(e)) slips.push(answer.replace(/\w*Error/, e));
  }
  const words = answer.split(' ');
  if (lines.length === 1 && words.length > 1) slips.push([...words].reverse().join(' '));
  // For one-line outputs, the other values in the code are natural wrong guesses ("Fail" next to "Pass").
  if (lines.length === 1) {
    const literals = code.flatMap((l) => [...l.matchAll(/"([^"\n]{1,30})"|'([^'\n]{1,30})'/g)].map((m) => m[1] ?? m[2]));
    slips.push(...literals.filter((v) => v.trim() && !/[{}%\\]/.test(v)));
  }
  if (!/Error/.test(answer)) slips.push('An error');
  slips.push('Nothing is printed');

  const taken = new Set([answer, ...accept].map(norm));
  const wrong: string[] = [];
  for (const s of slips) {
    if (wrong.length >= 3) break;
    if (!s.trim() || taken.has(norm(s))) continue;
    taken.add(norm(s));
    wrong.push(s);
  }
  const options = shuffle([answer, ...wrong], `${seed}:options`);
  return { options, answer: options.indexOf(answer) };
}
