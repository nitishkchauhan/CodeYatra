# Architecture

## Tech stack
| Layer | Choice |
|---|---|
| App | Expo SDK 57, React Native 0.86, React 19.2, TypeScript |
| Navigation | Expo Router (file-based routes in `src/app/`) |
| Animation | Reanimated 4 + react-native-worklets |
| Drawing | react-native-svg |
| Storage on the phone | AsyncStorage (one JSON progress object) |
| Backend | Supabase: Postgres with row-level security, Auth (email code), Storage (avatars), Edge Functions (Ask Yatri) |
| Code running | Hidden WebView + Web Worker; Pyodide for Python |
| Builds | EAS Build (Android `.aab` for Play, `.apk` for testing) |
| Website | GitHub Pages from `docs/` |
| Tests | Jest (jest-expo), React Native Testing Library; content tests run Node, Python 3.10, gcc and sqlite |

## Folder map
```
codeyatra-app/
├── src/
│   ├── app/            Screens (Expo Router). (tabs)/ = Learn, Paths, Practice, Profile
│   ├── components/     Shared UI: Yatri, CodeEditor, RoadmapMap, sheets, ui/ (Button, Text, Icon…)
│   ├── features/lesson/  The exercise screens inside a lesson
│   ├── content/        All learning content: tracks, lessons, drills, paths, mock bank, projects
│   ├── state/          Progress model, rewards, streaks, account sync
│   ├── lib/            Code runner, Supabase client, moderation, feedback, telemetry, reminders
│   ├── game/           Block-puzzle engine for Logic & Blocks
│   ├── i18n/           UI strings
│   └── theme/          Colours, fonts, card styles
├── supabase/           schema.sql (database), track-lessons.sql (generated), Edge Function
├── docs/               Public website (privacy, delete account, verify certificate)
├── store/              Play Store listing, screenshots, graphics
├── scripts/            Brand assets, screenshots framing, path link checker
└── project-docs/       These docs
```

## How data flows
1. Everything the learner does updates one **progress object** (`Progress` in `src/state/model.ts`), saved on the phone right away.
2. When signed in, about 1.5 seconds after a change, `src/state/account.tsx` pushes it to `learner_state` and the public card to `profiles`.
3. On sign-in, the cloud copy is pulled and **merged** with the phone copy (`mergeProgress`), so nothing is lost.
4. The server protects what matters: XP limits, certificates, reports and blocks are enforced in SQL, not trusted from the phone.

## Database (supabase/schema.sql)
Every section is safe to re-run. Run new sections in the Supabase SQL Editor when they are added.

| Version | Adds |
|---|---|
| v1.0 | `learner_state`, `profiles`, avatars storage, delete account |
| v1.1 | Profile photo and bio |
| v1.2 | Ask Yatri quota, certificates, referrals, classes, telemetry (`app_events`) |
| v1.3 | Leaderboard XP limits (trigger) |
| v1.4 | Server-issued certificates (`claim_certificate`, `track_lessons`) |
| v1.5 | Reports, blocks, hiding reported profiles |

SQL changes are tested in a local Postgres (PGlite) before handing over.

## Branches and builds
| | |
|---|---|
| `main` | What store builds are made from |
| `paths-feature` | Career paths + new onboarding, merged into `main` when approved |
| Build 4 (v1.2.0) | First closed-test build |
| Build 5 (v1.2.0) | Report/block, feedback links, editor fix |
| Build 6 | v1.3.0, 15 Oct 2026, EAS `1f0e9f82-d2f4-4ddb-b8de-ea0aae595a8b`: career paths, onboarding v2, new logo, Light Glass design, learning plan, Yatri in lessons, module practice, blocked permissions |

Build a store bundle: `npx eas-cli@latest build --platform android --profile production`
Build a test APK: `npx eas-cli@latest build --platform android --profile preview`

## Checks before every commit
```bash
npx tsc --noEmit
npx expo lint
npx jest
node scripts/check-path-links.js   # when paths or links change
```
