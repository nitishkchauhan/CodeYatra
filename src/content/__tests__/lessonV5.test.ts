import { describe, expect, it } from '@jest/globals';
import { JSDOM } from 'jsdom';

import { allLessons, getLesson, isTeaching, STAGES, v5Lang, type Lesson, type Step, type TapAction } from '..';
import { sqlTableProgram } from '../sqlFixture';
import { runPage } from '../testing/page';
import { runJs, runPyFull } from '../testing/run';
import { parseTrace, traceProgram } from '../trace';
import { traceProgramJs } from '../traceJs';
import { withAssets } from '@/lib/web/assets';
import { bodyToScreen, cssAtWidth, vwAt, widthQueryMatches } from '@/lib/web/media';
import { fillSlots } from '@/lib/web/page';

// Lesson v5 (the HTML, CSS and JavaScript tracks): every screen gives the learner something to do, and every answer is checked here.
const v5: Lesson[] = allLessons().filter((l) => l.format === 'v5');
const all = v5.flatMap((l) => l.steps.map((s, i) => [`${l.id}#${i}`, s] as const));
const of = <T extends Step['type']>(type: T) => all.filter(([, s]) => s.type === type) as unknown as [string, Extract<Step, { type: T }>][];
const rows = <R,>(r: R[]): R[] => (r.length ? r : ([['(none)', null]] as unknown as R[]));
// Steps run in their lesson's language: Python with real Python, SQL through Python's sqlite3, the rest as JavaScript.
const stepLang = new Map<string, ReturnType<typeof v5Lang>>(v5.flatMap((l) => l.steps.map((_, i) => [`${l.id}#${i}`, v5Lang(l.skill)] as const)));
const dom = (html: string) => new JSDOM(`<!doctype html><body>${html}</body>`).window.document;

describe.each([
  ['html', 17],
  ['css', 20],
  ['js', 21],
  ['node', 17],
  ['sql', 16],
  ['git', 14],
  ['dsa', 12],
  ['react', 19],
  ['next', 16],
])('the %s track (Lesson v5)', (id, modules) => {
  const track = STAGES.find((s) => s.id === id)!;
  it(`has ${modules} modules, each ending with its Challenge`, () => {
    expect(track.units).toHaveLength(modules);
    for (const u of track.units) {
      const last = getLesson(u.lessons.at(-1)!.id)!;
      expect(last.badge).toBeDefined();
      for (const r of u.lessons) expect(getLesson(r.id)?.format).toBe('v5');
    }
  });
});

describe('every Lesson v5 lesson', () => {
  it.each(v5.filter((l) => !l.badge).map((l) => [l.id, l] as const))('%s: short screens, something to do, a recap at the end', (_, l) => {
    expect(l.steps.length).toBeGreaterThanOrEqual(6);
    expect(l.steps.length).toBeLessThanOrEqual(11);
    expect(l.steps.at(-1)!.type).toBe('recap');
    expect(l.steps.some((s) => !isTeaching(s))).toBe(true);
    expect(l.learned.length).toBeGreaterThanOrEqual(3);
    // Never more than two read-only screens in a row (chat is the only one that is just reading).
    const reading = l.steps.map((s) => s.type === 'chat');
    expect(reading.some((r, i) => r && reading[i + 1] && reading[i + 2])).toBe(false);
  });

  it.each(v5.filter((l) => l.badge && !l.exam).map((l) => [l.id, l] as const))('%s: 5 questions, then the 6 tasks in order', (_, l) => {
    const types = l.steps.map((s) => s.type);
    expect(types.slice(0, 5)).toEqual(['quiz', 'quiz', 'quiz', 'quiz', 'quiz']);
    expect(types.slice(5, 9)).toEqual(['swipe', 'match', 'quiz', 'tapbug']);
    // Task 5: X-ray on a page, or (JavaScript) predict what a program prints.
    expect(['xray', 'trace']).toContain(types[9]);
    if (types[9] === 'trace') expect((l.steps[9] as Extract<Step, { type: 'trace' }>).ask).toBeDefined();
    // Task 6: arrange, or the final project (web pages, or Python in the code editor).
    expect(['arrange', 'web', 'editor']).toContain(types[10]);
  });

  it.each(v5.filter((l) => l.exam).map((l) => [l.id, l] as const))('%s: a final test of at least 20 different questions', (_, l) => {
    expect(l.steps.length).toBeGreaterThanOrEqual(20);
    expect(l.steps.every((s) => s.type === 'quiz')).toBe(true);
    const prompts = l.steps.map((s) => (s.type === 'quiz' ? s.prompt : ''));
    expect(new Set(prompts).size).toBe(prompts.length);
  });

  it('uses no Hindi words', () => {
    expect(JSON.stringify(v5)).not.toMatch(/\b(namaste|chai|chalo|arre|accha|thali|poha|samosa|roti|sabzi|rajma|chawal|dal|bhai|didi|masala|tiffin|chutney|paneer|ji)\b/i);
  });
});

