import { StyleSheet, View } from 'react-native';

import { T } from './Text';
import { colors } from '@/theme';

/** Coin balance pill. */
export function CoinChip({ coins }: { coins: number }) {
  return (
    <View style={styles.chip} accessibilityLabel={`${coins} coins`}>
      <View style={styles.coin}>
        <View style={styles.inner} />
      </View>
      <T variant="label">{coins.toLocaleString('en-IN')}</T>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { minHeight: 40, paddingHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', gap: 6 },
  coin: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#FFC233', borderWidth: 2, borderColor: '#E59A00', alignItems: 'center', justifyContent: 'center' },
  inner: { width: 7, height: 7, borderRadius: 4, borderWidth: 1.5, borderColor: '#E59A00' },
});
