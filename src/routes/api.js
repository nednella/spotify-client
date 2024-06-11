import express from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

/* API ROUTE MIDDLEWARE */
router.use(sessionAuth)
router.use(tokenExpiry)

/* API ROUTES */
router.get(
    '/user/library',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user

        const limit = 50 // Limit for number of items fetched per call (maximum = 50)

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

        const fetchPlaylistItems = async (fetchFunction, access_token, limit) => {
            let items = [],
                total = 1,
                offset = 0

            while (items.length < total) {
                const data = await fetchFunction(access_token, limit, offset)
                if (!data || !data.items) break

                items = items.concat(data.items)
                total = data.total
                offset += data.limit
            }

            return items
        }

        const fetchAlbumItems = async (fetchFunction, access_token, limit) => {
            let items = [],
                total = 1,
                offset = 0

            while (items.length < total) {
                const data = await fetchFunction(access_token, limit, offset)
                if (!data || !data.items) break

                items = items.concat(data.items)
                total = data.total
                offset += data.limit
            }

            items.forEach((item) => {
                Object.assign(item, item.album)
                delete item.added_at
                delete item.album
            })

            return items
        }

        const fetchArtistItems = async (fetchFunction, access_token, limit) => {
            let items = [],
                total = 1,
                after = ''

            while (items.length < total) {
                const data = await fetchFunction(access_token, limit, after)
                if (!data || !data.artists) break

                items = items.concat(data.artists.items)
                total = data.artists.total
                after = data.artists.cursors.after
            }

            return items
        }

        const [allPlaylists, allAlbums, allArtists] = await Promise.all([
            fetchPlaylistItems(getPlaylists, access_token, limit),
            fetchAlbumItems(getAlbums, access_token, limit),
            fetchArtistItems(getArtists, access_token, limit),
        ])

        res.status(200).json({ playlists: allPlaylists, albums: allAlbums, artists: allArtists })
    })
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
