import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { CoinChip } from '@/components/ui/CoinChip';
import { Glyph, Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { OUTFITS, STREAK_FREEZE } from '@/content/shop';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

export default function ShopScreen() {
  const { state, buyOutfit, equipOutfit, buyStreakFreeze } = useProgress();
  const toast = useToast();
  const freezesFull = state.streakFreezes >= STREAK_FREEZE.max;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Shop" subtitle="Earn coins by finishing lessons" right={<CoinChip coins={state.coins} />} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 14, paddingBottom: 32 }}>
        <Animated.View entering={FadeInDown} style={styles.preview}>
          <Animated.View key={state.outfit ?? 'none'} entering={ZoomIn.springify().damping(14)}>
            <Yatri size={110} mood="celebrate" outfit={state.outfit} bob dark />
          </Animated.View>
          <View style={{ flex: 1, gap: 4 }}>
            <T variant="kicker" color="#7BE3D8">
              YATRI IS WEARING
            </T>
            <T variant="title" color="#FFFFFF">
              {OUTFITS.find((o) => o.id === state.outfit)?.name ?? 'Nothing extra'}
            </T>
            {state.outfit ? (
              <Pressable accessibilityRole="button" onPress={() => equipOutfit(null)} style={styles.remove}>
                <T variant="labelSm" color="#C8C3F5">
                  Take it off
                </T>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60)} style={[card, styles.freeze]}>
          <View style={styles.freezeIcon}>
            <Glyph name="flame" size={26} color="#38BDF8" />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="label">Streak freeze</T>
            <T variant="caption" color={colors.ink2}>
              Covers a day you miss. You have {state.streakFreezes} of {STREAK_FREEZE.max}.
            </T>
          </View>
          <Button
            variant={freezesFull ? 'outline' : 'saffron'}
            height={42}
            label={freezesFull ? 'Full' : `${STREAK_FREEZE.price}`}
            disabled={freezesFull || state.coins < STREAK_FREEZE.price}
            accessibilityLabel={`Buy a streak freeze for ${STREAK_FREEZE.price} coins`}
            onPress={() => {
              if (buyStreakFreeze()) {
                haptic.success();
                toast('Streak freeze ready');
              }
            }}
          />
        </Animated.View>

        <T variant="heading" style={{ marginTop: 4 }}>
          Outfits for Yatri
        </T>
        <View style={styles.grid}>
          {OUTFITS.map((o, i) => {
            const owned = state.inventory.includes(o.id);
            const wearing = state.outfit === o.id;
            const affordable = state.coins >= o.price;
            return (
              <Animated.View key={o.id} entering={FadeInDown.delay(100 + i * 60)} style={[card, styles.item, wearing && { borderColor: colors.primary, borderWidth: 2 }]}>
                <View style={styles.itemArt}>
                  <Yatri size={64} outfit={o.id} />
                </View>
                <T variant="label" style={{ textAlign: 'center' }}>
                  {o.name}
                </T>
                <T variant="caption" style={{ textAlign: 'center', minHeight: 32 }}>
                  {o.blurb}
                </T>
                {wearing ? (
                  <View style={styles.wearing}>
                    <Icon name="check" size={14} color={colors.primary} strokeWidth={2.6} />
                    <T variant="labelSm" color={colors.primary}>
                      Wearing
                    </T>
                  </View>
                ) : owned ? (
                  <Button variant="outline" height={40} label="Wear" onPress={() => equipOutfit(o.id)} />
                ) : (
                  <Button
                    variant="saffron"
                    height={40}
                    label={`${o.price} coins`}
                    disabled={!affordable}
                    accessibilityLabel={`Buy ${o.name} for ${o.price} coins`}
                    onPress={() => {
                      if (buyOutfit(o.id, o.price)) {
                        haptic.success();
                        toast(`${o.name} unlocked!`);
                      }
                    }}
                  />
                )}
              </Animated.View>
            );
          })}
        </View>
        <T variant="caption" style={{ textAlign: 'center' }}>
          10 coins per lesson, 5 per practice, +5 for a perfect run.
        </T>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  preview: { borderRadius: 22, backgroundColor: colors.hero, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  remove: { alignSelf: 'flex-start', minHeight: 32, justifyContent: 'center' },
  freeze: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  freezeIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: { width: '48%', flexGrow: 1, padding: 12, gap: 6 },
  itemArt: { height: 92, borderRadius: 14, backgroundColor: colors.surfaceTint, alignItems: 'center', justifyContent: 'center' },
  wearing: { minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 14, backgroundColor: colors.primarySoft },
});
