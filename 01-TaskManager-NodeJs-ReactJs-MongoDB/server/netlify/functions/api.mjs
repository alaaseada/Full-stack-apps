const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const TasksRouter = require('../../routes/tasks')
const connectToDB = require('../../db/connect')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/tasks', TasksRouter)

const start = async () => {
  try {
    await connectToDB()
  } catch (error) {
    console.log(error)
  }
}

start()

export const handler = serverless(app)
