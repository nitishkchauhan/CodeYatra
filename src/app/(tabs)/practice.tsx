import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TrackBadge } from '@/components/TrackBadge';
import { TrackRail } from '@/components/TrackRail';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findStage, hasContent } from '@/content';
import { useT } from '@/i18n';
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
  const stage = findStage(stageId);

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

        <TrackRail value={stage.id} onChange={setStageId} />

        <Animated.View key={stage.id} entering={FadeIn.duration(220)} style={{ gap: 14 }}>
          <View style={[styles.summary, { backgroundColor: stage.soft }]}>
            <TrackBadge stage={stage} size={48} />
            <View style={{ flex: 1, gap: 2 }}>
              <T variant="kicker" color={stage.color} style={{ letterSpacing: 0.8 }}>
                {stage.section.toUpperCase()} · {stage.practice.length} CHALLENGES
              </T>
              <T variant="heading" style={{ fontSize: 18, lineHeight: 23 }}>
                {stage.name}
              </T>
              <T variant="bodySm" color={colors.ink2}>
                {stage.blurb}
              </T>
            </View>
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
                    else
                      router.push({
                        pathname: '/lesson/[id]',
                        params: { id: p.id },
                      });
                  }}
                  style={({ pressed }) => [styles.item, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                  <TrackBadge stage={stage} size={44} dimmed={!available} />
                  <View style={{ flex: 1, gap: 4 }}>
                    <T variant="label" color={available ? colors.ink : '#6E6A88'}>
                      {p.title}
                    </T>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}>
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
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor: colors.saffronSoft,
                          paddingHorizontal: 9,
                        },
                      ]}>
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
  playground: {
    borderRadius: 20,
    backgroundColor: colors.hero,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    borderRadius: 18,
    padding: 14,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    ...card,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  diff: {
    height: 18,
    paddingHorizontal: 6,
    borderRadius: 9,
    justifyContent: 'center',
  },
  badge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
