import { router } from 'expo-router';
import { useCallback, useDeferredValue, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeEditor } from '@/components/CodeEditor';
import { WebPreview } from '@/components/WebPreview';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { ConsoleView } from '@/features/lesson/EditorStep';
import { useCodeRunner, type RunOutcome } from '@/lib/runner';
import type { RunLang } from '@/lib/runner/harness';
import { buildPage, type PageLog } from '@/lib/web/page';
import type { WebFile } from '@/content';
import { colors } from '@/theme';

const SNIPPETS: Record<RunLang, { label: string; code: string }[]> = {
  python: [
    { label: 'Hello', code: 'name = "Yatri"\nprint("Namaste,", name)\n' },
    { label: 'Loop', code: 'for i in range(1, 6):\n    print(i, "x 5 =", i * 5)\n' },
    { label: 'Function', code: 'def fare(km):\n    if km <= 10:\n        return 20\n    return 20 + (km - 10) * 2\n\nprint(fare(25))\n' },
    { label: 'List', code: 'cities = ["Delhi", "Jaipur", "Pune"]\nfor c in cities:\n    print(c.upper())\nprint(len(cities), "cities")\n' },
  ],
  javascript: [
    { label: 'Hello', code: 'const name = "Yatri";\nconsole.log(`Namaste, ${name}`);\n' },
    { label: 'Loop', code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i, "x 5 =", i * 5);\n}\n' },
    { label: 'Function', code: 'function fare(km) {\n  if (km <= 10) return 20;\n  return 20 + (km - 10) * 2;\n}\n\nconsole.log(fare(25));\n' },
    { label: 'Array', code: 'const seats = [12, 0, 7, 3];\nconst open = seats.filter((s) => s > 0);\nconsole.log(open, open.length);\n' },
  ],
};

const NL = '\n';
const WEB_STARTER = {
  html: ['<h1>Namaste!</h1>', '<p>Edit the files and watch this page change.</p>', '<button id="btn">Tap me</button>', ''].join(NL),
  css: [
    'body {',
    '  background: #F6F5FA;',
    '}',
    'h1 {',
    '  color: #4B3FD8;',
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

type Mode = RunLang | 'web';

/** HTML, CSS and JS editors with a live preview of the page. */
function WebPlayground() {
  const [files, setFiles] = useState(WEB_STARTER);
  const [tab, setTab] = useState<WebFile>('html');
  const [logs, setLogs] = useState<PageLog[]>([]);
  const doc = useDeferredValue(buildPage(files));
  const onLog = useCallback((log: PageLog) => setLogs((l) => [...l.slice(-5), log]), []);
  return (
    <>
      <WebPreview key={doc} doc={doc} height={260} onLog={onLog} />
      {logs.length ? <ConsoleView output={logs.filter((l) => l.level === 'log').map((l) => l.text)} error={logs.find((l) => l.level === 'error')?.text} /> : null}
      <View style={styles.segment} accessibilityRole="tablist">
        {(['html', 'css', 'js'] as WebFile[]).map((f) => (
          <Pressable
            key={f}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === f }}
            onPress={() => setTab(f)}
            style={[styles.segmentBtn, tab === f && styles.segmentOn]}>
            <T variant="labelSm" color={tab === f ? colors.ink : colors.ink2}>
              {WEB_FILE[f]}
            </T>
          </Pressable>
        ))}
      </View>
      <CodeEditor
        key={tab}
        value={files[tab]}
        onChange={(v) => {
          setFiles({ ...files, [tab]: v });
          setLogs([]);
        }}
        lang={tab === 'js' ? 'javascript' : tab}
        file={WEB_FILE[tab]}
        minLines={10}
      />
    </>
  );
}

export default function Playground() {
  const run = useCodeRunner();
  const [mode, setMode] = useState<Mode>('python');
  const lang: RunLang = mode === 'web' ? 'javascript' : mode;
  const [code, setCode] = useState<Record<RunLang, string>>({ python: SNIPPETS.python[0].code, javascript: SNIPPETS.javascript[0].code });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RunOutcome | null>(null);
  const [warmedPython, setWarmedPython] = useState(false);

  const execute = async () => {
    setBusy(true);
    const r = await run(lang, code[lang]);
    setBusy(false);
    if (lang === 'python') setWarmedPython(true);
    setResult(r);
  };

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
          <T variant="caption">Write anything. It really runs.</T>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 4, gap: 14 }} keyboardShouldPersistTaps="handled">
        <View style={styles.segment} accessibilityRole="tablist">
          {(['python', 'javascript', 'web'] as Mode[]).map((m) => (
            <Pressable
              key={m}
              accessibilityRole="tab"
              accessibilityState={{ selected: mode === m }}
              onPress={() => {
                setMode(m);
                setResult(null);
              }}
              style={[styles.segmentBtn, mode === m && styles.segmentOn]}>
              <T variant="label" color={mode === m ? colors.ink : colors.ink2}>
                {m === 'python' ? 'Python' : m === 'javascript' ? 'JavaScript' : 'Web page'}
              </T>
            </Pressable>
          ))}
        </View>
        {mode === 'web' ? <WebPlayground /> : null}
        {mode !== 'web' ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }} style={{ flexGrow: 0 }}>
              {SNIPPETS[lang].map((s) => (
                <Pressable
                  key={s.label}
                  accessibilityRole="button"
                  accessibilityLabel={`Load ${s.label} example`}
                  onPress={() => {
                    setCode({ ...code, [lang]: s.code });
                    setResult(null);
                  }}
                  style={styles.snippet}>
                  <T variant="labelSm" color={colors.primary}>
                    {s.label}
                  </T>
                </Pressable>
              ))}
            </ScrollView>
            <CodeEditor value={code[lang]} onChange={(v) => setCode({ ...code, [lang]: v })} lang={lang} file={lang === 'python' ? 'main.py' : 'main.js'} minLines={10} />
            {busy && lang === 'python' && !warmedPython ? (
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
          </>
        ) : null}
      </ScrollView>
      {mode !== 'web' ? (
        <View style={{ padding: 16, paddingTop: 8 }}>
          <Button label={busy ? 'Running…' : 'Run'} icon={busy ? undefined : (c) => <Glyph name="play" size={18} color={c} />} disabled={busy} onPress={execute} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: { height: 60, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12 },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  segment: { flexDirection: 'row', gap: 2, backgroundColor: colors.lineSoft, borderRadius: 12, padding: 3 },
  segmentBtn: { flex: 1, minHeight: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segmentOn: { backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(22,20,43,0.12)' },
  snippet: { minHeight: 36, paddingHorizontal: 14, borderRadius: 18, backgroundColor: colors.primarySoft, justifyContent: 'center' },
  loading: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderRadius: 14, backgroundColor: colors.primarySoft },
});
