import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { colors, fonts } from '@/theme';

const VARIANTS = {
  display: { fontFamily: fonts.display, fontSize: 25, lineHeight: 31, letterSpacing: -0.4, color: colors.ink },
  title: { fontFamily: fonts.display, fontSize: 21, lineHeight: 26, letterSpacing: -0.3, color: colors.ink },
  heading: { fontFamily: fonts.display, fontSize: 16, lineHeight: 21, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.inkBody },
  bodySm: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.inkBody },
  label: { fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 19, color: colors.ink },
  labelSm: { fontFamily: fonts.bodyBold, fontSize: 12, lineHeight: 16, color: colors.ink },
  caption: { fontFamily: fonts.body, fontSize: 12, lineHeight: 16, color: colors.ink3 },
  kicker: { fontFamily: fonts.bodyBold, fontSize: 11, lineHeight: 14, letterSpacing: 1, color: colors.primary },
  mono: { fontFamily: fonts.mono, fontSize: 14, lineHeight: 20, color: colors.ink },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof VARIANTS;

export function T({
  variant = 'body',
  color,
  style,
  ...rest
}: TextProps & { variant?: TextVariant; color?: string; style?: StyleProp<TextStyle> }) {
  return <Text {...rest} style={[VARIANTS[variant], color ? { color } : null, style]} />;
}
