import { router } from 'expo-router';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { alpha, GlassButton } from './ui/Glass';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { getLesson, STAGES } from '@/content';
import { dueToday } from '@/content/review';
import { revisionModules } from '@/content/revision';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { glass } from '@/theme';

const COLOR = '#B45309';

/** Number of modules due for spaced review today, plus modules flagged for revision by wrong answers. */
export function useRevisionCount() {
  const { state, today } = useProgress();
  const finished = STAGES.flatMap((s) => s.units.flatMap((u) => u.lessons))
    .filter((r) => state.completed[r.id] && getLesson(r.id)?.kind === 'lesson')
    .map((r) => r.id);
  return { due: dueToday(finished, state.reviews, today).length, weak: revisionModules(state.mistakes, state.checkpoints).length };
}

/** Home card shown only when there is something to revise: due reviews or weak modules. */
export function ReviewCard({ style }: { style?: StyleProp<ViewStyle> } = {}) {
  const { due, weak } = useRevisionCount();
  if (!due && !weak) return null;
  const title = due ? `${due} ${due === 1 ? 'module' : 'modules'} to review` : `${weak} ${weak === 1 ? 'module needs' : 'modules need'} revision`;
  const body = due ? 'A quick recall now helps you remember for longer.' : 'From questions you got wrong. Practise them again.';
  return (
    <GlassButton
      accessibilityRole="button"
      accessibilityLabel={`Revise: ${title}. ${body}`}
      onPress={() => {
        haptic.tap();
        router.push('/revise');
      }}
      tint={alpha(COLOR, 0.06)}
      style={[styles.card, style]}>
      <View style={[styles.icon, { backgroundColor: alpha(COLOR, 0.12) }]}>
        <Icon name="reset" size={22} color={COLOR} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="kicker" color={COLOR}>
          REVISE
        </T>
        <T variant="label" color={glass.text}>
          {title}
        </T>
        <T variant="caption" color={glass.text2} numberOfLines={2}>
          {body}
        </T>
        <T variant="labelSm" color={COLOR} style={{ marginTop: 4 }}>
          Revise now →
        </T>
      </View>
    </GlassButton>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  icon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
