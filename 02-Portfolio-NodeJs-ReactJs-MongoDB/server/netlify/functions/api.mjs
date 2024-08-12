//const express = require('express')
import express from 'express'
//const cors = require('cors')
import cors from 'cors'
//const helmet = require('helmet')
import helmet from 'helmet'
//const compression = require('compression')
import compression from 'compression'
//const RateLimit = require('express-rate-limit')
import RateLimit from 'express-rate-limit'
//const { connectToDB } = require('./db/connect')
import { connectToDB } from '../../db/connect'
//const project_router = require('./routes/projects')
import project_router from '../../routes/projects'
//const skills_router = require('./routes/skills')
import skills_router from '../../routes/skills'

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

const start = async () => {
  try {
    await connectToDB()
  } catch (error) {
    console.error('An error occured', error)
  }
}

start()

export const handler = serverless(app)
