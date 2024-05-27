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
	res.send('Test route')
})
app.get('/session', (req, res) => {
	const session_cookie = req.cookies[session_cookie_name]

	if (session_cookie && sessions[session_cookie]) {
		console.log('Cookie and session found!', session_cookie)
		res.status(200).send({ session: true })
	} else if (session_cookie && !sessions[session_cookie]) {
		console.log('Cookie found but no matching session.')
		res.status(200).send({ session: true })
	} else {
		console.log('No active session.')
		res.status(200).send({ session: false })
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

	spotifyAPI
		.authorizationCodeGrant(authCode)
		.then((data) => {
			const access_token = data.body['access_token']
			const refresh_token = data.body['refresh_token']
			const expires_in = data.body['expires_in']

			// Store tokens in package
			spotifyAPI.setAccessToken(access_token)
			spotifyAPI.setRefreshToken(refresh_token)

			const session_id = uuid()
			sessions[session_id] = {
				access_token: access_token,
				refresh_token: refresh_token,
				expires_in: expires_in,
			}

			// Server response
			res.cookie(session_cookie_name, session_id, {
				secure: true,
				httpOnly: true,
				sameSite: 'strict',
			})
			res.status(data.statusCode).end(
				'Spotify API token request successful and session cookie recieved.'
			)

			// DEBUG
			console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`)
			console.log(`Access token: ${access_token.substring(0, 20)}...`)
			console.log(`Refresh token: ${refresh_token.substring(0, 20)}...`)
		})
		.catch((error) => {
			console.error(
				'Error getting Tokens:\n',
				'Status code:',
				error.statusCode + '\n',
				'Response:',
				error.body
			)

			// Server response
			res.status(error.statusCode).end(error.body.error_description)
		})
})

app.get('/logout', (req, res) => {
	const session_cookie = req.cookies[session_cookie_name]

	if (sessions[session_cookie]) {
		console.log('Log out requested, deleting session...')
		delete sessions[session_cookie]
		console.log('Session deleted')

		// server response
		res.clearCookie(session_cookie_name)
		res.status(200).end('Successfully logged out.')
	} else {
		console.log('No active session found')

		// server response
		res.status(400).end('No active session found.')
	}
})

app.listen(SERVER_PORT, () => {
	console.log(`HTTP Server now available at http://localhost:${SERVER_PORT}`)
})
