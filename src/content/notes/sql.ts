// Module notes for the SQL track (Notes v4 layout: key points, mistakes, self-check). Every worked example and
// mistake runs against the sample railway database in tests, so outputs and error messages are real. Topics the
// lessons had no room for (comments, NOT, self join, RIGHT/FULL JOIN, EXISTS, data types, SQL injection…) are
// covered here, so the track follows W3Schools' SQL tutorial as a checklist, in our own words.
import type { ModuleNotes } from '../types';

export const SQL_NOTES: Record<string, ModuleNotes> = {
  'sql-select': {
    minutes: 5,
    lang: 'sql',
    summary: ['A database keeps data in tables; SQL is how you ask it questions.', 'SELECT columns FROM table; shows those columns for every row.', 'Calculate new columns, rename them with AS, and remove repeats with DISTINCT.'],
    sections: [
      { heading: 'What is a database?', body: 'A database is an organised store of data, kept in tables. Each table has columns (what is stored: name, fare, seats) and rows (one train, one booking). It is like a spreadsheet, but thousands of people and apps can read and change it at the same time, safely. SQL (Structured Query Language, said “S-Q-L” or “sequel”) is the language you use to ask a database for data or to change it.' },
      { heading: 'Where it is used', body: 'Nearly every app keeps its data in a database. When you book a train ticket, the app runs SQL to find trains with free seats and then saves your booking. Banks store every payment in tables. Shops use SQL to answer “how many did we sell this week?”. Data analysts, back-end developers and testers all write SQL daily, which is why it appears in almost every placement test.' },
      { heading: 'Reading a SELECT', body: 'SELECT name, fare FROM trains; means: from the table trains, show the columns name and fare, for every row. * means every column. A column can be calculated, like fare * 2, and AS return_fare gives it a readable name. DISTINCT removes repeated rows. Anything after -- on a line is a comment: the database ignores it, so you can leave notes for people. SQL words work in any case, but capitals make queries easier to read.', code: ['SELECT DISTINCT from_city FROM trains;  -- each city once'] },
    ],
    example: {
      title: 'Return fares',
      code: ['-- Every train, with the price of a return trip', 'SELECT name AS train,', '       fare,', '       fare * 2 AS return_fare', 'FROM trains;'],
      walk: [
        { line: 1, text: 'A comment: the database ignores it.' },
        { line: 2, text: 'Show each train’s name, in a column headed train.' },
        { line: 3, text: 'Show the fare as it is stored.' },
        { line: 4, text: 'Work out fare * 2 for every row and head it return_fare.' },
        { line: 5, text: 'Take the rows from the trains table. The ; ends the query.' },
      ],
      output: ['train | fare | return_fare', 'Coastal Express | 850 | 1700', 'Silver Arrow | 1200 | 2400', 'Harbour Royal | 3100 | 6200', 'Keystone Express | 2100 | 4200', 'Royal | 2900 | 5800', 'Valley Express | 1750 | 3500'],
    },
    mistakes: [
      { title: 'A misspelt column', bad: ['SELECT nme FROM trains;'], error: 'OperationalError: no such column: nme', fix: ['SELECT name FROM trains;'], why: 'The database only knows the exact column names in the table. Check the spelling against the table.' },
      { title: 'A missing comma (no error!)', bad: ['SELECT DISTINCT from_city to_city FROM trains;'], error: 'to_city\nMadrid\nDublin\nKyoto\nBarcelona', fix: ['SELECT DISTINCT from_city, to_city FROM trains;'], why: 'Without the comma, SQL reads to_city as a new name for from_city, just like AS to_city. It runs but gives the wrong answer, which is worse than an error.' },
      { title: 'The wrong table name', bad: ['SELECT * FROM train;'], error: 'OperationalError: no such table: train', fix: ['SELECT * FROM trains;'], why: 'Table names must match exactly, including the plural.' },
    ],
    industry: 'Developers rarely use SELECT * in real code. They list the columns they need, because tables can have dozens of columns and fetching all of them is slow. Analysts write SELECT queries in a database console or a dashboard tool, and back-end code sends the same SQL to the database from Python, Java or Node.js.',
    interview: [
      { q: 'What is the difference between a database and a table?', a: 'A database holds many tables; a table holds rows and columns about one kind of thing.' },
      { q: 'What does DISTINCT do?', a: 'It removes duplicate rows from the result, so each different value appears once.' },
      { q: 'Why avoid SELECT * in real apps?', a: 'It fetches columns you don’t need, which is slower, and code can break when columns are added.' },
    ],
    cheat: [
      { code: 'SELECT a, b FROM t;', meaning: 'columns a and b from table t' },
      { code: 'SELECT * FROM t;', meaning: 'every column' },
      { code: 'fare * 2', meaning: 'a calculated column' },
      { code: 'AS new_name', meaning: 'rename a column in the result' },
      { code: 'SELECT DISTINCT a', meaning: 'each value once' },
      { code: '-- note', meaning: 'a comment, ignored' },
    ],
    check: [
      { q: 'Which query shows only the names of passengers?', options: ['SELECT name FROM passengers;', 'SELECT passengers.name;', 'GET name FROM passengers;'], answer: 0, why: 'SELECT the column, FROM the table.' },
      { q: 'SELECT DISTINCT from_city FROM trains; returns how many rows?', options: ['6', '4', '1'], answer: 1, why: 'Madrid and Dublin each appear twice; DISTINCT keeps one of each: Madrid, Dublin, Kyoto and Barcelona.' },
      { q: 'What does SELECT name fare FROM trains; do?', options: ['Gives an error', 'Shows names under the heading fare', 'Shows name and fare'], answer: 1, why: 'With no comma, fare becomes a new name for the name column.' },
    ],
  },

  'sql-where': {
    minutes: 5,
    lang: 'sql',
    summary: ['WHERE keeps only the rows where a condition is true.', 'Text goes in single quotes; numbers don’t.', 'AND runs before OR, so use brackets when you mix them.'],
    sections: [
      { heading: 'What WHERE does', body: 'A table may hold millions of rows, and you rarely want all of them. WHERE tests each row against a condition and keeps only the rows where it is true. A train app showing “trains to Dublin” is running a WHERE. Text values go in single quotes (\'Dublin\'); numbers are written as they are (2000).', code: ["SELECT name FROM trains WHERE to_city = 'Dublin';"] },
      { heading: 'Comparison operators', body: '= equal, <> or != not equal, < less than, > greater than, <= at most, >= at least. They work on numbers, and on text too (alphabetical order). NOT turns a condition around: NOT to_city = \'Dublin\' keeps every train that doesn’t go to Dublin.', code: ['SELECT name FROM trains WHERE seats >= 20;', "SELECT name FROM trains WHERE NOT from_city = 'Dublin';"] },
      { heading: 'AND, OR and brackets', body: 'AND needs both conditions to be true; OR needs at least one. When you mix them, SQL does AND first, just as maths does × before +. That often gives a different answer from the one you meant, so put brackets around the OR part. Brackets cost nothing and make the meaning clear to the next person who reads the query.', code: ["WHERE (from_city = 'Madrid' OR from_city = 'Dublin')", '  AND fare < 1000'] },
    ],
    example: {
      title: 'Affordable trains to Dublin',
      code: ['SELECT name, fare', 'FROM trains', "WHERE to_city = 'Dublin'", '  AND fare < 3000;'],
      walk: [
        { line: 1, text: 'Show the name and fare.' },
        { line: 2, text: 'From the trains table.' },
        { line: 3, text: 'Keep only trains going to Dublin. Dublin is text, so it is in single quotes.' },
        { line: 4, text: 'And only those under 3000. Harbour Royal (3100) goes to Dublin but is dropped here.' },
      ],
      output: ['name | fare', 'Keystone Express | 2100', 'Royal | 2900'],
    },
    mistakes: [
      { title: 'Text without quotes', bad: ['SELECT name FROM trains WHERE to_city = Dublin;'], error: 'OperationalError: no such column: Dublin', fix: ["SELECT name FROM trains WHERE to_city = 'Dublin';"], why: 'Without quotes, SQL thinks Dublin is the name of a column. Text values always go in single quotes.' },
      { title: 'Mixing AND and OR without brackets', bad: ["SELECT name FROM trains WHERE from_city = 'Madrid' OR from_city = 'Dublin' AND fare < 1000;"], error: 'name\nCoastal Express\nRoyal', fix: ["SELECT name FROM trains WHERE (from_city = 'Madrid' OR from_city = 'Dublin') AND fare < 1000;"], why: 'AND runs first, so this means: from Madrid (any fare), or from Dublin and cheap. Royal costs 2900 but still appears. Brackets make OR run first.' },
    ],
    industry: 'Every search box and filter in an app becomes a WHERE clause. Developers never paste a user’s typed text straight into the query; they pass it separately as a parameter, which keeps attackers out (you will see this as SQL injection in Module 13). Databases also use indexes to make WHERE fast on huge tables.',
    interview: [
      { q: 'What is the difference between WHERE and HAVING?', a: 'WHERE filters rows before grouping; HAVING filters groups after GROUP BY. You will meet HAVING in Module 6.' },
      { q: 'Which runs first, AND or OR?', a: 'AND. Use brackets to make OR run first.' },
      { q: 'What does <> mean?', a: 'Not equal to. Most databases also accept !=.' },
    ],
    cheat: [
      { code: "WHERE city = 'Dublin'", meaning: 'text in single quotes' },
      { code: 'WHERE fare < 2000', meaning: 'numbers without quotes' },
      { code: '<> or !=', meaning: 'not equal' },
      { code: 'a AND b', meaning: 'both true' },
      { code: 'a OR b', meaning: 'at least one true' },
      { code: 'NOT a', meaning: 'turns a condition around' },
      { code: '(a OR b) AND c', meaning: 'brackets make OR run first' },
    ],
    check: [
      { q: 'Which finds trains with no free seats?', options: ['WHERE seats = 0', "WHERE seats = '0 seats'", 'WHERE seats IS EMPTY'], answer: 0, why: 'seats is a number, so compare it to 0 with no quotes.' },
      { q: 'In a OR b AND c, what runs first?', options: ['a OR b', 'b AND c', 'Left to right'], answer: 1, why: 'AND runs before OR, like × before +.' },
      { q: 'Which keeps trains that do NOT start in Madrid?', options: ["WHERE from_city <> 'Madrid'", "WHERE from_city = NOT 'Madrid'", "WHERE NOT 'Madrid'"], answer: 0, why: '<> means not equal. NOT from_city = \'Madrid\' works too.' },
    ],
  },

  'sql-patterns': {
    minutes: 5,
    lang: 'sql',
    summary: ['LIKE matches patterns: % is any text, _ is exactly one character.', 'IN checks a list; BETWEEN checks a range (both ends included).', 'NULL means unknown: test it with IS NULL, never = NULL.'],
    sections: [
      { heading: 'Patterns with LIKE', body: 'When you type “exp” into a search box and see “Coastal Express”, a LIKE query is often behind it. % stands for any text, including none: \'%Express\' means “ends with Express”, \'S%\' means “starts with S”, and \'%Royal%\' means “contains Royal”. _ stands for exactly one character: \'R_yal\' matches Royal. In SQLite, LIKE ignores upper and lower case for English letters; some databases don’t.', code: ["SELECT name FROM trains WHERE name LIKE '%Royal%';", "SELECT name FROM trains WHERE name LIKE 'R_yal';"] },
      { heading: 'IN and BETWEEN', body: 'IN checks a value against a list, which is shorter than many ORs: from_city IN (\'Madrid\', \'Kyoto\'). BETWEEN checks a range, and both ends count: fare BETWEEN 1000 AND 2000 includes 1000 and 2000. Both can be turned around with NOT: NOT IN and NOT BETWEEN.', code: ["WHERE from_city IN ('Madrid', 'Kyoto')", 'WHERE fare NOT BETWEEN 1000 AND 2000'] },
      { heading: 'NULL: the missing value', body: 'NULL means “unknown” or “not filled in”, like a passenger who didn’t give a phone number. It is not zero and not empty text. Anything compared with NULL using = gives unknown, so the row is never kept. Use IS NULL and IS NOT NULL instead. This is one of the most common interview questions on SQL.', code: ['SELECT name FROM passengers WHERE phone IS NULL;'] },
    ],
    example: {
      title: 'Express trains from Spain',
      code: ['SELECT name, from_city, fare', 'FROM trains', "WHERE name LIKE '%Express'", "  AND from_city IN ('Madrid', 'Barcelona')", '  AND fare BETWEEN 800 AND 2500;'],
      walk: [
        { line: 3, text: 'Names ending in Express: % matches whatever comes before.' },
        { line: 4, text: 'Starting in Madrid or Barcelona: one IN instead of two ORs.' },
        { line: 5, text: 'Fares from 800 to 2500, both ends included.' },
      ],
      output: ['name | from_city | fare', 'Coastal Express | Madrid | 850', 'Keystone Express | Barcelona | 2100'],
    },
    mistakes: [
      { title: 'Comparing with = NULL', bad: ['SELECT name FROM passengers WHERE phone = NULL;'], error: 'name\n(no rows)', fix: ['SELECT name FROM passengers WHERE phone IS NULL;'], why: 'NULL is unknown, and “is this equal to unknown?” is never true. IS NULL is the only way to find missing values.' },
      { title: 'LIKE without a wildcard', bad: ["SELECT name FROM trains WHERE name LIKE 'Express';"], error: 'name\n(no rows)', fix: ["SELECT name FROM trains WHERE name LIKE '%Express';"], why: 'Without % the pattern must match the whole name exactly. Add % where any text may appear.' },
    ],
    industry: 'Search boxes often start with LIKE \'%text%\', but on big tables that is slow because the database has to read every row. Large apps switch to full-text search for that. Handling NULL correctly matters in reports: a forgotten IS NULL check can quietly leave people out of a count.',
    interview: [
      { q: 'What is the difference between % and _ in LIKE?', a: '% matches any number of characters (even none); _ matches exactly one.' },
      { q: 'Does BETWEEN include both ends?', a: 'Yes. BETWEEN 1 AND 5 includes 1 and 5.' },
      { q: 'Why does WHERE phone = NULL return nothing?', a: 'Any comparison with NULL is unknown, not true. Use IS NULL.' },
    ],
    cheat: [
      { code: "LIKE 'S%'", meaning: 'starts with S' },
      { code: "LIKE '%ss%'", meaning: 'contains ss' },
      { code: "LIKE 'R_yal'", meaning: '_ is one character' },
      { code: "IN ('a', 'b')", meaning: 'one of a list' },
      { code: 'BETWEEN 1 AND 5', meaning: 'range, both ends included' },
      { code: 'IS NULL / IS NOT NULL', meaning: 'missing / present' },
    ],
    check: [
      { q: "Which names match LIKE 'S%'?", options: ['Silver Arrow', 'Coastal Express', 'Harbour Royal'], answer: 0, why: 'S% means the name starts with S.' },
      { q: 'Which finds passengers who gave a phone number?', options: ['WHERE phone IS NOT NULL', 'WHERE phone != NULL', "WHERE phone <> ''"], answer: 0, why: 'Only IS NOT NULL tests for a value being present.' },
      { q: 'Is a fare of 2000 kept by BETWEEN 1000 AND 2000?', options: ['Yes', 'No', 'Only in some databases'], answer: 0, why: 'BETWEEN includes both ends.' },
    ],
  },

  'sql-order': {
    minutes: 4,
    lang: 'sql',
    summary: ['ORDER BY sorts the result; ASC (smallest first) is the default.', 'DESC sorts largest first; you can sort by more than one column.', 'LIMIT keeps the first rows, and OFFSET skips some first.'],
    sections: [
      { heading: 'Sorting with ORDER BY', body: 'Without ORDER BY, a database may return rows in any order, and that order can change. When order matters, say so. ORDER BY fare sorts from cheapest to dearest (ASC, the default); ORDER BY fare DESC sorts dearest first. Shopping apps do this every time you choose “Price: low to high”.', code: ['SELECT name, fare FROM trains ORDER BY fare DESC;'] },
      { heading: 'Sorting by several columns', body: 'ORDER BY to_city, fare sorts by destination first; trains to the same city are then sorted by fare. Each column can have its own direction: ORDER BY to_city ASC, fare DESC. You can also sort by a calculated column or its alias.', code: ['SELECT name, to_city, fare FROM trains', 'ORDER BY to_city, fare DESC;'] },
      { heading: 'LIMIT, OFFSET and other databases', body: 'LIMIT 3 keeps only the first three rows, which is how “top 3” lists are made. OFFSET 3 skips three rows first, which is how page 2 of search results is made. The order of the clauses is fixed: SELECT, FROM, WHERE, ORDER BY, LIMIT. SQL Server writes SELECT TOP 3 instead, and Oracle writes FETCH FIRST 3 ROWS ONLY; the idea is the same.', code: ['SELECT name FROM trains ORDER BY fare LIMIT 2 OFFSET 2;'] },
    ],
    example: {
      title: 'The three dearest trains',
      code: ['SELECT name, fare', 'FROM trains', 'ORDER BY fare DESC', 'LIMIT 3;'],
      walk: [
        { line: 3, text: 'Sort by fare, largest first.' },
        { line: 4, text: 'Then keep only the first three rows.' },
      ],
      output: ['name | fare', 'Harbour Royal | 3100', 'Royal | 2900', 'Keystone Express | 2100'],
    },
    mistakes: [
      { title: 'Clauses in the wrong order', bad: ['SELECT name FROM trains LIMIT 3 ORDER BY fare;'], error: 'OperationalError: near "ORDER": syntax error', fix: ['SELECT name FROM trains ORDER BY fare LIMIT 3;'], why: 'LIMIT always comes last. SQL sorts first, then cuts the list.' },
      { title: 'Forgetting DESC for “the most”', bad: ['SELECT name, fare FROM trains ORDER BY fare LIMIT 1;'], error: 'name | fare\nCoastal Express | 850', fix: ['SELECT name, fare FROM trains ORDER BY fare DESC LIMIT 1;'], why: 'ORDER BY is smallest first unless you write DESC, so this finds the cheapest train, not the dearest.' },
    ],
    industry: 'Lists in apps are almost always sorted and paged: newest posts first, 20 at a time. Real apps add a tie-breaker column (like id) to ORDER BY so pages never repeat or skip rows. For very deep pages, OFFSET gets slow, so large apps use “keyset” paging: WHERE id < last_seen_id ORDER BY id DESC LIMIT 20.',
    interview: [
      { q: 'What is the default sort order?', a: 'Ascending (ASC): smallest, earliest or A first.' },
      { q: 'How do you get the second page of 10 results?', a: 'ORDER BY something LIMIT 10 OFFSET 10.' },
      { q: 'How do you find the second highest fare?', a: 'SELECT DISTINCT fare FROM trains ORDER BY fare DESC LIMIT 1 OFFSET 1.' },
    ],
    cheat: [
      { code: 'ORDER BY fare', meaning: 'smallest first (ASC)' },
      { code: 'ORDER BY fare DESC', meaning: 'largest first' },
      { code: 'ORDER BY a, b DESC', meaning: 'by a, then b within ties' },
      { code: 'LIMIT 3', meaning: 'first three rows' },
      { code: 'LIMIT 10 OFFSET 20', meaning: 'skip 20, take 10' },
      { code: 'SELECT TOP 3 / FETCH FIRST 3 ROWS ONLY', meaning: 'LIMIT in SQL Server / Oracle' },
    ],
    check: [
      { q: 'Which shows the cheapest train?', options: ['ORDER BY fare LIMIT 1', 'ORDER BY fare DESC LIMIT 1', 'LIMIT 1 ORDER BY fare'], answer: 0, why: 'Smallest first, then keep one row.' },
      { q: 'Which clause comes last?', options: ['LIMIT', 'ORDER BY', 'WHERE'], answer: 0, why: 'SELECT, FROM, WHERE, ORDER BY, LIMIT.' },
      { q: 'LIMIT 5 OFFSET 10 shows which rows?', options: ['Rows 11 to 15', 'Rows 10 to 15', 'Rows 5 to 10'], answer: 0, why: 'It skips 10 rows, then takes 5.' },
    ],
  },

  'sql-agg': {
    minutes: 5,
    lang: 'sql',
    summary: ['Aggregate functions turn many rows into one answer.', 'COUNT(*) counts rows; COUNT(column) skips NULLs.', 'SUM, AVG, MIN and MAX work on a column’s values.'],
    sections: [
      { heading: 'Many rows, one answer', body: 'Managers rarely want every booking; they want “how many bookings?” or “how much money?”. Aggregate functions answer that. COUNT counts, SUM adds up, AVG works out the average, and MIN and MAX find the smallest and largest. Each turns a whole column into a single value.', code: ['SELECT MIN(fare), MAX(fare) FROM trains;'] },
      { heading: 'COUNT(*) and COUNT(column)', body: 'COUNT(*) counts rows. COUNT(phone) counts only the rows where phone is not NULL. In the passengers table that is 5 against 3, because two passengers have no phone. SUM, AVG, MIN and MAX also skip NULLs. COUNT(DISTINCT city) counts the different cities.', code: ['SELECT COUNT(*), COUNT(phone) FROM passengers;', '-- 5 | 3'] },
      { heading: 'Combining with WHERE', body: 'WHERE runs first and picks the rows; the aggregate then works on just those rows. SELECT SUM(seats) FROM bookings WHERE passenger = \'Ava\' adds up Ava’s seats only. You can’t put an aggregate inside WHERE, because WHERE looks at one row at a time. Filtering on totals needs HAVING, in the next module.', code: ["SELECT SUM(seats) FROM bookings WHERE passenger = 'Ava';"] },
    ],
    example: {
      title: 'Booking totals',
      code: ['SELECT COUNT(*) AS bookings,', '       SUM(seats) AS seats,', '       AVG(seats) AS average,', '       MAX(seats) AS biggest', 'FROM bookings;'],
      walk: [
        { line: 1, text: 'How many rows: 5 bookings.' },
        { line: 2, text: 'Add up the seats: 2 + 1 + 3 + 1 + 2 = 9.' },
        { line: 3, text: 'The average: 9 ÷ 5 = 1.8.' },
        { line: 4, text: 'The largest single booking: 3 seats.' },
      ],
      output: ['bookings | seats | average | biggest', '5 | 9 | 1.8 | 3'],
    },
    mistakes: [
      { title: 'An aggregate inside WHERE', bad: ['SELECT COUNT(*) FROM bookings WHERE SUM(seats) > 2;'], error: 'OperationalError: misuse of aggregate: SUM()', fix: ['SELECT COUNT(*) FROM bookings WHERE seats > 2;'], why: 'WHERE checks one row at a time, so it can’t see a total. Compare the column itself, or use HAVING with GROUP BY.' },
      { title: 'COUNT(column) skips NULLs', bad: ['SELECT COUNT(phone) AS passengers FROM passengers;'], error: 'passengers\n3', fix: ['SELECT COUNT(*) AS passengers FROM passengers;'], why: 'There are 5 passengers, but two have no phone. COUNT(phone) counts phones, not people. Use COUNT(*) to count rows.' },
    ],
    industry: 'Dashboards are mostly aggregate queries: daily sign-ups, orders this week, average delivery time. Analysts often run them on copies of the main database so heavy reports don’t slow the app down. Watch out for averages: AVG ignores NULLs, which can make a figure look better than it is.',
    interview: [
      { q: 'What is the difference between COUNT(*) and COUNT(column)?', a: 'COUNT(*) counts every row; COUNT(column) counts rows where that column is not NULL.' },
      { q: 'Name the five common aggregate functions.', a: 'COUNT, SUM, AVG, MIN and MAX.' },
      { q: 'Why can’t you use SUM in WHERE?', a: 'WHERE filters single rows before any totals exist. Filter on totals with HAVING.' },
    ],
    cheat: [
      { code: 'COUNT(*)', meaning: 'number of rows' },
      { code: 'COUNT(col)', meaning: 'rows where col is not NULL' },
      { code: 'COUNT(DISTINCT col)', meaning: 'different values' },
      { code: 'SUM(col) / AVG(col)', meaning: 'total / average' },
      { code: 'MIN(col) / MAX(col)', meaning: 'smallest / largest' },
    ],
    check: [
      { q: 'passengers has 5 rows and 2 NULL phones. What is COUNT(phone)?', options: ['3', '5', '2'], answer: 0, why: 'COUNT(column) skips NULLs.' },
      { q: 'Which gives the most expensive fare?', options: ['MAX(fare)', 'TOP(fare)', 'HIGH(fare)'], answer: 0, why: 'MAX finds the largest value.' },
      { q: 'What runs first?', options: ['WHERE, then the aggregate', 'The aggregate, then WHERE', 'Both at once'], answer: 0, why: 'WHERE picks the rows; the aggregate works on what is left.' },
    ],
  },

  'sql-group': {
    minutes: 5,
    lang: 'sql',
    summary: ['GROUP BY makes one result row for each different value.', 'Aggregates then work inside each group.', 'HAVING filters groups; WHERE filters rows before grouping.'],
    sections: [
      { heading: 'One row per group', body: 'COUNT(*) gives one number for the whole table. GROUP BY passenger gives one number per passenger: the rows are sorted into groups, and the aggregate runs inside each group. This is how “sales per city” or “orders per customer” reports are made. Every column in SELECT should be either in GROUP BY or inside an aggregate.', code: ['SELECT passenger, COUNT(*) FROM bookings', 'GROUP BY passenger;'] },
      { heading: 'HAVING filters groups', body: 'WHERE runs before grouping and can’t see totals. HAVING runs after grouping, so it can: HAVING COUNT(*) > 1 keeps only passengers with more than one booking. A query can use both: WHERE drops rows first, then GROUP BY groups what is left, then HAVING drops groups.', code: ['GROUP BY passenger', 'HAVING COUNT(*) > 1'] },
      { heading: 'The order SQL runs in', body: 'SQL is written SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT, but it runs in a different order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. Knowing this explains most errors: WHERE can’t use totals because they don’t exist yet, while ORDER BY can use aliases because SELECT has already run.' },
    ],
    example: {
      title: 'Passengers who booked two or more seats',
      code: ['SELECT passenger, COUNT(*) AS trips,', '       SUM(seats) AS total', 'FROM bookings', 'GROUP BY passenger', 'HAVING SUM(seats) >= 2', 'ORDER BY total DESC;'],
      walk: [
        { line: 4, text: 'One group per passenger: Ava has two bookings, the others one each.' },
        { line: 1, text: 'In each group, count the bookings…' },
        { line: 2, text: '…and add up the seats: Ava 4, Kaden 3, Reed 1, Megan 1.' },
        { line: 5, text: 'Keep groups with at least 2 seats: Reed and Megan drop out.' },
        { line: 6, text: 'Most seats first.' },
      ],
      output: ['passenger | trips | total', 'Ava | 2 | 4', 'Kaden | 1 | 3'],
    },
    mistakes: [
      { title: 'Filtering totals with WHERE', bad: ['SELECT passenger, COUNT(*) FROM bookings WHERE COUNT(*) > 1 GROUP BY passenger;'], error: 'OperationalError: misuse of aggregate: COUNT()', fix: ['SELECT passenger, COUNT(*) FROM bookings GROUP BY passenger HAVING COUNT(*) > 1;'], why: 'WHERE runs before the groups exist. Conditions on totals belong in HAVING.' },
      { title: 'Forgetting GROUP BY', bad: ['SELECT passenger, COUNT(*) AS trips FROM bookings;'], error: 'passenger | trips\nAva | 5', fix: ['SELECT passenger, COUNT(*) AS trips FROM bookings GROUP BY passenger;'], why: 'Without GROUP BY the whole table is one group, so you get one row: 5 bookings in total, next to a name taken from just one of the rows. Most databases refuse this query; SQLite runs it, which hides the mistake.' },
    ],
    industry: 'GROUP BY is the heart of reporting: revenue per month, users per country, errors per page. Analysts usually build these in SQL and then chart them. A classic placement question is “find duplicate emails”: GROUP BY email HAVING COUNT(*) > 1.',
    interview: [
      { q: 'What is the difference between WHERE and HAVING?', a: 'WHERE filters rows before grouping; HAVING filters groups after GROUP BY, so it can use aggregates.' },
      { q: 'How do you find duplicate values in a column?', a: 'GROUP BY that column HAVING COUNT(*) > 1.' },
      { q: 'In what order does a query run?', a: 'FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.' },
    ],
    cheat: [
      { code: 'GROUP BY col', meaning: 'one row per value' },
      { code: 'HAVING COUNT(*) > 1', meaning: 'keep groups that pass' },
      { code: 'WHERE … GROUP BY … HAVING', meaning: 'rows, then groups' },
      { code: 'GROUP BY a, b', meaning: 'one row per pair' },
    ],
    check: [
      { q: 'Which keeps only passengers with more than one booking?', options: ['GROUP BY passenger HAVING COUNT(*) > 1', 'WHERE COUNT(*) > 1 GROUP BY passenger', 'GROUP BY passenger WHERE COUNT(*) > 1'], answer: 0, why: 'Conditions on totals go in HAVING, after GROUP BY.' },
      { q: 'GROUP BY passenger on the bookings table gives how many rows?', options: ['4', '5', '1'], answer: 0, why: 'Ava, Reed, Kaden and Megan: Ava’s two bookings make one group.' },
      { q: 'Which runs first?', options: ['WHERE', 'HAVING', 'SELECT'], answer: 0, why: 'FROM, WHERE, GROUP BY, HAVING, then SELECT.' },
    ],
  },

  'sql-join': {
    minutes: 6,
    lang: 'sql',
    summary: ['A JOIN puts matching rows from two tables side by side.', 'ON says how rows match, usually id = other_table_id.', 'Short table aliases (b, t) keep joins readable.'],
    sections: [
      { heading: 'Why data is split into tables', body: 'A booking stores train_id 12951, not the train’s name, fare and route. If the fare changes, it changes in one place: the trains table. This is called normalisation. The cost is that answering “who booked which train?” needs data from two tables. A JOIN puts them back together for the query, without changing either table.' },
      { heading: 'JOIN … ON', body: 'FROM bookings JOIN trains ON bookings.train_id = trains.id pairs each booking with the train whose id matches. INNER JOIN and JOIN mean the same: only rows with a match are kept. Aliases make it shorter: FROM bookings b JOIN trains t, then b.seats and t.fare. When two tables share a column name, like id, you must say which one you mean.', code: ['FROM bookings b', 'JOIN trains t ON b.train_id = t.id'] },
      { heading: 'Self join', body: 'A table can be joined to itself, with two different aliases. Joining trains a to trains b ON a.to_city = b.from_city finds connections: a train into Dublin followed by a train out of Dublin. The same idea finds an employee’s manager in an employees table, which is a common interview question.', code: ['SELECT a.name, b.name', 'FROM trains a JOIN trains b ON a.to_city = b.from_city;'] },
    ],
    example: {
      title: 'What each booking cost',
      code: ['SELECT b.passenger, t.name,', '       b.seats * t.fare AS cost', 'FROM bookings b', 'JOIN trains t ON b.train_id = t.id', 'ORDER BY cost DESC;'],
      walk: [
        { line: 3, text: 'Start from bookings, called b for short.' },
        { line: 4, text: 'Pair each booking with its train, called t.' },
        { line: 1, text: 'The passenger comes from bookings, the train’s name from trains.' },
        { line: 2, text: 'Seats from one table times fare from the other.' },
        { line: 5, text: 'The biggest spend first.' },
      ],
      output: ['passenger | name | cost', 'Kaden | Royal | 8700', 'Ava | Royal | 5800', 'Ava | Valley Express | 3500', 'Megan | Keystone Express | 2100', 'Reed | Valley Express | 1750'],
    },
    mistakes: [
      { title: 'A column both tables have', bad: ['SELECT id, name FROM bookings JOIN trains ON train_id = trains.id;'], error: 'OperationalError: ambiguous column name: id', fix: ['SELECT trains.id, name FROM bookings JOIN trains ON train_id = trains.id;'], why: 'Both tables have an id column, so SQL can’t guess which you mean. Put the table name or alias in front.' },
      { title: 'Joining on the wrong columns', bad: ['SELECT b.passenger, t.name FROM bookings b JOIN trains t ON b.id = t.id;'], error: 'passenger | name\n(no rows)', fix: ['SELECT b.passenger, t.name FROM bookings b JOIN trains t ON b.train_id = t.id;'], why: 'A booking’s own id (1 to 5) is not a train id. Join the column that points to the other table (train_id) to that table’s id.' },
    ],
    industry: 'Real databases have dozens of related tables, so most app queries contain joins: orders with customers, posts with authors. The column that points to another table is called a foreign key, and it is usually indexed so joins stay fast. ORMs like Django or Prisma write these joins for you, but you still need to read them when something is slow.',
    interview: [
      { q: 'What is an INNER JOIN?', a: 'It returns only the rows that have a match in both tables.' },
      { q: 'What is a self join?', a: 'A table joined to itself using two aliases, for example to find each employee’s manager.' },
      { q: 'Why split data into several tables?', a: 'So each fact is stored once (normalisation): no repeated data and no copies going out of step.' },
    ],
    cheat: [
      { code: 'A JOIN B ON A.b_id = B.id', meaning: 'matching rows side by side' },
      { code: 'INNER JOIN', meaning: 'same as JOIN' },
      { code: 'FROM bookings b', meaning: 'alias b' },
      { code: 't.name', meaning: 'name from table t' },
      { code: 'trains a JOIN trains b', meaning: 'self join' },
    ],
    check: [
      { q: 'Which ON is right for bookings and trains?', options: ['b.train_id = t.id', 'b.id = t.id', 'b.passenger = t.name'], answer: 0, why: 'train_id in bookings points to id in trains.' },
      { q: 'A booking with a train_id that matches no train. Does INNER JOIN keep it?', options: ['No', 'Yes, with NULLs', 'It gives an error'], answer: 0, why: 'INNER JOIN keeps only rows that match. LEFT JOIN (next module) keeps them.' },
      { q: 'Why does SELECT id fail here?', options: ['Both tables have id', 'id is a reserved word', 'id is NULL'], answer: 0, why: 'Ambiguous: say b.id or t.id.' },
    ],
  },

  'sql-left': {
    minutes: 6,
    lang: 'sql',
    summary: ['LEFT JOIN keeps every row of the first table, matched or not.', 'Missing matches show as NULL; count them with COUNT(column).', 'UNION stacks results and removes repeats; UNION ALL keeps them.'],
    sections: [
      { heading: 'LEFT JOIN keeps everything on the left', body: 'An INNER JOIN drops trains with no bookings. Often those are exactly the ones you need: “which trains sold nothing?”. LEFT JOIN keeps every row from the left (first) table; where there is no match, the right table’s columns are NULL. WHERE b.id IS NULL then finds the rows that had no match at all.', code: ['SELECT t.name FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'WHERE b.id IS NULL;'] },
      { heading: 'RIGHT and FULL JOIN', body: 'RIGHT JOIN is the mirror image: it keeps every row of the second table. Most people swap the table order and use LEFT JOIN instead, because it reads more naturally. FULL JOIN (FULL OUTER JOIN) keeps unmatched rows from both sides. Newer versions of SQLite, PostgreSQL and SQL Server support both; MySQL has no FULL JOIN.', code: ['FROM trains t RIGHT JOIN bookings b ON …', 'FROM trains t FULL JOIN bookings b ON …'] },
      { heading: 'UNION and UNION ALL', body: 'A join puts tables side by side; UNION stacks one result under another. Both queries need the same number of columns, in the same order. UNION removes repeated rows; UNION ALL keeps them all, and it is faster because it doesn’t have to check. Use UNION ALL unless you need repeats removed.', code: ['SELECT from_city AS city FROM trains', 'UNION', 'SELECT to_city FROM trains;'] },
    ],
    example: {
      title: 'Bookings per train, including none',
      code: ['SELECT t.name, COUNT(b.id) AS booked', 'FROM trains t', 'LEFT JOIN bookings b ON b.train_id = t.id', 'GROUP BY t.id', 'ORDER BY booked DESC, t.name;'],
      walk: [
        { line: 3, text: 'Keep every train, even if no booking matches.' },
        { line: 4, text: 'One group per train.' },
        { line: 1, text: 'COUNT(b.id) counts real bookings; for an unbooked train b.id is NULL, so it counts 0.' },
        { line: 5, text: 'Most bookings first; ties in name order.' },
      ],
      output: ['name | booked', 'Royal | 2', 'Valley Express | 2', 'Keystone Express | 1', 'Coastal Express | 0', 'Harbour Royal | 0', 'Silver Arrow | 0'],
    },
    mistakes: [
      { title: 'COUNT(*) after a LEFT JOIN', bad: ['SELECT t.name, COUNT(*) AS booked', 'FROM trains t LEFT JOIN bookings b ON b.train_id = t.id', "WHERE t.from_city = 'Madrid'", 'GROUP BY t.id;'], error: 'name | booked\nCoastal Express | 1\nRoyal | 2', fix: ['SELECT t.name, COUNT(b.id) AS booked', 'FROM trains t LEFT JOIN bookings b ON b.train_id = t.id', "WHERE t.from_city = 'Madrid'", 'GROUP BY t.id;'], why: 'Coastal Express has no bookings, but the LEFT JOIN still gives it one row (with NULLs), and COUNT(*) counts that row. COUNT(b.id) skips the NULL and gives 0.' },
      { title: 'UNION with different columns', bad: ['SELECT name FROM trains', 'UNION', 'SELECT name, age FROM passengers;'], error: 'OperationalError: SELECTs to the left and right of UNION do not have the same number of result columns', fix: ['SELECT name FROM trains', 'UNION', 'SELECT name FROM passengers;'], why: 'Stacked results must have the same number of columns, in the same order.' },
    ],
    industry: 'LEFT JOIN … WHERE right.id IS NULL is the standard way to find “missing” things: customers who never ordered, products never sold, users who didn’t verify their email. UNION ALL is common in reports that combine data from similar tables, such as this year’s and last year’s orders.',
    interview: [
      { q: 'What is the difference between INNER JOIN and LEFT JOIN?', a: 'INNER keeps only matching rows; LEFT keeps every row of the left table, with NULLs where nothing matches.' },
      { q: 'How do you find customers with no orders?', a: 'customers LEFT JOIN orders ON … WHERE orders.id IS NULL.' },
      { q: 'What is the difference between UNION and UNION ALL?', a: 'UNION removes duplicate rows; UNION ALL keeps all of them and is faster.' },
    ],
    cheat: [
      { code: 'A LEFT JOIN B ON …', meaning: 'all of A, matches from B' },
      { code: 'WHERE B.id IS NULL', meaning: 'rows of A with no match' },
      { code: 'RIGHT JOIN', meaning: 'all of B' },
      { code: 'FULL JOIN', meaning: 'all of both' },
      { code: 'UNION / UNION ALL', meaning: 'stack, without / with repeats' },
    ],
    check: [
      { q: 'trains LEFT JOIN bookings: does Silver Arrow (no bookings) appear?', options: ['Yes, with NULL booking columns', 'No', 'Only with RIGHT JOIN'], answer: 0, why: 'LEFT JOIN keeps every train.' },
      { q: 'Which count gives 0 for a train with no bookings?', options: ['COUNT(b.id)', 'COUNT(*)', 'COUNT(t.id)'], answer: 0, why: 'b.id is NULL for that row, and COUNT(column) skips NULLs.' },
      { q: 'Which keeps duplicate rows?', options: ['UNION ALL', 'UNION', 'DISTINCT'], answer: 0, why: 'UNION removes duplicates; UNION ALL keeps them.' },
    ],
  },

  'sql-sub': {
    minutes: 6,
    lang: 'sql',
    summary: ['A subquery is a query inside brackets, used by another query.', 'Use IN when the subquery can return several rows.', 'WITH names a subquery up front, so long queries read top to bottom.'],
    sections: [
      { heading: 'A query inside a query', body: '“Which trains cost more than average?” needs the average first. A subquery works it out inside brackets, and the outer query uses the answer: WHERE fare > (SELECT AVG(fare) FROM trains). The inner query runs first. A subquery can return one value (use =, <, >), a list (use IN), or a whole table (use it in FROM).', code: ['SELECT name FROM trains', 'WHERE fare > (SELECT AVG(fare) FROM trains);'] },
      { heading: 'EXISTS, ANY and ALL', body: 'EXISTS (subquery) is true if the subquery returns at least one row: “trains that have any booking”. NOT EXISTS finds the opposite. ANY and ALL compare a value against a list: fare > ALL (…) means more than every value in it. SQLite has no ANY or ALL, but MySQL, PostgreSQL and SQL Server do; MAX and MIN give the same answer.', code: ['SELECT name FROM trains t WHERE EXISTS (', '  SELECT 1 FROM bookings b WHERE b.train_id = t.id);'] },
      { heading: 'WITH: naming a step', body: 'Nested brackets get hard to read. WITH (a common table expression, or CTE) gives a subquery a name before the main query, so you read the steps in order: first work out each train’s revenue, then pick from it. The name only lasts for that one statement.', code: ['WITH busy AS (SELECT train_id FROM bookings)', 'SELECT name FROM trains WHERE id IN (SELECT train_id FROM busy);'] },
    ],
    example: {
      title: 'Trains dearer than average',
      code: ['SELECT name, fare', 'FROM trains', 'WHERE fare > (', '  SELECT AVG(fare) FROM trains', ');'],
      walk: [
        { line: 4, text: 'The inner query runs first: the average fare is about 1983.' },
        { line: 3, text: 'The outer query keeps trains above that number.' },
      ],
      output: ['name | fare', 'Harbour Royal | 3100', 'Keystone Express | 2100', 'Royal | 2900'],
    },
    mistakes: [
      { title: '= when the subquery returns several rows', bad: ["SELECT name FROM trains WHERE id = (SELECT train_id FROM bookings WHERE passenger = 'Ava');"], error: 'name\nRoyal', fix: ["SELECT name FROM trains WHERE id IN (SELECT train_id FROM bookings WHERE passenger = 'Ava');"], why: 'Ava booked two trains. With =, SQLite quietly uses only the first one, and other databases give an error. IN compares with every row.' },
      { title: 'A subquery without brackets', bad: ['SELECT name FROM trains WHERE fare > SELECT AVG(fare) FROM trains;'], error: 'OperationalError: near "SELECT": syntax error', fix: ['SELECT name FROM trains WHERE fare > (SELECT AVG(fare) FROM trains);'], why: 'A subquery always goes inside brackets.' },
    ],
    industry: 'Analysts use WITH a lot: a long report becomes a few named steps that are easy to check one at a time. Modern databases usually run a subquery and the same query written as a JOIN equally fast, so choose whichever is clearer to read.',
    interview: [
      { q: 'What is a correlated subquery?', a: 'One that uses a column from the outer query, so it runs once for each outer row, like the EXISTS example.' },
      { q: 'What is the difference between IN and EXISTS?', a: 'IN compares a value with a list; EXISTS only checks whether the subquery returns any row. EXISTS can stop at the first match.' },
      { q: 'What is a CTE?', a: 'A named subquery written with WITH before the main query; it lasts for that statement only.' },
    ],
    cheat: [
      { code: 'WHERE x > (SELECT AVG(x) …)', meaning: 'compare with one value' },
      { code: 'WHERE id IN (SELECT …)', meaning: 'match any value in a list' },
      { code: 'WHERE EXISTS (SELECT 1 …)', meaning: 'at least one row exists' },
      { code: 'x > ALL (…) / x > ANY (…)', meaning: 'more than every / some' },
      { code: 'WITH name AS (…) SELECT …', meaning: 'a named step (CTE)' },
    ],
    check: [
      { q: 'A subquery returns many train ids. Which operator?', options: ['IN', '=', '>'], answer: 0, why: 'IN compares with every value in the list.' },
      { q: 'Which runs first?', options: ['The inner query', 'The outer query', 'Both together'], answer: 0, why: 'The outer query needs the inner answer.' },
      { q: 'How long does a WITH name last?', options: ['For that one statement', 'Until the app closes', 'Forever, like a table'], answer: 0, why: 'A CTE belongs to the statement it is written in. A VIEW is the saved kind.' },
    ],
  },

  'sql-case': {
    minutes: 5,
    lang: 'sql',
    summary: ['CASE gives a value based on conditions, like if/else.', 'The first matching WHEN wins, so order them carefully.', 'Functions change values: UPPER, LENGTH, ROUND, COALESCE, dates.'],
    sections: [
      { heading: 'CASE: if/else inside a query', body: 'CASE WHEN condition THEN value … ELSE value END works out a value for each row. Shops use it to label prices as Budget or Premium, and reports use it to sort scores into grades. SQL checks the WHENs from the top, and the first true one wins. Without ELSE, rows that match nothing get NULL.', code: ["CASE WHEN seats = 0 THEN 'Full'", "     ELSE 'Open' END AS status"] },
      { heading: 'Text and number functions', body: 'UPPER(name) and LOWER(name) change case; LENGTH(name) counts characters; SUBSTR(name, 1, 3) takes the first three; TRIM removes spaces at the ends; REPLACE swaps text. To join text, use ||: \'Train \' || name. ROUND(x, 1) rounds to one decimal place, and ABS gives the size of a number without its sign.', code: ["SELECT UPPER(name), LENGTH(name), 'To ' || to_city FROM trains;"] },
      { heading: 'NULL and date functions', body: 'COALESCE(phone, \'no phone\') returns the first value that isn’t NULL, which is handy for display. MySQL also has IFNULL, and SQL Server has ISNULL, for the same job. Dates are stored as text like \'2026-11-02\' in SQLite: date(\'2026-11-02\', \'+7 days\') adds a week, and strftime(\'%Y\', d) takes the year.', code: ["SELECT name, COALESCE(phone, 'no phone') FROM passengers;", "SELECT date('2026-11-02', '+7 days');"] },
    ],
    example: {
      title: 'Fare bands',
      code: ['SELECT name, fare,', '  CASE', "    WHEN fare < 1500 THEN 'Budget'", "    WHEN fare < 2500 THEN 'Standard'", "    ELSE 'Premium'", '  END AS band', 'FROM trains;'],
      walk: [
        { line: 3, text: 'Checked first: under 1500 is Budget.' },
        { line: 4, text: 'Only reached if the first WHEN was false, so this means 1500 to 2499.' },
        { line: 5, text: 'Everything else is Premium.' },
        { line: 6, text: 'END closes the CASE; AS names the new column.' },
      ],
      output: ['name | fare | band', 'Coastal Express | 850 | Budget', 'Silver Arrow | 1200 | Budget', 'Harbour Royal | 3100 | Premium', 'Keystone Express | 2100 | Standard', 'Royal | 2900 | Premium', 'Valley Express | 1750 | Standard'],
    },
    mistakes: [
      { title: 'WHENs in the wrong order', bad: ["SELECT name, CASE WHEN fare < 2500 THEN 'Standard' WHEN fare < 1500 THEN 'Budget' END AS band", 'FROM trains WHERE fare < 1500;'], error: 'name | band\nCoastal Express | Standard\nSilver Arrow | Standard', fix: ["SELECT name, CASE WHEN fare < 1500 THEN 'Budget' WHEN fare < 2500 THEN 'Standard' END AS band", 'FROM trains WHERE fare < 1500;'], why: 'The first true WHEN wins. Every fare under 1500 is also under 2500, so Budget is never reached. Put the narrowest condition first.' },
      { title: 'Joining text with +', bad: ["SELECT 'Train: ' + name AS label FROM trains WHERE id = 12951;"], error: 'label\n0', fix: ["SELECT 'Train: ' || name AS label FROM trains WHERE id = 12951;"], why: 'In SQLite, + always does maths, and text that isn’t a number counts as 0. Join text with ||. (SQL Server uses +, and MySQL uses CONCAT.)' },
    ],
    industry: 'CASE is everywhere in reports: grouping ages into bands, turning status codes into words, counting only some rows with SUM(CASE WHEN … THEN 1 ELSE 0 END). Function names differ between databases more than anything else in SQL, so developers check the documentation for the database they use.',
    interview: [
      { q: 'What does COALESCE do?', a: 'It returns the first of its arguments that is not NULL.' },
      { q: 'What happens to a row that matches no WHEN and there is no ELSE?', a: 'The CASE gives NULL for that row.' },
      { q: 'How would you count rows that pass a condition in one query?', a: 'SUM(CASE WHEN condition THEN 1 ELSE 0 END).' },
    ],
    cheat: [
      { code: 'CASE WHEN … THEN … ELSE … END', meaning: 'if/else for a value' },
      { code: 'UPPER / LOWER / LENGTH', meaning: 'case and length of text' },
      { code: 'SUBSTR(s, 1, 3)', meaning: 'part of text' },
      { code: "'a' || 'b'", meaning: 'join text' },
      { code: 'ROUND(x, 1)', meaning: 'round to 1 decimal' },
      { code: 'COALESCE(a, b)', meaning: 'first value that isn’t NULL' },
      { code: "date(d, '+7 days')", meaning: 'date maths (SQLite)' },
    ],
    check: [
      { q: 'Which WHEN should come first?', options: ['The narrowest condition', 'The widest condition', 'Order doesn’t matter'], answer: 0, why: 'The first true WHEN wins.' },
      { q: "COALESCE(NULL, NULL, 'x') gives?", options: ["'x'", 'NULL', 'An error'], answer: 0, why: 'The first value that isn’t NULL.' },
      { q: 'How do you join two pieces of text in SQLite?', options: ['||', '+', '&'], answer: 0, why: '|| joins text; + does maths.' },
    ],
  },

  'sql-window': {
    minutes: 6,
    lang: 'sql',
    summary: ['Window functions work across rows but keep every row.', 'OVER (ORDER BY …) gives running totals and rankings.', 'PARTITION BY restarts the window for each group.'],
    sections: [
      { heading: 'Totals without losing rows', body: 'GROUP BY squashes rows into one per group. Sometimes you want every row and a total next to it: each booking with the running total of seats sold so far. A window function does that. Write the function, then OVER (…) to say which rows it should look at. The rows themselves stay as they are.', code: ['SELECT id, seats,', '  SUM(seats) OVER (ORDER BY id) AS running', 'FROM bookings;'] },
      { heading: 'Ranking: ROW_NUMBER, RANK, DENSE_RANK', body: 'ROW_NUMBER() OVER (ORDER BY fare DESC) numbers rows 1, 2, 3…. When two rows tie, RANK gives them the same number and then skips (1, 1, 3); DENSE_RANK doesn’t skip (1, 1, 2). LAG(fare) and LEAD(fare) read the previous or next row’s value, which is how “change since yesterday” is worked out.', code: ['SELECT name, fare,', '  RANK() OVER (ORDER BY fare DESC) AS position', 'FROM trains;'] },
      { heading: 'PARTITION BY', body: 'PARTITION BY splits the rows into groups for the window, like GROUP BY but without squashing them. SUM(seats) OVER (PARTITION BY passenger) puts each passenger’s own total on each of their rows. ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC) = 1 finds the top one in each group, a placement favourite.', code: ['SELECT passenger, seats,', '  SUM(seats) OVER (PARTITION BY passenger) AS theirs', 'FROM bookings;'] },
    ],
    example: {
      title: 'Seats sold so far',
      code: ['SELECT passenger, seats,', '       SUM(seats) OVER (ORDER BY id) AS running', 'FROM bookings;'],
      walk: [
        { line: 1, text: 'Every booking stays in the result.' },
        { line: 2, text: 'For each row, add up the seats of this row and every earlier one (in id order).' },
      ],
      output: ['passenger | seats | running', 'Ava | 2 | 2', 'Reed | 1 | 3', 'Kaden | 3 | 6', 'Megan | 1 | 7', 'Ava | 2 | 9'],
    },
    mistakes: [
      { title: 'A window function in WHERE', bad: ['SELECT name FROM trains WHERE RANK() OVER (ORDER BY fare DESC) = 1;'], error: 'OperationalError: misuse of window function RANK()', fix: ['WITH ranked AS (SELECT name, RANK() OVER (ORDER BY fare DESC) AS position FROM trains)', 'SELECT name FROM ranked WHERE position = 1;'], why: 'Window functions run after WHERE, at the SELECT step. Work them out in a WITH (or subquery) first, then filter.' },
      { title: 'Forgetting PARTITION BY', bad: ['SELECT passenger, SUM(seats) OVER () AS theirs FROM bookings WHERE id <= 2;'], error: 'passenger | theirs\nAva | 3\nReed | 3', fix: ['SELECT passenger, SUM(seats) OVER (PARTITION BY passenger) AS theirs FROM bookings WHERE id <= 2;'], why: 'An empty OVER () means the whole result, so every row shows the grand total. PARTITION BY passenger gives each passenger their own.' },
    ],
    industry: 'Window functions are used for leaderboards, running balances in bank statements, and “top 3 products in each category”. They are one of the most asked SQL topics in data and back-end interviews, because they solve in one query what used to need several.',
    interview: [
      { q: 'What is the difference between RANK and DENSE_RANK?', a: 'Both give ties the same number; RANK then skips numbers (1, 1, 3), DENSE_RANK doesn’t (1, 1, 2).' },
      { q: 'How is a window function different from GROUP BY?', a: 'GROUP BY returns one row per group; a window function keeps every row and adds a value to it.' },
      { q: 'How do you get the top row in each group?', a: 'ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC), then keep rows where it is 1.' },
    ],
    cheat: [
      { code: 'f() OVER (ORDER BY x)', meaning: 'running, in x order' },
      { code: 'OVER (PARTITION BY g)', meaning: 'restart for each g' },
      { code: 'ROW_NUMBER()', meaning: '1, 2, 3, 4' },
      { code: 'RANK() / DENSE_RANK()', meaning: '1, 1, 3 / 1, 1, 2' },
      { code: 'LAG(x) / LEAD(x)', meaning: 'previous / next row’s x' },
    ],
    check: [
      { q: 'Scores 90, 90, 80. What does DENSE_RANK give 80?', options: ['2', '3', '1'], answer: 0, why: 'DENSE_RANK doesn’t skip: 1, 1, 2.' },
      { q: 'Does a window function reduce the number of rows?', options: ['No', 'Yes, one per group', 'Only with PARTITION BY'], answer: 0, why: 'It keeps every row and adds a value.' },
      { q: 'Where can you filter on a window function’s result?', options: ['In an outer query or WITH', 'In WHERE', 'In GROUP BY'], answer: 0, why: 'It is worked out after WHERE has run.' },
    ],
  },

  'sql-change': {
    minutes: 6,
    lang: 'sql',
    summary: ['INSERT adds rows, UPDATE changes them, DELETE removes them.', 'Always give UPDATE and DELETE a WHERE, or every row changes.', 'A transaction makes several changes happen together, or not at all.'],
    sections: [
      { heading: 'INSERT, UPDATE, DELETE', body: 'Booking a ticket inserts a row; changing a fare updates one; cancelling deletes one. INSERT INTO table (columns) VALUES (…) adds a row; naming the columns is safer than relying on their order. UPDATE table SET column = value WHERE … changes rows, and DELETE FROM table WHERE … removes them. Without WHERE, UPDATE and DELETE affect every row in the table.', code: ["INSERT INTO passengers (name, age) VALUES ('Leo', 28);", 'UPDATE trains SET fare = fare + 100 WHERE id = 12002;', "DELETE FROM bookings WHERE passenger = 'Reed';"] },
      { heading: 'Copying rows: INSERT INTO … SELECT', body: 'INSERT INTO archive SELECT * FROM bookings WHERE … copies rows from a query straight into another table, with no VALUES. Some databases (SQL Server, PostgreSQL) also have SELECT … INTO new_table, which creates a new table from a query; SQLite and MySQL use CREATE TABLE new_table AS SELECT … for that.', code: ['CREATE TABLE big_bookings AS', '  SELECT * FROM bookings WHERE seats >= 2;'] },
      { heading: 'Transactions', body: 'Booking seats takes two changes: lower the train’s free seats and add the booking. If the app crashed between them, the data would be wrong. BEGIN starts a transaction; COMMIT saves every change together; ROLLBACK cancels them all. Either everything happens or nothing does. Banks rely on this for every transfer.', code: ['BEGIN;', '-- several changes', 'COMMIT;  -- or ROLLBACK;'] },
    ],
    example: {
      title: 'Booking two seats, safely',
      code: ['BEGIN;', 'UPDATE trains SET seats = seats - 2 WHERE id = 12951;', "INSERT INTO bookings (train_id, passenger, seats) VALUES (12951, 'Zoey', 2);", 'COMMIT;', 'SELECT name, seats FROM trains WHERE id = 12951;'],
      walk: [
        { line: 1, text: 'Start a transaction: nothing is final yet.' },
        { line: 2, text: 'Take two free seats off the Royal (12 becomes 10).' },
        { line: 3, text: 'Record Zoey’s booking. The id is filled in automatically.' },
        { line: 4, text: 'Save both changes together.' },
        { line: 5, text: 'Check the result.' },
      ],
      output: ['name | seats', 'Royal | 10'],
    },
    mistakes: [
      { title: 'UPDATE without WHERE', bad: ['UPDATE trains SET fare = 999;'], error: 'OK: 6 rows changed', fix: ['UPDATE trains SET fare = 999 WHERE id = 12951;'], why: 'With no WHERE, every train gets the new fare. Run the WHERE as a SELECT first to see which rows it will change.' },
      { title: 'Values without column names', bad: ["INSERT INTO bookings VALUES (12951, 'Zoey', 2);"], error: 'OperationalError: table bookings has 4 columns but 3 values were supplied', fix: ["INSERT INTO bookings (train_id, passenger, seats) VALUES (12951, 'Zoey', 2);"], why: 'Without a column list you must give a value for every column, in order. Naming the columns lets the database fill in the id.' },
    ],
    industry: 'Apps change data through transactions all the time, and most libraries open one for you. Teams protect production data with backups, “soft deletes” (marking a row deleted instead of removing it) and by running risky UPDATEs inside BEGIN so they can ROLLBACK if the row count looks wrong.',
    interview: [
      { q: 'What is a transaction?', a: 'A group of changes that succeed or fail together: BEGIN, then COMMIT to save or ROLLBACK to undo.' },
      { q: 'What does ACID stand for?', a: 'Atomicity, Consistency, Isolation, Durability: the guarantees a transaction gives.' },
      { q: 'What is the difference between DELETE, TRUNCATE and DROP?', a: 'DELETE removes chosen rows; TRUNCATE removes all rows quickly; DROP removes the whole table.' },
    ],
    cheat: [
      { code: 'INSERT INTO t (a, b) VALUES (1, 2);', meaning: 'add a row' },
      { code: 'UPDATE t SET a = 1 WHERE …;', meaning: 'change rows' },
      { code: 'DELETE FROM t WHERE …;', meaning: 'remove rows' },
      { code: 'INSERT INTO t2 SELECT …', meaning: 'copy rows from a query' },
      { code: 'BEGIN; … COMMIT;', meaning: 'all or nothing' },
      { code: 'ROLLBACK;', meaning: 'cancel the transaction' },
    ],
    check: [
      { q: 'What does DELETE FROM bookings; do?', options: ['Removes every booking', 'Removes the table', 'Gives an error'], answer: 0, why: 'No WHERE means every row. The empty table stays.' },
      { q: 'An error happens after BEGIN. What undoes the changes?', options: ['ROLLBACK', 'COMMIT', 'UNDO'], answer: 0, why: 'ROLLBACK cancels everything since BEGIN.' },
      { q: 'Why name the columns in INSERT?', options: ['Safer if columns change, and others get defaults', 'It is faster', 'It is required'], answer: 0, why: 'Named columns don’t depend on the table’s column order.' },
    ],
  },

  'sql-design': {
    minutes: 6,
    lang: 'sql',
    summary: ['CREATE TABLE sets each column’s type and rules.', 'Constraints (PRIMARY KEY, NOT NULL, UNIQUE, CHECK, FOREIGN KEY) stop bad data.', 'Pass user input as parameters, never pasted into SQL: that prevents SQL injection.'],
    sections: [
      { heading: 'Types and AUTO INCREMENT', body: 'Each column has a type: INTEGER, REAL (decimals), TEXT, DATE, BOOLEAN. Other databases add sizes, like VARCHAR(50). A PRIMARY KEY identifies each row; making it count up by itself is AUTO_INCREMENT in MySQL, SERIAL or IDENTITY in PostgreSQL, and simply INTEGER PRIMARY KEY in SQLite. CREATE DATABASE and DROP DATABASE make and remove whole databases in server databases.', code: ['CREATE TABLE stations (', '  id INTEGER PRIMARY KEY,  -- counts up by itself', '  name TEXT NOT NULL', ');'] },
      { heading: 'Constraints', body: 'NOT NULL: a value is required. UNIQUE: no two rows may share it, like an email. DEFAULT: used when no value is given. CHECK: a rule each row must pass, like age >= 0. FOREIGN KEY … REFERENCES trains(id): the value must exist in the other table. The database refuses any change that breaks a rule, which is safer than checking in app code alone.', code: ['email TEXT UNIQUE,', 'age INTEGER CHECK (age >= 0),', 'train_id INTEGER REFERENCES trains(id)'] },
      { heading: 'SQL injection', body: 'If an app builds SQL by gluing in what a user typed, an attacker can type SQL instead of a name, like \' OR \'1\'=\'1, and read or delete data they shouldn’t. It is one of the most common security holes on the web. The fix is parameters: put ? in the query and pass the values separately, so they are always treated as data, never as SQL.', code: ['-- unsafe: "... WHERE name = \'" + typed + "\'"', 'SELECT * FROM passengers WHERE name = ?;  -- safe'] },
    ],
    example: {
      title: 'A stations table with rules',
      code: ['CREATE TABLE stations (', '  code TEXT PRIMARY KEY,', '  name TEXT NOT NULL,', '  platforms INTEGER DEFAULT 1 CHECK (platforms > 0)', ');', "INSERT INTO stations (code, name) VALUES ('DUB', 'Dublin Central');", "INSERT INTO stations VALUES ('MAD', 'Madrid Central', 12);", 'SELECT * FROM stations;'],
      walk: [
        { line: 2, text: 'Each station has its own code; no two can share one.' },
        { line: 3, text: 'A name is required.' },
        { line: 4, text: 'Platforms defaults to 1 and must be more than 0.' },
        { line: 6, text: 'No platforms given, so DEFAULT fills in 1.' },
        { line: 7, text: 'All three values given, in column order.' },
      ],
      output: ['code | name | platforms', 'DUB | Dublin Central | 1', 'MAD | Madrid Central | 12'],
    },
    mistakes: [
      { title: 'Leaving out a NOT NULL column', bad: ['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations (code) VALUES ('KYO');"], error: 'IntegrityError: NOT NULL constraint failed: stations.name', fix: ['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations (code, name) VALUES ('KYO', 'Kyoto Central');"], why: 'The table says every station needs a name, so the database refuses the row. That is the rule doing its job.' },
      { title: 'A repeated primary key', bad: ['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations VALUES ('DUB', 'Dublin Central');", "INSERT INTO stations VALUES ('DUB', 'Dublin North');"], error: 'IntegrityError: UNIQUE constraint failed: stations.code', fix: ['CREATE TABLE stations (code TEXT PRIMARY KEY, name TEXT NOT NULL);', "INSERT INTO stations VALUES ('DUB', 'Dublin Central');", "INSERT INTO stations VALUES ('DBN', 'Dublin North');"], why: 'A primary key must be different in every row; that is how each row is found.' },
    ],
    industry: 'Teams change tables through “migrations”: small, numbered SQL files (or code) kept in git, so every copy of the database can be brought up to date the same way. Indexes are added for columns used in WHERE and JOIN. Every library for talking to a database supports parameters, and code reviews reject queries built by gluing text.',
    interview: [
      { q: 'What is the difference between a primary key and a unique key?', a: 'Both forbid repeats. A table has one primary key, which identifies rows and can’t be NULL; it can have many UNIQUE columns.' },
      { q: 'What is a foreign key?', a: 'A column whose values must exist in another table’s key, linking the two tables.' },
      { q: 'How do you prevent SQL injection?', a: 'Use parameterised queries (placeholders like ?), never build SQL by joining user text.' },
    ],
    cheat: [
      { code: 'CREATE TABLE t (…);', meaning: 'make a table' },
      { code: 'PRIMARY KEY', meaning: 'identifies each row' },
      { code: 'NOT NULL / UNIQUE', meaning: 'required / no repeats' },
      { code: 'DEFAULT 1', meaning: 'value if none given' },
      { code: 'CHECK (x > 0)', meaning: 'a rule for each row' },
      { code: 'REFERENCES t(id)', meaning: 'foreign key' },
      { code: 'ALTER TABLE / DROP TABLE', meaning: 'change / remove a table' },
      { code: 'WHERE name = ?', meaning: 'safe parameter' },
    ],
    check: [
      { q: 'Which stops two users having the same email?', options: ['UNIQUE', 'NOT NULL', 'DEFAULT'], answer: 0, why: 'UNIQUE forbids repeated values.' },
      { q: 'What prevents SQL injection?', options: ['Parameters (?)', 'Capital letters', 'Longer passwords'], answer: 0, why: 'Values passed separately are never run as SQL.' },
      { q: 'How many primary keys can a table have?', options: ['One', 'One per column', 'As many as you like'], answer: 0, why: 'One, though it may be made of several columns together.' },
    ],
  },

  'sql-project': {
    minutes: 5,
    lang: 'sql',
    summary: ['A report is several small steps: join, group, then sort.', 'WITH turns each step into a named part you can check.', 'Stored procedures save SQL inside the database for apps to call.'],
    sections: [
      { heading: 'Planning a report', body: 'Start from the question: “How much did each train earn this week?”. Work out which tables hold the answer (bookings for seats, trains for fares), how they connect (train_id = id), what to group by (each train) and what to calculate (SUM of seats × fare). Then write it one step at a time, running each step before adding the next.' },
      { heading: 'Building it with WITH', body: 'Put the join and grouping in a WITH step called sales, then select from it. If a number looks wrong, run the WITH part on its own to check it. Analysts build long reports this way, each step small enough to trust.', code: ['WITH sales AS (', '  SELECT … GROUP BY t.id', ')', 'SELECT * FROM sales ORDER BY revenue DESC;'] },
      { heading: 'Stored procedures and views', body: 'A VIEW saves a query under a name, so a report can be reused like a table. A stored procedure saves a whole block of SQL, with inputs, inside the database; an app calls it by name, as in CALL weekly_report(\'2026-11-02\'). MySQL, PostgreSQL and SQL Server have them; SQLite doesn’t, so apps using SQLite keep that logic in their own code.' },
    ],
    example: {
      title: 'Revenue per train',
      code: ['WITH sales AS (', '  SELECT t.name, SUM(b.seats) AS seats,', '         SUM(b.seats * t.fare) AS revenue', '  FROM bookings b JOIN trains t ON t.id = b.train_id', '  GROUP BY t.id', ')', 'SELECT name, seats, revenue', 'FROM sales', 'ORDER BY revenue DESC;'],
      walk: [
        { line: 4, text: 'Pair each booking with its train.' },
        { line: 5, text: 'One group per train.' },
        { line: 2, text: 'Seats sold on that train.' },
        { line: 3, text: 'Money taken: seats × fare, added up.' },
        { line: 9, text: 'The best earner first.' },
      ],
      output: ['name | seats | revenue', 'Royal | 5 | 14500', 'Valley Express | 3 | 5250', 'Keystone Express | 1 | 2100'],
    },
    mistakes: [
      { title: 'Whole-number division', bad: ['SELECT SUM(seats) / COUNT(*) AS average FROM bookings;'], error: 'average\n1', fix: ['SELECT SUM(seats) * 1.0 / COUNT(*) AS average FROM bookings;'], why: 'Both numbers are whole, so SQLite gives a whole answer and drops the .8. Multiplying by 1.0 makes it a decimal division (or use AVG).' },
      { title: 'Using a WITH name in the next statement', bad: ['WITH busy AS (SELECT DISTINCT train_id FROM bookings) SELECT COUNT(*) FROM busy;', 'SELECT * FROM busy;'], error: 'OperationalError: no such table: busy', fix: ['CREATE VIEW busy AS SELECT DISTINCT train_id FROM bookings;', 'SELECT * FROM busy;'], why: 'A WITH name only lasts for its own statement. To reuse a query, save it as a VIEW.' },
    ],
    industry: 'Business reports like this run on a schedule, often every night, and feed dashboards in tools such as Metabase, Power BI or Looker. The SQL is kept in git and reviewed like any other code, because a wrong JOIN or GROUP BY quietly gives wrong numbers to the people making decisions.',
    interview: [
      { q: 'What is the difference between a view and a stored procedure?', a: 'A view is a saved query you select from like a table; a stored procedure is a saved program, with inputs, that you call.' },
      { q: 'How would you check a report’s numbers?', a: 'Run each step on its own, check row counts, and compare a total with a simple query you trust.' },
      { q: 'Why does 9 / 5 give 1 in SQL?', a: 'Dividing two whole numbers gives a whole number. Make one a decimal, like 9 * 1.0 / 5.' },
    ],
    cheat: [
      { code: 'WITH step AS (…) SELECT …', meaning: 'a named step' },
      { code: 'JOIN … GROUP BY … ORDER BY', meaning: 'the report pattern' },
      { code: 'x * 1.0 / y', meaning: 'decimal division' },
      { code: 'CREATE VIEW v AS SELECT …', meaning: 'save a query' },
      { code: 'CALL proc(…)', meaning: 'run a stored procedure' },
    ],
    check: [
      { q: 'What does 7 / 2 give in SQLite?', options: ['3', '3.5', '4'], answer: 0, why: 'Two whole numbers give a whole number.' },
      { q: 'You want to reuse a query in many reports. What do you make?', options: ['A VIEW', 'A WITH', 'A comment'], answer: 0, why: 'A view is saved; WITH lasts for one statement.' },
      { q: 'Which part of the report do you write first?', options: ['The join, checked on its own', 'The ORDER BY', 'The column names'], answer: 0, why: 'Build and check one step at a time, starting from the data.' },
    ],
  },
};
