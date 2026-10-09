import { router, type Href } from 'expo-router';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { TrackBadge } from '@/components/TrackBadge';
import { Glyph, Icon } from '@/components/ui/Icon';
import { Bar } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findStage, stageProgress, STAGES } from '@/content';
import { APP_VERSION, sendFeedback, SUPPORT_EMAIL } from '@/lib/feedback';
import { haptic } from '@/lib/haptics';
import { syncReminder } from '@/lib/reminders';
import { useAccount } from '@/state/account';
import { useProgress, type LearnerLevel } from '@/state/progress';
import { countsAsLesson } from '@/state/model';
import { addDays } from '@/state/streak';
import { card, colors } from '@/theme';

const LEVEL_LABEL: Record<LearnerLevel, string> = { school: 'School student', college: 'College student', curious: 'Curious learner' };
const DAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const REMINDER_TIMES = [
  { hour: 7, label: '7 AM' },
  { hour: 17, label: '5 PM' },
  { hour: 19, label: '7 PM' },
  { hour: 21, label: '9 PM' },
];

const SHORTCUTS: { label: string; sub: string; href: Href; icon: string; tint: string; ink: string }[] = [
  { label: 'Shop', sub: 'Outfits, freezes', href: '/shop', icon: 'M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8z M9 8a3 3 0 0 1 6 0', tint: colors.saffronSoft, ink: colors.saffronShadow },
  { label: 'League', sub: 'Weekly ranks', href: '/leaderboard', icon: 'M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0z M7 6H4a3 3 0 0 0 3 4 M17 6h3a3 3 0 0 1-3 4', tint: colors.primarySoft, ink: colors.primary },
  { label: 'Playground', sub: 'Run any code', href: '/playground', icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14', tint: colors.tealSoft, ink: '#0F766E' },
  { label: 'Invite', sub: '+50 coins each', href: '/invite', icon: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1 M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19 8v6 M22 11h-6', tint: '#FCE7F3', ink: '#BE185D' },
  { label: 'Classes', sub: 'Join or teach', href: '/classes', icon: 'M3 9l9-5 9 5-9 5z M7 11v5c3 2 7 2 10 0v-5', tint: '#E0F2FE', ink: '#0369A1' },
  { label: 'Share', sub: 'Your progress', href: '/share-progress', icon: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7 M12 3v13 M7 8l5-5 5 5', tint: colors.successSoft, ink: '#166534' },
];

export default function ProfileScreen() {
  const toast = useToast();
  const { state, streak, today, setHaptics, setTelemetry, setReminder, setStage, reset } = useProgress();
  const account = useAccount();
  const stage = findStage(state.stageId);
  const lessonsDone = Object.keys(state.completed).filter(countsAsLesson).length;

  const week = Array.from({ length: 7 }, (_, i) => {
    const key = addDays(today, i - 6);
    const [y, m, d] = key.split('-').map(Number);
    return { key, label: DAY[new Date(y, m - 1, d).getDay()], xp: state.dailyXp[key] ?? 0, isToday: i === 6 };
  });
  const maxXp = Math.max(30, ...week.map((w) => w.xp));
  const weekTotal = week.reduce((sum, w) => sum + w.xp, 0);

  const updateReminder = async (next: typeof state.reminder) => {
    const ok = await syncReminder(next);
    if (!ok && next.enabled) {
      toast(Platform.OS === 'web' ? 'Reminders work in the Android app' : 'Allow notifications to get reminders');
      setReminder({ ...next, enabled: false });
      return;
    }
    setReminder(next);
    if (next.enabled) toast(`Reminder set for ${REMINDER_TIMES.find((r) => r.hour === next.hour)?.label ?? 'daily'}`);
  };

  const confirmReset = () => {
    if (Platform.OS === 'web') return reset();
    Alert.alert('Reset progress?', 'This clears XP, coins, streak and lessons on this phone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: reset },
    ]);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 12 }}>
        <Animated.View entering={FadeInDown.duration(320)} style={styles.hero}>
          <Pressable accessibilityRole="button" accessibilityLabel="Change profile photo" onPress={() => router.push('/edit-profile')}>
            <Avatar uri={state.avatar ?? state.avatarUrl} color={state.avatarColor} outfit={state.outfit} size={76} />
            <View style={styles.camera}>
              <Icon d="M4 8h3l2-3h6l2 3h3v11H4z M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" size={13} color={colors.ink} strokeWidth={2.2} />
            </View>
          </Pressable>
          <View style={{ flex: 1, gap: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <T variant="title" color="#FFFFFF" numberOfLines={1} style={{ flexShrink: 1 }}>
                {state.name || 'Explorer'}
              </T>
              <TrackBadge stage={stage} size={22} />
            </View>
            <T variant="bodySm" color="#C8C3F5" numberOfLines={2}>
              {state.bio || `${LEVEL_LABEL[state.level]} · learning ${stage.short}`}
            </T>
            <Pressable accessibilityRole="button" onPress={() => router.push('/account')} style={styles.accountChip}>
              <View style={[styles.dot, { backgroundColor: account.session ? colors.tealLight : '#FDBA74' }]} />
              <T variant="labelSm" color="#FFFFFF">
                {account.session ? 'Synced account' : 'Guest · Save progress'}
              </T>
              <Icon name="chevronRight" size={14} color="#C8C3F5" />
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Edit profile" onPress={() => router.push('/edit-profile')} hitSlop={6} style={styles.edit}>
            <Icon d="M4 20h4L19 9l-4-4L4 16z M13.5 6.5l4 4" size={18} color="#FFFFFF" />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).duration(320)} style={{ flexDirection: 'row', gap: 8 }}>
          {[
            { value: state.xp.toLocaleString('en-IN'), label: 'Total XP', glyph: 'bolt' as const, color: colors.primary },
            { value: String(streak), label: 'Day streak', glyph: 'flame' as const, color: colors.saffron },
            { value: state.coins.toLocaleString('en-IN'), label: 'Coins', glyph: 'star' as const, color: '#E59A00' },
            { value: String(lessonsDone), label: 'Lessons', glyph: 'star' as const, color: colors.success },
          ].map((s, i) => (
            <View key={s.label} style={[card, styles.stat]}>
              {i < 3 ? <Glyph name={s.glyph} size={16} color={s.color} /> : <Icon name="check" size={16} color={s.color} strokeWidth={2.6} />}
              <T variant="heading" numberOfLines={1} adjustsFontSizeToFit>
                {s.value}
              </T>
              <T variant="labelSm" color={colors.ink3} style={{ fontSize: 10.5 }}>
                {s.label}
              </T>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(320)} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {SHORTCUTS.map((s) => (
            <Pressable
              key={s.label}
              accessibilityRole="button"
              accessibilityLabel={`${s.label}, ${s.sub}`}
              onPress={() => {
                haptic.tap();
                router.push(s.href);
              }}
              style={({ pressed }) => [card, styles.shortcut, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
              <View style={[styles.shortcutIcon, { backgroundColor: s.tint }]}>
                <Icon d={s.icon} size={20} color={s.ink} />
              </View>
              <T variant="label" style={{ fontSize: 13 }}>
                {s.label}
              </T>
              <T variant="caption" style={{ fontSize: 11 }} numberOfLines={1}>
                {s.sub}
              </T>
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(140).duration(320)} style={[card, { padding: 14, gap: 12 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <T variant="label">This week</T>
            <T variant="labelSm" color={colors.ink3}>
              {weekTotal} XP
            </T>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }} accessible accessibilityLabel={`XP this week: ${week.map((w) => `${w.label} ${w.xp}`).join(', ')}`}>
            {week.map((w) => (
              <View key={w.key} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View style={{ height: 70, width: '100%', justifyContent: 'flex-end' }}>
                  <View style={{ height: Math.max(6, Math.round((w.xp / maxXp) * 70)), borderRadius: 6, backgroundColor: w.isToday ? colors.primary : w.xp > 0 ? '#C9C4F6' : colors.lineSoft }} />
                </View>
                <T variant="labelSm" color={w.isToday ? colors.primary : colors.ink3} style={{ fontSize: 11 }}>
                  {w.label}
                </T>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(320)} style={{ gap: 8 }}>
          <T variant="heading" style={{ paddingHorizontal: 2 }}>
            Certificates
          </T>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
            {STAGES.map((s) => {
              const earned = !!state.certificates[s.id];
              return (
                <Pressable
                  key={s.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${s.name} certificate, ${earned ? 'earned' : 'locked'}`}
                  onPress={() => router.push({ pathname: '/certificate/[stageId]', params: { stageId: s.id } })}
                  style={[styles.cert, { backgroundColor: earned ? s.color : colors.surface, borderColor: earned ? s.color : colors.line }]}>
                  <Icon d={earned ? 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.5 14L7 22l5-3 5 3-1.5-8' : 'M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3'} size={24} color={earned ? '#FFFFFF' : colors.ink3} />
                  <T variant="label" color={earned ? '#FFFFFF' : colors.ink2} numberOfLines={2} style={{ fontSize: 13 }}>
                    {s.name}
                  </T>
                  <T variant="caption" color={earned ? '#FFFFFFCC' : colors.ink3}>
                    {earned ? 'Earned · tap to share' : 'Locked'}
                  </T>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(220).duration(320)} style={[card, { padding: 14, gap: 12 }]}>
          <T variant="label">Languages</T>
          {STAGES.map((s) => {
            const { pct, done, total } = stageProgress(s, state.completed);
            return (
              <Pressable
                key={s.id}
                accessibilityRole="button"
                accessibilityLabel={`${s.name}: ${done} of ${total} modules, ${pct} percent. Open track`}
                onPress={() => {
                  setStage(s.id);
                  router.navigate('/');
                }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TrackBadge stage={s} size={30} />
                <View style={{ flex: 1, gap: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <T variant="labelSm" style={{ fontSize: 13 }}>
                      {s.name}
                    </T>
                    <T variant="labelSm" color={pct ? s.color : colors.ink3} style={{ fontSize: 12 }}>
                      {done}/{total}
                    </T>
                  </View>
                  <Bar value={pct / 100} color={s.color} />
                </View>
              </Pressable>
            );
          })}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(320)} style={[card, { overflow: 'hidden' }]}>
          <View style={styles.setting}>
            <Icon d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z M10 21h4" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <T variant="label">Daily reminder</T>
              <T variant="caption">Protects your {streak}-day streak</T>
            </View>
            <Switch
              value={state.reminder.enabled}
              onValueChange={(on) => updateReminder({ ...state.reminder, enabled: on })}
              trackColor={{ true: colors.primary, false: '#D9D6E6' }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Daily reminder"
            />
          </View>
          {state.reminder.enabled ? (
            <View style={styles.times} accessibilityRole="radiogroup">
              {REMINDER_TIMES.map((r) => {
                const on = state.reminder.hour === r.hour;
                return (
                  <Pressable key={r.hour} accessibilityRole="radio" accessibilityState={{ checked: on }} onPress={() => updateReminder({ enabled: true, hour: r.hour, minute: 0 })} style={[styles.time, on && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                    <T variant="labelSm" color={on ? '#FFFFFF' : colors.ink2}>
                      {r.label}
                    </T>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
          <View style={[styles.setting, styles.divider]}>
            <Icon name="vibrate" size={20} color={colors.primary} />
            <T variant="label" style={{ flex: 1 }}>
              Vibration feedback
            </T>
            <Switch value={state.haptics} onValueChange={setHaptics} trackColor={{ true: colors.primary, false: '#D9D6E6' }} thumbColor="#FFFFFF" accessibilityLabel="Vibration feedback" />
          </View>
          <View style={[styles.setting, styles.divider]}>
            <Icon d="M3 3v18h18 M7 15l4-4 3 3 5-6" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <T variant="label">Help improve CodeYatra</T>
              <T variant="caption">Anonymous crash reports and usage. No name or email.</T>
            </View>
            <Switch value={state.telemetry} onValueChange={setTelemetry} trackColor={{ true: colors.primary, false: '#D9D6E6' }} thumbColor="#FFFFFF" accessibilityLabel="Share anonymous usage data" />
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/account')} style={[styles.setting, styles.divider]}>
            <Icon name="profile" size={20} color={colors.primary} />
            <T variant="label" style={{ flex: 1 }}>
              {account.session ? 'Account' : 'Sign in or create account'}
            </T>
            <Icon name="chevronRight" size={18} color={colors.ink3} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityHint="Opens your email app"
            onPress={async () => {
              if (!(await sendFeedback('Profile'))) toast(`Email us at ${SUPPORT_EMAIL}`);
            }}
            style={[styles.setting, styles.divider]}>
            <Icon d="M4 6h16v12H4z M4 7l8 6 8-6" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <T variant="label">Send feedback</T>
              <T variant="caption">Found a bug or a confusing lesson? Tell us.</T>
            </View>
            <Icon name="chevronRight" size={18} color={colors.ink3} />
          </Pressable>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL(PRIVACY_URL)} style={[styles.setting, styles.divider]}>
            <Icon d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" size={20} color={colors.primary} />
            <T variant="label" style={{ flex: 1 }}>
              Privacy policy
            </T>
            <Icon name="chevronRight" size={18} color={colors.ink3} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={confirmReset} style={[styles.setting, styles.divider]}>
            <Icon name="trash" size={20} color={colors.danger} />
            <T variant="label" color={colors.danger} style={{ flex: 1 }}>
              Reset progress on this phone
            </T>
          </Pressable>
        </Animated.View>
        <T variant="caption" style={{ textAlign: 'center' }}>
          CodeYatra · version {APP_VERSION}
        </T>
      </ScrollView>
    </SafeAreaView>
  );
}

const PRIVACY_URL = 'https://nitishkchauhan.github.io/CodeYatra/privacy.html';

const styles = StyleSheet.create({
  hero: { borderRadius: 22, backgroundColor: colors.hero, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  camera: { position: 'absolute', right: -2, bottom: -2, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.saffron, borderWidth: 2, borderColor: colors.hero, alignItems: 'center', justifyContent: 'center' },
  edit: { position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff1f', alignItems: 'center', justifyContent: 'center' },
  accountChip: { alignSelf: 'flex-start', marginTop: 6, minHeight: 32, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: '#ffffff1f' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  stat: { flex: 1, borderRadius: 16, paddingVertical: 10, paddingHorizontal: 8, gap: 2, alignItems: 'center' },
  shortcut: { flexGrow: 1, flexBasis: '30%', borderRadius: 16, padding: 12, gap: 4 },
  shortcutIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  cert: { width: 140, minHeight: 120, borderRadius: 18, borderWidth: 1, padding: 12, gap: 6 },
  setting: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14 },
  divider: { borderTopWidth: 1, borderTopColor: colors.lineSoft },
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 10, padding: 3 },
  segmentBtn: { minHeight: 34, paddingHorizontal: 12, borderRadius: 8, justifyContent: 'center' },
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  times: { flexDirection: 'row', gap: 8, paddingHorizontal: 14, paddingBottom: 12 },
  time: { flex: 1, minHeight: 40, borderRadius: 12, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
});
