# 14 · Glass design (redesign)

**Status:** 🧪 redesign phase 1 built on branch `paths-feature`, 15 Oct 2026: design system, Home, tab bar. Other screens are still the light style.

## The look
- **Aurora background:** deep navy `#0E0937` with soft violet (top left), teal (right) and saffron (bottom left) glows.
- **Glass cards:** white at 7% (12% for the main card) over the aurora, a 1 px light edge and a thin shine along the top. Cards can carry a colour wash (e.g. the track colour at 16%).
- **Text on glass:** white, `#D6D2F7` for secondary and `#A9A3DA` for hints. All pass WCAG AA on a glass card.
- **Accents:** saffron for actions and the daily goal, teal for finished, violet for the active tab.

### Why no live blur
`expo-blur` (SDK 57) only blurs on Android inside a special wrapper view, and is slow on Android 11 and older, which many students use. Over soft gradient glows a translucent card looks the same as a blurred one, so the glass is built from layers and costs nothing while scrolling.

## Home (redesigned)
| Part | What it does |
|---|---|
| Header | Greeting and name, glass chips for streak and XP |
| Track rail | Glass tiles for every track |
| Hero card | Track, % done ring, current module, animated Yatri, saffron **Continue lesson** button |
| Daily goal | Glass card with a ring that fills; teal when done |
| Path card | Your career path, next stop, progress bar |
| Daily cards | Daily challenge (saffron tint) and Review (violet tint) |
| **Your journey** | Modules as a **zigzag trail**: glossy 3D nodes, the finished part of the trail glows teal, the next module pulses with Yatri beside it, locked ones are glass with a lock. Finished modules with exercises show a **Practise** chip. |

The status bar turns light while Home is showing.

## Tab bar
Dark glass on every screen, with a glowing violet pill behind the active tab.

## Code
| Part | File |
|---|---|
| Tokens | `glass` in `src/theme/index.ts` |
| Background, cards, buttons, `alpha()` | `src/components/ui/Glass.tsx` (`GlassBackground`, `GlassCard`, `GlassButton`) |
| Zigzag trail | `src/components/ModulePath.tsx` |
| Home | `src/app/(tabs)/index.tsx` |
| Glass versions | `DailyCards`, `MyPathCard`, `TrackRail` (`glass` option), `TabBar` |

## Checks (15 Oct 2026)
- Home, Paths and Profile screenshotted at phone size with a demo learner: no errors.
- Typecheck and lint clean; 815 tests pass.
- Reduce-motion stops the pulse and Yatri's movement.

## Next phases
1. Paths and Practice tabs in glass.
2. Profile, leaderboard and shop in glass.
3. Lesson screens: friendlier concept screens, glass result panels and Yatri reactions (from the design board).
