import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Glyph, Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { MOCK_TESTS } from '@/content/mockBank';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

const pct = (score: number, total: number) => Math.round((score / Math.max(1, total)) * 100);

/** Pick a timed test and see past scores. */
export default function MockHub() {
  const { state } = useProgress();
  const results = state.mockResults;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Mock tests" subtitle="Timed practice for placement rounds" close />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 12, paddingBottom: 32 }}>
        <Animated.View entering={FadeInDown.duration(280)} style={styles.hero}>
          <T variant="kicker" color="#FFC56B">
            HOW IT WORKS
          </T>
          <T variant="heading" color="#FFFFFF">
            Answer against the clock, then see your weak topics
          </T>
          <T variant="bodySm" color="#C8C3F5">
            No hints during the test. Questions change every attempt. Each right answer earns 3 XP and a coin.
          </T>
        </Animated.View>

        {MOCK_TESTS.map((t, i) => {
          const past = results.filter((r) => r.kind === t.kind);
          const best = past.length ? Math.max(...past.map((r) => pct(r.score, r.total))) : null;
          return (
            <Animated.View key={t.kind} entering={FadeInDown.delay(60 + i * 40).duration(280)}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${t.title}: ${t.count} questions in ${t.minutes} minutes${best !== null ? `, best ${best} percent` : ''}`}
                onPress={() => {
                  haptic.tap();
                  router.push({ pathname: '/mock/[kind]', params: { kind: t.kind } });
                }}
                style={({ pressed }) => [styles.test, t.kind === 'full' && styles.featured, pressed && { transform: [{ scale: 0.98 }] }]}>
                <View style={[styles.icon, { backgroundColor: t.kind === 'full' ? colors.saffron : colors.primarySoft }]}>
                  <Icon d="M12 8v4l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" size={22} color={t.kind === 'full' ? '#16142B' : colors.primary} strokeWidth={2.2} />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <T variant="label">{t.title}</T>
                  <T variant="caption">
                    {t.count} questions · {t.minutes} min · {t.sub}
                  </T>
                </View>
                {best !== null ? (
                  <View style={[styles.best, { backgroundColor: best >= 70 ? colors.successSoft : colors.saffronSoft }]}>
                    <T variant="labelSm" color={best >= 70 ? '#166534' : colors.saffronInk}>
                      {best}%
                    </T>
                  </View>
                ) : (
                  <Icon name="chevronRight" size={18} color={colors.ink3} />
                )}
              </Pressable>
            </Animated.View>
          );
        })}

        {results.length ? (
          <View style={[card, { padding: 14, gap: 10 }]}>
            <T variant="label">Recent attempts</T>
            {results.slice(0, 6).map((r, i) => {
              const t = MOCK_TESTS.find((m) => m.kind === r.kind);
              const p = pct(r.score, r.total);
              return (
                <View key={i} style={styles.row}>
                  <Glyph name="bolt" size={16} color={p >= 70 ? colors.success : colors.saffron} />
                  <T variant="bodySm" style={{ flex: 1 }} numberOfLines={1}>
                    {t?.title ?? r.kind}
                  </T>
                  <T variant="caption">{r.at}</T>
                  <T variant="labelSm" color={p >= 70 ? colors.success : colors.saffronInk} style={{ width: 64, textAlign: 'right' }}>
                    {r.score}/{r.total}
                  </T>
                </View>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 20, backgroundColor: colors.hero, padding: 16, gap: 6 },
  test: { ...card, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  featured: { borderWidth: 2, borderColor: colors.saffron },
  icon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  best: { height: 28, paddingHorizontal: 10, borderRadius: 14, justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 32 },
});
