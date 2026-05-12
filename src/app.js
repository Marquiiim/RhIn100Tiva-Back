const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use(rateLimiter)

app.use('/api', routes)

module.exports = app
