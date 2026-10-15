import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BlockChip, RepeatFrame } from '@/components/Blocks';
import { Icon } from '@/components/ui/Icon';
import { T } from '@/components/ui/Text';
import type { ConceptStep } from '@/content';
import { colors, fonts } from '@/theme';

function Panel({ label, tint, labelColor, children, footer, footerColor }: {
  label: string;
  tint: string;
  labelColor: string;
  children: ReactNode;
  footer?: string;
  footerColor?: string;
}) {
  return (
    <View style={[styles.panel, { backgroundColor: tint }]}>
      <T variant="kicker" color={labelColor} style={{ letterSpacing: 0.5 }}>
        {label}
      </T>
      {children}
      {footer ? (
        <T variant="labelSm" color={footerColor ?? colors.ink3} style={{ fontSize: 11 }}>
          {footer}
        </T>
      ) : null}
    </View>
  );
}

export function ConceptVisual({ kind }: { kind: NonNullable<ConceptStep['visual']> }) {
  if (kind === 'loopCompare') {
    return (
      <View style={styles.row}>
        <Panel label="WITHOUT A LOOP" tint={colors.bg} labelColor={colors.ink3} footer="3 blocks">
          <BlockChip type="move" />
          <BlockChip type="move" />
          <BlockChip type="move" />
        </Panel>
        <Panel label="WITH A LOOP" tint={colors.primarySoft} labelColor={colors.primary} footer="2 blocks · same result" footerColor={colors.primary}>
          <RepeatFrame times={3}>
            <BlockChip type="move" />
          </RepeatFrame>
        </Panel>
      </View>
    );
  }
  if (kind === 'sequence') {
    return (
      <View style={[styles.panel, { backgroundColor: colors.bg }]}>
        <T variant="kicker" color={colors.ink3} style={{ letterSpacing: 0.5 }}>
          RUNS TOP TO BOTTOM
        </T>
        {(['move', 'right', 'move'] as const).map((t, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={styles.stepNo}>
              <T variant="labelSm" color={colors.primary}>
                {i + 1}
              </T>
            </View>
            <View style={{ flex: 1 }}>
              <BlockChip type={t} />
            </View>
          </View>
        ))}
      </View>
    );
  }
  if (kind === 'htmlAnatomy') {
    const part = (text: string, label: string, color: string) => (
      <View style={{ alignItems: 'center', gap: 6 }}>
        <View style={[styles.tagBox, { borderColor: color }]}>
          <T style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}>{text}</T>
        </View>
        <T variant="caption" color={color} style={{ fontSize: 11, fontFamily: fonts.bodyBold }}>
          {label}
        </T>
      </View>
    );
    return (
      <View style={[styles.panel, { backgroundColor: '#FFEDE3', flexDirection: 'row', justifyContent: 'center', gap: 6 }]}>
        {part('<h1>', 'opening tag', '#C2410C')}
        {part('Hello', 'content', colors.primary)}
        {part('</h1>', 'closing tag', '#C2410C')}
      </View>
    );
  }
  return (
    <View style={[styles.panel, { backgroundColor: colors.tealSoft }]}>
      <T variant="kicker" color="#0F766E" style={{ letterSpacing: 0.5 }}>
        ONE COMPONENT, MANY CARDS
      </T>
      {[
        ['Delhi', 'Agra'],
        ['Pune', 'Goa'],
      ].map(([from, to]) => (
        <View key={from} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={styles.props}>
            <T style={{ fontFamily: fonts.mono, fontSize: 11, color: '#0F766E' }}>
              from=&quot;{from}&quot; to=&quot;{to}&quot;
            </T>
          </View>
          <Icon name="chevronRight" size={16} color="#0F766E" />
          <View style={styles.miniCard}>
            <T variant="labelSm">
              {from} → {to}
            </T>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  panel: { flex: 1, borderRadius: 16, padding: 12, gap: 6 },
  stepNo: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  tagBox: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, backgroundColor: '#FFFFFF' },
  props: { flex: 1, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: '#FFFFFF' },
  miniCard: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#B7E4DE' },
});
