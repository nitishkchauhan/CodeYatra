// C · Final project: a marks manager (keeps the old project id, c-marks-project). The challenge tasks, then the
// tested report step from before, in the code editor.
import type { EditorStep, Lesson } from '../../types';
import { C_PROJECT as OLD } from '../c';
import { arrange, bugTask, mcq, pairs, swipe, track, xray } from './kit';

const { challenge, pickCode } = track('c', 'c');
const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · THE REPORT' }));

export const C_PROJECT_V5: Lesson = challenge('c-marks-project', 'Final: a marks manager', { icon: '🏆', name: 'C Builder' }, ['Store records in an array of structs', 'Find the topper with a function', 'Print a neat report with printf widths'], [
  mcq(1, 'How should the program store each student’s name and marks?', ['An array of structs', 'Two unrelated ints', 'One long string', 'A pointer to char only'], 'A table of records.'),
  mcq(2, 'What should topper(cls, n) return?', ['The index of the student with the highest marks', 'The highest name', 'void', 'The array'], 'Then read any member.'),
  mcq(3, 'Why pass n to topper?', ['A function can’t tell an array’s length', 'C needs two arguments', 'To copy it', 'For speed'], 'Only the start is passed.'),
  mcq(4, 'What does printf("%-6s%4d\\n", …) do?', ['Pads the name to 6 on the left and the marks to 4 on the right', 'Prints 6 names', 'Rounds the marks', 'Nothing special'], 'Widths line up a table.', { mono: true }),
  mcq(5, 'How do you get the average as a decimal from an int total?', ['total / 3.0', 'total / 3', '(int)total / 3', 'total % 3'], 'One side must be a double.', { mono: true }),
  swipe([
    ['A struct can hold a char array and an int together', true, 'name and marks.'],
    ['topper should start with best = 0, then check the rest', true, 'The first is the best so far.'],
    ['%4d pads a number to 4 characters on the right', true, 'Right-aligned.'],
    ['264 / 3 in C gives 88.0', false, 'It gives 88, an int.'],
  ]),
  pairs([['Student', 'A record'], ['cls[i].marks', 'One student’s marks'], ['topper', 'Best index'], ['%-6s', 'Padded name']], 'The program’s parts.'),
  pickCode('Which keeps the index of the best student so far?', ['if (cls[i].marks > cls[best].marks) best = i;', 'if (cls[i] > best) best = cls[i];', 'best = max(cls);', 'if (cls.marks > best) best++;'], 'Compare marks, keep the index.'),
  bugTask(['int topper(Student cls[], int n) {', '    int best = 0;', '    for (int i = 1; i <= n; i++)', '        if (cls[i].marks > cls[best].marks) best = i;', '    return best;', '}'], [[3, 'i <= n', 'i < n']], 'Indexes stop at n − 1.'),
  xray('<div class="c">$ ./marks</div><div class="a">Ava     82</div><div class="b">Topper: Reed</div>', [
    ['.a', 'A padded row', 'printf("%-6s%4d\\n", s.name, s.marks)', ['printf("%-6s%4d\\n", s.name, s.marks)', 'cls[topper(cls, 3)].name', 'total / 3.0']],
    ['.b', 'The best student', 'cls[topper(cls, 3)].name', ['printf("%-6s%4d\\n", s.name, s.marks)', 'cls[topper(cls, 3)].name', 'total / 3.0']],
  ]),
  arrange(['#include <stdio.h>', 'typedef struct { char name[10]; int marks; } Student;', 'int main(void) {', '    Student cls[2] = {{"Ava", 82}, {"Reed", 91}};', '    int best = cls[1].marks > cls[0].marks ? 1 : 0;', '    printf("Topper: %s\\n", cls[best].name);', '    return 0;', '}'], 'include, the struct, main, the class, pick the best, print, return, close', ['Topper: Reed']),
  ...steps,
], 'project');
