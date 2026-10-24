import { router } from 'expo-router';
import { useCallback, useDeferredValue, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BuildBoard, TweakCode, useBuild, useTweaks } from '@/components/TapToBuild';
import { WebPreview } from '@/components/WebPreview';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { ConsoleView } from '@/features/lesson/EditorStep';
import { playgroundPrograms, playSeed, type PlayLang, type PlayProgram } from '@/content/playground';
import { useCodeRunner, type RunOutcome } from '@/lib/runner';
import { buildPage, type PageLog } from '@/lib/web/page';
import type { WebFile } from '@/content';
import { colors } from '@/theme';

const NL = '\n';
const WEB_STARTER = {
  html: ['<h1>Namaste!</h1>', '<p>Tap a highlighted value and watch this page change.</p>', '<button id="btn">Tap me</button>', ''].join(NL),
  css: [
    'body {',
    '  background: #F6F5FA;',
    '}',
    'h1 {',
    '  color: #4B3FD8;',
    '  font-size: 28px;',
    '}',
    'button {',
    '  background: #FF9F1C;',
    '  border: 0;',
    '  padding: 10px 16px;',
    '  border-radius: 10px;',
    '}',
    '',
  ].join(NL),
  js: [
    'const btn = document.querySelector("#btn");',
    'let taps = 0;',
    'btn.addEventListener("click", () => {',
    '  taps++;',
    '  btn.textContent = `Tapped ${taps} times`;',
    '  console.log("taps:", taps);',
    '});',
    '',
  ].join(NL),
};
const WEB_FILE: Record<WebFile, string> = { html: 'index.html', css: 'style.css', js: 'app.js' };
const WEB_LANG = { html: 'html', css: 'css', js: 'javascript' } as const;

type Mode = PlayLang | 'web';
type Activity = 'tinker' | 'build';

/** A page whose values change by tapping them, with a live preview. */
function WebPlayground() {
  const html = useTweaks(WEB_STARTER.html, 'html', 'play|web:html');
  const css = useTweaks(WEB_STARTER.css, 'css', 'play|web:css');
  const js = useTweaks(WEB_STARTER.js, 'javascript', 'play|web:js');
  const [tab, setTab] = useState<WebFile>('css');
  const [logs, setLogs] = useState<PageLog[]>([]);
  const doc = useDeferredValue(buildPage({ html: html.code, css: css.code, js: js.code }));
  const onLog = useCallback((log: PageLog) => setLogs((l) => [...l.slice(-5), log]), []);
  return (
    <>
      <WebPreview key={doc} doc={doc} height={240} onLog={onLog} />
      {logs.length ? <ConsoleView output={logs.filter((l) => l.level === 'log').map((l) => l.text)} error={logs.find((l) => l.level === 'error')?.text} /> : null}
      <View style={styles.segment} accessibilityRole="tablist">
        {(['html', 'css', 'js'] as WebFile[]).map((f) => (
          <Pressable key={f} accessibilityRole="tab" accessibilityState={{ selected: tab === f }} onPress={() => setTab(f)} style={[styles.segmentBtn, tab === f && styles.segmentOn]}>
            <T variant="labelSm" color={tab === f ? colors.ink : colors.ink2}>
              {WEB_FILE[f]}
            </T>
          </Pressable>
        ))}
      </View>
      <TweakCode key={tab} tweak={{ html, css, js }[tab]} source={WEB_STARTER[tab]} lang={WEB_LANG[tab]} file={WEB_FILE[tab]} />
    </>
  );
}

