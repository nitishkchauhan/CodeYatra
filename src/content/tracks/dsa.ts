import { bug, lesson, order, predict, quiz, read, tap } from '../dsl';
import type { EditorStep, Lesson } from '../types';

const K = 'DSA';

const editor = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'> & { kicker?: string }): EditorStep => ({ type: 'editor', kicker: o.kicker ?? `PRACTICE · ${K}`, lang: 'python', ...o });

export const linearSearch = editor({
  title: 'Find the seat number',
  instructions: 'find(items, target) returns the index of target in the list, or -1 if it is not there. Check each item in turn.',
  file: 'search.py',
  starter: 'def find(items, target):\n    return -1\n',
  tests: [
    { call: 'find([12, 7, 30], 30)', expect: '2' },
    { call: 'find([12, 7, 30], 12)', expect: '0' },
    { call: 'find([12, 7, 30], 5)', expect: '-1' },
  ],
  hint: 'for i in range(len(items)):\n    if items[i] == target:\n        return i',
  solution: 'def find(items, target):\n    for i in range(len(items)):\n        if items[i] == target:\n            return i\n    return -1\n',
});

export const binarySearch = editor({
  title: 'Binary search',
  instructions: 'The list is sorted. Return the index of target in O(log n) by halving the range each step, or -1.',
  file: 'binary.py',
  starter: 'def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    # while lo <= hi: look at the middle\n    return -1\n',
  tests: [
    { call: 'search([2, 5, 8, 12, 16, 23], 12)', expect: '3' },
    { call: 'search([2, 5, 8, 12, 16, 23], 2)', expect: '0' },
    { call: 'search([2, 5, 8, 12, 16, 23], 7)', expect: '-1' },
    { call: 'search([], 1)', expect: '-1' },
  ],
  hint: 'mid = (lo + hi) // 2; if nums[mid] < target: lo = mid + 1; else hi = mid - 1',
  solution:
    'def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n',
});

export const balanced = editor({
  title: 'Balanced brackets',
  instructions: 'balanced(s) returns True when every (, [ and { is closed in the right order. Use a list as a stack.',
  file: 'brackets.py',
  starter: 'def balanced(s):\n    stack = []\n    return True\n',
  tests: [
    { call: 'balanced("([]{})")', expect: 'True' },
    { call: 'balanced("([)]")', expect: 'False' },
    { call: 'balanced("((")', expect: 'False' },
    { call: 'balanced("")', expect: 'True' },
  ],
  hint: 'pairs = {")": "(", "]": "[", "}": "{"}; push openers, and on a closer check stack.pop() == pairs[ch]',
  solution:
    'def balanced(s):\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack = []\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n',
});

export const firstRepeat = editor({
  title: 'First repeated booking',
  instructions: 'first_repeat(ids) returns the first id that appears a second time, or None. Use a set for O(n).',
  file: 'repeat.py',
  starter: 'def first_repeat(ids):\n    return None\n',
  tests: [
    { call: 'first_repeat([4, 9, 2, 9, 4])', expect: '9' },
    { call: 'first_repeat([1, 2, 3])', expect: 'None' },
    { call: 'first_repeat([7, 7])', expect: '7' },
  ],
  hint: 'seen = set(); if x in seen: return x; seen.add(x)',
  solution: 'def first_repeat(ids):\n    seen = set()\n    for x in ids:\n        if x in seen:\n            return x\n        seen.add(x)\n    return None\n',
});

export const palindrome = editor({
  title: 'Palindrome check',
  instructions: 'is_palindrome(s) ignores case and spaces. Use two pointers moving towards the middle.',
  file: 'palindrome.py',
  starter: 'def is_palindrome(s):\n    s = s.replace(" ", "").lower()\n    return False\n',
  tests: [
    { call: 'is_palindrome("Nitin")', expect: 'True' },
    { call: 'is_palindrome("never odd or even")', expect: 'True' },
    { call: 'is_palindrome("yatra")', expect: 'False' },
  ],
  hint: 'i, j = 0, len(s) - 1; while i < j: compare s[i] and s[j], then move both',
  solution:
    'def is_palindrome(s):\n    s = s.replace(" ", "").lower()\n    i, j = 0, len(s) - 1\n    while i < j:\n        if s[i] != s[j]:\n            return False\n        i += 1\n        j -= 1\n    return True\n',
});

