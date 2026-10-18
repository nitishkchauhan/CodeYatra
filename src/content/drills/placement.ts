// Extra practice for each Placement Prep module. Predicts run in tests (Python and C).
import { bug, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · PLACEMENT';

export const PLACEMENT_DRILLS: Record<string, Step[]> = {
  'pl-fizzbuzz': [
    quiz({ prompt: 'What is the first thing to do when you read a coding question?', options: ['Restate it and work a small example by hand', 'Start typing code', 'Look up the answer', 'Pick the fastest algorithm'], right: 'Right. Understanding first saves time later.', wrong: 'Understand it and try an example before you code.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['n = 15', 'print("FizzBuzz" if n % 15 == 0 else "Fizz" if n % 3 == 0 else n)'], answer: 'FizzBuzz', explain: '15 % 15 is 0, so the first branch wins.' }),
    quiz({ prompt: 'The question says “print each number on a new line”. You print them space-separated. What happens?', options: ['The hidden tests fail even though the logic is right', 'It passes', 'Partial marks always', 'The platform fixes it'], right: 'Right. Formats are checked exactly.', wrong: 'Online judges compare output exactly, including line breaks.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This reads two numbers and prints their sum, but crashes. Tap the buggy line.', lang: 'python', lines: ['a, b = input().split()', 'print(a + b)'], bug: 0, fix: 'a, b = map(int, input().split())', explain: 'input() gives text. Convert to int, or "2" + "3" becomes "23".' }),
  ],
  'pl-reverse': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['s = "coding"', 'print(s[::2], s[::-2])'], answer: 'cdn gio', explain: 'Every second character from the start, then from the end.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print(sum(1 for ch in "Education" if ch.lower() in "aeiou"))'], answer: '5', explain: 'E, u, a, i, o: five vowels.' }),
    quiz({ prompt: 'Which checks a palindrome ignoring case?', options: ['s.lower() == s.lower()[::-1]', 's == s[::-1]', 's.reverse() == s', 'reversed(s) == s'], right: 'Right.', wrong: 'Lowercase first, then compare with the reverse. reversed() gives an iterator, not a string.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should print the words joined by spaces. Tap the buggy line.', lang: 'python', lines: ['words = ["campus", "drive"]', 'print(words.join(" "))'], bug: 1, fix: 'print(" ".join(words))', explain: 'join is a string method: separator.join(list).' }),
  ],
  'pl-prime': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import math', 'print(math.gcd(48, 18), 48 * 18 // math.gcd(48, 18))'], answer: '6 144', explain: 'GCD 6, and LCM = 48 × 18 ÷ 6 = 144.' }),
    predict({ kicker: K, title: 'Armstrong check', lang: 'python', lines: ['n = 371', 'print(sum(int(d) ** 3 for d in str(n)) == n)'], answer: 'True', explain: '27 + 343 + 1 = 371.' }),
    quiz({ prompt: 'Is 2 prime?', options: ['Yes, the only even prime', 'No, it is even', 'No, primes start at 3', 'Only in some definitions'], right: 'Right.', wrong: '2 has exactly two divisors, 1 and 2, so it is prime.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This misses some divisors. Tap the buggy line.', lang: 'python', lines: ['def is_prime(n):', '    if n < 2:', '        return False', '    for d in range(2, int(n ** 0.5)):', '        if n % d == 0:', '            return False', '    return True'], bug: 3, fix: '    for d in range(2, int(n ** 0.5) + 1):', explain: 'range stops before its end, so √n itself (like 3 for 9) was never tested.' }),
  ],
  'pl-second': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['nums = [4, 1, 4, 3]', 'print(sorted(set(nums), reverse=True)[1])'], answer: '3', explain: 'Distinct values sorted down: 4, 3, 1. Index 1 is 3.' }),
    predict({ kicker: K, title: 'Move the zeros', lang: 'python', lines: ['a = [0, 2, 0, 5]', 'print([x for x in a if x] + [0] * a.count(0))'], answer: '[2, 5, 0, 0]', explain: 'Non-zeros keep their order; the zeros go at the end.' }),
    quiz({ prompt: 'What is the complexity of finding the second largest by sorting?', options: ['O(n log n), while one pass is O(n)', 'O(1)', 'O(n²) always', 'O(log n)'], right: 'Right. Mention the one-pass version in interviews.', wrong: 'Sorting costs O(n log n); tracking the top two costs O(n).' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The missing number from 1..5 comes out wrong. Tap the buggy line.', lang: 'python', lines: ['nums = [1, 2, 4, 5]', 'n = len(nums)', 'print(n * (n + 1) // 2 - sum(nums))'], bug: 1, fix: 'n = len(nums) + 1', explain: 'One number is missing, so n is one more than the list length.' }),
  ],
  'pl-anagram': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print(sorted("silent") == sorted("listen"))'], answer: 'True', explain: 'Both sort to e, i, l, n, s, t.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from collections import Counter', 'print(Counter([3, 1, 3, 2, 3]).most_common(1))'], answer: '[(3, 3)]', explain: '3 appears three times.' }),
    quiz({ prompt: 'Are "Dormitory" and "Dirty room" anagrams once you ignore case and spaces?', options: ['Yes', 'No', 'Only with punctuation', 'It can’t be checked'], right: 'Right. Normalise first, then count.', wrong: 'Remove spaces and lowercase both: the letter counts match.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should report a duplicate. Tap the buggy line.', lang: 'python', lines: ['seen = set()', 'for r in [4, 8, 4]:', '    seen.add(r)', '    if r in seen:', '        print("dup", r)'], bug: 2, fix: 'Check if r in seen before adding it.', explain: 'Adding first means every number is “already seen”.' }),
  ],
  'pl-pattern': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for i in range(1, 4):', '    print("#" * i + "." * (3 - i))'], answer: '#..\n##.\n###', explain: 'Row i has i hashes and 3 − i dots.' }),
    predict({ kicker: K, title: 'Floyd’s triangle', lang: 'python', lines: ['k = 1', 'for i in range(1, 4):', '    print(*range(k, k + i))', '    k += i'], answer: '1\n2 3\n4 5 6', explain: 'The counter keeps going across rows.' }),
    quiz({ prompt: 'A pyramid with 4 rows: how many stars on the last row?', options: ['7', '4', '8', '9'], right: 'Right: 2 × 4 − 1.', wrong: 'Row i has 2i − 1 stars, so row 4 has 7.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The pyramid leans to one side. Tap the buggy line.', lang: 'python', lines: ['n = 3', 'for i in range(1, n + 1):', '    print(" " * i + "*" * (2 * i - 1))'], bug: 2, fix: '    print(" " * (n - i) + "*" * (2 * i - 1))', explain: 'Spaces shrink as rows go down: n − i, not i.' }),
  ],
  'pl-matrix': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]', 'print(sum(m[i][i] for i in range(3)), sum(m[i][2 - i] for i in range(3)))'], answer: '15 15', explain: '1 + 5 + 9 and 3 + 5 + 7.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['a = [[1, 2], [3, 4]]', 'b = [[10, 20], [30, 40]]', 'print([[a[i][j] + b[i][j] for j in range(2)] for i in range(2)])'], answer: '[[11, 22], [33, 44]]', explain: 'Matrix addition adds matching cells.' }),
    quiz({ prompt: 'm has 3 rows and 4 columns. What is len(m[0])?', options: ['4', '3', '12', '0'], right: 'Right. Each row has 4 items.', wrong: 'm[0] is the first row, which has one item per column.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Setting one seat marks a whole column. Tap the buggy line.', lang: 'python', lines: ['seats = [[False] * 4] * 3', 'seats[1][2] = True'], bug: 0, fix: 'seats = [[False] * 4 for _ in range(3)]', explain: 'Repeating a list with * shares the same row.' }),
  ],
  'pl-output-py': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['x = [1, 2]', 'y = x', 'x = x + [3]', 'print(y)'], answer: '[1, 2]', explain: 'x + [3] makes a new list for x; y still points at the old one.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print(7 // -2, 7 % -2)'], answer: '-4 -1', explain: '7 / −2 = −3.5 floors to −4; the remainder takes the divisor’s sign.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print(bool([]), bool([0]), bool(""), bool("0"))'], answer: 'False True False True', explain: 'Empty containers are False; anything with an item is True, even [0] and "0".' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['a = (1)', 'b = (1,)', 'print(type(a).__name__, type(b).__name__)'], answer: 'int tuple', explain: 'Brackets alone just group. The comma makes a tuple.' }),
  ],
  'pl-output-c': [
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'int main() {', '    printf("%d %d\\n", 17 / 5, 17 % 5);', '    return 0;', '}'], answer: '3 2', explain: 'Integer division gives 3, remainder 2.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'int main() {', '    char c = \'a\';', '    printf("%c %d\\n", c + 1, c);', '    return 0;', '}'], answer: 'b 97', explain: 'Characters are numbers: \'a\' is 97, and 97 + 1 printed with %c is b.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'int main() {', '    int x = 10;', '    if (x = 0)', '        printf("zero\\n");', '    else', '        printf("not zero %d\\n", x);', '    return 0;', '}'], answer: 'not zero 0', explain: 'x = 0 assigns 0 (false), so the else runs, and x is now 0.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'c', lines: ['#include <stdio.h>', 'int main() {', '    int i = 0;', '    while (i < 5) {', '        i += 2;', '    }', '    printf("%d\\n", i);', '    return 0;', '}'], answer: '6', explain: 'i goes 0, 2, 4, 6; the loop stops when i is 6.' }),
  ],
  'pl-oops': [
    quiz({ prompt: 'Which is an example of encapsulation?', options: ['A BankAccount that changes its balance only through deposit() and withdraw()', 'A Dog class that extends Animal', 'Two classes with an area() method', 'A list of objects'], right: 'Right. The data is protected behind methods.', wrong: 'Encapsulation keeps data behind the methods that guard it.' }),
    quiz({ prompt: 'What is method overriding?', options: ['A subclass redefines a method it inherited', 'Two methods with the same name and different parameters', 'Calling a method twice', 'Deleting a method'], right: 'Right. Same name and parameters, new behaviour.', wrong: 'Overriding replaces an inherited method; overloading changes the parameters.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['class Counter:', '    count = 0', '    def __init__(self):', '        Counter.count += 1', 'Counter(); Counter(); Counter()', 'print(Counter.count)'], answer: '3', explain: 'count belongs to the class, so all objects share it.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The name is never stored. Tap the buggy line.', lang: 'python', lines: ['class Student:', '    def __init__(self, name):', '        name = name', '    def hi(self):', '        return "Hi " + self.name'], bug: 2, fix: '        self.name = name', explain: 'Store it on the object with self.name.' }),
  ],
  'pl-sql': [
    quiz({ prompt: 'Which query counts bookings per train?', options: ['SELECT train_id, COUNT(*) FROM bookings GROUP BY train_id', 'SELECT COUNT(train_id) FROM bookings', 'SELECT train_id FROM bookings WHERE COUNT(*) > 0', 'SELECT * FROM bookings ORDER BY train_id'], right: 'Right.', wrong: 'GROUP BY train_id, then COUNT(*) per group.', mono: true }),
    quiz({ prompt: 'What does COUNT(phone) count?', options: ['Rows where phone is not NULL', 'All rows', 'Distinct phones', 'NULL phones'], right: 'Right. COUNT(*) counts every row.', wrong: 'COUNT(column) skips NULLs; COUNT(*) counts all rows.', mono: true }),
    quiz({ prompt: 'What is the difference between DELETE and TRUNCATE (in databases that have TRUNCATE)?', options: ['DELETE removes chosen rows with WHERE; TRUNCATE quickly removes every row', 'They are the same', 'TRUNCATE deletes the table definition', 'DELETE can’t use WHERE'], right: 'Right. DROP removes the table itself.', wrong: 'DELETE can filter rows; TRUNCATE empties the table; DROP removes it.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should list trains with a fare above 2000. Tap the buggy line.', lang: 'sql', lines: ['SELECT name, fare', 'FROM trains', 'HAVING fare > 2000;'], bug: 2, fix: 'WHERE fare > 2000;', explain: 'Filtering single rows is WHERE’s job. HAVING is for groups.' }),
  ],
  'pl-complexity': [
    quiz({ prompt: 'Binary search on a sorted list of 1,000,000 items takes about how many steps?', options: ['20', '1,000', '500,000', '1,000,000'], right: 'Right: log₂ of a million is about 20.', wrong: 'Halving each step gives about log₂ n ≈ 20 steps.', mono: true }),
    quiz({ prompt: 'What is the space complexity of making a set of all n items?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], right: 'Right. It stores up to n items.', wrong: 'The set can hold all n items: O(n) extra space.', mono: true }),
    quiz({ prompt: 'What is O(3n² + 10n + 7) simplified?', options: ['O(n²)', 'O(3n²)', 'O(n² + n)', 'O(n)'], right: 'Right. Keep the biggest term, drop constants.', wrong: 'Drop constants and smaller terms: O(n²).', mono: true }),
    predict({ kicker: K, title: 'Count the steps', lang: 'python', lines: ['n, steps = 64, 0', 'while n > 1:', '    n //= 2', '    steps += 1', 'print(steps)'], answer: '6', explain: '64 → 32 → 16 → 8 → 4 → 2 → 1 is six halvings: log₂ 64.' }),
  ],
};
