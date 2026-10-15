import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PathStopSheet } from '@/components/PathStopSheet';
import { RoadmapMap } from '@/components/RoadmapMap';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Bar, Ring } from '@/components/ui/Progress';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { findPath, pathSummary, stopProgress, stopStatus, type CareerPath, type PathStop, type StopStatus } from '@/content/paths';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors } from '@/theme';

export default function PathScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const path = findPath(id);
  if (!path) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Path not found" />
      </SafeAreaView>
    );
  }
  return <Journey path={path} />;
}

function Journey({ path }: { path: CareerPath }) {
  const toast = useToast();
  const { state, setPath } = useProgress();
  const [open, setOpen] = useState<PathStop | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');
  const summary = pathSummary(path, state.completed, state.pathMarks);
  const following = state.pathId === path.id;

  const follow = () => {
    haptic.success();
    setPath(path.id);
    toast(`${path.title} is now your path`);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={path.title} subtitle={`${summary.stops} stops · ${path.months}`} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, paddingBottom: 32, gap: 16 }}>
        <Animated.View entering={FadeInDown.duration(320)} style={[styles.hero, { backgroundColor: path.soft }]}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={[styles.badge, { backgroundColor: path.color }]}>
              <Icon d={path.icon} size={26} color={colors.onColor} />
            </View>
            <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
              {path.job}
            </T>
          </View>
          <View style={{ gap: 6 }}>
            <View style={styles.rowBetween}>
              <T variant="label">Job-ready</T>
              <T variant="label" color={path.ink}>
                {summary.pct}% · {summary.done} of {summary.total}
              </T>
            </View>
            <Bar value={summary.pct / 100} color={path.color} track="rgba(255,255,255,0.14)" height={10} />
          </View>
          {following ? (
            <View style={styles.following}>
              <Icon name="check" size={16} color={colors.success} strokeWidth={3} />
              <T variant="labelSm" color={colors.success} style={{ flex: 1 }}>
                This is your path
              </T>
              <Pressable accessibilityRole="button" onPress={() => setPath(null)} hitSlop={8}>
                <T variant="labelSm" color={colors.ink3}>
                  Stop following
                </T>
              </Pressable>
            </View>
          ) : (
            <Button label="Make this my path" onPress={follow} />
          )}
        </Animated.View>

        <View style={styles.segment} accessibilityRole="tablist">
          {(['map', 'list'] as const).map((v) => (
            <Pressable
              key={v}
              accessibilityRole="tab"
              accessibilityState={{ selected: view === v }}
              onPress={() => setView(v)}
              style={[styles.segmentBtn, view === v && styles.segmentOn]}>
              <T variant="labelSm" color={view === v ? colors.ink : colors.ink3}>
                {v === 'map' ? 'Roadmap' : 'List'}
              </T>
            </Pressable>
          ))}
        </View>

        {view === 'map' ? (
          <RoadmapMap path={path} nextId={summary.next?.id ?? null} onOpen={setOpen} />
        ) : (
          <>
            {path.sections.map((section, si) => (
              <Animated.View key={section.title} entering={FadeInDown.delay(60 + si * 40).duration(320)} style={{ gap: 0 }}>
                <View style={styles.sectionHead}>
                  <View style={[styles.sectionNum, { backgroundColor: path.color }]}>
                    <T variant="labelSm" color={colors.onColor}>
                      {si + 1}
                    </T>
                  </View>
                  <T variant="kicker" color={colors.ink2}>
                    {section.title.toUpperCase()}
                  </T>
                </View>
                {section.stops.map((stop, i) => {
                  const status = stopStatus(path.id, stop, state.completed, state.pathMarks);
                  const isNext = summary.next?.id === stop.id;
                  const last = i === section.stops.length - 1;
                  return (
                    <Station
                      key={stop.id}
                      path={path}
                      stop={stop}
                      status={status}
                      isNext={isNext}
                      last={last}
                      progress={stopProgress(path.id, stop, state.completed, state.pathMarks)}
                      onPress={() => setOpen(stop)}
                    />
                  );
                })}
              </Animated.View>
            ))}
          </>
        )}

        <View style={[card, styles.end]}>
          <Icon name="flag" size={22} color={path.color} />
          <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
            Finish the required stops to become job-ready. Optional stops make you stand out.
          </T>
        </View>
      </ScrollView>
      {open ? <PathStopSheet key={open.id} path={path} stop={open} onClose={() => setOpen(null)} /> : null}
    </SafeAreaView>
  );
}

