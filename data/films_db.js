const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "film_db"
})

connection.connect((err) => {
    if(err) throw err;
    console.log("db collegato")
})

module.exports = connection;