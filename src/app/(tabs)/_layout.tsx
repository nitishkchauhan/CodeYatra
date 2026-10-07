import { Redirect, Tabs } from 'expo-router';

import { TabBar } from '@/components/TabBar';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

export default function TabLayout() {
  const { state } = useProgress();
  if (!state.onboarded) return <Redirect href="/onboarding" />;

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="practice" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
