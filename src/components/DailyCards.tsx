import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Glyph, Icon } from './ui/Icon';
import { T } from './ui/Text';
import { dailyDone, dailyId, DAILY_SIZE, findStage } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

/** Daily challenge and mistakes review: two short reasons to open the app every day. */
export function DailyCards() {
  const { state, today } = useProgress();
  const stage = findStage(state.stageId);
  const done = dailyDone(state.completed, today);
  const toReview = Object.keys(state.mistakes).length;

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={done ? 'Daily challenge done for today' : `Daily challenge: ${DAILY_SIZE} ${stage.short} exercises`}
        onPress={() => {
          haptic.tap();
          router.push({ pathname: '/lesson/[id]', params: { id: dailyId(today, stage.id) } });
        }}
        style={({ pressed }) => [styles.card, { backgroundColor: done ? colors.successSoft : '#FFF4E3', borderColor: done ? '#BFE8CC' : '#FFD9A3' }, pressed && styles.pressed]}>
        <View style={[styles.icon, { backgroundColor: done ? colors.success : colors.saffron }]}>
          {done ? <Icon name="check" size={18} color="#FFFFFF" strokeWidth={3} /> : <Glyph name="bolt" size={18} color="#FFFFFF" />}
        </View>
        <T variant="label" style={{ fontSize: 14 }}>
          Daily challenge
        </T>
        <T variant="caption" numberOfLines={2}>
          {done ? 'Done! Come back tomorrow' : `${DAILY_SIZE} quick ${stage.short} exercises`}
        </T>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={toReview ? `Review ${toReview} mistakes` : 'No mistakes to review'}
        disabled={!toReview}
        onPress={() => {
          haptic.tap();
          router.push({ pathname: '/lesson/[id]', params: { id: 'review' } });
        }}
        style={({ pressed }) => [styles.card, { backgroundColor: toReview ? colors.surfaceTint : colors.surface, borderColor: toReview ? '#D9D5F7' : colors.line }, pressed && styles.pressed]}>
        <View style={[styles.icon, { backgroundColor: toReview ? colors.primary : colors.lineSoft }]}>
          <Icon d="M4 12a8 8 0 1 0 2.3-5.6 M4 4v4h4" size={18} color={toReview ? '#FFFFFF' : colors.ink3} strokeWidth={2.2} />
        </View>
        <T variant="label" style={{ fontSize: 14 }}>
          {toReview ? `Review · ${toReview}` : 'Review'}
        </T>
        <T variant="caption" numberOfLines={2}>
          {toReview ? 'Fix past mistakes for good' : 'Mistakes you make land here'}
        </T>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { ...card, flex: 1, borderRadius: 18, borderWidth: 1, padding: 12, gap: 4, minHeight: 112 },
  icon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  pressed: { transform: [{ scale: 0.97 }] },
});
