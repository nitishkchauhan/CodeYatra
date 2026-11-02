// Placement · Modules 1–6 (Basic): how a coding round works, string, number, array, hashing and pattern questions.
// Each module’s lesson keeps its old id; its Challenge ends with the old tested coding question.
import type { Lesson } from '../../types';
import { PLACEMENT_LESSONS as OLD } from '../placement';
import { bugTask, chat, check, kit, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, task, toggleRun, truth } from './kit';

const { lesson, challenge } = kit('placement');

export const PL_M1: Lesson[] = [
  lesson('pl-fizzbuzz', 'How a coding round works: FizzBuzz', 8, [
    chat(['Most campus drives start with an online coding round: two or three problems, 60 to 90 minutes, hidden test cases.', 'The code matters, but so does the habit: understand, try examples, think of edge cases, then code and test.']),
    reveal('Five steps for every question', [
      ['Understand', 'Say the problem back in your own words. What goes in, what comes out?'],
      ['Examples', 'Work two small examples by hand.'],
      ['Edge cases', 'Empty input, one item, zero, negatives, very large values.'],
      ['Code', 'The simplest correct version first.'],
      ['Test', 'Run your examples and edge cases before submitting.'],
    ]),
    toggleRun('FizzBuzz: the order of checks', [
      ['3 first', ['for n in [3, 5, 15]:', '    if n % 3 == 0:', '        print("Fizz")', '    elif n % 5 == 0:', '        print("Buzz")', '    elif n % 15 == 0:', '        print("FizzBuzz")'], '15 is caught by the % 3 test first, so FizzBuzz never prints.', ['Fizz', 'Buzz', 'Fizz']],
      ['15 first', ['for n in [3, 5, 15]:', '    if n % 15 == 0:', '        print("FizzBuzz")', '    elif n % 3 == 0:', '        print("Fizz")', '    elif n % 5 == 0:', '        print("Buzz")'], 'Check the most specific case first.', ['Fizz', 'Buzz', 'FizzBuzz']],
    ]),
    predict('Trace it', ['out = []', 'for n in range(9, 16):', '    if n % 15 == 0:', '        out.append("FizzBuzz")', '    elif n % 3 == 0:', '        out.append("Fizz")', '    elif n % 5 == 0:', '        out.append("Buzz")', 'print(len(out))'], [
      [9, 'What is printed?', ['4', '7', '5'], '9 Fizz, 10 Buzz, 12 Fizz, 15 FizzBuzz; 11, 13 and 14 add nothing.', { out: true }],
    ]),
    reveal('Reading input', [
      ['One number', 'n = int(input())'],
      ['Numbers on one line', 'nums = list(map(int, input().split()))'],
      ['Many lines', 't = int(input()) then a loop of t input() calls'],
      ['Output', 'Print exactly what is asked: no extra words like “Answer:”.'],
    ], { mono: true }),
    tapbug('Hidden test fails: expected 30, got “The answer is 30”', ['total = a + b', 'print("The answer is", total)'], [[2, 'print("The answer is", total)', 'print(total)']], 'Automatic judges compare output exactly. Print only what is asked.'),
    check('Which edge case should FizzBuzz handle first?', ['Numbers divisible by both 3 and 5', 'Negative numbers', 'Strings', 'Very long lists'], 'Most specific first.', 'Which branch is hidden?'),
    recap([
      ['🧭', 'Understand, examples, edge cases, code, test'],
      ['🎯', 'Most specific condition first'],
      ['🖨', 'Print exactly the expected output'],
    ]),
  ]),

  challenge('pl-b-1-ch', 'Module 1 Challenge', { icon: '🧭', name: 'Round Ready' }, ['Plan before coding', 'Read input the usual ways', 'Match the expected output exactly'], [
    mcq(1, 'What should you do before writing code?', ['Work small examples and edge cases', 'Start typing at once', 'Look up the answer', 'Write comments only'], 'Plan first.'),
    mcq(2, 'Which reads “4 9 2” into a list of ints?', ['list(map(int, input().split()))', 'int(input())', 'input().split()', 'list(input())'], 'Split, then convert.', { mono: true }),
    mcq(3, 'A judge expects 30 and you print “Total: 30”. Result?', ['Wrong answer', 'Accepted', 'Partially accepted', 'Time limit exceeded'], 'Exact match.'),
    mcq(4, 'Which is an edge case for “average of a list”?', ['An empty list', 'A list of 5 numbers', 'Sorted numbers', 'Positive numbers'], 'Division by zero.'),
    mcq(5, 'In FizzBuzz, why test % 15 first?', ['Otherwise % 3 catches 15 first', 'It is faster', '15 is bigger', 'Python needs it'], 'Specific first.'),
    swipe([
      ['Hidden test cases often include edge cases', true, 'Empty, zero, huge.'],
      ['Extra spaces in output never matter', false, 'They can fail a judge.'],
      ['A brute-force answer that passes is better than none', true, 'Then improve it.'],
      ['elif stops checking after the first true branch', true, 'Order matters.'],
    ]),
    pairs([['int(input())', 'One number'], ['input().split()', 'Words on a line'], ['% 15 == 0', 'Divisible by 3 and 5'], ['print(x)', 'Exact output']], 'Coding-round basics.'),
    pickCode('Which prints FizzBuzz for 15, Fizz for 9, Buzz for 10?', ['"FizzBuzz" if n % 15 == 0 else "Fizz" if n % 3 == 0 else "Buzz" if n % 5 == 0 else n', '"Fizz" if n % 3 == 0 else "FizzBuzz" if n % 15 == 0 else n', '"Buzz" if n % 5 == 0 else "FizzBuzz"', 'n % 15'], 'Most specific first.'),
    bugTask(['n = input()', 'if n % 3 == 0:', '    print("Fizz")'], [[1, 'input()', 'int(input())']], 'input() gives text; convert it to a number.'),
    predictTask(['for n in range(1, 16):', '    if n % 15 == 0:', '        last = "FizzBuzz"', '    elif n % 5 == 0:', '        last = "Buzz"', '    else:', '        last = str(n)', 'print(last)'], 'What does it print?', ['FizzBuzz', 'Buzz', '15', 'Fizz'], '15 is divisible by 15.'),
    task(OLD, 'pl-fizzbuzz'),
  ]),

  lesson('pl-reverse', 'String questions', 8, [
    toggleRun('Reversing', [
      ['Slicing', ['s = "Sutton"', 'print(s[::-1])'], 'A step of -1 walks backwards.', ['nottuS']],
      ['Words', ['line = "book the early train"', 'print(" ".join(line.split()[::-1]))'], 'Split into words, reverse the list, join.', ['train early the book']],
      ['By hand', ['s = "train"', 'out = ""', 'for ch in s:', '    out = ch + out', 'print(out)'], 'Interviewers sometimes ban slicing: build it yourself.', ['niart']],
    ]),
    toggleRun('Classic checks', [
      ['Palindrome', ['s = "Level"', 't = s.lower()', 'print(t == t[::-1])'], 'Same forwards and backwards, ignoring case.', ['True']],
      ['Count vowels', ['s = "Placement Season"', 'print(sum(1 for ch in s.lower() if ch in "aeiou"))'], 'One for each vowel.', ['6']],
      ['Character counts', ['s = "banana"', 'print(s.count("a"), s.find("n"), s.replace("a", "o"))'], 'count, find (first index) and replace.', ['3 2 bonono']],
    ]),
    run('Try other words', 'Change the word and see if it is a palindrome.', ['word = "{{v}}"', 'print(word, word.lower() == word.lower()[::-1])'], ['train', 'Madam', 'racecar'], { goal: 'Madam True' }),
    predict('Trace it', ['s = "hello world"', 'words = s.split()', 'caps = [w.capitalize() for w in words]', 'print(" ".join(caps))'], [
      [3, 'What is words?', ["['hello', 'world']", "'hello world'", "['h', 'e', 'l']"], 'split() breaks on spaces.', { var: 'words' }],
      [4, 'What is printed?', ['Hello World', 'HELLO WORLD', 'hello world'], 'capitalize makes the first letter a capital.', { out: true }],
    ]),
    tapbug('Palindrome check says False for “Madam”', ['s = "Madam"', 'print(s == s[::-1])'], [[2, 's == s[::-1]', 's.lower() == s.lower()[::-1]']], 'M and m differ. Compare in one case.'),
    check('What does "abc"[::-1] give?', ['"cba"', '"abc"', '"c"', 'An error'], 'Reversed.', 'Step -1.', { mono: true }),
    recap([
      ['🔁', 's[::-1] reverses; split, reverse, join for words'],
      ['🪞', 'Palindromes: compare with the reverse, same case'],
      ['🔤', 'count, find, replace, lower, split, join'],
    ]),
  ]),

  challenge('pl-b-2-ch', 'Module 2 Challenge', { icon: '🔤', name: 'String Solver' }, ['Reverse strings and words', 'Check palindromes', 'Count characters'], [
    mcq(1, '"Sutton"[::-1] is…', ['"nottuS"', '"Sutton"', '"nottus"', '"S"'], 'Reversed, same letters.', { mono: true }),
    mcq(2, 'Which reverses the word order of a sentence s?', ['" ".join(s.split()[::-1])', 's[::-1]', 's.reverse()', 'reversed(s)'], 'Words, not letters.', { mono: true }),
    mcq(3, '"banana".find("n") is…', ['2', '1', '3', '-1'], 'First index.', { mono: true }),
    mcq(4, 'Can you change s[0] = "X" on a Python string?', ['No: strings are immutable', 'Yes', 'Only for letters', 'Only with lists'], 'Build a new one.'),
    mcq(5, 'Which is a palindrome?', ['"racecar"', '"train"', '"banana"', '"level up"'], 'Same both ways.', { mono: true }),
    swipe([
      ['split() with no argument splits on any spaces', true, 'And drops empty pieces.'],
      ['"A" == "a" is True', false, 'Case matters.'],
      ['find returns -1 if not found', true, 'index raises an error instead.'],
      ['join is called on the separator', true, '" ".join(words).'],
    ]),
    pairs([['s[::-1]', 'Reverse'], ['s.split()', 'Words'], ['s.count("a")', 'How many a'], ['s.lower()', 'Small letters']], 'String tools.'),
    pickCode('Which counts the vowels in s?', ['sum(1 for ch in s.lower() if ch in "aeiou")', 's.count("aeiou")', 'len("aeiou")', 's.find("aeiou")'], 'One for each vowel.'),
    bugTask(['s = "hello"', 's[0] = "H"', 'print(s)'], [[2, 's[0] = "H"', 's = "H" + s[1:]']], 'Strings can’t be changed in place; build a new one.'),
    predictTask(['s = "programming"', 'seen = ""', 'for ch in s:', '    if ch not in seen:', '        seen += ch', 'print(seen)'], 'What does it print?', ['progamin', 'programming', 'prgmn', 'progrmin'], 'Each letter once, in order of first appearance.'),
    task(OLD, 'pl-reverse'),
  ]),

  lesson('pl-prime', 'Number questions: primes, GCD and digits', 8, [
    toggleRun('Primes', [
      ['Slow', ['def is_prime(n):', '    if n < 2:', '        return False', '    for d in range(2, n):', '        if n % d == 0:', '            return False', '    return True', 'print([x for x in range(1, 20) if is_prime(x)])'], 'Tries every divisor: O(n).', ['[2, 3, 5, 7, 11, 13, 17, 19]']],
      ['Up to √n', ['def is_prime(n):', '    if n < 2:', '        return False', '    d = 2', '    while d * d <= n:', '        if n % d == 0:', '            return False', '        d += 1', '    return True', 'print(is_prime(97), is_prime(91))'], 'A factor above √n pairs with one below, so stop at √n: O(√n).', ['True False']],
    ]),
    toggleRun('Digits and GCD', [
      ['Sum of digits', ['n = 4725', 'total = 0', 'while n > 0:', '    total += n % 10', '    n //= 10', 'print(total)'], '% 10 takes the last digit; // 10 removes it.', ['18']],
      ['Reverse a number', ['n = 1230', 'rev = 0', 'while n > 0:', '    rev = rev * 10 + n % 10', '    n //= 10', 'print(rev)'], 'Build the reverse digit by digit.', ['321']],
      ['GCD (Euclid)', ['a, b = 84, 36', 'while b:', '    a, b = b, a % b', 'print(a, 84 * 36 // a)'], 'gcd(a, b) = gcd(b, a % b). LCM = a × b ÷ GCD.', ['12 252']],
    ]),
    predict('Trace Euclid', ['a, b = 48, 18', 'while b:', '    a, b = b, a % b', 'print(a)'], [
      [4, 'What is printed?', ['6', '18', '3'], '48,18 → 18,12 → 12,6 → 6,0.', { out: true }],
    ]),
    reveal('Other favourites', [
      ['Armstrong', '153 = 1³ + 5³ + 3³: each digit to the power of the number of digits.'],
      ['Perfect', '28 = 1 + 2 + 4 + 7 + 14: the sum of its divisors.'],
      ['Factorial', 'n! = 1 × 2 × … × n; 0! = 1.'],
      ['Fibonacci', '0, 1, 1, 2, 3, 5, 8: each is the sum of the two before.'],
    ]),
    tapbug('is_prime(1) returns True', ['def is_prime(n):', '    if n < 1:', '        return False', '    for d in range(2, n):', '        if n % d == 0:', '            return False', '    return True'], [[2, 'n < 1', 'n < 2']], '1 is not prime either. Primes start at 2.'),
    check('Why stop the prime test at √n?', ['A bigger factor pairs with a smaller one already checked', 'Python is slow', 'Primes are small', 'It is a rule of thumb only'], 'Factors come in pairs.', 'Think 36 = 4 × 9.'),
    recap([
      ['🔢', 'Primes: check divisors up to √n'],
      ['➗', '% 10 and // 10 for digits'],
      ['🤝', 'GCD by Euclid; LCM = a × b ÷ GCD'],
    ]),
  ]),

  challenge('pl-b-3-ch', 'Module 3 Challenge', { icon: '🔢', name: 'Number Ninja' }, ['Test primes quickly', 'Work with digits', 'Find GCD and LCM'], [
    mcq(1, 'Which is prime?', ['29', '27', '21', '1'], 'Only 1 and itself.', { mono: true }),
    mcq(2, 'What does n % 10 give for 4725?', ['5', '472', '4', '25'], 'The last digit.', { mono: true }),
    mcq(3, 'gcd(84, 36) is…', ['12', '6', '4', '36'], 'Euclid.', { mono: true }),
    mcq(4, 'If gcd(a, b) = 6 and a × b = 216, the LCM is…', ['36', '6', '216', '1296'], 'a × b ÷ GCD.', { mono: true }),
    mcq(5, 'Prime test up to √n is…', ['O(√n)', 'O(n)', 'O(1)', 'O(n²)'], 'Half the exponent.', { mono: true }),
    swipe([
      ['1 is a prime number', false, 'Primes start at 2.'],
      ['153 is an Armstrong number', true, '1 + 125 + 27.'],
      ['n // 10 removes the last digit', true, 'Whole division.'],
      ['0! is 0', false, 'It is 1.'],
    ]),
    pairs([['n % 10', 'Last digit'], ['n // 10', 'Drop last digit'], ['a % b', 'Euclid step'], ['d * d <= n', 'Stop at √n']], 'Number tools.'),
    pickCode('Which counts the digits of a positive n?', ['len(str(n))', 'n % 10', 'n // 10', 'str(n).count()'], 'As text.'),
    bugTask(['n = 123', 'total = 0', 'while n > 0:', '    total += n % 10'], [[4, '    total += n % 10', '    total += n % 10; n //= 10']], 'Remove the digit each time, or the loop never ends.'),
    predictTask(['a, b = 0, 1', 'for _ in range(7):', '    a, b = b, a + b', 'print(a)'], 'What does it print?', ['13', '8', '21', '7'], '0 1 1 2 3 5 8 13: the 7th step gives 13.'),
    task(OLD, 'pl-prime'),
  ]),

  lesson('pl-second', 'Array questions', 8, [
    toggleRun('Second largest', [
      ['Sort', ['nums = [40, 85, 120, 85]', 'print(sorted(set(nums))[-2])'], 'Remove duplicates, sort, take the second from the end: O(n log n).', ['85']],
      ['One pass', ['nums = [40, 85, 120, 85]', 'first = second = None', 'for x in nums:', '    if first is None or x > first:', '        first, second = x, first', '    elif x != first and (second is None or x > second):', '        second = x', 'print(second)'], 'Track the top two as you go: O(n).', ['85']],
    ]),
    toggleRun('More classics', [
      ['Missing number', ['nums = [1, 2, 4, 5, 6]', 'n = 6', 'print(n * (n + 1) // 2 - sum(nums))'], 'Expected sum minus the real sum.', ['3']],
      ['Remove duplicates', ['nums = [3, 1, 3, 2, 1]', 'seen, out = set(), []', 'for x in nums:', '    if x not in seen:', '        seen.add(x)', '        out.append(x)', 'print(out)'], 'Keep the first of each, in order.', ['[3, 1, 2]']],
      ['Rotate by k', ['nums = [1, 2, 3, 4, 5]', 'k = 2', 'k %= len(nums)', 'print(nums[-k:] + nums[:-k])'], 'The last k move to the front.', ['[4, 5, 1, 2, 3]']],
    ]),
    predict('Trace it', ['nums = [5, -2, 9, 0]', 'lo = hi = nums[0]', 'for x in nums[1:]:', '    lo = min(lo, x)', '    hi = max(hi, x)', 'print(hi - lo)'], [
      [6, 'What is printed?', ['11', '9', '14'], '9 − (−2).', { out: true }],
    ]),
    tapbug('Second largest of [7, 7, 3] says 7', ['nums = [7, 7, 3]', 'print(sorted(nums)[-2])'], [[2, 'sorted(nums)', 'sorted(set(nums))']], 'Duplicates of the largest must be removed first.'),
    check('Which finds the missing number in 1..n in O(n) and O(1) space?', ['n(n+1)/2 minus the sum', 'Sort and scan', 'A nested loop', 'A set of all numbers'], 'Arithmetic.', 'Think of the total.'),
    truth([
      ['Sorting is O(n log n)', true, 'Python’s sort.'],
      ['A set keeps the original order', false, 'Use a list alongside it.'],
      ['nums[-1] is the last item', true, 'Negative index.'],
    ]),
    recap([
      ['🥈', 'Second largest: set + sort, or one pass'],
      ['➖', 'Missing number: expected sum − real sum'],
      ['🔄', 'Rotate: nums[-k:] + nums[:-k]'],
    ]),
  ]),

  challenge('pl-b-4-ch', 'Module 4 Challenge', { icon: '📊', name: 'Array Ace' }, ['Find the largest and second largest', 'Remove duplicates in order', 'Rotate and find missing numbers'], [
    mcq(1, 'sorted(set([4, 9, 9, 2]))[-2] is…', ['4', '9', '2', 'An error'], 'Unique, sorted: [2, 4, 9].', { mono: true }),
    mcq(2, 'Rotating [1, 2, 3, 4] right by 1 gives…', ['[4, 1, 2, 3]', '[2, 3, 4, 1]', '[1, 2, 3, 4]', '[4, 3, 2, 1]'], 'The last moves to the front.', { mono: true }),
    mcq(3, 'One pass over n items is…', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 'Linear.', { mono: true }),
    mcq(4, 'Why k %= len(nums) before rotating?', ['k may be bigger than the list', 'For speed only', 'To sort', 'It reverses'], 'Rotating by n changes nothing.'),
    mcq(5, 'Expected sum of 1..10 is…', ['55', '50', '45', '100'], '10 × 11 ÷ 2.', { mono: true }),
    swipe([
      ['max() and min() are O(n)', true, 'They look at every item.'],
      ['nums[::-1] reverses a list', true, 'A copy.'],
      ['list.sort() returns the sorted list', false, 'It returns None.'],
      ['A set removes duplicates', true, 'Order not kept.'],
    ]),
    pairs([['set(nums)', 'Unique'], ['sorted(nums)', 'New sorted list'], ['nums[-k:]', 'Last k'], ['sum(nums)', 'Total']], 'Array tools.'),
    pickCode('Which reverses a list in place?', ['nums.reverse()', 'nums = reversed(nums)', 'nums.sort(-1)', 'nums[::-1]'], 'In place, no copy.'),
    bugTask(['nums = [3, 8, 1]', 'best = 0', 'for x in nums:', '    if x > best: best = x'], [[2, 'best = 0', 'best = nums[0]']], 'Starting at 0 breaks for all-negative lists. Start with the first item.'),
    predictTask(['nums = [2, 7, 1, 8, 2, 8]', 'print(sorted(set(nums))[-2])'], 'What does it print?', ['7', '8', '2', '1'], 'Unique sorted: [1, 2, 7, 8].'),
    task(OLD, 'pl-second'),
  ]),

  lesson('pl-anagram', 'Hashing questions: counting with dicts', 8, [
    chat(['Many placement questions become easy once you count things with a dictionary. Looking up a key is O(1) on average.', 'collections.Counter does the counting for you.']),
    toggleRun('Counting', [
      ['A dict', ['s = "banana"', 'count = {}', 'for ch in s:', '    count[ch] = count.get(ch, 0) + 1', 'print(count)'], 'get(ch, 0) starts each new key at 0.', ["{'b': 1, 'a': 3, 'n': 2}"]],
      ['Counter', ['from collections import Counter', 'c = Counter("banana")', 'print(c.most_common(1), c["z"])'], 'most_common gives the top items; a missing key counts 0.', ["[('a', 3)] 0"]],
      ['Anagrams', ['from collections import Counter', 'print(Counter("listen") == Counter("silent"), sorted("cat") == sorted("act"))'], 'Same letters, same counts. Sorting works too (O(n log n)).', ['True True']],
    ]),
    toggleRun('Two classics', [
      ['First unique', ['from collections import Counter', 's = "swiss"', 'c = Counter(s)', 'print(next((ch for ch in s if c[ch] == 1), None))'], 'Count, then the first with count 1.', ['w']],
      ['Two sum', ['nums, target = [2, 7, 11, 15], 9', 'seen = {}', 'for i, x in enumerate(nums):', '    if target - x in seen:', '        print(seen[target - x], i)', '    seen[x] = i'], 'Remember each number’s index; look up the partner: O(n).', ['0 1']],
    ]),
    predict('Trace it', ['words = ["tea", "toast", "tea", "soup", "tea"]', 'count = {}', 'for w in words:', '    count[w] = count.get(w, 0) + 1', 'print(max(count, key=count.get))'], [
      [5, 'What is printed?', ['tea', 'toast', 'soup'], 'The key with the biggest count.', { out: true }],
    ]),
    tapbug('KeyError: ’a’', ['count = {}', 'for ch in "aba":', '    count[ch] += 1'], [[3, 'count[ch] += 1', 'count[ch] = count.get(ch, 0) + 1']], 'A new key has no value yet: start it at 0.'),
    check('Average cost of looking up a key in a dict?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'Hashing.', 'Why dicts are fast.', { mono: true }),
    recap([
      ['🧮', 'Count with dict.get(k, 0) + 1 or Counter'],
      ['🔤', 'Anagrams: equal Counters'],
      ['🎯', 'Two sum: remember what you saw'],
    ]),
  ]),

  challenge('pl-b-5-ch', 'Module 5 Challenge', { icon: '🧮', name: 'Hash Master' }, ['Count with dicts and Counter', 'Check anagrams', 'Solve two sum in O(n)'], [
    mcq(1, 'Which counts every letter of s?', ['Counter(s)', 'len(s)', 's.count()', 'set(s)'], 'From collections.', { mono: true }),
    mcq(2, 'Two sum with a dict is…', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 'One pass.', { mono: true }),
    mcq(3, '"listen" and "silent" are…', ['Anagrams', 'Palindromes', 'Equal', 'Unrelated'], 'Same letters.'),
    mcq(4, 'd.get("x", 0) when "x" is missing gives…', ['0', 'None', 'KeyError', '"x"'], 'The default.', { mono: true }),
    mcq(5, 'Which can be a dict key?', ['A tuple', 'A list', 'A dict', 'A set'], 'Keys must be hashable.', { mono: true }),
    swipe([
      ['A missing Counter key gives 0', true, 'No error.'],
      ['Dicts keep insertion order (Python 3.7+)', true, 'Reliable now.'],
      ['Two sum by trying every pair is O(n)', false, 'O(n²).'],
      ['sorted("cat") gives a list of letters', true, "['a', 'c', 't']."],
    ]),
    pairs([['Counter', 'Counts'], ['dict.get', 'Safe lookup'], ['set', 'Seen before?'], ['most_common', 'Top items']], 'Hashing tools.'),
    pickCode('Which checks if a and b are anagrams?', ['Counter(a) == Counter(b)', 'a == b[::-1]', 'set(a) == set(b)', 'len(a) == len(b)'], 'Counts must match too.'),
    bugTask(['seen = []', 'for x in nums:', '    if x in seen: print("dup", x)', '    seen.append(x)'], [[1, 'seen = []', 'seen = set()'], [4, 'seen.append(x)', 'seen.add(x)']], 'x in a list is O(n); a set makes it O(1).'),
    predictTask(['from collections import Counter', 'c = Counter("mississippi")', 'print(c["s"], c["p"])'], 'What does it print?', ['4 2', '2 4', '4 4', '3 2'], 'Four s, two p.'),
    task(OLD, 'pl-anagram'),
  ]),

  lesson('pl-pattern', 'Pattern printing', 7, [
    chat(['Pattern questions test loops: one loop for rows, and work out how many stars and spaces each row needs.', 'Write the row number next to the count you need, and the formula appears.']),
    toggleRun('Patterns', [
      ['Right triangle', ['n = 4', 'for i in range(1, n + 1):', '    print("*" * i)'], 'Row i has i stars.', ['*', '**', '***', '****']],
      ['Pyramid', ['n = 3', 'for i in range(1, n + 1):', '    print(" " * (n - i) + "*" * (2 * i - 1))'], 'Row i: n − i spaces, 2i − 1 stars.', ['  *', ' ***', '*****']],
      ['Numbers', ['n = 4', 'for i in range(1, n + 1):', '    print(" ".join(str(j) for j in range(1, i + 1)))'], 'Row i counts 1 to i.', ['1', '1 2', '1 2 3', '1 2 3 4']],
    ]),
    run('Grow the pyramid', 'Change n until the pyramid has a base of 7 stars.', ['n = {{v}}', 'for i in range(1, n + 1):', '    print(" " * (n - i) + "*" * (2 * i - 1))'], ['2', '3', '4'], { goal: '*******' }),
    predict('Count the stars', ['n = 5', 'total = 0', 'for i in range(1, n + 1):', '    total += 2 * i - 1', 'print(total)'], [
      [5, 'What is printed?', ['25', '15', '30'], '1 + 3 + 5 + 7 + 9 = n².', { out: true }],
    ]),
    tapbug('The triangle starts with an empty line', ['for i in range(4):', '    print("*" * i)'], [[1, 'range(4)', 'range(1, 5)']], 'range(4) starts at 0, so the first row has no stars.'),
    check('How many stars are in row i of a centred pyramid?', ['2i − 1', 'i', '2i', 'i²'], '1, 3, 5, …', 'Odd numbers.', { mono: true }),
    recap([
      ['🔺', 'Outer loop for rows'],
      ['📐', 'Find spaces and stars per row as formulas'],
      ['🔢', 'Number patterns: join the numbers'],
    ]),
  ]),

  challenge('pl-b-6-ch', 'Module 6 Challenge', { icon: '🔺', name: 'Pattern Pro' }, ['Print triangles and pyramids', 'Find the formula for each row', 'Print number patterns'], [
    mcq(1, '"*" * 3 gives…', ['"***"', '"3*"', '3', 'An error'], 'Repeat the string.', { mono: true }),
    mcq(2, 'In a 4-row pyramid, how many spaces start row 1?', ['3', '4', '1', '0'], 'n − i.', { mono: true }),
    mcq(3, 'range(1, n + 1) gives…', ['1 to n', '0 to n', '1 to n − 1', '0 to n − 1'], 'The end is excluded.', { mono: true }),
    mcq(4, 'Total stars in a pyramid of n rows?', ['n²', '2n', 'n(n+1)/2', 'n'], 'Sum of odd numbers.', { mono: true }),
    mcq(5, 'Which prints row i of “1 2 3 … i”?', ['" ".join(str(j) for j in range(1, i + 1))', 'print(1, i)', 'str(i) * i', 'range(i)'], 'Join the numbers.', { mono: true }),
    swipe([
      ['print() adds a new line by default', true, 'end="\\n".'],
      ['An inverted triangle counts rows down', true, 'range(n, 0, -1).'],
      ['Pattern questions need nested loops in Python', false, 'String repetition often replaces the inner loop.'],
      ['Trailing spaces can fail a judge', true, 'Watch them.'],
    ]),
    pairs([['n - i', 'Spaces'], ['2 * i - 1', 'Pyramid stars'], ['i', 'Triangle stars'], ['range(n, 0, -1)', 'Count down']], 'Pattern formulas.'),
    pickCode('Which prints an upside-down triangle of 3 rows?', ['for i in range(3, 0, -1): print("*" * i)', 'for i in range(3): print("*" * i)', 'for i in range(1, 3): print("*" * -i)', 'print("***\\n**\\n")'], 'Count down.'),
    bugTask(['n = 3', 'for i in range(1, n):', '    print("*" * i)'], [[2, 'range(1, n)', 'range(1, n + 1)']], 'Include the last row.'),
    predictTask(['n = 4', 'for i in range(1, n + 1):', '    row = str(i) * i', 'print(row)'], 'What does the last line print?', ['4444', '1234', '4', '16'], 'The digit repeated i times.'),
    task(OLD, 'pl-pattern'),
  ]),
];
