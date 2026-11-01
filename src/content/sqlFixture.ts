// The sample database every SQL lesson uses. Lessons show these tables, and
// learner queries run against a fresh copy of it each time.

export const SQL_SETUP = `
CREATE TABLE trains (id INTEGER PRIMARY KEY, name TEXT, from_city TEXT, to_city TEXT, fare INTEGER, seats INTEGER);
INSERT INTO trains VALUES
  (12951, 'Royal', 'Madrid', 'Dublin', 2900, 12),
  (12002, 'Silver Arrow', 'Dublin', 'Boston', 1200, 0),
  (22436, 'Valley Express', 'Dublin', 'Vienna', 1750, 40),
  (12627, 'Keystone Express', 'Barcelona', 'Dublin', 2100, 5),
  (12301, 'Harbour Royal', 'Kyoto', 'Dublin', 3100, 22),
  (11013, 'Coastal Express', 'Madrid', 'Copenhagen', 850, 60);
CREATE TABLE bookings (id INTEGER PRIMARY KEY, train_id INTEGER, passenger TEXT, seats INTEGER);
INSERT INTO bookings VALUES
  (1, 12951, 'Ava', 2),
  (2, 22436, 'Reed', 1),
  (3, 12951, 'Kaden', 3),
  (4, 12627, 'Megan', 1),
  (5, 22436, 'Ava', 2);
CREATE TABLE passengers (name TEXT PRIMARY KEY, age INTEGER, city TEXT, phone TEXT);
INSERT INTO passengers VALUES
  ('Ava', 15, 'Paris', '90000 00001'),
  ('Reed', 34, 'Dublin', NULL),
  ('Kaden', 22, 'Madrid', '90000 00003'),
  ('Megan', 61, 'Barcelona', NULL),
  ('Zoey', 19, NULL, '90000 00005');
`;

/** The tables as learners see them in lessons. */
export const SQL_TABLES = [
  'trains',
  'id    | name             | from_city | to_city    | fare | seats',
  '12951 | Royal            | Madrid    | Dublin     | 2900 | 12',
  '12002 | Silver Arrow     | Dublin    | Boston     | 1200 | 0',
  '22436 | Valley Express   | Dublin    | Vienna     | 1750 | 40',
  '12627 | Keystone Express | Barcelona | Dublin     | 2100 | 5',
  '12301 | Harbour Royal    | Kyoto     | Dublin     | 3100 | 22',
  '11013 | Coastal Express  | Madrid    | Copenhagen | 850  | 60',
];

export const PASSENGER_TABLE = [
  'passengers',
  'name  | age | city      | phone',
  'Ava   | 15  | Paris     | 90000 00001',
  'Reed  | 34  | Dublin    | NULL',
  'Kaden | 22  | Madrid    | 90000 00003',
  'Megan | 61  | Barcelona | NULL',
  'Zoey  | 19  | NULL      | 90000 00005',
];

export const BOOKING_TABLE = [
  'bookings',
  'id | train_id | passenger | seats',
  '1  | 12951    | Ava       | 2',
  '2  | 22436    | Reed      | 1',
  '3  | 12951    | Kaden     | 3',
  '4  | 12627    | Megan     | 1',
  '5  | 22436    | Ava       | 2',
];

/** Splits SQL into statements on semicolons outside quotes. */
export function splitStatements(sql: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quote = false;
  for (const ch of sql) {
    if (ch === "'") quote = !quote;
    if (ch === ';' && !quote) {
      if (cur.trim()) out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/**
 * A Python program that loads the sample data, runs the learner's SQL and prints
 * each row of the last statement as "a | b | c". Earlier statements (INSERT, UPDATE,
 * BEGIN …) run first, in order. sqlite3 ships with Pyodide, so this runs in the app.
 * NULL prints as NULL, the way SQL tools show it.
 */
export function sqlProgram(query: string): string {
  const parts = splitStatements(query);
  const last = parts.pop() ?? '';
  return `import sqlite3
__cy_db = sqlite3.connect(":memory:", isolation_level=None)
__cy_db.executescript(${JSON.stringify(SQL_SETUP)})
for __cy_sql in ${JSON.stringify(parts)}:
    __cy_db.execute(__cy_sql)
__cy_cur = __cy_db.execute(${JSON.stringify(last)})
for __cy_row in __cy_cur.fetchall():
    print(" | ".join("NULL" if __cy_v is None else str(__cy_v) for __cy_v in __cy_row))
`;
}

/**
 * Lesson v5 SQL: a Python program that loads the sample data, runs every statement, and prints the result of the
 * last one as a table: a header row of column names, then one row per line ("name | fare"). A last statement that
 * returns no rows (INSERT, UPDATE, DELETE, CREATE…) prints how many rows it changed.
 */
export function sqlTableProgram(query: string): string {
  const parts = splitStatements(query);
  const last = parts.pop() ?? '';
  return `import sqlite3
__cy_db = sqlite3.connect(":memory:", isolation_level=None)
__cy_db.executescript(${JSON.stringify(SQL_SETUP)})
for __cy_sql in ${JSON.stringify(parts)}:
    __cy_db.execute(__cy_sql)
__cy_cur = __cy_db.execute(${JSON.stringify(last)})
if __cy_cur.description is None:
    print("OK: " + str(__cy_cur.rowcount) + (" row" if __cy_cur.rowcount == 1 else " rows") + " changed")
else:
    print(" | ".join(__cy_d[0] for __cy_d in __cy_cur.description))
    __cy_rows = __cy_cur.fetchall()
    for __cy_row in __cy_rows:
        print(" | ".join("NULL" if __cy_v is None else str(__cy_v) for __cy_v in __cy_row))
    if not __cy_rows:
        print("(no rows)")
`;
}
