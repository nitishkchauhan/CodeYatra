// Logic Foundations · Modules 1–5 (Basic): algorithms, turns and order, loops, patterns, and variables. The first
// four lessons end with a Yatri block puzzle (checked by the game tests); code screens are small Python programs
// that run for real in tests. Each module’s lesson keeps its old id.
import type { Lesson, PuzzleStep } from '../../types';
import { LOGIC_FOUNDATIONS as OLD } from '../logicFoundations';
import { arrange, bugTask, chat, check, explore, kit, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, task, toggleRun } from '../placementV5/kit';

const { lesson, challenge } = kit('python');
const puzzle = (levelId: string, task: string): PuzzleStep => ({ type: 'puzzle', levelId, task });
const CODE = 'TASK 6 OF 6 · YOUR PROGRAM';

export const F_M1: Lesson[] = [
  lesson('f-seq-1', 'Algorithms: step-by-step instructions', 5, [
    chat(['Meet Yatri, an explorer who only understands exact commands like “move” and “turn right”.', 'A list of clear steps that solves a problem is called an algorithm. A recipe is one. So is every computer program.']),
    reveal('A good algorithm is…', [
      ['Clear', 'Each step means exactly one thing.'],
      ['In order', 'Steps run one after another, top to bottom.'],
      ['Finished', 'It stops after a fixed number of steps.'],
      ['Correct', 'It solves the problem every time.'],
    ]),
    toggleRun('Order matters', [
      ['Wrong order', ['print("Pour the tea")', 'print("Boil the water")', 'print("Add tea leaves")'], 'The computer does exactly what it is told, even when it makes no sense.', ['Pour the tea', 'Boil the water', 'Add tea leaves']],
      ['Right order', ['print("Boil the water")', 'print("Add tea leaves")', 'print("Pour the tea")'], 'Same steps, sensible order.', ['Boil the water', 'Add tea leaves', 'Pour the tea']],
    ]),
    explore('Yatri as a program', ['def move():', '    print("Yatri moves forward")', '', 'move()', 'move()'], [
      [1, 'This teaches the computer a new command called move.'],
      [4, 'Each move() is one step, like one block in the puzzle.'],
      [5, 'Two moves: Yatri goes forward two squares.'],
    ]),
    puzzle('first-steps', 'Walk Yatri to the flag'),
    check('Which of these is an algorithm?', ['The steps to tie your shoelaces', 'A photo of a shoe', 'The colour blue', 'The word “shoe”'], 'A list of steps that gets something done.', 'Look for steps.'),
    recap([
      ['🧭', 'An algorithm is a list of clear steps'],
      ['🔢', 'Computers follow steps exactly, in order'],
      ['🧩', 'Each block is one command'],
    ]),
  ]),

  challenge('f-b-1-ch', 'Module 1 Challenge', { icon: '🧭', name: 'Step Planner' }, ['Explain what an algorithm is', 'Put steps in the right order', 'Read a tiny program'], [
    mcq(1, 'What is an algorithm?', ['A list of clear steps that solves a problem', 'A kind of computer', 'A game', 'A picture'], 'Steps.'),
    mcq(2, 'What happens if two steps are swapped?', ['The result can be wrong', 'The computer fixes it', 'Nothing', 'The program gets faster'], 'Order matters.'),
    mcq(3, 'How does a computer follow steps?', ['Exactly, one at a time, in order', 'It guesses', 'In any order', 'Only the important ones'], 'No guessing.'),
    mcq(4, 'Which is NOT a good algorithm step?', ['“Make it nice”', '“Move forward 1 square”', '“Turn right”', '“Pick up the gem”'], 'Too vague.'),
    mcq(5, 'A recipe is…', ['An algorithm', 'A program language', 'A computer', 'A bug'], 'Steps in order.'),
    swipe([
      ['A computer can guess what you meant', false, 'It follows exactly.'],
      ['An algorithm must finish', true, 'A fixed number of steps.'],
      ['Each puzzle block is one command', true, 'One step.'],
      ['Order never matters', false, 'It often does.'],
    ]),
    pairs([['Algorithm', 'Steps'], ['Block', 'Command'], ['Program', 'Typed steps'], ['Bug', 'Mistake']], 'Words.'),
    pickCode('Which prints the steps in a sensible order?', ['print("Wet the brush"); print("Add toothpaste"); print("Brush")', 'print("Brush"); print("Wet the brush"); print("Add toothpaste")', 'print("Add toothpaste"); print("Brush"); print("Wet the brush")', 'print("Brush")'], 'Prepare, then brush.'),
    bugTask(['print("Put on shoes")', 'print("Put on socks")'], [[1, 'Put on shoes', 'Put on socks'], [2, 'Put on socks', 'Put on shoes']], 'Socks go on before shoes.'),
    predictTask(['steps = ["Boil", "Add leaves", "Pour"]', 'print(steps[-1])'], 'What does it print?', ['Pour', 'Boil', 'Add leaves', 'steps'], 'The last step.'),
    arrange(['print("Wet the brush")', 'print("Add toothpaste")', 'print("Brush for two minutes")', 'print("Rinse")'], 'wet, paste, brush, rinse', ['Wet the brush', 'Add toothpaste', 'Brush for two minutes', 'Rinse']),
  ]),

  lesson('f-seq-2', 'Turns, direction and order', 5, [
    chat(['Turning doesn’t move Yatri to a new square. It only changes the way Yatri faces. The next move goes in that new direction.', 'Plan the route on the board first, then build it block by block.']),
    toggleRun('Where does Yatri face?', [
      ['Turn once', ['facing = ["up", "right", "down", "left"]', 'turns = 1', 'print("Facing", facing[turns % 4])'], 'Starting up, one right turn faces right.', ['Facing right']],
      ['Turn twice', ['facing = ["up", "right", "down", "left"]', 'turns = 2', 'print("Facing", facing[turns % 4])'], 'Two right turns: facing back the other way.', ['Facing down']],
      ['Turn four times', ['facing = ["up", "right", "down", "left"]', 'turns = 4', 'print("Facing", facing[turns % 4])'], 'Four right turns: back where you started.', ['Facing up']],
    ]),
    run('Turn until you face left', 'Change the number of right turns.', ['facing = ["up", "right", "down", "left"]', 'print("Facing", facing[{{v}} % 4])'], ['1', '2', '3'], { goal: 'Facing left' }),
    tapbug('Yatri walks into the wall', ['move()', 'move()', 'turn_right()'], [[2, 'move()', 'turn_right()'], [3, 'turn_right()', 'move()']], 'Turn first, then move in the new direction.'),
    puzzle('turn-corner', 'Pick up the gem, then reach the flag'),
    check('Yatri faces up and turns right twice. Which way now?', ['Down', 'Up', 'Left', 'Right'], 'Two quarter turns.', 'Half a circle.'),
    recap([
      ['↪', 'A turn changes direction, not the square'],
      ['🗺', 'Plan the route first'],
      ['🔢', 'One wrong step changes everything after it'],
    ]),
  ]),

  challenge('f-b-2-ch', 'Module 2 Challenge', { icon: '↪', name: 'Route Finder' }, ['Track which way Yatri faces', 'Plan a route before building', 'Fix steps in the wrong order'], [
    mcq(1, 'What does a turn do?', ['Changes the direction Yatri faces', 'Moves Yatri one square', 'Picks up a gem', 'Ends the program'], 'Direction only.'),
    mcq(2, 'Facing up, turn right three times. Now facing…', ['Left', 'Right', 'Down', 'Up'], 'Three quarters.'),
    mcq(3, 'Four right turns leave Yatri facing…', ['The same way as before', 'The opposite way', 'Left', 'Down'], 'A full circle.'),
    mcq(4, 'What should you do before building the route?', ['Plan it on the board', 'Add random blocks', 'Press run many times', 'Nothing'], 'Plan first.'),
    mcq(5, 'One wrong step early in a route…', ['Changes everything after it', 'Doesn’t matter', 'Fixes itself', 'Only changes the last step'], 'Order.'),
    swipe([
      ['Turning moves Yatri forward', false, 'Only changes direction.'],
      ['Two right turns face the opposite way', true, 'Half a turn.'],
      ['Planning saves time', true, 'Fewer mistakes.'],
      ['Three right turns equal one left turn', true, 'Same direction.'],
    ]),
    pairs([['move', 'One square'], ['turn right', 'Quarter turn'], ['pick', 'Take a gem'], ['plan', 'Before building']], 'Commands.'),
    pickCode('Facing up, which gets Yatri to face left?', ['turn_right(); turn_right(); turn_right()', 'turn_right()', 'move(); move()', 'turn_right(); turn_right()'], 'Three quarter turns.'),
    bugTask(['facing = ["up", "right", "down", "left"]', 'print(facing[4])'], [[2, 'facing[4]', 'facing[4 % 4]']], 'There are only 4 directions: wrap around with % 4.'),
    predictTask(['facing = ["up", "right", "down", "left"]', 'turns = 0', 'for step in ["R", "R", "R", "R", "R"]:', '    turns += 1', 'print(facing[turns % 4])'], 'What does it print?', ['right', 'up', 'left', 'down'], 'Five turns: one full circle plus one.'),
    arrange(['print("Start facing up")', 'print("Turn right")', 'print("Move forward")', 'print("Reach the flag")'], 'start, turn, move, finish', ['Start facing up', 'Turn right', 'Move forward', 'Reach the flag']),
  ]),

  lesson('f-loop-1', 'Loops: repeat without rewriting', 6, [
    chat(['When the same steps repeat, writing them again and again is slow and easy to get wrong.', 'A loop says “repeat this n times”. In Python: for i in range(n):']),
    toggleRun('Repeat it', [
      ['Copy and paste', ['print("Yatri moves")', 'print("Yatri moves")', 'print("Yatri moves")'], 'Three lines for three moves.', ['Yatri moves', 'Yatri moves', 'Yatri moves']],
      ['A loop', ['for i in range(3):', '    print("Yatri moves")'], 'One loop, the same result. Change 3 to 100 and it still fits on two lines.', ['Yatri moves', 'Yatri moves', 'Yatri moves']],
      ['Counting', ['for i in range(1, 4):', '    print("Gem", i)'], 'The loop variable counts the rounds.', ['Gem 1', 'Gem 2', 'Gem 3']],
    ]),
    run('Collect five gems', 'Change how many times the loop runs.', ['gems = 0', 'for i in range({{v}}):', '    gems += 1', 'print("Gems:", gems)'], ['2', '3', '5'], { goal: 'Gems: 5' }),
    predict('Count the steps', ['steps = 0', 'for i in range(4):', '    steps += 2', 'print(steps)'], [
      [4, 'What is printed?', ['8', '4', '6'], '4 rounds × 2.', { out: true }],
    ]),
    puzzle('gem-row', 'Collect 3 gems, then reach the flag'),
    check('How many times does for i in range(5): run?', ['5', '4', '6', '1'], '0, 1, 2, 3, 4.', 'Count them.', { mono: true }),
    recap([
      ['🔁', 'A loop repeats steps'],
      ['🔢', 'range(n) runs n times'],
      ['✂', 'Shorter code, fewer mistakes'],
    ]),
  ]),

  challenge('f-b-3-ch', 'Module 3 Challenge', { icon: '🔁', name: 'Loop Starter' }, ['Spot repeated steps', 'Write a for loop', 'Count the rounds'], [
    mcq(1, 'Why use a loop?', ['To repeat steps without rewriting them', 'To make the program slower', 'To stop the program', 'To add colours'], 'Repeat.'),
    mcq(2, 'range(3) gives…', ['0, 1, 2', '1, 2, 3', '3', '0, 1, 2, 3'], 'Starts at 0.', { mono: true }),
    mcq(3, 'A loop runs 2 times and has 2 print lines inside. How many lines are printed?', ['4', '2', '1', '0'], '2 rounds × 2 lines.'),
    mcq(4, 'What marks the lines inside a Python loop?', ['Indentation (spaces at the start)', 'Brackets', 'Capital letters', 'Colours'], 'Four spaces.'),
    mcq(5, 'for i in range(1, 4): print(i) prints…', ['1 2 3', '1 2 3 4', '0 1 2 3', '4'], 'Up to 3.', { mono: true }),
    swipe([
      ['A loop can repeat 100 times in two lines', true, 'Change the number.'],
      ['range(5) includes 5', false, '0 to 4.'],
      ['The loop body must be indented', true, 'That is how Python knows.'],
      ['Loops make code longer', false, 'Shorter.'],
    ]),
    pairs([['for', 'Repeat'], ['range(4)', '4 times'], ['i', 'Round number'], ['indent', 'Inside the loop']], 'Loop words.'),
    pickCode('Which prints “Hi” four times?', ['for i in range(4): print("Hi")', 'for i in range(3): print("Hi")', 'print("Hi" 4)', 'repeat 4: print("Hi")'], 'range(4).'),
    bugTask(['for i in range(3)', 'print("Move")'], [[1, 'range(3)', 'range(3):'], [2, 'print("Move")', '    print("Move")']], 'A colon after the loop, and indent its body.'),
    predictTask(['total = 0', 'for i in range(1, 5):', '    total += i', 'print(total)'], 'What does it print?', ['10', '15', '4', '6'], '1 + 2 + 3 + 4.'),
    arrange(['gems = 0', 'for i in range(3):', '    gems += 1', 'print("Gems:", gems)'], 'start, loop, count, print', ['Gems: 3']),
  ]),

  lesson('f-loop-2', 'Patterns and decomposition', 6, [
    chat(['Big problems get easier when you break them into small parts. That is decomposition.', 'Then look for parts that repeat. That is a pattern, and a loop can repeat it.']),
    reveal('Thinking like a programmer', [
      ['Decomposition', 'Break the problem into small steps.'],
      ['Pattern', 'Spot the steps that repeat.'],
      ['Abstraction', 'Give a repeated group a name, like climb_step.'],
      ['Algorithm', 'Put the steps in order.'],
    ]),
    toggleRun('A staircase', [
      ['Spelled out', ['print("up, right")', 'print("up, right")', 'print("up, right")'], 'Each stair is “up, then right”.', ['up, right', 'up, right', 'up, right']],
      ['Named and looped', ['def climb_step():', '    print("up, right")', 'for i in range(3):', '    climb_step()'], 'Name the pattern, then repeat it.', ['up, right', 'up, right', 'up, right']],
    ]),
    matchUp('Which idea?', [['Splitting “make breakfast” into small jobs', 'Decomposition'], ['Noticing every stair is the same', 'Pattern'], ['Calling the stair moves climb_step', 'Abstraction']], 'Computational thinking.'),
    puzzle('stairs', 'Climb the staircase: collect every gem and reach the flag'),
    check('Every stair is “up, right”. The best plan is…', ['A loop around “up, right”', 'Write every move by hand', 'Skip some stairs', 'Turn around'], 'Repeat the pattern.', 'It repeats.'),
    recap([
      ['🧩', 'Decompose: small steps'],
      ['🔁', 'Find the pattern and loop it'],
      ['🏷', 'Name a group of steps'],
    ]),
  ]),

  challenge('f-b-4-ch', 'Module 4 Challenge', { icon: '🧩', name: 'Pattern Spotter' }, ['Break problems into parts', 'Spot repeating patterns', 'Name and repeat a pattern'], [
    mcq(1, 'Breaking a problem into smaller parts is called…', ['Decomposition', 'Debugging', 'Looping', 'Typing'], 'Decompose.'),
    mcq(2, 'Spotting steps that repeat is finding a…', ['Pattern', 'Bug', 'Variable', 'Gem'], 'Repeat.'),
    mcq(3, 'Giving a group of steps one name is…', ['Abstraction', 'Decomposition', 'Sorting', 'Guessing'], 'A name hides detail.'),
    mcq(4, 'A staircase of 5 identical stairs needs…', ['A loop that runs 5 times', '5 different programs', 'No plan', 'Random moves'], 'Repeat.'),
    mcq(5, 'Which is a pattern in “up, right, up, right, up, right”?', ['“up, right” three times', '“up” once', '“right, right”', 'None'], 'The repeated pair.'),
    swipe([
      ['Decomposition makes big problems easier', true, 'Small steps.'],
      ['A pattern can be repeated with a loop', true, 'That is the point.'],
      ['Abstraction means writing every detail every time', false, 'It hides detail behind a name.'],
      ['Programmers plan before coding', true, 'Usually.'],
    ]),
    pairs([['Decomposition', 'Break down'], ['Pattern', 'Repeats'], ['Abstraction', 'Name it'], ['Algorithm', 'Order it']], 'Thinking skills.'),
    pickCode('Which repeats the stair pattern 4 times?', ['for i in range(4): climb_step()', 'climb_step(4)', 'for climb_step in 4: go()', 'repeat climb_step'], 'Loop the named step.'),
    bugTask(['def climb_step():', '    print("up")', 'for i in range(3):', '    climb_step()'], [[2, 'print("up")', 'print("up, right")']], 'Each stair is up AND right.'),
    predictTask(['def stair():', '    return 2', 'moves = 0', 'for i in range(5):', '    moves += stair()', 'print(moves)'], 'What does it print?', ['10', '5', '7', '2'], '5 stairs × 2 moves.'),
    arrange(['def climb_step():', '    print("up, right")', 'for i in range(2):', '    climb_step()'], 'name the pattern, its moves, loop, call it', ['up, right', 'up, right']),
  ]),

  lesson('f-var-1', 'Variables: labelled boxes', 6, [
    chat(['A variable is a labelled box that holds a value. gems = 3 puts 3 in a box called gems.', 'You can read the box, and put a new value in it whenever you like.']),
    toggleRun('Boxes', [
      ['Make and read', ['gems = 3', 'name = "Yatri"', 'print(name, "has", gems, "gems")'], 'Numbers and text in boxes.', ['Yatri has 3 gems']],
      ['Change', ['gems = 3', 'gems = gems + 2', 'print(gems)'], 'Read the old value, add 2, store it back.', ['5']],
      ['Maths', ['price = 20', 'cups = 3', 'total = price * cups', 'print("Total:", total)'], '* multiplies, / divides, + and - as usual.', ['Total: 60']],
    ]),
    run('Fill the bill', 'Change the number of cups until the total is 100.', ['price = 20', 'cups = {{v}}', 'print("Total:", price * cups)'], ['2', '4', '5'], { goal: 'Total: 100' }),
    predict('Follow the boxes', ['a = 5', 'b = a', 'a = 9', 'print(a, b)'], [
      [3, 'What is b?', ['5', '9', '0'], 'b got a copy of 5 before a changed.', { var: 'b' }],
      [4, 'What is printed?', ['9 5', '9 9', '5 5'], 'a changed; b didn’t.', { out: true }],
    ]),
    tapbug('NameError: name ’Gems’ is not defined', ['gems = 3', 'print(Gems)'], [[2, 'Gems', 'gems']], 'Names are case-sensitive: gems and Gems are different boxes.'),
    check('After x = 4 and x = x * 2, what is x?', ['8', '4', '6', '42'], 'Read 4, double it, store it.', 'Old value first.', { mono: true }),
    recap([
      ['📦', 'A variable is a labelled box'],
      ['🔄', 'x = x + 1 reads, changes and stores'],
      ['🔤', 'Names are case-sensitive'],
    ]),
  ]),

  challenge('f-b-5-ch', 'Module 5 Challenge', { icon: '📦', name: 'Box Keeper' }, ['Make and change variables', 'Do maths with variables', 'Avoid name mistakes'], [
    mcq(1, 'What does gems = 3 do?', ['Puts 3 in a box called gems', 'Checks if gems is 3', 'Prints 3', 'Makes 3 gems appear'], 'Assignment.', { mono: true }),
    mcq(2, 'After a = 2; a = a + 5, a is…', ['7', '2', '5', '25'], 'Add and store.', { mono: true }),
    mcq(3, 'Which is a text value?', ['"Yatri"', 'Yatri', '3', 'True'], 'Quotes.', { mono: true }),
    mcq(4, 'Are score and Score the same variable?', ['No', 'Yes', 'Only for numbers', 'Only in loops'], 'Case-sensitive.'),
    mcq(5, '7 * 3 is…', ['21', '10', '73', '4'], 'Multiply.', { mono: true }),
    swipe([
      ['A variable can change its value', true, 'That is why it is “variable”.'],
      ['= means “is equal to”', false, 'It means “store in”.'],
      ['Text goes in quotes', true, '"Hello".'],
      ['A name can start with a number', false, 'Start with a letter or _.'],
    ]),
    pairs([['x = 5', 'Store'], ['print(x)', 'Show'], ['x + 1', 'Add'], ['"hi"', 'Text']], 'Variable basics.'),
    pickCode('Which adds 1 to lives?', ['lives = lives + 1', 'lives + 1', 'lives == lives + 1', '1 = lives'], 'Store the new value.'),
    bugTask(['score = 10', 'print("Score: " + score)'], [[2, '+ score', '+ str(score)']], 'Turn the number into text before joining it to text.'),
    predictTask(['coins = 10', 'coins = coins - 3', 'coins = coins * 2', 'print(coins)'], 'What does it print?', ['14', '17', '7', '20'], '(10 − 3) × 2.'),
    task(OLD, 'f-var-1', CODE),
  ]),
];
