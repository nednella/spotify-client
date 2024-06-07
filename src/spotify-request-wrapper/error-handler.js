class NamedError extends Error {
    get name() {
        return this.constructor.name
    }
}

export class TimeoutError extends NamedError {
    constructor() {
        const message = "A timeout occurred whilst communicating with Spotify's Web API."
        super(message)
    }
}

export class SetupError extends NamedError {
    constructor() {
        const message = 'An error occurred whilst setting up the API request.'
        super(message)
    }
}

/* Auth and Web API Parent Error */
export class ApiError extends NamedError {
    constructor(headers, status, body, message) {
        super(message)
        this.headers = headers
        this.status = status
        this.body = body
    }
}

/**
 * Authentication Error
 * body: { error: <string>, error_description: <string> }
 */
export class AuthError extends ApiError {
    constructor(headers, status, body) {
        console.error('Authentication error.')
        const message =
            "An authentication error occurred whilst communicating with Spotify's Web API."

        // Convert Spotify's auth error to same object structure as web api error
        body = {
            error: {
                status: status,
                message: body.error_description,
            },
        }

        super(headers, status, body, message)
    }
}

/**
 * Web Api Error
 * body: { status: <integer>, message: <string> }
 */
export class WebApiError extends ApiError {
    constructor(headers, status, body) {
        console.error('Web API error.')
        const message = "An error occurred whilst communicating with Spotify's Web API."

        super(headers, status, body, message)
    }
}
