const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/customError')
const {
    dbGetAllTasks, 
    dbGetTask, 
    dbCreateTask, 
    dbUpdateTask, 
    dbDeleteTask
} = require('../database/db')

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const data = await dbGetAllTasks() || "Can't access database currently."
    res.status(200).send(data)
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params
    const data = await dbGetTask(id)

    if (data.length === 0) {
        return next(createCustomError(`No task with ID: ${id}`, 404))
    } 

    res.status(200).send(data)
})

const createTask = asyncWrapper(async (req, res, next) => {
    const description = req.body.description
    const is_checked = req.body.is_checked
    const date_created = req.body.date_created
    const data = await dbCreateTask(description, is_checked, date_created)
    res.status(201).send(data)
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params
    const description = req.body.description
    const is_checked = req.body.is_checked
    const date_created = req.body.date_created
    const data = await dbUpdateTask(id, description, is_checked, date_created)

    if (!(data.includes("1"))) {
        return next(createCustomError(`No task with ID: ${id}`, 404))
    }

    res.status(200).send(data)
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id} = req.params
    const data = await dbDeleteTask(id)

    if (!(data.includes("1"))) {
        return next(createCustomError(`No task with ID: ${id}`, 404))
    }
    
    res.status(200).send(data)
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}