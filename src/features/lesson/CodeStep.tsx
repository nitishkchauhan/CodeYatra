import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ActionBar } from './Shell';
import { GapCode, LANG_COLOR } from '@/components/Code';
import { Preview } from '@/components/Preview';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { CodeStep as Step, RunOutput } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';


export function CodeStep({ step, onDone, onMistake }: { step: Step; onDone: () => void; onMistake: () => void }) {
  const t = useT();
  const gapCount = Math.max(...step.lines.flat().map((s) => (typeof s === 'string' ? -1 : s.gap))) + 1;
  const [gaps, setGaps] = useState<(string | null)[]>(() => Array(gapCount).fill(null));
  const [active, setActive] = useState<number | null>(0);
  const [result, setResult] = useState<RunOutput | null>(null);

  // Markup lessons preview live as you fill gaps; code runs only when asked.
  const live = step.lang === 'html' || step.lang === 'css' ? step.run(gaps.map((g) => g ?? '')) : null;
  const preview = result?.preview ?? live?.preview;

  const tapGap = (i: number) => {
    const next = [...gaps];
    next[i] = null;
    setGaps(next);
    setActive(i);
    setResult(null);
  };

  const tapToken = (value: string) => {
    haptic.tap();
    const next = [...gaps];
    let i = active ?? next.findIndex((g) => g === null);
    if (i < 0) i = next.length - 1;
    next[i] = value;
    const empty = next.findIndex((g) => g === null);
    setGaps(next);
    setActive(empty >= 0 ? empty : null);
    setResult(null);
  };

  const runIt = () => {
    if (gaps.some((g) => g === null)) {
      setActive(gaps.findIndex((g) => g === null));
      return;
    }
    const out = step.run(gaps as string[]);
    setResult(out);
    if (out.pass) haptic.success();
    else {
      haptic.error();
      onMistake();
    }
  };

  const filled = gaps.every((g) => g !== null);

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

        {preview ? (
          <Animated.View entering={FadeIn.duration(250)}>
            <Preview spec={preview} />
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(80).duration(320)} style={styles.editor}>
          <View style={styles.editorHead}>
            <View style={[styles.fileDot, { backgroundColor: LANG_COLOR[step.lang] }]} />
            <T style={{ fontFamily: fonts.mono, fontSize: 12, color: '#FFFFFF' }}>{step.file}</T>
          </View>
          <GapCode lines={step.lines} lang={step.lang} gaps={gaps} active={active} onGap={tapGap} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(140).duration(320)} style={{ gap: 8 }}>
          <T variant="labelSm" color={colors.ink2}>
            {active === null ? 'Tap a gap to change it' : `Choose a value for gap ${active + 1}`}
          </T>
          <View style={styles.tokens}>
            {step.tokens.map((v) => (
              <Pressable
                key={v}
                accessibilityRole="button"
                accessibilityLabel={`Use ${v}`}
                onPress={() => tapToken(v)}
                style={({ pressed }) => [styles.token, { boxShadow: pressed ? 'none' : '0 2px 0 #D9D5F7', transform: [{ translateY: pressed ? 2 : 0 }] }]}>
                <T style={{ fontFamily: fonts.mono, fontSize: 16, color: colors.ink }}>{v}</T>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {result ? (
          <Animated.View entering={FadeInDown.duration(260)} style={{ gap: 10 }} accessibilityLiveRegion="polite">
            {result.checks ? (
              <View style={styles.checks}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <T variant="label" style={{ fontSize: 13 }}>
                    Tests
                  </T>
                  <T variant="labelSm" color={result.pass ? colors.success : colors.danger}>
                    {result.checks.filter((c) => c.ok).length} of {result.checks.length} passing
                  </T>
                </View>
                {result.checks.map((c, i) => (
                  <Animated.View key={c.label} entering={FadeInDown.delay(i * 70)} style={styles.check}>
                    <View style={[styles.checkDot, { backgroundColor: c.ok ? colors.success : colors.danger }]}>
                      <Icon name={c.ok ? 'check' : 'cross'} size={12} color="#FFFFFF" strokeWidth={3} />
                    </View>
                    <T style={{ flex: 1, fontFamily: fonts.mono, fontSize: 12.5, color: c.ok ? colors.ink : colors.dangerInk }}>{c.label}</T>
                  </Animated.View>
                ))}
              </View>
            ) : null}
            {result.output || result.error ? (
              <View style={styles.console}>
                <View style={styles.consoleHead}>
                  <T variant="labelSm" color="#8E89C4" style={{ fontSize: 11 }}>
                    OUTPUT
                  </T>
                  <T variant="labelSm" color={result.pass ? '#86EFAC' : '#FCA5A5'} style={{ fontSize: 11 }}>
                    {result.pass ? '✓ Passed' : result.error ? 'Error' : '✗ Not quite'}
                  </T>
                </View>
                <View style={{ padding: 12, gap: 2 }}>
                  {result.error ? (
                    <T style={[styles.consoleText, { color: '#FCA5A5' }]}>{result.error}</T>
                  ) : result.output && result.output.length ? (
                    result.output.map((line, i) => (
                      <T key={i} style={styles.consoleText}>
                        {line}
                      </T>
                    ))
                  ) : (
                    <T style={[styles.consoleText, { color: '#8E89C4' }]}>(no output)</T>
                  )}
                </View>
              </View>
            ) : null}
          </Animated.View>
        ) : null}
      </ScrollView>

      <ActionBar>
        {result?.pass ? (
          <Animated.View entering={ZoomIn.duration(220)}>
            <Button variant="success" label={`${t('finish')} · all tests pass`} onPress={onDone} />
          </Animated.View>
        ) : (
          <Button
            label={filled ? (result ? t('runAgain') : t('runCode')) : 'Fill every gap first'}
            icon={filled ? (c) => <Glyph name="play" size={18} color={c} /> : undefined}
            disabled={!filled}
            onPress={runIt}
          />
        )}
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 16 },
  editor: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  editorHead: { height: 36, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: colors.code.line },
  fileDot: { width: 7, height: 7, borderRadius: 4 },
  tokens: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  token: { minWidth: 64, flexGrow: 1, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#D9D5F7', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  checks: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  check: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  console: { borderRadius: 16, backgroundColor: colors.code.console, overflow: 'hidden' },
  consoleHead: { height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: colors.code.bar },
  consoleText: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20, color: colors.code.text },
});
