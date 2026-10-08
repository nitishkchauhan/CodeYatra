import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { Platform, ScrollView, Share, StyleSheet, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { TrackBadge } from '@/components/TrackBadge';
import { Button } from '@/components/ui/Button';
import { Glyph } from '@/components/ui/Icon';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { STAGES, stageProgress } from '@/content';
import { captureView } from '@/lib/capture';
import { PLAY_URL } from '@/lib/community';
import { track } from '@/lib/telemetry';
import { countsAsLesson } from '@/state/model';
import { useProgress } from '@/state/progress';
import { colors, fonts } from '@/theme';

/** A story-sized card of the learner's streak and progress, made for WhatsApp and Instagram. */
export default function ShareProgress() {
  const { state, streak } = useProgress();
  const toast = useToast();
  const shot = useRef<View>(null);
  const [busy, setBusy] = useState(false);
  const lessons = Object.keys(state.completed).filter(countsAsLesson).length;
  const top = STAGES.map((s) => ({ s, pct: stageProgress(s, state.completed).pct }))
    .filter((x) => x.pct > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);
  const text = `🔥 ${streak}-day coding streak on CodeYatra! ${lessons} lessons done, ${state.xp} XP. Learn with me: ${PLAY_URL}`;

  const share = async () => {
    track('share_progress');
    if (Platform.OS === 'web' || !(await Sharing.isAvailableAsync())) {
      await Share.share({ message: text });
      return;
    }
    try {
      setBusy(true);
      const uri = await captureView(shot);
      if (uri) await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Share your progress' });
    } catch {
      toast('Could not share right now');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Share progress" close />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, alignItems: 'center' }}>
        <Animated.View entering={ZoomIn.springify().damping(15)}>
          <View ref={shot} collapsable={false} style={styles.card}>
            <View style={[styles.glow, { top: -60, right: -60 }]} />
            <View style={[styles.glow, { bottom: -80, left: -70, backgroundColor: '#FF9F1C22' }]} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar uri={state.avatar ?? state.avatarUrl} color={state.avatarColor} outfit={state.outfit} size={56} />
              <View style={{ flex: 1 }}>
                <T variant="title" color="#FFFFFF" numberOfLines={1}>
                  {state.name || 'Explorer'}
                </T>
                <T variant="caption" color="#B9B6F2">
                  is learning to code on CodeYatra
                </T>
              </View>
            </View>
            <View style={styles.streak}>
              <Glyph name="flame" size={44} color={colors.saffron} />
              <T style={styles.big}>{streak}</T>
              <T variant="label" color="#FFFFFF">
                day streak
              </T>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {[
                { v: state.xp.toLocaleString('en-IN'), l: 'XP' },
                { v: String(lessons), l: 'lessons' },
                { v: String(Object.keys(state.certificates).length), l: 'certificates' },
              ].map((s) => (
                <View key={s.l} style={styles.stat}>
                  <T variant="heading" color="#FFFFFF">
                    {s.v}
                  </T>
                  <T variant="caption" color="#B9B6F2">
                    {s.l}
                  </T>
                </View>
              ))}
            </View>
            {top.length ? (
              <View style={{ gap: 8 }}>
                {top.map(({ s, pct }) => (
                  <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TrackBadge stage={s} size={26} />
                    <View style={styles.track}>
                      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: s.badgeBg === '#16142B' ? '#FFFFFF' : s.badgeBg }]} />
                    </View>
                    <T variant="labelSm" color="#FFFFFF" style={{ width: 38, textAlign: 'right' }}>
                      {pct}%
                    </T>
                  </View>
                ))}
              </View>
            ) : null}
            <T style={styles.brand}>
              <T style={{ color: '#FFFFFF', fontFamily: fonts.display }}>Code</T>
              <T style={{ color: colors.saffron, fontFamily: fonts.display }}>Yatra</T>
              <T variant="caption" color="#B9B6F2">
                {'  '}· Learn to Code. Play the Journey.
              </T>
            </T>
          </View>
        </Animated.View>
        <Button label={busy ? 'Preparing…' : 'Share'} disabled={busy} onPress={share} style={{ alignSelf: 'stretch' }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { width: 320, borderRadius: 28, backgroundColor: '#06104A', padding: 22, gap: 18, overflow: 'hidden' },
  glow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#4B3FD844' },
  streak: { alignItems: 'center', gap: 2, paddingVertical: 6 },
  big: { fontFamily: fonts.display, fontSize: 64, lineHeight: 70, color: '#FFFFFF' },
  stat: { flex: 1, borderRadius: 16, backgroundColor: '#FFFFFF14', paddingVertical: 10, alignItems: 'center' },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF22', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
  brand: { fontSize: 18 },
});
