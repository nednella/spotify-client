import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import SpotifyWebApi from 'spotify-web-api-node'

const CLIENT_PORT = process.env.CLIENT_PORT

const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
}

const scope = ['user-read-private', 'user-read-email']

const spotifyAPI = new SpotifyWebApi(credentials)

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

app.get('/auth/login', (req, res) => {
	let authURL = spotifyAPI.createAuthorizeURL(scope)
	res.send(authURL)
})

app.post('/auth/authorise', (req, res) => {
	const authCode = req.body.code || null

	if (!authCode) {
		return res.status(400).end('No authorisation code provided')
	}

	const getTokens = async (authCode) => {
		try {
			const data = await spotifyAPI.authorizationCodeGrant(authCode)

			const access_token = data.body['access_token']
			const refresh_token = data.body['refresh_token']
			const expires_in = data.body['expires_in']

			// Store tokens in package
			spotifyAPI.setAccessToken(access_token)
			spotifyAPI.setRefreshToken(refresh_token)

			return {
				access_token: access_token,
				refresh_token: refresh_token,
				expires_in: expires_in,
			}
		} catch (error) {
			console.error(
				'\nError getting Tokens:\n\n',
				'Status code:',
				error.statusCode + '\n',
				'Response:',
				error.body
			)

			res.status(error.statusCode).end(error.body.error_description)
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

app.get('/auth/logout', (req, res) => {
	if (!req.session.user) {
		// DEBUG
		console.log('No active session found')

		res.status(401).end('No active session found')
	}
	// DEBUG
	console.log('Log out requested, ending session.')

	req.session.destroy()
	res.status(200).end('Successfully logged out.')
})

app.get('/auth/session', (req, res) => {
	if (!req.session.user) {
		// DEBUG
		console.log('No active session found')

		return res.status(401).end('Unauthorised')
	}

	const getUser = async () => {
		try {
			const data = await spotifyAPI.getMe()

			// DEBUG
			console.log('Active session found')

			res.status(200).json(data.body)
		} catch (error) {
			// DEBUG
			console.log(error.body)

			res.status(error.body.error.status).end(error.body.error.message)
		}
	}

	getUser()
})

export default app
