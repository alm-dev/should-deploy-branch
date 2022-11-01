import { GITHUB_WORKFLOW_EXPORT_RELATIVE_PATH } from './constants';
import { trimEnd, trim } from 'lodash';
import * as core from '@actions/core';
import * as io from '@actions/io';
import * as fs from 'fs';
import * as yaml from 'yamljs';

type CopyBranchConfigInput = {
  srcDir: string;
  destDir: string;
}

/**
 * Copy configs files to destination
 *
 * @public
 * @async
 * @param options - Config directory to extract from. `{branchConfigWorkspace}/exports/github_workflows.yml`
 * @returns - Exported config object
 */
export async function copyBranchConfigs(options: CopyBranchConfigInput): Promise<
  void
> {
  const files = [
    {
      srcFile: '/aws/serverless/providers/environment.yml',
      destFile: '/serverless/providers/environment.yml',
    },
    {
      srcFile: '/aws/serverless.yml',
      destFile: '/serverless.yml',
    }
  ]

  const srcDir = trimEnd(options.srcDir, '/').trim();
  const destDir = trimEnd(options.destDir, '/').trim();

  const promises = files
    .map(f => ({
      srcFile: `${srcDir}${f.srcFile}`,
      destFile: `${destDir}${f.destFile}`,
    }))
    .map(f => io.cp(
      f.srcFile,
      f.destFile,
    ));

  // Wait for all
  await Promise.all(promises);
}
