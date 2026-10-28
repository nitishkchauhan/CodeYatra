import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import type { Reading } from '@/content';
import { useT } from '@/i18n';
import { sendFeedback, SUPPORT_EMAIL } from '@/lib/feedback';
import { colors } from '@/theme';

const CONFETTI = [
  { left: '20%', top: 26, size: 9, color: colors.saffron, rotate: '20deg', round: false },
  { left: '74%', top: 44, size: 10, color: colors.primary, rotate: '-25deg', round: false },
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
  assessment,
  next,
  reading,
  notes,
  v4 = false,
  badge,
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
  /** A scored checkpoint: the score, how each module went, and what to revise. */
  assessment?: { score: number; total: number; pass: boolean; passMark: number; rows: { label: string; right: number; asked: number }[]; revise: { id: string; title: string }[]; onRevise: (id: string) => void };
  /** The next lesson on the track, opened straight from here. */
  next?: { title: string; onPress: () => void };
  /** Official docs to go deeper, with the day they were last checked. */
  reading?: Reading[];
  /** "Read more": the module's notes, when it has them. */
  notes?: { minutes: number; onPress: () => void };
  /** Lesson v4: the score is “right first try”, the goals read “You can now”, and footprints walk in. */
  v4?: boolean;
  /** A Module Challenge: the badge earned and its stars (3 = no mistakes, 2 = a few, 1 = passed). */
  badge?: { icon: string; name: string; stars: number };
}) {
  const t = useT();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const stats = [
    { label: 'XP', value: `+${xp}`, ink: colors.primary, bg: colors.surfaceTint, line: '#D9D5F7', glyph: true },
    { label: 'COINS', value: `+${coins}`, ink: colors.saffronInk, bg: colors.warnSoft, line: '#FFD9A3', glyph: false },
    { label: v4 ? 'FIRST TRY' : 'ACCURACY', value: `${accuracy}%`, ink: '#166534', bg: '#F1FAF4', line: '#BFE8CC', glyph: false },
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
          <Animated.View entering={ZoomIn.delay(v4 ? 900 : 120).springify().damping(12)}>
            <Yatri size={124} mood="celebrate" bob={!v4} />
          </Animated.View>
          {v4
            ? [0, 1, 2, 3, 4].map((i) => (
                <Animated.View
                  key={`step${i}`}
                  entering={ZoomIn.delay(120 + i * 140).duration(220)}
                  style={[styles.step, { left: 18 + i * 22, top: 150 - i * 6 + (i % 2 ? -6 : 6) }]}
                />
              ))
            : null}
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

        {badge ? (
          <Animated.View entering={ZoomIn.delay(500).springify().damping(12)} style={styles.badge} accessibilityLabel={`${badge.name} badge earned, ${badge.stars} of 3 stars`}>
            <T style={{ fontSize: 40 }}>{badge.icon}</T>
            <View style={{ flex: 1, gap: 2 }}>
              <T variant="labelSm" color={colors.saffronInk}>
                BADGE EARNED
              </T>
              <T variant="heading" style={{ fontSize: 19 }}>
                {badge.name}
              </T>
              <T style={{ fontSize: 22, letterSpacing: 2 }}>{'★'.repeat(badge.stars) + '☆'.repeat(3 - badge.stars)}</T>
            </View>
          </Animated.View>
        ) : null}

        {replay ? (
          <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }} accessibilityLiveRegion="polite">
            You had already finished this. Replays earn 5 practice XP and no coins.
          </T>
        ) : null}

        {assessment ? (
          <Animated.View entering={FadeInDown.delay(300)} style={[styles.learned, { borderColor: assessment.pass ? '#BFE8CC' : '#FFD9A3', backgroundColor: assessment.pass ? '#F1FAF4' : colors.warnSoft }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <T variant="label" style={{ fontSize: 13 }}>
                {assessment.pass ? 'Passed · section mastered' : `Not yet · ${Math.round(assessment.passMark * 100)}% passes`}
              </T>
              <T variant="heading" color={assessment.pass ? colors.successInk : colors.saffronInk} style={{ fontSize: 18 }}>
                {assessment.score} / {assessment.total}
              </T>
            </View>
            <T variant="caption" color={colors.ink2}>
              Only answers right the first time count.
            </T>
            {assessment.rows.map((r) => (
              <View key={r.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} accessible accessibilityLabel={`${r.label}: ${r.right} of ${r.asked} right`}>
                <Icon name={r.right === r.asked ? 'check' : 'cross'} size={16} color={r.right === r.asked ? colors.success : colors.danger} strokeWidth={2.6} />
                <T variant="bodySm" color={colors.inkBody} style={{ flex: 1, fontSize: 13 }} numberOfLines={1}>
                  {r.label}
                </T>
                <T variant="labelSm" color={colors.ink2}>
                  {r.right}/{r.asked}
                </T>
              </View>
            ))}
            {assessment.revise.length ? (
              <View style={{ gap: 6, marginTop: 4 }}>
                <T variant="labelSm" color={colors.ink2}>
                  REVISE THESE
                </T>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {assessment.revise.map((m) => (
                    <Pressable key={m.id} accessibilityRole="button" accessibilityLabel={`Revise ${m.title}`} onPress={() => assessment.onRevise(m.id)} style={styles.revise}>
                      <T variant="labelSm" color={colors.primary}>
                        {m.title}
                      </T>
                      <Icon name="chevronRight" size={14} color={colors.primary} />
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : null}
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(350)} style={styles.learned}>
          <T variant="label" style={{ fontSize: 13 }}>
            {v4 ? 'You can now' : 'What you learned'}
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

        {notes ? (
          <Animated.View entering={FadeInDown.delay(380)}>
            <Pressable accessibilityRole="button" accessibilityLabel={`Read the module notes, ${notes.minutes} minutes`} onPress={notes.onPress} style={styles.notes}>
              <Icon name="learn" size={22} color={colors.primary} />
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="label">Read the notes</T>
                <T variant="caption">A {notes.minutes}-minute read: worked example, interview questions and a cheat sheet</T>
              </View>
              <Icon name="chevronRight" size={16} color={colors.ink3} />
            </Pressable>
          </Animated.View>
        ) : null}

        {reading?.length ? (
          <Animated.View entering={FadeInDown.delay(400)} style={[styles.learned, { gap: 6 }]}>
            <T variant="label" style={{ fontSize: 13 }}>
              Go deeper (official docs)
            </T>
            {reading.map((r) => (
              <Pressable
                key={r.url}
                accessibilityRole="link"
                accessibilityLabel={`${r.title}${r.version ? `, ${r.version}` : ''}. Opens in your browser`}
                onPress={() => WebBrowser.openBrowserAsync(r.url)}
                style={styles.read}>
                <View style={{ flex: 1 }}>
                  <T variant="labelSm" color={colors.primary}>
                    {r.title}
                  </T>
                  <T variant="caption" style={{ fontSize: 11 }}>
                    {r.version ? `${r.version} · ` : ''}checked {r.reviewed}
                  </T>
                </View>
                <Icon name="external" size={16} color={colors.ink3} />
              </Pressable>
            ))}
          </Animated.View>
        ) : null}

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
        {next ? (
          <>
            <Button label={`Next: ${next.title}`} icon={(c) => <Glyph name="play" size={18} color={c} />} onPress={next.onPress} />
            <Button variant="outline" label={t('continue')} height={46} onPress={onContinue} />
          </>
        ) : (
          <Button label={t('continue')} onPress={onContinue} />
        )}
        <Button variant="ghost" label={assessment ? 'Retake the checkpoint' : 'Replay this lesson'} height={46} onPress={onReplay} />
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
  notes: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, backgroundColor: colors.primarySoft },
  hero: { height: 180, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: '#F1EFFE' },
  stat: { flex: 1, borderRadius: 16, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 4, alignItems: 'center', gap: 2 },
  badge: { flexDirection: 'row', gap: 14, alignItems: 'center', borderRadius: 18, borderWidth: 2, borderColor: colors.saffron, backgroundColor: colors.saffronSoft, padding: 14 },
  step: { position: 'absolute', width: 10, height: 14, borderRadius: 7, backgroundColor: colors.saffron, transform: [{ rotate: '80deg' }] },
  learned: { borderRadius: 18, borderWidth: 1, borderColor: colors.line, padding: 14, gap: 9 },
  read: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 8 },
  revise: { minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, borderRadius: 18, backgroundColor: colors.primarySoft },
  streak: { borderRadius: 18, backgroundColor: colors.ink, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
