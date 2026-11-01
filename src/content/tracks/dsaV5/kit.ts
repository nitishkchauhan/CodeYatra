// Builders for the DSA tracks (Lesson v5): the Python screens (run and tweak, predict then run, tap to place,
// arrange…) with lessons marked as DSA. Topics follow W3Schools’ DSA tutorial as a checklist, in our own words.
// Every program is run in tests with real Python, so each output and answer is what Python really prints.
import type { Lesson, Level, Step } from '../../types';
import * as P from '../pythonV5i/kit';

export { arrange, bugTask, chat, check, explore, matchUp, mcq, pairs, pickCode, predict, predictTask, project, recap, reveal, run, swipe, tapbug, toggleRun, truth } from '../pythonV5i/kit';
export { toggle } from '../htmlV5/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...P.lesson(id, title, minutes, s), skill: 'dsa' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...P.challenge(id, title, badge, learned, s, kind),
  skill: 'dsa',
});

/** Splits a list of lessons into modules: each module ends with its Challenge. */
export const modules = (lessons: Lesson[]): Lesson[][] =>
  lessons.reduce<Lesson[][]>((out, l) => {
    const last = out.at(-1);
    if (!last || last.at(-1)?.badge) out.push([l]);
    else last.push(l);
    return out;
  }, []);

export type Module = [id: string, title: string, level: Level, lessons: Lesson[]];
