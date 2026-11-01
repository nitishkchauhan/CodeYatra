// DSA Advanced · Modules 5–8: shortest paths (Dijkstra, spanning trees), backtracking, dynamic programming, and
// greedy with divide and conquer. Each module’s first lesson keeps its old id. Programs run with real Python in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from '../dsaV5/kit';

const ROADS = ['roads = {', '    "Depot": {"Harbour": 4, "Market": 1},', '    "Market": {"Harbour": 2, "Park": 5},', '    "Harbour": {"Park": 1},', '    "Park": {},', '}'];
const DIJKSTRA = [
  'import heapq',
  ...ROADS,
  'def dijkstra(start):',
  '    best = {start: 0}',
  '    heap = [(0, start)]',
  '    while heap:',
  '        d, here = heapq.heappop(heap)',
  '        if d > best[here]:',
  '            continue',
  '        for nxt, w in roads[here].items():',
  '            if d + w < best.get(nxt, float("inf")):',
  '                best[nxt] = d + w',
  '                heapq.heappush(heap, (d + w, nxt))',
  '    return best',
  '',
];

export const DSA2_M7: Lesson[] = [
  lesson('dsa2-dijkstra', 'Shortest paths with weights', 10, [
    chat(['BFS counts stops. But roads have lengths: 4 km straight, or 1 + 2 km through the market?', 'Dijkstra’s algorithm always settles the nearest unsettled place next, using a priority queue. It finds the shortest distance when no edge is negative.']),
    toggleRun('Direct road or a detour?', [
      ['The roads', [...ROADS, 'print(roads["Depot"])'], 'From the depot: Harbour is 4 away, Market 1.', ["{'Harbour': 4, 'Market': 1}"]],
      ['Dijkstra', [...DIJKSTRA, 'print(dijkstra("Depot"))'], 'Harbour via Market (1 + 2) beats the direct road (4).', ["{'Depot': 0, 'Harbour': 3, 'Market': 1, 'Park': 4}"]],
    ]),
    predict('Settle the nearest first', [...DIJKSTRA, 'best = dijkstra("Depot")', 'print(best["Park"])'], [
      [22, 'Shortest distance to Park?', ['4', '6', '5'], 'Depot → Market → Harbour → Park: 1 + 2 + 1.', { out: true }],
    ]),
    reveal('Dijkstra facts', [
      ['Priority queue', 'Always take the place with the smallest known distance.'],
      ['Relax edges', 'If going through here is shorter, update and push.'],
      ['O((V + E) log V)', 'With a heap.'],
      ['No negative edges', 'Use Bellman–Ford if some weights are negative.'],
    ]),
    tapbug('Distances come out too big', ['if d + w > best.get(nxt, float("inf")):'], [[1, 'd + w > best', 'd + w < best']], 'Update only when the new route is shorter.'),
    check('When does Dijkstra give wrong answers?', ['When some edge weights are negative', 'When the graph is large', 'When there are cycles', 'Never'], 'It assumes settling is final.', 'What could make a settled distance shorter later?'),
    recap([
      ['🛣', 'Dijkstra: shortest weighted paths'],
      ['🔝', 'A min-heap picks the nearest place next'],
      ['➖', 'No negative weights'],
    ]),
  ]),

  lesson('dsa2-b-5-2', 'Spanning trees', 8, [
    chat(['To connect every station with cables using the least cable in total, you want a minimum spanning tree (MST): every node joined, no loops, smallest total weight.', 'Kruskal’s algorithm takes the cheapest edges first, skipping any that would make a loop.']),
    predict('Kruskal’s algorithm', ['edges = [(4, "A", "B"), (1, "A", "C"), (2, "B", "C"), (5, "C", "D"), (3, "B", "D")]', 'parent = {n: n for n in "ABCD"}', 'def find(n):', '    while parent[n] != n:', '        n = parent[n]', '    return n', 'total = 0', 'for w, a, b in sorted(edges):', '    ra, rb = find(a), find(b)', '    if ra != rb:', '        parent[ra] = rb', '        total += w', 'print(total)'], [
      [13, 'What is the total cable length?', ['6', '10', '15'], 'Edges 1, 2 and 3 connect all four; 4 and 5 would make loops.', { var: 'total' }],
    ]),
    matchUp('Which algorithm?', [['Fewest stops', 'BFS'], ['Shortest weighted route from one place', 'Dijkstra'], ['Cheapest way to connect every place', 'Kruskal or Prim'], ['Weights can be negative', 'Bellman–Ford']], 'Different questions, different tools.'),
    truth([
      ['A spanning tree has no loops', true, 'It is a tree.'],
      ['Kruskal sorts the edges by weight first', true, 'Cheapest first.'],
      ['There is only ever one MST', false, 'Ties can give several with the same total.'],
    ]),
    check('A spanning tree of n nodes has how many edges?', ['n − 1', 'n', 'n + 1', 'n²'], 'Connected, with no loops.', 'A tree with 4 nodes has…'),
    recap([
      ['🌐', 'MST: connect everything at the least total cost'],
      ['🔗', 'Kruskal: cheapest edges first, skip loops'],
      ['🧩', 'Union-find tracks which nodes are joined'],
    ]),
  ]),

  challenge('dsa2-b-5-ch', 'Shortest Paths Challenge', { icon: '🛣', name: 'Route Planner' }, ['Find shortest weighted paths', 'Know when Dijkstra fails', 'Connect places at least cost'], [
    mcq(1, 'Dijkstra uses which structure?', ['A priority queue (heap)', 'A plain queue', 'A stack', 'A set only'], 'Nearest first.'),
    mcq(2, 'Dijkstra needs edge weights that are…', ['Not negative', 'All equal', 'Whole numbers', 'Sorted'], 'Or use Bellman–Ford.'),
    mcq(3, 'With equal weights, which simpler search finds shortest paths?', ['BFS', 'DFS', 'Binary search', 'Topological sort'], 'Fewest steps.'),
    mcq(4, 'What does a minimum spanning tree minimise?', ['The total weight connecting every node', 'The longest edge only', 'The number of nodes', 'One route’s length'], 'All connected, cheapest.'),
    mcq(5, 'Kruskal skips an edge when…', ['It would make a loop', 'It is cheap', 'It is the first', 'Its weight is odd'], 'Union-find tells.'),
    swipe([
      ['Dijkstra relaxes edges to improve distances', true, 'If shorter, update.'],
      ['An MST can contain a cycle', false, 'It is a tree.'],
      ['Dijkstra with a heap is about O((V + E) log V)', true, 'Fast enough for big maps.'],
      ['Shortest path and MST are the same thing', false, 'Different questions.'],
    ]),
    pairs([['Dijkstra', 'Weighted shortest path'], ['BFS', 'Fewest steps'], ['Kruskal', 'MST'], ['Bellman–Ford', 'Negative weights']], 'Path algorithms.'),
    pickCode('Which updates a distance correctly?', ['if d + w < best.get(nxt, inf): best[nxt] = d + w', 'best[nxt] = d + w', 'if d + w > best[nxt]: best[nxt] = d', 'best[nxt] += w'], 'Only when shorter.'),
    bugTask(['heap = [(0, start)]', 'd, here = heap.pop()'], [[2, 'heap.pop()', 'heapq.heappop(heap)']], 'Take the smallest distance, not the last pushed.'),
    predictTask([...DIJKSTRA, 'print(dijkstra("Market")["Park"])'], 'What does it print?', ['3', '5', '4', '1'], 'Market → Harbour → Park: 2 + 1.'),
    arrange(['import heapq', 'h = [(4, "Harbour"), (1, "Market")]', 'heapq.heapify(h)', 'print(heapq.heappop(h)[1])'], 'import, candidates, make a heap, take the nearest', ['Market']),
  ]),

  lesson('dsa2-backtrack', 'Backtracking', 9, [
    chat(['Backtracking builds a solution one choice at a time. If a choice leads to a dead end, undo it (back up) and try the next.', 'It explores every possibility, but cuts off branches that can’t work.']),
    toggleRun('Choose, explore, undo', [
      ['All subsets', ['def subsets(items):', '    out, pick = [], []', '    def go(i):', '        if i == len(items):', '            out.append(pick[:])', '            return', '        pick.append(items[i])', '        go(i + 1)', '        pick.pop()', '        go(i + 1)', '    go(0)', '    return out', '', 'print(subsets(["tea", "toast"]))'], 'Each item: take it, or leave it.', ["[['tea', 'toast'], ['tea'], ['toast'], []]"]],
      ['All orders', ['def perms(xs):', '    if len(xs) <= 1:', '        return [xs]', '    return [[x] + p for i, x in enumerate(xs) for p in perms(xs[:i] + xs[i + 1:])]', '', 'print(perms([1, 2, 3]))'], 'n! orders.', ['[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]']],
    ]),
    run('Combos within a budget', 'Find every pair of dishes within the budget.', ['menu = {"Tea": 40, "Toast": 80, "Soup": 120, "Cake": 90}', 'budget = {{v}}', 'names = list(menu)', 'found = []', 'def go(start, pick, cost):', '    if len(pick) == 2:', '        found.append("+".join(pick))', '        return', '    for i in range(start, len(names)):', '        n = names[i]', '        if cost + menu[n] <= budget:', '            go(i + 1, pick + [n], cost + menu[n])', 'go(0, [], 0)', 'print(found)'], ['100', '130', '170'], { goal: "['Tea+Toast', 'Tea+Soup', 'Tea+Cake', 'Toast+Cake']", caption: 'Over budget? That branch is cut off early.' }),
    reveal('The backtracking pattern', [
      ['Choose', 'Make one choice and add it.'],
      ['Explore', 'Recurse to make the next choice.'],
      ['Un-choose', 'Remove it, and try the next option.'],
      ['Prune', 'Stop early when a partial answer can’t work (over budget, two queens attacking).'],
    ]),
    check('Why is pruning important in backtracking?', ['It skips branches that can’t lead to an answer', 'It sorts the answers', 'It makes recursion unnecessary', 'It finds duplicates'], 'Less to explore.', 'What happens to dead ends?'),
    recap([
      ['🧭', 'Choose, explore, un-choose'],
      ['✂', 'Prune hopeless branches early'],
      ['🔢', 'Subsets, orders, puzzles like N-queens and Sudoku'],
    ]),
  ]),

  challenge('dsa2-b-6-ch', 'Backtracking Challenge', { icon: '🧭', name: 'Path Finder' }, ['Generate subsets and orders', 'Undo choices correctly', 'Prune dead ends'], [
    mcq(1, 'How many subsets does a set of 3 items have?', ['8', '6', '3', '9'], '2³.'),
    mcq(2, 'How many orders of 3 items are there?', ['6', '8', '3', '9'], '3!.'),
    mcq(3, 'What is the “un-choose” step for?', ['Removing the last choice before trying the next', 'Ending the program', 'Sorting', 'Printing'], 'Back up.'),
    mcq(4, 'Which puzzle is a classic backtracking problem?', ['N-queens', 'Binary search', 'Prefix sums', 'Two sum'], 'And Sudoku.'),
    mcq(5, 'Backtracking without pruning is often…', ['Exponential', 'O(1)', 'O(log n)', 'O(n)'], 'Every possibility.'),
    swipe([
      ['Backtracking usually uses recursion', true, 'One level per choice.'],
      ['pick[:] saves a copy of the current choices', true, 'Not the list itself.'],
      ['Backtracking always finds the answer instantly', false, 'It can explore a lot.'],
      ['Pruning can change the correct answers', false, 'It only skips impossible ones.'],
    ]),
    pairs([['Choose', 'Add an option'], ['Explore', 'Recurse'], ['Un-choose', 'Remove it'], ['Prune', 'Stop early']], 'The pattern.'),
    pickCode('Which saves a finished subset safely?', ['out.append(pick[:])', 'out.append(pick)', 'out = pick', 'out.extend(pick)'], 'A copy, or later changes alter it.'),
    bugTask(['pick.append(items[i])', 'go(i + 1)', 'go(i + 1)'], [[3, 'go(i + 1)', 'pick.pop(); go(i + 1)']], 'Undo the choice before trying without it. (Tap the second go.)'),
    predictTask(['from itertools import combinations', 'print(len(list(combinations(["a", "b", "c", "d"], 2))))'], 'What does it print?', ['6', '4', '8', '12'], 'Pairs from 4: 4 × 3 / 2.'),
    arrange(['def subsets(xs):', '    if not xs: return [[]]', '    rest = subsets(xs[1:])', '    return rest + [[xs[0]] + r for r in rest]', 'print(len(subsets([1, 2, 3])))'], 'define, base case, subsets of the rest, with and without the first, count', ['8']),
  ]),

  lesson('dsa2-dp1', 'Dynamic programming: memoization', 8, [
    chat(['Some recursive functions solve the same small problem again and again. Fibonacci(30) the plain way makes over a million calls.', 'Memoization remembers each answer the first time, so each small problem is solved once.']),
    run('Count the calls', 'Compare plain recursion with a memoized version.', ['from functools import lru_cache', 'calls = 0', 'def fib(n):', '    global calls', '    calls += 1', '    return n if n < 2 else fib(n - 1) + fib(n - 2)', 'fib = ({{v}})(fib)', 'print(fib(20), "after", calls, "calls")'], ['lambda f: f', 'lru_cache(maxsize=None)'], { goal: '6765 after 21 calls', caption: 'Memoized: each n once. Plain: 21,891 calls.' }),
    toggleRun('Memoizing by hand', [
      ['A dict', ['memo = {}', 'def fib(n):', '    if n < 2:', '        return n', '    if n not in memo:', '        memo[n] = fib(n - 1) + fib(n - 2)', '    return memo[n]', '', 'print(fib(50))'], 'O(n) instead of O(2ⁿ).', ['12586269025']],
      ['@cache', ['from functools import cache', '', '@cache', 'def fib(n):', '    return n if n < 2 else fib(n - 1) + fib(n - 2)', '', 'print(fib(50))'], 'Python does the remembering.', ['12586269025']],
    ]),
    reveal('Is it a DP problem?', [
      ['Overlapping subproblems', 'The same smaller question comes up many times.'],
      ['Optimal substructure', 'The best answer is built from best answers to smaller questions.'],
      ['Top-down', 'Recursion + memoization (this lesson).'],
      ['Bottom-up', 'Fill a table from the smallest case (next lesson).'],
    ]),
    check('What does memoization store?', ['The answer to each subproblem, the first time it is solved', 'Every function call', 'The input list', 'The call stack'], 'Solve once, reuse.', 'What gets reused?'),
    recap([
      ['🧠', 'Memoization: remember answers to subproblems'],
      ['⚡', 'Exponential becomes polynomial'],
      ['🐍', '@cache or a dict'],
    ]),
  ]),

  lesson('dsa2-dp2', 'Dynamic programming: tables', 9, [
    chat(['Bottom-up DP fills a table from the smallest case upward, with no recursion.', 'Classic example: the fewest coins to make an amount. ways[a] is built from smaller amounts.']),
    predict('Fewest coins', ['coins = [1, 5, 7]', 'amount = 10', 'INF = float("inf")', 'best = [0] + [INF] * amount', 'for a in range(1, amount + 1):', '    for c in coins:', '        if c <= a:', '            best[a] = min(best[a], best[a - c] + 1)', 'print(best[amount])'], [
      [9, 'Fewest coins for 10?', ['2', '4', '3'], '5 + 5. Greedy (7 + 1 + 1 + 1) would use 4.', { out: true }],
    ]),
    run('Climbing stairs', 'In how many ways can you climb n steps, taking 1 or 2 at a time?', ['n = {{v}}', 'ways = [1, 1]', 'for i in range(2, n + 1):', '    ways.append(ways[i - 1] + ways[i - 2])', 'print(n, "steps:", ways[n], "ways")'], ['3', '5', '10'], { goal: '10 steps: 89 ways' }),
    reveal('Writing a table DP', [
      ['1 · State', 'What does table[i] mean? (fewest coins for amount i)'],
      ['2 · Base case', 'table[0] = 0.'],
      ['3 · Transition', 'How table[i] comes from smaller entries.'],
      ['4 · Answer', 'Usually the last entry.'],
    ]),
    check('In the coin table, what does best[a] mean?', ['The fewest coins that make amount a', 'The number of coin types', 'The biggest coin', 'The amount left'], 'Define the state first.', 'What question does each cell answer?'),
    recap([
      ['📊', 'Bottom-up: fill a table from the base case'],
      ['🧩', 'State, base case, transition, answer'],
      ['🪙', 'Coins, stairs, and many more'],
    ]),
  ]),

  lesson('dsa2-dp3', 'Dynamic programming in two dimensions', 10, [
    chat(['Some problems need a grid of answers: table[i][j] for two things at once.', 'Longest common subsequence (LCS) compares two strings; the 0/1 knapsack picks items under a weight limit.']),
    toggleRun('Two classic 2-D DPs', [
      ['LCS', ['def lcs(a, b):', '    t = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]', '    for i in range(1, len(a) + 1):', '        for j in range(1, len(b) + 1):', '            if a[i - 1] == b[j - 1]:', '                t[i][j] = t[i - 1][j - 1] + 1', '            else:', '                t[i][j] = max(t[i - 1][j], t[i][j - 1])', '    return t[-1][-1]', '', 'print(lcs("HARBOUR", "HARVEST"))'], 'H, A, R in order: 3.', ['3']],
      ['Knapsack', ['items = [("Tea", 1, 40), ("Cake", 3, 150), ("Soup", 2, 120)]', 'cap = 4', 'best = [0] * (cap + 1)', 'for name, w, v in items:', '    for c in range(cap, w - 1, -1):', '        best[c] = max(best[c], best[c - w] + v)', 'print(best[cap])'], 'Weight limit 4: Tea + Cake = 190.', ['190']],
    ]),
    predict('Paths through a grid', ['rows, cols = 3, 3', 'paths = [[1] * cols for _ in range(rows)]', 'for r in range(1, rows):', '    for c in range(1, cols):', '        paths[r][c] = paths[r - 1][c] + paths[r][c - 1]', 'print(paths[2][2])'], [
      [6, 'How many right/down paths cross a 3 × 3 grid?', ['6', '9', '4'], 'Each cell adds the paths from above and from the left.', { out: true }],
    ]),
    tapbug('The knapsack uses the same item twice', ['for c in range(w, cap + 1):'], [[1, 'range(w, cap + 1)', 'range(cap, w - 1, -1)']], 'Go downwards so each item is counted once (0/1 knapsack).'),
    check('In LCS, what does t[i][j] mean?', ['The LCS length of the first i letters of a and the first j of b', 'The letters at i and j', 'The number of matches so far in a', 'The edit distance'], 'Two prefixes.', 'What two things does each cell look at?'),
    recap([
      ['🧮', '2-D tables: answers for pairs of sizes'],
      ['🔤', 'LCS compares two sequences'],
      ['🎒', 'Knapsack chooses items under a limit'],
    ]),
  ]),

  challenge('dsa2-b-7-ch', 'Dynamic Programming Challenge', { icon: '🧠', name: 'DP Thinker' }, ['Spot overlapping subproblems', 'Memoize recursive solutions', 'Fill 1-D and 2-D tables'], [
    mcq(1, 'DP helps when a problem has…', ['Overlapping subproblems', 'No recursion', 'Sorted input', 'Only strings'], 'And optimal substructure.'),
    mcq(2, 'Memoization is…', ['Top-down: recursion that remembers', 'Bottom-up tables', 'Sorting first', 'A kind of heap'], 'Remember answers.'),
    mcq(3, 'Plain recursive Fibonacci is about…', ['O(2ⁿ)', 'O(n)', 'O(log n)', 'O(1)'], 'Repeated work.', { mono: true }),
    mcq(4, 'Fewest coins for 10 with coins [1, 5, 7] is…', ['2', '4', '3', '10'], '5 + 5.'),
    mcq(5, 'Which problem uses a 2-D table?', ['Longest common subsequence', 'Linear search', 'Binary search', 'Two sum'], 'Two strings.'),
    swipe([
      ['@cache can memoize a function', true, 'functools.'],
      ['Greedy always finds the fewest coins', false, 'Not for [1, 5, 7].'],
      ['Bottom-up DP needs no recursion', true, 'Loops over a table.'],
      ['A DP state should have a clear meaning', true, 'table[i] means…'],
    ]),
    pairs([['Top-down', 'Memoization'], ['Bottom-up', 'Table'], ['State', 'What a cell means'], ['Transition', 'How cells connect']], 'DP words.'),
    pickCode('Which line memoizes fib?', ['@cache', '@staticmethod', '@property', '@dataclass'], 'From functools.'),
    bugTask(['best = [0] * (amount + 1)', 'best[a] = min(best[a], best[a - c] + 1)'], [[1, '[0] * (amount + 1)', '[0] + [float("inf")] * amount']], 'Unreached amounts must start as infinity, not 0.'),
    predictTask(['ways = [1, 1]', 'for i in range(2, 6):', '    ways.append(ways[-1] + ways[-2])', 'print(ways[5])'], 'What does it print?', ['8', '5', '13', '6'], '1, 1, 2, 3, 5, 8.'),
    arrange(['from functools import cache', '@cache', 'def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)', 'print(fib(30))'], 'import, decorate, define, call', ['832040']),
  ]),

  lesson('dsa2-greedy', 'Greedy algorithms', 8, [
    chat(['A greedy algorithm makes the choice that looks best right now, and never looks back.', 'When it works, it is simple and fast. But it doesn’t always give the best answer, so you need a reason to trust it.']),
    predict('Fit the most bookings into one room', ['bookings = [(9, 11), (10, 12), (11, 13), (12, 14), (13, 15)]', 'chosen, free_at = [], 0', 'for start, end in sorted(bookings, key=lambda b: b[1]):', '    if start >= free_at:', '        chosen.append((start, end))', '        free_at = end', 'print(len(chosen), chosen)'], [
      [7, 'What does it print?', ['3 [(9, 11), (11, 13), (13, 15)]', '2 [(9, 11), (12, 14)]', '5 [(9, 11), (10, 12), (11, 13), (12, 14), (13, 15)]'], 'Always pick the one that ends first: 9–11, 11–13, 13–15.', { out: true }],
    ]),
    toggleRun('When greedy fails', [
      ['Coins [1, 5, 10]', ['coins, amount, used = [10, 5, 1], 18, []', 'for c in coins:', '    while amount >= c:', '        amount -= c', '        used.append(c)', 'print(used)'], 'Greedy works for these coins: 10 + 5 + 1 + 1 + 1.', ['[10, 5, 1, 1, 1]']],
      ['Coins [1, 5, 7]', ['coins, amount, used = [7, 5, 1], 10, []', 'for c in coins:', '    while amount >= c:', '        amount -= c', '        used.append(c)', 'print(used)'], 'Greedy uses 4 coins; 5 + 5 needs only 2. Use DP here.', ['[7, 1, 1, 1]']],
    ]),
    matchUp('Greedy or not?', [['Activity selection (earliest end first)', 'Greedy is proven correct'], ['Coins [1, 5, 7]', 'Greedy fails: use DP'], ['Dijkstra’s nearest-first', 'Greedy, with non-negative weights'], ['0/1 knapsack', 'Needs a DP table']], 'Greedy needs proof.'),
    check('What does a greedy algorithm never do?', ['Go back and change an earlier choice', 'Make a choice', 'Sort', 'Finish'], 'One pass of best-now choices.', 'Does it back up?'),
    recap([
      ['🤑', 'Greedy: best choice now, no going back'],
      ['✅', 'Works for activity selection, Dijkstra, Huffman coding'],
      ['⚠', 'Not always: check, or use DP'],
    ]),
  ]),

  lesson('dsa2-merge', 'Divide and conquer', 8, [
    chat(['Divide and conquer splits a problem into smaller ones, solves each, and combines the answers.', 'Merge sort, binary search and quicksort all work this way.']),
    toggleRun('Divide, solve, combine', [
      ['Merge two sorted lists', ['def merge(a, b):', '    out, i, j = [], 0, 0', '    while i < len(a) and j < len(b):', '        if a[i] <= b[j]:', '            out.append(a[i]); i += 1', '        else:', '            out.append(b[j]); j += 1', '    return out + a[i:] + b[j:]', '', 'print(merge([1, 4, 9], [2, 3, 10]))'], 'The combine step of merge sort: O(n).', ['[1, 2, 3, 4, 9, 10]']],
      ['Fast power', ['def power(b, e):', '    if e == 0:', '        return 1', '    half = power(b, e // 2)', '    return half * half * (b if e % 2 else 1)', '', 'print(power(2, 30))'], 'Halve the exponent: O(log e) multiplications.', ['1073741824']],
      ['Euclid’s GCD', ['def gcd(a, b):', '    return a if b == 0 else gcd(b, a % b)', '', 'print(gcd(84, 36))'], 'A very old divide-and-conquer idea.', ['12']],
    ]),
    predict('Split until tiny', ['def biggest(xs):', '    if len(xs) == 1:', '        return xs[0]', '    mid = len(xs) // 2', '    return max(biggest(xs[:mid]), biggest(xs[mid:]))', '', 'top = biggest([40, 150, 90, 80])', 'print(top)'], [
      [8, 'What is top?', ['150', '90', '80'], 'Each half reports its biggest; combine with max.', { var: 'top' }],
    ]),
    reveal('Divide and conquer in DSA', [
      ['Binary search', 'Keep one half: O(log n).'],
      ['Merge sort', 'Sort both halves, merge: O(n log n).'],
      ['Quicksort', 'Split by a pivot.'],
      ['Master theorem', 'A formula for the Big-O of such splits (useful in exams).'],
    ]),
    check('Merge sort’s merge step on n items is…', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 'One pass through both lists.', 'How many times is each item looked at?', { mono: true }),
    recap([
      ['✂', 'Divide, solve the parts, combine'],
      ['🔀', 'Merge sort, quicksort, binary search'],
      ['⚡', 'Often O(n log n) or O(log n)'],
    ]),
  ]),

  challenge('dsa2-b-8-ch', 'Greedy and Divide Challenge', { icon: '✂', name: 'Strategist' }, ['Use greedy when it is proven', 'Recognise when greedy fails', 'Split problems with divide and conquer'], [
    mcq(1, 'Activity selection picks next the booking that…', ['Ends earliest', 'Starts earliest', 'Is longest', 'Is shortest'], 'Leaves the most room.'),
    mcq(2, 'For coins [1, 5, 7] and amount 10, greedy uses…', ['4 coins', '2 coins', '3 coins', '10 coins'], '7 + 1 + 1 + 1.'),
    mcq(3, 'Divide and conquer has three steps:', ['Divide, solve, combine', 'Sort, search, print', 'Push, pop, peek', 'Choose, explore, undo'], 'Split it up.'),
    mcq(4, 'gcd(84, 36) is…', ['12', '6', '4', '36'], 'Euclid.', { mono: true }),
    mcq(5, 'Fast power needs about how many multiplications for 2^1024?', ['About 10–20', '1024', '512', '1'], 'Halving the exponent.'),
    swipe([
      ['Greedy algorithms never back up', true, 'That is what makes them fast.'],
      ['Greedy always gives the best answer', false, 'Only for some problems.'],
      ['Merge sort is divide and conquer', true, 'Split and merge.'],
      ['Dijkstra is a greedy algorithm', true, 'Nearest first.'],
    ]),
    pairs([['Greedy', 'Best now'], ['DP', 'Remember subproblems'], ['Divide and conquer', 'Split and combine'], ['Backtracking', 'Try and undo']], 'Strategies.'),
    pickCode('Which sorts bookings by end time for activity selection?', ['sorted(bookings, key=lambda b: b[1])', 'sorted(bookings)', 'sorted(bookings, key=lambda b: b[0] - b[1])', 'bookings.reverse()'], 'End time first.'),
    bugTask(['for start, end in sorted(bookings):', '    if start >= free_at: chosen.append((start, end)); free_at = end'], [[1, 'sorted(bookings)', 'sorted(bookings, key=lambda b: b[1])']], 'Sort by end time, not start time.'),
    predictTask(['def gcd(a, b):', '    return a if b == 0 else gcd(b, a % b)', 'print(gcd(48, 18))'], 'What does it print?', ['6', '3', '18', '2'], '48, 18 → 18, 12 → 12, 6 → 6, 0.'),
    arrange(['def merge(a, b):', '    if not a or not b: return a + b', '    return [a[0]] + merge(a[1:], b) if a[0] <= b[0] else [b[0]] + merge(a, b[1:])', 'print(merge([1, 5], [2, 3]))'], 'define, base case, take the smaller head, call', ['[1, 2, 3, 5]']),
  ]),
];
