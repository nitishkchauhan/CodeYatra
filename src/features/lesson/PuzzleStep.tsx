import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, LinearTransition, ZoomIn } from 'react-native-reanimated';

import { ActionBar } from './Shell';
import { BLOCK_META } from '@/components/Blocks';
import { Board } from '@/components/Board';
import { CodeBlock } from '@/components/Code';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { PuzzleStep as Step } from '@/content';
import {
  addBlock,
  countBlocks,
  cycleRepeat,
  removeBlock,
  runProgram,
  toPython,
  type Block,
  type BlockType,
  type Outcome,
  type RunResult,
} from '@/game/engine';
import { getLevel } from '@/game/levels';
import { useT } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

const STEP_MS = 400;

const RESULT: Record<Outcome, { title: string; body: string; tone: 'ok' | 'warn' | 'bad' }> = {
  ok: { title: 'Solved!', body: '', tone: 'ok' },
  blocked: { title: 'Yatri hit an obstacle', body: 'Look at the block outlined in red. Which way is Yatri facing before it?', tone: 'bad' },
  short: { title: 'Almost there', body: 'Yatri stopped before the flag. Add more steps or check your turns.', tone: 'warn' },
  gems: { title: 'Gems left behind', body: 'You reached the flag. Use Pick gem on every gem tile first.', tone: 'warn' },
  long: { title: 'That ran too long', body: 'Is a Repeat repeating too many times?', tone: 'bad' },
};

const TONE = {
  ok: { bg: colors.successSoft, line: '#BFE8CC', ink: colors.successInk, icon: colors.success, glyph: 'check' as const },
  warn: { bg: colors.warnSoft, line: colors.warnLine, ink: colors.warnInk, icon: colors.saffron, glyph: 'alert' as const },
  bad: { bg: colors.dangerSoft, line: '#F7C7C8', ink: colors.dangerInk, icon: colors.danger, glyph: 'cross' as const },
};

