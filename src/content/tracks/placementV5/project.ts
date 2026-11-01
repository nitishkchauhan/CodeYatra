// Placement · Final project: a mock placement round (keeps the old project id, pl-project). The challenge tasks,
// then the three tested questions from before: a string, an array and a SQL question.
import type { EditorStep, Lesson } from '../../types';
import { PLACEMENT_PROJECT as OLD } from '../placement';
import { arrange, bugTask, kit, mcq, pairs, pickCode, predictTask, swipe } from './kit';

const { challenge } = kit('placement');
const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · MOCK ROUND' }));

export const PL_PROJECT_V5: Lesson = challenge('pl-project', 'Final: a mock placement round', { icon: '🏆', name: 'Placement Ready' }, ['Solve string, array and SQL questions under round conditions', 'Plan edge cases before coding', 'Check answers against hidden-style tests'], [
  mcq(1, 'You have 30 minutes for three questions. What first?', ['Read all three and start with the easiest', 'Start the hardest', 'Write tests only', 'Skip the SQL one'], 'Bank the sure marks.'),
  mcq(2, 'Compressing "aaabcc" to "a3bc2" needs…', ['One pass counting runs of the same letter', 'Sorting', 'A dict of counts only', 'Recursion'], 'Runs, in order.'),
  mcq(3, 'A “best streak” of rising days is found with…', ['One pass keeping the current and best run', 'Sorting the days', 'Two nested loops only', 'A set'], 'O(n).'),
  mcq(4, '“Passengers with at least 2 bookings” needs…', ['GROUP BY passenger HAVING COUNT(*) >= 2', 'WHERE COUNT(*) >= 2', 'ORDER BY passenger', 'DISTINCT passenger'], 'Group filter.', { mono: true }),
  mcq(5, 'Your code passes the examples but fails hidden tests. Check…', ['Edge cases: empty input, one item, ties', 'The font', 'Variable names', 'Comments'], 'Hidden tests hunt edges.'),
  swipe([
    ['An empty string is a valid input to test', true, 'It often breaks code.'],
    ['Printing extra debug lines is fine in a judge', false, 'Output must match.'],
    ['A correct O(n²) answer beats a wrong O(n) one', true, 'Correct first.'],
    ['SQL questions can be answered with GROUP BY and HAVING', true, 'Very often.'],
  ]),
  pairs([['Compress', 'Count runs'], ['Best streak', 'Current vs best'], ['Frequent travellers', 'HAVING'], ['Edge cases', 'Empty, one, ties']], 'The three questions.'),
  pickCode('Which turns "aaab" into a3b1?', ['"".join(k + str(len(list(g))) for k, g in groupby("aaab"))', '"aaab".count("a")', 'sorted("aaab")', 'set("aaab")'], 'groupby (from itertools) groups runs of the same letter.'),
  bugTask(['best = cur = 1', 'for i in range(1, len(days)):', '    cur = cur + 1 if days[i] > days[i - 1] else 0', '    best = max(best, cur)'], [[3, 'else 0', 'else 1']], 'A new run already has one day in it.'),
  predictTask(['from itertools import groupby', 's = "aaabcc"', 'print("".join(k + (str(n) if (n := len(list(g))) > 1 else "") for k, g in groupby(s)))'], 'What does it print?', ['a3bc2', 'a3b1c2', 'abc', '3a1b2c'], 'Counts only when the run is longer than 1.'),
  arrange(['days = [3, 5, 6, 2, 4]', 'best = cur = 1', 'for i in range(1, len(days)):', '    cur = cur + 1 if days[i] > days[i - 1] else 1', '    best = max(best, cur)', 'print(best)'], 'the data, start, each day, extend or reset the run, keep the best, print', ['3']),
  ...steps,
], 'project');
