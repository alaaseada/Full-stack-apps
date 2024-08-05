const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

const connectToDB = () => {
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        reject(err)
      }
      resolve('Successfully connected to db...')
    })
  })
}

module.exports = { con, connectToDB }
