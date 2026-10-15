import { Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { fonts } from '@/theme';

// The same shapes as assets/brand/codeyatra-mark.svg (120×100): < Y > with the Y's right arm as an arrow going up.
export const MARK_PATHS = {
  left: 'M31 29 L12 51 L31 73',
  right: 'M89 31 L108 53 L89 75',
  arm: 'M39 23 L50 39',
  stem: 'M56 91 V65 C56 51 62 40 74 24',
  head: 'M88 3 L87 29 L64 14 Z',
};

export const BRAND = {
  violet: '#6C4CF5',
  violetOnDark: '#8C74FF',
  teal: '#14C9A4',
  gold: '#FFD84A',
  amber: '#FFC233',
  orange: '#FF8A00',
  navy: '#170E5C',
  ink: '#16123F',
};

/** The mark's shapes, for use inside another <Svg>. `id` keeps gradient ids unique per drawing. */
export function MarkShapes({ id, dark = false, mono, muted = false }: { id: string; dark?: boolean; mono?: string; muted?: boolean }) {
  const left = mono ?? (muted ? '#9C96B8' : dark ? BRAND.violetOnDark : BRAND.violet);
  const right = mono ?? (muted ? '#9C96B8' : BRAND.teal);
  const top = mono ?? (muted ? '#C9C4DA' : BRAND.gold);
  const bottom = mono ?? (muted ? '#A9A3C2' : BRAND.orange);
  const arm = mono ?? (muted ? '#BDB7D2' : BRAND.amber);
  return (
    <>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={top} />
          <Stop offset="1" stopColor={bottom} />
        </LinearGradient>
      </Defs>
      <Path d={MARK_PATHS.left} fill="none" stroke={left} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={MARK_PATHS.right} fill="none" stroke={right} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={MARK_PATHS.arm} fill="none" stroke={arm} strokeWidth={13} strokeLinecap="round" />
      <Path d={MARK_PATHS.stem} fill="none" stroke={`url(#${id})`} strokeWidth={14} strokeLinecap="round" />
      <Path d={MARK_PATHS.head} fill={top} stroke={top} strokeWidth={5} strokeLinejoin="round" />
    </>
  );
}

/** The CodeYatra mark on its own. `size` is its width. */
export function LogoMark({ size = 48, dark = false, mono }: { size?: number; dark?: boolean; mono?: string }) {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={size} height={(size * 100) / 120} viewBox="0 0 120 100">
        <MarkShapes id={`cy-mark-${size}`} dark={dark} mono={mono} />
      </Svg>
    </View>
  );
}

/** "CodeYatra" in the brand type: Code in ink (or white on dark), Yatra in saffron. */
export function Wordmark({ size = 24, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <Text style={{ fontFamily: fonts.display, fontSize: size, letterSpacing: -size * 0.02, color: dark ? '#FFFFFF' : BRAND.ink }} accessibilityRole="header">
      Code<Text style={{ color: dark ? BRAND.amber : '#E07B00' }}>Yatra</Text>
    </Text>
  );
}

/** Mark and wordmark side by side, as on the store listing. */
export function Logo({ height = 40, dark = false }: { height?: number; dark?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: height * 0.22 }} accessible accessibilityLabel="CodeYatra">
      <LogoMark size={height * 1.2} dark={dark} />
      <Wordmark size={height * 0.62} dark={dark} />
    </View>
  );
}
