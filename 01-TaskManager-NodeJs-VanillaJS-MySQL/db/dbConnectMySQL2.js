const mysql = require('mysql2/promise')
require('dotenv').config()

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const connectToDBMySQL2 = async () => {
  const pool = await mysql.createPool(connectionConfig)
  return pool
}

module.exports = { connectToDBMySQL2 }
