// DSA Advanced · Modules 1–6: binary trees, binary search trees, heaps, graphs and BFS, DFS, and topological sort.
// Each module’s first lesson keeps its old id. Programs run with real Python in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from '../dsaV5/kit';

const NODE = ['class Node:', '    def __init__(self, value, left=None, right=None):', '        self.value, self.left, self.right = value, left, right', ''];
const TREE = [...NODE, 'root = Node(8, Node(3, Node(1), Node(6)), Node(10, None, Node(14)))'];
const GRAPH = ['metro = {', '    "Central": ["Harbour", "Market"],', '    "Harbour": ["Central", "Airport"],', '    "Market": ["Central", "Park"],', '    "Airport": ["Harbour"],', '    "Park": ["Market"],', '}'];
const BFS = [
  'from collections import deque',
  ...GRAPH,
  'def bfs(start):',
  '    dist = {start: 0}',
  '    q = deque([start])',
  '    while q:',
  '        here = q.popleft()',
  '        for nxt in metro[here]:',
  '            if nxt not in dist:',
  '                dist[nxt] = dist[here] + 1',
  '                q.append(nxt)',
  '    return dist',
  '',
];

export const DSA2_M1: Lesson[] = [
  lesson('dsa2-tree', 'Binary trees', 9, [
    chat(['A tree stores data in nodes connected like a family tree: one root at the top, each node with children below. Folders on your computer and the HTML of a page are trees.', 'In a binary tree, each node has at most two children: left and right.']),
    reveal('Tree words', [
      ['Root', 'The top node.'],
      ['Leaf', 'A node with no children.'],
      ['Height', 'The longest path from the root down to a leaf.'],
      ['Subtree', 'A node and everything below it: itself a tree.'],
    ]),
    toggleRun('Three ways to visit every node', [
      ['Pre-order', [...TREE, '', 'def pre(n):', '    return [n.value] + pre(n.left) + pre(n.right) if n else []', '', 'print(pre(root))'], 'Node, then left, then right.', ['[8, 3, 1, 6, 10, 14]']],
      ['In-order', [...TREE, '', 'def ino(n):', '    return ino(n.left) + [n.value] + ino(n.right) if n else []', '', 'print(ino(root))'], 'Left, node, right.', ['[1, 3, 6, 8, 10, 14]']],
      ['Post-order', [...TREE, '', 'def post(n):', '    return post(n.left) + post(n.right) + [n.value] if n else []', '', 'print(post(root))'], 'Left, right, then the node.', ['[1, 6, 3, 14, 10, 8]']],
    ]),
    predict('Height of a tree', [...TREE, '', 'def height(n):', '    if n is None:', '        return 0', '    return 1 + max(height(n.left), height(n.right))', '', 'h = height(root)', 'print(h)'], [
      [12, 'What is h?', ['3', '2', '6'], '8 → 3 → 1: three levels.', { var: 'h' }],
    ]),
    tapbug('AttributeError: ’NoneType’ object has no attribute ’left’', ['def count(n):', '    return 1 + count(n.left) + count(n.right)'], [[2, '    return 1 + count(n.left) + count(n.right)', '    return 0 if n is None else 1 + count(n.left) + count(n.right)']], 'Stop at an empty child: the base case.'),
    check('Which traversal visits a node before its children?', ['Pre-order', 'In-order', 'Post-order', 'Level-order'], 'Pre: before.', 'The name tells you.'),
    recap([
      ['🌳', 'Trees: a root, children, leaves'],
      ['🔁', 'Pre-, in- and post-order traversals'],
      ['🪆', 'Tree code is naturally recursive'],
    ]),
  ]),

  challenge('dsa2-b-1-ch', 'Trees Challenge', { icon: '🌳', name: 'Tree Climber' }, ['Describe trees and their parts', 'Traverse a binary tree', 'Write recursive tree functions'], [
    mcq(1, 'What is a leaf?', ['A node with no children', 'The top node', 'A node with two children', 'The deepest level'], 'At the bottom.'),
    mcq(2, 'At most how many children does a binary tree node have?', ['2', '1', '3', 'Any number'], 'Left and right.'),
    mcq(3, 'In-order on a tree visits…', ['Left, node, right', 'Node, left, right', 'Left, right, node', 'Level by level'], 'Node in the middle.'),
    mcq(4, 'Height of a tree with only a root?', ['1', '0', '2', 'It depends'], 'One level (when empty is 0).'),
    mcq(5, 'Tree functions usually stop when the node is…', ['None', 'A leaf with value 0', 'The root', 'Sorted'], 'The empty subtree.'),
    swipe([
      ['Folders form a tree', true, 'Each folder has children.'],
      ['Every binary tree is sorted', false, 'That is a BST.'],
      ['Post-order visits children before the node', true, 'Left, right, node.'],
      ['A subtree is itself a tree', true, 'Hence recursion.'],
    ]),
    pairs([['Root', 'Top'], ['Leaf', 'No children'], ['Height', 'Longest path down'], ['Pre-order', 'Node first']], 'Tree words.'),
    pickCode('Which counts the nodes?', ['def count(n): return 0 if n is None else 1 + count(n.left) + count(n.right)', 'def count(n): return 1 + count(n.left)', 'def count(n): return len(n)', 'def count(n): return n.value'], 'Base case, then both sides.'),
    bugTask(['def height(n):', '    return 1 + max(height(n.left), height(n.right))'], [[2, '    return 1 + max(height(n.left), height(n.right))', '    return 0 if n is None else 1 + max(height(n.left), height(n.right))']], 'Handle the empty tree first.'),
    predictTask([...TREE, '', 'def leaves(n):', '    if n is None: return 0', '    if not n.left and not n.right: return 1', '    return leaves(n.left) + leaves(n.right)', '', 'print(leaves(root))'], 'What does it print?', ['3', '2', '4', '6'], '1, 6 and 14 have no children.'),
    arrange([...NODE.slice(0, 3), 'root = Node(2, Node(1), Node(3))', 'print(root.left.value, root.value, root.right.value)'], 'the class, its constructor, its fields, build a tree, print in order', ['1 2 3']),
  ]),

  lesson('dsa2-bst', 'Binary search trees', 9, [
    chat(['A binary search tree (BST) keeps a rule at every node: smaller values go left, bigger values go right.', 'Searching then works like binary search: each step throws away half the tree. O(log n) if the tree is balanced.']),
    predict('Insert and search', [...NODE, 'def insert(n, v):', '    if n is None:', '        return Node(v)', '    if v < n.value:', '        n.left = insert(n.left, v)', '    else:', '        n.right = insert(n.right, v)', '    return n', '', 'root = None', 'for v in [50, 30, 70, 20, 40]:', '    root = insert(root, v)', 'where = "left" if 40 < root.value else "right"', 'print(root.left.right.value, where)'], [
      [17, 'Which side of 50 is 40 on?', ["'left'", "'right'"], '40 < 50.', { var: 'where' }],
      [18, 'What does it print?', ['40 left', '20 left', '70 right'], '40 < 50, then 40 > 30: the right child of 30.', { out: true }],
    ]),
    run('Search the tree', 'Look for different values.', [...NODE, 'def insert(n, v):', '    if n is None: return Node(v)', '    if v < n.value: n.left = insert(n.left, v)', '    else: n.right = insert(n.right, v)', '    return n', '', 'root = None', 'for v in [50, 30, 70, 20, 40, 60, 80]: root = insert(root, v)', 'target, n, steps = {{v}}, root, 0', 'while n and n.value != target:', '    steps += 1', '    n = n.left if target < n.value else n.right', 'print("found" if n else "missing", "after", steps, "steps")'], ['50', '60', '65'], { goal: 'missing after 3 steps' }),
    reveal('Keeping BSTs fast', [
      ['Balanced', 'Height about log n: O(log n) search, insert and delete.'],
      ['Unbalanced', 'Insert 1, 2, 3, 4… and it becomes a line: O(n).'],
      ['Self-balancing', 'AVL and red-black trees rotate nodes to stay balanced.'],
      ['In-order', 'Visits a BST’s values in sorted order.'],
    ]),
    check('Inserting 1, 2, 3, 4, 5 into an empty BST gives…', ['A long line to the right: O(n) search', 'A balanced tree', 'An error', 'A heap'], 'Each new value is bigger.', 'Where does each go?'),
    recap([
      ['⚖', 'Left smaller, right bigger, at every node'],
      ['🔍', 'Search halves the tree: O(log n) when balanced'],
      ['🔄', 'AVL and red-black trees stay balanced'],
    ]),
  ]),

  challenge('dsa2-b-2-ch', 'BST Challenge', { icon: '⚖', name: 'BST Builder' }, ['Insert into and search a BST', 'Explain balance', 'Read a BST in sorted order'], [
    mcq(1, 'In a BST, where are values smaller than a node?', ['In its left subtree', 'In its right subtree', 'Anywhere', 'At the root'], 'The BST rule.'),
    mcq(2, 'Search in a balanced BST is…', ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], 'Halving.', { mono: true }),
    mcq(3, 'Which traversal gives a BST’s values sorted?', ['In-order', 'Pre-order', 'Post-order', 'Random'], 'Left, node, right.'),
    mcq(4, 'Why can a BST become slow?', ['It becomes unbalanced, like a line', 'Too many leaves', 'Duplicate values', 'Python is slow'], 'Height becomes n.'),
    mcq(5, 'Which trees rebalance themselves?', ['AVL trees', 'Linked lists', 'Heaps only', 'Stacks'], 'And red-black trees.'),
    swipe([
      ['A BST’s in-order traversal is sorted', true, 'Left, node, right.'],
      ['Inserting sorted values keeps a BST balanced', false, 'It makes a line.'],
      ['BST search can stop early when it finds the value', true, 'Or hits None.'],
      ['Every binary tree is a BST', false, 'Only with the ordering rule.'],
    ]),
    pairs([['Left', 'Smaller'], ['Right', 'Bigger'], ['Balanced', 'O(log n)'], ['Line-shaped', 'O(n)']], 'BSTs.'),
    pickCode('Which goes the right way when searching?', ['n = n.left if target < n.value else n.right', 'n = n.right if target < n.value else n.left', 'n = n.left', 'n = n.right'], 'Smaller: left.'),
    bugTask(['if v > n.value:', '    n.left = insert(n.left, v)'], [[1, 'if v > n.value:', 'if v < n.value:']], 'Smaller values go left.'),
    predictTask([...NODE, 'def insert(n, v):', '    if n is None: return Node(v)', '    if v < n.value: n.left = insert(n.left, v)', '    else: n.right = insert(n.right, v)', '    return n', '', 'def ino(n): return ino(n.left) + [n.value] + ino(n.right) if n else []', '', 'root = None', 'for v in [5, 2, 8, 1]: root = insert(root, v)', 'print(ino(root))'], 'What does it print?', ['[1, 2, 5, 8]', '[5, 2, 8, 1]', '[5, 2, 1, 8]', '[8, 5, 2, 1]'], 'In-order is sorted.'),
    arrange([...NODE.slice(0, 3), 'root = Node(5, Node(2), Node(8))', 'print(root.left.value < root.value < root.right.value)'], 'the class, constructor, fields, a small BST, check the rule', ['True']),
  ]),

  lesson('dsa2-heap', 'Heaps and priority queues', 8, [
    chat(['A min-heap is a tree where every parent is smaller than its children, so the smallest item is always at the top.', 'Adding and removing are O(log n), and peeking at the smallest is O(1). Python’s heapq keeps a heap inside a list.']),
    predict('Always the smallest next', ['import heapq', 'orders = []', 'for wait, dish in [(5, "Soup"), (1, "Tea"), (3, "Toast")]:', '    heapq.heappush(orders, (wait, dish))', 'first = heapq.heappop(orders)', 'second = heapq.heappop(orders)', 'print(first, second)'], [
      [7, 'What is first?', ["(1, 'Tea')", "(5, 'Soup')", "(3, 'Toast')"], 'The smallest wait comes out first.', { var: 'first' }],
    ]),
    run('Top k', 'Find the k largest fares with a heap.', ['import heapq', 'fares = [450, 120, 300, 900, 75, 610]', 'print(heapq.nlargest({{v}}, fares))'], ['1', '2', '3'], { goal: '[900, 610, 450]' }),
    toggleRun('Max-heaps and heapify', [
      ['heapify', ['import heapq', 'xs = [7, 2, 9, 4]', 'heapq.heapify(xs)', 'print(xs[0])'], 'Turns a list into a heap in O(n).', ['2']],
      ['Max-heap trick', ['import heapq', 'h = []', 'for f in [450, 120, 900]:', '    heapq.heappush(h, -f)', 'print(-heapq.heappop(h))'], 'heapq is a min-heap; store negatives for a max-heap.', ['900']],
    ]),
    check('Peeking at the smallest item in a min-heap is…', ['O(1): it is heap[0]', 'O(log n)', 'O(n)', 'Impossible'], 'Always at the top.', 'Where is it kept?', { mono: false }),
    recap([
      ['🔝', 'Min-heap: the smallest is on top'],
      ['⚡', 'push and pop O(log n); peek O(1)'],
      ['🐍', 'heapq: heappush, heappop, nlargest'],
    ]),
  ]),

  challenge('dsa2-b-3-ch', 'Heap Challenge', { icon: '🔝', name: 'Heap Hero' }, ['Use heaps as priority queues', 'Find the top k items', 'Turn a min-heap into a max-heap'], [
    mcq(1, 'In a min-heap, the root is…', ['The smallest item', 'The largest item', 'The newest item', 'Random'], 'Parents are smaller.'),
    mcq(2, 'heappush is…', ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'], 'It bubbles up.', { mono: true }),
    mcq(3, 'Which module gives heaps in Python?', ['heapq', 'heap', 'collections', 'queue only'], 'A heap in a list.', { mono: true }),
    mcq(4, 'How do you get a max-heap from heapq?', ['Push negative values', 'Use reverse=True', 'Sort the list', 'You can’t'], '-value.'),
    mcq(5, 'Which finds the 3 largest fares?', ['heapq.nlargest(3, fares)', 'heapq.heappop(fares, 3)', 'fares.max(3)', 'sorted(fares)[:3]'], 'nlargest.', { mono: true }),
    swipe([
      ['heapify works in O(n)', true, 'Faster than pushing one by one.'],
      ['A heap is fully sorted', false, 'Only parent-child order.'],
      ['Dijkstra uses a priority queue', true, 'The nearest place next.'],
      ['heap[0] is the smallest in a heapq heap', true, 'Always.'],
    ]),
    pairs([['heappush', 'Add'], ['heappop', 'Take smallest'], ['heap[0]', 'Peek'], ['nlargest', 'Top k']], 'heapq.'),
    pickCode('Which takes the most urgent order (smallest number)?', ['heapq.heappop(orders)', 'orders.pop()', 'orders.pop(0)', 'max(orders)'], 'From the heap.'),
    bugTask(['orders = [5, 1, 3]', 'print(heapq.heappop(orders))  # expected 1'], [[1, 'orders = [5, 1, 3]', 'orders = [5, 1, 3]; heapq.heapify(orders)']], 'A plain list isn’t a heap until you heapify it.'),
    predictTask(['import heapq', 'h = [4, 1, 7]', 'heapq.heapify(h)', 'heapq.heappush(h, 0)', 'print(heapq.heappop(h), heapq.heappop(h))'], 'What does it print?', ['0 1', '1 4', '0 4', '4 7'], 'Smallest two.'),
    arrange(['import heapq', 'h = []', 'heapq.heappush(h, 3)', 'heapq.heappush(h, 1)', 'print(heapq.heappop(h))'], 'import, empty heap, push, push, pop the smallest', ['1']),
  ]),

  lesson('dsa2-bfs', 'Graphs and BFS', 9, [
    chat(['A graph is a set of places (nodes) joined by connections (edges): metro stations, friends, web pages.', 'Store it as an adjacency list: a dict from each node to its neighbours. Breadth-first search (BFS) explores level by level, so it finds the fewest steps.']),
    toggleRun('Exploring the metro', [
      ['Neighbours', [...GRAPH, 'print(metro["Central"])', 'print(len(metro), "stations")'], 'An adjacency list.', ["['Harbour', 'Market']", '5 stations']],
      ['BFS distances', [...BFS, 'print(bfs("Central"))'], 'Stops away from Central.', ["{'Central': 0, 'Harbour': 1, 'Market': 1, 'Airport': 2, 'Park': 2}"]],
    ]),
    predict('Fewest stops', [...BFS, 'd = bfs("Airport")', 'print(d["Park"])'], [
      [21, 'How many stops from Airport to Park?', ['4', '2', '3'], 'Airport → Harbour → Central → Market → Park.', { out: true }],
    ]),
    reveal('BFS facts', [
      ['A queue', 'BFS takes the oldest discovered node next.'],
      ['Visited set', 'Never visit a node twice (the dist dict does it here).'],
      ['Shortest path', 'In steps, when every edge counts the same.'],
      ['O(V + E)', 'Each node and edge once.'],
    ]),
    tapbug('The search never ends', ['while q:', '    here = q.popleft()', '    for nxt in metro[here]:', '        q.append(nxt)'], [[4, '        q.append(nxt)', '        if nxt not in dist: dist[nxt] = dist[here] + 1; q.append(nxt)']], 'Remember where you’ve been, or BFS goes back and forth forever.'),
    check('Which data structure drives BFS?', ['A queue', 'A stack', 'A heap', 'A set only'], 'First in, first out.', 'Level by level.'),
    recap([
      ['🕸', 'Graphs: nodes and edges, as an adjacency list'],
      ['🌊', 'BFS explores level by level with a queue'],
      ['📏', 'Fewest steps when edges are equal'],
    ]),
  ]),

  lesson('dsa2-dfs', 'DFS and connected parts', 8, [
    chat(['Depth-first search (DFS) goes as deep as it can along one path, then backs up. A stack, or recursion, drives it.', 'It is great for “can I reach it?”, finding connected parts, and spotting cycles.']),
    predict('Go deep first', [...GRAPH, 'order = []', 'def dfs(node, seen):', '    seen.add(node)', '    order.append(node)', '    for nxt in metro[node]:', '        if nxt not in seen:', '            dfs(nxt, seen)', '', 'dfs("Central", set())', 'print(order)'], [
      [17, 'In what order are stations visited?', ["['Central', 'Harbour', 'Airport', 'Market', 'Park']", "['Central', 'Harbour', 'Market', 'Airport', 'Park']", "['Central', 'Market', 'Park', 'Harbour', 'Airport']"], 'All the way down Harbour’s branch before Market.', { out: true }],
    ]),
    run('Count islands of stations', 'Two separate networks: count the connected parts.', ['lines = {"A": ["B"], "B": ["A"], "C": ["D"], "D": ["C"], "E": []}', 'seen, parts = set(), 0', 'def dfs(n):', '    seen.add(n)', '    for m in lines[n]:', '        if m not in seen: dfs(m)', 'for n in {{v}}:', '    if n not in seen:', '        parts += 1', '        dfs(n)', 'print("parts:", parts)'], ['["A"]', '["A", "C"]', 'lines'], { goal: 'parts: 3', caption: 'Start a DFS from every unseen node; each new start is a new part.' }),
    matchUp('BFS or DFS?', [['Fewest metro stops', 'BFS'], ['Is there any route at all?', 'Either'], ['Explore a maze to the end of each corridor', 'DFS'], ['Count connected parts', 'DFS (or BFS)']], 'Same O(V + E), different order.'),
    check('What does DFS use to remember where to go back to?', ['A stack (or the call stack, with recursion)', 'A queue', 'A heap', 'Nothing'], 'Last in, first out.', 'Deep first, then back up.'),
    recap([
      ['⛏', 'DFS goes deep, then backs up'],
      ['🪆', 'Recursion or a stack'],
      ['🏝', 'Count connected parts by starting DFS from each unseen node'],
    ]),
  ]),

  lesson('dsa2-topo', 'Topological sort', 8, [
    chat(['Some tasks must come before others: learn HTML before CSS, CSS before React. That is a directed graph with no cycles (a DAG).', 'A topological sort lists the tasks so every task comes after everything it depends on.']),
    predict('Order the courses', ['from collections import deque', 'needs = {"HTML": [], "CSS": ["HTML"], "JS": ["HTML"], "React": ["CSS", "JS"]}', 'indeg = {c: len(r) for c, r in needs.items()}', 'unlocks = {c: [] for c in needs}', 'for c, reqs in needs.items():', '    for r in reqs:', '        unlocks[r].append(c)', 'q = deque(c for c in needs if indeg[c] == 0)', 'order = []', 'while q:', '    c = q.popleft()', '    order.append(c)', '    for nxt in unlocks[c]:', '        indeg[nxt] -= 1', '        if indeg[nxt] == 0:', '            q.append(nxt)', 'print(order)'], [
      [17, 'What is order?', ["['HTML', 'CSS', 'JS', 'React']", "['React', 'JS', 'CSS', 'HTML']", "['HTML', 'React', 'CSS', 'JS']"], 'Each course comes after its needs.', { var: 'order' }],
    ]),
    reveal('Kahn’s algorithm', [
      ['In-degree', 'How many things a task still waits for.'],
      ['Start', 'Queue every task waiting for nothing.'],
      ['Repeat', 'Take one, then lower the count of what it unlocks; queue any that reach 0.'],
      ['Cycle check', 'If not every task came out, there is a cycle: no valid order.'],
    ]),
    tapbug('Some courses never appear in the order', ['needs = {"A": ["B"], "B": ["A"]}'], [[1, '"A": ["B"], "B": ["A"]', '"A": [], "B": ["A"]']], 'A cycle: A waits for B, B waits for A. Nothing can start.'),
    check('Topological order exists only if the graph…', ['Has no cycles', 'Is a tree', 'Has one root', 'Is undirected'], 'A DAG.', 'What if two tasks wait for each other?'),
    recap([
      ['📋', 'Order tasks so each comes after what it needs'],
      ['🔢', 'Kahn’s algorithm: in-degrees and a queue'],
      ['🔁', 'Leftover tasks mean a cycle'],
    ]),
  ]),

  challenge('dsa2-b-4-ch', 'Graphs Challenge', { icon: '🕸', name: 'Graph Explorer' }, ['Store graphs as adjacency lists', 'Search with BFS and DFS', 'Order tasks topologically'], [
    mcq(1, 'An adjacency list is…', ['A dict from each node to its neighbours', 'A list of all nodes', 'A matrix of distances', 'A sorted list'], 'Compact for sparse graphs.'),
    mcq(2, 'Which search finds the fewest steps?', ['BFS', 'DFS', 'Binary search', 'Topological sort'], 'Level by level.'),
    mcq(3, 'BFS and DFS both run in…', ['O(V + E)', 'O(V²)', 'O(log V)', 'O(E²)'], 'Each node and edge once.', { mono: true }),
    mcq(4, 'Why keep a visited set?', ['So you never process a node twice', 'To sort nodes', 'To save edges', 'It’s optional'], 'Or loop forever.'),
    mcq(5, 'Topological sort needs a graph with…', ['No cycles', 'Exactly one edge per node', 'Weights', 'Undirected edges'], 'A DAG.'),
    swipe([
      ['DFS can be written with recursion', true, 'The call stack.'],
      ['BFS uses a stack', false, 'A queue.'],
      ['Kahn’s algorithm can detect cycles', true, 'Leftover nodes.'],
      ['Connected parts can be counted with DFS', true, 'One start per part.'],
    ]),
    pairs([['BFS', 'Queue'], ['DFS', 'Stack'], ['Topological sort', 'In-degrees'], ['Visited set', 'No repeats']], 'Graph tools.'),
    pickCode('Which starts BFS from Central?', ['q = deque(["Central"]); dist = {"Central": 0}', 'q = ["Central"]; q.pop()', 'stack = ["Central"]', 'heapq.heappush(q, "Central")'], 'A queue and a distance map.'),
    bugTask(['def dfs(n):', '    for m in graph[n]:', '        dfs(m)'], [[3, '        dfs(m)', '        if m not in seen: seen.add(m); dfs(m)']], 'Mark nodes as seen, and skip ones already seen.'),
    predictTask([...BFS, 'print(max(bfs("Park").values()))'], 'What does it print?', ['4', '2', '3', '5'], 'Airport is 4 stops from Park.'),
    arrange([...GRAPH, 'print(sorted(metro["Harbour"]))'], 'the graph’s lines in order, then print Harbour’s neighbours', ["['Airport', 'Central']"]),
  ]),
];
