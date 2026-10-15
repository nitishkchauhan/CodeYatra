import { Redirect, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight, ZoomIn, useReducedMotion } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/components/Logo';
import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Bar } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findPath, PATHS, pathSummary, type CareerPath } from '@/content/paths';
import { goalForMinutes, levelFor, MINUTES, reasonFor, recommendPathId, startingStage, type Interest, type Minutes, type Who, type Why } from '@/content/paths/recommend';
import { INTEREST, MINUTE_TEXT, WHO, WHY, type Option } from '@/content/plan';
import { haptic } from '@/lib/haptics';
import { hasBlockedWords } from '@/lib/moderation';
import { syncReminder } from '@/lib/reminders';
import { track } from '@/lib/telemetry';
import { useAccount } from '@/state/account';
import { useProgress } from '@/state/progress';
import { colors, fonts } from '@/theme';


const SLIDES = [
  { title: 'Learn to code on your phone', body: 'Short lessons, from your first logic puzzle to placement-ready DSA.', mood: 'happy' as const },
  { title: 'Practise with real code', body: 'Write Python, JavaScript and SQL and watch it run, right in the app.', mood: 'focus' as const },
  { title: 'Follow a path to a job', body: 'Pick a career like Frontend Developer or Data Analyst and see every step.', mood: 'celebrate' as const },
];

/** The question steps, in order; the bar shows progress through them. */
const STEPS = ['who', 'why', 'interest', 'minutes', 'result', 'name', 'reminder'] as const;
type Step = 'welcome' | (typeof STEPS)[number] | 'building';

