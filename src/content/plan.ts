// The onboarding questions and their answers, shared by onboarding and the "Your learning plan" screen.
import type { Interest, Minutes, Who, Why } from './paths/recommend';
import { colors } from '@/theme';

export type Option<K extends string | number> = { id: K; title: string; sub?: string; icon: string; tint: string; ink: string };

export const WHO: Option<Who>[] = [
  { id: 'school', title: 'Class 8 to 10', sub: 'Starting out at school', icon: 'M4 19V8l8-4 8 4v11 M9 19v-6h6v6', tint: '#E7EFFE', ink: '#1D4ED8' },
  {
    id: 'senior',
    title: 'Class 11 or 12',
    sub: 'Including CBSE Computer Science',
    icon: 'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z M4 21V5 M8 7h6 M8 11h6',
    tint: colors.tealSoft,
    ink: '#0E6B63',
  },
  {
    id: 'college',
    title: 'College student',
    sub: 'B.Tech, BCA, BSc or diploma',
    icon: 'M2 9l10-5 10 5-10 5z M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5 M22 9v6',
    tint: colors.primarySoft,
    ink: colors.primary,
  },
  { id: 'working', title: 'Working', sub: 'In a job, any field', icon: 'M4 8h16v11H4z M9 8V5h6v3 M4 13h16', tint: '#FDF0DC', ink: '#975008' },
  { id: 'other', title: 'Something else', icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', tint: '#F1EAFE', ink: '#6227C9' },
];

export const WHY: Option<Why>[] = [
  { id: 'job', title: 'Get a job or crack placements', icon: 'M4 8h16v11H4z M9 8V5h6v3 M4 13h16', tint: '#E8EFFD', ink: '#1D4FD8' },
  { id: 'exams', title: 'Do well in school or college exams', icon: 'M9 4h6l1 2h3v15H5V6h3z M9 12l2 2 4-4', tint: colors.tealSoft, ink: '#0E6B63' },
  {
    id: 'build',
    title: 'Build my own apps and websites',
    icon: 'M5 19c3-1 4-3 4-6l6-6c2 0 3-1 4-4-3 1-4 2-4 4l-6 6c-3 0-5 1-6 4z M14 7l3 3',
    tint: '#FDEDE7',
    ink: '#B03A16',
  },
  { id: 'switch', title: 'Switch to a career in tech', icon: 'M4 7h13l-3-3 M20 17H7l3 3', tint: '#F1EAFE', ink: '#6227C9' },
  { id: 'fun', title: 'Just for fun', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8.5 14a4 4 0 0 0 7 0 M9 9.5h.01 M15 9.5h.01', tint: '#FEF6D8', ink: '#854D0E' },
];

export const INTEREST: Option<Interest>[] = [
  { id: 'web', title: 'Websites', sub: 'What people see in a browser', icon: 'M3 5h18v14H3z M3 9h18', tint: '#FDEDE7', ink: '#B03A16' },
  { id: 'mobile', title: 'Mobile apps', sub: 'Apps for Android phones', icon: 'M7 3h10v18H7z M11 18h2', tint: '#E2F5EA', ink: '#05703B' },
  { id: 'data', title: 'Data', sub: 'Numbers, charts and insights', icon: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2', tint: '#FDF0DC', ink: '#975008' },
  { id: 'ai', title: 'AI', sub: 'Apps that use AI models', icon: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z', tint: '#F1EAFE', ink: '#6227C9' },
  { id: 'automation', title: 'Automating tasks', sub: 'Scripts that save time', icon: 'M4 6h10 M4 12h16 M4 18h7 M17 4v4 M14 6h6', tint: '#E6F0F8', ink: '#2B5E89' },
  {
    id: 'unsure',
    title: 'Not sure yet',
    sub: 'We’ll suggest a good start',
    icon: 'M9 9a3 3 0 1 1 4 2.8c-.6.3-1 .9-1 1.6V14 M12 18h.01',
    tint: colors.lineSoft,
    ink: colors.ink2,
  },
];

export const MINUTE_TEXT: Record<Minutes, string> = { 5: 'Casual', 10: 'Regular', 20: 'Serious', 30: 'Intense' };
