// Coding without a keyboard: tap pieces into gaps (BuildBoard), or tap a value to change it (TweakCode).
// The puzzles and choices come from src/content/build.ts, where tests check every one of them.
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { GapCode, LANG_COLOR, tokenize } from '@/components/Code';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { CodeLang } from '@/content';
import { applyTweaks, assemble, buildPuzzle, lex, tweakables } from '@/content/build';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

/** Gaps, the bank and what the learner has filled in so far, for one piece of code. */
export function useBuild(code: string, lang: CodeLang, seed: string, starter = '', maxGaps?: number) {
  const puzzle = useMemo(() => buildPuzzle(code, lang, seed, starter, maxGaps), [code, lang, seed, starter, maxGaps]);
  const [gaps, setGaps] = useState<(string | null)[]>(() => puzzle.answers.map(() => null));
  const [active, setActive] = useState<number | null>(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const filled = gaps.every((g) => g !== null);

  const choose = (value: string) => {
    haptic.tap();
    const next = [...gaps];
    let i = active ?? next.findIndex((g) => g === null);
    if (i < 0) i = next.length - 1;
    next[i] = value;
    setGaps(next);
    setWrong((w) => w.filter((x) => x !== i));
    const empty = next.findIndex((g) => g === null);
    setActive(empty >= 0 ? empty : null);
  };
  const clearGap = (i: number) => {
    const next = [...gaps];
    next[i] = null;
    setGaps(next);
    setActive(i);
  };
  return {
    puzzle,
    gaps,
    active,
    wrong,
    filled,
    choose,
    clearGap,
    code: assemble(puzzle.lines, gaps),
    /** After a failed run: mark the pieces that differ from the tested solution. */
    markWrong: () => setWrong(gaps.flatMap((g, i) => (g !== puzzle.answers[i] ? [i] : []))),
    reveal: () => {
      setGaps(puzzle.answers);
      setWrong([]);
      setActive(null);
    },
    reset: () => {
      setGaps(puzzle.answers.map(() => null));
      setWrong([]);
      setActive(0);
    },
  };
}

type Build = ReturnType<typeof useBuild>;

/** The code with gaps, and the bank of pieces underneath. */
export function BuildBoard({ build, lang, file }: { build: Build; lang: CodeLang; file: string }) {
  const { puzzle, gaps, active, wrong } = build;
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.editor}>
        <View style={styles.editorHead}>
          <View style={[styles.fileDot, { backgroundColor: LANG_COLOR[lang] }]} />
          <T style={{ fontFamily: fonts.mono, fontSize: 12, color: '#FFFFFF', flex: 1 }}>{file}</T>
          <T style={{ fontSize: 11, color: colors.code.comment }}>
            {gaps.filter((g) => g !== null).length}/{gaps.length} filled
          </T>
        </View>
        <GapCode lines={puzzle.lines} lang={lang} gaps={gaps} active={active} onGap={build.clearGap} wrong={wrong} />
      </View>
      <Bank tokens={puzzle.tokens} label={active === null ? 'Tap a gap to change it' : `Choose the piece for gap ${active + 1}`} onPick={build.choose} />
    </View>
  );
}

