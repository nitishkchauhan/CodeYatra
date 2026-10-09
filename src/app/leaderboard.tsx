import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { LearnerSheet, type LeagueLearner } from '@/components/LearnerSheet';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { blockedIds } from '@/lib/moderation';
import { supabase } from '@/lib/supabase';
import { useAccount } from '@/state/account';
import { weekStart, weekXp } from '@/state/model';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

type Row = LeagueLearner;

const MEDAL = ['#F5B301', '#A8B0BD', '#D08A4E'];

/** This week's league table, top 50 by XP, without learners you have blocked. */
async function fetchLeague(today: string): Promise<{ rows: Row[] | null; error: string | null }> {
  if (!supabase) return { rows: null, error: null };
  const [{ data, error }, blocked] = await Promise.all([
    supabase.from('profiles').select('user_id, display_name, week_xp, streak, outfit, avatar_url').eq('week_start', weekStart(today)).order('week_xp', { ascending: false }).limit(50),
    blockedIds(),
  ]);
  if (error) return { rows: null, error: 'Could not load the leaderboard. Pull down to try again.' };
  return { rows: (data as Row[]).filter((r) => !blocked.includes(r.user_id)), error: null };
}

export default function LeaderboardScreen() {
  const { session, enabled } = useAccount();
  const { state, today } = useProgress();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<Row | null>(null);
  const myXp = weekXp(state, today);

  const apply = useCallback((r: { rows: Row[] | null; error: string | null }) => {
    setRows(r.rows);
    setError(r.error);
  }, []);

  useEffect(() => {
    if (!session) return;
    let alive = true;
    fetchLeague(today).then((r) => alive && apply(r));
    return () => {
      alive = false;
    };
  }, [session, today, apply]);

  const refresh = async () => {
    setRefreshing(true);
    apply(await fetchLeague(today));
    setRefreshing(false);
  };

  const me = session?.user.id;
  const myRank = rows ? rows.findIndex((r) => r.user_id === me) + 1 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Weekly league" subtitle="Resets every Monday" />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 14, paddingBottom: 32 }}
        refreshControl={session ? <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} /> : undefined}>
        <Animated.View entering={FadeInDown} style={styles.hero}>
          <View style={{ flex: 1, gap: 4 }}>
            <T variant="kicker" color="#7BE3D8">
              THIS WEEK
            </T>
            <T variant="display" color="#FFFFFF">
              {myXp} XP
            </T>
            <T variant="bodySm" color="#C8C3F5">
              {session ? (myRank ? `You are #${myRank} in the league` : 'Finish a lesson to join the league') : 'Your weekly progress'}
            </T>
          </View>
          <Yatri size={78} mood="celebrate" outfit={state.outfit} dark bob />
        </Animated.View>

        {!session ? (
          <Animated.View entering={FadeInDown.delay(80)} style={[card, { padding: 16, gap: 10 }]}>
            <T variant="heading">{enabled ? 'Sign in to join the league' : 'Leagues are coming soon'}</T>
            <T variant="bodySm" color={colors.ink2}>
              {enabled
                ? 'Compete with other learners each week. Your XP from this phone comes with you.'
                : 'Keep earning XP. It will count when leagues open.'}
            </T>
            {enabled ? <Button label="Sign in" onPress={() => router.push('/account')} /> : null}
          </Animated.View>
        ) : rows === null && !error ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 24 }} />
        ) : error ? (
          <T variant="bodySm" color={colors.danger} style={{ textAlign: 'center' }}>
            {error}
          </T>
        ) : rows && rows.length ? (
          <>
            <View style={styles.podium}>
              {[1, 0, 2].map((i) => {
                const r = rows[i];
                if (!r) return <View key={i} style={{ flex: 1 }} />;
                return (
                  <Animated.View key={r.user_id} entering={ZoomIn.delay(100 + i * 120)} style={[styles.place, { paddingTop: i === 0 ? 0 : 24 }]}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Rank ${i + 1}, ${r.display_name}, ${r.week_xp} XP${r.user_id === me ? ' (you)' : ', open profile'}`}
                      disabled={r.user_id === me}
                      onPress={() => setSelected(r)}
                      style={styles.placeInner}>
                    {r.avatar_url ? (
                      <Avatar uri={r.avatar_url} size={i === 0 ? 64 : 52} ring={MEDAL[i]} />
                    ) : (
                      <Yatri size={i === 0 ? 70 : 56} outfit={r.outfit} mood={i === 0 ? 'celebrate' : 'happy'} />
                    )}
                    <View style={[styles.medal, { backgroundColor: MEDAL[i] }]}>
                      <T variant="labelSm" color="#FFFFFF">
                        {i + 1}
                      </T>
                    </View>
                    <T variant="labelSm" numberOfLines={1} style={{ maxWidth: 96 }}>
                      {r.display_name}
                    </T>
                    <T variant="caption">{r.week_xp} XP</T>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
            <View style={[card, { overflow: 'hidden' }]}>
              {rows.map((r, i) => {
                const mine = r.user_id === me;
                return (
                  <Animated.View key={r.user_id} entering={FadeInDown.delay(Math.min(i, 10) * 40)} style={[i > 0 && styles.divider, mine && { backgroundColor: colors.primarySoft }]}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Rank ${i + 1}, ${r.display_name}${mine ? ' (you)' : ''}, ${r.week_xp} XP${mine ? '' : ', open profile'}`}
                      disabled={mine}
                      onPress={() => setSelected(r)}
                      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.lineSoft }]}>
                    <T variant="label" color={i < 3 ? MEDAL[i] : colors.ink3} style={{ width: 28 }}>
                      {i + 1}
                    </T>
                    <T variant="label" style={{ flex: 1 }} numberOfLines={1}>
                      {r.display_name}
                      {mine ? ' (you)' : ''}
                    </T>
                    {r.streak > 0 ? (
                      <View style={styles.streak}>
                        <Glyph name="flame" size={14} color={colors.saffron} />
                        <T variant="labelSm" color={colors.ink2}>
                          {r.streak}
                        </T>
                      </View>
                    ) : null}
                    <T variant="label" color={colors.primary}>
                      {r.week_xp} XP
                    </T>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
            <T variant="caption" style={{ textAlign: 'center' }}>
              Tap a learner to see their profile, or to report or block them.
            </T>
          </>
        ) : (
          <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
            Nobody has earned XP yet this week. Be the first!
          </T>
        )}
      </ScrollView>
      {selected ? (
        <LearnerSheet key={selected.user_id} learner={selected} onClose={() => setSelected(null)} onBlocked={(id) => setRows((all) => all && all.filter((r) => r.user_id !== id))} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, backgroundColor: colors.hero, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 12 },
  podium: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  place: { flex: 1 },
  placeInner: { alignItems: 'center', gap: 4 },
  medal: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: -10, borderWidth: 2, borderColor: '#FFFFFF' },
  row: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 },
  divider: { borderTopWidth: 1, borderTopColor: colors.lineSoft },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
