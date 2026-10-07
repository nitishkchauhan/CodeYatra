import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from './ui/Text';
import { STAGES, stageProgress } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

export function StageSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { state, setStage, recommendedStageId } = useProgress();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(180)} style={styles.backdrop}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close stage picker" style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View entering={SlideInDown.springify().damping(20)} style={[styles.sheet, { paddingBottom: 20 + insets.bottom }]} accessibilityViewIsModal>
        <View style={styles.grabber} />
        <View style={{ gap: 2, paddingHorizontal: 2 }}>
          <T variant="title" accessibilityRole="header">
            Your learning path
          </T>
          <T variant="bodySm" color={colors.ink2}>
            From your first block to a full-stack app
          </T>
        </View>
        {STAGES.map((stage, i) => {
          const on = stage.id === state.stageId;
          const { pct } = stageProgress(stage, state.completed);
          const tag = pct > 0 ? `${pct}%` : stage.id === recommendedStageId ? 'For you' : 'Start';
          return (
            <Pressable
              key={stage.id}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={`${stage.name}, stage ${i + 1}, ${stage.sub}, ${tag}`}
              onPress={() => {
                haptic.tap();
                setStage(stage.id);
                onClose();
              }}
              style={({ pressed }) => [
                styles.row,
                { borderColor: on ? stage.color : colors.line, borderWidth: on ? 2 : 1, backgroundColor: on ? stage.soft : colors.surface, transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}>
              <View style={[styles.num, { borderColor: stage.color, backgroundColor: on ? stage.color : colors.surface }]}>
                <T variant="label" color={on ? '#FFFFFF' : stage.color}>
                  {i + 1}
                </T>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="heading" style={{ fontSize: 15 }}>
                  {stage.name}
                </T>
                <T variant="caption" color={colors.ink2}>
                  {stage.sub} · {stage.audience}
                </T>
              </View>
              <View style={[styles.tag, { backgroundColor: pct > 0 ? stage.soft : stage.id === recommendedStageId ? colors.saffronSoft : colors.lineSoft }]}>
                <T variant="labelSm" color={pct > 0 ? stage.color : stage.id === recommendedStageId ? colors.saffronInk : colors.ink2} style={{ fontSize: 11 }}>
                  {tag}
                </T>
              </View>
            </Pressable>
          );
        })}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(22,20,43,0.45)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 16,
    gap: 10,
    boxShadow: '0 -10px 40px rgba(22,20,43,0.2)',
  },
  grabber: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.line },
  row: { borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 64 },
  num: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  tag: { height: 24, paddingHorizontal: 9, borderRadius: 12, justifyContent: 'center' },
});
