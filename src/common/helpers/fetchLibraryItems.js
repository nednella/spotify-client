/**
 *
 * @param {function} fetchFn - API fetch function that returns response.data.
 * @param {string} access_token - Authenticated user's access token.
 * @param {number} limit - Spotify API pagination page limit.
 * @param {*} processData - Function to process the data returned from the fetchFn.
 * @returns An array of the requested data.
 */
const fetchLibraryItems = async (fetchFn, access_token, limit, processData) => {
    let items = [],
        total = 1,
        offset = 0,
        after = ''

    while (items.length < total) {
        const data = await fetchFn(access_token, limit, offset)
        if (!data) break

        const fetchedItems = processData(data)
        if (!fetchedItems) break

        items = items.concat(fetchedItems.items)
        total = fetchedItems.total
        offset += fetchedItems.limit
        after = fetchedItems.after || '' // Only relevant for getArtists.
    }

    return items
}

// Data parsing functions.
// Most responses contain paginated data, which is not needed as I'm looping until all data is pulled, by comparing quantity of stored data to the specified total in the response.
// Functions should parse data to return required parameters, according to the data structures presented in the Spotify API docs.

// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export const processPlaylistData = (data) => ({
    items: data.items,
    total: data.total,
    limit: data.limit,
})

// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
export const processAlbumData = (data) => ({
    items: data.items.map((item) => ({ ...item.album })),
    total: data.total,
    limit: data.limit,
})

// https://developer.spotify.com/documentation/web-api/reference/get-followed
export const processArtistData = (data) => ({
    items: data.artists.items,
    total: data.artists.total,
    after: data.artists.cursors.after,
})

export default fetchLibraryItems
