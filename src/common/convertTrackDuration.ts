/**
 * Converts track duration from ms to minutes:seconds.
 * @param {string} ms - Track duration in milliseconds.
 * @returns Track duration in minutes:seconds format with padded seconds if applicable.
 */
export function convertTrackDuration(ms: number | string) {
    const millis = Number(ms)
    const minutes = Math.floor(millis / 1000 / 60).toString()
    let seconds = Math.floor((millis / 1000) % 60).toString()
    if (seconds.length === 1) {
        seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
}
