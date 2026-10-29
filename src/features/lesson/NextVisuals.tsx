// Interactive diagrams for the Next.js track. Each teaches one idea and has text alongside.
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { T } from '@/components/ui/Text';
import { haptic } from '@/lib/haptics';
import { colors, fonts } from '@/theme';

const FILES = [
  { file: 'app/page.js', depth: 1, url: '/', note: 'page.js right inside app is the home page.' },
  { file: 'app/layout.js', depth: 1, url: null, note: 'Not a page: it wraps every page with shared UI.' },
  { file: 'courses/page.js', depth: 2, url: '/courses', note: 'The folder name becomes the URL.' },
  { file: 'courses/[slug]/page.js', depth: 3, url: '/courses/python, /courses/sql …', note: '[slug] matches any value. Module 4 covers it.' },
  { file: 'courses/utils.js', depth: 2, url: null, note: 'Not page.js, so it is a private helper file.' },
  { file: 'api/students/route.js', depth: 3, url: '/api/students (JSON)', note: 'route.js makes an API endpoint instead of a page. Module 8 covers it.' },
];

/** A project's app folder: tap a file to see which URL (if any) it serves. */
export function RouteTree() {
  const [picked, setPicked] = useState<number | null>(null);
  const f = picked === null ? null : FILES[picked];
  return (
    <View style={styles.wrap}>
      <View style={styles.tree}>
        <T style={styles.mono}>app/</T>
        {FILES.map((x, i) => (
          <Pressable
            key={x.file}
            accessibilityRole="button"
            accessibilityLabel={`${x.file}${x.url ? `, serves ${x.url}` : ', not a page'}`}
            onPress={() => {
              haptic.tap();
              setPicked(i);
            }}
            style={[styles.file, { marginLeft: x.depth * 14 }, picked === i && styles.fileOn]}>
            <T style={[styles.mono, picked === i && { color: '#FFFFFF' }]}>{x.file}</T>
          </Pressable>
        ))}
      </View>
      <Animated.View key={picked ?? -1} entering={FadeIn.duration(180)} style={styles.answer} accessibilityLiveRegion="polite">
        {f ? (
          <>
            <T variant="label" color={f.url ? colors.primary : colors.ink2}>
              {f.url ? `URL: ${f.url}` : 'No URL'}
            </T>
            <T variant="bodySm" color={colors.inkBody}>
              {f.note}
            </T>
          </>
        ) : (
          <T variant="bodySm" color={colors.inkBody}>
            Tap a file to see which address it serves.
          </T>
        )}
      </Animated.View>
    </View>
  );
}

const PARTS = [
  { name: 'CoursePage', where: 'server', why: 'Reads courses from the database. Secrets stay on the server and no JavaScript is sent for it.' },
  { name: 'CourseList', where: 'server', why: 'Only shows data, so it can stay on the server.' },
  { name: 'SearchBox', where: 'client', why: 'Changes as you type (state), so it needs "use client".' },
  { name: 'WishlistButton', where: 'client', why: 'Has an onClick handler, so it runs in the browser.' },
  { name: 'Footer', where: 'server', why: 'Just links and text: no reason to send JavaScript.' },
] as const;

/** One page split into components: tap each to see where it runs and why. */
export function ServerClient() {
  const [picked, setPicked] = useState<number | null>(null);
  const p = picked === null ? null : PARTS[picked];
  return (
    <View style={styles.wrap}>
      <View style={styles.legend}>
        <View style={[styles.swatch, { backgroundColor: colors.primarySoft, borderColor: colors.primary }]} />
        <T variant="caption">Server</T>
        <View style={[styles.swatch, { backgroundColor: colors.warnSoft, borderColor: colors.saffron }]} />
        <T variant="caption">Browser (“use client”)</T>
      </View>
      <View style={{ gap: 6 }}>
        {PARTS.map((x, i) => {
          const client = x.where === 'client';
          return (
            <Pressable
              key={x.name}
              accessibilityRole="button"
              accessibilityLabel={`${x.name}, runs on the ${client ? 'browser' : 'server'}`}
              onPress={() => {
                haptic.tap();
                setPicked(i);
              }}
              style={[
                styles.part,
                { marginLeft: i === 0 ? 0 : 16, backgroundColor: client ? colors.warnSoft : colors.primarySoft, borderColor: client ? colors.saffron : colors.primary },
                picked === i && { borderWidth: 3 },
              ]}>
              <T style={styles.mono}>{`<${x.name} />`}</T>
              <T variant="labelSm" color={client ? colors.saffronInk : colors.primary}>
                {client ? 'browser' : 'server'}
              </T>
            </Pressable>
          );
        })}
      </View>
      <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
        {p ? p.why : 'Tap a component to see where it runs and why.'}
      </T>
    </View>
  );
}

const FLOW = [
  { at: 'Phone', text: 'The teacher’s app sends POST /api/students with { "name": "Reed", "grade": 8 }.' },
  { at: 'proxy.js', text: 'Optional quick check: is there a session cookie? If not, redirect early.' },
  { at: 'route.js', text: 'Next.js calls your exported POST(request). You read the body with await request.json().' },
  { at: 'Validate', text: 'Name present? Grade 1 to 12? If not, reply 400 with an error message and stop.' },
  { at: 'Database', text: 'Save the student. The database gives back the new id.' },
  { at: 'Response', text: 'Reply Response.json(student, { status: 201 }). The app shows “Saved”.' },
];

/** Steps a request through a Route Handler, from the phone to the database and back. */
export function RequestFlow() {
  const [step, setStep] = useState(-1);
  const done = step === FLOW.length - 1;
  return (
    <View style={styles.wrap}>
      <View style={styles.flow}>
        {FLOW.map((f, i) => (
          <View key={f.at} style={[styles.stop, i <= step && styles.stopOn, i === step && { borderColor: colors.saffron, borderWidth: 2 }]}>
            <T variant="labelSm" color={i <= step ? '#FFFFFF' : colors.ink2} style={{ fontSize: 11 }}>
              {f.at}
            </T>
          </View>
        ))}
      </View>
      <Animated.View key={step} entering={FadeIn.duration(180)}>
        <T variant="bodySm" color={colors.inkBody} accessibilityLiveRegion="polite">
          {step < 0 ? 'Tap Next step to follow one request.' : FLOW[step].text}
        </T>
      </Animated.View>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          haptic.tap();
          setStep(done ? -1 : step + 1);
        }}
        style={styles.btn}>
        <T variant="labelSm" color={colors.ink}>
          {done ? 'Start again' : step < 0 ? 'Send the request' : 'Next step'}
        </T>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, padding: 12, gap: 10 },
  tree: { borderRadius: 12, backgroundColor: colors.code.bg, padding: 10, gap: 4 },
  file: { alignSelf: 'flex-start', minHeight: 36, justifyContent: 'center', paddingHorizontal: 8, borderRadius: 8 },
  fileOn: { backgroundColor: colors.primary },
  mono: { fontFamily: fonts.mono, fontSize: 13, color: colors.code.text },
  answer: { minHeight: 56, gap: 2 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 14, height: 14, borderRadius: 4, borderWidth: 1.5 },
  part: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5 },
  flow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  stop: { minHeight: 32, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: colors.line, justifyContent: 'center' },
  stopOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  btn: { alignSelf: 'flex-start', minHeight: 40, paddingHorizontal: 14, borderRadius: 12, justifyContent: 'center', backgroundColor: colors.saffron, boxShadow: `0 2px 0 ${colors.saffronShadow}` },
});
