const express = require('express')
const cors = require('cors')
const app = express()
const asyncWrapper = require('./middleware/asyncWrapper')
const {connect, getTasks, getTask, createTask, updateTask, deleteTask} = require('./database/db')
require('dotenv').config()

app.use(cors())
app.use(express.json())

connect()

app.get("/", (req, res) => {
    res.status(200).send("Home page for Tasks API.")
})

app.get("/api/tasks", asyncWrapper(async (req, res) => {
    const data = await getTasks() || "Can't access database currently."
    res.status(200).send(data)
}))

app.post("/api/tasks", asyncWrapper(async (req, res) => {
    const description = req.body.description
    const is_checked = req.body.is_checked
    const date_created = req.body.date_created
    const data = await createTask(description, is_checked, date_created)
    res.status(201).send(data)
}))

app.get("/api/tasks/:id", asyncWrapper(async (req, res) => {
    const {id} = req.params
    const data = await getTask(id) || "Can't access database currently."
    res.status(200).send(data)
}))

app.patch("/api/tasks/:id", asyncWrapper(async (req, res) => {
    const {id} = req.params
    const description = req.body.description
    const is_checked = req.body.is_checked
    const date_created = req.body.date_created
    const data = await updateTask(id, description, is_checked, date_created)
    res.status(200).send(data)
}))

app.delete("/api/tasks/:id", asyncWrapper(async (req, res) => {
    const {id} = req.params
    const data = await deleteTask(id)
    res.status(200).send(data)
}))

app.get("*", (req, res) => {
    res.status(404).send("Could not find page.")
})

const port = process.env.API_PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})