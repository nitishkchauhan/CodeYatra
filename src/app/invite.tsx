import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Share, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { INVITE_REWARD, myReferralCode, PLAY_URL, redeemCode, type RedeemResult } from '@/lib/community';
import { haptic } from '@/lib/haptics';
import { track } from '@/lib/telemetry';
import { useAccount } from '@/state/account';
import { useProgress } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

const REDEEM_MESSAGE: Record<RedeemResult, string> = {
  ok: `Code accepted! +${INVITE_REWARD} coins for you and your friend.`,
  own: 'That is your own code. Share it with a friend instead!',
  used: 'You have already used a friend’s code.',
  unknown: 'We could not find that code. Check the letters and try again.',
  error: 'Could not check the code right now. Try again.',
};

export default function InviteScreen() {
  const toast = useToast();
  const { session } = useAccount();
  const { state, grantCoins } = useProgress();
  const [code, setCode] = useState<string | null>(null);
  const [friendCode, setFriendCode] = useState('');
  const [busy, setBusy] = useState(false);
  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (userId) myReferralCode(userId).then(setCode);
  }, [userId]);

  const share = async () => {
    if (!code) return;
    haptic.tap();
    track('invite_share');
    await Share.share({
      message: `I'm learning to code on CodeYatra: HTML, Python, Java, DSA and more, in short daily lessons. Join me with my code ${code} and we both get ${INVITE_REWARD} coins!\n${PLAY_URL}`,
    });
  };

  const redeem = async () => {
    setBusy(true);
    const result = await redeemCode(friendCode);
    setBusy(false);
    toast(REDEEM_MESSAGE[result]);
    if (result === 'ok') {
      haptic.success();
      grantCoins(INVITE_REWARD, { referred: true });
      setFriendCode('');
    } else if (result === 'used') grantCoins(0, { referred: true });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Invite friends" close />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
          <Animated.View entering={FadeInDown.duration(300)} style={styles.hero}>
            <Yatri size={80} mood="celebrate" bob dark />
            <T variant="title" color="#FFFFFF" style={{ textAlign: 'center' }}>
              Learn together, earn together
            </T>
            <T variant="bodySm" color="#C8C3F5" style={{ textAlign: 'center' }}>
              When a friend joins with your code, you both get {INVITE_REWARD} coins. Friends who learn together keep their streaks longer.
            </T>
          </Animated.View>

          {!session ? (
            <View style={[card, { padding: 16, gap: 10 }]}>
              <T variant="label">Sign in to get your invite code</T>
              <T variant="bodySm" color={colors.ink2}>
                Invite codes are linked to your account so rewards reach the right person.
              </T>
              <Button label="Sign in" onPress={() => router.push('/account')} />
            </View>
          ) : (
            <>
              <Animated.View entering={ZoomIn.delay(100)} style={[card, styles.codeCard]}>
                <T variant="kicker" color={colors.ink3}>
                  YOUR CODE
                </T>
                <T style={styles.code} selectable>
                  {code ?? '········'}
                </T>
                <Button label="Share invite" icon={(c) => <Glyph name="star" size={18} color={c} />} disabled={!code} onPress={share} style={{ alignSelf: 'stretch' }} />
                <T variant="caption">
                  {state.referralsCredited} {state.referralsCredited === 1 ? 'friend has' : 'friends have'} joined · {state.referralsCredited * INVITE_REWARD} coins earned
                </T>
              </Animated.View>

              {!state.referred ? (
                <View style={[card, { padding: 16, gap: 10 }]}>
                  <T variant="label">Got a code from a friend?</T>
                  <TextInput
                    value={friendCode}
                    onChangeText={(v) => setFriendCode(v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                    placeholder="CY1A2B3C"
                    placeholderTextColor={colors.ink3}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    accessibilityLabel="Friend's invite code"
                    style={styles.input}
                  />
                  <Button label={busy ? 'Checking…' : `Redeem · +${INVITE_REWARD} coins`} disabled={friendCode.length < 6 || busy} onPress={redeem} />
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, backgroundColor: colors.hero, padding: 20, alignItems: 'center', gap: 8 },
  codeCard: { borderRadius: 20, padding: 18, alignItems: 'center', gap: 10 },
  code: { fontFamily: fonts.monoMedium, fontSize: 32, letterSpacing: 4, color: colors.primary },
  input: { height: 54, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: 14, fontFamily: fonts.mono, fontSize: 18, letterSpacing: 3, color: colors.ink },
});
