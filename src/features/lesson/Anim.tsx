// Lesson v3 concept animations: small looping scenes that show an idea moving, built from a few
// shared pieces (boxes, chips, arrows) so they share one look. They hold still for people who
// turn on "reduce motion", showing the scene's last beat.
import { useEffect, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, useReducedMotion, ZoomIn } from 'react-native-reanimated';

import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { AnimKey } from '@/content';
import { colors, fonts } from '@/theme';

const BEAT_MS = 1100;

/** 0, 1, … beats-1, then round again. With reduced motion, always the last beat. */
function useBeat(beats: number): number {
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setBeat((b) => (b + 1) % beats), BEAT_MS);
    return () => clearInterval(t);
  }, [beats, reduced]);
  return reduced ? beats - 1 : beat;
}

// ── Pieces ────────────────────────────────────────────────────────────────────
function Box({ name, value, hot, tag, k }: { name?: string; value: string; hot?: boolean; tag?: string; k?: string | number }) {
  return (
    <View style={{ alignItems: 'center', gap: 3 }}>
      {name ? <T style={styles.boxName}>{name}</T> : null}
      <View style={[styles.box, hot && styles.boxHot]}>
        <Animated.View key={`${k ?? value}`} entering={ZoomIn.duration(260)}>
          <T style={styles.boxValue}>{value}</T>
        </Animated.View>
      </View>
      {tag ? <T style={styles.tag}>{tag}</T> : null}
    </View>
  );
}
function Chip({ children, tone = 'code', k }: { children: ReactNode; tone?: 'code' | 'ok' | 'bad' | 'soft' | 'warm'; k?: string | number }) {
  const bg = { code: colors.code.bg, ok: colors.successSoft, bad: colors.dangerSoft, soft: colors.primarySoft, warm: colors.saffronSoft }[tone];
  const ink = { code: '#FFFFFF', ok: colors.successInk, bad: colors.dangerInk, soft: colors.primary, warm: colors.saffronInk }[tone];
  return (
    <Animated.View key={k} entering={k === undefined ? undefined : FadeIn.duration(240)} style={[styles.chip, { backgroundColor: bg }]}>
      <T style={[styles.chipText, { color: ink }]}>{children}</T>
    </Animated.View>
  );
}
const Arrow = ({ down }: { down?: boolean }) => <T style={styles.arrow}>{down ? '↓' : '→'}</T>;
const Row = ({ children, gap = 8 }: { children: ReactNode; gap?: number }) => <View style={[styles.row, { gap }]}>{children}</View>;
function Console({ lines }: { lines: string[] }) {
  return (
    <View style={styles.console}>
      {lines.map((l, i) => (
        <Animated.View key={`${i}:${l}`} entering={FadeInLeft.duration(220)}>
          <T style={styles.consoleText}>{l}</T>
        </Animated.View>
      ))}
      {!lines.length ? <T style={[styles.consoleText, { opacity: 0.4 }]}>…</T> : null}
    </View>
  );
}
const Caption = ({ children }: { children: ReactNode }) => (
  <T variant="labelSm" color={colors.ink2} style={{ textAlign: 'center' }}>
    {children}
  </T>
);

