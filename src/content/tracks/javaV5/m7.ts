// Java · Modules 7–12 (Intermediate): arrays, strings, classes and objects, inheritance and interfaces,
// collections and exceptions. Each module’s first lesson keeps its old id. Programs with their own classes start
// with class Main (Java runs the first class in the file); every program is run with Java 17 in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, chat, compare, mcq, pairs, recap, reveal, swipe, tapbug, track, truth, xray } from '../cV5/kit';

const { lesson, challenge, check, pickCode } = track('java', 'java');

export const JAVA_M7: Lesson[] = [
  lesson('jv-arrays', 'Arrays', 8, [
    chat(['An array holds a fixed number of values of one type. marks[0] is the first.', 'Unlike C, Java checks every index: going past the end stops the program with an exception instead of reading rubbish.']),
    compare('Working with arrays', [
      ['Make and loop', ['int[] seats = {3, 0, 2, 5, 1};', 'int total = 0;', 'for (int s : seats) total += s;', 'System.out.println("First " + seats[0] + ", last " + seats[seats.length - 1] + ", total " + total);'], '.length is the size; the last index is length − 1.', ['First 3, last 1, total 11']],
      ['new and defaults', ['int[] counts = new int[3];', 'String[] names = new String[2];', 'counts[1] = 7;', 'System.out.println(counts[0] + " " + counts[1] + " " + names[0]);'], 'Numbers start at 0, objects at null.', ['0 7 null']],
      ['2-D', ['int[][] hall = {{1, 2, 3}, {4, 5, 6}};', 'System.out.println(hall.length + " rows, row 2 seat 3: " + hall[1][2]);'], 'An array of rows.', ['2 rows, row 2 seat 3: 6']],
    ]),
    compare('The Arrays helper', [
      ['toString and sort', ['import java.util.Arrays;', '', 'int[] fares = {85, 40, 120};', 'Arrays.sort(fares);', 'System.out.println(Arrays.toString(fares));'], 'Printing an array directly shows a code like [I@1b6d3586; use Arrays.toString.', ['[40, 85, 120]']],
      ['fill and copyOf', ['import java.util.Arrays;', '', 'int[] a = new int[3];', 'Arrays.fill(a, 9);', 'int[] b = Arrays.copyOf(a, 5);', 'System.out.println(Arrays.toString(b));'], 'copyOf can make a longer copy, padded with 0.', ['[9, 9, 9, 0, 0]']],
    ]),
    tapbug('ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5', ['int[] a = {1, 2, 3, 4, 5};', 'for (int i = 0; i <= a.length; i++) System.out.println(a[i]);'], [[2, 'i <= a.length', 'i < a.length']], 'Indexes go from 0 to length − 1.'),
    check('What is the last index of an array of length 10?', ['9', '10', '11', '0'], 'length − 1.', 'Counting starts at 0.', { mono: true }),
    recap([
      ['🗃', 'int[] a = {…} or new int[n]; a.length'],
      ['🛡', 'Java checks indexes: past the end throws'],
      ['🧰', 'Arrays.toString, sort, fill, copyOf'],
    ]),
  ]),

  challenge('jv-i-7-ch', 'Module 7 Challenge', { icon: '🗃', name: 'Array Ace' }, ['Make and loop over arrays', 'Use the Arrays helper', 'Stay inside the bounds'], [
    mcq(1, 'How do you get an array’s size?', ['a.length', 'a.length()', 'a.size()', 'len(a)'], 'A field, no brackets.', { mono: true }),
    mcq(2, 'new int[4] starts as…', ['[0, 0, 0, 0]', 'Rubbish', '[null, null, null, null]', 'Empty'], 'Numbers start at 0.', { mono: true }),
    mcq(3, 'What happens at a[10] when a has 5 items?', ['ArrayIndexOutOfBoundsException', 'It returns 0', 'It reads rubbish', 'The array grows'], 'Java checks.'),
    mcq(4, 'How do you print an array’s contents?', ['Arrays.toString(a)', 'System.out.println(a)', 'a.print()', 'a.toString()'], 'Otherwise you see a code.', { mono: true }),
    mcq(5, 'int[][] g = new int[3][4]; g.length is…', ['3', '4', '12', '7'], 'The number of rows.', { mono: true }),
    swipe([
      ['An array’s size can change after it is made', false, 'Use ArrayList (module 11).'],
      ['String arrays start full of null', true, 'Objects start as null.'],
      ['for-each gives each item, not its index', true, 'for (int s : seats).'],
      ['Arrays.sort sorts the array in place', true, 'It returns nothing.'],
    ]),
    pairs([['a.length', 'Size'], ['a[0]', 'First item'], ['Arrays.sort', 'Sort in place'], ['Arrays.toString', 'Readable text']], 'Arrays.'),
    pickCode('Which adds up int[] a?', ['for (int x : a) t += x;', 'for (int i = 1; i <= a.length; i++) t += a[i];', 't = a.sum();', 'for (x in a) t += x;'], 'for-each.'),
    bugTask(['int[] marks = {70, 85, 90};', 'System.out.println(marks[3]);', 'System.out.println(marks.length());'], [[2, 'marks[3]', 'marks[2]'], [3, 'length()', 'length']], 'The last index is 2, and length has no brackets for arrays.'),
    xray('<div class="c">$ java Main.java</div><div class="a">[40, 85, 120]</div><div class="b">0 7 null</div>', [
      ['.a', 'A sorted array', 'Arrays.sort(fares)', ['Arrays.sort(fares)', 'new int[3] and new String[2]', 'hall[1][2]']],
      ['.b', 'Default values', 'new int[3] and new String[2]', ['Arrays.sort(fares)', 'new int[3] and new String[2]', 'hall[1][2]']],
    ]),
    arrange(['int[] cups = {4, 9, 2};', 'int best = cups[0];', 'for (int c : cups) if (c > best) best = c;', 'System.out.println("Most: " + best);'], 'the data, start with the first, check each, print', ['Most: 9']),
  ]),

  lesson('jv-strings', 'Strings', 8, [
    chat(['A String is an object holding text. Strings are immutable: methods like toUpperCase give back a new String and leave the old one alone.', 'For building text bit by bit, StringBuilder is faster.']),
    compare('String methods', [
      ['Reading', ['String city = "Sutton";', 'System.out.println(city.length() + " " + city.charAt(0) + " " + city.indexOf("t") + " " + city.substring(0, 3));'], 'length, charAt, indexOf, substring(start, end).', ['6 S 2 Sut']],
      ['Changing', ['String s = "  Rosa’s Café  ";', 'System.out.println(s.trim().toUpperCase());', 'System.out.println("tea,toast".replace(",", " and "));'], 'Each gives a new String.', ['ROSA’S CAFÉ', 'tea and toast']],
      ['Testing', ['String code = "HBR-0915";', 'System.out.println(code.startsWith("HBR") + " " + code.contains("09") + " " + code.isEmpty());'], 'Yes/no checks.', ['true true false']],
    ]),
    compare('Comparing and building', [
      ['equals vs ==', ['String a = "tea";', 'String b = new String("tea");', 'System.out.println((a == b) + " " + a.equals(b) + " " + a.equalsIgnoreCase("TEA"));'], '== asks “same object?”; equals compares the letters.', ['false true true']],
      ['Immutable', ['String name = "mia";', 'name.toUpperCase();', 'System.out.println(name);', 'name = name.toUpperCase();', 'System.out.println(name);'], 'Keep the result, or nothing changes.', ['mia', 'MIA']],
      ['StringBuilder', ['StringBuilder sb = new StringBuilder();', 'for (int i = 1; i <= 3; i++) sb.append(i).append("-");', 'sb.setLength(sb.length() - 1);', 'System.out.println(sb.reverse());'], 'append adds; reverse flips.', ['3-2-1']],
    ]),
    reveal('More helpers', [
      ['split', '"a,b,c".split(",") gives an array of three Strings.'],
      ['String.join', 'String.join(", ", items) joins with a separator.'],
      ['Numbers', 'Integer.parseInt("42") turns text into an int.'],
      ['Characters', 'Character.isDigit(c), Character.toUpperCase(c).'],
    ], { mono: true }),
    tapbug('The login fails even with the right password', ['if (typed == saved) System.out.println("OK");'], [[1, 'typed == saved', 'typed.equals(saved)']], 'Compare text with equals.'),
    check('After String s = "hi"; s.toUpperCase(); what is s?', ['"hi"', '"HI"', 'null', 'An error'], 'Strings never change.', 'The result was thrown away.', { mono: true }),
    recap([
      ['🔤', 'length, charAt, substring, indexOf, replace'],
      ['🧊', 'Strings are immutable: keep the result'],
      ['⚖', 'equals for text; StringBuilder for building'],
    ]),
  ]),

  challenge('jv-i-8-ch', 'Module 8 Challenge', { icon: '🔤', name: 'String Smith' }, ['Use String methods', 'Compare Strings with equals', 'Build text with StringBuilder'], [
    mcq(1, '"Sutton".substring(1, 4) is…', ['"utt"', '"Sutt"', '"utto"', '"ut"'], 'From 1 up to (not including) 4.', { mono: true }),
    mcq(2, 'Which gives the number of characters?', ['s.length()', 's.length', 's.size()', 'len(s)'], 'A method for Strings.', { mono: true }),
    mcq(3, 'Why use StringBuilder in a loop?', ['It changes one buffer instead of making new Strings', 'It sorts text', 'It is required', 'It prints faster'], 'Strings are immutable.'),
    mcq(4, '"a,b,c".split(",").length is…', ['3', '5', '2', '1'], 'Three parts.', { mono: true }),
    mcq(5, 'Which turns "42" into the int 42?', ['Integer.parseInt("42")', '(int) "42"', '"42".toInt()', 'int("42")'], 'Parse it.', { mono: true }),
    swipe([
      ['toUpperCase changes the original String', false, 'It returns a new one.'],
      ['equals compares the letters', true, 'Use it for text.'],
      ['charAt(0) gives the first character', true, 'A char.'],
      ['indexOf returns -1 when not found', true, 'Check for it.'],
    ]),
    pairs([['charAt', 'One character'], ['substring', 'A piece'], ['indexOf', 'Where'], ['trim', 'Remove outer spaces']], 'String methods.'),
    pickCode('Which checks a name is “Sam”, ignoring case?', ['name.equalsIgnoreCase("Sam")', 'name == "Sam"', 'name.equals("sam".upper())', 'name.compare("Sam")'], 'Ignore case.'),
    bugTask(['String code = "hbr";', 'code.toUpperCase();', 'if (code == "HBR") System.out.println("Harbour");'], [[2, 'code.toUpperCase();', 'code = code.toUpperCase();'], [3, 'code == "HBR"', 'code.equals("HBR")']], 'Keep the new String, and compare with equals.'),
    xray('<div class="c">$ java Main.java</div><div class="a">6 S 2 Sut</div><div class="b">3-2-1</div>', [
      ['.a', 'Facts about the city', 'length, charAt, indexOf, substring', ['length, charAt, indexOf, substring', 'sb.reverse()', 'trim().toUpperCase()']],
      ['.b', 'Built, then flipped', 'sb.reverse()', ['length, charAt, indexOf, substring', 'sb.reverse()', 'trim().toUpperCase()']],
    ]),
    arrange(['String ticket = "seat";', 'ticket = ticket.toUpperCase();', 'ticket = ticket + "-14B";', 'System.out.println(ticket);'], 'the start, capitals, add the seat, print', ['SEAT-14B']),
  ]),

  lesson('jv-classes', 'Classes and objects', 9, [
    chat(['A class is a blueprint; an object is one thing made from it. The Train class describes every train; new Train(…) makes one.', 'Fields hold each object’s data, a constructor sets them up, and methods do things with them.']),
    compare('A class', [
      ['Fields and a constructor', ['public class Main {', '    public static void main(String[] args) {', '        Train t = new Train("Harbour Express", 40);', '        t.book(3);', '        System.out.println(t.name + ": " + t.seats + " seats left");', '    }', '}', '', 'class Train {', '    String name;', '    int seats;', '', '    Train(String name, int seats) {', '        this.name = name;', '        this.seats = seats;', '    }', '', '    void book(int n) {', '        seats -= n;', '    }', '}'], 'this.name is the field; name is the parameter.', ['Harbour Express: 37 seats left']],
      ['Two objects', ['public class Main {', '    public static void main(String[] args) {', '        Counter a = new Counter();', '        Counter b = new Counter();', '        a.tap(); a.tap(); b.tap();', '        System.out.println(a.count + " " + b.count);', '    }', '}', '', 'class Counter {', '    int count = 0;', '    void tap() { count++; }', '}'], 'Each object has its own fields.', ['2 1']],
      ['toString', ['public class Main {', '    public static void main(String[] args) {', '        System.out.println(new Seat(14, \'B\'));', '    }', '}', '', 'class Seat {', '    int row; char letter;', '    Seat(int row, char letter) { this.row = row; this.letter = letter; }', '    public String toString() { return "Seat " + row + letter; }', '}'], 'println uses toString to show an object.', ['Seat 14B']],
    ]),
    compare('Keeping data safe', [
      ['private and getters', ['public class Main {', '    public static void main(String[] args) {', '        Account acc = new Account();', '        acc.deposit(500);', '        acc.deposit(-90);', '        System.out.println(acc.getBalance());', '    }', '}', '', 'class Account {', '    private int balance = 0;', '    void deposit(int amount) { if (amount > 0) balance += amount; }', '    int getBalance() { return balance; }', '}'], 'Encapsulation: only the class touches balance, so bad changes are refused.', ['500']],
      ['static', ['public class Main {', '    public static void main(String[] args) {', '        new Ticket(); new Ticket(); new Ticket();', '        System.out.println(Ticket.made);', '    }', '}', '', 'class Ticket {', '    static int made = 0;', '    Ticket() { made++; }', '}'], 'A static field is shared by the whole class, not one per object.', ['3']],
      ['record', ['public class Main {', '    public static void main(String[] args) {', '        Stop s = new Stop("Central", 4);', '        System.out.println(s + " " + s.platform());', '    }', '}', '', 'record Stop(String name, int platform) {}'], 'Java 16+: a record makes the constructor, getters and toString for plain data.', ['Stop[name=Central, platform=4] 4']],
    ]),
    tapbug('The name is always null', ['Train(String name) {', '    name = name;', '}'], [[2, 'name = name;', 'this.name = name;']], 'Without this, the parameter is assigned to itself.'),
    check('What does new Train("Harbour Express", 40) do?', ['Makes a Train object and runs its constructor', 'Defines the Train class', 'Copies a train', 'Calls a static method'], 'An object from the blueprint.', 'What does new make?', { mono: false }),
    recap([
      ['🏗', 'class = blueprint; new makes objects'],
      ['🔧', 'Constructor sets fields; this.field'],
      ['🔒', 'private fields, public methods'],
    ]),
  ]),

  challenge('jv-i-9-ch', 'Module 9 Challenge', { icon: '🏗', name: 'Object Maker' }, ['Write classes with fields and constructors', 'Make and use objects', 'Hide data with private'], [
    mcq(1, 'What is a constructor?', ['The code that runs when an object is made', 'A static method', 'A field', 'The main method'], 'Sets things up.'),
    mcq(2, 'What does this.seats mean?', ['This object’s seats field', 'A static field', 'The parameter', 'A new object'], 'The field.', { mono: true }),
    mcq(3, 'Why make a field private?', ['So only the class can change it, safely', 'To make it faster', 'To share it', 'Java requires it'], 'Encapsulation.'),
    mcq(4, 'A static field is…', ['Shared by every object of the class', 'One per object', 'Unchangeable', 'Private'], 'One copy.'),
    mcq(5, 'What does println(obj) show if the class has toString?', ['What toString returns', 'The class name only', 'Nothing', 'An error'], 'Its text form.'),
    swipe([
      ['Each object has its own copy of normal fields', true, 'a.count vs b.count.'],
      ['A constructor has a return type', false, 'It has none, and the class’s name.'],
      ['A record is good for plain data', true, 'Java 16+.'],
      ['private fields can be read from Main directly', false, 'Use a getter.'],
    ]),
    pairs([['class', 'Blueprint'], ['new', 'Make an object'], ['private', 'Hidden'], ['static', 'Shared']], 'Classes.'),
    pickCode('Which constructor sets the field name?', ['Rider(String name) { this.name = name; }', 'void Rider(String name) { name = name; }', 'Rider(name) { this.name; }', 'new Rider(String name) { }'], 'Same name as the class, no return type.'),
    bugTask(['class Rider {', '    private String name;', '    void Rider(String name) { this.name = name; }', '}'], [[3, 'void Rider', 'Rider']], 'A constructor has no return type, not even void.'),
    xray('<div class="c">$ java Main.java</div><div class="a">Harbour Express: 37 seats left</div><div class="b">500</div>', [
      ['.a', 'After booking 3', 't.book(3)', ['t.book(3)', 'acc.getBalance()', 'Ticket.made']],
      ['.b', 'The safe balance', 'acc.getBalance()', ['t.book(3)', 'acc.getBalance()', 'Ticket.made']],
    ]),
    arrange(['public class Main {', '    public static void main(String[] args) {', '        System.out.println(new Cup("Tea").name);', '    }', '}', 'class Cup {', '    String name;', '    Cup(String name) { this.name = name; } }'], 'Main, main, make and print, close main, close Main, the class, its field, its constructor', ['Tea']),
  ]),

  lesson('jv-oop', 'Inheritance and interfaces', 9, [
    chat(['Inheritance lets one class build on another: an ACCoach is a Coach with extra comfort. It gets the parent’s fields and methods, and can override them.', 'An interface is a promise of methods: anything that implements Payable must have a price() method.']),
    compare('extends', [
      ['Reuse and override', ['public class Main {', '    public static void main(String[] args) {', '        System.out.println(new Coach().describe());', '        System.out.println(new ACCoach().describe());', '    }', '}', '', 'class Coach {', '    String describe() { return "Coach with " + seats() + " seats"; }', '    int seats() { return 72; }', '}', '', 'class ACCoach extends Coach {', '    @Override', '    int seats() { return 64; }', '}'], 'ACCoach reuses describe and changes seats.', ['Coach with 72 seats', 'Coach with 64 seats']],
      ['super', ['public class Main {', '    public static void main(String[] args) {', '        System.out.println(new Express("Harbour").label());', '    }', '}', '', 'class Train {', '    String name;', '    Train(String name) { this.name = name; }', '    String label() { return name; }', '}', '', 'class Express extends Train {', '    Express(String name) { super(name); }', '    @Override', '    String label() { return super.label() + " Express"; }', '}'], 'super(…) runs the parent’s constructor; super.label() its method.', ['Harbour Express']],
      ['Polymorphism', ['public class Main {', '    public static void main(String[] args) {', '        Coach[] train = {new Coach(), new ACCoach(), new Coach()};', '        int total = 0;', '        for (Coach c : train) total += c.seats();', '        System.out.println(total);', '    }', '}', '', 'class Coach { int seats() { return 72; } }', 'class ACCoach extends Coach { @Override int seats() { return 64; } }'], 'One Coach variable, and each object answers in its own way.', ['208']],
    ]),
    compare('Interfaces and abstract classes', [
      ['interface', ['public class Main {', '    public static void main(String[] args) {', '        Payable[] bill = {new Meal(120), new Ride(45)};', '        int sum = 0;', '        for (Payable p : bill) sum += p.price();', '        System.out.println(sum);', '    }', '}', '', 'interface Payable { int price(); }', 'record Meal(int cost) implements Payable { public int price() { return cost; } }', 'record Ride(int fare) implements Payable { public int price() { return fare + 5; } }'], 'Unrelated classes, one promise.', ['170']],
      ['abstract', ['public class Main {', '    public static void main(String[] args) {', '        Shape s = new Square(3);', '        System.out.println(s.area());', '    }', '}', '', 'abstract class Shape { abstract int area(); }', 'class Square extends Shape {', '    int side;', '    Square(int side) { this.side = side; }', '    int area() { return side * side; }', '}'], 'An abstract class can’t be made with new; children fill in its abstract methods.', ['9']],
    ]),
    reveal('OOP in four words', [
      ['Encapsulation', 'Hide data behind methods (private).'],
      ['Inheritance', 'Build on a class (extends).'],
      ['Polymorphism', 'One type, many behaviours (override).'],
      ['Abstraction', 'Show what, hide how (interface, abstract).'],
    ]),
    tapbug('error: method does not override or implement a method from a supertype', ['class ACCoach extends Coach {', '    @Override', '    int seat() { return 64; }', '}'], [[3, 'seat()', 'seats()']], '@Override caught a typo: the name must match the parent’s method.'),
    check('Can a Java class extend two classes?', ['No, but it can implement many interfaces', 'Yes', 'Only abstract ones', 'Only with super'], 'One parent class.', 'Single inheritance.', { mono: false }),
    recap([
      ['🧬', 'extends reuses; @Override changes'],
      ['🔁', 'A parent variable can hold any child'],
      ['🤝', 'interface: a promise many classes keep'],
    ]),
  ]),

  challenge('jv-i-10-ch', 'Module 10 Challenge', { icon: '🧬', name: 'OOP Architect' }, ['Extend classes and override methods', 'Use polymorphism', 'Write interfaces and abstract classes'], [
    mcq(1, 'Which keyword makes a child class?', ['extends', 'implements', 'inherits', 'super'], 'Classes extend.', { mono: true }),
    mcq(2, 'What does super(name) do in a constructor?', ['Runs the parent’s constructor', 'Makes a new parent', 'Calls main', 'Nothing'], 'First line.', { mono: true }),
    mcq(3, 'Coach c = new ACCoach(); c.seats() runs…', ['ACCoach’s seats()', 'Coach’s seats()', 'Both', 'Neither'], 'The object decides.'),
    mcq(4, 'How many interfaces can a class implement?', ['Many', 'One', 'Two', 'None'], 'implements A, B.'),
    mcq(5, 'Why write @Override?', ['The compiler checks you really override a method', 'It is required', 'It makes it faster', 'It hides the method'], 'Catches typos.'),
    swipe([
      ['An abstract class can be made with new', false, 'Only its children.'],
      ['A child class gets the parent’s methods', true, 'It inherits them.'],
      ['Interface methods are promises to implement', true, 'Each class fills them in.'],
      ['A class can extend two classes', false, 'One parent.'],
    ]),
    pairs([['extends', 'Child class'], ['implements', 'Keep a promise'], ['super', 'Parent'], ['abstract', 'Not complete']], 'OOP words.'),
    pickCode('Which makes Bus a kind of Vehicle?', ['class Bus extends Vehicle { }', 'class Bus implements Vehicle extends { }', 'class Bus : Vehicle { }', 'class Bus inherits Vehicle { }'], 'extends.'),
    bugTask(['interface Payable { int price(); }', 'class Meal extends Payable {', '    int price() { return 120; }', '}'], [[2, 'extends Payable', 'implements Payable'], [3, '    int price()', '    public int price()']], 'Classes implement interfaces, and interface methods are public.'),
    xray('<div class="c">$ java Main.java</div><div class="a">Coach with 64 seats</div><div class="b">170</div>', [
      ['.a', 'An overridden method', '@Override int seats() { return 64; }', ['@Override int seats() { return 64; }', 'for (Payable p : bill)', 'super(name)']],
      ['.b', 'Many classes, one promise', 'for (Payable p : bill)', ['@Override int seats() { return 64; }', 'for (Payable p : bill)', 'super(name)']],
    ]),
    arrange(['public class Main {', '    public static void main(String[] args) {', '        Animal a = new Dog();', '        System.out.println(a.sound());', '    }', '}', 'class Animal { String sound() { return "..."; } }', 'class Dog extends Animal { String sound() { return "Woof"; } }'], 'Main, main, a Dog as an Animal, print, close main, close Main, the parent, the child', ['Woof']),
  ]),

  lesson('jv-collections', 'ArrayList and HashMap', 9, [
    chat(['Arrays can’t grow. The collections in java.util can: ArrayList is a list that grows, HashMap looks up values by key.', 'They hold objects, so use Integer, Double and so on instead of int and double: List<Integer>.']),
    compare('ArrayList', [
      ['Add and read', ['import java.util.ArrayList;', '', 'ArrayList<String> order = new ArrayList<>();', 'order.add("Tea");', 'order.add("Toast");', 'order.add(0, "Soup");', 'System.out.println(order + " " + order.size() + " " + order.get(1));'], 'add, add at an index, size, get.', ['[Soup, Tea, Toast] 3 Tea']],
      ['Change and remove', ['import java.util.ArrayList;', 'import java.util.List;', '', 'List<String> order = new ArrayList<>(List.of("Tea", "Toast", "Soup"));', 'order.set(0, "Coffee");', 'order.remove("Toast");', 'System.out.println(order + " " + order.contains("Soup"));'], 'set replaces; remove takes out; contains checks.', ['[Coffee, Soup] true']],
      ['Sort numbers', ['import java.util.ArrayList;', 'import java.util.Collections;', 'import java.util.List;', '', 'List<Integer> fares = new ArrayList<>(List.of(85, 40, 120));', 'Collections.sort(fares);', 'int total = 0;', 'for (int f : fares) total += f;', 'System.out.println(fares + " total " + total);'], 'Integer, not int, inside the < >.', ['[40, 85, 120] total 245']],
    ]),
    compare('HashMap', [
      ['put and get', ['import java.util.HashMap;', '', 'HashMap<String, Integer> menu = new HashMap<>();', 'menu.put("Tea", 20);', 'menu.put("Toast", 35);', 'menu.put("Tea", 25);', 'System.out.println(menu.get("Tea") + " " + menu.size() + " " + menu.get("Cake"));'], 'A key appears once: putting it again replaces. A missing key gives null.', ['25 2 null']],
      ['Counting', ['import java.util.HashMap;', '', 'String[] orders = {"Tea", "Toast", "Tea", "Tea"};', 'HashMap<String, Integer> count = new HashMap<>();', 'for (String o : orders) count.put(o, count.getOrDefault(o, 0) + 1);', 'System.out.println(count.get("Tea") + " " + count.get("Toast"));'], 'getOrDefault gives 0 the first time.', ['3 1']],
      ['In key order', ['import java.util.TreeMap;', '', 'TreeMap<String, Integer> stock = new TreeMap<>();', 'stock.put("Toast", 8);', 'stock.put("Cake", 3);', 'stock.put("Tea", 40);', 'for (var e : stock.entrySet()) System.out.println(e.getKey() + ": " + e.getValue());'], 'A HashMap has no fixed order; a TreeMap keeps keys sorted.', ['Cake: 3', 'Tea: 40', 'Toast: 8']],
    ]),
    tapbug('error: unexpected type; required: reference, found: int', ['ArrayList<int> marks = new ArrayList<>();'], [[1, 'ArrayList<int>', 'ArrayList<Integer>']], 'Collections hold objects: use the wrapper Integer.'),
    check('What does map.get("Cake") return when there is no Cake key?', ['null', '0', 'An exception', '""'], 'Nothing there.', 'Use getOrDefault for a fallback.', { mono: true }),
    recap([
      ['📋', 'ArrayList: add, get, set, remove, size'],
      ['🗝', 'HashMap: put, get, getOrDefault, containsKey'],
      ['📦', 'Use Integer, Double… inside < >'],
    ]),
  ]),

  challenge('jv-i-11-ch', 'Module 11 Challenge', { icon: '📋', name: 'Collector' }, ['Use ArrayList', 'Look up values with HashMap', 'Pick the right collection'], [
    mcq(1, 'How do you get an ArrayList’s size?', ['list.size()', 'list.length', 'list.length()', 'size(list)'], 'A method.', { mono: true }),
    mcq(2, 'Which reads item 2 of a list?', ['list.get(2)', 'list[2]', 'list.at(2)', 'list(2)'], 'get.', { mono: true }),
    mcq(3, 'Putting a key that already exists in a HashMap…', ['Replaces its value', 'Adds a second copy', 'Throws an exception', 'Is ignored'], 'Keys are unique.'),
    mcq(4, 'Which keeps keys in sorted order?', ['TreeMap', 'HashMap', 'ArrayList', 'Array'], 'Sorted keys.', { mono: true }),
    mcq(5, 'Why List<Integer> and not List<int>?', ['Collections hold objects, not primitives', 'int is too small', 'Integer is faster', 'No reason'], 'Wrapper classes.'),
    swipe([
      ['An ArrayList can grow', true, 'Unlike an array.'],
      ['HashMap keeps keys in the order you added them', false, 'No fixed order.'],
      ['containsKey checks if a key exists', true, 'true or false.'],
      ['list.remove("Tea") removes the first "Tea"', true, 'By value.'],
    ]),
    pairs([['ArrayList', 'Growing list'], ['HashMap', 'Key → value'], ['TreeMap', 'Sorted keys'], ['Integer', 'int as an object']], 'Collections.'),
    pickCode('Which counts how often word appears?', ['count.put(word, count.getOrDefault(word, 0) + 1);', 'count.put(word, count.get(word) + 1);', 'count[word]++;', 'count.add(word);'], 'Start from 0.'),
    bugTask(['ArrayList<String> menu = new ArrayList<>();', 'menu.add("Tea");', 'System.out.println(menu[0] + menu.length);'], [[3, 'menu[0] + menu.length', 'menu.get(0) + menu.size()']], 'Lists use get and size.'),
    xray('<div class="c">$ java Main.java</div><div class="a">[Soup, Tea, Toast] 3 Tea</div><div class="b">3 1</div>', [
      ['.a', 'A list after three adds', 'order.add(0, "Soup")', ['order.add(0, "Soup")', 'count.getOrDefault(o, 0) + 1', 'new TreeMap<>()']],
      ['.b', 'Counted orders', 'count.getOrDefault(o, 0) + 1', ['order.add(0, "Soup")', 'count.getOrDefault(o, 0) + 1', 'new TreeMap<>()']],
    ]),
    arrange(['import java.util.HashMap;', 'HashMap<String, Integer> fare = new HashMap<>();', 'fare.put("Sutton", 40);', 'System.out.println(fare.get("Sutton"));'], 'import, the map, add a fare, look it up', ['40']),
  ]),

  lesson('jv-exceptions', 'Exceptions', 8, [
    chat(['When something goes wrong while a program runs, Java throws an exception. If nothing catches it, the program stops with a stack trace.', 'try runs risky code, catch handles a problem, finally always runs.']),
    compare('Catching', [
      ['try and catch', ['try {', '    int perCup = 100 / 0;', '    System.out.println(perCup);', '} catch (ArithmeticException e) {', '    System.out.println("Problem: " + e.getMessage());', '}', 'System.out.println("Still running");'], 'The catch handles it and the program carries on.', ['Problem: / by zero', 'Still running']],
      ['Bad input', ['try {', '    int seats = Integer.parseInt("four");', '} catch (NumberFormatException e) {', '    System.out.println("Not a number");', '} finally {', '    System.out.println("Done");', '}'], 'finally runs either way.', ['Not a number', 'Done']],
      ['Index', ['int[] a = {1, 2, 3};', 'try {', '    System.out.println(a[5]);', '} catch (ArrayIndexOutOfBoundsException e) {', '    System.out.println(e.getMessage());', '}'], 'Each problem has its own exception class.', ['Index 5 out of bounds for length 3']],
    ]),
    compare('Throwing your own', [
      ['throw', ['public class Main {', '    static void book(int seats, int wanted) {', '        if (wanted > seats) throw new IllegalArgumentException("Only " + seats + " seats left");', '        System.out.println("Booked " + wanted);', '    }', '', '    public static void main(String[] args) {', '        try {', '            book(5, 2);', '            book(5, 9);', '        } catch (IllegalArgumentException e) {', '            System.out.println(e.getMessage());', '        }', '    }', '}'], 'throw refuses an impossible request.', ['Booked 2', 'Only 5 seats left']],
      ['Custom exception', ['public class Main {', '    public static void main(String[] args) {', '        try {', '            throw new SoldOutException("Harbour Express");', '        } catch (SoldOutException e) {', '            System.out.println(e.getMessage() + " is sold out");', '        }', '    }', '}', '', 'class SoldOutException extends Exception {', '    SoldOutException(String train) { super(train); }', '}'], 'Extend Exception for your own kind of problem.', ['Harbour Express is sold out']],
    ]),
    reveal('Two kinds', [
      ['Checked', 'Exception (like IOException): you must catch it or say throws.'],
      ['Unchecked', 'RuntimeException (like NullPointerException): bugs to fix, catching is optional.'],
      ['throws', 'void load() throws IOException passes it to the caller.'],
      ['Order', 'Catch specific exceptions before general ones.'],
    ], { mono: true }),
    tapbug('The program stops: NumberFormatException', ['int age = Integer.parseInt(typed);'], [[1, 'int age = Integer.parseInt(typed);', 'int age; try { age = Integer.parseInt(typed); } catch (NumberFormatException e) { age = 0; }']], 'Typed text may not be a number: catch the exception.'),
    check('When does a finally block run?', ['Always, whether or not an exception happened', 'Only after an exception', 'Only without one', 'Never'], 'Clean-up.', 'Either way.', { mono: false }),
    truth([
      ['An uncaught exception stops the program', true, 'With a stack trace.'],
      ['catch (Exception e) also catches ArithmeticException', true, 'It is a kind of Exception.'],
      ['A checked exception can be ignored', false, 'Catch it or declare throws.'],
    ]),
    recap([
      ['🛟', 'try / catch / finally'],
      ['🚫', 'throw new …Exception("why")'],
      ['🏷', 'Checked: must handle; unchecked: fix the bug'],
    ]),
  ]),

  challenge('jv-i-12-ch', 'Module 12 Challenge', { icon: '🛟', name: 'Safety Net' }, ['Catch exceptions', 'Throw your own', 'Know checked from unchecked'], [
    mcq(1, 'What does 10 / 0 throw for ints?', ['ArithmeticException', 'NumberFormatException', 'NullPointerException', 'Nothing'], 'Divide by zero.', { mono: true }),
    mcq(2, 'Integer.parseInt("abc") throws…', ['NumberFormatException', 'ArithmeticException', 'IOException', 'Nothing'], 'Not a number.', { mono: true }),
    mcq(3, 'Which block always runs?', ['finally', 'catch', 'try', 'throw'], 'Clean-up.', { mono: true }),
    mcq(4, 'How do you make your own exception type?', ['class MyException extends Exception', 'new Exception class', 'throw MyException', 'interface MyException'], 'Extend it.', { mono: true }),
    mcq(5, 'IOException must be…', ['Caught or declared with throws', 'Ignored', 'Printed', 'Rethrown always'], 'It is checked.'),
    swipe([
      ['throw starts an exception', true, 'throw new …'],
      ['catch blocks run in order, first match wins', true, 'Specific first.'],
      ['NullPointerException is checked', false, 'It is unchecked.'],
      ['e.getMessage() gives the reason text', true, 'Show it to the user.'],
    ]),
    pairs([['try', 'Risky code'], ['catch', 'Handle'], ['finally', 'Always'], ['throw', 'Raise']], 'Exceptions.'),
    pickCode('Which refuses a negative fare?', ['if (fare < 0) throw new IllegalArgumentException("Fare can’t be negative");', 'if (fare < 0) catch new Exception();', 'if (fare < 0) return Exception;', 'throw if (fare < 0);'], 'throw new.'),
    bugTask(['try {', '    int n = Integer.parseInt("x");', '} catch (ArithmeticException e) {', '    System.out.println("Bad");', '}'], [[3, 'ArithmeticException', 'NumberFormatException']], 'Catch the exception that is really thrown.'),
    xray('<div class="c">$ java Main.java</div><div class="a">Problem: / by zero</div><div class="b">Only 5 seats left</div>', [
      ['.a', 'A caught division', 'catch (ArithmeticException e)', ['catch (ArithmeticException e)', 'throw new IllegalArgumentException(…)', 'finally']],
      ['.b', 'A refused booking', 'throw new IllegalArgumentException(…)', ['catch (ArithmeticException e)', 'throw new IllegalArgumentException(…)', 'finally']],
    ]),
    arrange(['try {', '    int[] a = new int[2];', '    a[3] = 1;', '} catch (ArrayIndexOutOfBoundsException e) {', '    System.out.println("Out of range");', '}'], 'try, an array, a bad index, catch, explain, close', ['Out of range']),
  ]),
];
