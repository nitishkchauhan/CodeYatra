// DSA Advanced coding exercises, in Python with real tests. The lessons are in dsaAdvanced.ts.
import type { EditorStep } from '../types';

const K = 'DSA ADVANCED';

const code = (o: Omit<EditorStep, 'type' | 'kicker' | 'lang'>): EditorStep => ({ type: 'editor', kicker: `CODING ROUND · ${K}`, lang: 'python', ...o });

// Trees are written as tuples: (value, left, right), with None for an empty subtree.
const TREE_NOTE = 'Trees here are tuples: (value, left, right), and None means empty.';

export const treeHeight = code({
  title: 'Height of a tree',
  instructions: `height(t) returns the number of levels in the tree. An empty tree (None) has height 0. ${TREE_NOTE}`,
  file: 'height.py',
  starter: 'def height(t):\n    if t is None:\n        return 0\n    return 1\n',
  tests: [
    { call: 'height(None)', expect: '0' },
    { call: 'height((1, None, None))', expect: '1' },
    { call: 'height((1, (2, (4, None, None), None), (3, None, None)))', expect: '3' },
  ],
  hint: 'return 1 + max(height(t[1]), height(t[2]))',
  solution: 'def height(t):\n    if t is None:\n        return 0\n    return 1 + max(height(t[1]), height(t[2]))\n',
});

export const isBst = code({
  title: 'Is it a valid BST?',
  instructions: `is_bst(t) returns True if every value in a left subtree is smaller than its node and every value in a right subtree is larger. ${TREE_NOTE}`,
  file: 'bst.py',
  starter: 'def is_bst(t, low=float("-inf"), high=float("inf")):\n    return True\n',
  tests: [
    { call: 'is_bst((5, (3, None, None), (8, None, None)))', expect: 'True' },
    { call: 'is_bst((5, (3, None, (6, None, None)), (8, None, None)))', expect: 'False' },
    { call: 'is_bst(None)', expect: 'True' },
  ],
  hint: 'Pass the allowed range down: left gets (low, value), right gets (value, high).',
  solution:
    'def is_bst(t, low=float("-inf"), high=float("inf")):\n    if t is None:\n        return True\n    v, left, right = t\n    if not (low < v < high):\n        return False\n    return is_bst(left, low, v) and is_bst(right, v, high)\n',
});

export const kLargest = code({
  title: 'Top k fares',
  instructions: 'k_largest(nums, k) returns the k largest numbers, biggest first. Use heapq.',
  file: 'topk.py',
  starter: 'import heapq\n\ndef k_largest(nums, k):\n    return nums[:k]\n',
  tests: [
    { call: 'k_largest([450, 2900, 1200, 850, 3100], 2)', expect: '[3100, 2900]' },
    { call: 'k_largest([5, 1, 3], 3)', expect: '[5, 3, 1]' },
    { call: 'k_largest([], 2)', expect: '[]' },
  ],
  hint: 'heapq.nlargest(k, nums) does it in O(n log k).',
  solution: 'import heapq\n\ndef k_largest(nums, k):\n    return heapq.nlargest(k, nums)\n',
});

export const bfsSteps = code({
  title: 'Fewest stops',
  instructions: 'graph maps each station to its neighbours. fewest_stops(graph, start, goal) returns the minimum number of hops, or -1 if unreachable. Use BFS.',
  file: 'route.py',
  starter: 'from collections import deque\n\ndef fewest_stops(graph, start, goal):\n    return -1\n',
  tests: [
    { call: 'fewest_stops({"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": ["E"], "E": []}, "A", "E")', expect: '3' },
    { call: 'fewest_stops({"A": ["B"], "B": []}, "A", "A")', expect: '0' },
    { call: 'fewest_stops({"A": [], "B": []}, "A", "B")', expect: '-1' },
  ],
  hint: 'Queue (node, hops) pairs and keep a visited set.',
  solution:
    'from collections import deque\n\ndef fewest_stops(graph, start, goal):\n    seen = {start}\n    q = deque([(start, 0)])\n    while q:\n        node, hops = q.popleft()\n        if node == goal:\n            return hops\n        for nxt in graph.get(node, []):\n            if nxt not in seen:\n                seen.add(nxt)\n                q.append((nxt, hops + 1))\n    return -1\n',
});

export const islands = code({
  title: 'Count the islands',
  instructions: 'grid is a list of strings of "1" (land) and "0" (water). count_islands(grid) returns how many separate islands there are (land joined up, down, left or right).',
  file: 'islands.py',
  starter: 'def count_islands(grid):\n    return 0\n',
  tests: [
    { call: 'count_islands(["110", "010", "001"])', expect: '2' },
    { call: 'count_islands(["000"])', expect: '0' },
    { call: 'count_islands(["101", "010", "101"])', expect: '5' },
  ],
  hint: 'For every unvisited "1", start a DFS that marks its whole island, and count how many DFS calls you start.',
  solution:
    'def count_islands(grid):\n    rows, cols = len(grid), len(grid[0]) if grid else 0\n    seen = set()\n\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1" or (r, c) in seen:\n            return\n        seen.add((r, c))\n        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n            dfs(r + dr, c + dc)\n\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == "1" and (r, c) not in seen:\n                dfs(r, c)\n                count += 1\n    return count\n',
});

