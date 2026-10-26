// Module notes ("Read more"), keyed by lesson id.
import type { ModuleNotes } from '../types';
import { HTML_NOTES } from './html';
import { HTML_MORE_NOTES } from './htmlMore';
import { PYTHON_NOTES } from './python';
import { PYTHON_MORE_NOTES } from './pythonMore';

export const NOTES: Record<string, ModuleNotes> = { ...PYTHON_NOTES, ...PYTHON_MORE_NOTES, ...HTML_NOTES, ...HTML_MORE_NOTES };

export const getNotes = (lessonId: string): ModuleNotes | undefined => NOTES[lessonId];
