# CodeYatra

A mobile app that teaches programming from first principles to placement-ready
DSA, in 16 tracks of 10 modules each:

| Section | Tracks | Practice style |
|---|---|---|
| Start here | Logic & Blocks | Block puzzles with Yatri, predict, order and debug |
| School | CBSE Computer Science | Class 11–12 Python syllabus, find-the-output, board coding questions |
| Web basics | HTML, CSS, JavaScript | Live web-page builder, fill-in code, real JS editor |
| Programming | Python, C, Java | Real Python editor; C and Java output, bug and order drills |
| Full-stack | React, Node.js, Next.js | Fill-in code, find the bug, JS editor with tests |
| CS core | DSA, DSA Advanced, SQL, Git | Python algorithms with tests, real SQL queries, command drills |
| Placement | Placement Prep | Coding-round questions with tests, output and OOP questions |

Every module follows the same rhythm: **read → quick check → practice → complete**.

Built with Expo SDK 57, Expo Router, Reanimated 4 and react-native-svg.

## What is inside

- **16 tracks, 160 modules, 36 practice sets, 4 guided projects, timed placement mock tests** (118-question bank) (portfolio page, to-do app, quiz game, guessing game)
- **8 exercise types**: reading cards, quizzes, fill the gap, real code editor, order the lines, find the bug, predict the output, tap the token, plus a live HTML/CSS/JS page builder and block puzzles
- **Real code execution** in a sandbox: Python (Pyodide), JavaScript, and SQL (sqlite3 on a sample railway database)
- **Ask Yatri**: AI hints from Claude through a Supabase Edge Function, with a daily quota
- **Daily challenge** and **review my mistakes**
- **Accounts (Supabase)**: email code sign-in, sync across phones; guest mode works offline
- **Weekly league**, **verifiable certificates** with Add to LinkedIn, **invite codes**, **classes** for teachers, shareable progress card
- **Profile**: photo, bio, avatar colour, main language; coins, shop and streak freezes; daily reminders
- **Anonymous crash reports and events** (opt-out in Profile), English UI, accessible labels

Every answer the app teaches is verified: the test suite runs each predicted output, ordered program and coding solution with Node, Python, gcc and sqlite.

## Turn on accounts (optional)

1. Create a free project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql` (safe to re-run; creates tables, storage and functions).
3. Authentication → Emails: connect SMTP, then put `{{ .Token }}` in the Magic Link template (a branded template is in `supabase/email-login-code.html`).
4. Authentication → URL Configuration: add `codeyatra://auth-callback` to Redirect URLs.
5. Copy `.env.example` to `.env` and fill in the URL and publishable key. Restart `npx expo start`.

For EAS builds, add the same two values as EAS environment variables (`npx eas-cli@latest env:create`).

## Turn on Ask Yatri (AI hints)

1. Get an API key at console.anthropic.com.
2. Install the Supabase CLI, then from this folder:

```bash
npx supabase login
npx supabase link --project-ref YOUR-PROJECT-REF
npx supabase secrets set ANTHROPIC_API_KEY=your-key
npx supabase functions deploy ask-yatri
```

Each signed-in learner gets 20 questions a day (`DAILY_LIMIT` in `supabase/functions/ask-yatri/index.ts`).

## Certificate verification and privacy pages

Turn on GitHub Pages (Settings → Pages → branch `main`, folder `/docs`). Then `docs/verify.html` verifies certificates and `docs/privacy.html` is the privacy policy URL for Google Play.

## Launching

Step-by-step owner checklist: [LAUNCH.md](LAUNCH.md).

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
