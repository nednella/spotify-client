import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'

import SpotifyApi from './spotify-request-wrapper/spotify-request-wrapper.js'

import auth from './routes/auth.js'
import api from './routes/api.js'

import { errorHandler } from './middleware/errorHandler.js'

const CLIENT_PORT = process.env.CLIENT_PORT

const credentials = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
}

const scope = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-follow-modify',
    'user-follow-read',
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
]

export const spotifyAPI = new SpotifyApi(credentials, scope)

const cors_config = {
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ['POST', 'GET'],
    credentials: true,
}

const session_config = {
    secret: 'appSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Must be TRUE for production envrionments (where https is used)
        httpOnly: true,
        sameSite: 'strict',
    },
}

const app = express()
app.use(cors(cors_config))
app.use(session(session_config))
app.use(bodyParser.json())

// App routes
app.use('/auth', auth)
app.use('/api', api)

// Error handling
app.use(errorHandler)

export default app
