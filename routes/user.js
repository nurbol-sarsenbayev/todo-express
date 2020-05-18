const { Router } = require('express')
const bodyParser = require('body-parser')
const HttpError = require('../errors/HttpError')
const { getUsers, getUserById } = require('../models/user')

const jsonParser = bodyParser.json()
const userRouter = Router()

userRouter.get('/', async (req, res, next) => {
    const users = await getUsers()
    res.json(users.map(({ password, ...rest }) => rest))
})

userRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const user = await getUserById(id)
    
        if (!user) {
            throw new HttpError(400, `User by id ${id} is not found`)
        }
    
        const { password, ...rest } = user
        res.json(rest)
    } catch (err) {
        next(err)
    }
})

userRouter.post('/', jsonParser, async (req, res, next) => {
    if (!req.body) res.sendStatus(400)
    try {
        await addUser(req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

userRouter.put('/', jsonParser, async (req, res, next) => {
    if (!req.body) res.sendStatus(400)
    try {
        await editUser(req.userId, req.body)
        res.sendStatus(200)    
    } catch (err) {
        next(err)
    }
})

module.exports = userRouter