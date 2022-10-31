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
