# 14 · Aurora Glass design (whole app)

**Status:** 🧪 built on branch `paths-feature`, 15 Oct 2026. **One design across every screen.** Not in a store build yet.

## The choice
**Aurora Glass:** a dark navy background with soft violet, teal and saffron glows, and see-through glass cards on top. Chosen by us for CodeYatra because:
- it matches the navy `< Y >` logo and app icon;
- coding apps learners like (Mimo, Enki, VS Code) are dark, and the code editor already was;
- it is easier on the eyes at night, when many students study;
- it uses less battery on OLED phones, common in India.

## The rules (follow these for every new screen)
| Rule | How |
|---|---|
| Background | Never set one. Every screen already sits on the shared aurora (`screenLayout` in `src/app/_layout.tsx`). Use `colors.bg` (transparent). |
| Cards | `card` from the theme, or `GlassCard` / `GlassButton`. Translucent white, 1 px light edge. |
| Solid panels | Sheets, inputs, toasts: `colors.surface` (`#1B1452`) so content behind doesn’t show through. |
| Text | `colors.ink` (white), `ink2`, `ink3` for hints. |
| **Text on a coloured fill** | Always **navy** (`colors.onColor`). Every accent is light enough to carry navy text and to read as text on navy. |
| Accents | `primary` violet `#9B88FF`, `saffron` `#FFB23F`, `success` `#34D399`, `danger` `#FB7185`, `teal` `#2DD4BF`. Soft versions are translucent. |
| Track and path colours | Lifted automatically by `onDark()` so they read on glass. Use them as given. |
| Selected chip or tab | White at 16% (`rgba(255,255,255,0.16)`), not a white pill. |
| Exceptions (keep their own colours) | The certificate (printed paper), web page previews (a real page is white), the puzzle board, avatar colours, project cards. |

All colours are checked by tests: `src/theme/__tests__/contrast.test.ts` (text and accents on navy and on the lightest glass, navy on every accent) and the track/path colour tests in `src/content/__tests__/paths.test.ts`.

### Why no live blur
`expo-blur` (SDK 57) only blurs on Android inside a special wrapper view and is slow on Android 11 and older. Over soft gradient glows, translucent cards look the same and scroll smoothly on cheap phones.

## Home
Header chips, glass track rail, hero card with Yatri and **Continue lesson**, daily goal ring, path card, daily cards, and **Your journey**: modules as a zigzag trail of glossy 3D nodes (teal trail when finished, pulsing next module with Yatri, Practise chips).

## Code
| Part | File |
|---|---|
| Tokens, `card`, `glass`, `alpha()`, `onDark()`, `contrast()` | `src/theme/index.ts` |
| Aurora background, glass card/button | `src/components/ui/Glass.tsx` |
| Shared background for every screen | `src/app/_layout.tsx` (`screenLayout`) |
| Zigzag trail | `src/components/ModulePath.tsx` |
| Buttons (navy text on colour) | `src/components/ui/Button.tsx` |

## Checks (15 Oct 2026)
- Screenshotted at phone size with a demo learner: Home, Paths, a path map, Practice, Profile, Shop, League, lessons (concept, quiz, wrong answer, block puzzle), Playground, Mock tests, Certificate, Edit profile, Account, Invite, Share, onboarding. No errors.
- Typecheck and lint clean; 850 tests pass (35 new colour checks).

## Next
- Friendlier lesson screens (big Yatri reactions, from the design board).
- A light theme option later, if learners ask for it.
