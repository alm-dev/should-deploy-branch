import * as core from '@actions/core';
import * as github from '@actions/github';
import { shouldAllowBranch } from './utils';

/**
 * Entry function
 */
async function run(): Promise<
  number | undefined
> {
  // Extract input parameters
  const inputAllowBranches = core.getInput('allow_branches');
  const inputGithubEnv = core.getInput('github_env');

  console.log("input github env", inputGithubEnv || '__none__');
  console.log("github", JSON.stringify(github));
  console.log("github.context", JSON.stringify(github.context));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const { branch, shouldAllow, allowedBranches }
    = shouldAllowBranch(inputAllowBranches);

  // Base case, throw if branch is not allowed
  if (!shouldAllow) {
    core.setFailed([
      '**************************************************',
      `Branch "${branch}" is not allowed to deployed.`,
      '**************************************************'
    ].join('\n'));
    return 1;
  }

  // Print out result
  console.log({
    current_branch: branch,
    allow_branches: allowedBranches.join(', '),
    should_deploy: shouldAllow,
  });

  // Set out put
  core.setOutput('should_deploy', JSON.stringify(shouldAllow));
  core.setOutput('allow_branches', allowedBranches.join(', '));
  core.setOutput('current_branch', branch);

}


/**
 * Start the game
 */
run()
  .then(() => console.log('done'))
  .catch(() => console.log('error'));
