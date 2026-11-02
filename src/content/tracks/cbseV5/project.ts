// CBSE · Final project: a board practical record program (keeps the old project id, cbse-project). The challenge
// tasks, then the three tested parts from before: a CSV record file, an undo stack and the report query.
import type { EditorStep, Lesson } from '../../types';
import { CBSE_PROJECT as OLD } from '../cbse';
import { arrange, bugTask, kit, mcq, pairs, pickCode, predictTask, swipe } from '../placementV5/kit';

const { challenge } = kit('python');
const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · PRACTICAL' }));

export const CBSE_PROJECT_V5: Lesson = challenge('cbse-project', 'Final: a board practical record program', { icon: '🏆', name: 'Practical Ready' }, ['Save and search student records in a CSV file', 'Track recent actions with a stack', 'Write the SQL query for the report'], [
  mcq(1, 'Which file type suits a table of roll numbers and marks?', ['CSV', 'A binary pickle of one string', 'An image', 'A Python module'], 'Rows and columns as text.'),
  mcq(2, 'Which mode adds a new student without losing the others?', ['"a"', '"w"', '"r"', '"rb"'], 'Append.', { mono: true }),
  mcq(3, 'An undo feature should use…', ['A stack', 'A queue', 'A sorted list', 'A dictionary of marks'], 'Last action first.'),
  mcq(4, 'The average of marks read from a CSV needs…', ['int() on each value first', 'Nothing special', 'pickle.load', 'A stack'], 'csv gives strings.'),
  mcq(5, '“Students with marks above 80, highest first” in SQL is…', ['SELECT name FROM s WHERE marks > 80 ORDER BY marks DESC;', 'SELECT name FROM s ORDER BY marks WHERE marks > 80;', 'SELECT name FROM s HAVING marks > 80;', 'SELECT TOP 80 FROM s;'], 'WHERE, then ORDER BY.', { mono: true }),
  swipe([
    ['csv.reader gives numbers as strings', true, 'Convert them.'],
    ['Popping an empty undo stack needs a check', true, 'Underflow.'],
    ['"w" keeps the old records', false, 'It empties the file.'],
    ['ORDER BY marks DESC puts the highest first', true, 'Descending.'],
  ]),
  pairs([['CSV file', 'Records'], ['Stack', 'Undo'], ['int()', 'Marks as numbers'], ['ORDER BY', 'Report order']], 'The program’s parts.'),
  pickCode('Which adds a row to marks.csv?', ['with open("marks.csv", "a", newline="") as f: csv.writer(f).writerow([7, "Mia", 88])', 'with open("marks.csv", "w") as f: f.write(7, "Mia", 88)', 'csv.append("marks.csv", [7, "Mia", 88])', 'open("marks.csv").writerow([7, "Mia", 88])'], 'Append mode and a writer.'),
  bugTask(['undo = []', 'undo.append("added Mia")', 'print(undo.pop(0))'], [[3, 'undo.pop(0)', 'undo.pop()']], 'Undo takes the most recent action: the end of the list.'),
  predictTask(['rows = [["Ava", "82"], ["Reed", "91"], ["Zoey", "77"]]', 'marks = [int(m) for _, m in rows]', 'print(round(sum(marks) / len(marks), 1))'], 'What does it print?', ['83.3', '83.33', '250', '83'], '250 ÷ 3, one decimal.'),
  arrange(['import csv', 'with open("m.csv", "w", newline="") as f:', '    csv.writer(f).writerows([["Ava", 82], ["Reed", 91]])', 'with open("m.csv", newline="") as f:', '    print(sum(int(r[1]) for r in csv.reader(f)))'], 'import, open to write, write rows, open to read, add the marks', ['173']),
  ...steps,
], 'project');