// ── Scenes ────────────────────────────────────────────────────────────────────
function Variable() {
  const b = useBeat(4);
  const v = [40, 39, 38, 38][b];
  return (
    <>
      <Row>
        <Chip>{b < 3 ? 'seats = seats - 1' : 'print(seats)'}</Chip>
        <Arrow />
        <Box name="seats" value={String(v)} hot={b < 3} k={v} />
      </Row>
      <Caption>A variable is a labelled box. Assigning puts a new value in it.</Caption>
    </>
  );
}
function Print() {
  const b = useBeat(3);
  return (
    <>
      <Row>
        <Chip>{'print("Hello")'}</Chip>
        <Arrow />
        <Console lines={b >= 1 ? ['Hello', ...(b >= 2 ? ['…and on a new line'] : [])] : []} />
      </Row>
      <Caption>print() shows text on the screen, one line each time.</Caption>
    </>
  );
}
function Types() {
  const b = useBeat(4);
  const items: [string, string][] = [['42', 'int'], ['3.5', 'float'], ['"Ava"', 'str'], ['True', 'bool']];
  return (
    <>
      <Row>
        {items.map(([v, t], i) => (
          <Box key={t} value={v} tag={t} hot={i === b} k={`${t}${i === b}`} />
        ))}
      </Row>
      <Caption>Every value has a type, and the type decides what you can do with it.</Caption>
    </>
  );
}
function MathScene() {
  const b = useBeat(3);
  const rows = [['7 / 2', '3.5'], ['7 // 2', '3'], ['7 % 2', '1']];
  return (
    <>
      <Row>
        <Chip k={b}>{rows[b][0]}</Chip>
        <Arrow />
        <Box value={rows[b][1]} hot k={b} />
      </Row>
      <Caption>/ divides, // keeps the whole part, % gives the remainder.</Caption>
    </>
  );
}
function StringScene() {
  const b = useBeat(4);
  return (
    <>
      <Row gap={4}>
        {['P', 'u', 'n', 'e'].map((c, i) => (
          <Box key={c} value={c} tag={String(i)} hot={i === b} k={`${c}${i === b}`} />
        ))}
      </Row>
      <Caption>{`A string is a row of characters. city[${b}] is "${'Paris'[b]}".`}</Caption>
    </>
  );
}
function Branch() {
  const b = useBeat(2);
  const marks = b ? 35 : 72;
  const pass = marks >= 40;
  return (
    <>
      <Row>
        <Box name="marks" value={String(marks)} k={marks} />
        <Chip>{'if marks >= 40'}</Chip>
      </Row>
      <Row>
        <Chip tone={pass ? 'ok' : 'soft'} k={`p${pass}`}>
          {pass ? '✓ ' : ''}Pass
        </Chip>
        <Chip tone={!pass ? 'bad' : 'soft'} k={`f${pass}`}>
          {!pass ? '✓ ' : ''}Fail
        </Chip>
      </Row>
      <Caption>The condition picks one path. Only that block runs.</Caption>
    </>
  );
}
function Loop() {
  const b = useBeat(5);
  return (
    <>
      <Row>
        <Chip>for i in range(4)</Chip>
        <Box name="i" value={b < 4 ? String(b) : '3'} hot={b < 4} k={b} />
      </Row>
      <Console lines={Array.from({ length: Math.min(b + 1, 4) }, (_, i) => `round ${i}`)} />
      <Caption>The body runs once for each value: 0, 1, 2, 3.</Caption>
    </>
  );
}
function WhileLoop() {
  const b = useBeat(5);
  const n = [16, 8, 4, 2, 1][b];
  return (
    <>
      <Row>
        <Chip tone={n > 1 ? 'soft' : 'bad'} k={n > 1 ? 'go' : 'stop'}>
          {n > 1 ? 'while n > 1: keep going' : 'n > 1 is False: stop'}
        </Chip>
        <Box name="n" value={String(n)} hot k={n} />
      </Row>
      <Caption>A while loop repeats until its condition becomes False.</Caption>
    </>
  );
}
function List() {
  const b = useBeat(3);
  const items = ['"Dublin"', '"Paris"', ...(b >= 1 ? ['"Athens"'] : [])];
  return (
    <>
      <Row gap={4}>
        {items.map((c, i) => (
          <Box key={c} value={c} tag={String(i)} hot={b === 1 && i === 2} />
        ))}
      </Row>
      <Caption>{b >= 1 ? 'cities.append("Athens") adds to the end' : 'A list keeps items in order, counted from 0.'}</Caption>
    </>
  );
}
function Dict() {
  const b = useBeat(3);
  const rows: [string, string][] = [['"Ava"', '91'], ['"Reed"', '72'], ['"Zoey"', '85']];
  return (
    <>
      <View style={{ gap: 4, alignSelf: 'center' }}>
        {rows.map(([k, v], i) => (
          <Row key={k} gap={6}>
            <Chip tone={i === b ? 'warm' : 'soft'} k={`${k}${i === b}`}>
              {k}
            </Chip>
            <Arrow />
            <Box value={v} hot={i === b} k={`${v}${i === b}`} />
          </Row>
        ))}
      </View>
      <Caption>marks[{rows[b][0]}] looks up the key and gives {rows[b][1]}.</Caption>
    </>
  );
}
function FunctionScene() {
  const b = useBeat(3);
  const km = [10, 25, 40][b];
  return (
    <>
      <Row>
        <Box name="km" value={String(km)} k={km} />
        <Arrow />
        <View style={styles.machine}>
          <T style={[styles.chipText, { color: '#FFFFFF' }]}>fare(km)</T>
        </View>
        <Arrow />
        <Box name="returns" value={String(20 + km * 2)} hot k={km} />
      </Row>
      <Caption>A function takes inputs, does one job and returns a result.</Caption>
    </>
  );
}
function ErrorScene() {
  const b = useBeat(3);
  return (
    <>
      <Chip k={b === 2 ? 'fix' : 'bug'}>{b === 2 ? 'print("Seats: " + str(3))' : 'print("Seats: " + 3)'}</Chip>
      {b === 1 ? (
        <Animated.View entering={ZoomIn.duration(220)}>
          <Chip tone="bad">{'TypeError: can only concatenate str (not "int") to str'}</Chip>
        </Animated.View>
      ) : b === 2 ? (
        <Chip tone="ok" k="ok">
          ✓ Seats: 3
        </Chip>
      ) : (
        <View style={{ height: 34 }} />
      )}
      <Caption>An error message names the problem and the line. Read it, fix it, run again.</Caption>
    </>
  );
}
function FileScene() {
  const b = useBeat(4);
  return (
    <>
      <Row>
        <Chip>{b < 2 ? 'f.write(...)' : 'f.read()'}</Chip>
        <Arrow />
        <View style={styles.page}>
          <T style={styles.pageTitle}>marks.txt</T>
          {['Ava 91', 'Reed 72'].slice(0, b === 0 ? 1 : 2).map((l) => (
            <Animated.View key={l} entering={FadeInDown.duration(220)}>
              <T style={styles.pageLine}>{l}</T>
            </Animated.View>
          ))}
        </View>
      </Row>
      <Caption>{b < 2 ? 'Writing saves text in a file, so it is still there next time.' : 'Reading brings it back into the program.'}</Caption>
    </>
  );
}
function ClassObject() {
  const b = useBeat(3);
  return (
    <>
      <Row>
        <View style={[styles.page, { backgroundColor: colors.primarySoft }]}>
          <T style={[styles.pageTitle, { color: colors.primary }]}>class Ticket</T>
          <T style={styles.pageLine}>name · seats</T>
        </View>
        <Arrow />
        <View style={{ gap: 4 }}>
          {[['Ava', 2], ['Reed', 1]].slice(0, b + 1 > 2 ? 2 : b + 1).map(([n, s]) => (
            <Animated.View key={String(n)} entering={FadeInRight.duration(240)} style={styles.page}>
              <T style={styles.pageLine}>
                {n} · {s}
              </T>
            </Animated.View>
          ))}
        </View>
      </Row>
      <Caption>A class is a blueprint; each object made from it has its own values.</Caption>
    </>
  );
}
function ModuleScene() {
  const b = useBeat(3);
  const mods = ['math', 'random', 'datetime'];
  return (
    <>
      <Row>
        <Chip tone="warm" k={b}>
          import {mods[b]}
        </Chip>
        <Arrow />
        <View style={styles.page}>
          <T style={styles.pageTitle}>main.py</T>
          {mods.slice(0, b + 1).map((m) => (
            <Animated.View key={m} entering={FadeInLeft.duration(220)}>
              <T style={styles.pageLine}>uses {m}</T>
            </Animated.View>
          ))}
        </View>
      </Row>
      <Caption>import brings in tested code that someone else wrote, so you don’t start from zero.</Caption>
    </>
  );
}
function JsonScene() {
  const b = useBeat(2);
  return (
    <>
      <Row>
        <Box value={'{"seats": 3}'} tag={b ? 'text (str)' : 'dict'} hot k={b} />
        <Chip tone="soft" k={b}>
          {b ? 'json.loads →' : 'json.dumps →'}
        </Chip>
        <Box value={b ? "{'seats': 3}" : '\'{"seats": 3}\''} tag={b ? 'dict' : 'text (str)'} k={`o${b}`} />
      </Row>
      <Caption>JSON turns data into text to send or save, and back again.</Caption>
    </>
  );
}
function Api() {
  const b = useBeat(3);
  return (
    <>
      <Row>
        <Chip tone="soft">app</Chip>
        <Chip k={b} tone={b === 2 ? 'ok' : 'code'}>
          {b === 0 ? 'GET /trains →' : b === 1 ? '… waiting' : '← 200 OK [ … ]'}
        </Chip>
        <Chip tone="warm">server</Chip>
      </Row>
      <Caption>An API is how programs ask other programs for data, over the internet.</Caption>
    </>
  );
}
function TestScene() {
  const b = useBeat(4);
  const tests = ['fare(10) == 40', 'fare(0) == 20', 'fare(-5) raises error'];
  return (
    <>
      <View style={{ gap: 4, alignSelf: 'center' }}>
        {tests.slice(0, Math.min(b + 1, 3)).map((t, i) => (
          <Animated.View key={t} entering={FadeInLeft.duration(220)} style={styles.row}>
            <Icon name="check" size={14} color={colors.success} strokeWidth={3} />
            <T style={[styles.pageLine, { marginLeft: 6 }]}>{t}</T>
            {i === 2 && b === 3 ? <T style={[styles.tag, { marginLeft: 6 }]}>all pass</T> : null}
          </Animated.View>
        ))}
      </View>
      <Caption>Tests are small programs that check your program, every time you change it.</Caption>
    </>
  );
}
function Comprehension() {
  const b = useBeat(3);
  return (
    <>
      <Row gap={4}>
        {[1, 2, 3, 4].map((n) => (
          <Box key={n} value={String(n)} hot={b >= 1 && n % 2 === 0} />
        ))}
      </Row>
      <Arrow down />
      <Row gap={4}>
        {(b === 0 ? [] : b === 1 ? [2, 4] : [4, 16]).map((n) => (
          <Box key={`${b}${n}`} value={String(n)} hot k={`${b}${n}`} />
        ))}
      </Row>
      <Caption>{b < 2 ? '…if n % 2 == 0 keeps the even ones' : '[n * n for n in nums if n % 2 == 0]'}</Caption>
    </>
  );
}
function SetScene() {
  const b = useBeat(2);
  return (
    <>
      <Row gap={4}>
        {['"Paris"', '"Athens"', '"Paris"', '"Geneva"'].map((c, i) => (
          <Box key={i} value={c} hot={b === 1 && i === 2} />
        ))}
      </Row>
      <Arrow down />
      <Row gap={4}>
        {['"Paris"', '"Athens"', '"Geneva"'].map((c) => (
          <Box key={c} value={c} />
        ))}
      </Row>
      <Caption>A set keeps each value once, and checks “is it in?” instantly.</Caption>
    </>
  );
}
function Tuple() {
  const b = useBeat(2);
  return (
    <>
      <Row>
        <Box name="point" value="(28.6, 77.2)" tag="tuple" />
        <Chip tone={b ? 'bad' : 'code'} k={b}>
          {b ? "TypeError: 'tuple' object does not support item assignment" : 'point[0] = 19.0'}
        </Chip>
      </Row>
      <Caption>A tuple is fixed once made: good for values that belong together and must not change.</Caption>
    </>
  );
}
function Scope() {
  const b = useBeat(2);
  return (
    <>
      <View style={[styles.page, { padding: 10, gap: 6, alignSelf: 'center' }]}>
        <T style={styles.pageTitle}>program · total = 0</T>
        <View style={[styles.page, { backgroundColor: colors.primarySoft }]}>
          <T style={[styles.pageTitle, { color: colors.primary }]}>def add(): bonus = 5</T>
        </View>
        <Chip tone={b ? 'bad' : 'ok'} k={b}>
          {b ? 'outside: bonus → NameError' : 'inside add(): bonus is 5'}
        </Chip>
      </View>
      <Caption>Names made inside a function live only inside it.</Caption>
    </>
  );
}
function Recursion() {
  const b = useBeat(6);
  const depth = b < 4 ? b + 1 : 7 - b;
  return (
    <>
      <View style={{ gap: 3, alignSelf: 'center' }}>
        {Array.from({ length: depth }, (_, i) => (
          <Animated.View key={i} entering={FadeInDown.duration(200)} style={[styles.chip, { backgroundColor: i === depth - 1 ? colors.saffronSoft : colors.primarySoft, marginLeft: i * 12 }]}>
            <T style={[styles.chipText, { color: colors.ink }]}>fact({4 - i})</T>
          </Animated.View>
        ))}
      </View>
      <Caption>{b < 4 ? 'Each call waits for a smaller one…' : '…then the answers come back up.'}</Caption>
    </>
  );
}
function Generator() {
  const b = useBeat(4);
  return (
    <>
      <Row>
        <Chip>next(seats)</Chip>
        <Arrow />
        <Box value={String(b + 1)} hot k={b} tag="made only when asked" />
      </Row>
      <Caption>A generator hands out one value at a time, so it never builds the whole list.</Caption>
    </>
  );
}
function Decorator() {
  const b = useBeat(2);
  return (
    <>
      <View style={[styles.page, { borderColor: b ? colors.saffron : colors.line, borderWidth: 2, alignSelf: 'center', padding: 10 }]}>
        <T style={[styles.pageTitle, { color: colors.saffronInk }]}>@timed</T>
        <View style={[styles.machine, { marginTop: 4 }]}>
          <T style={[styles.chipText, { color: '#FFFFFF' }]}>book(seats)</T>
        </View>
        {b ? (
          <Animated.View entering={FadeIn}>
            <T style={styles.pageLine}>took 3 ms</T>
          </Animated.View>
        ) : null}
      </View>
      <Caption>A decorator wraps a function to add a feature, without changing its code.</Caption>
    </>
  );
}

