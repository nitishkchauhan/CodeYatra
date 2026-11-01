// Git · Modules 7–11 (Intermediate): remotes and GitHub, pull requests and forks, .gitignore and secrets, undoing
// things, and stash with team workflow. The pretend GitHub lives inside the terminal.
import type { Lesson } from '../../types';
import { arrange, bugTask, CAFE_REPO, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, press, recap, reveal, swipe, tapbug, tapPage, term, toggle, truth, xray } from './kit';

const URL = 'git@github.com:rosascafe/site.git';
const CLONE_URL = 'https://github.com/rosascafe/site.git';
const HUB = { [CLONE_URL]: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea\nCheese Toast\n' }], ['Add opening hours', { 'hours.txt': 'Open 8 to 9\n' }]] as [string, Record<string, string>][] } };
const PUSHED = { repo: CAFE_REPO, origin: { url: URL } };
const BEHIND = { repo: CAFE_REPO, origin: { url: URL, ahead: [['Add opening hours', { 'hours.txt': 'Open 8 to 9\n' }]] as [string, Record<string, string>][] } };
const GITIGNORE = ['# Packages and builds', 'node_modules/', 'dist/', '', '# Secrets', '.env', '*.key', '', '# Clutter', '.DS_Store', '*.log'];
const HISTORY = { repo: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea\n' }], ['Add cheese toast', { 'menu.txt': 'Lemon Tea\nCheese Toast\n' }], ['Add a broken price list', { 'prices.txt': 'Tea ???\n' }]] as [string, Record<string, string>][] } };

export const GIT_M7: Lesson[] = [
  lesson('git-remote', 'Remotes and GitHub', 8, [
    chat(['A remote is a copy of your repository somewhere else, usually on GitHub. It is called origin by default.', 'push sends your commits up; pull brings other people’s commits down.']),
    tapPage('Put the project on GitHub', 'Connect the repository to GitHub and push main.', term({ repo: CAFE_REPO, commands: [`git remote add origin ${URL}`, 'git remote -v', 'git push -u origin main', 'git status'] }), "Your branch is up to date with 'origin/main'.", [press(0), press(1), press(2), press(3)], '-u links main to origin/main, so later just git push and git pull.'),
    tapPage('Copy a project', 'Clone the café’s site from GitHub and look inside.', term({ hub: HUB, folder: 'projects', commands: [`git clone ${CLONE_URL}`, 'ls', 'git log --oneline'] }), 'Add opening hours', [press(0), press(1), press(2)], 'clone copies every file and the whole history, and sets up origin for you.'),
    reveal('Remote commands', [
      ['git clone URL', 'Copy a repository, with its history.'],
      ['git remote add origin URL', 'Connect an existing repository.'],
      ['git push -u origin main', 'Send main up the first time, and link it.'],
      ['git pull', 'Fetch and merge new commits from origin.'],
      ['git fetch', 'Download new commits without merging yet.'],
    ], { mono: true }),
    check('What is origin?', ['The usual name for the main remote', 'The first commit', 'The main branch', 'A GitHub user'], 'Set by clone, or remote add.', 'Where do push and pull go?'),
    recap([
      ['☁', 'A remote is a copy elsewhere, usually origin on GitHub'],
      ['⬆', 'git push sends commits; -u the first time'],
      ['⬇', 'git clone copies; git pull brings changes'],
    ]),
  ]),

  lesson('git-b-7-2', 'Push, pull and staying in sync', 8, [
    tapPage('Rejected!', 'A teammate pushed while you worked. Commit, push, pull, then push again.', term({ ...BEHIND, commands: ['echo "Mint Tea" >> menu.txt', 'git commit -am "Add mint tea"', 'git push', 'git pull', 'git push'] }), 'main -> main', [press(0), press(1), press(2), press(3), press(4)], 'Git rejected the first push because GitHub had a commit you didn’t. Pull merged it, then the push worked.'),
    explore('Why the push was rejected', ['GitHub:  A ── B (teammate)', 'You:     A ── C (mint tea)', 'After pull:  A ── B ── M', '              └─ C ──┘'], [
      [1, 'Your teammate pushed commit B.'],
      [2, 'You made commit C on top of A.'],
      [3, 'git pull merges B in, making merge commit M.'],
    ]),
    reveal('Habits that avoid trouble', [
      ['Pull first', 'git pull before you start work each day.'],
      ['Push often', 'Small pushes mean small merges.'],
      ['Never force-push shared branches', 'git push --force overwrites others’ work.'],
      ['fetch to look first', 'git fetch, then git log origin/main, then decide.'],
    ]),
    tapbug('A teammate’s commits disappear from GitHub', ['git push --force'], [[1, 'git push --force', 'git pull && git push']], 'Force-pushing overwrites the remote. Pull and merge instead.'),
    check('What does git pull do?', ['git fetch, then merges origin’s branch into yours', 'Uploads your commits', 'Deletes local changes', 'Clones the repository again'], 'Fetch plus merge.', 'Two steps in one.'),
    recap([
      ['⛔', 'A push is rejected if the remote has commits you don’t'],
      ['🔄', 'git pull, then push again'],
      ['🚫', 'Don’t force-push shared branches'],
    ]),
  ]),

  challenge('git-b-7-ch', 'Module 7 Challenge', { icon: '☁', name: 'Remote Runner' }, ['Connect a repository to GitHub', 'Clone, push and pull', 'Fix a rejected push'], [
    mcq(1, 'Which copies a GitHub repository to your computer?', ['git clone URL', 'git pull URL', 'git copy URL', 'git fetch URL'], 'With all the history.', { mono: true }),
    mcq(2, 'Which links a repository to GitHub?', ['git remote add origin URL', 'git origin URL', 'git link URL', 'git push URL'], 'Then push.', { mono: true }),
    mcq(3, 'What does -u do in git push -u origin main?', ['Links main to origin/main for later pushes and pulls', 'Uploads faster', 'Undoes the push', 'Pushes every branch'], 'Upstream.', { mono: true }),
    mcq(4, 'Why is a push rejected?', ['The remote has commits you don’t have', 'Your message is too long', 'You are on main', 'The file is too big'], 'Pull first.'),
    mcq(5, 'What is the difference between fetch and pull?', ['fetch downloads; pull downloads and merges', 'They are the same', 'pull only reads', 'fetch uploads'], 'Look before merging.'),
    swipe([
      ['clone sets up origin for you', true, 'Pointing where you cloned from.'],
      ['git push --force is safe on shared branches', false, 'It overwrites others’ work.'],
      ['Pulling often keeps merges small', true, 'Fewer surprises.'],
      ['origin is a special Git keyword', false, 'Just the usual name.'],
    ]),
    pairs([['clone', 'Copy'], ['push', 'Send up'], ['pull', 'Bring down and merge'], ['fetch', 'Bring down only']], 'Remotes.'),
    pickCode('A push was rejected. What next?', ['git pull, then git push', 'git push --force', 'Delete the repository', 'git commit --amend'], 'Merge their work in first.'),
    bugTask(['git push origin mian', 'git remote add orign git@github.com:rosascafe/site.git'], [[1, 'mian', 'main'], [2, 'orign', 'origin']], 'Check branch and remote names.'),
    xray('<div class="c">$ git push</div><div class="e"> ! [rejected]        main -> main (fetch first)</div><div class="c">$ git pull</div><div class="m">Merge made by the \'ort\' strategy.</div>', [
      ['.e', 'Rejected', 'git push', ['git push', 'git pull', 'git clone']],
      ['.m', 'The teammate’s work merged in', 'git pull', ['git push', 'git pull', 'git clone']],
    ]),
    arrange(['echo "Mint Tea" >> menu.txt', 'git commit -am "Add mint tea"', 'git push'], 'change, commit, push', PUSHED),
  ]),

  lesson('git-pr', 'Pull requests', 8, [
    chat(['On a team, you don’t merge into main yourself. You push your branch and open a pull request (PR) on GitHub: “please review and merge my branch”.', 'Teammates read the changes, comment, and approve. Automatic checks run. Then it is merged.']),
    tapPage('Push a branch for review', 'Make a branch, commit, and push it to GitHub.', term({ ...PUSHED, commands: ['git switch -c feature/hours', 'echo "Open 8 to 9" > hours.txt', 'git add hours.txt', 'git commit -m "Add opening hours"', 'git push -u origin feature/hours'] }), '[new branch]      feature/hours -> feature/hours', [press(0), press(1), press(2), press(3), press(4)], 'On GitHub you would now see “Compare & pull request”.'),
    reveal('A pull request, step by step', [
      ['1 · Branch', 'One branch per task.'],
      ['2 · Push', 'git push -u origin feature/hours.'],
      ['3 · Open the PR', 'On GitHub: a title, what changed and why, how to test it.'],
      ['4 · Review', 'Teammates comment; you push more commits to the same branch.'],
      ['5 · Merge', 'When approved and checks pass. Then delete the branch.'],
    ]),
    reveal('Forks: contributing to someone else’s project', [
      ['Fork', 'Your own copy of their repository on GitHub.'],
      ['Clone your fork', 'Work on a branch there, and push to your fork.'],
      ['Open a PR', 'From your fork’s branch to their main.'],
      ['Stay updated', 'Add their repository as a second remote, often called upstream.'],
    ]),
    matchUp('Who does what?', [['Opens the pull request', 'The author'], ['Leaves comments and approves', 'The reviewer'], ['Runs tests on every push', 'Automatic checks (CI)'], ['Your own copy of someone’s repo', 'A fork']], 'Teamwork on GitHub.'),
    check('Why use pull requests instead of pushing to main?', ['So changes are reviewed and tested before they reach main', 'Git can’t push to main', 'They are faster', 'To hide changes'], 'Two pairs of eyes.', 'What happens before merging?'),
    recap([
      ['🔍', 'A PR asks for review before merging'],
      ['🌿', 'Branch, push, open the PR, review, merge'],
      ['🍴', 'Fork to contribute to others’ projects'],
    ]),
  ]),

  lesson('git-b-8-2', 'Good pull requests and reviews', 7, [
    chat(['A pull request is a conversation. A clear description helps reviewers, and kind, specific reviews help authors.', 'Most teams also run automatic checks, like tests and linting, on every pull request.']),
    toggle('PR descriptions', [
      ['Unclear', ['Title: changes', '', 'fixed stuff'], 'Reviewers can’t tell what to check.'],
      ['Clear', ['Title: Add opening hours to the home page', '', 'What: a footer line with the hours.', 'Why: customers kept phoning to ask.', 'Test: open / and check the footer.'], 'What, why and how to test.'],
    ]),
    reveal('Reviewing kindly and well', [
      ['Small PRs', 'Under about 300 lines are reviewed faster and better.'],
      ['Ask, don’t order', '“Could we name this hours?” rather than “Rename it.”'],
      ['Explain why', 'Point to the bug or the rule.'],
      ['Approve when it’s good enough', 'Not perfect: done.'],
    ]),
    truth([
      ['Big PRs get better reviews', false, 'Small ones do.'],
      ['You can push more commits to a PR after review', true, 'Same branch.'],
      ['A PR description should say how to test it', true, 'Helps the reviewer.'],
    ]),
    check('A reviewer asks for a change. What do you do?', ['Commit the change on the same branch and push', 'Open a new pull request', 'Merge it anyway', 'Delete the branch'], 'The PR updates itself.', 'Which branch is the PR for?'),
    recap([
      ['📝', 'Title, what, why and how to test'],
      ['📏', 'Keep pull requests small'],
      ['🤝', 'Review kindly, explain why'],
    ]),
  ]),

  challenge('git-b-8-ch', 'Module 8 Challenge', { icon: '🔍', name: 'Team Player' }, ['Open pull requests from branches', 'Review and improve changes', 'Contribute through forks'], [
    mcq(1, 'What is a pull request?', ['A request to review and merge your branch', 'A git pull', 'A bug report', 'A deleted branch'], 'On GitHub.'),
    mcq(2, 'Where do you push work for a pull request?', ['Its own branch', 'Straight to main', 'A tag', 'A fork of main only'], 'One branch per task.'),
    mcq(3, 'What is a fork?', ['Your own copy of someone else’s repository on GitHub', 'A branch', 'A merge conflict', 'A commit'], 'Then a PR back.'),
    mcq(4, 'What is “upstream” usually?', ['The original repository you forked', 'Your fork', 'The main branch', 'A tag'], 'A second remote.'),
    mcq(5, 'What makes a PR easy to review?', ['Small, with a clear description', 'Very large', 'No description', 'Many unrelated changes'], 'What, why, how to test.'),
    swipe([
      ['Automatic checks can run on every PR', true, 'Tests, lint.'],
      ['Reviews are only for beginners', false, 'Everyone gets reviewed.'],
      ['You can update a PR by pushing to its branch', true, 'It updates itself.'],
      ['Merged branches should be kept forever', false, 'Delete them.'],
    ]),
    pairs([['PR', 'Review request'], ['Fork', 'Your copy'], ['upstream', 'The original'], ['CI', 'Automatic checks']], 'GitHub teamwork.'),
    pickCode('Which pushes a branch for a PR the first time?', ['git push -u origin feature/hours', 'git push origin main --force', 'git merge feature/hours', 'git pull feature/hours'], 'Push the branch, set upstream.'),
    bugTask(['git switch main', 'git commit -am "Add hours"', 'git push'], [[1, 'git switch main', 'git switch -c feature/hours'], [3, 'git push', 'git push -u origin feature/hours']], 'Work on a branch and push it for review.'),
    xray('<div class="c">$ git push -u origin feature/hours</div><div class="n"> * [new branch]      feature/hours -> feature/hours</div>', [
      ['.n', 'A new branch on GitHub', 'git push -u origin feature/hours', ['git push -u origin feature/hours', 'git merge', 'git clone']],
    ]),
    arrange(['git switch -c feature/menu', 'echo "Mint Tea" >> menu.txt', 'git commit -am "Add mint tea"', 'git push -u origin feature/menu'], 'branch, change, commit, push the branch', PUSHED),
  ]),

  lesson('git-ignore', '.gitignore', 7, [
    chat(['Some files must never be committed: passwords, keys, downloaded packages, build output.', 'List them in a .gitignore file, and Git stops showing and adding them.']),
    tapPage('Ignore the secrets file', 'See .env in the status, add a .gitignore, and check again.', term({ repo: CAFE_REPO, files: { 'menu.txt': 'Lemon Tea\nCheese Toast\n', '.env': 'PAYMENT_KEY=test_key\n' }, commands: ['git status -s', 'echo ".env" > .gitignore', 'git status -s'] }), '?? .gitignore', [press(0), press(1), press(2)], '.env vanished from the list. Commit .gitignore itself so everyone gets it.'),
    explore('A typical .gitignore', GITIGNORE, [
      [1, '# starts a comment.'],
      [2, 'A trailing / ignores a whole folder.'],
      [6, 'Never commit secrets.'],
      [7, '* matches anything: every .key file.'],
      [11, 'Logs and system clutter.'],
    ]),
    reveal('Already committed it?', [
      ['.gitignore isn’t enough', 'It only affects files Git isn’t tracking yet.'],
      ['Stop tracking', 'git rm --cached .env keeps the file but untracks it.'],
      ['A secret was pushed', 'Treat it as leaked: change (rotate) the key at once.'],
    ]),
    tapbug('.env is still in every commit', ['echo ".env" >> .gitignore', 'git commit -am "Ignore .env"'], [[1, 'echo ".env" >> .gitignore', 'echo ".env" >> .gitignore && git rm --cached .env']], 'A tracked file stays tracked. Untrack it with git rm --cached.'),
    check('Which line ignores the node_modules folder?', ['node_modules/', '#node_modules', '!node_modules', 'node_modules.txt'], 'A trailing slash means a folder.', 'Which isn’t a comment?', { mono: true }),
    recap([
      ['🙈', '.gitignore lists files Git should ignore'],
      ['🔐', 'Always ignore secrets and packages'],
      ['🧹', 'git rm --cached untracks an already-committed file'],
    ]),
  ]),

  challenge('git-b-9-ch', 'Module 9 Challenge', { icon: '🙈', name: 'Secret Keeper' }, ['Write a .gitignore', 'Keep secrets out of Git', 'Untrack committed files'], [
    mcq(1, 'What does .gitignore do?', ['Lists files Git should not track', 'Deletes files', 'Hides files on GitHub only', 'Encrypts files'], 'For untracked files.'),
    mcq(2, 'Which should always be ignored?', ['.env with passwords', 'README.md', 'package.json', 'index.html'], 'Secrets.', { mono: true }),
    mcq(3, 'What does *.log match?', ['Every file ending in .log', 'A file named *.log', 'Only log.txt', 'Folders named log'], '* is any text.', { mono: true }),
    mcq(4, 'Which untracks a committed file but keeps it on disk?', ['git rm --cached file', 'git rm file', 'git ignore file', 'git reset file'], '--cached.', { mono: true }),
    mcq(5, 'A key was pushed to GitHub. What first?', ['Rotate (change) the key', 'Delete the commit', 'Make the repo private', 'Nothing'], 'Assume it leaked.'),
    swipe([
      ['.gitignore itself should be committed', true, 'Everyone shares it.'],
      ['.gitignore stops tracking already-committed files', false, 'Use git rm --cached.'],
      ['# starts a comment in .gitignore', true, 'Ignored line.'],
      ['node_modules/ should be committed', false, 'npm install rebuilds it.'],
    ]),
    pairs([['node_modules/', 'A folder'], ['*.key', 'A pattern'], ['.env', 'Secrets'], ['# note', 'A comment']], '.gitignore lines.'),
    pickCode('Which ignores every file ending in .log?', ['*.log', 'log', '.log/', '!*.log'], 'A pattern.'),
    bugTask(['echo "node_module" >> .gitignore', 'git add .env'], [[1, 'node_module"', 'node_modules/"'], [2, 'git add .env', 'echo ".env" >> .gitignore']], 'Spell the folder exactly, and never add secrets.'),
    xray('<div class="c">$ git status -s</div><div class="g">?? .gitignore</div>', [
      ['.g', 'The only new file shown', '.gitignore with .env in it', ['.gitignore with .env in it', 'git add .', 'git rm --cached']],
    ]),
    arrange(['echo ".env" > .gitignore', 'git add .gitignore', 'git commit -m "Ignore secrets"'], 'write the rule, stage it, commit it', { repo: CAFE_REPO, files: { 'menu.txt': 'Lemon Tea\nCheese Toast\n', '.env': 'KEY=1\n' } }),
  ]),

  lesson('git-undo', 'Undoing changes', 9, [
    chat(['Git can undo almost anything. Which command depends on how far the change got: edited, staged, committed, or pushed.']),
    reveal('Which undo?', [
      ['Edited, not staged', 'git restore file: back to the last saved version.'],
      ['Staged', 'git restore --staged file: unstage, keep your edits.'],
      ['Committed, not pushed', 'git reset HEAD~1: remove the commit, keep the changes.'],
      ['Pushed', 'git revert id: a new commit that undoes it. Safe for everyone.'],
    ], { mono: true }),
    tapPage('Undo a pushed mistake safely', 'The last commit added a broken price list. Revert it.', term({ ...HISTORY, commands: ['git log --oneline', 'git revert HEAD', 'git log --oneline', 'ls'] }), 'Revert "Add a broken price list"', [press(0), press(1), press(2), press(3)], 'History keeps the mistake and the fix: nothing is rewritten, so it is safe after pushing.'),
    tapPage('Throw away local edits', 'Break the menu, then restore it.', term({ repo: CAFE_REPO, commands: ['echo "oops" > menu.txt', 'git status -s', 'git restore menu.txt', 'cat menu.txt'] }), 'Cheese Toast', [press(0), press(1), press(2), press(3)], 'git restore throws away edits that were never committed. They can’t be got back.'),
    toggle('git reset modes', [
      ['--soft', ['git reset --soft HEAD~1'], 'Removes the commit; its changes stay staged.'],
      ['--mixed (default)', ['git reset HEAD~1'], 'Removes the commit; its changes stay in your files, unstaged.'],
      ['--hard', ['git reset --hard HEAD~1'], 'Removes the commit and its changes. Dangerous.'],
    ]),
    tapbug('A teammate’s history no longer matches GitHub', ['git reset --hard HEAD~1', 'git push --force'], [[1, 'git reset --hard HEAD~1', 'git revert HEAD'], [2, 'git push --force', 'git push']], 'For pushed commits, revert: it adds a fix instead of rewriting history.'),
    check('The bad commit is already on GitHub. Which is safe?', ['git revert', 'git reset --hard', 'git commit --amend', 'Delete the repository'], 'It adds a new commit.', 'Which doesn’t rewrite history?', { mono: true }),
    recap([
      ['↩', 'restore for edits; restore --staged to unstage'],
      ['⏪', 'reset for local commits (--hard throws work away)'],
      ['🔁', 'revert for pushed commits'],
    ]),
  ]),

  lesson('git-b-10-2', 'Finding lost work', 7, [
    chat(['Deleted a branch or reset too far? The commits usually still exist for a while.', 'git reflog lists where HEAD has been, so you can find a commit id and get it back.']),
    tapPage('Find a lost commit', 'Reset too far, see that the log lost two commits, then look in the reflog.', term({ ...HISTORY, commands: ['git reset --hard HEAD~2', 'git log --oneline', 'git reflog'] }), 'HEAD@{0}: Add a broken price list', [press(0), press(1), press(2)], 'reflog still lists the commits reset threw away. git reset --hard with that id brings one back.'),
    reveal('Safety nets', [
      ['git reflog', 'Where HEAD has been, with ids.'],
      ['git branch rescue id', 'Put a branch on a lost commit.'],
      ['Commit often', 'Committed work is much easier to recover than unsaved edits.'],
    ], { mono: true }),
    check('What does git reflog show?', ['Where HEAD has pointed, even after resets', 'Only pushed commits', 'GitHub activity', 'Deleted files'], 'Your local trail.', 'What does it remember?'),
    truth([
      ['Commits removed by reset can often be found again', true, 'With reflog.'],
      ['Uncommitted edits thrown away by restore can be found with reflog', false, 'They were never saved.'],
      ['Committing often makes recovery easier', true, 'More snapshots.'],
    ]),
    recap([
      ['🧭', 'git reflog shows where HEAD has been'],
      ['🛟', 'Lost commits can be brought back by id'],
      ['💾', 'Commit often: uncommitted work has no net'],
    ]),
  ]),

  challenge('git-b-10-ch', 'Module 10 Challenge', { icon: '↩', name: 'Undo Expert' }, ['Pick the right undo', 'Revert pushed commits safely', 'Recover lost work'], [
    mcq(1, 'Which throws away edits to a file?', ['git restore file', 'git revert file', 'git reset --soft', 'git stash list'], 'Back to the last saved version.', { mono: true }),
    mcq(2, 'Which unstages a file, keeping the edits?', ['git restore --staged file', 'git restore file', 'git rm file', 'git reset --hard'], 'Out of the staging area.', { mono: true }),
    mcq(3, 'Which undoes a pushed commit safely?', ['git revert id', 'git reset --hard id', 'git commit --amend', 'git push --force'], 'A new commit.', { mono: true }),
    mcq(4, 'What does git reset --hard do?', ['Moves the branch back and throws away the changes', 'Keeps changes staged', 'Pushes', 'Reverts'], 'Dangerous.', { mono: true }),
    mcq(5, 'Which lists where HEAD has been?', ['git reflog', 'git log --all', 'git status', 'git show'], 'Even after resets.', { mono: true }),
    swipe([
      ['revert rewrites history', false, 'It adds a commit.'],
      ['reset --soft keeps the changes staged', true, 'Ready to recommit.'],
      ['restore can bring back uncommitted edits you threw away', false, 'They are gone.'],
      ['Shared history should not be rewritten', true, 'Revert instead.'],
    ]),
    pairs([['restore', 'Edits'], ['restore --staged', 'Unstage'], ['reset', 'Local commits'], ['revert', 'Pushed commits']], 'Undo commands.'),
    pickCode('You committed too early, not pushed. Keep the changes, remove the commit?', ['git reset HEAD~1', 'git reset --hard HEAD~1', 'git revert HEAD', 'git restore .'], 'Mixed: changes stay in files.'),
    bugTask(['git reset --hard HEAD~1   # already pushed', 'git push --force'], [[1, 'git reset --hard HEAD~1   # already pushed', 'git revert HEAD'], [2, 'git push --force', 'git push']], 'Revert shared commits; don’t force-push.'),
    xray('<div class="c">$ git revert HEAD</div><div class="r">[main 9b1c0de] Revert "Add a broken price list"</div><div class="s"> 1 file changed, 1 deletion(-)</div>', [
      ['.r', 'A new commit that undoes', 'git revert HEAD', ['git revert HEAD', 'git reset --hard', 'git restore']],
    ]),
    arrange(['echo "oops" > menu.txt', 'git restore menu.txt', 'cat menu.txt'], 'break it, restore it, check it', { repo: CAFE_REPO }),
  ]),

  lesson('git-stash', 'Stash', 7, [
    chat(['You’re halfway through something when an urgent fix comes in. Your work isn’t ready to commit.', 'git stash puts your changes aside and gives you a clean folder. git stash pop brings them back.']),
    tapPage('Set work aside', 'Stash the half-done change, check it is clean, then bring it back.', term({ repo: CAFE_REPO, commands: ['echo "Mint Tea (soon)" >> menu.txt', 'git stash', 'git status', 'git stash pop'] }), 'Dropped refs/stash@{0}', [press(0), press(1), press(2), press(3)], 'Between stash and pop, the folder was clean: perfect for switching branches.'),
    explore('Stash commands', ['git stash', 'git stash -m "mint tea idea"', 'git stash list', 'git stash pop', 'git stash apply', 'git stash drop'], [
      [1, 'Put changes aside.'],
      [2, 'With a note.'],
      [3, 'See what is stashed.'],
      [4, 'Bring back the latest, and remove it from the list.'],
      [5, 'Bring it back, but keep it in the list.'],
      [6, 'Throw the latest away.'],
    ]),
    check('What does git stash pop do?', ['Brings back the latest stash and removes it from the list', 'Deletes every stash', 'Commits the stash', 'Pushes the stash'], 'apply keeps it.', 'Back, and gone from the list.'),
    truth([
      ['Untracked new files are stashed by default', false, 'Add -u to include them.'],
      ['Stash is local: it isn’t pushed', true, 'Only on your computer.'],
      ['You can stash several times', true, 'stash list shows them.'],
    ]),
    recap([
      ['📦', 'git stash sets changes aside'],
      ['📤', 'git stash pop brings them back'],
      ['📋', 'git stash list shows what is waiting'],
    ]),
  ]),

  lesson('git-b-11-2', 'Team workflows', 8, [
    reveal('Common ways teams work', [
      ['GitHub flow', 'main always works. Each task: a branch, a PR, review, merge, deploy. Most teams.'],
      ['Trunk-based', 'Very small branches merged into main many times a day.'],
      ['Git flow', 'Separate develop and release branches. Older, for scheduled releases.'],
    ]),
    toggle('Merge or rebase?', [
      ['Merge', ['git switch feature/hours', 'git merge main'], 'Joins histories with a merge commit. Safe; history shows exactly what happened.'],
      ['Rebase', ['git switch feature/hours', 'git rebase main'], 'Replays your commits on top of main, for a straight line. Only for commits you haven’t shared.'],
    ]),
    reveal('Good habits', [
      ['Pull before you start', 'Start from the latest main.'],
      ['Small commits and PRs', 'Easier to review and undo.'],
      ['Clear names and messages', 'feature/…, fix/…; “Add…”, “Fix…”.'],
      ['Never commit secrets', '.gitignore and environment variables.'],
    ]),
    matchUp('Which workflow?', [['Branch, PR, review, merge for every task', 'GitHub flow'], ['Tiny changes into main many times a day', 'Trunk-based'], ['develop and release branches', 'Git flow']], 'Most teams use GitHub flow.'),
    check('When is rebasing a bad idea?', ['On commits others already have', 'On your own unpushed commits', 'On a new branch', 'Never'], 'It rewrites those commits.', 'Who else has the commits?'),
    recap([
      ['🌊', 'GitHub flow: branch, PR, review, merge'],
      ['🔀', 'Merge is always safe; rebase only unshared work'],
      ['✅', 'Pull first, small commits, clear messages'],
    ]),
  ]),

  challenge('git-b-11-ch', 'Module 11 Challenge', { icon: '📦', name: 'Workflow Pro' }, ['Set work aside with stash', 'Choose merge or rebase', 'Follow a team workflow'], [
    mcq(1, 'Which puts uncommitted changes aside?', ['git stash', 'git save', 'git hide', 'git commit --later'], 'Then pop.', { mono: true }),
    mcq(2, 'Which shows stashed changes?', ['git stash list', 'git stash show-all', 'git list stash', 'git log stash'], 'stash@{0}…', { mono: true }),
    mcq(3, 'What does git rebase main do on a feature branch?', ['Replays the branch’s commits on top of main', 'Merges main with a merge commit', 'Deletes main', 'Pushes main'], 'A straight line.'),
    mcq(4, 'In GitHub flow, what is always true of main?', ['It always works and can be deployed', 'Nobody uses it', 'It holds experiments', 'It is renamed each week'], 'Work happens on branches.'),
    mcq(5, 'Which is the golden rule of rebasing?', ['Don’t rebase commits others already have', 'Always rebase main', 'Rebase only on Fridays', 'Rebase replaces pull requests'], 'It rewrites them.'),
    swipe([
      ['git stash pop removes the stash from the list', true, 'apply keeps it.'],
      ['Merging rewrites history', false, 'It adds a merge commit.'],
      ['Small pull requests are easier to review', true, 'And to undo.'],
      ['Stashes are pushed to GitHub', false, 'Local only.'],
    ]),
    pairs([['stash', 'Set aside'], ['pop', 'Bring back'], ['merge', 'Join histories'], ['rebase', 'Replay on top']], 'Workflow tools.'),
    pickCode('An urgent fix arrives mid-task. Which first?', ['git stash', 'git reset --hard', 'git commit -am "wip" --force', 'git push --force'], 'A clean folder, nothing lost.'),
    bugTask(['git rebase main   # main is shared and already pushed by everyone', 'git push --force'], [[1, 'git rebase main', 'git merge main'], [2, 'git push --force', 'git push']], 'Merge shared work; don’t force-push.'),
    xray('<div class="c">$ git stash</div><div class="s">Saved working directory and index state WIP on main: 1a2b3c4 Add the menu</div><div class="c">$ git stash pop</div><div class="d">Dropped refs/stash@{0}</div>', [
      ['.s', 'Changes set aside', 'git stash', ['git stash', 'git stash pop', 'git stash list']],
      ['.d', 'Brought back and removed', 'git stash pop', ['git stash', 'git stash pop', 'git stash list']],
    ]),
    arrange(['echo "Mint Tea (soon)" >> menu.txt', 'git stash', 'git stash list', 'git stash pop'], 'change, stash, list, bring it back', { repo: CAFE_REPO }),
  ]),
];
