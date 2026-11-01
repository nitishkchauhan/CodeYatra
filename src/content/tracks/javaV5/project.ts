// Java · Final project: a train reservation system (keeps the old project id, jv-project). The challenge tasks,
// then the tested booking rules from before, in the code editor.
import type { EditorStep, Lesson } from '../../types';
import { arrange, bugTask, mcq, pairs, swipe, track, xray } from '../cV5/kit';
import { JAVA_PROJECT as OLD } from '../java';

const { challenge, pickCode } = track('java', 'java');
const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · THE RULES' }));

export const JAVA_PROJECT_V5: Lesson = challenge('jv-project', 'Final: a train reservation system', { icon: '🏆', name: 'Java Builder' }, ['Model a train as a class with private state', 'Refuse impossible bookings with an exception', 'Keep bookings in an ArrayList'], [
  mcq(1, 'Where should the number of free seats live?', ['A private field of Train', 'A static variable in Main', 'A local variable in book', 'A String'], 'The object owns its state.'),
  mcq(2, 'What should book do when too many seats are asked for?', ['Throw an exception and change nothing', 'Book what it can', 'Print and carry on', 'Return -1 silently'], 'Refuse clearly.'),
  mcq(3, 'Which collection fits the list of bookings?', ['ArrayList<String>', 'int[]', 'HashMap<int, int>', 'String'], 'It grows.', { mono: true }),
  mcq(4, 'In book, what comes first?', ['The check, then the change', 'The change, then the check', 'Printing', 'The catch'], 'Never half-book.'),
  mcq(5, 'Who should catch the exception?', ['The caller, who can tell the user', 'book itself', 'Nobody', 'The JVM'], 'Throw low, catch high.'),
  swipe([
    ['free -= seats takes the seats', true, 'After the check.'],
    ['A private field can be changed from Main directly', false, 'Only through methods.'],
    ['IllegalArgumentException fits a bad request', true, 'Wrong argument.'],
    ['bookings.size() counts the bookings', true, 'A list method.'],
  ]),
  pairs([['Train', 'The class'], ['free', 'Private state'], ['book', 'Checks, then changes'], ['bookings', 'ArrayList']], 'The program’s parts.'),
  pickCode('Which refuses a booking that is too big?', ['if (seats < 1 || seats > free) throw new IllegalArgumentException("Only " + free + " seats left");', 'if (seats > free) return;', 'if (seats > free) free = 0;', 'try (seats > free) { }'], 'Check both ends, then throw.'),
  bugTask(['void book(String name, int seats) {', '    if (seats > free) return;', '    free -= seats;', '    bookings.add(name + " x" + seats);', '}'], [[2, 'return;', 'throw new IllegalArgumentException("Only " + free + " seats left");']], 'A silent return hides the problem. Throw, so the caller can tell the user.'),
  xray('<div class="c">$ java Main.java</div><div class="a">Only 3 seats left</div><div class="b">[Ava x2, Zoey x3]</div>', [
    ['.a', 'A refused booking', 'throw new IllegalArgumentException(…)', ['throw new IllegalArgumentException(…)', 'bookings.add(name + " x" + seats)', 'free -= seats']],
    ['.b', 'The list of bookings', 'bookings.add(name + " x" + seats)', ['throw new IllegalArgumentException(…)', 'bookings.add(name + " x" + seats)', 'free -= seats']],
  ]),
  arrange(['import java.util.ArrayList;', 'ArrayList<String> bookings = new ArrayList<>();', 'bookings.add("Ava x2");', 'bookings.add("Zoey x3");', 'System.out.println(bookings.size() + " " + bookings);'], 'import, the list, two bookings, print', ['2 [Ava x2, Zoey x3]']),
  ...steps,
], 'project');
