import express from 'express'
import { spotifyAPI } from '../index.js'
import { sessionAuth } from '../middleware/sessionAuth.js'
import { tokenExpiry } from '../middleware/tokenExpiry.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

const router = express.Router()

/* AUTH ROUTE MIDDLEWARE */
router.use(sessionAuth)
router.use(tokenExpiry)

/* AUTH ROUTES */
router.get(
    '/user/playlists',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user

        let playlists = [],
            limit = 50,
            offset = 0,
            total = 1 // tmp value to initialise while loop

        const getPlaylists = async (access_token, offset) => {
            const response = await spotifyAPI.getMePlaylists(access_token, limit, offset)
            return response.data
        }

        while (offset < total) {
            let data = await getPlaylists(access_token, limit, offset)
            if (!data) break

            playlists = playlists.concat(data.items)
            total = data.total
            offset += data.limit
        }

        res.status(200).json(playlists)
    })
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
