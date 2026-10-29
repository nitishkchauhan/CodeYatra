// Extra practice for each DSA module. Every predicted output runs in the tests.
import { bug, order, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · DSA';
const p = (title: string, lines: string[], answer: string, explain: string, accept?: string[]) => predict({ kicker: K, title, lang: 'python', lines, answer, explain, accept });

export const DSA_DRILLS: Record<string, Step[]> = {
  'dsa-bigo': [
    quiz({ prompt: 'A loop runs from 0 to n, and inside it another loop runs from 0 to 5. What is the Big-O?', options: ['O(n)', 'O(n²)', 'O(5)', 'O(log n)'], right: 'Right. 5n steps; constants are dropped, so O(n).', wrong: 'The inner loop is a fixed 5 steps. 5 × n is still O(n).', mono: true }),
    quiz({ prompt: 'Which grows fastest as n gets large?', options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], right: 'Right. Squaring overtakes everything else on the list.', wrong: 'For big n: log n < n < n log n < n².', mono: true }),
    p('Count the steps', ['steps = 0', 'for i in range(4):', '    for j in range(i):', '        steps += 1', 'print(steps)'], '6', 'The inner loop runs 0 + 1 + 2 + 3 = 6 times: still O(n²) in general.'),
    p('Halving', ['n, s = 1000, 0', 'while n > 1:', '    n //= 2', '    s += 1', 'print(s)'], '9', '1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1: nine halvings.'),
  ],
  'dsa-arrays': [
    p('Negative index', ['a = [3, 6, 9, 12]', 'print(a[-1] + a[-2])'], '21', 'The last two items are 12 and 9.'),
    p('Reverse with a slice', ['s = "yatra"', 'print(s[::-1], s[1:4])'], 'artay atr', '[::-1] reverses; [1:4] takes indexes 1, 2 and 3.'),
    quiz({ prompt: 'Which is O(1) on a Python list?', options: ['a.append(x)', 'a.insert(0, x)', 'x in a', 'a.remove(x)'], right: 'Right. Adding at the end is O(1).', wrong: 'insert at the front, searching and remove all walk the list: O(n).', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should print the last name. Tap the buggy line.', lang: 'python', lines: ['names = ["Asha", "Ravi", "Kabir"]', 'print(names[3])'], bug: 1, fix: 'print(names[-1])', explain: 'Indexes stop at len − 1 = 2. names[-1] is the last item.' }),
  ],
  'dsa-linear': [
    p('First match', ['a = [5, 3, 5, 1]', 'for i, x in enumerate(a):', '    if x == 5:', '        print(i)', '        break'], '0', 'break stops at the first 5, at index 0.'),
    p('Last match', ['a = [5, 3, 5, 1]', 'last = -1', 'for i, x in enumerate(a):', '    if x == 5:', '        last = i', 'print(last)'], '2', 'Without break, the loop keeps going and remembers the latest match.'),
    quiz({ prompt: 'When is linear search the best choice?', options: ['A small or unsorted list searched once', 'A sorted list of a million items searched many times', 'Never', 'Only for numbers'], right: 'Right. No sorting needed, and for small data it is quick.', wrong: 'For many searches on big data, sort and binary search, or use a set. For one search on unsorted data, linear is right.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'find should return -1 when the item is missing. Tap the buggy line.', lang: 'python', lines: ['def find(a, t):', '    for i in range(len(a)):', '        if a[i] == t:', '            return i', 'print(find([1, 2], 9))'], bug: 3, fix: '            return i\n    return -1', explain: 'Without return -1 after the loop, the function returns None for a missing item.' }),
  ],
  'dsa-binary': [
    p('Middle index', ['lo, hi = 0, 9', 'print((lo + hi) // 2)'], '4', '(0 + 9) // 2 = 4: floor division rounds down.'),
    p('bisect', ['from bisect import bisect_left', 'print(bisect_left([10, 20, 30, 40], 25))'], '2', '25 would go at index 2, after 10 and 20.'),
    quiz({ prompt: 'About how many steps does binary search need for 1,000,000 sorted items?', options: ['20', '1,000', '500,000', '1,000,000'], right: 'Right. 2²⁰ is just over a million.', wrong: 'Each step halves the range: about log₂(1,000,000) ≈ 20 steps.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This loop never ends when the target is missing. Tap the buggy line.', lang: 'python', lines: ['nums, t = [1, 3, 5], 4', 'lo, hi = 0, 2', 'while lo <= hi:', '    mid = (lo + hi) // 2', '    if nums[mid] < t:', '        lo = mid', '    else:', '        hi = mid - 1', 'print(lo)'], bug: 5, fix: '        lo = mid + 1', explain: 'lo = mid can leave the range the same size forever. Exclude mid: lo = mid + 1.' }),
  ],
  'dsa-sort': [
    p('sorted vs sort', ['a = [3, 1, 2]', 'b = sorted(a)', 'print(a, b)'], '[3, 1, 2] [1, 2, 3]', 'sorted() returns a new list and leaves a unchanged.'),
    p('Sort by key', ['words = ["tea", "wrap", "pancake", "muffin"]', 'print(sorted(words, key=len)[-1])'], 'pancake', 'Sorting by length puts the longest word last.'),
    p('Two keys', ['m = [("Ravi", 82), ("Asha", 91), ("Kabir", 82)]', 'print([n for n, s in sorted(m, key=lambda x: (-x[1], x[0]))])'], "['Asha', 'Kabir', 'Ravi']", 'Highest marks first; the 82s are ordered by name.'),
    quiz({ prompt: 'What is the time complexity of Python’s sorted()?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], right: 'Right. It uses Timsort.', wrong: 'Python’s built-in sort is O(n log n) in the worst case.', mono: true }),
  ],
  'dsa-hash': [
    p('Set operations', ['a = {1, 2, 3}', 'b = {2, 3, 4}', 'print(sorted(a & b), sorted(a | b))'], '[2, 3] [1, 2, 3, 4]', '& keeps what is in both; | keeps everything.'),
    p('Count', ['from collections import Counter', 'print(Counter("banana").most_common(1))'], "[('a', 3)]", 'Counter counts each letter; "a" appears three times.'),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should count cities. Tap the buggy line.', lang: 'python', lines: ['counts = {}', 'for c in ["Pune", "Goa", "Pune"]:', '    counts[c] += 1', 'print(counts)'], bug: 2, fix: '    counts[c] = counts.get(c, 0) + 1', explain: 'counts[c] doesn’t exist the first time, so += raises KeyError. Use get(c, 0).' }),
    quiz({ prompt: 'What does a dictionary trade to make lookups O(1)?', options: ['Extra memory', 'Correctness', 'The ability to store strings', 'Nothing'], right: 'Right. It stores a hash table, which takes extra space.', wrong: 'Hash tables use more memory than a plain list in exchange for fast lookups.' }),
  ],
  'dsa-pointers': [
    p('Reverse in place', ['a = [1, 2, 3, 4, 5]', 'l, r = 0, 4', 'while l < r:', '    a[l], a[r] = a[r], a[l]', '    l += 1', '    r -= 1', 'print(a)'], '[5, 4, 3, 2, 1]', 'Swap the ends and move inwards; the middle item stays.'),
    p('Remove duplicates', ['a = [1, 1, 2, 2, 2, 3]', 'w = 1', 'for r in range(1, len(a)):', '    if a[r] != a[w - 1]:', '        a[w] = a[r]', '        w += 1', 'print(w, a[:w])'], '3 [1, 2, 3]', 'The write pointer only moves for a new value.'),
    quiz({ prompt: 'What is the time complexity of the two-pointer pair search on a sorted list?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], right: 'Right. Each step moves a pointer inward, at most n steps.', wrong: 'Every step removes one candidate, so it takes at most n steps.', mono: true }),
    order({ kicker: K, title: 'Arrange the check', instructions: 'Arrange the lines so it prints True for a palindrome.', lang: 'python', lines: ['s = "level"', 'l, r, ok = 0, len(s) - 1, True', 'while l < r:', '    if s[l] != s[r]:', '        ok = False', '    l, r = l + 1, r - 1', 'print(ok)'], output: ['True'], explain: 'Set up both ends, compare inside the loop, move both pointers, print at the end.' }),
  ],
  'dsa-window': [
    p('Window totals', ['a = [2, 1, 5, 1, 3]', 'k = 2', 'print([sum(a[i:i + k]) for i in range(len(a) - k + 1)])'], '[3, 6, 6, 4]', 'Four windows of 2: 2+1, 1+5, 5+1, 1+3.'),
    p('Slide by one', ['a = [4, 2, 7, 1]', 'total = 4 + 2 + 7', 'total += a[3] - a[0]', 'print(total)'], '10', 'Add the new item (1), drop the old one (4): 13 + 1 − 4 = 10.'),
    quiz({ prompt: 'Why is a sliding window O(n) and not O(n × k)?', options: ['Each slide adds one item and removes one, in O(1)', 'It skips windows', 'It sorts first', 'It only looks at k items'], right: 'Right. The window total is updated, never rebuilt.', wrong: 'Instead of re-adding k items per window, it adds the new one and subtracts the old one.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The best 2-item total of [1, 2, 9] is 11. Tap the buggy line.', lang: 'python', lines: ['a, k = [1, 2, 9], 2', 'best = max(sum(a[i:i + k]) for i in range(len(a) - k))', 'print(best)'], bug: 1, fix: 'best = max(sum(a[i:i + k]) for i in range(len(a) - k + 1))', explain: 'There are len − k + 1 windows. Without the + 1, [2, 9] is never checked.' }),
  ],
  'dsa-prefix': [
    p('Build prefix', ['a = [3, 1, 4, 1, 5]', 'p = [0]', 'for x in a:', '    p.append(p[-1] + x)', 'print(p[-1], p[4] - p[2])'], '14 5', 'The whole total is 14; items 2 and 3 are 4 + 1 = 5.'),
    p('accumulate', ['from itertools import accumulate', 'print(list(accumulate([1, 2, 3, 4])))'], '[1, 3, 6, 10]', 'Running totals: 1, 1+2, 1+2+3, 1+2+3+4.'),
    quiz({ prompt: 'Why does the prefix list start with 0?', options: ['So the total from index 0 works with the same formula', 'Python lists must start with 0', 'To make it longer', 'It doesn’t matter'], right: 'Right. prefix[r + 1] − prefix[0] then gives the total from the start.', wrong: 'The leading 0 means a range starting at index 0 needs no special case.' }),
    quiz({ prompt: 'n = 10,000 items and 10,000 range questions. Roughly how many steps with prefix sums?', options: ['About 20,000', 'About 100,000,000', 'About 10,000', 'About 1,000,000'], right: 'Right. O(n + q): build once, then one subtraction per question.', wrong: 'Building is about n steps and each question is 1 step: n + q.', mono: true }),
  ],
  'dsa-stack': [
    p('Peek and pop', ['s = ["a", "b", "c"]', 'top = s[-1]', 's.pop()', 'print(top, s[-1], len(s))'], 'c b 2', 'Peeking doesn’t remove; pop removes c, leaving b on top.'),
    p('Reverse with a stack', ['s = []', 'for ch in "abc":', '    s.append(ch)', 'out = ""', 'while s:', '    out += s.pop()', 'print(out)'], 'cba', 'Popping a stack gives items back in reverse order.'),
    quiz({ prompt: 'Which problem is a natural fit for a stack?', options: ['Checking that brackets are balanced', 'Serving people in arrival order', 'Finding the cheapest train', 'Counting words'], right: 'Right. The most recent opener must be closed first.', wrong: 'Brackets close in reverse order of opening: last in, first out.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should leave the stack as ["x"] after an undo. Tap the buggy line.', lang: 'python', lines: ['stack = ["x", "y"]', 'stack.pop(0)', 'print(stack)'], bug: 1, fix: 'stack.pop()', explain: 'pop(0) removes the bottom item. A stack pops from the top: pop().' }),
  ],
  'dsa-queue': [
    p('Rotate a line', ['from collections import deque', 'q = deque(["A", "B", "C"])', 'q.append(q.popleft())', 'print(list(q))'], "['B', 'C', 'A']", 'The front person goes to the back.'),
    p('Both ends', ['from collections import deque', 'q = deque([2, 3])', 'q.appendleft(1)', 'q.append(4)', 'print(q[0], q[-1], len(q))'], '1 4 4', 'appendleft adds at the front, append at the back.'),
    quiz({ prompt: 'A printer receives jobs and prints them in the order they arrived. Which structure?', options: ['Queue', 'Stack', 'Set', 'Dictionary'], right: 'Right. First in, first out.', wrong: 'Earliest job first means first in, first out: a queue.' }),
    quiz({ prompt: 'What is the time complexity of deque.popleft()?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], right: 'Right. That is why deque is the queue to use.', wrong: 'deque is built for fast work at both ends: popleft is O(1).', mono: true }),
  ],
  'dsa-linked': [
    p('Length by walking', ['class N:', '    def __init__(self, v, n=None):', '        self.v, self.n = v, n', '', 'h = N(1, N(2, N(3, N(4))))', 'c = 0', 'while h:', '    c += 1', '    h = h.n', 'print(c)'], '4', 'Walk until None, counting nodes.'),
    p('Insert at head', ['class N:', '    def __init__(self, v, n=None):', '        self.v, self.n = v, n', '', 'h = N("b", N("c"))', 'h = N("a", h)', 'print(h.v, h.n.v, h.n.n.v)'], 'a b c', 'The new node points at the old head and becomes the head.'),
    quiz({ prompt: 'How long does it take to reach the 100th node of a linked list?', options: ['About 100 steps (O(n))', 'One step (O(1))', 'About 7 steps (O(log n))', 'It is impossible'], right: 'Right. There are no indexes; you follow links one by one.', wrong: 'A linked list has no index, so you walk 100 links.' }),
    quiz({ prompt: 'To delete the node after node x, what do you do?', options: ['x.next = x.next.next', 'x = None', 'x.next = None', 'del x'], right: 'Right. The link skips over the removed node.', wrong: 'Point x past the node you want gone: x.next = x.next.next.', mono: true }),
  ],
  'dsa-recursion': [
    p('Factorial', ['def f(n):', '    return 1 if n <= 1 else n * f(n - 1)', 'print(f(6))'], '720', '6 × 5 × 4 × 3 × 2 × 1 = 720.'),
    p('Fibonacci', ['def fib(n):', '    if n < 2:', '        return n', '    return fib(n - 1) + fib(n - 2)', 'print([fib(i) for i in range(8)])'], '[0, 1, 1, 2, 3, 5, 8, 13]', 'Each number is the sum of the two before it.'),
    p('Reverse a string', ['def rev(s):', '    return s if len(s) <= 1 else rev(s[1:]) + s[0]', 'print(rev("tea"))'], 'aet', 'Reverse the rest, then put the first letter at the end.'),
    quiz({ prompt: 'What is the base case of factorial?', options: ['n <= 1 returns 1', 'n * factorial(n - 1)', 'n == 100', 'There isn’t one'], right: 'Right. It returns without calling itself.', wrong: 'The base case is the part that answers directly: factorial(1) is 1.' }),
  ],
};
