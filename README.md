# should-deploy-branch

Whether or not, should allow to deploy current branch

## Inputs (with:)

```allow_branches``` - {string} - Comma-separated list of branches to allow e.g. "dev, qa, sit, ..."

## Env vars (env:)

```GITHUB_WORKSPACE``` - Workspace of current performing git action

```GITHUB_TOKEN``` - Access token to access github to download config repo

## Outputs

```current_branch``` - {string} - Name of the current branch

```should_deploy``` - {boolean} - Whether or not to allow deploy.

```allow_branches``` - {string} - Comma-separated list of branches to allow e.g. "dev, qa, sit, ..."

```exports``` - {object} - For best practices, all exported variables from the program should go here




