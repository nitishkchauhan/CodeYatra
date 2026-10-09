import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { useT } from '@/i18n';
import { sendFeedback, SUPPORT_EMAIL } from '@/lib/feedback';
import { colors } from '@/theme';

const CONFETTI = [
  { left: '20%', top: 26, size: 9, color: colors.saffron, rotate: '20deg', round: false },
  { left: '74%', top: 44, size: 10, color: colors.teal, rotate: '-25deg', round: false },
  { left: '16%', top: 128, size: 7, color: colors.primary, rotate: '0deg', round: true },
  { left: '78%', top: 134, size: 9, color: '#DB2777', rotate: '40deg', round: false },
  { left: '50%', top: 4, size: 6, color: '#2563EB', rotate: '0deg', round: true },
] as const;

export function CompleteView({
  title,
  subtitle,
  xp,
  coins,
  replay = false,
  feedbackAbout,
  accuracy,
  seconds,
  learned,
  streak,
  streakNote,
  onContinue,
  onReplay,
}: {
  title: string;
  subtitle: string;
  xp: number;
  coins: number;
  /** Replays earn practice XP only; the screen says so instead of showing 0 coins without explanation. */
  replay?: boolean;
  /** What a "Something wrong?" email is about, e.g. the lesson id. */
  feedbackAbout?: string;
  accuracy: number;
  seconds: number;
  learned: string[];
  streak: number;
  streakNote: string;
  onContinue: () => void;
  onReplay: () => void;
}) {
  const t = useT();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const stats = [
    { label: 'XP', value: `+${xp}`, ink: colors.primary, bg: colors.surfaceTint, line: '#D9D5F7', glyph: true },
    { label: 'COINS', value: `+${coins}`, ink: colors.saffronInk, bg: colors.warnSoft, line: '#FFD9A3', glyph: false },
    { label: 'ACCURACY', value: `${accuracy}%`, ink: '#166534', bg: '#F1FAF4', line: '#BFE8CC', glyph: false },
    { label: 'TIME', value: time, ink: colors.ink2, bg: colors.bg, line: colors.line, glyph: false },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 24, paddingBottom: 16, gap: 16 }}>
        <View style={styles.hero}>
          <Animated.View entering={ZoomIn.duration(400)} style={styles.halo} />
          {CONFETTI.map((c, i) => (
            <Animated.View
              key={i}
              entering={ZoomIn.delay(200 + i * 70)}
              style={{
                position: 'absolute',
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                borderRadius: c.round ? c.size / 2 : 2,
                backgroundColor: c.color,
                transform: [{ rotate: c.rotate }],
              }}
            />
          ))}
          <Animated.View entering={ZoomIn.delay(120).springify().damping(12)}>
            <Yatri size={124} mood="celebrate" bob />
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(150)} style={{ alignItems: 'center', gap: 2 }}>
          <T variant="display" accessibilityRole="header">
            {title}
          </T>
          <T variant="bodySm" color={colors.ink2}>
            {subtitle}
          </T>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250)} style={{ flexDirection: 'row', gap: 8 }}>
          {stats.map((s, i) => (
            <View key={s.label} style={[styles.stat, { backgroundColor: s.bg, borderColor: s.line }]}>
              <T variant="labelSm" color={s.ink} style={{ fontSize: 10, letterSpacing: 0.4 }}>
                {s.label}
              </T>
              <Animated.View entering={ZoomIn.delay(400 + i * 100)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {s.glyph ? <Glyph name="bolt" size={16} color={colors.primary} /> : null}
                <T variant="heading" style={{ fontSize: 18, lineHeight: 24 }}>{s.value}</T>
              </Animated.View>
            </View>
          ))}
        </Animated.View>

        {replay ? (
          <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }} accessibilityLiveRegion="polite">
            You had already finished this. Replays earn 5 practice XP and no coins.
          </T>
        ) : null}

        <Animated.View entering={FadeInDown.delay(350)} style={styles.learned}>
          <T variant="label" style={{ fontSize: 13 }}>
            What you learned
          </T>
          {learned.map((item) => (
            <View key={item} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="check" size={18} color={colors.success} strokeWidth={2.6} />
              <T variant="bodySm" color={colors.inkBody} style={{ flex: 1, fontSize: 13 }}>
                {item}
              </T>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(450)} style={styles.streak}>
          <Animated.View entering={ZoomIn.delay(700).springify()}>
            <Glyph name="flame" size={30} color={colors.saffron} />
          </Animated.View>
          <View style={{ flex: 1, gap: 2 }}>
            <T variant="label" color="#FFFFFF">
              {streak}-day streak
            </T>
            <T variant="caption" color="#B9B5D9">
              {streakNote}
            </T>
          </View>
        </Animated.View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 + insets.bottom, gap: 6 }}>
        <Button label={t('continue')} onPress={onContinue} />
        <Button variant="ghost" label="Replay this lesson" height={46} onPress={onReplay} />
        {feedbackAbout ? (
          <Pressable
            accessibilityRole="button"
            accessibilityHint="Opens your email app"
            hitSlop={6}
            onPress={async () => {
              if (!(await sendFeedback(feedbackAbout))) toast(`Email us at ${SUPPORT_EMAIL}`);
            }}
            style={{ minHeight: 36, alignItems: 'center', justifyContent: 'center' }}>
            <T variant="caption" color={colors.ink2}>
              Something wrong in this lesson? Tell us
            </T>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 180, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: '#F1EFFE' },
  stat: { flex: 1, borderRadius: 16, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 4, alignItems: 'center', gap: 2 },
  learned: { borderRadius: 18, borderWidth: 1, borderColor: colors.line, padding: 14, gap: 9 },
  streak: { borderRadius: 18, backgroundColor: colors.ink, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
