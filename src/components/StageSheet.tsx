import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TrackBadge } from './TrackBadge';
import { T } from './ui/Text';
import { SECTIONS, STAGES, stageProgress } from '@/content';
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
            Choose a language
          </T>
          <T variant="bodySm" color={colors.ink2}>
            Each track has 5+ modules. Switch any time; progress is kept.
          </T>
        </View>
        <ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8 }} showsVerticalScrollIndicator={false}>
          {SECTIONS.map((section) => (
            <View key={section} style={{ gap: 8 }}>
              <T variant="kicker" color={colors.ink3} style={{ marginTop: 6, paddingHorizontal: 2 }}>
                {section.toUpperCase()}
              </T>
              {STAGES.filter((s) => s.section === section).map((stage) => {
                const on = stage.id === state.stageId;
                const { pct } = stageProgress(stage, state.completed);
                const tag = pct > 0 ? `${pct}%` : stage.id === recommendedStageId ? 'For you' : 'Start';
                return (
                  <Pressable
                    key={stage.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    accessibilityLabel={`${stage.name}, ${stage.sub}, ${tag}`}
                    onPress={() => {
                      haptic.tap();
                      setStage(stage.id);
                      onClose();
                    }}
                    style={({ pressed }) => [
                      styles.row,
                      {
                        borderColor: on ? stage.color : colors.line,
                        borderWidth: on ? 2 : 1,
                        backgroundColor: on ? stage.soft : colors.surface,
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      },
                    ]}>
                    <TrackBadge stage={stage} size={40} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <T variant="heading" style={{ fontSize: 15 }}>
                        {stage.name}
                      </T>
                      <T variant="caption" color={colors.ink2}>
                        {stage.sub} · {stage.audience}
                      </T>
                    </View>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: pct > 0 ? stage.soft : stage.id === recommendedStageId ? colors.saffronSoft : colors.lineSoft,
                        },
                      ]}>
                      <T variant="labelSm" color={pct > 0 ? stage.color : stage.id === recommendedStageId ? colors.saffronInk : colors.ink2} style={{ fontSize: 11 }}>
                        {tag}
                      </T>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(22,20,43,0.45)',
  },
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
    maxHeight: '86%',
    boxShadow: '0 -10px 40px rgba(22,20,43,0.2)',
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
  row: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 64,
  },
  tag: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: 12,
    justifyContent: 'center',
  },
});
