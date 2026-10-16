import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { glass } from '@/theme';

/**
 * The light aurora behind every screen: a pale lavender base with soft violet, teal and saffron glows.
 * Drawn once with SVG gradients, so it costs nothing while scrolling (no live blur, which is slow on older Android).
 */
export function GlassBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: glass.bg }]} pointerEvents="none">
      <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="g-violet" cx="12" cy="8" r="62" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#7C5CFF" stopOpacity="0.22" />
            <Stop offset="1" stopColor="#6C4CF5" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g-teal" cx="98" cy="42" r="48" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#A594FF" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#A594FF" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g-saffron" cx="6" cy="88" r="52" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#FF9F1C" stopOpacity="0.16" />
            <Stop offset="1" stopColor="#FF8A00" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100" height="100" fill="url(#g-violet)" />
        <Rect width="100" height="100" fill="url(#g-teal)" />
        <Rect width="100" height="100" fill="url(#g-saffron)" />
      </Svg>
    </View>
  );
}

type GlassProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** A brighter panel for the most important card on screen. */
  strong?: boolean;
  /** Optional colour wash, e.g. a track colour at low opacity. */
  tint?: string;
  radius?: number;
};

/** The shine along a glass card's top edge. */
function Shine({ radius }: { radius: number }) {
  return <View pointerEvents="none" style={[styles.shine, { left: radius * 0.6, right: radius * 0.6 }]} />;
}

/** A frosted card: translucent white with a bright edge, a shine along the top and a soft shadow. */
export function GlassCard({ children, style, strong, tint, radius = 20 }: GlassProps) {
  return (
    <View
      style={[
        styles.card,
        { borderRadius: radius, backgroundColor: strong ? glass.fillStrong : glass.fill, borderColor: strong ? glass.borderStrong : glass.border },
        style,
      ]}>
      {tint ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: tint }]} /> : null}
      <Shine radius={radius} />
      {children}
    </View>
  );
}

/** A pressable glass card that sinks slightly when pressed. */
export function GlassButton({ children, style, strong, tint, radius = 20, ...rest }: GlassProps & Omit<PressableProps, 'style' | 'children'>) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.card,
        { borderRadius: radius, backgroundColor: strong || pressed ? glass.fillStrong : glass.fill, borderColor: strong ? glass.borderStrong : glass.border },
        pressed && { transform: [{ scale: 0.97 }] },
        style,
      ]}>
      {tint ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: tint }]} /> : null}
      <Shine radius={radius} />
      {children}
    </Pressable>
  );
}

/** `#RRGGBB` → `rgba(r,g,b,a)`, for tinting glass with a track or path colour. */
export function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: 'hidden', boxShadow: glass.shadow },
  shine: { position: 'absolute', top: 0, height: 1, backgroundColor: glass.shine },
});
