// Lesson v3 steps: watch a program run line by line, match pairs, sort into groups, and a work scenario.
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ConsoleView } from './EditorStep';
import { ActionBar, StepHeader, VerdictBar } from './Shell';
import { AskBlock } from './V4';
import { CodeBlock } from '@/components/Code';
import { WebPreview } from '@/components/WebPreview';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { optionOrder, type GroupStep as Group, type MatchStep as Match, type PageBuildStep as PageBuild, type ScenarioStep as Scenario, type TraceStep as Trace } from '@/content';
import { changedVars, parseTrace, traceProgram, type Trace as TraceData } from '@/content/trace';
import { traceProgramJs } from '@/content/traceJs';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { useCodeRunner } from '@/lib/runner';
import { buildPage } from '@/lib/web/page';
import { colors, fonts } from '@/theme';

type Props<S> = { step: S; onDone: () => void; onMistake: () => void };

/* ---------- Watch it run ---------- */

export function TraceStep({ step, onDone, onMistake }: Props<Trace>) {
  const t = useT();
  const run = useCodeRunner();
  const [trace, setTrace] = useState<TraceData | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [at, setAt] = useState(0);
  // With stops (Lesson v4) the run plays by itself as soon as the trace is ready.
  const [playing, setPlaying] = useState(!!step.stops?.length);
  const [pick, setPick] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let live = true;
    const program = step.lang === 'javascript' ? traceProgramJs(step.code) : traceProgram(step.code);
    run(step.lang, program).then((r) => {
      if (!live) return;
      const parsed = parseTrace(r.output);
      if (parsed) setTrace(parsed);
      else setFailed(r.error ?? 'Could not run the program.');
    });
    return () => {
      live = false;
    };
  }, [run, step.code, step.lang]);

  const frames = trace?.frames ?? [];
  const last = frames.length - 1;
  const frame = frames[at];
  const done = !!trace && at === last;

  // Lesson v4 stops: the run plays by itself and pauses before each stop's line to ask what happens next.
  const stops = step.stops ?? [];
  const [solved, setSolved] = useState(0);
  const stopAt: number[] = [];
  for (const st of stops) stopAt.push(frames.findIndex((f, i) => f.line === st.line && i > (stopAt.at(-1) ?? -1)));
  const waiting = solved < stops.length && stopAt[solved] === at;
  const stopsDone = stops.length > 0 && solved >= stops.length;
  useEffect(() => {
    if (!stopsDone || !done) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [stopsDone, done, onDone]);

  // Playing stops by itself at the last step, and at a stop that hasn't been answered.
  const isPlaying = playing && at < last && !waiting;
  useEffect(() => {
    if (!isPlaying) return;
    timer.current = setTimeout(() => setAt((a) => a + 1), 900);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isPlaying, at]);

  const changed = frame ? changedVars(frames[at - 1], frame) : [];
  const ask = step.ask;
  const canContinue = failed !== null || (done && (!ask || verdict === true) && (!stops.length || stopsDone));
  const traceScroll = useRef<ScrollView>(null);
  const toEnd = () => traceScroll.current?.scrollToEnd({ animated: true });
  // When the run pauses at a stop, bring its question into view.
  useEffect(() => {
    if (!waiting) return;
    const t = setTimeout(() => traceScroll.current?.scrollToEnd({ animated: true }), 250);
    return () => clearTimeout(t);
  }, [waiting]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={traceScroll} contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.primary} />
        </Animated.View>
        <View style={styles.codeCard}>
          <View style={styles.codeHead}>
            <T variant="labelSm" color="#B9B5D9">
              {frame ? (frame.line ? `Step ${at + 1} of ${frames.length} · line ${frame.line} runs next` : 'Finished') : 'Watch it run'}
            </T>
            {frame?.stack.length ? (
              <T variant="labelSm" color={colors.saffron}>
                inside {frame.stack.at(-1)}()
              </T>
            ) : null}
          </View>
          <CodeBlock lines={step.code} lang={step.lang} highlight={frame && frame.line ? frame.line - 1 : null} />
        </View>

        {!trace && !failed ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
            <T variant="bodySm" color={colors.ink2} style={{ flex: 1 }}>
              {step.lang === 'python' ? 'Running the program (the first time Python starts, it downloads about 10 MB once).' : 'Running the program…'}
            </T>
          </View>
        ) : null}
        {failed ? <ConsoleView output={[]} error={failed} /> : null}

        {frame ? (
          <>
            <View style={styles.varsCard} accessibilityLiveRegion="polite">
              <T variant="labelSm" color={colors.ink2}>
                VARIABLES{frame.stack.length ? ` IN ${frame.stack.at(-1)}()` : ''}
              </T>
              <View style={styles.vars}>
                {Object.entries(frame.vars).map(([k, v]) => {
                  const hot = changed.includes(k);
                  return (
                    <View key={k} style={{ alignItems: 'center', gap: 2 }}>
                      <T style={styles.varName}>{k}</T>
                      <View style={[styles.varBox, hot && styles.varHot]}>
                        <Animated.View key={`${k}=${v}`} entering={hot ? ZoomIn.duration(240) : undefined}>
                          <T style={styles.varValue}>{v}</T>
                        </Animated.View>
                      </View>
                    </View>
                  );
                })}
                {!Object.keys(frame.vars).length ? (
                  <T variant="bodySm" color={colors.ink3}>
                    none yet
                  </T>
                ) : null}
              </View>
            </View>
            <ConsoleView output={frame.out ? frame.out.replace(/\n$/, '').split('\n') : []} error={done ? trace?.error : undefined} />
            <View style={styles.controls}>
              <Pressable accessibilityRole="button" accessibilityLabel="Back one step" disabled={at === 0} onPress={() => { haptic.tap(); setPlaying(false); setAt((a) => Math.max(0, a - 1)); }} style={[styles.ctrl, at === 0 && { opacity: 0.4 }]}>
                <Icon name="back" size={18} color={colors.ink} />
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={isPlaying ? 'Pause' : done ? 'Replay' : 'Play'} onPress={() => { haptic.tap(); if (done) setAt(0); setPlaying(!isPlaying || done); }} style={[styles.ctrl, styles.ctrlMain]}>
                <Glyph name="play" size={16} color="#FFFFFF" />
                <T variant="labelSm" color="#FFFFFF">
                  {isPlaying ? 'Pause' : done ? 'Replay' : 'Play'}
                </T>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel="Next step" disabled={done || waiting} onPress={() => { haptic.tap(); setPlaying(false); setAt((a) => Math.min(last, a + 1)); }} style={[styles.ctrl, (done || waiting) && { opacity: 0.4 }]}>
                <View style={{ transform: [{ rotate: '180deg' }] }}>
                  <Icon name="back" size={18} color={colors.ink} />
                </View>
              </Pressable>
            </View>
          </>
        ) : null}

        {waiting ? (
          <Animated.View key={solved} entering={FadeInDown.duration(260)} style={styles.stop}>
            <T variant="labelSm" color={colors.saffronInk}>
              PAUSED · LINE {stops[solved].line} RUNS NEXT
            </T>
            <AskBlock
              ask={stops[solved]}
              onMistake={onMistake}
              onFeedback={toEnd}
              onSolved={() => {
                setSolved((n) => n + 1);
                setPlaying(true);
                setAt((a) => Math.min(last, a + 1));
              }}
            />
          </Animated.View>
        ) : null}
        {ask && done ? (
          <Animated.View entering={FadeInDown.duration(260)} style={{ gap: 8 }} accessibilityRole="radiogroup">
            <T variant="label">{ask.prompt}</T>
            {ask.options.map((o, i) => {
              const selected = pick === i;
              const out = ruledOut.includes(i);
              return (
                <Pressable
                  key={o}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected, disabled: out || verdict !== null }}
                  disabled={out || verdict !== null}
                  onPress={() => {
                    haptic.tap();
                    setPick(i);
                  }}
                  style={[styles.option, selected && { borderColor: colors.primary, borderWidth: 2 }, out && { opacity: 0.4 }]}>
                  <T style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}>{o}</T>
                </Pressable>
              );
            })}
          </Animated.View>
        ) : null}
      </ScrollView>
      {ask && done && verdict !== null ? (
        <VerdictBar
          right={verdict}
          message={verdict ? ask.explain : 'Step back through it and watch that variable change.'}
          onContinue={onDone}
          onRetry={() => {
            if (pick !== null) setRuledOut((r) => [...r, pick]);
            setPick(null);
            setVerdict(null);
          }}
        />
      ) : (
        <ActionBar>
          {ask && done ? (
            <Button
              label="Check"
              disabled={pick === null}
              onPress={() => {
                const ok = pick === ask.answer;
                setVerdict(ok);
                if (ok) haptic.success();
                else {
                  haptic.error();
                  onMistake();
                }
              }}
            />
          ) : (
            <Button label={canContinue ? t('continue') : stops.length ? 'Answer the questions as it runs' : 'Step to the end to continue'} disabled={!canContinue} onPress={onDone} />
          )}
        </ActionBar>
      )}
    </View>
  );
}

