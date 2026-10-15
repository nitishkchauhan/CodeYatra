import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { alpha, GlassButton } from './ui/Glass';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { suggestionFor, type Suggestion } from '@/content/paths/recommend';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { glass } from '@/theme';

const LOOK: Record<Suggestion['id'], { icon: string; color: string }> = {
  mock: { icon: 'M12 8v4l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', color: '#C2410C' },
  cbse: { icon: 'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z M4 21V5 M8 7h6 M8 11h6', color: '#0F766E' },
  projects: { icon: 'M3 5h18v14H3z M3 9h18 M8 13h5 M8 16h8', color: '#4B3FD8' },
  path: { icon: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7', color: '#B03A16' },
  playground: { icon: 'M8 9l-4 3 4 3 M16 9l4 3-4 3 M13 6l-2 12', color: '#1D4ED8' },
};

/** "Made for you": one suggestion on Home that follows why the learner is learning (from onboarding or their plan). */
export function ForYouCard() {
  const { state, setStage } = useProgress();
  const s = suggestionFor(state.about, state.pathId);
  if (!s) return null;
  const look = LOOK[s.id];

  const open = () => {
    haptic.tap();
    if (s.id === 'cbse') setStage('cbse');
    const href: Href =
      s.id === 'mock'
        ? '/mock'
        : s.id === 'projects'
          ? '/practice'
          : s.id === 'playground'
            ? '/playground'
            : state.pathId
              ? { pathname: '/path/[id]', params: { id: state.pathId } }
              : '/paths';
    if (s.id !== 'cbse') router.push(href);
  };

  return (
    <GlassButton
      accessibilityRole="button"
      accessibilityLabel={`Made for you: ${s.title}. ${s.body} ${s.cta}`}
      onPress={open}
      tint={alpha(look.color, 0.06)}
      style={styles.card}>
      <View style={[styles.icon, { backgroundColor: alpha(look.color, 0.12) }]}>
        <Icon d={look.icon} size={22} color={look.color} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="kicker" color={look.color}>
          {s.kicker}
        </T>
        <T variant="label" color={glass.text}>
          {s.title}
        </T>
        <T variant="caption" color={glass.text2} numberOfLines={2}>
          {s.body}
        </T>
        <T variant="labelSm" color={look.color} style={{ marginTop: 4 }}>
          {s.cta} →
        </T>
      </View>
    </GlassButton>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  icon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
