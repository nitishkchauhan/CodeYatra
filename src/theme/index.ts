// "Light Glass" design: one look across the whole app. Every screen sits on a soft light aurora
// (see GlassBackground, mounted once in src/app/_layout.tsx), so `bg` is transparent and cards are frosted white.
export const colors = {
  bg: 'transparent',
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

  brand: '#170E5C',
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

/** A frosted glass card: translucent white over the aurora, a soft edge and shadow. */
export const card = {
  backgroundColor: 'rgba(255,255,255,0.78)',
  borderRadius: radius.xl,
  borderWidth: 1,
  borderColor: 'rgba(22,20,43,0.07)',
  boxShadow: '0 4px 16px rgba(45,35,120,0.06)',
} as const;

/** Light glass tokens (Home and the glass components). Text colours pass WCAG AA on a frosted card. */
export const glass = {
  bg: '#F3F1FB',
  fill: 'rgba(255,255,255,0.66)',
  fillStrong: 'rgba(255,255,255,0.84)',
  border: 'rgba(255,255,255,0.95)',
  borderStrong: '#FFFFFF',
  shine: '#FFFFFF',
  shadow: '0 6px 20px rgba(45,35,120,0.08)',
  text: '#16142B',
  text2: '#4A4766',
  text3: '#6E6A88',
  track: 'rgba(22,20,43,0.08)',
  violet: '#4B3FD8',
  violetLight: '#4B3FD8',
  teal: '#2DD4BF',
  tealLight: '#0F766E',
  saffron: '#B45309',
} as const;
