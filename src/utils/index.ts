import * as io from '@actions/io';
import * as exec from '@actions/exec';

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
    await sleep(5000);
    // await exec.exec(`"${echoPath}"`, [`"${name}=${value}" >> $GITHUB_ENV`]);
}
