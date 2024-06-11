/**
 * Express middleware to wrap asynchronous route handlers for error handling.
 * @param {Function} fn - Asynchronous route handler function.
 * @returns n/a. This middleware allows Express to catch asynchronous errors that it cannot otherwise do.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler
