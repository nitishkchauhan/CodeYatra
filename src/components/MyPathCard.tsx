import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { alpha, GlassButton } from './ui/Glass';
import { Icon } from './ui/Icon';
import { Bar } from './ui/Progress';
import { T } from './ui/Text';
import { findPath, pathSummary } from '@/content/paths';
import { useProgress } from '@/state/progress';
import { glass } from '@/theme';

/** Home card: the learner's career path and its next stop, or an invite to pick one. */
export function MyPathCard() {
  const { state } = useProgress();
  const path = findPath(state.pathId);

  if (!path) {
    return (
      <GlassButton accessibilityRole="button" accessibilityLabel="Choose a career path" onPress={() => router.push('/paths')} style={styles.card}>
        <View style={[styles.badge, { backgroundColor: alpha(glass.violet, 0.35) }]}>
          <Icon name="route" size={22} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="label" color={glass.text}>
            What do you want to become?
          </T>
          <T variant="caption" color={glass.text2}>
            Frontend, backend, data, placements… see the full route.
          </T>
        </View>
        <Icon name="chevronRight" size={18} color={glass.text3} />
      </GlassButton>
    );
  }

  const s = pathSummary(path, state.completed, state.pathMarks);
  return (
    <GlassButton
      accessibilityRole="button"
      accessibilityLabel={`Your path: ${path.title}, ${s.pct}% job-ready${s.next ? `, next stop ${s.next.title}` : ''}`}
      onPress={() => router.push({ pathname: '/path/[id]', params: { id: path.id } })}
      style={styles.card}>
      <View style={[styles.badge, { backgroundColor: path.soft }]}>
        <Icon d={path.icon} size={22} color={path.ink} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <T variant="kicker" color={glass.saffron} numberOfLines={1} style={{ flex: 1 }}>
            {path.title.toUpperCase()}
          </T>
          <T variant="labelSm" color={glass.text}>
            {s.pct}%
          </T>
        </View>
        <T variant="label" color={glass.text} numberOfLines={1}>
          {s.next ? `Next: ${s.next.title}` : 'Every stop done. You’re job-ready!'}
        </T>
        <Bar value={s.pct / 100} color={glass.saffron} track={glass.track} height={6} />
      </View>
    </GlassButton>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
