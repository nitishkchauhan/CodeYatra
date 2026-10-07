import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { hasContent, STAGES } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

const DIFFICULTY = {
  Easy: { bg: colors.successSoft, ink: '#166534' },
  Medium: { bg: colors.saffronSoft, ink: colors.saffronInk },
  Hard: { bg: colors.dangerSoft, ink: colors.dangerInk },
} as const;

export default function PracticeScreen() {
  const t = useT();
  const toast = useToast();
  const { state } = useProgress();
  const [stageId, setStageId] = useState(state.stageId);
  const stage = STAGES.find((s) => s.id === stageId) ?? STAGES[0];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 14 }}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 2 }}>
          <T variant="display" accessibilityRole="header">
            {t('practice')}
          </T>
          <T variant="bodySm" color="#6E6A88">
            Short challenges that sharpen each skill
          </T>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(40).duration(320)}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open the code playground"
            onPress={() => router.push('/playground')}
            style={({ pressed }) => [styles.playground, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
            <View style={styles.playIcon}>
              <Icon name="practice" size={24} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <T variant="heading" color="#FFFFFF">
                Code playground
              </T>
              <T variant="bodySm" color="#C8C3F5">
                Write real Python or JavaScript and run it
              </T>
            </View>
            <Icon name="chevronRight" size={20} color="#C8C3F5" />
          </Pressable>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16, flexGrow: 0 }}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          accessibilityRole="tablist">
          {STAGES.map((s) => {
            const on = s.id === stageId;
            return (
              <Pressable
                key={s.id}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                onPress={() => {
                  haptic.tap();
                  setStageId(s.id);
                }}
                style={[styles.filter, { backgroundColor: on ? s.color : colors.surface, borderColor: on ? s.color : colors.line }]}>
                <T variant="labelSm" color={on ? '#FFFFFF' : colors.ink2} style={{ fontSize: 13 }}>
                  {s.short}
                </T>
              </Pressable>
            );
          })}
        </ScrollView>

        <Animated.View key={stage.id} entering={FadeIn.duration(220)} style={{ gap: 14 }}>
          <View style={[styles.summary, { backgroundColor: stage.soft }]}>
            <T variant="kicker" color={stage.color} style={{ letterSpacing: 0.8 }}>
              STAGE {STAGES.indexOf(stage) + 1} · {stage.audience.toUpperCase()}
            </T>
            <T variant="heading" style={{ fontSize: 18, lineHeight: 23 }}>
              {stage.name}
            </T>
            <T variant="bodySm" color={colors.ink2}>
              {stage.blurb}
            </T>
          </View>

          {stage.practice.map((p, i) => {
            const available = hasContent(p.id);
            const done = !!state.completed[p.id];
            const diff = DIFFICULTY[p.difficulty];
            return (
              <Animated.View key={p.id} entering={FadeInDown.delay(60 + i * 60).duration(300)}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${p.title}, ${p.kind}, ${p.difficulty}${available ? '' : ', coming soon'}${done ? ', completed' : ''}`}
                  onPress={() => {
                    if (!available) toast('This challenge is being written. Check back soon!');
                    else router.push({ pathname: '/lesson/[id]', params: { id: p.id } });
                  }}
                  style={({ pressed }) => [styles.item, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                  <View style={[styles.itemIcon, { backgroundColor: available ? stage.soft : colors.lineSoft }]}>
                    <Icon d={stage.icon} size={22} color={available ? stage.color : colors.ink3} />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <T variant="label" color={available ? colors.ink : '#6E6A88'}>
                      {p.title}
                    </T>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <T variant="caption" style={{ fontFamily: 'Figtree_600SemiBold' }}>
                        {p.kind}
                      </T>
                      <View style={[styles.diff, { backgroundColor: diff.bg }]}>
                        <T variant="labelSm" color={diff.ink} style={{ fontSize: 10 }}>
                          {p.difficulty}
                        </T>
                      </View>
                    </View>
                  </View>
                  {done ? (
                    <View style={[styles.badge, { backgroundColor: colors.successSoft }]}>
                      <Icon name="check" size={14} color={colors.success} strokeWidth={2.6} />
                    </View>
                  ) : available ? (
                    <View style={[styles.badge, { backgroundColor: colors.saffronSoft, paddingHorizontal: 9 }]}>
                      <T variant="labelSm" color={colors.saffronInk}>
                        +{p.xp} XP
                      </T>
                    </View>
                  ) : (
                    <T variant="labelSm" color={colors.ink3} style={{ fontSize: 11 }}>
                      {t('soon')}
                    </T>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playground: { borderRadius: 20, backgroundColor: colors.hero, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  playIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  filter: { minHeight: 40, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, justifyContent: 'center' },
  summary: { borderRadius: 18, padding: 14, gap: 4 },
  item: { ...card, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  diff: { height: 18, paddingHorizontal: 6, borderRadius: 9, justifyContent: 'center' },
  badge: { minWidth: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
