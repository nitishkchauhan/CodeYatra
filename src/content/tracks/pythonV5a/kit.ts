// Builders for Python Advanced (Lesson v5): the Python Intermediate builders, with lessons marked advanced.
// Every program is run in tests with real Python, so each output and answer is what Python really prints.
import type { Lesson, Step } from '../../types';
import * as K from '../pythonV5i/kit';

export { arrange, atWork, bugTask, chat, check, doc, explore, matchUp, mcq, pairs, pickCode, place, predict, predictTask, project, recap, reveal, run, swipe, tapbug, toggleRun, truth } from '../pythonV5i/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), level: 'advanced' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  level: 'advanced',
});