const STATUS_LABEL: Record<StopStatus, string> = { done: 'done', progress: 'in progress', todo: 'not started' };

function Station({
  path,
  stop,
  status,
  isNext,
  last,
  progress,
  onPress,
}: {
  path: CareerPath;
  stop: PathStop;
  status: StopStatus;
  isNext: boolean;
  last: boolean;
  progress: number;
  onPress: () => void;
}) {
  const done = status === 'done';
  const inApp = (stop.modules?.length ?? 0) > 0;
  return (
    <View style={styles.station}>
      <View style={styles.rail}>
        <View
          style={[
            styles.stationDot,
            stop.optional && { borderStyle: 'dashed', borderColor: colors.ink3 },
            done && { backgroundColor: colors.success, borderColor: colors.success },
            isNext && { borderColor: path.color, borderWidth: 3, backgroundColor: colors.onColor },
          ]}>
          {done ? (
            <Icon name="check" size={14} color={colors.onColor} strokeWidth={3} />
          ) : status === 'progress' ? (
            <Ring value={progress} size={22} stroke={3} color={path.color} track={colors.lineSoft} />
          ) : stop.project ? (
            <Icon name="flag" size={13} color={isNext ? path.color : colors.ink3} strokeWidth={2.2} />
          ) : isNext ? (
            <View style={[styles.nextDot, { backgroundColor: path.color }]} />
          ) : null}
        </View>
        {!last ? <View style={[styles.railLine, done && { backgroundColor: colors.success }]} /> : null}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${stop.title}, ${STATUS_LABEL[status]}${isNext ? ', next stop' : ''}${stop.optional ? ', optional' : ''}${stop.project ? ', project' : ''}`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.stop,
          isNext && { borderColor: path.color, borderWidth: 2, backgroundColor: path.soft },
          stop.optional && !isNext && { borderStyle: 'dashed', borderColor: '#C9C6DA' },
          pressed && { transform: [{ scale: 0.98 }] },
        ]}>
        <View style={{ flex: 1, gap: 3 }}>
          <T variant="label" color={done ? colors.ink2 : colors.ink}>
            {stop.title}
          </T>
          <View style={styles.stopMeta}>
            {isNext ? <Tag text="Next stop" color={path.ink} solid /> : null}
            {stop.project ? <Tag text="Project" color={colors.saffronInk} /> : null}
            {stop.optional ? <Tag text="Optional" color={colors.ink3} /> : null}
            {stop.choice ? <Tag text={`Pick one: ${stop.choice}`} color={colors.ink3} /> : null}
            <T variant="caption">{inApp ? `${stop.modules!.length} ${stop.modules!.length === 1 ? 'lesson' : 'lessons'} here` : 'Free links'}</T>
          </View>
        </View>
        <Icon name="chevronRight" size={16} color={colors.ink3} />
      </Pressable>
    </View>
  );
}

function Tag({ text, color, solid }: { text: string; color: string; solid?: boolean }) {
  return (
    <View style={[styles.tag, solid ? { backgroundColor: color } : { borderColor: color, borderWidth: 1 }]}>
      <T variant="labelSm" color={solid ? colors.onColor : color} style={{ fontSize: 10.5 }}>
        {text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 16, gap: 14 },
  badge: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  following: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 40, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)' },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  sectionNum: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 6 },
  station: { flexDirection: 'row', gap: 10 },
  rail: { width: 36, alignItems: 'center' },
  stationDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  nextDot: { width: 10, height: 10, borderRadius: 5 },
  railLine: { flex: 1, width: 3, backgroundColor: colors.line, marginTop: 2, borderRadius: 2 },
  stop: {
    flex: 1,
    minHeight: 60,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  stopMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  tag: { minHeight: 20, paddingHorizontal: 7, borderRadius: 10, justifyContent: 'center' },
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 12, padding: 3 },
  segmentBtn: { flex: 1, minHeight: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segmentOn: { backgroundColor: 'rgba(255,255,255,0.16)' },
  end: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16 },
});
