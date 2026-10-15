// Four quick exercise types that work well on a phone: order lines, find the bug,
// predict the output, and tap a token.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';

import { ActionBar, StepHeader, VerdictBar } from './Shell';
import { CodeBlock, LANG_COLOR, tokenize } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { isOrderCorrect, isPredictCorrect, scrambledOrder, type BugStep, type CodeLang, type OrderStep, type PredictStep, type TapStep } from '@/content';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

type Props<S> = { step: S; onDone: () => void; onMistake: () => void };

function useVerdict(onMistake: () => void) {
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const judge = (ok: boolean) => {
    setVerdict(ok);
    if (ok) haptic.success();
    else {
      haptic.error();
      onMistake();
    }
  };
  return { verdict, judge, reset: () => setVerdict(null) };
}

/** About this many monospace characters fit across a phone-width code card. */
const FITS = 36;

function CodeCard({ children, file, lang, lines = [] }: { children: React.ReactNode; file: string; lang: CodeLang; lines?: string[] }) {
  const wide = lines.some((l) => l.length > FITS);
  return (
    <View style={styles.editor}>
      <View style={styles.editorHead}>
        <View style={[styles.fileDot, { backgroundColor: LANG_COLOR[lang] }]} />
        <T style={{ fontFamily: fonts.mono, fontSize: 12, color: '#FFFFFF', flex: 1 }}>{file}</T>
        {wide ? (
          <T style={{ fontSize: 11, color: colors.code.comment }} accessibilityLabel="Some lines are long. Swipe the code sideways to read them.">
            swipe ⇆
          </T>
        ) : null}
      </View>
      {children}
    </View>
  );
}

function CodeLine({ text, lang }: { text: string; lang: CodeLang }) {
  return (
    <Text style={styles.code}>
      {tokenize(text, lang).map((t, i) => (
        <Text key={i} style={{ color: t.color }}>
          {t.text}
        </Text>
      ))}
    </Text>
  );
}

/* ---------- Order the lines ---------- */

