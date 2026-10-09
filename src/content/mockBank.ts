// Placement question bank for timed mock tests. The first option is always the
// right one (the app shuffles them). Questions with `verify` have code whose real
// output must equal the first option: the test suite runs them to prove it.
import type { CodeLang } from './types';

export type MockTopic = 'python' | 'c' | 'java' | 'dsa' | 'sql' | 'oop' | 'dbms' | 'os' | 'networks';

export type MockQuestion = {
  id: string;
  topic: MockTopic;
  prompt: string;
  lang?: CodeLang;
  code?: string[];
  options: [string, string, string, string];
  explain: string;
  /** The code's printed output equals options[0]. C snippets without main() are wrapped in one. */
  verify?: boolean;
};

export const TOPIC_LABEL: Record<MockTopic, string> = {
  python: 'Python',
  c: 'C',
  java: 'Java',
  dsa: 'DSA',
  sql: 'SQL',
  oop: 'OOP',
  dbms: 'DBMS',
  os: 'Operating systems',
  networks: 'Networks',
};

/** Which track to practise when a topic is weak. */
export const TOPIC_TRACK: Record<MockTopic, string> = {
  python: 'python',
  c: 'c',
  java: 'java',
  dsa: 'dsa',
  sql: 'sql',
  oop: 'java',
  dbms: 'sql',
  os: 'placement',
  networks: 'placement',
};

const Q = (q: MockQuestion) => q;
const out = (id: string, topic: MockTopic, lang: CodeLang, code: string[], options: MockQuestion['options'], explain: string) =>
  Q({ id, topic, prompt: 'What is the output?', lang, code, options, explain, verify: true });

