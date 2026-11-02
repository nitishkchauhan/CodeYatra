# SQL track: "Read more" notes (draft for owner OK)

One note per module: 13 modules plus the final project. Each note opens from the module and takes about 5 minutes to read.

## How every note is laid out

The notes screen already supports all of this (the Python notes use it):

1. **Key points**: three lines at the top, for quick revision.
2. **Explain**: three short sections, in this order:
   - what it is, in plain English;
   - where it is used in real life;
   - how it works.
3. **Worked example**: one query on the railway database, explained line by line. Tests run it and check the output.
4. **Common mistakes**: two or three real mistakes, each with the exact error, the fix and why it happens. Tests run the wrong version too.
5. **In industry**: how developers use this at work.
6. **Interview questions**: three questions; the learner taps to see each answer.
7. **Cheat sheet**: the syntax, and what each part means.
8. **Check yourself**: three quick questions, answered on the spot.

## Following W3Schools (topic checklist, our own words)

The lessons already cover W3Schools' main SQL topics. The notes add the W3Schools topics the lessons had no room for, so the track covers the full list.

| Module | Lessons cover | Notes also add (W3Schools gaps) |
|---|---|---|
| 1. SELECT | SELECT, calculations, AS, DISTINCT | SQL comments (`--`), SQL syntax rules |
| 2. WHERE | WHERE, AND, OR | NOT, comparison operators table |
| 3. Patterns | LIKE, wildcards, IN, BETWEEN, NULL | `_` wildcard, NOT IN, NOT BETWEEN |
| 4. Sorting | ORDER BY, LIMIT, OFFSET | TOP / FETCH FIRST in other databases |
| 5. Aggregates | COUNT, SUM, AVG, MIN, MAX | COUNT(column) vs COUNT(*) with NULL |
| 6. Grouping | GROUP BY, HAVING | WHERE vs HAVING side by side |
| 7. JOIN | INNER JOIN, joining three tables | Self join |
| 8. LEFT JOIN, UNION | LEFT JOIN, UNION | RIGHT JOIN, FULL JOIN, UNION ALL |
| 9. Subqueries | Subqueries, WITH | EXISTS, ANY, ALL |
| 10. CASE, functions | CASE, text/date/NULL functions | IFNULL / COALESCE in other databases |
| 11. Window functions | ROW_NUMBER, RANK, running totals | (beyond W3Schools: an interview favourite) |
| 12. Changing data | INSERT, UPDATE, DELETE, transactions | INSERT INTO SELECT, SELECT INTO |
| 13. Design | Constraints, indexes, views, ALTER | Data types, AUTO INCREMENT, DROP / CREATE DATABASE, **SQL injection** |
| Project | Weekly sales report | Stored procedures (what they are, when used) |

## Making the notes more engaging

**Uses what already exists (no app change):**
- Every note starts with three key points, so a learner revising for an interview can stop there.
- Check yourself questions give instant right/wrong feedback, with the reason.
- Mistakes use real error text, which learners will see again in real tools, so they remember it.
- The read-aloud button and text-size control already work on every note.

**Small app additions (suggest; only if you agree, built on a branch):**
1. **"Try this query" button** on the worked example. It opens the example in the SQL playground so the learner can edit and run it. Turns reading into doing.
2. **+10 XP for finishing Check yourself** (all three answered), once per note. Gives a reason to read to the end.
3. **"Read" tick on the module map** once a note is finished, so learners can see which notes they have not read yet.

---

## Sample note: Module 1, SELECT (lesson id `sql-select`)

**Key points**
- A database keeps data in tables; SQL is how you ask it questions.
- `SELECT columns FROM table;` shows those columns for every row.
- You can calculate new columns, rename them with `AS`, and remove repeats with `DISTINCT`.

**1. What is a database?**
A database is an organised store of data, kept in tables. Each table has columns (what is stored: name, fare, seats) and rows (one train, one booking). It is like a spreadsheet, but thousands of people and apps can read and change it at the same time, safely. SQL (Structured Query Language, said "S-Q-L" or "sequel") is the language you use to ask a database for data or change it.

**2. Where it is used**
Nearly every app keeps its data in a database. When you book a train ticket, the app runs SQL to find trains with free seats and then saves your booking. Banks store every payment in tables. Shops use SQL to answer "how many did we sell this week?". Data analysts, back-end developers and testers all write SQL daily, which is why it appears in almost every placement test.

