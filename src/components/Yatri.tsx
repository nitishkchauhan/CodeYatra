import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from 'react-native-svg';

import { BRAND, MarkShapes } from './Logo';

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
 * Yatri is the CodeYatra logo (< Y > with an arrow going up), drawn in a 120×140 box.
 * Moods change its motion and colour: happy bobs, focus pulses, sad droops in grey, celebrate jumps with sparkles.
 */
export function Yatri({
  size = 120,
  mood = 'happy',
  armsUp = mood === 'celebrate',
  bob = false,
  dark = false,
  outfit,
}: {
  size?: number;
  mood?: Mood;
  armsUp?: boolean;
  bob?: boolean;
  dark?: boolean;
  outfit?: string | null;
}) {
  const reduce = useReducedMotion();
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const turn = useSharedValue(mood === 'sad' ? -8 : 0);
  const celebrate = armsUp || mood === 'celebrate';

  useEffect(() => {
    turn.set(mood === 'sad' ? -8 : 0);
    if (!bob || reduce) {
      y.set(0);
      scale.set(1);
      return;
    }
    const ease = Easing.inOut(Easing.quad);
    if (celebrate) {
      y.set(
        withRepeat(
          withSequence(
            withTiming(-10, { duration: 320, easing: Easing.out(Easing.quad) }),
            withTiming(0, { duration: 380, easing: Easing.in(Easing.quad) }),
            withTiming(0, { duration: 700 }),
          ),
          -1,
        ),
      );
      turn.set(withRepeat(withSequence(withTiming(-5, { duration: 320 }), withTiming(4, { duration: 380 }), withTiming(0, { duration: 700 })), -1));
    } else if (mood === 'focus') {
      scale.set(withRepeat(withSequence(withTiming(1.05, { duration: 900, easing: ease }), withTiming(1, { duration: 900, easing: ease })), -1));
    } else if (mood === 'sad') {
      y.set(withRepeat(withSequence(withTiming(3, { duration: 1600, easing: ease }), withTiming(0, { duration: 1600, easing: ease })), -1));
    } else {
      y.set(withRepeat(withSequence(withTiming(-5, { duration: 1300, easing: ease }), withTiming(0, { duration: 1300, easing: ease })), -1));
    }
  }, [bob, reduce, mood, celebrate, y, scale, turn]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }, { scale: scale.value }, { rotate: `${turn.value}deg` }] }));

  // With a hat on, the mark shrinks a little and sits lower so the hat has room.
  const k = outfit ? 0.86 : 1;
  const markX = (120 - 120 * k) / 2;
  const markY = outfit ? 46 : 26;
  return (
    <Animated.View style={style} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={size} height={(size * 140) / 120} viewBox="0 0 120 140">
        <Ellipse cx={60} cy={134} rx={30} ry={4} fill="#16142B" opacity={dark ? 0 : 0.1} />
        {celebrate ? (
          <>
            <Path d={sparkle(10, 30, 7)} fill={BRAND.gold} />
            <Path d={sparkle(110, 24, 6)} fill={BRAND.teal} />
            <Path d={sparkle(8, 96, 5)} fill={dark ? BRAND.violetOnDark : BRAND.violet} />
            <Path d={sparkle(112, 98, 7)} fill={BRAND.gold} />
          </>
        ) : null}
        <G transform={`translate(${markX} ${markY}) scale(${k})`}>
          <MarkShapes id={`yatri-${mood}-${dark ? 'd' : 'l'}-${outfit ?? 'none'}`} dark={dark} muted={mood === 'sad'} />
        </G>
        {mood === 'focus' ? <Circle cx={100} cy={markY + 8} r={3} fill={BRAND.teal} opacity={0.9} /> : null}
        <Outfit id={outfit} />
      </Svg>
    </Animated.View>
  );
}
