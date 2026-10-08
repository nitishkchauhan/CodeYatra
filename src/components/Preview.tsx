import { Platform, StyleSheet, Text, View } from 'react-native';

import { T } from './ui/Text';
import type { Preview as PreviewSpec } from '@/content';
import { colors } from '@/theme';

// Browser-default look for unstyled HTML, so students see what plain tags really do.
const SERIF = Platform.select({
  ios: 'Times New Roman',
  android: 'serif',
  default: 'Georgia, serif',
});

function HtmlNode({ tag, text }: { tag: string; text: string }) {
  if (tag === 'h1') return <Text style={[styles.serif, { fontSize: 24, fontWeight: '700', lineHeight: 30 }]}>{text}</Text>;
  if (tag === 'button') {
    return (
      <View style={styles.nativeButton}>
        <Text style={{ fontSize: 13, color: '#000000' }}>{text}</Text>
      </View>
    );
  }
  if (tag === 'li') return <Text style={[styles.serif, { fontSize: 14, lineHeight: 20, paddingLeft: 14 }]}>• {text}</Text>;
  if (tag === 'label') return <Text style={[styles.serif, { fontSize: 13 }]}>{text}</Text>;
  if (tag === 'small') return <Text style={[styles.serif, { fontSize: 11, color: '#555555' }]}>{text}</Text>;
  if (tag === 'input') {
    return (
      <View style={styles.nativeInput}>
        <Text style={{ fontSize: 12, color: '#757575' }}>{text}</Text>
      </View>
    );
  }
  return <Text style={[styles.serif, { fontSize: 14, lineHeight: 20 }]}>{text}</Text>;
}

export function Preview({ spec }: { spec: PreviewSpec }) {
  return (
    <View style={styles.frame} accessibilityLabel="Live preview">
      <View style={styles.bar}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <T variant="caption" style={{ flex: 1, textAlign: 'center' }}>
          Live preview
        </T>
        <View style={[styles.dot, { backgroundColor: colors.success }]} />
      </View>
      <View style={styles.body}>
        {spec.kind === 'html' ? (
          <View style={styles.page}>
            {spec.nodes.map((node, i) => (
              <HtmlNode key={i} {...node} />
            ))}
          </View>
        ) : spec.kind === 'flex' ? (
          <View
            style={[
              styles.page,
              {
                flexDirection: spec.row ? 'row' : 'column',
                justifyContent: spec.justify,
                alignItems: spec.align,
                minHeight: 70,
                gap: 6,
              },
            ]}>
            {spec.items.map((item, i) => (
              <View key={i} style={[styles.flexItem, i === 1 && { height: 24 }]}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFFFF' }}>{item}</Text>
              </View>
            ))}
          </View>
        ) : spec.kind === 'button' ? (
          <View style={[styles.page, { alignItems: 'flex-start' }]}>
            <Text style={[styles.serif, { fontSize: 18, fontWeight: '700' }]}>Delhi → Jaipur</Text>
            <View
              style={{
                marginTop: 8,
                backgroundColor: spec.background,
                borderRadius: spec.radius,
                paddingHorizontal: spec.padding * 1.6,
                paddingVertical: spec.padding,
              }}>
              <Text style={{ color: spec.color, fontSize: 14, fontWeight: '700' }}>{spec.label}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <T variant="labelSm" color="#FFFFFF">
                TC
              </T>
            </View>
            <View style={{ flex: 1 }}>
              <T variant="heading">
                {spec.from} → <Text style={{ color: spec.to ? colors.ink : colors.danger }}>{spec.to ?? 'undefined'}</Text>
              </T>
              <T variant="caption">{spec.seats} seats left</T>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  bar: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lineSoft,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.line },
  body: { padding: 14, backgroundColor: '#FBFAFE', alignItems: 'center' },
  page: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    gap: 4,
  },
  serif: { fontFamily: SERIF, color: '#000000' },
  nativeButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#767676',
    backgroundColor: '#EFEFEF',
  },
  nativeInput: {
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#767676',
    backgroundColor: '#FFFFFF',
  },
  flexItem: {
    minWidth: 44,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#EDE4FE',
    backgroundColor: '#FFFFFF',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
