/**
 * Converts album duration from ms to X hr, Y min.
 * @param {string} ms - Album duration in milliseconds.
 * @returns Album duration in X hr, Y min.
 */
export function convertAlbumDuration(ms: number | string) {
    const millis = Number(ms)
    const hours = Math.floor(millis / 1000 / 60 / 60)
    const minutes = Math.floor((millis / 1000 / 60) % 60)
    const seconds = Math.floor((millis / 1000) % 60)

    if (hours > 0) return `${hours} h ${minutes} min`
    else return `${minutes} min ${seconds} sec`
}