/** Tinker: tap values to change them. Build: tap pieces into the gaps. Either way, Run runs it for real. */
function CodeWorkbench({ lang, program, activity }: { lang: PlayLang; program: PlayProgram; activity: Activity }) {
  const run = useCodeRunner();
  const tweak = useTweaks(program.code, lang, playSeed(program));
  const build = useBuild(program.code, lang, playSeed(program));
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RunOutcome | null>(null);
  const [warmed, setWarmed] = useState(lang !== 'python');
  const file = lang === 'python' ? 'main.py' : 'main.js';
  const ready = activity === 'tinker' || build.filled;

  const execute = async () => {
    setBusy(true);
    const r = await run(lang, activity === 'tinker' ? tweak.code : build.code);
    setBusy(false);
    setWarmed(true);
    setResult(r);
    if (activity === 'build' && !r.ok) build.markWrong();
  };

  return (
    <>
      {activity === 'tinker' ? (
        <TweakCode tweak={tweak} source={program.code} lang={lang} file={file} />
      ) : (
        <BuildBoard build={build} lang={lang} file={file} />
      )}
      {activity === 'build' && build.filled ? (
        <Pressable accessibilityRole="button" onPress={build.reset} style={styles.chip}>
          <Icon name="reset" size={16} color={colors.ink2} />
          <T variant="labelSm" color={colors.ink2}>
            Clear the gaps
          </T>
        </Pressable>
      ) : null}
      {busy && !warmed ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <T variant="bodySm" color={colors.ink2} style={{ flex: 1 }}>
            Starting Python for the first time (about 10 MB, once).
          </T>
        </View>
      ) : null}
      {result ? (
        <Animated.View entering={FadeInDown.duration(240)}>
          <ConsoleView output={result.output} error={result.error} />
        </Animated.View>
      ) : null}
      <Button
        label={busy ? 'Running…' : ready ? 'Run' : 'Fill every gap first'}
        icon={busy || !ready ? undefined : (c) => <Glyph name="play" size={18} color={c} />}
        disabled={busy || !ready}
        onPress={execute}
      />
    </>
  );
}

export default function Playground() {
  const [mode, setMode] = useState<Mode>('python');
  const [activity, setActivity] = useState<Activity>('tinker');
  const programs = playgroundPrograms();
  const [picked, setPicked] = useState<Record<PlayLang, string>>({ python: programs.python[0].id, javascript: programs.javascript[0].id });
  const lang: PlayLang = mode === 'web' ? 'javascript' : mode;
  const program = programs[lang].find((p) => p.id === picked[lang]) ?? programs[lang][0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={6} style={styles.back}>
          <Icon name="back" size={22} color={colors.ink} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <T variant="heading" accessibilityRole="header">
            Code playground
          </T>
          <T variant="caption">Tap to change it or build it. It really runs.</T>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 14 }}>
        <View style={styles.segment} accessibilityRole="tablist">
          {(['python', 'javascript', 'web'] as Mode[]).map((m) => (
            <Pressable key={m} accessibilityRole="tab" accessibilityState={{ selected: mode === m }} onPress={() => setMode(m)} style={[styles.segmentBtn, mode === m && styles.segmentOn]}>
              <T variant="label" color={mode === m ? colors.ink : colors.ink2}>
                {m === 'python' ? 'Python' : m === 'javascript' ? 'JavaScript' : 'Web page'}
              </T>
            </Pressable>
          ))}
        </View>
        {mode === 'web' ? (
          <WebPlayground />
        ) : (
          <>
            <View style={styles.segment} accessibilityRole="tablist">
              {(['tinker', 'build'] as Activity[]).map((a) => (
                <Pressable key={a} accessibilityRole="tab" accessibilityState={{ selected: activity === a }} onPress={() => setActivity(a)} style={[styles.segmentBtn, activity === a && styles.segmentOn]}>
                  <T variant="labelSm" color={activity === a ? colors.ink : colors.ink2}>
                    {a === 'tinker' ? 'Tinker: tap values' : 'Build: fill the gaps'}
                  </T>
                </Pressable>
              ))}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }} style={{ flexGrow: 0 }}>
              {programs[lang].map((p) => (
                <Pressable
                  key={p.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: p.id === program.id }}
                  accessibilityLabel={`Open ${p.label}`}
                  onPress={() => setPicked({ ...picked, [lang]: p.id })}
                  style={[styles.snippet, p.id === program.id && { backgroundColor: colors.primary }]}>
                  <T variant="labelSm" color={p.id === program.id ? '#FFFFFF' : colors.primary} numberOfLines={1}>
                    {p.label}
                  </T>
                </Pressable>
              ))}
            </ScrollView>
            {/* A new key resets the gaps and values when the program or the activity changes. */}
            <CodeWorkbench key={`${program.id}:${activity}`} lang={lang} program={program} activity={activity} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: { height: 60, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12 },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 12, padding: 3 },
  segmentBtn: { flex: 1, minHeight: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  snippet: { minHeight: 36, maxWidth: 220, paddingHorizontal: 14, borderRadius: 18, backgroundColor: colors.primarySoft, justifyContent: 'center' },
  chip: { alignSelf: 'flex-start', minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  loading: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderRadius: 14, backgroundColor: colors.primarySoft },
});
