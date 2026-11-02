// Logic Foundations · Modules 6–10 (Intermediate): conditions, while loops, nested loops, functions and debugging,
// all in real Python. Each module’s lesson keeps its old id; its Challenge ends with the old tested program.
import type { Lesson } from '../../types';
import { LOGIC_FOUNDATIONS as OLD } from '../logicFoundations';
import { bugTask, chat, check, kit, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, task, toggleRun, truth } from '../placementV5/kit';

const { lesson, challenge } = kit('python');
const CODE = 'TASK 6 OF 6 · YOUR PROGRAM';

export const F_M6: Lesson[] = [
  lesson('f-if-1', 'Conditions: making decisions', 7, [
    chat(['Programs make choices with if: “if there is a wall, turn; otherwise move.”', 'A condition is a question with a yes/no answer: True or False.']),
    toggleRun('if, else and elif', [
      ['if / else', ['gems = 4', 'if gems >= 5:', '    print("Open the door")', 'else:', '    print("Find more gems")'], 'One of the two branches runs.', ['Find more gems']],
      ['elif', ['age = 12', 'if age < 5:', '    print("Free ticket")', 'elif age < 18:', '    print("Child ticket")', 'else:', '    print("Adult ticket")'], 'Checked from the top; the first True wins.', ['Child ticket']],
      ['and / or', ['sunny, weekend = True, False', 'print(sunny and weekend, sunny or weekend, not sunny)'], 'and: both; or: at least one; not: the opposite.', ['False True False']],
    ]),
    run('Open the door', 'Change the number of gems until the door opens.', ['gems = {{v}}', 'if gems >= 5:', '    print("Open the door")', 'else:', '    print("Find more gems")'], ['3', '4', '5'], { goal: 'Open the door' }),
    predict('Which branch?', ['score = 70', 'if score >= 80:', '    grade = "A"', 'elif score >= 60:', '    grade = "B"', 'else:', '    grade = "C"', 'print(grade)'], [
      [8, 'What is printed?', ['B', 'A', 'C'], '70 is not ≥ 80, but is ≥ 60.', { out: true }],
    ]),
    tapbug('SyntaxError: invalid syntax', ['if gems = 5:', '    print("Five!")'], [[1, 'gems = 5', 'gems == 5']], '== asks “is it equal?”; = stores a value.'),
    check('Which symbol means “is not equal to”?', ['!=', '=/=', '<>', '=!'], 'Python’s not-equal.', 'An exclamation mark.', { mono: true }),
    recap([
      ['🔀', 'if / elif / else picks one branch'],
      ['⚖', '== != < > <= >= give True or False'],
      ['🔗', 'and, or, not combine conditions'],
    ]),
  ]),

  challenge('f-i-6-ch', 'Module 6 Challenge', { icon: '🔀', name: 'Decision Maker' }, ['Write if-else and elif', 'Compare values', 'Combine conditions'], [
    mcq(1, 'What does 7 > 3 give?', ['True', 'False', '7', '4'], 'A yes/no answer.', { mono: true }),
    mcq(2, 'Which checks “equal to”?', ['==', '=', '===', ':='], '= stores.', { mono: true }),
    mcq(3, 'True and False is…', ['False', 'True', 'None', 'An error'], 'Both must be True.', { mono: true }),
    mcq(4, 'In an if-elif-else, how many branches run?', ['One', 'All that are True', 'None', 'Two'], 'The first True.'),
    mcq(5, 'What ends an if line?', ['A colon :', 'A semicolon ;', 'A full stop', 'Nothing'], 'Then indent.', { mono: true }),
    swipe([
      ['else needs a condition', false, 'It catches everything else.'],
      ['not True is False', true, 'The opposite.'],
      ['elif can be used many times', true, 'As many as you need.'],
      ['5 <= 5 is True', true, 'Less than or equal.'],
    ]),
    pairs([['==', 'Equal'], ['!=', 'Not equal'], ['and', 'Both'], ['or', 'Either']], 'Condition words.'),
    pickCode('Which prints “Teen” for ages 13 to 19?', ['if 13 <= age <= 19: print("Teen")', 'if age = 13 to 19: print("Teen")', 'if age > 13 or age < 19: print("Teen")', 'if age == 13: print("Teen")'], 'Between, both included.'),
    bugTask(['temp = 30', 'if temp > 25', '    print("Hot")', 'else', '    print("Cool")'], [[2, 'temp > 25', 'temp > 25:'], [4, 'else', 'else:']], 'if and else lines end with a colon.'),
    predictTask(['x = 15', 'if x % 3 == 0 and x % 5 == 0:', '    print("Both")', 'elif x % 3 == 0:', '    print("Three")', 'else:', '    print("Neither")'], 'What does it print?', ['Both', 'Three', 'Neither', 'Nothing'], '15 divides by 3 and by 5.'),
    task(OLD, 'f-if-1', CODE),
  ]),

  lesson('f-while-1', 'While loops: repeat until done', 6, [
    chat(['A for loop repeats a set number of times. A while loop repeats as long as a condition is True: “keep walking while there is no wall”.']),
    toggleRun('while', [
      ['Count down', ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'], 'Checks, runs, checks again… until n is 0.', ['3', '2', '1', 'Go!']],
      ['Halve until one', ['n, steps = 40, 0', 'while n > 1:', '    n = n // 2', '    steps = steps + 1', 'print(steps, "halvings")'], '40, 20, 10, 5, 2, 1.', ['5 halvings']],
      ['Until enough', ['saved, weeks = 0, 0', 'while saved < 100:', '    saved = saved + 30', '    weeks = weeks + 1', 'print(weeks, "weeks,", saved, "saved")'], 'We don’t know the number of rounds in advance.', ['4 weeks, 120 saved']],
    ]),
    run('Save enough', 'Change the weekly saving so it takes exactly 5 weeks to reach 100.', ['saved, weeks = 0, 0', 'while saved < 100:', '    saved = saved + {{v}}', '    weeks = weeks + 1', 'print(weeks, "weeks")'], ['30', '25', '20'], { goal: '5 weeks' }),
    predict('Trace it', ['n = 1', 'while n < 20:', '    n = n * 3', 'print(n)'], [
      [4, 'What is printed?', ['27', '9', '20'], '1, 3, 9, 27: stops when n is no longer below 20.', { out: true }],
    ]),
    tapbug('The program never stops', ['n = 5', 'while n > 0:', '    print(n)'], [[3, '    print(n)', '    print(n); n = n - 1']], 'Change n inside the loop, or the condition stays True forever.'),
    check('When does a while loop stop?', ['When its condition becomes False', 'After 10 rounds', 'Never', 'When it prints'], 'Checked each round.', 'The condition.'),
    recap([
      ['🔁', 'while repeats while a condition is True'],
      ['🎯', 'Use it when you don’t know how many rounds'],
      ['♾', 'Change something, or it loops forever'],
    ]),
  ]),

  challenge('f-i-7-ch', 'Module 7 Challenge', { icon: '⏳', name: 'Loop Watcher' }, ['Write while loops', 'Stop loops at the right time', 'Choose for or while'], [
    mcq(1, 'Which loop suits “keep asking until the answer is right”?', ['while', 'for with range', 'Neither', 'if'], 'Unknown number of rounds.', { mono: true }),
    mcq(2, 'n = 0; while n < 3: n += 1. How many rounds?', ['3', '2', '4', 'Forever'], '0→1→2→3.', { mono: true }),
    mcq(3, 'What causes an endless loop?', ['A condition that never becomes False', 'A print', 'A for loop', 'A colon'], 'Change the variable.'),
    mcq(4, 'Which stops a loop at once?', ['break', 'stop', 'end', 'exit loop'], 'Leave now.', { mono: true }),
    mcq(5, 'while False: print("hi") prints…', ['Nothing', 'hi', 'hi forever', 'An error'], 'The condition is False at the start.', { mono: true }),
    swipe([
      ['A while loop checks before each round', true, 'Then runs.'],
      ['A while loop always runs at least once', false, 'Not if the test is False at first.'],
      ['for is best when you know the count', true, 'range(n).'],
      ['break leaves the loop', true, 'Straight away.'],
    ]),
    pairs([['while', 'Until False'], ['for', 'Known count'], ['break', 'Leave'], ['n = n - 1', 'Move towards the end']], 'Loop words.'),
    pickCode('Which counts down 5, 4, 3, 2, 1?', ['n = 5\nwhile n > 0:\n    print(n)\n    n -= 1', 'n = 5\nwhile n > 0:\n    print(n)', 'n = 5\nwhile n < 0:\n    print(n)\n    n -= 1', 'while 5: print(n)'], 'Check, print, step down.'),
    bugTask(['n = 10', 'while n > 0:', '    n = n + 1'], [[3, 'n = n + 1', 'n = n - 1']], 'Move towards the end, not away from it.'),
    predictTask(['total, n = 0, 1', 'while total < 10:', '    total = total + n', '    n = n + 1', 'print(n)'], 'What does it print?', ['5', '4', '10', '6'], 'Totals 1, 3, 6, 10: four rounds, so n reaches 5.'),
    task(OLD, 'f-while-1', CODE),
  ]),

  lesson('f-nest-1', 'Loops inside loops', 7, [
    chat(['A loop inside another loop runs the inner loop completely for each round of the outer one. Rows and columns, days and hours, boards and squares.']),
    toggleRun('Nested loops', [
      ['Grid', ['for row in range(1, 3):', '    for col in range(1, 4):', '        print(row, col)'], 'For each row, every column.', ['1 1', '1 2', '1 3', '2 1', '2 2', '2 3']],
      ['Rows of stars', ['for row in range(1, 4):', '    line = ""', '    for col in range(row):', '        line = line + "*"', '    print(line)'], 'Row 1 has 1 star, row 2 has 2…', ['*', '**', '***']],
      ['Times table', ['for a in range(1, 4):', '    print(" ".join(str(a * b) for b in range(1, 4)))'], 'Each row multiplies by 1, 2, 3.', ['1 2 3', '2 4 6', '3 6 9']],
    ]),
    predict('Count the rounds', ['count = 0', 'for i in range(3):', '    for j in range(4):', '        count = count + 1', 'print(count)'], [
      [5, 'What is printed?', ['12', '7', '4'], '3 rounds × 4 rounds.', { out: true }],
    ]),
    tapbug('Every row prints on one line', ['for row in range(3):', '    for col in range(3):', '        print("#", end="")'], [[3, 'print("#", end="")', 'print("#", end=""); print() if col == 2 else None']], 'End each row with a new line.'),
    check('An outer loop runs 5 times and an inner loop 2 times. How many inner rounds in total?', ['10', '7', '5', '2'], '5 × 2.', 'Multiply.', { mono: true }),
    truth([
      ['The inner loop finishes before the outer loop moves on', true, 'Every time.'],
      ['Nested loops always need different variable names', true, 'Or they clash.'],
      ['A nested loop runs outer + inner times', false, 'Outer × inner.'],
    ]),
    recap([
      ['🔁', 'The inner loop runs fully for each outer round'],
      ['🔢', 'Total rounds = outer × inner'],
      ['🧱', 'Rows and columns, boards and grids'],
    ]),
  ]),

  challenge('f-i-8-ch', 'Module 8 Challenge', { icon: '🧱', name: 'Grid Builder' }, ['Write nested loops', 'Count total rounds', 'Print grids and patterns'], [
    mcq(1, 'Outer loop 4 times, inner 3 times: inner rounds?', ['12', '7', '4', '3'], '4 × 3.', { mono: true }),
    mcq(2, 'Which loop finishes first?', ['The inner loop, each time', 'The outer loop', 'They take turns', 'Neither'], 'Inner first.'),
    mcq(3, 'What is a nested loop good for?', ['Grids: rows and columns', 'One list', 'One decision', 'Stopping a program'], 'Two directions.'),
    mcq(4, 'print("*", end="") does what?', ['Prints * without a new line', 'Prints nothing', 'Ends the program', 'Prints a new line only'], 'end="".', { mono: true }),
    mcq(5, 'A 8 × 8 chessboard needs how many squares printed?', ['64', '16', '8', '88'], '8 × 8.', { mono: true }),
    swipe([
      ['The inner loop can use the outer loop’s variable', true, 'range(row).'],
      ['Nested loops can be three deep', true, 'Any depth.'],
      ['The outer loop variable resets each inner round', false, 'The inner one does.'],
      ['print() alone prints an empty line', true, 'A new line.'],
    ]),
    pairs([['Outer loop', 'Rows'], ['Inner loop', 'Columns'], ['end=""', 'Same line'], ['print()', 'New line']], 'Nested loops.'),
    pickCode('Which prints a 2 × 2 block of #?', ['for r in range(2): print("#" * 2)', 'for r in range(2): print("#")', 'print("#" * 4)', 'for r in range(4): print("##")'], 'Two rows of two.'),
    bugTask(['for i in range(3):', 'for j in range(3):', '    print(i, j)'], [[2, 'for j in range(3):', '    for j in range(3):'], [3, '    print(i, j)', '        print(i, j)']], 'The inner loop sits inside the outer one: indent it.'),
    predictTask(['total = 0', 'for i in range(1, 3):', '    for j in range(1, 3):', '        total = total + i * j', 'print(total)'], 'What does it print?', ['9', '4', '6', '8'], '1 + 2 + 2 + 4.'),
    task(OLD, 'f-nest-1', CODE),
  ]),

  lesson('f-fn-1', 'Functions: make your own block', 7, [
    chat(['A function is your own block: a name for a group of steps. Define it once with def, then use it as often as you like.', 'Give it inputs (parameters), and it can give back an answer with return.']),
    toggleRun('Functions', [
      ['Define and call', ['def cheer():', '    print("Well done, Yatri!")', 'cheer()', 'cheer()'], 'Defined once, called twice.', ['Well done, Yatri!', 'Well done, Yatri!']],
      ['Parameters', ['def greet(name):', '    print("Hello,", name)', 'greet("Sam")', 'greet("Mia")'], 'name is filled in by each call.', ['Hello, Sam', 'Hello, Mia']],
      ['return', ['def double(n):', '    return n * 2', 'x = double(4)', 'print(x, double(x))'], 'return sends an answer back to where it was called.', ['8 16']],
    ]),
    run('Pick the number', 'Change the number passed to square until it prints 49.', ['def square(n):', '    return n * n', 'print(square({{v}}))'], ['3', '5', '7'], { goal: '49' }),
    predict('Trace the calls', ['def add(a, b):', '    return a + b', 'r = add(2, 3)', 'print(add(r, 10))'], [
      [3, 'What is r?', ['5', '15', '23'], '2 + 3.', { var: 'r' }],
      [4, 'What is printed?', ['15', '5', '13'], '5 + 10.', { out: true }],
    ]),
    tapbug('It prints None instead of 8', ['def double(n):', '    print(n * 2)', 'x = double(4)'], [[2, 'print(n * 2)', 'return n * 2']], 'print shows a value; return gives it back so it can be stored.'),
    check('What does def do?', ['Defines a new function', 'Runs a function', 'Deletes a function', 'Prints a value'], 'Define.', 'Short for define.', { mono: false }),
    recap([
      ['🧩', 'def name(params): defines your own block'],
      ['📞', 'Call it by name with arguments'],
      ['↩', 'return gives an answer back'],
    ]),
  ]),

  challenge('f-i-9-ch', 'Module 9 Challenge', { icon: '🧩', name: 'Block Maker' }, ['Define and call functions', 'Pass parameters', 'Return answers'], [
    mcq(1, 'Which line defines a function?', ['def jump():', 'function jump()', 'jump = def', 'make jump()'], 'def.', { mono: true }),
    mcq(2, 'In def greet(name):, name is a…', ['Parameter', 'Return value', 'Loop', 'Condition'], 'An input.'),
    mcq(3, 'What does return do?', ['Gives a value back to the caller', 'Prints a value', 'Restarts the function', 'Ends the program'], 'Back to the call.'),
    mcq(4, 'How do you run a function called jump?', ['jump()', 'def jump', 'run jump', 'jump'], 'Brackets call it.', { mono: true }),
    mcq(5, 'A function without return gives back…', ['None', '0', 'An error', 'The last line'], 'Nothing.', { mono: true }),
    swipe([
      ['A function can be called many times', true, 'Define once, use often.'],
      ['Functions can take more than one parameter', true, 'add(a, b).'],
      ['print and return do the same thing', false, 'print shows; return gives back.'],
      ['The function body is indented', true, 'Like loops.'],
    ]),
    pairs([['def', 'Define'], ['( )', 'Call'], ['parameter', 'Input'], ['return', 'Output']], 'Function words.'),
    pickCode('Which function gives back the bigger of two numbers?', ['def bigger(a, b): return a if a > b else b', 'def bigger(a, b): print(a)', 'bigger(a, b) = max', 'def bigger: return a'], 'Parameters and a return.'),
    bugTask(['def triple(n)', '    return n * 3', 'print(triple)'], [[1, 'triple(n)', 'triple(n):'], [3, 'triple)', 'triple(5))']], 'A colon after the header, and call it with brackets and a value.'),
    predictTask(['def f(x):', '    return x + 1', 'print(f(f(f(0))))'], 'What does it print?', ['3', '1', '0', '2'], 'Three calls, each adds 1.'),
    task(OLD, 'f-fn-1', CODE),
  ]),

  lesson('f-debug-1', 'Debugging like a pro', 6, [
    chat(['A bug is a mistake in a program. Every programmer makes them; good programmers find them fast.', 'Read the error message: it names the kind of problem and the line.']),
    toggleRun('Read the error', [
      ['NameError', ['print(gem_total)'], 'A name that was never made: often a typo or a missing line.', ["NameError: name 'gem_total' is not defined"]],
      ['TypeError', ['age = 13', 'print("Age: " + age)'], 'Mixing text and a number.', ['TypeError: can only concatenate str (not "int") to str']],
      ['Fixed', ['age = 13', 'print("Age: " + str(age))'], 'str() turns the number into text.', ['Age: 13']],
    ]),
    reveal('Debugging tools', [
      ['Read the message', 'The last line says what went wrong; it also gives the line number.'],
      ['Print values', 'print(x) in the middle shows what a variable really holds.'],
      ['Explain it aloud', 'Saying each line out loud often reveals the mistake.'],
      ['Change one thing', 'Fix one thing at a time, then run again.'],
    ]),
    predict('Find the logic bug', ['marks = [80, 90, 70]', 'total = 0', 'for m in marks:', '    total = total + m', 'print(total / 2)'], [
      [5, 'What is printed?', ['120.0', '80.0', '240'], 'It divides by 2, not by 3: a logic bug, no error message.', { out: true }],
    ]),
    tapbug('The average is wrong', ['marks = [80, 90, 70]', 'print(sum(marks) / 2)'], [[2, '/ 2', '/ len(marks)']], 'Divide by how many marks there are.'),
    matchUp('Which kind of bug?', [['print("Hi"', 'Syntax error'], ['print(scor)', 'Name error'], ['Average divided by the wrong number', 'Logic error']], 'Three kinds.'),
    check('A program runs but gives the wrong answer. That is a…', ['Logic error', 'Syntax error', 'NameError', 'Crash'], 'No message to help.', 'It runs.'),
    recap([
      ['🐞', 'Syntax, runtime and logic errors'],
      ['📜', 'Read the last line of the error'],
      ['🔍', 'print values; change one thing at a time'],
    ]),
  ]),

  challenge('f-i-10-ch', 'Module 10 Challenge', { icon: '🔍', name: 'Bug Hunter' }, ['Read error messages', 'Find logic bugs', 'Fix one thing at a time'], [
    mcq(1, 'What is a bug?', ['A mistake in a program', 'A fast program', 'A kind of loop', 'A computer part'], 'A mistake.'),
    mcq(2, 'print(scor) when the variable is score gives…', ['NameError', 'TypeError', 'SyntaxError', 'No error'], 'Unknown name.', { mono: true }),
    mcq(3, 'A missing bracket gives a…', ['SyntaxError', 'NameError', 'Logic error', 'No error'], 'Python can’t read it.', { mono: true }),
    mcq(4, 'Which helps find a logic bug?', ['Printing values in the middle', 'Deleting the program', 'Adding random code', 'Running it faster'], 'See what is really there.'),
    mcq(5, 'Where does Python say what went wrong?', ['The last line of the error', 'The first line of the program', 'Nowhere', 'In a pop-up'], 'Read from the bottom.'),
    swipe([
      ['A logic error shows an error message', false, 'It runs, but wrongly.'],
      ['Fixing one thing at a time helps', true, 'You see what worked.'],
      ['Error messages give a line number', true, 'Start there.'],
      ['Good programmers never make bugs', false, 'Everyone does.'],
    ]),
    pairs([['SyntaxError', 'Can’t read it'], ['NameError', 'Unknown name'], ['TypeError', 'Wrong type'], ['Logic error', 'Wrong answer']], 'Kinds of bugs.'),
    pickCode('Which fixes print("Score: " + 10)?', ['print("Score: " + str(10))', 'print("Score: " - 10)', 'print(Score: 10)', 'print("Score: " + "10" + 10)'], 'Text plus text.'),
    bugTask(['def area(w, h):', '    return w + h', 'print(area(3, 4))'], [[2, 'w + h', 'w * h']], 'Area multiplies: a logic bug with no error message.'),
    predictTask(['nums = [3, 5, 7]', 'big = 0', 'for n in nums:', '    if n < big:', '        big = n', 'print(big)'], 'What does it print?', ['0', '7', '3', '5'], 'The comparison is the wrong way round, so big never changes.'),
    task(OLD, 'f-debug-1', CODE),
  ]),
];
