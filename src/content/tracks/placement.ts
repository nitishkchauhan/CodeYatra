// Placement prep: the questions Indian campus drives and coding rounds ask again and again.
import { bug, lesson, predict, quiz, read } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'PLACEMENT';

const py = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang' | 'file'> & { file?: string }): EditorStep => ({
  type: 'editor',
  kicker: `CODING ROUND · ${K}`,
  lang: 'python',
  file: o.file ?? 'solution.py',
  ...o,
});

export const PLACEMENT_LESSONS: Lesson[] = [
  lesson('pl-fizzbuzz', 'FizzBuzz', 'placement', ['Check the combined case first', 'Use % for divisibility', 'Simple questions test careful thinking'], [
    read({
      kicker: `READ · ${K}`,
      title: 'The classic warm-up',
      body: 'For numbers 1 to n: print Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for both, otherwise the number. Interviewers watch whether you check "both" first.',
      lang: 'python',
      code: ['for i in range(1, 16):', '    if i % 15 == 0: print("FizzBuzz")', '    elif i % 3 == 0: print("Fizz")', '    elif i % 5 == 0: print("Buzz")', '    else: print(i)'],
      tip: 'Say your plan out loud before you code. It counts in interviews.',
    }),
    py({
      title: 'fizzbuzz(n)',
      instructions: 'Return "Fizz", "Buzz", "FizzBuzz" or the number as a string, for a single n.',
      starter: 'def fizzbuzz(n):\n    return str(n)\n',
      tests: [
        { call: 'fizzbuzz(9)', expect: '"Fizz"' },
        { call: 'fizzbuzz(10)', expect: '"Buzz"' },
        { call: 'fizzbuzz(30)', expect: '"FizzBuzz"' },
        { call: 'fizzbuzz(7)', expect: '"7"' },
      ],
      hint: 'Check n % 15 == 0 before checking 3 and 5.',
      solution: 'def fizzbuzz(n):\n    if n % 15 == 0:\n        return "FizzBuzz"\n    if n % 3 == 0:\n        return "Fizz"\n    if n % 5 == 0:\n        return "Buzz"\n    return str(n)\n',
    }),
  ]),

  lesson('pl-reverse', 'Reverse a string', 'placement', ['Slicing with [::-1] reverses', 'Interviewers may ask for a manual loop', 'Know both ways'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Two ways to reverse',
      body: 'Python can reverse with s[::-1], but interviewers often ask you to do it without built-ins: walk the string and build the result backwards.',
      lang: 'python',
      code: ['s = "yatra"', 'print(s[::-1])  # artay', '', 'out = ""', 'for ch in s:', '    out = ch + out'],
      tip: 'Mention the time complexity: O(n).',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Reverse the words',
      lang: 'python',
      lines: ['s = "learn to code"', 'print(" ".join(s.split()[::-1]))'],
      answer: 'code to learn',
      explain: 'split() gives the words, [::-1] reverses their order, join puts spaces back.',
    }),
    py({
      title: 'reverse(s) without slicing',
      instructions: 'Return s reversed. Do not use [::-1] or reversed().',
      starter: 'def reverse(s):\n    return s\n',
      tests: [
        { call: 'reverse("Delhi")', expect: '"ihleD"' },
        { call: 'reverse("")', expect: '""' },
        { call: 'reverse("ab")', expect: '"ba"' },
      ],
      hint: 'out = ""; for ch in s: out = ch + out',
      solution: 'def reverse(s):\n    out = ""\n    for ch in s:\n        out = ch + out\n    return out\n',
    }),
  ]),

  lesson('pl-prime', 'Prime check', 'placement', ['A prime has exactly two divisors', 'Check divisors only up to √n', 'Handle 0, 1 and 2 carefully'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Stop at the square root',
      body: 'If n has a divisor bigger than √n, it also has one smaller than √n. So checking 2 up to √n is enough, turning O(n) into O(√n).',
      lang: 'python',
      code: ['def is_prime(n):', '    if n < 2:', '        return False', '    i = 2', '    while i * i <= n:', '        if n % i == 0:', '            return False', '        i += 1', '    return True'],
      tip: '1 is not prime. Interviewers love that edge case.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Is 1 prime?',
      instructions: 'This says 1 is prime. Which line is wrong?',
      lang: 'python',
      lines: ['def is_prime(n):', '    if n < 1:', '        return False', '    i = 2', '    while i * i <= n:', '        if n % i == 0:', '            return False', '        i += 1', '    return True', 'print(is_prime(1))'],
      bug: 1,
      fix: '    if n < 2:',
      explain: 'Numbers below 2 (including 1) are not prime.',
    }),
    py({
      title: 'Primes up to n',
      instructions: 'primes_upto(n) returns a list of all primes ≤ n.',
      starter: 'def primes_upto(n):\n    return []\n',
      tests: [
        { call: 'primes_upto(10)', expect: '[2, 3, 5, 7]' },
        { call: 'primes_upto(1)', expect: '[]' },
        { call: 'primes_upto(2)', expect: '[2]' },
      ],
      hint: 'Write is_prime first, then collect numbers from 2 to n that pass it.',
      solution:
        'def is_prime(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True\n\ndef primes_upto(n):\n    return [x for x in range(2, n + 1) if is_prime(x)]\n',
    }),
  ]),

  lesson('pl-second', 'Second largest', 'placement', ['Track the top two in one pass', 'Duplicates of the max do not count', 'Return None when it does not exist'], [
    read({
      kicker: `READ · ${K}`,
      title: 'One pass, two trackers',
      body: 'Sorting works but is O(n log n). Instead keep the largest and second largest as you scan once. Watch out: [5, 5] has no second largest.',
      lang: 'python',
      code: ['first = second = None', 'for x in nums:', '    if first is None or x > first:', '        first, second = x, first', '    elif x != first and (second is None or x > second):', '        second = x'],
      tip: 'Always ask: can the list be empty? Can values repeat?',
    }),
    py({
      title: 'second_largest(nums)',
      instructions: 'Return the second largest distinct value, or None.',
      starter: 'def second_largest(nums):\n    return None\n',
      tests: [
        { call: 'second_largest([4, 9, 2, 9, 7])', expect: '7' },
        { call: 'second_largest([5, 5])', expect: 'None' },
        { call: 'second_largest([3])', expect: 'None' },
        { call: 'second_largest([-2, -8])', expect: '-8' },
      ],
      hint: 'Keep first and second; when x beats first, the old first becomes second.',
      solution:
        'def second_largest(nums):\n    first = second = None\n    for x in nums:\n        if first is None or x > first:\n            first, second = x, first\n        elif x != first and (second is None or x > second):\n            second = x\n    return second\n',
    }),
  ]),

  lesson('pl-anagram', 'Anagrams', 'placement', ['Anagrams have the same letter counts', 'Counting beats sorting: O(n)', 'Normalise case and spaces first'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Same letters, new order',
      body: '"listen" and "silent" are anagrams. Count each letter in both words; if the counts match, they are anagrams. collections.Counter does the counting.',
      lang: 'python',
      code: ['from collections import Counter', 'print(Counter("listen") == Counter("silent"))  # True'],
      tip: 'Sorting both strings and comparing also works, in O(n log n).',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Count letters',
      lang: 'python',
      lines: ['from collections import Counter', 'c = Counter("banana")', 'print(c["a"], c["n"], c["b"])'],
      answer: '3 2 1',
      explain: 'banana has three a, two n and one b.',
    }),
    py({
      title: 'is_anagram(a, b)',
      instructions: 'Return True if a and b are anagrams, ignoring case and spaces.',
      starter: 'def is_anagram(a, b):\n    return a == b\n',
      tests: [
        { call: 'is_anagram("Listen", "Silent")', expect: 'True' },
        { call: 'is_anagram("dormitory", "dirty room")', expect: 'True' },
        { call: 'is_anagram("code", "coder")', expect: 'False' },
      ],
      hint: 'Clean both with .replace(" ", "").lower(), then compare sorted() or Counter().',
      solution: 'def is_anagram(a, b):\n    clean = lambda s: sorted(s.replace(" ", "").lower())\n    return clean(a) == clean(b)\n',
    }),
  ]),

  lesson('pl-output-c', 'Output questions: C', 'placement', ['Integer division truncates', 'i++ vs ++i differ in value', 'Watch operator precedence'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Tricky outputs',
      body: 'Written tests love short C snippets. The usual traps: int division, post vs pre increment, and precedence (* before +).',
      lang: 'c',
      code: ['int i = 5;', 'int a = i++;   // a = 5, then i = 6', 'int b = ++i;   // i = 7, then b = 7'],
      tip: 'Trace every variable on paper, line by line.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Increment trap',
      lang: 'c',
      lines: ['#include <stdio.h>', 'int main() {', '    int i = 5;', '    int a = i++;', '    int b = ++i;', '    printf("%d %d %d\\n", a, b, i);', '    return 0;', '}'],
      answer: '5 7 7',
      explain: 'a takes 5 before i becomes 6; ++i makes i 7 and b gets 7.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Precedence',
      lang: 'c',
      lines: ['#include <stdio.h>', 'int main() {', '    int x = 2 + 3 * 4 % 5;', '    printf("%d\\n", x);', '    return 0;', '}'],
      answer: '4',
      explain: '* and % go left to right first: 3 * 4 = 12, 12 % 5 = 2, then 2 + 2 = 4.',
    }),
  ]),

  lesson('pl-output-py', 'Output questions: Python', 'placement', ['Lists are shared by reference', 'Default arguments are created once', 'Slicing makes a copy'], [
    read({
      kicker: `READ · ${K}`,
      title: 'References, not copies',
      body: 'b = a does not copy a list; both names point at the same list. a[:] or list(a) makes a real copy.',
      lang: 'python',
      code: ['a = [1, 2]', 'b = a', 'b.append(3)', 'print(a)  # [1, 2, 3]'],
      tip: 'Mutable default arguments (def f(x=[])) are a famous trap.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Shared list',
      lang: 'python',
      lines: ['a = [1, 2, 3]', 'b = a', 'c = a[:]', 'b.append(4)', 'print(len(a), len(c))'],
      answer: '4 3',
      explain: 'b is the same list as a, so a grows; c was a copy and stays at 3.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Default argument trap',
      lang: 'python',
      lines: ['def add(x, items=[]):', '    items.append(x)', '    return items', '', 'add(1)', 'print(add(2))'],
      answer: '[1, 2]',
      explain: 'The default list is created once and reused, so it still holds 1.',
    }),
  ]),

  lesson('pl-oops', 'OOP interview questions', 'placement', ['Encapsulation hides data', 'Inheritance reuses code', 'Polymorphism: same call, different behaviour'], [
    read({
      kicker: `READ · ${K}`,
      title: 'The four pillars',
      body: 'Encapsulation: keep data private and expose methods. Abstraction: show what, hide how. Inheritance: a class builds on another. Polymorphism: one method name, behaviour depends on the object.',
      lang: 'java',
      code: ['abstract class Shape { abstract double area(); }', 'class Circle extends Shape {', '    double r;', '    Circle(double r) { this.r = r; }', '    double area() { return Math.PI * r * r; }', '}'],
      tip: 'Give a real example for each pillar; interviewers remember examples.',
    }),
    quiz({
      prompt: 'Making fields private and using getters and setters is…',
      options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Recursion'],
      right: 'Encapsulation protects data behind methods.',
      wrong: 'Hiding fields behind methods is encapsulation.',
    }),
    quiz({
      prompt: 'Overriding area() in Circle and Square, then calling shape.area() is…',
      options: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Overloading'],
      right: 'The same call runs different code depending on the object.',
      wrong: 'One call, many behaviours: that is polymorphism (run-time, via overriding).',
    }),
  ]),

  lesson('pl-sql', 'SQL interview questions', 'placement', ['Second highest with a subquery', 'GROUP BY with HAVING', 'Know your JOINs'], [
    read({
      kicker: `READ · ${K}`,
      title: 'The most asked SQL question',
      body: '"Find the second highest salary." Take the max of values below the max. The same trick works for fares in our trains table.',
      lang: 'sql',
      code: ['SELECT MAX(fare) FROM trains', 'WHERE fare < (SELECT MAX(fare) FROM trains);'],
      tip: 'Also know: ORDER BY fare DESC LIMIT 1 OFFSET 1.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Second highest fare',
      lang: 'sql',
      lines: ['SELECT MAX(fare) FROM trains', 'WHERE fare < (SELECT MAX(fare) FROM trains);'],
      answer: '2900',
      explain: 'The highest is 3100; the highest below it is 2900.',
    }),
    quiz({
      prompt: 'Which JOIN keeps every row from the left table, even without a match?',
      options: ['LEFT JOIN', 'INNER JOIN', 'CROSS JOIN', 'SELF JOIN'],
      mono: true,
      right: 'LEFT JOIN keeps all left rows and fills missing right values with NULL.',
      wrong: 'INNER JOIN drops unmatched rows. LEFT JOIN keeps all rows from the left table.',
    }),
  ]),

  lesson('pl-complexity', 'Complexity questions', 'placement', ['Know the Big-O of common operations', 'Dict lookup is O(1) on average', 'Sorting is O(n log n)'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Know your costs',
      body: 'List index: O(1). Search in a list: O(n). Dict or set lookup: O(1) average. Sorting: O(n log n). Binary search: O(log n). Interviewers expect you to state the complexity of your solution.',
      lang: 'python',
      code: ['nums[5]          # O(1)', 'x in nums        # O(n)', 'x in seen_set    # O(1) average', 'sorted(nums)     # O(n log n)'],
      tip: 'Always mention both time and space complexity.',
    }),
    quiz({
      prompt: 'What is the time complexity of x in my_set?',
      options: ['O(1) on average', 'O(n)', 'O(log n)', 'O(n²)'],
      mono: true,
      right: 'Sets use hashing, so membership checks are constant time on average.',
      wrong: 'Lists need O(n), but sets hash directly to the answer: O(1) on average.',
    }),
    quiz({
      prompt: 'Merge sort runs in…',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      mono: true,
      right: 'It halves log n times and merges n items at each level.',
      wrong: 'log n levels of splitting, n work per level: O(n log n).',
    }),
  ]),
];
