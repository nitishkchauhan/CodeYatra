import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { SlideInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
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

/** The answer bar every checked exercise shares: verdict, explanation, then Continue or Try again. */
export function VerdictBar({ right, title, message, onContinue, onRetry }: { right: boolean; title?: string; message: string; onContinue: () => void; onRetry: () => void }) {
  return (
    <Animated.View entering={SlideInDown.springify().damping(20)}>
      <ActionBar tone={right ? 'success' : 'danger'}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }} accessibilityLiveRegion="polite">
          <Animated.View entering={ZoomIn.delay(120)} style={[styles.verdict, { backgroundColor: right ? colors.success : colors.danger }]}>
            <Icon name={right ? 'check' : 'cross'} size={18} color="#FFFFFF" strokeWidth={2.6} />
          </Animated.View>
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="heading" color={right ? colors.successInk : colors.dangerInk} style={{ fontSize: 17 }}>
              {title ?? (right ? 'Correct!' : 'Not quite')}
            </T>
            <T variant="bodySm" color={right ? '#1F5B36' : '#7A2A2C'} style={{ fontSize: 14, lineHeight: 20 }}>
              {message}
            </T>
          </View>
        </View>
        {right ? <Button variant="success" label="Continue" onPress={onContinue} /> : <Button variant="danger" label="Try again" onPress={onRetry} />}
      </ActionBar>
    </Animated.View>
  );
}

/** Kicker, title and instructions at the top of an exercise. */
export function StepHeader({ kicker, title, instructions, color }: { kicker: string; title: string; instructions?: string; color: string }) {
  return (
    <View style={{ gap: 6 }}>
      <T variant="kicker" color={color}>
        {kicker}
      </T>
      <T variant="title" accessibilityRole="header">
        {title}
      </T>
      {instructions ? (
        <T variant="bodySm" style={{ fontSize: 14, lineHeight: 21 }}>
          {instructions}
        </T>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  verdict: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  top: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  close: { width: 44, height: 44, marginLeft: -10, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  xp: { height: 28, paddingHorizontal: 10, borderRadius: 14, backgroundColor: colors.saffronSoft, justifyContent: 'center' },
  bar: { borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 16, gap: 12 },
});
