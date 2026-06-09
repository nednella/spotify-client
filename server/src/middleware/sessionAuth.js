/**
 * Session authentication middleware
 * Applied to any routes that require access to an authenticated session.
 * Verifies that there is an active session tied to the session ID presented by the client's cookie.
 */
const sessionAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).end('Unauthorised')
    }

    console.log('Active session found.')

    next()
}

export default sessionAuth
