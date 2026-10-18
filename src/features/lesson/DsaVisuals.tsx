// Interactive diagrams for the DSA track. Each one teaches a single idea and explains itself in text.
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { T } from '@/components/ui/Text';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

function Btn({ label, onPress, ghost, disabled }: { label: string; onPress: () => void; ghost?: boolean; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      style={[styles.btn, ghost && styles.ghost, disabled && { opacity: 0.45 }]}>
      <T variant="labelSm" color={ghost ? colors.ink2 : colors.ink}>
        {label}
      </T>
    </Pressable>
  );
}

/** Steps needed by O(1), O(log n), O(n), O(n log n) and O(n²) for a chosen n, drawn as bars. */
export function BigO() {
  const [n, setN] = useState(10);
  const rows = [
    { label: 'O(1)', steps: 1 },
    { label: 'O(log n)', steps: Math.max(1, Math.ceil(Math.log2(n))) },
    { label: 'O(n)', steps: n },
    { label: 'O(n log n)', steps: Math.ceil(n * Math.log2(n)) },
    { label: 'O(n²)', steps: n * n },
  ];
  const max = Math.log10(rows[4].steps + 1);
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {[10, 1000, 1000000].map((v) => (
          <Btn key={v} label={`n = ${v.toLocaleString('en-IN')}`} ghost={n !== v} onPress={() => setN(v)} />
        ))}
      </View>
      <View style={{ gap: 6 }} accessibilityLiveRegion="polite">
        {rows.map((r) => (
          <View key={r.label} style={{ gap: 2 }} accessible accessibilityLabel={`${r.label}: ${r.steps.toLocaleString('en-IN')} steps`}>
            <View style={styles.between}>
              <T style={styles.mono}>{r.label}</T>
              <T style={styles.mono}>{r.steps.toLocaleString('en-IN')} steps</T>
            </View>
            <View style={styles.track}>
              <View style={[styles.bar, { width: `${Math.max(2, (Math.log10(r.steps + 1) / max) * 100)}%`, backgroundColor: r.label === 'O(n²)' ? colors.danger : colors.primary }]} />
            </View>
          </View>
        ))}
      </View>
      <T variant="caption">Bars use a log scale, or O(n²) wouldn’t fit. At n = 10,00,000, O(n²) is a million million steps: hours, not milliseconds.</T>
    </View>
  );
}

const SORTED = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

/** Binary search for a chosen target, one comparison per step, with lo, mid and hi marked. */
export function BinarySearchSteps() {
  const [target, setTarget] = useState(23);
  const [step, setStep] = useState(0);
  const trace: { lo: number; hi: number; mid: number; note: string }[] = [];
  let lo = 0;
  let hi = SORTED.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = SORTED[mid];
    trace.push({ lo, hi, mid, note: v === target ? `${v} is the target: found at index ${mid}.` : v < target ? `${v} < ${target}: drop the left half (lo = mid + 1).` : `${v} > ${target}: drop the right half (hi = mid − 1).` });
    if (v === target) break;
    if (v < target) lo = mid + 1;
    else hi = mid - 1;
  }
  if (trace.at(-1) && SORTED[trace.at(-1)!.mid] !== target) trace.push({ lo: 1, hi: 0, mid: -1, note: `lo passed hi: ${target} is not in the list.` });
  const s = trace[Math.min(step, trace.length - 1)];
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {[23, 2, 91, 50].map((t) => (
          <Btn
            key={t}
            label={`Find ${t}`}
            ghost={target !== t}
            onPress={() => {
              setTarget(t);
              setStep(0);
            }}
          />
        ))}
      </View>
      <View style={styles.cells}>
        {SORTED.map((v, i) => {
          const inRange = i >= s.lo && i <= s.hi;
          return (
            <View key={v} style={[styles.cell, !inRange && { opacity: 0.3 }, i === s.mid && styles.cellMid]}>
              <T style={[styles.mono, i === s.mid && { color: '#FFFFFF' }]}>{v}</T>
              <T variant="labelSm" color={i === s.mid ? '#FFFFFF' : colors.ink3} style={{ fontSize: 9 }}>
                {i === s.lo && i === s.hi ? 'lo hi' : i === s.lo ? 'lo' : i === s.hi ? 'hi' : i}
              </T>
            </View>
          );
        })}
      </View>
      <Animated.View key={`${target}-${step}`} entering={FadeIn.duration(160)}>
        <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
          Step {Math.min(step, trace.length - 1) + 1} of {trace.length}: {s.note}
        </T>
      </Animated.View>
      <Btn label={step >= trace.length - 1 ? 'Start again' : 'Next step'} onPress={() => setStep(step >= trace.length - 1 ? 0 : step + 1)} />
    </View>
  );
}

