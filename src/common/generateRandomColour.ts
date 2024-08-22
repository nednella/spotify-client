/**
 * Generate a random RGB colour.
 * @returns an array of 3 random integers 0-255.
 */
export function generateRandomColour() {
    return [
        Math.floor(Math.random() * 256).toString(),
        Math.floor(Math.random() * 256).toString(),
        Math.floor(Math.random() * 256).toString(),
    ]
}
