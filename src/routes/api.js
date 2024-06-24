import express from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

import fetchPaginatedItems, {
    processData,
    processPlaylistData,
    processAlbumData,
    processArtistData,
} from '../common/helpers/fetchPaginatedItems.js'

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
            fetchPaginatedItems(getTracks, access_token, limit, undefined, [], processData),
            fetchPaginatedItems(getPlaylists, access_token, limit, undefined, [], processData),
            fetchPaginatedItems(getAlbums, access_token, limit, undefined, [], processAlbumData),
            fetchPaginatedItems(getArtists, access_token, limit, undefined, [], processArtistData),
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
            const response = await spotifyAPI.getMeTopItems(access_token, limit, offset, type, time_range)
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
            const response = await spotifyAPI.getArtistAlbums(access_token, id, limit, offset, include_groups)
            return response.data
        }

        const getRelated = async (access_token, id) => {
            const response = await spotifyAPI.getArtistRelatedArtists(access_token, id)
            return response.data.artists
        }

        const [artist, top_tracks, albums, related_artists] = await Promise.all([
            getArtist(access_token, id),
            getTopTracks(access_token, id),
            fetchPaginatedItems(getAlbums, access_token, limit, undefined, [id, data_types], processData),
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

        // NOTE: default getAlbum retrieves 50 items. Should not need to create getAlbumTracks request method,
        // as the vast majority of albums do not contain more than 50 tracks.
        const getAlbum = async (access_token, id) => {
            const response = await spotifyAPI.getAlbum(access_token, id)
            return response.data
        }

        const [album] = await Promise.all([getAlbum(access_token, id)])

        res.status(200).json({ album })
    })
)

router.get(
    '/playlist/:id',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id } = req.params
        const limit = SPOTIFY_API_PAGINATION_LIMIT

        const getPlaylist = async (access_token, id) => {
            const response = await spotifyAPI.getPlaylist(access_token, id)
            return response.data
        }

        const getPlaylistTracks = async (access_token, limit, offset, id) => {
            const response = await spotifyAPI.getPlaylistTracks(access_token, id, limit, offset)
            return response.data
        }

        const [playlist, tracks] = await Promise.all([
            getPlaylist(access_token, id),
            fetchPaginatedItems(getPlaylistTracks, access_token, limit, 250, [id], processPlaylistData),
        ])

        res.status(200).json({ playlist, tracks })
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
