import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import SpotifyWebApi from 'spotify-web-api-node'

import auth from './routes/auth.js'
import api from './routes/api.js'

const CLIENT_PORT = process.env.CLIENT_PORT

const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
}

const scope = ['user-read-private', 'user-read-email']

export const spotifyAPI = new SpotifyWebApi(credentials)

const corsConfig = {
	origin: `http://localhost:${CLIENT_PORT}`,
	methods: ['POST', 'GET'],
	credentials: true,
}

const sessionConfig = {
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
app.use(cors(corsConfig))
app.use(session(sessionConfig))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/auth', auth)
app.use('/api', api)

export default app
