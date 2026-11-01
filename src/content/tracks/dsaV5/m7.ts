// DSA · Modules 6–12 (Intermediate): hashing, two pointers, sliding window, prefix sums, stacks, queues and linked
// lists. Each module’s first lesson keeps its old id. Programs run with real Python in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun } from './kit';

export const DSA_M7: Lesson[] = [
  lesson('dsa-hash', 'Hashing with sets and dicts', 8, [
    chat(['A hash table turns a key into a slot number with a hash function, so it can jump straight to it. Lookups, inserts and deletes are O(1) on average.', 'In Python, dict and set are hash tables.']),
    toggleRun('List or set?', [
      ['List: O(n)', ['booked = ["Ava", "Reed", "Kaden", "Megan"]', 'print("Megan" in booked)'], 'Checks names one by one.', ['True']],
      ['Set: O(1)', ['booked = {"Ava", "Reed", "Kaden", "Megan"}', 'print("Megan" in booked)'], 'Jumps straight to the slot.', ['True']],
    ]),
    predict('First repeated booking', ['names = ["Ava", "Reed", "Kaden", "Reed", "Ava"]', 'seen = set()', 'first = None', 'for n in names:', '    if n in seen:', '        first = n', '        break', '    seen.add(n)', 'print(first)'], [
      [9, 'What is first?', ["'Reed'", "'Ava'", 'None'], 'Reed is the first name seen twice.', { var: 'first' }],
    ]),
    run('Two sum with a dict', 'Find two fares that add up to the target. Try each target.', ['fares = [40, 90, 80, 150]', 'target = {{v}}', 'seen = {}', 'answer = None', 'for i, f in enumerate(fares):', '    if target - f in seen:', '        answer = (seen[target - f], i)', '        break', '    seen[f] = i', 'print(answer)'], ['999', '170', '230'], { goal: '(2, 3)', caption: 'One pass: for each fare, ask if its partner was already seen. O(n) instead of O(n²).' }),
    reveal('Hash table facts', [
      ['Keys must be hashable', 'Strings, numbers and tuples, not lists.'],
      ['Collisions', 'Two keys can land in the same slot; the table handles it.'],
      ['Average O(1)', 'Worst case is O(n), but very rare.'],
      ['Order', 'Python dicts keep insertion order.'],
    ]),
    tapbug('TypeError: unhashable type: ’list’', ['seen = set()', 'seen.add(["Ava", 15])'], [[2, '["Ava", 15]', '("Ava", 15)']], 'Lists can change, so they can’t be keys. Use a tuple.'),
    check('Why is x in a_set faster than x in a_list?', ['A set jumps to the slot by hashing x', 'Sets are sorted', 'Sets are smaller', 'It isn’t'], 'O(1) on average.', 'How does it find x?'),
    recap([
      ['#', 'Hash tables: O(1) average lookups'],
      ['🐍', 'dict and set are hash tables'],
      ['🧠', 'Swap O(n²) pair checks for one pass with a dict'],
    ]),
  ]),

  challenge('dsa-b-7-ch', 'Hashing Challenge', { icon: '#', name: 'Hash Hero' }, ['Use sets and dicts for fast lookups', 'Spot repeats in one pass', 'Solve two sum in O(n)'], [
    mcq(1, 'Average cost of a dict lookup?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'Hashing.', { mono: true }),
    mcq(2, 'Which can be a dict key?', ['A tuple', 'A list', 'A dict', 'A set'], 'It must be hashable.', { mono: true }),
    mcq(3, 'Finding the first repeated name in one pass uses…', ['A set of names seen', 'Sorting twice', 'Two nested loops', 'A stack'], 'Check, then add.'),
    mcq(4, 'Two sum with a dict is…', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 'One pass.', { mono: true }),
    mcq(5, 'What is a collision?', ['Two keys hashing to the same slot', 'Two equal values', 'A crash', 'A duplicate list'], 'The table handles it.'),
    swipe([
      ['Python dicts keep insertion order', true, 'Since 3.7.'],
      ['Sets can hold duplicates', false, 'Each value once.'],
      ['Hash tables trade memory for speed', true, 'Extra slots.'],
      ['Lists can be set members', false, 'Unhashable.'],
    ]),
    pairs([['set', 'Unique values, fast in'], ['dict', 'Key → value'], ['hash()', 'Key to number'], ['Collision', 'Same slot']], 'Hashing.'),
    pickCode('Which counts how often each name appears?', ['from collections import Counter; Counter(names)', 'set(names)', 'sorted(names)', 'names.count()'], 'Counter is a dict of counts.'),
    bugTask(['seen = []', 'if n in seen: ...'], [[1, 'seen = []', 'seen = set()']], 'A set makes in O(1).'),
    predictTask(['dishes = {"tea", "toast", "tea"}', 'print(len(dishes))'], 'What does it print?', ['2', '3', '1', 'Error'], 'tea is kept once.'),
    arrange(['names = ["Ava", "Reed", "Ava"]', 'seen = set()', 'for n in names:', '    if n in seen: print(n)', '    seen.add(n)'], 'the names, an empty set, loop, report repeats, remember', ['Ava']),
  ]),

  lesson('dsa-pointers', 'Two pointers', 8, [
    chat(['Two pointers walk through a list from two places at once, often from both ends of a sorted list towards the middle.', 'It turns many O(n²) pair searches into O(n).']),
    predict('Pair that sums to a target', ['fares = [20, 40, 70, 90, 120]', 'target = 160', 'i, j = 0, len(fares) - 1', 'while i < j:', '    s = fares[i] + fares[j]', '    if s == target:', '        break', '    elif s < target:', '        i += 1', '    else:', '        j -= 1', 'print(fares[i], fares[j])'], [
      [12, 'Which pair is found?', ['40 120', '70 90', '20 120'], '20+120 is too small, so i moves; 40+120 = 160.', { out: true }],
    ]),
    toggleRun('More two-pointer patterns', [
      ['Reverse in place', ['xs = [1, 2, 3, 4, 5]', 'i, j = 0, len(xs) - 1', 'while i < j:', '    xs[i], xs[j] = xs[j], xs[i]', '    i, j = i + 1, j - 1', 'print(xs)'], 'Swap the ends, move inwards.', ['[5, 4, 3, 2, 1]']],
      ['Remove duplicates (sorted)', ['xs = [1, 1, 2, 3, 3, 3, 4]', 'k = 1', 'for i in range(1, len(xs)):', '    if xs[i] != xs[k - 1]:', '        xs[k] = xs[i]', '        k += 1', 'print(xs[:k])'], 'A slow pointer writes, a fast one reads.', ['[1, 2, 3, 4]']],
    ]),
    reveal('When to think “two pointers”', [
      ['Sorted list, pairs', 'Sum, difference, closest pair.'],
      ['In-place changes', 'Reverse, remove, partition.'],
      ['Palindromes', 'Compare from both ends.'],
    ]),
    check('Why does two pointers need a sorted list for pair sums?', ['So moving a pointer makes the sum predictably bigger or smaller', 'To use less memory', 'Python requires it', 'It doesn’t'], 'Order tells you which way to move.', 'Which way does the sum go?'),
    recap([
      ['👉👈', 'Two pointers move towards each other'],
      ['⚡', 'O(n) instead of checking every pair'],
      ['📚', 'Works because the list is sorted'],
    ]),
  ]),

  lesson('dsa-window', 'Sliding window', 8, [
    chat(['A sliding window is a range of the list that moves along: add the item coming in, remove the one going out.', 'Busiest 3 days in a row? Recomputing each sum is O(n·k); sliding is O(n).']),
    predict('Busiest three days', ['cups = [12, 18, 9, 20, 25, 7]', 'k = 3', 'window = sum(cups[:k])', 'best = window', 'for i in range(k, len(cups)):', '    window += cups[i] - cups[i - k]', '    best = max(best, window)', 'print(best)'], [
      [8, 'What is best?', ['54', '45', '52'], '9 + 20 + 25 = 54.', { var: 'best' }],
    ]),
    run('Change the window size', 'Try different k.', ['cups = [12, 18, 9, 20, 25, 7]', 'k = {{v}}', 'window = sum(cups[:k])', 'best = window', 'for i in range(k, len(cups)):', '    window += cups[i] - cups[i - k]', '    best = max(best, window)', 'print("best", k, "days:", best)'], ['3', '2', '1'], { goal: 'best 2 days: 45' }),
    reveal('Windows that grow and shrink', [
      ['Fixed size', 'Add one, remove one: sums and averages of k items.'],
      ['Variable size', 'Grow the right edge; shrink the left while a rule breaks: longest run without repeats.'],
      ['Always O(n)', 'Each item enters and leaves once.'],
    ]),
    tapbug('The window sum keeps growing', ['for i in range(k, len(cups)):', '    window += cups[i]'], [[2, '    window += cups[i]', '    window += cups[i] - cups[i - k]']], 'Remove the item leaving the window.'),
    check('Why is a sliding window O(n)?', ['Each item is added once and removed once', 'It skips items', 'It sorts first', 'It uses a set'], 'No re-summing.', 'How often is each item touched?'),
    recap([
      ['🪟', 'Add the new item, remove the old one'],
      ['⚡', 'O(n) instead of O(n·k)'],
      ['↔', 'Fixed or variable size'],
    ]),
  ]),

  lesson('dsa-prefix', 'Prefix sums', 7, [
    chat(['A prefix sum list holds running totals: prefix[i] is the sum of the first i items.', 'Then the sum of any range is one subtraction: prefix[b] − prefix[a]. O(1) per question after O(n) set-up.']),
    predict('Running totals', ['cups = [12, 18, 9, 20, 25]', 'prefix = [0]', 'for c in cups:', '    prefix.append(prefix[-1] + c)', 'days_2_to_4 = prefix[4] - prefix[1]', 'print(prefix, days_2_to_4)'], [
      [6, 'What is days_2_to_4 (18 + 9 + 20)?', ['47', '59', '29'], 'prefix[4] − prefix[1] = 59 − 12.', { var: 'days_2_to_4' }],
    ]),
    toggleRun('Many range questions', [
      ['Re-summing each time', ['cups = [12, 18, 9, 20, 25]', 'print(sum(cups[1:4]), sum(cups[0:5]))'], 'Each question is O(n).', ['47 84']],
      ['Prefix sums', ['from itertools import accumulate', 'cups = [12, 18, 9, 20, 25]', 'p = [0] + list(accumulate(cups))', 'print(p[4] - p[1], p[5] - p[0])'], 'Each question is O(1) after set-up.', ['47 84']],
    ]),
    tapbug('The range sum is off by one day', ['days_2_to_4 = prefix[4] - prefix[2]'], [[1, 'prefix[2]', 'prefix[1]']], 'Sum of items a..b−1 is prefix[b] − prefix[a].'),
    check('After building prefix sums, a range sum costs…', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'One subtraction.', 'How many operations?', { mono: true }),
    recap([
      ['➕', 'prefix[i]: sum of the first i items'],
      ['➖', 'Range sum: prefix[b] − prefix[a]'],
      ['⚡', 'O(n) once, then O(1) per question'],
    ]),
  ]),

  challenge('dsa-b-9-ch', 'Patterns Challenge', { icon: '👉', name: 'Pattern Pro' }, ['Use two pointers on sorted data', 'Slide a window in O(n)', 'Answer range sums with prefix sums'], [
    mcq(1, 'Two pointers for a pair sum needs the list…', ['Sorted', 'Reversed', 'Unique', 'Short'], 'To know which way to move.'),
    mcq(2, 'A sliding window sum moves by…', ['Adding the new item and removing the old one', 'Re-summing the window', 'Sorting', 'Doubling k'], 'O(1) per step.'),
    mcq(3, 'With prefix sums, sum of items 1..3 is…', ['prefix[4] − prefix[1]', 'prefix[3] − prefix[1]', 'prefix[4]', 'prefix[1] + prefix[3]'], 'Up to but not including 4.', { mono: true }),
    mcq(4, 'All three patterns usually make the solution…', ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(n³)'], 'One pass.', { mono: true }),
    mcq(5, 'Busiest k days in a row is a…', ['Sliding window problem', 'Binary search problem', 'Stack problem', 'Graph problem'], 'Consecutive range.'),
    swipe([
      ['Two pointers can reverse a list in place', true, 'Swap the ends.'],
      ['Prefix sums need the list sorted', false, 'Any order.'],
      ['A variable window can shrink from the left', true, 'When a rule breaks.'],
      ['Sliding window re-adds every item each step', false, 'Only the new one.'],
    ]),
    pairs([['Two pointers', 'From both ends'], ['Sliding window', 'Moving range'], ['Prefix sums', 'Running totals'], ['O(n)', 'One pass']], 'Patterns.'),
    pickCode('Which moves the left pointer when the sum is too small?', ['if s < target: i += 1', 'if s < target: j -= 1', 'if s < target: i -= 1', 'if s < target: break'], 'Bigger values are to the right.'),
    bugTask(['window += cups[i]', 'total = prefix[b] + prefix[a]'], [[1, 'window += cups[i]', 'window += cups[i] - cups[i - k]'], [2, 'prefix[b] + prefix[a]', 'prefix[b] - prefix[a]']], 'Remove the leaving item; subtract prefixes.'),
    predictTask(['xs = [3, 1, 4, 1, 5]', 'p = [0]', 'for x in xs:', '    p.append(p[-1] + x)', 'print(p[5] - p[2])'], 'What does it print?', ['10', '14', '9', '4'], '4 + 1 + 5.'),
    arrange(['cups = [5, 9, 2, 8]', 'k = 2', 'window = sum(cups[:k])', 'best = window', 'for i in range(k, len(cups)):', '    window += cups[i] - cups[i - k]', '    best = max(best, window)', 'print(best)'], 'data, size, first window, best so far, slide, update, keep best, print', ['14']),
  ]),

  lesson('dsa-stack', 'Stacks', 8, [
    chat(['A stack is last in, first out (LIFO), like a pile of plates: you add and remove at the top.', 'In Python, a list works: append() pushes, pop() pops. Both are O(1).']),
    predict('Push and pop', ['stack = []', 'stack.append("Tea")', 'stack.append("Toast")', 'stack.append("Soup")', 'top = stack.pop()', 'print(top, stack)'], [
      [6, 'What is top?', ["'Soup'", "'Tea'", "'Toast'"], 'The last one pushed comes off first.', { var: 'top' }],
    ]),
    run('Balanced brackets', 'Try each string.', ['text = "{{v}}"', 'pairs = {")": "(", "]": "[", "}": "{"}', 'stack = []', 'ok = True', 'for ch in text:', '    if ch in "([{":', '        stack.append(ch)', '    elif ch in pairs:', '        if not stack or stack.pop() != pairs[ch]:', '            ok = False', 'print("balanced" if ok and not stack else "not balanced")'], ['(]', '([)]', '{[()]}'], { goal: 'balanced', caption: 'Each closing bracket must match the latest opener: a stack.' }),
    reveal('Where stacks appear', [
      ['Undo', 'Each action is pushed; undo pops the latest.'],
      ['Function calls', 'The call stack: recursion uses it.'],
      ['Back button', 'Pages visited.'],
      ['Matching', 'Brackets, HTML tags.'],
    ]),
    tapbug('IndexError: pop from empty list', ['stack = []', 'stack.pop()'], [[2, 'stack.pop()', 'if stack: stack.pop()']], 'Check the stack isn’t empty first.'),
    check('Which element does pop() return?', ['The one pushed last', 'The one pushed first', 'The smallest', 'A random one'], 'LIFO.', 'Top of the pile.'),
    recap([
      ['🥞', 'Stack: last in, first out'],
      ['⬆', 'append to push, pop to pop: O(1)'],
      ['🧩', 'Undo, call stacks and bracket matching'],
    ]),
  ]),

  lesson('dsa-queue', 'Queues', 8, [
    chat(['A queue is first in, first out (FIFO), like people at the counter.', 'list.pop(0) is O(n), so use collections.deque: append() and popleft() are O(1).']),
    predict('Serve in order', ['from collections import deque', 'q = deque()', 'q.append("Ava")', 'q.append("Reed")', 'q.append("Kaden")', 'served = q.popleft()', 'print(served, list(q))'], [
      [7, 'Who is served first?', ["'Ava'", "'Kaden'", "'Reed'"], 'First in, first out.', { var: 'served' }],
    ]),
    toggleRun('Queue tools', [
      ['deque', ['from collections import deque', 'q = deque(["Ava", "Reed"])', 'q.append("Kaden")', 'q.appendleft("Megan")', 'print(q.popleft(), q.pop(), list(q))'], 'Both ends are O(1).', ["Megan Kaden ['Ava', 'Reed']"]],
      ['Priority queue', ['import heapq', 'orders = []', 'heapq.heappush(orders, (2, "Toast"))', 'heapq.heappush(orders, (1, "Tea"))', 'heapq.heappush(orders, (3, "Soup"))', 'print(heapq.heappop(orders))'], 'Smallest priority first, not first in.', ["(1, 'Tea')"]],
    ]),
    tapbug('The queue gets slow with thousands of orders', ['orders = []', 'first = orders.pop(0)'], [[1, 'orders = []', 'orders = deque()'], [2, 'orders.pop(0)', 'orders.popleft()']], 'pop(0) shifts every item. deque.popleft() is O(1).'),
    check('Which serves first in, first out?', ['A queue', 'A stack', 'A set', 'A dict'], 'Like a line at the counter.', 'FIFO.'),
    recap([
      ['🚶', 'Queue: first in, first out'],
      ['⚡', 'deque: append and popleft in O(1)'],
      ['🏅', 'heapq for priority queues'],
    ]),
  ]),

  challenge('dsa-b-11-ch', 'Stacks and Queues Challenge', { icon: '🥞', name: 'Stack Stacker' }, ['Use stacks for LIFO problems', 'Use deque for queues', 'Choose between them'], [
    mcq(1, 'A stack is…', ['Last in, first out', 'First in, first out', 'Sorted', 'Random'], 'LIFO.'),
    mcq(2, 'A queue is…', ['First in, first out', 'Last in, first out', 'Sorted by size', 'A kind of set'], 'FIFO.'),
    mcq(3, 'Which is O(1) for removing from the front?', ['deque.popleft()', 'list.pop(0)', 'list.remove(x)', 'del list[0]'], 'list.pop(0) is O(n).', { mono: true }),
    mcq(4, 'Bracket matching uses a…', ['Stack', 'Queue', 'Set', 'Heap'], 'Latest opener first.'),
    mcq(5, 'Which serves the smallest priority first?', ['heapq', 'deque', 'list', 'set'], 'A heap.', { mono: true }),
    swipe([
      ['Undo is usually a stack', true, 'Latest action first.'],
      ['Printers serve jobs with a queue', true, 'In order.'],
      ['list.pop() from the end is O(n)', false, 'O(1).'],
      ['Recursion uses the call stack', true, 'Each call waits on top.'],
    ]),
    pairs([['append + pop', 'Stack'], ['append + popleft', 'Queue'], ['heappush + heappop', 'Priority queue'], ['Call stack', 'Recursion']], 'Stacks and queues.'),
    pickCode('Which makes an efficient queue?', ['from collections import deque; q = deque()', 'q = []', 'q = set()', 'q = {}'], 'O(1) at both ends.'),
    bugTask(['q = []', 'next_order = q.pop()'], [[1, 'q = []', 'q = deque()'], [2, 'q.pop()', 'q.popleft()']], 'A queue takes from the front.'),
    predictTask(['s = [1, 2, 3]', 's.append(4)', 's.pop()', 'print(s.pop())'], 'What does it print?', ['3', '4', '1', '2'], '4 was popped first.'),
    arrange(['from collections import deque', 'q = deque(["Ava"])', 'q.append("Reed")', 'print(q.popleft())'], 'import, make a queue, join, serve', ['Ava']),
  ]),

  lesson('dsa-linked', 'Linked lists', 9, [
    chat(['A linked list keeps each item in a node that points to the next one. Nodes can live anywhere in memory.', 'Adding or removing at the front is O(1) (no shifting), but reaching item i takes O(i) steps.']),
    predict('Walk a linked list', ['class Node:', '    def __init__(self, value, next=None):', '        self.value, self.next = value, next', '', 'head = Node("Tea", Node("Toast", Node("Soup")))', 'items = []', 'node = head', 'while node:', '    items.append(node.value)', '    node = node.next', 'print(items)'], [
      [11, 'What is items?', ["['Tea', 'Toast', 'Soup']", "['Soup', 'Toast', 'Tea']", "['Tea']"], 'Follow next until it is None.', { var: 'items' }],
    ]),
    toggleRun('Changing a linked list', [
      ['Add at the front', ['class Node:', '    def __init__(self, value, next=None):', '        self.value, self.next = value, next', '', 'head = Node("Toast")', 'head = Node("Tea", head)', 'print(head.value, head.next.value)'], 'O(1): the new node points at the old head.', ['Tea Toast']],
      ['Reverse it', ['class Node:', '    def __init__(self, value, next=None):', '        self.value, self.next = value, next', '', 'head = Node(1, Node(2, Node(3)))', 'prev = None', 'while head:', '    head.next, prev, head = prev, head, head.next', 'print(prev.value, prev.next.value, prev.next.next.value)'], 'Turn every arrow around: a classic interview question.', ['3 2 1']],
    ]),
    matchUp('Array or linked list?', [['Read item 1000 quickly', 'Array: O(1)'], ['Add at the front often', 'Linked list: O(1)'], ['Use little extra memory', 'Array: no pointers'], ['Insert next to a node you have', 'Linked list: relink two nodes']], 'Different strengths.'),
    tapbug('AttributeError: ’NoneType’ object has no attribute ’value’', ['node = head', 'while node.next:', '    node = node.next.next'], [[3, 'node.next.next', 'node.next']], 'Step one node at a time, and check for None.'),
    check('Reading the 500th item of a linked list is…', ['O(n): follow 500 links', 'O(1)', 'O(log n)', 'Impossible'], 'No jumping.', 'How do you reach it?'),
    recap([
      ['🔗', 'Nodes point to the next node'],
      ['⚡', 'Front changes O(1); reaching item i O(i)'],
      ['↩', 'Reversing is a classic exercise'],
    ]),
  ]),

  challenge('dsa-b-12-ch', 'Linked List Challenge', { icon: '🔗', name: 'Link Master' }, ['Build and walk linked lists', 'Compare them with arrays', 'Change links safely'], [
    mcq(1, 'What does each node hold?', ['A value and a link to the next node', 'Only a value', 'The whole list', 'An index'], 'Value + next.'),
    mcq(2, 'Adding at the front of a linked list is…', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'No shifting.', { mono: true }),
    mcq(3, 'Reaching the i-th node is…', ['O(i)', 'O(1)', 'O(log i)', 'Impossible'], 'Follow the links.', { mono: true }),
    mcq(4, 'What marks the end of a linked list?', ['next is None', 'value is 0', 'An empty string', 'A loop'], 'No next node.', { mono: true }),
    mcq(5, 'Which is the better choice for frequent random access?', ['An array (list)', 'A linked list', 'A queue', 'A stack'], 'O(1) by index.'),
    swipe([
      ['Linked list nodes sit side by side in memory', false, 'Anywhere; links join them.'],
      ['Reversing a linked list can be done in O(n)', true, 'One pass.'],
      ['Python’s list is a linked list', false, 'It is a dynamic array.'],
      ['Each node needs extra memory for its link', true, 'The pointer.'],
    ]),
    pairs([['head', 'First node'], ['next', 'Link'], ['None', 'End'], ['Node(v, head)', 'Add at front']], 'Linked lists.'),
    pickCode('Which adds "Tea" at the front?', ['head = Node("Tea", head)', 'head.next = Node("Tea")', 'head = Node("Tea")', 'head.append("Tea")'], 'Point at the old head.'),
    bugTask(['while node.next:', '    print(node.value)', '    node = node.next.next'], [[1, 'while node.next:', 'while node:'], [3, 'node.next.next', 'node.next']], 'Visit every node, one step at a time.'),
    predictTask(['class Node:', '    def __init__(self, v, n=None):', '        self.v, self.n = v, n', '', 'h = Node(1, Node(2))', 'h = Node(0, h)', 'print(h.n.v)'], 'What does it print?', ['1', '0', '2', 'None'], '0 now points to 1.'),
    arrange(['class Node:', '    def __init__(self, v, n=None): self.v, self.n = v, n', 'head = Node("Tea", Node("Toast"))', 'print(head.n.v)'], 'the class, its constructor, build two nodes, read the second', ['Toast']),
  ]),
];
