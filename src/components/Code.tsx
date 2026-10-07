import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { CodeLang, Seg } from '@/content';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

const C = colors.code;

const KEYWORDS = new Set([
  'for', 'in', 'def', 'return', 'if', 'else', 'elif', 'while', 'let', 'const', 'function',
  'import', 'from', 'export', 'True', 'False', 'None', 'true', 'false', 'null', 'undefined', 'class',
]);
const BUILTINS = new Set(['range', 'print', 'len', 'list', 'console', 'log', 'Math']);

type Token = { text: string; color: string };

/** A small, dependency-free highlighter tuned for the snippets in our lessons. */
export function tokenize(line: string, lang: CodeLang): Token[] {
  const tokens: Token[] = [];
  const markup = lang === 'html' || lang === 'jsx' || lang === 'css';
  const re = markup
    ? /(\s+)|(\/\/.*$)|("[^"]*"|'[^']*')|(<\/?[A-Za-z][\w.]*|\/?>)|(\d+(?:\.\d+)?)|([A-Za-z_][\w]*)|(.)/g
    : /(\s+)|(#.*$|\/\/.*$)|("[^"]*"|'[^']*')|()(\d+(?:\.\d+)?)|([A-Za-z_][\w]*)|(.)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const [text, space, comment, str, tag, num, word] = m;
    let color: string = C.text;
    if (space) color = C.text;
    else if (comment) color = C.comment;
    else if (str) color = C.string;
    else if (tag) color = C.tag;
    else if (num) color = C.number;
    else if (word) {
      const rest = line.slice(re.lastIndex).trimStart();
      if (KEYWORDS.has(word)) color = C.keyword;
      else if (BUILTINS.has(word)) color = C.builtin;
      else if (rest.startsWith('(')) color = C.func;
      else if (markup && rest.startsWith('=')) color = C.keyword;
    }
    tokens.push({ text, color });
  }
  return tokens;
}

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

/** Read-only code with line numbers; `highlight` marks one line (e.g. while a loop demo runs). */
export function CodeBlock({ lines, lang, highlight }: { lines: string[]; lang: CodeLang; highlight?: number | null }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10, minWidth: '100%' }}>
      <View style={{ minWidth: '100%' }}>
        {lines.map((line, i) => (
          <View key={i} style={[styles.row, highlight === i && { backgroundColor: '#2A2660' }]}>
            <Text style={styles.gutter}>{i + 1}</Text>
            <CodeText text={line} lang={lang} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/** Code with tappable gaps for fill-in exercises. */
export function GapCode({
  lines,
  lang,
  gaps,
  active,
  onGap,
}: {
  lines: Seg[][];
  lang: CodeLang;
  gaps: (string | null)[];
  active: number | null;
  onGap: (i: number) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
      <View>
        {lines.map((segs, i) => (
          <View key={i} style={[styles.row, { minHeight: segs.some((s) => typeof s !== 'string') ? 40 : 26 }]}>
            <Text style={styles.gutter}>{i + 1}</Text>
            {segs.map((seg, j) => {
              if (typeof seg === 'string') return <CodeText key={j} text={seg} lang={lang} />;
              const value = gaps[seg.gap];
              const isActive = active === seg.gap;
              return (
                <Pressable
                  key={j}
                  accessibilityRole="button"
                  accessibilityLabel={`Gap ${seg.gap + 1}: ${value ?? 'empty'}. Tap to choose a value`}
                  onPress={() => {
                    haptic.tap();
                    onGap(seg.gap);
                  }}
                  hitSlop={6}
                  style={[
                    styles.gap,
                    value === null ? styles.gapEmpty : styles.gapFilled,
                    isActive && { boxShadow: `0 0 0 2px ${colors.saffron}` },
                  ]}>
                  <Text style={[styles.code, { color: value === null ? C.func : '#FFFFFF' }]}>{value ?? '?'}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, minHeight: 24 },
  gutter: { fontFamily: fonts.mono, fontSize: 12, color: C.gutter, width: 22 },
  code: { fontFamily: fonts.mono, fontSize: 13.5, lineHeight: 22, color: C.text },
  gap: { minWidth: 42, height: 32, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 },
  gapEmpty: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: C.func },
  gapFilled: { backgroundColor: '#2A2660', borderWidth: 1.5, borderColor: colors.primary },
});
