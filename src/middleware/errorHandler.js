/**
 * Centralised error handling Express middleware for caught errors.
 * @param {Error} err - The caught error.
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 * @param {Express.NextFunction} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err)

    if (err.body.error) {
        res.status(err.body?.error.status || 500).end(err.body?.error.message || 'Internal server error.')
    } else {
        res.status(err.status).end(err.body)
    }
}

export default errorHandler
