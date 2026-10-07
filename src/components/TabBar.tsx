import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './ui/Icon';
import { T } from './ui/Text';
import { useT, type StringKey } from '@/i18n';
import { haptic } from '@/lib/haptics';
import { colors } from '@/theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const ITEMS: Record<string, { label: StringKey; icon: IconName }> = {
  index: { label: 'learn', icon: 'learn' },
  practice: { label: 'practice', icon: 'practice' },
  profile: { label: 'profile', icon: 'profile' },
};

/** Material-style bottom bar with a pill behind the active icon. */
export function TabBar({ state, navigation }: TabBarProps) {
  const t = useT();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]} accessibilityRole="tablist">
      {state.routes.map((route, i) => {
        const item = ITEMS[route.name];
        if (!item) return null;
        const focused = state.index === i;
        const color = focused ? colors.primary : '#6E6A88';
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={t(item.label)}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) {
                haptic.tap();
                navigation.navigate(route.name);
              }
            }}
            style={styles.item}>
            <View style={[styles.pill, focused && { backgroundColor: colors.primarySoft }]}>
              <Icon name={item.icon} size={22} color={color} />
            </View>
            <T variant="labelSm" color={color}>
              {t(item.label)}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 8, paddingHorizontal: 10 },
  item: { flex: 1, alignItems: 'center', gap: 4, minHeight: 52 },
  pill: { width: 60, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});
