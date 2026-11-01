// Builders for the SQL track (Lesson v5): queries run live against the sample railway database (content/sqlFixture.ts)
// with SQLite, through the app’s Python runner, and print a table. Topics follow W3Schools’ SQL tutorial as a
// checklist, in our own words. Every query is run in tests (lessonV5.test.ts), so outputs are what really happens.
import type { ArrangeStep, Lesson, Level, PagePreview, QuizStep, RunStep, Seg, Step, ToggleStep, XrayStep } from '../../types';
import { BOOKING_TABLE, PASSENGER_TABLE, SQL_TABLES } from '../../sqlFixture';
import * as K from '../htmlV5/kit';
import * as J from '../jsV5/kit';

export { bugTask, chat, explore, mcq, pairs, recap, reveal, swipe, tapbug, toggle } from '../htmlV5/kit';
export { matchUp, truth } from '../cssV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), skill: 'sql' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  skill: 'sql',
});

const sql = <T extends QuizStep>(q: T): T => (q.code ? { ...q, lang: 'sql' } : q);

/** A quick check (first option right), with SQL highlighting on any code. */
export const check = (prompt: string, options: [string, ...string[]], right: string, wrong: string, o: { code?: string[]; mono?: boolean; kicker?: string } = {}): QuizStep => sql(K.check(prompt, options, right, wrong, o));

export const pickCode = K.pickCode;

/** Run and tweak: change one value in a query ({{v}}) and see the result table; `goal` is a row to reach. */
export const run = (title: string, instructions: string, code: string[], choices: string[], o: { goal?: string; caption?: string } = {}): RunStep => J.run(title, instructions, code, choices, o);

/** Tap to place: fill the gaps in a query; once full, it runs. */
export const place = (title: string, instructions: string, lines: Seg[][], pieces: string[], answer: string[], revealText: string) => J.place(title, instructions, lines, pieces, answer, revealText);

/** Switch between queries; each view shows its result table (`out`, checked by running it). */
export const compare = (title: string, views: [label: string, code: string[], caption: string, out: string[]][], intro?: string): ToggleStep => J.toggleRun(title, views, intro);

/** Challenge task 6: put the clauses of a query in order; the right order prints `expect`. */
export const arrange = (blocks: string[], goal: string, expect: string[]): ArrangeStep => ({ ...J.arrange(blocks, goal, expect), instructions: 'Tap the clauses in the right order. The query runs when it is complete.' });

const TABLE_CSS = 'body{font-family:system-ui,sans-serif;margin:10px;color:#16142B}h4{margin:10px 0 4px;font:bold 13px ui-monospace,monospace;color:#4B3FD8}table{border-collapse:collapse;font:12px ui-monospace,monospace;margin-bottom:6px}th,td{border:1px solid #D3D7E6;padding:3px 6px;text-align:left}th{background:#EEF0F7}.null{color:#8E93B8;font-style:italic}';

/** The sample tables, drawn as HTML tables (from the same lines lessons show). */
const html = (lines: string[]) => {
  const [name, head, ...rows] = lines;
  const cells = (l: string, tag: string) => l.split('|').map((c) => c.trim()).map((c) => `<${tag}${c === 'NULL' ? ' class="null"' : ''}>${c}</${tag}>`).join('');
  return `<h4>${name}</h4><table id="t-${name}"><tr>${cells(head, 'th')}</tr>${rows.map((r) => `<tr>${cells(r, 'td')}</tr>`).join('')}</table>`;
};
export const TABLES = { trains: html(SQL_TABLES), bookings: html(BOOKING_TABLE), passengers: html(PASSENGER_TABLE) };

/** A page showing some of the sample tables. */
export const tables = (...names: (keyof typeof TABLES)[]): PagePreview => ({ html: names.map((n) => TABLES[n]).join(''), css: TABLE_CSS });

/** A result table as a page (for X-ray): `lines` are "a | b" rows with a header first. */
export const result = (lines: string[]): PagePreview => ({ html: html(['result', ...lines]), css: TABLE_CSS });

/** Challenge task 5: X-ray a result table and name the clause behind each part. */
export const xray = (lines: string[], parts: [string, string, string, string[]][]): XrayStep => ({
  ...K.xray(result(lines), parts),
  title: 'Which part of the query did that?',
  instructions: 'Tap a part of the result, then pick the clause behind it.',
});

/** Levels: Basic for modules 1–6, Intermediate after. */
export const at = (level: Level) => (l: Lesson): Lesson => ({ ...l, level });
