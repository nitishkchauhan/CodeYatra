import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { getLesson } from '@/content';
import { nextModule, stopStatus, type CareerPath, type PathLink, type PathStop } from '@/content/paths';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

const KIND: Record<PathLink['kind'], string> = { docs: 'Guide', course: 'Course', video: 'Videos', practice: 'Practice' };

/** A path stop: why it matters, the CodeYatra lessons that teach it, and free outside links. */
export function PathStopSheet({ path, stop, onClose }: { path: CareerPath; stop: PathStop; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { state, togglePathMark } = useProgress();
  const mods = stop.modules ?? [];
  const finished = mods.filter((m) => state.completed[m]).length;
  const marked = !!state.pathMarks[`${path.id}/${stop.id}`];
  const status = stopStatus(path.id, stop, state.completed, state.pathMarks);
  const lessonsDone = mods.length > 0 && finished === mods.length;

  const learn = () => {
    const id = nextModule(stop, state.completed);
    if (!id) return;
    haptic.tap();
    onClose();
    router.push({ pathname: '/lesson/[id]', params: { id } });
  };

  const tags = [
    stop.project ? 'Project' : null,
    stop.optional ? 'Optional' : null,
    stop.choice ? `Pick one · ${stop.choice}` : null,
    mods.length ? `${mods.length} ${mods.length === 1 ? 'lesson' : 'lessons'} in CodeYatra` : 'Learn outside the app',
  ].filter(Boolean) as string[];

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(180)} style={styles.backdrop}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View entering={SlideInDown.springify().damping(20)} style={[styles.sheet, { paddingBottom: 16 + insets.bottom }]} accessibilityViewIsModal>
        <View style={styles.grabber} />
        <ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 14, paddingBottom: 4 }} showsVerticalScrollIndicator={false}>
          <View style={styles.tags}>
            {tags.map((t) => (
              <View key={t} style={[styles.tag, { backgroundColor: path.soft }]}>
                <T variant="labelSm" color={path.ink} style={{ fontSize: 11 }}>
                  {t}
                </T>
              </View>
            ))}
          </View>
          <View style={{ gap: 6 }}>
            <T variant="title" accessibilityRole="header">
              {stop.title}
            </T>
            <T variant="bodySm" color={colors.inkBody}>
              {stop.why}
            </T>
          </View>

          {mods.length ? (
            <View style={{ gap: 8 }}>
              <View style={styles.rowBetween}>
                <T variant="label">Learn it here</T>
                <T variant="labelSm" color={lessonsDone ? colors.success : colors.ink3}>
                  {finished} of {mods.length} done
                </T>
              </View>
              {mods.map((m) => {
                const done = !!state.completed[m];
                return (
                  <View key={m} style={styles.lesson} accessible accessibilityLabel={`${getLesson(m)?.title ?? m}, ${done ? 'done' : 'not done yet'}`}>
                    <View style={[styles.dot, done ? { backgroundColor: colors.success, borderColor: colors.success } : null]}>
                      {done ? <Icon name="check" size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                    </View>
                    <T variant="bodySm" color={done ? colors.ink2 : colors.ink} style={{ flex: 1 }} numberOfLines={1}>
                      {getLesson(m)?.title ?? m}
                    </T>
                  </View>
                );
              })}
            </View>
          ) : null}

          {stop.links?.length ? (
            <View style={{ gap: 8 }}>
              <T variant="label">{mods.length ? 'Go further (free)' : 'Free resources'}</T>
              {stop.links.map((l) => (
                <Pressable
                  key={l.url}
                  accessibilityRole="link"
                  accessibilityLabel={`${l.label}, ${KIND[l.kind]}${l.note ? `, ${l.note}` : ''}. Opens in your browser`}
                  onPress={() => WebBrowser.openBrowserAsync(l.url)}
                  style={({ pressed }) => [styles.link, pressed && { backgroundColor: colors.lineSoft }]}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <T variant="label" style={{ fontSize: 14 }}>
                      {l.label}
                    </T>
                    <T variant="caption">
                      {KIND[l.kind]}
                      {l.note ? ` · ${l.note}` : ''}
                    </T>
                  </View>
                  <Icon name="external" size={18} color={colors.ink3} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </ScrollView>

        <View style={{ gap: 6 }}>
          {mods.length ? (
            <Button
              label={lessonsDone ? 'Review the lessons' : finished ? 'Continue learning' : 'Start learning'}
              variant={lessonsDone ? 'outline' : 'primary'}
              onPress={learn}
            />
          ) : null}
          {!lessonsDone ? (
            <Button
              variant="ghost"
              height={44}
              label={marked ? 'Marked as known · Undo' : status === 'done' ? 'Done' : 'I already know this'}
              accessibilityLabel={marked ? 'Undo: marked as already known' : 'Mark as already known'}
              onPress={() => {
                haptic.tap();
                togglePathMark(path.id, stop.id);
              }}
            />
          ) : null}
        </View>
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
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 16,
    gap: 12,
    boxShadow: '0 -10px 40px rgba(22,20,43,0.2)',
  },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: colors.line },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { minHeight: 24, paddingHorizontal: 9, borderRadius: 12, justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 32 },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  link: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.line },
});
