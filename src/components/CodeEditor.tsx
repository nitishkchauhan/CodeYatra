import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, type NativeSyntheticEvent, type TextInputSelectionChangeEventData } from 'react-native';

import { haptic } from '@/lib/haptics';
import { LANG_COLOR } from './Code';
import { colors, fonts } from '@/theme';

const C = colors.code;
const CHAR_W = 8.15; // JetBrains Mono at 13.5px
const LINE_H = 22;

export type EditorLang = 'python' | 'javascript' | 'html' | 'css' | 'sql';

const LANG_NAME: Record<EditorLang, string> = { python: 'Python', javascript: 'JavaScript', html: 'HTML', css: 'CSS', sql: 'SQL' };

const KEYS: Record<EditorLang, { label: string; insert: string; caret?: number }[]> = {
  python: [
    { label: 'Tab', insert: '    ' },
    { label: '( )', insert: '()', caret: 1 },
    { label: ':', insert: ':' },
    { label: '" "', insert: '""', caret: 1 },
    { label: '[ ]', insert: '[]', caret: 1 },
    { label: '=', insert: ' = ' },
    { label: '#', insert: '# ' },
  ],
  javascript: [
    { label: 'Tab', insert: '  ' },
    { label: '( )', insert: '()', caret: 1 },
    { label: '{ }', insert: '{}', caret: 1 },
    { label: ';', insert: ';' },
    { label: '" "', insert: '""', caret: 1 },
    { label: '=>', insert: ' => ' },
    { label: '[ ]', insert: '[]', caret: 1 },
  ],
  html: [
    { label: 'Tab', insert: '  ' },
    { label: '< >', insert: '<>', caret: 1 },
    { label: '</', insert: '</' },
    { label: '=', insert: '=' },
    { label: '" "', insert: '""', caret: 1 },
    { label: '/', insert: '/' },
  ],
  css: [
    { label: 'Tab', insert: '  ' },
    { label: '{ }', insert: '{}', caret: 1 },
    { label: ':', insert: ': ' },
    { label: ';', insert: ';' },
    { label: '#', insert: '#' },
    { label: '.', insert: '.' },
    { label: 'px', insert: 'px' },
  ],
  sql: [
    { label: 'SELECT', insert: 'SELECT ' },
    { label: 'FROM', insert: 'FROM ' },
    { label: 'WHERE', insert: 'WHERE ' },
    { label: '*', insert: '*' },
    { label: "' '", insert: "''", caret: 1 },
    { label: ',', insert: ', ' },
    { label: ';', insert: ';' },
  ],
};

type Selection = { start: number; end: number };

/**
 * A phone-friendly code editor: no autocorrect, auto-indent after ":" or "{",
 * a key row for the symbols that are awkward on mobile keyboards, line numbers
 * and horizontal scrolling instead of wrapping.
 */
export function CodeEditor({
  value,
  onChange,
  lang,
  file,
  minLines = 8,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: EditorLang;
  file: string;
  minLines?: number;
}) {
  const [selection, setSelection] = useState<Selection>({ start: value.length, end: value.length });
  const [forced, setForced] = useState<Selection | undefined>(undefined);
  const lines = value.split('\n');
  const width = Math.max(320, Math.max(...lines.map((l) => l.length)) * CHAR_W + 48);
  const height = Math.max(minLines, lines.length) * LINE_H + 20;
  const unit = lang === 'python' ? '    ' : '  ';

  const place = (next: string, caret: number) => {
    onChange(next);
    const s = { start: caret, end: caret };
    setSelection(s);
    setForced(s);
  };

  const insert = (text: string, caretOffset = text.length) => {
    haptic.tap();
    const { start, end } = selection;
    place(value.slice(0, start) + text + value.slice(end), start + caretOffset);
  };

  const onChangeText = (next: string) => {
    setForced(undefined);
    // Auto-indent: a newline typed at the caret keeps the line's indent, plus one level after ":" or "{".
    if (next.length === value.length + 1 && next[selection.start] === '\n' && selection.start === selection.end) {
      const before = value.slice(0, selection.start);
      const line = before.slice(before.lastIndexOf('\n') + 1);
      const indent = line.match(/^\s*/)?.[0] ?? '';
      const opens = lang === 'html' ? /<(?!\/|img|br|input|meta|link|hr)[^>]*[^/]>\s*$/.test(line) : /[:{]\s*$/.test(line);
      const extra = indent + (opens ? unit : '');
      if (extra) {
        place(next.slice(0, selection.start + 1) + extra + next.slice(selection.start + 1), selection.start + 1 + extra.length);
        return;
      }
    }
    onChange(next);
  };

  return (
    <View style={styles.frame}>
      <View style={styles.head}>
        <View style={[styles.dot, { backgroundColor: LANG_COLOR[lang] }]} />
        <Text style={styles.file}>{file}</Text>
        <Text style={styles.meta}>{lines.length} lines</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', width, minHeight: height }}>
          <View style={styles.gutter}>
            {lines.map((_, i) => (
              <Text key={i} style={styles.lineNo}>
                {i + 1}
              </Text>
            ))}
          </View>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            onSelectionChange={(e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => setSelection(e.nativeEvent.selection)}
            selection={forced}
            multiline
            scrollEnabled={false}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
            keyboardType="ascii-capable"
            textAlignVertical="top"
            accessibilityLabel={`Code editor, ${LANG_NAME[lang]}`}
            style={[styles.input, { minHeight: height }]}
            selectionColor={colors.saffron}
          />
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={styles.keys}>
        {KEYS[lang].map((k) => (
          <Pressable key={k.label} accessibilityRole="button" accessibilityLabel={`Insert ${k.label}`} onPress={() => insert(k.insert, k.caret)} style={({ pressed }) => [styles.key, pressed && { backgroundColor: '#2A2660' }]}>
            <Text style={styles.keyText}>{k.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { borderRadius: 16, backgroundColor: C.bg, overflow: 'hidden' },
  head: { height: 36, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: C.line },
  dot: { width: 7, height: 7, borderRadius: 4 },
  file: { fontFamily: fonts.mono, fontSize: 12, color: '#FFFFFF', flex: 1 },
  meta: { fontFamily: fonts.body, fontSize: 11, color: C.comment },
  gutter: { width: 34, paddingTop: 10, alignItems: 'flex-end', paddingRight: 8 },
  lineNo: { fontFamily: fonts.mono, fontSize: 12, lineHeight: LINE_H, color: C.gutter },
  input: { flex: 1, paddingTop: 10, paddingBottom: 10, paddingRight: 14, paddingLeft: 4, fontFamily: fonts.mono, fontSize: 13.5, lineHeight: LINE_H, color: C.text },
  keys: { flexDirection: 'row', gap: 6, padding: 8, borderTopWidth: 1, borderTopColor: C.line },
  key: { minWidth: 48, height: 40, borderRadius: 10, backgroundColor: C.bar, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  keyText: { fontFamily: fonts.mono, fontSize: 14, color: '#FFFFFF' },
});
