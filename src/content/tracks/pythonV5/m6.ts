// Python Basic · Module 6 · while loops. Lesson 6.1 keeps the old module id (p-while-1).
// Lessons never run a loop that doesn’t end; the “never-ending” examples carry a safety limit.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_B_M6: Lesson[] = [
  lesson('p-while-1', 'while loops', 4, [
    chat(['A for loop repeats a known number of times. A while loop repeats as long as a question stays True.', 'Like “keep stirring while the tea isn’t ready”.']),
    run('Count down', 'Pick a starting number.', ['n = {{v}}', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'], ['3', '5', '1', '0'], { caption: 'With 0, the question is False straight away, so the loop never runs.' }),
    predict('Savings jar', ['savings = 0', 'weeks = 0', 'while savings < 200:', '    savings += 60', '    weeks += 1', 'print(weeks, savings)'], [
      [6, 'What will it print?', ['4 240', '3 180', '4 200'], 'After 3 weeks it is 180, still under 200; week 4 makes 240.', { out: true }],
    ]),
    check('When does a while loop stop?', ['When its question becomes False', 'After 10 times', 'Never', 'When it prints something'], 'It checks before every pass.', 'It is a question.'),
    tapbug('The countdown never ends', ['n = 3', 'while n > 0:', '    print(n)', '    n = n + 1'], [[4, 'n + 1', 'n - 1']], 'n must get closer to 0, or the question stays True for ever.'),
    recap([
      ['🔁', 'while repeats while the question is True'],
      ['❓', 'The question is checked before each pass'],
      ['⬇️', 'Change something, so it can end'],
    ]),
  ]),

  lesson('p-b-6-2', 'Loops that wait for the right answer', 5, [
    explore('Ask until it is right', ['pin = ""', 'while pin != "4321":', '    pin = input("PIN: ")', 'print("Welcome!")'], [
      [1, 'Start with an empty answer, so the loop runs at least once.'],
      [2, 'Keep going while the PIN is wrong.'],
      [3, 'Ask again each time.'],
      [4, 'Only reached once the PIN is right.'],
    ], { minTaps: 3 }),
    run('Try some answers', 'Pick what the user types, in order.', ['typed = iter({{v}})  # the typing, filled in for you', 'tries = 0', 'pin = ""', 'while pin != "4321":', '    pin = next(typed)', '    tries += 1', 'print("Welcome after", tries, "tries")'], ['["4321"]', '["1111", "4321"]', '["1234", "0000", "4321"]'], { caption: 'In the code editor, input() really waits for you to type.' }),
    reveal('Stop with break', [
      ['while True:', 'Repeat for ever…'],
      ['if answer == "q": break', '…until the user types q.'],
      ['A limit', 'Allow only 3 tries for a PIN, then stop.'],
    ], { mono: true }),
    predict('Three tries only', ['answers = ["1111", "2222", "3333", "4321"]', 'tries = 0', 'ok = False', 'while tries < 3 and not ok:', '    ok = answers[tries] == "4321"', '    tries += 1', 'print(ok, tries)'], [
      [7, 'What will it print?', ['False 3', 'True 4', 'False 4'], 'The right PIN was the 4th try, but only 3 are allowed.', { out: true }],
    ]),
    check('Which fits “keep asking until the PIN is right”?', ['while', 'for n in range(3)', 'if', 'print'], 'You don’t know how many tries it will take.', 'Repeat while it is wrong.', { mono: true }),
    recap([
      ['⌨️', 'while keeps asking until the answer is right'],
      ['🛑', 'while True with break, for “until”'],
      ['🔢', 'Add a limit on tries'],
    ]),
  ]),

  lesson('p-b-6-3', 'Never-ending loops, and how to avoid them', 4, [
    toggleRun('Stuck, or finished?', [
      ['Forgot to change n', ['n = 1', 'steps = 0', 'while n < 5 and steps < 6:', '    steps += 1', 'print("Gave up after", steps, "steps; n is still", n)'], 'n never changes, so only the safety limit stops it.', ['Gave up after 6 steps; n is still 1']],
      ['Changes n', ['n = 1', 'steps = 0', 'while n < 5 and steps < 6:', '    n += 1', '    steps += 1', 'print("Done in", steps, "steps; n is", n)'], 'Each pass moves n closer to the end.', ['Done in 4 steps; n is 5']],
    ]),
    reveal('Three checks for every while loop', [
      ['Start', 'Is the variable set before the loop?', '🟢'],
      ['Change', 'Does something inside the loop change it?', '🔁'],
      ['Stop', 'Will the question become False one day?', '🛑'],
    ]),
    tapbug('It never stops serving', ['cups = 10', 'while cups > 0:', '    print("Serving")'], [[3, 'print("Serving")', 'print("Serving"); cups -= 1']], 'Nothing changes cups, so cups > 0 stays True.'),
    truth([
      ['Every while loop needs something that changes', true, 'Or it can’t end.'],
      ['A while True loop needs a break', true, 'That is its only way out.'],
      ['A never-ending loop finishes after a minute', false, 'It runs until it is stopped. This app stops code after 15 seconds.'],
    ]),
    check('Which loop never ends?', ['while 1 < 2:', 'while n > 0: n -= 1', 'for n in range(5):', 'while False:'], '1 < 2 is always True.', 'Which question is always True?', { mono: true }),
    recap([
      ['🟢', 'Start: set the variable first'],
      ['🔁', 'Change: move it each pass'],
      ['🛑', 'Stop: the question must become False'],
    ]),
  ]),

  challenge('p-b-6-ch', 'Module 6 Challenge', { icon: '⏳', name: 'Loop Master' }, ['Repeat with while', 'Wait for the right answer', 'Avoid never-ending loops'], [
    mcq(1, 'A while loop repeats…', ['As long as its question is True', 'Exactly 10 times', 'Once', 'Until it prints'], 'It checks every time.'),
    mcq(2, 'What does a while True loop need to stop?', ['break', 'continue', 'pass', 'else'], 'break leaves the loop.', { mono: true }),
    mcq(3, 'Which is better for “repeat 10 times”?', ['for n in range(10)', 'while True', 'if', 'input()'], 'You know how many times.', { mono: true }),
    mcq(4, 'What is wrong with while n > 0: print(n)?', ['n never changes', 'print is wrong', '> should be <', 'Nothing'], 'It never ends.'),
    mcq(5, 'Which leaves a loop at once?', ['break', 'continue', 'pass', 'stop'], 'break.', { mono: true }),
    swipe([
      ['while checks its question before each pass', true, 'Even before the first.'],
      ['A while loop always runs at least once', false, 'Not if the question starts False.'],
      ['for is better when you know how many times', true, 'range(n).'],
      ['while False: runs once', false, 'It never runs.'],
    ]),
    pairs([['while', 'Repeat while True'], ['break', 'Leave now'], ['n -= 1', 'Count down'], ['while True', 'Repeat until break']], 'while loop tools.'),
    pickCode('Which counts down and stops?', ['while n > 0: print(n); n -= 1', 'while n > 0: print(n)', 'while n < 0: n -= 1', 'while n: n += 1'], 'It prints and moves n towards 0.'),
    bugTask(['    n = n + 1  # counting down', 'while pin = "4321":', 'while cups > 0'], [[1, 'n + 1', 'n - 1'], [2, 'pin = "4321"', 'pin != "4321"'], [3, 'cups > 0', 'cups > 0:']], 'Count the right way, compare (keep going while it is wrong), and end with a colon.'),
    predictTask(['n = 20', 'steps = 0', 'while n > 1:', '    n = n // 2', '    steps += 1', 'print(steps)'], 'What does it print?', ['4', '5', '10', '20'], '20 → 10 → 5 → 2 → 1: four halvings.'),
    arrange(['n = 3', 'while n > 0:', '    n -= 1', 'print("Done", n)'], 'start, loop while above 0, count down, then report', ['Done 0']),
  ]),
];
