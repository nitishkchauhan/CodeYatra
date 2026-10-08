import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { buildReview, getLesson, type Lesson } from '@/content';
import { CodeStep } from '@/features/lesson/CodeStep';
import { CompleteView } from '@/features/lesson/CompleteView';
import { ConceptStep } from '@/features/lesson/ConceptStep';
import { EditorStep } from '@/features/lesson/EditorStep';
import { PuzzleStep } from '@/features/lesson/PuzzleStep';
import { QuizStep } from '@/features/lesson/QuizStep';
import { FindBugStep, OrderLinesStep, PredictOutputStep, TapTokenStep } from '@/features/lesson/PracticeSteps';
import { LessonTopBar } from '@/features/lesson/Shell';
import { WebBuildStep } from '@/features/lesson/WebBuildStep';
import { coinsFor } from '@/content/shop';
import { track } from '@/lib/telemetry';
import { useProgress } from '@/state/progress';
import { nextStreak } from '@/state/streak';
import { colors } from '@/theme';

export default function LessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useProgress();
  // The review is built once when opened, so fixing a mistake doesn't reshuffle it mid-way.
  const [review] = useState(() => (id === 'review' ? buildReview(state.mistakes) : undefined));
  const lesson = id === 'review' ? review : getLesson(id);
  const [attempt, setAttempt] = useState(0);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
        <T variant="title">This lesson isn’t available yet</T>
        <Button label="Back" onPress={() => router.back()} style={{ alignSelf: 'stretch' }} />
      </SafeAreaView>
    );
  }
  // A new key restarts the lesson from scratch for "Replay".
  return <LessonPlayer key={`${lesson.id}:${attempt}`} lesson={lesson} onReplay={() => setAttempt((a) => a + 1)} />;
}

function LessonPlayer({ lesson, onReplay }: { lesson: Lesson; onReplay: () => void }) {
  const progress = useProgress();
  const toast = useToast();
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [missed, setMissed] = useState<Set<string>>(() => new Set());
  const [startedAt] = useState(() => Date.now());
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const sourceOf = (i: number) => lesson.sources?.[i] ?? `${lesson.id}#${i}`;
  const { recordMistake } = progress;
  const stepKey = sourceOf(index);
  const onMistake = useCallback(() => {
    setMistakes((m) => m + 1);
    setMissed((s) => new Set(s).add(stepKey));
    recordMistake(stepKey);
  }, [stepKey, recordMistake]);
  const xp = (lesson.kind === 'project' ? 60 : lesson.kind === 'lesson' ? 25 : 15) + (mistakes === 0 ? 5 : 0);
  const accuracy = Math.max(50, 100 - mistakes * 12);
  const step = lesson.steps[index];

  const next = () => {
    if (index < lesson.steps.length - 1) setIndex(index + 1);
    else setFinishedAt(Date.now());
  };

  if (finishedAt !== null) {
    const { state, today } = progress;
    const predicted = nextStreak(state.streak, state.lastActive, today);
    return (
      <CompleteView
        title={lesson.kind === 'project' ? 'Project built!' : lesson.kind === 'lesson' ? 'Lesson complete!' : 'Practice complete!'}
        subtitle={`${lesson.title} · Well done!`}
        xp={xp}
        coins={coinsFor(lesson.kind, accuracy === 100)}
        accuracy={accuracy}
        seconds={Math.max(1, Math.round((finishedAt - startedAt) / 1000))}
        learned={lesson.learned}
        streak={predicted.streak}
        streakNote={predicted.extended ? (state.streak > 0 ? `Up from ${state.streak} · see you tomorrow` : 'Your streak starts today') : 'Already counted for today'}
        onContinue={() => {
          // Every step in the lesson was eventually answered right; ones missed this time stay for review.
          const fixed = lesson.steps.map((_, i) => sourceOf(i)).filter((k) => !missed.has(k));
          const result = progress.completeLesson(lesson.id, xp, accuracy, fixed);
          track('lesson_complete', { lesson: lesson.id.startsWith('daily-') ? 'daily' : lesson.id, accuracy, mistakes });
          toast(result.extended ? `Streak: ${result.streak} ${result.streak === 1 ? 'day' : 'days'} · +${result.coins} coins` : `+${xp} XP · +${result.coins} coins`);
          if (result.certificate) router.replace({ pathname: '/certificate/[stageId]', params: { stageId: result.certificate.stageId } });
          else router.back();
        }}
        onReplay={onReplay}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: step.type === 'puzzle' ? colors.bg : colors.surface }}>
      <LessonTopBar steps={lesson.steps.length} index={index} xp={xp} onClose={() => router.back()} />
      <Animated.View key={index} entering={FadeIn.duration(220)} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {step.type === 'concept' && <ConceptStep step={step} onDone={next} />}
          {step.type === 'quiz' && <QuizStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'puzzle' && <PuzzleStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'code' && <CodeStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'editor' && <EditorStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'order' && <OrderLinesStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'bug' && <FindBugStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'predict' && <PredictOutputStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'tap' && <TapTokenStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'web' && <WebBuildStep step={step} onDone={next} onMistake={onMistake} />}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
