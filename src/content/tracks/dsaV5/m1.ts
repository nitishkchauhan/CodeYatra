// DSA · Modules 1–6 (Basic): Big-O, arrays and strings, recursion, linear search, binary search, and sorting.
// Each module’s first lesson keeps its old id. Programs run with real Python in tests.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const DSA_M1: Lesson[] = [
  lesson('dsa-bigo', 'Big-O: how code scales', 8, [
    chat(['Data structures are ways to store data; algorithms are step-by-step ways to solve problems with it. Together: DSA.', 'Big-O describes how the work grows as the input grows. 10 items or 10 million: does your code still cope?']),
    toggleRun('Count the steps', [
      ['O(1)', ['menu = ["Tea", "Toast", "Coffee", "Soup"]', 'steps = 1', 'first = menu[0]', 'print(first, steps)'], 'One step, however long the list is.', ['Tea 1']],
      ['O(n)', ['menu = ["Tea", "Toast", "Coffee", "Soup"]', 'steps = 0', 'for dish in menu:', '    steps += 1', 'print(steps)'], 'One step per item: twice the list, twice the work.', ['4']],
      ['O(n²)', ['menu = ["Tea", "Toast", "Coffee", "Soup"]', 'steps = 0', 'for a in menu:', '    for b in menu:', '        steps += 1', 'print(steps)'], 'Every pair: 4 items, 16 steps; 1000 items, a million.', ['16']],
    ]),
    run('Grow the input', 'Change n and watch each kind of work grow.', ['n = {{v}}', 'print("O(1):", 1, " O(n):", n, " O(n^2):", n * n)'], ['10', '100', '1000'], { goal: 'O(1): 1  O(n): 1000  O(n^2): 1000000', caption: 'At 1000 items, O(n²) is a thousand times more work than O(n).' }),
    reveal('Common Big-O classes, fastest first', [
      ['O(1)', 'Constant: reading list[0], a dict lookup.'],
      ['O(log n)', 'Logarithmic: halving each time (binary search).'],
      ['O(n)', 'Linear: one pass over the data.'],
      ['O(n log n)', 'Good sorting algorithms.'],
      ['O(n²)', 'Quadratic: a loop inside a loop.'],
    ], { mono: true }),
    check('A loop inside a loop, both over the same list of n items. Big-O?', ['O(n²)', 'O(n)', 'O(2n)', 'O(log n)'], 'n times n.', 'How many pairs?', { mono: true }),
    recap([
      ['📈', 'Big-O: how work grows with input size'],
      ['⚡', 'O(1) < O(log n) < O(n) < O(n log n) < O(n²)'],
      ['🔁', 'Nested loops over the input are usually O(n²)'],
    ]),
  ]),

  lesson('dsa-b-1-2', 'Time and space', 7, [
    reveal('Rules of thumb', [
      ['Drop constants', 'O(2n) is just O(n): the shape matters, not the exact count.'],
      ['Keep the biggest term', 'O(n² + n) is O(n²).'],
      ['Worst case', 'Big-O usually means the worst case.'],
      ['Space', 'Memory counts too: a new list of n items is O(n) space.'],
    ]),
    predict('Count the work', ['n = 5', 'steps = 0', 'for i in range(n):', '    steps += 1', 'for i in range(n):', '    steps += 1', 'print(steps)'], [
      [7, 'What is steps?', ['10', '25', '5'], 'Two loops one after another: n + n.', { var: 'steps' }],
    ]),
    matchUp('Simplify the Big-O', [['O(3n)', 'O(n)'], ['O(n² + n)', 'O(n²)'], ['O(500)', 'O(1)'], ['O(log n + 7)', 'O(log n)']], 'Drop constants, keep the biggest term.'),
    truth([
      ['O(2n) and O(n) are the same class', true, 'Constants are dropped.'],
      ['A faster computer changes the Big-O', false, 'Big-O is about growth, not speed.'],
      ['Sorting a copy of a list uses extra space', true, 'O(n) for the copy.'],
    ]),
    check('Two separate loops over n items. Big-O?', ['O(n)', 'O(n²)', 'O(2)', 'O(log n)'], 'n + n is 2n, which is O(n).', 'One after another, not inside.', { mono: true }),
    recap([
      ['✂', 'Drop constants and smaller terms'],
      ['🧱', 'Worst case is the usual measure'],
      ['🧠', 'Space complexity counts extra memory'],
    ]),
  ]),

  challenge('dsa-b-1-ch', 'Module 1 Challenge', { icon: '📈', name: 'Big-O Spotter' }, ['Explain what Big-O measures', 'Recognise common classes', 'Simplify expressions'], [
    mcq(1, 'What does Big-O describe?', ['How work grows as the input grows', 'The exact time in seconds', 'How many lines the code has', 'Memory used by Python'], 'Growth, not seconds.'),
    mcq(2, 'Reading menu[0] from a list is…', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 'Direct access.', { mono: true }),
    mcq(3, 'Which grows fastest?', ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], 'Quadratic.', { mono: true }),
    mcq(4, 'O(4n + 10) simplifies to…', ['O(n)', 'O(4n)', 'O(10)', 'O(n²)'], 'Drop constants.', { mono: true }),
    mcq(5, 'Halving the search each step is…', ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], 'Binary search.', { mono: true }),
    swipe([
      ['O(n) means one step per item', true, 'Linear.'],
      ['Big-O measures exact seconds', false, 'It describes growth.'],
      ['O(n²) code can be fine for tiny inputs', true, 'It matters as n grows.'],
      ['Making a copy of a list uses O(n) space', true, 'n new slots.'],
    ]),
    pairs([['O(1)', 'Constant'], ['O(log n)', 'Halving'], ['O(n)', 'One pass'], ['O(n²)', 'Every pair']], 'Big-O classes.'),
    pickCode('Which loop is O(n²)?', ['for a in items:\n    for b in items: ...', 'for a in items: ...', 'items[0]', 'len(items)'], 'Nested over the same input.'),
    bugTask(['# Big-O of a loop inside a loop: O(n)', '# Big-O of items[0]: O(n)'], [[1, 'O(n)', 'O(n²)'], [2, 'O(n)', 'O(1)']], 'Nested loops are O(n²); one lookup is O(1).'),
    predictTask(['n = 4', 'pairs = 0', 'for a in range(n):', '    for b in range(n):', '        pairs += 1', 'print(pairs)'], 'What does it print?', ['16', '8', '4', '1'], '4 × 4.'),
    arrange(['steps = 0', 'for i in range(3):', '    steps += 1', 'print(steps)'], 'start the count, loop, add one, print', ['3']),
  ]),

  lesson('dsa-arrays', 'Arrays and strings', 8, [
    chat(['An array keeps items side by side in memory, numbered from 0. In Python, the list does this job.', 'Reading or changing item i is O(1). Inserting or deleting in the middle is O(n): everything after it has to shift.']),
    toggleRun('Costs of list operations', [
      ['Read by index', ['fares = [40, 90, 80, 150]', 'print(fares[2])'], 'O(1): jump straight there.', ['80']],
      ['Append', ['fares = [40, 90, 80]', 'fares.append(150)', 'print(fares)'], 'O(1) on average: add at the end.', ['[40, 90, 80, 150]']],
      ['Insert at the front', ['fares = [40, 90, 80]', 'fares.insert(0, 20)', 'print(fares)'], 'O(n): every item moves one place.', ['[20, 40, 90, 80]']],
      ['Search', ['fares = [40, 90, 80]', 'print(80 in fares)'], 'O(n): it may check every item.', ['True']],
    ]),
    predict('Walk an array', ['fares = [40, 90, 80, 150]', 'total = 0', 'biggest = fares[0]', 'for f in fares:', '    total += f', '    if f > biggest:', '        biggest = f', 'print(total, biggest)'], [
      [6, 'Before the first check, what is biggest?', ['40', '90', '150'], 'It starts as the first fare.', { var: 'biggest' }],
      [8, 'What is total at the end?', ['360', '150', '40'], 'Add them all.', { var: 'total' }],
    ]),
    run('Strings are arrays of characters', 'Try each string operation.', ['name = "Harbour Express"', 'print({{v}})'], ['name[0]', 'name[-1]', 'name[::-1]', 'len(name)'], { goal: 'sserpxE ruobraH', caption: '[::-1] reverses: a new string, O(n).' }),
    tapbug('IndexError: list index out of range', ['fares = [40, 90, 80]', 'print(fares[3])'], [[2, 'fares[3]', 'fares[2]']], 'Indexes go from 0 to len − 1.'),
    check('Why is inserting at the front of a list O(n)?', ['Every other item has to shift along', 'Python checks every item first', 'Lists are sorted', 'It isn’t; it is O(1)'], 'Items sit side by side.', 'What happens to the items after it?'),
    recap([
      ['🔢', 'Arrays (lists) store items by index from 0'],
      ['⚡', 'Index and append: O(1)'],
      ['🐢', 'Insert, delete in the middle and search: O(n)'],
    ]),
  ]),

  lesson('dsa-b-2-2', 'Classic array problems', 8, [
    run('Reverse in place', 'Pick a way to reverse the list.', ['fares = [40, 90, 80, 150]', '{{v}}', 'print(fares)'], ['fares.sort()', 'fares = fares[::-1]', 'fares.reverse()'], { goal: '[150, 80, 90, 40]' }),
    predict('Count each dish', ['orders = ["tea", "toast", "tea", "coffee", "tea"]', 'counts = {}', 'for o in orders:', '    counts[o] = counts.get(o, 0) + 1', 'top = max(counts, key=counts.get)', 'print(counts, top)'], [
      [5, 'What is counts?', ["{'tea': 3, 'toast': 1, 'coffee': 1}", "{'tea': 1, 'toast': 1, 'coffee': 1}", "{'tea': 5}"], 'Each order adds one to its dish.', { var: 'counts' }],
      [6, 'What is top?', ["'tea'", "'toast'", "'coffee'"], 'The dish with the biggest count.', { var: 'top' }],
    ]),
    toggleRun('Rotate a list by k', [
      ['Slicing', ['fares = [1, 2, 3, 4, 5]', 'k = 2', 'print(fares[-k:] + fares[:-k])'], 'The last k items move to the front.', ['[4, 5, 1, 2, 3]']],
      ['Palindrome check', ['word = "level"', 'print(word == word[::-1])'], 'A string that reads the same backwards.', ['True']],
    ]),
    tapbug('The count is always 1', ['counts = {}', 'for o in orders:', '    counts[o] = 1'], [[3, 'counts[o] = 1', 'counts[o] = counts.get(o, 0) + 1']], 'Add to the old count, starting at 0.'),
    check('Which reverses a string?', ['s[::-1]', 's.reverse()', 'reversed(s, 1)', 's[-1]'], 'Strings have no reverse method.', 'Slicing with a step.', { mono: true }),
    recap([
      ['↔', 'Reverse with reverse() or [::-1]'],
      ['🧮', 'Count with a dict: get(x, 0) + 1'],
      ['🔄', 'Rotate with slices'],
    ]),
  ]),

  challenge('dsa-b-2-ch', 'Module 2 Challenge', { icon: '🔢', name: 'Array Ace' }, ['Use arrays and know their costs', 'Work with strings as arrays', 'Solve classic array problems'], [
    mcq(1, 'What is the index of the first item?', ['0', '1', '-1', 'It depends'], 'Arrays count from 0.', { mono: true }),
    mcq(2, 'Reading fares[2] is…', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'Direct.', { mono: true }),
    mcq(3, 'Inserting at the front of a list of n items is…', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 'Everything shifts.', { mono: true }),
    mcq(4, 'What does name[-1] give?', ['The last character', 'The first character', 'An error', 'The length'], 'Negative counts from the end.', { mono: true }),
    mcq(5, 'Which counts items with a dict?', ['counts[x] = counts.get(x, 0) + 1', 'counts[x] += 1 (on an empty dict)', 'counts.add(x)', 'counts[x] = x'], 'Start missing keys at 0.', { mono: true }),
    swipe([
      ['x in my_list is O(n)', true, 'It may check every item.'],
      ['append is O(1) on average', true, 'At the end.'],
      ['Strings can be changed in place', false, 'They are immutable.'],
      ['[::-1] makes a reversed copy', true, 'O(n).'],
    ]),
    pairs([['fares[i]', 'O(1) read'], ['fares.append(x)', 'O(1) add'], ['fares.insert(0, x)', 'O(n) add'], ['x in fares', 'O(n) search']], 'List costs.'),
    pickCode('Which finds the largest fare?', ['max(fares)', 'fares[-1]', 'fares.sort()[0]', 'len(fares)'], 'Built in, O(n).'),
    bugTask(['fares = [40, 90, 80]', 'print(fares[len(fares)])'], [[2, 'fares[len(fares)]', 'fares[len(fares) - 1]']], 'The last index is len − 1.'),
    predictTask(['word = "noon"', 'print(word == word[::-1])'], 'What does it print?', ['True', 'False', 'noon', 'Error'], 'Reads the same backwards.'),
    arrange(['fares = [40, 90, 80]', 'total = 0', 'for f in fares:', '    total += f', 'print(total)'], 'the list, start at 0, loop, add, print', ['210']),
  ]),

  lesson('dsa-recursion', 'Recursion', 8, [
    chat(['A recursive function calls itself on a smaller piece of the problem, until it reaches a case small enough to answer directly: the base case.', 'Many DSA ideas, like binary search, merge sort and trees, are easiest to write this way.']),
    predict('Countdown', ['def countdown(n):', '    if n == 0:', '        return "Go!"', '    return str(n) + " " + countdown(n - 1)', '', 'result = countdown(3)', 'print(result)'], [
      [7, 'What is result?', ["'3 2 1 Go!'", "'Go!'", "'1 2 3 Go!'"], 'Each call adds its number, then asks the smaller problem.', { var: 'result' }],
    ]),
    toggleRun('Two classic examples', [
      ['Factorial', ['def fact(n):', '    if n <= 1:', '        return 1', '    return n * fact(n - 1)', '', 'print(fact(5))'], '5 × 4 × 3 × 2 × 1.', ['120']],
      ['Sum of a list', ['def total(xs):', '    if not xs:', '        return 0', '    return xs[0] + total(xs[1:])', '', 'print(total([40, 90, 80]))'], 'The first item plus the total of the rest.', ['210']],
    ]),
    reveal('Writing recursion', [
      ['1 · Base case', 'The smallest problem, answered directly. Without it: endless calls.'],
      ['2 · Smaller step', 'Call yourself on a smaller input.'],
      ['3 · Trust it', 'Assume the smaller call works, and build on it.'],
      ['Limit', 'Python stops after about 1000 nested calls: RecursionError.'],
    ]),
    tapbug('RecursionError: maximum recursion depth exceeded', ['def fact(n):', '    return n * fact(n - 1)'], [[2, '    return n * fact(n - 1)', '    return 1 if n <= 1 else n * fact(n - 1)']], 'Every recursive function needs a base case.'),
    check('What stops a recursive function?', ['Its base case', 'A for loop', 'The return keyword alone', 'Python, after one call'], 'The smallest problem.', 'When does it stop calling itself?'),
    recap([
      ['🪆', 'A function that calls itself on a smaller input'],
      ['🧱', 'Always a base case'],
      ['🧠', 'Trust the smaller call'],
    ]),
  ]),

  challenge('dsa-b-3-ch', 'Module 3 Challenge', { icon: '🪆', name: 'Recursion Runner' }, ['Write recursive functions', 'Find the base case', 'Trace recursive calls'], [
    mcq(1, 'What is a base case?', ['The smallest input, answered without recursion', 'The first line of a function', 'A loop', 'The biggest input'], 'It stops the calls.'),
    mcq(2, 'What happens with no base case?', ['RecursionError', 'It returns None', 'It loops once', 'Nothing'], 'Endless calls.', { mono: true }),
    mcq(3, 'fact(4) with fact(n) = n * fact(n − 1) and fact(1) = 1 is…', ['24', '10', '4', '16'], '4 × 3 × 2 × 1.', { mono: true }),
    mcq(4, 'Each recursive call should…', ['Work on a smaller problem', 'Work on the same problem', 'Use a global variable', 'Print something'], 'Getting closer to the base case.'),
    mcq(5, 'Roughly how many nested calls does Python allow by default?', ['About 1000', 'About 10', 'Unlimited', 'About a million'], 'Then RecursionError.'),
    swipe([
      ['Any loop can be written as recursion', true, 'And usually the other way round.'],
      ['Recursion is always faster than a loop', false, 'Often slower and uses more memory.'],
      ['Each call waits for the smaller call to return', true, 'Then finishes its own work.'],
      ['A base case can be skipped if the input is small', false, 'Always needed.'],
    ]),
    pairs([['Base case', 'Stop here'], ['Recursive case', 'Call on smaller'], ['RecursionError', 'Too deep'], ['fact(0)', 'Returns 1']], 'Recursion.'),
    pickCode('Which sums 1 to n recursively?', ['def s(n): return 0 if n == 0 else n + s(n - 1)', 'def s(n): return n + s(n)', 'def s(n): return s(n - 1)', 'def s(n): return n'], 'Base case, then a smaller call.'),
    bugTask(['def count(xs):', '    return 1 + count(xs[1:])'], [[2, '    return 1 + count(xs[1:])', '    return 0 if not xs else 1 + count(xs[1:])']], 'Stop at the empty list.'),
    predictTask(['def power(b, e):', '    if e == 0:', '        return 1', '    return b * power(b, e - 1)', '', 'print(power(2, 5))'], 'What does it print?', ['32', '10', '25', '7'], '2 × 2 × 2 × 2 × 2.'),
    arrange(['def fact(n):', '    if n <= 1:', '        return 1', '    return n * fact(n - 1)', 'print(fact(4))'], 'define, base case test, base answer, recursive step, call', ['24']),
  ]),

  lesson('dsa-linear', 'Linear search', 7, [
    chat(['Linear search checks each item in turn until it finds what you want, or runs out.', 'It works on any list, sorted or not, and is O(n).']),
    predict('Find a train', ['trains = [90104, 90101, 90106, 90102]', 'target = 90106', 'found = -1', 'for i in range(len(trains)):', '    if trains[i] == target:', '        found = i', '        break', 'print(found)'], [
      [8, 'What is found?', ['2', '90106', '-1'], 'Its position in the list.', { var: 'found' }],
    ]),
    run('Search for different trains', 'Change the target. What happens when it is missing?', ['trains = [90104, 90101, 90106, 90102]', 'target = {{v}}', 'checks = 0', 'for t in trains:', '    checks += 1', '    if t == target:', '        break', 'else:', '    checks = str(checks) + " (not found)"', 'print("checks:", checks)'], ['90104', '90102', '90999'], { goal: 'checks: 4 (not found)', caption: 'The worst case checks every item: O(n).' }),
    tapbug('It always says “not found”, even for 90101', ['def find(xs, target):', '    for i, x in enumerate(xs):', '        if x == target:', '            return i', '        return -1'], [[5, '        return -1', '    return -1']], 'Return -1 only after the loop has checked everything.'),
    check('When is linear search a good choice?', ['Small or unsorted lists', 'Huge sorted lists searched often', 'Never', 'Only for strings'], 'Simple and works anywhere.', 'Does it need sorting?'),
    recap([
      ['🔦', 'Check each item in turn'],
      ['📏', 'O(n): the worst case checks everything'],
      ['🧺', 'Works on unsorted data'],
    ]),
  ]),

  lesson('dsa-binary', 'Binary search', 9, [
    chat(['If the list is sorted, you can do far better: look at the middle. Too small? Throw away the left half. Too big? The right half.', 'Each step halves what’s left: a million items take about 20 checks. O(log n).']),
    predict('Halve and halve again', ['trains = [90101, 90102, 90104, 90106, 90108, 90111, 90115]', 'target = 90108', 'lo, hi = 0, len(trains) - 1', 'steps = 0', 'while lo <= hi:', '    mid = (lo + hi) // 2', '    steps += 1', '    if trains[mid] == target:', '        break', '    elif trains[mid] < target:', '        lo = mid + 1', '    else:', '        hi = mid - 1', 'print(mid, steps)'], [
      [8, 'On the first pass, what is mid?', ['3', '4', '0'], '(0 + 6) // 2 = 3.', { var: 'mid' }],
      [14, 'How many steps did it take?', ['3', '2', '7'], '90106 is too small, 90111 too big, then 90108: three looks instead of up to seven.', { var: 'steps' }],
    ]),
    run('Try bigger lists', 'How many halvings does each size need?', ['import math', 'n = {{v}}', 'print(n, "items:", math.ceil(math.log2(n + 1)), "checks at most")'], ['7', '1000', '1000000'], { goal: '1000000 items: 20 checks at most' }),
    reveal('Getting it right', [
      ['Sorted only', 'On unsorted data the halves mean nothing.'],
      ['lo <= hi', 'Keep going while there is something left.'],
      ['mid ± 1', 'Skip the middle you already checked, or it can loop forever.'],
      ['Built in', 'Python’s bisect module does it for you.'],
    ]),
    tapbug('It loops forever', ['while lo <= hi:', '    mid = (lo + hi) // 2', '    if xs[mid] < target:', '        lo = mid'], [[4, '        lo = mid', '        lo = mid + 1']], 'Move past mid, or the range never shrinks.'),
    check('Binary search on a sorted list of 1024 items needs at most about…', ['11 checks', '1024 checks', '512 checks', '100 checks'], 'log2(1024) = 10, plus one.', 'How many halvings?'),
    recap([
      ['✂', 'Look at the middle, keep the half that can hold it'],
      ['📉', 'O(log n): a million items, about 20 checks'],
      ['📚', 'The list must be sorted'],
    ]),
  ]),

  challenge('dsa-b-5-ch', 'Searching Challenge', { icon: '🔍', name: 'Search Pro' }, ['Search with linear search', 'Search sorted data with binary search', 'Compare their costs'], [
    mcq(1, 'Linear search is…', ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], 'Checks each item.', { mono: true }),
    mcq(2, 'Binary search needs the list to be…', ['Sorted', 'Short', 'Unique', 'Numbers only'], 'Halves must mean something.'),
    mcq(3, 'Binary search is…', ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], 'Halving.', { mono: true }),
    mcq(4, 'Why lo = mid + 1, not lo = mid?', ['mid was already checked; skipping it keeps the range shrinking', 'It is faster to type', 'Python needs it', 'To find duplicates'], 'Or it can loop forever.'),
    mcq(5, 'Which module does binary search in Python?', ['bisect', 'binary', 'search', 'math'], 'bisect_left and friends.', { mono: true }),
    swipe([
      ['Linear search works on unsorted lists', true, 'Any list.'],
      ['Binary search on 1,000,000 items needs about 20 checks', true, 'log2.'],
      ['Sorting first is always worth it for one search', false, 'Sorting costs O(n log n).'],
      ['in on a list is binary search', false, 'It is linear.'],
    ]),
    pairs([['Linear search', 'O(n)'], ['Binary search', 'O(log n)'], ['bisect', 'Built-in binary search'], ['mid', 'The middle index']], 'Searching.'),
    pickCode('Which finds the middle index?', ['mid = (lo + hi) // 2', 'mid = lo + hi', 'mid = len(xs) / 2.5', 'mid = hi - 1'], 'Integer division.'),
    bugTask(['for i, x in enumerate(xs):', '    if x == target: return i', '    else: return -1'], [[3, '    else: return -1', 'return -1  # after the loop']], 'Only give up after checking every item.'),
    predictTask(['xs = [3, 8, 12, 20, 31]', 'lo, hi = 0, 4', 'mid = (lo + hi) // 2', 'print(xs[mid])'], 'What does it print?', ['12', '8', '20', '3'], 'Index 2.'),
    arrange(['xs = [3, 8, 12, 20, 31]', 'target = 20', 'lo, hi = 0, len(xs) - 1', 'while lo <= hi:', '    mid = (lo + hi) // 2', '    if xs[mid] == target: break', '    lo, hi = (mid + 1, hi) if xs[mid] < target else (lo, mid - 1)', 'print(mid)'], 'the list, the target, the range, loop, middle, found?, shrink, print', ['3']),
  ]),

  lesson('dsa-sort', 'Simple sorts', 9, [
    chat(['Sorting puts items in order, and makes searching, grouping and finding duplicates easier.', 'Three simple sorts are worth knowing. They are O(n²), so fine for small lists only.']),
    predict('Bubble sort: swap neighbours', ['xs = [5, 1, 4, 2]', 'for end in range(len(xs) - 1, 0, -1):', '    for i in range(end):', '        if xs[i] > xs[i + 1]:', '            xs[i], xs[i + 1] = xs[i + 1], xs[i]', '    print(xs)'], [
      [6, 'After the first pass, what is xs?', ['[1, 4, 2, 5]', '[1, 2, 4, 5]', '[5, 1, 4, 2]'], 'The biggest bubbles to the end.', { out: true }],
    ]),
    toggleRun('Selection and insertion sort', [
      ['Selection sort', ['xs = [5, 1, 4, 2]', 'for i in range(len(xs)):', '    m = min(range(i, len(xs)), key=xs.__getitem__)', '    xs[i], xs[m] = xs[m], xs[i]', 'print(xs)'], 'Find the smallest remaining, put it next.', ['[1, 2, 4, 5]']],
      ['Insertion sort', ['xs = [5, 1, 4, 2]', 'for i in range(1, len(xs)):', '    x, j = xs[i], i - 1', '    while j >= 0 and xs[j] > x:', '        xs[j + 1] = xs[j]', '        j -= 1', '    xs[j + 1] = x', 'print(xs)'], 'Take each item and slide it into place, like sorting cards.', ['[1, 2, 4, 5]']],
    ]),
    matchUp('Which sort?', [['Swap neighbours until no swaps', 'Bubble sort'], ['Pick the smallest remaining each time', 'Selection sort'], ['Slide each item into the sorted part', 'Insertion sort']], 'All O(n²).'),
    check('Which simple sort is fast on an almost-sorted list?', ['Insertion sort', 'Selection sort', 'Bubble sort without an early stop', 'None'], 'Few items move far.', 'How far does each item slide?'),
    recap([
      ['🫧', 'Bubble: swap neighbours'],
      ['👆', 'Selection: pick the smallest'],
      ['🃏', 'Insertion: slide into place; good when nearly sorted'],
    ]),
  ]),

  lesson('dsa-b-6-2', 'Merge sort, quicksort and sorted()', 9, [
    chat(['Faster sorts split the problem. Merge sort splits the list in half, sorts each half, and merges them: O(n log n) always.', 'Quicksort picks a pivot and splits into smaller and larger: O(n log n) on average.']),
    toggleRun('Divide and conquer', [
      ['Merge sort', ['def merge_sort(xs):', '    if len(xs) <= 1:', '        return xs', '    mid = len(xs) // 2', '    a, b = merge_sort(xs[:mid]), merge_sort(xs[mid:])', '    out = []', '    while a and b:', '        out.append(a.pop(0) if a[0] <= b[0] else b.pop(0))', '    return out + a + b', '', 'print(merge_sort([5, 1, 4, 2, 3]))'], 'Split, sort halves, merge.', ['[1, 2, 3, 4, 5]']],
      ['Quicksort', ['def quick(xs):', '    if len(xs) <= 1:', '        return xs', '    pivot, rest = xs[0], xs[1:]', '    return quick([x for x in rest if x < pivot]) + [pivot] + quick([x for x in rest if x >= pivot])', '', 'print(quick([5, 1, 4, 2, 3]))'], 'Smaller, the pivot, larger.', ['[1, 2, 3, 4, 5]']],
    ]),
    run('Sorting in real code', 'In Python you use the built-in sort. Try each.', ['trains = [("Harbour", 450), ("Airport", 300), ("Hillview", 200)]', 'print({{v}})'], ['sorted(trains)', 'sorted(trains, key=lambda t: t[1])', 'sorted(trains, key=lambda t: t[1], reverse=True)'], { goal: "[('Harbour', 450), ('Airport', 300), ('Hillview', 200)]", caption: 'Python’s sort (Timsort) is O(n log n) and stable.' }),
    reveal('Sorting facts', [
      ['O(n log n)', 'The best general sorts. Merge sort always; quicksort on average.'],
      ['Stable', 'Equal items keep their order. Python’s sort is stable.'],
      ['In place', 'list.sort() changes the list; sorted() gives a new one.'],
      ['Counting sort', 'For small whole numbers, O(n + k), no comparisons.'],
    ]),
    check('Which is O(n log n) in every case?', ['Merge sort', 'Quicksort', 'Bubble sort', 'Insertion sort'], 'Quicksort can hit O(n²).', 'Which never has a bad case?'),
    recap([
      ['✂', 'Merge sort: split, sort, merge; O(n log n)'],
      ['🎯', 'Quicksort: pivot and split; fast on average'],
      ['🐍', 'In practice: sorted() and list.sort()'],
    ]),
  ]),

  challenge('dsa-b-6-ch', 'Module 6 Challenge', { icon: '🫧', name: 'Sort Master' }, ['Trace simple sorts', 'Explain merge sort and quicksort', 'Use Python’s sort well'], [
    mcq(1, 'Bubble sort is…', ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], 'Nested passes.', { mono: true }),
    mcq(2, 'Merge sort is…', ['O(n log n)', 'O(n²)', 'O(n)', 'O(1)'], 'Every case.', { mono: true }),
    mcq(3, 'What does a stable sort keep?', ['The order of equal items', 'The original list', 'Memory', 'Duplicates removed'], 'Python’s is stable.'),
    mcq(4, 'What does list.sort() return?', ['None: it sorts in place', 'A new list', 'The first item', 'True'], 'sorted() returns a new list.', { mono: true }),
    mcq(5, 'Quicksort’s worst case is…', ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], 'With bad pivots.', { mono: true }),
    swipe([
      ['Insertion sort is quick on nearly sorted data', true, 'Few moves.'],
      ['sorted() changes the original list', false, 'It returns a new one.'],
      ['Merge sort splits the list in half', true, 'Divide and conquer.'],
      ['Comparison sorts can beat O(n log n) in general', false, 'That is the limit.'],
    ]),
    pairs([['Bubble', 'Swap neighbours'], ['Selection', 'Pick the smallest'], ['Merge', 'Split and merge'], ['Quick', 'Pivot']], 'Sorts.'),
    pickCode('Which sorts trains by fare, dearest first?', ['sorted(trains, key=lambda t: t[1], reverse=True)', 'sorted(trains).reverse()', 'trains.sort(t[1])', 'sorted(trains, reverse=fare)'], 'key and reverse.'),
    bugTask(['fares = fares.sort()', 'print(fares[0])'], [[1, 'fares = fares.sort()', 'fares.sort()']], 'sort() returns None; don’t assign it.'),
    predictTask(['xs = [3, 1, 2]', 'ys = sorted(xs)', 'print(xs, ys)'], 'What does it print?', ['[3, 1, 2] [1, 2, 3]', '[1, 2, 3] [1, 2, 3]', '[3, 1, 2] None', '[1, 2, 3] None'], 'sorted() leaves xs alone.'),
    arrange(['xs = [4, 2, 3]', 'for i in range(1, len(xs)):', '    j = i', '    while j > 0 and xs[j - 1] > xs[j]:', '        xs[j - 1], xs[j] = xs[j], xs[j - 1]', '        j -= 1', 'print(xs)'], 'the list, each item, start, while bigger on the left, swap, step left, print', ['[2, 3, 4]']),
  ]),
];
