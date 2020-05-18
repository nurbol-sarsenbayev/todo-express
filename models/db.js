const fs = require('fs')
const path = require('path')

function readData(filePath) {
    return new Promise((res, rej) => {
        fs.readFile(filePath, { encoding: 'utf8' }, (err, text) => {
            if (err) rej(err)
            try {
                const data = JSON.parse(text)
                res(data)
            } catch (e) {
                rej(e)
            }
        })
    })
}

function writeData(filePath, data) {
    return new Promise((res, rej) => {
        try {
            const text = JSON.stringify(data, null, 4)
            fs.writeFile(filePath, text, { encoding: 'utf8' }, (err) => {
                if (err) rej(err)
                res()
            })
        } catch (e) {
            rej(e)
        }
    })
}

const idsPath = path.join(__dirname, '..', 'db', 'ids.json')

const getId = async (tableName) => {
    const idsMap = await readData(idsPath)
    return idsMap[tableName] || 0
}

const setId = async (tableName, id) => {
    const idsMap = await readData(idsPath)
    idsMap[tableName] = id
    await writeData(idsPath, idsMap)
}

const getTableName = (filePath) => {
    const matches = filePath.match(/\/([a-z]+)\.json$/)
    return matches && matches[1]
}

const addItem = async (filePath, item) => {
    const tableName = getTableName(filePath)
    const lastId = await getId(tableName)
    const id = lastId + 1
    const items = await readData(filePath)
    items.push({ ...item, id })
    await writeData(filePath, items)
    await setId(tableName, id)
}

const editItem = async (filePath, id, item, condFunc = () => true) => {
    const items = await readData(filePath)
    const index = items.findIndex((el) => el.id === id && condFunc(el))

    if (index < 0) {
        throw new Error(`Item by id ${id} is not found`)
    }

    items[index] = {
        ...items[index],
        ...item
    }
    await writeData(filePath, items)
}

const removeItem = async (filePath, id, condFunc = () => true) => {
    const items = await readData(filePath)
    const index = items.findIndex((el) => el.id === id && condFunc(el))

    if (index < 0) {
        throw new Error(`Item by id ${id} is not found`)
    }

    items.splice(index, 1)
    await writeData(filePath, items)
}

const getItemById = async (filePath, id, condFunc = () => true) => {
    const items = await readData(filePath)
    return items.find((el) => el.id === id && condFunc(el))
}

module.exports = {
    readData,
    writeData,
    addItem,
    editItem,
    removeItem,
    getItemById
}
