import { GITHUB_WORKFLOW_EXPORT_RELATIVE_PATH } from './constants';
import { trimEnd, trim, isArray } from 'lodash';
import * as core from '@actions/core';
import * as fs from 'fs';
import * as yaml from 'yamljs';

/**
 * Extract workflow export variables for github action
 *
 * @public
 * @async
 * @param options - Config directory to extract from. `{branchConfigWorkspace}/exports/github_workflows.yml`
 * @returns - Exported config object
 */
export async function extractWorkflowExports(options: {
  srcDir: string;
  srcPaths: string | string[];
}): Promise<
  Record<string, any> | undefined
> {
  const srcDir = options.srcDir;
  const srcPaths = isArray(options.srcPaths) ? options.srcPaths : [options.srcPaths];

  const dir = trimEnd(srcDir, '/').trim();

  let ret = undefined as unknown as Record<string, any>;
  let workflowExportFile;

  try {
    for (let i = 0; i < srcPaths.length; i++) {
      const workflowPath = trim(srcPaths[i], '/');

      workflowExportFile = `${dir}/${workflowPath}`;

      if (!fs.existsSync(workflowExportFile)) continue;

      const ymlStr = fs.readFileSync(workflowExportFile, 'utf8');
      const result = yaml.parse(ymlStr);

      if (result) {
        ret = {
          ...ret,
          ...result,
        };
      }
    }

  } catch (e) {
    core.setFailed(`Unable to parse ${workflowExportFile}. Invalid yaml file.`);
  }

  return ret;
}