export const MOCK_BANK: MockQuestion[] = [
  /* ---------------- Python ---------------- */
  out('py1', 'python', 'python', ['print(3 * "ab")'], ['ababab', 'ab3', '6', 'Error'], 'Multiplying a string repeats it.'),
  out('py2', 'python', 'python', ['x = [1, 2, 3]', 'y = x', 'y.append(4)', 'print(len(x))'], ['4', '3', '7', 'Error'], 'y = x shares the same list, so x grows too.'),
  out('py3', 'python', 'python', ['print(7 // 2, 7 % 2)'], ['3 1', '3.5 1', '3 0', '4 1'], '// is floor division, % is the remainder.'),
  out('py4', 'python', 'python', ['print(2 ** 3 ** 2)'], ['512', '64', '36', '12'], '** is right-associative: 3 ** 2 = 9 first, then 2 ** 9.'),
  out('py5', 'python', 'python', ['s = "placement"', 'print(s[2:5])'], ['ace', 'acem', 'lac', 'cem'], 'Slicing takes indexes 2, 3 and 4.'),
  out('py6', 'python', 'python', ['print(bool("False"))'], ['True', 'False', 'Error', 'None'], 'Any non-empty string is truthy, even "False".'),
  out('py7', 'python', 'python', ['d = {"a": 1}', 'd["b"] = 2', 'd["a"] = 5', 'print(len(d))'], ['2', '3', '1', '5'], 'Assigning to an existing key updates it; only "b" is new.'),
  out('py8', 'python', 'python', ['print([i * i for i in range(4)])'], ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 1, 2, 3]', '[0, 2, 4, 6]'], 'range(4) is 0 to 3, each squared.'),
  out('py9', 'python', 'python', ['def f(x, y=2):', '    return x * y', 'print(f(3), f(3, 3))'], ['6 9', '6 6', '9 9', 'Error'], 'The default y = 2 is used only when y is not passed.'),
  out('py10', 'python', 'python', ['print(len(set([1, 1, 2, 3, 3])))'], ['3', '5', '2', '4'], 'A set keeps only unique values: 1, 2, 3.'),
  out('py11', 'python', 'python', ['print("Hello"[::-1])'], ['olleH', 'Hello', 'H', 'Error'], 'A step of -1 reverses the string.'),
  out('py12', 'python', 'python', ['print(10 / 4)'], ['2.5', '2', '2.0', '3'], '/ always gives a float in Python 3.'),
  out('py13', 'python', 'python', ['x = 5', 'x += 3', 'x *= 2', 'print(x)'], ['16', '13', '11', '10'], '5 + 3 = 8, then 8 × 2 = 16.'),
  out('py14', 'python', 'python', ['print("a,b,,c".split(","))'], ["['a', 'b', '', 'c']", "['a', 'b', 'c']", "['a,b,,c']", "['a', 'b', ',', 'c']"], 'Two commas in a row give an empty string between them.'),
  out('py15', 'python', 'python', ['print(max("apple"))'], ['p', 'e', 'a', 'apple'], 'max compares characters; "p" has the highest code.'),
  out('py16', 'python', 'python', ['i = 0', 'while i < 3:', '    i += 1', 'print(i)'], ['3', '2', '4', '0'], 'The loop stops once i reaches 3.'),
  out('py17', 'python', 'python', ['print(type(1 / 1).__name__)'], ['float', 'int', 'number', 'double'], 'Division with / returns a float, even for whole results.'),
  out('py18', 'python', 'python', ['print(list(range(10, 0, -3)))'], ['[10, 7, 4, 1]', '[10, 7, 4]', '[9, 6, 3]', '[10, 7, 4, 1, -2]'], 'Count down by 3 while staying above 0.'),
  out('py19', 'python', 'python', ['t = (1, 2, 3)', 'a, *b = t', 'print(b)'], ['[2, 3]', '(2, 3)', '2', 'Error'], 'Starred unpacking always collects into a list.'),
  out('py20', 'python', 'python', ['print(sorted([3, 1, 2], reverse=True))'], ['[3, 2, 1]', '[1, 2, 3]', '[3, 1, 2]', 'None'], 'reverse=True sorts from high to low.'),

  /* ---------------- C ---------------- */
  out('c1', 'c', 'c', ['int x = 10;', 'printf("%d", x / 3);'], ['3', '3.33', '3.0', '4'], 'Integer division drops the decimal part.'),
  out('c2', 'c', 'c', ['int a = 7, b = 2;', 'printf("%.1f", (float) a / b);'], ['3.5', '3.0', '3', '4.0'], 'Casting a to float makes the division a float division.'),
  out('c3', 'c', 'c', ['char s[] = "hello";', 'printf("%d", (int) sizeof(s));'], ['6', '5', '4', '8'], 'sizeof counts the hidden \\0 terminator too.'),
  out('c4', 'c', 'c', ['int i;', 'for (i = 0; i < 5; i++);', 'printf("%d", i);'], ['5', '01234', '4', '0'], 'The ; after the for makes an empty loop; printf runs once after it.'),
  out('c5', 'c', 'c', ['int x = 5;', 'if (x = 0) printf("A");', 'else printf("B");'], ['B', 'A', 'AB', 'Error'], 'x = 0 assigns 0, which is false.'),
  out('c6', 'c', 'c', ['int a[] = {10, 20, 30};', 'int *p = a;', 'printf("%d", *(p + 1));'], ['20', '10', '11', '30'], 'p + 1 points at the second element.'),
  out('c7', 'c', 'c', ['printf("%d", 5 > 3 && 2 > 4);'], ['0', '1', 'true', 'false'], 'The second comparison is false, so && gives 0.'),
  out('c8', 'c', 'c', ['int x = 3;', 'printf("%d", x << 2);'], ['12', '6', '9', '32'], 'Shifting left by 2 multiplies by 4.'),
  out('c9', 'c', 'c', ['int n = 0;', 'for (int i = 1; i <= 10; i += 3) n++;', 'printf("%d", n);'], ['4', '3', '10', '5'], 'i takes 1, 4, 7 and 10.'),
  out('c10', 'c', 'c', ['printf("%d", 17 % 5 * 2);'], ['4', '1', '7', '2'], '% and * have equal precedence, left to right: 2 × 2.'),
  out('c11', 'c', 'c', ['int x = 5;', 'int y = x-- - 2;', 'printf("%d %d", x, y);'], ['4 3', '5 3', '4 2', '5 2'], 'x-- uses 5 first, then decreases x to 4.'),
  out('c12', 'c', 'c', ["char c = 'A' + 2;", 'printf("%c", c);'], ['C', 'B', '67', 'A2'], "'A' is 65, so 67 is 'C'."),
  out('c13', 'c', 'c', ['int a = 10;', '{', '    int a = 20;', '}', 'printf("%d", a);'], ['10', '20', '30', 'Error'], 'The inner a only exists inside its block.'),
  out('c14', 'c', 'c', ['int k = 2;', 'switch (k) {', '    case 1: printf("1");', '    case 2: printf("2");', '    case 3: printf("3"); break;', '    default: printf("D");', '}'], ['23', '2', '23D', '123'], 'Without break, case 2 falls through into case 3.'),
  out('c15', 'c', 'c', ['printf("%d", (int) strlen("code\\0yatra"));'], ['4', '10', '9', '5'], 'strlen stops at the first \\0.'),
  out('c16', 'c', 'c', ['int x = 7;', 'printf("%d", x & 3);'], ['3', '7', '1', '4'], '0111 & 0011 = 0011.'),
  out('c17', 'c', 'c', ['int a = 1;', 'while (a < 100) a *= 3;', 'printf("%d", a);'], ['243', '81', '100', '99'], '1, 3, 9, 27, 81, then 243 ends the loop.'),
  out('c18', 'c', 'c', ['#include <stdio.h>', 'void count() {', '    static int c = 0;', '    c++;', '    printf("%d ", c);', '}', 'int main() {', '    count(); count(); count();', '    return 0;', '}'], ['1 2 3', '1 1 1', '0 1 2', '3 3 3'], 'A static local keeps its value between calls.'),
  out('c19', 'c', 'c', ['int x = 10, y = 20;', 'x = x + y;', 'y = x - y;', 'x = x - y;', 'printf("%d %d", x, y);'], ['20 10', '10 20', '30 10', '20 20'], 'The classic swap without a temporary variable.'),
  out('c20', 'c', 'c', ['int m[2][2] = {{1, 2}, {3, 4}};', 'printf("%d", m[1][0]);'], ['3', '2', '4', '1'], 'Row 1, column 0.'),

  /* ---------------- Java (traced by hand: no Java compiler in CI) ---------------- */
  Q({ id: 'jv1', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['System.out.println(10 / 3 * 3);'], options: ['9', '10', '9.99', '10.0'], explain: '10 / 3 is 3 (int division), then 3 × 3 = 9.' }),
  Q({ id: 'jv2', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['String s = "Java";', "System.out.println(s.length() + s.charAt(0));"], options: ['78', '4J', 'J4', 'Error'], explain: "int + char is numeric addition: 4 + 'J' (74) = 78." }),
  Q({ id: 'jv3', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['int[] a = new int[3];', 'System.out.println(a[1]);'], options: ['0', 'null', 'Garbage value', 'Error'], explain: 'int arrays are filled with 0 by default.' }),
  Q({ id: 'jv4', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['System.out.println("A" + 1 + 2);'], options: ['A12', 'A3', '3A', 'Error'], explain: 'Once a String starts the expression, + joins text left to right.' }),
  Q({ id: 'jv5', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['System.out.println(1 + 2 + "A");'], options: ['3A', '12A', 'A3', 'Error'], explain: '1 + 2 is added as numbers first, then joined with "A".' }),
  Q({ id: 'jv6', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['String a = "hi";', 'String b = new String("hi");', 'System.out.println(a.equals(b));'], options: ['true', 'false', 'Error', 'hi'], explain: 'equals compares the text, which is the same.' }),
  Q({ id: 'jv7', topic: 'java', prompt: 'Which of these is not a primitive type in Java?', options: ['String', 'int', 'boolean', 'char'], explain: 'String is a class; the other three are primitives.' }),
  Q({ id: 'jv8', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['int x = 5;', 'System.out.println(x++ * 2 + x);'], options: ['16', '15', '17', '12'], explain: 'x++ gives 5 (then x is 6): 5 × 2 + 6 = 16.' }),
  Q({ id: 'jv9', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['StringBuilder sb = new StringBuilder("abc");', 'sb.reverse();', 'System.out.println(sb);'], options: ['cba', 'abc', 'Error', 'cab'], explain: 'StringBuilder is mutable, so reverse() changes it in place.' }),
  Q({ id: 'jv10', topic: 'java', prompt: 'Which keyword stops a class from being extended?', options: ['final', 'static', 'private', 'abstract'], explain: 'A final class cannot have subclasses.' }),
  Q({ id: 'jv11', topic: 'java', prompt: 'Method overloading is an example of…', options: ['Compile-time polymorphism', 'Run-time polymorphism', 'Encapsulation', 'Inheritance'], explain: 'The compiler picks the overload from the argument types.' }),
  Q({ id: 'jv12', topic: 'java', prompt: 'Which collection never stores duplicates?', options: ['HashSet', 'ArrayList', 'LinkedList', 'Array'], explain: 'Sets keep unique elements only.' }),
  Q({ id: 'jv13', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ["char c = 'a';", 'c += 1;', 'System.out.println(c);'], options: ['b', '98', 'a1', 'Error'], explain: 'Compound assignment keeps the char type, so it prints b.' }),
  Q({ id: 'jv14', topic: 'java', prompt: 'What is the output?', lang: 'java', code: ['System.out.println(Math.max(3, 7) % 4);'], options: ['3', '1', '7', '0'], explain: 'max is 7, and 7 % 4 = 3.' }),
  Q({ id: 'jv15', topic: 'java', prompt: 'Which exception is thrown for a[5] when a has length 5?', options: ['ArrayIndexOutOfBoundsException', 'NullPointerException', 'ArithmeticException', 'No exception'], explain: 'Valid indexes are 0 to 4.' }),

  /* ---------------- DSA ---------------- */
  Q({ id: 'dsa1', topic: 'dsa', prompt: 'Worst-case time of quicksort?', options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], explain: 'Bad pivots (e.g. sorted input) split unevenly every time.' }),
  Q({ id: 'dsa2', topic: 'dsa', prompt: 'Breadth-first search uses which data structure?', options: ['Queue', 'Stack', 'Heap', 'Hash table'], explain: 'BFS visits nodes level by level, first in, first out.' }),
  Q({ id: 'dsa3', topic: 'dsa', prompt: 'Depth-first search can be written with…', options: ['A stack (or recursion)', 'A queue', 'A heap', 'Only arrays'], explain: 'DFS goes deep first: last in, first out.' }),
  Q({ id: 'dsa4', topic: 'dsa', prompt: 'Fastest way to search a sorted array?', options: ['Binary search, O(log n)', 'Linear search, O(n)', 'Bubble sort first', 'Hash every element'], explain: 'Halving the range each step gives O(log n).' }),
  Q({ id: 'dsa5', topic: 'dsa', prompt: 'An in-order traversal of a binary search tree gives…', options: ['The values in sorted order', 'The root first', 'Reverse order', 'Random order'], explain: 'Left subtree, node, right subtree visits values smallest to largest.' }),
  Q({ id: 'dsa6', topic: 'dsa', prompt: 'Average lookup time in a hash table?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], explain: 'Hashing jumps straight to the bucket.' }),
  Q({ id: 'dsa7', topic: 'dsa', prompt: 'Extra space used by merge sort on an array?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], explain: 'Merging needs a temporary array.' }),
  Q({ id: 'dsa8', topic: 'dsa', prompt: "Dijkstra's algorithm can give wrong answers when the graph has…", options: ['Negative edge weights', 'Cycles', 'More than 100 nodes', 'Undirected edges'], explain: 'It assumes a settled distance never gets smaller.' }),
  Q({ id: 'dsa9', topic: 'dsa', prompt: 'The top of a min-heap holds…', options: ['The smallest element', 'The largest element', 'The newest element', 'The median'], explain: 'Every parent is smaller than its children.' }),
  Q({ id: 'dsa10', topic: 'dsa', prompt: 'How do you detect a cycle in a linked list with O(1) space?', options: ["Floyd's slow and fast pointers", 'Store every node in a set', 'Sort the list', 'Reverse the list twice'], explain: 'If the fast pointer ever meets the slow one, there is a cycle.' }),
  Q({ id: 'dsa11', topic: 'dsa', prompt: 'A tree with n nodes has how many edges?', options: ['n − 1', 'n', 'n + 1', '2n'], explain: 'Every node except the root has exactly one parent edge.' }),
  Q({ id: 'dsa12', topic: 'dsa', prompt: 'Dynamic programming works when a problem has…', options: ['Overlapping subproblems and optimal substructure', 'Only one solution', 'No recursion', 'Sorted input'], explain: 'Reuse answers to repeated subproblems.' }),
  Q({ id: 'dsa13', topic: 'dsa', prompt: 'Which sorting algorithm is stable?', options: ['Merge sort', 'Quicksort', 'Heap sort', 'Selection sort'], explain: 'Merge sort keeps equal elements in their original order.' }),
  out('dsa14', 'dsa', 'python', ['from collections import deque', 'q = deque([1, 2, 3])', 'q.rotate(1)', 'print(list(q))'], ['[3, 1, 2]', '[2, 3, 1]', '[1, 2, 3]', '[3, 2, 1]'], 'rotate(1) moves the last element to the front.'),
  out('dsa15', 'dsa', 'python', ['def fib(n):', '    return n if n < 2 else fib(n - 1) + fib(n - 2)', 'print(fib(10))'], ['55', '89', '34', '10'], '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.'),
  out('dsa16', 'dsa', 'python', ['import heapq', 'h = [5, 1, 8, 3]', 'heapq.heapify(h)', 'print(heapq.heappop(h), heapq.heappop(h))'], ['1 3', '5 1', '1 5', '8 5'], 'heappop always removes the smallest.'),
  Q({ id: 'dsa17', topic: 'dsa', prompt: 'Cost of inserting at the start of an array of n items?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], explain: 'Every existing element shifts one place.' }),
  out('dsa18', 'dsa', 'python', ['print(sum(1 for i in range(1, 101) if i % 3 == 0))'], ['33', '34', '30', '100'], 'Multiples of 3 up to 100: 3, 6, …, 99.'),
  Q({ id: 'dsa19', topic: 'dsa', prompt: 'Best data structure for an "undo" feature?', options: ['Stack', 'Queue', 'Graph', 'Set'], explain: 'The last action is undone first.' }),
  Q({ id: 'dsa20', topic: 'dsa', prompt: 'Time to build a heap from n elements (heapify)?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'], explain: 'Bottom-up heapify is linear.' }),

  /* ---------------- SQL (on the sample railway database) ---------------- */
  Q({ id: 'sql1', topic: 'sql', prompt: 'On our trains table, what does this return?', lang: 'sql', code: ["SELECT COUNT(*) FROM trains WHERE to_city = 'Delhi';"], options: ['3', '2', '6', '1'], explain: 'Rajdhani, Karnataka Express and Howrah Rajdhani go to Delhi.', verify: true }),
  Q({ id: 'sql2', topic: 'sql', prompt: 'On our trains table, what does this return?', lang: 'sql', code: ['SELECT MAX(fare) - MIN(fare) FROM trains;'], options: ['2250', '3100', '850', '1950'], explain: '3100 − 850.', verify: true }),
  Q({ id: 'sql3', topic: 'sql', prompt: 'On our bookings table, what does this return?', lang: 'sql', code: ['SELECT COUNT(DISTINCT passenger) FROM bookings;'], options: ['4', '5', '3', '9'], explain: 'Asha booked twice; the distinct names are Asha, Ravi, Kabir and Meera.', verify: true }),
  Q({ id: 'sql4', topic: 'sql', prompt: 'On our bookings table, what does this return?', lang: 'sql', code: ["SELECT SUM(seats) FROM bookings WHERE passenger = 'Asha';"], options: ['4', '2', '1', '9'], explain: 'Asha has two bookings of 2 seats each.', verify: true }),
  Q({ id: 'sql5', topic: 'sql', prompt: 'On our trains table, what does this return?', lang: 'sql', code: ['SELECT name FROM trains ORDER BY seats DESC LIMIT 1;'], options: ['Coimbatore Express', 'Vande Bharat', 'Shatabdi', 'Rajdhani'], explain: 'Coimbatore Express has the most seats left, 60.', verify: true }),
  Q({ id: 'sql6', topic: 'sql', prompt: 'Which clause filters groups after GROUP BY?', options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'], explain: 'WHERE filters rows before grouping; HAVING filters groups.' }),
  Q({ id: 'sql7', topic: 'sql', prompt: 'Which command removes a table and its structure?', options: ['DROP', 'DELETE', 'TRUNCATE', 'REMOVE'], explain: 'DELETE and TRUNCATE remove rows but keep the table.' }),
  Q({ id: 'sql8', topic: 'sql', prompt: 'On our trains table, what does this return?', lang: 'sql', code: ['SELECT COUNT(*) FROM trains WHERE fare BETWEEN 1200 AND 2100;'], options: ['3', '2', '4', '1'], explain: 'BETWEEN includes both ends: 1200, 1750 and 2100.', verify: true }),
  Q({ id: 'sql9', topic: 'sql', prompt: 'On our tables, what does this return?', lang: 'sql', code: ['SELECT COUNT(*) FROM bookings b', 'JOIN trains t ON b.train_id = t.id', "WHERE t.to_city = 'Delhi';"], options: ['3', '2', '5', '1'], explain: 'Two bookings on Rajdhani and one on Karnataka Express.', verify: true }),
  Q({ id: 'sql10', topic: 'sql', prompt: 'Which of these is a DDL command?', options: ['CREATE', 'SELECT', 'INSERT', 'UPDATE'], explain: 'DDL defines structure: CREATE, ALTER, DROP.' }),
  Q({ id: 'sql11', topic: 'sql', prompt: 'On our trains table, what does this return?', lang: 'sql', code: ["SELECT COUNT(*) FROM trains WHERE name LIKE '%Express';"], options: ['2', '6', '1', '0'], explain: 'Karnataka Express and Coimbatore Express.', verify: true }),
  Q({ id: 'sql12', topic: 'sql', prompt: 'Can a primary key column contain NULL?', options: ['No, it must be unique and not null', 'Yes, once', 'Yes, many times', 'Only in MySQL'], explain: 'A primary key identifies every row, so it can never be missing.' }),

  /* ---------------- OOP ---------------- */
  Q({ id: 'oop1', topic: 'oop', prompt: 'Bundling data with the methods that use it is called…', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], explain: 'Encapsulation keeps data and behaviour together, behind an interface.' }),
  Q({ id: 'oop2', topic: 'oop', prompt: 'Can you create an object of an abstract class directly?', options: ['No', 'Yes', 'Only with new', 'Only in Python'], explain: 'Abstract classes exist to be extended.' }),
  Q({ id: 'oop3', topic: 'oop', prompt: 'What is the return type of a constructor?', options: ['It has none', 'void', 'The class name', 'Object'], explain: 'Constructors do not declare a return type at all.' }),
  Q({ id: 'oop4', topic: 'oop', prompt: 'Java avoids multiple inheritance of classes. How do you get similar behaviour?', options: ['Implement several interfaces', 'Extend two classes', 'Use static methods', 'It is impossible'], explain: 'A class can implement many interfaces.' }),
  Q({ id: 'oop5', topic: 'oop', prompt: 'Inside a method, "this" refers to…', options: ['The current object', 'The parent class', 'The method', 'The previous object'], explain: 'this is the object the method was called on.' }),
  Q({ id: 'oop6', topic: 'oop', prompt: 'Run-time polymorphism is achieved with…', options: ['Method overriding', 'Method overloading', 'Constructors', 'Static methods'], explain: 'The JVM picks the overriding method from the real object type.' }),
  Q({ id: 'oop7', topic: 'oop', prompt: 'Which access modifier makes a member visible only inside its class?', options: ['private', 'protected', 'public', 'default'], explain: 'private is the most restrictive.' }),
  Q({ id: 'oop8', topic: 'oop', prompt: 'Showing what an object does while hiding how is…', options: ['Abstraction', 'Inheritance', 'Overloading', 'Recursion'], explain: 'Abstraction exposes only the essentials.' }),

  /* ---------------- DBMS ---------------- */
  Q({ id: 'db1', topic: 'dbms', prompt: 'In ACID, the "A" stands for…', options: ['Atomicity', 'Availability', 'Accuracy', 'Authorization'], explain: 'A transaction happens completely or not at all.' }),
  Q({ id: 'db2', topic: 'dbms', prompt: 'The main goal of normalisation is to…', options: ['Reduce redundancy', 'Speed up every query', 'Add more tables', 'Encrypt data'], explain: 'Store each fact once so data cannot go out of sync.' }),
  Q({ id: 'db3', topic: 'dbms', prompt: 'Second normal form (2NF) removes…', options: ['Partial dependencies', 'Transitive dependencies', 'Repeating groups', 'Primary keys'], explain: '2NF needs every non-key column to depend on the whole key.' }),
  Q({ id: 'db4', topic: 'dbms', prompt: 'A foreign key…', options: ["References another table's primary key", 'Must be unique', 'Cannot repeat', 'Is always an integer'], explain: 'It links rows between tables.' }),
  Q({ id: 'db5', topic: 'dbms', prompt: 'Why add an index to a column?', options: ['To speed up lookups on it', 'To save disk space', 'To allow NULLs', 'To encrypt it'], explain: 'Indexes speed up reads at a small cost to writes.' }),
  Q({ id: 'db6', topic: 'dbms', prompt: 'A "dirty read" means reading…', options: ['Data another transaction has not committed', 'Deleted data', 'Encrypted data', 'Duplicate rows'], explain: 'The other transaction might still roll back.' }),
  Q({ id: 'db7', topic: 'dbms', prompt: 'In an ER diagram, a diamond represents…', options: ['A relationship', 'An entity', 'An attribute', 'A key'], explain: 'Rectangles are entities, ovals attributes, diamonds relationships.' }),
  Q({ id: 'db8', topic: 'dbms', prompt: 'Two transactions each waiting for the other to release a lock is a…', options: ['Deadlock', 'Race condition', 'Rollback', 'Checkpoint'], explain: 'Neither can continue without the other.' }),

  /* ---------------- Operating systems ---------------- */
  Q({ id: 'os1', topic: 'os', prompt: 'Threads of the same process share…', options: ['Its memory (code, data, heap)', 'Their stacks', 'Their registers', 'Nothing'], explain: 'Each thread has its own stack and registers but shares the process memory.' }),
  Q({ id: 'os2', topic: 'os', prompt: 'How many conditions must hold for a deadlock (Coffman)?', options: ['4', '2', '3', '5'], explain: 'Mutual exclusion, hold and wait, no preemption, circular wait.' }),
  Q({ id: 'os3', topic: 'os', prompt: 'Paging mainly solves…', options: ['External fragmentation', 'Internal fragmentation', 'Deadlocks', 'Slow disks'], explain: 'Fixed-size pages fit into any free frame.' }),
  Q({ id: 'os4', topic: 'os', prompt: 'Round-robin scheduling gives each process…', options: ['A fixed time quantum in turn', 'The CPU until it finishes', 'Priority by size', 'Random time slices'], explain: 'Processes take turns for a time slice.' }),
  Q({ id: 'os5', topic: 'os', prompt: 'A semaphore is used for…', options: ['Synchronising processes', 'Storing files', 'Scheduling disks', 'Network routing'], explain: 'It controls access to shared resources.' }),
  Q({ id: 'os6', topic: 'os', prompt: 'Virtual memory lets a system…', options: ['Run programs larger than physical RAM', 'Make RAM faster', 'Avoid using the disk', 'Remove the need for an OS'], explain: 'Pages not in use live on disk.' }),
  Q({ id: 'os7', topic: 'os', prompt: 'A context switch means…', options: ['Saving one process state and loading another', 'Changing the user', 'Restarting the OS', 'Moving a file'], explain: 'The CPU switches between processes.' }),
  Q({ id: 'os8', topic: 'os', prompt: 'Thrashing happens when…', options: ['The system spends most time swapping pages', 'The CPU overheats', 'The disk is full', 'Too few processes run'], explain: 'Too little memory causes constant page faults.' }),

  /* ---------------- Networks ---------------- */
  Q({ id: 'net1', topic: 'networks', prompt: 'Default port for HTTPS?', options: ['443', '80', '21', '8080'], explain: 'HTTP uses 80; HTTPS uses 443.' }),
  Q({ id: 'net2', topic: 'networks', prompt: 'DNS converts…', options: ['Domain names into IP addresses', 'IP addresses into MAC addresses', 'HTTP into HTTPS', 'Files into packets'], explain: 'It is the internet’s phone book.' }),
  Q({ id: 'net3', topic: 'networks', prompt: 'Which protocol guarantees ordered, reliable delivery?', options: ['TCP', 'UDP', 'IP', 'ICMP'], explain: 'TCP retransmits and orders packets; UDP does not.' }),
  Q({ id: 'net4', topic: 'networks', prompt: 'How many layers does the OSI model have?', options: ['7', '4', '5', '6'], explain: 'Physical up to application.' }),
  Q({ id: 'net5', topic: 'networks', prompt: 'How many bits are in an IPv4 address?', options: ['32', '64', '128', '16'], explain: 'IPv6 uses 128 bits.' }),
  Q({ id: 'net6', topic: 'networks', prompt: 'HTTP status 404 means…', options: ['Not found', 'Server error', 'Unauthorized', 'OK'], explain: '500 is a server error, 401 unauthorized.' }),
  Q({ id: 'net7', topic: 'networks', prompt: 'Routers work at which OSI layer?', options: ['Network (layer 3)', 'Data link (layer 2)', 'Transport (layer 4)', 'Physical (layer 1)'], explain: 'Routers forward packets by IP address.' }),
];

export type MockKind = 'full' | MockTopic;

export const MOCK_TESTS: { kind: MockKind; title: string; sub: string; count: number; minutes: number; topics: MockTopic[] }[] = [
  { kind: 'full', title: 'Full placement mock', sub: 'All topics, like a real campus test', count: 20, minutes: 30, topics: ['python', 'c', 'java', 'dsa', 'sql', 'oop', 'dbms', 'os', 'networks'] },
  { kind: 'dsa', title: 'DSA round', sub: 'Complexity, structures and algorithms', count: 10, minutes: 15, topics: ['dsa'] },
  { kind: 'c', title: 'C output round', sub: 'The written-test classics', count: 10, minutes: 15, topics: ['c'] },
  { kind: 'python', title: 'Python round', sub: 'Outputs and core concepts', count: 10, minutes: 15, topics: ['python'] },
  { kind: 'java', title: 'Java round', sub: 'Outputs, OOP and collections', count: 10, minutes: 15, topics: ['java', 'oop'] },
  { kind: 'sql', title: 'SQL and DBMS round', sub: 'Queries, keys and transactions', count: 10, minutes: 15, topics: ['sql', 'dbms'] },
  { kind: 'os', title: 'CS fundamentals', sub: 'OS and networks', count: 10, minutes: 12, topics: ['os', 'networks'] },
];

/** Picks a test's questions, spread evenly across its topics, in random order. */
export function buildMock(kind: MockKind, random: () => number = Math.random): MockQuestion[] {
  const test = MOCK_TESTS.find((t) => t.kind === kind) ?? MOCK_TESTS[0];
  const shuffle = <T,>(xs: T[]) => xs.map((x) => [random(), x] as const).sort((a, b) => a[0] - b[0]).map(([, x]) => x);
  const pools = test.topics.map((t) => shuffle(MOCK_BANK.filter((q) => q.topic === t)));
  const picked: MockQuestion[] = [];
  for (let round = 0; picked.length < test.count && pools.some((p) => p.length > round); round++) {
    for (const pool of pools) if (pool[round] && picked.length < test.count) picked.push(pool[round]);
  }
  return shuffle(picked);
}
