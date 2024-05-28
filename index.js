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

app.get('/', (req, res) => {
	if (!req.session.user) {
		console.log('No active session.')
		return res.status(401).send('Unauthorised.')
	}

	console.log('Valid session.')

	// DEBUG
	// console.log(req.session)

	res.status(200).send(req.session.user)
})

app.get('/login', (req, res) => {
	let authURL = spotifyAPI.createAuthorizeURL(scope)
	res.send(authURL)
})

app.post('/authorise', (req, res) => {
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

	const getUser = async () => {
		try {
			const data = await spotifyAPI.getMe()
			return data.body
		} catch (error) {
			console.log(error.body)
			res.status(error.body.error.status).end(error.body.error.message)
		}
	}

	const initSession = async (authCode) => {
		const tokens = await getTokens(authCode)
		const user = await getUser()

		if (!tokens) {
			return res.status(500).end('Something went wrong.')
		}

		req.session.creation = new Date().toUTCString()
		req.session.tokens = {
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
			expires_in: tokens.expires_in,
		}
		req.session.user = JSON.stringify(user)

		// DEBUG
		// console.log(req.session)

		res.status(200).end('Spotify API token request successful and new session issued.')
	}

	initSession(authCode)
})

app.get('/logout', (req, res) => {
	if (!req.session) {
		console.log('No active session found')
		res.status(400).end('No active session found.')
	}
	console.log('Log out requested, ending session.')
	req.session.destroy()
	res.status(200).end('Successfully logged out.')
})

export default app
