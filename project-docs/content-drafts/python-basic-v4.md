# Python · Basic · Lesson v4 pilot draft (Modules 1–3)

**Status:** approved by the owner on 28 Oct 2026 and built on `lesson-v3` (`tracks/pythonV4.ts`). Changes while building: Try-it targets follow the values the app offers when tapped (Module 1: 600 and 960; Module 3: 3 x tea = ₹36 and 4 x tea = ₹48); the Module 2 bug uses `typed = "40"` (what input() gives) so tests can run it; the Module 3 build-it distractor is r instead of F. Pilot of the final lesson format (APP-PLAN Part 3) and notes format (Part 4). Module ids stay the same (`p-var-1`, `p-num-1`, `p-str-1`), so learners keep their progress. Module 1 is also playable on the design canvas (“Lesson · Python Module 1” and “Notes · Python Module 1”).

**Rules used:** every screen asks the learner to do something; no Next button after an answer; hint on the first wrong try, the answer and why on the second; plain English, **no Hindi words**; every output and error below was run in real Python (3.10) on 28 Oct 2026, and the tests will run them again.

**Story:** Riya runs a tea stall. Module 1 counts the day’s sales, Module 2 packs cups into trays and gives change, Module 3 prints neat receipts.

---

## Module 1 · Your first program (`p-var-1`)
**You can now:** show text and numbers with print() · store a value in a variable · replace it with a new value

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `price = 12` / `cups = 40` / `print(price * cups)`. “What do you think this prints?” **480** · price * cups · 52 · An error |
| 2 | Learn: print() | Run 2 lines → `Hello, Riya`, `480`. Check: which line prints the word Hello? **print("Hello")** · print(Hello) · Print("Hello") |
| 3 | Learn: variables are boxes | Put 12 in the price box and 40 in the cups box. Check: which line puts 12 in price? **price = 12** · 12 = price · price == 12 · "price" = 12 |
| 4 | Learn: values change | Run `cups = 40`, `cups = cups + 5` (box 40 → 45). Check: then `cups = cups - 10`? **35** · 30 · 45 · -10 |
| 5 | Try it with goals | Pick price 10/12/15 and cups 40/50. Goals: print **600**, print **500** |
| 6 | Predict, then run | 5 lines; stops before `total = price * cups` (**480**) and before the print (total is still **480**, not 540). Output `Cups: 45 Total: 480` |
| 7 | Spot the bug | `print("Cups sold: " + cups)` → `TypeError: can only concatenate str (not "int") to str`. Tap line 2, fix with **print("Cups sold:", cups)** → `Cups sold: 40` |
| 8 | Sort | Text or number: "Riya", 12, "12", 3.5, "Hello", 40 |
| 9 | Quick check | Fill `____("Hi")` → **print** · order `price = 15`, `cups = 30`, `print(price * cups)` (450) · predict `x = 5; x = x * 2; print(x)` → **10** |
| 10 | Build it | `cups = [50]`, `total = price [*] cups`, `[print](total)` → 600. Wrong pieces: "50", +, Print |
| 11 | Recall | print()? · variable? · cups after `cups = cups + 5`? |

**Notes:** In 30 seconds (3 points) · What is a program? · print() shows things · Variables store values (naming rules; change the price and run) · Changing a value (= means “becomes”) · Worked example: the day’s total (`Total: ₹ 480`) · Mistakes: `+` with a number (TypeError), `Print` (`NameError: name 'Print' is not defined. Did you mean: 'print'?`), using a name before it has a value (`NameError: name 'cups' is not defined`) · In industry: a cart total in a shopping app; logs · Interview: what is a variable? = vs ==? case-sensitive? · Check: `print(3 * 5)` → 15; x = 7 then x = x - 2 → 5; valid name → cup_count · Cheat sheet · Docs: “An Informal Introduction to Python”.

---

## Module 2 · Numbers and maths (`p-num-1`)
**You can now:** do maths with + - * / · split into groups and leftovers with // and % · turn typed text into a number with int()

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | Riya packs 45 cups into trays of 6. `print(45 // 6, 45 % 6)`. **7 3** · 7.5 · 7.5 0 · 6 3 |
| 2 | Learn: + - * / | Tap the operator between 10 and 4 → 14, 6, 40, **2.5**. “/ always gives a decimal.” Check: `print(9 / 3)` → **3.0** · 3 · 3.3 · 27 |
| 3 | Learn: // and % | Pick 13, 20 or 45 cups; trays of 6 fill and the leftovers stay out. Check: `20 // 6` and `20 % 6`? **3 and 2** · 3 and 0.33 · 2 and 3 · 3.33 and 2 |
| 4 | Learn: int() | Switch between `"2" * 3` → `222` and `int("2") * 3` → `6`. “Typed text is text until you turn it into a number.” Check: `int("5") + 1` → **6** · "51" · 51 · an error |
| 5 | Try it with goals | Cups 36 / 40 / 45, trays of 6. Goals: **no cups left over** (36), **exactly 4 left** (40) |
| 6 | Predict, then run | `cups = 45` / `trays = cups // 6` / `left = cups % 6` / `print(trays, "trays,", left, "left")`. Stops: trays? **7** · output? **7 trays, 3 left** |
| 7 | Spot the bug | `cups = input("Cups sold? ")` (Riya types 40) / `print(cups * 12)` prints `404040404040404040404040`, no error. Tap line 1; fix: **cups = int(input("Cups sold? "))** → `480` |
| 8 | Sort | Whole number (int) or decimal (float): 7, 7.0, 10 / 2, 10 // 2, 3.5, 45 % 6 |
| 9 | Quick check | Fill `print(17 __ 5)` to show 2 → **%** · order `cups = input(...)`, `cups = int(cups)`, `print(cups * 12)` · predict `print(2 + 3 * 4)` → **14** |
| 10 | Build it | Change in coins: `change = 64`, `tens = change [//] 10`, `ones = change [%] 10`, `[print](tens, "tens and", ones, "ones")` → `6 tens and 4 ones`. Wrong pieces: /, *, Print |
| 11 | Recall | What does / always give? (a decimal) · 45 // 6 and 45 % 6? (7 and 3) · Why int(input())? (input gives text) |

