# Python · Basic · Lesson v4 draft (Modules 4–12)

**Status:** draft for owner review (28 Oct 2026). Same format as the approved pilot (Modules 1–3): guess first → 3 cards, each ending in a one-tap check → try it with 2 targets → predict, then run (2 pauses) → spot the bug (real error or wrong output) → sort or match → 3 quick checks (fill the gap, put lines in order, predict) → build it → 3 recall cards. Notes for each module get the v4 sections too (In 30 seconds, runnable code, common mistakes, check yourself).

Module ids stay the same, so progress is kept. **Every output and error below was run in real Python on 28 Oct 2026**; the tests will run them again. Plain English, no Hindi words. The story stays at **Riya’s tea stall**.

Try-it targets are values the app really offers when a number is tapped (it suggests n+1, 2×n and n+10).

---

## Module 4 · Making decisions (`p-if-1`)
**You can now:** compare with == (and store with =) · run one branch with if, elif and else · combine checks with and / or

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `cups = 120` / `if cups > 100:` → `Busy day!` else `Quiet day`. Options: **Busy day!** · Quiet day · both lines · nothing |
| 2 | Card: if | An if runs its indented lines only when the condition is True. Check: `marks = 35` / `if marks >= 40: print("Pass")` → **Nothing is printed** · Pass · 35 · an error |
| 3 | Card: elif and else | Python checks from the top and runs only the first branch that is True. Check: bill = 250 with >500 / >200 / else → **₹20 delivery** |
| 4 | Card: and / or | and needs both sides True; or needs either. Check: `age = 15`, `has_ticket = True`, `print(age >= 18 and has_ticket)` → **False** |
| 5 | Try it | `bill = 180`; ≥ 200 prints `Free tea!`, else `Add 20 more`. Targets: **Free tea!** (360) · **Add 10 more** (190) |
| 6 | Predict, then run | `temp = 34` … `drink = "iced tea"` / `"hot tea"` … `print("Today:", drink)`. Pauses: drink? **'iced tea'** · output? **Today: iced tea** |
| 7 | Spot the bug | bill = 700 prints `₹20 delivery` (no error): the > 200 test comes first and catches it. Fix line 2: `if bill > 200 and bill <= 500:` → `Free delivery` |
| 8 | Sort | True or False: `5 > 3` T · `2 == "2"` F · `10 <= 10` T · `"a" == "A"` F · `3 != 4` T · `7 > 7` F |
| 9 | Quick checks | Fill `if x __ 0:` → **==** · order an if/else that prints Pass · predict `x = 5; if x > 3 and x < 10` → **in range** |
| 10 | Build it | Delivery fee: `if bill [>] 500` / `[elif] bill > 200` / `[print]("Fee:", fee)` → `Fee: 20` |
| 11 | Recall | = vs == · how many branches run? (only one) · and vs or |

## Module 5 · Repeat with for and range() (`p-loop-1`)
**You can now:** repeat lines with for · count with range() · add up a running total

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `for i in range(3): print("Tea!")` → **Tea! three times** · once · four times · an error |
| 2 | Card: range | `range(1, 4)` gives 1, 2, 3: it stops before the second number. Check: range(2, 6) gives → **2, 3, 4, 5** |
| 3 | Card: the loop variable | It takes the next value each round. Check: `for c in "tea": print(c)` → **t, e and a on three lines** |
| 4 | Card: running total | Start at 0, add inside the loop, print after. Check: `total = 0`, add 5 four times → **20** |
| 5 | Try it | Times table for `cups = 6` (last line `3 x 6 = 18`). Targets: **3 x 7 = 21** · **3 x 12 = 36** |
| 6 | Predict, then run | `total = 0` / `for price in range(10, 31, 10):` / `total = total + price` / `print(total)`. Pauses: total after the first round? **10** · output? **60** |
| 7 | Spot the bug | Riya wants days 1 to 5; `range(1, 5)` stops at `Day 4`. Fix: `range(1, 6)` |
| 8 | Sort | Includes 5 or not: range(5) ✗ · range(1, 5) ✗ · range(1, 6) ✓ · range(5, 10) ✓ · range(0, 6, 5) ✓ · range(4) ✗ |
| 9 | Quick checks | Fill `for i in ____(3):` → **range** · order a running total · predict `range(2, 8, 2)` → **2, 4, 6** |
| 10 | Build it | Sum 1 to 5: `total = [0]`, `range(1, [6])`, `total [+] n` → `15` |
| 11 | Recall | What does range(1, 4) give? · where does print go for a total? · what is the loop variable? |

