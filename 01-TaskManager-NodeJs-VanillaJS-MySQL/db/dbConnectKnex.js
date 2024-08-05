const mysql = require('mysql2/promise')
const knex = require('knex')
require('dotenv').config()

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const connectToDBMySQLKnex = () => {
  const client = knex({ client: 'mysql', connection: connectionConfig })
  return client
}

module.exports = { connectToDBMySQLKnex }
