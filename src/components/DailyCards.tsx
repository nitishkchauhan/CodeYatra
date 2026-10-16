import { router } from 'expo-router';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { alpha, GlassButton } from './ui/Glass';
import { Glyph, Icon } from './ui/Icon';
import { T } from './ui/Text';
import { dailyDone, dailyId, DAILY_SIZE, findStage } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors, glass } from '@/theme';

/** Daily challenge and mistakes review: two short reasons to open the app every day. Glass cards for Home. */
export function DailyCards({ style }: { style?: StyleProp<ViewStyle> } = {}) {
  const { state, today } = useProgress();
  const stage = findStage(state.stageId);
  const done = dailyDone(state.completed, today);
  const toReview = Object.keys(state.mistakes).length;

  return (
    <View style={[{ flexDirection: 'row', gap: 10 }, style]}>
      <GlassButton
        accessibilityRole="button"
        accessibilityLabel={done ? 'Daily challenge done for today' : `Daily challenge: ${DAILY_SIZE} ${stage.short} exercises`}
        onPress={() => {
          haptic.tap();
          router.push({ pathname: '/lesson/[id]', params: { id: dailyId(today, stage.id) } });
        }}
        tint={alpha(done ? '#16A34A' : '#FF9F1C', 0.1)}
        style={styles.card}>
        <View style={[styles.icon, { backgroundColor: done ? colors.success : colors.saffron }]}>
          {done ? <Icon name="check" size={18} color="#FFFFFF" strokeWidth={3} /> : <Glyph name="bolt" size={18} color="#FFFFFF" />}
        </View>
        <T variant="label" color={glass.text} style={{ fontSize: 14 }}>
          Daily challenge
        </T>
        <T variant="caption" color={glass.text2} numberOfLines={2}>
          {done ? 'Done! Come back tomorrow' : `${DAILY_SIZE} quick ${stage.short} exercises`}
        </T>
      </GlassButton>
      <GlassButton
        accessibilityRole="button"
        accessibilityLabel={toReview ? `Review ${toReview} mistakes` : 'No mistakes to review'}
        disabled={!toReview}
        onPress={() => {
          haptic.tap();
          router.push({ pathname: '/lesson/[id]', params: { id: 'review' } });
        }}
        tint={toReview ? alpha(glass.violet, 0.16) : undefined}
        style={styles.card}>
        <View style={[styles.icon, { backgroundColor: toReview ? colors.primary : colors.lineSoft }]}>
          <Icon d="M4 12a8 8 0 1 0 2.3-5.6 M4 4v4h4" size={18} color={toReview ? '#FFFFFF' : glass.text3} strokeWidth={2.2} />
        </View>
        <T variant="label" color={glass.text} style={{ fontSize: 14 }}>
          {toReview ? `Review · ${toReview}` : 'Review'}
        </T>
        <T variant="caption" color={glass.text2} numberOfLines={2}>
          {toReview ? 'Fix past mistakes for good' : 'Mistakes you make land here'}
        </T>
      </GlassButton>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, padding: 12, gap: 4, minHeight: 112 },
  icon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
});