**3. Reading a SELECT**
`SELECT name, fare FROM trains;` means: from the table `trains`, show the columns `name` and `fare`, for every row. `*` means every column. A column can be calculated, like `fare * 2`, and `AS return_fare` gives it a readable name. `DISTINCT` removes repeated rows. Anything after `--` on a line is a comment: the database ignores it, so you can leave notes for people.
```sql
SELECT DISTINCT from_city FROM trains;  -- each city once
```

**Worked example: return fares**
```sql
-- Every train, with the price of a return trip
SELECT name AS train,
       fare,
       fare * 2 AS return_fare
FROM trains;
```
- Line 1: a comment, ignored by the database.
- Line 2: show each train's name, with the column headed `train`.
- Line 3: show the fare as it is stored.
- Line 4: work out `fare * 2` for every row and head it `return_fare`.
- Line 5: take the rows from the `trains` table. The `;` ends the query.

Output:
```
train | fare | return_fare
Coastal Express | 850 | 1700
Silver Arrow | 1200 | 2400
Harbour Royal | 3100 | 6200
Keystone Express | 2100 | 4200
Royal | 2900 | 5800
Valley Express | 1750 | 3500
```

**Common mistakes**
1. *A misspelt column*
   - Wrong: `SELECT nme FROM trains;`
   - Error: `no such column: nme`
   - Fix: `SELECT name FROM trains;`
   - Why: the database only knows the exact column names in the table. Check the spelling against the table.
2. *A missing comma (no error!)*
   - Wrong: `SELECT name fare FROM trains;`
   - Result: one column headed `fare`, full of train names.
   - Fix: `SELECT name, fare FROM trains;`
   - Why: without the comma, SQL reads `fare` as a new name for `name`, just like `AS fare`. It runs, but gives the wrong answer, which is worse than an error.
3. *Wrong table name*
   - Wrong: `SELECT * FROM train;`
   - Error: `no such table: train`
   - Fix: `SELECT * FROM trains;`
   - Why: table names must match exactly, including the plural.

**In industry**
Developers rarely use `SELECT *` in real code. They list the columns they need, because tables can have dozens of columns and fetching all of them is slow. Analysts write SELECT queries in tools like a database console or a dashboard, and back-end code sends the same SQL to the database from Python, Java or Node.js.

**Interview questions**
- *What is the difference between a database and a table?* A database holds many tables; a table holds rows and columns of one kind of thing.
- *What does DISTINCT do?* It removes duplicate rows from the result, so each different value appears once.
- *Why avoid SELECT * in real apps?* It fetches columns you don't need, which is slower and can break code when columns are added.

**Cheat sheet**
| Code | Meaning |
|---|---|
| `SELECT a, b FROM t;` | columns a and b from table t |
| `SELECT * FROM t;` | every column |
| `fare * 2` | a calculated column |
| `AS new_name` | rename a column in the result |
| `SELECT DISTINCT a` | each value once |
| `-- note` | a comment, ignored |

**Check yourself**
1. Which query shows only the names of passengers?
   - **`SELECT name FROM passengers;`** · `SELECT passengers.name;` · `GET name FROM passengers;`
   - Why: SELECT the column, FROM the table.
2. `SELECT DISTINCT from_city FROM trains;` returns how many rows?
   - 6 · **4** · 1
   - Why: Madrid and Dublin each appear twice; DISTINCT keeps one of each, giving Madrid, Dublin, Kyoto and Barcelona.
3. What does `SELECT name fare FROM trains;` do?
   - Gives an error · **Shows names under the heading fare** · Shows name and fare
   - Why: with no comma, `fare` becomes a new name for the column.

---

## Order of work after your OK

1. Write the remaining 12 SQL notes and the project note, in this layout, straight into the app. Tests check every example, mistake and answer.
2. Then do the other tracks one at a time: Node.js, Git, C, Java, DSA, DSA Advanced, Placement, CBSE, then Logic Foundations. Each track follows its own W3Schools list where one exists (Node.js, Git, C, Java, DSA). CBSE follows the CBSE syllabus. Placement and Foundations follow common test topics.
