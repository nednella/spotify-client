/**
 * Converts track date added from JS Date object in UTC to a formatted date string.
 * @param {string} stringDate - Date added, in UTC.
 * @returns Track date added in a formatted date string.
 */
export function convertTrackDateAdded(stringDate: string) {
    const date = new Date(stringDate)
    const now = new Date()

    const timeDifference = Math.abs(now.getTime() - date.getTime())
    const minuteDifference = Math.floor(timeDifference / (1000 * 60))
    const hourDifference = Math.floor(minuteDifference / 60)
    const dayDifference = Math.floor(hourDifference / 24)
    const weekDifference = Math.floor(dayDifference / 7)

    if (minuteDifference < 1) {
        return 'added just now'
    }

    if (minuteDifference < 60) {
        return `${minuteDifference} minute${minuteDifference > 1 ? 's' : ''} ago`
    }

    if (hourDifference < 24) {
        return `${hourDifference} hour${hourDifference > 1 ? 's' : ''} ago`
    }

    if (dayDifference < 7) {
        return `${dayDifference} day${dayDifference > 1 ? 's' : ''} ago`
    }

    if (weekDifference < 5) {
        return `${weekDifference} week${weekDifference > 1 ? 's' : ''} ago`
    }

    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}
