// DSA Advanced: the topics placement coding rounds test most, in Python with real tests.
import { lesson, order, predict, quiz, read } from '../dsl';
import type { EditorStep, Lesson } from '../types';

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

export const DSA2_LESSONS: Lesson[] = [
  lesson('dsa2-tree', 'Binary trees', 'dsa', ['A tree is nodes with children', 'Recursion fits trees naturally', 'Height = 1 + taller subtree'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Data that branches',
      body: 'A binary tree node holds a value and up to two children. Almost every tree problem is solved the same way: answer for the left subtree, answer for the right, then combine them at the node.',
      lang: 'python',
      code: ['# (value, left, right)', 'tree = (1,', '        (2, (4, None, None), None),', '        (3, None, None))'],
      tip: 'Base case first: what is the answer for an empty tree?',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'In-order traversal',
      lang: 'python',
      lines: ['def inorder(t):', '    if t is None:', '        return []', '    v, left, right = t', '    return inorder(left) + [v] + inorder(right)', '', 'print(inorder((2, (1, None, None), (3, None, None))))'],
      answer: '[1, 2, 3]',
      explain: 'Left subtree, then the node, then the right subtree.',
    }),
    treeHeight,
  ], 8),

  lesson('dsa2-bst', 'Binary search trees', 'dsa', ['Left < node < right at every node', 'Search is O(log n) when balanced', 'Check ranges, not just children'], [
    read({
      kicker: `READ · ${K}`,
      title: 'A tree that stays sorted',
      body: 'In a BST every value in the left subtree is smaller than the node and every value in the right subtree is larger. That lets search skip half the tree at each step, like binary search.',
      lang: 'python',
      code: ['def contains(t, x):', '    if t is None: return False', '    if x == t[0]: return True', '    return contains(t[1] if x < t[0] else t[2], x)'],
      tip: 'Classic trap: checking only the direct children is not enough.',
    }),
    quiz({
      prompt: 'Searching a balanced BST of 1,000,000 values takes about…',
      options: ['20 steps', '1,000 steps', '500,000 steps', '1 step'],
      right: 'log₂(1,000,000) ≈ 20.',
      wrong: 'Each step halves the search space: about log₂ n = 20 steps.',
    }),
    isBst,
  ], 8),

  lesson('dsa2-heap', 'Heaps and priority queues', 'dsa', ['A heap gives the min (or max) in O(1)', 'Push and pop are O(log n)', 'heapq is a min-heap'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Always know the smallest',
      body: 'A heap keeps the smallest item at the top. Python\'s heapq turns a list into a min-heap. It is the tool for "top k", scheduling and Dijkstra.',
      lang: 'python',
      code: ['import heapq', 'h = []', 'for fare in [450, 120, 900]:', '    heapq.heappush(h, fare)', 'print(heapq.heappop(h))  # 120'],
      tip: 'For a max-heap, push negative numbers.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Pop order',
      lang: 'python',
      lines: ['import heapq', 'h = [7, 2, 9, 4]', 'heapq.heapify(h)', 'heapq.heappush(h, 1)', 'print([heapq.heappop(h) for _ in range(3)])'],
      answer: '[1, 2, 4]',
      explain: 'Pops always return the smallest remaining value.',
    }),
    kLargest,
  ], 7),

  lesson('dsa2-bfs', 'Graphs and BFS', 'dsa', ['Graphs are nodes and edges', 'Store them as adjacency lists', 'BFS finds the fewest hops'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Stations and routes',
      body: 'A graph is a set of nodes connected by edges, like stations and train routes. Store it as a dict of neighbour lists. Breadth-first search explores in rings: all stations 1 hop away, then 2 hops, so the first time it reaches the goal is the shortest route.',
      lang: 'python',
      code: ['graph = {', '    "Delhi": ["Agra", "Jaipur"],', '    "Agra": ["Bhopal"],', '    "Jaipur": ["Bhopal"],', '    "Bhopal": [],', '}'],
      tip: 'BFS for fewest edges; Dijkstra when edges have different weights.',
    }),
    quiz({
      prompt: 'Why does BFS find the fewest hops?',
      options: ['It visits nodes in order of distance', 'It always goes deepest first', 'It sorts the graph', 'It uses recursion'],
      right: 'Each "ring" of the queue is one hop further away.',
      wrong: 'BFS explores level by level, so nearer nodes come first.',
    }),
    bfsSteps,
  ], 8),

  lesson('dsa2-dfs', 'DFS and connected parts', 'dsa', ['DFS goes as deep as possible first', 'Mark visited cells to avoid loops', 'Count how many DFS runs you start'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Explore everything you can reach',
      body: 'Depth-first search follows one path as far as it goes, then backtracks. Starting a DFS from every unvisited cell, and counting the starts, gives the number of connected parts. That is the famous islands problem.',
      lang: 'python',
      code: ['def dfs(r, c):', '    if out of bounds or water or seen: return', '    seen.add((r, c))', '    for each neighbour: dfs(neighbour)'],
      tip: 'Recursion depth can get large; an explicit stack avoids that.',
    }),
    quiz({
      prompt: 'DFS on a grid with R rows and C columns runs in…',
      options: ['O(R × C)', 'O(R + C)', 'O(log R)', 'O((R × C)²)'],
      right: 'Every cell is visited at most once.',
      wrong: 'Each cell is marked once, so the work is proportional to R × C.',
    }),
    islands,
  ], 9),

  lesson('dsa2-backtrack', 'Backtracking', 'dsa', ['Try a choice, recurse, then undo it', 'Subsets: take or skip each item', 'There are 2ⁿ subsets'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Try, explore, undo',
      body: 'Backtracking builds answers one choice at a time. At each step it makes a choice, explores everything after it, then undoes the choice and tries the next one. Subsets, permutations and Sudoku all work this way.',
      lang: 'python',
      code: ['def go(i, chosen):', '    if i == len(nums):', '        out.append(chosen[:])', '        return', '    chosen.append(nums[i]); go(i + 1, chosen)  # take', '    chosen.pop();           go(i + 1, chosen)  # skip'],
      tip: 'Copy the list (chosen[:]) when saving it, or later changes will alter it.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'How many subsets?',
      lang: 'python',
      lines: ['from itertools import combinations', 'items = ["chai", "samosa", "jalebi", "lassi"]', 'total = sum(1 for r in range(len(items) + 1) for _ in combinations(items, r))', 'print(total)'],
      answer: '16',
      explain: 'Each of the 4 items is in or out: 2⁴ = 16.',
    }),
    subsets,
  ], 9),

  lesson('dsa2-dp1', 'Dynamic programming: memoization', 'dsa', ['Plain recursion can repeat work', 'Remember answers you already computed', 'Bottom-up loops avoid recursion'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Never solve the same thing twice',
      body: 'climb(40) with plain recursion makes over 300 million calls, because climb(38) is solved again and again. Storing each answer the first time (memoization), or filling answers from the bottom up, makes it O(n).',
      lang: 'python',
      code: ['from functools import lru_cache', '', '@lru_cache(maxsize=None)', 'def climb(n):', '    if n <= 1:', '        return 1', '    return climb(n - 1) + climb(n - 2)'],
      tip: 'Ask: what is the answer for n, using answers for smaller n?',
    }),
    quiz({
      prompt: 'With memoization, climb(n) runs in…',
      options: ['O(n)', 'O(2ⁿ)', 'O(n²)', 'O(log n)'],
      right: 'Each n from 0 to n is computed once.',
      wrong: 'Memoization stores each answer, so each n is solved once: O(n).',
    }),
    climb,
  ], 8),

  lesson('dsa2-dp2', 'Dynamic programming: tables', 'dsa', ['Define what best[x] means', 'Build answers from smaller ones', 'Greedy is not always right'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Fill a table of answers',
      body: 'For coin change, best[x] means "fewest coins that make x". best[0] is 0, and best[x] is 1 + the best of best[x − c] for each coin c. Fill the table from 0 up to the amount.',
      lang: 'python',
      code: ['best = [0] + [inf] * amount', 'for x in range(1, amount + 1):', '    for c in coins:', '        if c <= x:', '            best[x] = min(best[x], best[x - c] + 1)'],
      tip: 'Greedy (biggest coin first) gives 3 coins for 6 with [1, 3, 4]. DP finds 2 (3 + 3).',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Grid paths',
      lang: 'python',
      lines: ['rows, cols = 3, 3', 'ways = [[1] * cols for _ in range(rows)]', 'for r in range(1, rows):', '    for c in range(1, cols):', '        ways[r][c] = ways[r - 1][c] + ways[r][c - 1]', 'print(ways[-1][-1])'],
      answer: '6',
      explain: 'Each cell sums the ways from above and from the left.',
    }),
    minCoins,
  ], 9),

  lesson('dsa2-greedy', 'Greedy algorithms', 'dsa', ['Make the best local choice each time', 'Works when a local choice is provably safe', 'Sorting usually comes first'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Take the best choice now',
      body: 'A greedy algorithm makes the choice that looks best right now and never revisits it. For scheduling meetings in one room, always picking the meeting that ends earliest leaves the most time for the rest, and that is provably optimal.',
      lang: 'python',
      code: ['for start, end in sorted(meetings, key=lambda m: m[1]):', '    if start >= free_at:', '        count += 1', '        free_at = end'],
      tip: 'If you cannot argue why greedy is safe, try DP instead.',
    }),
    quiz({
      prompt: 'Which choice makes the meeting-room greedy correct?',
      options: ['Earliest end time', 'Earliest start time', 'Shortest meeting', 'Longest meeting'],
      right: 'Ending first leaves the most room for everything after.',
      wrong: 'Starting first or being shortest can block more meetings. Earliest end is safe.',
    }),
    meetings,
  ], 7),

  lesson('dsa2-merge', 'Merge sort', 'dsa', ['Split in half, sort each half, merge', 'Merging two sorted lists is O(n)', 'Merge sort is always O(n log n)'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Divide and conquer',
      body: 'Merge sort splits the list in half until each part has one item, then merges the parts back in order. Merging two sorted lists is a two-pointer walk. There are log n levels of splitting with O(n) work per level.',
      lang: 'python',
      code: ['def merge_sort(a):', '    if len(a) <= 1:', '        return a', '    mid = len(a) // 2', '    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))'],
      tip: 'Merge sort is stable and has a guaranteed O(n log n), unlike quicksort.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Assemble merge sort',
      instructions: 'Put merge sort in order. The program sorts a list of fares.',
      lang: 'python',
      lines: [
        'def merge_sort(a):',
        '    if len(a) <= 1:',
        '        return a',
        '    mid = len(a) // 2',
        '    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])',
        '    out = []',
        '    while left and right:',
        '        out.append(left.pop(0) if left[0] <= right[0] else right.pop(0))',
        '    return out + left + right',
        'print(merge_sort([450, 120, 900, 300]))',
      ],
      output: ['[120, 300, 450, 900]'],
      explain: 'Base case, split, sort halves, then merge by always taking the smaller head.',
    }),
    mergeSorted,
  ], 9),
];
