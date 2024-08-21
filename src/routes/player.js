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

router.put(
    '/play',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId, contextUri, trackUri } = req.query

        if (contextUri) await spotifyAPI.playContext(access_token, deviceId || null, contextUri)
        else if (trackUri) await spotifyAPI.playTrack(access_token, deviceId || null, trackUri || null)
        else await spotifyAPI.play(access_token, deviceId || null)

        res.status(200).json('Playback started.')
    })
)

router.put(
    '/pause',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId } = req.query

        await spotifyAPI.pause(access_token, deviceId || null)

        res.status(200).json('Playback paused.')
    })
)

router.post(
    '/next',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId } = req.query

        await spotifyAPI.next(access_token, deviceId || null)

        res.status(200).json('Command sent.')
    })
)

router.post(
    '/previous',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId } = req.query

        await spotifyAPI.previous(access_token, deviceId || null)

        res.status(200).json('Command sent.')
    })
)

router.put(
    '/shuffle',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId, state } = req.query

        await spotifyAPI.shuffle(access_token, deviceId || null, state)

        res.status(200).json('Command sent.')
    })
)

router.put(
    '/repeat',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId, state } = req.query

        await spotifyAPI.repeat(access_token, deviceId || null, state)

        res.status(200).json('Command sent.')
    })
)

router.put(
    '/volume',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId, volume } = req.query

        await spotifyAPI.volume(access_token, deviceId || null, volume)

        res.status(200).json('Command sent.')
    })
)

router.put(
    '/seek',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user
        const { deviceId, position } = req.query

        await spotifyAPI.seek(access_token, deviceId || null, position)

        res.status(200).json('Command sent.')
    })
)

router.get(
    '/queue',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user

        const { data } = await spotifyAPI.getQueue(access_token)

        res.status(200).json(data)
    })
)

/* TEST ROUTE */
// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }
router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
