import express, { response } from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

import fetchPaginatedItems, { processData, processAlbumData } from '../common/helpers/fetchPaginatedItems.js'
import { SPOTIFY_API_PAGINATION_ITEM_CAP, SPOTIFY_API_PAGINATION_LIMIT } from '../common/constants/variables.js'

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
        const cap = SPOTIFY_API_PAGINATION_ITEM_CAP

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
            return response.data.artists.items
        }

        const [tracks, playlists, albums, artists] = await Promise.all([
            fetchPaginatedItems(getTracks, access_token, limit, cap, [], processData),
            fetchPaginatedItems(getPlaylists, access_token, limit, cap, [], processData),
            fetchPaginatedItems(getAlbums, access_token, limit, cap, [], processAlbumData),
            getArtists(access_token, limit, null),
        ])

        // TODO: normalise tracks

        res.status(200).json({
            tracks,
            playlists,
            albums,
            artists,
        })
    })
)

router.put(
    '/user/library',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { type, id } = req.query

        switch (type) {
            case 'track':
                await spotifyAPI.putMeTracks(access_token, id)
                break
            case 'album':
                await spotifyAPI.putMeAlbums(access_token, id)
                break
            case 'artist':
                await spotifyAPI.putMeFollowing(access_token, 'artist', id)
                break
            case 'playlist':
                await spotifyAPI.putMePlaylists(access_token, id)
                break
        }

        res.status(200).end('Added to Your Library.')
    })
)

router.delete(
    '/user/library',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { type, id } = req.query

        switch (type) {
            case 'track':
                await spotifyAPI.deleteMeTracks(access_token, id)
                break
            case 'album':
                await spotifyAPI.deleteMeAlbums(access_token, id)
                break
            case 'artist':
                await spotifyAPI.deleteMeFollowing(access_token, 'artist', id)
                break
            case 'playlist':
                await spotifyAPI.deleteMePlaylists(access_token, id)
                break
        }

        res.status(200).end('Removed from Your Library.')
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
    '/album/:id',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id } = req.params

        // NOTE: default getAlbum retrieves the first 50 album tracks by default. These tracks are also the same type as the getAlbumTracks endpoint.
        // May implement getAlbumTracks in the future, but this is fine for now.
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
        const cap = SPOTIFY_API_PAGINATION_ITEM_CAP

        const getPlaylist = async (access_token, id) => {
            const response = await spotifyAPI.getPlaylist(access_token, id)
            return response.data
        }

        const getPlaylistTracks = async (access_token, limit, offset, id) => {
            const response = await spotifyAPI.getPlaylistTracks(access_token, id, limit, offset)
            return response.data
        }

        const getUser = async (access_token) => {
            const response = await spotifyAPI.getMe(access_token)
            return response.data
        }

        const [playlist, tracks, user] = await Promise.all([
            getPlaylist(access_token, id),
            fetchPaginatedItems(getPlaylistTracks, access_token, limit, cap, [id], processData),
            getUser(access_token),
        ])

        let isUserCreated = false
        if (playlist.owner.id === user.id) {
            isUserCreated = true
        }

        res.status(200).json({ playlist, tracks, isUserCreated })
    })
)

router.get(
    '/artist/:id',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id } = req.params
        const limit = SPOTIFY_API_PAGINATION_LIMIT
        const cap = SPOTIFY_API_PAGINATION_ITEM_CAP
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
            fetchPaginatedItems(getAlbums, access_token, limit, cap, [id, data_types], processData),
            getRelated(access_token, id),
        ])

        res.status(200).json({
            artist,
            top_tracks,
            albums,
            related_artists,
        })
    })
)

router.post(
    '/user/playlists',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { name, description } = req.query

        const createPlaylist = async (access_token, name, description) => {
            const response = await spotifyAPI.createMePlaylist(access_token, name, description)
            return response.data
        }

        const [new_playlist] = await Promise.all([createPlaylist(access_token, name, description)])

        res.status(200).json(new_playlist)
    })
)

router.put(
    '/user/playlists',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id, name, description } = req.query

        await spotifyAPI.updateMePlaylist(access_token, id, name, description)

        res.status(200).json('Playlist details updated.')
    })
)

router.post(
    '/playlist/tracks',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id, uri } = req.query

        await spotifyAPI.addPlaylistTracks(access_token, id, [{ uri: uri }])

        res.status(200).json('Playlist track(s) added.')
    })
)

router.delete(
    '/playlist/tracks',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { id, uri } = req.query

        await spotifyAPI.removePlaylistTracks(access_token, id, [{ uri: uri }])

        res.status(200).json('Playlist track(s) removed.')
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
