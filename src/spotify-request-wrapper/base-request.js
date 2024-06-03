import HttpClient from './http-client.js'

class Request {
    constructor(builder) {
        if (!builder) {
            throw new Error('No builder supplied to constructor.')
        }

        this.method = builder.method
        this.scheme = builder.scheme
        this.host = builder.host
        this.port = builder.port
        this.path = builder.path
        this.headers = builder.headers
        this.queryParameters = builder.queryParameters
        this.bodyParameters = builder.bodyParameters
    }

    getMethod() {
        return this.method
    }

    getHeaders() {
        return this.headers
    }

    getQueryParameters() {
        return this.queryParameters
    }

    getBodyParameters() {
        return this.bodyParameters
    }

    getQueryParamsToString() {
        if (this.queryParameters) {
            return (
                '?' +
                Object.keys(this.queryParameters)
                    .filter((key) => {
                        return this.queryParameters[key] !== undefined // filter out any undefined parameters
                    })
                    .map((key) => {
                        return key + '=' + this.queryParameters[key]
                    })
                    .join('&')
            )
        }
    }

    getURI() {
        if (!this.port || !this.scheme || !this.host) {
            throw new Error('Missing components necessary to construct URI.')
        }

        let URI = this.scheme + '://' + this.host

        if (
            (this.scheme === 'http' && this.port !== 80) ||
            (this.scheme === 'https' && this.port !== 443)
        ) {
            URI += ':' + this.port
        }

        if (this.path) {
            URI += this.path
        }

        return URI
    }

    getURL() {
        let URI = this.getURI()
        if (this.queryParameters) {
            return URI + this.getQueryParamsToString()
        } else {
            return URI
        }
    }

    execute() {
        return HttpClient.execute(this)
    }
}

export default class RequestBuilder {
    constructor() {
        this.request = new Request(this)
    }

    setMethod(method) {
        this.request.method = method
        return this
    }

    setScheme(scheme) {
        this.request.scheme = scheme
        return this
    }

    setHost(host) {
        this.request.host = host
        return this
    }

    setPort(port) {
        this.request.port = port
        return this
    }

    setPath(path) {
        this.request.path = path
        return this
    }

    /**
     * NOTE: The following is really just some mental notes for myself to break down what the original wrapper
     * is doing under the hood.

     * Below are some setter methods that may, in some cases, be required to 'merge' extra arguments to the 
     * property they are setting, rather than just simply 'setting' those arguments to a currently undefined property.
     *
     * EXAMPLE: Headers for any given Spotify web API call requires an access token provided within the header.
     * This is automatically included when using creating an instance of theApiRequest() class. 
     * When building that request further, it may be required to add extra items to the pre-existing header.
     */

    setHeaders(...params) {
        // Iterate over each new value and merge it into the existing.
        params.forEach((param) => {
            this.request.headers = this.#Merge(this.request.headers, param)
        })
        return this
    }

    setQueryParams(...params) {
        // Iterate over each new value and merge it into the existing.
        params.forEach((param) => {
            this.request.queryParameters = this.#Merge(this.request.queryParameters, param)
        })
        return this
    }

    setBodyParams(...params) {
        // Iterate over each new value and merge it into the existing.
        params.forEach((param) => {
            this.request.bodyParameters = this.#Merge(this.request.bodyParameters, param)
        })

        return this
    }

    withAuth(access_token) {
        if (access_token) {
            this.setHeaders({ Authorization: 'Bearer ' + access_token })
        }
    }

    build() {
        return this.request
    }

    /* Helper functions */

    #Merge(existingParams, newParams) {
        if (!existingParams) {
            // If no existing value, return new value.
            return newParams
        }

        if (newParams) {
            // If new value is a string, replace.
            if (typeof newParams === 'string') {
                return newParams
            }

            // If new value is an array, replace.
            if (Array.isArray(newParams)) {
                return newParams
            }

            // If new value is a non-empty object, merge.
            if (Object.keys(newParams).length > 0) {
                return Object.assign(existingParams || {}, newParams)
            }
        }

        return existingParams // else, return existing value.
    }
}
