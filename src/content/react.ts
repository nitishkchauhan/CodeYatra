import { fill } from './helpers';

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
