import { describe, expect, it, jest } from '@jest/globals';

import { hasBlockedWords } from '../moderation';
jest.mock('../supabase', () => ({ supabase: null }));

describe('hasBlockedWords', () => {
  it('blocks abuse in English and Hindi', () => {
    for (const bad of ['what the fuck', 'BITCH', 'you are a chutiya', 'bhenchod', 'gandu coder', 'sexy girl', 'shit happens']) expect(hasBlockedWords(bad)).toBe(true);
  });

  it('sees through simple disguises', () => {
    for (const bad of ['sh1t', 'f.u.c.k', 'f u c k off', 'b!tch', '$hit', 'ch00tiya', 'chut1ya']) expect(hasBlockedWords(bad)).toBe(true);
  });

  it('allows real names and normal bios that contain those letters', () => {
    for (const ok of [
      'Harshita',
      'Pornima',
      'Ashish',
      'Sussex',
      'Dickens fan',
      'Class 11 · learning Python',
      'Gandhinagar',
      'Peacock lover',
      'Assam',
      'Pass the exam',
      'A B C D learner',
    ]) {
      expect(hasBlockedWords(ok)).toBe(false);
    }
  });
});
