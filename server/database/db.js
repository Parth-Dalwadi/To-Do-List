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

async function dbConnect () {
    con.connect(function(err){
        if (err) throw err
        console.log("Connected to MySQL!")

        con.query("CREATE DATABASE IF NOT EXISTS to_do_list", function(err, result) {
            if (err) throw err
            if (result.warningStatus === 0) {
                console.log("Database Created: to_do_list")
            }
        })

        con.query("USE to_do_list", function(err){
            if (err) throw err
            console.log("Connected to to_do_list!")
        })

        con.query("CREATE TABLE IF NOT EXISTS task(task_id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(255) NOT NULL, is_checked BOOLEAN NOT NULL, date_created DATE NOT NULL)", function(err, result){
            if (err) throw err
            if (result.warningStatus === 0){
                console.log("Table Created: task")
            }
        })

    })
}

async function dbGetAllTasks(){
    const data = await con.promise().query("SELECT task_id, description, is_checked, DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created FROM task")
    return data[0]
}

async function dbGetTask(id) {
    const data = await con.promise().query(`SELECT task_id, description, is_checked, DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created FROM task WHERE task_id = ${id}`)
    return data[0]
}

async function dbCreateTask(description, is_checked, date_created){
    const data = await con.promise().query(`INSERT INTO task(description, is_checked, date_created) VALUES("${description}", ${is_checked}, "${date_created}")`)
    return `Task ${data[0].insertId} was created.`
}

async function dbUpdateTask(id, description, is_checked, date_created){
    const data = await con.promise().query(`UPDATE task SET description = "${description}", is_checked = ${is_checked}, date_created = "${date_created}" WHERE task_id = ${id}`)
    return data[0].info
}

async function dbDeleteTask(id){
    const data = await con.promise().query(`DELETE FROM task WHERE task_id = ${id}`)
    const rows = data[0].affectedRows

    if (rows === 1){
        return "1 row was deleted."
    }

    return `${rows} rows were deleted.`
}

module.exports = {
    dbConnect,
    dbGetAllTasks,
    dbGetTask,
    dbCreateTask,
    dbUpdateTask,
    dbDeleteTask
}