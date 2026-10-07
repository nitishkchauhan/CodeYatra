import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '@/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Circular progress (0..1) that animates when the value changes. */
export function Ring({ value, size = 46, stroke = 5, color = colors.primary, track = colors.primarySoft }: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.set(withTiming(Math.max(0, Math.min(1, value)), { duration: 800 }));
  }, [value, progress]);
  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: c * (1 - progress.value) }));
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${c} ${c}`}
        animatedProps={animatedProps}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

/** Horizontal bar (0..1) that grows when the value changes. */
export function Bar({ value, color, track = colors.lineSoft, height = 8 }: {
  value: number;
  color: string;
  track?: string;
  height?: number;
}) {
  const w = useSharedValue(0);
  useEffect(() => {
    w.set(withTiming(Math.max(0, Math.min(1, value)), { duration: 700 }));
  }, [value, w]);
  const style = useAnimatedStyle(() => ({ width: `${w.value * 100}%` }));
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: track, overflow: 'hidden' }}>
      <Animated.View style={[{ height: '100%', borderRadius: height / 2, backgroundColor: color }, style]} />
    </View>
  );
}

/** Segmented step progress, e.g. a lesson's steps. */
export function Segments({ count, done, current, color = colors.primary, gap = 4, height = 7 }: {
  count: number;
  done: number;
  current?: number;
  color?: string;
  gap?: number;
  height?: number;
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', gap }}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height,
            borderRadius: height / 2,
            backgroundColor: i < done ? color : i === current ? colors.primaryMuted : colors.line,
          }}
        />
      ))}
    </View>
  );
}
