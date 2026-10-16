import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming, ZoomIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { BRAND } from './Logo';
import { Yatri } from './Yatri';
import { alpha, GlassButton } from './ui/Glass';
import { Glyph, Icon } from './ui/Icon';
import { T } from './ui/Text';
import { drillId, hasDrill, type LessonStatus, type Stage } from '@/content';
import { haptic } from '@/lib/haptics';
import { glass } from '@/theme';

const ROW = 118;
const NODE = 66;
/** Sideways offset of each module node from the centre line, repeating: a gentle zigzag. */
const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];
const offsetOf = (i: number) => OFFSETS[i % OFFSETS.length];
/** Space between footprints, and how far they stay from a node's centre. */
const STEP = 13;
const CLEAR = NODE / 2 + 6;
/** Time between footprints when Yatri walks to the next module. */
const WALK_MS = 110;

type Pt = { x: number; y: number };
type Foot = Pt & { key: string };

/** Footprints along the S-curve from node a to node b, alternating left and right like real steps. */
function footprints(a: Pt, b: Pt, seg: number): Foot[] {
  const c1 = { x: a.x, y: a.y + ROW * 0.5 };
  const c2 = { x: b.x, y: b.y - ROW * 0.5 };
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
      y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
    };
  };
  // Measure the curve, then place a footprint every STEP pixels between the two nodes.
  const samples = Array.from({ length: 61 }, (_, i) => at(i / 60));
  const dist = [0];
  for (let i = 1; i < samples.length; i++) dist.push(dist[i - 1] + Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y));
  const total = dist[dist.length - 1];
  const out: Foot[] = [];
  for (let d = CLEAR, n = 0; d <= total - CLEAR; d += STEP, n++) {
    const i = Math.max(
      1,
      dist.findIndex((x) => x >= d),
    );
    const p = samples[i];
    const q = samples[i - 1];
    const len = Math.hypot(p.x - q.x, p.y - q.y) || 1;
    const side = n % 2 === 0 ? 3.5 : -3.5;
    out.push({ x: p.x + (-(p.y - q.y) / len) * side, y: p.y + ((p.x - q.x) / len) * side, key: `${seg}-${n}` });
  }
  return out;
}

/** Soft ring that grows and fades around the module to do next. */
function Pulse({ color }: { color: string }) {
  const reduce = useReducedMotion();
  const t = useSharedValue(0);
  useEffect(() => {
    if (!reduce) t.set(withRepeat(withTiming(1, { duration: 1700, easing: Easing.out(Easing.quad) }), -1));
  }, [reduce, t]);
  const style = useAnimatedStyle(() => ({ opacity: 0.55 * (1 - t.value), transform: [{ scale: 1 + t.value * 0.5 }] }));
  return <Animated.View pointerEvents="none" style={[styles.pulse, { borderColor: color }, style]} />;
}

