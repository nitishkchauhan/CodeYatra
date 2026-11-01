// C · Modules 1–6 (Basic): first programs, variables and types, operators and input, decisions, loops, and
// functions. Each module’s first lesson keeps its old id. Every program is compiled with gcc in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, chat, compare, explore, matchUp, mcq, pairs, recap, reveal, swipe, tapbug, track, truth, xray } from './kit';

const { lesson, challenge, check, pickCode } = track('c', 'c');

/** A complete C program around body lines. */
const prog = (body: string[], includes = ['stdio.h']): string[] => [...includes.map((h) => `#include <${h}>`), '', 'int main(void) {', ...body.map((l) => `    ${l}`), '    return 0;', '}'];

export const C_M1: Lesson[] = [
  lesson('c-hello', 'Hello, C', 7, [
    chat(['C is one of the most important languages ever made. Operating systems, databases, phone chips and Python itself are written in C.', 'It is fast and close to the hardware: you manage memory yourself. Learning it shows how computers really work.']),
    explore('Your first C program', prog(['printf("Hello, C!\\n");']), [
      [1, '#include brings in a library: stdio.h has printf.'],
      [3, 'Every C program starts in main.'],
      [4, 'printf prints. \\n starts a new line. Statements end with ;'],
      [5, 'return 0 tells the system it finished without errors.'],
    ]),
    reveal('From code to running program', [
      ['Write', 'Save the code as hello.c.'],
      ['Compile', 'gcc hello.c -o hello turns it into a program the computer runs.'],
      ['Run', './hello (or hello.exe on Windows).'],
      ['Warnings', 'gcc -Wall shows likely mistakes. Read them.'],
    ], { mono: true }),
    compare('printf and new lines', [
      ['Two lines', prog(['printf("Rosa’s Café\\n");', 'printf("Open 8 to 9\\n");']), 'Each \\n ends a line.', ['Rosa’s Café', 'Open 8 to 9']],
      ['No \\n', prog(['printf("Rosa’s Café");', 'printf("Open 8 to 9\\n");']), 'printf never adds a new line by itself.', ['Rosa’s CaféOpen 8 to 9']],
    ]),
    tapbug('error: expected ’;’ before ’return’', ['printf("Hello")', 'return 0;'], [[1, 'printf("Hello")', 'printf("Hello\\n");']], 'Every statement ends with a semicolon.'),
    check('Where does a C program start running?', ['In main', 'On the first line', 'In printf', 'In stdio.h'], 'Always main.', 'Which function is special?'),
    recap([
      ['🧱', 'C is fast and close to the hardware'],
      ['▶', 'Write, compile with gcc, run'],
      ['🖨', 'printf prints; \\n ends a line; ; ends a statement'],
    ]),
  ]),

  lesson('c-b-1-2', 'Comments and printf formats', 7, [
    compare('Placeholders fill in values', [
      ['%d and %s', prog(['printf("%s has %d seats\\n", "Harbour Express", 40);']), '%d for an int, %s for text, in order.', ['Harbour Express has 40 seats']],
      ['%f and %.2f', prog(['printf("%f\\n", 4.5);', 'printf("%.2f\\n", 4.5);']), '%f prints 6 decimals; %.2f prints 2.', ['4.500000', '4.50']],
      ['%c and %%', prog(['printf("Grade %c, 95%%\\n", \'A\');']), '%c for one character; %% prints a percent sign.', ['Grade A, 95%']],
    ]),
    explore('Comments', ['// One line comment', '/* A comment that', '   spans lines */', 'printf("Hi\\n"); // after code'], [
      [1, '// to the end of the line.'],
      [2, '/* … */ can cover many lines.'],
      [4, 'Comments explain why; the compiler ignores them.'],
    ]),
    matchUp('Which placeholder?', [['An int', '%d'], ['Text (a string)', '%s'], ['A decimal number', '%f'], ['One character', '%c']], 'printf formats.'),
    tapbug('It prints a strange number instead of the price', ['printf("%d\\n", 4.5);'], [[1, '%d', '%.1f']], 'Use %f (or %.1f) for decimal numbers; %d is for whole numbers.'),
    check('What does printf("%.1f\\n", 2.25) print?', ['2.2 or 2.3, rounded to one decimal', '2.25', '2', '%.1f'], 'One digit after the point.', 'What does .1 mean?', { mono: false }),
    recap([
      ['🔤', '%d int, %s text, %f decimal, %c character'],
      ['🎯', '%.2f for two decimals; %% for %'],
      ['💬', '// and /* */ comments'],
    ]),
  ]),

  challenge('c-b-1-ch', 'Module 1 Challenge', { icon: '🧱', name: 'C Starter' }, ['Write and compile a C program', 'Print with printf', 'Comment code'], [
    mcq(1, 'Which line lets you use printf?', ['#include <stdio.h>', '#include <printf>', 'import stdio', 'using stdio;'], 'Standard input/output.', { mono: true }),
    mcq(2, 'Which command compiles hello.c?', ['gcc hello.c -o hello', 'run hello.c', 'python hello.c', 'c hello'], 'gcc makes a program.', { mono: true }),
    mcq(3, 'What does \\n do in printf?', ['Starts a new line', 'Prints n', 'Ends the program', 'Nothing'], 'Newline.', { mono: true }),
    mcq(4, 'Which placeholder prints an int?', ['%d', '%s', '%f', '%c'], 'd for decimal integer.', { mono: true }),
    mcq(5, 'What does return 0 in main mean?', ['The program finished without errors', 'Print 0', 'Restart', 'Return to line 0'], 'Exit status.'),
    swipe([
      ['C is compiled before it runs', true, 'With gcc.'],
      ['printf adds a new line automatically', false, 'Use \\n.'],
      ['Statements end with a semicolon', true, 'Always.'],
      ['Comments change how the program runs', false, 'The compiler ignores them.'],
    ]),
    pairs([['%d', 'int'], ['%s', 'text'], ['%f', 'decimal'], ['%c', 'character']], 'printf formats.'),
    pickCode('Which prints “Seats: 12” and a new line?', ['printf("Seats: %d\\n", 12);', 'printf("Seats: %s\\n", 12);', 'print("Seats: 12")', 'printf(Seats: 12);'], '%d for the number.'),
    bugTask(['#include <stdio.h>', 'int main(void) {', '    printf("Hi\\n")', '    return 0', '}'], [[3, 'printf("Hi\\n")', 'printf("Hi\\n");'], [4, 'return 0', 'return 0;']], 'Semicolons after each statement.'),
    xray('<div class="c">$ ./hello</div><div class="a">Harbour Express has 40 seats</div><div class="b">4.50</div>', [
      ['.a', 'A sentence with a number', 'printf("%s has %d seats\\n", …)', ['printf("%s has %d seats\\n", …)', 'printf("%.2f\\n", 4.5)', 'return 0']],
      ['.b', 'Two decimals', 'printf("%.2f\\n", 4.5)', ['printf("%s has %d seats\\n", …)', 'printf("%.2f\\n", 4.5)', 'return 0']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    printf("Rosa’s Café\\n");', '    return 0;', '}'], 'include, main, print, return, close', ['Rosa’s Café']),
  ]),

  lesson('c-vars', 'Variables and types', 8, [
    chat(['A variable is a named box in memory. In C you must say what type of value it holds, and the type never changes.', 'int for whole numbers, double (or float) for decimals, char for one character.']),
    compare('Types', [
      ['int, double, char', prog(['int seats = 40;', 'double fare = 85.5;', "char grade = 'A';", 'printf("%d %.1f %c\\n", seats, fare, grade);']), 'Each type has its own placeholder.', ['40 85.5 A']],
      ['sizeof', prog(['printf("%zu %zu %zu\\n", sizeof(char), sizeof(int), sizeof(double));']), 'How many bytes each type uses (on most computers).', ['1 4 8']],
      ['Integer division', prog(['int a = 7, b = 2;', 'printf("%d %.1f\\n", a / b, (double)a / b);']), 'int / int drops the decimals. Cast to double to keep them.', ['3 3.5']],
    ]),
    reveal('More about types', [
      ['const', 'const int MAX_SEATS = 40; can’t be changed.'],
      ['Overflow', 'An int holds about ±2.1 billion; past that it wraps around.'],
      ['Uninitialised', 'int x; holds rubbish until you set it.'],
      ['Booleans', '#include <stdbool.h> gives bool, true and false.'],
    ], { mono: true }),
    tapbug('The average shows 2 instead of 2.5', ['int total = 5, count = 2;', 'double avg = total / count;'], [[2, 'total / count', '(double)total / count']], 'int / int is done in whole numbers. Cast one side to double first.'),
    check('What is 9 / 2 in C when both are int?', ['4', '4.5', '5', 'An error'], 'Decimals are dropped.', 'Integer division.', { mono: true }),
    recap([
      ['📦', 'Variables have a fixed type: int, double, char'],
      ['➗', 'int / int drops decimals; cast to double'],
      ['🔒', 'const for values that never change'],
    ]),
  ]),

  challenge('c-b-2-ch', 'Module 2 Challenge', { icon: '📦', name: 'Type Keeper' }, ['Declare variables with the right type', 'Print each type', 'Avoid integer-division surprises'], [
    mcq(1, 'Which type holds 85.5?', ['double', 'int', 'char', 'bool'], 'A decimal.', { mono: true }),
    mcq(2, 'Which holds one letter?', ['char', 'string', 'int', 'letter'], "Single quotes: 'A'.", { mono: true }),
    mcq(3, '(double)7 / 2 is…', ['3.5', '3', '4', '3.0'], 'One side is a double.', { mono: true }),
    mcq(4, 'What does const do?', ['Stops the value being changed', 'Makes it faster', 'Makes it global', 'Rounds it'], 'Read-only.', { mono: true }),
    mcq(5, 'What is in int x; before you set it?', ['Rubbish (an unpredictable value)', '0 always', 'NULL', 'An error'], 'Always initialise.'),
    swipe([
      ['A C variable can change type later', false, 'Fixed at declaration.'],
      ['sizeof(int) is often 4 bytes', true, 'On most computers.'],
      ['char uses double quotes', false, "Single: 'A'."],
      ['stdbool.h gives true and false', true, 'Since C99.'],
    ]),
    pairs([['int', 'Whole number'], ['double', 'Decimal'], ['char', 'One character'], ['const', 'Can’t change']], 'Types.'),
    pickCode('Which prints 2.5 for 5 / 2?', ['printf("%.1f\\n", 5 / 2.0);', 'printf("%d\\n", 5 / 2);', 'printf("%.1f\\n", 5 / 2);', 'printf("%f\\n", 5 % 2);'], 'Make one side a double.'),
    bugTask(['int price = 85.5;', 'char grade = "A";'], [[1, 'int price = 85.5;', 'double price = 85.5;'], [2, '"A"', "'A'"]], 'Decimals need double; a char uses single quotes.'),
    xray('<div class="c">$ ./types</div><div class="a">40 85.5 A</div><div class="b">3 3.5</div>', [
      ['.a', 'Three types printed', 'printf("%d %.1f %c\\n", …)', ['printf("%d %.1f %c\\n", …)', '(double)a / b', 'sizeof(int)']],
      ['.b', '3.5 with decimals kept', '(double)a / b', ['printf("%d %.1f %c\\n", …)', '(double)a / b', 'sizeof(int)']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    double fare = 85.5;', '    printf("%.1f\\n", fare * 2);', '    return 0;', '}'], 'include, main, a double, print it doubled, return, close', ['171.0']),
  ]),

  lesson('c-ops', 'Operators and input', 8, [
    compare('Operators', [
      ['Arithmetic', prog(['int a = 17, b = 5;', 'printf("%d %d %d %d %d\\n", a + b, a - b, a * b, a / b, a % b);']), '% is the remainder.', ['22 12 85 3 2']],
      ['Increment', prog(['int n = 5;', 'n++;', 'n += 10;', 'printf("%d\\n", n);']), 'n++ adds 1; += adds and stores.', ['16']],
      ['Comparison and logic', prog(['int age = 15;', 'printf("%d %d %d\\n", age >= 18, age > 12 && age < 20, !(age == 15));']), 'True is 1, false is 0. && and, || or, ! not.', ['0 1 0']],
    ]),
    explore('Reading input with scanf', prog(['int seats;', 'printf("How many seats? ");', 'scanf("%d", &seats);', 'printf("Booking %d seats\\n", seats);']), [
      [4, 'A box for the number the user types.'],
      [6, 'scanf reads typed input with the same placeholders. The & gives scanf the variable’s address, so it can fill it.'],
      [7, 'Then use the value.'],
    ], { intro: 'This program waits for typing, so it is shown, not run.' }),
    tapbug('The program crashes after typing a number', ['int seats;', 'scanf("%d", seats);'], [[2, 'seats);', '&seats);']], 'scanf needs the address of the variable: &seats.'),
    check('What is 17 % 5?', ['2', '3', '3.4', '85'], 'The remainder.', '17 = 3 × 5 + ?', { mono: true }),
    truth([
      ['In C, true is 1 and false is 0', true, 'Comparisons give 1 or 0.'],
      ['&& means “or”', false, '&& is and; || is or.'],
      ['n++ adds one to n', true, 'Increment.'],
    ]),
    recap([
      ['➕', '+ − * / % and ++, +='],
      ['⚖', 'Comparisons give 1 or 0; && || !'],
      ['⌨', 'scanf("%d", &x) reads input into x'],
    ]),
  ]),

  challenge('c-b-3-ch', 'Module 3 Challenge', { icon: '➕', name: 'Operator Pro' }, ['Calculate with operators', 'Combine conditions', 'Read input with scanf'], [
    mcq(1, 'What is 20 % 6?', ['2', '3', '3.33', '0'], 'Remainder.', { mono: true }),
    mcq(2, 'Which means “and”?', ['&&', '||', '&', 'and'], '|| is or.', { mono: true }),
    mcq(3, 'What does scanf("%d", &n) need the & for?', ['To give scanf where n lives, so it can fill it', 'To print n', 'To add n', 'Nothing'], 'An address.'),
    mcq(4, 'After int x = 3; x += 4; x is…', ['7', '4', '3', '34'], 'Add and store.', { mono: true }),
    mcq(5, 'What does 5 > 3 give in C?', ['1', 'true', '5', '0'], 'True is 1.', { mono: true }),
    swipe([
      ['% gives the remainder', true, 'Modulo.'],
      ['! turns 1 into 0', true, 'Not.'],
      ['scanf can read without &', false, 'Needs the address (except strings).'],
      ['x++ subtracts one', false, 'Adds one.'],
    ]),
    pairs([['%', 'Remainder'], ['&&', 'And'], ['||', 'Or'], ['&x', 'Address of x']], 'Operators.'),
    pickCode('Which checks an age between 13 and 19?', ['age >= 13 && age <= 19', 'age >= 13 || age <= 19', '13 <= age <= 19', 'age between 13, 19'], 'Both must be true.'),
    bugTask(['int n;', 'scanf("%d", n);', 'if (n > 0 & n < 10) printf("ok\\n");'], [[2, 'n);', '&n);'], [3, 'n > 0 & n < 10', 'n > 0 && n < 10']], 'Pass the address, and use && for logic.'),
    xray('<div class="c">$ ./ops</div><div class="a">22 12 85 3 2</div><div class="b">16</div>', [
      ['.a', 'Five results', 'a + b, a - b, a * b, a / b, a % b', ['a + b, a - b, a * b, a / b, a % b', 'n++; n += 10;', 'scanf']],
      ['.b', '5 + 1 + 10', 'n++; n += 10;', ['a + b, a - b, a * b, a / b, a % b', 'n++; n += 10;', 'scanf']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    int cups = 23;', '    printf("%d boxes, %d left\\n", cups / 6, cups % 6);', '    return 0;', '}'], 'include, main, the count, boxes and leftovers, return, close', ['3 boxes, 5 left']),
  ]),

  lesson('c-if', 'Decisions: if, else and switch', 8, [
    compare('Choosing what to run', [
      ['if / else if / else', prog(['int age = 15;', 'if (age < 5) {', '    printf("Free\\n");', '} else if (age < 18) {', '    printf("Child fare\\n");', '} else {', '    printf("Adult fare\\n");', '}']), 'The first true condition wins.', ['Child fare']],
      ['switch', prog(['char size = \'M\';', 'switch (size) {', "    case 'S': printf(\"Small\\n\"); break;", "    case 'M': printf(\"Medium\\n\"); break;", '    default: printf("Large\\n");', '}']), 'Jump to the matching case; break leaves the switch.', ['Medium']],
      ['Ternary', prog(['int seats = 0;', 'printf("%s\\n", seats > 0 ? "Open" : "Full");']), 'condition ? yes : no.', ['Full']],
    ]),
    compare('Forgetting break', [
      ['With break', prog(['int day = 2;', 'switch (day) {', '    case 1: printf("Mon\\n"); break;', '    case 2: printf("Tue\\n"); break;', '    case 3: printf("Wed\\n"); break;', '}']), 'Only the matching case.', ['Tue']],
      ['Without break', prog(['int day = 2;', 'switch (day) {', '    case 1: printf("Mon\\n");', '    case 2: printf("Tue\\n");', '    case 3: printf("Wed\\n");', '}']), 'It falls through into the next cases.', ['Tue', 'Wed']],
    ]),
    tapbug('Every booking is free', ['if (age = 0) {'], [[1, 'age = 0', 'age == 0']], '= assigns; == compares. gcc -Wall warns about this.'),
    check('In a switch, what does break do?', ['Leaves the switch', 'Ends the program', 'Skips to the next case', 'Nothing'], 'Without it, cases fall through.', 'Where does it jump?'),
    truth([
      ['Any non-zero number counts as true in an if', true, 'Only 0 is false.'],
      ['else if runs even when an earlier test was true', false, 'Only the first true branch runs.'],
      ['default in a switch is optional', true, 'Like a final else.'],
    ]),
    recap([
      ['🔀', 'if / else if / else: the first true wins'],
      ['🎛', 'switch with case and break'],
      ['⚠', '== compares; = assigns'],
    ]),
  ]),

  challenge('c-b-4-ch', 'Module 4 Challenge', { icon: '🔀', name: 'Decision Maker' }, ['Write if-else chains', 'Use switch with break', 'Avoid = vs == mistakes'], [
    mcq(1, 'Which compares two values?', ['==', '=', '===', ':='], '= assigns.', { mono: true }),
    mcq(2, 'What happens without break in a switch case?', ['It falls through to the next case', 'An error', 'It stops', 'It repeats'], 'Fall-through.'),
    mcq(3, 'What does default do in a switch?', ['Runs when no case matches', 'Runs first', 'Ends the switch', 'Nothing'], 'Like else.', { mono: true }),
    mcq(4, 'x > 0 ? "yes" : "no" with x = 3 gives…', ['"yes"', '"no"', '3', '1'], 'Ternary.', { mono: true }),
    mcq(5, 'Can switch work on text strings in C?', ['No: only whole-number types like int and char', 'Yes', 'Only with break', 'Only in C++'], 'Use if with strcmp.'),
    swipe([
      ['In an if-else chain, only one branch runs', true, 'The first true.'],
      ['if (x = 5) compares x with 5', false, 'It assigns 5.'],
      ['switch can use char cases', true, "case 'S':"],
      ['Braces are needed for a one-line if', false, 'Optional, but clearer.'],
    ]),
    pairs([['if', 'Test'], ['else if', 'Next test'], ['switch', 'Pick a case'], ['break', 'Leave']], 'Decisions.'),
    pickCode('Which prints Adult for age 30?', ['if (age >= 18) printf("Adult\\n");', 'if (age => 18) printf("Adult\\n");', 'if age >= 18: printf("Adult\\n");', 'if (age = 18) printf("Adult\\n");'], 'Brackets, >=.'),
    bugTask(['switch (size) {', "    case 'S': printf(\"Small\\n\");", "    case 'M': printf(\"Medium\\n\");"], [[2, 'printf("Small\\n");', 'printf("Small\\n"); break;'], [3, 'printf("Medium\\n");', 'printf("Medium\\n"); break;']], 'Add break so cases don’t fall through.'),
    xray('<div class="c">$ ./fare</div><div class="a">Child fare</div><div class="b">Full</div>', [
      ['.a', 'The fare chosen', 'else if (age < 18)', ['else if (age < 18)', 'seats > 0 ? "Open" : "Full"', 'default:']],
      ['.b', 'No seats', 'seats > 0 ? "Open" : "Full"', ['else if (age < 18)', 'seats > 0 ? "Open" : "Full"', 'default:']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    int age = 70;', '    printf("%s\\n", age >= 60 ? "Senior" : "Adult");', '    return 0;', '}'], 'include, main, the age, choose and print, return, close', ['Senior']),
  ]),

  lesson('c-loops', 'Loops', 8, [
    compare('Three loops', [
      ['for', prog(['for (int i = 1; i <= 3; i++) {', '    printf("Seat %d\\n", i);', '}']), 'Start; keep going while; step.', ['Seat 1', 'Seat 2', 'Seat 3']],
      ['while', prog(['int cups = 3;', 'while (cups > 0) {', '    printf("%d left\\n", cups);', '    cups--;', '}']), 'Checks first, then runs.', ['3 left', '2 left', '1 left']],
      ['do while', prog(['int n = 10;', 'do {', '    printf("Runs once: %d\\n", n);', '} while (n < 5);']), 'Runs at least once, then checks.', ['Runs once: 10']],
    ]),
    compare('break and continue', [
      ['continue', prog(['for (int i = 1; i <= 5; i++) {', '    if (i % 2 == 0) continue;', '    printf("%d\\n", i);', '}']), 'Skip to the next round.', ['1', '3', '5']],
      ['break', prog(['for (int i = 1; i <= 10; i++) {', '    if (i == 4) break;', '    printf("%d\\n", i);', '}']), 'Leave the loop.', ['1', '2', '3']],
      ['Nested', prog(['for (int r = 1; r <= 2; r++) {', '    for (int c = 1; c <= 3; c++) printf("%d%c%s", r, \'A\' + c - 1, c < 3 ? " " : "\\n");', '}']), 'A loop inside a loop: rows and seats.', ['1A 1B 1C', '2A 2B 2C']],
    ]),
    tapbug('The loop never ends', ['int i = 0;', 'while (i < 5) {', '    printf("%d\\n", i);', '}'], [[3, 'printf("%d\\n", i);', 'printf("%d\\n", i); i++;']], 'Change the loop variable, or the condition stays true forever.'),
    check('Which loop always runs at least once?', ['do while', 'while', 'for', 'None'], 'It checks at the end.', 'Where is the test?', { mono: true }),
    matchUp('Which loop fits?', [['Count from 1 to 10', 'for'], ['Repeat until the cups run out', 'while'], ['Ask once, then repeat if the answer is wrong', 'do while']], 'Pick the loop by how it stops.'),
    recap([
      ['🔁', 'for, while, do while'],
      ['⏭', 'continue skips; break leaves'],
      ['♾', 'Make sure the condition becomes false'],
    ]),
  ]),

  challenge('c-b-5-ch', 'Module 5 Challenge', { icon: '🔁', name: 'Loop Runner' }, ['Write for and while loops', 'Use break and continue', 'Avoid endless loops'], [
    mcq(1, 'How many times does for (int i = 0; i < 4; i++) run?', ['4', '3', '5', 'Forever'], '0, 1, 2, 3.', { mono: true }),
    mcq(2, 'What does continue do?', ['Skips to the next round', 'Leaves the loop', 'Ends the program', 'Restarts the loop'], 'break leaves.', { mono: true }),
    mcq(3, 'A while loop checks its condition…', ['Before each round', 'After each round', 'Once', 'Never'], 'do while checks after.'),
    mcq(4, 'What causes an endless loop?', ['A condition that never becomes false', 'A break', 'A for loop', 'printf'], 'Change the variable.'),
    mcq(5, 'Nested loops over 3 rows and 4 seats run the inner body…', ['12 times', '7 times', '4 times', '3 times'], '3 × 4.'),
    swipe([
      ['for has three parts: start; condition; step', true, 'For counting.'],
      ['do while may run zero times', false, 'At least once.'],
      ['break leaves only the innermost loop', true, 'The one it is in.'],
      ['i++ inside a for header runs before the body', false, 'After each round.'],
    ]),
    pairs([['for', 'Counting'], ['while', 'Until false'], ['do while', 'At least once'], ['break', 'Leave']], 'Loops.'),
    pickCode('Which prints 10, 8, 6, 4, 2?', ['for (int i = 10; i > 0; i -= 2) printf("%d\\n", i);', 'for (int i = 10; i > 0; i++) printf("%d\\n", i);', 'for (i = 10; i < 0; i -= 2)', 'while (10 > 0) printf("%d\\n", i);'], 'Count down by 2.'),
    bugTask(['for (int i = 0; i < 5; i--) {', '    printf("%d\\n", i);', '}'], [[1, 'i--', 'i++']], 'Step towards the end, not away from it.'),
    xray('<div class="c">$ ./seats</div><div class="a">1A 1B 1C</div><div class="b">2A 2B 2C</div>', [
      ['.a', 'Row 1', 'The outer loop, r = 1', ['The outer loop, r = 1', 'The outer loop, r = 2', 'continue']],
      ['.b', 'Row 2', 'The outer loop, r = 2', ['The outer loop, r = 1', 'The outer loop, r = 2', 'continue']],
    ]),
    arrange(['#include <stdio.h>', 'int main(void) {', '    int total = 0;', '    for (int i = 1; i <= 4; i++) total += i;', '    printf("%d\\n", total);', '    return 0;', '}'], 'include, main, start at 0, add 1 to 4, print, return, close', ['10']),
  ]),

  lesson('c-func', 'Functions', 8, [
    chat(['A function is a named block of code you can call again and again. It takes parameters and can return a value.', 'In C you say the return type and each parameter’s type. A function must be declared before it is used.']),
    compare('Writing functions', [
      ['Return a value', ['#include <stdio.h>', '', 'double with_tax(double price) {', '    return price * 1.05;', '}', '', 'int main(void) {', '    printf("%.2f\\n", with_tax(80));', '    return 0;', '}'], 'double in, double out.', ['84.00']],
      ['void', ['#include <stdio.h>', '', 'void greet(const char *name) {', '    printf("Welcome, %s!\\n", name);', '}', '', 'int main(void) {', '    greet("Sam");', '    greet("Mia");', '    return 0;', '}'], 'void: returns nothing.', ['Welcome, Sam!', 'Welcome, Mia!']],
      ['Prototype first', ['#include <stdio.h>', '', 'int square(int n);', '', 'int main(void) {', '    printf("%d\\n", square(9));', '    return 0;', '}', '', 'int square(int n) {', '    return n * n;', '}'], 'Declare it at the top; define it below main.', ['81']],
    ]),
    compare('Passing by value', [
      ['A copy', ['#include <stdio.h>', '', 'void add_one(int n) {', '    n = n + 1;', '}', '', 'int main(void) {', '    int seats = 5;', '    add_one(seats);', '    printf("%d\\n", seats);', '    return 0;', '}'], 'The function changes its own copy: seats is still 5. Pointers (module 9) change the original.', ['5']],
      ['Return it', ['#include <stdio.h>', '', 'int add_one(int n) {', '    return n + 1;', '}', '', 'int main(void) {', '    int seats = 5;', '    seats = add_one(seats);', '    printf("%d\\n", seats);', '    return 0;', '}'], 'Return the new value and store it.', ['6']],
    ]),
    tapbug('error: too few arguments to function ’add’', ['int add(int a, int b) { return a + b; }', 'printf("%d\\n", add(2));'], [[2, 'add(2)', 'add(2, 3)']], 'Pass one argument for each parameter, in order.'),
    check('What does void mean as a return type?', ['The function returns nothing', 'It returns 0', 'It returns any type', 'It is empty'], 'No value.', 'What comes back?', { mono: false }),
    recap([
      ['🧩', 'type name(params) { … return …; }'],
      ['📝', 'Declare (prototype) before use'],
      ['📋', 'Arguments are copies: pass by value'],
    ]),
  ]),

  challenge('c-b-6-ch', 'Module 6 Challenge', { icon: '🧩', name: 'Function Builder' }, ['Write functions with parameters and returns', 'Use prototypes', 'Understand pass by value'], [
    mcq(1, 'Which declares a function that takes an int and returns an int?', ['int twice(int n);', 'twice(int n) int;', 'function twice(n)', 'int twice;'], 'Return type first.', { mono: true }),
    mcq(2, 'What does a prototype do?', ['Tells the compiler a function exists before it is defined', 'Runs the function', 'Copies it', 'Deletes it'], 'Declare early.'),
    mcq(3, 'C passes ints to functions…', ['By value: a copy', 'By reference', 'As text', 'Not at all'], 'Copies.'),
    mcq(4, 'A void function…', ['Returns nothing', 'Returns 0', 'Can’t have parameters', 'Is empty'], 'No return value.'),
    mcq(5, 'How can a function change a caller’s variable?', ['Take a pointer to it (module 9)', 'Use a copy', 'Return void', 'It can’t ever'], 'Its address.'),
    swipe([
      ['A function can call another function', true, 'And itself: recursion.'],
      ['Parameters need types in C', true, 'int n.'],
      ['return ends the function', true, 'With a value.'],
      ['Changing a parameter changes the caller’s variable', false, 'Only the copy.'],
    ]),
    pairs([['Prototype', 'Declare'], ['Parameter', 'Input'], ['return', 'Output'], ['void', 'No value']], 'Functions.'),
    pickCode('Which function returns the bigger of two ints?', ['int max2(int a, int b) { return a > b ? a : b; }', 'max2(a, b) { return a > b; }', 'int max2(a, b) { a > b; }', 'void max2(int a, int b) { return a; }'], 'Types and a return.'),
    bugTask(['double area(double r) {', '    double a = 3.14159 * r * r;', '}'], [[2, '    double a = 3.14159 * r * r;', '    return 3.14159 * r * r;']], 'A non-void function must return its value.'),
    xray('<div class="c">$ ./funcs</div><div class="a">84.00</div><div class="b">Welcome, Sam!</div>', [
      ['.a', 'Price with tax', 'with_tax(80)', ['with_tax(80)', 'greet("Sam")', 'square(9)']],
      ['.b', 'A greeting', 'greet("Sam")', ['with_tax(80)', 'greet("Sam")', 'square(9)']],
    ]),
    arrange(['#include <stdio.h>', 'int cube(int n) { return n * n * n; }', 'int main(void) {', '    printf("%d\\n", cube(3));', '    return 0;', '}'], 'include, the function, main, call it, return, close', ['27']),
  ]),
];
