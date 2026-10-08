# Play Store launch kit

Everything needed to publish CodeYatra on Google Play. Work through it top to bottom.

## 1. One-time accounts

| What | Where | Cost |
| --- | --- | --- |
| Google Play Console developer account | https://play.google.com/console/signup | US$25 once |
| Identity verification (personal or organisation) | Play Console → Account details | Free, takes 1–3 days |

New personal accounts must run a **closed test with at least 12 testers for 14 days** before production access. Start this early.

## 2. Create the app in Play Console

1. **Create app** → name `CodeYatra – Learn to Code`, default language English (India), App, Free. The app is English-only.
2. Package name is fixed by the first upload: `com.codeyatra.app`.
3. Fill **Store listing** from [listing-en.md](listing-en.md).
4. **Privacy policy URL**: turn on GitHub Pages (repo Settings → Pages → Branch `main`, folder `/docs`). The policy is then live at `https://nitishkchauhan.github.io/CodeYatra/privacy.html`, and certificate verification at `/verify.html`.
5. **App content** answers: see [data-safety.md](data-safety.md).

## 3. Graphics

| Asset | Size | Source |
| --- | --- | --- |
| App icon | 512 × 512 PNG | `assets/images/icon.png` (export at 512) |
| Feature graphic | 1024 × 500 PNG/JPG | Ready: [feature-graphic.png](feature-graphic.png) (regenerate with `node scripts/feature-graphic.js`) |
| Phone screenshots | 2–8, 1080 × 1920 (9:16) | Ready: [screenshots/](screenshots) (regenerate with `python scripts/frame-screenshots.py <raw folder>`) |

Shot list, in this order:

1. Learn: language tracks row and the current module (HTML or Python)
2. A lesson's reading card
3. Fill-the-gap practice with the live preview showing
4. Code editor: Python tests passing
5. Blocks puzzle with Yatri on the board
6. Profile with photo, streak and language progress
7. Certificate
8. Weekly league

Capture them on a real phone with the preview APK (power + volume-down), or in the Android emulator at 1080 × 1920.

## 4. Build and upload

The production workflow already builds a signed `.aab` on every push to `main`:

```bash
npx eas-cli@latest workflow:run .eas/workflows/create-production-builds.yml
```

The first upload must be manual: Play Console → Testing → Internal testing → Create release → upload the `.aab` from expo.dev.

After that, uploads can be automated:

1. Play Console → Setup → API access → create a **service account** with the Release manager role, download its JSON key.
2. Save it as `google-play-service-account.json` in this project. It is git-ignored; never commit it.
3. Run `npx eas-cli@latest submit -p android --latest`. This uploads to the **internal** track as a draft (see `eas.json`).

Or upload the key to EAS instead (expo.dev → project → Credentials → Android → Google Service Account) and add a `submit` job to the workflow.

## 5. Release checklist

- [ ] `version` in `app.json` bumped (currently 1.1.0); build numbers auto-increment
- [ ] `npx tsc --noEmit`, `npx expo lint`, `npx jest` all green
- [ ] Tested the preview APK on a low-end phone (2 GB RAM)
- [ ] Release notes written ([release-notes.md](release-notes.md))
- [ ] Content rating questionnaire done (Everyone / PEGI 3)
- [ ] Target audience: 13+ (choosing under 13 brings Families policy requirements)
- [ ] Closed test running with 12+ testers for 14 days (new personal accounts)
