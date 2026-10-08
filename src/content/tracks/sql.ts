import { bug, lesson, order, predict, quiz, read, tap } from '../dsl';
import { SQL_TABLES } from '../sqlFixture';
import type { EditorStep, Lesson } from '../types';

const K = 'SQL';

/** A query exercise: the learner's SQL runs against the sample railway database. */
const query = (o: { title: string; instructions: string; starter: string; expected: string[]; hint: string; solution: string; unordered?: boolean }): EditorStep => ({
  type: 'editor',
  kicker: `PRACTICE · ${K}`,
  lang: 'sql',
  file: 'query.sql',
  title: o.title,
  instructions: o.instructions,
  starter: o.starter,
  tests: [{ stdout: o.expected.join('\n'), unordered: o.unordered }],
  hint: o.hint,
  solution: o.solution,
});

export const SQL_LESSONS: Lesson[] = [
  lesson('sql-select', 'Tables and SELECT', 'sql', ['Data lives in tables of rows and columns', 'SELECT picks columns', 'FROM names the table'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Ask the database a question',
      body: 'A database keeps data in tables. Each row is one record and each column one field. SELECT says which columns you want, FROM says which table. Here is the trains table we will use all track long.',
      lang: 'sql',
      code: [...SQL_TABLES.map((l) => `-- ${l}`), '', 'SELECT name, fare FROM trains;'],
      tip: 'SELECT * means "every column".',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Which table?',
      instructions: 'Tap the name of the table this query reads from.',
      lang: 'sql',
      lines: ['SELECT name, seats', 'FROM trains;'],
      target: { line: 1, token: 'trains' },
      explain: 'FROM is followed by the table name.',
    }),
    query({
      title: 'List every train',
      instructions: 'Show the name of every train. Any order is fine.',
      unordered: true,
      starter: 'SELECT * FROM trains;',
      expected: ['Rajdhani', 'Shatabdi', 'Vande Bharat', 'Karnataka Express', 'Howrah Rajdhani', 'Coimbatore Express'],
      hint: 'SELECT name FROM trains;',
      solution: 'SELECT name FROM trains;',
    }),
  ]),

  lesson('sql-where', 'Filtering with WHERE', 'sql', ['WHERE keeps rows that match', 'Compare with =, <, >, <>', 'Text goes in single quotes'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Only the rows you need',
      body: 'WHERE filters rows before they are returned. Combine conditions with AND and OR. Text values go in single quotes.',
      lang: 'sql',
      code: ['SELECT name FROM trains', "WHERE to_city = 'Delhi' AND fare < 3000;"],
      tip: '<> means "not equal" in SQL.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'How many rows?',
      lang: 'sql',
      lines: ['SELECT COUNT(*) FROM trains', 'WHERE seats > 10;'],
      answer: '4',
      explain: 'Rajdhani (12), Vande Bharat (40), Howrah Rajdhani (22) and Coimbatore Express (60).',
    }),
    query({
      title: 'Trains from Delhi',
      instructions: "Show the name of every train whose from_city is 'Delhi'.",
      starter: 'SELECT name FROM trains;',
      expected: ['Shatabdi', 'Vande Bharat'],
      hint: "SELECT name FROM trains WHERE from_city = 'Delhi';",
      solution: "SELECT name FROM trains WHERE from_city = 'Delhi';",
    }),
  ]),

  lesson('sql-order', 'ORDER BY and LIMIT', 'sql', ['ORDER BY sorts results', 'DESC sorts high to low', 'LIMIT keeps the first few'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Sort and trim',
      body: 'Rows come back in no guaranteed order unless you ask. ORDER BY fare sorts low to high; add DESC for high to low. LIMIT 3 keeps only the first three.',
      lang: 'sql',
      code: ['SELECT name, fare FROM trains', 'ORDER BY fare DESC', 'LIMIT 2;'],
      tip: 'ORDER BY comes after WHERE and before LIMIT.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Cheapest ticket',
      lang: 'sql',
      lines: ['SELECT name FROM trains', 'ORDER BY fare', 'LIMIT 1;'],
      answer: 'Coimbatore Express',
      explain: 'Coimbatore Express has the lowest fare, 850.',
    }),
    query({
      title: 'Top 3 most expensive',
      instructions: 'Show name and fare of the three most expensive trains, most expensive first.',
      starter: 'SELECT name, fare FROM trains;',
      expected: ['Howrah Rajdhani | 3100', 'Rajdhani | 2900', 'Karnataka Express | 2100'],
      hint: 'ORDER BY fare DESC LIMIT 3',
      solution: 'SELECT name, fare FROM trains ORDER BY fare DESC LIMIT 3;',
    }),
  ]),

  lesson('sql-agg', 'COUNT, SUM and AVG', 'sql', ['Aggregates turn many rows into one value', 'COUNT counts, SUM adds, AVG averages', 'MIN and MAX find extremes'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Summarise a table',
      body: 'Aggregate functions squash many rows into one answer: COUNT(*) counts rows, SUM(seats) adds a column, AVG(fare) averages it, MIN and MAX find the smallest and largest.',
      lang: 'sql',
      code: ['SELECT COUNT(*), MAX(fare) FROM trains;'],
      tip: 'COUNT(column) skips NULLs; COUNT(*) counts every row.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Seats left in total',
      lang: 'sql',
      lines: ['SELECT SUM(seats) FROM trains;'],
      answer: '139',
      explain: '12 + 0 + 40 + 5 + 22 + 60 = 139.',
    }),
    query({
      title: 'Cheapest fare to Delhi',
      instructions: "Show the lowest fare among trains whose to_city is 'Delhi'.",
      starter: 'SELECT fare FROM trains;',
      expected: ['2100'],
      hint: "SELECT MIN(fare) FROM trains WHERE to_city = 'Delhi';",
      solution: "SELECT MIN(fare) FROM trains WHERE to_city = 'Delhi';",
    }),
  ]),

  lesson('sql-group', 'GROUP BY', 'sql', ['GROUP BY makes one row per group', 'Aggregates run per group', 'HAVING filters groups'], [
    read({
      kicker: `READ · ${K}`,
      title: 'One answer per group',
      body: 'GROUP BY to_city puts rows with the same destination together; COUNT(*) then counts each group. HAVING filters groups the way WHERE filters rows.',
      lang: 'sql',
      code: ['SELECT to_city, COUNT(*) FROM trains', 'GROUP BY to_city', 'HAVING COUNT(*) > 1;'],
      tip: 'Every selected column must be grouped or aggregated.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Busiest destination',
      lang: 'sql',
      lines: ['SELECT to_city FROM trains', 'GROUP BY to_city', 'ORDER BY COUNT(*) DESC', 'LIMIT 1;'],
      answer: 'Delhi',
      explain: 'Three trains go to Delhi; every other city has one.',
    }),
    query({
      title: 'Seats booked per passenger',
      instructions: 'From bookings, show each passenger and the total seats they booked, sorted by passenger name.',
      starter: 'SELECT passenger, seats FROM bookings;',
      expected: ['Asha | 4', 'Kabir | 3', 'Meera | 1', 'Ravi | 1'],
      hint: 'SELECT passenger, SUM(seats) FROM bookings GROUP BY passenger ORDER BY passenger;',
      solution: 'SELECT passenger, SUM(seats) FROM bookings GROUP BY passenger ORDER BY passenger;',
    }),
  ]),

  lesson('sql-join', 'JOIN', 'sql', ['JOIN combines related tables', 'ON says how rows match', 'Prefix columns with the table name'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Connect two tables',
      body: 'bookings stores a train_id, not the train name. JOIN matches each booking with its train using ON bookings.train_id = trains.id, so you can show both.',
      lang: 'sql',
      code: ['SELECT bookings.passenger, trains.name', 'FROM bookings', 'JOIN trains ON bookings.train_id = trains.id;'],
      tip: 'Short aliases help: FROM bookings b JOIN trains t ON b.train_id = t.id.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'The matching rule',
      instructions: 'Tap the keyword that introduces how rows are matched.',
      lang: 'sql',
      lines: ['SELECT b.passenger, t.name', 'FROM bookings b', 'JOIN trains t ON b.train_id = t.id;'],
      target: { line: 2, token: 'ON' },
      explain: 'ON gives the condition that links the two tables.',
    }),
    query({
      title: "Asha's trains",
      instructions: "Show the names of the trains Asha booked, sorted by name.",
      starter: "SELECT train_id FROM bookings WHERE passenger = 'Asha';",
      expected: ['Rajdhani', 'Vande Bharat'],
      hint: "JOIN trains t ON b.train_id = t.id WHERE b.passenger = 'Asha' ORDER BY t.name",
      solution: "SELECT t.name FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.passenger = 'Asha' ORDER BY t.name;",
    }),
  ]),

  lesson('sql-patterns', 'LIKE, IN and BETWEEN', 'sql', ["LIKE 'R%' matches text patterns", 'IN checks against a list', 'BETWEEN includes both ends'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Flexible filters',
      body: "LIKE matches patterns: % means any characters. IN ('Delhi', 'Mumbai') checks a list. BETWEEN 1000 AND 2000 is a range that includes both ends.",
      lang: 'sql',
      code: ["SELECT name FROM trains WHERE name LIKE '%Rajdhani%';", 'SELECT name FROM trains WHERE fare BETWEEN 1000 AND 2000;'],
      tip: "'R%' means starts with R; '%s' means ends with s.",
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Pattern count',
      lang: 'sql',
      lines: ['SELECT COUNT(*) FROM trains', "WHERE name LIKE '%Express';"],
      answer: '2',
      explain: 'Karnataka Express and Coimbatore Express end with "Express".',
    }),
    query({
      title: 'Mid-range fares',
      instructions: 'Show the names of trains with a fare between 1000 and 2000 (inclusive), cheapest first.',
      starter: 'SELECT name FROM trains;',
      expected: ['Shatabdi', 'Vande Bharat'],
      hint: 'WHERE fare BETWEEN 1000 AND 2000 ORDER BY fare',
      solution: 'SELECT name FROM trains WHERE fare BETWEEN 1000 AND 2000 ORDER BY fare;',
    }),
  ]),

  lesson('sql-change', 'INSERT, UPDATE and DELETE', 'sql', ['INSERT adds rows', 'UPDATE changes rows', 'Always use WHERE with UPDATE and DELETE'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Changing data',
      body: 'INSERT INTO adds a row, UPDATE changes values in matching rows, DELETE removes rows. Without a WHERE, UPDATE and DELETE hit every row in the table.',
      lang: 'sql',
      code: ["INSERT INTO bookings VALUES (6, 12002, 'Zoya', 1);", 'UPDATE trains SET seats = seats - 1 WHERE id = 12002;', 'DELETE FROM bookings WHERE id = 6;'],
      tip: 'Run the WHERE as a SELECT first to see which rows will change.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'The dangerous update',
      instructions: 'This should cut the Rajdhani fare by 100 but changes every train. Which line is wrong?',
      lang: 'sql',
      lines: ['UPDATE trains', 'SET fare = fare - 100;'],
      bug: 1,
      fix: 'SET fare = fare - 100 WHERE id = 12951;',
      explain: 'Without WHERE, the update applies to all rows.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Write an INSERT',
      instructions: 'Arrange the INSERT statement for a new booking.',
      lang: 'sql',
      lines: ['INSERT INTO bookings', '(id, train_id, passenger, seats)', "VALUES (7, 22436, 'Dev', 2);"],
      explain: 'Table, then column list, then the matching values.',
    }),
  ]),

  lesson('sql-design', 'Keys and table design', 'sql', ['A primary key identifies each row', 'A foreign key points to another table', 'Split data to avoid repeating it'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Design tables that stay correct',
      body: 'A PRIMARY KEY is unique for every row. bookings.train_id is a FOREIGN KEY: it refers to trains.id. Storing the train once and referring to it avoids repeated, out-of-sync data.',
      lang: 'sql',
      code: ['CREATE TABLE bookings (', '  id INTEGER PRIMARY KEY,', '  train_id INTEGER REFERENCES trains(id),', '  passenger TEXT NOT NULL,', '  seats INTEGER', ');'],
      tip: 'This idea of not repeating data is called normalisation.',
    }),
    quiz({
      prompt: 'Which column should be the primary key of trains?',
      options: ['id', 'name', 'fare', 'to_city'],
      mono: true,
      right: 'id is unique for every train and never changes.',
      wrong: 'Names, fares and cities can repeat. The unique id is the primary key.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Create a table',
      instructions: 'Put the CREATE TABLE statement in order.',
      lang: 'sql',
      lines: ['CREATE TABLE stations (', '  code TEXT PRIMARY KEY,', '  name TEXT NOT NULL', ');'],
      explain: 'Columns go inside the parentheses, separated by commas.',
    }),
  ]),

  lesson('sql-sub', 'Subqueries', 'sql', ['A query can use another query', 'Subqueries in WHERE compare against a result', 'Great for "above average" questions'], [
    read({
      kicker: `READ · ${K}`,
      title: 'A query inside a query',
      body: 'A subquery runs first and its result is used by the outer query. "Trains costlier than average" needs the average first, so it goes in a subquery.',
      lang: 'sql',
      code: ['SELECT name FROM trains', 'WHERE fare > (SELECT AVG(fare) FROM trains);'],
      tip: 'IN (SELECT ...) checks against a whole column of results.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Above average',
      lang: 'sql',
      lines: ['SELECT COUNT(*) FROM trains', 'WHERE fare > (SELECT AVG(fare) FROM trains);'],
      answer: '3',
      explain: 'The average fare is 1983.33; Rajdhani, Karnataka Express and Howrah Rajdhani are above it.',
    }),
    query({
      title: 'Trains nobody booked',
      instructions: 'Show the names of trains with no bookings, sorted by name.',
      starter: 'SELECT name FROM trains;',
      expected: ['Coimbatore Express', 'Howrah Rajdhani', 'Shatabdi'],
      hint: 'WHERE id NOT IN (SELECT train_id FROM bookings)',
      solution: 'SELECT name FROM trains WHERE id NOT IN (SELECT train_id FROM bookings) ORDER BY name;',
    }),
  ]),
];