## Module 6 · while loops (`p-while-1`)
**You can now:** repeat while a condition is True · change something inside so it can end · leave early with break

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `cups = 3; while cups > 0: print(cups); cups = cups - 1` → **3 2 1** · 3 · 3 2 1 0 · forever |
| 2 | Card: while | It checks the condition before every round. Check: `n = 1; while n < 4: n = n + 1; print(n)` → **4** |
| 3 | Card: it must end | Something inside must change, or it never stops. Check: which loop never ends? → **while x > 0: print(x)** |
| 4 | Card: break | break leaves the loop at once. Check: first number over 6 in [3, 8, 5, 12] → **8** |
| 5 | Try it | ₹50, tea is ₹12: `4 cups`. Targets: **8 cups** (100) · **5 cups** (60) |
| 6 | Predict, then run | `tank = 10; while tank > 4: tank = tank - 3; print(tank)`. Pauses: tank after one round? **7** · output? **4** |
| 7 | Spot the bug | Countdown prints `3 2 Go!` (no error): `while n > 1` stops too soon. Fix: `while n > 0:` |
| 8 | Sort | Stops or never stops (short loops shown as code) |
| 9 | Quick checks | Fill the word that leaves a loop → **break** · order a countdown · predict `n = 10; while n > 1: n = n // 2` → **1** |
| 10 | Build it | Countdown: `n = [3]`, `while n [>] 0`, `n = n [-] 1` → `3 2 1` |
| 11 | Recall | while vs for · why must something change? · what does break do? |

## Module 7 · Lists (`p-loop-2`)
**You can now:** keep values in order (positions start at 0) · add with append() and replace with list[i] = x · visit every item with for

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `menu = ["tea", "coffee", "milk"]; print(menu[1])` → **coffee** · tea · milk · an error |
| 2 | Card: positions | The first item is at 0. Check: menu[0] → **tea** |
| 3 | Card: append and replace | Check: `menu = ["tea", "coffee"]; menu.append("milk"); print(len(menu))` → **3** |
| 4 | Card: for item in list | Check: total of [12, 20, 15] → **47** |
| 5 | Try it | `prices = [12, 15, 20]; print(sum(prices))` → 47. Targets: **62** · **57** |
| 6 | Predict, then run | `orders = ["tea"]` / append "coffee" / `orders[0] = "milk"` / print. Pauses: orders after append? **['tea', 'coffee']** · output? **['milk', 'coffee']** |
| 7 | Spot the bug | `print(menu[3])` → `IndexError: list index out of range`. Fix: `menu[2]` (or `menu[-1]`) |
| 8 | Sort | For a 3-item menu, works or error: menu[0] · menu[2] · menu[3] · menu[-1] · menu[1] · menu[5] |
| 9 | Quick checks | Fill `menu.____("juice")` → **append** · order a list total · predict `len(cart), cart[-1]` → **3 milk** |
| 10 | Build it | Total a list with a loop → `47` |
| 11 | Recall | first position? · append vs list[i] = x · how to visit every item? |

## Module 8 · Dictionaries (`p-dict-1`)
**You can now:** look up a value by its key · add or change with d[key] = value · check with in or get() for keys that might be missing

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `price = {"tea": 12, "coffee": 20}; print(price["coffee"])` → **20** · 12 · coffee · an error |
| 2 | Card: keys and values | A dictionary maps names to values. Check: price["tea"] → **12** |
| 3 | Card: add or change | Check: add milk, change tea to 14 → `print(len(price), price["tea"])` → **2 14** |
| 4 | Card: in and get() | Check: `price.get("milk", 0)` and `"milk" in price` → **0 False** |
| 5 | Try it | `print(price["tea"] * 3)` → 36. Targets: **72** · **48** |
| 6 | Predict, then run | `stock = {"tea": 5}` / take 2 teas / add milk 4 / print. Pauses: stock after line 2? **{'tea': 3}** · output? **{'tea': 3, 'milk': 4}** |
| 7 | Spot the bug | `price["Tea"]` → `KeyError: 'Tea'`. Fix: `price["tea"]` (keys care about capitals) |
| 8 | Sort | Key or value in `{"tea": 12, "coffee": 20}` |
| 9 | Quick checks | Fill `if "milk" __ price:` → **in** · order a stock update · predict `d["a"] = d["a"] + 5` → **6** |
| 10 | Build it | Count orders with get(): → `{'tea': 2, 'coffee': 1}` |
| 11 | Recall | what is a key? · d[key] = value does what? · how to avoid a KeyError? |

## Module 9 · Functions (`p-fn-1`)
**You can now:** define a function with def · call it with your values · give back an answer with return

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `def greet(name): return "Hi " + name` / `print(greet("Riya"))` → **Hi Riya** · Hi name · greet · nothing |
| 2 | Card: def and call | The body runs only when the function is called. Check: called twice → body runs **2 times** |
| 3 | Card: parameters | Check: `def bill(cups): return cups * 12`, `bill(3)` → **36** |
| 4 | Card: return vs print | print shows; return gives back. Check: a function that only prints → `x` is **None** |
| 5 | Try it | `bill(cups, price)` with cups = 3, price = 12 → 36. Targets: **48** · **72** |
| 6 | Predict, then run | `bill(3)` inside: `total = cups * 12`; pauses: total inside the function? **36** · output? **36** |
| 7 | Spot the bug | No return → prints `None` (no error). Fix line 2: `return cups * 12` |
| 8 | Sort | Shows something (print) or gives back a value (return) |
| 9 | Quick checks | Fill `____ add(a, b):` → **def** · order a function and its call · predict `double(double(3))` → **12** |
| 10 | Build it | Discount: `return bill [-] 50` / `[return] bill` / `[print](discount(600))` → `550` |
| 11 | Recall | when does the body run? · parameter? · return vs print |

