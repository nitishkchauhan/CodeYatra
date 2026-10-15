// "Aurora Glass" design tokens: one dark glass look across the whole app.
// Screens sit on a shared aurora background (navy with soft violet, teal and saffron glows),
// so `bg` is transparent. Text on any coloured fill is navy (`onColor`): every accent below is
// light enough to read as text on navy AND to carry navy text on top of it (both pass WCAG AA).

/** The navy under the aurora; also the text colour on coloured fills. */
export const NAVY = '#0E0937';

export const colors = {
  bg: 'transparent',
  /** Solid panel for sheets, inputs and anything that must hide what is behind it. */
  surface: '#1B1452',
  surfaceTint: 'rgba(255,255,255,0.10)',
  line: 'rgba(255,255,255,0.14)',
  lineSoft: 'rgba(255,255,255,0.08)',
  ink: '#FFFFFF',
  ink2: '#D6D2F7',
  ink3: '#A9A3DA',
  inkBody: '#E4E1FA',
  onColor: NAVY,

  primary: '#9B88FF',
  primaryShadow: '#4A35B8',
  primarySoft: 'rgba(155,136,255,0.18)',
  primaryMuted: '#6E61B8',

  saffron: '#FFB23F',
  saffronShadow: '#B86E00',
  saffronSoft: 'rgba(255,178,63,0.16)',
  saffronInk: '#FFC870',

  success: '#34D399',
  successShadow: '#0F8A63',
  successSoft: 'rgba(52,211,153,0.16)',
  successInk: '#6EE7B7',

  danger: '#FB7185',
  dangerShadow: '#B4233F',
  dangerSoft: 'rgba(251,113,133,0.16)',
  dangerInk: '#FDA4AF',

  warnSoft: 'rgba(255,178,63,0.12)',
  warnLine: 'rgba(255,178,63,0.35)',
  warnInk: '#FFD9A0',

  brand: '#170E5C',
  hero: 'rgba(108,76,245,0.22)',
  heroLine: 'rgba(255,255,255,0.18)',
  teal: '#2DD4BF',
  tealLight: '#5EEAD4',
  tealSoft: 'rgba(45,212,191,0.16)',

  code: {
    bg: '#0A0726',
    bar: '#1A1446',
    line: '#262055',
    text: '#E7E5F7',
    gutter: '#8A85BC',
    keyword: '#FFB454',
    builtin: '#7DD3FC',
    func: '#5EEAD4',
    number: '#F9A8D4',
    string: '#86EFAC',
    tag: '#F9A8D4',
    comment: '#8E89C4',
    console: '#07051C',
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

/** A glass card: translucent fill, light edge. */
export const card = {
  backgroundColor: 'rgba(255,255,255,0.07)',
  borderRadius: radius.xl,
  borderWidth: 1,
  borderColor: colors.line,
} as const;

/** Glass design tokens (used by the glass components and Home). */
export const glass = {
  bg: NAVY,
  fill: 'rgba(255,255,255,0.07)',
  fillStrong: 'rgba(255,255,255,0.12)',
  border: 'rgba(255,255,255,0.14)',
  borderStrong: 'rgba(255,255,255,0.26)',
  shine: 'rgba(255,255,255,0.35)',
  text: '#FFFFFF',
  text2: '#D6D2F7',
  text3: '#A9A3DA',
  track: 'rgba(255,255,255,0.14)',
  violet: '#6C4CF5',
  violetLight: '#A594FF',
  teal: '#14C9A4',
  tealLight: '#5EEAD4',
  saffron: '#FFB23F',
} as const;

/* ---------- Colour helpers ---------- */

const rgbOf = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lum = ([r, g, b]: number[]) => {
  const c = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
};
const hexOf = (rgb: number[]) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

/** WCAG contrast ratio between two `#RRGGBB` colours. */
export function contrast(a: string, b: string) {
  const [x, y] = [lum(rgbOf(a)), lum(rgbOf(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** `#RRGGBB` → `rgba(r,g,b,a)`. */
export function alpha(hex: string, a: number) {
  const [r, g, b] = rgbOf(hex);
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * A content colour (track, path) lifted until it reads with at least 4.6:1 contrast on the lightest
 * glass panel (`#262060`), so it also reads on navy and carries navy text. Bright colours come back unchanged.
 */
export function onDark(hex: string) {
  let rgb = rgbOf(hex);
  for (let i = 0; i < 40 && contrast(hexOf(rgb), '#262060') < 4.6; i++) rgb = rgb.map((v) => v + (255 - v) * 0.06);
  return hexOf(rgb);
}
