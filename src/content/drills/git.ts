// Extra practice for each Git module.
import { bug, order, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · GIT';

export const GIT_DRILLS: Record<string, Step[]> = {
  'git-why': [
    quiz({ prompt: 'Which problem does version control solve?', options: ['Keeping every version and knowing what changed and why', 'Making code run faster', 'Designing logos', 'Hosting websites'], right: 'Right.', wrong: 'Version control records history so you can compare and go back.' }),
    quiz({ prompt: 'Does Git need the internet to make a commit?', options: ['No, commits are saved on your computer', 'Yes, always', 'Only on Mondays', 'Only for the first commit'], right: 'Right. You only need a network to push or pull.', wrong: 'Git works locally; remotes are optional.' }),
    quiz({ prompt: 'What does a good commit message describe?', options: ['What the change does, like “Add fees table”', 'Your mood', 'The date', 'Nothing: leave it empty'], right: 'Right.', wrong: 'Messages should tell the reader what the change does.' }),
  ],
  'git-init': [
    order({ kicker: K, title: 'Set up Git', instructions: 'Arrange the one-time setup, then start a repository.', lang: 'bash', lines: ['git config --global user.name "Ava Patil"', 'git config --global user.email "ava@example.com"', 'git init'], explain: 'Identity first (once per computer), then git init in each project.' }),
    quiz({ prompt: 'What does git init create?', options: ['A hidden .git folder that stores the history', 'A website', 'A copy of every file', 'A GitHub account'], right: 'Right.', wrong: 'git init creates .git, the repository itself.' }),
    quiz({ prompt: 'What does --global do in git config --global user.name "Ava"?', options: ['Saves the setting for every repository on this computer', 'Uploads it to GitHub', 'Applies only to this folder', 'Deletes the old name'], right: 'Right.', wrong: '--global stores it for your user account, so every repository uses it.' }),
  ],
  'git-commit': [
    quiz({ prompt: 'git status --short shows "?? notes.txt". What does ?? mean?', options: ['Untracked: Git isn’t tracking it yet', 'Deleted', 'Staged', 'Conflicted'], right: 'Right.', wrong: '?? marks untracked files. git add starts tracking them.', mono: true }),
    quiz({ prompt: 'Which stages every changed file in the folder?', options: ['git add .', 'git commit .', 'git stage all', 'git push .'], right: 'Right. Check git status first so you don’t add something by accident.', wrong: 'git add . stages everything in the current folder.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Nothing gets committed. Tap the buggy line.', lang: 'bash', lines: ['echo "Fees: 2000" > fees.txt', 'git commit -m "Add fees"'], bug: 1, fix: 'git add fees.txt && git commit -m "Add fees"', explain: 'Stage the file before committing.' }),
    quiz({ prompt: 'Which commit message is best?', options: ['Fix broken link on fees page', 'stuff', 'changes', 'Fixed things and also changed CSS and added a page'], right: 'Right: specific and about one change.', wrong: 'Say exactly what the commit does, one change per commit.', mono: true }),
  ],
  'git-history': [
    quiz({ prompt: 'In a diff, what does a line starting with + mean?', options: ['A line that was added', 'A line that was removed', 'A comment', 'A conflict'], right: 'Right. − means removed.', wrong: '+ lines were added; − lines were removed.' }),
    quiz({ prompt: 'Which shows one line per commit?', options: ['git log --oneline', 'git show', 'git diff', 'git status'], right: 'Right.', wrong: '--oneline gives a short hash and the message for each commit.', mono: true }),
    quiz({ prompt: 'What does git show HEAD~2 show?', options: ['The commit two before the current one', 'The second commit ever', 'Two commits at once', 'The next two commits'], right: 'Right.', wrong: 'HEAD~2 steps back two parents from where you are.', mono: true }),
  ],
  'git-branch': [
    quiz({ prompt: 'Which creates a branch and moves onto it?', options: ['git switch -c fix-link', 'git switch fix-link', 'git branch -d fix-link', 'git merge fix-link'], right: 'Right.', wrong: '-c creates it; plain git switch only moves to an existing branch.', mono: true }),
    quiz({ prompt: 'In git branch output, what does * mark?', options: ['The branch you are on', 'The newest branch', 'A deleted branch', 'The remote'], right: 'Right.', wrong: '* marks the current branch.' }),
    quiz({ prompt: 'What is a good branch name?', options: ['add-contact-form', 'branch1', 'asdf', 'new'], right: 'Right: it says what the work is.', wrong: 'Name branches after the work they contain.', mono: true }),
  ],
  'git-merge': [
    quiz({ prompt: 'What is a fast-forward merge?', options: ['main just moves forward because it had no new commits', 'A merge that skips tests', 'Deleting a branch', 'A merge with conflicts'], right: 'Right.', wrong: 'If main didn’t move, Git only moves the label forward: no merge commit.' }),
    quiz({ prompt: 'A merge stops with conflicts and you want to start again. Which command?', options: ['git merge --abort', 'git reset --hard', 'git branch -D main', 'git push'], right: 'Right. It puts everything back as it was before the merge.', wrong: 'git merge --abort cancels the merge safely.', mono: true }),
    order({ kicker: K, title: 'Finish a conflicted merge', instructions: 'Arrange the steps after Git reports a conflict.', lang: 'bash', lines: ['# edit index.html and remove the markers', 'git add index.html', 'git commit -m "Merge feature"'], explain: 'Fix the file, stage it, then commit to finish the merge.' }),
  ],
  'git-remote': [
    quiz({ prompt: 'What is origin?', options: ['The usual name for the remote you cloned from', 'The first commit', 'The main branch', 'A command'], right: 'Right.', wrong: 'origin is the default name for your remote repository.' }),
    quiz({ prompt: 'Your push is rejected because the remote has commits you don’t. What first?', options: ['git pull, fix any conflicts, then push', 'Force push', 'Delete the remote', 'Make a new repository'], right: 'Right.', wrong: 'Bring in their work first with git pull, then push.' }),
    quiz({ prompt: 'What does -u do in git push -u origin add-form?', options: ['Remembers origin/add-form as the upstream for later push and pull', 'Undoes the push', 'Updates Git', 'Uploads every branch'], right: 'Right.', wrong: '-u (--set-upstream) remembers where this branch pushes and pulls.' }),
  ],
  'git-pr': [
    quiz({ prompt: 'What does a pull request do?', options: ['Asks for your branch to be reviewed and merged', 'Downloads code', 'Deletes a branch', 'Creates a repository'], right: 'Right.', wrong: 'A PR proposes merging a branch, with review and checks.' }),
    quiz({ prompt: 'Which should a PR description include?', options: ['Why the change is needed and how you tested it', 'Your password', 'Nothing', 'Every file name'], right: 'Right.', wrong: 'Explain the why and the testing so reviewers can check it.' }),
    quiz({ prompt: 'git branch -d refuses: “not fully merged”. What does that mean?', options: ['The branch has commits that aren’t on main yet', 'The branch name is wrong', 'Git is broken', 'You need the internet'], right: 'Right. Merge it, or use -D if you really want to throw them away.', wrong: 'Git protects commits that would otherwise be lost.' }),
  ],
  'git-ignore': [
    quiz({ prompt: 'Which pattern ignores every file ending in .log?', options: ['*.log', 'log', '.log/', 'all.log'], right: 'Right.', wrong: '* matches anything, so *.log matches every .log file.', mono: true }),
    quiz({ prompt: 'What does build/ in .gitignore match?', options: ['A folder named build', 'Only a file named build', 'Every file', 'Nothing'], right: 'Right.', wrong: 'A trailing slash means a directory.', mono: true }),
    quiz({ prompt: 'Which command stops tracking .env but keeps it on your computer?', options: ['git rm --cached .env', 'git rm .env', 'git restore .env', 'git ignore .env'], right: 'Right.', wrong: '--cached removes it from Git only; plain git rm deletes the file too.', mono: true }),
  ],
  'git-undo': [
    quiz({ prompt: 'You edited index.html and want the last committed version back. Which command?', options: ['git restore index.html', 'git revert index.html', 'git push', 'git branch index.html'], right: 'Right. Your edits to that file are discarded.', wrong: 'git restore file returns it to the last commit.', mono: true }),
    quiz({ prompt: 'Why is git revert safe after pushing?', options: ['It adds a new commit instead of rewriting history', 'It deletes the remote', 'It doesn’t change anything', 'It makes a branch'], right: 'Right.', wrong: 'revert adds an undo commit, so others’ history stays valid.' }),
    quiz({ prompt: 'When is git commit --amend okay?', options: ['Before you have pushed the commit', 'Any time', 'Only on main after pushing', 'Never'], right: 'Right. Amending rewrites the commit.', wrong: 'Amend only commits that nobody else has yet.' }),
  ],
  'git-stash': [
    quiz({ prompt: 'What does git stash pop do?', options: ['Reapplies the newest stash and removes it from the list', 'Deletes all stashes', 'Pushes to GitHub', 'Creates a branch'], right: 'Right.', wrong: 'pop reapplies and drops; apply reapplies and keeps it.' }),
    quiz({ prompt: 'Which includes untracked files in the stash?', options: ['git stash -u', 'git stash list', 'git stash pop', 'git stash --staged'], right: 'Right.', wrong: 'By default stash only saves tracked files; -u adds untracked ones.', mono: true }),
    order({ kicker: K, title: 'Pause for an urgent fix', instructions: 'Arrange the steps.', lang: 'bash', lines: ['git stash', 'git switch main', 'git commit -am "Fix fees page"', 'git switch add-form', 'git stash pop'], explain: 'Stash, fix on main, come back and pop.' }),
  ],
};