// ── Web pages ────────────────────────────────────────────────────────────
function HtmlTags() {
  const b = useBeat(4);
  return (
    <>
      <View style={[styles.page, { alignSelf: 'center', minWidth: 240, gap: 6 }]}>
        <Row gap={4}>
          {b >= 1 ? <Chip tone="soft" k="h1o">{'<h1>'}</Chip> : null}
          <T style={[styles.pageLine, b >= 3 && { fontFamily: fonts.monoMedium, fontSize: 16 }]}>Rosa’s café</T>
          {b >= 1 ? <Chip tone="soft" k="h1c">{'</h1>'}</Chip> : null}
        </Row>
        <Row gap={4}>
          {b >= 2 ? <Chip tone="warm" k="po">{'<p>'}</Chip> : null}
          <T style={styles.pageLine}>Cheese Toast ₹80</T>
          {b >= 2 ? <Chip tone="warm" k="pc">{'</p>'}</Chip> : null}
        </Row>
      </View>
      <Caption>{b < 3 ? 'Tags label each part: this is a heading, this is a paragraph.' : 'The browser shows the content, styled by what each tag means.'}</Caption>
    </>
  );
}
function WebRequest() {
  const b = useBeat(4);
  return (
    <>
      <Row>
        <Chip tone="soft">phone</Chip>
        <Chip k={b} tone={b === 3 ? 'ok' : 'code'}>
          {b === 0 ? 'GET riyastiffins.in →' : b === 1 ? '… server looks for the page' : b === 2 ? '← 200 OK, index.html' : '✓ page drawn'}
        </Chip>
        <Chip tone="warm">server</Chip>
      </Row>
      <Caption>Your browser asks a server for the page, gets HTML back, and draws it.</Caption>
    </>
  );
}
function Outline() {
  const b = useBeat(4);
  const rows: [string, string, number][] = [['h1', 'Annual Day 2026', 0], ['h2', 'Timings', 1], ['h2', 'Dress code', 1], ['h3', 'Juniors', 2]];
  return (
    <>
      <View style={{ gap: 4, alignSelf: 'center' }}>
        {rows.slice(0, b + 1).map(([tag, text, depth]) => (
          <Animated.View key={text} entering={FadeInLeft.duration(220)} style={[styles.row, { justifyContent: 'flex-start', marginLeft: depth * 16 }]}>
            <Chip tone={depth === 0 ? 'warm' : 'soft'}>{tag}</Chip>
            <T style={[styles.pageLine, { marginLeft: 6 }]}>{text}</T>
          </Animated.View>
        ))}
      </View>
      <Caption>Headings make an outline, like chapters in a book.</Caption>
    </>
  );
}
function LinkJump() {
  const b = useBeat(3);
  return (
    <>
      <Row>
        <View style={styles.page}>
          <T style={styles.pageTitle}>index.html</T>
          <T style={[styles.pageLine, { color: colors.primary, textDecorationLine: 'underline' }]}>See today’s menu</T>
        </View>
        <Arrow />
        <View style={[styles.page, b >= 1 && { borderColor: colors.saffron, backgroundColor: colors.saffronSoft }]}>
          <T style={styles.pageTitle}>menu.html</T>
          {b >= 2 ? (
            <Animated.View entering={FadeIn}>
              <T style={styles.pageLine}>Lemon Tea ₹40</T>
            </Animated.View>
          ) : null}
        </View>
      </Row>
      <Caption>A link’s href says where to go. Tap it, and the browser opens that page.</Caption>
    </>
  );
}
function ImageLoad() {
  const b = useBeat(3);
  return (
    <>
      <View style={[styles.page, { alignSelf: 'center', width: 220, height: 90, alignItems: 'center', justifyContent: 'center' }, b === 1 && { backgroundColor: colors.saffronSoft }]}>
        {b === 0 ? <T style={styles.pageTitle}>loading toast.jpg…</T> : b === 1 ? <T style={[styles.pageLine, { fontSize: 22 }]}>🥪</T> : <T style={[styles.pageLine, { textAlign: 'center' }]}>“Cheese toast on a white plate”</T>}
      </View>
      <Caption>{b < 2 ? 'src is the picture file the browser downloads.' : 'If it can’t load, or the reader can’t see, the alt text says what it shows.'}</Caption>
    </>
  );
}

