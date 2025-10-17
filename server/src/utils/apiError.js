class apiError extends Error {
    constructor(
        statusCode,
        error = [],
        message = "Something went wrong",
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.success = false,
        this.data = null

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = apiError;