# 13 · Brand and logo

**Status:** 🧪 new logo built on branch `paths-feature`, 15 Oct 2026. Not in a store build yet.

## The logo
**`< Y >`**: code brackets around a **Y** (for Yatra) whose right arm is an **arrow going up**, meaning moving ahead on your path. The owner chose this design on 15 Oct 2026.

| Part | Colour |
|---|---|
| `<` | Violet `#6C4CF5` (`#8C74FF` on dark backgrounds) |
| `>` | Teal `#14C9A4` |
| Y and arrow | Gold `#FFD84A` → orange `#FF8A00` |
| Wordmark | **Code** in ink `#16123F` (white on dark) + **Yatra** in saffron, Lexend Bold |
| App background | Navy gradient `#23157A` → `#120A4A`; splash `#170E5C` |

## Yatri is now the logo
The old robot is gone. **Yatri is the animated logo**, and it shows up everywhere the robot did (Home, onboarding, lesson complete, shop, league, certificates…):

| Mood | What it does |
|---|---|
| happy | bobs gently |
| focus | pulses slowly, with a small teal dot |
| sad | greyed out, tilted, droops |
| celebrate | jumps with gold, teal and violet sparkles |

Shop hats (cricket cap, explorer hat, graduation cap, safa) still sit on top. Reduce-motion turns off all movement.

## Files
| What | Where |
|---|---|
| Master artwork (vector) | `assets/brand/codeyatra-mark.svg` |
| In-app logo | `src/components/Logo.tsx` (`LogoMark`, `Wordmark`, `Logo`) |
| Animated mascot | `src/components/Yatri.tsx` |
| App icon, adaptive icon layers, themed icon, splash, favicon | `assets/images/*.png` |
| Store icon, feature graphic | `store/icon-512.png`, `store/feature-graphic.png` |
| Horizontal logos (light, white, mono) | `assets/brand/codeyatra-logo*.png` |

All PNGs are generated from the SVG: `node scripts/generate-brand.js`, then `node scripts/feature-graphic.js`. Edit the SVG, never the PNGs.

## Where the logo is shown
- Welcome screens: logo at the top, animated mark in the middle.
- Profile: logo above the version number.
- Launcher icon, splash screen, Play listing.

## Checks (15 Oct 2026)
- Icons checked in circle and rounded-square launcher masks, themed (monochrome) icon, and at real launcher size.
- Welcome screens screenshotted in a phone-sized browser: no errors.
- Typecheck clean; 815 tests pass.

## Next
- Upload the new store icon and feature graphic to Play Console when build 6 goes out.
- Update the screenshots in `store/screenshots/` after the redesign.
