// DSA · Final project: a mock coding round (keeps the old project id, dsa-project). The challenge tasks, then the
// three tested problems from before, in the Python code editor.
import type { EditorStep, Lesson } from '../../types';
import { DSA_PROJECT as OLD } from '../dsaFoundations';
import { arrange, bugTask, challenge, mcq, pairs, pickCode, predictTask, swipe } from './kit';

const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s, i, all) => ({ ...s, kicker: `FINAL PROJECT · PROBLEM ${i + 1} OF ${all.length}` }));

export const DSA_PROJECT: Lesson = challenge('dsa-project', 'Final: a mock coding round', { icon: '🏆', name: 'DSA Pro' }, ['Pick the right data structure for a problem', 'Solve problems in O(n) with hashing and windows', 'Explain your solution like in an interview'], [
  mcq(1, 'First passenger whose name appears once: which tool?', ['A dict of counts', 'Binary search', 'A stack', 'Bubble sort'], 'Count, then scan.'),
  mcq(2, 'Longest run of trips under a budget: which pattern?', ['Sliding window', 'Two nested loops', 'Recursion', 'A queue'], 'A range that grows and shrinks.'),
  mcq(3, 'Checking brackets in a booking code: which structure?', ['A stack', 'A queue', 'A set', 'A heap'], 'Latest opener first.'),
  mcq(4, 'In an interview, what should you say first?', ['Your plan and its Big-O', 'Nothing; just type', 'That you have seen it before', 'The answer only'], 'Explain, then code.'),
  mcq(5, 'Your first idea is O(n²). What next?', ['Look for a hash table, two pointers or a window to reach O(n)', 'Submit it', 'Sort twice', 'Add more loops'], 'Improve it.'),
  swipe([
    ['Testing edge cases (empty input, one item) matters', true, 'Interviewers check them.'],
    ['Big-O doesn’t matter if the code works', false, 'It is usually asked.'],
    ['A dict can count items in one pass', true, 'O(n).'],
    ['A stack is FIFO', false, 'LIFO.'],
  ]),
  pairs([['Counting', 'dict'], ['Consecutive range', 'Sliding window'], ['Matching pairs', 'Stack'], ['Sorted pair sum', 'Two pointers']], 'Pick the tool.'),
  pickCode('Which finds the first name that appears once?', ['c = Counter(names); next((n for n in names if c[n] == 1), None)', 'names[0]', 'sorted(names)[0]', 'set(names).pop()'], 'Count first, then scan in order.'),
  bugTask(['def first_unique(names):', '    for n in names:', '        if names.count(n) == 1:', '            return n'], [[3, 'names.count(n) == 1', 'counts[n] == 1  # counts = Counter(names), built once']], 'count() inside the loop makes it O(n²). Count once.'),
  predictTask(['from collections import Counter', 'names = ["Ava", "Reed", "Ava", "Zoey"]', 'c = Counter(names)', 'print(next(n for n in names if c[n] == 1))'], 'What does it print?', ['Reed', 'Ava', 'Zoey', 'None'], 'The first with a count of 1.'),
  arrange(['from collections import Counter', 'names = ["Ava", "Reed", "Ava"]', 'c = Counter(names)', 'print([n for n in names if c[n] == 1])'], 'import, the names, count them, keep the ones seen once', ["['Reed']"]),
  ...steps,
], 'project');
