import express from 'express'

import { spotifyAPI } from '../index.js'

import sessionAuth from '../middleware/sessionAuth.js'
import tokenExpiry from '../middleware/tokenExpiry.js'
import asyncHandler from '../middleware/asyncHandler.js'

import calculateExpiryUTC from '../common/utils/calculateExpiryUTC.js'

const router = express.Router()

/* AUTH ROUTE MIDDLEWARE */
router.use(['/logout', '/session'], sessionAuth)
router.use('/session', tokenExpiry)

/* AUTH ROUTES */
router.get('/login', (req, res) => {
    let authURL = spotifyAPI.createAuthoriseURL()
    res.send(authURL)
})

router.post(
    '/callback',
    asyncHandler(async (req, res) => {
        const authCode = req.body.code

        if (!authCode) {
            return res.status(401).end('No authorisation code provided')
        }

        const response = await spotifyAPI.authorisationCodeGrant(authCode)
        const { access_token, refresh_token, expires_in } = response.data

        req.session.user = {
            creation_utc: new Date().toUTCString(),
            expiry_utc: calculateExpiryUTC(expires_in),
            access_token,
            refresh_token,
        }

        res.status(200).end('Spotify API token request successful and new session issued.')
    })
)

router.get('/logout', (req, res) => {
    if (!req.session.user) {
        return res.status(401).end('Unauthorised')
    }

    req.session.destroy()
    res.status(200).end('Successfully logged out.')
})

router.get(
    '/session',
    asyncHandler(async (req, res) => {
        const { access_token } = req.session.user

        // Return authenticated user's profile as a method of validating session.
        const response = await spotifyAPI.getMe(access_token)
        const user = response.data
        user.token = access_token // Token required on the client to enable usage of Spotify Playback SDK.

        res.status(200).json(user)
    })
)

export default router