function Cascade() {
  const b = useBeat(3);
  return (
    <>
      <View style={{ gap: 6, alignSelf: 'center' }}>
        <View style={b >= 1 ? { opacity: 0.4 } : undefined}>
          <Chip tone="code">{'h1 { color: navy; }'}</Chip>
        </View>
        {b >= 1 ? <Chip tone="warm" k="later">{'h1 { color: orange; }'}</Chip> : null}
      </View>
      <View style={[styles.page, { alignSelf: 'center', minWidth: 200 }]}>
        <T style={[styles.pageLine, { fontFamily: fonts.bodyBold, fontSize: 16, color: b >= 2 ? colors.saffronShadow : colors.primary }]}>Rosa’s café</T>
      </View>
      <Caption>{b < 2 ? 'Two rules set the same thing…' : 'The later rule wins: that is the cascade.'}</Caption>
    </>
  );
}
function Specificity() {
  const b = useBeat(4);
  const rules: [string, string, string][] = [['p', '0-0-1', colors.ink], ['.price', '0-1-0', colors.saffronShadow], ['#offer', '1-0-0', colors.successInk]];
  const win = Math.min(b, 3) - 1;
  return (
    <>
      <View style={{ gap: 4, alignSelf: 'center' }}>
        {rules.slice(0, b).map(([sel, score], i) => (
          <Animated.View key={sel} entering={FadeInLeft.duration(220)} style={styles.row}>
            <Chip tone={i === win ? 'ok' : 'soft'}>{sel}</Chip>
            <T style={[styles.pageTitle, { marginLeft: 8 }]}>{score}</T>
          </Animated.View>
        ))}
      </View>
      <View style={[styles.page, { alignSelf: 'center' }]}>
        <T style={[styles.pageLine, { color: win >= 0 ? rules[win][2] : colors.ink }]}>Cheese Toast ₹80</T>
      </View>
      <Caption>The higher score wins: id beats class, class beats tag.</Caption>
    </>
  );
}
function BoxModel() {
  const b = useBeat(4);
  const label = ['content', 'padding: space inside', 'border: the line', 'margin: space outside'][b];
  return (
    <>
      <View style={{ padding: b >= 3 ? 14 : 0, borderWidth: 1, borderStyle: 'dashed', borderColor: b >= 3 ? colors.saffron : 'transparent', borderRadius: 10 }}>
        <View style={{ borderWidth: b >= 2 ? 3 : 0, borderColor: colors.primary, borderRadius: 8 }}>
          <View style={{ padding: b >= 1 ? 14 : 2, backgroundColor: b >= 1 ? colors.successSoft : 'transparent', borderRadius: 6 }}>
            <View style={{ backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 }}>
              <T style={styles.pageLine}>Cheese Toast ₹80</T>
            </View>
          </View>
        </View>
      </View>
      <Caption>{label}</Caption>
    </>
  );
}
function FlexAxis() {
  const b = useBeat(3);
  const mode = (['flex-start', 'center', 'space-between'] as const)[b];
  return (
    <>
      <View style={[styles.page, { width: 240, flexDirection: 'row', justifyContent: mode, alignItems: 'center', paddingVertical: 10, gap: 6 }]}>
        {['A', 'B', 'C'].map((x) => (
          <View key={x} style={[styles.box, { minWidth: 36, height: 32 }]}>
            <T style={styles.boxValue}>{x}</T>
          </View>
        ))}
      </View>
      <Chip k={mode} tone="code">{`justify-content: ${mode};`}</Chip>
      <Caption>Flex lines the children up, then spaces them along the line.</Caption>
    </>
  );
}
function GridTracks() {
  const b = useBeat(4);
  const filled = [0, 2, 4, 6][b];
  return (
    <>
      <View style={{ width: 228, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={[styles.box, { width: 72, minWidth: 72, height: 34 }, i >= filled && { borderStyle: 'dashed', backgroundColor: 'transparent' }]}>
            {i < filled ? <T style={styles.boxValue}>{`dish ${i + 1}`}</T> : null}
          </View>
        ))}
      </View>
      <Chip tone="code">grid-template-columns: repeat(3, 1fr);</Chip>
      <Caption>Grid draws the columns first, then fills each cell in order.</Caption>
    </>
  );
}

