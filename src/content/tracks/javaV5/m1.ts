// Java · Modules 1–6 (Basic): first programs, variables and types, operators and input, decisions, loops and
// methods. Each module’s first lesson keeps its old id. Snippets without a class run inside main (tests wrap them
// in class Main, as the first lesson explains); every program is compiled and run with Java 17 in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, chat, compare, explore, matchUp, mcq, pairs, recap, reveal, swipe, tapbug, track, truth, xray } from '../cV5/kit';

const { lesson, challenge, check, pickCode } = track('java', 'java');

/** A whole program: class Main with main around the body lines. */
const full = (body: string[]): string[] => ['public class Main {', '    public static void main(String[] args) {', ...body.map((l) => `        ${l}`), '    }', '}'];

export const JAVA_M1: Lesson[] = [
  lesson('jv-hello', 'Hello, Java', 7, [
    chat(['Java runs on billions of devices: Android apps, bank systems, big websites’ servers. It is also the most asked-for language in campus placements.', 'Java code always lives inside a class, and every program starts in a method called main.']),
    explore('Your first Java program', full(['System.out.println("Hello, Java!");']), [
      [1, 'Everything sits in a class. The file is named after it: Main.java.'],
      [2, 'main is where the program starts. Copy this line as it is for now.'],
      [3, 'System.out.println prints a line. Statements end with ;'],
      [5, 'Braces open and close every block.'],
    ]),
    reveal('From code to running program', [
      ['Write', 'Save it as Main.java.'],
      ['Compile', 'javac Main.java makes Main.class (bytecode).'],
      ['Run', 'java Main runs it on the Java Virtual Machine (JVM).'],
      ['Shortcut', 'java Main.java compiles and runs in one step.'],
    ], { mono: true }),
    compare('print and println', [
      ['println', full(['System.out.println("Rosa’s Café");', 'System.out.println("Open 8 to 9");']), 'println ends the line.', ['Rosa’s Café', 'Open 8 to 9']],
      ['print', full(['System.out.print("Rosa’s Café, ");', 'System.out.println("open 8 to 9");']), 'print stays on the same line.', ['Rosa’s Café, open 8 to 9']],
      ['Joining with +', full(['System.out.println("Seats: " + 40);', 'System.out.println("Sum: " + (2 + 3));']), '+ joins text and values; brackets do the maths first.', ['Seats: 40', 'Sum: 5']],
    ]),
    tapbug('error: ’;’ expected', ['System.out.println("Hello")', 'System.out.println("Bye");'], [[1, 'println("Hello")', 'println("Hello");']], 'Every statement ends with a semicolon.'),
    check('Where does a Java program start running?', ['In the main method', 'On the first line of the file', 'In System.out', 'In the last class'], 'Always main.', 'Which method is special?', { mono: false }),
    recap([
      ['☕', 'Code lives in a class; programs start in main'],
      ['▶', 'javac compiles, java runs (on the JVM)'],
      ['🖨', 'System.out.println prints a line'],
    ]),
  ]),

  lesson('jv-b-1-2', 'Comments and formatted output', 7, [
    chat(['From here on, most examples show only the lines inside main, to keep them short. The class and main around them are always there.']),
    compare('Formatted output', [
      ['printf', ['System.out.printf("%s has %d seats%n", "Harbour Express", 40);'], '%s text, %d whole number, %n new line.', ['Harbour Express has 40 seats']],
      ['Decimals', ['System.out.printf("%.2f%n", 4.5);', 'System.out.println(String.format("%.1f", 2.25 + 1));'], '%.2f shows two decimals; String.format makes the text without printing.', ['4.50', '3.3']],
      ['Escapes', ['System.out.println("Line 1\\nLine 2");', 'System.out.println("She said \\"hi\\"");'], '\\n new line, \\" a quote inside text.', ['Line 1', 'Line 2', 'She said "hi"']],
    ]),
    explore('Comments', ['// One line comment', '/* A comment that', '   spans lines */', '/** A doc comment, for documentation tools */', 'System.out.println("Hi"); // after code'], [
      [1, '// to the end of the line.'],
      [2, '/* … */ can cover many lines.'],
      [4, '/** … */ comments describe classes and methods.'],
    ]),
    matchUp('Which format?', [['A whole number', '%d'], ['Text', '%s'], ['Two decimals', '%.2f'], ['A new line', '%n']], 'printf formats.'),
    check('What does System.out.printf("%.1f%n", 2.0) print?', ['2.0', '2', '2.00', '%.1f'], 'One digit after the point.', 'What does .1 mean?'),
    recap([
      ['🔤', 'printf with %d, %s, %.2f, %n'],
      ['↩', '\\n and \\" inside text'],
      ['💬', '//, /* */ and /** */ comments'],
    ]),
  ]),

  challenge('jv-b-1-ch', 'Module 1 Challenge', { icon: '☕', name: 'Java Starter' }, ['Write and run a Java program', 'Print with println and printf', 'Comment code'], [
    mcq(1, 'What must the file holding public class Main be called?', ['Main.java', 'main.java', 'Program.java', 'Any name'], 'It matches the class.', { mono: true }),
    mcq(2, 'Which command compiles Main.java?', ['javac Main.java', 'java Main', 'run Main.java', 'compile Main'], 'javac makes bytecode.', { mono: true }),
    mcq(3, 'What runs Java bytecode?', ['The JVM', 'The browser', 'gcc', 'Python'], 'Java Virtual Machine.'),
    mcq(4, 'What is the difference between print and println?', ['println ends the line', 'print is faster', 'println prints twice', 'None'], 'A new line.'),
    mcq(5, 'What does "Total: " + 2 + 3 give?', ['Total: 23', 'Total: 5', '5', 'An error'], 'Once text starts, + joins.', { mono: true }),
    swipe([
      ['Java code must be inside a class', true, 'Always.'],
      ['Java is compiled to bytecode first', true, 'Then the JVM runs it.'],
      ['%n in printf starts a new line', true, 'Like \\n.'],
      ['Statements can skip the semicolon at the end of a line', false, 'Always ;'],
    ]),
    pairs([['javac', 'Compile'], ['java', 'Run'], ['println', 'Print a line'], ['%d', 'Whole number']], 'Java basics.'),
    pickCode('Which prints “Seats: 12” on its own line?', ['System.out.println("Seats: " + 12);', 'System.out.print(Seats: 12);', 'print("Seats: 12")', 'System.out.println("Seats: " - 12);'], 'Join with +.'),
    bugTask(['System.out.println("Hi")', 'system.out.println("Bye");'], [[1, '("Hi")', '("Hi");'], [2, 'system.out', 'System.out']], 'A semicolon, and Java is case-sensitive: System.'),
    xray('<div class="c">$ java Main.java</div><div class="a">Harbour Express has 40 seats</div><div class="b">4.50</div>', [
      ['.a', 'A sentence with values', 'printf("%s has %d seats%n", …)', ['printf("%s has %d seats%n", …)', 'printf("%.2f%n", 4.5)', 'print("Rosa’s Café, ")']],
      ['.b', 'Two decimals', 'printf("%.2f%n", 4.5)', ['printf("%s has %d seats%n", …)', 'printf("%.2f%n", 4.5)', 'print("Rosa’s Café, ")']],
    ]),
    arrange(full(['System.out.println("Rosa’s Café");']), 'the class, main, print, close main, close the class', ['Rosa’s Café']),
  ]),

  lesson('jv-vars', 'Variables and types', 8, [
    chat(['Java checks types before the program runs. A variable has a type that never changes.', 'Primitive types hold simple values: int, long, double, boolean, char. String holds text and is a class, so it starts with a capital S.']),
    compare('Types', [
      ['Primitives', ['int seats = 40;', 'double fare = 85.5;', 'boolean open = true;', "char grade = 'A';", 'System.out.println(seats + " " + fare + " " + open + " " + grade);'], 'Each type holds one kind of value.', ['40 85.5 true A']],
      ['String and var', ['String name = "Sutton Classes";', 'var city = "Sutton";', 'System.out.println(name.length() + " " + city);'], 'var lets Java work out the type (here String).', ['14 Sutton']],
      ['long and overflow', ['int big = Integer.MAX_VALUE;', 'System.out.println(big + 1);', 'long bigger = 2_147_483_648L;', 'System.out.println(bigger);'], 'int wraps around past 2.1 billion; long holds much more.', ['-2147483648', '2147483648']],
    ]),
    compare('Casting', [
      ['Widening', ['int marks = 82;', 'double d = marks;', 'System.out.println(d);'], 'int to double happens by itself.', ['82.0']],
      ['Narrowing', ['double price = 99.99;', 'int whole = (int) price;', 'System.out.println(whole);'], 'double to int needs a cast and drops the decimals.', ['99']],
      ['char and int', ["char c = 'A';", 'System.out.println(c + 1);', 'System.out.println((char) (c + 1));'], 'A char is a number underneath.', ['66', 'B']],
    ]),
    tapbug('error: incompatible types: possible lossy conversion from double to int', ['int price = 85.5;'], [[1, 'int price', 'double price']], 'A decimal needs a double (or a cast, which drops the decimals).'),
    check('Which type holds true or false?', ['boolean', 'bool', 'Boolean only', 'int'], 'Java’s yes/no type.', 'Not bool.', { mono: true }),
    recap([
      ['📦', 'int, long, double, boolean, char; String for text'],
      ['🔁', 'Widening is automatic; narrowing needs (int)'],
      ['✨', 'var infers the type; final makes a constant'],
    ]),
  ]),

  challenge('jv-b-2-ch', 'Module 2 Challenge', { icon: '📦', name: 'Type Keeper' }, ['Pick the right type', 'Cast between types', 'Spot overflow'], [
    mcq(1, 'Which type holds 85.5?', ['double', 'int', 'char', 'boolean'], 'A decimal.', { mono: true }),
    mcq(2, 'Which is a class, not a primitive?', ['String', 'int', 'double', 'char'], 'Capital S.', { mono: true }),
    mcq(3, '(int) 7.9 is…', ['7', '8', '7.9', 'An error'], 'Cast drops the decimals.', { mono: true }),
    mcq(4, 'What does final int MAX = 40; mean?', ['MAX can’t be changed', 'MAX is the last variable', 'MAX is private', 'Nothing'], 'A constant.', { mono: true }),
    mcq(5, 'Integer.MAX_VALUE + 1 gives…', ['A large negative number', 'An error', '2147483648', '0'], 'It wraps around.'),
    swipe([
      ['A variable’s type can change later', false, 'Fixed.'],
      ['var still gives a fixed type', true, 'Java works it out once.'],
      ['char uses double quotes', false, "Single: 'A'."],
      ['long numbers can end with L', true, '2_147_483_648L.'],
    ]),
    pairs([['int', 'Whole number'], ['double', 'Decimal'], ['boolean', 'true/false'], ['char', 'One character']], 'Types.'),
    pickCode('Which stores 99.99 and then the whole part 99?', ['double p = 99.99; int w = (int) p;', 'int p = 99.99; int w = p;', 'double p = 99.99; int w = p;', 'int w = int(99.99);'], 'Cast down.'),
    bugTask(['int seats = 40', 'String name = \'Sam\';'], [[1, '40', '40;'], [2, "'Sam'", '"Sam"']], 'A semicolon, and Strings use double quotes.'),
    xray('<div class="c">$ java Main.java</div><div class="a">40 85.5 true A</div><div class="b">99</div>', [
      ['.a', 'Four types', 'seats + " " + fare + …', ['seats + " " + fare + …', '(int) price', 'big + 1']],
      ['.b', 'Decimals dropped', '(int) price', ['seats + " " + fare + …', '(int) price', 'big + 1']],
    ]),
    arrange(['double fare = 85.5;', 'int riders = 2;', 'double total = fare * riders;', 'System.out.println("Total: " + total);'], 'fare, riders, multiply, print', ['Total: 171.0']),
  ]),

  lesson('jv-ops', 'Operators and input', 8, [
    compare('Operators', [
      ['Arithmetic', ['int a = 17, b = 5;', 'System.out.println(a + b + " " + (a - b) + " " + a * b + " " + a / b + " " + a % b);'], 'int / int drops the decimals; % is the remainder.', ['22 12 85 3 2']],
      ['Shortcuts', ['int n = 5;', 'n++;', 'n += 10;', 'n *= 2;', 'System.out.println(n);'], '(5 + 1 + 10) × 2.', ['32']],
      ['Logic', ['int age = 15;', 'System.out.println((age >= 18) + " " + (age > 12 && age < 20) + " " + !(age == 15));'], '&& and, || or, ! not. Results are true or false.', ['false true false']],
    ]),
    compare('Math', [
      ['Math methods', ['System.out.println(Math.max(4, 9) + " " + Math.abs(-7) + " " + Math.sqrt(49));'], 'Ready-made maths.', ['9 7 7.0']],
      ['Rounding', ['System.out.println(Math.round(2.5) + " " + Math.floor(2.7) + " " + Math.ceil(2.1));'], 'round, down, up.', ['3 2.0 3.0']],
    ]),
    explore('Reading input with Scanner', ['import java.util.Scanner;', '', 'Scanner in = new Scanner(System.in);', 'System.out.print("How many seats? ");', 'int seats = in.nextInt();', 'System.out.println("Booking " + seats + " seats");'], [
      [1, 'Scanner lives in java.util, so import it.'],
      [3, 'Make a Scanner that reads the keyboard.'],
      [5, 'nextInt reads a number; nextLine reads a line; nextDouble a decimal.'],
    ], { intro: 'This program waits for typing, so it is shown, not run.' }),
    tapbug('The average shows 2.0 instead of 2.5', ['int total = 5, count = 2;', 'double avg = total / count;'], [[2, 'total / count', '(double) total / count']], 'int / int is worked out in whole numbers first. Cast one side.'),
    check('What is 20 % 6?', ['2', '3', '3.33', '0'], 'The remainder.', '20 = 3 × 6 + ?', { mono: true }),
    recap([
      ['➕', '+ − * / % and ++, +='],
      ['⚖', '&& || ! give true or false'],
      ['⌨', 'Scanner reads input: nextInt, nextLine'],
    ]),
  ]),

  challenge('jv-b-3-ch', 'Module 3 Challenge', { icon: '➕', name: 'Operator Pro' }, ['Calculate with operators', 'Combine conditions', 'Read input with Scanner'], [
    mcq(1, 'What is 7 / 2 in Java when both are int?', ['3', '3.5', '4', '3.0'], 'Whole numbers.', { mono: true }),
    mcq(2, 'Which means “or”?', ['||', '&&', '|', 'or'], '&& is and.', { mono: true }),
    mcq(3, 'Which reads a whole number with a Scanner in?', ['in.nextInt()', 'in.readInt()', 'in.next()', 'Scanner.int()'], 'next + type.', { mono: true }),
    mcq(4, 'After int x = 3; x *= 4; x is…', ['12', '7', '3', '34'], 'Multiply and store.', { mono: true }),
    mcq(5, 'Math.sqrt(16) prints…', ['4.0', '4', '16', '256'], 'It returns a double.', { mono: true }),
    swipe([
      ['5 > 3 gives true', true, 'A boolean.'],
      ['Scanner must be imported', true, 'java.util.Scanner.'],
      ['% works only on ints', false, 'Doubles too.'],
      ['x++ subtracts one', false, 'Adds one.'],
    ]),
    pairs([['%', 'Remainder'], ['&&', 'And'], ['||', 'Or'], ['!', 'Not']], 'Operators.'),
    pickCode('Which checks an age between 13 and 19?', ['age >= 13 && age <= 19', '13 <= age <= 19', 'age >= 13 || age <= 19', 'age in 13..19'], 'Both must be true.'),
    bugTask(['int a = 5, b = 2;', 'double half = a / b;', 'System.out.println(half)'], [[2, 'a / b', '(double) a / b'], [3, '(half)', '(half);']], 'Cast before dividing, and end with ;'),
    xray('<div class="c">$ java Main.java</div><div class="a">22 12 85 3 2</div><div class="b">9 7 7.0</div>', [
      ['.a', 'Five results', 'a + b, a - b, a * b, a / b, a % b', ['a + b, a - b, a * b, a / b, a % b', 'Math.max, Math.abs, Math.sqrt', 'n *= 2']],
      ['.b', 'Ready-made maths', 'Math.max, Math.abs, Math.sqrt', ['a + b, a - b, a * b, a / b, a % b', 'Math.max, Math.abs, Math.sqrt', 'n *= 2']],
    ]),
    arrange(['int cups = 23;', 'int boxes = cups / 6;', 'int left = cups % 6;', 'System.out.println(boxes + " boxes, " + left + " left");'], 'the count, full boxes, leftovers, print', ['3 boxes, 5 left']),
  ]),

  lesson('jv-if', 'Decisions: if and switch', 8, [
    compare('Choosing what to run', [
      ['if / else if / else', ['int age = 15;', 'if (age < 5) {', '    System.out.println("Free");', '} else if (age < 18) {', '    System.out.println("Child fare");', '} else {', '    System.out.println("Adult fare");', '}'], 'The first true condition wins.', ['Child fare']],
      ['Ternary', ['int seats = 0;', 'System.out.println(seats > 0 ? "Open" : "Full");'], 'condition ? yes : no.', ['Full']],
      ['Strings', ['String size = "M";', 'if (size.equals("M")) System.out.println("Medium");'], 'Compare Strings with equals, not ==.', ['Medium']],
    ]),
    compare('switch', [
      ['Classic', ['int day = 2;', 'switch (day) {', '    case 1: System.out.println("Mon"); break;', '    case 2: System.out.println("Tue"); break;', '    default: System.out.println("Later");', '}'], 'break leaves the switch; without it, cases fall through.', ['Tue']],
      ['Arrow form', ['String size = "L";', 'String name = switch (size) {', '    case "S" -> "Small";', '    case "M" -> "Medium";', '    default -> "Large";', '};', 'System.out.println(name);'], 'Java 14+: no fall-through, and the switch gives a value.', ['Large']],
    ]),
    tapbug('error: incompatible types: int cannot be converted to boolean', ['if (seats = 0) {'], [[1, 'seats = 0', 'seats == 0']], '= assigns; == compares. Java refuses an int as a condition.'),
    check('How should you compare two Strings a and b?', ['a.equals(b)', 'a == b', 'a = b', 'a.compare(b)'], '== checks if they are the same object.', 'Compare the letters.', { mono: true }),
    truth([
      ['Only one branch of an if-else chain runs', true, 'The first true.'],
      ['A classic switch case without break falls through', true, 'Into the next case.'],
      ['The arrow switch needs break', false, 'It never falls through.'],
    ]),
    recap([
      ['🔀', 'if / else if / else; the first true wins'],
      ['🎛', 'switch: classic with break, or arrow form'],
      ['⚠', 'Strings: equals, not =='],
    ]),
  ]),

  challenge('jv-b-4-ch', 'Module 4 Challenge', { icon: '🔀', name: 'Decision Maker' }, ['Write if-else chains', 'Use both kinds of switch', 'Compare Strings properly'], [
    mcq(1, 'Which compares two ints?', ['==', '=', 'equals', '==='], '= assigns.', { mono: true }),
    mcq(2, 'Which compares two Strings’ text?', ['a.equals(b)', 'a == b', 'a.same(b)', 'a = b'], 'Text, not objects.', { mono: true }),
    mcq(3, 'What does default do in a switch?', ['Runs when no case matches', 'Runs first', 'Ends the program', 'Nothing'], 'Like else.', { mono: true }),
    mcq(4, 'x > 0 ? "yes" : "no" with x = -1 gives…', ['"no"', '"yes"', '-1', 'false'], 'Ternary.', { mono: true }),
    mcq(5, 'Which switch form gives back a value with no fall-through?', ['case "S" -> "Small";', 'case "S": "Small"; break;', 'if case "S"', 'switch -> "S"'], 'The arrow.', { mono: true }),
    swipe([
      ['Java accepts if (x = 5) for an int x', false, 'A compile error.'],
      ['switch works on Strings in Java', true, 'Since Java 7.'],
      ['else is optional', true, 'Only when needed.'],
      ['An if condition must be a boolean', true, 'Not a number.'],
    ]),
    pairs([['if', 'Test'], ['else if', 'Next test'], ['switch', 'Pick a case'], ['default', 'No match']], 'Decisions.'),
    pickCode('Which prints Adult for age 30?', ['if (age >= 18) System.out.println("Adult");', 'if age >= 18: System.out.println("Adult");', 'if (age => 18) System.out.println("Adult");', 'if (age = 18) System.out.println("Adult");'], 'Brackets and >=.'),
    bugTask(['String city = "Sutton";', 'if (city == "Sutton") System.out.println("Home");', 'if (open = true) System.out.println("Open");'], [[2, 'city == "Sutton"', 'city.equals("Sutton")'], [3, 'open = true', 'open']], 'equals for text; a boolean is already a condition.'),
    xray('<div class="c">$ java Main.java</div><div class="a">Child fare</div><div class="b">Large</div>', [
      ['.a', 'The fare chosen', 'else if (age < 18)', ['else if (age < 18)', 'default -> "Large"', 'seats > 0 ? "Open" : "Full"']],
      ['.b', 'No case matched', 'default -> "Large"', ['else if (age < 18)', 'default -> "Large"', 'seats > 0 ? "Open" : "Full"']],
    ]),
    arrange(['int age = 70;', 'String fare = age >= 60 ? "Senior" : "Adult";', 'System.out.println(fare);'], 'the age, choose, print', ['Senior']),
  ]),

  lesson('jv-loops', 'Loops', 8, [
    compare('Three loops', [
      ['for', ['for (int i = 1; i <= 3; i++) {', '    System.out.println("Seat " + i);', '}'], 'Start; keep going while; step.', ['Seat 1', 'Seat 2', 'Seat 3']],
      ['while', ['int cups = 3;', 'while (cups > 0) {', '    System.out.println(cups + " left");', '    cups--;', '}'], 'Checks first, then runs.', ['3 left', '2 left', '1 left']],
      ['do while', ['int n = 10;', 'do {', '    System.out.println("Runs once: " + n);', '} while (n < 5);'], 'Runs at least once.', ['Runs once: 10']],
    ]),
    compare('More loops', [
      ['for-each', ['String[] menu = {"Tea", "Toast", "Soup"};', 'for (String item : menu) System.out.println(item);'], 'Every item, no index needed.', ['Tea', 'Toast', 'Soup']],
      ['break and continue', ['for (int i = 1; i <= 10; i++) {', '    if (i % 2 == 0) continue;', '    if (i > 7) break;', '    System.out.println(i);', '}'], 'continue skips; break leaves.', ['1', '3', '5', '7']],
      ['Nested', ['for (int r = 1; r <= 2; r++) {', '    String row = "";', '    for (char c = \'A\'; c <= \'C\'; c++) row += r + "" + c + " ";', '    System.out.println(row.trim());', '}'], 'A loop inside a loop: rows and seats.', ['1A 1B 1C', '2A 2B 2C']],
    ]),
    tapbug('The loop never ends', ['int i = 0;', 'while (i < 5) {', '    System.out.println(i);', '}'], [[3, 'System.out.println(i);', 'System.out.println(i); i++;']], 'Change the loop variable so the condition becomes false.'),
    check('Which loop always runs at least once?', ['do while', 'while', 'for', 'for-each'], 'It checks at the end.', 'Where is the test?', { mono: true }),
    matchUp('Which loop fits?', [['Count from 1 to 10', 'for'], ['Every item in an array', 'for-each'], ['Until the cups run out', 'while']], 'Pick by how it stops.'),
    recap([
      ['🔁', 'for, while, do while, for-each'],
      ['⏭', 'continue skips; break leaves'],
      ['♾', 'Make the condition become false'],
    ]),
  ]),

  challenge('jv-b-5-ch', 'Module 5 Challenge', { icon: '🔁', name: 'Loop Runner' }, ['Write for, while and for-each loops', 'Use break and continue', 'Avoid endless loops'], [
    mcq(1, 'How many times does for (int i = 0; i < 4; i++) run?', ['4', '3', '5', 'Forever'], '0 to 3.', { mono: true }),
    mcq(2, 'What does break do?', ['Leaves the loop', 'Skips one round', 'Ends the program', 'Restarts'], 'continue skips.', { mono: true }),
    mcq(3, 'Which loops over every item without an index?', ['for (String s : items)', 'for (i in items)', 'foreach items', 'while (items)'], 'for-each.', { mono: true }),
    mcq(4, 'What makes a loop endless?', ['A condition that never becomes false', 'A break', 'A for-each', 'println'], 'Change the variable.'),
    mcq(5, '3 rows × 4 seats in nested loops runs the inner body…', ['12 times', '7 times', '4 times', '3 times'], '3 × 4.'),
    swipe([
      ['for-each can change which item comes next', false, 'It walks them all in order.'],
      ['do while runs at least once', true, 'It checks at the end.'],
      ['continue jumps to the next round', true, 'Skips the rest.'],
      ['A for loop’s variable exists after the loop', false, 'Only inside it.'],
    ]),
    pairs([['for', 'Counting'], ['while', 'Until false'], ['do while', 'At least once'], ['for-each', 'Every item']], 'Loops.'),
    pickCode('Which prints 10, 8, 6, 4, 2?', ['for (int i = 10; i > 0; i -= 2) System.out.println(i);', 'for (int i = 10; i > 0; i++) System.out.println(i);', 'for (int i = 10; i < 0; i -= 2) System.out.println(i);', 'while (10 > 0) System.out.println(i);'], 'Count down by 2.'),
    bugTask(['for (int i = 0; i < 5; i--) {', '    System.out.println(i)', '}'], [[1, 'i--', 'i++'], [2, 'println(i)', 'println(i);']], 'Step towards the end; end with ;'),
    xray('<div class="c">$ java Main.java</div><div class="a">Soup</div><div class="b">7</div>', [
      ['.a', 'The last item', 'for (String item : menu)', ['for (String item : menu)', 'if (i > 7) break;', 'cups--']],
      ['.b', 'The last odd number before the stop', 'if (i > 7) break;', ['for (String item : menu)', 'if (i > 7) break;', 'cups--']],
    ]),
    arrange(['int total = 0;', 'for (int i = 1; i <= 4; i++) {', '    total += i;', '}', 'System.out.println(total);'], 'start at 0, loop 1 to 4, add, close, print', ['10']),
  ]),

  lesson('jv-methods', 'Methods', 8, [
    chat(['A method is a named block of code inside a class. It takes typed parameters and returns a value of a stated type, or void.', 'Methods called from main are static for now. Objects (module 9) bring methods without static.']),
    compare('Writing methods', [
      ['Return a value', ['public class Main {', '    static double withTax(double price) {', '        return price * 1.05;', '    }', '', '    public static void main(String[] args) {', '        System.out.printf("%.2f%n", withTax(80));', '    }', '}'], 'double in, double out.', ['84.00']],
      ['void', ['public class Main {', '    static void greet(String name) {', '        System.out.println("Welcome, " + name + "!");', '    }', '', '    public static void main(String[] args) {', '        greet("Sam");', '        greet("Mia");', '    }', '}'], 'void: returns nothing.', ['Welcome, Sam!', 'Welcome, Mia!']],
      ['Overloading', ['public class Main {', '    static int area(int side) { return side * side; }', '    static int area(int w, int h) { return w * h; }', '', '    public static void main(String[] args) {', '        System.out.println(area(4) + " " + area(3, 5));', '    }', '}'], 'Same name, different parameters.', ['16 15']],
    ]),
    compare('Pass by value', [
      ['A copy', ['public class Main {', '    static void addOne(int n) {', '        n++;', '    }', '', '    public static void main(String[] args) {', '        int seats = 5;', '        addOne(seats);', '        System.out.println(seats);', '    }', '}'], 'The method changes its own copy.', ['5']],
      ['Return it', ['public class Main {', '    static int addOne(int n) {', '        return n + 1;', '    }', '', '    public static void main(String[] args) {', '        int seats = 5;', '        seats = addOne(seats);', '        System.out.println(seats);', '    }', '}'], 'Return the new value and store it.', ['6']],
    ]),
    tapbug('error: missing return statement', ['static int square(int n) {', '    int s = n * n;', '}'], [[2, 'int s = n * n;', 'return n * n;']], 'A method with a return type must return a value.'),
    check('What does void mean?', ['The method returns nothing', 'It returns 0', 'It returns null', 'It is empty'], 'No value back.', 'What comes back?', { mono: false }),
    recap([
      ['🧩', 'static type name(params) { … return …; }'],
      ['🔀', 'Overloading: same name, different parameters'],
      ['📋', 'Primitives are passed as copies'],
    ]),
  ]),

  challenge('jv-b-6-ch', 'Module 6 Challenge', { icon: '🧩', name: 'Method Builder' }, ['Write methods with parameters and returns', 'Overload methods', 'Understand pass by value'], [
    mcq(1, 'Which declares a method taking an int and returning an int?', ['static int twice(int n)', 'static twice(int n) int', 'int twice(n)', 'function twice(int n)'], 'Return type before the name.', { mono: true }),
    mcq(2, 'What is overloading?', ['Methods with the same name but different parameters', 'A method that calls itself', 'Too many methods', 'A long method'], 'Java picks by the arguments.'),
    mcq(3, 'Java passes an int to a method…', ['As a copy', 'By reference', 'As text', 'Not at all'], 'By value.'),
    mcq(4, 'Why static on methods called from main (for now)?', ['main is static, so it can call static methods directly', 'It makes them faster', 'It hides them', 'It is required for all methods'], 'Objects come later.'),
    mcq(5, 'Which is a correct call to static int add(int a, int b)?', ['add(2, 3)', 'add(2)', 'add[2, 3]', 'int add(2, 3)'], 'One argument per parameter.', { mono: true }),
    swipe([
      ['return ends the method', true, 'With a value.'],
      ['A void method can return a value', false, 'Nothing comes back.'],
      ['Parameters need types', true, 'int n.'],
      ['Changing an int parameter changes the caller’s variable', false, 'Only the copy.'],
    ]),
    pairs([['Parameter', 'Input'], ['return', 'Output'], ['void', 'No value'], ['Overloading', 'Same name']], 'Methods.'),
    pickCode('Which returns the bigger of two ints?', ['static int max2(int a, int b) { return a > b ? a : b; }', 'static max2(a, b) { return a > b; }', 'static void max2(int a, int b) { return a; }', 'int max2 = (a, b) -> a;'], 'Types and a return.'),
    bugTask(['static double area(double r) {', '    double a = Math.PI * r * r;', '}'], [[2, '    double a = Math.PI * r * r;', '    return Math.PI * r * r;']], 'Return the value.'),
    xray('<div class="c">$ java Main.java</div><div class="a">84.00</div><div class="b">16 15</div>', [
      ['.a', 'Price with tax', 'withTax(80)', ['withTax(80)', 'area(4) and area(3, 5)', 'greet("Sam")']],
      ['.b', 'Two areas', 'area(4) and area(3, 5)', ['withTax(80)', 'area(4) and area(3, 5)', 'greet("Sam")']],
    ]),
    arrange(['public class Main {', '    static int cube(int n) { return n * n * n; }', '    public static void main(String[] args) {', '        System.out.println(cube(3));', '    }', '}'], 'the class, the method, main, call it, close main, close the class', ['27']),
  ]),
];
