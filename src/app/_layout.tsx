import { Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold, Figtree_800ExtraBold } from '@expo-google-fonts/figtree';
import { JetBrainsMono_400Regular, JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { Lexend_500Medium, Lexend_600SemiBold, useFonts } from '@expo-google-fonts/lexend';
import { NotoSansDevanagari_400Regular, NotoSansDevanagari_600SemiBold } from '@expo-google-fonts/noto-sans-devanagari';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from '@/components/ui/Toast';
import { CodeRunnerProvider } from '@/lib/runner';
import { AccountProvider } from '@/state/account';
import { ProgressProvider, useProgress } from '@/state/progress';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

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
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_600SemiBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
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
              </Stack>
            </ToastProvider>
            </CodeRunnerProvider>
          </AccountProvider>
        </Ready>
      </ProgressProvider>
    </GestureHandlerRootView>
  );
}
