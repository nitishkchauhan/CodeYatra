// Python Basic · Module 10 · Handling errors. Lesson 10.1 keeps the old module id (p-err-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const ORDER = ['def order(cups):', '    if not 1 <= cups <= 10:', '        raise ValueError("cups must be 1 to 10")', '    return cups * 40'];

export const PY_B_M10: Lesson[] = [
  lesson('p-err-1', 'Common errors', 4, [
    chat(['Every programmer sees errors every day. They aren’t failures: they are Python telling you exactly what went wrong.', 'Learn their names, and you can fix most of them in seconds.']),
    run('Meet the errors', 'Pick a line to run.', ['prices = {"Tea": 40}', 'menu = ["Tea"]', 'print({{v}})'], ['prices["Tea"]', 'int("forty")', 'menu[5]', 'prices["Cake"]', '"Tea" + 40', '10 / 0'], { caption: 'Each mistake has its own name. The name is the first clue.' }),
    matchUp('Name the error', [['ValueError', 'A wrong value, like int("forty")'], ['IndexError', 'No item at that position'], ['KeyError', 'No such key'], ['ZeroDivisionError', 'Dividing by 0']], 'The error’s name tells you what kind of mistake it is.'),
    check('int("forty") raises…', ['ValueError', 'TypeError', 'KeyError', 'NameError'], 'Text is fine for int(), but "forty" isn’t digits.', 'The value is wrong.', { mono: true }),
    truth([
      ['Error messages give the line number', true, 'Start looking there.'],
      ['"Tea" + 40 is a TypeError', true, 'Text and a number can’t be added.'],
      ['An error means the computer is broken', false, 'It means the code needs a fix.'],
    ]),
    recap([
      ['🏷', 'The error’s name is the first clue'],
      ['📍', 'The line number says where'],
      ['🔧', 'Errors are normal: read, then fix'],
    ]),
  ]),

  lesson('p-b-10-2', 'try and except', 5, [
    toggleRun('Crash, or carry on?', [
      ['No try', ['typed = "two"', 'cups = int(typed)', 'print("Cups:", cups)'], 'The program stops at the error.', ["ValueError: invalid literal for int() with base 10: 'two'"]],
      ['try and except', ['typed = "two"', 'try:', '    cups = int(typed)', '    print("Cups:", cups)', 'except ValueError:', '    print("Please type a number, like 2")'], 'The error is caught, and the program carries on.', ['Please type a number, like 2']],
    ]),
    run('Catch it', 'Pick what the customer typed.', ['typed = {{v}}', 'try:', '    cups = int(typed)', '    print("Bill: ₹" + str(cups * 40))', 'except ValueError:', '    print("That isn’t a number")'], ['"2"', '"two"', '"5"', '" 3 "'], { caption: 'int() ignores spaces at the ends, so " 3 " works.' }),
    explore('How try works', ['try:', '    cups = int(typed)', 'except ValueError:', '    print("Please type a number")', 'finally:', '    print("Thank you")'], [
      [1, 'Try the risky lines.'],
      [3, 'If that error happens, run this instead of crashing.'],
      [5, 'finally runs either way.'],
    ], { minTaps: 3 }),
    predict('Which lines run?', ['steps = []', 'try:', '    steps.append("start")', '    n = 10 / 0', '    steps.append("after")', 'except ZeroDivisionError:', '    steps.append("caught")', 'print(steps)'], [
      [8, 'What will it print?', ["['start', 'caught']", "['start', 'after', 'caught']", "['caught']"], 'The line after the error is skipped; except runs instead.', { out: true }],
    ]),
    tapbug('Typos in the code are hidden too', ['try:', '    cups = int(typed)', 'except:', '    print("Type a number")'], [[3, 'except:', 'except ValueError:']], 'Catch only the error you expect, so real bugs still show up.'),
    recap([
      ['🧪', 'try the risky lines'],
      ['🛟', 'except a named error'],
      ['✅', 'finally always runs'],
    ]),
  ]),

  lesson('p-b-10-3', 'Checking input before using it', 4, [
    run('Check first', 'Pick what was typed.', ['typed = {{v}}', 'if typed.isdigit() and 1 <= int(typed) <= 10:', '    print("Order for", typed, "cups")', 'else:', '    print("Please choose 1 to 10 cups")'], ['"3"', '"0"', '"25"', '"three"'], { caption: 'isdigit() is checked first, so int() never sees "three".' }),
    reveal('Raise your own error', [
      ['raise ValueError("cups must be 1 to 10")', 'Stop with a clear message when a rule is broken.'],
      ['In a function', 'Check the input at the top, before doing any work.'],
      ['The caller', 'Can catch it with try and except, and show the message.'],
    ], { mono: true }),
    toggleRun('raise in a function', [
      ['A good order', [...ORDER, 'print(order(3))'], 'Inside the limits: the bill.', ['120']],
      ['Too many', [...ORDER, 'print(order(25))'], 'A clear error, instead of a silly bill.', ['ValueError: cups must be 1 to 10']],
    ]),
    check('What does "12".isdigit() give?', ['True', 'False', '12', 'An error'], 'Every character is a digit.', 'Is it all digits?', { mono: true }),
    tapbug('"three" crashes the check', ['if 1 <= int(typed) <= 10 and typed.isdigit():'], [[1, '1 <= int(typed) <= 10 and typed.isdigit()', 'typed.isdigit() and 1 <= int(typed) <= 10']], 'Check it is digits first: and stops early, so int() never sees "three".'),
    recap([
      ['🔍', 'Check input before using it'],
      ['🚨', 'raise ValueError("…") for broken rules'],
      ['🧭', 'Clear messages help users fix it'],
    ]),
  ]),

  challenge('p-b-10-ch', 'Module 10 Challenge', { icon: '🛡', name: 'Error Handler' }, ['Recognise common errors', 'Catch errors with try and except', 'Check input and raise clear errors'], [
    mcq(1, 'What does a KeyError mean?', ['A dictionary key isn’t there', 'A wrong password', 'A typo in a keyword', 'The keyboard is broken'], 'A missing key.'),
    mcq(2, 'Which catches only bad numbers?', ['except ValueError:', 'except:', 'catch ValueError:', 'if ValueError:'], 'Name the error.', { mono: true }),
    mcq(3, 'When does finally run?', ['Always, error or not', 'Only after an error', 'Never', 'Only without an error'], 'Either way.'),
    mcq(4, 'What does raise do?', ['Stops with an error you choose', 'Fixes an error', 'Hides an error', 'Prints a warning only'], 'Your own error.'),
    mcq(5, '10 / 0 raises…', ['ZeroDivisionError', 'ValueError', 'TypeError', 'Nothing'], 'You can’t divide by 0.', { mono: true }),
    swipe([
      ['except: with no error name is the safest choice', false, 'It hides real bugs.'],
      ['try and except let the program carry on', true, 'Instead of crashing.'],
      ['finally runs even after an error', true, 'Always.'],
      ['Only Python can raise errors', false, 'You can too, with raise.'],
    ]),
    pairs([['try', 'The risky lines'], ['except', 'If it fails'], ['finally', 'Always'], ['raise', 'Make an error']], 'Error tools.'),
    pickCode('Which turns typed text into a number safely?', ['int() inside try, with except ValueError', 'int(typed) with no checks', 'except: pass on its own', 'str(typed)'], 'Catch the error you expect.'),
    bugTask(['except:', 'raise "cups must be 1 to 10"', 'cups = int("two")'], [[1, 'except:', 'except ValueError:'], [2, '"cups must be 1 to 10"', 'ValueError("cups must be 1 to 10")'], [3, '"two"', '"2"']], 'Name the error you catch, raise an error (not text), and int() needs digits.'),
    predictTask(['def safe_int(text):', '    try:', '        return int(text)', '    except ValueError:', '        return 0', 'print(safe_int("7") + safe_int("seven"))'], 'What does it print?', ['7', '0', '14', 'An error'], '"seven" isn’t digits, so it becomes 0.'),
    arrange(['try:', '    n = int("forty")', 'except ValueError:', '    print("Not a number")'], 'try the risky line, catch the error, then explain', ['Not a number']),
  ]),
];
