import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const currentBranch = core.getInput('current_branch');
  const allow_branches = core.getInput('allow_branches');

  console.log({
    currentBranch: currentBranch || '__none__',
    allow_branches: allow_branches || '__none__',
  });

  const time = (new Date()).toTimeString();
  core.setOutput('should_deploy', JSON.stringify(false));

} catch (error) {
  core.setFailed(
    (error as unknown as Error).message
  );
}