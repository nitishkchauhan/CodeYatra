// Lesson v5 screens (the HTML track): short phone screens, each with one thing to do. Teaching screens unlock
// Continue once the learner has done the thing (flipped every tile, tapped the lines, seen every version);
// checked screens use the v4 feedback: a hint on the first miss, the answer on the second, no lives.
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";

import { ActionBar, StepHeader } from "./Shell";
import { AUTO_NEXT_MS, Feedback } from "./V4";
import { CodeBlock } from "@/components/Code";
import { WebPreview } from "@/components/WebPreview";
import { Yatri } from "@/components/Yatri";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/components/ui/Text";
import type {
  ArrangeStep,
  ChatStep,
  CopyStep,
  ExploreStep,
  LiveStep,
  PagePreview,
  PlaceStep,
  RecapStep,
  ResizeStep,
  RevealStep,
  RunStep,
  Seg,
  SwipeStep,
  TapPageStep,
  TapBugStep,
  ToggleStep,
  XrayStep,
} from "@/content";
import { haptic } from "@/lib/haptics";
import { useCodeRunner, type RunOutcome } from "@/lib/runner";
import { pageAtWidth } from "@/lib/web/media";
import { buildPage, fillSlots } from "@/lib/web/page";
import { colors, fonts } from "@/theme";

type Done = { onDone: () => void };
type Checked = Done & { onMistake: () => void };

const HIGHLIGHT =
  "outline: 3px solid #FF9F1C !important; outline-offset: 2px; background-color: rgba(255,159,28,.15) !important;";
const page = (p: PagePreview, extraCss = "") =>
  buildPage({ html: p.html, css: (p.css ?? "") + extraCss, js: p.js });
/** The code is the page, or (when `html` is given) the code is the stylesheet for that page. */
const codePage = (code: string, css?: string, html?: string) =>
  html === undefined
    ? buildPage({ html: code, css })
    : buildPage({ html, css: (css ?? "") + "\n" + code });

/** A fixed-order shuffle, so a lesson looks the same every time it is opened. */
function shuffled<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out = items.map((v, i) => ({ v, i }));
  for (let i = out.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = (h >>> 16) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Never start already solved.
  if (out.length > 1 && out.every((o, k) => o.i === k))
    [out[0], out[1]] = [out[1], out[0]];
  return out.map((o) => o.v);
}

function useShake() {
  const x = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));
  const shake = () =>
    x.set(
      withSequence(
        withTiming(-7, { duration: 50 }),
        withTiming(7, { duration: 50 }),
        withTiming(-4, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      ),
    );
  return { style, shake };
}

/**
 * Every v5 screen: the content scrolls, and the bottom bar stays fixed above the safe area. The bar holds the main
 * action and, after an answer, the feedback (right / not quite / the answer, with Continue), so neither is ever
 * hidden below the fold.
 */
function Screen({
  children,
  bar,
  feedback,
  scroller,
}: {
  children: React.ReactNode;
  bar?: React.ReactNode;
  feedback?: React.ReactNode;
  scroller?: React.RefObject<ScrollView | null>;
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scroller}
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {bar || feedback ? (
        <ActionBar>
          <View style={{ gap: 10 }}>
            {feedback}
            {bar}
          </View>
        </ActionBar>
      ) : null}
    </View>
  );
}

function Continue({
  ready,
  hint,
  onDone,
}: {
  ready: boolean;
  hint: string;
  onDone: () => void;
}) {
  return (
    <Button
      label={ready ? "Continue" : hint}
      disabled={!ready}
      onPress={onDone}
    />
  );
}

/** Calls `onDone` once, a moment after `when` becomes true (a right answer moves on by itself). */
function useAutoNext(when: boolean, onDone: () => void, ms = AUTO_NEXT_MS) {
  const fired = useRef(false);
  useEffect(() => {
    if (!when || fired.current) return;
    const t = setTimeout(() => {
      fired.current = true;
      onDone();
    }, ms);
    return () => clearTimeout(t);
  }, [when, onDone, ms]);
}

// ── Chat ─────────────────────────────────────────────────────────────────────

export function ChatScreen({ step, onDone }: { step: ChatStep } & Done) {
  const [shown, setShown] = useState(1);
  const all = shown >= step.lines.length;
  return (
    <Screen
      bar={
        <Button
          label={all ? (step.button ?? "Continue") : "Next"}
          onPress={() => (all ? onDone() : setShown(shown + 1))}
        />
      }
    >
      {step.kicker ? <T variant="kicker">{step.kicker}</T> : null}
      <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-end" }}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <Yatri size={64} mood="happy" />
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          {step.lines.slice(0, shown).map((line, i) => (
            <Animated.View
              key={i}
              entering={FadeInRight.duration(260)}
              style={styles.bubble}
            >
              <T variant="body" color={colors.ink}>
                {line}
              </T>
            </Animated.View>
          ))}
        </View>
      </View>
      {step.code ? (
        <View style={styles.code}>
          <CodeBlock lines={step.code} lang="html" />
        </View>
      ) : null}
      {step.page ? <WebPreview doc={page(step.page)} height={170} /> : null}
    </Screen>
  );
}

// ── Tap to reveal ────────────────────────────────────────────────────────────

