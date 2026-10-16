import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { fonts } from '@/theme';

// The same shapes as assets/brand/codeyatra-mark.svg (120×120): a lowercase "cy" whose y-tail leaves footprints.
export const MARK = {
  c: 'M56.8 38.1 A17 17 0 1 0 56.8 65.9',
  y: 'M67 36 L79 58 M93 36 L75 76 Q69 88 55 88',
  /** Footprints behind the y, nearest first: centre, radius and opacity. */
  steps: [
    { x: 42, y: 90, r: 4.3, o: 1 },
    { x: 30.5, y: 88.5, r: 3.7, o: 0.7 },
    { x: 20.5, y: 85, r: 3.1, o: 0.45 },
  ],
};

export const BRAND = {
  navy: '#170E5C',
  indigo: '#4B3FD8',
  lavender: '#A594FF',
  saffron: '#FF9F1C',
  gold: '#FFC233',
  teal: '#14B8A6',
  violet: '#4B3FD8',
  violetOnDark: '#A594FF',
  ink: '#16123F',
};

/** Colours of the mark's three parts for a background and mood. */
export function markColors({ dark = false, mono, muted = false }: { dark?: boolean; mono?: string; muted?: boolean }) {
  return {
    c: mono ?? (muted ? '#B4AFC8' : dark ? '#FFFFFF' : BRAND.navy),
    y: mono ?? (muted ? '#9C96B8' : dark ? BRAND.lavender : BRAND.indigo),
    step: mono ?? (muted ? '#C9C4DA' : BRAND.saffron),
  };
}

/** The mark's shapes, for use inside another <Svg>. Footprints can be left out to animate them separately. */
export function MarkShapes({ dark, mono, muted, footprints = true }: { dark?: boolean; mono?: string; muted?: boolean; footprints?: boolean }) {
  const col = markColors({ dark, mono, muted });
  return (
    <>
      <Path d={MARK.c} fill="none" stroke={col.c} strokeWidth={11} strokeLinecap="round" />
      <Path d={MARK.y} fill="none" stroke={col.y} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
      {footprints ? MARK.steps.map((s) => <Circle key={s.x} cx={s.x} cy={s.y} r={s.r} fill={col.step} opacity={s.o} />) : null}
    </>
  );
}

/** The CodeYatra mark on its own (square). */
export function LogoMark({ size = 48, dark = false, mono }: { size?: number; dark?: boolean; mono?: string }) {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <MarkShapes dark={dark} mono={mono} />
      </Svg>
    </View>
  );
}

/** "CodeYatra" in the brand type: Code in navy (or white on dark), Yatra in indigo (lavender on dark). */
export function Wordmark({ size = 24, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <Text style={{ fontFamily: fonts.display, fontSize: size, letterSpacing: -size * 0.02, color: dark ? '#FFFFFF' : BRAND.navy }} accessibilityRole="header">
      Code<Text style={{ color: dark ? BRAND.lavender : BRAND.indigo }}>Yatra</Text>
    </Text>
  );
}

/** Mark and wordmark side by side, as on the store listing. */
export function Logo({ height = 40, dark = false }: { height?: number; dark?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: height * 0.22 }} accessible accessibilityLabel="CodeYatra">
      <LogoMark size={height * 1.15} dark={dark} />
      <Wordmark size={height * 0.62} dark={dark} />
    </View>
  );
}