/** Bubble sort on five numbers, one comparison at a time. */
export function BubbleSortSteps() {
  const frames: { a: number[]; i: number; swapped: boolean; note: string }[] = [];
  const a = [5, 1, 4, 2, 8];
  for (let pass = 0; pass < a.length - 1; pass++) {
    for (let j = 0; j < a.length - 1 - pass; j++) {
      const swap = a[j] > a[j + 1];
      if (swap) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      frames.push({ a: [...a], i: j, swapped: swap, note: `Pass ${pass + 1}: compare positions ${j} and ${j + 1}${swap ? ' and swap them' : ', already in order'}.` });
    }
  }
  const [step, setStep] = useState(-1);
  const f = step < 0 ? { a: [5, 1, 4, 2, 8], i: -1, swapped: false, note: 'Tap Next to compare the first two numbers.' } : frames[step];
  const done = step === frames.length - 1;
  return (
    <View style={styles.wrap}>
      <View style={styles.cells}>
        {f.a.map((v, k) => (
          <Animated.View key={`${step}-${k}`} entering={f.swapped && (k === f.i || k === f.i + 1) ? ZoomIn.duration(200) : undefined} style={[styles.cell, styles.big, (k === f.i || k === f.i + 1) && { borderColor: f.swapped ? colors.saffron : colors.primary, borderWidth: 2 }]}>
            <T style={[styles.mono, { fontSize: 18 }]}>{v}</T>
          </Animated.View>
        ))}
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {done ? `${f.note} Sorted after ${frames.length} comparisons: for n items that is about n²/2.` : f.note}
      </T>
      <Btn label={done ? 'Start again' : 'Next comparison'} onPress={() => setStep(done ? -1 : step + 1)} />
    </View>
  );
}

const PLATES = ['Asha', 'Ravi', 'Kabir', 'Meera', 'Zoya'];

/** One set of items used as a stack (push/pop at the top) or a queue (join the back, leave the front). */
export function StackQueue() {
  const [mode, setMode] = useState<'stack' | 'queue'>('stack');
  const [items, setItems] = useState<string[]>(['Asha', 'Ravi']);
  const [note, setNote] = useState('');
  const next = PLATES.find((p) => !items.includes(p));
  const add = () => {
    if (!next) return;
    setItems([...items, next]);
    setNote(mode === 'stack' ? `push("${next}") puts it on top.` : `${next} joins the back of the line.`);
  };
  const remove = () => {
    if (!items.length) return setNote(mode === 'stack' ? 'pop() on an empty stack is an error.' : 'popleft() on an empty queue is an error.');
    if (mode === 'stack') {
      setNote(`pop() takes "${items.at(-1)}", the last one added.`);
      setItems(items.slice(0, -1));
    } else {
      setNote(`popleft() serves "${items[0]}", the first to arrive.`);
      setItems(items.slice(1));
    }
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Btn label="Stack" ghost={mode !== 'stack'} onPress={() => setMode('stack')} />
        <Btn label="Queue" ghost={mode !== 'queue'} onPress={() => setMode('queue')} />
      </View>
      {mode === 'stack' ? (
        <View style={{ alignItems: 'center', gap: 4, minHeight: 180, justifyContent: 'flex-end' }}>
          {[...items].reverse().map((x, i) => (
            <Animated.View key={x} entering={ZoomIn.duration(180)} style={[styles.plate, i === 0 && { borderColor: colors.saffron, borderWidth: 2 }]}>
              <T style={styles.mono}>{x}</T>
              {i === 0 ? (
                <T variant="labelSm" color={colors.saffronInk} style={{ fontSize: 10 }}>
                  top
                </T>
              ) : null}
            </Animated.View>
          ))}
        </View>
      ) : (
        <View style={[styles.row, { minHeight: 60, alignItems: 'center' }]}>
          <T variant="labelSm" color={colors.ink3}>
            front →
          </T>
          {items.map((x, i) => (
            <Animated.View key={x} entering={ZoomIn.duration(180)} style={[styles.cell, styles.wide, i === 0 && { borderColor: colors.saffron, borderWidth: 2 }]}>
              <T style={[styles.mono, { fontSize: 12 }]}>{x}</T>
            </Animated.View>
          ))}
          <T variant="labelSm" color={colors.ink3}>
            ← back
          </T>
        </View>
      )}
      <View style={styles.row}>
        <Btn label={mode === 'stack' ? 'push' : 'enqueue'} onPress={add} disabled={!next} />
        <Btn label={mode === 'stack' ? 'pop' : 'dequeue'} onPress={remove} />
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {note || (mode === 'stack' ? 'Last in, first out: you only touch the top.' : 'First in, first out: join at the back, leave from the front.')}
      </T>
    </View>
  );
}

