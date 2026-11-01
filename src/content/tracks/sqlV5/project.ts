// SQL · Final project: the railway’s weekly sales report (keeps the old project id, sql-project). The challenge tasks,
// then four report queries in the SQL editor, each checked against its exact result (the same tested steps as before).
import type { EditorStep, Lesson } from '../../types';
import { SQL_PROJECT as OLD } from '../sql';
import { arrange, bugTask, challenge, mcq, pairs, pickCode, swipe, xray } from './kit';

const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s, i, all) => ({ ...s, kicker: `FINAL PROJECT · STEP ${i + 1} OF ${all.length}` }));

export const SQL_PROJECT: Lesson = challenge('sql-project', 'Final: the weekly sales report', { icon: '🏆', name: 'SQL Pro' }, ['Answer real business questions with SQL', 'Combine JOIN, GROUP BY, HAVING and CTEs', 'Build a report you can explain in an interview'], [
  mcq(1, 'Revenue for a booking is…', ['fare × seats', 'fare + seats', 'COUNT(seats)', 'seats − fare'], 'Price times quantity.'),
  mcq(2, 'Which joins each booking to its train?', ['JOIN trains t ON b.train_id = t.id', 'JOIN trains t ON b.id = t.id', 'UNION trains', 'JOIN trains t'], 'The foreign key.', { mono: true }),
  mcq(3, 'Which keeps only passengers who spent over 3000?', ['HAVING SUM(t.fare * b.seats) > 3000', 'WHERE SUM(t.fare * b.seats) > 3000', 'LIMIT 3000', 'ORDER BY 3000'], 'A condition on a group.', { mono: true }),
  mcq(4, 'Which finds trains with no bookings?', ['LEFT JOIN bookings, then WHERE b.id IS NULL', 'JOIN bookings, then WHERE b.id IS NULL', 'WHERE bookings = 0', 'UNION bookings'], 'Keep, then filter.'),
  mcq(5, 'Which counts different passengers?', ['COUNT(DISTINCT passenger)', 'COUNT(passenger)', 'DISTINCT COUNT(*)', 'SUM(passenger)'], 'Each once.', { mono: true }),
  swipe([
    ['GROUP BY t.name gives one row per train', true, 'With SUM for its revenue.'],
    ['ORDER BY revenue DESC puts the best train first', true, 'Largest first.'],
    ['WHERE can filter on SUM(…)', false, 'HAVING can.'],
    ['A CTE can hold a step like “amount per booking”', true, 'Then sum it.'],
  ]),
  pairs([['SUM(t.fare * b.seats)', 'Revenue'], ['HAVING', 'Filter groups'], ['LEFT JOIN … IS NULL', 'No bookings'], ['WITH r AS (…)', 'A named step']], 'The report’s tools.'),
  pickCode('Which gives revenue per train, highest first?', ['SELECT t.name, SUM(t.fare * b.seats) AS revenue FROM bookings b JOIN trains t ON b.train_id = t.id GROUP BY t.name ORDER BY revenue DESC;', 'SELECT t.name, t.fare * b.seats FROM bookings b JOIN trains t;', 'SELECT name, SUM(fare) FROM trains ORDER BY fare;', 'SELECT t.name, COUNT(*) FROM trains t GROUP BY t.name;'], 'Join, multiply, sum, group, sort.'),
  bugTask(['SELECT passenger, SUM(t.fare * b.seats) AS spent', 'FROM bookings b JOIN trains t ON b.train_id = t.id', 'WHERE spent > 3000 GROUP BY passenger;'], [[3, 'WHERE spent > 3000 GROUP BY passenger;', 'GROUP BY passenger HAVING spent > 3000;']], 'Filter totals with HAVING, after GROUP BY.'),
  xray(['name | revenue', 'Royal | 14500', 'Valley Express | 5250'], [
    ['tr:nth-child(2) td:nth-child(2)', 'Royal’s revenue', 'SUM(t.fare * b.seats)', ['SUM(t.fare * b.seats)', 'ORDER BY revenue DESC', 'GROUP BY t.name']],
    ['tr:nth-child(2) td:nth-child(1)', 'The top train first', 'ORDER BY revenue DESC', ['SUM(t.fare * b.seats)', 'ORDER BY revenue DESC', 'GROUP BY t.name']],
  ]),
  arrange(['SELECT t.name, SUM(t.fare * b.seats) AS revenue', 'FROM bookings b', 'JOIN trains t ON b.train_id = t.id', 'GROUP BY t.name', 'ORDER BY revenue DESC;'], 'the columns, bookings, join the trains, group, then sort', ['name | revenue', 'Royal | 14500', 'Valley Express | 5250', 'Keystone Express | 2100']),
  ...steps,
], 'project');
