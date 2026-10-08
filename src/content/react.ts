import { fill } from './helpers';
import type { Lesson } from './types';

export const trainList = fill({
  kicker: 'PRACTICE · REACT LISTS',
  title: 'Render every train',
  instructions: 'Turn the trains array into list items, and give each one a stable key.',
  lang: 'jsx',
  file: 'TrainList.jsx',
  lines: [
    ['function TrainList({ trains }) {'],
    ['  return ('],
    ['    <ul>'],
    ['      {trains.', { gap: 0 }, '((t) => ('],
    ['        <li ', { gap: 1 }, '={t.id}>{t.name}</li>'],
    ['      ))}'],
    ['    </ul>'],
    ['  );'],
    ['}'],
  ],
  tokens: ['map', 'key', 'filter', 'forEach', 'id'],
  answers: [
    { value: 'map', check: 'map() returns one <li> per train' },
    { value: 'key', check: 'Each item has a unique key' },
  ],
  output: ['• Rajdhani', '• Shatabdi', '• Vande Bharat'],
});

export const nameInput = fill({
  kicker: 'PRACTICE · REACT EVENTS',
  title: 'A controlled input',
  instructions: 'Keep what the passenger types in state: read it from the event and save it with the setter.',
  lang: 'jsx',
  file: 'NameField.jsx',
  lines: [
    ['const [name, setName] = useState("");'],
    [''],
    ['<input'],
    ['  value={name}'],
    ['  ', { gap: 0 }, '={(e) => ', { gap: 1 }, '(e.target.', { gap: 2 }, ')}'],
    ['/>'],
    ['<p>Hello {name}</p>'],
  ],
  tokens: ['onChange', 'setName', 'value', 'onClick', 'name', 'text'],
  answers: [
    { value: 'onChange', check: 'onChange fires on every keystroke' },
    { value: 'setName', check: 'setName stores the text in state' },
    { value: 'value', check: 'e.target.value is what was typed' },
  ],
  output: ['(type "Asha") Hello Asha'],
});

export const loadTrains = fill({
  kicker: 'PRACTICE · USEEFFECT',
  title: 'Load trains once',
  instructions: 'Fetch the trains when the screen first appears, not on every render.',
  lang: 'jsx',
  file: 'Trains.jsx',
  lines: [
    ['const [trains, setTrains] = useState([]);'],
    [''],
    [{ gap: 0 }, '(() => {'],
    ['  ', { gap: 1 }, '("/api/trains")'],
    ['    .then((res) => res.json())'],
    ['    .then(setTrains);'],
    ['}, ', { gap: 2 }, ');'],
  ],
  tokens: ['useEffect', 'fetch', '[]', 'useState', '[trains]', 'get'],
  answers: [
    { value: 'useEffect', check: 'Side effects go in useEffect' },
    { value: 'fetch', check: 'fetch() calls the API' },
    { value: '[]', check: 'An empty dependency list runs it once' },
  ],
  output: ['GET /api/trains → 3 trains', 'render: 3 trains'],
});

export const REACT_LESSONS: Lesson[] = [
  {
    id: 'r-list-1',
    title: 'Lists and keys',
    kind: 'lesson',
    minutes: 6,
    skill: 'react',
    learned: ['map() turns data into elements', 'Each item needs a unique key', 'Keys help React update lists fast'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · REACT LISTS',
        title: 'From an array to a list',
        body: 'In React you don’t write each <li> by hand. You map an array of data to elements. Give each element a key, an id that never changes, so React knows which item is which.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: ['{trains.map((t) => (', '  <li key={t.id}>{t.name}</li>', '))}'],
          },
        ],
        tip: 'Avoid using the array index as a key when items can be reordered.',
      },
      {
        type: 'quiz',
        prompt: 'Which is the best key for a train?',
        options: ['t.id', 'Math.random()', 'the index', '"train"'],
        mono: true,
        answer: 0,
        right: 'An id is unique and stays the same between renders.',
        wrong: 'Keys must be unique and stable. Random values change every render.',
      },
      trainList,
    ],
  },
  {
    id: 'r-event-1',
    title: 'Events and forms',
    kind: 'lesson',
    minutes: 7,
    skill: 'react',
    learned: ['onClick and onChange handle events', 'e.target.value is the typed text', 'Controlled inputs keep text in state'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · REACT EVENTS',
        title: 'React to what people do',
        body: 'Pass a function to onClick or onChange. For text boxes, store the text in state and pass it back as value. That is a controlled input: state is the single source of truth.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: ['<input', '  value={city}', '  onChange={(e) => setCity(e.target.value)}', '/>'],
          },
        ],
        tip: 'Pass the function itself: onClick={save}, not onClick={save()}.',
      },
      {
        type: 'quiz',
        prompt: 'What is wrong with onClick={book()}?',
        options: ['It calls book while rendering', 'Nothing', 'book must be a string', 'onClick needs a number'],
        answer: 0,
        right: 'The () runs it straight away. Use onClick={book} or onClick={() => book()}.',
        wrong: 'book() runs during render, not on tap. Pass the function instead.',
      },
      nameInput,
    ],
  },
  {
    id: 'r-effect-1',
    title: 'Fetching data with useEffect',
    kind: 'lesson',
    minutes: 8,
    skill: 'react',
    learned: ['useEffect runs code after render', 'The dependency array controls when', 'fetch loads data from an API'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · USEEFFECT',
        title: 'Effects talk to the outside world',
        body: 'Rendering should only describe the UI. Loading data, timers and subscriptions are side effects, and they go in useEffect. The dependency array says when to run it again.',
        code: [
          {
            lang: 'jsx',
            label: 'JSX',
            lines: ['useEffect(() => {', '  fetch("/api/trains")', '    .then((r) => r.json())', '    .then(setTrains);', '}, []); // [] = once'],
          },
        ],
        tip: 'Leave the array out and the effect runs after every render. Usually that is a bug.',
      },
      {
        type: 'quiz',
        prompt: 'useEffect(fn, [city]) runs fn when…',
        options: ['city changes', 'every render', 'never', 'the app closes'],
        answer: 0,
        right: 'It runs after the first render, then whenever city changes.',
        wrong: 'Values in the dependency array decide when the effect re-runs.',
      },
      loadTrains,
    ],
  },
];
