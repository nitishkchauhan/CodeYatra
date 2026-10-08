import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StageSheet } from '@/components/StageSheet';
import { TrackBadge } from '@/components/TrackBadge';
import { TrackRail } from '@/components/TrackRail';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { Ring } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findStage, stageLessonStatuses, stageProgress, type LessonStatus } from '@/content';
import { greetingKey, useT } from '@/i18n';
import { DAILY_GOAL, useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

const fmt = (n: number) => n.toLocaleString('en-IN');

export default function LearnScreen() {
  const t = useT();
  const toast = useToast();
  const { state, todayXp, streak, setStage } = useProgress();
  const [sheet, setSheet] = useState(false);

  const stage = findStage(state.stageId);
  const statuses = stageLessonStatuses(stage, state.completed);
  const { pct } = stageProgress(stage, state.completed);
  const currentUnit = stage.units.find((u) => u.lessons.some((l) => statuses.get(l.id) === 'current'));
  const currentLesson = currentUnit?.lessons.find((l) => statuses.get(l.id) === 'current');
  const goalMet = todayXp >= DAILY_GOAL;
  const name = state.name || 'Explorer';

  const open = (id: string, status: LessonStatus) => {
    if (status === 'soon') toast('This lesson is being written. Check back soon!');
    else if (status === 'locked') toast('Finish the lessons before this one to unlock it');
    else router.push({ pathname: '/lesson/[id]', params: { id } });
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={styles.header}>
          <View style={{ flex: 1 }}>
            <T variant="caption" style={{ fontSize: 13 }}>
              {t(greetingKey(new Date().getHours()))}
            </T>
            <T variant="title" numberOfLines={1}>
              {name}
            </T>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${streak} day streak`}
            onPress={() => toast(todayXp > 0 ? 'Streak safe for today' : 'Finish a lesson today to keep your streak')}
            style={styles.chip}>
            <Glyph name="flame" size={18} color={todayXp > 0 ? colors.saffron : '#FDBA74'} />
            <T variant="label">{streak}</T>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={`${fmt(state.xp)} XP`} onPress={() => router.push('/leaderboard')} style={styles.chip}>
            <Glyph name="bolt" size={18} color={colors.primary} />
            <T variant="label">{fmt(state.xp)}</T>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).duration(320)} style={{ gap: 10 }}>
          <TrackRail value={stage.id} onChange={setStage} onMore={() => setSheet(true)} />
          <View style={styles.trackHead}>
            <TrackBadge stage={stage} size={44} />
            <View style={{ flex: 1 }}>
              <T variant="kicker" color={stage.color}>
                {stage.section.toUpperCase()} · {stage.audience.toUpperCase()}
              </T>
              <T variant="heading" style={{ fontSize: 18 }}>
                {stage.name}
              </T>
              <T variant="caption" color="#6E6A88" numberOfLines={1}>
                {stage.units.length} modules · {stage.sub}
              </T>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ring value={pct / 100} color={stage.color} track={stage.soft} size={46} />
              <T variant="labelSm" color={stage.color} style={{ position: 'absolute', fontSize: 11 }}>
                {pct}%
              </T>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(320)} style={styles.hero}>
          <View style={[styles.circle, { width: 200, height: 200, right: -50, top: -60 }]} />
          <View style={[styles.circle, { width: 140, height: 140, right: -20, top: -30 }]} />
          <View style={{ position: 'absolute', right: 10, top: 12 }}>
            <Yatri size={86} bob dark />
          </View>
          {currentLesson && currentUnit ? (
            <>
              <View style={{ gap: 6, maxWidth: 210 }}>
                <T variant="kicker" color="#7BE3D8">
                  {`MODULE ${stage.units.indexOf(currentUnit) + 1} · ${currentUnit.title.toUpperCase()}`}
                </T>
                <T variant="title" color="#FFFFFF">
                  {currentLesson.title}
                </T>
                <T variant="bodySm" color="#C8C3F5">
                  {currentLesson.meta}
                </T>
              </View>
              <View style={styles.heroSegs}>
                {stage.units.flatMap((u) => u.lessons).map((l) => {
                  const s = statuses.get(l.id);
                  return (
                    <View
                      key={l.id}
                      style={[
                        styles.heroSeg,
                        {
                          backgroundColor: s === 'done' ? colors.tealLight : s === 'current' ? '#FFFFFF' : colors.heroLine,
                        },
                      ]}
                    />
                  );
                })}
              </View>
              <Button
                variant="white"
                label={stage.units.indexOf(currentUnit) === 0 && currentUnit.lessons.indexOf(currentLesson) === 0 && pct === 0 ? t('startLesson') : t('continueLesson')}
                icon={(c) => <Glyph name="play" size={18} color={c} />}
                height={50}
                onPress={() => open(currentLesson.id, 'current')}
              />
            </>
          ) : (
            <>
              <View style={{ gap: 6, maxWidth: 210, marginBottom: 16 }}>
                <T variant="kicker" color="#7BE3D8">
                  ALL CAUGHT UP
                </T>
                <T variant="title" color="#FFFFFF">
                  New {stage.short} lessons are on the way
                </T>
                <T variant="bodySm" color="#C8C3F5">
                  Keep your streak with a practice challenge.
                </T>
              </View>
              <Button variant="white" label={t('startPractice')} height={50} onPress={() => router.navigate('/practice')} />
            </>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(320)} style={[styles.goal, card]}>
          <Ring value={todayXp / DAILY_GOAL} color={goalMet ? colors.success : colors.primary} />
          <View style={{ flex: 1 }}>
            <T variant="label">
              {t('dailyGoal')} · {Math.min(todayXp, 999)} / {DAILY_GOAL} XP
            </T>
            <T variant="caption" color="#6E6A88">
              {goalMet ? 'Goal reached. Great work today!' : 'One lesson is enough to reach it'}
            </T>
          </View>
          <View
            style={[
              styles.goalChip,
              {
                backgroundColor: goalMet ? colors.successSoft : colors.saffronSoft,
              },
            ]}>
            <T variant="labelSm" color={goalMet ? '#166534' : colors.saffronInk}>
              {goalMet ? 'Done' : `+${DAILY_GOAL - todayXp} XP`}
            </T>
          </View>
        </Animated.View>

        <View style={styles.unitHead}>
          <T variant="heading">Modules</T>
          <T variant="labelSm" color={colors.ink3}>
            Read · practice · earn XP
          </T>
        </View>
        {stage.units.map((unit, ui) => {
          const l = unit.lessons[0];
          const status = statuses.get(l.id) ?? 'locked';
          const muted = status === 'locked' || status === 'soon';
          const last = ui === stage.units.length - 1;
          return (
            <Animated.View key={unit.id} entering={FadeInDown.delay(220 + ui * 50).duration(320)} style={styles.moduleRow}>
              <View style={styles.rail}>
                <View
                  style={[
                    styles.moduleNum,
                    status === 'done' && {
                      backgroundColor: colors.success,
                      borderColor: colors.success,
                    },
                    status === 'current' && {
                      backgroundColor: stage.color,
                      borderColor: stage.color,
                    },
                  ]}>
                  {status === 'done' ? (
                    <Icon name="check" size={16} color="#FFFFFF" strokeWidth={3} />
                  ) : muted ? (
                    <Icon name="lock" size={13} color={colors.ink3} strokeWidth={2.2} />
                  ) : (
                    <T variant="label" color="#FFFFFF">
                      {ui + 1}
                    </T>
                  )}
                </View>
                {!last ? <View style={[styles.railLine, status === 'done' && { backgroundColor: colors.success }]} /> : null}
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Module ${ui + 1}, ${unit.title}: ${l.title}, ${status}`}
                onPress={() => open(l.id, status)}
                style={({ pressed }) => [
                  styles.moduleCard,
                  status === 'current' && {
                    borderColor: stage.color,
                    borderWidth: 2,
                    backgroundColor: stage.soft,
                  },
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}>
                <View style={{ flex: 1, gap: 2 }}>
                  <T variant="kicker" color={muted ? colors.ink3 : stage.color}>
                    MODULE {ui + 1} · {unit.title.toUpperCase()}
                  </T>
                  <T variant="label" color={muted ? colors.ink3 : colors.ink}>
                    {l.title}
                  </T>
                  <T variant="caption">{l.meta}</T>
                </View>
                {status === 'current' ? (
                  <View style={[styles.nextPill, { backgroundColor: stage.color }]}>
                    <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 11 }}>
                      {t('upNext')}
                    </T>
                  </View>
                ) : status === 'done' ? (
                  <T variant="labelSm" color={colors.success} style={{ fontSize: 11 }}>
                    Review
                  </T>
                ) : status === 'soon' ? (
                  <T variant="labelSm" color={colors.ink3} style={{ fontSize: 11 }}>
                    {t('soon')}
                  </T>
                ) : null}
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
      <StageSheet visible={sheet} onClose={() => setSheet(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chip: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trackHead: {
    ...card,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  moduleRow: { flexDirection: 'row', gap: 12, alignItems: 'stretch' },
  rail: { width: 32, alignItems: 'center' },
  moduleNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.lineSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  railLine: {
    flex: 1,
    width: 2,
    marginTop: 4,
    marginBottom: -18,
    backgroundColor: colors.line,
  },
  moduleCard: {
    ...card,
    flex: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 72,
  },
  hero: {
    borderRadius: 22,
    backgroundColor: colors.hero,
    padding: 18,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.heroLine,
  },
  heroSegs: { flexDirection: 'row', gap: 4, marginTop: 16, marginBottom: 14 },
  heroSeg: { flex: 1, height: 6, borderRadius: 3 },
  goal: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  goalChip: {
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    justifyContent: 'center',
  },
  unitHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 2,
  },
  nextPill: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
});
