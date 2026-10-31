# Python Intermediate in Lesson v5 · content draft

**Status:** approved by the owner (“GO”, all five decisions) and built on `lesson-v3` in `src/content/tracks/pythonV5i/`, 31 Oct 2026.

**What changes:** today Python Intermediate is 6 long lessons (about 12 minutes each, Lesson v3) plus a project. In v5 it becomes **6 modules of 3 short lessons (3–5 min) and a Module Challenge each**, with the same screens you tested in HTML, CSS and JavaScript: chat, tap to reveal, explore, switch and see, **run and tweak**, **predict, then run**, tap to place, tap the bug, true or false, match, arrange, stars and badges.

**Same topics, plus the gaps:** everything in today’s Intermediate stays. Checked against the W3Schools Python tutorial as a topic list (our own words and examples), these are added: lambda, `match`, `zip` and `enumerate`, dates and time zones, `csv`, regular expressions, `**kwargs`, type hints, special methods and dataclasses. Generators, testing, APIs and decorators stay in Advanced.

**Story thread (neutral, professional):** the learner keeps working at **Brightline Studio**. **Felix** (backend developer) leads, with **Megan** (team lead). The client is **City Travel Desk** again, now its back office: booking files, reports and clean data. All names are made up.

**Checked like the web tracks:** every program runs in tests with real Python, every output and “predict” answer is what Python really prints, and the project’s starter fails its tests while the solution passes.

---

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Shaping data** | 1.1 List comprehensions (keeps id `py-comprehensions`) · 1.2 Dictionary and set comprehensions · 1.3 Sorting with `key=` and `lambda` (also `min`/`max` with a key) | 🧮 Data Shaper |
| **2 · Grouped values** | 2.1 Tuples and unpacking (keeps `py-tuples-sets`) · 2.2 Sets and set maths (`&`, `\|`, `-`) · 2.3 `zip`, `enumerate` and `match` | 🧩 Unpacker |
| **3 · The standard library** | 3.1 `import`, your own modules, and `pip` in plain words (keeps `py-modules`) · 3.2 Dates and time zones (`datetime`, `zoneinfo`) and `math` · 3.3 `Counter` and `defaultdict` | 📚 Library Card |
| **4 · Real data files** | 4.1 JSON (keeps `py-json`) · 4.2 CSV files with `csv.DictReader` · 4.3 Finding patterns with regular expressions (`re`) | 📂 Data Wrangler |
| **5 · Functions in depth** | 5.1 Defaults and keyword arguments (keeps `py-functions-2`) · 5.2 `*args` and `**kwargs` · 5.3 Scope, and type hints | 🛠 Function Pro |
| **6 · Classes in depth** | 6.1 Inheritance and `super()` (keeps `py-oop-2`) · 6.2 Special methods (`__str__`, `__eq__`, `__len__`) and polymorphism · 6.3 `@dataclass` and `@property` | 🏆 **Final project: City Travel Desk’s booking report** (keeps `py-i-project`; 4 checked steps) |

**Final project, 4 steps in the Python code editor:** 1. Read the bookings (JSON) and skip broken rows. 2. A `Booking` dataclass with a fare property. 3. Totals per train with `Counter`, and the busiest day with `datetime`. 4. Print a neat report (f-string alignment, ₹ amounts). Each step is checked by running hidden tests.

## What a lesson looks like (example: 1.3 Sorting with key and lambda)

1. **At work** (Felix): “The desk wants bookings sorted by fare, then by name. `sorted()` alone sorts the wrong way.”
2. **Run and tweak:** `print(sorted(bookings, key={{v}}))` with choices `lambda b: b["fare"]`, `lambda b: -b["fare"]`, `lambda b: (b["fare"], b["name"])`, `len`. Goal: the cheapest first, ties by name.
3. **Tap to reveal:** what `key=` does; `lambda` is a one-line function; `reverse=True`; `min`/`max` take a key too.
4. **Predict, then run:** two pauses (“What will cheapest be?”, “What will order be?”), checked against the real run.
5. **Quick check** and **Tap the bug** (`sorted(bookings, key=b["fare"])`: the key must be a function).
6. **Recap**, 3 points.

Module Challenges: 5 quick questions, then true or false, match, pick the code, tap the bug, **predict the output** and **arrange the lines** (the right order prints the goal).

---

## Decisions for you

1. **Python Basic stays in its current format for now.** Basic is in Lesson v4 (12 longer lessons). Intermediate in v5 means the Python track mixes two formats until Basic is rebuilt. **I recommend building Intermediate now (as you asked) and rebuilding Basic in v5 after Intermediate and Advanced**, so all Python ends up in the same format.
2. **Run and tweak, tap to place and arrange for Python (small engineering).** Today these run JavaScript only. They would run Python with the in-app Python runner, the same one the v4 lessons already use. Like now, the first Python run needs the internet once to download it. **OK?**
3. **Final project in the Python code editor**, with hidden tests (as the current project), instead of the web editor. **OK?**
4. **Old lesson ids kept** for the first lesson of modules 1, 2, 3, 4, 5 and 6 and for the project, so learners keep their progress. **OK?**
5. **Order:** Python Intermediate, a test APK, then Python Advanced in v5 (Testing, Debugging, APIs, Generators, Decorators, Clean code) the same way. **OK?**