export function Bank({ tokens, label, onPick }: { tokens: string[]; label: string; onPick: (v: string) => void }) {
  return (
    <View style={{ gap: 8 }}>
      <T variant="labelSm" color={colors.ink2}>
        {label}
      </T>
      <View style={styles.tokens}>
        {tokens.map((v) => (
          <Pressable
            key={v}
            accessibilityRole="button"
            accessibilityLabel={`Use ${v}`}
            onPress={() => onPick(v)}
            style={({ pressed }) => [styles.token, { boxShadow: pressed ? 'none' : '0 2px 0 #D9D5F7', transform: [{ translateY: pressed ? 2 : 0 }] }]}>
            <T style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.ink }}>{v}</T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/** Values in a program that can be changed by tapping, and the program with the current choices. */
export function useTweaks(code: string, lang: CodeLang, seed: string) {
  const tweaks = useMemo(() => tweakables(code, lang, seed), [code, lang, seed]);
  const [choice, setChoice] = useState<number[]>(() => tweaks.map(() => 0));
  const [open, setOpen] = useState<number | null>(null);
  return {
    tweaks,
    choice,
    open,
    setOpen,
    pick: (i: number, o: number) => {
      haptic.tap();
      setChoice((c) => c.map((v, j) => (j === i ? o : v)));
      setOpen(null);
    },
    reset: () => setChoice(tweaks.map(() => 0)),
    changed: choice.some((c) => c > 0),
    code: applyTweaks(code, lang, tweaks, choice),
  };
}

type Tweaks = ReturnType<typeof useTweaks>;

/** Read-only code where the highlighted values can be tapped and swapped for another. */
export function TweakCode({ tweak, source, lang, file }: { tweak: Tweaks; source: string; lang: CodeLang; file: string }) {
  const { tweaks, choice, open } = tweak;
  const rows = source.replace(/\n+$/, '').split('\n');
  const at = (line: number) => tweaks.map((t, i) => ({ t, i })).filter(({ t }) => t.line === line);
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.editor}>
        <View style={styles.editorHead}>
          <View style={[styles.fileDot, { backgroundColor: LANG_COLOR[lang] }]} />
          <T style={{ fontFamily: fonts.mono, fontSize: 12, color: '#FFFFFF', flex: 1 }}>{file}</T>
          {tweaks.length ? <T style={{ fontSize: 11, color: colors.code.comment }}>tap a highlighted value</T> : null}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
          <View>
            {rows.map((line, n) => {
              const here = at(n);
              if (!here.length) return <Row key={n} n={n} text={line} lang={lang} />;
              // Split the line around each tappable value (positions come from the same lexer as the tweaks).
              const parts = lexTexts(line, lang);
              return (
                <View key={n} style={[styles.row, { minHeight: 38 }]}>
                  <Text style={styles.gutter}>{n + 1}</Text>
                  {parts.map((text, col) => {
                    const hit = here.find(({ t }) => t.col === col);
                    if (!hit) return <CodeText key={col} text={text} lang={lang} />;
                    const value = hit.t.options[choice[hit.i]];
                    const isOpen = open === hit.i;
                    return (
                      <Pressable
                        key={col}
                        accessibilityRole="button"
                        accessibilityLabel={`${value}. Tap to change it`}
                        hitSlop={6}
                        onPress={() => {
                          haptic.tap();
                          tweak.setOpen(isOpen ? null : hit.i);
                        }}
                        style={[styles.tweak, choice[hit.i] > 0 && styles.tweakChanged, isOpen && { boxShadow: `0 0 0 2px ${colors.saffron}` }]}>
                        <Text style={[styles.code, { color: '#FFFFFF' }]}>{value}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {open !== null && tweaks[open] ? (
        <Animated.View entering={FadeInDown.duration(180)} style={{ gap: 8 }}>
          <T variant="labelSm" color={colors.ink2}>
            Change {tweaks[open].options[choice[open]]} to…
          </T>
          <View style={styles.tokens}>
            {tweaks[open].options.map((o, k) => (
              <Pressable
                key={o}
                accessibilityRole="button"
                accessibilityState={{ selected: choice[open] === k }}
                onPress={() => tweak.pick(open, k)}
                style={[styles.token, choice[open] === k && { borderColor: colors.primary, backgroundColor: colors.primarySoft }]}>
                <T style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.ink }}>{o}</T>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      ) : null}
      {tweak.changed ? (
        <Animated.View entering={FadeIn}>
          <Pressable accessibilityRole="button" onPress={tweak.reset} style={styles.chip}>
            <Icon name="reset" size={16} color={colors.ink2} />
            <T variant="labelSm" color={colors.ink2}>
              Back to the original
            </T>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

// The same split as the tweak finder, so token positions line up.
const lexTexts = (line: string, lang: CodeLang) => lex(line, lang).map((t) => t.text);

function CodeText({ text, lang }: { text: string; lang: CodeLang }) {
  return (
    <Text style={styles.code}>
      {tokenize(text, lang).map((t, i) => (
        <Text key={i} style={{ color: t.color }}>
          {t.text}
        </Text>
      ))}
    </Text>
  );
}

function Row({ n, text, lang }: { n: number; text: string; lang: CodeLang }) {
  return (
    <View style={styles.row}>
      <Text style={styles.gutter}>{n + 1}</Text>
      <CodeText text={text} lang={lang} />
    </View>
  );
}

const styles = StyleSheet.create({
  editor: { borderRadius: 16, backgroundColor: colors.code.bg, overflow: 'hidden' },
  editorHead: { height: 36, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: colors.code.line },
  fileDot: { width: 7, height: 7, borderRadius: 4 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, minHeight: 24 },
  gutter: { fontFamily: fonts.mono, fontSize: 12, color: colors.code.comment, width: 22 },
  code: { fontFamily: fonts.mono, fontSize: 13.5, lineHeight: 22, color: colors.code.text },
  tweak: { height: 30, paddingHorizontal: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 1, backgroundColor: '#2A2660', borderWidth: 1.5, borderColor: colors.saffron, borderStyle: 'dashed' },
  tweakChanged: { borderStyle: 'solid', backgroundColor: '#3B2A10' },
  tokens: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  token: { minWidth: 56, flexGrow: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#D9D5F7', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  chip: { alignSelf: 'flex-start', minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
});
