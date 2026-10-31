// Python Basic · Module 4 · Making decisions. Lesson 4.1 keeps the old module id (p-if-1).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, truth } from './kit';

const DELIVERY = ['if bill >= 500:', '    print("Free delivery!")', 'elif bill >= 300:', '    print("Delivery ₹20")', 'else:', '    print("Delivery ₹40")'];

export const PY_B_M4: Lesson[] = [
  lesson('p-if-1', 'True, False and comparisons', 4, [
    chat(['Programs make decisions all the time: is the password right? Is the bill over ₹500? Is the shop open?', 'Every decision starts with a question whose answer is True or False.']),
    run('Ask a question', 'Pick a comparison.', ['bill = 450', 'print({{v}})'], ['bill > 500', 'bill < 500', 'bill == 450', 'bill != 450', 'bill >= 450']),
    matchUp('Comparison signs', [['==', 'Equal to'], ['!=', 'Not equal to'], ['>=', 'More than or equal to'], ['<', 'Less than']], 'Each one gives True or False.'),
    predict('True or False?', ['age = 15', 'can_vote = age >= 18', 'is_teen = age > 12', 'print(can_vote, is_teen)'], [
      [2, 'What will can_vote be?', ['False', 'True', '15'], '15 is not 18 or more.', { var: 'can_vote' }],
      [3, 'What will is_teen be?', ['True', 'False', '12'], '15 is more than 12.', { var: 'is_teen' }],
    ]),
    tapbug('SyntaxError: invalid syntax', ['if bill = 500:'], [[1, 'bill = 500', 'bill == 500']], 'One = stores a value; == compares two values.'),
    recap([
      ['✅', 'Questions give True or False'],
      ['⚖️', '== compares; = stores'],
      ['🔣', '> < >= <= != compare values'],
    ]),
  ]),

  lesson('p-b-4-2', 'if, elif and else', 5, [
    run('Free delivery?', 'Pick a bill.', ['bill = {{v}}', ...DELIVERY], ['150', '350', '500', '800'], { goal: 'Free delivery!', caption: 'Only one branch runs: the first whose question is True.' }),
    explore('How Python decides', DELIVERY, [
      [1, 'Ask the first question. If True, run the indented line below, and skip the rest.'],
      [3, 'Only if the first was False: ask the next one.'],
      [5, 'If nothing above was True, else runs.'],
      [2, 'Indented lines belong to the if above them. Use four spaces.'],
    ], { minTaps: 3 }),
    predict('Which branch?', ['marks = 72', 'if marks >= 90:', '    grade = "A"', 'elif marks >= 60:', '    grade = "B"', 'else:', '    grade = "C"', 'print(grade)'], [
      [8, 'What will it print?', ['B', 'A', 'C'], '72 isn’t 90 or more, but it is 60 or more.', { out: true }],
    ]),
    check('What runs when no if or elif is True?', ['The else block', 'Nothing at all', 'The first if', 'An error'], 'else catches everything else.', 'The last one.'),
    tapbug('IndentationError: expected an indented block', ['if bill >= 500:', 'print("Free delivery!")'], [[2, 'print("Free delivery!")', '    print("Free delivery!")']], 'Lines inside an if must be indented.'),
    recap([
      ['❓', 'if runs its block when the question is True'],
      ['🔀', 'elif asks another; else catches the rest'],
      ['↔️', 'Indent the lines inside'],
    ]),
  ]),

  lesson('p-b-4-3', 'and, or, not', 4, [
    run('Combine questions', 'Pick a rule.', ['age = 16', 'has_id = True', 'print({{v}})'], ['age < 18 and has_id', 'age < 18 or has_id', 'not has_id', 'age > 18 and has_id']),
    reveal('Three words', [
      ['and', 'True only if both sides are True.'],
      ['or', 'True if at least one side is True.'],
      ['not', 'Flips True and False.'],
    ], { mono: true }),
    predict('Open or closed?', ['hour = 21', 'is_sunday = False', 'open_now = hour >= 8 and hour < 22 and not is_sunday', 'print(open_now)'], [
      [3, 'What will open_now be?', ['True', 'False', 'None'], 'After 8, before 22, and not Sunday: all three are True.', { var: 'open_now' }],
    ]),
    check('What is True or False?', ['True', 'False', 'None', 'An error'], 'One True side is enough for or.', 'or needs just one.', { mono: true }),
    truth([
      ['and needs both sides to be True', true, 'Both.'],
      ['or needs both sides to be True', false, 'One is enough.'],
      ['not True is False', true, 'not flips it.'],
    ]),
    recap([
      ['🤝', 'and: both'],
      ['🙌', 'or: at least one'],
      ['🔄', 'not: the opposite'],
    ]),
  ]),

  challenge('p-b-4-ch', 'Module 4 Challenge', { icon: '🔀', name: 'Decision Maker' }, ['Ask True or False questions', 'Choose with if, elif and else', 'Combine questions with and, or and not'], [
    mcq(1, 'What does 3 > 5 give?', ['False', 'True', '3', 'An error'], '3 is not more than 5.', { mono: true }),
    mcq(2, 'Which compares two values?', ['==', '=', '=>', '<>'], 'Two equals signs.', { mono: true }),
    mcq(3, 'When does else run?', ['When nothing above it was True', 'Always', 'First', 'Never'], 'It catches the rest.'),
    mcq(4, 'What is True and False?', ['False', 'True', 'None', 'An error'], 'and needs both.', { mono: true }),
    mcq(5, 'What is not False?', ['True', 'False', 'None', '0'], 'not flips it.', { mono: true }),
    swipe([
      ['= compares two values', false, '== compares.'],
      ['elif is checked only if the if above was False', true, 'Top to bottom.'],
      ['Lines inside an if must be indented', true, 'Four spaces.'],
      ['or needs both sides True', false, 'One is enough.'],
    ]),
    pairs([['if', 'Ask a question'], ['elif', 'Ask another'], ['else', 'Otherwise'], ['and', 'Both are true']], 'Decision words.'),
    pickCode('Which gives free delivery for bills of ₹500 or more?', ['if bill >= 500:', 'if bill > 500:', 'if bill = 500:', 'if bill => 500:'], '“Or more” is >=.'),
    bugTask(['if bill = 500:', 'print("Free")', 'elif bill > 300'], [[1, 'bill = 500', 'bill == 500'], [2, 'print("Free")', '    print("Free")'], [3, 'bill > 300', 'bill > 300:']], 'Compare with ==, indent the inside, and end the question with a colon.'),
    predictTask(['temp = 31', 'if temp > 35:', '    drink = "Iced Tea"', 'elif temp > 25:', '    drink = "Lemon Tea"', 'else:', '    drink = "Hot Tea"', 'print(drink)'], 'What does it print?', ['Lemon Tea', 'Iced Tea', 'Hot Tea', 'Nothing'], '31 isn’t above 35, but it is above 25.'),
    arrange(['bill = 600', 'if bill >= 500:', '    print("Free delivery!")'], 'set the bill, ask the question, then the indented answer', ['Free delivery!']),
  ]),
];
