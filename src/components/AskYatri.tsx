import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Yatri } from './Yatri';
import { T } from './ui/Text';
import { askYatri, type AskInput } from '@/lib/askYatri';
import { haptic } from '@/lib/haptics';
import { track } from '@/lib/telemetry';
import { useAccount } from '@/state/account';
import { colors } from '@/theme';

/** "Stuck? Ask Yatri": an AI hint for the learner's current code. Needs an account. */
export function AskYatri({ build }: { build: () => AskInput }) {
  const account = useAccount();
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  if (!account.enabled) return null;

  const ask = async () => {
    if (!account.session) {
      router.push('/account');
      return;
    }
    haptic.tap();
    setBusy(true);
    setError(null);
    const result = await askYatri(build());
    setBusy(false);
    if ('error' in result) setError(result.error);
    else {
      setHint(result.hint);
      setRemaining(result.remaining ?? null);
      track('ask_yatri');
    }
  };

  return (
    <View style={{ gap: 10 }}>
      {hint ? (
        <Animated.View entering={FadeInDown.duration(260)} style={styles.card} accessibilityLiveRegion="polite">
          <View style={styles.avatar}>
            <Yatri size={40} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <T variant="labelSm" color={colors.primary}>
              YATRI SAYS
            </T>
            <T variant="bodySm" style={{ fontSize: 14, lineHeight: 21, color: colors.ink }}>
              {hint}
            </T>
            {remaining !== null ? (
              <T variant="caption" style={{ fontSize: 11 }}>
                {remaining} questions left today
              </T>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
      {error ? (
        <T variant="bodySm" color={colors.dangerInk} style={{ textAlign: 'center' }}>
          {error}
        </T>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={account.session ? 'Ask Yatri for a hint' : 'Sign in to ask Yatri for hints'}
        disabled={busy}
        onPress={ask}
        style={({ pressed }) => [styles.ask, pressed && { transform: [{ scale: 0.98 }] }]}>
        {busy ? <ActivityIndicator size="small" color={colors.primary} /> : <Yatri size={26} />}
        <T variant="label" color={colors.primary}>
          {busy ? 'Yatri is reading your code…' : hint ? 'Ask again' : account.session ? 'Stuck? Ask Yatri for a hint' : 'Sign in to ask Yatri for hints'}
        </T>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ask: { minHeight: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#D9D5F7', borderStyle: 'dashed', backgroundColor: colors.surfaceTint, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12 },
  card: { flexDirection: 'row', gap: 10, borderRadius: 16, backgroundColor: '#F4F2FF', borderWidth: 1, borderColor: '#D9D5F7', padding: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
});
