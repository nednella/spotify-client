import Request from './base-request.js'

let DEFAULT_SCHEME = 'https',
    DEFAULT_HOST = 'api.spotify.com/v1',
    DEFAULT_PORT = 443

export default class ApiRequest extends Request {
    constructor(access_token) {
        if (!access_token) {
            throw new Error(`A request sent to Spotify's Web API MUST include an access token.`)
        }
        super()
        this.setScheme(DEFAULT_SCHEME)
        this.setHost(DEFAULT_HOST)
        this.setPort(DEFAULT_PORT)
        this.withAuth(access_token)
    }
}
