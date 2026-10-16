# 13 · Brand and logo

**Status:** ✅ final logo chosen by the owner on 16 Oct 2026 (“cy, leaving footprints”). On `main`; not in a store build yet (build 6 has the earlier `< Y >` logo).

## The logo
**A lowercase “cy” whose y-tail leaves three saffron footprints**: learning to code is a journey you take step by step. Tagline: **YOUR JOURNEY IN CODE**.

History: the robot (until 14 Oct) → `< Y >` arrow (15 Oct, friends found it weak) → several rounds of concepts on the design canvas → **cy monogram (final, 16 Oct)**.

| Part | Colour |
|---|---|
| c | Navy `#170E5C` (white on dark backgrounds) |
| y | Indigo `#4B3FD8` (lavender `#A594FF` on dark) |
| Footprints | Saffron `#FF9F1C`, fading 100% → 70% → 45% |
| Icon tile | White → lavender `#FFFFFF` → `#EEEBFB`; splash white |
| Wordmark | **Code** in navy + **Yatra** in indigo, Lexend Bold |
| Tagline | `YOUR JOURNEY IN CODE`, spaced capitals, grey `#6E6A88` |

## Yatri is the animated logo
Yatri is the cy mark itself, everywhere the old robot was (onboarding, Home, lessons, lesson complete, shop, league, certificates, avatars). The three footprints animate on their own:

| Mood | What it does |
|---|---|
| happy | the footprints **walk**: they land one by one, farthest first, then fade and start again; the mark bobs gently |
| focus (thinking, running code) | the footprints **hop like typing dots** (· · ·); the mark pulses |
| sad (wrong answer) | greyed out, tilted, footprints sink and fade |
| celebrate (right answer, lesson done) | the mark jumps, the footprints **pop**, sparkles appear |
| **tap** (welcome screens, Home) | Yatri hops and celebrate plays for 1.6 s, with a light vibration |

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
- Splash: white, with mark, name and tagline.
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
