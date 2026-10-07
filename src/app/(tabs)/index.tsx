import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StageSheet } from '@/components/StageSheet';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { Ring } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { STAGES, stageLessonStatuses, stageProgress, type LessonStatus } from '@/content';
import { greetingKey, useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { DAILY_GOAL, useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

const fmt = (n: number) => n.toLocaleString('en-IN');

function StatusIcon({ status }: { status: LessonStatus }) {
  if (status === 'done') {
    return (
      <View style={[styles.statusDot, { backgroundColor: colors.success }]}>
        <Icon name="check" size={14} color="#FFFFFF" strokeWidth={3} />
      </View>
    );
  }
  if (status === 'current') {
    return (
      <View style={[styles.statusDot, { borderWidth: 2.5, borderColor: colors.primary }]}>
        <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary }} />
      </View>
    );
  }
  return (
    <View style={[styles.statusDot, { backgroundColor: colors.lineSoft }]}>
      <Icon name="lock" size={12} color={colors.ink3} strokeWidth={2.2} />
    </View>
  );
}

export default function LearnScreen() {
  const t = useT();
  const toast = useToast();
  const { state, todayXp, streak } = useProgress();
  const [sheet, setSheet] = useState(false);

  const stage = STAGES.find((s) => s.id === state.stageId) ?? STAGES[0];
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

        <Animated.View entering={FadeInDown.delay(60).duration(320)}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Current stage ${stage.name}. Change stage`}
            onPress={() => {
              haptic.tap();
              setSheet(true);
            }}
            style={({ pressed }) => [styles.stageCard, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
            <View style={[styles.stageIcon, { backgroundColor: stage.soft }]}>
              <Icon d={stage.icon} size={20} color={stage.color} />
            </View>
            <View style={{ flex: 1 }}>
              <T variant="heading" style={{ fontSize: 15 }}>
                {stage.name}
              </T>
              <T variant="caption" color="#6E6A88">
                {t('stage')} {STAGES.indexOf(stage) + 1} {t('of')} 4 · {stage.sub}
              </T>
            </View>
            <T variant="labelSm" color={stage.color}>
              {pct}%
            </T>
            <Icon name="chevronDown" size={18} color={colors.ink3} />
          </Pressable>
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
                  {`UNIT ${stage.units.indexOf(currentUnit) + 1} · ${currentUnit.title.toUpperCase()}`}
                </T>
                <T variant="title" color="#FFFFFF">
                  {currentLesson.title}
                </T>
                <T variant="bodySm" color="#C8C3F5">
                  {currentLesson.meta}
                </T>
              </View>
              <View style={styles.heroSegs}>
                {currentUnit.lessons.map((l) => {
                  const s = statuses.get(l.id);
                  return <View key={l.id} style={[styles.heroSeg, { backgroundColor: s === 'done' ? colors.tealLight : s === 'current' ? '#FFFFFF' : colors.heroLine }]} />;
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
          <View style={[styles.goalChip, { backgroundColor: goalMet ? colors.successSoft : colors.saffronSoft }]}>
            <T variant="labelSm" color={goalMet ? '#166534' : colors.saffronInk}>
              {goalMet ? 'Done' : `+${DAILY_GOAL - todayXp} XP`}
            </T>
          </View>
        </Animated.View>

        {stage.units.map((unit, ui) => {
          const done = unit.lessons.filter((l) => statuses.get(l.id) === 'done').length;
          return (
            <Animated.View key={unit.id} entering={FadeInDown.delay(220 + ui * 50).duration(320)} style={{ gap: 8 }}>
              <View style={styles.unitHead}>
                <T variant="heading">
                  Unit {ui + 1} · {unit.title}
                </T>
                <T variant="labelSm" color={colors.ink3}>
                  {done} of {unit.lessons.length} done
                </T>
              </View>
              <View style={[card, { overflow: 'hidden' }]}>
                {unit.lessons.map((l, li) => {
                  const status = statuses.get(l.id) ?? 'locked';
                  const muted = status === 'locked' || status === 'soon';
                  return (
                    <Pressable
                      key={l.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${l.title}, ${status}`}
                      onPress={() => open(l.id, status)}
                      style={({ pressed }) => [
                        styles.lessonRow,
                        li > 0 && { borderTopWidth: 1, borderTopColor: colors.lineSoft },
                        status === 'current' && { backgroundColor: colors.surfaceTint },
                        pressed && { backgroundColor: colors.lineSoft },
                      ]}>
                      <StatusIcon status={status} />
                      <View style={{ flex: 1, paddingVertical: 10 }}>
                        <T variant="label" color={muted ? colors.ink3 : colors.ink}>
                          {l.title}
                        </T>
                        <T variant="caption">{l.meta}</T>
                      </View>
                      {status === 'current' ? (
                        <View style={styles.nextPill}>
                          <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 11 }}>
                            {t('upNext')}
                          </T>
                        </View>
                      ) : status === 'soon' ? (
                        <T variant="labelSm" color={colors.ink3} style={{ fontSize: 11 }}>
                          {t('soon')}
                        </T>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
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
  stageCard: { ...card, minHeight: 62, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12 },
  stageIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  hero: { borderRadius: 22, backgroundColor: colors.hero, padding: 18, overflow: 'hidden' },
  circle: { position: 'absolute', borderRadius: 999, borderWidth: 1, borderColor: colors.heroLine },
  heroSegs: { flexDirection: 'row', gap: 4, marginTop: 16, marginBottom: 14 },
  heroSeg: { flex: 1, height: 6, borderRadius: 3 },
  goal: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  goalChip: { height: 28, paddingHorizontal: 10, borderRadius: 14, justifyContent: 'center' },
  unitHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 2 },
  lessonRow: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14 },
  statusDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  nextPill: { height: 24, paddingHorizontal: 9, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center' },
});
