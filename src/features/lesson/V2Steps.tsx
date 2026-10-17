// Lesson v2 teaching steps: the opening hook, "try it" (run code freely) and "common mistake".
// None of them are checked, so they never count as mistakes.
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ConsoleView } from './EditorStep';
import { ActionBar } from './Shell';
import { CodeBlock, LANG_COLOR } from '@/components/Code';
import { CodeEditor } from '@/components/CodeEditor';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { CodeLang, HookStep as Hook, MistakeStep as Mistake, TryStep as Try } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { useCodeRunner } from '@/lib/runner';
import { colors } from '@/theme';

function CodeCard({ label, lines, lang, tone }: { label: string; lines: string[]; lang: CodeLang; tone?: 'right' | 'wrong' }) {
  const edge = tone === 'right' ? colors.success : tone === 'wrong' ? colors.danger : 'transparent';
  return (
    <View style={[styles.codeCard, { borderColor: edge, borderWidth: tone ? 2 : 0 }]}>
      <View style={styles.codeHead}>
        <T variant="labelSm" color="#B9B5D9">
          {label}
        </T>
        {tone ? <Icon name={tone === 'right' ? 'check' : 'cross'} size={16} color={tone === 'right' ? '#86EFAC' : '#FCA5A5'} strokeWidth={3} /> : null}
      </View>
      <CodeBlock lines={lines} lang={lang} />
    </View>
  );
}

/** The module opener: a real situation, then what you'll be able to do by the end. */
export function HookStep({ step, onDone }: { step: Hook; onDone: () => void }) {
  const t = useT();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker">{step.kicker}</T>
          <T variant="display" accessibilityRole="header">
            {step.title}
          </T>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(80).duration(320)} style={styles.story}>
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Yatri size={56} mood="happy" bob />
          </View>
          <T variant="body" style={{ flex: 1 }}>
            {step.story}
          </T>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(160).duration(320)} style={styles.goal}>
          <Glyph name="star" size={18} color={colors.primary} />
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="labelSm" color={colors.primary}>
              BY THE END OF THIS MODULE
            </T>
            <T variant="bodySm" color={colors.ink}>
              {step.goal}
            </T>
          </View>
        </Animated.View>
        {step.code ? (
          <Animated.View entering={FadeInDown.delay(240).duration(320)}>
            <CodeCard label="You'll write code like this" lines={step.code.lines} lang={step.code.lang} />
          </Animated.View>
        ) : null}
      </ScrollView>
      <ActionBar>
        <Button label={t('continue')} onPress={onDone} />
      </ActionBar>
    </View>
  );
}

/** Change the code and run it. Continue is always allowed: this is for playing, not testing. */
export function TryStep({ step, onDone }: { step: Try; onDone: () => void }) {
  const t = useT();
  const run = useCodeRunner();
  const [code, setCode] = useState(step.starter);
  const [busy, setBusy] = useState(false);
  const [firstPython, setFirstPython] = useState(step.lang === 'python');
  const [out, setOut] = useState<{ output: string[]; error?: string } | null>(null);
  const [runs, setRuns] = useState(0);

  const runCode = async () => {
    haptic.tap();
    setBusy(true);
    const r = await run(step.lang, code);
    setBusy(false);
    setFirstPython(false);
    setOut({ output: r.output, error: r.ok ? undefined : r.error });
    setRuns((n) => n + 1);
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

        <CodeEditor value={code} onChange={setCode} lang={step.lang} file={step.file} minLines={4} />

        <View style={{ gap: 6 }}>
          <T variant="labelSm" color={colors.ink2}>
            TRY THESE CHANGES
          </T>
          {step.ideas.map((idea) => (
            <View key={idea} style={styles.idea}>
              <Icon name="bulb" size={16} color={colors.saffronShadow} />
              <T variant="bodySm" color={colors.ink} style={{ flex: 1 }}>
                {idea}
              </T>
            </View>
          ))}
          <Pressable accessibilityRole="button" onPress={() => { setCode(step.starter); setOut(null); }} style={styles.chip}>
            <Icon name="reset" size={16} color={colors.ink2} />
            <T variant="labelSm" color={colors.ink2}>
              Reset code
            </T>
          </Pressable>
        </View>

        {busy ? (
          <View style={styles.loading} accessibilityLiveRegion="polite">
            {firstPython ? <ActivityIndicator color={colors.primary} /> : <Yatri size={40} mood="focus" bob />}
            <T variant="bodySm" color={colors.ink2} style={{ flex: 1 }}>
              {firstPython ? 'Starting Python for the first time. This downloads about 10 MB once, then runs instantly.' : 'Running your code…'}
            </T>
          </View>
        ) : null}
        {out && !busy ? (
          <Animated.View entering={FadeInDown.duration(240)} accessibilityLiveRegion="polite">
            <ConsoleView output={out.output} error={out.error} />
          </Animated.View>
        ) : null}
      </ScrollView>

      <ActionBar>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            variant={runs ? 'outline' : 'primary'}
            label={busy ? t('running') : runs ? 'Run again' : 'Run code'}
            icon={busy ? undefined : (c) => <Glyph name="play" size={18} color={c} />}
            disabled={busy || !code.trim()}
            onPress={runCode}
            style={{ flex: 1 }}
          />
          <Button variant={runs ? 'primary' : 'outline'} label={t('continue')} onPress={onDone} style={{ flex: 1 }} />
        </View>
      </ActionBar>
    </View>
  );
}

