// Python Advanced · Module 2 · Debugging and logging. Lesson 2.1 keeps the old module id (py-debugging).
// Logs go to stdout with force=True, so each run of a lesson shows its own lines.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

export const PY_A_M2: Lesson[] = [
  lesson('py-debugging', 'Reading a traceback', 5, [
    atWork('Felix', ['The report script crashed overnight. All we have is the error message it left behind.', 'A traceback looks scary, but it is a map. Read it from the bottom up.']),
    explore('Read it from the bottom', ['Traceback (most recent call last):', '  File "report.py", line 9, in <module>', '    print(average(rows))', '  File "report.py", line 4, in average', '    return total / len(rows)', 'ZeroDivisionError: division by zero'], [
      [6, 'Start here: what went wrong. Dividing by zero.'],
      [5, 'The exact line that failed.'],
      [4, 'Where it is: line 4, inside average().'],
      [2, 'How it got there: line 9 called average().'],
    ], { minTaps: 3 }),
    run('Make it crash, then read it', 'Pick an input.', ['def average(rows):', '    total = sum(r["seats"] for r in rows)', '    return total / len(rows)', 'print(average({{v}}))'], ['[{"seats": 2}, {"seats": 4}]', '[]', '[{"seats": "2"}]', '[{"seat": 2}]'], { caption: 'Each crash names a different problem: ZeroDivisionError, TypeError, KeyError.' }),
    matchUp('Common errors', [['KeyError', 'A missing dictionary key'], ['TypeError', 'The wrong type, like "2" + 2'], ['IndexError', 'A position past the end of a list'], ['AttributeError', 'A name the object doesn’t have']], 'The error’s name is the first clue.'),
    check('Where should you start reading a traceback?', ['The last line: the error and its message', 'The first line', 'The middle', 'The file name'], 'Then work upwards to the line that failed.', 'Bottom up.'),
    tapbug('ZeroDivisionError when there are no rows', ['def average(rows):', '    return sum(rows) / len(rows)'], [[2, 'return sum(rows) / len(rows)', 'return sum(rows) / len(rows) if rows else 0']], 'An empty list has length 0. Decide what “no rows” should give.'),
    recap([
      ['⬆️', 'Read a traceback from the bottom up'],
      ['🏷', 'The error’s name is the first clue'],
      ['📍', 'The line above it is where it failed'],
    ]),
  ]),

  lesson('py-a-2-2', 'Finding the bug', 5, [
    reveal('A calm way to debug', [
      ['1. Reproduce', 'Find the smallest input that shows the bug, every time.', '🔁'],
      ['2. Narrow down', 'Print values, or pause with breakpoint(), until you find the first wrong one.', '🔍'],
      ['3. Fix', 'Change one thing.', '🔧'],
      ['4. Protect', 'Add a test, so the bug never comes back.', '🛡'],
    ]),
    predict('Follow the values', ['fares = [450, 300, 200]', 'total = 0', 'for f in fares:', '    total = f', 'print(total)'], [
      [5, 'What will it print?', ['200', '950', '450'], 'total is replaced each time, so only the last fare is left.', { out: true }],
    ]),
    run('Print to look inside', 'Pick a debug print.', ['fares = [450, 300, 200]', 'total = 0', 'for f in fares:', '    total = f', '    {{v}}', 'print("Total:", total)'], ['pass', 'print("f =", f)', 'print("total =", total)', 'print(f"f={f} total={total}")'], { caption: 'The prints show total never grows: the bug is total = f instead of total += f.' }),
    toggleRun('Fixed, with a test', [
      ['Buggy', ['def total(fares):', '    t = 0', '    for f in fares:', '        t = f', '    return t', 'print(total([450, 300, 200]))'], 'The last fare, not the sum.', ['200']],
      ['Fixed', ['def total(fares):', '    t = 0', '    for f in fares:', '        t += f', '    return t', 'assert total([450, 300, 200]) == 950', 'print(total([450, 300, 200]))'], 'The assert now guards the fix.', ['950']],
    ]),
    check('What should you do after fixing a bug?', ['Add a test that would have caught it', 'Delete the prints and forget it', 'Restart the computer', 'Nothing'], 'Then it can never quietly come back.', 'Protect the fix.'),
    tapbug('The total is always the last fare', ['for f in fares:', '    total = f'], [[2, 'total = f', 'total += f']], 'Add to the total instead of replacing it.'),
    recap([
      ['🔁', 'Reproduce with the smallest input'],
      ['🔍', 'Narrow down with prints or breakpoint()'],
      ['🛡', 'Fix, then add a test'],
    ]),
  ]),

  lesson('py-a-2-3', 'Logging', 5, [
    atWork('Megan', ['The booking service runs on a server where nobody watches the screen, so print() messages vanish.', 'logging writes messages with a level, a time and a place, so you can find out later what happened.']),
    run('Choose the level', 'Pick the lowest level to show.', ['import logging, sys', 'logging.basicConfig(stream=sys.stdout, format="%(levelname)s: %(message)s", level=logging.{{v}}, force=True)', 'log = logging.getLogger("bookings")', 'log.debug("Seat map loaded")', 'log.info("Booked 2 seats on 90101")', 'log.warning("Only 3 seats left on 90101")', 'log.error("Payment failed for booking 17")'], ['WARNING', 'DEBUG', 'INFO', 'ERROR'], { caption: 'Each level shows itself and everything more serious. Servers usually run at INFO; switch on DEBUG to investigate.' }),
    reveal('The five levels', [
      ['DEBUG', 'Details for developers.'],
      ['INFO', 'Normal events: a booking was made.'],
      ['WARNING', 'Something to watch: seats running low.'],
      ['ERROR', 'Something failed: a payment.'],
      ['CRITICAL', 'The service can’t carry on.'],
    ], { mono: true }),
    check('Which level fits “Only 3 seats left”?', ['WARNING', 'DEBUG', 'ERROR', 'CRITICAL'], 'Nothing failed yet, but someone should know.', 'Something to watch.', { mono: true }),
    truth([
      ['print() is fine for a server nobody watches', false, 'Its messages are lost. Logs are kept.'],
      ['log.exception() inside except records the traceback too', true, 'Very useful after a crash.'],
      ['Logs are a safe place for passwords and card numbers', false, 'Never: many people read logs.'],
    ]),
    tapbug('Debug messages never show', ['logging.basicConfig(level=logging.WARNING)', 'log.debug("Seat map loaded")'], [[1, 'logging.WARNING', 'logging.DEBUG']], 'The level hides everything less serious than itself.'),
    recap([
      ['📒', 'logging keeps a record with levels'],
      ['🎚', 'DEBUG < INFO < WARNING < ERROR < CRITICAL'],
      ['🔐', 'Never log secrets'],
    ]),
  ]),

  challenge('py-a-2-ch', 'Module 2 Challenge', { icon: '🐞', name: 'Bug Hunter' }, ['Read tracebacks from the bottom up', 'Find bugs calmly, then protect the fix', 'Record what happens with logging'], [
    mcq(1, 'Which line of a traceback names the error?', ['The last line', 'The first line', 'The second line', 'None of them'], 'Start reading there.'),
    mcq(2, '"2" + 2 raises…', ['TypeError', 'ValueError', 'KeyError', 'SyntaxError'], 'Text and a number can’t be added.', { mono: true }),
    mcq(3, 'What is the first step in debugging?', ['Reproduce the bug', 'Rewrite the code', 'Add logging everywhere', 'Ask for a new laptop'], 'You can’t fix what you can’t see.'),
    mcq(4, 'Which logging level is for normal events?', ['INFO', 'DEBUG', 'ERROR', 'CRITICAL'], 'A booking was made.', { mono: true }),
    mcq(5, 'Why log instead of print on a server?', ['Logs are kept, with levels and times', 'print is slower', 'print is not allowed', 'Logs fix bugs'], 'Someone can read them later.'),
    swipe([
      ['Read a traceback from the bottom up', true, 'The error first.'],
      ['IndexError means a missing dictionary key', false, 'That is KeyError.'],
      ['A fixed bug deserves a test', true, 'So it stays fixed.'],
      ['Logs are a good place for passwords', false, 'Never.'],
    ]),
    pairs([['KeyError', 'Missing key'], ['IndexError', 'Past the end of a list'], ['breakpoint()', 'Pause and look'], ['log.warning', 'Something to watch']], 'Debugging tools.'),
    pickCode('Which records an error with its traceback?', ['except Exception: log.exception("Booking failed")', 'except: pass', 'print(Exception)', 'log.debug(traceback)'], 'log.exception inside except.'),
    bugTask(['    total = f', 'return sum(rows) / len(rows)', 'logging.basicConfig(level=logging.ERROR)'], [[1, 'total = f', 'total += f'], [2, '/ len(rows)', '/ len(rows) if rows else 0'], [3, 'logging.ERROR', 'logging.INFO']], 'Add instead of replacing, guard against empty lists, and INFO shows normal events.'),
    predictTask(['fares = [450, 300]', 'total = 0', 'for f in fares:', '    total = total + f', 'print(total / len(fares))'], 'What does it print?', ['375.0', '375', '750', '300.0'], '750 / 2. Dividing with / always gives a float.'),
    arrange(['import logging, sys', 'logging.basicConfig(stream=sys.stdout, format="%(levelname)s %(message)s", level=logging.INFO, force=True)', 'logging.info("Booked 2 seats")'], 'import, set up logging, then log', ['INFO Booked 2 seats']),
  ]),
];
