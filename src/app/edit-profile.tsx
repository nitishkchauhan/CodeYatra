import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, AVATAR_COLORS } from '@/components/Avatar';
import { TrackBadge } from '@/components/TrackBadge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { STAGES } from '@/content';
import { deleteAvatarFile, pickAvatar, type PhotoSource } from '@/lib/avatar';
import { haptic } from '@/lib/haptics';
import { hasBlockedWords } from '@/lib/moderation';
import { useAccount } from '@/state/account';
import { BIO_MAX, useProgress, type LearnerLevel } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

const LEVELS: { id: LearnerLevel; label: string }[] = [
  { id: 'school', label: 'School' },
  { id: 'college', label: 'College' },
  { id: 'curious', label: 'Just curious' },
];

export default function EditProfileScreen() {
  const toast = useToast();
  const account = useAccount();
  const { state, setProfile, setStage, setLevel } = useProgress();
  const [name, setName] = useState(state.name);
  const [bio, setBio] = useState(state.bio);
  const [busy, setBusy] = useState(false);
  const photo = state.avatar ?? state.avatarUrl;
  const rudeName = hasBlockedWords(name);
  const rudeBio = hasBlockedWords(bio);

  const choose = async (source: PhotoSource) => {
    haptic.tap();
    const result = await pickAvatar(source);
    if (!result) return;
    if ('error' in result) return toast(result.error);
    setProfile({ avatar: result.uri });
    if (account.session) {
      setBusy(true);
      const error = await account.uploadAvatar(result.uri);
      setBusy(false);
      toast(error ?? 'Photo updated everywhere');
    } else {
      toast('Photo updated');
    }
  };

  const removePhoto = async () => {
    haptic.tap();
    deleteAvatarFile();
    setProfile({ avatar: null });
    if (account.session) await account.uploadAvatar(null);
    toast('Photo removed');
  };

  const save = () => {
    if (rudeName || rudeBio) return;
    setProfile({ name, bio });
    haptic.success();
    toast('Profile saved');
    router.back();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Edit profile" close />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          <Animated.View entering={FadeInDown.duration(300)} style={[card, styles.photoCard]}>
            <Animated.View key={photo ?? state.avatarColor} entering={ZoomIn.springify().damping(14)}>
              <Avatar uri={photo} color={state.avatarColor} outfit={state.outfit} size={112} />
            </Animated.View>
            {busy ? (
              <T variant="caption" color={colors.primary}>
                Uploading…
              </T>
            ) : null}
            <View style={styles.photoActions}>
              <Button variant="primary" height={44} label="Gallery" icon={(c) => <Icon d="M4 5h16v14H4z M4 15l4-4 4 4 3-3 5 5 M15.5 9.5h.01" size={18} color={c} />} onPress={() => choose('library')} style={{ flex: 1 }} />
              {Platform.OS !== 'web' ? (
                <Button
                  variant="outline"
                  height={44}
                  label="Camera"
                  icon={(c) => <Icon d="M4 8h3l2-3h6l2 3h3v11H4z M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" size={18} color={c} />}
                  onPress={() => choose('camera')}
                  style={{ flex: 1 }}
                />
              ) : null}
            </View>
            {photo ? (
              <Pressable accessibilityRole="button" onPress={removePhoto} hitSlop={8} style={{ minHeight: 36, justifyContent: 'center' }}>
                <T variant="labelSm" color={colors.danger}>
                  Remove photo · use Yatri
                </T>
              </Pressable>
            ) : (
              <T variant="caption" style={{ textAlign: 'center' }}>
                No photo? Yatri stands in, wearing your shop outfit.
              </T>
            )}
          </Animated.View>

          {!photo ? (
            <Animated.View entering={FadeInDown.delay(40).duration(300)} style={{ gap: 8 }}>
              <T variant="label">Avatar colour</T>
              <View style={styles.swatches} accessibilityRole="radiogroup">
                {AVATAR_COLORS.map((c) => {
                  const on = state.avatarColor === c;
                  return (
                    <Pressable
                      key={c}
                      accessibilityRole="radio"
                      accessibilityLabel={`Colour ${c}`}
                      accessibilityState={{ checked: on }}
                      hitSlop={4}
                      onPress={() => {
                        haptic.tap();
                        setProfile({ avatarColor: c });
                      }}
                      style={[styles.swatch, { backgroundColor: c }, on && { boxShadow: `0 0 0 3px ${colors.bg}, 0 0 0 5px ${c}` }]}>
                      {on ? <Icon name="check" size={16} color="#FFFFFF" strokeWidth={3} /> : null}
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>
          ) : null}

          <Animated.View entering={FadeInDown.delay(80).duration(300)} style={{ gap: 8 }}>
            <T variant="label">Name</T>
            <TextInput value={name} onChangeText={setName} maxLength={24} placeholder="Your name" placeholderTextColor={colors.ink3} autoComplete="name" accessibilityLabel="Name" style={[styles.input, rudeName && { borderColor: colors.danger }]} />
            {rudeName ? <Warning /> : null}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T variant="label">About you</T>
              <T variant="caption">
                {bio.length}/{BIO_MAX}
              </T>
            </View>
            <TextInput
              value={bio}
              onChangeText={setBio}
              maxLength={BIO_MAX}
              multiline
              placeholder="e.g. Class 11 · learning Python to build games"
              placeholderTextColor={colors.ink3}
              accessibilityLabel="About you"
              style={[styles.input, { height: 84, paddingTop: 14, textAlignVertical: 'top' }, rudeBio && { borderColor: colors.danger }]}
            />
            {rudeBio ? <Warning /> : null}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).duration(300)} style={{ gap: 8 }}>
            <T variant="label">I am a</T>
            <View style={styles.segment} accessibilityRole="radiogroup">
              {LEVELS.map((l) => {
                const on = state.level === l.id;
                return (
                  <Pressable key={l.id} accessibilityRole="radio" accessibilityState={{ checked: on }} onPress={() => setLevel(l.id)} style={[styles.segmentBtn, on && styles.segmentOn]}>
                    <T variant="labelSm" color={on ? colors.ink : '#6E6A88'}>
                      {l.label}
                    </T>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(160).duration(300)} style={{ gap: 8 }}>
            <T variant="label">Main language</T>
            <View style={styles.grid}>
              {STAGES.map((s) => {
                const on = state.stageId === s.id;
                return (
                  <Pressable
                    key={s.id}
                    accessibilityRole="radio"
                    accessibilityLabel={s.name}
                    accessibilityState={{ checked: on }}
                    onPress={() => {
                      haptic.tap();
                      setStage(s.id);
                    }}
                    style={[styles.lang, { borderColor: on ? s.color : colors.line, borderWidth: on ? 2 : 1, backgroundColor: on ? s.soft : colors.surface }]}>
                    <TrackBadge stage={s} size={32} />
                    <T variant="labelSm" numberOfLines={1} style={{ fontSize: 11.5 }}>
                      {s.short}
                    </T>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        </ScrollView>
        <View style={styles.footer}>
          <Button label="Save profile" disabled={!name.trim() || rudeName || rudeBio} onPress={save} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Shown under a name or bio that the word filter catches. */
function Warning() {
  return (
    <T variant="caption" color={colors.danger} accessibilityLiveRegion="polite">
      Other learners can see this. Please remove words that could hurt or upset someone.
    </T>
  );
}

const styles = StyleSheet.create({
  photoCard: { borderRadius: 22, padding: 20, alignItems: 'center', gap: 14 },
  photoActions: { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
  swatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  swatch: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
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
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 12, padding: 3 },
  segmentBtn: { flex: 1, minHeight: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  lang: { width: '23%', flexGrow: 1, borderRadius: 14, paddingVertical: 10, alignItems: 'center', gap: 5 },
  footer: { padding: 16, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.lineSoft, backgroundColor: colors.bg },
});
