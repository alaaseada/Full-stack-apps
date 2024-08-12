const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const RateLimit = require('express-rate-limit')
const { connectToDB } = require('./db/connect')
const project_router = require('./routes/projects')
const skills_router = require('./routes/skills')

require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
})
app.use(limiter)
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/api/v1/projects', project_router)
app.use('/api/v1/skills', skills_router)

const start = () => {
  try {
    connectToDB()
    console.log('Successfully connected to the database...')
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`)
    })
  } catch (error) {
    console.error('An error occured', error)
  }
}

start()

export const handler = serverless(app)
