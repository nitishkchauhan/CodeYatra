// SQL · Modules 1–6 (Basic): SELECT, WHERE, patterns and NULL, sorting, aggregates, and grouping. Queries run on
// the sample railway database (trains, bookings, passengers). Each module’s first lesson keeps its old id.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, compare, explore, lesson, matchUp, mcq, pairs, pickCode, place, recap, reveal, run, swipe, tables, tapbug, truth, xray } from './kit';

export const SQL_M1: Lesson[] = [
  lesson('sql-select', 'Databases and SELECT', 7, [
    chat(['A database keeps data in tables: rows and columns, like a spreadsheet that thousands of people can use at once.', 'SQL (Structured Query Language) is how you ask a database questions. Almost every app you use runs SQL somewhere.']),
    explore('The sample railway database', ['trains     – one row per train', 'bookings   – one row per booking', 'passengers – one row per person'], [
      [1, 'trains: id, name, from_city, to_city, fare and free seats.'],
      [2, 'bookings: which passenger booked how many seats on which train.'],
      [3, 'passengers: name, age, city and phone (some are missing: NULL).'],
    ], { page: tables('trains', 'bookings', 'passengers') }),
    run('Your first query', 'SELECT picks columns FROM a table. Try each choice and run it.', ['SELECT {{v}} FROM trains;'], ['name', 'name, fare', '*'], { goal: 'id | name | from_city | to_city | fare | seats', caption: '* means every column.' }),
    reveal('Reading a query', [
      ['SELECT', 'Which columns to show.'],
      ['FROM', 'Which table.'],
      [';', 'Ends the statement.'],
      ['Capitals', 'SQL words in capitals is a habit, not a rule: select works too.'],
    ], { mono: true }),
    check('Which shows every column of passengers?', ['SELECT * FROM passengers;', 'SELECT passengers;', 'SELECT all FROM passengers;', 'GET * FROM passengers;'], '* is every column.', 'Which word picks columns?', { mono: true }),
    recap([
      ['🗄', 'Databases keep data in tables'],
      ['🔎', 'SELECT columns FROM table'],
      ['✳', '* means every column'],
    ]),
  ]),

  lesson('sql-b-1-2', 'Calculations, aliases and DISTINCT', 7, [
    compare('Columns can be calculated', [
      ['Plain', ['SELECT name, fare FROM trains;'], 'The stored values.', ['name | fare', 'Coastal Express | 850', 'Silver Arrow | 1200', 'Harbour Royal | 3100', 'Keystone Express | 2100', 'Royal | 2900', 'Valley Express | 1750']],
      ['Calculated', ['SELECT name, fare, fare * 2 AS return_fare', 'FROM trains;'], 'fare * 2 for every row; AS names the new column.', ['name | fare | return_fare', 'Coastal Express | 850 | 1700', 'Silver Arrow | 1200 | 2400', 'Harbour Royal | 3100 | 6200', 'Keystone Express | 2100 | 4200', 'Royal | 2900 | 5800', 'Valley Express | 1750 | 3500']],
    ]),
    compare('DISTINCT removes repeats', [
      ['Every row', ['SELECT from_city FROM trains;'], 'Madrid and Dublin appear twice.', ['from_city', 'Madrid', 'Dublin', 'Kyoto', 'Barcelona', 'Madrid', 'Dublin']],
      ['DISTINCT', ['SELECT DISTINCT from_city FROM trains;'], 'Each value once.', ['from_city', 'Madrid', 'Dublin', 'Kyoto', 'Barcelona']],
    ]),
    place('Name a column', 'Show each passenger’s name and age in months, named months.', [['SELECT name, age * ', { gap: 0 }, ' ', { gap: 1 }, ' months'], ['FROM passengers;']], ['12', 'AS', '100', 'IS'], ['12', 'AS'], 'age * 12 AS months: a calculated column with a name.'),
    tapbug('The column is called “fare * 2” in the app', ['SELECT name, fare * 2', 'FROM trains;'], [[1, 'fare * 2', 'fare * 2 AS return_fare']], 'Give calculated columns a name with AS.'),
    check('What does SELECT DISTINCT to_city FROM trains; give?', ['Each destination once', 'Only cities with one train', 'The trains sorted by city', 'An error'], 'Repeats are removed.', 'What does DISTINCT remove?'),
    recap([
      ['🧮', 'Columns can be calculated: fare * 2'],
      ['🏷', 'AS gives a column a name (an alias)'],
      ['1️⃣', 'DISTINCT shows each value once'],
    ]),
  ]),

  challenge('sql-b-1-ch', 'Module 1 Challenge', { icon: '🔎', name: 'Query Starter' }, ['Read tables with SELECT', 'Calculate and name columns', 'Remove repeats with DISTINCT'], [
    mcq(1, 'What does SQL stand for?', ['Structured Query Language', 'Simple Question Logic', 'Server Query List', 'Stored Quick Lookup'], 'The language of databases.'),
    mcq(2, 'Which picks the table?', ['FROM', 'SELECT', 'TABLE', 'IN'], 'SELECT picks columns.', { mono: true }),
    mcq(3, 'What does * mean in SELECT *?', ['Every column', 'Every row', 'Multiply', 'Nothing'], 'All columns.', { mono: true }),
    mcq(4, 'Which gives a column a name?', ['AS', 'NAME', 'IS', 'LABEL'], 'An alias.', { mono: true }),
    mcq(5, 'What does DISTINCT do?', ['Removes repeated rows', 'Sorts rows', 'Counts rows', 'Deletes rows'], 'Each value once.', { mono: true }),
    swipe([
      ['A table has rows and columns', true, 'Like a spreadsheet.'],
      ['SELECT changes the data', false, 'It only reads.'],
      ['SQL keywords must be in capitals', false, 'A habit, not a rule.'],
      ['fare * 2 is calculated for each row', true, 'Row by row.'],
    ]),
    pairs([['SELECT', 'Columns'], ['FROM', 'Table'], ['AS', 'Alias'], ['DISTINCT', 'No repeats']], 'The first SQL words.'),
    pickCode('Which shows each departure city once?', ['SELECT DISTINCT from_city FROM trains;', 'SELECT from_city FROM trains;', 'SELECT ONCE from_city FROM trains;', 'SELECT from_city DISTINCT FROM trains;'], 'DISTINCT after SELECT.'),
    bugTask(['SELECT name fare FROM trains;', 'SELECT DISTINCT FROM trains city;'], [[1, 'name fare', 'name, fare'], [2, 'DISTINCT FROM trains city', 'DISTINCT from_city FROM trains']], 'Separate columns with commas; columns go before FROM.'),
    xray(['name | return_fare', 'Royal | 5800'], [
      ['th:nth-child(2)', 'The column name', 'AS return_fare', ['AS return_fare', 'fare * 2', 'FROM trains']],
      ['tr:nth-child(2) td:nth-child(2)', 'The doubled fare', 'fare * 2', ['AS return_fare', 'fare * 2', 'FROM trains']],
    ]),
    arrange(['SELECT name,', 'fare * 2 AS return_fare', 'FROM trains;'], 'columns, the calculated column, then the table', ['name | return_fare', 'Coastal Express | 1700', 'Silver Arrow | 2400', 'Harbour Royal | 6200', 'Keystone Express | 4200', 'Royal | 5800', 'Valley Express | 3500']),
  ]),

  lesson('sql-where', 'Filtering with WHERE', 7, [
    chat(['Most of the time you don’t want every row. WHERE keeps only the rows that match a condition.', 'Comparisons: = equal, <> not equal, <, >, <= and >=. Text goes in single quotes.']),
    run('Filter the trains', 'Change the condition and run it. Find the train with no free seats.', ['SELECT name, seats FROM trains', 'WHERE {{v}};'], ['fare > 2000', "from_city = 'Dublin'", 'seats = 0'], { goal: 'Silver Arrow | 0' }),
    compare('AND or OR?', [
      ['AND', ['SELECT name, fare FROM trains', "WHERE from_city = 'Dublin' AND fare < 1500;"], 'Both must be true.', ['name | fare', 'Silver Arrow | 1200']],
      ['OR', ['SELECT name, fare FROM trains', "WHERE from_city = 'Dublin' OR fare < 1500;"], 'Either is enough.', ['name | fare', 'Coastal Express | 850', 'Silver Arrow | 1200', 'Valley Express | 1750']],
      ['NOT', ['SELECT name FROM trains', "WHERE NOT to_city = 'Dublin';"], 'Turns a condition around.', ['name', 'Coastal Express', 'Silver Arrow', 'Valley Express']],
    ]),
    tapbug('Error: no such column: Madrid', ['SELECT name FROM trains', 'WHERE from_city = "Madrid";'], [[2, '"Madrid"', "'Madrid'"]], 'Text values use single quotes. Double quotes mean a column name.'),
    check('Which keeps trains from Madrid that cost under 1000?', ["WHERE from_city = 'Madrid' AND fare < 1000", "WHERE from_city = 'Madrid' OR fare < 1000", "WHERE from_city = Madrid, fare < 1000", "WHERE 'Madrid' AND 1000"], 'Both must be true: AND.', 'Both, or either?', { mono: true }),
    recap([
      ['🔍', 'WHERE keeps matching rows'],
      ['⚖', '=, <>, <, >, <=, >='],
      ['🔗', 'AND (both), OR (either), NOT'],
    ]),
  ]),

  lesson('sql-b-2-2', 'Mixing AND and OR', 7, [
    reveal('Which goes first?', [
      ['AND before OR', 'Like × before + in maths.'],
      ['Brackets win', 'Use ( ) to say exactly what you mean.'],
      ['Read it aloud', '“From Madrid or Dublin, and under 2000.”'],
    ]),
    compare('Brackets change the answer', [
      ['Without brackets', ['SELECT name, fare FROM trains', "WHERE from_city = 'Madrid' OR from_city = 'Dublin' AND fare < 2000;"], 'Read as: Madrid, or (Dublin and under 2000). Royal costs 2900 but is from Madrid.', ['name | fare', 'Coastal Express | 850', 'Silver Arrow | 1200', 'Royal | 2900', 'Valley Express | 1750']],
      ['With brackets', ['SELECT name, fare FROM trains', "WHERE (from_city = 'Madrid' OR from_city = 'Dublin') AND fare < 2000;"], 'From either city, and under 2000.', ['name | fare', 'Coastal Express | 850', 'Silver Arrow | 1200', 'Valley Express | 1750']],
    ]),
    place('Cheap or empty', 'Find trains under 1000, or with more than 50 free seats.', [['SELECT name FROM trains'], ['WHERE fare ', { gap: 0 }, ' 1000 ', { gap: 1 }, ' seats > 50;']], ['<', 'OR', '>', 'AND'], ['<', 'OR'], 'Either condition is enough, so OR.'),
    tapbug('Expensive Madrid trains show up', ['WHERE from_city = \'Madrid\' OR from_city = \'Kyoto\' AND fare < 1000'], [[1, "from_city = 'Madrid' OR from_city = 'Kyoto'", "(from_city = 'Madrid' OR from_city = 'Kyoto')"]], 'AND goes first. Bracket the ORs.'),
    check('In a OR b AND c, what runs first?', ['b AND c', 'a OR b', 'Left to right', 'It is an error'], 'AND before OR.', 'Like × and +.', { mono: true }),
    recap([
      ['✖', 'AND before OR'],
      ['( )', 'Brackets make it clear'],
      ['🗣', 'Read the condition aloud'],
    ]),
  ]),

  challenge('sql-b-2-ch', 'Module 2 Challenge', { icon: '🔍', name: 'Filter Finder' }, ['Filter rows with WHERE', 'Combine conditions', 'Use brackets to be exact'], [
    mcq(1, 'Which keeps only matching rows?', ['WHERE', 'SELECT', 'FROM', 'ORDER BY'], 'A condition.', { mono: true }),
    mcq(2, 'Which means “not equal”?', ['<>', '><', '=!', '!=='], 'Many databases also accept !=.', { mono: true }),
    mcq(3, 'How is text written in SQL?', ["In single quotes: 'Madrid'", 'In double quotes: "Madrid"', 'With no quotes', 'In backticks'], 'Double quotes are for names.'),
    mcq(4, 'What runs first: AND or OR?', ['AND', 'OR', 'Whichever is first', 'Both at once'], 'Use brackets to be sure.', { mono: true }),
    mcq(5, 'WHERE fare > 1000 AND fare < 2000 keeps…', ['Fares between 1000 and 2000, not including them', 'Every fare', 'Fares under 1000', 'Nothing'], 'Both must be true.'),
    swipe([
      ['OR needs both conditions to be true', false, 'Either one.'],
      ['NOT turns a condition around', true, 'True becomes false.'],
      ['Brackets can change the result', true, 'AND goes first otherwise.'],
      ['WHERE comes before FROM', false, 'SELECT, FROM, then WHERE.'],
    ]),
    pairs([['AND', 'Both'], ['OR', 'Either'], ['NOT', 'Opposite'], ['<>', 'Not equal']], 'Conditions.'),
    pickCode('Which finds trains to Dublin under 3000?', ["SELECT name FROM trains WHERE to_city = 'Dublin' AND fare < 3000;", "SELECT name FROM trains WHERE to_city = 'Dublin' OR fare < 3000;", 'SELECT name FROM trains WHERE to_city = Dublin AND fare < 3000;', "SELECT name WHERE to_city = 'Dublin' FROM trains;"], 'Text in quotes, both true.'),
    bugTask(['SELECT name FROM trains', 'WHERE to_city = "Vienna" AND seats => 10;'], [[2, '"Vienna"', "'Vienna'"], [2, '=>', '>=']], 'Single quotes for text, and >= for “at least”.'),
    xray(['name | fare', 'Silver Arrow | 1200'], [
      ['tr:nth-child(2) td:nth-child(1)', 'The only train left', "from_city = 'Dublin' AND fare < 1500", ["from_city = 'Dublin' AND fare < 1500", 'SELECT name, fare', 'FROM trains']],
      ['th:nth-child(2)', 'The fare column', 'SELECT name, fare', ["from_city = 'Dublin' AND fare < 1500", 'SELECT name, fare', 'FROM trains']],
    ]),
    arrange(['SELECT name, seats', 'FROM trains', 'WHERE seats = 0;'], 'columns, table, then the condition', ['name | seats', 'Silver Arrow | 0']),
  ]),

  lesson('sql-patterns', 'LIKE and wildcards', 7, [
    chat(['Sometimes you know only part of the text: names ending in “Express”, or starting with “R”.', 'LIKE matches patterns. % means “any text (or none)”, and _ means “exactly one character”.']),
    run('Patterns', 'Try each pattern.', ['SELECT name FROM trains', "WHERE name LIKE '{{v}}';"], ['%Express', 'R%', '%Royal%'], { goal: 'Harbour Royal' }),
    compare('% and _', [
      ['%', ['SELECT name FROM trains', "WHERE name LIKE '%Express';"], 'Anything, then “Express” at the end.', ['name', 'Coastal Express', 'Keystone Express', 'Valley Express']],
      ['_', ['SELECT name FROM passengers', "WHERE name LIKE '_e%';"], 'One character, then e, then anything.', ['name', 'Megan', 'Reed']],
    ]),
    tapbug('No trains are found', ["SELECT name FROM trains WHERE name = '%Express';"], [[1, "name = '%Express'", "name LIKE '%Express'"]], '= compares exactly; % only works with LIKE.'),
    check("Which names match LIKE 'K%'?", ['Kaden and Keystone Express', 'Only names ending in K', 'Names with exactly one K', 'None'], '% is any text after K.', 'Starts with K, then anything.'),
    recap([
      ['🧩', 'LIKE matches patterns'],
      ['%', '% is any text, even none'],
      ['_', '_ is exactly one character'],
    ]),
  ]),

  lesson('sql-b-3-2', 'IN, BETWEEN and NULL', 8, [
    compare('Shorter conditions', [
      ['IN', ['SELECT name, from_city FROM trains', "WHERE from_city IN ('Madrid', 'Kyoto');"], 'Matches any value in the list.', ['name | from_city', 'Coastal Express | Madrid', 'Harbour Royal | Kyoto', 'Royal | Madrid']],
      ['BETWEEN', ['SELECT name, fare FROM trains', 'WHERE fare BETWEEN 1000 AND 2000;'], 'From 1000 to 2000, including both ends.', ['name | fare', 'Silver Arrow | 1200', 'Valley Express | 1750']],
    ]),
    chat(['NULL means “no value”: a phone number nobody gave. It isn’t 0 and it isn’t empty text.', 'Because NULL is unknown, = NULL is never true. Use IS NULL and IS NOT NULL.']),
    compare('Finding NULLs', [
      ['= NULL', ['SELECT name, phone FROM passengers', 'WHERE phone = NULL;'], 'Nothing: = NULL is never true.', ['name | phone', '(no rows)']],
      ['IS NULL', ['SELECT name, phone FROM passengers', 'WHERE phone IS NULL;'], 'The right way.', ['name | phone', 'Reed | NULL', 'Megan | NULL']],
      ['COALESCE', ['SELECT name, COALESCE(city, \'Unknown\') AS city', 'FROM passengers;'], 'Shows a stand-in value for NULL.', ['name | city', 'Ava | Paris', 'Reed | Dublin', 'Kaden | Madrid', 'Megan | Barcelona', 'Zoey | Unknown']],
    ]),
    tapbug('Passengers with no city are never found', ['SELECT name FROM passengers WHERE city = NULL;'], [[1, 'city = NULL', 'city IS NULL']], 'Use IS NULL. = NULL is never true.'),
    check('Does BETWEEN 1000 AND 2000 include 2000?', ['Yes, both ends are included', 'No', 'Only 1000', 'Only in some databases'], 'Inclusive.', 'Check the first example.'),
    recap([
      ['📋', 'IN (list) for several values'],
      ['↔', 'BETWEEN a AND b, both ends included'],
      ['∅', 'IS NULL, IS NOT NULL, COALESCE'],
    ]),
  ]),

  challenge('sql-b-3-ch', 'Module 3 Challenge', { icon: '🧩', name: 'Pattern Spotter' }, ['Match text with LIKE', 'Use IN and BETWEEN', 'Handle NULL correctly'], [
    mcq(1, 'In LIKE, what does % mean?', ['Any text, even none', 'Exactly one character', 'A number', 'Percent'], '_ is one character.', { mono: true }),
    mcq(2, "Which matches 'Reed' and 'Megan'?", ["LIKE '_e%'", "LIKE 'e%'", "LIKE '%e'", "= '_e%'"], 'Second letter e.', { mono: true }),
    mcq(3, 'Which is the same as from_city = \'Madrid\' OR from_city = \'Kyoto\'?', ["from_city IN ('Madrid', 'Kyoto')", "from_city BETWEEN 'Madrid' AND 'Kyoto'", "from_city LIKE 'Madrid, Kyoto'", "from_city = ('Madrid', 'Kyoto')"], 'A list.', { mono: true }),
    mcq(4, 'How do you find missing phone numbers?', ['WHERE phone IS NULL', 'WHERE phone = NULL', "WHERE phone = ''", 'WHERE phone = 0'], 'IS NULL.', { mono: true }),
    mcq(5, 'What does COALESCE(city, \'Unknown\') do?', ['Shows Unknown when city is NULL', 'Deletes NULL cities', 'Counts cities', 'Joins cities'], 'A stand-in value.', { mono: true }),
    swipe([
      ['NULL is the same as 0', false, 'It means no value.'],
      ['BETWEEN includes both ends', true, 'Inclusive.'],
      ['% works with =', false, 'Only with LIKE.'],
      ['IN can replace several ORs', true, 'Shorter and clearer.'],
    ]),
    pairs([['LIKE', 'Patterns'], ['IN', 'A list'], ['BETWEEN', 'A range'], ['IS NULL', 'No value']], 'Conditions.'),
    pickCode('Which finds fares from 800 to 1500?', ['WHERE fare BETWEEN 800 AND 1500', 'WHERE fare IN (800, 1500)', 'WHERE fare LIKE 800-1500', 'WHERE fare = 800 TO 1500'], 'A range.'),
    bugTask(["SELECT name FROM trains WHERE name = 'R%';", 'SELECT name FROM passengers WHERE phone = NULL;'], [[1, "name = 'R%'", "name LIKE 'R%'"], [2, 'phone = NULL', 'phone IS NULL']], 'LIKE for patterns; IS NULL for missing values.'),
    xray(['name | city', 'Zoey | Unknown'], [
      ['tr:nth-child(2) td:nth-child(2)', 'The stand-in city', "COALESCE(city, 'Unknown')", ["COALESCE(city, 'Unknown')", 'WHERE city IS NULL', 'SELECT name']],
      ['tr:nth-child(2) td:nth-child(1)', 'The only passenger', 'WHERE city IS NULL', ["COALESCE(city, 'Unknown')", 'WHERE city IS NULL', 'SELECT name']],
    ]),
    arrange(['SELECT name, fare', 'FROM trains', 'WHERE fare BETWEEN 1000 AND 2000;'], 'columns, table, then the range', ['name | fare', 'Silver Arrow | 1200', 'Valley Express | 1750']),
  ]),

  lesson('sql-order', 'Sorting with ORDER BY', 7, [
    chat(['Without ORDER BY, a database may give rows in any order. It often looks sorted by id, but you can’t count on it.', 'ORDER BY sorts: ASC (smallest first, the default) or DESC (largest first).']),
    run('Sort the trains', 'Try each order. LIMIT 1 keeps only the first row. Find the dearest train.', ['SELECT name, fare FROM trains', 'ORDER BY {{v}}', 'LIMIT 1;'], ['fare', 'name', 'fare DESC'], { goal: 'Harbour Royal | 3100', caption: 'fare DESC puts the largest fare first.' }),
    compare('Sorting by two columns', [
      ['One column', ['SELECT to_city, name FROM trains', 'ORDER BY to_city;'], 'Three trains go to Dublin; their order among themselves isn’t fixed.', ['to_city | name', 'Boston | Silver Arrow', 'Copenhagen | Coastal Express', 'Dublin | Harbour Royal', 'Dublin | Keystone Express', 'Dublin | Royal', 'Vienna | Valley Express']],
      ['Two columns', ['SELECT to_city, name FROM trains', 'ORDER BY to_city, fare DESC;'], 'By city, then the dearest first within each city.', ['to_city | name', 'Boston | Silver Arrow', 'Copenhagen | Coastal Express', 'Dublin | Harbour Royal', 'Dublin | Royal', 'Dublin | Keystone Express', 'Vienna | Valley Express']],
    ]),
    tapbug('The cheapest train comes last', ['SELECT name, fare FROM trains ORDER BY fare DESC;'], [[1, 'ORDER BY fare DESC', 'ORDER BY fare']], 'DESC puts the largest first. Leave it out (or write ASC) for smallest first.'),
    check('What is the default sort order?', ['ASC: smallest first', 'DESC: largest first', 'Random', 'By id'], 'Ascending.', 'Which way, if you write nothing?'),
    recap([
      ['↕', 'ORDER BY column ASC or DESC'],
      ['2️⃣', 'Several columns: the next breaks ties'],
      ['🎲', 'No ORDER BY means no promised order'],
    ]),
  ]),

  lesson('sql-b-4-2', 'LIMIT and OFFSET', 7, [
    compare('The top few', [
      ['Top 3', ['SELECT name, fare FROM trains', 'ORDER BY fare DESC', 'LIMIT 3;'], 'The three dearest trains.', ['name | fare', 'Harbour Royal | 3100', 'Royal | 2900', 'Keystone Express | 2100']],
      ['Page 2', ['SELECT name, fare FROM trains', 'ORDER BY fare', 'LIMIT 2 OFFSET 2;'], 'Skip 2, then take 2: rows 3 and 4.', ['name | fare', 'Valley Express | 1750', 'Keystone Express | 2100']],
    ]),
    reveal('Paging through results', [
      ['Page size', 'LIMIT 20: twenty rows per page.'],
      ['Page n', 'OFFSET (n − 1) × 20.'],
      ['Always sort', 'Without ORDER BY, pages can repeat or skip rows.'],
      ['Other databases', 'SQL Server: TOP 3 or OFFSET … FETCH. Oracle: FETCH FIRST 3 ROWS ONLY.'],
    ]),
    place('The cheapest two', 'Show the two cheapest trains.', [['SELECT name, fare FROM trains'], ['ORDER BY fare ', { gap: 0 }], [{ gap: 1 }, ' 2;']], ['ASC', 'LIMIT', 'DESC', 'TOP'], ['ASC', 'LIMIT'], 'Sort smallest first, then keep two.'),
    tapbug('The “three dearest” are random trains', ['SELECT name, fare FROM trains LIMIT 3;'], [[1, 'FROM trains LIMIT 3', 'FROM trains ORDER BY fare DESC LIMIT 3']], 'LIMIT without ORDER BY takes any three. Sort first.'),
    check('For pages of 10, what OFFSET gives page 3?', ['20', '30', '3', '10'], 'Skip the first two pages.', '(3 − 1) × 10.', { mono: true }),
    recap([
      ['✂', 'LIMIT n keeps n rows'],
      ['⏭', 'OFFSET skips rows: paging'],
      ['↕', 'Always ORDER BY before LIMIT'],
    ]),
  ]),

  challenge('sql-b-4-ch', 'Module 4 Challenge', { icon: '↕', name: 'Sort Master' }, ['Sort results by one or more columns', 'Take the top rows with LIMIT', 'Page through results'], [
    mcq(1, 'Which sorts largest first?', ['DESC', 'ASC', 'UP', 'TOP'], 'Descending.', { mono: true }),
    mcq(2, 'Where does ORDER BY go?', ['After WHERE', 'Before FROM', 'Before SELECT', 'Anywhere'], 'Near the end.'),
    mcq(3, 'What does LIMIT 5 do?', ['Keeps at most 5 rows', 'Skips 5 rows', 'Sorts by 5 columns', 'Rounds to 5'], 'The first five.', { mono: true }),
    mcq(4, 'What does OFFSET 10 do?', ['Skips the first 10 rows', 'Keeps 10 rows', 'Adds 10', 'Sorts by column 10'], 'For paging.', { mono: true }),
    mcq(5, 'Without ORDER BY, the row order is…', ['Not promised', 'Always by id', 'Always alphabetical', 'Random every time'], 'Often looks sorted, but no promise.'),
    swipe([
      ['ASC is the default', true, 'Smallest first.'],
      ['ORDER BY can use two columns', true, 'The second breaks ties.'],
      ['LIMIT without ORDER BY gives the top rows', false, 'Any rows.'],
      ['OFFSET comes before LIMIT in SQLite', false, 'LIMIT n OFFSET m.'],
    ]),
    pairs([['ORDER BY', 'Sort'], ['DESC', 'Largest first'], ['LIMIT', 'How many'], ['OFFSET', 'Skip']], 'Sorting and paging.'),
    pickCode('Which shows the two dearest trains?', ['SELECT name FROM trains ORDER BY fare DESC LIMIT 2;', 'SELECT name FROM trains LIMIT 2 ORDER BY fare DESC;', 'SELECT TOP name FROM trains;', 'SELECT name FROM trains ORDER BY fare LIMIT 2;'], 'Sort, then limit.'),
    bugTask(['SELECT name, fare FROM trains', 'LIMIT 3 ORDER BY fare DESC;'], [[2, 'LIMIT 3 ORDER BY fare DESC;', 'ORDER BY fare DESC LIMIT 3;']], 'ORDER BY comes before LIMIT.'),
    xray(['name | fare', 'Harbour Royal | 3100', 'Royal | 2900'], [
      ['tr:nth-child(2) td:nth-child(1)', 'The dearest first', 'ORDER BY fare DESC', ['ORDER BY fare DESC', 'LIMIT 2', 'SELECT name, fare']],
      ['table', 'Only two rows', 'LIMIT 2', ['ORDER BY fare DESC', 'LIMIT 2', 'SELECT name, fare']],
    ]),
    arrange(['SELECT name, fare', 'FROM trains', 'ORDER BY fare DESC', 'LIMIT 3;'], 'columns, table, sort, then limit', ['name | fare', 'Harbour Royal | 3100', 'Royal | 2900', 'Keystone Express | 2100']),
  ]),

  lesson('sql-agg', 'Counting and totals', 7, [
    chat(['Aggregate functions turn many rows into one answer: how many trains, the cheapest fare, the total seats.', 'COUNT, SUM, AVG, MIN and MAX.']),
    run('One answer from many rows', 'Try each function.', ['SELECT {{v}} AS answer FROM trains;'], ['COUNT(*)', 'MIN(fare)', 'MAX(fare)', 'SUM(seats)'], { goal: '139', caption: 'SUM(seats) adds up the free seats on every train.' }),
    compare('COUNT(*) or COUNT(column)?', [
      ['COUNT(*)', ['SELECT COUNT(*) AS everyone FROM passengers;'], 'Every row.', ['everyone', '5']],
      ['COUNT(phone)', ['SELECT COUNT(phone) AS with_phone FROM passengers;'], 'Only rows where phone isn’t NULL.', ['with_phone', '3']],
    ]),
    compare('Averages', [
      ['AVG', ['SELECT AVG(fare) AS average FROM trains;'], 'The exact average.', ['average', '1983.3333333333333']],
      ['ROUND(AVG)', ['SELECT ROUND(AVG(fare)) AS average FROM trains;'], 'Rounded.', ['average', '1983.0']],
    ]),
    tapbug('Error: misuse of aggregate function', ['SELECT name FROM trains WHERE fare = MAX(fare);'], [[1, 'WHERE fare = MAX(fare)', 'ORDER BY fare DESC LIMIT 1']], 'Aggregates can’t go in WHERE. Sort and take one (or use a subquery, later).'),
    check('How many rows does SELECT COUNT(*) FROM trains; give?', ['One', 'Six', 'None', 'One per train'], 'One answer.', 'An aggregate turns many into…'),
    recap([
      ['🔢', 'COUNT, SUM, AVG, MIN, MAX'],
      ['∅', 'COUNT(column) skips NULLs; COUNT(*) doesn’t'],
      ['1️⃣', 'Many rows in, one row out'],
    ]),
  ]),

  challenge('sql-b-5-ch', 'Module 5 Challenge', { icon: '🔢', name: 'Number Cruncher' }, ['Count rows', 'Add up and average values', 'Find the smallest and largest'], [
    mcq(1, 'Which counts every row?', ['COUNT(*)', 'SUM(*)', 'COUNT(1, 2)', 'TOTAL()'], 'Every row.', { mono: true }),
    mcq(2, 'Which finds the cheapest fare?', ['MIN(fare)', 'MAX(fare)', 'LOW(fare)', 'FIRST(fare)'], 'The smallest.', { mono: true }),
    mcq(3, 'What does COUNT(phone) skip?', ['Rows where phone is NULL', 'Duplicate phones', 'Nothing', 'Every row'], 'NULLs.'),
    mcq(4, 'Can MAX(fare) go in WHERE?', ['No, aggregates can’t go in WHERE', 'Yes', 'Only with DISTINCT', 'Only in SQLite'], 'Use HAVING or a subquery.'),
    mcq(5, 'Which adds values up?', ['SUM', 'COUNT', 'AVG', 'ADD'], 'A total.', { mono: true }),
    swipe([
      ['AVG gives the average', true, 'Sum divided by count.'],
      ['COUNT(*) skips NULLs', false, 'It counts every row.'],
      ['An aggregate without GROUP BY gives one row', true, 'One answer.'],
      ['ROUND(x) rounds to a whole number', true, 'Or ROUND(x, 2) for 2 places.'],
    ]),
    pairs([['COUNT', 'How many'], ['SUM', 'Total'], ['AVG', 'Average'], ['MAX', 'Largest']], 'Aggregates.'),
    pickCode('Which gives the total free seats?', ['SELECT SUM(seats) FROM trains;', 'SELECT COUNT(seats) FROM trains;', 'SELECT seats FROM trains;', 'SELECT TOTAL seats FROM trains;'], 'SUM adds.'),
    bugTask(['SELECT AVG(fare FROM trains;', 'SELECT COUNT() FROM passengers;'], [[1, 'AVG(fare FROM', 'AVG(fare) FROM'], [2, 'COUNT()', 'COUNT(*)']], 'Close the bracket, and count *.'),
    xray(['cheapest | dearest', '850 | 3100'], [
      ['tr:nth-child(2) td:nth-child(1)', 'The cheapest fare', 'MIN(fare)', ['MIN(fare)', 'MAX(fare)', 'COUNT(*)']],
      ['tr:nth-child(2) td:nth-child(2)', 'The dearest fare', 'MAX(fare)', ['MIN(fare)', 'MAX(fare)', 'COUNT(*)']],
    ]),
    arrange(['SELECT MIN(fare) AS cheapest,', 'MAX(fare) AS dearest', 'FROM trains;'], 'the smallest, the largest, then the table', ['cheapest | dearest', '850 | 3100']),
  ]),

  lesson('sql-group', 'GROUP BY', 8, [
    chat(['GROUP BY splits rows into groups that share a value, then an aggregate answers for each group.', '“How many trains leave each city?” is GROUP BY from_city with COUNT(*).']),
    run('One answer per group', 'Each passenger is one group. Try each aggregate, and find Ava’s total seats.', ['SELECT passenger, {{v}} AS answer', 'FROM bookings', 'GROUP BY passenger;'], ['COUNT(*)', 'SUM(seats)', 'MAX(seats)'], { goal: 'Ava | 4', caption: 'Ava booked twice: COUNT is 2, SUM of seats is 4.' }),
    compare('Groups', [
      ['Trains per city', ['SELECT from_city, COUNT(*) AS trains', 'FROM trains', 'GROUP BY from_city;'], 'One row per city.', ['from_city | trains', 'Barcelona | 1', 'Dublin | 2', 'Kyoto | 1', 'Madrid | 2']],
      ['Seats per passenger', ['SELECT passenger, SUM(seats) AS seats', 'FROM bookings', 'GROUP BY passenger;'], 'Ava booked twice: 2 + 2.', ['passenger | seats', 'Ava | 4', 'Kaden | 3', 'Megan | 1', 'Reed | 1']],
    ]),
    tapbug('Error: the name column isn’t grouped', ['SELECT from_city, name, COUNT(*)', 'FROM trains GROUP BY from_city;'], [[1, 'from_city, name, COUNT(*)', 'from_city, COUNT(*)']], 'Every column you show must be grouped or aggregated. Many databases refuse; SQLite picks a random name.'),
    check('What does GROUP BY passenger give with SUM(seats)?', ['One row per passenger with their total seats', 'One row in total', 'Every booking', 'Passengers sorted by seats'], 'Groups, then totals.', 'How many rows?'),
    recap([
      ['🗂', 'GROUP BY makes groups of rows'],
      ['🔢', 'Aggregates answer per group'],
      ['⚠', 'Show only grouped or aggregated columns'],
    ]),
  ]),

  lesson('sql-b-6-2', 'HAVING', 7, [
    reveal('WHERE or HAVING?', [
      ['WHERE', 'Filters rows, before grouping.'],
      ['HAVING', 'Filters groups, after grouping. It can use aggregates.'],
      ['Order', 'SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT.'],
    ]),
    compare('Filter the groups', [
      ['All groups', ['SELECT passenger, SUM(seats) AS seats', 'FROM bookings', 'GROUP BY passenger;'], 'Every passenger.', ['passenger | seats', 'Ava | 4', 'Kaden | 3', 'Megan | 1', 'Reed | 1']],
      ['HAVING', ['SELECT passenger, SUM(seats) AS seats', 'FROM bookings', 'GROUP BY passenger', 'HAVING SUM(seats) > 2;'], 'Only passengers with more than 2 seats.', ['passenger | seats', 'Ava | 4', 'Kaden | 3']],
    ]),
    place('Busy cities', 'Show cities with more than one train.', [['SELECT from_city, COUNT(*) AS trains FROM trains'], [{ gap: 0 }, ' from_city'], [{ gap: 1 }, ' COUNT(*) > 1;']], ['GROUP BY', 'HAVING', 'WHERE', 'ORDER BY'], ['GROUP BY', 'HAVING'], 'Group first, then keep the groups with more than one.'),
    tapbug('Error: misuse of aggregate: COUNT()', ['SELECT from_city, COUNT(*) FROM trains', 'WHERE COUNT(*) > 1 GROUP BY from_city;'], [[2, 'WHERE COUNT(*) > 1 GROUP BY from_city;', 'GROUP BY from_city HAVING COUNT(*) > 1;']], 'Conditions on aggregates go in HAVING, after GROUP BY.'),
    check('Where does a condition like SUM(seats) > 2 go?', ['HAVING', 'WHERE', 'ORDER BY', 'SELECT'], 'It is about groups.', 'Before or after grouping?', { mono: true }),
    recap([
      ['🔍', 'WHERE filters rows; HAVING filters groups'],
      ['📐', 'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT'],
      ['🔢', 'HAVING can use aggregates'],
    ]),
  ]),

  challenge('sql-b-6-ch', 'Module 6 Challenge', { icon: '🗂', name: 'Group Leader' }, ['Group rows with GROUP BY', 'Aggregate per group', 'Filter groups with HAVING'], [
    mcq(1, 'What does GROUP BY do?', ['Makes groups of rows with the same value', 'Sorts rows', 'Removes columns', 'Joins tables'], 'Then aggregates per group.', { mono: true }),
    mcq(2, 'Which filters groups?', ['HAVING', 'WHERE', 'LIMIT', 'DISTINCT'], 'After grouping.', { mono: true }),
    mcq(3, 'Which comes first in a query?', ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], 'WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.', { mono: true }),
    mcq(4, 'SELECT from_city, COUNT(*) FROM trains GROUP BY from_city gives…', ['One row per city with its number of trains', 'One row', 'Every train', 'An error'], 'Per group.'),
    mcq(5, 'Can HAVING use COUNT(*)?', ['Yes', 'No', 'Only with WHERE', 'Only in SQLite'], 'That’s its job.'),
    swipe([
      ['WHERE can use aggregates', false, 'HAVING can.'],
      ['GROUP BY comes after WHERE', true, 'Filter rows, then group.'],
      ['You can GROUP BY two columns', true, 'One group per pair.'],
      ['HAVING filters single rows before grouping', false, 'Groups, after.'],
    ]),
    pairs([['WHERE', 'Rows'], ['GROUP BY', 'Make groups'], ['HAVING', 'Groups'], ['ORDER BY', 'Sort the result']], 'The order of a query.'),
    pickCode('Which shows passengers who booked more than one time?', ['SELECT passenger FROM bookings GROUP BY passenger HAVING COUNT(*) > 1;', 'SELECT passenger FROM bookings WHERE COUNT(*) > 1;', 'SELECT passenger FROM bookings HAVING COUNT(*) > 1 GROUP BY passenger;', 'SELECT DISTINCT passenger FROM bookings;'], 'Group, then HAVING.'),
    bugTask(['SELECT passenger, SUM(seats)', 'FROM bookings', 'HAVING SUM(seats) > 2', 'GROUP BY passenger;'], [[3, 'HAVING SUM(seats) > 2', 'GROUP BY passenger'], [4, 'GROUP BY passenger;', 'HAVING SUM(seats) > 2;']], 'GROUP BY comes before HAVING.'),
    xray(['passenger | seats', 'Ava | 4', 'Kaden | 3'], [
      ['tr:nth-child(2) td:nth-child(2)', 'Ava’s total', 'SUM(seats)', ['SUM(seats)', 'GROUP BY passenger', 'HAVING SUM(seats) > 2']],
      ['table', 'Only two passengers', 'HAVING SUM(seats) > 2', ['SUM(seats)', 'GROUP BY passenger', 'HAVING SUM(seats) > 2']],
    ]),
    arrange(['SELECT passenger, SUM(seats) AS seats', 'FROM bookings', 'GROUP BY passenger', 'HAVING SUM(seats) > 2;'], 'columns, table, group, then filter the groups', ['passenger | seats', 'Ava | 4', 'Kaden | 3']),
  ]),
];
