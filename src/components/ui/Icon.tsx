import type { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const ICONS = {
  learn: 'M3 5.5A1.5 1.5 0 0 1 4.5 4H10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H3z M21 5.5A1.5 1.5 0 0 0 19.5 4H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z',
  practice: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
  close: 'M6 6l12 12 M18 6L6 18',
  back: 'M15 5l-7 7 7 7',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 5l7 7-7 7',
  check: 'M5 12.5l4.5 4.5L19 7',
  cross: 'M8.5 8.5l7 7 M15.5 8.5l-7 7',
  alert: 'M12 7v6 M12 17h.01',
  lock: 'M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  reset: 'M4 12a8 8 0 1 0 2.6-5.9 M4 4v5h5',
  speaker: 'M4 9v6h4l5 4V5L8 9z M16 9a4 4 0 0 1 0 6 M18.5 6.5a8 8 0 0 1 0 11',
  bulb: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  plus: 'M12 5v14 M5 12h14',
  gem: 'M6 9l3-5h6l3 5-6 11z M6 9h12',
  flag: 'M5 21V4 M5 4h11l-2 4 2 4H5',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c2.5 2.7 2.5 15.3 0 18 M12 3c-2.5 2.7-2.5 15.3 0 18',
  vibrate: 'M7 3h10v18H7z M3 8v8 M21 8v8',
  trash: 'M4 7h16 M10 11v6 M14 11v6 M6 7l1 13h10l1-13 M9 7V4h6v3',
} as const;

// Filled glyphs (drawn with fill instead of stroke).
export const GLYPHS = {
  play: 'M8 5.5v13l10-6.5z',
  flame: 'M12 2.5c1 4 6 6.5 6 11.5a6 6 0 0 1-12 0c0-3 1.7-5 3-6.2 0 2 .8 3.2 2 3.2 0-4-.8-6 1-8.5z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  star: 'M12 2l3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6-6.3 3.6 1.5-7L2 9.3l7-.8z',
} as const;

export type IconName = keyof typeof ICONS;
export type GlyphName = keyof typeof GLYPHS;

export function Icon({
  name,
  d,
  size = 22,
  color = '#16142B',
  strokeWidth = 2,
}: {
  name?: IconName;
  d?: string;
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={d ?? (name ? ICONS[name] : '')}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function Glyph({ name, size = 18, color = '#16142B' }: { name: GlyphName; size?: number; color?: ColorValue }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={GLYPHS[name]} fill={color} />
    </Svg>
  );
}
