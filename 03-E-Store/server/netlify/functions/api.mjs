const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const connectToDB = require('./db/connectdb')
require('express-async-errors')
const { productsRouter, authRouter, ordersRouter } = require('./routes')
const NotFound = require('./middleware/not-found')
const { errorHandler } = require('./middleware/errors')
const authenticateUser = require('./middleware/authentication')
const { doPayment } = require('./controllers/orders')
const xssClean = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

app.set('trust proxy', 1)
app.use(express.json())
app.use(cors())
app.use(xssClean())
app.use(helmet())
app.use(mongoSanitize())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})
app.use(limiter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/orders', authenticateUser, ordersRouter)
app.post('/api/v1/payment', doPayment)
app.use(NotFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectToDB()
  } catch (error) {
    console.log('An error occured', error)
  }
}
start()

const handler = serverless(app)