## Module 10 · Handling errors (`p-err-1`)
**You can now:** read the last line of an error first · keep running with try / except · catch the specific error you expect

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `print(int("abc"))` → **ValueError** · 0 · abc · nothing |
| 2 | Card: read the last line | It names the error and the reason. Check: `print(10 / 0)` → **ZeroDivisionError** |
| 3 | Card: try / except | Check: `int("x")` inside try, `except ValueError: print("Numbers only")` → **Numbers only** |
| 4 | Card: be specific | Catch the error you expect, not everything. Check which except catches `int("x")` → **except ValueError** |
| 5 | Try it | Split ₹1200 by `people = 3` → 400. Targets: **300** · **200** |
| 6 | Predict, then run | `int("abc")` in try → except prints `Not a number`, then `Done`. Pauses at the except line and at the end |
| 7 | Spot the bug | `10 / 0` with `except ValueError` still crashes: `ZeroDivisionError: division by zero`. Fix: `except ZeroDivisionError:` |
| 8 | Match | `int("x")` → ValueError · `5 / 0` → ZeroDivisionError · `[1][5]` → IndexError · `{"a": 1}["b"]` → KeyError · `"a" + 1` → TypeError |
| 9 | Quick checks | Fill `____:` before the risky line → **try** · order a try/except · predict A / 1/0 / B / except C → **A then C** |
| 10 | Build it | `[try]:` `cups = int(text)` `[except] ValueError:` `cups = 0` `[print](cups)` → `0` |
| 11 | Recall | which line of an error first? · what does except do? · why be specific? |

## Module 11 · Files (`p-file-1`)
**You can now:** write with "w", add with "a", read with "r" · let with close the file for you · read a file line by line

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | Write `tea` to menu.txt, then read it → **tea** |
| 2 | Card: open and write | "w" starts the file empty. Check: what happens to old text with "w"? → **It is wiped** |
| 3 | Card: with | with closes the file when the block ends, even after an error. Check |
| 4 | Card: line by line | `for line in f: print(line.strip())` → `tea`, `coffee`. Check: why strip()? → **to remove the newline** |
| 5 | Try it | Save `cups * 12` for 40 cups → 480. Targets: **960** · **600** |
| 6 | Predict, then run | Write tea and coffee, then readlines(). Pauses: lines? **['tea\n', 'coffee\n']** · output? **2** |
| 7 | Spot the bug | Opening again with "w" wipes tea: it prints only `coffee`. Fix: open with `"a"` |
| 8 | Sort | "r" reads · "w" writes from empty · "a" adds to the end (3 groups) |
| 9 | Quick checks | Fill the mode that adds → **"a"** · order write-then-read · predict reading a missing file → **FileNotFoundError** |
| 10 | Build it | Write two lines with `"w"`, read them back with `print(line.strip())` → `tea`, `coffee` |
| 11 | Recall | w vs a · why with? · strip() on lines? |

## Module 12 · Classes and objects (`p-class-1`)
**You can now:** describe a new type with class · set up each object in __init__ · write methods that use self

| # | Screen | Content |
|---|---|---|
| 1 | Guess first | `class Cup` with `self.size = size`; `Cup("large").size` → **large** |
| 2 | Card: class and object | A class is a blueprint; each object is one thing made from it. Check: `Cup("s")`, `Cup("m")` → **2 objects** |
| 3 | Card: __init__ and self | Check: `a = Cup("small")`, `b = Cup("large")`, `print(a.size, b.size)` → **small large** |
| 4 | Card: methods | Check: Tab adds 12 then 5 → `t.total` **17** |
| 5 | Try it | `Order(price, qty)` with 12 and 3 → `o.total()` 36. Targets: **48** · **72** |
| 6 | Predict, then run | `t.add(12)`, print, `t.add(20)`, print. Pauses: output after first print? **12** · after second? **32** |
| 7 | Spot the bug | `total = 0` without self → `AttributeError: 'Tab' object has no attribute 'total'`. Fix: `self.total = 0` |
| 8 | Match | class → blueprint · object → one thing made from it · __init__ → sets it up · self → this object · method → a function inside the class |
| 9 | Quick checks | Fill `def __init__(____, size):` → **self** · order a class and its use · predict two cups → **small large** |
| 10 | Build it | `[self].size = size` … `[print](c.[label]())` → `Cup: large` |
| 11 | Recall | class vs object · what does __init__ do? · what is self? |

---

**Project (`p-project`, canteen billing app):** stays as it is for now; I’ll redo it in the v4 style after these modules, as one guided build that uses Modules 1–12.

## Questions for the owner
1. OK to build all nine as drafted (same format and story as the pilot)?
2. Any module you want changed before I build?
