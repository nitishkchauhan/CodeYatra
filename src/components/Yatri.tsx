import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from 'react-native-svg';

import { BRAND, MARK, markColors, MarkShapes } from './Logo';
import { haptic } from '@/lib/haptics';

export type Mood = 'happy' | 'focus' | 'sad' | 'celebrate';

/** Shop outfits drawn over the top of the logo. */
function Outfit({ id }: { id: string | null | undefined }) {
  switch (id) {
    case 'cricket-cap':
      return (
        <>
          <Path d="M24 44 Q26 12 60 12 Q94 12 96 44 Z" fill="#1F66E0" />
          <Path d="M70 40 h40 a5 5 0 0 1 -5 7 h-35 z" fill="#164FB0" />
          <Circle cx={60} cy={13} r={3} fill="#93C5FD" />
        </>
      );
    case 'explorer-hat':
      return (
        <>
          <Ellipse cx={60} cy={34} rx={52} ry={9} fill="#A07845" />
          <Path d="M32 34 Q34 6 60 6 Q86 6 88 34 Z" fill="#C49A5E" />
          <Rect x={32} y={25} width={56} height={6} fill="#6B4A22" />
        </>
      );
    case 'grad-cap':
      return (
        <>
          <Rect x={36} y={18} width={48} height={18} rx={4} fill="#2A2752" />
          <Polygon points="60,2 108,18 60,34 12,18" fill="#16142B" />
          <Path d="M60 18 L98 22 L98 40" stroke="#FF9F1C" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <Circle cx={98} cy={42} r={4} fill="#FF9F1C" />
        </>
      );
    case 'safa':
      return (
        <>
          <Path d="M22 48 Q18 8 60 8 Q102 8 98 48 Q60 32 22 48 Z" fill="#FF9F1C" />
          <Path d="M28 36 Q60 18 92 36 M30 26 Q60 10 90 26" stroke="#E8730C" strokeWidth={3} fill="none" />
          <Circle cx={72} cy={16} r={5} fill="#DB2777" />
          <Path d="M74 12 q8 -14 18 -8" stroke="#DB2777" strokeWidth={3} fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

/** Four-point sparkle centred on (x, y). */
const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z`;

/**
 * One footprint, animated on its own so the mark can "walk":
 * happy: footprints land one by one, farthest first; focus: they hop like a typing indicator;
 * celebrate: they pop; sad: they sink and fade.
 */
function Footprint({
  index,
  mood,
  moving,
  left,
  top,
  d,
  color,
  opacity,
}: {
  index: number;
  mood: Mood;
  moving: boolean;
  left: number;
  top: number;
  d: number;
  color: string;
  opacity: number;
}) {
  const o = useSharedValue(opacity);
  const ty = useSharedValue(0);
  const sc = useSharedValue(1);

  useEffect(() => {
    o.set(mood === 'sad' ? opacity * 0.6 : opacity);
    ty.set(mood === 'sad' ? d * 0.4 : 0);
    sc.set(1);
    if (!moving) return;
    const ease = Easing.inOut(Easing.quad);
    if (mood === 'happy') {
      // A 2.4 s walk: the farthest footprint lands first, the nearest last, then all fade together.
      const T = 2400;
      const at = (2 - index) * 260;
      o.set(
        withRepeat(
          withSequence(
            withTiming(0.12, { duration: 0 }),
            withDelay(at, withTiming(opacity, { duration: 240 })),
            withDelay(T - at - 640, withTiming(0.12, { duration: 400 })),
          ),
          -1,
        ),
      );
      sc.set(
        withRepeat(
          withSequence(
            withTiming(0.6, { duration: 0 }),
            withDelay(at, withTiming(1, { duration: 240, easing: Easing.out(Easing.back(2)) })),
            withDelay(T - at - 240, withTiming(1, { duration: 0 })),
          ),
          -1,
        ),
      );
    } else if (mood === 'focus') {
      // Typing dots: each one hops in turn.
      o.set(Math.max(opacity, 0.75));
      ty.set(
        withRepeat(
          withSequence(
            withDelay((2 - index) * 150, withTiming(-d * 0.9, { duration: 240, easing: ease })),
            withTiming(0, { duration: 240, easing: ease }),
            withDelay(index * 150 + 300, withTiming(0, { duration: 0 })),
          ),
          -1,
        ),
      );
    } else if (mood === 'celebrate') {
      sc.set(
        withRepeat(
          withSequence(
            withDelay(index * 120, withTiming(1.6, { duration: 220 })),
            withTiming(1, { duration: 260 }),
            withDelay((2 - index) * 120 + 600, withTiming(1, { duration: 0 })),
          ),
          -1,
        ),
      );
    }
  }, [mood, moving, index, opacity, d, o, ty, sc]);

  const style = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ translateY: ty.value }, { scale: sc.value }] }));
  return <Animated.View pointerEvents="none" style={[{ position: 'absolute', left, top, width: d, height: d, borderRadius: d / 2, backgroundColor: color }, style]} />;
}

/** Wraps Yatri in a button when it can be tapped. */
function Tappable({ on, onTap, children }: { on: boolean; onTap: () => void; children: ReactNode }) {
  if (!on) return <>{children}</>;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Yatri. Tap to say hello" onPress={onTap} hitSlop={8}>
      {children}
    </Pressable>
  );
}

/**
 * Yatri is the CodeYatra logo (a lowercase "cy" leaving footprints), drawn in a 120×140 box.
 * Moods change its motion: happy walks its footprints, focus "types" them, sad greys out and droops,
 * celebrate jumps with sparkles. With `interactive`, a tap makes it hop and celebrate for a moment.
 */
export function Yatri({
  size = 120,
  mood: moodProp = 'happy',
  armsUp,
  bob = false,
  dark = false,
  outfit,
  interactive = false,
}: {
  size?: number;
  mood?: Mood;
  armsUp?: boolean;
  bob?: boolean;
  dark?: boolean;
  outfit?: string | null;
  /** Tap to make Yatri hop and celebrate. */
  interactive?: boolean;
}) {
  const reduce = useReducedMotion();
  const [cheer, setCheer] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const mood: Mood = cheer || armsUp ? 'celebrate' : moodProp;
  const celebrate = mood === 'celebrate';
  const moving = (bob || cheer) && !reduce;

  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const turn = useSharedValue(mood === 'sad' ? -6 : 0);

  useEffect(() => {
    turn.set(mood === 'sad' ? -6 : 0);
    if (!moving) {
      y.set(0);
      scale.set(1);
      return;
    }
    const ease = Easing.inOut(Easing.quad);
    if (celebrate) {
      y.set(
        withRepeat(
          withSequence(
            withTiming(-12, { duration: 300, easing: Easing.out(Easing.quad) }),
            withTiming(0, { duration: 380, easing: Easing.in(Easing.quad) }),
            withTiming(0, { duration: 600 }),
          ),
          -1,
        ),
      );
      turn.set(withRepeat(withSequence(withTiming(-5, { duration: 300 }), withTiming(4, { duration: 380 }), withTiming(0, { duration: 600 })), -1));
    } else if (mood === 'focus') {
      scale.set(withRepeat(withSequence(withTiming(1.04, { duration: 900, easing: ease }), withTiming(1, { duration: 900, easing: ease })), -1));
    } else if (mood === 'sad') {
      y.set(withRepeat(withSequence(withTiming(3, { duration: 1600, easing: ease }), withTiming(0, { duration: 1600, easing: ease })), -1));
    } else {
      y.set(withRepeat(withSequence(withTiming(-4, { duration: 1300, easing: ease }), withTiming(0, { duration: 1300, easing: ease })), -1));
    }
  }, [moving, mood, celebrate, y, scale, turn]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }, { scale: scale.value }, { rotate: `${turn.value}deg` }] }));

  const tap = () => {
    haptic.tap();
    if (reduce) return;
    setCheer(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCheer(false), 1600);
  };

  // With a hat on, the mark shrinks a little and sits lower so the hat has room.
  const k = outfit ? 0.84 : 1;
  const markX = (120 - 120 * k) / 2;
  const markY = outfit ? 30 : 24;
  const u = size / 120;
  const height = (size * 140) / 120;
  const stepColor = markColors({ dark, muted: mood === 'sad' }).step;

  return (
    <Tappable on={interactive} onTap={tap}>
      <Animated.View
        style={[{ width: size, height }, style]}
        accessibilityElementsHidden={!interactive}
        importantForAccessibility={interactive ? 'auto' : 'no-hide-descendants'}>
        <Svg width={size} height={height} viewBox="0 0 120 140">
          <Ellipse cx={60} cy={130} rx={30} ry={4} fill="#16142B" opacity={dark ? 0 : 0.08} />
          {celebrate ? (
            <>
              <Path d={sparkle(14, 34, 7)} fill={BRAND.gold} />
              <Path d={sparkle(108, 26, 6)} fill={BRAND.teal} />
              <Path d={sparkle(110, 96, 7)} fill={BRAND.gold} />
              <Path d={sparkle(100, 118, 4)} fill={dark ? BRAND.lavender : BRAND.indigo} />
            </>
          ) : null}
          <G transform={`translate(${markX} ${markY}) scale(${k})`}>
            <MarkShapes dark={dark} muted={mood === 'sad'} footprints={false} />
          </G>
          <Outfit id={outfit} />
        </Svg>
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, width: size, height }}>
          {MARK.steps.map((s, i) => {
            const d = 2 * s.r * k * u;
            return (
              <Footprint
                key={s.x}
                index={i}
                mood={mood}
                moving={moving}
                left={(markX + k * s.x) * u - d / 2}
                top={(markY + k * s.y) * u - d / 2}
                d={d}
                color={stepColor}
                opacity={s.o}
              />
            );
          })}
        </View>
      </Animated.View>
    </Tappable>
  );
}
