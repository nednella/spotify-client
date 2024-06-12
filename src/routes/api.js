import express from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

import fetchLibraryItems, {
    processTrackData,
    processPlaylistData,
    processAlbumData,
    processArtistData,
} from '../common/helpers/fetchLibraryItems.js'

import { SPOTIFY_API_PAGINATION_LIMIT } from '../common/constants/variables.js'

const router = express.Router()

/* API ROUTE MIDDLEWARE */
router.use(sessionAuth)
router.use(tokenExpiry)

/* API ROUTES */
router.get(
    '/user/library',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const limit = SPOTIFY_API_PAGINATION_LIMIT

        const getTracks = async (access_token, limit, offset) => {
            const response = await spotifyAPI.getMeTracks(access_token, limit, offset)
            return response.data
        }

        const getPlaylists = async (access_token, limit, offset) => {
            const response = await spotifyAPI.getMePlaylists(access_token, limit, offset)
            return response.data
        }

        const getAlbums = async (access_token, limit, offset) => {
            const response = await spotifyAPI.getMeAlbums(access_token, limit, offset)
            return response.data
        }

        const getArtists = async (access_token, limit, after) => {
            const response = await spotifyAPI.getMeArtists(access_token, limit, after)
            return response.data
        }

        const [allTracks, allPlaylists, allAlbums, allArtists] = await Promise.all([
            fetchLibraryItems(getTracks, access_token, limit, processTrackData),
            fetchLibraryItems(getPlaylists, access_token, limit, processPlaylistData),
            fetchLibraryItems(getAlbums, access_token, limit, processAlbumData),
            fetchLibraryItems(getArtists, access_token, limit, processArtistData),
        ])

        res.status(200).json({
            tracks: allTracks,
            playlists: allPlaylists,
            albums: allAlbums,
            artists: allArtists,
        })
    })
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
