import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import { PROJECTS, type Lesson } from '@/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/state/progress';
import { colors } from '@/theme';

const LOOK: Record<string, { bg: string; ink: string; tag: string; icon: string }> = {
  'proj-portfolio': { bg: '#4B3FD8', ink: '#FFFFFF', tag: 'HTML · CSS · JS', icon: 'M4 5h16v14H4z M4 9h16 M8 13h5 M8 16h8' },
  'proj-todo': { bg: '#0E7490', ink: '#FFFFFF', tag: 'JavaScript', icon: 'M5 7l2 2 4-4 M13 7h6 M5 15l2 2 4-4 M13 15h6' },
  'proj-quiz': { bg: '#C2410C', ink: '#FFFFFF', tag: 'JavaScript', icon: 'M9 9a3 3 0 1 1 4 2.8c-.6.3-1 .9-1 1.6V14 M12 18h.01' },
  'proj-guess': { bg: '#1D4ED8', ink: '#FFFFFF', tag: 'Python', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v4l3 2' },
};

const buildSteps = (p: Lesson) => p.steps.filter((s) => s.type !== 'concept').length;

/** Horizontal list of guided projects: build something real, step by step. */
export function ProjectCards() {
  const { state } = useProgress();
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <T variant="heading">Guided projects</T>
        <T variant="labelSm" color={colors.ink3}>
          Build · show friends · +60 XP
        </T>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16, flexGrow: 0 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
        {PROJECTS.map((p) => {
          const look = LOOK[p.id];
          const done = !!state.completed[p.id];
          return (
            <Pressable
              key={p.id}
              accessibilityRole="button"
              accessibilityLabel={`${p.title}, ${buildSteps(p)} steps, ${look.tag}${done ? ', built' : ''}`}
              onPress={() => {
                haptic.tap();
                router.push({ pathname: '/lesson/[id]', params: { id: p.id } });
              }}
              style={({ pressed }) => [styles.card, { backgroundColor: look.bg }, pressed && { transform: [{ scale: 0.97 }] }]}>
              <View style={styles.top}>
                <View style={styles.icon}>
                  <Icon d={look.icon} size={20} color={look.ink} strokeWidth={2.2} />
                </View>
                {done ? (
                  <View style={styles.done}>
                    <Icon name="check" size={12} color={colors.success} strokeWidth={3} />
                    <T variant="labelSm" color={colors.success} style={{ fontSize: 11 }}>
                      Built
                    </T>
                  </View>
                ) : null}
              </View>
              <T variant="heading" color={look.ink} numberOfLines={2} style={{ fontSize: 16 }}>
                {p.title}
              </T>
              <T variant="caption" color="#FFFFFFCC">
                {look.tag} · {buildSteps(p)} steps · {p.minutes} min
              </T>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 176, minHeight: 150, borderRadius: 20, padding: 14, gap: 6, justifyContent: 'space-between' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  icon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFFFFF2E', alignItems: 'center', justifyContent: 'center' },
  done: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 22, paddingHorizontal: 7, borderRadius: 11, backgroundColor: '#FFFFFF' },
});
