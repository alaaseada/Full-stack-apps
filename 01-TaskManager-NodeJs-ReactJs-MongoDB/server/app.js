const express = require('express')
const cors = require('cors')
const TasksRouter = require('./routes/tasks')
const connectToDB = require('./db/connect')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/v1/tasks', TasksRouter)

const start = async () => {
  try {
    await connectToDB()
    console.log('Successfully connected to DB...')
    app.listen(port, () => {
      console.log('Server is running om port 5000...')
    })
  } catch (error) {
    console.log(error)
  }
}

start()
