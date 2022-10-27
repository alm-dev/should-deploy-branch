import * as core from '@actions/core';
import { isString } from 'lodash';
import { DEFAULT_ALLOWED_BRANCHES } from './constants';

const inputCurrentBranch = core.getInput('current_branch');
const inputAllowBranches = core.getInput('allow_branches');

let allowBranches = DEFAULT_ALLOWED_BRANCHES;
if (isString(inputAllowBranches)) {
  const sp = inputAllowBranches.trim().split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
  if (sp.length > 0) {
    allowBranches = [...allowBranches, ...sp];
  }
}

console.log({
  current_branch: inputCurrentBranch,
  allow_branches: allowBranches.join(', '),
})

const shouldAllow = allowBranches.indexOf(inputCurrentBranch) > -1;

if (shouldAllow) {
  core.setOutput('should_deploy', JSON.stringify(shouldAllow));
  core.setOutput('allow_branches', allowBranches.join(', '));
} else {
  core.setFailed(`Branch "${inputCurrentBranch}" is not allowed to deployed.`);
}
