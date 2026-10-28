// Programs for the playground. Learners tinker with them (tap a value to change it) or build them
// (tap pieces into gaps), so the playground needs no keyboard. Tests run every change of every program.
import { tweakables } from './build';
import { allLessons } from './index';
import type { TryStep } from './types';

export type PlayLang = 'python' | 'javascript';
export type PlayProgram = { id: string; label: string; code: string };

const OWN: Record<PlayLang, PlayProgram[]> = {
  python: [
    { id: 'py-hello', label: 'Hello', code: 'name = "Yatri"\ncity = "Pune"\nprint("Hello,", name, "from", city)\n' },
    { id: 'py-table', label: 'Times table', code: 'n = 5\nfor i in range(1, 11):\n    print(i, "x", n, "=", i * n)\n' },
    { id: 'py-fare', label: 'Fare', code: 'def fare(km):\n    if km <= 10:\n        return 20\n    return 20 + (km - 10) * 2\n\ntrip = 25\nprint("Fare for", trip, "km:", fare(trip))\n' },
    { id: 'py-list', label: 'List', code: 'cities = ["Delhi", "Jaipur", "Pune"]\nfor c in cities:\n    print(c.upper())\nprint(len(cities), "cities")\n' },
  ],
  javascript: [
    { id: 'js-hello', label: 'Hello', code: 'const name = "Yatri";\nconst city = "Pune";\nconsole.log(`Hello, ${name} from ${city}`);\n' },
    { id: 'js-table', label: 'Times table', code: 'const n = 5;\nfor (let i = 1; i <= 10; i++) {\n  console.log(i, "x", n, "=", i * n);\n}\n' },
    { id: 'js-fare', label: 'Fare', code: 'function fare(km) {\n  if (km <= 10) return 20;\n  return 20 + (km - 10) * 2;\n}\n\nconst trip = 25;\nconsole.log("Fare for", trip, "km:", fare(trip));\n' },
    { id: 'js-seats', label: 'Seats', code: 'const seats = [12, 0, 7, 3];\nconst open = seats.filter((s) => s > 0);\nconsole.log(open, open.length);\n' },
  ],
};

let cache: Record<PlayLang, PlayProgram[]> | null = null;

/** The playground's own programs, then "try it" programs from lessons that have values to play with. */
export function playgroundPrograms(): Record<PlayLang, PlayProgram[]> {
  if (cache) return cache;
  const fromLessons = (lang: PlayLang) =>
    allLessons()
      .flatMap((l) => l.steps.map((s, i) => ({ s, id: `${l.id}#${i}` })))
      .filter((x): x is { s: TryStep; id: string } => x.s.type === 'try' && x.s.lang === lang)
      .filter(({ s }) => tweakables(s.starter, lang, `${s.kicker}|${s.title}`).length > 0)
      .slice(0, 16)
      .map(({ s, id }) => ({ id, label: s.title, code: s.starter }));
  cache = { python: [...OWN.python, ...fromLessons('python')], javascript: [...OWN.javascript, ...fromLessons('javascript')] };
  return cache;
}

/** The seed a program's tweaks and gaps are made with (the same in the app and in tests). */
export const playSeed = (p: PlayProgram) => `play|${p.id}`;
