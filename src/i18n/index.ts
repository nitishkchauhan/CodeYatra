// UI strings, kept in one table so wording stays consistent.
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
} as const;

export type StringKey = keyof (typeof STRINGS)['en'];

export function useT() {
  return (key: StringKey) => STRINGS.en[key];
}

export function greetingKey(hour: number): StringKey {
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
