// Extra practice for each SQL module. Every predicted result is run against the sample database in tests.
import { bug, order, predict, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · SQL';
const p = (title: string, lines: string[], answer: string, explain: string, accept?: string[]) => predict({ kicker: K, title, lang: 'sql', lines, answer, explain, accept });

export const SQL_DRILLS: Record<string, Step[]> = {
  'sql-select': [
    p('Calculate in SELECT', ["SELECT name, seats * 2 FROM trains WHERE name = 'Silver Arrow';"], 'Silver Arrow | 0', 'Silver Arrow has 0 seats, and 0 × 2 is still 0.'),
    quiz({ prompt: 'What does * mean in SELECT * FROM trains?', options: ['Every column', 'Multiply', 'Every row with a star rating', 'The first column'], right: 'Right. * selects all columns.', wrong: 'In SELECT, * is shorthand for every column of the table.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should list train names. Tap the line with the mistake.', lang: 'sql', lines: ['SELECT name', 'FORM trains;'], bug: 1, fix: 'FROM trains;', explain: 'The keyword is FROM. A typo in a keyword is a syntax error.' }),
    p('Rename a column', ['SELECT fare AS price FROM trains WHERE id = 11013;'], '850', 'AS only renames the column in the result; the value is still the fare, 850.'),
  ],
  'sql-where': [
    p('Not equal', ["SELECT COUNT(*) FROM trains WHERE to_city <> 'Dublin';"], '3', 'Three trains go to Dublin, so the other 3 of the 6 do not.'),
    p('Edges count', ['SELECT name FROM trains WHERE seats <= 5 ORDER BY seats;'], 'Silver Arrow\nKeystone Express', '<= includes 5, so Keystone Express (5 seats) is kept along with Silver Arrow (0).'),
    quiz({ prompt: "What does WHERE NOT from_city = 'Madrid' keep?", options: ['Trains that do not start in Madrid', 'Only Madrid trains', 'Nothing', 'Every train'], right: 'Right. NOT flips the condition.', wrong: 'NOT turns true into false and false into true, so Madrid trains are dropped.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should show trains from Madrid that cost under 1000. Tap the buggy line.', lang: 'sql', lines: ['SELECT name FROM trains', "WHERE from_city = 'Madrid' OR fare < 1000;"], bug: 1, fix: "WHERE from_city = 'Madrid' AND fare < 1000;", explain: 'Both conditions must be true, so it needs AND, not OR.' }),
  ],
  'sql-patterns': [
    p('Starts with', ["SELECT name FROM trains WHERE name LIKE 'K%';"], 'Keystone Express', "'K%' means it starts with K, then anything."),
    p('In a list', ["SELECT COUNT(*) FROM trains WHERE to_city IN ('Boston', 'Vienna');"], '2', 'One train goes to each of the two cities.'),
    p('Known phones', ['SELECT COUNT(*) FROM passengers WHERE phone IS NOT NULL;'], '3', 'Reed and Megan have no phone, so 3 of the 5 do.'),
    quiz({ prompt: 'What is NULL in a database?', options: ['A missing, unknown value', 'The number zero', 'An empty piece of text', 'A deleted row'], right: 'Right. That is why = NULL never matches.', wrong: 'NULL means “unknown”. It is different from 0 or empty text.' }),
  ],
  'sql-order': [
    p('Highest seats', ['SELECT name FROM trains ORDER BY seats DESC LIMIT 1;'], 'Coastal Express', 'Coastal Express has the most seats left, 60.'),
    p('Page two', ['SELECT name FROM trains ORDER BY fare LIMIT 2 OFFSET 2;'], 'Valley Express\nKeystone Express', 'Sorted by fare: 850, 1200, 1750, 2100… OFFSET 2 skips the first two.'),
    p('Unique cities', ['SELECT COUNT(DISTINCT from_city) FROM trains;'], '4', 'Trains start from Madrid, Dublin, Barcelona and Kyoto.'),
    order({ kicker: K, title: 'Arrange the query', instructions: 'Arrange it to show the 3 dearest trains, dearest first.', lang: 'sql', lines: ['SELECT name, fare', 'FROM trains', 'ORDER BY fare DESC', 'LIMIT 3;'], output: ['Harbour Royal | 3100', 'Royal | 2900', 'Keystone Express | 2100'], explain: 'Sort first, then LIMIT keeps the top three.' }),
  ],
  'sql-agg': [
    p('Cheapest fare', ['SELECT MIN(fare) FROM trains;'], '850', 'Coastal Express is the cheapest at 850.'),
    p('Seats left in total', ['SELECT SUM(seats) FROM trains;'], '139', '12 + 0 + 40 + 5 + 22 + 60 = 139.'),
    p('Rounded average', ['SELECT ROUND(AVG(age), 1) FROM passengers;'], '30.2', 'Ages 15, 34, 22, 61 and 19 add to 151; 151 ÷ 5 = 30.2.'),
    quiz({ prompt: 'COUNT(city) on the passengers table gives 4, but there are 5 passengers. Why?', options: ['COUNT(column) skips NULL, and Zoey’s city is NULL', 'One row is hidden', 'COUNT is approximate', 'It counts unique cities'], right: 'Right. Use COUNT(*) to count rows.', wrong: 'Aggregates skip NULL. Zoey has no city, so COUNT(city) is 4.' }),
  ],
  'sql-group': [
    p('Trains per start city', ['SELECT from_city, COUNT(*) FROM trains', 'GROUP BY from_city', 'ORDER BY COUNT(*) DESC, from_city', 'LIMIT 1;'], 'Dublin | 2', 'Dublin and Madrid both have 2 trains; the tie is broken alphabetically, so Dublin comes first.'),
    p('Bookings per train', ['SELECT train_id, COUNT(*) FROM bookings', 'GROUP BY train_id', 'HAVING COUNT(*) = 2', 'ORDER BY train_id;'], '12951 | 2\n22436 | 2', 'Trains 12951 and 22436 each have two bookings.'),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This should show passengers with more than one booking. Tap the buggy line.', lang: 'sql', lines: ['SELECT passenger, COUNT(*) FROM bookings', 'WHERE COUNT(*) > 1 GROUP BY passenger;'], bug: 1, fix: 'GROUP BY passenger HAVING COUNT(*) > 1;', explain: 'Conditions on a COUNT belong in HAVING, after GROUP BY.' }),
    quiz({ prompt: 'Which runs first?', options: ['WHERE', 'HAVING', 'SELECT', 'ORDER BY'], right: 'Right. WHERE filters rows before any grouping.', wrong: 'The order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.' }),
  ],
  'sql-join': [
    p('Cost of a booking', ['SELECT t.fare * b.seats FROM bookings b', 'JOIN trains t ON b.train_id = t.id', 'WHERE b.id = 3;'], '8700', 'Booking 3 is Kaden’s 3 seats on Royal at 2900: 8700.'),
    p('Count the matches', ['SELECT COUNT(*) FROM bookings b', 'JOIN trains t ON b.train_id = t.id', "WHERE t.to_city = 'Dublin';"], '3', 'Bookings 1, 3 and 4 are on trains to Dublin.'),
    quiz({ prompt: 'Why write b.seats instead of just seats here?', options: ['Both tables have a seats column', 'It runs faster', 'b means bold', 'SQL needs a dot in every column'], right: 'Right. The prefix says which table’s seats you mean.', wrong: 'bookings and trains both have seats. The prefix removes the doubt.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This pairs every booking with every train. Tap the buggy line.', lang: 'sql', lines: ['SELECT b.passenger, t.name', 'FROM bookings b', 'JOIN trains t ON b.id = t.id;'], bug: 2, fix: 'JOIN trains t ON b.train_id = t.id;', explain: 'Match the booking’s train_id with the train’s id, not the booking’s own id.' }),
  ],
  'sql-left': [
    p('Bookings per person', ['SELECT p.name, COUNT(b.id) FROM passengers p', 'LEFT JOIN bookings b ON b.passenger = p.name', 'GROUP BY p.name', 'ORDER BY COUNT(b.id), p.name', 'LIMIT 1;'], 'Zoey | 0', 'Zoey has no bookings, so COUNT(b.id) is 0 for her.'),
    p('Unbooked trains', ['SELECT COUNT(*) FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'WHERE b.id IS NULL;'], '3', 'Silver Arrow, Harbour Royal and Coastal Express have no bookings.'),
    quiz({ prompt: 'After a LEFT JOIN, what is in the right table’s columns when there was no match?', options: ['NULL', '0', 'The left row again', 'The row is removed'], right: 'Right. That is what WHERE … IS NULL looks for.', wrong: 'Unmatched rows are kept, and the right side is filled with NULL.' }),
    quiz({ prompt: 'Which question needs a LEFT JOIN?', options: ['Students who have not paid any fee', 'Students and the fees they paid', 'Total fees paid', 'The highest fee'], right: 'Right. “Who has not …” means keeping rows with no match.', wrong: 'Finding what is missing needs LEFT JOIN plus IS NULL. The others work with a normal JOIN.' }),
  ],
  'sql-sub': [
    p('A subquery value', ['SELECT name FROM trains', 'WHERE fare = (SELECT MAX(fare) FROM trains);'], 'Harbour Royal', 'The subquery finds 3100, the highest fare.'),
    p('Not in the list', ['SELECT COUNT(*) FROM passengers', 'WHERE name NOT IN (SELECT passenger FROM bookings);'], '1', 'Only Zoey never booked.'),
    p('Two named steps', ['WITH dublin AS (SELECT * FROM trains WHERE to_city = \'Dublin\'),', 'cheap AS (SELECT * FROM dublin WHERE fare < 3000)', 'SELECT COUNT(*) FROM cheap;'], '2', 'Three trains go to Dublin; two of them cost under 3000.'),
    quiz({ prompt: 'How long does a CTE (WITH name AS …) last?', options: ['Only for the one query it belongs to', 'Until the database restarts', 'Forever, like a table', 'Until you delete it'], right: 'Right. It is a named step, not a stored table.', wrong: 'A CTE exists only while its query runs.' }),
  ],
  'sql-window': [
    p('Top rank', ['WITH r AS (SELECT name, RANK() OVER (ORDER BY seats DESC) AS n FROM trains)', 'SELECT name FROM r WHERE n = 2;'], 'Valley Express', 'Coastal Express has most seats (60); Valley Express is next with 40.'),
    p('Number the rows', ['SELECT ROW_NUMBER() OVER (ORDER BY fare), name FROM trains', 'ORDER BY fare LIMIT 2;'], '1 | Coastal Express\n2 | Silver Arrow', 'ROW_NUMBER numbers rows 1, 2, 3… in fare order.'),
    p('Per city rank', ["WITH r AS (SELECT name, to_city, RANK() OVER (PARTITION BY to_city ORDER BY fare) AS n FROM trains)", "SELECT name FROM r WHERE to_city = 'Dublin' AND n = 1;"], 'Keystone Express', 'Among Dublin trains, Keystone Express (2100) is cheapest.'),
    quiz({ prompt: 'What does PARTITION BY do in a window?', options: ['Restarts the window for each group', 'Deletes duplicates', 'Sorts the final result', 'Splits the table into two tables'], right: 'Right. Ranks and running totals start again per group.', wrong: 'PARTITION BY splits rows into groups and the window restarts in each one.' }),
  ],
  'sql-change': [
    p('After an insert', ["INSERT INTO bookings VALUES (6, 12002, 'Zoey', 1);", 'SELECT COUNT(*) FROM bookings;'], '6', 'There were 5 bookings, and one is added.'),
    p('After an update', ['UPDATE trains SET fare = fare + 100 WHERE id = 11013;', 'SELECT fare FROM trains WHERE id = 11013;'], '950', '850 + 100 = 950, only for that train.'),
    p('Delete with WHERE', ["DELETE FROM bookings WHERE passenger = 'Ava';", 'SELECT COUNT(*) FROM bookings;'], '3', 'Ava had two bookings, so 3 are left.'),
    quiz({ prompt: 'In a transaction, what does ROLLBACK do?', options: ['Undoes every change since BEGIN', 'Saves the changes', 'Repeats the last change', 'Deletes the table'], right: 'Right. COMMIT keeps changes; ROLLBACK throws them away.', wrong: 'ROLLBACK cancels all the changes made since BEGIN.' }),
  ],
  'sql-design': [
    quiz({ prompt: 'bookings.train_id points to trains.id. What is train_id?', options: ['A foreign key', 'A primary key', 'An index', 'A NULL'], right: 'Right. It refers to another table’s primary key.', wrong: 'A column that refers to another table’s primary key is a foreign key.' }),
    quiz({ prompt: 'Which constraint stops two students using the same email?', options: ['UNIQUE', 'NOT NULL', 'CHECK', 'DEFAULT'], right: 'Right. UNIQUE forbids repeated values.', wrong: 'NOT NULL forbids missing values; UNIQUE forbids repeats.' }),
    quiz({ prompt: 'Which column is the best candidate for an index on bookings?', options: ['train_id, used in every JOIN', 'seats', 'id, which is already the primary key', 'None, ever'], right: 'Right. Columns you filter or join on often benefit.', wrong: 'The primary key is already indexed. train_id is joined on all the time, so index it.' }),
    p('A table you made', ['CREATE TABLE fees (roll INTEGER PRIMARY KEY, amount INTEGER CHECK (amount > 0));', 'INSERT INTO fees VALUES (1, 500);', 'INSERT INTO fees VALUES (2, 700);', 'SELECT SUM(amount) FROM fees;'], '1200', 'Both rows pass the CHECK, so the total is 500 + 700.'),
  ],
};
