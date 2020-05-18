const path = require('path')
const { readData, writeData } = require('./db')

const filePath = path.join(__dirname, '..', 'db', 'tokens.json')

const getTokens = () => readData(filePath)
const setTokens = (tokens) => writeData(filePath, tokens)

const addToken = async (token) => {
    const tokens = await getTokens()
    tokens.push(token)
    await setTokens(tokens)
}

const removeToken = async (token) => {
    const tokens = await getTokens()
    const index = tokens.indexOf(token)

    if (index < 0) {
        throw new Error(`Token is not found`)
    }

    tokens.splice(index, 1)
    await setTokens(tokens)
}

const isExistToken = async (token) => {
    const tokens = await getTokens()
    return tokens.includes(token)
}

module.exports = {
    addToken,
    removeToken,
    isExistToken
}