import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const currentBranch = core.getInput('current_branch');
  const allow_branches = core.getInput('allow_branches');

  console.log({
    currentBranch: currentBranch || '__none__',
    allow_branches: currentBranch || '__none__',
  });

  const time = (new Date()).toTimeString();
  core.setOutput('should_deploy', false);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(
    (error as unknown as Error).message
  );
}