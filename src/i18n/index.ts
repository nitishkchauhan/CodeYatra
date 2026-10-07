import { useProgress } from '@/state/progress';

// UI chrome only. Lesson content is English with Hindi support lines.
const STRINGS = {
  en: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    learn: 'Learn',
    practice: 'Practice',
    profile: 'Profile',
    continueLesson: 'Continue lesson',
    startLesson: 'Start lesson',
    startPractice: 'Start practice',
    continue: 'Continue',
    check: 'Check answer',
    tryAgain: 'Try again',
    runCode: 'Run code',
    running: 'Running…',
    runAgain: 'Run again',
    finish: 'Finish',
    dailyGoal: 'Daily goal',
    stage: 'Stage',
    of: 'of',
    upNext: 'Up next',
    soon: 'Soon',
    edit: 'Edit',
  },
  hi: {
    morning: 'सुप्रभात',
    afternoon: 'नमस्ते',
    evening: 'शुभ संध्या',
    learn: 'सीखें',
    practice: 'अभ्यास',
    profile: 'प्रोफ़ाइल',
    continueLesson: 'आगे बढ़ें',
    startLesson: 'पाठ शुरू करें',
    startPractice: 'अभ्यास शुरू करें',
    continue: 'आगे बढ़ें',
    check: 'जाँचें',
    tryAgain: 'फिर कोशिश करें',
    runCode: 'कोड चलाएँ',
    running: 'चल रहा है…',
    runAgain: 'फिर चलाएँ',
    finish: 'पूरा करें',
    dailyGoal: 'आज का लक्ष्य',
    stage: 'स्टेज',
    of: 'में से',
    upNext: 'अगला',
    soon: 'जल्द',
    edit: 'बदलें',
  },
} as const;

export type StringKey = keyof (typeof STRINGS)['en'];

export function useT() {
  const { state } = useProgress();
  const table = STRINGS[state.lang];
  return (key: StringKey) => table[key];
}

export function greetingKey(hour: number): StringKey {
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
