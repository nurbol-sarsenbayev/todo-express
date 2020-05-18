const path = require('path')
const { readData, addItem, editItem, getItemById } = require('./db')
const HttpError = require('../errors/HttpError')

const filePath = path.join(__dirname, '..', 'db', 'users.json')

const getUsers = () => readData(filePath)

const validateUser = (user) => {
    if (!user || !user.login || !user.password) {
        return 'Login and Password are required'
    }
    return false
}

const addUser = async (user) => {
    const errorMessage = validateUser(user)
    if (errorMessage) {
        throw new HttpError(400, errorMessage)
    }

    const users = await getUsers()
    
    if (users.find((u) => u.login === user.login)) {
        throw new Error(`Login ${user.login} is already exist`)
    }

    await addItem(filePath, user)
}

const editUser = (id, user) => editItem(filePath, id, user)

const getUserById = (id) => getItemById(filePath, id)

const getUserByLoginAndPassword = async (login, password) => {
    const users = await getUsers()
    return users.find((u) => u.login === login && u.password === password)    
}

module.exports = {
    getUsers,
    addUser,
    editUser,
    getUserById,
    getUserByLoginAndPassword
}