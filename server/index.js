const express = require('express')
const cors = require('cors')
const app = express()
const {connect, getTasks, getTask, createTask, updateTask, deleteTask} = require('./db')
require('dotenv').config()

app.use(cors())
app.use(express.json())

connect()

app.get("/", (req, res) => {
    res.status(200).send("Home page for Tasks API.")
})

app.get("/api/tasks", async (req, res) => {
    const data = await getTasks() || "Can't access database currently."
    res.status(200).send(data)
})

app.post("/api/tasks", async (req, res) => {
    const description = req.body.description
    const is_checked = req.body.is_checked
    const data = await createTask(description, is_checked)
    res.status(201).send(data)
})

app.get("/api/tasks/:id", async (req, res) => {
    const {id} = req.params
    const data = await getTask(id) || "Can't access database currently."
    res.status(200).send(data)
})

app.put("/api/tasks/:id", async (req, res) => {
    const {id} = req.params
    const description = req.body.description
    const is_checked = req.body.is_checked
    const data = await updateTask(id, description, is_checked)
    res.status(200).send(data)
})

app.delete("/api/tasks/:id", async (req, res) => {
    const {id} = req.params
    const data = await deleteTask(id)
    res.status(200).send(data)
})

app.get("*", (req, res) => {
    res.status(404).send("Could not find page.")
})

const port = process.env.API_Port

app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}...`)
})