function StrictEqual() {
  const b = useBeat(3);
  return (
    <>
      <Row>
        <Chip>2</Chip>
        <Chip tone="warm">{'"2"'}</Chip>
      </Row>
      {b >= 1 ? (
        <Row>
          <Chip k="loose" tone="soft">{'2 == "2"'}</Chip>
          <Arrow />
          <Chip k="loose-r" tone="bad">true (converted first)</Chip>
        </Row>
      ) : null}
      {b >= 2 ? (
        <Row>
          <Chip k="strict" tone="soft">{'2 === "2"'}</Chip>
          <Arrow />
          <Chip k="strict-r" tone="ok">false (number ≠ text)</Chip>
        </Row>
      ) : null}
      <Caption>{b < 2 ? 'A number and some text that look the same…' : '=== checks the type too, so it never quietly converts.'}</Caption>
    </>
  );
}
function Callback() {
  const b = useBeat(4);
  const calls = ['byPrice(Tea, Toast)', 'byPrice(Sandwich, Tea)', 'byPrice(Sandwich, Toast)'];
  return (
    <>
      <Row>
        <Chip tone={b >= 1 ? 'soft' : 'warm'}>byPrice</Chip>
        <Arrow />
        <View style={styles.machine}>
          <T style={[styles.chipText, { color: '#FFFFFF' }]}>{b >= 1 ? 'menu.sort(byPrice)' : 'menu.sort( … )'}</T>
        </View>
      </Row>
      <View style={{ gap: 4, alignItems: 'center' }}>
        {calls.slice(0, Math.max(0, b - 1)).map((c) => (
          <Animated.View key={c} entering={FadeInLeft.duration(220)}>
            <Chip tone="code">{c}</Chip>
          </Animated.View>
        ))}
      </View>
      <Caption>{b < 2 ? 'You hand the function over, without calling it…' : 'sort calls it for you, again and again.'}</Caption>
    </>
  );
}
function DomTree() {
  const b = useBeat(4);
  const nodes: [string, number, boolean][] = [['body', 0, false], ['h1  Rosa’s café', 1, false], ['p  Items: <span id="count">', 1, b >= 2], ['button#add  Add', 1, false]];
  return (
    <>
      <View style={{ gap: 4, alignSelf: 'center' }}>
        {nodes.slice(0, b >= 1 ? 4 : 1).map(([n, depth, hot]) => (
          <Animated.View key={n} entering={FadeInDown.duration(220)} style={{ marginLeft: depth * 18 }}>
            <Chip tone={hot ? 'warm' : 'soft'}>{n}</Chip>
          </Animated.View>
        ))}
      </View>
      {b >= 2 ? <Chip k="qs" tone="code">{'document.querySelector("#count")'}</Chip> : null}
      <View style={[styles.page, { alignSelf: 'center', minWidth: 180 }]}>
        <T style={styles.pageLine}>Items: {b >= 3 ? '1' : '0'}</T>
      </View>
      <Caption>{b < 2 ? 'The browser turns the HTML into a tree of objects: the DOM.' : 'JavaScript finds a node and changes it; the page updates.'}</Caption>
    </>
  );
}
function EventLoop() {
  const b = useBeat(4);
  const lane = (title: string, items: string[]) => (
    <View style={[styles.page, { minWidth: 88, alignItems: 'center' }]}>
      <T style={styles.pageTitle}>{title}</T>
      {items.map((x) => (
        <Animated.View key={x} entering={ZoomIn.duration(220)}>
          <T style={styles.pageLine}>{x}</T>
        </Animated.View>
      ))}
    </View>
  );
  const running = [['fetch menu'], ['tap', 'scroll'], ['tap'], ['show dishes']][b];
  const waiting = b === 1 || b === 2 ? ['fetch'] : [];
  return (
    <>
      <Row gap={6}>
        {lane('Running', running)}
        {lane('Waiting', waiting)}
      </Row>
      <Caption>{['await sends the slow work off…', '…and the page keeps running taps and scrolls.', 'The data arrives in the background…', '…then the function carries on from where it waited.'][b]}</Caption>
    </>
  );
}

