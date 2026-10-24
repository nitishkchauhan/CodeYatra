// Extra practice for each C module. C predicts compile and run with gcc in tests.
import { predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · C';
const prog = (body: string[], includes = ['stdio.h']): string[] => [...includes.map((h) => `#include <${h}>`), 'int main(void) {', ...body.map((l) => `    ${l}`), '    return 0;', '}'];

export const C_DRILLS: Record<string, Step[]> = {
  'c-hello': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['printf("A");', 'printf("B\\n");', 'printf("C\\n");']), answer: 'AB\nC', explain: 'Only \\n starts a new line.' }),
    quiz({ prompt: 'Which placeholder prints a string?', options: ['%s', '%d', '%c', '%f'], right: 'Right.', wrong: '%s is for strings; %d ints, %c chars, %f floats.', mono: true }),
    quiz({ prompt: 'What does gcc hello.c -o hello do?', options: ['Compiles hello.c into a program called hello', 'Runs hello.c', 'Deletes hello', 'Opens hello.c in an editor'], right: 'Right. Then run it with ./hello.', wrong: 'gcc compiles; -o names the output program.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['printf("%d%%\\n", 50);']), answer: '50%', explain: '%% prints one percent sign.' }),
  ],
  'c-vars': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int a = 7;', 'double b = a / 2;', 'printf("%.1f\\n", b);']), answer: '3.0', explain: 'a / 2 is integer division (3) before it is stored in the double.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['char c = \'a\';', 'printf("%d\\n", c - \'a\' + 1);']), answer: '1', explain: 'Characters are numbers, so \'a\' − \'a\' is 0.' }),
    quiz({ prompt: 'What does a local int declared without a value contain?', options: ['Whatever bits were already in memory', 'Always 0', 'Always -1', 'NULL'], right: 'Right. Initialise it.', wrong: 'Uninitialised locals hold garbage.' }),
    quiz({ prompt: 'Which keyword makes a variable read-only?', options: ['const', 'static', 'final', 'readonly'], right: 'Right.', wrong: 'C uses const.', mono: true }),
  ],
  'c-ops': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['printf("%d %d\\n", 7 / 2, 7 % 2);']), answer: '3 1', explain: 'Integer division drops the fraction; % gives the remainder.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int x = 5;', 'printf("%d %d %d\\n", x & 1, x | 2, x << 1);']), answer: '1 7 10', explain: '101 & 001 = 1, 101 | 010 = 111 (7), and 5 << 1 doubles it.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int sum = 7, n = 2;', 'printf("%.1f\\n", (double)sum / n);']), answer: '3.5', explain: 'The cast makes it a decimal division.' }),
    quiz({ prompt: 'What does scanf return?', options: ['How many values it read', 'The number typed', 'Always 0', 'The address of the variable'], right: 'Right. Check it equals what you expect.', wrong: 'It returns the count of values it matched.' }),
  ],
  'c-if': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int marks = 75;', 'if (marks >= 90) printf("A\\n");', 'else if (marks >= 75) printf("B\\n");', 'else printf("C\\n");']), answer: 'B', explain: '75 fails the first test and passes the second.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int x = -3;', 'if (x) printf("true\\n");', 'else printf("false\\n");']), answer: 'true', explain: 'Any non-zero value, even negative, is true.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int d = 3;', 'switch (d) {', '    case 1: printf("Mon\\n"); break;', '    case 3: printf("Wed\\n"); break;', '    default: printf("Other\\n");', '}']), answer: 'Wed', explain: 'It jumps to case 3, and break stops it there.' }),
    quiz({ prompt: 'What does !(5 > 3) give in C?', options: ['0', '1', 'false', '-1'], right: 'Right. ! turns true (1) into 0.', wrong: '5 > 3 is 1, and ! makes it 0.', mono: true }),
  ],
  'c-loops': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['for (int i = 10; i > 0; i -= 3) printf("%d ", i);', 'printf("\\n");']), answer: '10 7 4 1', explain: 'It counts down by 3 while i is above 0.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int n = 0;', 'do {', '    n++;', '} while (n < 0);', 'printf("%d\\n", n);']), answer: '1', explain: 'do-while runs once before checking.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int n = 482, s = 0;', 'while (n > 0) {', '    s += n % 10;', '    n /= 10;', '}', 'printf("%d\\n", s);']), answer: '14', explain: 'It adds the digits: 2 + 8 + 4.' }),
    quiz({ prompt: 'What does continue do?', options: ['Skips to the next round of the loop', 'Leaves the loop', 'Restarts the program', 'Does nothing'], right: 'Right.', wrong: 'continue skips the rest of this round; break leaves the loop.' }),
  ],
  'c-func': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'int fact(int n) {', '    return n <= 1 ? 1 : n * fact(n - 1);', '}', 'int main(void) {', '    printf("%d\\n", fact(5));', '    return 0;', '}'], answer: '120', explain: '5 × 4 × 3 × 2 × 1 = 120.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'void twice(int x) { x = x * 2; }', 'int main(void) {', '    int a = 4;', '    twice(a);', '    printf("%d\\n", a);', '    return 0;', '}'], answer: '4', explain: 'twice changed its own copy of a.' }),
    quiz({ prompt: 'Where does a function prototype go?', options: ['Before the first call, usually at the top', 'Inside main', 'After return 0', 'Anywhere, even after the call'], right: 'Right.', wrong: 'The compiler must know a function before it is called.' }),
    quiz({ prompt: 'Which is a correct prototype for a function taking two ints and returning a double?', options: ['double avg(int a, int b);', 'avg(int a, int b) double;', 'double avg(a, b);', 'function avg(int, int): double;'], right: 'Right.', wrong: 'Return type, name, then typed parameters, ending with ;.', mono: true }),
  ],
  'c-arrays': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int a[5] = {4, 9, 2};', 'printf("%d %d\\n", a[1], a[4]);']), answer: '9 0', explain: 'Elements you leave out of the braces become 0.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int a[] = {3, 8, 1, 9, 4};', 'int n = sizeof a / sizeof a[0];', 'int best = a[0];', 'for (int i = 1; i < n; i++) if (a[i] > best) best = a[i];', 'printf("%d %d\\n", n, best);']), answer: '5 9', explain: 'sizeof a / sizeof a[0] counts the elements; the loop finds the largest.' }),
    quiz({ prompt: 'What are the valid indexes of int seats[40]?', options: ['0 to 39', '1 to 40', '0 to 40', '1 to 39'], right: 'Right.', wrong: 'Indexes start at 0, so the last is 39.', mono: true }),
    quiz({ prompt: 'Why does a function that takes an array also need its length?', options: ['C passes only the address of the first element', 'Arrays can’t be passed', 'It makes the code faster', 'The compiler requires two parameters'], right: 'Right.', wrong: 'The function gets a pointer and has no way to know the size.' }),
  ],
  'c-strings': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['char s[] = "Delhi";', 'printf("%d %d\\n", (int)strlen(s), (int)sizeof s);'], ['stdio.h', 'string.h']), answer: '5 6', explain: 'strlen counts letters; sizeof includes the \\0.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['char s[] = "pune";', 's[0] = s[0] - 32;', 'printf("%s\\n", s);']), answer: 'Pune', explain: 'Lowercase letters are 32 above uppercase in ASCII.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['printf("%d\\n", strcmp("abc", "abc"));'], ['stdio.h', 'string.h']), answer: '0', explain: 'strcmp returns 0 for equal strings.' }),
    quiz({ prompt: 'Which is safer for copying into a fixed buffer?', options: ['snprintf(dest, sizeof dest, "%s", src)', 'strcpy(dest, src)', 'dest = src', 'strcat(dest, src)'], right: 'Right. It never writes past the size.', wrong: 'snprintf takes the buffer size and stops there.', mono: true }),
  ],
  'c-pointers': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int x = 5;', 'int *p = &x;', '*p += 3;', 'printf("%d\\n", x);']), answer: '8', explain: '*p is x, so x becomes 8.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int a[] = {10, 20, 30, 40};', 'int *p = a;', 'p += 2;', 'printf("%d %d\\n", *p, *(p - 1));']), answer: '30 20', explain: 'p moves to a[2]; p − 1 is a[1].' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int x = 1, y = 2;', 'int *p = &x;', 'p = &y;', '*p = 9;', 'printf("%d %d\\n", x, y);']), answer: '1 9', explain: 'p was moved to y before the write.' }),
    quiz({ prompt: 'What is NULL?', options: ['A pointer that points to nothing', 'The number 1', 'An empty string', 'A freed block'], right: 'Right. Never dereference it.', wrong: 'NULL means “no address”.' }),
  ],
  'c-struct': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'typedef struct { char name[10]; int age; } P;', 'int main(void) {', '    P a = {"Asha", 17};', '    P *p = &a;', '    p->age++;', '    printf("%s %d\\n", a.name, a.age);', '    return 0;', '}'], answer: 'Asha 18', explain: 'p points to a, so p->age++ changes a.age.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'typedef struct { int roll, marks; } S;', 'int main(void) {', '    S c[3] = {{1, 70}, {2, 95}, {3, 80}};', '    int t = 0;', '    for (int i = 0; i < 3; i++) t += c[i].marks;', '    printf("%d\\n", t);', '    return 0;', '}'], answer: '245', explain: '70 + 95 + 80 = 245.' }),
    quiz({ prompt: 'Why pass a pointer to a big struct instead of the struct?', options: ['It avoids copying, and lets the function change it', 'Structs can’t be passed', 'Pointers are always shorter to type', 'It frees the struct'], right: 'Right.', wrong: 'Passing a struct copies all of it.' }),
    quiz({ prompt: 'What does typedef do?', options: ['Gives a type a new name', 'Creates a variable', 'Allocates memory', 'Defines a function'], right: 'Right.', wrong: 'typedef names a type, e.g. Student for struct Student.' }),
  ],
  'c-memory': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['int *a = calloc(4, sizeof(int));', 'if (a == NULL) return 1;', 'a[1] = 5;', 'printf("%d %d\\n", a[0], a[1]);', 'free(a);'], ['stdio.h', 'stdlib.h']), answer: '0 5', explain: 'calloc fills the block with zeros.' }),
    quiz({ prompt: 'What happens if you never free memory you malloc?', options: ['A memory leak', 'A compile error', 'It is freed instantly', 'The program runs faster'], right: 'Right.', wrong: 'Unfreed memory stays in use: a leak.' }),
    quiz({ prompt: 'Which correctly allocates room for n doubles?', options: ['malloc(n * sizeof(double))', 'malloc(n)', 'malloc(sizeof(n))', 'malloc(double * n)'], right: 'Right.', wrong: 'Multiply the count by the size of one element.', mono: true }),
    quiz({ prompt: 'Why keep the old pointer until realloc succeeds?', options: ['If realloc fails it returns NULL and the old block is still yours to free', 'realloc always frees the old pointer', 'It makes realloc faster', 'You don’t need to'], right: 'Right.', wrong: 'On failure realloc returns NULL; overwriting your pointer would leak the block.' }),
  ],
  'c-files': [
    quiz({ prompt: 'Which mode adds to the end of a file?', options: ['"a"', '"w"', '"r"', '"x"'], right: 'Right.', wrong: '"w" wipes the file; "a" appends.', mono: true }),
    quiz({ prompt: 'What does fgets return at the end of the file?', options: ['NULL', 'An empty string', '0', 'EOF as a string'], right: 'Right.', wrong: 'fgets returns NULL when there is nothing more to read.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: prog(['FILE *f = fopen("t.txt", "w");', 'if (f == NULL) return 1;', 'fprintf(f, "7 8 9");', 'fclose(f);', 'f = fopen("t.txt", "r");', 'if (f == NULL) return 1;', 'int x, n = 0;', 'while (fscanf(f, "%d", &x) == 1) n++;', 'fclose(f);', 'printf("%d\\n", n);']), answer: '3', explain: 'fscanf reads three numbers, then returns EOF.' }),
    quiz({ prompt: 'Why call fclose?', options: ['It writes any buffered data and releases the file', 'It deletes the file', 'It is only needed in "r" mode', 'It empties the file'], right: 'Right.', wrong: 'fclose flushes the buffer and frees the handle.' }),
  ],
};
