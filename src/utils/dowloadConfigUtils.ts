import * as io from '@actions/io';
import * as exec from '@actions/exec';
import * as github from '@actions/github';

export async function downloadBranchConfigs(input: {
  branch: string;
}): Promise<
  void
> {
  const {
    branch,
  } = input;

  const {
    GITHUB_WORKSPACE,
    GIT_ACTION_TOKEN,
  } = process.env;

  const WORK_DIR = `${GITHUB_WORKSPACE}-configs/`;

  const SERVICE_FULL_NAME = github.context.payload.repository?.full_name;

  await exec.exec('git config --global user.email "almteam@se.com"');
  await exec.exec('git config --global user.name "ALM Team"');

  await exec.exec([
    'git clone -b', branch,
    `"https://alm-dev:${GIT_ACTION_TOKEN}@github.com/${SERVICE_FULL_NAME}-configs.git"`,
    `"${WORK_DIR}"`,
  ].join(' '));

  await exec.exec(`ls -l ${WORK_DIR}`);



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