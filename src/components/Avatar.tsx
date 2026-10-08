import { Image } from 'expo-image';
import { View } from 'react-native';

import { Yatri } from './Yatri';
import { colors } from '@/theme';

/** The learner's photo, or Yatri in their outfit on their chosen colour. */
export function Avatar({ uri, color = colors.brand, outfit, size = 72, ring = colors.saffron }: { uri?: string | null; color?: string; outfit?: string | null; size?: number; ring?: string | null }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: ring ? `0 0 0 3px ${ring}` : undefined,
      }}>
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" transition={150} accessibilityIgnoresInvertColors />
      ) : (
        <Yatri size={size * 0.72} outfit={outfit ?? null} dark />
      )}
    </View>
  );
}

export const AVATAR_COLORS = ['#1F1B83', '#4B3FD8', '#0E7490', '#15803D', '#C2410C', '#BE185D', '#16142B', '#A16207'];
