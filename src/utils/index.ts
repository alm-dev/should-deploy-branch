import * as github from '@actions/github';
import { DEFAULT_ALLOWED_BRANCHES } from './constants';

/**
 * Get a list of allowed branches.
 *
 * @param extendedBranchNames - Comma-separated list of extra branches to be allowed.
 * @returns - Allowed branches
 */
export function getAllowedBranches(extendedBranchNames?: string): string[] {
  let allowBranches = DEFAULT_ALLOWED_BRANCHES;

  if (extendedBranchNames) {
    const sp = extendedBranchNames.trim().split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    if (sp.length > 0) {
      allowBranches = [...allowBranches, ...sp];
    }
  }

  return allowBranches;
}

/**
 * Extract current branch name from github
 *
 * @returns - Extracted current branch
 */
export function getCurrentBranchName(): string {
  const headRef = github.context.ref;
  return headRef.replace('refs/heads/', '');
}

/**
 * Shoule allow branch
 *
 * @public
 * @param extendedBranchName - Comma separated list of extended allowed branch name e.g. "some_branch, some_other_branch"
 * @returns - Result of validation
 */
export function shouldAllowBranch(extendedBranchName?: string): {
  branch: string;
  shouldAllow: boolean;
  allowedBranches: string[];
} {
  const allowedBranches = getAllowedBranches(extendedBranchName);
  const branch = getCurrentBranchName();
  return {
    branch,
    allowedBranches,
    shouldAllow: allowedBranches.indexOf(branch) > -1,
  };
}


/**
 * Sleep
 *
 * @public
 * @async
 * @param ms - Number of millisecond to sleep
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
