const HttpError = require('../errors/HttpError')
const { parseAccessToken } = require('../models/auth')
const { isExistToken } = require('../models/token')

async function authenticateToken(req, res, next) {    
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if (!token || !await isExistToken(token)) {
            throw new HttpError(401, 'Unauthorized')
        }

        req.userId = Number(await parseAccessToken(token))
        req.token = token
        next()
    } catch (err) {        
        next(err)
    }
}

module.exports = authenticateToken