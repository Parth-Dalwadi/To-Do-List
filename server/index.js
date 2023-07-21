const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Home page for Tasks API.")
})

app.get("/api/tasks", (req, res) => {
    
})

app.get("/api/tasks/:TaskID", (req, res) => {
    
})

const port = process.env.API_Port

app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}...`)
})