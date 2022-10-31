import * as exec from '@actions/exec';
import * as github from '@actions/github';

/**
 * Download branch configs
 *
 * @public
 * @async
 * @param branchName - Branch name to download e.g. "qa", "sit", etc
 */
export async function downloadBranchConfigs(branchName: string, options: {
  githubWorkspace: string;
  githubToken: string;
}): Promise<{
  branchName: string;
  branchConfigWorkspace: string;
}> {
  const {
    githubWorkspace,
    githubToken,
  } = options;

  const WORK_DIR = `${githubWorkspace}-configs/`;
  const SERVICE_FULL_NAME = github.context.payload.repository?.full_name;

  await exec.exec('git config --global user.email "almteam@se.com"');
  await exec.exec('git config --global user.name "ALM Team"');

  await exec.exec([
    'git clone -b', branchName,
    `"https://alm-dev:${githubToken}@github.com/${SERVICE_FULL_NAME}-configs.git"`,
    `"${WORK_DIR}"`,
  ].join(' '));

  await exec.exec(`ls -l ${WORK_DIR}`);

  // Return something
  return {
    branchConfigWorkspace: WORK_DIR,
    branchName,
  };
}
