/**
 *
 * @param {function} fetchFn - API fetch function that returns response.data.
 * @param {string} access_token - Authenticated user's access token.
 * @param {number} limit - Spotify API pagination page limit.
 * @param {number} itemCap - Loop will exit after reaching specified number of items. Default is uncapped. Must be set to 'undefined' for uncapped.
 * @param {Array} options - An array of additionally required items for the paginated API endpoint (e.g., artist ID, requested data type).
 * @param {function} processData - Function to process the data returned from fetchFn.
 * @returns An array of the requested data.
 */
const fetchPaginatedItems = async (fetchFn, access_token, limit, itemCap = Infinity, options, processData) => {
    let items = [],
        total = 1,
        offset = 0,
        after = ''

    while (items.length < total && items.length < itemCap) {
        const data = await fetchFn(access_token, limit, offset, ...options)
        if (!data) break

        const fetchedItems = processData(data)
        if (fetchedItems.items.length === 0) break // Total value often does not update and/or is incorrect. This break mitigates the infinite loop.

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

// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
export const processData = (data) => ({
    items: data.items,
    total: data.total,
    limit: data.limit,
})

// https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export const processPlaylistData = (data) => ({
    items: data.items.map((item) => ({ ...item.track })),
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

export default fetchPaginatedItems
