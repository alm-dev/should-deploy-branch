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
    const pythonPath = await io.which('echo', true);
    await exec.exec(`"${pythonPath}"`, [`"${name}=${value}" >> $GITHUB_ENV`]);
}
