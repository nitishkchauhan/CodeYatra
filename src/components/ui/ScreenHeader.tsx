import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from './Icon';
import { T } from './Text';
import { colors } from '@/theme';

/** Header for pushed screens: back button, title, optional subtitle and right slot. */
export function ScreenHeader({ title, subtitle, right, close }: { title: string; subtitle?: string; right?: ReactNode; close?: boolean }) {
  return (
    <View style={styles.bar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={close ? 'Close' : 'Back'}
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        hitSlop={6}
        style={styles.back}>
        <Icon name={close ? 'close' : 'back'} size={22} color={colors.ink} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <T variant="heading" accessibilityRole="header" style={{ fontSize: 18, lineHeight: 23 }}>
          {title}
        </T>
        {subtitle ? <T variant="caption">{subtitle}</T> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingRight: 16 },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
