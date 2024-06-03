import Request from './base-request.js'

let DEFAULT_SCHEME = 'https',
    DEFAULT_HOST = 'accounts.spotify.com',
    DEFAULT_PORT = 443

export default class AuthRequest extends Request {
    constructor() {
        super()
        this.setScheme(DEFAULT_SCHEME)
        this.setHost(DEFAULT_HOST)
        this.setPort(DEFAULT_PORT)
    }
}
