import { useDeferredValue, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ActionBar, StepHeader } from './Shell';
import { AskYatri } from '@/components/AskYatri';
import { BuildBoard, useBuild } from '@/components/TapToBuild';
import { WebPreview } from '@/components/WebPreview';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { runWebChecks, type WebFile, type WebStep } from '@/content';
import { haptic } from '@/lib/haptics';
import { buildPage, type PageLog } from '@/lib/web/page';
import { colors, fonts } from '@/theme';

const FILE_NAME: Record<WebFile, string> = { html: 'index.html', css: 'style.css', js: 'app.js' };
const EDITOR_LANG = { html: 'html', css: 'css', js: 'javascript' } as const;

/** Build part of a real page by tapping pieces into each file, watch the preview, then check against the brief. */
export function WebBuildStep({ step, onDone, onMistake }: { step: WebStep; onDone: () => void; onMistake: () => void }) {
  const fileList = (['html', 'css', 'js'] as WebFile[]).filter((f) => step.starter[f] !== undefined);
  // Each file is the tested solution with a few pieces missing (no keyboard). Up to 3 gaps per file.
  const seed = `${step.kicker}|${step.title}`;
  const html = useBuild(step.solution.html, 'html', `${seed}:html`, step.starter.html, 3);
  const css = useBuild(step.solution.css ?? '', 'css', `${seed}:css`, step.starter.css ?? '', 3);
  const js = useBuild(step.solution.js ?? '', 'javascript', `${seed}:js`, step.starter.js ?? '', 3);
  const builds = { html, css, js };
  const files = Object.fromEntries(fileList.map((f) => [f, builds[f].code])) as WebStep['starter'];
  const filled = fileList.every((f) => builds[f].filled);
  const [tab, setTab] = useState<WebFile>(fileList.find((f) => builds[f].puzzle.answers.length) ?? fileList[0]);
  const [checks, setChecks] = useState<{ label: string; ok: boolean }[] | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [logs, setLogs] = useState<PageLog[]>([]);
  const doc = useDeferredValue(buildPage({ ...files, pages: step.pages, current: step.current, react: step.react, next: step.next }));
  const pass = checks?.every((c) => c.ok) ?? false;
  // A Next.js project edits one file of the app, shown by its path.
  const fileName = (f: WebFile) => (f === 'js' && step.next?.edit ? step.next.edit : FILE_NAME[f]);
  // The React Compiler keeps this function stable, so the preview is not reloaded on every render.
  const onLog = (log: PageLog) => setLogs((l) => [...l.slice(-4), log]);

  const check = () => {
    const result = runWebChecks(files, step.checks);
    setChecks(result);
    if (result.every((c) => c.ok)) haptic.success();
    else {
      haptic.error();
      onMistake();
      fileList.forEach((f) => builds[f].markWrong());
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <StepHeader kicker={step.kicker} title={step.title} instructions={step.instructions} color={colors.primary} />
        </Animated.View>

        <View style={{ gap: 6 }}>
          <View style={styles.previewHead}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <T variant="labelSm" color={colors.ink2}>
              Live preview
            </T>
          </View>
          <WebPreview key={doc} doc={doc} height={220} onLog={onLog} />
          {logs.length ? (
            <View style={styles.console}>
              {logs.map((l, i) => (
                <T key={i} style={[styles.consoleText, l.level === 'error' && { color: '#FCA5A5' }]}>
                  {l.level === 'error' ? '✗ ' : '› '}
                  {l.text}
                </T>
              ))}
            </View>
          ) : null}
        </View>

        {fileList.length > 1 ? (
          <View style={styles.tabs} accessibilityRole="tablist">
            {fileList.map((f) => (
              <Pressable key={f} accessibilityRole="tab" accessibilityState={{ selected: tab === f }} onPress={() => setTab(f)} style={[styles.tab, tab === f && styles.tabOn]}>
                <T style={{ fontFamily: fonts.mono, fontSize: 13, color: tab === f ? colors.ink : colors.ink2 }}>
                  {fileName(f)}
                  {builds[f].puzzle.answers.length && !builds[f].filled ? ' •' : ''}
                </T>
              </Pressable>
            ))}
          </View>
        ) : null}
        <BuildBoard key={tab} build={builds[tab]} lang={EDITOR_LANG[tab]} file={fileName(tab)} />

        {checks ? (
          <Animated.View entering={FadeInDown.duration(240)} style={styles.checks} accessibilityLiveRegion="polite">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T variant="label" style={{ fontSize: 13 }}>
                Checklist
              </T>
              <T variant="labelSm" color={pass ? colors.success : colors.danger}>
                {checks.filter((c) => c.ok).length} of {checks.length} done
              </T>
            </View>
            {checks.map((c) => (
              <View key={c.label} style={styles.check}>
                <View style={[styles.checkDot, { backgroundColor: c.ok ? colors.success : colors.danger }]}>
                  <Icon name={c.ok ? 'check' : 'cross'} size={12} color="#FFFFFF" strokeWidth={3} />
                </View>
                <T variant="bodySm" color={c.ok ? colors.ink : colors.dangerInk} style={{ flex: 1 }}>
                  {c.label}
                </T>
              </View>
            ))}
          </Animated.View>
        ) : null}

        {checks && !pass ? (
          <AskYatri
            build={() => ({
              lang: 'html/css/js',
              title: step.title,
              instructions: step.instructions,
              code: (['html', 'css', 'js'] as WebFile[])
                .filter((f) => files[f] !== undefined)
                .map((f) => `--- ${fileName(f)} ---\n${files[f]}`)
                .join('\n'),
              problem: 'Checklist items not done yet:\n' + checks.filter((c) => !c.ok).map((c) => `- ${c.label}`).join('\n'),
            })}
          />
        ) : null}

        {showHint ? (
          <View style={styles.hint}>
            <T variant="labelSm" color={colors.saffronInk}>
              HINT
            </T>
            <T style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.ink }}>{step.hint}</T>
          </View>
        ) : checks && !pass ? (
          <Pressable accessibilityRole="button" onPress={() => setShowHint(true)} style={{ alignSelf: 'center', minHeight: 40, justifyContent: 'center' }}>
            <T variant="labelSm" color={colors.primary}>
              Stuck? Show a hint
            </T>
          </Pressable>
        ) : null}
      </ScrollView>

      <ActionBar tone={pass ? 'success' : undefined}>
        {pass ? (
          <Animated.View entering={ZoomIn.duration(220)}>
            <Button variant="success" label="Continue · checklist complete" onPress={onDone} />
          </Animated.View>
        ) : (
          <Button label={!filled ? 'Fill every gap first' : checks ? 'Check again' : 'Check my page'} disabled={!filled} onPress={check} />
        )}
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 14 },
  previewHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  tabs: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 12, padding: 3 },
  tab: { flex: 1, minHeight: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  console: { borderRadius: 12, backgroundColor: colors.code.console, padding: 10, gap: 2 },
  consoleText: { fontFamily: fonts.mono, fontSize: 12.5, color: colors.code.text },
  checks: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  check: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  hint: { borderRadius: 14, backgroundColor: colors.saffronSoft, padding: 12, gap: 4 },
});
