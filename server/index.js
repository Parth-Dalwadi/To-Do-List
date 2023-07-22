const express = require('express')
const cors = require('cors')
const app = express()
const {connect, getTasks, getTask} = require('./db')
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

app.get("/api/tasks/:id", async (req, res) => {
    const {id} = req.params
    const data = await getTask(id) || "Can't access database currently."
    res.status(200).send(data)
})

app.get("*", (req, res) => {
    res.status(404).send("Could not find page.")
})

const port = process.env.API_Port

app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}...`)
})