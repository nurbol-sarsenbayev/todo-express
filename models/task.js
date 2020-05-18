const path = require('path')
const { readData, addItem, editItem, removeItem, getItemById } = require('./db')

const filePath = path.join(__dirname, '..', 'db', 'tasks.json')

const validateTask = (task) => {
    const { title, text, duration } = task || {}
    if (!title || !text || !duration) {
        return 'Task title, text and duration fields are required'
    }
    return ''
}

const getTasks = () => readData(filePath)

const getUserTasks = async (userId) => (await getTasks()).filter((u) => u.userId === userId)

const addUserTask = async (userId, task) => {
    const errorMessage = validateTask(task)
    if (errorMessage) {
        throw new Error(errorMessage)
    }
    return addItem(filePath, { ...task, userId })
}

const editUserTask = async (userId, taskId, task) => {
    const errorMessage = validateTask(task)
    if (errorMessage) {
        throw new Error(errorMessage)
    }
    return editItem(filePath, taskId, task, (t) => t.userId === userId)
}

const getUserTaskById = async (userId, taskId) => getItemById(filePath, taskId, (t) => t.userId === userId)

const removeUserTask = async (userId, taskId) => removeItem(filePath, taskId, (t) => t.userId === userId)

module.exports = {
    getUserTasks,
    addUserTask,
    editUserTask,
    getUserTaskById,
    removeUserTask
}