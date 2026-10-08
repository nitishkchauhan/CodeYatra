import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Text';
import { supabase } from '@/lib/supabase';
import { colors } from '@/theme';

/** Where the email sign-in link lands: swaps the one-time code for a session, then returns to the app. */
export default function AuthCallback() {
  const params = useLocalSearchParams<{ code?: string; error_description?: string }>();
  const [error, setError] = useState<string | null>(params.error_description ?? null);

  useEffect(() => {
    if (!supabase || !params.code || params.error_description) return;
    const client = supabase;
    client.auth.exchangeCodeForSession(params.code).then(async ({ error: e }) => {
      // Google sign-in may already have used this code inside the app; a session means we are done.
      const { data } = await client.auth.getSession();
      if (!e || data.session) router.replace('/');
      else setError('This link has expired or was opened on a different phone. Request a new one from the app.');
    });
  }, [params.code, params.error_description]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, backgroundColor: colors.bg }}>
      {error || !params.code ? (
        <>
          <T variant="heading" style={{ textAlign: 'center' }}>
            Sign-in didn’t finish
          </T>
          <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
            {error ?? 'The link was missing its code. Request a new one from the app.'}
          </T>
          <Button label="Back to the app" onPress={() => router.replace('/account')} />
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.primary} />
          <T variant="bodySm">Signing you in…</T>
        </>
      )}
    </View>
  );
}
