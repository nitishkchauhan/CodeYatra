import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { getLesson } from '@/content';
import { INTERVIEW, interviewSession, TOPIC_NAME, weakTopics, type InterviewLevel, type InterviewQuestion, type InterviewTopic, type Rating } from '@/content/interview';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

const TOPICS: (InterviewTopic | 'all')[] = ['all', 'python', 'dsa', 'sql', 'oop', 'web'];
const LEVELS: (InterviewLevel | 'all')[] = ['all', 'Beginner', 'Intermediate'];
const THINK_SECONDS = 120;

const RATE: { value: Rating; label: string; color: string; bg: string }[] = [
  { value: 'missed', label: 'Didn’t know', color: colors.dangerInk, bg: colors.dangerSoft },
  { value: 'partly', label: 'Partly', color: colors.saffronInk, bg: colors.warnSoft },
  { value: 'knew', label: 'Knew it', color: colors.successInk, bg: colors.successSoft },
];

/** Interview practice: think, reveal the model answer, rate yourself honestly, then see what to revise. */
export default function InterviewScreen() {
  const { state } = useProgress();
  const [topic, setTopic] = useState<InterviewTopic | 'all'>('all');
  const [level, setLevel] = useState<InterviewLevel | 'all'>('all');
  const [timed, setTimed] = useState(false);
  const [session, setSession] = useState<InterviewQuestion[] | null>(null);

  const pool = INTERVIEW.filter((q) => (topic === 'all' || q.topic === topic) && (level === 'all' || q.level === level));
  const answered = Object.keys(state.interview).length;
  const weak = weakTopics(state.interview);

  if (session) return <Session questions={session} timed={timed} onDone={() => setSession(null)} />;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Interview practice" subtitle={`${INTERVIEW.length} questions · ${answered} answered`} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 16, paddingBottom: 32 }}>
        <Animated.View entering={FadeInDown.duration(300)} style={[card, { padding: 14, gap: 6 }]}>
          <T variant="label">How it works</T>
          <T variant="bodySm" color={colors.inkBody}>
            Read the question and answer it out loud or on paper. Then reveal the model answer and rate yourself honestly. Questions you rate low come back first next time.
          </T>
        </Animated.View>

        <Filter label="Topic" options={TOPICS.map((t) => ({ value: t, text: t === 'all' ? 'All' : TOPIC_NAME[t] }))} value={topic} onChange={setTopic} />
        <Filter label="Level" options={LEVELS.map((l) => ({ value: l, text: l === 'all' ? 'All' : l }))} value={level} onChange={setLevel} />

        <Pressable accessibilityRole="switch" accessibilityState={{ checked: timed }} onPress={() => setTimed(!timed)} style={[card, styles.toggle]}>
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="label">Thinking timer</T>
            <T variant="caption">Optional: shows 2 minutes per question, like a real interview. It never reveals the answer for you.</T>
          </View>
          <View style={[styles.switch, timed && { backgroundColor: colors.primary }]}>
            <View style={[styles.knob, timed && { alignSelf: 'flex-end' }]} />
          </View>
        </Pressable>

        <Button
          label={pool.length ? `Start · ${Math.min(8, pool.length)} questions` : 'No questions match'}
          disabled={!pool.length}
          onPress={() => {
            haptic.tap();
            setSession(interviewSession(pool, state.interview));
          }}
        />

        {weak.length ? (
          <View style={[card, { padding: 14, gap: 8 }]}>
            <T variant="label">Topics to work on</T>
            {weak.map((w) => (
              <Pressable key={w.topic} accessibilityRole="button" onPress={() => setTopic(w.topic)} style={styles.weak}>
                <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
                  {TOPIC_NAME[w.topic]}: {w.shaky} of {w.answered} answered not fully known
                </T>
                <Icon name="chevronRight" size={16} color={colors.ink3} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Filter<V extends string>({ label, options, value, onChange }: { label: string; options: { value: V; text: string }[]; value: V; onChange: (v: V) => void }) {
  return (
    <View style={{ gap: 6 }}>
      <T variant="labelSm" color={colors.ink2}>
        {label.toUpperCase()}
      </T>
      <View style={styles.chips} accessibilityRole="radiogroup">
        {options.map((o) => (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: value === o.value }}
            onPress={() => onChange(o.value)}
            style={[styles.chip, value === o.value && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
            <T variant="labelSm" color={value === o.value ? '#FFFFFF' : colors.ink2}>
              {o.text}
            </T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function Session({ questions, timed, onDone }: { questions: InterviewQuestion[]; timed: boolean; onDone: () => void }) {
  const { rateInterview } = useProgress();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [rated, setRated] = useState<Record<string, Rating>>({});
  const [left, setLeft] = useState(THINK_SECONDS);
  const q = questions[index];

  useEffect(() => {
    if (!timed || shown || left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timed, shown, left]);

  if (!q) return <Summary questions={questions} rated={rated} onDone={onDone} />;

  const rate = (r: Rating) => {
    haptic.tap();
    rateInterview(q.id, r);
    setRated((x) => ({ ...x, [q.id]: r }));
    setShown(false);
    setLeft(THINK_SECONDS);
    setIndex(index + 1);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={`Question ${index + 1} of ${questions.length}`} subtitle={`${TOPIC_NAME[q.topic]} · ${q.level}`} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 14, paddingBottom: 24 }}>
        <Animated.View key={q.id} entering={FadeInDown.duration(280)} style={[card, { padding: 16, gap: 10 }]}>
          <T variant="title" accessibilityRole="header">
            {q.question}
          </T>
          {timed && !shown ? (
            <T variant="labelSm" color={left > 0 ? colors.ink2 : colors.saffronInk} accessibilityLiveRegion="polite">
              {left > 0 ? `Thinking time ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}` : 'Time is up. Reveal when ready.'}
            </T>
          ) : null}
        </Animated.View>

        {shown ? (
          <Animated.View entering={FadeInDown.duration(280)} style={{ gap: 12 }}>
            <View style={[card, { padding: 16, gap: 8 }]}>
              <T variant="labelSm" color={colors.primary}>
                MODEL ANSWER
              </T>
              <T variant="body">{q.answer}</T>
              <T variant="labelSm" color={colors.ink2} style={{ marginTop: 4 }}>
                WHY
              </T>
              <T variant="bodySm" color={colors.inkBody}>
                {q.why}
              </T>
            </View>
            {q.code ? (
              <View style={styles.code}>
                <CodeBlock lines={q.code.lines} lang={q.code.lang} />
                {q.code.output ? (
                  <View style={styles.output}>
                    <T variant="labelSm" color="#8E89C4" style={{ fontSize: 11 }}>
                      OUTPUT
                    </T>
                    {q.code.output.map((l) => (
                      <T key={l} style={styles.outText}>
                        {l}
                      </T>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}
            <View style={[card, { padding: 14, gap: 6 }]}>
              <T variant="label">They may follow up with</T>
              {q.followUps.map((f) => (
                <T key={f} variant="bodySm" color={colors.inkBody}>
                  • {f}
                </T>
              ))}
            </View>
          </Animated.View>
        ) : null}
      </ScrollView>
      <View style={styles.bar}>
        {shown ? (
          <>
            <T variant="labelSm" color={colors.ink2} style={{ textAlign: 'center' }}>
              How well did you answer?
            </T>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {RATE.map((r) => (
                <Pressable key={r.value} accessibilityRole="button" onPress={() => rate(r.value)} style={[styles.rate, { backgroundColor: r.bg }]}>
                  <T variant="label" color={r.color} style={{ fontSize: 14 }}>
                    {r.label}
                  </T>
                </Pressable>
              ))}
            </View>
          </>
        ) : (
          <Button label="Reveal the answer" onPress={() => setShown(true)} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Summary({ questions, rated, onDone }: { questions: InterviewQuestion[]; rated: Record<string, Rating>; onDone: () => void }) {
  const count = (r: Rating) => questions.filter((q) => rated[q.id] === r).length;
  const revise = [...new Set(questions.filter((q) => rated[q.id] !== 'knew').flatMap((q) => q.lessons))].filter((id) => getLesson(id));
  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Session done" subtitle={`${questions.length} questions`} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {RATE.map((r) => (
            <View key={r.value} style={[styles.stat, { backgroundColor: r.bg }]}>
              <T variant="heading" color={r.color}>
                {count(r.value)}
              </T>
              <T variant="caption" color={r.color}>
                {r.label}
              </T>
            </View>
          ))}
        </View>
        {revise.length ? (
          <View style={[card, { padding: 14, gap: 8 }]}>
            <T variant="label">Revise these lessons</T>
            <T variant="caption">From the questions you didn’t fully know.</T>
            {revise.map((id) => (
              <Pressable key={id} accessibilityRole="button" onPress={() => router.push({ pathname: '/lesson/[id]', params: { id } })} style={styles.weak}>
                <Icon name="learn" size={18} color={colors.primary} />
                <T variant="bodySm" color={colors.ink} style={{ flex: 1 }}>
                  {getLesson(id)!.title}
                </T>
                <Icon name="chevronRight" size={16} color={colors.ink3} />
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={[card, { padding: 14 }]}>
            <T variant="bodySm" color={colors.inkBody}>
              You rated every answer as known. Try a harder level or another topic next.
            </T>
          </View>
        )}
        <Button label="Practise again" onPress={onDone} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, justifyContent: 'center' },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  switch: { width: 48, height: 28, borderRadius: 14, backgroundColor: colors.line, padding: 3, justifyContent: 'center' },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF' },
  weak: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 10 },
  code: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  output: { padding: 12, gap: 2, backgroundColor: colors.code.console },
  outText: { fontFamily: fonts.mono, fontSize: 13, color: colors.code.text },
  bar: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, gap: 8, borderTopWidth: 1, borderTopColor: colors.lineSoft, backgroundColor: colors.surface },
  rate: { flex: 1, minHeight: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stat: { flex: 1, borderRadius: 16, paddingVertical: 12, alignItems: 'center', gap: 2 },
});
