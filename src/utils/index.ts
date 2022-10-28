import * as io from '@actions/io';
import * as exec from '@actions/exec';

/**
 * Set github env variable
 *
 * @public
 * @async
 * @param name - Name of variable
 * @param value - Value of variable
 */
export async function setGithubEnv(name: string, value: string): Promise<void> {
    const echoPath = await io.which('echo', true);
    await exec.exec('echo', [`"${name}=${value}" >> $GITHUB_ENV`]);
    // await exec.exec(`"${echoPath}"`, [`"${name}=${value}" >> $GITHUB_ENV`]);
}
