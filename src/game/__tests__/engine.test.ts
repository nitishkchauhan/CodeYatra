import { describe, expect, it } from '@jest/globals';

import { addBlock, countBlocks, cycleRepeat, fromSpec, removeBlock, runProgram, toPython } from '../engine';
import { LEVELS } from '../levels';

describe('level solutions', () => {
  it.each(Object.values(LEVELS))('$id is solvable within its block target', (level) => {
    const program = fromSpec(level.solution);
    const result = runProgram(level, program);
    expect(result.outcome).toBe('ok');
    expect(countBlocks(program)).toBeLessThanOrEqual(level.maxBlocks);
  });
});

describe('runProgram', () => {
  const level = LEVELS['gem-row'];

  it('reports the block that hits an obstacle', () => {
    const program = fromSpec([{ repeat: 3, body: ['move', 'pick'] }, 'move']);
    const result = runProgram(level, program);
    expect(result.outcome).toBe('blocked');
    expect(result.failId).toBe(program[1].id);
  });

  it('notices missed gems at the flag', () => {
    const result = runProgram(level, fromSpec([{ repeat: 3, body: ['move'] }, 'right', 'move', 'move']));
    expect(result.outcome).toBe('gems');
  });

  it('records one frame per executed block plus the start', () => {
    const result = runProgram(level, fromSpec([{ repeat: 2, body: ['move', 'pick'] }]));
    expect(result.frames).toHaveLength(5);
    expect(result.outcome).toBe('short');
  });

  it('stops runaway programs', () => {
    const spin = fromSpec(Array.from({ length: 20 }, () => ({ repeat: 5, body: ['right' as const] })));
    expect(runProgram(level, spin).outcome).toBe('long');
  });
});

describe('program editing', () => {
  it('adds blocks inside a targeted repeat and never nests repeats', () => {
    let p = addBlock([], 'repeat', null);
    const repeatId = p[0].id;
    p = addBlock(p, 'move', repeatId);
    p = addBlock(p, 'repeat', repeatId);
    expect(p).toHaveLength(2);
    expect(p[0].type === 'repeat' && p[0].body.map((b) => b.type)).toEqual(['move']);
  });

  it('removes nested blocks and cycles repeat counts 2..5', () => {
    let p = fromSpec([{ repeat: 5, body: ['move', 'pick'] }]);
    const inner = p[0].type === 'repeat' ? p[0].body[0].id : '';
    p = removeBlock(p, inner);
    expect(countBlocks(p)).toBe(2);
    p = cycleRepeat(p, p[0].id);
    expect(p[0].type === 'repeat' && p[0].times).toBe(2);
  });

  it('writes the program as Python', () => {
    expect(toPython(fromSpec([{ repeat: 3, body: ['move', 'pick'] }, 'right']))).toBe(
      'for i in range(3):\n    move()\n    pick_gem()\nturn_right()',
    );
  });
});
