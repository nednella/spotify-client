import express, { response } from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

/* API ROUTE MIDDLEWARE */
router.use(sessionAuth)
router.use(tokenExpiry)

/* PLAYER ROUTES */
router.get(
    '/devices',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user

        const response = await spotifyAPI.getAvailableDevices(access_token)
        const { devices } = response.data

        res.status(200).json(devices)
    })
)

router.put(
    '/devices',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId } = req.query

        await spotifyAPI.setActiveDevice(access_token, deviceId)

        res.status(200).json('Playback transferred.')
    })
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
