// Extra practice for each Logic & Blocks module. Python predicts run in tests.
import { bug, order, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · LOGIC';

export const LOGIC_DRILLS: Record<string, Step[]> = {
  'f-seq-1': [
    quiz({ prompt: 'Why must an algorithm’s steps be clear?', options: ['A computer can’t guess what you meant', 'So it looks neat', 'Computers like long words', 'It doesn’t matter'], right: 'Right.', wrong: 'Computers follow steps exactly, so unclear steps give wrong results.' }),
    order({ kicker: K, title: 'Make a cup of tea', instructions: 'Put the steps in order.', lang: 'python', lines: ['print("Boil water")', 'print("Add tea leaves")', 'print("Add milk and sugar")', 'print("Strain into a cup")'], explain: 'Each step needs the one before it.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print("move")', 'print("move")', 'print("flag!")'], answer: 'move\nmove\nflag!', explain: 'Lines run from top to bottom, one at a time.' }),
    quiz({ prompt: 'Yatri faces East at column 0. After three Move blocks, which column is Yatri in?', options: ['3', '1', '2', '0'], right: 'Right.', wrong: 'Each Move goes one square: 0 → 1 → 2 → 3.', mono: true }),
  ],
  'f-seq-2': [
    quiz({ prompt: 'Yatri faces North and turns left. Which way now?', options: ['West', 'East', 'South', 'North'], right: 'Right.', wrong: 'A left turn from North faces West.' }),
    quiz({ prompt: 'Yatri faces East, turns right twice. Which way now?', options: ['West', 'East', 'North', 'South'], right: 'Right. Two right turns make a U-turn.', wrong: 'East → South → West.' }),
    order({ kicker: K, title: 'Around the corner', instructions: 'Yatri must move twice, turn right, then move once. Put the blocks in order.', lang: 'python', lines: ['move()', 'move()', 'turn_right()', 'move()'], explain: 'Move to the corner, turn, then carry on.' }),
    quiz({ prompt: 'Your route fails at the third block. What should you check first?', options: ['Which way Yatri faces just before that block', 'The first block', 'The colour of the board', 'Nothing: start again'], right: 'Right. Trace the steps up to where it went wrong.', wrong: 'Check the state just before the failing step.' }),
  ],
  'f-loop-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for i in range(3):', '    print(i)'], answer: '0\n1\n2', explain: 'range(3) counts 0, 1, 2.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['total = 0', 'for i in range(4):', '    total = total + 5', 'print(total)'], answer: '20', explain: 'Four rounds of adding 5.' }),
    quiz({ prompt: 'How many blocks does Repeat 4 × (move, pick) use?', options: ['3', '8', '4', '2'], right: 'Right: the Repeat plus two blocks inside.', wrong: 'The Repeat block counts once, plus the two inside it.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should say “jump” three times. Tap the buggy line.', lang: 'python', lines: ['for i in range(3)', '    print("jump")'], bug: 0, fix: 'for i in range(3):', explain: 'A for line must end with a colon.' }),
  ],
  'f-loop-2': [
    quiz({ prompt: 'Route: move, pick, turn, move, pick, turn, move, pick, turn. What repeats?', options: ['move, pick, turn', 'move only', 'pick, pick', 'Nothing repeats'], right: 'Right. Three times.', wrong: 'The group “move, pick, turn” happens three times.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for n in range(1, 4):', '    print("#" * n)'], answer: '#\n##\n###', explain: 'Each row repeats # one more time.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['print("go")', 'for i in range(2):', '    print("step")', 'print("stop")'], answer: 'go\nstep\nstep\nstop', explain: 'One line before the loop, the loop twice, one line after.' }),
    quiz({ prompt: 'What does decomposition mean?', options: ['Breaking a big problem into smaller parts', 'Deleting your code', 'Running code faster', 'Drawing a picture'], right: 'Right.', wrong: 'Decomposition splits a problem into smaller, easier parts.' }),
  ],
  'f-var-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['x = 5', 'x = x + 2', 'x = x * 3', 'print(x)'], answer: '21', explain: '5 + 2 = 7, then 7 × 3 = 21.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['name = "Yatri"', 'gems = 4', 'print(name, "has", gems, "gems")'], answer: 'Yatri has 4 gems', explain: 'print puts a space between each value.' }),
    quiz({ prompt: 'What does = mean in gems = 3?', options: ['Store 3 in the box called gems', 'Check if gems equals 3', 'Add 3 to gems', 'Print 3'], right: 'Right.', wrong: 'A single = stores a value. == compares.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['a = "3"', 'b = 3', 'print(a * 2, b * 2)'], answer: '33 6', explain: '"3" is text, so * 2 repeats it; 3 is a number, so it multiplies.' }),
  ],
  'f-if-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['gems = 0', 'if gems > 0:', '    print("rich")', 'else:', '    print("keep looking")'], answer: 'keep looking', explain: '0 > 0 is False, so the else runs.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['age = 15', 'print(age >= 13 and age <= 19)'], answer: 'True', explain: '15 is between 13 and 19, so both parts are True.' }),
    quiz({ prompt: 'Which runs when the if condition is False?', options: ['else', 'elif only', 'Nothing ever', 'The if block'], right: 'Right.', wrong: 'else is the “otherwise” path.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should say “match” when the score is 10. Tap the buggy line.', lang: 'python', lines: ['score = 10', 'if score = 10:', '    print("match")'], bug: 1, fix: 'if score == 10:', explain: 'Compare with ==. A single = stores.' }),
  ],
  'f-while-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'], answer: '3\n2\n1\nGo!', explain: 'Count down until n is 0, then the last line runs.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['x = 2', 'while x < 50:', '    x = x * x', 'print(x)'], answer: '256', explain: '2 → 4 → 16 → 256. 256 isn’t below 50, so the loop stops.' }),
    quiz({ prompt: 'What is an infinite loop?', options: ['A loop whose condition never becomes False', 'A very fast loop', 'A loop with 100 rounds', 'A loop inside a loop'], right: 'Right.', wrong: 'If the condition stays True, the loop never ends.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This never stops. Tap the buggy line.', lang: 'python', lines: ['steps = 0', 'while steps < 5:', '    steps = steps - 1'], bug: 2, fix: '    steps = steps + 1', explain: 'Going down moves away from 5, so the condition stays True.' }),
  ],
  'f-nest-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for a in range(2):', '    for b in range(2):', '        print(a, b)'], answer: '0 0\n0 1\n1 0\n1 1', explain: 'For each a, b goes 0 then 1.' }),
    quiz({ prompt: 'An outer loop runs 4 times and an inner loop 6 times. How often does the inner line run?', options: ['24', '10', '6', '4'], right: 'Right: 4 × 6.', wrong: 'Multiply: the inner loop runs fully for each outer round.', mono: true }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for r in range(3):', '    print("*" * 3)'], answer: '***\n***\n***', explain: 'Three rows of three stars.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['for i in range(1, 3):', '    for j in range(1, 3):', '        print(i * j, end=" ")', '    print()'], answer: '1 2\n2 4', explain: 'A tiny times table: row 1 is 1, 2 and row 2 is 2, 4.' }),
  ],
  'f-fn-1': [
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def triple(n):', '    return n * 3', 'print(triple(2) + triple(1))'], answer: '9', explain: '6 + 3 = 9.' }),
    predict({ kicker: K, title: 'What does this print?', lang: 'python', lines: ['def hello():', '    print("hi")', 'hello()', 'hello()'], answer: 'hi\nhi', explain: 'Each call runs the function’s steps again.' }),
    quiz({ prompt: 'In def greet(name):, what is name?', options: ['A parameter: an input to the function', 'The function’s output', 'A loop', 'A comment'], right: 'Right.', wrong: 'Values in the brackets of def are parameters.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'x should be 10. Tap the buggy line.', lang: 'python', lines: ['def double(n):', '    print(n * 2)', 'x = double(5)'], bug: 1, fix: '    return n * 2', explain: 'print only shows the value; return hands it back so x gets 10.' }),
  ],
  'f-debug-1': [
    quiz({ prompt: 'Python says SyntaxError. What does that usually mean?', options: ['Python can’t read the line: a missing colon, bracket or quote', 'The answer is wrong', 'The computer is slow', 'A variable is too big'], right: 'Right.', wrong: 'SyntaxError means the code isn’t written in valid Python.' }),
    quiz({ prompt: 'The program runs but the answer is wrong. What helps most?', options: ['Print the variables at each step and compare with what you expect', 'Delete everything', 'Run it 100 times', 'Change many lines at once'], right: 'Right.', wrong: 'Look inside with print() and change one thing at a time.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should print Hello. Tap the buggy line.', lang: 'python', lines: ['message = "Hello"', 'print(mesage)'], bug: 1, fix: 'print(message)', explain: 'A spelling mistake gives a NameError.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Python can’t read this. Tap the buggy line.', lang: 'python', lines: ['print("Start")', 'print("Yatri is here)'], bug: 1, fix: 'print("Yatri is here")', explain: 'Every opening quote needs a closing quote.' }),
  ],
};
