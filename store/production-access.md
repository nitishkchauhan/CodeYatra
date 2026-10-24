# Production access application (draft, 24 Oct 2026)

Play Console → Dashboard → **Apply for production**. Google asks these questions after the 14-day closed test.
Everything below is true to the CHANGELOG. Parts in **[brackets]** only the owner knows: fill them in or delete them before sending. Don't overstate: Google reviews the answers.

## Part 1 · About your closed test

**1. How easy was it to recruit testers for your app?**
[Choose: Very easy / Easy / Neither easy nor difficult / Difficult / Very difficult]

**2. Describe the engagement you received from testers during your closed test.**

> The closed test ran from 11 October 2026 with [12+] opted-in testers, mostly [college students and school students aged 13+ / friends and classmates — describe who they were]. Testers installed four builds over the test (1.2.0 → 1.4.0). They worked through lessons in several tracks (Python, HTML, Logic, DSA), tried the code editor, block puzzles, practice rounds, the league and certificates, and used the new career paths after build 6. [Add anything you saw: e.g. how many used it most days, longest streaks, tracks finished.]

**3. Provide a summary of the feedback that you received from testers. Include how you collected the feedback.**

> Feedback came through the in-app feedback link (email to codeyatra.support@gmail.com), [WhatsApp messages / talking to testers directly], and our own testing on testers' phones. Main points: [1. the on-screen keyboard left a black area over the code editor; 2. long code lines were hard to read; 3. testers wanted a clearer plan of what to learn next; 4. lessons felt too short / wanted more practice — keep only the ones testers really said]. [We also checked the Play pre-launch report and Android vitals for crashes — keep only if you did.]

## Part 2 · About your app

**4. Who is the intended audience of your app?**

> Indian students aged 13 and over who want to learn to code: school students (including CBSE Class 11–12 Computer Science), college students (B.Tech, BCA, diploma) preparing for placements, and beginners switching to tech. The app is in English and is not designed for children under 13.

**5. Describe how your app provides value to users.**

> CodeYatra teaches coding in short daily lessons on a phone, with no laptop needed. It has 16 tracks (Logic, CBSE Computer Science, HTML, CSS, JavaScript, Python, C, Java, React, Node.js, Next.js, DSA, DSA Advanced, SQL, Git and Placement Prep), 193 lessons and a project in every track. Each lesson starts from a real situation, lets learners run code, shows a common mistake with the real error message, and ends with a coding exercise that is checked automatically. Career paths turn a goal (such as Data Analyst) into a step-by-step roadmap, and spaced review, practice rounds, mock tests and verified certificates help learners keep what they learn. The core lessons are free; rewarded ads are optional, and no ads appear inside lessons.

**6. How many installs do you expect your app to have in your first year?**
[Choose a range. Be realistic for a new app; there is no benefit in guessing high.]

## Part 3 · Production readiness

**7. What changes did you make to your app based on what you learned during your closed test?**

> Over the test we shipped four builds. Changes: every lesson was rebuilt into a clearer format (a real-life hook, three short cards, try-it code, a common mistake with the real error, quick checks and a coding exercise), and every track now ends in a project; career paths with an interactive roadmap that shows what to learn next, plus checkpoints and mastery levels; spaced review and a Revise screen for mistakes; a fix for the keyboard covering the code editor and for long code lines wrapping; a lighter, easier-to-read design with a new logo; onboarding that sets a goal, a daily target and a reminder; and report/block tools and a word filter on the league. [Edit to match what testers actually asked for.]

**8. How did you decide that your app is ready for production?**

> Testers could finish lessons, practice rounds and certificates without blocking problems, and we fixed the issues they raised. Every lesson's code, outputs, error messages and solutions are checked by an automated test suite (2,704 tests) that really runs the Python, JavaScript, SQL, C, Java and Git examples, so what we teach is correct. [We reviewed the Play pre-launch report and Android vitals: no crashes / list what you saw.] We completed the Data safety form, content rating, privacy policy and an account deletion page, and kept ads limited to optional rewarded ads with no personalised ads for under-18s.
