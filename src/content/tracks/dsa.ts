import type { EditorStep } from '../types';

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
