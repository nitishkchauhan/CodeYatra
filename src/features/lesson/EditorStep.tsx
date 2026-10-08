import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ActionBar } from './Shell';
import { LANG_COLOR } from '@/components/Code';
import { AskYatri } from '@/components/AskYatri';
import { CodeEditor } from '@/components/CodeEditor';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { EditorStep as Step } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { useCodeRunner } from '@/lib/runner';
import { buildProgram, readResults, runtimeOf, type TestResult } from '@/lib/runner/harness';
import { colors, fonts } from '@/theme';

type Outcome = { output: string[]; results: TestResult[]; error?: string };

export function ConsoleView({ output, error, pass }: { output: string[]; error?: string; pass?: boolean }) {
  return (
    <View style={styles.console}>
      <View style={styles.consoleHead}>
        <T variant="labelSm" color="#8E89C4" style={{ fontSize: 11 }}>
          OUTPUT
        </T>
        {pass !== undefined ? (
          <T variant="labelSm" color={pass ? '#86EFAC' : '#FCA5A5'} style={{ fontSize: 11 }}>
            {pass ? '✓ All tests pass' : error ? 'Error' : '✗ Not yet'}
          </T>
        ) : null}
      </View>
      <View style={{ padding: 12, gap: 2 }}>
        {output.map((line, i) => (
          <T key={i} style={styles.consoleText} selectable>
            {line}
          </T>
        ))}
        {error ? <T style={[styles.consoleText, { color: '#FCA5A5' }]} selectable>{error}</T> : null}
        {!output.length && !error ? <T style={[styles.consoleText, { color: '#8E89C4' }]}>(no output)</T> : null}
      </View>
    </View>
  );
}

export function EditorStep({ step, onDone, onMistake }: { step: Step; onDone: () => void; onMistake: () => void }) {
  const t = useT();
  const run = useCodeRunner();
  const [code, setCode] = useState(step.starter);
  const [busy, setBusy] = useState(false);
  const [firstPython, setFirstPython] = useState(step.lang !== 'javascript');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [hint, setHint] = useState(false);

  const pass = !!outcome && !outcome.error && outcome.results.every((r) => r.ok);

  const runTests = async () => {
    setBusy(true);
    const result = await run(runtimeOf(step.lang), buildProgram(step.lang, code, step.tests));
    setBusy(false);
    setFirstPython(false);
    const read = readResults(step.tests, result.output);
    const next = { ...read, error: result.ok ? undefined : result.error };
    setOutcome(next);
    if (!next.error && next.results.every((r) => r.ok)) haptic.success();
    else {
      haptic.error();
      onMistake();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker" color={LANG_COLOR[step.lang]}>
            {step.kicker}
          </T>
          <T variant="title" accessibilityRole="header">
            {step.title}
          </T>
          <T variant="bodySm" style={{ fontSize: 14, lineHeight: 21 }}>
            {step.instructions}
          </T>
        </Animated.View>

        <CodeEditor value={code} onChange={(v) => { setCode(v); setOutcome(null); }} lang={step.lang} file={step.file} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable accessibilityRole="button" onPress={() => setHint(!hint)} style={styles.chip}>
            <Icon name="bulb" size={16} color={colors.saffronShadow} />
            <T variant="labelSm" color={colors.saffronInk}>
              {hint ? 'Hide hint' : 'Hint'}
            </T>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => { setCode(step.starter); setOutcome(null); }} style={styles.chip}>
            <Icon name="reset" size={16} color={colors.ink2} />
            <T variant="labelSm" color={colors.ink2}>
              Reset code
            </T>
          </Pressable>
        </View>
        {hint ? (
          <Animated.View entering={FadeInDown} style={styles.hint}>
            <T variant="bodySm" color={colors.warnInk}>
              {step.hint}
            </T>
          </Animated.View>
        ) : null}

        {busy && firstPython ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
            <T variant="bodySm" color={colors.ink2} style={{ flex: 1 }}>
              Starting Python for the first time. This downloads about 10 MB once, then runs instantly.
            </T>
          </View>
        ) : null}

        {outcome ? (
          <Animated.View entering={FadeInDown.duration(260)} style={{ gap: 10 }} accessibilityLiveRegion="polite">
            {outcome.results.length ? (
              <View style={styles.tests}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <T variant="label" style={{ fontSize: 13 }}>
                    Tests
                  </T>
                  <T variant="labelSm" color={pass ? colors.success : colors.danger}>
                    {outcome.results.filter((r) => r.ok).length} of {outcome.results.length} passing
                  </T>
                </View>
                {outcome.results.map((r, i) => (
                  <Animated.View key={r.label} entering={FadeInDown.delay(i * 60)} style={{ gap: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={[styles.dot, { backgroundColor: r.ok ? colors.success : colors.danger }]}>
                        <Icon name={r.ok ? 'check' : 'cross'} size={12} color="#FFFFFF" strokeWidth={3} />
                      </View>
                      <T style={{ flex: 1, fontFamily: fonts.mono, fontSize: 12.5, color: r.ok ? colors.ink : colors.dangerInk }}>{r.label}</T>
                    </View>
                    {!r.ok && (r.got || r.error) ? (
                      <T style={{ marginLeft: 28, fontFamily: fonts.mono, fontSize: 11.5, color: colors.ink2 }}>{r.error ?? `got ${r.got}`}</T>
                    ) : null}
                  </Animated.View>
                ))}
              </View>
            ) : null}
            <ConsoleView output={outcome.output} error={outcome.error} pass={pass} />
            {!pass ? (
              <AskYatri
                build={() => ({
                  lang: step.lang,
                  title: step.title,
                  instructions: step.instructions,
                  code,
                  problem: [
                    ...outcome.results.filter((r) => !r.ok).map((r) => `${r.label} → ${r.error ?? `got ${r.got ?? 'nothing'}`}`),
                    outcome.error ?? '',
                  ]
                    .filter(Boolean)
                    .join('\n'),
                })}
              />
            ) : null}
          </Animated.View>
        ) : null}
      </ScrollView>

      <ActionBar>
        {pass ? (
          <Animated.View entering={ZoomIn.duration(220)}>
            <Button variant="success" label={`${t('finish')} · all tests pass`} onPress={onDone} />
          </Animated.View>
        ) : (
          <Button
            label={busy ? t('running') : outcome ? t('runAgain') : 'Run tests'}
            icon={busy ? undefined : (c) => <Glyph name="play" size={18} color={c} />}
            disabled={busy || !code.trim()}
            onPress={runTests}
          />
        )}
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 },
  chip: { minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  hint: { borderRadius: 14, backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: colors.warnLine, padding: 12 },
  loading: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderRadius: 14, backgroundColor: colors.primarySoft },
  tests: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  dot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  console: { borderRadius: 16, backgroundColor: colors.code.console, overflow: 'hidden' },
  consoleHead: { height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: colors.code.bar },
  consoleText: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20, color: colors.code.text },
});
