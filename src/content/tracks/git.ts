import { bug, lesson, order, quiz, read, tap } from '../dsl';
import type { Lesson } from '../types';

const K = 'GIT';

export const GIT_LESSONS: Lesson[] = [
  lesson('git-why', 'Why Git?', 'git', ['Git saves snapshots of your project', 'You can go back to any snapshot', 'Teams use it to work together safely'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Save points for your code',
      body: 'Git records snapshots of your project called commits. You can see what changed, go back if something breaks, and work with others without overwriting each other. Every tech company uses it.',
      lang: 'bash',
      code: ['git --version', '# git version 2.48.1'],
      tip: 'Git is the tool; GitHub is a website that hosts Git projects.',
    }),
    quiz({
      prompt: 'What is a commit?',
      options: ['A saved snapshot of your project', 'A website', 'A programming language', 'A deleted file'],
      right: 'Each commit is a snapshot with a message describing the change.',
      wrong: 'A commit is a snapshot of your files at one moment, with a message.',
    }),
    quiz({
      prompt: 'How is GitHub related to Git?',
      options: ['GitHub hosts Git projects online', 'They are the same thing', 'GitHub replaces Git', 'Git is a part of GitHub'],
      right: 'Git runs on your computer; GitHub stores and shares repositories online.',
      wrong: 'Git is the version control tool. GitHub is one website that hosts Git repositories.',
    }),
  ]),

  lesson('git-init', 'Start a repository', 'git', ['git init creates a repository', 'git status shows what changed', 'Untracked files are not saved yet'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Turn a folder into a repo',
      body: 'git init adds a hidden .git folder that stores your history. git status is the command you will run most: it tells you which files changed and what is ready to commit.',
      lang: 'bash',
      code: ['mkdir my-site', 'cd my-site', 'git init', 'git status'],
      tip: 'Never delete the .git folder unless you want to lose your history.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Check what changed',
      instructions: 'Tap the git command that shows which files changed.',
      lang: 'bash',
      lines: ['git init', 'git status'],
      target: { line: 1, token: 'status' },
      explain: 'git status lists changed, staged and untracked files.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'New project',
      instructions: 'Put the commands in order to create a folder and make it a Git repository.',
      lang: 'bash',
      lines: ['mkdir portfolio', 'cd portfolio', 'git init'],
      explain: 'Make the folder, go into it, then initialise Git.',
    }),
  ]),

  lesson('git-commit', 'add and commit', 'git', ['git add stages changes', 'git commit saves the staged snapshot', 'Write messages that say why'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Stage, then save',
      body: 'Saving is two steps. git add picks which changes go into the next snapshot (the staging area). git commit -m "message" saves that snapshot.',
      lang: 'bash',
      code: ['git add index.html', 'git commit -m "Add home page"'],
      tip: 'git add . stages every change in the folder.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Save your work',
      instructions: 'Order the commands to check, stage and commit your changes.',
      lang: 'bash',
      lines: ['git status', 'git add style.css', 'git commit -m "Style the header"'],
      explain: 'Look at what changed, stage it, then commit with a message.',
    }),
    quiz({
      prompt: 'You edited a file but `git commit` says "nothing added to commit". Why?',
      options: ['You did not git add the file', 'The file is too big', 'Git is not installed', 'You need to push first'],
      right: 'Only staged changes are committed. Run git add first.',
      wrong: 'commit only saves what is staged. Stage the change with git add.',
    }),
  ]),

  lesson('git-history', 'log and diff', 'git', ['git log lists commits', 'git diff shows line-by-line changes', 'Each commit has a unique hash'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Read the history',
      body: 'git log shows commits newest first, each with a hash like a1b2c3d. git diff shows exactly which lines changed since the last commit: + lines were added, - lines removed.',
      lang: 'bash',
      code: ['git log --oneline', '# a1b2c3d Style the header', '# 9f8e7d6 Add home page', 'git diff'],
      tip: 'git log --oneline gives a short, one-line-per-commit view.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'See your changes',
      instructions: 'Tap the command that shows the exact lines you changed.',
      lang: 'bash',
      lines: ['git log --oneline', 'git diff'],
      target: { line: 1, token: 'diff' },
      explain: 'diff compares your files with the last commit.',
    }),
    quiz({
      prompt: 'In a diff, what does a line starting with + mean?',
      options: ['The line was added', 'The line was removed', 'The line has an error', 'The line is a comment'],
      right: '+ marks added lines, - marks removed ones.',
      wrong: '+ means added. Removed lines start with -.',
    }),
  ]),

  lesson('git-branch', 'Branches', 'git', ['A branch is a separate line of work', 'git switch -c creates and moves to a branch', 'main stays stable while you experiment'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Experiment safely',
      body: 'A branch lets you build a feature without touching main. When it works, you merge it back. If it does not, you just delete the branch.',
      lang: 'bash',
      code: ['git switch -c dark-mode', '# ...edit and commit...', 'git switch main'],
      tip: 'Older tutorials use git checkout -b; git switch -c does the same.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Feature branch',
      instructions: 'Create a branch, commit on it, then return to main.',
      lang: 'bash',
      lines: ['git switch -c contact-form', 'git add contact.html', 'git commit -m "Add contact form"', 'git switch main'],
      explain: 'Branch first, so the commit lands on the feature branch, not main.',
    }),
    quiz({
      prompt: 'Why work on a branch instead of main?',
      options: ['main stays working while you experiment', 'Branches run faster', 'main cannot be committed to', 'GitHub requires it'],
      right: 'Unfinished work stays on its branch until it is ready.',
      wrong: 'Branches isolate work in progress so main stays stable.',
    }),
  ]),

  lesson('git-merge', 'Merging and conflicts', 'git', ['git merge brings a branch into yours', 'Conflicts happen when both sides changed the same lines', 'You choose the final version, then commit'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Bring work together',
      body: 'git merge feature adds the feature branch\'s commits to your branch. If both changed the same lines, Git marks a conflict with <<<<<<<, ======= and >>>>>>> and asks you to choose.',
      lang: 'bash',
      code: ['git switch main', 'git merge contact-form', '# CONFLICT in index.html: fix the file, then', 'git add index.html', 'git commit'],
      tip: 'Conflicts are normal. Read both versions and keep what is right.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Leftover markers',
      instructions: 'After resolving a conflict, this file still has a problem. Which line must go?',
      lang: 'html',
      lines: ['<h1>CodeYatra Rail</h1>', '<p>Book trains across India.</p>', '>>>>>>> contact-form', '<a href="contact.html">Contact</a>'],
      bug: 2,
      fix: '<!-- (line deleted) -->',
      explain: 'Conflict markers like >>>>>>> must be deleted before you commit.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Merge a feature',
      instructions: 'Put the steps in order to merge the feature into main.',
      lang: 'bash',
      lines: ['git switch main', 'git merge dark-mode', 'git log --oneline'],
      explain: 'Switch to the branch that receives the work, merge, then check the history.',
    }),
  ]),

  lesson('git-remote', 'push and pull', 'git', ['A remote is a copy on a server like GitHub', 'git push uploads your commits', 'git pull downloads others\' commits'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Share your repository',
      body: 'A remote, usually called origin, is a copy of your repo on GitHub. push sends your commits up; pull brings your teammates\' commits down and merges them.',
      lang: 'bash',
      code: ['git remote add origin https://github.com/you/portfolio.git', 'git push -u origin main', 'git pull'],
      tip: 'Pull before you start work each day to avoid conflicts.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Upload commits',
      instructions: 'Tap the command that sends your commits to GitHub.',
      lang: 'bash',
      lines: ['git pull', 'git push'],
      target: { line: 1, token: 'push' },
      explain: 'push uploads; pull downloads.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Publish a new repo',
      instructions: 'Order the commands to connect GitHub and upload main.',
      lang: 'bash',
      lines: ['git remote add origin https://github.com/asha/portfolio.git', 'git branch -M main', 'git push -u origin main'],
      explain: 'Add the remote, name the branch main, then push and set the upstream.',
    }),
  ]),

  lesson('git-pr', 'Pull requests', 'git', ['A pull request proposes merging a branch', 'Teammates review the changes', 'Small PRs get reviewed faster'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Review before merge',
      body: 'On GitHub you push a branch and open a pull request (PR). Teammates comment on the diff, you push fixes, and when everyone agrees the PR is merged into main.',
      lang: 'bash',
      code: ['git switch -c fix-footer', 'git commit -am "Fix footer links"', 'git push -u origin fix-footer', '# then open a pull request on GitHub'],
      tip: 'Contributing PRs to open-source projects looks great on a resume.',
    }),
    quiz({
      prompt: 'What does a pull request ask for?',
      options: ['To merge your branch into another', 'To download a repo', 'To delete main', 'To undo a commit'],
      right: 'A PR proposes merging your branch, with a review first.',
      wrong: 'A pull request asks the project to merge your branch after review.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'From branch to PR',
      instructions: 'Order the steps for a typical pull request.',
      lang: 'bash',
      lines: ['git switch -c add-resume', 'git add resume.html', 'git commit -m "Add resume page"', 'git push -u origin add-resume'],
      explain: 'Make a branch, commit, push it, then open the PR on GitHub.',
    }),
  ]),

  lesson('git-ignore', '.gitignore', 'git', ['.gitignore lists files Git should skip', 'Never commit secrets or node_modules', 'Patterns like *.log match many files'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Keep junk and secrets out',
      body: 'Some files must never be committed: passwords and API keys (.env), huge generated folders (node_modules), logs. List them in a .gitignore file and Git ignores them.',
      lang: 'bash',
      code: ['# .gitignore', 'node_modules/', '.env', '*.log'],
      tip: 'If a secret was ever committed, change the secret. Deleting the file is not enough.',
    }),
    quiz({
      prompt: 'Which file should almost always be in .gitignore?',
      options: ['.env', 'index.html', 'README.md', 'package.json'],
      mono: true,
      right: '.env holds secrets like API keys.',
      wrong: 'README and package.json belong in the repo. .env holds secrets and must be ignored.',
    }),
    quiz({
      prompt: 'What does the pattern *.log ignore?',
      options: ['Every file ending in .log', 'Only a file named *.log', 'The log folder', 'Nothing'],
      mono: true,
      right: '* matches any name, so all .log files are ignored.',
      wrong: '* is a wildcard: it matches any file ending in .log.',
    }),
  ]),

  lesson('git-undo', 'Undo safely', 'git', ['git restore discards uncommitted changes', 'git revert undoes a commit with a new commit', 'Avoid rewriting shared history'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Everyone makes mistakes',
      body: 'Not committed yet? git restore file throws away your edits. Committed and pushed? git revert <hash> makes a new commit that undoes it, which is safe on shared branches.',
      lang: 'bash',
      code: ['git restore index.html', 'git revert a1b2c3d'],
      tip: 'git reset --hard deletes work. Use it only when you are sure.',
    }),
    quiz({
      prompt: 'A bad commit is already on GitHub and teammates pulled it. Safest fix?',
      options: ['git revert <hash>', 'git reset --hard', 'Delete the repo', 'git init again'],
      mono: true,
      right: 'revert adds an undo commit without rewriting shared history.',
      wrong: 'Rewriting pushed history breaks teammates\' copies. revert is the safe choice.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Throw away edits',
      instructions: 'Tap the command that discards your uncommitted changes to app.js.',
      lang: 'bash',
      lines: ['git revert a1b2c3d', 'git restore app.js'],
      target: { line: 1, token: 'restore' },
      explain: 'restore resets the file to the last commit.',
    }),
  ]),
];
