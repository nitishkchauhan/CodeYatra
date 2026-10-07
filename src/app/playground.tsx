import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CodeEditor } from '@/components/CodeEditor';
import { Button } from '@/components/ui/Button';
import { Glyph, Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import { ConsoleView } from '@/features/lesson/EditorStep';
import { useCodeRunner, type RunOutcome } from '@/lib/runner';
import type { RunLang } from '@/lib/runner/harness';
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

export default function Playground() {
  const run = useCodeRunner();
  const [lang, setLang] = useState<RunLang>('python');
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
          {(['python', 'javascript'] as RunLang[]).map((l) => (
            <Pressable
              key={l}
              accessibilityRole="tab"
              accessibilityState={{ selected: lang === l }}
              onPress={() => {
                setLang(l);
                setResult(null);
              }}
              style={[styles.segmentBtn, lang === l && styles.segmentOn]}>
              <T variant="label" color={lang === l ? colors.ink : colors.ink2}>
                {l === 'python' ? 'Python' : 'JavaScript'}
              </T>
            </Pressable>
          ))}
        </View>
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
      </ScrollView>
      <View style={{ padding: 16, paddingTop: 8 }}>
        <Button label={busy ? 'Running…' : 'Run'} icon={busy ? undefined : (c) => <Glyph name="play" size={18} color={c} />} disabled={busy} onPress={execute} />
      </View>
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
