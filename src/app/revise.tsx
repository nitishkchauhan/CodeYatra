import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { drillId, getLesson, hasDrill, STAGES } from '@/content';
import { INTERVIEW } from '@/content/interview';
import { findPath } from '@/content/paths';
import { findStop } from '@/content/paths/graph';
import { revisionModules } from '@/content/revision';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

/** Everything to revise in one place, from real evidence: wrong answers, failed checkpoints, saved stops. */
export default function ReviseScreen() {
  const { state } = useProgress();
  const weak = revisionModules(state.mistakes, state.checkpoints);
  const mistakes = Object.keys(state.mistakes).length;
  const saved = Object.keys(state.bookmarks)
    .map((k) => {
      const [pathId, stopId] = k.split('/');
      const path = findPath(pathId);
      const stop = path && findStop(path, stopId);
      return path && stop ? { key: k, path, stop } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  const shaky = INTERVIEW.filter((q) => state.interview[q.id] && state.interview[q.id].rating !== 'knew');
  // Quick recall: finished modules, newest first.
  const finished = STAGES.flatMap((s) => s.units.flatMap((u) => u.lessons))
    .filter((r) => state.completed[r.id] && getLesson(r.id)?.kind === 'lesson')
    .sort((a, b) => (state.completed[a.id].at < state.completed[b.id].at ? 1 : -1));
  const open = (id: string) => router.push({ pathname: '/lesson/[id]', params: { id } });

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Revise" subtitle="Based on your answers, not guesses" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 16, paddingBottom: 32 }}>
        <Section title="Needs revision" empty="Nothing yet. Wrong answers and checkpoints you don’t pass show up here." count={weak.length}>
          {weak.map((w) => (
            <View key={w.lessonId} style={styles.row}>
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="label">{getLesson(w.lessonId)?.title ?? w.lessonId}</T>
                <T variant="caption">{w.reason}</T>
              </View>
              {hasDrill(w.lessonId) ? <Small label="Practise" onPress={() => open(drillId(w.lessonId))} /> : null}
              <Small label="Lesson" onPress={() => open(w.lessonId)} />
            </View>
          ))}
        </Section>

        {mistakes ? (
          <Animated.View entering={FadeInDown.duration(280)} style={[card, styles.box]}>
            <Icon name="reset" size={22} color={colors.saffronInk} />
            <View style={{ flex: 1, gap: 2 }}>
              <T variant="label">Mistakes review</T>
              <T variant="caption">
                {mistakes} {mistakes === 1 ? 'question' : 'questions'} you got wrong. Get each right to clear it.
              </T>
            </View>
            <Small label="Start" onPress={() => open('review')} />
          </Animated.View>
        ) : null}

        <Section title="Saved stops" empty="Save a roadmap stop with its bookmark to find it here." count={saved.length}>
          {saved.map((s) => (
            <Pressable
              key={s.key}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/path/[id]', params: { id: s.path.id } })}
              style={styles.row}>
              <Icon name="bookmark" size={18} color={colors.primary} />
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="label">{s.stop.title}</T>
                <T variant="caption">{s.path.title}</T>
              </View>
              <Icon name="chevronRight" size={16} color={colors.ink3} />
            </Pressable>
          ))}
        </Section>

        {shaky.length ? (
          <Animated.View entering={FadeInDown.duration(280)} style={[card, styles.box]}>
            <Icon name="brain" size={22} color={colors.primary} />
            <View style={{ flex: 1, gap: 2 }}>
              <T variant="label">Interview answers to revisit</T>
              <T variant="caption">{shaky.length} you rated “partly” or “didn’t know”. They come first in your next session.</T>
            </View>
            <Small label="Practise" onPress={() => router.push('/interview')} />
          </Animated.View>
        ) : null}

        {finished.length ? <Recall ids={finished.map((r) => r.id)} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

/** Flip cards: try to recall a module's three key ideas, then check. Nothing is scored. */
function Recall({ ids }: { ids: string[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const lesson = getLesson(ids[i % ids.length])!;
  return (
    <View style={{ gap: 8 }}>
      <T variant="heading">Quick recall</T>
      <T variant="caption">Say the three key ideas of the module, then flip to check. Just for you: nothing is scored.</T>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={flipped ? `Key ideas of ${lesson.title}: ${lesson.learned.join('. ')}` : `${lesson.title}. Tap to show the key ideas`}
        onPress={() => {
          haptic.tap();
          setFlipped(!flipped);
        }}
        style={[card, styles.flash, flipped && { backgroundColor: colors.primarySoft }]}>
        {flipped ? (
          <Animated.View key="back" entering={FadeIn.duration(200)} style={{ gap: 8, alignSelf: 'stretch' }}>
            {lesson.learned.map((l) => (
              <View key={l} style={{ flexDirection: 'row', gap: 8 }}>
                <Icon name="check" size={18} color={colors.success} strokeWidth={2.6} />
                <T variant="bodySm" color={colors.ink} style={{ flex: 1 }}>
                  {l}
                </T>
              </View>
            ))}
          </Animated.View>
        ) : (
          <Animated.View key="front" entering={FadeIn.duration(200)} style={{ alignItems: 'center', gap: 6 }}>
            <T variant="title" style={{ textAlign: 'center' }}>
              {lesson.title}
            </T>
            <T variant="caption">Tap to flip</T>
          </Animated.View>
        )}
      </Pressable>
      {ids.length > 1 ? (
        <Button
          variant="outline"
          height={46}
          label={`Next card (${(i % ids.length) + 1} of ${ids.length})`}
          onPress={() => {
            setFlipped(false);
            setI(i + 1);
          }}
        />
      ) : null}
    </View>
  );
}

function Section({ title, empty, count, children }: { title: string; empty: string; count: number; children: React.ReactNode }) {
  return (
    <Animated.View entering={FadeInDown.duration(280)} style={[card, { padding: 14, gap: 10 }]}>
      <T variant="label">{title}</T>
      {count ? children : <T variant="caption">{empty}</T>}
    </Animated.View>
  );
}

function Small({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.small}>
      <T variant="labelSm" color={colors.primary}>
        {label}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 8 },
  box: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  small: { minHeight: 36, paddingHorizontal: 12, borderRadius: 18, justifyContent: 'center', backgroundColor: colors.primarySoft },
  flash: { minHeight: 150, padding: 18, alignItems: 'center', justifyContent: 'center' },
});
