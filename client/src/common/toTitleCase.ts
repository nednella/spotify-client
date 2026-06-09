/**
 * Converts a string to titlecase. E.g. 'hello world' -> 'Hello World'.
 * @param str - Input string to be converted.
 * @returns - A string in title case format.
 */
export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}
