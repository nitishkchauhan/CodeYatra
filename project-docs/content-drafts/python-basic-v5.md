# Python Basic in Lesson v5 · content draft

**Status:** approved by the owner (“go”) and built on `lesson-v3` in `src/content/tracks/pythonV5/`, 31 Oct 2026.

**What changes:** today Python Basic is 12 long lessons (Lesson v4, about 10 minutes each) plus a project. In v5 it becomes **12 modules of 3–4 short lessons (3–5 min) and a Module Challenge each**, with the same screens as HTML, CSS, JavaScript and the other Python levels. Then all of Python is one format.

**For complete beginners:** every module starts from zero: **what is it?**, **where it is used in real life**, then how it works, code to run and change, “predict, then run”, a common mistake, quick checks, and a recap. Yatri (the app’s guide) explains; examples come from **Rosa’s Café** (the same café as JavaScript Basic: Lemon Tea ₹40, Cheese Toast ₹80, Veg Sandwich ₹90, Chicken Sandwich ₹150). Neutral names only.

**Topics:** everything in today’s Basic, checked against the W3Schools Python tutorial as a topic list (our own words and examples). Tuples, sets, lambda, match, modules, dates, JSON and regular expressions stay in Intermediate.

**Checked like the other tracks:** every program runs in tests with real Python; every output, target and “predict” answer is what Python really prints; the project’s starters fail and solutions pass.

---

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Your first program** | 1.1 What is Python? `print()` (keeps id `p-var-1`) · 1.2 Comments, and reading your first error · 1.3 Variables · 1.4 Asking the user: `input()` | 🐣 First Steps |
| **2 · Numbers** | 2.1 Whole numbers and decimals, + − × ÷ (keeps `p-num-1`) · 2.2 `//`, `%`, `**` and the order of operations · 2.3 Changing types (`int()`, `float()`, `str()`) and `round()` | 🔢 Number Cruncher |
| **3 · Text (strings)** | 3.1 Strings, joining and `len()` (keeps `p-str-1`) · 3.2 Positions and slices · 3.3 String methods (`upper`, `strip`, `replace`, `split`) · 3.4 f-strings | 🔤 Wordsmith |
| **4 · Making decisions** | 4.1 True, False and comparisons (keeps `p-if-1`) · 4.2 `if`, `elif`, `else` · 4.3 `and`, `or`, `not` | 🔀 Decision Maker |
| **5 · for loops** | 5.1 Repeat with `for` and `range()` (keeps `p-loop-1`) · 5.2 Loops that add up · 5.3 `break`, `continue` and loops inside loops | 🔁 Loop Learner |
| **6 · while loops** | 6.1 `while` (keeps `p-while-1`) · 6.2 Loops that wait for the right answer · 6.3 Never-ending loops, and how to avoid them | ⏳ Loop Master |
| **7 · Lists** | 7.1 Making and reading lists (keeps `p-loop-2`) · 7.2 Changing lists (`append`, `remove`, `sort`) · 7.3 Looping over lists, `sum`, `max`, `min` | 📋 List Keeper |
| **8 · Dictionaries** | 8.1 Keys and values (keeps `p-dict-1`) · 8.2 Changing a dictionary, and `get()` · 8.3 Looping over a dictionary | 📖 Dictionary Pro |
| **9 · Functions** | 9.1 `def` and calling (keeps `p-fn-1`) · 9.2 Parameters and `return` · 9.3 Functions working together, and built-in functions | 🧰 Function Builder |
| **10 · Handling errors** | 10.1 Common errors and what they mean (keeps `p-err-1`) · 10.2 `try` and `except` · 10.3 Checking input before using it | 🛡 Error Handler |
| **11 · Files** | 11.1 Writing and reading a file (keeps `p-file-1`) · 11.2 Line by line, and adding to a file · 11.3 `with`, and simple data files | 📁 File Keeper |
| **12 · Classes and objects** | 12.1 What is an object? (keeps `p-class-1`) · 12.2 `__init__` and attributes · 12.3 Methods | 🏆 **Final project: Rosa’s billing app** (keeps `p-project`; 4 checked steps in the Python code editor: look up a price, add up an order, discount and tax, print the receipt) |

---

## Sample: Module 1 · Your first program, screen by screen

**1.1 What is Python? `print()`** (5 min)
1. **Yatri (chat):** “Python is a language for giving a computer instructions, written almost like English. It is one of the most used languages in the world.”
2. **Tap to reveal · Where Python is used:** Instagram and YouTube’s servers · data and AI (the charts in a cricket broadcast) · school and science projects · automating boring office work (bills, reports).
3. **Run and tweak:** `print({{v}})` with `"Hello"`, `"Welcome to Rosa’s Café"`, `40 + 80`, `"40" + "80"`. Target: make it print `120`. *(Text in quotes is printed as it is; numbers are worked out.)*
4. **Predict, then run:** three `print` lines; “What appears on the second line?”
5. **Quick check:** which line prints Hello? (`print("Hello")` vs `Print("Hello")`, `print(Hello)`, `echo "Hello"`)
6. **Recap:** Python runs top to bottom · `print()` shows things · text goes in quotes.

**1.2 Comments, and reading your first error**
Tap to reveal (`#` comments: notes for people) → Switch and see (a missing quote, a missing bracket, a capital `P`: each error message shown, and the fixed line) → Tap the bug → True or false → Recap.

**1.3 Variables**
Yatri: “A variable is a labelled box that holds a value.” → Run and tweak (`price = 40`, `cups = {{v}}`, `print(price * cups)`) → Predict, then run (a variable changes: `cups = cups + 1`) → Match (good and bad names: `total_bill` ✓, `2cups` ✗, `my price` ✗) → Tap the bug → Recap.

**1.4 Asking the user: `input()`**
Tap to reveal (`input("Your name? ")` waits for typing and gives back **text**) → Explore (a greeting program, line by line) → Run and tweak with the typing filled in for you (choices like `"Ava"`, `"Reed"`) → Tap the bug (`input()` gives text, so `"2" + 1` fails) → Recap.

**Module 1 Challenge · 🐣 First Steps:** 5 quick questions, true or false, match, pick the code, tap the bug, predict the output, arrange the lines.

---

## Decisions for you

1. **Keep Python Basic’s 12 modules and their order** (above), each split into 3–4 short lessons: **39 lessons and 12 challenges** in all, about 3 hours. **OK?**
2. **`input()` in lessons:** the lesson screens can’t pause for typing, so input lessons show the program with the typed answer filled in (you pick it, like Run and tweak). The code editor and practice drills keep real typing where they have it today. **OK?**
3. **Final project:** Rosa’s billing app stays (4 steps in the Python code editor), updated to the new format. **OK?**
4. **Old lesson ids kept** for each module’s first lesson and the project, so progress, notes and practice sets carry over. **OK?**
5. **Then one APK** with all of Python (Basic, Intermediate, Advanced), as you asked. **OK?**
