import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from './ui/Icon';
import { T } from './ui/Text';
import type { BlockType } from '@/game/engine';

// Each block has its own colour, icon AND label, so colour is never the only cue.
export const BLOCK_META: Record<BlockType, { label: string; short: string; color: string; shadow: string; icon: string }> = {
  move: { label: 'Move', short: 'Move', color: '#2563EB', shadow: '#1D4ED8', icon: 'M12 19V5 M6 11l6-6 6 6' },
  right: { label: 'Turn right', short: 'Right', color: '#7C3AED', shadow: '#6025C9', icon: 'M19 12a7 7 0 1 1-2.6-5.4 M19 3v4h-4' },
  left: { label: 'Turn left', short: 'Left', color: '#7C3AED', shadow: '#6025C9', icon: 'M5 12a7 7 0 1 0 2.6-5.4 M5 3v4h4' },
  pick: { label: 'Pick gem', short: 'Pick', color: '#15803D', shadow: '#0F6630', icon: 'M6 9l3-5h6l3 5-6 11z M6 9h12' },
  repeat: {
    label: 'Repeat',
    short: 'Repeat',
    color: '#C2410C',
    shadow: '#9A3412',
    icon: 'M17 3l3 3-3 3 M4 11V9a3 3 0 0 1 3-3h13 M7 21l-3-3 3-3 M20 13v2a3 3 0 0 1-3 3H4',
  },
};

/** Static block used in explanations. */
export function BlockChip({ type, height = 30 }: { type: BlockType; height?: number }) {
  const m = BLOCK_META[type];
  return (
    <View style={[styles.chip, { height, backgroundColor: m.color }]}>
      <Icon d={m.icon} size={14} color="#FFFFFF" strokeWidth={2.4} />
      <T variant="labelSm" color="#FFFFFF">
        {m.label}
      </T>
    </View>
  );
}

/** The orange C-shape that wraps the blocks a Repeat runs. */
export function RepeatFrame({ times, header, children }: { times: number; header?: ReactNode; children: ReactNode }) {
  const m = BLOCK_META.repeat;
  return (
    <View>
      <View style={[styles.repeatHead, { backgroundColor: m.color }]}>
        {header ?? (
          <>
            <Icon d={m.icon} size={14} color="#FFFFFF" strokeWidth={2.2} />
            <T variant="labelSm" color="#FFFFFF" style={{ flex: 1 }}>
              Repeat
            </T>
            <View style={styles.times}>
              <T variant="labelSm" color="#9A3412">
                {times}
              </T>
            </View>
          </>
        )}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 10, backgroundColor: m.color }} />
        <View style={{ flex: 1, paddingVertical: 4, paddingLeft: 6, gap: 4 }}>{children}</View>
      </View>
      <View style={[styles.repeatFoot, { backgroundColor: m.color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9 },
  repeatHead: {
    minHeight: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 8,
    paddingRight: 5,
  },
  times: { minWidth: 22, height: 20, borderRadius: 5, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  repeatFoot: { height: 10, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopRightRadius: 8 },
});
