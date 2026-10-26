import * as Speech from 'expo-speech';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { drillId, getLesson, hasDrill } from '@/content';
import { getNotes } from '@/content/notes';
import { Anim } from '@/features/lesson/Anim';
import { ConsoleView } from '@/features/lesson/EditorStep';
import { haptic } from '@/lib/haptics';
import { card, colors, fonts } from '@/theme';

const LEVEL = { basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced' } as const;

/** "Read more": a module's notes, a short article to read after the lesson or come back to later. */
export default function NotesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLesson(id);
  const notes = getNotes(id);
  const [step, setStep] = useState<number | null>(null);
  const [shown, setShown] = useState<number[]>([]);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => () => void Speech.stop(), []);

  if (!lesson || !notes) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Notes" />
        <View style={{ padding: 24, gap: 12 }}>
          <T variant="title">No notes for this module yet</T>
          <Button label="Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const listen = () => {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const done = () => setSpeaking(false);
    const text = [lesson.title, ...notes.sections.map((s) => `${s.heading}. ${s.body}`), `In industry. ${notes.industry}`].join(' ');
    Speech.speak(text, { language: 'en-IN', rate: 0.95, onDone: done, onStopped: done, onError: done });
  };

  const highlight = step === null ? null : notes.example.walk[step].line - 1;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Read more" subtitle={`${notes.minutes}-minute read`} />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(300)} style={{ gap: 6 }}>
          <T variant="kicker">{lesson.level ? `${LEVEL[lesson.level].toUpperCase()} · MODULE NOTES` : 'MODULE NOTES'}</T>
          <T variant="display" accessibilityRole="header">
            {lesson.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read these notes aloud'} onPress={listen} style={styles.listen}>
            <Icon name="speaker" size={16} color={colors.primary} />
            <T variant="labelSm" color={colors.primary}>
              {speaking ? 'Stop' : 'Listen'}
            </T>
          </Pressable>
        </Animated.View>

        {notes.sections.map((s, i) => (
          <Animated.View key={s.heading} entering={FadeInDown.delay(60 * i).duration(300)} style={{ gap: 10 }}>
            <T variant="title">{s.heading}</T>
            <T variant="body">{s.body}</T>
            {s.anim ? <Anim kind={s.anim} /> : null}
            {s.code ? (
              <View style={styles.code}>
                <CodeBlock lines={s.code} lang="python" />
              </View>
            ) : null}
          </Animated.View>
        ))}

        <View style={{ gap: 10 }}>
          <T variant="kicker" color={colors.primary}>
            WORKED EXAMPLE
          </T>
          <T variant="title">{notes.example.title}</T>
          <View style={styles.code}>
            <CodeBlock lines={notes.example.code} lang="python" highlight={highlight} />
          </View>
          <T variant="caption">Tap a step to see its line.</T>
          {notes.example.walk.map((w, i) => (
            <Pressable
              key={`${w.line}:${i}`}
              accessibilityRole="button"
              accessibilityState={{ selected: step === i }}
              accessibilityLabel={`Step ${i + 1}, line ${w.line}: ${w.text}`}
              onPress={() => {
                haptic.tap();
                setStep(step === i ? null : i);
              }}
              style={[styles.walk, step === i && styles.walkOn]}>
              <View style={[styles.badge, step === i && { backgroundColor: colors.saffron }]}>
                <T variant="labelSm" color="#FFFFFF">
                  {w.line}
                </T>
              </View>
              <T variant="bodySm" color={colors.ink} style={{ flex: 1 }}>
                {w.text}
              </T>
            </Pressable>
          ))}
          <ConsoleView output={notes.example.output} />
        </View>

        <View style={[styles.box, { backgroundColor: colors.saffronSoft }]}>
          <T variant="kicker" color={colors.saffronInk}>
            IN INDUSTRY
          </T>
          <T variant="bodySm" color={colors.ink}>
            {notes.industry}
          </T>
        </View>

        <View style={{ gap: 8 }}>
          <T variant="kicker" color={colors.primary}>
            INTERVIEW QUESTIONS
          </T>
          {notes.interview.map((q, i) => {
            const open = shown.includes(i);
            return (
              <Pressable
                key={q.q}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
                accessibilityLabel={open ? `${q.q} Answer: ${q.a}` : `${q.q} Tap to show the answer`}
                onPress={() => {
                  haptic.tap();
                  setShown(open ? shown.filter((x) => x !== i) : [...shown, i]);
                }}
                style={[card, styles.question]}>
                <T variant="label">{q.q}</T>
                {open ? (
                  <Animated.View entering={FadeIn.duration(200)}>
                    <T variant="bodySm" color={colors.inkBody}>
                      {q.a}
                    </T>
                  </Animated.View>
                ) : (
                  <T variant="labelSm" color={colors.primary}>
                    Show answer
                  </T>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: 8 }}>
          <T variant="kicker" color={colors.primary}>
            CHEAT SHEET
          </T>
          <View style={[card, { padding: 4 }]}>
            {notes.cheat.map((c, i) => (
              <View key={c.code} style={[styles.cheat, i > 0 && { borderTopWidth: 1, borderTopColor: colors.lineSoft }]}>
                <T style={styles.cheatCode}>{c.code}</T>
                <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
                  {c.meaning}
                </T>
              </View>
            ))}
          </View>
        </View>

        {lesson.reading?.length ? (
          <View style={{ gap: 8 }}>
            <T variant="kicker" color={colors.primary}>
              OFFICIAL DOCS
            </T>
            {lesson.reading.map((r) => (
              <Pressable
                key={r.url}
                accessibilityRole="link"
                accessibilityLabel={`${r.title}. Opens in your browser`}
                onPress={() => WebBrowser.openBrowserAsync(r.url)}
                style={[card, styles.doc]}>
                <View style={{ flex: 1 }}>
                  <T variant="labelSm" color={colors.primary}>
                    {r.title}
                  </T>
                  <T variant="caption" style={{ fontSize: 11 }}>
                    {r.version ? `${r.version} · ` : ''}checked {r.reviewed}
                  </T>
                </View>
                <Icon name="external" size={16} color={colors.ink3} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.bar}>
        {hasDrill(lesson.id) ? (
          <Button label="Practise" onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: drillId(lesson.id) } })} style={{ flex: 1 }} />
        ) : null}
        <Button variant="outline" label="Open the lesson" onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })} style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingTop: 4, gap: 22, paddingBottom: 32 },
  listen: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 36, paddingHorizontal: 12, borderRadius: 18, backgroundColor: colors.primarySoft },
  code: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden', paddingVertical: 4 },
  walk: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  walkOn: { borderColor: colors.saffron, backgroundColor: colors.saffronSoft },
  badge: { minWidth: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  box: { borderRadius: 16, padding: 14, gap: 6 },
  question: { padding: 14, gap: 6 },
  cheat: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 },
  cheatCode: { width: '46%', fontFamily: fonts.mono, fontSize: 12.5, color: colors.ink },
  doc: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  bar: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
});
