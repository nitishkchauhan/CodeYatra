// Interactive diagrams for Python Foundations. Each one teaches a single idea, step by step,
// with its own text so it still makes sense without animation.
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { T } from '@/components/ui/Text';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

type Run = { line: number; vars: Record<string, number>; note: string };

/** Steps through a short program line by line and shows each variable as a labelled box. */
export function VariableBoxes() {
  const code = ['price = 12', 'cups = 40', 'total = price * cups', 'price = 15', 'total = price * cups'];
  const runs: Run[] = [
    { line: 0, vars: { price: 12 }, note: 'A box called price is made and 12 is put in it.' },
    { line: 1, vars: { price: 12, cups: 40 }, note: 'A second box, cups, holds 40.' },
    { line: 2, vars: { price: 12, cups: 40, total: 480 }, note: 'Python reads both boxes, works out 12 × 40 and stores 480 in total.' },
    { line: 3, vars: { price: 15, cups: 40, total: 480 }, note: 'price gets a new value. The old 12 is gone. total does not change by itself.' },
    { line: 4, vars: { price: 15, cups: 40, total: 600 }, note: 'Running the sum again uses the new price: 15 × 40 = 600.' },
  ];
  return <Stepper code={code} runs={runs} />;
}

/** Steps through a function call: the argument goes in, the body runs, the answer comes back. */
export function CallFlow() {
  const code = ['def fare(km):', '    if km <= 10:', '        return 20', '    return 20 + (km - 10) * 2', '', 'cost = fare(25)'];
  const runs: Run[] = [
    { line: 5, vars: {}, note: 'Python reaches fare(25) and jumps into the function.' },
    { line: 0, vars: { km: 25 }, note: 'The argument 25 goes into the parameter km.' },
    { line: 1, vars: { km: 25 }, note: 'Is 25 <= 10? No, so the first return is skipped.' },
    { line: 3, vars: { km: 25 }, note: '20 + (25 - 10) × 2 is 50. return sends 50 back and the function ends.' },
    { line: 5, vars: { cost: 50 }, note: 'Back where it was called: fare(25) is replaced by 50, which is stored in cost. km is gone.' },
  ];
  return <Stepper code={code} runs={runs} />;
}

function Stepper({ code, runs }: { code: string[]; runs: Run[] }) {
  const [step, setStep] = useState(-1);
  const run = runs[step];
  const done = step === runs.length - 1;
  return (
    <View style={styles.wrap}>
      <View style={styles.code}>
        {code.map((line, i) => (
          <View key={i} style={[styles.codeRow, run?.line === i && styles.codeOn]}>
            <T style={styles.num}>{i + 1}</T>
            <T style={styles.codeText}>{line || ' '}</T>
          </View>
        ))}
      </View>
      <View style={styles.boxes} accessibilityLiveRegion="polite">
        {run && Object.keys(run.vars).length ? (
          Object.entries(run.vars).map(([name, value]) => (
            <Animated.View key={`${name}:${value}`} entering={ZoomIn.duration(220)} style={styles.box} accessible accessibilityLabel={`${name} holds ${value}`}>
              <T style={styles.boxValue}>{value}</T>
              <T variant="labelSm" color={colors.primary} style={{ fontSize: 11 }}>
                {name}
              </T>
            </Animated.View>
          ))
        ) : (
          <T variant="caption">{step < 0 ? 'No variables yet' : 'No variables here yet'}</T>
        )}
      </View>
      <Animated.View key={step} entering={FadeIn.duration(200)}>
        <T variant="bodySm" color={colors.inkBody}>
          {run ? run.note : 'Tap Run next line to watch each line work.'}
        </T>
      </Animated.View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            haptic.tap();
            setStep(done ? -1 : step + 1);
          }}
          style={styles.btn}>
          <T variant="labelSm" color={colors.ink}>
            {done ? 'Start again' : step < 0 ? 'Run first line' : 'Run next line'}
          </T>
        </Pressable>
        <T variant="caption" style={{ alignSelf: 'center' }}>
          {step < 0 ? `${runs.length} steps` : `Step ${step + 1} of ${runs.length}`}
        </T>
      </View>
    </View>
  );
}

/** A list as numbered boxes: tap one to see its index from the front and from the back; append grows it. */
export function ListIndex() {
  const start = [4, 1, 0, 6, 2, 1];
  const [items, setItems] = useState(start);
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <View style={styles.wrap}>
      <T style={styles.codeText}>runs = [{items.join(', ')}]</T>
      <View style={styles.cells}>
        {items.map((v, i) => (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Item ${v} at index ${i}, also index ${i - items.length}`}
            onPress={() => {
              haptic.tap();
              setPicked(i);
            }}
            style={[styles.cell, picked === i && styles.cellOn]}>
            <T style={[styles.cellValue, picked === i && { color: '#FFFFFF' }]}>{v}</T>
            <T variant="labelSm" color={picked === i ? '#FFFFFF' : colors.ink3} style={{ fontSize: 10 }}>
              {i}
            </T>
          </Pressable>
        ))}
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {picked === null
          ? 'Tap a box. The small number under it is its index. Counting starts at 0.'
          : `runs[${picked}] is ${items[picked]}. From the back it is runs[${picked - items.length}].`}
      </T>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            haptic.tap();
            setItems([...items, 6]);
            setPicked(items.length);
          }}
          disabled={items.length >= 8}
          style={[styles.btn, items.length >= 8 && { opacity: 0.5 }]}>
          <T variant="labelSm" color={colors.ink}>
            runs.append(6)
          </T>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setItems(start);
            setPicked(null);
          }}
          style={[styles.btn, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, boxShadow: 'none' }]}>
          <T variant="labelSm" color={colors.ink2}>
            Reset
          </T>
        </Pressable>
      </View>
      <T variant="caption">len(runs) is {items.length}, so the last index is {items.length - 1}.</T>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  code: { borderRadius: 12, backgroundColor: colors.code.bg, paddingVertical: 6 },
  codeRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 10, paddingVertical: 2 },
  codeOn: { backgroundColor: '#2A2660' },
  num: { width: 14, fontFamily: fonts.mono, fontSize: 12, color: '#6E6A99', textAlign: 'right' },
  codeText: { fontFamily: fonts.mono, fontSize: 13, color: colors.code.text },
  boxes: { minHeight: 64, flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  box: { minWidth: 64, borderRadius: 12, borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 6, alignItems: 'center' },
  boxValue: { fontFamily: fonts.mono, fontSize: 18, color: colors.ink },
  btn: { minHeight: 40, paddingHorizontal: 14, borderRadius: 12, justifyContent: 'center', backgroundColor: colors.saffron, boxShadow: `0 2px 0 ${colors.saffronShadow}` },
  cells: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cell: { width: 40, minHeight: 52, borderRadius: 10, borderWidth: 1.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', gap: 2 },
  cellOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  cellValue: { fontFamily: fonts.mono, fontSize: 16, color: colors.ink },
});
