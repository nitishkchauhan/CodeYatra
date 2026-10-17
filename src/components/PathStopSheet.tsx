import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { drillId, getLesson, hasDrill } from '@/content';
import { nextModule, stopStatus, type CareerPath, type PathLink, type PathStop } from '@/content/paths';
import { findStop, needsRevision, nodeState, prerequisites, unlocks } from '@/content/paths/graph';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

const KIND: Record<PathLink['kind'], string> = { docs: 'Guide', course: 'Course', video: 'Videos', practice: 'Practice' };

/**
 * A path stop: why it matters, what it builds on and opens up, the CodeYatra lessons and
 * practice that teach it, and free outside links. `onGo` switches the sheet to another stop.
 */
export function PathStopSheet({ path, stop, onClose, onGo }: { path: CareerPath; stop: PathStop; onClose: () => void; onGo?: (stopId: string) => void }) {
  const insets = useSafeAreaInsets();
  const { state, togglePathMark, toggleBookmark } = useProgress();
  const ev = { completed: state.completed, marks: state.pathMarks, mistakes: state.mistakes, checkpoints: state.checkpoints };
  const before = (prerequisites(path).get(stop.id) ?? []).map((g) => g.map((id) => findStop(path, id)!).filter(Boolean));
  const after = unlocks(path, stop.id);
  const revise = needsRevision(stop, ev);
  const saved = !!state.bookmarks[`${path.id}/${stop.id}`];
  const early = nodeState(path, stop, ev) === 'early';
  const openLesson = (id: string) => {
    haptic.tap();
    onClose();
    router.push({ pathname: '/lesson/[id]', params: { id } });
  };
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
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
              <T variant="title" accessibilityRole="header" style={{ flex: 1 }}>
                {stop.title}
              </T>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={saved ? 'Remove from saved stops' : 'Save this stop'}
                accessibilityState={{ selected: saved }}
                hitSlop={8}
                onPress={() => {
                  haptic.tap();
                  toggleBookmark(path.id, stop.id);
                }}
                style={[styles.save, saved && { backgroundColor: colors.primarySoft, borderColor: colors.primary }]}>
                <Icon name="bookmark" size={18} color={saved ? colors.primary : colors.ink3} />
              </Pressable>
            </View>
            <T variant="bodySm" color={colors.inkBody}>
              {stop.why}
            </T>
          </View>

          {revise.length ? (
            <View style={styles.revise}>
              <Icon name="reset" size={18} color={colors.saffronInk} />
              <T variant="bodySm" color={colors.warnInk} style={{ flex: 1 }}>
                Needs revision: you missed questions in {revise.map((m) => getLesson(m)?.title ?? m).join(', ')}. Practise or replay it below.
              </T>
            </View>
          ) : null}

          {before.length || after.length ? (
            <View style={{ gap: 8 }}>
              {before.length ? (
                <View style={{ gap: 6 }}>
                  <T variant="label">Builds on</T>
                  {early ? (
                    <T variant="caption" color={colors.ink2}>
                      You can start now, but it will be easier after these.
                    </T>
                  ) : null}
                  <View style={styles.chips}>
                    {before.map((g) => (
                      <StopChip
                        key={g.map((x) => x.id).join('|')}
                        text={g.map((x) => x.title).join(' or ')}
                        done={g.some((x) => stopStatus(path.id, x, state.completed, state.pathMarks) === 'done')}
                        onPress={() => onGo?.(g[0].id)}
                      />
                    ))}
                  </View>
                </View>
              ) : null}
              {after.length ? (
                <View style={{ gap: 6 }}>
                  <T variant="label">Opens up</T>
                  <View style={styles.chips}>
                    {after.slice(0, 6).map((x) => (
                      <StopChip key={x.id} text={x.title} done={stopStatus(path.id, x, state.completed, state.pathMarks) === 'done'} onPress={() => onGo?.(x.id)} />
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

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
                  <View key={m} style={styles.lesson}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${getLesson(m)?.title ?? m}, ${done ? 'done, open again' : 'open lesson'}`}
                      onPress={() => openLesson(m)}
                      style={({ pressed }) => [styles.lessonBtn, pressed && { backgroundColor: colors.lineSoft }]}>
                      <View style={[styles.dot, done ? { backgroundColor: colors.success, borderColor: colors.success } : null]}>
                        {done ? <Icon name="check" size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                      </View>
                      <T variant="bodySm" color={done ? colors.ink2 : colors.ink} style={{ flex: 1 }} numberOfLines={1}>
                        {getLesson(m)?.title ?? m}
                      </T>
                    </Pressable>
                    {hasDrill(m) ? (
                      <Pressable accessibilityRole="button" accessibilityLabel={`Practise ${getLesson(m)?.title ?? m}`} onPress={() => openLesson(drillId(m))} style={styles.practise}>
                        <T variant="labelSm" color={colors.primary}>
                          Practise
                        </T>
                      </Pressable>
                    ) : null}
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

function StopChip({ text, done, onPress }: { text: string; done: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${text}, ${done ? 'done' : 'not done'}. Show this stop`}
      onPress={onPress}
      style={[styles.stopChip, done && { borderColor: colors.success, backgroundColor: colors.successSoft }]}>
      {done ? <Icon name="check" size={13} color={colors.success} strokeWidth={3} /> : null}
      <T variant="labelSm" color={done ? colors.successInk : colors.ink2} numberOfLines={1}>
        {text}
      </T>
    </Pressable>
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
  lesson: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lessonBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44, paddingHorizontal: 6, borderRadius: 10 },
  practise: { minHeight: 36, paddingHorizontal: 12, borderRadius: 18, justifyContent: 'center', backgroundColor: colors.primarySoft },
  save: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  revise: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', borderRadius: 14, backgroundColor: colors.warnSoft, borderWidth: 1, borderColor: colors.warnLine, padding: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  stopChip: { maxWidth: '100%', minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, borderRadius: 18, borderWidth: 1, borderColor: colors.line },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  link: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.line },
});
