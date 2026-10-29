import { describe, expect, it } from '@jest/globals';

import { allLessons, STAGES } from '..';
import { DRILLS } from '../drills';
import { MOCK_BANK } from '../mockBank';
import { NOTES } from '../notes';

// The app is in plain English (owner rule, 28 Oct 2026): no Hindi words in lessons, notes, practice or tests,
// and no Devanagari text. Hindi named as a language ("videos in Hindi") is fine; Hindi words are not.
const HINDI = /(?<![A-Za-z])(namaste|namaskar|chai|chalo|arre|accha|achha|thalis?|poha|samosas?|rotis?|sabzi|sabji|rajma|chawal|dal|bhai|didi|masala|tiffins?|chutney|paneer|idlis?|dosas?|biryani|lassi|jalebi|pakoras?|paratha|kulfi|laddoo|ladoo|halwa|aloo|gobi|chole|bhature|vadas?|pav|bhaji|upma|khichdi|raita|papad|achar|ghee|mithai|dabba|dhaba|kirana|chaat|kachori|dhokla|jaldi|shukriya|dhanyavaad|kya|haan|nahi|theek|bahut|yaar|bhaiya|chacha|mausi)(?![A-Za-z])/i;
const DEVANAGARI = /[ऀ-ॿ]/;

const sources: [string, unknown][] = [
  ['lessons', allLessons()],
  ['tracks', STAGES],
  ['notes', NOTES],
  ['practice', DRILLS],
  ['mock tests', MOCK_BANK],
];

describe('plain English everywhere', () => {
  it.each(sources)('%s use no Hindi words or Devanagari text', (_, data) => {
    const text = JSON.stringify(data);
    expect(text.match(HINDI)?.[0] ?? null).toBeNull();
    expect(text.match(DEVANAGARI)?.[0] ?? null).toBeNull();
  });
});
