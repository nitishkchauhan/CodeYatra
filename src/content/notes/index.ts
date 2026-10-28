// Module notes ("Read more"), keyed by lesson id.
import type { ModuleNotes } from '../types';
import { CSS_NOTES } from './css';
import { JS_NOTES } from './js';
import { HTML_NOTES } from './html';
import { HTML_MORE_NOTES } from './htmlMore';
import { PYTHON_NOTES } from './python';
import { PYTHON_V4_NOTES } from './pythonV4';
import { PYTHON_MORE_NOTES } from './pythonMore';

// Modules rebuilt in Lesson v4 get the extra notes sections on top of their existing notes.
const PYTHON_WITH_V4 = Object.fromEntries(Object.entries(PYTHON_NOTES).map(([id, n]) => [id, { ...n, ...PYTHON_V4_NOTES[id] }]));

export const NOTES: Record<string, ModuleNotes> = { ...PYTHON_WITH_V4, ...PYTHON_MORE_NOTES, ...HTML_NOTES, ...HTML_MORE_NOTES, ...CSS_NOTES, ...JS_NOTES };

export const getNotes = (lessonId: string): ModuleNotes | undefined => NOTES[lessonId];
