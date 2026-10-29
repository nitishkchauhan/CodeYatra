// Interactive diagrams for the SQL track, using the same sample data the queries run on.
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { T } from '@/components/ui/Text';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

const STAGES = [
  { clause: 'FROM trains', rows: ['Royal · Dublin · 2900', 'Silver Arrow · Boston · 1200', 'Valley Express · Vienna · 1750', 'Keystone Express · Dublin · 2100', 'Harbour Royal · Dublin · 3100', 'Coastal Express · Copenhagen · 850'], note: 'Start with every row of the table: 6 trains.' },
  { clause: 'WHERE fare > 1000', rows: ['Royal · Dublin · 2900', 'Silver Arrow · Boston · 1200', 'Valley Express · Vienna · 1750', 'Keystone Express · Dublin · 2100', 'Harbour Royal · Dublin · 3100'], note: 'Rows that fail the condition are dropped. Coastal Express (850) is gone.' },
  { clause: 'GROUP BY to_city', rows: ['Dublin: 3 trains', 'Boston: 1 train', 'Vienna: 1 train'], note: 'Rows with the same destination are put together: 3 groups.' },
  { clause: 'HAVING COUNT(*) > 1', rows: ['Dublin: 3 trains'], note: 'Groups that fail the condition are dropped. Only Dublin has more than one.' },
  { clause: 'SELECT to_city, COUNT(*)', rows: ['Dublin | 3'], note: 'Now the columns are picked and the counts worked out.' },
  { clause: 'ORDER BY … LIMIT …', rows: ['Dublin | 3'], note: 'Finally the result is sorted and cut to size.' },
];

/** Steps a query through the order the database really runs it in, showing the rows at each stage. */
export function SqlOrder() {
  const [step, setStep] = useState(0);
  const s = STAGES[step];
  return (
    <View style={styles.wrap}>
      <View style={styles.clauses}>
        {STAGES.map((x, i) => (
          <Pressable
            key={x.clause}
            accessibilityRole="button"
            accessibilityLabel={`Step ${i + 1}: ${x.clause}`}
            onPress={() => {
              haptic.tap();
              setStep(i);
            }}
            style={[styles.clause, i === step && styles.clauseOn, i < step && styles.clauseDone]}>
            <T style={[styles.mono, { fontSize: 11.5 }, i === step && { color: '#FFFFFF' }]}>
              {i + 1}. {x.clause}
            </T>
          </Pressable>
        ))}
      </View>
      <Animated.View key={step} entering={FadeIn.duration(180)} style={styles.rows} accessibilityLiveRegion="polite">
        <T variant="labelSm" color={colors.ink2}>
          {s.rows.length} {s.rows.length === 1 ? 'row' : 'rows'}
        </T>
        {s.rows.map((r) => (
          <T key={r} style={styles.row}>
            {r}
          </T>
        ))}
        <T variant="bodySm" color={colors.inkBody}>
          {s.note}
        </T>
      </Animated.View>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          haptic.tap();
          setStep(step === STAGES.length - 1 ? 0 : step + 1);
        }}
        style={styles.btn}>
        <T variant="labelSm" color={colors.ink}>
          {step === STAGES.length - 1 ? 'Start again' : 'Next step'}
        </T>
      </Pressable>
    </View>
  );
}

const BOOKINGS = [
  { id: 1, train: 12951, who: 'Ava', seats: 2 },
  { id: 2, train: 22436, who: 'Reed', seats: 1 },
  { id: 3, train: 12951, who: 'Kaden', seats: 3 },
  { id: 4, train: 12627, who: 'Megan', seats: 1 },
  { id: 5, train: 22436, who: 'Ava', seats: 2 },
];
const TRAINS = [
  { id: 12951, name: 'Royal' },
  { id: 12002, name: 'Silver Arrow' },
  { id: 22436, name: 'Valley Express' },
  { id: 12627, name: 'Keystone Express' },
  { id: 12301, name: 'Harbour Royal' },
  { id: 11013, name: 'Coastal Express' },
];

/** Tap a booking to see which train row it joins to, through bookings.train_id = trains.id. */
export function JoinMatch() {
  const [picked, setPicked] = useState<number | null>(null);
  const b = picked === null ? null : BOOKINGS[picked];
  return (
    <View style={styles.wrap}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <T variant="labelSm" color={colors.ink2}>
            bookings
          </T>
          {BOOKINGS.map((x, i) => (
            <Pressable
              key={x.id}
              accessibilityRole="button"
              accessibilityLabel={`Booking ${x.id}, ${x.who}, train ${x.train}`}
              onPress={() => {
                haptic.tap();
                setPicked(i);
              }}
              style={[styles.cell, picked === i && styles.cellOn]}>
              <T style={[styles.mono, { fontSize: 11.5 }, picked === i && { color: '#FFFFFF' }]}>
                {x.who} · {x.train}
              </T>
            </Pressable>
          ))}
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <T variant="labelSm" color={colors.ink2}>
            trains
          </T>
          {TRAINS.map((t) => {
            const hit = b?.train === t.id;
            return (
              <View key={t.id} style={[styles.cell, hit && styles.hit]}>
                <T style={[styles.mono, { fontSize: 11.5 }, hit && { color: colors.successInk }]} numberOfLines={1}>
                  {t.id} · {t.name}
                </T>
              </View>
            );
          })}
        </View>
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {b
          ? `train_id ${b.train} = trains.id ${b.train}, so this booking joins to ${TRAINS.find((t) => t.id === b.train)!.name}. Result row: ${b.who} | ${TRAINS.find((t) => t.id === b.train)!.name} | ${b.seats}`
          : 'Tap a booking. Silver Arrow, Harbour Royal and Coastal Express match no booking, so an inner JOIN leaves them out.'}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  clauses: { gap: 4 },
  clause: { minHeight: 36, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.line },
  clauseOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  clauseDone: { backgroundColor: colors.primarySoft, borderColor: colors.primarySoft },
  mono: { fontFamily: fonts.mono, fontSize: 13, color: colors.ink },
  rows: { borderRadius: 12, backgroundColor: colors.bg, padding: 10, gap: 3, minHeight: 120 },
  row: { fontFamily: fonts.mono, fontSize: 12, color: colors.ink },
  btn: { alignSelf: 'flex-start', minHeight: 40, paddingHorizontal: 14, borderRadius: 12, justifyContent: 'center', backgroundColor: colors.saffron, boxShadow: `0 2px 0 ${colors.saffronShadow}` },
  cell: { minHeight: 36, justifyContent: 'center', paddingHorizontal: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  cellOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  hit: { backgroundColor: colors.successSoft, borderColor: colors.success, borderWidth: 2 },
});
