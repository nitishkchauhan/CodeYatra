import * as Speech from 'expo-speech';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeBlock } from '@/components/Code';
import { WebPreview } from '@/components/WebPreview';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { drillId, getLesson, hasDrill } from '@/content';
import type { CodeLang } from '@/content';
import { getNotes } from '@/content/notes';
import { UI as REACT_UI } from '@/content/tracks/reactV5/kit';
import { Anim } from '@/features/lesson/Anim';
import { ConsoleView } from '@/features/lesson/EditorStep';
import { useCodeRunner } from '@/lib/runner';
import { buildProgram, runtimeOf } from '@/lib/runner/harness';
import { haptic } from '@/lib/haptics';
import { buildPage } from '@/lib/web/page';
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
  // Notes v4: text size, jump links, and answers to the self-check.
  const [scale, setScale] = useState(1);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const scroller = useRef<ScrollView>(null);
  const spots = useRef<Record<string, number>>({});
  const place = (key: string, y: number) => {
    spots.current[key] = y;
  };
  const jump = (key: string) => {
    haptic.tap();
    scroller.current?.scrollTo({ y: Math.max(0, (spots.current[key] ?? 0) - 8), animated: true });
  };
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
      <ScrollView ref={scroller} contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(300)} style={{ gap: 6 }}>
          <T variant="kicker">{lesson.level ? `${LEVEL[lesson.level].toUpperCase()} · MODULE NOTES` : 'MODULE NOTES'}</T>
          <T variant="display" accessibilityRole="header">
            {lesson.title}
          </T>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Pressable accessibilityRole="button" accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read these notes aloud'} onPress={listen} style={styles.listen}>
              <Icon name="speaker" size={16} color={colors.primary} />
              <T variant="labelSm" color={colors.primary}>
                {speaking ? 'Stop' : 'Listen'}
              </T>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Smaller text" onPress={() => setScale((x) => Math.max(0.85, +(x - 0.15).toFixed(2)))} style={styles.size}>
              <T variant="labelSm">A−</T>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Bigger text" onPress={() => setScale((x) => Math.min(1.45, +(x + 0.15).toFixed(2)))} style={styles.size}>
              <T variant="label">A+</T>
            </Pressable>
          </View>
          {notes.summary ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingTop: 4 }}>
              {JUMPS.filter(([k]) => (k === 'mistakes' ? !!notes.mistakes : k === 'check' ? !!notes.check : true)).map(([k, label]) => (
                <Pressable key={k} accessibilityRole="link" accessibilityLabel={`Jump to ${label}`} onPress={() => jump(k)} style={styles.jump}>
                  <T variant="labelSm" color={colors.primary}>
                    {label}
                  </T>
                </Pressable>
              ))}
            </ScrollView>
          ) : null}
        </Animated.View>

        {notes.summary ? (
          <View style={styles.summary}>
            <T variant="kicker" color={colors.saffronInk}>
              IN 30 SECONDS
            </T>
            {notes.summary.map((line, i) => (
              <T key={line} variant="body" color={colors.ink} style={{ fontSize: 15 * scale, lineHeight: 22 * scale }}>
                {i + 1}. {line}
              </T>
            ))}
          </View>
        ) : null}

        {notes.sections.map((s, i) => (
          <Animated.View key={s.heading} onLayout={(e) => i === 0 && place('explain', e.nativeEvent.layout.y)} entering={FadeInDown.delay(60 * i).duration(300)} style={{ gap: 10 }}>
            <T variant="title">{s.heading}</T>
            <T variant="body" style={{ fontSize: 16 * scale, lineHeight: 24 * scale }}>
              {s.body}
            </T>
            {s.anim ? <Anim kind={s.anim} /> : null}
            {s.code && notes.runnable ? <RunnableCode lines={s.code} lang={notes.lang ?? 'python'} /> : null}
            {s.code && !notes.runnable ? (
              <View style={styles.code}>
                <CodeBlock lines={s.code} lang={notes.lang ?? 'python'} />
              </View>
            ) : null}
          </Animated.View>
        ))}

        <View style={{ gap: 10 }} onLayout={(e) => place('example', e.nativeEvent.layout.y)}>
          <T variant="kicker" color={colors.primary}>
            WORKED EXAMPLE
          </T>
          <T variant="title">{notes.example.title}</T>
          <View style={styles.code}>
            <CodeBlock lines={notes.example.code} lang={notes.lang ?? 'python'} highlight={highlight} />
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
          {notes.example.next ? (
            <WebPreview doc={buildPage({ html: '', js: notes.example.code.join('\n'), next: notes.example.next })} height={240} />
          ) : notes.example.page ? (
            <WebPreview
              doc={buildPage(
                notes.lang === 'jsx'
                  ? { html: notes.example.page, css: REACT_UI, js: notes.example.code.join('\n'), react: true }
                  : notes.lang === 'javascript'
                    ? { html: notes.example.page, js: notes.example.code.join('\n') }
                    : { html: notes.example.page, css: notes.example.code.join('\n') },
              )}
              height={200}
            />
          ) : (
            <ConsoleView output={notes.example.output} />
          )}
        </View>

        {notes.mistakes ? (
          <View style={{ gap: 10 }} onLayout={(e) => place('mistakes', e.nativeEvent.layout.y)}>
            <T variant="kicker" color={colors.danger}>
              COMMON MISTAKES
            </T>
            {notes.mistakes.map((m) => {
              const crash = /Error\b/.test(m.error);
              return (
                <View key={m.title} style={[card, { padding: 12, gap: 8 }]}>
                  <T variant="label">{m.title}</T>
                  <View style={styles.code}>
                    <CodeBlock lines={m.bad} lang={notes.lang ?? 'python'} />
                  </View>
                  <ConsoleView output={crash ? [] : [m.error]} error={crash ? m.error : undefined} />
                  <T variant="labelSm" color={colors.successInk}>
                    THE FIX
                  </T>
                  <View style={styles.code}>
                    <CodeBlock lines={m.fix} lang={notes.lang ?? 'python'} />
                  </View>
                  <T variant="bodySm" color={colors.inkBody} style={{ fontSize: 14 * scale, lineHeight: 20 * scale }}>
                    {m.why}
                  </T>
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={[styles.box, { backgroundColor: colors.saffronSoft }]}>
          <T variant="kicker" color={colors.saffronInk}>
            IN INDUSTRY
          </T>
          <T variant="bodySm" color={colors.ink}>
            {notes.industry}
          </T>
        </View>

        <View style={{ gap: 8 }} onLayout={(e) => place('interview', e.nativeEvent.layout.y)}>
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

        {notes.check ? (
          <View style={{ gap: 10 }} onLayout={(e) => place('check', e.nativeEvent.layout.y)}>
            <T variant="kicker" color={colors.primary}>
              CHECK YOURSELF · {Object.keys(picks).length} OF {notes.check.length}
            </T>
            {notes.check.map((c, qi) => {
              const p = picks[qi];
              const done = p !== undefined;
              return (
                <View key={c.q} style={[card, { padding: 12, gap: 8 }]}>
                  <T variant="label">{c.q}</T>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {c.options.map((o, oi) => {
                      const good = done && oi === c.answer;
                      const bad = done && oi === p && p !== c.answer;
                      return (
                        <Pressable
                          key={o}
                          accessibilityRole="radio"
                          accessibilityState={{ checked: p === oi, disabled: done }}
                          disabled={done}
                          onPress={() => {
                            if (oi === c.answer) haptic.success();
                            else haptic.error();
                            setPicks((x) => ({ ...x, [qi]: oi }));
                          }}
                          style={[styles.opt, good && { borderColor: colors.success, backgroundColor: colors.successSoft }, bad && { borderColor: colors.danger, backgroundColor: colors.dangerSoft }]}>
                          <T style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}>{o}</T>
                        </Pressable>
                      );
                    })}
                  </View>
                  {done ? (
                    <T variant="bodySm" color={p === c.answer ? colors.successInk : colors.saffronInk}>
                      {p === c.answer ? 'Right. ' : 'Not quite. '}
                      {c.why}
                    </T>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={{ gap: 8 }} onLayout={(e) => place('cheat', e.nativeEvent.layout.y)}>
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

const JUMPS = [
  ['explain', 'Explain'],
  ['example', 'Example'],
  ['mistakes', 'Mistakes'],
  ['interview', 'Interview'],
  ['check', 'Check'],
  ['cheat', 'Cheat sheet'],
] as const;

/** A code block with a Run button: it runs on the phone with the same runner as the lessons. */
function RunnableCode({ lines, lang }: { lines: string[]; lang: CodeLang }) {
  const run = useCodeRunner();
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<{ output: string[]; error?: string } | null>(null);
  const runnable = lang === 'python' || lang === 'javascript' ? lang : null;
  return (
    <View style={styles.code}>
      <CodeBlock lines={lines} lang={lang} />
      {runnable ? (
        <View style={styles.runBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Run this code"
            disabled={busy}
            onPress={async () => {
              haptic.tap();
              setBusy(true);
              const r = await run(runtimeOf(runnable), buildProgram(runnable, lines.join('\n'), []));
              setBusy(false);
              setOut({ output: r.output, error: r.ok ? undefined : r.error });
            }}
            style={styles.run}>
            <Glyph name="play" size={12} color="#FFFFFF" />
            <T variant="labelSm" color="#FFFFFF">
              {busy ? 'Running…' : out ? 'Run again' : 'Run'}
            </T>
          </Pressable>
        </View>
      ) : null}
      {out ? (
        <View style={{ padding: 8 }}>
          <ConsoleView output={out.output} error={out.error} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  size: { minWidth: 40, height: 36, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  jump: { height: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, justifyContent: 'center' },
  summary: { borderRadius: 16, backgroundColor: colors.saffronSoft, padding: 14, gap: 6 },
  opt: { minHeight: 44, minWidth: '47%', flexGrow: 1, borderRadius: 12, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: 10, justifyContent: 'center' },
  runBar: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: colors.code.line },
  run: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 34, paddingHorizontal: 14, borderRadius: 10, backgroundColor: colors.teal },
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
