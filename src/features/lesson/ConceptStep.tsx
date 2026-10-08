import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ConceptVisual } from './ConceptVisual';
import { ActionBar } from './Shell';
import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { ConceptStep as Step } from '@/content';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

const ROUND_MS = 700;

export function ConceptStep({ step, onDone }: { step: Step; onDone: () => void }) {
  const t = useT();
  const [tab, setTab] = useState(0);
  const [round, setRound] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const demo = step.demo;
  const rounds = demo?.values.length ?? 0;
  const running = round >= 0 && round < rounds;

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => setRound((r) => r + 1), ROUND_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, round]);

  useEffect(() => () => void Speech.stop(), []);

  const listen = () => {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const done = () => setSpeaking(false);
    Speech.speak(`${step.title}. ${step.body}`, {
      language: 'en-IN',
      rate: 0.95,
      onDone: done,
      onStopped: done,
      onError: done,
    });
  };

  const sample = step.code?.[tab];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker">{step.kicker}</T>
          <T variant="display" accessibilityRole="header">
            {step.title}
          </T>
          <T variant="body" style={{ marginTop: 2 }}>
            {step.body}
          </T>
        </Animated.View>

        {step.visual ? (
          <Animated.View entering={FadeInDown.delay(80).duration(320)}>
            <ConceptVisual kind={step.visual} />
          </Animated.View>
        ) : null}

        {sample ? (
          <Animated.View entering={FadeInDown.delay(160).duration(320)} style={styles.codeCard}>
            <View style={styles.codeHead}>
              <T variant="labelSm" color="#B9B5D9">
                {demo ? 'Watch it run' : 'In real code'}
              </T>
              {step.code && step.code.length > 1 ? (
                <View style={styles.tabs} accessibilityRole="tablist">
                  {step.code.map((c, i) => (
                    <Pressable
                      key={c.label}
                      accessibilityRole="tab"
                      accessibilityState={{ selected: tab === i }}
                      onPress={() => {
                        haptic.tap();
                        setTab(i);
                      }}
                      style={[styles.tab, tab === i && { backgroundColor: '#FFFFFF' }]}>
                      <T variant="labelSm" color={tab === i ? colors.ink : '#B9B5D9'}>
                        {c.label}
                      </T>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
            <CodeBlock lines={sample.lines} lang={sample.lang} highlight={running && demo ? demo.line : null} />
            {demo ? (
              <>
                <View style={styles.demoRow}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Play the loop"
                    onPress={() => {
                      if (running) return;
                      haptic.tap();
                      setRound(0);
                    }}
                    style={({ pressed }) => [styles.play, { transform: [{ translateY: pressed ? 2 : 0 }] }]}>
                    <Glyph name="play" size={14} color={colors.ink} />
                    <T variant="labelSm">{running ? 'Running' : round >= rounds ? 'Replay' : 'Play'}</T>
                  </Pressable>
                  <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                    {demo.values.map((v, i) => {
                      const active = round === i;
                      const done = round > i;
                      return (
                        <View key={i} style={[styles.chip, { backgroundColor: active ? colors.saffron : done ? '#2A2660' : colors.code.bar }]}>
                          <T style={{ fontFamily: fonts.mono, fontSize: 12, color: active ? colors.ink : done ? colors.tealLight : '#8E89C4' }}>
                            i={v}
                          </T>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <T variant="labelSm" color="#B9B5D9" accessibilityLiveRegion="polite" style={{ paddingHorizontal: 14, paddingBottom: 12 }}>
                  {round < 0
                    ? 'Tap Play to watch the loop run round by round'
                    : running
                      ? demo.caption(demo.values[round], round + 1)
                      : demo.done}
                </T>
              </>
            ) : null}
          </Animated.View>
        ) : null}

        {step.tip ? (
          <Animated.View entering={FadeInDown.delay(240).duration(320)} style={styles.tip}>
            <Icon name="bulb" size={22} color={colors.saffronShadow} strokeWidth={1.8} />
            <T variant="bodySm" color={colors.warnInk} style={{ flex: 1 }}>
              {step.tip}
            </T>
          </Animated.View>
        ) : null}
      </ScrollView>

      <ActionBar>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            variant="outline"
            accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read this aloud'}
            icon={() => <Icon name={speaking ? 'close' : 'speaker'} size={22} color={colors.primary} />}
            onPress={listen}
            style={{ width: 58 }}
          />
          <Button label={t('continue')} onPress={onDone} style={{ flex: 1 }} />
        </View>
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 16 },
  codeCard: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  codeHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.code.line,
  },
  tabs: { flexDirection: 'row', gap: 2, backgroundColor: colors.code.bar, borderRadius: 10, padding: 3 },
  tab: { minHeight: 32, paddingHorizontal: 10, borderRadius: 8, justifyContent: 'center' },
  demoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8, borderTopWidth: 1, borderTopColor: colors.code.line },
  play: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.saffron,
    boxShadow: `0 2px 0 ${colors.saffronShadow}`,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chip: { height: 30, paddingHorizontal: 8, borderRadius: 8, justifyContent: 'center' },
  tip: { flexDirection: 'row', gap: 10, borderRadius: 16, backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: colors.warnLine, padding: 12 },
});
