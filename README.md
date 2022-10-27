# should-deploy-branch

Whether or not, should allow to deploy current branch

## Inputs

```current_branch``` - {string} The current branch name to be checked

```allow_branches``` - {string} - Comma-separated list of branches to allow e.g. "dev, qa, sit, ..."

## Outputs

```should_deploy``` - {boolean} - Whether or not to allow deploy.

