// Lesson v4 pieces (APP-PLAN Part 3): an answer is a tap, a right answer moves on by itself, the first
// wrong answer shows a hint and the second shows the answer and why. No lives, no Check button.
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSequence, withTiming, ZoomIn } from 'react-native-reanimated';

import { ActionBar, StepHeader } from './Shell';
import { CodeBlock } from '@/components/Code';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { optionOrder, type Ask, type BugStep, type RecallStep as Recall } from '@/content';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

/** How long a right answer stays on screen before the lesson moves on. */
export const AUTO_NEXT_MS = 1300;

type Phase = 'ask' | 'right' | 'hint' | 'shown';

/**
 * One question answered by tapping an option. Calls `onSolved` once: by itself after a right answer,
 * or from Continue after the answer was shown. `onMistake` runs on every wrong tap.
 */
export function AskBlock({ ask, onSolved, onMistake, guess = false, onFeedback }: { ask: Ask; onSolved: () => void; onMistake: () => void; guess?: boolean; onFeedback?: () => void }) {
  const [phase, setPhase] = useState<Phase>('ask');
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const [pick, setPick] = useState<number | null>(null);
  const solved = useRef(false);
  const shake = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  const finish = () => {
    if (solved.current) return;
    solved.current = true;
    onSolved();
  };
  // Bring the hint or answer into view: on a small phone it can appear below the fold.
  useEffect(() => {
    if (phase === 'ask' || !onFeedback) return;
    const t = setTimeout(onFeedback, 120);
    return () => clearTimeout(t);
  }, [phase, onFeedback]);
  useEffect(() => {
    if (phase !== 'right') return;
    const t = setTimeout(finish, AUTO_NEXT_MS);
    return () => clearTimeout(t);
    // finish only reads refs and the latest onSolved; the timer must restart only when the phase changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const answer = (i: number) => {
    if (phase === 'right' || phase === 'shown' || ruledOut.includes(i)) return;
    setPick(i);
    if (i === ask.answer) {
      haptic.success();
      setPhase('right');
      return;
    }
    // A guess before any teaching is never a mistake: it just shows the answer.
    if (guess) {
      haptic.tap();
      setPhase('shown');
      return;
    }
    haptic.error();
    onMistake();
    shake.set(withSequence(withTiming(-7, { duration: 50 }), withTiming(7, { duration: 50 }), withTiming(-4, { duration: 50 }), withTiming(0, { duration: 50 })));
    if (phase === 'ask') {
      setRuledOut((r) => [...r, i]);
      setPhase('hint');
    } else setPhase('shown');
  };

  return (
    <View style={{ gap: 10 }}>
      {ask.prompt ? (
        <T variant="label" style={{ fontSize: 16, lineHeight: 23 }}>
          {ask.prompt}
        </T>
      ) : null}
      {ask.code ? (
        <View style={styles.code}>
          <CodeBlock lines={ask.code} lang="python" />
        </View>
      ) : null}
      <Animated.View style={[{ gap: 8 }, shakeStyle]} accessibilityRole="radiogroup">
        {optionOrder(ask.prompt || ask.options.join('|'), ask.options.length).map((i) => {
          const option = ask.options[i];
          const isRight = (phase === 'right' && pick === i) || (phase === 'shown' && i === ask.answer);
          const isWrong = ruledOut.includes(i) || (phase === 'shown' && pick === i);
          const border = isRight ? colors.success : isWrong ? colors.danger : colors.line;
          const bg = isRight ? colors.successSoft : isWrong ? colors.dangerSoft : colors.surface;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityLabel={`${option}${isRight ? ', correct answer' : isWrong ? ', incorrect' : ''}`}
              accessibilityState={{ checked: pick === i, disabled: isWrong || phase === 'right' || phase === 'shown' }}
              onPress={() => answer(i)}
              style={({ pressed }) => [styles.option, { borderColor: border, backgroundColor: bg, borderWidth: isRight || isWrong ? 2 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
              <T style={[{ flex: 1, color: colors.ink, fontSize: 15 }, ask.mono ? { fontFamily: fonts.mono } : { fontFamily: fonts.bodySemibold }]}>{option}</T>
              {isRight || isWrong ? <Icon name={isRight ? 'check' : 'cross'} size={18} color={isRight ? colors.success : colors.danger} strokeWidth={3} /> : null}
            </Pressable>
          );
        })}
      </Animated.View>
      {phase !== 'ask' ? (
        <Feedback
          phase={phase}
          title={guess && phase === 'shown' ? 'Good guess! Here’s what it does' : undefined}
          text={phase === 'right' ? ask.why : phase === 'hint' ? ask.hint : guess ? `It prints ${ask.options[ask.answer]}. ${ask.why}` : `The answer is ${ask.options[ask.answer]}. ${ask.why} This one comes back in your warm-up.`}
          onContinue={finish}
        />
      ) : null}
    </View>
  );
}

/** The coloured note under an answer. Only the "answer shown" note has a button. */
export function Feedback({ phase, text, title: heading, onContinue }: { phase: Exclude<Phase, 'ask'>; text: string; title?: string; onContinue?: () => void }) {
  const good = phase === 'right';
  const title = heading ?? (good ? 'Right!' : phase === 'hint' ? 'Not quite. Try again.' : 'Here’s the answer');
  return (
    <Animated.View key={phase} entering={FadeInDown.duration(220)} style={[styles.feedback, good ? styles.good : styles.warn]} accessibilityLiveRegion="polite">
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        {phase === 'shown' ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Yatri size={40} mood="focus" />
          </View>
        ) : (
          <Animated.View entering={ZoomIn.springify().damping(12)} style={[styles.dot, { backgroundColor: good ? colors.success : colors.saffron }]}>
            <Icon name={good ? 'check' : 'bulb'} size={16} color="#FFFFFF" strokeWidth={3} />
          </Animated.View>
        )}
        <T variant="heading" color={good ? colors.successInk : colors.saffronInk} style={{ fontSize: 17, flex: 1 }}>
          {title}
        </T>
      </View>
      <T variant="bodySm" color={good ? colors.successInk : colors.saffronInk} style={{ fontSize: 14, lineHeight: 21 }}>
        {text}
      </T>
      {phase === 'shown' && onContinue ? <Button variant="saffron" label="Continue" onPress={onContinue} /> : null}
    </Animated.View>
  );
}

/** Recall: think of the answer, flip the card, then say whether you knew it. Never marked wrong. */
export function RecallStep({ step, onDone }: { step: Recall; onDone: () => void }) {
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = step.cards[card];
  const next = () => {
    haptic.tap();
    if (card + 1 >= step.cards.length) onDone();
    else {
      setCard(card + 1);
      setFlipped(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <StepHeader kicker={step.kicker} title={step.title} instructions="Answer in your head first, then tap the card to check." color={colors.primary} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={flipped ? `Answer: ${c.a}` : `Question: ${c.q}. Tap to see the answer.`}
          disabled={flipped}
          onPress={() => {
            haptic.tap();
            setFlipped(true);
          }}
          style={[styles.card, flipped && { borderColor: colors.primary, backgroundColor: colors.primarySoft }]}>
          <T variant="labelSm" color={colors.ink2}>
            {flipped ? `ANSWER · CARD ${card + 1} OF ${step.cards.length}` : `CARD ${card + 1} OF ${step.cards.length}`}
          </T>
          <Animated.View key={`${card}:${flipped}`} entering={FadeIn.duration(220)}>
            <T variant="title" style={{ textAlign: 'center', fontSize: 19, lineHeight: 27 }}>
              {flipped ? c.a : c.q}
            </T>
          </Animated.View>
          <T variant="caption">{flipped ? 'Did you get it?' : 'Tap to flip'}</T>
        </Pressable>
      </ScrollView>
      {flipped ? (
        <ActionBar>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outline" label="Not yet" onPress={next} style={{ flex: 1 }} />
            <Button label="I knew it" onPress={next} style={{ flex: 1 }} />
          </View>
        </ActionBar>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 16 },
  code: { borderRadius: 14, backgroundColor: colors.code.bg, overflow: 'hidden', paddingVertical: 4 },
  option: { minHeight: 54, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10 },
  feedback: { borderRadius: 16, padding: 14, gap: 8, borderWidth: 1 },
  good: { backgroundColor: colors.successSoft, borderColor: '#BFE8CC' },
  warn: { backgroundColor: colors.saffronSoft, borderColor: '#F5D9B0' },
  dot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  err: { borderRadius: 14, backgroundColor: '#2A1420', padding: 12, gap: 4 },
  line: { flexDirection: 'row', gap: 10, paddingHorizontal: 12, paddingVertical: 8, minHeight: 40, alignItems: 'flex-start', borderLeftWidth: 3, borderLeftColor: 'transparent' },
  gutter: { width: 16, fontFamily: fonts.mono, fontSize: 12, color: '#6E69A0', marginTop: 2 },
  mono: { fontFamily: fonts.mono, fontSize: 14, lineHeight: 20, color: '#E6E3FF' },
  card: { minHeight: 220, borderRadius: 20, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.surface, padding: 20, alignItems: 'center', justifyContent: 'center', gap: 12 },
});

/**
 * Spot the bug, v4: the real output or error is shown first, then tapping a line answers. The first wrong line
 * gives a hint; the second shows the buggy line and its fix.
 */
export function BugStepV4({ step, onDone, onMistake }: { step: BugStep; onDone: () => void; onMistake: () => void }) {
  const [phase, setPhase] = useState<Phase>('ask');
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const solved = useRef(false);
  const finish = () => {
    if (solved.current) return;
    solved.current = true;
    onDone();
  };
  useEffect(() => {
    if (phase !== 'right') return;
    const t = setTimeout(finish, AUTO_NEXT_MS + 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  const tap = (i: number) => {
    if (phase === 'right' || phase === 'shown' || ruledOut.includes(i)) return;
    if (i === step.bug) {
      haptic.success();
      setPhase('right');
      return;
    }
    haptic.error();
    onMistake();
    setRuledOut((r) => [...r, i]);
    setPhase(phase === 'ask' ? 'hint' : 'shown');
  };
  const found = phase === 'right' || phase === 'shown';
  const scroller = useRef<ScrollView>(null);
  useEffect(() => {
    if (phase === 'ask') return;
    const t = setTimeout(() => scroller.current?.scrollToEnd({ animated: true }), 120);
    return () => clearTimeout(t);
  }, [phase]);
  return (
    <ScrollView ref={scroller} contentContainerStyle={styles.content}>
      <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.danger} />
      {step.error ? (
        <View style={styles.err}>
          <T variant="labelSm" color="#FCA5A5">
            {/Error\b/.test(step.error) ? 'IT CRASHED WITH' : 'IT PRINTED'}
          </T>
          <T style={{ fontFamily: fonts.mono, fontSize: 13, lineHeight: 19, color: '#FFFFFF' }}>{step.error}</T>
        </View>
      ) : null}
      <View style={[styles.code, { paddingVertical: 6 }]} accessibilityRole="radiogroup">
        {step.lines.map((line, i) => {
          const bad = ruledOut.includes(i);
          const isBug = found && i === step.bug;
          return (
            <Pressable
              key={i}
              accessibilityRole="radio"
              accessibilityLabel={`Line ${i + 1}: ${line.trim() || 'blank'}`}
              accessibilityState={{ disabled: bad || found }}
              onPress={() => tap(i)}
              style={[styles.line, bad && { backgroundColor: '#4A1D2A' }, isBug && { backgroundColor: '#3A2A12', borderLeftColor: colors.saffron }]}>
              <T style={styles.gutter}>{i + 1}</T>
              <View style={{ flex: 1, gap: 4 }}>
                <T style={[styles.mono, isBug && { textDecorationLine: 'line-through', opacity: 0.6 }]}>{line}</T>
                {isBug ? (
                  <Animated.View entering={FadeInDown.duration(220)}>
                    <T style={[styles.mono, { color: '#86EFAC' }]}>{step.fix}</T>
                  </Animated.View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
      {phase !== 'ask' ? (
        <Feedback
          phase={phase}
          text={phase === 'right' ? step.explain : phase === 'hint' ? 'That line is fine. Read the message above: it tells you what went wrong.' : `The bug is on line ${step.bug + 1}. ${step.explain} This one comes back in your warm-up.`}
          onContinue={finish}
        />
      ) : null}
    </ScrollView>
  );
}
