const { Router } = require('express')
const bodyParser = require('body-parser')
const HttpError = require('../errors/HttpError')
const authenticateToken = require('../middlewares/authenticateToken')
const { getUserByLoginAndPassword, addUser } = require('../models/user')
const { addToken, removeToken } = require('../models/token')
const { generateAccessToken } = require('../models/auth')

const jsonParser = bodyParser.json()
const authRouter = Router()

authRouter.post('/login', jsonParser, async (req, res, next) => {
    try {
        const { login, password } = req.body || {}
        if (!login || !password) {
            throw new HttpError(400, 'Login and Password are required')
        }

        const user = await getUserByLoginAndPassword(login, password)
    
        if (!user) {
            throw new HttpError(404, 'Login or Password is invalid')
        }
    
        const token = generateAccessToken(user.id)
        await addToken(token)
        res.json(token)
    } catch (err) {
        next(err)
    }
})

authRouter.get('/logout', authenticateToken, async (req, res, next) => {
    try {
        await removeToken(req.token)
        res.sendStatus(200)    
    } catch (err) {
        next(err)
    }
})

authRouter.post('/register', jsonParser, async (req, res, next) => {
    try {
        const { login, password } = req.body || {}
        await addUser({ login, password })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

module.exports = authRouter