import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { checkpointId, hasCheckpoint } from '@/content/checkpoints';
import { type CareerPath, type PathStop } from '@/content/paths';
import { needsRevision, nodeState, type Evidence, type NodeState } from '@/content/paths/graph';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

const GAP = 26;

type Props = {
  path: CareerPath;
  nextId: string | null;
  onOpen: (stop: PathStop) => void;
  onCheckpoint: (sectionIndex: number) => void;
  /** Stops matching the search, drawn highlighted. */
  highlight?: Set<string>;
  /** Reports where each stop sits (y from the top of the map), so the screen can scroll to it. */
  onPlace?: (stopId: string, y: number) => void;
};

/**
 * roadmap.sh-style map for phones: a central line, each section as a big topic box on it,
 * its stops branching left and right, and a checkpoint closing the section. Every box is a button.
 */
export function RoadmapMap({ path, nextId, onOpen, onCheckpoint, highlight, onPlace }: Props) {
  const { state } = useProgress();
  const spine = `${path.color}66`;
  const ev: Evidence = { completed: state.completed, marks: state.pathMarks, mistakes: state.mistakes, checkpoints: state.checkpoints };
  const sectionY: Record<number, number> = {};

  return (
    <View>
      <Legend path={path} />
      <View style={styles.map}>
        <View style={[styles.spine, { backgroundColor: spine }]} />
        {path.sections.map((section, si) => {
          const states = section.stops.map((s) => nodeState(path, s, ev));
          const required = section.stops.filter((s) => !s.optional);
          const sectionDone = required.length > 0 && required.every((s) => states[section.stops.indexOf(s)] === 'done');
          const check = hasCheckpoint(path, si) ? state.checkpoints[checkpointId(path.id, si)] : undefined;
          const rows: PathStop[][] = [];
          for (let i = 0; i < section.stops.length; i += 2) rows.push(section.stops.slice(i, i + 2));
          return (
            <Animated.View
              key={section.title}
              entering={FadeIn.delay(si * 60)}
              onLayout={(e) => {
                sectionY[si] = e.nativeEvent.layout.y;
              }}
              style={{ gap: 10, marginBottom: 22 }}>
              <View style={[styles.topic, { backgroundColor: check?.pass ? colors.success : sectionDone ? path.color : path.ink }]} accessibilityRole="header">
                {check?.pass ? <Icon name="star" size={16} color="#FFFFFF" /> : sectionDone ? <Icon name="check" size={16} color="#FFFFFF" strokeWidth={3} /> : null}
                <T variant="label" color="#FFFFFF" style={{ textAlign: 'center' }}>
                  {section.title}
                </T>
              </View>
              {rows.map((row, ri) => (
                <View
                  key={ri}
                  style={styles.row}
                  onLayout={(e) => {
                    const y = (sectionY[si] ?? 0) + e.nativeEvent.layout.y;
                    for (const s of row) onPlace?.(s.id, y);
                  }}>
                  {[0, 1].map((col) =>
                    row[col] ? (
                      <Cell
                        key={row[col].id}
                        path={path}
                        stop={row[col]}
                        state={states[section.stops.indexOf(row[col])]}
                        revise={needsRevision(row[col], ev).length > 0}
                        saved={!!state.bookmarks[`${path.id}/${row[col].id}`]}
                        isNext={nextId === row[col].id}
                        lit={!!highlight?.has(row[col].id)}
                        dim={!!highlight && highlight.size > 0 && !highlight.has(row[col].id)}
                        side={col === 0 ? 'left' : 'right'}
                        spine={spine}
                        onOpen={onOpen}
                      />
                    ) : (
                      <View key="empty" style={{ flex: 1 }} />
                    ),
                  ).flatMap((el, i) => (i === 0 ? [el, <View key="gap" style={{ width: GAP }} />] : [el]))}
                </View>
              ))}
              {hasCheckpoint(path, si) ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${section.title} checkpoint, ${check ? `${check.pass ? 'passed' : 'not passed yet'}, best ${check.best} of ${check.total}` : sectionDone ? 'ready to take' : 'take it when the section is done'}`}
                  onPress={() => onCheckpoint(si)}
                  style={({ pressed }) => [
                    styles.check,
                    check?.pass ? { borderColor: colors.success, backgroundColor: colors.successSoft } : sectionDone ? { borderColor: colors.saffron, backgroundColor: colors.warnSoft } : null,
                    pressed && { transform: [{ scale: 0.97 }] },
                  ]}>
                  <Icon name={check?.pass ? 'star' : 'flag'} size={15} color={check?.pass ? colors.success : colors.saffronInk} />
                  <T variant="labelSm" color={check?.pass ? colors.successInk : colors.saffronInk}>
                    {check ? `Checkpoint · ${check.pass ? 'mastered' : 'retake'} · best ${check.best}/${check.total}` : 'Checkpoint test'}
                  </T>
                </Pressable>
              ) : null}
            </Animated.View>
          );
        })}
        <View style={[styles.topic, styles.finish, { borderColor: path.color }]}>
          <Icon name="flag" size={16} color={path.ink} />
          <T variant="label" color={path.ink}>
            Job-ready
          </T>
        </View>
      </View>
    </View>
  );
}

const STATE_LABEL: Record<NodeState, string> = { done: 'done', progress: 'in progress', available: 'ready to learn', early: 'finish earlier stops first' };

function Cell({
  path,
  stop,
  state,
  revise,
  saved,
  isNext,
  lit,
  dim,
  side,
  spine,
  onOpen,
}: {
  path: CareerPath;
  stop: PathStop;
  state: NodeState;
  revise: boolean;
  saved: boolean;
  isNext: boolean;
  lit: boolean;
  dim: boolean;
  side: 'left' | 'right';
  spine: string;
  onOpen: (stop: PathStop) => void;
}) {
  const done = state === 'done';
  const lessons = stop.modules?.length ?? 0;
  const note = revise ? 'Needs revision' : isNext ? 'Next stop' : state === 'early' ? 'Later' : stop.optional ? 'Optional' : lessons ? `${lessons} ${lessons === 1 ? 'lesson' : 'lessons'}` : 'Free links';
  return (
    <View style={[styles.cell, dim && { opacity: 0.35 }]}>
      {/* Connector from the node to the central line. */}
      <View
        style={[
          styles.connector,
          side === 'left' ? { right: -GAP / 2 } : { left: -GAP / 2 },
          stop.optional ? { borderColor: spine, borderStyle: 'dashed', borderTopWidth: 2 } : { backgroundColor: spine, height: 2 },
        ]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${stop.title}, ${STATE_LABEL[state]}${revise ? ', needs revision' : ''}${isNext ? ', next stop' : ''}${stop.optional ? ', optional' : ''}${stop.choice ? `, pick one: ${stop.choice}` : ''}${stop.project ? ', project' : ''}${saved ? ', saved' : ''}`}
        onPress={() => onOpen(stop)}
        style={({ pressed }) => [
          styles.node,
          state === 'early' && { backgroundColor: '#F7F6FB' },
          done && { backgroundColor: colors.successSoft, borderColor: colors.success },
          state === 'progress' && !isNext && { borderColor: path.color },
          isNext && { backgroundColor: path.soft, borderColor: path.color, borderWidth: 2 },
          revise && { borderColor: colors.saffron, borderWidth: 2 },
          lit && { borderColor: colors.primary, borderWidth: 3 },
          stop.optional && !done && !isNext && !revise && !lit && { borderStyle: 'dashed', borderColor: '#B9B5CF' },
          pressed && { transform: [{ scale: 0.97 }] },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {stop.choice ? (
            <T variant="labelSm" color={path.ink} style={[styles.over, { flex: 1 }]}>
              PICK ONE
            </T>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {saved ? <Icon name="bookmark" size={12} color={colors.primary} /> : null}
        </View>
        <T variant="labelSm" color={done ? colors.successInk : state === 'early' ? colors.ink2 : colors.ink} style={{ fontSize: 13, lineHeight: 17 }} numberOfLines={3}>
          {stop.title}
        </T>
        <View style={styles.nodeMeta}>
          {revise ? (
            <Icon name="reset" size={12} color={colors.saffronInk} />
          ) : done ? (
            <Icon name="check" size={13} color={colors.success} strokeWidth={3} />
          ) : state === 'early' ? (
            <Icon name="lock" size={11} color={colors.ink3} />
          ) : stop.project ? (
            <Icon name="flag" size={12} color={colors.saffronInk} strokeWidth={2.2} />
          ) : isNext ? (
            <View style={[styles.dot, { backgroundColor: path.color }]} />
          ) : null}
          <T variant="caption" color={revise ? colors.saffronInk : undefined} style={{ fontSize: 11 }} numberOfLines={1}>
            {note}
          </T>
        </View>
      </Pressable>
    </View>
  );
}

function Legend({ path }: { path: CareerPath }) {
  return (
    <View
      style={styles.legend}
      accessible
      accessibilityLabel="Legend: green done, highlighted next stop, orange needs revision, grey comes later, dashed optional. Every box can be opened.">
      <Key box={{ borderColor: colors.success, backgroundColor: colors.successSoft }} text="Done" />
      <Key box={{ borderColor: path.color, borderWidth: 2, backgroundColor: path.soft }} text="Next" />
      <Key box={{ borderColor: colors.saffron, borderWidth: 2 }} text="Revise" />
      <Key box={{ borderColor: colors.line, backgroundColor: '#F7F6FB' }} text="Later" />
      <Key box={{ borderColor: '#B9B5CF', borderStyle: 'dashed' }} text="Optional" />
    </View>
  );
}

function Key({ box, text }: { box: object; text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={[styles.keyBox, box]} />
      <T variant="caption" style={{ fontSize: 11 }}>
        {text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 14 },
  keyBox: { width: 14, height: 10, borderRadius: 3, borderWidth: 1.5, backgroundColor: colors.surface },
  map: { position: 'relative' },
  spine: { position: 'absolute', top: 0, bottom: 20, left: '50%', width: 3, marginLeft: -1.5, borderRadius: 2 },
  topic: {
    alignSelf: 'center',
    minWidth: '58%',
    maxWidth: '80%',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    boxShadow: '0 2px 0 rgba(22,20,43,0.18)',
  },
  finish: { backgroundColor: colors.surface, borderWidth: 2, minWidth: '40%', boxShadow: 'none' },
  row: { flexDirection: 'row', alignItems: 'stretch' },
  cell: { flex: 1, justifyContent: 'center' },
  connector: { position: 'absolute', top: '50%', width: GAP / 2 },
  node: {
    minHeight: 64,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    gap: 4,
    justifyContent: 'center',
  },
  over: { fontSize: 9.5, letterSpacing: 0.6 },
  nodeMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  check: {
    alignSelf: 'center',
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
});
