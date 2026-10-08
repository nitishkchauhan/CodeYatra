import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { useAccount, type SyncStatus } from '@/state/account';
import { useProgress } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

// Google sign-in needs a Google Cloud OAuth client set up in Supabase first.
const GOOGLE_ENABLED = process.env.EXPO_PUBLIC_GOOGLE_SIGNIN === 'on';

const SYNC_LABEL: Record<SyncStatus, { text: string; color: string }> = {
  off: { text: 'Not syncing', color: colors.ink3 },
  syncing: { text: 'Syncing…', color: colors.primary },
  synced: { text: 'Progress saved to your account', color: colors.success },
  error: { text: 'Could not sync. Will retry when you learn again', color: colors.danger },
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function AccountScreen() {
  const account = useAccount();
  const { state } = useProgress();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<string | null>, onOk?: () => void) => {
    setBusy(true);
    setError(null);
    const err = await fn();
    setBusy(false);
    if (err) setError(err);
    else onOk?.();
  };

  const confirmDelete = () => {
    const doDelete = () =>
      run(account.deleteAccount, () => {
        toast('Account deleted');
        router.back();
      });
    if (Platform.OS === 'web') return void doDelete();
    Alert.alert('Delete your account?', 'Your account and synced progress are removed for good. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: doDelete },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => router.back()} hitSlop={6} style={styles.close}>
          <Icon name="close" size={22} color={colors.ink2} />
        </Pressable>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }} keyboardShouldPersistTaps="handled">
          <Animated.View entering={FadeInDown} style={{ alignItems: 'center', gap: 8 }}>
            <Yatri size={88} mood={account.session ? 'celebrate' : 'happy'} bob />
            <T variant="display" accessibilityRole="header" style={{ textAlign: 'center' }}>
              {account.session ? 'Your account' : 'Save your progress'}
            </T>
            <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
              {account.session
                ? 'Your XP, streak and lessons sync across your phones.'
                : 'Sign in to keep your streak safe, sync across phones, and join the weekly leaderboard.'}
            </T>
          </Animated.View>

          {!account.enabled ? (
            <View style={[card, { padding: 16, gap: 6 }]}>
              <T variant="label">Accounts are coming soon</T>
              <T variant="bodySm" color={colors.ink2}>
                You can keep learning as a guest. Your progress is saved on this phone.
              </T>
            </View>
          ) : account.session ? (
            <Animated.View entering={FadeInDown.delay(80)} style={{ gap: 12 }}>
              <View style={[card, { padding: 16, gap: 10 }]}>
                <Row icon="profile" label="Signed in as" value={account.email ?? 'Google account'} />
                <Row icon="learn" label="Learner name" value={state.name || 'Explorer'} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={[styles.dot, { backgroundColor: SYNC_LABEL[account.sync].color }]} />
                  <T variant="labelSm" color={SYNC_LABEL[account.sync].color}>
                    {SYNC_LABEL[account.sync].text}
                  </T>
                </View>
              </View>
              <Button
                variant="outline"
                label="Sign out"
                onPress={() =>
                  run(
                    async () => (await account.signOut(), null),
                    () => toast('Signed out. Progress stays on this phone'),
                  )
                }
              />
              <Button variant="ghost" label="Delete account" onPress={confirmDelete} disabled={busy} />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(80)} style={{ gap: 12 }}>
              {GOOGLE_ENABLED ? (
                <>
                  <Button
                    variant="outline"
                    label="Continue with Google"
                    icon={() => (
                      <T style={{ fontFamily: fonts.display, fontSize: 18, color: '#4285F4' }} accessibilityElementsHidden>
                        G
                      </T>
                    )}
                    disabled={busy}
                    onPress={() => run(account.signInWithGoogle, () => toast('Signed in'))}
                  />
                  <View style={styles.or}>
                    <View style={styles.rule} />
                    <T variant="caption">or use your email</T>
                    <View style={styles.rule} />
                  </View>
                </>
              ) : null}
              {!sent ? (
                <>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.ink3}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    accessibilityLabel="Email address"
                    style={styles.input}
                  />
                  <Button
                    label={busy ? 'Sending…' : 'Email me a sign-in link'}
                    disabled={!isEmail(email) || busy}
                    onPress={() =>
                      run(
                        () => account.sendCode(email),
                        () => setSent(true),
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <T variant="bodySm" color={colors.ink2}>
                    We emailed <T variant="label">{email.trim()}</T>. Open it on this phone and tap the sign-in link, or type the code from the email. It
                    can take a minute to arrive.
                  </T>
                  <TextInput
                    value={code}
                    onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Code from email"
                    placeholderTextColor={colors.ink3}
                    keyboardType="number-pad"
                    autoComplete="one-time-code"
                    textContentType="oneTimeCode"
                    accessibilityLabel="Login code from email"
                    style={[styles.input, { fontFamily: fonts.mono, fontSize: 22, letterSpacing: 6, textAlign: 'center' }]}
                  />
                  <Button
                    label={busy ? 'Checking…' : 'Sign in'}
                    disabled={code.length < 6 || busy}
                    onPress={() =>
                      run(
                        () => account.verifyCode(email, code),
                        () => toast('Signed in. Syncing your progress'),
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    label="Use a different email"
                    height={44}
                    onPress={() => {
                      setSent(false);
                      setCode('');
                    }}
                  />
                </>
              )}
              <T variant="caption" style={{ textAlign: 'center' }}>
                Your progress on this phone is kept and merged into your account.
              </T>
            </Animated.View>
          )}

          {error ? (
            <View style={styles.error} accessibilityLiveRegion="polite">
              <Icon name="alert" size={18} color={colors.danger} strokeWidth={2.6} />
              <T variant="bodySm" color={colors.dangerInk} style={{ flex: 1 }}>
                {error}
              </T>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Row({ icon, label, value }: { icon: 'profile' | 'learn'; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Icon name={icon} size={20} color={colors.primary} />
      <View style={{ flex: 1 }}>
        <T variant="caption">{label}</T>
        <T variant="label" numberOfLines={1}>
          {value}
        </T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { height: 52, justifyContent: 'center', paddingHorizontal: 16 },
  close: { width: 44, height: 44, marginLeft: -10, alignItems: 'center', justifyContent: 'center' },
  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    color: colors.ink,
  },
  or: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rule: { flex: 1, height: 1, backgroundColor: colors.line },
  dot: { width: 8, height: 8, borderRadius: 4 },
  error: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', borderRadius: 14, backgroundColor: colors.dangerSoft, padding: 12 },
});
