const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

const allowedOrigins = [
    // Frontend público (Vercel)
    'https://rh-in100-tiva-front.vercel.app',

    // Frontend privado/de preview (Vercel)
    'https://rh-in100-tiva-front-j0joo3s5z-marquiiims-projects.vercel.app',
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            console.warn(`CORS bloqueado para: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}))

app.use(express.json())

app.use(rateLimiter)

app.use('/api', routes)

module.exports = app
