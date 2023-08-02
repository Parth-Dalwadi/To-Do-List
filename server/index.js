const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/tasks')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const {dbConnect} = require('./database/db')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use("/api/tasks", router)
app.use(notFound)
app.use(errorHandler)

const port = process.env.API_PORT || 8080

const start = async () => {
    try {
        await dbConnect()
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()