import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from './ui/Icon';
import { Bar } from './ui/Progress';
import { T } from './ui/Text';
import { findPath, pathSummary } from '@/content/paths';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

/** Home card: the learner's career path and its next stop, or an invite to pick one. */
export function MyPathCard() {
  const { state } = useProgress();
  const path = findPath(state.pathId);

  if (!path) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Choose a career path"
        onPress={() => router.push('/paths')}
        style={({ pressed }) => [card, styles.card, pressed && { transform: [{ scale: 0.98 }] }]}>
        <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
          <Icon name="route" size={22} color={colors.primary} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="label">What do you want to become?</T>
          <T variant="caption">Frontend, backend, data, placements… see the full route.</T>
        </View>
        <Icon name="chevronRight" size={18} color={colors.ink3} />
      </Pressable>
    );
  }

  const s = pathSummary(path, state.completed, state.pathMarks);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Your path: ${path.title}, ${s.pct}% job-ready${s.next ? `, next stop ${s.next.title}` : ''}`}
      onPress={() => router.push({ pathname: '/path/[id]', params: { id: path.id } })}
      style={({ pressed }) => [card, styles.card, pressed && { transform: [{ scale: 0.98 }] }]}>
      <View style={[styles.badge, { backgroundColor: path.soft }]}>
        <Icon d={path.icon} size={22} color={path.color} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <T variant="kicker" color={path.ink}>
            {path.title.toUpperCase()}
          </T>
          <T variant="labelSm" color={path.ink}>
            {s.pct}%
          </T>
        </View>
        <T variant="label" numberOfLines={1}>
          {s.next ? `Next: ${s.next.title}` : 'Every stop done. You’re job-ready!'}
        </T>
        <Bar value={s.pct / 100} color={path.color} height={6} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
