// C · Modules 7–12 (Intermediate): arrays, strings, pointers, structs, dynamic memory and files. Each module’s
// first lesson keeps its old id. Every program is compiled with gcc in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, chat, compare, mcq, pairs, recap, reveal, swipe, tapbug, track, truth, xray } from './kit';

const { lesson, challenge, check, pickCode } = track('c', 'c');

/** A complete C program around body lines. */
const prog = (body: string[], includes = ['stdio.h']): string[] => [...includes.map((h) => `#include <${h}>`), '', 'int main(void) {', ...body.map((l) => `    ${l}`), '    return 0;', '}'];

export const C_M7: Lesson[] = [
  lesson('c-arrays', 'Arrays', 8, [
    chat(['An array is a row of boxes of the same type, side by side in memory. seats[0] is the first box.', 'Its size is fixed when you make it, and C never checks that an index is inside it. That part is your job.']),
    compare('Working with arrays', [
      ['Make and loop', prog(['int seats[5] = {3, 0, 2, 5, 1};', 'int total = 0;', 'for (int i = 0; i < 5; i++) total += seats[i];', 'printf("First %d, last %d, total %d\\n", seats[0], seats[4], total);']), 'Indexes go from 0 to size − 1.', ['First 3, last 1, total 11']],
      ['Its length', prog(['int seats[5] = {3, 0, 2, 5, 1};', 'int n = sizeof(seats) / sizeof(seats[0]);', 'printf("%d items\\n", n);']), 'Whole array’s bytes ÷ one item’s bytes.', ['5 items']],
      ['2-D', prog(['int hall[2][3] = {{1, 2, 3}, {4, 5, 6}};', 'printf("Row 2, seat 3: %d\\n", hall[1][2]);']), 'Rows, then columns.', ['Row 2, seat 3: 6']],
    ]),
    compare('Arrays and functions', [
      ['Pass the length', ['#include <stdio.h>', '', 'int total(int a[], int n) {', '    int t = 0;', '    for (int i = 0; i < n; i++) t += a[i];', '    return t;', '}', '', 'int main(void) {', '    int sales[] = {120, 80, 95};', '    printf("%d\\n", total(sales, 3));', '    return 0;', '}'], 'A function can’t tell an array’s length, so pass it too.', ['295']],
      ['Changes stick', ['#include <stdio.h>', '', 'void reset(int a[], int n) {', '    for (int i = 0; i < n; i++) a[i] = 0;', '}', '', 'int main(void) {', '    int sales[] = {120, 80, 95};', '    reset(sales, 3);', '    printf("%d %d %d\\n", sales[0], sales[1], sales[2]);', '    return 0;', '}'], 'Unlike an int, an array is not copied: the function works on the original.', ['0 0 0']],
    ]),
    tapbug('It reads past the end of the array', ['int a[5] = {1, 2, 3, 4, 5};', 'for (int i = 0; i <= 5; i++) printf("%d\\n", a[i]);'], [[2, 'i <= 5', 'i < 5']], 'Indexes are 0 to 4. a[5] is outside the array, and C won’t stop you.'),
    check('What is the last index of int marks[10]?', ['9', '10', '11', '0'], 'Size − 1.', 'Counting starts at 0.', { mono: true }),
    recap([
      ['🗃', 'int a[5]: five ints side by side, a[0] to a[4]'],
      ['📏', 'sizeof(a) / sizeof(a[0]) for the length'],
      ['⚠', 'No bounds check: stay below the size'],
    ]),
  ]),

  challenge('c-i-7-ch', 'Module 7 Challenge', { icon: '🗃', name: 'Array Ace' }, ['Make and loop over arrays', 'Pass arrays with their length', 'Stay inside the bounds'], [
    mcq(1, 'What is the first index of a C array?', ['0', '1', '-1', 'It depends'], 'Always 0.', { mono: true }),
    mcq(2, 'int a[4] = {7, 8}; what is a[3]?', ['0', '8', 'Rubbish', 'An error'], 'Missing items in an initialiser become 0.', { mono: true }),
    mcq(3, 'What does C do with a[10] when a has 5 items?', ['Nothing stops it: the result is undefined', 'An error message', 'Returns 0', 'Grows the array'], 'No bounds check.'),
    mcq(4, 'Why pass n with an array to a function?', ['The function can’t know the array’s length', 'C needs two arguments', 'For speed', 'To copy it'], 'Only its start is passed.'),
    mcq(5, 'grid[2][4] has how many ints?', ['8', '6', '2', '4'], '2 × 4.', { mono: true }),
    swipe([
      ['An array’s size can grow later', false, 'Fixed (malloc for growing, module 11).'],
      ['A function can change the caller’s array', true, 'It works on the original.'],
      ['All items in an array have the same type', true, 'One type.'],
      ['sizeof(a) inside a function gives the whole array’s size', false, 'Only the pointer’s size.'],
    ]),
    pairs([['a[0]', 'First item'], ['a[n - 1]', 'Last item'], ['sizeof(a)', 'Bytes in total'], ['a[1][2]', 'Row 2, column 3']], 'Arrays.'),
    pickCode('Which adds up every item of int a[n]?', ['for (int i = 0; i < n; i++) t += a[i];', 'for (int i = 1; i <= n; i++) t += a[i];', 'for (int i = 0; i <= n; i++) t += a[i];', 't = sum(a);'], '0 to n − 1.'),
    bugTask(['int marks[3] = {70, 85, 90};', 'printf("%d\\n", marks[3]);'], [[2, 'marks[3]', 'marks[2]']], 'Three items: indexes 0, 1, 2.'),
    xray('<div class="c">$ ./arrays</div><div class="a">First 3, last 1, total 11</div><div class="b">Row 2, seat 3: 6</div>', [
      ['.a', 'Loop over a row', 'total += seats[i]', ['total += seats[i]', 'hall[1][2]', 'reset(sales, 3)']],
      ['.b', 'A 2-D array', 'hall[1][2]', ['total += seats[i]', 'hall[1][2]', 'reset(sales, 3)']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    int cups[] = {4, 9, 2};', '    int best = cups[0];', '    for (int i = 1; i < 3; i++) if (cups[i] > best) best = cups[i];', '    printf("Most: %d\\n", best);', '    return 0;', '}'], 'include, main, the data, start with the first, check the rest, print, return, close', ['Most: 9']),
  ]),

  lesson('c-strings', 'Strings', 8, [
    chat(['C has no string type. A string is an array of char that ends with a hidden zero character, \\0.', '"Sam" takes 4 bytes: S, a, m and \\0. string.h has the functions for working with them.']),
    compare('Strings', [
      ['Make and print', prog(['char name[] = "Rosa’s Café";', 'char code[4] = "MUM";', 'printf("%s / %s\\n", name, code);']), 'char code[4] holds 3 letters plus \\0.', ['Rosa’s Café / MUM']],
      ['strlen and strcpy', prog(['char city[20];', 'strcpy(city, "Sutton");', 'printf("%s has %zu letters\\n", city, strlen(city));'], ['stdio.h', 'string.h']), 'strcpy copies; strlen counts up to \\0.', ['Sutton has 6 letters']],
      ['strcat and strcmp', prog(['char msg[30] = "Hello, ";', 'strcat(msg, "Mia");', 'printf("%s\\n", msg);', 'printf("%d\\n", strcmp("tea", "tea") == 0);'], ['stdio.h', 'string.h']), 'strcat joins; strcmp gives 0 when equal.', ['Hello, Mia', '1']],
    ]),
    compare('Characters', [
      ['Loop to \\0', prog(['char word[] = "train";', 'int n = 0;', "for (int i = 0; word[i] != '\\0'; i++) n++;", 'printf("%d\\n", n);']), 'Walk until the zero character.', ['5']],
      ['ctype.h', prog(['char word[] = "train";', 'for (int i = 0; word[i]; i++) word[i] = toupper(word[i]);', 'printf("%s\\n", word);'], ['stdio.h', 'ctype.h']), 'toupper, tolower, isdigit, isalpha work on one char.', ['TRAIN']],
    ]),
    reveal('String traps', [
      ['= doesn’t copy', 'name = "Sam"; fails for an array. Use strcpy.'],
      ['== doesn’t compare', 'It compares addresses. Use strcmp(a, b) == 0.'],
      ['Room for \\0', 'A 5-letter word needs char w[6].'],
      ['Reading a word', 'scanf("%19s", name) reads one word (no & for arrays); fgets reads a whole line.'],
    ], { mono: true }),
    tapbug('It says the passwords differ even when they match', ['if (typed == saved) printf("OK\\n");'], [[1, 'typed == saved', 'strcmp(typed, saved) == 0']], '== compares where the strings live, not their letters. Use strcmp.'),
    check('How many bytes does "cat" need?', ['4', '3', '5', '1'], 'Three letters and \\0.', 'Don’t forget the end marker.', { mono: true }),
    recap([
      ['🔤', 'A string is a char array ending in \\0'],
      ['🧰', 'strlen, strcpy, strcat, strcmp from string.h'],
      ['⚠', 'Copy with strcpy; compare with strcmp'],
    ]),
  ]),

  challenge('c-i-8-ch', 'Module 8 Challenge', { icon: '🔤', name: 'String Smith' }, ['Store text in char arrays', 'Use string.h functions', 'Avoid = and == on strings'], [
    mcq(1, 'What ends every C string?', ['\\0, the zero character', 'A new line', 'A space', 'Nothing'], 'The end marker.', { mono: true }),
    mcq(2, 'strlen("Mia") is…', ['3', '4', '2', '0'], 'It doesn’t count \\0.', { mono: true }),
    mcq(3, 'How do you check two strings are equal?', ['strcmp(a, b) == 0', 'a == b', 'a = b', 'equals(a, b)'], 'Compare the letters.', { mono: true }),
    mcq(4, 'Which header has strcpy?', ['string.h', 'stdio.h', 'stdlib.h', 'ctype.h'], 'String functions.', { mono: true }),
    mcq(5, 'char w[5] can safely hold a word of up to…', ['4 letters', '5 letters', '6 letters', 'Any length'], 'One byte for \\0.'),
    swipe([
      ['C has a built-in string type', false, 'A char array.'],
      ['strcat joins one string onto another', true, 'There must be room.'],
      ['toupper is in ctype.h', true, 'With tolower and isdigit.'],
      ['scanf("%s", name) needs &name', false, 'An array’s name is already an address.'],
    ]),
    pairs([['strlen', 'Length'], ['strcpy', 'Copy'], ['strcat', 'Join'], ['strcmp', 'Compare']], 'string.h.'),
    pickCode('Which copies "Sutton" into char city[20]?', ['strcpy(city, "Sutton");', 'city = "Sutton";', 'strcpy("Sutton", city);', 'city == "Sutton";'], 'Destination first.'),
    bugTask(['char code[3] = "MUM";', 'if (code == "MUM") printf("Home\\n");'], [[1, 'code[3]', 'code[4]'], [2, 'code == "MUM"', 'strcmp(code, "MUM") == 0']], 'Room for \\0, and compare with strcmp.'),
    xray('<div class="c">$ ./strings</div><div class="a">Sutton has 6 letters</div><div class="b">TRAIN</div>', [
      ['.a', 'A count of letters', 'strlen(city)', ['strlen(city)', 'toupper(word[i])', 'strcat(msg, "Mia")']],
      ['.b', 'Capital letters', 'toupper(word[i])', ['strlen(city)', 'toupper(word[i])', 'strcat(msg, "Mia")']],
    ]),
    arrange(['#include <stdio.h>', '#include <string.h>', 'int main(void) {', '    char ticket[20] = "SEAT-";', '    strcat(ticket, "14B");', '    printf("%s\\n", ticket);', '    return 0;', '}'], 'two includes, main, the start, join, print, return, close', ['SEAT-14B']),
  ]),

  lesson('c-pointers', 'Pointers', 9, [
    chat(['Every variable lives at an address in memory. A pointer is a variable that holds an address.', '&x gives x’s address. If p holds it, *p reads or changes x through it. That is how functions change your variables and how arrays really work.']),
    compare('Pointer basics', [
      ['& and *', prog(['int seats = 40;', 'int *p = &seats;', 'printf("%d\\n", *p);', '*p = 38;', 'printf("%d\\n", seats);']), 'Change *p and you change seats.', ['40', '38']],
      ['Swap', ['#include <stdio.h>', '', 'void swap(int *a, int *b) {', '    int t = *a;', '    *a = *b;', '    *b = t;', '}', '', 'int main(void) {', '    int x = 1, y = 2;', '    swap(&x, &y);', '    printf("%d %d\\n", x, y);', '    return 0;', '}'], 'Pass addresses, and the function can change the originals.', ['2 1']],
      ['NULL', prog(['int *p = NULL;', 'if (p == NULL) printf("Points nowhere\\n");']), 'NULL means “no address yet”. Check before using *p.', ['Points nowhere']],
    ]),
    compare('Pointers and arrays', [
      ['Name is an address', prog(['int a[3] = {10, 20, 30};', 'int *p = a;', 'printf("%d %d\\n", *p, *(p + 2));']), 'a is the address of a[0]. p + 2 moves two ints along.', ['10 30']],
      ['Walk with a pointer', prog(['int a[3] = {10, 20, 30};', 'for (int *p = a; p < a + 3; p++) printf("%d\\n", *p);']), 'p++ steps to the next int.', ['10', '20', '30']],
    ]),
    reveal('Pointer words', [
      ['int *p', 'p holds the address of an int.'],
      ['&x', 'The address of x.'],
      ['*p', 'The value at that address (dereference).'],
      ['a[i]', 'is the same as *(a + i).'],
    ], { mono: true }),
    tapbug('The value never changes outside the function', ['void add_seat(int *n) {', '    n = n + 1;', '}'], [[2, 'n = n + 1;', '*n = *n + 1;']], 'Change the value at the address (*n), not the pointer itself.'),
    check('If p = &x, what does *p give?', ['The value of x', 'The address of x', 'The address of p', '0'], 'Dereference.', '* follows the address.', { mono: false }),
    recap([
      ['📍', 'A pointer holds an address: int *p = &x'],
      ['👉', '*p reads or changes the value there'],
      ['🔁', 'Pass &x so a function can change x'],
    ]),
  ]),

  challenge('c-i-9-ch', 'Module 9 Challenge', { icon: '📍', name: 'Pointer Pilot' }, ['Use & and * correctly', 'Change variables through pointers', 'Walk arrays with pointers'], [
    mcq(1, 'What does &x give?', ['The address of x', 'The value of x', 'x doubled', 'A copy of x'], 'Where x lives.', { mono: true }),
    mcq(2, 'Which declares a pointer to an int?', ['int *p;', 'int &p;', 'pointer int p;', 'int p*;'], 'A star in the declaration.', { mono: true }),
    mcq(3, 'a[2] is the same as…', ['*(a + 2)', '*a + 2', '&a + 2', 'a * 2'], 'Move, then read.', { mono: true }),
    mcq(4, 'What is NULL?', ['A pointer to nothing', 'Zero bytes of memory', 'An empty string', 'An error'], 'Check before using it.'),
    mcq(5, 'Why does swap(int *a, int *b) work but swap(int a, int b) doesn’t?', ['With pointers it changes the originals', 'Pointers are faster', 'Ints can’t be swapped', 'It does work'], 'Copies vs addresses.'),
    swipe([
      ['A pointer holds an address', true, 'Of another variable.'],
      ['Using *p when p is NULL is safe', false, 'It usually crashes.'],
      ['p + 1 moves to the next item, not the next byte', true, 'By the size of the type.'],
      ['An array’s name works like a pointer to its first item', true, 'a == &a[0].'],
    ]),
    pairs([['&x', 'Address of'], ['*p', 'Value at'], ['NULL', 'Nowhere'], ['p++', 'Next item']], 'Pointers.'),
    pickCode('Which lets triple(&n) change n?', ['void triple(int *n) { *n = *n * 3; }', 'void triple(int n) { n = n * 3; }', 'void triple(int *n) { n = n * 3; }', 'void triple(int &n) { n *= 3; }'], 'Work through the address.'),
    bugTask(['int x = 5;', 'int *p = x;', 'printf("%d\\n", p);'], [[2, 'int *p = x;', 'int *p = &x;'], [3, 'p);', '*p);']], 'Store the address, then read through it.'),
    xray('<div class="c">$ ./pointers</div><div class="a">2 1</div><div class="b">10 30</div>', [
      ['.a', 'Two values swapped', 'swap(&x, &y)', ['swap(&x, &y)', '*(p + 2)', 'p == NULL']],
      ['.b', 'First and third items', '*(p + 2)', ['swap(&x, &y)', '*(p + 2)', 'p == NULL']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    int fare = 80;', '    int *p = &fare;', '    *p += 15;', '    printf("%d\\n", fare);', '    return 0;', '}'], 'include, main, a value, a pointer to it, change through it, print, return, close', ['95']),
  ]),

  lesson('c-struct', 'Structs', 8, [
    chat(['A struct groups related values of different types under one name: a student’s name, roll number and marks.', 'Each value is a member, read with a dot. Through a pointer, use an arrow: p->marks.']),
    compare('Structs', [
      ['Define and use', ['#include <stdio.h>', '', 'struct Train {', '    int number;', '    char name[20];', '    double fare;', '};', '', 'int main(void) {', '    struct Train t = {12951, "Harbour Express", 85.5};', '    printf("%d %s %.1f\\n", t.number, t.name, t.fare);', '    return 0;', '}'], 'A dot reads each member.', ['12951 Harbour Express 85.5']],
      ['typedef', ['#include <stdio.h>', '', 'typedef struct {', '    char name[20];', '    int marks;', '} Student;', '', 'int main(void) {', '    Student s = {"Ava", 82};', '    s.marks += 5;', '    printf("%s %d\\n", s.name, s.marks);', '    return 0;', '}'], 'typedef gives the struct a short name.', ['Ava 87']],
      ['Array of structs', ['#include <stdio.h>', '', 'typedef struct {', '    char name[20];', '    int marks;', '} Student;', '', 'int main(void) {', '    Student cls[3] = {{"Ava", 82}, {"Reed", 91}, {"Zoey", 77}};', '    for (int i = 0; i < 3; i++) printf("%s: %d\\n", cls[i].name, cls[i].marks);', '    return 0;', '}'], 'A table of records.', ['Ava: 82', 'Reed: 91', 'Zoey: 77']],
    ]),
    compare('Structs and functions', [
      ['A copy', ['#include <stdio.h>', '', 'typedef struct { int marks; } Student;', '', 'void bonus(Student s) {', '    s.marks += 5;', '}', '', 'int main(void) {', '    Student s = {80};', '    bonus(s);', '    printf("%d\\n", s.marks);', '    return 0;', '}'], 'Passed by value: the original stays 80.', ['80']],
      ['A pointer and ->', ['#include <stdio.h>', '', 'typedef struct { int marks; } Student;', '', 'void bonus(Student *s) {', '    s->marks += 5;', '}', '', 'int main(void) {', '    Student s = {80};', '    bonus(&s);', '    printf("%d\\n", s.marks);', '    return 0;', '}'], 's->marks means (*s).marks.', ['85']],
    ]),
    tapbug('error: ’s’ is a pointer; did you mean to use ’->’?', ['void bonus(Student *s) {', '    s.marks += 5;', '}'], [[2, 's.marks', 's->marks']], 'Through a pointer, use -> to reach a member.'),
    check('What does p->fare mean?', ['(*p).fare: the fare of the struct p points to', 'p minus fare', 'The address of fare', 'A new struct'], 'The arrow.', 'Pointer to struct.', { mono: false }),
    recap([
      ['🧾', 'struct groups members of different types'],
      ['•', 's.member, or p->member through a pointer'],
      ['🏷', 'typedef for a short name'],
    ]),
  ]),

  challenge('c-i-10-ch', 'Module 10 Challenge', { icon: '🧾', name: 'Record Keeper' }, ['Define structs with typedef', 'Use arrays of structs', 'Change structs through pointers'], [
    mcq(1, 'How do you read the marks member of s?', ['s.marks', 's->marks', 's[marks]', 'marks(s)'], 'A dot.', { mono: true }),
    mcq(2, 'p is a pointer to a struct. How do you read its marks?', ['p->marks', 'p.marks', '*p.marks', 'p[marks]'], 'The arrow.', { mono: true }),
    mcq(3, 'What does typedef do?', ['Gives a type a new name', 'Makes a variable', 'Copies a struct', 'Frees memory'], 'A short name.', { mono: true }),
    mcq(4, 'Passing a struct to a function without a pointer…', ['Gives the function a copy', 'Shares it', 'Is an error', 'Frees it'], 'By value.'),
    mcq(5, 'Can a struct hold an array, like char name[20]?', ['Yes', 'No', 'Only with typedef', 'Only ints'], 'Members can be any type.'),
    swipe([
      ['A struct can mix ints, doubles and char arrays', true, 'That is its point.'],
      ['p->x is the same as (*p).x', true, 'Shorthand.'],
      ['Structs can be compared with ==', false, 'Compare member by member.'],
      ['You can make an array of structs', true, 'A table of records.'],
    ]),
    pairs([['struct', 'Group'], ['.', 'Member'], ['->', 'Member via pointer'], ['typedef', 'New name']], 'Structs.'),
    pickCode('Which defines a Seat with a row (int) and a letter (char)?', ['typedef struct { int row; char letter; } Seat;', 'struct Seat = { int row, char letter };', 'typedef Seat { row; letter; };', 'struct { row: int; letter: char } Seat;'], 'Types and semicolons.'),
    bugTask(['typedef struct { int marks; } Student', 'void bonus(Student *s) { s.marks += 5; }'], [[1, '} Student', '} Student;'], [2, 's.marks', 's->marks']], 'End the typedef with ;, and use -> through a pointer.'),
    xray('<div class="c">$ ./structs</div><div class="a">Ava 87</div><div class="b">85</div>', [
      ['.a', 'A changed member', 's.marks += 5 in main', ['s.marks += 5 in main', 's->marks += 5 in bonus', 'cls[i].name']],
      ['.b', 'Changed through a pointer', 's->marks += 5 in bonus', ['s.marks += 5 in main', 's->marks += 5 in bonus', 'cls[i].name']],
    ]),
    arrange(['#include <stdio.h>', 'typedef struct { char name[10]; int age; } Rider;', 'int main(void) {', '    Rider r = {"Sam", 15};', '    printf("%s is %d\\n", r.name, r.age);', '    return 0;', '}'], 'include, the struct, main, a rider, print, return, close', ['Sam is 15']),
  ]),

  lesson('c-memory', 'Dynamic memory', 9, [
    chat(['Arrays have a fixed size chosen when you write the code. When you only learn the size while the program runs, ask for memory with malloc.', 'malloc gives memory from the heap. It stays until you give it back with free. Forget free and you leak memory.']),
    compare('malloc and free', [
      ['malloc', prog(['int n = 4;', 'int *fares = malloc(n * sizeof(int));', 'if (fares == NULL) return 1;', 'for (int i = 0; i < n; i++) fares[i] = (i + 1) * 10;', 'printf("%d %d\\n", fares[0], fares[3]);', 'free(fares);'], ['stdio.h', 'stdlib.h']), 'Ask for n ints, check for NULL, use like an array, then free.', ['10 40']],
      ['calloc', prog(['int *counts = calloc(3, sizeof(int));', 'printf("%d %d %d\\n", counts[0], counts[1], counts[2]);', 'free(counts);'], ['stdio.h', 'stdlib.h']), 'calloc sets every byte to zero.', ['0 0 0']],
      ['realloc', prog(['int *a = malloc(2 * sizeof(int));', 'a[0] = 1; a[1] = 2;', 'a = realloc(a, 3 * sizeof(int));', 'a[2] = 3;', 'printf("%d %d %d\\n", a[0], a[1], a[2]);', 'free(a);'], ['stdio.h', 'stdlib.h']), 'realloc grows (or shrinks) it and keeps what was there.', ['1 2 3']],
    ]),
    reveal('Memory rules', [
      ['Stack', 'Local variables: freed automatically when the function returns.'],
      ['Heap', 'malloc’d memory: lives until you free it.'],
      ['Check NULL', 'malloc returns NULL when there is no memory left.'],
      ['After free', 'Don’t use the pointer again; set it to NULL.'],
    ]),
    tapbug('The program uses more and more memory', ['for (int i = 0; i < 1000; i++) {', '    int *tmp = malloc(100 * sizeof(int));', '    use(tmp);', '}'], [[3, 'use(tmp);', 'use(tmp); free(tmp);']], 'Free what you malloc, or every round leaks memory.'),
    check('What does free(p) do?', ['Gives p’s memory back', 'Sets *p to 0', 'Deletes the variable p', 'Makes p faster'], 'Back to the system.', 'The opposite of malloc.', { mono: false }),
    truth([
      ['malloc’d memory is freed automatically at the end of the function', false, 'Only free does that.'],
      ['calloc fills the memory with zeros', true, 'malloc doesn’t.'],
      ['You should check malloc’s result for NULL', true, 'It can fail.'],
    ]),
    recap([
      ['🧠', 'malloc(n * sizeof(T)) when the size is known only at run time'],
      ['♻', 'free every block once'],
      ['🛑', 'Check for NULL; never use memory after free'],
    ]),
  ]),

  challenge('c-i-11-ch', 'Module 11 Challenge', { icon: '🧠', name: 'Memory Manager' }, ['Ask for memory with malloc and calloc', 'Grow it with realloc', 'Free it and avoid leaks'], [
    mcq(1, 'Which header has malloc and free?', ['stdlib.h', 'stdio.h', 'string.h', 'memory.h'], 'Standard library.', { mono: true }),
    mcq(2, 'How do you ask for 10 ints?', ['malloc(10 * sizeof(int))', 'malloc(10)', 'new int[10]', 'alloc(int, 10)'], 'Bytes = count × size.', { mono: true }),
    mcq(3, 'What is a memory leak?', ['Memory you malloc’d but never freed', 'A crash', 'Reading past an array', 'A slow loop'], 'It piles up.'),
    mcq(4, 'What does malloc return when it fails?', ['NULL', '0 bytes', '-1', 'An error message'], 'Always check.', { mono: true }),
    mcq(5, 'Which keeps old values while growing a block?', ['realloc', 'malloc', 'calloc', 'free'], 'Resize.', { mono: true }),
    swipe([
      ['The heap is freed when a function returns', false, 'The stack is.'],
      ['Freeing the same pointer twice is fine', false, 'Double free is a bug.'],
      ['calloc(n, size) starts with zeros', true, 'Cleared memory.'],
      ['malloc’d memory can be used like an array', true, 'p[i].'],
    ]),
    pairs([['malloc', 'Ask'], ['calloc', 'Ask, zeroed'], ['realloc', 'Resize'], ['free', 'Give back']], 'Memory functions.'),
    pickCode('Which safely makes room for n doubles?', ['double *d = malloc(n * sizeof(double)); if (d == NULL) return 1;', 'double d[n] = malloc(n);', 'double *d = malloc(n);', 'double *d; free(d);'], 'Size each item, then check.'),
    bugTask(['int *p = malloc(5 * sizeof(int));', 'free(p);', 'p[0] = 7;'], [[3, 'p[0] = 7;', 'p = NULL;']], 'Never use memory after freeing it.'),
    xray('<div class="c">$ ./memory</div><div class="a">10 40</div><div class="b">0 0 0</div>', [
      ['.a', 'Filled after malloc', 'fares[i] = (i + 1) * 10', ['fares[i] = (i + 1) * 10', 'calloc(3, sizeof(int))', 'realloc(a, …)']],
      ['.b', 'Zeros from the start', 'calloc(3, sizeof(int))', ['fares[i] = (i + 1) * 10', 'calloc(3, sizeof(int))', 'realloc(a, …)']],
    ]),
    arrange(['#include <stdio.h>', '#include <stdlib.h>', 'int main(void) {', '    int *n = malloc(sizeof(int));', '    *n = 42;', '    printf("%d\\n", *n);', '    free(n);', '    return 0;', '}'], 'two includes, main, ask, set, print, free, return, close', ['42']),
  ]),

  lesson('c-files', 'Files', 8, [
    chat(['Variables vanish when a program ends. Files keep data: a log, saved scores, a list of bookings.', 'fopen opens a file and gives a FILE pointer. Write with fprintf, read with fgets or fscanf, and always fclose.']),
    compare('Write, then read', [
      ['Write', prog(['FILE *f = fopen("orders.txt", "w");', 'if (f == NULL) return 1;', 'fprintf(f, "Tea 2\\n");', 'fprintf(f, "Toast 1\\n");', 'fclose(f);', 'printf("Saved\\n");']), '"w" makes the file (or empties it). fprintf writes like printf.', ['Saved']],
      ['Read lines', prog(['FILE *f = fopen("orders.txt", "w");', 'fprintf(f, "Tea 2\\nToast 1\\n");', 'fclose(f);', 'char line[50];', 'f = fopen("orders.txt", "r");', 'while (fgets(line, sizeof line, f)) printf("> %s", line);', 'fclose(f);']), 'fgets reads one line (with its \\n) until the end of the file.', ['> Tea 2', '> Toast 1']],
      ['Append', prog(['FILE *f = fopen("log.txt", "w");', 'fprintf(f, "open\\n");', 'fclose(f);', 'f = fopen("log.txt", "a");', 'fprintf(f, "close\\n");', 'fclose(f);', 'char w[20];', 'f = fopen("log.txt", "r");', 'while (fscanf(f, "%19s", w) == 1) printf("%s\\n", w);', 'fclose(f);']), '"a" adds to the end; fscanf reads values.', ['open', 'close']],
    ]),
    reveal('File modes', [
      ['"r"', 'Read. Fails (NULL) if the file doesn’t exist.'],
      ['"w"', 'Write. Creates or empties the file.'],
      ['"a"', 'Append. Adds to the end.'],
      ['fclose', 'Saves everything and frees the file.'],
    ], { mono: true }),
    tapbug('It crashes when the file is missing', ['FILE *f = fopen("prices.txt", "r");', 'fgets(line, 50, f);'], [[1, 'fopen("prices.txt", "r");', 'fopen("prices.txt", "r"); if (f == NULL) return 1;']], 'fopen returns NULL when it can’t open the file. Check before reading.'),
    check('Which mode keeps what is already in a file and adds to it?', ['"a"', '"w"', '"r"', '"x"'], 'Append.', '"w" empties it.', { mono: true }),
    recap([
      ['📂', 'fopen(name, mode) → FILE *, or NULL'],
      ['✍', 'fprintf to write; fgets or fscanf to read'],
      ['🔒', 'Always fclose'],
    ]),
  ]),

  challenge('c-i-12-ch', 'Module 12 Challenge', { icon: '📂', name: 'File Keeper' }, ['Open files in the right mode', 'Write and read text', 'Check for NULL and close files'], [
    mcq(1, 'What does fopen return if it fails?', ['NULL', '0 lines', 'An empty file', '-1'], 'Check it.', { mono: true }),
    mcq(2, 'Which mode empties a file before writing?', ['"w"', '"a"', '"r"', '"r+"'], 'Write.', { mono: true }),
    mcq(3, 'Which writes formatted text to a file?', ['fprintf', 'printf', 'fputs only', 'write'], 'f for file.', { mono: true }),
    mcq(4, 'What does fgets return at the end of the file?', ['NULL', 'An empty string', '0', 'EOF text'], 'The loop stops.', { mono: true }),
    mcq(5, 'Why call fclose?', ['To save buffered data and free the file', 'To delete it', 'To read it', 'It is optional'], 'Always close.'),
    swipe([
      ['"r" creates the file if it is missing', false, 'It returns NULL.'],
      ['fgets keeps the \\n at the end of the line', true, 'Unless the line was too long.'],
      ['"a" writes at the end of the file', true, 'Append.'],
      ['A FILE * is the file’s contents', false, 'A handle to it.'],
    ]),
    pairs([['"r"', 'Read'], ['"w"', 'Write fresh'], ['"a"', 'Add to end'], ['fclose', 'Finish']], 'Files.'),
    pickCode('Which reads a file line by line?', ['while (fgets(line, sizeof line, f)) { … }', 'while (fprintf(f, line)) { … }', 'for (line in f) { … }', 'fgets(f);'], 'Until NULL.'),
    bugTask(['FILE *f = fopen("log.txt", "r");', 'fprintf(f, "done\\n");'], [[1, '"r"', '"a"']], 'You can’t write to a file opened for reading. Open it to append.'),
    xray('<div class="c">$ ./files</div><div class="a">&gt; Tea 2</div><div class="b">close</div>', [
      ['.a', 'A line read back', 'fgets(line, sizeof line, f)', ['fgets(line, sizeof line, f)', 'fopen("log.txt", "a")', 'fopen("orders.txt", "w")']],
      ['.b', 'Added to the end', 'fopen("log.txt", "a")', ['fgets(line, sizeof line, f)', 'fopen("log.txt", "a")', 'fopen("orders.txt", "w")']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    FILE *f = fopen("note.txt", "w");', '    fprintf(f, "Platform 4\\n");', '    fclose(f);', '    printf("Written\\n");', '    return 0;', '}'], 'include, main, open, write, close, confirm, return, close', ['Written']),
  ]),
];
