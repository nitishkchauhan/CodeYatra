// Interview practice: questions asked in Indian campus and fresher interviews, each with a model
// answer, the reasoning, common follow-ups and the lessons that teach it. Code is checked by tests.

export type InterviewTopic = 'python' | 'dsa' | 'sql' | 'oop' | 'web';
export type InterviewLevel = 'Beginner' | 'Intermediate';

export type InterviewQuestion = {
  id: string;
  topic: InterviewTopic;
  level: InterviewLevel;
  question: string;
  /** What a good answer says, in two or three sentences. */
  answer: string;
  /** Why it works that way, or how to explain it well. */
  why: string;
  code?: { lang: 'python' | 'javascript' | 'sql' | 'css'; lines: string[]; output?: string[] };
  followUps: string[];
  /** Lessons that teach this, so a missed answer leads straight to revision. */
  lessons: string[];
};

export const TOPIC_NAME: Record<InterviewTopic, string> = { python: 'Python', dsa: 'DSA', sql: 'SQL', oop: 'OOP', web: 'Web' };

export const INTERVIEW: InterviewQuestion[] = [
  // Python
  {
    id: 'py-list-tuple',
    topic: 'python',
    level: 'Beginner',
    question: 'What is the difference between a list and a tuple?',
    answer: 'A list can be changed after it is made (mutable): you can append, remove or replace items. A tuple cannot be changed (immutable). Use a tuple for a fixed record like (x, y), and a list for a collection that grows.',
    why: 'Because a tuple never changes, it can be used as a dictionary key or stored in a set (if everything inside it can be too). Lists cannot.',
    code: { lang: 'python', lines: ['point = (3, 4)', 'marks = [70, 85]', 'marks.append(90)', 'print(len(point), marks)'], output: ['2 [70, 85, 90]'] },
    followUps: ['Can a tuple contain a list? Can that list change?', 'Why can a tuple be a dictionary key but a list cannot?'],
    lessons: ['p-loop-2'],
  },
  {
    id: 'py-is-eq',
    topic: 'python',
    level: 'Intermediate',
    question: 'What is the difference between == and is?',
    answer: '== checks whether two values are equal. is checks whether two names point to the very same object in memory. Use == for values, and is only for None (x is None).',
    why: 'Two separate lists can hold the same values, so == is True, but they are different objects, so is is False.',
    code: { lang: 'python', lines: ['a = [1, 2]', 'b = [1, 2]', 'print(a == b, a is b)'], output: ['True False'] },
    followUps: ['Why do we write x is None instead of x == None?', 'What does id() return?'],
    lessons: ['p-if-1'],
  },
  {
    id: 'py-mutable-default',
    topic: 'python',
    level: 'Intermediate',
    question: 'Why is def add(item, items=[]) a bug?',
    answer: 'The default list is created once, when the function is defined, not on every call. So every call that uses the default shares the same list, and items pile up between calls. Use items=None and create a new list inside.',
    why: 'Default values are worked out once. A mutable default (list, dict) keeps changes from earlier calls.',
    code: {
      lang: 'python',
      lines: ['def add(item, items=None):', '    if items is None:', '        items = []', '    items.append(item)', '    return items', '', 'print(add(1), add(2))'],
      output: ['[1] [2]'],
    },
    followUps: ['What would add(1), add(2) print with items=[] as the default?', 'Is a default of items=() safe? Why?'],
    lessons: ['p-fn-1'],
  },
  {
    id: 'py-return-print',
    topic: 'python',
    level: 'Beginner',
    question: 'What is the difference between print and return in a function?',
    answer: 'print shows a value on the screen and the function carries on. return ends the function and hands a value back to the caller, so it can be stored or used. A function with no return gives back None.',
    why: 'Interviewers ask this to check you understand that functions produce values, not just output.',
    code: { lang: 'python', lines: ['def square(n):', '    return n * n', '', 'total = square(3) + square(4)', 'print(total)'], output: ['25'] },
    followUps: ['What does a function return if it has no return statement?', 'Can a function return two values?'],
    lessons: ['p-fn-1'],
  },
  {
    id: 'py-keyerror',
    topic: 'python',
    level: 'Beginner',
    question: 'How do you avoid a KeyError when reading from a dictionary?',
    answer: 'Check first with if key in d, or use d.get(key, default), which returns the default instead of raising an error. For counting, d.get(k, 0) + 1 is the usual pattern.',
    why: 'd[key] raises KeyError for a missing key. get() makes the missing case explicit.',
    code: { lang: 'python', lines: ['stock = {"tea": 12}', 'print(stock.get("milk", 0), "tea" in stock)'], output: ['0 True'] },
    followUps: ['What does collections.Counter do?', 'When would you want the KeyError instead?'],
    lessons: ['p-dict-1'],
  },
  {
    id: 'py-finally',
    topic: 'python',
    level: 'Intermediate',
    question: 'What does finally do in try / except / finally?',
    answer: 'The finally block always runs: after try succeeds, after an except handles an error, and even when an error is not caught. It is for clean-up, like closing a file or a connection.',
    why: 'Clean-up must happen whether or not something went wrong. with open(...) does the same for files automatically.',
    code: { lang: 'python', lines: ['try:', '    x = 10 / 0', 'except ZeroDivisionError:', '    print("caught")', 'finally:', '    print("always")'], output: ['caught', 'always'] },
    followUps: ['What is the else block in try/except for?', 'Why is a bare except: a bad idea?'],
    lessons: ['p-err-1'],
  },
  {
    id: 'py-self',
    topic: 'python',
    level: 'Beginner',
    question: 'What is self in a Python class?',
    answer: 'self is the object the method was called on. When you write t.book(2), Python passes t in as self automatically, so the method can read and change that object’s own data, like self.seats.',
    why: 'It is how one class serves many objects: the same method code works on whichever object called it.',
    followUps: ['What happens if you forget self in a method’s parameters?', 'What is __init__ for?'],
    lessons: ['p-class-1'],
  },
  {
    id: 'py-for-while',
    topic: 'python',
    level: 'Beginner',
    question: 'When would you use a while loop instead of a for loop?',
    answer: 'Use for when you know what to go through: a range of numbers or the items of a list. Use while when you repeat until a condition changes and don’t know how many rounds that takes, like waiting for valid input.',
    why: 'Picking the right loop makes the stopping rule obvious to whoever reads the code.',
    followUps: ['How do you stop a loop early?', 'What causes an infinite loop?'],
    lessons: ['p-while-1', 'p-loop-1'],
  },
  {
    id: 'py-floor-negative',
    topic: 'python',
    level: 'Intermediate',
    question: 'What do -7 // 2 and -7 % 2 give in Python?',
    answer: '-7 // 2 is -4 and -7 % 2 is 1. Python’s // always rounds down (towards minus infinity), not towards zero, and % follows so that (a // b) * b + a % b == a.',
    why: 'This is a classic output question because C and Java give -3 and -1 instead.',
    code: { lang: 'python', lines: ['print(-7 // 2, -7 % 2)'], output: ['-4 1'] },
    followUps: ['What does int(-3.5) give?', 'How would you divide rounding towards zero?'],
    lessons: ['p-num-1'],
  },
  {
    id: 'py-copy-list',
    topic: 'python',
    level: 'Beginner',
    question: 'If b = a for a list, and you change b, what happens to a?',
    answer: 'a changes too. b = a does not copy the list; both names now point to the same list. To get a separate list, use b = a.copy() or b = list(a).',
    why: 'Assignment copies the reference, not the data. This explains many surprising bugs.',
    code: { lang: 'python', lines: ['a = [1, 2]', 'b = a', 'b.append(3)', 'c = a.copy()', 'c.append(4)', 'print(a)'], output: ['[1, 2, 3]'] },
    followUps: ['What is the difference between a shallow and a deep copy?', 'Does the same happen with numbers or strings?'],
    lessons: ['p-loop-2'],
  },
  {
    id: 'py-comprehension',
    topic: 'python',
    level: 'Beginner',
    question: 'Write a list comprehension for the squares of the even numbers from 1 to 10.',
    answer: '[n * n for n in range(1, 11) if n % 2 == 0] gives [4, 16, 36, 64, 100]. The part before for is what goes into the list; the if at the end filters.',
    why: 'It is shorter than a loop with append, and interviewers like to see you know when it helps readability.',
    code: { lang: 'python', lines: ['print([n * n for n in range(1, 11) if n % 2 == 0])'], output: ['[4, 16, 36, 64, 100]'] },
    followUps: ['How would you write a dictionary comprehension?', 'When is a normal loop clearer?'],
    lessons: ['p-comp-1'],
  },
  {
    id: 'py-with-open',
    topic: 'python',
    level: 'Beginner',
    question: 'Why do we use with open(...) as f to work with files?',
    answer: 'with closes the file automatically when the block ends, even if an error happens inside it. Without it you must remember to call f.close(), and an error could skip that.',
    why: 'Open files hold system resources, and unflushed writes can be lost if a file is never closed.',
    followUps: ['What is the difference between modes "w" and "a"?', 'How do you read a file line by line?'],
    lessons: ['p-file-1'],
  },

  // DSA
  {
    id: 'dsa-search',
    topic: 'dsa',
    level: 'Beginner',
    question: 'Compare linear search and binary search.',
    answer: 'Linear search checks items one by one: O(n), and works on any list. Binary search halves the range each step: O(log n), but the list must be sorted.',
    why: 'For a million sorted items, binary search needs about 20 checks; linear search may need a million.',
    followUps: ['Write binary search without recursion.', 'Is sorting first and then binary searching worth it for a single search?'],
    lessons: ['dsa-linear', 'dsa-binary'],
  },
  {
    id: 'dsa-reverse',
    topic: 'dsa',
    level: 'Beginner',
    question: 'Reverse a string in Python. Can you do it without slicing?',
    answer: 's[::-1] is the shortest way. Without slicing, build it by putting each character in front: result = ch + result for every ch in s, or "".join(reversed(s)).',
    why: 'They want to see you can do it by hand, not just know the shortcut.',
    code: { lang: 'python', lines: ['s = "yatra"', 'result = ""', 'for ch in s:', '    result = ch + result', 'print(result, s[::-1])'], output: ['artay artay'] },
    followUps: ['How do you check if a word is a palindrome?', 'What is the time complexity of building a string with + in a loop?'],
    lessons: ['pl-reverse'],
  },
  {
    id: 'dsa-duplicates',
    topic: 'dsa',
    level: 'Intermediate',
    question: 'How do you check whether a list has duplicates in O(n) time?',
    answer: 'Keep a set of values seen so far. For each item, if it is already in the set you found a duplicate; otherwise add it. Set lookups are O(1) on average, so the whole thing is O(n). A one-line version is len(set(a)) != len(a).',
    why: 'The naive way compares every pair, which is O(n²).',
    code: { lang: 'python', lines: ['def has_dup(a):', '    seen = set()', '    for x in a:', '        if x in seen:', '            return True', '        seen.add(x)', '    return False', '', 'print(has_dup([3, 1, 3]), has_dup([1, 2]))'], output: ['True False'] },
    followUps: ['What if you can’t use extra memory?', 'How would you return the first repeated item?'],
    lessons: ['dsa-hash'],
  },
  {
    id: 'dsa-stack-queue',
    topic: 'dsa',
    level: 'Beginner',
    question: 'What is the difference between a stack and a queue?',
    answer: 'A stack is last in, first out (LIFO), like a pile of plates: the undo button uses one. A queue is first in, first out (FIFO), like a ticket line: print jobs use one. In Python, a list works as a stack (append, pop) and collections.deque as a queue (append, popleft).',
    why: 'list.pop(0) is O(n) because every item shifts, which is why deque is used for queues.',
    followUps: ['How would you check balanced brackets?', 'How do you build a queue from two stacks?'],
    lessons: ['dsa-stack', 'dsa-queue'],
  },
  {
    id: 'dsa-base-case',
    topic: 'dsa',
    level: 'Intermediate',
    question: 'What happens if a recursive function has no base case?',
    answer: 'It keeps calling itself until Python stops it with a RecursionError (maximum recursion depth exceeded). The base case is the input small enough to answer directly, and every call must move towards it.',
    why: 'Each call uses stack memory, so the depth is limited (about 1,000 by default in Python).',
    code: { lang: 'python', lines: ['def fact(n):', '    if n <= 1:', '        return 1', '    return n * fact(n - 1)', '', 'print(fact(5))'], output: ['120'] },
    followUps: ['Write the same thing with a loop.', 'What is memoisation?'],
    lessons: ['dsa-recursion'],
  },

  // SQL
  {
    id: 'sql-where-having',
    topic: 'sql',
    level: 'Intermediate',
    question: 'What is the difference between WHERE and HAVING?',
    answer: 'WHERE filters rows before they are grouped. HAVING filters groups after GROUP BY, so it can use aggregates like COUNT(*) or SUM(fare).',
    why: 'The database filters rows, then groups, then filters groups. WHERE cannot see an aggregate because it runs before grouping.',
    code: { lang: 'sql', lines: ['SELECT city, COUNT(*) AS trains', 'FROM stations', 'WHERE zone = \'North\'', 'GROUP BY city', 'HAVING COUNT(*) > 2;'] },
    followUps: ['Can you use HAVING without GROUP BY?', 'In what order does a SELECT run?'],
    lessons: ['sql-group'],
  },
  {
    id: 'sql-joins',
    topic: 'sql',
    level: 'Intermediate',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    answer: 'INNER JOIN keeps only rows that match in both tables. LEFT JOIN keeps every row from the left table, and fills the right side with NULL when there is no match.',
    why: 'Use LEFT JOIN to find things with no match, e.g. passengers with no booking: LEFT JOIN, then WHERE booking.id IS NULL.',
    followUps: ['What does a FULL OUTER JOIN return?', 'Why can a join return more rows than either table?'],
    lessons: ['sql-join'],
  },
  {
    id: 'sql-keys',
    topic: 'sql',
    level: 'Beginner',
    question: 'What are a primary key and a foreign key?',
    answer: 'A primary key uniquely identifies each row in a table and cannot be NULL. A foreign key is a column that refers to the primary key of another table, which links the two tables and stops rows pointing at something that does not exist.',
    why: 'Keys are how relational databases keep data consistent across tables.',
    followUps: ['Can a table have two primary keys?', 'What is a composite key?'],
    lessons: ['sql-design'],
  },
  {
    id: 'sql-count',
    topic: 'sql',
    level: 'Intermediate',
    question: 'What is the difference between COUNT(*) and COUNT(column)?',
    answer: 'COUNT(*) counts every row. COUNT(column) counts only rows where that column is not NULL.',
    why: 'Mixing them up gives wrong totals whenever a column has missing values.',
    followUps: ['What does COUNT(DISTINCT column) do?', 'How does AVG treat NULL values?'],
    lessons: ['sql-agg'],
  },

  // OOP
  {
    id: 'oop-pillars',
    topic: 'oop',
    level: 'Beginner',
    question: 'Explain the four pillars of object-oriented programming.',
    answer: 'Encapsulation: keep data and the methods that change it together, hiding the details. Inheritance: a class reuses and extends another class. Polymorphism: different classes answer the same method call in their own way. Abstraction: show only what matters and hide the rest.',
    why: 'Give one real example for each; interviewers care more about examples than definitions.',
    followUps: ['Give an example of polymorphism in Python.', 'What is the difference between overloading and overriding?'],
    lessons: ['pl-oops', 'p-class-1'],
  },
  {
    id: 'oop-class-object',
    topic: 'oop',
    level: 'Beginner',
    question: 'What is the difference between a class and an object?',
    answer: 'A class is the blueprint: it describes what data and actions something has. An object is one thing made from that blueprint, with its own values. Train is a class; the Rajdhani with 400 seats is an object.',
    why: 'Many objects can come from one class, and each keeps its own data.',
    followUps: ['What is a constructor?', 'What is the difference between a class attribute and an instance attribute?'],
    lessons: ['p-class-1'],
  },

  // Web
  {
    id: 'web-let-const',
    topic: 'web',
    level: 'Beginner',
    question: 'What is the difference between var, let and const in JavaScript?',
    answer: 'let and const are block-scoped: they exist only inside the { } where they are declared. const cannot be reassigned; let can. var is function-scoped and hoisted, which causes surprises, so modern code uses const by default and let when a value changes.',
    why: 'const stops the name being reassigned, but a const object or array can still have its contents changed.',
    code: { lang: 'javascript', lines: ['const seats = [1, 2];', 'seats.push(3);', 'console.log(seats.length);'], output: ['3'] },
    followUps: ['What is hoisting?', 'Can you change a property of a const object?'],
    lessons: ['j-var-1'],
  },
  {
    id: 'web-equality',
    topic: 'web',
    level: 'Beginner',
    question: 'What is the difference between == and === in JavaScript?',
    answer: '=== checks value and type with no conversion. == converts types first, so 0 == "0" is true but 0 === "0" is false. Use === almost always.',
    why: 'Type conversion with == has confusing rules that cause bugs.',
    code: { lang: 'javascript', lines: ['console.log(0 == "0", 0 === "0");'], output: ['true false'] },
    followUps: ['What is null == undefined?', 'What does typeof null return?'],
    lessons: ['j-cond-1'],
  },
  {
    id: 'web-box-model',
    topic: 'web',
    level: 'Beginner',
    question: 'Explain the CSS box model.',
    answer: 'Every element is a box made of content, then padding (space inside the border), then the border, then margin (space outside it). With box-sizing: border-box, width includes padding and border, which makes layouts easier to reason about.',
    why: 'Most “why is my box too wide?” bugs come from padding being added to the width.',
    code: { lang: 'css', lines: ['.card {', '  box-sizing: border-box;', '  width: 200px;', '  padding: 16px;', '  border: 2px solid #4B3FD8;', '}'] },
    followUps: ['What is margin collapsing?', 'Difference between display: block and inline?'],
    lessons: ['c-box-1'],
  },
];