export function RevealScreen({ step, onDone }: { step: RevealStep } & Done) {
  const [open, setOpen] = useState<number[]>([]);
  const all = open.length >= step.items.length;
  return (
    <Screen
      bar={
        <Continue
          ready={all}
          hint={`Tap every card (${open.length}/${step.items.length})`}
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.intro}
        color={colors.primary}
      />
      {step.code ? (
        <View style={styles.code}>
          <CodeBlock lines={step.code} lang="html" />
        </View>
      ) : null}
      <View style={{ gap: 8 }}>
        {step.items.map((it, i) => {
          const isOpen = open.includes(i);
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              accessibilityLabel={
                isOpen ? `${it.front}: ${it.back}` : `${it.front}. Tap to flip`
              }
              onPress={() => {
                haptic.tap();
                if (!isOpen) setOpen([...open, i]);
              }}
              style={[styles.tile, isOpen && styles.tileOpen]}
            >
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                {it.icon ? <T style={{ fontSize: 20 }}>{it.icon}</T> : null}
                <T
                  style={[
                    { flex: 1, fontSize: 15, color: colors.ink },
                    it.mono
                      ? { fontFamily: fonts.mono }
                      : { fontFamily: fonts.bodySemibold },
                  ]}
                >
                  {it.front}
                </T>
                {!isOpen ? (
                  <Icon name="chevronDown" size={16} color={colors.ink3} />
                ) : null}
              </View>
              {isOpen ? (
                <Animated.View entering={FadeInDown.duration(200)}>
                  <T
                    variant="bodySm"
                    color={colors.inkBody}
                    style={{ fontSize: 14, lineHeight: 21 }}
                  >
                    {it.back}
                  </T>
                </Animated.View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

// ── Explore ──────────────────────────────────────────────────────────────────

export function ExploreScreen({ step, onDone }: { step: ExploreStep } & Done) {
  const [seen, setSeen] = useState<number[]>([]);
  const [at, setAt] = useState<number | null>(null);
  const need = step.minTaps ?? Math.min(3, step.notes.length);
  const note = step.notes.find((n) => n.line === at);
  const doc = useMemo(
    () =>
      page(
        step.page ?? { html: step.code.join("\n") },
        note?.select ? `${note.select}{${HIGHLIGHT}}` : "",
      ),
    [step, note],
  );
  return (
    <Screen
      bar={
        <Continue
          ready={seen.length >= need}
          hint={`Tap ${need - seen.length} more line${need - seen.length === 1 ? "" : "s"}`}
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.intro ?? "Tap a line of code to see what it does."}
        color={colors.primary}
      />
      <View style={[styles.code, { paddingVertical: 6 }]}>
        {step.code.map((line, i) => {
          const n = step.notes.find((x) => x.line === i + 1);
          const on = at === i + 1;
          return (
            <Pressable
              key={i}
              disabled={!n}
              accessibilityRole={n ? "button" : "text"}
              accessibilityLabel={`Line ${i + 1}: ${line.trim()}`}
              onPress={() => {
                haptic.tap();
                setAt(i + 1);
                if (!seen.includes(i + 1)) setSeen([...seen, i + 1]);
              }}
              style={[
                styles.codeRow,
                on && styles.codeRowOn,
                n && !seen.includes(i + 1) && styles.codeRowTap,
              ]}
            >
              <T style={styles.gutter}>{i + 1}</T>
              <T style={styles.mono}>{line}</T>
            </Pressable>
          );
        })}
      </View>
      {note ? (
        <Animated.View
          key={note.line}
          entering={FadeInDown.duration(200)}
          style={styles.note}
        >
          <T
            variant="bodySm"
            color={colors.ink}
            style={{ fontSize: 14, lineHeight: 21 }}
          >
            {note.text}
          </T>
        </Animated.View>
      ) : null}
      <WebPreview doc={doc} height={190} />
    </Screen>
  );
}

// ── Toggle and Before / After ────────────────────────────────────────────────

export function ToggleScreen({ step, onDone }: { step: ToggleStep } & Done) {
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const v = step.views[i];
  const doc = useMemo(
    () => (v.out ? "" : page(v.page ?? { html: v.code.join("\n") })),
    [v],
  );
  return (
    <Screen
      bar={
        <Continue
          ready={seen.length >= step.views.length}
          hint="Try every switch"
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.intro}
        color={colors.primary}
      />
      <View style={styles.segment} accessibilityRole="tablist">
        {step.views.map((x, k) => (
          <Pressable
            key={x.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: k === i }}
            onPress={() => {
              haptic.tap();
              setI(k);
              if (!seen.includes(k)) setSeen([...seen, k]);
            }}
            style={[styles.segmentItem, k === i && styles.segmentOn]}
          >
            <T variant="labelSm" color={k === i ? "#FFFFFF" : colors.ink}>
              {x.label}
            </T>
          </Pressable>
        ))}
      </View>
      <View style={styles.code}>
        <CodeBlock lines={v.code} lang={v.out ? "javascript" : "html"} />
      </View>
      {v.out ? (
        <ConsoleBox
          key={i}
          out={{
            ok: true,
            output: v.out.filter((l) => !/^\w*Error: /.test(l)),
            error: v.out.find((l) => /^\w*Error: /.test(l)),
          }}
        />
      ) : (
        <WebPreview key={i} doc={doc} height={180} />
      )}
      <Animated.View
        key={`c${i}`}
        entering={FadeIn.duration(200)}
        style={styles.note}
      >
        <T
          variant="bodySm"
          color={colors.ink}
          style={{ fontSize: 14, lineHeight: 21 }}
        >
          {v.caption}
        </T>
      </Animated.View>
    </Screen>
  );
}

// ── Live edit ────────────────────────────────────────────────────────────────

export function LiveScreen({ step, onDone }: { step: LiveStep } & Done) {
  const [value, setValue] = useState(step.choices[0]);
  const [tried, setTried] = useState<string[]>([step.choices[0]]);
  const code = step.code.map((l) => l.replace("{{v}}", value));
  const doc = useMemo(
    () => codePage(code.join("\n"), step.css, step.html),
    [code, step.css, step.html],
  );
  const pick = (v: string) => {
    setValue(v);
    if (!tried.includes(v)) setTried([...tried, v]);
  };
  return (
    <Screen
      bar={
        <Continue
          ready={tried.length >= 2}
          hint="Try another value"
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <View style={styles.code}>
        <CodeBlock
          lines={code}
          lang="html"
          highlight={step.code.findIndex((l) => l.includes("{{v}}"))}
        />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {step.choices.map((c) => (
          <Pressable
            key={c}
            accessibilityRole="button"
            accessibilityState={{ selected: c === value }}
            onPress={() => {
              haptic.tap();
              pick(c);
            }}
            style={[styles.chip, c === value && styles.chipOn]}
          >
            <T
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: c === value ? "#FFFFFF" : colors.ink,
              }}
            >
              {c}
            </T>
          </Pressable>
        ))}
      </View>
      {step.free ? (
        <TextInput
          accessibilityLabel="Type your own value"
          placeholder="Or type your own"
          placeholderTextColor={colors.ink3}
          maxLength={40}
          onChangeText={(t) => t.trim() && pick(t)}
          style={styles.input}
        />
      ) : null}
      <WebPreview doc={doc} height={170} />
      {step.caption ? (
        <T variant="bodySm" color={colors.ink2}>
          {step.caption}
        </T>
      ) : null}
    </Screen>
  );
}

// ── Place pieces into gaps ───────────────────────────────────────────────────

export function PlaceScreen({
  step,
  onDone,
  onMistake,
}: { step: PlaceStep } & Checked) {
  const gaps = step.answer.length;
  const [fill, setFill] = useState<(number | null)[]>(() =>
    Array(gaps).fill(null),
  );
  const [phase, setPhase] = useState<"ask" | "right" | "hint" | "shown">("ask");
  const [bad, setBad] = useState<number[]>([]);
  const pieces = useMemo(
    () => shuffled(step.pieces, step.title),
    [step.pieces, step.title],
  );
  const value = (g: number) => (fill[g] === null ? "" : pieces[fill[g]!]);
  const assembled = step.lines.map((segs) =>
    segs.map((s: Seg) => (typeof s === "string" ? s : value(s.gap))).join(""),
  );
  const doc = useMemo(
    () =>
      step.preview === false || step.run
        ? ""
        : codePage(assembled.join("\n"), step.css, step.html),
    [assembled, step.css, step.html, step.preview, step.run],
  );
  const ran = useJsRun(
    step.run && fill.every((x) => x !== null) ? assembled.join("\n") : null,
  );
  const { style: shakeStyle, shake } = useShake();
  useAutoNext(phase === "right", onDone, AUTO_NEXT_MS + 500);

  const check = (f: (number | null)[]) => {
    const wrong = step.answer
      .map((a, g) => (pieces[f[g]!] === a ? -1 : g))
      .filter((g) => g >= 0);
    if (!wrong.length) {
      haptic.success();
      setPhase("right");
      return;
    }
    haptic.error();
    onMistake();
    shake();
    setBad(wrong);
    if (phase === "ask") setPhase("hint");
    else {
      setPhase("shown");
      setFill(step.answer.map((a) => pieces.indexOf(a)));
    }
  };
  const put = (p: number) => {
    if (phase === "right" || phase === "shown") return;
    const g = fill.indexOf(null);
    if (g < 0) return;
    haptic.tap();
    const f = fill.map((x, k) => (k === g ? p : x));
    setFill(f);
    setBad(bad.filter((x) => x !== g));
    if (f.every((x) => x !== null)) check(f);
  };
  const clear = (g: number) => {
    if (phase === "right" || phase === "shown" || fill[g] === null) return;
    haptic.tap();
    setFill(fill.map((x, k) => (k === g ? null : x)));
  };
  const next = fill.indexOf(null);
  return (
    <Screen
      feedback={
        phase !== "ask" ? (
          <Feedback
            phase={phase}
            text={
              phase === "right"
                ? step.reveal
                : phase === "hint"
                  ? "The red gaps are wrong. Tap one to empty it, then try another piece."
                  : `Here is the right answer. ${step.reveal}`
            }
            onContinue={onDone}
          />
        ) : null
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <Animated.View style={[styles.code, { padding: 12, gap: 6 }, shakeStyle]}>
        {step.lines.map((segs, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {segs.map((s, k) =>
              typeof s === "string" ? (
                <T key={k} style={styles.mono}>
                  {s}
                </T>
              ) : (
                <Pressable
                  key={k}
                  accessibilityRole="button"
                  accessibilityLabel={`Gap ${s.gap + 1}: ${value(s.gap) || "empty"}`}
                  onPress={() => clear(s.gap)}
                  style={[
                    styles.gap,
                    s.gap === next && styles.gapNext,
                    fill[s.gap] !== null && styles.gapFull,
                    bad.includes(s.gap) && styles.gapBad,
                    phase === "right" && styles.gapGood,
                  ]}
                >
                  <T style={[styles.mono, { color: "#FFFFFF" }]}>
                    {value(s.gap) || " "}
                  </T>
                </Pressable>
              ),
            )}
          </View>
        ))}
      </Animated.View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {pieces.map((p, k) => {
          const used = fill.includes(k);
          return (
            <Pressable
              key={k}
              accessibilityRole="button"
              accessibilityState={{ disabled: used }}
              disabled={used}
              onPress={() => put(k)}
              style={[styles.chip, used && { opacity: 0.35 }]}
            >
              <T
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  color: colors.ink,
                }}
              >
                {p}
              </T>
            </Pressable>
          );
        })}
      </View>
      {step.run ? (
        <ConsoleBox out={ran} waiting="Fill every gap to run it" />
      ) : step.preview === false ? null : (
        <WebPreview doc={doc} height={160} />
      )}
    </Screen>
  );
}

// ── Tap the bug ──────────────────────────────────────────────────────────────

/** Splits a line into tappable pieces, keeping each bug's text as one piece. */
function piecesOf(line: string, bugs: string[]): string[] {
  for (const b of bugs) {
    const at = line.indexOf(b);
    if (at >= 0)
      return [
        ...piecesOf(line.slice(0, at), bugs),
        b,
        ...piecesOf(line.slice(at + b.length), bugs),
      ];
  }
  return (
    line.match(/\s+|<\/?[\w!-]+>?|"[^"]*"|'[^']*'|&#?\w+;?|[\w.#:/-]+|./g) ?? []
  );
}

export function TapBugScreen({
  step,
  onDone,
  onMistake,
}: { step: TapBugStep } & Checked) {
  const [found, setFound] = useState<number[]>([]);
  const [phase, setPhase] = useState<"ask" | "right" | "hint" | "shown">("ask");
  const [miss, setMiss] = useState<string | null>(null);
  const { style: shakeStyle, shake } = useShake();
  const scroller = useRef<ScrollView>(null);
  const done = phase === "right" || phase === "shown";
  useAutoNext(phase === "right", onDone, AUTO_NEXT_MS + 900);
  useEffect(() => {
    if (phase === "ask") return;
    const t = setTimeout(
      () => scroller.current?.scrollToEnd({ animated: true }),
      150,
    );
    return () => clearTimeout(t);
  }, [phase]);

  const tap = (line: number, piece: string, key: string) => {
    if (done || !piece.trim()) return;
    const b = step.bugs.findIndex((x) => x.line === line && x.text === piece);
    if (b >= 0) {
      if (found.includes(b)) return;
      haptic.success();
      const f = [...found, b];
      setFound(f);
      if (f.length === step.bugs.length) setPhase("right");
      return;
    }
    haptic.error();
    onMistake();
    shake();
    setMiss(key);
    if (phase === "ask") setPhase("hint");
    else setPhase("shown");
  };
  const fixed = step.code.map((l, i) =>
    step.bugs
      .filter((b) => b.line === i + 1)
      .reduce((acc, b) => acc.replace(b.text, b.fix), l),
  );
  return (
    <Screen
      scroller={scroller}
      feedback={
        phase === "hint" ? (
          <Feedback
            phase="hint"
            text={`Not that one. Look closely: ${step.bugs.length > 1 ? "there are " + step.bugs.length + " mistakes" : "it is one word or symbol"}.`}
          />
        ) : done ? (
          <Feedback
            phase={phase}
            text={
              phase === "right"
                ? step.explain
                : `${step.explain} This one comes back in your warm-up.`
            }
            onContinue={onDone}
          />
        ) : null
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={
          step.instructions ??
          `Tap the exact mistake${step.bugs.length > 1 ? `s (${step.bugs.length})` : ""}.`
        }
        color={colors.danger}
      />
      <Animated.View style={[styles.code, { paddingVertical: 8 }, shakeStyle]}>
        {step.code.map((line, i) => (
          <View key={i} style={styles.codeRow}>
            <T style={styles.gutter}>{i + 1}</T>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {piecesOf(
                line,
                step.bugs.filter((b) => b.line === i + 1).map((b) => b.text),
              ).map((p, k) => {
                const key = `${i}:${k}`;
                const b = step.bugs.findIndex(
                  (x) => x.line === i + 1 && x.text === p,
                );
                const isFound =
                  b >= 0 && (found.includes(b) || phase === "shown");
                return (
                  <Pressable
                    key={k}
                    accessibilityRole="button"
                    accessibilityLabel={p}
                    onPress={() => tap(i + 1, p, key)}
                    style={[
                      isFound && styles.bugFound,
                      miss === key && styles.bugMiss,
                    ]}
                  >
                    <T style={[styles.mono, isFound && { color: "#FFFFFF" }]}>
                      {p}
                    </T>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </Animated.View>
      {done ? (
        <Animated.View entering={FadeInDown.duration(220)} style={{ gap: 10 }}>
          <T variant="labelSm" color={colors.successInk}>
            FIXED
          </T>
          <View style={styles.code}>
            <CodeBlock lines={fixed} lang="html" />
          </View>
        </Animated.View>
      ) : null}
    </Screen>
  );
}

// ── Recap ────────────────────────────────────────────────────────────────────

export function RecapScreen({ step, onDone }: { step: RecapStep } & Done) {
  const [shown, setShown] = useState(0);
  const all = shown >= step.points.length;
  return (
    <Screen
      bar={
        <Button
          label={all ? "Finish lesson" : "Next point"}
          onPress={() => (all ? onDone() : setShown(shown + 1))}
        />
      }
    >
      <T variant="kicker">RECAP</T>
      <T variant="title">{step.title ?? "What you learned"}</T>
      <View style={{ gap: 10 }}>
        {step.points.map((p, i) =>
          i < shown ? (
            <Animated.View
              key={i}
              entering={ZoomIn.duration(240)}
              style={styles.recap}
            >
              <T style={{ fontSize: 22 }}>{p.icon}</T>
              <T variant="body" color={colors.ink} style={{ flex: 1 }}>
                {p.text}
              </T>
            </Animated.View>
          ) : (
            <View key={i} style={[styles.recap, { opacity: 0.35 }]}>
              <T style={{ fontSize: 22 }}>❔</T>
              <View
                style={{
                  flex: 1,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.line,
                }}
              />
            </View>
          ),
        )}
      </View>
    </Screen>
  );
}

// ── Swipe true / false ───────────────────────────────────────────────────────

export function SwipeScreen({
  step,
  onDone,
  onMistake,
}: { step: SwipeStep } & Checked) {
  const [i, setI] = useState(0);
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const { style: shakeStyle, shake } = useShake();
  const card = step.cards[i];
  const answer = (v: boolean) => {
    if (verdict !== null) return;
    const ok = v === card.answer;
    setVerdict(ok);
    if (ok) {
      haptic.success();
      setTimeout(() => {
        if (i + 1 >= step.cards.length) onDone();
        else {
          setI(i + 1);
          setVerdict(null);
        }
      }, 900);
    } else {
      haptic.error();
      onMistake();
      shake();
    }
  };
  return (
    <Screen
      feedback={
        verdict !== null ? (
          <Feedback
            phase={verdict ? "right" : "shown"}
            title={
              verdict ? "Right!" : `It’s ${card.answer ? "true" : "false"}`
            }
            text={card.why}
          />
        ) : null
      }
      bar={
        verdict === false ? (
          <Button
            label="Next card"
            onPress={() => {
              if (i + 1 >= step.cards.length) onDone();
              else {
                setI(i + 1);
                setVerdict(null);
              }
            }}
          />
        ) : (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              variant="outline"
              label="False"
              onPress={() => answer(false)}
              style={{ flex: 1 }}
            />
            <Button
              label="True"
              onPress={() => answer(true)}
              style={{ flex: 1 }}
            />
          </View>
        )
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={`Card ${i + 1} of ${step.cards.length}`}
        color={colors.primary}
      />
      <Animated.View
        key={i}
        entering={FadeInRight.duration(240)}
        style={[
          styles.swipe,
          verdict === true && styles.swipeGood,
          verdict === false && styles.swipeBad,
          shakeStyle,
        ]}
      >
        <T
          variant="title"
          style={{ textAlign: "center", fontSize: 19, lineHeight: 27 }}
        >
          {card.text}
        </T>
      </Animated.View>
    </Screen>
  );
}

// ── X-Ray Vision ─────────────────────────────────────────────────────────────

export function XrayScreen({
  step,
  onDone,
  onMistake,
}: { step: XrayStep } & Checked) {
  const [named, setNamed] = useState<number[]>([]);
  const [at, setAt] = useState<number | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const need = step.need ?? step.parts.length;
  const part = at === null ? null : step.parts[at];
  // Each part reports a tap through the page's console bridge.
  const tapScript = `document.addEventListener('DOMContentLoaded',function(){${JSON.stringify(step.parts.map((p) => p.select))}.forEach(function(s,i){var el=document.querySelector(s);if(el){el.style.cursor='pointer';el.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();console.log('__xray:'+i);});}});});`;
  const css =
    named
      .map(
        (i) =>
          `${step.parts[i].select}{outline:3px solid #14B8A6 !important;outline-offset:2px}`,
      )
      .join("") + (at !== null ? `${step.parts[at].select}{${HIGHLIGHT}}` : "");
  const doc = useMemo(
    () =>
      buildPage({
        html: step.page.html,
        css: (step.page.css ?? "") + css,
        js: tapScript,
      }),
    [step.page, css, tapScript],
  );
  useAutoNext(named.length >= need, onDone, AUTO_NEXT_MS + 300);
  const choose = (opt: string) => {
    if (!part || at === null) return;
    if (opt === part.answer) {
      haptic.success();
      setNamed([...named, at]);
      setAt(null);
      setWrong([]);
    } else {
      haptic.error();
      onMistake();
      setWrong([...wrong, opt]);
    }
  };
  return (
    <Screen
      feedback={
        named.length >= need ? (
          <Feedback
            phase="right"
            text="X-ray complete: you can see the code behind the page."
          />
        ) : null
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={`${step.instructions} (${named.length}/${need})`}
        color={colors.primary}
      />
      <WebPreview
        doc={doc}
        height={260}
        onLog={(l) => {
          const m = /^__xray:(\d+)$/.exec(l.text);
          if (m && !named.includes(Number(m[1]))) {
            haptic.tap();
            setAt(Number(m[1]));
            setWrong([]);
          }
        }}
      />
      <T variant="labelSm" color={colors.ink2}>
        OR PICK A PART HERE
      </T>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {step.parts.map((p, i) => (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityState={{
              selected: at === i,
              disabled: named.includes(i),
            }}
            disabled={named.includes(i)}
            onPress={() => {
              haptic.tap();
              setAt(i);
              setWrong([]);
            }}
            style={[
              styles.chip,
              at === i && styles.chipOn,
              named.includes(i) && {
                backgroundColor: colors.successSoft,
                borderColor: colors.success,
              },
            ]}
          >
            <T variant="labelSm" color={at === i ? "#FFFFFF" : colors.ink}>
              {named.includes(i) ? `✓ ${p.label}` : p.label}
            </T>
          </Pressable>
        ))}
      </View>
      {part ? (
        <Animated.View entering={FadeInDown.duration(200)} style={{ gap: 8 }}>
          <T variant="label">What’s behind “{part.label}”?</T>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {part.options.map((o) => (
              <Pressable
                key={o}
                accessibilityRole="button"
                disabled={wrong.includes(o)}
                onPress={() => choose(o)}
                style={[
                  styles.chip,
                  wrong.includes(o) && {
                    backgroundColor: colors.dangerSoft,
                    borderColor: colors.danger,
                  },
                ]}
              >
                <T
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    color: colors.ink,
                  }}
                >
                  {o}
                </T>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      ) : null}
    </Screen>
  );
}

// ── Arrange the blocks ───────────────────────────────────────────────────────

export function ArrangeScreen({
  step,
  onDone,
  onMistake,
}: { step: ArrangeStep } & Checked) {
  const order = useMemo(
    () =>
      shuffled(
        step.blocks.map((_, i) => i),
        step.title + step.blocks.join(""),
      ),
    [step],
  );
  const [placed, setPlaced] = useState<number[]>([]);
  const [phase, setPhase] = useState<"ask" | "right" | "hint" | "shown">("ask");
  const { style: shakeStyle, shake } = useShake();
  const built = placed.map((i) => step.blocks[i]).join("\n");
  const doc = useMemo(
    () => (step.run ? "" : codePage(built, step.css, step.html)),
    [built, step],
  );
  const ran = useJsRun(step.run && placed.length ? built : null);
  useAutoNext(phase === "right", onDone, AUTO_NEXT_MS + 600);
  const add = (i: number) => {
    if (phase === "right" || phase === "shown") return;
    haptic.tap();
    const p = [...placed, i];
    setPlaced(p);
    if (p.length < step.blocks.length) return;
    if (p.every((x, k) => x === k)) {
      haptic.success();
      setPhase("right");
      return;
    }
    haptic.error();
    onMistake();
    shake();
    if (phase === "ask") {
      setPhase("hint");
      setTimeout(() => setPlaced([]), 900);
    } else {
      setPhase("shown");
      setPlaced(step.blocks.map((_, k) => k));
    }
  };
  return (
    <Screen
      feedback={
        phase !== "ask" ? (
          <Feedback
            phase={phase}
            text={
              phase === "right"
                ? step.run
                  ? "It runs! The output matches the goal."
                  : "Built! The page matches the goal."
                : phase === "hint"
                  ? step.html === undefined
                    ? "Not in the right order yet. Think about which tag has to open first and close last."
                    : "Not in the right order yet. A rule opens with its selector and {, and closes with }. Follow the goal from top to bottom."
                  : "Here is the right order. Read it top to bottom."
            }
            onContinue={onDone}
          />
        ) : null
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <Animated.View
        style={[styles.code, { padding: 8, gap: 4, minHeight: 80 }, shakeStyle]}
      >
        {placed.length ? (
          placed.map((i, k) => (
            <Pressable
              key={k}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${step.blocks[i]}`}
              onPress={() =>
                phase === "ask" || phase === "hint"
                  ? setPlaced(placed.filter((x) => x !== i))
                  : null
              }
              style={styles.block}
            >
              <T style={styles.mono}>{step.blocks[i]}</T>
            </Pressable>
          ))
        ) : (
          <T style={[styles.mono, { color: "#8E89C4", padding: 6 }]}>
            Tap the blocks below in order
          </T>
        )}
      </Animated.View>
      <View style={{ gap: 6 }}>
        {order
          .filter((i) => !placed.includes(i))
          .map((i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              onPress={() => add(i)}
              style={styles.blockPick}
            >
              <T
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 13.5,
                  color: colors.ink,
                }}
              >
                {step.blocks[i]}
              </T>
            </Pressable>
          ))}
      </View>
      <T variant="labelSm" color={colors.ink2}>
        GOAL · {step.goal}
      </T>
      {step.run ? (
        <ConsoleBox out={ran} waiting="Tap a block to start" />
      ) : (
        <WebPreview doc={doc} height={190} />
      )}
    </Screen>
  );
}

// ── Copy the look ────────────────────────────────────────────────────────────

export function CopyScreen({ step, onDone }: { step: CopyStep } & Done) {
  const [values, setValues] = useState(() =>
    step.controls.map((c) => c.choices[0]),
  );
  const target = useMemo(
    () =>
      buildPage({
        html: step.html,
        css: fillSlots(
          step.css,
          step.controls.map((c) => c.answer),
        ),
      }),
    [step],
  );
  const mine = useMemo(
    () => buildPage({ html: step.html, css: fillSlots(step.css, values) }),
    [step, values],
  );
  const matched = step.controls.every((c, i) => values[i] === c.answer);
  // Show the code from the rule that holds the first slot, not the setup rules above it.
  const lines = fillSlots(step.css, values).split("\n");
  let from = Math.max(
    0,
    step.css.split("\n").findIndex((l) => l.includes("{{")),
  );
  while (from > 0 && !lines[from].trimEnd().endsWith("{")) from--;
  useAutoNext(matched, onDone, AUTO_NEXT_MS + 400);
  return (
    <Screen
      feedback={
        matched ? (
          <Feedback
            phase="right"
            text="It matches! Same values, same look."
            onContinue={onDone}
          />
        ) : null
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <T variant="labelSm" color={colors.ink2}>
            TARGET
          </T>
          <WebPreview doc={target} height={180} />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <T variant="labelSm" color={matched ? colors.success : colors.ink2}>
            {matched ? "YOURS ✓" : "YOURS"}
          </T>
          <WebPreview doc={mine} height={180} />
        </View>
      </View>
      {step.controls.map((c, i) => (
        <View key={c.label} style={{ gap: 6 }}>
          <T variant="labelSm" color={colors.ink}>
            {c.label}
            {values[i] === c.answer ? "  ✓" : ""}
          </T>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {c.choices.map((v) => (
              <Pressable
                key={v}
                accessibilityRole="button"
                accessibilityLabel={`${c.label}: ${v}`}
                accessibilityState={{
                  selected: v === values[i],
                  disabled: matched,
                }}
                onPress={() => {
                  if (matched) return;
                  haptic.tap();
                  setValues(values.map((x, k) => (k === i ? v : x)));
                }}
                style={[styles.chip, v === values[i] && styles.chipOn]}
              >
                <T
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 13.5,
                    color: v === values[i] ? "#FFFFFF" : colors.ink,
                  }}
                >
                  {v}
                </T>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
      <View style={styles.code}>
        <CodeBlock lines={lines.slice(from)} lang="css" />
      </View>
    </Screen>
  );
}

// ── Resize the screen ────────────────────────────────────────────────────────

export function ResizeScreen({ step, onDone }: { step: ResizeStep } & Done) {
  const [w, setW] = useState(step.widths[0]);
  const [seen, setSeen] = useState<number[]>([step.widths[0]]);
  const doc = useMemo(() => pageAtWidth(step.page, w), [step, w]);
  const device = (x: number) => (x < 600 ? "📱" : x < 1000 ? "📟" : "💻");
  return (
    <Screen
      bar={
        <Continue
          ready={seen.length >= step.widths.length}
          hint="Try every width"
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <View
        style={{ flexDirection: "row", gap: 6 }}
        accessibilityRole="tablist"
      >
        {step.widths.map((x) => (
          <Pressable
            key={x}
            accessibilityRole="tab"
            accessibilityLabel={`${x} pixels wide`}
            accessibilityState={{ selected: x === w }}
            onPress={() => {
              haptic.tap();
              setW(x);
              if (!seen.includes(x)) setSeen([...seen, x]);
            }}
            style={[styles.widthStop, x === w && styles.chipOn]}
          >
            <T style={{ fontSize: 16 }}>{device(x)}</T>
            <T
              style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                color: x === w ? "#FFFFFF" : colors.ink,
              }}
            >
              {x}
            </T>
          </Pressable>
        ))}
      </View>
      <View style={styles.ruler}>
        <View
          style={[
            styles.rulerFill,
            { width: `${Math.round((w / step.widths.at(-1)!) * 100)}%` },
          ]}
        />
        <T
          variant="labelSm"
          color={colors.ink}
          style={{ position: "absolute", alignSelf: "center" }}
        >
          Screen width: {w}px
        </T>
      </View>
      <WebPreview key={w} doc={doc} height={260} />
      {step.page.css ? (
        <View style={styles.code}>
          <CodeBlock lines={step.page.css.trim().split("\n")} lang="css" />
        </View>
      ) : null}
      {step.caption ? (
        <View style={styles.note}>
          <T
            variant="bodySm"
            color={colors.ink}
            style={{ fontSize: 14, lineHeight: 21 }}
          >
            {step.caption}
          </T>
        </View>
      ) : null}
    </Screen>
  );
}

// ── JavaScript: the console ──────────────────────────────────────────────────

/** Runs `code` (when not null) in the app's JavaScript sandbox; reruns whenever the code changes. */
function useJsRun(code: string | null) {
  const run = useCodeRunner();
  const [res, setRes] = useState<{ code: string; out: RunOutcome } | null>(
    null,
  );
  useEffect(() => {
    if (code === null) return;
    let live = true;
    run("javascript", code).then((out) => live && setRes({ code, out }));
    return () => {
      live = false;
    };
  }, [code, run]);
  return code !== null && res?.code === code ? res.out : null;
}

function ConsoleBox({
  out,
  label = "CONSOLE",
  waiting = "Running…",
}: {
  out: RunOutcome | null;
  label?: string;
  waiting?: string;
}) {
  return (
    <View style={styles.console} accessibilityLiveRegion="polite">
      <T style={styles.consoleLabel}>{label}</T>
      {!out ? (
        <T style={[styles.mono, { color: "#8E89C4" }]}>{waiting}</T>
      ) : (
        <>
          {out.output.map((l, i) => (
            <Animated.View
              key={`${i}${l}`}
              entering={FadeInDown.duration(160).delay(i * 50)}
            >
              <T style={styles.mono}>{l === "" ? " " : l}</T>
            </Animated.View>
          ))}
          {out.error ? (
            <T style={[styles.mono, { color: "#FF8A9B" }]}>{out.error}</T>
          ) : null}
          {!out.output.length && !out.error ? (
            <T style={[styles.mono, { color: "#8E89C4" }]}>(nothing printed)</T>
          ) : null}
        </>
      )}
    </View>
  );
}

// ── Run and tweak ────────────────────────────────────────────────────────────

export function RunScreen({ step, onDone }: { step: RunStep } & Done) {
  const [value, setValue] = useState(step.choices[0]);
  const [tried, setTried] = useState<string[]>([step.choices[0]]);
  const code = step.code.map((l) => l.replace("{{v}}", value));
  const out = useJsRun(code.join("\n"));
  const hit = !!step.goal && !!out?.output.includes(step.goal);
  const [reached, setReached] = useState(false);
  if (hit && !reached) setReached(true);
  const ready = step.goal ? reached : tried.length >= 2;
  return (
    <Screen
      bar={
        <Continue
          ready={ready}
          hint={step.goal ? "Reach the target" : "Try another value"}
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <View style={styles.code}>
        <CodeBlock
          lines={code}
          lang="javascript"
          highlight={step.code.findIndex((l) => l.includes("{{v}}"))}
        />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {step.choices.map((c) => (
          <Pressable
            key={c}
            accessibilityRole="button"
            accessibilityState={{ selected: c === value }}
            onPress={() => {
              haptic.tap();
              setValue(c);
              if (!tried.includes(c)) setTried([...tried, c]);
            }}
            style={[styles.chip, c === value && styles.chipOn]}
          >
            <T
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: c === value ? "#FFFFFF" : colors.ink,
              }}
            >
              {c}
            </T>
          </Pressable>
        ))}
      </View>
      {step.goal ? (
        <View style={[styles.goal, reached && styles.goalDone]}>
          <T variant="labelSm" color={reached ? colors.success : colors.ink2}>
            {reached ? "✓ TARGET REACHED" : "TARGET · make it print"}
          </T>
          <T
            style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}
          >
            {step.goal}
          </T>
        </View>
      ) : null}
      <ConsoleBox out={out} />
      {step.caption ? (
        <T variant="bodySm" color={colors.ink2}>
          {step.caption}
        </T>
      ) : null}
    </Screen>
  );
}

// ── Tap the page ─────────────────────────────────────────────────────────────

export function TapPageScreen({ step, onDone }: { step: TapPageStep } & Done) {
  const [logs, setLogs] = useState<string[]>([]);
  const [round, setRound] = useState(0);
  const doc = useMemo(() => page(step.page), [step.page]);
  const reached = logs.some((l) => l.includes(step.goal));
  return (
    <Screen
      bar={
        <Continue
          ready={reached}
          hint="Use the page to reach the goal"
          onDone={onDone}
        />
      }
    >
      <StepHeader
        kicker={step.kicker}
        title={step.title}
        instructions={step.instructions}
        color={colors.primary}
      />
      <WebPreview
        key={round}
        doc={doc}
        height={230}
        onLog={(l) =>
          setLogs((x) =>
            [...x, l.level === "error" ? `⚠ ${l.text}` : l.text].slice(-30),
          )
        }
      />
      <View style={[styles.goal, reached && styles.goalDone]}>
        <T variant="labelSm" color={reached ? colors.success : colors.ink2}>
          {reached ? "✓ GOAL REACHED" : "GOAL · the log shows"}
        </T>
        <T style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}>
          {step.goal}
        </T>
      </View>
      <View style={styles.console}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <T style={styles.consoleLabel}>EVENT LOG</T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reload the page"
            hitSlop={10}
            onPress={() => {
              haptic.tap();
              setLogs([]);
              setRound(round + 1);
            }}
          >
            <T style={[styles.consoleLabel, { color: "#C9C3FF" }]}>↻ RELOAD</T>
          </Pressable>
        </View>
        {logs.length ? (
          logs.map((l, i) => (
            <Animated.View key={i} entering={FadeInDown.duration(160)}>
              <T
                style={[styles.mono, l.startsWith("⚠") && { color: "#FF8A9B" }]}
              >
                {l}
              </T>
            </Animated.View>
          ))
        ) : (
          <T style={[styles.mono, { color: "#8E89C4" }]}>
            Tap, type or press in the page above…
          </T>
        )}
      </View>
      {step.caption ? (
        <View style={styles.note}>
          <T
            variant="bodySm"
            color={colors.ink}
            style={{ fontSize: 14, lineHeight: 21 }}
          >
            {step.caption}
          </T>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 28, gap: 14 },
  bubble: {
    alignSelf: "flex-start",
    maxWidth: "100%",
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  code: {
    borderRadius: 14,
    backgroundColor: colors.code.bg,
    overflow: "hidden",
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 32,
    alignItems: "center",
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  codeRowTap: { borderLeftColor: "#3A3486" },
  codeRowOn: {
    backgroundColor: "rgba(255,159,28,.18)",
    borderLeftColor: colors.saffron,
  },
  gutter: { width: 16, fontFamily: fonts.mono, fontSize: 11, color: "#6E69A0" },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 14,
    lineHeight: 21,
    color: "#E6E3FF",
  },
  note: { borderRadius: 14, backgroundColor: colors.primarySoft, padding: 12 },
  tile: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 8,
  },
  tileOpen: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceTint,
  },
  segment: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  segmentItem: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    justifyContent: "center",
  },
  segmentOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chip: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    justifyContent: "center",
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    fontSize: 15,
    color: colors.ink,
  },
  gap: {
    minWidth: 54,
    minHeight: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#6E69A0",
    paddingHorizontal: 8,
    justifyContent: "center",
    marginVertical: 2,
  },
  gapNext: { borderColor: colors.saffron },
  gapFull: {
    borderStyle: "solid",
    borderColor: "#8E89C4",
    backgroundColor: "#2A2660",
  },
  gapBad: { borderColor: colors.danger, backgroundColor: "#4A1D2A" },
  gapGood: { borderColor: colors.success, backgroundColor: "#12443C" },
  bugFound: { backgroundColor: colors.danger, borderRadius: 4 },
  bugMiss: { backgroundColor: "#4A1D2A", borderRadius: 4 },
  recap: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 12,
  },
  swipe: {
    minHeight: 180,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeGood: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  swipeBad: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  block: {
    borderRadius: 8,
    backgroundColor: "#2A2660",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  widthStop: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  ruler: {
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    overflow: "hidden",
    justifyContent: "center",
  },
  rulerFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#C9C3FF",
  },
  console: {
    borderRadius: 14,
    backgroundColor: "#14112B",
    padding: 12,
    gap: 3,
    minHeight: 64,
  },
  consoleLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: "#8E89C4",
    marginBottom: 4,
  },
  goal: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 10,
    gap: 2,
  },
  goalDone: {
    borderStyle: "solid",
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  blockPick: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