/** A linked list you can change: add at the head, add at the end, remove the head. */
export function LinkedListVis() {
  const pool = ['Meera', 'Zoya', 'Dev', 'Isha'];
  const [nodes, setNodes] = useState(['Asha', 'Ravi', 'Kabir']);
  const [note, setNote] = useState('Each box points to the next one. The last points to None.');
  const fresh = pool.find((p) => !nodes.includes(p));
  return (
    <View style={styles.wrap}>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <T variant="labelSm" color={colors.saffronInk}>
          head →
        </T>
        {nodes.map((x) => (
          <View key={x} style={[styles.row, { alignItems: 'center', gap: 4 }]}>
            <Animated.View entering={ZoomIn.duration(180)} style={styles.node}>
              <T style={[styles.mono, { fontSize: 12 }]}>{x}</T>
            </Animated.View>
            <T style={styles.mono}>→</T>
          </View>
        ))}
        <T style={[styles.mono, { color: colors.ink3 }]}>None</T>
      </View>
      <View style={styles.row}>
        <Btn
          label="Add at head (O(1))"
          disabled={!fresh}
          onPress={() => {
            setNodes([fresh!, ...nodes]);
            setNote(`New node "${fresh}" points at the old head, then becomes the head. Nothing else moves.`);
          }}
        />
        <Btn
          label="Add at end (O(n))"
          ghost
          disabled={!fresh}
          onPress={() => {
            setNodes([...nodes, fresh!]);
            setNote(`To add "${fresh}" at the end, walk all ${nodes.length} nodes to find the last one: O(n).`);
          }}
        />
        <Btn
          label="Remove head"
          ghost
          disabled={!nodes.length}
          onPress={() => {
            setNote(`head = head.next: "${nodes[0]}" is skipped and the list starts at "${nodes[1] ?? 'None'}".`);
            setNodes(nodes.slice(1));
          }}
        />
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {note}
      </T>
    </View>
  );
}

const DAYS = [3, 8, 2, 7, 9, 1, 6];

/** A window of 3 sliding along daily bookings: add the new day, drop the old one. */
export function SlidingWindowSteps() {
  const k = 3;
  const [i, setI] = useState(0);
  const total = DAYS.slice(i, i + k).reduce((a, b) => a + b, 0);
  const last = DAYS.length - k;
  const best = Math.max(...Array.from({ length: last + 1 }, (_, s) => DAYS.slice(s, s + k).reduce((a, b) => a + b, 0)));
  return (
    <View style={styles.wrap}>
      <View style={styles.cells}>
        {DAYS.map((v, d) => {
          const inside = d >= i && d < i + k;
          return (
            <View key={d} style={[styles.cell, inside && styles.cellIn, d === i - 1 && { opacity: 0.4 }]}>
              <T style={[styles.mono, inside && { color: '#FFFFFF' }]}>{v}</T>
              <T variant="labelSm" color={inside ? '#FFFFFF' : colors.ink3} style={{ fontSize: 9 }}>
                day {d}
              </T>
            </View>
          );
        })}
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {i === 0
          ? `First window: 3 + 8 + 2 = ${total}. Add it up once.`
          : `Slide: + ${DAYS[i + k - 1]} (new day) − ${DAYS[i - 1]} (old day) = ${total}.${i === last ? ` Best window total: ${best}.` : ''}`}
      </T>
      <Btn label={i === last ? 'Start again' : 'Slide right'} onPress={() => setI(i === last ? 0 : i + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  between: { flexDirection: 'row', justifyContent: 'space-between' },
  mono: { fontFamily: fonts.mono, fontSize: 13, color: colors.ink },
  track: { height: 10, borderRadius: 5, backgroundColor: colors.lineSoft, overflow: 'hidden' },
  bar: { height: 10, borderRadius: 5 },
  cells: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  cell: { minWidth: 34, minHeight: 46, paddingHorizontal: 4, borderRadius: 9, borderWidth: 1.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  cellMid: { backgroundColor: colors.primary, borderColor: colors.primary },
  cellIn: { backgroundColor: colors.primary, borderColor: colors.primary },
  big: { minWidth: 48, minHeight: 52 },
  wide: { minWidth: 56 },
  plate: { width: 160, minHeight: 32, borderRadius: 8, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.primarySoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  node: { minHeight: 36, paddingHorizontal: 8, borderRadius: 8, borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.primarySoft, justifyContent: 'center' },
  btn: { minHeight: 40, paddingHorizontal: 12, borderRadius: 12, justifyContent: 'center', backgroundColor: colors.saffron, boxShadow: `0 2px 0 ${colors.saffronShadow}` },
  ghost: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, boxShadow: 'none' },
});
