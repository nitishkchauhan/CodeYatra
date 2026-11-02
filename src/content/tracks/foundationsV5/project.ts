// Logic Foundations · Final project: Yatri’s Gem Bazaar (keeps the old project id, f-project). The challenge
// tasks, then the old project’s block puzzle and its tested Python command runner.
import type { EditorStep, Lesson, PuzzleStep } from '../../types';
import { LOGIC_PROJECT as OLD } from '../logicFoundations';
import { arrange, bugTask, kit, mcq, pairs, pickCode, predictTask, swipe } from '../placementV5/kit';

const { challenge } = kit('python');
const steps = OLD.steps.filter((s): s is PuzzleStep | EditorStep => s.type === 'puzzle' || s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · GEM BAZAAR' }));

export const F_PROJECT_V5: Lesson = challenge('f-project', 'Final: Yatri’s Gem Bazaar', { icon: '🏆', name: 'Logic Explorer' }, ['Plan a route with loops and turns', 'Run a list of commands with a loop and if', 'Count gems with variables'], [
  mcq(1, 'Yatri must collect 5 gems in a row. Best plan?', ['A loop that moves and picks 5 times', 'Five separate programs', 'Random moves', 'Only turns'], 'Repeat the pattern.'),
  mcq(2, 'A list of commands like ["move", "pick", "move"] is run with…', ['A for loop over the list', 'One print', 'A single if', 'No code'], 'One command at a time.'),
  mcq(3, 'How does the program know which command it has?', ['if / elif on the command', 'It guesses', 'A while True only', 'It doesn’t need to'], 'Decisions.'),
  mcq(4, 'Where should the gem count live?', ['In a variable that goes up on each pick', 'In the command list', 'In a function name', 'Nowhere'], 'A box.'),
  mcq(5, 'An unknown command like "jump" should…', ['Be reported, not crash the program', 'Stop the computer', 'Be ignored silently forever', 'Become a move'], 'Handle the else.'),
  swipe([
    ['A for loop can walk through a list of commands', true, 'One at a time.'],
    ['gems = gems + 1 counts a pick', true, 'Change the box.'],
    ['elif lets the program choose between commands', true, 'One branch.'],
    ['Turning moves Yatri a square', false, 'It changes direction.'],
  ]),
  pairs([['for', 'Each command'], ['if / elif', 'Which command'], ['gems += 1', 'Count'], ['def', 'Your own block']], 'The program’s parts.'),
  pickCode('Which counts the "pick" commands in a list cmds?', ['cmds.count("pick")', 'len(cmds)', 'cmds.pick()', 'count(cmds)'], 'count() on a list.'),
  bugTask(['gems = 0', 'for c in ["move", "pick", "pick"]:', '    if c = "pick":', '        gems = gems + 1'], [[3, 'c = "pick"', 'c == "pick"']], '== compares.'),
  predictTask(['x, gems = 0, 0', 'for c in ["move", "pick", "move", "move", "pick"]:', '    if c == "move":', '        x = x + 1', '    elif c == "pick":', '        gems = gems + 1', 'print(x, gems)'], 'What does it print?', ['3 2', '2 3', '5 0', '3 3'], 'Three moves, two picks.'),
  arrange(['gems = 0', 'for c in ["pick", "move", "pick"]:', '    if c == "pick":', '        gems = gems + 1', 'print("Gems:", gems)'], 'start, each command, is it a pick?, count it, print', ['Gems: 2']),
  ...steps,
], 'project');
