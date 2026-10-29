// Extra practice for each DSA Advanced module. Python predicts run in tests.
import { predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · DSA ADVANCED';

export const DSA2_DRILLS: Record<string, Step[]> = {
  'dsa2-tree': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['t = (1, (2, (4, None, None), (5, None, None)), (3, None, None))', 'def pre(t):', '    return [t[0]] + pre(t[1]) + pre(t[2]) if t else []', 'print(pre(t))'], answer: '[1, 2, 4, 5, 3]', explain: 'Preorder: the node, then its left subtree, then its right.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['t = (5, (3, None, None), (8, (7, None, None), None))', 'def total(t):', '    return t[0] + total(t[1]) + total(t[2]) if t else 0', 'print(total(t))'], answer: '23', explain: '5 + 3 + 8 + 7.' }),
    quiz({ prompt: 'Which traversal visits a tree level by level?', options: ['Level order (BFS with a queue)', 'Inorder', 'Preorder', 'Postorder'], right: 'Right.', wrong: 'The three recursive orders go deep first; level order uses a queue.' }),
    quiz({ prompt: 'A tree function visits every node once. What is its time?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], right: 'Right.', wrong: 'One visit per node is O(n).', mono: true }),
  ],
  'dsa2-bst': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def insert(t, x):', '    if t is None:', '        return (x, None, None)', '    v, l, r = t', '    return (v, insert(l, x), r) if x < v else (v, l, insert(r, x))', 'def inorder(t):', '    return inorder(t[1]) + [t[0]] + inorder(t[2]) if t else []', 't = None', 'for x in [40, 20, 60, 10, 30]:', '    t = insert(t, x)', 'print(inorder(t))'], answer: '[10, 20, 30, 40, 60]', explain: 'Inorder of a BST is sorted.' }),
    predict({ kicker: K, title: 'Smallest value', lang: 'python', lines: ['t = (50, (30, (20, None, None), None), (70, None, None))', 'while t[1]:', '    t = t[1]', 'print(t[0])'], answer: '20', explain: 'Keep going left to reach the smallest value.' }),
    quiz({ prompt: 'Searching a balanced BST of a million values takes about how many steps?', options: ['20', '1000', '500,000', '1'], right: 'Right: log₂ of a million.', wrong: 'Each step halves what is left: about 20 steps.', mono: true }),
    quiz({ prompt: 'Is (5, (3, None, (6, None, None)), (8, None, None)) a valid BST?', options: ['No: 6 is in 5’s left subtree', 'Yes', 'Only if 8 > 6', 'Only if it is balanced'], right: 'Right.', wrong: 'Everything left of 5 must be smaller than 5.' }),
  ],
  'dsa2-heap': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import heapq', 'h = []', 'for x in [5, 1, 4]:', '    heapq.heappush(h, -x)', 'print(-heapq.heappop(h), -heapq.heappop(h))'], answer: '5 4', explain: 'Negatives turn the min-heap into a max-heap.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import heapq', 'print(heapq.nsmallest(2, [7, 3, 9, 1]), heapq.nlargest(1, [7, 3, 9, 1]))'], answer: '[1, 3] [9]', explain: 'nsmallest and nlargest return lists.' }),
    predict({ kicker: K, title: 'Merging sorted lists', lang: 'python', lines: ['import heapq', 'print(list(heapq.merge([1, 4, 7], [2, 5], [3, 6])))'], answer: '[1, 2, 3, 4, 5, 6, 7]', explain: 'heapq.merge combines sorted lists using a heap of the fronts.' }),
    quiz({ prompt: 'In the list form of a heap, where are the children of index 2?', options: ['5 and 6', '3 and 4', '4 and 5', '1 and 3'], right: 'Right: 2i + 1 and 2i + 2.', wrong: 'Children of i are at 2i + 1 and 2i + 2.', mono: true }),
  ],
  'dsa2-bfs': [
    predict({ kicker: K, title: 'One-way edges', lang: 'python', lines: ['graph = {}', 'for a, b in [("Dublin", "Athens"), ("Athens", "Jersey")]:', '    graph.setdefault(a, []).append(b)', 'print(graph.get("Jersey", []), graph["Athens"])'], answer: '[] [\'Jersey\']', explain: 'Each edge was only added one way, so Jersey has no neighbours. Add both ways for two-way roads.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from collections import deque', 'graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}', 'seen, q, order = {"A"}, deque(["A"]), []', 'while q:', '    n = q.popleft()', '    order.append(n)', '    for m in graph[n]:', '        if m not in seen:', '            seen.add(m)', '            q.append(m)', 'print("".join(order))'], answer: 'ABCD', explain: 'BFS visits ring by ring: A, then B and C, then D.' }),
    quiz({ prompt: 'BFS on a graph with V nodes and E edges takes…', options: ['O(V + E)', 'O(V × E)', 'O(V²)', 'O(log V)'], right: 'Right.', wrong: 'Each node is queued once and each edge checked once.', mono: true }),
    quiz({ prompt: 'Which structure does BFS use?', options: ['A queue', 'A stack', 'A heap', 'A set only'], right: 'Right: first in, first out.', wrong: 'BFS needs first in, first out: a queue (deque).' }),
  ],
  'dsa2-dfs': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['graph = {1: [2], 2: [1], 3: [4], 4: [3], 5: []}', 'seen = set()', 'def dfs(n):', '    seen.add(n)', '    for m in graph[n]:', '        if m not in seen:', '            dfs(m)', 'parts = 0', 'for n in graph:', '    if n not in seen:', '        dfs(n)', '        parts += 1', 'print(parts)'], answer: '3', explain: 'Groups {1, 2}, {3, 4} and {5}.' }),
    predict({ kicker: K, title: 'With a stack', lang: 'python', lines: ['graph = {"A": ["B", "C"], "B": [], "C": ["D"], "D": []}', 'stack, seen, order = ["A"], set(), []', 'while stack:', '    n = stack.pop()', '    if n in seen:', '        continue', '    seen.add(n)', '    order.append(n)', '    stack.extend(reversed(graph[n]))', 'print("".join(order))'], answer: 'ABCD', explain: 'Pushing neighbours reversed makes the stack visit them in listed order, as recursion would.' }),
    quiz({ prompt: 'grid[-1][0] in Python, for a grid of 3 rows, is…', options: ['The first cell of the last row', 'An IndexError', 'None', 'The first cell of the first row'], right: 'Right. That is why grid DFS checks r < 0.', wrong: 'Negative indexes count from the end.' }),
    quiz({ prompt: 'Which can find whether a maze has any way out?', options: ['DFS or BFS', 'Only Dijkstra', 'Only binary search', 'Sorting'], right: 'Right. Any full search of reachable cells works.', wrong: 'Both DFS and BFS explore everything reachable.' }),
  ],
  'dsa2-topo': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from collections import deque', 'graph = {"wake": ["bath", "tea"], "bath": ["dress"], "tea": ["dress"], "dress": []}', 'indeg = {n: 0 for n in graph}', 'for n in graph:', '    for m in graph[n]:', '        indeg[m] += 1', 'q, order = deque([n for n in graph if indeg[n] == 0]), []', 'while q:', '    n = q.popleft()', '    order.append(n)', '    for m in graph[n]:', '        indeg[m] -= 1', '        if indeg[m] == 0:', '            q.append(m)', 'print(order)'], answer: '[\'wake\', \'bath\', \'tea\', \'dress\']', explain: 'dress waits until both bath and tea are done.' }),
    predict({ kicker: K, title: 'graphlib', lang: 'python', lines: ['from graphlib import TopologicalSorter', 'needs = {"deploy": {"build"}, "build": {"test"}, "test": set()}', 'print(list(TopologicalSorter(needs).static_order()))'], answer: '[\'test\', \'build\', \'deploy\']', explain: 'graphlib takes what each task needs and gives a valid order.' }),
    quiz({ prompt: 'Which graphs have a topological order?', options: ['Directed graphs with no cycles (DAGs)', 'Every graph', 'Only trees', 'Undirected graphs'], right: 'Right.', wrong: 'A cycle makes an order impossible; a DAG always has one.' }),
    quiz({ prompt: 'In Kahn’s algorithm, which nodes start in the queue?', options: ['Those with in-degree 0', 'Those with the most edges', 'The alphabetically first', 'All nodes'], right: 'Right: nothing needs to come before them.', wrong: 'Start with nodes that have no prerequisites.' }),
  ],
  'dsa2-dijkstra': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['import heapq', 'graph = {"A": [("B", 5), ("C", 1)], "C": [("B", 1)], "B": []}', 'best, h = {"A": 0}, [(0, "A")]', 'while h:', '    d, n = heapq.heappop(h)', '    if d > best[n]:', '        continue', '    for m, w in graph[n]:', '        if d + w < best.get(m, float("inf")):', '            best[m] = d + w', '            heapq.heappush(h, (d + w, m))', 'print(best)'], answer: '{\'A\': 0, \'B\': 2, \'C\': 1}', explain: 'A → C → B costs 2, cheaper than the direct 5.' }),
    quiz({ prompt: 'All edges cost the same. Which is simplest for cheapest paths?', options: ['BFS', 'Dijkstra is required', 'DFS', 'Sorting the edges'], right: 'Right. Equal costs make fewest hops the cheapest.', wrong: 'With equal weights, BFS already finds the cheapest path.' }),
    quiz({ prompt: 'Why does Dijkstra skip a popped entry when d > best[node]?', options: ['It is an old, worse entry left in the heap', 'The node is unreachable', 'It is a negative edge', 'To stop early'], right: 'Right.', wrong: 'The heap can hold stale entries from before a cheaper path was found.' }),
    quiz({ prompt: 'Which algorithm handles negative edge costs?', options: ['Bellman-Ford', 'Dijkstra', 'BFS', 'Merge sort'], right: 'Right.', wrong: 'Bellman-Ford allows negative edges (but no negative cycles).' }),
  ],
  'dsa2-backtrack': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['from itertools import combinations', 'print(list(combinations("ABC", 2)))'], answer: '[(\'A\', \'B\'), (\'A\', \'C\'), (\'B\', \'C\')]', explain: 'Every pair, in the original order.' }),
    predict({ kicker: K, title: 'Subsets that add up', lang: 'python', lines: ['nums, target, found = [2, 3, 5], 5, []', 'def go(i, chosen, total):', '    if total == target:', '        found.append(chosen[:])', '        return', '    if i == len(nums) or total > target:', '        return', '    chosen.append(nums[i])', '    go(i + 1, chosen, total + nums[i])', '    chosen.pop()', '    go(i + 1, chosen, total)', 'go(0, [], 0)', 'print(found)'], answer: '[[2, 3], [5]]', explain: 'Two subsets add up to 5; branches over 5 are pruned.' }),
    quiz({ prompt: 'How many orderings of 5 different items are there?', options: ['120', '25', '32', '10'], right: 'Right: 5! = 120.', wrong: '5 × 4 × 3 × 2 × 1 = 120.', mono: true }),
    quiz({ prompt: 'What does “undo” mean in backtracking?', options: ['Removing the last choice before trying the next one', 'Restarting the program', 'Sorting the answers', 'Deleting the output'], right: 'Right: append, recurse, pop.', wrong: 'After exploring a choice, undo it so the next branch starts clean.' }),
  ],
  'dsa2-dp1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['memo = {}', 'def ways(n):', '    if n <= 1:', '        return 1', '    if n not in memo:', '        memo[n] = ways(n - 1) + ways(n - 2) + (ways(n - 3) if n >= 3 else 0)', '    return memo[n]', 'print(ways(4))'], answer: '7', explain: 'With steps of 1, 2 or 3: ways(4) = ways(3) + ways(2) + ways(1) = 4 + 2 + 1.' }),
    predict({ kicker: K, title: 'Bottom-up', lang: 'python', lines: ['n = 7', 'dp = [0, 1]', 'for i in range(2, n + 1):', '    dp.append(dp[i - 1] + dp[i - 2])', 'print(dp[n], len(dp))'], answer: '13 8', explain: 'Fibonacci up to 7 is 13, and the table holds 0 to 7.' }),
    quiz({ prompt: 'Memoized ways(n) with steps of 1 or 2 runs in…', options: ['O(n)', 'O(2ⁿ)', 'O(log n)', 'O(n²)'], right: 'Right: each n is solved once.', wrong: 'With a memo, every n from 0 to n is computed once.', mono: true }),
    quiz({ prompt: 'Why might bottom-up beat a recursive memo for n = 100,000?', options: ['No recursion, so no recursion limit', 'It gives a different answer', 'Dictionaries are slow to read', 'Recursion can’t use memos'], right: 'Right.', wrong: 'Deep recursion hits Python’s limit; a loop doesn’t.' }),
  ],
  'dsa2-dp2': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['coins, amount = [1, 2, 5], 7', 'best = [0] + [float("inf")] * amount', 'for x in range(1, amount + 1):', '    for c in coins:', '        if c <= x:', '            best[x] = min(best[x], best[x - c] + 1)', 'print(best[amount], best[6])'], answer: '2 2', explain: '7 = 5 + 2 and 6 = 5 + 1: two coins each.' }),
    predict({ kicker: K, title: 'House robber', lang: 'python', lines: ['houses = [2, 7, 9, 3, 1]', 'take, skip = 0, 0', 'for h in houses:', '    take, skip = skip + h, max(take, skip)', 'print(max(take, skip))'], answer: '12', explain: 'Take 2, 9 and 1 (no two neighbours): 12.' }),
    quiz({ prompt: 'What is the first step in designing a DP solution?', options: ['Define exactly what each table entry means', 'Write the loops', 'Sort the input', 'Pick a data structure'], right: 'Right.', wrong: 'Start by defining the state, such as best[x].' }),
    quiz({ prompt: 'Coin DP for amount A with k coin types costs…', options: ['O(A × k)', 'O(A + k)', 'O(2^A)', 'O(log A)'], right: 'Right.', wrong: 'For each of A amounts it tries k coins.', mono: true }),
  ],
  'dsa2-dp3': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['rows, cols = 3, 3', 'dp = [[1] * cols for _ in range(rows)]', 'for r in range(1, rows):', '    for c in range(1, cols):', '        dp[r][c] = dp[r - 1][c] + dp[r][c - 1]', 'print(dp[2])'], answer: '[1, 3, 6]', explain: 'Each cell adds the one above and the one to the left.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]', 'n = len(grid)', 'for r in range(n):', '    for c in range(n):', '        if r == 0 and c == 0:', '            continue', '        up = grid[r - 1][c] if r else float("inf")', '        left = grid[r][c - 1] if c else float("inf")', '        grid[r][c] += min(up, left)', 'print(grid[-1][-1])'], answer: '7', explain: 'Cheapest path: 1 → 3 → 1 → 1 → 1 = 7.' }),
    quiz({ prompt: 'LCS of "abc" and "acb" is…', options: ['2', '3', '1', '0'], right: 'Right: "ab" or "ac".', wrong: 'Both "ab" and "ac" appear in order in both strings: length 2.', mono: true }),
    quiz({ prompt: 'Why add an extra row and column of zeros to the LCS table?', options: ['They stand for empty prefixes, so i − 1 and j − 1 always exist', 'Python needs it', 'To store the answer string', 'To make it square'], right: 'Right.', wrong: 'Row 0 and column 0 are the empty-string base cases.' }),
  ],
  'dsa2-greedy': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['talks = [(1, 3), (2, 5), (4, 7), (6, 8), (8, 9)]', 'count, free_at = 0, 0', 'for s, e in sorted(talks, key=lambda t: t[1]):', '    if s >= free_at:', '        count, free_at = count + 1, e', 'print(count)'], answer: '3', explain: '(1, 3), (4, 7) and (8, 9) fit.' }),
    predict({ kicker: K, title: 'Fractional bag', lang: 'python', lines: ['items = [(60, 10), (100, 20), (120, 30)]   # (value, weight)', 'cap, value = 50, 0.0', 'for v, w in sorted(items, key=lambda i: i[0] / i[1], reverse=True):', '    take = min(w, cap)', '    value += v * take / w', '    cap -= take', 'print(value)'], answer: '240.0', explain: 'Take the best value per kilo first, and a part of the last item.' }),
    quiz({ prompt: 'When is a greedy algorithm correct?', options: ['When each local choice can be proven never to hurt the final answer', 'Always', 'When the input is sorted', 'When n is small'], right: 'Right.', wrong: 'Greedy needs a proof that the local choice is safe.' }),
    quiz({ prompt: 'To fit the most non-overlapping talks, sort by…', options: ['End time', 'Start time', 'Length', 'Speaker name'], right: 'Right.', wrong: 'Ending earliest leaves the most room for the rest.' }),
  ],
  'dsa2-merge': [
    predict({ kicker: K, title: 'Stable sorting', lang: 'python', lines: ['people = [("Ava", 20), ("Reed", 19), ("Zoey", 20)]', 'print([n for n, a in sorted(people, key=lambda p: p[1])])'], answer: '[\'Reed\', \'Ava\', \'Zoey\']', explain: 'Python’s sort is stable, so Ava stays before Zoey.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def merge(a, b):', '    out = []', '    while a and b:', '        out.append(a.pop(0) if a[0] <= b[0] else b.pop(0))', '    return out + a + b', 'print(merge([2, 8], [1, 3, 9]))'], answer: '[1, 2, 3, 8, 9]', explain: 'Always take the smaller front item.' }),
    quiz({ prompt: 'Merge sort on n items uses how much extra memory?', options: ['O(n)', 'O(1)', 'O(n²)', 'O(log n) only'], right: 'Right: the merged lists.', wrong: 'Merging builds new lists of up to n items.', mono: true }),
    quiz({ prompt: 'Which is also divide and conquer?', options: ['Binary search', 'Linear search', 'Bubble sort', 'Counting with a dict'], right: 'Right: it keeps one half each step.', wrong: 'Binary search splits the problem in half every step.' }),
  ],
};
