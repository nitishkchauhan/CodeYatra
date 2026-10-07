import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';

import { Yatri, type Mood } from './Yatri';
import type { Cell, Dir, Level } from '@/game/engine';

const TOP = 34;
const SLAB = 16;
const SPRITE = 40;

/** Isometric projection: the centre of a grid cell in board pixels. */
function project(cell: Cell, width: number, n: number) {
  const a = (width - 24) / (2 * n);
  const b = a / 2;
  return { x: width / 2 + (cell[1] - cell[0]) * a, y: TOP + (cell[0] + cell[1]) * b + b, a, b };
}

const diamond = (x: number, y: number, a: number, b: number) => `${x},${y - b} ${x + a},${y} ${x},${y + b} ${x - a},${y}`;

// Screen-space direction of "forward" for each facing on the isometric board.
const FACING: Record<Dir, [number, number]> = { E: [1, 1], S: [-1, 1], W: [-1, -1], N: [1, -1] };

export function Board({
  level,
  width,
  cell,
  dir,
  got,
  mood,
  stepMs = 400,
}: {
  level: Level;
  width: number;
  cell: Cell;
  dir: Dir;
  got: number[];
  mood: Mood;
  stepMs?: number;
}) {
  const n = level.size;
  const { a, b } = project([0, 0], width, n);
  const top = { x: width / 2, y: TOP };
  const right = { x: width / 2 + n * a, y: TOP + n * b };
  const bottom = { x: width / 2, y: TOP + 2 * n * b };
  const left = { x: width / 2 - n * a, y: TOP + n * b };
  const height = bottom.y + SLAB + 10;

  const pos = project(cell, width, n);
  const x = useSharedValue(pos.x);
  const y = useSharedValue(pos.y);
  useEffect(() => {
    x.set(withTiming(pos.x, { duration: stepMs * 0.8 }));
    y.set(withTiming(pos.y, { duration: stepMs * 0.8 }));
  }, [pos.x, pos.y, stepMs, x, y]);
  const sprite = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value - SPRITE / 2 }, { translateY: y.value - SPRITE * 1.1 }],
  }));

  const grid: string[] = [];
  for (let k = 1; k < n; k++) {
    const c0 = project([0, k], width, n);
    const c1 = project([n, k], width, n);
    grid.push(`M${c0.x} ${c0.y - b} L${c1.x} ${c1.y - b}`);
    const r0 = project([k, 0], width, n);
    const r1 = project([k, n], width, n);
    grid.push(`M${r0.x} ${r0.y - b} L${r1.x} ${r1.y - b}`);
  }
  const [fx, fy] = FACING[dir];
  const flag = project(level.flag, width, n);

  return (
    <View
      style={{ width, height }}
      accessible
      accessibilityLabel={`Game board. Yatri is at row ${cell[0] + 1}, column ${cell[1] + 1}, facing ${dir}. ${got.length} of ${level.gems.length} gems collected.`}>
      <Svg width={width} height={height}>
        <Ellipse cx={width / 2} cy={bottom.y + SLAB + 2} rx={n * a} ry={9} fill="#16142B" opacity={0.06} />
        <Polygon points={`${left.x},${left.y} ${bottom.x},${bottom.y} ${bottom.x},${bottom.y + SLAB} ${left.x},${left.y + SLAB}`} fill="#D6C4A1" />
        <Polygon points={`${bottom.x},${bottom.y} ${right.x},${right.y} ${right.x},${right.y + SLAB} ${bottom.x},${bottom.y + SLAB}`} fill="#C2AE87" />
        <Polygon points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`} fill="#E4F1DC" />
        {level.water.map((c) => {
          const p = project(c, width, n);
          return <Polygon key={`w${c}`} points={diamond(p.x, p.y, a, b)} fill="#B3E6E0" />;
        })}
        {level.path.map((c) => {
          const p = project(c, width, n);
          return <Polygon key={`p${c}`} points={diamond(p.x, p.y, a, b)} fill="#F5EDDC" />;
        })}
        <Polygon points={diamond(flag.x, flag.y, a, b)} fill="#FFE7C2" />
        <Path d={grid.join(' ')} stroke="#CBE0BF" strokeWidth={1} />
        <Polygon points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`} fill="none" stroke="#CBE0BF" strokeWidth={1.2} />

        {level.trees.map((c) => {
          const p = project(c, width, n);
          return (
            <G key={`t${c}`} transform={`translate(${p.x},${p.y})`}>
              <Rect x={-2} y={-9} width={4} height={11} rx={1} fill="#9B7650" />
              <Circle cx={0} cy={-17} r={a * 0.37} fill="#3FAE76" />
              <Circle cx={-4} cy={-21} r={a * 0.15} fill="#6CC795" />
            </G>
          );
        })}
        {level.rocks.map((c) => {
          const p = project(c, width, n);
          return (
            <G key={`r${c}`} transform={`translate(${p.x},${p.y})`}>
              <Path d="M-13 4 Q-11 -9 0 -11 Q11 -9 13 4 Z" fill="#A9A4BE" />
              <Path d="M-7 -5 Q-2 -9 4 -7" stroke="#CDC9DB" strokeWidth={2.5} strokeLinecap="round" fill="none" />
            </G>
          );
        })}
        {level.gems.map((c, i) => {
          if (got.includes(i)) return null;
          const p = project(c, width, n);
          return (
            <G key={`g${c}`} transform={`translate(${p.x},${p.y - 6})`}>
              <Ellipse cx={0} cy={8} rx={5} ry={2} fill="#16142B" opacity={0.12} />
              <Polygon points="0,-9 7,-3 0,5 -7,-3" fill="#0EA5A0" />
              <Polygon points="0,-9 7,-3 0,-1 -7,-3" fill="#5EEAD4" />
            </G>
          );
        })}
        <G transform={`translate(${flag.x},${flag.y})`}>
          <Ellipse cx={0} cy={2} rx={6} ry={2.5} fill="#16142B" opacity={0.15} />
          <Line x1={0} y1={2} x2={0} y2={-32} stroke="#4B3FD8" strokeWidth={2.5} strokeLinecap="round" />
          <Path d="M0 -32 L20 -26 L0 -20 Z" fill="#FF9F1C" />
        </G>
        {/* Facing marker, so students can see where Move will go. */}
        <Circle cx={pos.x + fx * a * 0.6} cy={pos.y + fy * b * 0.6} r={4} fill="#4B3FD8" opacity={0.55} />
      </Svg>
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, top: 0 }, sprite]}>
        <Yatri size={SPRITE} mood={mood} />
      </Animated.View>
    </View>
  );
}
