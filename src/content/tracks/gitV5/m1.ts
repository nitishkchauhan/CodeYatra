// Git · Modules 1–6 (Basic): what Git is, starting a repository, staging and committing, history, branches, and
// merging. Each module’s first lesson keeps its old id.
import type { Lesson } from '../../types';
import { arrange, bugTask, CAFE_REPO, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, press, recap, reveal, swipe, tapbug, tapPage, term, truth, xray } from './kit';

const TWO_BRANCHES = { repo: CAFE_REPO, before: ['git switch -c offers', 'echo "Tea and toast: 100" > offers.txt', 'git add offers.txt', 'git commit -m "Add the offers page"', 'git switch main'] };

export const GIT_M1: Lesson[] = [
  lesson('git-why', 'What is Git?', 6, [
    chat(['You change a file, it breaks, and you want yesterday’s version back. Or two people edit the same project at once. Git solves both.', 'Git is a version control system: it saves snapshots of your project, called commits, so you can see every change, go back, and work together safely.']),
    reveal('Why every developer uses Git', [
      ['History', 'Every saved version, with who changed what, when and why.', '🕰'],
      ['Undo', 'Go back to any earlier snapshot.', '↩'],
      ['Branches', 'Try ideas side by side without breaking the main version.', '🌿'],
      ['Teamwork', 'Many people work on one project and combine their changes.', '🤝'],
    ]),
    reveal('Git or GitHub?', [
      ['Git', 'The tool on your computer that keeps the history.'],
      ['GitHub', 'A website that hosts Git repositories online, for sharing and teamwork. GitLab and Bitbucket are others.'],
      ['Repository', 'A project folder that Git is tracking (a “repo”).'],
    ]),
    tapPage('Meet Git', 'Tap the buttons to ask Git its version, then tell it who you are.', term({ commands: ['git --version', 'git config --global user.name "Rosa Cafe"', 'git config user.name'] }), 'Rosa Cafe', [press(0), press(1), press(2)], 'Git stamps every commit with your name and email, so set them once.'),
    check('What is a commit?', ['A saved snapshot of the project', 'A website', 'A file that holds passwords', 'A kind of branch'], 'History is a chain of commits.', 'What does Git save?'),
    truth([
      ['Git and GitHub are the same thing', false, 'Git is the tool; GitHub hosts repositories.'],
      ['Git works without the internet', true, 'History lives on your computer.'],
      ['Git can track any kind of project with text files', true, 'Code, notes, websites…'],
    ]),
    recap([
      ['🕰', 'Git saves snapshots called commits'],
      ['🌐', 'GitHub hosts Git repositories online'],
      ['🙋', 'git config user.name and user.email, once'],
    ]),
  ]),

  lesson('git-b-1-2', 'Installing and setting up Git', 6, [
    reveal('Getting Git', [
      ['Windows', 'Download Git for Windows from git-scm.com. It includes Git Bash, a terminal.'],
      ['macOS', 'Type git in Terminal; it offers to install the developer tools.'],
      ['Linux', 'sudo apt install git (Ubuntu) or your system’s package manager.'],
      ['Check', 'git --version prints the version.'],
    ]),
    explore('One-time settings', ['git config --global user.name "Rosa Cafe"', 'git config --global user.email "rosa@rosascafe.example"', 'git config --global init.defaultBranch main', 'git config --list'], [
      [1, 'Your name, on every commit.'],
      [2, 'Your email; use the same one as on GitHub.'],
      [3, 'New repositories start on a branch called main.'],
      [4, 'Show every setting.'],
    ]),
    tapPage('Check the settings', 'List what Git knows about you.', term({ commands: ['git config --list'] }), 'user.email=rosa@rosascafe.example', [press(0)], '--global settings apply to every repository on this computer.'),
    truth([
      ['Settings without --global apply to this repository only', true, 'Handy for a work email on one project.'],
      ['You must set your name again for every commit', false, 'Once is enough.'],
      ['Git for Windows includes a terminal called Git Bash', true, 'Use it for these commands.'],
    ]),
    check('What does --global do in git config?', ['Applies the setting to every repository on this computer', 'Shares it on GitHub', 'Makes it secret', 'Applies to one file'], 'Without it: only this repository.', 'How far does it reach?', { mono: false }),
    recap([
      ['⬇', 'Install from git-scm.com (Windows) or the system tools'],
      ['🙋', 'Set user.name and user.email once, with --global'],
      ['🌿', 'init.defaultBranch main'],
    ]),
  ]),

  challenge('git-b-1-ch', 'Module 1 Challenge', { icon: '🕰', name: 'Git Starter' }, ['Explain what Git does', 'Tell Git from GitHub', 'Set up Git for the first time'], [
    mcq(1, 'What kind of tool is Git?', ['A version control system', 'A web browser', 'A database', 'A code editor'], 'It tracks versions.'),
    mcq(2, 'What is GitHub?', ['A website that hosts Git repositories', 'Another name for Git', 'A programming language', 'A Git command'], 'Online, for sharing.'),
    mcq(3, 'What is a repository?', ['A project folder Git is tracking', 'A single commit', 'A GitHub account', 'A branch name'], 'A repo.'),
    mcq(4, 'Which command sets your name for commits?', ['git config --global user.name "Rosa Cafe"', 'git name "Rosa Cafe"', 'git user Rosa', 'git set name'], 'Once per computer.', { mono: true }),
    mcq(5, 'Which shows Git’s version?', ['git --version', 'git version --show', 'git -v show', 'git info'], 'A quick check it is installed.', { mono: true }),
    swipe([
      ['Git keeps history on your own computer', true, 'No internet needed.'],
      ['Each commit records who made it', true, 'From user.name and user.email.'],
      ['You must use GitHub to use Git', false, 'Git works alone.'],
      ['GitLab is an alternative to GitHub', true, 'So is Bitbucket.'],
    ]),
    pairs([['Git', 'Tracks versions'], ['GitHub', 'Hosts repos'], ['Commit', 'A snapshot'], ['Repository', 'A tracked folder']], 'Git words.'),
    pickCode('Which sets the email on every repository?', ['git config --global user.email "rosa@rosascafe.example"', 'git config user.email', 'git email rosa@rosascafe.example', 'git config --local email'], '--global, then the value.'),
    bugTask(['git config --global user.nmae "Rosa Cafe"', 'git --verison'], [[1, 'user.nmae', 'user.name'], [2, '--verison', '--version']], 'Check the spelling: Git takes you literally.'),
    xray('<div class="c">$ git --version</div><div class="v">git version 2.47.0</div><div class="c">$ git config user.name</div><div class="n">Rosa Cafe</div>', [
      ['.v', 'The version', 'git --version', ['git --version', 'git config user.name', 'git config --list']],
      ['.n', 'Your name', 'git config user.name', ['git --version', 'git config user.name', 'git config --list']],
    ]),
    arrange(['git config --global user.name "Sam Lee"', 'git config --global user.email "sam@example.com"', 'git config user.name'], 'set the name, set the email, then check'),
  ]),

  lesson('git-init', 'Starting a repository', 7, [
    chat(['git init turns a folder into a repository: Git starts watching it, keeping its history in a hidden .git folder.', 'git status is the command you’ll run most: it tells you what changed and what Git will save next.']),
    tapPage('Start tracking a folder', 'Make the repository, add a file, and ask for the status.', term({ files: { 'menu.txt': 'Lemon Tea\n' }, commands: ['git status', 'git init', 'git status'] }), 'Untracked files:', [press(0), press(1), press(2)], 'Before init, Git refused. After, it sees menu.txt but isn’t tracking it yet.'),
    reveal('Inside a repository', [
      ['.git/', 'Where Git keeps the history. Don’t edit it, and don’t delete it.'],
      ['Untracked', 'A file Git sees but doesn’t save yet.'],
      ['Working tree', 'The files as they are on your disk now.'],
    ], { mono: true }),
    tapbug('fatal: not a git repository', ['$ mkdir cafe-site', '$ cd cafe-site', '$ git status'], [[3, 'git status', 'git init']], 'Run git init first in a new folder.'),
    check('What does git init make?', ['A hidden .git folder that holds the history', 'A GitHub repository', 'A first commit', 'A branch called init'], 'Only on your computer.', 'Where does history live?'),
    recap([
      ['🆕', 'git init starts a repository'],
      ['📁', '.git holds the history'],
      ['🔍', 'git status: what changed'],
    ]),
  ]),

  lesson('git-b-2-2', 'Reading git status', 7, [
    explore('The three places a change can be', ['Working tree   →   git add   →   Staging area   →   git commit   →   History'], [
      [1, 'Edit files in the working tree, choose changes with git add, save them with git commit.'],
    ]),
    tapPage('Watch a file move', 'Check the status after each step.', term({ before: ['git init -b main', 'echo "Lemon Tea" > menu.txt'], commands: ['git status -s', 'git add menu.txt', 'git status -s', 'git commit -m "Add the menu"', 'git status'] }), 'nothing to commit, working tree clean', [press(0), press(1), press(2), press(3), press(4)], '?? untracked, A staged, then clean after the commit.'),
    matchUp('Short status codes', [['??', 'Untracked'], ['A ', 'New file, staged'], [' M', 'Changed, not staged'], ['M ', 'Changed and staged']], 'git status -s: the left column is staged, the right is not.'),
    truth([
      ['git add moves a change into the staging area', true, 'Ready for the next commit.'],
      ['A commit saves files that were never added', false, 'Only staged changes.'],
      ['git status -s shows two columns: staged and not staged', true, 'Left and right.'],
    ]),
    check('What does “nothing to commit, working tree clean” mean?', ['Every change is saved in a commit', 'The folder is empty', 'Git is broken', 'Files were deleted'], 'Nothing new since the last commit.', 'What is left to save?'),
    recap([
      ['📍', 'Working tree → staging area → history'],
      ['🔍', 'git status (and -s for short)'],
      ['✅', 'Clean means everything is committed'],
    ]),
  ]),

  challenge('git-b-2-ch', 'Module 2 Challenge', { icon: '📁', name: 'Repo Maker' }, ['Start a repository', 'Read git status', 'Know the three areas'], [
    mcq(1, 'Which command starts a repository?', ['git init', 'git start', 'git new', 'git create'], 'In the project folder.', { mono: true }),
    mcq(2, 'Where does Git keep the history?', ['In the .git folder', 'On GitHub only', 'In package.json', 'In each file'], 'Hidden.', { mono: true }),
    mcq(3, 'What does ?? mean in git status -s?', ['Untracked file', 'Conflict', 'Deleted', 'Staged'], 'Git sees it but doesn’t track it.', { mono: true }),
    mcq(4, 'Which area holds changes chosen for the next commit?', ['The staging area', 'The working tree', 'GitHub', '.gitignore'], 'Also called the index.'),
    mcq(5, 'What does git status show when everything is saved?', ['nothing to commit, working tree clean', 'all good', 'up to date', 'no files'], 'Clean.', { mono: true }),
    swipe([
      ['Deleting .git deletes the history', true, 'Keep it.'],
      ['git status changes your files', false, 'It only reports.'],
      ['New files start as untracked', true, 'Until git add.'],
      ['git init uploads the project to GitHub', false, 'Only local.'],
    ]),
    pairs([['git init', 'Start'], ['git status', 'Report'], ['??', 'Untracked'], ['.git', 'History']], 'Starting out.'),
    pickCode('Which shows a short status?', ['git status -s', 'git status --tiny', 'git short', 'git s'], '-s or --short.'),
    bugTask(['$ git int', '$ git stauts'], [[1, 'git int', 'git init'], [2, 'git stauts', 'git status']], 'Spell the commands exactly.'),
    xray('<div class="c">$ git status -s</div><div class="u">?? menu.txt</div><div class="c">$ git status -s</div><div class="a">A  menu.txt</div>', [
      ['.u', 'Untracked', '??', ['??', 'A ', ' M']],
      ['.a', 'Staged, new', 'A ', ['??', 'A ', ' M']],
    ]),
    arrange(['git init -b main', 'echo "Lemon Tea" > menu.txt', 'git status -s'], 'start the repo, make a file, then check'),
  ]),

  lesson('git-commit', 'Staging and committing', 8, [
    chat(['A commit saves the changes you staged, with a message saying why.', 'git add chooses what goes in; git commit -m "message" saves it. Small commits with clear messages make history easy to read.']),
    tapPage('Your first commits', 'Stage and commit the menu, change it, then commit again with -a.', term({ before: ['git init -b main', 'echo "Lemon Tea" > menu.txt'], commands: ['git add menu.txt', 'git commit -m "Add the menu"', 'echo "Cheese Toast" >> menu.txt', 'git commit -am "Add cheese toast"'] }), '[main', [press(0), press(1), press(2), press(3)], 'Each commit gets an id, like a3f9c21. -a stages tracked files that changed.'),
    explore('Ways to stage', ['git add menu.txt', 'git add .', 'git add -A', 'git commit -am "message"', 'git restore --staged menu.txt'], [
      [1, 'One file.'],
      [2, 'Everything in this folder.'],
      [3, 'Every change everywhere, deletions too.'],
      [4, 'Stage changed tracked files and commit in one go (new files still need add).'],
      [5, 'Take a file back out of the staging area.'],
    ]),
    reveal('Good commit messages', [
      ['Say what and why', '“Add opening hours to the footer”, not “update”.'],
      ['Imperative', 'Like an order: “Fix”, “Add”, “Remove”.'],
      ['Short first line', 'About 50 characters; details after a blank line.'],
      ['One change', 'One idea per commit.'],
    ]),
    tapbug('error: no message given', ['git add menu.txt', 'git commit'], [[2, 'git commit', 'git commit -m "Add the menu"']], 'Give a message with -m (or Git opens an editor for one).'),
    check('Why stage before committing?', ['To choose exactly which changes go into the commit', 'Git needs a backup', 'To upload them', 'To delete old versions'], 'Commit only what belongs together.', 'What if two unrelated changes are waiting?'),
    recap([
      ['➕', 'git add chooses changes'],
      ['💾', 'git commit -m "why" saves them'],
      ['✍', 'Small commits, clear messages'],
    ]),
  ]),

  lesson('git-b-3-2', 'Changing the last commit', 7, [
    tapPage('Fix a typo in the last message', 'Commit, notice the typo, then amend.', term({ before: ['git init -b main', 'echo "Lemon Tea" > menu.txt', 'git add menu.txt'], commands: ['git commit -m "Ad the menu"', 'git commit --amend -m "Add the menu"', 'git log --oneline'] }), 'Add the menu', [press(0), press(1), press(2)], '--amend replaces the last commit with a new one.'),
    reveal('Amending safely', [
      ['Forgot a file', 'git add it, then git commit --amend --no-edit.'],
      ['Typo in the message', 'git commit --amend -m "New message".'],
      ['Already pushed?', 'Don’t amend: others may have the old commit. Make a new commit instead.'],
    ]),
    tapbug('Teammates’ history breaks after you amend', ['git push', 'git commit --amend -m "Better message"', 'git push --force'], [[2, 'git commit --amend -m "Better message"', 'git commit -m "Follow-up fix"'], [3, 'git push --force', 'git push']], 'Never rewrite commits you have already shared.'),
    truth([
      ['Amending changes the commit’s id', true, 'It is a new commit.'],
      ['--no-edit keeps the old message', true, 'Handy for a forgotten file.'],
      ['Amending is fine after pushing', false, 'Others have the old commit.'],
    ]),
    check('What does --amend do?', ['Replaces the last commit', 'Adds a second commit', 'Deletes the repository', 'Pushes the commit'], 'A new id, same place.', 'What happens to the old one?'),
    recap([
      ['✏', 'git commit --amend fixes the last commit'],
      ['📎', '--no-edit keeps the message'],
      ['🚫', 'Never amend pushed commits'],
    ]),
  ]),

  challenge('git-b-3-ch', 'Module 3 Challenge', { icon: '💾', name: 'Commit Keeper' }, ['Stage the right changes', 'Commit with clear messages', 'Fix the last commit'], [
    mcq(1, 'Which stages every change in the folder?', ['git add .', 'git commit .', 'git stage all', 'git save'], 'Or -A for everything.', { mono: true }),
    mcq(2, 'Which commits with a message?', ['git commit -m "Add the menu"', 'git commit "Add the menu"', 'git save -m "Add the menu"', 'git message "Add the menu"'], '-m for message.', { mono: true }),
    mcq(3, 'What does git commit -am do?', ['Stages changed tracked files and commits', 'Adds new files too', 'Amends the last commit', 'Pushes'], 'Not new files.'),
    mcq(4, 'Which is the best message?', ['Add opening hours to the footer', 'update', 'changes', 'asdf'], 'Say what and why.'),
    mcq(5, 'Which unstages a file?', ['git restore --staged menu.txt', 'git unadd menu.txt', 'git rm menu.txt', 'git reset --hard'], 'Your edits stay.', { mono: true }),
    swipe([
      ['Each commit has a unique id', true, 'A short hash.'],
      ['git add saves a commit', false, 'It only stages.'],
      ['Amending a pushed commit is safe', false, 'It rewrites shared history.'],
      ['One idea per commit is good practice', true, 'Easier to read and undo.'],
    ]),
    pairs([['git add', 'Stage'], ['git commit', 'Save'], ['--amend', 'Replace last'], ['restore --staged', 'Unstage']], 'Committing.'),
    pickCode('Which adds a forgotten file to the last commit, keeping its message?', ['git add notes.txt && git commit --amend --no-edit', 'git commit notes.txt', 'git add notes.txt && git commit', 'git push notes.txt'], 'Amend without editing.'),
    bugTask(['git commit -m Add the menu', 'git add -m "Add hours"'], [[1, '-m Add the menu', '-m "Add the menu"'], [2, 'git add -m', 'git commit -am']], 'Quote messages with spaces; messages belong to commit.'),
    xray('<div class="c">$ git commit -m "Add the menu"</div><div class="h">[main (root-commit) a6a72e0] Add the menu</div><div class="s"> 1 file changed, 1 insertion(+)</div>', [
      ['.h', 'The new commit and its id', 'git commit -m', ['git commit -m', 'git add', 'git status']],
      ['.s', 'What changed', 'git commit -m', ['git commit -m', 'git add', 'git status']],
    ]),
    arrange(['echo "Mint Tea" >> menu.txt', 'git add menu.txt', 'git commit -m "Add mint tea"'], 'change the file, stage it, commit it', { repo: CAFE_REPO }),
  ]),

  lesson('git-history', 'Looking at history', 8, [
    chat(['History answers questions: what changed, when, by whom, and why.', 'git log lists commits, git diff shows what changed, and git show opens one commit.']),
    tapPage('Read the history', 'Look at the log, change a file, and see the difference.', term({ repo: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea\n' }], ['Add cheese toast', { 'menu.txt': 'Lemon Tea\nCheese Toast\n' }]] }, commands: ['git log --oneline', 'echo "Mint Tea" >> menu.txt', 'git diff', 'git show HEAD~1'] }), '+Mint Tea', [press(0), press(1), press(2), press(3)], 'git diff shows unstaged changes: + added, - removed.'),
    explore('History commands', ['git log', 'git log --oneline', 'git log --oneline --graph --all', 'git diff', 'git diff --staged', 'git show a6a72e0'], [
      [1, 'Every commit with author, date and message.'],
      [2, 'One line each.'],
      [3, 'All branches, drawn as a graph.'],
      [4, 'Changes not staged yet.'],
      [5, 'Changes staged for the next commit.'],
      [6, 'One commit: its message and its changes.'],
    ]),
    reveal('Naming commits', [
      ['HEAD', 'Where you are now: the latest commit on your branch.'],
      ['HEAD~1', 'One commit before HEAD. HEAD~2 is two before.'],
      ['a6a72e0', 'A commit’s id; the first 7 characters are enough.'],
    ], { mono: true }),
    check('Which shows changes you have staged?', ['git diff --staged', 'git diff', 'git log', 'git show'], 'git diff alone shows unstaged ones.', 'Which flag?', { mono: true }),
    recap([
      ['📜', 'git log (--oneline, --graph, --all)'],
      ['±', 'git diff and git diff --staged'],
      ['🔎', 'git show HEAD, HEAD~1 or an id'],
    ]),
  ]),

  lesson('git-b-4-2', 'Tags', 6, [
    chat(['A tag is a name stuck to one commit, usually a release: v1.0, v1.1.', 'Branches move as you commit; tags stay put.']),
    tapPage('Tag a release', 'Tag the current commit as v1.0 and see it in the log.', term({ repo: CAFE_REPO, commands: ['git tag v1.0', 'git tag', 'git log --oneline'] }), 'tag: v1.0', [press(0), press(1), press(2)], 'The log shows the tag next to the commit.'),
    reveal('Tags in practice', [
      ['Lightweight', 'git tag v1.0: just a name.'],
      ['Annotated', 'git tag -a v1.0 -m "First release": with a message and author. Best for releases.'],
      ['Sharing', 'git push origin v1.0, or --tags for all.'],
      ['Versions', 'Often semantic: v1.4.0.'],
    ], { mono: true }),
    check('What is the difference between a tag and a branch?', ['A tag stays on one commit; a branch moves forward', 'They are the same', 'Tags can be edited', 'Branches are only on GitHub'], 'Tags mark points.', 'What happens when you commit?'),
    truth([
      ['Tags are pushed automatically with git push', false, 'Push them on their own or with --tags.'],
      ['Annotated tags store a message', true, '-a and -m.'],
      ['A tag can mark a release version', true, 'v1.0.'],
    ]),
    recap([
      ['🏷', 'git tag v1.0 marks a commit'],
      ['📝', 'git tag -a for annotated releases'],
      ['⬆', 'Push tags on purpose'],
    ]),
  ]),

  challenge('git-b-4-ch', 'Module 4 Challenge', { icon: '📜', name: 'History Reader' }, ['Read the log', 'See what changed with diff', 'Mark releases with tags'], [
    mcq(1, 'Which lists commits one per line?', ['git log --oneline', 'git list', 'git log -1line', 'git history'], 'Short and readable.', { mono: true }),
    mcq(2, 'What does git diff show by default?', ['Changes not staged yet', 'Staged changes', 'The last commit', 'All commits'], '--staged for the others.'),
    mcq(3, 'What is HEAD~1?', ['The commit before the current one', 'The first commit', 'The next commit', 'A branch'], 'One step back.', { mono: true }),
    mcq(4, 'Which opens one commit with its changes?', ['git show', 'git open', 'git log -c', 'git diff --one'], 'With an id or HEAD.', { mono: true }),
    mcq(5, 'What does a tag do?', ['Names one commit, like a release', 'Moves with each commit', 'Deletes history', 'Creates a branch'], 'Stays put.'),
    swipe([
      ['In git diff, + lines were added', true, '- were removed.'],
      ['The first 7 characters of an id are enough', true, 'Usually.'],
      ['git log changes history', false, 'It only reads.'],
      ['git log --graph --all shows every branch', true, 'As a graph.'],
    ]),
    pairs([['git log', 'Commits'], ['git diff', 'Changes'], ['git show', 'One commit'], ['git tag', 'Name a commit']], 'History.'),
    pickCode('Which shows the last three commits, one line each?', ['git log --oneline -3', 'git log 3', 'git show -3 --short', 'git last 3'], '-n limits the count.'),
    bugTask(['git diff --stage', 'git show HEAD-1'], [[1, '--stage', '--staged'], [2, 'HEAD-1', 'HEAD~1']], '--staged, and ~ to step back.'),
    xray('<div class="c">$ git diff</div><div class="m">-Lemon Tea 40</div><div class="p">+Lemon Tea 45</div>', [
      ['.m', 'The old line', 'removed', ['removed', 'added', 'unchanged']],
      ['.p', 'The new line', 'added', ['removed', 'added', 'unchanged']],
    ]),
    arrange(['git log --oneline', 'git tag v1.0', 'git tag'], 'read the log, tag the release, list the tags', { repo: CAFE_REPO }),
  ]),

  lesson('git-branch', 'Branches', 8, [
    chat(['A branch is a separate line of work. You try a new offers page on a branch, while main stays safe and working.', 'Switching branches swaps the files in your folder to that branch’s version.']),
    tapPage('Work on a branch', 'Make a branch, add a file there, then switch back to main.', term({ repo: CAFE_REPO, commands: ['git switch -c offers', 'echo "Tea and toast: 100" > offers.txt', 'git add offers.txt', 'git commit -m "Add the offers page"', 'git switch main', 'ls'] }), "Switched to branch 'main'", [press(0), press(1), press(2), press(3), press(4), press(5)], 'On main, offers.txt isn’t there: it lives on the offers branch.'),
    explore('Branch commands', ['git branch', 'git branch offers', 'git switch offers', 'git switch -c offers', 'git branch -d offers', 'git checkout -b offers'], [
      [1, 'List branches; * marks the current one.'],
      [2, 'Make a branch (but stay where you are).'],
      [3, 'Move to it.'],
      [4, 'Make it and move to it.'],
      [5, 'Delete it (once merged).'],
      [6, 'The older way to make and switch.'],
    ]),
    reveal('Why branches', [
      ['Safe experiments', 'main always works; ideas wait on their own branch.'],
      ['One branch per task', 'feature/offers-page, fix/menu-typo.'],
      ['Cheap', 'A branch is just a pointer to a commit.'],
    ]),
    check('What does git switch -c offers do?', ['Makes a branch called offers and moves to it', 'Deletes offers', 'Merges offers', 'Lists branches'], '-c means create.', 'Two jobs in one.', { mono: false }),
    recap([
      ['🌿', 'A branch is a separate line of work'],
      ['🔀', 'git switch name; -c to create'],
      ['📂', 'Switching swaps the files to that branch'],
    ]),
  ]),

  lesson('git-b-5-2', 'Switching safely', 7, [
    tapPage('Unsaved changes block a switch', 'Change offers.txt on the branch, try to switch, then commit and switch.', term({ repo: CAFE_REPO, before: ['git switch -c offers', 'echo "Tea and toast: 100" > offers.txt', 'git add offers.txt', 'git commit -m "Add offers"', 'git switch main', 'echo "Tea and toast: 120" > offers.txt', 'git add offers.txt', 'git commit -m "Offer on main"', 'git switch offers'], commands: ['echo "Tea and toast: 90" > offers.txt', 'git switch main', 'git commit -am "Cheaper offer"', 'git switch main'] }), 'Cheaper offer', [press(0), press(1), press(2), press(3)], 'Git won’t switch if your changes would be lost. Commit (or stash) first.'),
    reveal('Before you switch', [
      ['Commit', 'Save the work on this branch.'],
      ['Stash', 'git stash puts it aside for later (module 11).'],
      ['Check', 'git status shows what is waiting.'],
    ]),
    tapbug('error: Your local changes would be overwritten by checkout', ['echo "Tea and toast: 90" > offers.txt', 'git switch main'], [[2, 'git switch main', 'git commit -am "Cheaper offer" && git switch main']], 'Commit or stash changes before switching.'),
    truth([
      ['Git refuses a switch that would lose your changes', true, 'Commit or stash first.'],
      ['Committed work stays on its branch when you switch', true, 'Nothing is lost.'],
      ['Switching branches needs the internet', false, 'All local.'],
    ]),
    check('Which branch name is clearest?', ['feature/offers-page', 'branch2', 'new', 'test-stuff'], 'Say what the work is.', 'Could a teammate guess what it holds?'),
    recap([
      ['💾', 'Commit or stash before switching'],
      ['🏷', 'Name branches by their task'],
      ['🔍', 'git status before you switch'],
    ]),
  ]),

  challenge('git-b-5-ch', 'Module 5 Challenge', { icon: '🌿', name: 'Branch Builder' }, ['Make and switch branches', 'Keep main safe', 'Switch without losing work'], [
    mcq(1, 'Which lists branches?', ['git branch', 'git branches', 'git list', 'git show branch'], '* marks yours.', { mono: true }),
    mcq(2, 'Which makes a branch and moves to it?', ['git switch -c offers', 'git branch offers', 'git switch offers', 'git new offers'], '-c creates.', { mono: true }),
    mcq(3, 'What happens to files when you switch?', ['They change to that branch’s version', 'Nothing', 'They are deleted', 'They are pushed'], 'The folder follows the branch.'),
    mcq(4, 'Why might Git refuse to switch?', ['Your uncommitted changes would be lost', 'The branch is too new', 'You are offline', 'The branch has no files'], 'Commit or stash.'),
    mcq(5, 'Which deletes a merged branch?', ['git branch -d offers', 'git delete offers', 'git rm offers', 'git switch -d offers'], '-D forces.', { mono: true }),
    swipe([
      ['A branch is a pointer to a commit', true, 'Cheap to make.'],
      ['main should always work', true, 'Experiments go on branches.'],
      ['git checkout -b and git switch -c do the same', true, 'Old and new.'],
      ['Switching branches deletes your commits', false, 'They stay on their branch.'],
    ]),
    pairs([['git branch', 'List'], ['git switch', 'Move'], ['-c', 'Create'], ['-d', 'Delete']], 'Branches.'),
    pickCode('Which starts a branch for a menu fix?', ['git switch -c fix/menu-typo', 'git branch -d fix/menu-typo', 'git switch fix menu typo', 'git commit -b fix'], 'A clear name.'),
    bugTask(['git swich -c offers', 'git branch -d main'], [[1, 'swich', 'switch'], [2, 'git branch -d main', 'git branch -d offers']], 'Spell switch, and don’t delete main.'),
    xray('<div class="c">$ git branch</div><div class="cur">* main</div><div class="o">  offers</div>', [
      ['.cur', 'The branch you are on', '* main', ['* main', '  offers', 'git switch']],
      ['.o', 'Another branch', '  offers', ['* main', '  offers', 'git switch']],
    ]),
    arrange(['git switch -c hours', 'echo "Open 8 to 9" > hours.txt', 'git add hours.txt', 'git commit -m "Add hours"'], 'make a branch, add a file, stage, commit', { repo: CAFE_REPO }),
  ]),

  lesson('git-merge', 'Merging', 8, [
    chat(['When the work on a branch is ready, merge it into main.', 'If main hasn’t moved, Git just moves main forward: a fast-forward. If both moved, Git makes a merge commit that joins them.']),
    tapPage('A fast-forward merge', 'Merge the offers branch into main.', term({ ...TWO_BRANCHES, commands: ['git merge offers', 'git log --oneline'] }), 'Fast-forward', [press(0), press(1)], 'main had no new commits, so it simply moved up to offers.'),
    tapPage('A merge commit', 'This time main moved on too. Commit on main, then merge.', term({ ...TWO_BRANCHES, commands: ['echo "Open 8 to 9" > hours.txt', 'git add hours.txt', 'git commit -m "Add hours"', 'git merge offers', 'git log --oneline --graph'] }), "Merge made by the 'ort' strategy.", [press(0), press(1), press(2), press(3), press(4)], 'Both lines of work are joined by a new commit with two parents.'),
    reveal('After merging', [
      ['Delete the branch', 'git branch -d offers: the work is in main now.'],
      ['Already up to date', 'Nothing new to merge.'],
      ['--no-ff', 'Always make a merge commit, to keep the branch visible in history.'],
    ], { mono: true }),
    check('When does Git fast-forward?', ['When main has no commits the branch doesn’t have', 'Always', 'When there are conflicts', 'Never'], 'It just moves the pointer.', 'Did main move on?'),
    recap([
      ['🔀', 'git merge branch brings its work in'],
      ['⏩', 'Fast-forward when main hasn’t moved'],
      ['🔗', 'Otherwise a merge commit joins them'],
    ]),
  ]),

  lesson('git-b-6-2', 'Merge conflicts', 9, [
    chat(['A conflict happens when both branches changed the same lines. Git can’t guess which you want, so it asks you.', 'It marks the file: your version between <<<<<<< and =======, theirs between ======= and >>>>>>>.']),
    tapPage('Make and fix a conflict', 'Merge, read the file, keep the new price, then finish the merge.', term({ repo: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea 40\n' }]] }, before: ['git switch -c prices', 'echo "Lemon Tea 45" > menu.txt', 'git commit -am "Raise tea price"', 'git switch main', 'echo "Lemon Tea 50" > menu.txt', 'git commit -am "Tea costs 50"'], commands: ['git merge prices', 'cat menu.txt', 'echo "Lemon Tea 45" > menu.txt', 'git add menu.txt', 'git commit -m "Merge prices, keep 45"'] }), 'Merge prices, keep 45', [press(0), press(1), press(2), press(3), press(4)], 'You decided, removed the markers, staged the file, and committed.'),
    explore('A conflicted file', ['<<<<<<< HEAD', 'Lemon Tea 50', '=======', 'Lemon Tea 45', '>>>>>>> prices'], [
      [1, 'Start of your version (the branch you are on).'],
      [2, 'Your line.'],
      [3, 'The divider.'],
      [4, 'Their line, from the branch being merged.'],
      [5, 'End of the conflict.'],
    ]),
    reveal('Fixing a conflict', [
      ['1 · Edit', 'Keep one side, both, or write something new. Remove every marker.'],
      ['2 · Stage', 'git add the file.'],
      ['3 · Commit', 'git commit finishes the merge.'],
      ['Or give up', 'git merge --abort goes back to before the merge.'],
    ]),
    tapbug('error: Committing is not possible because you have unmerged files', ['<<<<<<< HEAD', 'Lemon Tea 50', '=======', 'Lemon Tea 45', '>>>>>>> prices'], [[1, '<<<<<<< HEAD', '(removed)'], [3, '=======', '(removed)'], [5, '>>>>>>> prices', '(removed)']], 'Remove every conflict marker before staging the file.'),
    check('What does git merge --abort do?', ['Goes back to how things were before the merge', 'Keeps your side', 'Deletes the branch', 'Commits the conflict'], 'A safe way out.', 'Undo, or finish?', { mono: false }),
    recap([
      ['⚔', 'Conflicts: both changed the same lines'],
      ['✂', 'Edit, remove the markers, git add, git commit'],
      ['↩', 'git merge --abort to start again'],
    ]),
  ]),

  challenge('git-b-6-ch', 'Module 6 Challenge', { icon: '🔀', name: 'Merge Master' }, ['Merge branches', 'Tell fast-forwards from merge commits', 'Resolve conflicts'], [
    mcq(1, 'Which brings the offers branch into the current one?', ['git merge offers', 'git pull offers', 'git add offers', 'git switch offers'], 'Run it on main.', { mono: true }),
    mcq(2, 'What is a fast-forward?', ['Moving main up to the branch, with no merge commit', 'A very fast commit', 'Skipping conflicts', 'Deleting a branch'], 'main hadn’t moved.'),
    mcq(3, 'What causes a conflict?', ['Both branches changed the same lines', 'A long branch name', 'Too many files', 'Being offline'], 'Git can’t choose.'),
    mcq(4, 'What marks your side of a conflict?', ['<<<<<<< HEAD', '>>>>>>> HEAD', '======= mine', '### yours'], 'Then =======, then theirs.', { mono: true }),
    mcq(5, 'After editing a conflicted file, what next?', ['git add it, then git commit', 'git push', 'git merge again', 'Delete .git'], 'Stage, then commit.'),
    swipe([
      ['A merge commit has two parents', true, 'Both lines of work.'],
      ['Conflicts mean something is broken', false, 'Just a decision for you.'],
      ['git merge --abort undoes a merge in progress', true, 'Back to before.'],
      ['Markers can be left in the file', false, 'Remove them all.'],
    ]),
    pairs([['Fast-forward', 'Pointer moves'], ['Merge commit', 'Two parents'], ['<<<<<<<', 'Your side starts'], ['--abort', 'Back out']], 'Merging.'),
    pickCode('Which finishes a merge after fixing menu.txt?', ['git add menu.txt && git commit -m "Merge prices"', 'git merge --abort', 'git switch main', 'git push --force'], 'Stage, then commit.'),
    bugTask(['git merge offers   # on the offers branch', 'git branch -d main'], [[1, '# on the offers branch', '# on main'], [2, 'git branch -d main', 'git branch -d offers']], 'Merge into main from main, then delete the finished branch.'),
    xray('<div class="c">$ git merge prices</div><div class="a">Auto-merging menu.txt</div><div class="x">CONFLICT (content): Merge conflict in menu.txt</div>', [
      ['.x', 'The conflict', 'git merge prices', ['git merge prices', 'git add menu.txt', 'git commit']],
      ['.a', 'Git trying to combine', 'git merge prices', ['git merge prices', 'git add menu.txt', 'git commit']],
    ]),
    arrange(['git merge offers', 'git branch -d offers', 'git log --oneline'], 'merge, delete the branch, read the log', TWO_BRANCHES),
  ]),
];
