# Launch checklist

Everything in the code is done. These steps need your own accounts, so they are yours.
Work top to bottom; each one says how long it takes.

## 1. GitHub Pages (2 min)

Puts the privacy policy and certificate verification online.

1. Open https://github.com/nitishkchauhan/CodeYatra/settings/pages
2. **Source**: Deploy from a branch. **Branch**: `main`, folder `/docs`. Save.
3. After a minute, check https://nitishkchauhan.github.io/CodeYatra/privacy.html opens.

## 2. Reliable sign-in emails with Brevo (10 min)

Gmail SMTP works for testing, but Google may flag it. Brevo is free for 300 emails a day and is built for app emails.

1. Sign up at https://www.brevo.com (free plan).
2. **Senders, domains & dedicated IPs → Senders → Add a sender**: name `CodeYatra`, your email. Confirm the email Brevo sends you.
3. **SMTP & API → SMTP tab → Generate a new SMTP key**. Copy it (it is shown once). Do not share it with anyone.
4. In Supabase: **Authentication → Emails → SMTP Settings**, replace the Gmail values with:

   | Field | Value |
   | --- | --- |
   | Host | `smtp-relay.brevo.com` |
   | Port | `587` |
   | Username | the "Login" shown on Brevo's SMTP page |
   | Password | the SMTP key from step 3 |
   | Sender email | the sender you verified in step 2 |
   | Sender name | `CodeYatra` |

5. Save, then sign in from the app once to test. Delete the Gmail app password at https://myaccount.google.com/apppasswords.

## 3. Automatic builds from GitHub (3 min)

Pushes to `main` should start the production build by themselves; today they don't.

1. Open https://expo.dev/accounts/nitish02s-team/projects/code-yatra, then **Project settings → GitHub**.
2. Click **Connect GitHub**, install the **Expo** GitHub app, and give it access to `nitishkchauhan/CodeYatra`.
3. Select that repository. Leave **Base directory** empty (the app is at the repo root).

## 4. Google Play (start today: the testing period takes 14 days)

1. Create a developer account at https://play.google.com/console/signup (US$25 once) and verify your identity.
2. **Create app**: `CodeYatra – Learn to Code`, App, Free, English (India).
3. **Store listing**: copy from [store/listing-en.md](store/listing-en.md). Upload:
   - App icon: `assets/images/icon.png` (resize to 512×512)
   - Feature graphic: [store/feature-graphic.png](store/feature-graphic.png)
   - Phone screenshots: everything in [store/screenshots](store/screenshots)
4. **App content**: answer from [store/data-safety.md](store/data-safety.md). Privacy policy URL: `https://nitishkchauhan.github.io/CodeYatra/privacy.html`
5. **Testing → Closed testing → Create track**. Add at least 12 testers' Gmail addresses (friends, classmates). Upload the latest production `.aab` from https://expo.dev/accounts/nitish02s-team/projects/code-yatra/builds
6. Testers must opt in and keep the app installed for **14 days**. Then apply for production access.

## 5. Support email

Support email: `codeyatra.support@gmail.com` (used in the privacy policy, deletion page and store listing).

## 6. Last: turn on Ask Yatri

1. Create an API key at https://console.anthropic.com (usage is billed by Anthropic).
2. Run, from the `codeyatra-app` folder (paste your key yourself, never share it):

```bash
npx supabase login
npx supabase link --project-ref bcmszhriyklsdkyfuvmw
npx supabase secrets set ANTHROPIC_API_KEY=your-key
npx supabase functions deploy ask-yatri
```
