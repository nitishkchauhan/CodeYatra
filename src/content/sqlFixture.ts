// The sample database every SQL lesson uses. Lessons show these tables, and
// learner queries run against a fresh copy of it each time.

export const SQL_SETUP = `
CREATE TABLE trains (id INTEGER PRIMARY KEY, name TEXT, from_city TEXT, to_city TEXT, fare INTEGER, seats INTEGER);
INSERT INTO trains VALUES
  (12951, 'Rajdhani', 'Mumbai', 'Delhi', 2900, 12),
  (12002, 'Shatabdi', 'Delhi', 'Bhopal', 1200, 0),
  (22436, 'Vande Bharat', 'Delhi', 'Varanasi', 1750, 40),
  (12627, 'Karnataka Express', 'Bengaluru', 'Delhi', 2100, 5),
  (12301, 'Howrah Rajdhani', 'Kolkata', 'Delhi', 3100, 22),
  (11013, 'Coimbatore Express', 'Mumbai', 'Coimbatore', 850, 60);
CREATE TABLE bookings (id INTEGER PRIMARY KEY, train_id INTEGER, passenger TEXT, seats INTEGER);
INSERT INTO bookings VALUES
  (1, 12951, 'Asha', 2),
  (2, 22436, 'Ravi', 1),
  (3, 12951, 'Kabir', 3),
  (4, 12627, 'Meera', 1),
  (5, 22436, 'Asha', 2);
`;

/** The tables as learners see them in lessons. */
export const SQL_TABLES = [
  'trains',
  'id     | name               | from_city | to_city    | fare | seats',
  '12951  | Rajdhani           | Mumbai    | Delhi      | 2900 | 12',
  '12002  | Shatabdi           | Delhi     | Bhopal     | 1200 | 0',
  '22436  | Vande Bharat       | Delhi     | Varanasi   | 1750 | 40',
  '12627  | Karnataka Express  | Bengaluru | Delhi      | 2100 | 5',
  '12301  | Howrah Rajdhani    | Kolkata   | Delhi      | 3100 | 22',
  '11013  | Coimbatore Express | Mumbai    | Coimbatore | 850  | 60',
];

/**
 * A Python program that loads the sample data, runs the learner's SQL and prints
 * each row as "a | b | c". sqlite3 ships with Pyodide, so this runs in the app.
 */
export function sqlProgram(query: string): string {
  return `import sqlite3
__cy_db = sqlite3.connect(":memory:")
__cy_db.executescript(${JSON.stringify(SQL_SETUP)})
__cy_cur = __cy_db.execute(${JSON.stringify(query.trim().replace(/;\s*$/, ''))})
for __cy_row in __cy_cur.fetchall():
    print(" | ".join(str(__cy_v) for __cy_v in __cy_row))
`;
}