/** A beginner mistake: the wrong code and its error first, then tap to see the fix and why. */
export function MistakeStep({ step, onDone }: { step: Mistake; onDone: () => void }) {
  const t = useT();
  const [fixed, setFixed] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker" color={colors.danger}>
            {step.kicker}
          </T>
          <T variant="title" accessibilityRole="header">
            {step.title}
          </T>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(80).duration(320)} style={{ gap: 8 }}>
          <CodeCard label="A common mistake" lines={step.wrong} lang={step.lang} tone="wrong" />
          {/* Some mistakes don't crash, they just print the wrong thing. */}
          {/Error|too long/.test(step.error) ? <ConsoleView output={[]} error={step.error} /> : <ConsoleView output={[step.error]} />}
        </Animated.View>
        {fixed ? (
          <Animated.View entering={FadeInDown.duration(300)} style={{ gap: 10 }}>
            <CodeCard label="The fix" lines={step.right} lang={step.lang} tone="right" />
            <View style={styles.why}>
              <Animated.View entering={ZoomIn.springify().damping(12)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <Yatri size={44} mood="celebrate" />
              </Animated.View>
              <T variant="bodySm" color={colors.successInk} style={{ flex: 1 }}>
                {step.explain}
              </T>
            </View>
          </Animated.View>
        ) : (
          <View style={styles.think}>
            <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <Yatri size={44} mood="sad" />
            </View>
            <T variant="bodySm" color={colors.ink2} style={{ flex: 1 }}>
              Can you spot what went wrong? Have a think, then see the fix.
            </T>
          </View>
        )}
      </ScrollView>
      <ActionBar>
        {fixed ? (
          <Button label={t('continue')} onPress={onDone} />
        ) : (
          <Button
            variant="saffron"
            label="Show the fix"
            onPress={() => {
              haptic.success();
              setFixed(true);
            }}
          />
        )}
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 16 },
  story: { flexDirection: 'row', gap: 12, alignItems: 'center', borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 14 },
  goal: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', borderRadius: 16, backgroundColor: colors.primarySoft, padding: 14 },
  codeCard: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  codeHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.code.line },
  idea: { flexDirection: 'row', gap: 8, alignItems: 'center', borderRadius: 12, backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: colors.warnLine, paddingHorizontal: 12, paddingVertical: 8 },
  chip: { alignSelf: 'flex-start', minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  loading: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderRadius: 14, backgroundColor: colors.primarySoft },
  think: { flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 12 },
  why: { flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 16, backgroundColor: colors.successSoft, borderWidth: 1, borderColor: '#BFE8CC', padding: 12 },
});
