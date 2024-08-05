const express = require('express')
require('dotenv').config()
const path = require('path')
const apiRouter = require('./routes/Router')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use('/api/v1/tasks', apiRouter)

const port = process.env.PORT || 5000

app.listen(5000, () => {
  console.log(`The server is listening to port ${port}`)
})
