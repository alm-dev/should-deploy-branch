import { downloadBranchConfigs } from './utils/dowloadConfigUtils';
import { extractWorkflowExports } from './utils/extractWorkflowExports';
import { shouldAllowBranch } from './utils';
import * as core from '@actions/core';

/**
 * Entry function
 */
async function run(): Promise<
  number | undefined
> {
  // Extract input parameters
  const inputAllowBranches = core.getInput('allow_branches');
  const inputGithubWorkspace = process.env.GITHUB_WORKSPACE as string;
  const inputGithubToken = process.env.GITHUB_TOKEN as string;

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

  // Download configs
  const { branchConfigWorkspace } = await downloadBranchConfigs(
    branch,
    {
      githubWorkspace: inputGithubWorkspace,
      githubToken: inputGithubToken,
    }
  );

  // Export config for github actions
  const githubWorkflowExports =
    await extractWorkflowExports(branchConfigWorkspace);

  // Print out result
  console.log('outputs', {
    current_branch: branch,
    allow_branches: allowedBranches.join(', '),
    should_deploy: shouldAllow,
    exports: githubWorkflowExports || {},
  });

  //Set output
  core.setOutput('exports', githubWorkflowExports || {});
  core.setOutput('should_deploy', JSON.stringify(shouldAllow));
  core.setOutput('allow_branches', allowedBranches.join(', '));
  core.setOutput('current_branch', branch);
}


/**
 * Start the game
 */
run()
  .then(() => console.log('done'))
  .catch((err: Error) => {
    console.log('error', JSON.stringify(err));
    core.setFailed(`Unexpected fail - ${err.message}`);
  });
