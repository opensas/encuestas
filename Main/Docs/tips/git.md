# git tips

## remove feature branches that have already been merged

```shell
# In Git workflows (like GitHub Flow or GitLab Flow), feature branches are usually
# created for new tasks, merged into the main branch (e.g. master or main) via
# pull requests/merge requests, and then deleted on the remote repository.
# This cleanup command ensures that local copies of those feature branches
# (that have already been deleted remotely) are also removed.

# First, prune local references to branches deleted on the remote
git fetch --prune

# Then, list local branches with verbose info,
# filter those marked as ": gone]",
# and delete them one by one
git branch --verbose --verbose \
  | awk '/: gone]/{print $1}' \
  | xargs --no-run-if-empty git branch --delete
```

If git says `error: The branch is not fully merged.` you can run the same commant with `--force`

```shell
git branch --verbose --verbose \
  | awk '/: gone]/{print $1}' \
  | xargs --no-run-if-empty git branch --delete --force
```