/** One module node: a glossy 3D button. Finished modules are indigo, like the logo's y. */
function Node({ status, color, index }: { status: LessonStatus; color: string; index: number }) {
  const done = status === 'done';
  const current = status === 'current';
  const fill = done ? BRAND.indigo : current ? color : 'rgba(255,255,255,0.85)';
  return (
    <View style={{ width: NODE, height: NODE + 6 }}>
      {current ? <Pulse color={color} /> : null}
      <View style={[styles.nodeBase, { backgroundColor: done ? '#2E2499' : current ? 'rgba(22,20,43,0.35)' : 'rgba(45,35,120,0.14)' }]} />
      <View
        style={[
          styles.node,
          { backgroundColor: fill, borderColor: current ? '#FFFFFF' : done ? BRAND.lavender : 'rgba(22,20,43,0.10)', borderWidth: current ? 3 : 1.5 },
        ]}>
        <View pointerEvents="none" style={[styles.gloss, !done && !current && { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
        {done ? (
          <Icon name="check" size={28} color="#FFFFFF" strokeWidth={3.4} />
        ) : current ? (
          <Glyph name="play" size={26} color="#FFFFFF" />
        ) : status === 'soon' ? (
          <T variant="label" color={glass.text3}>
            {index + 1}
          </T>
        ) : (
          <Icon name="lock" size={20} color={glass.text3} strokeWidth={2.4} />
        )}
      </View>
    </View>
  );
}

/**
 * A track's modules as a winding trail of nodes, like a journey map.
 * Saffron footprints lead up to the module to do next (faint ones lie ahead). When a module is
 * finished, Yatri walks to the next one: its footprints appear one by one, then Yatri arrives.
 */
export function ModulePath({
  stage,
  statuses,
  completed,
  upNext,
  onOpen,
}: {
  stage: Stage;
  statuses: Map<string, LessonStatus>;
  completed: Record<string, unknown>;
  upNext: string;
  onOpen: (lessonId: string, status: LessonStatus) => void;
}) {
  const [width, setWidth] = useState(0);
  const reduce = useReducedMotion();
  const units = stage.units;
  const mid = width / 2;
  const points = units.map((_, i) => ({ x: mid + offsetOf(i), y: i * ROW + NODE / 2 }));
  const lastDone = units.reduce((n, u, i) => (statuses.get(u.lessons[0].id) === 'done' ? i : n), -1);
  // Segment i joins module i to module i + 1. Everything up to the module to do next has been walked.
  const walkedUpTo = lastDone;

  // Notice a newly finished module (same track) and play the walk to the next one.
  const seen = useRef<{ stage: string; lastDone: number } | null>(null);
  const [walk, setWalk] = useState<{ seg: number; n: number } | null>(null);
  useEffect(() => {
    const before = seen.current;
    seen.current = { stage: stage.id, lastDone };
    if (reduce || !before || before.stage !== stage.id || lastDone <= before.lastDone || lastDone >= units.length - 1) return;
    setWalk((w) => ({ seg: lastDone, n: (w?.n ?? 0) + 1 }));
    const steps = width ? footprints(points[lastDone], points[lastDone + 1], lastDone).length : 6;
    const t = setTimeout(() => haptic.tap(), steps * WALK_MS + 150);
    return () => clearTimeout(t);
    // Only a change in progress or track starts a walk.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDone, stage.id]);

  const segs = width > 0 ? points.slice(1).map((p, i) => ({ i, feet: footprints(points[i], p, i), walked: i <= walkedUpTo })) : [];
  const walking = walk ? segs.find((s) => s.i === walk.seg) : undefined;
  const yatriDelay = walking ? walking.feet.length * WALK_MS + 120 : 0;

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} style={{ height: units.length * ROW - (ROW - NODE) + 40 }}>
      {width > 0 ? (
        <>
          <Svg width={width} height={units.length * ROW} style={StyleSheet.absoluteFill} pointerEvents="none">
            {segs
              .filter((s) => s !== walking)
              .flatMap((s) =>
                s.feet.map((f, n) =>
                  s.walked ? (
                    <Circle key={f.key} cx={f.x} cy={f.y} r={3.6} fill={BRAND.saffron} opacity={n % 2 ? 0.75 : 1} />
                  ) : (
                    <Circle key={f.key} cx={f.x} cy={f.y} r={2.6} fill={BRAND.indigo} opacity={0.2} />
                  ),
                ),
              )}
          </Svg>
          {walking
            ? walking.feet.map((f, n) => (
                <Animated.View
                  key={`${walk!.n}-${f.key}`}
                  entering={ZoomIn.delay(n * WALK_MS).duration(180)}
                  pointerEvents="none"
                  style={[styles.foot, { left: f.x - 3.6, top: f.y - 3.6, opacity: n % 2 ? 0.75 : 1 }]}
                />
              ))
            : null}
          {units.map((unit, i) => {
            const lesson = unit.lessons[0];
            const status = statuses.get(lesson.id) ?? 'locked';
            const muted = status === 'locked' || status === 'soon';
            const x = offsetOf(i);
            // The label goes on the side with more room; Yatri takes the other side of the current node.
            const labelLeft = x > 0;
            const nodeLeft = mid + x - NODE / 2;
            const practice = status === 'done' && hasDrill(lesson.id);
            const practiced = !!completed[drillId(lesson.id)];
            const a11y = `Module ${i + 1}, ${unit.title}: ${lesson.title}, ${status === 'locked' ? `locked, finish module ${i} to unlock` : status === 'current' ? 'up next' : status}`;
            const labelWidth = Math.min(168, labelLeft ? nodeLeft - 14 : width - (nodeLeft + NODE) - 14);
            return (
              <Animated.View key={unit.id} entering={FadeInDown.delay(80 + i * 45).duration(320)} style={[styles.row, { top: i * ROW }]}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={a11y}
                  onPress={() => {
                    haptic.tap();
                    onOpen(lesson.id, status);
                  }}
                  style={({ pressed }) => [{ position: 'absolute', left: nodeLeft }, pressed && { transform: [{ translateY: 3 }] }]}>
                  <Node status={status} color={stage.color} index={i} />
                </Pressable>

                <View style={[styles.labelWrap, { width: labelWidth }, labelLeft ? { left: nodeLeft - 12 - labelWidth } : { left: nodeLeft + NODE + 12 }]}>
                  <GlassButton
                    accessible={false}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    radius={14}
                    strong={status === 'current'}
                    tint={status === 'current' ? alpha(stage.color, 0.18) : undefined}
                    onPress={() => onOpen(lesson.id, status)}
                    style={styles.label}>
                    <T variant="kicker" color={muted ? glass.text3 : status === 'done' ? glass.violet : glass.saffron} numberOfLines={1} style={{ fontSize: 10 }}>
                      {status === 'current' ? upNext.toUpperCase() : `MODULE ${i + 1}`}
                    </T>
                    <T variant="label" color={muted ? glass.text3 : glass.text} numberOfLines={2} style={{ fontSize: 13, lineHeight: 17 }}>
                      {lesson.title}
                    </T>
                  </GlassButton>
                  {practice ? (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${practiced ? 'Practise again' : 'Practise'}: ${lesson.title}, new exercises`}
                      onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: drillId(lesson.id) } })}
                      hitSlop={6}
                      style={({ pressed }) => [styles.practice, labelLeft ? { alignSelf: 'flex-end' } : null, pressed && { opacity: 0.7 }]}>
                      <Glyph name="bolt" size={12} color={glass.saffron} />
                      <T variant="labelSm" color={glass.saffron} style={{ fontSize: 11 }}>
                        {practiced ? 'Practise again' : 'Practise'}
                      </T>
                    </Pressable>
                  ) : null}
                </View>

                {status === 'current' ? (
                  <Animated.View
                    key={`yatri-${walk?.n ?? 0}`}
                    entering={FadeIn.delay(yatriDelay).duration(260)}
                    pointerEvents="none"
                    style={[styles.yatri, labelLeft ? { left: nodeLeft + NODE + 6 } : { left: nodeLeft - 56 }]}>
                    <Yatri size={50} bob mood={walking ? 'celebrate' : 'happy'} />
                  </Animated.View>
                ) : null}
              </Animated.View>
            );
          })}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { position: 'absolute', left: 0, right: 0, height: ROW },
  node: { position: 'absolute', top: 0, width: NODE, height: NODE, borderRadius: NODE / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  nodeBase: { position: 'absolute', top: 6, width: NODE, height: NODE, borderRadius: NODE / 2 },
  gloss: { position: 'absolute', top: 4, left: 12, right: 12, height: NODE * 0.32, borderRadius: NODE, backgroundColor: 'rgba(255,255,255,0.22)' },
  pulse: { position: 'absolute', top: 0, left: 0, width: NODE, height: NODE, borderRadius: NODE / 2, borderWidth: 6 },
  foot: { position: 'absolute', width: 7.2, height: 7.2, borderRadius: 3.6, backgroundColor: BRAND.saffron },
  labelWrap: { position: 'absolute', top: 4, gap: 6 },
  label: { paddingHorizontal: 11, paddingVertical: 8, gap: 2 },
  practice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: alpha('#F59E0B', 0.45),
    backgroundColor: alpha('#FFF7E8', 0.9),
    alignSelf: 'flex-start',
  },
  yatri: { position: 'absolute', top: -2 },
});
