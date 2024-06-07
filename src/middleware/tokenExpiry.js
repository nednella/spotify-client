import { spotifyAPI } from '../index.js'
import { calculateExpiryUTC } from '../utils.js'

/**
 * Token expiry middleware
 * Applied to any routes that require the use of an access token.
 * Verifies that the sessions' currently stored access token has not expired. Refreshes the token if yes.
 */
export const tokenExpiry = async (req, res, next) => {
    const { user } = req.session
    const current_utc = new Date(new Date().toUTCString())
    const expiry_utc = new Date(user.expiry_utc)

    if (current_utc < expiry_utc) {
        return next()
    }

    const response = await spotifyAPI.refreshAccessToken(user.refresh_token)
    const { access_token, expires_in } = response.data

    user.expiry_utc = calculateExpiryUTC(expires_in)
    user.access_token = access_token

    next()
}
