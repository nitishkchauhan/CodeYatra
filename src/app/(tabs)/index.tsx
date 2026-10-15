import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DailyCards } from '@/components/DailyCards';
import { ModulePath } from '@/components/ModulePath';
import { MyPathCard } from '@/components/MyPathCard';
import { StageSheet } from '@/components/StageSheet';
import { TrackBadge } from '@/components/TrackBadge';
import { TrackRail } from '@/components/TrackRail';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { alpha, GlassBackground, GlassCard } from '@/components/ui/Glass';
import { Glyph } from '@/components/ui/Icon';
import { Ring } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findStage, stageLessonStatuses, stageProgress, type LessonStatus } from '@/content';
import { greetingKey, useT } from '@/i18n';
import { useProgress } from '@/state/progress';
import { glass } from '@/theme';

const fmt = (n: number) => n.toLocaleString('en-IN');

export default function LearnScreen() {
  const t = useT();
  const toast = useToast();
  const { state, todayXp, streak, setStage } = useProgress();
  const [sheet, setSheet] = useState(false);

  // Light status bar icons over the dark glass background, only while Home is showing.
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('dark');
    }, []),
  );

  const stage = findStage(state.stageId);
  const statuses = stageLessonStatuses(stage, state.completed);
  const { pct } = stageProgress(stage, state.completed);
  const currentUnit = stage.units.find((u) => u.lessons.some((l) => statuses.get(l.id) === 'current'));
  const currentLesson = currentUnit?.lessons.find((l) => statuses.get(l.id) === 'current');
  const goal = state.dailyGoal;
  const goalMet = todayXp >= goal;
  const name = state.name || 'Explorer';

  const open = (id: string, status: LessonStatus) => {
    if (status === 'soon') toast('This lesson is being written. Check back soon!');
    else if (status === 'locked') toast(`Finish “${currentLesson?.title ?? 'the current module'}” first. Modules unlock in order.`);
    else router.push({ pathname: '/lesson/[id]', params: { id } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: glass.bg }}>
      <GlassBackground />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <Animated.View entering={FadeInDown.duration(320)} style={styles.header}>
            <View style={{ flex: 1 }}>
              <T variant="caption" color={glass.text2} style={{ fontSize: 13 }}>
                {t(greetingKey(new Date().getHours()))}
              </T>
              <T variant="title" color={glass.text} numberOfLines={1}>
                {name}
              </T>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${streak} day streak`}
              onPress={() => toast(todayXp > 0 ? 'Streak safe for today' : 'Finish a lesson today to keep your streak')}
              style={styles.chip}>
              <Glyph name="flame" size={18} color={todayXp > 0 ? glass.saffron : '#FDBA74'} />
              <T variant="label" color={glass.text}>
                {streak}
              </T>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel={`${fmt(state.xp)} XP`} onPress={() => router.push('/leaderboard')} style={styles.chip}>
              <Glyph name="bolt" size={18} color={glass.violetLight} />
              <T variant="label" color={glass.text}>
                {fmt(state.xp)}
              </T>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(60).duration(320)} style={{ gap: 10 }}>
            <TrackRail glass value={stage.id} onChange={setStage} onMore={() => setSheet(true)} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).duration(320)}>
            <GlassCard strong radius={24} tint={alpha(stage.color, 0.16)} style={styles.hero}>
              <View style={styles.heroTop}>
                <TrackBadge stage={stage} size={40} />
                <View style={{ flex: 1 }}>
                  <T variant="kicker" color={glass.tealLight} numberOfLines={1}>
                    {stage.section.toUpperCase()} · {stage.audience.toUpperCase()}
                  </T>
                  <T variant="heading" color={glass.text} style={{ fontSize: 18 }}>
                    {stage.name}
                  </T>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Ring value={pct / 100} color={glass.tealLight} track={glass.track} size={48} />
                  <T variant="labelSm" color={glass.text} style={{ position: 'absolute', fontSize: 11 }}>
                    {pct}%
                  </T>
                </View>
              </View>

              <View style={styles.heroBody}>
                <View style={{ flex: 1, gap: 6 }}>
                  {currentLesson && currentUnit ? (
                    <>
                      <T variant="kicker" color={glass.saffron}>
                        {`MODULE ${stage.units.indexOf(currentUnit) + 1} · ${currentUnit.title.toUpperCase()}`}
                      </T>
                      <T variant="title" color={glass.text}>
                        {currentLesson.title}
                      </T>
                      <T variant="bodySm" color={glass.text2}>
                        {currentLesson.meta}
                      </T>
                    </>
                  ) : (
                    <>
                      <T variant="kicker" color={glass.saffron}>
                        ALL CAUGHT UP
                      </T>
                      <T variant="title" color={glass.text}>
                        New {stage.short} lessons are on the way
                      </T>
                      <T variant="bodySm" color={glass.text2}>
                        Keep your streak with a practice challenge.
                      </T>
                    </>
                  )}
                </View>
                <Yatri size={78} bob dark mood={currentLesson ? 'happy' : 'celebrate'} />
              </View>

              {currentLesson && currentUnit ? (
                <Button
                  variant="saffron"
                  label={stage.units.indexOf(currentUnit) === 0 && currentUnit.lessons.indexOf(currentLesson) === 0 && pct === 0 ? t('startLesson') : t('continueLesson')}
                  icon={(c) => <Glyph name="play" size={18} color={c} />}
                  height={52}
                  onPress={() => open(currentLesson.id, 'current')}
                />
              ) : (
                <Button variant="saffron" label={t('startPractice')} height={52} onPress={() => router.navigate('/practice')} />
              )}
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(320)}>
            <GlassCard style={styles.goal}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ring value={todayXp / goal} color={goalMet ? glass.teal : glass.saffron} track={glass.track} />
                <View style={{ position: 'absolute' }}>
                  <Glyph name={goalMet ? 'star' : 'bolt'} size={16} color={goalMet ? glass.teal : glass.saffron} />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <T variant="label" color={glass.text}>
                  {t('dailyGoal')} · {Math.min(todayXp, 999)} / {goal} XP
                </T>
                <T variant="caption" color={glass.text2}>
                  {goalMet
                    ? 'Goal reached. Great work today!'
                    : goal - todayXp <= 30
                      ? 'One lesson is enough to reach it'
                      : `About ${Math.ceil((goal - todayXp) / 25)} lessons to reach it`}
                </T>
              </View>
              <View style={[styles.goalChip, { backgroundColor: goalMet ? alpha(glass.teal, 0.2) : alpha(glass.saffron, 0.18) }]}>
                <T variant="labelSm" color={goalMet ? glass.tealLight : glass.saffron}>
                  {goalMet ? 'Done' : `+${goal - todayXp} XP`}
                </T>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(320)}>
            <MyPathCard />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(220).duration(320)}>
            <DailyCards />
          </Animated.View>

          <View style={styles.unitHead}>
            <T variant="heading" color={glass.text}>
              Your journey
            </T>
            <T variant="labelSm" color={glass.text3}>
              {stage.units.length} modules
            </T>
          </View>
          <ModulePath stage={stage} statuses={statuses} completed={state.completed} upNext={t('upNext')} onOpen={open} />
        </ScrollView>
      </SafeAreaView>
      <StageSheet visible={sheet} onClose={() => setSheet(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chip: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: glass.fill,
    borderWidth: 1,
    borderColor: glass.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hero: { padding: 16, gap: 14 },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroBody: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goal: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  goalChip: { height: 28, paddingHorizontal: 10, borderRadius: 14, justifyContent: 'center' },
  unitHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 2, marginTop: 6 },
});