export const subsets = code({
  title: 'All subsets',
  instructions: 'subsets(nums) returns every subset of nums (including the empty one). Each subset keeps the original order. Use backtracking.',
  file: 'subsets.py',
  starter: 'def subsets(nums):\n    return [[]]\n',
  tests: [
    { call: 'sorted(subsets([1, 2, 3]))', expect: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]' },
    { call: 'subsets([])', expect: '[[]]' },
  ],
  hint: 'def go(i, chosen): at each index, either take nums[i] or skip it.',
  solution:
    'def subsets(nums):\n    out = []\n\n    def go(i, chosen):\n        if i == len(nums):\n            out.append(chosen[:])\n            return\n        chosen.append(nums[i])\n        go(i + 1, chosen)\n        chosen.pop()\n        go(i + 1, chosen)\n\n    go(0, [])\n    return out\n',
});

export const climb = code({
  title: 'Climbing the station stairs',
  instructions: 'You can climb 1 or 2 steps at a time. climb(n) returns the number of different ways to reach step n. Make it fast with memoization.',
  file: 'stairs.py',
  // Not the plain recursive version: climb(80) that way would take hours.
  starter: 'def climb(n):\n    # ways(n) = ways(n - 1) + ways(n - 2), but remember answers\n    return n\n',
  tests: [
    { call: 'climb(1)', expect: '1' },
    { call: 'climb(10)', expect: '89' },
    { call: 'climb(80)', expect: '37889062373143906' },
  ],
  hint: 'Keep a dict of answers you already know, or loop with two variables.',
  solution: 'def climb(n):\n    a, b = 1, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b\n',
});

export const minCoins = code({
  title: 'Fewest coins',
  instructions: 'min_coins(coins, amount) returns the fewest coins that add up to amount, or -1 if it cannot be done. Build a DP table from 0 up to amount.',
  file: 'coins.py',
  starter: 'def min_coins(coins, amount):\n    return -1\n',
  tests: [
    { call: 'min_coins([1, 2, 5], 11)', expect: '3' },
    { call: 'min_coins([2], 3)', expect: '-1' },
    { call: 'min_coins([1, 3, 4], 6)', expect: '2' },
    { call: 'min_coins([7], 0)', expect: '0' },
  ],
  hint: 'best[x] = min(best[x - c] + 1 for each coin c ≤ x). Greedy fails on [1, 3, 4] for 6.',
  solution:
    'def min_coins(coins, amount):\n    INF = float("inf")\n    best = [0] + [INF] * amount\n    for x in range(1, amount + 1):\n        for c in coins:\n            if c <= x and best[x - c] + 1 < best[x]:\n                best[x] = best[x - c] + 1\n    return best[amount] if best[amount] != INF else -1\n',
});

export const meetings = code({
  title: 'Most meetings in one room',
  instructions: 'meetings is a list of (start, end). max_meetings(meetings) returns the most meetings that fit in one room without overlapping (one may start when another ends).',
  file: 'meetings.py',
  starter: 'def max_meetings(meetings):\n    return len(meetings)\n',
  tests: [
    { call: 'max_meetings([(1, 3), (2, 4), (3, 5), (6, 7)])', expect: '3' },
    { call: 'max_meetings([])', expect: '0' },
    { call: 'max_meetings([(1, 10), (2, 3), (3, 4)])', expect: '2' },
  ],
  hint: 'Sort by end time and always take the meeting that ends first.',
  solution:
    'def max_meetings(meetings):\n    count, free_at = 0, float("-inf")\n    for start, end in sorted(meetings, key=lambda m: m[1]):\n        if start >= free_at:\n            count += 1\n            free_at = end\n    return count\n',
});

export const mergeSorted = code({
  title: 'Merge two sorted lists',
  instructions: 'merge(a, b) merges two sorted lists into one sorted list in O(n + m), without calling sort().',
  file: 'merge.py',
  starter: 'def merge(a, b):\n    return a + b\n',
  tests: [
    { call: 'merge([1, 4, 9], [2, 3, 10])', expect: '[1, 2, 3, 4, 9, 10]' },
    { call: 'merge([], [5])', expect: '[5]' },
    { call: 'merge([1, 1], [1])', expect: '[1, 1, 1]' },
  ],
  hint: 'Walk both lists with two indexes, always taking the smaller head.',
  solution:
    'def merge(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i])\n            i += 1\n        else:\n            out.append(b[j])\n            j += 1\n    return out + a[i:] + b[j:]\n',
});
