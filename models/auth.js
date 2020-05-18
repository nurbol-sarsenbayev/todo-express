const jwt = require('jsonwebtoken')
const { removeToken } = require('./token')

function generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

function parseAccessToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                removeToken(token)
                rej(err)
            }
            res(data.userId)
        })
    })
}

module.exports = {
    generateAccessToken,
    parseAccessToken
}