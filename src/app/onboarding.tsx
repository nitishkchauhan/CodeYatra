import { Redirect, router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInRight, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Segments } from '@/components/ui/Progress';
import { T } from '@/components/ui/Text';
import { haptic } from '@/lib/haptics';
import { useAccount } from '@/state/account';
import { useProgress, type LearnerLevel, type UiLang } from '@/state/progress';
import { colors, fonts } from '@/theme';

const LEVELS: { id: LearnerLevel; title: string; sub: string; icon: string; tint: string; ink: string }[] = [
  { id: 'school', title: 'School student', sub: 'Class 8 to 12 · start with logic', icon: 'M3 9l9-5 9 5-9 5z M7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5', tint: '#E7EFFE', ink: '#1D4ED8' },
  { id: 'college', title: 'College student', sub: 'B.Tech, BCA, BSc · web, Python, React', icon: 'M2 9l10-5 10 5-10 5z M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5 M22 9v6', tint: colors.primarySoft, ink: colors.primary },
  { id: 'curious', title: 'Just curious', sub: 'Exploring code for fun', icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', tint: colors.tealSoft, ink: '#0F766E' },
];

function Choice({ selected, onPress, children, label }: { selected: boolean; onPress: () => void; children: ReactNode; label: string }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      style={({ pressed }) => [
        styles.choice,
        { borderColor: selected ? colors.primary : colors.line, borderWidth: selected ? 2 : 1, backgroundColor: selected ? colors.surfaceTint : colors.surface, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}>
      {children}
      <View style={[styles.radio, selected && { borderColor: colors.primary, backgroundColor: colors.primary }]}>
        {selected ? <Icon name="check" size={14} color="#FFFFFF" strokeWidth={3} /> : null}
      </View>
    </Pressable>
  );
}

export default function Onboarding() {
  const { finishOnboarding, state } = useProgress();
  const { enabled: accountsEnabled } = useAccount();
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<UiLang>('en');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<LearnerLevel | null>(null);

  const finish = () => {
    if (!level) return;
    haptic.success();
    finishOnboarding({ name, level, lang });
    router.replace('/');
  };

  // Signing in on the welcome screen restores an onboarded account.
  if (state.onboarded) return <Redirect href="/" />;

  if (step === 0) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.brand }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 16 }}>
          <Animated.View entering={ZoomIn.springify().damping(14)} style={{ width: '100%', maxWidth: 420, aspectRatio: 575 / 523 }}>
            <Image source={require('@/assets/images/logo.png')} style={{ width: '100%', height: '100%' }} contentFit="contain" accessibilityLabel="CodeYatra" />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)} style={{ alignItems: 'center', gap: 6, paddingHorizontal: 8 }}>
            <T variant="hindi" color={colors.tealLight} style={{ fontSize: 17 }}>
              कोड की यात्रा
            </T>
            <T variant="body" color="#DCD8FF" style={{ textAlign: 'center' }}>
              Learn to code from your first block to your first full-stack app.
            </T>
          </Animated.View>
        </View>
        <Animated.View entering={FadeInDown.delay(320)} style={{ padding: 20, gap: 4 }}>
          <Button variant="saffron" label="Get started" onPress={() => setStep(1)} />
          {accountsEnabled ? <Button variant="ghost" label="I already have an account" height={46} onPress={() => router.push('/account')} style={{ marginTop: 4 }} /> : null}
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.top}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => setStep(step - 1)} hitSlop={6} style={styles.back}>
            <Icon name="back" size={22} color={colors.ink} />
          </Pressable>
          <Segments count={2} done={step} current={step - 1} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }} keyboardShouldPersistTaps="handled">
          {step === 1 ? (
            <Animated.View key="lang" entering={FadeInRight.duration(260)} style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
                <Yatri size={84} mood="focus" />
                <View style={styles.bubble}>
                  <T variant="heading">Which language should I use?</T>
                  <T variant="hindi">मैं किस भाषा में बात करूँ?</T>
                </View>
              </View>
              <Choice selected={lang === 'en'} onPress={() => setLang('en')} label="English">
                <View style={[styles.glyph, { backgroundColor: colors.primarySoft }]}>
                  <T variant="title" color={colors.primary}>
                    Aa
                  </T>
                </View>
                <View style={{ flex: 1 }}>
                  <T variant="heading">English</T>
                  <T variant="caption">Let’s start the journey!</T>
                </View>
              </Choice>
              <Choice selected={lang === 'hi'} onPress={() => setLang('hi')} label="Hindi">
                <View style={[styles.glyph, { backgroundColor: colors.saffronSoft }]}>
                  <T style={{ fontFamily: fonts.hindiBold, fontSize: 24, color: colors.saffronShadow }}>अ</T>
                </View>
                <View style={{ flex: 1 }}>
                  <T style={{ fontFamily: fonts.hindiBold, fontSize: 16, color: colors.ink }}>हिन्दी</T>
                  <T variant="hindi" style={{ fontSize: 12 }}>
                    चलो, यात्रा शुरू करें!
                  </T>
                </View>
              </Choice>
              <T variant="caption" style={{ textAlign: 'center' }}>
                Lessons include Hindi help lines. You can switch anytime in Profile.
              </T>
            </Animated.View>
          ) : (
            <Animated.View key="about" entering={FadeInRight.duration(260)} style={{ gap: 16 }}>
              <View style={{ gap: 4 }}>
                <T variant="display" accessibilityRole="header">
                  Tell Yatri about you
                </T>
                <T variant="hindi">आप कौन हैं?</T>
              </View>
              <View style={{ gap: 6 }}>
                <T variant="labelSm" color={colors.ink2}>
                  What should Yatri call you?
                </T>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Your first name"
                  placeholderTextColor={colors.ink3}
                  autoCapitalize="words"
                  autoComplete="given-name"
                  maxLength={24}
                  returnKeyType="done"
                  accessibilityLabel="Your first name"
                  style={styles.input}
                />
              </View>
              <T variant="labelSm" color={colors.ink2}>
                Who are you?
              </T>
              {LEVELS.map((l) => (
                <Choice key={l.id} selected={level === l.id} onPress={() => setLevel(l.id)} label={l.title}>
                  <View style={[styles.glyph, { backgroundColor: l.tint }]}>
                    <Icon d={l.icon} size={26} color={l.ink} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <T variant="heading">{l.title}</T>
                    <T variant="caption">{l.sub}</T>
                  </View>
                </Choice>
              ))}
            </Animated.View>
          )}
        </ScrollView>

        <View style={{ padding: 20, paddingTop: 8 }}>
          {step === 1 ? (
            <Button label="Continue" onPress={() => setStep(2)} />
          ) : (
            <Button label={level ? 'Start learning' : 'Choose one to continue'} disabled={!level} onPress={finish} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  circle: { position: 'absolute', borderRadius: 999, backgroundColor: '#2A247A' },
  top: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  back: { width: 44, height: 44, marginLeft: -10, alignItems: 'center', justifyContent: 'center' },
  bubble: { flex: 1, backgroundColor: colors.surface, borderRadius: 18, borderBottomLeftRadius: 4, padding: 12, borderWidth: 1, borderColor: colors.line, marginBottom: 30, gap: 2 },
  choice: { minHeight: 76, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 14 },
  glyph: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#D6D2E4', alignItems: 'center', justifyContent: 'center' },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    color: colors.ink,
  },
});