const fmtTime = (h: number, m: number) => `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;

export default function Onboarding() {
  const { finishOnboarding, state } = useProgress();
  const { enabled: accountsEnabled } = useAccount();
  const toast = useToast();
  const [step, setStep] = useState<Step>('welcome');
  const [who, setWho] = useState<Who | null>(null);
  const [why, setWhy] = useState<Why | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [minutes, setMinutes] = useState<Minutes>(10);
  const [pathId, setPathId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [time, setTime] = useState({ hour: 19, minute: 0 });
  const [remind, setRemind] = useState(false);

  // Signing in on the welcome screen restores an onboarded account.
  if (state.onboarded && step !== 'building') return <Redirect href="/" />;

  const about = who && why && interest ? { who, why, interest } : null;
  const go = (next: Step) => setStep(next);
  const index = STEPS.indexOf(step as (typeof STEPS)[number]);
  const back = () => go(index > 0 ? STEPS[index - 1] : 'welcome');

  /** Pick an answer and move on, like a conversation. */
  const answer = <K,>(set: (v: K) => void, value: K, next: Step) => {
    haptic.tap();
    set(value);
    setTimeout(() => go(next), 220);
  };

  const finish = () => {
    if (!about) return;
    finishOnboarding({
      name,
      level: levelFor(about.who),
      stageId: startingStage(pathId ?? recommendPathId(about), about.who),
      pathId,
      dailyGoal: goalForMinutes(minutes),
      about,
      reminder: { enabled: remind, hour: time.hour, minute: time.minute },
    });
    track('onboarding_done', { who: about.who, why: about.why, interest: about.interest, minutes, path: pathId ?? 'none', reminder: remind });
    router.replace('/');
  };

  if (step === 'welcome') return <Welcome accountsEnabled={accountsEnabled} onStart={() => go('who')} />;
  if (step === 'building') return <Building goal={goalForMinutes(minutes)} path={findPath(pathId)} onDone={finish} />;

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.top}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={back} hitSlop={6} style={styles.back}>
            <Icon name="back" size={22} color={colors.ink} />
          </Pressable>
          <View style={{ flex: 1 }} accessible accessibilityLabel={`Step ${index + 1} of ${STEPS.length}`}>
            <Bar value={(index + 1) / STEPS.length} color={colors.primary} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {step === 'who' ? (
            <Question key="who" title="Which describes you best?" sub="So Yatri can pick the right starting point.">
              {WHO.map((o) => (
                <OptionCard key={o.id} option={o} selected={who === o.id} onPress={() => answer(setWho, o.id, 'why')} />
              ))}
            </Question>
          ) : step === 'why' ? (
            <Question key="why" title="Why are you learning to code?">
              {WHY.map((o) => (
                <OptionCard key={o.id} option={o} selected={why === o.id} onPress={() => answer(setWhy, o.id, 'interest')} />
              ))}
            </Question>
          ) : step === 'interest' ? (
            <Question key="interest" title="What sounds most interesting?">
              {INTEREST.map((o) => (
                <OptionCard
                  key={o.id}
                  option={o}
                  selected={interest === o.id}
                  onPress={() => {
                    if (who && why) setPathId(recommendPathId({ who, why, interest: o.id }));
                    answer(setInterest, o.id, 'minutes');
                  }}
                />
              ))}
            </Question>
          ) : step === 'minutes' ? (
            <Question key="minutes" title="How much time a day?" sub="Little and often works best. You can change it later.">
              {MINUTES.map((m) => (
                <OptionCard
                  key={m}
                  option={{
                    id: m,
                    title: `${m} minutes a day`,
                    sub: `${MINUTE_TEXT[m]} · goal ${goalForMinutes(m)} XP`,
                    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',
                    tint: colors.primarySoft,
                    ink: colors.primary,
                  }}
                  selected={minutes === m}
                  onPress={() => answer(setMinutes, m, 'result')}
                />
              ))}
            </Question>
          ) : step === 'result' && about ? (
            <Result about={about} pathId={pathId} onPick={setPathId} />
          ) : step === 'name' ? (
            <NameStep name={name} onChange={setName} />
          ) : (
            <ReminderStep time={time} onChange={setTime} />
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step === 'result' ? (
            <Button label={pathId ? 'Continue' : 'Continue without a path'} onPress={() => go('name')} />
          ) : step === 'name' ? (
            <Button label={name.trim() ? 'Continue' : 'Skip for now'} disabled={hasBlockedWords(name)} onPress={() => go('reminder')} />
          ) : step === 'reminder' ? (
            <>
              <Button
                label="Yes, remind me"
                onPress={async () => {
                  haptic.tap();
                  const ok = await syncReminder({ enabled: true, ...time }, { name, minutes, pathTitle: findPath(pathId)?.title });
                  setRemind(ok || Platform.OS === 'web');
                  if (!ok && Platform.OS !== 'web') toast('Notifications are off. You can turn reminders on later in Profile.');
                  go('building');
                }}
              />
              <Button variant="ghost" height={46} label="Set later" onPress={() => go('building')} />
            </>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- Welcome slides ---------- */

function Welcome({ accountsEnabled, onStart }: { accountsEnabled: boolean; onStart: () => void }) {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => setPage(Math.round(e.nativeEvent.contentOffset.x / Math.max(width, 1)));
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.brand }]}>
      <View style={{ alignItems: 'center', paddingTop: 18 }}>
        <Logo height={30} dark />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        onScroll={Platform.OS === 'web' ? onScroll : undefined}
        scrollEventThrottle={64}>
        {SLIDES.map((s, i) => (
          <View key={s.title} style={[styles.slide, { width }]} accessible accessibilityLabel={`${s.title}. ${s.body}`}>
            <Animated.View entering={ZoomIn.springify().damping(14)} style={styles.halo}>
              <Yatri size={170} mood={s.mood} dark bob={i === page} />
            </Animated.View>
            <T variant="display" color="#FFFFFF" style={{ textAlign: 'center' }}>
              {s.title}
            </T>
            <T variant="body" color="#DCD8FF" style={{ textAlign: 'center', maxWidth: 320 }}>
              {s.body}
            </T>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots} accessibilityElementsHidden>
        {SLIDES.map((s, i) => (
          <View key={s.title} style={[styles.dot, i === page && styles.dotOn]} />
        ))}
      </View>
      <Animated.View entering={FadeInDown.delay(200)} style={{ padding: 20, gap: 4 }}>
        <Button variant="saffron" label="Get started" onPress={onStart} />
        {accountsEnabled ? (
          <Pressable accessibilityRole="button" onPress={() => router.push('/account')} style={styles.haveAccount} hitSlop={6}>
            <T variant="label" color="#DCD8FF">
              I already have an account
            </T>
          </Pressable>
        ) : null}
      </Animated.View>
    </SafeAreaView>
  );
}

/* ---------- Questions ---------- */

function Question({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <Animated.View entering={FadeInRight.duration(260)} style={{ gap: 12 }}>
      <View style={{ gap: 4, marginBottom: 6 }}>
        <T variant="display" accessibilityRole="header">
          {title}
        </T>
        {sub ? (
          <T variant="bodySm" color={colors.ink2}>
            {sub}
          </T>
        ) : null}
      </View>
      <View style={{ gap: 10 }} accessibilityRole="radiogroup">
        {children}
      </View>
    </Animated.View>
  );
}

function OptionCard<K extends string | number>({ option, selected, onPress }: { option: Option<K>; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={option.sub ? `${option.title}, ${option.sub}` : option.title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.surfaceTint },
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}>
      <View style={[styles.optionIcon, { backgroundColor: option.tint }]}>
        <Icon d={option.icon} size={24} color={option.ink} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="heading" style={{ fontSize: 16 }}>
          {option.title}
        </T>
        {option.sub ? <T variant="caption">{option.sub}</T> : null}
      </View>
      {selected ? <Icon name="check" size={20} color={colors.primary} strokeWidth={3} /> : null}
    </Pressable>
  );
}

/* ---------- Recommendation ---------- */

function Result({ about, pathId, onPick }: { about: Parameters<typeof reasonFor>[0]; pathId: string | null; onPick: (id: string | null) => void }) {
  const [all, setAll] = useState(false);
  const suggested = findPath(recommendPathId(about))!;
  const chosen = findPath(pathId);
  return (
    <Animated.View entering={FadeIn.duration(300)} style={{ gap: 14 }}>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Yatri size={96} mood="celebrate" />
        <T variant="display" accessibilityRole="header" style={{ textAlign: 'center' }}>
          {chosen && chosen.id !== suggested.id ? `${chosen.title} it is!` : `${suggested.title} is a great fit for you!`}
        </T>
        <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
          {chosen && chosen.id !== suggested.id ? 'Good choice. You can switch paths any time.' : `${reasonFor(about)} You can switch paths any time.`}
        </T>
      </View>

      {chosen ? <PathPreview path={chosen} /> : null}

      <Pressable accessibilityRole="button" onPress={() => setAll((v) => !v)} style={styles.seeAll} hitSlop={6}>
        <T variant="label" color={colors.primary}>
          {all ? 'Hide other paths' : 'See all paths'}
        </T>
        <Icon name={all ? 'chevronDown' : 'chevronRight'} size={16} color={colors.primary} />
      </Pressable>
      {all ? (
        <View style={{ gap: 8 }} accessibilityRole="radiogroup">
          {PATHS.map((p) => (
            <Pressable
              key={p.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: pathId === p.id }}
              accessibilityLabel={`${p.title}, ${p.months}`}
              onPress={() => {
                haptic.tap();
                onPick(p.id);
              }}
              style={[styles.pathRow, pathId === p.id && { borderColor: p.color, borderWidth: 2 }]}>
              <View style={[styles.pathBadge, { backgroundColor: p.soft }]}>
                <Icon d={p.icon} size={18} color={p.color} />
              </View>
              <T variant="label" style={{ flex: 1 }}>
                {p.title}
              </T>
              <T variant="caption">{p.months}</T>
            </Pressable>
          ))}
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: pathId === null }}
            onPress={() => onPick(null)}
            style={[styles.pathRow, pathId === null && { borderColor: colors.primary, borderWidth: 2 }]}>
            <T variant="label" style={{ flex: 1 }}>
              Decide later
            </T>
          </Pressable>
        </View>
      ) : null}
    </Animated.View>
  );
}

function PathPreview({ path }: { path: CareerPath }) {
  const { stops, inAppPct } = pathSummary(path, {}, {});
  const topics = path.sections.map((s) => s.title).filter((t) => !/^(before you start|foundations|get hired|pick |ship it|build and ship)/i.test(t));
  return (
    <Animated.View key={path.id} entering={ZoomIn.springify().damping(16)} style={[styles.preview, { borderColor: path.color }]}>
      <View style={[styles.previewTop, { backgroundColor: path.soft }]}>
        <View style={[styles.previewBadge, { backgroundColor: path.ink }]}>
          <Icon d={path.icon} size={26} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="title">{path.title}</T>
          <T variant="caption" color={colors.inkBody}>
            {path.months} · {stops} stops · {inAppPct}% in app
          </T>
        </View>
      </View>
      <View style={{ padding: 14, gap: 10 }}>
        <T variant="bodySm" color={colors.inkBody}>
          {path.tagline}.
        </T>
        <T variant="kicker" color={colors.ink3}>
          WHAT YOU’LL LEARN
        </T>
        <View style={styles.chips}>
          {topics.slice(0, 6).map((t) => (
            <View key={t} style={[styles.chip, { backgroundColor: path.soft }]}>
              <T variant="labelSm" color={path.ink} style={{ fontSize: 11 }}>
                {t}
              </T>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

/* ---------- Name and reminder ---------- */

function NameStep({ name, onChange }: { name: string; onChange: (v: string) => void }) {
  const rude = hasBlockedWords(name);
  return (
    <Animated.View entering={FadeInRight.duration(260)} style={{ gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
        <Yatri size={78} mood="happy" />
        <View style={styles.bubble}>
          <T variant="label">Namaste! I’m Yatri.</T>
          <T variant="bodySm" color={colors.ink2}>
            What should I call you?
          </T>
        </View>
      </View>
      <TextInput
        value={name}
        onChangeText={onChange}
        placeholder="Your first name"
        placeholderTextColor={colors.ink3}
        autoCapitalize="words"
        autoComplete="given-name"
        maxLength={24}
        returnKeyType="done"
        accessibilityLabel="Your first name"
        style={[styles.input, rude && { borderColor: colors.danger }]}
      />
      {rude ? (
        <T variant="caption" color={colors.danger} accessibilityLiveRegion="polite">
          Other learners see this name. Please choose a different one.
        </T>
      ) : (
        <T variant="caption">Shown on your profile and the weekly league if you sign in.</T>
      )}
    </Animated.View>
  );
}

function ReminderStep({ time, onChange }: { time: { hour: number; minute: number }; onChange: (t: { hour: number; minute: number }) => void }) {
  const shift = (mins: number) => {
    haptic.tap();
    const total = (time.hour * 60 + time.minute + mins + 24 * 60) % (24 * 60);
    onChange({ hour: Math.floor(total / 60), minute: total % 60 });
  };
  const PRESETS = [
    { hour: 7, minute: 0, label: 'Morning' },
    { hour: 13, minute: 0, label: 'Lunch' },
    { hour: 19, minute: 0, label: 'Evening' },
    { hour: 21, minute: 30, label: 'Night' },
  ];
  return (
    <Animated.View entering={FadeInRight.duration(260)} style={{ gap: 18, alignItems: 'center' }}>
      <View style={{ gap: 4 }}>
        <T variant="display" accessibilityRole="header" style={{ textAlign: 'center' }}>
          Build a coding habit
        </T>
        <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
          Yatri will nudge you once a day. You can change the time later.
        </T>
      </View>
      <Yatri size={110} mood="happy" bob />
      <View style={styles.timeRow}>
        <Pressable accessibilityRole="button" accessibilityLabel="30 minutes earlier" onPress={() => shift(-30)} style={styles.timeBtn} hitSlop={6}>
          <Icon d="M5 12h14" size={22} color={colors.primary} strokeWidth={2.6} />
        </Pressable>
        <View style={styles.timeBox} accessible accessibilityLabel={`Reminder at ${fmtTime(time.hour, time.minute)}`} accessibilityLiveRegion="polite">
          <T style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink }}>{fmtTime(time.hour, time.minute)}</T>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="30 minutes later" onPress={() => shift(30)} style={styles.timeBtn} hitSlop={6}>
          <Icon name="plus" size={22} color={colors.primary} strokeWidth={2.6} />
        </Pressable>
      </View>
      <View style={styles.chips} accessibilityRole="radiogroup">
        {PRESETS.map((p) => {
          const on = p.hour === time.hour && p.minute === time.minute;
          return (
            <Pressable
              key={p.label}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              accessibilityLabel={`${p.label}, ${fmtTime(p.hour, p.minute)}`}
              onPress={() => {
                haptic.tap();
                onChange({ hour: p.hour, minute: p.minute });
              }}
              style={[styles.preset, on && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
              <T variant="labelSm" color={on ? '#FFFFFF' : colors.ink2}>
                {p.label}
              </T>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

/* ---------- Building your plan ---------- */

function Building({ goal, path, onDone }: { goal: number; path: CareerPath | undefined; onDone: () => void }) {
  const reduce = useReducedMotion();
  const lines = [path ? `Setting up the ${path.title} path` : 'Picking a good starting track', `Daily goal: ${goal} XP`, 'Getting your first lesson ready'];
  const [shown, setShown] = useState(reduce ? lines.length : 0);
  const done = useRef(false);
  useEffect(() => {
    const step = reduce ? 300 : 650;
    const timers = lines.map((_, i) => setTimeout(() => setShown(i + 1), step * (i + 1)));
    const end = setTimeout(
      () => {
        if (done.current) return;
        done.current = true;
        haptic.success();
        onDone();
      },
      step * (lines.length + 1),
    );
    return () => {
      [...timers, end].forEach(clearTimeout);
    };
    // Runs once: the plan is fixed by the time this screen shows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.brand, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 22 }]}>
      <Yatri size={130} mood="focus" dark bob />
      <T variant="title" color="#FFFFFF" style={{ textAlign: 'center' }} accessibilityLiveRegion="polite">
        Building your plan…
      </T>
      <View style={{ gap: 12, alignSelf: 'stretch', maxWidth: 340, marginHorizontal: 'auto' }}>
        {lines.map((l, i) => (
          <View key={l} style={[styles.buildRow, { opacity: i < shown ? 1 : 0.35 }]}>
            <View style={[styles.buildDot, i < shown && { backgroundColor: colors.tealLight, borderColor: colors.tealLight }]}>
              {i < shown ? <Icon name="check" size={13} color={colors.brand} strokeWidth={3} /> : null}
            </View>
            <T variant="bodySm" color="#DCD8FF">
              {l}
            </T>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  top: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  back: { width: 44, height: 44, marginLeft: -10, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 20, paddingTop: 8, paddingBottom: 24 },
  footer: { padding: 20, paddingTop: 8, gap: 4 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 28 },
  halo: { width: 230, height: 230, borderRadius: 115, backgroundColor: '#ffffff14', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  haveAccount: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff44' },
  dotOn: { width: 22, backgroundColor: colors.saffron },
  option: {
    minHeight: 72,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  optionIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  seeAll: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 40 },
  pathRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  pathBadge: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  preview: { borderRadius: 20, borderWidth: 2, overflow: 'hidden', backgroundColor: colors.surface },
  previewTop: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  previewBadge: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  chip: { minHeight: 26, paddingHorizontal: 10, borderRadius: 13, justifyContent: 'center' },
  bubble: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 30,
    gap: 2,
  },
  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    fontFamily: fonts.bodySemibold,
    fontSize: 17,
    color: colors.ink,
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  timeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  timeBox: { minWidth: 160, minHeight: 64, paddingHorizontal: 18, borderRadius: 32, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  preset: { minHeight: 38, paddingHorizontal: 14, borderRadius: 19, borderWidth: 1, borderColor: colors.line, justifyContent: 'center', backgroundColor: colors.surface },
  buildRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  buildDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ffffff55', alignItems: 'center', justifyContent: 'center' },
});
