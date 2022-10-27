# should-deploy-branch

Whether or not, should allow to deploy current branch

## Inputs

```current_branch``` - The current branch name to be checked

```allow_branches``` - An array of branches to allow e.g.

```
allow_branches:
  - dev
  - qa
  - sit
  - ppr, ppr-eu, ppr-aps
```