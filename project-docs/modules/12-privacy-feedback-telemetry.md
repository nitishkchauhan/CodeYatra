# 12 · Privacy, feedback and telemetry

## Data the app collects
| Data | When | Why |
|---|---|---|
| Email | Only when signing in | Sign-in; never shown to others |
| Display name, photo, bio | Signed in | Profile and league |
| Learning progress | Signed in (guests: phone only) | Sync |
| Code sent to Ask Yatri | Only when asking (feature off today) | AI hint |
| Anonymous crash reports and events | Unless switched off in Profile | Fixing bugs; no name, email or account ID |

No ads, no advertising ID, no third-party trackers. All traffic uses HTTPS.

## Public pages (GitHub Pages, `docs/`)
- Privacy policy: `https://nitishkchauhan.github.io/CodeYatra/privacy.html`
- Account deletion: `https://nitishkchauhan.github.io/CodeYatra/delete-account.html`
- Support email: `codeyatra.support@gmail.com`

## Google Play declarations (as filled in Oct 2026)
- Ads: **No** · Advertising ID: **No** · Government app: **No** · Financial features: **none** · Health: none
- Target audience: **13–15, 16–17, 18+**
- Content rating: all other app types; users can interact (league profiles); no chat, location or purchases
- Data safety: name, email, user IDs, photos, app interactions, other user content, crash logs, diagnostics. Collected, not shared, optional, encrypted in transit, deletable.
- Sign-in for review: email code using a dedicated review Gmail (Google sign-in is off in builds).

**When ads are added, these must change** (Ads = yes, advertising ID = yes, data safety updated, privacy policy updated).

## Feedback
- Profile → **Send feedback**, and **“Something wrong in this lesson? Tell us”** after each lesson.
- Opens an email to support with the app version, phone OS and lesson ID; no personal data added.

## Android permissions
Requested: internet, notifications, camera (profile photo only), vibrate and similar. Blocked on purpose from build 6: “draw over other apps” (`SYSTEM_ALERT_WINDOW`), `WRITE_EXTERNAL_STORAGE`, `DUMP` (`app.json` → `blockedPermissions`).

## Where it lives in the code
| Part | Files |
|---|---|
| Telemetry | `src/lib/telemetry.ts`, `app_events` table |
| Feedback | `src/lib/feedback.ts` |
| Privacy and deletion pages | `docs/privacy.html`, `docs/delete-account.html`, `store/privacy-policy.html` |
| Data safety notes | `store/data-safety.md` |
