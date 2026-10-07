import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/Icon';
import { Segments } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { colors } from '@/theme';

export function LessonTopBar({ steps, index, xp, onClose }: { steps: number; index: number; xp: number; onClose: () => void }) {
  return (
    <View style={styles.top}>
      <Pressable accessibilityRole="button" accessibilityLabel="Exit lesson" onPress={onClose} hitSlop={6} style={styles.close}>
        <Icon name="close" size={22} color={colors.ink2} strokeWidth={2.2} />
      </Pressable>
      <View accessibilityRole="progressbar" accessibilityLabel={`Step ${index + 1} of ${steps}`} style={{ flex: 1 }}>
        <Segments count={steps} done={index} current={index} />
      </View>
      <View style={styles.xp}>
        <T variant="labelSm" color={colors.saffronInk}>
          +{xp} XP
        </T>
      </View>
    </View>
  );
}

/** Fixed bottom area for a step's main actions. */
export function ActionBar({ children, tone }: { children: ReactNode; tone?: 'success' | 'danger' }) {
  const insets = useSafeAreaInsets();
  const bg = tone === 'success' ? colors.successSoft : tone === 'danger' ? colors.dangerSoft : colors.surface;
  const line = tone === 'success' ? '#BFE8CC' : tone === 'danger' ? '#F7C7C8' : colors.lineSoft;
  return (
    <View style={[styles.bar, { backgroundColor: bg, borderTopColor: line, paddingBottom: 16 + insets.bottom }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  top: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  close: { width: 44, height: 44, marginLeft: -10, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  xp: { height: 28, paddingHorizontal: 10, borderRadius: 14, backgroundColor: colors.saffronSoft, justifyContent: 'center' },
  bar: { borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 16, gap: 12 },
});