export function PuzzleStep({ step, onDone, onMistake }: { step: Step; onDone: () => void; onMistake: () => void }) {
  const t = useT();
  const level = getLevel(step.levelId);
  const { width } = useWindowDimensions();
  const [program, setProgram] = useState<Block[]>([]);
  const [target, setTarget] = useState<string | null>(null);
  const [run, setRun] = useState<RunResult | null>(null);
  const [frame, setFrame] = useState(0);
  const [running, setRunning] = useState(false);
  const [view, setView] = useState<'blocks' | 'python'>('blocks');

  useEffect(() => {
    if (!running || !run) return;
    const id = setTimeout(() => {
      if (frame < run.frames.length - 1) {
        setFrame(frame + 1);
      } else {
        setRunning(false);
        if (run.outcome === 'ok') haptic.success();
        else {
          haptic.error();
          onMistake();
        }
      }
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [running, run, frame, onMistake]);

  if (!level) return null;

  const current = run ? run.frames[frame] : { cell: level.start.cell, dir: level.start.dir, got: [] as number[], blockId: null };
  const finished = run !== null && !running;
  const solved = finished && run.outcome === 'ok';
  const failId = finished && run.outcome !== 'ok' ? run.failId : null;
  const activeId = running ? current.blockId : null;
  const count = countBlocks(program);

  const edit = (next: Block[]) => {
    if (running) return;
    setProgram(next);
    setRun(null);
    setFrame(0);
  };

  const add = (type: BlockType) => {
    haptic.tap();
    const next = addBlock(program, type, target);
    edit(next);
    if (type === 'repeat') setTarget(next[next.length - 1].id);
  };

  const remove = (id: string) => {
    haptic.tap();
    if (target === id) setTarget(null);
    edit(removeBlock(program, id));
  };

  const start = () => {
    if (!program.length || running) return;
    setTarget(null);
    setRun(runProgram(level, program));
    setFrame(0);
    setRunning(true);
  };

  const reset = () => {
    setRun(null);
    setFrame(0);
    setRunning(false);
  };

  const ring = (id: string, shadow: string) =>
    id === failId
      ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${colors.danger}`
      : id === activeId
        ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${colors.saffron}`
        : `0 2px 0 ${shadow}`;

  const chip = (b: Block, label: string) => {
    const m = BLOCK_META[b.type];
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}. Tap to remove`}
        onPress={() => remove(b.id)}
        style={({ pressed }) => [styles.block, { backgroundColor: m.color, boxShadow: ring(b.id, m.shadow), transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
        <Icon d={m.icon} size={15} color="#FFFFFF" strokeWidth={2.4} />
        <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 13 }}>
          {label}
        </T>
      </Pressable>
    );
  };

  let line = 0;
  const rows = program.map((b) => {
    line++;
    if (b.type !== 'repeat') {
      return (
        <Animated.View key={b.id} entering={FadeInDown.duration(220)} layout={LinearTransition} style={styles.row}>
          <T style={styles.lineNo}>{line}</T>
          <View style={{ flex: 1 }}>{chip(b, BLOCK_META[b.type].label)}</View>
        </Animated.View>
      );
    }
    const headLine = line;
    const isTarget = target === b.id;
    const m = BLOCK_META.repeat;
    return (
      <Animated.View key={b.id} entering={FadeInDown.duration(220)} layout={LinearTransition}>
        <View style={styles.row}>
          <T style={styles.lineNo}>{headLine}</T>
          <View style={[styles.repeatHead, { backgroundColor: m.color, boxShadow: isTarget ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${colors.primary}` : ring(b.id, m.shadow) }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isTarget ? 'Repeat block, adding inside. Tap to stop' : 'Repeat block. Tap to add blocks inside'}
              accessibilityState={{ selected: isTarget }}
              onPress={() => {
                haptic.tap();
                setTarget(isTarget ? null : b.id);
              }}
              style={styles.repeatLabel}>
              <Icon d={m.icon} size={15} color="#FFFFFF" strokeWidth={2.2} />
              <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 13 }}>
                {isTarget ? 'Adding inside' : 'Repeat'}
              </T>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Repeat ${b.times} times. Tap to change`}
              onPress={() => {
                haptic.tap();
                edit(cycleRepeat(program, b.id));
              }}
              hitSlop={6}
              style={styles.times}>
              <T variant="labelSm" color="#9A3412" style={{ fontSize: 13 }}>
                ×{b.times}
              </T>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Remove repeat block" onPress={() => remove(b.id)} hitSlop={8} style={styles.removeRepeat}>
              <Icon name="close" size={14} color="#FFFFFF" strokeWidth={2.6} />
            </Pressable>
          </View>
        </View>
        {(b.body.length ? b.body : [null]).map((inner, i) => {
          if (inner) line++;
          return (
            <View key={inner?.id ?? `empty${i}`} style={[styles.row, { marginTop: 0, alignItems: 'stretch' }]}>
              <T style={[styles.lineNo, { lineHeight: 44 }]}>{inner ? line : ''}</T>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: 10, backgroundColor: m.color }} />
                <View style={{ flex: 1, paddingVertical: 3, paddingLeft: 6 }}>
                  {inner ? (
                    chip(inner, BLOCK_META[inner.type].label)
                  ) : (
                    <View style={styles.emptyInner}>
                      <T variant="labelSm" color="#0F766E">
                        {isTarget ? 'Tap blocks below' : 'Tap Repeat to add inside'}
                      </T>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
        <View style={[styles.row, { marginTop: 0 }]}>
          <View style={{ width: 16 }} />
          <View style={[styles.repeatFoot, { backgroundColor: m.color }]} />
        </View>
      </Animated.View>
    );
  });

  const result = finished ? RESULT[run.outcome] : null;
  const tone = result ? TONE[result.tone] : null;
  const what = level.gems.length ? 'Every gem collected' : 'Reached the flag';
  const okBody =
    count <= level.maxBlocks
      ? `${what} in ${count} blocks. Full marks!`
      : `${what} in ${count} blocks. Try ${level.maxBlocks} or fewer for full marks.`;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.task}>
        <T variant="label" style={{ flex: 1, fontSize: 13 }}>
          {step.task}
        </T>
        {level.gems.length ? (
          <View style={styles.gemChip}>
            <Icon name="gem" size={12} color={colors.teal} strokeWidth={2.4} />
            <T variant="labelSm" color="#0F766E">
              {current.got.length}/{level.gems.length}
            </T>
          </View>
        ) : null}
      </View>

      <View style={{ alignItems: 'center', marginTop: 4 }}>
        <Board
          level={level}
          width={Math.min(width, 420) - 24}
          cell={current.cell}
          dir={current.dir}
          got={current.got}
          mood={running ? 'focus' : finished ? (solved ? 'celebrate' : 'sad') : 'happy'}
          stepMs={STEP_MS}
        />
      </View>

      <View style={styles.workspace}>
        <View style={styles.wsHead}>
          <View style={styles.segment} accessibilityRole="tablist">
            {(['blocks', 'python'] as const).map((v) => (
              <Pressable
                key={v}
                accessibilityRole="tab"
                accessibilityState={{ selected: view === v }}
                onPress={() => setView(v)}
                style={[styles.segmentBtn, view === v && styles.segmentOn]}>
                <T variant="labelSm" color={view === v ? colors.ink : colors.ink2}>
                  {v === 'blocks' ? 'Blocks' : 'Python'}
                </T>
              </Pressable>
            ))}
          </View>
          <View style={{ flex: 1 }} />
          {target ? (
            <Animated.View entering={ZoomIn.duration(180)}>
              <Pressable accessibilityRole="button" onPress={() => setTarget(null)} style={styles.doneChip}>
                <T variant="labelSm" color={colors.primary}>
                  Done adding
                </T>
              </Pressable>
            </Animated.View>
          ) : (
            <T variant="labelSm" color={count > level.maxBlocks ? colors.danger : colors.ink3}>
              {count} / {level.maxBlocks} blocks
            </T>
          )}
        </View>
        {view === 'blocks' ? (
          <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}>
            {program.length === 0 ? (
              <View style={styles.empty}>
                <Icon name="plus" size={24} color="#B4B1C8" />
                <T variant="label" color={colors.ink3}>
                  Tap blocks below to build your program
                </T>
                {level.palette.includes('repeat') ? (
                  <T variant="caption">Tip: tap Repeat first, then add blocks inside it</T>
                ) : null}
              </View>
            ) : (
              rows
            )}
          </ScrollView>
        ) : (
          <ScrollView style={{ backgroundColor: colors.code.bg }}>
            <CodeBlock lines={toPython(program).split('\n')} lang="python" />
            <T variant="caption" color="#8E89C4" style={{ paddingHorizontal: 14, paddingBottom: 12 }}>
              The same program, written in Python.
            </T>
          </ScrollView>
        )}
      </View>

      {result && tone ? (
        <Animated.View entering={FadeIn.duration(200)} style={[styles.result, { backgroundColor: tone.bg, borderColor: tone.line }]} accessibilityLiveRegion="polite">
          <Animated.View entering={ZoomIn.delay(100)} style={[styles.resultIcon, { backgroundColor: tone.icon }]}>
            <Icon name={tone.glyph} size={16} color="#FFFFFF" strokeWidth={2.6} />
          </Animated.View>
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="heading" color={tone.ink}>
              {result.tone === 'ok' && count <= level.maxBlocks ? 'Solved with full marks!' : result.title}
            </T>
            <T variant="bodySm" color={tone.ink}>
              {result.tone === 'ok' ? okBody : result.body}
            </T>
          </View>
          {result.tone !== 'ok' ? (
            <Pressable accessibilityRole="button" onPress={reset} style={[styles.editBtn, { borderColor: tone.line }]}>
              <T variant="labelSm" color={tone.ink}>
                {t('edit')}
              </T>
            </Pressable>
          ) : null}
        </Animated.View>
      ) : (
        <View style={styles.palette}>
          {level.palette.map((type) => {
            const m = BLOCK_META[type];
            return (
              <Pressable
                key={type}
                accessibilityRole="button"
                accessibilityLabel={`Add ${m.label}${target && type !== 'repeat' ? ' inside Repeat' : ''}`}
                disabled={running}
                onPress={() => add(type)}
                style={({ pressed }) => [
                  styles.paletteBtn,
                  { backgroundColor: m.color, boxShadow: pressed ? 'none' : `0 3px 0 ${m.shadow}`, transform: [{ translateY: pressed ? 3 : 0 }] },
                ]}>
                <Icon d={m.icon} size={18} color="#FFFFFF" strokeWidth={2.3} />
                <T variant="labelSm" color="#FFFFFF" style={{ fontSize: 11 }}>
                  {m.short}
                </T>
              </Pressable>
            );
          })}
        </View>
      )}

      <ActionBar>
        {solved ? (
          <Animated.View entering={ZoomIn.duration(220)}>
            <Button variant="success" label={t('continue')} onPress={onDone} />
          </Animated.View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button
              variant="outline"
              accessibilityLabel="Reset Yatri"
              icon={(c) => <Icon name="reset" size={22} color={c} />}
              onPress={reset}
              style={{ width: 58 }}
            />
            <Button
              label={running ? t('running') : finished ? t('runAgain') : t('runCode')}
              icon={(c) => <Glyph name="play" size={18} color={c} />}
              disabled={!program.length || running}
              onPress={start}
              style={{ flex: 1 }}
            />
          </View>
        )}
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    marginHorizontal: 16,
    marginTop: 4,
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  gemChip: { height: 26, paddingHorizontal: 8, borderRadius: 13, backgroundColor: colors.tealSoft, flexDirection: 'row', alignItems: 'center', gap: 4 },
  workspace: { flex: 1, marginHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  wsHead: { height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: colors.lineSoft },
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 10, padding: 3 },
  segmentBtn: { minHeight: 34, paddingHorizontal: 12, borderRadius: 8, justifyContent: 'center' },
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  doneChip: { minHeight: 34, paddingHorizontal: 12, borderRadius: 10, backgroundColor: colors.primarySoft, justifyContent: 'center' },
  empty: { marginTop: 12, minHeight: 110, borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#C9C6D9', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  lineNo: { width: 16, textAlign: 'right', fontFamily: fonts.mono, fontSize: 11, color: '#B4B1C8' },
  block: { height: 38, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10 },
  repeatHead: {
    flex: 1,
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 4,
  },
  repeatLabel: { flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10 },
  times: { minWidth: 36, height: 30, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  removeRepeat: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  emptyInner: { height: 38, borderRadius: 10, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.teal, backgroundColor: '#ECFAF8', alignItems: 'center', justifyContent: 'center' },
  repeatFoot: { flex: 1, height: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10 },
  palette: { flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'center' },
  paletteBtn: { flex: 1, maxWidth: 90, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 3 },
  result: { marginHorizontal: 12, marginVertical: 10, borderRadius: 16, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  resultIcon: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  editBtn: { minHeight: 36, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
});
