const { connectToDBMySQLKnex } = require('./db/dbConnectKnex')
const tasksRouter = require('./routes/tasks')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/v1/tasks', tasksRouter)

try {
  connectToDBMySQLKnex()
  console.log('Successfully connected to the DB...')
  app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
  })
} catch (error) {
  console.log('An error occured while connecting to the db')
}
