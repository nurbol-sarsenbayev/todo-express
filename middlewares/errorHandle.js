function errorHandle(err, req, res, next) {
    console.log('error:', err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack
    })
}

module.exports = errorHandle