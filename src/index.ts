import { downloadBranchConfigs } from './utils/dowloadConfigUtils';
import { extractWorkflowExports } from './utils/extractWorkflowExports';
import { shouldAllowBranch } from './utils';
import * as core from '@actions/core';
import * as github from '@actions/github';

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
  const githubStepId = (github.context.action || 'sdb');

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

  console.log('payload', JSON.stringify(github));

  // Download configs
  const { branchConfigWorkspace } = await downloadBranchConfigs(
    branch,
    {
      githubWorkspace: inputGithubWorkspace,
      githubToken: inputGithubToken,
    }
  );

  // Extract exporting config for github actions
  let exps = {};
  const githubWorkflowExports = await extractWorkflowExports(branchConfigWorkspace);
  if (githubWorkflowExports) {
    exps = Object.keys(githubWorkflowExports).reduce((obj, key) => {
      const outputKey = `${githubStepId}_${key}`;
      const outputVal = githubWorkflowExports[key];
      obj[outputKey] = outputVal;
      return obj;
    }, {});
  }

  // Set output
  core.setOutput('should_deploy', JSON.stringify(shouldAllow));
  core.setOutput('allow_branches', allowedBranches.join(', '));
  core.setOutput('current_branch', branch);
  Object.keys(exps).forEach(key => core.setOutput(key, exps[key]));

  // Set process env
  process.env = {
    ...process.env,
    ...exps,
  };

  // Print out result
  console.log('outputs', {
    current_branch: branch,
    allow_branches: allowedBranches.join(', '),
    should_deploy: shouldAllow,
    ...exps,
  });
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
