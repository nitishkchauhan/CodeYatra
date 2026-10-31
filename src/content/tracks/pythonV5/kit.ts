// Builders for Python Basic (Lesson v5): the Python Intermediate builders, with lessons marked basic. Yatri (chat)
// explains from zero; examples come from Rosa’s Café. Draft: project-docs/content-drafts/python-basic-v5.md.
// Every program is run in tests with real Python, so each output and answer is what Python really prints.
import type { Lesson, Step } from '../../types';
import * as K from '../pythonV5i/kit';

export { arrange, bugTask, chat, check, explore, matchUp, mcq, pairs, pickCode, predict, predictTask, project, recap, reveal, run, swipe, tapbug, toggleRun, truth } from '../pythonV5i/kit';

export const lesson = (id: string, title: string, minutes: number, s: Step[]): Lesson => ({ ...K.lesson(id, title, minutes, s), level: 'basic' });

export const challenge = (id: string, title: string, badge: { icon: string; name: string }, learned: [string, string, string], s: Step[], kind: Lesson['kind'] = 'lesson'): Lesson => ({
  ...K.challenge(id, title, badge, learned, s, kind),
  level: 'basic',
});
