const { Router } = require('express')
const bodyParser = require('body-parser')
const HttpError = require('../errors/HttpError')
const { getUserTasks, getUserTaskById, addUserTask, editUserTask, removeUserTask } = require('../models/task')


const jsonParser = bodyParser.json()
const taskRouter = Router()

taskRouter.get('/', async (req, res, next) => {
    try {
        const tasks = await getUserTasks(req.userId)
        res.json(tasks)    
    } catch (err) {
        next(err)
    }
})

taskRouter.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const task = await getUserTaskById(req.userId, id)
        res.json(task)
    } catch (err) {
        next(err)
    }
})

taskRouter.post('/', jsonParser, async (req, res, next) => {
    try {
        if (!req.body) {
            throw new HttpError(400, 'Request body is required')
        }
        await addUserTask(req.userId, req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

taskRouter.put('/:id', jsonParser, async (req, res, next) => {
    try {
        if (!req.body) {
            throw new HttpError(400, 'Request body is required')
        }
        const id = Number(req.params.id)
        await editUserTask(req.userId, id, req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

taskRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        await removeUserTask(req.userId, id)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

module.exports = taskRouter