import axios from 'axios'

export default class HttpClient {
    /**
     * Pick out parameters from the incoming request object to prevent sending undefined params.
     * @param {object} request - The request object constructed from within the spotify API wrapper class.
     * @returns {object} An object containing the request method, the API endpoint and the optional parameters
     * to be sent to that URI.
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

    /**
     * Axios request to the Spotify API (Auth and Web API endpoints).
     * @param {string} method - Type of HTTP request.
     * @param {string} uri - API endpoint the request is to be sent to.
     * @param {object} options - Axios config options for the request to be made with.
     * @returns {object} An axios response object.
     */
    static #request(method, uri, options) {
        const config = {
            method: method,
            url: uri,
        }

        if (options.headers) config.headers = options.headers
        if (options.queryParameters) config.params = options.queryParameters
        if (options.bodyParameters) config.data = options.bodyParameters

        return axios(config)
    }

    /**
     * Make a HTTP request.
     * @param {object} request - The request object constructed from within the spotify API wrapper class.
     * @returns {object} An axios response object.
     */
    static execute(request) {
        const { method, uri, options } = HttpClient.#getParameters(request)
        return HttpClient.#request(method, uri, options)
    }
}
