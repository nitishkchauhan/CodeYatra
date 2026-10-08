import * as Sharing from 'expo-sharing';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Yatri } from '@/components/Yatri';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Bar } from '@/components/ui/Progress';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { captureView } from '@/lib/capture';
import { getLesson, STAGES } from '@/content';
import { useProgress } from '@/state/progress';
import { colors, fonts } from '@/theme';

const longDate = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function CertificateScreen() {
  const { stageId } = useLocalSearchParams<{ stageId: string }>();
  const { state } = useProgress();
  const toast = useToast();
  const shot = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  const stage = STAGES.find((s) => s.id === stageId) ?? STAGES[0];
  const cert = state.certificates[stage.id];
  const written = stage.units.flatMap((u) => u.lessons).filter((l) => getLesson(l.id));
  const done = written.filter((l) => state.completed[l.id]).length;

  const share = async () => {
    if (Platform.OS === 'web' || !(await Sharing.isAvailableAsync())) {
      toast('Sharing works in the Android app');
      return;
    }
    try {
      setSharing(true);
      const uri = await captureView(shot);
      if (uri) await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Share your CodeYatra certificate' });
    } catch {
      toast('Could not share right now');
    } finally {
      setSharing(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Certificate" subtitle={stage.name} close />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 16, paddingBottom: 32 }}>
        {cert ? (
          <>
            <Animated.View entering={ZoomIn.springify().damping(16)}>
              <View ref={shot} collapsable={false}>
                <View style={styles.paper} accessible accessibilityLabel={`Certificate of completion for ${stage.name}, awarded to ${cert.name} on ${longDate(cert.date)}`}>
                  <View style={[styles.border, { borderColor: stage.color }]}>
                    <View style={styles.inner}>
                      <View style={[styles.seal, { backgroundColor: stage.color }]}>
                        <Yatri size={52} mood="celebrate" outfit="grad-cap" dark />
                      </View>
                      <T variant="kicker" color={colors.ink3} style={{ letterSpacing: 2, marginTop: 8 }}>
                        CERTIFICATE OF COMPLETION
                      </T>
                      <T variant="bodySm" color={colors.ink2} style={{ marginTop: 12 }}>
                        This certifies that
                      </T>
                      <T style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                        {cert.name}
                      </T>
                      <View style={[styles.rule, { backgroundColor: colors.saffron }]} />
                      <T variant="bodySm" color={colors.inkBody} style={{ textAlign: 'center' }}>
                        completed <T variant="label">{stage.name}</T> on CodeYatra, covering {stage.sub}.
                      </T>
                      <View style={styles.footer}>
                        <View>
                          <T variant="label">{longDate(cert.date)}</T>
                          <T variant="caption">Date</T>
                        </View>
                        <T style={{ fontFamily: fonts.display, fontSize: 18, color: colors.ink }}>
                          Code<T style={{ fontFamily: fonts.display, fontSize: 18, color: colors.saffronShadow }}>Yatra</T>
                        </T>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200)} style={{ gap: 8 }}>
              <Button
                variant="saffron"
                label={sharing ? 'Preparing…' : 'Share certificate'}
                icon={(c) => <Icon d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7 M12 3v13 M7 8l5-5 5 5" size={20} color={c} />}
                disabled={sharing}
                onPress={share}
              />
              <T variant="caption" style={{ textAlign: 'center' }}>
                Share it on WhatsApp, LinkedIn or with your teacher.
              </T>
            </Animated.View>
          </>
        ) : (
          <Animated.View entering={FadeInDown} style={styles.locked}>
            <Yatri size={96} mood="focus" outfit="grad-cap" />
            <T variant="title" style={{ textAlign: 'center' }}>
              Finish {stage.name} to earn this certificate
            </T>
            <T variant="bodySm" color={colors.ink2} style={{ textAlign: 'center' }}>
              {done} of {written.length} lessons complete
            </T>
            <View style={{ alignSelf: 'stretch' }}>
              <Bar value={written.length ? done / written.length : 0} color={stage.color} height={10} />
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paper: { backgroundColor: '#FFFDF7', borderRadius: 20, padding: 10 },
  border: { borderWidth: 2, borderRadius: 14, padding: 4 },
  inner: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#C9C4F6', borderRadius: 10, padding: 18, alignItems: 'center' },
  seal: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#FFC56B' },
  name: { fontFamily: fonts.display, fontSize: 30, lineHeight: 38, color: colors.primary, marginTop: 2 },
  rule: { width: 140, height: 2, borderRadius: 1, marginVertical: 10 },
  footer: { alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 22 },
  locked: { alignItems: 'center', gap: 10, padding: 24, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
});
