// SQL · Modules 7–13 (Intermediate): joins, outer joins and UNION, subqueries and CTEs, CASE and functions, window
// functions, changing data with transactions, and database design. Every result below comes from running the query.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, compare, explore, lesson, matchUp, mcq, pairs, pickCode, place, recap, reveal, run, swipe, tables, tapbug, truth, xray } from './kit';

const UNIQUE_ERR = 'sqlite3.IntegrityError: UNIQUE constraint failed: stations.code';
const CHECK_ERR = 'sqlite3.IntegrityError: CHECK constraint failed: platforms > 0';

export const SQL_M7: Lesson[] = [
  lesson('sql-join', 'JOIN: combining tables', 8, [
    chat(['bookings only stores train_id, not the train’s name. To see both, you join the tables: match each booking with its train.', 'JOIN … ON says which columns match. Only rows that match on both sides are kept.']),
    explore('Matching rows', ['bookings.train_id   →   trains.id', '12951               →   Royal', '22436               →   Valley Express', '12627               →   Keystone Express'], [
      [1, 'train_id in bookings points at id in trains.'],
      [2, 'Each booking finds its train by that number.'],
    ], { page: tables('bookings', 'trains') }),
    compare('Your first join', [
      ['JOIN', ['SELECT bookings.passenger, trains.name, bookings.seats', 'FROM bookings', 'JOIN trains ON bookings.train_id = trains.id;'], 'Every booking with its train’s name.', ['passenger | name | seats', 'Ava | Royal | 2', 'Reed | Valley Express | 1', 'Kaden | Royal | 3', 'Megan | Keystone Express | 1', 'Ava | Valley Express | 2']],
      ['With aliases', ['SELECT b.passenger, t.name', 'FROM bookings AS b', 'JOIN trains AS t ON b.train_id = t.id', "WHERE t.to_city = 'Dublin';"], 'Short names for tables, and a WHERE as usual.', ['passenger | name', 'Ava | Royal', 'Kaden | Royal', 'Megan | Keystone Express']],
    ]),
    place('Join on the key', 'Show each booking’s passenger and train name.', [['SELECT b.passenger, t.name'], ['FROM bookings b'], [{ gap: 0 }, ' trains t ', { gap: 1 }, ' b.train_id = t.id;']], ['JOIN', 'ON', 'WITH', 'WHERE'], ['JOIN', 'ON'], 'JOIN the table, ON the matching columns.'),
    tapbug('Every booking appears with every train (30 rows)', ['SELECT b.passenger, t.name', 'FROM bookings b JOIN trains t;'], [[2, 'JOIN trains t;', 'JOIN trains t ON b.train_id = t.id;']], 'Without ON, every row pairs with every row. Say how they match.'),
    check('Which rows does a JOIN (INNER JOIN) keep?', ['Only rows that match on both sides', 'Every row from the left table', 'Every row from both', 'Only rows that don’t match'], 'Matches only.', 'What happens to a train with no bookings?'),
    recap([
      ['🔗', 'JOIN table ON a.key = b.key'],
      ['🏷', 'Aliases: FROM bookings b'],
      ['✅', 'INNER JOIN keeps only matches'],
    ]),
  ]),

  lesson('sql-b-7-2', 'More joins', 8, [
    chat(['Real questions often need three tables: who booked, how old they are, and which train.', 'Add one JOIN at a time. You can also join a table to itself, or group the joined rows.']),
    compare('Three tables, and joins with groups', [
      ['Three tables', ['SELECT b.passenger, p.age, t.name', 'FROM bookings b', 'JOIN trains t ON b.train_id = t.id', 'JOIN passengers p ON p.name = b.passenger', 'ORDER BY b.id;'], 'Join one table at a time.', ['passenger | age | name', 'Ava | 15 | Royal', 'Reed | 34 | Valley Express', 'Kaden | 22 | Royal', 'Megan | 61 | Keystone Express', 'Ava | 15 | Valley Express']],
      ['Join, then group', ['SELECT t.name, SUM(b.seats) AS booked', 'FROM trains t', 'JOIN bookings b ON b.train_id = t.id', 'GROUP BY t.name', 'ORDER BY booked DESC, t.name;'], 'Seats booked on each train.', ['name | booked', 'Royal | 5', 'Valley Express | 3', 'Keystone Express | 1']],
      ['Self join', ['SELECT a.name AS train, b.name AS same_route', 'FROM trains a', 'JOIN trains b ON a.to_city = b.to_city AND a.id < b.id;'], 'A table joined to itself: pairs of trains to the same city.', ['train | same_route', 'Harbour Royal | Keystone Express', 'Harbour Royal | Royal', 'Keystone Express | Royal']],
    ]),
    tapbug('Error: ambiguous column name: name', ['SELECT name, passenger', 'FROM bookings b JOIN trains t ON b.train_id = t.id', 'JOIN passengers p ON p.name = b.passenger;'], [[1, 'SELECT name, passenger', 'SELECT t.name, b.passenger']], 'Two tables have a name column. Say which: t.name.'),
    check('Why use a.id < b.id in the self join?', ['So each pair shows once, not twice or with itself', 'To sort the trains', 'Because ids must be numbers', 'It joins faster'], 'Royal–Keystone, not Keystone–Royal too.', 'What would a.id <> b.id give?'),
    truth([
      ['You can join more than two tables', true, 'One JOIN at a time.'],
      ['A table can be joined to itself', true, 'A self join, with two aliases.'],
      ['JOIN and INNER JOIN are different', false, 'The same.'],
    ]),
    recap([
      ['🔗', 'Chain JOINs for more tables'],
      ['🗂', 'Join, then GROUP BY for totals'],
      ['🪞', 'Self joins compare rows of one table'],
    ]),
  ]),

  challenge('sql-b-7-ch', 'Module 7 Challenge', { icon: '🔗', name: 'Join Builder' }, ['Combine tables with JOIN', 'Use aliases and join several tables', 'Group joined rows'], [
    mcq(1, 'What does ON say?', ['Which columns match', 'Which rows to delete', 'How to sort', 'Which table is first'], 'The join condition.', { mono: true }),
    mcq(2, 'Which rows does INNER JOIN keep?', ['Rows that match on both sides', 'All rows', 'Left rows only', 'Rows that don’t match'], 'Matches only.'),
    mcq(3, 'What happens with JOIN and no ON?', ['Every row pairs with every row', 'An empty result', 'Only matches', 'The same as LEFT JOIN'], 'A cross join.'),
    mcq(4, 'Why write t.name instead of name?', ['Two tables have a name column', 'It is faster', 'name is a keyword', 'It sorts by name'], 'Avoid ambiguity.'),
    mcq(5, 'What is a self join?', ['A table joined to itself', 'A join with one column', 'A join without ON', 'A join to a view'], 'With two aliases.'),
    swipe([
      ['Aliases make joins shorter', true, 'FROM trains t.'],
      ['A join can be followed by GROUP BY', true, 'Totals per train.'],
      ['INNER JOIN keeps trains with no bookings', false, 'LEFT JOIN does.'],
      ['ON can use AND', true, 'Several conditions.'],
    ]),
    pairs([['JOIN', 'Combine tables'], ['ON', 'How they match'], ['t.name', 'Which table’s column'], ['a.id < b.id', 'Each pair once']], 'Joins.'),
    pickCode('Which joins bookings to trains?', ['FROM bookings b JOIN trains t ON b.train_id = t.id', 'FROM bookings, trains', 'FROM bookings JOIN trains WHERE id', 'FROM bookings b ON trains t'], 'JOIN … ON keys.'),
    bugTask(['SELECT name, seats FROM bookings b', 'JOIN trains t;'], [[1, 'SELECT name, seats', 'SELECT t.name, b.seats'], [2, 'JOIN trains t;', 'JOIN trains t ON b.train_id = t.id;']], 'Say which table’s columns, and how the tables match.'),
    xray(['name | booked', 'Royal | 5', 'Valley Express | 3'], [
      ['tr:nth-child(2) td:nth-child(2)', 'Royal’s booked seats', 'SUM(b.seats)', ['SUM(b.seats)', 'JOIN bookings b ON b.train_id = t.id', 'ORDER BY booked DESC']],
      ['tr:nth-child(2) td:nth-child(1)', 'The busiest train first', 'ORDER BY booked DESC', ['SUM(b.seats)', 'JOIN bookings b ON b.train_id = t.id', 'ORDER BY booked DESC']],
    ]),
    arrange(['SELECT b.passenger, t.name', 'FROM bookings b', 'JOIN trains t ON b.train_id = t.id', "WHERE t.to_city = 'Dublin';"], 'columns, first table, join, then filter', ['passenger | name', 'Ava | Royal', 'Kaden | Royal', 'Megan | Keystone Express']),
  ]),

  lesson('sql-left', 'LEFT JOIN', 8, [
    chat(['An inner join drops trains that have no bookings. Sometimes those are exactly what you want to find.', 'LEFT JOIN keeps every row from the left table; where nothing matches, the right side’s columns are NULL.']),
    compare('Keep every train', [
      ['LEFT JOIN', ['SELECT t.name, b.passenger', 'FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'ORDER BY t.name;'], 'Trains with no bookings show NULL.', ['name | passenger', 'Coastal Express | NULL', 'Harbour Royal | NULL', 'Keystone Express | Megan', 'Royal | Ava', 'Royal | Kaden', 'Silver Arrow | NULL', 'Valley Express | Ava', 'Valley Express | Reed']],
      ['Only the unbooked', ['SELECT t.name', 'FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'WHERE b.id IS NULL;'], 'Keep only rows with no match.', ['name', 'Coastal Express', 'Silver Arrow', 'Harbour Royal']],
      ['Counting zero', ['SELECT p.name, COUNT(b.id) AS bookings', 'FROM passengers p', 'LEFT JOIN bookings b ON b.passenger = p.name', 'GROUP BY p.name', 'ORDER BY p.name;'], 'Zoey shows 0 instead of vanishing.', ['name | bookings', 'Ava | 2', 'Kaden | 1', 'Megan | 1', 'Reed | 1', 'Zoey | 0']],
    ]),
    reveal('The other outer joins', [
      ['RIGHT JOIN', 'Keeps every row from the right table. Swap the tables and use LEFT JOIN for the same result.'],
      ['FULL OUTER JOIN', 'Keeps every row from both, with NULLs where there is no match.'],
      ['Support', 'Both work in PostgreSQL, SQL Server and newer SQLite; MySQL has no FULL OUTER JOIN.'],
    ]),
    tapbug('Zoey disappears from the list', ['SELECT p.name, COUNT(b.id)', 'FROM passengers p JOIN bookings b ON b.passenger = p.name', 'GROUP BY p.name;'], [[2, 'passengers p JOIN bookings', 'passengers p LEFT JOIN bookings']], 'An inner join drops passengers with no bookings. Use LEFT JOIN.'),
    check('Why COUNT(b.id) and not COUNT(*) after a LEFT JOIN?', ['COUNT(*) would count the NULL row as 1', 'COUNT(*) is slower', 'COUNT(b.id) is shorter', 'They are the same'], 'A passenger with no bookings still has one row.', 'What does COUNT(column) skip?'),
    recap([
      ['⬅', 'LEFT JOIN keeps every left row'],
      ['∅', 'No match: right columns are NULL'],
      ['🔍', 'WHERE right.id IS NULL finds what’s missing'],
    ]),
  ]),

  lesson('sql-b-8-2', 'UNION', 7, [
    chat(['JOIN puts tables side by side. UNION stacks results on top of each other.', 'Each SELECT must give the same number of columns. UNION removes repeats; UNION ALL keeps them.']),
    compare('Stacking results', [
      ['UNION', ['SELECT from_city AS city FROM trains', 'UNION', 'SELECT to_city FROM trains', 'ORDER BY city;'], 'Every city served, once each.', ['city', 'Barcelona', 'Boston', 'Copenhagen', 'Dublin', 'Kyoto', 'Madrid', 'Vienna']],
      ['UNION ALL', ['SELECT from_city AS city FROM trains', 'UNION ALL', 'SELECT to_city FROM trains;'], 'Every value, repeats and all: 12 rows.', ['city', 'Madrid', 'Dublin', 'Kyoto', 'Barcelona', 'Madrid', 'Dublin', 'Copenhagen', 'Boston', 'Dublin', 'Dublin', 'Dublin', 'Vienna']],
    ]),
    matchUp('JOIN or UNION?', [['Each booking with its train name', 'JOIN'], ['Every city trains leave from or go to', 'UNION'], ['Passengers next to their ages', 'JOIN'], ['This year’s and last year’s orders in one list', 'UNION ALL']], 'Side by side, or on top.'),
    tapbug('Error: SELECTs to the left and right of UNION do not have the same number of result columns', ['SELECT name, fare FROM trains', 'UNION', 'SELECT name FROM passengers;'], [[1, 'SELECT name, fare FROM trains', 'SELECT name FROM trains']], 'Both sides need the same number of columns.'),
    check('Which keeps repeated rows?', ['UNION ALL', 'UNION', 'JOIN', 'DISTINCT'], 'And it is faster.', 'Which one doesn’t remove repeats?', { mono: true }),
    recap([
      ['📚', 'UNION stacks results'],
      ['1️⃣', 'UNION removes repeats; UNION ALL keeps them'],
      ['🔢', 'Same number of columns on each side'],
    ]),
  ]),

  challenge('sql-b-8-ch', 'Module 8 Challenge', { icon: '⬅', name: 'Gap Finder' }, ['Keep unmatched rows with LEFT JOIN', 'Find what’s missing', 'Stack results with UNION'], [
    mcq(1, 'Which keeps every row of the first table?', ['LEFT JOIN', 'INNER JOIN', 'UNION', 'CROSS JOIN'], 'With NULLs for no match.', { mono: true }),
    mcq(2, 'How do you find trains with no bookings?', ['LEFT JOIN, then WHERE b.id IS NULL', 'INNER JOIN, then WHERE b.id IS NULL', 'WHERE trains = NULL', 'UNION bookings'], 'Keep, then filter.'),
    mcq(3, 'What does UNION do with repeats?', ['Removes them', 'Keeps them', 'Counts them', 'Sorts them only'], 'UNION ALL keeps.', { mono: true }),
    mcq(4, 'What must both sides of UNION have?', ['The same number of columns', 'The same table', 'An ORDER BY', 'A JOIN'], 'Matching shapes.'),
    mcq(5, 'Which gives 0 for passengers with no bookings?', ['LEFT JOIN with COUNT(b.id)', 'JOIN with COUNT(*)', 'LEFT JOIN with COUNT(*)', 'UNION with COUNT'], 'COUNT(column) skips NULLs.'),
    swipe([
      ['RIGHT JOIN can be written as LEFT JOIN with the tables swapped', true, 'Same result.'],
      ['UNION puts tables side by side', false, 'On top of each other.'],
      ['After a LEFT JOIN, unmatched right columns are NULL', true, 'No value.'],
      ['MySQL supports FULL OUTER JOIN', false, 'It doesn’t.'],
    ]),
    pairs([['LEFT JOIN', 'Keep all left rows'], ['IS NULL', 'No match'], ['UNION', 'Stack, no repeats'], ['UNION ALL', 'Stack, with repeats']], 'Outer joins and unions.'),
    pickCode('Which lists passengers with no bookings?', ['SELECT p.name FROM passengers p LEFT JOIN bookings b ON b.passenger = p.name WHERE b.id IS NULL;', 'SELECT p.name FROM passengers p JOIN bookings b ON b.passenger = p.name WHERE b.id IS NULL;', 'SELECT name FROM passengers WHERE bookings = 0;', 'SELECT name FROM passengers UNION SELECT passenger FROM bookings;'], 'LEFT JOIN, then IS NULL.'),
    bugTask(['SELECT t.name FROM trains t', 'JOIN bookings b ON b.train_id = t.id', 'WHERE b.id = NULL;'], [[2, 'JOIN bookings', 'LEFT JOIN bookings'], [3, 'b.id = NULL', 'b.id IS NULL']], 'Keep unmatched trains, and test for NULL with IS.'),
    xray(['name | bookings', 'Ava | 2', 'Zoey | 0'], [
      ['tr:nth-child(3) td:nth-child(2)', 'Zoey’s zero', 'COUNT(b.id)', ['COUNT(b.id)', 'LEFT JOIN bookings b', 'GROUP BY p.name']],
      ['tr:nth-child(3) td:nth-child(1)', 'Zoey is listed at all', 'LEFT JOIN bookings b', ['COUNT(b.id)', 'LEFT JOIN bookings b', 'GROUP BY p.name']],
    ]),
    arrange(['SELECT t.name', 'FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'WHERE b.id IS NULL;'], 'column, table, left join, then keep the unmatched', ['name', 'Coastal Express', 'Silver Arrow', 'Harbour Royal']),
  ]),

  lesson('sql-sub', 'Subqueries', 8, [
    chat(['A subquery is a query inside another, in brackets. The inner one runs first and its answer is used by the outer one.', '“Trains dearer than average” needs the average first: a subquery.']),
    compare('A query inside a query', [
      ['One value', ['SELECT name, fare FROM trains', 'WHERE fare > (SELECT AVG(fare) FROM trains);'], 'The inner query gives one number: the average.', ['name | fare', 'Harbour Royal | 3100', 'Keystone Express | 2100', 'Royal | 2900']],
      ['A list', ['SELECT name FROM trains', 'WHERE id IN (', "  SELECT train_id FROM bookings WHERE passenger = 'Ava'", ');'], 'The inner query gives a list of ids.', ['name', 'Royal', 'Valley Express']],
      ['EXISTS', ['SELECT name FROM passengers p', 'WHERE NOT EXISTS (', '  SELECT 1 FROM bookings b WHERE b.passenger = p.name', ');'], 'True when the inner query finds any row (here: none).', ['name', 'Zoey']],
    ]),
    run('Change the subquery', 'Pick what to compare against.', ['SELECT name, fare FROM trains', 'WHERE fare > (SELECT {{v}}(fare) FROM trains);'], ['AVG', 'MIN', 'MAX'], { goal: '(no rows)', caption: 'Nothing is dearer than the dearest.' }),
    tapbug('Error: the subquery returns more than one value', ["SELECT name FROM trains WHERE id = (SELECT train_id FROM bookings);"], [[1, 'WHERE id = (SELECT', 'WHERE id IN (SELECT']], 'Use IN when the subquery gives a list.'),
    check('When does the subquery run?', ['First; its answer is used by the outer query', 'Last', 'Only if the outer query is empty', 'Never, it is a comment'], 'Inside out.', 'Which answer is needed first?'),
    recap([
      ['🪆', 'A subquery is a query in brackets'],
      ['1️⃣', '= with one value; IN with a list'],
      ['❓', 'EXISTS / NOT EXISTS: is there any matching row?'],
    ]),
  ]),

  lesson('sql-b-9-2', 'CTEs with WITH', 7, [
    chat(['Subqueries inside subqueries get hard to read. A common table expression (CTE) names a step first, then uses it like a table.', 'WITH name AS (query) SELECT … FROM name.']),
    compare('Name the step', [
      ['Subquery', ['SELECT passenger, seats FROM (', '  SELECT passenger, SUM(seats) AS seats', '  FROM bookings GROUP BY passenger', ')', 'WHERE seats >= 2', 'ORDER BY seats DESC, passenger;'], 'Works, but read from the inside out.', ['passenger | seats', 'Ava | 4', 'Kaden | 3']],
      ['WITH', ['WITH totals AS (', '  SELECT passenger, SUM(seats) AS seats', '  FROM bookings GROUP BY passenger', ')', 'SELECT passenger, seats FROM totals', 'WHERE seats >= 2', 'ORDER BY seats DESC, passenger;'], 'The same, read top to bottom.', ['passenger | seats', 'Ava | 4', 'Kaden | 3']],
    ]),
    explore('Reading a CTE', ['WITH totals AS (', '  SELECT passenger, SUM(seats) AS seats', '  FROM bookings GROUP BY passenger', ')', 'SELECT passenger, seats FROM totals', 'WHERE seats >= 2;'], [
      [1, 'Name the step: totals.'],
      [2, 'The step is an ordinary query.'],
      [5, 'Use it like a table.'],
    ]),
    tapbug('Error: no such table: totals', ['WITH totals (', '  SELECT passenger, SUM(seats) AS seats FROM bookings GROUP BY passenger', ')', 'SELECT * FROM totals;'], [[1, 'WITH totals (', 'WITH totals AS (']], 'WITH name AS ( … ).'),
    check('Why use a CTE?', ['To name a step so the query reads top to bottom', 'It is always faster', 'To change data', 'To make a permanent table'], 'Readability.', 'What does it give the step?'),
    recap([
      ['🏷', 'WITH name AS (query)'],
      ['📖', 'Read top to bottom'],
      ['🧱', 'Several steps: WITH a AS (…), b AS (…)'],
    ]),
  ]),

  challenge('sql-b-9-ch', 'Module 9 Challenge', { icon: '🪆', name: 'Query Nester' }, ['Use subqueries for values and lists', 'Check for rows with EXISTS', 'Name steps with WITH'], [
    mcq(1, 'Which runs first?', ['The subquery', 'The outer query', 'Both at once', 'Neither'], 'Inside out.'),
    mcq(2, 'A subquery gives a list. Which operator?', ['IN', '=', 'LIKE', 'BETWEEN'], '= needs one value.', { mono: true }),
    mcq(3, 'What does NOT EXISTS (…) check?', ['That the subquery finds no rows', 'That a column is NULL', 'That a table exists', 'That a value is 0'], 'Any rows at all?', { mono: true }),
    mcq(4, 'What does WITH totals AS (…) make?', ['A named step for this query', 'A permanent table', 'A view', 'An index'], 'Only for this query.', { mono: true }),
    mcq(5, 'Which finds trains dearer than average?', ['WHERE fare > (SELECT AVG(fare) FROM trains)', 'WHERE fare > AVG(fare)', 'HAVING fare > AVG', 'WHERE AVG(fare) < fare'], 'A subquery gives the average.', { mono: true }),
    swipe([
      ['A subquery can go in WHERE', true, 'And in FROM.'],
      ['A CTE is saved in the database', false, 'Only for this query.'],
      ['EXISTS stops as soon as it finds a row', true, 'It only asks “any?”.'],
      ['= works with a list of values', false, 'Use IN.'],
    ]),
    pairs([['(SELECT AVG…)', 'One value'], ['IN (SELECT…)', 'A list'], ['EXISTS', 'Any rows?'], ['WITH', 'A named step']], 'Nesting queries.'),
    pickCode('Which lists trains Ava booked?', ["SELECT name FROM trains WHERE id IN (SELECT train_id FROM bookings WHERE passenger = 'Ava');", "SELECT name FROM trains WHERE id = (SELECT train_id FROM bookings);", "SELECT name FROM trains WHERE 'Ava' IN trains;", 'SELECT name FROM trains, Ava;'], 'IN with a subquery.'),
    bugTask(['WITH totals (SELECT passenger, SUM(seats) AS s FROM bookings GROUP BY passenger)', 'SELECT * FROM totals WHERE s => 2;'], [[1, 'WITH totals (', 'WITH totals AS ('], [2, 's => 2', 's >= 2']], 'WITH name AS, and >= for “at least”.'),
    xray(['name', 'Zoey'], [
      ['tr:nth-child(2) td', 'The passenger with no bookings', 'NOT EXISTS (SELECT 1 FROM bookings …)', ['NOT EXISTS (SELECT 1 FROM bookings …)', 'IN (SELECT …)', 'WITH totals AS (…)']],
    ]),
    arrange(['WITH dear AS (SELECT name, fare FROM trains WHERE fare > 2500)', 'SELECT name FROM dear', 'ORDER BY fare DESC;'], 'the named step, use it, then sort', ['name', 'Harbour Royal', 'Royal']),
  ]),

  lesson('sql-case', 'CASE', 7, [
    chat(['CASE is SQL’s if-else: it picks a value for each row by checking conditions in order.', 'CASE WHEN … THEN … ELSE … END, often with AS to name the new column.']),
    compare('Bands of fares', [
      ['CASE', ['SELECT name, fare,', '  CASE', "    WHEN fare < 1000 THEN 'Budget'", "    WHEN fare < 2500 THEN 'Standard'", "    ELSE 'Premium'", '  END AS band', 'FROM trains ORDER BY fare;'], 'The first matching WHEN wins.', ['name | fare | band', 'Coastal Express | 850 | Budget', 'Silver Arrow | 1200 | Standard', 'Valley Express | 1750 | Standard', 'Keystone Express | 2100 | Standard', 'Royal | 2900 | Premium', 'Harbour Royal | 3100 | Premium']],
      ['CASE with GROUP BY', ['SELECT CASE WHEN seats = 0 THEN \'Full\' ELSE \'Open\' END AS status,', '  COUNT(*) AS trains', 'FROM trains', 'GROUP BY status;'], 'Group by the new value.', ['status | trains', 'Full | 1', 'Open | 5']],
    ]),
    run('Move the line', 'Change where Premium starts.', ['SELECT name,', "  CASE WHEN fare >= {{v}} THEN 'Premium' ELSE 'Standard' END AS band", 'FROM trains WHERE id = 12627;'], ['2500', '2000', '3000'], { goal: 'Keystone Express | Premium', caption: 'Keystone Express costs 2100.' }),
    tapbug('Every train is Budget', ["CASE WHEN fare < 5000 THEN 'Budget'", "     WHEN fare < 1000 THEN 'Cheap'", "     ELSE 'Premium' END"], [[1, 'fare < 5000', 'fare < 1000'], [2, "fare < 1000 THEN 'Cheap'", "fare < 2500 THEN 'Standard'"]], 'The first WHEN that is true wins. Put the narrowest condition first.'),
    check('What does CASE give when no WHEN matches and there is no ELSE?', ['NULL', '0', 'An error', 'The first WHEN'], 'Add ELSE to be safe.', 'What value means “none”?'),
    recap([
      ['🔀', 'CASE WHEN … THEN … ELSE … END'],
      ['1️⃣', 'The first true WHEN wins'],
      ['🗂', 'Group by a CASE to make bands'],
    ]),
  ]),

  lesson('sql-b-10-2', 'Text, date and NULL functions', 8, [
    compare('Built-in functions', [
      ['Text', ['SELECT UPPER(name) AS loud, LENGTH(name) AS letters,', '  SUBSTR(name, 1, 3) AS short', 'FROM passengers ORDER BY name;'], 'Change, measure and cut text.', ['loud | letters | short', 'AVA | 3 | Ava', 'KADEN | 5 | Kad', 'MEGAN | 5 | Meg', 'REED | 4 | Ree', 'ZOEY | 4 | Zoe']],
      ['Joining text', ["SELECT name || ' (' || from_city || ')' AS label", 'FROM trains WHERE fare > 2500 ORDER BY name;'], '|| joins text (CONCAT in MySQL).', ['label', 'Harbour Royal (Kyoto)', 'Royal (Madrid)']],
      ['Dates', ["SELECT DATE('2026-11-02', '+7 days') AS next_week,", "  STRFTIME('%d/%m/%Y', '2026-11-02') AS uk_style;"], 'Add days, and format dates.', ['next_week | uk_style', '2026-11-09 | 02/11/2026']],
      ['NULL', ["SELECT name, IFNULL(phone, 'no phone') AS phone", 'FROM passengers ORDER BY name;'], 'A stand-in for NULL (COALESCE works too).', ['name | phone', 'Ava | 90000 00001', 'Kaden | 90000 00003', 'Megan | no phone', 'Reed | no phone', 'Zoey | 90000 00005']],
    ]),
    reveal('Same idea, different names', [
      ['Join text', 'SQLite and PostgreSQL: ||. MySQL: CONCAT(a, b).'],
      ['Today', 'SQLite: DATE(\'now\'). PostgreSQL: CURRENT_DATE. MySQL: CURDATE().'],
      ['NULL stand-in', 'COALESCE works everywhere; IFNULL in SQLite and MySQL; ISNULL in SQL Server.'],
    ]),
    tapbug('The label is NULL for trains with no from_city', ["SELECT name || ' (' || from_city || ')' FROM trains;"], [[1, 'from_city', "COALESCE(from_city, '?')"]], 'Joining text with NULL gives NULL. Use COALESCE.'),
    truth([
      ['LENGTH counts the characters in text', true, "LENGTH('Reed') is 4."],
      ['|| works the same in every database', false, 'MySQL uses CONCAT.'],
      ['COALESCE takes the first value that isn’t NULL', true, 'From its list.'],
    ]),
    check("What does SUBSTR('Megan', 1, 3) give?", ["'Meg'", "'ega'", "'gan'", "'Megan'"], 'Start at 1, take 3.', 'SQL counts from 1.', { mono: true }),
    recap([
      ['🔤', 'UPPER, LOWER, LENGTH, SUBSTR, TRIM, ||'],
      ['📅', 'DATE and STRFTIME (names vary by database)'],
      ['∅', 'COALESCE and IFNULL for NULLs'],
    ]),
  ]),

  challenge('sql-b-10-ch', 'Module 10 Challenge', { icon: '🔀', name: 'Shape Shifter' }, ['Choose values with CASE', 'Use text and date functions', 'Replace NULLs'], [
    mcq(1, 'Which WHEN wins in a CASE?', ['The first one that is true', 'The last one', 'Every true one', 'The ELSE'], 'In order.'),
    mcq(2, 'What ends a CASE?', ['END', 'STOP', 'ESAC', ')'], 'Then AS name.', { mono: true }),
    mcq(3, 'Which joins text in SQLite?', ['||', '+', '&', 'JOIN'], 'CONCAT in MySQL.', { mono: true }),
    mcq(4, "What does LENGTH('Reed') give?", ['4', '3', '5', "'Reed'"], 'Four letters.', { mono: true }),
    mcq(5, 'What does COALESCE(a, b) give?', ['a, or b when a is NULL', 'Always b', 'a + b', 'NULL'], 'The first non-NULL.', { mono: true }),
    swipe([
      ['CASE can be used in GROUP BY', true, 'Group by the band.'],
      ['Text joined with NULL is NULL', true, 'Use COALESCE.'],
      ['SUBSTR counts from 0', false, 'From 1.'],
      ['Date functions are the same in every database', false, 'Names vary.'],
    ]),
    pairs([['CASE', 'If-else'], ['UPPER', 'Capitals'], ['||', 'Join text'], ['IFNULL', 'Stand-in for NULL']], 'Functions.'),
    pickCode('Which labels trains with no seats as Full?', ["CASE WHEN seats = 0 THEN 'Full' ELSE 'Open' END", "IF seats = 0 'Full'", "CASE seats = 0 'Full' END", "WHEN seats = 0 THEN 'Full'"], 'CASE WHEN … THEN … ELSE … END.'),
    bugTask(["CASE WHEN fare < 1000 'Budget' ELSE 'Other'", "SELECT name + ' from ' + from_city FROM trains;"], [[1, "fare < 1000 'Budget' ELSE 'Other'", "fare < 1000 THEN 'Budget' ELSE 'Other' END"], [2, "name + ' from ' + from_city", "name || ' from ' || from_city"]], 'CASE needs THEN and END; join text with ||.'),
    xray(['name | fare | band', 'Coastal Express | 850 | Budget', 'Royal | 2900 | Premium'], [
      ['tr:nth-child(2) td:nth-child(3)', 'Budget', "WHEN fare < 1000 THEN 'Budget'", ["WHEN fare < 1000 THEN 'Budget'", "ELSE 'Premium'", 'ORDER BY fare']],
      ['tr:nth-child(3) td:nth-child(3)', 'Premium', "ELSE 'Premium'", ["WHEN fare < 1000 THEN 'Budget'", "ELSE 'Premium'", 'ORDER BY fare']],
    ]),
    arrange(["SELECT CASE WHEN seats = 0 THEN 'Full' ELSE 'Open' END AS status,", 'COUNT(*) AS trains', 'FROM trains', 'GROUP BY status;'], 'the CASE, the count, the table, then group', ['status | trains', 'Full | 1', 'Open | 5']),
  ]),

  lesson('sql-window', 'Window functions', 9, [
    chat(['GROUP BY squashes rows into one per group. A window function calculates across rows but keeps every row: ranks, running totals, comparisons.', 'You add OVER ( … ) after the function.']),
    compare('Ranks and running totals', [
      ['RANK', ['SELECT name, fare,', '  RANK() OVER (ORDER BY fare DESC) AS fare_rank', 'FROM trains;'], 'Every train, numbered by fare.', ['name | fare | fare_rank', 'Harbour Royal | 3100 | 1', 'Royal | 2900 | 2', 'Keystone Express | 2100 | 3', 'Valley Express | 1750 | 4', 'Silver Arrow | 1200 | 5', 'Coastal Express | 850 | 6']],
      ['Running total', ['SELECT id, passenger, seats,', '  SUM(seats) OVER (ORDER BY id) AS running_total', 'FROM bookings;'], 'Adds up as it goes.', ['id | passenger | seats | running_total', '1 | Ava | 2 | 2', '2 | Reed | 1 | 3', '3 | Kaden | 3 | 6', '4 | Megan | 1 | 7', '5 | Ava | 2 | 9']],
      ['PARTITION BY', ['SELECT name, to_city, fare,', '  ROW_NUMBER() OVER (PARTITION BY to_city ORDER BY fare) AS cheapest_rank', 'FROM trains', 'ORDER BY to_city, cheapest_rank;'], 'Numbering starts again for each city.', ['name | to_city | fare | cheapest_rank', 'Silver Arrow | Boston | 1200 | 1', 'Coastal Express | Copenhagen | 850 | 1', 'Keystone Express | Dublin | 2100 | 1', 'Royal | Dublin | 2900 | 2', 'Harbour Royal | Dublin | 3100 | 3', 'Valley Express | Vienna | 1750 | 1']],
    ]),
    reveal('Window functions you’ll use', [
      ['ROW_NUMBER()', '1, 2, 3… with no ties.'],
      ['RANK()', 'Ties share a rank, then a gap: 1, 1, 3.'],
      ['DENSE_RANK()', 'Ties share, no gap: 1, 1, 2.'],
      ['SUM / AVG … OVER', 'Totals and averages that keep every row.'],
      ['LAG / LEAD', 'The value from the row before or after.'],
    ], { mono: true }),
    tapbug('Error: misuse of window function', ['SELECT name FROM trains', 'WHERE ROW_NUMBER() OVER (ORDER BY fare) = 1;'], [[2, 'WHERE ROW_NUMBER() OVER (ORDER BY fare) = 1;', 'ORDER BY fare LIMIT 1;']], 'Window functions can’t go in WHERE. Use ORDER BY with LIMIT, or rank in a CTE first.'),
    check('What does PARTITION BY to_city do?', ['Restarts the window for each city', 'Removes cities', 'Groups rows into one per city', 'Sorts by city only'], 'Every row stays.', 'Compare it with GROUP BY.'),
    recap([
      ['🪟', 'function() OVER (…) keeps every row'],
      ['🏅', 'ROW_NUMBER, RANK, DENSE_RANK'],
      ['🧱', 'PARTITION BY restarts per group; ORDER BY sets the order'],
    ]),
  ]),

  lesson('sql-b-11-2', 'The top one in each group', 7, [
    chat(['A classic question: the cheapest train to each city. Rank inside each city in a CTE, then keep rank 1.']),
    compare('Top per group', [
      ['GROUP BY', ['SELECT to_city, MIN(fare) AS fare', 'FROM trains', 'GROUP BY to_city;'], 'The cheapest fare per city, but not which train it is.', ['to_city | fare', 'Boston | 1200', 'Copenhagen | 850', 'Dublin | 2100', 'Vienna | 1750']],
      ['Rank, then filter', ['WITH ranked AS (', '  SELECT name, to_city, fare,', '    ROW_NUMBER() OVER (PARTITION BY to_city ORDER BY fare) AS r', '  FROM trains', ')', 'SELECT to_city, name, fare FROM ranked', 'WHERE r = 1', 'ORDER BY to_city;'], 'One row per city: its cheapest train.', ['to_city | name | fare', 'Boston | Silver Arrow | 1200', 'Copenhagen | Coastal Express | 850', 'Dublin | Keystone Express | 2100', 'Vienna | Valley Express | 1750']],
    ]),
    run('Change the question', 'Keep the first or second in each city.', ['WITH ranked AS (', '  SELECT name, to_city, ROW_NUMBER() OVER (PARTITION BY to_city ORDER BY fare) AS r', '  FROM trains', ')', 'SELECT to_city, name FROM ranked WHERE r = {{v}};'], ['1', '2', '3'], { goal: 'Dublin | Royal', caption: 'Only Dublin has a second (and third) train.' }),
    explore('Reading it', ['WITH ranked AS (', '  SELECT name, to_city, fare,', '    ROW_NUMBER() OVER (PARTITION BY to_city ORDER BY fare) AS r', '  FROM trains', ')', 'SELECT to_city, name, fare FROM ranked', 'WHERE r = 1;'], [
      [3, 'Number the trains in each city, cheapest first.'],
      [7, 'Keep the first of each city.'],
    ]),
    check('Why rank in a CTE first?', ['Window functions can’t be used in WHERE directly', 'CTEs are faster', 'ROW_NUMBER only works in CTEs', 'To save the ranks'], 'Name the step, then filter it.', 'Where can’t window functions go?'),
    recap([
      ['🥇', 'Rank per group, then keep r = 1'],
      ['🧱', 'CTE first, filter after'],
      ['🔁', 'Works for “latest per customer”, “top per category”…'],
    ]),
  ]),

  challenge('sql-b-11-ch', 'Module 11 Challenge', { icon: '🪟', name: 'Window Watcher' }, ['Rank rows with window functions', 'Make running totals', 'Find the top row per group'], [
    mcq(1, 'What does a window function keep that GROUP BY doesn’t?', ['Every row', 'Only one row', 'Only NULLs', 'Nothing'], 'It calculates across rows.'),
    mcq(2, 'What comes after the function?', ['OVER (…)', 'WINDOW', 'GROUP', 'BY'], 'OVER ( ).', { mono: true }),
    mcq(3, 'Which gives 1, 1, 3 for a tie?', ['RANK()', 'ROW_NUMBER()', 'DENSE_RANK()', 'COUNT()'], 'A gap after ties.', { mono: true }),
    mcq(4, 'What does PARTITION BY do?', ['Restarts the window per group', 'Deletes groups', 'Joins tables', 'Limits rows'], 'Like groups, keeping rows.', { mono: true }),
    mcq(5, 'Which makes a running total?', ['SUM(seats) OVER (ORDER BY id)', 'SUM(seats)', 'COUNT(*) OVER ()', 'RANK() OVER (seats)'], 'Ordered window.', { mono: true }),
    swipe([
      ['ROW_NUMBER never gives ties', true, 'Each row its own number.'],
      ['Window functions can go in WHERE', false, 'Use a CTE.'],
      ['LAG gives the previous row’s value', true, 'LEAD the next.'],
      ['DENSE_RANK leaves gaps after ties', false, 'RANK does.'],
    ]),
    pairs([['ROW_NUMBER', '1, 2, 3'], ['RANK', '1, 1, 3'], ['DENSE_RANK', '1, 1, 2'], ['LAG', 'Previous row']], 'Window functions.'),
    pickCode('Which numbers trains within each destination by fare?', ['ROW_NUMBER() OVER (PARTITION BY to_city ORDER BY fare)', 'ROW_NUMBER() GROUP BY to_city', 'RANK(to_city, fare)', 'COUNT(*) OVER (fare)'], 'PARTITION, then ORDER.'),
    bugTask(['SELECT name, RANK() OVER ORDER BY fare AS r FROM trains;', 'SELECT name FROM trains WHERE RANK() OVER (ORDER BY fare) = 1;'], [[1, 'OVER ORDER BY fare', 'OVER (ORDER BY fare)'], [2, 'WHERE RANK() OVER (ORDER BY fare) = 1;', 'ORDER BY fare LIMIT 1;']], 'OVER needs brackets; window functions can’t filter in WHERE.'),
    xray(['id | seats | running_total', '1 | 2 | 2', '2 | 1 | 3'], [
      ['tr:nth-child(3) td:nth-child(3)', 'The total so far', 'SUM(seats) OVER (ORDER BY id)', ['SUM(seats) OVER (ORDER BY id)', 'ROW_NUMBER()', 'PARTITION BY']],
    ]),
    arrange(['SELECT name, fare,', 'RANK() OVER (ORDER BY fare DESC) AS fare_rank', 'FROM trains', 'LIMIT 2;'], 'columns, the rank, the table, then two rows', ['name | fare | fare_rank', 'Harbour Royal | 3100 | 1', 'Royal | 2900 | 2']),
  ]),

  lesson('sql-change', 'INSERT, UPDATE and DELETE', 8, [
    chat(['So far you’ve only read data. INSERT adds rows, UPDATE changes them, DELETE removes them.', 'UPDATE and DELETE without WHERE change every row. Always check your WHERE first, with a SELECT.']),
    compare('Changing data', [
      ['INSERT', ["INSERT INTO passengers (name, age, city)", "VALUES ('Noah', 28, 'Lisbon');", "SELECT * FROM passengers WHERE name = 'Noah';"], 'A new row; phone wasn’t given, so it is NULL.', ['name | age | city | phone', 'Noah | 28 | Lisbon | NULL']],
      ['UPDATE', ['UPDATE trains SET fare = fare + 100', "WHERE to_city = 'Dublin';"], 'Three trains changed.', ['OK: 3 rows changed']],
      ['DELETE', ["DELETE FROM bookings WHERE passenger = 'Ava';", 'SELECT COUNT(*) AS left_over FROM bookings;'], 'Ava’s two bookings are gone.', ['left_over', '3']],
      ['No WHERE', ['DELETE FROM bookings;'], 'Every booking is gone.', ['OK: 5 rows changed']],
    ]),
    place('Raise one fare', 'Make the Royal’s fare 3000.', [[{ gap: 0 }, ' trains ', { gap: 1 }, ' fare = 3000'], ['WHERE id = 12951;']], ['UPDATE', 'SET', 'INSERT', 'INTO'], ['UPDATE', 'SET'], 'UPDATE table SET column = value WHERE …'),
    tapbug('Every train now costs 999', ['UPDATE trains SET fare = 999;'], [[1, 'SET fare = 999;', 'SET fare = 999 WHERE id = 11013;']], 'Without WHERE, every row changes. Write the WHERE first.'),
    check('What should you run before an UPDATE or DELETE?', ['A SELECT with the same WHERE, to see which rows change', 'Nothing', 'DROP TABLE', 'An INSERT'], 'Check first.', 'How can you see what will change?'),
    recap([
      ['➕', 'INSERT INTO t (cols) VALUES (…)'],
      ['✏', 'UPDATE t SET col = … WHERE …'],
      ['🗑', 'DELETE FROM t WHERE … (never forget WHERE)'],
    ]),
  ]),

  lesson('sql-b-12-2', 'Transactions', 7, [
    chat(['Booking a seat is two changes: take a seat from the train, and add a booking. If one fails, neither should happen.', 'A transaction groups changes: BEGIN, then COMMIT to keep them all, or ROLLBACK to undo them all.']),
    compare('All or nothing', [
      ['COMMIT', ['BEGIN;', 'UPDATE trains SET seats = seats - 2 WHERE id = 12627;', "INSERT INTO bookings (train_id, passenger, seats) VALUES (12627, 'Zoey', 2);", 'COMMIT;', 'SELECT seats FROM trains WHERE id = 12627;'], 'Both changes are kept: 5 seats became 3.', ['seats', '3']],
      ['ROLLBACK', ['BEGIN;', 'DELETE FROM bookings;', 'ROLLBACK;', 'SELECT COUNT(*) AS bookings FROM bookings;'], 'The delete is undone: all 5 bookings are back.', ['bookings', '5']],
    ]),
    reveal('ACID: what transactions promise', [
      ['Atomic', 'All the changes, or none.'],
      ['Consistent', 'Rules (like constraints) still hold afterwards.'],
      ['Isolated', 'Others don’t see half-finished changes.'],
      ['Durable', 'Once committed, it survives a crash.'],
    ]),
    check('A payment fails after the seat was taken. What should happen?', ['ROLLBACK, so the seat is given back', 'COMMIT anyway', 'Delete the train', 'Nothing'], 'All or nothing.', 'Which undoes the changes?', { mono: false }),
    truth([
      ['ROLLBACK undoes changes since BEGIN', true, 'All of them.'],
      ['COMMIT can be undone with ROLLBACK', false, 'Committed is permanent.'],
      ['Transactions stop others seeing half-done work', true, 'Isolation.'],
    ]),
    recap([
      ['📦', 'BEGIN … COMMIT keeps a group of changes'],
      ['↩', 'ROLLBACK undoes them'],
      ['🧪', 'ACID: atomic, consistent, isolated, durable'],
    ]),
  ]),

  challenge('sql-b-12-ch', 'Module 12 Challenge', { icon: '✏', name: 'Data Changer' }, ['Add, change and remove rows', 'Never forget WHERE', 'Group changes in transactions'], [
    mcq(1, 'Which adds a row?', ['INSERT INTO', 'ADD ROW', 'UPDATE', 'CREATE'], 'With VALUES.', { mono: true }),
    mcq(2, 'What does UPDATE without WHERE do?', ['Changes every row', 'Changes nothing', 'Changes the first row', 'Fails'], 'Always check WHERE.'),
    mcq(3, 'Which keeps a transaction’s changes?', ['COMMIT', 'ROLLBACK', 'BEGIN', 'SAVE'], 'ROLLBACK undoes.', { mono: true }),
    mcq(4, 'Which undoes changes since BEGIN?', ['ROLLBACK', 'COMMIT', 'UNDO', 'DELETE'], 'All of them.', { mono: true }),
    mcq(5, 'What does the A in ACID stand for?', ['Atomic: all or nothing', 'Available', 'Accurate', 'Automatic'], 'All the changes, or none.'),
    swipe([
      ['DELETE FROM t; removes every row', true, 'No WHERE.'],
      ['Missing columns in INSERT become NULL (or their default)', true, 'Like phone.'],
      ['COMMIT can be rolled back', false, 'Permanent.'],
      ['Run a SELECT first to check which rows will change', true, 'Same WHERE.'],
    ]),
    pairs([['INSERT', 'Add'], ['UPDATE', 'Change'], ['DELETE', 'Remove'], ['ROLLBACK', 'Undo']], 'Changing data.'),
    pickCode('Which changes only the Royal’s fare?', ['UPDATE trains SET fare = 3000 WHERE id = 12951;', 'UPDATE trains SET fare = 3000;', 'UPDATE fare = 3000 IN trains;', 'SET trains.fare = 3000;'], 'With WHERE.'),
    bugTask(["INSERT INTO passengers VALUES ('Noah', 28);", 'DELETE FROM bookings;'], [[1, "VALUES ('Noah', 28)", "(name, age) VALUES ('Noah', 28)"], [2, 'DELETE FROM bookings;', "DELETE FROM bookings WHERE passenger = 'Noah';"]], 'Name the columns you fill, and never DELETE without WHERE.'),
    xray(['seats', '3'], [
      ['tr:nth-child(2) td', 'Seats left after booking', 'UPDATE trains SET seats = seats - 2', ['UPDATE trains SET seats = seats - 2', 'ROLLBACK', 'DELETE FROM bookings']],
    ]),
    arrange(['BEGIN;', 'UPDATE trains SET seats = seats - 1 WHERE id = 22436;', 'COMMIT;', 'SELECT seats FROM trains WHERE id = 22436;'], 'begin, change, commit, then check', ['seats', '39']),
  ]),

  lesson('sql-design', 'Tables and constraints', 8, [
    chat(['Good design stops bad data before it gets in. When you create a table you choose each column’s type and its rules, called constraints.']),
    compare('Creating a table', [
      ['CREATE TABLE', ['CREATE TABLE stations (', '  code TEXT PRIMARY KEY,', '  name TEXT NOT NULL,', '  platforms INTEGER CHECK (platforms > 0) DEFAULT 1', ');', "INSERT INTO stations (code, name) VALUES ('DUB', 'Dublin Central');", 'SELECT * FROM stations;'], 'platforms wasn’t given, so the DEFAULT 1 is used.', ['code | name | platforms', 'DUB | Dublin Central | 1']],
      ['PRIMARY KEY', ['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations VALUES ('DUB', 'Dublin Central');", "INSERT INTO stations VALUES ('DUB', 'Again');"], 'Two rows can’t share a primary key.', [UNIQUE_ERR]],
      ['CHECK', ['CREATE TABLE stations (code TEXT PRIMARY KEY, platforms INTEGER CHECK (platforms > 0));', "INSERT INTO stations VALUES ('DUB', 0);"], 'The rule refuses 0 platforms.', [CHECK_ERR]],
    ]),
    reveal('Constraints', [
      ['PRIMARY KEY', 'Each row’s unique id. Never NULL.'],
      ['FOREIGN KEY', 'bookings.train_id REFERENCES trains(id): it must point at a real train.'],
      ['NOT NULL', 'A value is required.'],
      ['UNIQUE', 'No two rows may share it, like an email.'],
      ['CHECK', 'Any rule: CHECK (seats >= 0).'],
      ['DEFAULT', 'The value when none is given.'],
    ], { mono: true }),
    tapbug('Two passengers can have the same email', ['CREATE TABLE users (', '  id INTEGER PRIMARY KEY,', '  email TEXT NOT NULL', ');'], [[3, 'email TEXT NOT NULL', 'email TEXT NOT NULL UNIQUE']], 'UNIQUE stops repeats.'),
    check('What does a FOREIGN KEY on bookings.train_id do?', ['Makes sure it matches a real train id', 'Makes it unique', 'Makes it a number', 'Sorts bookings'], 'It points at another table.', 'Where must the id exist?'),
    recap([
      ['🏗', 'CREATE TABLE with types and rules'],
      ['🔑', 'PRIMARY KEY and FOREIGN KEY link tables'],
      ['🛡', 'NOT NULL, UNIQUE, CHECK, DEFAULT stop bad data'],
    ]),
  ]),

  lesson('sql-b-13-2', 'Indexes, views and changing tables', 8, [
    compare('Indexes, views and ALTER', [
      ['INDEX', ['CREATE INDEX idx_bookings_passenger ON bookings (passenger);', "SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx%';"], 'Finding a passenger’s bookings is now fast, even with millions of rows.', ['name', 'idx_bookings_passenger']],
      ['VIEW', ['CREATE VIEW cheap_trains AS', '  SELECT name, fare FROM trains WHERE fare < 1500;', 'SELECT * FROM cheap_trains;'], 'A saved query you can use like a table.', ['name | fare', 'Coastal Express | 850', 'Silver Arrow | 1200']],
      ['ALTER TABLE', ['ALTER TABLE passengers ADD COLUMN email TEXT;', 'SELECT name, email FROM passengers ORDER BY name LIMIT 2;'], 'A new column; existing rows get NULL.', ['name | email', 'Ava | NULL', 'Kaden | NULL']],
    ]),
    reveal('When to index', [
      ['Yes', 'Columns you search, join or sort on often: emails, foreign keys.'],
      ['Cost', 'Each index takes space and slows inserts a little.'],
      ['Primary keys', 'Are indexed already.'],
    ]),
    chat(['One danger to know: SQL injection. If an app glues user text straight into SQL, someone can type SQL of their own.', 'Always pass values separately, as parameters: the database never treats them as SQL.'], { code: ["-- Never: \"SELECT * FROM users WHERE name = '\" + input + \"'\"", '-- Typing   x\' OR \'1\'=\'1   would return every user.', '-- Always: db.query("SELECT * FROM users WHERE name = ?", [input])'] }),
    tapbug('Anyone can log in by typing x’ OR ’1’=’1', ['db.query("SELECT * FROM users WHERE name = \'" + name + "\'")'], [[1, '"SELECT * FROM users WHERE name = \'" + name + "\'"', '"SELECT * FROM users WHERE name = ?", [name]']], 'Never build SQL from user text. Use parameters.'),
    check('What is a view?', ['A saved query used like a table', 'A copy of a table', 'An index', 'A backup'], 'It holds no data of its own.', 'What does CREATE VIEW save?'),
    recap([
      ['⚡', 'Indexes speed up searches and joins'],
      ['👁', 'Views save queries; ALTER TABLE changes tables'],
      ['🛡', 'Parameters stop SQL injection'],
    ]),
  ]),

  challenge('sql-b-13-ch', 'Module 13 Challenge', { icon: '🏗', name: 'Database Designer' }, ['Create tables with keys and rules', 'Speed up queries with indexes', 'Keep queries safe from injection'], [
    mcq(1, 'What must a PRIMARY KEY be?', ['Unique and not NULL', 'A number', 'Text', 'Indexed by hand'], 'One per row.'),
    mcq(2, 'Which rule makes a column required?', ['NOT NULL', 'UNIQUE', 'DEFAULT', 'CHECK'], 'A value must be given.', { mono: true }),
    mcq(3, 'What does an index speed up?', ['Searching, joining and sorting on its columns', 'Every insert', 'Deleting tables', 'Backups'], 'With a small cost on writes.'),
    mcq(4, 'How do you stop SQL injection?', ['Pass values as parameters', 'Remove quotes from input', 'Use capital letters', 'Use a view'], 'Never glue text into SQL.'),
    mcq(5, 'Which adds a column to an existing table?', ['ALTER TABLE … ADD COLUMN', 'UPDATE TABLE', 'INSERT COLUMN', 'CREATE COLUMN'], 'Existing rows get NULL.', { mono: true }),
    swipe([
      ['A FOREIGN KEY must match a row in another table', true, 'It points there.'],
      ['Views store their own copy of the data', false, 'They are saved queries.'],
      ['More indexes always make everything faster', false, 'They slow writes.'],
      ['CHECK can enforce rules like seats >= 0', true, 'Any condition.'],
    ]),
    pairs([['PRIMARY KEY', 'Row id'], ['FOREIGN KEY', 'Points elsewhere'], ['UNIQUE', 'No repeats'], ['INDEX', 'Fast lookups']], 'Design.'),
    pickCode('Which is safe from injection?', ['db.query("SELECT * FROM users WHERE email = ?", [email])', 'db.query("SELECT * FROM users WHERE email = \'" + email + "\'")', 'db.query(`SELECT * FROM users WHERE email = ${email}`)', 'db.query("SELECT * FROM users WHERE email = " + email.trim())'], 'A parameter.'),
    bugTask(['CREATE TABLE users (id INTEGER, email TEXT);', 'SELECT * FROM users WHERE email = \'" + input + "\''], [[1, 'id INTEGER, email TEXT', 'id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE'], [2, '\'" + input + "\'', '? -- with [input] as a parameter']], 'Add keys and rules, and use parameters.'),
    xray(['code | name | platforms', 'DUB | Dublin Central | 1'], [
      ['tr:nth-child(2) td:nth-child(3)', 'The 1 nobody typed', 'DEFAULT 1', ['DEFAULT 1', 'PRIMARY KEY', 'NOT NULL']],
      ['tr:nth-child(2) td:nth-child(1)', 'The unique code', 'PRIMARY KEY', ['DEFAULT 1', 'PRIMARY KEY', 'NOT NULL']],
    ]),
    arrange(['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations VALUES ('VIE', 'Vienna Hauptbahnhof');", 'SELECT name FROM stations;'], 'create the table, add a row, read it', ['name', 'Vienna Hauptbahnhof']),
  ]),
];
