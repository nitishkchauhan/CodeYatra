import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInDown,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import { ActionBar } from './Shell';
import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { QuizStep as Step } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

export function QuizStep({ step, onDone, onMistake }: { step: Step; onDone: () => void; onMistake: () => void }) {
  const t = useT();
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const shake = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  const right = checked && pick === step.answer;

  const check = () => {
    if (pick === null) return;
    setChecked(true);
    if (pick === step.answer) haptic.success();
    else {
      haptic.error();
      onMistake();
      shake.set(withSequence(
        withTiming(-7, { duration: 50 }),
        withTiming(7, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      ));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker">QUICK CHECK</T>
          <T variant="display" accessibilityRole="header">
            {step.prompt}
          </T>
        </Animated.View>
        {step.code ? (
          <Animated.View entering={FadeInDown.delay(80).duration(320)} style={styles.code}>
            <CodeBlock lines={step.code.lines} lang={step.code.lang} />
          </Animated.View>
        ) : null}
        <Animated.View entering={FadeInDown.delay(160).duration(320)} style={[{ gap: 10 }, shakeStyle]} accessibilityRole="radiogroup">
          {step.options.map((option, i) => {
            const selected = pick === i;
            let border: string = colors.line;
            let bg: string = colors.surface;
            let badge: string = colors.lineSoft;
            let badgeInk: string = colors.ink2;
            if (selected) [border, bg, badge, badgeInk] = [colors.primary, colors.surfaceTint, colors.primary, '#FFFFFF'];
            if (checked && i === step.answer) [border, bg, badge, badgeInk] = [colors.success, colors.successSoft, colors.success, '#FFFFFF'];
            else if (checked && selected) [border, bg, badge, badgeInk] = [colors.danger, colors.dangerSoft, colors.danger, '#FFFFFF'];
            return (
              <Pressable
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected, disabled: checked }}
                disabled={checked}
                onPress={() => {
                  haptic.tap();
                  setPick(i);
                }}
                style={({ pressed }) => [
                  styles.option,
                  { borderColor: border, backgroundColor: bg, borderWidth: selected || (checked && i === step.answer) ? 2 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}>
                <View style={[styles.badge, { backgroundColor: badge }]}>
                  <T variant="labelSm" color={badgeInk}>
                    {'ABCD'[i]}
                  </T>
                </View>
                <T style={[{ flex: 1, color: colors.ink }, step.mono ? { fontFamily: fonts.mono, fontSize: 15 } : { fontFamily: fonts.bodySemibold, fontSize: 15 }]}>
                  {option}
                </T>
              </Pressable>
            );
          })}
        </Animated.View>
      </ScrollView>

      {!checked ? (
        <ActionBar>
          <Button label={t('check')} disabled={pick === null} onPress={check} />
        </ActionBar>
      ) : (
        <Animated.View entering={SlideInDown.springify().damping(20)}>
          <ActionBar tone={right ? 'success' : 'danger'}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }} accessibilityLiveRegion="polite">
              <Animated.View entering={ZoomIn.delay(120)} style={[styles.verdict, { backgroundColor: right ? colors.success : colors.danger }]}>
                <Icon name={right ? 'check' : 'cross'} size={18} color="#FFFFFF" strokeWidth={2.6} />
              </Animated.View>
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="heading" color={right ? colors.successInk : colors.dangerInk} style={{ fontSize: 17 }}>
                  {right ? 'Correct! शाबाश' : 'Not quite'}
                </T>
                <T variant="bodySm" color={right ? '#1F5B36' : '#7A2A2C'} style={{ fontSize: 14, lineHeight: 20 }}>
                  {right ? step.right : step.wrong}
                </T>
              </View>
            </View>
            {right ? (
              <Button variant="success" label={t('continue')} onPress={onDone} />
            ) : (
              <Button
                variant="danger"
                label={t('tryAgain')}
                onPress={() => {
                  setChecked(false);
                  setPick(null);
                }}
              />
            )}
          </ActionBar>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24, gap: 16 },
  code: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden', paddingVertical: 4 },
  option: { minHeight: 56, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14 },
  badge: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  verdict: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
