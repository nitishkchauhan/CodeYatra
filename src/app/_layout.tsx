import { Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold, Figtree_800ExtraBold } from '@expo-google-fonts/figtree';
import { RobotoMono_400Regular, RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono';
import { Lexend_500Medium, Lexend_600SemiBold, useFonts } from '@expo-google-fonts/lexend';
import { Stack, type ErrorBoundaryProps } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Text';
import { ToastProvider } from '@/components/ui/Toast';
import { reportError } from '@/lib/telemetry';
import { CodeRunnerProvider } from '@/lib/runner';
import { AccountProvider } from '@/state/account';
import { ProgressProvider, useProgress } from '@/state/progress';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

/** Shown instead of a white screen if a screen crashes; the error is reported anonymously. */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    reportError(error, 'screen');
  }, [error]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12, backgroundColor: colors.bg }}>
      <Yatri size={96} mood="sad" />
      <T variant="title" style={{ textAlign: 'center' }}>
        Yatri tripped over a bug
      </T>
      <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
        Your progress is safe. Try again, and if it keeps happening we will fix it soon.
      </T>
      <Button label="Try again" onPress={retry} style={{ alignSelf: 'stretch' }} />
    </View>
  );
}

/** Keeps the splash screen up until fonts and saved progress are ready. */
function Ready({ fontsReady, children }: { fontsReady: boolean; children: ReactNode }) {
  const { hydrated } = useProgress();
  const ready = fontsReady && hydrated;
  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);
  return ready ? children : null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend_500Medium,
    Lexend_600SemiBold,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProgressProvider>
        <Ready fontsReady={loaded || !!error}>
          <AccountProvider>
            <CodeRunnerProvider>
            <ToastProvider>
              <StatusBar style="dark" />
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                {/* Lessons hide the bottom navigation, per the UX rules. */}
                <Stack.Screen name="lesson/[id]" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
                <Stack.Screen name="account" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="shop" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="leaderboard" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="certificate/[stageId]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="playground" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="edit-profile" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="invite" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="classes" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="share-progress" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
              </Stack>
            </ToastProvider>
            </CodeRunnerProvider>
          </AccountProvider>
        </Ready>
      </ProgressProvider>
    </GestureHandlerRootView>
  );
}
