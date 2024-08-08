# Git Hooks

Git has a way to fire off custom scripts when certain important actions occur. The hooks are all stored in the hooks subdirectory of the Git directory. [Docs](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

-   To enable a hook script, put a file in the hooks subdirectory of your .git directory that is named appropriately (without any extension) and is executable. From that point forward, it should be called. We’ll cover most of the major hook filenames here.

1. `Client-Side Hooks`
    1. Committing-Workflow Hooks
        1. The `pre-commit` hook is run first, before you even type in a commit message. Exiting non-zero from this hook aborts the commit, although you can bypass it with git commit --no-verify.
        2. The `prepare-commit-msg` hook is run before the commit message editor is fired up but after the default message is created.
        3. The `commit-msg` hook takes one parameter, which again is the path to a temporary file that contains the commit message written by the developer.
        4. After the entire commit process is completed, the `post-commit` hook runs.
    2. Email Workflow Hooks
        1. `applypatch-msg`
        2. `pre-applypatch`
        3. `post-applypatch`
2. `Server-Side Hooks`
    1. `pre-receive`
    2. `update`
    3. `post-receive`

## Husky

[Docs](https://typicode.github.io/husky/)

Husky is a tool that makes it easy to manage Git hooks in a project. Git hooks are scripts that Git executes before or after events such as commit, push, and merge. Husky allows defining these hooks in the project's package.json file or in a separate configuration file.

## lint-staged

[GitHub](https://github.com/lint-staged/lint-staged)

lint-staged is a tool that runs linters (or other scripts) on staged files in Git. This means only the files that are going to be committed are linted, improving performance and ensuring only relevant files are checked.

## fs

[Docs](https://nodejs.org/api/fs.html)

The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.

-   Two types: Asynchronous and Synchronous

Common use for File System module:

-   Read Files
    -   fs.readFile
    -   fs.readFileSync
-   Write Files
    -   fs.writeFile
    -   fs.writeFileSync
-   Read the content of directory
    -   fs.readdir
    -   fs.readdirSync
-   Get Stats
    -   fs.stat
    -   fs.statSync
