import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { TrackBadge } from './TrackBadge';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { STAGES, stageProgress } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

/** A horizontal row of language icons. Tapping one switches track; "All" opens the full picker. */
export function TrackRail({ value, onChange, onMore }: { value: string; onChange: (id: string) => void; onMore?: () => void }) {
  const { state } = useProgress();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -16, flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      accessibilityRole="tablist">
      {STAGES.map((s) => {
        const on = s.id === value;
        const { pct } = stageProgress(s, state.completed);
        return (
          <Pressable
            key={s.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={`${s.name}, ${pct}% done`}
            onPress={() => {
              haptic.tap();
              onChange(s.id);
            }}
            style={({ pressed }) => [
              styles.item,
              {
                borderColor: on ? s.color : colors.line,
                borderWidth: on ? 2 : 1,
                backgroundColor: on ? s.soft : colors.surface,
              },
              pressed && { transform: [{ scale: 0.96 }] },
            ]}>
            <TrackBadge stage={s} size={34} />
            <T variant="labelSm" numberOfLines={1} color={on ? colors.ink : colors.ink2} style={{ fontSize: 11.5 }}>
              {s.short}
            </T>
            <View style={styles.track}>
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
              borderColor: colors.line,
              backgroundColor: colors.surface,
            },
            pressed && { transform: [{ scale: 0.96 }] },
          ]}>
          <View style={[styles.more]}>
            <Icon name="chevronDown" size={18} color={colors.primary} />
          </View>
          <T variant="labelSm" color={colors.ink2} style={{ fontSize: 11.5 }}>
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
  more: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surfaceTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
