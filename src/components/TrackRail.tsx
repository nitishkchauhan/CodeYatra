import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { TrackBadge } from './TrackBadge';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { STAGES, stageProgress } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors, glass as g } from '@/theme';

/** A horizontal row of language icons. Tapping one switches track; "All" opens the full picker. `glass` styles it for dark glass screens. */
export function TrackRail({
  value,
  onChange,
  onMore,
  glass = false,
  first = [],
}: {
  value: string;
  onChange: (id: string) => void;
  onMore?: () => void;
  glass?: boolean;
  /** Tracks to show first (the learner's career path), in this order. */
  first?: string[];
}) {
  const { state } = useProgress();
  const rank = (id: string) => (first.includes(id) ? first.indexOf(id) : first.length + STAGES.findIndex((s) => s.id === id));
  const ordered = [...STAGES].sort((a, b) => rank(a.id) - rank(b.id));
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -16, flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      accessibilityRole="tablist">
      {ordered.map((s) => {
        const on = s.id === value;
        const { pct } = stageProgress(s, state.completed);
        return (
          <Pressable
            key={s.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={`${s.name}${first.includes(s.id) ? ', in your path' : ''}, ${pct}% done`}
            onPress={() => {
              haptic.tap();
              onChange(s.id);
            }}
            style={({ pressed }) => [
              styles.item,
              {
                borderColor: glass ? (on ? s.color : g.border) : on ? s.color : colors.line,
                borderWidth: on ? 2 : 1,
                backgroundColor: glass ? (on ? s.soft : g.fill) : on ? s.soft : colors.surface,
              },
              pressed && { transform: [{ scale: 0.96 }] },
            ]}>
            <TrackBadge stage={s} size={34} />
            {first.includes(s.id) ? <View style={styles.pathDot} /> : null}
            <T variant="labelSm" numberOfLines={1} color={glass ? (on ? g.text : g.text2) : on ? colors.ink : colors.ink2} style={{ fontSize: 11.5 }}>
              {s.short}
            </T>
            <View style={[styles.track, glass && { backgroundColor: g.track }]}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${Math.max(pct, on ? 4 : 0)}%`,
                    backgroundColor: s.color,
                  },
                ]}
              />
            </View>
          </Pressable>
        );
      })}
      {onMore ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all tracks"
          onPress={() => {
            haptic.tap();
            onMore();
          }}
          style={({ pressed }) => [
            styles.item,
            {
              borderWidth: 1,
              borderColor: glass ? g.border : colors.line,
              backgroundColor: glass ? g.fill : colors.surface,
            },
            pressed && { transform: [{ scale: 0.96 }] },
          ]}>
          <View style={[styles.more, glass && { backgroundColor: g.fillStrong }]}>
            <Icon name="chevronDown" size={18} color={glass ? g.text : colors.primary} />
          </View>
          <T variant="labelSm" color={glass ? g.text2 : colors.ink2} style={{ fontSize: 11.5 }}>
            All
          </T>
          <View style={[styles.track, { backgroundColor: 'transparent' }]} />
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 76,
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 5,
  },
  track: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lineSoft,
    overflow: 'hidden',
  },
  fill: { height: 4, borderRadius: 2 },
  pathDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.saffron, borderWidth: 1.5, borderColor: '#FFFFFF' },
  more: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surfaceTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
