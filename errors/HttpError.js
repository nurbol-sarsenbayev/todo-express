class HttpError extends Error {
    statusCode
    name = 'HttpError'

    constructor (statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = HttpError