import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from './Avatar';
import { Yatri } from './Yatri';
import { Button } from './ui/Button';
import { Glyph, Icon } from './ui/Icon';
import { T } from './ui/Text';
import { useToast } from './ui/Toast';
import { haptic } from '@/lib/haptics';
import { blockLearner, REPORT_REASONS, reportLearner, type ReportReason } from '@/lib/moderation';
import { supabase } from '@/lib/supabase';
import { colors } from '@/theme';

export type LeagueLearner = { user_id: string; display_name: string; week_xp: number; streak: number; outfit: string | null; avatar_url: string | null };

type Step = 'card' | 'report' | 'block';

/** Another learner's league card, with Report and Block. */
export function LearnerSheet({ learner, onClose, onBlocked }: { learner: LeagueLearner | null; onClose: () => void; onBlocked: (userId: string) => void }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [step, setStep] = useState<Step>('card');
  const [bio, setBio] = useState('');
  const [busy, setBusy] = useState(false);
  const id = learner?.user_id;

  // The league mounts a fresh sheet per learner (key = user id), so state starts clean.
  useEffect(() => {
    if (!id || !supabase) return;
    let alive = true;
    supabase
      .from('profiles')
      .select('bio')
      .eq('user_id', id)
      .maybeSingle()
      .then(({ data }) => alive && setBio((data?.bio as string | undefined) ?? ''));
    return () => {
      alive = false;
    };
  }, [id]);

  if (!learner) return null;

  const report = async (reason: ReportReason) => {
    setBusy(true);
    const error = await reportLearner(learner.user_id, reason);
    setBusy(false);
    if (error) return toast(error);
    haptic.success();
    toast('Thanks. We will review this profile.');
    onClose();
  };

  const block = async () => {
    setBusy(true);
    const error = await blockLearner(learner.user_id);
    setBusy(false);
    if (error) return toast(error);
    haptic.success();
    toast(`${learner.display_name} is blocked. Unblock any time in Account.`);
    onBlocked(learner.user_id);
    onClose();
  };

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(180)} style={styles.backdrop}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View entering={SlideInDown.springify().damping(20)} style={[styles.sheet, { paddingBottom: 20 + insets.bottom }]} accessibilityViewIsModal>
        <View style={styles.grabber} />

        {step === 'card' ? (
          <>
            <View style={styles.who}>
              {learner.avatar_url ? <Avatar uri={learner.avatar_url} size={64} /> : <Yatri size={70} outfit={learner.outfit} />}
              <View style={{ flex: 1, gap: 2 }}>
                <T variant="title" numberOfLines={1} accessibilityRole="header">
                  {learner.display_name}
                </T>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <T variant="label" color={colors.primary}>
                    {learner.week_xp} XP this week
                  </T>
                  {learner.streak > 0 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Glyph name="flame" size={14} color={colors.saffron} />
                      <T variant="labelSm" color={colors.ink2}>
                        {learner.streak}
                      </T>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            {bio ? (
              <T variant="bodySm" color={colors.inkBody}>
                {bio}
              </T>
            ) : null}
            <View style={styles.actions}>
              <Button
                variant="outline"
                height={46}
                label="Report"
                icon={(c) => <Icon name="flag" size={18} color={c} />}
                onPress={() => setStep('report')}
                style={{ flex: 1 }}
              />
              <Button variant="outline" height={46} label="Block" onPress={() => setStep('block')} style={{ flex: 1 }} />
            </View>
          </>
        ) : step === 'report' ? (
          <>
            <T variant="title" accessibilityRole="header">
              What’s wrong with this profile?
            </T>
            <T variant="bodySm" color={colors.ink2}>
              Reports are anonymous. {learner.display_name} won’t know it was you.
            </T>
            <View style={{ gap: 8 }}>
              {REPORT_REASONS.map((r) => (
                <Pressable
                  key={r.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Report: ${r.label}`}
                  disabled={busy}
                  onPress={() => report(r.id)}
                  style={({ pressed }) => [styles.reason, pressed && { backgroundColor: colors.primarySoft }]}>
                  <T variant="label" style={{ flex: 1 }}>
                    {r.label}
                  </T>
                  <Icon name="chevronRight" size={18} color={colors.ink3} />
                </Pressable>
              ))}
            </View>
            <Button variant="ghost" height={44} label="Cancel" onPress={() => setStep('card')} />
          </>
        ) : (
          <>
            <T variant="title" accessibilityRole="header">
              Block {learner.display_name}?
            </T>
            <T variant="bodySm" color={colors.ink2}>
              They won’t appear in your league any more. They aren’t told. You can unblock them in Account.
            </T>
            <Button variant="danger" label="Block" disabled={busy} onPress={block} />
            <Button variant="ghost" height={44} label="Cancel" onPress={() => setStep('card')} />
          </>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(22,20,43,0.45)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 16,
    gap: 12,
    boxShadow: '0 -10px 40px rgba(22,20,43,0.2)',
  },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: colors.line },
  who: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  actions: { flexDirection: 'row', gap: 10 },
  reason: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.line },
});