/* ---------- Match the pairs ---------- */

export function MatchStep({ step, onDone, onMistake }: Props<Match>) {
  const t = useT();
  const rightOrder = optionOrder(step.title + step.pairs.map((p) => p[1]).join('|'), step.pairs.length);
  const [left, setLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [miss, setMiss] = useState<number | null>(null);
  const done = matched.length === step.pairs.length;

  const tapRight = (i: number) => {
    if (left === null || matched.includes(i)) return;
    if (i === left) {
      haptic.success();
      setMatched((m) => [...m, i]);
      setLeft(null);
    } else {
      haptic.error();
      onMistake();
      setMiss(i);
      setTimeout(() => setMiss(null), 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.primary} />
        </Animated.View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, gap: 8 }}>
            {step.pairs.map(([l], i) => {
              const ok = matched.includes(i);
              return (
                <Pressable
                  key={l}
                  accessibilityRole="button"
                  accessibilityState={{ selected: left === i, disabled: ok }}
                  accessibilityLabel={`${l}${ok ? ', matched' : ''}`}
                  disabled={ok}
                  onPress={() => {
                    haptic.tap();
                    setLeft(i);
                  }}
                  style={[styles.matchCard, left === i && styles.matchOn, ok && styles.matchOk]}>
                  <T style={[styles.matchText, step.mono && { fontFamily: fonts.mono }]}>{l}</T>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            {rightOrder.map((i) => {
              const ok = matched.includes(i);
              return (
                <Pressable
                  key={step.pairs[i][1]}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: ok }}
                  accessibilityLabel={`${step.pairs[i][1]}${ok ? ', matched' : ''}`}
                  disabled={ok || left === null}
                  onPress={() => tapRight(i)}
                  style={[styles.matchCard, ok && styles.matchOk, miss === i && styles.matchMiss, left === null && !ok && { opacity: 0.75 }]}>
                  <T style={styles.matchText}>{step.pairs[i][1]}</T>
                </Pressable>
              );
            })}
          </View>
        </View>
        <T variant="caption" color={colors.ink3}>
          {done ? 'All matched.' : left === null ? 'Tap an item on the left first.' : 'Now tap what it goes with.'}
        </T>
        {done ? (
          <Animated.View entering={FadeIn} style={styles.why}>
            <Yatri size={40} mood="celebrate" />
            <T variant="bodySm" color={colors.successInk} style={{ flex: 1 }}>
              {step.explain}
            </T>
          </Animated.View>
        ) : null}
      </ScrollView>
      <ActionBar tone={done ? 'success' : undefined}>
        <Button variant={done ? 'success' : 'primary'} label={done ? t('continue') : `${matched.length} of ${step.pairs.length} matched`} disabled={!done} onPress={onDone} />
      </ActionBar>
    </View>
  );
}

/* ---------- Sort into groups ---------- */

export function GroupStep({ step, onDone, onMistake }: Props<Group>) {
  const t = useT();
  const order = optionOrder(step.title + step.items.map((x) => x.text).join('|'), step.items.length);
  const [placed, setPlaced] = useState<number[]>([]);
  const [wrongGroup, setWrongGroup] = useState<number | null>(null);
  const next = order.find((i) => !placed.includes(i));
  const done = next === undefined;

  const put = (g: number) => {
    if (next === undefined) return;
    if (step.items[next].group === g) {
      haptic.success();
      setPlaced((p) => [...p, next]);
    } else {
      haptic.error();
      onMistake();
      setWrongGroup(g);
      setTimeout(() => setWrongGroup(null), 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.primary} />
        </Animated.View>
        {next !== undefined ? (
          <Animated.View key={next} entering={ZoomIn.duration(220)} style={styles.groupItem}>
            <T variant="labelSm" color={colors.ink3}>
              {placed.length + 1} of {step.items.length}
            </T>
            <T style={[styles.groupItemText, step.mono && { fontFamily: fonts.mono }]}>{step.items[next].text}</T>
          </Animated.View>
        ) : null}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {step.groups.map((g, gi) => (
            <Pressable
              key={g}
              accessibilityRole="button"
              accessibilityLabel={`Put it in ${g}`}
              disabled={done}
              onPress={() => put(gi)}
              style={[styles.bin, wrongGroup === gi && styles.matchMiss]}>
              <T variant="label" style={{ textAlign: 'center' }}>
                {g}
              </T>
              <View style={{ gap: 4, marginTop: 6 }}>
                {placed
                  .filter((i) => step.items[i].group === gi)
                  .map((i) => (
                    <Animated.View key={i} entering={FadeInDown.duration(200)} style={styles.binItem}>
                      <T style={[styles.binText, step.mono && { fontFamily: fonts.mono }]}>{step.items[i].text}</T>
                    </Animated.View>
                  ))}
              </View>
            </Pressable>
          ))}
        </View>
        {done ? (
          <Animated.View entering={FadeIn} style={styles.why}>
            <Yatri size={40} mood="celebrate" />
            <T variant="bodySm" color={colors.successInk} style={{ flex: 1 }}>
              {step.explain}
            </T>
          </Animated.View>
        ) : null}
      </ScrollView>
      <ActionBar tone={done ? 'success' : undefined}>
        <Button variant={done ? 'success' : 'primary'} label={done ? t('continue') : 'Tap the group it belongs in'} disabled={!done} onPress={onDone} />
      </ActionBar>
    </View>
  );
}

/* ---------- A work scenario ---------- */

const ARTIFACT_TONE = { log: colors.code.console, report: colors.surface, data: colors.surface, diff: colors.code.console, ticket: colors.warnSoft } as const;

export function ScenarioStep({ step, onDone }: { step: Scenario; onDone: () => void }) {
  const initials = step.from.split(/[\s·]+/)[0].slice(0, 1).toUpperCase();
  const art = step.artifact;
  const dark = art && (art.kind === 'log' || art.kind === 'diff');
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 6 }}>
          <T variant="kicker" color={colors.saffronShadow}>
            {step.kicker}
          </T>
          <T variant="title" accessibilityRole="header">
            {step.title}
          </T>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(80).duration(320)} style={styles.msgRow}>
          <View style={styles.avatar}>
            <T variant="label" color="#FFFFFF">
              {initials}
            </T>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <T variant="labelSm" color={colors.ink2}>
              {step.from}
            </T>
            <View style={styles.bubble}>
              <T variant="body">{step.message}</T>
            </View>
          </View>
        </Animated.View>
        {art ? (
          <Animated.View entering={FadeInDown.delay(160).duration(320)} style={[styles.artifact, { backgroundColor: ARTIFACT_TONE[art.kind] }, !dark && { borderWidth: 1, borderColor: colors.line }]}>
            <T variant="labelSm" color={dark ? '#B9B5D9' : colors.ink2}>
              {art.title}
            </T>
            {art.lines.map((l, i) => (
              <T
                key={i}
                style={[
                  styles.artLine,
                  { color: dark ? colors.code.text : colors.ink },
                  art.kind === 'diff' && l.startsWith('+') && { color: '#86EFAC' },
                  art.kind === 'diff' && l.startsWith('-') && { color: '#FCA5A5' },
                  art.kind === 'log' && /error|Error|ERROR|Traceback/.test(l) && { color: '#FCA5A5' },
                ]}>
                {l}
              </T>
            ))}
          </Animated.View>
        ) : null}
        <Animated.View entering={FadeInDown.delay(240).duration(320)} style={styles.task}>
          <Icon name="flag" size={18} color={colors.primary} />
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="labelSm" color={colors.primary}>
              YOUR TASK
            </T>
            <T variant="bodySm" color={colors.ink}>
              {step.task}
            </T>
          </View>
        </Animated.View>
      </ScrollView>
      <ActionBar>
        <Button label="Let's do it" onPress={onDone} />
      </ActionBar>
    </View>
  );
}

