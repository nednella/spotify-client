import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import SpotifyWebApi from 'spotify-web-api-node'

const CLIENT_PORT = process.env.CLIENT_PORT
const SERVER_PORT = process.env.SERVER_PORT

const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
}

const scope = ['user-read-private', 'user-read-email']

const spotifyAPI = new SpotifyWebApi(credentials)

const sessions = {}
const session_cookie_name = 'connect.sid'

const corsConfig = {
	origin: `http://localhost:${CLIENT_PORT}`,
	methods: ['POST', 'GET'],
	credentials: true,
}

const app = express()
app.use(cors(corsConfig))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
	const session_cookie = req.cookies[session_cookie_name]
	const session = sessions[session_cookie]

	if (session_cookie && session) {
		console.log('Valid session.')
		res.status(200).json(session.user)
	} else if (session_cookie && !session) {
		console.log('Cookie found but no matching session.')
		res.clearCookie(session_cookie_name)
		res.status(401).send('Unauthorised.')
	} else {
		console.log('No active session.')
		res.status(401).send('Unauthorised.')
	}
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

		if (tokens && user) {
			const session_id = uuid()

			sessions[session_id] = {
				creation: new Date().toUTCString(),
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				expires_in: tokens.expires_in,
				user: JSON.stringify(user),
			}

			res.cookie(session_cookie_name, session_id, {
				secure: true,
				httpOnly: true,
				sameSite: 'strict',
			})

			res.status(200).end('Spotify API token request successful and new session issued.')
		} else {
			res.status(500).end('Something went wrong.')
		}
	}

	initSession(authCode)
})

app.get('/logout', (req, res) => {
	const session_cookie = req.cookies[session_cookie_name]

	if (sessions[session_cookie]) {
		console.log('Log out requested, ending session.')
		delete sessions[session_cookie]

		res.clearCookie(session_cookie_name)
		res.status(200).end('Successfully logged out.')
	} else {
		console.log('No active session found')

		res.status(400).end('No active session found.')
	}
})

app.listen(SERVER_PORT, () => {
	console.log(`HTTP Server now available at http://localhost:${SERVER_PORT}`)
})