const SCENES: Record<AnimKey, () => ReactNode> = {
  variable: Variable,
  print: Print,
  types: Types,
  math: MathScene,
  string: StringScene,
  branch: Branch,
  loop: Loop,
  whileLoop: WhileLoop,
  list: List,
  dict: Dict,
  function: FunctionScene,
  error: ErrorScene,
  file: FileScene,
  classObject: ClassObject,
  module: ModuleScene,
  json: JsonScene,
  api: Api,
  test: TestScene,
  comprehension: Comprehension,
  set: SetScene,
  tuple: Tuple,
  scope: Scope,
  recursion: Recursion,
  generator: Generator,
  decorator: Decorator,
  htmlTags: HtmlTags,
  webRequest: WebRequest,
  outline: Outline,
  linkJump: LinkJump,
  imageLoad: ImageLoad,
  cascade: Cascade,
  specificity: Specificity,
  boxModel: BoxModel,
  flexAxis: FlexAxis,
  gridTracks: GridTracks,
  strictEqual: StrictEqual,
  callback: Callback,
  domTree: DomTree,
  eventLoop: EventLoop,
};
export const ANIM_KEYS = Object.keys(SCENES) as AnimKey[];

/** The animation for a concept card. Decorative: screen readers get the card's own text. */
export function Anim({ kind }: { kind: AnimKey }) {
  const Scene = SCENES[kind];
  return (
    <View style={styles.stage} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Scene />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, paddingVertical: 16, paddingHorizontal: 12, gap: 10, alignItems: 'center', minHeight: 150, justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' },
  box: { minWidth: 46, height: 42, paddingHorizontal: 8, borderRadius: 10, borderWidth: 2, borderColor: colors.primaryMuted, backgroundColor: colors.surfaceTint, alignItems: 'center', justifyContent: 'center' },
  boxHot: { borderColor: colors.saffron, backgroundColor: colors.saffronSoft },
  boxName: { fontFamily: fonts.monoMedium, fontSize: 11, color: colors.ink2 },
  boxValue: { fontFamily: fonts.monoMedium, fontSize: 14, color: colors.ink },
  tag: { fontFamily: fonts.bodySemibold, fontSize: 10.5, color: colors.primary },
  chip: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, maxWidth: 300 },
  chipText: { fontFamily: fonts.mono, fontSize: 12.5 },
  arrow: { fontFamily: fonts.bodyBold, fontSize: 18, color: colors.primary },
  console: { minWidth: 130, borderRadius: 10, backgroundColor: colors.code.console, paddingHorizontal: 10, paddingVertical: 8, gap: 2 },
  consoleText: { fontFamily: fonts.mono, fontSize: 12, color: colors.code.text },
  machine: { borderRadius: 12, backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 10 },
  page: { borderRadius: 10, backgroundColor: colors.surfaceTint, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 10, paddingVertical: 6, gap: 2 },
  pageTitle: { fontFamily: fonts.monoMedium, fontSize: 11.5, color: colors.ink2 },
  pageLine: { fontFamily: fonts.mono, fontSize: 12, color: colors.ink },
});
