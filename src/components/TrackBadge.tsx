import { Text, View } from 'react-native';
import Svg, { Circle, Ellipse } from 'react-native-svg';

import type { Stage } from '@/content';
import { fonts } from '@/theme';

/** The coloured logo tile for a language track (HTML, JS, Python…). */
export function TrackBadge({ stage, size = 40, dimmed = false }: { stage: Stage; size?: number; dimmed?: boolean }) {
  const label = stage.badge;
  const fontSize = size * (label.length >= 3 ? 0.3 : label.length === 2 ? 0.38 : 0.46);
  return (
    <View
      accessible={false}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: stage.badgeBg,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: dimmed ? 0.45 : 1,
      }}>
      {label === 'atom' ? (
        <Svg width={size * 0.72} height={size * 0.72} viewBox="-12 -12 24 24">
          <Circle r={2.1} fill={stage.badgeInk} />
          {[0, 60, 120].map((deg) => (
            <Ellipse key={deg} rx={10} ry={4} fill="none" stroke={stage.badgeInk} strokeWidth={1.4} transform={`rotate(${deg})`} />
          ))}
        </Svg>
      ) : (
        <Text
          style={{
            fontFamily: fonts.monoMedium,
            fontSize,
            color: stage.badgeInk,
            includeFontPadding: false,
          }}
          allowFontScaling={false}>
          {label}
        </Text>
      )}
    </View>
  );
}
