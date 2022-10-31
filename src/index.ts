import * as core from '@actions/core';
import { shouldAllowBranch } from './utils';
import { downloadBranchConfigs } from './utils/dowloadConfigUtils';

/**
 * Entry function
 */
async function run(): Promise<
  number | undefined
> {
  // Extract input parameters
  const inputAllowBranches = core.getInput('allow_branches');

  // Perform to validate whether or not allow branch to deploy
  const { branch, shouldAllow, allowedBranches }
    = shouldAllowBranch(inputAllowBranches);

  // Base case, throw if branch is not allowed to deploy
  if (!shouldAllow) {
    core.setFailed([
      '\n**************************************************',
      `Branch "${branch}" is not allowed to deployed.`,
      '**************************************************'
    ].join('\n'));
    return 1;
  }

  // Export
  await downloadBranchConfigs({ branch });

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
