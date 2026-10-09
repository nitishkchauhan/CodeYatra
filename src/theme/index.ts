// "Studio" design tokens from the CodeYatra v2/v3 canvas.
export const colors = {
  bg: '#F6F5FA',
  surface: '#FFFFFF',
  surfaceTint: '#F7F6FE',
  line: '#E7E5F0',
  lineSoft: '#F0EEF6',
  ink: '#16142B',
  ink2: '#55526E',
  // Was #8B88A3 (3.2:1 on bg); #6E6A88 meets WCAG AA 4.5:1 for small text on bg and white.
  ink3: '#6E6A88',
  inkBody: '#3B3856',

  primary: '#4B3FD8',
  primaryShadow: '#3328A8',
  primarySoft: '#EEECFD',
  primaryMuted: '#A9A2F0',

  saffron: '#FF9F1C',
  saffronShadow: '#C26A00',
  saffronSoft: '#FFF1DC',
  saffronInk: '#8A4B00',

  // Was #16A34A (3.3:1); #15803D passes 4.5:1 as text and behind white button labels.
  success: '#15803D',
  successShadow: '#116530',
  successSoft: '#E3F6EA',
  successInk: '#14532D',

  danger: '#D93036',
  dangerShadow: '#B4232A',
  dangerSoft: '#FDECEC',
  dangerInk: '#7F1D1D',

  warnSoft: '#FFF8EC',
  warnLine: '#FFE3B8',
  warnInk: '#5A3D12',

  brand: '#06104A',
  hero: '#221D63',
  heroLine: '#3A3390',
  teal: '#0EA5A0',
  tealLight: '#5EEAD4',
  tealSoft: '#DDF5F2',

  code: {
    bg: '#121128',
    bar: '#1E1C40',
    line: '#23214A',
    text: '#E7E5F7',
    gutter: '#8A85BC',
    keyword: '#FFB454',
    builtin: '#7DD3FC',
    func: '#5EEAD4',
    number: '#F9A8D4',
    string: '#86EFAC',
    tag: '#F9A8D4',
    comment: '#8E89C4',
    console: '#0C0B1D',
  },
} as const;

export const fonts = {
  display: 'Lexend_600SemiBold',
  displayMedium: 'Lexend_500Medium',
  body: 'Figtree_500Medium',
  bodyRegular: 'Figtree_400Regular',
  bodySemibold: 'Figtree_600SemiBold',
  bodyBold: 'Figtree_700Bold',
  bodyHeavy: 'Figtree_800ExtraBold',
  // Roboto Mono has no code ligatures, so <= and => look exactly as learners type them.
  mono: 'RobotoMono_400Regular',
  monoMedium: 'RobotoMono_500Medium',
} as const;

export const radius = { sm: 8, md: 12, lg: 14, xl: 18, xxl: 22, pill: 999 } as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 } as const;

/** Minimum touch target from the UX rules. */
export const TOUCH = 48;

export const card = {
  backgroundColor: colors.surface,
  borderRadius: radius.xl,
  borderWidth: 1,
  borderColor: colors.line,
} as const;
