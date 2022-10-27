# should-deploy-branch

Whether or not, should allow to deploy current branch

## Inputs

```current_branch``` - {string} The current branch name to be checked

```allow_branches``` - {string[]} - Branches to allow e.g.

```
allow_branches:
  - dev
  - qa
  - sit
  - ppr, ppr-eu, ppr-aps
```

## Outputs

```should_deploy``` - {boolean} - Whether or not to allow deploy.