export function OrderLinesStep({ step, onDone, onMistake }: Props<OrderStep>) {
  const [pool, setPool] = useState(() => scrambledOrder(step.title + step.lines.join('\n'), step.lines.length));
  const [placed, setPlaced] = useState<number[]>([]);
  const { verdict, judge, reset } = useVerdict(onMistake);

  const place = (i: number) => {
    haptic.tap();
    setPool((p) => p.filter((x) => x !== i));
    setPlaced((p) => [...p, i]);
  };
  const unplace = (i: number) => {
    if (verdict !== null) return;
    haptic.tap();
    setPlaced((p) => p.filter((x) => x !== i));
    setPool((p) => [...p, i]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={LANG_COLOR[step.lang]} />
        </Animated.View>

        <CodeCard file="Your program" lang={step.lang} lines={step.lines}>
          {/* Code never wraps (wrapping hides Python indentation); long lines scroll sideways. */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ minWidth: '100%' }}>
            <View style={{ paddingVertical: 8, minHeight: 60, minWidth: '100%' }}>
              {placed.length === 0 ? (
                <T variant="caption" color="#8E89C4" style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
                  Tap the lines below in the order they should run
                </T>
              ) : null}
              {placed.map((i, n) => {
                const wrongHere = verdict === false && step.lines[i].trim() !== step.lines[n].trim();
                return (
                  <Animated.View key={i} layout={LinearTransition.duration(180)} entering={FadeIn.duration(160)}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Line ${n + 1}: ${step.lines[i].trim()}. Tap to remove`}
                      onPress={() => unplace(i)}
                      style={[styles.placedRow, wrongHere && { backgroundColor: '#4A1D2A' }]}>
                      <Text style={styles.gutter}>{n + 1}</Text>
                      <CodeLine text={step.lines[i]} lang={step.lang} />
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          </ScrollView>
        </CodeCard>

        {verdict && step.output ? (
          <View style={styles.console}>
            <T variant="labelSm" color="#8E89C4" style={{ fontSize: 11 }}>
              OUTPUT
            </T>
            {step.output.map((l, i) => (
              <T key={i} style={styles.consoleText}>
                {l}
              </T>
            ))}
          </View>
        ) : null}

        <View style={{ gap: 8 }}>
          {pool.length ? (
            <T variant="labelSm" color={colors.ink2}>
              Lines left: {pool.length}
            </T>
          ) : null}
          {pool.map((i) => (
            <Animated.View key={i} layout={LinearTransition.duration(180)}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Add line: ${step.lines[i].trim()}`}
                onPress={() => place(i)}
                style={({ pressed }) => [styles.chip, { transform: [{ translateY: pressed ? 2 : 0 }], boxShadow: pressed ? 'none' : '0 2px 0 #D9D5F7' }]}>
                <T style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}>{step.lines[i].trim()}</T>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {verdict === null ? (
        <ActionBar>
          <Button
            label={pool.length ? `Place ${pool.length} more ${pool.length === 1 ? 'line' : 'lines'}` : 'Check order'}
            disabled={pool.length > 0}
            onPress={() => judge(isOrderCorrect(step.lines, placed))}
          />
        </ActionBar>
      ) : (
        <VerdictBar
          right={verdict}
          message={verdict ? step.explain : 'Red lines are in the wrong place. Tap them to move them back, then try again.'}
          onContinue={onDone}
          onRetry={reset}
        />
      )}
    </View>
  );
}

/* ---------- Find the bug ---------- */

export function FindBugStep({ step, onDone, onMistake }: Props<BugStep>) {
  const [pick, setPick] = useState<number | null>(null);
  const { verdict, judge, reset } = useVerdict(onMistake);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={LANG_COLOR[step.lang]} />
        </Animated.View>
        <CodeCard file="Tap the buggy line" lang={step.lang} lines={step.lines}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ minWidth: '100%' }}>
            <View style={{ paddingVertical: 8, minWidth: '100%' }} accessibilityRole="radiogroup">
              {step.lines.map((line, i) => {
                const selected = pick === i;
                const showFix = verdict === true && i === step.bug;
                return (
                  <Pressable
                    key={i}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected, disabled: verdict !== null }}
                    accessibilityLabel={`Line ${i + 1}: ${line.trim() || 'blank'}`}
                    disabled={verdict !== null}
                    onPress={() => {
                      haptic.tap();
                      setPick(i);
                    }}
                    style={[styles.bugRow, selected && { backgroundColor: verdict === false ? '#4A1D2A' : '#2A2660' }, showFix && { backgroundColor: '#3A1A24' }]}>
                    <Text style={styles.gutter}>{i + 1}</Text>
                    <View>
                      <View style={showFix ? { opacity: 0.6 } : undefined}>
                        <CodeLine text={line} lang={step.lang} />
                      </View>
                      {showFix ? (
                        <Animated.View entering={FadeInDown.duration(220)} style={styles.fixRow}>
                          <CodeLine text={step.fix} lang={step.lang} />
                        </Animated.View>
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </CodeCard>
      </ScrollView>
      {verdict === null ? (
        <ActionBar>
          <Button label={pick === null ? 'Tap a line first' : `Line ${pick + 1} has the bug`} disabled={pick === null} onPress={() => judge(pick === step.bug)} />
        </ActionBar>
      ) : (
        <VerdictBar
          right={verdict}
          title={verdict ? 'Bug found!' : undefined}
          message={verdict ? step.explain : 'That line is fine. Read each line and ask: does it do what the program needs?'}
          onContinue={onDone}
          onRetry={() => {
            setPick(null);
            reset();
          }}
        />
      )}
    </View>
  );
}

/* ---------- Predict the output ---------- */

export function PredictOutputStep({ step, onDone, onMistake }: Props<PredictStep>) {
  const [answer, setAnswer] = useState('');
  const { verdict, judge, reset } = useVerdict(onMistake);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions="Run it in your head. What does it print?" color={LANG_COLOR[step.lang]} />
        </Animated.View>
        <View style={[styles.editor, { paddingVertical: 2 }]}>
          <CodeBlock lines={step.lines} lang={step.lang} />
        </View>
        <View style={styles.console}>
          <T variant="labelSm" color="#8E89C4" style={{ fontSize: 11 }}>
            YOUR PREDICTION
          </T>
          <TextInput
            value={answer}
            onChangeText={(v) => {
              setAnswer(v);
              if (verdict === false) reset();
            }}
            editable={verdict !== true}
            placeholder="Type the output…"
            placeholderTextColor="#6F6A9E"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            accessibilityLabel="Your predicted output"
            style={styles.predictInput}
          />
        </View>
        {verdict !== null ? (
          <Animated.View entering={FadeInDown.duration(220)} style={[styles.console, { borderWidth: 1, borderColor: verdict ? '#86EFAC' : '#FCA5A5' }]}>
            <T variant="labelSm" color={verdict ? '#86EFAC' : '#FCA5A5'} style={{ fontSize: 11 }}>
              {verdict ? 'ACTUAL OUTPUT · MATCHES' : 'NOT THE OUTPUT · THINK AGAIN'}
            </T>
            {verdict ? <T style={styles.consoleText}>{step.answer}</T> : null}
          </Animated.View>
        ) : null}
      </ScrollView>
      {verdict === null ? (
        <ActionBar>
          <Button label="Check prediction" disabled={!answer.trim()} onPress={() => judge(isPredictCorrect(answer, step.answer, step.accept))} />
        </ActionBar>
      ) : (
        <VerdictBar
          right={verdict}
          message={verdict ? step.explain : 'Trace it one line at a time and keep track of every variable.'}
          onContinue={onDone}
          onRetry={reset}
        />
      )}
    </KeyboardAvoidingView>
  );
}

/* ---------- Tap the token ---------- */

export function TapTokenStep({ step, onDone, onMistake }: Props<TapStep>) {
  const [pick, setPick] = useState<{ line: number; index: number; text: string } | null>(null);
  const { verdict, judge, reset } = useVerdict(onMistake);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={LANG_COLOR[step.lang]} />
        </Animated.View>
        <CodeCard file="Tap a word in the code" lang={step.lang} lines={step.lines}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
            <View>
              {step.lines.map((line, li) => (
                <View key={li} style={styles.tapRow}>
                  <Text style={styles.gutter}>{li + 1}</Text>
                  {tokenize(line, step.lang).map((tok, ti) => {
                    if (!tok.text.trim())
                      return (
                        <Text key={ti} style={styles.code}>
                          {tok.text}
                        </Text>
                      );
                    const selected = pick?.line === li && pick.index === ti;
                    const correct = verdict === true && selected;
                    return (
                      <Pressable
                        key={ti}
                        accessibilityRole="button"
                        accessibilityLabel={`${tok.text}, line ${li + 1}`}
                        disabled={verdict !== null}
                        onPress={() => {
                          haptic.tap();
                          setPick({ line: li, index: ti, text: tok.text });
                        }}
                        hitSlop={4}
                        style={[styles.tapToken, selected && { backgroundColor: correct ? '#14532D' : verdict === false ? '#7F1D1D' : colors.primary }]}>
                        <Text style={[styles.code, { color: selected ? '#FFFFFF' : tok.color }]}>{tok.text}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </CodeCard>
        {pick ? (
          <View style={styles.pickNote}>
            <Icon name="check" size={14} color={colors.primary} strokeWidth={2.6} />
            <T variant="labelSm" color={colors.ink2}>
              You picked <T style={{ fontFamily: fonts.mono, color: colors.ink }}>{pick.text}</T> on line {pick.line + 1}
            </T>
          </View>
        ) : null}
      </ScrollView>
      {verdict === null ? (
        <ActionBar>
          <Button
            label={pick ? 'Check' : 'Tap a word in the code'}
            disabled={!pick}
            onPress={() => judge(!!pick && pick.line === step.target.line && pick.text === step.target.token)}
          />
        </ActionBar>
      ) : (
        <VerdictBar
          right={verdict}
          message={verdict ? step.explain : 'Not that one. Re-read the question and look again.'}
          onContinue={onDone}
          onRetry={() => {
            setPick(null);
            reset();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 16 },
  editor: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  editorHead: { height: 36, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: colors.code.line },
  fileDot: { width: 7, height: 7, borderRadius: 4 },
  gutter: { fontFamily: fonts.mono, fontSize: 12, color: colors.code.gutter, width: 22 },
  code: { fontFamily: fonts.mono, fontSize: 13.5, lineHeight: 22, color: colors.code.text },
  placedRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, minHeight: 34 },
  chip: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D5F7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bugRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, minHeight: 36 },
  fixRow: { marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: '#14532D' },
  tapRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, minHeight: 34 },
  tapToken: { borderRadius: 6, paddingHorizontal: 1, paddingVertical: 2 },
  pickNote: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  console: { borderRadius: 16, backgroundColor: colors.code.console, padding: 12, gap: 6 },
  consoleText: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20, color: colors.code.text },
  predictInput: { fontFamily: fonts.mono, fontSize: 15, color: '#FFFFFF', minHeight: 44, paddingVertical: 6, textAlignVertical: 'top' },
});
