# HTML track: Lesson v5 (owner spec, built 29 Oct 2026)

Source: the owner's "HTML Track – Complete Lesson Content" (9 modules, 38 lessons, a Module Challenge per module with 5 quick questions and 6 tasks, badges and stars). Built as given, with the changes below. Code: `src/content/tracks/htmlV5/` (`m1.ts`…`m9.ts`), screens in `src/features/lesson/V5.tsx`, tests in `src/content/__tests__/lessonV5.test.ts`.

## Modules

| # | Module | Lessons | Badge |
|---|---|---|---|
| 1 | Getting Started | 1.1–1.5 | 🏷 First Tag |
| 2 | Working with Text | 2.1–2.5 | ✍️ Wordsmith |
| 3 | Style Basics | 3.1–3.4 | 🎨 Colour Painter |
| 4 | Links and Images | 4.1–4.4 | 🔗 Link Explorer |
| 5 | Organising Content | 5.1–5.4 | 🗂 Organiser |
| 6 | Page Building | 6.1–6.4 | 🏗 Page Architect |
| 7 | Forms | 7.1–7.4 | 📝 Form Builder |
| 8 | Media and Graphics | 8.1–8.4 | 🎬 Media Maker |
| 9 | Going Further | 9.1–9.5 (9.3 is new) | 🏆 HTML Pro (final challenge: the portfolio project) |

Each module ends with its Challenge (`html-M-ch`); stars: no mistakes = 3, up to 2 = 2, otherwise 1.

## Screen types (spec name → app screen)

chat → Chat · tapReveal → Tap to reveal · explore → Explore (tap a line, the live page outlines it) · dragToTry → **Tap to place** (one-handed, no drag) · toggle / beforeAfter → Toggle · liveEdit → Live edit (slider or choices, page updates as you change it) · quickCheck → the v4 tap answer · tapTheBug → Tap the bug · recap → Recap · swipeTF → Swipe true/false · matchPairs → Match · tapCorrectCode → Pick the code · xray → **X-ray on the real page** (tap the part, then name it) · arrangeBlocks → Arrange the blocks.

## What changed from the spec, and why

- **No Hindi words** (app rule): Masala Chai → Lemon Tea; Hindi subtitle examples → English.
- **Own examples** where the spec was close to well-known tutorial sites: London → Pune; "my eyes are blue" → "the sky is blue".
- Fixed the broken code fence in a Module 3 task.
- **Added 9.3 "Pages for everyone"** (alt text, labels, headings in order, contrast): accessibility was missing and the old track had a module on it (`h-a11y-1` keeps its id).
- Media previews work offline (built-in pictures instead of web links).
- Old lesson ids reused so learners keep progress, notes and practice sets (see CHANGELOG, 29 Oct).

## Known limits (for later)

- Arrange the blocks accepts only the exact order.
- Coins come from the existing reward system (the spec's own coin numbers are not used).
- Badges show on the finish screen but are not stored on the profile yet.
- Notes for the new short lessons are the old module notes for now.
