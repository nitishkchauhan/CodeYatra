// The Yatri puzzle engine: block programs, board levels, and a step-by-step runner.

export type Dir = 'N' | 'E' | 'S' | 'W';
export type Cell = readonly [row: number, col: number];

export type BlockType = 'move' | 'right' | 'left' | 'pick' | 'repeat';
export type SimpleBlock = { id: string; type: Exclude<BlockType, 'repeat'> };
export type RepeatBlock = { id: string; type: 'repeat'; times: number; body: SimpleBlock[] };
export type Block = SimpleBlock | RepeatBlock;

export type Level = {
  id: string;
  size: number;
  start: { cell: Cell; dir: Dir };
  flag: Cell;
  gems: Cell[];
  rocks: Cell[];
  trees: Cell[];
  water: Cell[];
  /** Tiles drawn as a sand path (purely visual). */
  path: Cell[];
  palette: BlockType[];
  /** Finish with this many blocks or fewer for full marks. */
  maxBlocks: number;
};

export type Frame = { cell: Cell; dir: Dir; got: number[]; blockId: string | null };
export type Outcome = 'ok' | 'blocked' | 'short' | 'gems' | 'long';
export type RunResult = { frames: Frame[]; outcome: Outcome; failId: string | null };

const MAX_FRAMES = 80;
const DELTA: Record<Dir, Cell> = { N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1] };
const RIGHT: Record<Dir, Dir> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const LEFT: Record<Dir, Dir> = { N: 'W', W: 'S', S: 'E', E: 'N' };

const same = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];
const has = (list: Cell[], c: Cell) => list.some((x) => same(x, c));

export function countBlocks(program: Block[]): number {
  return program.reduce((n, b) => n + 1 + (b.type === 'repeat' ? b.body.length : 0), 0);
}

/** Runs a program and records a frame per executed block, for animation and stepping. */
export function runProgram(level: Level, program: Block[]): RunResult {
  let cell: Cell = level.start.cell;
  let dir: Dir = level.start.dir;
  let got: number[] = [];
  const frames: Frame[] = [{ cell, dir, got, blockId: null }];
  let fail: { id: string; why: Outcome } | null = null;

  const exec = (block: SimpleBlock) => {
    if (frames.length > MAX_FRAMES) {
      fail = { id: block.id, why: 'long' };
      return;
    }
    switch (block.type) {
      case 'move': {
        const next: Cell = [cell[0] + DELTA[dir][0], cell[1] + DELTA[dir][1]];
        const outside = next[0] < 0 || next[1] < 0 || next[0] >= level.size || next[1] >= level.size;
        if (outside || has(level.rocks, next) || has(level.trees, next) || has(level.water, next)) {
          fail = { id: block.id, why: 'blocked' };
          return;
        }
        cell = next;
        break;
      }
      case 'right':
        dir = RIGHT[dir];
        break;
      case 'left':
        dir = LEFT[dir];
        break;
      case 'pick': {
        const gem = level.gems.findIndex((g) => same(g, cell));
        if (gem >= 0 && !got.includes(gem)) got = [...got, gem];
        break;
      }
    }
    frames.push({ cell, dir, got, blockId: block.id });
  };

  outer: for (const block of program) {
    if (block.type === 'repeat') {
      for (let i = 0; i < block.times; i++) {
        for (const inner of block.body) {
          exec(inner);
          if (fail) break outer;
        }
      }
    } else {
      exec(block);
      if (fail) break;
    }
  }

  const failed = fail as { id: string; why: Outcome } | null;
  let outcome: Outcome = 'ok';
  if (failed) outcome = failed.why;
  else if (!same(cell, level.flag)) outcome = 'short';
  else if (got.length < level.gems.length) outcome = 'gems';

  return { frames, outcome, failId: failed ? failed.id : null };
}

// ---------- program editing (pure helpers) ----------

let nextId = 1;
export const newBlockId = () => `b${nextId++}`;

export function makeBlock(type: BlockType): Block {
  return type === 'repeat'
    ? { id: newBlockId(), type, times: 3, body: [] }
    : { id: newBlockId(), type };
}

/** Adds a block at the end, or inside the targeted Repeat. Repeats never nest. */
export function addBlock(program: Block[], type: BlockType, targetRepeatId: string | null): Block[] {
  const block = makeBlock(type);
  if (targetRepeatId && block.type !== 'repeat') {
    return program.map((b) =>
      b.id === targetRepeatId && b.type === 'repeat' ? { ...b, body: [...b.body, block] } : b,
    );
  }
  return [...program, block];
}

export function removeBlock(program: Block[], id: string): Block[] {
  return program
    .filter((b) => b.id !== id)
    .map((b) => (b.type === 'repeat' ? { ...b, body: b.body.filter((x) => x.id !== id) } : b));
}

export function cycleRepeat(program: Block[], id: string): Block[] {
  return program.map((b) =>
    b.id === id && b.type === 'repeat' ? { ...b, times: b.times >= 5 ? 2 : b.times + 1 } : b,
  );
}

// ---------- the same program as real code ----------

const PY: Record<SimpleBlock['type'], string> = {
  move: 'move()',
  right: 'turn_right()',
  left: 'turn_left()',
  pick: 'pick_gem()',
};

export function toPython(program: Block[]): string {
  if (program.length === 0) return '# Add blocks to see your program as Python';
  return program
    .flatMap((b) =>
      b.type === 'repeat'
        ? [`for i in range(${b.times}):`, ...(b.body.length ? b.body.map((x) => `    ${PY[x.type]}`) : ['    pass'])]
        : [PY[b.type]],
    )
    .join('\n');
}

// ---------- test helper: build a program from a compact spec ----------

export type Spec = (SimpleBlock['type'] | { repeat: number; body: SimpleBlock['type'][] })[];

export function fromSpec(spec: Spec): Block[] {
  return spec.map((s) =>
    typeof s === 'string'
      ? { id: newBlockId(), type: s }
      : { id: newBlockId(), type: 'repeat', times: s.repeat, body: s.body.map((t) => ({ id: newBlockId(), type: t })) },
  );
}
