const mysql = require('mysql2')
require('dotenv').config()

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const con = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password
})

async function connect () {
    con.connect(function(err){
        if (err) throw err
        console.log("Connected to MySQL!")

        con.query("CREATE DATABASE IF NOT EXISTS to_do_list", function(err, result) {
            if (err) throw err
            if (result.warningCount === 0) {
                console.log("Database Created: to_do_list")
            }
        })

        con.query("USE to_do_list", function(err){
            if (err) throw err
            console.log("Connected to to_do_list!")
        })

        con.query("CREATE TABLE IF NOT EXISTS task(task_id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(255) NOT NULL, is_checked BOOLEAN NOT NULL)", function(err, result){
            if (err) throw err
            if (result.warningCount === 0){
                console.log("Table Created: tasks")
            }
        })

    })
}

async function getTasks(){
    try {
        const data = await con.promise().query("SELECT * FROM task")
        return data[0]
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

async function getTask(id) {
    try {
        const data = await con.promise().query(`SELECT * FROM task WHERE task_id = ${id}`)
        return data[0]
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

async function createTask(description, is_checked){
    try {
        const data = await con.promise().query(`INSERT INTO task(description, is_checked) VALUES("${description}", ${is_checked})`)
        return `Task ${data[0].insertId} was created.`
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

async function updateTask(id, description, is_checked){
    try {
        const data = await con.promise().query(`UPDATE task SET description = "${description}", is_checked = ${is_checked} WHERE task_id = ${id}`)
        return data[0].info
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

async function deleteTask(id){
    try {
        const data = await con.promise().query(`DELETE FROM task WHERE task_id = ${id}`)
        const rows = data[0].affectedRows

        if (rows === 1){
            return "1 row was deleted."
        }

        return `${rows} rows were deleted.`
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

module.exports = {
    connect,
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}