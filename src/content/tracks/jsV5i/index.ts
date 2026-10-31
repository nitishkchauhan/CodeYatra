// JavaScript Intermediate in the Lesson v5 format: 6 modules of short lessons, each with a Module Challenge; the last
// one is the final project (“Is my train on time?” for City Travel Desk). Shown in the JavaScript track after Basic.
import type { Lesson, Unit } from '../../types';
import { JS_I_M1 } from './m1';
import { JS_I_M2 } from './m2';
import { JS_I_M3 } from './m3';
import { JS_I_M4 } from './m4';
import { JS_I_M5 } from './m5';
import { JS_I_M6 } from './m6';

const MODULES: [string, string, Lesson[]][] = [
  ['j-i-u1', 'Working with data', JS_I_M1],
  ['j-i-u2', 'Money, dates and text', JS_I_M2],
  ['j-i-u3', 'Fetch in the real world', JS_I_M3],
  ['j-i-u4', 'Waiting for many things', JS_I_M4],
  ['j-i-u5', 'Forms with JavaScript', JS_I_M5],
  ['j-i-u6', 'One source of truth', JS_I_M6],
];

/** Every lesson and challenge in JavaScript Intermediate, in order. */
export const JS_I_V5: Lesson[] = MODULES.flatMap(([, , lessons]) => lessons);

/** One unit per module: its lessons, then its Challenge. */
export const JS_I_UNITS: Unit[] = MODULES.map(([id, title, lessons]) => ({
  id,
  title,
  lessons: lessons.map((l) => ({ id: l.id, title: l.title, meta: l.badge ? `Challenge · ${l.badge.icon} ${l.badge.name}` : `Lesson · ${l.minutes} min` })),
}));
