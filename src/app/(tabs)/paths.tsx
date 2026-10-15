import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/Icon';
import { Bar, Ring } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { findPath, PATHS, pathSummary, type CareerPath } from '@/content/paths';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

const open = (id: string) => router.push({ pathname: '/path/[id]', params: { id } });

export default function PathsScreen() {
  const { state } = useProgress();
  const mine = findPath(state.pathId);
  const mySummary = mine ? pathSummary(mine, state.completed, state.pathMarks) : null;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 14 }}>
        <Animated.View entering={FadeInDown.duration(320)} style={{ gap: 2 }}>
          <T variant="display" accessibilityRole="header">
            Career paths
          </T>
          <T variant="bodySm" color={colors.ink3}>
            Pick a job you want. We’ll show you every stop on the way.
          </T>
        </Animated.View>

        {mine && mySummary ? (
          <Animated.View entering={FadeInDown.delay(40).duration(320)}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Your path: ${mine.title}, ${mySummary.pct}% job-ready${mySummary.next ? `, next stop ${mySummary.next.title}` : ''}`}
              onPress={() => open(mine.id)}
              style={({ pressed }) => [styles.mine, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
              <View style={{ flex: 1, gap: 4 }}>
                <T variant="kicker" color={colors.tealLight}>
                  YOUR PATH
                </T>
                <T variant="title" color="#FFFFFF">
                  {mine.title}
                </T>
                <T variant="bodySm" color="#C8C3F5" numberOfLines={2}>
                  {mySummary.next ? `Next stop: ${mySummary.next.title}` : 'Every stop done. You’re job-ready!'}
                </T>
              </View>
              <View style={styles.ring}>
                <Ring value={mySummary.pct / 100} size={64} stroke={6} color={colors.tealLight} track={colors.heroLine} />
                <View style={styles.ringLabel} pointerEvents="none">
                  <T variant="label" color="#FFFFFF">
                    {mySummary.pct}%
                  </T>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(40).duration(320)} style={styles.hint}>
            <Icon name="route" size={22} color={colors.primary} />
            <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
              Not sure yet? Open any path to explore it. Start one when it feels right; you can switch any time.
            </T>
          </Animated.View>
        )}

        <T variant="kicker" color={colors.ink3} style={{ marginTop: 4 }}>
          ALL PATHS · {PATHS.length}
        </T>
        {PATHS.map((p, i) => (
          <Animated.View key={p.id} entering={FadeInDown.delay(80 + i * 40).duration(320)}>
            <PathCard path={p} following={p.id === state.pathId} pct={pathSummary(p, state.completed, state.pathMarks).pct} />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PathCard({ path, following, pct }: { path: CareerPath; following: boolean; pct: number }) {
  const { stops, inAppPct } = pathSummary(path, {}, {});
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${path.title}. ${path.tagline}. ${path.months}, ${stops} stops${pct ? `, ${pct}% done` : ''}${following ? ', your path' : ''}`}
      onPress={() => open(path.id)}
      style={({ pressed }) => [card, styles.card, following && { borderColor: path.color, borderWidth: 2 }, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <View style={styles.top}>
        <View style={[styles.badge, { backgroundColor: path.soft }]}>
          <Icon d={path.icon} size={24} color={path.color} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="heading">{path.title}</T>
          <T variant="caption" numberOfLines={2}>
            {path.tagline}
          </T>
        </View>
        <Icon name="chevronRight" size={18} color={colors.ink3} />
      </View>
      <View style={styles.meta}>
        <Chip text={path.months} />
        <Chip text={`${stops} stops`} />
        <Chip text={`${inAppPct}% in app`} tint={path.ink} />
        {following ? <Chip text="Your path" tint={colors.success} /> : null}
      </View>
      {pct > 0 ? (
        <View style={{ gap: 4 }}>
          <Bar value={pct / 100} color={path.color} />
          <T variant="caption">{pct}% job-ready</T>
        </View>
      ) : null}
    </Pressable>
  );
}

function Chip({ text, tint }: { text: string; tint?: string }) {
  return (
    <View style={[styles.chip, tint ? { borderColor: tint } : null]}>
      <T variant="labelSm" color={tint ?? colors.ink2} style={{ fontSize: 11 }}>
        {text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  mine: { borderRadius: 22, backgroundColor: colors.hero, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
  ring: { width: 64, height: 64 },
  ringLabel: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, backgroundColor: colors.primarySoft },
  card: { borderRadius: 18, padding: 14, gap: 10 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { minHeight: 26, paddingHorizontal: 9, borderRadius: 13, borderWidth: 1, borderColor: colors.line, justifyContent: 'center' },
});
