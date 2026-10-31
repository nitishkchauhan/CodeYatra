// Python Advanced · Module 5 · Decorators and caching. Lesson 5.1 keeps the old module id (py-decorators).
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const LOGGED = ['import functools', 'def logged(fn):', '    @functools.wraps(fn)', '    def wrapper(*args, **kwargs):', '        print("Calling", fn.__name__)', '        return fn(*args, **kwargs)', '    return wrapper', '@logged', 'def fare(seats, price):', '    return seats * price'];

export const PY_A_M5: Lesson[] = [
  lesson('py-decorators', 'Functions are values', 5, [
    atWork('Felix', ['We want to log every call to the slow functions in the booking service, without editing each one.', 'First, a Python secret: functions are values. You can pass them around like numbers.']),
    run('Pass a function in', 'Pick a function to apply.', ['def apply_all(fn, fares):', '    return [fn(f) for f in fares]', 'def with_fee(f):', '    return f + 20', 'print(apply_all({{v}}, [450, 300]))'], ['with_fee', 'str', 'lambda f: f * 2', 'round'], { caption: 'fn is just a name for whatever function you pass in.' }),
    predict('A function that makes functions', ['def make_fee(amount):', '    def add(fare):', '        return fare + amount', '    return add', 'small = make_fee(20)', 'big = make_fee(50)', 'print(small(450), big(450))'], [
      [7, 'What will it print?', ['470 500', '450 450', '500 470'], 'Each inner function remembers its own amount.', { out: true }],
    ]),
    reveal('Closures', [
      ['make_fee(20)', 'Gives back the inner add function…'],
      ['…that remembers amount', 'The inner function keeps the variables around it: a closure.'],
      ['small(450)', 'Called later: 470.'],
      ['Why it matters', 'Decorators are built from exactly this.'],
    ], { mono: true }),
    check('What does print(with_fee) show, without brackets?', ['The function itself, not a result', '470', 'An error', 'None'], 'Without brackets, you mention the function; with them, you call it.', 'No brackets, no call.'),
    tapbug("TypeError: 'int' object is not callable", ['print(apply_all(with_fee(450), fares))'], [[1, 'with_fee(450)', 'with_fee']], 'Pass the function itself, not its result.'),
    recap([
      ['📦', 'Functions are values you can pass around'],
      ['🏭', 'A function can make and return functions'],
      ['🧠', 'Inner functions remember: closures'],
    ]),
  ]),

  lesson('py-a-5-2', 'Writing a decorator', 5, [
    explore('A decorator, line by line', LOGGED, [
      [2, 'A decorator takes a function…'],
      [4, '…and builds a wrapper that takes any arguments.'],
      [5, 'It adds something extra…'],
      [6, '…then calls the real function and passes back its result.'],
      [8, '@logged above def is short for fare = logged(fare).'],
    ], { minTaps: 3 }),
    run('Wrap it', 'Pick a call.', [...LOGGED, 'print({{v}})'], ['fare(2, 450)', 'fare(seats=3, price=300)', 'fare.__name__'], { caption: 'functools.wraps keeps the real name, so logs and error messages still say fare.' }),
    toggleRun('Without functools.wraps', [
      ['With wraps', [...LOGGED, 'print(fare.__name__)'], 'The wrapper keeps fare’s name.', ['fare']],
      ['Without', [...LOGGED.filter((l) => !l.includes('wraps')), 'print(fare.__name__)'], 'The name is lost: logs and errors would say wrapper.', ['wrapper']],
    ]),
    check('@logged above def fare is the same as…', ['fare = logged(fare)', 'logged = fare(logged)', 'fare(logged)', 'logged.fare()'], 'The decorator replaces fare with its wrapper.', 'Which name gets the new function?', { mono: true }),
    tapbug('fare() now gives back None', ['    def wrapper(*args, **kwargs):', '        print("Calling", fn.__name__)', '        fn(*args, **kwargs)'], [[3, 'fn(*args, **kwargs)', 'return fn(*args, **kwargs)']], 'The wrapper must return the real function’s result.'),
    recap([
      ['🎁', 'A decorator wraps a function to add something'],
      ['📬', '*args, **kwargs pass everything through'],
      ['🏷', 'functools.wraps keeps the name'],
    ]),
  ]),

  lesson('py-a-5-3', 'Caching', 5, [
    atWork('Megan', ['A route’s fare is worked out from the timetable, which is slow. The same 20 routes are asked for thousands of times a day.', 'A cache remembers answers, so the slow work runs once per route.']),
    run('Count the slow calls', 'Pick a cache. Can you do the slow work only twice?', ['import functools', 'calls = 0', '{{v}}', 'def route_fare(route):', '    global calls', '    calls += 1', '    return len(route) * 30', 'for r in ["Harbour", "Airport", "Harbour", "Harbour"]:', '    route_fare(r)', 'print("Slow work done", calls, "times")'], ['# no cache', '@functools.lru_cache(maxsize=1)', '@functools.cache'], { goal: 'Slow work done 2 times', caption: 'A cache of size 1 forgets Harbour as soon as Airport arrives.' }),
    reveal('Caches', [
      ['@functools.cache', 'Remembers every answer, for every argument.'],
      ['@functools.lru_cache(maxsize=128)', 'Remembers only the 128 most recent, so memory stays small.'],
      ['Only for pure functions', 'Same input, same output, no side effects. Never cache the current time or a random number.'],
      ['route_fare.cache_clear()', 'Forget everything, for example after the fares change.'],
    ], { mono: true }),
    check('Which function is safe to cache?', ['route_fare(route): same route, same fare', 'now(): the current time', 'roll_dice()', 'next_ticket_number()'], 'Only when the same input always gives the same answer.', 'Would the answer ever change?'),
    truth([
      ['A cache trades memory for speed', true, 'It stores answers to save work.'],
      ['lru_cache forgets the oldest answers when full', true, 'Least recently used.'],
      ['Caching a function that reads the clock is fine', false, 'It would keep giving the old time.'],
    ]),
    tapbug("TypeError: unhashable type: 'list'", ['@functools.cache', 'def total(fares):', '    return sum(fares)', 'total([450, 300])'], [[4, '[450, 300]', '(450, 300)']], 'A cache stores the arguments as dictionary keys, so they must be unchangeable: a tuple, not a list.'),
    recap([
      ['⚡', '@functools.cache remembers answers'],
      ['📏', 'lru_cache keeps memory small'],
      ['🧪', 'Cache only pure functions'],
    ]),
  ]),

  challenge('py-a-5-ch', 'Module 5 Challenge', { icon: '🎁', name: 'Decorator Pro' }, ['Pass functions around, and use closures', 'Write decorators that wrap any function', 'Speed things up with caching'], [
    mcq(1, 'What is a closure?', ['An inner function that remembers the variables around it', 'A closed file', 'A finished loop', 'A private class'], 'It keeps its surroundings.'),
    mcq(2, '@timer above def f means…', ['f = timer(f)', 'timer = f(timer)', 'f(timer)', 'Nothing when the code runs'], 'The decorator replaces f.', { mono: true }),
    mcq(3, 'Why use functools.wraps?', ['To keep the original function’s name and docs', 'To make it faster', 'To cache it', 'To catch errors'], 'Logs and errors stay readable.'),
    mcq(4, 'What does @functools.cache do?', ['Remembers answers for arguments already seen', 'Saves the function to disk', 'Runs it in the background', 'Times it'], 'Slow work runs once.'),
    mcq(5, 'Which can’t be a cached function’s argument?', ['A list', 'A string', 'A number', 'A tuple'], 'Lists can change, so they can’t be keys.'),
    swipe([
      ['Functions can be passed to other functions', true, 'They are values.'],
      ['A wrapper must return the real function’s result', true, 'Or callers get None.'],
      ['Cache functions that use the current time', false, 'The time would freeze.'],
      ['A decorator runs again on every call', false, 'It runs once, when the function is defined; the wrapper runs on each call.'],
    ]),
    pairs([['@logged', 'Wrap a function'], ['*args, **kwargs', 'Pass everything through'], ['functools.wraps', 'Keep the name'], ['lru_cache', 'Remember recent answers']], 'Decorator tools.'),
    pickCode('Which wrapper passes everything through and keeps the result?', ['def wrapper(*args, **kwargs): return fn(*args, **kwargs)', 'def wrapper(): fn()', 'def wrapper(args): return fn(args)', 'def wrapper(*args): print(fn)'], 'Any arguments in, the real result out.'),
    bugTask(['print(apply_all(with_fee(450), fares))', '        fn(*args, **kwargs)', 'total([450, 300])'], [[1, 'with_fee(450)', 'with_fee'], [2, 'fn(*args, **kwargs)', 'return fn(*args, **kwargs)'], [3, '[450, 300]', '(450, 300)']], 'Pass the function itself, return the result, and give caches unchangeable arguments.'),
    predictTask(['def twice(fn):', '    def wrapper(x):', '        return fn(fn(x))', '    return wrapper', '@twice', 'def add_fee(fare):', '    return fare + 20', 'print(add_fee(100))'], 'What does it print?', ['140', '120', '100', '240'], 'The fee is added twice: 100 + 20 + 20.'),
    arrange(['def make_fee(amount):', '    return lambda fare: fare + amount', 'print(make_fee(20)(450))'], 'make the function maker, then use it', ['470']),
  ]),
];
