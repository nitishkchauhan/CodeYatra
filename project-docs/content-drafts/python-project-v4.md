# Python · Basic project · Lesson v4 draft (`p-project`)

**Status:** approved by the owner on 28 Oct 2026 (keep GST) and built on `lesson-v3` (`tracks/pythonProjectV4.ts`). Changes while building: the plan match has 6 pairs (the limit), and the bug is a count that starts at 1 instead of 0 (an indentation-only fix can’t be checked). Same id, so progress and the certificate are kept.

**Title:** Project: Riya’s billing app (was “canteen billing app”).
**Why change it:** it follows the same story as the 12 modules (Riya’s tea stall), it uses everything from all 12 (the old one stopped at Module 8), and it drops the Hindi food names (chai, samosa, vada) for plain English.

**Menu:** `MENU = {"tea": 12, "coffee": 20, "toast": 20, "sandwich": 40}`

**What makes it different from a module:** this is where learners **type real code** in the editor, step by step, each step with its own tests. Between the typing steps there are short one-tap checks and a bug to spot, so it never becomes a wall of typing. Hints work as in lessons: the first one is a pointer, the next shows more.

| # | Screen | What the learner does | Uses module |
|---|---|---|---|
| 1 | **The brief** | A message from Riya: “The queue is long because I add up bills by hand. Can you make my phone do it?” Shows the finished receipt they will build. | – |
| 2 | **Plan it** (match) | Match each job to the Python for it: the menu → dictionary · an order → list · go through the order → for loop · regular customers’ discount → if · reuse each step → functions · the printed receipt → f-strings · a bad number typed → try / except · keep a copy → a file | all |
| 3 | **Step 1 · Look up a price** | Type `price(item)`: the item’s price, or 0 if it isn’t on the menu. Tests: tea → 12, sandwich → 40, pizza → 0 | 8 |
| 4 | **Step 2 · Add up an order** | Type `subtotal(order)` using `price()`. Tests: [tea, toast, tea] → 44 · [sandwich, pizza] → 40 · [] → 0 | 5, 7, 9 |
| 5 | Quick check | “subtotal(["coffee", "coffee"]) is?” → **40** | 9 |
| 6 | **Step 3 · Discount and tax** | Regular customers get 10% off (× 0.9), then everyone pays 5% GST (× 1.05), rounded to 2 places. Type `total(order, regular)`. Tests: [sandwich], False → 42.0 · [sandwich, sandwich], True → 75.6 · [], True → 0.0 | 2, 4 |
| 7 | **Step 4 · Print the receipt** | Count the items with a dictionary, then print one f-string line each and the total. Must print exactly: `tea x2 = 24` / `toast x1 = 20` / `Total: 44` | 3, 7, 8 |
| 8 | Spot the bug | A receipt that prints only the last item, because the print is outside the loop. Tap the line. | 5 |
| 9 | **Step 5 · Safe quantities** | Riya types how many cups. Type `qty(text)`: the number, or 0 for anything that isn’t a whole number, and 0 for negatives. Tests: "3" → 3 · "three" → 0 · "-2" → 0 | 4, 10 |
| 10 | **Step 6 · Keep a copy** | Type `save_receipt(order)`: write the receipt lines to receipt.txt (with "w"). Test reads the file back: `tea x2 = 24`, `toast x1 = 20`, `Total: 44` | 11 |
| 11 | Recall | 3 cards: which data type for the menu? · why functions? · "w" or "a" for a fresh receipt? | – |
| 12 | Project complete | Footprints, “You can now”, and the Python Basic certificate | – |

**You can now:** build a real program step by step, testing each step · combine dictionaries, lists, loops, if, functions, files and errors · move on to Python Intermediate or a career path.

**Optional Step 7 (my suggestion: leave it out for now):** wrap it all in a `Bill` class (Module 12). It would make the project about 25 minutes instead of 20. Better kept for Python Intermediate, where classes go deeper.

## Questions for the owner
1. OK to build it as drafted (6 typing steps, about 20 minutes)?
2. Keep GST in the maths (it teaches real billing), or drop it to keep the numbers simple?
