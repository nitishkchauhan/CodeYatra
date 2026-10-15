# 14 · Light Glass design (whole app)

**Status:** 🧪 built on branch `paths-feature`, 15 Oct 2026. **One light design across every screen.** Not in a store build yet.

## The look
- **Light aurora background** behind every screen: pale lavender `#F3F1FB` with soft violet (top left), teal (right) and saffron (bottom left) glows.
- **Frosted glass cards:** translucent white, a bright edge, a thin shine along the top and a soft violet-tinted shadow.
- **Text:** the original dark inks (`#16142B`, `#55526E`, `#6E6A88`), all WCAG AA on white and frosted cards.
- **Accents:** violet `#4B3FD8` for actions and the active tab, saffron for **Continue** and the daily goal, teal/green for finished.
- The owner chose light over a dark version (15 Oct 2026); a dark version was built and reverted (`d46692b`, reverted in the next commit).

## The rules (follow these for every new screen)
| Rule | How |
|---|---|
| Background | Never set one. Every screen already sits on the shared light aurora (`screenLayout` in `src/app/_layout.tsx`). Use `colors.bg` (transparent). |
| Cards | `card` from the theme (frosted white), or `GlassCard` / `GlassButton` for Home-style cards. |
| Solid panels | Sheets, inputs and plain white tiles: `colors.surface` (white). |
| Colours | Use the theme tokens (`colors`, `glass`), never new hex values in screens. |

### Why no live blur
`expo-blur` (SDK 57) only blurs on Android inside a special wrapper view and is slow on Android 11 and older. Over soft gradient glows, translucent cards look the same and scroll smoothly on cheap phones.

## Home
Header chips, track rail, hero card with Yatri and **Continue lesson**, daily goal ring, path card, daily cards, and **Your journey**: modules as a zigzag trail of glossy 3D nodes (teal trail when finished, pulsing next module with Yatri, Practise chips).

## Code
| Part | File |
|---|---|
| Tokens, `card` (frosted), `glass` | `src/theme/index.ts` |
| Light aurora, glass card/button, `alpha()` | `src/components/ui/Glass.tsx` |
| Shared background for every screen | `src/app/_layout.tsx` (`screenLayout`) |
| Zigzag trail | `src/components/ModulePath.tsx` |
| Glass versions | `DailyCards`, `MyPathCard`, `TrackRail` (`glass` option), `TabBar` |

## Checks (15 Oct 2026)
- Screenshotted at phone size with a demo learner: Home (top and journey), Paths, a path map, Practice, Profile, Shop, League, a lesson, Playground, Mock tests, Certificate, Edit profile, Account, Invite, Share, onboarding. No errors.
- Typecheck and lint clean; 815 tests pass.

## Next
- Friendlier lesson screens (big Yatri reactions, from the design board).
