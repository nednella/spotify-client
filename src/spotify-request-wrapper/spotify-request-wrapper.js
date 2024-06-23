import AuthRequest from './auth-request.js'
import ApiRequest from './api-request.js'

export default class spotifyAPI {
    constructor(credentials, scope) {
        this.credentials = Object.assign({}, credentials)
        this.scope = scope
    }

    getClientId = () => {
        return this.credentials.client_id
    }

    getClientSecret = () => {
        return this.credentials.client_secret
    }

    getRedirectUri = () => {
        return this.credentials.redirect_uri
    }

    getScope = () => {
        return this.scope
    }

    /*  AUTHENTICATION API ENDPOINT METHODS */

    /**
     * Retrieve URL in which the user can sign in with their Spotify account and grant permissions.
     * Docs URL: https://developer.spotify.com/documentation/web-api/concepts/authorization
     * @param {string} state - A parameter that you can use to maintain a value between the request and
     * the callback to redirect_uri. It is useful to prevent CSRF exploits.
     * @return {string} The URL where the user can give application permissions.
     */
    createAuthoriseURL = (state) => {
        return new AuthRequest()
            .setPath('/authorize')
            .setQueryParams({
                response_type: 'code',
                client_id: this.getClientId(),
                redirect_uri: this.getRedirectUri(),
                scope: this.scope.join('%20'),
                state: state,
                // TODO: showDialog - require approval for each login rather than auto-redirect
            })
            .build()
            .getURL()
    }

