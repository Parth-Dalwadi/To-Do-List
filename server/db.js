const mysql = require('mysql')
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

        con.query("CREATE TABLE IF NOT EXISTS task(task_id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(255) NOT NULL, is_checked Boolean NOT NULL)", function(err, result){
            if (err) throw err
            if (result.warningCount === 0){
                console.log("Table Created: tasks")
            }
        })

    })
}

module.exports.connect = connect