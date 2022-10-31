import { trimEnd, trim } from 'lodash';
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
  const dir = trimEnd(branchConfigWorkspace, '/').trim();
  const workflowPath = trim(GITHUB_WORKFLOW_EXPORT_RELATIVE_PATH, '/');

  const workflowExportFile = `${dir}/${workflowPath}`;

  console.log('file to export configs', workflowExportFile);

  // Base case
  if (!fs.existsSync(workflowExportFile)) {
    console.log('does not exist', workflowExportFile);
    return undefined;
  }

  try {
    const ymlStr = fs.readFileSync(workflowExportFile, 'utf8');
    console.log('yml string', ymlStr);
    const result = yaml.parse(ymlStr);
    return result;
  } catch (e) {
    core.setFailed(`Unable to parse ${workflowExportFile}. Invalid yaml file.`);
  }
}
