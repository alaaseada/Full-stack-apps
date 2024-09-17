import serverless from 'serverless-http'
import express, { json } from 'express'
import cors from 'cors'
import connectToDB from '../../db/connectdb'
import 'express-async-errors'
import { productsRouter, authRouter, ordersRouter } from '../../routes'
import NotFound from '../../middleware/not-found'
import { errorHandler } from '../../middleware/errors'
import authenticateUser from '../../middleware/authentication'
import { doPayment } from '../../controllers/orders'
import xssClean from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()

app.set('trust proxy', 1)
app.use(json())
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
app.get('/', (req, res) => {
  res.send(
    `<h1>Welcome to our E-store API</h1>
    <p>For products use: /api/v1/products</p>
    <p>For orders use: /api/v1/orders</p>
    <p>For authentication use: /api/v1/auth</p>`
  )
})
app.use(NotFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectToDB()
    console.log('connected')
  } catch (error) {
    console.log('An error occured', error)
  }
}
start()

export const handler = serverless(app)