export type Rating = 'knew' | 'partly' | 'missed';

/**
 * Picks a practice session: questions never rated first, then ones rated "missed" or "partly",
 * then the rest, so repeated sessions spend time where it is needed.
 */
export function interviewSession(pool: InterviewQuestion[], ratings: Record<string, { rating: Rating }>, size = 8): InterviewQuestion[] {
  const rank = (q: InterviewQuestion) => {
    const r = ratings[q.id]?.rating;
    return r === undefined ? 0 : r === 'missed' ? 1 : r === 'partly' ? 2 : 3;
  };
  return [...pool].sort((a, b) => rank(a) - rank(b)).slice(0, size);
}

/** Topics where most answered questions were rated below "knew", weakest first. */
export function weakTopics(ratings: Record<string, { rating: Rating }>): { topic: InterviewTopic; shaky: number; answered: number }[] {
  const rows = new Map<InterviewTopic, { shaky: number; answered: number }>();
  for (const q of INTERVIEW) {
    const r = ratings[q.id]?.rating;
    if (!r) continue;
    const row = rows.get(q.topic) ?? { shaky: 0, answered: 0 };
    row.answered++;
    if (r !== 'knew') row.shaky++;
    rows.set(q.topic, row);
  }
  return [...rows]
    .map(([topic, v]) => ({ topic, ...v }))
    .filter((t) => t.shaky > 0)
    .sort((a, b) => b.shaky / b.answered - a.shaky / a.answered);
}