**Notes:** In 30 seconds · Maths in Python (+ - * /, ** for powers, * and / before + and -, brackets first) · / vs // · % for leftovers, and checking even numbers (`n % 2 == 0`) · int(), float() and round() · Worked example: trays and leftovers · Mistakes: text times a number (`"40" * 12` repeats the text), `10 / 0` → `ZeroDivisionError: division by zero`, `int("12.5")` → `ValueError: invalid literal for int() with base 10: '12.5'` · In industry: splitting a bill, pages of search results (`//` and `%`) · Interview: / vs //? what does % do, with a use? why is input() text? · Check yourself (3) · Cheat sheet · Docs: “Numbers” in the Python tutorial.

---

## Module 3 · Text and f-strings (`p-str-1`)
**You can now:** join and repeat text · put values inside text with f-strings · tidy text with methods like strip() and upper()

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `name = "Riya"` / `print("Hi " + name + "!")`. **Hi Riya!** · Hi name! · Hi + Riya + ! · an error |
| 2 | Learn: strings | Text in quotes is a string. Tap pieces to join with +; try `*`. Check: `print("tea" * 3)` → **teateatea** · tea tea tea · tea3 · an error |
| 3 | Learn: f-strings | Put f before the quotes and values in { }. Change qty and watch `f"{qty} cups"` update. Check: `print(f"{2 + 3} cups")` → **5 cups** · 2 + 3 cups · {2 + 3} cups · 23 cups |
| 4 | Learn: methods | Tap strip(), upper(), title(), replace() on `"  riya  "`. “A method gives back new text; the original stays.” Check: `name = "riya"` / `name.upper()` / `print(name)` → **riya** · RIYA · Riya · an error |
| 5 | Try it with goals | Pick item (Tea, Coffee) and qty (1–3); line `f"{qty} x {item} = ₹{qty * 12}"`. Goals: show **3 x Tea = ₹36**; show **2 x Coffee = ₹24** |
| 6 | Predict, then run | `item = "  ginger tea  "` / `clean = item.strip().title()` / `print(f"{clean}: ₹{12 * 2}")`. Stops: clean? **'Ginger Tea'** · output? **Ginger Tea: ₹24** |
| 7 | Spot the bug | `total = 24` / `print("Total: {total}")` prints `Total: {total}`, no error. Tap line 2; fix: **print(f"Total: {total}")** → `Total: 24` |
| 8 | Sort | Gives text or a number: `len("tea")`, `"tea".upper()`, `"ab" + "c"`, `"3" * 2`, `len("")`, `f"{5}"` |
| 9 | Quick check | Fill `print(__"Hi {name}")` → **f** · order `name = "  riya "`, `name = name.strip()`, `print(name.title())` · predict `print(len("Pune"))` → **4** |
| 10 | Build it | Receipt line: `qty = 3`, `item = "tea"`, `print([f]"{qty} x {item.[title]()} = ₹{qty [*] 12}")` → `3 x Tea = ₹36`. Wrong pieces: +, upper, F |
| 11 | Recall | What does + do with strings? · How do you put a value inside text? · Does upper() change the original? |

**Notes:** In 30 seconds · Strings: quotes, + and *, len() · f-strings (any value or maths inside { }) · Methods: upper, lower, title, strip, replace; they return new text · Worked example: a neat receipt line · Mistakes: forgetting the f (prints `{total}`), mixing quotes (`print("Riya's tea")` works, `print('Riya's tea')` is a SyntaxError), expecting `name.upper()` to change name · In industry: every message and receipt an app shows is a string with values inside · Interview: what is an f-string? are strings changeable (immutable)? strip() vs replace()? · Check yourself (3) · Cheat sheet · Docs: “Text” in the Python tutorial and “f-strings”.

---

## Questions for the owner
1. Is the story right (Riya’s tea stall, trays, change, receipts), or would you like a different everyday setting for Python?
2. OK to build these three as the pilot, then build a test APK for you to try on your phone before the other 9 modules are drafted?
