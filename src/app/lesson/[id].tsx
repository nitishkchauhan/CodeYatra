import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView, KeyboardController } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { buildReview, getLesson, nextLessonAfter, type Lesson } from '@/content';
import { CHECKPOINT_PREFIX, PASS_MARK, scoreCheckpoint } from '@/content/checkpoints';
import { getNotes } from '@/content/notes';
import { CodeStep } from '@/features/lesson/CodeStep';
import { CompleteView } from '@/features/lesson/CompleteView';
import { ConceptStep } from '@/features/lesson/ConceptStep';
import { EditorStep } from '@/features/lesson/EditorStep';
import { PuzzleStep } from '@/features/lesson/PuzzleStep';
import { QuizStep } from '@/features/lesson/QuizStep';
import { FindBugStep, OrderLinesStep, PredictOutputStep, TapTokenStep } from '@/features/lesson/PracticeSteps';
import { LessonTopBar } from '@/features/lesson/Shell';
import { HookStep, MistakeStep, TryStep } from '@/features/lesson/V2Steps';
import { GroupStep, MatchStep, ScenarioStep, TraceStep } from '@/features/lesson/V3Steps';
import { WebBuildStep } from '@/features/lesson/WebBuildStep';
import { track } from '@/lib/telemetry';
import { useConfirmLeave } from '@/lib/useConfirmLeave';
import { accuracyFor, isReplay, lessonReward } from '@/state/model';
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
  // One claim per attempt: a double tap on Continue can't award the lesson twice.
  const [claimId] = useState(() => `${lesson.id}:${startedAt}:${Math.random().toString(36).slice(2)}`);
  const leaving = useRef(false);
  const [replay] = useState(() => isReplay(progress.state, lesson.id));
  const reward = lessonReward(lesson.kind, mistakes, replay);
  // Leaving after the first step loses this attempt, so ask first. Finishing is always allowed.
  const guard = useConfirmLeave(index > 0 && finishedAt === null, 'Leave this lesson?', 'Your progress in this lesson will be lost.');

  // Close the keyboard before a step's text box unmounts (next step, finish or leaving). On some Android
  // phones an input removed while focused leaves the screen squeezed, with a keyboard-sized blank area.
  useEffect(() => {
    KeyboardController.dismiss();
  }, [index, finishedAt]);
  useEffect(() => () => void KeyboardController.dismiss(), []);

  const notesFor = getNotes(lesson.id);
  const sourceOf = (i: number) => lesson.sources?.[i] ?? `${lesson.id}#${i}`;
  const { recordMistake } = progress;
  const stepKey = sourceOf(index);
  const onMistake = useCallback(() => {
    setMistakes((m) => m + 1);
    setMissed((s) => new Set(s).add(stepKey));
    recordMistake(stepKey);
  }, [stepKey, recordMistake]);
  const accuracy = accuracyFor(mistakes);
  const step = lesson.steps[index];

  const next = () => {
    if (index < lesson.steps.length - 1) setIndex(index + 1);
    else setFinishedAt(Date.now());
  };

  if (finishedAt !== null) {
    const { state, today } = progress;
    const predicted = nextStreak(state.streak, state.lastActive, today);
    // A checkpoint is scored on first-time answers; every other lesson just completes.
    const topics = (lesson as Lesson & { topics?: string[] }).topics;
    const checkpoint = lesson.id.startsWith(CHECKPOINT_PREFIX) && topics ? scoreCheckpoint(topics, lesson.steps.map((_, i) => missed.has(sourceOf(i))), today) : null;
    const following = lesson.kind === 'lesson' || lesson.kind === 'project' ? nextLessonAfter(lesson.id) : null;
    const save = () => {
      if (leaving.current) return null;
      leaving.current = true;
      // Every step in the lesson was eventually answered right; ones missed this time stay for review.
      const fixed = lesson.steps.map((_, i) => sourceOf(i)).filter((k) => !missed.has(k));
      const result = progress.completeLesson({ lessonId: lesson.id, kind: lesson.kind, mistakes, reviewed: fixed, claimId });
      if (checkpoint) progress.recordCheckpoint(lesson.id, checkpoint);
      track('lesson_complete', { lesson: lesson.id.startsWith('daily-') ? 'daily' : lesson.id, accuracy, mistakes, replay });
      toast(result.extended ? `Streak: ${result.streak} ${result.streak === 1 ? 'day' : 'days'} · +${result.xp} XP` : `+${result.xp} XP${result.coins ? ` · +${result.coins} coins` : ''}`);
      guard.allow();
      return result;
    };
    return (
      <CompleteView
        title={lesson.kind === 'project' ? 'Project built!' : lesson.kind === 'lesson' ? 'Lesson complete!' : 'Practice complete!'}
        subtitle={`${lesson.title} · Well done!`}
        feedbackAbout={`lesson ${lesson.id}`}
        xp={reward.xp}
        coins={reward.coins}
        replay={replay}
        accuracy={checkpoint ? Math.round((checkpoint.score / checkpoint.total) * 100) : accuracy}
        seconds={Math.max(1, Math.round((finishedAt - startedAt) / 1000))}
        learned={lesson.learned}
        reading={lesson.reading}
        notes={notesFor ? { minutes: notesFor.minutes, onPress: () => router.push({ pathname: '/notes/[id]', params: { id: lesson.id } }) } : undefined}
        streak={predicted.streak}
        streakNote={predicted.extended ? (state.streak > 0 ? `Up from ${state.streak} · see you tomorrow` : 'Your streak starts today') : 'Already counted for today'}
        onContinue={() => {
          const result = save();
          if (!result) return;
          if (result.certificate) router.replace({ pathname: '/certificate/[stageId]', params: { stageId: result.certificate.stageId } });
          else router.back();
        }}
        next={
          following
            ? {
                title: following.title,
                onPress: () => {
                  const result = save();
                  if (!result) return;
                  if (result.certificate) router.replace({ pathname: '/certificate/[stageId]', params: { stageId: result.certificate.stageId } });
                  else router.replace({ pathname: '/lesson/[id]', params: { id: following.id } });
                },
              }
            : undefined
        }
        assessment={
          checkpoint
            ? {
                ...checkpoint,
                passMark: PASS_MARK,
                rows: Object.entries(checkpoint.byModule).map(([m, [right, asked]]) => ({ label: getLesson(m)?.title ?? m, right, asked })),
                revise: checkpoint.weak.map((m) => ({ id: m, title: getLesson(m)?.title ?? m })),
                onRevise: (m) => {
                  if (!save()) return;
                  router.replace({ pathname: '/lesson/[id]', params: { id: m } });
                },
              }
            : undefined
        }
        onReplay={onReplay}
      />
    );
  }

  return (
    // The step shrinks with the keyboard, so the code stays scrollable and Run stays above the keyboard.
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <LessonTopBar steps={lesson.steps.length} index={index} xp={reward.xp} onClose={() => router.back()} />
      <Animated.View key={index} entering={FadeIn.duration(220)} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {step.type === 'concept' && <ConceptStep step={step} onDone={next} />}
          {step.type === 'hook' && <HookStep step={step} onDone={next} />}
          {step.type === 'try' && <TryStep step={step} onDone={next} />}
          {step.type === 'mistake' && <MistakeStep step={step} onDone={next} />}
          {step.type === 'quiz' && <QuizStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'puzzle' && <PuzzleStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'code' && <CodeStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'editor' && <EditorStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'order' && <OrderLinesStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'bug' && <FindBugStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'predict' && <PredictOutputStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'tap' && <TapTokenStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'web' && <WebBuildStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'trace' && <TraceStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'match' && <MatchStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'group' && <GroupStep step={step} onDone={next} onMistake={onMistake} />}
          {step.type === 'scenario' && <ScenarioStep step={step} onDone={next} />}
        </View>
      </Animated.View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
