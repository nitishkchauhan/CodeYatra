import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { Bar, Ring } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { findStage } from '@/content';
import { buildMock, MOCK_TESTS, TOPIC_LABEL, TOPIC_TRACK, type MockKind, type MockQuestion, type MockTopic } from '@/content/mockBank';
import { ActionBar } from '@/features/lesson/Shell';
import { haptic } from '@/lib/haptics';
import { track } from '@/lib/telemetry';
import { useProgress } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

type Paper = { q: MockQuestion; order: number[] }[];

const shuffled = () => [0, 1, 2, 3].map((i) => [Math.random(), i] as const).sort((a, b) => a[0] - b[0]).map(([, i]) => i);
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

export default function MockTestRoute() {
  const { kind } = useLocalSearchParams<{ kind: MockKind }>();
  const test = MOCK_TESTS.find((t) => t.kind === kind) ?? MOCK_TESTS[0];
  const [attempt, setAttempt] = useState(0);
  // A new key starts a fresh paper for "Retake".
  return <MockTest key={attempt} test={test} onRetake={() => setAttempt((a) => a + 1)} />;
}

function MockTest({ test, onRetake }: { test: (typeof MOCK_TESTS)[number]; onRetake: () => void }) {
  const progress = useProgress();
  const [paper] = useState<Paper>(() => buildMock(test.kind).map((q) => ({ q, order: shuffled() })));
  const [answers, setAnswers] = useState<(number | null)[]>(() => paper.map(() => null));
  const [index, setIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<{ score: number; seconds: number; xp: number; coins: number } | null>(null);

  const limit = test.minutes * 60;
  const left = startedAt ? limit - Math.floor((now - startedAt) / 1000) : limit;

  const finish = () => {
    if (result || !startedAt) return;
    const score = paper.filter((p, i) => answers[i] === 0).length;
    const seconds = Math.min(limit, Math.round((Date.now() - startedAt) / 1000));
    const topics: Record<string, [number, number]> = {};
    paper.forEach((p, i) => {
      const t = (topics[p.q.topic] ??= [0, 0]);
      t[1]++;
      if (answers[i] === 0) t[0]++;
    });
    const reward = progress.finishMock({ kind: test.kind, score, total: paper.length, seconds, topics });
    haptic.success();
    track('mock_finish', { kind: test.kind, score, total: paper.length });
    setResult({ score, seconds, ...reward });
  };
  // The timer calls the latest finish(), which sees the latest answers.
  const submit = useRef(finish);
  useEffect(() => {
    submit.current = finish;
  });

  // The clock ticks once a second; when it runs out, the test submits itself.
  useEffect(() => {
    if (!startedAt || result) return;
    const id = setInterval(() => {
      setNow(Date.now());
      if (Date.now() - startedAt >= limit * 1000) submit.current();
    }, 1000);
    return () => clearInterval(id);
  }, [startedAt, result, limit]);

  const exit = () => {
    if (!startedAt || result || Platform.OS === 'web') return router.back();
    Alert.alert('Leave the test?', 'Your answers will not be saved.', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  const confirmSubmit = () => {
    const blank = answers.filter((a) => a === null).length;
    if (!blank || Platform.OS === 'web') return submit.current();
    Alert.alert('Submit now?', `${blank} ${blank === 1 ? 'question is' : 'questions are'} unanswered.`, [
      { text: 'Keep going', style: 'cancel' },
      { text: 'Submit', onPress: () => submit.current() },
    ]);
  };

  if (result) return <Report test={test} paper={paper} answers={answers} result={result} onRetake={onRetake} />;

  if (!startedAt) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <TopBar onClose={exit} />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
          <Animated.View entering={ZoomIn.springify().damping(16)} style={styles.introCard}>
            <View style={styles.introIcon}>
              <Icon d="M12 8v4l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" size={34} color="#16142B" strokeWidth={2.2} />
            </View>
            <T variant="title" color="#FFFFFF" style={{ textAlign: 'center' }}>
              {test.title}
            </T>
            <T variant="bodySm" color="#C8C3F5" style={{ textAlign: 'center' }}>
              {test.sub}
            </T>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
              {[
                [String(paper.length), 'questions'],
                [String(test.minutes), 'minutes'],
                [String(paper.length * 3), 'XP max'],
              ].map(([v, l]) => (
                <View key={l} style={styles.introStat}>
                  <T variant="heading" color="#FFFFFF">
                    {v}
                  </T>
                  <T variant="caption" color="#C8C3F5">
                    {l}
                  </T>
                </View>
              ))}
            </View>
          </Animated.View>
          <View style={[card, { padding: 14, gap: 8 }]}>
            {['The timer starts when you tap Start, and the test submits itself at 0:00.', 'Jump between questions with the numbers at the top.', 'No hints or answers until you submit. Then you see every explanation.'].map((r) => (
              <View key={r} style={{ flexDirection: 'row', gap: 8 }}>
                <Icon name="check" size={16} color={colors.success} strokeWidth={2.6} />
                <T variant="bodySm" style={{ flex: 1 }}>
                  {r}
                </T>
              </View>
            ))}
          </View>
        </ScrollView>
        <ActionBar>
          <Button
            label="Start test"
            icon={(c) => <Glyph name="play" size={18} color={c} />}
            onPress={() => {
              haptic.tap();
              const t = Date.now();
              setStartedAt(t);
              setNow(t);
              track('mock_start', { kind: test.kind });
            }}
          />
        </ActionBar>
      </SafeAreaView>
    );
  }

  const { q, order } = paper[index];
  const pick = answers[index];
  const last = index === paper.length - 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <TopBar onClose={exit}>
        <View style={[styles.timer, left <= 120 && { backgroundColor: colors.dangerSoft }]} accessibilityLabel={`${clock(left)} left`}>
          <Icon d="M12 8v4l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" size={15} color={left <= 120 ? colors.danger : colors.primary} strokeWidth={2.4} />
          <T style={{ fontFamily: fonts.monoMedium, fontSize: 14, color: left <= 120 ? colors.danger : colors.ink }}>{clock(left)}</T>
        </View>
      </TopBar>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={styles.palette} accessibilityRole="tablist">
        {paper.map((_, i) => (
          <Pressable
            key={i}
            accessibilityRole="tab"
            accessibilityLabel={`Question ${i + 1}${answers[i] !== null ? ', answered' : ''}`}
            accessibilityState={{ selected: i === index }}
            onPress={() => setIndex(i)}
            style={[styles.dot, answers[i] !== null && styles.dotDone, i === index && styles.dotOn]}>
            <T variant="labelSm" color={i === index ? '#FFFFFF' : answers[i] !== null ? colors.primary : colors.ink2} style={{ fontSize: 12 }}>
              {i + 1}
            </T>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8, gap: 14 }}>
        <Animated.View key={index} entering={FadeIn.duration(180)} style={{ gap: 14 }}>
          <T variant="kicker" color={colors.primary}>
            QUESTION {index + 1} OF {paper.length} · {TOPIC_LABEL[q.topic].toUpperCase()}
          </T>
          <T variant="heading" style={{ fontSize: 18, lineHeight: 25 }}>
            {q.prompt}
          </T>
          {q.code && q.lang ? (
            <View style={styles.code}>
              <CodeBlock lines={q.code} lang={q.lang} />
            </View>
          ) : null}
          <View style={{ gap: 10 }} accessibilityRole="radiogroup">
            {order.map((o, shown) => {
              const on = pick === o;
              return (
                <Pressable
                  key={o}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: on }}
                  onPress={() => {
                    haptic.tap();
                    setAnswers((a) => a.map((x, i) => (i === index ? o : x)));
                  }}
                  style={[styles.option, on && styles.optionOn]}>
                  <View style={[styles.badge, on && { backgroundColor: colors.primary }]}>
                    <T variant="labelSm" color={on ? '#FFFFFF' : colors.ink2}>
                      {'ABCD'[shown]}
                    </T>
                  </View>
                  <T style={{ flex: 1, fontFamily: q.code ? fonts.mono : fonts.bodySemibold, fontSize: 15, color: colors.ink }}>{q.options[o]}</T>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      <ActionBar>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button variant="outline" label="Back" disabled={index === 0} onPress={() => setIndex(index - 1)} style={{ flex: 1 }} />
          {last ? (
            <Button label="Submit" onPress={confirmSubmit} style={{ flex: 2 }} />
          ) : (
            <Button label={pick === null ? 'Skip' : 'Next'} onPress={() => setIndex(index + 1)} style={{ flex: 2 }} />
          )}
        </View>
      </ActionBar>
    </SafeAreaView>
  );
}

function TopBar({ onClose, children }: { onClose: () => void; children?: React.ReactNode }) {
  return (
    <View style={styles.top}>
      <Pressable accessibilityRole="button" accessibilityLabel="Leave test" onPress={onClose} hitSlop={6} style={styles.close}>
        <Icon name="close" size={22} color={colors.ink2} strokeWidth={2.2} />
      </Pressable>
      <View style={{ flex: 1 }} />
      {children}
    </View>
  );
}

function Report({
  test,
  paper,
  answers,
  result,
  onRetake,
}: {
  test: (typeof MOCK_TESTS)[number];
  paper: Paper;
  answers: (number | null)[];
  result: { score: number; seconds: number; xp: number; coins: number };
  onRetake: () => void;
}) {
  const { setStage } = useProgress();
  const percent = Math.round((result.score / paper.length) * 100);
  const byTopic = new Map<MockTopic, [number, number]>();
  paper.forEach((p, i) => {
    const t = byTopic.get(p.q.topic) ?? [0, 0];
    byTopic.set(p.q.topic, [t[0] + (answers[i] === 0 ? 1 : 0), t[1] + 1]);
  });
  const weak = [...byTopic].filter(([, [r, n]]) => r / n < 0.6).map(([t]) => t);
  const verdict = percent >= 80 ? 'Placement ready!' : percent >= 60 ? 'Good, almost there' : 'Keep practising';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => router.back()} hitSlop={6} style={styles.close}>
          <Icon name="close" size={22} color={colors.ink2} strokeWidth={2.2} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 0, gap: 14, paddingBottom: 24 }}>
        <Animated.View entering={ZoomIn.springify().damping(15)} style={styles.scoreCard}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ring value={percent / 100} size={120} stroke={10} color={percent >= 60 ? colors.tealLight : colors.saffron} track="#FFFFFF22" />
            <View style={{ position: 'absolute', alignItems: 'center' }}>
              <T style={{ fontFamily: fonts.display, fontSize: 34, color: '#FFFFFF' }}>{percent}%</T>
              <T variant="caption" color="#C8C3F5">
                {result.score} of {paper.length}
              </T>
            </View>
          </View>
          <T variant="title" color="#FFFFFF">
            {verdict}
          </T>
          <T variant="bodySm" color="#C8C3F5">
            {test.title} · {Math.floor(result.seconds / 60)}m {result.seconds % 60}s · +{result.xp} XP · +{result.coins} coins
          </T>
        </Animated.View>

        <View style={[card, { padding: 14, gap: 12 }]}>
          <T variant="label">By topic</T>
          {[...byTopic].map(([t, [r, n]]) => (
            <View key={t} style={{ gap: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T variant="labelSm" style={{ fontSize: 13 }}>
                  {TOPIC_LABEL[t]}
                </T>
                <T variant="labelSm" color={r / n >= 0.6 ? colors.success : colors.danger} style={{ fontSize: 13 }}>
                  {r}/{n}
                </T>
              </View>
              <Bar value={r / n} color={r / n >= 0.6 ? colors.success : colors.danger} />
            </View>
          ))}
        </View>

        {weak.length ? (
          <View style={[card, { padding: 14, gap: 10 }]}>
            <T variant="label">Practise your weak topics</T>
            {weak.map((t) => {
              const stage = findStage(TOPIC_TRACK[t]);
              return (
                <Pressable
                  key={t}
                  accessibilityRole="button"
                  onPress={() => {
                    setStage(stage.id);
                    router.dismissAll();
                    router.navigate('/');
                  }}
                  style={styles.weak}>
                  <T variant="bodySm" style={{ flex: 1 }}>
                    {TOPIC_LABEL[t]} → open the <T variant="label">{stage.name}</T> track
                  </T>
                  <Icon name="chevronRight" size={18} color={colors.primary} />
                </Pressable>
              );
            })}
          </View>
        ) : null}

        <T variant="heading" style={{ marginTop: 4 }}>
          Review answers
        </T>
        {paper.map(({ q }, i) => {
          const a = answers[i];
          const right = a === 0;
          return (
            <Animated.View key={q.id} entering={FadeInDown.delay(Math.min(i, 8) * 40)} style={[card, { padding: 14, gap: 8 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={[styles.mark, { backgroundColor: right ? colors.success : a === null ? colors.ink3 : colors.danger }]}>
                  <Icon name={right ? 'check' : 'cross'} size={12} color="#FFFFFF" strokeWidth={3} />
                </View>
                <T variant="labelSm" color={colors.ink3} style={{ flex: 1 }}>
                  Q{i + 1} · {TOPIC_LABEL[q.topic]}
                </T>
              </View>
              <T variant="label">{q.prompt}</T>
              {q.code && q.lang ? (
                <View style={styles.code}>
                  <CodeBlock lines={q.code} lang={q.lang} />
                </View>
              ) : null}
              {!right ? (
                <T variant="bodySm" color={colors.dangerInk}>
                  {a === null ? 'Not answered' : `Your answer: ${q.options[a]}`}
                </T>
              ) : null}
              <T variant="bodySm" color="#166534">
                Correct: <T style={{ fontFamily: q.code ? fonts.mono : fonts.bodySemibold, color: '#166534' }}>{q.options[0]}</T>
              </T>
              <T variant="caption" style={{ fontSize: 13, lineHeight: 19 }}>
                {q.explain}
              </T>
            </Animated.View>
          );
        })}
      </ScrollView>
      <ActionBar>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button variant="outline" label="Done" onPress={() => router.back()} style={{ flex: 1 }} />
          <Button label="Retake" onPress={onRetake} style={{ flex: 1 }} />
        </View>
      </ActionBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: { height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  close: { width: 44, height: 44, marginLeft: -10, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  timer: { height: 32, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: colors.primarySoft },
  palette: { paddingHorizontal: 16, paddingBottom: 8, gap: 6 },
  dot: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  dotDone: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  dotOn: { borderColor: colors.primary, backgroundColor: colors.primary },
  code: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden', paddingVertical: 4 },
  option: { minHeight: 56, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 10 },
  optionOn: { borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.surfaceTint },
  badge: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.lineSoft, alignItems: 'center', justifyContent: 'center' },
  introCard: { borderRadius: 24, backgroundColor: colors.hero, padding: 22, alignItems: 'center', gap: 6 },
  introIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: colors.saffron, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  introStat: { flex: 1, minWidth: 80, borderRadius: 14, backgroundColor: '#FFFFFF14', paddingVertical: 10, alignItems: 'center' },
  scoreCard: { borderRadius: 24, backgroundColor: colors.hero, padding: 22, alignItems: 'center', gap: 8 },
  weak: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44, borderRadius: 12, backgroundColor: colors.surfaceTint, paddingHorizontal: 12 },
  mark: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
});
