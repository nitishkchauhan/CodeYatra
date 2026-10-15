import { Redirect, Tabs } from 'expo-router';

import { TabBar } from '@/components/TabBar';
import { useProgress } from '@/state/progress';

export default function TabLayout() {
  const { state } = useProgress();
  if (!state.onboarded) return <Redirect href="/onboarding" />;

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="paths" />
      <Tabs.Screen name="practice" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