    /**
     * Request an access and refresh token using the authorisation code flow provided by Spotify's API.
     * Docs URL: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
     * @param {string} authCode - A code that the authorisation code flow provides within the callback URL.
     * @returns {Promise | undefined} A promise that if successful, resolves into an object containing the
     * access token, refresh token, token type and time to expiration. If rejected, it contains an error object.
     */
    authorisationCodeGrant = (authCode) => {
        return new AuthRequest()
            .setMethod('POST')
            .setPath('/api/token')
            .setHeaders({
                'content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    new Buffer.from(this.getClientId() + ':' + this.getClientSecret()).toString(
                        'base64'
                    ),
            })
            .setBodyParams({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: this.getRedirectUri(),
            })
            .build()
            .execute()
    }

    /**
     * Retrieve URL in which the user can sign in with their Spotify account and grant permissions.
     * Docs URL: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
     * @param {string} refreshToken - The token provided by Spotify's auth API to request new access tokens with.
     * @returns {Promise | undefined} A promise that if successful, resolves into an object containing the
     * refreshed access token, token type and time to expiration. If rejected, it contains an error object.
     */
    refreshAccessToken = (refreshToken) => {
        return new AuthRequest()
            .setMethod('POST')
            .setPath('/api/token')
            .setHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    new Buffer.from(this.getClientId() + ':' + this.getClientSecret()).toString(
                        'base64'
                    ),
            })
            .setBodyParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.getClientId(),
            })
            .build()
            .execute()
    }

    /*  WEB API ENDPOINT METHODS */

    /* USER ENDPOINTS */

    /**
     * Get detailed profile information about the curent user.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
     * @param {string} access_token - Authenticated user's access token.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getMe = (access_token) => {
        return new ApiRequest(access_token).setMethod('GET').setPath('/v1/me').build().execute()
    }

    /**
     * Get the current user's topa rtists or tracks based on calculated affinity, over a 1y, 6mo or 4 week duration.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
     * @param {*} access_token - Authenticated user's access token.
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @param {*} type - The type of entity to return. Valid values: 'artists', 'tracks'.
     * @param {*} time_range - Over what time from the affinities are computed. Valid values: 'long_term', 'medium_term', 'short_term'.
     * @returns - A promise that if successful, resolves into an object containing the requested information.
     */
    getMeTopItems = (access_token, limit, offset, type, time_range) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/me/top/${type}`)
            .setQueryParams({
                limit: limit || 20,
                offset: offset || 0,
                time_range: time_range,
            })
            .build()
            .execute()
    }

    /**
     * Get a list of the songs saved in the current user's library.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
     * @param {string} access_token - Authenticated user's access token.
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getMeTracks = (access_token, limit, offset) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath('/v1/me/tracks')
            .setQueryParams({
                limit: limit || 20,
                offset: offset || 0,
            })
            .build()
            .execute()
    }

    /**
     * Get a list of the playlists owned or followed by the current Spotify user.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
     * @param {string} access_token - Authenticated user's access token.
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getMePlaylists = (access_token, limit, offset) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath('/v1/me/playlists')
            .setQueryParams({
                limit: limit || 20,
                offset: offset || 0,
            })
            .build()
            .execute()
    }

    /**
     * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
     * @param {string} access_token - Authenticated user's access token.
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getMeAlbums = (access_token, limit, offset) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath('/v1/me/albums')
            .setQueryParams({
                limit: limit || 20,
                offset: offset || 0,
            })
            .build()
            .execute()
    }

    /**
     * Get the current user's followed artists.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-followed
     * @param {string} access_token - Authenticated user's access token.
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getMeArtists = (access_token, limit, after) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath('/v1/me/following')
            .setQueryParams({
                type: 'artist',
                limit: limit || 20,
                after: after || null,
            })
            .build()
            .execute()
    }

    /* MISC ENDPOINTS */
    // TODO: add check if user is following X among other misc calls

    /* ARTIST ENDPOINTS */

    /**
     * Get Spotify catalog information for a single artist.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-an-artist
     * @param {string} access_token - Authenticated user's access token.
     * @param {string} id - Unique artist Spotify ID.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getArtist = (access_token, id) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/artists/${id}`)
            .build()
            .execute()
    }

    /**
     * Get Spotify catalog information about an artist's top tracks by country. [country not provided -- defaults to user's specified country]
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
     * @param {string} access_token - Authenticated user's access token.
     * @param {string} id - Unique artist Spotify ID.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getArtistTopTracks = (access_token, id) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/artists/${id}/top-tracks`)
            .build()
            .execute()
    }

    /**
     * Get Spotify catalog information about an artist's albums.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
     * @param {string} access_token - Authenticated user's access token.
     * @param {string} id - Unique artist Spotify ID.
     * @param {*} include_groups - A comma-separated list of keywords used to filter the response. Valid values: album, single, appears_on, compilation
     * @param {number} limit - Spotify API pagination page limit.
     * @param {number} offset - Spotify API pagination page offset.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getArtistAlbums = (access_token, id, limit, offset, include_groups) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/artists/${id}/albums`)
            .setQueryParams({
                limit: limit || 20,
                offset: offset || 0,
                include_groups: include_groups,
            })
            .build()
            .execute()
    }

    /**
     * Get Spotify catalog information about artists similar to a given artist. Similarity based on analysis of Spotify community's listening history.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
     * @param {string} access_token - Authenticated user's access token.
     * @param {string} id - Unique artist Spotify ID.
     * @returns {Promise} - A promise that if successful, resolves into an object containing the requested information.
     */
    getArtistRelatedArtists = (access_token, id) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/artists/${id}/related-artists`)
            .build()
            .execute()
    }

    /* ALBUM ENDPOINTS */

    /**
     * Get Spotify catalog information for a single album.
     * Docs URL: https://developer.spotify.com/documentation/web-api/reference/get-an-album
     * @param {string} access_token - Authenticated user's access token.
     * @param {string} id - Unique album Spotify ID.
     * @returns - A promise that if successful, resolves into an object containing the requested information.
     */
    getAlbum = (access_token, id) => {
        return new ApiRequest(access_token)
            .setMethod('GET')
            .setPath(`/v1/albums/${id}`)
            .build()
            .execute()
    }
}
