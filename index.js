const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authenticateToken = require('./middlewares/authenticateToken')
const errorHandle = require('./middlewares/errorHandle')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')

dotenv.config()

const PORT = process.env.PORT || 3003

const app = express()

app.use(cors())
app.use('/users', authenticateToken, userRouter)
app.use('/tasks', authenticateToken, taskRouter)
app.use('/auth', authRouter)

app.use(errorHandle)

app.listen(PORT, () => console.log(`uchet todo express in running on port ${PORT}`))