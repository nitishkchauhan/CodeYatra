// Python Advanced · Module 1 · Testing. Lesson 1.1 keeps the old module id (py-testing).
// unittest results are printed as counts (not the runner's timing line), so every run prints the same thing.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, truth } from './kit';

export const PY_A_M1: Lesson[] = [
  lesson('py-testing', 'assert and test functions', 5, [
    atWork('Felix', ['Last week a change to the fare code charged a family ₹0 for four seats. Nobody noticed for two days.', 'A test is code that checks your code. Run the tests after every change, and a mistake like that is caught in seconds.']),
    run('Check with assert', 'Pick a check to add.', ['def fare(seats, price):', '    return seats * price', 'assert fare(2, 450) == 900', '{{v}}', 'print("All checks passed")'], ['assert fare(0, 450) == 0', 'assert fare(4, 300) == 1200', 'assert fare(3, 100) == 400, "3 seats at 100 should be 300"'], { caption: 'assert does nothing when it is true, and stops with AssertionError (and your message) when it is false.' }),
    reveal('A good test', [
      ['One behaviour', 'test_two_seats checks one thing, so a failure says exactly what broke.', '🎯'],
      ['Edge cases', '0 seats, the biggest booking, an empty name: that is where bugs hide.', '🧱'],
      ['A clear name', 'test_zero_seats_costs_nothing reads like a sentence.', '🏷'],
      ['Fast and repeatable', 'The same answer every run, in milliseconds.', '⚡'],
    ]),
    predict('Which check fails?', ['def with_fee(fare):', '    return fare + 20', 'checks = [with_fee(100) == 120, with_fee(0) == 0, with_fee(450) == 470]', 'failed = checks.index(False)', 'print("Check", failed + 1, "failed")'], [
      [3, 'What will checks be?', ['[True, False, True]', '[True, True, True]', '[False, False, True]'], 'with_fee(0) is 20, not 0.', { var: 'checks' }],
      [5, 'What will it print?', ['Check 2 failed', 'Check 1 failed', 'Check 3 failed'], 'index finds the first False, at position 1.', { out: true }],
    ]),
    check('What does assert x == 5 do when x is 5?', ['Nothing; the program carries on', 'Prints True', 'Stops with an error', 'Sets x to 5'], 'assert only speaks up when something is wrong.', 'A silent check.'),
    tapbug('The test never fails, even when fare is wrong', ['def test_fare():', '    fare(2, 450) == 900'], [[2, 'fare(2, 450) == 900', 'assert fare(2, 450) == 900']], 'A comparison on its own works something out and throws it away. assert turns it into a check.'),
    recap([
      ['✅', 'assert stops loudly when a check is false'],
      ['🎯', 'One behaviour per test, with a clear name'],
      ['🧱', 'Test the edge cases'],
    ]),
  ]),

  lesson('py-a-1-2', 'unittest', 5, [
    explore('A test case', ['import unittest', 'class FareTest(unittest.TestCase):', '    def test_two_seats(self):', '        self.assertEqual(fare(2, 450), 900)', '    def test_no_seats_raises(self):', '        with self.assertRaises(ValueError):', '            fare(0, 450)', 'unittest.main()'], [
      [2, 'A class of tests that inherits from TestCase.'],
      [3, 'Every method whose name starts with test_ is a test.'],
      [4, 'assertEqual shows both values when they differ.'],
      [6, 'assertRaises passes only if the code inside raises that error.'],
      [8, 'Run every test and report.'],
    ], { minTaps: 3 }),
    run('Make the tests pass', 'Pick a first line for fare. Can you make both tests pass?', ['import io, unittest', 'def fare(seats, price):', '    {{v}}', '    return seats * price', 'class FareTest(unittest.TestCase):', '    def test_two_seats(self):', '        self.assertEqual(fare(2, 450), 900)', '    def test_no_seats_raises(self):', '        with self.assertRaises(ValueError):', '            fare(0, 450)', 'suite = unittest.defaultTestLoader.loadTestsFromTestCase(FareTest)', 'result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)', 'print(f"Ran {result.testsRun} tests: {len(result.failures)} failed")'], ['pass', 'if seats < 0: raise ValueError("no seats")', 'if seats < 1: raise ValueError("no seats")'], { goal: 'Ran 2 tests: 0 failed', caption: 'The tests describe the rule. You change the code until they pass.' }),
    matchUp('Which assert?', [['assertEqual(a, b)', 'a == b'], ['assertTrue(x)', 'x is true'], ['assertIn(x, items)', 'x is in items'], ['assertRaises(Error)', 'The code raises Error']], 'unittest’s checks say exactly what was expected.'),
    check('Which method is run as a test?', ['test_refund_is_full', 'refund_test', 'check_refund', 'TestRefund'], 'unittest runs methods whose names start with test_.', 'Look at the start of the name.', { mono: true }),
    truth([
      ['A failing test is bad news', false, 'It is good news: it caught a bug before the users did.'],
      ['Each test should pass or fail on its own, in any order', true, 'Tests that depend on each other are fragile.'],
      ['pytest can run plain functions with plain assert', true, 'A popular tool outside the standard library.'],
    ]),
    tapbug('This test is never run', ['class FareTest(unittest.TestCase):', '    def check_two_seats(self):'], [[2, 'check_two_seats', 'test_two_seats']], 'Only methods named test_… are run.'),
    recap([
      ['🧪', 'unittest.TestCase groups tests'],
      ['🔍', 'assertEqual, assertIn, assertRaises say what you expect'],
      ['▶️', 'Methods named test_… are run'],
    ]),
  ]),

  lesson('py-a-1-3', 'Edge cases and test-first', 5, [
    atWork('Megan', ['A new rule from the desk: groups of 5 or more get 10% off, rounded to whole rupees.', 'This time, write the tests first. They spell out the rule before any code exists.']),
    reveal('Test first', [
      ['1. Red', 'Write a test for the new rule. It fails, because the code doesn’t exist yet.', '🔴'],
      ['2. Green', 'Write just enough code to make it pass.', '🟢'],
      ['3. Refactor', 'Tidy the code; the tests make sure nothing breaks.', '🧹'],
    ]),
    run('Find the edge', 'Pick a group size. Where does the discount start?', ['def group_fare(seats, price):', '    total = seats * price', '    if seats >= 5:', '        total = round(total * 0.9)', '    return total', 'print({{v}})'], ['group_fare(4, 300)', 'group_fare(5, 300)', 'group_fare(6, 333)', 'group_fare(0, 300)'], { caption: 'Test right at the edges: 4 and 5 seats, rounding, and 0.' }),
    predict('A bug on the edge', ['def group_fare(seats, price):', '    total = seats * price', '    if seats > 5:', '        total = round(total * 0.9)', '    return total', 'at_four = group_fare(4, 100)', 'at_five = group_fare(5, 100)', 'print(at_four, at_five)'], [
      [8, 'What will it print?', ['400 500', '400 450', '360 450'], 'The rule says 5 or more, but the code says more than 5. A test for exactly 5 catches it.', { out: true }],
    ]),
    check('Which seat counts best test “5 or more get 10% off”?', ['4, 5 and 6', 'Only 10', 'Only 5', '100 and 200'], 'Just below, on, and just above the edge.', 'Where could the rule go wrong?'),
    tapbug('A group of 5 pays full price', ['    if seats > 5:'], [[1, 'seats > 5', 'seats >= 5']], '“5 or more” is >= 5.'),
    recap([
      ['🔴', 'Red: a failing test for the new rule'],
      ['🟢', 'Green: just enough code to pass'],
      ['🧱', 'Test below, on and above every edge'],
    ]),
  ]),

  challenge('py-a-1-ch', 'Module 1 Challenge', { icon: '🧪', name: 'Tester' }, ['Check code with assert', 'Write test cases with unittest', 'Find edge cases and write tests first'], [
    mcq(1, 'What does assert do when its condition is False?', ['Raises AssertionError', 'Prints False', 'Nothing', 'Returns None'], 'It stops loudly.'),
    mcq(2, 'Which unittest method checks two values are equal?', ['assertEqual', 'assertSame', 'equals', 'checkEqual'], 'assertEqual(a, b).', { mono: true }),
    mcq(3, 'How do you test that code raises ValueError?', ['with self.assertRaises(ValueError):', 'self.assertError()', 'try: … except: pass', 'assert ValueError'], 'A with block around the code.', { mono: true }),
    mcq(4, 'What is an edge case?', ['A value at the limit of a rule, like exactly 5 seats', 'A rare Python error', 'The last test in a file', 'Code at the end of a function'], 'Where rules switch.'),
    mcq(5, 'In test-first, what comes first?', ['A failing test', 'The code', 'The refactor', 'The release'], 'Red, green, refactor.'),
    swipe([
      ['Test method names start with test_', true, 'That is how unittest finds them.'],
      ['One test should check many behaviours', false, 'One behaviour each, so failures are clear.'],
      ['Tests let you change code safely', true, 'They warn you if something breaks.'],
      ['A comparison on its own line checks something', false, 'Use assert.'],
    ]),
    pairs([['assert', 'A quick check'], ['TestCase', 'A group of tests'], ['assertRaises', 'Expect an error'], ['Red, green, refactor', 'Test first']], 'Testing tools.'),
    pickCode('Which checks that fare(0, 450) raises ValueError?', ['with self.assertRaises(ValueError): fare(0, 450)', 'self.assertEqual(fare(0, 450), ValueError)', 'assert fare(0, 450) == ValueError', 'self.assertTrue(ValueError)'], 'assertRaises wraps the call.'),
    bugTask(['def check_fare(self):', '    fare(2, 450) == 900', '    if seats > 5:'], [[1, 'check_fare', 'test_fare'], [2, 'fare(2, 450) == 900', 'self.assertEqual(fare(2, 450), 900)'], [3, 'seats > 5', 'seats >= 5']], 'Tests are named test_…, a comparison needs an assert, and “5 or more” is >= 5.'),
    predictTask(['results = [True, True, False, True]', 'passed = results.count(True)', 'print(f"{passed} of {len(results)} passed")'], 'What does it print?', ['3 of 4 passed', '4 of 4 passed', '1 of 4 passed', '3 of 3 passed'], 'Three True values out of four.'),
    arrange(['def fare(seats, price):', '    return seats * price', 'assert fare(2, 450) == 900', 'print("Test passed")'], 'write the function, check it, then report', ['Test passed']),
  ]),
];
