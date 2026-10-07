import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { T } from './Text';
import { haptic } from '@/lib/haptics';
import { colors, radius, TOUCH } from '@/theme';

type Variant = 'primary' | 'success' | 'danger' | 'saffron' | 'white' | 'outline' | 'ghost';

const V: Record<Variant, { bg: string; ink: string; shadow?: string; border?: string }> = {
  primary: { bg: colors.primary, ink: '#FFFFFF', shadow: colors.primaryShadow },
  success: { bg: colors.success, ink: '#FFFFFF', shadow: colors.successShadow },
  danger: { bg: colors.danger, ink: '#FFFFFF', shadow: colors.dangerShadow },
  saffron: { bg: colors.saffron, ink: colors.ink, shadow: colors.saffronShadow },
  white: { bg: '#FFFFFF', ink: colors.hero, shadow: '#B9B2F7' },
  outline: { bg: '#FFFFFF', ink: colors.ink, border: colors.line },
  ghost: { bg: 'transparent', ink: colors.primary },
};

/** Tactile button: the face sinks onto its shadow when pressed. */
export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  height = 54,
  style,
  accessibilityLabel,
}: {
  label?: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: (color: string) => ReactNode;
  disabled?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const v = disabled ? { bg: colors.line, ink: colors.ink3, shadow: '#D9D6E6', border: undefined } : V[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        haptic.tap();
        onPress?.();
      }}
      style={[{ minHeight: Math.max(height, TOUCH), minWidth: TOUCH }, style]}>
      {({ pressed }) => (
        <View
          style={[
            styles.face,
            {
              height,
              backgroundColor: v.bg,
              borderWidth: v.border ? 1 : 0,
              borderColor: v.border,
              boxShadow: v.shadow && !pressed ? `0 3px 0 ${v.shadow}` : undefined,
              transform: [{ translateY: pressed && v.shadow ? 3 : 0 }, { scale: pressed && !v.shadow ? 0.97 : 1 }],
            },
          ]}>
          {icon?.(v.ink)}
          {label ? (
            <T variant="label" color={v.ink} style={{ fontSize: height >= 50 ? 16 : 14 }}>
              {label}
            </T>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  face: {
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
  },
});
