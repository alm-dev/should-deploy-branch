import * as core from '@actions/core';
import * as github from '@actions/github';
import { isString } from 'lodash';
import { DEFAULT_ALLOWED_BRANCHES } from './utils/constants';
import { setGithubEnv  } from './utils';

async function run() {
  const inputCurrentBranch = core.getInput('current_branch');
  const inputAllowBranches = core.getInput('allow_branches');
  const inputGithubEnv = core.getInput('github_env');

  await setGithubEnv('SINH', 'YES NGUYEN');

  console.log("input github env", inputGithubEnv || '__none__');

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  let allowBranches = DEFAULT_ALLOWED_BRANCHES;
  if (isString(inputAllowBranches)) {
    const sp = inputAllowBranches.trim().split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    if (sp.length > 0) {
      allowBranches = [...allowBranches, ...sp];
    }
  }

  const shouldAllow = allowBranches.indexOf(inputCurrentBranch) > -1;

  console.log({
    current_branch: inputCurrentBranch,
    allow_branches: allowBranches.join(', '),
    should_deploy: shouldAllow,
  });

  if (shouldAllow) {
    core.setOutput('should_deploy', JSON.stringify(shouldAllow));
    core.setOutput('allow_branches', allowBranches.join(', '));
    core.setOutput('current_branch', inputAllowBranches);
  } else {
    core.setFailed(`Branch "${inputCurrentBranch}" is not allowed to deployed.`);
  }


}

run();