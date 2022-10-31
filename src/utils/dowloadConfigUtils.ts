import * as io from '@actions/io';
import * as exec from '@actions/exec';

export async function downloadBranchConfigs(input: {
  branch: string;
}): Promise<
  void
> {
  const WORK_DIR = 'hello sinh nguyen work dir';
  await exec.exec('git', ['--global user.email "almteam@se.com']);
  await exec.exec('git', ['--global user.name "ALM Team']);
  await exec.exec("echo", ['$WOR_DIR'], {
    env: {
      WORK_DIR,
    }
  });

    // #     git config --global user.email "almteam@se.com"
    //   #     git config --global user.name "ALM Team"
    //   #     WORK_DIR=${RUNNER_WORKSPACE}/${SERVICE_NAME}-config
    //   #     if [ -d "$WORK_DIR" ]; then rm -rf $WORK_DIR; fi
    //   #     echo "$WOR_DIR"
    //   #     git clone -b ${BRANCH_NAME} https://alm-dev:${GIT_ACTION_TOKEN}@github.com/alm-dev/${SERVICE_NAME}-configs.git $WORK_DIR
    //   #     ls -l $WORK_DIR
    //   #     cp -p -r $WORK_DIR/configs $_/theConfigs
    //   #     ls -l
}