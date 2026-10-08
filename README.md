# CodeYatra

A mobile app that teaches programming from first principles to full-stack
development, in eight language tracks grouped into sections:

| Section | Track | Modules | Practice style |
|---|---|---|---|
| Start here | Logic & Blocks | 6 | Isometric block puzzles with Yatri the robot |
| Web basics | HTML | 5 | Fill-in code with a live preview |
| Web basics | CSS | 5 | Live preview of colours, box model, Flexbox |
| Web basics | JavaScript | 5 | Real code editor with tests |
| Programming | Python | 6 | Real code editor with tests (Pyodide) |
| Full-stack | React | 5 | Components, state, lists, events, effects |
| Full-stack | Node.js | 5 | Modules, async, Express, JSON, API routes |
| Full-stack | Next.js | 5 | Layouts, dynamic routes, server data, route handlers |

Every module follows the same rhythm: **read → quick check → practice → complete**.

Built with Expo SDK 57, Expo Router, Reanimated 4 and react-native-svg.

## What is inside

- **8 tracks, 42 modules, 20 practice challenges**: switch languages from an icon row on Learn and Practice
- **Profile**: photo from gallery or camera (synced via Supabase Storage when signed in), bio, avatar colour, main language
- **Real code execution**: Python (Pyodide) and JavaScript run in a sandboxed worker with tests, line-numbered errors and an infinite-loop guard
- **Code playground** for free coding
- **Accounts (Supabase)**: email code or Google sign-in, progress sync across phones; guest mode works offline
- **Weekly league**, shareable **certificates**, **coins + shop** (outfits, streak freezes), **daily reminders**
- English UI, haptics, accessible labels, reduced-motion friendly animations

## Turn on accounts (optional)

1. Create a free project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql` (safe to re-run; it also creates the `avatars` storage bucket).
3. Authentication → Emails → edit the Magic Link template to include `{{ .Token }}` so learners get a 6-digit code.
4. (Google) Authentication → Providers → Google, and add `codeyatra://auth-callback` to Redirect URLs.
5. Copy `.env.example` to `.env` and fill in the URL and publishable key. Restart `npx expo start`.

For EAS builds, add the same two values as EAS environment variables (`npx eas-cli@latest env:create`).

## Publish on Google Play

See [store/README.md](store/README.md): listing text, privacy policy, data safety answers, screenshot list and upload steps.

## Run it

```bash
npm install
npx expo start          # scan the QR code with Expo Go on Android
npx expo start --web    # quick check in the browser
```

## Build an installable Android APK

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

Use `--profile production` for a Play Store bundle (`.aab`).

## Checks

```bash
npm test               # engine, content, real Python/JS solutions, sync merge
npx tsc --noEmit
npx expo lint
```

The content tests prove every puzzle is solvable within its block target and
that every code exercise passes with its intended answer **and with no other
combination of tokens**.

## Project layout

```
src/
  app/                    Expo Router screens
    onboarding.tsx        First run: welcome, language, about you
    (tabs)/               Learn, Practice, Profile (custom tab bar)
    lesson/[id].tsx       Lesson player (no bottom navigation)
  features/lesson/        Concept, Quiz, Puzzle and Code steps + completion screen
  components/             Board, Yatri, Code (highlighter + gaps), Preview, Blocks, StageSheet, TabBar
  components/ui/          Text, Button, Icon, Progress (ring/bar/segments), Toast
  content/                Stages, units and lesson content for all four stages
  game/                   Puzzle engine, levels, Python codegen
  state/                  Saved progress (AsyncStorage), streak rules
  i18n/                   UI strings
  lib/haptics.ts          Vibration feedback (respects the user setting)
  theme/                  "Studio" design tokens
```

## Adding a lesson

1. Write it in `src/content/<stage>.ts` as a list of steps (`concept`, `quiz`,
   `puzzle`, `code`). Code steps include a `solution` and a `run` function that
   returns output, checks or a preview.
2. Reference its id in the stage's `units` in `src/content/index.ts`.
3. Run `npm test`. The content tests check it automatically.

Lessons listed in a unit without content yet show as **Soon** and never block
the lessons after them.
