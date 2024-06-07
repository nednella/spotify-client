import axios from 'axios'
import { AuthError, WebApiError, ApiError, TimeoutError, SetupError } from './error-handler.js'

export default class HttpClient {
    /**
     * Make a HTTP request.
     * @param {object} request - The request object constructed from within the spotify API wrapper class.
     * @returns {Promise<object>} A promise resolving into an axios response object.
     */
    static async execute(request) {
        const { method, uri, options } = HttpClient.#getParameters(request)
        return HttpClient.#request(method, uri, options)
    }

    /**
     * Axios request to the Spotify API (Auth and Web API endpoints).
     * @param {string} method - Type of HTTP request.
     * @param {string} uri - API endpoint the request is to be sent to.
     * @param {object} options - Axios config options for the request to be made with.
     * @returns {Promise<object>} A promise resolving into an axios response object.
     */
    static async #request(method, uri, options) {
        const config = {
            method: method,
            url: uri,
        }

        if (options.headers) config.headers = options.headers
        if (options.queryParameters) config.params = options.queryParameters
        if (options.bodyParameters) config.data = options.bodyParameters

        try {
            return await axios(config)
        } catch (err) {
            HttpClient.#handleError(err)
        }
    }

    /* HELPER FUNCTIONS */

    /**
     * Pick out parameters from the incoming request object to prevent sending undefined params.
     * @param {object} request - The request object.
     * @returns {object} The extracted parameters.
     */
    static #getParameters(request) {
        const method = request.getMethod()
        const uri = request.getURI()
        const options = {}

        if (request.getHeaders()) options.headers = request.getHeaders()
        if (request.getQueryParameters()) options.queryParameters = request.getQueryParameters()
        if (request.getBodyParameters()) options.bodyParameters = request.getBodyParameters()

        return { method, uri, options }
    }

    static #handleError(err) {
        if (err.isAxiosError) {
            if (err.response) {
                const { headers, status, data } = err.response

                if (data.error && typeof data.error === 'string') {
                    throw new AuthError(headers, status, data)
                } else if (data.error && typeof data.error === 'object') {
                    throw new WebApiError(headers, status, data)
                } else {
                    throw new ApiError(headers, status, data, 'Unhandled error.')
                }
            } else if (err.request) {
                throw new TimeoutError()
            } else {
                throw new SetupError()
            }
        } else {
            throw new Error('Unknown error occurred.')
        }
    }
}
