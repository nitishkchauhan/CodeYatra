// Extra practice for each Java module. Java predicts compile and run with a real JDK in tests.
import { predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · JAVA';

export const JAVA_DRILLS: Record<string, Step[]> = {
  'jv-hello': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['System.out.println(1 + 2 + "3" + 4 + 5);'], answer: '3345', explain: '1 + 2 is 3; after the "3", every + joins.' }),
    quiz({ prompt: 'Which line is the start of every Java program?', options: ['public static void main(String[] args)', 'public void start()', 'static int main()', 'def main():'], right: 'Right.', wrong: 'The JVM looks for public static void main(String[] args).', mono: true }),
    quiz({ prompt: 'What does javac Main.java create?', options: ['Main.class, bytecode for the JVM', 'Main.exe', 'A new Main.java', 'Nothing; it runs the program'], right: 'Right. java Main then runs it.', wrong: 'javac compiles source into .class bytecode.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['System.out.printf("%d seats, ₹%.2f%n", 3, 1050.0);'], answer: '3 seats, ₹1050.00', explain: '%d fills the int, %.2f the double with two decimals.' }),
  ],
  'jv-vars': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int a = 7;', 'double b = a / 2;', 'System.out.println(b);'], answer: '3.0', explain: 'a / 2 is int division (3), then widened to 3.0.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['long big = 2147483647L + 1;', 'int small = 2147483647 + 1;', 'System.out.println(big + " " + small);'], answer: '2147483648 -2147483648', explain: 'The long has room; the int wraps round.' }),
    quiz({ prompt: 'Which declares a boolean correctly?', options: ['boolean full = false;', 'bool full = false;', 'Boolean full = "false";', 'boolean full = 0;'], right: 'Right.', wrong: 'Java’s type is boolean, with true or false.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['char c = \'a\';', 'int n = c - \'a\' + 1;', 'System.out.println(n);'], answer: '1', explain: 'chars are numbers, so \'a\' − \'a\' is 0.' }),
  ],
  'jv-ops': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['System.out.println(7 / 2 + " " + 7 % 2 + " " + 7.0 / 2);'], answer: '3 1 3.5', explain: 'Two ints give an int; a double makes the division decimal.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int x = 10;', 'x += 5;', 'x *= 2;', 'x %= 7;', 'System.out.println(x);'], answer: '2', explain: '10 + 5 = 15, × 2 = 30, 30 % 7 = 2.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['System.out.println(Math.round(2.5) + " " + Math.max(3, 8) + " " + Math.pow(2, 3));'], answer: '3 8 8.0', explain: 'Math.pow always returns a double.' }),
    quiz({ prompt: 'Which Scanner method reads a whole line of text?', options: ['nextLine()', 'next()', 'nextInt()', 'readLine()'], right: 'Right. next() reads one word.', wrong: 'nextLine() reads up to the end of the line.', mono: true }),
  ],
  'jv-if': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int age = 64;', 'boolean student = true;', 'if (age >= 60 && student) System.out.println("both");', 'else if (age >= 60 || student) System.out.println("one");', 'else System.out.println("none");'], answer: 'both', explain: 'Both conditions are true, so the first branch runs.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int marks = 74;', 'String grade = marks >= 75 ? "B" : "C";', 'System.out.println(grade);'], answer: 'C', explain: 'The ternary picks the second value when the condition is false.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['String a = "Pune";', 'String b = "pune";', 'System.out.println(a.equals(b) + " " + a.equalsIgnoreCase(b));'], answer: 'false true', explain: 'equals is case-sensitive.' }),
    quiz({ prompt: 'In an old-style switch, what stops fall-through?', options: ['break', 'stop', 'return only', 'default'], right: 'Right.', wrong: 'Each case needs break, or use the arrow form.', mono: true }),
  ],
  'jv-loops': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int n = 482, s = 0;', 'while (n > 0) {', '    s += n % 10;', '    n /= 10;', '}', 'System.out.println(s);'], answer: '14', explain: 'It adds the digits: 2 + 8 + 4.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int count = 0;', 'for (int i = 0; i < 3; i++)', '    for (int j = 0; j < 4; j++)', '        count++;', 'System.out.println(count);'], answer: '12', explain: 'The inner loop runs 4 times for each of 3 outer rounds.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int i = 10;', 'do {', '    i++;', '} while (i < 5);', 'System.out.println(i);'], answer: '11', explain: 'do-while runs once before checking.' }),
    quiz({ prompt: 'What does continue do?', options: ['Skips to the next round of the loop', 'Leaves the loop', 'Restarts the program', 'Pauses the loop'], right: 'Right.', wrong: 'continue skips the rest of this round; break leaves the loop.' }),
  ],
  'jv-methods': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    static int fact(int n) {', '        return n <= 1 ? 1 : n * fact(n - 1);', '    }', '    public static void main(String[] args) {', '        System.out.println(fact(5));', '    }', '}'], answer: '120', explain: '5 × 4 × 3 × 2 × 1.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    static String show(int x) { return "int"; }', '    static String show(double x) { return "double"; }', '    public static void main(String[] args) {', '        System.out.println(show(5) + " " + show(5.0) + " " + show(\'A\'));', '    }', '}'], answer: 'int double int', explain: 'A char widens to int, the closest match.' }),
    quiz({ prompt: 'What does void mean in a method header?', options: ['It returns nothing', 'It takes no parameters', 'It is private', 'It can’t be called'], right: 'Right.', wrong: 'void is the return type for “nothing”.' }),
    quiz({ prompt: 'Why can main call a static method without creating an object?', options: ['static methods belong to the class itself', 'All methods are static', 'main creates one automatically', 'It can’t'], right: 'Right.', wrong: 'static methods are called on the class, not on an object.' }),
  ],
  'jv-arrays': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int[] a = {3, 8, 1, 9, 4};', 'int best = a[0];', 'for (int x : a) if (x > best) best = x;', 'System.out.println(a.length + " " + best);'], answer: '5 9', explain: 'length is 5; the loop finds the largest.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['import java.util.Arrays;', 'int[] a = {5, 2, 9, 1};', 'Arrays.sort(a);', 'System.out.println(Arrays.toString(a));'], answer: '[1, 2, 5, 9]', explain: 'Arrays.sort sorts in place, smallest first.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['int[][] grid = {{1, 2, 3}, {4, 5, 6}};', 'System.out.println(grid.length + " " + grid[0].length + " " + grid[1][2]);'], answer: '2 3 6', explain: 'Two rows of three; grid[1][2] is row 1, column 2.' }),
    quiz({ prompt: 'What does new boolean[3] start with?', options: ['[false, false, false]', '[true, true, true]', '[null, null, null]', 'Random values'], right: 'Right.', wrong: 'Java fills new arrays with defaults: 0, false or null.', mono: true }),
  ],
  'jv-strings': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['String s = "  pnr123  ";', 'System.out.println("[" + s.trim().toUpperCase() + "]");'], answer: '[PNR123]', explain: 'trim removes spaces at both ends.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['String s = "banana";', 'int count = 0;', 'for (int i = 0; i < s.length(); i++) if (s.charAt(i) == \'a\') count++;', 'System.out.println(count + " " + s.indexOf("na") + " " + s.lastIndexOf("na"));'], answer: '3 2 4', explain: 'Three a’s; "na" first at index 2 and last at 4.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['String r = new StringBuilder("Pune").reverse().toString();', 'System.out.println(r);'], answer: 'enuP', explain: 'reverse flips the builder’s characters.' }),
    quiz({ prompt: 'Why use StringBuilder in a big loop instead of +?', options: ['+ makes a new String every time; StringBuilder changes one buffer', 'StringBuilder prints faster', '+ doesn’t work in loops', 'StringBuilder is required by Java'], right: 'Right.', wrong: 'Strings are immutable, so each + creates a new one.' }),
  ],
  'jv-classes': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    public static void main(String[] args) {', '        Student a = new Student("Asha", 91);', '        Student b = new Student("Ravi", 72);', '        b.marks += 5;', '        System.out.println(a.marks + " " + b.marks);', '    }', '}', 'class Student {', '    String name;', '    int marks;', '    Student(String name, int marks) {', '        this.name = name;', '        this.marks = marks;', '    }', '}'], answer: '91 77', explain: 'Each object has its own fields.' }),
    quiz({ prompt: 'What is a constructor’s return type?', options: ['It has none, not even void', 'void', 'The class name followed by void', 'int'], right: 'Right.', wrong: 'A constructor is named after the class and has no return type.' }),
    quiz({ prompt: 'Student s; with no new. What is s?', options: ['null: it refers to no object yet', 'An empty Student', '0', 'A compile error everywhere'], right: 'Right. Using it would throw NullPointerException.', wrong: 'A reference with no object is null.' }),
    quiz({ prompt: 'Which keyword hides a field from other classes?', options: ['private', 'public', 'static', 'final'], right: 'Right.', wrong: 'private limits access to the class itself.', mono: true }),
  ],
  'jv-oop': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    public static void main(String[] args) {', '        Animal a = new Dog();', '        System.out.println(a.sound() + " " + a.legs());', '    }', '}', 'class Animal {', '    String sound() { return "..."; }', '    int legs() { return 4; }', '}', 'class Dog extends Animal {', '    @Override String sound() { return "Woof"; }', '}'], answer: 'Woof 4', explain: 'Dog overrides sound() and inherits legs().' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    public static void main(String[] args) {', '        new ACCoach();', '    }', '}', 'class Coach {', '    Coach() { System.out.println("Coach"); }', '}', 'class ACCoach extends Coach {', '    ACCoach() { System.out.println("AC"); }', '}'], answer: 'Coach\nAC', explain: 'The parent’s constructor runs first.' }),
    quiz({ prompt: 'Can you write new on an abstract class?', options: ['No; you create objects of its subclasses', 'Yes, always', 'Only inside main', 'Only with @Override'], right: 'Right.', wrong: 'Abstract classes can’t be instantiated.' }),
    quiz({ prompt: 'What does @Override do?', options: ['Asks the compiler to check this really replaces a parent method', 'Makes the method faster', 'Hides the parent class', 'Makes the method static'], right: 'Right.', wrong: 'It is a compile-time check that the signature matches.' }),
  ],
  'jv-collections': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['import java.util.ArrayList;', 'ArrayList<Integer> list = new ArrayList<>();', 'list.add(10);', 'list.add(20);', 'list.add(30);', 'list.remove(1);', 'list.set(0, 5);', 'System.out.println(list);'], answer: '[5, 30]', explain: 'remove(1) removes index 1 (20); set(0, 5) replaces 10.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['import java.util.HashMap;', 'HashMap<String, Integer> fares = new HashMap<>();', 'fares.put("Pune", 450);', 'fares.put("Pune", 500);', 'System.out.println(fares.get("Pune") + " " + fares.size() + " " + fares.containsKey("Agra"));'], answer: '500 1 false', explain: 'put replaces the value for an existing key.' }),
    quiz({ prompt: 'Which is the wrapper type for double?', options: ['Double', 'Float', 'Decimal', 'Number'], right: 'Right.', wrong: 'Each primitive has a wrapper: Integer, Double, Character, Boolean…', mono: true }),
    quiz({ prompt: 'You need the bookings in the order they were made. Which fits?', options: ['ArrayList', 'HashMap', 'An int', 'A boolean'], right: 'Right. It keeps insertion order.', wrong: 'A HashMap doesn’t promise any order.' }),
  ],
  'jv-exceptions': [
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['try {', '    int n = Integer.parseInt("12a");', '    System.out.println(n);', '} catch (NumberFormatException e) {', '    System.out.println("Not a number");', '}'], answer: 'Not a number', explain: 'parseInt throws NumberFormatException for "12a".' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['try {', '    System.out.println(10 / 0);', '} catch (ArithmeticException e) {', '    System.out.println(e.getMessage());', '}'], answer: '/ by zero', explain: 'Integer division by zero throws ArithmeticException.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'java', lines: ['public class Main {', '    static int check() {', '        try {', '            return 1;', '        } finally {', '            System.out.println("finally");', '        }', '    }', '    public static void main(String[] args) {', '        System.out.println(check());', '    }', '}'], answer: 'finally\n1', explain: 'finally runs even when try returns, before the value reaches the caller.' }),
    quiz({ prompt: 'What does throws IOException in a method header mean?', options: ['The method may throw it, and callers must handle it', 'The method catches it', 'The method can’t fail', 'It deletes the file'], right: 'Right.', wrong: 'throws passes the duty of handling it to the caller.' }),
  ],
};
