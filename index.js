const express = require('express')
const dotenv = require('dotenv')
const authenticateToken = require('./middlewares/authenticateToken')
const errorHandle = require('./middlewares/errorHandle')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')

dotenv.config()

const app = express()

app.use('/users', authenticateToken, userRouter)
app.use('/tasks', authenticateToken, taskRouter)
app.use('/auth', authRouter)

app.use(errorHandle)

app.listen(3003, () => console.log('uchet todo express in running'))