import { trim } from 'lodash';
import * as core from '@actions/core';
import * as fs from 'fs';
import * as yaml from 'yamljs';
import { GITHUB_WORKFLOW_EXPORT_RELATIVE_PATH } from './constants';

/**
 * Extract workflow export variables for github action
 *
 * @public
 * @async
 * @param branchConfigWorkspace - Config directory to extract from. `{branchConfigWorkspace}/exports/github_workflows.yml`
 * @returns - Exported config object
 */
export async function extractWorkflowExports(branchConfigWorkspace: string): Promise<{
  [key: string]: string | number | boolean | any;
} | undefined> {
  const dir = trim(branchConfigWorkspace, '/').trim();
  const workflowPath = trim(GITHUB_WORKFLOW_EXPORT_RELATIVE_PATH, '/');
  const path = `${dir}/${workflowPath}`;

  // Base case
  if (!fs.existsSync(path)) {
    return undefined;
  }

  try {
    const ymlStr = fs.readFileSync(path);
    console.log('yml string', ymlStr);
    const result = yaml.parse(ymlStr);
    return result;
  } catch (e) {
    core.setFailed(`Unable to parse ${path}. Invalid yaml file.`);
  }
}
