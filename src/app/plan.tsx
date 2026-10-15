import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findPath } from '@/content/paths';
import {
  goalForMinutes,
  levelFor,
  MINUTES,
  minutesForGoal,
  reasonFor,
  recommendPathId,
  type Interest,
  type Minutes,
  type Who,
  type Why,
} from '@/content/paths/recommend';
import { INTEREST, MINUTE_TEXT, WHO, WHY, type Option } from '@/content/plan';
import { haptic } from '@/lib/haptics';
import { syncReminder } from '@/lib/reminders';
import { track } from '@/lib/telemetry';
import { useProgress, type LearnerLevel } from '@/state/progress';
import { card, colors } from '@/theme';

/** Learners who finished the old onboarding have a level but no answers yet. */
const WHO_FOR_LEVEL: Record<LearnerLevel, Who> = { school: 'senior', college: 'college', curious: 'other' };

/** "Your learning plan": change the onboarding answers any time. They set the daily goal, level, Home suggestions and path advice. */
export default function PlanScreen() {
  const toast = useToast();
  const { state, updatePlan, setPath } = useProgress();
  const [who, setWho] = useState<Who>(state.about?.who ?? WHO_FOR_LEVEL[state.level]);
  const [why, setWhy] = useState<Why>(state.about?.why ?? 'job');
  const [interest, setInterest] = useState<Interest>(state.about?.interest ?? 'unsure');
  const [minutes, setMinutes] = useState<Minutes>(minutesForGoal(state.dailyGoal));

  const about = { who, why, interest };
  const suggested = findPath(recommendPathId(about));
  const current = findPath(state.pathId);
  const changed = who !== state.about?.who || why !== state.about?.why || interest !== state.about?.interest || goalForMinutes(minutes) !== state.dailyGoal;

  const save = async () => {
    haptic.success();
    updatePlan({ about, dailyGoal: goalForMinutes(minutes), level: levelFor(who) });
    // The reminder text mentions the daily minutes, so reschedule it with the new plan.
    if (state.reminder.enabled) await syncReminder(state.reminder, { name: state.name, minutes, pathTitle: current?.title });
    track('plan_updated', { who, why, interest, minutes });
    toast('Plan saved. Home now shows what fits you.');
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Your learning plan" subtitle="Change your answers any time" close />
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="Which describes you best?" delay={0}>
          {WHO.map((o) => (
            <Choice key={o.id} option={o} selected={who === o.id} onPress={() => setWho(o.id)} />
          ))}
        </Section>

        <Section title="Why are you learning to code?" delay={40}>
          {WHY.map((o) => (
            <Choice key={o.id} option={o} selected={why === o.id} onPress={() => setWhy(o.id)} />
          ))}
        </Section>

        <Section title="What sounds most interesting?" delay={80}>
          {INTEREST.map((o) => (
            <Choice key={o.id} option={o} selected={interest === o.id} onPress={() => setInterest(o.id)} />
          ))}
        </Section>

        <Section title="How much time a day?" delay={120}>
          <View style={styles.minutes} accessibilityRole="radiogroup">
            {MINUTES.map((m) => {
              const on = minutes === m;
              return (
                <Pressable
                  key={m}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: on }}
                  accessibilityLabel={`${m} minutes a day, ${MINUTE_TEXT[m]}, daily goal ${goalForMinutes(m)} XP`}
                  onPress={() => {
                    haptic.tap();
                    setMinutes(m);
                  }}
                  style={[styles.minute, on && styles.minuteOn]}>
                  <T variant="heading" color={on ? '#FFFFFF' : colors.ink}>
                    {m}
                  </T>
                  <T variant="labelSm" color={on ? '#FFFFFF' : colors.ink2} style={{ fontSize: 11 }}>
                    {MINUTE_TEXT[m]}
                  </T>
                </Pressable>
              );
            })}
          </View>
          <T variant="caption">
            Daily goal: {goalForMinutes(minutes)} XP, about {Math.max(1, Math.round(goalForMinutes(minutes) / 25))} lessons.
          </T>
        </Section>

        {suggested ? (
          <Animated.View entering={FadeInDown.delay(160)} style={[card, styles.suggest]}>
            <T variant="kicker">SUGGESTED PATH</T>
            <T variant="heading">{suggested.title}</T>
            <T variant="bodySm">{reasonFor(about)}</T>
            {suggested.id === current?.id ? (
              <View style={styles.yours}>
                <Icon name="check" size={16} color={colors.success} strokeWidth={3} />
                <T variant="label" color={colors.success}>
                  This is your path
                </T>
              </View>
            ) : (
              <Button
                variant="outline"
                height={46}
                label={current ? `Switch to ${suggested.title}` : `Follow ${suggested.title}`}
                onPress={() => {
                  setPath(suggested.id);
                  toast(`You’re now following ${suggested.title}`);
                }}
              />
            )}
          </Animated.View>
        ) : null}
      </ScrollView>
      <View style={styles.footer}>
        <Button label={changed ? 'Save my plan' : 'Done'} onPress={changed ? save : () => router.back()} />
      </View>
    </SafeAreaView>
  );
}

function Section({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(300)} style={{ gap: 8 }}>
      <T variant="heading" accessibilityRole="header">
        {title}
      </T>
      <View style={{ gap: 8 }} accessibilityRole="radiogroup">
        {children}
      </View>
    </Animated.View>
  );
}

function Choice<K extends string>({ option, selected, onPress }: { option: Option<K>; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={option.sub ? `${option.title}, ${option.sub}` : option.title}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      style={({ pressed }) => [card, styles.choice, selected && styles.choiceOn, pressed && { transform: [{ scale: 0.98 }] }]}>
      <View style={[styles.choiceIcon, { backgroundColor: option.tint }]}>
        <Icon d={option.icon} size={18} color={option.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <T variant="label">{option.title}</T>
        {option.sub ? <T variant="caption">{option.sub}</T> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioOn]}>{selected ? <Icon name="check" size={12} color="#FFFFFF" strokeWidth={3} /> : null}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingTop: 4, paddingBottom: 24, gap: 22 },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, minHeight: 56 },
  choiceOn: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft },
  choiceIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  radioOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  minutes: { flexDirection: 'row', gap: 8 },
  minute: {
    flex: 1,
    minHeight: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minuteOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  suggest: { padding: 16, gap: 6 },
  yours: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  footer: { padding: 16, paddingTop: 8 },
});