export const DSA_LESSONS: Lesson[] = [
  lesson('dsa-bigo', 'Big-O: how code scales', 'dsa', ['Big-O counts steps as input grows', 'One loop is O(n), nested loops O(n²)', 'Halving each step is O(log n)'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Fast for 10, slow for a million?',
      body: 'Big-O describes how the work grows with the input size n. Checking every item once is O(n). A loop inside a loop is O(n²). Cutting the problem in half each step is O(log n), which barely grows at all.',
      lang: 'python',
      code: ['for x in items:          # O(n)', '    print(x)', '', 'for a in items:          # O(n²)', '    for b in items:', '        print(a, b)'],
      tip: 'For a million items, O(n²) is a trillion steps; O(log n) is about 20.',
    }),
    quiz({
      prompt: 'A loop over n items, with a loop over n items inside it. What is the Big-O?',
      options: ['O(n²)', 'O(n)', 'O(log n)', 'O(2n)'],
      mono: true,
      right: 'n iterations, each doing n steps: n × n.',
      wrong: 'Nested loops multiply: n outer × n inner = O(n²).',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Count the steps',
      lang: 'python',
      lines: ['steps = 0', 'n = 16', 'while n > 1:', '    n = n // 2', '    steps += 1', 'print(steps)'],
      answer: '4',
      explain: '16 → 8 → 4 → 2 → 1: four halvings. That is log₂ 16, so O(log n).',
    }),
  ]),

  lesson('dsa-linear', 'Linear search', 'dsa', ['Check items one by one', 'Return as soon as you find it', 'Worst case is O(n)'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Look at every item',
      body: 'Linear search walks through the list from the start until it finds the target. It works on any list, sorted or not, but in the worst case it checks all n items.',
      lang: 'python',
      code: ['def find(items, target):', '    for i in range(len(items)):', '        if items[i] == target:', '            return i', '    return -1'],
      tip: 'Return -1 (or None) to say "not found".',
    }),
    quiz({
      prompt: 'Searching a list of 1,000 items that does not contain the target. How many comparisons?',
      options: ['1,000', '1', '10', '500'],
      right: 'Linear search must check every item before giving up.',
      wrong: 'When the item is missing, every one of the 1,000 items is checked.',
    }),
    linearSearch,
  ]),

  lesson('dsa-binary', 'Binary search', 'dsa', ['Needs a sorted list', 'Compare with the middle, drop half', 'O(log n): 20 steps for a million items'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Guess the middle',
      body: 'In a sorted list, look at the middle. If the target is bigger, it can only be in the right half; if smaller, the left half. Each step throws away half the list.',
      lang: 'python',
      code: ['lo, hi = 0, len(nums) - 1', 'while lo <= hi:', '    mid = (lo + hi) // 2', '    if nums[mid] == target: return mid', '    if nums[mid] < target: lo = mid + 1', '    else: hi = mid - 1'],
      tip: 'Binary search on an unsorted list gives wrong answers.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Assemble binary search',
      instructions: 'Put the lines in order. The program searches for 23 and prints its index.',
      lang: 'python',
      lines: [
        'nums = [3, 9, 14, 23, 31]',
        'lo, hi = 0, len(nums) - 1',
        'while lo <= hi:',
        '    mid = (lo + hi) // 2',
        '    if nums[mid] == 23:',
        '        print(mid)',
        '        break',
        '    elif nums[mid] < 23:',
        '        lo = mid + 1',
        '    else:',
        '        hi = mid - 1',
      ],
      output: ['3'],
      explain: 'mid starts at 2 (14 < 23), so lo moves to 3, and mid 3 holds 23.',
    }),
    binarySearch,
  ]),

  lesson('dsa-sort', 'Sorting', 'dsa', ['Sorting puts items in order', 'Bubble sort swaps neighbours: O(n²)', 'Python\'s sorted() is O(n log n)'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Bubble the biggest to the end',
      body: 'Bubble sort compares neighbours and swaps them if they are out of order. After each pass the largest item has "bubbled" to the end. It is simple but O(n²); real code uses sorted().',
      lang: 'python',
      code: ['for end in range(len(a) - 1, 0, -1):', '    for i in range(end):', '        if a[i] > a[i + 1]:', '            a[i], a[i + 1] = a[i + 1], a[i]'],
      tip: 'sorted(trains, key=lambda t: t["fare"]) sorts by a field.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'After one pass',
      lang: 'python',
      lines: ['a = [5, 1, 4, 2]', 'for i in range(len(a) - 1):', '    if a[i] > a[i + 1]:', '        a[i], a[i + 1] = a[i + 1], a[i]', 'print(a)'],
      answer: '[1, 4, 2, 5]',
      explain: '5 keeps swapping right until it reaches the end.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Sorted the wrong way',
      instructions: 'This should sort fares from low to high, but it sorts high to low. Find the bug.',
      lang: 'python',
      lines: ['fares = [450, 120, 900, 300]', 'for end in range(len(fares) - 1, 0, -1):', '    for i in range(end):', '        if fares[i] < fares[i + 1]:', '            fares[i], fares[i + 1] = fares[i + 1], fares[i]', 'print(fares)'],
      bug: 3,
      fix: '        if fares[i] > fares[i + 1]:',
      explain: 'Swap when the left one is bigger, so small values move left.',
    }),
  ]),

  lesson('dsa-stack', 'Stacks', 'dsa', ['A stack is last in, first out', 'append pushes, pop removes the top', 'Great for undo and matching brackets'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Last in, first out',
      body: 'A stack is like a pile of plates: you add to the top and take from the top. In Python a list works as a stack with append() and pop().',
      lang: 'python',
      code: ['stack = []', 'stack.append("a")', 'stack.append("b")', 'print(stack.pop())  # b', 'print(stack.pop())  # a'],
      tip: 'Your browser\'s back button is a stack of pages.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Push and pop',
      lang: 'python',
      lines: ['s = []', 'for x in [1, 2, 3]:', '    s.append(x)', 's.pop()', 's.append(9)', 'print(s)'],
      answer: '[1, 2, 9]',
      explain: '3 is popped off the top, then 9 goes on.',
    }),
    balanced,
  ]),

  lesson('dsa-queue', 'Queues', 'dsa', ['A queue is first in, first out', 'deque gives O(1) at both ends', 'Used for BFS and task lines'], [
    read({
      kicker: `READ · ${K}`,
      title: 'First come, first served',
      body: 'A queue works like a ticket counter line: people join at the back and leave from the front. collections.deque makes both ends fast.',
      lang: 'python',
      code: ['from collections import deque', 'q = deque()', 'q.append("Asha")', 'q.append("Ravi")', 'print(q.popleft())  # Asha'],
      tip: 'list.pop(0) is O(n); deque.popleft() is O(1).',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Ticket counter',
      lang: 'python',
      lines: ['from collections import deque', 'q = deque(["A", "B", "C"])', 'q.popleft()', 'q.append("D")', 'print(q.popleft(), len(q))'],
      answer: 'B 2',
      explain: 'A leaves, D joins at the back; B is next, leaving C and D.',
    }),
    quiz({
      prompt: 'Which structure serves requests in arrival order?',
      options: ['Queue', 'Stack', 'Set', 'Dictionary'],
      right: 'A queue is first in, first out.',
      wrong: 'A stack serves the newest first. Arrival order is a queue.',
    }),
  ]),

  lesson('dsa-hash', 'Hashing with sets and dicts', 'dsa', ['Lookup in a set or dict is O(1) on average', 'Trade memory for speed', 'Count things with a dictionary'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Instant lookups',
      body: 'Checking "x in list" scans the whole list. A set or dict uses hashing to jump straight to the answer in O(1) on average. Many O(n²) problems become O(n) this way.',
      lang: 'python',
      code: ['counts = {}', 'for city in ["Pune", "Goa", "Pune"]:', '    counts[city] = counts.get(city, 0) + 1', 'print(counts)  # {\'Pune\': 2, \'Goa\': 1}'],
      tip: 'The classic interview move: "Can I use a hash map here?"',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Two-sum with a dict',
      lang: 'python',
      lines: ['nums = [3, 8, 5, 2]', 'target = 10', 'seen = {}', 'for i, n in enumerate(nums):', '    if target - n in seen:', '        print(seen[target - n], i)', '    seen[n] = i'],
      answer: '1 3',
      explain: 'At i = 3 (value 2), 10 − 2 = 8 was seen at index 1.',
    }),
    firstRepeat,
  ]),

  lesson('dsa-pointers', 'Two pointers', 'dsa', ['Move two indexes towards each other', 'Solves pair and palindrome problems in O(n)', 'Works best on sorted data'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Squeeze from both ends',
      body: 'Put one pointer at the start and one at the end, and move them inwards. Each step drops one item from consideration, so the whole scan is O(n).',
      lang: 'python',
      code: ['i, j = 0, len(s) - 1', 'while i < j:', '    # compare s[i] and s[j]', '    i += 1', '    j -= 1'],
      tip: 'Reversing a list in place is a two-pointer swap.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Reverse in place',
      lang: 'python',
      lines: ['a = [1, 2, 3, 4, 5]', 'i, j = 0, len(a) - 1', 'while i < j:', '    a[i], a[j] = a[j], a[i]', '    i += 1', '    j -= 1', 'print(a)'],
      answer: '[5, 4, 3, 2, 1]',
      explain: 'Swaps the ends and moves inwards; the middle item stays put.',
    }),
    palindrome,
  ]),

  lesson('dsa-recursion', 'Recursion', 'dsa', ['A function can call itself', 'Every recursion needs a base case', 'Each call works on a smaller problem'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Solve a smaller version',
      body: 'A recursive function solves a problem by calling itself on a smaller input, until it reaches a base case it can answer directly. Without a base case it never stops.',
      lang: 'python',
      code: ['def fact(n):', '    if n == 0:        # base case', '        return 1', '    return n * fact(n - 1)'],
      tip: 'Python stops deep recursion after about 1,000 calls.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Sum of digits',
      lang: 'python',
      lines: ['def digits(n):', '    if n < 10:', '        return n', '    return n % 10 + digits(n // 10)', '', 'print(digits(4071))'],
      answer: '12',
      explain: '4 + 0 + 7 + 1 = 12.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Never-ending',
      instructions: 'This countdown never stops (RecursionError). Which line is wrong?',
      lang: 'python',
      lines: ['def countdown(n):', '    if n == 0:', '        print("Go!")', '        return', '    print(n)', '    countdown(n + 1)', '', 'countdown(3)'],
      bug: 5,
      fix: '    countdown(n - 1)',
      explain: 'n must shrink towards the base case 0; n + 1 moves away from it.',
    }),
  ]),

  lesson('dsa-linked', 'Linked lists', 'dsa', ['Each node points to the next', 'Inserting at the head is O(1)', 'Reaching item k takes k steps'], [
    read({
      kicker: `READ · ${K}`,
      title: 'A chain of nodes',
      body: 'A linked list stores each value in a node that also holds a link to the next node. Adding at the front is instant, but finding the 100th item means walking 100 links.',
      lang: 'python',
      code: ['class Node:', '    def __init__(self, val, next=None):', '        self.val = val', '        self.next = next', '', 'head = Node(1, Node(2, Node(3)))'],
      tip: 'Arrays are fast to index; linked lists are fast to insert into.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Walk the list',
      lang: 'python',
      lines: [
        'class Node:',
        '    def __init__(self, val, next=None):',
        '        self.val = val',
        '        self.next = next',
        '',
        'head = Node(5, Node(8, Node(2)))',
        'total = 0',
        'node = head',
        'while node:',
        '    total += node.val',
        '    node = node.next',
        'print(total)',
      ],
      answer: '15',
      explain: '5 + 8 + 2 = 15. The loop ends when node becomes None.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Follow the link',
      instructions: 'Tap the field that leads to the next node.',
      lang: 'python',
      lines: ['node = node.next'],
      target: { line: 0, token: 'next' },
      explain: 'next holds the reference to the following node.',
    }),
  ]),
];
