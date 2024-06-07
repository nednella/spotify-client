import express from 'express'
import { spotifyAPI } from '../index.js'

const router = express.Router()

router.get('/login', (req, res) => {
    let authURL = spotifyAPI.createAuthoriseURL()
    res.send(authURL)
})

router.post('/callback', (req, res) => {
    const authCode = req.body.code || null

    if (!authCode) {
        return res.status(401).end('No authorisation code provided')
    }

    const getTokens = async (authCode) => {
        try {
            const response = await spotifyAPI.authorisationCodeGrant(authCode)

            return {
                access_token: response.data['access_token'],
                refresh_token: response.data['refresh_token'],
                expires_in: response.data['expires_in'],
            }
        } catch (err) {
            // DEBUG
            console.error(err)

            if (err.body.error) {
                res.status(err.body.error.status).end(err.body.error.message)
            }
        }
    }

    const initSession = async (authCode) => {
        const tokens = await getTokens(authCode)
        if (!tokens) return

        const user = {
            creation: new Date().toUTCString(),
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
        }

        req.session.user = user
        res.status(200).end('Spotify API token request successful and new session issued.')
    }

    initSession(authCode)
})

router.get('/logout', (req, res) => {
    if (!req.session.user) {
        // DEBUG
        console.log('No active session found')

        return res.status(401).end('Unauthorised')
    }
    // DEBUG
    console.log('Log out requested, ending session.')

    req.session.destroy()
    res.status(200).end('Successfully logged out.')
})

router.get('/session', async (req, res) => {
    if (!req.session.user) {
        // DEBUG
        console.log('No active session found')

        return res.status(401).end('Unauthorised')
    }

    // Get current session
    const token = req.session.user.access_token

    try {
        const response = await spotifyAPI.getMe(token)

        // DEBUG
        console.log('Active session found')

        res.status(200).json(response.data)
    } catch (err) {
        // DEBUG
        console.error(err)

        if (err.body.error) {
            res.status(err.body.error.status).end(err.body.error.message)
        }
    }
})

export default router
