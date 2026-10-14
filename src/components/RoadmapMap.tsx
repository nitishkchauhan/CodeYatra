import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { stopStatus, type CareerPath, type PathStop, type StopStatus } from '@/content/paths';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

const GAP = 26;

/**
 * roadmap.sh-style map for phones: a central line, each section as a big topic box on it,
 * and its stops branching left and right with connectors (dashed when optional).
 */
export function RoadmapMap({ path, nextId, onOpen }: { path: CareerPath; nextId: string | null; onOpen: (stop: PathStop) => void }) {
  const { state } = useProgress();
  const spine = `${path.color}66`;

  return (
    <View>
      <Legend path={path} />
      <View style={styles.map}>
        <View style={[styles.spine, { backgroundColor: spine }]} />
        {path.sections.map((section, si) => {
          const statuses = section.stops.map((s) => stopStatus(path.id, s, state.completed, state.pathMarks));
          const required = section.stops.filter((s) => !s.optional);
          const sectionDone = required.length > 0 && required.every((s) => statuses[section.stops.indexOf(s)] === 'done');
          const rows: PathStop[][] = [];
          for (let i = 0; i < section.stops.length; i += 2) rows.push(section.stops.slice(i, i + 2));
          return (
            <Animated.View key={section.title} entering={FadeIn.delay(si * 60)} style={{ gap: 10, marginBottom: 22 }}>
              <View style={[styles.topic, { backgroundColor: sectionDone ? colors.success : path.ink }]} accessibilityRole="header">
                {sectionDone ? <Icon name="check" size={16} color="#FFFFFF" strokeWidth={3} /> : null}
                <T variant="label" color="#FFFFFF" style={{ textAlign: 'center' }}>
                  {section.title}
                </T>
              </View>
              {rows.map((row, ri) => (
                <View key={ri} style={styles.row}>
                  <Cell
                    path={path}
                    stop={row[0]}
                    status={statuses[section.stops.indexOf(row[0])]}
                    isNext={nextId === row[0].id}
                    side="left"
                    spine={spine}
                    onOpen={onOpen}
                  />
                  <View style={{ width: GAP }} />
                  {row[1] ? (
                    <Cell
                      path={path}
                      stop={row[1]}
                      status={statuses[section.stops.indexOf(row[1])]}
                      isNext={nextId === row[1].id}
                      side="right"
                      spine={spine}
                      onOpen={onOpen}
                    />
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                </View>
              ))}
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

function Cell({
  path,
  stop,
  status,
  isNext,
  side,
  spine,
  onOpen,
}: {
  path: CareerPath;
  stop: PathStop;
  status: StopStatus;
  isNext: boolean;
  side: 'left' | 'right';
  spine: string;
  onOpen: (stop: PathStop) => void;
}) {
  const done = status === 'done';
  const lessons = stop.modules?.length ?? 0;
  return (
    <View style={styles.cell}>
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
        accessibilityLabel={`${stop.title}, ${done ? 'done' : status === 'progress' ? 'in progress' : 'not started'}${isNext ? ', next stop' : ''}${stop.optional ? ', optional' : ''}${stop.choice ? `, pick one: ${stop.choice}` : ''}${stop.project ? ', project' : ''}`}
        onPress={() => onOpen(stop)}
        style={({ pressed }) => [
          styles.node,
          done && { backgroundColor: colors.successSoft, borderColor: colors.success },
          status === 'progress' && !isNext && { borderColor: path.color },
          isNext && { backgroundColor: path.soft, borderColor: path.color, borderWidth: 2 },
          stop.optional && !done && !isNext && { borderStyle: 'dashed', borderColor: '#B9B5CF' },
          pressed && { transform: [{ scale: 0.97 }] },
        ]}>
        {stop.choice ? (
          <T variant="labelSm" color={path.ink} style={styles.over}>
            PICK ONE
          </T>
        ) : null}
        <T variant="labelSm" color={done ? colors.successInk : colors.ink} style={{ fontSize: 13, lineHeight: 17 }} numberOfLines={3}>
          {stop.title}
        </T>
        <View style={styles.nodeMeta}>
          {done ? (
            <Icon name="check" size={13} color={colors.success} strokeWidth={3} />
          ) : stop.project ? (
            <Icon name="flag" size={12} color={colors.saffronInk} strokeWidth={2.2} />
          ) : isNext ? (
            <View style={[styles.dot, { backgroundColor: path.color }]} />
          ) : null}
          <T variant="caption" style={{ fontSize: 11 }} numberOfLines={1}>
            {isNext ? 'Next stop' : stop.optional ? 'Optional' : lessons ? `${lessons} ${lessons === 1 ? 'lesson' : 'lessons'}` : 'Free links'}
          </T>
        </View>
      </Pressable>
    </View>
  );
}

function Legend({ path }: { path: CareerPath }) {
  return (
    <View style={styles.legend} accessible accessibilityLabel="Legend: solid box required, dashed box optional, green done, highlighted next stop">
      <Key box={{ borderColor: colors.line }} text="Required" />
      <Key box={{ borderColor: '#B9B5CF', borderStyle: 'dashed' }} text="Optional" />
      <Key box={{ borderColor: colors.success, backgroundColor: colors.successSoft }} text="Done" />
      <Key box={{ borderColor: path.color, borderWidth: 2, backgroundColor: path.soft }} text="Next" />
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
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 14 },
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
});
