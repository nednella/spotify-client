import express from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

import fetchPaginatedItems, {
    processData,
    processAlbumData,
    processArtistData,
} from '../common/helpers/fetchItems.js'

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
            fetchPaginatedItems(getTracks, access_token, limit, [], processData),
            fetchPaginatedItems(getPlaylists, access_token, limit, [], processData),
            fetchPaginatedItems(getAlbums, access_token, limit, [], processAlbumData),
            fetchPaginatedItems(getArtists, access_token, limit, [], processArtistData),
        ])

        res.status(200).json({
            tracks: allTracks,
            playlists: allPlaylists,
            albums: allAlbums,
            artists: allArtists,
        })
    })
)

router.get(
    '/user/top-items',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const limit = SPOTIFY_API_PAGINATION_LIMIT

        const getUserTopItems = async (access_token, limit, offset, type, time_range) => {
            const response = await spotifyAPI.getMeTopItems(
                access_token,
                limit,
                offset,
                type,
                time_range
            )
            return response.data.items
        }

        const [top_tracks, top_artists] = await Promise.all([
            getUserTopItems(access_token, limit, 0, 'tracks', 'short_term'),
            getUserTopItems(access_token, limit, 0, 'artists', 'short_term'),
        ])

        res.status(200).json({
            top_tracks,
            top_artists,
        })
    })
)

router.get(
    '/artist/:id',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id } = req.params
        const limit = SPOTIFY_API_PAGINATION_LIMIT
        const data_types = 'single,album'

        const getArtist = async (access_token, id) => {
            const response = await spotifyAPI.getArtist(access_token, id)
            return response.data
        }

        const getTopTracks = async (access_token, id) => {
            const response = await spotifyAPI.getArtistTopTracks(access_token, id)
            return response.data.tracks
        }

        const getAlbums = async (access_token, limit, offset, id, include_groups) => {
            const response = await spotifyAPI.getArtistAlbums(
                access_token,
                id,
                limit,
                offset,
                include_groups
            )
            return response.data
        }

        const getRelated = async (access_token, id) => {
            const response = await spotifyAPI.getArtistRelatedArtists(access_token, id)
            return response.data.artists
        }

        const [artist, top_tracks, albums, related_artists] = await Promise.all([
            getArtist(access_token, id),
            getTopTracks(access_token, id),
            fetchPaginatedItems(getAlbums, access_token, limit, [id, data_types], processData),
            getRelated(access_token, id),
        ])

        res.status(200).json({
            artist: artist,
            top_tracks: top_tracks,
            albums: albums,
            related_artists: related_artists,
        })
    })
)

router.get(
    '/album/:id',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id } = req.params
        const limit = SPOTIFY_API_PAGINATION_LIMIT

        const getAlbum = async (access_token, id) => {
            const response = await spotifyAPI.getAlbum(access_token, id)
            return response.data
        }

        const [album] = await Promise.all([getAlbum(access_token, id)])

        res.status(200).json({ album })
    })
)

/* PLACEHOLDER ROUTE */
router.get(
    '',
    asyncHandler(async (req, res) => {})
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