/* ---------- See it build (web pages) ---------- */

export function PageBuildStep({ step, onDone }: { step: PageBuild; onDone: () => void }) {
  const t = useT();
  const [at, setAt] = useState(0);
  const cur = step.steps[at];
  const last = at === step.steps.length - 1;
  const code = step.js ?? step.css ?? step.html;
  const doc = step.js
    ? buildPage({ html: step.html.join('\n'), css: step.css?.join('\n'), js: step.js.slice(0, cur.line).join('\n') })
    : step.css
      ? buildPage({ html: step.html.join('\n'), css: step.css.slice(0, cur.line).join('\n') })
      : buildPage({ html: step.html.slice(0, cur.line).join('\n') });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.primary} />
        </Animated.View>
        <View style={styles.codeCard}>
          <View style={styles.codeHead}>
            <T variant="labelSm" color="#B9B5D9">
              Step {at + 1} of {step.steps.length} · line {cur.line}
            </T>
          </View>
          <CodeBlock lines={code} lang={step.js ? 'javascript' : step.css ? 'css' : 'html'} highlight={cur.line - 1} />
        </View>
        <Animated.View key={at} entering={FadeIn.duration(200)} style={styles.note} accessibilityLiveRegion="polite">
          <Icon name="bulb" size={18} color={colors.saffronShadow} />
          <T variant="bodySm" color={colors.ink} style={{ flex: 1 }}>
            {cur.note}
          </T>
        </Animated.View>
        <View style={{ gap: 6 }}>
          <T variant="labelSm" color={colors.ink2}>
            THE PAGE SO FAR
          </T>
          <WebPreview key={doc} doc={doc} height={190} />
        </View>
        <View style={styles.controls}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back one step" disabled={at === 0} onPress={() => { haptic.tap(); setAt(at - 1); }} style={[styles.ctrl, at === 0 && { opacity: 0.4 }]}>
            <Icon name="back" size={18} color={colors.ink} />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Next step" disabled={last} onPress={() => { haptic.tap(); setAt(at + 1); }} style={[styles.ctrl, styles.ctrlMain, last && { opacity: 0.4 }]}>
            <T variant="labelSm" color="#FFFFFF">
              Next line
            </T>
          </Pressable>
        </View>
      </ScrollView>
      <ActionBar>
        <Button label={last ? t('continue') : 'Step to the end to continue'} disabled={!last} onPress={onDone} />
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  stop: { gap: 10, borderRadius: 18, borderWidth: 2, borderColor: colors.saffron, backgroundColor: colors.surface, padding: 14 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 14 },
  codeCard: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  codeHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.code.line },
  loading: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderRadius: 14, backgroundColor: colors.primarySoft },
  varsCard: { borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 12, gap: 8 },
  vars: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  varName: { fontFamily: fonts.monoMedium, fontSize: 11, color: colors.ink2 },
  varBox: { minWidth: 44, minHeight: 36, paddingHorizontal: 8, borderRadius: 10, borderWidth: 2, borderColor: colors.primaryMuted, backgroundColor: colors.surfaceTint, alignItems: 'center', justifyContent: 'center' },
  varHot: { borderColor: colors.saffron, backgroundColor: colors.saffronSoft },
  varValue: { fontFamily: fonts.monoMedium, fontSize: 13, color: colors.ink },
  controls: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  ctrl: { minWidth: 52, height: 46, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, paddingHorizontal: 14 },
  ctrlMain: { backgroundColor: colors.primary, borderColor: colors.primary, minWidth: 120 },
  option: { borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 12 },
  matchCard: { minHeight: 56, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 10, justifyContent: 'center' },
  matchOn: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.surfaceTint },
  matchOk: { borderColor: colors.success, backgroundColor: colors.successSoft },
  matchMiss: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  matchText: { fontFamily: fonts.bodySemibold, fontSize: 14, color: colors.ink },
  groupItem: { alignSelf: 'center', minWidth: 200, alignItems: 'center', gap: 4, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.primary, paddingHorizontal: 18, paddingVertical: 14 },
  groupItemText: { fontFamily: fonts.bodyBold, fontSize: 17, color: colors.ink, textAlign: 'center' },
  bin: { flex: 1, minHeight: 140, borderRadius: 16, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primaryMuted, backgroundColor: colors.surfaceTint, padding: 10 },
  binItem: { borderRadius: 10, backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 6 },
  binText: { fontFamily: fonts.body, fontSize: 12.5, color: colors.ink },
  why: { flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 16, backgroundColor: colors.successSoft, borderWidth: 1, borderColor: '#BFE8CC', padding: 12 },
  msgRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.saffron, alignItems: 'center', justifyContent: 'center' },
  bubble: { borderRadius: 16, borderTopLeftRadius: 4, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 12 },
  artifact: { borderRadius: 14, padding: 12, gap: 3 },
  artLine: { fontFamily: fonts.mono, fontSize: 12.5, lineHeight: 19 },
  note: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', borderRadius: 14, backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: colors.warnLine, padding: 12 },
  task: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', borderRadius: 16, backgroundColor: colors.primarySoft, padding: 14 },
});
