import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Share, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { TrackBadge } from '@/components/TrackBadge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findStage } from '@/content';
import { classRoster, createClass, joinClass, leaveClass, myClasses, PLAY_URL, type ClassRow, type RosterRow } from '@/lib/community';
import { haptic } from '@/lib/haptics';
import { useAccount } from '@/state/account';
import { card, colors, fonts } from '@/theme';

function Roster({ cls }: { cls: ClassRow }) {
  const [rows, setRows] = useState<RosterRow[] | null>(null);
  useEffect(() => {
    classRoster(cls.id).then(setRows);
  }, [cls.id]);
  if (rows === null) return <T variant="caption">Loading students…</T>;
  if (!rows.length) return <T variant="caption">No students yet. Share the code {cls.code} with your class.</T>;
  return (
    <View style={{ gap: 2 }}>
      {rows.map((r, i) => {
        const stage = findStage(r.stage_id);
        return (
          <View key={i} style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: colors.lineSoft }]}>
            <Avatar uri={r.avatar_url} size={36} ring={null} />
            <View style={{ flex: 1 }}>
              <T variant="label" numberOfLines={1}>
                {r.display_name}
              </T>
              <T variant="caption">
                {r.lessons_done} lessons · {r.streak}-day streak
              </T>
            </View>
            <TrackBadge stage={stage} size={24} />
            <T variant="labelSm" color={colors.primary} style={{ minWidth: 56, textAlign: 'right' }}>
              {r.week_xp} XP
            </T>
          </View>
        );
      })}
    </View>
  );
}

/** Join a class with a code, or create one as a teacher and follow students' progress. */
export default function ClassesScreen() {
  const toast = useToast();
  const { session } = useAccount();
  const userId = session?.user.id ?? null;
  const [classes, setClasses] = useState<{ teaching: ClassRow[]; joined: ClassRow[] } | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [newName, setNewName] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    if (userId) myClasses(userId).then(setClasses);
  }, [userId]);
  useEffect(load, [load]);

  const join = async () => {
    setBusy(true);
    const name = await joinClass(joinCode);
    setBusy(false);
    if (!name) return toast('No class found with that code');
    haptic.success();
    toast(`You joined ${name}`);
    setJoinCode('');
    load();
  };

  const create = async () => {
    setBusy(true);
    const code = await createClass(newName);
    setBusy(false);
    if (!code) return toast('Could not create the class. Try again.');
    haptic.success();
    setNewName('');
    load();
    Share.share({ message: `Join my class "${newName.trim()}" on CodeYatra. Open Profile → Classes and enter code ${code}.\n${PLAY_URL}` });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Classes" subtitle="Learn with your school or college" close />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
          {!session ? (
            <View style={[card, { padding: 16, gap: 10 }]}>
              <T variant="label">Sign in to join or create a class</T>
              <Button label="Sign in" onPress={() => router.push('/account')} />
            </View>
          ) : (
            <>
              <Animated.View entering={FadeInDown.duration(280)} style={[card, { padding: 16, gap: 10 }]}>
                <T variant="label">Join a class</T>
                <T variant="bodySm" color={colors.ink2}>
                  Enter the 6-letter code your teacher shared.
                </T>
                <TextInput
                  value={joinCode}
                  onChangeText={(v) => setJoinCode(v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
                  placeholder="AB12CD"
                  placeholderTextColor={colors.ink3}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  accessibilityLabel="Class code"
                  style={styles.input}
                />
                <Button label={busy ? 'Joining…' : 'Join class'} disabled={joinCode.length !== 6 || busy} onPress={join} />
              </Animated.View>

              {classes?.joined.length ? (
                <View style={[card, { padding: 16, gap: 8 }]}>
                  <T variant="label">My classes</T>
                  {classes.joined.map((c) => (
                    <View key={c.id} style={styles.row}>
                      <Icon name="practice" size={18} color={colors.primary} />
                      <T variant="bodySm" style={{ flex: 1 }}>
                        {c.name}
                      </T>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Leave ${c.name}`}
                        hitSlop={8}
                        onPress={async () => {
                          if (userId && (await leaveClass(c.id, userId))) {
                            toast(`You left ${c.name}`);
                            load();
                          }
                        }}>
                        <T variant="labelSm" color={colors.danger}>
                          Leave
                        </T>
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : null}

              <Animated.View entering={FadeInDown.delay(80).duration(280)} style={[card, { padding: 16, gap: 10 }]}>
                <T variant="label">Teaching? Create a class</T>
                <T variant="bodySm" color={colors.ink2}>
                  Students join with a code; you see their lessons, streaks and weekly XP. You never see their email.
                </T>
                <TextInput
                  value={newName}
                  onChangeText={setNewName}
                  maxLength={40}
                  placeholder="e.g. Class 11 B · Computer Science"
                  placeholderTextColor={colors.ink3}
                  accessibilityLabel="Class name"
                  style={[styles.input, { fontFamily: fonts.bodySemibold, letterSpacing: 0, fontSize: 16 }]}
                />
                <Button variant="outline" label="Create and share code" disabled={newName.trim().length < 2 || busy} onPress={create} />
              </Animated.View>

              {classes?.teaching.map((c) => (
                <View key={c.id} style={[card, { padding: 16, gap: 10 }]}>
                  <Pressable accessibilityRole="button" accessibilityState={{ expanded: open === c.id }} onPress={() => setOpen(open === c.id ? null : c.id)} style={styles.head}>
                    <View style={{ flex: 1 }}>
                      <T variant="label">{c.name}</T>
                      <T variant="caption">
                        Code <T style={{ fontFamily: fonts.monoMedium, color: colors.primary }}>{c.code}</T>
                      </T>
                    </View>
                    <Icon name="chevronDown" size={18} color={colors.ink3} />
                  </Pressable>
                  {open === c.id ? <Roster cls={c} /> : null}
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { height: 54, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: 14, fontFamily: fonts.mono, fontSize: 18, letterSpacing: 3, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 52 },
  head: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
});
