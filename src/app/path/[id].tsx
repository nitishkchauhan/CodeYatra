import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
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
import { checkpointId, hasCheckpoint } from '@/content/checkpoints';
import { findPath, pathSummary, stopProgress, type CareerPath, type PathStop } from '@/content/paths';
import { findStop, needsRevision, nodeState, searchStops, suggestions, type Evidence, type NodeState } from '@/content/paths/graph';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { card, colors, fonts } from '@/theme';

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

const SUGGESTION_ICON = { revise: 'reset', continue: 'route', next: 'flag', checkpoint: 'star' } as const;

function Journey({ path }: { path: CareerPath }) {
  const toast = useToast();
  const { state, setPath } = useProgress();
  const [open, setOpen] = useState<PathStop | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [query, setQuery] = useState('');
  const scroller = useRef<ScrollView>(null);
  const mapTop = useRef(0);
  const places = useRef<Record<string, number>>({});
  const summary = pathSummary(path, state.completed, state.pathMarks);
  const following = state.pathId === path.id;
  const ev: Evidence = { completed: state.completed, marks: state.pathMarks, mistakes: state.mistakes, checkpoints: state.checkpoints };
  const tips = suggestions(path, ev, (si) => (hasCheckpoint(path, si) ? checkpointId(path.id, si) : null));
  const matches = useMemo(() => searchStops(path, query), [path, query]);
  const lit = useMemo(() => new Set(matches.map((m) => m.id)), [matches]);
  const saved = path.sections.flatMap((s) => s.stops).filter((s) => state.bookmarks[`${path.id}/${s.id}`]);

  const follow = () => {
    haptic.success();
    setPath(path.id);
    toast(`${path.title} is now your path`);
  };

  /** Scrolls the map to a stop; in list view it simply opens it. */
  const goTo = (stopId: string, openIt = false) => {
    const y = places.current[stopId];
    if (view === 'map' && y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, mapTop.current + y - 120), animated: true });
    const stop = findStop(path, stopId);
    if (stop && (openIt || view === 'list')) setOpen(stop);
  };

  const openCheckpoint = (si: number) => {
    const section = path.sections[si];
    const ready = section.stops.filter((s) => !s.optional).every((s) => nodeState(path, s, ev) === 'done');
    if (!ready) toast('You can take it now, but it tests every lesson in this section.');
    router.push({ pathname: '/lesson/[id]', params: { id: checkpointId(path.id, si) } });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={path.title} subtitle={`${summary.stops} stops · about ${path.months} (estimate)`} />
      <ScrollView ref={scroller} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, paddingTop: 4, paddingBottom: 32, gap: 16 }}>
        <Animated.View entering={FadeInDown.duration(320)} style={[styles.hero, { backgroundColor: path.soft }]}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={[styles.badge, { backgroundColor: path.color }]}>
              <Icon d={path.icon} size={26} color="#FFFFFF" />
            </View>
            <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
              {path.job}
            </T>
          </View>
          <View style={styles.facts}>
            <Fact label="Level" value={path.level} />
            <Fact label="Before you start" value={path.before} />
          </View>
          <View style={{ gap: 6 }}>
            <View style={styles.rowBetween}>
              <T variant="label">Job-ready</T>
              <T variant="label" color={path.ink}>
                {summary.pct}% · {summary.done} of {summary.total}
              </T>
            </View>
            <Bar value={summary.pct / 100} color={path.color} track="#FFFFFF" height={10} />
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

        {tips.length ? (
          <Animated.View entering={FadeInDown.delay(40).duration(320)} style={[card, { padding: 14, gap: 10 }]}>
            <T variant="label">What to do next</T>
            {tips.map((t) => (
              <Pressable
                key={t.stopId + t.kind}
                accessibilityRole="button"
                accessibilityLabel={t.reason}
                onPress={() => {
                  haptic.tap();
                  if (t.kind === 'checkpoint') openCheckpoint(path.sections.findIndex((s) => s.stops.some((x) => x.id === t.stopId)));
                  else goTo(t.stopId, true);
                }}
                style={({ pressed }) => [styles.tip, pressed && { backgroundColor: colors.lineSoft }]}>
                <Icon name={SUGGESTION_ICON[t.kind]} size={18} color={t.kind === 'revise' ? colors.saffronInk : path.ink} />
                <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
                  {t.reason}
                </T>
                <Icon name="chevronRight" size={16} color={colors.ink3} />
              </Pressable>
            ))}
          </Animated.View>
        ) : null}

        <View style={styles.search}>
          <Icon name="search" size={18} color={colors.ink3} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search this roadmap, e.g. loops"
            placeholderTextColor={colors.ink3}
            accessibilityLabel="Search this roadmap"
            returnKeyType="search"
            onSubmitEditing={() => matches[0] && goTo(matches[0].id)}
            style={styles.searchInput}
          />
          {query ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8} onPress={() => setQuery('')}>
              <Icon name="close" size={18} color={colors.ink3} />
            </Pressable>
          ) : null}
        </View>
        {query ? (
          <View style={{ gap: 6, marginTop: -8 }} accessibilityLiveRegion="polite">
            <T variant="caption">{matches.length ? `${matches.length} ${matches.length === 1 ? 'stop' : 'stops'} found, highlighted below` : 'No stops match. Try another word.'}</T>
            <View style={styles.chips}>
              {matches.slice(0, 6).map((m) => (
                <Chip key={m.id} text={m.title} onPress={() => goTo(m.id, true)} />
              ))}
            </View>
          </View>
        ) : saved.length ? (
          <View style={{ gap: 6, marginTop: -8 }}>
            <T variant="caption">Saved stops</T>
            <View style={styles.chips}>
              {saved.map((m) => (
                <Chip key={m.id} text={m.title} icon="bookmark" onPress={() => goTo(m.id, true)} />
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={[styles.segment, { flex: 1 }]} accessibilityRole="tablist">
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
          {summary.next ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Jump to my next stop" onPress={() => goTo(summary.next!.id, view === 'list')} style={styles.jump}>
              <Icon name="route" size={16} color={colors.primary} />
              <T variant="labelSm" color={colors.primary}>
                My stop
              </T>
            </Pressable>
          ) : null}
        </View>

        {view === 'map' ? (
          <View
            onLayout={(e) => {
              mapTop.current = e.nativeEvent.layout.y;
            }}>
            <RoadmapMap
              path={path}
              nextId={summary.next?.id ?? null}
              onOpen={setOpen}
              onCheckpoint={openCheckpoint}
              highlight={query ? lit : undefined}
              onPlace={(id, y) => {
                places.current[id] = y;
              }}
            />
          </View>
        ) : (
          path.sections.map((section, si) => (
            <Animated.View key={section.title} entering={FadeInDown.delay(60 + si * 40).duration(320)}>
              <View style={styles.sectionHead}>
                <View style={[styles.sectionNum, { backgroundColor: path.color }]}>
                  <T variant="labelSm" color="#FFFFFF">
                    {si + 1}
                  </T>
                </View>
                <T variant="kicker" color={colors.ink2}>
                  {section.title.toUpperCase()}
                </T>
              </View>
              {section.stops.map((stop, i) => (
                <Station
                  key={stop.id}
                  path={path}
                  stop={stop}
                  state={nodeState(path, stop, ev)}
                  revise={needsRevision(stop, ev).length > 0}
                  isNext={summary.next?.id === stop.id}
                  last={i === section.stops.length - 1 && !hasCheckpoint(path, si)}
                  dim={!!query && !lit.has(stop.id)}
                  progress={stopProgress(path.id, stop, state.completed, state.pathMarks)}
                  onPress={() => setOpen(stop)}
                />
              ))}
              {hasCheckpoint(path, si) ? (
                <Pressable accessibilityRole="button" onPress={() => openCheckpoint(si)} style={[styles.stop, { marginLeft: 46, borderColor: colors.saffron }]}>
                  <Icon name="star" size={18} color={colors.saffronInk} />
                  <T variant="label" color={colors.saffronInk} style={{ flex: 1 }}>
                    {(() => {
                      const c = state.checkpoints[checkpointId(path.id, si)];
                      return c ? `Checkpoint · ${c.pass ? 'mastered' : 'retake'} · best ${c.best}/${c.total}` : `${section.title} checkpoint`;
                    })()}
                  </T>
                  <Icon name="chevronRight" size={16} color={colors.ink3} />
                </Pressable>
              ) : null}
            </Animated.View>
          ))
        )}

        <View style={[card, styles.end]}>
          <Icon name="flag" size={22} color={path.color} />
          <T variant="bodySm" color={colors.inkBody} style={{ flex: 1 }}>
            Each stop has five levels: not started, in progress, completed (lessons done), practice passed, and mastered (section checkpoint passed). Only your answers move a stop up.
          </T>
        </View>
      </ScrollView>
      {open ? <PathStopSheet key={open.id} path={path} stop={open} onClose={() => setOpen(null)} onGo={(id) => setOpen(findStop(path, id) ?? null)} /> : null}
    </SafeAreaView>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fact}>
      <T variant="caption" style={{ fontSize: 11 }}>
        {label}
      </T>
      <T variant="labelSm" color={colors.ink}>
        {value}
      </T>
    </View>
  );
}

function Chip({ text, icon, onPress }: { text: string; icon?: 'bookmark'; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Go to ${text}`} onPress={onPress} style={styles.chip}>
      {icon ? <Icon name={icon} size={13} color={colors.primary} /> : null}
      <T variant="labelSm" color={colors.primary} numberOfLines={1}>
        {text}
      </T>
    </Pressable>
  );
}

const STATE_LABEL: Record<NodeState, string> = { done: 'done', progress: 'in progress', available: 'ready to learn', early: 'comes later' };

function Station({
  path,
  stop,
  state,
  revise,
  isNext,
  last,
  dim,
  progress,
  onPress,
}: {
  path: CareerPath;
  stop: PathStop;
  state: NodeState;
  revise: boolean;
  isNext: boolean;
  last: boolean;
  dim: boolean;
  progress: number;
  onPress: () => void;
}) {
  const done = state === 'done';
  const inApp = (stop.modules?.length ?? 0) > 0;
  return (
    <View style={[styles.station, dim && { opacity: 0.35 }]}>
      <View style={styles.rail}>
        <View
          style={[
            styles.stationDot,
            stop.optional && { borderStyle: 'dashed', borderColor: colors.ink3 },
            done && { backgroundColor: colors.success, borderColor: colors.success },
            isNext && { borderColor: path.color, borderWidth: 3, backgroundColor: '#FFFFFF' },
          ]}>
          {done ? (
            <Icon name="check" size={14} color="#FFFFFF" strokeWidth={3} />
          ) : state === 'progress' ? (
            <Ring value={progress} size={22} stroke={3} color={path.color} track={colors.lineSoft} />
          ) : state === 'early' ? (
            <Icon name="lock" size={12} color={colors.ink3} />
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
        accessibilityLabel={`${stop.title}, ${STATE_LABEL[state]}${revise ? ', needs revision' : ''}${isNext ? ', next stop' : ''}${stop.optional ? ', optional' : ''}${stop.project ? ', project' : ''}`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.stop,
          isNext && { borderColor: path.color, borderWidth: 2, backgroundColor: path.soft },
          revise && { borderColor: colors.saffron, borderWidth: 2 },
          stop.optional && !isNext && { borderStyle: 'dashed', borderColor: '#C9C6DA' },
          pressed && { transform: [{ scale: 0.98 }] },
        ]}>
        <View style={{ flex: 1, gap: 3 }}>
          <T variant="label" color={done ? colors.ink2 : colors.ink}>
            {stop.title}
          </T>
          <View style={styles.stopMeta}>
            {revise ? <Tag text="Needs revision" color={colors.saffronInk} solid /> : null}
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
      <T variant="labelSm" color={solid ? '#FFFFFF' : color} style={{ fontSize: 10.5 }}>
        {text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 16, gap: 14 },
  badge: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  facts: { flexDirection: 'row', gap: 8 },
  fact: { flex: 1, borderRadius: 12, backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 8, gap: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  following: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 40, paddingHorizontal: 12, borderRadius: 12, backgroundColor: '#FFFFFF' },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 48, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.bg },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 48, paddingHorizontal: 14, borderRadius: 24, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  searchInput: { flex: 1, minHeight: 46, fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { maxWidth: '100%', minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, borderRadius: 18, backgroundColor: colors.primarySoft },
  jump: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
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
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  end: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16 },
});
