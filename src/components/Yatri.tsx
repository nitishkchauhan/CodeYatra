import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, Ellipse, Line, LinearGradient, Path, Polygon, Rect, Stop } from 'react-native-svg';

export type Mood = 'happy' | 'focus' | 'sad' | 'celebrate';

/** Shop outfits drawn over Yatri's head. */
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

const EYE = '#5EEAD4';

function Face({ mood }: { mood: Mood }) {
  if (mood === 'focus') {
    return (
      <>
        <Rect x={45} y={51} width={8} height={13} rx={4} fill={EYE} />
        <Rect x={67} y={51} width={8} height={13} rx={4} fill={EYE} />
      </>
    );
  }
  if (mood === 'sad') {
    return (
      <>
        <Circle cx={49} cy={58} r={5} fill="#FCA5A5" />
        <Circle cx={71} cy={58} r={3.5} fill="#FCA5A5" />
        <Path d="M51 70 q9 -6 18 0" stroke="#FCA5A5" strokeWidth={3} strokeLinecap="round" fill="none" />
      </>
    );
  }
  return (
    <>
      <Path d="M44 59 q5 -7 10 0 M66 59 q5 -7 10 0" stroke={EYE} strokeWidth={4} strokeLinecap="round" fill="none" />
      {mood === 'celebrate' && <Path d="M53 66 q7 7 14 0" stroke={EYE} strokeWidth={3} strokeLinecap="round" fill="none" />}
    </>
  );
}

/** Yatri, the travelling robot. Drawn in a 120×140 box. */
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
  useEffect(() => {
    if (!bob || reduce) return;
    y.set(withRepeat(withSequence(withTiming(-5, { duration: 1300 }), withTiming(0, { duration: 1300 })), -1));
  }, [bob, reduce, y]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));

  const limb = dark ? '#B9B2F7' : '#4B3FD8';
  return (
    <Animated.View style={style}>
      <Svg width={size} height={(size * 140) / 120} viewBox="0 0 120 140">
        <Defs>
          <LinearGradient id="ybody" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" />
            <Stop offset="1" stopColor="#D8D3FB" />
          </LinearGradient>
          <LinearGradient id="ypack" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFB547" />
            <Stop offset="1" stopColor="#EE8400" />
          </LinearGradient>
        </Defs>
        <Ellipse cx={60} cy={133} rx={30} ry={4.5} fill="#16142B" opacity={dark ? 0 : 0.12} />
        <Rect x={70} y={40} width={36} height={52} rx={13} fill="url(#ypack)" />
        <Rect x={74} y={34} width={28} height={10} rx={5} fill="#0EA5A0" />
        <Line x1={60} y1={24} x2={60} y2={11} stroke={limb} strokeWidth={3.5} strokeLinecap="round" />
        <Circle cx={60} cy={9} r={5.5} fill="#FF9F1C" />
        {armsUp ? (
          <>
            <Path d="M24 72 q-13 -6 -10 -24" stroke={limb} strokeWidth={7} strokeLinecap="round" fill="none" />
            <Path d="M96 72 q13 -6 10 -24" stroke={limb} strokeWidth={7} strokeLinecap="round" fill="none" />
          </>
        ) : (
          <Path d="M23 76 q-12 -4 -11 -22" stroke={limb} strokeWidth={7} strokeLinecap="round" fill="none" />
        )}
        <Rect x={38} y={114} width={16} height={16} rx={8} fill={dark ? '#8F86F2' : '#4B3FD8'} />
        <Rect x={66} y={114} width={16} height={16} rx={8} fill={dark ? '#8F86F2' : '#4B3FD8'} />
        <Rect x={22} y={22} width={76} height={98} rx={38} fill="url(#ybody)" stroke="#CBC5F6" strokeWidth={1.5} />
        <Rect x={31} y={38} width={58} height={40} rx={17} fill="#16142B" />
        <Path d="M38 46 q4 -3 9 -3" stroke="#FFFFFF" strokeOpacity={0.3} strokeWidth={2.5} strokeLinecap="round" fill="none" />
        <Face mood={mood} />
        <Circle cx={60} cy={97} r={6} fill="#0EA5A0" />
        <Circle cx={60} cy={97} r={2.5} fill="#B9F4EE" />
        <Outfit id={outfit} />
      </Svg>
    </Animated.View>
  );
}