describe('Lesson v5 screens', () => {
  it.each(rows(of('tapbug')))('%s: every bug is really on its line, once', (_, s) => {
    if (!s) return;
    for (const b of s.bugs) {
      const line = s.code[b.line - 1];
      expect(line).toBeDefined();
      expect(line.split(b.text).length - 1).toBe(1);
      expect(b.fix).not.toBe(b.text);
    }
  });

  it.each(rows(of('place')))('%s: one right piece per gap, all of them offered', (_, s) => {
    if (!s) return;
    const gaps = s.lines.flat().filter((g) => typeof g !== 'string').length;
    expect(s.answer).toHaveLength(gaps);
    // A piece may be needed twice (two <br>s), so it must be offered as many times as it is needed.
    const count = (xs: string[], x: string) => xs.filter((y) => y === x).length;
    for (const a of s.answer) expect(count(s.pieces, a)).toBeGreaterThanOrEqual(count(s.answer, a));
  });

  it.each(rows(of('explore')))('%s: notes point at real lines and real parts of the page', async (_, s) => {
    if (!s) return;
    // A React page is checked once React has drawn it.
    const doc = s.page?.react || s.page?.next || s.page?.node || s.page?.git ? (await runPage(s.page, 900)).window.document : dom((s.page ?? { html: s.code.join('\n') }).html);
    for (const n of s.notes) {
      expect(n.line).toBeGreaterThanOrEqual(1);
      expect(n.line).toBeLessThanOrEqual(s.code.length);
      if (n.select) expect(doc.querySelector(n.select)).not.toBeNull();
    }
  });

  it.each(rows(of('xray')))('%s: every part is on the page and its answer is offered', (_, s) => {
    if (!s) return;
    const doc = dom(s.page.html);
    for (const p of s.parts) {
      expect(doc.querySelector(p.select)).not.toBeNull();
      expect(p.options).toContain(p.answer);
      expect(new Set(p.options).size).toBe(p.options.length);
    }
  });

  it.each(rows(of('live')))('%s: one value to change, at least two to try', (_, s) => {
    if (!s) return;
    expect(s.code.join('\n').split('{{v}}').length - 1).toBe(1);
    expect(new Set(s.choices).size).toBeGreaterThanOrEqual(2);
  });

  it.each(rows(of('toggle')))('%s: at least two versions to switch between', (_, s) => {
    if (!s) return;
    expect(s.views.length).toBeGreaterThanOrEqual(2);
    expect(new Set(s.views.map((v) => v.label)).size).toBe(s.views.length);
  });

  it.each(rows(of('arrange')))('%s: blocks are distinct, so only one order is right', (_, s) => {
    if (!s) return;
    expect(s.blocks.length).toBeGreaterThanOrEqual(3);
    expect(new Set(s.blocks).size).toBe(s.blocks.length);
  });

  it.each(rows(of('copy')))('%s: copy the look has a reachable target that isn’t shown at the start', (_, s) => {
    if (!s) return;
    s.controls.forEach((c, i) => {
      expect(s.css.split(`{{${i}}}`).length - 1).toBeGreaterThanOrEqual(1);
      expect(c.choices).toContain(c.answer);
      expect(new Set(c.choices).size).toBe(c.choices.length);
    });
    expect(s.controls.some((c) => c.choices[0] !== c.answer)).toBe(true);
    expect(fillSlots(s.css, s.controls.map((c) => c.answer))).not.toMatch(/\{\{\d+\}\}/);
  });

  it.each(rows(of('resize')))('%s: the layout really changes between the narrowest and widest screen', (_, s) => {
    if (!s) return;
    const css = s.page.css ?? '';
    const [narrow, wide] = [s.widths[0], s.widths.at(-1)!];
    expect(s.widths).toEqual([...s.widths].sort((x, y) => x - y));
    // Either a width query switches, or the layout is fluid (vw, clamp, auto-fill, wrap).
    const switches = cssAtWidth(css, narrow) !== cssAtWidth(css, wide);
    expect(switches || /vw|clamp\(|auto-fill|auto-fit|flex-wrap:\s*wrap|@container/.test(css)).toBe(true);
  });

  it.each(rows(of('arrange').filter(([, s]) => s.html !== undefined)))('%s: CSS blocks are whole rules', (_, s) => {
    if (!s) return;
    for (const b of s.blocks) expect(b.split('{').length).toBe(b.split('}').length);
  });

  it.each(rows(of('swipe')))('%s: a mix of true and false', (_, s) => {
    if (!s) return;
    expect(s.cards.some((c) => c.answer)).toBe(true);
    expect(s.cards.some((c) => !c.answer)).toBe(true);
  });

  it.each(rows(all.filter(([, s]) => s.type === 'quiz')))('%s: distinct options', (_, s) => {
    if (!s || s.type !== 'quiz') return;
    expect(new Set(s.options).size).toBe(s.options.length);
  });
});

/** Runs a program like the app's console does, and keeps a thrown error as the last line. */
const tryJs = (code: string): { out: string[]; error?: string } => {
  try {
    return { out: runJs(code) };
  } catch (e) {
    return { out: [], error: String(e) };
  }
};

/** Runs a step's program in its lesson's language (Python lessons with real Python). */
const tryCode = (key: string, code: string): { out: string[]; error?: string } => {
  const lang = stepLang.get(key);
  if (lang !== 'python' && lang !== 'sql') return tryJs(code);
  const r = runPyFull(lang === 'sql' ? sqlTableProgram(code) : code);
  return r.error ? { out: r.output, error: r.error } : { out: r.output };
};

/** Does what a learner would do in the page: tap, type or send a form. */
const act = (w: Awaited<ReturnType<typeof runPage>>["window"], a: TapAction) => {
  const d = w.document;
  if ('click' in a) d.querySelector<HTMLElement>(a.click)!.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  else if ('type' in a) {
    const el = d.querySelector<HTMLInputElement>(a.type[0])!;
    // The native setter, as real typing does, so React sees the change too.
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')!.set!.call(el, a.type[1]);
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
  } else d.querySelector<HTMLFormElement>(a.submit)!.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
};

describe('Lesson v5 JavaScript screens', () => {
  it.each(rows(of('run')))('%s: every value runs, and the target can be reached', (key, s) => {
    if (!s) return;
    expect(s.code.join('\n').split('{{v}}').length - 1).toBe(1);
    expect(new Set(s.choices).size).toBeGreaterThanOrEqual(2);
    const runs = s.choices.map((c) => tryCode(key, s.code.join('\n').replace('{{v}}', c)));
    // A value may cause an error on purpose, but the first one (shown at the start) always runs.
    expect(runs[0].error).toBeUndefined();
    expect(runs[0].out.length).toBeGreaterThan(0);
    if (s.goal) {
      expect(runs[0].out).not.toContain(s.goal);
      expect(runs.some((r) => r.out.includes(s.goal!))).toBe(true);
    }
  });

  it.each(rows(of('tappage')))('%s: the page runs, and the demo taps reach the goal', async (_, s) => {
    if (!s) return;
    const live = s.page.react || s.page.next || s.page.node || s.page.git;
    const { logs, window } = await runPage({ html: s.page.html, css: s.page.css, js: s.page.js, pages: s.page.pages, current: s.page.current, react: s.page.react, next: s.page.next, node: s.page.node, git: s.page.git }, live ? 900 : 0);
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(logs.some((l) => l.text.includes(s.goal))).toBe(false);
    // A short pause between taps, like a real user, so a React page can draw again in between.
    for (const a of s.demo) {
      act(window, a);
      // A Next.js page moves to another address after a tap, so it gets longer (typing needs no wait).
      if (live) await new Promise((r) => setTimeout(r, (s.page.next || s.page.node) && !('type' in a) ? 700 : 40));
    }
    await new Promise((r) => setTimeout(r, 1300));
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(logs.map((l) => l.text).some((t) => t.includes(s.goal))).toBe(true);
    // A Node.js program that crashed shows Node’s last line; only lessons about errors may crash.
    if (s.page.node && !/Error/.test(s.goal)) expect(window.document.getElementById('root')?.textContent).not.toContain('Node.js v22.11.0 (');
  }, 15000);

  it.each(rows(of('toggle').filter(([, s]) => s.views.some((v) => v.out))))('%s: each version prints what it says', (key, s) => {
    if (!s) return;
    for (const v of s.views) {
      const r = tryCode(key, v.code.join('\n'));
      expect(r.error ? [...r.out, r.error] : r.out).toEqual(v.out);
    }
  });

  it.each(rows(of('place').filter(([, s]) => s.run)))('%s: the finished program runs', (key, s) => {
    if (!s) return;
    const code = s.lines.map((segs) => segs.map((g) => (typeof g === 'string' ? g : s.answer[g.gap])).join('')).join('\n');
    const r = tryCode(key, code);
    expect(r.error).toBeUndefined();
    expect(r.out.length).toBeGreaterThan(0);
  });

  it.each(rows(of('arrange').filter(([, s]) => s.node)))('%s: the Node.js blocks in order run without crashing', async (_, s) => {
    if (!s) return;
    const { logs, window } = await runPage({ html: '', js: s.blocks.join('\n'), node: s.node }, 1000);
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(window.document.getElementById('root')?.textContent).not.toContain('Node.js v22.11.0 (');
  });

  it.each(rows(of('web').filter(([, s]) => s.node)))('%s: the Node.js project runs its starter and its solution without crashing', async (_, s) => {
    if (!s) return;
    for (const files of [s.starter, s.solution]) {
      const { logs, window } = await runPage({ html: '', js: files.js, node: s.node }, 1000);
      expect(logs.filter((l) => l.level === 'error')).toEqual([]);
      expect(window.document.getElementById('root')?.textContent).not.toContain('Node.js v22.11.0 (');
    }
  });

  it.each(rows(of('arrange').filter(([, s]) => s.git)))('%s: the Git commands in order run without an error', async (_, s) => {
    if (!s) return;
    const { window } = await runPage({ html: '', git: { ...s.git, before: [...(s.git!.before ?? []), ...s.blocks] } }, 300);
    const out = Array.from(window.document.querySelectorAll('.cy-line')).map((d) => d.textContent ?? '');
    expect(out.filter((l) => /^(fatal|error):|command not found/.test(l))).toEqual([]);
  });

  it.each(rows(of('arrange').filter(([, s]) => s.next)))('%s: the Next.js blocks in order draw the app without an error', async (_, s) => {
    if (!s) return;
    const { logs, window } = await runPage({ html: '', css: s.css, js: s.blocks.join('\n'), next: s.next }, 1200);
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(window.document.querySelector('#root')?.textContent?.trim()).not.toBe('');
  });

  it.each(rows(of('web').filter(([, s]) => s.next)))('%s: the Next.js project draws its starter and its solution without an error', async (_, s) => {
    if (!s) return;
    for (const files of [s.starter, s.solution]) {
      const { logs, window } = await runPage({ html: '', css: files.css, js: files.js, next: s.next }, 1200);
      expect(logs.filter((l) => l.level === 'error')).toEqual([]);
      expect(window.document.querySelector('#root')?.textContent?.trim()).not.toBe('');
    }
  });

  it.each(rows(of('arrange').filter(([, s]) => s.react)))('%s: the React blocks in order draw the page without an error', async (_, s) => {
    if (!s) return;
    const { logs, window } = await runPage({ html: s.html ?? '<div id="root"></div>', css: s.css, js: s.blocks.join('\n'), react: true }, 800);
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(window.document.querySelector('#root')?.textContent?.trim()).not.toBe('');
  });

  it.each(rows(of('web').filter(([, s]) => s.react)))('%s: the React project draws its starter and its solution without an error', async (_, s) => {
    if (!s) return;
    for (const files of [s.starter, s.solution]) {
      const { logs, window } = await runPage({ html: files.html, css: files.css, js: files.js, react: true }, 1000);
      expect(logs.filter((l) => l.level === 'error')).toEqual([]);
      expect(window.document.querySelector('#root')?.textContent?.trim()).not.toBe('');
    }
  });

  it.each(rows(of('arrange').filter(([, s]) => s.run)))('%s: the right order prints the goal, and the reverse doesn’t', (key, s) => {
    if (!s) return;
    expect(tryCode(key, s.blocks.join('\n'))).toEqual({ out: s.expect });
    expect(tryCode(key, [...s.blocks].reverse().join('\n'))).not.toEqual({ out: s.expect });
  });

  it.each(rows(of('trace').filter(([, s]) => s.lang === 'python' && s.stops)))('%s: each Python stop’s answer is what really happens', (_, s) => {
    if (!s) return;
    const r = runPyFull(traceProgram(s.code));
    expect(r.error).toBe('');
    const t = parseTrace(r.output)!;
    expect(t.error).toBeUndefined();
    let from = -1;
    for (const stop of s.stops!) {
      const at = t.frames.findIndex((f, i) => f.line === stop.line && i > from);
      expect(at).toBeGreaterThanOrEqual(0);
      from = at;
      // The state once the line has finished: older Pythons run a comprehension as its own small function first.
      const after = t.frames.slice(at + 1).find((f) => f.line !== stop.line && !f.stack.length) ?? t.frames.at(-1)!;
      const truth = 'var' in stop.check ? after.vars[stop.check.var] : after.out.replace(/\n$/, '').split('\n').at(-1);
      expect(stop.options[stop.answer]).toBe(truth);
      expect(new Set(stop.options).size).toBe(stop.options.length);
    }
  });

  it.each(rows(of('trace').filter(([, s]) => s.lang === 'javascript' && s.stops)))('%s: each stop’s answer is what really happens', (_, s) => {
    if (!s) return;
    const t = parseTrace(runJs(traceProgramJs(s.code)))!;
    expect(t.error).toBeUndefined();
    let from = -1;
    for (const stop of s.stops!) {
      const at = t.frames.findIndex((f, i) => f.line === stop.line && i > from);
      expect(at).toBeGreaterThanOrEqual(0);
      from = at;
      const after = t.frames[at + 1];
      const truth = 'var' in stop.check ? after.vars[stop.check.var] : after.out.replace(/\n$/, '').split('\n').at(-1);
      expect(stop.options[stop.answer]).toBe(truth);
      expect(new Set(stop.options).size).toBe(stop.options.length);
    }
  });
});

describe('resize helpers', () => {
  it('works out width queries', () => {
    expect(widthQueryMatches(' (min-width: 700px)', 360)).toBe(false);
    expect(widthQueryMatches('(min-width: 700px)', 900)).toBe(true);
    expect(widthQueryMatches('screen and (max-width: 40rem)', 600)).toBe(true);
    expect(widthQueryMatches('(min-width: 600px) and (max-width: 899px)', 900)).toBe(false);
    expect(widthQueryMatches('(prefers-color-scheme: dark)', 900)).toBeNull();
  });

  it('unwraps matching queries, drops the rest and leaves other queries alone', () => {
    const css = 'a{color:red}@media (min-width: 700px){.w{display:grid}}@media (prefers-color-scheme: dark){a{color:white}}';
    expect(cssAtWidth(css, 360)).toBe('a{color:red}@media (prefers-color-scheme: dark){a{color:white}}');
    expect(cssAtWidth(css, 900)).toBe('a{color:red}.w{display:grid}@media (prefers-color-scheme: dark){a{color:white}}');
  });

  it('moves body rules onto the pretend screen, and nothing else', () => {
    expect(bodyToScreen('body { margin: 12px; }\n.tbody, body > p { color: red; }')).toBe('#cy-vp { margin: 12px; }\n.tbody, #cy-vp > p { color: red; }');
  });

  it('turns vw into pixels of the chosen width', () => {
    expect(vwAt('font-size: clamp(1rem, 6vw, 3rem)', 600)).toBe('font-size: clamp(1rem, 36px, 3rem)');
  });

  it('swaps built-in picture names for the pictures', () => {
    expect(withAssets('background: url(cup.svg)')).toMatch(/^background: url\(data:image\/svg\+xml,/);
    expect(withAssets('<img src="dish.svg">')).toMatch(/src="data:image\/svg\+xml,/);
    expect(withAssets('<img src="photo.svg">')).toBe('<img src="photo.svg">');
  });
});
