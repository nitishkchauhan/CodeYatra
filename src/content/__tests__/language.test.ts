import { describe, expect, it } from '@jest/globals';

import { allLessons, STAGES } from '..';
import { DRILLS } from '../drills';
import { MOCK_BANK } from '../mockBank';
import { NOTES } from '../notes';

// The app is in plain English (owner rule, 28 Oct 2026): no Hindi words in lessons, notes, practice or tests,
// and no Devanagari text. Hindi named as a language ("videos in Hindi") is fine; Hindi words are not.
const HINDI = /(?<![A-Za-z])(namaste|namaskar|chai|chalo|arre|accha|achha|thalis?|poha|samosas?|rotis?|sabzi|sabji|rajma|chawal|dal|bhai|didi|masala|tiffins?|chutney|paneer|idlis?|dosas?|biryani|lassi|jalebi|pakoras?|paratha|kulfi|laddoo|ladoo|halwa|aloo|gobi|chole|bhature|vadas?|pav|bhaji|upma|khichdi|raita|papad|achar|ghee|mithai|dabba|dhaba|kirana|chaat|kachori|dhokla|jaldi|shukriya|dhanyavaad|kya|haan|nahi|theek|bahut|yaar|bhaiya|chacha|mausi)(?![A-Za-z])/i;
const DEVANAGARI = /[\u0900-\u097F]/;
// Example people, places and trains are neutral too (owner request, 29 Oct 2026). Real resources (YouTube channels,
// Khan Academy) and facts about India (₹, Indian mobile numbers, en-IN) are fine.
const LOCAL_NAMES = /(?<![A-Za-z])(Riya|Aman|Priya|Asha|Ravi|Meera|Zoya|Kabir|Rahul|Rohit|Virat|Vikram|Ishaan|Ananya|Neha|Karan|Arjun|Sharma|Verma|Kumar|Pune|Delhi|Mumbai|Jaipur|Indore|Bhopal|Varanasi|Bengaluru|Kolkata|Chennai|Agra|Gurugram|Noida|Surat|Kochi|Coimbatore|Howrah|Rajdhani|Shatabdi|Duronto|Vande Bharat|Garib Rath)(?![A-Za-z])/i;

const sources: [string, unknown][] = [
  ['lessons', allLessons()],
  ['tracks', STAGES],
  ['notes', NOTES],
  ['practice', DRILLS],
  ['mock tests', MOCK_BANK],
];

describe('plain English everywhere', () => {
  it.each(sources)('%s use no Hindi words, Devanagari text or local example names', (_, data) => {
    // Time-zone ids like "Asia/Kolkata" are standard technical codes, not example names.
    const text = JSON.stringify(data).replace(/Asia\/Kolkata/g, 'Asia/TimeZone');
    expect(text.match(HINDI)?.[0] ?? null).toBeNull();
    expect(text.match(DEVANAGARI)?.[0] ?? null).toBeNull();
    expect(text.match(LOCAL_NAMES)?.[0] ?? null).toBeNull();
  });
});
